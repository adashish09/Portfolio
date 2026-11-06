import React from 'react';

/**
 * Editorial Section Header Component
 * Provides clean cinematic typography, indices, and visual hierarchy.
 */
export function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'left',
  className = ''
}) {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignStyles[align]} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-[#E87524]" />
          <span className="text-xs font-mono font-semibold tracking-widest text-[#E87524] uppercase">
            {eyebrow}
          </span>
        </div>
      )}
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#F5F5F5]">
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E87524] to-[#F5A14B]">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#A1A1A1] max-w-2xl leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;

