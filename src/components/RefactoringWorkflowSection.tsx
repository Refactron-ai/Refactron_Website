import React from 'react';
import { motion } from 'motion/react';
import {
  ScanSearch,
  Wand2,
  ShieldCheck,
  CheckCircle2,
  GitCommit,
  GitBranch,
  ArrowRight,
} from 'lucide-react';

const RefactoringWorkflowSection = () => {
  return (
    <div className="dark">
      <div className="w-full py-24 relative overflow-hidden h-auto min-h-screen bg-black antialiased bg-grid-white/[0.02]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-20"
          >
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-primary)] font-space leading-[1.1]">
                Everything you need to refactor production code safely.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-10 flex flex-col gap-6">
              <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide">
                AI-assisted, behavior-preserving refactoring with verification,
                rollback, and documentation built in.
              </p>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-neutral-300 transition-colors font-space text-sm tracking-wide"
              >
                Explore the platform <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Deep Analysis (1/3 width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-1 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-8 relative overflow-hidden group flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 text-sky-400/80 group-hover:scale-110 transition-transform duration-300">
                  <ScanSearch className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2 font-space">
                  Deep Analysis
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-space">
                  Refactron scans your architecture, detects technical debt, and
                  prioritizes risk instantly—without altering a single line of
                  code.
                </p>
              </div>

              {/* Real Visualization: Analysis Output */}
              <div className="mt-8 rounded-xl bg-[#0d1117] border border-white/5 p-4 relative overflow-hidden font-mono text-xs">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/20 transition-colors" />
                <div className="space-y-3 relative z-10 text-neutral-300">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="text-neutral-500">❯</span> refactron
                    analyze . --detailed
                  </div>
                  <div className="text-neutral-300">✓ Analyzing myproject/</div>
                  <div className="pl-4 text-neutral-400">
                    Files analyzed: 25
                    <br />
                    Issues found: 12
                  </div>
                  <div className="text-rose-400 font-medium mt-2">
                    CRITICAL (2):
                  </div>
                  <div className="pl-4 text-rose-300/80">
                    - SQL injection vulnerability (line 45)
                    <br />- Hardcoded secret detected (line 78)
                  </div>
                  <div className="text-amber-400 font-medium mt-2">
                    ERROR (4):
                  </div>
                  <div className="pl-4 text-neutral-400">
                    - High cyclomatic complexity (line 120)
                    <br />- Deep nesting detected (line 156)
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Safe Autofix (2/3 width) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-2 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-8 relative overflow-hidden group flex flex-col justify-between min-h-[400px]"
            >
              <div className="md:w-1/2 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400/80 group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2 font-space">
                  Safe Autofix
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-space">
                  Refactron doesn't just guess. It understands your context
                  across files and generates clean, pythonic syntaxes that are
                  guaranteed to preserve origin behavior.
                </p>
              </div>

              {/* Mock Visualization: Code Diff snippet positioned absolutely on md screens */}
              <div className="mt-8 md:mt-0 md:absolute md:right-8 md:top-1/2 md:-translate-y-1/2 rounded-xl bg-[#0d1117] border border-white/10 p-0 overflow-hidden w-full md:w-[45%] lg:w-[48%] shadow-2xl group-hover:-translate-y-[52%] transition-transform duration-500 text-xs font-mono">
                {/* Diff Header */}
                <div className="bg-[#161b22] px-4 py-3 flex flex-col gap-3 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-neutral-500 ml-2">myfile.py</span>
                    </div>
                  </div>
                  <div className="text-neutral-400 border-t border-white/5 pt-2 flex flex-col gap-1">
                    <span className="text-neutral-500">
                      # Preview changes first
                    </span>
                    <span className="text-neutral-300">
                      <span className="text-indigo-400/80">❯</span> refactron
                      refactor myfile.py --preview
                    </span>
                  </div>
                </div>
                {/* Diff Content */}
                <div className="max-h-[220px] overflow-hidden">
                  <div className="bg-rose-500/5 text-rose-300/60 border-rose-500/20 line-through decoration-rose-500/30 px-4 py-1 border-l-2">
                    - def proc_pmt(d, usr):
                    <br />
                    - &nbsp;&nbsp;if d.get('amt') &gt; 0:
                    <br />- &nbsp;&nbsp;&nbsp;&nbsp;return usr.charge(d['amt'])
                  </div>
                  <div className="bg-emerald-500/5 text-emerald-300/80 px-4 py-2 border-l-2 border-emerald-500/20">
                    + def process_payment(data: dict, user: User) -&gt; bool:
                    <br />
                    + &nbsp;&nbsp;amount = data.get('amount', 0)
                    <br />
                    + &nbsp;&nbsp;if amount &gt; 0:
                    <br />
                    + &nbsp;&nbsp;&nbsp;&nbsp;return user.charge(amount)
                    <br />+ &nbsp;&nbsp;return False
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Provable Verification (Full Width Bottom) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-3 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors p-8 pb-0 relative overflow-hidden group"
            >
              <div className="max-w-xl mx-auto text-center relative z-10 mb-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400/80 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2 font-space">
                  Provable Verification
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-space">
                  Every change passes syntax validation, import integrity
                  checks, and your existing test suite before a single file is
                  modified. If anything fails, the original file is never
                  touched.{' '}
                  <code className="text-primary-400 bg-primary-500/10 px-1 py-0.5 rounded">
                    refactron report
                  </code>{' '}
                  and{' '}
                  <code className="text-primary-400 bg-primary-500/10 px-1 py-0.5 rounded">
                    refactron rollback
                  </code>
                  . Never push broken code again.
                </p>
              </div>

              {/* Pipeline Visualization */}
              <div className="relative w-full mx-auto px-4 py-8">
                {/* Steps */}
                <div className="relative flex items-center justify-between">
                  {/* Connecting track */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10 z-0" />
                  {/* Animated fill */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-emerald-500/40 z-0"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />

                  {[
                    {
                      icon: <ScanSearch className="w-4 h-4" />,
                      label: 'Analyze',
                      delay: 0.4,
                    },
                    {
                      icon: <Wand2 className="w-4 h-4" />,
                      label: 'Suggest',
                      delay: 0.8,
                    },
                    {
                      icon: <GitCommit className="w-4 h-4" />,
                      label: 'Refactor',
                      delay: 1.2,
                      active: true,
                    },
                    {
                      icon: <GitBranch className="w-4 h-4" />,
                      label: 'Review',
                      delay: 1.6,
                    },
                    {
                      icon: <CheckCircle2 className="w-4 h-4" />,
                      label: 'Verified',
                      delay: 2.0,
                      success: true,
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: step.delay, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="relative z-10 flex flex-col items-center gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-black transition-all duration-300
                          ${
                            step.success
                              ? 'border-emerald-400/60 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                              : step.active
                                ? 'border-emerald-500/40 text-emerald-400/80'
                                : 'border-white/15 text-neutral-400'
                          }`}
                      >
                        {step.icon}
                      </div>
                      <span
                        className={`text-xs font-mono whitespace-nowrap
                        ${step.success ? 'text-emerald-400/80' : step.active ? 'text-emerald-400/80' : 'text-neutral-500'}`}
                      >
                        {step.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefactoringWorkflowSection;
