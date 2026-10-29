#!/usr/bin/env bash
# tracker-no-hub.sh — the tracker's naming gate (NAMING-3): every ticket's
# title and body read off the tracker, each line that still says *hub*
# named. A Plexus backend is a *service* (owner, 2026-10-29).
#
#   scripts/tracker-no-hub.sh            exit 1 on a remnant outside Coding
#   scripts/tracker-no-hub.sh --all      Coding tickets count too
#   TRACKER_URL=wss://… AGENT=builder    where to read, as whom
#
# The shape is the house gate's (scripts/naming-gate.sh, NAMING-1): any
# "hub", any case, not after "git" / "git-" / "git_" / "git ". Taken out
# before the check: a run of 60+ base64 characters (an embedded image is
# data), a host name in a URL (a domain we do not own), the webhook header
# X-Hub-Signature (the forge's, not ours), and the tickets under NAMING-1,
# which quote the old names on purpose. A Coding ticket is a builder's:
# listed, never failing the gate, unless --all.
set -euo pipefail
url="${TRACKER_URL:-wss://app.menger.sh/ws}"
agent="${AGENT:-builder}"
all=0; [ "${1:-}" = "--all" ] && all=1
dump="$(mktemp)"; trap 'rm -f "$dump"' EXIT
synapse --url "$url" --as "$agent" -j menger tickets list --limit 10000 > "$dump"
python3 -I - "$dump" "$all" <<'PY'
import json, re, sys
dump, include_coding = sys.argv[1], sys.argv[2] == "1"
WORD = re.compile(r'(?i)(?<!git)(?<!git[-_ ])hub')
OUT = re.compile(r'[A-Za-z0-9+/=]{60,}'            # base64 data
                 r'|https?://[^\s/)>"\']+'          # a URL's host
                 r'|X-Hub-Signature(?:-256)?')      # the forge's header
read = bad = coding = 0
for line in open(dump):
    c = json.loads(line).get("content", {})
    if c.get("type") != "ticket":
        continue
    t = c["ticket"]; read += 1
    if "NAMING" in t["address"].split(":")[-1].split("/")[:-1] or t["epic"] == "NAMING":
        continue
    text = t["title"] + "\n" + (t["body"] or "")
    out = [m.span() for m in OUT.finditer(text)]
    hits = [m for m in WORD.finditer(text) if not any(a <= m.start() < b for a, b in out)]
    if not hits:
        continue
    lines = sorted({text.count("\n", 0, m.start()) for m in hits})
    if t["status"] == "Coding" and not include_coding:
        coding += 1; print(f"coding  {t['id']}: {len(hits)} (a builder's)"); continue
    bad += 1
    for n in lines:
        print(f"{t['id']}:{n}: {text.splitlines()[n].strip()[:140]}")
print(f"tracker-no-hub: {read} tickets read; {bad} with a remnant; {coding} Coding listed", file=sys.stderr)
sys.exit(1 if bad else 0)
PY
