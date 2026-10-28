---
id: POL-5.5
title: Dependency Hygiene
policy_domain: 5
policy_domain_name: Security
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [security]
enforcement: automated
enforcement_mechanism: "npm audit + CodeQL in CI security.yml; weekly scheduled scan; lockfiles required"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-5.5: Dependency Hygiene

## Statement (quotable)

> Dependencies are scanned for known vulnerabilities at least weekly and
> on every pull request. CRITICAL vulnerabilities are patched or
> mitigated within 24 hours of disclosure; HIGH within one week.
> Lockfiles are committed and exact versions pinned — builds are
> reproducible byte-for-byte. New dependencies require evaluation before
> adoption: maintenance activity, download base, transitive surface, and
> license (POL-9.4).

## Rationale (the WHY — always citable alongside the statement)

A modern Node.js application is mostly other people's code — typically
hundreds of transitive packages, each a potential entry point.
Supply-chain attacks and disclosed CVEs are exploited within hours of
publication, which is what sets the 24-hour CRITICAL clock. Unpinned
versions mean the code you reviewed is not the code you ship: any
maintainer compromise upstream flows silently into the next build.
Vulnerable dependencies were among the security pain points that founded
this policy framework; scanning continuously and pinning exactly turns
dependency risk from ambient and invisible into measured and managed.

## Compliance Examples

VIOLATION:
```jsonc
// package.json — floating versions, no lockfile committed
{ "dependencies": { "express": "^4", "lodash": "*" } }
// .gitignore: package-lock.json
```

COMPLIANT:
```jsonc
// package.json + committed package-lock.json
{ "dependencies": { "express": "4.19.2" } }
// CI: npm ci && npm audit --audit-level=high (security.yml, weekly + per-PR)
```

## Related Policies
- POL-5.4 (Established Auth Frameworks Only)
- POL-9.4 (License Compliance)
- POL-9.3 (Cost Impact Assessment)

## Citation Format
[POL-5.5 v1.0] "Dependencies are scanned weekly and per-PR; criticals are patched within 24 hours, lockfiles are committed, and versions are pinned exactly."
