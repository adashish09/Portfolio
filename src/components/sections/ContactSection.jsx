import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Loader2,
  Info,
  Clock,
  Sparkles,
  User,
  FileText,
  MessageSquare,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../../data/portfolioData';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import { Github, Linkedin } from '../common/Icons';
import AtmosphericGlow from '../common/AtmosphericGlow';

const QUICK_SUBJECTS = [
  { label: '💼 Engineering Opportunity', value: 'Software Engineering Opportunity' },
  { label: '🚀 Full-Stack / AI Project', value: 'Project Collaboration: Full-Stack / AI' },
  { label: '🤝 Technical Discussion', value: 'Technical Architecture & Collaboration' },
  { label: '⚡ General Inquiry', value: 'Portfolio Inquiry for Ashish Kumar' },
];

/**
 * Cinematic Contact Section — Optimized UI & UX with EmailJS
 * Features quick-subject chips, live character counter, instant validation,
 * 1-click clipboard copy, mailto fallback, and live availability badge.
 * Strictly excludes any phone number.
 */
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honeypot: '', // Spam prevention honeypot
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedSubjectChip, setSelectedSubjectChip] = useState('');

  // EmailJS Environment Variables
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Check if real EmailJS credentials have been provided
  const isEmailJSConfigured = Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    !serviceId.includes('your_') &&
    !templateId.includes('your_') &&
    !publicKey.includes('your_')
  );

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Please specify a subject line (at least 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please share your message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuickSubject = (chip) => {
    setSelectedSubjectChip(chip.label);
    setFormData((prev) => ({ ...prev, subject: chip.value }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: Silent trap for spambots
    if (formData._honeypot) {
      setStatus('success');
      return;
    }

    if (!validate()) {
      return;
    }

    // Graceful notice if keys are unconfigured in environment
    if (!isEmailJSConfigured) {
      setStatus('unconfigured');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const templateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200 || response.text === 'OK') {
        setStatus('success');
      } else {
        throw new Error('Email service returned an unexpected response status.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err?.text || err?.message || 'Transmission failed. You can dispatch directly via your email client.'
      );
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetForm = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' });
    setSelectedSubjectChip('');
    setErrors({});
  };

  const fallbackMailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject.trim() || 'Software Engineering Inquiry - Ashish Kumar'
  )}&body=${encodeURIComponent(
    `Hello Ashish,\n\nFrom: ${formData.name.trim() || '[Your Name]'}\nEmail: ${
      formData.email.trim() || '[Your Email]'
    }\n\nMessage:\n${formData.message.trim() || '[Your message here]'}`
  )}`;

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-36 bg-[#080808] overflow-hidden border-t border-white/5"
    >
      <AtmosphericGlow position="top-center" opacity={0.14} size="w-[650px] h-[650px]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="07 // INITIATE TRANSMISSION"
          title="Direct"
          highlight="Communication"
          subtitle="Whether you have an engineering opportunity, distributed systems challenge, or collaboration inquiry, my inbox is open."
          align="center"
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
          
          {/* Left Column: Direct Credentials & Verification */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Live Availability Status Card */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
                  Open to Opportunities
                </span>
              </div>

              <h3 className="text-base font-display font-bold text-[#F5F5F5] leading-snug">
                Actively seeking Software Engineer &amp; Full-Stack roles (2026)
              </h3>

              <div className="pt-3 border-t border-white/5 space-y-2.5 text-xs text-[#A1A1A1]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E87524]" />
                  <span>Typical response within <strong className="text-white">24 hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E87524]" />
                  <span>{personalInfo.location} · <span className="font-mono text-[#737373]">IST (UTC+5:30)</span></span>
                </div>
              </div>
            </div>

            {/* Verified Email Card with 1-Click Copy and Mailto */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373]">
                  Primary Email Channel
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E87524]/10 text-[#F5A14B] border border-[#E87524]/20">
                  Verified
                </span>
              </div>

              <p className="font-mono text-sm text-[#F5F5F5] break-all font-medium select-all">
                {personalInfo.email}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-xl bg-[#1c1c1c] hover:bg-[#252525] text-[#F5F5F5] border border-white/10 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#A1A1A1]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-xl bg-[#E87524]/15 hover:bg-[#E87524]/25 text-[#F5A14B] border border-[#E87524]/30 transition-colors"
                >
                  <span>Open App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Professional Social Channels */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#E87524]/50 flex flex-col justify-between transition-all hover:bg-[#141414]"
              >
                <div className="flex items-center justify-between">
                  <Github className="w-5 h-5 text-[#A1A1A1] group-hover:text-[#F5A14B] transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#F5A14B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <span className="text-xs font-display font-bold text-[#F5F5F5] block">
                    GitHub
                  </span>
                  <span className="text-[11px] font-mono text-[#737373] mt-0.5 block">
                    @adashish09
                  </span>
                </div>
              </a>

              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#E87524]/50 flex flex-col justify-between transition-all hover:bg-[#141414]"
              >
                <div className="flex items-center justify-between">
                  <Linkedin className="w-5 h-5 text-[#A1A1A1] group-hover:text-[#F5A14B] transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#F5A14B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-3">
                  <span className="text-xs font-display font-bold text-[#F5F5F5] block">
                    LinkedIn
                  </span>
                  <span className="text-[11px] font-mono text-[#737373] mt-0.5 block">
                    Ashish Kumar
                  </span>
                </div>
              </a>
            </div>

            {/* Privacy Protection Callout */}
            <div className="p-3.5 rounded-xl bg-[#0d0d0d] border border-white/5 flex items-center gap-2.5 text-[11px] font-mono text-[#737373]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct professional channels only · Zero spam policy</span>
            </div>
          </div>

          {/* Right Column: Verified EmailJS Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 shadow-2xl relative">
              
              <div className="mb-6">
                <h3 className="text-lg font-display font-bold text-[#F5F5F5] flex items-center gap-2">
                  <span>Send a Direct Message</span>
                  <span className="w-2 h-2 rounded-full bg-[#E87524]" />
                </h3>
                <p className="text-xs text-[#A1A1A1] mt-1">
                  Transmissions are delivered directly to Ashish&rsquo;s inbox via EmailJS.
                </p>
              </div>

              {/* Status Feedback Announcements (Accessible & Visual) */}
              <div aria-live="polite" role="status" className="mb-6">
                {status === 'success' && (
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-200">Transmission Dispatched Successfully!</p>
                        <p className="text-xs text-emerald-400/80 mt-1 leading-relaxed">
                          Thank you for reaching out. Your message has been routed to Ashish Kumar. A response will follow within 24 hours.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="text-xs font-mono font-medium text-emerald-300 hover:text-white underline cursor-pointer"
                      >
                        Send another transmission
                      </button>
                      <span className="text-[10px] font-mono text-emerald-400/60">EmailJS Confirmed</span>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs sm:text-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                      <div>
                        <p className="font-semibold text-red-200">Transmission Interrupted</p>
                        <p className="text-xs text-red-400/80 mt-1">{errorMessage}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-red-500/20 flex flex-wrap items-center gap-3">
                      <a
                        href={fallbackMailto}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E87524] text-black font-semibold text-xs font-mono hover:bg-[#F5A14B] transition-colors"
                      >
                        <span>Dispatch via Email Client</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="text-xs font-mono text-[#A1A1A1] hover:text-white"
                      >
                        Retry form submission
                      </button>
                    </div>
                  </div>
                )}

                {status === 'unconfigured' && (
                  <div className="p-5 rounded-2xl bg-[#181410] border border-[#E87524]/40 text-[#F5A14B] text-xs sm:text-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#E87524]" />
                      <div>
                        <p className="font-semibold text-[#F5F5F5]">Ready for Production Delivery</p>
                        <p className="text-xs text-[#A1A1A1] mt-1 leading-relaxed">
                          To enable instant in-browser EmailJS dispatch, add your <code className="text-[#F5A14B]">VITE_EMAILJS_SERVICE_ID</code>, <code className="text-[#F5A14B]">VITE_EMAILJS_TEMPLATE_ID</code>, and <code className="text-[#F5A14B]">VITE_EMAILJS_PUBLIC_KEY</code> to your environment.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2.5">
                      <Button
                        variant="primary"
                        size="sm"
                        href={fallbackMailto}
                        icon={Send}
                        iconPosition="right"
                      >
                        Send via Email Client
                      </Button>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="px-3 py-1.5 text-xs font-mono text-[#A1A1A1] hover:text-white"
                      >
                        Edit fields
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* The Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Invisible Honeypot Spam Guard */}
                  <input
                    type="text"
                    name="_honeypot"
                    value={formData._honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Name field */}
                  <div>
                    <label htmlFor="from_name" className="block text-xs font-mono text-[#A1A1A1] mb-1.5">
                      Your Name <span className="text-[#E87524]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="from_name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={status === 'submitting'}
                        placeholder="e.g. Sarah Connor"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161616] border text-sm text-[#F5F5F5] placeholder-[#737373] transition-colors focus:outline-none ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-white/10 focus:border-[#E87524] focus:ring-2 focus:ring-[#E87524]/20'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-400 mt-1 font-mono">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="from_email" className="block text-xs font-mono text-[#A1A1A1] mb-1.5">
                      Email Address <span className="text-[#E87524]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="from_email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        disabled={status === 'submitting'}
                        placeholder="e.g. sarah@techcorp.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161616] border text-sm text-[#F5F5F5] placeholder-[#737373] transition-colors focus:outline-none ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-white/10 focus:border-[#E87524] focus:ring-2 focus:ring-[#E87524]/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-400 mt-1 font-mono">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Quick Subject Chips */}
                  <div>
                    <label className="block text-xs font-mono text-[#A1A1A1] mb-2">
                      Topic Shortcut <span className="text-[#737373]">(Optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {QUICK_SUBJECTS.map((chip) => {
                        const isChipActive = selectedSubjectChip === chip.label || formData.subject === chip.value;
                        return (
                          <button
                            key={chip.label}
                            type="button"
                            onClick={() => handleQuickSubject(chip)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                              isChipActive
                                ? 'bg-[#E87524] text-black font-semibold shadow-[0_0_10px_rgba(232,117,36,0.3)]'
                                : 'bg-[#181818] text-[#A1A1A1] hover:text-white border border-white/5 hover:border-white/20'
                            }`}
                          >
                            {chip.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Subject input */}
                    <div className="relative">
                      <FileText className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        disabled={status === 'submitting'}
                        placeholder="Subject line or role designation..."
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161616] border text-sm text-[#F5F5F5] placeholder-[#737373] transition-colors focus:outline-none ${
                          errors.subject
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-white/10 focus:border-[#E87524] focus:ring-2 focus:ring-[#E87524]/20'
                        }`}
                      />
                    </div>
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-red-400 mt-1 font-mono">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-[#A1A1A1]">
                        Message Details <span className="text-[#E87524]">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${
                        formData.message.length >= 10 ? 'text-emerald-400' : 'text-[#737373]'
                      }`}>
                        {formData.message.length} / 1500 chars {formData.message.length >= 10 && '✓'}
                      </span>
                    </div>

                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        maxLength={1500}
                        value={formData.message}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        disabled={status === 'submitting'}
                        placeholder="Share details regarding your team, technology stack, project scope, or scheduling..."
                        className={`w-full px-4 py-3 rounded-xl bg-[#161616] border text-sm text-[#F5F5F5] placeholder-[#737373] transition-colors focus:outline-none resize-none ${
                          errors.message
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-white/10 focus:border-[#E87524] focus:ring-2 focus:ring-[#E87524]/20'
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-400 mt-1 font-mono">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submission CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={`w-full py-3.5 px-6 rounded-xl font-display font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        status === 'submitting'
                          ? 'bg-[#1e1e1e] text-[#737373] cursor-not-allowed border border-white/5'
                          : 'bg-[#E87524] hover:bg-[#F5A14B] text-black shadow-[0_0_25px_rgba(232,117,36,0.35)] hover:shadow-[0_0_35px_rgba(232,117,36,0.5)] active:scale-[0.99]'
                      }`}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#F5A14B]" />
                          <span>Routing via EmailJS...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch Transmission</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[11px] font-mono text-center text-[#737373] mt-3">
                      End-to-end encrypted dispatch · Delivered straight to Ashish Kumar
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
