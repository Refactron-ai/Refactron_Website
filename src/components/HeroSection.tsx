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
    <section className="relative min-h-screen bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main Hero Content with Logo and Countdown */}
      <div className="relative z-10 min-h-screen px-4">
        {/* Logo and Countdown Row */}
        <div className="pt-4 sm:pt-8 pb-8 sm:pb-12 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4 sm:gap-0">
          {/* Logo - Top Left */}
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            src="/Refactron-logo-TM.png"
            alt="Refactron"
            className="h-12 sm:h-16 w-auto"
          />

          {/* Status Badge - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">v1.0.0</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center flex-1 px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
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

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="gradient-text">AI-Powered Code Refactoring</span>
              <br />
              <span className="text-gray-800">Revolutionizing Development</span>
            </motion.h1>

            {/* Tagline moved to main hero content */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Refactor. Optimize. Automate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
            >
              Experience the future of automated code optimization. Transform
              legacy code into clean, maintainable solutions with our AI-powered
              refactoring tools. Join thousands of developers using intelligent
              code modernization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://pypi.org/project/refactron/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 glow-border shadow-lg cursor-pointer text-sm sm:text-base"
              >
                <span>Try Refactron Library</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={scrollToEarlyAccess}
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer text-sm sm:text-base"
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

      {/* Floating Elements - Hidden on mobile for better performance */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:block absolute top-1/3 right-10 w-2 h-2 bg-primary-400 rounded-full opacity-60"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="hidden sm:block absolute bottom-1/3 left-10 w-3 h-3 bg-primary-300 rounded-full opacity-40"
      ></motion.div>
    </section>
  );
};

export default HeroSection;
