---
id: POL-6.3
title: Public API Documentation
policy_domain: 6
policy_domain_name: Review & Documentation
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [quality, architect]
enforcement: review
enforcement_mechanism: "Code review per checklist; documentation-generator skill produces and verifies JSDoc"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-6.3: Public API Documentation

## Statement (quotable)

> Every public function, method, and exported type carries JSDoc
> documenting: what it does (one sentence), each parameter (`@param`),
> the return value (`@returns`), every error it can throw (`@throws`),
> and at least one usage example (`@example`) for non-trivial surfaces.
> "Public" means anything another module, package, or team can call.

## Rationale (the WHY — always citable alongside the statement)

A public function's signature says what types it takes; only its
documentation says what it *means* — units, invariants, side effects,
failure modes. Without `@throws`, every caller discovers error contracts
in production. Poor documentation was a founding pain point, and its
cost recurs on every call site: an undocumented API is re-reverse-
engineered by each consumer (and each AI agent) independently. JSDoc
specifically because it travels with the code (POL-6.5), surfaces in
editor hover and agent context, and is verifiable in review — unlike
wiki pages that rot unobserved.

## Compliance Examples

VIOLATION:
```typescript
export async function settle(b: Batch, opts?: SOpts): Promise<SettleResult>;
// no docs: what's a Batch? which errors? what does opts change?
```

COMPLIANT:
```typescript
/**
 * Settles a payment batch against the ledger, applying per-merchant fees.
 *
 * @param batch - Captured-but-unsettled transactions; must be same-currency.
 * @param opts - Optional settlement overrides (dry-run, value date).
 * @returns Per-transaction settlement results, in input order.
 * @throws {MixedCurrencyError} If the batch spans multiple currencies.
 * @throws {LedgerUnavailableError} If the ledger rejects the connection.
 * @example
 * const results = await settle(batch, { dryRun: true });
 */
export async function settle(batch: Batch, opts?: SettleOptions): Promise<SettleResult>;
```

## Related Policies
- POL-2.4 (Explicit Return Types)
- POL-6.4 (Comments Explain WHY)
- POL-6.5 (Docs Travel With Code)

## Citation Format
[POL-6.3 v1.0] "Every public function carries JSDoc with description, @param, @returns, @throws, and an @example for non-trivial surfaces."
