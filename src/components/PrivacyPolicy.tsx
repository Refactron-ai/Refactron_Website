import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Refactron</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Effective Date: August 3, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              At Refactron, we value your privacy. This Privacy Policy outlines
              how we collect, use, and safeguard your data when you use our
              services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Personal Information:</strong> Name, email,
                    GitHub/LinkedIn ID, and company details when you register.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Usage Data:</strong> Logs, device information, IP
                    addresses, and usage statistics.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Source Code & Project Data:</strong> Code you upload
                    or connect via our platform APIs (e.g., GitHub, GitLab).
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Your Data
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>To provide and improve our services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    To personalize user experience and suggest optimizations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>For internal analytics and AI model enhancement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    To communicate updates, offers, or important changes.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Data Protection
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use encryption, access controls, and industry-grade
                infrastructure to ensure your data is secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your
                experience on our website. You can control cookie preferences
                through our cookie settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Types of Cookies We Use:
              </h3>
              <ul className="space-y-3 text-gray-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Necessary Cookies:</strong> Essential for website
                    functionality, security, and user preferences. These cannot
                    be disabled.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Analytics Cookies:</strong> Help us understand
                    website usage through anonymous data collection (e.g., page
                    views, user behavior).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Marketing Cookies:</strong> Used for targeted
                    advertising and campaign tracking across websites.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    <strong>Functional Cookies:</strong> Enable enhanced
                    features like language preferences and personalized
                    settings.
                  </span>
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                You can manage your cookie preferences at any time by clicking
                "Cookie Settings" in our footer or by adjusting your browser
                settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Third-Party Tools
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may use third-party analytics and authentication providers
                (e.g., Google Analytics, GitHub OAuth). These providers may
                collect data under their own privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>Access, correct, or delete your personal data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>Request code deletion at any time.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>Opt-out of marketing communications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>Manage cookie preferences and tracking settings.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Your data is retained only as long as necessary to provide
                services or comply with legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions or concerns about privacy, contact us at:
              </p>
              <div className="flex items-center gap-3 text-primary-600 font-medium">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:privacy.refactron@gmail.com"
                  className="hover:text-primary-700 transition-colors duration-300"
                >
                  privacy.refactron@gmail.com
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
