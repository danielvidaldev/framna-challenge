import { render, screen } from '@testing-library/react';
import { EmptyProjectsState } from '@/app/_components/EmptyProjectsState';

describe('EmptyProjectsState Component', () => {
  it('renders empty state message', () => {
    render(<EmptyProjectsState />);

    expect(screen.getByText(/no projects yet/i)).toBeInTheDocument();
  });

  it('applies dashed border styling', () => {
    render(<EmptyProjectsState />);

    const text = screen.getByText(/no projects yet/i);
    expect(text).toHaveClass('border-dashed');
  });

  it('has proper spacing and layout', () => {
    render(<EmptyProjectsState />);

    const text = screen.getByText(/no projects yet/i);
    expect(text).toHaveClass('p-16');
    expect(text).toHaveClass('text-center');
  });
});
