<m-summary ticket="SKILL-4">

<m-answer data-field="answer">**The scope — *is this worth it, and what will exist when it is done?* — is a shortcode's root and its single entry point: the what/why, the language, the decided shape, the edges, the interface contract, and the children cited. It holds no work and no DAG. It is written as a pitch, so a reader who stops after the first screen can place the bet.**</m-answer>

<m-stat value="Epic">its status, always</m-stat>
<m-stat value="3">ways to hold the reader</m-stat>

</m-summary>

<m-field data-field="context" label="What it opens with">

The epitome — a moment, not a system: *"Tuesday night. The bisque load went in at six. At eleven someone drives back to check the cone."* Then the end state as one diagram. Then the decided shape, in fat marker: three or four decisions, each with its *why* in the owner's words where there are any.

<m-cite ref="KILN-1" field="problem"></m-cite>

</m-field>

<m-field data-field="detail" label="Skeleton">

`````markdown
<m-summary ticket="KILN-1">

<m-field data-field="standing">**One sentence that is true the day this is done.**</m-field>

<m-stat value="2 weeks">appetite</m-stat>
<m-stat value="3">builds under it</m-stat>
<m-stat value="1" tone="warn">bet to place</m-stat>

</m-summary>

<m-beat data-field="problem" kicker="kiln · the pitch" size="lead">

The moment, concretely. Who is where, what goes wrong, what it costs.

**The claim, in bold.**

<svg slot="figure" viewBox="0 0 220 160" role="img" aria-label="…">…var(--accent)…var(--ink)…</svg>

</m-beat>

<m-diagram data-field="end-state">

```mermaid
flowchart LR
  …the system when this is done: the parts and the wires between them…
```

One line under it: what each wire is and why it exists.

</m-diagram>

<m-field data-field="decided-shape">

1. **The decision.** Its why — the owner's words where there are any.
2. …

</m-field>

<m-field data-field="language">

- **term** — one line. NEW → `Newtype`.  |  Glossary ✓.

</m-field>

<m-cases data-field="interface-contract">

| element | definition-state | runtime | consumer |
| -- | -- | -- | -- |
| … | … | … | … |

</m-cases>

<m-field data-field="edges">

Out of scope: …  Defined elsewhere: … (cite it).  Not in scope but arguably should be: … (a gap for the owner).

</m-field>

<m-decision data-field="decision" id="bet" rows="what ships|what doesn't|cost">

<m-question data-field="question">The fork only the owner can take.</m-question>

<m-option data-field="option" name="…" value="…" recommended what-ships="…" what-doesnt="…" cost="…"></m-option>
<m-option data-field="option" name="…" value="…" what-ships="…" what-doesnt="…" cost="…"></m-option>

<m-recommendation data-field="recommendation" by="planner">**The pick.** Why, in one line.</m-recommendation>

</m-decision>

<m-field data-field="execution"><m-ticket ref="KILN-2" full></m-ticket> is the sequence. The look is <m-ticket ref="KILN-6" full></m-ticket>.</m-field>

<m-field data-field="detail" label="Zoom in — the children, from inside the parent">

<m-cite ref="KILN-2" field="dag"></m-cite>

<m-cite ref="KILN-4" field="problem"></m-cite>

</m-field>
`````

</m-field>

<m-callout type="warning" headline="Must not show">Code, file paths, a DAG of its own, the step-by-step. A scope that shows code has leaked a level: move it to the build that owns it and cite that build.</m-callout>

<m-field data-field="detail" label="Live">

A scope can carry a live picture of its own progress — a hill (<m-ticket ref="KILN-1"></m-ticket>'s `kiln-hill`), a dial (`<m-dial scope="KILN-1">`), a feed (<m-ticket ref="BREW-1"></m-ticket>) — so the owner sees where it stands without opening the execution. The picture reads the tracker and follows `watch`; its numbers are never typed.

<m-cite ref="KILN-1" field="status"></m-cite>

</m-field>

<m-cases label="Three ways to hold the reader">

| the reader is… | hold them with | demonstrated by |
| -- | -- | -- |
| placing a bet | the pitch: appetite, the problem, a breadboard, the solution in fat marker, rabbit holes as folded cards, no-gos, the bet as an input; a stretch throttle lets the owner read the gist, the pitch, or everything | KILN-1 |
| learning a system | the pattern: *the society knows its plots* — the pattern above, the problem, *therefore*, and the smaller patterns that complete it, each cited; every child returns to this picture before it elaborates | ALLOT-1 |
| using a product | the moment, the end state, the decided shape, the surface as one code block, the open fork as an input, the children cited | VOLT-1, BREW-1 |

</m-cases>

<m-field data-field="detail" label="The children, cited — as ALLOT-1 does it">

<m-cite ref="ALLOT-1" field="detail"></m-cite>

</m-field>

<m-field data-field="exit" label="Done when">The language resolves, the edges are drawn, the interface contract is stateable, and an execution can be written from it with no new what/why decisions — whatever is still open is an input on the scope or a spike under it, never hidden in prose. Then stop: more detail here is execution leaking upward.</m-field>
