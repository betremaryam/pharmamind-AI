/**
 * Formspree Submission Service
 * Handles transmitting form responses, pilot inquiries, case assessment results,
 * and course profile registrations to Formspree:
 * - Course Profile Registration Store: https://formspree.io/f/xppwpydl
 * - Direct delivery to betremaryameshete@gmail.com
 */

export const FORMSPREE_COURSE_REGISTRATION_ID = 'xppwpydl';
export const FORMSPREE_COURSE_REGISTRATION_ENDPOINT = 'https://formspree.io/f/xppwpydl';
export const FORMSPREE_FALLBACK_EMAIL = 'betremaryameshete@gmail.com';
export const FORMSPREE_STORAGE_KEY = 'pharmamind_formspree_form_id';

export interface FormspreeResult {
  ok: boolean;
  error?: string;
  isConfirmationNeeded?: boolean;
}

/**
 * Resolves the active Formspree endpoint.
 * Priority:
 * 1. Explicitly configured form ID or full URL in localStorage
 * 2. Vite environment variable VITE_FORMSPREE_FORM_ID or VITE_FORMSPREE_ENDPOINT
 * 3. Default Formspree endpoint (https://formspree.io/f/xppwpydl)
 */
export function getFormspreeTarget(): { endpoint: string; displayTarget: string; isCustom: boolean } {
  const localFormId = typeof window !== 'undefined' ? localStorage.getItem(FORMSPREE_STORAGE_KEY) : null;
  const envEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const envFormId = import.meta.env.VITE_FORMSPREE_FORM_ID;

  if (localFormId && localFormId.trim()) {
    const trimmed = localFormId.trim();
    if (trimmed.startsWith('https://formspree.io/')) {
      return { endpoint: trimmed, displayTarget: trimmed, isCustom: true };
    }
    if (trimmed.includes('@')) {
      return { endpoint: `https://formspree.io/${trimmed}`, displayTarget: trimmed, isCustom: true };
    }
    return { endpoint: `https://formspree.io/f/${trimmed}`, displayTarget: `Form ID: ${trimmed}`, isCustom: true };
  }

  if (envEndpoint && envEndpoint.trim()) {
    return { endpoint: envEndpoint.trim(), displayTarget: envEndpoint.trim(), isCustom: true };
  }

  if (envFormId && envFormId.trim()) {
    return {
      endpoint: `https://formspree.io/f/${envFormId.trim()}`,
      displayTarget: `Form ID: ${envFormId.trim()}`,
      isCustom: true
    };
  }

  // Default to user's registered Formspree store endpoint (xppwpydl)
  return {
    endpoint: FORMSPREE_COURSE_REGISTRATION_ENDPOINT,
    displayTarget: `${FORMSPREE_COURSE_REGISTRATION_ID} (betremaryameshete@gmail.com)`,
    isCustom: false
  };
}

/**
 * Submits structured form response data to Formspree.
 */
export async function submitFormspreeResponse(
  payload: Record<string, any>
): Promise<FormspreeResult> {
  const { endpoint } = getFormspreeTarget();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _timestamp: new Date().toISOString(),
        _app: 'PharmaMind AI (Ethiopian Clinical Pharmacy Platform)',
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const data = await response.json().catch(() => ({}));

    // Formspree specific error formats
    if (data && data.errors && Array.isArray(data.errors)) {
      const messages = data.errors.map((e: any) => e.message || e.field).join(', ');
      return { ok: false, error: messages || 'Submission rejected by Formspree.' };
    }

    if (data && data.error) {
      return { ok: false, error: data.error };
    }

    if (response.status === 404) {
      return {
        ok: false,
        error: `Formspree target returned 404. Please verify the Formspree Form ID in settings.`
      };
    }

    return {
      ok: false,
      error: `Formspree responded with status code ${response.status}.`
    };
  } catch (err: any) {
    console.error('Failed to submit to Formspree:', err);
    return {
      ok: false,
      error: err?.message || 'Network connection failed while connecting to Formspree.'
    };
  }
}

/**
 * Submits course profile registration specifically to the designated store:
 * https://formspree.io/f/xppwpydl
 */
