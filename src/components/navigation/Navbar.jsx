import React, { useState } from 'react';
import { Menu, ArrowUpRight, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo, navigationLinks, resumeData } from '../../data/portfolioData';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLenis } from '../../context/LenisContext';
import MobileMenu from './MobileMenu';

/**
 * Cinematic Sticky Navigation Bar — Phase 3 Editorial Elevation
 * Proportional scale, active pill highlight, resume quick-action, and smooth Lenis anchors.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition(25);
  const { scrollTo } = useLenis();

  const sectionIds = navigationLinks.map((link) => link.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds, 130);

  const handleSmoothScroll = (targetHref) => {
    scrollTo(targetHref, { offset: -70 });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/92 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/60 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Title */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll('#hero');
              }}
              className="group flex items-center gap-3 text-[#F5F5F5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#E87524] rounded-lg p-1"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#141414] border border-[#E87524]/40 group-hover:border-[#E87524] transition-all duration-300 shadow-[0_0_15px_rgba(232,117,36,0.15)]">
                <span className="font-display font-bold text-sm text-[#F5A14B]">A</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E87524] shadow-[0_0_6px_#E87524]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight group-hover:text-[#F5A14B] transition-colors">
                  {personalInfo.name}
                </span>
                <span className="text-[10px] font-mono text-[#737373] tracking-wider uppercase">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links Pill */}
            <nav className="hidden xl:flex items-center space-x-1 px-2 py-1.5 bg-[#121212]/80 backdrop-blur-md rounded-full border border-white/10 shadow-inner">
              {navigationLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(link.href);
                    }}
                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#E87524] ${
                      isActive
                        ? 'text-[#F5F5F5]'
                        : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[#1e1e1e] border border-[#E87524]/40 rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Resume Download Action */}
              <a
                href={resumeData.pdfPath}
                download={resumeData.fileName}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-[#161616] hover:bg-[#1f1f1f] text-[#D4D4D4] hover:text-white border border-white/10 hover:border-white/25 transition-all focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                aria-label="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#E87524]" />
                <span>Resume</span>
              </a>

              {/* Direct Connect Action */}
              <button
                type="button"
                onClick={() => handleSmoothScroll('#contact')}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#E87524]/10 hover:bg-[#E87524]/20 text-[#F5A14B] border border-[#E87524]/40 hover:border-[#E87524] transition-all shadow-[0_0_15px_-3px_rgba(232,117,36,0.2)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E87524]"
              >
                <span>Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 xl:hidden text-[#A1A1A1] hover:text-[#F5F5F5] rounded-lg border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navigationLinks}
        activeSection={activeSection}
        onNavigate={handleSmoothScroll}
      />
    </>
  );
}

export default Navbar;
