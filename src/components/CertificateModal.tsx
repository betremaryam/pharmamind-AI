import React, { useRef, useState, useEffect } from 'react';
import { EarnedCertificate } from '../types';
import {
  Printer,
  X,
  Share2,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  FileCheck2,
  Edit3,
  Save,
  Download,
  CloudUpload,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { updateEarnedCertificate } from '../services/certificateStorage';
import {
  submitCertificateIssuanceRecord,
  FORMSPREE_COURSE_REGISTRATION_ID,
  FORMSPREE_COURSE_REGISTRATION_ENDPOINT
} from '../services/formspree';

interface CertificateModalProps {
  certificate: EarnedCertificate | null;
  isOpen: boolean;
  onClose: () => void;
  onCertificateUpdated?: (updatedCert: EarnedCertificate) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
  onCertificateUpdated
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState<EarnedCertificate | null>(certificate);

  // Edit fields
  const [editName, setEditName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editInstitution, setEditInstitution] = useState('');
  const [editInstructor, setEditInstructor] = useState('');

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    setCurrentCert(certificate);
    if (certificate) {
      setEditName(certificate.recipientName);
      setEditTitle(certificate.recipientTitle);
      setEditInstitution(certificate.institution || '');
      setEditInstructor(certificate.instructorName);
    }
    setIsEditing(false);
    setSyncStatus(null);
  }, [certificate]);

  if (!isOpen || !currentCert) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(
      `PharmaMind AI Accredited CPD Certificate: ID ${currentCert.verificationCode} conferred to ${currentCert.recipientName} for ${currentCert.courseTitle} (${currentCert.cpdPoints} CPD Hours).`
    );
    alert('Certificate verification code copied to clipboard!');
  };

  const handleSaveEdit = () => {
    if (!currentCert) return;

    const updated: EarnedCertificate = {
      ...currentCert,
      recipientName: editName.trim() || currentCert.recipientName,
      recipientTitle: editTitle.trim() || currentCert.recipientTitle,
      institution: editInstitution.trim(),
      instructorName: editInstructor.trim() || currentCert.instructorName
    };

    updateEarnedCertificate(updated);
    setCurrentCert(updated);
    setIsEditing(false);

    if (onCertificateUpdated) {
      onCertificateUpdated(updated);
    }

    // Background sync to Formspree
    submitCertificateIssuanceRecord(updated).catch((err) => {
      console.warn('Formspree sync notice:', err);
    });
  };

  const handleExportJson = () => {
    if (!currentCert) return;
    const blob = new Blob([JSON.stringify(currentCert, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pharmamind_certificate_${currentCert.courseCode}_${currentCert.verificationCode}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleManualSync = async () => {
    if (!currentCert) return;
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const res = await submitCertificateIssuanceRecord(currentCert);
      if (res.ok) {
        setSyncStatus(`Synced to Formspree store (${FORMSPREE_COURSE_REGISTRATION_ID})`);
      } else {
        setSyncStatus(`Sync issue: ${res.error || 'Check network'}`);
      }
    } catch (e: any) {
      setSyncStatus(`Sync error: ${e?.message || 'Failed'}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#DCD8CF] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] print:max-h-none print:border-none print:shadow-none print:rounded-none"
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div className="bg-[#10201C] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#1C362F] shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs">
              <FileCheck2 className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-serif-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Professional Certificate of Clinical Completion</span>
                <span className="text-[0.65rem] font-sans font-semibold bg-[#1E6B5E] text-white px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Editable
                </span>
              </h3>
              <p className="text-[0.7rem] text-[#8FB8AC]">
                Continuing Professional Development · Ministry of Health Directive No. 332/2020
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Edit Certificate Toggle */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isEditing
                  ? 'bg-amber-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Edit recipient name, qualification or hospital on certificate"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Details'}</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Export Certificate as JSON data"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              title="Print or Save Certificate as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyVerification}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Copy Certificate Verification Details"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-red-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inline Editor Drawer (if editing is active) */}
        {isEditing && (
          <div className="bg-[#FAF8F2] border-b border-[#DCD8CF] p-4 sm:p-5 text-xs text-[#1B211E] space-y-3 shrink-0 print:hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-[#10201C]">
                <Edit3 className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Edit Certificate Conferred Fields</span>
              </span>
              <span className="text-[0.68rem] text-[#757D79]">
                Changes are saved to permanent local storage and synced to Formspree store.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Recipient Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] focus:border-[#1E6B5E] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Professional Title / Cadre:</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] focus:border-[#1E6B5E] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Hospital / Institution:</label>
                <input
                  type="text"
                  value={editInstitution}
                  onChange={(e) => setEditInstitution(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] focus:border-[#1E6B5E] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Preceptor / Lead Name:</label>
                <input
                  type="text"
                  value={editInstructor}
                  onChange={(e) => setEditInstructor(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] focus:border-[#1E6B5E] text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E5DD]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded bg-white border border-[#DCD8CF] font-medium text-[#4B5350] hover:text-[#1B211E]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#1E6B5E] hover:bg-[#12463C] text-white font-semibold shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Certificate Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* Sync Status Banner */}
        {syncStatus && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-6 py-2 flex items-center justify-between print:hidden">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{syncStatus}</span>
            </span>
            <button onClick={() => setSyncStatus(null)} className="underline text-[0.7rem]">
              Dismiss
            </button>
          </div>
        )}

        {/* Certificate Display Canvas Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#EFECE6] flex items-center justify-center print:p-0 print:bg-white print:overflow-visible">
          {/* THE CERTIFICATE CANVAS */}
          <div
            ref={certificateRef}
            id="pharmamind-printable-certificate"
            className="w-full bg-[#FCFBF7] text-[#1B211E] border-[10px] border-[#10201C] p-6 sm:p-10 md:p-12 relative shadow-xl rounded-sm print:shadow-none print:border-[8px] print:m-0 print:w-full print:max-w-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(247, 245, 238, 0.6) 0%, rgba(252, 251, 247, 1) 100%)'
            }}
          >
            {/* Inner Gold Guilloche Border */}
            <div className="border-2 border-[#C5A059] p-5 sm:p-8 relative">
              {/* Corner Traditional Accents */}
              <div className="absolute -top-3 -left-3 w-7 h-7 border-t-4 border-l-4 border-[#C5A059]" />
              <div className="absolute -top-3 -right-3 w-7 h-7 border-t-4 border-r-4 border-[#C5A059]" />
              <div className="absolute -bottom-3 -left-3 w-7 h-7 border-b-4 border-l-4 border-[#C5A059]" />
              <div className="absolute -bottom-3 -right-3 w-7 h-7 border-b-4 border-r-4 border-[#C5A059]" />

              {/* Watermark Emblem Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-96 h-96" fill="currentColor">
                  <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
                  <path d="M50 15 L53 35 L70 25 L58 42 L78 50 L58 58 L70 75 L53 65 L50 85 L47 65 L30 75 L42 58 L22 50 L42 42 L30 25 L47 35 Z" fill="currentColor" opacity="0.4" />
                </svg>
              </div>

              {/* Certificate Header Banner */}
              <div className="text-center space-y-2 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 13h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z" />
                      <path d="M16 22v5" />
                      <path d="M11 29h10" />
                    </svg>
                  </div>
                  <span className="font-bold text-lg tracking-tight text-[#10201C]">
                    PharmaMind <span className="text-[#1E6B5E] italic">AI</span>
                  </span>
                </div>

                <div className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.22em] font-bold text-[#8A7545]">
                  Board of Clinical Pharmacy Preceptors &amp; Continuing Education
                </div>

                <div className="text-[0.65rem] text-[#606965] uppercase tracking-wider font-semibold">
                  Accredited in Compliance with Ethiopian Ministry of Health Directive No. 332/2020
                </div>

                <h1 className="font-serif-heading text-2xl sm:text-4xl text-[#10201C] tracking-wide pt-2 pb-1">
                  Certificate of Clinical Completion
                </h1>

                <div className="text-xs text-[#5B6360] italic">
                  This official academic credential certifies that
                </div>
              </div>

              {/* Recipient Name in Prestigious Display Typography */}
              <div className="text-center py-5 relative z-10">
                <div className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#10201C] tracking-tight">
                  {currentCert.recipientName}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1E6B5E] mt-2">
                  {currentCert.recipientTitle}
                  {currentCert.institution ? ` · ${currentCert.institution}` : ''}
                </div>
              </div>

              {/* Official Academic Statement */}
              <div className="text-center max-w-2xl mx-auto space-y-2 text-xs sm:text-sm text-[#4B5350] relative z-10 leading-relaxed">
                <p>
                  has satisfactorily fulfilled all didactic modules, bedside pharmacotherapeutic problem-solving benchmarks, and achieved a verified mastery score of{' '}
                  <strong className="text-[#10201C] font-bold">{currentCert.scorePercent}%</strong> in the rigorous clinical assessment for:
                </p>

                <div className="p-3 my-2 bg-[#FAF8F3] border border-[#E8E4D8] rounded-md shadow-2xs">
                  <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#1E6B5E]">
                    {currentCert.courseCode}
                  </div>
                  <div className="font-serif-heading text-base sm:text-xl font-bold text-[#10201C]">
                    {currentCert.courseTitle}
                  </div>
                </div>

                <p className="text-[0.75rem] text-[#6B7370]">
                  Awarded <strong className="text-[#10201C]">{currentCert.cpdPoints} Continuing Professional Development (CPD) Credit Hours</strong> under national pharmaceutical care and treatment standards.
                </p>
              </div>

              {/* Signatures, Seals & Official Authentication Row */}
              <div className="mt-8 pt-6 border-t border-[#E8E4D8] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10">
                {/* Left: Credential Registry & Verifiable Code */}
                <div className="text-left text-xs space-y-1">
                  <div className="text-[0.68rem] uppercase font-bold text-[#757D79] tracking-wider">
                    Conferral Registry
                  </div>
                  <div className="font-bold text-[#10201C]">{currentCert.issuedDate}</div>
                  <div className="text-[0.68rem] text-[#757D79] font-mono pt-1">
                    Credential ID: <span className="font-bold text-[#1E6B5E]">{currentCert.verificationCode}</span>
                  </div>
                  <div className="text-[0.65rem] text-[#8A918E]">
                    Registry Store: <span className="font-mono text-[#1E6B5E]">{FORMSPREE_COURSE_REGISTRATION_ID}</span>
                  </div>
                </div>

                {/* Center: Prestigious Academic Preceptorship Insignia */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#C5A059] p-1 bg-[#FCFBF7] shadow-xs flex items-center justify-center relative">
                    <div className="w-full h-full rounded-full border border-dashed border-[#C5A059] flex flex-col items-center justify-center p-1 text-center">
                      <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#8A7545]" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <circle cx="24" cy="24" r="22" />
                        <path d="M14 20h20a10 10 0 0 1-10 10 10 10 0 0 1-10-10Z" />
                        <path d="M24 30v9" />
                        <path d="M18 39h12" />
                        <path d="M24 20V14" />
                        <path d="M24 14a4 4 0 1 1 4-4" />
                      </svg>
                      <span className="text-[0.48rem] uppercase font-bold tracking-tight text-[#8A7545] mt-0.5 leading-tight">
                        Ethiopian CPD
                      </span>
                      <span className="text-[0.42rem] font-mono text-[#8A7545]">
                        Dir. 332/2020
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Preceptor Academic Signature */}
                <div className="text-right text-xs space-y-1">
                  <div className="font-serif italic text-lg sm:text-xl text-[#10201C] font-semibold -mb-1 pr-1 text-right">
                    Betremaryam Eshete
                  </div>
                  <div className="w-40 ml-auto border-b border-[#10201C] mb-1" />
                  <div className="font-bold text-[#10201C]">{currentCert.instructorName}</div>
                  <div className="text-[0.7rem] text-[#5B6360]">Lead Clinical Pharmacist &amp; Preceptor</div>
                  <div className="text-[0.65rem] text-[#757D79]">Directorate of Continuing Education</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-white px-4 sm:px-6 py-3 border-t border-[#DCD8CF] flex flex-wrap items-center justify-between gap-3 text-xs text-[#757D79] shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
            <span>Digital Registry: <code className="font-mono font-bold text-[#1B211E]">{currentCert.verificationCode}</code></span>
            <span className="text-[#DCD8CF]">·</span>
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="text-[#1E6B5E] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              {isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <CloudUpload className="w-3 h-3" />}
              <span>Sync to Formspree</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-2 rounded-lg bg-white hover:bg-[#FAF9F5] text-[#1B211E] border border-[#DCD8CF] text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Edit Details</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EEE7] text-[#1B211E] border border-[#DCD8CF] text-xs font-semibold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

