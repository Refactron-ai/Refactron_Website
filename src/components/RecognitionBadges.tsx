import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Star } from 'lucide-react';

const RecognitionBadges: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '1K+', icon: Users },
    { label: 'Lines of Code', value: '100K+', icon: TrendingUp },
    { label: 'Satisfaction', value: '4.9/5', icon: Star },
  ];

  return (
    <section
      id="recognition"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white scroll-mt-24 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-15 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-50/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Recognized for Excellence
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by leading organizations and recognized by industry experts
            for innovation in software intelligence
          </p>
        </motion.div>

        {/* Main Award Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Badge Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-full lg:w-auto"
              >
                <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
                  <div className="w-full max-w-xs mx-auto aspect-[4/3] flex items-center justify-center">
                    <img
                      src="/F6S_Top_Company_Software Intelligence_6.png"
                      alt="F6S Top 12 Software Intelligence Company - Ranked #6"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </motion.div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-primary-600" />
                      <span className="text-primary-700 text-xs font-medium uppercase tracking-wide">
                        Verified Achievement
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-3 leading-tight tracking-tight">
                      Top 12 Software Intelligence Company
                    </h3>
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-lg font-bold text-lg">
                          #6
                        </span>
                        <span className="text-lg sm:text-xl text-primary-600 font-semibold">
                          Ranked by F6S
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
                      Recognized by F6S for our innovative approach to AI-powered
                      code refactoring and software intelligence solutions that
                      help developers modernize legacy codebases at scale.
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Verified</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">November 2025</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">Software Intelligence Category</span>
                  </div>
                </div>
              </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-light text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Join thousands of developers and organizations who trust Refactron
            to transform their legacy code into modern, maintainable solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionBadges;
