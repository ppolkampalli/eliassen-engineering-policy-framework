# CLAUDE CODE REQUIREMENTS PROMPT
## Build the Engineering Policy Framework Repository — Policies, Roles, and Policy Change Audit Trail

> **How to use this document:** Paste this entire prompt into Claude Code from an empty directory. Claude Code will scaffold a complete, rollout-ready git repository containing our Engineering Policy Framework structured as citable Policies, 8 assumable Roles for agentic coding, a full policy change/audit system, Claude skills, configuration building blocks, and install tooling.

---

## MISSION

You are building a git repository named **`engineering-policy-framework`**. This repo is the single source of truth for our organization's SDLC quality standards for **JavaScript/TypeScript (Node.js + React)** teams of 20–50 distributed, AI-assisted engineers.

The repo serves five purposes:

1. **Policy Framework as Policy** — Quality standards are codified as numbered, versioned, **citable Policies**. Any skill, role, or developer in any project can quote a policy by ID (e.g., `POL-2.3`) and retrieve its full text and rationale.
2. **Roles for Agentic Coding** — 8 role skills that AI coding agents can assume. Each role has a mandate, owns specific policies, has defined decision authority, and **must cite policies when making or justifying decisions**.
3. **Policy Change Audit Trail** — Policies can only be created, edited, or repealed through a formal policy change process. Every change is recorded with rationale, approver, and date, so consuming projects can always answer: *"Why does this policy exist, and why did it change?"*
4. **Claude Skills** — Enforcement skills that apply the policies whenever Claude assists with development in any project.
5. **Rollout Tooling** — Install scripts that copy the building blocks (policies, roles, configs, hooks, CI workflows, CLAUDE.md, skills) into any target project repo in one command.

Work through the deliverables in order. Initialize git, commit logically per section, and finish by running the acceptance checklist at the bottom.

---

## CORE DESIGN REQUIREMENT: CITABILITY

This is the most important requirement in this prompt. **Everything must be quotable.**

When this policy framework is referenced from another project — by a human, by Claude, or by an agentic role — decisions must be articulated as citations:

```
DECISION: Rejecting use of `any` type in payment-service.ts line 47.
CITATION: [POL-2.3 v1.0] "The `any` type is prohibited. Use `unknown`
with type narrowing."
RATIONALE (from policy record): `any` silently disables type checking,
defeating the purpose of TypeScript and allowing type errors to reach
production.
ROLE: Software Engineer (owner: Quality)
```

Every skill and role you build must produce decisions in this citation format. The policy registry must make lookup trivial for both humans (markdown) and agents (JSON).

---

## DELIVERABLE 1: REPOSITORY STRUCTURE

Create exactly this structure:

