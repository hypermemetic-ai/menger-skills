---
id: AMP-3
title: Spike: does the charger stream, or must the hub poll it?
kind: spike
status: Complete
parent: AMP-2
theme: volt
reach: ticket
tracker:
  - AMP-6 · gap · Pending · Gap · a charger reboots at two in the morning and its session never ends
---

<m-summary ticket="AMP-3">

<m-field data-field="standing">**The charger streams. Polling it would leave a plug sitting unnoticed for up to the poll interval, three times a night, with a car waiting each time.**</m-field>

<m-stat value="≤ 1 s" tone="pass">a plug-out seen, streamed</m-stat>
<m-stat value="8,640" tone="info">meter messages a night</m-stat>
<m-stat value="0 min" tone="pass">charger idle with a car waiting</m-stat>

</m-summary>

<m-question data-field="question">Does the charger stream, or must the hub poll it?</m-question>

<m-field data-field="lens" label="One plug-out, ten minutes around it: drag the poll interval">

<volt-poll></volt-poll>

</m-field>

<m-field data-field="metric-sheet">

| approach | a plug-out is noticed | messages a night, two chargers | charger idle with a car waiting, a night |
| -- | -- | -- | -- |
| **the vendor's `Stream`** | **≤ 1 s** | 8,640 (a meter every 10 s) | **0 min** |
| poll `GetStatus` every 60 s | ≤ 60 s | 1,440 | 1.5 min |
| poll every 300 s | ≤ 300 s | 288 | 7.5 min |

Measured over one simulated week on the vendor's simulator, three plug-outs a night. A charger that sits "busy" after a plug-out is a charger the next car cannot have.

</m-field>

<m-code lang="bash" path="spike/stream.sh" why="how it was measured">

```bash
charger-sim stream sim:9090 < events.ndjson \
  | jq -r 'select(.kind=="plug_out") | .at' | while read t; do echo "$t $(date +%s.%N)"; done   # ≤ 1 s, every time
```

</m-code>

<m-decision data-field="decision">

<m-question data-field="question">How does the hub learn what a charger is doing?</m-question>

<m-option data-field="option" name="The vendor's bidirectional stream" value="stream" picked cost="one open stream per charger, and a reconnect to get right" benefit="a plug-out in under a second, and the hub can authorize and refuse on the same wire"></m-option>
<m-option data-field="option" name="Poll GetStatus" value="poll" cost="a plug unnoticed for up to the interval, a car waiting every time" benefit="stateless, and a dead charger is just a timeout"></m-option>

<m-answer data-field="answer" by="owner" date="2026-10-02"><strong>DECIDED:</strong> the stream. "Nobody is going to stand there for five minutes because we were saving messages." The reconnect is <m-ticket ref="AMP-6"></m-ticket>'s problem.</m-answer>

</m-decision>