export async function submitCourseProfileRegistration(
  learner: {
    name: string;
    email: string;
    phone: string;
    education: string;
    institution?: string;
    enrolledAt?: string;
  },
  course?: {
    code?: string;
    title?: string;
    cpdPoints?: number;
  } | null
): Promise<FormspreeResult> {
  try {
    const payload = {
      _subject: `New Clinical Academy Registration: ${learner.name} [${course?.code || 'Academy Profile'}]`,
      formType: 'Course Profile Registration',
      fullName: learner.name,
      email: learner.email,
      phone: learner.phone,
      qualification: learner.education,
      institution: learner.institution || 'Not specified',
      enrolledCourseCode: course?.code || 'General Academy Profile',
      enrolledCourseTitle: course?.title || 'All Accredited Clinical Courses',
      cpdCreditHours: course?.cpdPoints ?? 'Multiple',
      registrationTimestamp: learner.enrolledAt || new Date().toISOString(),
      storeEndpoint: FORMSPREE_COURSE_REGISTRATION_ENDPOINT,
      directiveCompliance: 'Ethiopian MoH CPD Directive No. 332/2020',
      _app: 'PharmaMind AI (Ethiopian Clinical Pharmacy Academy)',
      _timestamp: new Date().toISOString(),
    };

    const response = await fetch(FORMSPREE_COURSE_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }

    const data = await response.json().catch(() => ({}));
    if (data && data.errors && Array.isArray(data.errors)) {
      const messages = data.errors.map((e: any) => e.message || e.field).join(', ');
      return { ok: false, error: messages || 'Submission rejected by Formspree.' };
    }
    if (data && data.error) {
      return { ok: false, error: data.error };
    }

    return {
      ok: false,
      error: `Formspree store returned status ${response.status}.`,
    };
  } catch (err: any) {
    console.error('Failed to submit course profile registration to Formspree store:', err);
    return {
      ok: false,
      error: err?.message || 'Network error while submitting to Formspree store.',
    };
  }
}

/**
 * Transmits certificate issuance records to Formspree store for verification logging.
 */
export async function submitCertificateIssuanceRecord(cert: {
  certificateId: string;
  courseCode: string;
  courseTitle: string;
  recipientName: string;
  recipientTitle: string;
  scorePercent: number;
  verificationCode: string;
  issuedDate: string;
  institution?: string;
}): Promise<FormspreeResult> {
  try {
    const payload = {
      _subject: `🎓 Verified Certificate Issued: ${cert.recipientName} - ${cert.courseCode} (${cert.scorePercent}%)`,
      formType: 'Certificate Issuance Record',
      recipientName: cert.recipientName,
      recipientTitle: cert.recipientTitle,
      courseCode: cert.courseCode,
      courseTitle: cert.courseTitle,
      scorePercent: `${cert.scorePercent}%`,
      verificationCode: cert.verificationCode,
      certificateId: cert.certificateId,
      institution: cert.institution || 'Not specified',
      issuedDate: cert.issuedDate,
      storeEndpoint: FORMSPREE_COURSE_REGISTRATION_ENDPOINT,
      _app: 'PharmaMind AI (Ethiopian Clinical Pharmacy Academy)',
      _timestamp: new Date().toISOString(),
    };

    const response = await fetch(FORMSPREE_COURSE_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }
    return { ok: false, error: `Formspree status ${response.status}` };
  } catch (err: any) {
    console.warn('Certificate issuance transmission to Formspree store failed:', err);
    return { ok: false, error: err?.message };
  }
}

/**
 * Transmits the entire consolidated CPD Dossier (Learner Profile + All Earned Certificates + Summary)
 * directly to the Formspree registry store: https://formspree.io/f/xppwpydl
 */
