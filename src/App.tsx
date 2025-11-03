import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HeroSection from './components/HeroSection';
import WhatWeDoSection from './components/WhatWeDoSection';
import ProductShowcaseSection from './components/ProductShowcaseSection';
import EarlyAccessForm from './components/EarlyAccessForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ProductReleasePopup from './components/ProductReleasePopup';
import CookieManager from './components/CookieManager';
import DocsPage from './components/DocsPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToMain from './components/SkipToMain';
import usePerformanceMonitoring from './hooks/usePerformanceMonitoring';
import useAccessibility from './hooks/useAccessibility';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700">
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <WhatWeDoSection />
        <ProductShowcaseSection />
        <EarlyAccessForm />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  // Monitor performance metrics
  usePerformanceMonitoring();

  // Enable accessibility features
  useAccessibility();

  const isDocsHost =
    typeof window !== 'undefined' &&
    window.location.hostname.startsWith('docs.');

  return (
    <ErrorBoundary>
      <SkipToMain />
      <Router>
        {isDocsHost ? (
          <Routes>
            <Route path="/*" element={<DocsPage />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFoundPage />} />
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
