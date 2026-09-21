import React, { useState } from 'react';
import { PageView } from '../../types';
import { CASE_STUDIES } from '../../data/cases';
import {
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  BookOpen,
  FileText,
  MessageSquare,
  Pill,
  GraduationCap,
  BarChart3,
  WifiOff,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductViewProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
  onOpenClinicalTools?: () => void;
}

export const ProductView: React.FC<ProductViewProps> = ({ onNavigate, onOpenSimulator, onOpenClinicalTools }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'Foundation' | 'Intermediate' | 'Advanced'>('all');

  const filteredCases = activeTab === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.level === activeTab);

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Title Header */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[64ch] space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block">
            The Platform
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E]">
            Six modules built around one habit
          </h1>
          <p className="text-[#4B5350] text-base sm:text-lg leading-relaxed">
            The simulator and the documentation module are the product. Everything else exists to feed them — and each module is deliberately narrower than the general-purpose tool it replaces.
          </p>
        </div>
      </section>

      {/* MODULE 01: CORE VIRTUAL PATIENT SIMULATOR */}
      <section id="simulator" className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block">
              Module 01 · Core Engine
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#1B211E]">
              Virtual patient simulator
            </h2>
            <p className="text-sm text-[#4B5350] leading-relaxed">
              Ethiopian patients, written and reviewed by clinical pharmacists. Each case carries a full problem set, a model plan, a model SOAP note, counselling points and a guideline reference — and each carries deliberate distractors, because real medication lists contain findings that are not problems.
            </p>

            <ul className="dashlist space-y-2 text-xs sm:text-sm text-[#4B5350] pt-2">
              <li>Three difficulty levels, from foundation to advanced clerkship</li>
              <li>Six DTP categories: Indication, Effectiveness, Safety, Interaction, Adherence, Monitoring</li>
              <li>Rubric feedback naming what was missed and why it mattered clinically</li>
              <li>Every student attempt stored, so progress is measurable rather than remembered</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenSimulator}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Open Simulator Sandbox</span>
              </button>
            </div>
          </div>

          {/* Case Bank Explorer Table / Cards */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#DCD8CF] shadow-xs overflow-hidden">
            <div className="p-4 bg-[#FAF9F5] border-b border-[#E8E5DD] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#1B211E]">The Live Pilot Case Bank</h3>
                <p className="text-[0.75rem] text-[#757D79]">Validated against documented Ethiopian clinical problem patterns</p>
              </div>

              {/* Level Filter Tabs */}
              <div className="flex gap-1 text-[0.7rem]">
                {(['all', 'Foundation', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveTab(lvl)}
                    className={`px-2 py-1 rounded-md font-medium transition-colors ${
                      activeTab === lvl
                        ? 'bg-[#1E6B5E] text-white'
                        : 'bg-white text-[#757D79] border border-[#DCD8CF] hover:bg-[#F0EEE7]'
                    }`}
                  >
                    {lvl === 'all' ? 'All' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Table View (sm and up) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1E6B5E] text-white">
                    <th className="p-3 font-semibold">Condition</th>
                    <th className="p-3 font-semibold">Problems the learner must find</th>
                    <th className="p-3 font-semibold">Level</th>
                    <th className="p-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5DD]">
                  {filteredCases.map((cs) => (
                    <tr key={cs.id} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="p-3 font-bold text-[#1B211E] whitespace-nowrap">
                        {cs.condition}
                        <div className="text-[0.68rem] text-[#757D79] font-mono">{cs.code}</div>
                      </td>
                      <td className="p-3 text-[#4B5350] text-[0.75rem] leading-snug max-w-[280px]">
                        {cs.availableOptions
                          .filter((o) => o.isActualProblem)
                          .map((o) => o.text.split(':')[1] || o.text)
                          .slice(0, 3)
                          .join('; ')}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-full ${
                            cs.level === 'Foundation'
                              ? 'bg-[#E4EEEA] text-[#1E6B5E]'
                              : cs.level === 'Intermediate'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {cs.level}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          onClick={onOpenSimulator}
                          className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#1E6B5E] hover:underline"
                        >
                          <span>Run Case</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (screens < 640px) */}
            <div className="sm:hidden divide-y divide-[#E8E5DD]">
              {filteredCases.map((cs) => (
                <div key={cs.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1B211E]">{cs.condition}</span>
                    <span
                      className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-full ${
                        cs.level === 'Foundation'
                          ? 'bg-[#E4EEEA] text-[#1E6B5E]'
                          : cs.level === 'Intermediate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {cs.level}
                    </span>
                  </div>
                  <div className="text-xs text-[#757D79] font-mono">{cs.code} · {cs.title}</div>
                  <div className="text-xs text-[#4B5350] leading-relaxed">
                    <strong>Problems included:</strong>{' '}
                    {cs.availableOptions
                      .filter((o) => o.isActualProblem)
                      .map((o) => o.text.split(':')[0])
                      .join(', ')}
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={onOpenSimulator}
                      className="w-full py-2 rounded text-xs font-semibold text-center text-[#1E6B5E] bg-[#E4EEEA] hover:bg-[#d5e6e0]"
                    >
                      Launch Case Simulator →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-[#FAF9F5] border-t border-[#E8E5DD] text-[0.75rem] text-[#757D79] flex flex-wrap items-center justify-between gap-2">
              <span>Grounded in Ethiopian studies: North Wollo (PMC10364825), Wachemo (PubMed 40689210), AAU Thesis.</span>
              <button onClick={() => onNavigate('evidence')} className="text-[#1E6B5E] font-medium hover:underline">
                View study sources →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW GRADING WORKS: THE RUBRIC IS THE PRODUCT */}
      <section className="bg-[#F0EEE7] py-14 sm:py-20 border-y border-[#DCD8CF]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
              How Grading Works
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
              The rubric is the product
            </h2>
            <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
              Three domains are scored independently, so a learner who finds every problem but cannot document it is told exactly that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
              <span className="font-serif-heading text-3xl font-bold text-[#1E6B5E] mono-num block">45%</span>
              <h3 className="text-base font-bold text-[#1B211E]">Problem identification</h3>
              <p className="text-xs text-[#4B5350] leading-relaxed">
                Every drug therapy problem present, with an automated penalty for unsupported distractor selections. Selecting everything blindly is not a strategy in clinical practice.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
              <span className="font-serif-heading text-3xl font-bold text-[#1E6B5E] mono-num block">35%</span>
              <h3 className="text-base font-bold text-[#1B211E]">Therapeutic reasoning</h3>
              <p className="text-xs text-[#4B5350] leading-relaxed">
                Does the written plan contain the actions a preceptor expects — the switch, the discontinuation, the monitoring parameter, the follow-up interval, the patient counselling point?
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
              <span className="font-serif-heading text-3xl font-bold text-[#1E6B5E] mono-num block">20%</span>
              <h3 className="text-base font-bold text-[#1B211E]">Documentation (SOAP)</h3>
              <p className="text-xs text-[#4B5350] leading-relaxed">
                SOAP structure, with each problem and its pharmaceutical cause explicitly stated in the assessment rather than implied or omitted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTING MODULES */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[58ch] mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
            Supporting Modules
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
            Narrow on purpose
          </h2>
          <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
            Every supporting module focuses strictly on clinical pharmacy habits without bloating into an unfocused general dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 2 */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Module 02 · Core
              </span>
              <h3 className="text-base font-bold text-[#1B211E]">Pharmaceutical care documentation</h3>
              <p className="text-xs text-[#757D79] leading-relaxed">
                SOAP notes, medication therapy reviews, care plans and intervention records against structured templates, with rubric feedback on each. This is the habit that outlasts the course — and the one Ethiopian studies repeatedly find missing in practice (Motta town study).
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E5DD]">
              <button
                type="button"
                onClick={onOpenSimulator}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
              >
                <span>Practice SOAP in Case Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Module 3 */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                Module 03
              </span>
              <h3 className="text-base font-bold text-[#1B211E]">AI clinical tutor</h3>
              <p className="text-xs text-[#757D79] leading-relaxed">
                Socratic questioning anchored to guidelines. Ask about an interaction and it asks what mechanism you expect before it confirms anything. It will not dose a real, identifiable patient.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E5DD]">
              <button
                type="button"
                onClick={onOpenSimulator}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
              >
                <span>Launch Interactive Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Module 4 */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                <Pill className="w-4 h-4" />
                Module 04
              </span>
              <h3 className="text-base font-bold text-[#1B211E]">Drug information centre</h3>
              <p className="text-xs text-[#757D79] leading-relaxed">
                Concise monographs covering indication, dosing, renal adjustment, key interactions, monitoring and counselling — with local availability notes and the substitution logic used at the counter.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E5DD]">
              {onOpenClinicalTools ? (
                <button
                  type="button"
                  onClick={onOpenClinicalTools}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
                >
                  <span>Open Bedside Clinical Tools &amp; Drugs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenSimulator}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
                >
                  <span>Explore Drug Interactions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Module 5 */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                Module 05
              </span>
              <h3 className="text-base font-bold text-[#1B211E]">Exam preparation hub</h3>
              <p className="text-xs text-[#757D79] leading-relaxed">
                Case-based items mapped to competency domains rather than chapters, so weak-domain analytics flow into the same cohort report as the simulator.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E5DD]">
              <button
                type="button"
                onClick={() => onNavigate('evidence')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
              >
                <span>View Competency Evidence Base</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Module 6 */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                Module 06
              </span>
              <h3 className="text-base font-bold text-[#1B211E]">CPD and institutional reporting</h3>
              <p className="text-xs text-[#757D79] leading-relaxed">
                Cohort dashboards for educators and exportable activity records for practising pharmacists, designed for the re-licensure evidence the national CPD directive expects (Directive 332/2020).
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E5DD]">
              <button
                type="button"
                onClick={() => onNavigate('institutions')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
              >
                <span>Review Institutional Pilot Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Roadmap Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#757D79] flex items-center gap-1.5">
                <WifiOff className="w-4 h-4 text-[#1E6B5E]" />
                Roadmap
              </span>
              <h3 className="text-base font-bold text-[#1B211E]">Amharic interface &amp; offline use</h3>
              <p className="text-xs text-[#757D79] leading-relaxed">
                Planned for year two: an Amharic interface and a low-bandwidth, offline-capable client, because connectivity should not decide who gets to practise.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E5DD]">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
              >
                <span>Read Roadmap in About</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL SAFETY BOUNDARIES */}
      <section className="bg-[#10201C] text-[#F4F1EA] py-14 sm:py-20">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8FB8AC] block mb-2">
              Clinical Safety
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-3">
              What the AI is allowed to do
            </h2>
            <p className="text-[#A9B3AE] text-sm sm:text-base leading-relaxed">
              Errors in a grading and questioning role are pedagogical. Errors in a dosing role are clinical. The product is deliberately built in the first category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Permitted */}
            <div className="p-6 rounded-xl bg-[#173029] border border-[#2A453E] space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#8FB8AC]" />
                <h4 className="text-base font-bold text-[#8FB8AC]">Permitted at Launch</h4>
              </div>
              <ul className="dashlist space-y-2.5 text-xs sm:text-sm text-[#A9B3AE]">
                <li>Ask Socratic questions before confirming an answer</li>
                <li>Grade against a pharmacist-written rubric</li>
                <li>Explain guideline-anchored rationale</li>
                <li>Summarise a learner&apos;s reasoning for an instructor</li>
                <li>Draft practice items for pharmacist review before release</li>
              </ul>
            </div>

            {/* Not permitted */}
            <div className="p-6 rounded-xl bg-[#173029] border border-[#2A453E] space-y-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#D8A08A]" />
                <h4 className="text-base font-bold text-[#D8A08A]">Not Permitted at Launch</h4>
              </div>
              <ul className="dashlist space-y-2.5 text-xs sm:text-sm text-[#A9B3AE]">
                <li>Diagnose a real, identifiable patient</li>
                <li>Recommend or change a dose on a live prescription</li>
                <li>Tell a patient to stop a medicine</li>
                <li>Replace emergency or professional care</li>
                <li>Present unreviewed AI output as clinical fact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
