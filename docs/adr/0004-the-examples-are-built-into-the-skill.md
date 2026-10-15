<m-summary>

<m-badge tone="info">ADR 0004</m-badge> <m-badge tone="pass">accepted · 2026-10-15</m-badge>

<m-answer data-field="answer">**The examples are built into the skill: each a whole body in `<skill>/examples/`, its ids made up, drawn from the file by the menger running here — and no skill reads anything from the tracker. Supersedes ADR 0002.**</m-answer>

</m-summary>

<m-field data-field="context">ADR 0002 illustrated each rule with a live ticket, cited by id. A skill then depended on the tracker's contents: a harness without the tracker saw only ids, a ticket that changed changed the skill, and the repository kept mirroring itself to the tracker and back.</m-field>

<m-field data-field="decided-shape" label="Decision">A rule is illustrated by an example file in the skill that owns it — the actual body, house components and all, self-contained — and other skills link to it, never copy it. Its frontmatter carries its made-up id and the rows its live components read. `bin/build` draws the files through the deployed menger, reading and writing no ticket; `shots/` stays built, never committed. The repository is the source of truth; nothing syncs it with the tracker.</m-field>

<m-field data-field="evidence" label="Why">The owner, 2026-10-15: *"the skills should be changed from using anything in the tracker. if we want examples they should be built into the skill directly."* The trade-off: an example no longer follows a real ticket live, so it can fall behind the method; it is kept honest by being re-drawn in the same pass as a rule changes.</m-field>
