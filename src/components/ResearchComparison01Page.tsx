import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

/* ─── Shared tokens (match ResearchPerf01Page) ──────────────────── */

const eyebrow =
  'text-[10px] font-mono uppercase tracking-[0.28em] text-neutral-500';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
};

/* ─────────────────────────────────────────────────────────────── */

const ResearchComparison01Page: React.FC = () => {
  useSEO({
    title: 'Refactron vs the codemod baseline · A head-to-head study | Research',
    description:
      'Refactron benchmarked against jscodeshift, Comby, ESLint --fix, and LibCST on var → const/let and format → f-string. Speed, coverage, and safety on identical inputs. Reproducible.',
    canonical: 'https://refactron.dev/research/comparison-01',
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
      <StaticBeams />

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-24 lg:py-36">
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

          {/* Metadata strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14 pt-8 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-5 gap-x-6"
          >
            <Meta label="Authors">
              <a
                href="https://www.linkedin.com/in/omsherikar0229/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 hover:text-white transition-colors"
              >
                Om Sherikar
              </a>
            </Meta>
            <Meta label="Affiliation">
              <span className="text-neutral-200">Refactron</span>
            </Meta>
            <Meta label="Published">
              <span className="text-neutral-200">2026-05-15</span>
            </Meta>
            <Meta label="Tools">
              <span className="text-neutral-200">5 compared</span>
            </Meta>
            <Meta label="Hardware">
              <span className="text-neutral-200">Apple M2</span>
            </Meta>
            <Meta label="Code">
              <a
                href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/bench/comparison"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700"
              >
                bench/comparison ↗
              </a>
            </Meta>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 00 · ABSTRACT ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-6`}>00 · Abstract</p>
            <p className="text-lg md:text-xl text-neutral-300 leading-[1.75] max-w-3xl">
              Refactron is the slowest tool we measured. It is also the only
              one that is top-coverage on both transforms while never producing
              a single unsafe rewrite. The two pure codemod tools that ship no
              verification step run sub-second and write code that does not
              compile.
            </p>
            <p className="text-base text-neutral-500 leading-[1.8] max-w-2xl mt-6">
              That tension is the paper. Speed without verification bought
              broken code in every cell where it was measured.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 01 · WHY ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>01 · Why this study</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-6">
              The engineering baseline, not the competitors.
            </h2>
            <p className="text-base text-neutral-400 leading-[1.8] max-w-2xl mb-5">
              jscodeshift and LibCST are codemod <em>frameworks</em> — you
              author codemods with them. Comby is a structural search/replace
              DSL. ESLint <Mono>--fix</Mono> is a linter's autofix. None of
              them is the product a team weighs Refactron against.
            </p>
            <p className="text-base text-neutral-400 leading-[1.8] max-w-2xl">
              But they are the existing technology that performs deterministic
              source-to-source transformation — exactly what Refactron's engine
              does. A new approach earns credibility by being measured against
              the established one on identical inputs. This is "transform +
              verify versus transform only," not "our product versus theirs."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 02 · SETUP ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>02 · Setup</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-10">
              Identical inputs, three axes.
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
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

            <div className="grid md:grid-cols-3 gap-x-10 gap-y-7 text-sm">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-2">
                  Speed
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  Wall-clock for the whole invocation, process startup
                  included. What a user actually waits for. Median of five.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-2">
                  Coverage
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  Per-site exact classification — correct, missed, wrong,
                  broken — located by stable anchor, not line proximity.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-2">
                  Safety
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  <Mono>tsc --noEmit</Mono> / <Mono>py_compile</Mono> plus the
                  fixture's own test suite, run against the tool's output.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 03 · RESULTS ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>03 · Results</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-12">
              Coverage and safety move together.
            </h2>

            <h3 className="text-lg font-semibold text-white mb-1">
              <Mono>var → const/let</Mono>
            </h3>
            <p className="text-sm text-neutral-500 mb-5">
              TypeScript · 126 planted sites · jscodeshift, Comby, ESLint
              applicable
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
            <Caption>
              <span className="text-neutral-400 not-italic">Table 1.</span>{' '}
              Refactron and ESLint convert every site correctly and safely. The
              pure codemod tools emit <Mono>const</Mono> on reassigned bindings
              — dozens of wrong rewrites, output that fails to compile.
            </Caption>

            <div className="h-14" />

            <h3 className="text-lg font-semibold text-white mb-1">
              <Mono>format → f-string</Mono>
            </h3>
            <p className="text-sm text-neutral-500 mb-5">
              Python · 108 planted sites · Comby, LibCST applicable
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
              <span className="text-neutral-400 not-italic">Table 2.</span>{' '}
              Refactron converts 107 of 108 (the miss is a nested{' '}
              <Mono>.format()</Mono>). LibCST is safe but only handles plain{' '}
              <Mono>%s</Mono>. Comby emits invalid Python at 74 sites.
            </Caption>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 04 · THE SPLIT ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>04 · The split</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-10">
              Careful tools are safe. Unguarded tools are fast and broken.
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.03] p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400/90 mb-3">
                  Careful · safe output
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed mb-2">
                  <span className="text-white">Refactron</span> — verification
                  gate. <span className="text-white">ESLint</span> — narrow,
                  well-tuned ruleset. <span className="text-white">LibCST</span>{' '}
                  — conservative codemod.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Every output compiles and passes tests.
                </p>
              </div>
              <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.03] p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-400/90 mb-3">
                  Unguarded · broken output
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed mb-2">
                  <span className="text-white">jscodeshift</span> and{' '}
                  <span className="text-white">Comby</span> — transform with no
                  verification step.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Sub-second, and every cell failed compilation.
                </p>
              </div>
            </div>
            <p className="text-base text-neutral-400 leading-[1.8] max-w-2xl mt-8">
              No cell in this study was fast, high-coverage, and safe at once.
              Speed without verification bought broken code every time it was
              measured.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 05 · DISCUSSION ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>05 · Discussion</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-10">
              Where Refactron wins, and where it loses.
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 mb-3">
                  Wins · coverage + safety
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Refactron is top-coverage on both transforms — a tie with
                  ESLint at 100% on <Mono>var → const/let</Mono>, an outright
                  win at 99.1% vs LibCST's 57.4% on{' '}
                  <Mono>format → f-string</Mono> — and never emits an unsafe
                  rewrite. No other tool here is top-coverage on both.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 mb-3">
                  Loses · speed
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Refactron is the slowest tool measured — ~8× slower than
                  ESLint on <Mono>var → const/let</Mono>. This is not an
                  optimization gap to apologize for; it is the pipeline. ESLint
                  applies a fix and stops. Refactron applies a transform,
                  re-parses every changed file, resolves every import, runs the
                  full test suite on a shadow tree, then writes atomically. The
                  5.22s figure <em>is</em> that pipeline. The benchmark's safety
                  column shows what skipping it costs.
                </p>
              </div>
            </div>

            <p className="text-base text-neutral-300 leading-[1.8] max-w-2xl mt-8">
              The honest claim is not "Refactron is fastest." It is: Refactron
              is the only tool measured here that never wrote broken code — and
              that guarantee has a price denominated in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 06 · LIMITATIONS ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>06 · What this doesn't claim</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-10">
              The honest fine print.
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
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
                We authored them and committed them for audit. If a jscodeshift
                expert shows us a better visitor, we rerun and republish.
              </Limitation>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── 07 · HOW IT WAS BUILT ───────────────── */}
      <section className="relative w-full border-b border-white/[0.08]">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20 lg:py-28">
          <motion.div {...fadeUp}>
            <p className={`${eyebrow} mb-4`}>07 · How this benchmark was built</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl leading-[1.1] mb-6">
              It embarrassed us first.
            </h2>
            <p className="text-base text-neutral-400 leading-[1.8] max-w-2xl mb-8">
              The first run reported Refactron at 27% coverage on{' '}
              <Mono>var → const/let</Mono>. Investigation found two real bugs in
              Refactron's own transform — a scope-unaware reference scan and a
              missed AST node kind. They were fixed (27% → 100%) before
              publication. The benchmark also caught a precision flaw in its own
              checker that was miscounting every tool; that was corrected too.
              A benchmark you publish should be one that has already embarrassed
              you in private.
            </p>
            <CodeBlock
              caption="Reproduce on your machine"
              code={`git clone https://github.com/Refactron-ai/Refactron_Lib_TS
cd Refactron_Lib_TS && npm ci
bash bench/comparison/harness/run.sh`}
            />
          </motion.div>
        </div>
      </section>

      {/* ───────────────── REFERENCES / FOOTER ───────────────── */}
      <section className="relative w-full">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 py-20">
          <p className={`${eyebrow} mb-5`}>References &amp; resources</p>
          <ol className="space-y-3 text-xs text-neutral-500 leading-relaxed">
            <Ref n="1">
              Comparison bench — fixtures, per-tool codemods, harness, raw
              results:{' '}
              <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/tree/main/bench/comparison">
                bench/comparison
              </ExtLink>
              .
            </Ref>
            <Ref n="2">
              Refactron 0.2.0 performance report —{' '}
              <Link
                to="/research/perf-01"
                className="text-neutral-400 hover:text-neutral-200 underline underline-offset-2 decoration-neutral-700"
              >
                paper #01
              </Link>
              .
            </Ref>
            <Ref n="3">
              Instagram / LibCST — <Mono>ConvertFormatStringCommand</Mono>, the
              reference Python format codemod benchmarked here.
            </Ref>
            <Ref n="4">
              The <Mono>var_to_const_let</Mono> scope-correctness fix and the
              printf-grammar percent converter:{' '}
              <ExtLink href="https://github.com/Refactron-ai/Refactron_Lib_TS/pull/27">
                PR #27
              </ExtLink>
              .
            </Ref>
          </ol>

          <div className="pt-8 mt-8 border-t border-white/[0.07] flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
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
        </div>
      </section>
    </article>
  );
};

/* ═════════════════ Sub-components ═════════════════════════════════ */

const StaticBeams: React.FC = () => (
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

const Mono: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="font-mono text-[0.88em] text-neutral-300 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08]">
    {children}
  </code>
);

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs text-neutral-500 italic mt-5 pl-4 border-l border-white/[0.08] max-w-2xl leading-relaxed">
    {children}
  </p>
);

