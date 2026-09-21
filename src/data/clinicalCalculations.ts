// Clinical Calculation Models & Helper Algorithms
// Rooted in standard clinical pharmacy practice & Ethiopian Standard Treatment Guidelines (STG)

export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal Weight' | 'Overweight' | 'Class I Obesity' | 'Class II Obesity' | 'Class III Severe Obesity';
  normalRange: string;
  isNormal: boolean;
  colorClass: string;
  badgeBg: string;
  ibw: number; // Ideal Body Weight (kg)
  adjBw: number; // Adjusted Body Weight (kg)
  bsa: number; // Body Surface Area (m²)
  isObese: boolean;
  clinicalNote: string;
  professionalMedicalResponse: string;
}

export function calculateBmiAndWeights(
  heightCm: number,
  weightKg: number,
  gender: 'Male' | 'Female'
): BmiResult {
  const hMeter = Math.max(0.5, heightCm / 100);
  const wKg = Math.max(20, weightKg);
  const bmi = parseFloat((wKg / (hMeter * hMeter)).toFixed(1));

  // Ideal Body Weight (Devine Formula)
  const heightInches = heightCm / 2.54;
  const inchesOver60 = Math.max(0, heightInches - 60);
  const ibwBase = gender === 'Male' ? 50 : 45.5;
  const ibw = parseFloat((ibwBase + 2.3 * inchesOver60).toFixed(1));

  // Adjusted Body Weight (for patients >120% of IBW): IBW + 0.4 * (TBW - IBW)
  const isObese = wKg > ibw * 1.2;
  const adjBw = isObese ? parseFloat((ibw + 0.4 * (wKg - ibw)).toFixed(1)) : wKg;

  // Body Surface Area (Mosteller Formula): sqrt((cm * kg) / 3600)
  const bsa = parseFloat(Math.sqrt((heightCm * wKg) / 3600).toFixed(2));

  const normalRange = '18.5 – 24.9 kg/m² (WHO Physiological Reference)';
  let isNormal = false;
  let category: BmiResult['category'] = 'Normal Weight';
  let colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
  let badgeBg = 'bg-emerald-100 text-emerald-800';
  let clinicalNote = '';
  let professionalMedicalResponse = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    isNormal = false;
    colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
    badgeBg = 'bg-amber-100 text-amber-800 font-semibold';
    clinicalNote = 'Risk of hypoalbuminemia, micronutrient deficiency, and altered drug protein-binding. Check serum albumin and liver function.';
    professionalMedicalResponse = 'Below Normal Physiological Range (< 18.5 kg/m²). Malnutrition / Underweight status identified. Diminished plasma protein binding may elevate free drug fractions for narrow therapeutic index medications.';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal Weight';
    isNormal = true;
    colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
    badgeBg = 'bg-emerald-100 text-emerald-800 font-semibold';
    clinicalNote = 'Normal weight range. Standard weight-based or fixed dosing regimens apply.';
    professionalMedicalResponse = 'Normal Physiological Range (18.5 – 24.9 kg/m²). Eutrophic adult anthropometry. Preserved body fat and lean muscle distribution; calculate clearances and maintenance doses with Total Body Weight.';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    category = 'Overweight';
    isNormal = false;
    colorClass = 'text-blue-800 border-blue-300 bg-blue-50';
    badgeBg = 'bg-blue-100 text-blue-800 font-semibold';
    clinicalNote = 'Increased risk for developing hypertension, dyslipidemia, and Type 2 Diabetes. Recommend lifestyle and dietary intervention.';
    professionalMedicalResponse = 'Above Normal Reference Range (25.0 – 29.9 kg/m²). Pre-obesity / Overweight. Counsel on lifestyle modifications; baseline drug pharmacokinetics typically remain within standard physiological clearance parameters.';
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    category = 'Class I Obesity';
    isNormal = false;
    colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
    badgeBg = 'bg-amber-100 text-amber-800 font-semibold';
    clinicalNote = 'Obesity alters volume of distribution (Vd). For aminoglycosides and vancomycin, calculate clearance and dose using Adjusted Body Weight (AdjBW).';
    professionalMedicalResponse = 'Above Normal Range (≥ 30.0 kg/m²). Class I Obesity. Increased volume of distribution for lipophilic drugs. Use Adjusted Body Weight for hydrophilic antimicrobials to avoid renal toxicity.';
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    category = 'Class II Obesity';
    isNormal = false;
    colorClass = 'text-orange-800 border-orange-300 bg-orange-50';
    badgeBg = 'bg-orange-100 text-orange-800 font-semibold';
    clinicalNote = 'High cardiometabolic risk. Hydrophilic drug clearance may be overestimated if using Total Body Weight alone.';
    professionalMedicalResponse = 'Above Normal Range (35.0 – 39.9 kg/m²). Class II Moderate-to-Severe Obesity. Mandates Adjusted Body Weight calculation for renally eliminated medications.';
  } else {
    category = 'Class III Severe Obesity';
    isNormal = false;
    colorClass = 'text-rose-800 border-rose-300 bg-rose-50';
    badgeBg = 'bg-rose-100 text-rose-800 font-semibold';
    clinicalNote = 'Severe obesity. High risk of obstructive sleep apnea, NAFLD, and accelerated CKD progression. Must use AdjBW for renally dosed antimicrobials.';
    professionalMedicalResponse = 'Critically Above Normal Range (≥ 40.0 kg/m²). Class III Morbid Obesity. Marked alteration of hepatic blood flow and drug distribution; therapeutic drug monitoring (TDM) recommended.';
  }

  return { bmi, category, normalRange, isNormal, colorClass, badgeBg, ibw, adjBw, bsa, isObese, clinicalNote, professionalMedicalResponse };
}

