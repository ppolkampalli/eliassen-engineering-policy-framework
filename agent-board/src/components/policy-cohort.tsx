import { useMemo, useState } from 'react';

import { BarCohortChart } from './bar-cohort-chart';
import { CohortSelector, type CohortType } from './cohort-selector';
import { WorkflowCohortGraph } from './workflow-cohort-graph';
import { aggregateByPolicy, aggregateByRole, aggregateWorkflowGraph } from '../lib/cohort-model';
import type { BoardEvent, WorkItem } from '../lib/types';

interface PolicyCohortProps {
  events: BoardEvent[];
  workItems: Map<string, WorkItem>;
}

export function PolicyCohort({ events, workItems }: PolicyCohortProps): JSX.Element {
  const [cohortType, setCohortType] = useState<CohortType>('workflow');
  const policyBuckets = useMemo(() => aggregateByPolicy(events), [events]);
  const roleBuckets = useMemo(() => aggregateByRole(events), [events]);
  const workflowGraphs = useMemo(() => aggregateWorkflowGraph(events, workItems), [events, workItems]);

  return (
    <div className="cohort-panel">
      <CohortSelector active={cohortType} onChange={setCohortType} />
      {cohortType === 'workflow' && <WorkflowCohortGraph graphs={workflowGraphs} />}
      {cohortType === 'policies' && <BarCohortChart title="Policies" data={policyBuckets} />}
      {cohortType === 'roles' && <BarCohortChart title="Roles" data={roleBuckets} />}
    </div>
  );
}
