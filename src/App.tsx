import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HeroSection from './components/HeroSection';
import RecognitionBadges from './components/RecognitionBadges';
import WhatWeDoSection from './components/WhatWeDoSection';
import ProductShowcaseSection from './components/ProductShowcaseSection';
import EarlyAccessForm from './components/EarlyAccessForm';
import CaseStudiesPage from './components/CaseStudiesPage';
import CaseStudyDetailPage from './components/CaseStudyDetailPage';
import AboutPage from './components/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ProductReleasePopup from './components/ProductReleasePopup';
import CookieManager from './components/CookieManager';
import DocsPage from './components/DocsPage';
import AuthApp from './components/AuthApp';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToMain from './components/SkipToMain';
import usePerformanceMonitoring from './hooks/usePerformanceMonitoring';
import useAccessibility from './hooks/useAccessibility';
import PageLayout from './components/PageLayout';

const LandingContent: React.FC = () => (
  <>
    <HeroSection />
    <RecognitionBadges />
    <WhatWeDoSection />
    <ProductShowcaseSection />
    <EarlyAccessForm />
  </>
);

function App() {
  // Monitor performance metrics
  usePerformanceMonitoring();

  // Enable accessibility features
  useAccessibility();

  const isDocsHost =
    typeof window !== 'undefined' &&
    window.location.hostname.startsWith('docs.');
  
  const isAppHost =
    typeof window !== 'undefined' &&
    window.location.hostname.startsWith('app.');

  return (
    <ErrorBoundary>
      <SkipToMain />
      <Router>
        {isDocsHost ? (
          <Routes>
            <Route path="/*" element={<DocsPage />} />
          </Routes>
        ) : isAppHost ? (
          <Routes>
            <Route path="/*" element={<AuthApp />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <PageLayout>
                    <LandingContent />
                  </PageLayout>
                }
              />
              <Route
                path="/case-studies"
                element={
                  <PageLayout>
                    <CaseStudiesPage />
                  </PageLayout>
                }
              />
              <Route
                path="/case-studies/:slug"
                element={
                  <PageLayout>
                    <CaseStudyDetailPage />
                  </PageLayout>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <PageLayout>
                    <PrivacyPolicy />
                  </PageLayout>
                }
              />
              <Route
                path="/terms-of-service"
                element={
                  <PageLayout>
                    <TermsOfService />
                  </PageLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PageLayout>
                    <AboutPage />
                  </PageLayout>
                }
              />
              <Route
                path="*"
                element={
                  <PageLayout>
                    <NotFoundPage />
                  </PageLayout>
                }
              />
            </Routes>
            <ProductReleasePopup />
            <CookieManager />
          </>
        )}
        <Analytics />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
