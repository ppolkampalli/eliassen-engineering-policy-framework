import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { fireEvent, render, screen } from '@testing-library/react';

import { PolicyCohort } from './policy-cohort';
import { deriveWorkItems, parseLog } from '../lib/board-model';

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 800 });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 280 });
});

const FIXTURES_DIR = join(__dirname, '../../fixtures');
const { events } = parseLog(readFileSync(join(FIXTURES_DIR, 'events.sample.jsonl'), 'utf8'));
const workItems = deriveWorkItems(events);

describe('PolicyCohort', () => {
  it('defaults to the workflow cohort view', () => {
    render(<PolicyCohort events={events} workItems={workItems} />);
    expect(screen.getByText('WF-BUG')).toBeTruthy();
    expect(screen.getByText('WF-FEATURE')).toBeTruthy();
    expect(screen.getByText('WF-REFACTOR')).toBeTruthy();
  });

  it('switches to the policies bar chart when Policies is selected', () => {
    render(<PolicyCohort events={events} workItems={workItems} />);
    fireEvent.click(screen.getByRole('button', { name: 'Policies' }));
    expect(screen.getByText('POL-8.1')).toBeTruthy();
  });

  it('switches to the roles bar chart when Roles is selected', () => {
    render(<PolicyCohort events={events} workItems={workItems} />);
    fireEvent.click(screen.getByRole('button', { name: 'Roles' }));
    expect(screen.getByText('role-quality')).toBeTruthy();
  });
});
