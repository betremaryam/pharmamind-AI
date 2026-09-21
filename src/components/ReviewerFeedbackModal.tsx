import React, { useState } from 'react';
import {
  X,
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  User,
  ShieldCheck,
  Award,
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitPeerReviewEvaluation, PeerReviewFeedbackData } from '../services/formspree';

interface ReviewerFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReviewerName?: string;
  defaultReviewerEmail?: string;
}

export const ReviewerFeedbackModal: React.FC<ReviewerFeedbackModalProps> = ({
  isOpen,
  onClose,
  defaultReviewerName = '',
  defaultReviewerEmail = ''
}) => {
  const [reviewerName, setReviewerName] = useState(defaultReviewerName);
  const [reviewerEmail, setReviewerEmail] = useState(defaultReviewerEmail);
  const [reviewerCadre, setReviewerCadre] = useState('MSc Clinical Pharmacy / Preceptor');
  const [reviewerInstitution, setReviewerInstitution] = useState('');
  const [clinicalAccuracyRating, setClinicalAccuracyRating] = useState(5);
  const [educationalUtilityRating, setEducationalUtilityRating] = useState(5);
  const [platformUsabilityRating, setPlatformUsabilityRating] = useState(5);
  const [recommendationDecision, setRecommendationDecision] = useState<
    'Strongly Recommend' | 'Recommend with Minor Additions' | 'Needs Clinical Refinement'
  >('Strongly Recommend');
  const [specificFeedback, setSpecificFeedback] = useState('');
  const [targetComponentsReviewed, setTargetComponentsReviewed] = useState<string[]>([
    'Interactive Bedside Case Simulator',
    'Accredited MoH CPD Courses & Certification'
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const componentOptions = [
    'Interactive Bedside Case Simulator',
    'Accredited MoH CPD Courses & Certification',
    'Bedside Clinical Tools & Renal Calculator',
    'Betremaryam AI Clinical Consultation',
    'Official Printable CPD Dossier & Transcript'
  ];

  const toggleComponent = (comp: string) => {
    if (targetComponentsReviewed.includes(comp)) {
      setTargetComponentsReviewed(targetComponentsReviewed.filter((c) => c !== comp));
    } else {
      setTargetComponentsReviewed([...targetComponentsReviewed, comp]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerEmail.trim()) {
      setErrorMessage('Please provide your name and professional email.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const reviewPayload: PeerReviewFeedbackData = {
      reviewerName: reviewerName.trim(),
      reviewerEmail: reviewerEmail.trim(),
      reviewerCadre,
      reviewerInstitution: reviewerInstitution.trim() || 'Independent Evaluator',
      clinicalAccuracyRating,
      educationalUtilityRating,
      platformUsabilityRating,
      recommendationDecision,
      specificFeedback: specificFeedback.trim() || 'Evaluated positively during professional peer review.',
      targetComponentsReviewed
    };

    const res = await submitPeerReviewEvaluation(reviewPayload);
    setIsSubmitting(false);

    if (res.ok) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
      setErrorMessage(res.error || 'Failed to submit review to Formspree store.');
    }
  };

  const renderStarRating = (
    label: string,
    value: number,
    onChange: (val: number) => void,
    description: string
  ) => (
    <div className="space-y-1.5 p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD]">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#1B211E]">{label}</label>
        <span className="text-xs font-mono font-bold text-[#1E6B5E]">{value} / 5</span>
      </div>
      <p className="text-[0.7rem] text-[#757D79]">{description}</p>
      <div className="flex items-center gap-1.5 pt-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 rounded hover:bg-white transition-colors cursor-pointer"
            aria-label={`${star} Stars`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= value ? 'text-amber-500 fill-amber-400' : 'text-[#DCD8CF]'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#10201C]/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#DCD8CF] shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#173029] text-white px-6 py-4 flex items-center justify-between border-b border-[#2A453E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] flex items-center justify-center text-white">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-heading text-lg font-bold">
                Professional Peer Review &amp; Faculty Evaluation
              </h2>
              <p className="text-xs text-[#8FB8AC]">
                Feedback delivers directly to Formspree store (xppwpydl) &amp; Betremaryam Eshete
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

        {/* Content */}
        {submitStatus === 'success' ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E4EEEA] text-[#1E6B5E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-[#1B211E]">
              Thank You for Your Professional Review!
            </h3>
            <p className="text-xs text-[#4B5350] max-w-md mx-auto leading-relaxed">
              Your evaluation and recommendations have been transmitted directly to the lead preceptor and developer (Betremaryam Eshete) via the official Formspree store. Your feedback directly shapes Ethiopian clinical pharmacy simulation quality.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-[#1E6B5E] text-white text-xs font-semibold hover:bg-[#12463C] transition-colors cursor-pointer"
              >
                Close &amp; Continue Exploring
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Reviewer Credentials */}
            <div className="space-y-3">
              <span className="text-[0.68rem] uppercase font-bold text-[#1E6B5E] tracking-wider block">
                1. Reviewer Professional Identity
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1B211E]">Full Name &amp; Title:</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g., Dr. Dawit Abebe / Pharm. Selamawit"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#1B211E]">Professional Email:</label>
                  <input
                    type="email"
                    required
                    value={reviewerEmail}
                    onChange={(e) => setReviewerEmail(e.target.value)}
                    placeholder="reviewer@hospital.org or @aau.edu.et"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#1B211E]">Professional Cadre:</label>
                  <select
                    value={reviewerCadre}
                    onChange={(e) => setReviewerCadre(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E] focus:outline-none"
                  >
                    <option value="MSc Clinical Pharmacy / Preceptor">MSc Clinical Pharmacy / Preceptor</option>
                    <option value="Doctor of Pharmacy (PharmD)">Doctor of Pharmacy (PharmD)</option>
                    <option value="Hospital Clinical Pharmacist">Hospital Clinical Pharmacist</option>
                    <option value="Physician / Consultant Specialist">Physician / Consultant Specialist</option>
                    <option value="Faculty Dean / Academic Instructor">Faculty Dean / Academic Instructor</option>
                    <option value="MoH / Regional Health Bureau Official">MoH / Regional Health Bureau Official</option>
                    <option value="Clinical Pharmacy Intern / Student">Clinical Pharmacy Intern / Student</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#1B211E]">Institution / Hospital:</label>
                  <input
                    type="text"
                    value={reviewerInstitution}
                    onChange={(e) => setReviewerInstitution(e.target.value)}
                    placeholder="e.g. Tikur Anbessa Hospital / AAU"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Rubric Ratings */}
            <div className="space-y-3">
              <span className="text-[0.68rem] uppercase font-bold text-[#1E6B5E] tracking-wider block">
                2. Clinical &amp; Educational Evaluation Rubric
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {renderStarRating(
                  'STG Clinical Accuracy',
                  clinicalAccuracyRating,
                  setClinicalAccuracyRating,
                  'Adherence to Ethiopian Standard Treatment Guidelines.'
                )}
                {renderStarRating(
                  'Simulation Utility',
                  educationalUtilityRating,
                  setEducationalUtilityRating,
                  'Realism of patient encounters & DTP assessments.'
                )}
                {renderStarRating(
                  'Platform Usability',
                  platformUsabilityRating,
                  setPlatformUsabilityRating,
                  'Clarity of navigation, speed, and printing.'
                )}
              </div>
            </div>

            {/* Modules Reviewed */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B211E] block">
                Components You Have Inspected / Tested:
              </label>
              <div className="flex flex-wrap gap-2">
                {componentOptions.map((comp) => {
                  const isChecked = targetComponentsReviewed.includes(comp);
                  return (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => toggleComponent(comp)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-left flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-[#E4EEEA] border-[#1E6B5E] text-[#12463C] font-semibold'
                          : 'bg-[#FAF9F5] border-[#DCD8CF] text-[#757D79] hover:bg-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? 'text-[#1E6B5E]' : 'text-[#DCD8CF]'}`} />
                      <span>{comp}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Institutional Recommendation */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B211E] block">
                Recommendation for Ethiopian Clinical Pharmacy Education &amp; CPD:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  'Strongly Recommend',
                  'Recommend with Minor Additions',
                  'Needs Clinical Refinement'
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRecommendationDecision(option as any)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                      recommendationDecision === option
                        ? 'border-[#1E6B5E] bg-[#E4EEEA] text-[#12463C] font-bold'
                        : 'border-[#DCD8CF] bg-[#FAF9F5] text-[#4B5350] hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Qualitative Feedback */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B211E] block">
                Professional Remarks, Critiques, or Suggestions for Preceptors:
              </label>
              <textarea
                rows={3}
                value={specificFeedback}
                onChange={(e) => setSpecificFeedback(e.target.value)}
                placeholder="Detail any strengths in case reasoning, dosing calculations, or recommendations for Ethiopian hospital integration..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E] focus:outline-none"
              />
            </div>

            {/* Error Display */}
            {submitStatus === 'error' && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage || 'Failed to submit review.'}</span>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DD]">
              <span className="text-[0.7rem] text-[#757D79] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Encrypted delivery to Formspree registry (xppwpydl)</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg border border-[#DCD8CF] text-xs font-semibold text-[#4B5350] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 rounded-lg bg-[#1E6B5E] text-white text-xs font-semibold hover:bg-[#12463C] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
