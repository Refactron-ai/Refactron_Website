import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, Lock, ArrowRight, Check, Activity, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  getUsageStats,
  UsageRecord,
  updatePreferences,
} from '../services/usage.service';
import DashboardLayout from './DashboardLayout';

const AVAILABLE_MODELS = [
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', note: 'Default · best quality' },
  { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B', note: 'Faster · lower cost' },
  { id: 'gemma2-9b-it', label: 'Gemma 2 9B', note: 'Google · compact' },
  { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B', note: '32k context window' },
];

const PLAN_QUOTA: Record<string, number | null> = {
  free: 0,
  pro: 5_000_000,
  enterprise: null,
};

const PERIODS = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

type Tab = 'overview' | 'activity' | 'settings';

const formatTokens = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};

const formatCost = (n: number): string => {
  if (n === 0) return '$0.00';
  if (n < 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
};

const formatRelativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const SkeletonRow: React.FC = () => (
  <div className="grid grid-cols-12 gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0">
    {[4, 4, 2, 2].map((cols, i) => (
      <div key={i} className={`col-span-${cols} h-3.5 rounded-md bg-white/[0.04] animate-pulse`} />
    ))}
  </div>
);

const StatCard: React.FC<{
  label: string;
  value: string;
  sub: string;
  index: number;
}> = ({ label, value, sub, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
    className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-white/[0.15] hover:bg-white/[0.04] transition-all"
  >
    <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-3">{label}</p>
    <p className="text-3xl font-semibold text-white font-space leading-none">{value}</p>
    <p className="text-sm text-neutral-500 mt-2">{sub}</p>
  </motion.div>
);

/* ── Trend Chart ── */
interface Bucket {
  isoKey: string;
  shortLabel: string;
  fullLabel: string;
  count: number;
  tokens: number;
}

const CHART_H = 130;
const YAXIS_W = 32;
const XAXIS_H = 22;

function niceUpperBound(max: number): number {
  if (max <= 0) return 4;
  if (max <= 4) return 4;
  if (max <= 5) return 5;
  if (max <= 10) return 10;
  return Math.ceil(max / 5) * 5;
}

const TrendChart: React.FC<{ records: UsageRecord[]; days: number }> = ({ records, days }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const buckets: Bucket[] = useMemo(() => {
    const now = new Date();
    const arr: Bucket[] = Array.from({ length: days }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (days - 1 - i));
      const isoKey = d.toISOString().slice(0, 10);
      const shortLabel =
        days <= 7
          ? d.toLocaleDateString('en-US', { weekday: 'short' })
          : days <= 30
          ? String(d.getDate())
          : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullLabel = d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      return { isoKey, shortLabel, fullLabel, count: 0, tokens: 0 };
    });

    records.forEach(r => {
      const key = new Date(r.createdAt).toISOString().slice(0, 10);
      const b = arr.find(bucket => bucket.isoKey === key);
      if (b) {
        b.count++;
        b.tokens += r.totalTokens;
      }
    });

    return arr;
  }, [records, days]);

  if (records.length === 0) return null;

  const maxCount = Math.max(...buckets.map(b => b.count));
  const ceiling = niceUpperBound(maxCount);
  const yTicks = [0.25, 0.5, 0.75, 1.0];

  // Show x-axis labels only at sensible intervals
  const labelStep = days <= 7 ? 1 : days <= 14 ? 2 : days <= 30 ? 5 : 10;
  const hovered = hoveredIndex !== null ? buckets[hoveredIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 mb-6"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4" style={{ minHeight: 20 }}>
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
          Daily Activity
        </p>
        {hovered ? (
          <p className="text-xs font-mono text-neutral-500">
            <span className="text-white font-semibold">{hovered.count}</span>
            {' calls'}
            {hovered.tokens > 0 && (
              <> · <span className="text-neutral-300">{formatTokens(hovered.tokens)} tok</span></>
            )}
            {' · '}
            <span className="text-neutral-400">{hovered.fullLabel}</span>
          </p>
        ) : (
          <p className="text-xs font-mono text-neutral-700">hover a bar for details</p>
        )}
      </div>

      {/* Chart layout: y-axis | bars+x-axis */}
      <div className="flex" style={{ userSelect: 'none' }}>
        {/* Y-axis label column */}
        <div
          className="relative flex-shrink-0"
          style={{ width: YAXIS_W, height: CHART_H + XAXIS_H }}
        >
          {yTicks.map(frac => (
            <div
              key={frac}
              className="absolute right-2 leading-none"
              style={{
                bottom: XAXIS_H + frac * CHART_H - 5,
                fontSize: 9,
                color: 'rgba(255,255,255,0.22)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {Math.round(ceiling * frac)}
            </div>
          ))}
        </div>

        {/* Bars + x-axis */}
        <div className="flex-1 flex flex-col">
          {/* Bars area — position:relative for grid lines */}
          <div
            className="relative w-full"
            style={{ height: CHART_H }}
          >
            {/* Horizontal grid lines */}
            {yTicks.map(frac => (
              <div
                key={frac}
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  bottom: `${frac * 100}%`,
                  borderTop: frac === 1.0
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px dashed rgba(255,255,255,0.05)',
                }}
              />
            ))}

            {/* Bars row — key on days so bars re-animate on period change */}
            <div key={days} className="absolute inset-0 flex items-end gap-px">
              {buckets.map((b, i) => {
                const pct = ceiling > 0 ? (b.count / ceiling) * 100 : 0;
                const isHov = hoveredIndex === i;
                return (
                  <div
                    key={b.isoKey}
                    className="relative flex-1 h-full flex items-end cursor-default"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Column hover tint */}
                    {isHov && (
                      <div className="absolute inset-0 rounded-sm bg-white/[0.025]" />
                    )}
                    {/* Bar */}
                    <motion.div
                      className="relative w-full rounded-t-[2px]"
                      initial={{ height: 0 }}
                      animate={{
                        height: b.count > 0 ? `${pct}%` : 2,
                        backgroundColor: isHov
                          ? 'rgba(255,255,255,0.6)'
                          : b.count > 0
                          ? 'rgba(255,255,255,0.22)'
                          : 'rgba(255,255,255,0.05)',
                      }}
                      transition={{
                        height: {
                          duration: 0.55,
                          delay: i * 0.007,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        backgroundColor: { duration: 0.12 },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex gap-px" style={{ height: XAXIS_H, paddingTop: 5 }}>
            {buckets.map((b, i) => (
              <div
                key={b.isoKey}
                className="flex-1 text-center overflow-hidden whitespace-nowrap"
                style={{
                  fontSize: 9,
                  lineHeight: 1,
                  color: hoveredIndex === i
                    ? 'rgba(255,255,255,0.45)'
                    : 'rgba(255,255,255,0.2)',
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'color 0.12s',
                }}
              >
                {i % labelStep === 0 ? b.shortLabel : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Token quota bar ── */
const QuotaBar: React.FC<{
  tokensUsed: number;
  quota: number;
  plan: string;
}> = ({ tokensUsed, quota, plan }) => {
  const pct = Math.min((tokensUsed / quota) * 100, 100);
  const status = pct >= 100 ? 'over' : pct >= 80 ? 'warning' : 'ok';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.22 }}
      className={`mb-6 rounded-2xl border px-5 py-4 ${
        status === 'over'
          ? 'border-red-500/20 bg-red-500/[0.04]'
          : status === 'warning'
          ? 'border-amber-500/20 bg-amber-500/[0.03]'
          : 'border-white/[0.08] bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
            Monthly Token Quota
          </p>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium capitalize text-neutral-500">
            {plan}
          </span>
        </div>
        <p className="text-xs font-mono text-neutral-500">
          <span
            className={
              status === 'over'
                ? 'text-red-400'
                : status === 'warning'
                ? 'text-amber-400'
                : 'text-white'
            }
          >
            {formatTokens(tokensUsed)}
          </span>
          <span className="text-neutral-700"> / {formatTokens(quota)}</span>
        </p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            status === 'over' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-400' : 'bg-white/50'
          }`}
        />
      </div>
      {status === 'over' && (
        <p className="mt-2 text-xs text-red-400">
          You've used your full monthly quota. Upgrade to Enterprise for unlimited tokens.
        </p>
      )}
      {status === 'warning' && (
        <p className="mt-2 text-xs text-amber-400">
          You're at {pct.toFixed(0)}% of your monthly quota.
        </p>
      )}
    </motion.div>
  );
};

/* ── Tab nav ── */
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart2 className="h-3.5 w-3.5" /> },
  { id: 'activity', label: 'Activity', icon: <Activity className="h-3.5 w-3.5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings2 className="h-3.5 w-3.5" /> },
];

/* ══════════════════════════════════════════════════════════════════ */

const Usage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activePeriod, setActivePeriod] = useState(30);
  const [loading, setLoading] = useState(false);
  const [totalRequests, setTotalRequests] = useState<number | null>(null);
  const [totalTokens, setTotalTokens] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [monthlyTokens, setMonthlyTokens] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [selectedModel, setSelectedModel] = useState<string>(
    user?.preferredModel || 'llama-3.3-70b-versatile'
  );
  const [modelSaving, setModelSaving] = useState(false);
  const [modelSaved, setModelSaved] = useState(false);

  const isPro = user?.plan === 'pro' || user?.plan === 'enterprise';
  const plan = user?.plan ?? 'free';
  const quota = PLAN_QUOTA[plan] ?? null;
  const periodLabel = PERIODS.find(p => p.days === activePeriod)?.label ?? '30d';

  const handleSaveModel = async () => {
    setModelSaving(true);
    const result = await updatePreferences({ preferredModel: selectedModel });
    setModelSaving(false);
    if (result.success) {
      updateUser({ ...user!, preferredModel: selectedModel });
      setModelSaved(true);
      setTimeout(() => setModelSaved(false), 2500);
    }
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getUsageStats(activePeriod);
    if (result.success) {
      setTotalRequests(result.totalRequests ?? 0);
      setTotalTokens(result.totalTokens ?? 0);
      setTotalCost(result.totalCost ?? 0);
      setRecords(result.usage ?? []);
    } else {
      setError(result.error ?? 'Failed to load usage data.');
    }
    setLoading(false);
  }, [activePeriod]);

  useEffect(() => {
    if (!isPro) return;
    getUsageStats(30).then(r => {
      if (r.success) setMonthlyTokens(r.totalTokens ?? 0);
    });
  }, [isPro]);

  useEffect(() => {
    if (isPro) load();
  }, [isPro, load]);

  if (!isPro) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-xl mx-auto flex flex-col items-center text-center pt-24">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] mb-6">
            <Lock className="h-5 w-5 text-neutral-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Usage monitoring requires Pro
          </h2>
          <p className="text-sm text-neutral-500 max-w-xs mb-6">
            Track LLM token usage, costs, and activity history with a Pro or Enterprise plan.
          </p>
          <button
            onClick={() => navigate('/settings/billing')}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Upgrade to Pro
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                <BarChart2 className="h-4 w-4 text-neutral-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white leading-tight">Usage</h1>
                <p className="text-sm text-neutral-500 mt-0.5">LLM token consumption and activity</p>
              </div>
            </div>
            {activeTab !== 'settings' && (
              <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
                {PERIODS.map(p => (
                  <button
                    key={p.days}
                    onClick={() => setActivePeriod(p.days)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      activePeriod === p.days
                        ? 'bg-white/[0.08] border border-white/[0.12] text-white'
                        : 'text-neutral-600 hover:text-neutral-400'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 mb-6 w-fit">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/[0.08] border border-white/[0.12] text-white'
                    : 'text-neutral-600 hover:text-neutral-400'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatCard
                    label="LLM Calls"
                    value={loading || totalRequests === null ? '—' : totalRequests.toLocaleString()}
                    sub={`last ${periodLabel}`}
                    index={0}
                  />
                  <StatCard
                    label="Tokens Used"
                    value={loading || totalTokens === null ? '—' : formatTokens(totalTokens)}
                    sub={`last ${periodLabel}`}
                    index={1}
                  />
                  <StatCard
                    label="Est. Cost"
                    value={loading || totalCost === null ? '—' : formatCost(totalCost)}
                    sub={`last ${periodLabel}`}
                    index={2}
                  />
                </div>

                {quota !== null && (
                  <QuotaBar tokensUsed={monthlyTokens} quota={quota} plan={plan} />
                )}

                {loading ? (
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 mb-6 animate-pulse" style={{ height: 200 }} />
                ) : (
                  <TrendChart records={records} days={activePeriod} />
                )}

                {!loading && records.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.01] px-5 py-3.5"
                  >
                    <p className="text-sm text-neutral-600">
                      <span className="text-neutral-400 font-medium">{records.length}</span> total records
                    </p>
                    <button
                      onClick={() => setActiveTab('activity')}
                      className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      View activity log
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── ACTIVITY ── */}
            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
                    <p className="col-span-3 text-xs font-bold uppercase tracking-widest text-neutral-600">Time</p>
                    <p className="col-span-4 text-xs font-bold uppercase tracking-widest text-neutral-600">Model</p>
                    <p className="col-span-3 text-xs font-bold uppercase tracking-widest text-neutral-600">Tokens</p>
                    <p className="col-span-2 text-right text-xs font-bold uppercase tracking-widest text-neutral-600">Cost</p>
                  </div>

                  {loading ? (
                    <>{[...Array(8)].map((_, i) => <SkeletonRow key={i} />)}</>
                  ) : records.length === 0 ? (
                    <div className="px-5 py-16 text-center">
                      <p className="text-sm text-neutral-600">No LLM usage recorded yet.</p>
                      <p className="text-xs text-neutral-700 mt-1.5 max-w-xs mx-auto">
                        Usage is logged automatically when you run{' '}
                        <code className="font-mono">refactron analyze</code> or{' '}
                        <code className="font-mono">refactron refactor</code>.
                      </p>
                    </div>
                  ) : (
                    records.map((rec, i) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.025 }}
                        className="grid grid-cols-12 gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <p className="col-span-3 text-sm text-neutral-500 font-mono">
                          {formatRelativeTime(rec.createdAt)}
                        </p>
                        <div className="col-span-4">
                          <span className="font-mono text-sm text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-md">
                            {rec.model}
                          </span>
                        </div>
                        <p className="col-span-3 text-sm text-neutral-500 font-mono">
                          {rec.totalTokens.toLocaleString()}
                          <span className="text-neutral-700 ml-1 text-xs">
                            ({rec.promptTokens}↑ {rec.completionTokens}↓)
                          </span>
                        </p>
                        <p className="col-span-2 text-right text-sm text-neutral-500 font-mono">
                          {formatCost(rec.estimatedCost)}
                        </p>
                      </motion.div>
                    ))
                  )}
                </div>

                {!loading && records.length > 0 && (
                  <p className="mt-4 text-center text-sm text-neutral-600">
                    {records.length} record{records.length !== 1 ? 's' : ''} · last {periodLabel}
                  </p>
                )}
              </motion.div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-base font-semibold text-white mb-1">Preferred Model</p>
                      <p className="text-sm text-neutral-500">
                        Used when the CLI doesn't specify a model explicitly.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveModel}
                      disabled={
                        modelSaving ||
                        selectedModel === (user?.preferredModel || 'llama-3.3-70b-versatile')
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {modelSaved ? (
                        <><Check className="h-3.5 w-3.5 text-emerald-600" />Saved</>
                      ) : modelSaving ? (
                        'Saving…'
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_MODELS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                          selectedModel === m.id
                            ? 'border-white/20 bg-white/[0.06]'
                            : 'border-white/[0.06] bg-transparent hover:border-white/[0.12] hover:bg-white/[0.03]'
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-3.5 w-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            selectedModel === m.id ? 'border-white bg-white' : 'border-white/[0.20]'
                          }`}
                        >
                          {selectedModel === m.id && (
                            <div className="h-1.5 w-1.5 rounded-full bg-black" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white font-mono">{m.label}</p>
                          <p className="text-xs text-neutral-600 mt-0.5">{m.note}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Usage;
