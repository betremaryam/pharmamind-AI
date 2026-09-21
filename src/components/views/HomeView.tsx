import React, { useState } from 'react';
import { PageView } from '../../types';
import { AppImages } from '../../assets/images';
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
  Activity,
  Award,
  GraduationCap,
  Calculator,
  HeartPulse,
  AlertTriangle,
  Stethoscope,
  Clock,
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroVideoBackground } from '../HeroVideoBackground';
import { ThreeDimensionalDrugIcon } from '../ThreeDimensionalDrugIcon';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
  onOpenClinicalTools?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenSimulator, onOpenClinicalTools }) => {
  // Interactive clinical environment selector
  const [activeDomain, setActiveDomain] = useState<'ward' | 'emergency' | 'counseling'>('ward');

  // Interactive Bedside Micro-Sim Challenge state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const clinicalDomains = {
    ward: {
      id: 'ward',
      title: 'Inpatient Ward Rounds & Multidisciplinary Care',
      subtitle: 'Bedside Pharmacotherapy & TDM Monitoring',
      image: AppImages.wardRound,
      alt: 'Clinical pharmacist conducting hospital ward rounds with patient chart',
      badge: 'Hospital Inpatient Practice',
      description:
        'Participate in interprofessional ward rounds alongside attending physicians and nurses. Identify drug therapy problems, optimize antimicrobial de-escalation, calculate renal clearances, and monitor therapeutic drug levels (TDM) at the patient bedside.',
      keySkills: [
        'Antimicrobial stewardship & AWaRe protocol de-escalation',
        'Serum Creatinine & Cockcroft-Gault dosing titration',
        'Aminoglycoside peak/trough therapeutic monitoring',
        'Daily SOAP documentation for medical records'
      ],
      courseCode: 'PM-CPD-01',
      actionText: 'Explore Antimicrobial Stewardship Course',
      simulatorCase: 'Pneumonia & Sepsis Inpatient Case'
    },
    emergency: {
      id: 'emergency',
      title: 'Emergency Resuscitation & Acute First Aid',
      subtitle: 'Time-Critical Emergency Pharmacotherapy',
      image: AppImages.emergencyFirstAid,
      alt: 'Emergency first aid and acute clinical resuscitation in clinical setting',
      badge: 'Emergency Clinical Response',
      description:
        'Master rapid-triage clinical decision making during acute emergencies. Administer weight-based intramuscular adrenaline for anaphylaxis, navigate status asthmaticus spacer dosing, and treat severe hypoglycemic events under pressure.',
      keySkills: [
        'Anaphylaxis IM Epinephrine 1:1,000 weight-tiered dosing',
        'Severe asthma spacer vs nebulization rescue protocols',
        'Hypoglycemia Rule of 15 and IV dextrose resuscitation',
        'Acute opioid overdose Naloxone titration'
      ],
      courseCode: 'PM-CPD-06',
      actionText: 'Explore First Aid & Emergency Course',
      simulatorCase: 'Acute Anaphylactic Shock Vignette'
    },
    counseling: {
      id: 'counseling',
      title: 'Ambulatory Care & Patient Counseling',
      subtitle: 'Medication Therapy Management (MTM) & Adherence',
      image: AppImages.pharmacistCounseling,
      alt: 'Pharmacist conducting empathetic patient consultation and medicine review',
      badge: 'Ambulatory & Community Care',
      description:
        'Deliver patient-centered consultations that bridge pharmacology and patient realities. Guide patients through chronic disease polypharmacy, validate inhaler technique, and adjust medication timing around Ethiopian fasting traditions.',
      keySkills: [
        'Medication Therapy Management (MTM) comprehensive review',
        'Orthodox Lent (Tsome) & Ramadan chronotherapy adjustments',
        'Teach-back method for metered-dose inhaler technique',
        'Identification of OTC NSAID nephrotoxicity in hypertension'
      ],
      courseCode: 'PM-CPD-07',
      actionText: 'Explore Ambulatory & Clinical Practice Course',
      simulatorCase: 'Uncontrolled Diabetes & Fasting Case'
    }
  };

  const activeContent = clinicalDomains[activeDomain];

  // Quick Clinical Challenge Questions
  const challengeQuestion = {
    patient: '64-year-old female admitted with Diabetic Foot Ulcer. Labs: Serum Creatinine 2.5 mg/dL (eGFR 24 mL/min).',
    regimen: 'Metformin 1000mg BID + Enalapril 20mg QD + Ketorolac 30mg IV Q8H + Gentamicin 240mg IV QD.',
    question: 'As the clinical pharmacist reviewing this chart, which intervention is highest priority?',
    options: [
      {
        id: 0,
        text: 'Immediately stop Metformin (eGFR <30 mL/min lactic acidosis risk) and Ketorolac (acute renal failure with Enalapril + Gentamicin).',
        correct: true,
        rationale: 'Ethiopian National STG and KDIGO strictly mandate stopping Metformin when eGFR falls below 30 mL/min due to potentially fatal lactic acidosis. Furthermore, NSAIDs (Ketorolac) combined with ACE inhibitors and Aminoglycosides form a lethal "Triple Whammy" accelerating Acute Kidney Injury.'
      },
      {
        id: 1,
        text: 'Increase Gentamicin dose to 320mg to achieve rapid bactericidal tissue concentration in the foot ulcer.',
        correct: false,
        rationale: 'Incorrect: Aminoglycosides accumulate in renal impairment (eGFR 24 mL/min), which would cause irreversible nephrotoxicity and ototoxicity. Dosing must be decreased and guided by TDM.'
      },
      {
        id: 2,
        text: 'Add Aspirin 100mg for antiplatelet cardiovascular protection.',
        correct: false,
        rationale: 'Incorrect: Adding Aspirin does not address the critical acute toxicities of Metformin lactic acidosis and NSAID-induced acute renal failure on an already damaged kidney.'
      }
    ]
  };

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
                PharmaMind AI is a virtual patient simulator and accredited clinical academy for Ethiopian pharmacy. Practice bedside cases, identify drug therapy problems, defend therapeutic plans, and earn authenticated Certificates of Completion bearing your name.
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
                  onClick={() => onNavigate('courses')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#12463C] bg-[#E4EEEA] border border-[#1E6B5E]/30 hover:bg-[#D4E5DF] transition-all cursor-pointer shadow-2xs"
                >
                  <Award className="w-4 h-4 text-[#1E6B5E]" />
                  <span>Courses &amp; Certificates</span>
                </button>

                <button
                  onClick={() => onNavigate('institutions')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#1B211E] bg-white border border-[#DCD8CF] hover:border-[#1B211E] hover:bg-[#FAF9F5] transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#1E6B5E]" />
                  <span>For Schools of Pharmacy</span>
                </button>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#757D79]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B5E]"></span>
                <span>7 Accredited Clinical Courses · 5 Validated Inpatient Cases · Ethiopian STG Aligned</span>
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
                    </div>
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

      {/* NEW: INTERACTIVE CLINICAL DOMAINS GALLERY WITH PROFESSIONAL PHOTOGRAPHY */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/20 mb-2">
                <Activity className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Interactive Practice Domains</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1B211E]">
                Explore Clinical Pharmacy in Action
              </h2>
              <p className="text-sm text-[#4B5350] mt-1 max-w-[62ch]">
                Click each clinical setting to see real-world scenarios, required competencies, and the accredited training modules available for healthcare professionals.
              </p>
            </div>

            {/* Domain Switcher Buttons */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#F0EEE7] border border-[#DCD8CF] self-start md:self-auto overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setActiveDomain('ward')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeDomain === 'ward'
                    ? 'bg-white text-[#10201C] shadow-xs'
                    : 'text-[#4B5350] hover:text-[#10201C]'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-[#1E6B5E]" />
                <span>Hospital Ward Rounds</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDomain('emergency')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeDomain === 'emergency'
                    ? 'bg-white text-[#10201C] shadow-xs'
                    : 'text-[#4B5350] hover:text-[#10201C]'
                }`}
              >
                <HeartPulse className="w-4 h-4 text-[#1E6B5E]" />
                <span>Emergency &amp; First Aid</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDomain('counseling')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeDomain === 'counseling'
                    ? 'bg-white text-[#10201C] shadow-xs'
                    : 'text-[#4B5350] hover:text-[#10201C]'
                }`}
              >
                <Users className="w-4 h-4 text-[#1E6B5E]" />
                <span>Ambulatory &amp; MTM</span>
              </button>
            </div>
          </div>

          {/* Active Domain Interactive Card */}
          <motion.div
            key={activeDomain}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl border border-[#DCD8CF] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left: Professional Photography Showcase */}
            <div className="lg:col-span-6 relative group overflow-hidden bg-[#10201C]">
              <img
                src={activeContent.image}
                alt={activeContent.alt}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
              />
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1 z-10">
                <span className="inline-block px-2.5 py-1 rounded-full text-[0.7rem] font-bold bg-[#1E6B5E] text-white shadow-xs">
                  {activeContent.badge}
                </span>
                <p className="text-sm font-semibold text-white/95 leading-snug">
                  {activeContent.title}
                </p>
                <p className="text-xs text-white/70">
                  Ethiopian Teaching Hospitals &amp; Community Practice Standard
                </p>
              </div>
            </div>

            {/* Right: Clinical Details & Interactive Capabilities */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#1E6B5E] tracking-wider uppercase">
                    {activeContent.courseCode} · Accredited Focus Area
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#1B211E]">
                    {activeContent.title}
                  </h3>
                  <p className="text-xs font-medium text-[#757D79]">
                    {activeContent.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#4B5350] leading-relaxed">
                  {activeContent.description}
                </p>

                {/* Core Clinical Competencies Checklist */}
                <div className="space-y-2 pt-2 border-t border-[#E8E5DD]">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#1B211E] block">
                    Core Pharmacotherapy Competencies:
                  </span>
                  <ul className="space-y-2 text-xs text-[#3A423F]">
                    {activeContent.keySkills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1E6B5E] shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8E5DD] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-all cursor-pointer shadow-xs"
                >
                  <Award className="w-4 h-4 text-emerald-300" />
                  <span>{activeContent.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onOpenSimulator}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#1B211E] hover:text-[#1E6B5E] hover:bg-[#FAF9F5] border border-[#DCD8CF] transition-colors cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#1E6B5E]" />
                  <span>Test in Virtual Patient Sim</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW: INTERACTIVE RAPID BEDSIDE CLINICAL CHALLENGE WIDGET */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF9F5] rounded-2xl border-2 border-[#DCD8CF] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E5DD] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1E6B5E] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1B211E]">
                  Bedside Decision Mini-Challenge
                </h3>
                <p className="text-xs text-[#757D79]">
                  Test your clinical decision-making on an actual Ethiopian bedside scenario.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1E6B5E] bg-[#E4EEEA] px-2.5 py-1 rounded-md">
                Interactive Preceptor Quiz
              </span>
              {showExplanation && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOption(null);
                    setShowExplanation(false);
                  }}
                  className="text-xs text-[#757D79] hover:text-[#10201C] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Clinical Vignette Box */}
          <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E6B5E] uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>Ward Case Presentation</span>
            </div>
            <p className="font-semibold text-[#1B211E]">
              {challengeQuestion.patient}
            </p>
            <div className="p-2.5 rounded bg-[#FAF9F5] font-mono text-xs text-[#4B5350] border border-[#E8E5DD]">
              Current Regimen: <strong>{challengeQuestion.regimen}</strong>
            </div>
            <p className="text-[#1B211E] font-medium pt-1">
              {challengeQuestion.question}
            </p>
          </div>

          {/* Interactive Options */}
          <div className="space-y-3">
            {challengeQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(idx);
                    setShowExplanation(true);
                  }}
                  className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                    isSelected
                      ? option.correct
                        ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-400'
                        : 'bg-red-50 border-red-400 ring-1 ring-red-300'
                      : 'bg-white border-[#DCD8CF] hover:border-[#1E6B5E] hover:bg-[#FAF9F5]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? option.correct
                            ? 'bg-emerald-700 text-white'
                            : 'bg-red-600 text-white'
                          : 'bg-[#F0EEE7] text-[#4B5350]'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="space-y-1">
                      <p className="font-medium text-[#1B211E] leading-relaxed">
                        {option.text}
                      </p>
                      {isSelected && (
                        <div className="pt-2 text-xs">
                          <span
                            className={`font-bold inline-block mr-1.5 ${
                              option.correct ? 'text-emerald-800' : 'text-red-700'
                            }`}
                          >
                            {option.correct ? '✓ Correct Clinical Decision!' : '✗ Clinical Guideline Warning:'}
                          </span>
                          <span className="text-[#4B5350] leading-relaxed">
                            {option.rationale}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {showExplanation && (
            <div className="p-4 rounded-xl bg-[#E4EEEA] border border-[#BBD7CF] text-xs text-[#12463C] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
                <span>
                  Our 7 clinical courses feature <strong>10 in-depth scenario questions each</strong> with personalized certified completion!
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="font-bold text-[#1E6B5E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Take Full Course Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
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

      {/* BEDSIDE CLINICAL TOOLS & CALCULATOR SHOWCASE */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#DCD8CF] p-6 sm:p-8 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/20">
                <Calculator className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Bedside Clinical Pharmacy Suite</span>
              </div>

              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1B211E]">
                Clinical calculators, normal reference ranges &amp; cultural chronotherapy
              </h2>

              <p className="text-sm text-[#4B5350] leading-relaxed">
                Seamlessly integrated with patient case workups or accessible standalone. Instant reference ranges, professional medical interpretations, and dosage adjustments grounded in the Ethiopian National Formulary.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div
                  onClick={onOpenClinicalTools}
                  className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1E6B5E] transition-all cursor-pointer group"
                >
                  <span className="text-[0.7rem] text-[#757D79] block">Cockcroft-Gault</span>
                  <span className="text-xs font-bold text-[#1B211E] group-hover:text-[#1E6B5E]">CrCl (Renal Dose)</span>
                  <span className="text-[0.68rem] text-emerald-700 font-medium block mt-0.5">Ref: 90–120 mL/min</span>
                </div>

                <div
                  onClick={onOpenClinicalTools}
                  className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1E6B5E] transition-all cursor-pointer group"
                >
                  <span className="text-[0.7rem] text-[#757D79] block">BMI &amp; Weights</span>
                  <span className="text-xs font-bold text-[#1B211E] group-hover:text-[#1E6B5E]">IBW &amp; AdjBW</span>
                  <span className="text-[0.68rem] text-emerald-700 font-medium block mt-0.5">Ref: 18.5–24.9 kg/m²</span>
                </div>

                <div
                  onClick={onOpenClinicalTools}
                  className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1E6B5E] transition-all cursor-pointer group"
                >
                  <span className="text-[0.7rem] text-[#757D79] block">Blood Pressure</span>
                  <span className="text-xs font-bold text-[#1B211E] group-hover:text-[#1E6B5E]">HTN Staging (AHA/ACC)</span>
                  <span className="text-[0.68rem] text-emerald-700 font-medium block mt-0.5">Ref: &lt;120/80 mmHg</span>
                </div>

                <div
                  onClick={onOpenClinicalTools}
                  className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1E6B5E] transition-all cursor-pointer group"
                >
                  <span className="text-[0.7rem] text-[#757D79] block">Glycemic Panel</span>
                  <span className="text-xs font-bold text-[#1B211E] group-hover:text-[#1E6B5E]">FBS &amp; HbA1c</span>
                  <span className="text-[0.68rem] text-emerald-700 font-medium block mt-0.5">Ref: 70–99 mg/dL</span>
                </div>

                <div
                  onClick={onOpenClinicalTools}
                  className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1E6B5E] transition-all cursor-pointer group"
                >
                  <span className="text-[0.7rem] text-[#757D79] block">Electrolytes</span>
                  <span className="text-xs font-bold text-[#1B211E] group-hover:text-[#1E6B5E]">Anion Gap &amp; Ca Corr</span>
                  <span className="text-[0.68rem] text-emerald-700 font-medium block mt-0.5">Ref: 8–12 mEq/L</span>
                </div>

                <div
                  onClick={onOpenClinicalTools}
                  className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1E6B5E] transition-all cursor-pointer group"
                >
                  <span className="text-[0.7rem] text-[#757D79] block">Ethiopian Reality</span>
                  <span className="text-xs font-bold text-[#1B211E] group-hover:text-[#1E6B5E]">Fasting Chronotherapy</span>
                  <span className="text-[0.68rem] text-[#1E6B5E] font-medium block mt-0.5">Orthodox &amp; Ramadan</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={onOpenClinicalTools}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-all cursor-pointer shadow-xs"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Open Interactive Clinical Tools</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenSimulator}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#1B211E] hover:text-[#1E6B5E] hover:underline cursor-pointer"
                >
                  <span>Test in virtual patient case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3D Drug Icon Interactive Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-center space-y-3">
              <ThreeDimensionalDrugIcon size="lg" onClick={onOpenClinicalTools} badgeText="Interactive 3D Rx" />
              <div className="space-y-1">
                <h4 className="font-serif-heading font-bold text-base text-[#1B211E]">
                  3D Pharmacotherapy Visualizer
                </h4>
                <p className="text-xs text-[#757D79] max-w-[32ch]">
                  Click and hover over the capsule to inspect bedside calculations, normal reference intervals, and formulary safety checks.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenClinicalTools}
                className="text-xs font-semibold text-[#1E6B5E] hover:underline pt-1 cursor-pointer"
              >
                Launch Bedside Tools &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ACCREDITED COURSES & CERTIFICATES SHOWCASE WITH RICH PHOTOGRAPHY */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#DCD8CF] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E5DD] pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/20 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Accredited CPD Learning Tracks · Directive No. 332/2020</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1B211E]">
                Featured Clinical Courses &amp; Certified Preceptorship
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5350] mt-1 max-w-[64ch]">
                Enroll with your contact and education credentials, complete interactive pharmacotherapy modules, pass the 10-question clinical evaluation (75%+), and earn verified printable certificates.
              </p>
            </div>

            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Explore All 7 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Photographic Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Course Card 1: First Aid */}
            <div
              onClick={() => onNavigate('courses')}
              className="group rounded-xl border border-[#DCD8CF] hover:border-[#1E6B5E] bg-[#FAF9F5] hover:bg-white overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-[#10201C]">
                <img
                  src={AppImages.emergencyFirstAid}
                  alt="Emergency First Aid and Acute Resuscitation Course"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1E6B5E] text-white text-[0.68rem] font-bold px-2 py-0.5 rounded shadow-xs">
                  NEW COURSE
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-900 text-[0.68rem] font-bold px-2 py-0.5 rounded border border-[#DCD8CF]">
                  3.5 CPD Hrs
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#1E6B5E]">PM-CPD-06</span>
                  <h4 className="font-serif-heading text-base font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors leading-snug">
                    Emergency First Aid &amp; Acute Clinical Response
                  </h4>
                  <p className="text-xs text-[#5B6360] line-clamp-2">
                    EpiPen adrenaline dosing, status asthmaticus spacer titration, hypoglycemia Rule of 15, and 10 scenario questions.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#757D79]">
                  <span>10 Evaluation Qs</span>
                  <span className="font-semibold text-[#1E6B5E] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Course Card 2: Antimicrobial Stewardship */}
            <div
              onClick={() => onNavigate('courses')}
              className="group rounded-xl border border-[#DCD8CF] hover:border-[#1E6B5E] bg-[#FAF9F5] hover:bg-white overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-[#10201C]">
                <img
                  src={AppImages.wardRound}
                  alt="Antimicrobial Stewardship Ward Rounds Course"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#10201C] text-white text-[0.68rem] font-bold px-2 py-0.5 rounded shadow-xs">
                  INPATIENT CARE
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-900 text-[0.68rem] font-bold px-2 py-0.5 rounded border border-[#DCD8CF]">
                  4.0 CPD Hrs
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#1E6B5E]">PM-CPD-01</span>
                  <h4 className="font-serif-heading text-base font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors leading-snug">
                    Antimicrobial Stewardship &amp; Hospital Infections
                  </h4>
                  <p className="text-xs text-[#5B6360] line-clamp-2">
                    WHO AWaRe classification, surgical prophylaxis timing, and TDM safety for Aminoglycosides.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#757D79]">
                  <span>10 Evaluation Qs</span>
                  <span className="font-semibold text-[#1E6B5E] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Course Card 3: Ambulatory & MTM */}
            <div
              onClick={() => onNavigate('courses')}
              className="group rounded-xl border border-[#DCD8CF] hover:border-[#1E6B5E] bg-[#FAF9F5] hover:bg-white overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-[#10201C]">
                <img
                  src={AppImages.pharmacistCounseling}
                  alt="Ambulatory Care and Patient Consultation Course"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1E6B5E] text-white text-[0.68rem] font-bold px-2 py-0.5 rounded shadow-xs">
                  NEW COURSE
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-900 text-[0.68rem] font-bold px-2 py-0.5 rounded border border-[#DCD8CF]">
                  4.0 CPD Hrs
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#1E6B5E]">PM-CPD-07</span>
                  <h4 className="font-serif-heading text-base font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors leading-snug">
                    Ambulatory Clinical Practice &amp; MTM Counseling
                  </h4>
                  <p className="text-xs text-[#5B6360] line-clamp-2">
                    Comprehensive medication review, inhaler technique validation, and fasting chronotherapy.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#757D79]">
                  <span>10 Evaluation Qs</span>
                  <span className="font-semibold text-[#1E6B5E] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
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
                Pharmacists identify drug therapy problems but seldom document them systematically. Studies of community and hospital pharmacies describe lack of templates and time as persistent barriers to pharmaceutical care.
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
