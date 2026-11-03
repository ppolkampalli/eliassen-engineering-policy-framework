import { startSteps } from './get-started-content';
import { clientJourneys } from './journeys-content';
import { roleProfiles } from './roles-content';
import { skillCatalog } from './skills-catalog';
import { getPolicy, getWorkflow } from '../domain/registry';

describe('marketing content — the stay-consistent guarantee (POL-10.6)', () => {
  it('should reference only policies that exist when listing role-owned policies', () => {
    const missing = roleProfiles.flatMap((profile) =>
      profile.ownedPolicies.filter((policyRef) => getPolicy(policyRef) === undefined)
    );
    expect(missing).toEqual([]);
  });

  it('should cover all eight roles with non-empty pitches and invocations', () => {
    expect(roleProfiles.length).toBe(8);
    for (const profile of roleProfiles) {
      expect(profile.pitch.length).toBeGreaterThan(50);
      expect(profile.invocation.length).toBeGreaterThan(10);
      expect(profile.ownedPolicies.length).toBeGreaterThan(0);
    }
  });

  it('should reference only policies and workflows that exist in the start-here steps', () => {
    const missingLaws = startSteps.flatMap((step) =>
      step.policyRefs.filter((policyRef) => getPolicy(policyRef) === undefined)
    );
    const missingWorkflows = startSteps.flatMap((step) =>
      (step.workflowRefs ?? []).filter((workflowRef) => getWorkflow(workflowRef) === undefined)
    );
    expect(missingLaws).toEqual([]);
    expect(missingWorkflows).toEqual([]);
  });

  it('should give every step a checkpoint so progress is verifiable (POL-10.2 spirit)', () => {
    for (const step of startSteps) {
      expect(step.checkpoint.length).toBeGreaterThan(10);
    }
  });

  it('should reference only policies and workflows that exist in the client journeys', () => {
    const missingLaws = clientJourneys.flatMap((journey) =>
      journey.policyRefs.filter((policyRef) => getPolicy(policyRef) === undefined)
    );
    const missingWorkflows = clientJourneys.flatMap((journey) =>
      journey.workflowRefs.filter((workflowRef) => getWorkflow(workflowRef) === undefined)
    );
    expect(missingLaws).toEqual([]);
    expect(missingWorkflows).toEqual([]);
  });

  it('should give every journey five stages that travel from pain to win', () => {
    expect(clientJourneys.length).toBe(7);
    for (const journey of clientJourneys) {
      expect(journey.stages.length).toBe(5);
      expect(journey.stages[0]?.mood).toBe('pain');
      expect(journey.stages[journey.stages.length - 1]?.mood).toBe('win');
      expect(journey.before.length).toBeGreaterThan(2);
      expect(journey.after.length).toBeGreaterThan(2);
    }
  });

  it('should catalog all 17 installable skills grouped 8/3/6 with valid command slugs', () => {
    expect(skillCatalog.length).toBe(17);
    const byCategory = (category: string): number =>
      skillCatalog.filter((skill) => skill.category === category).length;
    expect(byCategory('Role')).toBe(8);
    expect(byCategory('Orchestration')).toBe(3);
    expect(byCategory('Enforcement')).toBe(6);
    for (const skill of skillCatalog) {
      // Command slug must be a valid skill directory / invocation name.
      expect(skill.command).toMatch(/^[a-z][a-z-]*[a-z]$/);
      expect(skill.examples.length).toBeGreaterThan(0);
      expect(skill.summary.length).toBeGreaterThan(20);
    }
  });

  it('should give all 8 roles a role- command matching the flattened skill dirs', () => {
    const personaCommands = skillCatalog
      .filter((skill) => skill.category === 'Role')
      .map((skill) => skill.command);
    expect(personaCommands).toContain('role-security');
    expect(personaCommands).toContain('role-finops');
    expect(personaCommands.every((command) => command.startsWith('role-'))).toBe(true);
  });
});
