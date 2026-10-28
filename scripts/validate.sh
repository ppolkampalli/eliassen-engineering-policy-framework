#!/usr/bin/env bash
# validate.sh <target-project-dir>
#
# Verifies a policy framework installation: presence of all installed files, strict
# tsconfig, jest coverage thresholds, executable hook, and that
# docs/policy-framework/registry.json parses and matches the source repo's
# policy_framework_version. PASS/FAIL report; non-zero exit on failure.
set -uo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  echo "Usage: validate.sh <target-project-dir>" >&2
  exit 1
fi
if [ ! -d "$TARGET" ]; then
  echo "ERROR: target directory not found: $TARGET" >&2
  exit 1
fi

fails=0
checks=0

ok()   { checks=$((checks + 1)); echo "  PASS  $1"; }
bad()  { checks=$((checks + 1)); fails=$((fails + 1)); echo "  FAIL  $1"; }

check_file() { # check_file <relative path>
  if [ -f "$TARGET/$1" ]; then ok "$1"; else bad "$1 (missing)"; fi
}

echo "Validating policy framework installation: $TARGET"
echo ""
echo "Installed files"
check_file "CLAUDE.md"
check_file "AGENTS.md"
check_file ".eslintrc.json"
check_file ".prettierrc.json"
check_file "tsconfig.base.json"
check_file "jest.config.js"
check_file "lint-staged.config.js"
check_file ".husky/pre-commit"
check_file ".github/workflows/quality.yml"
check_file ".github/workflows/security.yml"
check_file ".github/pull_request_template.md"
check_file ".claude/skills/policy-enforcer/SKILL.md"
check_file ".claude/skills/role-security/SKILL.md"
check_file "docs/code-review-checklist.md"
check_file "docs/standards.md"
check_file "docs/policy-framework/REGISTRY.md"
check_file "docs/policy-framework/registry.json"
check_file "docs/policy-framework/workflows/registry.json"
check_file ".claude/skills/workflow-orchestrator/SKILL.md"

echo ""
echo "Configuration integrity"

# Strict tsconfig (POL-2.3/2.4)
if [ -f "$TARGET/tsconfig.base.json" ] && grep -q '"strict": true' "$TARGET/tsconfig.base.json" \
   && grep -q '"noImplicitAny": true' "$TARGET/tsconfig.base.json" \
   && grep -q '"noUncheckedIndexedAccess": true' "$TARGET/tsconfig.base.json"; then
  ok "tsconfig strict flags (POL-2.3/2.4)"
else
  bad "tsconfig strict flags weakened or missing (POL-2.3/2.4)"
fi

# Jest thresholds (POL-3.2)
if [ -f "$TARGET/jest.config.js" ] && grep -q 'coverageThreshold' "$TARGET/jest.config.js" \
   && grep -q 'lines: 80' "$TARGET/jest.config.js"; then
  ok "jest coverage thresholds present (POL-3.2)"
else
  bad "jest coverage thresholds missing or altered (POL-3.2)"
fi

# Hook executable (POL-6.2)
if [ -x "$TARGET/.husky/pre-commit" ]; then
  ok "pre-commit hook executable (POL-6.2)"
else
  bad "pre-commit hook missing or not executable (POL-6.2)"
fi

# no-explicit-any present (POL-2.3)
if [ -f "$TARGET/.eslintrc.json" ] && grep -q 'no-explicit-any' "$TARGET/.eslintrc.json"; then
  ok "eslint no-explicit-any rule present (POL-2.3)"
else
  bad "eslint no-explicit-any rule missing (POL-2.3)"
fi

echo ""
echo "Registry sync"

REG="$TARGET/docs/policy-framework/registry.json"
SRC_REG="$SRC/policies/registry.json"

json_get_version() { # json_get_version <file> — jq → node → sed, first non-empty wins
  local v=""
  if command -v jq >/dev/null 2>&1; then
    v="$(jq -r '.policy_framework_version' "$1" 2>/dev/null || true)"
  fi
  if [ -z "$v" ] && command -v node >/dev/null 2>&1; then
    # stdin avoids path-translation issues (e.g. Git Bash /tmp vs Windows node)
    v="$(node -e "let d='';process.stdin.on('data',(c)=>d+=c).on('end',()=>console.log(JSON.parse(d).policy_framework_version))" <"$1" 2>/dev/null || true)"
  fi
  if [ -z "$v" ]; then
    v="$(sed -n 's/.*"policy_framework_version": *"\([^"]*\)".*/\1/p' "$1" | head -1)"
  fi
  echo "$v"
}

if [ -f "$REG" ]; then
  TVER="$(json_get_version "$REG")"
  if [ -n "$TVER" ]; then
    ok "registry.json parses (policy_framework_version: $TVER)"
    SVER="$(json_get_version "$SRC_REG")"
    if [ "$TVER" = "$SVER" ]; then
      ok "registry version matches source repo ($SVER)"
    else
      bad "registry version drift: installed $TVER, source repo $SVER — run scripts/update.sh"
    fi
  else
    bad "registry.json does not parse"
  fi
else
  bad "docs/policy-framework/registry.json missing"
fi

echo ""
echo "Cursor IDE support (optional — only checked if .cursor/ was installed)"
if [ -d "$TARGET/.cursor" ]; then
  check_file ".cursor/rules/role-security.mdc"
  check_file ".cursor/rules/workflow-orchestrator.mdc"
  check_file ".cursor/commands/workflow-orchestrator.md"
else
  echo "  SKIP  .cursor/ not present — install with --ide cursor|both to enable"
fi

echo ""
if [ $fails -eq 0 ]; then
  echo "RESULT: PASS ($checks checks)"
  exit 0
else
  echo "RESULT: FAIL ($fails of $checks checks failed)"
  exit 1
fi