const Meta: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div>
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 mb-1.5">
      {label}
    </p>
    <p className="text-sm">{children}</p>
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

const Limitation: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-7">
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
      {title}
    </p>
    <p className="text-sm text-neutral-400 leading-relaxed">{children}</p>
  </div>
);

const Ref: React.FC<{ n: string; children: React.ReactNode }> = ({
  n,
  children,
}) => (
  <li className="grid grid-cols-[28px_1fr] gap-x-3 items-baseline">
    <span className="font-mono text-neutral-700 tabular-nums">[{n}]</span>
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
    className="text-neutral-400 hover:text-neutral-200 underline underline-offset-2 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
  >
    {children}
  </a>
);

const CodeBlock: React.FC<{ caption: string; code: string }> = ({
  caption,
  code,
}) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] overflow-hidden max-w-2xl">
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

/* ═════════════════ Visual: Result table ══════════════════════════ */

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
    {/* Header */}
    <div className="grid grid-cols-[1.4fr_1.3fr_1.6fr_0.9fr_0.8fr] gap-x-4 px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02] font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
      <span>Tool</span>
      <span>Speed</span>
      <span>Coverage</span>
      <span className="text-right">Wrong</span>
      <span className="text-right">Safety</span>
    </div>
    {rows.map((r, i) => (
      <div
        key={r.tool}
        className={`grid grid-cols-[1.4fr_1.3fr_1.6fr_0.9fr_0.8fr] gap-x-4 px-5 py-5 items-center ${
          i < rows.length - 1 ? 'border-b border-white/[0.05]' : ''
        } ${r.highlight ? 'bg-white/[0.022]' : ''}`}
      >
        {/* Tool */}
        <span
          className={`text-sm font-medium ${
            r.highlight ? 'text-white' : 'text-neutral-300'
          }`}
        >
          {r.tool}
        </span>

        {/* Speed — bar + value */}
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

        {/* Coverage — bar + value */}
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

        {/* Wrong */}
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

        {/* Safety */}
        <span className="text-right">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded border ${
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

export default ResearchComparison01Page;
