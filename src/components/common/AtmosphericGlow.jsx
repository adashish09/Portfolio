import React from 'react';

/**
 * Atmospheric Background Glow
 * Creates cinematic ambient lighting using pure CSS gradients.
 */
export function AtmosphericGlow({
  position = 'top-center',
  color = 'amber',
  opacity = 0.12,
  size = 'w-[600px] h-[600px]',
  className = ''
}) {
  const positionStyles = {
    'top-center': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
    'top-left': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
    'bottom-right': 'bottom-0 right-0 translate-x-1/3 translate-y-1/3',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const gradientColor =
    color === 'amber'
      ? 'from-[#E87524]/20 via-[#F5A14B]/10 to-transparent'
      : 'from-[#171717] to-transparent';

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none rounded-full blur-3xl bg-gradient-radial ${gradientColor} ${positionStyles[position]} ${size} ${className}`}
      style={{ opacity }}
    />
  );
}

export default AtmosphericGlow;

