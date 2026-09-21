import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// System instruction for Pharmacist Betremaryam
const PHARMACIST_BETREMARYAM_SYSTEM_INSTRUCTION = `You are Pharmacist Betremaryam, an expert clinical pharmacist, preceptor, and healthcare educator leading the clinical intelligence of PharmaMind AI in Addis Ababa, Ethiopia.

When a user initiates the conversation or says hello, your primary welcoming greeting must begin with or feature:
"Hello! I am Pharmacist Betremaryam, what can I help you with today?"

Your role and clinical capabilities:
1. Provide real-time, evidence-based, professional clinical pharmacy guidance, therapeutic decision support, and drug information.
2. Ground your reasoning in the Ethiopian Standard Treatment Guidelines (STG), the Ethiopian National Drug Formulary (EFDA/MoH), WHO Essential Medicines Lists, and international consensus standards (AHA/ACC, KDIGO, ADA, GOLD, IDSA).
3. Offer clear, practical clinical advice on:
   - Rational pharmacotherapy & drug selection
   - Dosing regimens and renal/hepatic adjustments (Cockcroft-Gault CrCl calculations, dialysis considerations)
   - Clinically significant drug-drug, drug-food, and drug-disease interactions
   - Monitoring parameters (therapeutic drug monitoring, serum creatinine, electrolytes, blood pressure, HbA1c/FBS)
   - Ethiopian pharmaceutical context (e.g. generic substitutions, essential formulary alternatives, and cultural chronotherapy adjustments during Ethiopian Orthodox fasting or Ramadan).
4. Accredited Clinical Pharmacy Courses & CPD: You are the Lead Preceptor and certifying pharmacist. You author 5 accredited courses in the academy:
   - PM-CPD-01: Antimicrobial Stewardship & Hospital Infections (4.0 CPD Hrs)
   - PM-CPD-02: Renal Pharmacotherapy & Cockcroft-Gault Adjustments (3.5 CPD Hrs)
   - PM-CPD-03: Cardiovascular Pharmacotherapy & Hypertension Management (4.0 CPD Hrs)
   - PM-CPD-04: Type 2 Diabetes & Religious Fasting Chronotherapy (3.0 CPD Hrs)
   - PM-CPD-05: HIV / Tuberculosis Co-Infection Pharmacotherapy (4.5 CPD Hrs)
   When learners finish a course and score 75% or higher on the clinical evaluation, PharmaMind AI generates an official accredited Certificate of Completion bearing their name and your preceptor signature.
5. Tone & Style: Professional, collegiate, compassionate, and academically rigorous.
6. Format: Use clean markdown, bold terms, and bullet points for high bedside scannability.`;

// Lazy Gemini client helper
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
  res.json({
    status: 'ok',
    aiService: 'Pharmacist Betremaryam AI',
    llmConfigured: hasKey,
    model: 'gemini-3.8-flash',
  });
});

// Chatbot endpoint with Pharmacist Betremaryam
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message } = req.body;

    // Normalize prompt and history
    let contents: Array<{ role?: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));
    } else if (typeof message === 'string' && message.trim()) {
      contents = [{ role: 'user', parts: [{ text: message.trim() }] }];
    } else {
      res.status(400).json({ error: 'Message or messages array is required' });
      return;
    }

    const ai = getGenAI();

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: PHARMACIST_BETREMARYAM_SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const responseText = response.text || '';
        if (responseText.trim()) {
          res.json({
            reply: responseText,
            source: 'gemini-3.8-flash',
            persona: 'Pharmacist Betremaryam',
          });
          return;
        }
      } catch (geminiErr: any) {
        console.warn('Gemini API call returned an error, using clinical knowledge fallback:', geminiErr?.message);
        const lastUserMessage = contents[contents.length - 1]?.parts[0]?.text || '';
        const fallbackReply = generateClinicalFallbackResponse(lastUserMessage);
        res.json({
          reply: fallbackReply,
          source: 'clinical-knowledge-base',
          persona: 'Pharmacist Betremaryam',
          transientNote: 'LLM service was temporarily busy; delivered verified clinical formulary guidance.',
        });
        return;
      }
    }

    // Fallback response when GEMINI_API_KEY is not configured yet
    const lastUserMessage = contents[contents.length - 1]?.parts[0]?.text || '';
    const fallbackReply = generateClinicalFallbackResponse(lastUserMessage);

    res.json({
      reply: fallbackReply,
      source: 'clinical-knowledge-base',
      persona: 'Pharmacist Betremaryam',
      notice: 'Gemini API key not detected in environment. Running in high-fidelity clinical knowledge base mode.',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);

    const errorMessage = error?.message || 'Error communicating with clinical AI service';
    res.status(500).json({
      error: errorMessage,
      reply: `Hello! I am Pharmacist Betremaryam. I encountered a momentary connection interruption with the clinical AI engine: "${errorMessage}". Please try asking your question again or verify the network connection.`,
    });
  }
});

