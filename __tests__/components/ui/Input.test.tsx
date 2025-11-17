import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Input label="Email" value="" onChange={handleChange} />);
    const input = screen.getByLabelText('Email');

    await user.type(input, 'test@example.com');

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays the current value', () => {
    render(<Input label="Name" value="John Doe" onChange={() => {}} />);
    const input = screen.getByLabelText('Name') as HTMLInputElement;
    expect(input.value).toBe('John Doe');
  });

  it('supports placeholder text', () => {
    render(
      <Input
        label="Search"
        value=""
        onChange={() => {}}
        placeholder="Type to search..."
      />
    );
    const input = screen.getByPlaceholderText('Type to search...');
    expect(input).toBeInTheDocument();
  });

  it('can be required', () => {
    render(<Input label="Required" value="" onChange={() => {}} required />);
    const input = screen.getByLabelText('Required');
    expect(input).toBeRequired();
  });
});
