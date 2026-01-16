import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  FileCode,
  GitBranch,
  Lock,
  Eye,
  RotateCcw,
  FileText,
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

import { motion } from 'framer-motion';
import { LampContainer } from './ui/lamp';
import { LightRays } from './ui/light-rays';
import { SafariMockup } from './ui/safari-mockup';
import CardSwap, { Card } from './ui/card-swap';
import Orb from './ui/orb';
import TextType from './ui/text-type';

const AboutPage: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // SEO Configuration
  useSEO({
    title: 'About Refactron | Safety-First Refactoring Engine',
    description:
      'Refactron is a safety-first refactoring engine for evolving real-world codebases through structured, incremental, and behavior-preserving transformations.',
    keywords:
      'safe refactoring, code evolution, technical debt, behavior-preserving transformation, incremental refactoring, code maintainability',
    ogTitle: 'About Refactron | Safety-First Refactoring Engine',
    ogDescription:
      'A safety-first refactoring engine for evolving real-world codebases with confidence.',
    canonical: 'https://refactron.dev/about',
    robots: 'index, follow',
  });

  const safetyConstraints = [
    {
      icon: Eye,
      title: 'Read-only analysis by default',
      description: 'No changes are made without explicit approval',
    },
    {
      icon: CheckCircle2,
      title: 'Human-in-the-loop refactoring',
      description: 'Every change requires explicit approval from developers',
    },
    {
      icon: Shield,
      title: 'Verification to preserve behavior',
      description: 'Automated checks ensure functional equivalence',
    },
    {
      icon: GitBranch,
      title: 'Small, incremental changes',
      description: 'Targeted improvements instead of large rewrites',
    },
    {
      icon: RotateCcw,
      title: 'Rollback support',
      description: 'Clear documentation and easy reversal for every change',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black font-space">
      {/* Light Rays Background */}
      <LightRays
        count={10}
        color="rgba(255, 255, 255, 0.12)"
        blur={40}
        speed={16}
        length="80vh"
      />
      {/* Hero Section with Lamp Effect */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-8 bg-gradient-to-br from-neutral-300 to-neutral-500 py-4 bg-clip-text text-center text-5xl md:text-7xl font-light tracking-tight text-transparent"
        >
          About Refactron
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-neutral-300 font-light max-w-3xl mx-auto mt-4 text-center px-4"
        >
          A safety-first refactoring engine for evolving real-world codebases.
        </motion.p>
      </LampContainer>

      <div className="relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          {/* Main Content */}
          <div className="space-y-12 sm:space-y-16">
            {/* The Problem */}
            <section className="min-h-[600px] flex items-center justify-center py-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-20%' }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight font-space leading-[1.1]">
                      The Problem
                    </h2>
                    <p className="text-xl text-neutral-400 font-space leading-relaxed max-w-lg">
                      Most production codebases carry significant technical
                      debt, but refactoring them is often avoided.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-neutral-400 font-space text-base">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      Manual refactoring is slow, expensive, and risky
                    </li>
                    <li className="flex items-start gap-3 text-neutral-400 font-space text-base">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      Automated tools focus on generation without guaranteeing
                      correctness
                    </li>
                    <li className="flex items-start gap-3 text-neutral-400 font-space text-base">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      Teams postpone structural improvements, making codebases
                      harder to maintain
                    </li>
                  </ul>
                </motion.div>

                {/* Right - Safari Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-20%' }}
                  className="hidden lg:block"
                >
                  <SafariMockup
                    url="legacy-codebase.example.com"
                    className="h-[400px]"
                  >
                    <div className="p-8 space-y-4 font-mono text-sm">
                      <div className="text-red-400">
                        &gt; ERROR: CircularDependencyDetected
                      </div>
                      <div className="text-neutral-500">
                        &gt; module_a imports module_b
                      </div>
                      <div className="text-neutral-500">
                        &gt; module_b imports module_a
                      </div>
                      <div className="text-yellow-500 mt-4">
                        &gt; WARNING: DuplicatedCode
                      </div>
                      <div className="text-neutral-500">
                        &gt; 847 lines duplicated across 12 files
                      </div>
                      <div className="text-yellow-500 mt-4">
                        &gt; WARNING: HighComplexity
                      </div>
                      <div className="text-neutral-500">
                        &gt; cyclomatic_complexity: 28 (threshold: 10)
                      </div>
                      <div className="text-neutral-400 mt-4">
                        &gt; test_coverage: 38%
                      </div>
                      <div className="text-red-400 mt-4">
                        &gt; technical_debt_ratio: HIGH
                      </div>
                    </div>
                  </SafariMockup>
                </motion.div>
              </div>
            </section>

            {/* Our Approach */}
            <section className="min-h-[600px] flex items-center justify-center py-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
                {/* Left - Safari Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-20%' }}
                  className="hidden lg:block"
                >
                  <SafariMockup
                    url="refactron.dev/analysis"
                    className="h-[400px]"
                  >
                    <div className="p-8 space-y-4 font-mono text-sm">
                      <div className="text-green-400">
                        &gt; analyzing_codebase...
                      </div>
                      <div className="text-neutral-400">
                        &gt; dependency_graph: built
                      </div>
                      <div className="text-neutral-400">
                        &gt; architectural_patterns: detected
                      </div>
                      <div className="text-cyan-400 mt-4">
                        &gt; refactor_opportunity_found:
                      </div>
                      <div className="text-neutral-500 ml-4">
                        &gt; type: extract_interface
                      </div>
                      <div className="text-neutral-500 ml-4">
                        &gt; impact: low_risk
                      </div>
                      <div className="text-neutral-500 ml-4">
                        &gt; benefit: reduces_coupling
                      </div>
                      <div className="text-green-400 mt-4">
                        &gt; verification: passed
                      </div>
                      <div className="text-neutral-400">
                        &gt; tests: all_green ✓
                      </div>
                      <div className="text-cyan-400 mt-4">
                        &gt; ready_for_review
                      </div>
                    </div>
                  </SafariMockup>
                </motion.div>

                {/* Right Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-20%' }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight font-space leading-[1.1]">
                      Our Approach
                    </h2>
                    <p className="text-xl text-neutral-400 font-space leading-relaxed max-w-lg">
                      Refactoring as a structured engineering process, not a
                      one-shot automation problem.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-neutral-400 font-space text-base">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      Analyzes code structure and identifies targeted
                      improvements
                    </li>
                    <li className="flex items-start gap-3 text-neutral-400 font-space text-base">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      Proposes incremental refactors that preserve existing
                      behavior
                    </li>
                    <li className="flex items-start gap-3 text-neutral-400 font-space text-base">
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      Makes refactoring predictable, reviewable, and safe
                    </li>
                  </ul>
                </motion.div>
              </div>
            </section>

            {/* What "Safe" Means */}
            <section className="min-h-screen flex flex-col items-center justify-center py-20 relative">
              {/* Centered Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="text-center mb-16 max-w-3xl"
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight font-space leading-[1.1] mb-4">
                  What Safe Means
                </h2>
                <p className="text-xl text-neutral-400 font-space leading-relaxed">
                  Safety is not a claim—it's a set of constraints Refactron is
                  built around.
                </p>
              </motion.div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
                {/* Left - Active Constraint Info */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-20%' }}
                  className="space-y-8 z-10"
                >
                  {/* Active Constraint */}
                  <motion.div
                    key={activeCardIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeOut',
                    }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-neutral-400 tracking-wider">
                        0{activeCardIndex + 1}
                      </span>
                      <div className="h-[1px] w-full max-w-[600px] bg-neutral-800" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-normal text-white">
                      {safetyConstraints[activeCardIndex].title}
                    </h3>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {safetyConstraints[activeCardIndex].description}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Right - Card Swap */}
                <div className="hidden lg:block relative h-[600px]">
                  <CardSwap
                    width={450}
                    height={350}
                    cardDistance={50}
                    verticalDistance={60}
                    delay={4000}
                    pauseOnHover={true}
                    skewAmount={4}
                    easing="elastic"
                    onActiveCardChange={setActiveCardIndex}
                  >
                    <Card key={0} className="p-0 overflow-hidden">
                      {/* Read-only analysis by default */}
                      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-neutral-500 ml-2">
                          analyze.sh
                        </span>
                      </div>
                      <div className="p-8 bg-black font-mono text-sm space-y-2">
                        <div className="text-green-400">
                          $ refactron analyze src/
                        </div>
                        <div className="text-green-400">
                          ✔ Scanned 142 files
                        </div>
                        <div className="text-green-400">
                          ✔ Detected 37 refactoring opportunities
                        </div>
                        <div className="text-green-400">
                          ✔ High-risk changes: 0
                        </div>
                        <div className="text-green-400">
                          ✔ No code changes applied
                        </div>
                      </div>
                    </Card>

                    <Card key={1} className="p-0 overflow-hidden">
                      {/* Human-in-the-loop refactoring */}
                      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-neutral-500 ml-2">
                          refactor.sh
                        </span>
                      </div>
                      <div className="p-8 bg-black font-mono text-sm space-y-2">
                        <div className="text-green-400">
                          $ refactron refactor src/
                        </div>
                        <div className="text-cyan-400">
                          → Extract duplicated logic in auth/utils.py
                        </div>
                        <div className="text-cyan-400">
                          → Simplify nested conditionals in payments/service.py
                        </div>
                        <div className="text-green-400">
                          ✔ Suggestions generated
                        </div>
                        <div className="text-green-400">
                          ✔ No changes applied
                        </div>
                      </div>
                    </Card>

                    <Card key={2} className="p-0 overflow-hidden">
                      {/* Verification to preserve behavior */}
                      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-neutral-500 ml-2">
                          autofix.sh
                        </span>
                      </div>
                      <div className="p-8 bg-black font-mono text-sm space-y-2">
                        <div className="text-green-400">
                          $ refactron autofix --safe
                        </div>
                        <div className="text-green-400">
                          ✔ Applied 12 low-risk refactors
                        </div>
                        <div className="text-green-400">
                          ✔ Behavior preserved
                        </div>
                        <div className="text-green-400">
                          ✔ Changes staged for review
                        </div>
                        <div className="text-neutral-500 mt-4">
                          $ refactron metrics
                        </div>
                        <div className="text-cyan-400">
                          ✔ Complexity reduced: 18%
                        </div>
                        <div className="text-cyan-400">
                          ✔ Duplication reduced: 22%
                        </div>
                      </div>
                    </Card>

                    <Card key={3} className="p-0 overflow-hidden">
                      {/* Small, incremental changes */}
                      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-neutral-500 ml-2">
                          incremental.sh
                        </span>
                      </div>
                      <div className="p-8 bg-black font-mono text-sm space-y-2">
                        <div className="text-green-400">
                          $ refactron autofix --safe
                        </div>
                        <div className="text-green-400">
                          ✔ Applied 12 incremental refactors
                        </div>
                        <div className="text-green-400">
                          ✔ Files modified: 7
                        </div>
                        <div className="text-green-400">
                          ✔ Large rewrites avoided
                        </div>
                      </div>
                    </Card>

                    <Card key={4} className="p-0 overflow-hidden">
                      {/* Rollback support */}
                      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs font-mono text-neutral-500 ml-2">
                          rollback.sh
                        </span>
                      </div>
                      <div className="p-8 bg-black font-mono text-sm space-y-2">
                        <div className="text-green-400">$ refactron report</div>
                        <div className="text-green-400">
                          ✔ Generated refactor-report.md
                        </div>
                        <div className="text-green-400">
                          ✔ Included rationale and before/after diffs
                        </div>
                        <div className="text-neutral-500 mt-4">
                          $ refactron rollback
                        </div>
                        <div className="text-green-400">
                          ✔ All changes reverted successfully
                        </div>
                      </div>
                    </Card>
                  </CardSwap>
                </div>
              </div>
            </section>

            {/* Why We're Building Refactron */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-7xl mx-auto h-[600px] rounded-3xl overflow-hidden mt-60 md:mt-96 border border-white/10 bg-neutral-900/50"
            >
              <div className="absolute inset-0 bg-black opacity-60">
                <Orb
                  hue={0}
                  hoverIntensity={0.2}
                  rotateOnHover={true}
                  backgroundColor="#000000"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-tight font-space">
                  Why We're Building Refactron
                </h2>
                <div className="text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto font-space min-h-[120px]">
                  <TextType
                    text="We've worked with long-lived, real-world codebases where refactoring was necessary but often deferred because existing tools didn't feel safe or trustworthy. Refactron is being built to fill that gap—to make code evolution boring, predictable, and repeatable, so teams can improve their systems with confidence instead of fear."
                    typingSpeed={50}
                    deletingSpeed={0}
                    loop={false}
                    showCursor={true}
                    cursorClassName="bg-neutral-500 w-1 h-6 inline-block align-middle ml-1"
                  />
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center text-neutral-400"
            >
              <p className="text-lg">
                Questions or want to learn more?{' '}
                <a
                  href="mailto:hello@refactron.dev"
                  className="text-white hover:text-neutral-300 font-semibold underline"
                >
                  Get in touch with us
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
