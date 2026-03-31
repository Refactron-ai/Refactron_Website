import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Lock,
  Mail,
  Activity,
  ChevronLeft,
  ChevronRight,
  X,
  Crown,
  Shield,
  UserMinus,
  Plus,
  Check,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { getApiBaseUrl } from '../utils/urlUtils';
import { useLocation } from 'react-router-dom';

// ── types ─────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  userId: string;
  role: string;
  joinedAt: string;
  user: { id: string; email: string; fullName: string | null };
}

interface TeamInvite {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
  createdAt: string;
  invitedBy: { email: string; fullName: string | null };
}

interface ActivityLog {
  id: string;
  action: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
  user: { email: string; fullName: string | null };
}

interface UsageMember {
  userId: string;
  email: string;
  fullName: string | null;
  totalTokens: number;
  estimatedCost: number;
  requestCount: number;
}

interface UsageModel {
  model: string;
  totalTokens: number;
  estimatedCost: number;
  requestCount: number;
}

interface UsageOperation {
  operationType: string;
  count: number;
}

interface MemberUsageDetail {
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  byModel: UsageModel[];
  byOperation: UsageOperation[];
}

interface TeamUsage {
  totalTokens: number;
  totalCost: number;
  byMember: UsageMember[];
  byModel: UsageModel[];
  byOperation: UsageOperation[];
}

interface HeatmapDay {
  date: string;
  count: number;
}

interface TeamData {
  id: string;
  name: string;
  ownerId: string;
}

type Tab = 'members' | 'invites' | 'activity';

// ── helpers ───────────────────────────────────────────────────────────────────

const actionLabel: Record<string, { label: string; color: string }> = {
  login: { label: 'Login', color: 'text-neutral-300' },
  logout: { label: 'Logout', color: 'text-neutral-500' },
  api_key_created: { label: 'API Key Created', color: 'text-neutral-300' },
  api_key_revoked: { label: 'API Key Revoked', color: 'text-red-400' },
  password_changed: { label: 'Password Changed', color: 'text-neutral-300' },
  profile_updated: { label: 'Profile Updated', color: 'text-neutral-400' },
  team_invite_sent: { label: 'Invite Sent', color: 'text-neutral-300' },
  team_invite_accepted: { label: 'Invite Accepted', color: 'text-emerald-400' },
  team_invite_cancelled: {
    label: 'Invite Cancelled',
    color: 'text-neutral-500',
  },
  team_member_removed: { label: 'Member Removed', color: 'text-red-400' },
  team_role_changed: { label: 'Role Changed', color: 'text-neutral-300' },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  );
}

function formatRelative(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    owner: 'bg-white/[0.08] text-white border-white/[0.12]',
    admin: 'bg-white/[0.04] text-neutral-300 border-white/[0.08]',
    member: 'bg-transparent text-neutral-500 border-white/[0.05]',
  };
  const icons: Record<string, React.ReactNode> = {
    owner: <Crown className="w-2.5 h-2.5" />,
    admin: <Shield className="w-2.5 h-2.5" />,
    member: null,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${styles[role] ?? styles.member}`}
    >
      {icons[role]}
      {role}
    </span>
  );
}

function EnterpriseLock() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
      <div className="flex justify-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <Lock className="h-5 w-5 text-neutral-600" />
        </div>
      </div>
      <p className="text-base font-medium text-neutral-400 mb-2">
        Team Management is available on the Enterprise plan
      </p>
      <p className="text-sm text-neutral-600 mb-6">
        Invite teammates, assign roles, and track team-wide activity from one
        place.
      </p>
      <a
        href="mailto:team@refactron.dev?subject=Enterprise%20Plan%20Enquiry"
        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
      >
        Contact us to upgrade
      </a>
    </div>
  );
}

function SkeletonRows({ n = 4 }: { n?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Invite button skeleton */}
      <div className="h-9 w-36 rounded-xl bg-white/[0.04] border border-white/[0.06]" />
      {/* Table skeleton */}
      <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* Header — matches grid-cols-[1fr_auto_auto_auto] */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3 border-b border-white/[0.06] gap-6">
          <div className="h-2 w-14 rounded bg-white/[0.04]" />
          <div className="h-2 w-8 rounded bg-white/[0.04]" />
          <div className="h-2 w-12 rounded bg-white/[0.04]" />
          <div className="h-2 w-14 rounded bg-white/[0.04]" />
        </div>
        {/* Data rows */}
        {Array.from({ length: n }).map((_, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3.5 gap-6 ${i !== n - 1 ? 'border-b border-white/[0.04]' : ''}`}
          >
            {/* Member col: avatar + name/email */}
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-white/[0.05] flex-shrink-0" />
              <div className="space-y-1.5">
                <div className="h-2.5 w-28 rounded bg-white/[0.05]" />
                <div className="h-2 w-40 rounded bg-white/[0.03]" />
              </div>
            </div>
            {/* Role badge */}
            <div className="h-5 w-14 rounded-md bg-white/[0.04]" />
            {/* Joined */}
            <div className="h-2 w-10 rounded bg-white/[0.03]" />
            {/* Actions */}
            <div className="h-2 w-4 rounded bg-white/[0.02]" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

