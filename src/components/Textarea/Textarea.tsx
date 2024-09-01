import { UseFormRegister } from 'react-hook-form';

interface TextareaProps {
  label: string;
  name: string;
  // eslint-disable-next-line
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  labelClass?: string;
  inputWrapperClass?: string;
  rows?: number;
}

export function Textarea({
  label,
  name,
  register,
  error,
  className = '',
  labelClass = '',
  inputWrapperClass = '',
  rows = 3,
}: TextareaProps) {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className={`m-b-5 ${labelClass}`}>
        {label}
      </label>
      <div className={inputWrapperClass}>
        <textarea
          id={name}
          rows={rows}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...register(name)}
        />
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}
