// Clinical Terms & Concepts Glossary for Healthcare Professionals
// Emphasizes Ethiopian Standard Treatment Guidelines (STG) & Clinical Pharmacy Practice

export interface ClinicalTermItem {
  id: string;
  term: string;
  category: 'DTP Categories' | 'Cardiovascular & Renal' | 'Infectious Disease & STG' | 'Laboratory & Kinetics' | 'Endocrine & Metabolic';
  definition: string;
  clinicalSignificance: string;
  ethiopianPracticeContext?: string;
  formulaOrRegimen?: string;
}

export const CLINICAL_TERMS_GLOSSARY: ClinicalTermItem[] = [
  // Strand & Cipolle 7 DTPs
  {
    id: 'dtp-1',
    term: 'DTP 1: Unnecessary Drug Therapy',
    category: 'DTP Categories',
    definition:
      'The patient is taking a medication for which there is no valid clinical indication, or the condition could be treated non-pharmacologically, or multiple drugs are being used for a condition requiring single therapy.',
    clinicalSignificance:
      'Directly increases toxicity risk, economic burden on patient, and potential drug-drug interactions without therapeutic benefit.',
    ethiopianPracticeContext:
      'Extremely common with unjustified empiric antibiotics (e.g. Ciprofloxacin or Ceftriaxone for simple viral URI) and long-term NSAIDs without documented inflammatory pathology.',
    formulaOrRegimen: 'Indication Check: Documented diagnosis vs. active medication list.'
  },
  {
    id: 'dtp-2',
    term: 'DTP 2: Needs Additional Drug Therapy',
    category: 'DTP Categories',
    definition:
      'A medical condition requires drug therapy but the patient is not receiving a medication to treat that indication, or requires preventative therapy, or synergistic combination therapy.',
    clinicalSignificance:
      'Leads to untreated disease progression, preventable organ damage, and avoidable hospital readmissions.',
    ethiopianPracticeContext:
      'Frequently seen in diabetic patients with proteinuria lacking an ACEi/ARB for renoprotection, or post-MI patients lacking statin/aspirin therapy.',
    formulaOrRegimen: 'Guideline Concordance Check: Identify missing guideline-directed medical therapy (GDMT).'
  },
  {
    id: 'dtp-3',
    term: 'DTP 3: Ineffective Drug',
    category: 'DTP Categories',
    definition:
      'The medication being administered is not effective for the medical condition, is not the most effective agent, or the patient has developed antimicrobial/therapeutic resistance.',
    clinicalSignificance:
      'Clinical failure, disease deterioration, and unnecessary exposure to drug risks.',
    ethiopianPracticeContext:
      'Prescribing Chloroquine for P. falciparum malaria (widespread resistance in Ethiopia; Artemether-Lumefantrine is mandated), or using cough syrups for ACEi dry cough.',
    formulaOrRegimen: 'First-line Formulary Check per Ethiopian National STG.'
  },
  {
    id: 'dtp-4',
    term: 'DTP 4: Dosage Too Low',
    category: 'DTP Categories',
    definition:
      'The drug dose is too low to produce the desired therapeutic effect due to incorrect dose, frequency, duration, or a drug interaction that lowers bioavailability.',
    clinicalSignificance:
      'Subtherapeutic drug levels, pathogen resistance development, and persistent uncontrolled symptoms.',
    ethiopianPracticeContext:
      'Under-dosing of antibiotics in severe sepsis, or timid titration of antihypertensives (e.g. leaving Enalapril at 2.5mg daily despite persistent Stage 2 BP).',
    formulaOrRegimen: 'Therapeutic Range & Clearance Assessment.'
  },
  {
    id: 'dtp-5',
    term: 'DTP 5: Adverse Drug Reaction (ADR)',
    category: 'DTP Categories',
    definition:
      'The patient is experiencing an undesirable response caused by the medication that is not dose-dependent or is a known idiosyncratic, allergic, or toxic manifestation.',
    clinicalSignificance:
      'Patient morbidity, mortality, treatment abandonment, and increased healthcare utilization.',
    ethiopianPracticeContext:
      'Bradykinin-mediated dry cough from Enalapril (switch to Losartan); Cotrimoxazole-induced Stevens-Johnson Syndrome (SJS); Isoniazid-induced peripheral neuropathy (prevent with Pyridoxine/Vit B6 25-50mg).',
    formulaOrRegimen: 'Naranjo Adverse Drug Reaction Probability Scale.'
  },
  {
    id: 'dtp-6',
    term: 'DTP 6: Dosage Too High',
    category: 'DTP Categories',
    definition:
      'The dose is excessive, the dosing interval is too frequent, the duration of therapy is too long, or renal/hepatic impairment has resulted in toxic drug accumulation.',
    clinicalSignificance:
      'Concentration-dependent toxicity, organ failure (nephrotoxicity, hepatotoxicity), and acute emergencies.',
    ethiopianPracticeContext:
      'Glibenclamide in elderly patients with declining eGFR leading to recurrent refractory hypoglycemia; unadjusted Gentamicin dosing in acute kidney injury.',
    formulaOrRegimen: 'Cockcroft-Gault CrCl adjustment: Dose = Normal Dose × (CrCl_patient / CrCl_normal).'
  },
  {
    id: 'dtp-7',
    term: 'DTP 7: Non-Adherence (Non-Compliance)',
    category: 'DTP Categories',
    definition:
      'The patient does not understand the instructions, cannot afford the medication, prefers not to take it, forgets doses, or stops medication during religious fasting periods.',
    clinicalSignificance:
      'Therapeutic failure mistakenly interpreted as drug inefficacy, prompting dangerous and unnecessary dose escalation.',
    ethiopianPracticeContext:
      'Out-of-pocket cost barriers; daytime fasting (Tsom/Ramadan) where patients skip morning diuretic or insulin; stopping antibiotics prematurely once fever abates.',
    formulaOrRegimen: 'Morisky Medication Adherence Scale (MMAS-8) & culturally sensitive counseling.'
  },

  // Cardiovascular & Renal
  {
    id: 'map-term',
    term: 'Mean Arterial Pressure (MAP)',
    category: 'Cardiovascular & Renal',
    definition:
      'The average arterial pressure throughout one cardiac cycle, representing the perfusion pressure seen by organs in the body.',
    clinicalSignificance:
      'A MAP ≥ 65 mmHg is necessary to sustain cerebral, coronary, and renal perfusion in acute shock and critical care.',
    ethiopianPracticeContext:
      'Used in ICU and emergency wards (e.g. Black Lion Hospital / TASH) to guide fluid resuscitation and inotropic support.',
    formulaOrRegimen: 'MAP = DBP + 1/3 (SBP - DBP) or MAP = (2*DBP + SBP) / 3'
  },
  {
    id: 'pulse-press',
    term: 'Pulse Pressure (PP)',
    category: 'Cardiovascular & Renal',
    definition:
      'The difference between systolic and diastolic blood pressure (SBP - DBP). Reflects arterial compliance and stroke volume.',
    clinicalSignificance:
      'A widened pulse pressure (>60 mmHg) is a powerful predictor of aortic stiffness, cardiovascular mortality, and isolated systolic hypertension in older adults.',
    ethiopianPracticeContext:
      'Common in elderly Ethiopian hypertensive patients; Calcium Channel Blockers (Amlodipine) are especially effective in reducing systolic pressure without dropping diastolic pressure excessively.',
    formulaOrRegimen: 'PP = Systolic BP - Diastolic BP'
  },
  {
    id: 'ckd-gfr',
    term: 'Glomerular Filtration Rate (eGFR) & Staging',
    category: 'Cardiovascular & Renal',
    definition:
      'The volume of fluid filtered from the renal glomerular capillaries into the Bowman capsule per unit time. Staged G1 (≥90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 mL/min/1.73m²).',
    clinicalSignificance:
      'Dictates dose reduction intervals, contraindications for renally cleared medications, and renal replacement therapy initiation.',
    ethiopianPracticeContext:
      'In resource-limited settings where 24-hr urine collection is infeasible, Cockcroft-Gault CrCl using bedside serum creatinine is the national standard for medication dosing.',
    formulaOrRegimen: 'Cockcroft-Gault: [(140 - Age) * Wt] / [72 * SCr] (* 0.85 if female)'
  },
  {
    id: 'htn-stg',
    term: 'Ethiopian STG Hypertension Management Hierarchy',
    category: 'Cardiovascular & Renal',
    definition:
      'Standard Treatment Guideline protocol for blood pressure control: Stage 1 threshold ≥130/80 mmHg, Stage 2 threshold ≥140/90 mmHg.',
    clinicalSignificance:
      'African ancestry patients typically have low-renin hypertension; CCBs and Thiazides demonstrate superior stroke and BP reduction compared to ACEi/ARB monotherapy.',
    ethiopianPracticeContext:
      'First-line: Amlodipine 5mg or HCTZ 12.5-25mg. If comorbid Diabetes Mellitus or Albuminuria: Enalapril 5-10mg or Losartan 50mg is first-line for renal preservation.',
    formulaOrRegimen: 'Goal BP: <130/80 mmHg for high-risk/DM/CKD; <140/90 mmHg for general adult population.'
  },

  // Endocrine & Metabolic
  {
    id: 'eag-term',
    term: 'Estimated Average Glucose (eAG)',
    category: 'Endocrine & Metabolic',
    definition:
      'The calculated average plasma glucose concentration over the preceding 2 to 3 months based on Glycated Hemoglobin (HbA1c).',
    clinicalSignificance:
      'Helps translate the abstract percentage of HbA1c into daily blood glucose values (mg/dL or mmol/L) that patients and bedside clinicians can intuitively understand.',
    ethiopianPracticeContext:
      'Assists clinical pharmacists during patient counseling in outpatient diabetic clinics to correlate home glucometer logs with laboratory A1c results.',
    formulaOrRegimen: 'eAG (mg/dL) = 28.7 * HbA1c (%) - 46.7; or eAG (mmol/L) = eAG (mg/dL) / 18.018'
  },
  {
    id: 'hypoglycemia-rule-15',
    term: 'Hypoglycemia & "Rule of 15"',
    category: 'Endocrine & Metabolic',
    definition:
      'Blood glucose < 70 mg/dL (3.9 mmol/L). Symptoms include diaphoresis, tremors, tachycardia, confusion, and potential coma.',
    clinicalSignificance:
      'Acute medical emergency. Rapid treatment prevents seizure, neuroglycopenia, and cardiac arrhythmias.',
    ethiopianPracticeContext:
      'Rule of 15: Administer 15g fast-acting simple carbohydrate (3-4 sugar cubes in water, 1/2 cup fruit juice or sweetened tea). Wait 15 minutes, recheck blood glucose. Repeat if still <70 mg/dL. In unconscious patient: IV 40% Dextrose 25-50 mL.',
    formulaOrRegimen: 'Target: Raise BG > 70 mg/dL within 15 minutes.'
  },

  // Infectious Disease & STG
  {
    id: 'dots-tb',
    term: 'DOTS (Directly Observed Therapy Short-Course) for TB',
    category: 'Infectious Disease & STG',
    definition:
      'The standardized internationally recommended strategy for tuberculosis control implemented by the Ethiopian Ministry of Health.',
    clinicalSignificance:
      'Prevents emergence of Multi-Drug Resistant TB (MDR-TB) through supervised adherence.',
    ethiopianPracticeContext:
      'Standard Intensive Phase (2 months): RHZE (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol) with Pyridoxine (Vit B6). Continuation Phase (4 months): RH (Rifampicin + Isoniazid).',
    formulaOrRegimen: '2(RHZE) / 4(RH) fixed-dose combinations dosed by weight band.'
  },
  {
    id: 'art-first-line',
    term: 'First-Line Antiretroviral Therapy (ART)',
    category: 'Infectious Disease & STG',
    definition:
      'The national preferred combination regimen for HIV-1 infection in adolescents and adults in Ethiopia.',
    clinicalSignificance:
      'Suppresses viral load to undetectable levels (<50 copies/mL), reconstitutes CD4 count, and halts clinical transmission.',
    ethiopianPracticeContext:
      'Preferred National Regimen: TDF + 3TC + DTG (Tenofovir Disoproxil Fumarate 300mg + Lamivudine 300mg + Dolutegravir 50mg) taken once daily with or without food. Monitor baseline renal function (SCr) for TDF nephrotoxicity.',
    formulaOrRegimen: 'TLD fixed-dose single tablet taken once daily at bedtime.'
  },

  // Laboratory & Kinetics
  {
    id: 'anion-gap',
    term: 'Serum Anion Gap',
    category: 'Laboratory & Kinetics',
    definition:
      'The difference between measured serum cations (Sodium) and measured anions (Chloride and Bicarbonate). Normal: 8 - 12 mEq/L.',
    clinicalSignificance:
      'Differentiates High Anion Gap Metabolic Acidosis (HAGMA) from Normal Anion Gap (Hyperchloremic) Acidosis.',
    ethiopianPracticeContext:
      'Critical in emergency wards for diagnosing DKA, uremic acidosis, and toxic alcohol poisonings. Causes remembered by MUDPILES mnemonic.',
    formulaOrRegimen: 'Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻)'
  },
  {
    id: 'corr-calcium',
    term: 'Corrected Calcium for Serum Albumin',
    category: 'Laboratory & Kinetics',
    definition:
      'Adjustment of total serum calcium for variations in serum albumin concentration, as ~40-50% of calcium is bound to albumin.',
    clinicalSignificance:
      'In malnutrition, liver disease, or nephrotic syndrome, measured total calcium may appear spuriously low despite normal ionized active calcium.',
    ethiopianPracticeContext:
      'Commonly required in Ethiopian inpatient wards where chronic malnutrition and hypoalbuminemia are prevalent.',
    formulaOrRegimen: 'Corrected Calcium (mg/dL) = Measured Total Ca + 0.8 * (4.0 - Serum Albumin g/dL)'
  },
  {
    id: 'steady-state',
    term: 'Steady-State Concentration (Css) & Half-Life (t1/2)',
    category: 'Laboratory & Kinetics',
    definition:
      'The pharmacokinetic state where the rate of drug administration equals the rate of drug elimination. Reached after 4 to 5 elimination half-lives.',
    clinicalSignificance:
      'Determines when therapeutic drug monitoring (TDM) levels should be drawn and when full clinical efficacy can be evaluated.',
    ethiopianPracticeContext:
      'Important for Phenytoin, Digoxin, and Aminoglycosides. Drawing levels before 4-5 half-lives yields misleading sub-steady-state concentrations.',
    formulaOrRegimen: 'Time to Steady State ≈ 4 to 5 × t1/2'
  }
];
