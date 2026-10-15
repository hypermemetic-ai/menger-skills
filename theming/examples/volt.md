---
id: AMP-8
title: The volt theme — night-sky paper, one violet accent, Space Grotesk and Inter, corners cut square
kind: doc
status: Doc
parent: AMP-1
theme: volt
reach: ticket
---

<m-summary ticket="AMP-8">

<m-badge tone="info">theme</m-badge>

<m-answer data-field="answer">**Volt's look: a night-sky paper, one violet accent, Space Grotesk for what leads, Inter for what reads, Iosevka for code, and corners cut square.**</m-answer>

</m-summary>

<m-field data-field="intended-usage">

AMP adopts it reaching the **ticket**: a AMP ticket's view and its frames wear it, and the shell around them — nav, header, board — stays the site's. That is the opposite choice from a project that reaches the site while one of its tickets is open. The reach is one flag, changed at any time:

```bash
synapse -P 4455 menger themes set --scope AMP --theme volt --reach ticket   # the ticket view and its frames (as set)
synapse -P 4455 menger themes set --scope AMP --theme volt --reach frame    # only the bodies; the view stays the site's
synapse -P 4455 menger themes set --scope AMP --theme volt --reach site     # all of menger, while a AMP ticket is open
synapse -P 4455 menger themes set --scope AMP                               # say nothing: AMP wears what HOME does
synapse -P 4455 menger themes theme_for --id AMP-4                          # who wears what, and from where
```

A reader who would rather not turns project themes off in Settings → Themes and sees `default`. The faces are named, never fetched: where the reader has them they draw, and otherwise the generic stacks do — nothing loads from outside menger.

</m-field>

<m-field data-field="detail" label="What it sets">

- **Paper and ink**: a cool near-white (`#f6f8fb`) and navy ink; in dark, a night sky (`#0b1020`) and a pale ink — the hours Volt is about.
- **One accent**: violet, `#5a3fe0` in light and `#a596ff` in dark. Links, the recommended option, a lit step, the queue's numbers, a build's glyph.
- **Type**: Space Grotesk for titles, leads, beats, steps and stats (`--font-display`); Inter for text (`--sans`, `--font-text`); Iosevka for code, ids, labels and numbers.
- **Shape**: corners cut close — `--radius` 3px, a page card 8px — an instrument, not a cushion. A little more room (`--space: 1.05`).
- **Code**: keywords in violet, strings in teal, types in rust; every colour over 4.5:1 on a code block in both modes (checked, not eyeballed).
- **Diagrams**: nodes on the card, edged in the accent, lines in the quiet ink.
- **Parts**: every field's label, and a beat's or a walk's kicker, read as a mono label in small capitals in the accent; a stat's number is mono; buttons and badges take the same square corners.

</m-field>

```theme volt
:root {
  --bg: #f6f8fb; --panel: #eef1f6; --card: #ffffff; --hover: #e6eaf3; --sel: #e4e3fb; --row-sel: #d6d2fa;
  --ink: #13203a; --muted: #5f6b85; --line: #dde3ee; --tree-line: #c3cbdc;
  --chip-bg: #e9ecf8; --chip-fg: #4a4f7a; --chip-line: #d6daf0;
  --accent: #5a3fe0; --annot: rgba(90, 63, 224, .32); --annot-hi: #5a3fe0;
  --live: #1f7a4d; --err-fg: #b3261e; --err-bg: #fdecea; --err-line: #f3c1bc;
  --kind-build: #5a3fe0; --kind-execution: #1f7a4d; --kind-gap: #b3261e; --kind-spike: #8a2fb5;
  --code-keyword: #6b2fd9; --code-string: #0b6b5e; --code-comment: #5f6b85; --code-number: #0b56c7; --code-title: #9c2bb0;
  --code-type: #b04a0a; --code-meta: #2a7a1f; --code-builtin: #7b4ad8; --code-attr: #0b56c7; --code-variable: #b04a0a;
  --diagram-node: #ffffff; --diagram-border: #5a3fe0; --diagram-line: #5f6b85; --diagram-text: #13203a;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-text: "Inter", system-ui, sans-serif;
  --sans: "Inter", system-ui, sans-serif;
  --mono: "Iosevka", ui-monospace, monospace;
  --text-size: 14px;
  --space: 1.05;
  --radius-sm: 2px; --radius: 3px; --radius-md: 3px; --radius-lg: 4px; --radius-xl: 6px; --radius-2xl: 8px;
}
:root[data-theme="dark"] {
  --bg: #0b1020; --panel: #121a2e; --card: #161f36; --hover: #1a2340; --sel: #22285a; --row-sel: #2d3370;
  --ink: #e4e8f5; --muted: #8a93ad; --line: #243052; --tree-line: #35416a;
  --chip-bg: #1b2440; --chip-fg: #b9c0e6; --chip-line: #2c3861;
  --accent: #a596ff; --annot: rgba(165, 150, 255, .32); --annot-hi: #a596ff;
  --live: #5fd49a; --err-fg: #ff8a80; --err-bg: #2d1a1e; --err-line: #5a2a2e;
  --kind-build: #a596ff; --kind-execution: #5fd49a; --kind-gap: #ff8a80; --kind-spike: #d9a6ff;
  --code-keyword: #b8a6ff; --code-string: #6fe3c6; --code-comment: #8a93ad; --code-number: #7fb3ff; --code-title: #e3a2ff;
  --code-type: #ffb070; --code-meta: #8fe08a; --code-builtin: #f0c76a; --code-attr: #7fb3ff; --code-variable: #ffb070;
  --diagram-node: #161f36; --diagram-border: #a596ff; --diagram-line: #8a93ad; --diagram-text: #e4e8f5;
}
m-field::part(label), m-cards::part(label), m-cases::part(label), m-compare::part(label), m-diagram::part(label), m-dag::part(label), m-acceptance::part(label), m-provides::part(label), m-consumes::part(label), m-results::part(label), m-status::part(label), m-decision::part(label), m-input::part(label), m-question::part(label), m-answer::part(label) {
  font-family: var(--mono); font-size: 11px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--accent);
}
m-beat::part(kicker), m-walk::part(kicker) { font-family: var(--mono); font-weight: 500; letter-spacing: .14em; text-transform: uppercase; }
m-stat::part(value) { font-family: var(--mono); font-weight: 500; }
m-walk::part(number) { font-family: var(--mono); }
m-code::part(lang), m-code::part(path) { font-family: var(--mono); }
m-decision::part(submit), m-input::part(submit), m-decision::part(clear), m-input::part(clear) { border-radius: var(--radius-sm); letter-spacing: .02em; }
m-badge::part(badge) { border-radius: var(--radius-sm); }
```
