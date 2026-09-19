import React from 'react';
import { PageView } from '../../types';
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Users,
  Building2,
  FileCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { HeroVideoBackground } from '../HeroVideoBackground';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenSimulator }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION WITH AMBIENT VIDEO & ANIMATION BACKGROUND */}
      <section className="relative pt-8 sm:pt-14 pb-8 sm:pb-12 border-b border-[#DCD8CF]/60 overflow-hidden">
        <HeroVideoBackground className="absolute inset-0 z-0" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/20">
                <span className="w-2 h-2 rounded-full bg-[#1E6B5E] animate-ping"></span>
                <span>Clinical pharmacy education · Addis Ababa, Ethiopia</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-[3.6rem] text-[#1B211E] tracking-tight leading-[1.12]">
                Think like a <br className="hidden sm:inline" />
                <span className="text-[#1E6B5E] italic">clinical pharmacist</span>.
              </h1>

              <p className="text-base sm:text-lg text-[#4B5350] leading-relaxed max-w-[58ch]">
                PharmaMind AI is a virtual patient simulator for Ethiopian clinical pharmacy. Learners work real cases, identify every drug therapy problem, defend a therapeutic plan and write the SOAP note — then a pharmacist-written rubric grades the reasoning, not the recall.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenSimulator}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] active:translate-y-px transition-all shadow-sm cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Try Interactive Simulator</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => onNavigate('institutions')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#1B211E] bg-white border border-[#DCD8CF] hover:border-[#1B211E] hover:bg-[#FAF9F5] transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#1E6B5E]" />
                  <span>For schools of pharmacy</span>
                </button>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#757D79]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B5E]"></span>
                <span>Five validated cases live today: Hypertension · T2D in CKD · TB/HIV · Pneumonia · Heart failure</span>
              </div>
            </motion.div>

            {/* Hero Interactive Case Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="bg-white rounded-xl border border-[#DCD8CF] shadow-lg overflow-hidden transition-transform hover:shadow-xl">
                {/* Panel window header */}
                <div className="bg-[#F0EEE7] border-b border-[#E8E5DD] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DCD8CF]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DCD8CF]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DCD8CF]"></span>
                    <span className="text-[0.72rem] text-[#757D79] font-mono ml-2">
                      Case htn-01 · Uncontrolled hypertension
                    </span>
                  </div>
                  <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded bg-[#E4EEEA] text-[#1E6B5E]">
                    Simulated Active
                  </span>
                </div>

                {/* Panel Body */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  {/* Step pills */}
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#F0EEE7] text-[#757D79]">
                      1. Patient
                    </span>
                    <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#F0EEE7] text-[#757D79]">
                      2. Problems
                    </span>
                    <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#F0EEE7] text-[#757D79]">
                      3. Plan
                    </span>
                    <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#F0EEE7] text-[#757D79]">
                      4. SOAP
                    </span>
                    <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#1E6B5E] text-white font-semibold flex items-center gap-1">
                      <span>5. Feedback</span>
                    </span>
                  </div>

                  {/* Vitals & meds */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                      <span className="text-[#757D79]">Blood pressure</span>
                      <span className="font-bold text-rose-700 mono-num">168/98 mmHg (Flag)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                      <span className="text-[#757D79]">Potassium (K+)</span>
                      <span className="font-bold text-amber-700 mono-num">3.2 mmol/L (Low)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                      <span className="text-[#757D79]">Current therapy</span>
                      <span className="font-medium text-[#1B211E] text-right truncate max-w-[24ch]">
                        Enalapril · HCTZ · OTC Diclofenac
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E5DD]">
                      <span className="text-[#757D79]">Problems present</span>
                      <span className="font-bold text-[#1E6B5E] mono-num">5 distinct DTPs</span>
                    </div>
                  </div>

                  {/* Score breakdown */}
                  <div className="pt-2 border-t border-[#E8E5DD]">
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif-heading text-3xl font-bold text-[#1E6B5E] mono-num">
                          74
                        </span>
                        <span className="text-xs text-[#757D79]">/ 100</span>
                      </div>
                      <span className="text-[0.72rem] text-[#4B5350] font-medium">
                        2 identified · 1 missed · 0 distractor
                      </span>
                    </div>

                    <div className="space-y-2 text-[0.72rem] text-[#757D79]">
                      <div className="flex items-center justify-between">
                        <span>Problem finding (45%)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-[#E4E1D9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1E6B5E] w-[78%]"></div>
                          </div>
                          <span className="mono-num font-semibold text-[#1B211E]">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Reasoning (35%)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-[#E4E1D9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1E6B5E] w-[71%]"></div>
                          </div>
                          <span className="mono-num font-semibold text-[#1B211E]">71%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Documentation (20%)</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-[#E4E1D9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#1E6B5E] w-[66%]"></div>
                          </div>
                          <span className="mono-num font-semibold text-[#1B211E]">66%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preceptor Note */}
                  <div className="p-2.5 rounded bg-[#F7F6F2] border border-[#E8E5DD] text-[0.75rem] text-[#4B5350] flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B5E] shrink-0 mt-0.5" />
                    <span>
                      <strong>Preceptor analysis:</strong> Missed NSAID blunting antihypertensive effect. The preceptor rationale is shown for every miss.
                    </span>
                  </div>

                  <button
                    onClick={onOpenSimulator}
                    className="w-full py-2.5 rounded-lg text-xs font-semibold text-center text-[#1E6B5E] bg-[#E4EEEA] hover:bg-[#d8e6e1] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Run this case end-to-end</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl border border-[#DCD8CF] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E5DD]">
            {/* Stat 1 */}
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="font-serif-heading text-2xl sm:text-3xl text-[#12463C] mono-num font-bold">
                39.3–55.5%
              </div>
              <p className="text-xs text-[#757D79] leading-snug">
                Reported medication non-adherence in Ethiopian studies
              </p>
              <div className="pt-2">
                <a
                  href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0283829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] text-[#1E6B5E] hover:underline inline-flex items-center gap-1"
                >
                  <span>PLOS ONE Meta-Analysis</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="font-serif-heading text-2xl sm:text-3xl text-[#12463C] mono-num font-bold">
                18,281 → 25,295
              </div>
              <p className="text-xs text-[#757D79] leading-snug">
                Projected Ethiopian pharmacists, 2024 to 2028
              </p>
              <div className="pt-2">
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13068872/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] text-[#1E6B5E] hover:underline inline-flex items-center gap-1"
                >
                  <span>Health Workforce Study</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="font-serif-heading text-2xl sm:text-3xl text-[#12463C] mono-num font-bold">
                2.38 / 100k
              </div>
              <p className="text-xs text-[#757D79] leading-snug">
                National pharmacist density (0.66–29.88 regional range)
              </p>
              <div className="pt-2">
                <a
                  href="https://ejhd.org/index.php/ejhd/article/download/170/77/415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] text-[#1E6B5E] hover:underline inline-flex items-center gap-1"
                >
                  <span>EJHD Density Report</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-5 sm:p-6 space-y-1.5">
              <div className="font-serif-heading text-2xl sm:text-3xl text-[#12463C] mono-num font-bold">
                USD 4.0B → 7.8B
              </div>
              <p className="text-xs text-[#757D79] leading-snug">
                Africa e-learning market expansion, 2026 to 2034
              </p>
              <div className="pt-2">
                <a
                  href="https://www.imarcgroup.com/africa-e-learning-market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.75rem] text-[#1E6B5E] hover:underline inline-flex items-center gap-1"
                >
                  <span>IMARC Group Market</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="bg-[#F0EEE7] py-14 sm:py-20 border-y border-[#DCD8CF]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[62ch] mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
              The Systemic Problem
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
              Knowledge is not the gap. Reasoning is.
            </h2>
            <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
              Graduates can recite the pharmacology. What they have rarely practised is standing in front of a patient&apos;s medication list and deciding what is wrong with it.
            </p>
          </div>

          <div className="border-t border-[#DCD8CF] divide-y divide-[#DCD8CF]">
            {/* 01 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">01</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Preceptors are the bottleneck</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Pharmacist density is 2.38 per 100,000 people, ranging from 0.66 to 29.88 across regions (EJHD). Clinical supervision is thinnest exactly where students are placed for hospital rotations.
              </p>
            </div>

            {/* 02 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">02</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Case exposure is inconsistent</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Two students on the same clinical rotation graduate having reasoned through entirely different patients, with no shared standard of competence and no record of what either actually practised.
              </p>
            </div>

            {/* 03 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">03</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">Documentation is rarely taught as a skill</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Pharmacists identify drug therapy problems but seldom document them systematically. Studies of community and hospital pharmacies in Motta town describe lack of templates and time as persistent barriers to pharmaceutical care.
              </p>
            </div>

            {/* 04 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">04</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">The consequence reaches the patient</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                Drug therapy problems are documented in the majority of admitted adults in Ethiopian hospital studies (Wachemo University audit), and reported non-adherence runs from 39.3% to 55.5% (PLOS ONE).
              </p>
            </div>

            {/* 05 */}
            <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
              <span className="md:col-span-1 font-serif-heading text-[#1E6B5E] font-bold text-lg">05</span>
              <h4 className="md:col-span-4 text-base font-bold text-[#1B211E]">CPD is now tied to re-licensure</h4>
              <p className="md:col-span-7 text-sm text-[#4B5350] leading-relaxed">
                National Directive No. 332/2020 links continuing professional development to re-licensing for health professionals, yet localised, verifiable pharmacy CPD content remains scarce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (ON DARK) */}
      <section className="bg-[#10201C] text-[#F4F1EA] py-14 sm:py-20">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-[58ch] mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8FB8AC] block mb-2">
              The 5-Step Process
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#F4F1EA] mb-3">
              A digital preceptor that grades reasoning, not recall
            </h2>
            <p className="text-[#A9B3AE] text-sm sm:text-base leading-relaxed">
              Every case follows the same sequence, because that is the exact sequence a competent pharmacist repeats for the rest of their clinical career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-[#173029] border border-[#2A453E] rounded-xl p-5 space-y-2.5">
              <span className="font-serif-heading text-[#8FB8AC] text-lg font-bold block">01</span>
              <h3 className="text-base font-bold text-white">Receive the patient</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                History, current medications with real dosing, vitals and laboratory values with reference ranges — presented the way a hospital ward or dispensary counter actually presents them.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#173029] border border-[#2A453E] rounded-xl p-5 space-y-2.5">
              <span className="font-serif-heading text-[#8FB8AC] text-lg font-bold block">02</span>
              <h3 className="text-base font-bold text-white">Identify the problems</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Select every drug therapy problem present. Plausible distractors are included, and unsupported selections cost marks. Being comprehensive is not the same as being indiscriminate.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#173029] border border-[#2A453E] rounded-xl p-5 space-y-2.5">
              <span className="font-serif-heading text-[#8FB8AC] text-lg font-bold block">03</span>
              <h3 className="text-base font-bold text-white">Commit to a plan</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Write the pharmaceutical care plan in your own words: what to switch, what to stop, what to monitor, what to counsel, and when to follow up.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#173029] border border-[#2A453E] rounded-xl p-5 space-y-2.5">
              <span className="font-serif-heading text-[#8FB8AC] text-lg font-bold block">04</span>
              <h3 className="text-base font-bold text-white">Document it</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Produce the SOAP note. Each problem and its cause belongs in the assessment, not buried inside the plan — and the rubric checks for exactly that.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#173029] border border-[#2A453E] rounded-xl p-5 space-y-2.5">
              <span className="font-serif-heading text-[#8FB8AC] text-lg font-bold block">05</span>
              <h3 className="text-base font-bold text-white">Receive the feedback</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                Three domain scores, then the preceptor&apos;s rationale for every problem found, missed or wrongly selected, with the Ethiopian or international guideline reference attached.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#173029] border border-[#2A453E] rounded-xl p-5 space-y-2.5">
              <span className="font-serif-heading text-[#8FB8AC] text-lg font-bold block">06</span>
              <h3 className="text-base font-bold text-white">Repeat, and be measured</h3>
              <p className="text-xs text-[#A9B3AE] leading-relaxed">
                The instructor sees the cohort&apos;s pattern: which problem categories are missed, which documentation habits are weak, and what to teach next week in class.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION SECTION */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[58ch] mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block mb-2">
            Differentiation
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E] mb-3">
            Not another generic drug-information app
          </h2>
          <p className="text-[#4B5350] text-sm sm:text-base leading-relaxed">
            Existing resources give answers without challenging the pharmacist to defend decisions. PharmaMind AI forces therapeutic justification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What already exists */}
          <div className="p-6 rounded-xl bg-[#F0EEE7] border border-[#DCD8CF] space-y-4">
            <h4 className="text-base font-bold text-[#757D79]">What already exists</h4>
            <ul className="dashlist space-y-2.5">
              <li>General AI chatbots that answer instantly, but never ask the learner to justify anything</li>
              <li>International drug databases priced for Western institutions</li>
              <li>Generic learning platforms with no clinical rubric behind them</li>
              <li>Question banks that test recall rather than clinical decision-making</li>
              <li>Content written around formularies Ethiopian pharmacies do not stock</li>
            </ul>
          </div>

          {/* What PharmaMind AI adds */}
          <div className="p-6 rounded-xl bg-white border border-[#1E6B5E]/40 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-[#1E6B5E]">What PharmaMind AI adds</h4>
            <ul className="dashlist space-y-2.5">
              <li>A validated Ethiopian case bank: TB/HIV, diabetes, hypertension, pneumonia, heart failure</li>
              <li>Pharmacist-authored rubrics scoring problem finding, reasoning and documentation separately</li>
              <li>Monographs framed around what is actually on the shelf, including substitution logic and cost</li>
              <li>Cohort analytics that tell an educator what to teach next week</li>
              <li>Documentation habits — SOAP, care plans, intervention records — that transfer into practice</li>
            </ul>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-12 p-6 rounded-xl border-l-4 border-[#1E6B5E] bg-[#FAF9F5] max-w-[64ch]">
          <p className="font-serif-heading text-lg sm:text-xl text-[#1B211E] leading-snug italic">
            &ldquo;Twenty excellent cases beat two hundred generic ones. The moat is not the model — it is the validated Ethiopian case bank behind it.&rdquo;
          </p>
          <cite className="block mt-2 text-xs font-semibold text-[#757D79] not-italic">
            — Design principle behind the pilot clinical content set, Addis Ababa
          </cite>
        </div>
      </section>

      {/* PILOT PROGRAMME CTA BAND */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-[#10201C] rounded-2xl p-8 sm:p-12 text-[#F4F1EA] shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-[60ch] space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8FB8AC]">
              Pilot Programme · Free for Qualified Faculties
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white">
              One cohort. Six weeks. Measured before and after.
            </h2>
            <p className="text-sm sm:text-base text-[#A9B3AE] leading-relaxed">
              We are placing PharmaMind AI with a select group of pharmacy schools at no financial cost, in exchange for pre and post competency data on the same rubric.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#12463C] bg-white hover:bg-[#EAF1EE] transition-all cursor-pointer"
              >
                <span>Request a pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('institutions')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#F4F1EA] bg-transparent border border-[#2A453E] hover:border-[#8FB8AC] transition-all cursor-pointer"
              >
                <span>See what institutions receive</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
