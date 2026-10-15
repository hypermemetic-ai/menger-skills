# menger-skills

The house methodology for work tracked on menger, written in menger's own
vocabulary and **shown on menger**. Read `README.md` first.

## The repository is the source of truth

- A skill is its files here and nothing else. No skill reads the tracker:
  no `m-cite` or `m-ticket` to a ticket on it, no ticket id as a reference
  or as provenance (owner, 2026-10-15: *"the skills should be changed from
  using anything in the tracker. if we want examples they should be built
  into the skill directly."*). Provenance is the owner and the date.
- A skill file is a menger body: CommonMark plus HTML, the house
  components, fenced `mermaid`, `component` and `theme` blocks. The
  frontmatter (`name`, `description`) is hidden by menger and read by a
  harness; menger reads only `theme`, `reach`, `takeover`, `view`,
  `widths` there.
- Nothing publishes the skills to the tracker or pulls them from it. (A
  publish would have to keep the docs' tracker ids in this repository and
  read the tracker back to know what is there — so there is none.)

## Examples

- **An example lives in the skill whose rule it illustrates**, as
  `<skill>/examples/<name>.md`: one whole ticket body, house components and
  all, self-contained. Another skill links to it by relative path
  (`../ticketing/examples/build.md`), never copies it. An example earns its
  place by illustrating a rule; keep only the fields the skills point at.
- **Its frontmatter says who it is**, for the cites, chips and summaries
  that name it: `id`, `title`, `kind`, `status`, `parent`, and the look
  menger reads there (`theme`, `reach`). Its live components (a hill, a
  feed) read the rows under `tracker:` — `ID · kind · status · title`,
  optionally `· 40 min ago` — when it is drawn off the tracker.
- **Its ids are made up** and use shortcodes the tracker does not hold:
  `AMP` (Volt, the nine flats), `CONE` (the kiln), `PLOT` (the
  allotments), `ROAST` (the brewery feed), and `HOME` as the parent their
  roots hang under. A new example invents its own and checks it is none of
  the tracker's (`synapse -P 4455 menger tickets counts`). Those ids may
  appear in examples, skeletons and illustrative commands; no other id may.
- One example may cite another (`<m-cite ref="AMP-2" field="dag">`): the
  cite resolves among the examples, by `id`.
- **Screenshots.** `shots/` holds a picture of each example for a reader
  off the surface. It is built, never committed: `bin/build` draws every
  row of `shots.tsv` (file, example, theme) through the menger deployed on
  this machine (`MENGER_ENV`, prod by default) and fails when that menger
  is not online. It reads and writes no ticket: `bin/render` reads each
  example as menger's app reads a framed body; `bin/page.mjs` frames it with
  the deployed shell's SDK, tokens, faces and vendored libraries and the
  house components from its registry, answers the frame's reads from the
  examples, and draws their cites; menger's `scripts/shot.mjs` takes it.
  Add a row when the README links a new picture; rebuild when an example
  changes.

## Skill file convention

- One skill = one `SKILL.md` under `<skill-name>/`. Supporting pages (the
  per-kind forms under `ticketing/`) live in the same directory; its
  examples under `examples/`.
- Frontmatter has exactly `name` and `description`, unquoted; the
  description is one paragraph: when to load it and what it produces.
- Body: an `m-summary` whose lead is an `m-answer` (the skill in one
  line), then the sections the skill needs as house fields; lead with a
  diagram when the skill has a shape. Tables are `m-cases`; rules are a
  numbered list in a `decided-shape` field; the calls are `m-code`
  blocks; the examples are links to the files under `examples/`, naming the
  field the rule is about.
- Cross-references are relative links (`[showing](../showing/SKILL.md)`):
  markdown where markdown is read, `<a href>` inside a one-line tag.
- **No corporations.** No company, product, service, standard or face a
  company owns, and no URL at a company's domain — in skills, examples,
  tooling or commit messages. Example themes name independently made faces
  (Space Grotesk, Inter, Iosevka, EB Garamond, Work Sans) with generic
  fallbacks, and load nothing from outside; example domains keep their
  stories with no real vendors ("the vendor's protocol").

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

1. Edit the file; keep its frontmatter.
2. If a rule gained or lost an example, add or remove the file under the
   skill's `examples/`, link it from the rule, and add or re-shoot its row
   in `shots.tsv`.
3. Add a row to README's table for a new skill.
4. `bin/build`, and read the pictures as the owner will — both themes where
   the example has a dark row.
5. A decision about how we work here goes in `docs/adr/`, tiny, numbered.
