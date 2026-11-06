import React from 'react';

/**
 * Reusable Badge Component
 * Minimalist, high-contrast, editorial badge for technologies and status tags.
 */
export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  icon: Icon
}) {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded transition-colors';

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[11px] gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-xs gap-2',
  };

  const variantStyles = {
    default:
      'bg-[#171717] text-[#A1A1A1] border border-white/5 hover:border-white/10 hover:text-[#F5F5F5]',
    accent:
      'bg-[#E87524]/10 text-[#F5A14B] border border-[#E87524]/30',
    outline:
      'bg-transparent text-[#A1A1A1] border border-white/10',
    subtle:
      'bg-[#111111] text-[#737373] border border-transparent',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.sm} ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 text-[#E87524]" />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;

