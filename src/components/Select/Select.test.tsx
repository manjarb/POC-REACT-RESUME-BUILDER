import { useForm } from 'react-hook-form';
import { describe, expect,it } from 'vitest';

import { render } from '../../test/test.util';

import { Select } from './Select';

describe('Select Component', () => {
  const setup = (props = {}) => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    const TestForm = () => {
      const { register } = useForm();
      return (
        <form>
          <Select
            name="testSelect"
            label="Test Select"
            options={options}
            register={register}
            {...props}
          />
        </form>
      );
    };

    return render(<TestForm />);
  };

  it('renders successfully with options', () => {
    const { getByLabelText, getByText } = setup();
    expect(getByLabelText('Test Select')).toBeInTheDocument();
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('displays an error message when provided', () => {
    const { getByText } = setup({ error: 'This is an error message' });
    expect(getByText('This is an error message')).toBeInTheDocument();
  });

  it('renders disabled when the disabled prop is true', () => {
    const { getByLabelText } = setup({ disabled: true });
    const select = getByLabelText('Test Select');
    expect(select).toBeDisabled();
  });

  it('renders the placeholder option correctly', () => {
    const { getByText } = setup({ placeholder: 'Choose an option' });
    expect(getByText('Choose an option')).toBeInTheDocument();
  });

  it('applies the correct className and error class when error is present', () => {
    const { getByLabelText } = setup({
      error: 'Error message',
      className: 'custom-class',
    });
    const select = getByLabelText('Test Select');
    expect(select).toHaveClass('form-select custom-class is-invalid');
  });
});
