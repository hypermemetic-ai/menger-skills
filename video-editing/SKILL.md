---
name: video-editing
description: Use when a ticket or a document should carry a film — a rendered video with a score that tells what happened or how something works. Says when a film is worth its cost against a diagram or an in-page component, how one is made here (the canvas pipeline, and fframes), how it is checked by looking, how it is kept true, and how it is put in a body.
---

<m-summary>

<m-answer data-field="answer">**A film is for a milestone: a minute or two that a person watches once and remembers. It is made by copying a pipeline that works, checked by reading its own frames, true in every command and number, and it lands in a body as one media line.**</m-answer>

<m-stat value="≈250k">tokens for a 98 s film with a score (2026-11-10)</m-stat>
<m-stat value="≈2.5k">tokens for an in-page component film</m-stat>
<m-stat value="100–300">tokens for a diagram or a table</m-stat>

</m-summary>

<m-cases label="Which moving picture, if any">

| what is to be shown | the form | cost to write | why |
| -- | -- | -- | -- |
| a state, a list, an order | a table or a mermaid diagram (`showing`) | 100–300 tokens | read in seconds, amended in place |
| counts that change round by round; one mechanism with a knob | an in-page `component`, fed by a small data table | 1.5–3k once, a few numbers per update | cheap to update; draws from the theme |
| a milestone: what happened, why it mattered, what is next | a rendered film, 60–100 s, with a score | 200–300k and 15–25 minutes | watched once, remembered; the only form with sound and pacing |
| a small change to a film that exists | edit its scene, render again | a few thousand tokens and the render | the scene is code |

A film is never the only place a fact lives: the document under it says the same in words and tables.

</m-cases>

<m-field data-field="context" label="The house look">

The reference is *Plexus RPC, the vision* (PLEXUS-40) and *Plexus — the work* (the map, doc `kttxb2j5`). Their contact sheets are `~/.cache/plexus-film/check.jpg` and `~/.cache/plexus-film/map/check.jpg` — **read one before writing a frame**.

- A deep navy field. Services are glowing, neuron-like nodes with fine branching dendrites; a call or a stream is light travelling along a curved path.
- A small dark terminal types **real** commands and shows their real answers.
- One white sans caption low in the frame, one short sentence a beat; sometimes a thin mono sub-line under it for the fact behind it.
- A title card; chapters marked in small tracked capitals with a roman numeral.
- Colour means something and is used sparingly: cyan and white for healthy, violet for your own service, red for wrong or refused, green for closed or fits, amber for someone else's.
- Slow and sure: things ease in and out, nothing flashes, a caption stays long enough to read — at least 2.5 s plus 0.06 s a character.

Other looks of the same story exist (`~/.cache/plexus-film/styles/`: keynote, blueprint, crt, math, biolum). Use the main look unless the owner names another.

</m-field>

<m-field data-field="shape" label="How one is made">

A film is a pure function from time to a frame, plus a score derived from the same events. Two ways to render it; both end in a 1920×1080, 60 fps H.264 file with AAC sound.

| | the canvas pipeline | fframes |
| -- | -- | -- |
| where | `~/.cache/plexus-film/src/` — copy it to a new directory, never edit it in place | `~/.cache/plexus-film/craft/` is the working start: `build.sh`, the house helpers in `base/src/house.rs`, the tools in `tools/` |
| a frame is | `render(ctx, t)` on an HTML canvas (`scene.js`) | an SVG tree returned by a Rust function (`svgr!`, `timeline!`) |
| rendered by | headless Chromium screenshots, in parallel segments, ffmpeg (`render.mjs`) | Skia on the GPU, or its CPU renderer; ffmpeg's libraries linked in |
| speed measured here | about 36 frames/s (a 108 s film in 181 s) | about 236 frames/s on the GPU for a simple scene |
| the score | `synth.mjs` writes `score.wav` from the scene's `soundEvents` and `chords` | lays a WAV under the picture and mixes (gain, pan, fades, ducking, loudness); no synthesiser — bring the WAV |
| edit loop | reload | about 4 s from an edit to a frame (a debug rebuild) |
| what it lacks | speed | the 3D camera of the reference; an additive blend (use `screen`) |

