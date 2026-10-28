---
id: POL-2.4
title: Explicit Return Types on Exported Functions
policy_domain: 2
policy_domain_name: Code Standards
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [software-engineer, quality]
enforcement: automated
enforcement_mechanism: "ESLint rule @typescript-eslint/explicit-function-return-type: warn (exported surfaces enforced in review)"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-2.4: Explicit Return Types on Exported Functions

## Statement (quotable)

> Every exported function, method, and public class member declares its
> return type explicitly. Inference is acceptable for module-private
> helpers; it is not acceptable on any surface another module consumes.
> An exported function's signature is a contract, and contracts are
> written down, not inferred.

## Rationale (the WHY — always citable alongside the statement)

Inferred return types on public surfaces make the contract whatever the
implementation happens to return: an internal refactor silently changes
the API and the breakage surfaces in distant consumers, attributed to the
wrong commit. Explicit annotations turn such drift into a compile error
at the source, document intent at the signature where readers look first
(POL-1.1, POL-6.3), and dramatically improve compiler error locality and
editor feedback.

## Compliance Examples

VIOLATION:
```typescript
export function getDiscount(order: Order) {
  return order.total > 100 ? { pct: 10 } : null; // inferred, drifts silently
}
```

COMPLIANT:
```typescript
export function getDiscount(order: Order): Discount | null {
  return order.total > 100 ? { pct: 10 } : null;
}
```

## Related Policies
- POL-2.3 (Prohibition of the `any` Type)
- POL-6.3 (Public API Documentation)

## Citation Format
[POL-2.4 v1.0] "Every exported function declares its return type explicitly; a public signature is a written contract, not an inference."
