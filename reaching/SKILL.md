---
name: reaching
description: Use for any read or write against menger from a shell or a script — filing, amending, moving, blocking, asking, linking, searching, screenshotting. Produces the right synapse call: the methods menger's work uses, with their flags, the stream shape a script parses, and the few spellings that bite (bodies from files, lists, global flags before the backend). It holds the invocation contract itself — where flags go, how to navigate to a method, how to discover its parameters — and what menger adds.
---

<m-summary>

<m-answer data-field="answer">**Everything menger does is a Plexus RPC method on the `menger` hub; `synapse -P 4455 menger <activation> <method> --flag value` is how an agent reads and writes it, and the body goes as `--body "$(cat file.md)"`.**</m-answer>

<m-stat value="4455">the tracker, prod</m-stat>
<m-stat value="-j">the raw stream, for a script</m-stat>

</m-summary>

<m-field data-field="context">This skill is the whole contract for driving menger through synapse: the general grammar first, then what is particular to menger.</m-field>

<m-cases label="The invocation contract — any Plexus backend">

| rule | spelling |
| -- | -- |
| the shape | `synapse [OPTIONS] <backend> <path...> [--param value]` |
| global options before the backend | `synapse -P 4455 -j menger …`; a flag after the backend is swallowed, and the ASCII banner plus usage dump is the tell — not a broken command |
| the registered name, not the product name | bare `synapse` prints the registry: every backend, its host:port, `[OK]` or `[UNREACHABLE]`; menger answers to `menger` |
| navigate the hub by path | `menger tickets list`, not `tickets list`; `'X' at root` means a level was skipped, and `synapse -P 4455 menger` prints the children at that level |
| let the backend tell you the shape | `synapse -P 4455 -i menger` is every method (IR, `irMethods` keyed by dotted path); `<method> --help` or a bare call prints its parameters; `Unknown parameter` means a wrong name |
| `-H` / `-P` bypass the registry | they must reach a port that speaks the Plexus handshake; `_info did not complete` means the wrong port |

</m-cases>

<m-cases label="The spellings that bite">

