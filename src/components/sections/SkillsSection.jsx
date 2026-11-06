import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Terminal,
  Cpu,
  Layers,
  Search,
  Sparkles,
  ArrowUpRight,
  X,
  ExternalLink,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories, projectsData, experienceData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import AtmosphericGlow from '../common/AtmosphericGlow';
import { TechIcon } from '../common/TechIcons';
import { useLenis } from '../../context/LenisContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Terminal,
  Cpu,
};

/**
 * Interactive Technical Arsenal & Ecosystem — Phase 4 Optimized
 * Features respective technology SVG brand icons, category navigation,
 * real-time search, and interactive technology-to-project discovery relationship matrix.
 */
export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  
  const sectionRef = useRef(null);
  const techRelationshipRef = useRef(null);
  const { scrollTo } = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll reveal with GSAP
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-cluster-card',
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
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
  }, [prefersReducedMotion, selectedCategory]);

  // Total skill count computation
  const totalCapabilities = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  // Find verified project and internship associations for a given technology
  const getAssociatedWork = useMemo(() => {
    return (techName) => {
      if (!techName) return { projects: [], experiences: [] };

      const norm = techName.toLowerCase();

      // Match projects
      const matchedProjects = projectsData.filter((p) => {
        return (
          p.technologies.some((t) => t.toLowerCase().includes(norm) || norm.includes(t.toLowerCase())) ||
          p.highlights.some((h) => h.toLowerCase().includes(norm))
        );
      });

      // Match experience (e.g. TAP Academy)
      const matchedExperiences = experienceData.filter((e) => {
        return (
          e.technologies.some((t) => t.toLowerCase().includes(norm) || norm.includes(t.toLowerCase())) ||
          e.responsibilities.some((r) => r.toLowerCase().includes(norm))
        );
      });

      return { projects: matchedProjects, experiences: matchedExperiences };
    };
  }, []);

  const handleTechClick = (tech) => {
    if (selectedTech === tech) {
      setSelectedTech(null);
    } else {
      setSelectedTech(tech);
      // Smooth scroll to relationships card if on mobile viewport
      if (window.innerWidth < 768 && techRelationshipRef.current) {
        techRelationshipRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Memoized filter for performance
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return skillCategories
      .map((cat) => {
        const matchesCategory = selectedCategory === 'all' || cat.id === selectedCategory;
        if (!matchesCategory) return null;

        const filteredSkills = cat.skills.filter(
          (skill) => skill.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q)
        );

        if (q && filteredSkills.length === 0) return null;

        return {
          ...cat,
          skills: filteredSkills,
        };
      })
      .filter(Boolean);
  }, [selectedCategory, searchQuery]);

  const activeAssociations = useMemo(() => {
    return selectedTech ? getAssociatedWork(selectedTech) : null;
  }, [selectedTech, getAssociatedWork]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-36 bg-[#080808] overflow-hidden border-t border-white/5"
    >
      <AtmosphericGlow position="center" opacity={0.06} size="w-[700px] h-[700px]" />

      <Container className="relative z-10">
        
        {/* Section Header & Search Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="03 // TECHNICAL ARSENAL"
            title="Technical Ecosystem &"
            highlight="Capabilities"
            subtitle={`A comprehensive inventory of ${totalCapabilities} validated technical competencies across systems, full-stack architectures, and AI engineering.`}
            className="mb-0 lg:mb-0"
          />

          {/* Interactive Technology Search Field */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies or domains..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-xs font-mono text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#E87524] focus:ring-1 focus:ring-[#E87524] transition-all"
              aria-label="Search technologies and categories"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#737373] hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Functional Category Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-3 scrollbar-none border-b border-white/5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#E87524] text-black font-semibold shadow-[0_0_15px_rgba(232,117,36,0.3)]'
                : 'bg-[#121212] text-[#A1A1A1] hover:text-white border border-white/5'
            }`}
          >
            <span>All Capabilities</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              selectedCategory === 'all' ? 'bg-black/20 text-black' : 'bg-white/5 text-[#737373]'
            }`}>
              {totalCapabilities}
            </span>
          </button>
          
          {skillCategories.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            const CatIcon = iconMap[cat.icon] || Layers;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCatActive
                    ? 'bg-[#E87524] text-black font-semibold shadow-[0_0_15px_rgba(232,117,36,0.3)]'
                    : 'bg-[#121212] text-[#A1A1A1] hover:text-white border border-white/5'
                }`}
              >
                <CatIcon className={`w-3.5 h-3.5 ${isCatActive ? 'text-black' : 'text-[#E87524]'}`} />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isCatActive ? 'bg-black/20 text-black' : 'bg-white/5 text-[#737373]'
                }`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Technology Clusters */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {filteredCategories.map((cat, idx) => {
              const IconComponent = iconMap[cat.icon] || Layers;

              return (
                <div
                  key={cat.id || cat.name}
                  className="tech-cluster-card group p-6 sm:p-7 rounded-2xl bg-[#121212]/95 backdrop-blur-md border border-white/10 hover:border-[#E87524]/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
                >
                  {/* Subtle Top Border Glow on Card Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E87524]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#181818] border border-white/5 flex items-center justify-center text-[#E87524] group-hover:scale-105 group-hover:text-[#F5A14B] transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-[#737373] tracking-wider">
                        DOMAIN 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#A1A1A1] mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Interactive Technology Nodes with Specific Tech Icons */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {cat.skills.map((skill) => {
                        const isSelected = selectedTech === skill;
                        const work = getAssociatedWork(skill);
                        const hasWork = work.projects.length > 0 || work.experiences.length > 0;

                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleTechClick(skill)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 select-none text-left flex items-center gap-2 group/node cursor-pointer ${
                              isSelected
                                ? 'bg-[#E87524] text-black font-semibold shadow-[0_0_15px_rgba(232,117,36,0.4)] scale-105 ring-2 ring-[#F5A14B]'
                                : 'bg-[#181818] text-[#D4D4D4] border border-white/5 hover:border-[#E87524]/50 hover:text-white hover:bg-[#202020]'
                            }`}
                            aria-pressed={isSelected}
                            title={hasWork ? `${skill} — Click to view associated project implementations` : skill}
                          >
                            {/* Respective Technology SVG Icon */}
                            <span className="shrink-0 transition-transform group-hover/node:scale-110">
                              <TechIcon name={skill} className="w-4 h-4" />
                            </span>

                            <span>{skill}</span>

                            {hasWork && !isSelected && (
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[#E87524]"
                                title="Has associated projects in portfolio"
                              />
                            )}
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#737373]">
                    <span>{cat.skills.length} Capabilities</span>
                    <span className="text-[10px] text-[#A1A1A1] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E87524]" />
                      Click node to discover work
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#121212] border border-white/5 text-[#737373]">
            <p className="font-mono text-sm">No capabilities match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-mono text-[#E87524] underline hover:text-[#F5A14B] transition-colors"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        )}

        {/* ========================================================
            INTERACTIVE TECHNOLOGY-TO-PROJECT DISCOVERY TRAY
            ======================================================== */}
        <AnimatePresence>
          {selectedTech && activeAssociations && (
            <motion.div
              ref={techRelationshipRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="mt-12 rounded-3xl bg-gradient-to-r from-[#171717] via-[#141414] to-[#111111] border-2 border-[#E87524]/40 p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#E87524] text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(232,117,36,0.35)]">
                    <TechIcon name={selectedTech} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#F5F5F5] flex items-center gap-2 flex-wrap">
                      <span>Applied Work for:</span>
                      <span className="text-[#F5A14B] font-mono bg-white/5 px-2.5 py-0.5 rounded-lg border border-[#E87524]/30">
                        {selectedTech}
                      </span>
                    </h4>
                    <p className="text-xs font-mono text-[#A1A1A1] mt-1">
                      Verified implementations from resume portfolio projects and work history
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTech(null)}
                  className="p-2 rounded-xl bg-[#222222] text-[#A1A1A1] hover:text-white hover:bg-[#2c2c2c] border border-white/10 transition-colors cursor-pointer"
                  aria-label="Close relationship viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Matched Projects & Internships */}
              <div className="mt-6 space-y-4">
                {activeAssociations.projects.length === 0 && activeAssociations.experiences.length === 0 ? (
                  <div className="p-5 rounded-2xl bg-[#0d0d0d] border border-white/5 text-xs text-[#A1A1A1] space-y-2">
                    <p className="font-semibold text-[#F5F5F5] text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E87524]" />
                      Core Foundational Discipline
                    </p>
                    <p className="text-xs text-[#8c8c8c] leading-relaxed">
                      <strong className="text-white">{selectedTech}</strong> forms an academic and theoretical foundation in computer science (MCA & BCA curriculum), applied across algorithmic problem-solving, architectural design patterns, and software engineering coursework.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Associated Projects */}
                    {activeAssociations.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-5 rounded-2xl bg-[#0e0e0e] border border-white/10 flex flex-col justify-between group hover:border-[#E87524]/60 transition-all shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-semibold text-[#E87524] uppercase tracking-wider">
                              Project Showcase
                            </span>
                            <span className="text-[10px] font-mono text-[#737373]">
                              {proj.period}
                            </span>
                          </div>

                          <h5 className="text-sm font-display font-bold text-[#F5F5F5] mt-2 group-hover:text-[#F5A14B] transition-colors">
                            {proj.title}
                          </h5>
                          <p className="text-xs text-[#A1A1A1] mt-2 line-clamp-3 leading-relaxed">
                            {proj.summary}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => scrollTo('#projects', { offset: -70 })}
                            className="text-xs font-mono text-[#F5A14B] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Inspect Project</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#737373]">
                            {proj.category.split('&')[0].trim()}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Associated Experience (TAP Academy) */}
                    {activeAssociations.experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-5 rounded-2xl bg-[#0e0e0e] border border-white/10 flex flex-col justify-between group hover:border-emerald-500/60 transition-all shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                              Industry Internship
                            </span>
                            <span className="text-[10px] font-mono text-[#737373]">
                              {exp.period}
                            </span>
                          </div>

                          <h5 className="text-sm font-display font-bold text-[#F5F5F5] mt-2 group-hover:text-emerald-300 transition-colors">
                            {exp.role} @ {exp.company}
                          </h5>
                          <p className="text-xs text-[#A1A1A1] mt-2 line-clamp-3 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => scrollTo('#experience', { offset: -70 })}
                            className="text-xs font-mono text-emerald-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>View Internship</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                            Internship
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </section>
  );
}

export default SkillsSection;
