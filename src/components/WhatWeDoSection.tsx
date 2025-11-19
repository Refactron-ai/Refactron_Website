import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, TrendingUp, Code, Rocket } from 'lucide-react';

const WhatWeDoSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Code Refactoring',
      description:
        'Advanced machine learning algorithms that understand your codebase and suggest intelligent refactoring strategies.',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description:
        'Automatically identify and fix performance bottlenecks, reducing execution time and resource usage.',
    },
    {
      icon: Shield,
      title: 'Maintainability Improvements',
      description:
        'Transform complex, hard-to-maintain code into clean, readable, and well-structured solutions.',
    },
    {
      icon: TrendingUp,
      title: 'Developer Productivity',
      description:
        'Save hours of manual refactoring with automated suggestions that follow industry best practices.',
    },
    {
      icon: Code,
      title: 'Legacy Code Modernization',
      description:
        'Safely modernize outdated codebases while maintaining functionality and improving architecture.',
    },
    {
      icon: Rocket,
      title: 'Seamless Integration',
      description:
        'Works with your existing development workflow and integrates with popular IDEs and CI/CD pipelines.',
    },
  ];

  return (
    <section
      id="features"
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 relative scroll-mt-24"
    >
      {/* Background Effects - Reduced on mobile */}
      <div className="absolute inset-0">
        <div className="hidden sm:block absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="hidden sm:block absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Product Announcement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-2 mb-4 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Product Release
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              Refactron Library v1.0.0 is Now Live!
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
              Our first product is officially available on PyPI. Install it
              today and start transforming your Python code with AI-powered
              refactoring.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>98 Tests Passing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>90% Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Production Ready</span>
              </div>
            </div>
            <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-sm max-w-md mx-auto">
              <span className="text-gray-400">$</span> pip install refactron
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-900">
            AI-Powered Code Refactoring Solutions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Refactron leverages cutting-edge artificial intelligence to
            transform how developers approach automated code optimization. Our
            intelligent refactoring tools don't just improve code—they
            revolutionize the entire development workflow with AI-driven code
            modernization.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 h-full transition-all duration-300 hover:transform hover:scale-105 shadow-sm border border-gray-100 hover:shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto shadow-sm border border-gray-100">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
              The Future of Code Optimization
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 px-2">
              Imagine a world where every developer has access to an AI
              assistant that not only understands their code but can
              intelligently improve it. That's what Refactron brings to the
              table—a revolutionary approach to code quality that scales with
              your team and grows with your projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Developer Focused</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