export interface BloodPressureResult {
  systolic: number;
  diastolic: number;
  stage: 'Normal' | 'Elevated' | 'Stage 1 Hypertension' | 'Stage 2 Hypertension' | 'Hypertensive Urgency / Crisis' | 'Hypotension Alert';
  normalRange: string;
  isNormal: boolean;
  professionalMedicalResponse: string;
  map: number; // Mean Arterial Pressure (mmHg)
  mapNormalRange: string;
  mapIsNormal: boolean;
  mapProfessionalResponse: string;
  pulsePressure: number; // SBP - DBP (mmHg)
  ppNormalRange: string;
  ppIsNormal: boolean;
  ppProfessionalResponse: string;
  heartRateEvaluation: 'Bradycardia' | 'Normal Heart Rate' | 'Tachycardia';
  colorClass: string;
  isUrgent: boolean;
  firstLineTherapyNote: string;
  recommendation: string;
}

export function evaluateBloodPressure(
  systolic: number,
  diastolic: number,
  pulseBpm: number,
  hasDiabetesOrCkd: boolean = false,
  isAfricanAncestry: boolean = true
): BloodPressureResult {
  const sbp = Math.max(50, Math.min(260, systolic));
  const dbp = Math.max(30, Math.min(160, diastolic));
  const hr = Math.max(30, Math.min(220, pulseBpm));

  // Mean Arterial Pressure: DBP + 1/3(SBP - DBP)
  const map = parseFloat((dbp + (sbp - dbp) / 3).toFixed(1));
  const pulsePressure = sbp - dbp;

  const normalRange = 'SBP < 120 mmHg and DBP < 80 mmHg (AHA/ACC & Ethiopian STG)';
  const mapNormalRange = '70 – 100 mmHg (Clinical Minimum Target: ≥ 65 mmHg)';
  const ppNormalRange = '30 – 50 mmHg';

  const mapIsNormal = map >= 70 && map <= 100;
  let mapProfessionalResponse = '';
  if (map < 65) {
    mapProfessionalResponse = 'Below Perfusion Threshold (< 65 mmHg). Inadequate vital organ perfusion pressure. High risk of ischemic acute kidney injury (AKI).';
  } else if (map >= 65 && map < 70) {
    mapProfessionalResponse = 'Marginal Perfusion (65 – 69 mmHg). Meets minimum shock resuscitation threshold, but close hemodynamic monitoring is warranted.';
  } else if (map >= 70 && map <= 100) {
    mapProfessionalResponse = 'Normal Physiological MAP (70 – 100 mmHg). Adequate coronary, cerebral, and renal microvascular perfusion maintained.';
  } else {
    mapProfessionalResponse = 'Above Physiological Range (> 100 mmHg). Elevated cardiac afterload and chronic vascular resistance.';
  }

  const ppIsNormal = pulsePressure >= 30 && pulsePressure <= 50;
  let ppProfessionalResponse = '';
  if (pulsePressure > 60) {
    ppProfessionalResponse = 'Widened Pulse Pressure (> 60 mmHg). Indicates significant central aortic stiffness, isolated systolic hypertension, and heightened cardiovascular event risk.';
  } else if (pulsePressure < 30) {
    ppProfessionalResponse = 'Narrowed Pulse Pressure (< 30 mmHg). May signify reduced stroke volume, cardiac tamponade, or severe aortic stenosis.';
  } else {
    ppProfessionalResponse = 'Normal Arterial Compliance (30 – 50 mmHg). Normal stroke volume and vascular elasticity.';
  }

  let hrCategory: BloodPressureResult['heartRateEvaluation'] = 'Normal Heart Rate';
  if (hr < 60) hrCategory = 'Bradycardia';
  else if (hr > 100) hrCategory = 'Tachycardia';

  let stage: BloodPressureResult['stage'] = 'Normal';
  let isNormal = false;
  let colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
  let isUrgent = false;
  let recommendation = '';
  let firstLineTherapyNote = '';
  let professionalMedicalResponse = '';

  if (sbp < 90 || dbp < 60) {
    stage = 'Hypotension Alert';
    isNormal = false;
    colorClass = 'text-blue-800 border-blue-300 bg-blue-50';
    isUrgent = false;
    recommendation = 'Assess for hypovolemia, sepsis, medication overdose (excessive vasodilators or diuretics), or fasting dehydration.';
    firstLineTherapyNote = 'Hold antihypertensives; evaluate volume status and orthostatic vitals.';
    professionalMedicalResponse = 'Below Normal Physiological Threshold (SBP < 90 or DBP < 60 mmHg). Clinical Hypotension. Monitor for cerebral hypoperfusion, lightheadedness, and syncope. Hold vasodilators.';
  } else if (sbp >= 180 || dbp >= 120) {
    stage = 'Hypertensive Urgency / Crisis';
    isNormal = false;
    colorClass = 'text-rose-800 border-rose-300 bg-rose-50';
    isUrgent = true;
    recommendation = 'Immediate evaluation for acute target organ damage (encephalopathy, acute pulmonary edema, acute renal failure, aortic dissection). If organ damage is present, manage in ICU with IV labetalol or hydralazine; if asymptomatic urgency, cautiously lower over 24-48 hours with oral agents.';
    firstLineTherapyNote = 'Avoid rapid sublingual Nifedipine drop due to cerebral hypoperfusion risks. Use oral Amlodipine 5-10mg or oral Captopril under observation.';
    professionalMedicalResponse = 'Markedly Above Normal Range (SBP ≥ 180 or DBP ≥ 120 mmHg). Hypertensive Crisis / Emergency. Screen immediately for acute encephalopathy, papilledema, pulmonary edema, and acute renal decline.';
  } else if (sbp >= 140 || dbp >= 90) {
    stage = 'Stage 2 Hypertension';
    isNormal = false;
    colorClass = 'text-rose-800 border-rose-200 bg-rose-50';
    recommendation = 'Prompt pharmacological initiation alongside lifestyle modification. Two first-line agents of different classes are generally recommended for BP > 20/10 mmHg above target.';
    if (hasDiabetesOrCkd) {
      firstLineTherapyNote = 'Preferred: ACE-Inhibitor (Enalapril 5-10mg daily) or ARB (Losartan 50mg daily) + CCB (Amlodipine 5mg daily) or Thiazide (HCTZ 12.5-25mg). Renoprotective benefit documented.';
    } else if (isAfricanAncestry) {
      firstLineTherapyNote = 'Preferred: Calcium Channel Blocker (Amlodipine 5-10mg) OR Thiazide diuretic (HCTZ 12.5-25mg). Monotherapy with ACEi has attenuated BP-lowering in low-renin African populations unless combined with CCB or diuretic.';
    } else {
      firstLineTherapyNote = 'ACE-Inhibitor, ARB, CCB, or Thiazide diuretic.';
    }
    professionalMedicalResponse = 'Significantly Above Normal Range (Stage 2 Hypertension: SBP ≥ 140 or DBP ≥ 90 mmHg). Ethiopian National STG mandates initiating combination therapy with two synergistic first-line agents.';
  } else if (sbp >= 130 || dbp >= 80) {
    stage = 'Stage 1 Hypertension';
    isNormal = false;
    colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
    recommendation = 'Initiate lifestyle counseling (sodium restriction, exercise, weight loss). If 10-year ASCVD risk ≥10% or comorbid Diabetes/CKD, initiate monotherapy.';
    firstLineTherapyNote = hasDiabetesOrCkd
      ? 'Start Enalapril 5mg daily or Losartan 50mg daily to protect renal microvasculature.'
      : 'Start Amlodipine 5mg or HCTZ 12.5mg daily.';
    professionalMedicalResponse = 'Above Normal Range (Stage 1 Hypertension: SBP 130 – 139 or DBP 80 – 89 mmHg). Non-pharmacological lifestyle intervention recommended; initiate monotherapy if diabetic or CKD is present.';
  } else if (sbp >= 120 && dbp < 80) {
    stage = 'Elevated';
    isNormal = false;
    colorClass = 'text-blue-800 border-blue-300 bg-blue-50';
    recommendation = 'Non-pharmacological lifestyle interventions. Re-evaluate blood pressure in 3 to 6 months.';
    firstLineTherapyNote = 'Encourage reduction of dietary salt, physical activity, and moderation of khat/caffeine consumption.';
    professionalMedicalResponse = 'Borderline / Elevated Blood Pressure (SBP 120 – 129 and DBP < 80 mmHg). Above optimal target. Non-pharmacological sodium restriction and lifestyle adjustments recommended without pharmacotherapy.';
  } else {
    stage = 'Normal';
    isNormal = true;
    colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
    recommendation = 'Maintain healthy lifestyle. Reassess blood pressure annually at outpatient checkups.';
    firstLineTherapyNote = 'Continue current preventative health behaviors.';
    professionalMedicalResponse = 'Normal Physiological Blood Pressure (Normotensive: SBP < 120 and DBP < 80 mmHg). Hemodynamically stable with optimal systemic and renal vascular perfusion.';
  }

  return {
    systolic: sbp,
    diastolic: dbp,
    stage,
    normalRange,
    isNormal,
    professionalMedicalResponse,
    map,
    mapNormalRange,
    mapIsNormal,
    mapProfessionalResponse,
    pulsePressure,
    ppNormalRange,
    ppIsNormal,
    ppProfessionalResponse,
    heartRateEvaluation: hrCategory,
    colorClass,
    isUrgent,
    firstLineTherapyNote,
    recommendation
  };
}

