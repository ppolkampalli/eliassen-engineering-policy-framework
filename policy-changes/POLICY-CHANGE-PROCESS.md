# The Policy Change Process

**This is the ONLY way policies change.** A policy file edited outside this process is a
policy framework violation: the `policy-integrity` CI workflow fails any pull request that
modifies a `policies/` file without an accompanying policy change record, and the policy-clerk
skill refuses to make such edits.

Every change to the policy framework — creation, modification, or repeal of a policy — moves
through five stages:

---

## 1. PROPOSAL

Anyone — human engineer, role, or agent — may propose a policy change.

- Draft a record from [`POLICY-CHANGE-TEMPLATE.md`](POLICY-CHANGE-TEMPLATE.md) into
  `policy-changes/records/AMD-YYYY-NNN-<slug>.md` with status **PROPOSED**.
- IDs are sequential per year: `AMD-2026-001`, `AMD-2026-002`, …
- A proposal MUST include:
  - **Policies affected** (by ID),
  - **Exact text changes** — the current statement and the proposed statement,
    before/after, verbatim,
  - **Motivation** — the problem, incident, or learning that prompted it,
  - **Impact analysis** — which projects, roles, configs, and CI workflows are
    affected and what migration is required,
  - **Proposer** — name (and role, if agent-proposed).

## 2. REVIEW

- The **owner role(s)** of each affected policy must review and record a verdict in
  the policy change's Review Record table.
- Policy Changes touching **Policy Domain 5 (Security)** additionally require Security role
  review even when Security is not the owner.
- **Cross-cutting policy changes** (multiple policy domains, or impacts spanning cost +
  security + architecture) go to the **role-council** skill, which produces a
  consolidated, citation-backed review.
- Reviews cite policies: an objection states which policy or principle the proposal
  conflicts with and why.

## 3. DECISION

- **Approval authority:** VP Engineering / Tech Lead. The decision records the
  approver's **name** and **date** in the policy change record.
- **Approved** → status `APPROVED`, proceed to enactment.
- **Rejected** → status `REJECTED`, with the rejection rationale recorded. Rejected
  policy changes **stay in `records/` permanently** — rejections are part of the audit
  trail; a future proposer must be able to learn why an idea was declined.

## 4. ENACTMENT

On approval, **one commit** performs all of the following:

1. **(a)** The affected policy file(s) updated: new text, `version` bumped per the
   versioning rules below, and an `policy_change_history` entry added referencing the
   policy change ID.
2. **(b)** `policies/registry.json` and `policies/REGISTRY.md` updated to match.
3. **(c)** The policy change record's status set to **ENACTED**.
4. **(d)** A `CHANGELOG.md` entry added.
5. **(e)** Commit message format:
   `policy: amend POL-X.Y via AMD-YYYY-NNN — <summary>`

The `policy-integrity` workflow verifies (a)–(c) are consistent on every PR.

## 5. PROPAGATION

Consuming projects pull policy framework updates with `scripts/update.sh`, which — before
applying — prints a human-readable diff of every changed policy **with the policy change ID
and motivation** read from the policy change records. Auditability travels with the
update: a project always sees *why* a policy changed before accepting it.

Propagation also covers the **training app** (`user-training-onboarding/`): policy text
and versions auto-propagate (it renders the registries live), but narrative lesson
content affected by the policy change is reviewed and updated in the same pass — its
content-integrity test (`npm test`) fails on references to repealed or renumbered
policies.

---

## Versioning Rules

| Change type | Version bump | Example |
|---|---|---|
| Text clarification — wording only, meaning unchanged | **Patch** | 1.0 → 1.0.1 |
| Meaning change — scope, threshold, or obligation changes | **Minor** | 1.0 → 1.1 |
| Repeal-and-replace | **New policy ID**; old policy marked `REPEALED` | hypothetical: POL-X.Y → REPEALED, replacement ratified under the policy domain's next free ID |

**Repealed policies are never deleted.** They remain in the repository, marked
`REPEALED`, so historical decisions that cited them remain auditable. A repealed
policy's file gains a notice pointing to its replacement (if any) and the repealing
policy change.

## Status Lifecycle

```
PROPOSED ──review──▶ APPROVED ──enactment──▶ ENACTED
    │
    └──review──▶ REJECTED  (retained permanently with rationale)
```

## Invariants (enforced by policy-integrity CI and the policy-clerk skill)

1. Every policy's `policy_change_history` references only policy change records that exist.
2. Every ACTIVE policy's `version` matches `registry.json`.
3. Any diff touching `policies/` is accompanied by a policy change record referencing the
   changed policy's ID — otherwise the build fails.
4. A policy without an enacted policy change record does not exist.
