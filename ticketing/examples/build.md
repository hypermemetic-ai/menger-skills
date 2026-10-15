---
id: AMP-4
title: volt.queue — whose turn it is, and every phone told the moment it changes
kind: build
status: Ready
parent: AMP-2
theme: volt
reach: ticket
tracker:
  - AMP-5 · build · Ready · volt.invoices — the landlord's CSV over the Plexus bridge
---

<m-summary ticket="AMP-4">

<m-field data-field="standing">**`volt.queue` decides who gets the next free plug, and tells every phone the moment it changes.**</m-field>

<m-stat value="3">policies to play</m-stat>
<m-stat value="6" tone="info">behaviours pinned</m-stat>

<m-field data-field="confidence"><m-badge confidence="high"></m-badge> <m-ticket ref="AMP-3"></m-ticket> pinned the stream; the queue is a sort and a watch.</m-field>

</m-summary>

<m-beat data-field="problem" kicker="volt.queue">

Two plugs. Nine cars. The plug doesn't know whose turn it is.

Whoever is standing next to it when it frees up gets it — which is whoever has the least to do at eleven at night.

<svg slot="figure" viewBox="0 0 200 140" role="img" aria-label="two sockets, five cars, nobody knows whose turn"><path d="M10 124 H190" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round"></path><rect x="56" y="60" width="12" height="64" rx="3" style="fill:var(--ink)"></rect><rect x="132" y="60" width="12" height="64" rx="3" style="fill:var(--ink)"></rect><g style="fill:none;stroke:var(--ink);stroke-width:2"><rect x="14" y="96" width="30" height="18" rx="5"></rect><rect x="76" y="96" width="30" height="18" rx="5"></rect><rect x="152" y="96" width="30" height="18" rx="5"></rect><rect x="46" y="70" width="30" height="18" rx="5"></rect><rect x="108" y="70" width="30" height="18" rx="5"></rect></g><text x="100" y="40" text-anchor="middle" style="font:600 36px var(--font-display);fill:var(--accent)">?</text></svg>

</m-beat>

<m-beat center>

Pick a policy. Guess who plugs in last. Then press go.

</m-beat>

<m-field data-field="intended-usage" label="One evening, nine flats, three policies" panel>

<volt-queue></volt-queue>

</m-field>

<m-cases data-field="required-behavior">

| when | then |
| -- | -- |
| a flat calls `join` and a charger is free | `Charging { charger }`, and that charger is told to authorize the flat's plug |
| a flat calls `join` and none is free | `Queued { position }`, its position by the policy |
| a session stops and the queue is not empty | the next flat by the policy is `Charging` within one second of `PlugOut` |
| a flat in the queue calls `leave` | `Left`; everyone behind it is `Moved` up |
| a plug goes in on a charger that is not that flat's turn | the charger is told to refuse, naming the position |
| `watch` opens | every flat's current position, then live |

</m-cases>

<m-walk kicker="One join, all the way down" heading="What happens when 4B taps “charge tonight”.">

### The app asks.

<m-code lang="js" path="app/src/queue.js">

```js
await volt.queue.join({ flat: "4B", needsKwh: 30 });
```

</m-code>

### The hub sorts the queue by the policy.

<m-code lang="rust" path="volt-api/src/store/queue.rs" why="the only write">

```rust
let order = self.policy.order(&waiting, &week);      // fair: least kWh this week, then arrival
let turn  = Turn { flat, position: order.position_of(&flat), needs_kwh };
self.queue.insert(turn.clone())?;                    // durable before it is acknowledged
```

</m-code>

### A charger is free, so it is told — on its own stream.

<m-code lang="rust" path="volt/src/chargers.rs" why="the vendor's RPC, the one open stream per charger">

```rust
tx.send(Command::authorize(turn.flat)).await?;
```

</m-code>

### Everyone watching hears it.

<m-code lang="json">

```json
← { "type": "moved", "flat": "4B", "position": 3 }
```

</m-code>

</m-walk>

<m-provides data-field="provides">

| Output | Shape (strong-typed) | Consumed by |
| -- | -- | -- |
| `volt.queue.join` / `leave` / `watch` | `Flat`, `Turn { flat, position, needs_kwh }`, `QueueEvent` | the app (not filed) |
| `Session` | flat · charger · started · stopped · kWh from the last meter | AMP-5 |
| `Policy` | `Fifo \| Fair \| Need`, one per hub, set at start | the owner's answer on AMP-1 |

</m-provides>

<m-consumes data-field="consumes">

| Input | Shape (strong-typed) | Produced by |
| -- | -- | -- |
| `ChargerEvent` | `PlugIn \| Meter \| PlugOut`, from the vendor's stream | volt.chargers (not filed) |
| the stream, not a poll | one bidirectional stream per charger | AMP-3 |

</m-consumes>

<m-acceptance data-field="acceptance">

