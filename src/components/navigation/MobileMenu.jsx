import React, { useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { Github, Linkedin } from '../common/Icons';

/**
 * Animated Mobile Navigation Drawer — Phase 2 Implementation
 */
export function MobileMenu({
  isOpen,
  onClose,
  links,
  activeSection,
  onNavigate
}) {
  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 xl:hidden bg-[#080808]/95 backdrop-blur-2xl flex flex-col"
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#hero');
                onClose();
              }}
              className="text-lg font-display font-bold tracking-tight text-[#F5F5F5] flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#E87524]" />
              <span>Ashish Kumar</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 text-[#A1A1A1] hover:text-[#F5F5F5] rounded-lg border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-[#E87524]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with staggered animation */}
          <nav className="flex-1 px-6 py-8 overflow-y-auto flex flex-col justify-center space-y-4">
            {links.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.href);
                    onClose();
                  }}
                  className={`flex items-center justify-between text-2xl font-display font-medium transition-all py-2 border-b border-white/5 ${
                    isActive
                      ? 'text-[#F5A14B] pl-2 border-l-2 border-l-[#E87524]'
                      : 'text-[#A1A1A1] hover:text-[#F5F5F5]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-[#737373]">
                    0{idx + 1}
                  </span>
                </motion.a>
              );
            })}
          </nav>

          {/* Bottom Footer in Mobile Menu */}
          <div className="px-6 py-6 border-t border-white/5 bg-[#111111]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="text-[#A1A1A1] hover:text-[#F5A14B] transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="text-[#A1A1A1] hover:text-[#F5A14B] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  aria-label="Send an email"
                  className="text-[#A1A1A1] hover:text-[#F5A14B] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <span className="text-xs font-mono text-[#737373]">
                {personalInfo.location}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
