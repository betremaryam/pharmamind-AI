import React from 'react';
import { MessageSquare, Sparkles, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#10201C] text-white shadow-xl hover:bg-[#173029] border border-[#2A453E] transition-all cursor-pointer group"
        title="Ask Pharmacist Betremaryam (AI Consultation)"
      >
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#1E6B5E] text-white">
          <Stethoscope className="w-4 h-4 text-[#8FB8AC]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#10201C] animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#10201C]" />
        </div>
        <div className="text-left pr-1">
          <div className="text-[0.72rem] font-bold text-white leading-tight flex items-center gap-1">
            <span>Ask Pharmacist Betremaryam</span>
            <Sparkles className="w-3 h-3 text-[#8FB8AC]" />
          </div>
          <div className="text-[0.62rem] text-[#8FB8AC] font-medium leading-tight">
            Real-time Clinical AI
          </div>
        </div>
      </motion.button>
    </div>
  );
};
