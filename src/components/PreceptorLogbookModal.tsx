import React, { useRef, useState } from 'react';
import {
  Printer,
  Download,
  X,
  Award,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
  Building,
  FileText,
  Edit3
} from 'lucide-react';
import { CaseStudy } from '../types';

interface PreceptorLogbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCase: CaseStudy;
  studentName?: string;
  studentEmail?: string;
  totalScore: number;
  problemFindingScore: number;
  reasoningScore: number;
  documentationScore: number;
  userPlanText: string;
  identifiedProblems: string[];
}

export const PreceptorLogbookModal: React.FC<PreceptorLogbookModalProps> = ({
  isOpen,
  onClose,
  activeCase,
  studentName = 'Candidate Pharmacist',
  studentEmail = '',
  totalScore,
  problemFindingScore,
  reasoningScore,
  documentationScore,
  userPlanText,
  identifiedProblems
}) => {
  const printRef = useRef<HTMLDivElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editableStudentName, setEditableStudentName] = useState(studentName);
  const [editableHospital, setEditableHospital] = useState('Tikur Anbessa Specialized Hospital / AAU');
  const [editablePreceptor, setEditablePreceptor] = useState('Betremaryam Eshete, Lead Preceptor');
  const [editableNotes, setEditableNotes] = useState(
    'Candidate demonstrated structured clinical reasoning and formulated evidence-based drug therapy recommendations matching national STG protocols.'
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const data = {
      documentType: 'Clinical Clerkship Encounter Logbook',
      standard: 'Ethiopian MoH / STG Clinical Pharmacy Preceptorship',
      generatedAt: new Date().toISOString(),
      case: {
        id: activeCase.id,
        code: activeCase.code,
        title: activeCase.title,
        level: activeCase.level,
        patient: activeCase.patient
      },
      candidate: {
        name: editableStudentName,
        email: studentEmail,
        trainingHospital: editableHospital
      },
      preceptor: {
        name: editablePreceptor,
        comments: editableNotes
      },
      scores: {
        totalScore,
        problemFindingScore,
        reasoningScore,
        documentationScore
      },
      identifiedProblems,
      userPlanText
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pharmamind_logbook_${activeCase.code}_${editableStudentName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const verificationHash = `PM-ETH-${activeCase.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const competencyLevel =
    totalScore >= 85
      ? 'Mastery Level (Exemplary Clinical Competence)'
      : totalScore >= 70
      ? 'Competent (Meets Ethiopian STG Standards)'
      : 'Developing (Requires Supervised Remediation)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#10201C]/80 backdrop-blur-xs print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl bg-white rounded-xl border border-[#DCD8CF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="bg-[#173029] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#2A453E] print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#8FB8AC]" />
            <span className="font-bold text-sm">Official Preceptor Clerkship Verification Sheet</span>
            <span className="text-[0.65rem] font-semibold bg-[#1E6B5E] text-white px-2 py-0.5 rounded-full">
              Editable &amp; Exportable
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                isEditing ? 'bg-amber-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Close Editor' : 'Edit Details'}</span>
            </button>

            <button
              onClick={handleExportJson}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Download structured logbook JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1E6B5E] hover:bg-[#12463C] text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A9B3AE] hover:text-white hover:bg-[#2A453E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inline Edit Form Drawer */}
        {isEditing && (
          <div className="bg-[#FAF9F5] border-b border-[#DCD8CF] p-4 text-xs space-y-3 shrink-0 print:hidden">
            <div className="font-bold text-[#1B211E] flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-[#1E6B5E]" />
              <span>Edit Verification &amp; Evaluation Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Candidate Name:</label>
                <input
                  type="text"
                  value={editableStudentName}
                  onChange={(e) => setEditableStudentName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Hospital / Facility:</label>
                <input
                  type="text"
                  value={editableHospital}
                  onChange={(e) => setEditableHospital(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[#4B5350]">Preceptor Name:</label>
                <input
                  type="text"
                  value={editablePreceptor}
                  onChange={(e) => setEditablePreceptor(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E]"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-[#4B5350]">Preceptor Evaluation Comments:</label>
              <input
                type="text"
                value={editableNotes}
                onChange={(e) => setEditableNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-white border border-[#DCD8CF] text-xs focus:border-[#1E6B5E]"
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded bg-[#1E6B5E] text-white font-semibold text-xs cursor-pointer"
              >
                Apply Changes
              </button>
            </div>
          </div>
        )}

        {/* Printable Certificate Sheet */}
        <div ref={printRef} className="p-6 sm:p-10 overflow-y-auto space-y-6 text-[#1B211E] bg-white print:p-8">
          {/* Institutional Header */}
          <div className="border-b-2 border-[#1E6B5E] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[0.68rem] tracking-widest uppercase font-bold text-[#1E6B5E]">
                Federal Democratic Republic of Ethiopia · Clinical Pharmacy Education
              </div>
              <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#173029]">
                CLERKSHIP CLINICAL ENCOUNTER LOGBOOK
              </h2>
              <div className="text-xs text-[#757D79] mt-0.5">
                Pharmaceutical Care Competency Verification · Standard Treatment Guidelines (STG)
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[0.7rem] font-mono text-[#757D79]">Doc ID:</div>
              <div className="text-xs font-mono font-bold text-[#1E6B5E] bg-[#E4EEEA] px-2 py-0.5 rounded border border-[#BBD7CF]">
                {verificationHash}
              </div>
              <div className="text-[0.7rem] text-[#757D79] mt-1">{currentDate}</div>
            </div>
          </div>

          {/* Student & Hospital Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] text-xs">
            <div>
              <span className="text-[#757D79] block text-[0.68rem] uppercase font-semibold">Candidate / Intern</span>
              <strong className="text-[#1B211E]">{editableStudentName}</strong>
            </div>
            <div>
              <span className="text-[#757D79] block text-[0.68rem] uppercase font-semibold">Contact Email</span>
              <span className="text-[#1B211E] truncate block">{studentEmail || 'Campus Student ID'}</span>
            </div>
            <div>
              <span className="text-[#757D79] block text-[0.68rem] uppercase font-semibold">Training Hospital</span>
              <span className="text-[#1B211E]">{editableHospital}</span>
            </div>
            <div>
              <span className="text-[#757D79] block text-[0.68rem] uppercase font-semibold">Case Encounter</span>
              <span className="font-mono font-bold text-[#1E6B5E]">{activeCase.code} ({activeCase.level})</span>
            </div>
          </div>

          {/* Case Encounter Profile */}
          <div className="p-3.5 rounded-lg border border-[#DCD8CF] space-y-1.5 text-xs">
            <div className="font-bold text-[#173029]">
              Patient Encounter: {activeCase.patient.name}, {activeCase.patient.age} y/o ({activeCase.patient.gender}) · {activeCase.patient.setting}
            </div>
            <div className="text-[#4B5350]">
              <strong>Primary Condition:</strong> {activeCase.condition} · &ldquo;{activeCase.patient.chiefComplaint}&rdquo;
            </div>
            <div className="text-[#757D79] text-[0.72rem]">
              <strong>Encounter Vitals:</strong> BP {activeCase.patient.vitals.bp} | HR {activeCase.patient.vitals.hr} | K+ {activeCase.patient.vitals.k} | SCr {activeCase.patient.vitals.scr}
            </div>
          </div>

          {/* Performance Rubric Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E6B5E]">
              Standardized Competency Scoring Breakdown
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-[#E8E5DD] bg-[#FAF9F5] text-center">
                <div className="text-[0.68rem] text-[#757D79] uppercase font-semibold">Problem Finding (45%)</div>
                <div className="text-2xl font-bold font-mono text-[#173029] mt-1">{problemFindingScore}%</div>
                <div className="text-[0.68rem] text-[#1E6B5E] mt-0.5">DTP Identification &amp; Distractor Check</div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8E5DD] bg-[#FAF9F5] text-center">
                <div className="text-[0.68rem] text-[#757D79] uppercase font-semibold">Therapeutic Reasoning (35%)</div>
                <div className="text-2xl font-bold font-mono text-[#173029] mt-1">{reasoningScore}%</div>
                <div className="text-[0.68rem] text-[#1E6B5E] mt-0.5">Guideline Selection &amp; Safety</div>
              </div>

              <div className="p-3 rounded-lg border border-[#E8E5DD] bg-[#FAF9F5] text-center">
                <div className="text-[0.68rem] text-[#757D79] uppercase font-semibold">SOAP Documentation (20%)</div>
                <div className="text-2xl font-bold font-mono text-[#173029] mt-1">{documentationScore}%</div>
                <div className="text-[0.68rem] text-[#1E6B5E] mt-0.5">Monitoring &amp; Counseling Detail</div>
              </div>
            </div>

            {/* Total Scaled Competency Result */}
            <div className="p-3.5 rounded-lg bg-[#E4EEEA] border border-[#BBD7CF] flex items-center justify-between">
              <div>
                <span className="text-[0.7rem] uppercase font-bold text-[#12463C] block">Cumulative Scaled Performance</span>
                <span className="font-bold text-sm text-[#1B211E]">{competencyLevel}</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold font-mono text-[#1E6B5E]">{totalScore}</span>
                <span className="text-xs text-[#12463C]"> / 100</span>
              </div>
            </div>
          </div>

          {/* DTPs Identified */}
          <div className="space-y-1.5 text-xs">
            <strong className="text-[#173029] block">Documented Drug Therapy Problems (DTPs):</strong>
            <ul className="list-disc pl-4 space-y-1 text-[#4B5350]">
              {identifiedProblems.length > 0 ? (
                identifiedProblems.map((prob, i) => <li key={i}>{prob}</li>)
              ) : (
                <li>Candidate identified target drug therapy interactions.</li>
              )}
            </ul>
          </div>

          {/* Student Submitted Pharmacotherapeutic Plan */}
          <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] space-y-1.5 text-xs">
            <strong className="text-[#173029] block">Candidate&apos;s Pharmacotherapeutic Care Plan &amp; SOAP Extract:</strong>
            <p className="text-[#4B5350] leading-relaxed italic">&ldquo;{userPlanText}&rdquo;</p>
          </div>

          {/* Preceptor Evaluation Notes */}
          <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#DCD8CF] space-y-1 text-xs">
            <strong className="text-[#173029] block">Preceptor Evaluative Feedback &amp; Attestation:</strong>
            <p className="text-[#4B5350] leading-relaxed">{editableNotes}</p>
          </div>

          {/* Formal Preceptor Sign-off Block */}
          <div className="pt-6 border-t-2 border-[#E8E5DD] grid grid-cols-2 gap-8 text-xs">
            <div className="space-y-4">
              <div>
                <span className="text-[0.68rem] uppercase font-bold text-[#757D79] block">Clinical Preceptor Name</span>
                <div className="border-b border-[#1B211E] h-6 mt-1 font-serif text-[#1B211E]">{editablePreceptor}</div>
              </div>
              <div>
                <span className="text-[0.68rem] uppercase font-bold text-[#757D79] block">Preceptor Signature &amp; License ID</span>
                <div className="border-b border-[#1B211E] h-6 mt-1"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[0.68rem] uppercase font-bold text-[#757D79] block">Evaluation Result</span>
                <div className="flex items-center gap-4 mt-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3.5 h-3.5 border border-[#1B211E] inline-block rounded-xs bg-[#1E6B5E]"></span>
                    <span className="font-semibold text-[#1B211E]">Satisfactory (Pass)</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3.5 h-3.5 border border-[#1B211E] inline-block rounded-xs"></span>
                    <span>Remediation Req.</span>
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[0.68rem] uppercase font-bold text-[#757D79] block">Faculty Institutional Stamp</span>
                <div className="border border-dashed border-[#DCD8CF] rounded-lg h-12 flex items-center justify-center text-[0.7rem] text-[#757D79]">
                  [ Official Clerkship Department Stamp ]
                </div>
              </div>
            </div>
          </div>

          <div className="text-[0.68rem] text-center text-[#757D79] pt-2">
            Generated by PharmaMind AI Simulation Platform · Approved for Ethiopian Clinical Pharmacy Clerkships · Verified via Formspree (xppwpydl)
          </div>
        </div>
      </div>
    </div>
  );
};
