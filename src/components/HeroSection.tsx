import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.querySelector(
      '[data-section="early-access"]'
    );
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-white scroll-mt-24">
      {/* Background Effects - More subtle for cleaner look */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-40"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-30"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 min-h-screen px-4">
        <div className="flex items-center justify-center flex-1 px-4 sm:px-6 pt-4 sm:pt-8">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-4 sm:mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-green-700 text-xs sm:text-sm font-medium">
                  Now Available - Refactron Library v1.0.0
                </span>
              </div>
            </motion.div>

            {/* Main Headline - Improved typography with lighter weight */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-4 sm:mb-6 leading-[1.1] tracking-tight"
            >
              <span className="gradient-text">AI-Powered Code Refactoring</span>
              <br />
              <span className="text-gray-800">Revolutionizing Development</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Refactor. Optimize. Automate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Experience the future of automated code optimization. Transform
              legacy code into clean, maintainable solutions with our AI-powered
              refactoring tools. Join thousands of developers using intelligent
              code modernization.
            </motion.p>

            {/* CTAs - Cleaner design, same content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <a
                href="https://pypi.org/project/refactron/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
              >
                <span>Try Refactron Library</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={scrollToEarlyAccess}
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
              >
                <span>Get Updates</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-8 sm:mt-12 text-gray-500 text-xs sm:text-sm"
            >
              <p>Join thousands of developers already using Refactron</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
