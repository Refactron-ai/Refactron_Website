import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Check, Linkedin } from 'lucide-react';
import XIcon from '../icons/XIcon';

const FOUNDER_X_HREF = 'https://x.com/OSherikar';
const FOUNDER_LINKEDIN_HREF = 'https://www.linkedin.com/in/omsherikar0229/';
/** Founder portrait in public/Profile/ */
const FOUNDER_PORTRAIT_SRC = '/Profile/Om_Sherikar.png';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const eyebrow =
  'text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 mb-4';

const panelSurface =
  'relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-black/60 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04]';

const panelInnerGlow =
  'pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl';

const safetyConstraints = [
  {
    num: '01',
    title: 'Read-only analysis by default',
    description: 'No changes are made without explicit approval.',
    outcomeLabel: 'Read-only first',
    outcome:
      'Scan and understand the codebase first. Nothing is written until you choose to apply a change.',
  },
  {
    num: '02',
    title: 'Human-in-the-loop refactoring',
    description: 'Every change requires explicit approval from developers.',
    outcomeLabel: 'You approve every change',
    outcome:
      'You review proposals like any other PR. Nothing lands without your sign-off.',
  },
  {
    num: '03',
    title: 'Verification to preserve behavior',
    description: 'Automated checks ensure functional equivalence.',
    outcomeLabel: 'Proof, not hope',
    outcome:
      'Checks run against your tests and invariants so you see evidence before merge.',
  },
  {
    num: '04',
    title: 'Small, incremental changes',
    description: 'Targeted improvements instead of large rewrites.',
    outcomeLabel: 'Small, reviewable steps',
    outcome: 'Each step stays scoped and clear instead of one risky sweep.',
  },
  {
    num: '05',
    title: 'Rollback support',
    description: 'Clear documentation and easy reversal for every change.',
    outcomeLabel: 'Walk it back',
    outcome: 'Undo a changeset quickly when you need to reverse course.',
  },
];

type DigestSeverity = 'error' | 'warning' | 'info';

const problemDigestRows: {
  severity: DigestSeverity;
  title: string;
  detail: string;
}[] = [
  {
    severity: 'error',
    title: 'Circular dependency',
    detail: 'module_a imports module_b; module_b imports module_a.',
  },
  {
    severity: 'warning',
    title: 'Duplicated code',
    detail: '847 lines duplicated across 12 files.',
  },
  {
    severity: 'warning',
    title: 'High complexity',
    detail: 'Cyclomatic complexity 28 (threshold 10).',
  },
  {
    severity: 'info',
    title: 'Test coverage',
    detail: '38% overall.',
  },
  {
    severity: 'error',
    title: 'Technical debt',
    detail: 'Overall risk flagged as high.',
  },
];

const approachSteps: { title: string; detail: string }[] = [
  {
    title: 'Analyze the codebase',
    detail: 'Structure and dependencies are mapped without modifying files.',
  },
  {
    title: 'Detect patterns',
    detail: 'Architectural patterns and hotspots surface as readable findings.',
  },
  {
    title: 'Refactor opportunity',
    detail:
      'Example: extract an interface (low risk) to reduce coupling between modules.',
  },
  {
    title: 'Verification',
    detail: 'Behavior checks pass, including your existing test suite.',
  },
  {
    title: 'Ready for review',
    detail: 'You get a clear diff and rationale before anything ships.',
  },
];

const severityChipClass: Record<DigestSeverity, string> = {
  error: 'border-rose-500/25 bg-rose-500/10 text-rose-300/95',
  warning: 'border-amber-500/25 bg-amber-500/10 text-amber-200/95',
  info: 'border-sky-500/25 bg-sky-500/10 text-sky-200/95',
};

const severityLabel: Record<DigestSeverity, string> = {
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
};

