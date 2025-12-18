import React from 'react';
import {
  Brain,
  Shield,
  CheckCircle2,
  FileCode,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const AboutPage: React.FC = () => {
  // SEO Configuration
  useSEO({
    title: 'About Refactron | AI-Driven Refactoring Intelligence Platform',
    description:
      'Refactron is an AI-driven refactoring intelligence platform designed to safely evolve real-world codebases through behavior-preserving transformation, static analysis, and verification mechanisms.',
    keywords:
      'AI code refactoring, automated refactoring, code modernization, technical debt, static analysis, behavior-preserving transformation, developer tools',
    ogTitle: 'About Refactron | AI-Driven Refactoring Intelligence',
    ogDescription:
      'Safely evolve codebases with AI-powered refactoring. Behavior-preserving transformation with verification and risk scoring.',
    canonical: 'https://refactron.dev/about',
    robots: 'index, follow',
  });

  const coreComponents = [
    {
      icon: FileCode,
      title: 'Static Analysis',
      description:
        'Understand structure and dependencies across your codebase',
    },
    {
      icon: Brain,
      title: 'Intent-Aware Models',
      description:
        'Learned models that generate refactor candidates with context understanding',
    },
    {
      icon: Shield,
      title: 'Verification Mechanisms',
      description:
        'AST diffing and test-based validation to ensure functional equivalence',
    },
    {
      icon: CheckCircle2,
      title: 'Risk Scoring',
      description:
        'Balance improvement against regression risk before applying changes',
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">About Refactron</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
            AI-driven refactoring intelligence platform designed to safely evolve
            real-world codebases
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12 sm:space-y-16">
        {/* Problem Statement */}
        <section className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            The Problem We Solve
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Modern software systems accumulate technical debt over time—complex
            logic, duplicated code, fragile abstractions, and missing
            documentation. While existing tools can detect these issues, fixing
            them at scale remains risky, manual, and expensive. Refactron exists
            to close that gap.
          </p>
        </section>

        {/* Solution Overview */}
        <section className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Approach
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Rather than generating new code blindly, Refactron focuses on{' '}
            <strong className="text-primary-700">behavior-preserving transformation</strong>.
            It analyzes existing codebases, identifies structural and
            architectural debt, proposes targeted refactors, and verifies their
            safety before any change is applied.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Every accepted refactor is delivered as a{' '}
            <strong className="text-primary-700">reviewable, auditable diff</strong>,
            not an opaque rewrite.
          </p>
        </section>

        {/* Core Components */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            At Its Core
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {coreComponents.map((component, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <component.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {component.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {component.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Beyond Refactoring
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Refactron also generates{' '}
            <strong className="text-primary-700">contextual documentation</strong>{' '}
            from verified refactors, helping teams improve maintainability,
            accelerate onboarding, and reduce long-term engineering costs.
          </p>
        </section>

        {/* Library Positioning */}
        <section className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            The Refactron Library
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            The currently available{' '}
            <a
              href="https://pypi.org/project/refactron/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Refactron library
            </a>{' '}
            represents an early interface into this system—a practical way to
            demonstrate the platform's capabilities. It is a starting point, not
            the final form.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            The broader vision is a{' '}
            <strong className="text-primary-700">language-agnostic refactoring engine</strong>{' '}
            that integrates seamlessly into developer workflows and CI/CD pipelines.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Mission
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-4 font-medium">
            Refactron is built for teams maintaining long-lived systems where{' '}
            <strong className="text-primary-700">correctness, safety, and confidence</strong>{' '}
            matter more than novelty.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            It does not replace developers or code reviews—it amplifies them.
          </p>
          <p className="text-lg sm:text-xl text-gray-800 font-semibold">
            Our goal is simple: make large-scale refactoring{' '}
            <span className="text-primary-600">safe, repeatable, and boring</span>—so
            engineering teams can focus on building, not fighting their codebases.
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="https://pypi.org/project/refactron/"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            <span>Try Refactron Library</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://docs.refactron.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>View Documentation</span>
          </a>
        </div>

        {/* Contact Section */}
        <div className="text-center text-gray-600">
          <p className="text-base sm:text-lg">
            Questions or want to learn more?{' '}
            <a
              href="mailto:hello@refactron.dev"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Get in touch with us
            </a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutPage;
