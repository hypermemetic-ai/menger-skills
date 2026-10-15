<m-summary>

<m-badge tone="info">ADR 0001</m-badge> <m-badge tone="pass">accepted · 2026-10-13</m-badge>

<m-answer data-field="answer">**A ticket is only relevant if a human looks at it — so a ticket is written for the moment a person opens it, and is filed only when someone is about to.**</m-answer>

</m-summary>

<m-field data-field="context">Agents can file tickets faster than anyone can read them. A tracker full of correct, complete, unread tickets is a tracker nobody steers by.</m-field>

<m-field data-field="decided-shape" label="Decision">A ticket shows how the thing should work — a diagram, a walk, a playable, the component itself — before it describes anything. The number of tickets is a cost the owner pays in attention, and the plan keeps it as low as the work allows: nodes on the execution's DAG stay nodes, marked *(not filed)*, until they are live.</m-field>

<m-field data-field="evidence" label="Why">The owner, 2026-10-13: *"a ticket is only relevant if a human being looks at it. and the more tickets we construct, the less likely a human is to review them all."* The trade-off is deliberate: a less complete tracker that is read over a complete one that is not.</m-field>
