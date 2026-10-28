---
id: POL-1.5
title: Security is Everybody's Responsibility
policy_domain: 1
policy_domain_name: Foundational Principles
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [security]
enforcement: review
enforcement_mechanism: "Security role review; security findings block merge per POL-6.2; CI security.yml"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-1.5: Security is Everybody's Responsibility

## Statement (quotable)

> Security is the responsibility of every engineer, not a specialist
> team's afterthought. A security defect blocks merge regardless of the
> author, the feature's importance, or the deadline. No role, seniority,
> or schedule pressure waives a security finding; CRITICAL findings may
> be overridden only by a named human security lead, recorded in the
> pull request.

## Rationale (the WHY — always citable alongside the statement)

Security vulnerabilities reaching production was a founding pain point of
this policy framework. Vulnerabilities are cheapest at authoring time and
most expensive in production — and unlike most defects, their cost is
unbounded: breach, regulatory exposure, and loss of client trust.
Treating security as one team's job creates exactly the gaps attackers
look for; treating deadlines as a waiver teaches the organization that
security is negotiable. This law makes the non-negotiability explicit so
no individual has to argue it under pressure.

## Compliance Examples

VIOLATION:
```text
"The pen-test flagged the missing authorization check on /admin/export,
but the release is tomorrow — ship now, patch next sprint."
```

COMPLIANT:
```text
"The missing authorization check is a CRITICAL finding [POL-5.1].
The release waits, or the endpoint ships disabled. Fix merged behind
the gate; release follows."
```

## Related Policies
- POL-5.1 (Universal Input Validation)
- POL-6.2 (Quality Gates Are Inviolable)
- POL-7.2 (IP and Data Protection)

## Citation Format
[POL-1.5 v1.0] "Security defects block merge regardless of author or deadline; only a named human security lead may override a CRITICAL finding, recorded in the PR."
