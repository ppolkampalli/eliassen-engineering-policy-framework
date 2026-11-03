# The Engineering Policy Framework

**Eliassen Group** · Version 2.0.0 · Ratified 2026-06-01 via [AMD-2026-001](policy-changes/records/AMD-2026-001-initial-ratification.md) · Amended 2026-06-11 via [AMD-2026-002…010](policy-changes/records/) · Terminology realigned 2026-10-28 via [AMD-2026-012](policy-changes/records/AMD-2026-012-terminology-realignment.md)

---

## Preamble

This policy framework codifies the software engineering quality standards of Eliassen
Group for JavaScript/TypeScript (Node.js + React) delivery teams: 20–50 distributed
engineers working with AI assistance across client engagements.

**Purpose.** To make quality systematic instead of heroic. Standards here are not
aspirations; they are numbered, versioned **Policies** — citable by ID, enforced by
tooling, agent roles, and review, and changeable only through a recorded policy-change
process.

**Scope.** All JavaScript/TypeScript projects delivered by or for Eliassen Group.
The policy framework binds human engineers and AI agents identically (POL-7.4).

**The six founding pain points.** This policy framework exists because we repeatedly
paid for the same failures:

1. **Review bottlenecks** — slow, inconsistent, frequently superficial reviews
2. **Inconsistent standards** — every project its own dialect
3. **Low test coverage** — incidents living in untested paths
4. **Security vulnerabilities** — injection, leaked secrets, vulnerable dependencies
   reaching production
5. **Poor documentation** — intent living in heads and chat threads
6. **Unaddressed tech debt** — "later" never arriving

Every policy's Rationale section traces back to one or more of these.

---

## How to Read and Cite Policies

Each policy is one file in `policies/` with a quotable **Statement**, a **Rationale** (the
WHY), compliance examples, and a policy-change history. The full index is
[policies/REGISTRY.md](policies/REGISTRY.md) (human) and [policies/registry.json](policies/registry.json)
(machine); `./scripts/policy-lookup.sh POL-2.3` prints any policy from the command line.

Decisions made under this policy framework are **articulated as citations**:

```text
DECISION: Rejecting use of `any` type in payment-service.ts line 47.
CITATION: [POL-2.3 v1.0] "The `any` type is prohibited. Use `unknown`
with type narrowing."
RATIONALE (from policy record): `any` silently disables type checking,
defeating the purpose of TypeScript and allowing type errors to reach
production.
AGENT ROLE: Software Engineer (owner: Quality)
```

Short corrections may use the inline form: `(per [POL-2.1 v1.0])`. The complete
specification lives in
[citation-format.md](skills/policy-enforcer/reference/citation-format.md).

---

## The Ten Policy Domains

| Policy Domain | Domain | Policies | Summary |
|---|---|---|---|
| [1 — Foundational Principles](policies/domain-1-foundational-principles/) | Principles | 1.1–1.5 | Readable code, built-in quality, zero-exception consistency, intentional architecture, universal security responsibility |
| [2 — Code Standards](policies/domain-2-code-standards/) | Code | 2.1–2.6 | Naming table, Prettier formatting, no `any`, explicit return types, import order, single-purpose functions (CC≤5/~40-LOC advisory) |
| [3 — Testing & Quality](policies/domain-3-testing-quality/) | Tests | 3.1–3.6 | Canon TDD with agent guardrail, coverage floors (80/100/70), AAA structure, isolated <1s unit tests, no hollow tests, mutation testing |
| [4 — Architecture](policies/domain-4-architecture/) | Design | 4.1–4.6 | Domain-first modular monolith with layers within, SOLID, no cycles, sanctioned patterns, ADRs before merge, resilience patterns |
| [5 — Security](policies/domain-5-security/) | Security | 5.1–5.6 | Allowlist input validation, parameterized queries, no secrets in code, established auth only, dependency hygiene, TLS 1.2+/at-rest encryption |
| [6 — Review & Documentation](policies/domain-6-review-documentation/) | Review | 6.1–6.5 | Two approvals incl. domain expert, inviolable quality gates, JSDoc on public APIs, abstraction + WHY comments, docs in the same PR |
| [7 — AI Governance](policies/domain-7-ai-governance/) | AI | 7.1–7.6 | Human accountability, IP/data protection, `[Claude-assisted]` audit trail, identical standards, escalation on uncertainty, code-health metrics |
| [8 — Requirements & Domain](policies/domain-8-requirements-domain/) | Domain | 8.1–8.4 | Acceptance criteria before code, cited business rules, regulatory mapping, scope discipline |
| [9 — Operations & Cost](policies/domain-9-operations-cost/) | Ops | 9.1–9.7 | IaC, reversible deployments, cost review + tagging, license compliance, SLOs, error budgets, failure-injection testing |
| [10 — Agentic Development](policies/domain-10-agentic-development/) | Agents | 10.1–10.6 | Spec-driven agent work, verifiable completion, sandboxing + permissions, governed steering files, fresh-context review, defined workflows |

