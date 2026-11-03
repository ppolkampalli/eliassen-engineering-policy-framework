import { getAllPolicies, getAllWorkflows, getPolicy, getWorkflow, searchPolicies } from './registry';

describe('getAllPolicies', () => {
  it('should expose every policy from the live registry when loaded', () => {
    const policies = getAllPolicies();
    // The policy framework currently has 57 policies; assert a sane lower bound so the
    // test survives future policy changes without becoming hollow (POL-3.5).
    expect(policies.length).toBeGreaterThanOrEqual(57);
    expect(policies[0]?.id).toMatch(/^POL-\d+\.\d+$/);
  });
});

describe('getPolicy', () => {
  it('should return the policy record when the id exists', () => {
    const policy = getPolicy('POL-2.3');
    expect(policy?.title).toContain('any');
    expect(policy?.statement.length).toBeGreaterThan(0);
  });

  it('should return undefined when the id does not exist', () => {
    expect(getPolicy('POL-99.9')).toBeUndefined();
  });
});

describe('searchPolicies', () => {
  it('should match by id when the query is a policy id fragment', () => {
    const results = searchPolicies('10.6');
    expect(results.some((policy) => policy.id === 'POL-10.6')).toBe(true);
  });

  it('should match by title and statement text when the query is a word', () => {
    const results = searchPolicies('mutation');
    expect(results.some((policy) => policy.id === 'POL-3.6')).toBe(true);
  });

  it('should return all policies when the query is empty', () => {
    expect(searchPolicies('').length).toBe(getAllPolicies().length);
  });
});

describe('getAllWorkflows / getWorkflow', () => {
  it('should expose the six catalog workflows when loaded', () => {
    const workflows = getAllWorkflows();
    expect(workflows.length).toBeGreaterThanOrEqual(6);
    expect(getWorkflow('WF-FEATURE')?.chain).toContain('product-owner');
  });

  it('should return undefined when the workflow id does not exist', () => {
    expect(getWorkflow('WF-NOPE')).toBeUndefined();
  });
});
