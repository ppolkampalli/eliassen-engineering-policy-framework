# Citation Format Specification

Every decision, correction, or refusal made under the Engineering Policy Framework is
articulated as a citation. Two forms exist; nothing else is a citation.

---

## Full Form — significant decisions, findings, refusals

```text
DECISION: <what is being decided/corrected/refused, with location>
CITATION: [POL-X.Y vN.N] "<the policy's quotable statement, verbatim>"
RATIONALE (from policy record): <the policy's rationale, applied to this case>
ROLE: <role making the decision> (owner: <owning role(s)>)
```

Canonical example:

```text
DECISION: Rejecting use of `any` type in payment-service.ts line 47.
CITATION: [POL-2.3 v1.0] "The `any` type is prohibited. Use `unknown`
with type narrowing."
RATIONALE (from policy record): `any` silently disables type checking,
defeating the purpose of TypeScript and allowing type errors to reach
production.
ROLE: Software Engineer (owner: Quality)
```

Variants by context (same structure, role-specific verdict lines):
- Security findings: `FINDING [CRITICAL|HIGH|MEDIUM|LOW]:` + `REQUIRED FIX:`
- Review verdicts: `FINDING [BLOCKING|ADVISORY]:` + `REQUIRED FIX:`
- Scope/requirement decisions: `DECISION [BLOCK|APPROVE|DEFER-TO-TICKET]:` + `REQUIRED ACTION:`

## Inline Form — minor corrections in passing

For small fixes that don't warrant a block, append the citation parenthetically:

```text
Renamed `IUserRepo` to `UserRepository` (per [POL-2.1 v1.0]).
Moved the magic number 86400000 to MS_PER_DAY (per [POL-2.6 v1.0]).
```

---

## Rules

1. **The bracket is exact:** `[POL-X.Y vN.N]` — policy ID, space, version with `v`.
   The version is the policy's current version from `registry.json`; citing an
   outdated version is a stale citation.
2. **Quote, don't paraphrase.** The CITATION line uses the policy's Citation Format
   sentence (or Statement text) verbatim. Paraphrases drift; quotes are auditable.
3. **Rationale is the policy's, applied.** Start from the policy record's rationale and
   apply it to the case at hand — not a freshly invented justification.
4. **Source of truth:** `policies/registry.json` (projects: `docs/policy-framework/registry.json`),
   or `./scripts/policy-lookup.sh POL-X.Y`. If the policy can't be found, do not cite from
   memory — look it up or say so.
5. **Repealed policies** may be cited only when explaining historical decisions, always
   flagged: `[POL-X.Y vN.N — REPEALED by AMD-YYYY-NNN]`.
6. **Multiple policies:** one CITATION line each, most authoritative first (the policy that
   alone would justify the decision).