---

## The Agent Role System

Eight agent roles — defined as skills in [skills/](skills/) (the `role-*` directories)
— let AI agents assume a role with a mandate, owned policies, and bounded authority.
**Every agent role decision cites policies.** Full guide: [docs/role-guide.md](docs/role-guide.md).

| Agent Role | Domain | Owned Policies |
|---|---|---|
| Industry SME | Domain rules, regulation | 8.2, 8.3 |
| Product Owner | Requirements, scope, process | 8.1, 8.4, 10.6, co-owns 9.5, 9.6, 10.1 |
| Quality | Testing, review standards, process | 3.1–3.6, 6.1, 6.2, 10.2, 10.5, 10.6, co-owns 2.3, 7.6 |
| Architect | Design, patterns, ADRs | 4.1–4.6, 1.4, co-owns 7.6 |
| Software Engineer | Implementation (default) | 2.1–2.6, 10.1, 10.4 |
| DevOps | CI/CD, infra, deploys, reliability | 9.1, 9.2, 9.5–9.7, co-owns 4.6, 10.3; enforces 6.2 |
| Security | Policy Domain 5 + AI data + agents | 5.1–5.6, 10.3, co-enforces 7.2, 1.5 |
| FinOps | Cost, licensing | 9.3, 9.4 |

**Authority ladder** (applies wherever agent roles conflict):

```
Security VETO (CRITICAL findings; overridable only by a named human security lead)
  > Architect VETO (layer violations, circular dependencies)
    > Quality BLOCK (coverage floors, gate integrity)
      > DevOps / Product Owner BLOCK (no-rollback deploys / missing acceptance criteria)
        > Advisory roles (Industry SME, FinOps advise; FinOps subordinate to Security)
```

Cross-cutting work and unresolved conflicts go to the
[role-council](skills/role-council/SKILL.md), which surfaces
disagreements verbatim and escalates to humans per POL-7.5.

**How work flows between agent roles** is defined by the
[workflow catalog](workflows/README.md) (POL-10.6): staged role chains —
WF-FEATURE, WF-RESEARCH, WF-BUG, WF-SECBUG, WF-REFACTOR, WF-POLICY-CHANGE — driven
by the workflow-orchestrator skill, with conversational-but-recorded deviations
and inviolable hard stages.

---

## Changing the Policy Framework

Policies change **only** through the five-stage policy-change process —
proposal → review → decision → enactment → propagation — documented in
[policy-changes/POLICY-CHANGE-PROCESS.md](policy-changes/POLICY-CHANGE-PROCESS.md).

- Every change is recorded with rationale, approver, and date.
- Rejected policy changes are retained with their rejection rationale.
- Repealed policies are never deleted; they remain citable for historical decisions.
- The `policy-integrity` CI workflow fails any PR changing a policy without a
  policy-change record — auditability is enforced by machine, not memory.

---

## Ratification

By approval of AMD-2026-001, this constitution and all 45 laws of Articles 1–9
enter force at v1.0.0, effective **2026-06-01**. *(Preserved verbatim as the
historical ratification record — written and approved under the terminology in
force at the time. See [AMD-2026-012](policy-changes/records/AMD-2026-012-terminology-realignment.md)
for the 2026-10-28 terminology realignment that produced this document's current
name and vocabulary, bringing the framework to v2.0.0.)*

| Role | Name | Signature | Date |
|---|---|---|---|
| VP Engineering | ____________________ | ____________________ | 2026-06-01 |
| Tech Lead, Platform | ____________________ | ____________________ | 2026-06-01 |
| Security Lead | ____________________ | ____________________ | 2026-06-01 |

## Review Schedule

The policy framework is reviewed quarterly: policies with recurring exception requests,
policy-change proposals from retrospectives, and pain-point metrics are evaluated, and
outcomes are recorded as policy changes.

**First quarterly review: 2026-09-01.**
