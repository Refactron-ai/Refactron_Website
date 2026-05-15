import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

/* ─── Shared tokens (match ResearchComparison01Page) ────────────── */

const eyebrow =
  'text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500';

const MONO = 'ui-monospace, SFMono-Regular, monospace';

/* ─── Table of contents ─────────────────────────────────────────── */

const TOC: { id: string; label: string }[] = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'headline', label: '01 · Headline result' },
  { id: 'methodology', label: '02 · Methodology' },
  { id: 'results', label: '03 · Results — synthetic' },
  { id: 'pipeline', label: '04 · The full pipeline' },
  { id: 'apply', label: '05 · The apply step' },
  { id: 'discussion', label: '06 · Discussion' },
  { id: 'reproduce', label: '07 · Reproducibility' },
  { id: 'references', label: 'References' },
];

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -75% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/* ─────────────────────────────────────────────────────────────── */

const ResearchPerf01Page: React.FC = () => {
  useSEO({
    title: 'Refactron 0.2.0 · A Performance Report | Research',
    description:
      'Wall-clock benchmarks for Refactron 0.2.0: analyze, plan, and the 3-gate verifier on synthetic and real Python fixtures. Reproducible scripts in the repo.',
    canonical: 'https://refactron.dev/research/perf-01',
    robots: 'index, follow',
  });

  const active = useActiveSection(TOC.map((t) => t.id));

  return (
    <article
      className="relative w-full font-space antialiased"
      style={{
        background:
          'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 55%), #050506',
      }}
    >
      <DotGrid />

      {/* ═══════════════ HERO (full-width) ═══════════════ */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <p className={eyebrow}>Research · Performance report 01</p>
              <span className="h-px w-8 bg-white/10" aria-hidden />
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-600">
                v0.2.0 · 2026-05-15
              </p>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] font-semibold tracking-[-0.025em] text-white leading-[1.05] max-w-5xl mb-8">
              Refactron 0.2.0. A measured look at{' '}
              <span className="text-neutral-500">deterministic</span>{' '}
              refactoring at scale.
            </h1>
            <p className="text-base md:text-lg text-neutral-400 leading-[1.8] max-w-2xl">
              We measured Refactron 0.2.0 on the work users actually do —
              analyze a tree, plan a refactor, then verify and apply it. Every
              number on this page is a wall-clock measurement. Every script
              that produced it lives in the repo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ BENCHMARK BAND ═══════════════ */}
      <section className="relative w-full border-b border-white/[0.08] bg-white/[0.015]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-14 lg:py-16">
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.24em] text-neutral-500 mb-8">
            Analyze benchmark · v0.1.0-beta.2 →{' '}
            <span className="text-neutral-300">v0.2.0</span> · synthetic
            fixtures
          </p>
          <PerfBand />
        </div>
      </section>

      {/* ═══════════════ TWO-COLUMN: TOC + PAPER BODY ═══════════════ */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[200px_1fr] gap-x-14">
          {/* ── Sticky TOC ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className={`${eyebrow} mb-5`}>Contents</p>
              <nav className="flex flex-col gap-1">
                {TOC.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className={`text-[13px] leading-relaxed py-1 transition-colors border-l-2 pl-3 -ml-px ${
                      active === t.id
                        ? 'text-white border-white/60'
                        : 'text-neutral-500 border-transparent hover:text-neutral-300'
                    }`}
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Paper body ── */}
          <div className="min-w-0">
            <AuthorsBox />

            {/* 00 · Abstract */}
            <Block id="abstract">
              <Kicker>00 · Abstract</Kicker>
              <p className="text-lg md:text-xl text-neutral-300 leading-[1.75] mb-6">
                Refactron 0.2.0 analyzes a 100k-LOC tree in a median 11.13
                seconds — 45% faster than 0.1.0-beta.2, with run-to-run
                variance compressed by 65%. On a real Python project the full
                analyze → plan → apply loop, including the 3-gate verifier
                running pytest on a shadow tree, completes in roughly five
                seconds.
              </p>
              <p className="text-base text-neutral-500 leading-[1.8]">
                This report measures the cost of safety-first deterministic
                refactoring
                <Cite n="3" />. Every figure is wall-clock; every harness is
                public.
              </p>
            </Block>

            {/* 01 · Headline */}
            <Block id="headline">
              <Kicker>01 · Headline result</Kicker>
              <div className="flex items-baseline gap-5 mb-5">
                <span className="text-[6rem] sm:text-[8rem] font-semibold tracking-[-0.06em] text-white tabular-nums leading-[0.9]">
                  45<span className="text-neutral-700">%</span>
                </span>
                <span className="text-base text-neutral-400">
                  faster <Mono>analyze</Mono> on 100k LOC
                </span>
              </div>
              <P>
                vs 0.1.0-beta.2. Median dropped from 20.58s to 11.13s, and the
                long-tail variance compressed by 65% — predictable enough to
                drop into a pre-commit hook.
              </P>
              <Figure
                caption={
                  <>
                    <b>Figure 1.</b> Every measured run on 100k LOC; the
                    horizontal bar is the median. Both spread and centre
                    collapse from v0.1 to v0.2.
                  </>
                }
              >
                <ChartFrame>
                  <ComparisonChart />
                </ChartFrame>
              </Figure>
            </Block>

            {/* 02 · Methodology */}
            <Block id="methodology">
              <Kicker>02 · Methodology</Kicker>
              <H2>Reproducible by design.</H2>
              <P>
                Each measurement is the wall-clock real time reported by{' '}
                <Mono>/usr/bin/time -p</Mono>, captured over five runs after a
                single warm-up. We report median, min, and max — never a
                single best case. For the apply step, the fixture is freshly
                copied per iteration because the command mutates the tree.
              </P>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                <FactTile label="Hardware" value="Apple M2" sub="8 cores · 8 GB" />
                <FactTile label="OS" value="macOS 26.4" sub="Darwin arm64" />
                <FactTile label="Runtime" value="Node 24.2" sub="Python 3.13" />
                <FactTile
                  label="Iterations"
                  value="5 + 1"
                  sub="warm-up discarded"
                />
              </div>
            </Block>

            {/* 03 · Results */}
            <Block id="results">
              <Kicker>03 · Results — synthetic</Kicker>
              <H2>How fast can we walk a cold tree?</H2>
              <P>
                Synthetic fixtures generated fresh per run from{' '}
                <Mono>bench/gen-fixture.ts</Mono>
                <Cite n="1" /> — mixed Python and TypeScript with every legacy
                pattern Refactron's ten transforms target. This isolates the
                analyze step.
              </P>
              <div className="mt-8">
                <ResultsTable
                  rows={[
                    {
                      label: '10k LOC',
                      files: '448 files',
                      v01: 1.31,
                      v02: 1.21,
                      runs: [1.31, 1.19, 1.19, 1.22, 1.21],
                      cap: 1.5,
                    },
                    {
                      label: '100k LOC',
                      files: '4 465 files',
                      v01: 20.58,
                      v02: 11.13,
                      runs: [13.14, 11.2, 11.13, 10.61, 10.56],
                      cap: 22,
                      highlight: true,
                    },
                  ]}
                />
              </div>
              <Caption>
                <b>Table 1.</b> Median over five runs. Bars show the spread of
                all five measured runs; min and max in the same row. Δ% is the
                v0.1 → v0.2 median improvement.
              </Caption>
            </Block>

            {/* 04 · Pipeline */}
            <Block id="pipeline">
              <Kicker>04 · The full pipeline</Kicker>
              <H2>Real fixture, real test suite.</H2>
              <P>
                Synthetic numbers isolate the analyze step. Real users run the
                whole loop. We measure against{' '}
                <a
                  href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/fixtures/python-legacy-mini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 underline underline-offset-2 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
                >
                  python-legacy-mini
                </a>
                <Cite n="2" /> — 9 files, 189 LOC, with a pytest suite that
                exercises every function the transforms touch.
              </P>
              <Figure
                caption={
                  <>
                    <b>Figure 2.</b> The three pipeline stages and their
                    measured median wall-clock.
                  </>
                }
              >
                <PipelineHero />
              </Figure>
              <div className="grid sm:grid-cols-3 gap-3 mt-2">
                <PipelineCard
                  step="01"
                  label="analyze"
                  cmd="refactron analyze ."
                  median="0.16s"
                  detail="parse · 7 analyzers · score"
                />
                <PipelineCard
                  step="02"
                  label="plan"
                  cmd="run --dry-run ."
                  median="1.70s"
                  detail="transforms · diff render"
                />
                <PipelineCard
                  step="03"
                  label="apply"
                  cmd="run --apply ."
                  median="3.38s"
                  detail="3-gate verify · atomic write"
                  accent
                />
              </div>
              <Caption>
                <b>Table 2.</b> Median wall-clock per step, five runs each,
                fresh fixture copy per apply. End-to-end:{' '}
                <span className="not-italic tabular-nums text-neutral-300">
                  ~5.2s
                </span>{' '}
                from scan to atomically-written refactor.
              </Caption>
            </Block>

            {/* 05 · Apply step */}
            <Block id="apply">
              <Kicker>05 · Inside the apply step</Kicker>
              <H2>Three gates. All or nothing.</H2>
              <P>
                Of the 3.38-second apply budget on this fixture, roughly 3s is
                the test gate — pytest cold-start dominates at 9 files. On
                larger projects the ratio inverts: the test gate becomes bound
                by your suite, while plan and verification overhead stay
                roughly constant.
              </P>
              <Figure
                caption={
                  <>
                    <b>Figure 3.</b> Every refactor passes three gates before
                    any byte is written. Any failure drops to the rejected
                    state — your tree never changes, so there is nothing to
                    roll back.
                  </>
                }
              >
                <ThreeGateDiagram />
              </Figure>
            </Block>

            {/* 06 · Discussion */}
            <Block id="discussion">
              <Kicker>06 · Discussion</Kicker>
              <H2>What this report does and doesn't claim.</H2>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <Limitation title="Tool comparisons ship separately">
                  A fair head-to-head against jscodeshift, Comby, and{' '}
                  <Mono>eslint --fix</Mono> is its own study — now published as{' '}
                  <Link
                    to="/research/comparison-01"
                    className="text-neutral-300 hover:text-white underline underline-offset-2 decoration-neutral-700"
                  >
                    research paper #02
                  </Link>
                  <Cite n="5" />.
                </Limitation>
                <Limitation title="No memory profile">
                  Wall-clock only at v0.2. Peak RSS during the 100k LOC analyze
                  is in the next pass.
                </Limitation>
                <Limitation title="Single hardware target">
                  Apple M2 only. Linux x86 and Windows numbers when the bench
                  moves into CI.
                </Limitation>
                <Limitation title="500k LOC isn't here">
                  Fixture generation alone takes ~30s and pushes 8 GB. The
                  bench script supports{' '}
                  <Mono>SIZES=500000 bash bench/run-bench.sh</Mono>; we don't
                  publish until we can run it with headroom.
                </Limitation>
              </div>
            </Block>

            {/* 07 · Reproducibility */}
            <Block id="reproduce">
              <Kicker>07 · Reproducibility</Kicker>
              <H2>Run it yourself.</H2>
              <P>
                Both bench scripts ship in the public repo. No special
                hardware, no proprietary fixtures, no telemetry. If your
                numbers come out meaningfully different on Apple Silicon,
                please open an issue.
              </P>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <CodeBlock
                  caption="Synthetic analyze (10k + 100k LOC)"
                  code={`git clone https://github.com/Refactron-ai/Refactron_Lib_TS
cd Refactron_Lib_TS && npm ci
bash bench/run-bench.sh`}
                />
                <CodeBlock
                  caption="Full pipeline (python-legacy-mini)"
                  code={`pip install pytest libcst requests
bash bench/run-pipeline-bench.sh`}
                />
              </div>
            </Block>

            {/* References */}
            <Block id="references" last>
              <Kicker>References</Kicker>
              <ol className="space-y-4 mt-6">
                <RefItem n="1">
                  Synthetic fixture generator and timing harness.{' '}
                  <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/blob/main/bench/gen-fixture.ts">
                    bench/gen-fixture.ts
                  </ExtLink>
                </RefItem>
                <RefItem n="2">
                  Real Python fixture with pytest suite.{' '}
                  <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/fixtures/python-legacy-mini">
                    fixtures/python-legacy-mini
                  </ExtLink>
                </RefItem>
                <RefItem n="3">
                  Opdyke, W. F. (1992). <em>Refactoring Object-Oriented
                  Frameworks.</em> PhD thesis, University of Illinois
                  Urbana-Champaign — the foundation behaviour-preserving
                  refactoring rests on.
                </RefItem>
                <RefItem n="4">
                  Per-file parallelization PR — the source of the 45% win.{' '}
                  <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/pull/23">
                    Refactron_Lib_TS · PR #23
                  </ExtLink>
                </RefItem>
                <RefItem n="5">
                  Refactron vs the codemod baseline —{' '}
                  <Link
                    to="/research/comparison-01"
                    className="text-neutral-300 hover:text-white underline underline-offset-2 decoration-neutral-700"
                  >
                    research paper #02
                  </Link>
                  .
                </RefItem>
              </ol>

              <div className="pt-10 mt-10 border-t border-white/[0.07] flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                <Link
                  to="/research"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  ← All research
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
                  href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/bench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Raw bench data ↗
                </a>
              </div>
            </Block>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ═════════════════ Layout primitives ═════════════════════════════ */

const DotGrid: React.FC = () => (
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

const Block: React.FC<{
  id: string;
  last?: boolean;
  children: React.ReactNode;
}> = ({ id, last, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
    className={`scroll-mt-28 ${
      last ? '' : 'pb-14 mb-14 border-b border-white/[0.07]'
    }`}
  >
    {children}
  </motion.section>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className={`${eyebrow} mb-4`}>{children}</p>
);

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl md:text-[2.1rem] font-semibold tracking-[-0.02em] text-white leading-[1.15] mb-5">
    {children}
  </h2>
);

const P: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`text-base text-neutral-400 leading-[1.8] mb-4 ${className}`}>
    {children}
  </p>
);

