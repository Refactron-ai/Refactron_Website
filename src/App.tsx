import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import HeroSection from './components/HeroSection';
import RefactoringWorkflowSection from './components/RefactoringWorkflowSection';
import WhatWeDoSection from './components/WhatWeDoSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import AboutPage from './components/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

import CookieManager from './components/CookieManager';
import DocsPage from './components/DocsPage';
import AuthApp from './components/AuthApp';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToMain from './components/SkipToMain';
import usePerformanceMonitoring from './hooks/usePerformanceMonitoring';
import useAccessibility from './hooks/useAccessibility';
import PageLayout from './components/PageLayout';
import Changelog from './components/Changelog';
import SecurityPage from './components/SecurityPage';
import StatusPage from './components/StatusPage';

import { ThemeProvider } from './contexts/ThemeContext';

const LandingContent: React.FC = () => (
  <>
    <HeroSection />
    <RefactoringWorkflowSection />
    <WhatWeDoSection />
    <PricingSection />
    <FAQSection />
  </>
);

function App() {
  // Monitor performance metrics
  usePerformanceMonitoring();

  // Enable accessibility features
  useAccessibility();

  // Support local testing via environment variable
  const enableLocalAuth =
    process.env.REACT_APP_ENABLE_LOCAL_AUTH === 'true' ||
    process.env.REACT_APP_ENABLE_LOCAL_AUTH === '1';

  const enableLocalDocs =
    process.env.REACT_APP_ENABLE_LOCAL_DOCS === 'true' ||
    process.env.REACT_APP_ENABLE_LOCAL_DOCS === '1';

  const isDocsHost =
    (typeof window !== 'undefined' &&
      window.location.hostname.startsWith('docs.')) ||
    (enableLocalDocs &&
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.0.')));

  const isAppHost =
    (typeof window !== 'undefined' &&
      window.location.hostname.startsWith('app.')) ||
    (enableLocalAuth &&
      !enableLocalDocs &&
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.0.')));

  return (
    <ThemeProvider>
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
                    <PageLayout mainClassName="pt-0 sm:pt-0">
                      <LandingContent />
                    </PageLayout>
                  }
                />
                {/* Legacy redirects — preserve old /case-studies URLs */}
                <Route
                  path="/case-studies"
                  element={<Navigate to="/blog" replace />}
                />
                <Route
                  path="/case-studies/:slug"
                  element={<Navigate to="/blog" replace />}
                />
                <Route
                  path="/blog"
                  element={
                    <PageLayout>
                      <BlogPage />
                    </PageLayout>
                  }
                />
                <Route
                  path="/blog/:slug"
                  element={
                    <PageLayout mainClassName="pt-0 sm:pt-0">
                      <BlogPostPage />
                    </PageLayout>
                  }
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route
                  path="/changelog"
                  element={
                    <PageLayout transparentBg mainClassName="pt-0 sm:pt-0">
                      <Changelog />
                    </PageLayout>
                  }
                />
                <Route
                  path="/security"
                  element={
                    <PageLayout>
                      <SecurityPage />
                    </PageLayout>
                  }
                />
                <Route path="/status" element={<StatusPage />} />
                <Route
                  path="/about"
                  element={
                    <PageLayout mainClassName="pt-0 sm:pt-0">
                      <AboutPage />
                    </PageLayout>
                  }
                />

                {/* Local auth routes - only accessible when REACT_APP_ENABLE_LOCAL_AUTH is enabled */}
                {enableLocalAuth && (
                  <>
                    <Route path="/login" element={<AuthApp />} />
                    <Route path="/signup" element={<AuthApp />} />
                  </>
                )}
                <Route
                  path="*"
                  element={
                    <PageLayout>
                      <NotFoundPage />
                    </PageLayout>
                  }
                />
              </Routes>

              <CookieManager />
            </>
          )}
          <Analytics
            beforeSend={event => {
              try {
                const consent = localStorage.getItem('cookie-consent');
                const prefs = localStorage.getItem('cookie-preferences');
                if (!consent || !prefs) return null;
                const parsed = JSON.parse(prefs);
                return parsed.analytics === true ? event : null;
              } catch {
                return null;
              }
            }}
          />
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
