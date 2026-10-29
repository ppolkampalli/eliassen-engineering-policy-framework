---
id: POL-1.2
title: Quality is Built-In, Never Added Later
policy_domain: 1
policy_domain_name: Foundational Principles
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [quality]
enforcement: review
enforcement_mechanism: "Code review; TODO-without-ticket flagged by review checklist and policy-enforcer skill"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0); residual law/laws wording in Statement/
      Rationale prose fixed as a same-amendment follow-up the initial sweep missed."
---

# POL-1.2: Quality is Built-In, Never Added Later

## Statement (quotable)

> Quality is engineered into code at the moment it is written, never
> deferred to a later pass. "We'll clean it up later" is not an accepted
> engineering plan. A TODO comment is permitted only when it references a
> tracked ticket and states the context and intended resolution; a TODO
> without a ticket is a defect. Work is not "done" until it meets every
> applicable policy of this policy framework.

## Rationale (the WHY — always citable alongside the statement)

Deferred quality is debt issued at predatory interest: unaddressed tech
debt was one of the six founding pain points of this policy framework.
Industry experience and our own incident history show that "temporary"
code outlives its authors, and cleanup passes are perpetually displaced
by feature pressure. Forcing quality into the definition of done — and
forcing every deferral to be ticketed and visible — keeps debt deliberate,
bounded, and scheduled rather than silent and compounding.

## Compliance Examples

VIOLATION:
```typescript
// TODO: handle errors properly later
const data = JSON.parse(response.body);
```

COMPLIANT:
```typescript
// TODO(JIRA-1482): replace permissive parse with zod schema validation
// once the upstream contract is finalized (target: 2026-Q3). Until then,
// parse failures must surface as ValidationError, not crash the worker.
const data = parseOrderPayload(response.body);
```

## Related Policies
- POL-3.1 (Test-First Development)
- POL-6.2 (Quality Gates Are Inviolable)
- POL-1.1 (Code is Written for Humans First)

## Citation Format
[POL-1.2 v1.0] "Quality is built in at the moment code is written, never deferred; a TODO without a tracked ticket and context is a defect."