```
engineering-policy-framework/
├── README.md
├── POLICY-FRAMEWORK.md                    # Preamble, policy domains overview, governance, ratification
├── CLAUDE.md                          # Distilled rules for Claude Code (installed into every project)
├── CHANGELOG.md
├── LICENSE
│
├── policies/
│   ├── REGISTRY.md                    # Human-readable index of all policies (table: ID, title, status, version, owner)
│   ├── registry.json                  # Machine-readable policy registry for agents
│   ├── domain-1-foundational-principles/
│   │   ├── POL-1.1.md ... POL-1.5.md
│   ├── domain-2-code-standards/
│   │   ├── POL-2.1.md ... POL-2.6.md
│   ├── domain-3-testing-quality/
│   │   ├── POL-3.1.md ... POL-3.5.md
│   ├── domain-4-architecture/
│   │   ├── POL-4.1.md ... POL-4.5.md
│   ├── domain-5-security/
│   │   ├── POL-5.1.md ... POL-5.6.md
│   ├── domain-6-review-documentation/
│   │   ├── POL-6.1.md ... POL-6.5.md
│   ├── domain-7-ai-governance/
│   │   ├── POL-7.1.md ... POL-7.5.md
│   ├── domain-8-requirements-domain/
│   │   ├── POL-8.1.md ... POL-8.4.md
│   └── domain-9-operations-cost/
│       ├── POL-9.1.md ... POL-9.4.md
│
├── policy changes/
│   ├── POLICY-CHANGE-PROCESS.md           # The formal process for changing policies
│   ├── POLICY-CHANGE-TEMPLATE.md
│   └── records/
│       └── AMD-2026-001-initial-ratification.md
│
├── .claude/
│   └── skills/
│       ├── roles/
│       │   ├── industry-sme/SKILL.md
│       │   ├── product-owner/SKILL.md
│       │   ├── quality/SKILL.md
│       │   ├── architect/SKILL.md
│       │   ├── software-engineer/SKILL.md
│       │   ├── devops/SKILL.md
│       │   ├── security/SKILL.md
│       │   └── finops/SKILL.md
│       ├── policy-enforcer/
│       │   ├── SKILL.md
│       │   └── reference/
│       │       ├── citation-format.md
│       │       └── violation-severity.md
│       ├── policy-clerk/
│       │   └── SKILL.md               # Manages policy changes and audit trail
│       ├── role-council/
│       │   └── SKILL.md               # Orchestrates multi-role review
│       ├── tdd-assistant/SKILL.md
│       ├── code-review-assistant/SKILL.md
│       ├── security-checker/SKILL.md
│       ├── documentation-generator/SKILL.md
│       └── ai-transparency/SKILL.md
│
├── configs/
│   ├── .eslintrc.json
│   ├── .prettierrc.json
│   ├── tsconfig.base.json
│   ├── jest.config.js
│   └── lint-staged.config.js
│
├── hooks/
│   └── pre-commit
│
├── ci/
│   └── github/
│       ├── quality.yml
│       ├── security.yml
│       └── policy-integrity.yml          # Validates registry consistency on every PR to this repo
│
├── templates/
│   ├── pull_request_template.md
│   ├── adr-template.md
│   ├── policy-template.md
│   ├── commit-message-guide.md
│   └── new-project-readme.md
│
├── checklists/
│   ├── code-review-checklist.md
│   └── pre-commit-checklist.md
│
├── docs/
│   ├── standards.md
│   ├── testing-guide.md
│   ├── rollout-guide.md
│   ├── role-guide.md               # How and when agents assume roles
│   └── adr/
│       └── 0001-adopt-engineering-policy-framework.md
│
└── scripts/
    ├── install.sh
    ├── validate.sh
    ├── update.sh
    └── policy-lookup.sh                  # CLI: ./policy-lookup.sh POL-2.3 → prints policy text + rationale
```

---

## DELIVERABLE 2: THE LAW SYSTEM

### 2.1 Policy Record Format

Every policy is one markdown file with YAML frontmatter. Create `templates/policy-template.md` and use this exact format for all policies:

```markdown
---
id: POL-2.3
title: Prohibition of the `any` Type
policy domain: 2
article_name: Code Standards
status: ACTIVE            # ACTIVE | AMENDED | REPEALED | PROPOSED
version: 1.0
effective_date: 2026-06-01
owner_personas: [software-engineer, quality]
enforcement: automated    # automated | review | role | manual
enforcement_mechanism: "ESLint rule @typescript-eslint/no-explicit-any: error"
policy_change_history:
  - policy change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
---

# POL-2.3: Prohibition of the `any` Type

## Statement (quotable)

> The `any` type is prohibited in all TypeScript code. When a type is
> genuinely unknown, use `unknown` and narrow it with type guards before
> use. Exceptions require an inline justification comment and approval
> from the Quality role owner during code review.

## Rationale (the WHY — always citable alongside the statement)

`any` silently disables TypeScript's type checking for that value and
everything it touches, defeating the purpose of strict mode and allowing
type errors to reach production. `unknown` provides the same flexibility
while forcing explicit, safe narrowing. This policy exists because type-related
production bugs were one of the six founding pain points of this policy framework.

## Compliance Examples

VIOLATION:
\`\`\`typescript
function process(data: any) { return data.value; }
\`\`\`

COMPLIANT:
\`\`\`typescript
function process(data: unknown): string {
  if (isPayload(data)) return data.value;
  throw new ValidationError('Unexpected payload shape');
}
\`\`\`

## Related Policies
- POL-2.4 (Explicit return types)
- POL-1.2 (Quality is built-in)

## Citation Format
[POL-2.3 v1.0] "The `any` type is prohibited. Use `unknown` with type narrowing."
```

### 2.2 The Policy Catalog (write every policy in full using the template)

