//! bin/render — an example body as menger frames it.
//!
//! `render FILE...` prints one JSON object: `{ diagram, files: [{ file,
//! frontmatter, html, components, themes, problems }] }`.
//!
//! - `html` is the body as menger's app renders a framed body
//!   (frontend/src/md.rs, `render_body_framed`): the frontmatter split off,
//!   the same parser and options, an element that runs over blank lines read
//!   by menger's own rule (`html_runs`), raw HTML passed through, a
//!   ```mermaid fence as the placeholder the frame's SDK draws, links outside
//!   http(s) and relative ones dropped, and the elements markdown made marked
//!   `data-md` for the frame's base typography.
//! - A ```component block is not drawn (menger draws it as its docs card);
//!   it is handed over in `components`, to be defined in the frame. A
//!   ```theme block is not drawn either (menger draws its swatches); it is
//!   read by menger's own theme reader and handed over in `themes` — its
//!   light and dark tokens and its rules — or, refused, in `problems`.
//! - `diagram` is the token contract's diagram colours, which the SDK sets
//!   into mermaid's theme variables.
//!
//! It reads files and nothing else: no tracker, no network.

use menger_tickets_api::{component_docs, html_runs, theme_block, tokens};
use pulldown_cmark::{html, CodeBlockKind, CowStr, Event, Options, Parser, Tag, TagEnd};
use pulldown_cmark_escape::escape_html;
use serde_json::{json, Value};

/// md.rs `options()`: the markdown dialect every body is read in.
fn options() -> Options {
    let mut opts = Options::empty();
    opts.insert(Options::ENABLE_TABLES);
    opts.insert(Options::ENABLE_STRIKETHROUGH);
    opts.insert(Options::ENABLE_TASKLISTS);
    opts.insert(Options::ENABLE_FOOTNOTES);
    opts
}

/// md.rs `split_frontmatter`.
fn split_frontmatter(body: &str) -> (Option<&str>, &str) {
    let Some(after_open) = body.strip_prefix("---") else {
        return (None, body);
    };
    let Some(after_open) = after_open.strip_prefix("\r\n").or_else(|| after_open.strip_prefix('\n')) else {
        return (None, body);
    };
    let mut offset = 0usize;
    for line in after_open.split_inclusive('\n') {
        if line.trim_end_matches(['\r', '\n']) == "---" {
            return (Some(&after_open[..offset]), &after_open[offset + line.len()..]);
        }
        offset += line.len();
    }
    (None, body)
}

fn first_word(info: &str) -> Option<&str> {
    info.split_whitespace().next()
}

/// md.rs `mermaid_placeholder`: what the SDK finds and draws.
fn mermaid_placeholder(src: &str) -> String {
    let mut out = String::from("<div class=\"mermaid\" data-state=\"pending\"><pre class=\"mermaid-src\"><code>");
    escape_html(&mut out, src).expect("escaping into a String cannot fail");
    out.push_str("</code></pre></div>\n");
    out
}

/// md.rs `dest_allowed`.
fn dest_allowed(dest: &str, allow_mailto: bool) -> bool {
    let dest = dest.trim();
    for (i, c) in dest.char_indices() {
        match c {
            '/' | '?' | '#' => return true,
            ':' => {
                let scheme = dest[..i].to_ascii_lowercase();
                return scheme == "http" || scheme == "https" || (allow_mailto && scheme == "mailto");
            }
            _ => {}
        }
    }
    true
}

/// md.rs `MD_MARK` / `MD_MARKED`.
const MD_MARK: &str = "data-md";
const MD_MARKED: &[&str] = &["h1", "h2", "h3", "h4", "code", "pre", "a", "blockquote", "table", "th", "td", "img"];

/// md.rs `push_marked`, framed: raw HTML set aside and put back as written,
/// every element markdown produced marked.
fn push_marked<'a>(out: &mut String, events: Vec<Event<'a>>) {
    let mut set_aside: Vec<CowStr<'a>> = Vec::new();
    let mut image = 0u32;
    let mut written = String::new();
    html::push_html(
        &mut written,
        events.into_iter().map(|ev| match ev {
            Event::Start(Tag::Image { .. }) => {
                image += 1;
                ev
            }
            Event::End(TagEnd::Image) => {
                image = image.saturating_sub(1);
                ev
            }
            Event::Html(s) | Event::InlineHtml(s) if image == 0 && !s.is_empty() => {
                let newline = s.ends_with('\n');
                set_aside.push(if newline { CowStr::from(s[..s.len() - 1].to_string()) } else { s });
                Event::Html(CowStr::Borrowed(if newline { "\0\n" } else { "\0" }))
            }
            other => other,
        }),
    );
    let mut set_aside = set_aside.into_iter();
    for (i, part) in written.split('\0').enumerate() {
        if i > 0 {
            out.push_str(set_aside.next().as_deref().unwrap_or(""));
        }
        let mut rest = part;
        while let Some(lt) = rest.find('<') {
            let after = &rest[lt + 1..];
            let name_len = after.find(|c: char| !c.is_ascii_alphanumeric()).unwrap_or(after.len());
            let name = &after[..name_len];
            out.push_str(&rest[..lt + 1 + name_len]);
            if MD_MARKED.contains(&name) {
                out.push(' ');
                out.push_str(MD_MARK);
            }
            rest = &after[name_len..];
        }
        out.push_str(rest);
    }
}

