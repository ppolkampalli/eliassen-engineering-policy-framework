import { useState } from 'react';

import type { Policy } from '../domain/registry';
import { getPolicyDomainNumbers, searchPolicies } from '../domain/registry';

const ALL_DOMAINS = 0;

function PolicyCard({ policy }: { policy: Policy }): JSX.Element {
  return (
    <article className="policy-card">
      <header>
        <h3>
          {policy.id} <span className="policy-version">v{policy.version}</span>
        </h3>
        <span className={`policy-status policy-status-${policy.status.toLowerCase()}`}>{policy.status}</span>
      </header>
      <h4>{policy.title}</h4>
      <blockquote>{policy.statement}</blockquote>
      <p className="policy-rationale">{policy.rationale_summary}</p>
      <footer>
        Policy Domain {policy.policy_domain} · Owners: {policy.owner_roles.join(', ')} · Enforcement:{' '}
        {policy.enforcement} · {policy.policy_changes.join(', ')}
      </footer>
    </article>
  );
}

interface PolicyBrowserProps {
  initialQuery?: string;
}

/**
 * Searchable browser over every policy, rendered live from policies/registry.json —
 * policy changes propagate here automatically on the next build.
 */
export function PolicyBrowser({ initialQuery = '' }: PolicyBrowserProps): JSX.Element {
  const [query, setQuery] = useState(initialQuery);
  const [policyDomain, setPolicyDomain] = useState(ALL_DOMAINS);

  const matches = searchPolicies(query).filter(
    (policy) => policyDomain === ALL_DOMAINS || policy.policy_domain === policyDomain
  );

  return (
    <div className="policy-browser">
      <div className="policy-controls">
        <input
          type="search"
          placeholder="Search by id, title, or statement (e.g. 2.3, mutation, secrets)"
          value={query}
          onChange={(event): void => setQuery(event.target.value)}
          aria-label="Search policies"
        />
        <select
          value={policyDomain}
          onChange={(event): void => setPolicyDomain(Number(event.target.value))}
          aria-label="Filter by policy domain"
        >
          <option value={ALL_DOMAINS}>All policy domains</option>
          {getPolicyDomainNumbers().map((domainNumber) => (
            <option key={domainNumber} value={domainNumber}>
              Policy Domain {domainNumber}
            </option>
          ))}
        </select>
      </div>
      <p className="policy-count">
        {matches.length} polic{matches.length === 1 ? 'y' : 'ies'}
      </p>
      {matches.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}
    </div>
  );
}
