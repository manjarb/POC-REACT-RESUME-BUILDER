import { fireEvent,render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole('button', { name: 'Click Me' });
    expect(button).toHaveClass('btn btn-primary');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('renders correctly with custom props', () => {
    const { getByRole } = render(
      <Button
        type="submit"
        className="custom-class"
        variant="danger"
        size="lg"
        disabled
      >
        Submit
      </Button>,
    );
    const button = getByRole('button', { name: 'Submit' });
    expect(button).toHaveClass('btn btn-danger btn-lg custom-class');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );
    const button = getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    );
    const button = getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const button = getByRole('button', { name: 'Click Me' });
    expect(button).toHaveTextContent('Click Me');
  });
});
