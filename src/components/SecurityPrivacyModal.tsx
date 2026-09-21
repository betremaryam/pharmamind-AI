import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Server,
  Database,
  EyeOff,
  KeyRound,
  FileCheck2,
  Mail,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Laptop,
  Globe,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecurityPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'placement' | 'phi' | 'controls' | 'governance';
}

export const SecurityPrivacyModal: React.FC<SecurityPrivacyModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'placement'
}) => {
  const [activeTab, setActiveTab] = useState<'placement' | 'phi' | 'controls' | 'governance'>(defaultTab);

  // Sync tab if defaultTab changes when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Keyboard shortcut to close (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF9F5] border border-[#DCD8CF] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#10201C] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#1C362F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs border border-[#8FB8AC]/30">
              <ShieldCheck className="w-5 h-5 text-[#8FB8AC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-white">
                  Cybersecurity, Data Architecture &amp; Privacy
                </h3>
                <span className="hidden sm:inline-flex text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Verified In-Memory Architecture
                </span>
              </div>
              <p className="text-xs text-[#8FB8AC]">
                Transparent security specifications, infrastructure placement, and PHI de-identification policies
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-red-600 transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Trust Summary Strip */}
        <div className="bg-[#E4EEEA] border-b border-[#BBD7CF] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#12463C] shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <strong>Zero PHI Storage:</strong> No patient identifiers stored
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <strong>TLS 1.3 / HTTPS:</strong> 256-bit encrypted transit
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <strong>Server-Side Vault:</strong> Gemini API keys protected
            </span>
          </div>
          <span className="font-mono text-[0.7rem] text-[#1E6B5E] font-semibold">Cloud Run · europe-west1</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#DCD8CF] bg-white px-4 sm:px-6 gap-1 sm:gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('placement')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'placement'
                ? 'border-[#1E6B5E] text-[#1E6B5E]'
                : 'border-transparent text-[#757D79] hover:text-[#1B211E]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Placement &amp; Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('phi')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'phi'
                ? 'border-[#1E6B5E] text-[#1E6B5E]'
                : 'border-transparent text-[#757D79] hover:text-[#1B211E]'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>Patient Privacy &amp; PHI</span>
          </button>

          <button
            onClick={() => setActiveTab('controls')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'controls'
                ? 'border-[#1E6B5E] text-[#1E6B5E]'
                : 'border-transparent text-[#757D79] hover:text-[#1B211E]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Cybersecurity Controls</span>
          </button>

          <button
            onClick={() => setActiveTab('governance')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'governance'
                ? 'border-[#1E6B5E] text-[#1E6B5E]'
                : 'border-transparent text-[#757D79] hover:text-[#1B211E]'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Governance &amp; Liaison</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-[#1B211E]">
          {/* TAB 1: DATA PLACEMENT & ARCHITECTURE */}
          {activeTab === 'placement' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1B211E] mb-2">
                  Where is data placed across PharmaMind AI?
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5350] leading-relaxed">
                  PharmaMind AI operates on a modern, privacy-first <strong>zero-persistence edge model</strong> for clinical simulation and bedside calculators, complemented by secure server-side isolated proxying for AI consultations.
                </p>
              </div>

              {/* Architecture Map Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Client-Side Browser RAM */}
                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-700 block">
                      Local Execution
                    </span>
                    <h5 className="font-bold text-sm text-[#1B211E]">Browser In-Memory (RAM)</h5>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    Bedside calculations (Cockcroft-Gault CrCl, BMI, BP evaluation, corrected calcium, fasting timetables) run <strong>100% inside your browser session</strong>. No lab numbers or clinical parameters are transmitted to any database or logging system.
                  </p>
                  <div className="pt-2 border-t border-[#E8E5DD] text-[0.7rem] text-[#1E6B5E] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Flushed immediately on tab close</span>
                  </div>
                </div>

                {/* 2. Isolated Server-Side Container */}
                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-blue-700 block">
                      Secure Backend Gateway
                    </span>
                    <h5 className="font-bold text-sm text-[#1B211E]">Cloud Run Container</h5>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    Chat queries to Pharmacist Betremaryam route through an isolated Express backend on Google Cloud (<code className="text-[0.72rem] bg-stone-100 px-1 py-0.5 rounded">europe-west1</code>). The server handles Gemini AI calls securely so your client browser never handles API secrets.
                  </p>
                  <div className="pt-2 border-t border-[#E8E5DD] text-[0.7rem] text-blue-800 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Stateless request-response proxy</span>
                  </div>
                </div>

                {/* 3. Inquiry Transmission */}
                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-amber-800 block">
                      Encrypted Relay
                    </span>
                    <h5 className="font-bold text-sm text-[#1B211E]">Pilot Inquiries &amp; Contacts</h5>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    Formal partnership and pilot applications are sent via TLS-encrypted HTTPS to Formspree, delivering messages directly to your designated email liaison: <strong className="break-all font-mono text-[0.72rem]">betremaryameshete@gmail.com</strong>.
                  </p>
                  <div className="pt-2 border-t border-[#E8E5DD] text-[0.7rem] text-amber-900 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>End-to-end verified mailbox</span>
                  </div>
                </div>
              </div>

              {/* Data Flow Diagram Breakdown */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#10201C] text-white space-y-3 border border-[#1C362F]">
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Data Flow Architecture at a Glance</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#8FB8AC]">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <div className="font-bold text-white">1. Clinician / Learner Input</div>
                    <p className="text-[0.72rem] text-[#A9B3AE]">Calculations stay local. Chat questions contain only medical inquiries.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <div className="font-bold text-white">2. Reverse Proxy &amp; Server</div>
                    <p className="text-[0.72rem] text-[#A9B3AE]">Encrypted via TLS 1.3 to port 3000. Injects system instructions and guidelines.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                    <div className="font-bold text-white">3. Google GenAI Processing</div>
                    <p className="text-[0.72rem] text-[#A9B3AE]">Gemini 3.8 Flash evaluates clinical reasoning and returns evidence-based rationale.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PATIENT HEALTH INFORMATION (PHI) */}
          {activeTab === 'phi' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1B211E] mb-2">
                  Patient Health Information (PHI) &amp; De-Identification Standards
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5350] leading-relaxed">
                  PharmaMind AI is strictly an educational clinical reasoning simulator and decision support assistant. We implement a rigorous <strong>zero-identifiable-data posture</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-3">
                  <h5 className="font-bold text-sm text-[#1B211E] flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-emerald-700" />
                    <span>What We NEVER Collect or Store</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-[#4B5350]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Real patient names, nicknames, or family contacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Hospital medical record numbers (MRNs) or bed numbers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>National ID numbers or geographic residential addresses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Insurance, financial, or billing records</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-3">
                  <h5 className="font-bold text-sm text-[#1B211E] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Permitted Educational Parameters</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-[#4B5350]">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>De-identified physiological parameters (e.g. age: 62, weight: 65 kg)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Serum creatinine, BP values, lab thresholds (CrCl, electrolytes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Active medication lists for drug interaction screening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Simulated synthetic patient cases created for student learning</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF4EA] border border-[#ECDCC2] text-xs text-[#734D16] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-sm text-[#5B3908]">
                  <AlertCircle className="w-4 h-4" />
                  <span>Notice for Clinical Instructors &amp; Pharmacy Students</span>
                </div>
                <p>
                  When querying the AI or conducting simulated case workups, always adhere to the Ethiopian Ministry of Health Clinical Ethics Guidelines and international HIPAA safe-harbor principles: <strong>never enter recognizable patient identifying details</strong> into any digital assistant.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CYBERSECURITY CONTROLS */}
          {activeTab === 'controls' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1B211E] mb-2">
                  Technical Security Controls &amp; Infrastructure Defenses
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5350] leading-relaxed">
                  Our system architecture is engineered following modern DevSecOps standards and Google Cloud security benchmarks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B211E]">
                    <KeyRound className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Server-Side Secret Vaulting</span>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    The Google GenAI API key (<code className="text-[0.72rem] bg-stone-100 px-1 py-0.5 rounded">GEMINI_API_KEY</code>) is injected exclusively into the container runtime. It is never exposed in browser developer tools or JavaScript bundles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B211E]">
                    <Lock className="w-4 h-4 text-[#1E6B5E]" />
                    <span>TLS 1.3 In-Transit Encryption</span>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    All client-to-server and server-to-Gemini API communications are strictly encrypted using TLS 1.3 / HTTPS with modern Perfect Forward Secrecy (PFS) ciphers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B211E]">
                    <Server className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Hardened Network Ingress</span>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    External traffic is strictly terminated via an authenticated reverse proxy routed to Port 3000. Internal container ports are not exposed to the public internet.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#1B211E]">
                    <Globe className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Zero Commercial Ad Trackers</span>
                  </div>
                  <p className="text-xs text-[#5B6360] leading-relaxed">
                    PharmaMind AI does not embed third-party advertising SDKs, Facebook pixels, data brokers, or marketing trackers. Your clinical queries belong to your educational session.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GOVERNANCE & LIAISON */}
          {activeTab === 'governance' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1B211E] mb-2">
                  Data Governance, Audits &amp; Security Liaison
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5350] leading-relaxed">
                  Institutional pharmacy schools, university teaching hospitals, and ethics committees have full access to our governance protocols.
                </p>
              </div>

              {/* Security Officer Liaison Card */}
              <div className="p-5 rounded-xl bg-white border-2 border-[#1E6B5E]/30 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#1E6B5E] block">
                      Designated Clinical Security Officer
                    </span>
                    <h5 className="font-bold text-base text-[#1B211E]">Pharmacist Betremaryam Eshete</h5>
                    <p className="text-xs text-[#757D79]">Lead Clinical Pharmacist &amp; Platform Architect (Addis Ababa, Ethiopia)</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Direct Point of Contact
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] space-y-2 text-xs">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[#757D79] font-medium">Security &amp; Data Audits Email:</span>
                    <a
                      href="mailto:betremaryameshete@gmail.com?subject=PharmaMind%20AI%20Data%20Security%20&%20Privacy%20Inquiry"
                      className="font-mono font-semibold text-[#1E6B5E] hover:underline"
                    >
                      betremaryameshete@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#E8E5DD]">
                    <span className="text-[#757D79] font-medium">Institutional Pilot Review:</span>
                    <span className="text-[#1B211E]">Memorandum of Understanding (MoU) &amp; Data Protection Addendum (DPA) Available</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="mailto:betremaryameshete@gmail.com?subject=PharmaMind%20AI%20Security%20&%20Privacy%20Review"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Security Liaison</span>
                  </a>
                </div>
              </div>

              {/* Regulatory Alignment List */}
              <div className="space-y-3 pt-2">
                <h5 className="font-bold text-sm text-[#1B211E]">Regulatory &amp; Guideline Alignments:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4B5350]">
                  <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF]">
                    <strong>Ethiopian Ministry of Health:</strong> Standard Treatment Guidelines (STG) &amp; National Drug Formulary (EFDA/MoH).
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF]">
                    <strong>CPD Directive 332/2020:</strong> Structured competency-based professional development tracking.
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF]">
                    <strong>WHO Model Formulary:</strong> International essential medicines selection criteria.
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF]">
                    <strong>ISO/IEC 27001 Benchmark:</strong> Principle of least privilege and stateless computing architecture.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="bg-white px-5 py-3 border-t border-[#DCD8CF] flex items-center justify-between text-xs text-[#757D79] shrink-0">
          <div className="flex items-center gap-2 truncate">
            <ShieldCheck className="w-4 h-4 text-[#1E6B5E] shrink-0" />
            <span className="truncate">PharmaMind AI · Educational Decision Support &amp; Clinical Reasoning Simulator</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#10201C] hover:bg-[#1C362F] text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
