import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CardData {
  num: string;
  headline: string;
  body: string;
  bullets: string[];
  terminalLabel: string;
  terminalContent: React.ReactNode;
  terminalCaption: string;
  visual: React.ReactNode;
}

/* ─── Card visual components ─────────────────────────────────── */

const ShieldVisual: React.FC = () => (
  <div className="relative flex items-center justify-center w-36 h-36">
    {[80, 120, 160].map((size, i) => (
      <div
        key={i}
        className="absolute rounded-full border border-white/[0.07]"
        style={{
          width: size,
          height: size,
          animation: `pulse-ring 3s ease-out ${i * 0.4}s infinite`,
        }}
      />
    ))}
    <div className="relative z-10 w-14 h-14 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-2xl">
      🛡
    </div>
    <div className="absolute top-2 right-[-28px] flex flex-col gap-1.5">
      {['✔ Syntax', '✔ Imports', '✔ Tests'].map((label, i) => (
        <span
          key={i}
          className="text-[9px] font-mono text-emerald-400 bg-emerald-400/[0.08] border border-emerald-400/[0.15] rounded px-1.5 py-0.5"
          style={{ animation: `fadeInUp 0.4s ease ${0.2 + i * 0.5}s both` }}
        >
          {label}
        </span>
      ))}
    </div>
  </div>
);

const ScannerVisual: React.FC = () => {
  const rows = [
    {
      dot: 'ok',
      label: 'Security scan',
      val: '✔',
      valColor: 'text-emerald-400',
    },
    { dot: 'ok', label: 'Complexity', val: '✔', valColor: 'text-emerald-400' },
    {
      dot: 'err',
      label: 'SQL injection',
      val: 'CRIT',
      valColor: 'text-rose-400',
    },
    {
      dot: 'ok',
      label: 'Dead code',
      val: '14 fixed',
      valColor: 'text-emerald-400',
    },
    { dot: 'dim', label: 'Type hints', val: '—', valColor: 'text-neutral-600' },
  ];
  return (
    <div className="w-full max-w-[200px] flex flex-col gap-1.5">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-2.5 h-7 rounded-md border text-[10px] font-mono ${
            row.dot === 'err'
              ? 'bg-rose-500/[0.05] border-rose-500/[0.25]'
              : 'bg-white/[0.02] border-white/[0.06]'
          }`}
          style={{ animation: `fadeInLeft 0.5s ease ${0.1 + i * 0.18}s both` }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              row.dot === 'ok'
                ? 'bg-emerald-400'
                : row.dot === 'err'
                  ? 'bg-rose-400'
                  : 'bg-neutral-600'
            }`}
          />
          <span className="text-neutral-500 flex-1">{row.label}</span>
          <span className={row.valColor}>{row.val}</span>
        </div>
      ))}
    </div>
  );
};

const DiffVisual: React.FC = () => (
  <div className="w-full max-w-[210px] rounded-xl overflow-hidden border border-white/[0.08] font-mono text-[10px]">
    <div className="bg-[#1a1a1a] px-2.5 py-1.5 flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-rose-500/50" />
      <div className="w-2 h-2 rounded-full bg-amber-500/50" />
      <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
      <span className="ml-1.5 text-neutral-600">payments/service.py</span>
    </div>
    {[
      {
        cls: 'bg-rose-500/[0.06] text-rose-400',
        delay: 0.3,
        text: '- &nbsp;def process():',
      },
      {
        cls: 'bg-emerald-500/[0.06] text-emerald-400',
        delay: 0.6,
        text: '+ &nbsp;def process():',
      },
      {
        cls: 'bg-emerald-500/[0.06] text-emerald-400',
        delay: 0.9,
        text: '+ &nbsp;&nbsp; validate_payment(...)',
      },
      {
        cls: 'bg-emerald-500/[0.06] text-emerald-400',
        delay: 1.2,
        text: '+ def validate_payment(...):',
      },
    ].map((line, i) => (
      <div
        key={i}
        className={`px-2.5 py-0.5 ${line.cls}`}
        style={{ animation: `fadeIn 0.4s ease ${line.delay}s both` }}
        dangerouslySetInnerHTML={{ __html: line.text }}
      />
    ))}
    <div
      className="bg-[#111] px-2.5 py-2 text-amber-400 border-t border-white/[0.05]"
      style={{ animation: 'fadeIn 0.4s ease 1.5s both' }}
    >
      ⚠ High risk — Apply? [y/N]: _
    </div>
  </div>
);

