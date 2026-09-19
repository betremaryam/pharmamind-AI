export type PageView = 'home' | 'product' | 'institutions' | 'evidence' | 'about' | 'contact' | 'simulator';

export interface CaseStudy {
  id: string;
  code: string;
  title: string;
  condition: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  patient: {
    name: string;
    age: number;
    gender: string;
    setting: string;
    chiefComplaint: string;
    history: string;
    vitals: {
      bp: string;
      hr: string;
      temp: string;
      weight: string;
      scr: string;
      k: string;
      otherLabs?: string[];
    };
    currentMedications: {
      drug: string;
      dose: string;
      frequency: string;
      source: string;
      indication: string;
    }[];
  };
  totalProblemsCount: number;
  availableOptions: {
    id: string;
    text: string;
    isActualProblem: boolean;
    category: 'Indication' | 'Effectiveness' | 'Safety' | 'Interaction' | 'Adherence' | 'Monitoring';
    preceptorRationale: string;
    citation: string;
  }[];
  modelPlan: {
    switchOrStop: string;
    initiate: string;
    monitoring: string;
    counselling: string;
    followUp: string;
  };
  modelSoap: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
}

export interface EvidenceStudy {
  id: string;
  category: 'Adherence & DTPs' | 'Workforce & Supervision' | 'Simulation Method' | 'Market Context';
  title: string;
  authorsOrSource: string;
  year: string;
  summary: string;
  statHighlight?: string;
  url: string;
}

export interface PilotInquiry {
  name: string;
  email: string;
  role: string;
  institution: string;
  cohortSize?: string;
  message: string;
  submittedAt: string;
}
