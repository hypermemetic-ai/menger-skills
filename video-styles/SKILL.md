---
name: video-styles
description: Use when a film is about to be drawn, or an existing one is to be matched — to pick its look and draw to it. Says which looks we have (neurons, for a milestone film; paper, for an argument), and gives paper in full, the look of "Why these tools suck" — its field, ink, surfaces, type, colour, the way a headline arrives, how things move, what the sound is and how it ends — as values to copy. How a film is made, cut and checked is video-editing.
---

<m-summary>

<m-answer data-field="answer">**A film's look is chosen before a frame is drawn and then copied, not invented: neurons on navy for a milestone, paper for an argument. Paper is a dark, quiet page: one sentence in ink at the top, one made-up interface in soft grey cards under it, colour only for who and for what state, and a number in the corner that counts.**</m-answer>

<m-stat value="2">looks in use</m-stat>
<m-stat value="1">sentence on screen at a time</m-stat>
<m-stat value="7">colours for who, 5 for state</m-stat>

</m-summary>

How a film is made, reframed, timed and checked is [video-editing](../video-editing/SKILL.md). This page is only what one looks like.

<m-cases label="The looks">

| look | for | what it is at a glance | where it is |
| -- | -- | -- | -- |
| **neurons** | a milestone film: what happened, how a thing works | a deep navy field, glowing nodes with dendrites, light along curved paths, a small terminal typing real commands, a caption low in the frame | [video-editing](../video-editing/SKILL.md), "The house look"; `~/.cache/plexus-film/check.jpg` |
| **paper** | an argument for people outside: a claim, told with interfaces that are no one's | a near-black page, a headline in ink at the top, grey cards that fill up, a counter in the corner | below; `~/.cache/showreel-work/showreel/` (`studio.html`, `kit.mjs`), its sheets `~/.cache/showreel-work/phone/out/sheet-three.jpg` (wide) and `sheet-tall.jpg` (upright) |

Use the look the kind of film calls for unless the owner names another. Read the look's contact sheet before writing a frame.

</m-cases>

<m-field data-field="context" label="Paper: what it looks like">

Chosen by the owner (2026-11-08) after a film he keeps as his example of a demo done well: "we want that theme… a dark theme, soft on the eyes… calmer sounds". In the studio's own words it is "paper, ink, a grotesk".

- **A page, not a stage.** The whole frame is one near-black field, a shade lighter in the middle. Nothing glows, nothing has a gradient of its own, there is no grid and no vignette.
- **One sentence at the top, centred, in ink.** It is the argument, said plainly ("It started small." "Then the tickets piled up."). It is the largest thing in the frame and the only words that are not part of the picture.
- **One interface under it, made up.** A chat window, a ticket, an inbox, a diff, a pipeline: drawn as soft grey cards with a hairline ring and a deep, soft shadow, generic enough to be no product's. What is to be read is real text; everything else is a grey bar.
- **Colour is small and means something.** A dot of colour is who (an agent). A tinted chip is a state. An outline in red is wrong. The page itself never takes a colour.
- **A counter in the corner.** A pill, bottom left: a number in bold and a few grey words ("**77** questions waiting on you"). The picture fills up; the pill says by how much. Nothing else says so.
- **It ends on a question,** large and alone, with our mark and the handle under it in grey.

</m-field>

<m-field data-field="decided-shape" label="Paper: the rules">

