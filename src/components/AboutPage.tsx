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

/* Bullet glyph — small monochrome marker for prose lists. */
const ListMarker: React.FC = () => (
  <span
    aria-hidden
    className="mt-[7px] mr-3 inline-block w-[18px] h-px shrink-0 bg-white/25"
  />
);

/* Inline terminal-style severity token: [ERR] / [WARN] / [INFO]. */
const SeverityToken: React.FC<{ severity: DigestSeverity }> = ({
  severity,
}) => {
  const cfg = {
    err: { label: 'ERR ', alpha: 0.9 },
    warn: { label: 'WARN', alpha: 0.62 },
    info: { label: 'INFO', alpha: 0.36 },
  }[severity];
  return (
    <span
      className="font-mono text-[11px] tracking-[0.08em] tabular-nums"
      style={{ color: `rgba(255,255,255,${cfg.alpha})` }}
    >
      {cfg.label}
    </span>
  );
};

/* ─── Tactile glassmorphic visuals for What Safe Means ────────────
 * Each constraint gets its own miniature "control surface" — a
 * small CSS-built widget with a satin gradient, soft inset shadow,
 * and a single iconic affordance. Same glass language as the hero
 * chip module, scaled down per card.
 */

/* Base recipes — reused across the five visuals. */
const glassBase: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(0,0,0,0.35) 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.55), 0 6px 14px -4px rgba(0,0,0,0.55)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const glassActive: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.02) 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.5), 0 8px 16px -4px rgba(0,0,0,0.6), 0 0 22px -6px rgba(255,255,255,0.18)',
  border: '1px solid rgba(255,255,255,0.18)',
};

const glassDim: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.4) 100%)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.45), 0 4px 10px -3px rgba(0,0,0,0.4)',
  border: '1px dashed rgba(255,255,255,0.14)',
};

/* 01 — Read-only first */
const SafetyReadOnly: React.FC = () => (
  <div className="w-full flex items-center justify-center gap-3 py-1">
    <div
      className="px-3.5 py-2 rounded-xl flex items-center gap-2"
      style={glassActive}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white/95 shadow-[0_0_6px_rgba(255,255,255,0.55)]" />
      <span className="text-[10px] font-mono text-white/95 tracking-[0.2em]">
        READ
      </span>
    </div>

    <div className="flex-shrink-0 w-7 border-t border-dashed border-white/15" />

    <div
      className="relative px-3.5 py-2 rounded-xl"
      style={{ ...glassBase, opacity: 0.78 }}
    >
      <span className="text-[10px] font-mono text-white/35 tracking-[0.2em]">
        WRITE
      </span>
      <span
        aria-hidden
        className="absolute left-2 right-2 top-1/2 h-px bg-white/55"
      />
    </div>
  </div>
);

/* 02 — You approve every change */
const SafetyApprove: React.FC = () => (
  <div className="w-full max-w-[200px] mx-auto flex flex-col gap-1.5">
    <div
      className="px-3 py-2 rounded-lg flex items-center justify-between"
      style={glassDim}
    >
      <span className="text-[9px] font-mono text-white/45 tracking-[0.22em]">
        PROPOSED
      </span>
      <span className="w-1 h-1 rounded-full bg-white/30" />
    </div>

    <div className="flex justify-center -my-1" aria-hidden>
      <svg viewBox="0 0 14 10" width="14" height="10">
        <path
          d="M 7 1 L 7 7 M 4 4.5 L 7 7 L 10 4.5"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <div
      className="px-3 py-2 rounded-lg flex items-center justify-between"
      style={glassActive}
    >
      <span className="text-[9px] font-mono text-white/95 tracking-[0.22em]">
        APPROVED
      </span>
      <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden>
        <path
          d="M 3 7 L 6 10.5 L 11 4"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

/* 03 — Proof, not hope */
const SafetyVerify: React.FC = () => {
  const rows = [
    { label: 'syntax', alpha: 0.95 },
    { label: 'tests', alpha: 0.9 },
    { label: 'invariants', alpha: 0.85 },
  ];
  return (
    <div
      className="w-full max-w-[220px] mx-auto px-3.5 py-2.5 rounded-xl flex flex-col gap-1.5"
      style={glassBase}
    >
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: `rgba(255,255,255,${row.alpha})`,
              boxShadow: `0 0 6px rgba(255,255,255,${row.alpha * 0.5})`,
            }}
          />
          <span className="text-[9px] font-mono text-white/55 tracking-[0.16em]">
            {row.label}
          </span>
          <span className="ml-auto text-[9px] font-mono text-white/35 tracking-[0.16em] uppercase">
            pass
          </span>
        </div>
      ))}
    </div>
  );
};

