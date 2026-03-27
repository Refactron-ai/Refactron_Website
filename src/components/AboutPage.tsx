import React, { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { SafariMockup } from './ui/safari-mockup';
import CardSwap, { Card } from './ui/card-swap';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const safetyConstraints = [
  {
    num: '01',
    title: 'Read-only analysis by default',
    description: 'No changes are made without explicit approval.',
  },
  {
    num: '02',
    title: 'Human-in-the-loop refactoring',
    description: 'Every change requires explicit approval from developers.',
  },
  {
    num: '03',
    title: 'Verification to preserve behavior',
    description: 'Automated checks ensure functional equivalence.',
  },
  {
    num: '04',
    title: 'Small, incremental changes',
    description: 'Targeted improvements instead of large rewrites.',
  },
  {
    num: '05',
    title: 'Rollback support',
    description: 'Clear documentation and easy reversal for every change.',
  },
];

const AboutPage: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

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

  return (
    <div className="relative bg-black font-space antialiased overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
        {/* Line grid — visible in center, fades on all four sides */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            maskImage: `
              radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)
            `,
            WebkitMaskImage: `
              radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 75%)
            `,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1]">
                About Refactron
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide">
                A safety-first refactoring engine for evolving real-world
                codebases through structured, incremental, and
                behavior-preserving transformations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── The Problem ──────────────────────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden bg-grid-white/[0.02]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tight font-space leading-[1.1]">
                  The Problem
                </h2>
                <p className="text-base md:text-lg text-neutral-400 font-space leading-loose">
                  Most production codebases carry significant technical debt,
                  but refactoring them is often avoided.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  'Manual refactoring is slow, expensive, and risky',
                  'Automated tools focus on generation without guaranteeing correctness',
                  'Teams postpone structural improvements, making codebases harder to maintain',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-neutral-500 font-space"
                  >
                    <span className="mt-0.5 text-neutral-600 flex-shrink-0">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 hidden lg:block"
            >
              <div className="rounded-3xl border border-white/[0.08] overflow-hidden">
                <SafariMockup
                  url="legacy-codebase.example.com"
                  className="h-[380px]"
                >
                  <div className="p-8 space-y-4 font-mono text-sm">
                    <div className="text-rose-400">
                      &gt; ERROR: CircularDependencyDetected
                    </div>
                    <div className="text-neutral-500">
                      &gt; module_a imports module_b
                    </div>
                    <div className="text-neutral-500">
                      &gt; module_b imports module_a
                    </div>
                    <div className="text-amber-500 mt-4">
                      &gt; WARNING: DuplicatedCode
                    </div>
                    <div className="text-neutral-500">
                      &gt; 847 lines duplicated across 12 files
                    </div>
                    <div className="text-amber-500 mt-4">
                      &gt; WARNING: HighComplexity
                    </div>
                    <div className="text-neutral-500">
                      &gt; cyclomatic_complexity: 28 (threshold: 10)
                    </div>
                    <div className="text-neutral-400 mt-4">
                      &gt; test_coverage: 38%
                    </div>
                    <div className="text-rose-400 mt-4">
                      &gt; technical_debt_ratio: HIGH
                    </div>
                  </div>
                </SafariMockup>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Our Approach ─────────────────────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden bg-grid-white/[0.02]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 hidden lg:block order-2 lg:order-1"
            >
              <div className="rounded-3xl border border-white/[0.08] overflow-hidden">
                <SafariMockup
                  url="refactron.dev/analysis"
                  className="h-[380px]"
                >
                  <div className="p-8 space-y-4 font-mono text-sm">
                    <div className="text-emerald-400">
                      &gt; analyzing_codebase...
                    </div>
                    <div className="text-neutral-400">
                      &gt; dependency_graph: built
                    </div>
                    <div className="text-neutral-400">
                      &gt; architectural_patterns: detected
                    </div>
                    <div className="text-sky-400 mt-4">
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
                    <div className="text-emerald-400 mt-4">
                      &gt; verification: passed
                    </div>
                    <div className="text-neutral-400">
                      &gt; tests: all_green ✓
                    </div>
                    <div className="text-sky-400 mt-4">
                      &gt; ready_for_review
                    </div>
                  </div>
                </SafariMockup>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 space-y-8 order-1 lg:order-2"
            >
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tight font-space leading-[1.1]">
                  Our Approach
                </h2>
                <p className="text-base md:text-lg text-neutral-400 font-space leading-loose">
                  Refactoring as a structured engineering process, not a
                  one-shot automation problem.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  'Analyzes code structure and identifies targeted improvements',
                  'Proposes incremental refactors that preserve existing behavior',
                  'Makes refactoring predictable, reviewable, and safe',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-neutral-500 font-space"
                  >
                    <span className="mt-0.5 text-neutral-600 flex-shrink-0">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── What "Safe" Means ────────────────────────────────────────────── */}
      <section className="relative w-full py-24 bg-grid-white/[0.02]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section header */}
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-16"
          >
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1]">
                What Safe Means
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-10">
              <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide">
                Safety is not a claim — it's a set of constraints Refactron is
                built around.
              </p>
            </div>
          </motion.div>

          {/* CardSwap layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: active constraint list */}
            <motion.div {...fadeUp} className="space-y-6 lg:py-8">
              {safetyConstraints.map((c, i) => (
                <motion.div
                  key={c.num}
                  animate={{ opacity: activeCardIndex === i ? 1 : 0.25 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-2 cursor-default"
                >
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex items-start gap-4 pt-2">
                    <span className="font-mono text-xs text-neutral-600 mt-1 flex-shrink-0">
                      {c.num}
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-white font-space leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-sm text-neutral-500 font-space leading-relaxed mt-1">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="h-px bg-white/[0.06]" />
            </motion.div>

            {/* Right: CardSwap — relative container sized to fit the stack */}
            <div
              className="hidden lg:block relative"
              style={{ minHeight: 620 }}
            >
              <CardSwap
                width={450}
                height={320}
                cardDistance={45}
                verticalDistance={55}
                delay={4000}
                pauseOnHover={true}
                skewAmount={3}
                easing="elastic"
                onActiveCardChange={setActiveCardIndex}
              >
                <Card>
                  <div className="p-6 font-mono text-sm h-full flex flex-col gap-2">
                    <div className="text-neutral-500 mb-2">$ analyze.sh</div>
                    <div className="text-emerald-400">→ Read-only mode: ON</div>
                    <div className="text-neutral-400">
                      → Scanning 847 files...
                    </div>
                    <div className="text-neutral-400">
                      → No changes written to disk
                    </div>
                    <div className="text-emerald-400 mt-auto">
                      → Analysis complete ✓
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-6 font-mono text-sm h-full flex flex-col gap-2">
                    <div className="text-neutral-500 mb-2">$ refactor.sh</div>
                    <div className="text-sky-400">
                      → 3 refactor proposals ready
                    </div>
                    <div className="text-neutral-400">
                      → Awaiting your approval...
                    </div>
                    <div className="text-neutral-400">
                      [y] extract_interface: UserService
                    </div>
                    <div className="text-emerald-400 mt-auto">
                      → Change applied ✓
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-6 font-mono text-sm h-full flex flex-col gap-2">
                    <div className="text-neutral-500 mb-2">$ verify.sh</div>
                    <div className="text-sky-400">
                      → Running behavior checks...
                    </div>
                    <div className="text-neutral-400">
                      → Snapshot comparison: passed
                    </div>
                    <div className="text-neutral-400">
                      → Test suite: 142/142 ✓
                    </div>
                    <div className="text-emerald-400 mt-auto">
                      → Semantic equivalence: confirmed ✓
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-6 font-mono text-sm h-full flex flex-col gap-2">
                    <div className="text-neutral-500 mb-2">
                      $ incremental.sh
                    </div>
                    <div className="text-sky-400">
                      → Scope: 1 class, 3 methods
                    </div>
                    <div className="text-neutral-400">
                      → Lines changed: +12 / -8
                    </div>
                    <div className="text-neutral-400">
                      → No cross-module side effects
                    </div>
                    <div className="text-emerald-400 mt-auto">
                      → Safe to apply ✓
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="p-6 font-mono text-sm h-full flex flex-col gap-2">
                    <div className="text-neutral-500 mb-2">$ rollback.sh</div>
                    <div className="text-sky-400">
                      → Reverting changeset abc123...
                    </div>
                    <div className="text-neutral-400">→ Files restored: 3</div>
                    <div className="text-neutral-400">→ State: clean ✓</div>
                    <div className="text-emerald-400 mt-auto">
                      → Rollback complete in 0.3s
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why We're Building Refactron ─────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden bg-grid-white/[0.02]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-12 md:p-16 overflow-hidden"
          >
            {/* Decorative large quote mark */}
            <div
              className="absolute top-6 right-10 text-[12rem] leading-none font-serif text-white/[0.03] select-none pointer-events-none"
              aria-hidden="true"
            >
              "
            </div>

            {/* Left accent bar */}
            <div className="absolute left-0 top-12 bottom-12 w-[3px] rounded-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl font-semibold text-white tracking-tight font-space leading-[1.1]"
                >
                  Why We're Building Refactron
                </motion.h2>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-8">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base md:text-lg text-neutral-400 font-space leading-relaxed"
                >
                  We've worked with long-lived, real-world codebases where
                  refactoring was necessary but often deferred because existing
                  tools didn't feel safe or trustworthy. Refactron is being
                  built to fill that gap — to make code evolution boring,
                  predictable, and repeatable, so teams can improve their
                  systems with confidence instead of fear.
                </motion.p>

                {/* Three pillars */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {[
                    {
                      label: 'Boring by design',
                      sub: 'No surprises. Ever.',
                    },
                    {
                      label: 'Predictable',
                      sub: 'Every change is traceable.',
                    },
                    {
                      label: 'Repeatable',
                      sub: 'Works the same way, always.',
                    },
                  ].map(p => (
                    <div
                      key={p.label}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
                    >
                      <div className="text-sm font-medium text-white font-space mb-1">
                        {p.label}
                      </div>
                      <div className="text-xs text-neutral-500 font-space">
                        {p.sub}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact ──────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="text-xl text-neutral-300 font-space font-light">
              Questions or want to learn more?
            </p>
            <a
              href="mailto:hello@refactron.dev"
              className="inline-block px-8 py-4 bg-transparent border border-white/10 text-white rounded-xl hover:bg-white/5 hover:border-white/20 transition-all font-medium font-space"
            >
              Get in touch with us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