export interface GlycemicResult {
  valueMgDl: number;
  valueMmolL: number;
  type: 'Fasting' | 'Random' | 'HbA1c';
  status: 'Severe Hypoglycemia' | 'Hypoglycemia' | 'Normal Glycemia' | 'Impaired Fasting Glucose / Pre-diabetes' | 'Diabetes Mellitus Range' | 'Hyperglycemic Crisis Range';
  normalRange: string;
  isNormal: boolean;
  professionalMedicalResponse: string;
  eAgMgDl?: number;
  eAgMmolL?: number;
  colorClass: string;
  badgeBg: string;
  clinicalAction: string;
}

export function evaluateGlycemia(
  value: number,
  unit: 'mg/dL' | 'mmol/L',
  testType: 'Fasting' | 'Random' | 'HbA1c'
): GlycemicResult {
  let valMgDl = 0;
  let valMmolL = 0;

  if (testType === 'HbA1c') {
    const a1c = Math.max(3.5, Math.min(18.0, value));
    // eAG formula (Nathan et al.): 28.7 * A1C - 46.7 mg/dL
    const eAgMg = parseFloat((28.7 * a1c - 46.7).toFixed(0));
    const eAgMmol = parseFloat((eAgMg / 18.018).toFixed(1));

    const normalRange = 'HbA1c < 5.7% (General Diabetic Treatment Target: < 7.0%)';
    let isNormal = false;
    let status: GlycemicResult['status'] = 'Normal Glycemia';
    let colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
    let badgeBg = 'bg-emerald-100 text-emerald-800';
    let action = '';
    let professionalMedicalResponse = '';

    if (a1c < 5.7) {
      status = 'Normal Glycemia';
      isNormal = true;
      colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
      badgeBg = 'bg-emerald-100 text-emerald-800';
      action = 'Normal HbA1c (<5.7%). Continue routine annual screening.';
      professionalMedicalResponse = 'Normal Physiological Glycated Hemoglobin (< 5.7%). Preserved long-term glucose homeostasis over preceding 8–12 weeks.';
    } else if (a1c >= 5.7 && a1c <= 6.4) {
      status = 'Impaired Fasting Glucose / Pre-diabetes';
      isNormal = false;
      colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
      badgeBg = 'bg-amber-100 text-amber-800';
      action = 'Pre-diabetes (5.7 - 6.4%). Intensive lifestyle intervention: 5-7% weight reduction, dietary carb moderation, recheck in 6 months.';
      professionalMedicalResponse = 'Above Normal Range (5.7 – 6.4%). Pre-diabetes / High risk of progression to Type 2 Diabetes. Recommend aggressive dietary and lifestyle modifications.';
    } else if (a1c >= 6.5 && a1c <= 7.0) {
      status = 'Diabetes Mellitus Range';
      isNormal = false;
      colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
      badgeBg = 'bg-emerald-100 text-emerald-800 font-bold';
      action = 'HbA1c meeting standard ADA & Ethiopian STG diabetic treatment target (<7.0%). Maintain current regimen.';
      professionalMedicalResponse = 'Above Physiological Normal, but At Diabetic Clinical Target (6.5 – 7.0%). Excellent chronic glycemic control in established diabetic patient.';
    } else if (a1c > 7.0 && a1c <= 8.5) {
      status = 'Diabetes Mellitus Range';
      isNormal = false;
      colorClass = 'text-orange-800 border-orange-300 bg-orange-50';
      badgeBg = 'bg-orange-100 text-orange-800';
      action = 'Suboptimal glycemic control (>7.0%). Dual oral antidiabetic therapy indicated (Metformin + Glibenclamide or DPP4-i/SGLT2-i).';
      professionalMedicalResponse = 'Above Recommended Treatment Goal (> 7.0%). Suboptimally controlled Diabetes Mellitus. Review medication adherence and consider dose titration or combination therapy.';
    } else {
      status = 'Hyperglycemic Crisis Range';
      isNormal = false;
      colorClass = 'text-rose-900 border-rose-400 bg-rose-100';
      badgeBg = 'bg-rose-200 text-rose-900';
      action = 'Severe chronic hyperglycemia (A1c >8.5%). High risk of microvascular complications; consider initiating basal insulin therapy (NPH or Glargine).';
      professionalMedicalResponse = 'Markedly Above Recommended Range (> 8.5%). Poor glycemic control with high risk of diabetic nephropathy, retinopathy, and neuropathy. Insulin initiation evaluation required.';
    }

    return {
      valueMgDl: a1c,
      valueMmolL: a1c,
      type: 'HbA1c',
      status,
      normalRange,
      isNormal,
      professionalMedicalResponse,
      eAgMgDl: eAgMg,
      eAgMmolL: eAgMmol,
      colorClass,
      badgeBg,
      clinicalAction: action
    };
  }

  // Convert for Blood Glucose
  if (unit === 'mg/dL') {
    valMgDl = parseFloat(value.toFixed(0));
    valMmolL = parseFloat((value / 18.018).toFixed(1));
  } else {
    valMmolL = parseFloat(value.toFixed(1));
    valMgDl = parseFloat((value * 18.018).toFixed(0));
  }

  let status: GlycemicResult['status'] = 'Normal Glycemia';
  let isNormal = false;
  let colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
  let badgeBg = 'bg-emerald-100 text-emerald-800';
  let clinicalAction = '';
  let normalRange = '';
  let professionalMedicalResponse = '';

  if (valMgDl < 54) {
    status = 'Severe Hypoglycemia';
    isNormal = false;
    normalRange = testType === 'Fasting' ? '70 – 99 mg/dL (3.9 – 5.5 mmol/L)' : '70 – 139 mg/dL (3.9 – 7.7 mmol/L)';
    colorClass = 'text-rose-900 border-rose-400 bg-rose-100';
    badgeBg = 'bg-rose-200 text-rose-900 font-bold';
    clinicalAction = 'CRITICAL EMERGENCY: Give IV Dextrose 40% (25-50 mL) or 10% Dextrose infusion immediately if altered mental state, or 15-20g rapid sugar water if conscious. Recheck in 15 minutes.';
    professionalMedicalResponse = 'Critically Below Normal Range (< 54 mg/dL / < 3.0 mmol/L). Severe neuroglycopenia crisis. Immediate parenteral dextrose therapy mandated.';
  } else if (valMgDl < 70) {
    status = 'Hypoglycemia';
    isNormal = false;
    normalRange = testType === 'Fasting' ? '70 – 99 mg/dL (3.9 – 5.5 mmol/L)' : '70 – 139 mg/dL (3.9 – 7.7 mmol/L)';
    colorClass = 'text-rose-800 border-rose-300 bg-rose-50';
    badgeBg = 'bg-rose-100 text-rose-800 font-bold';
    clinicalAction = 'Immediate "Rule of 15": Take 15 grams of fast-acting carbohydrate (3-4 sugar cubes or 1/2 cup juice/sweet tea). Recheck BG in 15 minutes. Identify drug cause (Glibenclamide, Insulin).';
    professionalMedicalResponse = 'Below Normal Physiological Range (< 70 mg/dL / < 3.9 mmol/L). Symptomatic hypoglycemia. Execute clinical Rule of 15 carbohydrate rescue protocol.';
  } else if (testType === 'Fasting') {
    normalRange = '70 – 99 mg/dL (3.9 – 5.5 mmol/L)';
    if (valMgDl >= 70 && valMgDl <= 99) {
      status = 'Normal Glycemia';
      isNormal = true;
      colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
      badgeBg = 'bg-emerald-100 text-emerald-800';
      clinicalAction = 'Normal fasting plasma glucose. Maintain balanced diet and routine annual screening.';
      professionalMedicalResponse = 'Normal Physiological Fasting Range (70 – 99 mg/dL / 3.9 – 5.5 mmol/L). Euglycemic. Intact basal hepatic gluconeogenesis and beta-cell insulin sensitivity.';
    } else if (valMgDl >= 100 && valMgDl <= 125) {
      status = 'Impaired Fasting Glucose / Pre-diabetes';
      isNormal = false;
      colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
      badgeBg = 'bg-amber-100 text-amber-800';
      clinicalAction = 'Impaired Fasting Glucose (100-125 mg/dL). Confirm with repeat test or HbA1c; start lifestyle modifications.';
      professionalMedicalResponse = 'Above Normal Reference Range (100 – 125 mg/dL / 5.6 – 6.9 mmol/L). Impaired Fasting Glucose / Pre-diabetes. Requires lifestyle intervention to prevent overt diabetes.';
    } else if (valMgDl >= 126 && valMgDl < 300) {
      status = 'Diabetes Mellitus Range';
      isNormal = false;
      colorClass = 'text-orange-800 border-orange-300 bg-orange-50';
      badgeBg = 'bg-orange-100 text-orange-800';
      clinicalAction = 'Diagnostic for Diabetes Mellitus (≥126 mg/dL / ≥7.0 mmol/L fasting on repeat). Initiate diabetic education, Metformin, and review dietary patterns.';
      professionalMedicalResponse = 'Above Normal Reference Range (≥ 126 mg/dL / ≥ 7.0 mmol/L). Meets diagnostic criteria for Diabetes Mellitus on confirmation. Initiate Ethiopian STG antidiabetic care.';
    } else {
      status = 'Hyperglycemic Crisis Range';
      isNormal = false;
      colorClass = 'text-rose-900 border-rose-400 bg-rose-100';
      badgeBg = 'bg-rose-200 text-rose-900';
      clinicalAction = 'Severe hyperglycemia (≥300 mg/dL / ≥16.7 mmol/L). Check urine or serum ketones immediately to rule out Diabetic Ketoacidosis (DKA) or Hyperosmolar Hyperglycemic State (HHS). Hydrate with IV 0.9% Normal Saline.';
      professionalMedicalResponse = 'Markedly Above Normal Range (≥ 300 mg/dL / ≥ 16.7 mmol/L). Acute hyperglycemic crisis. Immediate screening for DKA/HHS and aggressive fluid resuscitation required.';
    }
  } else {
    // Random Blood Sugar
    normalRange = '70 – 139 mg/dL (3.9 – 7.7 mmol/L)';
    if (valMgDl >= 70 && valMgDl < 140) {
      status = 'Normal Glycemia';
      isNormal = true;
      colorClass = 'text-emerald-800 border-emerald-300 bg-emerald-50';
      badgeBg = 'bg-emerald-100 text-emerald-800';
      clinicalAction = 'Normal random plasma glucose. Intact postprandial insulin disposal.';
      professionalMedicalResponse = 'Normal Physiological Random Glycemia (70 – 139 mg/dL / 3.9 – 7.7 mmol/L). Normal postprandial glycemic regulation.';
    } else if (valMgDl >= 140 && valMgDl <= 199) {
      status = 'Impaired Fasting Glucose / Pre-diabetes';
      isNormal = false;
      colorClass = 'text-amber-800 border-amber-300 bg-amber-50';
      badgeBg = 'bg-amber-100 text-amber-800';
      clinicalAction = 'Impaired glucose tolerance (140-199 mg/dL). Recommend formal Fasting Blood Sugar or Oral Glucose Tolerance Test (OGTT).';
      professionalMedicalResponse = 'Above Normal Postprandial Range (140 – 199 mg/dL / 7.8 – 11.0 mmol/L). Impaired glucose tolerance. Schedule confirmatory fasting plasma evaluation.';
    } else if (valMgDl >= 200 && valMgDl < 300) {
      status = 'Diabetes Mellitus Range';
      isNormal = false;
      colorClass = 'text-orange-800 border-orange-300 bg-orange-50';
      badgeBg = 'bg-orange-100 text-orange-800';
      clinicalAction = 'Random Blood Glucose ≥200 mg/dL in patient with classic symptoms (polyuria, polydipsia, weight loss) is diagnostic of Diabetes Mellitus.';
      professionalMedicalResponse = 'Above Normal Range (≥ 200 mg/dL / ≥ 11.1 mmol/L). Diagnostic threshold for Diabetes Mellitus when accompanied by osmotic symptoms.';
    } else {
      status = 'Hyperglycemic Crisis Range';
      isNormal = false;
      colorClass = 'text-rose-900 border-rose-400 bg-rose-100';
      badgeBg = 'bg-rose-200 text-rose-900';
      clinicalAction = 'Marked hyperglycemia. Assess hydration status, evaluate for precipitating infections, and screen for ketoacidosis.';
      professionalMedicalResponse = 'Markedly Above Normal Range (≥ 300 mg/dL). Severe uncontrolled hyperglycemia requiring emergency ketone and electrolyte evaluation.';
    }
  }

  return {
    valueMgDl: valMgDl,
    valueMmolL: valMmolL,
    type: testType,
    status,
    normalRange,
    isNormal,
    professionalMedicalResponse,
    colorClass,
    badgeBg,
    clinicalAction
  };
}

