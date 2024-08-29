interface IOption {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function Select({
  options,
  value,
  onChange,
  className = '',
  disabled = false,
  placeholder = 'Select an option',
}: ISelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`form-select ${className}`}
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
  );
}