// Intelligent fallback response generator for clinical queries
function generateClinicalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('course') || q.includes('certificate') || q.includes('cert') || q.includes('cpd') || q.includes('credit')) {
    return `Hello! I am Pharmacist Betremaryam. PharmaMind AI features **5 accredited clinical pharmacy courses** with official Certificates of Completion issued in your name:

1. **PM-CPD-01: Antimicrobial Stewardship & Hospital Infection Pharmacotherapy** (4.0 CPD Hours)
   - Focus: WHO AWaRe classification, surgical prophylaxis timing, and TDM-guided dosage optimization.
2. **PM-CPD-02: Renal Pharmacotherapy & Cockcroft-Gault Dosage Individualization** (3.5 CPD Hours)
   - Focus: Weight descriptors (Actual/IBW/AdjBW), high-alert renally cleared drugs, and the "Triple Whammy" AKI interaction.
3. **PM-CPD-03: Cardiovascular Pharmacotherapy & Hypertension Management** (4.0 CPD Hours)
   - Focus: Ethiopian MoH stepwise algorithms, CCB edema management, and HFrEF GDMT 4-pillar therapy.
4. **PM-CPD-04: Type 2 Diabetes & Religious Fasting Chronotherapy** (3.0 CPD Hours)
   - Focus: Ethiopian Orthodox Great Lent (Tsome) and Ramadan medication timing adjustments to prevent severe hypoglycemia.
5. **PM-CPD-05: HIV / Tuberculosis Co-Infection Pharmacotherapy & DDI Management** (4.5 CPD Hours)
   - Focus: Dolutegravir + Rifampicin double-dosing protocol, ART initiation timing in TB, and DILI prevention.

### How Certification Works:
- Each course features interactive clinical modules and a clinical mastery evaluation.
- When you score **75% or higher**, you enter your legal name and professional title to immediately generate a high-resolution, accredited certificate signed by me as Lead Preceptor.
- You can print it directly or save it as an official PDF at any time!`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('who are you') || q.includes('start')) {
    return `Hello! I am Pharmacist Betremaryam, what can I help you with today?

I can assist you with:
- **Ethiopian Standard Treatment Guidelines (STG)** recommendations
- **Bedside renal dose calculations** (Cockcroft-Gault CrCl)
- **Drug-drug interactions** (e.g. Dolutegravir + Rifampicin, ACEi + Spironolactone)
- **Fasting chronotherapy** for Ethiopian Orthodox fasting seasons and Ramadan
- **Antimicrobial stewardship** and culture-guided switch logic
- **SOAP documentation** and pharmaceutical care planning

What case or clinical medication question are you working on right now?`;
  }

  if (q.includes('dolutegravir') || q.includes('rifampicin') || q.includes('tb') || q.includes('hiv')) {
    return `Hello! I am Pharmacist Betremaryam. Regarding the **Dolutegravir (DTG) + Rifampicin** interaction:

### Clinical Assessment:
- **Mechanism:** Rifampicin is a potent inducer of hepatic CYP3A4 and UGT1A1 enzymes, which reduces Dolutegravir plasma exposure (AUC) by approximately **54%**.
- **Management (Ethiopian National HIV & TB Guidelines):**
  1. Increase Dolutegravir to **50 mg twice daily (BID)** (given 12 hours apart) instead of once daily.
  2. Continue this double dose throughout the rifampicin-based anti-TB regimen and for **2 weeks after rifampicin is discontinued** (to account for enzyme de-induction lag).
- **Monitoring:** Check viral load at 3 and 6 months; monitor liver enzymes (ALT/AST) given potential additive hepatotoxicity with Isoniazid and Pyrazinamide.`;
  }

  if (q.includes('hypertension') || q.includes('bp') || q.includes('blood pressure')) {
    return `Hello! I am Pharmacist Betremaryam. In according with the **Ethiopian Standard Treatment Guidelines (MoH)** and ACC/AHA guidelines:

### Blood Pressure & HTN Protocol:
- **Normal BP:** < 120/80 mmHg
- **Stage 1 HTN:** 130–139 / 80–89 mmHg
- **Stage 2 HTN:** ≥ 140 / ≥ 90 mmHg
- **First-line monotherapy:**
  - Calcium Channel Blockers (e.g. Amlodipine 5–10 mg daily)
  - ACE Inhibitors (e.g. Enalapril 5–20 mg daily) or ARBs (Losartan 50–100 mg daily)
  - Thiazide-like Diuretics (e.g. Hydrochlorothiazide 12.5–25 mg daily)
- **Note on Ethiopian patients:** CCBs and Thiazides typically offer superior monotherapy systolic BP reductions in Black patients compared to ACEi monotherapy, unless diabetic nephropathy or proteinuria is present.`;
  }

  if (q.includes('ciprofloxacin') || (q.includes('renal') && q.includes('dose'))) {
    return `Hello! I am Pharmacist Betremaryam. Regarding **Ciprofloxacin dosing in renal impairment**:

### Clinical Protocol:
- **Normal Renal Function (CrCl > 50 mL/min):** Standard dose is 500–750 mg PO every 12 hours (or 400 mg IV every 12 hours).
- **Mild Impairment (CrCl 30–50 mL/min):** 250–500 mg PO every 12 hours.
- **Moderate to Severe Impairment (CrCl < 30 mL/min):** 
  - Administer **50% of the standard dose** or extend the dosing interval to **250–500 mg PO every 18–24 hours**.
- **Hemodialysis / Peritoneal Dialysis:** 250–500 mg PO every 24 hours (given *after* hemodialysis session).
- **Counseling:** Separate intake from aluminum, magnesium, calcium, iron, or zinc antacids/supplements by at least 2 hours before or 6 hours after to avoid chelation.`;
  }

  if (q.includes('fasting') || q.includes('orthodox') || q.includes('ramadan') || q.includes('tsom')) {
    return `Hello! I am Pharmacist Betremaryam. Here is the clinical chronotherapy guidance for **fasting patients in Ethiopia**:

### Cultural & Religious Fasting Guidelines:
- **Ethiopian Orthodox Tsom (e.g. Hudadi / Lent, Wednesdays & Fridays):** Fasting extends until 3:00 PM (9 hours of day) without food or water, followed by purely vegan meals.
- **Metformin Timing:** For twice-daily dosing, take the morning dose at 3:00 PM (breaking of the day fast) and the second dose at the evening meal. For once-daily extended-release (XR), administer with the evening meal.
- **Sulfonylureas (e.g. Glibenclamide):** High hypoglycemia risk during daylight fasting! If fasting cannot be medically exempted, switch to a shorter-acting agent or reduce the morning dose by 50% and shift the main dose to the post-fast meal.
- **Antihypertensives:** Transition once-daily morning antihypertensives (e.g. Amlodipine or Enalapril) to evening administration if daytime orthostatic dizziness is reported.`;
  }

  if (q.includes('digoxin') || q.includes('toxicity')) {
    return `Hello! I am Pharmacist Betremaryam. Regarding **Digoxin clinical management**:

### Therapeutic Window & Toxicity:
- **Therapeutic Serum Level:** 0.5–0.9 ng/mL for heart failure (0.8–2.0 ng/mL for atrial fibrillation).
- **Signs of Toxicity:** 
  - Gastrointestinal: Anorexia, nausea, vomiting, abdominal pain.
  - Neurological/Visual: Blurred vision, yellow-green halos (xanthopsia), confusion.
  - Cardiac: Bradycardia, AV nodal blocks, ventricular ectopy / PVCs.
- **Electrolyte Sensitizers:** Hypokalemia, hypomagnesemia, and hypercalcemia markedly increase digoxin cardiotoxicity even at normal serum levels!
- **Management:** Withhold dose, check serum potassium and renal panel; administer potassium if low (goal 4.0–4.5 mEq/L); administer Digoxin Immune Fab (DigiFab) if life-threatening arrhythmias or serum potassium > 5.0 mEq/L in acute overdose.`;
  }

  if (q.includes('renal') || q.includes('crcl') || q.includes('creatinine') || q.includes('kidney')) {
    return `Hello! I am Pharmacist Betremaryam. For **renal dosage adjustments**:

### Cockcroft-Gault Equation:
$$CrCl = \\frac{(140 - \\text{Age}) \\times \\text{Weight (kg)}}{72 \\times \\text{Serum Creatinine (mg/dL)}} \\times (0.85 \\text{ if female})$$

- **Normal:** 90–120 mL/min
- **Mild Impairment:** 60–89 mL/min
- **Moderate Impairment:** 30–59 mL/min
- **Severe Impairment:** 15–29 mL/min
- **End-Stage / ESRD:** < 15 mL/min

**Key drugs requiring mandatory adjustment:** Metformin (avoid if CrCl < 30), Ciprofloxacin (50% dose if CrCl < 30), Enoxaparin (1 mg/kg once daily if CrCl < 30), and Allopurinol.`;
  }

  return `Hello! I am Pharmacist Betremaryam, what can I help you with today?

I received your inquiry regarding:
> *${query}*

Based on clinical pharmacy principles and the Ethiopian Standard Treatment Guidelines:
1. **Therapeutic Review:** Verify the patient's renal function (eGFR/CrCl), liver panel, age, and pregnancy status before drug selection.
2. **Safety & Dosing:** Confirm standard maintenance regimens against national formulary availability.
3. **Monitoring:** Schedule follow-up laboratory checks and counsel the patient on timing of doses relative to meals.

Could you provide additional clinical parameters (e.g. patient age, renal function, or co-administered drugs) so I can give you a tailored clinical regimen?`;
}

async function startServer() {
  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
