import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#C8F135] text-[#090A0C] hover:bg-[#D6F85D] active:bg-[#B8E124] font-semibold border border-[#C8F135]',
  secondary:
    'bg-transparent text-[#F4F5F7] hover:bg-white/5 active:bg-white/10 font-medium border border-white/20 hover:border-white/35',
  ghost:
    'bg-[#181B20] text-[#F4F5F7] hover:bg-[#22262D] active:bg-[#14171C] font-medium border border-white/10',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm tracking-tight transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function ActionButton({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

interface ActionLinkProps {
  to: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function ActionLink({
  to,
  variant = 'primary',
  className = '',
  children,
  onClick,
}: ActionLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