**Policy Domain 1 — Foundational Principles** *(the 5 core principles, codified)*
- POL-1.1 Code is Written for Humans First (30-second readability; comments explain WHY not WHAT)
- POL-1.2 Quality is Built-In, Never Added Later (no deferred quality; no TODO without ticket+context)
- POL-1.3 Consistency Enables Collaboration (identical tooling/conventions; zero project exceptions)
- POL-1.4 Architecture Decisions Are Intentional (deliberate design; ADR required for significant decisions)
- POL-1.5 Security is Everybody's Responsibility (security defects block merge regardless of author or deadline)

**Policy Domain 2 — Code Standards** *(owners: software-engineer, quality)*
- POL-2.1 Naming Conventions (full table: camelCase variables/functions, PascalCase types/classes — no `I` prefix, UPPER_SNAKE_CASE constants, is/has/can booleans, kebab-case files/dirs)
- POL-2.2 Formatting via Prettier (2-space, 100-char, single quotes, semicolons, ES5 trailing commas; never manual)
- POL-2.3 Prohibition of the `any` Type (as above)
- POL-2.4 Explicit Return Types on exported functions
- POL-2.5 Import Ordering (stdlib → third-party → local, alphabetical, enforced by ESLint)
- POL-2.6 Function Size and Responsibility (≤30 lines, target 10–15, one responsibility; no magic numbers — named constants)

**Policy Domain 3 — Testing & Quality** *(owners: quality, software-engineer)*
- POL-3.1 Test-First Development (failing test shown before implementation; red-green-refactor)
- POL-3.2 Coverage Floors (80% business logic, 100% utilities, 70% controllers; CI-enforced)
- POL-3.3 Test Structure (Arrange-Act-Assert; names state "should <expectation> when <scenario>")
- POL-3.4 Test Isolation (mock external dependencies; unit tests <1s; no inter-test dependence)
- POL-3.5 No Skipped or Hollow Tests (no .skip without ticket; assertions must verify behavior)

**Policy Domain 4 — Architecture** *(owners: architect)*
- POL-4.1 Layered Architecture (Presentation → Application → Domain → Persistence; dependencies point downward only)
- POL-4.2 SOLID Compliance (each principle with its one-line test)
- POL-4.3 No Circular Dependencies (ESLint import/no-cycle: error)
- POL-4.4 Sanctioned Patterns (DI, Repository, Factory, Strategy — when each is required)
- POL-4.5 ADR Requirement (any significant structural decision recorded in docs/adr/ before merge)

**Policy Domain 5 — Security** *(owners: security; security role holds VETO on CRITICAL findings)*
- POL-5.1 Universal Input Validation (allowlist over blocklist; all external data)
- POL-5.2 Parameterized Queries Only (no string concatenation into queries)
- POL-5.3 Secrets Never in Code (env/secret manager only; never in logs)
- POL-5.4 Established Auth Frameworks Only (OAuth2/JWT/SAML; never roll your own crypto)
- POL-5.5 Dependency Hygiene (weekly scans; criticals patched ≤24h; lockfiles pinned)
- POL-5.6 Encryption Standards (TLS 1.2+ in transit; at-rest for sensitive data)

**Policy Domain 6 — Review & Documentation** *(owners: quality, architect)*
- POL-6.1 Two-Approval Review (2 approvals, 1 domain expert; no self-approval)
- POL-6.2 Quality Gates Are Inviolable (lint, type-check, tests, coverage, security scan — all green before merge; no override path)
- POL-6.3 Public API Documentation (JSDoc with params/returns/throws/example on all public functions)
- POL-6.4 Comments Explain WHY (business rules, trade-offs, constraints — never restating code)
- POL-6.5 Docs Travel With Code (README/API docs updated in the same PR as the change)

**Policy Domain 7 — AI Governance** *(owners: all roles; security + quality co-enforce)*
- POL-7.1 Human Accountability (developers own all AI-generated code; AI assists, humans approve)
- POL-7.2 IP and Data Protection (no PII, secrets, payment data, or proprietary algorithms to unapproved AI tools)
- POL-7.3 AI Audit Trail (`[Claude-assisted]` commit tag; AI role documented in PR)
- POL-7.4 Identical Standards for AI Code (no relaxed review for AI output; verify, never assume)
- POL-7.5 Mandatory Escalation on Uncertainty (agents must stop and ask on ambiguous requirements, architecture, or security — never guess)