/* ─── Terminal content ────────────────────────────────────────── */

const Terminal01: React.FC = () => (
  <div className="bg-[#0d1117] border border-white/[0.07] rounded-xl p-4 font-mono text-[11px] leading-relaxed">
    <div className="text-[9px] uppercase tracking-widest text-neutral-600 mb-3">
      SESSION_01: VERIFICATION ENGINE
    </div>
    <div className="text-neutral-500 mb-2">
      &gt; refactron autofix src/api/views.py --verify
    </div>
    <div className="text-neutral-400 mb-2">
      Analyzing...&nbsp; ████████████ 100%
    </div>
    <div className="text-emerald-400">
      ✔ Syntax check&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(12ms)
    </div>
    <div className="text-emerald-400">✔ Import integrity&nbsp;(8ms)</div>
    <div className="text-emerald-400">
      ✔ Tests passed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ran 4 files in 6.2s
    </div>
    <div className="text-indigo-400 mt-2">
      Confidence: 97.3% | Safe to apply.
    </div>
    <div className="text-emerald-400">
      &gt; Writing to src/api/views.py... ✔ Done.
    </div>
    <div className="text-neutral-600 mt-2 italic text-[10px]">
      The original file is never modified until all checks pass.
    </div>
  </div>
);

const Terminal02: React.FC = () => (
  <div className="bg-[#0d1117] border border-white/[0.07] rounded-xl p-4 font-mono text-[11px] leading-relaxed">
    <div className="text-[9px] uppercase tracking-widest text-neutral-600 mb-3">
      SESSION_02: ANALYSIS + AUTOFIX
    </div>
    <div className="text-neutral-500 mb-2">
      &gt; refactron analyze src/ --format rich
    </div>
    <div className="border border-neutral-800 rounded-lg p-2.5 mb-2">
      <div className="text-rose-400">
        🔴 CRITICAL&nbsp; SQL Injection — line 47
      </div>
      <div className="text-neutral-600 ml-3 text-[10px]">
        → Parameterize this query. Autofix available.
      </div>
    </div>
    <div className="text-rose-400 mb-2">3 critical · 7 high · 14 medium</div>
    <div className="text-neutral-500">
      &gt; refactron autofix src/ --verify --dry-run
    </div>
    <div className="text-neutral-600 ml-2">
      Would fix 16 issues. Run without --dry-run to apply.
    </div>
    <div className="text-neutral-600 mt-2 italic text-[10px]">
      --dry-run shows every change before anything is written.
    </div>
  </div>
);

const Terminal03: React.FC = () => (
  <div className="bg-[#0d1117] border border-white/[0.07] rounded-xl p-4 font-mono text-[11px] leading-relaxed">
    <div className="text-[9px] uppercase tracking-widest text-neutral-600 mb-3">
      SESSION_03: HUMAN IN THE LOOP
    </div>
    <div className="text-neutral-500 mb-2">
      &gt; refactron autofix src/payments/ --verify
    </div>
    <div className="mb-2">
      <div className="text-neutral-400">
        Issue #1: Remove unused imports (low risk)
      </div>
      <div className="text-emerald-400">
        &nbsp;&nbsp;✔ Verified safe — applying automatically
      </div>
    </div>
    <div>
      <div className="text-neutral-400">
        Issue #2: Extract method validate_payment() (high risk)
      </div>
      <div className="text-amber-400">
        &nbsp;&nbsp;⚠ Requires approval. Here&apos;s the diff:
      </div>
    </div>
    <div className="border border-neutral-800 rounded-lg p-2 mt-2 text-[10px]">
      <div className="text-rose-400">-&nbsp; def process():</div>
      <div className="text-rose-400">
        &nbsp;&nbsp;-&nbsp; if not card: raise ValueError(...)
      </div>
      <div className="text-emerald-400">+&nbsp; def process():</div>
      <div className="text-emerald-400">
        &nbsp;&nbsp;+&nbsp; validate_payment(card, amount)
      </div>
    </div>
    <div className="text-neutral-600 mt-2 italic text-[10px]">
      High-risk changes always ask. Low-risk changes apply automatically.
    </div>
  </div>
);

/* ─── Card data ───────────────────────────────────────────────── */

