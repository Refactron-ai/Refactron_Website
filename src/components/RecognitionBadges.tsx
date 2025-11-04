import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const RecognitionBadges: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 text-primary-600" />
            <span className="text-primary-700 text-sm font-medium">
              Industry Recognition
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted by the Industry
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Recognized for excellence in software intelligence and innovation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 border border-gray-200 hover:shadow-2xl transition-all duration-300 max-w-4xl w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10">
              {/* Badge Image - Fixed size container for consistent alignment */}
              <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-auto">
                <div className="relative w-64 h-48 sm:w-72 sm:h-56 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-4">
                  <img
                    src="/F6S_Top_Company_Software Intelligence_6.png"
                    alt="F6S Top 12 Software Intelligence Company - Ranked #6"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Recognition Details - Vertical divider on desktop */}
              <div className="hidden sm:block w-px h-40 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

              {/* Recognition Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  Top 12 Software Intelligence Company
                </h3>
                <p className="text-xl sm:text-2xl text-primary-600 font-semibold mb-4 flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-block w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
                    #6
                  </span>
                  Ranked by F6S
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Recognized by F6S for our innovative approach to AI-powered
                  code refactoring and software intelligence solutions.
                </p>
                <div className="mt-6 flex items-center justify-center sm:justify-start gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Verified Achievement</span>
                  </div>
                  <span>•</span>
                  <span>November 2025</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            Join thousands of developers who trust Refactron for their code
            optimization needs
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionBadges;