**Policy Domain 8 — Requirements & Domain** *(owners: product-owner, industry-sme)*
- POL-8.1 Acceptance Criteria Before Implementation (no coding against undefined "done")
- POL-8.2 Business Rules Are Documented and Cited (domain logic in code links to its documented rule)
- POL-8.3 Regulatory Mapping (industry compliance requirements — e.g., PCI, GDPR — mapped to the code that satisfies them)
- POL-8.4 Scope Discipline (changes outside agreed scope require Product Owner role sign-off)

**Policy Domain 9 — Operations & Cost** *(owners: devops, finops)*
- POL-9.1 Infrastructure as Code (all infrastructure versioned; no console-clicked resources)
- POL-9.2 Deployment Safety (every deploy reversible; rollback documented before release)
- POL-9.3 Cost Impact Assessment (infra/dependency changes with material cost impact require FinOps role review; cloud resources tagged for attribution)
- POL-9.4 License Compliance (dependency licenses evaluated before adoption; copyleft flagged)

### 2.3 The Registry

**`policies/REGISTRY.md`** — a single table of every policy: ID | Title | Policy Domain | Status | Version | Owner Roles | Enforcement. This is the human lookup page.

**`policies/registry.json`** — machine-readable mirror. Schema:

```json
{
  "policy_framework_version": "1.0.0",
  "ratified": "2026-06-01",
  "policies": [
    {
      "id": "POL-2.3",
      "title": "Prohibition of the any Type",
      "policy domain": 2,
      "status": "ACTIVE",
      "version": "1.0",
      "owner_personas": ["software-engineer", "quality"],
      "enforcement": "automated",
      "statement": "The any type is prohibited in all TypeScript code...",
      "rationale_summary": "any silently disables type checking...",
      "file": "policies/domain-2-code-standards/POL-2.3.md",
      "policy changes": ["AMD-2026-001"]
    }
  ]
}
```

Agents and the `policy-lookup.sh` script consume this file. **The registry and the policy files must never diverge** — the `policy-integrity.yml` CI workflow enforces this.

---

## DELIVERABLE 3: THE POLICY CHANGE & AUDIT SYSTEM

### 3.1 `policy-changes/POLICY-CHANGE-PROCESS.md`

Document this exact process — it is the ONLY way policies change:

1. **PROPOSAL** — Anyone (human or role) drafts a policy change record from `POLICY-CHANGE-TEMPLATE.md` in `policy-changes/records/` with status PROPOSED. Must include: policies affected, exact text changes (before/after), motivation, impact analysis (which projects/roles/configs are affected), and proposer.
2. **REVIEW** — The owner role(s) of each affected policy must review. Security-policy-domain policy changes additionally require Security role review. Cross-cutting policy changes go to the role-council skill.
3. **DECISION** — Approved by VP Engineering / Tech Lead with recorded date and name. Rejected policy changes stay in records/ with status REJECTED and the rejection rationale (rejections are part of the audit trail too).
4. **ENACTMENT** — On approval, in one commit: (a) policy file updated with version bump and policy_change_history entry, (b) registry.json + REGISTRY.md updated, (c) policy change record set to ENACTED, (d) CHANGELOG.md entry, (e) commit message format `policy: amend POL-X.Y via AMD-YYYY-NNN — <summary>`.
5. **PROPAGATION** — Consuming projects pull updates via `scripts/update.sh`, which prints a diff of changed policies with their policy change rationales.

Versioning rules: text clarification = patch (1.0 → 1.0.1); meaning change = minor (1.0 → 1.1); repeal-and-replace = new policy ID, old policy marked REPEALED (never deleted — repealed policies remain in the repo for citation of historical decisions).

### 3.2 `policy-changes/POLICY-CHANGE-TEMPLATE.md`

```markdown
---
id: AMD-YYYY-NNN
status: PROPOSED          # PROPOSED | APPROVED | REJECTED | ENACTED
proposed_by: ""
proposed_date: ""
laws_affected: []
reviewers_required: []     # owner roles of affected policies
decision_by: ""
decision_date: ""
---

# AMD-YYYY-NNN: <Title>

## Motivation
Why is this change needed? What problem, incident, or learning prompted it?

## Changes
For each affected policy:
### POL-X.Y (vCURRENT → vNEW)
**Before:** <exact current statement>
**After:** <exact new statement>

## Impact Analysis
- Projects affected and migration effort
- Configs/tooling that must change (eslint, CI, etc.)
- Roles whose mandates change

## Review Record
| Role/Role | Reviewer | Verdict | Date | Notes |
|---|---|---|---|---|

## Decision
Approved/Rejected by: ____ Date: ____
Rationale: ____
```

