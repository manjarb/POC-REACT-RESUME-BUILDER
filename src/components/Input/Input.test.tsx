import { useForm } from 'react-hook-form';
import { describe, expect,it } from 'vitest';

import { render } from '../../test/test.util';

import { Input } from './Input';

describe('Input Component', () => {
  const setup = (props = {}) => {
    const TestForm = () => {
      const { register } = useForm();
      return (
        <form>
          <Input
            label="Test Label"
            name="testInput"
            register={register}
            {...props}
          />
        </form>
      );
    };

    return render(<TestForm />);
  };

  it('renders successfully with required props', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('displays an error message when provided', () => {
    const { getByText } = setup({ error: 'This is an error message' });
    expect(getByText('This is an error message')).toBeInTheDocument();
  });

  it('handles input type="text" correctly', () => {
    const { getByLabelText } = setup({ type: 'text' });
    const input = getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('handles input type="number" correctly', () => {
    const { getByLabelText } = setup({ type: 'number' });
    const input = getByLabelText('Test Label');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('applies the correct className and error class when error is present', () => {
    const { getByLabelText } = setup({
      error: 'Error message',
    });
    const input = getByLabelText('Test Label');
    expect(input).toHaveClass('form-control is-invalid');
  });
});
