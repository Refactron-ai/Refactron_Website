import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

/* ─── Tokens shared with ResearchPerf01Page ──────────────────────── */

const eyebrow =
  'text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
};

/* ─── Paper index ────────────────────────────────────────────────── */

type PaperStatus = 'live' | 'planned';

interface Paper {
  no: string;
  status: PaperStatus;
  date: string;
  title: string;
  abstract: string;
  href?: string;
  external?: boolean;
}

const PAPERS: Paper[] = [
  {
    no: '01',
    status: 'live',
    date: '2026-05-15',
    title: 'Refactron 0.2.0. A measured look at deterministic refactoring at scale.',
    abstract:
      'Wall-clock benchmarks for analyze, plan, and the 3-gate verifier on synthetic and real Python fixtures. 45% faster on 100k LOC vs the 0.1 baseline. All scripts and raw runs in the public repo.',
    href: '/research/perf-01',
  },
  {
    no: '02',
    status: 'live',
    date: '2026-05-15',
    title:
      'Refactron vs the codemod baseline. A head-to-head on var → const/let and format → f-string.',
    abstract:
      'Two transforms, measured against jscodeshift, Comby, ESLint --fix, and LibCST on identical inputs across speed, coverage, and safety. The unverified codemod tools run sub-second and write code that does not compile; Refactron is the slowest tool measured and the only one that is top-coverage on both transforms while never unsafe.',
    href: '/research/comparison-01',
  },
  {
    no: '03',
    status: 'planned',
    date: 'Target 2026-06',
    title:
      'Legacy patterns in the wild. An empirical survey of the top 100 PyPI packages.',
    abstract:
      'How prevalent are the patterns Refactron transforms target? Which packages would benefit most from a deterministic refactoring pass? Distribution by transform, by package age, and by test coverage.',
  },
  {
    no: '04',
    status: 'planned',
    date: 'Target 2026-06',
    title:
      'Cross-file preconditions for callback_to_async_await. A method paper.',
    abstract:
      'Why this transform is the hardest of the ten and how the precondition set is constructed. Walks through the call-graph, the safety constraints, and the cases the transform deliberately refuses.',
  },
];

/* ─────────────────────────────────────────────────────────────── */

const ResearchPage: React.FC = () => {
  useSEO({
    title: 'Research | Refactron',
    description:
      "Refactron's research stream. Performance reports, comparison studies, and method papers on deterministic refactoring with verification-first guarantees.",
    canonical: 'https://refactron.dev/research',
    robots: 'index, follow',
  });

  return (
    <article
      className="relative w-full font-space antialiased overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 55%), #050506',
      }}
    >
      <DotGridBackdrop />

      <div className="relative z-10">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="w-full border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-24 lg:py-36">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className={`${eyebrow} mb-7`}>Research</p>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] text-white leading-[1.04] max-w-4xl mb-8">
                What we measure,{' '}
                <span className="text-neutral-500">
                  why we measure it, what we found.
                </span>
              </h1>

              <p className="text-base md:text-lg text-neutral-400 leading-[1.8] max-w-2xl">
                Refactron's thesis is that refactoring belongs to deterministic
                tools with formal safety guarantees, not to text generators.
                These papers are how we hold that claim to scrutiny: published
                benchmarks, published methodology, published source.
              </p>

              {/* Counts strip */}
              <div className="mt-14 pt-8 border-t border-white/[0.07] grid grid-cols-3 gap-x-6 max-w-md">
                <Stat
                  label="Published"
                  value={PAPERS.filter(p => p.status === 'live').length.toString()}
                />
                <Stat
                  label="Planned"
                  value={PAPERS.filter(
                    p => p.status === 'planned'
                  ).length.toString()}
                />
                <Stat label="Last update" value="2026-05-15" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Papers list ────────────────────────────────────────── */}
        <section className="w-full border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10">
              <div className="hidden sm:block">
                <p className={`${eyebrow} sticky top-32`}>Papers</p>
              </div>
              <div>
                <p className={`${eyebrow} sm:hidden mb-6`}>Papers</p>
                <ol className="divide-y divide-white/[0.07]">
                  {PAPERS.map((p, i) => (
                    <PaperRow key={p.no} paper={p} delay={i * 0.05} />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ── About this stream ──────────────────────────────────── */}
        <section className="w-full border-b border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              {...fadeUp}
              className="grid lg:grid-cols-[1fr_minmax(0,2fr)] gap-10 lg:gap-16"
            >
              <p className={eyebrow}>About this stream</p>
              <div className="space-y-6">
                <p className="text-base text-neutral-300 leading-[1.8] max-w-2xl">
                  Every Refactron research piece commits to three rules.
                </p>
                <ul className="space-y-5 text-sm text-neutral-400 leading-[1.75]">
                  <Rule title="Reproducible">
                    Every published number ships with the script that produced
                    it. If you can't reproduce a claim from{' '}
                    <ExtMono href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/bench">
                      bench/
                    </ExtMono>
                    , it shouldn't be in the paper.
                  </Rule>
                  <Rule title="Defensible">
                    Methodology is described in detail upfront. No cherry-picked
                    runs, no proprietary inputs, no mystery hardware.
                  </Rule>
                  <Rule title="Honest">
                    Each paper has a Discussion section listing what it does
                    not measure. We'd rather ship a narrow paper with sharp
                    edges than a broad one with caveats hidden in the small
                    print.
                  </Rule>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Footer / nav ───────────────────────────────────────── */}
        <section className="w-full">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500">
            <Link
              to="/"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              ← Back to home
            </Link>
            <a
              href="https://docs.refactron.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://github.com/Refactron-ai/Refactron_Lib_TS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Source ↗
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};