| rule | spelling |
| -- | -- |
| global options before the backend name | `synapse -P 4455 -j menger tickets list …` — after the path they read as a subcommand |
| params are flags, not JSON | `--blocked-by AMP-3 --severity High`; a list is the flag repeated or comma-separated |
| a body is a file | a quoted heredoc, then `--body "$(cat body.md)"`; whatever it begins with (frontmatter's `---`) and holds (`$`, backticks) arrives literally |
| a multi answer and a theme's maps go through `-p '{…}'` | synapse sends a list inside a nested parameter as one string |
| `-j` is the raw stream | items are `{ "type": …, "content": { "ticket" \| "summary" \| "node" \| "input" \| "note" \| "component" \| … } }`, then `done`; a unary REST read caps at 10,000 items, the socket does not |
| the tracker is prod | `-P 4455` reads and writes the live tracker; a throwaway server is `PLEXUS_NO_REGISTRY=1 cargo run -- --port 4460 … --db-path /tmp/x.db` in `../menger`, never bare `cargo run` |

</m-cases>

<m-code lang="bash" why="writing — the first ticket of a shortcode is a scope or a doc; a root hangs under --parent">

```bash
synapse -P 4455 menger tickets create --epic AMP --title "Volt" --kind scope --parent HOME-1 --body "$(cat AMP-1.md)"
synapse -P 4455 menger tickets create --epic AMP --title "volt.queue" --kind build --parent AMP-2 --blocked-by AMP-3 --body "$(cat AMP-4.md)"
synapse -P 4455 menger tickets create --epic AMP --title "A reboot mid-session" --kind gap --parent AMP-2 --severity High --body "$(cat AMP-6.md)"
synapse -P 4455 menger tickets create --epic AMP --title "The wire, three ways" --kind doc --body "$(cat AMP-7.md)"

# change — a body is replaced whole; update does any of it in one write
synapse -P 4455 menger tickets amend --id AMP-1 --body "$(cat AMP-1.md)"
synapse -P 4455 menger tickets update --id AMP-4 --block AMP-3 --severity none
synapse -P 4455 menger tickets update --id AMP-6 --kind gap --status Ready --severity High
synapse -P 4455 menger tickets set_kind --id AMP-5 --kind execution
synapse -P 4455 menger tickets set_parent --id AMP-9 --parent AMP-2

# move — the owner promotes; the builder claims and finishes
synapse -P 4455 menger tickets set_status --id AMP-4 --status Coding
synapse -P 4455 menger tickets link_commits --id AMP-4 --commits 77df9a0 --commits volt@1a2b3c4
synapse -P 4455 menger tickets set_status --id AMP-4 --status "In Review"
synapse -P 4455 menger tickets set_status --id AMP-9 --status Canceled --message "folded into AMP-4"
synapse -P 4455 menger tickets update_many --ids AMP-4,AMP-5 --status Ready --message "promoted"
synapse -P 4455 menger tickets label --id AMP-6 --add needs-you

# ask and close
synapse -P 4455 menger tickets close_input --ticket AMP-1 --input policy

# notes
synapse -P 4455 menger notes add --body "the hill should count the days down"
synapse -P 4455 menger notes upgrade --id 7 --epic CONE --parent CONE-1 --kind doc --title "The owner on the hill"

# themes
synapse -P 4455 menger themes set --scope AMP --theme volt --reach ticket
```

</m-code>

<m-code lang="bash" why="reading">

```bash
synapse -P 4455 menger tickets health
synapse -P 4455 menger tickets get --id AMP-4                               # the body as written
synapse -P 4455 menger tickets list --epic AMP --summary true
synapse -P 4455 menger tickets list --filter 'under HOME-1 and kind scope' --summary true
synapse -P 4455 menger tickets tree --epic AMP --filter 'not category done'   # tree needs a filter
synapse -P 4455 menger tickets counts --filter 'ready and kind build'
synapse -P 4455 menger tickets ready_set --filter 'under AMP-1' --summary true
synapse -P 4455 menger tickets search --query 'boot_id ghost' --filter 'not category done'
synapse -P 4455 menger tickets find --query queue
synapse -P 4455 menger tickets history --id AMP-4
synapse -P 4455 menger tickets inputs --state open
synapse -P 4455 menger tickets inputs --ticket AMP-1
synapse -P 4455 menger tickets components
synapse -P 4455 menger themes theme_for --id AMP-4
synapse -P 4455 menger comments list --under AMP --state open
synapse -P 4455 menger tickets watch --filter 'under AMP-1'                  # open-ended
```

</m-code>

A script that parses: `synapse -P 4455 -j menger tickets list --epic AMP --summary true | jq -r 'select(.content.summary) | .content.summary | "\(.id)\t\(.status)\t\(.title)"'`.

<m-field data-field="detail" label="Filters">One quoted flag in the filter language: `ready and kind build and in AMP`, `status in (Pending, Ready)`, `under AMP-1`, `not category done`, `asking or label needs-you`, `entered "In Review" within 12h`, `changed today by owner`. `--tz Europe/Berlin` for the windows.</m-field>

<m-code lang="bash" why="looking, and checking a body before filing">

```bash
../menger/scripts/shot.mjs '#/ticket/AMP-4' --env prod --theme both --width 1100 --out shots
../menger/scripts/shot.mjs '#/board' --env test --screen --out /tmp/look
cd ../menger && MENGER_HOUSE_BODIES=AMP-4.md cargo test -p menger-tickets-api house_bodies   # a body that defines components
```

</m-code>

A write's refusal names the reason in band, so a `create` that fails writes nothing and says why.

<m-field data-field="execution">Every method, its parameters and its events: `../menger/README.md` → "Surface". menger's operating rules — ports, environments, the pipeline: `../menger/AGENTS.md`.</m-field>
