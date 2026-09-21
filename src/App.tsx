import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/views/HomeView';
import { ProductView } from './components/views/ProductView';
import { InstitutionsView } from './components/views/InstitutionsView';
import { EvidenceView } from './components/views/EvidenceView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';
import { CoursesView } from './components/views/CoursesView';
import { InteractiveCaseSimulator } from './components/InteractiveCaseSimulator';
import { ClinicalToolsModal } from './components/ClinicalToolsModal';
import { PharmacistChatbotModal } from './components/PharmacistChatbotModal';
import { SecurityPrivacyModal } from './components/SecurityPrivacyModal';
import { CoursePlayerModal } from './components/CoursePlayerModal';
import { CertificateModal } from './components/CertificateModal';
import { CpdDossierExportModal } from './components/CpdDossierExportModal';
import { ProfessionalReviewBanner } from './components/ProfessionalReviewBanner';
import { ShareForReviewModal } from './components/ShareForReviewModal';
import { ReviewerFeedbackModal } from './components/ReviewerFeedbackModal';
import { FloatingChatButton } from './components/FloatingChatButton';
import { PharmacyCourse, EarnedCertificate, EnrolledLearner } from './types';
import { PHARMACY_COURSES } from './data/pharmacyCourses';
import { getEarnedCertificates, getEnrolledLearner, saveEnrolledLearner } from './services/certificateStorage';
import { motion, AnimatePresence } from 'motion/react';

