---
id: POL-10.6
title: Defined Workflows
policy_domain: 10
policy_domain_name: Agentic Development
status: ACTIVE
version: 1.0
effective_date: 2026-06-11
owner_roles: [product-owner, quality]
enforcement: role
enforcement_mechanism: "workflow-orchestrator skill; deviation records checked in review; project overrides validated against the org catalog"
policy_change_history:
  - policy_change: AMD-2026-010
    date: 2026-06-11
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-10.6: Defined Workflows

## Statement (quotable)

> Nontrivial work proceeds under a declared workflow: the work item names which
> workflow from the catalog (`workflows/`, installed at
> `docs/policy framework/workflows/`) it follows, and that workflow's stages,
> roles, gates, and human checkpoints govern execution by agents and humans
> alike. Workflows are process, not law: definitions change by ordinary PR
> review. Conversational deviations are permitted for stages not marked hard —
> and every applied deviation is recorded on the work item with its rationale
> and approver. Stages marked hard, stages whose gating laws are inviolable,
> and the WF-AMENDMENT sequence itself may not be overridden conversationally
> or by project-level files; project overrides may replace or add workflows
> but never remove or soften an org-catalog hard stage (POL-1.3 applied to
> process). When no workflow fits, the orchestrator says so and a sequence is
> agreed explicitly — governed work is never processed by silent improvisation.

## Rationale (the WHY — always citable alongside the statement)

Process that lives in memory fails exactly like undocumented architecture
(POL-1.4) and unrecorded policy changes: invisibly, then expensively — security
review happens when someone remembers, and "did QA see this?" is answered by
recollection. A declared workflow makes the sequence auditable (which stages
ran, which role checked what, with what evidence), makes agent execution
safe (agents follow the same staged gates humans do — POL-7.4's principle
applied to process), and makes deviation a recorded decision instead of an
accident (POL-7.3's provenance principle: undisclosed deviation is the
violation, never deviation itself). Keeping the definitions PR-governed rather
than policy change-governed is deliberate: process must evolve at the speed of
practice, while the obligation to follow *some* declared process — and the
inviolability of hard gates — stays constitutional. Ratified per AMD-2026-010.

## Compliance Examples

VIOLATION:
```text
Agent receives "fix the rounding bug and while you're at it add CSV
export" — improvises: implements both, no workflow declared, security
review skipped silently, scope expansion unrecorded. Three laws violated
with no trail (POL-8.4, POL-1.5, this law).
```

COMPLIANT:
```text
WORKFLOW: WF-BUG v1.0 on JIRA-3411 (CSV export split to ticket → WF-FEATURE)
Stages: reproduce-and-fix ✓ (evidence: failing test red→green) →
verify ✓ (quality, fresh context). Deviations: none.

WORKFLOW DEVIATION (separate item, JIRA-3500 / WF-FEATURE):
Stage skipped: design — hard:false, POL-4.5 not triggered
Reason: single-file copy change. Approved by: P. Polkampalli, 2026-06-11
```

## Related Policies
- POL-10.1 (Spec-Driven Agent Work)
- POL-7.3 (AI Audit Trail)
- POL-1.3 (Consistency Enables Collaboration)

## Citation Format
[POL-10.6 v1.0] "Nontrivial work proceeds under a declared workflow whose stages, roles, and gates govern agents and humans alike; deviations on non-hard stages are permitted but recorded, and hard stages are never overridable."
