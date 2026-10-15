---
id: PLOT-3
title: 3 · A PLOT IS A PERSON ★★ — the holder is the identity; the number is where they dig
kind: build
status: Ready
parent: PLOT-2
theme: allot
reach: ticket
---

<m-summary ticket="PLOT-3">

<m-badge tone="info">pattern 3</m-badge> <m-badge tone="pass">★★</m-badge>

<m-field data-field="standing">**A PLOT IS A PERSON — the record keeps who holds it; a number on the map is only where they dig.**</m-field>

<m-field data-field="confidence"><m-badge confidence="high"></m-badge> ★★: every society we asked keeps it by person already, on paper.</m-field>

</m-summary>

<m-field data-field="context" label="…this pattern helps complete">

<m-cite ref="PLOT-1" field="end-state"></m-cite>

— it is the `allot.plots` box: the one record.

</m-field>

<m-beat data-field="problem" kicker="pattern 3 · the epitome">

Plot 14 was "Dave's". Dave moved to Hull in February. The map still says 14; the map has no idea who Dave is.

<svg slot="figure" viewBox="0 0 220 140" role="img" aria-label="a plot number crossed out, a person beside it"><rect x="30" y="30" width="70" height="80" style="fill:none;stroke:var(--ink);stroke-width:2"></rect><text x="65" y="80" text-anchor="middle" style="font:600 28px var(--mono);fill:var(--muted)">14</text><path d="M40 40 L90 100 M90 40 L40 100" style="stroke:var(--err-fg);stroke-width:2"></path><circle cx="160" cy="55" r="16" style="fill:none;stroke:var(--accent);stroke-width:3"></circle><path d="M130 115 C130 90 190 90 190 115" style="fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round"></path></svg>

</m-beat>

<m-field data-field="core-transition" label="The problem">

**When a plot is identified by its number, the holder is a note in the margin, and a margin is where people get lost.** The treasurer's ledger is by person; the map is by number; nothing joins them but memory.

</m-field>

<m-field data-field="decided-shape" label="Therefore">

**Make the holder the identity: a `Holding` is a person, a plot and a date; the plot's number is an attribute of where they dig; and a plot with no current holding is, by definition, empty.** Then an empty plot is a query, not a discovery.

</m-field>

<m-cases data-field="required-behavior">

| when | then |
| -- | -- |
| a person takes a plot | `Holding { person, plot, from }`; the plot is held |
| a holder gives notice | the holding gets a `to`; from that day the plot is empty, and `allot.waiting` is told (PLOT-4) |
| `plots.empty` is asked | every plot with no holding whose `to` is unset or past |
| two holdings of one plot overlap | the second is refused, naming the first's person |
| a person holds two plots | allowed: one-per-person is the committee's rule, not the record's |

</m-cases>

<m-code lang="rust" path="allot-api/src/lib.rs" why="the shape, which is the whole pattern">

```rust
pub struct Holding { pub person: Person, pub plot: PlotNo, pub from: Day, pub to: Option<Day> }
allot.plots.empty  {}                       -> Plot*
allot.plots.take   { person, plot, from }   -> Held | Refused { held_by }
allot.plots.notice { person, plot, to }     -> Noticed
```

</m-code>

<m-acceptance data-field="acceptance">

1. Every row of the table holds over synapse.
2. The society's three records are loaded in once, and plot 14 comes out empty without anyone saying so.

</m-acceptance>

<m-field data-field="detail" label="…the smaller patterns that complete it">

None. This pattern is a leaf of the language: it is completed by the record itself.

</m-field>
