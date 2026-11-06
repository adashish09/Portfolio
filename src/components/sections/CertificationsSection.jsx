import React, { useEffect, useRef } from 'react';
import { CheckCircle, ShieldCheck, Award, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificationsData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import AtmosphericGlow from '../common/AtmosphericGlow';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Certifications Section — Phase 3 Editorial Elevation
 * Elegant layout preserving verified certifications with exact names and issuers.
 */
export function CertificationsSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-card-reveal',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
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
      id="certifications"
      className="relative py-24 sm:py-32 bg-[#0b0b0b] overflow-hidden border-t border-white/5"
    >
      <AtmosphericGlow position="top-right" opacity={0.08} size="w-[550px] h-[550px]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="05 // ACCREDITATIONS"
          title="Verified"
          highlight="Certifications"
          subtitle="Formal industry specializations and completed curricula from global technology organizations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => (
            <div
              key={cert.name}
              className="cert-card-reveal group p-7 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#E87524]/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Header: Issuer and Domain Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-medium text-[#F5A14B] bg-[#1a1510] px-2.5 py-1 rounded-md border border-[#E87524]/30">
                    {cert.badgeType}
                  </span>
                  <span className="text-xs font-mono text-[#737373]">
                    {cert.year}
                  </span>
                </div>

                {/* Certification Icon & Title */}
                <div className="flex items-start gap-3.5 mt-4">
                  <div className="p-2.5 rounded-xl bg-[#1a1a1a] text-[#E87524] border border-white/5 shrink-0 group-hover:scale-105 group-hover:border-[#E87524]/30 transition-all">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-mono text-[#E87524] mt-1 font-semibold">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#A1A1A1] mt-4 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Status Verification Footer */}
              <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#737373]">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Credential
                </span>
                <span className="text-[#737373]">CREDENTIAL 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CertificationsSection;
