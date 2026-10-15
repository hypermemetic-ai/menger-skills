---
name: theming
description: Use when a shortcode has readers of its own and should look like its product, or when a body draws with colour. Produces a theme ticket (a doc holding a theme block of token overrides for light and dark, fonts, and the parts it skins), adopted by the shortcode at a reach (frame, ticket or site), checked for contrast in both modes and swept on a throwaway server — so every body under it, every cite of it drawn elsewhere, and every component in it wears the same look.
---

<m-summary ticket="SKILL-15">

<m-answer data-field="answer">**Define the look once as a theme block in a doc under the shortcode, adopt it at the reach the project wants, and write every body and component in tokens so the theme reaches all of it.**</m-answer>

<m-stat value="3">reaches: frame · ticket · site</m-stat>
<m-stat value="4.5 : 1">contrast, every text token on every ground, both modes</m-stat>

</m-summary>

<m-field data-field="context" label="When a shortcode gets a theme">When a person who is not the owner of the tracker will read it — a project with its own readers, a demo, a pitch — or when the look carries meaning (ALLOT reads as a book because its method is a pattern language; BREW is black because it is a feed). The house look is the default and needs nothing.</m-field>

<m-field data-field="detail" label="The theme block — a doc under the shortcode">

`````markdown
<m-summary ticket="VOLT-8">

<m-answer data-field="answer">**Volt's look: a night-sky paper, one violet accent, Space Grotesk for what leads, Plex for what reads and for code, and corners cut square.**</m-answer>

</m-summary>

<m-field data-field="intended-usage">How it is adopted, and at which reach, and why.</m-field>

<m-field data-field="detail" label="What it sets">The paper and ink, the one accent, the faces, the shape — each in a line, with the token it moves.</m-field>

```theme volt
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");
:root {
  --bg: #f6f8fb; --panel: #eef1f6; --card: #ffffff; --line: #dde3ee;
  --ink: #13203a; --muted: #5f6b85;
  --accent: #5a3fe0; --live: #1f7a4d; --err-fg: #b3261e;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-text: "IBM Plex Sans", system-ui, sans-serif; --sans: "IBM Plex Sans", system-ui, sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  --radius-sm: 2px; --radius: 3px; --radius-lg: 4px;
}
:root[data-theme="dark"] {
  --bg: #0b1020; --panel: #121a2e; --card: #161f36; --line: #243052;
  --ink: #e4e8f5; --muted: #8a93ad;
  --accent: #a596ff; --live: #5fd49a; --err-fg: #ff8a80;
}
m-field::part(label), m-cases::part(label) { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); }
m-stat::part(value) { font-family: var(--mono); }
m-badge::part(badge) { border-radius: var(--radius-sm); }
```
`````

<m-ticket ref="VOLT-8" full></m-ticket> sets every token the contract names, the chips, the status colours and the code palette included; the block above is its spine. The rules the write enforces: tokens only from the contract, `../menger/tickets-api/src/tokens.toml` — the grounds and inks (`--bg --panel --card --hover --sel --row-sel --ink --muted --line --tree-line --chip-bg --chip-fg --chip-line --accent --annot --annot-hi --live --err-bg --err-fg --err-line --scrim --shadow`), the kinds and statuses (`--kind-build … --kind-spike`, `--st-pending-bg … --st-doc-fg`), code and diagrams (`--code-keyword … --code-variable`, `--diagram-node --diagram-border --diagram-line --diagram-text`), faces and sizes (`--font-display --font-text --sans --mono --text-size --text-scale --text-leading --space --weight-normal … --weight-bold`), shape (`--radius-xs … --radius-xl --radius-pill --border`) and motion (`--motion-fast --motion-flash --ease`); `:root` for light and `:root[data-theme="dark"]` for dark; `@font-face` and `@import url("https://…")` for faces; `m-x::part(y)` for a part the component's docs declare; looks only. A refusal names the block's line. One ticket owns a theme name, as it owns a component; an orphaned theme is kept while something wears it.

</m-field>

<m-cases label="Adopting it — the reach">

| reach | what wears it |
| -- | -- |
| `frame` | the body's frame alone; the app around it stays the site's — a pitch inside the house |
| `ticket` | the ticket page: frame, header, the page's ground — the project's page in the house's app |
| `site` | everything while a ticket of the shortcode is open — the product |

</m-cases>

<m-code lang="bash" why="one flag, changed at any time">

```bash
synapse -P 4455 menger themes set --scope VOLT --theme volt --reach ticket
synapse -P 4455 menger themes theme_for --id VOLT-4          # who wears what, from which level
synapse -P 4455 menger themes set --scope VOLT --takeover off
```

</m-code>

A ticket says its own in frontmatter (`theme:`, `reach:`, `takeover:`, `frame-theme:`); a hosted shortcode inherits its host's; a reader may turn project themes off in settings. A cited section is drawn in the *cited* ticket's theme — the window below arrives in Volt's violet whatever this page wears — and every open page follows a change in place.

<m-cite ref="VOLT-1" field="standing"></m-cite>

<m-field data-field="decided-shape" label="Writing for a theme">

- **Tokens, never literals**, in every body style, every SVG figure (`style="fill:var(--accent)"`), every component's `<style>`. A literal colour is the one thing the theme cannot reach.
- **Parts on every component**, declared in `<docs>` and present in the template, so the theme can skin it (`m-decision::part(submit)`).
- **A component that paints in JS** follows `this.menger.on('theme', …)` and repaints.
- **Both modes, always.** A theme defines dark; a body is read in both.

</m-field>

<m-cases label="Checking it">

| check | how |
| -- | -- |
| contrast | every text token against every ground it sits on, both modes, at least 4.5 : 1 (`--ink`, `--muted`, `--accent`, `--live`, `--chip-fg`, `--kind-*` on `--bg`, `--panel`, `--card`, `--chip-bg`); a small script over the block's two maps is enough; fix the token, not the body |
| the sweep | `../menger/scripts/theme-sweep.mjs` on a throwaway server, for any change to how anything is painted |
| the look | screenshot a scope, a build and a cite of each under the theme, both modes, and read them |

</m-cases>

<m-cases label="The four themes">

| theme | faces | accent (light · dark) | the look it carries |
| -- | -- | -- | -- |
| `volt` (VOLT-8) | Space Grotesk · IBM Plex Sans · IBM Plex Mono, corners cut square, mono labels | #5a3fe0 · #a596ff | an instrument, not a cushion; night-sky paper in dark |
| `kiln` (KILN-6) | Lora · Work Sans · Fira Code | #b53a0a · #f97316 | a fat-marker pitch, warm |
| `allot` (ALLOT-6) | EB Garamond · Courier Prime, small caps, no radii | #2f6b3a · #8fc98f | a page of the pattern book |
| `brew` (BREW-6) | Inter Tight · Inter · JetBrains Mono, big radii | #c43a09 · #ff6a2a | a feed, black |

</m-cases>

<m-field data-field="execution">The token contract, parts, reach and the sweep in full: `../menger/README.md` → "Themes and their scopes", "A theme is a ticket", "Parts to skin", "The token contract". Figures and components in tokens: <m-ticket ref="SKILL-13" full></m-ticket>.</m-field>
