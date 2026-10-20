---
name: reaching
description: Use for any read or write against menger from a shell or a script — filing, amending, moving, blocking, asking, linking, searching, screenshotting. Produces the right synapse call: the methods menger's work uses, with their flags, the stream shape a script parses, and the few spellings that bite (bodies from files, lists, global flags before the backend). It holds the invocation contract itself — where flags go, how to navigate to a method, how to discover its parameters — and what menger adds.
---

<m-summary>

<m-answer data-field="answer">**Everything menger does is a Plexus RPC method on the `menger` hub; `synapse -P 4455 menger <activation> <method> --flag value` is how an agent reads and writes it, and the body goes as `--body @file.md`.**</m-answer>

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
| can't remember the name? | `synapse -P 4455 _find menger <words>` — methods and flags by name or description, typos and abbreviations too (`setpar` → `set_parent`); `… _find menger tickets <words>` narrows, `-j` for a script (synapse ≥ 3.14.7) |
| `-H` / `-P` bypass the registry | they must reach a port that speaks the Plexus handshake; `_info did not complete` means the wrong port |

</m-cases>

<m-cases label="The spellings that bite">

| rule | spelling |
| -- | -- |
| global options before the backend name | `synapse -P 4455 -j menger tickets list …` — after the path they read as a subcommand |
| params are flags, not JSON | `--blocked-by AMP-3 --severity High`; a list is the flag repeated or comma-separated |
| a ticket's inputs, commits, nav reads, order of work and components are children of `tickets` | `menger tickets inputs list` · `inputs answer` · `inputs close`, `tickets commits link`, `tickets nav tree` · `nav counts`, `tickets work ready` · `work waves`, `tickets components list` — on a menger whose `synapse -P 4455 menger tickets` lists `inputs`, `commits`, `nav`, `work` and `components` under ACTIVATIONS; a server before that has the old flat names (`inputs`, `answer`, `close_input`, `link_commits`, `tree`, `counts`, `ready_set`, `components`, …) |
| a body is a file | a quoted heredoc, then `--body @body.md` (synapse ≥ 3.14.8, SYNAPSE-10): the file's contents exactly — frontmatter's `---`, `$`, backticks — and no size cap from the shell (`--body "$(cat …)"` fails past 128 KB); `--body -` reads stdin; a value that really begins with `@` is written `@@…` |
| a chat message names its tickets in the notation | `chats post --chat N --body @msg.md`, the tickets in bold, the id alone: `**AMP-4**`, a run `**CONE-2..5**`, a set `**PLOT-11/12**`, an ask `**AMP-1** · landing` — drawn as live chips and cards ([chatting](../chatting/SKILL.md)) |
| a whole params object is a file too | `-p @params.json`, or `-p -` from stdin |
| a multi answer and a theme's maps go through `-p '{…}'` | synapse sends a list inside a nested parameter as one string |
| `-j` is the raw stream | items are `{ "type": …, "content": { "ticket" \| "summary" \| "node" \| "input" \| "note" \| "component" \| … } }`, then `done`; a unary REST read caps at 10,000 items, the socket does not |
| an outage is ridden out (synapse ≥ 3.14.9, SYNAPSE-20) | a restart or a promote is retried for 10 minutes (`--reconnect-for 10m`, `0` = never; `SYNAPSE_RECONNECT_FOR`), progress on stderr only. A read is sent again. A write whose request went out is not: exit **75**, it may have happened, so check before sending it again. A stream resumes: `await_reply` with `since` = when it began, so an answer given during the outage still arrives. Under `-j` the stream carries `{"type":"reconnected","outage_secs":…,"attempts":…,"since":…}`, then the resumed call's items (`waiting` again, then `replied`); a script waiting for `replied` ignores both. Past the window: exit **69**. Under login the session is made again from the key after a restart, and parallel calls make it once (≥ 3.14.10, SYNAPSE-15) |
| the tracker is prod | `-P 4455` reads and writes the live tracker; a throwaway server is `PLEXUS_NO_REGISTRY=1 cargo run -- --port 4460 … --db-path /tmp/x.db` in `../menger`, never bare `cargo run` |

</m-cases>

<m-cases label="Under login — prod requires it (ACCESS-47, 2026-10-17)">