const Mono: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="font-mono text-[0.85em] text-neutral-300 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08]">
    {children}
  </code>
);

const Cite: React.FC<{ n: string }> = ({ n }) => (
  <a
    href="#references"
    className="text-[0.7em] align-super font-mono text-neutral-500 hover:text-white transition-colors ml-0.5"
  >
    [{n}]
  </a>
);

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs text-neutral-500 italic mt-5 pl-4 border-l border-white/[0.08] leading-relaxed">
    {children}
  </p>
);

const Figure: React.FC<{
  caption: React.ReactNode;
  children: React.ReactNode;
}> = ({ caption, children }) => (
  <figure className="my-7">
    {children}
    <figcaption className="text-xs text-neutral-500 italic mt-3 text-center leading-relaxed">
      {caption}
    </figcaption>
  </figure>
);

/* Wraps a bare SVG chart in the same panel chrome the diagrams use. */
const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 sm:p-7">
    {children}
  </div>
);

const AuthorsBox: React.FC = () => (
  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-6 sm:p-7 mb-14">
    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500 mb-5">
      Authors
    </p>
    <div className="grid sm:grid-cols-2 gap-5">
      <div>
        <a
          href="https://www.linkedin.com/in/omsherikar0229/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:text-neutral-300 transition-colors"
        >
          Om Sherikar ↗
        </a>
        <p className="text-xs text-neutral-500 mt-0.5">Founder, Refactron</p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-1">
            Published
          </p>
          <p className="text-sm text-neutral-300">2026-05-15</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-1">
            Version
          </p>
          <p className="text-sm text-neutral-300">refactron 0.2.0</p>
        </div>
      </div>
    </div>
  </div>
);

