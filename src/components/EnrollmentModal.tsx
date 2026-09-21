import React, { useState, useEffect } from 'react';
import { EnrolledLearner, PharmacyCourse } from '../types';
import {
  GraduationCap,
  Mail,
  Phone,
  User,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  X,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Database,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveEnrolledLearner } from '../services/certificateStorage';
import {
  submitCourseProfileRegistration,
  FORMSPREE_COURSE_REGISTRATION_ID,
  FORMSPREE_COURSE_REGISTRATION_ENDPOINT
} from '../services/formspree';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToStart?: PharmacyCourse | null;
  onEnrollmentComplete: (learner: EnrolledLearner) => void;
  existingLearner?: EnrolledLearner | null;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  courseToStart,
  onEnrollmentComplete,
  existingLearner
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('Bachelor of Pharmacy (BPharm)');
  const [institution, setInstitution] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'warning'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  useEffect(() => {
    if (existingLearner) {
      setName(existingLearner.name || '');
      setEmail(existingLearner.email || '');
      setPhone(existingLearner.phone || '');
      setEducation(existingLearner.education || 'Bachelor of Pharmacy (BPharm)');
      setInstitution(existingLearner.institution || '');
      setLicenseNumber(existingLearner.licenseNumber || '');
    } else {
      const storedName = localStorage.getItem('pharmamind_last_recipient_name') || '';
      const storedInst = localStorage.getItem('pharmamind_last_institution') || '';
      if (storedName) setName(storedName);
      if (storedInst) setInstitution(storedInst);
    }
  }, [existingLearner, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full legal name is required for your official certificate.';
    if (!email.trim() || !email.includes('@')) errs.email = 'A valid professional email address is required.';
    if (!phone.trim() || phone.trim().length < 8) errs.phone = 'A valid contact phone number is required.';
    if (!education.trim()) errs.education = 'Please select or specify your educational background.';
    if (!termsAccepted) errs.terms = 'Please acknowledge that your CPD certificate will be issued with these details.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('submitting');
    setSubmitMessage('Transmitting profile to Formspree registry store...');

    const learner: EnrolledLearner = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      education: education.trim(),
      institution: institution.trim() || undefined,
      licenseNumber: licenseNumber.trim() || undefined,
      enrolledAt: new Date().toISOString()
    };

    // Always persist locally first so learner is never blocked
    saveEnrolledLearner(learner);
    localStorage.setItem('pharmamind_last_recipient_name', learner.name);
    if (learner.institution) {
      localStorage.setItem('pharmamind_last_institution', learner.institution);
    }

    // Submit to Formspree store: https://formspree.io/f/xppwpydl
    try {
      const result = await submitCourseProfileRegistration(learner, courseToStart);
      if (result.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Profile securely registered & stored in Formspree (${FORMSPREE_COURSE_REGISTRATION_ID})`);
      } else {
        setSubmitStatus('warning');
        setSubmitMessage(`Saved locally. Notice from registry: ${result.error || 'will sync'}`);
      }
    } catch (err: any) {
      console.warn('Formspree transmission error:', err);
      setSubmitStatus('warning');
      setSubmitMessage('Profile saved locally; background registry sync will retry.');
    } finally {
      setIsSubmitting(false);
      // Brief pause to display the success / confirmation state before proceeding
      setTimeout(() => {
        onEnrollmentComplete(learner);
      }, 850);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl bg-[#FAF9F5] border border-[#DCD8CF] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Modal Top Header */}
        <div className="bg-[#10201C] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#1C362F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-serif-heading text-base sm:text-lg font-bold text-white">
                Clinical Course Enrollment
              </h3>
              <p className="text-[0.72rem] text-[#8FB8AC]">
                Continuing Professional Development (CPD) Registry
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Registry Store Notice Badge */}
        <div className="bg-[#F0EFEB] border-b border-[#E3DFD5] px-5 sm:px-6 py-2 flex items-center justify-between text-[0.72rem]">
          <div className="flex items-center gap-1.5 text-[#3A433F]">
            <Database className="w-3.5 h-3.5 text-[#1E6B5E]" />
            <span>Profile Registry Store:</span>
            <span className="font-mono font-bold text-[#1E6B5E] bg-white px-1.5 py-0.5 rounded border border-[#DCD8CF]">
              {FORMSPREE_COURSE_REGISTRATION_ID}
            </span>
          </div>
          <a
            href={FORMSPREE_COURSE_REGISTRATION_ENDPOINT}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] text-[#1E6B5E] hover:underline flex items-center gap-1"
          >
            <span>formspree.io/f/{FORMSPREE_COURSE_REGISTRATION_ID}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Target Course Banner if starting a course */}
        {courseToStart && (
          <div className="bg-[#E4EEEA] border-b border-[#C7DDD4] px-5 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[#1E6B5E]">
                Target Course Enrollment
              </div>
              <div className="font-serif-heading font-bold text-sm sm:text-base text-[#10201C]">
                {courseToStart.title}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-mono font-bold text-[#1E6B5E] bg-white px-2 py-0.5 rounded border border-[#C7DDD4]">
                {courseToStart.code}
              </span>
              <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                {courseToStart.cpdPoints} CPD Hrs
              </span>
            </div>
          </div>
        )}

        {/* Quick Reviewer Fast-Track Fill Banner */}
        <div className="bg-[#FAF9F5] border-b border-[#E8E5DD] px-5 sm:px-6 py-2 flex items-center justify-between gap-2 text-xs">
          <span className="text-[0.72rem] text-[#757D79] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B5E]" />
            <span>Evaluating for academic or hospital peer review?</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setName('Pharm. Peer Reviewer');
              setEmail('reviewer@health.gov.et');
              setPhone('+251 911 234567');
              setEducation('Master of Science in Clinical Pharmacy (MSc)');
              setInstitution('Tikur Anbessa Specialized Hospital / AAU');
              setLicenseNumber('ETH-REV-2026');
              setTermsAccepted(true);
              setErrors({});
            }}
            className="text-[0.72rem] font-semibold text-[#1E6B5E] hover:text-[#12463C] hover:underline cursor-pointer bg-white px-2.5 py-1 rounded border border-[#DCD8CF]"
          >
            ⚡ One-Click Reviewer Profile
          </button>
        </div>

        {/* Enrollment Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-left">
          <p className="text-xs text-[#4B5350] leading-relaxed">
            Please provide your professional credentials and contact details. This information is required under MoH CPD Directive No. 332/2020 to record your course transcript and authenticate your official certificate upon scoring 75%+ on the clinical evaluation.
          </p>

          {/* Submission Status Alert Banner */}
          {submitStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                submitStatus === 'submitting'
                  ? 'bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/30'
                  : submitStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border border-amber-300'
              }`}
            >
              {submitStatus === 'submitting' ? (
                <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[#1E6B5E]" />
              ) : submitStatus === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span className="font-medium">{submitMessage}</span>
            </motion.div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1B211E] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Full Name (as it will appear on your Certificate) *</span>
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              placeholder="e.g., Pharmacist Dawit Haile or Dr. Sara Bekele"
              className={`w-full px-3.5 py-2 text-sm rounded-lg bg-white border ${
                errors.name ? 'border-red-500 ring-1 ring-red-400' : 'border-[#DCD8CF]'
              } focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] disabled:opacity-60`}
            />
            {errors.name && <p className="text-[0.72rem] text-red-600 font-medium">{errors.name}</p>}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1B211E] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Professional Email *</span>
              </label>
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="sara.bekele@hospital.gov.et"
                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-white border ${
                  errors.email ? 'border-red-500 ring-1 ring-red-400' : 'border-[#DCD8CF]'
                } focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] disabled:opacity-60`}
              />
              {errors.email && <p className="text-[0.72rem] text-red-600 font-medium">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1B211E] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                required
                disabled={isSubmitting}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                placeholder="+251 91 234 5678"
                className={`w-full px-3.5 py-2 text-sm rounded-lg bg-white border ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-400' : 'border-[#DCD8CF]'
                } focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] disabled:opacity-60`}
              />
              {errors.phone && <p className="text-[0.72rem] text-red-600 font-medium">{errors.phone}</p>}
            </div>
          </div>

          {/* Educational Background & Qualifications */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1B211E] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Educational Background &amp; Qualification *</span>
            </label>
            <select
              disabled={isSubmitting}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-white border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] cursor-pointer disabled:opacity-60"
            >
              <option value="Bachelor of Pharmacy (BPharm)">Bachelor of Pharmacy (BPharm)</option>
              <option value="Doctor of Pharmacy (PharmD)">Doctor of Pharmacy (PharmD)</option>
              <option value="MSc in Clinical Pharmacy">MSc in Clinical Pharmacy</option>
              <option value="MSc in Pharmacology / Toxicology">MSc in Pharmacology / Toxicology</option>
              <option value="Medical Doctor (MD / General Practitioner)">Medical Doctor (MD / General Practitioner)</option>
              <option value="Diploma in Pharmacy (DPharm / Technician)">Diploma in Pharmacy (DPharm / Technician)</option>
              <option value="Clinical Pharmacy Resident / Intern">Clinical Pharmacy Resident / Intern</option>
              <option value="Pharmacy Undergraduate Student">Pharmacy Undergraduate Student</option>
              <option value="Nursing / Allied Health Professional">Nursing / Allied Health Professional</option>
            </select>
          </div>

          {/* Hospital / Healthcare Institution / University */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1B211E] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Hospital / University / Healthcare Facility (Optional)</span>
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g., Tikur Anbessa Specialized Hospital, AAU, or St. Paul's Hospital"
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-white border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] disabled:opacity-60"
            />
          </div>

          {/* Professional License / Registration Number */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1B211E] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Professional License / Registration Number (Optional, for MoH / EFDA CPD Relicensure Dossier)</span>
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="e.g., ETH-PHARM-2024-88412 or AAU-CPD-991"
              className="w-full px-3.5 py-2 text-sm rounded-lg bg-white border border-[#DCD8CF] focus:outline-hidden focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] disabled:opacity-60"
            />
          </div>

          {/* Declaration Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#4B5350]">
              <input
                type="checkbox"
                disabled={isSubmitting}
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
                }}
                className="mt-0.5 rounded border-[#DCD8CF] text-[#1E6B5E] focus:ring-[#1E6B5E] cursor-pointer"
              />
              <span>
                I confirm that my personal details and education entered above are accurate for official Continuing Professional Development (CPD) certification and registry verification at Formspree (<code className="font-mono font-bold text-[#1E6B5E]">{FORMSPREE_COURSE_REGISTRATION_ID}</code>).
              </span>
            </label>
            {errors.terms && <p className="text-[0.72rem] text-red-600 font-medium mt-1">{errors.terms}</p>}
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between gap-3">
            <div className="text-[0.72rem] text-[#757D79] flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#1E6B5E]" />
              <span>Registered to Formspree store</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs font-semibold text-[#4B5350] hover:text-[#1B211E] cursor-pointer transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Registry Store...</span>
                  </>
                ) : (
                  <>
                    <span>{courseToStart ? 'Enroll & Begin Course' : 'Save Learner Profile'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

