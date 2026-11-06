import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../../context/LenisContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Global Scroll-to-Top Button
 * Revealed when scrolling past 450px with smooth inertia scroll to top.
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    scrollTo(0, { offset: 0, duration: 1.2 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: prefersReducedMotion ? 0.05 : 0.25, ease: 'easeOut' }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.08, y: -2 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 p-3 sm:p-3.5 rounded-xl bg-[#141414]/90 backdrop-blur-md text-[#F5A14B] border border-[#E87524]/40 hover:border-[#E87524] shadow-[0_4px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(232,117,36,0.2)] focus:outline-none focus:ring-2 focus:ring-[#E87524] focus:ring-offset-2 focus:ring-offset-[#080808] transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;

