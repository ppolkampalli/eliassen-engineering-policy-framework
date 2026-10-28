---
id: POL-8.4
title: Scope Discipline
policy_domain: 8
policy_domain_name: Requirements & Domain
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [product-owner]
enforcement: role
enforcement_mechanism: "Product Owner role sign-off required for out-of-scope changes; scope checked against acceptance criteria in review"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-8.4: Scope Discipline

## Statement (quotable)

> Changes outside the agreed scope of a work item — features not in the
> acceptance criteria, opportunistic refactors of unrelated code, "while
> I'm here" additions — require explicit Product Owner role sign-off
> before implementation, recorded on the work item. Scope expansion is
> not generosity; it is unplanned, unreviewed-by-stakeholders work.
> Genuine adjacent improvements are ticketed (POL-1.2), not smuggled.

## Rationale (the WHY — always citable alongside the statement)

Scope creep is invisible until it isn't: each "small extra" seems free,
but it widens the review surface (raising the odds defects hide in the
unrequested parts), invalidates estimates, and ships behavior no
stakeholder agreed to — which in client work can mean contractual
exposure. AI assistance amplifies the risk because generating the extra
feature costs seconds; the discipline must therefore live in process,
not in effort friction. Routing expansion through the Product Owner
keeps prioritization where accountability for it sits, and the ticketing
path ensures good ideas are captured rather than suppressed.

## Compliance Examples

VIOLATION:
```text
Ticket: "fix rounding error in invoice totals." PR also adds a CSV
export button, renames three services, and upgrades the ORM —
"while I was in there."
```

COMPLIANT:
```text
PR fixes the rounding error. PR description notes: "Found the ORM
two majors behind and invoice-service naming inconsistent — filed
JIRA-2210, JIRA-2211. CSV export idea raised with PO; declined for
this sprint [POL-8.4 v1.0]."
```

## Related Policies
- POL-8.1 (Acceptance Criteria Before Implementation)
- POL-1.2 (Quality is Built-In, Never Added Later)
- POL-6.1 (Two-Approval Review)

## Citation Format
[POL-8.4 v1.0] "Changes outside agreed scope require explicit Product Owner sign-off before implementation; adjacent improvements are ticketed, not smuggled."
