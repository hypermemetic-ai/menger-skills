---
id: PLOT-4
title: 4 · THE WAITING LIST IS PUBLIC ★ — a name can see its place; the council pulls the register
kind: build
status: Pending
parent: PLOT-2
theme: allot
reach: ticket
---

<m-summary ticket="PLOT-4">

<m-badge tone="info">pattern 4</m-badge> <m-badge tone="warn">★</m-badge>

<m-field data-field="standing">**THE WAITING LIST IS PUBLIC — a name on it can see its own place, and the council's register is a view of it, pulled.**</m-field>

<m-field data-field="confidence"><m-badge confidence="medium"></m-badge> ★: public to members is certain; public to the council's page is the question pattern 5 asks.</m-field>

</m-summary>

<m-field data-field="context" label="…this pattern helps complete">

<m-cite ref="PLOT-1" field="end-state"></m-cite>

— it is `allot.waiting` and `allot.register`: the two views out of the one record.

</m-field>

<m-beat data-field="problem" kicker="pattern 4 · the epitome" flip>

Thirty-one names in a drawer. The eleventh name has rung the secretary four times this year to ask whether she is still eleventh.

<svg slot="figure" viewBox="0 0 220 140" role="img" aria-label="a list of names, the eleventh marked"><g style="stroke:var(--line);stroke-width:4;stroke-linecap:round"><path d="M50 30 H170"></path><path d="M50 50 H150"></path><path d="M50 70 H160"></path><path d="M50 90 H140"></path><path d="M50 110 H165"></path></g><path d="M50 70 H160" style="stroke:var(--accent);stroke-width:4;stroke-linecap:round"></path><text x="30" y="75" style="font:600 14px var(--mono);fill:var(--accent)">11</text></svg>

</m-beat>

<m-field data-field="core-transition" label="The problem">

**A list only its keeper can read is re-asked once a week, and every answer is a small favour.** The register the council wants is the same list in another order, typed again each quarter.

</m-field>

<m-field data-field="decided-shape" label="Therefore">

**Let every member see the whole list with their own name marked; let the council pull the register from it; and let a plot falling empty move the list by itself.**

</m-field>

<m-cases data-field="required-behavior">

| when | then |
| -- | -- |
| a member opens the list | every place, names as pattern 5 allows, their own marked |
| a plot falls empty (PLOT-3) | `Offered { plot, to: the first name }`, and the list says so |
| the clerk pulls `GET /rest/allot/register/quarter?q=2026-Q4` with `Accept: text/csv` | plots, holders and the list, as the council's form wants them |
| an offer is not taken in 14 days | the next name is offered; the first keeps its place |

</m-cases>

<m-acceptance data-field="acceptance">

1. Every row of the table holds over synapse and curl.
2. The eleventh name stops ringing.

</m-acceptance>

<m-field data-field="detail" label="…the smaller patterns that complete it">

<m-cite ref="PLOT-5" field="question"></m-cite>

</m-field>
