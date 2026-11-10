import { render, screen, waitFor } from '@testing-library/react';

import { OverviewDashboard } from './overview-dashboard';
import { deriveWorkItems } from '../lib/board-model';
import type { CostReport } from '../lib/token-cost-model';
import type { AdrResponse, BoardEvent, StageEvent } from '../lib/types';

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 800 });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 280 });
});

function stageEvent(overrides: Partial<StageEvent> & Pick<StageEvent, 'workItem' | 'timestamp'>): StageEvent {
  return {
    schemaVersion: '1.0',
    eventType: 'stageEvent',
    workflowId: 'WF-FEATURE',
    stageId: 'requirements',
    role: 'product-owner',
    status: 'entered',
    humanCheckpoint: 'none',
    ...overrides,
  };
}

const emptyCostReport: CostReport = {
  totalCostUsd: 0,
  unpricedRecordCount: 0,
  unattributedRecordCount: 0,
  byWorkItem: [],
  byWorkflow: [],
  byStage: [],
  byRole: [],
  byModel: [],
  timeSeries: [],
};

function mockFetchResponses(costReport: CostReport, adrResponse: AdrResponse): void {
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url === '/api/token-usage') {
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(costReport) });
    }
    if (url === '/api/adr') {
      return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(adrResponse) });
    }
    return Promise.reject(new Error(`unexpected fetch: ${url}`));
  });
}

/** Reads a StatTile's big value by its label, scoped to that tile's own card — avoids false matches against another tile or a chart axis sharing the same digit. */
function tileValue(label: string): string | null {
  const paper = screen.getByText(label).closest('.MuiPaper-root');
  return paper?.querySelector('h5')?.textContent ?? null;
}

describe('OverviewDashboard', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('summarizes work items by lane, citations, and test pass rate', async () => {
    mockFetchResponses(emptyCostReport, { records: [], mtimeMs: null });
    const events: BoardEvent[] = [
      stageEvent({
        workItem: 'JIRA-1',
        timestamp: '2026-01-01T00:00:00Z',
        policyCitations: ['POL-3.1'],
        testResults: [{ acId: 'AC-1', testId: 'unit-1', testType: 'unit', status: 'pass' }],
      }),
      {
        schemaVersion: '1.0',
        eventType: 'workflowCompleted',
        workItem: 'JIRA-2',
        workflowId: 'WF-BUG',
        timestamp: '2026-01-01T00:00:00Z',
      },
    ];
    render(<OverviewDashboard events={events} workItems={deriveWorkItems(events)} />);

    await waitFor(() => expect(tileValue('Tests passing')).toBe('1/1'));
    expect(tileValue('Work items')).toBe('2');
    expect(tileValue('In progress')).toBe('1');
    expect(tileValue('Blocked')).toBe('0');
    expect(tileValue('Done')).toBe('1');
    expect(tileValue('Policy citations')).toBe('1');
    expect(screen.getByText('100% passing')).toBeTruthy();
  });

  it('shows a dash for tests until cost and ADR totals arrive, then shows loaded totals', async () => {
    mockFetchResponses(
      { ...emptyCostReport, totalCostUsd: 2.5, byWorkflow: [{ key: 'WF-BUG', count: 2.5 }] },
      { records: [{ filename: '0001-first.md', title: 'ADR-0001', content: '# ADR-0001' }], mtimeMs: 1 }
    );
    const events: BoardEvent[] = [stageEvent({ workItem: 'JIRA-1', timestamp: '2026-01-01T00:00:00Z' })];
    render(<OverviewDashboard events={events} workItems={deriveWorkItems(events)} />);

    expect(tileValue('Tests passing')).toBe('—');
    await waitFor(() => expect(tileValue('Total cost')).toBe('$2.50'));
    expect(tileValue('ADR documents')).toBe('1');
    expect(screen.getAllByText('WF-BUG').length).toBeGreaterThan(0);
  });
});
