<!-- Governed by the Engineering Policy Framework v1.0.0 — cite policies by ID. -->

## What

<!-- What changes, in one or two sentences. Link the work item. -->

## Why

<!-- The motivation: ticket, incident, business rule (cite per POL-8.2 if domain logic). -->

## Testing

<!-- How this was verified. Test-first evidence per POL-3.1: which failing test
     preceded the implementation? New/changed test names. -->

## Gates Checklist

- [ ] Failing test written before implementation (POL-3.1)
- [ ] Coverage floors hold — no threshold edits (POL-3.2)
- [ ] Lint clean, no suppressions added (Policy Domain 2, POL-1.3)
- [ ] No `any`; exported return types explicit (POL-2.3, POL-2.4)
- [ ] Inputs validated / queries parameterized / no secrets (POL-5.1, POL-5.2, POL-5.3)
- [ ] Public APIs documented; docs updated in this PR (POL-6.3, POL-6.5)
- [ ] ADR included if structurally significant (POL-4.5)
- [ ] In scope, or PO sign-off recorded (POL-8.4)
- [ ] Infra: IaC + rollback documented + cost estimate + tags (POL-9.1–9.3, if applicable)

## AI Assistance (POL-7.3)

- **Tool:** <!-- e.g., Claude Code (approved list ✓) / none -->
- **What the AI produced:** <!-- generated components/logic, or "n/a" -->
- **What the human verified/modified:** <!-- the POL-7.4 evidence: checked against docs, rewrote X, tested Y -->
- **Commits tagged** `[Claude-assisted]`: <!-- yes / n/a -->

## Policies Touched

<!-- Policy IDs most relevant to reviewing this change, e.g.: POL-5.1, POL-4.1.
     Tells reviewers where to focus; reviewers cite policies in findings. -->
