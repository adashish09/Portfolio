import React, { useEffect, useRef } from 'react';
import { Archive, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { previousPortfolioData } from '../../data/portfolioData';
import Container from '../common/Container';
import Button from '../common/Button';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * The Previous Chapter — Dedicated Archive Section
 * Visually distinct retrospective highlighting developer evolution.
 * Strictly opens in a new tab without iframes or confusion with project showcase.
 */
export function PreviousPortfolioSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="previous-chapter"
      className="relative py-20 sm:py-24 bg-[#0a0a0a] overflow-hidden border-y border-white/5"
    >
      {/* Retrospective Subtle Backdrop Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E87524]/5 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div
          ref={cardRef}
          className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#141414] to-[#0e0e0e] border border-white/10 hover:border-[#E87524]/40 p-8 sm:p-12 lg:p-14 shadow-2xl transition-all duration-300"
        >
          {/* Archive Badge & Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-white/10 text-xs font-mono text-[#A1A1A1]">
              <Archive className="w-3.5 h-3.5 text-[#E87524]" />
              <span>{previousPortfolioData.label}</span>
            </div>
            
            <span className="text-xs font-mono text-[#737373]">
              DEV_JOURNEY // RETROSPECTIVE
            </span>
          </div>

          {/* Editorial Content */}
          <div className="mt-8 space-y-4 text-center sm:text-left">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F5F5] tracking-tight">
              {previousPortfolioData.title}
            </h3>
            
            <p className="text-base sm:text-lg text-[#A1A1A1] max-w-2xl leading-relaxed">
              {previousPortfolioData.tagline}
            </p>

            <p className="text-xs sm:text-sm font-mono text-[#737373] italic pt-1">
              "{previousPortfolioData.milestoneNote}"
            </p>
          </div>

          {/* Action Callout */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs font-mono text-[#737373] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span>Hosted Live on Netlify: ashish-portfolio-dev.netlify.app</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              href={previousPortfolioData.url}
              target="_blank"
              rel="noopener noreferrer"
              icon={ArrowUpRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              {previousPortfolioData.ctaText}
            </Button>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default PreviousPortfolioSection;
