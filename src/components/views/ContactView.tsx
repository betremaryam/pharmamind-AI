import React, { useState, useEffect } from 'react';
import { PageView, PilotInquiry } from '../../types';
import {
  Send,
  CheckCircle2,
  Building2,
  Stethoscope,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Settings,
  Mail,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  submitFormspreeResponse,
  getFormspreeTarget,
  FORMSPREE_STORAGE_KEY,
  FORMSPREE_FALLBACK_EMAIL
} from '../../services/formspree';

interface ContactViewProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
  onOpenChatbot?: () => void;
  onOpenSecurity?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onOpenSimulator,
  onOpenChatbot,
  onOpenSecurity
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Pharmacy educator or dean');
  const [institution, setInstitution] = useState('');
  const [cohortSize, setCohortSize] = useState('30–60 students');
  const [message, setMessage] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<PilotInquiry | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FORMSPREE_FALLBACK_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Formspree state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [formspreeTarget, setFormspreeTarget] = useState(() => getFormspreeTarget());
  const [customInput, setCustomInput] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem(FORMSPREE_STORAGE_KEY) || '' : '';
  });

  useEffect(() => {
    setFormspreeTarget(getFormspreeTarget());
  }, []);

  const handleSaveCustomTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      localStorage.setItem(FORMSPREE_STORAGE_KEY, customInput.trim());
    } else {
      localStorage.removeItem(FORMSPREE_STORAGE_KEY);
    }
    setFormspreeTarget(getFormspreeTarget());
    setShowConfig(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const submissionTime = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const payload = {
      _subject: `New PharmaMind Pilot Inquiry: ${name} (${institution || 'Independent'})`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not provided',
      role,
      institution: institution.trim() || 'Not specified',
      cohortSize,
      message: message.trim(),
      formType: 'Institutional Pilot & Content Review Request',
      submittedAt: submissionTime,
    };

    const result = await submitFormspreeResponse(payload);

    setIsSubmitting(false);

    if (result.ok) {
      setSubmittedInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        role,
        institution: institution.trim() || 'Not specified',
        cohortSize,
        message: message.trim(),
        submittedAt: submissionTime
      });
      // Clear inputs
      setName('');
      setEmail('');
      setPhone('');
      setInstitution('');
      setMessage('');
    } else {
      setSubmitError(
        result.error ||
        'Unable to send response to Formspree. Please check your internet connection or verify the Formspree endpoint.'
      );
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Title Header */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Context */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block">
              Contact &amp; Partnerships
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E] leading-[1.14]">
              Start a pilot, or challenge the content
            </h1>
            <p className="text-base sm:text-lg text-[#4B5350] leading-relaxed">
              Both are welcome. If you teach pharmacy, supervise a hospital department, review clinical content or fund early-stage health education work in Ethiopia, this is the right channel.
            </p>

            {/* Workable Direct Medical Contact Card */}
            <div className="p-5 rounded-xl bg-white border-2 border-[#1E6B5E]/30 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E4EEEA] text-[#1E6B5E] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1B211E]">Direct Clinical &amp; Pilot Liaison</h3>
                    <p className="text-xs text-[#757D79]">Pharmacist Betremaryam (Addis Ababa)</p>
                  </div>
                </div>
                <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active Channel
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[#757D79] font-medium">Direct Email:</span>
                  <a
                    href={`mailto:${FORMSPREE_FALLBACK_EMAIL}?subject=PharmaMind%20AI%20Inquiry%20from%20Colleague`}
                    className="font-mono font-semibold text-[#1E6B5E] hover:underline break-all"
                  >
                    {FORMSPREE_FALLBACK_EMAIL}
                  </a>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#E8E5DD]">
                  <span className="text-[#757D79] font-medium">Phone / WhatsApp:</span>
                  <span className="font-mono text-[#1B211E] font-medium">+251 91 100 0000 / +251 92 000 0000</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={`mailto:${FORMSPREE_FALLBACK_EMAIL}?subject=PharmaMind%20AI%20Pilot%20&%20Partnership%20Inquiry`}
                  className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email Now</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EEE6] border border-[#DCD8CF] text-[#1B211E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {emailCopied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-3.5 h-3.5 text-[#757D79]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                {onOpenChatbot && (
                  <button
                    type="button"
                    onClick={onOpenChatbot}
                    className="w-full sm:w-auto px-3 py-2 rounded-lg bg-[#10201C] hover:bg-[#1C362F] text-[#8FB8AC] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ask Pharmacist Betremaryam (AI)</span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#DCD8CF]">
              <div
                onClick={() => onNavigate('institutions')}
                className="p-4 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                    Schools of pharmacy
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#757D79] group-hover:text-[#1E6B5E] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#757D79] leading-relaxed mt-1">
                  Six-week pilot with one cohort, free of charge, in exchange for pre and post competency data your faculty own and publish.
                </p>
              </div>

              <div
                onClick={() => onNavigate('evidence')}
                className="p-4 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                    Clinical reviewers
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#757D79] group-hover:text-[#1E6B5E] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#757D79] leading-relaxed mt-1">
                  Practising clinical pharmacists to review and sign cases. Named credit on every case you approve for training.
                </p>
              </div>

              <div
                onClick={() => onNavigate('institutions')}
                className="p-4 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                    Hospitals and professional associations
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#757D79] group-hover:text-[#1E6B5E] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#757D79] leading-relaxed mt-1">
                  Departmental CPD, stewardship training and documentation capability, aligned with Directive No. 332/2020.
                </p>
              </div>

              <div
                onClick={() => onNavigate('about')}
                className="p-4 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                    Funders and partners
                  </h4>
                  <ArrowRight className="w-4 h-4 text-[#757D79] group-hover:text-[#1E6B5E] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#757D79] leading-relaxed mt-1">
                  Support for case development, clinical review honoraria, hosting and the AI grading layer through the pilot period.
                </p>
              </div>

              {onOpenSecurity && (
                <div
                  onClick={onOpenSecurity}
                  className="p-4 rounded-lg bg-[#E4EEEA] border border-[#BBD7CF] hover:border-[#1E6B5E] transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#1E6B5E]" />
                      <h4 className="text-sm font-bold text-[#12463C] group-hover:text-[#1E6B5E] transition-colors">
                        Cybersecurity, PHI &amp; Data Placement
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#1E6B5E] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-[#2A524A] leading-relaxed mt-1">
                    Review our zero-identifiable-PHI policy, in-memory browser execution model, and server-side API secret isolation architecture.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-xl border border-[#DCD8CF] p-6 sm:p-8 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#1B211E]">
                    Get in touch
                  </h3>
                  <p className="text-xs sm:text-sm text-[#757D79]">
                    Fill out your details to request an institutional pilot cohort or discuss clinical content collaboration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfig(!showConfig)}
                  title="Configure Formspree Endpoint"
                  className="p-1.5 rounded-md text-[#757D79] hover:text-[#1B211E] hover:bg-[#FAF9F5] border border-transparent hover:border-[#DCD8CF] transition-colors shrink-0"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Formspree Connection Status Badge */}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span className="font-medium text-[#12463C]">Formspree Connected</span>
                  <span className="text-[#757D79] truncate max-w-[200px] sm:max-w-[280px]">
                    → {formspreeTarget.displayTarget}
                  </span>
                </div>
                {formspreeTarget.isCustom && (
                  <span className="text-[0.68rem] font-semibold px-1.5 py-0.5 rounded bg-[#E4EEEA] text-[#1E6B5E]">
                    Custom Endpoint
                  </span>
                )}
              </div>

              {/* Optional Formspree Settings Drawer */}
              {showConfig && (
                <form
                  onSubmit={handleSaveCustomTarget}
                  className="mb-6 p-4 rounded-lg bg-[#FAF9F5] border border-[#1E6B5E]/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1B211E] uppercase tracking-wider">
                      Formspree Endpoint Configuration
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowConfig(false)}
                      className="text-xs text-[#757D79] hover:underline"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-xs text-[#4B5350]">
                    Enter your specific Formspree Form ID (e.g. <code className="bg-white px-1 py-0.5 rounded border border-[#DCD8CF]">xpzgkora</code>) from your formspree.io dashboard, or leave empty to use default destination (<code className="bg-white px-1 py-0.5 rounded border border-[#DCD8CF]">{FORMSPREE_FALLBACK_EMAIL}</code>).
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="e.g. xpwzkgab or https://formspree.io/f/..."
                      className="flex-1 p-2 text-xs rounded bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold rounded text-white bg-[#1E6B5E] hover:bg-[#12463C]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              {/* Submission Error Banner */}
              {submitError && (
                <div className="mb-5 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Formspree notice:</strong>
                      <span>{submitError}</span>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center gap-3">
                    <a
                      href={`mailto:${FORMSPREE_FALLBACK_EMAIL}?subject=PharmaMind%20Pilot%20Inquiry%20from%20${encodeURIComponent(name || 'Colleague')}&body=${encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}\nInstitution: ${institution}\nCohort Size: ${cohortSize}\n\nMessage:\n${message}`
                      )}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-rose-900 underline hover:no-underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send directly via Email instead</span>
                    </a>
                  </div>
                </div>
              )}

              {submittedInquiry ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-lg bg-[#E4EEEA] border border-[#BBD7CF] text-[#12463C] space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1E6B5E]" />
                    <h4 className="font-bold text-sm">Response delivered to Formspree!</h4>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Thank you, <strong>{submittedInquiry.name}</strong>. Your inquiry has been transmitted via Formspree and recorded for delivery to <strong>{formspreeTarget.displayTarget}</strong>.
                  </p>
                  <div className="p-3 rounded bg-white/70 border border-[#BBD7CF]/60 text-xs space-y-1 font-mono text-[#1B211E]">
                    <div><strong>Institution:</strong> {submittedInquiry.institution}</div>
                    <div><strong>Role:</strong> {submittedInquiry.role}</div>
                    {submittedInquiry.phone && <div><strong>Phone:</strong> {submittedInquiry.phone}</div>}
                    <div><strong>Target Cohort:</strong> {submittedInquiry.cohortSize}</div>
                    <div><strong>Logged:</strong> {submittedInquiry.submittedAt}</div>
                  </div>
                  <p className="text-[0.75rem] text-[#4B5350]">
                    Our clinical education team in Addis Ababa will review your proposed cohort dates and follow up at <em>{submittedInquiry.email}</em>{submittedInquiry.phone ? ` or call ${submittedInquiry.phone}` : ''}.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
                    >
                      ← Submit another inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Full name *</label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. / Ato / Woizero..."
                        className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Email address *</label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="pharmacist@institution.edu.et"
                        className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#1E6B5E]" />
                        <span>Phone number (Optional)</span>
                      </label>
                      <input
                        type="tel"
                        disabled={isSubmitting}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+251 91 234 5678"
                        className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">I am a</label>
                      <select
                        value={role}
                        disabled={isSubmitting}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                      >
                        <option>Pharmacy educator or dean</option>
                        <option>Hospital pharmacy head</option>
                        <option>Practising clinical pharmacist</option>
                        <option>Clinical content reviewer</option>
                        <option>Student or pharmacy intern</option>
                        <option>Funder or health partner</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Institution / Hospital</label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="e.g. Addis Ababa University, Tikur Anbessa..."
                        className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Target Cohort Size (if planning pilot)</label>
                      <select
                        value={cohortSize}
                        disabled={isSubmitting}
                        onChange={(e) => setCohortSize(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                      >
                        <option>10–30 students (Small Clerkship)</option>
                        <option>30–60 students (Standard Class Cohort)</option>
                        <option>60–120 students (Full Faculty Year)</option>
                        <option>Hospital Departmental Staff (CPD)</option>
                        <option>Individual Reviewer (N/A)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B211E] mb-1">What would you like to do?</label>
                    <textarea
                      rows={4}
                      disabled={isSubmitting}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="For example: Run a free pilot with our fourth-year clerkship cohort next semester, or review the TB/HIV dolutegravir case..."
                      className="w-full p-2.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] disabled:bg-[#1E6B5E]/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to Formspree...</span>
                      </>
                    ) : (
                      <>
                        <span>Send pilot request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[0.75rem] text-[#757D79] text-center pt-1">
                    Direct delivery to {formspreeTarget.displayTarget} via Formspree. No spam.
                  </p>
                </form>
              )}
            </div>

            {/* Direct prototype link card */}
            <div className="bg-[#FAF9F5] rounded-xl border border-[#DCD8CF] p-5 space-y-2">
              <h4 className="text-sm font-bold text-[#1B211E]">Prefer to test the simulator right now?</h4>
              <p className="text-xs text-[#757D79] leading-relaxed">
                You do not need to wait for a pilot approval. The clinical case simulation runner is completely open for review.
              </p>
              <div className="pt-1">
                <button
                  onClick={onOpenSimulator}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
                >
                  <span>Launch Interactive Simulator Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