struct Rendered {
    html: String,
    /// (name, info string, source)
    components: Vec<(String, String, String)>,
}

/// md.rs `render(src, None, framed = true, …)`, a definition block handed
/// over instead of drawn.
fn render(src: &str) -> Rendered {
    let opts = options();
    let cleaned;
    let src = if src.contains('\0') {
        cleaned = src.replace('\0', "\u{FFFD}");
        cleaned.as_str()
    } else {
        src
    };
    let read = html_runs::read(src, opts);
    let mut out: Vec<Event> = Vec::new();
    let mut components = Vec::new();
    let mut mermaid: Option<String> = None;
    let mut definition: Option<(String, String)> = None;
    let mut html_block: Option<String> = None;
    let (mut dropped_links, mut dropped_images) = (0u32, 0u32);
    for ev in Parser::new_ext(read.source(), opts) {
        if let Some((_, source)) = definition.as_mut() {
            match ev {
                Event::Text(t) => source.push_str(&t),
                Event::End(TagEnd::CodeBlock) => {
                    let (info, source) = definition.take().expect("checked");
                    if let Some((name, _)) = component_docs::definition(&info) {
                        components.push((name.to_string(), info.clone(), source));
                    }
                }
                _ => {}
            }
            continue;
        }
        if let Some(collected) = mermaid.as_mut() {
            match ev {
                Event::Text(t) => collected.push_str(&t),
                Event::End(TagEnd::CodeBlock) => out.push(Event::Html(mermaid_placeholder(&mermaid.take().expect("checked")).into())),
                _ => {}
            }
            continue;
        }
        match ev {
            Event::Start(Tag::HtmlBlock) => html_block = Some(String::new()),
            Event::Html(s) if html_block.is_some() => html_block.as_mut().expect("checked").push_str(&read.restore(&s)),
            Event::End(TagEnd::HtmlBlock) => out.push(Event::Html(html_block.take().unwrap_or_default().into())),
            Event::Start(Tag::CodeBlock(CodeBlockKind::Fenced(ref info))) if first_word(info) == Some("mermaid") => {
                mermaid = Some(String::new())
            }
            Event::Start(Tag::CodeBlock(CodeBlockKind::Fenced(ref info)))
                if component_docs::definition(info).is_some() || first_word(info) == Some("theme") =>
            {
                definition = Some((info.to_string(), String::new()))
            }
            Event::Start(Tag::Link { link_type, dest_url, title, id }) => {
                if dest_allowed(&dest_url, true) {
                    out.push(Event::Start(Tag::Link { link_type, dest_url, title, id }))
                } else {
                    dropped_links += 1
                }
            }
            Event::End(TagEnd::Link) if dropped_links > 0 => dropped_links -= 1,
            Event::Start(Tag::Image { link_type, dest_url, title, id }) => {
                if dest_allowed(&dest_url, false) {
                    out.push(Event::Start(Tag::Image { link_type, dest_url, title, id }))
                } else {
                    dropped_images += 1
                }
            }
            Event::End(TagEnd::Image) if dropped_images > 0 => dropped_images -= 1,
            other => out.push(other),
        }
    }
    let mut html = String::new();
    push_marked(&mut html, out);
    Rendered { html, components }
}

fn file_json(path: &str) -> Value {
    let body = match std::fs::read_to_string(path) {
        Ok(b) => b,
        Err(e) => return json!({ "file": path, "problems": [format!("cannot read it: {e}")] }),
    };
    let (frontmatter, rest) = split_frontmatter(&body);
    let rendered = render(rest);
    let mut problems = Vec::new();
    let themes = match theme_block::read(rest) {
        Ok(defs) => defs
            .into_iter()
            .map(|d| json!({ "name": d.name, "extends": d.extends, "light": d.light, "dark": d.dark, "rules": d.rules, "imports": d.imports }))
            .collect::<Vec<_>>(),
        Err((name, e)) => {
            problems.push(format!("theme {name}, line {}: {}", e.line, e.message));
            Vec::new()
        }
    };
    json!({
        "file": path,
        "frontmatter": frontmatter.unwrap_or(""),
        "html": rendered.html,
        "components": rendered.components.into_iter().map(|(name, info, source)| json!({ "name": name, "info": info, "source": source })).collect::<Vec<_>>(),
        "themes": themes,
        "problems": problems,
    })
}

fn main() {
    let files: Vec<String> = std::env::args().skip(1).collect();
    if files.is_empty() {
        eprintln!("usage: render FILE...");
        std::process::exit(2);
    }
    let diagram: serde_json::Map<String, Value> = tokens::DIAGRAM.iter().map(|(t, k)| (t.to_string(), json!(k))).collect();
    let out = json!({ "diagram": diagram, "files": files.iter().map(|f| file_json(f)).collect::<Vec<_>>() });
    println!("{out}");
}
