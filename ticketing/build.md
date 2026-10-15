<m-summary ticket="SKILL-6">

<m-answer data-field="answer">**The build — *what does it do, and how do I call it?* — is one diff one agent can make from the ticket alone: the problem as a beat, then the thing working (a playable, the component itself, a walk down one call) before any table, then the cases that pin it, the contract the next ticket reads, and its own history as a timeline.**</m-answer>

<m-stat value="Pending → Ready → Coding → In Review → Complete">the lifecycle it runs</m-stat>

</m-summary>

<m-field data-field="context" label="What it opens with">

The problem as a beat — *"Two plugs. Nine cars. The plug doesn't know whose turn it is."* — then, before any table, **the thing working**: a playable of the mechanism, the component itself if the build is a frontend, or a walk down one call. The cases table comes after, pinning what the reader just saw.

<m-cite ref="VOLT-4" field="problem"></m-cite>

<m-cite ref="VOLT-4" field="intended-usage"></m-cite>

</m-field>

<m-field data-field="detail" label="Skeleton">

`````markdown
<m-summary ticket="VOLT-4">

<m-field data-field="standing">**`volt.queue` decides who gets the next free plug, and tells every phone the moment it changes.**</m-field>

<m-stat value="3">policies to play</m-stat>
<m-stat value="6" tone="info">behaviours pinned</m-stat>

<m-field data-field="confidence"><m-badge confidence="high"></m-badge> <m-ticket ref="VOLT-3"></m-ticket> pinned the stream; the queue is a sort and a watch.</m-field>

</m-summary>

<m-beat data-field="problem" kicker="volt.queue">

The moment. Who is standing where, and what goes wrong.

<svg slot="figure" …></svg>

</m-beat>

<m-beat center>

Pick a policy. Guess who plugs in last. Then press go.

</m-beat>

<m-field data-field="intended-usage" label="One evening, nine flats, three policies" panel>

<volt-queue></volt-queue>

</m-field>

<m-cases data-field="required-behavior">

| when | then |
| -- | -- |
| a flat calls `join` and a charger is free | `Charging { charger }`, and that charger is told to authorize |
| … | … |

</m-cases>

<m-walk kicker="One join, all the way down" heading="What happens when 4B taps “charge tonight”.">

### The app asks.

<m-code lang="typescript" path="app/src/queue.ts">

```typescript
await volt.queue.join({ flat: "4B", needsKwh: 30 });
```

</m-code>

### …each wire, one step…

</m-walk>

<m-provides data-field="provides">

| Output | Shape (strong-typed) | Consumed by |
| -- | -- | -- |
| `volt.queue.join` / `leave` / `watch` | `Flat`, `Turn { flat, position, needs_kwh }` | the app |

</m-provides>

<m-consumes data-field="consumes">

| Input | Shape (strong-typed) | Produced by |
| -- | -- | -- |
| the stream, not a poll | one bidirectional stream per charger | VOLT-3 |

</m-consumes>

<m-field data-field="must-not-change"><m-badge>`sessions.watch` keeps its shape</m-badge> <m-badge>a charger is never polled</m-badge></m-field>

<m-acceptance data-field="acceptance">

1. Every row of the table holds over synapse, with two simulated chargers.
2. The evening above, replayed against the hub, ends as the playable says.
3. `cargo test` and the app's tests are green.

</m-acceptance>

<m-status data-field="status">

<m-step date="2026-10-13" status="Pending">Filed.</m-step>

</m-status>

```component volt-queue
…the playable: calls nothing, records nothing, only the theme's tokens…
```
`````

</m-field>

<m-callout type="warning" headline="Must not show">Design options (two open options is a spike or a decision, not a build), implementation prescription in the cases, a copy of the parent's rationale. Code appears only in the walk, and only the lines that prove the step.</m-callout>

<m-field data-field="decided-shape" label="When the build is a frontend">

The component is the ticket. Define it in the body, render it where the reader would use it, and give it a docs card with its parts; the cases table says what the reader just did with it. If the whole page is the deliverable, the body *is* the page: `view: mockup` with the widths it must serve, and the shortcode's theme on it so it looks like the product. If the real thing cannot run in the frame, a screenshot of it running — both themes, the widths that matter — and a sentence on what the screenshot cannot show (<m-ticket ref="SKILL-13"></m-ticket>).

</m-field>

<m-field data-field="detail" label="The timeline">

`status` is a dated `m-status`, appended on every move: `Coding` with the branch, `In Review` with the commits and the gate as an `m-results`, `Complete` with the merge (<m-ticket ref="SKILL-12"></m-ticket>). A dated `m-card` under `intended-usage`'s `m-divergence-notes` records where reality diverged, never edited after.

</m-field>

<m-field data-field="detail" label="The contract, as VOLT-4 writes it">

<m-cite ref="VOLT-4" field="provides"></m-cite>

</m-field>

<m-field data-field="exit" label="Done when">Two strangers — one building, one verifying — agree on done from the body alone; the acceptance list is checkable by running, reading or counting; every consumed input names the ticket that produces it; confidence is stated and, if `low`, a spike blocks it.</m-field>
