---
id: WF-POLICY-CHANGE
title: Policy Change
version: 1.0
status: ACTIVE
trigger: "A policy needs to be created, modified, or repealed — any change to the policy framework's policies"
applies_to: [agent, human, mixed]
governed_by: [POL-10.6]
stages:
  - id: proposal
    role: policy-clerk
    action: "Draft the policy change record: exact before/after text, motivation, impact analysis, reviewers required"
    entry: "A problem, incident, or learning motivating a policy change"
    exit: "PCH-YYYY-NNN record in policy-changes/records/ with status PROPOSED, complete per POLICY-CHANGE-TEMPLATE.md"
    gates: [POL-10.6]
    hard: true
    human_checkpoint: none
  - id: review
    role: role-council
    action: "Owner roles of affected policies review; Security additionally for Policy-Domain-5 policy changes; council for cross-cutting"
    entry: "PROPOSED record"
    exit: "Review Record table completed with cited verdicts"
    gates: [POL-1.5]
    hard: true
    human_checkpoint: recommended
  - id: decision
    role: product-owner
    action: "HUMAN decision: VP Engineering / Tech Lead approves or rejects, with name and date recorded"
    entry: "Completed reviews"
    exit: "Status APPROVED (→ enactment) or REJECTED (record retained with rationale, workflow ends)"
    gates: [POL-7.5]
    hard: true
    human_checkpoint: required
  - id: enactment
    role: policy-clerk
    action: "One commit: policy file(s) + version bump + history entry, registry sync, record → ENACTED, CHANGELOG, 'policy:' commit format"
    entry: "APPROVED record"
    exit: "policy-integrity invariants verified; enactment commit on main"
    gates: [POL-10.6]
    hard: true
    human_checkpoint: none
  - id: propagation
    role: devops
    action: "Consuming projects update via scripts/update.sh (policy diff with policy change motivations shown before applying)"
    entry: "Enacted policy change"
    exit: "Projects updated per their cadence; supporting docs/configs/roles propagated in follow-up commits"
    gates: [POL-1.3, POL-6.5]
    hard: false
    human_checkpoint: none
escalation: "Disagreement between reviewing roles → role-council; council deadlock → the human decision stage settles it (it always does — stage 3 is the authority)"
---

# WF-POLICY-CHANGE: Policy Change

## When to Use

Any change to a policy — creation, modification, repeal. This workflow IS the
[Policy Change Process](../policy-changes/POLICY-CHANGE-PROCESS.md), encoded as an
executable workflow: the policy framework governing its own evolution through its
own machinery. (The v1.1 wave, AMD-2026-002…009, followed exactly this path.)

## Stages

### 1. proposal — Policy Clerk *(hard)*
The clerk drafts but never edits policies directly: a policy file change without an
enacted policy change record is the policy framework violation the policy-integrity CI
exists to catch. Anyone — human or role — may *initiate*; the clerk
ensures the record is procedurally complete.

### 2. review — Owner Roles / Council *(hard)*
The affected policies' owner roles review with citations; Policy-Domain-5 policy changes
always add Security; cross-cutting policy changes convene the full council.

### 3. decision — HUMAN *(hard, the human checkpoint)*
No role approves a policy change. The recorded name and date are the audit
trail's anchor. Rejections are retained forever with their rationale —
rejections are precedent, not failures.

### 4. enactment — Policy Clerk *(hard)*
The five-part single commit (policy files, registry, record status, CHANGELOG,
`policy:` message format). The clerk runs the same integrity checks CI enforces
before pushing.

### 5. propagation — DevOps
`update.sh` shows consuming projects each changed policy WITH its policy change
motivation before applying — auditability travels with the update. The
training app (`user-training-onboarding/`) is part of propagation: registries
render live (no action), but affected narrative lessons are updated in the
same pass, and its content-integrity test catches stale policy references.

## Deviation Notes

- **Nothing in stages 1–4 is skippable or reorderable.** This workflow encodes
  policy framework procedure; its flexibility point is the *pace*, never the
  sequence. A project-level override of WF-POLICY-CHANGE is itself a
  policy framework violation — this file is normative only in the org catalog.
- Batch policy changes (like the v1.1 wave) run stages 1–2 per record, stage 3
  en bloc if the approver chooses, stage 4 per record (one `policy:` commit each).

## Escalation

Reviewer deadlock → council → the stage-3 human. There is no path around the
human decision; that is the point.