**fframes is the way for a new film** (the owner, 2026-11-10: "I would like to not build all the rendering components"). It does not work as published on this machine; four workarounds, none needing root, are in one build script (`~/.cache/plexus-film/craft/build.sh`: `build`, `render CLIP VAR`, `sheet`, `pair`): the clang resource directory for bindgen; no `fframes_native_player` (it needs `alsa-devel`); every fframes crate pinned with `=` to one version (1.4.0 is broken by its own 1.4.1 helpers) and `Cargo.lock` kept; no built-in H.264 (the prebuilt ffmpeg wants a libx264 this system does not ship) — render lossless, then encode with the system ffmpeg (`-crf 19 -preset slow -tune grain`). **Renumber the frames when encoding** (`-vf "setpts=N/(60*TB)" -r 60 -fps_mode cfr`): the lossless file's time base is a millisecond, and without it ffmpeg silently drops frames — a 7.00 s clip came out 6.75 s, everything after a drop early and the sound out of step. Count the frames of the final file.

What fframes lacks is faked: an additive glow is `mix-blend-mode:screen` with radial-gradient sprites; depth is a group's `feGaussianBlur` (no visible render cost on the GPU) with a parallax factor per layer; the 3D camera is a group's translate and scale; a synthesiser is `tools/synth.py` writing the WAV. There is no live preview: `frame`, `strip`, `onion` and the sheets are the look.

Fonts are the house's Inter and JetBrains Mono when installed; do not download fonts or anything else while rendering.

</m-field>

<m-field data-field="craft" label="Craft">

Each rule was tested as a pair of clips, the same beat with and without it (`~/.cache/plexus-film/craft/<rule>/sheet.jpg`, A above B; 2026-11-10). They are in the order of how much they changed what a frame says at a glance. `craft/headline/sheet.jpg` is the moment "a peer answers as you" both ways: read it before writing a beat.

- **The picture carries the claim.** Whatever the caption claims is visible in a frame 480 px wide: in the subject's colour, its shape, or a line the eye can follow. A small label or a ring alone is not there at that size. Colour is identity: the caller's colour travels with the caller's token, and what it reaches takes that colour.
- **One story, one subject.** While a beat tells one story, everything else drops to 30% or less within 0.7 s, and what the last chapter left on screen (findings, counters) leaves within 0.4 s.
- **One new motion at a time.** At most one motion starts every 500 ms; a caption settles 400 ms before anything else starts. Spread a beat's events over the beat — never all at once and then a hold.
- **The camera follows something.** A pan follows a pulse or a line the eye is already on; no frame of a move is empty. Otherwise cut.
- **Chapters hand over.** One element stays on screen across a chapter change and moves, eased, in about 0.9 s to its new place. Never a fade through black.
- **Type.** Nothing under 24 px at 1080p: names 30, sub-lines 22–24, the chapter mark 24, the caption 52–56, all inside the middle 90% of the frame. Cut a sub-line before shrinking it.
- **A caption arrives whole** — a fade with a 14 px rise, 400 ms at most — never word by word, and is fully legible for at least 2.5 s plus 0.06 s a character.
- **Easing.** Entering: ease out, 300–500 ms (cubic-bezier 0, 0, 0.3, 1). Leaving: ease in, 200–300 ms (0.2, 0, 1, 0.9). Moving in place: ease in and out. Never linear, never a second for everything. Most of the gain is the shorter time.
- **Stagger in causal order**, about a sixth of the entrance apart — 300 ms or more for a neuron that takes 2 s to grow. 120 ms does not read.
- **Rest.** 0.8–1.2 s with nothing new between beats.
- **End on the motif at full strength**, the takeaway held to the last frame.
- **Sound lands with its picture.** An event's sound starts on the frame its picture lands, within a frame; never more than 45 ms early. A sound is for the arrival, not the launch. Both come from one list of events. Master by one linear gain.
- **The check:** a contact sheet at 480 px a frame beside the cut before. A frame you cannot say what happened in fails.

