import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext({
  lenis: null,
  scrollTo: () => {},
});

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If reduced motion is requested, do not force smooth inertia scrolling
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current && !prefersReducedMotion) {
      lenisRef.current.scrollTo(target, {
        offset: options.offset ?? -70,
        duration: options.duration ?? 1.2,
        ...options,
      });
    } else {
      // Fallback for native scroll / reduced motion
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset + (options.offset ?? -70);
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else if (target === 0 || target === 'top') {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}

export default useLenis;

