import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ─── Types ─────────────────────────────────────────────────────── */

interface Step {
  num: string;
  kicker: string;
  heading: string;
  body: string;
  visual: React.ReactNode;
  stats: string[];
}

/* ─── Shared primitives ─────────────────────────────────────────── */

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`rounded-2xl border border-white/[0.06] bg-white/[0.012] p-6 md:p-7 ${className}`}
  >
    {children}
  </div>
);

const Tag: React.FC<{
  children: React.ReactNode;
  tone?: 'on' | 'idle';
}> = ({ children, tone = 'idle' }) => {
  const tones = {
    on: 'text-white/85 border-white/15 bg-white/[0.04]',
    idle: 'text-neutral-400 border-white/[0.08] bg-white/[0.02]',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

/* ─── Isometric primitives — same idiom as the Workflow section ──── */

const ISO_TRANSFORM = 'rotateX(55deg) rotateZ(-45deg)';

interface IsoSlabProps {
  size: number;
  thickness: number;
  topFill: number;
  sideFill: number;
  borderA: number;
  rimA: number;
  glow?: number;
  children?: React.ReactNode;
}

const IsoSlab: React.FC<IsoSlabProps> = ({
  size,
  thickness: T,
  topFill,
  sideFill,
  borderA,
  rimA,
  glow = 0,
  children,
}) => {
  const wall: React.CSSProperties = {
    position: 'absolute',
    background: `rgba(255,255,255,${sideFill})`,
    backfaceVisibility: 'hidden',
  };
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(255,255,255,${topFill})`,
          border: `1px solid rgba(255,255,255,${borderA})`,
          boxShadow:
            glow > 0
              ? `0 16px 32px -10px rgba(255,255,255,${glow}), 0 0 40px -10px rgba(255,255,255,${glow * 0.5})`
              : 'none',
          transform: `translateZ(${T}px)`,
        }}
      >
        {children}
      </div>
      <div
        style={{
          ...wall,
          top: 0,
          left: 0,
          width: size,
          height: T,
          borderLeft: `1px solid rgba(255,255,255,${rimA})`,
          borderRight: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '0 0',
          transform: 'rotateX(90deg)',
        }}
      />
      <div
        style={{
          ...wall,
          top: size - T,
          left: 0,
          width: size,
          height: T,
          borderLeft: `1px solid rgba(255,255,255,${rimA})`,
          borderRight: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '0 100%',
          transform: 'rotateX(-90deg)',
        }}
      />
      <div
        style={{
          ...wall,
          top: 0,
          left: 0,
          width: T,
          height: size,
          borderTop: `1px solid rgba(255,255,255,${rimA})`,
          borderBottom: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '0 0',
          transform: 'rotateY(-90deg)',
        }}
      />
      <div
        style={{
          ...wall,
          top: 0,
          left: size - T,
          width: T,
          height: size,
          borderTop: `1px solid rgba(255,255,255,${rimA})`,
          borderBottom: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '100% 0',
          transform: 'rotateY(90deg)',
        }}
      />
    </div>
  );
};

/* ─── Extra CSS graphic primitives ───────────────────────────────── */

/* conic-gradient ring dial. */
const RingGauge: React.FC<{ value: number; label?: string }> = ({
  value,
  label,
}) => {
  const pct = Math.round(value * 1000) / 10;
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 44, height: 44 }}
        aria-label={`${pct}%`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(rgba(255,255,255,0.75) ${value * 360}deg, rgba(255,255,255,0.06) 0)`,
          }}
        />
        <div className="absolute rounded-full bg-black" style={{ inset: 3 }} />
        <span className="relative font-mono text-[9px] text-white tabular-nums">
          {pct}%
        </span>
      </div>
      {label && (
        <span className="text-[9px] font-mono text-neutral-500 tracking-[0.2em]">
          {label}
        </span>
      )}
    </div>
  );
};

/* Segmented bar meter — N filled notches out of `max`. */
const RiskMeter: React.FC<{ level: number; max?: number }> = ({
  level,
  max = 8,
}) => (
  <div
    className="flex items-center gap-[3px]"
    aria-label={`Risk level ${level} of ${max}`}
  >
    {Array.from({ length: max }, (_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="block w-1 h-3 rounded-[1px]"
        style={{
          background:
            i < level
              ? `rgba(255,255,255,${0.32 + (i / max) * 0.5})`
              : 'rgba(255,255,255,0.07)',
        }}
      />
    ))}
  </div>
);

