---
id: POL-3.6
title: Mutation Testing Verifies Test Effectiveness
policy_domain: 3
policy_domain_name: Testing & Quality
status: ACTIVE
version: 1.0
effective_date: 2026-06-11
owner_roles: [quality, software-engineer]
enforcement: automated
enforcement_mechanism: "StrykerJS mutation runs in CI on changed modules; AI-generated test suites re-validated against the mutation report"
policy_change_history:
  - policy_change: AMD-2026-004
    date: 2026-06-11
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-3.6: Mutation Testing Verifies Test Effectiveness

## Statement (quotable)

> Test effectiveness is verified by mutation testing, complementing — never
> replacing — POL-3.2's coverage floors. Mutation runs (StrykerJS) execute in
> CI on changed business-logic and utility modules. AI-generated test suites
> are accepted only after mutation re-validation shows they kill mutants beyond
> the pre-existing suite; a generated test that kills no additional mutants is
> hollow (POL-3.5) and is rejected. Each project records a mutation-score
> baseline and ratchets it: the score may rise; a sustained drop on changed
> modules blocks merge pending added assertions.

## Rationale (the WHY — always citable alongside the statement)

Coverage proves code ran; mutation score proves tests notice when code breaks.
Peer-reviewed evidence shows coverage "is not strongly correlated with test
suite effectiveness" (Inozemtseva & Holmes, ICSE 2014), and the AI era weaponizes
the gap: LLM-generated suites have reached 100% line/branch coverage with ~4%
mutation score — perfectly green, detecting nothing. Mutation testing is now
operationalized at scale (Meta's ACH across Facebook/Instagram/WhatsApp, FSE
2025; Atlassian's Pitest workflow, which found AI-generated tests must be
re-validated against the mutation report). The ratchet replaces a universal
numeric floor because verified thresholds come from Kotlin/Java at much larger
scale — JS/TS calibration is pending pilot. Per AMD-2026-004; evidence in
docs/research/2026-06-11-agentic-policy framework-research.md.

## Compliance Examples

VIOLATION:
```text
PR adds 40 generated tests; line coverage jumps to 92%. Mutation run
shows zero additional mutants killed — every test asserts mocks were
called. Tests accepted on the coverage number alone.
```

COMPLIANT:
```text
PR adds generated tests; CI mutation run on the changed module shows
mutants killed rising 61% → 78%. Two tests killing no additional
mutants are rejected as hollow (POL-3.5) and replaced with
outcome-asserting versions before merge.
```

## Related Policies
- POL-3.2 (Coverage Floors)
- POL-3.5 (No Skipped or Hollow Tests)
- POL-7.4 (Identical Standards for AI Code)

## Citation Format
[POL-3.6 v1.0] "Test effectiveness is verified by mutation testing; AI-generated tests are accepted only when they kill mutants beyond the existing suite, and mutation-score baselines ratchet upward, never down."
