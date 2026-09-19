import React, { useState } from 'react';
import { PageView } from '../../types';
import {
  Building2,
  Users,
  CheckCircle2,
  Calculator,
  Calendar,
  Award,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface InstitutionsViewProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
}

export const InstitutionsView: React.FC<InstitutionsViewProps> = ({ onNavigate, onOpenSimulator }) => {
  const [cohortSize, setCohortSize] = useState<number>(45);
  const [casesPerStudent, setCasesPerStudent] = useState<number>(8);

  const totalSimulations = cohortSize * casesPerStudent;
  const facultyHoursSaved = Math.round((totalSimulations * 25) / 60); // 25 mins per thorough preceptor manual mark

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Title Header */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[64ch] space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block">
            For Institutions
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E]">
            Clerkship-grade practice, with the evidence to show it
          </h1>
          <p className="text-[#4B5350] text-base sm:text-lg leading-relaxed">
            The institution buys the licence, not the student. Ethiopian pharmacy students are price-sensitive, so the platform is designed around what a department actually needs: standardised case exposure, instructor visibility, and defensible competency records.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] cursor-pointer"
            >
              <span>Request a pilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSimulator}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#1B211E] bg-white border border-[#DCD8CF] hover:bg-[#FAF9F5] cursor-pointer"
            >
              <span>Open the prototype</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 VALUE PILLARS */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] block">
              For the department
            </span>
            <h3 className="text-lg font-bold text-[#1B211E]">Standardised case exposure</h3>
            <p className="text-xs sm:text-sm text-[#757D79] leading-relaxed">
              Every student in the cohort reasons through the same validated patients, so clinical competence stops depending on which hospital ward or preceptor a student happened to be placed with.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] block">
              For the instructor
            </span>
            <h3 className="text-lg font-bold text-[#1B211E]">Cohort competency reporting</h3>
            <p className="text-xs sm:text-sm text-[#757D79] leading-relaxed">
              Mean rubric scores by domain, weakest problem categories, per-student attempt history, and week-on-week movement — visible in real-time without marking a single script by hand.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] block">
              For accreditation &amp; CPD
            </span>
            <h3 className="text-lg font-bold text-[#1B211E]">Exportable evidence</h3>
            <p className="text-xs sm:text-sm text-[#757D79] leading-relaxed">
              Documented, rubric-scored practice records per learner: the paper trail curriculum review boards, faculty committees and CPD re-licensure processes require (Directive 332/2020).
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COHORT CALCULATOR */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF9F5] border border-[#DCD8CF] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E6B5E]">
                <Calculator className="w-4 h-4" />
                <span>Interactive Faculty Impact Estimator</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#1B211E]">
                Calculate your department&apos;s clerkship throughput
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5350] leading-relaxed">
                See how many standardised patient encounters and faculty grading hours PharmaMind AI automates for your upcoming academic semester.
              </p>

              {/* Slider Controls */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1B211E] mb-1.5">
                    <span>Cohort Size (Students / Interns):</span>
                    <span className="font-bold text-[#1E6B5E] mono-num">{cohortSize} students</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={cohortSize}
                    onChange={(e) => setCohortSize(Number(e.target.value))}
                    className="w-full h-2 bg-[#E4E1D9] rounded-lg appearance-none cursor-pointer accent-[#1E6B5E]"
                  />
                  <div className="flex justify-between text-[0.7rem] text-[#757D79] mt-1">
                    <span>10 students</span>
                    <span>75 students</span>
                    <span>150 students</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1B211E] mb-1.5">
                    <span>Rehearsals per Student (Cases):</span>
                    <span className="font-bold text-[#1E6B5E] mono-num">{casesPerStudent} cases</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    step="1"
                    value={casesPerStudent}
                    onChange={(e) => setCasesPerStudent(Number(e.target.value))}
                    className="w-full h-2 bg-[#E4E1D9] rounded-lg appearance-none cursor-pointer accent-[#1E6B5E]"
                  />
                  <div className="flex justify-between text-[0.7rem] text-[#757D79] mt-1">
                    <span>4 cases</span>
                    <span>12 cases</span>
                    <span>20 cases</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Metric Cards */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-[#DCD8CF] p-5 sm:p-6 shadow-sm space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#757D79]">
                Estimated Academic Impact
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[#F7F6F2] border border-[#E8E5DD]">
                  <div className="text-xs text-[#757D79]">Patient Repetitions</div>
                  <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1E6B5E] mono-num mt-1">
                    {totalSimulations}
                  </div>
                  <div className="text-[0.68rem] text-[#4B5350] mt-0.5">Scored case encounters</div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F6F2] border border-[#E8E5DD]">
                  <div className="text-xs text-[#757D79]">Preceptor Hours Saved</div>
                  <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#12463C] mono-num mt-1">
                    ~{facultyHoursSaved}h
                  </div>
                  <div className="text-[0.68rem] text-[#4B5350] mt-0.5">Automated rubric grading</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#E4EEEA]/60 border border-[#BBD7CF] text-xs text-[#12463C] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E6B5E] shrink-0 mt-0.5" />
                <span>
                  <strong>Pilot Guarantee:</strong> Includes onboarding session for faculty, pre/post competency reporting, and customized rubric mapping.
                </span>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 rounded-lg text-xs font-semibold text-center text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-colors"
              >
                Apply to run this cohort free →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* THE 6-WEEK PILOT TIMELINE */}
      <section className="bg-[#F0EEE7] py-14 sm:py-20 border-y border-[#DCD8CF]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
              The Pilot Structure
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
              Six weeks, one cohort, measured on the same rubric
            </h2>
            <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
              We run the first pilot free. The exchange is data: pre and post competency scores your department keeps and publishes.
            </p>
          </div>

          <div className="border-t border-[#DCD8CF] divide-y divide-[#DCD8CF]">
            {/* Week 0 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">01</span>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold text-[#1B211E]">Week 0 — Baseline cold assessment</h4>
                <div className="text-xs text-[#757D79] mt-0.5 font-medium">Diagnostic benchmark</div>
              </div>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                The cohort works two cases cold. We record baseline problem identification, therapeutic reasoning and SOAP documentation scores without teaching to the instrument.
              </p>
            </div>

            {/* Weeks 1-5 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">02</span>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold text-[#1B211E]">Weeks 1–5 — Self-paced case work</h4>
                <div className="text-xs text-[#757D79] mt-0.5 font-medium">Deliberate practice</div>
              </div>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Learners work the case bank at their own pace. The instructor dashboard surfaces which problem categories the cohort keeps missing, enabling high-yield targeted classroom reviews.
              </p>
            </div>

            {/* Week 6 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">03</span>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold text-[#1B211E]">Week 6 — Matched post-assessment</h4>
                <div className="text-xs text-[#757D79] mt-0.5 font-medium">Competency delta</div>
              </div>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Matched clinical cases, scored against the identical rubric. The comparison is the deliverable, whether it flatters the product or exposes remaining curriculum gaps.
              </p>
            </div>

            {/* After */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">04</span>
              <div className="md:col-span-4">
                <h4 className="text-base font-bold text-[#1B211E]">After — Faculty joint write-up</h4>
                <div className="text-xs text-[#757D79] mt-0.5 font-medium">Academic publication</div>
              </div>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Your faculty own the academic output. Virtual patient simulation already has a published evidence base in pharmacy education (FIP Review); localised Ethiopian data is what is missing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LICENSING TIERS */}
      <section id="pricing" className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[58ch] mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
            Licensing Model
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
            Who pays, and for what
          </h2>
          <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
            Pricing is set per institution and per cohort size during the pilot phase. The structure below is transparent; numbers are tailored in discussion with department heads.
          </p>
        </div>

        <div className="border-t border-[#DCD8CF] divide-y divide-[#DCD8CF]">
          {/* Tier A */}
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">A</span>
            <div className="md:col-span-4">
              <h4 className="text-base font-bold text-[#1B211E]">Institutional Licence</h4>
              <span className="text-xs text-[#757D79]">Schools &amp; Faculties of Pharmacy</span>
            </div>
            <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
              Annual per-cohort licence. Full case bank, instructor dashboard, rubric analytics, cohort competency reporting, and onboarding workshop for preceptors.
            </p>
          </div>

          {/* Tier B */}
          <div id="hospitals" className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">B</span>
            <div className="md:col-span-4">
              <h4 className="text-base font-bold text-[#1B211E]">Hospital CPD Licence</h4>
              <span className="text-xs text-[#757D79]">Hospitals &amp; Clinical Departments</span>
            </div>
            <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
              Annual departmental licence covering CPD activity, documentation training, antimicrobial stewardship cases and exportable competency evidence.
            </p>
          </div>

          {/* Tier C */}
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">C</span>
            <div className="md:col-span-4">
              <h4 className="text-base font-bold text-[#1B211E]">Individual Student Plan</h4>
              <span className="text-xs text-[#757D79]">Students &amp; Interns</span>
            </div>
            <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
              Low-cost monthly self-study plan. Conceived as an adoption and word-of-mouth channel, deliberately not the revenue base.
            </p>
          </div>

          {/* Tier D */}
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">D</span>
            <div className="md:col-span-4">
              <h4 className="text-base font-bold text-[#1B211E]">Certification Tracks</h4>
              <span className="text-xs text-[#757D79]">Practising Pharmacists</span>
            </div>
            <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
              Advanced modules in antimicrobial stewardship and pharmaceutical care documentation — offered once the accreditation pathway is confirmed with the regulator and professional association.
            </p>
          </div>

          {/* Tier E */}
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">E</span>
            <div className="md:col-span-4">
              <h4 className="text-base font-bold text-[#1B211E]">Partnerships &amp; Grants</h4>
              <span className="text-xs text-[#757D79]">Associations, NGOs, Health Development Partners</span>
            </div>
            <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
              Sponsored training cohorts and co-branded CPD content under a strict editorial firewall: no sponsor influences clinical case content or rubric scoring.
            </p>
          </div>
        </div>
      </section>

      {/* MARKET CONTEXT (ON DARK) */}
      <section className="bg-[#10201C] text-[#F4F1EA] py-14 sm:py-20">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8FB8AC] block mb-2">
              Market Context
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-3">
              A growing cohort in an expanding digital health landscape
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="font-serif-heading text-2xl text-white mono-num font-bold">
                18,281 → 25,295
              </h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Projected Ethiopian pharmacists between 2024 and 2028, within a national health workforce moving from 313,097 to a projected 404,196 by 2030 (Health Workforce Study, PMC13068872).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="font-serif-heading text-2xl text-white mono-num font-bold">
                USD 7.33B → 19.25B
              </h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Africa EdTech market, 2025 to 2034, growing at a compound annual growth rate (CAGR) of 11.33% (IMARC Group).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="font-serif-heading text-2xl text-white mono-num font-bold">
                USD 9.3B by 2030
              </h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Africa digital health market, growing at 15.4% annually, driven by institutional adoption of clinical training software (Research and Markets).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="font-serif-heading text-2xl text-white mono-num font-bold">
                14.58% CAGR
              </h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Global healthcare e-learning, from a base of USD 11.10B in 2024 — the category is proven; the localised Ethiopian clinical content is what PharmaMind AI builds (Grand View Research).
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#12463C] bg-white hover:bg-[#EAF1EE] transition-all cursor-pointer"
            >
              <span>Start a pilot conversation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('evidence')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#F4F1EA] bg-transparent border border-[#2A453E] hover:border-[#8FB8AC] transition-all cursor-pointer"
            >
              <span>Read the evidence base</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
