import { render, screen } from '@testing-library/react';

import { StatTile } from './stat-tile';

describe('StatTile', () => {
  it('renders the label and value', () => {
    render(<StatTile label="Work items" value="12" />);
    expect(screen.getByText('Work items')).toBeTruthy();
    expect(screen.getByText('12')).toBeTruthy();
  });

  it('renders an optional caption under the value', () => {
    render(<StatTile label="Tests" value="4/5" caption="80% passing" />);
    expect(screen.getByText('80% passing')).toBeTruthy();
  });
});
