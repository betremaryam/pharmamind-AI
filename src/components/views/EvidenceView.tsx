import React, { useState } from 'react';
import { PageView } from '../../types';
import { EVIDENCE_STUDIES } from '../../data/evidence';
import {
  Search,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  Filter,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface EvidenceViewProps {
  onNavigate: (page: PageView) => void;
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Adherence & DTPs',
    'Workforce & Supervision',
    'Simulation Method',
    'Market Context'
  ];

  const filteredStudies = EVIDENCE_STUDIES.filter((study) => {
    const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.authorsOrSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (study.statHighlight && study.statHighlight.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* Title Header */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="max-w-[64ch] space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1E6B5E] block">
            Evidence Base
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#1B211E]">
            Every claim, with its source
          </h1>
          <p className="text-[#4B5350] text-base sm:text-lg leading-relaxed">
            PharmaMind AI is built on published Ethiopian and international clinical research rather than assertion. These are the peer-reviewed studies the product design rests on, indexed so faculty and clinicians can verify them.
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTER CONTROLS */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl border border-[#DCD8CF] p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#757D79] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, study author, or finding (e.g. hypertension, PLOS ONE, Motta)..."
                className="w-full pl-9 pr-4 py-2 rounded-lg text-xs sm:text-sm bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E]"
              />
            </div>

            {/* Total count badge */}
            <div className="text-xs text-[#757D79] self-start md:self-center">
              Showing <strong className="text-[#1B211E]">{filteredStudies.length}</strong> of {EVIDENCE_STUDIES.length} sources
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#E8E5DD]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1E6B5E] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#4B5350] border border-[#DCD8CF] hover:bg-[#F0EEE7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIES LIST */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {filteredStudies.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#DCD8CF]">
            <BookOpen className="w-8 h-8 text-[#757D79] mx-auto mb-2 opacity-50" />
            <h3 className="text-base font-bold text-[#1B211E]">No matching studies found</h3>
            <p className="text-xs text-[#757D79] mt-1">Try resetting your search query or choosing another category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs font-semibold text-[#1E6B5E] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#DCD8CF] shadow-xs hover:border-[#1E6B5E]/50 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1 max-w-[850px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F5] text-[#1E6B5E] border border-[#1E6B5E]/20">
                        {study.category}
                      </span>
                      <span className="text-xs text-[#757D79]">
                        {study.authorsOrSource} · {study.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1B211E] leading-snug">
                      {study.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(study.id, `${study.title}. ${study.authorsOrSource}, ${study.year}. ${study.url}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium bg-[#FAF9F5] border border-[#DCD8CF] text-[#4B5350] hover:bg-[#F0EEE7] transition-colors"
                      title="Copy citation"
                    >
                      {copiedId === study.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Cite</span>
                        </>
                      )}
                    </button>

                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold text-white bg-[#1E6B5E] hover:bg-[#12463C] transition-colors"
                    >
                      <span>Read Publication</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5350] leading-relaxed">
                  {study.summary}
                </p>

                {study.statHighlight && (
                  <div className="pt-2 border-t border-[#E8E5DD] flex items-center gap-2 text-xs">
                    <span className="text-[#757D79]">Key finding:</span>
                    <span className="font-bold text-[#12463C] bg-[#E4EEEA] px-2 py-0.5 rounded text-[0.72rem]">
                      {study.statHighlight}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SCRUTINY CTA BAND */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-[#10201C] rounded-2xl p-8 sm:p-12 text-[#F4F1EA] shadow-xl space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-[#8FB8AC] block">
            Open to Scrutiny
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-white">
            If a claim on this site is not sourced, it should not be here.
          </h2>
          <p className="text-sm sm:text-base text-[#A9B3AE] leading-relaxed max-w-[62ch]">
            Faculty and reviewers are welcome to challenge the case content directly. That is how it gets defensible in front of an academic curriculum board.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#12463C] bg-white hover:bg-[#EAF1EE] transition-all cursor-pointer"
            >
              <span>Review the case bank with us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
