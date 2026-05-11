import React, { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import NumericAsciiBackdrop from './NumericAsciiBackdrop';

type StackId = 'npm' | 'pip';

interface CommandLine {
  comment: string;
  command: string;
}

const STACK_ORDER: StackId[] = ['npm', 'pip'];

const STACKS: Record<
  StackId,
  { tabLabel: string; hint: string; lines: CommandLine[] }
> = {
  npm: {
    tabLabel: 'npm',
    hint: 'Node.js 18+',
    lines: [
      { comment: '# Install', command: 'npm install -g refactron' },
      { comment: '# Analyze your codebase', command: 'refactron analyze .' },
      {
        comment: '# Preview refactors',
        command: 'refactron refactor . --preview',
      },
      {
        comment: '# Apply with verification',
        command: 'refactron refactor . --verify',
      },
    ],
  },
  pip: {
    tabLabel: 'pip',
    hint: 'Python 3.8+',
    lines: [
      { comment: '# Install', command: 'pip install refactron' },
      { comment: '# Analyze your codebase', command: 'refactron analyze .' },
      {
        comment: '# Preview refactors',
        command: 'refactron refactor . --preview',
      },
      {
        comment: '# Apply with verification',
        command: 'refactron refactor . --verify',
      },
    ],
  },
};

const TAB_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c] rounded-sm';

const QuickstartSection: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const [stack, setStack] = useState<StackId>('npm');
  const active = STACKS[stack];

  const focusTab = useCallback((id: StackId) => {
    document.getElementById(`quickstart-tab-${id}`)?.focus();
  }, []);

  const onTabKeyDown = useCallback(
    (e: React.KeyboardEvent, id: StackId) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const i = STACK_ORDER.indexOf(id);
      const next =
        STACK_ORDER[
          (i + (e.key === 'ArrowRight' ? 1 : -1) + STACK_ORDER.length) %
            STACK_ORDER.length
        ];
      setStack(next);
      requestAnimationFrame(() => focusTab(next));
    },
    [focusTab]
  );

  return (
    <section
      id="quickstart"
      className="w-full py-24 lg:py-28 relative overflow-hidden bg-black antialiased font-space"
      aria-labelledby="quickstart-heading"
    >
      <NumericAsciiBackdrop />

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto [contain:layout]"
        >
          <header className="text-center mb-8 md:mb-10">
            <p className="text-[10px] font-mono text-neutral-700 tracking-[0.28em] mb-4">
              QUICKSTART
            </p>
            <h2
              id="quickstart-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-space leading-[1.12]"
            >
              Up and running in 60 seconds.
            </h2>
          </header>

          <div className="relative rounded-[24px] lg:rounded-[28px] border border-white/[0.06] bg-white/[0.012] overflow-hidden">
            {/* Static dot grid — matches Workflow / WhatWeDo / Comparison */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-[0.35]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="relative z-10">
              <div
                className="flex border-b border-white/[0.06] bg-white/[0.02]"
                role="tablist"
                aria-label="Install with npm or pip"
              >
                {STACK_ORDER.map(id => {
                  const isActive = stack === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`quickstart-panel`}
                      id={`quickstart-tab-${id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setStack(id)}
                      onKeyDown={e => onTabKeyDown(e, id)}
                      className={`relative flex-1 px-3 sm:px-5 py-3.5 text-[12px] sm:text-[13px] font-mono tracking-wide transition-colors min-h-[48px] ${TAB_FOCUS} ${
                        isActive
                          ? 'text-neutral-100'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {STACKS[id].tabLabel}
                      <span
                        className={`absolute bottom-0 left-3 right-3 sm:left-5 sm:right-5 h-px transition-opacity duration-200 ${
                          isActive ? 'bg-white/55 opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>

              <p className="h-9 px-5 md:px-7 pt-2.5 flex items-center text-[10px] font-mono text-neutral-600 tracking-wider tabular-nums">
                {active.hint}
              </p>

              <div
                id="quickstart-panel"
                role="tabpanel"
                aria-labelledby={`quickstart-tab-${stack}`}
                className="px-4 pb-5 pt-0 md:px-6 md:pb-6"
              >
                <div
                  className="rounded-xl border border-white/[0.06] bg-black/40 p-4 sm:p-5 overflow-x-auto min-h-[248px]"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <pre
                    className="text-left font-mono text-[11px] sm:text-[13px] leading-[1.65] text-neutral-300 whitespace-pre"
                    tabIndex={0}
                  >
                    {active.lines.map((line, i) => (
                      <React.Fragment key={`${stack}-${i}`}>
                        {i > 0 && '\n\n'}
                        <span className="text-neutral-600">{line.comment}</span>
                        {'\n'}
                        <span className="text-white/45">›&nbsp;</span>
                        <span className="text-white/95">{line.command}</span>
                      </React.Fragment>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-7 md:mt-9 text-center text-[13px] md:text-sm text-neutral-500 font-space leading-relaxed">
            That is it. No config. No setup.
            <br />
            No code leaves your machine.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickstartSection;