/* ═════════════════ Sub-components ═════════════════════════════════ */

const DotGridBackdrop: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      backgroundImage:
        'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      maskImage:
        'radial-gradient(ellipse 75% 60% at 50% 30%, black 0%, rgba(0,0,0,0.5) 65%, transparent 100%)',
      WebkitMaskImage:
        'radial-gradient(ellipse 75% 60% at 50% 30%, black 0%, rgba(0,0,0,0.5) 65%, transparent 100%)',
    }}
  />
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-2">
      {label}
    </p>
    <p className="text-2xl text-white font-semibold tracking-tight tabular-nums">
      {value}
    </p>
  </div>
);

const Rule: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <li className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-7 gap-y-1.5 items-baseline">
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-300">
      {title}
    </span>
    <span>{children}</span>
  </li>
);

const ExtMono: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-mono text-[0.88em] text-neutral-300 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.06] hover:bg-white/[0.08] transition-colors"
  >
    {children}
  </a>
);

const PaperRow: React.FC<{ paper: Paper; delay: number }> = ({
  paper,
  delay,
}) => {
  const live = paper.status === 'live';

  const inner = (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={`grid grid-cols-[60px_1fr_auto] gap-x-6 sm:gap-x-10 py-9 lg:py-12 ${
        live
          ? 'group cursor-pointer'
          : 'opacity-75'
      }`}
    >
      {/* Number column */}
      <div>
        <p className="font-mono text-xs tracking-[0.22em] text-neutral-500 tabular-nums">
          {paper.no}
        </p>
      </div>

      {/* Body */}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600">
            {paper.date}
          </p>
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.22em] px-1.5 py-0.5 rounded border ${
              live
                ? 'border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-400/90'
                : 'border-white/[0.1] bg-white/[0.02] text-neutral-500'
            }`}
          >
            {live ? 'live' : 'planned'}
          </span>
        </div>
        <h2
          className={`text-xl sm:text-2xl md:text-[1.65rem] font-semibold tracking-[-0.015em] leading-[1.2] mb-3 transition-colors ${
            live
              ? 'text-white group-hover:text-neutral-200'
              : 'text-neutral-300'
          }`}
        >
          {paper.title}
        </h2>
        <p className="text-sm text-neutral-400 leading-[1.75] max-w-2xl">
          {paper.abstract}
        </p>
      </div>

      {/* Arrow column */}
      <div className="flex items-start pt-1.5">
        {live ? (
          <span
            aria-hidden
            className="text-neutral-500 group-hover:text-white transition-colors"
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7h13M10 1l5 6-5 6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600">
            soon
          </span>
        )}
      </div>
    </motion.li>
  );

  if (live && paper.href) {
    return (
      <Link to={paper.href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
};

export default ResearchPage;
