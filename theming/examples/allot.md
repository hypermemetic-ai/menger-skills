---
id: PLOT-6
title: The allot theme — a book: cream, black, one green, Garamond, no rounded corner
kind: doc
status: Doc
parent: PLOT-1
theme: allot
reach: ticket
---

<m-summary ticket="PLOT-6">

<m-badge tone="info">theme</m-badge>

<m-answer data-field="answer">**Allot's look: a book — cream paper, black ink, one green, Garamond for everything but the code, which is a fixed-width face, and no rounded corner anywhere.**</m-answer>

</m-summary>

<m-field data-field="intended-usage">

PLOT adopts it reaching the **ticket**: a pattern's page — title, properties, body — reads as a page of the book, and the nav and header around it stay the site's:

```bash
synapse -P 4455 menger themes set --scope PLOT --theme allot --reach ticket
```

</m-field>

<m-field data-field="detail" label="What it sets">

- **Paper and ink**: cream and black; in dark, a dim lamp on the same page.
- **One accent**: a deep green `#2f6b3a`; in dark, a moss `#8fc98f`.
- **Type**: EB Garamond for titles, leads and text, a size up; Iosevka for code and ids.
- **Shape**: no radius at all — every corner square, every badge a box.
- **Parts**: field labels in small capitals, in the ink; the walk's numbers in the serif.

</m-field>

```theme allot
:root {
  --bg: #f7f3e8; --panel: #efe9da; --card: #fbf8f0; --hover: #e9e2d0; --sel: #e4ecd9; --row-sel: #cfdfc3;
  --ink: #1c1a17; --muted: #625d53; --line: #ddd5c3; --tree-line: #c2b9a3;
  --chip-bg: #ece6d6; --chip-fg: #574f42; --chip-line: #d9d0bb;
  --accent: #2f6b3a; --annot: rgba(47, 107, 58, .32); --annot-hi: #2f6b3a;
  --live: #2f6b3a; --err-fg: #9b2c1f; --kind-build: #2f6b3a;
  --code-keyword: #7a2f1f; --code-string: #2f6b3a; --code-comment: #625d53; --code-number: #6b4a12; --code-title: #5b3a8c;
  --code-type: #8a4a24; --code-meta: #4f6d22; --code-builtin: #7b4a6f; --code-attr: #2b5f8a; --code-variable: #6b4a12;
  --diagram-node: #fbf8f0; --diagram-border: #1c1a17; --diagram-line: #625d53; --diagram-text: #1c1a17;
  --font-display: "EB Garamond", serif;
  --font-text: "EB Garamond", serif;
  --sans: "EB Garamond", serif;
  --mono: "Iosevka", ui-monospace, monospace;
  --text-size: 17px; --text-leading: 1.55;
  --space: 1.25;
  --radius-xs: 0px; --radius-sm: 0px; --radius: 0px; --radius-md: 0px; --radius-lg: 0px; --radius-xl: 0px; --radius-2xl: 0px;
}
:root[data-theme="dark"] {
  --bg: #15140f; --panel: #1d1b15; --card: #1a1813; --hover: #24211a; --sel: #23301f; --row-sel: #2e4028;
  --ink: #e9e3d3; --muted: #a39d8c; --line: #35322a; --tree-line: #4a463b;
  --chip-bg: #26241d; --chip-fg: #c9c2ad; --chip-line: #3a372e;
  --accent: #8fc98f; --annot: rgba(143, 201, 143, .32); --annot-hi: #8fc98f;
  --live: #8fc98f; --err-fg: #e89a8c; --kind-build: #8fc98f;
  --code-keyword: #f0a58f; --code-string: #9fd08a; --code-comment: #a39d8c; --code-number: #e9c47a; --code-title: #d7a6f0;
  --code-type: #f2b27b; --code-meta: #b0d47a; --code-builtin: #e8b0c8; --code-attr: #9fc9e8; --code-variable: #e9c47a;
  --diagram-node: #1a1813; --diagram-border: #e9e3d3; --diagram-line: #a39d8c; --diagram-text: #e9e3d3;
}
m-field::part(label), m-cards::part(label), m-cases::part(label), m-compare::part(label), m-diagram::part(label), m-dag::part(label), m-acceptance::part(label), m-provides::part(label), m-consumes::part(label), m-results::part(label), m-status::part(label), m-decision::part(label), m-input::part(label), m-question::part(label), m-answer::part(label) {
  font-family: var(--font-display); font-size: 14px; font-weight: 500; font-variant: small-caps; letter-spacing: .06em; text-transform: lowercase; color: var(--ink);
}
m-beat::part(kicker), m-walk::part(kicker) { font-family: var(--font-display); font-variant: small-caps; text-transform: lowercase; letter-spacing: .06em; }
m-stat::part(value), m-walk::part(number) { font-family: var(--font-display); }
m-badge::part(badge) { border-radius: 0; }
m-decision::part(submit), m-input::part(submit), m-decision::part(clear), m-input::part(clear) { border-radius: 0; font-family: var(--font-display); }
```
