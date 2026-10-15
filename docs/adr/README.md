# Decision records

Decisions about **how we work on menger** — tiny, numbered, citable as
`per ADR 0001`, and each a doc on the tracker beside the skills. A
decision earns a record when it is hard to reverse, surprising without
context, and a real trade-off was weighed. One to three sentences each for
context, decision and why.

| ADR | doc | one line |
| -- | -- | -- |
| [0001](0001-a-ticket-is-only-relevant-if-a-human-looks-at-it.md) | SKILL-18 | A ticket is only relevant if a human looks at it |
| [0002](0002-the-examples-are-live-tickets.md) | SKILL-19 | The examples are live tickets, cited; screenshots for readers off the surface |
| [0003](0003-assume-the-menger-surface.md) | SKILL-20 | Assume the menger surface; the skills are shown on it; screenshots are the fallback |

Template, as a body:

```markdown
<m-summary ticket="SKILL-n">

<m-badge tone="info">ADR NNNN</m-badge> <m-badge tone="pass">accepted · YYYY-MM-DD</m-badge>

<m-answer data-field="answer">**The decision, in one sentence.**</m-answer>

</m-summary>

<m-field data-field="context">…</m-field>

<m-field data-field="decided-shape" label="Decision">…</m-field>

<m-field data-field="evidence" label="Why">…</m-field>
```
