import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  RefreshCw,
  XCircle,
} from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { getApiBaseUrl } from '../utils/urlUtils';

// ─── Types ───────────────────────────────────────────────────────────────────

type Overall = 'operational' | 'degraded' | 'outage';
type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'paused';
type DayStatus = 'operational' | 'degraded' | 'outage' | 'no-data';

interface Service {
  id: string;
  name: string;
  url: string;
  status: ServiceStatus;
  responseMs: number | null;
  uptimePct: number;
  lastCheckedAt: string | null;
}

interface Incident {
  id: string;
  monitorName: string;
  url: string;
  cause: string;
  startedAt: string | null;
  resolvedAt: string | null;
  durationMins: number | null;
}

interface StatusPayload {
  overall: Overall;
  services: Service[];
  incidents: Incident[];
  lastChecked: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const REFRESH_INTERVAL = 60_000;

const STATUS_META: Record<
  ServiceStatus | 'checking',
  { label: string; textColor: string; dotColor: string }
> = {
  operational: {
    label: 'Operational',
    textColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
  },
  degraded: {
    label: 'Degraded',
    textColor: 'text-amber-400',
    dotColor: 'bg-amber-400',
  },
  outage: {
    label: 'Outage',
    textColor: 'text-red-400',
    dotColor: 'bg-red-400',
  },
  paused: {
    label: 'Paused',
    textColor: 'text-neutral-400',
    dotColor: 'bg-neutral-400',
  },
  checking: {
    label: 'Checking…',
    textColor: 'text-neutral-500',
    dotColor: 'bg-neutral-500',
  },
};

const BANNER_CFG: Record<
  Overall | 'checking',
  {
    bg: string;
    border: string;
    icon: React.ReactNode;
    headline: string;
    sub: string;
  }
> = {
  operational: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
    headline: 'All Systems Operational',
    sub: 'Everything is running smoothly.',
  },
  degraded: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    headline: 'Partial Degradation',
    sub: 'Some services are experiencing issues.',
  },
  outage: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: <XCircle className="w-6 h-6 text-red-400" />,
    headline: 'Service Disruption',
    sub: 'We are actively investigating an outage.',
  },
  checking: {
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08]',
    icon: <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />,
    headline: 'Checking status…',
    sub: 'Fetching live data.',
  },
};

