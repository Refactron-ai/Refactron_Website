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
              At Refactron, we value your privacy. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span><strong>Personal Information:</strong> Name, email, GitHub/LinkedIn ID, and company details when you register.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span><strong>Usage Data:</strong> Logs, device information, IP addresses, and usage statistics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span><strong>Source Code & Project Data:</strong> Code you upload or connect via our platform APIs (e.g., GitHub, GitLab).</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>To provide and improve our services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>To personalize user experience and suggest optimizations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>For internal analytics and AI model enhancement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>To communicate updates, offers, or important changes.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We use encryption, access controls, and industry-grade infrastructure to ensure your data is secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Tools</h2>
              <p className="text-gray-700 leading-relaxed">
                We may use third-party analytics and authentication providers (e.g., Google Analytics, GitHub OAuth). These providers may collect data under their own privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
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
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                Your data is retained only as long as necessary to provide services or comply with legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions or concerns about privacy, contact us at:
              </p>
              <div className="flex items-center gap-3 text-primary-600 font-medium">
                <Mail className="w-5 h-5" />
                <a href="mailto:privacy@refactron.ai" className="hover:text-primary-700 transition-colors duration-300">
                  privacy@refactron.ai
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