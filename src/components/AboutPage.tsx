import React from 'react';
import useSEO from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import XIcon from '../icons/XIcon';

const FOUNDER_X_HREF = 'https://x.com/OSherikar';
const FOUNDER_LINKEDIN_HREF = 'https://www.linkedin.com/in/omsherikar0229/';
/** Founder portrait in public/Profile/ */
const FOUNDER_PORTRAIT_SRC = '/Profile/Om_Sherikar.png';

/* ─── Shared style tokens ─────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const eyebrow =
  'text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500';

/* Card recipe matching Workflow / WhatWeDo / Comparison / Quickstart. */
const cardChrome =
  'relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.012]';

/* Section-level top/bottom black fade overlays. */
const sectionFades = (
  <>
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
  </>
);

/* Inline static dot-grid backdrop matching the rest of the site. */
const DotGridBackdrop: React.FC<{ opacity?: number }> = ({
  opacity = 0.35,
}) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage:
        'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
      backgroundSize: '18px 18px',
    }}
  />
);

/* ─── Data ────────────────────────────────────────────────────── */

const identityFields: { key: string; value: string }[] = [
  { key: 'role', value: 'founder · solo' },
  { key: 'building', value: 'refactron · v0.5.x' },
];

const receipts: string[] = [
  '3,500+ PyPI downloads',
  'No paid marketing',
  'Industry beta users',
  'India Ascends · Lightspeed',
  'F6S founder grant',
];

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

type DigestSeverity = 'err' | 'warn' | 'info';

