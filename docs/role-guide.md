# Role Guide — How Agents and Humans Use Roles

Roles are assumable roles defined as skills in `skills/` (the `role-*` directories). Each has
an identity and mandate, **owns specific policies**, holds bounded decision authority, and
**must cite policies in every decision**. They exist so AI agents working in any governed
project apply the policy framework the way the right specialist would — and so humans can
summon that specialist's review on demand.

---

## When Each Role Triggers

Roles activate automatically when work enters their domain, or explicitly on request.

| Role | Triggers when work involves… | Owned Policies |
|---|---|---|
| **security** | Auth, user input, persistence, secrets, dependencies, external APIs, agent sandboxing, any security question | 5.1–5.6, 10.3; co-enforces 7.2, 1.5 |
| **architect** | System design, module boundaries, patterns, ADRs, significant refactors, resilience | 4.1–4.6, 1.4; co-owns 7.6 |
| **quality** | Test strategy, coverage, mutation scores, review standards, agent verification, workflow deviations | 3.1–3.6, 6.1, 6.2, 10.2, 10.5, 10.6; co-owns 2.3, 7.6 |
| **software-engineer** | Implementation — the **default role** when nothing more specific applies | 2.1–2.6, 10.1, 10.4; executes 3.1 |
| **product-owner** | Requirements, scope, acceptance criteria, prioritization, SLO/budget sign-off, process | 8.1, 8.4, 10.6; co-owns 9.5, 9.6, 10.1 |
| **industry-sme** | Domain logic, business rules, industry regulation | 8.2, 8.3 |
| **devops** | CI/CD, pipelines, hooks, infra, deployment, environments, reliability | 9.1, 9.2, 9.5–9.7; co-owns 4.6, 10.3; enforces 6.2 |
| **finops** | Cloud cost, licensing, resource sizing, AI/compute budget | 9.3, 9.4 |

A change frequently triggers more than one role (an endpoint touching user input is
software-engineer + security work). Sequential single-role passes are fine for two
domains; three or more, or any conflict → **role-council**.

## Explicitly Invoking a Role

Humans summon a role by asking for it:

> "Act as the **Architect role** and review this module structure."
> "Put on the **Security** hat — does this webhook handler hold up?"
> "As **Product Owner**, is this PR in scope for JIRA-1888?"

The agent fully adopts the role's skill: its mandate, review lens, output format,
and authority limits. The role answers with citations, and refuses what it cannot
authorize (the Product Owner role, asked to waive a coverage floor, must decline —
that authority doesn't exist on its card).

## The Authority Ladder

When roles disagree, precedence is fixed — never re-negotiated per incident:

```
1. Security VETO        — CRITICAL findings; override only by a named human
                          security lead, recorded in the PR
2. Architect VETO       — layer violations, circular dependencies
3. Quality BLOCK        — coverage floors, hollow tests, gate integrity
4. Domain BLOCKs        — DevOps (no rollback), Product Owner (no acceptance
                          criteria), FinOps (untagged/unevaluated license)
5. ADVISE               — Industry SME, FinOps estimates, all advisory findings
```

FinOps is **explicitly subordinate to Security** (POL-9.3): cost never argues against
a CRITICAL/HIGH fix. Deadlines (Product Owner domain) never waive Policy Domains 3, 5, or 6
(POL-6.2). Every role escalates to humans on uncertainty per POL-7.5.

## How the Council Works

The **role-council** skill (`skills/role-council/SKILL.md`) handles
cross-cutting changes and conflicts: it identifies affected policy domains, assumes each
relevant role **sequentially** (no blended perspectives), produces one consolidated
report with each role's findings **verbatim with citations**, applies the ladder,
and escalates anything the ladder doesn't resolve. The council never averages away a
disagreement — losing positions stay in the record.

---

## Worked Examples

### Example 1 — Security role, CRITICAL finding (veto)

*Context: PR adds an export endpoint that builds SQL from a query parameter.*

```text
FINDING [CRITICAL]: SQL constructed by string interpolation from request
parameter `sortBy` at src/reports/export-controller.ts:38
CITATION: [POL-5.2 v1.0] "Queries are built exclusively with parameterized
statements; concatenating or interpolating any runtime value into query text
is prohibited."
RATIONALE: SQL injection begins with one engineer concatenating "just this
one" value; value provenance changes with every refactor. `sortBy` is
attacker-controlled here.
REQUIRED FIX: Allowlist `sortBy` against the sortable-column enum (POL-5.1),
pass values via placeholders; column names selected from a static map.
VERDICT: VETO — merge blocked. Override only by a named human security lead,
recorded in this PR.
ROLE: Security (owner: Policy Domain 5)
```

### Example 2 — Product Owner role, missing acceptance criteria (block)

*Context: Agent asked to "implement the export feature" from a one-line ticket.*

```text
DECISION [BLOCK]: Implementation of JIRA-1888 "Add export feature" may not begin.
CITATION: [POL-8.1 v1.0] "No implementation begins without written acceptance
criteria defining observable behaviors, in-scope edge cases, and verification."
RATIONALE: Undefined "done" is how the same feature gets built three times;
an agent given a one-line ticket will manufacture the missing requirements —
POL-7.5's exact failure mode.
REQUIRED ACTION: Product Owner to define: formats, roles authorized, volume
limits, sync/async behavior, verification. Draft AC attached for review.
ROLE: Product Owner (owner: POL-8.1)
```

### Example 3 — Architect role, advisory finding with ADR routing

*Context: PR introduces a Redis cache between application and persistence layers.*

```text
FINDING [BLOCKING]: New infrastructure component (Redis read cache) with no
ADR in docs/adr/ at PR #214
CITATION: [POL-4.5 v1.0] "Significant structural decisions are recorded as an
ADR in docs/adr/ before the implementing change merges."
RATIONALE: Undocumented architecture is rediscovered at the worst possible
time; decisions documented after the fact are justifications, not records.
REQUIRED FIX: ADR recording context (p95 latency SLO breach), options
considered (in-process LRU, Redis, CDN), decision, consequences (cache
invalidation strategy, new failure mode), policies considered (POL-4.1, POL-9.3 —
note: FinOps review also required, est. ~$180/mo).
FINDING [ADVISORY]: Cache client constructed inside OrderService (per
[POL-4.4 v1.0] — inject via DI as a CacheProvider abstraction).
ROLE: Architect (owner: Policy Domain 4)
```

---

## Practical Notes

- **Citations are mandatory** in role output — full DECISION/CITATION/RATIONALE/
  ROLE blocks for significant decisions, inline `(per [POL-X.Y vN])` for minor
  corrections. Format spec: `skills/policy-enforcer/reference/citation-format.md`.
- **Roles don't expand their own authority.** Decision powers are listed on each
  card; anything else is ADVISE or ESCALATE.
- **Uncertainty stops work** (POL-7.5). A role that cannot resolve a question from
  policies, ADRs, acceptance criteria, or documented rules asks a human — with options,
  not just the question.
- **Role reviews complement, never replace, human review** (POL-6.1's two human
  approvals stand regardless of how many roles reviewed).
