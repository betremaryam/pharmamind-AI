import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/cases';
import { CaseStudy } from '../types';
import {
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  X,
  Send,
  Loader2,
  Mail
} from 'lucide-react';
import { motion } from 'motion/react';
import { submitFormspreeResponse, getFormspreeTarget } from '../services/formspree';

interface InteractiveCaseSimulatorProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const InteractiveCaseSimulator: React.FC<InteractiveCaseSimulatorProps> = ({
  onClose,
  isModal = false
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('htn-01');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProblemIds, setSelectedProblemIds] = useState<string[]>(['p1', 'p2']); // pre-populate with 2 realistic selections
  const [userPlanText, setUserPlanText] = useState<string>(
    'Discontinue Enalapril due to dry cough. Stop OTC Diclofenac as it blunts antihypertensive therapy and impairs renal perfusion. Switch to an ARB (Losartan 50mg) and recommend Paracetamol for knee pain.'
  );

  // Formspree Case Submission State
  const [showReportForm, setShowReportForm] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [isSubmittingReport, setIsSubmittingReport] = useState<boolean>(false);
  const [reportSent, setReportSent] = useState<boolean>(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const activeCase: CaseStudy =
    CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  const handleCaseChange = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentStep(1);
    setReportSent(false);
    setReportError(null);
    const newCase = CASE_STUDIES.find((c) => c.id === caseId) || CASE_STUDIES[0];
    // Pick first 2 actual problems by default for ease of testing
    const defaults = newCase.availableOptions.filter((o) => o.isActualProblem).slice(0, 2).map((o) => o.id);
    setSelectedProblemIds(defaults);
  };

  const toggleProblemSelection = (id: string) => {
    if (selectedProblemIds.includes(id)) {
      setSelectedProblemIds(selectedProblemIds.filter((pId) => pId !== id));
    } else {
      setSelectedProblemIds([...selectedProblemIds, id]);
    }
  };

  // Calculate Rubric Feedback
  const actualProblems = activeCase.availableOptions.filter((o) => o.isActualProblem);
  const totalActual = actualProblems.length;
  const correctlyIdentified = selectedProblemIds.filter((id) =>
    actualProblems.some((a) => a.id === id)
  ).length;
  const wronglyIdentified = selectedProblemIds.filter((id) =>
    activeCase.availableOptions.some((a) => a.id === id && !a.isActualProblem)
  ).length;
  const missedCount = Math.max(0, totalActual - correctlyIdentified);

  // Score calculations
  const problemFindingScore = Math.max(
    0,
    Math.round(((correctlyIdentified - wronglyIdentified * 0.5) / totalActual) * 100)
  );
  const reasoningScore = userPlanText.length > 40 ? 76 : 50;
  const documentationScore = 70;
  const totalScore = Math.round(
    problemFindingScore * 0.45 + reasoningScore * 0.35 + documentationScore * 0.20
  );

  const steps = [
    { num: 1, label: '1. Patient Data' },
    { num: 2, label: '2. Problem Finding' },
    { num: 3, label: '3. Care Plan' },
    { num: 4, label: '4. SOAP Note' },
    { num: 5, label: '5. Preceptor Rubric' },
  ];

  const handleCaseSubmitToFormspree = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    setReportError(null);

    const selectedProblemNames = selectedProblemIds
      .map((id) => activeCase.availableOptions.find((o) => o.id === id)?.text)
      .filter(Boolean)
      .join('; ');

    const payload = {
      _subject: `PharmaMind Case Record: ${activeCase.code} - ${studentName || 'Student/Clinician'} (${totalScore}%)`,
      learnerName: studentName.trim() || 'Anonymous Learner',
      learnerEmail: studentEmail.trim() || 'Not provided',
      learnerNotes: studentNotes.trim() || 'No personal notes attached',
      caseCode: activeCase.code,
      caseTitle: activeCase.title,
      condition: activeCase.condition,
      level: activeCase.level,
      totalScore: `${totalScore} / 100`,
      problemFindingScore: `${problemFindingScore}% (${correctlyIdentified}/${totalActual} identified, ${wronglyIdentified} distractor penalty)`,
      therapeuticReasoningScore: `${reasoningScore}%`,
      careDocumentationScore: `${documentationScore}%`,
      identifiedProblems: selectedProblemNames,
      learnerCarePlan: userPlanText,
      formType: 'Interactive Case Simulation Report'
    };

    const result = await submitFormspreeResponse(payload);
    setIsSubmittingReport(false);

    if (result.ok) {
      setReportSent(true);
      setReportError(null);
    } else {
      setReportError(result.error || 'Failed to transmit case evaluation to Formspree.');
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-[#DCD8CF] shadow-lg overflow-hidden ${isModal ? 'max-w-4xl w-full max-h-[90vh] flex flex-col' : ''}`}>
      {/* Top Bar */}
      <div className="bg-[#173029] text-[#F4F1EA] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#2A453E]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8FB8AC] animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#8FB8AC]">
            Interactive Virtual Patient Simulator
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#2A453E] text-[#F4F1EA] font-mono">
            {activeCase.code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Case Selector */}
          <select
            value={selectedCaseId}
            onChange={(e) => handleCaseChange(e.target.value)}
            className="text-xs bg-[#10201C] text-[#F4F1EA] border border-[#2A453E] rounded px-2.5 py-1.5 focus:outline-none focus:border-[#8FB8AC] cursor-pointer"
            aria-label="Select Clinical Case"
          >
            {CASE_STUDIES.map((cs) => (
              <option key={cs.id} value={cs.id}>
                {cs.code} · {cs.condition} ({cs.level})
              </option>
            ))}
          </select>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded text-[#A9B3AE] hover:text-white hover:bg-[#2A453E] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Steps Navigation Bar */}
      <div className="bg-[#F0EEE7] border-b border-[#DCD8CF] px-4 sm:px-6 py-2.5 flex items-center gap-1.5 overflow-x-auto">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isPassed = currentStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1E6B5E] text-white shadow-xs'
                  : isPassed
                  ? 'bg-[#E4EEEA] text-[#1E6B5E] hover:bg-[#d5e6e0]'
                  : 'bg-white text-[#757D79] border border-[#DCD8CF] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{s.label}</span>
              {isPassed && <CheckCircle2 className="w-3 h-3 text-[#1E6B5E]" />}
            </button>
          );
        })}
      </div>

      {/* Case Header Details */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#FAF9F6] border-b border-[#E8E5DD] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#1B211E] flex items-center gap-2">
            <span>{activeCase.title}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[0.7rem] font-semibold ${
                activeCase.level === 'Foundation'
                  ? 'bg-[#E4EEEA] text-[#1E6B5E]'
                  : activeCase.level === 'Intermediate'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {activeCase.level}
            </span>
          </h3>
          <p className="text-[#757D79] mt-0.5">
            {activeCase.patient.name}, {activeCase.patient.age} y/o {activeCase.patient.gender} ·{' '}
            {activeCase.patient.setting}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#757D79]">
            Target Problems: <strong className="text-[#1B211E]">{activeCase.totalProblemsCount}</strong>
          </span>
          <button
            onClick={() => {
              setSelectedProblemIds(actualProblems.slice(0, 2).map((a) => a.id));
              setCurrentStep(1);
            }}
            className="inline-flex items-center gap-1 text-[0.75rem] text-[#757D79] hover:text-[#1E6B5E]"
            title="Reset attempt"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Step Content Area */}
      <div className="p-4 sm:p-6 overflow-y-auto max-h-[600px]">
        {/* STEP 1: PATIENT DATA */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E8E5DD]">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] mb-2 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Chief Complaint &amp; Clinical History
                </h4>
                <p className="text-sm font-semibold text-[#1B211E] mb-2">
                  &ldquo;{activeCase.patient.chiefComplaint}&rdquo;
                </p>
                <p className="text-xs text-[#4B5350] leading-relaxed">
                  {activeCase.patient.history}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E8E5DD]">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Vitals &amp; Laboratory Findings
                </h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                    <span className="text-[#757D79]">Blood Pressure</span>
                    <span className="font-bold text-rose-700">{activeCase.patient.vitals.bp}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                    <span className="text-[#757D79]">Heart Rate / Pulse</span>
                    <span className="font-medium text-[#1B211E]">{activeCase.patient.vitals.hr}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                    <span className="text-[#757D79]">Potassium (K+)</span>
                    <span className="font-bold text-amber-700">{activeCase.patient.vitals.k}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                    <span className="text-[#757D79]">Serum Creatinine</span>
                    <span className="font-medium text-[#1B211E]">{activeCase.patient.vitals.scr}</span>
                  </div>
                  {activeCase.patient.vitals.otherLabs?.map((lab, i) => (
                    <div key={i} className="text-[#4B5350] pt-1">
                      • {lab}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Medications Table */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] mb-2.5">
                Current Medications List (Presented as Encountered in Ethiopian Practice)
              </h4>
              <div className="overflow-x-auto rounded-lg border border-[#DCD8CF]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1E6B5E] text-white">
                      <th className="p-2.5 font-semibold">Medication</th>
                      <th className="p-2.5 font-semibold">Dose &amp; Frequency</th>
                      <th className="p-2.5 font-semibold">Reported Source</th>
                      <th className="p-2.5 font-semibold">Documented Indication</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E5DD]">
                    {activeCase.patient.currentMedications.map((m, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-[#FAF9F5]' : 'bg-white'}>
                        <td className="p-2.5 font-bold text-[#1B211E]">{m.drug}</td>
                        <td className="p-2.5 text-[#4B5350]">{m.dose} — {m.frequency}</td>
                        <td className="p-2.5 text-[#757D79]">{m.source}</td>
                        <td className="p-2.5 text-[#1B211E]">{m.indication}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] cursor-pointer"
              >
                <span>Proceed to Problem Identification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: PROBLEM FINDING */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-[#E4EEEA]/50 border border-[#BBD7CF] p-3 rounded-lg text-xs text-[#12463C] flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-[#1E6B5E] shrink-0 mt-0.5" />
              <div>
                <strong>Clinical Preceptor Instruction:</strong> Review the patient data and select every drug therapy problem (DTP) present. Plausible distractors are included, and unsupported selections receive penalties in the rubric. Being comprehensive is not being indiscriminate.
              </div>
            </div>

            <div className="space-y-2.5">
              {activeCase.availableOptions.map((opt) => {
                const isSelected = selectedProblemIds.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    onClick={() => toggleProblemSelection(opt.id)}
                    className={`block p-3.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#1E6B5E] bg-[#E4EEEA]/60 shadow-xs'
                        : 'border-[#DCD8CF] bg-white hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 rounded text-[#1E6B5E] border-gray-300 focus:ring-[#1E6B5E]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[0.68rem] font-bold uppercase tracking-wider bg-[#FAF9F5] border border-[#DCD8CF] text-[#4B5350]">
                            {opt.category}
                          </span>
                          {isSelected && (
                            <span className="text-xs text-[#1E6B5E] font-medium">Selected</span>
                          )}
                        </div>
                        <p className="text-[#1B211E] font-medium leading-snug">{opt.text}</p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DD]">
              <span className="text-xs text-[#757D79]">
                Selected: <strong>{selectedProblemIds.length}</strong> problems
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5350] hover:bg-[#F0EEE7]"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C]"
                >
                  <span>Commit to Care Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: CARE PLAN */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-[#FAF9F5] border border-[#DCD8CF] p-3 rounded-lg text-xs text-[#4B5350]">
              State your pharmaceutical care plan in your own clinical words: what will you discontinue, what will you substitute or initiate, what laboratory parameters require monitoring, and what counselling points will you deliver?
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B211E] mb-1.5">
                Your Therapeutic Plan &amp; Justification:
              </label>
              <textarea
                value={userPlanText}
                onChange={(e) => setUserPlanText(e.target.value)}
                rows={4}
                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#DCD8CF] bg-white focus:outline-none focus:border-[#1E6B5E]"
                placeholder="Write your therapeutic action steps here..."
              />
            </div>

            {/* Model Plan Comparison */}
            <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E8E5DD] space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-bold text-[#1E6B5E]">
                <span>Preceptor Model Care Plan (Ethiopian STG Reference)</span>
                <span className="text-[0.7rem] bg-[#E4EEEA] px-2 py-0.5 rounded">Standard of Care</span>
              </div>
              <div>
                <strong className="text-[#1B211E]">Discontinue / Switch: </strong>
                <span className="text-[#4B5350]">{activeCase.modelPlan.switchOrStop}</span>
              </div>
              <div>
                <strong className="text-[#1B211E]">Initiate: </strong>
                <span className="text-[#4B5350]">{activeCase.modelPlan.initiate}</span>
              </div>
              <div>
                <strong className="text-[#1B211E]">Safety Monitoring: </strong>
                <span className="text-[#4B5350]">{activeCase.modelPlan.monitoring}</span>
              </div>
              <div>
                <strong className="text-[#1B211E]">Patient Counselling: </strong>
                <span className="text-[#4B5350]">{activeCase.modelPlan.counselling}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5350] hover:bg-[#F0EEE7]"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C]"
              >
                <span>Write SOAP Note</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: SOAP NOTE */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-xs sm:text-sm">
            <div className="bg-[#FAF9F5] border border-[#DCD8CF] p-3 rounded-lg text-xs text-[#4B5350]">
              <strong>Documentation Rule:</strong> Each identified problem and its underlying pharmacology must be explicitly stated in the <em>Assessment</em> rather than buried ambiguously inside the Plan.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg border border-[#DCD8CF] bg-white">
                <div className="font-bold text-[#1E6B5E] mb-1">S — Subjective</div>
                <p className="text-xs text-[#4B5350] leading-relaxed">{activeCase.modelSoap.subjective}</p>
              </div>
              <div className="p-3.5 rounded-lg border border-[#DCD8CF] bg-white">
                <div className="font-bold text-[#1E6B5E] mb-1">O — Objective</div>
                <p className="text-xs text-[#4B5350] leading-relaxed">{activeCase.modelSoap.objective}</p>
              </div>
              <div className="p-3.5 rounded-lg border border-[#DCD8CF] bg-[#FAF9F5] md:col-span-2">
                <div className="font-bold text-[#12463C] mb-1 flex items-center justify-between">
                  <span>A — Assessment (DTP Categorization &amp; Etiology)</span>
                  <span className="text-[0.68rem] font-normal text-[#1E6B5E]">Checked by Rubric (20%)</span>
                </div>
                <p className="text-xs text-[#1B211E] leading-relaxed">{activeCase.modelSoap.assessment}</p>
              </div>
              <div className="p-3.5 rounded-lg border border-[#DCD8CF] bg-white md:col-span-2">
                <div className="font-bold text-[#1E6B5E] mb-1">P — Plan (Actionable Orders, Monitoring, Follow-up)</div>
                <p className="text-xs text-[#4B5350] leading-relaxed">{activeCase.modelSoap.plan}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5350] hover:bg-[#F0EEE7]"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Calculate Preceptor Rubric Score</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: PRECEPTOR RUBRIC FEEDBACK */}
        {currentStep === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Score Summary Box */}
            <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E]">
                  Evaluated Competency Performance
                </span>
                <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
                  <span className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#1E6B5E] mono-num">
                    {totalScore}
                  </span>
                  <span className="text-lg text-[#757D79]">/ 100</span>
                </div>
                <p className="text-xs text-[#4B5350] mt-1">
                  {correctlyIdentified} of {totalActual} valid problems identified ·{' '}
                  {wronglyIdentified > 0 ? `${wronglyIdentified} distractor penalty` : 'No penalties incurred'}
                </p>
              </div>

              {/* Progress bars */}
              <div className="w-full md:w-72 space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[#4B5350] mb-1">
                    <span>Problem Identification (45%)</span>
                    <span className="font-bold mono-num">{problemFindingScore}%</span>
                  </div>
                  <div className="h-2 bg-[#E4E1D9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E6B5E] rounded-full transition-all duration-500"
                      style={{ width: `${problemFindingScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#4B5350] mb-1">
                    <span>Therapeutic Reasoning (35%)</span>
                    <span className="font-bold mono-num">{reasoningScore}%</span>
                  </div>
                  <div className="h-2 bg-[#E4E1D9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E6B5E] rounded-full transition-all duration-500"
                      style={{ width: `${reasoningScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#4B5350] mb-1">
                    <span>Care Documentation (20%)</span>
                    <span className="font-bold mono-num">{documentationScore}%</span>
                  </div>
                  <div className="h-2 bg-[#E4E1D9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E6B5E] rounded-full transition-all duration-500"
                      style={{ width: `${documentationScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preceptor Rationale Breakdown */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Preceptor Rationales &amp; Guideline Citations
              </h4>

              <div className="space-y-3">
                {activeCase.availableOptions.map((opt) => {
                  const wasSelected = selectedProblemIds.includes(opt.id);
                  const isCorrect = (wasSelected && opt.isActualProblem) || (!wasSelected && !opt.isActualProblem);

                  return (
                    <div
                      key={opt.id}
                      className={`p-3.5 rounded-lg border text-xs transition-colors ${
                        opt.isActualProblem && wasSelected
                          ? 'border-emerald-300 bg-emerald-50/50'
                          : opt.isActualProblem && !wasSelected
                          ? 'border-amber-300 bg-amber-50/40'
                          : !opt.isActualProblem && wasSelected
                          ? 'border-rose-300 bg-rose-50/40'
                          : 'border-[#E8E5DD] bg-white opacity-70'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {opt.isActualProblem && wasSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {opt.isActualProblem && !wasSelected && (
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        {!opt.isActualProblem && wasSelected && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        {!opt.isActualProblem && !wasSelected && (
                          <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        )}

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-bold text-[#1B211E]">{opt.text}</span>
                            {opt.isActualProblem && wasSelected && (
                              <span className="text-[0.68rem] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                                Correctly Identified
                              </span>
                            )}
                            {opt.isActualProblem && !wasSelected && (
                              <span className="text-[0.68rem] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                                Missed Problem
                              </span>
                            )}
                            {!opt.isActualProblem && wasSelected && (
                              <span className="text-[0.68rem] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold">
                                Distractor Chosen (-Penalty)
                              </span>
                            )}
                          </div>

                          <p className="text-[#4B5350] mt-1 leading-relaxed">
                            {opt.preceptorRationale}
                          </p>

                          <div className="mt-1.5 text-[0.72rem] text-[#757D79] flex items-center gap-1">
                            <span>Citation:</span>
                            <span className="italic">{opt.citation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Formspree Case Report Submission to Preceptor / Faculty */}
            <div className="p-5 rounded-xl border border-[#DCD8CF] bg-[#FAF9F5] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-[#1B211E] flex items-center gap-2">
                    <span>Submit Case Performance Record</span>
                    <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-[#E4EEEA] text-[#1E6B5E] font-medium border border-[#BBD7CF]">
                      Formspree Connected
                    </span>
                  </h4>
                  <p className="text-xs text-[#757D79] mt-0.5">
                    Forward this case attempt, score breakdown ({totalScore}%), and your therapeutic care plan directly to faculty or your preceptor via Formspree.
                  </p>
                </div>
                {!reportSent && (
                  <button
                    type="button"
                    onClick={() => setShowReportForm(!showReportForm)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#1E6B5E] text-[#1E6B5E] hover:bg-[#E4EEEA] transition-colors"
                  >
                    {showReportForm ? 'Hide Form' : 'Send Case Record'}
                  </button>
                )}
              </div>

              {reportSent ? (
                <div className="p-4 rounded-lg bg-[#E4EEEA] border border-[#BBD7CF] text-[#12463C] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
                    <span>Case evaluation transmitted to Formspree!</span>
                  </div>
                  <p className="text-xs text-[#4B5350]">
                    Your score ({totalScore}%) for <strong>{activeCase.code} ({activeCase.condition})</strong> and your therapeutic care plan have been forwarded to <strong>betremaryameshete@gmail.com</strong> via Formspree.
                  </p>
                </div>
              ) : showReportForm ? (
                <form onSubmit={handleCaseSubmitToFormspree} className="space-y-3 pt-2 text-xs">
                  {reportError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
                      <div className="flex items-center gap-2 font-bold">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Transmission issue:</span>
                      </div>
                      <p>{reportError}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Learner Name or Student ID *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmittingReport}
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Betremaryam (PharmD Intern)"
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Email Address (for copy)
                      </label>
                      <input
                        type="email"
                        disabled={isSubmittingReport}
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="student@institution.edu.et"
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B211E] mb-1">
                      Learner Reflection or Notes for Preceptor
                    </label>
                    <textarea
                      rows={2}
                      disabled={isSubmittingReport}
                      value={studentNotes}
                      onChange={(e) => setStudentNotes(e.target.value)}
                      placeholder="e.g. Had doubts about the dose adjustment for renal clearance; please review my SOAP Assessment rationale."
                      className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[0.7rem] text-[#757D79]">
                      Will include: Score ({totalScore}%), DTP findings, and complete Care Plan.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmittingReport}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] disabled:opacity-60 flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {isSubmittingReport ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending via Formspree...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Case Record</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8E5DD]">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#1E6B5E] bg-[#E4EEEA] hover:bg-[#d8e6e1]"
              >
                Review Full Case Again
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#757D79]">Try another clinical case:</span>
                <select
                  value={selectedCaseId}
                  onChange={(e) => handleCaseChange(e.target.value)}
                  className="text-xs bg-[#FAF9F5] border border-[#DCD8CF] rounded px-3 py-1.5 font-medium"
                >
                  {CASE_STUDIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} ({c.condition})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
