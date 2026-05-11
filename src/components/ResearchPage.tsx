import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const ResearchPage: React.FC = () => {
  useSEO({
    title: 'Research | Refactron',
    description:
      'Refactron’s internal research on deterministic refactoring and verification is private today. Public notes, benchmarks, and write-ups are coming soon.',
    canonical: 'https://refactron.dev/research',
    robots: 'index, follow',
  });

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-black bg-grid-white/[0.02] font-space antialiased">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
            Research
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
            <span className="block">We are doing serious work here.</span>
            <span className="block mt-2 sm:mt-3">
              Not everything is ready to share yet.
            </span>
          </h1>
          <p className="text-base md:text-lg text-neutral-400 leading-loose tracking-wide">
            Our work on safe, deterministic refactoring, including verification
            design, transform pipelines, and how we benchmark against real
            codebases, is handled as{' '}
            <span className="text-neutral-300">internal research</span> for now.
            Not everything belongs in a landing page; we&apos;ll publish what we
            can, when it&apos;s ready.
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <Lock className="h-5 w-5 text-neutral-400" aria-hidden />
              </div>
              <h2 className="text-lg font-semibold text-white tracking-tight">
                Why it stays private
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-neutral-400 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                Maps, datasets, and methodology drafts evolve quickly; we avoid
                publishing half-finished claims.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                Some comparisons touch third-party products; we respect
                accurate, sourced framing before putting anything on the record.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                Customer and partner contexts may fall under confidentiality. We
                ship the product first, then share what we can responsibly.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <Sparkles className="h-5 w-5 text-neutral-400" aria-hidden />
              </div>
              <h2 className="text-lg font-semibold text-white tracking-tight">
                What we&apos;ll reveal
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-neutral-400 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                Deeper notes on verification, structural refactor scope, and how
                we think about legacy detection versus lint-only tooling.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                Benchmarks and reproducible summaries where we can stand behind
                the numbers.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                Updates will land here and on{' '}
                <a
                  href="/changelog"
                  className="text-neutral-300 hover:text-white transition-colors underline underline-offset-2 decoration-neutral-600"
                >
                  Changelog
                </a>{' '}
                when they go public, with no treasure hunt required.
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="mt-auto pt-14 border-t border-white/[0.06] flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 text-sm text-neutral-500"
        >
          <Link
            to="/"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            ← Back to home
          </Link>
          <span className="hidden sm:inline text-neutral-700">·</span>
          <a
            href="/#comparison"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Comparison
          </a>
          <span className="hidden sm:inline text-neutral-700">·</span>
          <a
            href="https://docs.refactron.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Documentation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ResearchPage;
