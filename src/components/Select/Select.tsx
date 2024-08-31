import { UseFormRegister } from 'react-hook-form';

interface IOption {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  name: string;
  label?: string;
  // eslint-disable-next-line
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  labelClass?: string;
  inputWrapperClass?: string;
}

export function Select({
  options,
  name,
  label,
  register,
  error,
  className = '',
  disabled = false,
  placeholder = 'Select an option',
  labelClass = '',
  inputWrapperClass = '',
}: ISelectProps) {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className={`m-b-5 ${labelClass}`}>
        {label}
      </label>
      <div className={inputWrapperClass}>
        <select
          id={name}
          className={`form-select ${className} ${error ? 'is-invalid' : ''}`}
          {...register(name)}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}
