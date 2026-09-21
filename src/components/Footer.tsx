import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, PlayCircle, ExternalLink, Calculator, Stethoscope, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
  onOpenClinicalTools?: () => void;
  onOpenChatbot?: () => void;
  onOpenSecurity?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSimulator,
  onOpenClinicalTools,
  onOpenChatbot,
  onOpenSecurity
}) => {
  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#10201C] text-[#A9B3AE] border-t border-[#1C362F] pt-14 pb-12 transition-colors">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C362F]">
          {/* Col 1: Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E6B5E] flex items-center justify-center text-[#F4F1EA]">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 13h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z" />
                  <path d="M16 22v5" />
                  <path d="M11 29h10" />
                  <path d="M16 13V9" />
                  <path d="M16 9a3 3 0 1 1 3-3" />
                  <path d="M16 9a3 3 0 1 0-3-3" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">
                PharmaMind <span className="text-[#8FB8AC] font-medium italic">AI</span>
              </span>
            </div>

            <p className="text-sm text-[#A9B3AE] leading-relaxed max-w-[42ch]">
              A virtual patient simulator for Ethiopian clinical pharmacy education. Teaching the sequence that matters: find the problem, decide, document, follow up.
            </p>

            <div className="space-y-1 text-xs text-[#8FB8AC]/80 pt-1">
              <p>
                Addis Ababa, Ethiopia ·{' '}
                <a
                  href="mailto:betremaryameshete@gmail.com?subject=Inquiry%20regarding%20PharmaMind%20AI"
                  className="text-white hover:underline font-medium inline-flex items-center gap-1"
                >
                  betremaryameshete@gmail.com
                </a>
              </p>
              <p>Aligned with Ethiopian Standard Treatment Guidelines (MoH) and EPA CPD criteria</p>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h5 className="text-[0.78rem] uppercase font-bold tracking-wider text-[#8FB8AC] mb-3.5">Platform</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-[#F4F1EA] transition-colors text-left text-emerald-300 font-medium cursor-pointer flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Courses &amp; CPD certificates</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('product')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Virtual patient simulator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('product')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Care documentation (SOAP)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('product')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Socratic clinical tutor
                </button>
              </li>
              {onOpenChatbot && (
                <li>
                  <button onClick={onOpenChatbot} className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors cursor-pointer">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Ask Pharmacist Betremaryam (AI)</span>
                  </button>
                </li>
              )}
              {onOpenClinicalTools && (
                <li>
                  <button onClick={onOpenClinicalTools} className="inline-flex items-center gap-1.5 text-[#8FB8AC] hover:text-[#F4F1EA] transition-colors cursor-pointer">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Clinical tools &amp; calculators</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenSimulator} className="inline-flex items-center gap-1 text-[#8FB8AC] hover:text-[#F4F1EA] transition-colors cursor-pointer">
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Try interactive demo</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Organisations */}
          <div>
            <h5 className="text-[0.78rem] uppercase font-bold tracking-wider text-[#8FB8AC] mb-3.5">Organisations</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('institutions')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Schools of pharmacy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('institutions')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Hospitals &amp; CPD
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('institutions')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Licensing model
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('evidence')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Evidence base (13 sources)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#F4F1EA] transition-colors text-left text-[#8FB8AC] cursor-pointer">
                  Apply for free pilot
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[0.78rem] uppercase font-bold tracking-wider text-[#8FB8AC] mb-3.5">About</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  About PharmaMind AI
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Clinical safety boundaries
                </button>
              </li>
              {onOpenSecurity && (
                <li>
                  <button onClick={onOpenSecurity} className="hover:text-[#F4F1EA] text-[#8FB8AC] font-medium transition-colors text-left cursor-pointer flex items-center gap-1.5">
                    <span>Cybersecurity &amp; Data Privacy</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Roadmap &amp; Strategic plan
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#F4F1EA] transition-colors text-left cursor-pointer">
                  Contact &amp; Peer review
                </button>
              </li>
              <li>
                <a
                  href="https://www.perplexity.ai/computer/a/pharmamind-ai-Hlhizo3PSnCWL19G_D4RnQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[0.75rem] text-[#8FB8AC] hover:underline pt-1"
                >
                  <span>Independent review page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Non-Prescription Safety Warning */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8FB8AC]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8FB8AC] shrink-0" />
            <p>
              Educational simulation only. Not a medical device. Does not provide live prescription dosing, medical diagnosis, or patient care instructions.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[0.78rem] flex-wrap">
            <span>&copy; {new Date().getFullYear()} PharmaMind AI</span>
            <span>·</span>
            {onOpenSecurity && (
              <>
                <button onClick={onOpenSecurity} className="hover:underline text-emerald-300 font-medium cursor-pointer">Cybersecurity &amp; Privacy</button>
                <span>·</span>
              </>
            )}
            <button onClick={() => handleNav('about')} className="hover:underline cursor-pointer">Safety</button>
            <span>·</span>
            <button onClick={() => handleNav('contact')} className="hover:underline cursor-pointer">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
