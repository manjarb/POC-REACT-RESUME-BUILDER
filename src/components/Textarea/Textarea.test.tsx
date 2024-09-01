import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect,it } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  const setup = (props = {}) => {
    const TestForm = () => {
      const { register } = useForm();
      return (
        <form>
          <Textarea
            label="Description"
            name="description"
            register={register}
            {...props}
          />
        </form>
      );
    };

    return render(<TestForm />);
  };

  it('renders without crashing', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Description')).toBeTruthy();
  });

  it('uses the default rows value if not provided', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Description')).toHaveAttribute('rows', '3');
  });

  it('applies the custom rows value', () => {
    const { getByLabelText } = setup({ rows: 5 });
    expect(getByLabelText('Description')).toHaveAttribute('rows', '5');
  });

  it('displays an error message when the error prop is provided', () => {
    const { getByText } = setup({ error: 'This field is required' });
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('registers with react-hook-form correctly', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Description')).toHaveAttribute(
      'name',
      'description',
    );
  });
});
