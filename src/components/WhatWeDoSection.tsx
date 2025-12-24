import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, TrendingUp, Code, Rocket } from 'lucide-react';

const WhatWeDoSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Refactoring Intelligence, Not Blind Automation',
      description:
        'Refactron treats refactoring as a structured, safety-first process—focusing on understanding your codebase and proposing targeted, behavior-preserving improvements.',
    },
    {
      icon: Code,
      title: 'Structural Code Understanding',
      description:
        'Analyze codebases beyond surface-level syntax by identifying relationships, dependencies, and structural complexity that impact long-term maintainability.',
    },
    {
      icon: Shield,
      title: 'Maintainability-Focused Refactoring',
      description:
        'Surface refactoring opportunities that reduce complexity, duplication, and architectural rigidity—while keeping changes minimal, reviewable, and safe to adopt.',
    },
    {
      icon: TrendingUp,
      title: 'Human-in-the-Loop Improvements',
      description:
        'Refactron proposes changes, but developers stay in control. Every refactor is delivered as a clear diff for inspection, review, and validation.',
    },
    {
      icon: Rocket,
      title: 'Legacy Code Evolution',
      description:
        'Gradually modernize long-lived systems through verified, incremental improvements rather than risky, large-scale rewrites.',
    },
    {
      icon: Zap,
      title: 'Workflow-Friendly by Design',
      description:
        'Designed to fit into existing developer workflows today, with a long-term vision of seamless CI/CD and tooling integration across your engineering stack.',
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 md:mb-8 text-gray-900 tracking-tight">
            Refactoring Intelligence, Not Blind Automation
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Refactron approaches refactoring as a structured, safety-first
            process—not a generic code generation task. It focuses on
            understanding code relationships and proposing targeted improvements
            that preserve behavior, so teams can evolve complex systems with
            confidence instead of risk-heavy rewrites.
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
                <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-gray-900">
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 text-gray-900 tracking-tight">
              A Safer Direction for Code Quality
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 px-2">
              Refactron is built on the belief that improving code quality
              should be predictable, explainable, and boring. The goal is not
              novelty, but confidence at scale—making large-scale refactoring a
              safe, repeatable part of everyday engineering work.
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
