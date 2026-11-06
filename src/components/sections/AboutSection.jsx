import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, CheckCircle2, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, educationData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial About Section — Phase 4 Full-Width Cinematic Redesign
 * Architectural corridor video seamlessly integrated as an expansive atmospheric visual layer,
 * high-contrast typography, and zero boxed media capsules.
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

  // Video performance visibility observer
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
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-36 bg-[#0a0a0a] overflow-hidden border-t border-white/5"
    >
      {/* ========================================================
          FULL-WIDTH CINEMATIC CORRIDOR VIDEO BACKDROP
          ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Fallback Static Ambient Image */}
        <picture>
          <source srcSet="/assets/images/hero-portrait.webp" type="image/webp" />
          <img
            src="/assets/images/hero-portrait.png"
            alt="Atmospheric architecture backdrop"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-10' : 'opacity-25'
            }`}
          />
        </picture>

        {/* Full-Width Architectural Corridor Video */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            poster="/assets/images/hero-portrait.webp"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 mix-blend-screen ${
              videoLoaded ? 'opacity-25' : 'opacity-0'
            }`}
          >
            <source src="/assets/videos/about-transition.mp4" type="video/mp4" />
          </video>
        )}

        {/* Dark Overlays & Gradient Seamless Transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a]/90 to-[#080808]" />
        <div className="absolute inset-0 bg-radial-subtle opacity-80" />
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
        <div className="about-editorial-item my-10 p-6 sm:p-8 rounded-2xl bg-[#111111]/85 backdrop-blur-md border-l-4 border-l-[#E87524] border-y border-r border-white/5 shadow-2xl">
          <p className="text-xl sm:text-2xl font-display font-medium text-[#F5F5F5] leading-relaxed">
            "{personalInfo.summary}"
          </p>
        </div>

        {/* Wide Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
          
          {/* Left Column: Narrative Perspective & Active TAP Internship */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5 text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
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

              <div className="p-6 rounded-2xl bg-[#121212]/90 backdrop-blur-md border border-white/10 hover:border-[#E87524]/40 transition-colors shadow-xl">
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
                
                {/* Tech chips */}
                <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  <span className="text-xs font-mono text-[#737373]">Focus:</span>
                  {['Python', 'Flask', 'REST APIs', 'Relational DBs', 'Cloud Deployment'].map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#181818] text-[#D4D4D4] border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Credentials with Clean Typographic Dividers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="about-editorial-item p-6 sm:p-8 rounded-2xl bg-[#121212]/90 backdrop-blur-md border border-white/10 space-y-6 shadow-xl">
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
            <div className="about-editorial-item p-6 rounded-2xl bg-[#111111]/80 border border-white/5 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">
                Engineering Discipline
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#A1A1A1]">
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5">
                  <span className="text-[#E87524] block mb-1">01</span>
                  Distributed Systems
                </div>
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5">
                  <span className="text-[#E87524] block mb-1">02</span>
                  RAG & LLM Pipelines
                </div>
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5">
                  <span className="text-[#E87524] block mb-1">03</span>
                  Relational Schemas
                </div>
                <div className="p-2.5 rounded-lg bg-[#161616] border border-white/5">
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