### 3.3 First Policy Change Record

Create `AMD-2026-001-initial-ratification.md` (status ENACTED) ratifying all Policy Domain 1–9 policies at v1.0, motivated by the six founding pain points (review bottlenecks, inconsistent standards, low coverage, security vulnerabilities, poor docs, tech debt).

### 3.4 `policy-integrity.yml` CI Workflow

On every PR to this repo: validate registry.json is valid JSON; every policy file has matching registry entry and vice versa; every ACTIVE policy's version matches registry; any diff to a `policies/` file is accompanied by a policy change record referencing that policy ID — **fail the build if a policy changed without a policy change**. This is the technical guarantee of auditability.

---

## DELIVERABLE 4: THE 8 ROLE SKILLS

Roles are skills under `.claude/skills/roles/`. An agentic coding agent assumes a role when working in that role's domain, and MUST cite policies in every decision.

### 4.1 Canonical Role — write `security/SKILL.md` exactly as follows (it is the template for the rest):

```markdown
---
name: role-security
description: Assume the Security role when code touches authentication, authorization, user input, data persistence, secrets, dependencies, or external APIs — or when any security question or review is requested. This role owns Policy Domain 5 and holds veto authority on CRITICAL findings.
---

# Role: Security

## Identity & Mandate
You are the organization's Security engineer. Your mandate is to ensure no
exploitable code reaches production. You are constructive but uncompromising:
security findings are defects, not negotiable trade-offs.

## Policies You Own (cite by ID in every decision)
- POL-5.1 Universal Input Validation
- POL-5.2 Parameterized Queries Only
- POL-5.3 Secrets Never in Code
- POL-5.4 Established Auth Frameworks Only
- POL-5.5 Dependency Hygiene
- POL-5.6 Encryption Standards
- Co-enforce: POL-7.2 (IP/Data Protection), POL-1.5 (Security Responsibility)

## Decision Authority
- VETO: You may block any change with a CRITICAL security finding.
  This veto cannot be overridden by any other role — only by a named
  human security lead, recorded in the PR.
- ADVISE: HIGH/MEDIUM findings require a documented fix-or-accept decision.
- ESCALATE: Novel threat models, compliance interpretation → human security lead.

## Review Lens (what you check, in order)
1. Input validation on every external data path (POL-5.1)
2. Query construction (POL-5.2)
3. Secrets, tokens, credentials in code or logs (POL-5.3)
4. Auth/crypto implementation choices (POL-5.4)
5. New or changed dependencies (POL-5.5)
6. Data in transit/at rest (POL-5.6)
7. AI-tool data exposure (POL-7.2)

## Output Format — every finding and decision uses citations:
FINDING [CRITICAL|HIGH|MEDIUM|LOW]: <issue> at <location>
CITATION: [POL-5.2 v1.0] "<quoted statement>"
RATIONALE: <policy's rationale, applied to this case>
REQUIRED FIX: <concrete code-level remedy>

## Conflict Rules
- vs FinOps: security fixes proceed regardless of cost; cost optimization
  never justifies a CRITICAL or HIGH exposure ([POL-1.5]).
- vs Product Owner: deadline pressure does not waive Policy Domain 5 ([POL-6.2]).
- Unresolvable conflicts → role-council, then human escalation ([POL-7.5]).
```

### 4.2 Remaining 7 Roles — build each with the same structure (Identity & Mandate, Policies Owned, Decision Authority, Review Lens, Citation Output Format, Conflict Rules):