/* CSS chevron — pure clip-path. */
const ChevronArrow: React.FC<{ size?: number; alpha?: number }> = ({
  size = 10,
  alpha = 0.4,
}) => (
  <span
    aria-hidden="true"
    className="block flex-shrink-0"
    style={{
      width: size,
      height: size,
      background: `rgba(255,255,255,${alpha})`,
      clipPath: 'polygon(0 0, 60% 50%, 0 100%, 25% 50%)',
    }}
  />
);

/* Polygon shield glyph using clip-path. */
const ShieldGlyph: React.FC<{ size?: number; alpha?: number }> = ({
  size = 14,
  alpha = 0.55,
}) => (
  <span
    aria-hidden="true"
    className="inline-block flex-shrink-0"
    style={{
      width: size,
      height: size,
      background: `rgba(255,255,255,${alpha})`,
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 60%, 50% 100%, 0 60%, 0 25%)',
    }}
  />
);

/* Rounded-top editor tab. */
const FileTab: React.FC<{ name: string; kicker?: string }> = ({
  name,
  kicker,
}) => (
  <div className="flex items-end gap-2 -mb-px">
    <div className="flex items-center gap-2 px-3 py-1 rounded-t-md border-x border-t border-white/[0.1] bg-white/[0.04]">
      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
      <span className="text-[10px] font-mono text-white/85 tracking-wide">
        {name}
      </span>
    </div>
    {kicker && (
      <span className="text-[9px] font-mono text-neutral-600 tracking-[0.2em] pb-1">
        {kicker}
      </span>
    )}
  </div>
);

/* ─── Visual 01 — Verification gates ─────────────────────────────── */

const GATES = [
  { n: '01', label: 'Syntax', ms: '12 ms', fill: 0.98 },
  { n: '02', label: 'Imports', ms: '8 ms', fill: 0.94 },
  { n: '03', label: 'Tests', ms: '6.2 s', fill: 0.99 },
];

