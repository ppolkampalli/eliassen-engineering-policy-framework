---
id: WF-SECBUG
title: Security Bug
version: 1.0
status: ACTIVE
trigger: "A vulnerability or suspected security defect — confirmed or reported"
applies_to: [agent, human, mixed]
governed_by: [POL-10.6]
stages:
  - id: triage
    role: security
    action: "Assess severity (violation-severity matrix), exposure window, and containment needs"
    entry: "A vulnerability report or suspicion"
    exit: "Severity assigned; containment actions identified (rotate secrets per POL-5.3, disable endpoint, etc.); disclosure clock started if CRITICAL"
    gates: [POL-1.5, POL-5.5]
    hard: true
    human_checkpoint: recommended
  - id: approach
    role: architect
    action: "Design the fix approach: root-cause remedy vs. mitigation; blast radius of the change"
    entry: "Triage with severity"
    exit: "Approach that fixes the class, not the instance, where feasible; ADR if structural (POL-4.5)"
    gates: [POL-4.1, POL-1.4]
    hard: false
    human_checkpoint: none
  - id: fix
    role: software-engineer
    action: "Implement with a test demonstrating the vulnerability is closed (red on vulnerable code, green on fixed)"
    entry: "Approach"
    exit: "Exploit-demonstrating test passes; full gates green; no new Policy-Domain-5 surface introduced"
    gates: [POL-3.1, POL-5.1, POL-5.2, POL-10.2]
    hard: true
    human_checkpoint: none
  - id: verify
    role: quality
    action: "Independent verification of fix and regression safety"
    entry: "Fix with evidence"
    exit: "Vulnerability test honest (POL-3.5); no behavioral regressions; fresh context (POL-10.5)"
    gates: [POL-3.5, POL-10.5]
    hard: true
    human_checkpoint: none
  - id: close
    role: security
    action: "Confirm remediation; verify containment cleanup; record the finding's lifecycle"
    entry: "Verified fix"
    exit: "Security sign-off recorded; CRITICAL closure by named human security lead (POL-1.5); postmortem if POL-9.6's trigger met"
    gates: [POL-1.5, POL-9.6]
    hard: true
    human_checkpoint: required
escalation: "Severity disputes → Security role's call stands (top of authority ladder); novel threat model → human security lead per POL-7.5"
---

# WF-SECBUG: Security Bug

## When to Use

Any confirmed or **suspected** vulnerability — suspicion is enough; WF-BUG
work switches here the moment a security implication appears (POL-1.5).
Deadlines do not modify this workflow: every stage that is hard stays hard
(POL-6.2).

## Stages

### 1. triage — Security *(hard)*
Severity per the violation-severity matrix, containment before cure: a leaked
secret is rotated NOW (POL-5.3) regardless of when the fix lands. Security
opens this workflow (rather than the user's Architect-first sketch) because
severity and containment decisions are Policy-Domain-5 authority — the Architect
designs the cure, but Security declares the disease.

### 2. approach — Architect
Fix the class, not the instance: one concatenated query fixed while ten remain
is theater (POL-5.2's rationale). Skippable for trivially-scoped fixes
(single-site, pattern obvious) — recorded.

### 3. fix — Software Engineer *(hard)*
The exploit-demonstrating test is this workflow's reproducing test: it fails
against vulnerable code, passes after. It is also the regression guard that
keeps the vulnerability from quietly returning (POL-3.1's guardrail clause).

### 4. verify — Quality *(hard)*
Fresh context. Verifies both directions: vulnerability closed AND behavior
preserved.

### 5. close — Security *(hard, human checkpoint)*
The role that opened the finding closes it. CRITICAL findings close only
under a named human security lead's sign-off (POL-1.5) — the same authority
that could have overridden the veto is the one that must confirm the cure.

## Deviation Notes

- Only `approach` is skippable, and only for trivially-scoped fixes.
- Adding stages is always permitted (extra review passes, pen-test stage for
  CRITICAL) — overrides that *strengthen* never need justification.
- The error-budget freeze (POL-9.6) never blocks this workflow: security fixes
  ship during freezes by definition.

## Escalation

Severity is Security's call — the authority ladder's apex applies. Novel
threat models, compliance exposure, or disclosure decisions → human security
lead (POL-7.5), immediately and in parallel with containment.
