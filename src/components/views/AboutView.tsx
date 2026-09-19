import React from 'react';
import { PageView } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Title Header & Founder Story */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block">
              About PharmaMind AI
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E] leading-[1.14]">
              Built by a clinical pharmacist, not a software vendor
            </h1>
            <p className="text-base sm:text-lg text-[#1B211E] font-medium leading-relaxed">
              PharmaMind AI was started by Betremaryam, a graduated clinical pharmacist in Addis Ababa, after watching capable students reach graduation without ever having been made to defend a therapeutic decision out loud.
            </p>
            <p className="text-sm sm:text-base text-[#4B5350] leading-relaxed">
              The insight is not technological. It is that pharmaceutical care is a practised clinical skill with a fixed sequence — find the problem, decide, document, follow up — and that sequence can be rehearsed hundreds of times before a real patient is ever involved. What the education sector lacks is not information. It is clinical repetitions, and someone qualified to mark them.
            </p>
            <p className="text-sm sm:text-base text-[#4B5350] leading-relaxed">
              So the clinical content comes first and the software serves it. Every case is written against documented Ethiopian practice patterns, reviewed by named clinical pharmacists, and scored by a rubric a preceptor would recognise. The AI grades and questions. It does not practise pharmacy.
            </p>
          </div>

          {/* Principles Card */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#DCD8CF] p-6 shadow-xs space-y-4">
            <h3 className="font-serif-heading text-xl font-bold text-[#1B211E] pb-2 border-b border-[#E8E5DD]">
              Core Principles
            </h3>
            <ul className="dashlist space-y-3 text-xs sm:text-sm text-[#4B5350]">
              <li>
                <strong>Clinical content before features:</strong> Twenty excellent cases beat two hundred generic ones.
              </li>
              <li>
                <strong>The institution pays:</strong> Students should not be the revenue base in a price-sensitive market.
              </li>
              <li>
                <strong>Named reviewers:</strong> Every case carries a pharmacist&apos;s name, so it can be defended in front of a faculty committee.
              </li>
              <li>
                <strong>No clinical advice:</strong> A teaching platform, never a live dosing or diagnostic tool.
              </li>
              <li>
                <strong>Measured, not claimed:</strong> Pre and post competency data decides whether this works.
              </li>
              <li>
                <strong>Local reality:</strong> Availability, cost and fasting practices are part of the clinical problem, not footnotes.
              </li>
            </ul>
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
              The boundaries, stated before anyone asks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Teaching, not treating</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                PharmaMind AI is an educational platform. It does not diagnose, does not dose live prescriptions, and does not instruct any live patient to start or stop a medicine.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Simulated patients only</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Every case is a constructed teaching scenario. No identifiable patient records are held, so a learner cannot enter real patient data into the simulator.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Human review of content</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                AI may draft practice material, but clinical content is reviewed and signed by a named clinical pharmacist before any learner sees it.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Guideline anchoring</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Rubric rationales cite the national guideline or study behind them, so a learner can verify the marking rather than trust it blindly.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">Learner data protection</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Attempt records exist solely to show progress to the learner and their instructor. They are not a commercial asset and are never sold.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#173029] border border-[#2A453E] space-y-2">
              <h3 className="text-base font-bold text-white">CPD claims</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                No CPD credit is advertised until the accreditation pathway is confirmed with the regulator and the professional association (Directive 332/2020).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP TIMELINE */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[58ch] mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
            Roadmap
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
            Prove it on one cohort before building the ecosystem
          </h2>
        </div>

        <div className="border-t border-[#DCD8CF] divide-y divide-[#DCD8CF]">
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#1E6B5E] uppercase tracking-wider block">
                Months 0–6 · Active Now
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Phase 1 — Validated core</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Twenty validated cases across five major conditions. Rubric grading, instructor dashboard, one free pilot cohort with pre and post competency measurement.
            </p>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#757D79] uppercase tracking-wider block">
                Months 6–12
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Phase 2 — First licences</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Paid institutional licences, documentation and exam modules, expanded case bank, and the CPD accreditation pathway pursued formally.
            </p>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#757D79] uppercase tracking-wider block">
                Year 2
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Phase 3 — Practising pharmacists</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Hospital CPD licences, certification tracks, Amharic interface and an offline-capable client for low-bandwidth rural clinical settings.
            </p>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-4">
              <span className="text-xs font-bold text-[#757D79] uppercase tracking-wider block">
                Year 3 and beyond
              </span>
              <h4 className="text-base font-bold text-[#1B211E] mt-0.5">Phase 4 — Regional East Africa</h4>
            </div>
            <p className="md:col-span-8 text-sm text-[#4B5350] leading-relaxed">
              Expansion to comparable East African curricula, and an optional bridge into patient-facing counselling tools built on the same reviewed clinical content.
            </p>
          </div>
        </div>
      </section>

      {/* HONEST RISKS ASSESSMENT */}
      <section className="bg-[#F0EEE7] py-14 sm:py-20 border-y border-[#DCD8CF]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
              Honest Assessment
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
              Risks we are not hiding
            </h2>
            <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
              Transparent appraisal of operational challenges and our concrete mitigation strategies.
            </p>
          </div>

          <div className="border-t border-[#DCD8CF] divide-y divide-[#DCD8CF]">
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold">—</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Students will not pay</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Likely true. The product is designed for the institutional sale from day one; individual plans are an adoption channel, not the core business model.
              </p>
            </div>

            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold">—</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Clinical credibility</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                A single wrong case would be disproportionately damaging. Named clinical pharmacist review and visible guideline citations are the non-negotiable mitigation.
              </p>
            </div>

            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold">—</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">CPD without recognition</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Certificates nobody accepts are worthless. Accreditation with the Ethiopian Ministry of Health and EPA is pursued before CPD credit is marketed.
              </p>
            </div>

            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold">—</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Bandwidth and device limits</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                A heavy interface excludes the learners who need this most. Hence ultra-light payloads now and an offline-first client in Phase 3.
              </p>
            </div>

            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold">—</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Free AI tools as substitutes</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                A general chatbot can discuss metformin. It cannot mark a student cohort against a validated Ethiopian rubric. That is the defensible part.
              </p>
            </div>

            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold">—</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Founder capacity</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Scope is deliberately narrowed to the simulator and documentation modules. The other four supporting modules are sequenced, not promised all at once.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
