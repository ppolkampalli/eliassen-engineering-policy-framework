import { Link } from 'react-router-dom';

import { getPolicy } from '../domain/registry';

interface LawLinkProps {
  policyId: string;
}

/**
 * A policy citation chip: shows the live id+version+title from the registry and
 * links into the policy browser. Renders the bare id if the policy is unknown
 * (content-integrity tests should prevent that ever shipping).
 */
export function PolicyLink({ policyId }: LawLinkProps): JSX.Element {
  const policy = getPolicy(policyId);
  if (policy === undefined) {
    return <span className="policy-chip policy-chip-unknown">{policyId}</span>;
  }
  return (
    <Link
      className="policy-chip"
      to={`/policies?q=${encodeURIComponent(policy.id)}`}
      title={policy.statement}
    >
      [{policy.id} v{policy.version}] {policy.title}
    </Link>
  );
}
