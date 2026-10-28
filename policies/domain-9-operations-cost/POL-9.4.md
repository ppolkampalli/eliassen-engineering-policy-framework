---
id: POL-9.4
title: License Compliance
policy_domain: 9
policy_domain_name: Operations & Cost
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [finops]
enforcement: role
enforcement_mechanism: "FinOps role review of new dependencies; license check in dependency evaluation per POL-5.5"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-9.4: License Compliance

## Statement (quotable)

> Every dependency's license is evaluated before adoption — including
> transitive licenses. Permissive licenses (MIT, Apache-2.0, BSD, ISC)
> are pre-approved. Copyleft licenses (GPL, AGPL, SSPL) and "source-
> available" commercial licenses are flagged to the FinOps role and
> require human legal sign-off before use — AGPL in network services
> especially. License evaluation is recorded with the dependency
> decision; a license change on upgrade re-triggers review.

## Rationale (the WHY — always citable alongside the statement)

A license is a contract accepted by `npm install`, and in client-
delivery work the exposure is double: copyleft obligations can attach to
the *client's* proprietary codebase, converting a free library into a
legal incident and a contractual breach. AGPL is singled out because its
network clause triggers on serving users — no distribution needed —
which describes essentially everything we build. Upgrade re-review
exists because relicensing mid-stream is now routine practice; the
license you audited is not necessarily the license in this week's
lockfile. Catching this at adoption costs a lookup; catching it at
client audit costs a remediation project.

## Compliance Examples

VIOLATION:
```text
"Found a great PDF library" — AGPL-3.0, npm-installed into the
client's proprietary billing service. Discovered eight months later
during the client's acquisition due diligence.
```

COMPLIANT:
```text
PR dependency note: "pdf-render@4.1: MIT ✓ (transitives: MIT/Apache-2
✓ via license-checker). Alternative rejected: doc-forge (AGPL-3.0,
flagged per [POL-9.4 v1.0] — legal sign-off not pursued; MIT option
sufficient)."
```

## Related Policies
- POL-5.5 (Dependency Hygiene)
- POL-9.3 (Cost Impact Assessment)
- POL-7.2 (IP and Data Protection)

## Citation Format
[POL-9.4 v1.0] "Every dependency license (including transitives) is evaluated before adoption; copyleft and source-available licenses require human legal sign-off."
