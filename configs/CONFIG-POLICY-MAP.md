# Configuration → Policy Map

Every configuration file in this directory mechanically enforces specific policies.
Pure-JSON files cannot carry comments, so this document is their policy-mapping header.
JS configs additionally carry an `// Enforces:` header inline.

Changing any setting here changes what a policy enforces — such changes go through the
[policy change process](../policy-changes/POLICY-CHANGE-PROCESS.md) (POL-1.3: conventions change
for everyone or not at all).

## `.eslintrc.json`
**Enforces: POL-2.1, POL-2.3, POL-2.4, POL-2.5, POL-4.3, Policy Domain 5 (no-eval), POL-1.3**

| Setting | Policy | What it enforces |
|---|---|---|
| `@typescript-eslint/naming-convention` | POL-2.1 | camelCase variables/functions/params; PascalCase types; interfaces banned from `I` prefix; UPPER_CASE constant option; is/has/can boolean prefixes |
| `@typescript-eslint/no-explicit-any: error` | POL-2.3 | Prohibition of `any` |
| `@typescript-eslint/explicit-function-return-type: warn` | POL-2.4 | Explicit return types (exported surfaces enforced to error level in review) |
| `import/order` (builtin → external → internal, alphabetized, newlines between) | POL-2.5 | Import ordering |
| `import/no-cycle: error` | POL-4.3 | No circular dependencies |
| `complexity: ["warn", 5]`, `max-lines-per-function: ["warn", 40]` | POL-2.6 v1.1 | Advisory thresholds — review scrutiny beyond CC 5 / ~40 LOC, not automatic rejection |
| `no-eval: error`, `no-implied-eval: error` | Policy Domain 5 (POL-5.1 spirit) | Eval-class injection surface removed |
| `no-console: warn` (allow `warn`/`error`) | POL-5.3 (log hygiene), POL-1.1 | Stray debug logging flagged |
| `extends: ...recommended + type-checked + prettier` | POL-1.3, POL-2.2 | One shared baseline; formatting delegated to Prettier |

## `.prettierrc.json`
**Enforces: POL-2.2**

| Setting | Value | Policy |
|---|---|---|
| `semi` | `true` | POL-2.2 |
| `singleQuote` | `true` | POL-2.2 |
| `printWidth` | `100` | POL-2.2 |
| `tabWidth` | `2` | POL-2.2 |
| `trailingComma` | `"es5"` | POL-2.2 |
| `arrowParens` | `"always"` | POL-2.2 |

## `tsconfig.base.json`
**Enforces: POL-2.3, POL-2.4 (strict type regime)**

All strict-family flags on: `strict`, `noImplicitAny` (POL-2.3's compiler half),
`strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`,
`strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`, plus
`noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns` (POL-2.4 support),
`noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`,
`forceConsistentCasingInFileNames` (POL-2.1 kebab-case cross-OS safety),
`esModuleInterop`, `skipLibCheck`.

Weakening any strict flag is a POL-2.3/POL-6.2 violation (CRITICAL per the
[violation severity matrix](../skills/policy-enforcer/reference/violation-severity.md)).

## `jest.config.js`
**Enforces: POL-3.2, POL-3.4**

| Setting | Policy | What it enforces |
|---|---|---|
| `coverageThreshold.global: 80%` | POL-3.2 | Business-logic floor |
| `coverageThreshold['src/utils/']: 100%` | POL-3.2 | Utilities floor |
| `coverageThreshold['src/controllers/']: 70%` | POL-3.2 | Controllers floor |
| `clearMocks`/`restoreMocks: true` | POL-3.4 | No mock state bleeding between tests |

## `lint-staged.config.js` + `hooks/pre-commit`
**Enforces: POL-6.2 (pre-commit stage), POL-2.2, Policy Domain 2**

The hook runs `eslint --fix` + `prettier --write` on staged files, then
`npm run type-check`; failure messages cite the violated policy. The hook is the local
echo of the CI gates — CI (`ci/github/quality.yml`) remains the authoritative,
inviolable gate (POL-6.2): bypassing the hook locally (`--no-verify`) only moves the
failure to CI, it cannot merge past it.
