---
name: chatting
description: Use for any message an agent posts in a menger chat — an answer to the owner, a report, a "filed" line, a question. Produces a message a phone reads in one glance, whose tickets are named in the house notation — **ID**, a run **ID..N**, a set **ID/N/M**, an ask **ID** · input — which menger parses into live chips coloured by stage and cards that act under the message.
---

<m-summary>

<m-answer data-field="answer">**Name every ticket a message is about in bold, the id alone — `**AMP-4**`, a run `**CONE-2..5**`, a set `**PLOT-11/12**`, an ask `**AMP-1** · landing` — and the chat draws each as a live chip and a card the owner acts on.**</m-answer>

<m-stat value="4">forms of a name</m-stat>
<m-stat value="20">tickets at most in one run or set</m-stat>

</m-summary>

<m-field data-field="context" label="When this applies">Every message an agent posts in a chat: the builder's answers, the chat bridge's replies, a report after a build, a line saying what was filed. The owner reads chats on a phone; a ticket named in the notation is one tap from its state, its questions and its *go*. (Owner, in chat, 2026-10-20: "i like the notation. standardize it and have this parse it.")</m-field>

<m-cases label="The notation">

| to name | write | the chat draws |
| -- | -- | -- |
| a ticket | `**AMP-4**` — bold, the id alone, then what it is in words if it helps: `**AMP-4** the queue` | a live chip (the id, coloured by its stage: waits on you · ready · in progress · in review · on test · shipped; a tap opens it) and its card under the message |
| a run of numbers | `**CONE-2..5**` — CONE-2, CONE-3, CONE-4 and CONE-5 | one chip `CONE-2..5 4`; a tap opens it to the four chips; a card for each |
| a set | `**PLOT-11/12**` (`**PLOT-3/7/9**`) — those tickets of one shortcode | one chip that opens to its chips; a card for each |
| an ask on a ticket | `**AMP-1** · landing` — the ticket, a middle dot, the input's id | AMP-1's chip, and its card with that question open and marked, answerable there |

</m-cases>

<m-field data-field="decided-shape" label="Rules">

1. **Bold, the id alone.** `**AMP-4**`, never `**AMP-4 the queue**` or `**AMP-4:**` — the inside of the stars is read whole, and anything else in it makes it plain bold text.
2. **A run goes up**: `**CONE-2..5**`; the end is a number, not a second id (`CONE-2..CONE-5` is two plain mentions, no run). **A set is one shortcode's numbers**: `**PLOT-11/12**`. Either names at most 20 tickets; past that, only the first 20 get cards.
3. **An ask is `·` and the input's id** — the id from its `<m-decision id>` / `<m-input id>`, as `tickets inputs list` names it — right after the bold name: `**AMP-1** · landing`. The question still lives on the ticket (see [asking](../asking/SKILL.md)); the chat only points at it.
4. **Bold only what the message is about.** Every bold name is a card under the message; more than two fold to one row, "N tickets", on a phone. A ticket mentioned in passing stays plain — `AMP-4` — and is a plain chip.
5. **Not in code.** A name inside a fenced block (a log, a test's output) is not read at all; inside inline code it is counted for the chat's strip but drawn as code.
6. **Every ticket the message names joins the chat's tickets** — the strip under the chat's head — in all four forms and as a plain id. File the work the owner asks for in a chat with `tickets create --chat N` (see [reaching](../reaching/SKILL.md)), so it shows there even before a message names it.

</m-field>

<m-code lang="markdown" why="a builder's report, for a phone: what changed, in the notation">

```markdown
Built **AMP-4** (the queue) and filed **CONE-2..5** for the kiln's four zones.
**PLOT-11/12** wait on one answer: **PLOT-11** · soil — loam or clay?
In review; it ships with the next deploy.
```

</m-code>

<m-field data-field="execution">How to post it: `synapse … menger chats post --chat N --body @msg.md` — the body is a file ([reaching](../reaching/SKILL.md)). A question the owner must answer is filed on its ticket first ([asking](../asking/SKILL.md)); the message names it with `· input`.</m-field>
