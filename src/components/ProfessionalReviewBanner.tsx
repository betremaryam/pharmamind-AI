import React, { useState } from 'react';
import {
  Sparkles,
  Stethoscope,
  GraduationCap,
  FolderArchive,
  Star,
  X,
  Share2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Calculator,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfessionalReviewBannerProps {
  onOpenSimulator: () => void;
  onOpenCourses: () => void;
  onOpenDossier: () => void;
  onOpenClinicalTools: () => void;
  onOpenFeedback: () => void;
  onOpenShare: () => void;
  onDismiss: () => void;
}

export const ProfessionalReviewBanner: React.FC<ProfessionalReviewBannerProps> = ({
  onOpenSimulator,
  onOpenCourses,
  onOpenDossier,
  onOpenClinicalTools,
  onOpenFeedback,
  onOpenShare,
  onDismiss
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="bg-[#123830] text-white border-b border-[#214E44] px-4 py-1.5 flex items-center justify-between text-xs transition-all z-40 relative print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-emerald-200">
            Professional Peer Review Mode Active
          </span>
          <span className="hidden sm:inline text-[#8FB8AC] text-[0.72rem]">
            · Ethiopian Clinical Pharmacy CPD &amp; STG Simulation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFeedback}
            className="px-2 py-0.5 rounded bg-[#1E6B5E] text-white font-semibold text-[0.72rem] hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="p-1 text-[#8FB8AC] hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[0.72rem]"
            title="Expand review toolbar"
          >
            <span>Expand</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#123830] text-white border-b border-[#214E44] px-4 sm:px-6 py-2.5 transition-all shadow-md z-40 relative print:hidden">
      <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        {/* Left Badge & Context */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="px-2 py-0.5 rounded-full bg-[#1E6B5E] text-emerald-100 font-bold uppercase tracking-wider text-[0.65rem] flex items-center gap-1 border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping inline-block"></span>
            <span>Reviewer Mode</span>
          </div>
          <div>
            <div className="font-bold text-white text-[0.8rem] flex items-center gap-1.5">
              <span>PharmaMind Peer Review &amp; Evaluation Hub</span>
            </div>
            <div className="text-[0.68rem] text-[#8FB8AC]">
              MoH CPD Directive 332/2020 &amp; STG Bedside Simulation
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            type="button"
            onClick={onOpenSimulator}
            className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[0.72rem] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Launch bedside virtual patient simulator"
          >
            <Stethoscope className="w-3.5 h-3.5 text-emerald-300" />
            <span>Case Simulator</span>
          </button>

          <button
            type="button"
            onClick={onOpenCourses}
            className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[0.72rem] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect 7 accredited clinical pharmacy courses"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
            <span>Accredited Courses</span>
          </button>

          <button
            type="button"
            onClick={onOpenDossier}
            className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[0.72rem] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect official CPD transcript & exportable dossier"
          >
            <FolderArchive className="w-3.5 h-3.5 text-emerald-300" />
            <span>CPD Dossier</span>
          </button>

          <button
            type="button"
            onClick={onOpenClinicalTools}
            className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[0.72rem] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Inspect bedside renal calculator and formulary checks"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-300" />
            <span>Renal Calc</span>
          </button>

          <button
            type="button"
            onClick={onOpenFeedback}
            className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[0.72rem] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Submit peer evaluation & comments to Betremaryam Eshete"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Submit Peer Review</span>
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[0.72rem] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Generate direct review links for colleagues"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Share Links</span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 ml-auto md:ml-0 shrink-0">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 text-[#8FB8AC] hover:text-white transition-colors cursor-pointer"
            title="Minimize banner"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 text-[#8FB8AC] hover:text-white transition-colors cursor-pointer"
            title="Dismiss reviewer banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
