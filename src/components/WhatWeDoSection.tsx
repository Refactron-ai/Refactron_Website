import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Shield,
  TrendingUp,
  Code,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

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

  const benefits = [
    'AI-Powered',
    'Enterprise Ready',
    'Developer Focused',
    'Safety-First',
  ];

  return (
    <section
      id="features"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black via-blue-950/30 to-black scroll-mt-24 overflow-hidden"
    >
      {/* Pattern Overlay with blue grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 90%, transparent 100%)',
        }}
      ></div>

      {/* Enhanced Background Effects with Blue */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-25 animate-float"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight leading-tight">
            Refactoring Intelligence, Not Blind Automation
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Refactron approaches refactoring as a structured, safety-first
            process—not a generic code generation task. It focuses on
            understanding code relationships and proposing targeted improvements
            that preserve behavior, so teams can evolve complex systems with
            confidence instead of risk-heavy rewrites.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 sm:p-8 h-full border border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 hover:-translate-y-2">
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-6 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/50">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold mb-4 text-white leading-tight tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 sm:p-10 lg:p-12 max-w-5xl mx-auto border border-blue-500/30 shadow-2xl shadow-blue-500/20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight">
              A Safer Direction for Code Quality
            </h3>
            <p className="text-base sm:text-lg text-blue-200 leading-relaxed mb-8 max-w-3xl mx-auto">
              Refactron is built on the belief that improving code quality
              should be predictable, explainable, and boring. The goal is not
              novelty, but confidence at scale—making large-scale refactoring a
              safe, repeatable part of everyday engineering work.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-900/60 backdrop-blur-sm border border-blue-500/40 hover:border-blue-400/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center border border-blue-400/40">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-blue-100 text-center">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
