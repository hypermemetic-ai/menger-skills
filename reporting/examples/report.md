---
id: AMP-9
title: Report · does anything close a session when its charger's stream reopens?
kind: doc
status: Doc
parent: AMP-6
theme: volt
reach: ticket
---

<m-summary ticket="AMP-9">

<m-answer data-field="answer">No production path closes a session on a new boot_id; two of fourteen simulated nights left a ghost session.</m-answer>

<m-stat value="2 / 14" tone="fail">nights with a ghost</m-stat>
<m-stat value="3" tone="info">call sites read</m-stat>

</m-summary>

<m-question data-field="question">Does anything close a session when its charger's stream reopens?</m-question>

<m-cases data-field="metric-sheet">

| metric | current | target | command |
| -- | -- | -- | -- |
| sessions outliving their stream, 14 nights | 2 | 0 | `spike/ghosts.sh` |

</m-cases>

<m-results label="Gate — volt, as found">

| suite | passed | failed | verdict |
| -- | -- | -- | -- |
| volt-api | 41 | 0 | |
| soak | | | needs the simulator |

</m-results>

<m-cards data-field="evidence">
<m-card headline="Three writers of session state" note="volt/src/chargers.rs:88, sessions.rs:41, 210" fold>All three go through `Sessions::stop`; none is called on stream open.</m-card>
<m-card headline="The simulator reboots nightly" note="spike/sim.toml" tone="muted" fold>`reboot = "02:10"`; a real charger's reboot cadence is unknown.</m-card>
</m-cards>

<m-field data-field="left-out">

- A real charger's reboot cadence: not measured — the simulator's is a guess.
- Billing: not read; `volt.invoices` was out of the ceiling.
- The proposed `Query` command: the vendor's schema has it; whether firmware answers it is **BLIND** — the simulator always answers.

</m-field>
