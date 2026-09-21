import React, { useState } from 'react';
import { PharmacyCourse, CourseQuizQuestion, EarnedCertificate } from '../types';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  ChevronLeft,
  X,
  FileCheck2,
  HelpCircle,
  Stethoscope,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  GraduationCap,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateVerificationCode, saveEarnedCertificate, getEnrolledLearner } from '../services/certificateStorage';
import { submitCertificateIssuanceRecord } from '../services/formspree';

interface CoursePlayerModalProps {
  course: PharmacyCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onCertificateGenerated: (cert: EarnedCertificate) => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  isOpen,
  onClose,
  onCertificateGenerated
}) => {
  if (!isOpen || !course) return null;

  // View mode: 'modules' | 'quiz' | 'results' | 'claim'
  const [activeStep, setActiveStep] = useState<'modules' | 'quiz' | 'results' | 'claim'>('modules');
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [scorePercent, setScorePercent] = useState<number>(0);

  // Recipient form for certificate
  const [recipientName, setRecipientName] = useState<string>(() => {
    const learner = getEnrolledLearner();
    if (learner?.name) return learner.name;
    return localStorage.getItem('pharmamind_last_recipient_name') || '';
  });
  const [recipientTitle, setRecipientTitle] = useState<string>(() => {
    const learner = getEnrolledLearner();
    if (learner?.education) return learner.education;
    return localStorage.getItem('pharmamind_last_recipient_title') || 'Clinical Pharmacist';
  });
  const [institution, setInstitution] = useState<string>(() => {
    const learner = getEnrolledLearner();
    if (learner?.institution) return learner.institution;
    return localStorage.getItem('pharmamind_last_institution') || '';
  });
  const [formError, setFormError] = useState<string>('');

  const currentModule = course.modules[currentModuleIndex] || course.modules[0];

  // Handle Quiz Selection
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    course.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / course.quiz.length) * 100);
    setScorePercent(calculatedScore);
    setQuizSubmitted(true);
    setActiveStep('results');
  };

  // Retake Quiz
  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setScorePercent(0);
    setActiveStep('quiz');
  };

  // Claim Certificate
  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setFormError('Please enter your full legal name as it should appear on the certificate.');
      return;
    }

    // Save defaults to localStorage for convenience
    localStorage.setItem('pharmamind_last_recipient_name', recipientName.trim());
    localStorage.setItem('pharmamind_last_recipient_title', recipientTitle.trim());
    if (institution.trim()) {
      localStorage.setItem('pharmamind_last_institution', institution.trim());
    }

    const verificationCode = generateVerificationCode(course.code);
    const newCert: EarnedCertificate = {
      certificateId: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      courseId: course.id,
      courseTitle: course.title,
      courseCode: course.code,
      cpdPoints: course.cpdPoints,
      recipientName: recipientName.trim(),
      recipientTitle: recipientTitle.trim() || 'Clinical Pharmacist',
      institution: institution.trim() || undefined,
      scorePercent: scorePercent,
      issuedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      issuedTimestamp: Date.now(),
      instructorName: course.instructor.name,
      instructorTitle: course.instructor.title,
      verificationCode: verificationCode
    };

    saveEarnedCertificate(newCert);
    // Transmit certificate record to Formspree registry store
    submitCertificateIssuanceRecord(newCert).catch((err) => {
      console.warn('Formspree certificate logging notice:', err);
    });
    onCertificateGenerated(newCert);
  };

  const hasPassed = scorePercent >= course.passingScorePercent;
  const allAnswered = course.quiz.every((q) => userAnswers[q.id] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-4xl bg-[#FAF9F5] border border-[#DCD8CF] rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden"
      >
        {/* Course Header Banner */}
        <div className="bg-[#10201C] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#1C362F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-semibold">{course.code}</span>
                <span className="text-white/40">·</span>
                <span className="text-xs text-[#8FB8AC]">{course.cpdPoints} CPD Hours</span>
              </div>
              <h3 className="font-serif-heading text-sm sm:text-lg font-bold text-white line-clamp-1">
                {course.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Step Progress Bar */}
        <div className="bg-white border-b border-[#DCD8CF] px-5 py-2.5 flex items-center justify-between text-xs text-[#4B5350] shrink-0 overflow-x-auto gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-nowrap whitespace-nowrap">
            <button
              onClick={() => setActiveStep('modules')}
              className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                activeStep === 'modules' ? 'text-[#1E6B5E]' : 'hover:text-[#1B211E]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                activeStep === 'modules' ? 'bg-[#1E6B5E] text-white' : 'bg-[#E4EEEA] text-[#1E6B5E]'
              }`}>
                1
              </span>
              <span>Course Modules ({course.modules.length})</span>
            </button>

            <span className="text-[#DCD8CF]">→</span>

            <button
              onClick={() => setActiveStep('quiz')}
              className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                activeStep === 'quiz' ? 'text-[#1E6B5E]' : 'hover:text-[#1B211E]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                activeStep === 'quiz' ? 'bg-[#1E6B5E] text-white' : 'bg-[#E4EEEA] text-[#1E6B5E]'
              }`}>
                2
              </span>
              <span>Clinical Evaluation ({course.quiz.length} Questions)</span>
            </button>

            <span className="text-[#DCD8CF]">→</span>

            <button
              onClick={() => {
                if (quizSubmitted) setActiveStep('results');
              }}
              disabled={!quizSubmitted}
              className={`flex items-center gap-1.5 font-semibold transition-colors ${
                activeStep === 'results' || activeStep === 'claim'
                  ? 'text-[#1E6B5E]'
                  : quizSubmitted
                  ? 'cursor-pointer hover:text-[#1B211E]'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                activeStep === 'results' || activeStep === 'claim'
                  ? 'bg-[#1E6B5E] text-white'
                  : 'bg-[#E4EEEA] text-[#1E6B5E]'
              }`}>
                3
              </span>
              <span>Accredited Certificate</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[0.7rem] text-[#757D79]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B5E]" />
            <span>Pass threshold: {course.passingScorePercent}%</span>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* STEP 1: MODULES LEARNING VIEW */}
          {activeStep === 'modules' && (
            <div className="space-y-6">
              {/* Module Navigation Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {course.modules.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setCurrentModuleIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      currentModuleIndex === idx
                        ? 'bg-[#E4EEEA] border-[#1E6B5E] shadow-2xs'
                        : 'bg-white border-[#DCD8CF] hover:border-[#1E6B5E]/50'
                    }`}
                  >
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#1E6B5E] block">
                      Section {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#1B211E] line-clamp-1 block">
                      {m.title.replace(/^Module \d+:\s*/, '')}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Module Details */}
              <div className="bg-white rounded-xl border border-[#DCD8CF] p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex items-start justify-between gap-4 border-b border-[#E8E5DD] pb-4">
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#1E6B5E]">
                      Module {currentModuleIndex + 1} of {course.modules.length}
                    </span>
                    <h4 className="font-serif-heading text-lg sm:text-2xl font-bold text-[#1B211E] mt-1">
                      {currentModule.title}
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-[#FAF9F5] text-[#4B5350] border border-[#DCD8CF] shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#1E6B5E]" />
                    <span>{currentModule.durationMinutes} min study</span>
                  </span>
                </div>

                <p className="text-sm text-[#4B5350] leading-relaxed">
                  {currentModule.summary}
                </p>

                {/* Key Learning Points Checklist */}
                <div className="space-y-3 pt-1">
                  <h5 className="text-xs uppercase font-bold tracking-wider text-[#10201C] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Core Clinical Pharmacotherapy Principles</span>
                  </h5>
                  <div className="space-y-2.5">
                    {currentModule.keyLearningPoints.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] text-xs sm:text-sm text-[#1B211E] leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B5E] mt-2 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Case Example if present */}
                {currentModule.clinicalCaseExample && (
                  <div className="p-4 rounded-xl bg-[#F4F8F6] border border-[#BBD7CF] space-y-2 text-xs">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#1E6B5E] block">
                      Authentic Bedside Vignette &amp; Rationale
                    </span>
                    <p className="text-[#10201C] font-medium">
                      {currentModule.clinicalCaseExample.scenario}
                    </p>
                    <div className="pt-2 border-t border-[#BBD7CF]/60 space-y-1">
                      <p className="text-[#12463C]">
                        <strong>Clinical Pharmacist Action:</strong> {currentModule.clinicalCaseExample.clinicalDecision}
                      </p>
                      <p className="text-[#4B5350] italic">
                        <strong>Guideline Reference:</strong> {currentModule.clinicalCaseExample.guidelineAdvice}
                      </p>
                    </div>
                  </div>
                )}

                {/* Next / Previous Module Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DD]">
                  <button
                    type="button"
                    onClick={() => setCurrentModuleIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentModuleIndex === 0}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      currentModuleIndex === 0
                        ? 'opacity-40 cursor-not-allowed text-[#757D79]'
                        : 'text-[#1B211E] hover:bg-[#F0EEE7] border border-[#DCD8CF] cursor-pointer'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Section</span>
                  </button>

                  {currentModuleIndex < course.modules.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentModuleIndex((prev) => prev + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                    >
                      <span>Next Section</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStep('quiz')}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#10201C] hover:bg-[#1C362F] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                    >
                      <span>Begin Clinical Evaluation</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CLINICAL QUIZ EVALUATION */}
          {activeStep === 'quiz' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#DCD8CF] p-5 shadow-xs flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h4 className="font-serif-heading text-lg font-bold text-[#1B211E]">
                    Clinical Mastery Assessment
                  </h4>
                  <p className="text-xs text-[#757D79]">
                    Answer each scenario question. A passing grade of {course.passingScorePercent}% is required to generate your official CPD certificate.
                  </p>
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E4EEEA] text-[#12463C] border border-[#BBD7CF]">
                  {Object.keys(userAnswers).length} of {course.quiz.length} Answered
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {course.quiz.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-xl border border-[#DCD8CF] p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#1E6B5E] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {qIndex + 1}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-[#1B211E] leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-2.5 pl-9">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = userAnswers[q.id] === optIndex;
                        return (
                          <label
                            key={optIndex}
                            onClick={() => handleSelectOption(q.id, optIndex)}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#E4EEEA] border-[#1E6B5E] text-[#12463C] font-medium shadow-2xs'
                                : 'bg-[#FAF9F5] border-[#DCD8CF] text-[#4B5350] hover:bg-[#F0EEE7]'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={isSelected}
                              onChange={() => handleSelectOption(q.id, optIndex)}
                              className="mt-0.5 text-[#1E6B5E] focus:ring-[#1E6B5E]"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Quiz Action */}
              <div className="p-4 bg-white rounded-xl border border-[#DCD8CF] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep('modules')}
                  className="px-4 py-2 rounded-lg border border-[#DCD8CF] text-xs font-semibold text-[#1B211E] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Review Modules
                </button>

                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white shadow-xs transition-colors ${
                    allAnswered
                      ? 'bg-[#1E6B5E] hover:bg-[#12463C] cursor-pointer'
                      : 'bg-[#9BB8AF] cursor-not-allowed'
                  }`}
                >
                  <span>Submit Evaluation</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS & CERTIFICATE CLAIM */}
          {(activeStep === 'results' || activeStep === 'claim') && (
            <div className="space-y-6">
              {/* Score Announcement Card */}
              <div
                className={`p-6 rounded-xl border shadow-xs text-center space-y-3 ${
                  hasPassed
                    ? 'bg-[#E4EEEA] border-[#BBD7CF] text-[#12463C]'
                    : 'bg-[#FAF0ED] border-[#F2D0C7] text-[#782818]'
                }`}
              >
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white shadow-sm bg-current">
                  {hasPassed ? (
                    <Award className="w-8 h-8 text-[#E4EEEA]" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-[#FAF0ED]" />
                  )}
                </div>

                <h4 className="font-serif-heading text-2xl font-bold">
                  {hasPassed ? 'Congratulations! You Passed' : 'Assessment Incomplete'}
                </h4>

                <div className="text-3xl font-extrabold">
                  {scorePercent}%
                </div>

                <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {hasPassed
                    ? `You have demonstrated clinical mastery in ${course.title} according to national standard guidelines. Enter your name below to issue your accredited certificate.`
                    : `You scored ${scorePercent}%, which is below the ${course.passingScorePercent}% required pass threshold. Review the rationales below and retake the assessment.`}
                </p>

                {!hasPassed && (
                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#782818] hover:bg-[#5C1E12] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>
                )}
              </div>

              {/* Certificate Claim Form (Only if passed) */}
              {hasPassed && (
                <div className="bg-white rounded-xl border border-[#DCD8CF] p-6 shadow-xs space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DD]">
                    <Sparkles className="w-5 h-5 text-[#1E6B5E]" />
                    <h5 className="font-serif-heading text-lg font-bold text-[#1B211E]">
                      Issue Your Official Certificate of Completion
                    </h5>
                  </div>

                  <form onSubmit={handleGenerateCertificate} className="space-y-4">
                    {formError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#1B211E] uppercase tracking-wider mb-1">
                        Full Legal Name (as to appear on certificate) *
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => {
                          setRecipientName(e.target.value);
                          setFormError('');
                        }}
                        placeholder="e.g., Dr. Sara Bekele or Dawit Haile"
                        className="w-full px-3.5 py-2 rounded-lg border border-[#DCD8CF] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6B5E] bg-[#FAF9F5]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1B211E] uppercase tracking-wider mb-1">
                          Professional Title / Cadre
                        </label>
                        <select
                          value={recipientTitle}
                          onChange={(e) => setRecipientTitle(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-[#DCD8CF] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6B5E] bg-[#FAF9F5]"
                        >
                          <option value="Clinical Pharmacist">Clinical Pharmacist</option>
                          <option value="Hospital Pharmacist">Hospital Pharmacist</option>
                          <option value="Pharmacy Student (BPharm)">Pharmacy Student (BPharm)</option>
                          <option value="PharmD Resident">PharmD Resident</option>
                          <option value="Clinical Preceptor / Lecturer">Clinical Preceptor / Lecturer</option>
                          <option value="Community Pharmacist">Community Pharmacist</option>
                          <option value="Medical Doctor / Resident">Medical Doctor / Resident</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1B211E] uppercase tracking-wider mb-1">
                          Institution / Hospital (Optional)
                        </label>
                        <input
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="e.g., Addis Ababa University / Tikur Anbessa Hospital"
                          className="w-full px-3.5 py-2 rounded-lg border border-[#DCD8CF] text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6B5E] bg-[#FAF9F5]"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-sm font-semibold cursor-pointer shadow-xs transition-colors"
                      >
                        <Award className="w-4 h-4 text-emerald-300" />
                        <span>Generate &amp; View Accredited Certificate</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Question Feedback & Preceptor Rationales */}
              <div className="space-y-4 pt-2">
                <h5 className="font-serif-heading text-base font-bold text-[#1B211E]">
                  Question Review &amp; Preceptor Rationales
                </h5>

                <div className="space-y-4">
                  {course.quiz.map((q, qIdx) => {
                    const chosen = userAnswers[q.id];
                    const isCorrect = chosen === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm space-y-3 ${
                          isCorrect
                            ? 'bg-[#FAF9F5] border-[#BBD7CF]'
                            : 'bg-[#FAF4F2] border-[#F2D0C7]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-[#1B211E]">
                            {qIdx + 1}. {q.question}
                          </p>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="text-[#4B5350]">
                            <strong>Your Answer:</strong> {q.options[chosen] || 'Not answered'}
                          </div>
                          {!isCorrect && (
                            <div className="text-emerald-800 font-medium">
                              <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                            </div>
                          )}
                        </div>

                        <div className="p-3 rounded-lg bg-white border border-[#E8E5DD] space-y-1 text-xs">
                          <div className="font-bold text-[#10201C] flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5 text-[#1E6B5E]" />
                            <span>Preceptor Explanation:</span>
                          </div>
                          <p className="text-[#4B5350] leading-relaxed">
                            {q.explanation}
                          </p>
                          <div className="text-[0.7rem] text-[#757D79] italic pt-1 border-t border-[#F0EEE7]">
                            Guideline: {q.guidelineReference}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
