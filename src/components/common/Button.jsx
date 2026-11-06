import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Reusable Button / Link Component — Phase 2 Implementation
 * Provides cinematic styling with burnt orange / amber accents and Framer Motion micro-interactions.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  target,
  rel,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E87524]/50 focus:ring-offset-2 focus:ring-offset-[#080808] disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide text-sm';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-md gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-lg gap-2',
    lg: 'px-7 py-3.5 text-base rounded-lg gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#E87524] text-white hover:bg-[#F5A14B] hover:text-[#080808] shadow-[0_0_20px_-3px_rgba(232,117,36,0.35)] hover:shadow-[0_0_25px_rgba(245,161,75,0.5)] border border-[#E87524]/80',
    secondary:
      'bg-[#171717] text-[#F5F5F5] hover:text-[#F5A14B] border border-white/10 hover:border-[#E87524]/40 hover:bg-[#1f1f1f] shadow-sm',
    outline:
      'bg-transparent text-[#F5A14B] border border-[#E87524]/60 hover:bg-[#E87524]/10 hover:border-[#E87524]',
    ghost:
      'bg-transparent text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-white/5',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98, y: 1 },
        transition: { duration: 0.15 },
      };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={`group ${combinedClasses}`}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`group ${combinedClasses}`}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
}

export default Button;
