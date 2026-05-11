import { Link } from '@/i18n/navigation';

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
  const variantClasses = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href as Parameters<typeof Link>[0]['href']} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
