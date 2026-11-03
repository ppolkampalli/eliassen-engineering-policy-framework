import { useSearchParams } from 'react-router-dom';

import { PolicyBrowser } from '../components/policy-browser';
import { POLICY_FRAMEWORK_VERSION, getAllPolicies } from '../domain/registry';

/** The policy browser page; supports ?q= deep links from policy citation chips. */
export function PoliciesPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  return (
    <div className="policies-page">
      <h1>Policy Browser</h1>
      <p>
        All {getAllPolicies().length} policies of policy framework v{POLICY_FRAMEWORK_VERSION}, rendered live from
        the registry — when a policy change is enacted, this page reflects it on the next build.
      </p>
      <PolicyBrowser initialQuery={initialQuery} />
    </div>
  );
}
