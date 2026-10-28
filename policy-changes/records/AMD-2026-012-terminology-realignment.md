---
id: AMD-2026-012
status: ENACTED (core repo, on branch amd-2026-012-terminology-realignment — see Enactment Note; not yet merged to main)          # PROPOSED | APPROVED | REJECTED | ENACTED
proposed_by: "Pramod Polkampalli"
proposed_date: "2026-10-28"
laws_affected: [ALL — id/path/schema rename only; no statement or rationale text changes to any individual law]
reviewers_required: [architect, devops, finops, industry-sme, product-owner, quality, security, software-engineer, law-clerk, workflow-orchestrator]
decision_by: ""
decision_date: ""
---

# AMD-2026-012: Terminology Realignment — Engineering Constitution → Engineering Policy Framework

## Motivation

Marketing and Strategic Leadership raised that "engineering constitution" and
"laws" are off current market language for the AI-Enabled SDLC sales deck.
Independent research (deep-research pass, 2026-10-28) verified the sources
behind that recommendation: 2 of 6 cited sources genuinely support "policy"
as current agent-governance vocabulary (Kaptein et al., arXiv:2603.16586;
Kyndryl's Feb 2026 policy-as-code launch); the others either cut against the
recommendation (AgentBound, arXiv:2606.30970, *elevates* "constitution" as a
specific enforceable runtime artifact rather than retiring it) or are
off-topic (NHIMG/EIC-2026). Full findings retained in session record, not
duplicated here.

Decision taken: adopt the rename anyway, and apply it to the internal
framework assets (not just sales collateral), because:
- We are still in the development phase of this product — the lowest-cost
  point to make a structural naming change is before external parties are
  depending on the current IDs.
- A single consistent vocabulary (deck, docs, code, CI) avoids the
  mixed-terminology confusion risk identified in that research pass.
- No backward-compatibility shims are needed at this stage of SDLC — this is
  a clean cutover, not a dual-running migration.

**Explicitly excluded from this amendment:** the executed FOX SOW (signed
2026-10-20), which uses "engineering constitution" and "articles and laws."
That wording is addressed later via the separate Change Order Process and is
out of scope here.

**Historical record is not rewritten.** AMD-2026-001 through AMD-2026-011
and all existing CHANGELOG.md entries remain exactly as written — they
correctly describe what was true when ratified under the prior terminology.
Only live, forward-facing assets are renamed. This record is the mapping
from old identifiers to new ones.

## Changes

This is a structural/vocabulary amendment, not a per-law statement change —
no individual law's Statement or Rationale text changes. Deviating from the
template's per-law before/after format for that reason; the change is
instead a framework-wide id/path/schema rename, enumerated below.

### Term mapping

| Current | New |
|---|---|
| Engineering constitution | Engineering Policy Framework |
| Law (`LAW-X.Y`) | Policy (`POL-X.Y`) |
| Article | Policy Domain |
| Persona | Agent Role |
| Amendment | Policy Change |
| Enforcement | Runtime Policy Enforcement / policy-as-code |

### Asset mapping

| Current path/id | New path/id |
|---|---|
| `laws/` | `policies/` |
| `laws/article-N-slug/` | `policies/domain-N-slug/` |
| `LAW-X.Y` (id, filenames, citations) | `POL-X.Y` |
| `laws/REGISTRY.md`, `laws/registry.json` | `policies/REGISTRY.md`, `policies/registry.json` |
| registry field `constitution_version` | `policy_framework_version` |
| registry field `laws[]` | `policies[]` |
| registry field `article` (per entry) | `policy_domain` |
| `CONSTITUTION.md` | `POLICY-FRAMEWORK.md` |
| `amendments/` | `policy-changes/` |
| `amendments/AMENDMENT-PROCESS.md` | `policy-changes/POLICY-CHANGE-PROCESS.md` |
| `amendments/AMENDMENT-TEMPLATE.md` | `policy-changes/POLICY-CHANGE-TEMPLATE.md` |
| Future amendment record ids `AMD-YYYY-NNN` | `PCH-YYYY-NNN` (AMD-2026-001..012 keep their ids permanently) |
| `workflows/WF-AMENDMENT.md` (id `WF-AMENDMENT`) | `workflows/WF-POLICY-CHANGE.md` (id `WF-POLICY-CHANGE`) — renamed **last**, as the final act of its own enactment |
| `scripts/law-lookup.sh` | `scripts/policy-lookup.sh` (normalizes to `POL-` prefix) |
| `ci/github/law-integrity.yml` | `ci/github/policy-integrity.yml` |
| `skills/constitution-enforcer` | `skills/policy-enforcer` |
| `skills/law-clerk` | `skills/policy-clerk` |
| `skills/persona-council` | `skills/role-council` |
| `skills/persona-architect` | `skills/role-architect` |
| `skills/persona-devops` | `skills/role-devops` |
| `skills/persona-finops` | `skills/role-finops` |
| `skills/persona-industry-sme` | `skills/role-industry-sme` |
| `skills/persona-product-owner` | `skills/role-product-owner` |
| `skills/persona-quality` | `skills/role-quality` |
| `skills/persona-security` | `skills/role-security` |
| `skills/persona-software-engineer` | `skills/role-software-engineer` |

### Open point carried into review

Framework version bump: recommending `1.2.0` → `2.0.0` (every citable id
changes prefix — treating this as a breaking change to the citable surface,
not a patch). Pending confirmation at the decision stage.

## Impact Analysis

- **Blast radius** (grep count, this repo, pre-rename): `LAW-` in 222 files,
  `persona` in 212, `constitution` in 136, `amendment` in 127, `AMD-` in 89.
- **Downstream propagation targets**: `agent-board/` (79 files — includes
  TypeScript types/enums and tests keyed on persona names and LAW ids; needs
  real refactor + test updates, not search-and-replace, per LAW-3.1/POL-3.1
  never-weaken-a-test rule), `user-training-onboarding/` (76 files, including
  a content-integrity test that checks for stale law references),
  `memory-service/` (15 files), `crm-demo/` (12 files).
- **Tooling/CI**: `ci/github/law-integrity.yml` must be rewritten in the same
  enactment pass as the registry rename — it enforces registry/file
  consistency and would otherwise fail immediately post-rename.
- **Self-reference**: this workflow (currently `WF-AMENDMENT`) is itself
  renamed by this amendment. It is used in its *current* name/form to process
  this amendment; `WF-POLICY-CHANGE.md` is the last file touched in
  enactment. Recorded here as a deviation per the project's rule that
  deviations get logged, not silently taken.
- **Enactment is not a single git commit** (template's normal case), given
  the file count: proposed as one PR, ordered commits, **revised per review
  conditions 1-8**:
  (1) `policies/` tree + registry schema (`laws[]`→`policies[]`,
  `constitution_version`→`policy_framework_version`, `article`→
  `policy_domain`, `owner_personas`→`owner_roles`) **+**
  `ci/github/policy-integrity.yml` rewritten in the *same* commit (Architect
  + DevOps condition: prevents hard-crash on `laws/registry.json`/
  `amendments/records` between commits) — the rewritten check tolerates the
  `amendments/`→`policy-changes/` path move landing in commit 3, not before,
  without throwing (Law-clerk condition),
  (2) `POLICY-FRAMEWORK.md` + root docs + new ADR (ADR-0001 not rewritten),
  (3) `policy-changes/` tree,
  (4) `scripts/` — `policy-lookup.sh`, **and** `install.sh`, `update.sh`,
  `validate.sh` (DevOps condition: previously missing from the asset table;
  `update.sh`'s old→new schema transition handling for in-flight consumers
  is deferred to stage 5 since no consumer syncs until then),
  (5) `ci/github/security.yml` comment updates + confirm
  `skills/security-checker`'s link to `constitution-enforcer`/`policy-enforcer`
  updates in the same pass (Security condition),
  (6) `skills/role-*`, `policy-clerk`, `policy-enforcer` + content updates in
  the remaining skills that reference personas/laws,
  (7) root `CLAUDE.md`, `Instruction-prompts/`,
  (8) `workflows/registry.json` + `WF-{BUG,FEATURE,REFACTOR,RESEARCH,SECBUG}.md`
  (Architect + Workflow-orchestrator condition: previously missing from
  scope despite `LAW-`/`persona-council` references throughout),
  (9) `workflows/WF-AMENDMENT.md` → `WF-POLICY-CHANGE.md` (last).
- **Stage 5 (propagation) scope, explicit per WF-AMENDMENT's own design**
  ("Projects updated... supporting docs/configs/personas propagated in
  follow-up commits," stage 5 marked `hard: false`): `agent-board/` (79
  files — confirmed by Software Engineer review to require real type/
  validator/fixture-data migration, not search-and-replace, ~0.5-1 day),
  `user-training-onboarding/` (76 files — confirmed by Quality review to
  include 11+ spec files with hardcoded literal assertions, not "a
  content-integrity test" as originally stated), `memory-service/` (15
  files), `crm-demo/` (12 files). These are tracked as follow-up work,
  not blocking stage-4 enactment of the core framework, per the workflow's
  own non-hard designation for this stage.
- **FOX SOW**: explicitly out of scope (see Motivation).

## Review Record

| Persona/Role | Reviewer | Verdict | Date | Notes |
|---|---|---|---|---|
| architect | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | CI rewrite (batch 5) must move to batch 1 — `law-integrity.yml` hardcodes `laws/registry.json` and `amendments/records` with no error handling, hard-crashes between batches 1–5 as proposed. `workflows/WF-{FEATURE,BUG,REFACTOR,RESEARCH,SECBUG}.md`, `workflows/README.md`, `workflows/registry.json` all contain `persona:`/`LAW-` literals and are in no batch. `owner_personas` registry field is undecided (not in the 3-field rename table). |
| devops | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | Independently confirms the same CI sequencing bug. `scripts/update.sh`, `install.sh`, `validate.sh` are not in the asset table (only `law-lookup.sh` is); `update.sh` reads `sreg.laws`/`treg.constitution_version` directly and will throw for every downstream consumer on next sync once schema flips — needs old→new schema transition handling, not just a rename. Push all 8 commits as one atomic event or move the CI rename to immediately after batch 1. |
| finops | fresh-context subagent | APPROVE WITH CONDITIONS (blocking) | 2026-10-28 | No engineering-hours cost estimate for a cost-material change (LAW-9.3). No costed comparison against the cheaper alternative (deck-only glossary), which would capture the same buyer-facing benefit without touching agent-board/CI/3 other repos. Given only 2/6 sources hold up, full internal cutover needs that comparison before sign-off. |
| industry-sme | fresh-context subagent | **REJECT** (as proposed) | 2026-10-28 | "Policy" has load-bearing, audited meaning in compliance/GRC contexts (ISO 27001 Information Security Policy, HIPAA Policies and Procedures, SOC 2 policy artifacts, PCI-DSS) that an internal engineering standard renamed to `POL-X.Y` risks colliding with in client SOWs/audits. Conditions if resubmitted: drop the rename, limit to sales-deck/marketing collateral only, or add explicit Policy-vs-policy disambiguation reviewed by Security/Legal (LAW-7.5). |
| product-owner | fresh-context subagent | APPROVE WITH CONDITIONS (blocking) | 2026-10-28 | Original ask was narrow (sales-deck vocabulary); amendment extends it into a 400+ file internal rename on weak (2/6) research support — a scope expansion needing recorded sign-off per LAW-8.4. No acceptance criteria section. No permanent old-id↔new-id crosswalk for future FOX SOW/external-citation continuity. Requires explicit Strategic Leadership sign-off that the ask was authorized to extend past the deck. |
| quality | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | Propagation plan understates `user-training-onboarding`: record names "a content-integrity test," but grep found 11+ spec files with hardcoded `LAW-`/`persona-` literal assertions (registry.spec.ts, quiz-view.spec.tsx, marketing-content.spec.ts, etc.) that must be rewritten in lockstep, never weakened (LAW-3.1/3.5). Requires enumerated checklist of actual downstream test files plus CI + mutation-score non-regression evidence, fresh-context reviewed (LAW-10.5), before sign-off. |
| security | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | No real enforcement path silently disabled — `security.yml`'s gates aren't string-parsed. But its `LAW-5.x`/`article` comments go stale if not updated in the same pass, and `skills/security-checker`'s relative link to `constitution-enforcer` breaks unless covered by the batch-6 catch-all. Wants the renamed `policy-integrity.yml` demonstrated passing against the final tree as evidence (LAW-10.2), not asserted. |
| software-engineer | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | `agent-board`'s rename is a data migration, not a schema rename — fixture data literally stores values like `"persona-software-engineer"` (fixtures/events.sample.jsonl), and `persona`/`lawCitations` are baked into `types.ts` and validated in `board-model.ts`. None of the 8 batches actually land agent-board (or the other 3 repos) atomically with the producer-side rename, so the producer/consumer contract diverges mid-enactment. Est. 0.5–1 day. Requires an explicit batch for agent-board (and the other repos, or a documented deferral decision) with fixture/data values in scope, test-first. |
| law-clerk | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | Record is procedurally complete per AMENDMENT-PROCESS.md §1; the per-law-format deviation is clearly flagged, not an oversight; check-4 of `law-integrity.yml` is a non-issue since this PR touches no `laws/article-*/LAW-*.md` file. Requires routing through persona-council for consolidated review per §2 (cross-cutting), and requires the future `policy-integrity.yml` to handle the `amendments/records`→`policy-changes/records` path move without an uncaught `fs.readdirSync` throw. |
| workflow-orchestrator | fresh-context subagent | APPROVE WITH CONDITIONS | 2026-10-28 | Self-referential bootstrap sequencing (WF-AMENDMENT processes this amendment under its current name, renames itself last as commit 8 of 8) is sound — doesn't skip or reorder stages 1–4. Independently confirms the same workflow-files gap found by Architect: `workflows/registry.json` and the 5 sibling workflow files are outside the record's scope despite being squarely in the stated blast radius. Blocking until added. |

## Review Synthesis (persona-council routing, per law-clerk condition)

Convergent, execution-level gaps (independently found by 2+ reviewers — treat as confirmed, not disputed):
1. CI rewrite must move to batch 1 (Architect + DevOps).
2. `workflows/registry.json` + 5 sibling workflow files missing from scope (Architect + Workflow-orchestrator).

Additional single-reviewer execution gaps, all plausible and uncontested:
3. `scripts/{update,install,validate}.sh` missing from asset table; `update.sh` needs old→new schema transition handling for in-flight consumers (DevOps).
4. `agent-board` fixture/type/validator work is a data migration, not covered by any batch (Software Engineer).
5. `user-training-onboarding` test exposure understated — 11+ files, not 1 (Quality).
6. `security.yml` comments + `security-checker`'s dead link if not updated same-pass (Security).
7. `amendments/records` path relocation must not crash the rewritten CI check (Law-clerk).
8. `owner_personas` registry field rename undecided (Architect).

Fundamental objections, not mechanics — require a human call, not an engineering fix:
9. **Industry SME REJECT**: regulatory/compliance collision risk in reusing "Policy" for an internal engineering standard.
10. **FinOps blocking**: no cost estimate; cheaper glossary-only alternative never costed or explicitly ruled out.
11. **Product Owner blocking**: scope expansion beyond the original sales-deck ask was never explicitly authorized; no acceptance criteria; no permanent id crosswalk.

Per WF-AMENDMENT's escalation rule ("disagreement between reviewing personas → persona-council; council deadlock → the human decision stage settles it — it always does"): items 9–11 are recorded as council disagreement, unresolved by this review pass. Stage 3 is the authority on whether they're addressed-and-proceed, addressed-and-narrowed, or disqualifying.

## Decision

Approved by: Pramod Polkampalli
Date: 2026-10-28
Rationale: Risk accepted on all three fundamental objections, given this
framework has no external clients on current IDs yet (pre-production):
(9) Industry SME's regulatory-collision risk ("Policy" vs. audited
compliance artifacts) — accepted; no disambiguation note or Legal review
required at this stage, revisit if/when client-facing use of POL- ids
begins. (10) FinOps's cost-estimate/alternative-comparison condition —
accepted without a formal costed comparison; full internal rename proceeds
because the dev-phase cutover cost is judged lower now than later. (11)
Product Owner's scope-authorization condition — accepted; this decision
record is the explicit authorization that the original sales-deck ask
extends to the full internal framework. Framework version bump: 1.2.0 →
2.0.0 confirmed (every citable id changes prefix).

Convergent execution-level conditions from review (items 1-8) are not waived
— they are incorporated into the revised enactment plan below.

## Enactment Note (2026-10-28)

All 9 enactment batches completed on branch `amd-2026-012-terminology-realignment`
(4 commits: `bfc4683` registry/CI, `63f942d` this record, `b29c6a1`+`89a8e00`
remaining asset renames + content, `e778e1c` WF-AMENDMENT.md self-rename last).

All 8 review conditions (items 1-8) were incorporated, not just acknowledged:
CI rewrite landed in the same commit as the registry rename; `workflows/registry.json`
and all 5 sibling workflow files updated; `scripts/install.sh`/`update.sh`/`validate.sh`
brought into scope; `owner_personas` → `owner_roles`; `security.yml` + the
`security-checker` → `policy-enforcer` link updated; `amendments/records` →
`policy-changes/records` path move handled without a crash in `policy-integrity.yml`.

Evidence, not assertion (POL-10.2): `install.sh` + `validate.sh` + `update.sh`
run end-to-end against a scratch target (25/25 checks pass, including registry
version match at 2.0.0); `policy-integrity.yml`'s embedded check re-run directly
against the tree (57/57 policies consistent); all 4 shell scripts syntax-checked;
`policy-lookup.sh` exercised against the live registry by id and shorthand form.

Stage 5 (propagation to `agent-board/`, `crm-demo/`, `memory-service/`,
`user-training-onboarding/`) is explicitly deferred — tracked as follow-up,
not done here, per WF-AMENDMENT's own non-hard designation for that stage.

## Propagation Update (2026-10-28): user-training-onboarding

`user-training-onboarding/` propagated (commit `f8403c0`). This app was
**broken** before this pass: `src/domain/registry.ts` imported
`../../../laws/registry.json`, which stopped existing once stage 4 landed.
Renamed `law-browser.tsx`/`.spec.tsx`→`policy-browser.*`, `law-link.tsx`→
`policy-link.tsx`, `personas-content.ts`→`roles-content.ts`,
`pages/laws.tsx`→`pages/policies.tsx` (route `/laws`→`/policies`),
`pages/personas.tsx`→`pages/roles.tsx` (route `/personas`→`/roles`).
Deliberately left untouched: the unrelated thought-leadership "Articles"
feature (`articles-content.ts`, `article-view.tsx`, `pages/articles.tsx`,
the `/articles` route) and generic `<article>` HTML elements elsewhere —
confirmed neither refers to the former "Article" (policy domain) concept,
a real risk of a blind sweep on this codebase specifically.

Also caught and fixed: `.law-*`/`.persona-*`/`.fig-persona-*` CSS classes
in `styles.css` had silently drifted out of sync with renamed JSX
`className`s — an untested visual regression a content sweep alone would
have shipped. Verified by cross-checking built CSS/JS class names, not
just by eye.

Verified: `tsc --noEmit` clean, 90/90 tests pass (including the
content-integrity and marketing-content consistency gates — exactly the
mechanism Quality's review said would catch exactly this), eslint 0
errors (pre-existing warning count confirmed unchanged against main),
`npm run build` succeeds.

`agent-board/`, `crm-demo/`, `memory-service/` remain deferred.

**Not yet merged to main.** This branch has not been pushed or merged;
that is a separate, explicit decision for the repo owner.

Status: APPROVED → proceeding to enactment.
