import { fireEvent, render, screen } from '@testing-library/react';

import { PolicyBrowser } from './policy-browser';
import { getAllPolicies } from '../domain/registry';


describe('PolicyBrowser', () => {
  it('should show every policy when no filter is applied', () => {
    render(<PolicyBrowser />);
    expect(screen.getByText(`${getAllPolicies().length} policies`)).toBeTruthy();
  });

  it('should filter to the matching policy when searching by id', () => {
    render(<PolicyBrowser />);
    fireEvent.change(screen.getByLabelText('Search policies'), { target: { value: 'POL-2.3' } });
    expect(screen.getByText('1 policy')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /POL-2\.3/ })).toBeTruthy();
  });

  it('should filter by policy domain when a policy domain is selected', () => {
    render(<PolicyBrowser />);
    fireEvent.change(screen.getByLabelText('Filter by policy domain'), { target: { value: '10' } });
    const domain10Count = getAllPolicies().filter((policy) => policy.policy_domain === 10).length;
    expect(screen.getByText(`${domain10Count} policies`)).toBeTruthy();
  });

  it('should honor an initial query when deep-linked', () => {
    render(<PolicyBrowser initialQuery="POL-10.6" />);
    expect(screen.getByText('1 policy')).toBeTruthy();
    expect(screen.getByText('Defined Workflows')).toBeTruthy();
  });
});
