---
id: POL-3.4
title: Test Isolation
policy_domain: 3
policy_domain_name: Testing & Quality
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [quality, software-engineer]
enforcement: review
enforcement_mechanism: "Code review; unit test runtime budget visible in CI; flaky tests treated as defects"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-3.4: Test Isolation

## Statement (quotable)

> Unit tests are isolated: all external dependencies — network, database,
> filesystem, clock, environment — are mocked or faked. Each unit test
> completes in under one second. No test depends on another test's
> execution, ordering, or side effects; any test can run alone and the
> full suite can run in any order with identical results.

## Rationale (the WHY — always citable alongside the statement)

Tests that touch real dependencies are slow, flaky, and ambiguous: a
failure might mean broken code, a down service, or a dirty database, and
engineers learn to re-run instead of investigate — at which point the
suite's signal is dead. Inter-test coupling is worse: it makes failures
order-dependent and unreproducible. Fast, isolated tests are what makes
test-first (POL-3.1) viable — a red-green loop measured in seconds gets
used; one measured in minutes gets skipped.

## Compliance Examples

VIOLATION:
```typescript
it('should update the user', async () => {
  // hits the shared dev database; depends on the previous test's insert
  const user = await db.users.findByEmail('test@example.com');
  await service.rename(user.id, 'New Name');
});
```

COMPLIANT:
```typescript
it('should rename the user when the id exists', async () => {
  const repo = fakeUserRepository([userWithId('u1')]);
  const service = new UserService(repo);
  await service.rename('u1', 'New Name');
  expect(repo.savedUsers[0].name).toBe('New Name');
});
```

## Related Policies
- POL-3.1 (Test-First Development)
- POL-3.3 (Test Structure)
- POL-4.2 (SOLID Compliance — dependency inversion enables fakes)

## Citation Format
[POL-3.4 v1.0] "Unit tests mock all external dependencies, complete in under one second, and never depend on another test's execution or ordering."