const FactTile: React.FC<{ label: string; value: string; sub: string }> = ({
  label,
  value,
  sub,
}) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5">
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-2">
      {label}
    </p>
    <p className="text-lg text-white font-medium tracking-tight">{value}</p>
    <p className="text-xs text-neutral-500 mt-1">{sub}</p>
  </div>
);

const Limitation: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
      {title}
    </p>
    <p className="text-sm text-neutral-400 leading-relaxed">{children}</p>
  </div>
);

const RefItem: React.FC<{ n: string; children: React.ReactNode }> = ({
  n,
  children,
}) => (
  <li className="grid grid-cols-[34px_1fr] gap-x-3 items-baseline text-sm text-neutral-400 leading-relaxed">
    <span className="font-mono text-xs text-neutral-600 tabular-nums">
      [{n}]
    </span>
    <span>{children}</span>
  </li>
);

const ExtLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-neutral-300 hover:text-white underline underline-offset-2 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
  >
    {children}
  </a>
);

const CodeBlock: React.FC<{ caption: string; code: string }> = ({
  caption,
  code,
}) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] overflow-hidden">
    <div className="px-5 py-3 border-b border-white/[0.08] flex items-center justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
        {caption}
      </p>
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
      </div>
    </div>
    <pre className="p-5 overflow-x-auto text-xs leading-relaxed text-neutral-300 font-mono">
      {code}
    </pre>
  </div>
);

