import type { PolicyRef, WorkflowRef } from './content-types';

/**
 * The step-by-step "new development" walkthrough for the Start Here page.
 * Policy/workflow refs are validated against the live registries by
 * marketing-content.spec.ts.
 */
export interface StartStep {
  id: string;
  title: string;
  /** The sell: why this step pays off, in 1–3 sentences. */
  narrative: string;
  /** Terminal commands shown in a console block (empty = no commands). */
  commands: string[];
  /** What you should see / what "done" looks like for this step. */
  checkpoint: string;
  /** A ready-to-paste prompt for handing this step to a coding agent instead of a human running the commands. */
  agentPrompt?: string;
  policyRefs: PolicyRef[];
  workflowRefs?: WorkflowRef[];
}

export const startSteps: StartStep[] = [
  {
    id: 'install',
    title: 'Install the policy framework into your project',
    narrative:
      'One command delivers the whole kit: lint/type/test configs, the pre-commit hook, CI workflows, the PR template, eight roles, every enforcement skill, both agent steering files, and the full policy registry for offline citation. No meetings about coding standards. Ever. (Want just the roles and skills to develop with — not the full stack? Install the Claude Code plugin instead, second command below. On Cursor instead of Claude Code? Same installer, add --ide cursor — see the Cursor lesson in the Greenfield module.) Already have the framework repo checked out next to this project? Skip the commands — hand your coding agent the prompt below instead.',
    commands: [
      'git clone <engineering-constitution-repo>',
      './engineering-constitution/scripts/install.sh /path/to/your-project',
      '# — or, for the agentic layer only, inside Claude Code —',
      '/plugin marketplace add ppolkampalli/eliassen-engineering-constitution',
      '/plugin install engineering-policy-framework',
      '# — or, on Cursor —',
      './engineering-constitution/scripts/install.sh /path/to/your-project --ide cursor',
    ],
    checkpoint: 'install.sh reports ~36 files installed; or the plugin shows 17 skills available.',
    agentPrompt:
      'The Engineering Policy Framework is checked out as a sibling of this project, at ' +
      '../engineering-constitution (same parent directory, not inside this repo). Before touching ' +
      'anything, confirm that by reading ../engineering-constitution/policies/registry.json and ' +
      'telling me its policy_framework_version — do not proceed if that file is missing.\n\n' +
      'Then, from this project’s root:\n' +
      '1. Run ../engineering-constitution/scripts/install.sh . and show me its full output, including ' +
      'the file count it reports (per POL-10.2, show the output, not a summary of it).\n' +
      '2. List the devDependencies and npm scripts it printed, add them to this project’s ' +
      'package.json, then run npm run prepare to activate the pre-commit hook.\n' +
      '3. Run ../engineering-constitution/scripts/validate.sh . and paste the full RESULT line. If it ' +
      'is not PASS, stop and fix the specific file it names before continuing.\n' +
      '4. Open the CLAUDE.md and AGENTS.md this installed into this project’s root and summarize, in ' +
      'your own words, the roles and workflows they declare.\n' +
      '5. Treat ../engineering-constitution as read-only from here — if a step seems to require ' +
      'editing something inside it, stop and ask me first.\n\n' +
      'Cite the policy ID behind each step as you go (per POL-1.3).',
    policyRefs: ['POL-1.3', 'POL-10.1', 'POL-10.2'],
  },
  {
    id: 'wire',
    title: 'Wire the gates',
    narrative:
      'Add the printed devDependencies and scripts, then activate the hook. From this moment, lint, type-check, and tests run before every commit — the gates are physics now, not policy.',
    commands: [
      'npm install --save-dev typescript prettier eslint jest ts-jest husky lint-staged \\',
      '  @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import \\',
      '  eslint-import-resolver-typescript eslint-config-prettier @types/jest',
      'npm run prepare',
    ],
    checkpoint: 'A commit with a type error is rejected by the hook, citing the policy it broke.',
    policyRefs: ['POL-6.2', 'POL-2.3'],
  },
  {
    id: 'verify-install',
    title: 'Prove the installation',
    narrative:
      'Trust, but verify — the policy framework’s own habit, applied to itself. The validator runs ~25 checks: configs present, strict flags intact, hook executable, registry in sync with the source repo.',
    commands: ['./engineering-constitution/scripts/validate.sh /path/to/your-project'],
    checkpoint: 'RESULT: PASS. Anything else tells you exactly which file to fix.',
    policyRefs: ['POL-1.3'],
  },
  {
    id: 'steering',
    title: 'Meet your steering files',
    narrative:
      'CLAUDE.md and AGENTS.md are now in your repo root — the rules every coding agent reads at session start. Treat them like code: keep them lean, prune what the agent already does right, and move any must-always-hold rule into a hook instead of prose.',
    commands: [],
    checkpoint:
      'Open CLAUDE.md — your agent now cites policies, declares workflows, and stops to ask instead of guessing.',
    policyRefs: ['POL-10.4', 'POL-7.5'],
  },
  {
    id: 'first-ticket',
    title: 'Pick up your first ticket — and declare the workflow',
    narrative:
      'Say it out loud: "run WF-FEATURE on TICKET-123." The orchestrator announces the chain — PO writes acceptance criteria, Architect places the work, Quality writes the test list, you (or your agent) implement, fresh-context review, security pass, release check. No stage gets forgotten, because the sequence is declared, not remembered.',
    commands: [
      '# In your agent session — natural language:',
      '“Run WF-FEATURE on TICKET-123”',
      '# — or the explicit skill command —',
      '/engineering-policy-framework:workflow-orchestrator',
    ],
    checkpoint:
      'The orchestrator prints the stage chain with hard markers before any code is written.',
    policyRefs: ['POL-10.6', 'POL-8.1'],
    workflowRefs: ['WF-FEATURE'],
  },
  {
    id: 'watch-the-board',
    title: 'Watch it run — open the agent board',
    narrative:
      'Copy in agent-board/, a small local Vite + React viewer with its own tiny Node API, and the orchestrator starts appending one JSON line per stage transition to a local log — best-effort, never blocking the workflow it reports on. Open the page and the ticket shows up as a card moving across In Progress, Blocked, and Done, with the agent’s own notes and policy citations attached to every move.',
    commands: [
      'cp -r engineering-constitution/agent-board ./agent-board',
      'cd agent-board && npm install && npm run dev',
      '# open http://localhost:5173 — it reads .claude/board/events.local.jsonl automatically',
    ],
    checkpoint: 'The card for your ticket updates live as the workflow advances — no refresh needed in any browser.',
    policyRefs: ['POL-7.3', 'POL-4.6'],
    workflowRefs: ['WF-FEATURE'],
  },
  {
    id: 'build',
    title: 'Build test-first — with evidence',
    narrative:
      'The test list comes from the acceptance criteria; implementation makes one failing test pass at a time. Agents work the same loop and must show the receipts: test output, not "should work." A failing test is never deleted to reach green — by policy.',
    commands: ['npm test -- --watch', '# agent: “show the failing test, then make it pass”'],
    checkpoint: 'Every behavior in the ACs has a named test; the agent’s last message includes test output.',
    policyRefs: ['POL-3.1', 'POL-10.2'],
  },
  {
    id: 'ship',
    title: 'Review fresh, gate hard, ship tagged',
    narrative:
      'A context that did not write the code reviews it. Gates run green — there is no override path to argue about. AI-assisted commits carry the [Claude-assisted] tag and the PR says what the human verified. Then it ships, with a rollback path that already exists.',
    commands: [
      'npm run lint && npm run type-check && npm test',
      'git commit -m "feat: TICKET-123 export endpoint [Claude-assisted]"',
    ],
    checkpoint: 'Two human approvals, green gates, AI disclosure complete — merge.',
    policyRefs: ['POL-10.5', 'POL-6.2', 'POL-7.3', 'POL-9.2'],
  },
  {
    id: 'when-stuck',
    title: 'When you’re unsure — look it up, or ask',
    narrative:
      'Every rule has an ID, a rationale, and a lookup tool; every judgment call has a role; every conflict has an escalation path. You are never arguing against a vibe — you are reading a policy, or summoning the role that owns it.',
    commands: [
      './engineering-constitution/scripts/policy-lookup.sh POL-2.3',
      '# or, with the plugin: “as the Quality role, is this tested enough?”',
      '# or explicitly: /engineering-policy-framework:role-quality',
    ],
    checkpoint: 'You cited a policy in a review comment and nobody argued. Welcome aboard.',
    policyRefs: ['POL-7.5'],
  },
];