const CARDS: CardData[] = [
  {
    num: '01',
    headline: 'Verification Before Every Write',
    body: 'Refactron never touches your filesystem until it can prove the change is safe. Every fix passes three checks — syntax validation, import integrity, and your existing test suite — before a single file is modified. If anything fails, the original is restored automatically.',
    bullets: [
      'Syntax and CST validation in under 50ms',
      'Import graph integrity check — no broken references',
      'Test suite gate — your tests run before the write',
    ],
    terminalLabel: 'SESSION_01',
    terminalContent: <Terminal01 />,
    terminalCaption:
      'The original file is never modified until all checks pass.',
    visual: <ShieldVisual />,
  },
  {
    num: '02',
    headline: 'Finds Real Issues. Fixes Them Automatically.',
    body: 'Eight static analyzers run in parallel — security, complexity, dead code, type hints, performance, dependencies, and more. Fourteen auto-fixers handle the safe ones automatically. Complex structural issues get surfaced with a clear explanation so you know exactly what needs human judgment.',
    bullets: [
      'Security scanning — SQL injection, hardcoded secrets, SSRF',
      'Complexity analysis — cyclomatic complexity, deep nesting',
      '14 auto-fixers — unused imports, dead code, formatting',
    ],
    terminalLabel: 'SESSION_02',
    terminalContent: <Terminal02 />,
    terminalCaption: '--dry-run shows every change before anything is written.',
    visual: <ScannerVisual />,
  },
  {
    num: '03',
    headline: 'You Review. You Approve. You Rollback.',
    body: 'Refactron is not an agent that rewrites your code autonomously. Every change is a readable diff. High-risk transforms require explicit approval. And if you change your mind after applying, one command restores the original from backup — no git required.',
    bullets: [
      '--dry-run preview on every autofix command',
      'Risk-scored changes — low risk applies, high risk asks',
      'Instant rollback — refactron rollback undoes any change',
    ],
    terminalLabel: 'SESSION_03',
    terminalContent: <Terminal03 />,
    terminalCaption:
      'High-risk changes always ask. Low-risk changes apply automatically.',
    visual: <DiffVisual />,
  },
];

/* ─── Modal ───────────────────────────────────────────────────── */

interface ModalProps {
  card: CardData;
  onClose: () => void;
}

const CardModal: React.FC<ModalProps> = ({ card, onClose }) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0a0a0a] rounded-2xl overflow-y-auto flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.12] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Large visual */}
        <div className="flex items-center justify-center flex-shrink-0 min-h-[340px] px-12 py-16">
          <div className="scale-150">{card.visual}</div>
        </div>

        {/* Content */}
        <div className="px-10 pb-12 space-y-5">
          <h3 className="text-4xl font-bold text-white leading-tight font-space">
            {card.headline}
          </h3>
          <p className="text-base text-neutral-400 leading-relaxed font-space">
            {card.body}
          </p>
          <ul className="space-y-3">
            {card.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-neutral-500 font-space"
              >
                <span className="mt-0.5 text-neutral-600 flex-shrink-0">→</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main section ────────────────────────────────────────────── */

const WhatWeDoSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardData | null>(null);

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0%   { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.15); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <section className="w-full py-24 relative overflow-hidden bg-black antialiased bg-grid-white/[0.02]">
        {/* Gradient fades matching RefactoringWorkflowSection */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Section header — mirrors RefactoringWorkflowSection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-20"
          >
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1]">
                Built to Verify, Fix, and Stay in Control.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-10 flex flex-col gap-6">
              <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide">
                Verify before write. Fix what matters. Stay in control.
              </p>
            </div>
          </motion.div>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveCard(card)}
                className="group relative bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden flex flex-col min-h-[420px] cursor-pointer hover:border-white/[0.15] transition-colors duration-300"
              >
                {/* Visual area */}
                <div className="flex-1 flex items-center justify-center px-8 py-10 relative overflow-hidden">
                  {card.visual}
                </div>

                {/* Footer: title + plus button */}
                <div className="flex items-end justify-between px-6 py-5 gap-4">
                  <h3 className="text-lg font-semibold text-white font-space leading-snug">
                    {card.headline}
                  </h3>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setActiveCard(card);
                    }}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.07] border border-white/[0.12] flex items-center justify-center text-white text-xl leading-none hover:bg-white/[0.14] transition-colors"
                    aria-label={`Learn more about ${card.headline}`}
                  >
                    +
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeCard && (
          <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatWeDoSection;
