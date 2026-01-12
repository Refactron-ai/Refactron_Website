import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <section
      id="home"
      className="relative h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black scroll-mt-24 overflow-hidden"
    >
      {/* Background Effects - Dynamic blue glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float opacity-20"></div>
        <div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-3xl animate-float opacity-15"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600 rounded-full blur-3xl animate-float opacity-10"
          style={{ animationDelay: '4s' }}
        ></div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e915_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e915_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Main Hero Content */}
      <div className="relative z-10 h-screen px-4 flex items-start pt-16 sm:pt-20">
        <div className="flex items-start w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <div className="text-left max-w-3xl w-full">
            {/* Main Headline - Bold and striking */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 leading-[1.1] tracking-tight"
            >
              <span className="text-white">Transform Legacy Code</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                to Modern Standards
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-lg sm:text-xl md:text-2xl text-blue-200 mb-4 sm:mb-5 leading-relaxed font-light"
            >
              Refactor. Optimize. Automate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-sm sm:text-base md:text-lg text-gray-300 mb-5 sm:mb-6 leading-relaxed"
            >
              Experience the future of automated code optimization. Transform
              legacy code into clean, maintainable solutions with our AI-powered
              refactoring tools. Join thousands of developers using intelligent
              code modernization.
            </motion.p>

            {/* CTAs - Modern vibrant design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5"
            >
              <a
                href="https://pypi.org/project/refactron/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl px-5 sm:px-6 py-3 hover:from-blue-600 hover:to-cyan-600 font-medium text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
              >
                <span>Try Refactron Library</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={scrollToEarlyAccess}
                className="group inline-flex items-center gap-2 border-2 border-blue-400/50 rounded-xl px-5 sm:px-6 py-3 text-blue-300 hover:border-blue-400 hover:text-blue-200 hover:bg-blue-500/10 font-medium text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
              >
                <span>Get Updates</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="text-gray-400 text-xs sm:text-sm"
            >
              <p>Join thousands of developers already using Refactron</p>
            </motion.div>
          </div>
          {/* Empty right side for visual balance */}
          <div className="hidden lg:block flex-1"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
