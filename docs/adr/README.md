# Decision records

Decisions about **how we work on menger** — tiny, numbered, citable as
`per ADR 0001`, and kept here beside the skills. A decision earns a record
when it is hard to reverse, surprising without context, and a real
trade-off was weighed. One to three sentences each for context, decision
and why. A superseded record stays, marked, and names its successor.

| ADR | one line |
| -- | -- |
| [0001](0001-a-ticket-is-only-relevant-if-a-human-looks-at-it.md) | A ticket is only relevant if a human looks at it |
| [0002](0002-the-examples-are-live-tickets.md) | The examples are live tickets, cited — superseded by 0004 |
| [0003](0003-assume-the-menger-surface.md) | Assume the menger surface; screenshots are the fallback |
| [0004](0004-the-examples-are-built-into-the-skill.md) | The examples are built into the skill; nothing reads the tracker |

Template, as a body:

```markdown
<m-summary>

<m-badge tone="info">ADR NNNN</m-badge> <m-badge tone="pass">accepted · YYYY-MM-DD</m-badge>

<m-answer data-field="answer">**The decision, in one sentence.**</m-answer>

</m-summary>

<m-field data-field="context">…</m-field>

<m-field data-field="decided-shape" label="Decision">…</m-field>

<m-field data-field="evidence" label="Why">…</m-field>
```