/* ═════════════════ Benchmark band — compact scorecard ════════════ */

const PERF_BAND: {
  fixture: string;
  files: string;
  v01: number;
  v02: number;
  lead?: boolean;
}[] = [
  { fixture: '10k LOC', files: '448 files', v01: 1.31, v02: 1.21 },
  {
    fixture: '100k LOC',
    files: '4 465 files',
    v01: 20.58,
    v02: 11.13,
    lead: true,
  },
];

const PerfBand: React.FC = () => (
  <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-black/30">
    <div className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] gap-x-4 px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
      <span>Fixture</span>
      <span className="text-right">v0.1</span>
      <span className="text-right">v0.2</span>
      <span className="text-right">Δ median</span>
    </div>
    {PERF_BAND.map((r, i) => {
      const delta = ((r.v01 - r.v02) / r.v01) * 100;
      return (
        <div
          key={r.fixture}
          className={`grid grid-cols-[1.6fr_1fr_1fr_0.8fr] gap-x-4 px-5 py-4 items-center ${
            i < PERF_BAND.length - 1 ? 'border-b border-white/[0.05]' : ''
          } ${r.lead ? 'bg-white/[0.022]' : ''}`}
        >
          <div>
            <p
              className={`text-sm font-medium ${
                r.lead ? 'text-white' : 'text-neutral-300'
              }`}
            >
              {r.fixture}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{r.files}</p>
          </div>
          <p className="text-right text-sm tabular-nums text-neutral-400">
            {r.v01.toFixed(2)}s
          </p>
          <p className="text-right text-sm tabular-nums text-white font-medium">
            {r.v02.toFixed(2)}s
          </p>
          <p
            className={`text-right font-mono text-xs tabular-nums ${
              delta > 5 ? 'text-emerald-400/90' : 'text-neutral-500'
            }`}
          >
            −{delta.toFixed(0)}%
          </p>
        </div>
      );
    })}
  </div>
);

