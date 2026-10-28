import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App, AppRoutes } from './app';

function renderAt(path: string): void {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('should render the Why manifesto as the landing page when mounted', () => {
    window.localStorage.clear();
    render(<App />);
    expect(screen.getByText(/protects engineers/)).toBeTruthy();
  });

  it('should render the Eliassen Agentic SDLC brand in the header', () => {
    window.localStorage.clear();
    render(<App />);
    expect(screen.getAllByText(/Eliassen Group/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Agentic SDLC/).length).toBeGreaterThan(0);
    expect(screen.getByText('Training & Onboarding for the Engineering Policy Framework')).toBeTruthy();
  });
});

describe('AppRoutes', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should render the Why manifesto when visiting the root', () => {
    renderAt('/');
    expect(screen.getByText(/protects engineers/)).toBeTruthy();
    expect(screen.getByText('Born from six pains you already know')).toBeTruthy();
  });

  it('should render the catalog with all training modules when visiting /learn', () => {
    renderAt('/learn');
    expect(screen.getByText('Learn the Engineering Policy Framework')).toBeTruthy();
    expect(screen.getByText(/Orientation: How the Policy Framework Works/)).toBeTruthy();
    expect(screen.getByText(/Greenfield: Starting a New Application/)).toBeTruthy();
    expect(screen.getByText(/Rewriting an Existing Application/)).toBeTruthy();
    expect(screen.getByText(/Enhancing an Existing Application/)).toBeTruthy();
  });

  it('should render the skill command catalog with namespaced commands when visiting /learn', () => {
    renderAt('/learn');
    expect(screen.getByText('Skill Command Catalog')).toBeTruthy();
    // Appears in both the how-to intro and its catalog card — assert at least one.
    expect(screen.getAllByText('/engineering-policy-framework:role-security').length).toBeGreaterThan(0);
    expect(screen.getByText('/engineering-policy-framework:workflow-orchestrator')).toBeTruthy();
  });

  it('should render a learning path with its lessons and quiz when visiting a module', () => {
    renderAt('/path/orientation');
    expect(screen.getByText(/Lesson 1:/)).toBeTruthy();
    expect(screen.getByText(/Knowledge check/)).toBeTruthy();
  });

  it('should render a not-found message when the module id is unknown', () => {
    renderAt('/path/nonexistent');
    expect(screen.getByText('Unknown learning path')).toBeTruthy();
  });

  it('should render the policy browser with the live policy count when visiting /policies', () => {
    renderAt('/policies');
    expect(screen.getByRole('heading', { name: 'Policy Browser' })).toBeTruthy();
    // The live registry currently holds 57 policies; the count renders from it.
    expect(screen.getByText(/All \d+ policies of policy framework v/)).toBeTruthy();
  });

  it('should render all six workflow chains when visiting /workflows', () => {
    renderAt('/workflows');
    expect(screen.getByText('Workflow Explorer')).toBeTruthy();
    for (const id of ['WF-FEATURE', 'WF-RESEARCH', 'WF-BUG', 'WF-SECBUG', 'WF-REFACTOR', 'WF-POLICY-CHANGE']) {
      expect(screen.getByRole('heading', { name: new RegExp(`^${id}`) })).toBeTruthy();
    }
  });
});
