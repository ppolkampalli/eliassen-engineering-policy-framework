# Changelog

All notable changes to the Engineering Policy Framework (named the Engineering
Constitution prior to v2.0.0 — see the v2.0.0 entry below). Policy changes
reference their policy-change records (the authoritative audit trail in
`policy-changes/records/`; records predating v2.0.0 keep their original
`AMD-NNNN` ids and are not renamed).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow the policy framework versioning rules in
[POLICY-CHANGE-PROCESS.md](policy-changes/POLICY-CHANGE-PROCESS.md).

Entries below v2.0.0 describe the framework under its prior terminology
("constitution", "law", "article", "persona", "amendment") and are left as
originally written — they are a historical record of what was true when
ratified, not rewritten to match current vocabulary.

## [2.0.0] — 2026-10-28

### Changed

- **Terminology realignment** via
  [AMD-2026-012](policy-changes/records/AMD-2026-012-terminology-realignment.md):
  retired "engineering constitution"/"law"/"Article"/"persona"/"amendment" in
  favor of "Engineering Policy Framework"/"policy" (`POL-X.Y`)/"Policy
  Domain"/"agent role"/"policy change", following terminology feedback from
  Marketing and Strategic Leadership on current AI-agent-governance usage.
  Full persona-council review (10 verdicts) and human decision record in the
  amendment; risk accepted on three flagged objections (regulatory-terminology
  collision with audited compliance "policy" artifacts, no formal cost
  estimate against a deck-only-glossary alternative, and scope extension
  beyond the original sales-deck ask) given no external clients are on the
  current IDs yet.
- `laws/` → `policies/`, `LAW-X.Y` → `POL-X.Y` across all 57 policies (id,
  filename, directory, registry, and cross-references); each policy's
  history gets a new entry recording the id rename, its pre-rename history
  is untouched.
- `CONSTITUTION.md` → `POLICY-FRAMEWORK.md`; `amendments/` →
  `policy-changes/` (`AMD-2026-001`..`011` keep their ids permanently;
  future records use `PCH-YYYY-NNN`); `scripts/law-lookup.sh` →
  `policy-lookup.sh`; `ci/github/law-integrity.yml` → `policy-integrity.yml`;
  `skills/constitution-enforcer` → `policy-enforcer`; `skills/law-clerk` →
  `policy-clerk`; `skills/persona-*` → `skills/role-*` (8 roles);
  `workflows/WF-AMENDMENT.md` → `WF-POLICY-CHANGE.md` (renamed last, as the
  final act of its own enactment).
- Downstream propagation to `agent-board/`, `crm-demo/`, `memory-service/`,
  `user-training-onboarding/` is explicit follow-up work (WF-POLICY-CHANGE
  stage 5), not included in this enactment.

## [1.2.0] — 2026-06-11

### Added

- **LAW-10.6 Defined Workflows** via
  [AMD-2026-010](amendments/records/AMD-2026-010-defined-workflows-law.md):
  nontrivial work follows a declared workflow; deviations on non-hard stages
  are conversational but recorded; hard stages and WF-AMENDMENT are never
  overridable; workflow definitions stay PR-governed (process, not law).
- **Workflow catalog** (`workflows/`): WF-FEATURE, WF-RESEARCH, WF-BUG,
  WF-SECBUG, WF-REFACTOR, WF-AMENDMENT — staged persona chains with law gates,
  hard stages, and human checkpoints; machine-readable registry; project
  override precedence; workflow-orchestrator skill; installer integration.

## [1.1.0] — 2026-06-11

### Added

- **Article 10 — Agentic Development** ratified via
  [AMD-2026-002](amendments/records/AMD-2026-002-agentic-development-article.md):
  LAW-10.1 Spec-Driven Agent Work, LAW-10.2 Verifiable Completion, LAW-10.3
  Agent Sandboxing and Permissions, LAW-10.4 Steering Files Are Governed
  Artifacts, LAW-10.5 Fresh-Context Review.
- **LAW-3.6 Mutation Testing Verifies Test Effectiveness** via
  [AMD-2026-004](amendments/records/AMD-2026-004-mutation-testing-law.md):
  StrykerJS mutation runs in CI; AI-generated tests accepted only when they kill
  additional mutants; ratcheting mutation-score baseline.
- **LAW-7.6 AI-Era Code-Health Metrics** via
  [AMD-2026-005](amendments/records/AMD-2026-005-ai-code-health-metrics.md):
  duplication/churn/moved-vs-copied tracked per release; sustained regression is
  ticketed refactoring work; never an individual performance measure.
- **LAW-4.6 Resilience Patterns** via
  [AMD-2026-008](amendments/records/AMD-2026-008-domain-architecture-resilience.md):
  explicit timeouts, bounded backoff-with-jitter retries, idempotency keys,
  circuit breakers with defined degraded modes on every network boundary.
- **LAW-9.5 Service-Level Objectives, LAW-9.6 Error-Budget Policy, LAW-9.7
  Failure-Injection and Recovery Testing** via
  [AMD-2026-009](amendments/records/AMD-2026-009-reliability-slo-laws.md):
  three-constituency SLO sign-off; budget-exhaustion release freeze with >20%
  postmortem trigger; quarterly game days — untested recovery is assumed broken.

### Changed

- **LAW-3.1 → v1.1** via
  [AMD-2026-003](amendments/records/AMD-2026-003-canon-tdd-agent-guardrail.md):
  Canon TDD cadence (test list, one test at a time) and the agent guardrail —
  failing tests may never be deleted, skipped, or weakened to achieve green.
- **LAW-2.6 → v1.1** via
  [AMD-2026-006](amendments/records/AMD-2026-006-function-size-modernization.md):
  30-line cap replaced with cyclomatic-complexity ≤5 and ~40-LOC advisory
  thresholds; depth of abstraction stated as the design goal.
- **LAW-6.4 → v1.1** via
  [AMD-2026-007](amendments/records/AMD-2026-007-comment-philosophy.md):
  interface comments recognized as part of the abstraction; missing comments
  treated as costlier than imperfect ones; WHAT-restatement still prohibited.
- **LAW-4.1 → v1.1** via
  [AMD-2026-008](amendments/records/AMD-2026-008-domain-architecture-resilience.md):
  domain-first organization with layers inside each domain; modular-monolith
  default; service extraction gated by ADR with documented criteria.

## [1.0.0] — 2026-06-01

### Added

- **All 45 laws ratified at v1.0** across Articles 1–9 via
  [AMD-2026-001](amendments/records/AMD-2026-001-initial-ratification.md)
  (initial ratification; motivated by the six founding pain points).
- Law registry: human-readable `laws/REGISTRY.md` + machine-readable
  `laws/registry.json`.
- Amendment & audit system: five-stage process, template, `law-integrity` CI gate.
- Persona system: 8 personas with authority ladder, persona-council, law-clerk,
  persona guide.
- Enforcement skills: constitution-enforcer (+ citation-format and
  violation-severity references), tdd-assistant, code-review-assistant,
  security-checker, documentation-generator, ai-transparency.
- Law-mapped tooling configs (ESLint, Prettier, tsconfig, Jest, lint-staged),
  pre-commit hook, CONFIG-LAW-MAP.
- CI workflows: quality, security, law-integrity.
- Templates (PR, ADR, law, commit guide, new-project README) and checklists
  (code review, pre-commit).
- Docs: standards, testing guide, 12-week rollout guide, persona guide, ADR-0001.
- Rollout scripts: install.sh, validate.sh, update.sh, law-lookup.sh.
