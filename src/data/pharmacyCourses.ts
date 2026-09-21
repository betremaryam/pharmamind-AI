import { PharmacyCourse } from '../types';

export const PHARMACY_COURSES: PharmacyCourse[] = [
  {
    id: 'antimicrobial-stewardship',
    code: 'PM-CPD-01',
    title: 'Antimicrobial Stewardship & Hospital Infection Pharmacotherapy',
    shortDescription:
      'Master empiric antibiotic selection, WHO AWaRe classification, surgical prophylaxis timing, and TDM-guided dosage optimization in hospital settings.',
    category: 'Infectious Diseases',
    level: 'Intermediate',
    cpdPoints: 4.0,
    durationHours: 4.0,
    accreditationNote: 'Aligned with Ethiopian Ministry of Health Directive No. 332/2020 and National Antimicrobial Stewardship Guidelines.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Antimicrobial resistance constitutes one of the most critical public health threats in hospital practice. This accredited clinical module equips pharmacy practitioners and senior students with evidence-based frameworks to evaluate empiric antibiotic regimens, reduce unnecessary broad-spectrum exposure, execute safe IV-to-oral step-down therapy, and mitigate drug-induced toxicities according to the Ethiopian Standard Treatment Guidelines and WHO AWaRe categories.',
    learningObjectives: [
      'Apply the WHO AWaRe (Access, Watch, Reserve) categorization to hospital formulary requests and ward audits.',
      'Recommend appropriate surgical antimicrobial prophylaxis (SAP) agents, initial timing within 60 minutes prior to surgical incision, and discontinuation within 24 hours post-operatively.',
      'Differentiate between colonization and active infection in catheter-associated urinalysis and respiratory secretions.',
      'Execute therapeutic drug monitoring (TDM) and dosage individualization for aminoglycosides and vancomycin to prevent acute kidney injury.',
      'Establish standardized IV-to-oral conversion criteria for high-bioavailability antimicrobial classes.'
    ],
    guidelinesReferenced: [
      'Ethiopian Standard Treatment Guidelines for General Hospitals (MoH / EFDA)',
      'WHO AWaRe Classification of Antibiotics for Evaluation and Monitoring of Use',
      'Infectious Diseases Society of America (IDSA) Antimicrobial Stewardship Implementation Guidelines'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'ams-mod-1',
        title: 'Module 1: Ethiopian STG Empiric Protocols & The WHO AWaRe Framework',
        durationMinutes: 45,
        summary:
          'Explores how national treatment guidelines establish narrow-spectrum empiric choices to curtail collateral damage while securing rapid pathogen eradication.',
        keyLearningPoints: [
          'Access Group: First- and second-choice antibiotics with lower resistance potential (e.g., Amoxicillin, Ampicillin, Doxycycline, Gentamicin). Must comprise >= 60% of total hospital antibiotic consumption.',
          'Watch Group: Agents with higher resistance potential prioritized for specific clinical syndromes (e.g., Ciprofloxacin, Ceftriaxone, Piperacillin/Tazobactam). Require indication justification.',
          'Reserve Group: Last-resort antibiotics reserved exclusively for confirmed multidrug-resistant pathogens (e.g., Colistin, Linezolid, Meropenem). Should require infectious disease/clinical pharmacist approval.',
          'Empiric therapy should be re-evaluated at 48 to 72 hours based on clinical trajectory and microbiological culture sensitivity reports.'
        ],
        clinicalCaseExample: {
          scenario:
            'A 42-year-old male is admitted with mild non-severe community-acquired pneumonia (CURB-65 = 0). The attending physician orders intravenous Ceftriaxone 1g twice daily plus Ciprofloxacin 500mg PO twice daily.',
          clinicalDecision:
            'Pharmacist recommends de-escalating to oral Amoxicillin 500mg-1000mg TID (or Amoxicillin/Clavulanate) alone, in alignment with Ethiopian STG recommendations for outpatient/mild CAP without pseudomonal risk factors.',
          guidelineAdvice:
            'Dual broad-spectrum coverage with fluoroquinolones in low-risk CAP violates stewardship protocols and needlessly increases Clostridioides difficile risks.'
        }
      },
      {
        id: 'ams-mod-2',
        title: 'Module 2: Surgical Antimicrobial Prophylaxis (SAP) Principles',
        durationMinutes: 45,
        summary:
          'Details the critical timing, weight-based dosing, intraoperative redosing intervals, and strict post-operative cessation of surgical prophylaxis.',
        keyLearningPoints: [
          'Optimal Infusion Timing: Prophylactic antibiotic must be fully infused within 30 to 60 minutes prior to skin incision (120 minutes for Vancomycin or Fluoroquinolones) so tissue concentrations exceed MIC at the moment of initial incision.',
          'First-Line Agent: Cefazolin 2g IV (3g for patients weighing >= 120 kg) is the standard of care for clean-contaminated procedures.',
          'Intraoperative Redosing: Required if surgery duration exceeds two half-lives of the antibiotic (e.g., every 4 hours for Cefazolin) or if excessive blood loss (> 1,500 mL) occurs.',
          'Post-Operative Duration: Discontinue within 24 hours of surgical closure (or ideally immediately upon wound closure). Prolonged multi-day post-op antibiotics do not prevent surgical site infections and drive resistant colonization.'
        ]
      },
      {
        id: 'ams-mod-3',
        title: 'Module 3: Aminoglycoside & Vancomycin Safety & Monitoring',
        durationMinutes: 60,
        summary:
          'Evidence-based strategies to maximize bactericidal killing (Cmax/MIC or AUC/MIC) while protecting renal tubules and eighth cranial nerve function.',
        keyLearningPoints: [
          'Once-Daily (Extended-Interval) Aminoglycoside Dosing: Gentamicin 5 to 7 mg/kg once daily achieves superior concentration-dependent killing and post-antibiotic effect while allowing drug clearance below toxic trough levels (< 1 mcg/mL).',
          'Avoid Combining Nephrotoxins: Concomitant administration of Gentamicin with Furosemide, NSAIDs, or Vancomycin exponentially accelerates tubulointerstitial damage.',
          'Vancomycin AUC/MIC Targeting: Modern guidelines emphasize targeting an AUC24/MIC ratio of 400 to 600 mg*h/L rather than aggressive high trough concentrations (15-20 mcg/mL), which carry higher acute kidney injury rates.',
          'Baseline and alternate-day serum creatinine and calculated CrCl monitoring is mandatory during active therapy.'
        ]
      },
      {
        id: 'ams-mod-4',
        title: 'Module 4: IV-to-Oral Step-Down & Early De-escalation',
        durationMinutes: 45,
        summary:
          'Criteria and operational workflows for safely transitioning hospitalized patients from parenteral to oral therapy.',
        keyLearningPoints: [
          'Step-Down Criteria: Hemodynamically stable, afebrile for >= 24 hours, normalizing white blood cell count, intact functional GI tract capable of absorbing oral medications.',
          'High Bioavailability Agents: Ciprofloxacin (70-80%), Levofloxacin (99%), Metronidazole (>90%), Doxycycline (100%), and Linezolid (100%) achieve therapeutic serum levels equivalent to intravenous routes.',
          'Benefits: Eliminates central/peripheral cannula line-infection risks, reduces hospital stay duration, minimizes nursing workload, and dramatically lowers drug acquisition costs.'
        ]
      }
    ],
    quiz: [
      {
        id: 'ams-q1',
        question:
          'According to the WHO AWaRe classification and Ethiopian antimicrobial stewardship guidelines, which of the following antibiotics belongs to the "Access" group and is the preferred narrow-spectrum first-line choice for uncomplicated community infections?',
        options: ['Meropenem', 'Ciprofloxacin', 'Amoxicillin', 'Ceftriaxone'],
        correctIndex: 2,
        explanation:
          'Amoxicillin is in the WHO Access group. Meropenem is in the Reserve group, while Ciprofloxacin and Ceftriaxone belong to the Watch group.',
        guidelineReference: 'WHO AWaRe Classification 2023 & Ethiopian STG for General Hospitals'
      },
      {
        id: 'ams-q2',
        question:
          'For an elective clean-contaminated abdominal surgery, what is the guideline-recommended initial timing for intravenous Cefazolin surgical antimicrobial prophylaxis?',
        options: [
          'Given 6 to 8 hours prior to surgery in the surgical ward',
          'Infused within 30 to 60 minutes prior to surgical incision',
          'Initiated in the recovery room after skin incision closure',
          'Administered continuously over 72 hours post-operatively'
        ],
        correctIndex: 1,
        explanation:
          'Surgical antimicrobial prophylaxis must be administered within 30 to 60 minutes before skin incision so that bactericidal tissue concentrations peak at the precise moment incision occurs.',
        guidelineReference: 'Ethiopian MoH Hospital Infection Prevention & Patient Safety (IPPS) Guidelines'
      },
      {
        id: 'ams-q3',
        question:
          'A patient receiving IV Gentamicin for Enterococcal bacteremia has a rising serum creatinine from 0.9 mg/dL to 2.1 mg/dL. Which pharmacotherapeutic intervention should the clinical pharmacist immediately advise?',
        options: [
          'Double the Gentamicin dose to overcome bacterial tolerance',
          'Immediately hold Gentamicin, obtain a trough serum concentration, assess hydration, and consult for less nephrotoxic regimen alternatives',
          'Add oral Ibuprofen 400mg TID to relieve flank pain',
          'Continue the same dose because aminoglycoside nephrotoxicity is strictly cosmetic'
        ],
        correctIndex: 1,
        explanation:
          'Gentamicin causes acute tubular necrosis. A serum creatinine doubling indicates acute kidney injury. The drug must be held, trough levels measured, nephrotoxic co-medications discontinued, and renal recovery supported.',
        guidelineReference: 'Ethiopian STG & KDIGO Clinical Practice Guideline for Acute Kidney Injury'
      },
      {
        id: 'ams-q4',
        question:
          'Which clinical scenario satisfies guideline criteria for converting an inpatient from intravenous to oral antibiotic therapy?',
        options: [
          'Active intractable vomiting and paralytic ileus',
          'Afebrile for 36 hours, tolerating oral food/fluids, normalizing WBC count, and hemodynamically stable',
          'Septic shock requiring norepinephrine infusion in the ICU',
          'Patient preference to avoid oral tablets despite normal bowel function'
        ],
        correctIndex: 1,
        explanation:
          'IV-to-oral step-down requires clinical stability, defervescence (afebrile >= 24 hrs), improving inflammatory markers, and a functioning gastrointestinal tract capable of oral absorption.',
        guidelineReference: 'National Antimicrobial Stewardship Framework, Ethiopian MoH'
      },
      {
        id: 'ams-q5',
        question:
          'A 55-year-old female with an indwelling urinary catheter has a routine urinalysis showing 10^5 CFU/mL E. coli, but is completely asymptomatic with normal vitals and no dysuria, suprapubic pain, or fever. What is the correct antimicrobial stewardship decision?',
        options: [
          'Initiate IV Meropenem 1g every 8 hours for 14 days',
          'Diagnose asymptomatic bacteriuria (ASB); do NOT treat with antibiotics, but assess catheter indication and remove if no longer needed',
          'Order oral Ciprofloxacin 500mg twice daily for 21 days',
          'Irrigate the bladder with concentrated Chlorhexidine solution'
        ],
        correctIndex: 1,
        explanation:
          'Asymptomatic bacteriuria in catheterized patients should not receive antibiotic therapy (except in pregnancy or prior to invasive urological procedures), as treatment does not prevent subsequent CAUTI and breeds resistant pathogens.',
        guidelineReference: 'IDSA Guidelines for Asymptomatic Bacteriuria & Ethiopian MoH STG'
      },
      {
        id: 'ams-q6',
        question:
          'Why is once-daily (extended-interval) dosing of Gentamicin (5-7 mg/kg) preferred over traditional multiple-daily dosing (1.5 mg/kg TID) in patients with preserved renal function?',
        options: [
          'Because Gentamicin exhibits time-dependent killing requiring continuous low blood levels',
          'Because Gentamicin displays concentration-dependent bacterial killing (high Cmax/MIC ratio) and a prolonged post-antibiotic effect with lower nephrotoxic trough accumulation',
          'Because Gentamicin is converted to Penicillin at high doses',
          'Because once-daily dosing avoids all renal filtration'
        ],
        correctIndex: 1,
        explanation:
          'Aminoglycosides exhibit concentration-dependent killing and a significant post-antibiotic effect. A large single daily dose produces high peak concentrations (maximizing bacterial kill) and allows serum levels to drop below 1 mcg/mL for several hours, minimizing renal cortical uptake.',
        guidelineReference: 'Basic Clinical Pharmacokinetics & Ethiopian STG'
      },
      {
        id: 'ams-q7',
        question:
          'A surgical patient weighing 135 kg is scheduled for an elective cholecystectomy. What is the appropriate initial prophylactic dose of Cefazolin?',
        options: ['500 mg IV', '1 g IV', '2 g IV', '3 g IV'],
        correctIndex: 3,
        explanation:
          'For surgical antimicrobial prophylaxis with Cefazolin, patients weighing 120 kg or greater should receive 3 g IV instead of the standard 2 g IV to ensure adequate therapeutic tissue concentrations during surgery.',
        guidelineReference: 'ASHP/IDSA/SIS/SHEA Surgical Antimicrobial Prophylaxis Guidelines'
      },
      {
        id: 'ams-q8',
        question:
          'Which oral antibiotic possesses nearly 100% oral bioavailability, making it an ideal candidate for early IV-to-oral step-down therapy in skin, soft tissue, and pneumonia infections?',
        options: ['Oral Vancomycin', 'Linezolid', 'Gentamicin oral solution', 'Cefazolin oral syrup'],
        correctIndex: 1,
        explanation:
          'Linezolid exhibits approximately 100% oral bioavailability. Oral Vancomycin is not absorbed systemically (only used for C. difficile), and Gentamicin and Cefazolin cannot be given orally for systemic infections.',
        guidelineReference: 'Applied Therapeutics & Ethiopian National Formulary'
      },
      {
        id: 'ams-q9',
        question:
          'What is the maximum recommended duration of post-operative surgical antimicrobial prophylaxis for clean and clean-contaminated surgical procedures without active infection?',
        options: [
          'Continue until all surgical drains and sutures are removed (10-14 days)',
          '7 full days of broad-spectrum cephalosporins',
          'Discontinue within 24 hours of surgical completion (ideally immediately on wound closure)',
          'Until the patient is discharged home'
        ],
        correctIndex: 2,
        explanation:
          'Evidence strongly demonstrates that continuing antimicrobial prophylaxis beyond 24 hours post-operatively confers zero additional protection against surgical site infections and substantially increases the risk of C. difficile and antimicrobial resistance.',
        guidelineReference: 'WHO Global Guidelines for the Prevention of Surgical Site Infection & Ethiopian MoH'
      },
      {
        id: 'ams-q10',
        question:
          'When monitoring inpatient Vancomycin therapy for severe MRSA bloodstream infections, what pharmacokinetic parameter is currently recommended by consensus guidelines to balance efficacy and safety?',
        options: [
          'Peak serum concentration between 80-100 mcg/mL',
          'AUC24 / MIC ratio of 400 to 600 mg*h/L (assuming MIC <= 1 mg/L)',
          'Random spot check at day 14 of therapy only',
          'Urine dipstick protein level alone'
        ],
        correctIndex: 1,
        explanation:
          'Consensus guidelines endorse targeting an AUC24/MIC of 400 to 600 mg*h/L. Targeting aggressive high trough levels (15-20 mcg/mL) without AUC estimation results in a significantly elevated incidence of nephrotoxicity without clinical superiority.',
        guidelineReference: 'Consensus Guidelines for Therapeutic Monitoring of Vancomycin (ASHP/IDSA/PIDS)'
      }
    ]
  },
  {
    id: 'renal-pharmacotherapy',
    code: 'PM-CPD-02',
    title: 'Renal Pharmacotherapy & Cockcroft-Gault Dosage Individualization',
    shortDescription:
      'Evaluate impaired glomerular filtration, select appropriate body weight descriptors, adjust high-risk drug regimens, and avoid nephrotoxic drug combinations.',
    category: 'Nephrology',
    level: 'Intermediate',
    cpdPoints: 3.5,
    durationHours: 3.5,
    accreditationNote: 'Accredited CPD module for clinical pharmacists and hospital healthcare professionals.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Impaired renal function dramatically alters drug clearance, volume of distribution, and protein binding. This course provides comprehensive training in calculating patient-specific Creatinine Clearance using the Cockcroft-Gault equation with appropriate weight adjustments (Actual, Ideal, or Adjusted Body Weight), adjusting narrow-therapeutic-index drugs, establishing safe cut-offs for oral antidiabetics, and recognizing preventable drug-induced nephrotoxicity.',
    learningObjectives: [
      'Accurately calculate Creatinine Clearance (CrCl) utilizing patient gender, age, serum creatinine, and the mathematically correct body weight descriptor.',
      'Differentiate when to apply the Cockcroft-Gault equation versus eGFR equations (CKD-EPI) when consulting FDA and Ethiopian drug dosing monographs.',
      'Formulate precise renal dose adjustments for hydrophilic antimicrobials (Ciprofloxacin, Fluconazole, Meropenem) and Enoxaparin.',
      'Identify and intercept the "Triple Whammy" drug interaction (NSAID + ACEi/ARB + Diuretic) to avert acute kidney injury.',
      'Recognize high-alert drugs whose active metabolites accumulate in renal compromise (e.g. Morphine, Glibenclamide).'
    ],
    guidelinesReferenced: [
      'Kidney Disease: Improving Global Outcomes (KDIGO) Clinical Practice Guidelines',
      'Ethiopian Standard Treatment Guidelines for General Hospitals (Renal Section)',
      'FDA & EMA Guideline on the Evaluation of the Pharmacokinetics of Medicinal Products in Patients with Impaired Renal Function'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'renal-mod-1',
        title: 'Module 1: The Cockcroft-Gault Equation & Weight Descriptors',
        durationMinutes: 45,
        summary:
          'How to select Total, Ideal (IBW), or Adjusted (AdjBW) weight to prevent severe drug under- or overdosing.',
        keyLearningPoints: [
          'The Cockcroft-Gault formula: CrCl = [(140 - Age) * Weight (kg)] / [72 * Scr (mg/dL)] * (0.85 if Female).',
          'Underweight patients (Actual < IBW): Always use Actual Body Weight because muscle mass and creatinine generation are diminished.',
          'Normal weight patients (Actual within 100-120% of IBW): Use Ideal Body Weight (IBW) calculated via the Devine formula.',
          'Obese patients (Actual > 120% of IBW): Use Adjusted Body Weight (AdjBW = IBW + 0.4 * [Actual - IBW]) to avoid overestimating creatinine clearance from excess adipose tissue.'
        ]
      },
      {
        id: 'renal-mod-2',
        title: 'Module 2: High-Alert Renally Cleared Antimicrobials',
        durationMinutes: 45,
        summary:
          'Practical dose reductions and interval extension rules for common inpatient antibiotics.',
        keyLearningPoints: [
          'Ciprofloxacin: Normal dose 500mg-750mg q12h. For CrCl 30-50 mL/min, reduce to 250-500mg q12h. For CrCl < 30 mL/min, administer 250-500mg once every 18-24 hours to prevent CNS excitation, seizures, and crystalluria.',
          'Cefepime: Accumulation in renal failure causes neurotoxicity (encephalopathy, myoclonus, status epilepticus). Strict dose reduction when CrCl <= 50 mL/min.',
          'Fluconazole: 100% of standard dose on Day 1 loading; if CrCl <= 50 mL/min (and not on hemodialysis), administer 50% of the normal daily dose thereafter.',
          'Tenofovir Disoproxil Fumarate (TDF): When CrCl is 30-49 mL/min, adjust dosing to 300mg every 48 hours. When CrCl < 30 mL/min, consider substituting with Abacavir or Zidovudine-based regimens.'
        ]
      },
      {
        id: 'renal-mod-3',
        title: 'Module 3: Diabetes & Anticoagulant Thresholds in CKD',
        durationMinutes: 45,
        summary:
          'Managing Metformin lactic acidosis risks, Sulfonylurea clearance, and Enoxaparin accumulation.',
        keyLearningPoints: [
          'Metformin: eGFR 45-59 mL/min -> Max dose 1,000 mg/day with renal monitoring every 3-6 months. eGFR 30-44 mL/min -> Max dose 500 mg/day (or avoid initiation). eGFR < 30 mL/min -> Strictly contraindicated due to severe lactic acidosis risk.',
          'Glibenclamide: Active metabolites accumulate in renal impairment, triggering refractory hypoglycemic coma. Strongly prefer Gliclazide, Glipizide, or Insulin in renal compromise.',
          'Enoxaparin: Renally eliminated. In CrCl < 30 mL/min, the therapeutic dose for DVT/PE or ACS must be reduced from 1 mg/kg q12h to 1 mg/kg once daily (q24h), or unfractionated heparin (UFH) substituted.'
        ]
      },
      {
        id: 'renal-mod-4',
        title: 'Module 4: Drug-Induced Kidney Injury & The "Triple Whammy"',
        durationMinutes: 45,
        summary:
          'Mechanisms of acute hemodynamic renal failure and preventative clinical pharmacy intercepts.',
        keyLearningPoints: [
          'Afferent Arteriolar Vasodilation: Maintained by renal prostaglandins. NSAIDs (Diclofenac, Ibuprofen) block prostaglandin synthesis, constricting afferent arterioles and dropping glomerular hydrostatic pressure.',
          'Efferent Arteriolar Vasoconstriction: Maintained by Angiotensin II. ACE inhibitors and ARBs block this, dilating the efferent arteriole.',
          'The "Triple Whammy": Combining an NSAID + ACEi/ARB + Diuretic starves the glomerulus of blood flow and pressure, precipitating severe acute kidney injury (AKI). Clinical pharmacists must actively intervene to substitute topical analgesics or Paracetamol.'
        ]
      }
    ],
    quiz: [
      {
        id: 'ren-q1',
        question:
          'A 68-year-old female patient has an actual body weight of 92 kg and an ideal body weight (IBW) of 55 kg (167% of IBW, classified as obese). Which weight descriptor should the clinical pharmacist use in the Cockcroft-Gault equation to avoid dangerously overestimating renal clearance?',
        options: [
          'Actual Body Weight (92 kg)',
          'Adjusted Body Weight (IBW + 0.4 * [Actual - IBW] = ~70 kg)',
          'Zero kilograms',
          'Divide her weight by her height in inches'
        ],
        correctIndex: 1,
        explanation:
          'In obese patients (> 120% of IBW), using Actual Body Weight overestimates CrCl because adipose tissue does not produce creatinine at the same rate as muscle. Adjusted Body Weight accounts for extracellular fluid expansion while preventing drug overdosing.',
        guidelineReference: 'KDIGO Clinical Practice Guideline & Clinical Pharmacokinetics Principles'
      },
      {
        id: 'ren-q2',
        question:
          'A 74-year-old male with chronic kidney disease has a calculated CrCl of 22 mL/min. The medical team plans to order oral Ciprofloxacin for a complex urinary tract infection. What is the guideline-directed dose adjustment?',
        options: [
          'Increase the dose to 1,000 mg every 6 hours',
          'Reduce dose to 250 mg to 500 mg administered once every 18 to 24 hours',
          'No adjustment is necessary as Ciprofloxacin undergoes 100% hepatic metabolism',
          'Switch to intravenous Gentamicin at maximum dose'
        ],
        correctIndex: 1,
        explanation:
          'Ciprofloxacin is 40-50% cleared by the kidneys unchanged. In severe renal impairment (CrCl < 30 mL/min), accumulation causes severe neurotoxicity (confusion, hallucinations, seizures). Dose must be reduced to 250-500mg every 18-24 hours.',
        guidelineReference: 'Ethiopian National Formulary & FDA Ciprofloxacin Monograph'
      },
      {
        id: 'ren-q3',
        question:
          'Under international KDIGO and Ethiopian diabetes management guidelines, at what eGFR threshold is Metformin strictly contraindicated due to the risk of fatal lactic acidosis?',
        options: [
          'eGFR < 60 mL/min/1.73m2',
          'eGFR < 45 mL/min/1.73m2',
          'eGFR < 30 mL/min/1.73m2',
          'eGFR < 90 mL/min/1.73m2'
        ],
        correctIndex: 2,
        explanation:
          'Metformin is cleared primarily unchanged by renal tubular secretion. An eGFR < 30 mL/min dramatically elevates plasma metformin levels, inhibiting mitochondrial complex I and precipitating life-threatening lactic acidosis.',
        guidelineReference: 'KDIGO Diabetes Management in CKD Guidelines & Ethiopian STG'
      },
      {
        id: 'ren-q4',
        question:
          'The dangerous "Triple Whammy" drug interaction leading to acute hemodynamic renal collapse involves which triad of medications?',
        options: [
          'Paracetamol + Amoxicillin + Vitamin C',
          'NSAID (e.g., Diclofenac) + ACE Inhibitor/ARB (e.g., Enalapril) + Diuretic (e.g., Furosemide or Hydrochlorothiazide)',
          'Metformin + Glibenclamide + Insulin',
          'Amlodipine + Atorvastatin + Omeprazole'
        ],
        correctIndex: 1,
        explanation:
          'Diuretics induce hypovolemia; NSAIDs block afferent arteriolar vasodilation; ACE inhibitors block efferent arteriolar vasoconstriction. Together, glomerular filtration pressure completely collapses, inducing severe acute kidney injury.',
        guidelineReference: 'British National Formulary & Ethiopian Clinical Pharmacy Preceptorship Modules'
      },
      {
        id: 'ren-q5',
        question:
          'Why is Glibenclamide (Glyburide) strongly discouraged in patients with moderate to severe renal disease (CrCl < 50 mL/min) in favor of Gliclazide or Insulin?',
        options: [
          'It causes severe acute hypercalcemia',
          'Its active metabolites are renally cleared and accumulate, causing prolonged, refractory, and potentially fatal hypoglycemia',
          'It neutralizes all blood pressure medications',
          'It is rapidly degraded in the stomach'
        ],
        correctIndex: 1,
        explanation:
          'Glibenclamide produces active metabolites (4-trans-hydroxyglibenclamide) that depend on renal elimination. In renal failure, these accumulate and continuously stimulate pancreatic beta cells, causing persistent hypoglycemia lasting days.',
        guidelineReference: 'Ethiopian Standard Treatment Guidelines & American Diabetes Association (ADA)'
      },
      {
        id: 'ren-q6',
        question:
          'For a patient with deep vein thrombosis and a calculated CrCl of 24 mL/min, how should therapeutic full-dose Enoxaparin be adjusted according to dosing guidelines?',
        options: [
          'Continue standard 1 mg/kg subcutaneously every 12 hours without change',
          'Reduce the dose to 1 mg/kg subcutaneously once daily (every 24 hours), or transition to Unfractionated Heparin (UFH)',
          'Increase the dose to 2 mg/kg subcutaneously every 8 hours',
          'Enoxaparin can only be given orally in kidney disease'
        ],
        correctIndex: 1,
        explanation:
          'Enoxaparin is eliminated by renal filtration. In severe renal impairment (CrCl < 30 mL/min), anti-Xa activity accumulates significantly, multiplying major bleeding risks. The therapeutic dose must be reduced to 1 mg/kg once daily, or IV unfractionated heparin used with aPTT monitoring.',
        guidelineReference: 'CHEST Antithrombotic Therapy Guidelines & FDA Enoxaparin Package Insert'
      },
      {
        id: 'ren-q7',
        question:
          'Which opioid analgesic generates a neurotoxic active metabolite (Morphine-6-glucuronide and Morphine-3-glucuronide) that accumulates in renal impairment, causing profound sedation, myoclonus, and respiratory depression?',
        options: ['Fentanyl', 'Morphine', 'Methadone', 'Paracetamol'],
        correctIndex: 1,
        explanation:
          'Morphine glucuronide metabolites accumulate in renal failure and cross the blood-brain barrier, triggering severe toxicity. Fentanyl and Methadone undergo predominantly hepatic clearance without active renal metabolites and are safer choices in renal disease.',
        guidelineReference: 'Palliative Care Pharmacotherapy & Ethiopian Pain Management Guidelines'
      },
      {
        id: 'ren-q8',
        question:
          'When calculating Creatinine Clearance in an 82-year-old cachectic female whose actual body weight is 38 kg and whose reported serum creatinine is 0.4 mg/dL due to severe muscle wasting, what clinical caveat must the pharmacist consider?',
        options: [
          'Her renal clearance is supernormal and exceed 200 mL/min',
          'Serum creatinine reflects low muscle mass rather than true high GFR; rounding up low Scr (e.g. to 0.8-1.0 mg/dL) or recognizing overestimation of CrCl is essential to prevent medication toxicities',
          'Age has no effect on renal filtration rate',
          'She does not require any medications'
        ],
        correctIndex: 1,
        explanation:
          'In elderly cachectic patients with profound muscle wasting, serum creatinine production is markedly reduced. An artificially low Scr generates a falsely elevated calculated CrCl if accepted blindly, causing hazardous drug overdosing.',
        guidelineReference: 'Clinical Pharmacokinetics Concepts & KDIGO Practice Guidelines'
      },
      {
        id: 'ren-q9',
        question:
          'What is the initial dosing adjustment for oral Fluconazole when treating systemic fungal infections in a patient with an estimated CrCl <= 50 mL/min who is not receiving hemodialysis?',
        options: [
          'Administer 100% of the standard loading dose on Day 1, followed by 50% of the standard daily maintenance dose thereafter',
          'Withhold all therapy as Fluconazole is 100% nephrotoxic',
          'Give ten times the standard dose once monthly',
          'Switch immediately to oral Ketoconazole'
        ],
        correctIndex: 0,
        explanation:
          'Fluconazole is cleared predominantly (up to 80%) unchanged in urine. Guidelines specify giving a full 100% loading dose on Day 1 to rapidly reach steady-state target concentrations, followed by a 50% reduction in daily maintenance dosing when CrCl is 50 mL/min or less.',
        guidelineReference: 'IDSA Mycoses Guidelines & Ethiopian National Formulary'
      },
      {
        id: 'ren-q10',
        question:
          'Which antimicrobial is known to cause severe neurotoxicity presenting as encephalopathy, confusion, myoclonus, and non-convulsive status epilepticus if doses are not adjusted for renal impairment?',
        options: ['Azithromycin', 'Cefepime', 'Metronidazole', 'Doxycycline'],
        correctIndex: 1,
        explanation:
          'Cefepime is eliminated via glomerular filtration. When CrCl is impaired and dose adjustments are overlooked, cefepime crosses the blood-brain barrier and exhibits competitive antagonism of GABA receptors, triggering severe neurotoxicity.',
        guidelineReference: 'FDA Drug Safety Communication on Cefepime Neurotoxicity & KDIGO'
      }
    ]
  },
  {
    id: 'cardiovascular-pharmacotherapy',
    code: 'PM-CPD-03',
    title: 'Cardiovascular Pharmacotherapy & Hypertension Management',
    shortDescription:
      'Explore stepwise antihypertensive therapy, heart failure GDMT, calcium channel blocker pedal edema management, and Digoxin monitoring.',
    category: 'Cardiology',
    level: 'Advanced',
    cpdPoints: 4.0,
    durationHours: 4.0,
    accreditationNote: 'Accredited CPD module aligned with Ethiopian MoH National NCD Guidelines and ACC/AHA standards.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Cardiovascular diseases represent a surging cause of hospital admissions and premature mortality in Ethiopia. This course equips pharmacists with bedside clinical acumen to optimize multi-drug antihypertensive regimens, initiate and titrate Guideline-Directed Medical Therapy (GDMT) for Heart Failure with Reduced Ejection Fraction (HFrEF), identify electrolyte derangements, and prevent life-threatening medication errors.',
    learningObjectives: [
      'Apply Ethiopian MoH and international hypertension guidelines to initiate monotherapy or single-pill combination therapy based on baseline blood pressure stages.',
      'Differentiate between precapillary arteriolar vasodilation edema from dihydropyridine calcium channel blockers versus volume-overload heart failure edema.',
      'Construct a comprehensive 4-pillar GDMT regimen for patients with Heart Failure with Reduced Ejection Fraction (HFrEF).',
      'Manage Renin-Angiotensin System inhibitor adverse drug reactions, including hyperkalemia, acute serum creatinine bumps, and bradykinin-mediated cough.',
      'Conduct therapeutic monitoring for Digoxin and identify hypokalemia-induced glycoside toxicity.'
    ],
    guidelinesReferenced: [
      'Ethiopian National Guideline for the Management of Hypertension (Ministry of Health)',
      'AHA/ACC/HFSA Guideline for the Management of Heart Failure',
      'KDIGO 2021 Clinical Practice Guideline for the Management of Blood Pressure in CKD'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'cv-mod-1',
        title: 'Module 1: Ethiopian MoH Hypertension Algorithm & Combination Therapy',
        durationMinutes: 45,
        summary:
          'Stepwise regimens, BP goals (<130/80 mmHg), and when to mandate dual first-line therapy.',
        keyLearningPoints: [
          'First-Line Core Classes: Thiazide/thiazide-like diuretics (HCTZ, Chlorthalidone), Dihydropyridine CCBs (Amlodipine), and ACE inhibitors (Enalapril) or ARBs (Losartan, Candesartan).',
          'Stage 2 Hypertension (BP >= 140/90 mmHg or > 20/10 mmHg above target): Guidelines recommend initiating dual combination therapy (e.g., Amlodipine + Enalapril or Amlodipine + HCTZ) rather than single-agent titration.',
          'Compelling Indications: In patients with diabetes or CKD with albuminuria, an ACEi or ARB is mandatory first-line therapy for renal preservation.',
          'Never combine an ACE inhibitor with an ARB or direct renin inhibitor due to synergistic hyperkalemia and renal failure without cardiovascular benefit.'
        ]
      },
      {
        id: 'cv-mod-2',
        title: 'Module 2: CCB Pedal Edema vs. Heart Failure Edema & Cough Management',
        durationMinutes: 45,
        summary:
          'Resolving common adverse drug effects without abruptly discontinuing essential blood pressure control.',
        keyLearningPoints: [
          'Amlodipine Pedal Edema: Caused by selective precapillary arteriolar dilation without postcapillary venular dilation, leading to capillary fluid extravasation. It is NOT fluid overload and does NOT respond well to loop diuretics (Furosemide).',
          'Edema Solution: Co-administer an ACE inhibitor or ARB, which dilates the postcapillary venule, normalizing intracapillary pressure and resolving the edema.',
          'ACE-Inhibitor Dry Cough: Mediated by accumulation of bradykinin and substance P in the upper respiratory tract. Occurs in up to 10-15% of patients. Solution: Switch to an ARB (Losartan, Telmisartan) which does not inhibit kininase II.'
        ]
      },
      {
        id: 'cv-mod-3',
        title: 'Module 3: The Four Pillars of HFrEF GDMT',
        durationMinutes: 45,
        summary:
          'Maximizing survival and preventing recurrent rehospitalization in reduced ejection fraction heart failure.',
        keyLearningPoints: [
          'Pillar 1: ARNI (Sacubitril/Valsartan) or ACEi/ARB. Note: 36-hour washout mandatory when switching from ACEi to ARNI to prevent fatal angioedema.',
          'Pillar 2: Evidence-Based Beta-Blocker (Bisoprolol, Carvedilol, or Metoprolol Succinate). Must be initiated when euvolemic and slowly uptitrated.',
          'Pillar 3: Mineralocorticoid Receptor Antagonist (MRA: Spironolactone or Eplerenone). Monitor serum potassium and creatinine at 1, 4, and 12 weeks.',
          'Pillar 4: SGLT2 Inhibitor (Dapagliflozin or Empagliflozin). Demonstrates class-effect mortality and hospitalization reductions regardless of diabetes status.'
        ]
      },
      {
        id: 'cv-mod-4',
        title: 'Module 4: Digoxin Safety, Hypokalemia & Toxicity',
        durationMinutes: 45,
        summary:
          'Maintaining narrow therapeutic concentrations (0.5 - 0.9 ng/mL) and recognizing arrhythmias.',
        keyLearningPoints: [
          'Therapeutic Target: 0.5 to 0.9 ng/mL for heart failure. Concentrations > 1.2 ng/mL provide zero additional inotropic benefit and sharply increase mortality.',
          'Electrolyte Sensitization: Hypokalemia and hypomagnesemia drastically sensitize the myocardial Na+/K+ ATPase pump to Digoxin, triggering fatal arrhythmias even at normal serum levels.',
          'Toxicity Symptoms: Anorexia, nausea, vomiting, yellow-green visual halos (xanthopsia), sinus bradycardia, heart blocks, ventricular bigeminy.',
          'Drug Interactions: Amiodarone, Verapamil, and Clarithromycin inhibit P-glycoprotein, doubling serum Digoxin concentrations; dose must be halved preemptively.'
        ]
      }
    ],
    quiz: [
      {
        id: 'cv-q1',
        question:
          'A 58-year-old male with newly diagnosed hypertension presents with a clinic blood pressure of 164/102 mmHg (Stage 2 Hypertension). In accordance with the Ethiopian MoH Hypertension Guidelines, what is the best initial pharmacotherapy strategy?',
        options: [
          'Lifestyle modifications alone for 12 months with no medications',
          'Initiate dual combination therapy with two first-line agents of complementary mechanisms (e.g., Amlodipine 5mg plus Enalapril 10mg)',
          'High-dose Furosemide 160 mg IV stat',
          'Sublingual Nifedipine immediate-release capsules as needed'
        ],
        correctIndex: 1,
        explanation:
          'In Stage 2 hypertension (> 20/10 mmHg above goal), initial combination therapy with two first-line classes (CCB + ACEi/ARB or CCB + Thiazide) achieves faster, sustained BP control with fewer dose-dependent side effects than single-agent titration.',
        guidelineReference: 'Ethiopian National Guideline for the Management of Hypertension (MoH)'
      },
      {
        id: 'cv-q2',
        question:
          'A 62-year-old female taking Amlodipine 10mg daily complains of progressive bilateral lower extremity swelling around both ankles. Her lungs are clear to auscultation, jugular venous pressure is normal, and she has no orthopnea. What is the pharmacological etiology and recommended intervention?',
        options: [
          'Acute congestive heart failure; prescribe high-dose IV Furosemide',
          'Precapillary arteriolar vasodilation causing hydrostatic fluid extravasation; reduce Amlodipine to 5mg and add an ACE inhibitor or ARB to induce postcapillary venodilation',
          'Acute deep vein thrombosis; initiate Warfarin therapy',
          'Allergic anaphylaxis to calcium tablets'
        ],
        correctIndex: 1,
        explanation:
          'Dihydropyridine CCBs cause preferential precapillary vasodilation without balancing postcapillary venular tone, increasing transcapillary hydrostatic pressure. Adding an ACE inhibitor or ARB promotes balanced postcapillary venodilation, resolving edema without requiring diuretics.',
        guidelineReference: 'Cardiovascular Pharmacotherapy Principles & Ethiopian MoH Guidelines'
      },
      {
        id: 'cv-q3',
        question:
          'A 52-year-old hypertensive patient taking Enalapril 10mg daily develops a persistent, non-productive nocturnal cough that has failed multiple anti-tussive syrups. What is the clinical pharmacist’s assessment and recommendation?',
        options: [
          'The cough is caused by bradykinin and substance P accumulation due to ACE inhibition; switch Enalapril to an Angiotensin Receptor Blocker (ARB) such as Losartan or Candesartan',
          'Prescribe oral Amoxicillin for bacterial bronchitis',
          'Double the Enalapril dose to overcome bronchial irritation',
          'Instruct the patient that the cough signifies effective heart protection and must be tolerated'
        ],
        correctIndex: 0,
        explanation:
          'ACE inhibitors inhibit kininase II, preventing the breakdown of bradykinin and substance P, leading to bronchial irritation and dry cough in up to 10-15% of patients. ARBs do not inhibit kininase II and do not cause bradykinin cough, making them the standard replacement.',
        guidelineReference: 'ACC/AHA Hypertension Guidelines & Ethiopian National Formulary'
      },
      {
        id: 'cv-q4',
        question:
          'When switching a patient with heart failure with reduced ejection fraction (HFrEF) from an ACE inhibitor (e.g., Enalapril) to an ARNI (Sacubitril/Valsartan), what strict rule must be enforced to prevent life-threatening angioedema?',
        options: [
          'No delay is needed; start immediately with the next scheduled dose',
          'Enforce a strict 36-hour washout period between the last dose of Enalapril and the first dose of Sacubitril/Valsartan',
          'Give both drugs together at double doses for 2 weeks',
          'Administer IV Adrenaline prior to every tablet'
        ],
        correctIndex: 1,
        explanation:
          'Both neprilysin inhibitors and ACE inhibitors inhibit the breakdown of bradykinin. Co-administering them or failing to observe a 36-hour washout period can cause massive bradykinin accumulation and fatal angioedema.',
        guidelineReference: 'AHA/ACC/HFSA Heart Failure Guidelines'
      },
      {
        id: 'cv-q5',
        question:
          'A 70-year-old heart failure patient on Digoxin 0.25mg daily and Furosemide 40mg daily presents with nausea, yellow-tinged vision (xanthopsia), and ventricular premature beats. Laboratory tests reveal a serum potassium of 2.9 mEq/L (normal: 3.5-5.0). What is the primary precipitating factor for this toxicity?',
        options: [
          'Hyperglycemia from diet',
          'Diuretic-induced hypokalemia, which removes potassium competition at the myocardial Na+/K+ ATPase pump, dramatically magnifying Digoxin toxicity',
          'Excessive dietary protein intake',
          'Low atmospheric pressure in Addis Ababa'
        ],
        correctIndex: 1,
        explanation:
          'Potassium and Digoxin compete for binding at the myocardial Na+/K+ ATPase pump. Hypokalemia allows increased Digoxin binding, triggering life-threatening cardiac arrhythmias and neurotoxicity even at borderline or normal serum Digoxin concentrations.',
        guidelineReference: 'Clinical Pharmacokinetics & Ethiopian Standard Treatment Guidelines'
      },
      {
        id: 'cv-q6',
        question:
          'Which of the following beta-blockers has demonstrated proven mortality and hospital reduction benefits in randomized clinical trials for Heart Failure with Reduced Ejection Fraction (HFrEF)?',
        options: [
          'Atenolol',
          'Propranolol',
          'Bisoprolol (or Carvedilol, Metoprolol Succinate)',
          'Acebutolol'
        ],
        correctIndex: 2,
        explanation:
          'Only three beta-blockers—Bisoprolol, Carvedilol, and Metoprolol Succinate extended-release—are evidence-based and approved for HFrEF GDMT mortality reduction. Atenolol and immediate-release Propranolol do not demonstrate mortality reduction in heart failure.',
        guidelineReference: 'ESC & ACC/AHA Heart Failure Guidelines'
      },
      {
        id: 'cv-q7',
        question:
          'What is the modern target serum concentration range for Digoxin in patients with Heart Failure with Reduced Ejection Fraction (HFrEF)?',
        options: [
          '2.0 to 4.0 ng/mL',
          '0.5 to 0.9 ng/mL',
          '1.5 to 2.5 ng/mL',
          '10 to 20 ng/mL'
        ],
        correctIndex: 1,
        explanation:
          'Post-hoc analyses of the DIG trial demonstrated that serum Digoxin concentrations between 0.5 and 0.9 ng/mL optimize neurohormonal modulation and reduce hospitalizations without increasing mortality. Concentrations > 1.2 ng/mL correlate with increased mortality.',
        guidelineReference: 'Applied Pharmacokinetics & HFSA Guidelines'
      },
      {
        id: 'cv-q8',
        question:
          'A 60-year-old male with long-standing hypertension and Type 2 diabetes has persistent microalbuminuria (Urine Albumin-to-Creatinine Ratio = 180 mg/g). Which antihypertensive medication class is specifically indicated for renal protection?',
        options: [
          'ACE Inhibitor (e.g., Enalapril) or Angiotensin Receptor Blocker (ARB)',
          'Alpha-1 blocker (Doxazosin)',
          'Direct vasodilator (Hydralazine)',
          'Loop diuretic (Furosemide)'
        ],
        correctIndex: 0,
        explanation:
          'ACE inhibitors and ARBs selectively dilate the efferent arteriole of the glomerulus, reducing intraglomerular hydrostatic pressure, diminishing proteinuria, and slowing the progression of diabetic kidney disease.',
        guidelineReference: 'KDIGO Blood Pressure in CKD & Ethiopian MoH Guidelines'
      },
      {
        id: 'cv-q9',
        question:
          'After initiating an ACE inhibitor or ARB, what magnitude of serum creatinine increase is considered acceptable and represents expected hemodynamic autoregulation rather than true structural renal failure?',
        options: [
          'An increase of up to 30% from baseline, provided the patient is asymptomatic and serum potassium remains manageable (< 5.5 mEq/L)',
          'Zero increase; any rise in creatinine mandates permanent discontinuation',
          'An increase of at least 200%',
          'Creatinine must decline to zero'
        ],
        correctIndex: 0,
        explanation:
          'A mild increase in serum creatinine of up to 30% after starting an ACEi/ARB reflects reduced intraglomerular pressure (the therapeutic goal for nephroprotection). Therapy should be continued unless hyperkalemia develops or creatinine climbs beyond 30-35%.',
        guidelineReference: 'KDIGO Guidelines & ACC/AHA Hypertension Standards'
      },
      {
        id: 'cv-q10',
        question:
          'Which medication class represents the fourth pillar of modern GDMT for HFrEF, offering significant reductions in cardiovascular death and heart failure hospitalizations regardless of whether the patient has diabetes?',
        options: [
          'Sulfonylureas (Gliclazide)',
          'SGLT2 Inhibitors (Dapagliflozin or Empagliflozin)',
          'Thiazolidinediones (Pioglitazone)',
          'DPP-4 Inhibitors (Saxagliptin)'
        ],
        correctIndex: 1,
        explanation:
          'SGLT2 inhibitors (Dapagliflozin and Empagliflozin) have revolutionized heart failure management, significantly reducing cardiovascular death and hospitalizations in HFrEF across multiple landmark clinical trials (DAPA-HF, EMPEROR-Reduced) independent of glycemic control.',
        guidelineReference: 'ACC/AHA/HFSA Heart Failure Guidelines & Ethiopian MoH NCD Guidelines'
      }
    ]
  },
  {
    id: 'diabetes-fasting-chronotherapy',
    code: 'PM-CPD-04',
    title: 'Type 2 Diabetes & Religious Fasting Chronotherapy',
    shortDescription:
      'Culturally competent medication adjustments during Ethiopian Orthodox Lent (Tsome) and Ramadan to prevent severe hypoglycemia.',
    category: 'Endocrinology',
    level: 'Advanced',
    cpdPoints: 3.0,
    durationHours: 3.0,
    accreditationNote: 'Designed for clinical and community pharmacists managing religious fasting populations in Ethiopia.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Religious fasting is deeply woven into Ethiopian society. Millions observe the Ethiopian Orthodox Great Lent (55 days of complete daytime food and drink abstinence until afternoon/evening) and Ramadan (dawn-to-sunset fast). This course provides clinical pharmacists with evidence-based chronotherapy protocols: how to redistribute secretagogues, titrate basal/bolus insulin, educate on red-flag hypoglycemia thresholds, and respect patient faith while ensuring glycemic safety.',
    learningObjectives: [
      'Assess hypoglycemia risk stratification for fasting diabetic patients using IDF-DAR clinical scoring.',
      'Modify oral antidiabetic drug timing and dosages during Ethiopian Orthodox fasting (afternoon/evening meal shifts) and Ramadan (Suhoor and Iftar).',
      'Individualize basal and bolus insulin regimens to avert nocturnal hypoglycemia and postprandial hyperglycemia.',
      'Formulate clear "Break the Fast" criteria based on fingerstick capillary blood glucose values (<70 mg/dL or >300 mg/dL).',
      'Provide structured pre-fast counseling and hydration guidance to prevent dehydration-induced acute kidney injury and hyperosmolar states.'
    ],
    guidelinesReferenced: [
      'International Diabetes Federation & Diabetes and Ramadan (IDF-DAR) Practical Guidelines',
      'Ethiopian National Guideline on the Prevention and Control of Diabetes Mellitus',
      'American Diabetes Association (ADA) Standards of Care in Diabetes'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'dm-mod-1',
        title: 'Module 1: Cultural Context & Hypoglycemia Risk Stratification',
        durationMinutes: 45,
        summary:
          'Understanding Ethiopian Orthodox fasting patterns (Abiy Tsom, Wednesdays & Fridays) and Ramadan.',
        keyLearningPoints: [
          'Orthodox Fasting Rhythm: Strict abstinence from all animal products and zero intake of food or water from sunrise until mid-afternoon (often 3:00 PM / "Ye-Tsome Sa\'at") or sunset.',
          'Ramadan Fasting Rhythm: Pre-dawn meal (Suhoor) followed by strict abstinence until sunset (Iftar).',
          'High-Risk Criteria: History of severe hypoglycemia within 3 months, hypoglycemia unawareness, CKD stage 4-5, advanced microvascular complications, or acute illness. These individuals are religiously exempt and medically advised not to fast.',
          'Pre-Fast Assessment: Should ideally occur 4 to 8 weeks before fasting begins to adjust regimens gradually.'
        ]
      },
      {
        id: 'dm-mod-2',
        title: 'Module 2: Oral Antidiabetic Chronotherapy Adjustments',
        durationMinutes: 45,
        summary:
          'Managing Metformin, Sulfonylureas, SGLT2 inhibitors, and DPP-4 inhibitors during meal-shift windows.',
        keyLearningPoints: [
          'Metformin: Switch once-daily dose to the main breaking meal (Iftar/afternoon). Twice-daily dosing: take normal dose at the main meal and reduce the morning dose by 50% if meal is light.',
          'Sulfonylureas (Glibenclamide): Highest risk of prolonged fatal hypoglycemia during fasting! Best practice: switch to a low-risk agent (Gliclazide MR or DPP-4 inhibitor). If continuing Gliclazide, take standard dose with the main sunset meal and reduce pre-dawn dose by 50% or omit.',
          'DPP-4 Inhibitors (Sitagliptin, Vildagliptin): Glucose-dependent insulin secretion carries virtually zero intrinsic hypoglycemia risk. No dosage change required.',
          'SGLT2 Inhibitors: Risk of volume depletion, dehydration, and euglycemic DKA during hot fasting days. Take at the breaking meal and ensure 2 to 3 liters of fluid intake during non-fasting hours.'
        ]
      },
      {
        id: 'dm-mod-3',
        title: 'Module 3: Insulin Regimen Individualization',
        durationMinutes: 45,
        summary:
          'Adjusting long-acting basal and rapid-acting prandial insulin units during prolonged fasting.',
        keyLearningPoints: [
          'Basal Insulin (Glargine, Degludec, or NPH): Reduce total daily basal dose by 15% to 30% to prevent unprovoked daytime hypoglycemia during the prolonged fast. Administer at the same time each evening with the breaking meal.',
          'Prandial (Bolus) Insulin: Shift the main bolus dose to the breaking meal (Iftar / 3 PM dinner). Significantly reduce or omit the morning bolus if only a small meal or no food is consumed.',
          'Premixed Insulin (30/70): Split 60/40 or 70/30, shifting the larger dose to the main evening meal and reducing the morning dose by 50%.'
        ]
      },
      {
        id: 'dm-mod-4',
        title: 'Module 4: "Break the Fast" Red Lines & Hydration Protocols',
        durationMinutes: 45,
        summary:
          'Clear objective clinical criteria when patients must immediately ingest carbohydrates to preserve life.',
        keyLearningPoints: [
          'Red Line 1: Blood glucose drops < 70 mg/dL (3.9 mmol/L) at any point during the fasting day -> Must break fast immediately with 15-20g fast-acting carbohydrates (juice, sugar water, honey).',
          'Red Line 2: Blood glucose drops < 90 mg/dL in the first few hours after starting the fast.',
          'Red Line 3: Blood glucose rises > 300 mg/dL (16.7 mmol/L) -> Risk of diabetic ketoacidosis or hyperosmolar hyperglycemic state (HHS).',
          'Religious Assurances: Both Ethiopian Orthodox Christian scholars and Islamic scholars explicitly affirm that breaking the fast for medical danger is righteous and protected.'
        ]
      }
    ],
    quiz: [
      {
        id: 'dm-q1',
        question:
          'A 56-year-old male with Type 2 diabetes takes Glibenclamide 10mg each morning and Metformin 1,000mg twice daily. He intends to observe the Ethiopian Orthodox 55-day Great Lent (Abiy Tsom) with complete abstinence from food and liquids until 3:00 PM daily. What is the most critical pharmacological adjustment to prevent severe daytime hypoglycemia?',
        options: [
          'Triple the Glibenclamide dose at 6:00 AM',
          'Discontinue Glibenclamide or switch to a lower-risk agent like Gliclazide MR or a DPP-4 inhibitor; shift the primary medication dose to the 3:00 PM breaking meal',
          'Continue taking Glibenclamide at 6:00 AM on an empty stomach',
          'Instruct him to discontinue all diabetes medications permanently'
        ],
        correctIndex: 1,
        explanation:
          'Glibenclamide stimulates insulin secretion regardless of blood glucose levels and has active metabolites. Taking it on an empty stomach before a 9-hour fast is a major cause of severe, fatal hypoglycemia. Shifting or switching to low-risk agents taken when food is ingested is mandatory.',
        guidelineReference: 'IDF-DAR Practical Guidelines & Ethiopian National Diabetes Guidelines'
      },
      {
        id: 'dm-q2',
        question:
          'According to international consensus guidelines for religious fasting in diabetes (IDF-DAR), at what capillary blood glucose reading must a patient immediately break their fast, regardless of how few hours remain until sunset?',
        options: [
          '< 120 mg/dL',
          '< 70 mg/dL (3.9 mmol/L)',
          '< 180 mg/dL',
          '< 50 mg/dL only if they lose consciousness'
        ],
        correctIndex: 1,
        explanation:
          'Any blood glucose measurement below 70 mg/dL (3.9 mmol/L) mandates immediately breaking the fast with 15-20 grams of rapid-acting carbohydrates to prevent neuroglycopenic brain injury and coma.',
        guidelineReference: 'IDF-DAR Practical Guidelines & ADA Standards of Care'
      },
      {
        id: 'dm-q3',
        question:
          'Which class of oral antidiabetic agents carries an inherently negligible risk of hypoglycemia because its mechanism of action relies strictly on glucose-dependent incretin enhancement?',
        options: [
          'Sulfonylureas (e.g., Glibenclamide)',
          'DPP-4 Inhibitors (e.g., Sitagliptin, Vildagliptin)',
          'Meglitinides (e.g., Repaglinide)',
          'NPH Insulin'
        ],
        correctIndex: 1,
        explanation:
          'DPP-4 inhibitors prevent the enzymatic breakdown of GLP-1 and GIP, stimulating insulin and suppressing glucagon ONLY when blood glucose is elevated. When glucose is low or normal, they do not stimulate insulin secretion, conferring minimal hypoglycemia risk during fasting.',
        guidelineReference: 'IDF-DAR Diabetes Guidelines & Applied Clinical Pharmacotherapy'
      },
      {
        id: 'dm-q4',
        question:
          'A patient on basal insulin Glargine (Lantus) 30 units every evening wishes to fast during Ramadan. What is the recommended empirical dosage adjustment to ensure daytime basal stability without provoking afternoon hypoglycemia?',
        options: [
          'Double the dose to 60 units',
          'Reduce the total basal insulin dose by approximately 15% to 30% (down to 20-25 units) and administer it at the evening Iftar meal',
          'Stop basal insulin completely and take only oral sweets',
          'Shift the entire 30 units to midday while fasting'
        ],
        correctIndex: 1,
        explanation:
          'To prevent hypoglycemia during prolonged daylight fasting hours without caloric intake, basal insulin is routinely reduced by 15% to 30%, with close capillary blood glucose self-monitoring and dosage titration.',
        guidelineReference: 'IDF-DAR Practical Guidelines & Ethiopian MoH Diabetes Guidelines'
      },
      {
        id: 'dm-q5',
        question:
          'What potential clinical complication requires extra caution and hydration counseling when patients take SGLT2 inhibitors (e.g., Dapagliflozin, Empagliflozin) during hot, dry daylight fasting seasons?',
        options: [
          'Hypoglycemic seizures',
          'Volume depletion, dehydration, hypotension, and rare euglycemic diabetic ketoacidosis (euDKA)',
          'Acute massive weight gain',
          'Hair loss'
        ],
        correctIndex: 1,
        explanation:
          'SGLT2 inhibitors induce osmotic diuresis (losing 400-500 mL of water daily in urine). In patients who fast from water for 12-16 hours in warm climates, this can precipitate severe dehydration, hypotension, AKI, and ketosis.',
        guidelineReference: 'ADA Standards of Care & IDF-DAR Recommendations'
      },
      {
        id: 'dm-q6',
        question:
          'Does checking blood glucose via a fingerstick capillary blood glucose meter break the religious fast according to established Ethiopian Orthodox and Islamic theological rulings?',
        options: [
          'Yes, any drop of blood invalidates the fast completely',
          'No, theological authorities from both faiths affirm that blood glucose self-monitoring does NOT break the fast and is encouraged for medical safety',
          'It is strictly forbidden by law',
          'Only if the reading is above 200 mg/dL'
        ],
        correctIndex: 1,
        explanation:
          'Both the Ethiopian Orthodox Church scholars and Islamic Fatwa councils have affirmed that diagnostic fingerstick blood checks do not provide nourishment and do not break the fast. Patients must be reassured that checking their glucose is permissible.',
        guidelineReference: 'IDF-DAR Theological Consensus & Ethiopian Interfaith Health Advisory'
      },
      {
        id: 'dm-q7',
        question:
          'What upper blood glucose threshold during religious fasting requires breaking the fast and seeking medical attention due to risks of diabetic ketoacidosis or hyperosmolar hyperglycemic state (HHS)?',
        options: [
          'Blood glucose > 140 mg/dL',
          'Blood glucose > 300 mg/dL (16.7 mmol/L)',
          'Blood glucose > 180 mg/dL',
          'Blood glucose > 100 mg/dL'
        ],
        correctIndex: 1,
        explanation:
          'Consensus guidelines state that a blood glucose exceeding 300 mg/dL (16.7 mmol/L) during a fast represents acute severe hyperglycemia with high risk of DKA/HHS and dehydration. The patient must break the fast, rehydrate, and seek medical evaluation.',
        guidelineReference: 'IDF-DAR Consensus Guidelines & ADA Practice Guidelines'
      },
      {
        id: 'dm-q8',
        question:
          'When adjusting twice-daily Metformin (500mg morning and 500mg evening) for an individual fasting from dawn to sunset during Ramadan, how should the doses be timed?',
        options: [
          'Take both tablets at 12:00 PM midday with no water',
          'Take 500mg with the sunset meal (Iftar) and 500mg with the pre-dawn meal (Suhoor)',
          'Discontinue Metformin for the entire month',
          'Dissolve the tablets in cooking oil'
        ],
        correctIndex: 1,
        explanation:
          'For patients on twice-daily Metformin, the evening dose is taken with the sunset meal (Iftar) and the morning dose is shifted to the pre-dawn meal (Suhoor). If the Suhoor meal is very small, the Suhoor dose may be halved to avoid gastrointestinal upset.',
        guidelineReference: 'IDF-DAR Practical Guidelines & Clinical Endocrinology'
      },
      {
        id: 'dm-q9',
        question:
          'Which patient profile represents a "Very High Risk" category where religious fasting is medically contraindicated under clinical practice guidelines?',
        options: [
          'A patient with well-controlled Type 2 diabetes on Metformin monotherapy with an HbA1c of 6.8%',
          'A pregnant woman with diabetes on insulin, or a patient with a history of severe hypoglycemia with unawareness within the past 3 months',
          'A patient taking a multivitamin',
          'A patient who exercises 3 times weekly'
        ],
        correctIndex: 1,
        explanation:
          'Pregnancy, advanced chronic kidney disease (stages 4-5), history of severe hypoglycemia or diabetic ketoacidosis within 3 months, and hypoglycemia unawareness place patients in the Very High Risk tier where fasting poses extreme danger to life.',
        guidelineReference: 'IDF-DAR Hypoglycemia Risk Stratification Matrix'
      },
      {
        id: 'dm-q10',
        question:
          'What is the "Rule of 15" for acute management when a fasting patient experiences symptomatic hypoglycemia with a fingerstick blood glucose of 62 mg/dL?',
        options: [
          'Wait 15 hours before taking any action',
          'Consume 15 grams of simple fast-acting carbohydrates (e.g. 3 teaspoons of sugar or half a glass of juice), recheck blood glucose in 15 minutes, and repeat if still < 70 mg/dL',
          'Administer 15 units of regular insulin',
          'Drink 15 cups of black coffee'
        ],
        correctIndex: 1,
        explanation:
          'The Rule of 15 is the evidence-based standard for managing mild-to-moderate hypoglycemia: ingest 15-20 grams of rapid-acting carbohydrates, wait 15 minutes, and recheck. Once normalized, follow with a complex carbohydrate or meal.',
        guidelineReference: 'American Diabetes Association (ADA) Clinical Guidelines'
      }
    ]
  },
  {
    id: 'hiv-tb-coinfection',
    code: 'PM-CPD-05',
    title: 'HIV / Tuberculosis Co-Infection Pharmacotherapy & DDI Management',
    shortDescription:
      'Manage complex drug-drug interactions between Rifampicin and Dolutegravir (TLD), prevent DILI, and optimize clinical outcomes.',
    category: 'HIV & TB',
    level: 'Advanced',
    cpdPoints: 4.5,
    durationHours: 4.5,
    accreditationNote: 'Aligned with Ethiopian National Comprehensive HIV/TB Guidelines and WHO Treatment Protocols.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Tuberculosis is the leading cause of death among people living with HIV in sub-Saharan Africa. Concomitant pharmacotherapy is notoriously fraught with catastrophic drug-drug interactions, overlapping hepatotoxicity, adherence fatigue, and the life-threatening Immune Reconstitution Inflammatory Syndrome (IRIS). This course provides advanced training in navigating the Rifampicin-Dolutegravir interaction, choosing ART timing in TB meningitis vs pulmonary TB, preventing neuropathy, and managing drug-induced liver injury.',
    learningObjectives: [
      'Execute the mandatory Dolutegravir supplemental dosing protocol (extra 50mg BID) to overcome Rifampicin CYP3A4/UGT1A1 induction.',
      'Differentiate ART initiation timing between pulmonary tuberculosis (<2 weeks if CD4 < 50) and tuberculous meningitis (delayed 4-8 weeks).',
      'Distinguish paradoxical IRIS from active treatment failure or multidrug-resistant tuberculosis.',
      'Identify and manage Drug-Induced Liver Injury (DILI) triggered by the hepatotoxic triad (Isoniazid, Rifampicin, Pyrazinamide).',
      'Co-prescribe preventive therapies including Pyridoxine for neuropathy and Cotrimoxazole (CPT) for opportunistic infections.'
    ],
    guidelinesReferenced: [
      'National Consolidated Guidelines for Comprehensive HIV Prevention, Care and Treatment (Ethiopian MoH)',
      'National Guidelines for Clinical and Programmatic Management of Tuberculosis and Leprosy in Ethiopia',
      'WHO Consolidated Guidelines on HIV and Tuberculosis'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'hiv-mod-1',
        title: 'Module 1: The TLD Regimen & Rifampicin Drug-Drug Interaction',
        durationMinutes: 45,
        summary:
          'Mechanisms of UGT1A1/CYP3A4 induction and the 50mg BID Dolutegravir supplemental protocol.',
        keyLearningPoints: [
          'TLD Components: Tenofovir Disoproxil Fumarate (300mg) + Lamivudine (300mg) + Dolutegravir (50mg) once daily.',
          'The Rifampicin Interaction: Rifampicin potently induces CYP3A4 and UGT1A1, decreasing Dolutegravir serum concentrations by ~75%.',
          'Clinical Solution: Add an extra Dolutegravir 50mg single tablet approximately 12 hours after the daily fixed-dose TLD tablet (effective DTG 50mg BID).',
          'Duration: Continue the extra Dolutegravir 50mg tablet throughout the entire duration of Rifampicin treatment and for 2 full weeks after Rifampicin is stopped (to account for enzyme de-induction lag).'
        ]
      },
      {
        id: 'hiv-mod-2',
        title: 'Module 2: Overlapping Toxicities & Polyvalent Cation Chelation',
        durationMinutes: 45,
        summary:
          'Managing gastrointestinal antacids, multivalent minerals, and metabolic toxicities.',
        keyLearningPoints: [
          'Cation Chelation: Dolutegravir binds to polyvalent cations (Al3+, Mg2+, Ca2+, Fe2+, Zn2+) in the gut lumen, drastically reducing its oral absorption by up to 70%.',
          'Administration Rules: Administer Dolutegravir at least 2 hours before or 6 hours after antacids containing aluminum or magnesium.',
          'Iron and Calcium Supplements: Can be taken simultaneously with Dolutegravir ONLY if taken with food; otherwise, separate by 2 hours before or 6 hours after.'
        ]
      },
      {
        id: 'hiv-mod-3',
        title: 'Module 3: ART Timing & Immune Reconstitution Inflammatory Syndrome (IRIS)',
        durationMinutes: 45,
        summary:
          'Balancing early survival benefits against exaggerated immune inflammatory reactions.',
        keyLearningPoints: [
          'Standard Timing Rule: In active TB, initiate anti-TB therapy first. Start ART within 2 weeks of starting TB therapy for patients with CD4 counts < 50 cells/mm3, and within 2 to 8 weeks for patients with higher CD4 counts.',
          'Crucial Exception (TB Meningitis): Delay ART for 4 to 8 weeks after starting TB treatment due to high risks of fatal cerebral edema from intracranial IRIS.',
          'Clinical IRIS Presentation: Paradoxical worsening of TB symptoms (high fever, enlarging lymph nodes, worsening chest radiographs) despite microbiologically effective treatment.',
          'Management: Do NOT stop ART or TB therapy in most cases. Treat with anti-inflammatory symptomatic support or oral Prednisolone (1-2 mg/kg/day for 2-4 weeks) in moderate-to-severe cases.'
        ]
      },
      {
        id: 'hiv-mod-4',
        title: 'Module 4: Drug-Induced Liver Injury (DILI) & Prophylactic Co-Prescriptions',
        durationMinutes: 45,
        summary:
          'Managing hepatotoxic cascades, peripheral neuropathy prevention, and opportunistic infection coverage.',
        keyLearningPoints: [
          'Hepatotoxic Triad: Isoniazid, Rifampicin, and Pyrazinamide can all trigger toxic hepatitis. If ALT/AST rises > 5 times upper limit of normal (or > 3 times with symptoms of jaundice, nausea, or abdominal pain), all hepatotoxic drugs must be halted.',
          'Pyridoxine (Vitamin B6): Mandatory co-prescription (25-50 mg daily) for all HIV-positive individuals receiving Isoniazid to prevent severe peripheral neuropathy.',
          'Cotrimoxazole Preventive Therapy (CPT): Administer one double-strength tablet (960 mg) daily to prevent Pneumocystis jirovecii pneumonia (PCP), toxoplasmosis, malaria, and severe bacterial infections.'
        ]
      }
    ],
    quiz: [
      {
        id: 'hiv-q1',
        question:
          'A 36-year-old male with HIV on TLD (Tenofovir/Lamivudine/Dolutegravir) is diagnosed with active pulmonary tuberculosis and starts Rifampicin-based standard therapy (RHZE). What is the mandatory adjustment to his antiretroviral therapy according to Ethiopian National HIV Guidelines?',
        options: [
          'Stop all HIV medications until TB therapy is fully completed in 6 months',
          'Add a supplemental 50mg Dolutegravir tablet 12 hours after the morning TLD dose (DTG 50mg twice daily), continuing for 2 weeks after stopping Rifampicin',
          'Switch Dolutegravir to high-dose oral Dexamethasone',
          'Double the Tenofovir dose while holding Dolutegravir'
        ],
        correctIndex: 1,
        explanation:
          'Rifampicin potently induces CYP3A4 and UGT1A1, lowering Dolutegravir concentrations by 75%. To maintain therapeutic viral suppression, a supplemental 50mg Dolutegravir dose must be given 12 hours after the primary TLD tablet.',
        guidelineReference: 'National Consolidated Guidelines for Comprehensive HIV Care, Ethiopian MoH'
      },
      {
        id: 'hiv-q2',
        question:
          'In a newly diagnosed patient with confirmed tuberculous meningitis (TBM) and HIV infection, what is the guideline-directed timing for initiating antiretroviral therapy (ART)?',
        options: [
          'Initiate ART immediately on the same day as TB treatment',
          'Delay ART initiation for 4 to 8 weeks after commencing anti-TB therapy to prevent fatal intracranial immune reconstitution inflammatory syndrome (IRIS)',
          'Never initiate ART under any circumstances',
          'Delay anti-TB treatment until the patient has taken ART for 1 year'
        ],
        correctIndex: 1,
        explanation:
          'In TB meningitis, early ART within the first 2-4 weeks carries high mortality from catastrophic cerebral edema and intracranial inflammation caused by CNS-IRIS. Guidelines mandate delaying ART for 4 to 8 weeks.',
        guidelineReference: 'WHO Guidelines on Tuberculosis Meningitis & Ethiopian MoH Guidelines'
      },
      {
        id: 'hiv-q3',
        question:
          'Why is Pyridoxine (Vitamin B6) 25mg to 50mg daily routinely co-prescribed with Isoniazid-containing regimens for people living with HIV in Ethiopia?',
        options: [
          'To increase the gastric absorption of Rifampicin',
          'To prevent Isoniazid-induced peripheral neuropathy caused by drug-induced pyridoxine deficiency',
          'To treat high blood pressure',
          'To prevent fungal nail infections'
        ],
        correctIndex: 1,
        explanation:
          'Isoniazid binds to and increases the renal excretion of pyridoxine (Vitamin B6), leading to painful, debilitating peripheral neuropathy. HIV patients are particularly susceptible, making daily Pyridoxine co-prescription standard of care.',
        guidelineReference: 'National Tuberculosis Guidelines & Ethiopian National Formulary'
      },
      {
        id: 'hiv-q4',
        question:
          'A patient on TLD complains of severe dyspepsia and is taking an over-the-counter antacid containing Aluminum Hydroxide and Magnesium Hydroxide simultaneously with their morning TLD tablet. What is the clinical pharmacokinetic consequence and pharmacist counseling advice?',
        options: [
          'The antacid cures HIV faster by lowering gastric acid',
          'Multivalent cations (Al3+, Mg2+) chelate with Dolutegravir, reducing absorption by up to 70%; the patient must take Dolutegravir at least 2 hours before or 6 hours after the antacid',
          'The antacid converts Dolutegravir into Penicillin',
          'No interaction exists between metal cations and integrase strand transfer inhibitors'
        ],
        correctIndex: 1,
        explanation:
          'Integrase inhibitors (like Dolutegravir) bind to metal cations in antacids through chelation, drastically impairing oral bioavailability and risking virological failure. Doses must be separated by at least 2 hours before or 6 hours after cation antacids.',
        guidelineReference: 'Ethiopian HIV Treatment Guidelines & Clinical Pharmacokinetics'
      },
      {
        id: 'hiv-q5',
        question:
          'A 28-year-old HIV-positive patient receiving anti-TB therapy presents 3 weeks after initiating ART with high fevers, night sweats, and enlarging cervical lymph nodes. Repeat sputum AFB smears and GeneXpert remain positive for drug-susceptible M. tuberculosis with no evidence of new opportunistic infections. What is the primary diagnosis and management?',
        options: [
          'Antiretroviral treatment failure; switch immediately to second-line ART',
          'Paradoxical Immune Reconstitution Inflammatory Syndrome (IRIS); continue both anti-TB therapy and ART while managing symptoms (with NSAIDs or oral Prednisolone if severe)',
          'Allergic anaphylaxis to water',
          'Immediate discontinuation of all medications permanently'
        ],
        correctIndex: 1,
        explanation:
          'Paradoxical IRIS manifests as clinical worsening of TB symptoms despite microbiological improvement as the recovering immune system mounts an inflammatory response against dead mycobacterial antigens. ART and anti-TB therapy should be continued.',
        guidelineReference: 'National Consolidated Guidelines for Comprehensive HIV Care & WHO Guidelines'
      },
      {
        id: 'hiv-q6',
        question:
          'Which three first-line anti-tuberculosis drugs form the "hepatotoxic triad" capable of causing severe Drug-Induced Liver Injury (DILI)?',
        options: [
          'Isoniazid, Rifampicin, and Pyrazinamide',
          'Ethambutol, Streptomycin, and Amikacin',
          'Pyridoxine, Cotrimoxazole, and Folic acid',
          'Tenofovir, Lamivudine, and Dolutegravir'
        ],
        correctIndex: 0,
        explanation:
          'Isoniazid (INH), Rifampicin (RIF), and Pyrazinamide (PZA) are all potentially hepatotoxic. Pyrazinamide is typically the most hepatotoxic per dose, followed by INH and RIF. Ethambutol is ocular-toxic but non-hepatotoxic.',
        guidelineReference: 'National Guidelines for Clinical Management of TB & Leprosy in Ethiopia'
      },
      {
        id: 'hiv-q7',
        question:
          'At what laboratory threshold must all hepatotoxic anti-TB medications be immediately discontinued according to standard treatment protocols?',
        options: [
          'AST or ALT > 5 times the upper limit of normal (ULN) without symptoms, OR > 3 times ULN in the presence of symptoms (jaundice, nausea, abdominal pain)',
          'Serum bilirubin of 1.1 mg/dL',
          'AST/ALT elevated by 10% above baseline',
          'Platelet count of 250,000 /uL'
        ],
        correctIndex: 0,
        explanation:
          'Standard guidelines mandate halting all hepatotoxic drugs if transaminases (ALT/AST) exceed 5 times ULN in an asymptomatic patient, or exceed 3 times ULN when accompanied by clinical symptoms of hepatitis or jaundice.',
        guidelineReference: 'Ethiopian National TB Guidelines & American Thoracic Society (ATS)'
      },
      {
        id: 'hiv-q8',
        question:
          'What is the standard preventive indication and dosing for Cotrimoxazole (CPT) in newly diagnosed HIV patients in Ethiopia?',
        options: [
          'One double-strength tablet (Sulfamethoxazole 800mg / Trimethoprim 160mg = 960mg) once daily to prevent Pneumocystis pneumonia, Toxoplasmosis, and bacterial infections',
          'Three tablets four times daily with milk',
          'Only given during surgical operations',
          'Used exclusively as a mouthwash'
        ],
        correctIndex: 0,
        explanation:
          'Cotrimoxazole preventive therapy (one DS tablet daily) provides broad antimicrobial prophylaxis against Pneumocystis jirovecii pneumonia, cerebral toxoplasmosis, malaria, and severe bacterial respiratory and diarrheal infections.',
        guidelineReference: 'National Consolidated Guidelines for HIV, Ethiopian MoH'
      },
      {
        id: 'hiv-q9',
        question:
          'How long after Rifampicin has been discontinued must the supplemental 50mg Dolutegravir tablet be maintained?',
        options: [
          'Stop it on the exact same day as Rifampicin',
          'Continue the supplemental 50mg Dolutegravir for 2 weeks after stopping Rifampicin',
          'Continue it for the rest of the patient\'s life',
          'Stop it 1 month before stopping Rifampicin'
        ],
        correctIndex: 1,
        explanation:
          'Rifampicin-induced hepatic CYP3A4 and UGT1A1 enzyme synthesis persists for roughly 14 days after drug discontinuation. Continuing supplemental Dolutegravir 50mg for 2 weeks avoids subtherapeutic drug exposure during enzyme de-induction.',
        guidelineReference: 'National HIV Guidelines & Clinical Pharmacokinetics'
      },
      {
        id: 'hiv-q10',
        question:
          'What baseline renal laboratory parameter must be evaluated prior to initiating Tenofovir Disoproxil Fumarate (TDF) to avoid aggravating pre-existing renal impairment or Fanconi syndrome?',
        options: [
          'Serum Creatinine and calculated Creatinine Clearance (or eGFR)',
          'Serum amylase',
          'Serum troponin',
          'Total cholesterol'
        ],
        correctIndex: 0,
        explanation:
          'Tenofovir DF is eliminated by glomerular filtration and active tubular secretion, carrying risk of proximal tubular nephropathy (Fanconi syndrome) and acute kidney injury. Baseline serum creatinine and CrCl are mandatory before prescribing.',
        guidelineReference: 'Ethiopian National Comprehensive HIV Guidelines & EFDA Formulary'
      }
    ]
  },
  {
    id: 'emergency-pharmacotherapy-first-aid',
    code: 'PM-CPD-06',
    title: 'Emergency Pharmacotherapy & Clinical First Aid for Pharmacists',
    shortDescription:
      'Master life-saving emergency protocols: anaphylaxis epinephrine dosing, acute opioid reversal, organophosphate toxidromes, status epilepticus, and acute resuscitation pharmacology.',
    category: 'First Aid & Emergency',
    level: 'Intermediate',
    cpdPoints: 4.5,
    durationHours: 4.5,
    accreditationNote: 'Accredited Emergency Medicine & First Aid CPD Module aligned with Ethiopian Emergency Care Guidelines and WHO BLS Standards.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Pharmacists are frequently the first accessible healthcare professionals during acute community emergencies, outpatient clinic arrests, and hospital resuscitation codes. This practical course trains pharmacists in life-saving emergency pharmacotherapy: immediate recognition and intramuscular Epinephrine dosing for anaphylaxis, rapid Naloxone titration for acute opioid respiratory depression, Atropine titrations in organophosphate/pesticide poisoning, status epilepticus benzodiazepine algorithms, and acute burn/hemorrhage resuscitation.',
    learningObjectives: [
      'Administer intramuscular Epinephrine (1:1,000) at correct weight-based doses (0.01 mg/kg, max 0.5 mg) into the anterolateral thigh for anaphylaxis.',
      'Differentiate anaphylaxis from vasovagal syncope and vocal cord dysfunction.',
      'Titrate Naloxone via intranasal, intravenous, or intramuscular routes for suspected opioid overdose while avoiding severe acute withdrawal precipitation.',
      'Execute Atropine doubling protocols for organophosphate pesticide poisoning to achieve pulmonary secretolytic endpoints.',
      'Apply the time-sensitive 0-5 minute benzodiazepine protocol (IV Lorazepam / Rectal or Buccal Midazolam/Diazepam) for status epilepticus.',
      'Calculate Parkland formula crystalloid requirements in extensive burns and manage acute severe hypoglycemia resuscitation.'
    ],
    guidelinesReferenced: [
      'Ethiopian National Emergency & Critical Care Guidelines (Ministry of Health)',
      'World Allergy Organization (WAO) Anaphylaxis Guidelines',
      'American Heart Association (AHA) Basic & Advanced Cardiovascular Life Support (BLS/ACLS)',
      'WHO Guidelines for the Management of Common Chemical Exposures & Poisonings'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'fa-mod-1',
        title: 'Module 1: Anaphylaxis Resuscitation & Epinephrine Administration',
        durationMinutes: 45,
        summary:
          'Immediate recognition, first-line intramuscular Epinephrine, route selection, and biphasic reaction monitoring.',
        keyLearningPoints: [
          'First-Line Drug of Choice: Epinephrine (Adrenaline) 1:1,000 (1 mg/mL) administered INTRAMUSCULARLY into the mid-anterolateral thigh (vastus lateralis).',
          'Adult Dose: 0.3 to 0.5 mg (0.3 to 0.5 mL of 1:1,000). Pediatric Dose: 0.01 mg/kg (max 0.3 mg). Repeat every 5 to 15 minutes if symptoms persist.',
          'Why IM Thigh?: Produces significantly faster, higher, and more reliable peak plasma concentrations than subcutaneous injection or deltoid injection.',
          'Secondary Adjuncts: H1-antihistamines (Chlorpheniramine/Diphenhydramine) and systemic corticosteroids (Hydrocortisone/Dexamethasone) do NOT treat acute bronchospasm or shock and must NEVER delay Epinephrine.',
          'Biphasic Reactions: Recurrence of anaphylaxis within 1 to 72 hours without re-exposure to allergen; observe all anaphylaxis patients for at least 4 to 8 hours.'
        ],
        clinicalCaseExample: {
          scenario:
            'A 24-year-old female develops facial angioedema, stridor, wheezing, and blood pressure 80/50 mmHg 10 minutes after an intramuscular Ceftriaxone injection at a community pharmacy clinic.',
          clinicalDecision:
            'Pharmacist immediately administers Epinephrine 0.5 mg IM into the anterolateral thigh, places the patient supine with elevated legs, delivers high-flow oxygen, and establishes IV access for isotonic saline infusion.',
          guidelineAdvice:
            'Giving IV Hydrocortisone alone without Epinephrine is a fatal medical error. Epinephrine alpha-1 vasoconstriction and beta-2 bronchodilation is the only intervention that reverses vascular collapse and laryngeal edema.'
        }
      },
      {
        id: 'fa-mod-2',
        title: 'Module 2: Opioid Overdose & Acute Toxidrome Reversal',
        durationMinutes: 45,
        summary:
          'Recognizing the opioid toxidrome triad and titration of Naloxone.',
        keyLearningPoints: [
          'Opioid Toxidrome Triad: Central nervous system depression (unresponsiveness), respiratory depression (respiratory rate < 8-10 breaths/min), and pinpoint pupils (miosis).',
          'Naloxone Dosing: 0.4 mg to 2 mg IV, IM, or SC, or 4 mg intranasally. Titrate to adequate spontaneous respiratory ventilation rather than full alertness.',
          'Duration of Action Caveat: Naloxone half-life is 30 to 90 minutes. Many opioids (e.g., Methadone, slow-release Morphine/Tramadol) have far longer durations; recurrent respiratory arrest occurs when Naloxone wears off.',
          'Monitoring: Observe patients for at least 2 to 4 hours post-reversal.'
        ]
      },
      {
        id: 'fa-mod-3',
        title: 'Module 3: Organophosphate & Household Poisoning Toxicology',
        durationMinutes: 45,
        summary:
          'Managing cholinergic toxidromes from agricultural pesticides common in Ethiopian rural and peri-urban settings.',
        keyLearningPoints: [
          'Cholinergic Crisis (SLUDGEM): Salivation, Lacrimation, Urination, Defecation, Gastrointestinal cramping, Emesis, and Miosis, plus killer bronchorrhea and bronchospasm.',
          'Atropine Protocol: Administer 1 to 3 mg IV bolus, doubling the dose every 3 to 5 minutes until pulmonary secretolytic endpoints are achieved (clear chest on auscultation, heart rate > 80 bpm, systolic BP > 80 mmHg).',
          'Skin Decontamination: Remove all contaminated clothing and wash skin with soap and water using personal protective equipment to prevent caregiver absorption.',
          'Pralidoxime (2-PAM): Reactivates acetylcholinesterase if administered before enzyme aging occurs; adjunctive to Atropine.'
        ]
      },
      {
        id: 'fa-mod-4',
        title: 'Module 4: Status Epilepticus & Severe Hypoglycemia Resuscitation',
        durationMinutes: 45,
        summary:
          'Time-critical management of prolonged seizures and neuroglycopenic emergencies.',
        keyLearningPoints: [
          'Status Epilepticus Definition: Seizure activity lasting >= 5 minutes, or >= 2 seizures without full recovery of consciousness between events.',
          'Initial 0-5 Minutes: IV Lorazepam 4 mg (or Diazepam 10 mg IV, or Midazolam 10 mg IM/buccal). Repeat once at 5-10 minutes if seizures persist.',
          'Severe Hypoglycemia in Unconscious Patients: 50 mL of Dextrose 50% (D50W) or 100 mL of Dextrose 40% IV bolus over 2-3 minutes. If IV access is unavailable: Glucagon 1 mg IM/SC.',
          'Thiamine Rule: In malnourished or alcoholic patients, administer Thiamine 100 mg IV prior to or with IV Dextrose to prevent precipitating acute Wernicke encephalopathy.'
        ]
      }
    ],
    quiz: [
      {
        id: 'fa-q1',
        question:
          'What is the first-line medication and correct administration route for acute anaphylaxis in an adult experiencing laryngeal stridor and hypotension?',
        options: [
          'Oral Chlorpheniramine 4 mg tablet',
          'Epinephrine (1:1,000 / 1 mg/mL) 0.3 to 0.5 mg administered Intramuscularly into the mid-anterolateral thigh',
          'Intravenous Hydrocortisone 200 mg slowly over 4 hours',
          'Subcutaneous Epinephrine into the deltoid muscle'
        ],
        correctIndex: 1,
        explanation:
          'Intramuscular Epinephrine into the anterolateral thigh is the undisputed first-line treatment for anaphylaxis. It achieves rapid peak blood concentrations within 8 minutes. Antihistamines and steroids are secondary adjuncts that do not reverse life-threatening airway closure or shock.',
        guidelineReference: 'World Allergy Organization (WAO) Anaphylaxis Guidelines & Ethiopian Emergency Guidelines'
      },
      {
        id: 'fa-q2',
        question:
          'Why should Epinephrine for anaphylaxis be injected into the anterolateral thigh (vastus lateralis) rather than the upper arm deltoid muscle or subcutaneous tissue?',
        options: [
          'Because the thigh is further away from the heart',
          'Because vastus lateralis vascularity produces significantly faster, higher, and more reliable peak plasma epinephrine concentrations',
          'Because it causes less bruising',
          'Because deltoid injections are legally restricted to physicians only'
        ],
        correctIndex: 1,
        explanation:
          'Pharmacokinetic studies demonstrate that IM injection into the anterolateral thigh achieves therapeutic peak plasma concentrations significantly faster (mean 8 minutes) compared to deltoid injection or subcutaneous routes (which take > 30 minutes due to peripheral vasoconstriction).',
        guidelineReference: 'World Allergy Organization (WAO) Anaphylaxis Guidelines'
      },
      {
        id: 'fa-q3',
        question:
          'A comatose patient is brought to the emergency department with a respiratory rate of 5 breaths/minute, pinpoint pupils, and cyanotic lips after an accidental opioid overdose. What is the immediate pharmacological intervention?',
        options: [
          'High-dose oral Activated Charcoal',
          'Naloxone 0.4 mg to 2 mg administered IV, IM, or intranasally, titrating to restore adequate spontaneous breathing',
          'Intravenous Flumazenil 5 mg bolus',
          'Oral Methadone syrup'
        ],
        correctIndex: 1,
        explanation:
          'Naloxone is a pure opioid antagonist that rapidly displaces opioids from mu receptors. It should be given immediately to restore adequate spontaneous ventilation (targeting RR > 10-12/min) and oxygenation.',
        guidelineReference: 'AHA Basic & Advanced Life Support Guidelines & Ethiopian MoH Emergency Guidelines'
      },
      {
        id: 'fa-q4',
        question:
          'What critical pharmacokinetic property of Naloxone requires prolonged post-resuscitation monitoring (minimum 2 to 4 hours) in patients revived from opioid overdose?',
        options: [
          'Naloxone causes permanent kidney failure',
          'Naloxone has a short half-life (30 to 90 minutes), which is much shorter than most opioids; when Naloxone wears off, life-threatening respiratory depression frequently recurs',
          'Naloxone permanently disables opioid receptors',
          'Naloxone transforms into Morphine in the liver'
        ],
        correctIndex: 1,
        explanation:
          'Naloxone has a plasma half-life of roughly 30 to 90 minutes. Long-acting opioids (like Methadone, slow-release Morphine, or Tramadol) remain in the system for hours after Naloxone has cleared, leading to renarcotization and recurrent apnea if not monitored.',
        guidelineReference: 'Clinical Toxicology & WHO Overdose Response Guidelines'
      },
      {
        id: 'fa-q5',
        question:
          'A farmworker presents with severe organophosphate pesticide poisoning manifesting massive salivation, lacrimation, wheezing, and bradycardia. What is the clinical therapeutic endpoint for titrating intravenous Atropine?',
        options: [
          'Until the patient\'s pupils are fully dilated (mydriasis)',
          'Until pulmonary secretions clear (dry lungs on auscultation), bronchospasm resolves, heart rate exceeds 80 bpm, and systolic BP > 80 mmHg',
          'Until the patient becomes completely paralyzed',
          'Until 24 hours have passed without checking vitals'
        ],
        correctIndex: 1,
        explanation:
          'Atropine reverses muscarinic hyperstimulation. The true life-saving endpoint is the drying of tracheobronchial secretions and reversal of bronchoconstriction ("atropinization"). Pupil size is an unreliable marker and should not dictate dosing.',
        guidelineReference: 'WHO Management of Severe Chemical Exposures & Ethiopian MoH STG'
      },
      {
        id: 'fa-q6',
        question:
          'An adult patient has been having continuous generalized tonic-clonic seizure activity for 7 minutes (Status Epilepticus). What is the first-line pharmacotherapeutic agent and route?',
        options: [
          'Oral Phenobarbital 200 mg tablet',
          'Intravenous Lorazepam 4 mg (or IV Diazepam 10 mg, or IM/buccal Midazolam 10 mg)',
          'Subcutaneous Insulin 20 units',
          'Oral Carbamazepine suspension'
        ],
        correctIndex: 1,
        explanation:
          'For status epilepticus persisting >= 5 minutes, an intravenous benzodiazepine (Lorazepam 0.1 mg/kg or 4 mg, or Diazepam 10 mg) is the established first-line treatment. Midazolam 10 mg IM or buccal is preferred if IV access is not yet secured.',
        guidelineReference: 'Neurocritical Care Society & Ethiopian National Emergency Guidelines'
      },
      {
        id: 'fa-q7',
        question:
          'In an unconscious adult patient with severe neuroglycopenic hypoglycemia (capillary blood glucose 32 mg/dL) with peripheral IV access established, what is the initial resuscitation fluid of choice?',
        options: [
          '50 mL of Dextrose 50% in water (D50W) or 100 mL of Dextrose 40% IV bolus over 2 to 3 minutes',
          '1 liter of Normal Saline infused over 24 hours',
          'Subcutaneous Regular Insulin 10 units',
          'Oral honey rubbed on teeth while comatose'
        ],
        correctIndex: 0,
        explanation:
          'Hypertonic dextrose (50 mL of 50% or 100 mL of 40%) provides 25-40 grams of glucose directly into the circulation, rapidly restoring cerebral glucose supply. Administering oral substances to an unconscious patient risks fatal pulmonary aspiration.',
        guidelineReference: 'American Diabetes Association (ADA) & Ethiopian MoH Emergency Guidelines'
      },
      {
        id: 'fa-q8',
        question:
          'Why must intravenous Thiamine (100 mg) be administered prior to or concurrently with hypertonic Dextrose in chronically malnourished, severely alcohol-dependent, or cachectic hypoglycemic patients?',
        options: [
          'To make the dextrose taste sweeter',
          'Because glucose oxidation consumes thiamine pyrophosphate as a cofactor; giving dextrose alone can trigger acute, potentially irreversible Wernicke encephalopathy',
          'To prevent hypoglycemia recurrence',
          'To reduce kidney clearance of potassium'
        ],
        correctIndex: 1,
        explanation:
          'Thiamine is a vital cofactor for transketolase and pyruvate dehydrogenase in glucose metabolism. Giving a large glucose load to a thiamine-deficient individual exhausts residual stores, precipitating acute Wernicke-Korsakoff encephalopathy.',
        guidelineReference: 'Harrison’s Principles of Internal Medicine & Emergency Pharmacotherapy'
      },
      {
        id: 'fa-q9',
        question:
          'What is a biphasic anaphylactic reaction, and what are its clinical implications for pharmacist observation periods?',
        options: [
          'A reaction that only occurs on alternate days of the week',
          'The recurrence of severe anaphylaxis hours (up to 72 hours) after initial symptom resolution without further allergen exposure, necessitating a 4 to 8 hour hospital observation period',
          'An allergy that affects only the left side of the body',
          'A reaction that converts into malaria'
        ],
        correctIndex: 1,
        explanation:
          'Biphasic anaphylaxis occurs in up to 10-20% of cases, where symptoms return hours after apparent complete recovery without re-exposure. Patients who experience moderate-to-severe anaphylaxis must be observed for at least 4 to 8 hours.',
        guidelineReference: 'World Allergy Organization (WAO) Guidelines'
      },
      {
        id: 'fa-q10',
        question:
          'In acute severe external extremity hemorrhage from traumatic laceration, what is the initial first-aid physical measure that must precede any medication administration?',
        options: [
          'Immediate application of direct firm pressure over the bleeding wound with sterile gauze or clean cloth, and a tourniquet if catastrophic limb arterial bleeding persists',
          'Subcutaneous Heparin injection',
          'Administering aspirin 300 mg orally',
          'Washing the open wound with alcohol and leaving it open to air'
        ],
        correctIndex: 0,
        explanation:
          'Direct firm pressure is the cornerstone of initial external hemorrhage control. For catastrophic life-threatening arterial extremity hemorrhage, an approved tactical arterial tourniquet placed 5-7 cm proximal to the wound is indicated.',
        guidelineReference: 'AHA/Red Cross First Aid Guidelines & Ethiopian Trauma Guidelines'
      }
    ]
  },
  {
    id: 'ambulatory-mtm-consultation',
    code: 'PM-CPD-07',
    title: 'Community & Ambulatory Pharmacy Medication Therapy Management (MTM)',
    shortDescription:
      'Master patient consultation, teach-back adherence methods, inhaler technique optimization, Beers Criteria deprescribing in the elderly, and OTC triage.',
    category: 'Ambulatory & Clinical Practice',
    level: 'Intermediate',
    cpdPoints: 4.0,
    durationHours: 4.0,
    accreditationNote: 'Accredited Ambulatory Care CPD Module in compliance with Ethiopian MoH Directive No. 332/2020.',
    instructor: {
      name: 'Pharmacist Betremaryam Eshete',
      title: 'Lead Clinical Pharmacist & Preceptor',
      organization: 'PharmaMind AI Clinical Advisory Board'
    },
    overview:
      'Ambulatory care and community pharmacy practice represent the frontline of pharmaceutical care. Pharmacists routinely identify drug-related problems, optimize inhaler and device handling for respiratory patients, review polypharmacy in vulnerable geriatric populations using the Beers Criteria, and resolve non-adherence. This course equips pharmacists with practical consultation methodologies to transform routine dispensing into high-impact clinical care.',
    learningObjectives: [
      'Implement the evidence-based "Teach-Back" communication technique to confirm patient understanding and improve medication adherence.',
      'Demonstrate correct sequential steps for pressurized metered-dose inhalers (pMDIs), dry powder inhalers (DPIs), and spacer devices in asthma/COPD.',
      'Apply the Beers Criteria and STOPP/START screening tools to identify inappropriate medications and deprescribe in geriatric patients.',
      'Execute medication reconciliation to resolve discrepancies across transitions of hospital discharge to community care.',
      'Triage common outpatient gastrointestinal and respiratory symptoms and recognize red-flag symptoms requiring emergency physician referral.'
    ],
    guidelinesReferenced: [
      'Ethiopian Standard Treatment Guidelines for Primary Hospitals & Health Centers',
      'Global Initiative for Asthma (GINA) Strategy Report',
      'American Geriatrics Society (AGS) Beers Criteria for Potentially Inappropriate Medication Use in Older Adults',
      'WHO Good Pharmacy Practice (GPP) in Community and Hospital Pharmacy Settings'
    ],
    passingScorePercent: 75,
    modules: [
      {
        id: 'mtm-mod-1',
        title: 'Module 1: Patient-Centered Consultation & The Teach-Back Method',
        durationMinutes: 45,
        summary:
          'Overcoming health literacy barriers and ensuring patients truly comprehend their drug regimens.',
        keyLearningPoints: [
          'The Teach-Back Method: Asking patients to explain in their own words or demonstrate how they will take their medicine (e.g., "To make sure I explained everything clearly, can you show me how you will take these tablets tomorrow morning?").',
          'Open-Ended Inquiries: Avoid binary questions like "Do you understand?". Use "How will you take this at home?" and "What questions do you have about these medicines?".',
          'Addressing Non-Adherence: Explore intentional non-adherence (fear of side effects, religious fasting, cost) versus unintentional non-adherence (forgetfulness, complex regimens).',
          'Cultural Tailoring: Use local language concepts (Amharic, Afaan Oromoo, Tigrinya) for timing relative to traditional meal patterns.'
        ]
      },
      {
        id: 'mtm-mod-2',
        title: 'Module 2: Inhalation Device Mastery & Spacer Counseling',
        durationMinutes: 45,
        summary:
          'Correcting catastrophic inhaler technique errors that lead to uncontrolled asthma and steroid side effects.',
        keyLearningPoints: [
          'Pressurized Metered-Dose Inhalers (pMDI): Require slow, deep inhalation coordinated with actuation, followed by a 10-second breath hold.',
          'Spacer Benefit: Eliminates hand-breath coordination errors, slows aerosol velocity, reduces oropharyngeal deposition by up to 80%, and increases lung deposition by 200%.',
          'Dry Powder Inhalers (DPI e.g., Diskus/Turbuhaler): Require rapid, forceful, deep inhalation to aerosolize powder; do NOT use with spacers; never exhale into the device.',
          'Oral Rinsing: Mandatory rinsing and spitting with water after inhaled corticosteroid (ICS) use to prevent oral candidiasis (thrush) and dysphonia.'
        ]
      },
      {
        id: 'mtm-mod-3',
        title: 'Module 3: Geriatric Polypharmacy & Beers Criteria Deprescribing',
        durationMinutes: 45,
        summary:
          'Eliminating dangerous anticholinergics, sedatives, and duplications in older patients.',
        keyLearningPoints: [
          'Anticholinergic Burden: First-generation antihistamines (Chlorpheniramine, Diphenhydramine) cause severe cognitive impairment, urinary retention, blurred vision, and falls in older adults.',
          'Sedative-Hypnotics: Benzodiazepines and "Z-drugs" double hip fracture risks and aggravate dementia.',
          'PPI Overuse: Prolonged unnecessary proton pump inhibitor use causes hypomagnesemia, vitamin B12 deficiency, Clostridioides difficile, and bone fractures.',
          'Deprescribing Process: Identify targets, involve patient/caregiver, taper slowly to prevent withdrawal, and monitor.'
        ]
      },
      {
        id: 'mtm-mod-4',
        title: 'Module 4: Outpatient OTC Triage & Physician Referral Red Flags',
        durationMinutes: 45,
        summary:
          'Safely treating self-limiting ailments while promptly referring life-threatening warning signs.',
        keyLearningPoints: [
          'Dyspepsia Red Flags (ALARM): Anemia, Loss of weight, Anorexia, Recent onset in age > 50, Melena/hematemesis, Dysphagia/odynophagia. Mandatory urgent endoscopy referral.',
          'Acute Diarrhea: Oral rehydration salts (ORS) and Zinc (for children) are primary. Avoid antimotility agents (Loperamide) in bloody diarrhea or high fever.',
          'Headache Red Flags (SNOOP): Systemic symptoms/fever, Neurologic deficits, Onset sudden ("thunderclap"), Older age (>50), Pattern change. Urgent neuroimaging required.'
        ]
      }
    ],
    quiz: [
      {
        id: 'mtm-q1',
        question:
          'What is the fundamental principle of the "Teach-Back" technique during pharmacist patient consultation?',
        options: [
          'The pharmacist repeats the medication instructions three times loudly',
          'The pharmacist asks the patient to explain in their own words or demonstrate how they will take the medication, confirming mutual comprehension',
          'Testing the patient with a written multiple-choice examination',
          'Having the patient read the package leaflet verbatim'
        ],
        correctIndex: 1,
        explanation:
          'The Teach-Back method is an evidence-based health literacy technique where the clinician asks the patient to state in their own words or demonstrate how they will use the medication, creating a collaborative opportunity to correct misunderstandings without shame.',
        guidelineReference: 'AHRQ Health Literacy Tools & WHO Good Pharmacy Practice (GPP)'
      },
      {
        id: 'mtm-q2',
        question:
          'Why is a spacer device (valved holding chamber) strongly recommended for patients prescribed a pressurized metered-dose inhaler (pMDI) containing an inhaled corticosteroid (e.g., Beclomethasone)?',
        options: [
          'It makes the medicine smell better',
          'It eliminates the need for hand-breath coordination, reduces drug impaction in the mouth/throat, and substantially increases lung deposition',
          'It converts liquid steroids into antibiotics',
          'Spacers are only needed for cosmetic purposes'
        ],
        correctIndex: 1,
        explanation:
          'Spacers slow aerosol velocity and allow propellant evaporation. This reduces large-droplet deposition in the oropharynx (lowering oral thrush and hoarseness) and dramatically improves fine-particle lung delivery even if coordination is imperfect.',
        guidelineReference: 'Global Initiative for Asthma (GINA) & Ethiopian Standard Treatment Guidelines'
      },
      {
        id: 'mtm-q3',
        question:
          'What essential patient counseling instruction must be provided to every patient using an inhaled corticosteroid (ICS) inhaler to prevent oral candidiasis (thrush) and hoarseness?',
        options: [
          'Swallow the inhaler mouthpiece whole',
          'Rinse the mouth with water and spit it out after every inhalation session',
          'Drink a glass of warm milk before inhaling',
          'Avoid drinking any water for 12 hours after inhalation'
        ],
        correctIndex: 1,
        explanation:
          'Inhaled corticosteroids deposited on the oral mucosa suppress local immunity, allowing Candida albicans overgrowth. Rinsing the mouth thoroughly with water and spitting it out washes away residual steroid particles, preventing oral candidiasis.',
        guidelineReference: 'GINA Asthma Guidelines & Ethiopian National Formulary'
      },
      {
        id: 'mtm-q4',
        question:
          'According to the AGS Beers Criteria, why should first-generation antihistamines (such as Chlorpheniramine and Diphenhydramine) be avoided in elderly patients (> 65 years)?',
        options: [
          'They cause severe hair growth',
          'Their strong anticholinergic properties cause cognitive impairment, confusion, dry mouth, constipation, urinary retention, and significantly increase fall risks',
          'They cure hypertension too rapidly',
          'They cannot be absorbed after age 60'
        ],
        correctIndex: 1,
        explanation:
          'First-generation antihistamines cross the blood-brain barrier and have potent anticholinergic activity. In elderly individuals, they frequently precipitate acute delirium, urinary retention, worsen glaucoma, and double fall and fracture rates. Second-generation antihistamines (Cetirizine, Loratadine) are far safer.',
        guidelineReference: 'American Geriatrics Society (AGS) Beers Criteria for Potentially Inappropriate Medication Use'
      },
      {
        id: 'mtm-q5',
        question:
          'A 54-year-old patient visits the community pharmacy seeking an over-the-counter antacid for persistent heartburn. During consultation, he reports unexpected weight loss of 6 kg and difficulty swallowing solid food (dysphagia). What is the clinical pharmacist’s priority action?',
        options: [
          'Sell him a one-year supply of Omeprazole 20 mg',
          'Recognize "ALARM" red-flag symptoms for upper gastrointestinal malignancy (dysphagia, weight loss) and refer him immediately for urgent medical evaluation and endoscopy',
          'Advise him to drink vinegar daily',
          'Recommend he eat only soft bananas and avoid doctors'
        ],
        correctIndex: 1,
        explanation:
          'Dysphagia and unexplained weight loss are classical ALARM symptoms for esophageal or gastric malignancy. Pharmacists must never mask these symptoms with OTC acid suppressants without urgent endoscopic investigation.',
        guidelineReference: 'Ethiopian STG for General Hospitals & British Society of Gastroenterology'
      },
      {
        id: 'mtm-q6',
        question:
          'How does inhalation technique for a Dry Powder Inhaler (DPI, e.g., Diskus or Turbuhaler) differ fundamentally from a pressurized Metered-Dose Inhaler (pMDI)?',
        options: [
          'DPIs require a slow, gentle breath, while pMDIs require shaking only',
          'DPIs require a rapid, forceful, and deep inhalation to disperse and de-aggregate the dry powder into fine particles',
          'DPIs must always be used with a spacer device',
          'There is no difference in inhalation technique'
        ],
        correctIndex: 1,
        explanation:
          'Dry powder inhalers are breath-actuated and depend on the patient\'s inspiratory flow rate to fluidize and de-aggregate the drug powder. Unlike pMDIs (which require slow, gentle inhalation), DPIs require a forceful, quick, and deep breath.',
        guidelineReference: 'Global Initiative for Asthma (GINA) Technique Guide'
      },
      {
        id: 'mtm-q7',
        question:
          'A 78-year-old female is prescribed Diazepam 5 mg at bedtime for chronic insomnia. Her family reports she has fallen twice this month. What is the pharmacist’s deprescribing assessment?',
        options: [
          'Double the Diazepam dose to 10 mg',
          'Benzodiazepines are on the Beers Criteria high-risk list for older adults due to ataxia, cognitive decline, and motor vehicle/fall risks; recommend a gradual taper and non-pharmacological sleep hygiene',
          'Add a barbiturate to improve sleep architecture',
          'Tell the family falls are completely normal and unavoidable in old age'
        ],
        correctIndex: 1,
        explanation:
          'Benzodiazepines carry prolonged elimination half-lives in older adults, causing daytime sedation, impaired psychomotor skills, ataxia, and a dramatic increase in hip fractures. Deprescribing via a slow, scheduled taper is strongly indicated.',
        guidelineReference: 'AGS Beers Criteria & WHO Age-Friendly Primary Health Care Guidelines'
      },
      {
        id: 'mtm-q8',
        question:
          'In pediatric acute watery diarrhea without dehydration, what are the two core pharmacological interventions recommended by the WHO and Ethiopian Ministry of Health?',
        options: [
          'Oral Ciprofloxacin and Loperamide',
          'Oral Rehydration Salts (ORS) solution plus elemental Zinc supplementation (20 mg daily for 10-14 days; 10 mg for infants < 6 months)',
          'Intravenous Metronidazole and fasting',
          'Castor oil and honey'
        ],
        correctIndex: 1,
        explanation:
          'ORS prevents dehydration and mortality, while Zinc supplementation reduces the duration and severity of the diarrheal episode and prevents recurrences for the subsequent 2-3 months. Antimotility drugs (like Loperamide) are contraindicated in children.',
        guidelineReference: 'WHO / UNICEF Diarrhea Management Guidelines & Ethiopian MoH IMNCI'
      },
      {
        id: 'mtm-q9',
        question:
          'Why are antimotility agents such as Loperamide strictly contraindicated in patients presenting with acute infectious dysentery (bloody stools and high fever)?',
        options: [
          'They make the stool too watery',
          'Inhibiting intestinal peristalsis delays pathogen clearance, potentially precipitating toxic megacolon, systemic bacterial translocation, and sepsis',
          'They cause hypertension',
          'They are destroyed by stomach acid'
        ],
        correctIndex: 1,
        explanation:
          'In invasive bacterial enteritis (e.g., Shigella, Salmonella, Campylobacter), slowing gut motility traps invasive pathogens and toxins against the mucosal wall, increasing toxic absorption and risking toxic megacolon or perforation.',
        guidelineReference: 'Ethiopian Standard Treatment Guidelines & Infectious Diseases Practice Guidelines'
      },
      {
        id: 'mtm-q10',
        question:
          'What is the primary goal of conducting medication reconciliation during a patient’s discharge from a hospital ward back to community ambulatory care?',
        options: [
          'To discard all the patient’s home medications without reviewing them',
          'To compare the patient’s pre-admission medications with discharge orders to intercept unintended discrepancies, drug omissions, duplications, and dosing errors',
          'To bill the patient for extra pharmacy services',
          'To switch all medications to injectable formulations'
        ],
        correctIndex: 1,
        explanation:
          'Medication reconciliation is a formal process of comparing a patient’s medication orders to all of the medications that the patient has been taking. It resolves unintended omissions, duplications, dosing errors, and drug interactions across care transitions.',
        guidelineReference: 'WHO High 5s Project on Action on Patient Safety & Ethiopian MoH IPPS'
      }
    ]
  }
];
