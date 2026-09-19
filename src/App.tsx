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
import { InteractiveCaseSimulator } from './components/InteractiveCaseSimulator';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState<boolean>(false);

  // Synchronize hash with page state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'product', 'institutions', 'evidence', 'about', 'contact', 'simulator'].includes(hash)) {
        if (hash === 'simulator') {
          setIsSimulatorModalOpen(true);
        } else {
          setCurrentPage(hash as PageView);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#1B211E] selection:bg-[#1E6B5E]/20 selection:text-[#12463C]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E6B5E] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSimulator={handleOpenSimulator}
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
              />
            )}
            {currentPage === 'product' && (
              <ProductView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
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
              <AboutView onNavigate={handleNavigate} />
            )}
            {currentPage === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
                onOpenSimulator={handleOpenSimulator}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSimulator={handleOpenSimulator}
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
    </div>
  );
}
