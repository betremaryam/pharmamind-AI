import { EarnedCertificate, EnrolledLearner } from '../types';

const CERTIFICATE_STORAGE_KEY = 'pharmamind_earned_certificates_v1';
const LEARNER_STORAGE_KEY = 'pharmamind_enrolled_learner_v1';

export function getEnrolledLearner(): EnrolledLearner | null {
  try {
    const raw = localStorage.getItem(LEARNER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load enrolled learner:', err);
    return null;
  }
}

export function saveEnrolledLearner(learner: EnrolledLearner): void {
  try {
    localStorage.setItem(LEARNER_STORAGE_KEY, JSON.stringify(learner));
  } catch (err) {
    console.error('Failed to save enrolled learner:', err);
  }
}

export function clearEnrolledLearner(): void {
  try {
    localStorage.removeItem(LEARNER_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear enrolled learner:', err);
  }
}

export function getEarnedCertificates(): EarnedCertificate[] {
  try {
    const raw = localStorage.getItem(CERTIFICATE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load earned certificates from storage:', err);
    return [];
  }
}

export function saveEarnedCertificate(cert: EarnedCertificate): void {
  try {
    const existing = getEarnedCertificates();
    // Check if certificate for this course already exists, replace or prepend
    const filtered = existing.filter((c) => c.certificateId !== cert.certificateId);
    const updated = [cert, ...filtered];
    localStorage.setItem(CERTIFICATE_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save earned certificate:', err);
  }
}

export function getCertificateById(id: string): EarnedCertificate | undefined {
  const list = getEarnedCertificates();
  return list.find((c) => c.certificateId === id || c.verificationCode === id);
}

export function generateVerificationCode(courseCode: string): string {
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const year = new Date().getFullYear();
  return `${courseCode}-${year}-${randomSuffix}`;
}

export function updateEarnedCertificate(cert: EarnedCertificate): void {
  try {
    const existing = getEarnedCertificates();
    const index = existing.findIndex((c) => c.certificateId === cert.certificateId);
    if (index >= 0) {
      existing[index] = cert;
    } else {
      existing.unshift(cert);
    }
    localStorage.setItem(CERTIFICATE_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to update earned certificate:', err);
  }
}

export function deleteEarnedCertificate(certificateId: string): void {
  try {
    const existing = getEarnedCertificates();
    const filtered = existing.filter((c) => c.certificateId !== certificateId);
    localStorage.setItem(CERTIFICATE_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete earned certificate:', err);
  }
}

export interface CpdExportDossier {
  exportVersion: string;
  exportedAt: string;
  app: string;
  regulatoryStandard: string;
  learner: EnrolledLearner | null;
  certificates: EarnedCertificate[];
  totalCpdHours: number;
  totalCoursesCompleted: number;
  averageScorePercent: number;
}

export function exportCompleteCpdPackage(): CpdExportDossier {
  const learner = getEnrolledLearner();
  const certificates = getEarnedCertificates();
  const totalCpdHours = certificates.reduce((acc, c) => acc + (c.cpdPoints || 0), 0);
  const averageScorePercent =
    certificates.length > 0
      ? Math.round(certificates.reduce((acc, c) => acc + c.scorePercent, 0) / certificates.length)
      : 0;

  return {
    exportVersion: '1.2.0',
    exportedAt: new Date().toISOString(),
    app: 'PharmaMind AI - Ethiopian Clinical Pharmacy Academy',
    regulatoryStandard: 'Ethiopian MoH CPD Directive No. 332/2020',
    learner,
    certificates,
    totalCpdHours,
    totalCoursesCompleted: certificates.length,
    averageScorePercent
  };
}

export function importCpdPackage(rawJson: string): {
  success: boolean;
  message: string;
  importedCertificatesCount: number;
  learnerUpdated: boolean;
} {
  try {
    const parsed = JSON.parse(rawJson);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Invalid JSON format.', importedCertificatesCount: 0, learnerUpdated: false };
    }

    let learnerUpdated = false;
    if (parsed.learner && typeof parsed.learner === 'object' && parsed.learner.name) {
      saveEnrolledLearner(parsed.learner);
      learnerUpdated = true;
    }

    let importedCertificatesCount = 0;
    if (Array.isArray(parsed.certificates)) {
      const existing = getEarnedCertificates();
      const existingIds = new Set(existing.map((c) => c.certificateId));
      let merged = [...existing];

      for (const cert of parsed.certificates) {
        if (cert.certificateId && cert.courseCode && cert.recipientName) {
          if (!existingIds.has(cert.certificateId)) {
            merged.push(cert);
            importedCertificatesCount++;
          }
        }
      }
      localStorage.setItem(CERTIFICATE_STORAGE_KEY, JSON.stringify(merged));
    }

    return {
      success: true,
      message: `Successfully imported dossier. ${importedCertificatesCount} new certificates added.${learnerUpdated ? ' Learner profile updated.' : ''}`,
      importedCertificatesCount,
      learnerUpdated
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to import: ${err?.message || 'Syntax error in JSON file'}`,
      importedCertificatesCount: 0,
      learnerUpdated: false
    };
  }
}

export function generateCpdCsv(): string {
  const learner = getEnrolledLearner();
  const certificates = getEarnedCertificates();

  const headers = [
    'Learner Name',
    'Cadre / Qualification',
    'Email',
    'Phone',
    'Institution / Hospital',
    'License / Reg Number',
    'Course Code',
    'Course Title',
    'CPD Credit Hours',
    'Mastery Score (%)',
    'Verification Code',
    'Certificate ID',
    'Issued Date',
    'Instructor / Preceptor'
  ];

  const escapeCsv = (val: any) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  if (certificates.length === 0) {
    const row = [
      learner?.name || 'Unregistered',
      learner?.education || 'N/A',
      learner?.email || 'N/A',
      learner?.phone || 'N/A',
      learner?.institution || 'N/A',
      learner?.licenseNumber || 'N/A',
      'N/A',
      'No certificates earned yet',
      '0',
      '0',
      'N/A',
      'N/A',
      'N/A',
      'N/A'
    ];
    return [headers.join(','), row.map(escapeCsv).join(',')].join('\n');
  }

  const rows = certificates.map((c) => [
    c.recipientName || learner?.name || '',
    c.recipientTitle || learner?.education || '',
    learner?.email || '',
    learner?.phone || '',
    c.institution || learner?.institution || '',
    learner?.licenseNumber || '',
    c.courseCode,
    c.courseTitle,
    c.cpdPoints,
    `${c.scorePercent}%`,
    c.verificationCode,
    c.certificateId,
    c.issuedDate,
    c.instructorName
  ]);

  return [headers.join(','), ...rows.map((row) => row.map(escapeCsv).join(','))].join('\n');
}