const DEMO_REVIEW_CERTIFICATE: EarnedCertificate = {
  certificateId: 'eth-cpd-demo-sample',
  courseId: 'antimicrobial-stewardship',
  courseTitle: 'Antimicrobial Stewardship & Hospital Infection Pharmacotherapy',
  courseCode: 'PM-CPD-01',
  cpdPoints: 4.0,
  recipientName: 'Dr. / Pharm. Peer Reviewer',
  recipientTitle: 'Master of Science in Clinical Pharmacy (MSc)',
  institution: 'Tikur Anbessa Specialized Hospital / AAU',
  scorePercent: 94,
  issuedDate: '2026-09-21',
  issuedTimestamp: Date.now(),
  instructorName: 'Pharmacist Betremaryam Eshete',
  instructorTitle: 'Lead Clinical Pharmacist & Preceptor',
  verificationCode: 'PM-AMS-ETH-99482-VERIFIED'
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState<boolean>(false);
  const [isClinicalToolsModalOpen, setIsClinicalToolsModalOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);

  // Review Mode & Peer Sharing State
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState<boolean>(false);

  // Courses & Certificate state
  const [selectedCourse, setSelectedCourse] = useState<PharmacyCourse | null>(null);
  const [isCoursePlayerOpen, setIsCoursePlayerOpen] = useState<boolean>(false);
  const [viewingCertificate, setViewingCertificate] = useState<EarnedCertificate | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [enrolledLearner, setEnrolledLearner] = useState<EnrolledLearner | null>(() => getEnrolledLearner());
  const [earnedCertificates, setEarnedCertificates] = useState<EarnedCertificate[]>(() => getEarnedCertificates());

  // Deep-link parser: handles URL search params & hash for direct opening
  useEffect(() => {
    const parseUrlRoute = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.replace('#', '').toLowerCase();

      // 1. Review mode detection
      const reviewParam = searchParams.get('review');
      if (reviewParam === 'true' || reviewParam === '1' || hash === 'review') {
        setIsReviewMode(true);
      }

      // 2. Direct Simulator Open (?view=simulator or ?simulator=true or #simulator)
      const viewParam = searchParams.get('view') || searchParams.get('page');
      if (viewParam === 'simulator' || searchParams.get('simulator') === 'true' || hash === 'simulator') {
        setIsSimulatorModalOpen(true);
      }

      // 3. Direct Course Player Open (?course=pm-cpd-01 or ?course=antimicrobial-stewardship or #course=...)
      const courseParam = searchParams.get('course') || (hash.startsWith('course=') ? hash.split('=')[1] : null);
      if (courseParam) {
        const found = PHARMACY_COURSES.find(
          (c) =>
            c.id.toLowerCase() === courseParam.toLowerCase() ||
            c.code.toLowerCase() === courseParam.toLowerCase()
        );
        if (found) {
          setSelectedCourse(found);
          setIsCoursePlayerOpen(true);
        }
      }

      // 4. Direct CPD Dossier Open (?dossier=true or #dossier)
      if (searchParams.get('dossier') === 'true' || hash === 'dossier') {
        setCurrentPage('courses');
        setIsDossierModalOpen(true);
      }

      // 5. Direct Clinical Tools Open (?tools=true or #tools)
      if (searchParams.get('tools') === 'true' || hash === 'tools') {
        setIsClinicalToolsModalOpen(true);
      }

      // 6. Direct Pharmacist Chatbot Open (?consult=true or ?chatbot=true or #consult or #chatbot)
      if (
        searchParams.get('consult') === 'true' ||
        searchParams.get('chatbot') === 'true' ||
        hash === 'consult' ||
        hash === 'chatbot'
      ) {
        setIsChatbotOpen(true);
      }

      // 7. Direct Certificate Inspection Open (?cert=view or #certificate)
      if (searchParams.get('cert') || hash === 'certificate') {
        const certs = getEarnedCertificates();
        setViewingCertificate(certs.length > 0 ? certs[0] : DEMO_REVIEW_CERTIFICATE);
        setIsCertificateModalOpen(true);
      }

      // 8. Standard page navigation (?page=... or #...)
      const targetPage = viewParam || hash;
      if (['home', 'product', 'institutions', 'evidence', 'about', 'contact', 'courses'].includes(targetPage)) {
        setCurrentPage(targetPage as PageView);
      }
    };

    parseUrlRoute();
    window.addEventListener('hashchange', parseUrlRoute);
    return () => window.removeEventListener('hashchange', parseUrlRoute);
  }, []);

  const handleNavigate = (page: PageView) => {
    if (page === 'simulator') {
      setIsSimulatorModalOpen(true);
      return;
    }
    setCurrentPage(page);
    window.location.hash = page;
  };

  const handleOpenSimulator = () => {
    setIsSimulatorModalOpen(true);
  };

  const handleCloseSimulator = () => {
    setIsSimulatorModalOpen(false);
    if (window.location.hash === '#simulator') {
      window.location.hash = currentPage;
    }
  };

  const handleSelectCourse = (course: PharmacyCourse) => {
    setSelectedCourse(course);
    setIsCoursePlayerOpen(true);
  };

  const handleCertificateGenerated = (cert: EarnedCertificate) => {
    setIsCoursePlayerOpen(false);
    setViewingCertificate(cert);
    setIsCertificateModalOpen(true);
    setEarnedCertificates(getEarnedCertificates());
  };

  const handleViewCertificate = (cert: EarnedCertificate) => {
    setViewingCertificate(cert);
    setIsCertificateModalOpen(true);
  };

  const handleCertificateUpdated = (updatedCert: EarnedCertificate) => {
    setViewingCertificate(updatedCert);
    setEarnedCertificates(getEarnedCertificates());
  };

  const handleLearnerUpdated = (learner: EnrolledLearner) => {
    saveEnrolledLearner(learner);
    setEnrolledLearner(learner);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#1B211E] selection:bg-[#1E6B5E]/20 selection:text-[#12463C]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E6B5E] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Professional Peer Review Mode Top Banner */}
      {isReviewMode && (
        <ProfessionalReviewBanner
          onOpenSimulator={handleOpenSimulator}
          onOpenCourses={() => setCurrentPage('courses')}
          onOpenDossier={() => {
            setCurrentPage('courses');
            setIsDossierModalOpen(true);
          }}
          onOpenClinicalTools={() => setIsClinicalToolsModalOpen(true)}
          onOpenFeedback={() => setIsFeedbackModalOpen(true)}
          onOpenShare={() => setIsShareModalOpen(true)}
          onDismiss={() => setIsReviewMode(false)}
        />
      )}

      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSimulator={handleOpenSimulator}
        onOpenClinicalTools={() => setIsClinicalToolsModalOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenShareForReview={() => setIsShareModalOpen(true)}
      />

      {/* Main Page Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {currentPage === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
                onOpenClinicalTools={() => setIsClinicalToolsModalOpen(true)}
              />
            )}
            {currentPage === 'product' && (
              <ProductView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
                onOpenClinicalTools={() => setIsClinicalToolsModalOpen(true)}
              />
            )}
            {currentPage === 'institutions' && (
              <InstitutionsView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
              />
            )}
            {currentPage === 'evidence' && (
              <EvidenceView onNavigate={handleNavigate} />
            )}
            {currentPage === 'about' && (
              <AboutView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
              />
            )}
            {currentPage === 'courses' && (
              <CoursesView
                onNavigate={handleNavigate}
                onSelectCourse={handleSelectCourse}
                onViewCertificate={handleViewCertificate}
              />
            )}
            {currentPage === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
                onOpenChatbot={() => setIsChatbotOpen(true)}
                onOpenSecurity={() => setIsSecurityModalOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSimulator={handleOpenSimulator}
        onOpenClinicalTools={() => setIsClinicalToolsModalOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenSecurity={() => setIsSecurityModalOpen(true)}
      />

      {/* Floating Action Button for Pharmacist Betremaryam AI */}
      <FloatingChatButton
        onClick={() => setIsChatbotOpen(true)}
        isOpen={isChatbotOpen}
      />

      {/* Real-time Pharmacist Betremaryam AI Consultation Modal */}
      <PharmacistChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      {/* Interactive Course Player & Clinical Assessment Modal */}
      <CoursePlayerModal
        course={selectedCourse}
        isOpen={isCoursePlayerOpen}
        onClose={() => setIsCoursePlayerOpen(false)}
        onCertificateGenerated={handleCertificateGenerated}
      />

      {/* Accredited Printable Certificate Modal */}
      <CertificateModal
        certificate={viewingCertificate}
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        onCertificateUpdated={handleCertificateUpdated}
      />

      {/* Interactive Case Simulator Modal */}
      <AnimatePresence>
        {isSimulatorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSimulator}
              className="fixed inset-0 bg-[#10201C]/80 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-4xl"
            >
              <InteractiveCaseSimulator onClose={handleCloseSimulator} isModal={true} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Bedside Clinical Tools & Renal Calculator Modal */}
      <ClinicalToolsModal
        isOpen={isClinicalToolsModalOpen}
        onClose={() => setIsClinicalToolsModalOpen(false)}
      />

      {/* Cybersecurity, PHI & Data Placement Modal */}
      <SecurityPrivacyModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Share for Professional Peer Review Modal */}
      <ShareForReviewModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onOpenReviewMode={() => setIsReviewMode(true)}
      />

      {/* Professional Peer Review Feedback Submission Modal */}
      <ReviewerFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        defaultReviewerName={enrolledLearner?.name || ''}
        defaultReviewerEmail={enrolledLearner?.email || ''}
      />

      {/* CPD Dossier & Transcript Management Modal (Direct Deep-link accessible) */}
      <CpdDossierExportModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        enrolledLearner={enrolledLearner}
        earnedCertificates={earnedCertificates}
        onLearnerUpdated={handleLearnerUpdated}
        onCertificatesUpdated={() => setEarnedCertificates(getEarnedCertificates())}
      />
    </div>
  );
}
