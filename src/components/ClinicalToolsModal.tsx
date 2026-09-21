import React, { useState } from 'react';
import {
  Calculator,
  AlertTriangle,
  BookOpen,
  Search,
  CheckCircle2,
  X,
  ArrowRight,
  Info,
  Calendar,
  Layers,
  Scale,
  Heart,
  Activity,
  Droplets,
  FlaskConical,
  FileText,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  calculateBmiAndWeights,
  evaluateBloodPressure,
  evaluateGlycemia,
  calculateAnionGap,
  calculateCorrectedCalcium
} from '../data/clinicalCalculations';
import { CLINICAL_TERMS_GLOSSARY, ClinicalTermItem } from '../data/clinicalTerms';
import { ThreeDimensionalDrugIcon } from './ThreeDimensionalDrugIcon';

interface ClinicalToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPatientData?: {
    age?: number;
    weight?: number;
    height?: number;
    gender?: 'Male' | 'Female';
    scr?: number; // in mg/dL
    systolic?: number;
    diastolic?: number;
    heartRate?: number;
    bloodSugar?: number;
  };
}

type ToolTab =
  | 'renal'
  | 'bmi'
  | 'bp'
  | 'glycemia'
  | 'electrolytes'
  | 'terms'
  | 'interactions'
  | 'fasting';

