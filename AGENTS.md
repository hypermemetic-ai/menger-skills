# menger-skills

The house methodology for work tracked on menger, written in menger's own
vocabulary and **shown on menger**: every skill here is a doc on the
tracker (the `SKILL` shortcode, rooted under `OUGHT-1`), and the file in
this repository is the same body, byte for byte. Read `README.md` first —
it is `SKILL-1` — and open it at `http://127.0.0.1:4456/#/ticket/SKILL-1`.

## One file, one doc

- `skills.tsv` maps each file to its doc: id, file, parent, title.
- `bin/sync status` says which differ; `bin/sync push` amends every doc
  from its file; `bin/sync pull` writes every file from its doc;
  `bin/sync create` files the docs that do not exist yet.
- **The tracker is the source of truth** when they differ: pull before you
  edit, push when you are done, in the same pass.
- A skill file is a menger body: CommonMark plus HTML, the house
  components, fenced `mermaid`, `component` and `theme` blocks. The
  frontmatter (`name`, `description`) is hidden by menger and read by a
  harness; menger reads only `theme`, `reach`, `takeover`, `view`,
  `widths` there.
- An example is a live ticket cited with `m-cite`. A harness reading the
  file sees the tag as a pointer; an agent follows it with `tickets get`.
  `shots/` holds a screenshot of each example for a reader off the
  surface. It is built, never committed: `bin/build` takes every row of
  `shots.tsv` from the menger deployed on this machine (`MENGER_ENV`,
  prod by default) through menger's `scripts/shot.mjs`, and fails when
  that menger is not online. Add a row when the README links a new
  picture; rebuild when the rule or the ticket changes.

## Skill file convention

- One skill = one `SKILL.md` under `<skill-name>/`. Supporting pages (the
  per-kind forms under `ticketing/`) live in the same directory and are
  docs under the skill's doc.
- Frontmatter has exactly `name` and `description`, unquoted; the
  description is one paragraph: when to load it and what it produces.
- Body: an `m-summary` whose lead is an `m-answer` (the skill in one
  line), then the sections the skill needs as house fields; lead with a
  diagram when the skill has a shape. Tables are `m-cases`; rules are a
  numbered list in a `decided-shape` field; the calls are `m-code`
  blocks; the examples are cites.
- Cross-references are `m-ticket` chips (`SKILL-13`), which a Markdown viewer shows
  as the id. A relative link is fine beside one.
- Before pushing a changed body: screenshot it (`../menger/scripts/shot.mjs
  '#/ticket/SKILL-n' --env prod --theme both --width 1100`) and read it.

## Vocabulary

Speak menger's. The kinds are `scope`, `execution`, `build`, `spike`,
`gap`, `doc`. The statuses are `Pending`, `Ready`, `Coding`, `In Review`,
`Complete`, with `Epic` for a scope, `Doc` for a doc, `Blocked` derived,
`Superseded` and `Canceled` for what did not finish. Fields are the names
`m-field`'s `data-field` accepts. Components are the house's (`m-…`) or a
ticket's own. A question for the owner is an **input**. The tracker is
*menger*; the app is *the surface*.

## What does not live here

- menger's own operating rules (ports, deploys, the store): `../menger/AGENTS.md`.
- `../ought` is retired (owner, 2026-10-14): nothing here reads it, cites
  it or inherits its rules. The synapse invocation contract lives in
  `reaching/SKILL.md`.

## Changing a skill

1. `bin/sync pull`; edit the file; keep its frontmatter.
2. If a rule gained or lost an example, cite it, and add or re-shoot the screenshot.
3. Add a row to `skills.tsv` and to README's table for a new skill, then `bin/sync create`.
4. Screenshot the doc and read it; `bin/sync push`.
5. A decision about how we work here goes in `docs/adr/`, tiny, numbered, and is a doc too.
