---
name: systems
description: Use when deciding what a ticket must show for the kind of system it is about — there is no one size. Produces the choice of picture and playable per system: a backend shows its wire and a walk; a frontend renders the component or the page; a CLI shows the transcript; a schema or library shows the same fact in each form; a pipeline shows the timeline and the gate; a method shows itself applied. Each with the live example that demonstrates it.
---

<m-summary>

<m-answer data-field="answer">**The reader's question is the same — *how does it work?* — but the answer looks different for a wire, a page, a command, a shape, a run or a method; pick the picture the system itself would show.**</m-answer>

<m-stat value="8">kinds of system</m-stat>
<m-stat value="3">philosophies, by what the reader is deciding</m-stat>

</m-summary>

<m-cases label="By system">

| the system | the reader must see | the form | shows it |
| -- | -- | -- | -- |
| a backend / an RPC hub | the wires in and out, and one message crossing each | `m-diagram end-state` of parts and wires; an `m-walk` of one request; the surface as one `m-code` block (every method, one line each); a playable of the mechanism the hub owns | [scope](../ticketing/examples/scope.md) (the surface), [execution](../ticketing/examples/execution.md) (the walk), [build](../ticketing/examples/build.md) (the queue, played) |
| a frontend | the thing, working, at the widths it serves | the component in the body; `view: mockup` with `widths:`; the shortcode's theme; the cases table under it; a screenshot of what cannot run in the frame | [pitch](../ticketing/examples/pitch.md) (the throttle and the hill), [feed](../showing/examples/feed.md) (the feed) |
| a CLI / a script | the command and what it printed | `m-code lang="bash"` with the transcript as found; `m-compare` of before and after output; the exit code in the cases | the [spike](../ticketing/examples/spike.md)'s `spike/stream.sh`; the [execution](../ticketing/examples/execution.md)'s `curl` |
| a schema / a library / a type | the same fact in each form it takes | `m-compare labels="a\|b\|c"` of the forms; a why-table of who is on the other end; provides as strong types | [doc](../ticketing/examples/doc.md) (one meter reading, three wires) |
| a pipeline / infra / a deploy | where it stands and whether it is healthy | `m-status` as the timeline; `m-results` as the gate; a sequence diagram of the stages; the release named | [building](../building/SKILL.md)'s In Review step |
| a data finding / a measurement | the number, how it was measured, and the knob | a playable lens with one slider; the metric sheet; the command | [spike](../ticketing/examples/spike.md) |
| a gap in any of these | what happened, as found | the transcript; the sequence with *today / fixed*; before/after | [gap](../ticketing/examples/gap.md) |
| a method / a process | the method applied to itself | the scope cites its own examples; the rules as a cases table; the owner's words quoted | [pattern](../ticketing/examples/pattern.md), this repository's [README](../README.md) |

</m-cases>

<m-cases label="The three philosophies, by what the reader is deciding">

| the reader is… | hold them with | demonstrated by |
| -- | -- | -- |
| placing a bet | the pitch: appetite, a fat-marker sketch, rabbit holes folded, no-gos, the bet as an input, a hill live over the cycle, a stretch throttle | CONE |
| learning a system | the pattern: the picture above, the problem, *therefore*, the smaller patterns cited; every child returns to its parent's picture before it elaborates | PLOT |
| keeping up | the feed: newest change first, unread marked, a streak, an open loop that is true, a pulse on a real change, an end | ROAST |

</m-cases>

A project picks one for its scope and keeps it; the builds and spikes under it keep their own kinds' forms whatever the scope's philosophy. Whatever the system: the summary, the epitome with a figure, the shape as a diagram, the contract as tables, the question as an input, the children cited. The *behaviour shown* is the part that changes with the system.

<m-field data-field="detail" label="A backend — the surface in five lines, the wires in one picture">

The scope example, [../ticketing/examples/scope.md](../ticketing/examples/scope.md), shows the whole surface as five lines of Rust signatures and a flowchart of three wires (its `end-state`). Nothing about the queue is described; the build is cited so the reader plays it.

</m-field>

<m-field data-field="detail" label="A schema — the same fact three ways">

The doc example, [../ticketing/examples/doc.md](../ticketing/examples/doc.md), puts the schema, the JSON and the CSV side by side, and the table under it says who is on the other end of each.

</m-field>

<m-field data-field="detail" label="A frontend — the hill is the hill">

The pitch example's hill, [../ticketing/examples/pitch.md](../ticketing/examples/pitch.md), is not a mock-up of a hill; it is the hill, reading the tracker, following `watch`, with the owner's placement of CONE-4 at 0.46 drawn and labelled as the owner's. (Drawn off the tracker, by `bin/build`, it reads the example's own `tracker:` rows.)

</m-field>

<m-field data-field="detail" label="A method — the pattern returns to its parent">

The pattern example's *Therefore* — its `decided-shape` — names the smaller patterns that complete it, and each of them opens by citing the pattern's picture back: [../ticketing/examples/pattern.md](../ticketing/examples/pattern.md), [pattern-person.md](../ticketing/examples/pattern-person.md).

</m-field>

<m-field data-field="execution">The forms per kind: <a href="../ticketing/SKILL.md">ticketing — one ticket worth a look</a>. The pictures: <a href="../showing/SKILL.md">showing — the picture is the body</a>.</m-field>
