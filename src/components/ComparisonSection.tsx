import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────────────── */

const PRODUCTS = ['Refactron', 'Cursor', 'SonarQube', 'CodeAnt'] as const;

interface Row {
  label: string;
  values: [boolean, boolean, boolean, boolean];
}

const CAPABILITY_ROWS: Row[] = [
  { label: 'Finds legacy code', values: [true, false, false, false] },
  { label: 'Refactors it structurally', values: [true, false, false, false] },
  { label: 'No LLM in the engine', values: [true, false, true, false] },
  {
    label: 'Verifies safety before write',
    values: [true, false, false, false],
  },
  {
    label: 'Generates docs after refactor',
    values: [true, false, false, false],
  },
  { label: 'Runs fully local', values: [true, false, false, false] },
];

const SUPPORT_ROWS: Row[] = [
  { label: 'Python', values: [true, true, true, true] },
  { label: 'TypeScript', values: [true, true, true, true] },
];

/* ─── Cell marks ──────────────────────────────────────────────────
 * Monochrome data-viz: "yes" is a filled white dot inside a thin
 * ring; "no" is a small horizontal dash. No iconography, no color.
 */

const Cell: React.FC<{ on: boolean }> = ({ on }) =>
  on ? (
    <span
      aria-label="Yes"
      className="relative inline-flex items-center justify-center w-3 h-3"
    >
      <span className="absolute inset-0 rounded-full ring-1 ring-white/25" />
      <span className="absolute w-[7px] h-[7px] rounded-full bg-white/90" />
    </span>
  ) : (
    <span aria-label="No" className="inline-block w-2.5 h-px bg-white/20" />
  );

/* ─── Section ──────────────────────────────────────────────────── */

const ComparisonSection: React.FC = () => {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="comparison"
      className="w-full py-28 relative overflow-hidden bg-black antialiased font-space"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-16 lg:mb-20"
        >
          <div className="lg:col-span-7">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1]">
              How Refactron compares.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide">
              Cursor and CodeAnt lean on LLMs. SonarQube analyzes, but it
              doesn&apos;t refactor. Refactron finds legacy code, transforms it
              deterministically, and verifies before anything touches disk.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto relative rounded-[28px] border border-white/[0.06] bg-white/[0.012] overflow-hidden"
        >
          {/* Static dot grid — matches Workflow / WhatWeDo cards */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          <div className="relative">
            {/* Column headers */}
            <div className="grid grid-cols-[minmax(0,1.45fr)_repeat(4,minmax(0,1fr))] border-b border-white/[0.06]">
              <div className="px-6 md:px-8 py-5 md:py-6 flex items-end">
                <span className="text-[10px] font-mono text-neutral-700 tracking-[0.28em]">
                  CAPABILITIES
                </span>
              </div>
              {PRODUCTS.map((p, i) => (
                <div
                  key={p}
                  className={`px-3 md:px-4 py-5 md:py-6 text-center border-l ${
                    i === 0
                      ? 'bg-white/[0.025] border-l-white/[0.22]'
                      : 'border-l-white/[0.05]'
                  }`}
                >
                  <span
                    className={`text-xs md:text-sm font-medium uppercase tracking-wider ${
                      i === 0 ? 'text-white' : 'text-neutral-500'
                    }`}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>

            {CAPABILITY_ROWS.map(row => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,1.45fr)_repeat(4,minmax(0,1fr))] border-b border-white/[0.05] last:border-b-0"
              >
                <div className="px-6 md:px-8 py-4 md:py-[18px] flex items-center">
                  <span className="text-sm md:text-[15px] text-neutral-300 leading-snug">
                    {row.label}
                  </span>
                </div>
                {row.values.map((v, colIdx) => (
                  <div
                    key={colIdx}
                    className={`flex items-center justify-center px-2 py-4 md:py-[18px] border-l ${
                      colIdx === 0
                        ? 'bg-white/[0.018] border-l-white/[0.22]'
                        : 'border-l-white/[0.05]'
                    }`}
                  >
                    <Cell on={v} />
                  </div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-[minmax(0,1.45fr)_repeat(4,minmax(0,1fr))] border-t border-white/[0.06] bg-white/[0.012]">
              <div className="px-6 md:px-8 py-3 md:py-4 flex items-center">
                <span className="text-[10px] font-mono text-neutral-600 tracking-[0.28em]">
                  LANGUAGE SUPPORT
                </span>
              </div>
              <div className="bg-white/[0.018] border-l border-l-white/[0.22]" />
              <div className="border-l border-l-white/[0.05]" />
              <div className="border-l border-l-white/[0.05]" />
              <div className="border-l border-l-white/[0.05]" />
            </div>

            {SUPPORT_ROWS.map(row => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,1.45fr)_repeat(4,minmax(0,1fr))] border-b border-white/[0.05] last:border-b-0"
              >
                <div className="px-6 md:px-8 py-3 md:py-4 flex items-center">
                  <span className="text-sm text-neutral-500">{row.label}</span>
                </div>
                {row.values.map((v, colIdx) => (
                  <div
                    key={colIdx}
                    className={`flex items-center justify-center py-3 md:py-4 border-l ${
                      colIdx === 0
                        ? 'bg-white/[0.018] border-l-white/[0.22]'
                        : 'border-l-white/[0.05]'
                    }`}
                  >
                    <Cell on={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/[0.06] space-y-4">
          <p className="text-center">
            <Link
              to="/research"
              className="text-[11px] font-mono text-neutral-500 hover:text-neutral-400 tracking-wide underline underline-offset-[5px] decoration-neutral-700/80 hover:decoration-neutral-500 transition-colors"
            >
              Read the full research paper →
            </Link>
          </p>
          <p className="text-[11px] font-mono text-neutral-600 tracking-wide text-center leading-relaxed">
            Comparison reflects publicly documented positioning as of 2026.
            Refactron is built on deterministic transforms plus verification,
            not generic lint rules or chat edits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
