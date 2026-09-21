export type PageView = 'home' | 'product' | 'institutions' | 'evidence' | 'about' | 'contact' | 'simulator' | 'courses';

export interface CourseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  guidelineReference: string;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  keyLearningPoints: string[];
  clinicalCaseExample?: {
    scenario: string;
    clinicalDecision: string;
    guidelineAdvice: string;
  };
}

export interface PharmacyCourse {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  category: 'Infectious Diseases' | 'Nephrology' | 'Cardiology' | 'Endocrinology' | 'HIV & TB' | 'First Aid & Emergency' | 'Ambulatory & Clinical Practice';
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  cpdPoints: number;
  durationHours: number;
  accreditationNote: string;
  instructor: {
    name: string;
    title: string;
    organization: string;
  };
  overview: string;
  learningObjectives: string[];
  guidelinesReferenced: string[];
  modules: CourseModule[];
  quiz: CourseQuizQuestion[];
  passingScorePercent: number;
}

export interface EarnedCertificate {
  certificateId: string;
  courseId: string;
  courseTitle: string;
  courseCode: string;
  cpdPoints: number;
  recipientName: string;
  recipientTitle: string;
  institution?: string;
  scorePercent: number;
  issuedDate: string;
  issuedTimestamp: number;
  instructorName: string;
  instructorTitle: string;
  verificationCode: string;
}

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
  phone?: string;
  role: string;
  institution: string;
  cohortSize?: string;
  message: string;
  submittedAt: string;
}

export interface EnrolledLearner {
  name: string;
  email: string;
  phone: string;
  education: string;
  institution?: string;
  licenseNumber?: string;
  enrolledAt: string;
}
