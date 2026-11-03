# Engineering Policy Framework

**Eliassen Group — SDLC Quality Standards for JavaScript/TypeScript Teams**

Version 2.0.0 · Ratified 2026-06-01 ([AMD-2026-001](policy-changes/records/AMD-2026-001-initial-ratification.md)) · Amended 2026-06-11 ([AMD-2026-002…010](policy-changes/records/))

This repository is the single source of truth for Eliassen Group's software engineering quality standards for **JavaScript/TypeScript (Node.js + React)** teams of 20–50 distributed, AI-assisted engineers. Standards are codified as numbered, versioned, **citable Policies** that humans and AI agents alike can quote, apply, and audit.

---

## The Five Purposes

1. **Policy Framework as Policy** — Quality standards are numbered, versioned, citable Policies. Any skill, role, or developer in any project can quote a policy by ID (e.g., `POL-2.3`) and retrieve its full text and rationale.
2. **Roles for Agentic Coding** — 8 role skills that AI coding agents assume. Each role has a mandate, owns specific policies, has defined decision authority, and **must cite policies when making or justifying decisions**.
3. **Policy Change Audit Trail** — Policies change only through a formal policy change process. Every change records rationale, approver, and date, so any project can always answer: *"Why does this policy exist, and why did it change?"*
4. **Claude Skills** — Enforcement skills that apply the policies whenever Claude assists with development in any project.
5. **Rollout Tooling** — Install scripts that copy the building blocks (policies, roles, configs, hooks, CI workflows, CLAUDE.md, skills) into any target project in one command.

---

## Quickstart

There are two ways to adopt the policy framework, and they answer different needs.

### Option A — Install the Claude Code plugin (develop with the roles)

Use this when you want to **develop using the policy framework** — assume its roles,
run its enforcement skills, drive its workflows, and look up policies — from inside
Claude Code, with version management.

```text
# In Claude Code, point at this repo as a plugin marketplace, then install:
/plugin marketplace add ppolkampalli/eliassen-engineering-policy-framework
/plugin install engineering-policy-framework

# Or test locally without a marketplace:
claude --plugin-dir /path/to/eliassen-engineering-policy-framework
```

Once installed, invoke a role explicitly — `/engineering-policy-framework:role-security`
— or just say *"act as the Security role and review this"* and the matching skill
auto-activates by description. The full catalog: 8 roles, `role-council`,
`policy-clerk`, `workflow-orchestrator`, and the citation-aware enforcement skills.
See the [plugin install guide](docs/plugin-install.md).

### Option B — Install the full governance stack into a project (`install.sh`)

Use this when you want a **whole repo governed end-to-end** — the roles *plus*
the tooling configs, pre-commit hook, CI workflows, PR template, checklists, and the
offline policy registry copied into the target project.

```bash
git clone <this-repo> engineering-policy-framework
cd engineering-policy-framework
./scripts/install.sh /path/to/your-project
```

The installer copies CLAUDE.md and AGENTS.md, tooling configs, the pre-commit hook, CI workflows, the PR template, all Claude skills (including roles), checklists, and the policy registry (`docs/policy-framework/`) into your project, then prints the devDependencies and package.json scripts to add.

**Using Cursor instead of Claude Code?** `AGENTS.md` already works there natively — for the
roles, workflow orchestrator, and enforcement skills, pass `--ide cursor` (or `--ide both`
for a mixed-IDE team):

```bash
./scripts/install.sh /path/to/your-project --ide cursor
```

See the [Cursor install guide](docs/cursor-install.md).

### Validate an installation

```bash
./scripts/validate.sh /path/to/your-project
```

### Pull policy framework updates into a project

```bash
./scripts/update.sh /path/to/your-project
```

Prints a diff of changed policies **with the policy change ID and motivation for each change** before applying.

### Look up a policy

```bash
./scripts/policy-lookup.sh POL-2.3
```

