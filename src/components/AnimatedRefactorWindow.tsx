import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RefactorExample {
  id: number;
  filePath: string;
  removedLine: string;
  addedLine: string;
  summary: string;
}

const EXAMPLES: RefactorExample[] = [
  {
    id: 1,
    filePath: 'refactor/legacy-service.ts',
    removedLine: 'callbackHell(userService, config, logger)',
    addedLine: 'await refactorService.optimize(userService, config)',
    summary: '42 issues auto-detected · 0 breaking changes suggested',
  },
  {
    id: 2,
    filePath: 'payments/billing-job.ts',
    removedLine: 'runMonthlyBillingCron(customScheduler)',
    addedLine: 'await billingJob.runWithRetries({ maxRetries: 3 })',
    summary: 'Reduced 280 lines to 90 · rollbacks enabled',
  },
  {
    id: 3,
    filePath: 'auth/session-manager.ts',
    removedLine: 'manualTokenRotation(store, clock)',
    addedLine: 'await sessionManager.rotateTokensSafely(store)',
    summary: 'Security checks added · test suite still green',
  },
];

const lineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.25 },
  }),
};

const AnimatedRefactorWindow: React.FC = () => {
  const [index, setIndex] = useState(0);
  const example = EXAMPLES[index];

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex(prev => (prev + 1) % EXAMPLES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative rounded-2xl bg-slate-900/95 text-slate-100 shadow-2xl border border-slate-700/80 overflow-hidden">
      <div className="flex items-center gap-1 px-4 py-2 border-b border-slate-800 bg-slate-900/90">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[11px] text-slate-400">
          {example.filePath}
        </span>
      </div>
      <div className="px-4 py-3 text-xs font-mono space-y-1.5">
        <motion.div
          key={example.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-1.5"
        >
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-slate-500"
          >
            <span className="text-slate-600">AI-suggested refactor</span>
          </motion.div>
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <span className="text-slate-500">-</span>{' '}
            <span className="text-red-300 line-through decoration-red-500/60">
              {example.removedLine}
            </span>
          </motion.div>
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={0.35}
          >
            <span className="text-slate-500">+</span>{' '}
            <span className="text-emerald-300">{example.addedLine}</span>
          </motion.div>
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{example.summary}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedRefactorWindow;
