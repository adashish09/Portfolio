import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  ArrowUpRight,
  Database,
  Sparkles,
  Shield,
  Smartphone,
  Server,
  Layers,
  Cpu,
  CheckCircle2,
  Terminal,
  Activity,
  GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Github } from '../common/Icons';
import AtmosphericGlow from '../common/AtmosphericGlow';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects Section — Phase 3 Editorial Elevation
 * Distinctive, non-identical architectural layouts for each verified project,
 * category filter tabs, and scannable technical deliverables.
 */
export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);
  const videoBgRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: 4 },
    { id: 'Full-Stack Web & E-Commerce', label: 'Full-Stack Web', count: 1 },
    { id: 'AI & Retrieval-Augmented Generation', label: 'Generative AI', count: 1 },
    { id: 'Systems, Security & Networking', label: 'Security & Systems', count: 1 },
    { id: 'Mobile Application & Cloud Sync', label: 'Mobile App', count: 1 },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  // GSAP Staggered ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-reveal-item',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 sm:py-32 bg-[#080808] overflow-hidden border-t border-white/5"
    >
      {/* Background Geometric Video Layer */}
      {!prefersReducedMotion && (
        <div className="absolute top-0 right-0 w-full sm:w-2/3 h-96 opacity-15 pointer-events-none overflow-hidden select-none z-0">
          <video
            ref={videoBgRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-right mix-blend-screen"
          >
            <source src="/assets/videos/project-atmosphere.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        </div>
      )}

      <AtmosphericGlow position="top-right" opacity={0.12} size="w-[650px] h-[650px]" />
      <AtmosphericGlow position="bottom-left" opacity={0.08} size="w-[500px] h-[500px]" />

      <Container className="relative z-10">
        
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="02 // FEATURED SYSTEMS"
            title="Selected Engineering"
            highlight="Projects"
            subtitle="Production web architectures, local LLM inference engines, live packet capture monitors, and offline-first mobile apps."
            className="mb-0 md:mb-0"
          />

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#121212] border border-white/10 w-fit">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-xl transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === tab.id
                    ? 'bg-[#E87524] text-black font-semibold shadow-[0_0_15px_rgba(232,117,36,0.3)]'
                    : 'text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === tab.id ? 'bg-black/20 text-black' : 'bg-white/5 text-[#737373]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Distinctive Projects Showcase */}
        <div className="space-y-16">
          
          {/* ========================================================
              PROJECT 1: KICKSHUB — EXPANSIVE FULL-STACK HERO CARD
              ======================================================== */}
          {filteredProjects.some((p) => p.id === 'kickshub') && (
            <motion.div
              layout
              className="project-reveal-item group relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#0f0f0f] border border-white/10 hover:border-[#E87524]/50 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-10"
            >
              {/* Card Ribbon */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-black px-3 py-1 rounded-full bg-[#E87524] shadow-[0_0_15px_rgba(232,117,36,0.4)]">
                    FEATURED WEB PLATFORM
                  </span>
                  <span className="text-xs font-mono text-[#A1A1A1]">
                    Sep 2026 – Oct 2026
                  </span>
                </div>

                {/* Multi-Cloud Deployment Badges */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373]">
                  <span className="px-2 py-0.5 rounded bg-[#1a1a1a] text-white border border-white/10">Frontend: Vercel</span>
                  <span className="px-2 py-0.5 rounded bg-[#1a1a1a] text-white border border-white/10">Backend: Render</span>
                  <span className="px-2 py-0.5 rounded bg-[#1a1a1a] text-[#F5A14B] border border-[#E87524]/30">DB: TiDB</span>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
                
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors tracking-tight">
                      KicksHub – Sneaker E-Commerce Platform
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                      A complete full-stack sneaker e-commerce platform built with a Flask REST API and React storefront, deployed on live multi-cloud infrastructure with transactional cart workflows and a comprehensive admin management suite.
                    </p>
                  </div>

                  {/* Scannable Deliverables List */}
                  <div className="space-y-3 p-5 rounded-2xl bg-[#0b0b0b] border border-white/5">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#E87524] font-semibold flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      Key Architectural Deliverables
                    </p>
                    <ul className="space-y-2.5">
                      <li className="text-xs sm:text-sm text-[#A1A1A1] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E87524] shrink-0 mt-0.5" />
                        <span>Built and deployed full-stack application with Flask REST API and React storefront, hosted on Vercel, Render, and TiDB.</span>
                      </li>
                      <li className="text-xs sm:text-sm text-[#A1A1A1] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E87524] shrink-0 mt-0.5" />
                        <span>Engineered catalog search, filtering, and pagination, with JWT authentication, database-backed cart, and transactional checkout.</span>
                      </li>
                      <li className="text-xs sm:text-sm text-[#A1A1A1] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E87524] shrink-0 mt-0.5" />
                        <span>Built role-based admin panel to manage products, categories, orders, and customer accounts.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-2.5">
                      Integrated Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Flask', 'MySQL (TiDB)', 'JWT Authentication', 'React.js', 'Vercel', 'Render'].map((t) => (
                        <Badge key={t} variant="default" size="sm">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      href="https://kickshub-store.vercel.app"
                      target="_blank"
                      icon={ArrowUpRight}
                      iconPosition="right"
                    >
                      Live Storefront
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      href="https://github.com/adashish09/kickshub"
                      target="_blank"
                      icon={Github}
                      iconPosition="left"
                    >
                      Source Code
                    </Button>
                  </div>
                </div>

                {/* Right Architecture Topology Frame */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-[#090909] border border-white/10 p-6 space-y-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#737373] pb-3 border-b border-white/5">
                        <span className="text-[#E87524]">DISTRIBUTED SYSTEM TOPOLOGY</span>
                        <span>PRODUCTION</span>
                      </div>

                      {/* Architecture Pipeline Visualizer */}
                      <div className="space-y-3 mt-5">
                        <div className="p-3.5 rounded-xl bg-[#121212] border border-white/10 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#F5A14B]">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#F5F5F5]">React.js Storefront</p>
                            <p className="text-[10px] font-mono text-[#737373]">Edge Hosted on Vercel CDN</p>
                          </div>
                        </div>

                        <div className="text-center text-[#E87524] text-xs font-mono">↓ REST API / JWT Calls</div>

                        <div className="p-3.5 rounded-xl bg-[#121212] border border-white/10 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#E87524]">
                            <Server className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#F5F5F5]">Python / Flask Microservice</p>
                            <p className="text-[10px] font-mono text-[#737373]">API Services Hosted on Render</p>
                          </div>
                        </div>

                        <div className="text-center text-[#E87524] text-xs font-mono">↓ Transactional Queries</div>

                        <div className="p-3.5 rounded-xl bg-[#121212] border border-[#E87524]/30 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#F5A14B]">
                            <Database className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#F5F5F5]">TiDB Cloud (MySQL)</p>
                            <p className="text-[10px] font-mono text-[#737373]">Distributed Relational Engine</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#737373] flex justify-between">
                      <span>STATUS: DEPLOYED</span>
                      <span className="text-[#F5A14B]">TRANSACTIONAL CART</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              PROJECT 2: AI RESUME INTERVIEWER — 3-TIER RAG AI CARD
              ======================================================== */}
          {filteredProjects.some((p) => p.id === 'ai-resume-interviewer') && (
            <motion.div
              layout
              className="project-reveal-item group relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#0f0f0f] border border-white/10 hover:border-[#E87524]/50 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#F5A14B] px-3 py-1 rounded-full bg-[#1a1510] border border-[#E87524]/40">
                    GENERATIVE AI & RAG PIPELINE
                  </span>
                  <span className="text-xs font-mono text-[#A1A1A1]">
                    Apr 2026 – May 2026
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373]">
                  <span>LLM: Llama 3.1 8B</span>
                  <span>•</span>
                  <span>Engine: Ollama</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
                
                {/* Left Description Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors tracking-tight">
                      AI Resume Interviewer Platform
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                      An intelligent technical interview platform that parses resumes and generates role-specific questions using Llama 3.1 8B via Ollama, grounded by a RAG pipeline with embeddings and semantic search.
                    </p>
                  </div>

                  {/* Scannable Deliverables List */}
                  <div className="space-y-3 p-5 rounded-2xl bg-[#0b0b0b] border border-white/5">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#E87524] font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key AI Deliverables
                    </p>
                    <ul className="space-y-2.5">
                      <li className="text-xs sm:text-sm text-[#A1A1A1] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E87524] shrink-0 mt-0.5" />
                        <span>Built an AI interview platform that parses resumes and generates role-specific questions using Llama 3.1 8B via Ollama, grounded by RAG embeddings.</span>
                      </li>
                      <li className="text-xs sm:text-sm text-[#A1A1A1] flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#E87524] shrink-0 mt-0.5" />
                        <span>Designed 3-tier architecture (React, Node.js REST API, Python inference service) with streamed AI responses and adaptive follow-up questions.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-2.5">
                      Integrated Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Node.js', 'Express.js', 'Python', 'MongoDB', 'Ollama (Llama 3.1 8B)', 'RAG', 'Vector Search'].map((t) => (
                        <Badge key={t} variant="default" size="sm">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      href="https://github.com/adashish09/AI-Resume-Interviewer"
                      target="_blank"
                      icon={Github}
                      iconPosition="left"
                    >
                      View Source Code
                    </Button>
                  </div>
                </div>

                {/* Right AI RAG System Blueprint Frame */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-[#090909] border border-white/10 p-6 space-y-4 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#737373] pb-3 border-b border-white/5">
                        <span className="text-[#F5A14B]">RAG REASONING PIPELINE</span>
                        <span>3-TIER ARCHITECTURE</span>
                      </div>

                      <div className="space-y-3 mt-4">
                        <div className="p-3 rounded-xl bg-[#141414] border border-white/10 text-xs">
                          <div className="flex justify-between items-center text-[11px] font-mono text-[#E87524] mb-1">
                            <span>TIER 1: CLIENT FRONTEND</span>
                            <span>STREAMING</span>
                          </div>
                          <p className="text-[#F5F5F5] font-semibold">React.js Real-Time Dialogue</p>
                          <p className="text-[11px] text-[#A1A1A1]">Server-sent token streaming & adaptive UI</p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#141414] border border-white/10 text-xs">
                          <div className="flex justify-between items-center text-[11px] font-mono text-[#E87524] mb-1">
                            <span>TIER 2: API GATEWAY</span>
                            <span>NODE.JS / EXPRESS</span>
                          </div>
                          <p className="text-[#F5F5F5] font-semibold">Resume Parser & MongoDB Store</p>
                          <p className="text-[11px] text-[#A1A1A1]">User session state & structured questions</p>
                        </div>

                        <div className="p-3 rounded-xl bg-[#141414] border border-[#E87524]/30 text-xs">
                          <div className="flex justify-between items-center text-[11px] font-mono text-[#F5A14B] mb-1">
                            <span>TIER 3: INFERENCE ENGINE</span>
                            <span>LOCAL LLM</span>
                          </div>
                          <p className="text-[#F5F5F5] font-semibold">Python + Ollama (Llama 3.1 8B)</p>
                          <p className="text-[11px] text-[#A1A1A1]">Vector embeddings grounding & semantic query search</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#737373] flex justify-between">
                      <span>PIPELINE: GROUNDED RAG</span>
                      <span className="text-emerald-400">STREAMED TOKENS</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ========================================================
              PROJECT 3 & 4: DUAL-COLUMN GRID FOR SYSTEMS & MOBILE
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Project 3: NetSentinel */}
            {filteredProjects.some((p) => p.id === 'netsentinel') && (
              <motion.div
                layout
                className="project-reveal-item group relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#0f0f0f] border border-white/10 hover:border-[#E87524]/50 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#737373]">
                    <span className="text-[#E87524] font-semibold flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      SECURITY & NETWORKING
                    </span>
                    <span>Jan 2026 – Mar 2026</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors mt-4">
                    NetSentinel – Network Intrusion Detection
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1A1] mt-2.5 leading-relaxed">
                    A Linux-based security system leveraging Python packet capture to inspect live network traffic, detect anomalies with rule engines, and visualize alerts in real-time.
                  </p>

                  <div className="mt-5 space-y-2 p-4 rounded-xl bg-[#090909] border border-white/5 text-xs text-[#A1A1A1]">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E87524] shrink-0 mt-0.5" />
                      <span>Built Linux system using Python packet capture to inspect live traffic and flag anomalies with threshold- and pattern-based rules.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E87524] shrink-0 mt-0.5" />
                      <span>Developed React.js dashboard for live traffic visualization, alert history, and threat monitoring.</span>
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {['Python', 'React.js', 'Linux', 'Packet Capture', 'Anomaly Detection'].map((t) => (
                      <Badge key={t} variant="default" size="xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <Button
                    variant="secondary"
                    size="sm"
                    href="https://github.com/adashish09/NetSentinel"
                    target="_blank"
                    icon={Github}
                    iconPosition="left"
                  >
                    Source Code
                  </Button>
                  <span className="text-[11px] font-mono text-[#737373]">
                    PACKET INSPECTION
                  </span>
                </div>
              </motion.div>
            )}

            {/* Project 4: FlipLearn */}
            {filteredProjects.some((p) => p.id === 'fliplearn') && (
              <motion.div
                layout
                className="project-reveal-item group relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#0f0f0f] border border-white/10 hover:border-[#E87524]/50 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-[#737373]">
                    <span className="text-[#F5A14B] font-semibold flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      MOBILE APPLICATION
                    </span>
                    <span>Sep 2025 – Nov 2025</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#F5F5F5] group-hover:text-[#F5A14B] transition-colors mt-4">
                    FlipLearn – Cross-Platform Learning App
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1A1] mt-2.5 leading-relaxed">
                    A cross-platform mobile educational application crafted with Flutter and Firebase, featuring offline-first data caching and an interactive gamified quiz engine with per-user progress analytics.
                  </p>

                  <div className="mt-5 space-y-2 p-4 rounded-xl bg-[#090909] border border-white/5 text-xs text-[#A1A1A1]">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E87524] shrink-0 mt-0.5" />
                      <span>Built cross-platform Flutter app with Firebase Auth and Firestore, using local caching for offline-first sync.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E87524] shrink-0 mt-0.5" />
                      <span>Designed gamified quiz engine with dynamic content loading and per-user progress tracking.</span>
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Offline-First Sync'].map((t) => (
                      <Badge key={t} variant="default" size="xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#737373] italic">
                    Proprietary / Academic Architecture
                  </span>
                  <span className="text-[11px] font-mono text-[#737373]">
                    FLUTTER ENGINE
                  </span>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </Container>
    </section>
  );
}

export default ProjectsSection;