/* ═════════════════ Visual: Comparison Chart (monochrome) ══════════ */

const ComparisonChart: React.FC = () => {
  const v01Runs = [38.65, 24.66, 20.58, 17.58, 14.99];
  const v02Runs = [13.14, 11.2, 11.13, 10.61, 10.56];
  const v01Median = 20.58;
  const v02Median = 11.13;
  const maxY = 42;

  const w = 560;
  const h = 320;
  const padL = 48;
  const padR = 16;
  const padT = 30;
  const padB = 36;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const groups = ['v0.1.0-beta.2', 'v0.2.0'];
  const groupW = chartW / groups.length;

  const xForRun = (gIdx: number, rIdx: number) => {
    const groupStart = padL + gIdx * groupW;
    const innerPad = 26;
    const inner = groupW - innerPad * 2;
    const step = inner / (5 - 1);
    return groupStart + innerPad + rIdx * step;
  };
  const yFor = (val: number) => padT + chartH - (val / maxY) * chartH;

  const yTicks = [0, 10, 20, 30, 40];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="rfn-dot-old" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
        <linearGradient id="rfn-dot-new" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(74, 222, 128, 0.55)" />
          <stop offset="100%" stopColor="rgba(74, 222, 128, 0.08)" />
        </linearGradient>
      </defs>

      {yTicks.map((t) => (
        <g key={t}>
          <line
            x1={padL}
            x2={w - padR}
            y1={yFor(t)}
            y2={yFor(t)}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
          <text
            x={padL - 8}
            y={yFor(t) + 4}
            fontSize="10"
            fontFamily={MONO}
            textAnchor="end"
            fill="rgba(255,255,255,0.4)"
          >
            {t}s
          </text>
        </g>
      ))}

      <line
        x1={padL + groupW}
        x2={padL + groupW}
        y1={padT}
        y2={padT + chartH}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {v01Runs.map((r, i) => (
        <circle
          key={`v01-${i}`}
          cx={xForRun(0, i)}
          cy={yFor(r)}
          r="5"
          fill="url(#rfn-dot-old)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        />
      ))}
      <line
        x1={padL + 16}
        x2={padL + groupW - 16}
        y1={yFor(v01Median)}
        y2={yFor(v01Median)}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
      />
      <text
        x={padL + groupW - 12}
        y={yFor(v01Median) - 6}
        fontSize="10"
        fontFamily={MONO}
        textAnchor="end"
        fill="rgba(255,255,255,0.55)"
      >
        {v01Median.toFixed(2)}s
      </text>

      {v02Runs.map((r, i) => (
        <circle
          key={`v02-${i}`}
          cx={xForRun(1, i)}
          cy={yFor(r)}
          r="5"
          fill="url(#rfn-dot-new)"
          stroke="rgba(74, 222, 128, 0.95)"
          strokeWidth="1"
        />
      ))}
      <line
        x1={padL + groupW + 16}
        x2={padL + 2 * groupW - 16}
        y1={yFor(v02Median)}
        y2={yFor(v02Median)}
        stroke="rgba(74, 222, 128, 0.95)"
        strokeWidth="1.5"
      />
      <text
        x={padL + 2 * groupW - 12}
        y={yFor(v02Median) - 6}
        fontSize="10"
        fontFamily={MONO}
        textAnchor="end"
        fill="rgba(74, 222, 128, 0.95)"
      >
        {v02Median.toFixed(2)}s
      </text>

      {groups.map((g, i) => (
        <text
          key={g}
          x={padL + groupW * (i + 0.5)}
          y={h - 12}
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="2"
          textAnchor="middle"
          fill={i === 1 ? 'rgba(74, 222, 128, 0.95)' : 'rgba(255,255,255,0.5)'}
        >
          {g.toUpperCase()}
        </text>
      ))}
    </svg>
  );
};

