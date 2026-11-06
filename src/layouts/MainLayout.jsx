import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/sections/Footer';
import CustomCursor from '../components/common/CustomCursor';
import ScrollProgress from '../components/common/ScrollProgress';
import ScrollToTop from '../components/common/ScrollToTop';
import { LenisProvider } from '../context/LenisContext';

/**
 * Main Cinematic Layout Wrapper — Phase 2
 * Integrates Lenis smooth scrolling, scroll progress, custom cursor, and scroll-to-top button.
 */
export function MainLayout({ children }) {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col relative selection:bg-[#E87524]/20 selection:text-[#F5A14B]">
        {/* Subtle Viewport Progress Bar */}
        <ScrollProgress />

        {/* Lightweight Cinematic Desktop Cursor */}
        <CustomCursor />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Floating Scroll-to-Top Action */}
        <ScrollToTop />

        {/* Editorial Footer */}
        <Footer />
      </div>
    </LenisProvider>
  );
}

export default MainLayout;
