import React from 'react';

/**
 * Reusable Container Component
 * Enforces unified horizontal padding and max width across all sections.
 */
export function Container({ children, className = '', id }) {
  return (
    <div id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>
      {children}
    </div>
  );
}

export default Container;

