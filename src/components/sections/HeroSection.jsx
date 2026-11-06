import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Sparkles, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, resumeData } from '../../data/portfolioData';
import Container from '../common/Container';
import Button from '../common/Button';
import { useLenis } from '../../context/LenisContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic Hero Section — Phase 4 Full-Bleed Redesign
 * Seamless full-bleed smoke atmosphere, naturally feathered portrait with ambient lighting,
 * high-contrast editorial typography, and deliberate responsive composition.
 */
export function HeroSection() {
  const { scrollTo } = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const sectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const portraitContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // GSAP Entrance & Parallax Choreography
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered text & CTA reveal
      gsap.fromTo(
        '.hero-animate',
        {
          opacity: 0,
          y: 35,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      // Natural portrait entrance
      gsap.fromTo(
        portraitContainerRef.current,
        {
          opacity: 0,
          scale: 0.94,
          x: 30,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.3,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Parallax scroll tracking
      gsap.to(portraitContainerRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Scroll indicator fade
      gsap.to('.hero-scroll-indicator', {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '15% top',
          end: '40% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Video performance visibility observer
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
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
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden bg-[#080808]"
    >
      {/* ========================================================
          1. FULL-BLEED CINEMATIC VIDEO & AMBIENT ATMOSPHERE
          ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Poster / Fallback Static Background */}
        <picture>
          <source srcSet="/assets/images/hero-background.webp" type="image/webp" />
          <img
            src="/assets/images/hero-background.png"
            alt="Cinematic amber atmosphere"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-25' : 'opacity-70'
            }`}
          />
        </picture>

        {/* Full-Bleed Amber Smoke Video Layer */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            poster="/assets/images/hero-background.webp"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 mix-blend-screen ${
              videoLoaded ? 'opacity-55' : 'opacity-0'
            }`}
          >
            <source src="/assets/videos/hero-atmosphere.mp4" type="video/mp4" />
          </video>
        )}

        {/* Carefully Layered Dark Readability Gradients */}
        {/* Left Darkening: Guarantees 100% legibility across all screen sizes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/92 via-[#080808]/70 to-transparent lg:w-3/4 z-10" />
        
        {/* Top Header Fade & Bottom Seamless Transition into About Section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-transparent to-[#080808] z-10" />

        {/* Soft Amber Warmth Spotlight */}
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-[#E87524]/12 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>

      {/* ========================================================
          2. MAIN CONTENT & NATURALLY INTEGRATED PORTRAIT
          ======================================================== */}
      <Container className="relative z-20 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100svh-14rem)]">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div ref={heroContentRef} className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left py-4 sm:py-6">
            
            {/* Status Eyebrow Pill */}
            <div className="hero-animate inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#E87524]/30 w-fit mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E87524] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E87524]" />
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#F5A14B]">
                Software Engineer // Bengaluru, IN
              </span>
            </div>

            {/* Candidate Name & Display Headline */}
            <div className="space-y-1.5">
              <p className="hero-animate text-xs sm:text-sm font-mono uppercase tracking-widest text-[#A1A1A1]">
                Hello, I am
              </p>
              <h1 className="hero-animate text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[#F5F5F5] tracking-tight leading-[1.02]">
                {personalInfo.name}
              </h1>
              <h2 className="hero-animate text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#E87524] via-[#F5A14B] to-[#F5F5F5] tracking-tight pt-2 leading-tight">
                Full-Stack Systems & AI Architectures
              </h2>
            </div>

            {/* Concise Resume Summary */}
            <p className="hero-animate mt-5 text-base sm:text-lg text-[#A1A1A1] max-w-2xl leading-relaxed font-normal">
              Software Engineer specializing in scalable full-stack applications, distributed cloud backends, and retrieval-augmented AI systems. Currently interning at TAP Academy in Bengaluru, building robust production-grade web applications.
            </p>

            {/* Architectural Highlights Row */}
            <div className="hero-animate mt-7 grid grid-cols-3 gap-3 sm:gap-4 pt-5 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#737373]">Focus</p>
                <p className="text-sm font-semibold text-[#F5F5F5] mt-0.5">Full-Stack & AI</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#737373]">Degree</p>
                <p className="text-sm font-semibold text-[#F5F5F5] mt-0.5">MCA (2024–2026)</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#737373]">Current Role</p>
                <p className="text-sm font-semibold text-[#F5A14B] mt-0.5">Intern @ TAP</p>
              </div>
            </div>

            {/* Action CTAs: Explore, Download Resume, Contact */}
            <div className="hero-animate mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo('#projects', { offset: -70 })}
                icon={ArrowDown}
                className="w-full sm:w-auto"
              >
                Explore My Work
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                href={resumeData.pdfPath}
                download={resumeData.fileName}
                icon={Download}
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Download Resume
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollTo('#contact', { offset: -70 })}
                icon={ArrowUpRight}
                className="w-full sm:w-auto"
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Column: Seamlessly Feathered Portrait */}
          <div
            ref={portraitContainerRef}
            className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end items-end select-none pointer-events-none mt-6 lg:mt-0"
          >
            {/* Ambient Warm Rim Glow Filter */}
            <div className="absolute -inset-8 bg-gradient-to-t from-[#E87524]/20 via-[#F5A14B]/10 to-transparent rounded-full blur-3xl opacity-80 pointer-events-none" />
            
            {/* Portrait Frame with Natural Edge Feathering */}
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[480px] flex items-end">
              <picture className="w-full">
                <source srcSet="/assets/images/hero-cutout.webp" type="image/webp" />
                <img
                  src="/assets/images/hero-cutout.png"
                  alt="Ashish Kumar — Cinematic Portrait"
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] filter brightness-[1.02] contrast-[1.05]"
                  loading="eager"
                  decoding="async"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 70%, rgba(0, 0, 0, 0.7) 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, rgba(0, 0, 0, 0.7) 85%, transparent 100%)',
                  }}
                />
              </picture>
            </div>
          </div>

        </div>
      </Container>

      {/* ========================================================
          3. SCROLL EXPLORATION INDICATOR
          ======================================================== */}
      <div className="hero-scroll-indicator relative z-20 flex flex-col items-center justify-center text-center select-none pt-2">
        <button
          onClick={() => scrollTo('#about', { offset: -70 })}
          className="group flex flex-col items-center gap-1.5 text-[#737373] hover:text-[#F5A14B] transition-colors focus:outline-none"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">
            Scroll to Explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#E87524]/60 flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-2 rounded-full bg-[#E87524] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