const AboutPage: React.FC = () => {
  useSEO({
    title: 'About Refactron | Safety-First Refactoring Engine',
    description:
      'Every codebase has code nobody wants to touch. Refactron exists to change that: refactoring legacy code with verification so you know nothing broke.',
    keywords:
      'safe refactoring, code evolution, technical debt, behavior-preserving transformation, incremental refactoring, code maintainability',
    ogTitle: 'About Refactron | Safety-First Refactoring Engine',
    ogDescription:
      'Every codebase has code nobody wants to touch. Built to refactor the old code and prove it stayed safe.',
    canonical: 'https://refactron.dev/about',
    robots: 'index, follow',
  });

  return (
    <div className="relative bg-black font-space antialiased overflow-x-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,rgba(255,255,255,0.07),transparent_55%)]"
          aria-hidden
        />
        {/* Line grid - visible in center, fades on all four sides */}
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
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 lg:py-0">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-end"
          >
            <div className="lg:col-span-7 space-y-6">
              <p className={eyebrow}>My story</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight font-space leading-[1.08]">
                <span className="bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-transparent">
                  About Refactron
                </span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pl-6 xl:pl-10">
              <div className="h-px w-12 bg-gradient-to-r from-white/45 to-transparent mb-6 hidden lg:block" />
              <p className="text-base md:text-lg text-neutral-400 font-space leading-relaxed">
                Every codebase has code nobody wants to touch.{' '}
                <span className="text-neutral-200">
                  I built Refactron to change that.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Founder ───────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 lg:py-28 bg-black border-t border-white/[0.06]">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            {...fadeUp}
            className={`${panelSurface} p-8 md:p-10 lg:p-12`}
          >
            <div className={panelInnerGlow} aria-hidden />
            <div className="relative grid gap-10 md:gap-12 md:grid-cols-[minmax(0,13.5rem)_1fr] md:items-start">
              <figure className="mx-auto w-full max-w-[216px] shrink-0 md:mx-0 md:max-w-none">
                <div className="relative isolate mx-auto w-full max-w-[216px] md:max-w-none">
                  {/* Soft outer glow */}
                  <div
                    className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14)_0%,transparent_68%)] blur-2xl opacity-90"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -inset-4 rounded-3xl shadow-[0_0_52px_-8px_rgba(255,255,255,0.28),0_0_100px_-28px_rgba(255,255,255,0.12)]"
                    aria-hidden
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black aspect-[4/5] shadow-[0_12px_48px_-12px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.06]">
                    <img
                      src={FOUNDER_PORTRAIT_SRC}
                      alt="Portrait of Om Sherikar, founder of Refactron"
                      className="h-full w-full object-cover object-[center_32%] scale-[1.14]"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Vignette: hide wall / frame at edges; keeps subject readable */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_74%_at_50%_42%,transparent_26%,rgba(0,0,0,0.55)_62%,rgb(0,0,0)_100%)]"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.08]"
                      aria-hidden
                    />
                  </div>
                </div>
                <figcaption className="sr-only">
                  Om Sherikar, founder of Refactron.
                </figcaption>
              </figure>

              <div className="space-y-8 min-w-0">
                <div className="space-y-3">
                  <p className={eyebrow}>Founder</p>
                  <h2 className="text-3xl md:text-4xl font-semibold text-white font-space tracking-tight">
                    Built by Om Sherikar
                  </h2>
                  <p className="text-neutral-400 font-space leading-relaxed">
                    Second year B.Tech IT student at RGIPT Amethi. Solo founder.
                    Building in public.
                  </p>
                </div>
                <div className="space-y-5 text-base md:text-lg text-neutral-400 font-space leading-relaxed">
                  <p>
                    I watched a team avoid an entire part of their codebase at a
                    hackathon because nobody wanted to risk breaking it. That
                    moment stuck with me. I could not find a tool that would
                    actually go in, fix the legacy code, and prove nothing
                    broke.
                  </p>
                  <p className="text-neutral-200 font-medium">
                    So I built one.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {[
                    '3,500+ PyPI downloads',
                    'No paid marketing',
                    'Industry beta users',
                    'India Ascends · Lightspeed',
                    'F6S founder grant',
                  ].map(label => (
                    <li
                      key={label}
                      className="text-xs md:text-sm text-neutral-400 font-space px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-black/40"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={FOUNDER_X_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white font-space hover:bg-white/[0.08] hover:border-white/20 transition-colors"
                  >
                    <XIcon className="w-4 h-4 shrink-0" aria-hidden />
                    Follow on X
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white font-space hover:bg-white/[0.07] hover:border-white/20 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 shrink-0" aria-hidden />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
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
              className="lg:col-span-6 space-y-8 order-1"
            >
              <div className="space-y-4">
                <p className={eyebrow}>Context</p>
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
                    className="flex items-start gap-3 text-sm text-neutral-400 font-space leading-relaxed"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-neutral-300">
                      <Check className="h-3 w-3 stroke-[2.5]" aria-hidden />
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
              className="lg:col-span-6 mt-10 lg:mt-0 order-2"
            >
              <div
                className={`${panelSurface} min-h-[320px] lg:min-h-[380px] p-6 md:p-8 flex flex-col`}
              >
                <div className={panelInnerGlow} aria-hidden />
                <div className="relative flex items-center gap-2 mb-6">
                  <span
                    className="h-2 w-2 rounded-full bg-rose-400/90 shadow-[0_0_12px_rgba(251,113,133,0.45)]"
                    aria-hidden
                  />
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Sample health digest
                  </p>
                </div>
                <div className="relative space-y-3 flex-1">
                  {problemDigestRows.map(row => (
                    <div
                      key={row.title}
                      className="rounded-xl border border-white/[0.06] bg-black/50 px-4 py-3 backdrop-blur-sm transition-colors hover:border-white/[0.12]"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${severityChipClass[row.severity]}`}
                        >
                          {severityLabel[row.severity]}
                        </span>
                        <span className="text-sm font-medium text-white font-space">
                          {row.title}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 font-space leading-snug">
                        {row.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── My Approach ───────────────────────────────────────────────────── */}
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
              className="lg:col-span-6 mt-10 lg:mt-0 order-2 lg:order-1"
            >
              <div
                className={`${panelSurface} min-h-[320px] lg:min-h-[380px] p-6 md:p-8 flex flex-col`}
              >
                <div className={panelInnerGlow} aria-hidden />
                <div className="relative flex items-center gap-2 mb-6">
                  <span
                    className="h-2 w-2 rounded-full bg-neutral-300 shadow-[0_0_14px_rgba(255,255,255,0.2)]"
                    aria-hidden
                  />
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Structured analysis run
                  </p>
                </div>
                <ol className="relative space-y-5 flex-1 list-none m-0 p-0">
                  {approachSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-xs font-semibold text-neutral-300 font-space tabular-nums shadow-[0_0_24px_-10px_rgba(255,255,255,0.15)]"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-sm font-medium text-white font-space leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-sm text-neutral-500 font-space leading-relaxed mt-1">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
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
                <p className={eyebrow}>How I think about it</p>
                <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tight font-space leading-[1.1]">
                  My Approach
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
                    className="flex items-start gap-3 text-sm text-neutral-400 font-space leading-relaxed"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-neutral-300">
                      <Check className="h-3 w-3 stroke-[2.5]" aria-hidden />
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
            className="mb-12 lg:mb-14 max-w-3xl space-y-5"
          >
            <p className={eyebrow}>Principles</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight font-space leading-[1.08]">
              <span className="bg-gradient-to-br from-white via-white to-neutral-500 bg-clip-text text-transparent">
                What Safe Means
              </span>
            </h2>
            <p className="text-base md:text-lg text-neutral-400 font-space leading-relaxed">
              Safety is not a claim: it&apos;s a set of constraints I built
              Refactron around.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          >
            {safetyConstraints.map((c, i) => {
              const isLast = i === safetyConstraints.length - 1;
              return (
                <div
                  key={c.num}
                  className={
                    isLast
                      ? 'md:col-span-2 flex justify-center pt-1'
                      : undefined
                  }
                >
                  <div
                    className={`group relative w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-black/50 p-6 lg:p-7 transition-all duration-300 hover:border-white/[0.16] hover:shadow-[0_0_48px_-18px_rgba(255,255,255,0.08)] ${isLast ? 'max-w-lg' : ''}`}
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70"
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <span className="text-[11px] font-semibold text-neutral-500 tabular-nums tracking-wider font-space">
                        {c.num}
                      </span>
                      <span className="text-right text-[11px] font-medium uppercase tracking-wider text-neutral-500 font-space">
                        {c.outcomeLabel}
                      </span>
                    </div>
                    <h3 className="relative mt-5 text-lg font-semibold text-white font-space leading-snug">
                      {c.title}
                    </h3>
                    <p className="relative mt-2 text-sm text-neutral-500 font-space leading-relaxed">
                      {c.description}
                    </p>
                    <div className="relative mt-5 border-t border-white/[0.06] pt-5">
                      <p className="text-sm text-neutral-400 font-space leading-relaxed">
                        {c.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Why I'm Building Refactron ───────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden bg-grid-white/[0.02]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative ${panelSurface} p-12 md:p-16`}
          >
            <div
              className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]"
              aria-hidden
            />
            {/* Decorative large quote mark */}
            <div
              className="absolute top-6 right-10 text-[12rem] leading-none font-serif text-white/[0.03] select-none pointer-events-none"
              aria-hidden="true"
            >
              "
            </div>

            {/* Left accent bar */}
            <div className="absolute left-0 top-12 bottom-12 w-[3px] rounded-full bg-gradient-to-b from-transparent via-white/25 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-5">
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl font-semibold tracking-tight font-space leading-[1.1]"
                >
                  <span className="bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-transparent">
                    Why I&apos;m Building Refactron
                  </span>
                </motion.h2>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-6">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base md:text-lg text-neutral-400 font-space leading-relaxed"
                >
                  I built Refactron because the tools that existed could find
                  legacy code or generate new code but none of them could
                  actually refactor the old code and prove it was safe.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="text-base md:text-lg text-neutral-400 font-space leading-relaxed"
                >
                  That gap bothered me enough that I could not leave it alone.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact ──────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 bg-black border-t border-white/[0.06]">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="text-xl text-neutral-300 font-space font-light">
              Questions or want to learn more?
            </p>
            <a
              href="https://cal.com/omsherikar/queries-refactron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/15 bg-white/[0.06] text-white font-medium font-space shadow-[0_0_40px_-12px_rgba(255,255,255,0.08)] hover:bg-white/10 hover:border-white/25 transition-all"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