// Diagnostic Electrolyte Calculations
export function calculateAnionGap(na: number, cl: number, hco3: number): {
  anionGap: number;
  normalRange: string;
  isNormal: boolean;
  status: 'Normal' | 'High Anion Gap Metabolic Acidosis (HAGMA)' | 'Low Anion Gap';
  professionalMedicalResponse: string;
  etiologies: string;
} {
  const ag = parseFloat((na - (cl + hco3)).toFixed(1));
  const normalRange = '8 – 12 mEq/L';
  const isNormal = ag >= 8 && ag <= 12;

  if (ag > 12) {
    return {
      anionGap: ag,
      normalRange,
      isNormal: false,
      status: 'High Anion Gap Metabolic Acidosis (HAGMA)',
      professionalMedicalResponse: 'Above Normal Physiological Range (> 12 mEq/L). Indicates pathological accumulation of unmeasured organic fixed anions (ketoacids, lactate, uremic toxins).',
      etiologies: 'MUDPILES: Methanol, Uremia (renal failure), DKA/Alcoholic ketoacidosis, Paraldehyde, Isoniazid/Iron, Lactic acidosis (sepsis/hypoxia), Ethylene glycol, Salicylates (aspirin).'
    };
  } else if (ag < 6) {
    return {
      anionGap: ag,
      normalRange,
      isNormal: false,
      status: 'Low Anion Gap',
      professionalMedicalResponse: 'Below Normal Physiological Range (< 6 mEq/L). Typically caused by severe hypoalbuminemia (for each 1.0 g/dL drop in albumin, expected AG drops by ~2.5 mEq/L) or paraproteinemia.',
      etiologies: 'Severe hypoalbuminemia, multiple myeloma (IgG paraproteins), severe hypercalcemia, hypermagnesemia, or lithium intoxication.'
    };
  }
  return {
    anionGap: ag,
    normalRange,
    isNormal: true,
    status: 'Normal',
    professionalMedicalResponse: 'Normal Physiological Anion Gap (8 – 12 mEq/L). Balanced unmeasured serum cations and anions; High Anion Gap Metabolic Acidosis is excluded.',
    etiologies: 'Normal anion gap maintained. If metabolic acidosis is documented on ABG, consider Normal Anion Gap (Hyperchloremic) Acidosis (e.g. diarrhea, renal tubular acidosis).'
  };
}