export async function submitFullCpdDossier(dossier: {
  learnerName: string;
  learnerEmail: string;
  learnerPhone: string;
  learnerCadre: string;
  institution?: string;
  licenseNumber?: string;
  totalCpdHours: number;
  totalCoursesCompleted: number;
  averageScorePercent: number;
  certificatesList: Array<{
    code: string;
    title: string;
    cpd: number;
    score: number;
    verificationCode: string;
    issuedDate: string;
  }>;
  customNotes?: string;
}): Promise<FormspreeResult> {
  try {
    const formattedTranscript = dossier.certificatesList.length > 0
      ? dossier.certificatesList
          .map(
            (c, i) =>
              `${i + 1}. [${c.code}] ${c.title} - ${c.cpd} CPD Hours - Score: ${c.score}% - Verification: ${c.verificationCode} - Issued: ${c.issuedDate}`
          )
          .join('\n')
      : 'No certificates earned yet.';

    const payload = {
      _subject: `📁 Complete CPD Portfolio Dossier: ${dossier.learnerName} (${dossier.totalCpdHours} CPD Hours, ${dossier.totalCoursesCompleted} Courses)`,
      formType: 'Consolidated CPD Portfolio Dossier',
      fullName: dossier.learnerName,
      email: dossier.learnerEmail,
      phone: dossier.learnerPhone,
      qualificationCadre: dossier.learnerCadre,
      institution: dossier.institution || 'Not specified',
      licenseOrRegistrationNumber: dossier.licenseNumber || 'Not specified',
      totalCpdHoursEarned: dossier.totalCpdHours,
      totalCoursesCompleted: dossier.totalCoursesCompleted,
      averageMasteryScore: `${dossier.averageScorePercent}%`,
      officialTranscript: formattedTranscript,
      customNotes: dossier.customNotes || 'Official CPD Relicensure Dossier export',
      storeEndpoint: FORMSPREE_COURSE_REGISTRATION_ENDPOINT,
      directiveCompliance: 'Ethiopian MoH CPD Directive No. 332/2020',
      _app: 'PharmaMind AI (Ethiopian Clinical Pharmacy Academy)',
      _timestamp: new Date().toISOString(),
    };

    const response = await fetch(FORMSPREE_COURSE_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }
    const data = await response.json().catch(() => ({}));
    return { ok: false, error: data.error || `Formspree responded with ${response.status}` };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Network error transmitting full CPD dossier.' };
  }
}

export interface PeerReviewFeedbackData {
  reviewerName: string;
  reviewerEmail: string;
  reviewerCadre: string;
  reviewerInstitution?: string;
  clinicalAccuracyRating: number;
  educationalUtilityRating: number;
  platformUsabilityRating: number;
  recommendationDecision: 'Strongly Recommend' | 'Recommend with Minor Additions' | 'Needs Clinical Refinement';
  specificFeedback: string;
  targetComponentsReviewed: string[];
}

/**
 * Transmits a visiting professional's peer review evaluation directly to the Formspree registry.
 */
export async function submitPeerReviewEvaluation(review: PeerReviewFeedbackData): Promise<FormspreeResult> {
  try {
    const payload = {
      _subject: `⭐ Professional Peer Review: ${review.reviewerName} (${review.reviewerInstitution || review.reviewerCadre})`,
      submissionType: 'Professional Peer Review & Faculty Evaluation',
      reviewerName: review.reviewerName,
      reviewerEmail: review.reviewerEmail,
      reviewerCadre: review.reviewerCadre,
      reviewerInstitution: review.reviewerInstitution || 'Independent Clinical Evaluator',
      clinicalSTGAccuracy: `${review.clinicalAccuracyRating} / 5 Stars`,
      educationalUtility: `${review.educationalUtilityRating} / 5 Stars`,
      platformUsability: `${review.platformUsabilityRating} / 5 Stars`,
      recommendationDecision: review.recommendationDecision,
      componentsReviewed: review.targetComponentsReviewed.join(', ') || 'General Simulation & CPD Platform',
      detailedFeedback: review.specificFeedback,
      storeEndpoint: FORMSPREE_COURSE_REGISTRATION_ENDPOINT,
      targetInbox: FORMSPREE_FALLBACK_EMAIL,
      submissionTimestamp: new Date().toISOString(),
      _app: 'PharmaMind AI Ethiopian Clinical Pharmacy Simulation'
    };

    const response = await fetch(FORMSPREE_COURSE_REGISTRATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }
    const data = await response.json().catch(() => ({}));
    return { ok: false, error: data.error || `Formspree responded with ${response.status}` };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Network error sending peer review.' };
  }
}



