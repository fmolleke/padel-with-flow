interface ButtonProps {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}

export function Button({ href, target, rel, onClick, children, variant = 'primary', className = '' }: ButtonProps) {
  const baseClasses = 'btn';
  const primaryClasses = 'btn-primary';
  const ghostClasses = 'btn-ghost';
  const variantClasses = variant === 'primary' ? primaryClasses : ghostClasses;

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