export const ClinicalToolsModal: React.FC<ClinicalToolsModalProps> = ({
  isOpen,
  onClose,
  initialPatientData
}) => {
  const [activeTab, setActiveTab] = useState<ToolTab>('renal');

  // 1. Renal & Patient Demographic States
  const [age, setAge] = useState<number>(initialPatientData?.age || 58);
  const [weight, setWeight] = useState<number>(initialPatientData?.weight || 72);
  const [height, setHeight] = useState<number>(initialPatientData?.height || 170); // cm
  const [gender, setGender] = useState<'Male' | 'Female'>(initialPatientData?.gender || 'Male');
  const [scr, setScr] = useState<number>(initialPatientData?.scr || 1.1);

  // 2. Blood Pressure States
  const [systolic, setSystolic] = useState<number>(initialPatientData?.systolic || 145);
  const [diastolic, setDiastolic] = useState<number>(initialPatientData?.diastolic || 92);
  const [pulseBpm, setPulseBpm] = useState<number>(initialPatientData?.heartRate || 78);
  const [hasDiabetesOrCkd, setHasDiabetesOrCkd] = useState<boolean>(true);
  const [isAfricanAncestry, setIsAfricanAncestry] = useState<boolean>(true);

  // 3. Glycemic States
  const [glucoseVal, setGlucoseVal] = useState<number>(initialPatientData?.bloodSugar || 164);
  const [glucoseUnit, setGlucoseUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');
  const [glucoseTestType, setGlucoseTestType] = useState<'Fasting' | 'Random' | 'HbA1c'>('Fasting');

  // 4. Electrolytes & Acid-Base States
  const [serumNa, setSerumNa] = useState<number>(138);
  const [serumCl, setSerumCl] = useState<number>(101);
  const [serumHco3, setSerumHco3] = useState<number>(24);
  const [serumCa, setSerumCa] = useState<number>(8.6);
  const [serumAlbumin, setSerumAlbumin] = useState<number>(3.6);

  // 5. Glossary & Search States
  const [termSearchQuery, setTermSearchQuery] = useState('');
  const [termCategoryFilter, setTermCategoryFilter] = useState<string>('All');

  // 6. Interaction Checker Search
  const [interactionSearchQuery, setInteractionSearchQuery] = useState('');

  if (!isOpen) return null;

  // Cockcroft-Gault Calculations:
  const validAge = Math.max(18, Math.min(110, Number(age) || 50));
  const validWeight = Math.max(30, Math.min(220, Number(weight) || 60));
  const validScr = Math.max(0.2, Math.min(15, Number(scr) || 1.0));

  // Anthropometrics calculation
  const bmiResult = calculateBmiAndWeights(height, validWeight, gender);
  const ibw = bmiResult.ibw;
  const isObese = bmiResult.isObese;
  const adjWeight = bmiResult.adjBw;

  const rawCrCl = ((140 - validAge) * validWeight) / (72 * validScr);
  const crClActual = Math.round(gender === 'Female' ? rawCrCl * 0.85 : rawCrCl);
  const adjCrCl = Math.round(
    ((140 - validAge) * adjWeight) / (72 * validScr) * (gender === 'Female' ? 0.85 : 1.0)
  );
  const effectiveCrCl = isObese ? adjCrCl : crClActual;

  // Renal Clearance Normal Range & Professional Medical Response
  const crClNormalRange = '≥ 90 mL/min (Stage 1 / Normal Renal Function)';
  const crClIsNormal = effectiveCrCl >= 90;
  let crClProfessionalResponse = '';
  let ckdStage = 'Stage 1 (Normal / Preserved Kidney Function)';
  let ckdColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

  if (effectiveCrCl >= 90) {
    ckdStage = 'Stage 1 (Normal / Preserved Kidney Function)';
    ckdColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    crClProfessionalResponse =
      'Normal Physiological Renal Clearance (≥ 90 mL/min). Preserved glomerular filtration rate. Standard Ethiopian National Formulary maintenance doses indicated with no renal dose reduction required.';
  } else if (effectiveCrCl >= 60) {
    ckdStage = 'Stage 2 (Mild Reduction in GFR)';
    ckdColor = 'text-blue-800 bg-blue-50 border-blue-200';
    crClProfessionalResponse =
      'Mild Reduction in Renal Clearance (Stage 2: 60 – 89 mL/min). Renal clearance mildly decreased. Monitor baseline serum creatinine; most agents require no dose adjustment except narrow therapeutic index drugs.';
  } else if (effectiveCrCl >= 30) {
    ckdStage = 'Stage 3 (Moderate Reduction in GFR)';
    ckdColor = 'text-amber-800 bg-amber-50 border-amber-200';
    crClProfessionalResponse =
      'Below Normal Range: Moderate Renal Impairment (Stage 3: 30 – 59 mL/min). Active dose reduction or interval extension mandated for renally eliminated medications (e.g. Metformin max 1000 mg/day, Gentamicin interval extended).';
  } else if (effectiveCrCl >= 15) {
    ckdStage = 'Stage 4 (Severe Reduction in GFR)';
    ckdColor = 'text-rose-700 bg-rose-50 border-rose-200';
    crClProfessionalResponse =
      'Critically Below Normal Range: Severe Renal Impairment (Stage 4: 15 – 29 mL/min). Metformin contraindicated due to lactic acidosis hazard; dose adjustments required for enalapril, fluconazole, and cephalosporins.';
  } else {
    ckdStage = 'Stage 5 (Kidney Failure / End Stage Renal Disease)';
    ckdColor = 'text-rose-800 bg-rose-50 border-rose-200';
    crClProfessionalResponse =
      'Critically Below Normal Range: Kidney Failure / ESRD (< 15 mL/min). Renal replacement therapy / dialysis dependency. High risk of drug accumulation and uremic toxicity; consult renal dosing guidelines.';
  }

  // Dosing cutoffs based on effectiveCrCl
  const renalDosingGuidelines = [
    {
      drug: 'Metformin',
      status:
        effectiveCrCl >= 45
          ? 'Normal starting/maintenance dose (up to 2000mg/day)'
          : effectiveCrCl >= 30
          ? 'Dose reduce to maximum 1000 mg/day; monitor eGFR every 3 months'
          : 'CONTRAINDICATED due to high risk of lactic acidosis. Discontinue.',
      isContraindicated: effectiveCrCl < 30,
      isWarning: effectiveCrCl >= 30 && effectiveCrCl < 45
    },
    {
      drug: 'Enalapril',
      status:
        effectiveCrCl >= 30
          ? 'Standard dose (5 to 20 mg once daily)'
          : effectiveCrCl >= 10
          ? 'Initiate cautiously at 2.5 mg daily; titrate up slowly while monitoring K+ and SCr'
          : 'Maximum 2.5 mg daily on dialysis days; close hemodynamic monitoring',
      isContraindicated: false,
      isWarning: effectiveCrCl < 30
    },
    {
      drug: 'Gentamicin (Aminoglycoside)',
      status:
        effectiveCrCl >= 60
          ? 'Standard extended-interval: 5 mg/kg every 24 hours'
          : effectiveCrCl >= 40
          ? 'Extend interval to every 36 hours; check trough level before 2nd dose (<1 mcg/mL)'
          : effectiveCrCl >= 20
          ? 'Extend interval to every 48 hours; mandatory pre-dose trough level monitoring'
          : 'Avoid or single loading dose with strict TDM trough monitoring',
      isContraindicated: effectiveCrCl < 20,
      isWarning: effectiveCrCl >= 20 && effectiveCrCl < 60
    },
    {
      drug: 'Ceftriaxone',
      status:
        'Dual hepatic and renal elimination. No dose adjustment necessary in renal impairment unless combined with severe hepatic failure (max 2g/24h).',
      isContraindicated: false,
      isWarning: false
    },
    {
      drug: 'Fluconazole',
      status:
        effectiveCrCl >= 50
          ? '100% of recommended dose'
          : 'Administer 50% to 100% of normal loading dose, then reduce maintenance doses by 50%',
      isContraindicated: false,
      isWarning: effectiveCrCl < 50
    }
  ];

  // Blood Pressure Evaluation
  const bpResult = evaluateBloodPressure(
    systolic,
    diastolic,
    pulseBpm,
    hasDiabetesOrCkd,
    isAfricanAncestry
  );

  // Glycemic Evaluation
  const glycemiaResult = evaluateGlycemia(glucoseVal, glucoseUnit, glucoseTestType);

  // Electrolytes Calculation
  const anionGapResult = calculateAnionGap(serumNa, serumCl, serumHco3);
  const correctedCaResult = calculateCorrectedCalcium(serumCa, serumAlbumin);

  // Formulary Interactions Dataset
  const criticalInteractions = [
    {
      id: 'int-1',
      pair: 'ACE-Inhibitor (Enalapril) + Potassium Sparing Diuretic (Spironolactone)',
      severity: 'High / Potentially Fatal',
      mechanism: 'Additive potassium retention causing severe, life-threatening hyperkalemia (K+ > 6.0 mEq/L) and cardiac arrhythmias.',
      clinicalAction: 'Avoid combination unless in heart failure with close monitoring. Baseline serum potassium and SCr must be checked at 1 week, 4 weeks, and every 3 months.',
      context: 'Commonly co-prescribed in heart failure and resistant hypertension in Ethiopian referral hospitals.'
    },
    {
      id: 'int-2',
      pair: 'ACE-Inhibitor (Enalapril) + OTC NSAID (Diclofenac / Ibuprofen)',
      severity: 'High / Common DTP',
      mechanism: 'NSAIDs block vasodilatory prostaglandins in afferent arteriole; ACEi blocks angiotensin-II efferent vasoconstriction. Results in acute drop in intraglomerular pressure, AKI, and loss of blood pressure control.',
      clinicalAction: 'Immediately discontinue OTC NSAID. Counsel on topical analgesics or scheduled Paracetamol (up to 3g/day).',
      context: 'Extremely prevalent in Ethiopian patients purchasing OTC NSAIDs for arthritic joint pain.'
    },
    {
      id: 'int-3',
      pair: 'Rifampicin (TB Regimen) + Protease Inhibitor / Dolutegravir (HIV ART)',
      severity: 'Critical / Therapeutic Failure',
      mechanism: 'Rifampicin is a potent CYP3A4 and UGT1A1 inducer, reducing Dolutegravir concentrations by up to 75% and Protease Inhibitors by >80%.',
      clinicalAction: 'Double the Dolutegravir dose: 50 mg twice daily (12 hours apart) instead of once daily during TB treatment and for 2 weeks after stopping Rifampicin.',
      context: 'Ethiopian National HIV-TB Co-infection Protocol standard of care.'
    },
    {
      id: 'int-4',
      pair: 'Metformin + Intravenous Iodinated Radiocontrast Agent',
      severity: 'Severe / Acute Lactic Acidosis Risk',
      mechanism: 'Contrast-induced nephropathy can cause sudden acute renal failure leading to toxic accumulation of Metformin and fatal lactic acidosis.',
      clinicalAction: 'Withhold Metformin at the time of or prior to imaging procedure. Re-evaluate renal function 48 hours post-contrast before restarting.',
      context: 'Routine check required prior to contrast CT scans in Ethiopian diagnostic imaging centers.'
    },
    {
      id: 'int-5',
      pair: 'Ciprofloxacin + Iron / Calcium / Antacids',
      severity: 'Moderate to High / Chelation Inactivation',
      mechanism: 'Polyvalent cations (Fe2+, Ca2+, Mg2+, Al3+) bind ciprofloxacin forming insoluble chelates, reducing antibiotic absorption by up to 90%.',
      clinicalAction: 'Separate administration: take ciprofloxacin at least 2 hours before or 4-6 hours after cation-containing supplements.',
      context: 'Frequent cause of clinical antimicrobial treatment failure in outpatients taking hematinics or antacids.'
    },
    {
      id: 'int-6',
      pair: 'Glibenclamide + Cotrimoxazole (TMP-SMX)',
      severity: 'High / Severe Hypoglycemia',
      mechanism: 'Sulfamethoxazole inhibits CYP2C9 metabolism of Glibenclamide and displaces it from plasma protein binding sites.',
      clinicalAction: 'Avoid co-prescribing. Substitute antibiotic or substitute Glibenclamide with insulin or close glucose monitoring.',
      context: 'Frequently observed when HIV or immunocompromised patients on Cotrimoxazole prophylaxis develop diabetes.'
    }
  ];

  const filteredInteractions = criticalInteractions.filter(
    (item) =>
      item.pair.toLowerCase().includes(interactionSearchQuery.toLowerCase()) ||
      item.mechanism.toLowerCase().includes(interactionSearchQuery.toLowerCase()) ||
      item.clinicalAction.toLowerCase().includes(interactionSearchQuery.toLowerCase())
  );

  const filteredTerms = CLINICAL_TERMS_GLOSSARY.filter((t) => {
    const matchesCategory = termCategoryFilter === 'All' || t.category === termCategoryFilter;
    const matchesSearch =
      t.term.toLowerCase().includes(termSearchQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(termSearchQuery.toLowerCase()) ||
      (t.ethiopianPracticeContext && t.ethiopianPracticeContext.toLowerCase().includes(termSearchQuery.toLowerCase())) ||
      (t.clinicalSignificance && t.clinicalSignificance.toLowerCase().includes(termSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#10201C]/80 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#DCD8CF] overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header with 3D Drug Icon */}
        <div className="bg-[#FAF9F5] border-b border-[#DCD8CF] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ThreeDimensionalDrugIcon size="sm" />
            <div>
              <h3 className="font-bold text-base text-[#1B211E] flex items-center gap-2">
                Bedside Clinical Pharmacy &amp; Diagnostic Suite
                <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-full bg-[#E4EEEA] text-[#12463C] border border-[#BBD7CF]">
                  STG Reference Ranges Included
                </span>
              </h3>
              <p className="text-xs text-[#757D79]">
                Normal reference benchmarks, medical evaluations, and dosing guidelines for healthcare professionals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#757D79] hover:text-[#1B211E] hover:bg-[#F0EEE7] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Tab Bar */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-[#E8E5DD] bg-white overflow-x-auto text-xs font-semibold scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab('renal')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'renal'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Renal CrCl Dosing</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bmi')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'bmi'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>BMI &amp; Weights (IBW/BSA)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bp')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'bp'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Blood Pressure &amp; HTN</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('glycemia')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'glycemia'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Blood Sugar &amp; HbA1c</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('electrolytes')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'electrolytes'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Anion Gap &amp; Ca++</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Terms &amp; DTPs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interactions')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'interactions'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Formulary Interactions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fasting')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'fasting'
                ? 'bg-[#1E6B5E] text-white shadow-xs'
                : 'text-[#4B5350] hover:bg-[#F0EEE7]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Cultural Fasting</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: RENAL & COCKCROFT-GAULT */}
          {activeTab === 'renal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Input Fields */}
                <div className="md:col-span-6 space-y-3.5 bg-[#FAF9F5] p-4 sm:p-5 rounded-xl border border-[#DCD8CF]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    <span>Patient Clearance Parameters</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Age (years)</label>
                      <input
                        type="number"
                        min="18"
                        max="110"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female (× 0.85)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Actual Weight (kg)</label>
                      <input
                        type="number"
                        min="30"
                        max="220"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Height (cm)</label>
                      <input
                        type="number"
                        min="120"
                        max="220"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Serum Creatinine (mg/dL)
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        min="0.2"
                        max="20"
                        value={scr}
                        onChange={(e) => setScr(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>
                  </div>

                  <div className="text-[0.72rem] text-[#757D79] leading-relaxed pt-1">
                    IBW: <strong>{ibw.toFixed(1)} kg</strong>. {isObese ? 'Patient is >120% of IBW; using Adjusted Body Weight (ABW = IBW + 0.4(TBW - IBW)).' : 'Patient within normal weight; using Total Body Weight.'}
                  </div>
                </div>

                {/* Output Card */}
                <div className="md:col-span-6 space-y-4">
                  <div className="p-5 rounded-xl border border-[#BBD7CF] bg-[#E4EEEA]/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#12463C] uppercase tracking-wider font-semibold">
                        Estimated Creatinine Clearance (Cockcroft-Gault)
                      </span>
                      {crClIsNormal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          Normal Physiological Range
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <AlertTriangle className="w-3 h-3" />
                          Below Normal Range
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold font-mono text-[#1E6B5E]">
                        {effectiveCrCl}
                      </span>
                      <span className="text-sm font-semibold text-[#12463C]">mL/min</span>
                    </div>

                    {/* Reference Range Bar */}
                    <div className="p-2 rounded-lg bg-white/80 border border-[#DCD8CF] text-[0.72rem] text-[#4B5350]">
                      <strong className="text-[#12463C]">Normal Reference Range:</strong> {crClNormalRange}
                    </div>

                    {/* Professional Medical Response */}
                    <div className="p-3 rounded-lg bg-white border border-[#BBD7CF] text-xs text-[#1B211E] space-y-1">
                      <strong className="text-[#1E6B5E] flex items-center gap-1 font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Professional Medical Evaluation:
                      </strong>
                      <p className="leading-relaxed text-[#4B5350]">{crClProfessionalResponse}</p>
                    </div>

                    <div className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${ckdColor}`}>
                      {ckdStage}
                    </div>

                    <p className="text-[0.72rem] text-[#4B5350] leading-relaxed">
                      Formula:{' '}
                      <code className="bg-white/80 px-1 py-0.5 rounded border border-[#DCD8CF]">
                        CrCl = [(140 - Age) × Wt] / [72 × SCr] {gender === 'Female' ? '× 0.85' : ''}
                      </code>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2 text-xs">
                    <span className="font-bold text-[#1B211E] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#1E6B5E]" />
                      Bedside Clinical Pearls:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[#4B5350]">
                      <li>For malnourished patients with low SCr (&lt;0.6 mg/dL), using measured SCr may overestimate renal clearance.</li>
                      <li>In obese individuals (&gt;120% IBW), standard Total Body Weight falsely inflates CrCl. Adjusted Body Weight ({adjWeight} kg) prevents medication overdose.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dosing Guidelines Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] mb-3">
                  Immediate Ethiopian Formulary Renal Dosing Decisions for CrCl = {effectiveCrCl} mL/min
                </h4>
                <div className="overflow-x-auto rounded-lg border border-[#DCD8CF]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1E6B5E] text-white">
                        <th className="p-2.5 font-semibold">Medication</th>
                        <th className="p-2.5 font-semibold">Dosing Decision for this CrCl ({effectiveCrCl} mL/min)</th>
                        <th className="p-2.5 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E5DD] bg-white">
                      {renalDosingGuidelines.map((item, idx) => (
                        <tr key={idx} className={item.isContraindicated ? 'bg-rose-50/50' : item.isWarning ? 'bg-amber-50/30' : ''}>
                          <td className="p-2.5 font-bold text-[#1B211E]">{item.drug}</td>
                          <td className="p-2.5 text-[#4B5350]">{item.status}</td>
                          <td className="p-2.5 text-right">
                            {item.isContraindicated ? (
                              <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[0.68rem]">
                                Contraindicated
                              </span>
                            ) : item.isWarning ? (
                              <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[0.68rem]">
                                Dose Adjustment Req.
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium text-[0.68rem]">
                                Standard Dose
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BMI & ANTHROPOMETRICS */}
          {activeTab === 'bmi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs */}
                <div className="md:col-span-5 space-y-4 bg-[#FAF9F5] p-5 rounded-xl border border-[#DCD8CF]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    <span>Anthropometric Measurements</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Height ({height} cm / {(height / 2.54).toFixed(1)} inches)
                      </label>
                      <input
                        type="range"
                        min="120"
                        max="220"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full accent-[#1E6B5E]"
                      />
                      <div className="flex justify-between text-[0.68rem] text-[#757D79] mt-1">
                        <span>120 cm</span>
                        <span className="font-bold text-[#1E6B5E]">{height} cm</span>
                        <span>220 cm</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Weight ({weight} kg / {(weight * 2.20462).toFixed(1)} lbs)
                      </label>
                      <input
                        type="range"
                        min="30"
                        max="200"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full accent-[#1E6B5E]"
                      />
                      <div className="flex justify-between text-[0.68rem] text-[#757D79] mt-1">
                        <span>30 kg</span>
                        <span className="font-bold text-[#1E6B5E]">{weight} kg</span>
                        <span>200 kg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Biological Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      >
                        <option value="Male">Male (Base IBW 50.0 kg)</option>
                        <option value="Female">Female (Base IBW 45.5 kg)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results & Calculations */}
                <div className="md:col-span-7 space-y-4">
                  <div className={`p-5 rounded-xl border ${bmiResult.colorClass} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider">
                        Body Mass Index (BMI)
                      </span>
                      {bmiResult.isNormal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          Normal Physiological Range
                        </span>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${bmiResult.badgeBg}`}>
                          {bmiResult.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold font-mono">{bmiResult.bmi}</span>
                      <span className="text-sm font-semibold">kg/m²</span>
                    </div>

                    {/* Reference Range Bar */}
                    <div className="p-2 rounded-lg bg-white/80 border border-[#DCD8CF] text-[0.72rem] text-[#4B5350]">
                      <strong className="text-[#12463C]">Normal Reference Range:</strong> {bmiResult.normalRange}
                    </div>

                    {/* Professional Medical Response */}
                    <div className="p-3 rounded-lg bg-white border border-[#BBD7CF] text-xs text-[#1B211E] space-y-1">
                      <strong className="text-[#1E6B5E] flex items-center gap-1 font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Professional Medical Evaluation:
                      </strong>
                      <p className="leading-relaxed text-[#4B5350]">{bmiResult.professionalMedicalResponse}</p>
                    </div>
                  </div>

                  {/* Body Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-[#DCD8CF] text-center">
                      <span className="block text-[0.68rem] uppercase font-bold text-[#757D79]">
                        Ideal Body Weight (IBW)
                      </span>
                      <span className="text-lg font-bold font-mono text-[#1E6B5E] mt-1 block">
                        {bmiResult.ibw} kg
                      </span>
                      <span className="text-[0.65rem] text-[#757D79]">Devine Equation</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#DCD8CF] text-center">
                      <span className="block text-[0.68rem] uppercase font-bold text-[#757D79]">
                        Adjusted Weight (AdjBW)
                      </span>
                      <span className="text-lg font-bold font-mono text-[#1B211E] mt-1 block">
                        {bmiResult.adjBw} kg
                      </span>
                      <span className="text-[0.65rem] text-[#757D79]">
                        {bmiResult.isObese ? 'Required for Dosing' : 'Same as TBW'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#DCD8CF] text-center">
                      <span className="block text-[0.68rem] uppercase font-bold text-[#757D79]">
                        Body Surface Area (BSA)
                      </span>
                      <span className="text-lg font-bold font-mono text-[#1E6B5E] mt-1 block">
                        {bmiResult.bsa} m²
                      </span>
                      <span className="text-[0.65rem] text-[#757D79]">Mosteller Formula</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs space-y-1 text-[#4B5350]">
                    <strong className="text-[#12463C] block">Clinical Pharmacy Guidance:</strong>
                    <p>
                      In obese patients, lipophilic drugs (e.g. benzodiazepines) distribute widely into adipose tissue, requiring higher loading doses, whereas hydrophilic drugs (aminoglycosides, beta-lactams) distribute primarily into extracellular fluid. Calculate clearance using <strong>Adjusted Body Weight</strong> to avoid nephrotoxicity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BLOOD PRESSURE & HYPERTENSION */}
          {activeTab === 'bp' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs */}
                <div className="md:col-span-5 space-y-4 bg-[#FAF9F5] p-5 rounded-xl border border-[#DCD8CF]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    <span>Hemodynamic Parameters</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Systolic Blood Pressure (SBP)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="60"
                          max="260"
                          value={systolic}
                          onChange={(e) => setSystolic(Number(e.target.value))}
                          className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] font-mono font-bold text-sm focus:outline-none focus:border-[#1E6B5E]"
                        />
                        <span className="text-[#757D79] font-medium shrink-0">mmHg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Diastolic Blood Pressure (DBP)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="30"
                          max="160"
                          value={diastolic}
                          onChange={(e) => setDiastolic(Number(e.target.value))}
                          className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] font-mono font-bold text-sm focus:outline-none focus:border-[#1E6B5E]"
                        />
                        <span className="text-[#757D79] font-medium shrink-0">mmHg</span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Heart Rate / Pulse
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="35"
                          max="220"
                          value={pulseBpm}
                          onChange={(e) => setPulseBpm(Number(e.target.value))}
                          className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] font-mono text-sm focus:outline-none focus:border-[#1E6B5E]"
                        />
                        <span className="text-[#757D79] font-medium shrink-0">bpm</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E8E5DD] space-y-2">
                      <label className="flex items-center gap-2 text-[#1B211E] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasDiabetesOrCkd}
                          onChange={(e) => setHasDiabetesOrCkd(e.target.checked)}
                          className="rounded text-[#1E6B5E] focus:ring-[#1E6B5E]"
                        />
                        <span>Comorbid Diabetes Mellitus or CKD</span>
                      </label>

                      <label className="flex items-center gap-2 text-[#1B211E] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAfricanAncestry}
                          onChange={(e) => setIsAfricanAncestry(e.target.checked)}
                          className="rounded text-[#1E6B5E] focus:ring-[#1E6B5E]"
                        />
                        <span>Ethiopian / African Ancestry (Low-Renin HTN)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Evaluation Card */}
                <div className="md:col-span-7 space-y-4">
                  <div className={`p-5 rounded-xl border ${bpResult.colorClass} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider">
                        Hypertension Staging (Ethiopian STG &amp; ISH)
                      </span>
                      {bpResult.isNormal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          Normal Physiological Range
                        </span>
                      ) : bpResult.isUrgent ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[0.68rem] animate-pulse">
                          <ShieldAlert className="w-3 h-3" />
                          Emergency Action
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {bpResult.stage}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold font-mono">
                        {systolic} / {diastolic}
                      </span>
                      <span className="text-sm font-semibold">{bpResult.stage}</span>
                    </div>

                    {/* Reference Range Bar */}
                    <div className="p-2 rounded-lg bg-white/80 border border-[#DCD8CF] text-[0.72rem] text-[#4B5350]">
                      <strong className="text-[#12463C]">Normal Reference Range:</strong> {bpResult.normalRange}
                    </div>

                    {/* Professional Medical Response */}
                    <div className="p-3 rounded-lg bg-white border border-[#BBD7CF] text-xs text-[#1B211E] space-y-1">
                      <strong className="text-[#1E6B5E] flex items-center gap-1 font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Professional Medical Evaluation:
                      </strong>
                      <p className="leading-relaxed text-[#4B5350]">{bpResult.professionalMedicalResponse}</p>
                    </div>

                    <p className="text-xs leading-relaxed">{bpResult.recommendation}</p>
                  </div>

                  {/* Hemodynamic Calculations Row */}
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-[#DCD8CF]">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.68rem] uppercase font-bold text-[#757D79]">
                          MAP
                        </span>
                        {bpResult.mapIsNormal ? (
                          <span className="text-[0.62rem] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                            Normal
                          </span>
                        ) : (
                          <span className="text-[0.62rem] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                            Flag
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-bold font-mono text-[#1E6B5E]">{bpResult.map}</span>
                        <span className="text-[0.68rem] text-[#757D79]">mmHg</span>
                      </div>
                      <span className="text-[0.65rem] text-[#757D79] block mt-0.5">
                        Ref: {bpResult.mapNormalRange}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#DCD8CF]">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.68rem] uppercase font-bold text-[#757D79]">
                          Pulse Pressure
                        </span>
                        {bpResult.ppIsNormal ? (
                          <span className="text-[0.62rem] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                            Normal
                          </span>
                        ) : (
                          <span className="text-[0.62rem] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                            Flag
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-bold font-mono text-[#1B211E]">{bpResult.pulsePressure}</span>
                        <span className="text-[0.68rem] text-[#757D79]">mmHg</span>
                      </div>
                      <span className="text-[0.65rem] text-[#757D79] block mt-0.5">
                        Ref: {bpResult.ppNormalRange}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#DCD8CF]">
                      <span className="block text-[0.68rem] uppercase font-bold text-[#757D79]">
                        Heart Rate
                      </span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-bold font-mono text-[#1E6B5E]">{pulseBpm}</span>
                        <span className="text-[0.68rem] text-[#757D79]">bpm</span>
                      </div>
                      <span className="text-[0.65rem] text-[#757D79] block mt-0.5">
                        Ref: 60 – 100 bpm ({bpResult.heartRateEvaluation})
                      </span>
                    </div>
                  </div>

                  {/* STG Drug Selection Box */}
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#BBD7CF] space-y-1.5 text-xs">
                    <span className="font-bold text-[#12463C] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#1E6B5E]" />
                      Ethiopian National STG Guideline Pharmacotherapy:
                    </span>
                    <p className="text-[#1B211E] leading-relaxed font-medium">
                      {bpResult.firstLineTherapyNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOOD SUGAR & GLYCEMIC METRICS */}
          {activeTab === 'glycemia' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs */}
                <div className="md:col-span-5 space-y-4 bg-[#FAF9F5] p-5 rounded-xl border border-[#DCD8CF]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                    <Droplets className="w-4 h-4" />
                    <span>Glycemic Diagnostic Inputs</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Test Modality</label>
                      <select
                        value={glucoseTestType}
                        onChange={(e) => setGlucoseTestType(e.target.value as 'Fasting' | 'Random' | 'HbA1c')}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                      >
                        <option value="Fasting">Fasting Blood Glucose (FBG / FBS)</option>
                        <option value="Random">Random Blood Glucose (RBG / RBS)</option>
                        <option value="HbA1c">Glycated Hemoglobin (HbA1c %)</option>
                      </select>
                    </div>

                    {glucoseTestType !== 'HbA1c' && (
                      <div>
                        <label className="block font-semibold text-[#1B211E] mb-1">Unit of Measurement</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setGlucoseUnit('mg/dL')}
                            className={`py-1.5 rounded-lg font-semibold text-xs border ${
                              glucoseUnit === 'mg/dL'
                                ? 'bg-[#1E6B5E] text-white border-[#1E6B5E]'
                                : 'bg-white text-[#4B5350] border-[#DCD8CF]'
                            }`}
                          >
                            mg/dL (Ethiopian standard)
                          </button>
                          <button
                            type="button"
                            onClick={() => setGlucoseUnit('mmol/L')}
                            className={`py-1.5 rounded-lg font-semibold text-xs border ${
                              glucoseUnit === 'mmol/L'
                                ? 'bg-[#1E6B5E] text-white border-[#1E6B5E]'
                                : 'bg-white text-[#4B5350] border-[#DCD8CF]'
                            }`}
                          >
                            mmol/L (SI standard)
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Measured Value ({glucoseTestType === 'HbA1c' ? '%' : glucoseUnit})
                      </label>
                      <input
                        type="number"
                        step={glucoseTestType === 'HbA1c' ? '0.1' : '1'}
                        min={glucoseTestType === 'HbA1c' ? '3.5' : '20'}
                        max={glucoseTestType === 'HbA1c' ? '18.0' : '800'}
                        value={glucoseVal}
                        onChange={(e) => setGlucoseVal(Number(e.target.value))}
                        className="w-full p-2.5 rounded-lg bg-white border border-[#DCD8CF] font-mono font-bold text-base focus:outline-none focus:border-[#1E6B5E]"
                      />
                    </div>

                    <div className="text-[0.7rem] text-[#757D79] leading-relaxed pt-1">
                      Conversion factor: <strong>1 mmol/L = 18.018 mg/dL</strong>. Fasting requires at least 8 hours with no caloric intake.
                    </div>
                  </div>
                </div>

                {/* Glycemic Output Card */}
                <div className="md:col-span-7 space-y-4">
                  <div className={`p-5 rounded-xl border ${glycemiaResult.colorClass} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider">
                        Glycemic Classification
                      </span>
                      {glycemiaResult.isNormal ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          Normal Physiological Range
                        </span>
                      ) : (
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${glycemiaResult.badgeBg}`}>
                          {glycemiaResult.status}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-4">
                      {glucoseTestType === 'HbA1c' ? (
                        <>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold font-mono">{glucoseVal}</span>
                            <span className="text-sm font-semibold">%</span>
                          </div>
                          <div className="text-xs text-[#4B5350]">
                            ≈ eAG: <strong>{glycemiaResult.eAgMgDl} mg/dL</strong> ({glycemiaResult.eAgMmolL} mmol/L)
                          </div>
                        </>
                      ) : (
                        <div className="flex items-baseline gap-3">
                          <div>
                            <span className="text-3xl font-extrabold font-mono">{glycemiaResult.valueMgDl}</span>
                            <span className="text-xs text-[#757D79] ml-1">mg/dL</span>
                          </div>
                          <span className="text-sm text-[#757D79]">/</span>
                          <div>
                            <span className="text-2xl font-bold font-mono">{glycemiaResult.valueMmolL}</span>
                            <span className="text-xs text-[#757D79] ml-1">mmol/L</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Reference Range Bar */}
                    <div className="p-2 rounded-lg bg-white/80 border border-[#DCD8CF] text-[0.72rem] text-[#4B5350]">
                      <strong className="text-[#12463C]">Normal Reference Range:</strong> {glycemiaResult.normalRange}
                    </div>

                    {/* Professional Medical Response */}
                    <div className="p-3 rounded-lg bg-white border border-[#BBD7CF] text-xs text-[#1B211E] space-y-1">
                      <strong className="text-[#1E6B5E] flex items-center gap-1 font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Professional Medical Evaluation:
                      </strong>
                      <p className="leading-relaxed text-[#4B5350]">{glycemiaResult.professionalMedicalResponse}</p>
                    </div>

                    <p className="text-xs leading-relaxed font-medium">{glycemiaResult.clinicalAction}</p>
                  </div>

                  {/* Immediate Guideline Actions */}
                  <div className="p-4 rounded-xl bg-white border border-[#DCD8CF] space-y-2 text-xs">
                    <span className="font-bold text-[#1B211E] flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#1E6B5E]" />
                      Emergency Pharmacist Protocols:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#4B5350]">
                      <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD]">
                        <strong className="text-rose-800 block mb-0.5">Hypoglycemia (&lt;70 mg/dL):</strong>
                        Rule of 15: Give 15g fast carbohydrate (sweetened tea or 3-4 sugar cubes in water). Recheck in 15 min. Discontinue daytime sulfonylureas during fasting.
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD]">
                        <strong className="text-amber-800 block mb-0.5">Hyperglycemia (&gt;300 mg/dL):</strong>
                        Screen for DKA (fruity breath, Kussmaul breathing, urine ketones). Hydrate aggressively with Normal Saline 0.9% before subcutaneous insulin.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ELECTROLYTES & DIAGNOSTIC CALCULATIONS */}
          {activeTab === 'electrolytes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Serum Anion Gap */}
                <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                      <FlaskConical className="w-4 h-4" />
                      <span>Serum Anion Gap (AG)</span>
                    </h4>
                    {anionGapResult.isNormal ? (
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Normal
                      </span>
                    ) : (
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Outside Normal Range
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Na⁺ (mEq/L)</label>
                      <input
                        type="number"
                        value={serumNa}
                        onChange={(e) => setSerumNa(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">Cl⁻ (mEq/L)</label>
                      <input
                        type="number"
                        value={serumCl}
                        onChange={(e) => setSerumCl(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">HCO₃⁻ (mEq/L)</label>
                      <input
                        type="number"
                        value={serumHco3}
                        onChange={(e) => setSerumHco3(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF]"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-[#DCD8CF] space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1B211E]">Calculated Anion Gap:</span>
                      <span className="text-2xl font-extrabold font-mono text-[#1E6B5E]">
                        {anionGapResult.anionGap} <span className="text-xs font-normal">mEq/L</span>
                      </span>
                    </div>

                    <div className="text-[0.72rem] text-[#4B5350]">
                      <strong className="text-[#12463C]">Normal Reference Range:</strong> {anionGapResult.normalRange}
                    </div>

                    <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-xs space-y-1">
                      <strong className="text-[#1E6B5E] flex items-center gap-1 font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Professional Medical Evaluation:
                      </strong>
                      <p className="text-[#4B5350] leading-relaxed">{anionGapResult.professionalMedicalResponse}</p>
                    </div>

                    <p className="text-[0.72rem] text-[#4B5350] leading-relaxed">
                      {anionGapResult.etiologies}
                    </p>
                  </div>
                </div>

                {/* 2. Corrected Calcium */}
                <div className="p-5 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E] flex items-center gap-1.5">
                      <Activity className="w-4 h-4" />
                      <span>Corrected Calcium for Albumin</span>
                    </h4>
                    {correctedCaResult.isNormal ? (
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Normal
                      </span>
                    ) : (
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Outside Normal Range
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Measured Total Calcium (mg/dL)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={serumCa}
                        onChange={(e) => setSerumCa(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1B211E] mb-1">
                        Serum Albumin (g/dL)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={serumAlbumin}
                        onChange={(e) => setSerumAlbumin(Number(e.target.value))}
                        className="w-full p-2 rounded-lg bg-white border border-[#DCD8CF]"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-[#DCD8CF] space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1B211E]">Corrected Calcium:</span>
                      <span className="text-2xl font-extrabold font-mono text-[#1E6B5E]">
                        {correctedCaResult.correctedCa} <span className="text-xs font-normal">mg/dL</span>
                      </span>
                    </div>

                    <div className="text-[0.72rem] text-[#4B5350]">
                      <strong className="text-[#12463C]">Normal Reference Range:</strong> {correctedCaResult.normalRange}
                    </div>

                    <div className="p-2.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-xs space-y-1">
                      <strong className="text-[#1E6B5E] flex items-center gap-1 font-bold">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Professional Medical Evaluation:
                      </strong>
                      <p className="text-[#4B5350] leading-relaxed">{correctedCaResult.professionalMedicalResponse}</p>
                    </div>

                    <p className="text-xs text-[#4B5350] leading-relaxed">
                      {correctedCaResult.interpretation}
                    </p>
                    <div className="text-[0.68rem] text-[#757D79]">
                      Formula: Measured Ca + 0.8 × (4.0 - Albumin)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CLINICAL TERMS & DTP GLOSSARY */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1B211E]">
                    Clinical Terms, DTP Frameworks &amp; Guidelines Glossary
                  </h4>
                  <p className="text-xs text-[#757D79]">
                    Essential reference concepts for pharmaceutical care, STG compliance, and clerkship rounds.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-3 text-[#757D79]" />
                  <input
                    type="text"
                    placeholder="Search term, DTP, or regimen..."
                    value={termSearchQuery}
                    onChange={(e) => setTermSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto text-[0.72rem] pb-1">
                {[
                  'All',
                  'DTP Categories',
                  'Cardiovascular & Renal',
                  'Infectious Disease & STG',
                  'Endocrine & Metabolic',
                  'Laboratory & Kinetics'
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setTermCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      termCategoryFilter === cat
                        ? 'bg-[#1E6B5E] text-white font-semibold'
                        : 'bg-[#FAF9F5] text-[#4B5350] hover:bg-[#E8E5DD]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Glossary Cards */}
              <div className="space-y-3">
                {filteredTerms.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-[#DCD8CF] bg-[#FAF9F5] hover:border-[#1E6B5E] transition-colors space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[#1B211E]">{t.term}</span>
                      <span className="px-2 py-0.5 rounded-full text-[0.68rem] font-bold bg-[#E4EEEA] text-[#12463C] border border-[#BBD7CF]">
                        {t.category}
                      </span>
                    </div>

                    <p className="text-[#1B211E] leading-relaxed">{t.definition}</p>

                    <div className="p-2.5 rounded-lg bg-white border border-[#E8E5DD] space-y-1">
                      <div>
                        <strong className="text-[#1E6B5E]">Clinical Significance:</strong>{' '}
                        <span className="text-[#4B5350]">{t.clinicalSignificance}</span>
                      </div>
                      {t.ethiopianPracticeContext && (
                        <div>
                          <strong className="text-[#12463C]">Ethiopian Practice Reality:</strong>{' '}
                          <span className="text-[#4B5350]">{t.ethiopianPracticeContext}</span>
                        </div>
                      )}
                      {t.formulaOrRegimen && (
                        <div className="pt-1 text-[0.7rem] font-mono text-[#757D79]">
                          <strong>Key Formula / Regimen:</strong> {t.formulaOrRegimen}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FORMULARY DRUG INTERACTIONS */}
          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1B211E]">
                    Ethiopian Critical Drug Therapy Interactions
                  </h4>
                  <p className="text-xs text-[#757D79]">
                    Evidence-based interaction pairs frequently encountered in Ethiopian chronic care &amp; inpatient practice.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-3 text-[#757D79]" />
                  <input
                    type="text"
                    placeholder="Search drug or mechanism..."
                    value={interactionSearchQuery}
                    onChange={(e) => setInteractionSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredInteractions.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#DCD8CF] bg-[#FAF9F5] hover:border-[#1E6B5E] transition-colors space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span className="font-bold text-sm text-[#1B211E]">{item.pair}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[0.68rem] font-bold ${
                          item.severity.includes('Fatal') || item.severity.includes('Critical')
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>

                    <div>
                      <strong className="text-[#12463C]">Mechanism:</strong>{' '}
                      <span className="text-[#4B5350]">{item.mechanism}</span>
                    </div>

                    <div className="p-2.5 rounded bg-white border border-[#E8E5DD]">
                      <strong className="text-[#1E6B5E]">Required Clinical Action:</strong>{' '}
                      <span className="text-[#1B211E]">{item.clinicalAction}</span>
                    </div>

                    <div className="text-[0.7rem] text-[#757D79] italic">
                      Source: {item.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CULTURAL FASTING TAB */}
          {activeTab === 'fasting' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] space-y-2">
                <h4 className="text-sm font-bold text-[#1B211E] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E6B5E]" />
                  <span>Cultural Chronotherapy: Fasting Considerations in Ethiopian Practice</span>
                </h4>
                <p className="text-[#4B5350] leading-relaxed">
                  Ethiopian patients routinely observe religious fasting periods, notably Ethiopian Orthodox Tewahedo Lent (Hudadi / ዐቢይ ጾም - 55 days with no food until 3 PM) and Muslim Ramadan (Sawm - dawn to dusk). Abrupt omissions or taking daytime doses on an empty stomach frequently precipitates DTPs (hypoglycemia, orthostatic hypotension, or gastric ulceration).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white border border-[#DCD8CF] space-y-2">
                  <span className="font-bold text-sm text-[#1E6B5E] block">
                    Antihypertensive Management
                  </span>
                  <ul className="space-y-1.5 text-[#4B5350] list-disc pl-4">
                    <li>
                      <strong>Diuretics (e.g. HCTZ 25mg):</strong> Shift administration from morning to evening (after fasting break). Morning administration causes rapid daytime volume depletion, severe thirst, and orthostatic dizziness during fasting hours.
                    </li>
                    <li>
                      <strong>ACEi / ARBs:</strong> Ensure patients consume adequate fluids upon breaking fast to prevent acute hypovolemic hypotension.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#DCD8CF] space-y-2">
                  <span className="font-bold text-sm text-[#1E6B5E] block">
                    Antidiabetic / Glycemic Safeguards
                  </span>
                  <ul className="space-y-1.5 text-[#4B5350] list-disc pl-4">
                    <li>
                      <strong>Sulfonylureas (Glibenclamide):</strong> Extreme risk of midday hypoglycemia. Switch dose timing to the main evening meal, or convert to once-daily Metformin or DPP-4 inhibitor if available.
                    </li>
                    <li>
                      <strong>Metformin:</strong> Take with the largest meal after fasting concludes to avoid GI intolerance on an empty stomach.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF9F5] border-t border-[#DCD8CF] px-5 py-3 flex items-center justify-between text-xs">
          <span className="text-[#757D79] truncate mr-2">
            PharmaMind Bedside Pharmacist Tool Suite · Ethiopian National STG &amp; Formulary Standards
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] cursor-pointer shrink-0"
          >
            Close Tool
          </button>
        </div>
      </motion.div>
    </div>
  );
};
