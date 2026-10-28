import { WorkflowExplorer } from '../components/workflow-explorer';
import { getAllWorkflows } from '../domain/registry';

/** The workflow explorer page: every catalog chain with roles and gates. */
export function WorkflowsPage(): JSX.Element {
  return (
    <div className="workflows-page">
      <h1>Workflow Explorer</h1>
      <p>
        The {getAllWorkflows().length} defined workflows (POL-10.6): how work moves between
        roles, stage by stage. Hard stages guard inviolable policies and can never be skipped;
        everything else can be reshaped conversationally — with the deviation recorded.
      </p>
      <WorkflowExplorer />
    </div>
  );
}
