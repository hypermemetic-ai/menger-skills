#!/usr/bin/env node
// bin/page.mjs — the page bin/build screenshots: one example, framed as
// menger frames a ticket's body, drawn by the menger deployed on this
// machine and by nothing else.
//
//   node bin/page.mjs --shell URL --render render.json --registry FILE \
//        --out DIR  NAME=EXAMPLE:SCHEME ...
//
// --shell     the deployed shell (http://127.0.0.1:<port>): its frame SDK,
//             its token defaults and faces (its index.html), and the vendored
//             mermaid and highlighter its app names — all taken from there
// --render    bin/render's JSON for every example file (so a cite between
//             examples, and the themes they wear, resolve among them)
// --registry  the house components, as that menger's registry answers them
//             (`tickets components`, the `m-*` names only)
// NAME=EXAMPLE:SCHEME   write DIR/NAME.html: EXAMPLE (a path as given to
//             bin/render) in SCHEME (light or dark)
//
// The page is the host a frame expects (menger's frontend/src/frame.rs and
// cite.rs, in miniature): it hands each frame its document — menger's CSP,
// the theme's tokens, the init block, the SDK inline, then the body — in an
// iframe with menger's sandbox; sizes it to what it reports; answers its
// reads from the examples themselves (their frontmatter: who they are, and
// `tracker:`, the rows their live components read); and draws an `m-cite`
// as a window over the placeholder, holding the cited example's section.
// Nothing here opens a connection to the tracker: the frame's reads never
// leave the page. When the body and every window have settled, the root
// says so: html[data-example="settled"].

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = {};
const jobs = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith('--')) opt[a.slice(2)] = args[++i];
  else jobs.push(a);
}
const die = (m) => {
  console.error(`page: ${m}`);
  process.exit(1);
};
for (const k of ['shell', 'render', 'registry', 'out']) if (!opt[k]) die(`--${k} is required`);
const shell = opt.shell.replace(/\/+$/, '');

async function text(path, binary = false) {
  const res = await fetch(shell + path).catch((e) => die(`${shell}${path}: ${e.message}`));
  if (!res.ok) die(`${shell}${path}: HTTP ${res.status}`);
  return binary ? Buffer.from(await res.arrayBuffer()) : res.text();
}

// ── what the deployed menger draws with ─────────────────────────────────────

const sdk = await text('/app/sdk/menger-sdk.js');
const sdkVersion = (sdk.match(/var VERSION = "([^"]+)"/) || [])[1] || '';
const index = await text('/app/');

