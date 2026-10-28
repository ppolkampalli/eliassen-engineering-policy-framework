# Violation Severity Matrix

Maps violation severities to policies. Severity drives the response: CRITICAL stops the
line; LOW is fixed in passing with an inline citation.

| Severity | Meaning | Response |
|---|---|---|
| **CRITICAL** | Exploitable, data-exposing, or integrity-destroying. | Work stops. Merge blocked (Security VETO where applicable). Fix before anything else proceeds. |
| **HIGH** | Violates a blocking policy; defect will propagate or recur if merged. | Merge blocked until fixed or formally accepted by the owning role (fix-or-accept recorded). |
| **MEDIUM** | Standard violated; quality erodes but no immediate exposure. | Fix within the PR; reviewer verifies before approval. |
| **LOW** | Style/consistency deviation tooling can fix or reviewer notes. | Fix in passing with inline citation `(per [POL-X.Y vN])`. |

## CRITICAL (canonical examples)

| Violation | Policy |
|---|---|
| Hardcoded secrets, keys, tokens in code or logs | POL-5.3 |
| SQL/query built by string concatenation/interpolation | POL-5.2 |
| Disabled strict mode / suppressed type checking (`any` floods, `@ts-nocheck`, strict flags off) | POL-2.3 |
| Unvalidated external input reaching queries, exec, or rendering | POL-5.1 |
| Custom crypto, home-grown auth/session/token scheme | POL-5.4 |
| Sensitive data sent to unapproved AI tool | POL-7.2 |
| Quality gate bypassed, disabled, or given an override path | POL-6.2 |
| Plaintext transport outside localhost; sensitive data stored unencrypted | POL-5.6 |

## HIGH

| Violation | Policy |
|---|---|
| Known-vulnerable dependency (CRITICAL CVE >24h, HIGH >1wk); unpinned/missing lockfile | POL-5.5 |
| No failing test preceded the implementation | POL-3.1 |
| Coverage threshold lowered to pass; floors not met | POL-3.2 |
| Hollow tests (cannot fail); `.skip` without ticket | POL-3.5 |
| Layer violation; circular dependency | POL-4.1, POL-4.3 |
| Significant structural change without ADR | POL-4.5, POL-1.4 |
| Deploy without rollback plan; console-built infrastructure | POL-9.2, POL-9.1 |
| Implementation begun without acceptance criteria | POL-8.1 |
| AI-generated code merged unverified; undisclosed AI involvement | POL-7.4, POL-7.3, POL-7.1 |
| Copyleft/unevaluated license adopted without sign-off | POL-9.4 |
| Self-approval; missing domain-expert review | POL-6.1 |

## MEDIUM

| Violation | Policy |
|---|---|
| Function >30 lines / multiple responsibilities; magic numbers | POL-2.6 |
| Missing explicit return type on exported function | POL-2.4 |
| Missing/incomplete JSDoc on public API | POL-6.3 |
| Stale docs not updated in the PR | POL-6.5 |
| Test not AAA / vague name; inter-test dependence | POL-3.3, POL-3.4 |
| TODO without ticket+context | POL-1.2 |
| Uncited business rule in domain code | POL-8.2 |
| Out-of-scope additions without PO sign-off | POL-8.4 |
| Untagged cloud resource; missing cost estimate on material change | POL-9.3 |
| Compliance-mapped path changed without map update | POL-8.3 |

## LOW

| Violation | Policy |
|---|---|
| Naming convention deviation | POL-2.1 |
| Manual formatting drift | POL-2.2 |
| Import order violations | POL-2.5 |
| WHAT-comments restating code | POL-6.4 |
| 30-second readability friction (unclear but functional) | POL-1.1 |

**Precedence note:** when a violation plausibly maps to two severities, take the
higher. Severity describes worst credible consequence, not author intent.
