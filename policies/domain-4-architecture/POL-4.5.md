---
id: POL-4.5
title: ADR Requirement
policy_domain: 4
policy_domain_name: Architecture
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [architect]
enforcement: review
enforcement_mechanism: "PR review blocks significant structural merges lacking an ADR in docs/adr/; architect role verifies"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-4.5: ADR Requirement

## Statement (quotable)

> Every significant structural decision is recorded as an Architecture
> Decision Record in `docs/adr/` — using `templates/adr-template.md` —
> before the implementing change merges. Significant means: new service
> or module boundary, new external dependency or infrastructure
> component, new layer or cross-cutting concern, departure from
> sanctioned patterns, or any decision a future maintainer would ask
> "why is it like this?" about. The ADR records context, options
> considered, the decision, its consequences, and the laws considered.

## Rationale (the WHY — always citable alongside the statement)

The most expensive question in a legacy system is "can we change this?"
— and it's expensive precisely because nobody recorded why it is the way
it is. ADRs are the architecture's audit trail, exactly as policy change
records are the policy framework's: they make decisions reversible (the
original constraints are known), onboarding fast (the system explains
itself), and agent assistance safe (an AI extending the system can read
the intent, not just the artifact). Requiring the ADR *before* merge is
deliberate — decisions documented after the fact are justifications, not
records (POL-1.4).

## Compliance Examples

VIOLATION:
```text
PR #312 replaces REST calls between order and inventory services with
a RabbitMQ queue. No ADR; rationale lives in a Slack thread that will
be unsearchable in six months.
```

COMPLIANT:
```text
PR #312 includes docs/adr/0009-async-inventory-updates.md: context
(timeout cascade during peak), options (retry budget, queue, batch
sync), decision (queue), consequences (eventual consistency window,
new infra dependency), laws considered (POL-4.1, POL-9.2, POL-9.3).
```

## Related Policies
- POL-1.4 (Architecture Decisions Are Intentional)
- POL-4.4 (Sanctioned Patterns)
- POL-6.5 (Docs Travel With Code)

## Citation Format
[POL-4.5 v1.0] "Significant structural decisions are recorded as an ADR in docs/adr/ before the implementing change merges."
