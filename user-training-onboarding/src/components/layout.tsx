import { NavLink, Outlet } from 'react-router-dom';

import { POLICY_FRAMEWORK_VERSION } from '../domain/registry';

/** App shell: header with navigation, content outlet, policy framework version badge. */
export function Layout(): JSX.Element {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-title">
          <NavLink to="/" className="brand">
            <span className="brand-name">
              Eliassen Group <span className="brand-dot">·</span> Agentic SDLC
            </span>
            <span className="brand-tagline">
              Training &amp; Onboarding for the Engineering Policy Framework
            </span>
          </NavLink>
          <span className="version-badge">v{POLICY_FRAMEWORK_VERSION}</span>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end>
            Why
          </NavLink>
          <NavLink to="/journeys">Client Journeys</NavLink>
          <NavLink to="/start">Start Here</NavLink>
          <NavLink to="/roles">Roles</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/policies">Policy Browser</NavLink>
          <NavLink to="/workflows">Workflows</NavLink>
          <NavLink to="/articles">Articles</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        Eliassen Group Engineering Policy Framework — policy text rendered live from the registry; this
        guide updates automatically when policy changes are enacted.
      </footer>
    </div>
  );
}
