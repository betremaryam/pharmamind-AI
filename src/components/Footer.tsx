import React from 'react';
import { PageView } from '../types';
import { ShieldCheck, PlayCircle, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenSimulator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSimulator }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#10201C] text-[#A9B3AE] pt-14 pb-8 border-t border-[#2A453E]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none mb-3"
            >
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
              <span className="font-bold text-[1.1rem] tracking-tight text-[#F4F1EA]">
                PharmaMind <span className="text-[#8FB8AC] font-normal italic">AI</span>
              </span>
            </button>
            <p className="text-sm text-[#A9B3AE] leading-relaxed max-w-[36ch] mb-4">
              Virtual patient simulation and pharmaceutical care documentation, built for Ethiopian clinical pharmacy education.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#173029] text-[#8FB8AC] border border-[#2A453E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Founded by a Clinical Pharmacist
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#173029] text-[#F4F1EA] border border-[#2A453E]">
                Addis Ababa
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h5 className="text-[0.78rem] uppercase font-bold tracking-wider text-[#8FB8AC] mb-3.5">Platform</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Virtual patient simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Care documentation (SOAP)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Socratic clinical tutor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('product')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Drug information monographs
                </button>
              </li>
              <li>
                <button onClick={onOpenSimulator} className="inline-flex items-center gap-1 text-[#8FB8AC] hover:text-[#F4F1EA] transition-colors">
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
                <button onClick={() => onNavigate('institutions')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Schools of pharmacy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('institutions')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Hospitals &amp; CPD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('institutions')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Licensing model
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('evidence')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Evidence base (13 sources)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#F4F1EA] transition-colors text-left text-[#8FB8AC]">
                  Apply for free pilot
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-[0.78rem] uppercase font-bold tracking-wider text-[#8FB8AC] mb-3.5">Company</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  About the founder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Clinical safety boundaries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Roadmap &amp; Risks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#F4F1EA] transition-colors text-left">
                  Contact &amp; Peer review
                </button>
              </li>
              <li>
                <a
                  href="https://www.perplexity.ai/computer/a/pharmamind-ai-Hlhizo3PSnCWL19G_D4RnQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#8FB8AC] hover:text-[#F4F1EA] transition-colors text-left"
                >
                  <span>Online prototype</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#2A453E] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7C857F]">
          <div className="flex items-center gap-3">
            <span>© 2026 PharmaMind AI · Addis Ababa, Ethiopia</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#8FB8AC] hover:text-[#F4F1EA] transition-colors p-1"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to top</span>
            </button>
          </div>
          <p className="max-w-[62ch] text-center md:text-right text-[0.75rem] leading-relaxed text-[#7C857F]">
            Educational platform for pharmacy training. Not a diagnostic tool and not intended for individual live patient care decisions. Cases are simulated learning scenarios.
          </p>
        </div>
      </div>
    </footer>
  );
};
