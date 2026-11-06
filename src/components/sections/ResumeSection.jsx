import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Download,
  Maximize2,
  ExternalLink,
  X,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData, personalInfo, educationData, experienceData, projectsData } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import AtmosphericGlow from '../common/AtmosphericGlow';

/**
 * Interactive Resume Section — "Beyond the Portfolio"
 * Document chassis with responsive PDF preview, full-screen modal, and graceful fallback.
 */
export function ResumeSection() {
  const [pdfExists, setPdfExists] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const modalCloseBtnRef = useRef(null);

  // Verify PDF presence
  useEffect(() => {
    fetch(resumeData.pdfPath, { method: 'HEAD' })
      .then((res) => {
        if (res.status === 404) {
          setPdfExists(false);
        } else {
          setPdfExists(true);
        }
      })
      .catch(() => setPdfExists(true)); // Default to true since asset is bundled in public/
  }, []);

  // Handle Escape key to close fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        if (showSetupModal) setShowSetupModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, showSetupModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isFullscreen || showSetupModal) {
      document.body.style.overflow = 'hidden';
      if (modalCloseBtnRef.current) {
        modalCloseBtnRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen, showSetupModal]);

  const handleDownloadClick = (e) => {
    if (!pdfExists) {
      e.preventDefault();
      setShowSetupModal(true);
    }
  };

  const handleFullscreenClick = () => {
    if (pdfExists) {
      setIsFullscreen(true);
    } else {
      setShowSetupModal(true);
    }
  };

  return (
    <section
      id="resume"
      className="relative py-24 sm:py-32 bg-[#090909] overflow-hidden border-t border-white/5"
    >
      <AtmosphericGlow position="top-center" opacity={0.12} size="w-[650px] h-[650px]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="06 // CURRICULUM VITAE"
          title={resumeData.sectionTitle}
          highlight="Format"
          subtitle={`${resumeData.headline} ${resumeData.description}`}
          align="left"
        />

        {/* Resume Document Frame Chassis */}
        <div className="relative rounded-3xl bg-[#111111] border border-white/10 shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Top Chassis Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-[#161616] border-b border-white/5">
            {/* Document Metadata Details */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E87524]" />
                <span className="font-mono text-xs font-semibold text-[#F5F5F5] tracking-wide">
                  {resumeData.fileName}
                </span>
              </div>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                ATS-OPTIMIZED
              </span>
            </div>

            {/* Document Action Controls */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Fullscreen Preview Action */}
              <button
                type="button"
                onClick={handleFullscreenClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-[#A1A1A1] hover:text-[#F5F5F5] border border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                aria-label="Expand resume to full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>

              {/* Open in New Tab Action */}
              <a
                href={pdfExists ? resumeData.pdfPath : '#'}
                onClick={(e) => {
                  if (!pdfExists) {
                    e.preventDefault();
                    setShowSetupModal(true);
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-[#A1A1A1] hover:text-[#F5F5F5] border border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-[#E87524]"
                aria-label="Open resume in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Tab</span>
              </a>

              {/* Primary Download Button */}
              <a
                href={pdfExists ? resumeData.pdfPath : '#'}
                download={pdfExists ? resumeData.fileName : undefined}
                onClick={handleDownloadClick}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#E87524] hover:bg-[#F5A14B] text-black transition-all shadow-[0_0_15px_rgba(232,117,36,0.3)] focus:outline-none focus:ring-2 focus:ring-[#E87524]"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Main Viewing Canvas */}
          <div className="relative min-h-[580px] sm:min-h-[700px] w-full bg-[#0d0d0d] p-4 sm:p-8 flex items-center justify-center">
            {pdfExists ? (
              /* Real Live PDF Embedded Viewer */
              <object
                data={resumeData.pdfPath}
                type="application/pdf"
                className="w-full h-full min-h-[580px] sm:min-h-[700px] rounded-xl border border-white/10 shadow-inner"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <p className="text-sm text-[#A1A1A1]">
                    Your browser does not support inline PDF streaming.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    href={resumeData.pdfPath}
                    download={resumeData.fileName}
                    icon={Download}
                  >
                    Download Resume PDF
                  </Button>
                </div>
              </object>
            ) : (
              /* Designed Document Showcase Skeleton & Deployment Guidance */
              <div className="w-full max-w-3xl rounded-2xl bg-[#141414] border border-white/10 p-6 sm:p-10 shadow-2xl relative space-y-8 select-none">
                
                {/* Document Header Sheet */}
                <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b border-white/10 gap-4">
                  <div>
                    <h4 className="text-2xl font-display font-bold text-[#F5F5F5] tracking-tight">
                      {personalInfo.name}
                    </h4>
                    <p className="text-xs font-mono text-[#E87524] mt-1">
                      {personalInfo.title} • {personalInfo.location}
                    </p>
                    <p className="text-xs font-mono text-[#737373] mt-0.5">
                      {personalInfo.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#1c1c1c] text-[#F5A14B] border border-[#E87524]/30 block w-fit sm:ml-auto">
                      OFFICIAL CURRICULUM VITAE
                    </span>
                    <span className="text-[10px] font-mono text-[#737373] mt-1 block">
                      Target Role: Software Engineer (Full-Stack / AI)
                    </span>
                  </div>
                </div>

                {/* Section Snapshot: Summary */}
                <div className="space-y-2">
                  <h5 className="text-xs font-mono uppercase tracking-widest text-[#E87524] font-bold">
                    Professional Summary
                  </h5>
                  <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </div>

                {/* Section Snapshot: Education & Experience Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-[#E87524] font-bold">
                      Education
                    </h5>
                    {educationData.map((edu, idx) => (
                      <div key={idx} className="text-xs">
                        <p className="font-semibold text-[#F5F5F5]">{edu.degree}</p>
                        <p className="text-[#A1A1A1]">{edu.institution} • {edu.period}</p>
                        <p className="text-[#F5A14B] font-mono mt-0.5">{edu.score}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-[#E87524] font-bold">
                      Current Experience
                    </h5>
                    {experienceData.map((exp) => (
                      <div key={exp.id} className="text-xs">
                        <p className="font-semibold text-[#F5F5F5]">{exp.role} @ {exp.company}</p>
                        <p className="text-[#A1A1A1]">{exp.location} • {exp.period}</p>
                        <p className="text-[#737373] mt-1 leading-relaxed line-clamp-2">
                          {exp.responsibilities[1]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Notice / Deployment Path Badge */}
                <div className="mt-8 p-4 rounded-xl bg-[#191510] border border-[#E87524]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-[#E87524] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#F5F5F5]">
                        Document Asset Slot Ready
                      </p>
                      <p className="text-[11px] font-mono text-[#A1A1A1] mt-0.5">
                        Place <code className="text-[#F5A14B]">Ashish-Kumar-Resume.pdf</code> into <code className="text-[#F5A14B]">public/assets/documents/</code> to activate the real embedded PDF stream.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    href={`mailto:${personalInfo.email}?subject=Resume%20Request%20-%20Ashish%20Kumar`}
                  >
                    Request PDF Direct
                  </Button>
                </div>

              </div>
            )}
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="px-6 py-3 bg-[#141414] border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#737373]">
            <span>FORMAT: PDF/A-COMPLIANT</span>
            <span>VERIFIED: EDUCATION & INTERNSHIP CREDENTIALS</span>
            <span className="text-[#E87524]">STANDALONE RESUME ENGINE</span>
          </div>

        </div>
      </Container>

      {/* ========================================================
          FULLSCREEN MODAL OVERLAY (Esc to close)
          ======================================================== */}
      <AnimatePresence>
        {isFullscreen && pdfExists && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E87524]" />
                <span className="font-display font-bold text-sm text-[#F5F5F5]">
                  {resumeData.fileName} — Fullscreen View
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={resumeData.pdfPath}
                  download={resumeData.fileName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-[#E87524] text-black font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 text-[#A1A1A1] hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E87524]"
                  aria-label="Close fullscreen modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal PDF Frame */}
            <div className="flex-1 w-full pt-4">
              <iframe
                src={resumeData.pdfPath}
                title="Ashish Kumar Resume Fullscreen"
                className="w-full h-full rounded-xl border border-white/10 bg-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          DOCUMENT SETUP / REQUEST MODAL
          ======================================================== */}
      <AnimatePresence>
        {showSetupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/15 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E87524]">
                  <FileText className="w-5 h-5" />
                  <span className="font-display font-bold text-base text-[#F5F5F5]">
                    Resume Asset Notice
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSetupModal(false)}
                  className="p-1.5 text-[#A1A1A1] hover:text-white rounded-lg border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#A1A1A1] leading-relaxed">
                <p>
                  The official PDF asset is designated to load from:
                </p>
                <div className="p-3 rounded-lg bg-[#0d0d0d] border border-white/5 font-mono text-xs text-[#F5A14B]">
                  public/assets/documents/Ashish-Kumar-Resume.pdf
                </div>
                <p>
                  To receive the complete verified resume file directly in your inbox immediately, you can trigger a direct email request:
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="md"
                  href={`mailto:${personalInfo.email}?subject=Resume%20Request%20-%20Ashish%20Kumar`}
                  className="flex-1"
                >
                  Request via Email
                </Button>
                <button
                  type="button"
                  onClick={() => setShowSetupModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#222222] text-xs font-mono text-[#A1A1A1] hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ResumeSection;
