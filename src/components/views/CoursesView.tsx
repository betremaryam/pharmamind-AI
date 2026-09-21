import React, { useState, useEffect } from 'react';
import { PageView, PharmacyCourse, EarnedCertificate, EnrolledLearner } from '../../types';
import { PHARMACY_COURSES } from '../../data/pharmacyCourses';
import { getEarnedCertificates, getEnrolledLearner } from '../../services/certificateStorage';
import { EnrollmentModal } from '../EnrollmentModal';
import { CpdDossierExportModal } from '../CpdDossierExportModal';
import {
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileCheck2,
  Printer,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  UserCheck,
  UserPlus,
  Download,
  Edit3,
  FileSpreadsheet,
  FolderArchive
} from 'lucide-react';
import { motion } from 'motion/react';
import { ThreeDimensionalDrugIcon } from '../ThreeDimensionalDrugIcon';

interface CoursesViewProps {
  onNavigate: (page: PageView) => void;
  onSelectCourse: (course: PharmacyCourse) => void;
  onViewCertificate: (cert: EarnedCertificate) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onNavigate,
  onSelectCourse,
  onViewCertificate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [earnedCertificates, setEarnedCertificates] = useState<EarnedCertificate[]>([]);
  const [enrolledLearner, setEnrolledLearner] = useState<EnrolledLearner | null>(null);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [pendingCourse, setPendingCourse] = useState<PharmacyCourse | null>(null);

  useEffect(() => {
    setEarnedCertificates(getEarnedCertificates());
    setEnrolledLearner(getEnrolledLearner());
  }, []);

  const categories = [
    'All',
    'First Aid & Emergency',
    'Infectious Diseases',
    'Nephrology',
    'Cardiology',
    'Endocrinology',
    'HIV & TB',
    'Ambulatory & Clinical Practice'
  ];

  const filteredCourses = selectedCategory === 'All'
    ? PHARMACY_COURSES
    : PHARMACY_COURSES.filter((c) => c.category === selectedCategory);

  const handleStartCourseClick = (course: PharmacyCourse) => {
    if (!enrolledLearner) {
      setPendingCourse(course);
      setIsEnrollmentModalOpen(true);
    } else {
      onSelectCourse(course);
    }
  };

  const handleEnrollmentComplete = (learner: EnrolledLearner) => {
    setEnrolledLearner(learner);
    setIsEnrollmentModalOpen(false);
    if (pendingCourse) {
      const course = pendingCourse;
      setPendingCourse(null);
      onSelectCourse(course);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-8 sm:py-12">
      {/* Hero Header */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4EEEA] text-[#12463C] border border-[#1E6B5E]/20">
              <GraduationCap className="w-4 h-4 text-[#1E6B5E]" />
              <span>Accredited Clinical Pharmacy Academy · CPD Directive No. 332/2020</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E] leading-[1.14]">
              Clinical Pharmacy Courses &amp; Certified Preceptorship
            </h1>

            <p className="text-base sm:text-lg text-[#1B211E] font-medium leading-relaxed">
              Complete evidence-based pharmacotherapy training modules, master national standard treatment guidelines, and earn verified, personalized Certificates of Completion bearing your name.
            </p>

            <p className="text-sm sm:text-base text-[#4B5350] leading-relaxed">
              Designed by Lead Clinical Pharmacist &amp; Preceptor <strong>Betremaryam Eshete</strong>, each course combines foundational clinical principles, bedside case vignettes, drug-interaction problem solving, and a final mastery assessment. Upon scoring 75% or higher, your official accredited certificate is generated with a unique digital verification code.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-[#1B211E]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1E6B5E]" />
                <span>7 Accredited Clinical Courses</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Award className="w-4 h-4 text-[#1E6B5E]" />
                <span>Up to 27 CPD Credit Hours</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1E6B5E]" />
                <span>Ethiopian STG &amp; WHO Aligned</span>
              </span>
            </div>
          </div>

          {/* Quick Portfolio Stats Card */}
          <div className="lg:col-span-4 space-y-4">
            {/* Registered Learner Banner */}
            <div className="bg-white rounded-2xl border border-[#DCD8CF] p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E4EEEA] text-[#1E6B5E] flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#1E6B5E] block">
                      Enrolled Profile
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1B211E]">
                      {enrolledLearner ? enrolledLearner.name : 'Not Yet Registered'}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEnrollmentModalOpen(true)}
                  className="text-xs font-semibold text-[#1E6B5E] hover:underline cursor-pointer"
                >
                  {enrolledLearner ? 'Edit Profile' : 'Register Now'}
                </button>
              </div>

