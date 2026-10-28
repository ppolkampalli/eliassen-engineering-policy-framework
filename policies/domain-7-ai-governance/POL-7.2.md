---
id: POL-7.2
title: IP and Data Protection
policy_domain: 7
policy_domain_name: AI Governance
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [security, quality]
enforcement: role
enforcement_mechanism: "Security role review lens item 7; approved-tool list maintained by security; ai-transparency skill"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-7.2: IP and Data Protection

## Statement (quotable)

> No personally identifiable information, credentials or secrets, payment
> or health data, client-confidential material, or proprietary algorithms
> may be sent to an AI tool that is not on the organization's approved
> list. Approved tools are those with contractual data protection
> (no training on inputs, retention limits, enterprise tenancy). When
> context is needed for an unapproved tool, data is redacted or
> synthesized first; when in doubt, treat data as protected and ask the
> security lead.

## Rationale (the WHY — always citable alongside the statement)

A prompt is an outbound data transfer: anything pasted into an AI tool
leaves the organization's control and may be retained, logged, or used
for training under terms we never reviewed. For client data this can
breach NDAs and data processing agreements; for regulated data (PCI,
HIPAA, GDPR — POL-8.3) it can be a reportable incident; for proprietary
algorithms it can void trade-secret protection, which depends on
demonstrable secrecy. The approved-tool list turns a per-prompt judgment
call into a simple lookup, and the redact-first rule preserves AI's
usefulness without the exposure.

## Compliance Examples

VIOLATION:
```text
Pasting a production stack trace — containing a customer email and a
bearer token — into a free web chatbot to ask why the request failed.
```

COMPLIANT:
```text
Same stack trace with email replaced by user-1042@example.com and the
token by <REDACTED>, pasted into the approved enterprise assistant;
or the original trace into the approved tool covered by the org's
zero-retention agreement.
```

## Related Policies
- POL-5.3 (Secrets Never in Code)
- POL-8.3 (Regulatory Mapping)
- POL-1.5 (Security is Everybody's Responsibility)

## Citation Format
[POL-7.2 v1.0] "No PII, secrets, payment/health data, client-confidential material, or proprietary algorithms may be sent to AI tools outside the approved list."
