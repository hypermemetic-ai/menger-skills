<m-summary ticket="SKILL-1">

<m-answer data-field="answer">**How work is ticketed, planned, asked, built and reported on menger — the methodology written from the ground up for the surface it runs on, in menger's own terms, and shown on that surface: every skill here is a doc on the tracker, and the file in the repository is the same body.**</m-answer>

<m-stat value="11">skills</m-stat>
<m-stat value="6">forms, one per kind</m-stat>
<m-stat value="5">worked examples, live below</m-stat>

</m-summary>

<m-beat data-field="problem" kicker="the premise · the owner, 2026-10-13" size="lead">

A ticket is only relevant if a human being looks at it. The more tickets we construct, the less likely a human is to review them all.

*"We want tickets to be engaging and to show examples of how something should work. We want a visual masterpiece: diagrams, and in the case of frontends, the components rendered directly into the surface."*

<svg slot="figure" viewBox="0 0 240 160" role="img" aria-label="a page with a picture on it, and an eye looking at it"><rect x="30" y="18" width="150" height="124" rx="6" style="fill:none;stroke:var(--ink);stroke-width:2"></rect><path d="M46 38 H120" style="stroke:var(--ink);stroke-width:5;stroke-linecap:round"></path><rect x="46" y="54" width="118" height="52" rx="4" style="fill:var(--accent);opacity:.85"></rect><path d="M46 120 H140 M46 130 H110" style="stroke:var(--line);stroke-width:3;stroke-linecap:round"></path><path d="M196 80 Q214 60 232 80 Q214 100 196 80 Z" style="fill:none;stroke:var(--ink);stroke-width:2.5"></path><circle cx="214" cy="80" r="6" style="fill:var(--ink)"></circle></svg>

</m-beat>

<m-field data-field="context" label="What follows from it">

A ticket is written for the moment a person opens it, and it earns that moment by **showing** — the shape as a diagram, the behaviour as a walk or a playable, the frontend as the component itself — rather than describing. The surface is assumed: a body is HTML and markdown in a sandboxed frame with menger's house components, live chips, cites, inputs and themes. Where a thing cannot be built into the frame, the ticket carries a screenshot. A body that only tells is not finished.

The agent is the second reader. It reads the same body for its structure — the fields, the tables, the contracts — and that structure is what makes the body checkable. One body, two readers: the person gets the arc, the agent gets the fields, and neither is written at the other's expense.

</m-field>

<m-diagram data-field="end-state" label="The arc">

```mermaid
graph TD
  REQ["a request"] -->|"locate it in the tracker"| LOOK["is it worth a look?<br/>a note, or a ticket"]
  LOOK -->|"ticket"| ONE["one ticket, one kind<br/>summary · epitome · shown · asked"]
  ONE -->|"the owner looks"| ASK["inputs answered<br/>Pending → Ready"]
  ASK --> BUILD["Coding → In Review<br/>commits linked, gate shown"]
  BUILD -->|"the pipeline"| DONE["Complete<br/>what was found, as a doc"]
  DONE -.->|"cited, never copied"| ONE
```

A request is placed before it is written; a ticket is filed when someone is about to look at it; the owner answers in the ticket; the builder shows the gate on it; what was found is a doc the next ticket cites.

</m-diagram>

<m-cases label="The skills">

| skill | produces | use when |
| -- | -- | -- |
| SKILL-2 [surface](surface/SKILL.md) | the vocabulary: what a body on menger can show, ask, cite and wear | before writing any body; whenever a component or field is in doubt |
| SKILL-3 [ticketing](ticketing/SKILL.md) | one ticket a person will look at — the summary, the epitome, the ladder down, what it shows | turning anything into a ticket |
| SKILL-4 … SKILL-9 | the forms: [scope](ticketing/scope.md), [execution](ticketing/execution.md), [build](ticketing/build.md), [spike](ticketing/spike.md), [gap](ticketing/gap.md), [doc](ticketing/doc.md) | one per kind |
| SKILL-10 [planning](planning/SKILL.md) | as few tickets as the work needs, placed under what exists, the DAG on the execution, the forks as inputs | a request bigger than one diff |
| SKILL-11 [asking](asking/SKILL.md) | a question the owner answers in the ticket, and the act that closes it | any fork, bet or reply the agent may not make itself |
| SKILL-12 [building](building/SKILL.md) | a build carried Ready → Coding → In Review with its branch, gate and commits on the ticket | implementing a promoted ticket |
| SKILL-13 [showing](showing/SKILL.md) | the right picture: a diagram, a figure, a walk, a playable, the component itself, a screenshot | any body; always for a frontend |
| SKILL-14 [reporting](reporting/SKILL.md) | a doc that answers first and hides nothing | a spike's result, a survey, a status |
| SKILL-15 [theming](theming/SKILL.md) | a project's look, as a theme ticket adopted at a reach | a shortcode with a reader of its own |
| SKILL-16 [systems](systems/SKILL.md) | what a ticket shows for each kind of system — there is no one size | a backend, a frontend, a CLI, a schema, a pipeline, a method |
| SKILL-17 [reaching](reaching/SKILL.md) | the synapse calls a writer and a builder use against menger | any write to the tracker |
| SKILL-18 … SKILL-20 | the decisions: [0001](docs/adr/0001-a-ticket-is-only-relevant-if-a-human-looks-at-it.md) a ticket is only relevant if a human looks at it · [0002](docs/adr/0002-the-examples-are-live-tickets.md) the examples are live · [0003](docs/adr/0003-assume-the-menger-surface.md) assume the surface | how this repository works |

