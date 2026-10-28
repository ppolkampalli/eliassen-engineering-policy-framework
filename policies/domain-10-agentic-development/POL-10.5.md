---
id: POL-10.5
title: Fresh-Context Review
policy_domain: 10
policy_domain_name: Agentic Development
status: ACTIVE
version: 1.0
effective_date: 2026-06-11
owner_roles: [quality]
enforcement: role
enforcement_mechanism: "Independent context (fresh session/subagent) reviews agent diffs before completion; quality role verifies separation"
policy_change_history:
  - policy_change: AMD-2026-002
    date: 2026-06-11
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-10.5: Fresh-Context Review

## Statement (quotable)

> Agent-produced work is reviewed by a context that did not produce it — a fresh
> agent session, a subagent seeing only the diff and the criteria, or a human
> (POL-6.1's two human approvals always stand). The implementing context never
> grades its own work. Reviewers are directed to gaps affecting correctness and
> stated requirements, not style preferences; agents must not delete, skip, or
> weaken a failing test or check to reach green (extends POL-3.5 and the POL-3.1
> guardrail to all verification artifacts).

## Rationale (the WHY — always citable alongside the statement)

A context that produced a change carries the reasoning that produced its bugs:
Anthropic's verified guidance — "a fresh context improves code review since
Claude won't be biased toward code it just wrote" — is the agent-era restatement
of why authors don't approve their own PRs (POL-6.1). The guardrail clause exists
because the implementing context has both means and motive to weaken its own
checks: Kent Beck documents unconstrained agents deleting failing tests to reach
green. The gaps-not-style directive prevents the opposite failure — a reviewer
prompted to find problems will invent them, driving over-engineering; review
scope is correctness against the spec (POL-10.1), not taste.

## Compliance Examples

VIOLATION:
```text
The session that wrote the rate limiter is asked "review your
implementation for issues" — it validates its own assumptions. Later,
blocked by a failing legacy test, it deletes the test "as obsolete."
```

COMPLIANT:
```text
A fresh subagent receives only the diff + the plan: "Check every
requirement is implemented, listed edge cases have tests, nothing
outside scope changed. Report gaps, not style." The failing legacy test
is escalated per POL-7.5 — requirement change or fix, never deletion.
```

## Related Policies
- POL-6.1 (Two-Approval Review)
- POL-3.5 (No Skipped or Hollow Tests)
- POL-7.4 (Identical Standards for AI Code)

## Citation Format
[POL-10.5 v1.0] "Agent work is reviewed by a context that did not produce it; the implementing context never grades its own work and never deletes or weakens a failing check to reach green."