Tried and of little use in stills: a blur for depth (handsome, small), a 120 ms stagger. Not yet tried: springs, ducking a score under an event, a person listening for the sound's timing.

</m-field>

<m-walk label="The steps">

1. **Write the story first, as a table**: chapter, the beats in it, each beat's caption and sub-line, and what is on screen. Seven chapters at most; one idea a beat. Take every fact from the tracker and name the ticket it comes from.
2. **Copy a pipeline that works** into a new directory and change the scene. Reuse its helpers, palette, type, easing, node and terminal drawing. Do not write a renderer.
3. **Render stills as you go and read them.** A chapter is done when a still reads at a glance and matches the reference. This is most of the cost and all of the quality.
4. **Derive the score from the scene**: a pad whose harmony follows the chapters (settled, uneasy, tense, resolving, warm, home again) and one soft sound per kind of event. No voice unless the owner supplies one. Normalise near −16 to −19 LUFS with the true peak under −1 dBFS; say what it is.
5. **Make the contact sheet** (4×4 or 4×5 frames of the final file) and read it beside the reference's.
6. **`ffprobe` the file**: 1920×1080, 60 fps, a sound stream, the length.
7. **Upload and embed** (below). Then look at the body in the app.

</m-walk>

<m-field data-field="must-not-change" label="Kept true">

- Every command on screen is one that was run, and its answer is the answer it gave. Text that is a quotation and not a command is shown as one, and says where it is from.
- Every number is a ticket's. Nothing is invented to fill a frame; an illustrative line (a made-up `GET /user` on a page glyph) is plainly decoration, never a claim.
- If the picture simplifies, the simplification is not a different fact: check each beat against the ticket it names (in *the work*, the same curl answers 403 with a loopback `Host` and 421 with a foreign one — the film shows the request that was really sent).
- Nothing is rendered from the network but the two house fonts, and nothing about the machine leaves it.

</m-field>

<m-field data-field="provides" label="Putting it in a body">

A rendered film is media. `media begin` takes `--ticket` or `--doc`; the upload is chunked (`~/.cache/plexus-film/bin/upload.sh FILE TICKET`; `~/.cache/plexus-film/map/bin/upload-doc.sh` for a document). The body then holds one line, alone in its paragraph, which the page draws as a player:

```markdown
[plexus-the-work.mp4](media:20b3592f5c4954ede2c7231eadc082dd6e363f7a90966c8926862ae17db94522)
```

An in-page film is a `component` fence and its tag (`showing`). **A body written through synapse does not save its component definitions** — the page's own editor does that on a keystroke. After `tickets amend` or `docs save`, author each definition yourself, in your own namespace so the app's live bundle does not move:

```sh
# p.json: {"sources":[{"name":"x-film","source":"<the fence's lines>","profile":"element/1"}],"own":true}
synapse --url wss://app.menger.sh/ws --as builder -o out.txt -p @p.json menger ui author
```

`own: true` matters: without it an editor on `*` writes into the live bundle of the running app. Diagrams are drawn by Pele, not mermaid.js: check one headless with `pele`'s `render` from plexus-ui's `node_modules` before saving.

</m-field>

<m-callout type="warning" headline="Must not do">A film in place of the words under it. A film for something that changes weekly. A renderer of our own. A command typed on screen that was never run. A render that fetches anything but the fonts. An in-page component left unauthored, or authored into the live bundle.</m-callout>

<m-field data-field="exit" label="Done when">The file plays in the body with sound; its contact sheet reads beside the reference's; `ffprobe` says 1080p, 60 fps, a sound stream; every command and number on screen has a ticket behind it; and the report says the length, the size, the loudness, what it cost, and what its maker would redo.</m-field>