const VerifyVisual: React.FC = () => (
  <Panel>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2.5">
        <ShieldGlyph />
        <div className="text-[10px] font-mono text-neutral-500 tracking-[0.2em]">
          VERIFICATION GATES
        </div>
      </div>
      <Tag tone="on">3 / 3 PASSED</Tag>
    </div>

    {/* Isometric gate row — three slabs in series */}
    <div className="relative flex items-center justify-center gap-5 md:gap-8 py-6 select-none">
      {GATES.map((g, i) => (
        <React.Fragment key={g.n}>
          <div
            style={{
              perspective: 600,
              transformStyle: 'preserve-3d',
              width: 96,
              height: 96,
            }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: ISO_TRANSFORM,
              }}
            >
              <IsoSlab
                size={84}
                thickness={18}
                topFill={0.07 + i * 0.018}
                sideFill={0.14 + i * 0.02}
                borderA={0.28 + i * 0.04}
                rimA={0.18 + i * 0.03}
                glow={0.08}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ transform: 'rotateZ(45deg) rotateX(-55deg)' }}>
                    <div className="text-[9px] font-mono text-white/45 tracking-[0.22em] text-center mb-1">
                      {g.n}
                    </div>
                    <div className="text-[11px] font-mono text-white tracking-[0.14em] text-center">
                      {g.label.toUpperCase()}
                    </div>
                  </div>
                </div>
              </IsoSlab>
            </div>
          </div>

          {i < GATES.length - 1 && (
            <div className="flex items-center gap-2 -mx-2 md:-mx-3">
              <div className="h-px w-4 md:w-5 bg-white/[0.18]" />
              <ChevronArrow size={9} alpha={0.45} />
              <div className="h-px w-4 md:w-5 bg-white/[0.18]" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Per-gate stat strip below the slabs */}
    <div className="grid grid-cols-3 gap-4 md:gap-6 mt-2">
      {GATES.map(g => (
        <div key={g.n} className="flex flex-col gap-1 items-start">
          <div className="flex items-center gap-2 w-full">
            <span className="w-1 h-1 rounded-full bg-white/70" />
            <span className="text-[10px] font-mono text-neutral-400 tracking-[0.16em]">
              {g.label.toUpperCase()}
            </span>
            <span className="ml-auto text-[10px] font-mono text-neutral-500 tabular-nums">
              {g.ms}
            </span>
          </div>
          <div className="relative h-[2px] w-full rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/55"
              style={{ width: `${g.fill * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-4">
      <span className="text-[11px] text-neutral-500 font-space">
        If any gate fails, the original file is untouched.
      </span>
      <RingGauge value={0.973} label="PASS RATE" />
    </div>
  </Panel>
);

/* ─── Visual 02 — Refactor patterns ─────────────────────────────── */

const PATTERNS = [
  { from: 'callback chain', to: 'async / await', count: 3 },
  { from: 'var declarations', to: 'const / let', count: 12 },
  { from: 'requests', to: 'httpx', count: 4 },
  { from: 'sync I/O in async', to: 'awaitable I/O', count: 2 },
];

const LegacyShape: React.FC = () => (
  <div className="flex items-center gap-1 h-2.5 w-full">
    <span className="h-full rounded-sm bg-white/[0.08]" style={{ flex: 2 }} />
    <span className="h-full rounded-sm bg-white/[0.08]" style={{ flex: 1 }} />
    <span className="h-full rounded-sm bg-white/[0.08]" style={{ flex: 3 }} />
  </div>
);

const ModernShape: React.FC = () => (
  <div
    className="h-2.5 w-full rounded-sm"
    style={{
      background:
        'linear-gradient(90deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.18) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22)',
    }}
  />
);

const RefactorVisual: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  return (
    <Panel>
      <div className="flex items-center justify-between mb-5">
        <div className="text-[10px] font-mono text-neutral-500 tracking-[0.2em]">
          DETECTED · REFACTORED
        </div>
        <Tag>21 PATTERNS</Tag>
      </div>

      <div className="relative flex flex-col gap-4 py-1 overflow-hidden">
        {PATTERNS.map(r => (
          <div key={r.from} className="grid grid-cols-12 items-center gap-3">
            <div className="col-span-5 flex flex-col gap-1.5">
              <LegacyShape />
              <div className="text-[10px] font-mono text-neutral-500 tracking-wide truncate">
                {r.from}
              </div>
            </div>
            <div className="col-span-1 text-center text-neutral-700 text-sm">
              →
            </div>
            <div className="col-span-5 flex flex-col gap-1.5">
              <ModernShape />
              <div className="text-[10px] font-mono text-neutral-200 tracking-wide truncate">
                {r.to}
              </div>
            </div>
            <div className="col-span-1 text-right text-[10px] font-mono text-neutral-500 tabular-nums">
              ×{r.count}
            </div>
          </div>
        ))}

        {!reduce && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: '-10%' }}
            whileInView={{
              opacity: [0, 0.55, 0],
              x: ['-10%', '110%'],
            }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)',
              boxShadow: '0 0 12px rgba(255,255,255,0.4)',
            }}
          />
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-white/[0.06]">
        <FileTab name="service.py" kicker="STRUCTURAL RENAME" />
        <div className="rounded-xl rounded-tl-none border border-white/[0.1] bg-white/[0.012] p-4 space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-neutral-600">−</span>
            <code className="text-[12px] font-mono text-neutral-500 line-through decoration-neutral-700">
              proc_pmt(c, a)
            </code>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/70">+</span>
            <code className="text-[12px] font-mono text-white">
              process_payment(card: Card, amount: Decimal)
            </code>
          </div>
        </div>
        <div className="mt-3 text-[11px] text-neutral-500 font-space">
          Behavior preserved · 47 tests passed
        </div>
      </div>
    </Panel>
  );
};

/* ─── Visual 03 — Control flow (review · approve · rollback) ────── */

const CONTROL_STEPS = [
  { label: 'REVIEW', state: 'done' as const },
  { label: 'APPROVE', state: 'active' as const },
  { label: 'ROLLBACK', state: 'idle' as const },
];

const ControlVisual: React.FC = () => (
  <Panel>
    <div className="flex items-center justify-between mb-5">
      <div className="text-[10px] font-mono text-neutral-500 tracking-[0.2em]">
        CONTROL FLOW
      </div>
      <Tag>2 PENDING</Tag>
    </div>

    {/* Isometric step badges + dashed rollback hook */}
    <div className="relative h-[150px] flex items-center justify-center select-none">
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 4px, transparent 4px 8px)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-around">
        {CONTROL_STEPS.map(s => {
          const isDone = s.state === 'done';
          const isActive = s.state === 'active';
          return (
            <div
              key={s.label}
              className="flex flex-col items-center gap-3 relative z-10 bg-black/0"
            >
              <div
                style={{
                  perspective: 500,
                  transformStyle: 'preserve-3d',
                  width: 44,
                  height: 44,
                }}
                className="flex items-center justify-center"
              >
                <div
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: ISO_TRANSFORM,
                  }}
                >
                  <IsoSlab
                    size={32}
                    thickness={9}
                    topFill={isActive ? 0.18 : isDone ? 0.1 : 0.04}
                    sideFill={isActive ? 0.28 : isDone ? 0.18 : 0.1}
                    borderA={isActive ? 0.55 : isDone ? 0.35 : 0.18}
                    rimA={isActive ? 0.36 : isDone ? 0.24 : 0.13}
                    glow={isActive ? 0.18 : 0}
                  />
                </div>
              </div>
              <span
                className="text-[10px] font-mono tracking-[0.22em]"
                style={{
                  color: isActive
                    ? 'rgba(255,255,255,0.95)'
                    : isDone
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(255,255,255,0.35)',
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* rollback hook — arches from APPROVE back to REVIEW */}
      <svg
        viewBox="0 0 600 160"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M 300 78 C 300 28, 100 28, 100 78"
          fill="none"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <path d="M 96 72 L 88 64 L 88 78 Z" fill="rgba(255,255,255,0.45)" />
        <text
          x="200"
          y="24"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="2"
          fill="rgba(255,255,255,0.42)"
        >
          UNDO
        </text>
      </svg>
    </div>

    <div className="mt-1 grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.012] px-4 py-3">
        <div className="flex items-center justify-between">
          <Tag tone="idle">LOW RISK</Tag>
          <span className="text-white/80 font-mono tracking-wider text-[10px]">
            APPLIED
          </span>
        </div>
        <RiskMeter level={2} />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-white/[0.12] bg-white/[0.025] px-4 py-3">
        <div className="flex items-center justify-between">
          <Tag tone="on">HIGH RISK</Tag>
          <span className="text-white/65 font-mono tracking-wider text-[10px]">
            AWAITING
          </span>
        </div>
        <RiskMeter level={7} />
      </div>
    </div>

    <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-between">
      <div className="text-[11px] text-neutral-500 font-space">
        One command rolls everything back. No git required.
      </div>
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] font-mono text-[10px] text-neutral-200 tracking-wider">
        ↺ rollback
      </span>
    </div>
  </Panel>
);

/* ─── Step data ─────────────────────────────────────────────────── */

const STEPS: Step[] = [
  {
    num: '01',
    kicker: 'VERIFICATION',
    heading: 'Verification before every write.',
    body: 'Three gates run before any file is touched: syntax validation, import-graph integrity, and your existing test suite. If any gate fails, the original is untouched.',
    visual: <VerifyVisual />,
    stats: ['syntax · sub-50ms', 'imports · zero broken', 'tests · must pass'],
  },
  {
    num: '02',
    kicker: 'REFACTOR',
    heading: 'Finds legacy code. Refactors it structurally.',
    body: 'Deep analysis across the full dependency graph surfaces outdated patterns, deprecated APIs, and architectural debt. Refactron transforms them deterministically. No LLM. No guessing. Same input, same output.',
    visual: <RefactorVisual />,
    stats: ['Deterministic', 'No LLM in the loop', 'Idempotent'],
  },
  {
    num: '03',
    kicker: 'CONTROL',
    heading: 'You review. You approve. You rollback.',
    body: 'Every structural refactor is a readable before-and-after. Low-risk changes apply automatically. High-risk changes ask first. One command rolls everything back. No git required.',
    visual: <ControlVisual />,
    stats: ['Readable diff', 'Risk-scored', 'One-command rollback'],
  },
];

/* ─── StatChip ──────────────────────────────────────────────────── */

const StatChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] font-mono text-[10px] text-neutral-300 tracking-[0.08em]">
    <span className="w-1 h-1 rounded-full bg-white/50" aria-hidden="true" />
    {children}
  </span>
);

/* ─── Iso step badge (tiny 3D cube in the card header) ──────────── */

const IsoStepBadge: React.FC<{ active?: boolean }> = ({ active = false }) => (
  <div
    style={{
      perspective: 280,
      transformStyle: 'preserve-3d',
      width: 22,
      height: 22,
    }}
    className="flex items-center justify-center flex-shrink-0"
  >
    <div style={{ transformStyle: 'preserve-3d', transform: ISO_TRANSFORM }}>
      <IsoSlab
        size={16}
        thickness={5}
        topFill={active ? 0.22 : 0.08}
        sideFill={active ? 0.34 : 0.16}
        borderA={active ? 0.55 : 0.28}
        rimA={active ? 0.38 : 0.18}
        glow={active ? 0.12 : 0}
      />
    </div>
  </div>
);

/* ─── Bento tile + header ──────────────────────────────────────── */

interface BentoTileProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reduceMotion: boolean;
}

const BentoTile: React.FC<BentoTileProps> = ({
  children,
  className = '',
  delay = 0,
  reduceMotion,
}) => (
  <motion.article
    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`relative rounded-[28px] border border-white/[0.06] bg-white/[0.012] overflow-hidden ${className}`}
  >
    {/* faint static dot grid — pure CSS, no animation cost */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.35]"
      style={{
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </motion.article>
);

interface StepHeaderProps {
  step: Step;
  headingClass?: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  step,
  headingClass = 'text-2xl md:text-3xl lg:text-[2rem]',
}) => (
  <>
    <div className="flex items-center gap-3 mb-4">
      <IsoStepBadge active />
      <span className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] tabular-nums">
        {step.num}
      </span>
      <span className="h-px flex-1 max-w-[48px] bg-white/[0.1]" />
      <span className="text-[10px] font-mono text-neutral-500 tracking-[0.22em]">
        {step.kicker}
      </span>
    </div>
    <h3
      className={`font-semibold text-white font-space leading-[1.15] tracking-tight ${headingClass}`}
    >
      {step.heading}
    </h3>
    <p className="mt-3 text-sm md:text-[15px] text-neutral-400 font-space leading-relaxed">
      {step.body}
    </p>
    <div className="flex flex-wrap gap-2 mt-4">
      {step.stats.map(s => (
        <StatChip key={s}>{s}</StatChip>
      ))}
    </div>
  </>
);

/* ─── Main section ──────────────────────────────────────────────── */

const WhatWeDoSection: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const [verify, refactor, control] = STEPS;

  return (
    <section className="w-full py-28 relative overflow-hidden bg-black antialiased font-space">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-14 lg:mb-20"
        >
          <div className="lg:col-span-7">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1]">
              How Refactron stays safe in production.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide">
              Three guarantees. Verifiable end-to-end. Yours to control.
            </p>
          </div>
        </motion.div>

        {/* Bento grid — 12 (hero) / 7 + 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Row 1: Verification — full width */}
          <BentoTile
            reduceMotion={reduceMotion}
            delay={0}
            className="lg:col-span-12 flex flex-col p-6 md:p-8 lg:p-10 min-h-0"
          >
            <StepHeader
              step={verify}
              headingClass="text-2xl md:text-3xl xl:text-[2.35rem]"
            />
            <div className="mt-6 max-w-3xl">{verify.visual}</div>
          </BentoTile>

          {/* Row 2: Refactor (wider) + Control (narrower) */}
          <BentoTile
            reduceMotion={reduceMotion}
            delay={0.06}
            className="lg:col-span-7 flex flex-col p-6 md:p-8"
          >
            <StepHeader step={refactor} />
            <div className="mt-5 flex-1">{refactor.visual}</div>
          </BentoTile>

          <BentoTile
            reduceMotion={reduceMotion}
            delay={0.1}
            className="lg:col-span-5 flex flex-col p-6 md:p-8"
          >
            <StepHeader step={control} />
            <div className="mt-5 flex-1">{control.visual}</div>
          </BentoTile>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
