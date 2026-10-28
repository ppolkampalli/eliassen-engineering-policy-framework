# Rollout Guide — Adopting the Policy Framework in 12 Weeks

How an existing project or team adopts the Engineering Policy Framework. New projects
skip the phasing: run `install.sh` on day zero and start governed.

## The Building Blocks (what install.sh delivers)

| Block | Installed to | Policies it carries |
|---|---|---|
| CLAUDE.md | project root | Distilled rules, role instructions |
| ESLint/Prettier/tsconfig/Jest/lint-staged configs | project root | POL-2.1–2.6, 3.2, 4.3 |
| pre-commit hook | `.husky/` | POL-6.2 (local stage), 2.2 |
| quality.yml + security.yml | `.github/workflows/` | POL-6.2, 5.5, 3.2 |
| PR template | `.github/` | POL-7.3, 6.x checklist |
| All skills (roles + enforcement) | `.claude/skills/` | Whole policy framework, cited |
| Checklists + standards | `docs/` | Review practice |
| **Policy registry** (REGISTRY.md + registry.json) | `docs/policy-framework/` | Offline citability — every project can quote policies |

## Phase 1 — Foundation (Weeks 1–3)

**Goal: tooling installed, gates advisory.**

- Week 1: Run `scripts/install.sh <project>`; add devDependencies and scripts it
  prints; verify with `scripts/validate.sh <project>`. Hold the kickoff: the six
  founding pain points, the citation idea, where the registry lives.
- Week 2: CI workflows live but **not yet required checks** — teams see gate
  results without being blocked; fix the noisiest violations (formatting via one
  `prettier --write .` commit per POL-2.2; auto-fixable lint).
- Week 3: Type debt triage — count `any`s (POL-2.3) and strict-flag violations;
  ticket the burn-down (POL-1.2: each TODO gets a ticket).

**Exit criteria:** validate.sh PASS; lint/format/type baselines green or ticketed.

## Phase 2 — Quality Mechanics (Weeks 4–6)

**Goal: tests and review practices real.**

- Week 4: Coverage baseline measured; floors configured (POL-3.2) with a written
  ramp if legacy coverage is below floor (ramp plan is an policy-change-tracked
  exception, not a silent local edit — POL-1.3).
- Week 5: TDD working sessions (POL-3.1) using the tdd-assistant skill; review
  checklist adopted; two-approval + code-owners configured (POL-6.1).
- Week 6: **Gates become required checks** (POL-6.2). From here, no override path.

**Exit criteria:** gates required; new code arriving test-first; reviews citing policies.

## Phase 3 — Architecture & Security (Weeks 7–9)

**Goal: structural and security policies active.**

- Week 7: Architecture review against POL-4.1/4.3 (layering map, cycle scan);
  ADR practice starts — first ADR documents the current architecture (POL-4.5).
- Week 8: Security pass per Policy Domain 5 with the security-checker skill: input
  validation boundaries, query construction, secret scan (rotate anything found —
  POL-5.3), dependency audit (POL-5.5).
- Week 9: security.yml strict; compliance map drafted if regulated (POL-8.3).

**Exit criteria:** zero CRITICAL findings; cycle-free imports; ADR flow operating.

## Phase 4 — Full Governance (Weeks 10–12)

**Goal: roles, AI governance, ops policies — the whole policy framework.**

- Week 10: Role system live (docs/role-guide.md); AI governance practices:
  commit tagging, PR disclosure (POL-7.3), approved-tool list circulated (POL-7.2).
- Week 11: Ops policies — IaC inventory (POL-9.1), rollback docs for active services
  (POL-9.2), resource tagging + license scan (POL-9.3/9.4).
- Week 12: Retrospective → first policy change proposals from real friction (the
  process working as designed); rollout review with metrics against the six pain
  points.

**Exit criteria:** validate.sh PASS, all gates required, roles in use,
policy change pipeline receiving proposals.

## Optional: Watching Workflows Run

Any time after Phase 1, teams can add `agent-board/` — a small local Kanban
viewer (a Vite + React app with a tiny Node API) for governed workflow runs
(see `docs/agent-board.md`). It's a
convenience for developers and managers who want to see stage-by-stage
progress and human-checkpoint stops without reading raw logs; it is not a
gate and adds no new rollout phase or exit criteria.

## Staying Current

`scripts/update.sh <project>` pulls registry/config/skill updates and prints each
changed policy **with its policy change ID and motivation** before applying — adoption of
changes is informed, never silent (POLICY-CHANGE-PROCESS.md stage 5).

## Rollout Anti-Patterns

- **Big-bang gating** (week-1 required checks on a legacy repo) — breeds bypass
  pressure, which POL-6.2 exists to prevent; ramp as designed instead.
- **Local exceptions** to "make adoption easier" — POL-1.3's zero-exception rule
  is the point; exceptions go through policy changes or not at all.
- **Skipping the WHY** — teams follow policies they understand; the kickoff and the
  Rationale sections are load-bearing, not ceremony.
