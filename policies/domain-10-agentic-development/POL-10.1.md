---
id: POL-10.1
title: Spec-Driven Agent Work
policy_domain: 10
policy_domain_name: Agentic Development
status: ACTIVE
version: 1.0
effective_date: 2026-06-11
owner_roles: [software-engineer, product-owner]
enforcement: role
enforcement_mechanism: "Plan/spec reviewed before substantial agent implementation; constitution-enforcer verifies the plan names bearing laws"
policy_change_history:
  - policy_change: AMD-2026-002
    date: 2026-06-11
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-10.1: Spec-Driven Agent Work

## Statement (quotable)

> Substantial agent-executed work — multi-file changes, new features, refactors —
> proceeds from a written specification or plan reviewed before implementation
> begins. The plan re-checks the policy framework: it names the laws bearing on the
> work and how the approach satisfies them. Trivial, single-step changes are
> exempt. An agent that begins substantial implementation without an approved
> spec/plan exceeds its mandate (POL-7.5, POL-8.1).

## Rationale (the WHY — always citable alongside the statement)

Agents that jump straight to code solve the wrong problem confidently — at
generation speed. Two verified practice lines converge on the same control:
GitHub Spec Kit embeds the project policy framework into agent planning artifacts
(plan/spec/tasks templates each carry policy framework checks), and Anthropic's
agentic guidance prescribes explore→plan→implement precisely because "letting
Claude jump straight to coding can produce code that solves the wrong problem."
The spec is also the anchor POL-10.2's verification closes against: without a
written definition of done, "looks done" is the only signal an agent has.
(Sources: docs/research/2026-06-11-agentic-policy framework-research.md.)

## Compliance Examples

VIOLATION:
```text
"Add export functionality to the reports module" → agent immediately
generates 14 files across 3 layers. No plan reviewed; format, auth
model, and async behavior all guessed (POL-7.5's failure mode at scale).
```

COMPLIANT:
```text
Agent produces a plan first: files to change, approach, laws bearing on
the work ("POL-5.1 for the new input path, POL-4.1 for layer placement,
POL-8.1 ACs attached"). Human approves the plan; implementation follows
it; deviations return to plan review.
```

## Related Policies
- POL-8.1 (Acceptance Criteria Before Implementation)
- POL-7.5 (Mandatory Escalation on Uncertainty)
- POL-10.2 (Verifiable Completion)

## Citation Format
[POL-10.1 v1.0] "Substantial agent work proceeds from a reviewed written spec or plan that names the laws bearing on the work; agents do not begin substantial implementation without one."