| Role | Trigger (description field) | Policies Owned | Authority & Conflict Notes |
|---|---|---|---|
| **industry-sme** | Domain logic, business rules, industry regulation questions | POL-8.2, POL-8.3 | ADVISE on domain correctness; ESCALATE regulatory interpretation to human compliance; verifies code matches documented business rules and regulatory mappings |
| **product-owner** | Requirements, scope, acceptance criteria, prioritization | POL-8.1, POL-8.4 | BLOCKS implementation lacking acceptance criteria (POL-8.1); cannot waive Policy Domains 3, 5, 6 (deadlines never override gates per POL-6.2) |
| **quality** | Test strategy, coverage, defect analysis, review standards | POL-3.1–3.5, POL-6.1, POL-6.2, co-owns POL-2.3 | BLOCKS merges below coverage floors; defines test plans; arbitrates "is this tested enough?" |
| **architect** | System design, module boundaries, patterns, ADRs, refactors | POL-4.1–4.5, POL-1.4 | VETO on layer violations and circular dependencies; requires ADR before significant structural merges; proposes policy changes when patterns evolve |
| **software-engineer** | Default role for implementation work | POL-2.1–2.6, executes POL-3.1 | Implements within all other roles' constraints; must self-check against policy-enforcer before presenting code; escalates per POL-7.5 |
| **devops** | CI/CD, pipelines, hooks, infra, deployment, environments | POL-9.1, POL-9.2, enforces POL-6.2 mechanically | Owns quality-gate pipeline integrity; BLOCKS deploys without rollback plan; no manual infrastructure (POL-9.1) |
| **security** | (written in full above) | Policy Domain 5, co-enforce 7.2, 1.5 | VETO on CRITICAL |
| **finops** | Cloud cost, licensing, resource sizing, AI/compute budget | POL-9.3, POL-9.4 | ADVISE with cost impact estimates on infra/dependency changes; BLOCKS untagged resources and unevaluated licenses; explicitly subordinate to Security on CRITICAL/HIGH findings |

### 4.3 `role-council/SKILL.md`

Orchestration skill. Trigger: cross-cutting changes (new service, major refactor, new dependency with cost+security+architecture implications) or role conflicts. Procedure: identify the affected policy domains → sequentially assume each relevant role → produce one consolidated report with each role's cited findings → apply conflict rules (Security veto > Architect veto > Quality block > others advise) → if conflict remains, output an escalation summary for human decision per POL-7.5. The council never silently averages positions — disagreements are surfaced verbatim with their citations.

### 4.4 `policy-clerk/SKILL.md`

The auditability skill. Trigger: any request to create, modify, interpret, or look up a policy. Capabilities:
- **Lookup:** given a policy ID or topic, return statement + rationale + version + policy change history from registry.json.
- **Drafting:** produce new policies using `templates/policy-template.md` and policy changes using `POLICY-CHANGE-TEMPLATE.md` — never edits a policy file directly; always goes through the policy change process.
- **Audit answers:** for "why does POL-X.Y say this?" reconstruct the answer from the policy's rationale plus its policy change chain.
- **Integrity:** before any commit touching `policies/`, verify registry sync and policy change linkage (mirrors what `policy-integrity.yml` enforces in CI).
- **Hard rule stated in the skill:** "A policy without an enacted policy change record does not exist. A change without a policy change record is a policy framework violation — refuse and route through the process."

### 4.5 `docs/role-guide.md`

How agents and humans use roles: when each role triggers, how to explicitly invoke one ("act as the Architect role and review this module"), how the council works, the authority/precedence ladder, and three worked examples of cited role decisions.

---

## DELIVERABLE 5: ENFORCEMENT SKILLS (UPDATED FOR CITATIONS)

### `policy-enforcer/SKILL.md`
The always-on skill for any code work. Same hard rules as the policies in Policy Domains 1–7, but now: every correction or refusal **must cite the policy ID and quote its statement** using `reference/citation-format.md`. Self-check before presenting code: lint-clean (POL-2.x), strict types (POL-2.3/2.4), tests written first (POL-3.1), coverage floors (POL-3.2), security rules (Policy Domain 5), docs (POL-6.3–6.5). Includes the violation severity matrix in `reference/violation-severity.md` mapping severities to policies (CRITICAL examples: hardcoded secrets → POL-5.3, SQL concatenation → POL-5.2, disabled strict mode → POL-2.3).

`reference/citation-format.md` — defines the exact DECISION/CITATION/RATIONALE/ROLE block shown in the Core Design Requirement section above, plus a short inline form for minor corrections: `(per [POL-2.1 v1.0])`.

### Supporting skills — each updated to cite policies:
- **`tdd-assistant`** — enforces POL-3.1–3.5; shows the failing test first; cites POL-3.1 when a developer asks to "just write the code."
- **`code-review-assistant`** — checklist organized by policy domain; verdict lines cite specific policies; AI-generated code reviewed under POL-7.4 (verify, never assume).
- **`security-checker`** — delegates to / aligns with the security role; outputs cited findings.
- **`documentation-generator`** — enforces POL-6.3–6.5; ADR generation per POL-4.5.
- **`ai-transparency`** — enforces POL-7.1–7.3; produces the AI-assistance summary, `[Claude-assisted]` commit tag, and PR disclosure block.

