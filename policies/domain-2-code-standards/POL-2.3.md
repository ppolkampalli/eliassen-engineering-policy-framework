---
id: POL-2.3
title: Prohibition of the `any` Type
policy_domain: 2
policy_domain_name: Code Standards
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [software-engineer, quality]
enforcement: automated
enforcement_mechanism: "ESLint rule @typescript-eslint/no-explicit-any: error"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-2.3: Prohibition of the `any` Type

## Statement (quotable)

> The `any` type is prohibited in all TypeScript code. When a type is
> genuinely unknown, use `unknown` and narrow it with type guards before
> use. Exceptions require an inline justification comment and approval
> from the Quality role owner during code review.

## Rationale (the WHY — always citable alongside the statement)

`any` silently disables TypeScript's type checking for that value and
everything it touches, defeating the purpose of strict mode and allowing
type errors to reach production. `unknown` provides the same flexibility
while forcing explicit, safe narrowing. This law exists because type-related
production bugs were one of the six founding pain points of this policy framework.

## Compliance Examples

VIOLATION:
```typescript
function process(data: any) { return data.value; }
```

COMPLIANT:
```typescript
function process(data: unknown): string {
  if (isPayload(data)) return data.value;
  throw new ValidationError('Unexpected payload shape');
}
```

## Related Policies
- POL-2.4 (Explicit Return Types)
- POL-1.2 (Quality is Built-In, Never Added Later)

## Citation Format
[POL-2.3 v1.0] "The `any` type is prohibited. Use `unknown` with type narrowing."
