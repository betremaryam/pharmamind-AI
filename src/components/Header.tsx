import React, { useState } from 'react';
import { PageView } from '../types';
import { Menu, X, ArrowRight, ShieldCheck, Calculator, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeDimensionalDrugIcon } from './ThreeDimensionalDrugIcon';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSimulator?: () => void;
  onOpenClinicalTools?: () => void;
  onOpenChatbot?: () => void;
  onOpenShareForReview?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSimulator,
  onOpenClinicalTools,
  onOpenChatbot,
  onOpenShareForReview
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Courses & CPD', page: 'courses' },
    { label: 'Product', page: 'product' },
    { label: 'For institutions', page: 'institutions' },
    { label: 'Evidence', page: 'evidence' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E8E5DD] transition-all">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[68px]">
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="PharmaMind AI Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] flex items-center justify-center text-[#F4F1EA] shadow-xs group-hover:bg-[#12463C] transition-colors">
              <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 13h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z" />
                <path d="M16 22v5" />
                <path d="M11 29h10" />
                <path d="M16 13V9" />
                <path d="M16 9a3 3 0 1 1 3-3" />
                <path d="M16 9a3 3 0 1 0-3-3" />
              </svg>
            </div>
            <span className="font-bold text-[1.05rem] tracking-tight text-[#1B211E] flex items-center gap-1">
              PharmaMind <span className="text-[#1E6B5E] font-medium italic">AI</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#1E6B5E] font-semibold bg-[#E4EEEA]/70'
                      : 'text-[#4B5350] hover:text-[#1B211E] hover:bg-[#F0EEE7]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions - Clinical Tools, Share for Review, and Request */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenShareForReview && (
              <button
                type="button"
                onClick={onOpenShareForReview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#12463C] bg-[#E4EEEA] hover:bg-[#D4E4DE] transition-colors border border-[#BBD7CF] cursor-pointer shadow-2xs"
                title="Generate direct links to share with professionals and faculty reviewers"
              >
                <Share2 className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Share for Review</span>
              </button>
            )}

            {onOpenClinicalTools && (
              <button
                type="button"
                onClick={onOpenClinicalTools}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1B211E] bg-[#FAF9F5] hover:bg-[#F0EEE7] transition-colors border border-[#DCD8CF] cursor-pointer shadow-2xs"
                title="Bedside Renal Calculator, BMI, BP & Formulary Interactions"
              >
                <ThreeDimensionalDrugIcon size="sm" badgeText="Rx" />
                <span>Clinical Tools</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] active:translate-y-px transition-all shadow-xs cursor-pointer"
            >
              <span>Request a pilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenClinicalTools && (
              <button
                type="button"
                onClick={onOpenClinicalTools}
                className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#1B211E] bg-[#FAF9F5] border border-[#DCD8CF]"
                title="Clinical Tools"
              >
                <Calculator className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Tools</span>
              </button>
            )}

            <button
              id="menuBtn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg border border-[#DCD8CF] text-[#1B211E] hover:bg-[#F0EEE7] transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#E8E5DD] bg-[#F7F6F2] px-4 py-4 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col gap-1 pb-3">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-left transition-colors ${
                      isActive
                        ? 'bg-[#E4EEEA] text-[#1E6B5E] font-semibold'
                        : 'text-[#1B211E] hover:bg-[#F0EEE7]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#1E6B5E]"></span>}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E8E5DD] flex flex-col gap-2">
              {onOpenShareForReview && (
                <button
                  onClick={() => {
                    onOpenShareForReview();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-[#12463C] bg-[#E4EEEA] border border-[#BBD7CF]"
                >
                  <Share2 className="w-4 h-4 text-[#1E6B5E]" />
                  <span>Share Platform for Peer Review</span>
                </button>
              )}

              {onOpenClinicalTools && (
                <button
                  onClick={() => {
                    onOpenClinicalTools();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-[#1B211E] bg-white border border-[#DCD8CF]"
                >
                  <Calculator className="w-4 h-4 text-[#1E6B5E]" />
                  <span>Clinical Tools &amp; Calculators</span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C]"
              >
                <span>Request a pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[0.78rem] text-[#757D79] mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B5E]" />
                <span>Addis Ababa, Ethiopia · Educational Simulation Only</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