---

## DELIVERABLE 6: CLAUDE.md (PROJECT-LEVEL INSTRUCTIONS)

~1 page, copied into every consuming project:
- "This project is governed by the Engineering Policy Framework v1.0.0. Policies are citable by ID; full registry in `docs/policy-framework/REGISTRY.md` (installed) or the engineering-policy-framework repo."
- The 9 policy domains, one line each, with the most-invoked policy IDs
- Hard-rules digest: naming (POL-2.1), no `any` (POL-2.3), TDD-first (POL-3.1), 80% coverage (POL-3.2), security basics (Policy Domain 5), `[Claude-assisted]` tag (POL-7.3)
- Role instruction: "Assume the matching role for the work at hand (see `.claude/skills/roles/`); cite policies in all decisions; on uncertainty, stop and ask per POL-7.5."
- Required commands before declaring done: `npm run lint`, `npm run type-check`, `npm test`

---

## DELIVERABLE 7: CONFIGURATION BUILDING BLOCKS

Each config file must include a header comment mapping it to the policies it enforces (e.g., `// Enforces: POL-2.1, POL-2.3, POL-2.5, POL-4.3` in eslint config — use JSON-adjacent placement such as a sibling `configs/CONFIG-POLICY-MAP.md` for pure-JSON files).

**`.eslintrc.json`** — TypeScript parser; extends recommended + type-checked + prettier; rules: `@typescript-eslint/naming-convention` per POL-2.1, `no-explicit-any: error` (POL-2.3), `explicit-function-return-type: warn` (POL-2.4), `import/order` (POL-2.5), `import/no-cycle: error` (POL-4.3), `no-eval: error` (Policy Domain 5), `no-console: warn` allow warn/error.

**`.prettierrc.json`** (POL-2.2) — semi true, singleQuote, printWidth 100, tabWidth 2, trailingComma es5, arrowParens always.

**`tsconfig.base.json`** (POL-2.3/2.4) — all strict flags: strict, noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, alwaysStrict, noUnusedLocals, noUnusedParameters, noImplicitReturns, noFallthroughCasesInSwitch, noUncheckedIndexedAccess, forceConsistentCasingInFileNames, esModuleInterop, skipLibCheck.

**`jest.config.js`** (POL-3.2) — ts-jest; coverageThreshold 80% global; sensible collectCoverageFrom.

**`lint-staged.config.js` + `hooks/pre-commit`** (POL-6.2) — eslint --fix, prettier --write, then `npm run type-check`; helpful failure messages citing the relevant policy.

**CI:** `quality.yml` (lint, type-check, test+coverage, format-check — POL-6.2), `security.yml` (npm audit / Snyk + CodeQL — POL-5.5), `policy-integrity.yml` (per Deliverable 3.4).

---

## DELIVERABLE 8: TEMPLATES, CHECKLISTS, DOCS

- **`templates/pull_request_template.md`** — sections: What/Why/Testing/Gates checklist (each item cites its policy), AI Assistance disclosure (POL-7.3), Policies Touched (list any policy IDs relevant to review focus).
- **`templates/adr-template.md`** — standard ADR + a "Policies Considered" section requiring relevant citations.
- **`templates/commit-message-guide.md`** — conventional commits; `[Claude-assisted]` tag (POL-7.3); `policy:` prefix reserved for policy change enactments.
- **`checklists/`** — code-review and pre-commit checklists, every item annotated with its policy ID.
- **`POLICY-FRAMEWORK.md`** — Preamble (purpose, scope, the six founding pain points), how to read/cite policies, policy domain summaries with links, role system overview with the authority ladder, policy change process summary, ratification block (sign-offs), quarterly review schedule (first: Sept 1, 2026).
- **`docs/standards.md`**, **`docs/testing-guide.md`**, **`docs/rollout-guide.md`** — as before, now citing policy IDs throughout; rollout guide maps building blocks to the 12-week phases.
- **`docs/adr/0001-...`** — ADR adopting the policy framework, citing AMD-2026-001.
- **`README.md`** — overview, the five purposes, quickstart, `policy-lookup.sh` usage example, link map.

---

## DELIVERABLE 9: ROLLOUT SCRIPTS

