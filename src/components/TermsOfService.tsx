import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Effective Date: August 3, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              These Terms of Service govern your use of Refactron's platform,
              tools, and services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Refactron, you agree to be bound by these
                terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Refactron is an AI-powered platform that refactors and optimizes
                source code using machine learning models and heuristics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. User Responsibilities
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>Provide accurate account details.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>Use the platform only for lawful purposes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-semibold">•</span>
                  <span>
                    Do not upload malicious code, proprietary third-party code,
                    or violate any intellectual property rights.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Code Ownership
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You retain full ownership of your code. We do not claim
                intellectual property over your original source code.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. License to Use
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You grant Refactron a limited license to process your code
                solely for the purpose of optimization and feature delivery.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may suspend or terminate accounts for violating terms or
                misuse of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Disclaimers
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Refactron is provided "as-is". We make no guarantees on output
                accuracy, compatibility, or performance improvements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Refactron shall not be liable for any damages arising from the
                use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Modifications to the Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update these terms. Continued use
                implies acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Questions about these terms? Reach out to:
              </p>
              <div className="flex items-center gap-3 text-primary-600 font-medium">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:legal.refactron@gmail.com"
                  className="hover:text-primary-700 transition-colors duration-300"
                >
                  legal.refactron@gmail.com
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;
