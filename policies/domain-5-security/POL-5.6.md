---
id: POL-5.6
title: Encryption Standards
policy_domain: 5
policy_domain_name: Security
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [security]
enforcement: review
enforcement_mechanism: "Security role review lens item 6; infrastructure review per POL-9.1"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-5.6: Encryption Standards

## Statement (quotable)

> All data in transit uses TLS 1.2 or higher — including service-to-
> service traffic inside private networks; plaintext HTTP exists only on
> localhost. Sensitive data at rest — PII, credentials, payment data,
> health data, client business data — is encrypted with current
> standards (AES-256 or platform-managed equivalent). Encryption uses
> platform or vetted-library primitives with managed keys; key material
> follows POL-5.3.

## Rationale (the WHY — always citable alongside the statement)

Plaintext transport makes every network segment a wiretap point;
"internal" networks stop being a defense the moment any single host,
container, or VPC peering is compromised — which is why zero-trust
practice encrypts everywhere, not just at the edge. At-rest encryption
is the last line when access controls fail (stolen snapshot, mislaid
backup, decommissioned disk) and is a hard requirement of the
regulatory regimes our clients operate under — PCI DSS, HIPAA, GDPR
(POL-8.3). Specifying floors (TLS 1.2+, AES-256) keeps deprecated
protocols from surviving by inertia.

## Compliance Examples

VIOLATION:
```yaml
# service-to-service call inside the VPC
INVENTORY_API: http://inventory.internal:8080   # plaintext "because internal"
# users table: ssn VARCHAR(11)  -- stored unencrypted
```

COMPLIANT:
```yaml
INVENTORY_API: https://inventory.internal:8443  # TLS 1.2+ everywhere
# ssn stored via column-level AES-256 encryption with KMS-managed key;
# TLS termination configured min_version = TLSv1.2 in IaC (POL-9.1)
```

## Related Policies
- POL-5.3 (Secrets Never in Code)
- POL-8.3 (Regulatory Mapping)
- POL-9.1 (Infrastructure as Code)

## Citation Format
[POL-5.6 v1.0] "Data in transit uses TLS 1.2+ everywhere including internal traffic; sensitive data at rest is encrypted to current standards with managed keys."
