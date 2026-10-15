---
id: AMP-7
title: The wire, three ways — one meter reading over the vendor's RPC, Plexus and REST
kind: doc
status: Doc
parent: AMP-1
theme: volt
reach: ticket
---

<m-summary ticket="AMP-7">

<m-badge tone="info">the wire, three ways</m-badge>

<m-answer data-field="answer">The same fact — "4B is on charger B, 12.4 kWh so far" — crosses three wires in Volt: the vendor's binary RPC stream into the hub, the Plexus stream out to every phone, and a REST row the landlord pulls a month later. One declaration; the hub never writes a second shape.</m-answer>

</m-summary>

<m-question data-field="question">What does one meter reading look like on each of Volt's three wires, and why does each wire exist?</m-question>

<m-compare labels="binary RPC · in|Plexus · out|REST · later">

```text
# charger.schema — the vendor's
record Meter {
  session: string
  kwh:     f64
  at:      i64
}
```

```json
// volt.sessions.watch — one item
{ "type": "meter",
  "session": "s_311",
  "flat": "4B",
  "kwh": 12.4,
  "at": "22:14:10" }
```

```text
# GET /rest/volt/invoices/month
flat,sessions,kwh,eur
4B,11,241.7,67.68
```

</m-compare>

<m-cases label="Why three wires, and not one">

| wire | who is on the other end | why not the others |
| -- | -- | -- |
| binary RPC, bidirectional | the charger's firmware, which we don't own | it speaks the vendor's schema and nothing else; a stream both ways, so the hub can authorize and refuse on the same wire |
| Plexus RPC over WebSocket | the residents' app, generated from the hub's schema | it holds `queue.watch` and `sessions.watch` open all evening; REST would poll, and the vendor's RPC has no browser |
| REST, one CSV | the landlord's accounting | it runs a cron with curl once a month and will never hold a socket; and it is the Plexus bridge, not a second server |

</m-cases>

<m-field data-field="detail" label="The seam">

The hub has one vocabulary — `Flat`, `Session`, `Meter`, `Turn` — declared once in `volt-api`. The vendor's side *translates into* it at the edge (`vendor::Meter → Meter`, the flat looked up from the charger's current turn); the Plexus side *is* it (the activation's methods return it); the REST side is the bridge rendering it. There is no third struct.

<m-callout type="note" headline="The rule this doc exists for">A wire is chosen by who is on the other end of it, never by taste. A browser: Plexus. Firmware: whatever the firmware speaks. A cron job: REST — and the same declaration underneath all three.</m-callout>

</m-field>
