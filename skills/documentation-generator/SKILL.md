---
name: documentation-generator
description: Use when writing or updating documentation in a policy-framework-governed project — JSDoc for public APIs, README updates accompanying changes, and ADR generation. Enforces POL-6.3–6.5 and produces ADRs per POL-4.5.
---

# Documentation Generator

Enforces the documentation policies: public surfaces documented (POL-6.3), comments
explain WHY (POL-6.4), docs travel with code (POL-6.5), and structural decisions get
ADRs (POL-4.5).

## JSDoc Generation (POL-6.3)

For every public function, method, and exported type:

```typescript
/**
 * <One sentence: what it does, in domain terms.>
 *
 * @param <name> - <meaning, units, constraints — not just the type again>
 * @returns <what comes back, including ordering/shape guarantees>
 * @throws {<ErrorType>} <the condition that raises it — every throw path>
 * @example
 * <one realistic call for non-trivial surfaces>
 */
```

Rules:
- `@throws` is the most-omitted, most-valuable tag — enumerate every error the
  caller can receive; undocumented error contracts get discovered in production.
- Descriptions add meaning the signature lacks (units, invariants, side effects);
  restating the type is a WHAT-comment in disguise (POL-6.4).
- Generated JSDoc is verified against the code's actual behavior (POL-7.4) — a doc
  comment asserting the wrong error type is worse than none.

## WHY-Comments (POL-6.4)

When asked to "add comments": add WHY or nothing. Sources of WHY worth writing:
business rules with their IDs (POL-8.2), trade-offs taken, external constraints
(vendor limits, regulations), workarounds with tickets. If the code needs a WHAT
comment to be understood, rewrite the code instead `(per [POL-1.1 v1.0])`.

## Same-PR Doc Updates (POL-6.5)

When a change alters behavior, find and update in the same PR:
- README sections (config tables, env vars, commands, examples)
- API docs for changed endpoints/exports
- Runbooks referencing changed procedures
- The compliance map, if a mapped path changed (POL-8.3)

Flag with a citation if asked to defer: stale docs ship confidently wrong answers
`(per [POL-6.5 v1.0])`.

## ADR Generation (POL-4.5)

Generate from `templates/adr-template.md` into `docs/adr/NNNN-<kebab-title>.md`
(next sequential number). An ADR records:

- **Context** — the problem and forces, measured where possible
- **Options considered** — each with honest consequences (the rejected options are
  the valuable part of the record)
- **Decision** — what and why, in domain language
- **Consequences** — costs accepted, risks created, follow-ups required
- **Policies Considered** — citations relevant to the decision
  (e.g., `[POL-4.1 v1.0]` layering, `[POL-9.3 v1.0]` cost)

The ADR exists **before** the implementing change merges (POL-4.5); offering to
"write the ADR after" is declined with a citation `(per [POL-1.4 v1.0])`.

## Output Discipline

All generated documentation follows
[citation-format.md](../policy-enforcer/reference/citation-format.md) when it
makes or records decisions; AI-generated docs are disclosed like AI-generated code
(POL-7.3).
