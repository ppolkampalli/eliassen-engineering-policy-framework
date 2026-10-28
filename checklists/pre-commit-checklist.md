# Pre-Commit Checklist

Self-check before every commit — the human half of what `hooks/pre-commit` enforces
mechanically. Every item annotated with its policy.

## Mechanical (the hook runs these — verify they ran)

- [ ] `eslint --fix` + `prettier --write` on staged files passed (POL-2.2, Policy Domain 2)
- [ ] `npm run type-check` passed — no new `any`, strict flags intact (POL-2.3, POL-2.4)

## Tests

- [ ] The failing test came first; red→green→refactor evidence will be visible in
      history (POL-3.1)
- [ ] `npm test` green locally; coverage floors hold (POL-3.2)
- [ ] No `.skip` added without a ticket reference (POL-3.5)

## Content

- [ ] No secrets, tokens, keys, or connection strings in the diff — check config
      files and test fixtures too (POL-5.3)
- [ ] No debug logging left behind; no `console.log` of payloads that may carry
      PII (POL-5.3, POL-7.2)
- [ ] No TODO without ticket+context (POL-1.2)
- [ ] New literals with meaning are named constants (POL-2.6)
- [ ] Comments added are WHY, not WHAT (POL-6.4)

## Commit Message

- [ ] Conventional Commits format per
      [commit-message-guide.md](../templates/commit-message-guide.md)
- [ ] `[Claude-assisted]` tag if AI generated any surviving code (POL-7.3)
- [ ] Body explains WHY when the change isn't self-evident (POL-6.4)
- [ ] `policy:` prefix NOT used (reserved for policy change enactments)

## Scope

- [ ] Everything in this commit belongs to the work item; "while I'm here" changes
      are ticketed instead (POL-8.4, POL-1.2)
- [ ] Docs affected by this change are in this same change (POL-6.5)
