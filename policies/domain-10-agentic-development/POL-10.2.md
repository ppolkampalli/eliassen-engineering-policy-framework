---
id: POL-10.2
title: Verifiable Completion
policy_domain: 10
policy_domain_name: Agentic Development
status: ACTIVE
version: 1.0
effective_date: 2026-06-11
owner_roles: [quality, software-engineer]
enforcement: role
enforcement_mechanism: "Check defined before implementation; evidence (test output, command results) presented with the work"
policy_change_history:
  - policy_change: AMD-2026-002
    date: 2026-06-11
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-10.2: Verifiable Completion

## Statement (quotable)

> Every agent task defines, before implementation, a check the agent can run —
> a test suite, a build, a lint pass, a diff against a fixture, a screenshot
> comparison. The agent iterates until the check passes and presents the
> evidence (test output, command results) with its work. "Looks done" is not
> done; completion claims without runnable evidence are presumed unverified.

## Rationale (the WHY — always citable alongside the statement)

An agent without a runnable check stops when the work *looks* done — and
plausible-looking is exactly what generated output is optimized for (POL-7.4).
Anthropic's verified guidance makes the check the central discipline of agentic
work: "Give Claude a check it can run… It's the difference between a session you
watch and one you walk away from," and "have Claude show evidence rather than
asserting success." With a check, the verification loop closes inside the agent's
own iteration; without one, every defect waits for a human to notice it — the
documented "trust-then-verify gap" failure pattern. Evidence-with-the-work also
makes review faster than re-running verification (POL-6.1).

## Compliance Examples

VIOLATION:
```text
Agent: "I've implemented the rate limiter and it should work correctly."
No test run shown, no build output, no evidence — the human becomes the
verification loop.
```

COMPLIANT:
```text
Agent: "Rate limiter implemented. Evidence: 9/9 tests pass (output
below), including burst-at-window-boundary; `npm run lint` and
`type-check` clean. The 429 path verified by the new integration test."
```

## Related Policies
- POL-10.1 (Spec-Driven Agent Work)
- POL-3.1 (Test-First Development)
- POL-7.4 (Identical Standards for AI Code)

## Citation Format
[POL-10.2 v1.0] "Every agent task defines a runnable check before implementation; the agent iterates until it passes and presents the evidence — completion claims without evidence are presumed unverified."
