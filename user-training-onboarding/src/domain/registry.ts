// Single source of truth (POL-10.6): the app imports the live registries from
// the repo root at build time — policy changes propagate on the next build with no
// content copying.
import policyRegistry from '../../../policies/registry.json';
import workflowRegistry from '../../../workflows/registry.json';

export interface Policy {
  id: string;
  title: string;
  // The snake_case keys below mirror the external registry.json schema, which
  // this app must consume verbatim (single source of truth) — approved POL-2.1
  // exception for external data shape.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  policy_domain: number;
  status: string;
  version: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  owner_roles: string[];
  enforcement: string;
  statement: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  rationale_summary: string;
  file: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  policy_changes: string[];
}

export interface Workflow {
  id: string;
  title: string;
  version: string;
  status: string;
  trigger: string;
  chain: string;
  file: string;
}

const POLICIES: Policy[] = policyRegistry.policies;
const WORKFLOWS: Workflow[] = workflowRegistry.workflows;

/** The policy framework version the app was built against. */
export const POLICY_FRAMEWORK_VERSION: string = policyRegistry.policy_framework_version;

/** All policies, registry order (by policy domain, then number). */
export function getAllPolicies(): Policy[] {
  return POLICIES;
}

/** One policy by exact id, or undefined. */
export function getPolicy(id: string): Policy | undefined {
  return POLICIES.find((policy) => policy.id === id);
}

/**
 * Case-insensitive search over id, title, and statement.
 *
 * @returns All policies for an empty query; matching policies otherwise.
 */
export function searchPolicies(query: string): Policy[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed === '') return POLICIES;
  return POLICIES.filter(
    (policy) =>
      policy.id.toLowerCase().includes(trimmed) ||
      policy.title.toLowerCase().includes(trimmed) ||
      policy.statement.toLowerCase().includes(trimmed)
  );
}

/** Distinct policy domain numbers present in the registry, ascending. */
export function getPolicyDomainNumbers(): number[] {
  return [...new Set(POLICIES.map((policy) => policy.policy_domain))].sort((a, b) => a - b);
}

/** All workflows from the catalog registry. */
export function getAllWorkflows(): Workflow[] {
  return WORKFLOWS;
}

/** One workflow by exact id, or undefined. */
export function getWorkflow(id: string): Workflow | undefined {
  return WORKFLOWS.find((workflow) => workflow.id === id);
}
