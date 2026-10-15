---
id: ROAST-6
title: The brew theme — a feed: black, one ember, Inter Tight for the numbers; all of menger wears it
kind: doc
status: Doc
parent: ROAST-1
theme: brew
reach: site
---

<m-summary ticket="ROAST-6">

<m-badge tone="info">theme</m-badge>

<m-answer data-field="answer">**Brew's look: a feed — black, one ember, Inter Tight for the numbers that lead, Inter for the rest, pills and big rounded cards; the whole of menger wears it while a ROAST ticket is open.**</m-answer>

</m-summary>

<m-field data-field="intended-usage">

ROAST adopts it reaching the **site**: while a ROAST ticket is open, the nav, the header and the page all wear it — the widest reach, for a project whose look *is* the point:

```bash
synapse -P 4455 menger themes set --scope ROAST --theme brew --reach site
```

The theme is dark-first — the feed's natural mode — and the light mode is the same feed in daylight.

</m-field>

<m-field data-field="detail" label="What it sets">

- **Paper and ink**: black and near-white; in light, white and near-black.
- **One accent**: ember `#ff6a2a` in dark, `#c43a09` in light — the unread dot, the pulse, the "more" button, a lit step.
- **Type**: Inter Tight, heavy and tight, for the numbers and the leads; Inter for text; Iosevka for code and ids.
- **Shape**: big radii — `--radius` 12px, cards at 20px, pills for every badge; bold weights up a notch.
- **Parts**: a stat's number at 34px in the display face; field labels tiny, spaced capitals; Submit filled with the accent.

</m-field>

```theme brew
:root {
  --bg: #ffffff; --panel: #f4f4f5; --card: #fafafa; --hover: #ececee; --sel: #ffe8df; --row-sel: #ffd3c2;
  --ink: #111111; --muted: #66666c; --line: #e4e4e7; --tree-line: #c9c9cf;
  --chip-bg: #f0f0f2; --chip-fg: #4a4a52; --chip-line: #dcdce0;
  --accent: #c43a09; --annot: rgba(196, 58, 9, .32); --annot-hi: #c43a09;
  --live: #12703a; --err-fg: #c81e1e; --kind-build: #c43a09;
  --code-keyword: #d12d0a; --code-string: #0e6b5a; --code-comment: #66666c; --code-number: #0b56c7; --code-title: #8a2fb5;
  --code-type: #a1480e; --code-meta: #2a7a1f; --code-builtin: #6b3fd1; --code-attr: #0b56c7; --code-variable: #a1480e;
  --diagram-node: #fafafa; --diagram-border: #111111; --diagram-line: #66666c; --diagram-text: #111111;
  --font-display: "Inter Tight", "Inter", system-ui, sans-serif;
  --font-text: "Inter", system-ui, sans-serif;
  --sans: "Inter", system-ui, sans-serif;
  --mono: "Iosevka", ui-monospace, monospace;
  --text-size: 15px;
  --weight-strong: 700; --weight-bold: 800;
  --space: 1.1;
  --radius-sm: 8px; --radius: 12px; --radius-md: 12px; --radius-lg: 16px; --radius-xl: 20px; --radius-2xl: 24px;
}
:root[data-theme="dark"] {
  --bg: #0a0a0a; --panel: #141414; --card: #1a1a1a; --hover: #202020; --sel: #3a1a0e; --row-sel: #4a2212;
  --ink: #f5f5f5; --muted: #9a9aa0; --line: #262626; --tree-line: #3a3a3a;
  --chip-bg: #1f1f1f; --chip-fg: #c8c8cc; --chip-line: #2e2e2e;
  --accent: #ff6a2a; --annot: rgba(255, 106, 42, .32); --annot-hi: #ff6a2a;
  --live: #4ade80; --err-fg: #ff7b72; --kind-build: #ff6a2a;
  --code-keyword: #ff7b72; --code-string: #7ee0c5; --code-comment: #9a9aa0; --code-number: #79c0ff; --code-title: #d2a8ff;
  --code-type: #ffa657; --code-meta: #7ee787; --code-builtin: #c7a4ff; --code-attr: #79c0ff; --code-variable: #ffa657;
  --diagram-node: #1a1a1a; --diagram-border: #ff6a2a; --diagram-line: #9a9aa0; --diagram-text: #f5f5f5;
}
m-field::part(label), m-cards::part(label), m-cases::part(label), m-compare::part(label), m-diagram::part(label), m-dag::part(label), m-acceptance::part(label), m-provides::part(label), m-consumes::part(label), m-results::part(label), m-status::part(label), m-decision::part(label), m-input::part(label), m-question::part(label), m-answer::part(label) {
  font-family: var(--sans); font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted);
}
m-stat::part(value) { font-family: var(--font-display); font-weight: 800; font-size: 34px; letter-spacing: -.02em; }
m-beat::part(kicker), m-walk::part(kicker) { font-family: var(--mono); font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
m-decision::part(submit), m-input::part(submit) { background: var(--accent); border-color: var(--accent); color: var(--bg); font-weight: 700; }
```