1. Every row of the table holds over synapse, with two simulated chargers.
2. The evening above, replayed against the hub under each policy, ends as the playable says it does: last plug 4B, 3B, 5A.
3. `cargo test` and the app's tests are green.

</m-acceptance>

```component volt-queue
<template>
<div class="top" part="controls">
<fieldset class="pol"><legend>policy</legend><label><input type="radio" name="p" value="fifo" checked> first come</label><label><input type="radio" name="p" value="fair"> least charged this week</label><label><input type="radio" name="p" value="need"> emptiest first</label></fieldset>
<fieldset class="guess"><legend>who plugs in last?</legend><label><input type="radio" name="g" value="3B"> 3B</label><label><input type="radio" name="g" value="4B"> 4B</label><label><input type="radio" name="g" value="5A"> 5A</label></fieldset>
<button part="go">go</button><span class="clock">18:00</span>
</div>
<div class="chargers" part="chargers"></div>
<div class="queue" part="queue"></div>
<p class="verdict" part="verdict" aria-live="polite"></p>
</template>
<style>
:host{display:block}
.top{display:flex;flex-wrap:wrap;gap:.8rem 1.2rem;align-items:flex-end;margin:.2rem 0 .8rem}
fieldset{border:var(--border) solid var(--line);border-radius:var(--radius-lg);padding:.4rem .7rem .5rem;margin:0;display:flex;gap:.7rem;flex-wrap:wrap}
legend{font:calc(11.5px * var(--text-scale)) var(--sans);color:var(--muted);padding:0 .3rem}
label{font:calc(13px * var(--text-scale)) var(--sans);color:var(--ink);display:flex;gap:.3rem;align-items:center;cursor:pointer}
input[type=radio]{accent-color:var(--accent);margin:0}
button{font:var(--weight-medium) calc(14px * var(--text-scale)) var(--sans);color:var(--ink);background:transparent;border:calc(var(--border) * 1.5) solid var(--ink);border-radius:var(--radius-pill);padding:.35rem 1.2rem;cursor:pointer;transition:background var(--motion-fast) var(--ease)}
button:hover:not(:disabled){background:var(--ink);color:var(--bg)}button:disabled{opacity:.4;cursor:default}
.clock{font:var(--weight-strong) calc(15px * var(--text-scale)) var(--mono);color:var(--ink);min-width:3.5rem}
.ch{display:grid;grid-template-columns:6rem 1fr 9rem;gap:.8rem;align-items:center;margin:.35rem 0;font:calc(13.5px * var(--text-scale)) var(--sans);color:var(--ink)}
.bar{height:10px;border-radius:var(--radius-pill);background:var(--line);position:relative;overflow:hidden}
.bar b{position:absolute;inset:0 auto 0 0;background:var(--accent)}
.who{font:calc(12.5px * var(--text-scale)) var(--mono);color:var(--muted);text-align:right}
.ch.busy .who{color:var(--ink)}
.queue{display:flex;flex-wrap:wrap;gap:.35rem;margin:.7rem 0 0;min-height:2rem}
.q{font:calc(12.5px * var(--text-scale)) var(--mono);color:var(--ink);border:var(--border) solid var(--line);border-radius:var(--radius-pill);padding:.1rem .6rem;display:inline-flex;gap:.4rem;align-items:center}
.q i{font-style:normal;color:var(--accent);font-weight:var(--weight-strong)}
.q.soon{color:var(--muted);border-style:dashed}
.q.done{color:var(--live);border-color:var(--live)}
.q.short{color:var(--err-fg);border-color:var(--err-fg)}
.verdict{margin:.8rem 0 0;font:calc(14px * var(--text-scale))/1.5 var(--sans);color:var(--ink)}
.verdict:empty{display:none}
.verdict b{font-family:var(--font-display)}
@media (max-width:520px){.ch{grid-template-columns:5rem 1fr}.who{grid-column:1/-1;text-align:left}}
</style>
<docs>
  <summary>AMP-4's evening, to play: nine flats home between six and eight, two 7 kW chargers, and the policy that decides whose turn it is. Guess who plugs in last, press go, and watch the night at sixty times its speed.</summary>
  <part name="controls">The policy, the guess and the go button, with the clock.</part>
  <part name="go">The go button.</part>
  <part name="chargers">The two chargers and what is on them.</part>
  <part name="queue">The queue in the policy's order, then who is still to come home, then who is done.</part>
  <part name="verdict">How the night ended, against the guess.</part>
  <example><volt-queue></volt-queue></example>
  An illustration of the rules table. It calls nothing and records nothing: a guess is not a decision. Only the theme's tokens.
</docs>
<script>
const FLATS = [
  { id: '1A', at: 5, need: 20, week: 40 }, { id: '1B', at: 10, need: 35, week: 95 }, { id: '2A', at: 20, need: 10, week: 12 },
  { id: '2B', at: 25, need: 25, week: 60 }, { id: '3A', at: 40, need: 15, week: 20 }, { id: '3B', at: 45, need: 45, week: 130 },
  { id: '4A', at: 70, need: 8, week: 5 }, { id: '4B', at: 90, need: 30, week: 70 }, { id: '5A', at: 110, need: 12, week: 18 },
];
const KW = 7, NIGHT = 720, MS_PER_MIN = 12;
const ORDER = {
  fifo: (a, b) => a.at - b.at,
  fair: (a, b) => a.week - b.week || a.at - b.at,
  need: (a, b) => b.need - a.need || a.at - b.at,
};
const $ = (q) => this.root.querySelector(q), $$ = (q) => [...this.root.querySelectorAll(q)];
const chargers = $('.chargers'), queue = $('.queue'), clock = $('.clock'), verdict = $('.verdict'), go = $('button');
const hhmm = (m) => { const h = (18 + Math.floor(m / 60)) % 24, mm = m % 60; return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`; };
chargers.innerHTML = ['A', 'B'].map((c) => `<div class="ch"><span class="name">charger ${c}</span><span class="bar"><b></b></span><span class="who">free</span></div>`).join('');
const lanes = $$('.ch');
let raf = 0, flats, slots, t;
const policy = () => $('input[name=p]:checked').value;
const step = () => {
  const by = ORDER[policy()];
  slots.forEach((s, i) => { if (s && t >= s.end) slots[i] = null; });
  slots.forEach((s, i) => {
    if (s) return;
    const next = flats.filter((f) => f.at <= t && f.start === null).sort(by)[0];
    if (!next) return;
    next.start = t; next.end = t + Math.ceil(next.need / KW * 60); slots[i] = next;
  });
};
const draw = () => {
  clock.textContent = hhmm(Math.min(t, NIGHT));
  slots.forEach((s, i) => {
    const lane = lanes[i], bar = lane.querySelector('b'), who = lane.querySelector('.who');
    if (!s) { bar.style.width = '0%'; who.textContent = 'free'; lane.classList.remove('busy'); return; }
    const done = Math.min(1, (t - s.start) / (s.end - s.start));
    bar.style.width = `${Math.round(done * 100)}%`;
    who.textContent = `${s.id} · ${(done * s.need).toFixed(0)} of ${s.need} kWh`;
    lane.classList.add('busy');
  });
  const by = ORDER[policy()];
  const waiting = flats.filter((f) => f.at <= t && f.start === null).sort(by);
  const later = flats.filter((f) => f.at > t);
  const done = flats.filter((f) => f.end !== null && f.end <= t);
  queue.innerHTML = waiting.map((f, i) => `<span class="q"><i>${i + 1}</i>${f.id}</span>`).join('')
    + later.map((f) => `<span class="q soon">${f.id} · home ${hhmm(f.at)}</span>`).join('')
    + done.map((f) => `<span class="q done">${f.id} ✓</span>`).join('');
};
const finish = () => {
  const last = flats.filter((f) => f.start !== null).sort((a, b) => b.start - a.start)[0];
  const never = flats.filter((f) => f.start === null), full = flats.filter((f) => f.end !== null && f.end <= NIGHT);
  const short = flats.filter((f) => f.start !== null && f.end > NIGHT);
  const g = $('input[name=g]:checked');
  queue.innerHTML = full.map((f) => `<span class="q done">${f.id} ✓</span>`).join('')
    + short.map((f) => `<span class="q short">${f.id} · ${Math.round((NIGHT - f.start) / 60 * KW)} of ${f.need} kWh</span>`).join('')
    + never.map((f) => `<span class="q short">${f.id} · never plugged in</span>`).join('');
  verdict.innerHTML = `Last plug: <b>${last.id}</b> at ${hhmm(last.start)}. Charged by 06:00: <b>${full.length} of 9</b>`
    + (never.length ? ` — ${never.map((f) => f.id).join(' and ')} never got a plug.` : '.')
    + (g ? (g.value === last.id ? ` You guessed ${g.value}: right.` : ` You guessed ${g.value}; it was ${last.id}.`) : ' You didn’t guess.');
};
const reset = () => {
  cancelAnimationFrame(raf);
  flats = FLATS.map((f) => ({ ...f, start: null, end: null })); slots = [null, null]; t = 0;
  verdict.textContent = ''; go.disabled = false; draw();
};
go.onclick = () => {
  reset(); go.disabled = true;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { while (t < NIGHT) { t++; step(); } draw(); finish(); go.disabled = false; return; }
  const t0 = performance.now();
  const tick = (now) => {
    const target = Math.min(NIGHT, Math.floor((now - t0) / MS_PER_MIN));
    while (t < target) { t++; step(); }
    draw();
    if (t < NIGHT) raf = requestAnimationFrame(tick); else { finish(); go.disabled = false; }
  };
  step(); raf = requestAnimationFrame(tick);
};
$$('input[name=p]').forEach((r) => r.onchange = reset);
reset();
return () => cancelAnimationFrame(raf);
</script>
```
