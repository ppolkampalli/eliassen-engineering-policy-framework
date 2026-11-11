import { fireEvent, render, screen } from '@testing-library/react';

import { CohortSelector } from './cohort-selector';

describe('CohortSelector', () => {
  it('marks the active cohort type as pressed and the others as not', () => {
    render(<CohortSelector active="policies" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Policies' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Workflow' }).getAttribute('aria-pressed')).toBe('false');
    expect(screen.getByRole('button', { name: 'Roles' }).getAttribute('aria-pressed')).toBe('false');
  });

  it('calls onChange with the clicked cohort type', () => {
    const onChange = jest.fn();
    render(<CohortSelector active="policies" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Roles' }));
    expect(onChange).toHaveBeenCalledWith('roles');
  });

  it('does not call onChange when clicking the already-active option (toggle group deselect)', () => {
    const onChange = jest.fn();
    render(<CohortSelector active="policies" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Policies' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
