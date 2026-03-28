import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { getApiBaseUrl } from '../utils/urlUtils';

interface AuditLogEntry {
  id: string;
  action: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
}

const actionLabel: Record<string, { label: string; color: string }> = {
  login: { label: 'Login', color: 'text-teal-400' },
  logout: { label: 'Logout', color: 'text-neutral-400' },
  api_key_created: { label: 'API Key Created', color: 'text-blue-400' },
  api_key_revoked: { label: 'API Key Revoked', color: 'text-amber-400' },
  password_changed: { label: 'Password Changed', color: 'text-purple-400' },
  profile_updated: { label: 'Profile Updated', color: 'text-neutral-400' },
  subscription_created: { label: 'Subscription Created', color: 'text-emerald-400' },
  subscription_cancelled: { label: 'Subscription Cancelled', color: 'text-red-400' },
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const AuditLogs: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const isEnterprise = user?.plan === 'enterprise';
  const apiBase = getApiBaseUrl();
  const token = localStorage.getItem('accessToken');

  const fetchLogs = useCallback(
    async (p: number) => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/api/audit-logs?page=${p}&pageSize=20`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setLogs(data.logs ?? []);
          setTotal(data.total ?? 0);
          setTotalPages(data.totalPages ?? 1);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    },
    [apiBase, token]
  );

  useEffect(() => {
    if (isEnterprise) fetchLogs(page);
    else setLoading(false);
  }, [isEnterprise, page, fetchLogs]);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <Shield className="h-4 w-4 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">
                Audit Logs
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Full event history for your account.
              </p>
            </div>
          </div>

          {/* Enterprise gate */}
          {!isEnterprise ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <Lock className="h-5 w-5 text-neutral-600" />
                </div>
              </div>
              <p className="text-base font-medium text-neutral-400 mb-2">
                Audit logs are available on the Enterprise plan
              </p>
              <p className="text-sm text-neutral-600 mb-5">
                Get a full event history including logins, API key activity, and
                billing changes.
              </p>
              <a
                href="mailto:team@refactron.dev?subject=Enterprise%20Plan%20Enquiry"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Contact us to upgrade
              </a>
            </div>
          ) : loading ? (
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl border border-white/[0.05] bg-white/[0.02] animate-pulse"
                />
              ))}
            </div>
          ) : logs.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
              <p className="text-sm text-neutral-600">No audit events recorded yet.</p>
            </div>
          ) : (
            <>
              {/* Summary */}
              <p className="text-xs text-neutral-600 mb-4">
                Showing {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} of {total} events
              </p>

              {/* Table */}
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto] text-[10px] font-bold uppercase tracking-widest text-neutral-700 px-5 py-3 border-b border-white/[0.06]">
                  <span>Event</span>
                  <span className="pr-6">IP Address</span>
                  <span>Time</span>
                </div>
                {logs.map((log, i) => {
                  const meta = actionLabel[log.action] ?? {
                    label: log.action.replace(/_/g, ' '),
                    color: 'text-neutral-400',
                  };
                  return (
                    <div
                      key={log.id}
                      className={`grid grid-cols-[1fr_auto_auto] items-center px-5 py-3.5 text-sm ${
                        i !== logs.length - 1 ? 'border-b border-white/[0.04]' : ''
                      }`}
                    >
                      <div>
                        <span className={`font-medium ${meta.color}`}>{meta.label}</span>
                        {log.details && (
                          <p className="text-xs text-neutral-700 mt-0.5 truncate max-w-xs">
                            {log.details}
                          </p>
                        )}
                      </div>
                      <span className="pr-6 font-mono text-xs text-neutral-600">
                        {log.ipAddress ?? '—'}
                      </span>
                      <span className="text-xs text-neutral-600 whitespace-nowrap">
                        {formatDate(log.createdAt)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-white/[0.14] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Previous
                  </button>
                  <span className="text-xs text-neutral-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-white/[0.14] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
