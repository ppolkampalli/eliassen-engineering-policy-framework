import { render, screen } from '@testing-library/react';

import { BarCohortChart } from './bar-cohort-chart';

describe('BarCohortChart', () => {
  it('renders the title and a bar label per bucket', () => {
    render(<BarCohortChart title="Policies" data={[{ key: 'POL-8.1', count: 3 }, { key: 'POL-4.5', count: 1 }]} />);
    expect(screen.getByText('Policies')).toBeTruthy();
    expect(screen.getByText('POL-8.1')).toBeTruthy();
    expect(screen.getByText('POL-4.5')).toBeTruthy();
  });

  it('shows an empty-state message when there is no data', () => {
    render(<BarCohortChart title="Policies" data={[]} />);
    expect(screen.getByText('Policies')).toBeTruthy();
    expect(screen.getByText(/no policies activity/i)).toBeTruthy();
  });
});
