---
name: code-review-assistant
description: Use when reviewing a pull request, diff, or code change in a policy-framework-governed project. Runs the policy-domain-organized review checklist, expresses every verdict as a policy citation, and applies the POL-7.4 verify-never-assume lens to AI-generated code.
---

# Code Review Assistant

Reviews changes against the policy framework, policy domain by policy domain. Every verdict line
cites a specific policy per
[citation-format.md](../policy-enforcer/reference/citation-format.md);
severities per
[violation-severity.md](../policy-enforcer/reference/violation-severity.md).

## Review Procedure

1. **Read the work item first** — acceptance criteria (POL-8.1) define what
   "correct" means; scope (POL-8.4) defines what belongs in the diff.
2. **Check AI disclosure** — `[Claude-assisted]` commits / PR AI section (POL-7.3)?
   If AI-assisted, engage the POL-7.4 lens below.
3. **Walk the checklist by policy domain** (below).
4. **Emit findings with citations and severities**; conclude with a verdict.

## Checklist (by policy domain)

**Policy Domain 1 — Foundations**
- [ ] Every function understandable in 30 seconds (POL-1.1)
- [ ] No TODO without ticket+context (POL-1.2)
- [ ] No project-local convention deviations (POL-1.3)

**Policy Domain 2 — Code Standards**
- [ ] Naming per table; no `I` prefix; is/has/can booleans; kebab-case files (POL-2.1)
- [ ] No manual formatting; Prettier output (POL-2.2)
- [ ] No `any` — including hidden ones: `as any`, implicit (POL-2.3)
- [ ] Exported functions: explicit return types (POL-2.4)
- [ ] Import groups ordered (POL-2.5)
- [ ] Functions ≤30 lines, one job; no magic numbers (POL-2.6)

**Policy Domain 3 — Testing**
- [ ] Evidence of test-first (test commits/PR description) (POL-3.1)
- [ ] Floors hold; no threshold edits in the diff (POL-3.2)
- [ ] AAA; should/when names (POL-3.3)
- [ ] Isolated, fast, order-independent (POL-3.4)
- [ ] No unticketed skips; every test can fail (POL-3.5)

**Policy Domain 4 — Architecture**
- [ ] Dependencies point downward; no layer skips (POL-4.1)
- [ ] SOLID one-line tests pass (POL-4.2)
- [ ] No cycles (POL-4.3)
- [ ] Sanctioned patterns where required (POL-4.4)
- [ ] ADR present for structural decisions (POL-4.5)

**Policy Domain 5 — Security** (delegate deep passes to security-checker / Security role)
- [ ] External input allowlist-validated (POL-5.1)
- [ ] Queries parameterized (POL-5.2)
- [ ] No secrets in code/config/logs (POL-5.3)
- [ ] No custom auth/crypto (POL-5.4)
- [ ] New deps evaluated; lockfile intact (POL-5.5)
- [ ] TLS/at-rest expectations hold (POL-5.6)

**Policy Domain 6 — Review & Docs**
- [ ] JSDoc on public surfaces (POL-6.3)
- [ ] Comments are WHY, not WHAT (POL-6.4)
- [ ] Affected docs updated in this PR (POL-6.5)

**Policy Domains 7–9 — Governance & Ops (when applicable)**
- [ ] AI disclosure complete (POL-7.3); identical standards applied (POL-7.4)
- [ ] In scope, or PO sign-off recorded (POL-8.4); business rules cited (POL-8.2)
- [ ] IaC for infra; rollback documented; cost estimate + tags; licenses (POL-9.1–9.4)

## AI-Generated Code — the POL-7.4 Lens

**Verify, never assume.** For tagged (or suspected) AI-generated portions:
- Confirm claimed APIs exist in the real documentation — invented methods are the
  signature failure
- Test the boundaries: off-by-one, empty, null, max — plausible logic hides
  inverted edge conditions
- Inspect generated tests for hollowness (POL-3.5): do they assert outcomes or
  merely that mocks were called?
- Reviewer attention scales UP for generated code, never down

## Verdict Format

```text
REVIEW VERDICT: [APPROVE | APPROVE WITH MINOR FIXES | REQUEST CHANGES | BLOCKED]
FINDING [SEVERITY]: <issue> at <location>
CITATION: [POL-X.Y vN.N] "<quoted statement>"
RATIONALE: <policy's rationale, applied>
REQUIRED FIX: <concrete remedy>
(one block per finding; minor items inline: `(per [POL-2.5 v1.0])`)
```

A skill review supplements — never replaces — the two human approvals (POL-6.1).
