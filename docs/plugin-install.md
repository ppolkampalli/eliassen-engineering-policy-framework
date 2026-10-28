# Installing the Engineering Policy Framework as a Claude Code Plugin

The policy framework ships as a Claude Code **plugin** so any team can install it into
their own work and develop *under the policy framework* — assuming its governance
roles, running its enforcement skills, driving its workflows, and citing its policies
— without copying anything into their repository.

This is **Option A** in the [README](../README.md). For full whole-repo governance
(configs, CI, hooks, registry copied in), use **Option B**, `scripts/install.sh`.

---

## What the plugin provides

| Capability | What you get |
|---|---|
| **8 roles** | `role-security`, `role-architect`, `role-quality`, `role-software-engineer`, `role-product-owner`, `role-industry-sme`, `role-devops`, `role-finops` |
| **Orchestration** | `role-council` (multi-role review), `policy-clerk` (lookup + policy changes), `workflow-orchestrator` (drive the 6 workflows) |
| **Enforcement** | `policy-enforcer`, `tdd-assistant`, `code-review-assistant`, `security-checker`, `documentation-generator`, `ai-transparency` |
| **Citable policies** | The full 57-policy registry bundled in the plugin (`policies/registry.json`), so roles cite policy text and versions offline |

All roles and skills are namespaced under the plugin: `engineering-policy-framework`.

## Install

### From the git marketplace (shareable)

```text
/plugin marketplace add ppolkampalli/eliassen-engineering-policy-framework
/plugin install engineering-policy-framework
```

Installs at user scope by default (available in all your projects). For a single
project shared with your team via version control, install at project scope:

```text
/plugin install engineering-policy-framework --scope project
```

### Locally (development / testing)

No marketplace needed — point Claude Code at a clone:

```bash
claude --plugin-dir /path/to/eliassen-engineering-policy-framework
```

Or register the local clone as a marketplace to exercise the real install flow:

```text
/plugin marketplace add /path/to/eliassen-engineering-policy-framework
/plugin install engineering-policy-framework
```

## Use

Two ways to summon a role once installed:

1. **Explicit** — invoke the skill by its namespaced command:
   ```text
   /engineering-policy-framework:role-security
   /engineering-policy-framework:workflow-orchestrator
   ```
2. **Natural language** — just describe the work, and the matching role
   auto-activates by its description:
   > "Act as the Security role and review this webhook handler."
   > "Run WF-FEATURE on this ticket."
   > "Look up POL-2.3 and tell me why it exists."

Every role decision arrives as a citation — `DECISION / CITATION [POL-X.Y vN] /
RATIONALE / ROLE` — so you can trace any call back to the policy that grounds it.
See [role-guide.md](role-guide.md) for the authority ladder and worked
examples, and [../workflows/README.md](../workflows/README.md) for the workflow
catalog.

## Updating

```text
/plugin update engineering-policy-framework
```

The plugin is versioned (currently 2.0.0, tracking the policy framework version). When
policies are amended and a new version is published, updating pulls the new policy text and
any new/changed skills.

## Plugin vs. install.sh — which do I want?

- **Plugin (this guide):** "I want to *develop* with the policy framework's roles and
  skills." Clean, versioned, no files added to your repo. Does **not** install your
  project's lint/test/CI configs or copy the registry into your `docs/`.
- **`install.sh`:** "I want my *whole repo* governed." Copies the full stack —
  configs, pre-commit hook, CI workflows, PR template, checklists, offline registry,
  and the skills — into the target project. See [rollout-guide.md](rollout-guide.md).

Many teams use both: the plugin for day-to-day role-driven development, and
`install.sh` to put the enforcement machinery (gates, CI) into each governed repo.
