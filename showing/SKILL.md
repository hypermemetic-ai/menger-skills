---
name: showing
description: Use for any body a person will look at, and always for a frontend. Produces the right picture in the right place — a diagram for a shape, a figure beside the epitome, a walk for a path, a playable for a mechanism, the component itself for a frontend, a mockup for a page, a before/after for a change, and a screenshot where none of those can be built into the frame — with the mermaid layouts that render, the SVG that follows the theme, and the attention mechanics that stay honest.
---

<m-summary ticket="SKILL-13">

<m-answer data-field="answer">**Lead with the picture a stranger could rebuild the design from, play the mechanism where there is one, render the frontend as itself, and screenshot only what cannot be built in.**</m-answer>

<m-stat value="14">forms, by what they show</m-stat>
<m-stat value="3">ways to show a frontend</m-stat>

</m-summary>

<m-cases label="Which picture">

| the thing to show | the form | where |
| -- | -- | -- |
| the whole, simply | a figure beside a claim | `m-beat size="lead"` with an inline SVG `slot="figure"` |
| the system when done | one flowchart: the parts and the wires | `m-diagram data-field="end-state"` |
| the plan | the DAG: spikes → gates → builds → the completion gate | `m-dag data-field="dag"` |
| a build's shape | a flowchart or a class/ER diagram | `m-diagram data-field="shape"` |
| a question's structure | the system and the tension in it | `m-diagram data-field="lens"`, or a playable |
| what goes wrong and what should | a sequence diagram with *today* / *fixed* notes | `m-diagram data-field="shape"` in a gap |
| a change | before and after, one diagram, classes for removed · added · unchanged; or two columns | `m-compare labels="today\|done"`, `m-cases before= after=` |
| one path through the code | numbered steps, each over the lines that prove it | `m-walk` + `m-code path lang why` |
| a mechanism | a playable: one knob, a go button, a guess | a `component` block in a field |
| a frontend component | the component itself | its `component` block, rendered in the body |
| a page | the body as the page, at its widths | `view: mockup` + `widths:` |
| progress | a hill, a dial, a ring, a sponge, a feed | `kiln-hill`, `m-dial`, `m-ring`, `m-sponge`, `brew-feed` |
| a measurement | a metric sheet; results as tiles | `m-cases data-field="metric-sheet"`, `m-results` |
| what cannot be built in | a screenshot, both themes | an image in the body, with what it cannot show |

</m-cases>

A section that needs three paragraphs to say how things connect wants a diagram; a diagram that needs three paragraphs to explain is the wrong diagram.

<m-field data-field="decided-shape" label="Diagrams that render">

menger draws a mermaid fence in the theme's palette and checks it on write. What breaks:

- **Boxes hold names, not payloads.** Three to six words a node; the bytes go in a fenced block beside it, tagged with a handle the node repeats.
- **Edge labels are a verb or a condition**, never a sentence.
- **Don't fan many siblings onto one rank** — nine children of one node is a row wider than the page; split the diagram, or stack the groups.
- **Short subgraph titles**, one line.
- **Vertical by default** (`graph TD`); `LR` for a pipeline of wires.
- **Several small diagrams** over one that says everything; one lens each.
- **One before/after diagram**, not a today picture and a tomorrow picture the reader overlays in their head; a legend when three classes are in play.
- **A sequence diagram's note holds one clause** — a `;` ends the statement.

</m-field>

<m-field data-field="detail" label="Figures">

An inline SVG in a beat: `viewBox`, `role="img"`, `aria-label`, and only the theme's tokens — `style="fill:var(--accent)"`, `stroke:var(--ink)`, `var(--muted)`, `var(--line)`, `var(--live)`, `var(--err-fg)` — so it reads in both themes and in any project's theme. A fat-marker sketch (KILN-1, stroke-width 6, round joins) says *this is a shape, not a design*. A figure carries one idea: the seven cars that cannot plug in, the three plots that are empty, the curve climbing to first crack.

<m-cite ref="BREW-1" field="problem"></m-cite>

</m-field>

