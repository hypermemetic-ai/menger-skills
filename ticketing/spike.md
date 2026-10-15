<m-summary>

<m-answer data-field="answer">**The spike — *what did we find?* — resolves one unknown with a binary pass/fail and leaves evidence the build it unlocks conditions on. It is read after it has run, for its answer: the finding as the standing, the measurements as stats, the question, and the lens — the structure of the question — drawn, or better, playable.**</m-answer>

<m-stat value="pass / fail">both terminal</m-stat>
<m-stat value="1">slider, where the unknown is a number</m-stat>

</m-summary>

<m-field data-field="context" label="What it opens with">

The finding, as the standing: *"The charger streams. Polling it would leave a plug sitting unnoticed for up to the poll interval."* Then the question, then the lens. A spike not yet run opens with the question and the lens, and its standing says what will be measured.

The spike example opens so — its `standing`, then its `lens`, a playable: [examples/spike.md](examples/spike.md) (`shots/spike.png`).

</m-field>

<m-field data-field="detail" label="Skeleton">

`````markdown
<m-summary ticket="AMP-3">

<m-field data-field="standing">**The finding, in one sentence, once known — else what will be measured.**</m-field>

<m-stat value="≤ 1 s" tone="pass">a plug-out seen, streamed</m-stat>
<m-stat value="8,640" tone="info">meter messages a night</m-stat>

</m-summary>

<m-question data-field="question">Does the charger stream, or must the hub poll it?</m-question>

<m-field data-field="lens" label="One plug-out, ten minutes around it: drag the poll interval">

<volt-poll></volt-poll>

</m-field>

<m-field data-field="setup">Count-first; what was run, on what, under what ceiling.</m-field>

<m-field data-field="pass-condition">Binary: … — yes or no.</m-field>

<m-cases data-field="metric-sheet">

| approach | a plug-out is noticed | messages a night | charger idle with a car waiting |
| -- | -- | -- | -- |
| **the vendor's `Stream`** | **≤ 1 s** | 8,640 | **0 min** |
| poll every 60 s | ≤ 60 s | 1,440 | 1.5 min |

</m-cases>

<m-code lang="bash" path="spike/stream.sh" why="how it was measured">

```bash
…the command whose re-run is the build's acceptance gate…
```

</m-code>

<m-field data-field="fail-consequence">If no: … — the build is descoped, recorded on the scope.</m-field>

<m-decision data-field="decision">

<m-question data-field="question">How does the hub learn what a charger is doing?</m-question>

<m-option data-field="option" name="The vendor's stream" value="stream" picked cost="…" benefit="…"></m-option>
<m-option data-field="option" name="Poll GetStatus" value="poll" cost="…" benefit="…"></m-option>

<m-answer data-field="answer" by="owner" date="2026-10-02"><strong>DECIDED:</strong> the stream. The owner's words.</m-answer>

</m-decision>

```component volt-poll
…the lens, playable: the question's structure with one knob…
```
`````

</m-field>

<m-field data-field="decided-shape" label="The lens, and the metric sheet">

1. **The lens is the structure of the question**, never the process DAG (the execution draws that): what is in tension, where the unknown sits, which way the knob turns. Where the unknown is quantitative, the lens is a playable with one slider — the reader moves it and sees the finding form. Where it is structural, an `m-diagram data-field="lens"` of the system and the question cluster.
2. **The metric sheet** is `metric → current (measured) → target → the command that measures it`. The command becomes the unlocked build's acceptance gate; re-running it is the regression test. A finding that cannot be written as a metric with a command is not finished.

The spike example's `metric-sheet`, with the command under it: [examples/spike.md](examples/spike.md).

</m-field>

<m-callout type="warning" headline="Must not show">Implementation steps, a judgement call dressed as a pass condition, a process DAG. A spike needing a judgement call is a decision for the owner, filed as an input.</m-callout>

<m-field data-field="exit" label="Done when">It has a result — pass or fail, both terminal — and the evidence is on the page: the metric sheet, the command, the decision recorded with the owner's why. A fail is a confirmed constraint; the consumer adapts, the spike still closes.</m-field>