```component volt-poll
<template>
<div class="lanes" part="lanes">
<div class="lane"><span class="name">stream</span><div class="strip" data-lane="stream"></div></div>
<div class="lane"><span class="name">poll</span><div class="strip" data-lane="poll"></div></div>
</div>
<div class="ctl" part="controls"><label>poll every <b class="n">60 s</b></label><input type="range" min="10" max="300" step="10" value="60" aria-label="poll interval in seconds"></div>
<dl class="out" part="readout">
<div><dt>this plug-out noticed after</dt><dd class="late"></dd></div>
<div><dt>charger idle with a car waiting, a night</dt><dd class="idle"></dd></div>
<div><dt>messages a night, two chargers</dt><dd class="msgs"></dd></div>
</dl>
</template>
<style>
:host{display:block}
.lanes{display:grid;gap:.9rem;margin:.6rem 0 .2rem}
.lane{display:grid;grid-template-columns:4.5rem 1fr;gap:.8rem;align-items:center}
.name{font:var(--weight-medium) calc(13px * var(--text-scale)) var(--sans);color:var(--ink)}
.strip{position:relative;height:2.6rem}
.strip::before{content:'';position:absolute;left:0;right:0;top:1.1rem;height:8px;border-radius:var(--radius-pill);background:var(--line)}
.tick{position:absolute;top:1rem;width:1px;height:10px;background:var(--muted);opacity:.6}
.ev{position:absolute;top:.6rem;width:2px;height:18px;background:var(--ink);transform:translateX(-1px)}
.gap{position:absolute;top:1.1rem;height:8px;background:var(--err-fg);border-radius:var(--radius-pill)}
.seen{position:absolute;top:.6rem;width:2px;height:18px;background:var(--live);transform:translateX(-1px)}
.lbl{position:absolute;top:0;transform:translate(-50%,-.1rem);font:calc(10.5px * var(--text-scale)) var(--mono);color:var(--muted);white-space:nowrap}
.lbl.out{color:var(--ink)}
.hr{position:absolute;bottom:0;font:calc(10.5px * var(--text-scale)) var(--mono);color:var(--muted)}
.ctl{display:flex;flex-wrap:wrap;gap:.8rem;align-items:center;margin:.5rem 0}
.ctl label{font:calc(13px * var(--text-scale)) var(--sans);color:var(--ink)}
.ctl b{font:var(--weight-strong) calc(13px * var(--text-scale)) var(--mono)}
input{flex:1;min-width:10rem;accent-color:var(--accent)}
.out{display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));gap:.6rem 1rem;margin:.6rem 0 0}
.out div{display:flex;flex-direction:column;gap:.1rem}
dt{font:calc(12px * var(--text-scale)) var(--sans);color:var(--muted)}
dd{margin:0;font:var(--weight-strong) calc(17px * var(--text-scale)) var(--font-display);color:var(--ink)}
dd small{font:calc(12px * var(--text-scale)) var(--mono);color:var(--muted);margin-left:.4rem}
dd.bad{color:var(--err-fg)}
@media (max-width:520px){.lane{grid-template-columns:1fr}}
</style>
<docs>
  <summary>AMP-3's lens: one plug-out at 20:16, ten minutes around it, on the stream and under a poll; drag the poll interval and watch the unnoticed gap.</summary>
  <part name="lanes">The two lanes: the stream's hairline and the poll's ticks, with the gap in the error colour.</part>
  <part name="controls">The poll-interval slider.</part>
  <part name="readout">The three numbers for the chosen interval, against the stream's.</part>
  <example><volt-poll></volt-poll></example>
  An illustration of the spike's numbers. It calls nothing. Only the theme's tokens.
</docs>
<script>
const $ = (q) => this.root.querySelector(q), range = $('input');
const WIN = 600, OUT = 247, OUTS = 3, NIGHT = 12 * 3600;   // ten minutes, the plug-out 4:07 in; three a night
const pct = (s) => (s / WIN) * 100;
const lane = (el, seenAt, ticks) => {
  el.innerHTML = '';
  for (const t of ticks) el.insertAdjacentHTML('beforeend', `<i class="tick" style="left:${pct(t)}%"></i>`);
  el.insertAdjacentHTML('beforeend', `<span class="lbl out" style="left:${pct(OUT)}%">plug out · 20:16:07</span><i class="ev" style="left:${pct(OUT)}%"></i>`);
  if (seenAt > OUT + 2) el.insertAdjacentHTML('beforeend', `<i class="gap" style="left:${pct(OUT)}%;width:${pct(seenAt - OUT)}%"></i>`);
  el.insertAdjacentHTML('beforeend', `<i class="seen" style="left:${pct(seenAt)}%"></i><span class="hr" style="left:0">20:12</span><span class="hr" style="right:0">20:22</span>`);
};
const draw = () => {
  const n = +range.value, seen = Math.ceil(OUT / n) * n, late = seen - OUT;
  $('.n').textContent = `${n} s`;
  lane($('[data-lane=stream]'), OUT + 1, []);
  lane($('[data-lane=poll]'), seen, Array.from({ length: Math.floor(WIN / n) + 1 }, (_, k) => k * n));
  $('.late').innerHTML = `${late} s<small>up to ${n} s · stream ≤ 1 s</small>`;
  $('.idle').innerHTML = `${(OUTS * n / 2 / 60).toFixed(1)} min<small>stream 0 min</small>`;
  $('.idle').classList.toggle('bad', n >= 60);
  $('.msgs').innerHTML = `${(2 * NIGHT / n).toLocaleString('en')}<small>stream 8,640</small>`;
};
range.oninput = draw;
draw();
</script>
```