/* 04 — Small, reviewable steps */
const SafetyIncremental: React.FC = () => {
  const steps = [
    { alpha: 0.95, active: true },
    { alpha: 0.72, active: false },
    { alpha: 0.52, active: false },
    { alpha: 0.32, active: false },
    { alpha: 0.18, active: false },
  ];
  return (
    <div className="w-full flex items-center justify-center gap-2">
      {steps.map((s, i) => (
        <div
          key={i}
          className="rounded-md flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            background: `linear-gradient(180deg, rgba(255,255,255,${s.alpha * 0.16}) 0%, rgba(0,0,0,0.4) 100%)`,
            border: `1px solid rgba(255,255,255,${0.05 + s.alpha * 0.16})`,
            boxShadow: s.active
              ? 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.55), 0 5px 10px -3px rgba(0,0,0,0.65), 0 0 14px -4px rgba(255,255,255,0.18)'
              : 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.45), 0 4px 8px -3px rgba(0,0,0,0.45)',
          }}
        >
          <span
            className="text-[8.5px] font-mono tabular-nums tracking-[0.05em]"
            style={{ color: `rgba(255,255,255,${s.alpha})` }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  );
};

/* 05 — Walk it back */
const SafetyRollback: React.FC = () => (
  <div className="relative w-full flex items-center justify-center">
    {/* Dashed arc trail behind */}
    <svg
      viewBox="0 0 160 56"
      width="180"
      height="60"
      className="absolute inset-0 m-auto pointer-events-none"
      aria-hidden
    >
      <path
        d="M 30 42 Q 80 4 130 42"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="0.8"
        fill="none"
        strokeDasharray="3 3"
      />
    </svg>

    <div className="relative flex items-center gap-4">
      {/* prev */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={glassDim}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>

      {/* center — rollback button */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle at 50% 28%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.55) 75%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.7), 0 8px 18px -4px rgba(0,0,0,0.65), 0 0 22px -6px rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <svg viewBox="0 0 22 22" width="20" height="20" aria-hidden>
          <path
            d="M 5 8 L 5 4 L 2 7"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 5 8 A 6 6 0 1 1 5 16"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* now */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={glassActive}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/95 shadow-[0_0_6px_rgba(255,255,255,0.55)]" />
      </div>
    </div>
  </div>
);

const SafetyVisual: React.FC<{ num: string }> = ({ num }) => {
  switch (num) {
    case '01':
      return <SafetyReadOnly />;
    case '02':
      return <SafetyApprove />;
    case '03':
      return <SafetyVerify />;
    case '04':
      return <SafetyIncremental />;
    case '05':
      return <SafetyRollback />;
    default:
      return null;
  }
};

/* ─── Hero glassmorphic chip module ──────────────────────────────
 * Dark glass / satin-finish tile that reads as a single hardware
 * module ("REFACTRON · ENGINE"). Soft top-edge highlight, inset
 * shadow, subtle radial pulse on the core, a small mono logo
 * glyph in the corner, an LED-style status row, and surrounding
 * mono labels. Pure CSS — no SVG hairlines, no iso slabs.
 */