const TeamManagement: React.FC = () => {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const apiBase = getApiBaseUrl();
  const token = localStorage.getItem('accessToken');
  const effectivePlan = user?.effectivePlan ?? user?.plan ?? 'free';
  const isEnterprise =
    effectivePlan === 'enterprise' || user?.plan === 'enterprise';

  const [tab, setTab] = useState<Tab>('members');
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [activityTotal, setActivityTotal] = useState(0);
  const [activityPage, setActivityPage] = useState(1);
  const [activityTotalPages, setActivityTotalPages] = useState(1);
  const [usage, setUsage] = useState<TeamUsage | null>(null);
  const [usageTab, setUsageTab] = useState<'all' | string>('all');
  const [memberUsageCache, setMemberUsageCache] = useState<
    Record<string, MemberUsageDetail>
  >({});
  const [memberUsageLoading, setMemberUsageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [hasTeamAccess, setHasTeamAccess] = useState(false);
  const [heatmap, setHeatmap] = useState<HeatmapDay[]>([]);
  const [heatmapLoaded, setHeatmapLoaded] = useState(false);
  const [heatmapError, setHeatmapError] = useState(false);

  // Invite accept state
  const inviteToken = new URLSearchParams(location.search).get('invite');
  const [inviteAccepting, setInviteAccepting] = useState(!!inviteToken);
  const [inviteResult, setInviteResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  // Invite form
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  // Per-member action states
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [roleChangingId, setRoleChangingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [activityError, setActivityError] = useState<string | null>(null);
  const actionErrorTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const headers = { Authorization: `Bearer ${token}` };

  // ── data loading ────────────────────────────────────────────────────────────

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Enterprise owners: ensure team exists on first load only
      if (isEnterprise && !teamData) {
        const createRes = await fetch(`${apiBase}/api/team`, {
          method: 'POST',
          headers,
        });
        if (!createRes.ok) {
          setError('Failed to initialize your team. Please try again.');
          return;
        }
      }

      // Single combined call for all dashboard data
      const res = await fetch(`${apiBase}/api/team/dashboard`, { headers });
      const data = await res.json();

      if (!data.success) {
        setHasTeamAccess(false);
        return;
      }

      setHasTeamAccess(true);
      setTeamData(data.team);
      setMembers(data.members ?? []);
      setInvites(data.pendingInvites ?? []);
      setUsage(data.usage ?? null);
      // Reset activity so it re-fetches from page 1 on next tab visit
      setActivityPage(1);
      setActivityLoaded(false);
      setHeatmapLoaded(false);
    } catch {
      setError(
        'Could not connect to the server. Check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnterprise, apiBase, token]);

  const loadActivity = useCallback(
    async (page: number) => {
      setActivityLoading(true);
      setActivityError(null);
      try {
        const t = localStorage.getItem('accessToken');
        const res = await fetch(`${apiBase}/api/team/activity?page=${page}`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? 'Failed to load activity');
        if (data.success) {
          setActivity(data.logs);
          setActivityTotal(data.total);
          setActivityTotalPages(Math.ceil(data.total / 20) || 1);
        }
      } catch (err: any) {
        setActivityError(err.message ?? 'Failed to load activity');
      } finally {
        setActivityLoading(false);
      }
    },
    [apiBase]
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const loadHeatmap = useCallback(async () => {
    setHeatmapError(false);
    try {
      const t = localStorage.getItem('accessToken');
      const res = await fetch(`${apiBase}/api/team/heatmap?days=30`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setHeatmapError(true);
        return;
      }
      setHeatmap(data.heatmap ?? []);
    } catch {
      setHeatmapError(true);
    }
  }, [apiBase]);

  // Lazy-load activity on first tab visit
  useEffect(() => {
    if (tab === 'activity' && !activityLoaded && hasTeamAccess) {
      loadActivity(1);
      setActivityLoaded(true);
    }
    if (tab === 'activity' && !heatmapLoaded && hasTeamAccess) {
      loadHeatmap();
      setHeatmapLoaded(true);
    }
  }, [
    tab,
    activityLoaded,
    heatmapLoaded,
    hasTeamAccess,
    loadActivity,
    loadHeatmap,
  ]);

  // Auto-accept invite from URL ?invite=<token>
  useEffect(() => {
    if (!inviteToken) return;
    const capturedToken = inviteToken;
    const capturedApiBase = getApiBaseUrl();
    (async () => {
      setInviteAccepting(true);
      try {
        // Read token fresh inside the effect to avoid stale closure
        const authToken = localStorage.getItem('accessToken');
        const authHeaders = {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };
        const res = await fetch(`${capturedApiBase}/api/team/invites/accept`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({ token: capturedToken }),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message ?? 'Failed to accept the invite.');
        if (data.success) {
          setInviteResult({
            ok: true,
            message:
              "You've joined the team! You can now collaborate with your teammates.",
          });
          const meRes = await fetch(`${capturedApiBase}/api/auth/me`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          const meData = await meRes.json();
          if (meData.success && meData.user) updateUser(meData.user);
          loadDashboard();
        } else {
          setInviteResult({
            ok: false,
            message: data.message ?? 'Failed to accept the invite.',
          });
        }
      } catch (err: any) {
        setInviteResult({
          ok: false,
          message: err.message ?? 'Network error. Please try again.',
        });
      } finally {
        setInviteAccepting(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── derived state ───────────────────────────────────────────────────────────

  const myMembership = members.find(m => m.userId === user?.id);
  const myRole = myMembership?.role ?? null;
  const isOwnerRole = myRole === 'owner';
  const canManage = myRole === 'owner' || myRole === 'admin';

  // ── actions ─────────────────────────────────────────────────────────────────

  const showActionError = useCallback((msg: string) => {
    setActionError(msg);
    if (actionErrorTimer.current) clearTimeout(actionErrorTimer.current);
    actionErrorTimer.current = setTimeout(() => setActionError(null), 4000);
  }, []);

  // Clean up timer on unmount
  useEffect(
    () => () => {
      if (actionErrorTimer.current) clearTimeout(actionErrorTimer.current);
    },
    []
  );

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    const sentTo = inviteEmail.trim(); // capture before clearing (U2)
    setInviteLoading(true);
    setInviteMsg(null);
    try {
      const res = await fetch(`${apiBase}/api/team/invites`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sentTo, role: inviteRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Failed to send invite.');
      if (data.success) {
        setInvites(prev => [data.invite, ...prev]);
        setInviteEmail('');
        setInviteRole('member');
        setShowInviteForm(false);
        setInviteMsg({ type: 'ok', text: `Invite sent to ${sentTo}` });
        setTimeout(() => setInviteMsg(null), 5000);
      } else {
        setInviteMsg({
          type: 'err',
          text: data.message ?? 'Failed to send invite.',
        });
      }
    } catch (err: any) {
      setInviteMsg({
        type: 'err',
        text: err.message ?? 'Network error. Please try again.',
      });
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    setRemovingId(memberId);
    try {
      const res = await fetch(`${apiBase}/api/team/members/${memberId}`, {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Failed to remove member.');
      if (data.success) {
        setMembers(prev => prev.filter(m => m.userId !== memberId));
        setConfirmRemoveId(null);
      } else {
        showActionError(data.message ?? 'Failed to remove member.');
      }
    } catch (err: any) {
      showActionError(err.message ?? 'Network error. Could not remove member.');
    } finally {
      setRemovingId(null);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: string) => {
    if (roleChangingId) return; // prevent concurrent role changes
    setRoleChangingId(memberId);
    try {
      const res = await fetch(`${apiBase}/api/team/members/${memberId}/role`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Failed to update role.');
      if (data.success) {
        setMembers(prev =>
          prev.map(m => (m.userId === memberId ? { ...m, role: newRole } : m))
        );
      } else {
        showActionError(data.message ?? 'Failed to update role.');
      }
    } catch (err: any) {
      showActionError(err.message ?? 'Network error. Could not update role.');
    } finally {
      setRoleChangingId(null);
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    setCancellingId(inviteId);
    try {
      const res = await fetch(`${apiBase}/api/team/invites/${inviteId}`, {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Failed to cancel invite.');
      if (data.success) {
        setInvites(prev => prev.filter(i => i.id !== inviteId));
      } else {
        showActionError(data.message ?? 'Failed to cancel invite.');
      }
    } catch (err: any) {
      showActionError(err.message ?? 'Network error. Could not cancel invite.');
    } finally {
      setCancellingId(null);
    }
  };

  // ── render ───────────────────────────────────────────────────────────────────

  const renderContent = () => {
    // Invite accept flow — always shown when arriving via ?invite=
    if (inviteToken && (inviteAccepting || inviteResult)) {
      return (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
          {inviteAccepting ? (
            <>
              <div className="flex justify-center mb-5">
                <div className="h-10 w-10 rounded-full border-2 border-white/[0.08] border-t-white/60 animate-spin" />
              </div>
              <p className="text-sm font-medium text-neutral-400">
                Accepting invitation…
              </p>
            </>
          ) : inviteResult?.ok ? (
            <>
              <div className="flex justify-center mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.06]">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-base font-semibold text-white mb-2">
                Invitation accepted!
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                {inviteResult.message}
              </p>
              <button
                onClick={() => setInviteResult(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-neutral-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition-colors"
              >
                View Team
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.06]">
                  <X className="h-6 w-6 text-red-400" />
                </div>
              </div>
              <p className="text-base font-semibold text-white mb-2">
                Invite could not be accepted
              </p>
              <p className="text-sm text-neutral-500">
                {inviteResult?.message}
              </p>
            </>
          )}
        </div>
      );
    }

    if (loading) {
      return <SkeletonRows n={5} />;
    }

    if (error) {
      return (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <AlertCircle className="h-5 w-5 text-neutral-500" />
            </div>
          </div>
          <p className="text-sm text-neutral-400 mb-5">{error}</p>
          <button
            onClick={loadDashboard}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </button>
        </div>
      );
    }

    if (!isEnterprise && !hasTeamAccess) {
      return <EnterpriseLock />;
    }

    const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
      {
        id: 'members',
        icon: Users,
        label: `Members${members.length ? ` (${members.length})` : ''}`,
      },
      ...(canManage
        ? [
            {
              id: 'invites' as Tab,
              icon: Mail,
              label: `Pending${invites.length ? ` (${invites.length})` : ''}`,
            },
          ]
        : []),
      { id: 'activity', icon: Activity, label: 'Activity' },
    ];

    return (
      <>
        {/* Team notice for non-owner members */}
        {(myRole === 'member' || myRole === 'admin') && teamData && (
          <div className="mb-5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 flex items-center gap-3">
            <Users className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            <span className="text-sm text-neutral-500">
              You are a{' '}
              <span className="font-medium text-neutral-300">{myRole}</span> of{' '}
              <span className="font-medium text-neutral-300">
                {teamData.name}
              </span>
            </span>
          </div>
        )}

        {/* Action error toast */}
        {actionError && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-400">{actionError}</p>
          </div>
        )}

        {/* Tab bar */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl border border-white/[0.06] bg-white/[0.02] w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-white/[0.08] text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Members tab ──────────────────────────────────────────────────── */}
        {tab === 'members' && (
          <div className="space-y-4">
            {/* Invite controls — only for owner/admin */}
            {canManage && (
              <div>
                {!showInviteForm ? (
                  <button
                    onClick={() => setShowInviteForm(true)}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Invite Member
                  </button>
                ) : (
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                      Invite a new member
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="colleague@company.com"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleInvite()}
                        className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
                      />
                      <select
                        value={inviteRole}
                        onChange={e =>
                          setInviteRole(e.target.value as 'member' | 'admin')
                        }
                        className="rounded-xl border border-white/[0.08] bg-neutral-900 px-3 py-2 text-sm text-neutral-300 focus:outline-none focus:border-white/20"
                      >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    {inviteMsg && (
                      <p
                        className={`text-xs flex items-center gap-1.5 ${
                          inviteMsg.type === 'ok'
                            ? 'text-neutral-300'
                            : 'text-red-400'
                        }`}
                      >
                        {inviteMsg.type === 'ok' ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {inviteMsg.text}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={handleInvite}
                        disabled={inviteLoading || !inviteEmail.trim()}
                        className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.06] px-4 py-2 text-sm font-medium text-neutral-200 hover:border-white/20 hover:bg-white/[0.10] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {inviteLoading ? 'Sending…' : 'Send Invite'}
                      </button>
                      <button
                        onClick={() => {
                          setShowInviteForm(false);
                          setInviteMsg(null);
                          setInviteEmail('');
                        }}
                        className="rounded-xl border border-white/[0.06] bg-transparent px-4 py-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {inviteMsg?.type === 'ok' && !showInviteForm && (
                  <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-400" />{' '}
                    {inviteMsg.text}
                  </p>
                )}
              </div>
            )}

            {/* Members table */}
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
              <div
                className={`grid text-[10px] font-bold uppercase tracking-widest text-neutral-700 px-5 py-3 border-b border-white/[0.06] ${
                  canManage
                    ? 'grid-cols-[1fr_auto_auto_auto]'
                    : 'grid-cols-[1fr_auto_auto]'
                }`}
              >
                <span>Member</span>
                <span className="pr-6">Role</span>
                <span className={canManage ? 'pr-6' : ''}>Joined</span>
                {canManage && <span>Actions</span>}
              </div>
              {members.map((m, i) => {
                const isSelf = m.userId === user?.id;
                const isThisOwner = m.userId === teamData?.ownerId;
                const showActions = canManage && !isSelf && !isThisOwner;
                return (
                  <div
                    key={m.id}
                    className={`grid items-center px-5 py-3.5 text-sm ${
                      canManage
                        ? 'grid-cols-[1fr_auto_auto_auto]'
                        : 'grid-cols-[1fr_auto_auto]'
                    } ${i !== members.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-300 select-none flex-shrink-0">
                        {(m.user.fullName ?? m.user.email)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white leading-tight">
                          {m.user.fullName ?? m.user.email}
                          {isSelf && (
                            <span className="ml-1.5 text-[10px] text-neutral-600">
                              (you)
                            </span>
                          )}
                        </p>
                        {m.user.fullName && (
                          <p className="text-[11px] text-neutral-600 leading-tight">
                            {m.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="pr-6">
                      <RoleBadge role={m.role} />
                    </div>
                    <span
                      className={`text-xs text-neutral-600 ${canManage ? 'pr-6' : ''}`}
                    >
                      {formatRelative(m.joinedAt)}
                    </span>
                    {canManage && (
                      <div className="min-w-[100px] flex items-center gap-2">
                        {showActions ? (
                          confirmRemoveId === m.userId ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleRemoveMember(m.userId)}
                                disabled={removingId === m.userId}
                                className="text-[11px] text-red-400 hover:text-red-300 font-medium disabled:opacity-40 transition-colors"
                              >
                                {removingId === m.userId
                                  ? 'Removing…'
                                  : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setConfirmRemoveId(null)}
                                className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {isOwnerRole && (
                                <select
                                  value={m.role}
                                  onChange={e =>
                                    handleChangeRole(m.userId, e.target.value)
                                  }
                                  disabled={roleChangingId === m.userId}
                                  className="rounded-lg border border-white/[0.06] bg-neutral-900 px-2 py-1 text-[11px] text-neutral-400 focus:outline-none focus:border-white/20 transition-colors disabled:opacity-40 disabled:cursor-wait"
                                >
                                  <option value="member">Member</option>
                                  <option value="admin">Admin</option>
                                </select>
                              )}
                              <button
                                onClick={() => setConfirmRemoveId(m.userId)}
                                className="text-neutral-600 hover:text-red-400 transition-colors"
                                title="Remove member"
                              >
                                <UserMinus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )
                        ) : (
                          <span className="text-neutral-700 text-xs">—</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Usage summary */}
            {usage &&
              isEnterprise &&
              (() => {
                const sortedMembers = [...usage.byMember].sort(
                  (a, b) => b.totalTokens - a.totalTokens
                );
                const activeMembers = sortedMembers.filter(
                  m => m.totalTokens > 0
                );
                const totalRequests = usage.byOperation.reduce(
                  (s, o) => s + o.count,
                  0
                );

                const UsageBar = ({ pct }: { pct: number }) => (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-white/[0.06]">
                      <div
                        className="h-1 rounded-full bg-white/25 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-600 tabular-nums w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                );

                const ModelOpSection = ({
                  byModel,
                  byOperation,
                }: {
                  byModel: UsageModel[];
                  byOperation: UsageOperation[];
                }) => (
                  <div
                    className={`grid ${byOperation.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-white/[0.06]`}
                  >
                    {byModel.length > 0 && (
                      <div className="py-5 px-6">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-4">
                          By Model
                        </p>
                        <div className="space-y-4">
                          {byModel.map(m => {
                            const maxTok = byModel[0]?.totalTokens ?? 1;
                            const pct = Math.round(
                              (m.totalTokens / maxTok) * 100
                            );
                            const avg =
                              m.requestCount > 0
                                ? Math.round(m.totalTokens / m.requestCount)
                                : 0;
                            return (
                              <div key={m.model}>
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <p className="text-[11px] text-neutral-300 font-mono break-all leading-snug flex-1">
                                    {m.model}
                                  </p>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-[11px] font-mono text-neutral-300 tabular-nums">
                                      {m.totalTokens.toLocaleString()} tok
                                    </p>
                                    <p className="text-[10px] text-neutral-600 tabular-nums">
                                      ${m.estimatedCost.toFixed(4)} ·{' '}
                                      {m.requestCount} req ·{' '}
                                      {avg.toLocaleString()} t/req
                                    </p>
                                  </div>
                                </div>
                                <UsageBar pct={pct} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {byOperation.length > 0 && (
                      <div className="py-5 px-6">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-4">
                          Operations
                        </p>
                        <div className="space-y-3">
                          {byOperation.map(op => {
                            const maxCount = byOperation[0]?.count ?? 1;
                            const pct = Math.round((op.count / maxCount) * 100);
                            const totalOps = byOperation.reduce(
                              (s, o) => s + o.count,
                              0
                            );
                            const share =
                              totalOps > 0
                                ? Math.round((op.count / totalOps) * 100)
                                : 0;
                            return (
                              <div key={op.operationType}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[11px] text-neutral-400 capitalize">
                                    {op.operationType.replace(/_/g, ' ')}
                                  </span>
                                  <span className="text-[10px] text-neutral-600 tabular-nums">
                                    {share}% · {op.count.toLocaleString()}
                                  </span>
                                </div>
                                <UsageBar pct={pct} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );

                return (
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                    {/* ── Header + tabs ── */}
                    <div className="px-6 pt-5 pb-4 border-b border-white/[0.06]">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-4">
                        Team Usage — Last 30 Days
                      </p>
                      {/* Member tab bar */}
                      <div className="flex items-center gap-1 flex-wrap">
                        <button
                          onClick={() => setUsageTab('all')}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                            usageTab === 'all'
                              ? 'border-white/[0.12] bg-white/[0.06] text-neutral-200'
                              : 'border-transparent text-neutral-500 hover:text-neutral-300'
                          }`}
                        >
                          All Members
                        </button>
                        {sortedMembers.map(m => (
                          <button
                            key={m.userId}
                            onClick={async () => {
                              setUsageTab(m.userId);
                              if (memberUsageCache[m.userId]) return;
                              setMemberUsageLoading(true);
                              try {
                                const t = localStorage.getItem('accessToken');
                                const res = await fetch(
                                  `${apiBase}/api/team/members/${m.userId}/usage?days=30`,
                                  {
                                    headers: { Authorization: `Bearer ${t}` },
                                  }
                                );
                                const data = await res.json();
                                if (data.success) {
                                  setMemberUsageCache(prev => ({
                                    ...prev,
                                    [m.userId]: data.usage,
                                  }));
                                }
                              } finally {
                                setMemberUsageLoading(false);
                              }
                            }}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                              usageTab === m.userId
                                ? 'border-white/[0.12] bg-white/[0.06] text-neutral-200'
                                : 'border-transparent text-neutral-500 hover:text-neutral-300'
                            }`}
                          >
                            {m.fullName ?? m.email.split('@')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ── All Members view ── */}
                    {usageTab === 'all' && (
                      <>
                        {/* 4-stat strip */}
                        <div className="grid grid-cols-4 divide-x divide-white/[0.06] border-b border-white/[0.06]">
                          {[
                            {
                              label: 'Total Tokens',
                              value: usage.totalTokens.toLocaleString(),
                            },
                            {
                              label: 'Estimated Cost',
                              value: `$${usage.totalCost.toFixed(4)}`,
                            },
                            {
                              label: 'Total Requests',
                              value: totalRequests.toLocaleString(),
                            },
                            {
                              label: 'Active Members',
                              value: `${activeMembers.length} / ${members.length}`,
                            },
                          ].map(s => (
                            <div key={s.label} className="px-6 py-4">
                              <p className="text-[10px] text-neutral-600 mb-1">
                                {s.label}
                              </p>
                              <p className="text-lg font-semibold text-white tabular-nums">
                                {s.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Per-member list */}
                        {activeMembers.length > 0 && (
                          <div className="px-6 py-5 border-b border-white/[0.06]">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-4">
                              By Member
                            </p>
                            {/* Table header */}
                            <div className="grid grid-cols-12 gap-4 px-0 pb-2 border-b border-white/[0.04] mb-1">
                              <div className="col-span-4 text-[10px] text-neutral-700 uppercase tracking-wide">
                                Member
                              </div>
                              <div className="col-span-2 text-[10px] text-neutral-700 uppercase tracking-wide text-right">
                                Tokens
                              </div>
                              <div className="col-span-2 text-[10px] text-neutral-700 uppercase tracking-wide text-right">
                                Cost
                              </div>
                              <div className="col-span-2 text-[10px] text-neutral-700 uppercase tracking-wide text-right">
                                Requests
                              </div>
                              <div className="col-span-2 text-[10px] text-neutral-700 uppercase tracking-wide text-right">
                                Avg tok/req
                              </div>
                            </div>
                            <div className="space-y-0">
                              {activeMembers.map(m => {
                                const pct =
                                  usage.totalTokens > 0
                                    ? Math.round(
                                        (m.totalTokens / usage.totalTokens) *
                                          100
                                      )
                                    : 0;
                                const initials = (m.fullName ?? m.email)
                                  .split(/\s|@/)[0]
                                  .slice(0, 2)
                                  .toUpperCase();
                                const avg =
                                  m.requestCount > 0
                                    ? Math.round(m.totalTokens / m.requestCount)
                                    : 0;
                                const role =
                                  members.find(tm => tm.userId === m.userId)
                                    ?.role ?? 'member';
                                return (
                                  <div
                                    key={m.userId}
                                    className="py-3 border-b border-white/[0.03] last:border-0"
                                  >
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                      <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                                        <div className="h-7 w-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] font-semibold text-neutral-400 flex-shrink-0">
                                          {initials}
                                        </div>
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            <p className="text-sm text-neutral-200 truncate">
                                              {m.fullName ??
                                                m.email.split('@')[0]}
                                            </p>
                                            <span className="text-[9px] text-neutral-600 capitalize flex-shrink-0">
                                              {role}
                                            </span>
                                          </div>
                                          {m.fullName && (
                                            <p className="text-[10px] text-neutral-600 truncate">
                                              {m.email}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="col-span-2 text-right">
                                        <p className="text-sm font-mono text-neutral-300 tabular-nums">
                                          {m.totalTokens.toLocaleString()}
                                        </p>
                                      </div>
                                      <div className="col-span-2 text-right">
                                        <p className="text-sm font-mono text-neutral-500 tabular-nums">
                                          ${m.estimatedCost.toFixed(4)}
                                        </p>
                                      </div>
                                      <div className="col-span-2 text-right">
                                        <p className="text-sm font-mono text-neutral-500 tabular-nums">
                                          {m.requestCount.toLocaleString()}
                                        </p>
                                      </div>
                                      <div className="col-span-2 text-right">
                                        <p className="text-sm font-mono text-neutral-500 tabular-nums">
                                          {avg.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-2 pl-9">
                                      <UsageBar pct={pct} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Team-wide model + ops */}
                        <ModelOpSection
                          byModel={usage.byModel}
                          byOperation={usage.byOperation}
                        />
                      </>
                    )}

                    {/* ── Per-member view ── */}
                    {usageTab !== 'all' &&
                      (() => {
                        const selectedMember = sortedMembers.find(
                          m => m.userId === usageTab
                        );
                        const detail = memberUsageCache[usageTab];
                        const role =
                          members.find(tm => tm.userId === usageTab)?.role ??
                          'member';
                        const initials = selectedMember
                          ? (selectedMember.fullName ?? selectedMember.email)
                              .split(/\s|@/)[0]
                              .slice(0, 2)
                              .toUpperCase()
                          : '';
                        const avg =
                          selectedMember && selectedMember.requestCount > 0
                            ? Math.round(
                                selectedMember.totalTokens /
                                  selectedMember.requestCount
                              )
                            : 0;
                        return (
                          <>
                            {/* Member stat strip */}
                            <div className="border-b border-white/[0.06]">
                              <div className="px-6 py-4 flex items-center gap-3 border-b border-white/[0.04]">
                                <div className="h-8 w-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[11px] font-semibold text-neutral-400 flex-shrink-0">
                                  {initials}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm text-neutral-200 font-medium">
                                      {selectedMember?.fullName ??
                                        selectedMember?.email.split('@')[0]}
                                    </p>
                                    <span className="text-[9px] text-neutral-600 capitalize">
                                      {role}
                                    </span>
                                  </div>
                                  {selectedMember?.fullName && (
                                    <p className="text-[11px] text-neutral-600">
                                      {selectedMember.email}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-4 divide-x divide-white/[0.06]">
                                {[
                                  {
                                    label: 'Tokens',
                                    value:
                                      selectedMember?.totalTokens.toLocaleString() ??
                                      '—',
                                  },
                                  {
                                    label: 'Estimated Cost',
                                    value: selectedMember
                                      ? `$${selectedMember.estimatedCost.toFixed(4)}`
                                      : '—',
                                  },
                                  {
                                    label: 'Requests',
                                    value:
                                      selectedMember?.requestCount.toLocaleString() ??
                                      '—',
                                  },
                                  {
                                    label: 'Avg tok/req',
                                    value: avg > 0 ? avg.toLocaleString() : '—',
                                  },
                                ].map(s => (
                                  <div key={s.label} className="px-6 py-4">
                                    <p className="text-[10px] text-neutral-600 mb-1">
                                      {s.label}
                                    </p>
                                    <p className="text-lg font-semibold text-white tabular-nums">
                                      {s.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Detail breakdown */}
                            {memberUsageLoading ? (
                              <div className="px-6 py-8 text-center">
                                <p className="text-sm text-neutral-600">
                                  Loading...
                                </p>
                              </div>
                            ) : detail ? (
                              <ModelOpSection
                                byModel={detail.byModel}
                                byOperation={detail.byOperation}
                              />
                            ) : (
                              <div className="px-6 py-8 text-center">
                                <p className="text-sm text-neutral-600">
                                  No usage data for this period.
                                </p>
                              </div>
                            )}
                          </>
                        );
                      })()}
                  </div>
                );
              })()}
          </div>
        )}

        {/* ── Invites tab ──────────────────────────────────────────────────── */}
        {tab === 'invites' && (
          <div>
            {invites.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
                <Mail className="w-6 h-6 text-neutral-700 mx-auto mb-3" />
                <p className="text-sm text-neutral-600">
                  No pending invitations.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] text-[10px] font-bold uppercase tracking-widest text-neutral-700 px-5 py-3 border-b border-white/[0.06]">
                  <span>Email</span>
                  <span className="pr-6">Role</span>
                  <span className="pr-6">Invited by</span>
                  <span className="pr-6">Expires</span>
                  <span>Action</span>
                </div>
                {invites.map((inv, i) => (
                  <div
                    key={inv.id}
                    className={`grid grid-cols-[1fr_auto_auto_auto_auto] items-center px-5 py-3.5 text-sm ${
                      i !== invites.length - 1
                        ? 'border-b border-white/[0.04]'
                        : ''
                    }`}
                  >
                    <span className="text-neutral-300 text-sm">
                      {inv.email}
                    </span>
                    <div className="pr-6">
                      <RoleBadge role={inv.role} />
                    </div>
                    <span className="pr-6 text-xs text-neutral-600">
                      {inv.invitedBy.fullName ?? inv.invitedBy.email}
                    </span>
                    <span className="pr-6 text-xs text-neutral-600">
                      {formatRelative(inv.expiresAt)}
                    </span>
                    <button
                      onClick={() => handleCancelInvite(inv.id)}
                      disabled={cancellingId === inv.id}
                      className="text-neutral-600 hover:text-red-400 transition-colors disabled:opacity-40"
                      title="Cancel invite"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Activity tab ─────────────────────────────────────────────────── */}
        {tab === 'activity' && (
          <div className="space-y-4">
            {/* 30-day heatmap */}
            {heatmapError ? (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  Failed to load activity heatmap.
                </p>
                <button
                  onClick={() => {
                    setHeatmapLoaded(false);
                    setHeatmapError(false);
                    loadHeatmap();
                    setHeatmapLoaded(true);
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              (() => {
                const days = 30;
                const now = new Date();
                const buckets = Array.from({ length: days }, (_, i) => {
                  const d = new Date(now);
                  d.setDate(d.getDate() - (days - 1 - i));
                  const key = d.toISOString().slice(0, 10);
                  const found = heatmap.find(h => h.date === key);
                  return {
                    key,
                    label: d.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    }),
                    count: found?.count ?? 0,
                  };
                });
                const total = buckets.reduce((s, b) => s + b.count, 0);
                const cellColor = (count: number) => {
                  if (count === 0) return 'bg-white/[0.04]';
                  if (count <= 2) return 'bg-white/[0.12]';
                  if (count <= 5) return 'bg-teal-500/40';
                  if (count <= 10) return 'bg-teal-400/60';
                  return 'bg-teal-400/90';
                };
                return (
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5">
                    <div className="flex items-baseline justify-between mb-4">
                      <p className="text-xs font-semibold text-white">
                        Activity — Last 30 Days
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {total} event{total !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {buckets.map(b => (
                        <div
                          key={b.key}
                          title={`${b.label}: ${b.count} event${b.count !== 1 ? 's' : ''}`}
                          className={`h-5 w-5 rounded-sm transition-colors cursor-default ${cellColor(b.count)}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2.5">
                      <span className="text-[10px] text-neutral-700">
                        {buckets[0]?.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-neutral-700">
                          Less
                        </span>
                        <div className="h-2.5 w-2.5 rounded-sm bg-white/[0.04]" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-white/[0.12]" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-teal-500/40" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-teal-400/60" />
                        <div className="h-2.5 w-2.5 rounded-sm bg-teal-400/90" />
                        <span className="text-[10px] text-neutral-700">
                          More
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-700">
                        {buckets[buckets.length - 1]?.label}
                      </span>
                    </div>
                  </div>
                );
              })()
            )}

            {/* Audit log */}
            {activityLoading ? (
              <div className="rounded-2xl border border-white/[0.08] overflow-hidden animate-pulse">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06]">
                  <div className="col-span-5 h-2 w-12 rounded bg-white/[0.04]" />
                  <div className="col-span-3 h-2 w-14 rounded bg-white/[0.04]" />
                  <div className="col-span-2 h-2 w-8 rounded bg-white/[0.04]" />
                  <div className="col-span-2 h-2 w-10 rounded bg-white/[0.04]" />
                </div>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-12 gap-4 items-center px-6 py-4 ${i < 7 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <div className="col-span-5 space-y-1.5">
                      <div className="h-2.5 w-28 rounded bg-white/[0.05]" />
                      <div className="h-2 w-44 rounded bg-white/[0.03]" />
                    </div>
                    <div className="col-span-3 h-2 w-24 rounded bg-white/[0.04]" />
                    <div className="col-span-2 h-2 w-16 rounded bg-white/[0.03]" />
                    <div className="col-span-2 h-2 w-20 rounded bg-white/[0.04]" />
                  </div>
                ))}
              </div>
            ) : activityError ? (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
                <p className="text-sm text-neutral-600 mb-3">{activityError}</p>
                <button
                  onClick={() => loadActivity(activityPage)}
                  className="text-xs text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : activity.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 text-center">
                <Activity className="w-6 h-6 text-neutral-700 mx-auto mb-3" />
                <p className="text-sm text-neutral-600">
                  No team activity recorded yet.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-neutral-600 mb-3">
                  {(activityPage - 1) * 20 + 1}–
                  {Math.min(activityPage * 20, activityTotal)} of{' '}
                  {activityTotal} events
                </p>
                <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.08] text-xs font-bold uppercase tracking-widest text-neutral-600">
                    <div className="col-span-5">Event</div>
                    <div className="col-span-3">Member</div>
                    <div className="col-span-2">IP</div>
                    <div className="col-span-2">Time</div>
                  </div>
                  {/* Rows */}
                  {activity.map((log, i) => {
                    const meta = actionLabel[log.action] ?? {
                      label: log.action.replace(/_/g, ' '),
                      color: 'text-neutral-400',
                    };
                    return (
                      <div
                        key={log.id}
                        className={`grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors ${
                          i !== activity.length - 1
                            ? 'border-b border-white/[0.06]'
                            : ''
                        }`}
                      >
                        <div className="col-span-5">
                          <span className={`text-sm font-medium ${meta.color}`}>
                            {meta.label}
                          </span>
                          {log.details && (
                            <p className="text-xs text-neutral-600 mt-0.5 truncate">
                              {log.details}
                            </p>
                          )}
                        </div>
                        <div className="col-span-3 text-sm text-neutral-400 truncate">
                          {log.user.fullName ?? log.user.email}
                        </div>
                        <div className="col-span-2 font-mono text-xs text-neutral-600">
                          {log.ipAddress ?? '—'}
                        </div>
                        <div className="col-span-2 text-xs text-neutral-600 whitespace-nowrap">
                          {formatDate(log.createdAt)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {activityTotalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (!activityLoading) {
                          const p = activityPage - 1;
                          setActivityPage(p);
                          loadActivity(p);
                        }
                      }}
                      disabled={activityPage === 1 || activityLoading}
                      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-white/[0.14] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" /> Previous
                    </button>
                    <span className="text-xs text-neutral-600">
                      Page {activityPage} of {activityTotalPages}
                    </span>
                    <button
                      onClick={() => {
                        if (!activityLoading) {
                          const p = activityPage + 1;
                          setActivityPage(p);
                          loadActivity(p);
                        }
                      }}
                      disabled={
                        activityPage === activityTotalPages || activityLoading
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:border-white/[0.14] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <Users className="h-4 w-4 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">
                Team Management
              </h1>
              <p className="text-sm text-neutral-500 mt-0.5">
                Manage members, roles, and team activity.
              </p>
            </div>
          </div>

          {renderContent()}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TeamManagement;
