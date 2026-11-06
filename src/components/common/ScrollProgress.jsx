import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Top Viewport Scroll Progress Bar
 */
export function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E87524] via-[#F5A14B] to-[#E87524] z-50 origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;