<m-field data-field="detail" label="Walks">

`m-walk` lights a step as it scrolls into view. One real thing followed through every wire — a tap, a plug, a bean — and at each step the lines that prove it, from the file that owns them (`path=`), with `why=` saying what to look for. Not a tutorial: a walk is the shortest true path through the system, and the reader has seen it work before they reach the tables. <m-ticket ref="VOLT-2" full></m-ticket> is one.

</m-field>

<m-field data-field="detail" label="Playables">

A component that simulates the mechanism in the body: one evening of homecomings under three policies (<m-ticket ref="VOLT-4"></m-ticket>), a poll interval slider against a stream (<m-ticket ref="VOLT-3"></m-ticket>). The rules: **it is a field**, not decoration — the cases table, the lens or the intended usage *is* the playable, and a table beside it pins what the reader just saw; **predict before reveal** — ask for a guess, then run, say whether the guess was right, and a guess records nothing; **it calls nothing and records nothing**, only the theme's tokens, and reduced motion runs it to the end at once; **its numbers are the ticket's** — the simulation's outcome is in the acceptance list, and the real system is tested against it.

<m-cite ref="VOLT-3" field="lens"></m-cite>

</m-field>

<m-cases label="The frontend rule — the thing is on the surface">

| when | show |
| -- | -- |
| the ticket is about a component | **the component itself**, defined in the body, rendered where the reader would use it, its docs card beside it (parts, attributes, live examples), the cases table under it; amending the definition re-renders every open instance |
| the deliverable is a page | **the page as a mockup**: `view: mockup` and `widths: 390, 768, 1440`; the framed page sees each width and the Light / Dark / Reduced-motion toggles live; the shortcode's theme on it so it looks like the product |
| the real thing cannot run in the frame (a server, a native library, a device) | **a screenshot**, both themes, the widths that matter, taken with `../menger/scripts/shot.mjs` against the test environment, placed where the component would have been, with one line on what it cannot show (the motion, the live data); an image loads from any URL the reader can reach — keep the file with the work it shows |

</m-cases>

A frontend ticket with none of the three is not finished. <m-ticket ref="KILN-1"></m-ticket>'s stretch throttle and hill are the components the ticket is about, running in the scope that asks for them, reading the real tracker:

<m-cite ref="KILN-1" field="status"></m-cite>

<m-field data-field="detail" label="Progress, live">A picture of where the work stands reads the tracker and follows `watch`: a dot per build on a hill, placed by status unless the owner placed it (and the hover says which); a dial of a scope; a feed of what changed. Every number is the tracker's; a dot that cannot be placed is a list that wants splitting.</m-field>

<m-cases label="Attention, kept honest">

| kept | refused |
| -- | -- |
| an open loop — *2 of 3 done, one left*, true | a number that is not the tracker's |
| unread — a dot on what changed since you last looked, cleared when seen | fake scarcity, a countdown to nothing |
| a streak — days in a row you came back, this browser's | invented social proof |
| a pulse — live for a minute after a real change | infinite scroll — there is an end, and the feed says so |
| a countdown — days left in a cycle the owner set | a guilt-tripping refusal (*no, I don't want to ship*) |
| a cliffhanger — *then the probe went quiet* → the gap | a cliffhanger with nothing behind it |
| predict before reveal — guess, then run | a reveal that changes what was predicted |

</m-cases>

<m-code lang="bash" why="before saying a body is done: read it as the owner, both themes">

```bash
../menger/scripts/shot.mjs '#/ticket/VOLT-4' --env prod --theme both --width 1100 --out shots
```

</m-code>

The first screen, the diagram drawn, no literal colour, no duplicated badge, the playable's controls visible, the fold lines where they should be. A body on the test environment shoots with `--env test`.

<m-field data-field="execution">The markup: <m-ticket ref="SKILL-2" full></m-ticket>. Where each picture sits in a ticket: <m-ticket ref="SKILL-3" full></m-ticket>. Themes and tokens: <m-ticket ref="SKILL-15" full></m-ticket>.</m-field>
