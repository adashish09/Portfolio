import { useState, useEffect } from 'react';

/**
 * Custom hook to detect the active section based on scroll position / IntersectionObserver.
 * @param {Array<string>} sectionIds - List of section IDs to monitor
 * @param {number} offset - Pixel offset from top
 */
export function useActiveSection(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