```text
POL-2.3 (v1.0, ACTIVE) — Prohibition of the `any` Type
Policy Domain 2: Code Standards
Owners: software-engineer, quality
Statement: The `any` type is prohibited in all TypeScript code...
Rationale: `any` silently disables type checking...
Policy Changes: AMD-2026-001
File: policies/domain-2-code-standards/POL-2.3.md
```

---

## How to Cite a Policy

Every decision made under this policy framework is articulated as a citation:

```text
DECISION: Rejecting use of `any` type in payment-service.ts line 47.
CITATION: [POL-2.3 v1.0] "The `any` type is prohibited. Use `unknown`
with type narrowing."
RATIONALE (from policy record): `any` silently disables type checking,
defeating the purpose of TypeScript and allowing type errors to reach
production.
ROLE: Software Engineer (owner: Quality)
```

See [skills/policy-enforcer/reference/citation-format.md](skills/policy-enforcer/reference/citation-format.md) for the full and inline citation forms.

---

## Link Map

| Area | Where |
|---|---|
| The Policy Framework (preamble, governance, ratification) | [POLICY-FRAMEWORK.md](POLICY-FRAMEWORK.md) |
| All policies, human-readable index | [policies/REGISTRY.md](policies/REGISTRY.md) |
| All policies, machine-readable | [policies/registry.json](policies/registry.json) |
| Policy files by policy domain | [policies/](policies/) |
| Policy Change process & audit records | [policy changes/](policy changes/) |
| Role skills (8 + council + clerk) | [skills/](skills/) (the `role-*` directories) |
| Role usage guide | [docs/role-guide.md](docs/role-guide.md) |
| Enforcement skills | [skills/](skills/) |
| Tooling configs (policy-mapped) | [configs/](configs/) · [configs/CONFIG-POLICY-MAP.md](configs/CONFIG-POLICY-MAP.md) |
| CI workflows | [ci/github/](ci/github/) |
| Templates (PR, ADR, policy, commits) | [templates/](templates/) |
| Checklists | [checklists/](checklists/) |
| Standards / testing / rollout guides | [docs/](docs/) |
| Install / validate / update / lookup scripts | [scripts/](scripts/) |
| Central Memory Service (reference MCP server) | [memory-service/](memory-service/) |
| Project-level Claude instructions | [CLAUDE.md](CLAUDE.md) |

---

## The Ten Policy Domains

| Policy Domain | Domain | Policies |
|---|---|---|
| 1 | Foundational Principles | POL-1.1 – 1.5 |
| 2 | Code Standards | POL-2.1 – 2.6 |
| 3 | Testing & Quality | POL-3.1 – 3.6 |
| 4 | Architecture | POL-4.1 – 4.6 |
| 5 | Security | POL-5.1 – 5.6 |
| 6 | Review & Documentation | POL-6.1 – 6.5 |
| 7 | AI Governance | POL-7.1 – 7.6 |
| 8 | Requirements & Domain | POL-8.1 – 8.4 |
| 9 | Operations & Cost | POL-9.1 – 9.7 |
| 10 | Agentic Development | POL-10.1 – 10.6 |

**57 policies** total. Policies are amended — never silently edited — per the [Policy Change Process](policy-changes/POLICY-CHANGE-PROCESS.md).

**How work flows:** the [workflow catalog](workflows/README.md) (POL-10.6) defines
staged role chains for feature, research, bug, security-bug, refactor, and
policy change work — executable by agents, humans, or mixed teams, with recorded
deviations and inviolable hard gates.

---

## Governance

- Changes to policies go through the [Policy Change Process](policy-changes/POLICY-CHANGE-PROCESS.md). The `policy-integrity` CI workflow fails any PR that changes a policy without an accompanying policy change record.
- Repealed policies are never deleted; they remain citable for historical decisions.
- Quarterly policy framework review; first review **2026-09-01**.

## License

Internal use only — see [LICENSE](LICENSE).