              {enrolledLearner ? (
                <div className="pt-3 space-y-2 text-xs text-[#4B5350]">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#757D79]">Cadre:</span>
                      <span className="font-medium text-[#1B211E] text-right truncate max-w-[180px]">{enrolledLearner.education}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#757D79]">Email:</span>
                      <span className="font-medium text-[#1B211E] text-right truncate max-w-[180px]">{enrolledLearner.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#757D79]">Phone:</span>
                      <span className="font-medium text-[#1B211E]">{enrolledLearner.phone}</span>
                    </div>
                    {enrolledLearner.institution && (
                      <div className="flex justify-between">
                        <span className="text-[#757D79]">Hospital:</span>
                        <span className="font-medium text-[#1B211E] text-right truncate max-w-[180px]">{enrolledLearner.institution}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-[0.68rem]">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Formspree Store (xppwpydl)</span>
                    </span>
                    <span className="font-mono text-[0.62rem] text-[#757D79] bg-[#F5F4EF] px-1.5 py-0.5 rounded border border-[#E3DFD5]">
                      Synced
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsExportModalOpen(true)}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EEE7] border border-[#DCD8CF] text-[#1B211E] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <FolderArchive className="w-3.5 h-3.5 text-[#1E6B5E]" />
                      <span>Export &amp; Edit Dossier</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-3 text-xs text-[#757D79] space-y-2">
                  <p>Register your professional credentials once to start any accredited course and earn authenticated certificates.</p>
                  <button
                    type="button"
                    onClick={() => setIsEnrollmentModalOpen(true)}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#E4EEEA] text-[#12463C] hover:bg-[#D4E6E0] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Complete Learner Registration
                  </button>
                </div>
              )}
            </div>

            {/* Earned Certificates Card */}
            <div className="bg-white rounded-2xl border border-[#DCD8CF] p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                <div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#1E6B5E] block">
                    Learner Portfolio
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-[#1B211E]">
                    Your Certificates
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#1E6B5E]" />
                </div>
              </div>

              {earnedCertificates.length === 0 ? (
                <div className="text-center py-4 space-y-2">
                  <p className="text-xs text-[#757D79]">
                    You have not earned any certificates yet. Complete a course below to receive your credential.
                  </p>
                  <span className="inline-block text-[0.7rem] text-[#1E6B5E] font-semibold">
                    Instant printable PDF upon passing
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#12463C] font-semibold bg-[#E4EEEA] p-2.5 rounded-lg">
                    <span>{earnedCertificates.length} {earnedCertificates.length === 1 ? 'Certificate' : 'Certificates'} Earned</span>
                    <button
                      type="button"
                      onClick={() => setIsExportModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[0.72rem] text-[#1E6B5E] hover:underline font-bold cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export All</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {earnedCertificates.map((cert) => (
                      <div
                        key={cert.certificateId}
                        onClick={() => onViewCertificate(cert)}
                        className="p-3 rounded-lg border border-[#DCD8CF] hover:border-[#1E6B5E] bg-[#FAF9F5] hover:bg-white transition-all cursor-pointer text-left group"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-[#1E6B5E]">{cert.courseCode}</span>
                          <span className="text-[0.68rem] text-[#757D79]">{cert.issuedDate}</span>
                        </div>
                        <div className="font-bold text-xs text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors line-clamp-1 mt-0.5">
                          {cert.courseTitle}
                        </div>
                        <div className="text-[0.68rem] text-[#4B5350] flex items-center justify-between pt-1">
                          <span>Issued to: <strong>{cert.recipientName}</strong></span>
                          <span className="font-semibold text-emerald-700">{cert.scorePercent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between text-[0.72rem] text-[#757D79]">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[#1E6B5E] hover:underline font-semibold cursor-pointer"
                >
                  <FolderArchive className="w-3.5 h-3.5" />
                  <span>Export Complete CPD Dossier</span>
                </button>
                <div className="flex items-center gap-1">
                  <Printer className="w-3.5 h-3.5 text-[#1E6B5E]" />
                  <span>Printable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog Section */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#DCD8CF] pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1E6B5E] text-white shadow-xs'
                    : 'bg-white border border-[#DCD8CF] text-[#4B5350] hover:text-[#1B211E] hover:bg-[#FAF9F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#757D79]">
            Showing <strong>{filteredCourses.length}</strong> Clinical Courses
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const hasEarned = earnedCertificates.some((c) => c.courseId === course.id);

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#DCD8CF] hover:border-[#1E6B5E] transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#1E6B5E] bg-[#E4EEEA] px-2.5 py-0.5 rounded-md">
                      {course.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9F5] text-[#4B5350] border border-[#DCD8CF]">
                        {course.level}
                      </span>
                      <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {course.cpdPoints} CPD Hrs
                      </span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-serif-heading text-xl font-bold text-[#1B211E] group-hover:text-[#1E6B5E] transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#5B6360] leading-relaxed line-clamp-3">
                    {course.shortDescription}
                  </p>

                  {/* Modules Summary */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E8E5DD]">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#757D79] block">
                      Curriculum Highlights
                    </span>
                    <ul className="space-y-1 text-xs text-[#4B5350]">
                      {course.modules.slice(0, 3).map((m) => (
                        <li key={m.id} className="flex items-center gap-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-[#1E6B5E] shrink-0" />
                          <span className="truncate">{m.title.replace(/^Module \d+:\s*/, '')}</span>
                        </li>
                      ))}
                      {course.modules.length > 3 && (
                        <li className="text-[0.7rem] text-[#757D79] italic pl-2.5">
                          + {course.modules.length - 3} more module &amp; clinical assessment
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Instructor & Accreditation */}
                  <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#757D79]">
                    <span>Preceptor: <strong>{course.instructor.name}</strong></span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.durationHours}h</span>
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-4 bg-[#FAF9F5] border-t border-[#DCD8CF] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course)}
                    className="text-xs font-semibold text-[#1E6B5E] hover:text-[#12463C] hover:underline flex items-center gap-1 cursor-pointer"
                    title="Direct preview for peer evaluators and faculty reviewers"
                  >
                    <span>Inspect Module</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartCourseClick(course)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E6B5E] hover:bg-[#12463C] text-white text-xs font-semibold cursor-pointer shadow-xs transition-all group-hover:translate-x-0.5"
                  >
                    <span>{hasEarned ? 'Review / Retake' : 'Enroll & Evaluate'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional CPD Accreditation Banner */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#10201C] text-white border border-[#1C362F] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#8FB8AC] border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Institutional CPD Partnerships</span>
            </div>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">
              Deploy Certified Clinical Courses to Your Hospital or Faculty
            </h3>
            <p className="text-xs sm:text-sm text-[#A9B3AE] max-w-[54ch] leading-relaxed">
              We provide turnkey student roster enrollment, faculty gradebooks, and bulk verification reporting for university schools of pharmacy and teaching hospitals across Ethiopia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <span>Request Institutional Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('institutions')}
              className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-[#8FB8AC] bg-white/10 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
            >
              <span>Faculty Licensing</span>
            </button>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={() => {
          setIsEnrollmentModalOpen(false);
          setPendingCourse(null);
        }}
        courseToStart={pendingCourse}
        onEnrollmentComplete={handleEnrollmentComplete}
        existingLearner={enrolledLearner}
      />

      {/* Unified CPD Dossier Export & Editable Modal */}
      <CpdDossierExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        enrolledLearner={enrolledLearner}
        earnedCertificates={earnedCertificates}
        onLearnerUpdated={(updated) => setEnrolledLearner(updated)}
        onCertificatesUpdated={() => setEarnedCertificates(getEarnedCertificates())}
      />
    </div>
  );
};
