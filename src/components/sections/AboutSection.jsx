import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, educationData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { TechIcon } from '../common/TechIcons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial About Section — Submerged Atmospheric Video Backdrop
 * The architectural corridor video (`about-transition.mp4`) is rendered as an
 * expansive, submerged ambient background with radial and directional edge dissolves,
 * deep cinematic vignette, and zero visible boundaries.
 */
export function AboutSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll reveal choreography
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-editorial-item',
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
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

  // Video performance & autoplay visibility observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 sm:py-40 bg-[#080808] overflow-hidden border-t border-white/5"
    >
      {/* ========================================================
          SUBMERGED VIDEO BACKDROP WITH MULTI-LAYER DISSOLVE
          ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Radial Edge Dissolve Container */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 85% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 65%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse 90% 85% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 65%, transparent 100%)',
          }}
        >
          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              poster="/assets/images/hero-portrait.webp"
              className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.25] saturate-[1.3] transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-45 sm:opacity-55' : 'opacity-0'
              }`}
            >
              <source src="/assets/videos/about-transition.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Top Edge Dissolve (Seamless gradient from #080808) */}
        <div className="absolute top-0 left-0 right-0 h-44 sm:h-64 bg-gradient-to-b from-[#080808] via-[#080808]/85 to-transparent pointer-events-none" />

        {/* Bottom Edge Dissolve (Seamless gradient into #080808) */}
        <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-64 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-transparent pointer-events-none" />

        {/* Left & Right Edge Dissolve Gradients */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-60 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-60 bg-gradient-to-l from-[#080808] via-[#080808]/75 to-transparent pointer-events-none" />

        {/* Submerged Caustic & Amber Vignette Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,117,36,0.08)_0%,_rgba(8,8,8,0.45)_55%,_rgba(8,8,8,0.95)_100%)] pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full">
        {/* Section Header */}
        <div className="about-editorial-item">
          <SectionHeader
            eyebrow="01 // BACKGROUND & PERSPECTIVE"
            title="Engineering with"
            highlight="Precision & Scale"
            subtitle="A comprehensive overview of my academic foundation, engineering approach, and active production internship."
          />
        </div>

        {/* Editorial Pull-Quote Block */}
        <div className="about-editorial-item my-10 p-6 sm:p-8 rounded-2xl bg-[#111111]/80 backdrop-blur-xl border-l-4 border-l-[#E87524] border-y border-r border-white/10 shadow-2xl hover:border-r-[#E87524]/30 transition-colors">
          <p className="text-xl sm:text-2xl font-display font-medium text-[#F5F5F5] leading-relaxed">
            &ldquo;{personalInfo.summary}&rdquo;
          </p>
        </div>

        {/* Wide Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
          
          {/* Left Column: Narrative Perspective & Active TAP Internship */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-base sm:text-lg text-[#D4D4D4] leading-relaxed">
              {personalInfo.bio.map((paragraph, index) => (
                <p key={index} className="about-editorial-item text-justify sm:text-left">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Active Internship Timeline Feature */}
            <div className="about-editorial-item pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E87524]">
                <Briefcase className="w-4 h-4" />
                <span>Active Industry Internship</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121212]/85 backdrop-blur-xl border border-white/10 hover:border-[#E87524]/50 transition-colors shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-lg font-display font-bold text-[#F5F5F5]">
                    Software Engineering Intern @ TAP Academy
                  </h4>
                  <span className="text-xs font-mono text-[#F5A14B] bg-[#1a1510] px-3 py-1 rounded-lg border border-[#E87524]/30 w-fit">
                    Aug 2026 – Present
                  </span>
                </div>
                <p className="text-xs font-mono text-[#737373] mt-1">
                  Bengaluru, Karnataka, India
                </p>
                <p className="text-sm text-[#A1A1A1] mt-3 leading-relaxed">
                  Focusing on production Python development, crafting RESTful microservices with Flask, establishing schema migrations on relational databases, and orchestrating cloud deployments to live production environments.
                </p>
                
                {/* Tech chips with TechIcon */}
                <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  <span className="text-xs font-mono text-[#737373] flex items-center">Focus:</span>
                  {['Python', 'Flask', 'REST APIs', 'SQL', 'Linux'].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-[#181818] text-[#D4D4D4] border border-white/5"
                    >
                      <TechIcon name={t} className="w-3.5 h-3.5 shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Credentials with Clean Typographic Dividers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="about-editorial-item p-6 sm:p-8 rounded-2xl bg-[#121212]/85 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5A14B]">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Qualifications</span>
                </div>
                <span className="text-xs font-mono text-[#737373]">HIGHER EDUCATION</span>
              </div>

              <div className="divide-y divide-white/5">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="py-5 space-y-2 group first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-base font-display font-semibold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors leading-snug">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-mono text-[#F5A14B] bg-[#1a1510] px-2.5 py-0.5 rounded border border-[#E87524]/30 shrink-0 font-medium">
                        {edu.score}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#A1A1A1]">
                      <span>{edu.institution}</span>
                      <span className="text-[#737373]">{edu.period}</span>
                    </div>

                    <p className="text-xs text-[#737373] pt-1 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="about-editorial-item p-6 rounded-2xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 space-y-3 shadow-xl">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">
                Engineering Discipline
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#A1A1A1]">
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5 hover:border-[#E87524]/40 transition-colors">
                  <span className="text-[#E87524] block mb-1">01</span>
                  Distributed Systems
                </div>
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5 hover:border-[#E87524]/40 transition-colors">
                  <span className="text-[#E87524] block mb-1">02</span>
                  RAG &amp; LLM Pipelines
                </div>
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5 hover:border-[#E87524]/40 transition-colors">
                  <span className="text-[#E87524] block mb-1">03</span>
                  Relational Schemas
                </div>
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5 hover:border-[#E87524]/40 transition-colors">
                  <span className="text-[#E87524] block mb-1">04</span>
                  Production DevOps
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
