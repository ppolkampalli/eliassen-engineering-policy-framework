---
id: WF-<NAME>
title: <Workflow Title>
version: 1.0
status: ACTIVE            # ACTIVE | DEPRECATED
trigger: "<When this workflow applies — the problem type, stated so an orchestrator can match it>"
applies_to: [agent, human, mixed]
governed_by: [POL-10.6]
stages:
  - id: <stage-id>
    role: <role-name>          # from skills/ (the role-* skills)
    action: "<What this stage produces>"
    entry: "<What must exist before this stage starts>"
    exit: "<What must be true to advance — the stage's definition of done>"
    gates: [POL-X.Y]                 # policies checked at this stage
    hard: false                      # true = not overridable (conversationally or by project)
    human_checkpoint: none           # none | recommended | required
escalation: "<Where stage conflicts go — role-council, then humans per POL-7.5>"
---

# WF-<NAME>: <Workflow Title>

## When to Use

<The trigger, elaborated: what kinds of work items, with examples. What this
workflow is NOT for, pointing to the right one.>

## Stages

### 1. <stage-id> — <Role>
<What happens, what the role produces (in its citation format), what the
exit criteria mean in practice. Note hard gates and why they are hard.>

### 2. …

## Deviation Notes

<Which stages are commonly skipped/reordered and when that is reasonable;
what may never be skipped, with policy citations.>

## Escalation

<Conflict path: which disagreements go to role-council, what goes straight
to humans per POL-7.5.>
