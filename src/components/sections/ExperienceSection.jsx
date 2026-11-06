import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Briefcase, CheckCircle2, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Badge from '../common/Badge';
import AtmosphericGlow from '../common/AtmosphericGlow';
import { TechIcon } from '../common/TechIcons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience Section — Phase 4 Professional Career Timeline Redesign
 * Compact, scannable timeline layout with immediate visibility of organization,
 * designation, duration, and verified internship scope.
 */
export function ExperienceSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-entry-reveal',
        {
          opacity: 0,
          x: -25,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
      id="experience"
      className="relative py-24 sm:py-32 bg-[#090909] overflow-hidden border-t border-white/5"
    >
      <AtmosphericGlow position="top-left" opacity={0.08} size="w-[500px] h-[500px]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="04 // CAREER TIMELINE"
          title="Professional"
          highlight="Experience"
          subtitle="Verified software engineering internships and hands-on industry application development."
        />

        <div className="max-w-4xl mx-auto relative mt-10">
          
          {/* Subtle Vertical Timeline Rail */}
          <div className="hidden sm:block absolute left-4 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#E87524] via-[#E87524]/20 to-transparent pointer-events-none" />

          <div className="space-y-8">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="timeline-entry-reveal relative sm:pl-12 group"
              >
                {/* Timeline Node Marker */}
                <div className="hidden sm:flex absolute left-4 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#121212] border-2 border-[#E87524] items-center justify-center shadow-[0_0_10px_#E87524]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A14B]" />
                </div>

                {/* Timeline Content Block */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#E87524]/40 transition-all duration-300 shadow-xl">
                  
                  {/* Top Bar: Designation, Organization & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-black px-2.5 py-0.5 rounded-full bg-[#E87524]">
                          {exp.type}
                        </span>
                        <span className="text-xs font-mono text-[#737373] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E87524]" />
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors tracking-tight">
                        {exp.role} <span className="text-[#A1A1A1] font-light">@</span> {exp.company}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#F5A14B] bg-[#1a1510] px-3 py-1 rounded-lg border border-[#E87524]/30 w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mt-5 space-y-3">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#737373]">
                      Scope & Production Deliverables
                    </p>
                    <ul className="space-y-2.5">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#E87524] mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applied Technologies */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-[#737373] mr-1">Stack:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181818] border border-white/5 text-xs font-mono text-[#D4D4D4] hover:border-[#E87524]/40 hover:text-white transition-all"
                      >
                        <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

export default ExperienceSection;
