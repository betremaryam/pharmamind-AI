import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  X,
  Stethoscope,
  GraduationCap,
  FolderArchive,
  Calculator,
  MessageSquare,
  Mail,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareForReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReviewMode?: () => void;
}

export const ShareForReviewModal: React.FC<ShareForReviewModalProps> = ({
  isOpen,
  onClose,
  onOpenReviewMode
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  // Determine base public URL
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      // If running inside local or container dev preview, use origin or standard preview
      return origin;
    }
    return 'https://ais-pre-4eaxsrh2vylijtksvj4wcg-533164680253.europe-west1.run.app';
  };

  const baseUrl = getBaseUrl();

  const shareLinks = [
    {
      key: 'review',
      title: 'General Platform Peer Review',
      subtitle: 'Opens full platform with top Peer Review banner & 1-click evaluation form',
      icon: Sparkles,
      url: `${baseUrl}/?review=true`,
      accent: 'text-[#1E6B5E] bg-[#E4EEEA]'
    },
    {
      key: 'simulator',
      title: 'Direct Case Simulator (Bedside Virtual Patients)',
      subtitle: 'Opens straight into the interactive patient clinical encounter with STG scoring',
      icon: Stethoscope,
      url: `${baseUrl}/?view=simulator&review=true`,
      accent: 'text-blue-700 bg-blue-50'
    },
    {
      key: 'courses',
      title: 'Accredited CPD Courses & Certification',
      subtitle: 'Opens directly to the 7 Ethiopian MoH-accredited clinical pharmacy modules',
      icon: GraduationCap,
      url: `${baseUrl}/?view=courses&review=true`,
      accent: 'text-emerald-700 bg-emerald-50'
    },
    {
      key: 'dossier',
      title: 'Official CPD Dossier & Transcript',
      subtitle: 'Opens directly into the unified transcript, verified credits, and export tools',
      icon: FolderArchive,
      url: `${baseUrl}/?dossier=true&review=true`,
      accent: 'text-purple-700 bg-purple-50'
    },
    {
      key: 'tools',
      title: 'Bedside Clinical Tools & Renal Calculator',
      subtitle: 'Opens directly to Cockcroft-Gault, Child-Pugh, BMI, and STG formulary checks',
      icon: Calculator,
      url: `${baseUrl}/?tools=true&review=true`,
      accent: 'text-amber-700 bg-amber-50'
    }
  ];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const fullInvitationText = `Dear Colleague / Faculty Reviewer,

I would appreciate your professional peer review on PharmaMind AI — an interactive clinical pharmacy virtual patient simulation and accredited CPD certification platform built for Ethiopian clinical pharmacy education (MoH Directive No. 332/2020 & Standard Treatment Guidelines).

Direct Review Links:
• General Platform Review: ${baseUrl}/?review=true
• Bedside Patient Simulator: ${baseUrl}/?view=simulator&review=true
• Accredited Pharmacotherapy Courses: ${baseUrl}/?view=courses&review=true
• Official CPD Dossier: ${baseUrl}/?dossier=true&review=true

Please explore the bedside reasoning simulator and courses, and submit your evaluative remarks directly through the review banner.

Sincerely,
Betremaryam Eshete
Lead Clinical Pharmacist & Preceptor (Tikur Anbessa Specialized Hospital / AAU)
betremaryameshete@gmail.com`;

  const handleCopyInvitation = () => {
    handleCopy('invitation', fullInvitationText);
  };

  const encodedInvitation = encodeURIComponent(fullInvitationText);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedInvitation}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    'Invitation for Professional Peer Review: PharmaMind AI (Ethiopian Clinical Pharmacy Platform)'
  )}&body=${encodedInvitation}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#10201C]/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#DCD8CF] shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#173029] text-white px-6 py-4 flex items-center justify-between border-b border-[#2A453E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-heading text-lg font-bold">
                Share for Professional Peer Review
              </h2>
              <p className="text-xs text-[#8FB8AC]">
                Deep-links open directly into selected simulations, courses, or dossiers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A9B3AE] hover:text-white hover:bg-[#2A453E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Quick Info Box */}
          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] flex items-start gap-3 text-xs text-[#4B5350]">
            <ShieldCheck className="w-5 h-5 text-[#1E6B5E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#1B211E] block">
                Direct Open Guarantee for External Reviewers
              </span>
              <p className="leading-relaxed">
                When health professionals, faculty deans, or MoH inspectors open these links, the application loads immediately and opens directly into the targeted module without forcing manual sign-up or multi-step navigation.
              </p>
            </div>
          </div>

          {/* Links List */}
          <div className="space-y-3">
            <span className="text-[0.68rem] uppercase font-bold text-[#1E6B5E] tracking-wider block">
              Direct Deep-Links (Click to Copy or Test)
            </span>

            <div className="space-y-2.5">
              {shareLinks.map((item) => {
                const IconComponent = item.icon;
                const isCopied = copiedKey === item.key;
                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl border border-[#DCD8CF] hover:border-[#1E6B5E] bg-white transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className={`p-2 rounded-lg shrink-0 ${item.accent}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#1B211E]">
                            {item.title}
                          </h4>
                          <p className="text-[0.72rem] text-[#757D79] leading-snug">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(item.key, item.url)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-[#FAF9F5] hover:bg-[#F0EEE7] border border-[#DCD8CF] text-[#1B211E]'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#FAF9F5] px-2.5 py-1.5 rounded-md border border-[#E8E5DD] flex items-center justify-between text-[0.68rem] font-mono text-[#4B5350]">
                      <span className="truncate pr-2">{item.url}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1E6B5E] hover:underline flex items-center gap-1 shrink-0 font-sans font-semibold"
                      >
                        <span>Test</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Pre-formatted Invitation Messages */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-[#1B211E]">
                  Formal Reviewer Invitation Message
                </h4>
                <p className="text-[0.7rem] text-[#757D79]">
                  Pre-formatted text ready to send via WhatsApp, Telegram, or Email
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyInvitation}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedKey === 'invitation'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border border-[#DCD8CF] text-[#1B211E] hover:bg-[#F0EEE7]'
                }`}
              >
                {copiedKey === 'invitation' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Message Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Message</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-[0.68rem] text-[#4B5350] bg-white p-3 rounded-lg border border-[#E8E5DD] overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-36">
              {fullInvitationText}
            </pre>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </a>
              <a
                href={mailtoUrl}
                className="px-3 py-1.5 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send via Email</span>
              </a>
              {onOpenReviewMode && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenReviewMode();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EEE7] border border-[#DCD8CF] text-[#1B211E] text-xs font-semibold flex items-center gap-1.5 ml-auto cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#1E6B5E]" />
                  <span>Preview Review Mode Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