export function calculateCorrectedCalcium(serumCa: number, serumAlbumin: number): {
  correctedCa: number;
  normalRange: string;
  isNormal: boolean;
  status: 'Normal Corrected Calcium' | 'Hypocalcemia' | 'Hypercalcemia';
  professionalMedicalResponse: string;
  interpretation: string;
} {
  // Corrected Ca = Measured Total Ca + 0.8 * (4.0 - Albumin)
  const corr = parseFloat((serumCa + 0.8 * (4.0 - serumAlbumin)).toFixed(2));
  const normalRange = '8.5 – 10.5 mg/dL (2.12 – 2.62 mmol/L)';
  const isNormal = corr >= 8.5 && corr <= 10.5;

  let status: 'Normal Corrected Calcium' | 'Hypocalcemia' | 'Hypercalcemia' = 'Normal Corrected Calcium';
  let interp = '';
  let professionalMedicalResponse = '';

  if (corr < 8.5) {
    status = 'Hypocalcemia';
    interp = 'Hypocalcemia: evaluate for hypoparathyroidism, vitamin D deficiency, or CKD mineral bone disease.';
    professionalMedicalResponse = 'Below Normal Physiological Range (< 8.5 mg/dL). True biological hypocalcemia. Monitor for neuromuscular irritability (tetany, paresthesias) and QT prolongation.';
  } else if (corr > 10.5) {
    status = 'Hypercalcemia';
    interp = 'Hypercalcemia: rule out primary hyperparathyroidism, malignancy, or thiazide-induced calcium retention.';
    professionalMedicalResponse = 'Above Normal Physiological Range (> 10.5 mg/dL). True biological hypercalcemia. Evaluate for primary hyperparathyroidism, granulomatous infection (TB), or malignancy.';
  } else {
    status = 'Normal Corrected Calcium';
    interp = 'Normal corrected calcium (8.5 - 10.5 mg/dL). Ionized calcium homeostasis preserved.';
    professionalMedicalResponse = 'Normal Physiological Corrected Calcium (8.5 – 10.5 mg/dL). Normocalcemia. Physiologically active ionized calcium fraction is within normal limits.';
  }

  return { correctedCa: corr, normalRange, isNormal, status, professionalMedicalResponse, interpretation: interp };
}
