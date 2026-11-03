---
id: WF-FEATURE
title: New Feature Development
version: 1.0
status: ACTIVE
trigger: "New feature, enhancement, or user-facing behavior change"
applies_to: [agent, human, mixed]
governed_by: [POL-10.6]
stages:
  - id: requirements
    role: product-owner
    action: "Review the requirement; write acceptance criteria"
    entry: "A requirement, request, or problem statement exists"
    exit: "Written ACs: observable behaviors, in-scope edge cases, verification method"
    gates: [POL-8.1]
    hard: true
    human_checkpoint: recommended
  - id: design
    role: architect
    action: "Design the approach; ADR if structurally significant; identify domain placement"
    entry: "Approved acceptance criteria"
    exit: "Design notes naming affected domains/layers and bearing policies; ADR when POL-4.5 triggers"
    gates: [POL-4.1, POL-4.4, POL-4.5, POL-10.1]
    hard: false
    human_checkpoint: recommended
  - id: test-definition
    role: quality
    action: "Write the test list from the ACs (Canon TDD step 1); define the runnable check"
    entry: "ACs + design"
    exit: "Test list covering every AC; verification check defined per POL-10.2"
    gates: [POL-3.1, POL-10.2]
    hard: true
    human_checkpoint: none
  - id: implement
    role: software-engineer
    action: "TDD implementation: one failing test at a time; evidence with the work"
    entry: "Test list + design"
    exit: "All tests green with evidence; lint/type-check/coverage gates pass; docs updated"
    gates: [POL-3.1, POL-2.1, POL-2.3, POL-6.5, POL-10.2]
    hard: true
    human_checkpoint: none
  - id: code-review
    role: quality
    action: "Fresh-context review against the checklist; two human approvals per POL-6.1"
    entry: "Implementation with evidence"
    exit: "Findings resolved; approvals recorded; mutation report shows added kills for generated tests"
    gates: [POL-6.1, POL-10.5, POL-3.6, POL-7.4]
    hard: true
    human_checkpoint: required
  - id: security-review
    role: security
    action: "Policy Domain 5 pass over the diff (security-checker lens)"
    entry: "Code-review complete"
    exit: "No CRITICAL/HIGH findings open; fix-or-accept recorded for MEDIUM"
    gates: [POL-5.1, POL-5.2, POL-5.3, POL-1.5]
    hard: false   # auto-escalates to hard when the diff touches Policy-Domain-5 surfaces — see Deviation Notes
    human_checkpoint: none
  - id: release-readiness
    role: devops
    action: "Rollback documented; gates green; SLO/error-budget state checked"
    entry: "Reviews complete"
    exit: "Deploy plan with verified rollback path; error budget permits release (POL-9.6)"
    gates: [POL-9.2, POL-6.2, POL-9.6]
    hard: true
    human_checkpoint: recommended
escalation: "Stage conflicts → role-council; unresolved or cross-cutting → human per POL-7.5"
---

# WF-FEATURE: New Feature Development

## When to Use

Any new feature, enhancement, or user-visible behavior change — the default
workflow for building things. Not for: defect fixes (WF-BUG), pure structural
work (WF-REFACTOR), or exploratory work without a committed requirement
(WF-RESEARCH first; its output feeds this workflow's `requirements` stage).

## Stages

### 1. requirements — Product Owner *(hard)*
The PO role reviews the raw requirement and produces acceptance criteria.
Hard because POL-8.1 is absolute: coding against undefined "done" is the
root failure this policy framework exists to prevent — and for agents it is
POL-7.5's manufactured-requirements failure mode.

### 2. design — Architect
Names the domain placement (POL-4.1), the patterns (POL-4.4), and whether an
ADR is required (POL-4.5 — when it triggers, the ADR itself is non-negotiable
even though this *stage* can be skipped for trivially-placed changes). For
agent execution this doubles as the POL-10.1 plan.

### 3. test-definition — Quality *(hard)*
The Canon TDD test list (POL-3.1 v1.1, step 1) written from the ACs before any
implementation, plus the POL-10.2 runnable check. Hard because it is the
verification anchor everything downstream closes against.

### 4. implement — Software Engineer *(hard)*
One failing test at a time; evidence presented with the work (POL-10.2). The
agent guardrail applies in full: a failing test is fixed or its requirement
formally changed — never silenced.

### 5. code-review — Quality *(hard, human checkpoint)*
A fresh subagent reviews the diff (POL-10.5 — `workflow-orchestrator/
SKILL.md` §2's fresh-context dispatch, piloted 2026-10-20): it receives only
the ACs, diff, and test list, never the implementer's reasoning. The two
human approvals of POL-6.1 always stand regardless of how many agent passes
preceded them.

### 6. security-review — Security
See Deviation Notes — skippable only when the diff genuinely has no
Policy-Domain-5 surface.

### 7. release-readiness — DevOps *(hard)*
POL-9.2 rollback verification and the POL-9.6 error-budget check: if the
budget is exhausted, this feature waits (only P0/security ships).

## Deviation Notes

- `design` is commonly skipped for small, clearly-placed changes — recorded
  with rationale. If the implementation later reveals structural impact, the
  orchestrator routes back to `design` (and POL-4.5 still demands the ADR).
- `security-review` may be skipped **only** when the change provably touches no
  Policy-Domain-5 surface (no input paths, persistence, auth, secrets, dependencies,
  network). The orchestrator inspects the diff: any Policy-Domain-5 surface present
  → the stage becomes hard automatically (POL-1.5). When in doubt, it runs.
- `requirements`, `test-definition`, `implement`, `code-review`,
  `release-readiness` are never skippable: each guards an inviolable policy
  (POL-8.1, POL-3.1, POL-6.1/6.2, POL-9.2).
- Reordering: `design` and `test-definition` may run in parallel when the ACs
  are stable.

## Escalation

Design-vs-cost or design-vs-security conflicts → role-council (authority
ladder applies); requirement ambiguity discovered mid-flow → back to
`requirements`, or POL-7.5 escalation if the PO role cannot resolve it.