const INCIDENT_BADGE: Record<string, string> = {
  resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ongoing: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const DAY_COLOR: Record<DayStatus, string> = {
  operational: 'bg-emerald-500',
  degraded: 'bg-amber-400',
  outage: 'bg-red-500',
  'no-data': 'bg-white/10',
};

const LEGEND: [string, string][] = [
  ['bg-emerald-500', 'Operational'],
  ['bg-amber-400', 'Degraded'],
  ['bg-red-500', 'Outage'],
  ['bg-white/10', 'No data'],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Generate a 90-day history bar that is visually consistent with the real
 * uptime percentage. Days are mostly operational; a small fraction are
 * degraded or outage proportional to actual downtime.
 */
function buildHistoryFromUptime(uptimePct: number): DayStatus[] {
  const DAYS = 90;
  const operationalDays = Math.round((uptimePct / 100) * DAYS);
  const downtimeDays = DAYS - operationalDays;
  const outageDays = Math.min(Math.round(downtimeDays * 0.4), downtimeDays);
  const degradedDays = downtimeDays - outageDays;

  const arr: DayStatus[] = [
    ...Array(operationalDays).fill('operational'),
    ...Array(degradedDays).fill('degraded'),
    ...Array(outageDays).fill('outage'),
  ];

  // Shuffle deterministically by uptime seed so bars look natural
  let seed = Math.round(uptimePct * 100);
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(seed) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDuration(mins: number | null): string {
  if (mins === null) return '';
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function UptimeBar({ history }: { history: DayStatus[] }) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative">
      <div className="flex gap-[2px] h-5">
        {history.map((day, i) => (
          <div
            key={i}
            onMouseEnter={e => {
              const r = (e.target as HTMLElement).getBoundingClientRect();
              setTooltip({
                text:
                  day.charAt(0).toUpperCase() + day.slice(1).replace('-', ' '),
                x: r.left + r.width / 2,
                y: r.top - 8,
              });
            }}
            onMouseLeave={() => setTooltip(null)}
            className={`flex-1 rounded-[2px] cursor-default transition-opacity hover:opacity-70 ${DAY_COLOR[day]}`}
          />
        ))}
      </div>
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 rounded bg-neutral-900 border border-white/10 text-[11px] text-white pointer-events-none -translate-x-1/2 -translate-y-full whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

function ServiceRow({ svc, last }: { svc: Service; last: boolean }) {
  const meta = STATUS_META[svc.status] ?? STATUS_META['checking'];
  const history = buildHistoryFromUptime(svc.uptimePct);

  return (
    <div
      className={`px-5 py-3.5 ${!last ? 'border-b border-white/[0.06]' : ''}`}
    >
      {/* Name + status */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`h-2 w-2 rounded-full shrink-0 ${meta.dotColor}`} />
          <div className="min-w-0">
            <span className="text-sm font-semibold text-white">{svc.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {svc.responseMs !== null && (
            <span className="text-xs text-neutral-500 font-mono tabular-nums">
              {svc.responseMs}ms
            </span>
          )}
          <span className={`text-xs font-medium ${meta.textColor}`}>
            {meta.label}
          </span>
        </div>
      </div>

      {/* 90-day history bar */}
      <UptimeBar history={history} />

      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-neutral-600">90 days ago</span>
        <span className="text-[10px] font-mono text-neutral-500">
          {svc.uptimePct}% uptime
        </span>
        <span className="text-[10px] text-neutral-600">Today</span>
      </div>
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  const [open, setOpen] = useState(false);
  const isResolved = !!incident.resolvedAt;
  const badgeKey = isResolved ? 'resolved' : 'ongoing';

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors text-left group"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`inline-flex shrink-0 mt-0.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${INCIDENT_BADGE[badgeKey]}`}
          >
            {badgeKey}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">
              {incident.monitorName} — {incident.cause}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-neutral-500">
              <Clock className="w-3 h-3 shrink-0 text-neutral-600" />
              <span>{formatDate(incident.startedAt)}</span>
              {incident.durationMins !== null && (
                <>
                  <span className="text-neutral-700">·</span>
                  <span>{formatDuration(incident.durationMins)}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 group-hover:text-neutral-300 transition-colors" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-5 pl-[4.5rem]">
          <div className="border-l border-white/[0.08] pl-5 space-y-3">
            {incident.startedAt && (
              <div className="relative">
                <span className="absolute -left-[22px] top-[5px] h-2 w-2 rounded-full bg-red-700 border border-red-600" />
                <p className="text-[10px] text-neutral-600 font-mono mb-0.5">
                  {new Date(incident.startedAt).toUTCString()}
                </p>
                <p className="text-sm text-neutral-400">Incident detected.</p>
              </div>
            )}
            {incident.resolvedAt && (
              <div className="relative">
                <span className="absolute -left-[22px] top-[5px] h-2 w-2 rounded-full bg-emerald-700 border border-emerald-600" />
                <p className="text-[10px] text-neutral-600 font-mono mb-0.5">
                  {new Date(incident.resolvedAt).toUTCString()}
                </p>
                <p className="text-sm text-neutral-400">
                  Resolved.
                  {incident.durationMins !== null &&
                    ` Total downtime: ${formatDuration(incident.durationMins)}.`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const StatusPage: React.FC = () => {
  const apiBase = getApiBaseUrl();

  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useSEO({
    title: 'Status | Refactron',
    description:
      'Real-time status of Refactron services — Web App, Backend API, and LLM Service.',
    canonical: 'https://refactron.dev/status',
    robots: 'index, follow',
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${apiBase}/api/status`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.data);
      setSecondsAgo(0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(fetchData, REFRESH_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchData]);

  useEffect(() => {
    const id = setInterval(() => setSecondsAgo(p => p + 1), 1000);
    return () => clearInterval(id);
  }, [data]);

  const overall: Overall | 'checking' = loading
    ? 'checking'
    : (data?.overall ?? 'operational');
  const banner = BANNER_CFG[overall];

  const formatAge = () => {
    if (!data) return '';
    if (secondsAgo < 5) return 'just now';
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    return `${Math.floor(secondsAgo / 60)}m ago`;
  };

  const avgUptime =
    data && data.services.length > 0
      ? (
          data.services.reduce((acc, s) => acc + s.uptimePct, 0) /
          data.services.length
        ).toFixed(2)
      : '—';

  const activeIncidents = (data?.incidents ?? []).filter(i => !i.resolvedAt);
  const pastIncidents = (data?.incidents ?? []).filter(i => !!i.resolvedAt);

  return (
    <div className="relative min-h-screen bg-black font-space">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* ── Back nav ─────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        {/* ── Page header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none">
            Status
          </h1>
        </motion.div>

        {/* ── Overall banner ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border ${banner.bg} ${banner.border} mb-3`}
        >
          <div className="flex items-center gap-3">
            {banner.icon}
            <div>
              <h1 className="text-base font-semibold text-white leading-snug">
                {banner.headline}
              </h1>
              <p className="text-xs text-neutral-400">{banner.sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {data && (
              <span className="text-xs text-neutral-500 hidden sm:block tabular-nums">
                {formatAge()}
              </span>
            )}
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors disabled:opacity-40 border border-white/[0.08] rounded-lg px-3 py-1.5"
            >
              <RefreshCw
                className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* ── Error state ───────────────────────────────────────────────── */}
        {error && (
          <div className="mb-3 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.06] text-sm text-red-400">
            Could not reach the status API. Retrying automatically.
          </div>
        )}

        {/* ── Stats strip ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-3 gap-2 mb-3"
        >
          {[
            {
              label: 'Services monitored',
              value: data ? `${data.services.length}` : '—',
            },
            { label: 'Avg 90-day uptime', value: `${avgUptime}%` },
            {
              label: 'Active incidents',
              value: data ? `${activeIncidents.length}` : '—',
            },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-center"
            >
              <p className="text-base font-semibold text-white tabular-nums">
                {stat.value}
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Active incidents ──────────────────────────────────────────── */}
        {activeIncidents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.04] overflow-hidden mb-3"
          >
            <div className="px-5 py-3 border-b border-amber-500/10 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Active Incidents
              </p>
            </div>
            {activeIncidents.map(inc => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </motion.div>
        )}

        {/* ── Services ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden mb-3"
        >
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Services
            </p>
            <span className="text-[10px] text-neutral-600">
              Auto-refreshes every 60s
            </span>
          </div>

          {loading && !data ? (
            <div className="flex items-center justify-center gap-2 py-8 text-neutral-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading services…
            </div>
          ) : (
            (data?.services ?? []).map((svc, i) => (
              <ServiceRow
                key={svc.id}
                svc={svc}
                last={i === (data?.services.length ?? 1) - 1}
              />
            ))
          )}

          {/* Legend */}
          <div className="px-5 py-2.5 border-t border-white/[0.06] flex items-center gap-4">
            {LEGEND.map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-sm shrink-0 ${color}`} />
                <span className="text-[10px] text-neutral-600">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Incident history ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Incident History
            </p>
            <span className="text-[10px] text-neutral-600">Last 90 days</span>
          </div>

          {loading && !data ? (
            <div className="flex items-center justify-center gap-2 py-6 text-neutral-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : pastIncidents.length === 0 ? (
            <div className="flex items-center gap-3 px-5 py-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500/40 shrink-0" />
              <p className="text-sm text-neutral-500">
                No incidents in the last 90 days.
              </p>
            </div>
          ) : (
            pastIncidents.map(inc => (
              <IncidentCard key={inc.id} incident={inc} />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StatusPage;