</m-cases>

<m-field data-field="detail" label="The examples are live — each zoomed into from here">

Unlike a methodology written in the abstract, this one points at real tickets on the tracker, each a worked example of a different way of holding a reader. The windows below are live: a change to a scope changes it here.

<m-cite ref="VOLT-1" field="problem"></m-cite>

<m-cite ref="KILN-1" field="problem"></m-cite>

<m-cite ref="ALLOT-1" field="problem"></m-cite>

<m-cite ref="BREW-1" field="problem"></m-cite>

The pictures in the last column are built, not kept: `bin/build` takes them from the menger running on this machine (prod by default, `MENGER_ENV=test` for the test environment) and fails if it is not online.

| ticket | demonstrates | in the repository |
| -- | -- | -- |
| PANTRY-1 | the house style: beats, a walk, a playable ledger, a theme | THEME-6's worked example |
| VOLT-1 … VOLT-8 | a fullstack REST + binary-RPC + Plexus project, one ticket of every kind; a parent that zooms into its children by citing them | [scope](shots/VOLT-1.scope.png) · [execution](shots/VOLT-2.execution.png) · [spike](shots/VOLT-3.spike.png) · [build](shots/VOLT-4.build.png) · [gap](shots/VOLT-6.gap.png) · [doc](shots/VOLT-7.doc.png) |
| KILN-1 … KILN-6 | pitch-and-appetite planning as a ticket: the pitch, the appetite, the breadboard, a live hill, a stretch throttle | [pitch](shots/KILN-1.pitch.png) |
| ALLOT-1 … ALLOT-6 | a pattern language: every ticket returns to the picture above it before it elaborates | [pattern](shots/ALLOT-1.pattern.png) |
| BREW-1 … BREW-6 | the feed: recency, unread, a streak, an open loop — every number true, and an end | [feed, dark](shots/BREW-1.feed.dark.png) |
| TICKETING-1 … | this method's own scope, applying its rules to itself | [scope](shots/TICKETING-1.scope.png) |

</m-field>

<m-field data-field="decided-shape" label="One file, three surfaces">

1. **A skill is a doc on menger.** Each `SKILL.md` here is filed, byte for byte, as a doc under `SKILL-1`; the page you are reading is `README.md`. On the tracker the house components render, the cites are live and the inputs work; the frontmatter (`name`, `description`) is hidden by menger and read by a harness.
2. **The repository is the same bodies.** `bin/sync push` amends every doc from its file; `bin/sync pull` writes every file from its doc; `skills.toml` holds the map. The tracker is the source of truth when they differ.
3. **A harness loads the file.** A coding agent's harness reads `SKILL.md` as text, HTML included, and ignores the frontmatter keys it does not know; a `<m-cite>` in a skill is a pointer an agent follows with `tickets get`.
4. **SOURCE opens the file itself.** When <m-ticket ref="SOURCE-1"></m-ticket> lands, a skill is opened by URI and edited where it is read, and the mirror above becomes unnecessary.

</m-field>

<m-field data-field="edges" label="Relation to ought">

`../ought` was the methodology in the abstract, with every context stripped out. It is retired (owner, 2026-10-14): this repository is the house methodology, and nothing reads ought any more. What ought got right — the two-stranger test, contracts on the edges, spikes for unknowns, the human ratifying at the forks, the tracker as the source of truth — is kept here, rebuilt around the page a person opens. The synapse invocation contract moved into <m-ticket ref="SKILL-17"></m-ticket> [reaching](reaching/SKILL.md).

</m-field>
