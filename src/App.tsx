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

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700">
      <main>
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      <ProductReleasePopup />
      <CookieManager />
      <Analytics />
    </Router>
  );
}

export default App;
