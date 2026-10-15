---
id: CONE-6
title: The kiln theme — warm paper and ember, Iosevka Etoile and Work Sans, soft corners; worn by the bodies only
kind: doc
status: Doc
parent: CONE-1
theme: kiln
reach: frame
---

<m-summary ticket="CONE-6">

<m-badge tone="info">theme</m-badge>

<m-answer data-field="answer">**Kiln's look: warm paper and ember, Iosevka Etoile for what leads, Work Sans for what reads, soft corners — a pitch's friendliness, worn by the bodies only.**</m-answer>

</m-summary>

<m-field data-field="intended-usage">

CONE adopts it reaching the **frame**: only the bodies wear it; the ticket view around them (title, properties, children) and the shell stay the site's. That is the narrowest reach — the one for a project whose *writing* has a voice while its tickets sit in the tracker like everyone else's:

```bash
synapse -P 4455 menger themes set --scope CONE --theme kiln --reach frame
```

</m-field>

<m-field data-field="detail" label="What it sets">

- **Paper and ink**: warm paper and a dark clay ink; in dark, kiln-black and an ember accent.
- **One accent**: terracotta `#b53a0a`, ember `#f97316` in dark — a lit step, the hill's dots, the recommended card.
- **Type**: Iosevka Etoile for titles and leads; Work Sans for text; Iosevka for code.
- **Shape**: soft — `--radius` 10px, pills everywhere, and a little more room (`--space: 1.2`).
- **Parts**: field labels as small sans capitals in the quiet ink; Submit as a pill.

</m-field>

```theme kiln
:root {
  --bg: #faf7f2; --panel: #f3eee5; --card: #ffffff; --hover: #efe8dc; --sel: #f7e6dc; --row-sel: #f2d3c2;
  --ink: #2b2320; --muted: #6f625a; --line: #e6dfd3; --tree-line: #cfc5b6;
  --chip-bg: #f1ebe1; --chip-fg: #6b5a4c; --chip-line: #e2d8ca;
  --accent: #b53a0a; --annot: rgba(181, 58, 10, .32); --annot-hi: #b53a0a;
  --live: #2f6b2f; --kind-build: #a44a17;
  --code-keyword: #b23a0c; --code-string: #2f6b3a; --code-comment: #6f625a; --code-number: #8a4b12; --code-title: #7a3e9d;
  --code-type: #9a4a24; --code-meta: #4f6d22; --code-builtin: #94456f; --code-attr: #2b5f8a; --code-variable: #8a4b12;
  --diagram-node: #ffffff; --diagram-border: #b53a0a; --diagram-line: #76695f; --diagram-text: #2b2320;
  --font-display: "Iosevka Etoile", serif;
  --font-text: "Work Sans", system-ui, sans-serif;
  --sans: "Work Sans", system-ui, sans-serif;
  --mono: "Iosevka", ui-monospace, monospace;
  --text-size: 15px;
  --space: 1.2;
  --radius-sm: 6px; --radius: 10px; --radius-md: 10px; --radius-lg: 14px; --radius-xl: 18px; --radius-2xl: 22px;
}
:root[data-theme="dark"] {
  --bg: #1a1512; --panel: #221c18; --card: #27201b; --hover: #2e2621; --sel: #3d2619; --row-sel: #4d2d1c;
  --ink: #f1e9df; --muted: #a69889; --line: #37302a; --tree-line: #4d443c;
  --chip-bg: #2e2621; --chip-fg: #cdbba9; --chip-line: #3f362e;
  --accent: #f97316; --annot: rgba(249, 115, 22, .32); --annot-hi: #f97316;
  --live: #7cc47c; --kind-build: #f97316;
  --code-keyword: #fb923c; --code-string: #9fd08a; --code-comment: #a69889; --code-number: #e9b46a; --code-title: #d7a6f0;
  --code-type: #f2a96b; --code-meta: #a8d17a; --code-builtin: #e8a0c8; --code-attr: #8fc1e8; --code-variable: #e9b46a;
  --diagram-node: #27201b; --diagram-border: #f97316; --diagram-line: #a69889; --diagram-text: #f1e9df;
}
m-field::part(label), m-cards::part(label), m-cases::part(label), m-compare::part(label), m-diagram::part(label), m-dag::part(label), m-acceptance::part(label), m-provides::part(label), m-consumes::part(label), m-results::part(label), m-status::part(label), m-decision::part(label), m-input::part(label), m-question::part(label), m-answer::part(label) {
  font-family: var(--sans); font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--muted);
}
m-decision::part(submit), m-input::part(submit), m-decision::part(clear), m-input::part(clear) { border-radius: var(--radius-pill); font-weight: 600; }
```
