import React, { useState, useRef } from 'react';
import {
  EarnedCertificate,
  EnrolledLearner
} from '../types';
import {
  Printer,
  Download,
  Upload,
  FileSpreadsheet,
  CloudUpload,
  Edit3,
  CheckCircle2,
  X,
  Award,
  Calendar,
  User,
  ShieldCheck,
  Building,
  GraduationCap,
  Save,
  Loader2,
  ExternalLink,
  Copy,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  exportCompleteCpdPackage,
  importCpdPackage,
  generateCpdCsv,
  saveEnrolledLearner,
  updateEarnedCertificate,
  deleteEarnedCertificate,
  CpdExportDossier
} from '../services/certificateStorage';
import {
  submitFullCpdDossier,
  FORMSPREE_COURSE_REGISTRATION_ID,
  FORMSPREE_COURSE_REGISTRATION_ENDPOINT
} from '../services/formspree';

interface CpdDossierExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledLearner: EnrolledLearner | null;
  earnedCertificates: EarnedCertificate[];
  onLearnerUpdated: (updatedLearner: EnrolledLearner) => void;
  onCertificatesUpdated: () => void;
}

export const CpdDossierExportModal: React.FC<CpdDossierExportModalProps> = ({
  isOpen,
  onClose,
  enrolledLearner,
  earnedCertificates,
  onLearnerUpdated,
  onCertificatesUpdated
}) => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  // Editable Form State
  const [name, setName] = useState(enrolledLearner?.name || '');
  const [education, setEducation] = useState(enrolledLearner?.education || 'Bachelor of Pharmacy (BPharm)');
  const [email, setEmail] = useState(enrolledLearner?.email || '');
  const [phone, setPhone] = useState(enrolledLearner?.phone || '');
  const [institution, setInstitution] = useState(enrolledLearner?.institution || '');
  const [licenseNumber, setLicenseNumber] = useState(enrolledLearner?.licenseNumber || '');
  const [customNotes, setCustomNotes] = useState(
    'Official Continuing Professional Development (CPD) Portfolio submitted in accordance with Ethiopian Ministry of Health Directive No. 332/2020 for annual professional re-licensing and clinical credentialing.'
  );

  // Sync state when props change
  React.useEffect(() => {
    if (enrolledLearner) {
      setName(enrolledLearner.name);
      setEducation(enrolledLearner.education);
      setEmail(enrolledLearner.email);
      setPhone(enrolledLearner.phone);
      setInstitution(enrolledLearner.institution || '');
      setLicenseNumber(enrolledLearner.licenseNumber || '');
    }
  }, [enrolledLearner]);

  // Formspree transmission state
  const [isSubmittingToFormspree, setIsSubmittingToFormspree] = useState(false);
  const [formspreeStatus, setFormspreeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formspreeMessage, setFormspreeMessage] = useState('');
  const [copyNotification, setCopyNotification] = useState(false);
  const [importNotification, setImportNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalCpdPoints = earnedCertificates.reduce((acc, c) => acc + (c.cpdPoints || 0), 0);
  const averageScore =
    earnedCertificates.length > 0
      ? Math.round(earnedCertificates.reduce((acc, c) => acc + c.scorePercent, 0) / earnedCertificates.length)
      : 0;

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const dossierVerificationCode = `PM-ETH-DOSSIER-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Save changes to profile & certificates
  const handleSaveChanges = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updatedLearner: EnrolledLearner = {
      name: name.trim() || 'Candidate Pharmacist',
      email: email.trim(),
      phone: phone.trim(),
      education: education,
      institution: institution.trim(),
      licenseNumber: licenseNumber.trim(),
      enrolledAt: enrolledLearner?.enrolledAt || new Date().toISOString()
    };

    saveEnrolledLearner(updatedLearner);
    onLearnerUpdated(updatedLearner);

    // Also update recipient name and institution in existing certificates if requested
    earnedCertificates.forEach((cert) => {
      if (cert.recipientName !== updatedLearner.name || cert.institution !== updatedLearner.institution) {
        updateEarnedCertificate({
          ...cert,
          recipientName: updatedLearner.name,
          recipientTitle: updatedLearner.education,
          institution: updatedLearner.institution
        });
      }
    });

    onCertificatesUpdated();
    setActiveTab('preview');
  };

  // Download complete JSON package
  const handleExportJson = () => {
    const pkg: CpdExportDossier = {
      exportVersion: '1.2.0',
      exportedAt: new Date().toISOString(),
      app: 'PharmaMind AI - Ethiopian Clinical Pharmacy Academy',
      regulatoryStandard: 'Ethiopian MoH CPD Directive No. 332/2020',
      learner: {
        name,
        email,
        phone,
        education,
        institution,
        licenseNumber,
        enrolledAt: enrolledLearner?.enrolledAt || new Date().toISOString()
      },
      certificates: earnedCertificates,
      totalCpdHours: totalCpdPoints,
      totalCoursesCompleted: earnedCertificates.length,
      averageScorePercent: averageScore
    };

    const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = name ? name.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'cpd_learner';
    link.href = url;
    link.download = `pharmamind_cpd_portfolio_${safeName}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download CSV
  const handleExportCsv = () => {
    const csvContent = generateCpdCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = name ? name.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'cpd_learner';
    link.href = url;
    link.download = `pharmamind_cpd_transcript_${safeName}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON package
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importCpdPackage(content);
        setImportNotification(result.message);
        if (result.success) {
          onCertificatesUpdated();
          const refreshed = localStorage.getItem('pharmamind_enrolled_learner_v1');
          if (refreshed) {
            const parsed = JSON.parse(refreshed);
            onLearnerUpdated(parsed);
          }
        }
        setTimeout(() => setImportNotification(null), 5000);
      }
    };
    reader.readAsText(file);
    // reset input
    e.target.value = '';
  };

  // Transmit full dossier to Formspree store
  const handleSyncToFormspree = async () => {
    setIsSubmittingToFormspree(true);
    setFormspreeStatus('idle');
    setFormspreeMessage('');

    try {
      const result = await submitFullCpdDossier({
        learnerName: name || 'Candidate Pharmacist',
        learnerEmail: email || 'not-specified@hospital.gov.et',
        learnerPhone: phone || 'N/A',
        learnerCadre: education,
        institution,
        licenseNumber,
        totalCpdHours: totalCpdPoints,
        totalCoursesCompleted: earnedCertificates.length,
        averageScorePercent: averageScore,
        certificatesList: earnedCertificates.map((c) => ({
          code: c.courseCode,
          title: c.courseTitle,
          cpd: c.cpdPoints,
          score: c.scorePercent,
          verificationCode: c.verificationCode,
          issuedDate: c.issuedDate
        })),
        customNotes
      });

      if (result.ok) {
        setFormspreeStatus('success');
        setFormspreeMessage(`Successfully delivered complete CPD portfolio to Formspree store (${FORMSPREE_COURSE_REGISTRATION_ID}).`);
      } else {
        setFormspreeStatus('error');
        setFormspreeMessage(result.error || 'Transmission to Formspree was not completed.');
      }
    } catch (err: any) {
      setFormspreeStatus('error');
      setFormspreeMessage(err?.message || 'Network error syncing to Formspree.');
    } finally {
      setIsSubmittingToFormspree(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `PharmaMind AI - Accredited CPD Portfolio Dossier
Practitioner: ${name || 'Candidate Pharmacist'} (${education})
Institution: ${institution || 'Ethiopian Healthcare Facility'}
Professional License / Reg: ${licenseNumber || 'Under Review'}
Total Accredited CPD Hours: ${totalCpdPoints} CPD Credit Hours
Completed Courses: ${earnedCertificates.length}
Average Mastery Score: ${averageScore}%
Standard: Ethiopian MoH CPD Directive No. 332/2020
Formspree Registry Store: ${FORMSPREE_COURSE_REGISTRATION_ENDPOINT}

Transcript:
${
  earnedCertificates.length > 0
    ? earnedCertificates
        .map(
          (c, idx) =>
            `${idx + 1}. [${c.courseCode}] ${c.courseTitle} - ${c.cpdPoints} CPD Hours - Score: ${c.scorePercent}% - Code: ${c.verificationCode}`
        )
        .join('\n')
    : 'No certificates earned yet.'
}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 15 }}
        className="relative w-full max-w-5xl bg-white border border-[#DCD8CF] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] print:max-h-none print:border-none print:shadow-none print:rounded-none"
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-[#10201C] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#1C362F] shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs">
              <Award className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-serif-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Official CPD Portfolio &amp; Transcript Dossier</span>
                <span className="text-[0.65rem] font-sans font-semibold bg-[#1E6B5E] text-white px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Export &amp; Editable
                </span>
              </h3>
              <p className="text-[0.68rem] text-[#8FB8AC]">
                Federal Democratic Republic of Ethiopia · MoH CPD Directive No. 332/2020
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-[#173029] p-1 rounded-lg border border-[#25453C]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[#1E6B5E] text-white shadow-xs'
                  : 'text-[#A9B3AE] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Dossier Sheet</span>
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'edit'
                  ? 'bg-[#1E6B5E] text-white shadow-xs'
                  : 'text-[#A9B3AE] hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
              title="Print or Save Official CPD Dossier as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar for Export / Import / Formspree (Hidden when printing) */}
        <div className="bg-[#FAF9F5] border-b border-[#E8E5DD] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            {/* Export All as JSON */}
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] text-[#1B211E] font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Download full portable backup file (.json)"
            >
              <Download className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Export All (JSON)</span>
            </button>

            {/* Export as CSV */}
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] text-[#1B211E] font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
              title="Download spreadsheet transcript (.csv)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Export CSV</span>
            </button>

            {/* Import JSON */}
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] text-[#1B211E] font-semibold text-xs transition-colors cursor-pointer shadow-2xs">
              <Upload className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Import JSON</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>

            {/* Copy Summary Text */}
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#DCD8CF] text-[#4B5350] hover:text-[#1B211E] font-medium text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copyNotification ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>

          {/* Formspree Store Sync Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncToFormspree}
              disabled={isSubmittingToFormspree}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E4EEEA] hover:bg-[#D3E5DE] text-[#12463C] border border-[#1E6B5E]/30 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              title="Transmit complete dossier to Formspree store (xppwpydl)"
            >
              {isSubmittingToFormspree ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1E6B5E]" />
              ) : (
                <CloudUpload className="w-3.5 h-3.5 text-[#1E6B5E]" />
              )}
              <span>Sync All to Formspree Store</span>
            </button>
          </div>
        </div>

        {/* Notifications & Status Banner */}
        {formspreeStatus !== 'idle' && (
          <div
            className={`px-6 py-2 text-xs flex items-center justify-between border-b print:hidden ${
              formspreeStatus === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {formspreeStatus === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{formspreeMessage}</span>
            </div>
            <button
              onClick={() => setFormspreeStatus('idle')}
              className="text-xs font-semibold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {importNotification && (
          <div className="bg-[#E4EEEA] text-[#12463C] border-b border-[#C7DDD4] px-6 py-2 text-xs flex items-center justify-between print:hidden">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
              <span>{importNotification}</span>
            </div>
            <button
              onClick={() => setImportNotification(null)}
              className="text-xs font-semibold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* MODAL MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#F5F4EF] print:bg-white print:p-0 print:overflow-visible">
          {activeTab === 'edit' ? (
            /* EDITABLE MODE FORM */
            <div className="max-w-3xl mx-auto bg-white rounded-xl border border-[#DCD8CF] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DD]">
                <div>
                  <h4 className="font-serif-heading text-xl font-bold text-[#1B211E] flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-[#1E6B5E]" />
                    <span>Edit Learner Credentials &amp; Dossier Metadata</span>
                  </h4>
                  <p className="text-xs text-[#757D79] mt-1">
                    Update your professional profile and credentialing records. Changes will update your transcript, certificates, and Formspree store submissions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className="text-xs font-semibold text-[#1E6B5E] hover:underline"
                >
                  Return to Preview
                </button>
              </div>

              <form onSubmit={handleSaveChanges} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1B211E]">
                      Full Legal / Registered Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Pharmacist Dawit Haile"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    />
                  </div>

                  {/* Professional Cadre / Education */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1B211E]">
                      Educational Qualification / Cadre *
                    </label>
                    <select
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    >
                      <option value="Bachelor of Pharmacy (BPharm)">Bachelor of Pharmacy (BPharm)</option>
                      <option value="Doctor of Pharmacy (PharmD)">Doctor of Pharmacy (PharmD)</option>
                      <option value="MSc in Clinical Pharmacy">MSc in Clinical Pharmacy</option>
                      <option value="MSc in Pharmacology / Therapeutics">MSc in Pharmacology / Therapeutics</option>
                      <option value="Postgraduate Clinical Pharmacy Resident">Postgraduate Clinical Pharmacy Resident</option>
                      <option value="Pharmacy Intern / Final-Year Student">Pharmacy Intern / Final-Year Student</option>
                      <option value="Druggist / Level IV Pharmacy Technician">Druggist / Level IV Pharmacy Technician</option>
                      <option value="Medical Doctor / Health Officer (Guest)">Medical Doctor / Health Officer (Guest)</option>
                    </select>
                  </div>

                  {/* Professional Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1B211E]">
                      Professional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dawit.haile@hospital.gov.et"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1B211E]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 91 123 4567"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    />
                  </div>

                  {/* Institution / Hospital */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1B211E]">
                      Hospital / University / Institution
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g., Tikur Anbessa Specialized Hospital, AAU"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    />
                  </div>

                  {/* License / Registration Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#1B211E]">
                      Professional License / MoH / EFDA Reg. Number
                    </label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="e.g., ETH-PHARM-2024-88412"
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    />
                  </div>
                </div>

                {/* Custom Notes / Relicensure Statement */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1B211E]">
                    Official Dossier Notes &amp; Relicensure Submission Purpose
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E]"
                    placeholder="Enter purpose (e.g., submitted to Addis Ababa Health Bureau for annual clinical license renewal)..."
                  />
                </div>

                <div className="p-3 bg-[#FAF9F5] rounded-lg border border-[#E3DFD5] text-xs text-[#4B5350] space-y-1">
                  <span className="font-semibold text-[#1B211E] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Synchronized Registry Store:</span>
                  </span>
                  <p>
                    All exported records and profile registrations are tied to Formspree store endpoint:{' '}
                    <code className="font-mono text-[#1E6B5E] bg-white px-1.5 py-0.5 rounded border border-[#DCD8CF]">
                      {FORMSPREE_COURSE_REGISTRATION_ENDPOINT}
                    </code>
                  </p>
                </div>

                {/* Submit / Save Buttons */}
                <div className="pt-4 border-t border-[#E8E5DD] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className="px-4 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs font-semibold text-[#4B5350] hover:text-[#1B211E] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save &amp; Update Dossier</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* PREVIEW / PRINTABLE OFFICIAL DOSSIER SHEET */
            <div
              ref={printRef}
              id="pharmamind-printable-dossier"
              className="max-w-4xl mx-auto bg-white border-2 border-[#10201C] p-6 sm:p-10 md:p-12 space-y-8 shadow-lg rounded-sm text-[#1B211E] print:shadow-none print:border-2 print:p-8 print:max-w-none print:w-full"
            >
              {/* National Institutional Header */}
              <div className="border-b-2 border-[#1E6B5E] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[0.65rem] tracking-widest uppercase font-bold text-[#1E6B5E]">
                    Federal Democratic Republic of Ethiopia · Ministry of Health
                  </div>
                  <h1 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#10201C]">
                    Clinical Pharmacy Continuing Professional Development (CPD) Dossier
                  </h1>
                  <p className="text-xs text-[#4B5350]">
                    Accredited National Competency &amp; Certificate Transcript · Directive No. 332/2020
                  </p>
                </div>

                <div className="text-right shrink-0 border-l-2 border-[#E8E5DD] pl-4 sm:pl-6 space-y-1">
                  <div className="text-[0.65rem] uppercase font-bold text-[#757D79]">
                    Registry Reference
                  </div>
                  <div className="font-mono text-xs font-bold text-[#1E6B5E] bg-[#E4EEEA] px-2 py-0.5 rounded inline-block">
                    {dossierVerificationCode}
                  </div>
                  <div className="text-[0.65rem] text-[#757D79]">
                    Date: <strong>{currentDate}</strong>
                  </div>
                </div>
              </div>

              {/* Candidate / Practitioner Details Card */}
              <div className="bg-[#FAF9F5] border border-[#DCD8CF] rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[0.68rem] uppercase font-semibold text-[#757D79] block">
                    Practitioner Name:
                  </span>
                  <span className="font-bold text-sm text-[#10201C] block mt-0.5">
                    {name || 'Candidate Pharmacist'}
                  </span>
                  <span className="text-[0.72rem] text-[#1E6B5E] font-medium block">
                    {education}
                  </span>
                </div>

                <div>
                  <span className="text-[0.68rem] uppercase font-semibold text-[#757D79] block">
                    Affiliated Institution:
                  </span>
                  <span className="font-semibold text-[#10201C] block mt-0.5">
                    {institution || 'Ethiopian Hospital / Health Center'}
                  </span>
                  <span className="text-[0.72rem] text-[#757D79] block">
                    License: <strong>{licenseNumber || 'Registered in CPD Pool'}</strong>
                  </span>
                </div>

                <div>
                  <span className="text-[0.68rem] uppercase font-semibold text-[#757D79] block">
                    Contact &amp; Verification Store:
                  </span>
                  <span className="font-medium text-[#10201C] block mt-0.5">
                    {email || 'N/A'}
                  </span>
                  <span className="text-[0.68rem] text-[#757D79] block">
                    Store: <strong className="font-mono text-[#1E6B5E]">{FORMSPREE_COURSE_REGISTRATION_ID}</strong>
                  </span>
                </div>
              </div>

              {/* CPD Metrics Summary Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-[#E4EEEA] border border-[#C7DDD4] text-center space-y-1">
                  <span className="text-[0.65rem] uppercase font-bold text-[#12463C] block">
                    Accredited CPD Hours
                  </span>
                  <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#12463C]">
                    {totalCpdPoints}
                  </div>
                  <span className="text-[0.68rem] text-[#1E6B5E] font-medium block">
                    Credit Units Conferred
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] text-center space-y-1">
                  <span className="text-[0.65rem] uppercase font-bold text-[#757D79] block">
                    Completed Modules
                  </span>
                  <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1B211E]">
                    {earnedCertificates.length}
                  </div>
                  <span className="text-[0.68rem] text-[#757D79] block">
                    Mastery Evaluations Passed
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] text-center space-y-1">
                  <span className="text-[0.65rem] uppercase font-bold text-[#757D79] block">
                    Average Score
                  </span>
                  <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-emerald-700">
                    {averageScore}%
                  </div>
                  <span className="text-[0.68rem] text-emerald-700 font-medium block">
                    {averageScore >= 85 ? 'Exemplary Mastery' : averageScore >= 75 ? 'Qualified (75%+)' : 'In Progress'}
                  </span>
                </div>
              </div>

              {/* Official Course Transcript Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-heading text-base font-bold text-[#10201C] flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Itemized Course Transcript &amp; Certificate Registry</span>
                  </h3>
                  <span className="text-[0.7rem] text-[#757D79]">
                    Passing Benchmark: 75% Mastery
                  </span>
                </div>

                <div className="border border-[#DCD8CF] rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#10201C] text-white">
                        <th className="py-2.5 px-3 font-semibold">Course Code</th>
                        <th className="py-2.5 px-3 font-semibold">Clinical Course Title</th>
                        <th className="py-2.5 px-3 font-semibold text-center">CPD Hours</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Score</th>
                        <th className="py-2.5 px-3 font-semibold">Verification Code</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Issue Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E5DD] bg-white">
                      {earnedCertificates.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-[#757D79]">
                            No courses completed yet. Return to the Courses Catalog to enroll and pass master evaluations.
                          </td>
                        </tr>
                      ) : (
                        earnedCertificates.map((cert) => (
                          <tr key={cert.certificateId} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5 px-3 font-mono font-bold text-[#1E6B5E]">
                              {cert.courseCode}
                            </td>
                            <td className="py-2.5 px-3 font-medium text-[#1B211E]">
                              {cert.courseTitle}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-center text-[#12463C]">
                              {cert.cpdPoints}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-center text-emerald-700">
                              {cert.scorePercent}%
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[0.68rem] text-[#4B5350]">
                              {cert.verificationCode}
                            </td>
                            <td className="py-2.5 px-3 text-right text-[0.7rem] text-[#757D79]">
                              {cert.issuedDate}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Purpose & Preceptor Attestation Notes */}
              <div className="bg-[#FAF9F5] border border-[#DCD8CF] rounded-lg p-4 space-y-2 text-xs">
                <span className="font-bold text-[#10201C] block text-[0.72rem] uppercase tracking-wider">
                  Attestation &amp; Legal Purpose:
                </span>
                <p className="text-[#4B5350] leading-relaxed">
                  {customNotes}
                </p>
                <div className="text-[0.68rem] text-[#757D79] pt-1">
                  Courses adhere to Ethiopian Standard Treatment Guidelines (STG 4th &amp; 5th Editions), WHO Model Formulary, and National Antimicrobial Stewardship Policies.
                </div>
              </div>

              {/* Signatures & Certification Seals Block */}
              <div className="pt-6 border-t-2 border-[#1E6B5E] grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
                {/* Academic & Preceptor Sign-off */}
                <div className="space-y-3">
                  <span className="text-[0.65rem] uppercase font-bold text-[#757D79] block">
                    Academic Director &amp; Lead Preceptor:
                  </span>
                  <div className="space-y-0.5">
                    <div className="font-serif-heading font-bold text-base text-[#10201C]">
                      Betremaryam Eshete, BPharm, MSc
                    </div>
                    <div className="text-[0.72rem] text-[#1E6B5E] font-medium">
                      Lead Clinical Pharmacist &amp; Hospital Preceptor
                    </div>
                    <div className="text-[0.68rem] text-[#757D79]">
                      PharmaMind AI Clinical Academy · Addis Ababa, Ethiopia
                    </div>
                  </div>
                  <div className="pt-2 border-t border-dashed border-[#DCD8CF] text-[0.68rem] text-[#757D79]">
                    Official Signature on Digital File · Verified Electronic Transcript
                  </div>
                </div>

                {/* Candidate Acknowledgment & Stamp Area */}
                <div className="space-y-3 sm:text-right">
                  <span className="text-[0.65rem] uppercase font-bold text-[#757D79] block">
                    Candidate Attestation:
                  </span>
                  <div className="space-y-0.5">
                    <div className="font-serif-heading font-bold text-base text-[#10201C]">
                      {name || 'Candidate Pharmacist'}
                    </div>
                    <div className="text-[0.72rem] text-[#1E6B5E] font-medium">
                      {education}
                    </div>
                    <div className="text-[0.68rem] text-[#757D79]">
                      {institution || 'Affiliated Health Facility'}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-dashed border-[#DCD8CF] text-[0.68rem] text-[#757D79]">
                    Registered Registry Store: {FORMSPREE_COURSE_REGISTRATION_ID} · MoH Relicensure Candidate
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
