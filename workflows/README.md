# Workflows — Process Definitions for Agents and Humans

Workflows define **how work flows**: the staged sequence of roles a problem
type moves through, with gates, checkpoints, and escalation paths. They complete
the policy framework's triad:

| Layer | Artifact | Answers |
|---|---|---|
| Policies | `policies/` | **What** must hold (citable, policy-change-governed) |
| Roles | `skills/role-*` | **Who** decides what (mandates, authority ladder) |
| **Workflows** | `workflows/` | **How** work moves (stages, sequence, gates) |

Workflows are **process, not policy**: they are governed artifacts (versioned,
PR-reviewed, registered) but change by ordinary code review — not the policy change
process. The single policy anchoring the system is **POL-10.6 (Defined Workflows)**;
everything else here is meant to evolve at the speed of practice.

## The Catalog

| ID | Title | Chain (summary) |
|---|---|---|
| [WF-FEATURE](WF-FEATURE.md) | New Feature Development | PO (AC) → Architect (design) → Quality (test definition) → Engineer (TDD) → Code Review → Security Review → Release Readiness |
| [WF-RESEARCH](WF-RESEARCH.md) | Product Research & Prioritization | PO (framing) → Research (investigate) → Ideate (options) → PO (prioritize/decide) |
| [WF-BUG](WF-BUG.md) | Bug Fix | Engineer (reproduce + fix) → Quality (verify) → [unresolved → PO (rescope/reprioritize)] |
| [WF-SECBUG](WF-SECBUG.md) | Security Bug | Security (triage) → Architect (approach) → Engineer (fix) → Quality (verify) → Security (close) |
| [WF-REFACTOR](WF-REFACTOR.md) | Structural Refactor | Architect (ADR) → Quality (metrics baseline) → Engineer (behavior-preserving change) → Quality (verify + metrics delta) |
| [WF-POLICY-CHANGE](WF-POLICY-CHANGE.md) | Policy Change | Policy Clerk (proposal) → Owner Roles (review) → Human (decision) → Policy Clerk (enactment) → Propagation |

Machine-readable index: [registry.json](registry.json). New workflows start from
[templates/workflow-template.md](../templates/workflow-template.md).

## How Execution Works

The **workflow-orchestrator** skill
(`skills/workflow-orchestrator/SKILL.md`) drives execution:

1. **Select** — match the work item to a workflow by trigger (or be told:
   "run WF-BUG on JIRA-3411").
2. **Execute stage by stage** — each stage assumes its role, performs its
   action, and produces cited output; exit criteria checked before advancing.
3. **Gate** — stage gates are policies; a failed hard gate stops the line exactly as
   in CI (POL-6.2's logic applied to process).
4. **Record** — the executed path, including any deviations, lands on the work
   item (PR description or ticket).

Workflows bind agents and humans identically (POL-7.4's principle applied to
process): a stage can be executed by an AI role, a human in that role, or a
human reviewing an agent's stage output.

## Overrides — Conversational but Recorded

You can reshape a flow in plain language: *"skip the architect stage, this is a
one-file change"*, *"add an extra security pass after QA"*, *"run design and
test-definition in parallel."* The orchestrator:

- **Applies** the override if every skipped/reordered stage is `hard: false`
  and no gating policy is triggered by the change's actual content;
- **Refuses with a citation** if the override would breach a hard stage or an
  inviolable policy (Security review on Policy-Domain-5 surfaces, POL-6.2 gates,
  POL-8.1 acceptance criteria, the POL-6.1 human approvals);
- **Records** every applied deviation:

```text
WORKFLOW DEVIATION: WF-FEATURE on JIRA-3500
Stage skipped: design (architect)
Reason: single-file copy change; no structural impact (POL-4.5 not triggered)
Approved by: <name>, 2026-06-11
```

## Project Overrides — Precedence

Consuming projects may override the catalog permanently:

1. A project-local `workflows/WF-<ID>.md` **replaces** the installed catalog
   entry of the same ID; new project-specific workflows may be added.
2. Project overrides **may not remove or soften a `hard: true` stage** from the
   org catalog, and may not waive gates the policies make inviolable — that change
   routes through the org catalog PR (or a policy change, if the gate itself is at
   issue). This is POL-1.3's exceptions-go-through-process rule applied to
   process definitions.
3. The orchestrator validates project overrides against the installed org copy
   (`docs/policy-framework/workflows/`) before executing them.

## Changing the Catalog

Ordinary PR to this repo: edit/add the workflow file, bump its `version`, update
`registry.json`, get the affected roles' owner review (per the workflow's
`stages`). No policy change needed — unless the change conflicts with a policy, in
which case the policy wins until amended (POL-10.6).
