import { Box } from '@mui/material';

import { BarCohortChart } from './bar-cohort-chart';
import { StatTile } from './stat-tile';
import { useAdrRecords } from '../hooks/use-adr-records';
import { useTokenUsage } from '../hooks/use-token-usage';
import { aggregateByPolicy } from '../lib/cohort-model';
import { formatUsd } from '../lib/token-cost-model';
import { aggregateTestResults } from '../lib/traceability-model';
import type { BoardEvent, WorkItem } from '../lib/types';

const ROW_SX = { display: 'flex', gap: 2, flexWrap: 'wrap' } as const;
const TOP_POLICY_COUNT = 5;

interface OverviewDashboardProps {
  events: BoardEvent[];
  workItems: Map<string, WorkItem>;
}

/** The landing dashboard: at-a-glance KPIs rolled up from every other tab's own data (work items, tests, cost, ADRs, policy citations). */
export function OverviewDashboard({ events, workItems }: OverviewDashboardProps): JSX.Element {
  const { report: costReport } = useTokenUsage();
  const { records: adrRecords } = useAdrRecords();

  const items = [...workItems.values()];
  const inProgress = items.filter((item) => item.lane === 'inProgress').length;
  const blocked = items.filter((item) => item.lane === 'blocked').length;
  const done = items.filter((item) => item.lane === 'done').length;
  const citationTotal = items.reduce((sum, item) => sum + item.citationCount, 0);
  const testSummary = aggregateTestResults(workItems);
  const passRate = testSummary.total === 0 ? null : Math.round((testSummary.pass / testSummary.total) * 100);
  const topPolicies = aggregateByPolicy(events).slice(0, TOP_POLICY_COUNT);

  return (
    <div className="cohort-panel">
      <Box sx={ROW_SX}>
        <StatTile label="Work items" value={String(items.length)} />
        <StatTile label="In progress" value={String(inProgress)} />
        <StatTile label="Blocked" value={String(blocked)} />
        <StatTile label="Done" value={String(done)} />
      </Box>

      <Box sx={{ ...ROW_SX, marginTop: 2 }}>
        <StatTile label="Policy citations" value={String(citationTotal)} />
        <StatTile
          label="Tests passing"
          value={testSummary.total === 0 ? '—' : `${testSummary.pass}/${testSummary.total}`}
          caption={passRate === null ? undefined : `${passRate}% passing`}
        />
        <StatTile label="Total cost" value={costReport ? formatUsd(costReport.totalCostUsd) : '—'} />
        <StatTile label="ADR documents" value={String(adrRecords.length)} />
      </Box>

      <Box sx={{ ...ROW_SX, marginTop: 2 }}>
        <BarCohortChart title="Top cited policies" data={topPolicies} />
        <BarCohortChart title="Cost by workflow" data={costReport?.byWorkflow ?? []} />
      </Box>
    </div>
  );
}
