interface IButton {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'lg';
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  type = 'button',
  className = '',
  variant = 'primary',
  size,
  onClick = () => undefined,
  children,
  disabled = false,
}: IButton) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className} ${size ? `btn-${size}` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
