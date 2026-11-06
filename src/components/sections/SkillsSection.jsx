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
  X
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import AtmosphericGlow from '../common/AtmosphericGlow';
import { TechIcon } from '../common/TechIcons';
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
 * Technical Ecosystem — Clean Uniform Arsenal Grid
 * Uniform equal-sized cards displaying each technology's authentic icon and name.
 */
export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Flatten all skills into a unified list with category mapping
  const allSkillsList = useMemo(() => {
    return skillCategories.flatMap((cat) =>
      cat.skills.map((skill) => ({
        name: skill,
        categoryName: cat.name,
        categoryId: cat.id,
      }))
    );
  }, []);

  // Filter skills based on selected category pill and search query
  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allSkillsList.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q)
      );
    });
  }, [allSkillsList, selectedCategory, searchQuery]);

  // GSAP scroll trigger entrance animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-box-item',
        {
          opacity: 0,
          scale: 0.95,
          y: 15,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.02,
          ease: 'power2.out',
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-36 bg-[#080808] overflow-hidden border-t border-white/5"
    >
      <AtmosphericGlow position="center" opacity={0.07} size="w-[700px] h-[700px]" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="03 // TECHNICAL ARSENAL"
            title="Technical Ecosystem &"
            highlight="Capabilities"
            subtitle={`A verified inventory of ${allSkillsList.length} technologies, frameworks, and programming languages.`}
            className="mb-0 lg:mb-0"
          />

          {/* Quick Search Field */}
          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#121212] border border-white/10 text-xs font-mono text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#E87524] focus:ring-1 focus:ring-[#E87524] transition-all"
              aria-label="Search technologies"
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

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-3 scrollbar-none border-b border-white/5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#E87524] text-black font-semibold shadow-[0_0_15px_rgba(232,117,36,0.3)]'
                : 'bg-[#121212] text-[#A1A1A1] hover:text-white border border-white/5'
            }`}
          >
            <span>All Capabilities</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              selectedCategory === 'all' ? 'bg-black/20 text-black' : 'bg-white/5 text-[#737373]'
            }`}>
              {allSkillsList.length}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
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

        {/* ========================================================
            UNIFORM EQUAL-SIZED TECHNOLOGY BOXES GRID
            ======================================================== */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredSkills.map((item) => (
              <div
                key={item.name}
                className="tech-box-item group h-32 rounded-2xl bg-[#111111]/90 backdrop-blur-md border border-white/10 hover:border-[#E87524]/60 hover:bg-[#161616] hover:shadow-[0_0_20px_rgba(232,117,36,0.22)] transition-all duration-300 flex flex-col items-center justify-center p-3.5 text-center relative overflow-hidden"
              >
                {/* Subtle Top Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E87524]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Uniform Technology Icon Container */}
                <div className="w-11 h-11 rounded-xl bg-[#181818] border border-white/5 flex items-center justify-center mb-2.5 shrink-0 group-hover:scale-110 group-hover:border-[#E87524]/40 transition-all duration-300 shadow-inner">
                  <TechIcon name={item.name} className="w-6 h-6" />
                </div>

                {/* Uniform Technology Name */}
                <span className="text-xs font-mono font-medium text-[#E5E5E5] group-hover:text-white transition-colors line-clamp-2 px-1 leading-snug">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#121212] border border-white/5 text-[#737373]">
            <p className="font-mono text-sm">No capabilities match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-mono text-[#E87524] underline hover:text-[#F5A14B] transition-colors cursor-pointer"
            >
              Reset Filters &amp; View All
            </button>
          </div>
        )}

      </Container>
    </section>
  );
}

export default SkillsSection;
