---
id: POL-9.1
title: Infrastructure as Code
policy_domain: 9
policy_domain_name: Operations & Cost
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [devops]
enforcement: review
enforcement_mechanism: "DevOps role review; drift detection in deployment pipeline; console changes treated as incidents"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-9.1: Infrastructure as Code

## Statement (quotable)

> All infrastructure — compute, networking, databases, queues, DNS,
> permissions, monitoring — is defined in version-controlled code
> (Terraform, CloudFormation, Bicep, CDK, or equivalent) and changed
> exclusively through reviewed commits and pipeline applies. Console-
> clicked resources are prohibited; an emergency manual change is
> back-ported to code within one business day or reverted, and the
> incident notes record it.

## Rationale (the WHY — always citable alongside the statement)

Hand-built infrastructure is unreproducible by definition: when the
region fails or the account must be rebuilt, the click sequence that
created production exists nowhere. IaC brings infrastructure under the
same guarantees as application code — review (POL-6.1), audit history,
rollback (POL-9.2) — and is the substrate for cost attribution
(POL-9.3's tagging lives in code, not memory) and security review
(POL-5.6's TLS minimums are verifiable in a diff). Drift is treated
seriously because each unrecorded change makes every future apply a
gamble: the code stops describing reality, silently.

## Compliance Examples

VIOLATION:
```text
"Prod was slow so I bumped the RDS instance to db.r6g.2xlarge in the
console." Two weeks later terraform apply silently downsizes it back
at 2 a.m.
```

COMPLIANT:
```text
PR: instance_class = "db.r6g.2xlarge" with cost note per POL-9.3,
reviewed, applied by pipeline. (Emergency path: console change during
SEV-1, back-ported to Terraform next morning, linked in the incident
record.)
```

## Related Policies
- POL-9.2 (Deployment Safety)
- POL-9.3 (Cost Impact Assessment)
- POL-1.3 (Consistency Enables Collaboration)

## Citation Format
[POL-9.1 v1.0] "All infrastructure is defined in version-controlled code and changed only through reviewed commits; console-clicked resources are prohibited."