/* ═════════════════ Visual: Results Table (monochrome) ═════════════ */

interface Row {
  label: string;
  files: string;
  v01: number;
  v02: number;
  runs: number[];
  cap: number;
  highlight?: boolean;
}

const ResultsTable: React.FC<{ rows: Row[] }> = ({ rows }) => (
  <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-white/[0.018]">
    <div className="grid grid-cols-[1.6fr_repeat(2,minmax(0,1fr))_1.7fr_70px] gap-x-4 px-6 py-3.5 border-b border-white/[0.07] bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
      <span>Fixture</span>
      <span className="text-right">v0.1</span>
      <span className="text-right">v0.2</span>
      <span className="text-right">Spread (5 runs)</span>
      <span className="text-right">Δ</span>
    </div>
    {rows.map((r, i) => {
      const speedup = ((r.v01 - r.v02) / r.v01) * 100;
      return (
        <div
          key={r.label}
          className={`grid grid-cols-[1.6fr_repeat(2,minmax(0,1fr))_1.7fr_70px] gap-x-4 px-6 py-6 items-center text-sm ${
            i < rows.length - 1 ? 'border-b border-white/[0.05]' : ''
          } ${r.highlight ? 'bg-white/[0.03]' : ''}`}
        >
          <div>
            <p
              className={`text-base ${
                r.highlight ? 'text-white' : 'text-neutral-200'
              } font-medium`}
            >
              {r.label}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{r.files}</p>
          </div>
          <p className="text-right text-neutral-400 tabular-nums">
            {r.v01.toFixed(2)}s
          </p>
          <p
            className={`text-right tabular-nums font-medium ${
              r.highlight ? 'text-white' : 'text-neutral-200'
            }`}
          >
            {r.v02.toFixed(2)}s
          </p>
          <div>
            <div className="flex items-end gap-1 h-7">
              {r.runs.map((run, j) => (
                <div
                  key={j}
                  className={`flex-1 rounded-sm bg-gradient-to-t ${
                    r.highlight
                      ? 'from-emerald-400/35 to-emerald-400/5'
                      : 'from-white/[0.22] to-white/[0.05]'
                  }`}
                  style={{
                    height: `${Math.max(18, (run / r.cap) * 100)}%`,
                  }}
                  title={`Run ${j + 1}: ${run}s`}
                />
              ))}
            </div>
            <p className="text-[10px] text-neutral-500 tabular-nums mt-1.5 text-right">
              {Math.min(...r.runs).toFixed(2)}–
              {Math.max(...r.runs).toFixed(2)}s
            </p>
          </div>
          <p
            className={`text-right font-mono text-[11px] tabular-nums ${
              speedup > 5 ? 'text-emerald-400/95' : 'text-neutral-500'
            }`}
          >
            {speedup > 0 ? '−' : '+'}
            {Math.abs(speedup).toFixed(0)}%
          </p>
        </div>
      );
    })}
  </div>
);

