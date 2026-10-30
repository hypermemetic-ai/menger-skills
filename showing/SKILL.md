---
name: showing
description: Use for any body a person will look at, and always for a frontend. Produces the right picture in the right place — a diagram for a shape, a figure beside the epitome, a walk for a path, a playable for a mechanism, the component itself for a frontend, a mockup for a page, a before/after for a change, and a screenshot where none of those can be built into the frame — with the mermaid layouts that render, the SVG that follows the theme, and the attention mechanics that stay honest.
---

<m-summary>

<m-answer data-field="answer">**Lead with the picture a stranger could rebuild the design from, play the mechanism where there is one, render the frontend as itself, and screenshot only what cannot be built in.**</m-answer>

<m-stat value="15">forms, by what they show</m-stat>
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
| a page | the body as the page, at its widths; one view per mockup, its description outside it | `view: mockup` + `widths:`, or one `<m-mockup>` per view |
| a choice between looks | a decision whose options each hold a mockup, picked on the mockup | `<m-mockup>` inside each `<m-option>` of an `<m-decision id>` |
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

An inline SVG in a beat: `viewBox`, `role="img"`, `aria-label`, and only the theme's tokens — `style="fill:var(--accent)"`, `stroke:var(--ink)`, `var(--muted)`, `var(--line)`, `var(--live)`, `var(--err-fg)` — so it reads in both themes and in any project's theme. A fat-marker sketch (the [pitch example](../ticketing/examples/pitch.md)'s, stroke-width 6, round joins) says *this is a shape, not a design*. A figure carries one idea: the seven cars that cannot plug in, the three plots that are empty, the curve climbing to first crack — the feed example's `problem`, [examples/feed.md](examples/feed.md) (`shots/feed.dark.png`).

</m-field>

<m-field data-field="detail" label="Walks">

`m-walk` lights a step as it scrolls into view. One real thing followed through every wire — a tap, a plug, a bean — and at each step the lines that prove it, from the file that owns them (`path=`), with `why=` saying what to look for. Not a tutorial: a walk is the shortest true path through the system, and the reader has seen it work before they reach the tables. The execution example, [../ticketing/examples/execution.md](../ticketing/examples/execution.md), is one.

</m-field>

<m-field data-field="detail" label="Playables">

A component that simulates the mechanism in the body: one evening of homecomings under three policies ([the build example](../ticketing/examples/build.md)), a poll interval slider against a stream ([the spike example](../ticketing/examples/spike.md)). The rules: **it is a field**, not decoration — the cases table, the lens or the intended usage *is* the playable, and a table beside it pins what the reader just saw; **predict before reveal** — ask for a guess, then run, say whether the guess was right, and a guess records nothing; **it calls nothing and records nothing**, only the theme's tokens, and reduced motion runs it to the end at once; **its numbers are the ticket's** — the simulation's outcome is in the acceptance list, and the real system is tested against it.

</m-field>

<m-cases label="The frontend rule — the thing is on the surface">

| when | show |
| -- | -- |
| the ticket is about a component | **the component itself**, defined in the body, rendered where the reader would use it, its docs card beside it (parts, attributes, live examples), the cases table under it; amending the definition re-renders every open instance |
| the deliverable is a page | **the page as a mockup**: `view: mockup` and `widths: 390, 768, 1440`; the framed page sees each width and the Light / Dark / Reduced-motion toggles live; the shortcode's theme on it so it looks like the product |
| the real thing cannot run in the frame (a server, a native library, a device) | **a screenshot**, both themes, the widths that matter, taken with `../menger/scripts/shot.mjs` against the test environment, placed where the component would have been, with one line on what it cannot show (the motion, the live data); an image loads from any URL the reader can reach — keep the file with the work it shows |

</m-cases>

<m-field data-field="detail" label="A mockup is one view (owner, 2026-10-16)">

One mockup, one view: one screen at one state, at the device's viewport. It is not a long page of figures that scrolls through several screens. Its controls work, so the states one view reaches (a menu open, a sheet slid up, a row collapsed) are reached by using it, not drawn again below. Another view is **its own mockup, in its own section of the body**. What the mockup shows and why is **outside it**: the prose above it, or the mockup's own `description` (`<m-mockup description="…">`, APP-42), never a heading or an intro inside the mocked page — and said once: the prose and the `description` never repeat each other (APP-60). On a phone a mockup opens on its narrowest device at about 100%, its other widths a tap away (APP-60), so a 390 width is what most readers see first.

</m-field>

<m-field data-field="detail" label="A decision between looks: a mockup in each option (APP-46)">

When the owner is to choose between looks, the decision's options **each hold their mockup** — an `<m-mockup>` (or a ` ```mockup ` fence) inside each `<m-option>`, one view apiece, described outside the page. The owner picks with **pick this** on a mockup's bar (recorded as the decision's answer, as its card's own Submit would), sees the answer's mockup marked and, once DECIDED, drawn first; **comment** on any mockup's bar leaves feedback on that mockup (and option) in one click. The markup and the rules of asking are [asking — a decision between looks](../asking/SKILL.md); nothing inside the mocked page answers.

</m-field>

<m-field data-field="detail" label="How to make and use a mockup">

1. **One view, one fence.** Write each view as its own fence in its own section of the body: ` ```mockup widths=390,1440 title="Panel open" description="Two groups joined by or." ` and a whole page inside (`<!doctype html>` …). Put a line of prose above it that says why the view is here (what to look at, what it decides), and let `description` say what it shows: **the two never repeat each other** (APP-60: on a phone the reader got the same sentence twice). Saying it once is enough — a `title` and the prose, with no `description`. Nothing explains itself inside the page.
2. **Make it the product.** Use the app's tokens and fonts (`menger/tickets-api/src/tokens.toml`), light and dark, with synthetic data. Make the controls work, so a reader reaches the view's states by using it.
3. **Check it before filing.** In headless Chromium at each width and theme, click every control, check that the document height equals the viewport (no page scroll), and check for page errors. Then render the body on a throwaway menger and look at it.
4. **Ask with it.** For a choice between looks, put one mockup in each `<m-option>` of the decision (asking: a decision between looks). The owner picks with *pick this* on a mockup's bar, or opens *compare these*.
5. **Read the feedback.** Comments arrive on a mockup (*comment* on its bar) or on an element inside it (the annotation mode). Their anchor is `mockup:<ticket>#<n>@<width> >> <selector>`. `comments list --ticket T` lists them.
6. **Compare across tickets.** *Compare* (`c`) on any mockup's bar, then the pill's *open*. A `?compare=T#m1,U#m2` link reopens the set.
7. **Screenshot it** with Playwright (`menger/perf/node_modules`) until `scripts/shot.mjs` can (APP-43). Put the shots in the build's In Review step.

</m-field>

<m-field data-field="detail" label="Showing the owner a page, in their studio (owner, 2026-10-30)">

*"I can talk to you, and you can drive the ui to nav me to particular pages so that you can show me, for instance, a new component we are working on."* When the thing to show is running on a menger with the studio (test, or a throwaway), take the owner there instead of describing it: `ui show` moves every studio session that follows you — the owner turns **follow** on for your agent's name in the studio's top bar, off by default — to `--to` (a studio route: `#/c/<component>?<prop>=<value>` places that component on the canvas with those props, `#/page/<route>`, `#/gallery?q=…`, `#/pages`; or an app route, `/app/#/ticket/…`, opened as a page), puts `--say` up as a note bar with *back* and *dismiss*, and haloes `--point` (a component's name, or a selector within it). It answers `shown { sessions }`, or `refused nobody_follows` when no open session follows you — then ask the owner to turn follow on: a session that does not follow is only knocked, and the show waits an hour for them to follow, then plays. `ui sessions` says who follows you and on which route each is, so you can say where to look. A show is an editor's; it moves a page, never writes one.

```bash
synapse --url wss://app-test.menger.sh/ws --as builder menger ui show --to '#/c/ticket-chip?id=AMP-4' --say 'the chip with its new hover' --point ticket-chip
synapse --url wss://app-test.menger.sh/ws --as builder menger ui sessions
```

What you put live you can name and take back (FRAME-52): `ui tag --version <hash, 6+ of its hex, or a label> --label "…" --tags demo` names a version (every version flag then takes the label), and `ui undo` reverses the service's last move of the live pointer, whoever made it — yours, the owner's, another agent's — so read `ui history` first and pass the move you mean, `ui undo --seq N` (refused `not_the_top` when something moved since); an `author` is an editor's to undo, a push or a rollback the admin's (`may` on the marked row says which), with `ui redo` beside it; the owner's open pages swap at once.

```bash
synapse --url wss://app-test.menger.sh/ws --as builder menger ui tag --version a8bb0885 --label 'the loud chip' --tags demo,chip
synapse --url wss://app-test.menger.sh/ws --as builder menger ui undo
```

</m-field>

A frontend ticket with none of the three is not finished. The pitch example's stretch throttle and hill, [../ticketing/examples/pitch.md](../ticketing/examples/pitch.md), are the components the ticket is about, running in the scope that asks for them, reading the tracker (drawn by `bin/build`, they read the example's own `tracker:` rows: `shots/pitch.png`).

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
../menger/scripts/shot.mjs '#/ticket/AMP-4' --env prod --theme both --width 1100 --out shots
```

</m-code>

The first screen, the diagram drawn, no literal colour, no duplicated badge, the playable's controls visible, the fold lines where they should be. A body on the test environment shoots with `--env test`.

<m-field data-field="execution">The markup: <a href="../surface/SKILL.md">surface — what a body on menger can show, ask, cite and wear</a>. Where each picture sits in a ticket: <a href="../ticketing/SKILL.md">ticketing — one ticket worth a look</a>. Themes and tokens: <a href="../theming/SKILL.md">theming — a project's look is a ticket</a>.</m-field>
