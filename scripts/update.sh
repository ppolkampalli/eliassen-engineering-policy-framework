#!/usr/bin/env bash
# update.sh <target-project-dir>
#
# Syncs configs, skills, and the policy registry from this repo into a target
# project. Before applying, prints a human-readable diff of any changed policies
# INCLUDING the policy change ID and motivation for each change (read from
# policy-changes/records/) — auditability propagates with the update
# (POLICY-CHANGE-PROCESS.md stage 5: PROPAGATION).
set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  echo "Usage: update.sh <target-project-dir>" >&2
  exit 1
fi
if [ ! -d "$TARGET" ]; then
  echo "ERROR: target directory not found: $TARGET" >&2
  exit 1
fi

TREG="$TARGET/docs/policy-framework/registry.json"
SREG="$SRC/policies/registry.json"

if [ ! -f "$TREG" ]; then
  echo "No installed registry found at $TREG — run install.sh first." >&2
  exit 1
fi

# ── Policy diff with policy change motivations ─────────────────────────────────────
echo "Engineering Policy Framework update"
echo "  source: $SRC"
echo "  target: $TARGET"
echo ""
echo "── Policy changes since installed version ─────────────────────────────"

if command -v node >/dev/null 2>&1; then
  # Git Bash on Windows: convert POSIX paths to ones Windows node can read
  if command -v cygpath >/dev/null 2>&1; then
    SREG_N="$(cygpath -m "$SREG")"; TREG_N="$(cygpath -m "$TREG")"; SRC_N="$(cygpath -m "$SRC")"
  else
    SREG_N="$SREG"; TREG_N="$TREG"; SRC_N="$SRC"
  fi
  node - "$SREG_N" "$TREG_N" "$SRC_N" <<'EOF'
const fs = require('fs');
const [sregPath, tregPath, src] = process.argv.slice(2);
const sreg = JSON.parse(fs.readFileSync(sregPath, 'utf8'));
const treg = JSON.parse(fs.readFileSync(tregPath, 'utf8'));
const oldLaws = new Map(treg.policies.map((l) => [l.id, l]));
const newLaws = new Map(sreg.policies.map((l) => [l.id, l]));

const motivation = (amd) => {
  const dir = `${src}/policy-changes/records`;
  const file = fs.readdirSync(dir).find((f) => f.startsWith(amd));
  if (!file) return '(policy change record not found)';
  const body = fs.readFileSync(`${dir}/${file}`, 'utf8');
  const m = body.match(/## Motivation\r?\n([\s\S]*?)(?=\r?\n## )/);
  return m ? m[1].trim().replace(/\s+/g, ' ').slice(0, 400) : '(no motivation section)';
};

let changes = 0;
if (treg.policy_framework_version !== sreg.policy_framework_version) {
  console.log(`Policy Framework: v${treg.policy_framework_version} → v${sreg.policy_framework_version}\n`);
}
for (const [id, nl] of newLaws) {
  const ol = oldLaws.get(id);
  if (!ol) {
    changes++;
    console.log(`NEW     ${id} (v${nl.version}) — ${nl.title}`);
    for (const amd of nl.policy_changes) console.log(`        via ${amd}: ${motivation(amd)}`);
  } else if (ol.version !== nl.version || ol.status !== nl.status) {
    changes++;
    console.log(`CHANGED ${id}: v${ol.version} ${ol.status} → v${nl.version} ${nl.status} — ${nl.title}`);
    const newAmds = nl.policy_changes.filter((a) => !ol.policy_changes.includes(a));
    for (const amd of (newAmds.length ? newAmds : nl.policy_changes.slice(-1)))
      console.log(`        via ${amd}: ${motivation(amd)}`);
  }
}
for (const [id, ol] of oldLaws)
  if (!newLaws.has(id)) { changes++; console.log(`REMOVED ${id} — ${ol.title} (repeal? repealed policies are normally retained)`); }

console.log(changes === 0 ? 'No policy changes — configs/skills will still be synced.' : `\n${changes} policy change(s).`);
EOF
else
  echo "(node not found — showing raw registry diff instead)"
  diff -u "$TREG" "$SREG" || true
fi

echo ""
read -r -p "Apply update? [y/N] " answer
case "$answer" in
  [Yy]*) ;;
  *) echo "Aborted — nothing changed."; exit 0 ;;
esac

# ── Apply: configs, skills, registry ────────────────────────────────────────
echo ""
sync_file() { cp "$1" "$2" && echo "  updated: ${2#"$TARGET"/}"; }

mkdir -p "$TARGET/docs/policy-framework" "$TARGET/.claude" "$TARGET/.husky" \
         "$TARGET/.github/workflows" "$TARGET/docs"

sync_file "$SRC/CLAUDE.md"                       "$TARGET/CLAUDE.md"
sync_file "$SRC/AGENTS.md"                       "$TARGET/AGENTS.md"
sync_file "$SRC/configs/.eslintrc.json"          "$TARGET/.eslintrc.json"
sync_file "$SRC/configs/.prettierrc.json"        "$TARGET/.prettierrc.json"
sync_file "$SRC/configs/tsconfig.base.json"      "$TARGET/tsconfig.base.json"
sync_file "$SRC/configs/jest.config.js"          "$TARGET/jest.config.js"
sync_file "$SRC/configs/lint-staged.config.js"   "$TARGET/lint-staged.config.js"
sync_file "$SRC/hooks/pre-commit"                "$TARGET/.husky/pre-commit"
chmod +x "$TARGET/.husky/pre-commit" 2>/dev/null || true
sync_file "$SRC/ci/github/quality.yml"           "$TARGET/.github/workflows/quality.yml"
sync_file "$SRC/ci/github/security.yml"          "$TARGET/.github/workflows/security.yml"

# Skills tree (full refresh)
rm -rf "$TARGET/.claude/skills"
mkdir -p "$TARGET/.claude/skills"
cp -R "$SRC/skills/." "$TARGET/.claude/skills/"
echo "  updated: .claude/skills/ (full refresh)"

sync_file "$SRC/docs/standards.md"               "$TARGET/docs/standards.md"
sync_file "$SRC/docs/testing-guide.md"           "$TARGET/docs/testing-guide.md"
sync_file "$SRC/docs/role-guide.md"           "$TARGET/docs/role-guide.md"
sync_file "$SRC/checklists/code-review-checklist.md" "$TARGET/docs/code-review-checklist.md"
sync_file "$SRC/checklists/pre-commit-checklist.md"  "$TARGET/docs/pre-commit-checklist.md"
sync_file "$SRC/policies/REGISTRY.md"                "$TARGET/docs/policy-framework/REGISTRY.md"
sync_file "$SRC/policies/registry.json"              "$TARGET/docs/policy-framework/registry.json"

# Workflow catalog (org defaults; project-local workflows/ overrides are untouched)
rm -rf "$TARGET/docs/policy-framework/workflows"
mkdir -p "$TARGET/docs/policy-framework/workflows"
cp -R "$SRC/workflows/." "$TARGET/docs/policy-framework/workflows/"
echo "  updated: docs/policy-framework/workflows/ (full refresh)"

echo ""
echo "Update complete. Verify with: $SRC/scripts/validate.sh $TARGET"
