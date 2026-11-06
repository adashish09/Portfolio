import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { personalInfo, navigationLinks } from '../../data/portfolioData';
import { Github, Linkedin } from '../common/Icons';
import Container from '../common/Container';
import { useLenis } from '../../context/LenisContext';

/**
 * Editorial Footer Component — Phase 2 Implementation
 * Dynamic copyright year, Lenis smooth scrolling, and social connections.
 * Strictly excludes any private phone numbers.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollTo } = useLenis();

  const scrollToTop = () => {
    scrollTo(0, { offset: 0, duration: 1.2 });
  };

  const handleSmoothScroll = (targetHref) => {
    scrollTo(targetHref, { offset: -70 });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-12 sm:py-16 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#141414] border border-[#E87524]/30">
                <span className="font-display font-bold text-sm text-[#F5A14B]">A</span>
              </div>
              <span className="font-display font-bold text-lg text-[#F5F5F5] tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-[#A1A1A1] max-w-sm leading-relaxed">
              {personalInfo.title} specializing in full-stack architecture, distributed cloud deployments, and retrieval-augmented systems.
            </p>
            <p className="text-xs font-mono text-[#737373]">
              Based in {personalInfo.location}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#737373]">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                  className="text-xs text-[#A1A1A1] hover:text-[#F5A14B] transition-colors py-1 focus:outline-none focus:underline"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#previous-chapter"
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll('#previous-chapter');
                }}
                className="text-xs text-[#E87524] hover:text-[#F5A14B] transition-colors py-1 focus:outline-none focus:underline"
              >
                Previous Chapter
              </a>
            </div>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-3">
                Social Channels
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#111111] text-[#A1A1A1] hover:text-[#F5A14B] border border-white/5 hover:border-[#E87524]/40 transition-all focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#111111] text-[#A1A1A1] hover:text-[#F5A14B] border border-white/5 hover:border-[#E87524]/40 transition-all focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 rounded-lg bg-[#111111] text-[#A1A1A1] hover:text-[#F5A14B] border border-white/5 hover:border-[#E87524]/40 transition-all focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                  aria-label="Email Address"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors w-fit group focus:outline-none focus:ring-1 focus:ring-[#E87524] rounded p-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <span className="p-1 rounded bg-[#171717] border border-white/10 group-hover:border-[#E87524]/40 transition-colors">
                <ArrowUp className="w-3 h-3 text-[#E87524]" />
              </span>
            </button>
          </div>

        </div>

        {/* Bottom Legal / Phase 2 Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737373]">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Phase 2 Cinematic Experience</span>
            <span>•</span>
            <span className="text-[#E87524]">Interactive Developer Portfolio</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
