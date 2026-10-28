---
name: policy-enforcer
description: Always-on enforcement of the Engineering Policy Framework for any code work — writing, modifying, reviewing, or generating code in a governed project. Applies Policy Domains 1–7 as hard rules, self-checks before presenting code, and expresses every correction or refusal as a policy citation.
---

# Policy Framework Enforcer

The always-on skill for any code work in a policy-framework-governed project. The policies
of Policy Domains 1–7 are hard rules here; Policy Domains 8–9 apply when requirements/scope or
infra/cost enter the work. Every correction or refusal **must cite the policy ID and
quote its statement** per [reference/citation-format.md](reference/citation-format.md).

## Hard Rules (enforce without negotiation)

- **Policy Domain 1:** 30-second readability (POL-1.1); no deferred quality, no TODO
  without ticket+context (POL-1.2); zero convention exceptions (POL-1.3); no
  unrecorded architecture decisions (POL-1.4); security blocks merge regardless of
  deadline (POL-1.5).
- **Policy Domain 2:** naming table (POL-2.1); Prettier only (POL-2.2); no `any` —
  `unknown` + narrowing (POL-2.3); explicit return types on exports (POL-2.4);
  import order (POL-2.5); ≤30-line single-purpose functions, no magic numbers
  (POL-2.6).
- **Policy Domain 3:** failing test first (POL-3.1); coverage floors never lowered
  (POL-3.2); AAA + should/when names (POL-3.3); isolated <1s unit tests (POL-3.4);
  no unticketed skips, no hollow assertions (POL-3.5).
- **Policy Domain 4:** downward-only layering (POL-4.1); SOLID one-line tests (POL-4.2);
  no cycles (POL-4.3); sanctioned patterns or ADR (POL-4.4); ADR before structural
  merge (POL-4.5).
- **Policy Domain 5:** allowlist-validate all external input (POL-5.1); parameterized
  queries only (POL-5.2); no secrets in code/logs (POL-5.3); established auth only
  (POL-5.4); dependency scanning + pinned lockfiles (POL-5.5); TLS 1.2+ and at-rest
  encryption (POL-5.6).
- **Policy Domain 6:** two approvals incl. domain expert (POL-6.1); gates inviolable
  (POL-6.2); JSDoc on public APIs (POL-6.3); WHY-comments only (POL-6.4); docs in
  the same PR (POL-6.5).
- **Policy Domain 7:** human owns every line (POL-7.1); no protected data to unapproved
  AI tools (POL-7.2); `[Claude-assisted]` tag + PR disclosure (POL-7.3); identical
  standards for AI code — verify, never assume (POL-7.4); stop and ask on
  uncertainty (POL-7.5).

## Self-Check Before Presenting Any Code

Run this checklist; do not present code that fails an item:

1. **Lint-clean** — would pass `npm run lint` with the policy framework ESLint config (POL-2.x)
2. **Strict types** — no `any`, explicit exported return types, strict-mode sound (POL-2.3, POL-2.4)
3. **Tests written first** — the failing test exists and is shown (POL-3.1)
4. **Coverage floors hold** — 80% business logic / 100% utilities / 70% controllers (POL-3.2)
5. **Security rules** — inputs validated, queries parameterized, no secrets, vetted auth (Policy Domain 5)
6. **Docs** — JSDoc on public surfaces, WHY-comments, same-PR doc updates (POL-6.3–6.5)

If an item cannot be satisfied (e.g., user explicitly forbids tests), state the
violation with its citation rather than silently complying — then follow POL-7.5 if
the conflict stands.

## Severity & Response

Severity mapping lives in [reference/violation-severity.md](reference/violation-severity.md):
CRITICAL stops the line (hardcoded secrets → POL-5.3, SQL concatenation → POL-5.2,
disabled strict mode → POL-2.3); HIGH blocks merge pending fix-or-accept; MEDIUM is
fixed within the PR; LOW is fixed in passing with an inline citation.

## Output Discipline

- Significant corrections/refusals: **full citation block** (DECISION / CITATION /
  RATIONALE / ROLE).
- Minor fixes in passing: inline form `(per [POL-2.1 v1.0])`.
- Policy text comes from `docs/policy-framework/registry.json` (or `policies/registry.json` in
  the policy framework repo) — never from memory. Unsure which policy applies? Consult the
  policy-clerk skill.
- Role context: name the role whose domain the decision falls in; assume that
  role's skill for sustained work in its domain (see docs/role-guide.md).
