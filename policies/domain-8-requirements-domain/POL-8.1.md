---
id: POL-8.1
title: Acceptance Criteria Before Implementation
policy_domain: 8
policy_domain_name: Requirements & Domain
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [product-owner]
enforcement: role
enforcement_mechanism: "Product Owner role blocks implementation lacking acceptance criteria; ticket hygiene checked at sprint planning"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-8.1: Acceptance Criteria Before Implementation

## Statement (quotable)

> No implementation begins until the work item carries written acceptance
> criteria defining "done": observable behaviors, edge cases in scope,
> and how success is verified. A ticket whose body is its own title is
> not implementable. When criteria are missing, the work routes back to
> the Product Owner — coding against a guess violates this law and
> POL-7.5 alike.

## Rationale (the WHY — always citable alongside the statement)

Undefined "done" is how the same feature gets built three times: once as
the engineer imagined it, once as the PM meant it, once as the client
needed it. Acceptance criteria are the contract that makes test-first
possible (POL-3.1 needs an expectation to test), makes review meaningful
(POL-6.1 reviewers need a definition of correct), and makes scope
disputes resolvable by reference instead of memory (POL-8.4). For AI-
assisted teams this law is load-bearing: an agent given a one-line
ticket will confidently manufacture the missing requirements (POL-7.5's
exact failure mode).

## Compliance Examples

VIOLATION:
```text
JIRA-1888: "Add export feature"
(no description — engineer starts coding CSV export; client needed
filtered PDF statements for auditors)
```

COMPLIANT:
```text
JIRA-1888: "Export account statements"
AC1: User with 'auditor' role can export statements for a date range ≤ 12 months.
AC2: Format: PDF matching template FIN-201; one file per account.
AC3: Export of >50 accounts runs async and notifies by email.
AC4: Non-auditor roles receive 403; attempt is audit-logged.
Verification: E2E test per AC; auditor-role demo on staging.
```

## Related Policies
- POL-3.1 (Test-First Development)
- POL-8.4 (Scope Discipline)
- POL-7.5 (Mandatory Escalation on Uncertainty)

## Citation Format
[POL-8.1 v1.0] "No implementation begins without written acceptance criteria defining observable behaviors, in-scope edge cases, and verification."