const ChipCoreDie: React.FC = () => {
  /* A 9x9 grid of dots that fade radially from the centre,
   * suggesting a chip die seen from above. The centre pulses very
   * subtly via a single CSS keyframe. */
  const cells: { alpha: number; emphasize: boolean }[] = [];
  const N = 9;
  for (let i = 0; i < N * N; i++) {
    const r = Math.floor(i / N) - (N - 1) / 2;
    const c = (i % N) - (N - 1) / 2;
    const d = Math.sqrt(r * r + c * c);
    const alpha = Math.max(0, 0.62 - d * 0.13);
    cells.push({ alpha, emphasize: r === 0 && c === 0 });
  }
  return (
    <div
      className="relative grid grid-cols-9 gap-[6px]"
      aria-hidden
      style={{ width: 156 }}
    >
      {cells.map((cell, i) => (
        <span
          key={i}
          className={cell.emphasize ? 'rfn-die-core' : ''}
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: `rgba(255,255,255,${cell.alpha})`,
            boxShadow: cell.emphasize
              ? '0 0 8px rgba(255,255,255,0.6)'
              : undefined,
          }}
        />
      ))}
    </div>
  );
};

const HeroChipModule: React.FC = () => (
  <div className="relative w-full max-w-[420px] mx-auto select-none">
    {/* Inline pulse keyframe used by the core */}
    <style>{`
      @keyframes rfn-die-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(255,255,255,0.55); }
        50%      { opacity: 0.55; box-shadow: 0 0 12px rgba(255,255,255,0.85); }
      }
      .rfn-die-core { animation: rfn-die-pulse 2.6s ease-in-out infinite; }
    `}</style>

    {/* Surrounding mono labels */}
    <div className="absolute -top-2 left-2 text-[9px] font-mono text-neutral-600 tracking-[0.28em]">
      FIG · 01
    </div>
    <div className="absolute -bottom-2 right-2 text-[9px] font-mono text-neutral-600 tracking-[0.28em]">
      DETERMINISTIC · V0.5
    </div>
    <div
      className="absolute top-1/2 -right-3 -translate-y-1/2 text-[8.5px] font-mono text-neutral-700 tracking-[0.34em] hidden xl:block"
      style={{ writingMode: 'vertical-rl' }}
    >
      ANALYZE · REFACTOR · VERIFY · DOCUMENT
    </div>

    {/* The chip */}
    <div
      className="relative aspect-square rounded-[28px]"
      style={{
        background: `
          radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,255,255,0.06), transparent 65%),
          linear-gradient(180deg, rgba(255,255,255,0.022) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.85) 100%)
        `,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.08),
          inset 0 -1px 0 rgba(0,0,0,0.7),
          inset 0 0 60px rgba(0,0,0,0.5),
          0 30px 60px -20px rgba(0,0,0,0.9),
          0 0 90px -20px rgba(255,255,255,0.025)
        `,
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Top-edge soft highlight */}
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)',
        }}
      />

      {/* Top-right logo glyph */}
      <div className="absolute top-5 right-5" aria-hidden>
        <svg viewBox="0 0 22 22" className="w-[22px] h-[22px]">
          {/* Stylized "R" glyph */}
          <path
            d="M 5 4 L 13 4 Q 17 4 17 8 Q 17 11 14 12 L 17 18 L 14 18 L 11 12 L 8 12 L 8 18 L 5 18 Z M 8 7 L 8 9 L 13 9 Q 14 9 14 8 Q 14 7 13 7 Z"
            fill="rgba(255,255,255,0.4)"
          />
        </svg>
      </div>

      {/* Center die */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Soft inner halo */}
          <div
            aria-hidden
            className="absolute inset-0 -m-6 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.06), transparent 70%)',
            }}
          />
          <div className="relative">
            <ChipCoreDie />
          </div>
        </div>
      </div>

      {/* Bottom-left product label */}
      <div className="absolute bottom-5 left-5 text-[10.5px] font-mono leading-[1.35] tracking-[0.24em]">
        <div className="text-white/55">REFACTRON</div>
        <div className="text-white/35">ENGINE</div>
      </div>

      {/* Bottom-right status LEDs — first one pulses (active) */}
      <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
        {[
          { a: 0.95, pulse: true },
          { a: 0.55, pulse: false },
          { a: 0.55, pulse: false },
          { a: 0.55, pulse: false },
          { a: 0.3, pulse: false },
        ].map((led, i) => (
          <span
            key={i}
            aria-hidden
            className={led.pulse ? 'rfn-die-core' : ''}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: `rgba(255,255,255,${led.a})`,
              boxShadow: led.pulse
                ? '0 0 6px rgba(255,255,255,0.55)'
                : undefined,
            }}
          />
        ))}
      </div>
    </div>
  </div>
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
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-8">
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
            </div>

            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <HeroChipModule />
            </div>
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
                className={`${cardChrome} min-h-[320px] p-5 md:p-6 flex flex-col`}
              >
                <DotGridBackdrop />

                {/* Terminal header strip */}
                <div className="relative flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.05]">
                  <span className="flex items-center gap-1.5" aria-hidden>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </span>
                  <span className="text-[10px] font-mono text-neutral-600 tracking-[0.18em]">
                    ~/legacy-monolith
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-neutral-700 tracking-wider tabular-nums">
                    5 findings
                  </span>
                </div>

                {/* Terminal body */}
                <div className="relative flex-1 font-mono">
                  <p className="text-[12px] leading-[1.7]">
                    <span className="text-white/45">›&nbsp;</span>
                    <span className="text-white/95">refactron analyze .</span>
                  </p>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                    ✓ scanned 1,284 files · 8.2s
                  </p>

                  <div className="mt-4 space-y-3">
                    {problemDigestRows.map(row => (
                      <div key={row.title} className="text-[12px] leading-snug">
                        <div className="flex items-baseline gap-2">
                          <span className="text-neutral-700 select-none">
                            [
                          </span>
                          <SeverityToken severity={row.severity} />
                          <span className="text-neutral-700 select-none">
                            ]
                          </span>
                          <span className="text-white/85 font-space text-[13px]">
                            {row.title}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-neutral-500 mt-1 pl-[3.5rem] leading-snug">
                          {row.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.04] text-[11px] text-neutral-500 leading-relaxed">
                    <span className="text-neutral-700">─</span>{' '}
                    <span className="text-white/55">2 errors</span>
                    <span className="text-neutral-700"> · </span>
                    <span className="text-white/50">2 warnings</span>
                    <span className="text-neutral-700"> · </span>
                    <span className="text-white/35">1 info</span>
                  </div>
                </div>
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
                <div className="relative flex items-center gap-2 mb-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-600">
                    Analysis pipeline
                  </p>
                  <span className="text-[10px] font-mono text-neutral-700 ml-auto tabular-nums">
                    {approachSteps.length} stages
                  </span>
                </div>

                {/* Tiny pipeline overview — 5 dots connected by a hairline */}
                <div className="relative mb-6 flex items-center" aria-hidden>
                  {approachSteps.map((_, i) => (
                    <React.Fragment key={i}>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: `rgba(255,255,255,${0.9 - i * 0.13})`,
                        }}
                      />
                      {i < approachSteps.length - 1 && (
                        <span className="flex-1 h-px bg-white/[0.12]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Vertical pipeline with continuous connector line */}
                <ol className="relative flex-1 list-none m-0 p-0">
                  <span
                    aria-hidden
                    className="absolute left-[14px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/[0.14] to-transparent"
                  />
                  <div className="space-y-5">
                    {approachSteps.map((step, i) => (
                      <li key={step.title} className="relative flex gap-4">
                        <span
                          className="relative z-10 flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border border-white/[0.18] bg-black text-[10px] font-mono text-white/85 tabular-nums"
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
                  </div>
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
                  className={`${cardChrome} p-6 lg:p-7 flex flex-col ${
                    isLast
                      ? 'md:col-span-2 md:max-w-2xl md:mx-auto md:w-full'
                      : ''
                  }`}
                >
                  <DotGridBackdrop />

                  {/* Top row: number + outcome chip */}
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono text-neutral-600 tabular-nums tracking-[0.24em]">
                      {c.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/65 text-right px-2 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.025]">
                      {c.outcomeLabel}
                    </span>
                  </div>

                  {/* The visual */}
                  <div className="relative mt-6 mb-6 flex items-center justify-center min-h-[60px]">
                    <SafetyVisual num={c.num} />
                  </div>

                  {/* Title + description */}
                  <h3 className="relative text-lg font-semibold text-white font-space leading-snug">
                    {c.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-neutral-500 font-space leading-relaxed">
                    {c.description}
                  </p>

                  {/* Outcome — bottom anchored */}
                  <div className="relative mt-5 pt-5 border-t border-white/[0.06] flex-1 flex items-end">
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
