#!/usr/bin/env bash
# no-hub.sh — the naming gate: a Plexus backend is a *service*, never a
# *hub* (owner, 2026-10-29: "we don't call them hubs anymore. we call them
# services."). Exits 1 and names each file:line that still says one.
#
#   scripts/no-hub.sh            every tracked file but the two gates
#   scripts/no-hub.sh FILE...    those files
#
# Word-aware: `hub` / `hubs` as a word or a word's part (`hub-codegen`,
# `_hub`, `hubCodegen`), `Hub` as an identifier's part (`DynamicHub`,
# `HubTransport`), `HUB` in a constant (`MOCK_HUB`). Not a match: a hub
# inside a longer lowercase word, and a run of 60+ base64 characters (an
# embedded image is data, not a word). No foreign name is allow-listed:
# the skills name no company (AGENTS.md "No corporations"), so a foreign
# name here is itself out of place and the gate is right to show it.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
if [ "$#" -eq 0 ]; then
  mapfile -t files < <(git ls-files | grep -vxE 'scripts/(no-hub|tracker-no-hub)\.sh')
else
  files=("$@")
fi
exec python3 -I - "${files[@]}" <<'PY'
import re, sys
BLOB = re.compile(r'[A-Za-z0-9+/=]{60,}')
WORD = re.compile(r'(?<![A-Za-z])hub(?=s?(?![a-z]))'
                  r'|(?:(?<![A-Z])|(?<=[a-z]))Hub(?=s?(?![a-z]))'
                  r'|(?<![A-Za-z])HUB(?![A-Za-z])')
n = 0
for f in sys.argv[1:]:
    try:
        text = open(f, encoding='utf-8').read()
    except (UnicodeDecodeError, IsADirectoryError, FileNotFoundError):
        continue
    blobs = [m.span() for m in BLOB.finditer(text)]
    for m in WORD.finditer(text):
        if any(a <= m.start() < b for a, b in blobs):
            continue
        ln = text.count('\n', 0, m.start()) + 1
        print(f"{f}:{ln}: {m.group(0)}: {text.splitlines()[ln-1].strip()[:120]}")
        n += 1
if n:
    print(f"no-hub: {n} remnant(s) — say service", file=sys.stderr)
    sys.exit(1)
print("no-hub: clean", file=sys.stderr)
PY
