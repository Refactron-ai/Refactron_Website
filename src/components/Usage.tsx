import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getUsageStats, UsageRecord } from '../services/usage.service';
import DashboardLayout from './DashboardLayout';

const PERIODS = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

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
      <div
        key={i}
        className={`col-span-${cols} h-3.5 rounded-md bg-white/[0.04] animate-pulse`}
      />
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
    <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-3">
      {label}
    </p>
    <p className="text-3xl font-semibold text-white font-space leading-none">
      {value}
    </p>
    <p className="text-sm text-neutral-500 mt-2">{sub}</p>
  </motion.div>
);

const Usage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState(30);
  const [loading, setLoading] = useState(false);
  const [totalRequests, setTotalRequests] = useState<number | null>(null);
  const [totalTokens, setTotalTokens] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isPro = user?.plan === 'pro' || user?.plan === 'enterprise';

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
            Track LLM token usage, costs, and activity history with a Pro or
            Enterprise plan.
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

  const periodLabel =
    PERIODS.find(p => p.days === activePeriod)?.label ?? '30d';

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                <BarChart2 className="h-4 w-4 text-neutral-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white leading-tight">
                  Usage
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  LLM token consumption and activity
                </p>
              </div>
            </div>

            {/* Period selector */}
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
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard
              label="LLM Calls"
              value={
                loading || totalRequests === null
                  ? '—'
                  : totalRequests.toLocaleString()
              }
              sub={`last ${periodLabel}`}
              index={0}
            />
            <StatCard
              label="Tokens Used"
              value={
                loading || totalTokens === null
                  ? '—'
                  : formatTokens(totalTokens)
              }
              sub={`last ${periodLabel}`}
              index={1}
            />
            <StatCard
              label="Est. Cost"
              value={
                loading || totalCost === null ? '—' : formatCost(totalCost)
              }
              sub={`last ${periodLabel}`}
              index={2}
            />
          </div>

          {/* Activity table */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
              <p className="col-span-3 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Time
              </p>
              <p className="col-span-4 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Model
              </p>
              <p className="col-span-3 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Tokens
              </p>
              <p className="col-span-2 text-right text-xs font-bold uppercase tracking-widest text-neutral-600">
                Cost
              </p>
            </div>

            {loading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </>
            ) : records.length === 0 ? (
              <div className="px-5 py-14 text-center">
                <p className="text-sm text-neutral-600">
                  No LLM usage recorded yet.
                </p>
                <p className="text-xs text-neutral-700 mt-1 max-w-xs mx-auto">
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
                  transition={{ duration: 0.3, delay: i * 0.03 }}
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
                    <span className="text-neutral-700 ml-1">
                      ({rec.promptTokens}↑ {rec.completionTokens}↓)
                    </span>
                  </p>
                  <p className="col-span-2 text-right text-sm text-neutral-500 font-mono">
                    {formatCost(rec.estimatedCost)}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>

          {!loading && records.length > 0 && (
            <p className="mt-4 text-center text-sm text-neutral-600">
              {records.length} record{records.length !== 1 ? 's' : ''} · last{' '}
              {periodLabel}
            </p>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Usage;
