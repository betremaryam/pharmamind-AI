import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'htn-01',
    code: 'Case htn-01',
    title: 'Uncontrolled hypertension with a persistent dry cough complaint',
    condition: 'Hypertension',
    level: 'Foundation',
    patient: {
      name: 'Ato Kebede (Simulated)',
      age: 58,
      gender: 'Male',
      setting: 'Outpatient Chronic Care Clinic, Addis Ababa',
      chiefComplaint: 'Bothersome non-productive tickling dry cough for 3 weeks and worsening headache',
      history: 'Known hypertensive patient for 4 years. Initially controlled, but BP has risen over the past 3 months. Mentions buying pain relievers from a neighbourhood private pharmacy for knee osteoarthritic pain. Also reports skipping morning doses during recent religious fasting hours.',
      vitals: {
        bp: '168/98 mmHg (Confirmed repeat: 166/96)',
        hr: '76 bpm, regular',
        temp: '36.8°C',
        weight: '72 kg',
        scr: '1.1 mg/dL (eGFR: 74 mL/min/1.73m²)',
        k: '3.2 mmol/L (Normal: 3.5 - 5.0)',
        otherLabs: [
          'Fasting Blood Glucose: 98 mg/dL',
          'Uric Acid: 6.8 mg/dL',
          'Urinalysis: No protein detected'
        ]
      },
      currentMedications: [
        {
          drug: 'Enalapril',
          dose: '20 mg',
          frequency: 'Once daily (morning)',
          source: 'Hospital Outpatient Pharmacy',
          indication: 'Essential Hypertension'
        },
        {
          drug: 'Hydrochlorothiazide (HCTZ)',
          dose: '25 mg',
          frequency: 'Once daily (morning)',
          source: 'Hospital Outpatient Pharmacy',
          indication: 'Essential Hypertension'
        },
        {
          drug: 'Diclofenac (self-purchased OTC)',
          dose: '50 mg',
          frequency: 'Twice daily as needed (taking 2-3 tabs/day for 6 weeks)',
          source: 'Community Drug Retail Outlet',
          indication: 'Bilateral knee joint pain'
        }
      ]
    },
    totalProblemsCount: 5,
    availableOptions: [
      {
        id: 'p1',
        text: 'Adverse Drug Reaction: ACE-Inhibitor induced dry cough from Enalapril bradykinin accumulation',
        isActualProblem: true,
        category: 'Safety',
        preceptorRationale: 'Enalapril causes bradykinin and substance P accumulation in the pulmonary tree in 10-20% of patients. It does not resolve with antihistamines or cough syrups; switching to an ARB (e.g., Losartan 50mg) is required.',
        citation: 'Ethiopian National Standard Treatment Guidelines (STG) for General Hospitals'
      },
      {
        id: 'p2',
        text: 'Drug-Drug Interaction: Diclofenac (NSAID) blunts the antihypertensive efficacy of Enalapril and HCTZ via renal prostaglandin inhibition',
        isActualProblem: true,
        category: 'Interaction',
        preceptorRationale: 'Systemic NSAIDs inhibit renal vasodilatory prostaglandins, causing sodium/water retention and counteracting ACE-inhibitor and thiazide action. This is the primary driver of the recent BP surge.',
        citation: 'North Wollo Hypertensive DTP Study / Ethiopian STG'
      },
      {
        id: 'p3',
        text: 'Adverse Drug Reaction / Electrolyte Disturbance: Thiazide-induced hypokalaemia (K+ 3.2 mmol/L) exacerbated by HCTZ 25mg',
        isActualProblem: true,
        category: 'Safety',
        preceptorRationale: 'HCTZ promotes renal potassium wasting. A serum potassium of 3.2 mmol/L risks cardiac arrhythmias, muscle weakness, and cramps. Replacing HCTZ with or adding a potassium-sparing agent or substituting with amlodipine should be considered.',
        citation: 'Wachemo University Adult Inpatient DTP Study'
      },
      {
        id: 'p4',
        text: 'Sub-optimal Adherence: Medication schedule non-adherence due to religious fasting without dosing adjustment',
        isActualProblem: true,
        category: 'Adherence',
        preceptorRationale: 'Ethiopian patients frequently observe fasting periods (e.g., Orthodox Tewahedo fasting). Omitting doses or taking them on an empty stomach without clinician realignment results in erratic plasma levels.',
        citation: 'PLOS ONE Medication Adherence in Ethiopia Study'
      },
      {
        id: 'p5',
        text: 'Drug Therapy Problem: Untreated indication for knee osteoarthritis requiring gastro- and renal-safe analgesia (e.g. Paracetamol or topical NSAID)',
        isActualProblem: true,
        category: 'Indication',
        preceptorRationale: 'Stopping oral diclofenac without providing a safe alternative for knee osteoarthritis will prompt the patient to seek informal relief again. Paracetamol 1g up to TID or topical diclofenac gel is preferred.',
        citation: 'Ethiopian Essential Medicines Formulary'
      },
      {
        id: 'p6',
        text: 'Distractor: Ineffective drug choice requiring immediate initiation of third-line Hydralazine 25mg TID',
        isActualProblem: false,
        category: 'Indication',
        preceptorRationale: 'Incorrect: Escalating to a vasodilator like Hydralazine before removing the NSAID antagonist and managing ACEI-cough is inappropriate polypharmacy and increases reflex tachycardia risks.',
        citation: 'Ethiopian Hypertension Management Guidelines'
      },
      {
        id: 'p7',
        text: 'Distractor: Enalapril toxicity due to acute renal failure indicated by normal Serum Creatinine 1.1 mg/dL',
        isActualProblem: false,
        category: 'Monitoring',
        preceptorRationale: 'Incorrect: Serum creatinine of 1.1 mg/dL with eGFR 74 mL/min is well within acceptable limits for a 58-year-old male. There is no evidence of acute renal failure.',
        citation: 'KDIGO Clinical Practice Guideline'
      }
    ],
    modelPlan: {
      switchOrStop: '1. Discontinue Enalapril 20mg immediately due to cough. 2. Stop systemic Diclofenac 50mg tablets to relieve BP blunting and preserve renal perfusion. 3. Withhold or reduce HCTZ 25mg pending potassium recovery.',
      initiate: 'Initiate Losartan 50mg PO once daily (or Amlodipine 5-10mg daily if ARB supply is limited). For knee pain, start Paracetamol 1g PO TID PRN plus non-pharmacological hot compress / exercise.',
      monitoring: 'Repeat BP in 1-2 weeks (target < 130/80 mmHg). Recheck serum potassium and creatinine in 10-14 days. Monitor for cough cessation (typically resolves within 1-4 weeks after stopping ACEI).',
      counselling: 'Counsel patient on the risk of OTC NSAID purchases. Discuss fasting schedule: taking morning medicines after sunset or at dawn without skipping.',
      followUp: 'Return to clinic in 2 weeks with home BP log.'
    },
    modelSoap: {
      subjective: '58 y/o male with HTN presents with 3-week dry tickling cough, worsening morning headache, and knee pain. Admits self-medicating with OTC diclofenac and missing occasional morning doses due to fasting.',
      objective: 'BP 168/98 mmHg (repeat 166/96), HR 76. Labs: K+ 3.2 mmol/L (low), SCr 1.1 mg/dL, FBS 98 mg/dL. Current meds: Enalapril 20mg OD, HCTZ 25mg OD, Diclofenac 50mg BID-TID PRN.',
      assessment: '1. Uncontrolled Stage 2 HTN secondary to drug interaction (Diclofenac blunting ACEI/HCTZ) and fasting non-adherence. 2. ACEI-induced adverse dry cough from Enalapril. 3. Hypokalaemia (3.2 mmol/L) secondary to HCTZ. 4. Inappropriate self-medication for knee osteoarthritis.',
      plan: 'Stop Enalapril & Diclofenac. Transition to Losartan 50mg OD. Hold HCTZ, recheck K+ in 10 days. Recommend Paracetamol 1g PO TID PRN for knee pain. Fasting-compatible dosing counselling provided. Follow up in 2 weeks.'
    }
  },
  {
    id: 'dm-02',
    code: 'Case dm-02',
    title: 'Type 2 Diabetes in Chronic Kidney Disease with recurrent morning sweats',
    condition: 'Type 2 diabetes',
    level: 'Intermediate',
    patient: {
      name: 'Woizero Aster (Simulated)',
      age: 64,
      gender: 'Female',
      setting: 'Diabetic Clinic, St. Paul Hospital Millennium Medical College',
      chiefComplaint: 'Dizziness, tremors, and palpitations in the early morning; fatigue',
      history: 'Type 2 Diabetes for 12 years, diabetic nephropathy Stage 3b. Taking Glibenclamide and Metformin. Her daughter reports she had two severe hypoglycaemic episodes at home during early fasting hours.',
      vitals: {
        bp: '142/84 mmHg',
        hr: '82 bpm',
        temp: '36.5°C',
        weight: '65 kg',
        scr: '2.1 mg/dL (eGFR: 24 mL/min/1.73m²)',
        k: '4.8 mmol/L',
        otherLabs: [
          'HbA1c: 6.9%',
          'Random Blood Glucose during clinic visit: 68 mg/dL',
          'Urine Albumin-to-Creatinine Ratio (UACR): 340 mg/g'
        ]
      },
      currentMedications: [
        {
          drug: 'Glibenclamide',
          dose: '5 mg',
          frequency: 'Twice daily',
          source: 'Hospital Pharmacy',
          indication: 'Type 2 Diabetes Mellitus'
        },
        {
          drug: 'Metformin',
          dose: '1000 mg',
          frequency: 'Twice daily',
          source: 'Hospital Pharmacy',
          indication: 'Type 2 Diabetes Mellitus'
        },
        {
          drug: 'Atorvastatin',
          dose: '20 mg',
          frequency: 'Once daily at bedtime',
          source: 'Hospital Pharmacy',
          indication: 'Dyslipidaemia / Primary ASCVD prevention'
        }
      ]
    },
    totalProblemsCount: 4,
    availableOptions: [
      {
        id: 'dm-p1',
        text: 'Safety / Contraindication: Metformin accumulation risk (eGFR 24 mL/min is below the safe threshold of 30 mL/min, risking lactic acidosis)',
        isActualProblem: true,
        category: 'Safety',
        preceptorRationale: 'Metformin is renally cleared. When eGFR falls below 30 mL/min/1.73m², it is strictly contraindicated due to the life-threatening risk of lactic acidosis.',
        citation: 'KDIGO Diabetes Management in CKD Guidelines / Ethiopian STG'
      },
      {
        id: 'dm-p2',
        text: 'Safety / Inappropriate Drug: Glibenclamide has active metabolites that accumulate in renal failure, causing severe prolonged hypoglycaemia',
        isActualProblem: true,
        category: 'Safety',
        preceptorRationale: 'Long-acting sulfonylureas like Glibenclamide produce active metabolites excreted by the kidneys. In CKD, it causes refractory, fatal hypoglycaemia. Must be stopped; short-acting sulfonylurea (Gliclazide/Glipizide) or insulin is indicated.',
        citation: 'WHO Model Formulary & Ethiopian STG'
      },
      {
        id: 'dm-p3',
        text: 'Over-treatment: HbA1c 6.9% is overly stringent for a 64 y/o patient with advanced CKD (Stage 3b/4)',
        isActualProblem: true,
        category: 'Effectiveness',
        preceptorRationale: 'Guidelines recommend a relaxed HbA1c target of 7.5% - 8.0% for frail or renal-impaired older adults to avoid fatal hypoglycaemia.',
        citation: 'American Diabetes Association & Ethiopian Endocrine Society'
      },
      {
        id: 'dm-p4',
        text: 'Missing Indication / Organ Protection: Lack of Renoprotective ACEi/ARB or SGLT2i with albuminuria > 300 mg/g',
        isActualProblem: true,
        category: 'Indication',
        preceptorRationale: 'Patient has overt diabetic nephropathy (UACR 340 mg/g). An ACE inhibitor or ARB titrated carefully with potassium monitoring provides demonstrated renal progression slowing.',
        citation: 'KDIGO CKD Guidelines'
      },
      {
        id: 'dm-p5',
        text: 'Distractor: Atorvastatin should be discontinued because cholesterol is not monitored this visit',
        isActualProblem: false,
        category: 'Indication',
        preceptorRationale: 'Incorrect: Atorvastatin 20mg provides vital cardiovascular protection in CKD and does not require renal dose reduction.',
        citation: 'KDIGO Lipid Management in CKD'
      }
    ],
    modelPlan: {
      switchOrStop: 'Stop Glibenclamide and Metformin immediately.',
      initiate: 'Transition to low-dose Gliclazide modified-release 30mg once daily or basal intermediate insulin (e.g. NPH in conservative units). Add Enalapril 2.5mg OD with close K+ checks.',
      monitoring: 'Self-monitoring of blood glucose (SMBG) before breakfast and dinner. Recheck SCr, eGFR and K+ in 2 weeks.',
      counselling: 'Hypoglycaemia recognition and rule of 15 (15g rapid sugar, recheck in 15 min). Fasting guidance.',
      followUp: 'Diabetic nurse review in 1 week.'
    },
    modelSoap: {
      subjective: '64 y/o female with T2DM and CKD Stage 3b presents with morning diaphoresis, dizziness and tremors. Daughter confirms low sugar reading 68 mg/dL.',
      objective: 'BP 142/84, eGFR 24 mL/min, SCr 2.1 mg/dL, HbA1c 6.9%, UACR 340 mg/g.',
      assessment: '1. Drug-induced recurrent hypoglycaemia secondary to Glibenclamide accumulation in CKD. 2. Metformin contraindicated at eGFR < 30 mL/min. 3. Over-treated HbA1c target.',
      plan: 'Stop Metformin and Glibenclamide. Switch to renal-safe regimen with relaxed HbA1c goal (7.5-8.0%). Educate on hypoglycemia rescue.'
    }
  },
  {
    id: 'tb-03',
    code: 'Case tb-03',
    title: 'HIV-1 / Pulmonary TB Co-infection with breakthrough viral load and neuropathy',
    condition: 'TB / HIV',
    level: 'Advanced',
    patient: {
      name: 'Ato Daniel (Simulated)',
      age: 36,
      gender: 'Male',
      setting: 'Specialized Infectious Disease Clinic, Gondar',
      chiefComplaint: 'Burning numbness in both soles and fingers; worried about treatment overlap',
      history: 'Living with HIV for 5 years on Tenofovir + Lamivudine + Dolutegravir (TLD). Recently diagnosed with smear-positive Pulmonary TB and started on fixed-dose combination 2(RHZE)/4(RH) 4 weeks ago.',
      vitals: {
        bp: '118/74 mmHg',
        hr: '78 bpm',
        temp: '37.1°C',
        weight: '54 kg (lost 3 kg)',
        scr: '0.9 mg/dL',
        k: '4.1 mmol/L',
        otherLabs: [
          'CD4 count: 210 cells/uL',
          'Viral Load: 1,840 copies/mL (was undetectable 6 months ago)',
          'Sputum AFB: Positive (+2)'
        ]
      },
      currentMedications: [
        {
          drug: 'TLD (Tenofovir 300mg / Lamivudine 300mg / Dolutegravir 50mg)',
          dose: '1 tablet',
          frequency: 'Once daily (evening)',
          source: 'Hospital ART Clinic',
          indication: 'HIV-1 Infection'
        },
        {
          drug: 'RHZE (Rifampicin 150mg / Isoniazid 75mg / Pyrazinamide 400mg / Ethambutol 275mg)',
          dose: '3 tablets',
          frequency: 'Once daily (morning)',
          source: 'TB DOTS Centre',
          indication: 'Pulmonary Tuberculosis'
        }
      ]
    },
    totalProblemsCount: 3,
    availableOptions: [
      {
        id: 'tb-p1',
        text: 'Drug-Drug Interaction: Rifampicin potent CYP3A4 / UGT1A1 enzyme induction reducing Dolutegravir exposure by ~75% without dose boosting',
        isActualProblem: true,
        category: 'Interaction',
        preceptorRationale: 'Rifampicin drastically lowers Dolutegravir plasma trough concentrations. National and WHO guidelines require supplementing with an extra Dolutegravir 50mg dose 12 hours apart (Dolutegravir 50mg BID) throughout TB therapy and for 2 weeks after stopping Rifampicin.',
        citation: 'Ethiopian National Consolidated Guidelines for Comprehensive HIV Prevention and Treatment'
      },
      {
        id: 'tb-p2',
        text: 'Untreated Indication / Adverse Prevention: Missing Pyridoxine (Vitamin B6) prophylaxis during high-dose Isoniazid therapy',
        isActualProblem: true,
        category: 'Indication',
        preceptorRationale: 'Isoniazid competitively inhibits pyridoxal phosphate, causing peripheral sensory neuropathy, especially in HIV-positive patients. Pyridoxine 25-50mg daily must be co-prescribed.',
        citation: 'National TB and Leprosy Control Program Guidelines'
      },
      {
        id: 'tb-p3',
        text: 'Effectiveness / Virological Failure: Rising viral load (1,840 copies/mL) driven by sub-therapeutic Dolutegravir exposure',
        isActualProblem: true,
        category: 'Effectiveness',
        preceptorRationale: 'The failure to double Dolutegravir dosing while on Rifampicin explains the viral rebound and poses an imminent risk of integrase inhibitor resistance development.',
        citation: 'WHO HIV Treatment Guidelines'
      },
      {
        id: 'tb-p4',
        text: 'Distractor: Switch Tenofovir to Zidovudine due to renal toxicity',
        isActualProblem: false,
        category: 'Safety',
        preceptorRationale: 'Incorrect: Serum creatinine is 0.9 mg/dL; renal function is normal. Switching to Zidovudine would add unnecessary bone marrow suppression risks.',
        citation: 'National ART Guidelines'
      }
    ],
    modelPlan: {
      switchOrStop: 'Do not discontinue TB therapy or TLD.',
      initiate: '1. Add supplemental Dolutegravir 50mg single entity tablet taken 12 hours after the evening TLD dose (making DTG 50mg BID). 2. Initiate Pyridoxine (Vitamin B6) 50mg daily for neuropathy treatment.',
      monitoring: 'Check viral load in 3 months. Monitor hepatic transaminases (ALT/AST) for combined drug-induced liver injury.',
      counselling: 'Emphasize strict adherence to the second daily Dolutegravir tablet. Explain rationale for separate morning/evening pill timings.',
      followUp: 'Review in 2 weeks to evaluate neuropathic pain improvement.'
    },
    modelSoap: {
      subjective: '36 y/o HIV+ male on TLD started on RHZE 4 weeks ago reports burning pain in extremities. Adherent to clinic appointments.',
      objective: 'CD4 210, HIV VL 1,840 copies/mL (breakthrough), Sputum AFB +2, SCr 0.9 mg/dL.',
      assessment: '1. Virological breakthrough secondary to Rifampicin-induced Dolutegravir clearance without mandatory BID dose adjustment. 2. Isoniazid-induced peripheral neuropathy due to lack of Pyridoxine prophylaxis.',
      plan: 'Add Dolutegravir 50mg PO BID (supplemental tablet in morning). Add Pyridoxine 50mg daily. Continue RHZE. Re-check VL at 12 weeks.'
    }
  },
  {
    id: 'pna-04',
    code: 'Case pna-04',
    title: 'Community-Acquired Pneumonia in a ward with delayed IV-to-oral switch & unverified allergy',
    condition: 'Pneumonia',
    level: 'Intermediate',
    patient: {
      name: 'Woizero Chaltu (Simulated)',
      age: 49,
      gender: 'Female',
      setting: 'Medical Ward, Hawassa University Comprehensive Hospital',
      chiefComplaint: 'Clinically improving; asking when she can remove the painful IV cannula and go home',
      history: 'Admitted 4 days ago with severe community-acquired pneumonia. Afebrile for 48 hours, eating well, respiratory rate normalized. Still receiving IV Ceftriaxone 2g daily + IV Metronidazole 500mg TID + IV Omeprazole 40mg daily.',
      vitals: {
        bp: '122/76 mmHg',
        hr: '72 bpm',
        temp: '36.6°C (Afebrile > 48h)',
        weight: '60 kg',
        scr: '0.8 mg/dL',
        k: '4.0 mmol/L',
        otherLabs: [
          'WBC: 7,400/mm³ (down from 16,800 on admission)',
          'Chest X-ray: Resolving right lower lobe infiltrate',
          'Oral intake: Tolerating regular diet'
        ]
      },
      currentMedications: [
        {
          drug: 'Ceftriaxone IV',
          dose: '2 g',
          frequency: 'Once daily',
          source: 'Inpatient Hospital Pharmacy',
          indication: 'Community-Acquired Pneumonia'
        },
        {
          drug: 'Metronidazole IV',
          dose: '500 mg',
          frequency: 'Every 8 hours',
          source: 'Inpatient Hospital Pharmacy',
          indication: 'Empirical anaerobic coverage'
        },
        {
          drug: 'Omeprazole IV',
          dose: '40 mg',
          frequency: 'Once daily',
          source: 'Inpatient Hospital Pharmacy',
          indication: 'Stress ulcer prophylaxis'
        }
      ]
    },
    totalProblemsCount: 4,
    availableOptions: [
      {
        id: 'pna-p1',
        text: 'Inefficient Route / Stewardship: Overdue IV-to-Oral antimicrobial conversion (patient is afebrile 48h, hemodynamically stable, tolerating meals)',
        isActualProblem: true,
        category: 'Effectiveness',
        preceptorRationale: 'Prolonging IV access unnecessarily elevates cannula thrombophlebitis risks, institutional bed day costs, and nursing workload. Candidate is ready for Amoxicillin/Clavulanate 625mg PO TID or Cefuroxime PO.',
        citation: 'Ethiopian Antimicrobial Stewardship Guidelines'
      },
      {
        id: 'pna-p2',
        text: 'Unnecessary Drug Therapy: Metronidazole is not indicated for uncomplicated community-acquired pneumonia without aspiration or lung abscess',
        isActualProblem: true,
        category: 'Indication',
        preceptorRationale: 'Standard community-acquired pneumonia does not involve foul-smelling anaerobes. Routine addition of Metronidazole promotes antimicrobial resistance without clinical gain.',
        citation: 'Infectious Diseases Society of America (IDSA) / Ethiopian STG'
      },
      {
        id: 'pna-p3',
        text: 'Unnecessary Drug Therapy: IV Omeprazole for stress ulcer prophylaxis in a non-ICU ward patient without bleed risk',
        isActualProblem: true,
        category: 'Indication',
        preceptorRationale: 'Stress ulcer prophylaxis is only indicated for mechanical ventilation >48h or coagulopathy. In general wards, it increases secondary Clostridioides difficile and nosocomial pneumonia risks.',
        citation: 'ASHP Stress Ulcer Prophylaxis Guidelines'
      },
      {
        id: 'pna-p4',
        text: 'Missing Documentation: Lack of clear antibiotic stop date or planned total treatment duration',
        isActualProblem: true,
        category: 'Monitoring',
        preceptorRationale: 'Total antibiotic duration for uncomplicated CAP is 5 days when clinical stability criteria are met. Absence of a defined stop date leads to excessive therapy.',
        citation: 'WHO AWaRe Antibiotic Book'
      }
    ],
    modelPlan: {
      switchOrStop: 'Discontinue IV Ceftriaxone, IV Metronidazole, and IV Omeprazole today.',
      initiate: 'Switch to Amoxicillin/Clavulanic acid 625mg PO TID for 2 remaining days to complete a 5-7 day total course.',
      monitoring: 'Remove IV cannula. Monitor oral tolerance and temperature prior to scheduled discharge tomorrow.',
      counselling: 'Complete the remaining 2 days of oral antibiotics at home even though symptoms have cleared.',
      followUp: 'Return to outpatient clinic in 10 days or immediately if fever or dyspnea recur.'
    },
    modelSoap: {
      subjective: '49 y/o female recovering from CAP. Eating well, no nausea, requesting IV line removal.',
      objective: 'Afebrile 48h (T 36.6°C), WBC normalized to 7.4k, RR 18. On Ceftriaxone IV, Metronidazole IV, Omeprazole IV.',
      assessment: '1. Improving CAP ready for IV-to-oral switch. 2. Redundant anaerobic coverage (Metronidazole). 3. Inappropriate stress ulcer prophylaxis (Omeprazole).',
      plan: 'Stop all IV meds. Switch to oral Amoxicillin/Clavulanate 625mg TID for 2 days. Remove IV cannula. Discharge planned tomorrow.'
    }
  },
  {
    id: 'hf-05',
    code: 'Case hf-05',
    title: 'Heart Failure with reduced Ejection Fraction and NSAID-precipitated decompensation',
    condition: 'Heart failure',
    level: 'Advanced',
    patient: {
      name: 'Ato Mulugeta (Simulated)',
      age: 62,
      gender: 'Male',
      setting: 'Emergency Ward, Tikur Anbessa Specialized Hospital',
      chiefComplaint: 'Bilateral ankle swelling, orthopnea requiring 3 pillows, and shortness of breath upon minimal exertion',
      history: 'Ischaemic cardiomyopathy (EF 32%), on Furosemide, Enalapril, Bisoprolol, and Spironolactone. Stopped Furosemide 10 days ago because "it made me urinate too frequently at night", and started Ibuprofen 400mg TID for backache.',
      vitals: {
        bp: '154/92 mmHg',
        hr: '94 bpm',
        temp: '36.7°C',
        weight: '78 kg (up 4.5 kg in 2 weeks)',
        scr: '1.7 mg/dL (Baseline was 1.1 mg/dL)',
        k: '5.4 mmol/L (Borderline high)',
        otherLabs: [
          'Jugular Venous Distension: 6 cm above sternal angle',
          'Chest auscultation: Bilateral basilar crackles',
          'Lower extremities: +3 pitting oedema up to mid-shin'
        ]
      },
      currentMedications: [
        {
          drug: 'Furosemide',
          dose: '40 mg',
          frequency: 'Twice daily',
          source: 'Specialist Clinic',
          indication: 'Heart Failure Volume Overload (Self-stopped)'
        },
        {
          drug: 'Enalapril',
          dose: '10 mg',
          frequency: 'Twice daily',
          source: 'Specialist Clinic',
          indication: 'HFrEF Guideline-Directed Therapy'
        },
        {
          drug: 'Bisoprolol',
          dose: '5 mg',
          frequency: 'Once daily',
          source: 'Specialist Clinic',
          indication: 'HFrEF Guideline-Directed Therapy'
        },
        {
          drug: 'Spironolactone',
          dose: '25 mg',
          frequency: 'Once daily',
          source: 'Specialist Clinic',
          indication: 'HFrEF Guideline-Directed Therapy'
        },
        {
          drug: 'Ibuprofen (self-purchased)',
          dose: '400 mg',
          frequency: 'TID for 10 days',
          source: 'Private Drug Retail Outlet',
          indication: 'Lumbar back pain'
        }
      ]
    },
    totalProblemsCount: 5,
    availableOptions: [
      {
        id: 'hf-p1',
        text: 'Contraindicated Drug: Ibuprofen (NSAID) causing severe sodium/fluid retention and blunting loop diuretics in HFrEF',
        isActualProblem: true,
        category: 'Safety',
        preceptorRationale: 'NSAIDs inhibit cardiac compensation and worsen renal medullary blood flow, triggering acute heart failure decompensation. Strictly contraindicated in HFrEF.',
        citation: 'ESC / AHA Heart Failure Guidelines & Ethiopian STG'
      },
      {
        id: 'hf-p2',
        text: 'Non-Adherence: Self-discontinuation of Furosemide due to nocturnal polyuria caused by incorrect dosing time',
        isActualProblem: true,
        category: 'Adherence',
        preceptorRationale: 'Taking second loop diuretic doses late in the evening causes sleep disruption and non-adherence. Second doses must be given early afternoon (e.g. 2 PM).',
        citation: 'European Journal of Heart Failure Adherence Studies'
      },
      {
        id: 'hf-p3',
        text: 'Safety / Toxic Interaction: The "Triple Whammy" (NSAID + ACEI + Aldosterone Antagonist) inducing Acute Kidney Injury (SCr jumped from 1.1 to 1.7) and hyperkalaemia (K+ 5.4)',
        isActualProblem: true,
        category: 'Safety',
        preceptorRationale: 'Combining an NSAID (afferent arteriolar constriction) with an ACE inhibitor (efferent arteriolar dilation) and Spironolactone precipitates acute pre-renal failure and life-threatening hyperkalaemia.',
        citation: 'British Medical Journal & Ethiopian Journal of Health Sciences'
      },
      {
        id: 'hf-p4',
        text: 'Monitoring / Dose Escalation: Acute volume overload (4.5kg gain, JVD, crackles) requiring immediate IV loop diuresis',
        isActualProblem: true,
        category: 'Effectiveness',
        preceptorRationale: 'Oral furosemide absorption is compromised by gut wall oedema. Decompensated patients require prompt IV furosemide (e.g., 40-80mg IV stat).',
        citation: 'Ethiopian Hospital Emergency Care Protocols'
      },
      {
        id: 'hf-p5',
        text: 'Untreated Indication: Safe pain management for lumbar back pain using non-NSAID options (Paracetamol / topical heat)',
        isActualProblem: true,
        category: 'Indication',
        preceptorRationale: 'Halting ibuprofen requires providing safe analgesia to prevent relapse to nephrotoxic OTC agents.',
        citation: 'WHO Pain Ladder'
      }
    ],
    modelPlan: {
      switchOrStop: 'Stop Ibuprofen immediately. Temporarily withhold Spironolactone and Enalapril until K+ < 5.0 and SCr stabilizes.',
      initiate: 'Furosemide 40-80mg IV stat, monitor hourly urine output. Initiate Paracetamol 1g PO TID PRN for back pain.',
      monitoring: 'Daily morning weight, strict intake/output chart, repeat basic metabolic panel (K+, SCr) in 24 hours.',
      counselling: 'Educate patient that Furosemide should be taken at 8 AM and 2 PM, never before bed. Emphasize that pharmacy OTC painkillers can be fatal in heart failure.',
      followUp: 'Re-evaluate once dry weight achieved; re-initiate ACEi and MRA at lower doses.'
    },
    modelSoap: {
      subjective: '62 y/o male with HFrEF (EF 32%) reports orthopnea, 4.5kg weight gain in 2 weeks after stopping Furosemide and taking OTC Ibuprofen for back pain.',
      objective: 'BP 154/92, JVD 6cm, bilateral crackles, +3 leg oedema. SCr 1.7 mg/dL (baseline 1.1), K+ 5.4 mmol/L.',
      assessment: '1. Acute decompensated heart failure triggered by NSAID fluid retention and Furosemide omission. 2. Acute kidney injury + hyperkalaemia from NSAID + ACEi + MRA interaction ("triple whammy").',
      plan: 'Stop Ibuprofen. Hold Enalapril/Spironolactone. Administer IV Furosemide. Recheck labs tomorrow. Counsel on diuretic schedule and OTC hazard.'
    }
  }
];
