/**
 * Full catalog of the policy framework's installable skills, grouped for the Learn
 * page. Command slugs match the skill directory / frontmatter name exactly, so
 * the namespaced invocation is `/engineering-policy-framework:<command>`.
 * Kept free of typed PolicyRefs deliberately — this catalog documents COMMANDS and
 * USAGE; the Roles page covers owned-policy detail (and is integrity-tested).
 */
export type SkillCategory = 'Role' | 'Orchestration' | 'Enforcement';

export interface CatalogSkill {
  /** Skill directory + frontmatter name; the part after the plugin namespace. */
  command: string;
  displayName: string;
  category: SkillCategory;
  /** One-line what-it-is. */
  summary: string;
  /** When it triggers / when to reach for it. */
  whenToUse: string;
  /** Natural-language ways to invoke it (work even without the slash command). */
  examples: string[];
}

/** The plugin namespace; full command is `/${PLUGIN_NAMESPACE}:${command}`. */
export const PLUGIN_NAMESPACE = 'engineering-policy-framework';

export const skillCatalog: CatalogSkill[] = [
  // ── Roles ──────────────────────────────────────────────────────────────
  {
    command: 'role-security',
    displayName: 'Security',
    category: 'Role',
    summary: 'Owns Policy Domain 5; holds VETO authority on CRITICAL findings — top of the authority ladder.',
    whenToUse:
      'Code touches authentication, authorization, user input, persistence, secrets, dependencies, or external APIs — or any security question or review.',
    examples: [
      '“Act as the Security role and review this webhook handler.”',
      '“Put on the Security hat — is this query injectable?”',
    ],
  },
  {
    command: 'role-architect',
    displayName: 'Architect',
    category: 'Role',
    summary: 'Owns Policy Domain 4 + POL-1.4; VETO on layer violations and circular dependencies; requires ADRs before significant structural merges.',
    whenToUse:
      'System design, module boundaries, design patterns, ADRs, significant refactors, or new services/dependencies.',
    examples: [
      '“Act as the Architect role and review this module structure.”',
      '“As Architect — does this need an ADR before we merge?”',
    ],
  },
  {
    command: 'role-quality',
    displayName: 'Quality',
    category: 'Role',
    summary: 'Owns Policy Domain 3, POL-6.1/6.2; BLOCKS merges below coverage floors; arbitrates “is this tested enough?”',
    whenToUse:
      'Test strategy, coverage decisions, defect analysis, review standards, mutation scores, or agent-output verification.',
    examples: [
      '“As the Quality role, is this tested enough to merge?”',
      '“Quality role: do these generated tests actually kill mutants?”',
    ],
  },
  {
    command: 'role-software-engineer',
    displayName: 'Software Engineer',
    category: 'Role',
    summary: 'Owns Policy Domain 2, executes POL-3.1; the DEFAULT role for implementation, working within every other role’s constraints.',
    whenToUse:
      'Implementation work — writing or modifying application code, fixing bugs, building features — when no more specific role applies.',
    examples: [
      '“Implement this as the Software Engineer role — cite your policies.”',
      '“Build the feature; self-check against the policy framework before showing me.”',
    ],
  },
  {
    command: 'role-product-owner',
    displayName: 'Product Owner',
    category: 'Role',
    summary: 'Owns POL-8.1/8.4; BLOCKS implementation lacking acceptance criteria; cannot waive quality, security, or review gates.',
    whenToUse:
      'Requirements, scope decisions, acceptance criteria, prioritization, or “what should this do?” questions.',
    examples: [
      '“As Product Owner — is JIRA-3500 in scope, and what are the ACs?”',
      '“PO role: write acceptance criteria for this request.”',
    ],
  },
  {
    command: 'role-industry-sme',
    displayName: 'Industry SME',
    category: 'Role',
    summary: 'Owns POL-8.2/8.3; verifies code matches documented business rules and regulatory mappings (PCI, GDPR, HIPAA).',
    whenToUse:
      'Domain logic, business rules, industry calculations, or regulatory/compliance questions.',
    examples: [
      '“SME role: does this match business rule BR-ACCT-014?”',
      '“As Industry SME — is this path on the PCI compliance map?”',
    ],
  },
  {
    command: 'role-devops',
    displayName: 'DevOps',
    category: 'Role',
    summary: 'Owns POL-9.1/9.2/9.5–9.7; mechanically enforces POL-6.2; BLOCKS deploys without a rollback plan.',
    whenToUse:
      'CI/CD pipelines, git hooks, infrastructure, deployment, environments, releases, SLOs, or error budgets.',
    examples: [
      '“DevOps role: what’s the rollback story for this release?”',
      '“As DevOps — are our SLOs and error-budget policy defined?”',
    ],
  },
  {
    command: 'role-finops',
    displayName: 'FinOps',
    category: 'Role',
    summary: 'Owns POL-9.3/9.4; blocks untagged resources and unevaluated licenses; explicitly subordinate to Security.',
    whenToUse:
      'Cloud cost, resource sizing, licensing decisions, paid APIs/services, or AI/compute budgets.',
    examples: [
      '“FinOps role: what does this enrichment API cost at our volume?”',
      '“As FinOps — is this dependency’s license safe to adopt?”',
    ],
  },
  // ── Orchestration ─────────────────────────────────────────────────────────
  {
    command: 'workflow-orchestrator',
    displayName: 'Workflow Orchestrator',
    category: 'Orchestration',
    summary: 'Drives work through the six defined workflows, assuming the right role at each stage and enforcing hard gates.',
    whenToUse:
      'Starting any nontrivial work item, running a named workflow, or reshaping a flow (“skip the architect stage”).',
    examples: [
      '“Run WF-FEATURE on TICKET-123.”',
      '“Run WF-BUG on this issue, but add an extra security pass.”',
    ],
  },
  {
    command: 'role-council',
    displayName: 'Role Council',
    category: 'Orchestration',
    summary: 'Convenes multiple roles for cross-cutting changes or conflicts; surfaces disagreements verbatim and applies the authority ladder.',
    whenToUse:
      'A new service, major refactor, or a dependency with combined cost + security + architecture implications — or when two roles conflict.',
    examples: [
      '“Convene the role council on this new payments service.”',
      '“Security and FinOps disagree here — run the council.”',
    ],
  },
  {
    command: 'policy-clerk',
    displayName: 'Policy Clerk',
    category: 'Orchestration',
    summary: 'Looks up policies, answers “why does this policy exist?”, and drafts policy changes — never edits policies directly; routes through the policy change process.',
    whenToUse:
      'Looking up a policy by ID or topic, understanding a policy’s history, or proposing a change to the policy framework.',
    examples: [
      '“Look up POL-2.3 and tell me why it exists.”',
      '“Draft a policy change to relax the function-size threshold.”',
    ],
  },
  // ── Enforcement ───────────────────────────────────────────────────────────
  {
    command: 'policy-enforcer',
    displayName: 'Policy Framework Enforcer',
    category: 'Enforcement',
    summary: 'Always-on enforcement for any code work; applies Policy Domains 1–7 as hard rules and self-checks before presenting code.',
    whenToUse:
      'Writing, modifying, reviewing, or generating any code in a governed project — it runs in the background and corrects with citations.',
    examples: [
      '“Self-check this code against the policy framework before I commit.”',
      '(Auto-activates on code work; flags violations with the policy ID.)',
    ],
  },
  {
    command: 'tdd-assistant',
    displayName: 'TDD Assistant',
    category: 'Enforcement',
    summary: 'Enforces test-first development (Canon TDD); shows the failing test before implementation and cites POL-3.1 when asked to “just write the code.”',
    whenToUse: 'Implementing any feature or bugfix — to keep the red → green → refactor discipline.',
    examples: [
      '“Use TDD for this — show me the failing test first.”',
      '(Pushes back, citing POL-3.1, on “skip the tests, just ship it.”)',
    ],
  },
  {
    command: 'code-review-assistant',
    displayName: 'Code Review Assistant',
    category: 'Enforcement',
    summary: 'Runs the article-organized review checklist; every verdict cites a policy, and AI-generated code gets the verify-never-assume lens (POL-7.4).',
    whenToUse: 'Reviewing a pull request, diff, or change — human-authored or AI-generated.',
    examples: [
      '“Review this PR against the policy framework.”',
      '“Code-review this diff in a fresh context and report gaps.”',
    ],
  },
  {
    command: 'security-checker',
    displayName: 'Security Checker',
    category: 'Enforcement',
    summary: 'A focused Policy Domain 5 pass — injection surfaces, secrets, auth, dependency risk, encryption — outputting cited findings with severities.',
    whenToUse:
      'A quick security scan of code, a diff, or a dependency change. (For veto decisions, assume the Security role itself.)',
    examples: [
      '“Run a security check over this diff.”',
      '“Scan this for SQL injection and secret leakage.”',
    ],
  },
  {
    command: 'documentation-generator',
    displayName: 'Documentation Generator',
    category: 'Enforcement',
    summary: 'Enforces the documentation policies — JSDoc on public APIs, WHY-comments, same-PR doc updates — and generates ADRs per POL-4.5.',
    whenToUse: 'Writing or updating docs, documenting a public API, or producing an ADR.',
    examples: [
      '“Generate JSDoc for this module’s public functions.”',
      '“Draft an ADR for the caching decision we just made.”',
    ],
  },
  {
    command: 'ai-transparency',
    displayName: 'AI Transparency',
    category: 'Enforcement',
    summary: 'Enforces AI provenance (POL-7.1–7.3) — the [Claude-assisted] commit tag, the PR AI-assistance disclosure, and data-protection checks.',
    whenToUse: 'Committing or opening a PR for AI-assisted work, or questions about AI tool usage and data exposure.',
    examples: [
      '“Write the AI-assistance disclosure for this PR.”',
      '“Tag this commit correctly — Claude wrote most of it.”',
    ],
  },
];
