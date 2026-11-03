---
name: security-checker
description: Use for a focused security pass over code, a diff, or a dependency change — SQL/XSS/injection surfaces, secrets, auth implementations, dependency risk, encryption. Delegates to and aligns with the Security role; outputs cited findings with severities.
---

# Security Checker

A focused Policy Domain 5 pass. This skill applies the Security role's review lens
(`../role-security/SKILL.md`); for sustained security work, design
questions, or veto decisions, **assume the Security role itself** — this checker
is the quick-scan instrument, the role is the authority.

## Scan Order (the Security role's lens)

1. **Input validation (POL-5.1)** — every external data path: bodies, params,
   headers, webhooks, uploads, queue messages, third-party responses, env config.
   Allowlist schemas at the boundary; rejected ≠ sanitized.
2. **Query construction (POL-5.2)** — any string building near SQL/NoSQL/LDAP/shell:
   interpolation, concatenation, dynamic column/table names. Parameterized only.
3. **Secrets (POL-5.3)** — keys/tokens/passwords in source, committed config,
   images, or **logs** (the most-missed path). Committed once = rotate now.
4. **Auth & crypto (POL-5.4)** — custom session/token schemes, hand-rolled hashing,
   deprecated algorithms (MD5/SHA-1 for passwords, ECB mode). Established
   frameworks only; argon2id/bcrypt for passwords.
5. **Dependencies (POL-5.5)** — new/changed packages: known CVEs, maintenance
   health, transitive surface, typosquats; lockfile committed and exact.
6. **Transport & storage (POL-5.6)** — plaintext HTTP beyond localhost (including
   "internal" traffic), unencrypted sensitive data at rest, TLS minimums in config.
7. **AI-tool exposure (POL-7.2)** — protected data in prompts, logs, or fixtures
   destined for unapproved tools.

## Output — cited findings, Security role format

```text
FINDING [CRITICAL|HIGH|MEDIUM|LOW]: <issue> at <location>
CITATION: [POL-5.2 v1.0] "<quoted statement>"
RATIONALE: <policy's rationale, applied to this case>
REQUIRED FIX: <concrete code-level remedy>
```

Severity per
[violation-severity.md](../policy-enforcer/reference/violation-severity.md):
secrets in code, query concatenation, unvalidated input reaching execution, custom
crypto → **CRITICAL** (merge blocked, Security role VETO; only a named human
security lead may override, recorded in the PR — POL-1.5).

## Closing Report

```text
SECURITY SCAN: <target>
Surfaces checked: input ▸ queries ▸ secrets ▸ auth ▸ deps ▸ crypto ▸ AI-exposure
Findings: <n CRITICAL / n HIGH / n MEDIUM / n LOW>
VERDICT: [CLEAR | FINDINGS — see above | VETO per Security role]
```

No findings ≠ secure: state what was *not* covered (e.g., runtime config, infra)
so absence of findings is never read as absence of risk.
