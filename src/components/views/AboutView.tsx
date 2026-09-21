import React from 'react';
import { PageView } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  HeartHandshake,
  Building2,
  GraduationCap,
  BookOpen,
  Stethoscope,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { ThreeDimensionalDrugIcon } from '../ThreeDimensionalDrugIcon';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenSimulator }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Title Header & General PharmaMind AI Mission */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/20">
              <span className="w-2 h-2 rounded-full bg-[#1E6B5E]"></span>
              <span>About PharmaMind AI · Clinical Pharmacy Simulation</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E] leading-[1.14]">
              Bridging the gap between pharmacology theory and bedside practice
            </h1>

            <p className="text-base sm:text-lg text-[#1B211E] font-medium leading-relaxed">
              PharmaMind AI is an educational simulation platform engineered to cultivate clinical reasoning, structured problem-solving, and systematic documentation among pharmacy students and healthcare professionals.
            </p>

            <p className="text-sm sm:text-base text-[#4B5350] leading-relaxed">
              In clinical pharmacy education across Ethiopia and emerging health systems, students master pharmacology textbooks and mechanism diagrams, yet frequently reach graduation with limited opportunity to defend authentic therapeutic decisions under clinical pressure. PharmaMind AI provides repeated, risk-free clinical repetitions where every choice—from selecting first-line regimens to titrating dosages and identifying drug therapy problems—is scored against validated clinical rubrics and national standard treatment guidelines.
            </p>

            <p className="text-sm sm:text-base text-[#4B5350] leading-relaxed">
              The platform pairs rigorous case design with intelligent reasoning evaluation. Rather than testing passive multiple-choice recall, PharmaMind AI guides learners through patient workups, objective SOAP documentation, and cultural considerations (such as religious fasting chronotherapy), providing instant preceptor rationales for missed interactions and therapeutic oversights.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              {onOpenSimulator && (
                <button
                  onClick={onOpenSimulator}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-all cursor-pointer shadow-xs"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Launch Case Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => onNavigate('institutions')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#1B211E] bg-white border border-[#DCD8CF] hover:border-[#1B211E] hover:bg-[#FAF9F5] transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#1E6B5E]" />
                <span>Institutional Pilots</span>
              </button>

              <button
                onClick={() => onNavigate('evidence')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#4B5350] hover:text-[#1B211E] transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#1E6B5E]" />
                <span>View Evidence Base</span>
              </button>
            </div>
          </div>

          {/* Interactive 3D Capsule & Principles Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-[#DCD8CF] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                <h3 className="font-serif-heading text-xl font-bold text-[#1B211E]">
                  Core Educational Pillars
                </h3>
                <ThreeDimensionalDrugIcon size="sm" badgeText="3D Rx" />
              </div>

              <ul className="dashlist space-y-3 text-xs sm:text-sm text-[#4B5350]">
                <li>
                  <strong>Clinical reasoning before recall:</strong> Prioritizing therapeutic decision-making over memorization of drug brand names.
                </li>
                <li>
                  <strong>Grounded in local practice:</strong> Cases reflect actual formulary availability, affordability constraints, and local cultural chronotherapy.
                </li>
                <li>
                  <strong>Expert clinical review:</strong> Every simulation case is validated against Ethiopian Standard Treatment Guidelines (STG) and reviewed by practicing clinical specialists.
                </li>
                <li>
                  <strong>Actionable SOAP documentation:</strong> Teaching structured medical documentation that directly transfers to bedside ward rounds and ambulatory clinics.
                </li>
                <li>
                  <strong>Objective preceptor feedback:</strong> Providing domain-specific scores in problem identification, therapeutic reasoning, and documentation.
                </li>
                <li>
                  <strong>Non-prescriptive safety boundary:</strong> Built strictly for educational mastery and competency benchmarking—never for direct patient diagnosis or live dosing.
                </li>
              </ul>
            </div>

            {/* Quick stats mini-banner */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#757D79] block">Curriculum Alignment</span>
                <span className="text-sm font-bold text-[#12463C]">MoH Ethiopia STG &amp; EPA Standards</span>
              </div>
              <button
                onClick={() => onNavigate('evidence')}
                className="text-xs font-semibold text-[#1E6B5E] hover:underline inline-flex items-center gap-1"
              >
                <span>Read references</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & INSTITUTIONAL VISION */}
      <section className="bg-[#FAF9F5] py-14 border-y border-[#DCD8CF]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[62ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
              Our Vision
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
              Standardizing clinical competency across pharmacy faculties
            </h2>
            <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
              PharmaMind AI partners with higher education institutions and hospital pharmacy departments to modernize clinical clerkships, ensure equal case exposure, and deliver quantifiable learning outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => onNavigate('institutions')}
              className="p-6 rounded-xl bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E4EEEA] text-[#1E6B5E] flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                For Pharmacy Students
              </h3>
              <p className="text-xs text-[#4B5350] leading-relaxed">
                Step into the shoes of a ward clinical pharmacist. Work through patient histories, review vitals, interpret lab panels, choose evidence-based regimens, and receive individualized feedback.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E6B5E] pt-1">
                Explore learner benefits <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('institutions')}
              className="p-6 rounded-xl bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E4EEEA] text-[#1E6B5E] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                For Faculties &amp; Deans
              </h3>
              <p className="text-xs text-[#4B5350] leading-relaxed">
                Overcome clinical preceptor shortages. Gain cohort-wide analytics identifying specific DTP blindspots and documentation weaknesses before licensing examinations.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E6B5E] pt-1">
                View institutional model <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('contact')}
              className="p-6 rounded-xl bg-white border border-[#DCD8CF] hover:border-[#1E6B5E] transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E4EEEA] text-[#1E6B5E] flex items-center justify-center group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors">
                For Hospitals &amp; CPD
              </h3>
              <p className="text-xs text-[#4B5350] leading-relaxed">
                Support continuing professional development aligned with National Directive No. 332/2020. Provide verifiable clinical problem-solving modules for hospital staff.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E6B5E] pt-1">
                Request CPD consultation <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL AND DATA SAFETY (ON DARK) */}
      <section id="safety" className="bg-[#10201C] text-[#F4F1EA] py-14 sm:py-20">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8FB8AC] block mb-2">
              Clinical &amp; Data Safety
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-3">
              Rigorous boundaries and academic integrity
            </h2>
            <p className="text-xs sm:text-sm text-[#A9B3AE]">
              PharmaMind AI operates within explicit medical, ethical, and computational guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Educational Training Standard</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                PharmaMind AI is strictly an educational tool. It does not provide medical diagnosis, does not calculate live clinical prescriptions, and does not replace the clinical judgment of certified practitioners.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Synthetic Learning Scenarios</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                All patient profiles are synthetic educational cases constructed to reflect clinical realities. No identifiable real-world patient records or personal health information are stored or ingested.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Multidisciplinary Review</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Simulation rubrics and case scenarios are authored and audited by academic clinicians and clinical pharmacists prior to integration into student curriculum modules.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Guideline Anchoring</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Every feedback rationale cites authoritative medical references—including the Ethiopian Standard Treatment Guidelines, WHO protocols, and peer-reviewed pharmacology literature.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Institutional Privacy</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Student attempt logs, scores, and analytics are preserved solely for faculty evaluation and student learning progression. Data is never commercialized or shared with third parties.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">CPD Accreditation Pathway</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Continuing professional development modules are structured in harmony with Ministry of Health Directive No. 332/2020, seeking official credit endorsement through accredited bodies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP TIMELINE */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[58ch] mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
            Strategic Roadmap
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
            Milestones for nationwide educational impact
          </h2>
        </div>

        <div className="border-t border-[#DCD8CF] divide-y divide-[#DCD8CF]">
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#1E6B5E] uppercase tracking-wider block">
                Phase 1 · Active Deployment
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Validated Core Clinical Cases</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Core simulation cases across hypertension, type 2 diabetes with CKD, TB/HIV co-infection, hospital-acquired pneumonia, and decompensated heart failure. Free pilot placements with initial partner faculties.
            </p>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#757D79] uppercase tracking-wider block">
                Phase 2 · Scaling
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Faculty Licensing &amp; OSCE Modules</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Expanding to 40+ clinical scenarios, custom faculty rubric creation tools, timed Objective Structured Clinical Examination (OSCE) simulation modes, and formal CPD credit submission.
            </p>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#757D79] uppercase tracking-wider block">
                Phase 3 · Accessibility
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Offline-Capable &amp; Hospital CPD</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Offline-first Progressive Web App (PWA) and client caching for regional hospitals with intermittent internet connectivity, paired with departmental antimicrobial stewardship modules.
            </p>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#757D79] uppercase tracking-wider block">
                Phase 4 · Pan-African Expansion
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Regional Formulary Adaptations</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Adapting clinical case banks to East African regional formularies and curricula across Kenya, Uganda, and Rwanda, maintaining the same peer-reviewed simulation quality.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF9F5] border border-[#DCD8CF] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-heading text-2xl font-bold text-[#1B211E]">
              Ready to collaborate with PharmaMind AI?
            </h3>
            <p className="text-sm text-[#4B5350] max-w-[50ch]">
              Whether you are an academic dean planning a pilot, a clinical pharmacist reviewing cases, or a health partner, we look forward to hearing from you.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('institutions')}
              className="px-5 py-3 rounded-lg text-sm font-semibold text-[#1B211E] bg-white border border-[#DCD8CF] hover:bg-[#FAF9F5] transition-all cursor-pointer"
            >
              <span>Licensing information</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