**`install.sh <target>`** — copies: CLAUDE.md → root; configs → root; hook → .husky/; CI yml → .github/workflows/; PR template → .github/; ALL skills (including roles) → .claude/skills/; checklists + standards → docs/; **policies/REGISTRY.md + registry.json → docs/policy-framework/** (so every project can cite policies offline). Prints devDependencies to install and package.json scripts block. Idempotent; `--force` to overwrite.

**`validate.sh <target>`** — verifies presence of all installed files, strict tsconfig, jest thresholds, executable hook, AND that docs/policy-framework/registry.json parses and matches the source repo's policy_framework_version. PASS/FAIL report; non-zero exit on failure.

**`update.sh <target>`** — syncs configs, skills, and the policy registry; before applying, prints a human-readable diff of any changed policies **including the policy change ID and motivation for each change** (read from policy change records) — this is how auditability propagates to consuming projects.

**`policy-lookup.sh <POL-ID>`** — parses registry.json (jq if available, fallback grep/sed) and prints: ID, title, version, status, statement, rationale summary, owner roles, policy change history, file path. This is the quick citation tool for humans and scripts.

---

## EXECUTION ORDER

1. `git init`, skeleton + README → `chore: scaffold repository structure`
2. Policy template, all 45 policy files (Policy Domains 1–9), REGISTRY.md, registry.json → `feat: ratify policy framework policies v1.0 (Policy Domains 1-9)`
3. Policy Change process, template, AMD-2026-001 → `feat: add policy change and audit system`
4. POLICY-FRAMEWORK.md + CLAUDE.md → `docs: add policy framework and CLAUDE.md`
5. 8 role skills + role-council + policy-clerk + role-guide → `feat: add role system for agentic coding`
6. Enforcement skills (policy-enforcer + 5 supporting) with citation references → `feat: add citation-aware enforcement skills`
7. Configs + hooks + CONFIG-POL-MAP → `feat: add policy-mapped tooling configuration`
8. CI workflows including policy-integrity → `feat: add quality, security, and policy-integrity CI`
9. Templates, checklists, docs, ADR 0001, CHANGELOG → `docs: add templates, checklists, and guides`
10. Scripts (chmod +x), test policy-lookup.sh against registry → `feat: add rollout and policy-lookup scripts`
11. Acceptance checklist → fix gaps → `chore: v1.0.0 release`

---

## ACCEPTANCE CRITERIA

Verify ALL before declaring done:

**Policy system**
- [ ] All ~45 policies exist with complete frontmatter, quotable Statement, Rationale, examples, and citation line
- [ ] registry.json is valid JSON; every policy file ↔ registry entry is 1:1; versions match
- [ ] `./scripts/policy-lookup.sh POL-2.3` prints the full policy record correctly
- [ ] REGISTRY.md table lists every policy with correct owners

**Auditability**
- [ ] AMD-2026-001 exists, status ENACTED, referenced by every v1.0 policy's policy_change_history
- [ ] POLICY-CHANGE-PROCESS.md describes proposal→review→decision→enactment→propagation with versioning rules, including that rejected policy changes and repealed policies are retained
- [ ] policy-integrity.yml fails a build when a policy file changes without an accompanying policy change record (verify the logic by inspection)
- [ ] policy-clerk skill refuses direct policy edits and routes through policy changes

**Roles**
- [ ] All 8 roles exist; security matches the canonical template verbatim in structure
- [ ] Every role lists owned policy IDs that actually exist in the registry
- [ ] Authority ladder is consistent everywhere it appears (Security veto > Architect veto > Quality block > advisory roles)
- [ ] role-council surfaces conflicts verbatim and escalates per POL-7.5
- [ ] Every role's output format requires citations

**Citations**
- [ ] citation-format.md defines full and inline forms; policy-enforcer, code-review-assistant, and all roles reference it
- [ ] CLAUDE.md instructs citation of policies and role assumption

**Tooling & rollout**
- [ ] Configs map to policies (CONFIG-POLICY-MAP.md complete); eslint/tsconfig/jest contents per Deliverable 7
- [ ] install.sh copies the registry into target docs/policy-framework/; update.sh prints policy diffs with policy change motivations; validate.sh checks registry version sync
- [ ] All scripts executable; graceful handling of missing args

**Hygiene**
- [ ] Every cross-reference resolves; no placeholders except `[YOUR ORGANIZATION]` and sign-off blocks
- [ ] Clean git status; commit history matches the execution order

When complete, print: the repo tree, the policy count per policy domain, the one-command install instruction, and an example cited decision produced by the security role.