/* ═════════════════ Visual: Pipeline Hero (monochrome) ═════════════ */

const PipelineHero: React.FC = () => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 sm:p-10">
    <svg
      viewBox="0 0 1000 240"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="rfn-pipe-line-mono" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.32)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
        </linearGradient>
        <radialGradient id="rfn-pipe-glow-mono" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <path
        d="M 150 120 C 350 120, 350 120, 500 120 C 650 120, 650 120, 850 120"
        fill="none"
        stroke="url(#rfn-pipe-line-mono)"
        strokeWidth="1.5"
      />

      {[150, 500, 850].map((x) => (
        <line
          key={x}
          x1={x}
          x2={x}
          y1={110}
          y2={130}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
      ))}

      {[
        { cx: 150, label: 'ANALYZE', median: '0.16s', accent: false },
        { cx: 500, label: 'PLAN', median: '1.70s', accent: false },
        { cx: 850, label: 'APPLY', median: '3.38s', accent: true },
      ].map((n) => (
        <g key={n.label}>
          {n.accent && (
            <circle cx={n.cx} cy="120" r="58" fill="url(#rfn-pipe-glow-mono)" />
          )}
          <circle
            cx={n.cx}
            cy="120"
            r="40"
            fill="rgba(0,0,0,1)"
            stroke={
              n.accent ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)'
            }
            strokeWidth={n.accent ? '1.5' : '1'}
          />
          <circle
            cx={n.cx}
            cy="120"
            r="5"
            fill={n.accent ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
          />
          <text
            x={n.cx}
            y="50"
            textAnchor="middle"
            fontSize="11"
            fontFamily={MONO}
            letterSpacing="3"
            fill={n.accent ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)'}
          >
            {n.label}
          </text>
          <text
            x={n.cx}
            y="210"
            textAnchor="middle"
            fontSize="28"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="-1"
            fill={n.accent ? 'white' : 'rgba(255,255,255,0.92)'}
          >
            {n.median}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

/* ═════════════════ Visual: 3-Gate Diagram (monochrome) ════════════ */

const ThreeGateDiagram: React.FC = () => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6 sm:p-10">
    <svg
      viewBox="0 0 1100 320"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="rfn-gate-line-mono" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(74, 222, 128, 0.7)" />
        </linearGradient>
      </defs>

      <line
        x1="100"
        x2="1000"
        y1="120"
        y2="120"
        stroke="url(#rfn-gate-line-mono)"
        strokeWidth="2"
      />

      {[330, 540, 750].map((x) => (
        <g key={`fail-${x}`}>
          <path
            d={`M ${x} 150 Q ${x} 200, ${x} 250`}
            fill="none"
            stroke="rgba(244, 63, 94, 0.45)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          <circle cx={x} cy="260" r="3" fill="rgba(244, 63, 94, 0.7)" />
        </g>
      ))}

      {[
        { cx: 100, label: 'PLAN', sub: 'RefactorPlan', tone: 'muted' },
        { cx: 330, label: 'GATE 01', sub: 'syntax', tone: 'normal' },
        { cx: 540, label: 'GATE 02', sub: 'imports', tone: 'normal' },
        { cx: 750, label: 'GATE 03', sub: 'tests', tone: 'normal' },
        { cx: 1000, label: 'WRITE', sub: 'atomic', tone: 'accent' },
      ].map((n) => {
        const stroke =
          n.tone === 'accent'
            ? 'rgba(74, 222, 128, 0.85)'
            : n.tone === 'muted'
            ? 'rgba(255,255,255,0.14)'
            : 'rgba(255,255,255,0.28)';
        const labelFill =
          n.tone === 'accent'
            ? 'rgba(74, 222, 128, 0.95)'
            : n.tone === 'muted'
            ? 'rgba(255,255,255,0.45)'
            : 'rgba(255,255,255,0.7)';
        return (
          <g key={n.label}>
            <rect
              x={n.cx - 50}
              y="90"
              width="100"
              height="60"
              rx="14"
              fill="rgba(0,0,0,1)"
              stroke={stroke}
              strokeWidth={n.tone === 'accent' ? '1.5' : '1'}
            />
            <text
              x={n.cx}
              y="116"
              textAnchor="middle"
              fontSize="10"
              fontFamily={MONO}
              letterSpacing="2.5"
              fill={labelFill}
            >
              {n.label}
            </text>
            <text
              x={n.cx}
              y="134"
              textAnchor="middle"
              fontSize="10"
              fontFamily={MONO}
              fill="rgba(255,255,255,0.4)"
            >
              {n.sub}
            </text>
          </g>
        );
      })}

      <text
        x="540"
        y="288"
        textAnchor="middle"
        fontSize="10"
        fontFamily={MONO}
        letterSpacing="2.5"
        fill="rgba(244, 63, 94, 0.85)"
      >
        FAIL · tree untouched
      </text>
      <text
        x="100"
        y="60"
        textAnchor="middle"
        fontSize="10"
        fontFamily={MONO}
        letterSpacing="2.5"
        fill="rgba(255,255,255,0.45)"
      >
        INPUT
      </text>
      <text
        x="1000"
        y="60"
        textAnchor="middle"
        fontSize="10"
        fontFamily={MONO}
        letterSpacing="2.5"
        fill="rgba(74, 222, 128, 0.95)"
      >
        PASS · all three
      </text>
    </svg>
  </div>
);

const PipelineCard: React.FC<{
  step: string;
  label: string;
  cmd: string;
  median: string;
  detail: string;
  accent?: boolean;
}> = ({ step, label, cmd, median, detail, accent }) => (
  <div
    className={`rounded-2xl border p-6 transition-colors ${
      accent
        ? 'border-white/[0.18] bg-white/[0.03] hover:border-white/[0.3]'
        : 'border-white/[0.07] bg-white/[0.018] hover:border-white/[0.14] hover:bg-white/[0.035]'
    }`}
  >
    <div className="flex items-baseline justify-between mb-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600">
        {step}
      </p>
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
          accent ? 'text-white' : 'text-neutral-500'
        }`}
      >
        {label}
      </p>
    </div>
    <p className="font-mono text-[11px] text-neutral-500 mb-5 truncate">
      {cmd}
    </p>
    <p className="text-4xl font-semibold tracking-tight text-white tabular-nums mb-2">
      {median}
    </p>
    <p className="text-xs text-neutral-500">{detail}</p>
  </div>
);

export default ResearchPerf01Page;