| rule | spelling |
| -- | -- |
| an agent is a key, signed in once per machine | `synapse -P 4455 _login menger --key builder --as builder` — the key is `~/.plexus/keys/builder.key` (0600, `synapse _key new NAME --store file`); synapse keeps the session in `~/.plexus/sessions/` and every line on this page then runs as written |
| exit **77** means *sign in*, not a dead server | run the `_login` above, then the call again; a refused credential shows as `Protocol handshake failed` (a 401) |
| a restart or the 12 h expiry is handled | synapse re-mints the session from its key by itself, once for parallel calls (≥ 3.14.10, SYNAPSE-15) |
| another key with `--as` moves the default agent | `_login` builder again **last** (SYNAPSE-16); a subagent sets `SYNAPSE_AS=sub-<TICKET>` before its own `_login … --as sub-<TICKET> --scope editor@<TICKET>` |
| what a key may do is its grants | `builder` editor on `*`; `pipeline` viewer on `*` + deployer on MENGER; `operator` is `--admin`, by hand only — a refusal is typed (`error_kind: forbidden`, `grant`, `held_on`) |
| never a secret in argv or the environment | no `-t "$TOKEN"`, no `PLEXUS_KEY=…`: the key's file, or the stored session; a script that cannot run synapse signs in through `../menger/deploy/menger-call.mjs` with `MENGER_DEPLOY_KEY_FILE` |
| REST is gone on prod | `--no-rest`: :4457 answers nothing; use synapse or the socket |

</m-cases>

<m-code lang="bash" why="writing — the first ticket of a shortcode is a scope or a doc; a root hangs under --parent">

```bash
synapse -P 4455 menger tickets create --epic AMP --title "Volt" --kind scope --parent HOME-1 --body @AMP-1.md
synapse -P 4455 menger tickets create --epic AMP --title "volt.queue" --kind build --parent AMP-2 --blocked-by AMP-3 --body @AMP-4.md
synapse -P 4455 menger tickets create --epic AMP --title "A reboot mid-session" --kind gap --parent AMP-2 --severity High --body @AMP-6.md
synapse -P 4455 menger tickets create --epic AMP --title "The wire, three ways" --kind doc --body @AMP-7.md

# change — a body is replaced whole; update does any of it in one write
synapse -P 4455 menger tickets amend --id AMP-1 --body @AMP-1.md
synapse -P 4455 menger tickets update --id AMP-4 --block AMP-3 --severity none
synapse -P 4455 menger tickets update --id AMP-6 --kind gap --status Ready --severity High
synapse -P 4455 menger tickets set_kind --id AMP-5 --kind execution
synapse -P 4455 menger tickets set_parent --id AMP-9 --parent AMP-2

# move — the owner promotes; the builder claims and finishes
synapse -P 4455 menger tickets set_status --id AMP-4 --status Coding
synapse -P 4455 menger tickets commits link --id AMP-4 --commits 77df9a0 --commits volt@1a2b3c4
synapse -P 4455 menger tickets set_status --id AMP-4 --status "In Review"
synapse -P 4455 menger tickets set_status --id AMP-9 --status Canceled --message "folded into AMP-4"
synapse -P 4455 menger tickets update_many --ids AMP-4,AMP-5 --status Ready --message "promoted"
synapse -P 4455 menger tickets label --id AMP-6 --add needs-you

# ask and close
synapse -P 4455 menger tickets inputs close --ticket AMP-1 --input policy

# notes
synapse -P 4455 menger notes add --body "the hill should count the days down"
synapse -P 4455 menger notes upgrade --id 7 --epic CONE --parent CONE-1 --kind doc --title "The owner on the hill"

# themes
synapse -P 4455 menger themes set --scope AMP --theme volt --reach ticket

# who may — a grant's scope is *, an org, a shortcode, a ticket alone or `under` a ticket; a team holds grants for its members (admin only)
synapse -P 4455 menger members grant --principal key:4b… --scope AMP --role editor
synapse -P 4455 menger members grant --principal key:4b… --scope 'under AMP-2' --role viewer
synapse -P 4455 menger members teams create --name volt-crew
synapse -P 4455 menger members teams add --team volt-crew --principal key:4b…
synapse -P 4455 menger members grant --team volt-crew --scope AMP --role editor
```

</m-code>

<m-code lang="bash" why="reading">

```bash
synapse -P 4455 menger tickets health
synapse -P 4455 menger tickets get --id AMP-4                               # the body as written
synapse -P 4455 menger tickets list --epic AMP --summary true
synapse -P 4455 menger tickets list --filter 'under HOME-1 and kind scope' --summary true
synapse -P 4455 menger tickets nav tree --epic AMP --filter 'not category done'   # tree needs a filter
synapse -P 4455 menger tickets nav counts --filter 'ready and kind build'
synapse -P 4455 menger tickets work ready --filter 'under AMP-1' --summary true
synapse -P 4455 menger tickets search --query 'boot_id ghost' --filter 'not category done'
synapse -P 4455 menger tickets find --query queue
synapse -P 4455 menger tickets history --id AMP-4
synapse -P 4455 menger tickets inputs list --state open
synapse -P 4455 menger tickets inputs list --ticket AMP-1
synapse -P 4455 menger tickets components list
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
