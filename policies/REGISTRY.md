# Policy Registry

**Engineering Policy Framework v2.0.0** · Ratified 2026-06-01 · 57 policies

Human-readable index of every policy. Machine-readable mirror: [registry.json](registry.json).
Look up any policy from the command line: `./scripts/policy-lookup.sh POL-2.3`.

Policies change only through the [Policy Change Process](../policy-changes/POLICY-CHANGE-PROCESS.md);
this registry and the policy files are kept in lockstep by the `policy-integrity` CI workflow.

| ID | Title | Policy Domain | Status | Version | Owner Roles | Enforcement |
|---|---|---|---|---|---|---|
| [POL-1.1](domain-1-foundational-principles/POL-1.1.md) | Code is Written for Humans First | 1 — Foundational Principles | ACTIVE | 1.0 | software-engineer, quality | review |
| [POL-1.2](domain-1-foundational-principles/POL-1.2.md) | Quality is Built-In, Never Added Later | 1 — Foundational Principles | ACTIVE | 1.0 | quality | review |
| [POL-1.3](domain-1-foundational-principles/POL-1.3.md) | Consistency Enables Collaboration | 1 — Foundational Principles | ACTIVE | 1.0 | quality, devops | automated |
| [POL-1.4](domain-1-foundational-principles/POL-1.4.md) | Architecture Decisions Are Intentional | 1 — Foundational Principles | ACTIVE | 1.0 | architect | review |
| [POL-1.5](domain-1-foundational-principles/POL-1.5.md) | Security is Everybody's Responsibility | 1 — Foundational Principles | ACTIVE | 1.0 | security | review |
| [POL-2.1](domain-2-code-standards/POL-2.1.md) | Naming Conventions | 2 — Code Standards | ACTIVE | 1.0 | software-engineer, quality | automated |
| [POL-2.2](domain-2-code-standards/POL-2.2.md) | Formatting via Prettier | 2 — Code Standards | ACTIVE | 1.0 | software-engineer, quality | automated |
| [POL-2.3](domain-2-code-standards/POL-2.3.md) | Prohibition of the any Type | 2 — Code Standards | ACTIVE | 1.0 | software-engineer, quality | automated |
| [POL-2.4](domain-2-code-standards/POL-2.4.md) | Explicit Return Types on Exported Functions | 2 — Code Standards | ACTIVE | 1.0 | software-engineer, quality | automated |
| [POL-2.5](domain-2-code-standards/POL-2.5.md) | Import Ordering | 2 — Code Standards | ACTIVE | 1.0 | software-engineer, quality | automated |
| [POL-2.6](domain-2-code-standards/POL-2.6.md) | Function Size and Responsibility | 2 — Code Standards | ACTIVE | 1.1 | software-engineer, quality | review |
| [POL-3.1](domain-3-testing-quality/POL-3.1.md) | Test-First Development | 3 — Testing & Quality | ACTIVE | 1.1 | quality, software-engineer | role |
| [POL-3.2](domain-3-testing-quality/POL-3.2.md) | Coverage Floors | 3 — Testing & Quality | ACTIVE | 1.0 | quality, software-engineer | automated |
| [POL-3.3](domain-3-testing-quality/POL-3.3.md) | Test Structure | 3 — Testing & Quality | ACTIVE | 1.0 | quality, software-engineer | review |
| [POL-3.4](domain-3-testing-quality/POL-3.4.md) | Test Isolation | 3 — Testing & Quality | ACTIVE | 1.0 | quality, software-engineer | review |
| [POL-3.5](domain-3-testing-quality/POL-3.5.md) | No Skipped or Hollow Tests | 3 — Testing & Quality | ACTIVE | 1.0 | quality, software-engineer | review |
| [POL-3.6](domain-3-testing-quality/POL-3.6.md) | Mutation Testing Verifies Test Effectiveness | 3 — Testing & Quality | ACTIVE | 1.0 | quality, software-engineer | automated |
| [POL-4.1](domain-4-architecture/POL-4.1.md) | Layered Architecture | 4 — Architecture | ACTIVE | 1.1 | architect | review |
| [POL-4.2](domain-4-architecture/POL-4.2.md) | SOLID Compliance | 4 — Architecture | ACTIVE | 1.0 | architect | review |
| [POL-4.3](domain-4-architecture/POL-4.3.md) | No Circular Dependencies | 4 — Architecture | ACTIVE | 1.0 | architect | automated |
| [POL-4.4](domain-4-architecture/POL-4.4.md) | Sanctioned Patterns | 4 — Architecture | ACTIVE | 1.0 | architect | review |
| [POL-4.5](domain-4-architecture/POL-4.5.md) | ADR Requirement | 4 — Architecture | ACTIVE | 1.0 | architect | review |
| [POL-4.6](domain-4-architecture/POL-4.6.md) | Resilience Patterns | 4 — Architecture | ACTIVE | 1.0 | architect, devops | review |
| [POL-5.1](domain-5-security/POL-5.1.md) | Universal Input Validation | 5 — Security | ACTIVE | 1.0 | security | review |
| [POL-5.2](domain-5-security/POL-5.2.md) | Parameterized Queries Only | 5 — Security | ACTIVE | 1.0 | security | review |
| [POL-5.3](domain-5-security/POL-5.3.md) | Secrets Never in Code | 5 — Security | ACTIVE | 1.0 | security | automated |
| [POL-5.4](domain-5-security/POL-5.4.md) | Established Auth Frameworks Only | 5 — Security | ACTIVE | 1.0 | security | review |
| [POL-5.5](domain-5-security/POL-5.5.md) | Dependency Hygiene | 5 — Security | ACTIVE | 1.0 | security | automated |
| [POL-5.6](domain-5-security/POL-5.6.md) | Encryption Standards | 5 — Security | ACTIVE | 1.0 | security | review |
| [POL-6.1](domain-6-review-documentation/POL-6.1.md) | Two-Approval Review | 6 — Review & Documentation | ACTIVE | 1.0 | quality | automated |
| [POL-6.2](domain-6-review-documentation/POL-6.2.md) | Quality Gates Are Inviolable | 6 — Review & Documentation | ACTIVE | 1.0 | quality | automated |
| [POL-6.3](domain-6-review-documentation/POL-6.3.md) | Public API Documentation | 6 — Review & Documentation | ACTIVE | 1.0 | quality, architect | review |
| [POL-6.4](domain-6-review-documentation/POL-6.4.md) | Comments Explain WHY | 6 — Review & Documentation | ACTIVE | 1.1 | quality, architect | review |
| [POL-6.5](domain-6-review-documentation/POL-6.5.md) | Docs Travel With Code | 6 — Review & Documentation | ACTIVE | 1.0 | quality, architect | review |
| [POL-7.1](domain-7-ai-governance/POL-7.1.md) | Human Accountability | 7 — AI Governance | ACTIVE | 1.0 | quality, security | review |
| [POL-7.2](domain-7-ai-governance/POL-7.2.md) | IP and Data Protection | 7 — AI Governance | ACTIVE | 1.0 | security, quality | role |
| [POL-7.3](domain-7-ai-governance/POL-7.3.md) | AI Audit Trail | 7 — AI Governance | ACTIVE | 1.0 | quality, devops | review |
| [POL-7.4](domain-7-ai-governance/POL-7.4.md) | Identical Standards for AI Code | 7 — AI Governance | ACTIVE | 1.0 | quality, security | review |
| [POL-7.5](domain-7-ai-governance/POL-7.5.md) | Mandatory Escalation on Uncertainty | 7 — AI Governance | ACTIVE | 1.0 | quality, security | role |
| [POL-7.6](domain-7-ai-governance/POL-7.6.md) | AI-Era Code-Health Metrics | 7 — AI Governance | ACTIVE | 1.0 | quality, architect | review |
| [POL-8.1](domain-8-requirements-domain/POL-8.1.md) | Acceptance Criteria Before Implementation | 8 — Requirements & Domain | ACTIVE | 1.0 | product-owner | role |
| [POL-8.2](domain-8-requirements-domain/POL-8.2.md) | Business Rules Are Documented and Cited | 8 — Requirements & Domain | ACTIVE | 1.0 | industry-sme | review |
| [POL-8.3](domain-8-requirements-domain/POL-8.3.md) | Regulatory Mapping | 8 — Requirements & Domain | ACTIVE | 1.0 | industry-sme | review |
| [POL-8.4](domain-8-requirements-domain/POL-8.4.md) | Scope Discipline | 8 — Requirements & Domain | ACTIVE | 1.0 | product-owner | role |
| [POL-9.1](domain-9-operations-cost/POL-9.1.md) | Infrastructure as Code | 9 — Operations & Cost | ACTIVE | 1.0 | devops | review |
| [POL-9.2](domain-9-operations-cost/POL-9.2.md) | Deployment Safety | 9 — Operations & Cost | ACTIVE | 1.0 | devops | review |
| [POL-9.3](domain-9-operations-cost/POL-9.3.md) | Cost Impact Assessment | 9 — Operations & Cost | ACTIVE | 1.0 | finops | role |
| [POL-9.4](domain-9-operations-cost/POL-9.4.md) | License Compliance | 9 — Operations & Cost | ACTIVE | 1.0 | finops | role |
| [POL-9.5](domain-9-operations-cost/POL-9.5.md) | Service-Level Objectives | 9 — Operations & Cost | ACTIVE | 1.0 | devops, product-owner | review |
| [POL-9.6](domain-9-operations-cost/POL-9.6.md) | Error-Budget Policy | 9 — Operations & Cost | ACTIVE | 1.0 | devops, product-owner | review |
| [POL-9.7](domain-9-operations-cost/POL-9.7.md) | Failure-Injection and Recovery Testing | 9 — Operations & Cost | ACTIVE | 1.0 | devops | review |
| [POL-10.1](domain-10-agentic-development/POL-10.1.md) | Spec-Driven Agent Work | 10 — Agentic Development | ACTIVE | 1.0 | software-engineer, product-owner | role |
| [POL-10.2](domain-10-agentic-development/POL-10.2.md) | Verifiable Completion | 10 — Agentic Development | ACTIVE | 1.0 | quality, software-engineer | role |
| [POL-10.3](domain-10-agentic-development/POL-10.3.md) | Agent Sandboxing and Permissions | 10 — Agentic Development | ACTIVE | 1.0 | security, devops | review |
| [POL-10.4](domain-10-agentic-development/POL-10.4.md) | Steering Files Are Governed Artifacts | 10 — Agentic Development | ACTIVE | 1.0 | software-engineer, quality | review |
| [POL-10.5](domain-10-agentic-development/POL-10.5.md) | Fresh-Context Review | 10 — Agentic Development | ACTIVE | 1.0 | quality | role |
| [POL-10.6](domain-10-agentic-development/POL-10.6.md) | Defined Workflows | 10 — Agentic Development | ACTIVE | 1.0 | product-owner, quality | role |