// The token contract's defaults as the deployed app paints them: its light
// :root block and its toggled dark block (index.html, tokens:begin … end).
function block(css, selector) {
  const at = css.indexOf(selector + ' {');
  if (at < 0) return {};
  const end = css.indexOf('}', at);
  const out = {};
  for (const m of css.slice(at, end).replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}
const tokenCss = index.slice(index.indexOf('/* tokens:begin */'), index.indexOf('/* tokens:end */'));
const defaults = { light: block(tokenCss, ':root'), dark: block(tokenCss, ':root[data-theme="dark"]') };
if (!Object.keys(defaults.light).length) die(`${shell}/app/ carries no token blocks — is this menger's app?`);
// The house faces, named by the shell's origin (a frame's origin is opaque).
const faces = [...index.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0].replace(/url\((['"]?)\/app\//g, `url($1${shell}/app/`)).join('\n');
// The vendored libraries the app's build names (they are in its wasm).
const wasm = (index.match(/[\w.-]+_bg\.wasm/) || [])[0];
if (!wasm) die(`${shell}/app/ names no wasm build`);
const strings = (await text('/app/' + wasm, true)).toString('latin1');
const vendor = (name) => (strings.match(new RegExp(`/app/vendor/${name}-[0-9.]+\\.min\\.js`)) || [])[0];
const mermaidUrl = vendor('mermaid');
const highlightUrl = vendor('highlight');
if (!mermaidUrl || !highlightUrl) die(`the app's build names no vendored mermaid or highlighter`);

// ── the examples ───────────────────────────────────────────────────────────

const rendered = JSON.parse(readFileSync(opt.render, 'utf8'));
const house = readFileSync(opt.registry, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l))
  .map((x) => x && x.content && x.content.component)
  .filter((c) => c && /^m-/.test(c.name))
  .map(({ name, source, owner, references }) => ({ name, source, owner, references }));
if (!house.length) die(`${opt.registry} holds no house components`);

// A frontmatter in the small YAML the examples write: `key: value` lines,
// and `tracker:` followed by `  - ID · kind · status · title [· N min|h|d ago]`.
function frontmatter(src) {
  const fm = { tracker: [] };
  let list = null;
  for (const line of src.split('\n')) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && list) {
      list.push(item[1].trim());
      continue;
    }
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    list = null;
    if (kv[2] === '') fm[kv[1]] = list = [];
    else fm[kv[1]] = kv[2].replace(/^(["'])(.*)\1$/, '$2');
  }
  return fm;
}

const now = Math.floor(Date.now() / 1000);
const UNIT = { min: 60, h: 3600, d: 86400 };
const seq = (id) => +String(id).split('-').pop();
const examples = rendered.files.map((f) => ({ ...f, fm: frontmatter(f.frontmatter || '') }));
for (const f of examples) if (f.problems && f.problems.length) die(`${f.file}: ${f.problems.join('; ')}`);
const rows = new Map();
const row = (r) => rows.set(r.id.toUpperCase(), { ...r, id: r.id.toUpperCase(), epic: r.id.toUpperCase().split('-')[0] });
for (const f of examples) {
  for (const t of f.fm.tracker || []) {
    const [id, kind, status, title, ago] = t.split(' · ').map((s) => s.trim());
    const m = (ago || '').match(/^(\d+)\s*(min|h|d) ago$/);
    row({ id, kind, status, title: title || '', updated_unix: now - (m ? +m[1] * UNIT[m[2]] : 86400 * 30) });
  }
}
for (const f of examples) {
  const { id, kind, status, title, parent } = f.fm;
  if (id) row({ id, kind, status, title: title || '', parent: parent || null, updated_unix: (rows.get(id.toUpperCase()) || {}).updated_unix || now - 86400 * 30 });
}
const byFile = new Map(examples.map((f) => [f.file, f]));
const byId = Object.fromEntries(examples.filter((f) => f.fm.id).map((f) => [f.fm.id.toUpperCase(), f.file]));
const themes = Object.fromEntries(examples.flatMap((f) => f.themes || []).map((t) => [t.name, t]));

// What a frame wears: the defaults, then its theme's tokens (light, then
// dark over light in dark) and its rules.
function worn(name, scheme) {
  const t = name && themes[name];
  if (name && !t) die(`theme ${name}: no example defines it`);
  const tokens = { ...defaults[scheme], ...(t ? t.light : {}), ...(t && scheme === 'dark' ? t.dark : {}) };
  return { name: t ? name : 'default', tokens, rules: t ? [...(t.imports || []).map((u) => `@import url("${u}");`), ...t.rules].join('\n') : '' };
}
const tokenRule = (scheme, tokens) => `:root{color-scheme:${scheme};${Object.entries(tokens).map(([k, v]) => `${k}:${v}`).join(';')}}`;

// md.rs / mermaid.rs / highlight.rs: what the frame's init block carries.
const MERMAID = {
  startOnLoad: false,
  securityLevel: 'strict',
  suppressErrorRendering: true,
  htmlLabels: false,
  flowchart: { htmlLabels: false },
  class: { htmlLabels: false },
  state: { htmlLabels: false },
  dompurifyConfig: {
    FORBID_TAGS: ['style', 'img', 'a', 'svg', 'math', 'iframe', 'object', 'embed', 'video', 'audio', 'source', 'picture', 'link', 'meta', 'base', 'form', 'input', 'button', 'textarea', 'select', 'foreignobject', 'use', 'image'],
    FORBID_ATTR: ['style', 'src', 'href', 'xlink:href', 'srcset', 'ping', 'background', 'poster', 'action', 'formaction'],
  },
  secure: ['secure', 'securityLevel', 'startOnLoad', 'maxTextSize', 'suppressErrorRendering', 'maxEdges', 'htmlLabels', 'dompurifyConfig'],
  theme: 'default',
  themeVariables: { fontFamily: 'inherit' },
};
const HIGHLIGHT = {
  url: shell + highlightUrl,
  unlabeled: 'detect',
  detect: ['rust', 'json', 'toml', 'yaml', 'bash', 'sql', 'html', 'css', 'markdown', 'python', 'diff'],
  plain: ['text', 'plain', 'plaintext'],
  aliases: { component: 'html' },
  min_relevance: 2,
};

// Everything the host page needs to frame any example in one scheme.
function dataFor(scheme) {
  const frames = {};
  for (const f of examples) {
    const look = worn(f.fm.theme, scheme);
    frames[f.file] = {
      id: f.fm.id ? f.fm.id.toUpperCase() : null,
      theme: look.name,
      tokens: tokenRule(scheme, look.tokens),
      rules: look.rules,
      html: f.html,
    };
  }
  const defined = examples.flatMap((e) => (e.components || []).map((c) => ({ name: c.name, source: c.source, owner: e.fm.id || e.file, references: 0 })));
  return {
    components: [...house.filter((h) => !defined.some((c) => c.name === h.name)), ...defined],
    scheme,
    sdk,
    sdkVersion,
    faces,
    mermaid: { url: shell + mermaidUrl, config: MERMAID, diagram: rendered.diagram },
    highlight: HIGHLIGHT,
    frames,
    byId,
    rows: Object.fromEntries(rows),
  };
}

// ── the host, in the page ──────────────────────────────────────────────────

function host(D, file) {
  const SANDBOX = 'allow-scripts allow-popups allow-popups-to-escape-sandbox';
  const CSP = "connect-src 'none'; form-action 'none'";
  const MAX_VIEW = 480;
  const MAX_DEPTH = 2; // cite.rs: windows nest two deep, a cycle stops there
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  let next = 0;
  const frames = new Map(); // window → { el, kind: 'body'|'cite', settled, … }
  const windows = new Map(); // `${channel}:${cite}` → a cite window
  function doc(fileOf, channel, cite) {
    const F = D.frames[fileOf];
    const init = {
      channel,
      version: D.sdkVersion,
      scheme: D.scheme,
      theme: F.theme,
      mermaid: D.mermaid,
      highlight: D.highlight,
      components: D.components,
      ticket: F.id,
      cite,
      emulate: null,
      motion: 'none',
      entered: true,
      typing: 'off',
    };
    return (
      `<!doctype html><html lang="en" data-theme="${D.scheme}"><head><meta http-equiv="Content-Security-Policy" content="${CSP}">` +
      `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><base target="_blank">` +
      `<style id="menger-fonts">${D.faces}</style><style id="menger-theme">${F.tokens}</style>` +
      (F.rules ? `<style id="menger-theme-rules">${F.rules.replace(/<\//g, '<\\/')}</style>` : '') +
      `<script type="application/json" id="menger-init">${JSON.stringify(init).replace(/</g, '\\u003c')}</` + `script>` +
      `<script id="menger-sdk" data-version="${D.sdkVersion}">${D.sdk}</` + `script></head><body>${F.html}</body></html>`
    );
  }
  function frame(fileOf, cite, kind, extra) {
    const el = document.createElement('iframe');
    const channel = 'x' + ++next;
    el.setAttribute('sandbox', SANDBOX);
    el.setAttribute('title', (D.frames[fileOf].id || fileOf) + (cite ? ' · ' + (cite.field || cite.anchor) : ''));
    el.className = 'mframe';
    const rec = { el, kind, channel, file: fileOf, title: el.getAttribute('title'), settled: false, ...extra };
    // Once it is in the document: its window is known before it can speak.
    rec.start = () => {
      frames.set(el.contentWindow, rec);
      el.srcdoc = doc(fileOf, channel, cite);
    };
    return rec;
  }
  const post = (rec, msg) => rec.el.contentWindow && rec.el.contentWindow.postMessage({ ...msg, channel: rec.channel }, '*');

  // The reads a frame makes, answered from the examples.
  function answer(method, p) {
    const all = Object.values(D.rows);
    p = p || {};
    if (method === 'list') {
      let out = all.filter((r) => !p.epic || r.epic === String(p.epic).toUpperCase());
      const n = (id) => +String(id).split('-').pop();
      if (p.after) out = out.filter((r) => n(r.id) > n(p.after));
      out.sort((a, b) => (a.epic < b.epic ? -1 : a.epic > b.epic ? 1 : n(a.id) - n(b.id)));
      if (p.limit) out = out.slice(0, p.limit);
      return out.map((r) => (p.summary ? { type: 'summary', summary: r } : { type: 'ticket', ticket: r }));
    }
    if (method === 'get') {
      const r = D.rows[String(p.id || '').toUpperCase()];
      return r ? [{ type: 'ticket', ticket: r }] : [{ type: 'not_found', id: p.id }];
    }
    return [];
  }

  function place(w) {
    const r = w.citer.el.getBoundingClientRect();
    w.box.style.left = r.left + scrollX + w.rect.x + 'px';
    w.box.style.top = r.top + scrollY + w.rect.y + 'px';
    w.box.style.width = Math.min(w.rect.w, r.width - w.rect.x) + 'px';
    // Clamped to what the citer shows (cite.rs `place`): a cite in a part of
    // a cited body its window hides is not drawn.
    const seen = w.citer.kind === 'cite' ? w.citer.window.view.getBoundingClientRect() : r;
    const top = r.top + w.rect.y;
    const shown = top >= seen.top - 1 && top < seen.bottom && (w.citer.kind !== 'cite' || w.citer.window.box.style.display !== 'none');
    w.box.style.display = shown ? '' : 'none';
  }
  const placeAll = () => windows.forEach(place);
  function reply(w) {
    const height = Math.ceil(w.box.getBoundingClientRect().height);
    post(w.citer, { type: 'menger:cited', cite: w.cite, height });
  }
  function openWindow(citer, m) {
    const key = citer.channel + ':' + m.cite;
    let w = windows.get(key);
    if (!w) {
      const [ref, anchor] = String(m.ref || '').split('#');
      const id = ref.toUpperCase();
      const box = document.createElement('div');
      box.className = 'mcite';
      const r = D.rows[id];
      const label = m.field || anchor || '';
      box.innerHTML = `<div class="mcite-head"><span class="mcite-id">${esc(id)}</span>${r ? `<span class="mcite-st">${esc(r.status || '')}</span><span class="mcite-title">${esc(r.title || '')}</span>` : ''}<span class="mcite-field">${esc(label)}</span></div><div class="mcite-view"></div>`;
      document.body.appendChild(box);
      w = { key, citer, cite: m.cite, rect: m.rect, box, view: box.querySelector('.mcite-view'), answered: false };
      windows.set(key, w);
      const target = D.byId[id];
      const depth = (citer.depth || 0) + 1;
      if (!target || depth > MAX_DEPTH) {
        w.view.innerHTML = `<p class="mcite-state">${esc(id)}: ${target ? `cites nest ${MAX_DEPTH} deep at most — open it to read on` : 'no example by that id'}</p>`;
        w.answered = true;
      } else {
        const rec = frame(target, m.field ? { field: m.field } : { anchor }, 'cite', { window: w, depth });
        w.frame = rec;
        w.view.appendChild(rec.el);
        rec.start();
      }
    }
    w.rect = m.rect;
    place(w);
    if (w.answered) reply(w);
  }

  addEventListener('message', (e) => {
    const m = e.data;
    const rec = frames.get(e.source);
    if (!rec || !m || m.channel !== rec.channel || typeof m.type !== 'string') return;
    if (m.type === 'menger:size') {
      if (rec.kind === 'body') rec.el.style.height = Math.ceil(m.height) + 'px';
      else {
        const w = rec.window;
        const top = Math.max(0, m.top || 0);
        let state = w.box.querySelector('.mcite-state');
        if (m.found === false) {
          // Said while the section has not been drawn yet, too: the window
          // keeps its frame and waits for a later size that finds it.
          if (!state) {
            state = document.createElement('p');
            state.className = 'mcite-state';
            w.box.insertBefore(state, w.view);
          }
          state.textContent = `${rec.title} — no such section in ${rec.file}`;
          w.view.style.height = '0px';
        } else {
          if (state) state.remove();
          const h = Math.max(0, Math.ceil(m.height - top));
          rec.el.style.height = Math.ceil(m.height) + 'px';
          rec.el.style.marginTop = -top + 'px';
          w.view.style.height = Math.min(h, MAX_VIEW) + 'px';
          w.view.style.overflowY = h > MAX_VIEW ? 'auto' : 'hidden';
        }
        w.answered = true;
        reply(w);
      }
      if (m.settled) rec.settled = true;
      placeAll();
      check();
    } else if (m.type === 'menger:call') {
      post(rec, { type: 'menger:result', id: m.id, items: answer(m.method, m.params) });
    } else if (m.type === 'menger:cite') {
      openWindow(rec, m);
    } else if (m.type === 'menger:uncite') {
      const w = windows.get(rec.channel + ':' + m.cite);
      if (w) {
        w.box.remove();
        windows.delete(w.key);
      }
    }
  });
  addEventListener('resize', placeAll);

  let quiet = 0;
  function check() {
    const all = [...frames.values()];
    const done = all.length && all.every((r) => r.settled) && [...windows.values()].every((w) => w.answered);
    clearTimeout(quiet);
    if (done) quiet = setTimeout(() => document.documentElement.setAttribute('data-example', 'settled'), 400);
  }

  const body = frame(file, null, 'body');
  document.getElementById('frame').appendChild(body.el);
  body.start();
}

// ── one page per job ────────────────────────────────────────────────────────

const PAGE_CSS = `
html,body{margin:0;background:var(--bg);color:var(--ink);font:calc(14px * var(--text-scale, 1))/1.5 var(--sans)}
.sheet{max-width:960px;margin:0 auto;padding:28px 32px 48px}
.from{font:12px var(--mono);color:var(--muted);margin:0 0 14px}
.head{display:flex;flex-wrap:wrap;align-items:baseline;gap:.5rem .8rem;margin:0 0 18px}
.head .id{font:600 13px var(--mono);color:var(--accent)}
.head h1{flex-basis:100%;margin:0;font:600 26px/1.25 var(--font-display, var(--sans));color:var(--ink)}
iframe.mframe{display:block;width:100%;border:0;height:200px;background:transparent}
.mcite{position:absolute;box-sizing:border-box;border:var(--border, 1px) solid var(--line);border-radius:var(--radius-lg, 8px);background:var(--card);overflow:hidden}
.mcite-head{display:flex;flex-wrap:wrap;gap:.3rem .7rem;align-items:baseline;padding:.4rem .75rem;border-bottom:var(--border, 1px) solid var(--line);background:var(--panel);font:12px var(--mono);color:var(--muted)}
.mcite-id{font-weight:600;color:var(--accent)}
.mcite-title{color:var(--ink);font-family:var(--sans)}
.mcite-field{margin-left:auto}
.mcite-view{overflow:hidden;padding:0 .2rem}
.mcite-state{margin:.6rem .75rem;font:13px var(--sans);color:var(--muted)}
`;

mkdirSync(opt.out, { recursive: true });
const cache = {};
for (const job of jobs) {
  const m = job.match(/^([^=]+)=(.+):(light|dark)$/);
  if (!m) die(`${job}: NAME=EXAMPLE:light|dark`);
  const [, name, file, scheme] = m;
  const f = byFile.get(file);
  if (!f) die(`${file}: not among the rendered examples`);
  const D = (cache[scheme] ||= dataFor(scheme));
  const look = worn(f.fm.theme, scheme);
  const reach = f.fm.reach || 'frame';
  // The page around the frame wears the theme where its reach says so.
  const pageTokens = tokenRule(scheme, reach === 'frame' ? defaults[scheme] : look.tokens);
  const r = f.fm.id ? rows.get(f.fm.id.toUpperCase()) : null;
  const head = r
    ? `<header class="head"><span class="id">${r.id}</span><h1>${(r.title || '').replace(/</g, '&lt;')}</h1></header>`
    : '';
  const page =
    `<!doctype html><html lang="en" data-theme="${scheme}"><head><meta charset="utf-8"><title>${name}</title>` +
    `<style>${faces}</style><style>${pageTokens}</style><style>${PAGE_CSS}</style></head><body>` +
    `<main class="sheet"><p class="from">${file} · an example, framed by the menger at ${shell}</p>${head}<div id="frame"></div></main>` +
    `<script>const D = ${JSON.stringify(D).replace(/</g, '\\u003c')};\n(${host.toString()})(D, ${JSON.stringify(file)});</` +
    `script></body></html>`;
  writeFileSync(join(opt.out, name + '.html'), page);
  console.log(join(opt.out, name + '.html'));
}