const problemDigestRows: {
  severity: DigestSeverity;
  title: string;
  detail: string;
}[] = [
  {
    severity: 'err',
    title: 'Circular dependency',
    detail: 'module_a imports module_b; module_b imports module_a.',
  },
  {
    severity: 'warn',
    title: 'Duplicated code',
    detail: '847 lines duplicated across 12 files.',
  },
  {
    severity: 'warn',
    title: 'High complexity',
    detail: 'Cyclomatic complexity 28 (threshold 10).',
  },
  {
    severity: 'info',
    title: 'Test coverage',
    detail: '38% overall.',
  },
  {
    severity: 'err',
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

/* Severity tag — purely monochrome. Brightness encodes severity. */
const SeverityTag: React.FC<{ severity: DigestSeverity }> = ({ severity }) => {
  const config = {
    err: { label: 'ERR', dot: 0.85, text: 0.85 },
    warn: { label: 'WARN', dot: 0.55, text: 0.65 },
    info: { label: 'INFO', dot: 0.3, text: 0.45 },
  }[severity];
  return (
    <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.02]">
      <span
        className="w-1 h-1 rounded-full"
        style={{ background: `rgba(255,255,255,${config.dot})` }}
        aria-hidden
      />
      <span
        className="text-[9px] font-mono uppercase tracking-[0.18em]"
        style={{ color: `rgba(255,255,255,${config.text})` }}
      >
        {config.label}
      </span>
    </span>
  );
};

/* Bullet glyph — small monochrome marker for prose lists. */
const ListMarker: React.FC = () => (
  <span
    aria-hidden
    className="mt-[7px] mr-3 inline-block w-[18px] h-px shrink-0 bg-white/25"
  />
);

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
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-black">
        <DotGridBackdrop opacity={0.45} />
        {sectionFades}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 lg:py-0">
          <motion.div {...fadeUp} className="max-w-5xl space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-semibold tracking-tight text-white font-space leading-[1.04]">
              Every codebase has code
              <br />
              <span className="text-neutral-500">nobody wants to touch.</span>
            </h1>

            <div className="max-w-2xl space-y-3">
              <p className="text-lg md:text-xl text-neutral-300 font-space leading-relaxed">
                Refactron exists to change that.
              </p>
              <p className="text-base md:text-lg text-neutral-500 font-space leading-relaxed">
                Built so you can refactor the old code and{' '}
                <span className="text-neutral-300">prove nothing broke</span>.
              </p>
            </div>

            <p className="text-[11px] font-mono text-neutral-600 tracking-[0.22em] pt-4">
              — Om Sherikar, founder
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Founder + Origin Story ────────────────────────────────── */}
      <section className="relative w-full py-24 lg:py-28 overflow-hidden">
        {sectionFades}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div {...fadeUp} className="mb-10 space-y-3">
            <p className={eyebrow}>Founder · Origin</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-space leading-[1.1]">
              Built by Om Sherikar.
            </h2>
          </motion.div>

          <motion.article
            {...fadeUp}
            className={`${cardChrome} p-8 md:p-10 lg:p-12`}
          >
            <DotGridBackdrop />

            <div className="relative grid gap-10 md:gap-12 md:grid-cols-[minmax(0,15rem)_1fr] md:items-start">
              {/* Portrait */}
              <figure className="mx-auto w-full max-w-[220px] md:mx-0 md:max-w-none">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-black aspect-[4/5] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
                  <img
                    src={FOUNDER_PORTRAIT_SRC}
                    alt="Portrait of Om Sherikar, founder of Refactron"
                    className="h-full w-full object-cover object-[center_32%] scale-[1.14]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_72%_at_50%_42%,transparent_30%,rgba(0,0,0,0.5)_65%,rgb(0,0,0)_100%)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]"
                    aria-hidden
                  />
                </div>
                <figcaption className="sr-only">
                  Om Sherikar, founder of Refactron.
                </figcaption>
              </figure>

              {/* Bio / origin story */}
              <div className="space-y-7 min-w-0">
                {/* Identity block — JSON-config feel */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-[12px]">
                  {identityFields.map(f => (
                    <div key={f.key} className="flex gap-2 truncate">
                      <dt className="text-neutral-600 tabular-nums">
                        {f.key}:
                      </dt>
                      <dd className="text-neutral-300 truncate">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="h-px bg-white/[0.06]" />

                {/* The moment */}
                <div className="space-y-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-600">
                    The moment
                  </p>
                  <p className="text-base md:text-lg text-neutral-300 font-space leading-relaxed">
                    At a hackathon, I watched a team avoid an entire part of
                    their codebase. Nobody wanted to risk breaking it. That
                    moment stuck with me.
                  </p>
                  <p className="text-base md:text-lg text-neutral-400 font-space leading-relaxed">
                    I looked for a tool that would actually go in, fix the
                    legacy code, and prove nothing broke. Couldn&apos;t find
                    one.
                  </p>
                  <p className="text-base md:text-lg text-white font-medium font-space leading-relaxed">
                    So I built one.
                  </p>
                </div>

                {/* Receipts */}
                <ul className="flex flex-wrap gap-2">
                  {receipts.map(label => (
                    <li
                      key={label}
                      className="text-[11px] font-mono text-neutral-400 px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.018] tracking-wide"
                    >
                      {label}
                    </li>
                  ))}
                </ul>

                {/* Social */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={FOUNDER_X_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.02] text-sm text-neutral-200 font-space hover:bg-white/[0.05] hover:border-white/20 transition-colors"
                  >
                    <XIcon className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    Follow on X
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.1] bg-white/[0.02] text-sm text-neutral-200 font-space hover:bg-white/[0.05] hover:border-white/20 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ─── The Problem ──────────────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden">
        {sectionFades}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-7 order-1"
            >
              <div className="space-y-4">
                <p className={eyebrow}>Context</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight font-space leading-[1.08]">
                  The Problem.
                </h2>
                <p className="text-base md:text-lg text-neutral-400 font-space leading-relaxed max-w-xl">
                  Most production codebases carry significant technical debt,
                  but refactoring them is often avoided.
                </p>
              </div>
              <ul className="space-y-3.5 max-w-xl">
                {[
                  'Manual refactoring is slow, expensive, and risky.',
                  'Automated tools focus on generation without guaranteeing correctness.',
                  'Teams postpone structural improvements, making codebases harder to maintain.',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-base text-neutral-300 font-space leading-relaxed"
                  >
                    <ListMarker />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 mt-10 lg:mt-0 order-2"
            >
              <div
                className={`${cardChrome} min-h-[320px] p-6 md:p-7 flex flex-col`}
              >
                <DotGridBackdrop />
                <div className="relative flex items-center gap-2 mb-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-600">
                    Sample health digest
                  </p>
                  <span className="text-[10px] font-mono text-neutral-700 ml-auto">
                    5 findings
                  </span>
                </div>
                <ul className="relative space-y-2.5 flex-1">
                  {problemDigestRows.map(row => (
                    <li
                      key={row.title}
                      className="rounded-lg border border-white/[0.06] bg-black/40 px-3.5 py-3 transition-colors hover:border-white/[0.12]"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <SeverityTag severity={row.severity} />
                        <span className="text-sm font-medium text-white font-space">
                          {row.title}
                        </span>
                      </div>
                      <p className="text-[13px] text-neutral-500 font-space leading-snug">
                        {row.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── My Approach ──────────────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden">
        {sectionFades}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 mt-10 lg:mt-0 order-2 lg:order-1"
            >
              <div
                className={`${cardChrome} min-h-[320px] p-6 md:p-7 flex flex-col`}
              >
                <DotGridBackdrop />
                <div className="relative flex items-center gap-2 mb-6">
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-600">
                    Structured analysis run
                  </p>
                  <span className="text-[10px] font-mono text-neutral-700 ml-auto tabular-nums">
                    {approachSteps.length} steps
                  </span>
                </div>
                <ol className="relative space-y-5 flex-1 list-none m-0 p-0">
                  {approachSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.1] bg-white/[0.03] text-[11px] font-mono text-neutral-300 tabular-nums"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-sm font-medium text-white font-space leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-[13px] text-neutral-500 font-space leading-relaxed mt-1">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 space-y-7 order-1 lg:order-2"
            >
              <div className="space-y-4">
                <p className={eyebrow}>How I think about it</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight font-space leading-[1.08]">
                  My Approach.
                </h2>
                <p className="text-base md:text-lg text-neutral-400 font-space leading-relaxed max-w-xl">
                  Refactoring as a structured engineering process, not a
                  one-shot automation problem.
                </p>
              </div>
              <ul className="space-y-3.5 max-w-xl">
                {[
                  'Analyzes code structure and identifies targeted improvements.',
                  'Proposes incremental refactors that preserve existing behavior.',
                  'Makes refactoring predictable, reviewable, and safe.',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-base text-neutral-300 font-space leading-relaxed"
                  >
                    <ListMarker />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── What Safe Means ─────────────────────────────────────── */}
      <section className="relative w-full py-24 overflow-hidden">
        {sectionFades}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            {...fadeUp}
            className="mb-12 lg:mb-14 max-w-3xl space-y-4"
          >
            <p className={eyebrow}>Principles</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white font-space leading-[1.08]">
              What Safe Means.
            </h2>
            <p className="text-base md:text-lg text-neutral-400 font-space leading-relaxed">
              Safety isn&apos;t a claim — it&apos;s a set of constraints I built
              Refactron around.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            {safetyConstraints.map((c, i) => {
              const isLast = i === safetyConstraints.length - 1;
              return (
                <article
                  key={c.num}
                  className={`${cardChrome} p-6 lg:p-7 ${
                    isLast
                      ? 'md:col-span-2 md:max-w-2xl md:mx-auto md:w-full'
                      : ''
                  }`}
                >
                  <DotGridBackdrop />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="text-[10px] font-mono text-neutral-600 tabular-nums tracking-[0.24em]">
                      {c.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 text-right">
                      {c.outcomeLabel}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-lg font-semibold text-white font-space leading-snug">
                    {c.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-neutral-500 font-space leading-relaxed">
                    {c.description}
                  </p>
                  <div className="relative mt-5 pt-5 border-t border-white/[0.06]">
                    <p className="text-sm text-neutral-300 font-space leading-relaxed">
                      {c.outcome}
                    </p>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Why I'm Building (letter close) ─────────────────────── */}
      <section className="relative w-full py-28 lg:py-32 overflow-hidden">
        {sectionFades}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${cardChrome} p-10 md:p-14 lg:p-16`}
          >
            <DotGridBackdrop />

            <div className="relative space-y-8">
              <p className={eyebrow}>A letter</p>

              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-white font-space leading-[1.1]">
                Why I&apos;m building Refactron.
              </h2>

              <div className="space-y-5 max-w-2xl text-lg md:text-xl text-neutral-300 font-space leading-[1.7]">
                <p>
                  The tools that existed could find legacy code, or generate new
                  code. None of them could{' '}
                  <span className="text-white">actually refactor</span> the old
                  code and <span className="text-white">prove it was safe</span>
                  .
                </p>
                <p className="text-neutral-400">
                  That gap bothered me enough that I couldn&apos;t leave it
                  alone.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <span className="h-px w-8 bg-white/30" aria-hidden />
                <span className="text-[11px] font-mono text-neutral-400 tracking-[0.22em]">
                  Om
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ─── Contact ─────────────────────────────────────────────── */}
      <section className="relative w-full py-20 bg-black border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="text-lg md:text-xl text-neutral-300 font-space">
              Questions, or want to learn more?
            </p>
            <a
              href="https://cal.com/omsherikar/queries-refactron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-white font-medium font-space text-sm hover:bg-white/[0.08] hover:border-white/25 transition-colors"
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
