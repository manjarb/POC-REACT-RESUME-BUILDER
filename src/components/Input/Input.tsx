import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  labelClass?: string;
  inputWrapperClass?: string;
}

export function Input({
  label,
  type = 'text',
  name,
  register,
  error,
  className,
  labelClass = '',
  inputWrapperClass = '',
}: InputProps) {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className={`m-b-5 ${labelClass}`}>
        {label}
      </label>
      <div className={inputWrapperClass}>
        <input
          type={type}
          id={name}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...register(name, {
            setValueAs: (value) =>
              type === 'number'
                ? value === ''
                  ? ''
                  : Number(value)
                : value,
          })}
        />
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}
