import React from 'react';
import MainLayout from './layouts/MainLayout';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import CertificationsSection from './components/sections/CertificationsSection';
import PreviousPortfolioSection from './components/sections/PreviousPortfolioSection';
import ResumeSection from './components/sections/ResumeSection';
import ContactSection from './components/sections/ContactSection';

/**
 * Root Application Component — Phase 3 Architecture
 */
export function App() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificationsSection />
      <PreviousPortfolioSection />
      <ResumeSection />
      <ContactSection />
    </MainLayout>
  );
}

export default App;
