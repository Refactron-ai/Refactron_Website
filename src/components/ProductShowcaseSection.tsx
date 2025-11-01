import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Code, Zap, Shield, Star } from 'lucide-react';

const ProductShowcaseSection: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Comprehensive Analysis',
      description:
        'Security scanning, code smells detection, complexity metrics, and dead code identification.',
    },
    {
      icon: Zap,
      title: 'Intelligent Refactoring',
      description:
        'Extract constants, reduce parameters, simplify conditionals, and auto-generate docstrings.',
    },
    {
      icon: Shield,
      title: 'Safe & Reliable',
      description:
        'Risk scoring, before/after previews, and 98 tests passing with 90% code coverage.',
    },
  ];

  const stats = [
    { label: 'Tests Passing', value: '98', icon: CheckCircle },
    { label: 'Code Coverage', value: '90%', icon: Star },
    { label: 'Production Ready', value: 'v0.1.0', icon: Download },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white relative">
      {/* Background Effects - Hidden on mobile */}
      <div className="absolute inset-0">
        <div className="hidden sm:block absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="hidden sm:block absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="text-green-700 font-medium text-sm sm:text-base">
              Now Available
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center text-gray-900"
        >
          <span className="gradient-text">Refactron Library</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 sm:mb-16 max-w-3xl mx-auto text-center leading-relaxed px-2"
        >
          The intelligent code refactoring transformer that eliminates technical
          debt, modernizes legacy code, and automates code refactoring with
          AI-powered intelligence.
        </motion.p>

        {/* Installation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Get Started in Seconds
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                Install Refactron and start refactoring your Python code today
              </p>
            </div>

            <div className="bg-black rounded-lg p-4 sm:p-6 font-mono text-sm sm:text-base">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Terminal</span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText('pip install refactron')
                  }
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-green-400">
                <span className="text-gray-400">$</span> pip install refactron
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 sm:mt-8">
              <a
                href="https://pypi.org/project/refactron/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                View on PyPI
              </a>
              <a
                href="https://github.com/Refactron-ai/Refactron_lib"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Code className="w-4 h-4" />
                View Source
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-3 mx-auto">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Key Features
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to transform your Python codebase with
              intelligent automation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