1. **Every scene is one step, twice.** First the step working, small enough to follow (six agents, four questions, a diff of seventeen lines); then the same step at the size it really runs at, growing on a curve that starts slowly and runs away, while the view pulls back. No scene explains, compares or sums up.
2. **One subject a frame.** The headline, the interface, the counter. A second window appears only to hand something over, and the first leaves.
3. **A headline arrives a word at a time.** Each word rises 10 px out of an 8 px blur over 0.45 s, 0.13 s after the one before; the next word waits in grey until its turn. It leaves by blurring out. One line where it fits; never more than two.
4. **A surface is a grey card.** `#22262e`, corners 14–22 px, a ring of one white pixel at 13%, a shadow straight down, wide and soft. Something inside a card is a shade lighter (`#2b2f38`: a bubble, a chip, a row) or a shade darker (`#191b20`: code, a diagram). Lines between things are `#30343e`.
5. **Type is one grotesk.** Inter, weight 450 for text, 500 for the headline, 600 for a title, tracked in by 0.015 em; a system mono for code only. Numbers that change are tabular.
6. **Who is a dot; state is a chip.** The seven agent colours are for dots and nothing else. Working is blue, waiting on review amber, done green, wrong red; the thing chosen is filled with ink.
7. **Things come in softly and settle once.** A new thing rises 12 px as it fades in over 0.35 s. A window may arrive small and tilted back in perspective and settle flat, in one eased move. A thing that pops (a card landing) overshoots a little. Nothing bounces twice, spins, flashes or shakes hard; a scene gives way to the next by a half-second crossfade.
8. **Growth is the only spectacle.** Tens become thousands: cards become marks, marks become a texture, and the counter keeps counting. The pull-back is the camera's, smooth and a little ahead of the growth.
9. **The sound is one quiet piece of music.** A slow chord bed in D that follows the story (home when something lands, uneasy when things multiply, a wrong low note when something fails, unresolved on the last question) and a soft note for each thing that happens. Nothing ticks, types or clicks. Mixed dark and small: a low-pass near 5 kHz, a little room, peaking at −7 dB.
10. **Nothing of ours is shown.** No real product, ours or anyone's, no logo but the mark at the end, no command, no URL.

</m-field>

<m-field data-field="detail" label="Paper: the values">

```css
/* the page */
background: radial-gradient(120% 90% at 50% 40%, #121419 55%, #0c0e12);
--ink: #ecebe6;  --sub: #abafb8;  --ghost: #666b79;      /* words · secondary words · a word waiting its turn */
font-family: "Inter", sans-serif; font-weight: 450; letter-spacing: -0.015em;

/* a surface */
background: #22262e; border-radius: 16px;                 /* a window 18, a ticket 22, a small card 14 */
box-shadow: 0 10px 30px #0000003e, 0 0 0 1px #ffffff21;   /* a window: 0 30px 80px #00000064 */
/* inside it: lighter #2b2f38 · darker #191b20 · a line #30343e · a grey bar #343945 · quiet text #9a9ea7 */

/* who: dots only */
#7aa2f7  #d99a64  #6fbf96  #b08fe0  #d9839a  #6bbcc8  #cdb060

/* state: a chip's ground and its words */
working  #243049 / #9db8ff      review  #3a2f1f / #e0b574      done   #1b2922 / #6fbf96
wrong    #2e2023 / #d97878      now     #3f2729 / #ee9a8f      chosen #ecebe6 / #22262e

/* the counter */
background: #22262e; border-radius: 999px; padding: 14px 26px; font-size: 26px;   /* bold number in ink, words in --sub */
```

| | wide, 1920×1080 | upright, 1080×1350 |
| -- | -- | -- |
| the headline | 54 px in the film; 80–84 px in a cut for a phone, one line | 72–78 px, two lines |
| text that is read | 18 px in the film (too small on a phone); shown at 2–2.7× in a cut | shown at 2× |
| the counter | 26 px; 44 px in a cut, bottom left | 34 px, bottom centre |
| the last question | 92 px, weight 600 | the same, under the camera |

Easing: arrivals ease out (a cubic), moves ease in and out, a pop overshoots by about a tenth. The headline's word step and the 0.35 s arrival are `kit.mjs`'s `words` and the scenes' own; copy them, do not retune them.

</m-field>

<m-callout type="warning" headline="Must not do">Mix two looks in one film. A glow, a gradient on a card, a coloured page. A second sentence on screen while the first is still there. Colour for decoration. A real product's interface, or a made-up one that could be mistaken for it. A sound for every keystroke. A new look without the owner naming it.</m-callout>

<m-field data-field="exit" label="Done when">A still of any beat, shrunk to 480 px wide, reads as the same film as the look's contact sheet: the same field, the same ink, one sentence, one subject, and colour only where it means something.</m-field>
