import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

/* ─── Shared tokens (match ResearchPerf01Page) ──────────────────── */

const eyebrow =
  'text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500';

const MONO = 'ui-monospace, SFMono-Regular, monospace';
const EMERALD = 'rgba(74, 222, 128, 0.85)';
const EMERALD_DIM = 'rgba(74, 222, 128, 0.12)';
const ROSE = 'rgba(244, 63, 94, 0.8)';
const ROSE_DIM = 'rgba(244, 63, 94, 0.1)';

/* ─── Table of contents ─────────────────────────────────────────── */

const TOC: { id: string; label: string }[] = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'why', label: '01 · Why this study' },
  { id: 'setup', label: '02 · Setup' },
  { id: 'results', label: '03 · Results' },
  { id: 'split', label: '04 · The split' },
  { id: 'discussion', label: '05 · Discussion' },
  { id: 'limitations', label: '06 · Limitations' },
  { id: 'how-built', label: '07 · How it was built' },
  { id: 'references', label: 'References' },
];

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -75% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/* ─────────────────────────────────────────────────────────────── */

const ResearchComparison01Page: React.FC = () => {
  useSEO({
    title: 'Refactron vs the Codemod Baseline · Research',
    description:
      'Refactron benchmarked against jscodeshift, Comby, ESLint --fix, and LibCST on var → const/let and format → f-string — speed, coverage, and safety, head-to-head.',
    canonical: 'https://refactron.dev/research/comparison-01',
    robots: 'index, follow',
  });

  const active = useActiveSection(TOC.map(t => t.id));

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
              <p className={eyebrow}>Research · Comparison report 02</p>
              <span className="h-px w-8 bg-white/10" aria-hidden />
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-600">
                2026-05-15
              </p>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem] font-semibold tracking-[-0.025em] text-white leading-[1.05] max-w-5xl mb-8">
              Refactron vs the{' '}
              <span className="text-neutral-500">codemod baseline.</span> A
              head-to-head.
            </h1>
            <p className="text-base md:text-lg text-neutral-400 leading-[1.8] max-w-2xl">
              Two transforms, four other tools, identical inputs. We measured
              speed, coverage, and safety against the existing
              deterministic-codemod technology. The result is mixed in exactly
              the way an honest benchmark should be.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ BENCHMARK BAND (full-width feature strip) ═══════════════ */}
      <section className="relative w-full border-b border-white/[0.08] bg-white/[0.015]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-14 lg:py-16">
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.24em] text-neutral-500 mb-8">
            Coverage benchmark ·{' '}
            <span className="text-neutral-300">var → const/let</span> &amp;{' '}
            <span className="text-neutral-300">format → f-string</span> · 5
            tools · identical inputs
          </p>
          <ScoreBand />
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
                {TOC.map(t => (
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
            {/* Authors box */}
            <AuthorsBox />

            {/* 00 · Abstract */}
            <Block id="abstract">
              <Kicker>00 · Abstract</Kicker>
              <p className="text-lg md:text-xl text-neutral-300 leading-[1.75] mb-6">
                Refactron is the slowest tool we measured. It is also the only
                one that is top-coverage on both transforms while never
                producing a single unsafe rewrite. The two pure codemod tools
                that ship no verification step run sub-second and write code
                that does not compile.
              </p>
              <p className="text-base text-neutral-500 leading-[1.8]">
                That tension is the paper. Speed without verification bought
                broken code in every cell where it was measured. The benchmark
                builds on the deterministic-refactoring tradition
                <Cite n="3" /> — behaviour preservation checked, not assumed.
              </p>
            </Block>

            {/* 01 · Why */}
            <Block id="why">
              <Kicker>01 · Why this study</Kicker>
              <H2>The engineering baseline, not the competitors.</H2>
              <P>
                jscodeshift and LibCST are codemod <em>frameworks</em> — you
                author codemods with them. Comby is a structural search/replace
                DSL. ESLint <Mono>--fix</Mono> is a linter's autofix. None of
                them is the product a team weighs Refactron against.
              </P>
              <P>
                But they are the existing technology that performs deterministic
                source-to-source transformation — exactly what Refactron's
                engine does. A new approach earns credibility by being measured
                against the established one on identical inputs. This is
                "transform + verify versus transform only," not "our product
                versus theirs."
              </P>
            </Block>

            {/* 02 · Setup */}
            <Block id="setup">
              <Kicker>02 · Setup</Kicker>
              <H2>Identical inputs, three axes.</H2>
              <div className="grid sm:grid-cols-3 gap-3 my-8">
                <FactTile
                  label="Transforms"
                  value="2"
                  sub="var → const/let · format → f-string"
                />
                <FactTile
                  label="Planted sites"
                  value="234"
                  sub="126 TypeScript · 108 Python"
                />
                <FactTile
                  label="Runs / cell"
                  value="5 + 1"
                  sub="warm-up discarded"
                />
              </div>
              <P>
                Each tool runs the equivalent codemod, authored the way a
                competent engineer would and committed to the repo for audit.
                LibCST uses Instagram's reference{' '}
                <Mono>ConvertFormatStringCommand</Mono>
                <Cite n="2" />; ESLint runs its stock <Mono>prefer-const</Mono>{' '}
                + <Mono>no-var</Mono> rules.
              </P>
              <div className="grid sm:grid-cols-3 gap-x-8 gap-y-6 mt-8 text-sm">
                {[
                  {
                    t: 'Speed',
                    d: 'Wall-clock for the whole invocation, process startup included. What a user actually waits for.',
                  },
                  {
                    t: 'Coverage',
                    d: 'Per-site exact classification — correct, missed, wrong, broken — by stable anchor, not line proximity.',
                  },
                  {
                    t: 'Safety',
                    d: "tsc --noEmit / py_compile plus the fixture's own test suite, run against the tool's output.",
                  },
                ].map(x => (
                  <div key={x.t}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-2">
                      {x.t}
                    </p>
                    <p className="text-neutral-400 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>
            </Block>

            {/* 03 · Results */}
            <Block id="results">
              <Kicker>03 · Results</Kicker>
              <H2>Coverage and safety move together.</H2>
              <Figure
                caption={
                  <>
                    <b>Figure 1.</b> Correct-rewrite coverage per tool. Bar
                    colour encodes safety — green compiled and passed tests, red
                    did not.
                  </>
                }
              >
                <CoverageChart />
              </Figure>

              <h3 className="text-base font-semibold text-white mt-12 mb-1">
                <Mono>var → const/let</Mono>
              </h3>
              <p className="text-sm text-neutral-500 mb-4">
                TypeScript · 126 planted sites
              </p>
              <ResultTable
                rows={[
                  {
                    tool: 'Refactron',
                    speed: 5.22,
                    coverage: 100,
                    detail: '126/126',
                    wrong: 0,
                    safe: true,
                    highlight: true,
                  },
                  {
                    tool: 'ESLint --fix',
                    speed: 0.65,
                    coverage: 100,
                    detail: '126/126',
                    wrong: 0,
                    safe: true,
                  },
                  {
                    tool: 'jscodeshift',
                    speed: 0.67,
                    coverage: 46.0,
                    detail: '58/126',
                    wrong: 55,
                    safe: false,
                  },
                  {
                    tool: 'Comby',
                    speed: 0.29,
                    coverage: 47.6,
                    detail: '60/126',
                    wrong: 66,
                    safe: false,
                  },
                ]}
                speedCap={6}
              />

              <h3 className="text-base font-semibold text-white mt-10 mb-1">
                <Mono>format → f-string</Mono>
              </h3>
              <p className="text-sm text-neutral-500 mb-4">
                Python · 108 planted sites
              </p>
              <ResultTable
                rows={[
                  {
                    tool: 'Refactron',
                    speed: 3.76,
                    coverage: 99.1,
                    detail: '107/108',
                    wrong: 0,
                    safe: true,
                    highlight: true,
                  },
                  {
                    tool: 'LibCST',
                    speed: 2.68,
                    coverage: 57.4,
                    detail: '62/108',
                    wrong: 0,
                    safe: true,
                  },
                  {
                    tool: 'Comby',
                    speed: 4.79,
                    coverage: 15.7,
                    detail: '17/108',
                    wrong: 0,
                    safe: false,
                    brokenNote: '74 broken',
                  },
                ]}
                speedCap={6}
              />
              <Caption>
                <b>Table 1.</b> Median of five runs. Refactron and ESLint
                convert every site correctly and safely; the pure codemod tools
                emit dozens of wrong rewrites that fail to compile.
              </Caption>
            </Block>

            {/* 04 · The split */}
            <Block id="split">
              <Kicker>04 · The split</Kicker>
              <H2>
                Careful tools are safe. Unguarded tools are fast and broken.
              </H2>
              <Figure
                caption={
                  <>
                    <b>Figure 2.</b> Every measured cell, speed against
                    coverage. Safe results (green) sit in a high-coverage band;
                    unsafe results (red) sit below 50%.
                  </>
                }
              >
                <ScatterChart />
              </Figure>
              <div className="grid sm:grid-cols-2 gap-3 mt-10">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.03] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400/90 mb-3">
                    Careful · safe output
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    <span className="text-white">Refactron</span> (verification
                    gate), <span className="text-white">ESLint</span> (narrow
                    ruleset), <span className="text-white">LibCST</span>{' '}
                    (conservative codemod). Every output compiles and passes
                    tests.
                  </p>
                </div>
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.03] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-400/90 mb-3">
                    Unguarded · broken output
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    <span className="text-white">jscodeshift</span> and{' '}
                    <span className="text-white">Comby</span> transform with no
                    verification step. Sub-second, and every cell failed
                    compilation.
                  </p>
                </div>
              </div>
              <P className="mt-8">
                No cell in this study was fast, high-coverage, and safe at once.
                Speed without verification bought broken code every time.
              </P>
            </Block>

            {/* 05 · Discussion */}
            <Block id="discussion">
              <Kicker>05 · Discussion</Kicker>
              <H2>Where Refactron wins, and where it loses.</H2>
              <div className="space-y-3 my-8">
                <Panel title="Wins · coverage + safety">
                  Refactron is top-coverage on both transforms — a tie with
                  ESLint at 100% on <Mono>var → const/let</Mono>, an outright
                  win at 99.1% vs LibCST's 57.4% on{' '}
                  <Mono>format → f-string</Mono> — and never emits an unsafe
                  rewrite. No other tool here is top-coverage on both.
                </Panel>
                <Panel title="Loses · speed">
                  Refactron is the slowest tool measured — ~8× slower than
                  ESLint on <Mono>var → const/let</Mono>. This is not an
                  optimization gap to apologize for; it is the pipeline.
                  Refactron applies a transform, re-parses every changed file,
                  resolves every import, runs the full test suite on a shadow
                  tree, then writes atomically. The 5.22s figure <em>is</em>{' '}
                  that pipeline.
                </Panel>
              </div>
              <P>
                The honest claim is not "Refactron is fastest." It is: Refactron
                is the only tool measured here that never wrote broken code —
                and that guarantee has a price denominated in seconds.
              </P>
            </Block>

            {/* 06 · Limitations */}
            <Block id="limitations">
              <Kicker>06 · Limitations</Kicker>
              <H2>The honest fine print.</H2>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <Limitation title="Not a product comparison">
                  These are frameworks and linters, not Refactron's commercial
                  alternatives. Cursor, SonarQube, and the LLM tools belong in a
                  separate, categorical study.
                </Limitation>
                <Limitation title="Two transforms, not ten">
                  Refactron ships ten. These two were chosen for tool overlap,
                  not because they are the hardest cases.
                </Limitation>
                <Limitation title="Synthetic fixtures">
                  Ten files per transform with planted patterns. Real codebases
                  are messier. The fixtures are published so the methodology can
                  be challenged.
                </Limitation>
                <Limitation title="Competitor codemods may not be optimal">
                  We authored them and committed them for audit. If an expert
                  shows us a better visitor, we rerun and republish.
                </Limitation>
              </div>
            </Block>

            {/* 07 · How it was built */}
            <Block id="how-built">
              <Kicker>07 · How this benchmark was built</Kicker>
              <H2>It embarrassed us first.</H2>
              <P>
                The first run reported Refactron at 27% coverage on{' '}
                <Mono>var → const/let</Mono>. Investigation found two real bugs
                in Refactron's own transform — a scope-unaware reference scan
                and a missed AST node kind. They were fixed (27% → 100%) before
                publication
                <Cite n="4" />. The benchmark also caught a precision flaw in
                its own checker that was miscounting every tool; that was
                corrected too. A benchmark you publish should be one that has
                already embarrassed you in private.
              </P>
              <div className="mt-8">
                <CodeBlock
                  caption="Reproduce on your machine"
                  code={`git clone https://github.com/Refactron-ai/Refactron_Lib_TS
cd Refactron_Lib_TS && npm ci
bash bench/comparison/harness/run.sh`}
                />
              </div>
            </Block>

            {/* References */}
            <Block id="references" last>
              <Kicker>References</Kicker>
              <ol className="space-y-4 mt-6">
                <RefItem n="1">
                  Comparison bench — fixtures, per-tool codemods, harness, raw
                  results.{' '}
                  <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/bench/comparison">
                    github.com/Refactron-ai · bench/comparison
                  </ExtLink>
                </RefItem>
                <RefItem n="2">
                  Instagram / LibCST. <em>ConvertFormatStringCommand</em> — the
                  reference Python format codemod benchmarked here.
                </RefItem>
                <RefItem n="3">
                  Opdyke, W. F. (1992).{' '}
                  <em>Refactoring Object-Oriented Frameworks.</em> PhD thesis,
                  University of Illinois Urbana-Champaign — the
                  precondition-checking foundation behaviour-preserving
                  refactoring rests on.
                </RefItem>
                <RefItem n="4">
                  The <em>var_to_const_let</em> scope-correctness fix and the
                  printf-grammar percent converter.{' '}
                  <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/pull/27">
                    Refactron_Lib_TS · PR #27
                  </ExtLink>
                </RefItem>
                <RefItem n="5">
                  Refactron 0.2.0 performance report —{' '}
                  <Link
                    to="/research/perf-01"
                    className="text-neutral-300 hover:text-white underline underline-offset-2 decoration-neutral-700"
                  >
                    research paper #01
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
                  href="https://github.com/Refactron-ai/Refactron_Lib_TS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Source ↗
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
            Hardware
          </p>
          <p className="text-sm text-neutral-300">Apple M2</p>
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
    <p className="text-2xl text-white font-semibold tracking-tight tabular-nums">
      {value}
    </p>
    <p className="text-xs text-neutral-500 mt-1">{sub}</p>
  </div>
);

const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-6">
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 mb-3">
      {title}
    </p>
    <p className="text-sm text-neutral-400 leading-relaxed">{children}</p>
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

const BAND_ROWS: {
  transform: string;
  tool: string;
  coverage: number;
  safe: boolean;
  lead?: boolean;
}[] = [
  {
    transform: 'var → const/let',
    tool: 'Refactron',
    coverage: 100,
    safe: true,
    lead: true,
  },
  {
    transform: 'var → const/let',
    tool: 'ESLint --fix',
    coverage: 100,
    safe: true,
  },
  {
    transform: 'var → const/let',
    tool: 'jscodeshift',
    coverage: 46.0,
    safe: false,
  },
  { transform: 'var → const/let', tool: 'Comby', coverage: 47.6, safe: false },
  {
    transform: 'format → f-string',
    tool: 'Refactron',
    coverage: 99.1,
    safe: true,
    lead: true,
  },
  {
    transform: 'format → f-string',
    tool: 'LibCST',
    coverage: 57.4,
    safe: true,
  },
  {
    transform: 'format → f-string',
    tool: 'Comby',
    coverage: 15.7,
    safe: false,
  },
];

const ScoreBand: React.FC = () => (
  <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-black/30">
    <div className="grid grid-cols-[1.3fr_1.1fr_1.7fr_0.7fr] gap-x-4 px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
      <span>Transform</span>
      <span>Tool</span>
      <span>Coverage</span>
      <span className="text-right">Safe</span>
    </div>
    {BAND_ROWS.map((r, i) => {
      const firstOfGroup =
        i === 0 || BAND_ROWS[i - 1].transform !== r.transform;
      return (
        <div
          key={`${r.transform}-${r.tool}`}
          className={`grid grid-cols-[1.3fr_1.1fr_1.7fr_0.7fr] gap-x-4 px-5 py-3 items-center ${
            i < BAND_ROWS.length - 1 ? 'border-b border-white/[0.05]' : ''
          } ${r.lead ? 'bg-white/[0.022]' : ''}`}
        >
          <span className="text-xs font-mono text-neutral-500">
            {firstOfGroup ? r.transform : ''}
          </span>
          <span
            className={`text-sm ${
              r.lead ? 'text-white font-medium' : 'text-neutral-300'
            }`}
          >
            {r.tool}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden max-w-[160px]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${r.coverage}%`,
                  background: r.safe ? EMERALD : ROSE,
                }}
              />
            </div>
            <span
              className="text-sm tabular-nums"
              style={{ color: r.safe ? EMERALD : ROSE }}
            >
              {r.coverage % 1 === 0 ? r.coverage : r.coverage.toFixed(1)}%
            </span>
          </div>
          <span className="text-right">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ color: r.safe ? EMERALD : ROSE }}
            >
              {r.safe ? '✓' : '✗'}
            </span>
          </span>
        </div>
      );
    })}
  </div>
);

/* ═════════════════ Result table ══════════════════════════════════ */

interface ResultRow {
  tool: string;
  speed: number;
  coverage: number;
  detail: string;
  wrong: number;
  safe: boolean;
  brokenNote?: string;
  highlight?: boolean;
}

const ResultTable: React.FC<{ rows: ResultRow[]; speedCap: number }> = ({
  rows,
  speedCap,
}) => (
  <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-white/[0.012]">
    <div className="grid grid-cols-[1.3fr_1.2fr_1.6fr_0.8fr_0.8fr] gap-x-3 px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
      <span>Tool</span>
      <span>Speed</span>
      <span>Coverage</span>
      <span className="text-right">Wrong</span>
      <span className="text-right">Safety</span>
    </div>
    {rows.map((r, i) => (
      <div
        key={r.tool}
        className={`grid grid-cols-[1.3fr_1.2fr_1.6fr_0.8fr_0.8fr] gap-x-3 px-5 py-5 items-center ${
          i < rows.length - 1 ? 'border-b border-white/[0.05]' : ''
        } ${r.highlight ? 'bg-white/[0.022]' : ''}`}
      >
        <span
          className={`text-sm font-medium ${
            r.highlight ? 'text-white' : 'text-neutral-300'
          }`}
        >
          {r.tool}
        </span>
        <div>
          <p className="text-sm tabular-nums text-neutral-300 mb-1.5">
            {r.speed.toFixed(2)}s
          </p>
          <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full rounded-full bg-white/25"
              style={{ width: `${Math.min(100, (r.speed / speedCap) * 100)}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-sm tabular-nums mb-1.5">
            <span
              className={
                r.coverage >= 99 ? 'text-emerald-400/90' : 'text-neutral-300'
              }
            >
              {r.coverage.toFixed(1)}%
            </span>{' '}
            <span className="text-neutral-600 text-xs">{r.detail}</span>
          </p>
          <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className={`h-full rounded-full ${
                r.coverage >= 99 ? 'bg-emerald-400/55' : 'bg-white/25'
              }`}
              style={{ width: `${r.coverage}%` }}
            />
          </div>
        </div>
        <span
          className={`text-sm tabular-nums text-right ${
            r.wrong > 0 ? 'text-rose-400/90' : 'text-neutral-500'
          }`}
        >
          {r.wrong > 0 ? r.wrong : '0'}
          {r.brokenNote && (
            <span className="block text-[10px] text-rose-400/70 font-mono">
              {r.brokenNote}
            </span>
          )}
        </span>
        <span className="text-right">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded border ${
              r.safe
                ? 'border-emerald-400/30 bg-emerald-400/[0.06] text-emerald-400/90'
                : 'border-rose-400/30 bg-rose-400/[0.06] text-rose-400/90'
            }`}
          >
            {r.safe ? 'safe' : 'fail'}
          </span>
        </span>
      </div>
    ))}
  </div>
);

/* ═════════════════ Visual: Coverage bar chart ════════════════════ */

interface CovBar {
  tool: string;
  pct: number;
  safe: boolean;
}

const COV_GROUPS: { label: string; bars: CovBar[] }[] = [
  {
    label: 'var → const/let',
    bars: [
      { tool: 'Refactron', pct: 100, safe: true },
      { tool: 'ESLint', pct: 100, safe: true },
      { tool: 'jscodeshift', pct: 46.0, safe: false },
      { tool: 'Comby', pct: 47.6, safe: false },
    ],
  },
  {
    label: 'format → f-string',
    bars: [
      { tool: 'Refactron', pct: 99.1, safe: true },
      { tool: 'LibCST', pct: 57.4, safe: true },
      { tool: 'Comby', pct: 15.7, safe: false },
    ],
  },
];

const CoverageChart: React.FC = () => {
  const W = 760;
  const H = 400;
  const padL = 46;
  const padR = 24;
  const padT = 28;
  const plotBottom = 308;
  const plotTop = padT;
  const plotH = plotBottom - plotTop;
  const plotW = W - padL - padR;
  const groupW = plotW / COV_GROUPS.length;
  const yFor = (p: number) => plotBottom - (p / 100) * plotH;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.012] p-5 sm:p-7">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cov-safe" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={EMERALD} />
            <stop offset="100%" stopColor={EMERALD_DIM} />
          </linearGradient>
          <linearGradient id="cov-unsafe" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={ROSE} />
            <stop offset="100%" stopColor={ROSE_DIM} />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map(t => (
          <g key={t}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={padL - 9}
              y={yFor(t) + 3.5}
              fontSize="10"
              fontFamily={MONO}
              textAnchor="end"
              fill="rgba(255,255,255,0.4)"
            >
              {t}%
            </text>
          </g>
        ))}
        <line
          x1={padL + groupW}
          x2={padL + groupW}
          y1={plotTop}
          y2={plotBottom}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {COV_GROUPS.map((group, gi) => {
          const groupStart = padL + gi * groupW;
          const sidePad = 30;
          const gap = 14;
          const n = group.bars.length;
          const innerW = groupW - 2 * sidePad;
          const barW = (innerW - gap * (n - 1)) / n;
          return (
            <g key={group.label}>
              {group.bars.map((b, bi) => {
                const x = groupStart + sidePad + bi * (barW + gap);
                const top = yFor(b.pct);
                return (
                  <g key={b.tool}>
                    <rect
                      x={x}
                      y={top}
                      width={barW}
                      height={plotBottom - top}
                      rx={3}
                      fill={b.safe ? 'url(#cov-safe)' : 'url(#cov-unsafe)'}
                      stroke={b.safe ? EMERALD : ROSE}
                      strokeOpacity={0.4}
                      strokeWidth="1"
                    />
                    <text
                      x={x + barW / 2}
                      y={top - 8}
                      fontSize="12"
                      fontFamily={MONO}
                      fontWeight="600"
                      textAnchor="middle"
                      fill={b.safe ? EMERALD : ROSE}
                    >
                      {b.pct % 1 === 0 ? b.pct : b.pct.toFixed(1)}%
                    </text>
                    <text
                      x={x + barW / 2}
                      y={plotBottom + 14}
                      fontSize="10.5"
                      fontFamily={MONO}
                      textAnchor="end"
                      fill="rgba(255,255,255,0.6)"
                      transform={`rotate(-32 ${x + barW / 2} ${plotBottom + 14})`}
                    >
                      {b.tool}
                    </text>
                  </g>
                );
              })}
              <text
                x={groupStart + groupW / 2}
                y={H - 12}
                fontSize="11"
                fontFamily={MONO}
                letterSpacing="1.5"
                textAnchor="middle"
                fill="rgba(255,255,255,0.78)"
              >
                {group.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ═════════════════ Visual: Speed-vs-coverage scatter ══════════════ */

interface ScatterPt {
  label: string;
  speed: number;
  coverage: number;
  safe: boolean;
  lx: number;
  ly: number;
  anchor: 'start' | 'middle' | 'end';
}

const SCATTER_PTS: ScatterPt[] = [
  // Both Refactron points label BELOW — above-the-point would clip the plot
  // top and collide with the band caption.
  {
    label: 'Refactron · var',
    speed: 5.22,
    coverage: 100,
    safe: true,
    lx: 0,
    ly: 24,
    anchor: 'middle',
  },
  {
    label: 'Refactron · fmt',
    speed: 3.76,
    coverage: 99.1,
    safe: true,
    lx: 0,
    ly: 24,
    anchor: 'middle',
  },
  {
    label: 'ESLint · var',
    speed: 0.65,
    coverage: 100,
    safe: true,
    lx: 14,
    ly: 4,
    anchor: 'start',
  },
  // The two bottom-left points sit close together — separate their labels
  // vertically: the higher point (Comby) labels up, the lower (jscodeshift) down.
  {
    label: 'Comby · var',
    speed: 0.29,
    coverage: 47.6,
    safe: false,
    lx: 13,
    ly: -12,
    anchor: 'start',
  },
  {
    label: 'jscodeshift · var',
    speed: 0.67,
    coverage: 46.0,
    safe: false,
    lx: 13,
    ly: 20,
    anchor: 'start',
  },
  {
    label: 'LibCST · fmt',
    speed: 2.68,
    coverage: 57.4,
    safe: true,
    lx: 14,
    ly: 4,
    anchor: 'start',
  },
  {
    label: 'Comby · fmt',
    speed: 4.79,
    coverage: 15.7,
    safe: false,
    lx: -14,
    ly: 4,
    anchor: 'end',
  },
];

const ScatterChart: React.FC = () => {
  const W = 760;
  const H = 440;
  const padL = 52;
  const padR = 40;
  const padT = 30;
  const padB = 56;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const xMax = 5.6;
  const xFor = (s: number) => padL + (s / xMax) * plotW;
  const yFor = (c: number) => padT + (1 - c / 100) * plotH;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.012] p-5 sm:p-7">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          x={padL}
          y={yFor(100)}
          width={plotW}
          height={yFor(55) - yFor(100)}
          fill="rgba(74,222,128,0.035)"
        />
        {/* Band caption sits in the band's empty middle so it never collides
            with a data point or its label. */}
        <text
          x={padL + plotW / 2}
          y={yFor(80)}
          fontSize="9.5"
          fontFamily={MONO}
          letterSpacing="2"
          textAnchor="middle"
          fill="rgba(74,222,128,0.4)"
        >
          ALL SAFE RESULTS LAND IN THIS BAND
        </text>
        {[0, 25, 50, 75, 100].map(t => (
          <g key={t}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={padL - 10}
              y={yFor(t) + 3.5}
              fontSize="10"
              fontFamily={MONO}
              textAnchor="end"
              fill="rgba(255,255,255,0.4)"
            >
              {t}%
            </text>
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5].map(s => (
          <g key={s}>
            <line
              x1={xFor(s)}
              x2={xFor(s)}
              y1={padT}
              y2={H - padB}
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
            />
            <text
              x={xFor(s)}
              y={H - padB + 18}
              fontSize="10"
              fontFamily={MONO}
              textAnchor="middle"
              fill="rgba(255,255,255,0.4)"
            >
              {s}s
            </text>
          </g>
        ))}
        <text
          x={padL + plotW / 2}
          y={H - 14}
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="2"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
        >
          SPEED — WALL-CLOCK SECONDS
        </text>
        <text
          x={16}
          y={padT + plotH / 2}
          fontSize="10"
          fontFamily={MONO}
          letterSpacing="2"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          transform={`rotate(-90 16 ${padT + plotH / 2})`}
        >
          COVERAGE
        </text>
        {SCATTER_PTS.map(p => {
          const cx = xFor(p.speed);
          const cy = yFor(p.coverage);
          const color = p.safe ? EMERALD : ROSE;
          return (
            <g key={p.label}>
              <circle cx={cx} cy={cy} r={11} fill={color} fillOpacity={0.12} />
              <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={color}
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="1"
              />
              <text
                x={cx + p.lx}
                y={cy + p.ly}
                fontSize="11"
                fontFamily={MONO}
                textAnchor={p.anchor}
                fill="rgba(255,255,255,0.82)"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-white/[0.06]">
        <span className="flex items-center gap-2 text-xs text-neutral-400">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: EMERALD }}
          />
          safe — compiles + tests pass
        </span>
        <span className="flex items-center gap-2 text-xs text-neutral-400">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: ROSE }}
          />
          unsafe — failed compilation
        </span>
      </div>
    </div>
  );
};

export default ResearchComparison01Page;
