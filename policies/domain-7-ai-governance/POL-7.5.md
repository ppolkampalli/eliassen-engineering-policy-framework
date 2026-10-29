---
id: POL-7.5
title: Mandatory Escalation on Uncertainty
policy_domain: 7
policy_domain_name: AI Governance
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [quality, security]
enforcement: role
enforcement_mechanism: "All role skills embed the stop-and-ask rule; role-council escalation path; policy-enforcer"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0); residual law/laws wording in Statement/
      Rationale prose fixed as a same-amendment follow-up the initial sweep missed."
---

# POL-7.5: Mandatory Escalation on Uncertainty

## Statement (quotable)

> When an AI agent encounters ambiguous requirements, an architectural
> choice with lasting consequences, or any security-relevant decision it
> cannot resolve from documented sources — policies, ADRs, acceptance
> criteria, documented business rules — it must stop and ask a human.
> Guessing is prohibited: a plausible assumption silently embedded in
> code is a defect even when it turns out correct. Escalations state
> what is ambiguous, what options exist, and what the agent would need
> to know to proceed.

## Rationale (the WHY — always citable alongside the statement)

Agents fail differently from humans: a human carrying an assumption
mentions it at standup; an agent compiles it into the system, invisibly
and at scale. Most production-bound AI errors are not generation
mistakes but requirement guesses — the code perfectly implements
something nobody asked for. The "even when correct" clause removes the
temptation to let lucky guesses ride: the violation is the silent
embedding, because luck doesn't audit. Escalation is also what makes
role authority real — a role that guesses where it should defer
(POL-8.1's acceptance criteria, Policy Domain 5's security calls) has exceeded
its mandate. Stop-and-ask is cheap; un-shipping an assumption is not.

## Compliance Examples

VIOLATION:
```text
Ticket: "expire stale sessions." Agent picks 30 minutes ("industry
standard"), implements it, mentions nothing. The client's regulator
requires 15 for this data class.
```

COMPLIANT:
```text
ESCALATION per [POL-7.5 v1.0]: "Session expiry duration is not
specified in the ticket or documented rules. Options: (a) 15 min —
typical for regulated data, (b) 30 min — org default. Security-
relevant; need Product Owner + Security confirmation before
implementing."
```

## Related Policies
- POL-8.1 (Acceptance Criteria Before Implementation)
- POL-7.1 (Human Accountability)
- POL-1.4 (Architecture Decisions Are Intentional)

## Citation Format
[POL-7.5 v1.0] "On ambiguous requirements, lasting architectural choices, or unresolved security questions, agents stop and ask — guessing is prohibited even when the guess is correct."
