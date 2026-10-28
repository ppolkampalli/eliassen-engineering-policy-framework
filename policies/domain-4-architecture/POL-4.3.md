---
id: POL-4.3
title: No Circular Dependencies
policy_domain: 4
policy_domain_name: Architecture
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [architect]
enforcement: automated
enforcement_mechanism: "ESLint rule import/no-cycle: error"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-4.3: No Circular Dependencies

## Statement (quotable)

> Circular dependencies between modules are prohibited at any distance —
> direct (A↔B) or transitive (A→B→C→A). The ESLint rule
> `import/no-cycle` enforces this as a build error. When two modules
> need each other, the shared concept they both depend on must be
> extracted into a third module beneath them.

## Rationale (the WHY — always citable alongside the statement)

A cycle means neither module can be understood, tested, loaded, or
replaced without the other — they are one module wearing two names, and
every module in the cycle inherits the union of all their reasons to
change. Cycles also produce concrete runtime failures in JavaScript:
partially-initialized module objects during import resolution cause
`undefined is not a function` errors that appear only under specific
import orders. The cycle is always evidence of a missing abstraction;
extracting it improves the design every time.

## Compliance Examples

VIOLATION:
```typescript
// user-service.ts
import { auditOrder } from './order-service';
// order-service.ts
import { getUser } from './user-service';   // A→B→A
```

COMPLIANT:
```typescript
// user-service.ts
import { User } from './domain/user';
// order-service.ts
import { User } from './domain/user';        // shared concept extracted below
```

## Related Policies
- POL-4.1 (Layered Architecture)
- POL-2.5 (Import Ordering)
- POL-4.2 (SOLID Compliance)

## Citation Format
[POL-4.3 v1.0] "Circular dependencies are prohibited at any distance; import/no-cycle is a build error, and shared concepts are extracted into a module beneath both."
