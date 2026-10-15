<m-summary ticket="SKILL-9">

<m-answer data-field="answer">**The doc — *what is so, and why?* — is not work: born `Doc`, never blocked, never counted by a roll-up. It gives the answer first, in one sentence, and the reasons after; shows the same thing from more than one side; keeps every claim beside its source; and says what it could not look at as loudly as what it found.**</m-answer>

<m-stat value="Doc">its only status</m-stat>
<m-stat value="5">kinds of doc</m-stat>

</m-summary>

<m-field data-field="context" label="What it opens with">

`m-answer` as the summary's lead — one sentence that *is* the answer. Then the question it answers. Then the same thing from more than one side: an `m-compare` of three forms, a table of why, the detail folded.

<m-cite ref="VOLT-7" field="answer"></m-cite>

</m-field>

<m-field data-field="detail" label="Skeleton">

`````markdown
<m-summary ticket="VOLT-7">

<m-badge tone="info">the wire, three ways</m-badge>

<m-answer data-field="answer">The same fact crosses three wires in Volt: the vendor's binary RPC stream in, the Plexus stream out to every phone, and a REST row the landlord pulls a month later. One declaration; the hub never writes a second shape.</m-answer>

</m-summary>

<m-question data-field="question">What does one meter reading look like on each of Volt's three wires, and why does each wire exist?</m-question>

<m-compare labels="binary RPC · in|Plexus · out|REST · later">

```text
message Meter { string session = 1; double kwh = 2; int64 at = 3; }
```

```json
{ "type": "meter", "session": "s_311", "flat": "4B", "kwh": 12.4, "at": "22:14:10" }
```

```text
flat,sessions,kwh,eur
4B,11,241.7,67.68
```

</m-compare>

<m-cases label="Why three wires, and not one">

| wire | who is on the other end | why not the others |
| -- | -- | -- |
| binary RPC, bidirectional | the charger's firmware, which we don't own | it speaks the vendor's schema and nothing else |
| … | … | … |

</m-cases>

<m-field data-field="detail" label="The seam">

The reasoning, with its sources beside the claims.

<m-callout type="note" headline="The rule this doc exists for">A wire is chosen by who is on the other end of it, never by taste.</m-callout>

</m-field>

<m-field data-field="left-out">What was not looked at, and why; what the doc cannot derive.</m-field>
`````

</m-field>

<m-cases label="Kinds of doc">

| doc | opens with | shows | example |
| -- | -- | -- | -- |
| a finding (a spike's report, a survey) | the answer | the metric sheet; results as tiles; the `left-out` field | TICKETING-2 |
| an explanation | the answer | the same thing from several sides; the sources beside the claims | VOLT-7 |
| a theme | one line on the look | the swatches, the faces, both modes; the theme block | VOLT-8, KILN-6 |
| a statement (the owner's, dated) | the words | nothing added; filed where they belong | TICKETING-9, TICKETING-10 |
| a skill | the one-line answer | the rules as tables, the examples cited live | SKILL-3 |

</m-cases>

<m-field data-field="detail" label="Three ways, side by side — as VOLT-7 does it">

Open <m-ticket ref="VOLT-7" full></m-ticket>: the schema, the JSON and the CSV in one `m-compare`, then the why-table. Cited here, its detail:

<m-cite ref="VOLT-7" field="detail"></m-cite>

</m-field>

<m-callout type="warning" headline="Must not show">A lifecycle (`set_status` on a doc is refused); a question with no answer (that is a spike); a number typed rather than measured.</m-callout>

<m-field data-field="detail" label="Where it lives">A child of the ticket that produced it — a spike's report under the spike, a close-out under the execution — or under a doc collection's root. Never a file in the repository standing in for it; the tracker is the system of record.</m-field>

<m-field data-field="exit" label="Done when">A reader who cannot open the source can say, from the page alone: what is so, what is unverified, what was not looked at, and what can never be derived (<m-ticket ref="SKILL-14"></m-ticket>).</m-field>
