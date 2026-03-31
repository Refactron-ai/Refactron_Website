import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  GitBranch,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Plus,
  LogOut,
  Menu,
  Key,
  CreditCard,
  Github,
  Building,
  BarChart2,
  Settings,
  Bell,
  Shield,
  Users,
  LucideIcon,
  Trash2,
  CheckCheck,
  AlertTriangle,
  Clock,
  X,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/urlUtils';

// ── types ─────────────────────────────────────────────────────────────────────

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
  metadata?: { inviteToken?: string } | null;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItemDef {
  icon: LucideIcon;
  label: string;
  path: string;
}

// ── pure helpers ──────────────────────────────────────────────────────────────

function getInitial(fullName?: string | null, email?: string | null): string {
  return (fullName ?? email ?? '?').charAt(0).toUpperCase();
}

function planBadgeLabel(plan?: string | null): string | null {
  if (plan === 'enterprise') return 'Ent';
  if (plan === 'pro') return 'Pro';
  return null;
}

function formatOrgName(name?: string | null): string {
  if (!name) return "User's Organization";
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}'s Organization`;
}

function toOrgSlug(name?: string | null): string {
  return (
    (name || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-organization'
  );
}

function formatNotifTime(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const BILLING_TYPES = new Set([
  'subscription_created',
  'subscription_cancelled',
  'trial_warning',
  'quota_warning_80',
  'quota_warning_95',
  'quota_exceeded',
]);

interface NotifMeta {
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
  label: string;
}
const TYPE_META: Record<string, NotifMeta> = {
  team_invite_received: {
    icon: Users,
    iconClass: 'text-teal-400',
    bgClass: 'bg-teal-400/10',
    label: 'Team Invite',
  },
  team_invite_sent: {
    icon: Users,
    iconClass: 'text-neutral-400',
    bgClass: 'bg-white/[0.06]',
    label: 'Team',
  },
  subscription_created: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-400',
    bgClass: 'bg-emerald-400/10',
    label: 'Billing',
  },
  subscription_cancelled: {
    icon: CreditCard,
    iconClass: 'text-red-400',
    bgClass: 'bg-red-400/10',
    label: 'Billing',
  },
  trial_warning: {
    icon: Clock,
    iconClass: 'text-amber-400',
    bgClass: 'bg-amber-400/10',
    label: 'Trial',
  },
  quota_warning_80: {
    icon: AlertTriangle,
    iconClass: 'text-amber-400',
    bgClass: 'bg-amber-400/10',
    label: 'Quota',
  },
  quota_warning_95: {
    icon: AlertTriangle,
    iconClass: 'text-orange-400',
    bgClass: 'bg-orange-400/10',
    label: 'Quota',
  },
  quota_exceeded: {
    icon: AlertTriangle,
    iconClass: 'text-red-400',
    bgClass: 'bg-red-400/10',
    label: 'Quota',
  },
};
const DEFAULT_META: NotifMeta = {
  icon: Bell,
  iconClass: 'text-neutral-500',
  bgClass: 'bg-white/[0.06]',
  label: 'System',
};

// ── sub-components ────────────────────────────────────────────────────────────

function Avatar({
  initial,
  badge,
}: {
  initial: string;
  badge?: string | null;
}) {
  return (
    <div className="relative flex-shrink-0">
      <div className="h-8 w-8 rounded-full bg-neutral-600 flex items-center justify-center text-sm font-semibold text-white select-none">
        {initial}
      </div>
      {badge && (
        <span className="absolute -bottom-1 -right-1 px-1 py-px bg-teal-500 text-black text-[7px] font-bold uppercase rounded leading-none">
          {badge}
        </span>
      )}
    </div>
  );
}

function NavItem({
  item,
  isActive,
  collapsed,
}: {
  item: NavItemDef;
  isActive: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={`flex items-center gap-3 p-2 rounded-lg transition-colors group
        ${collapsed ? 'justify-center' : ''}
        ${isActive ? 'bg-white/[0.06] text-white' : 'text-neutral-500 hover:bg-white/[0.04] hover:text-white'}`}
    >
      <item.icon
        className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-white'}`}
      />
      {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
    </Link>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

const SIDEBAR_KEY = 'sidebar-collapsed';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_KEY) === 'true'
  );
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifTotal, setNotifTotal] = useState(0);
  const [notifPage, setNotifPage] = useState(1);
  const [notifLoadingMore, setNotifLoadingMore] = useState(false);
  const [notifFilter, setNotifFilter] = useState<
    'all' | 'unread' | 'team' | 'billing'
  >('all');
  // notifId → 'accepting' | 'declining' | 'accepted' | 'declined' | string (error msg)
  const [inviteActions, setInviteActions] = useState<Record<string, string>>(
    {}
  );

  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const apiBase = getApiBaseUrl();
  const token = localStorage.getItem('accessToken');

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      localStorage.setItem(SIDEBAR_KEY, String(!prev));
      return !prev;
    });
  };

  // ── notifications ────────────────────────────────────────────────────────

  const fetchNotifications = useCallback(
    async (page = 1, append = false) => {
      try {
        const res = await fetch(
          `${apiBase}/api/notifications?page=${page}&limit=20`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (append) {
            setNotifications(prev => [...prev, ...(data.notifications ?? [])]);
          } else {
            setNotifications(data.notifications ?? []);
          }
          setNotifTotal(data.total ?? 0);
        }
      } catch {}
    },
    [apiBase, token]
  );

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAcceptInvite = useCallback(
    async (notifId: string, inviteToken: string) => {
      setInviteActions(prev => ({ ...prev, [notifId]: 'accepting' }));
      try {
        const res = await fetch(`${apiBase}/api/team/invites/accept`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token: inviteToken }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? 'Failed to accept invite');
        // Clear inviteToken so buttons disappear without removing the notification message
        setNotifications(prev =>
          prev.map(n => (n.id === notifId ? { ...n, metadata: null } : n))
        );
        setInviteActions(prev => ({ ...prev, [notifId]: 'accepted' }));
        // Refresh auth so sidebar shows Team nav immediately
        const meRes = await fetch(`${apiBase}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.user) updateUser(meData.user);
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : 'Failed to accept invite';
        setInviteActions(prev => ({ ...prev, [notifId]: msg }));
        setTimeout(
          () => setInviteActions(prev => ({ ...prev, [notifId]: '' })),
          4000
        );
      }
    },
    [apiBase, token, updateUser]
  );

  const handleDeclineInvite = useCallback(
    async (notifId: string, inviteToken: string) => {
      setInviteActions(prev => ({ ...prev, [notifId]: 'declining' }));
      try {
        const res = await fetch(`${apiBase}/api/team/invites/decline`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token: inviteToken }),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message ?? 'Failed to decline invite');
        // Clear inviteToken so buttons disappear without removing the notification message
        setNotifications(prev =>
          prev.map(n => (n.id === notifId ? { ...n, metadata: null } : n))
        );
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : 'Failed to decline invite';
        setInviteActions(prev => ({ ...prev, [notifId]: msg }));
        setTimeout(
          () => setInviteActions(prev => ({ ...prev, [notifId]: '' })),
          4000
        );
      }
    },
    [apiBase, token]
  );

  const handleMarkRead = useCallback(
    async (notifId: string) => {
      setNotifications(prev =>
        prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
      );
      try {
        await fetch(`${apiBase}/api/notifications/${notifId}/read`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    },
    [apiBase, token]
  );

  const handleDeleteNotification = useCallback(
    async (notifId: string) => {
      setNotifications(prev => prev.filter(n => n.id !== notifId));
      setNotifTotal(prev => Math.max(0, prev - 1));
      try {
        await fetch(`${apiBase}/api/notifications/${notifId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    },
    [apiBase, token]
  );

  const handleClearAll = useCallback(async () => {
    setNotifications([]);
    setNotifTotal(0);
    try {
      await fetch(`${apiBase}/api/notifications`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }, [apiBase, token]);

  const handleLoadMore = useCallback(async () => {
    const nextPage = notifPage + 1;
    setNotifLoadingMore(true);
    await fetchNotifications(nextPage, true);
    setNotifPage(nextPage);
    setNotifLoadingMore(false);
  }, [notifPage, fetchNotifications]);

  const handleOpenNotif = async () => {
    const opening = !isNotifOpen;
    setIsNotifOpen(opening);
    setNotifFilter('all');
    if (opening && notifications.some(n => !n.read)) {
      try {
        await fetch(`${apiBase}/api/notifications/read-all`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      } catch {}
    }
  };

  // ── close dropdowns on outside click ─────────────────────────────────────

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!orgDropdownRef.current?.contains(e.target as Node))
        setIsOrgDropdownOpen(false);
      if (!profileDropdownRef.current?.contains(e.target as Node))
        setIsProfileDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── nav items ─────────────────────────────────────────────────────────────

  const orgSlug = toOrgSlug(user?.organizationName);

  const workspaceItems: NavItemDef[] = [
    { icon: Home, label: 'Home', path: `/${orgSlug}/dashboard` },
    {
      icon: GitBranch,
      label: 'Repositories',
      path: `/${orgSlug}/repositories`,
    },
    { icon: BarChart2, label: 'Usage', path: `/${orgSlug}/usage` },
    { icon: Key, label: 'API Keys', path: `/${orgSlug}/settings/api-keys` },
  ];

  const accountItems: NavItemDef[] = [
    { icon: CreditCard, label: 'Billing', path: '/settings/billing' },
    { icon: Settings, label: 'Account', path: '/settings/account' },
    ...(user?.effectivePlan === 'enterprise' || user?.plan === 'enterprise'
      ? [{ icon: Shield, label: 'Audit Logs', path: '/settings/audit-logs' }]
      : []),
    ...(user?.plan === 'enterprise' || user?.teamRole != null
      ? [{ icon: Users, label: 'Team', path: '/settings/team' }]
      : []),
  ];

  // ── github connect ────────────────────────────────────────────────────────

  const handleGitHubConnect = async () => {
    try {
      const { initiateOAuth } = await import('../utils/oauth');
      await initiateOAuth('github', 'connect', {
        redirectUri: `${window.location.origin}/auth/callback`,
      });
    } catch (err) {
      console.error('Failed to initiate GitHub connection:', err);
    }
  };

  // ── derived ───────────────────────────────────────────────────────────────

  const initial = getInitial(user?.fullName, user?.email);
  const badge = planBadgeLabel(user?.plan);
  const formattedOrgName = formatOrgName(user?.organizationName);

  const dropdownPopover = collapsed
    ? 'absolute bottom-0 left-full ml-2 w-60 bg-[#0d0d0d] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden'
    : 'absolute bottom-full left-0 right-0 mb-2 bg-[#0d0d0d] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden';
  const popoverMotion = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
    transition: { duration: 0.15, ease: 'easeOut' },
  };

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-black text-white font-space overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 240 }}
        className="flex flex-col border-r border-white/[0.08] bg-black z-20"
        style={{ minWidth: collapsed ? 64 : 240 }}
      >
        {/* Logo */}
        <div className="relative flex items-center px-4 py-5">
          {collapsed ? (
            <button
              onClick={toggleCollapsed}
              title="Expand sidebar"
              className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          ) : (
            <>
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img src="/logo.png" alt="Refactron" className="w-6 h-6" />
                <span className="text-base font-semibold tracking-tight">
                  Refactron
                </span>
                <span className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-500 text-[8px] font-bold uppercase tracking-widest rounded-md">
                  Beta
                </span>
              </Link>
              <button
                onClick={toggleCollapsed}
                title="Collapse sidebar"
                className="ml-auto flex h-6 w-6 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-800 hover:text-neutral-300 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            </>
          )}
        </div>

        {/* Org selector */}
        {!collapsed && (
          <div className="px-4 mb-6 relative" ref={orgDropdownRef}>
            <button
              onClick={() => setIsOrgDropdownOpen(v => !v)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors group ${isOrgDropdownOpen ? 'bg-neutral-900' : 'hover:bg-neutral-900'}`}
            >
              <p className="text-sm font-medium truncate">{formattedOrgName}</p>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-transform duration-200 flex-shrink-0 ${isOrgDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isOrgDropdownOpen && (
                <motion.div
                  {...popoverMotion}
                  initial={{ ...popoverMotion.initial, y: -10 }}
                  animate={{ ...popoverMotion.animate }}
                  exit={{ ...popoverMotion.exit, y: -10 }}
                  className="absolute top-full left-4 right-4 mt-1 bg-[#0d0d0d] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-1">
                    <div className="flex items-center justify-between p-2 bg-neutral-800/50 rounded-lg">
                      <span className="text-xs font-medium text-white truncate">
                        {formattedOrgName}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 ml-2" />
                    </div>
                    <div className="h-px bg-neutral-800 my-1" />
                    <button
                      onClick={() => {
                        navigate('/settings/organizations');
                        setIsOrgDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-medium">
                        Manage Organizations
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-6 overflow-y-auto scrollbar-hide">
          {/* Workspace */}
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                Workspace
              </p>
            )}
            <div className="space-y-1">
              {workspaceItems.map(item => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={location.pathname === item.path}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                Account
              </p>
            )}
            <div className="space-y-1">
              {accountItems.map(item => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={location.pathname === item.path}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="p-4 space-y-1 border-t border-white/[0.08]">
          {/* Notifications */}
          <button
            onClick={handleOpenNotif}
            title={
              collapsed
                ? `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`
                : undefined
            }
            className={`w-full flex items-center p-2 rounded-lg transition-colors text-neutral-400 hover:bg-neutral-900 hover:text-white
              ${collapsed ? 'justify-center' : 'justify-between'}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-teal-500 text-[8px] font-bold text-black leading-none">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span className="text-sm font-medium">Notifications</span>
              )}
            </div>
            {!collapsed && unreadCount > 0 && (
              <span className="text-[10px] font-medium text-teal-500">
                {unreadCount} new
              </span>
            )}
          </button>

          {/* GitHub */}
          <button
            onClick={user?.githubConnected ? undefined : handleGitHubConnect}
            disabled={user?.githubConnected}
            title={
              collapsed
                ? `GitHub: ${user?.githubConnected ? 'Connected' : 'Not connected'}`
                : undefined
            }
            className={`w-full flex items-center p-2 rounded-lg transition-colors text-neutral-400 hover:bg-neutral-900 hover:text-white group
              ${collapsed ? 'justify-center' : 'justify-between'}
              ${user?.githubConnected ? 'cursor-default' : ''}`}
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5" />
              {!collapsed && (
                <span className="text-sm font-medium">GitHub</span>
              )}
            </div>
            {!collapsed && (
              <span className="text-[10px] font-medium text-neutral-600 group-hover:text-neutral-400">
                {user?.githubConnected ? 'Connected' : 'Connect'}
              </span>
            )}
          </button>

          {/* Docs */}
          <a
            href="https://docs.refactron.dev"
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? 'Docs' : undefined}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors text-neutral-400 hover:bg-neutral-900 hover:text-white
              ${collapsed ? 'justify-center' : ''}`}
          >
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Docs</span>}
          </a>

          {/* Profile */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(v => !v)}
              title={collapsed ? (user?.email ?? 'Profile') : undefined}
              className={`w-full flex items-center p-2 rounded-lg transition-colors group
                ${collapsed ? 'justify-center' : 'gap-3'}
                ${isProfileDropdownOpen ? 'bg-neutral-900' : 'hover:bg-neutral-900'}`}
            >
              <Avatar initial={initial} badge={badge} />
              {!collapsed && (
                <>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs font-medium text-neutral-300 truncate leading-tight">
                      {user?.fullName ?? user?.email}
                    </p>
                    {user?.fullName && (
                      <p className="text-[10px] text-neutral-600 truncate leading-tight mt-0.5">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-transform duration-200 flex-shrink-0 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </>
              )}
            </button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div {...popoverMotion} className={dropdownPopover}>
                  <div className="p-1">
                    <div className="flex items-center gap-2.5 px-3 py-2.5">
                      <Avatar initial={initial} badge={badge} />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate leading-tight">
                          {user?.fullName ?? user?.email}
                        </p>
                        {user?.fullName && (
                          <p className="text-[10px] text-neutral-500 truncate leading-tight mt-0.5">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="h-px bg-white/[0.06] my-1" />

                    <button
                      onClick={() => {
                        navigate('/settings/organizations');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
                    >
                      <Building className="w-4 h-4" />
                      <span className="text-xs font-medium">Organizations</span>
                    </button>

                    <div className="h-px bg-white/[0.06] my-1" />

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-neutral-400 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-xs font-medium">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">{children}</main>

      {/* ── Notification Drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {isNotifOpen &&
          (() => {
            const filteredNotifs = notifications.filter(n => {
              if (notifFilter === 'unread') return !n.read;
              if (notifFilter === 'team') return n.type.startsWith('team_');
              if (notifFilter === 'billing') return BILLING_TYPES.has(n.type);
              return true;
            });

            const todayStart = new Date().setHours(0, 0, 0, 0);
            const yesterdayStart = todayStart - 86400000;
            const groups: { label: string; items: Notification[] }[] = [
              { label: 'Today', items: [] },
              { label: 'Yesterday', items: [] },
              { label: 'Earlier', items: [] },
            ];
            for (const n of filteredNotifs) {
              const t = new Date(n.createdAt).getTime();
              if (t >= todayStart) groups[0].items.push(n);
              else if (t >= yesterdayStart) groups[1].items.push(n);
              else groups[2].items.push(n);
            }
            const groupedNotifs = groups.filter(g => g.items.length > 0);

            return (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 z-40 bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsNotifOpen(false)}
                />

                {/* Drawer */}
                <motion.div
                  className="fixed right-0 top-0 h-full w-[420px] bg-[#0d0d0d] border-l border-white/[0.08] z-50 flex flex-col shadow-2xl"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-sm font-semibold text-white">
                        Notifications
                      </h2>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {unreadCount > 0 && (
                        <button
                          onClick={async () => {
                            try {
                              await fetch(
                                `${apiBase}/api/notifications/read-all`,
                                {
                                  method: 'POST',
                                  headers: { Authorization: `Bearer ${token}` },
                                }
                              );
                              setNotifications(prev =>
                                prev.map(n => ({ ...n, read: true }))
                              );
                            } catch {}
                          }}
                          title="Mark all as read"
                          className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <CheckCheck className="w-4 h-4" />
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          title="Clear all"
                          className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/[0.06] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setIsNotifOpen(false)}
                        className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-0.5 px-4 py-2.5 border-b border-white/[0.06] flex-shrink-0">
                    {(['all', 'unread', 'team', 'billing'] as const).map(f => {
                      const count =
                        f === 'all'
                          ? notifications.length
                          : f === 'unread'
                            ? notifications.filter(n => !n.read).length
                            : f === 'team'
                              ? notifications.filter(n =>
                                  n.type.startsWith('team_')
                                ).length
                              : notifications.filter(n =>
                                  BILLING_TYPES.has(n.type)
                                ).length;
                      return (
                        <button
                          key={f}
                          onClick={() => setNotifFilter(f)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors capitalize flex items-center gap-1.5 ${
                            notifFilter === f
                              ? 'bg-white/[0.08] text-white'
                              : 'text-neutral-600 hover:text-neutral-300'
                          }`}
                        >
                          {f}
                          {count > 0 && (
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                                notifFilter === f
                                  ? 'bg-white/[0.1] text-neutral-400'
                                  : 'bg-white/[0.05] text-neutral-700'
                              }`}
                            >
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Notification list */}
                  <div className="flex-1 overflow-y-auto">
                    {filteredNotifs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full pb-20">
                        <Bell className="w-10 h-10 text-neutral-800 mb-3" />
                        <p className="text-sm text-neutral-600">
                          {notifFilter === 'unread'
                            ? "You're all caught up"
                            : notifFilter === 'team'
                              ? 'No team notifications'
                              : notifFilter === 'billing'
                                ? 'No billing notifications'
                                : 'No notifications yet'}
                        </p>
                      </div>
                    ) : (
                      <div>
                        {groupedNotifs.map(group => (
                          <div key={group.label}>
                            <p className="sticky top-0 px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-700 bg-[#0d0d0d]">
                              {group.label}
                            </p>
                            {group.items.map(n => {
                              const meta = TYPE_META[n.type] ?? DEFAULT_META;
                              const IconComp = meta.icon;
                              const inviteToken = n.metadata?.inviteToken;
                              const isInvite =
                                n.type === 'team_invite_received' &&
                                !!inviteToken;
                              const actionState = inviteActions[n.id] ?? '';
                              const isActing =
                                actionState === 'accepting' ||
                                actionState === 'declining';
                              const isDone =
                                actionState === 'accepted' ||
                                actionState === 'declined';
                              const isError =
                                !!actionState && !isActing && !isDone;

                              return (
                                <div
                                  key={n.id}
                                  className={`group flex gap-3.5 px-5 py-4 border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02] ${!n.read ? 'bg-white/[0.01]' : ''}`}
                                >
                                  {/* Unread dot */}
                                  <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full ${!n.read ? 'bg-teal-400' : 'bg-transparent'}`}
                                    />
                                  </div>

                                  {/* Type icon */}
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bgClass}`}
                                  >
                                    <IconComp
                                      className={`w-4 h-4 ${meta.iconClass}`}
                                    />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <p
                                        className={`text-[13px] leading-snug ${n.read ? 'text-neutral-500' : 'text-neutral-200'}`}
                                      >
                                        {n.message}
                                      </p>
                                      {/* Per-item actions — visible on hover */}
                                      <div className="flex-shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!n.read && (
                                          <button
                                            onClick={() => handleMarkRead(n.id)}
                                            title="Mark as read"
                                            className="p-1 rounded text-neutral-600 hover:text-white hover:bg-white/[0.08] transition-colors"
                                          >
                                            <Check className="w-3 h-3" />
                                          </button>
                                        )}
                                        <button
                                          onClick={() =>
                                            handleDeleteNotification(n.id)
                                          }
                                          title="Delete"
                                          className="p-1 rounded text-neutral-600 hover:text-red-400 hover:bg-red-400/[0.08] transition-colors"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-1">
                                      <span className="text-[11px] text-neutral-700">
                                        {formatNotifTime(n.createdAt)}
                                      </span>
                                      <span className="text-neutral-800">
                                        ·
                                      </span>
                                      <span className="text-[11px] text-neutral-700">
                                        {meta.label}
                                      </span>
                                    </div>

                                    {/* Invite actions */}
                                    {isInvite && !isDone && (
                                      <div className="mt-3 flex items-center gap-2">
                                        {isError ? (
                                          <p className="text-[11px] text-red-400">
                                            {actionState}
                                          </p>
                                        ) : (
                                          <>
                                            <button
                                              onClick={() =>
                                                handleAcceptInvite(
                                                  n.id,
                                                  inviteToken!
                                                )
                                              }
                                              disabled={isActing}
                                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-500/15 text-teal-300 border border-teal-500/20 hover:bg-teal-500/25 disabled:opacity-40 transition-colors"
                                            >
                                              {actionState === 'accepting'
                                                ? 'Accepting…'
                                                : 'Accept'}
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleDeclineInvite(
                                                  n.id,
                                                  inviteToken!
                                                )
                                              }
                                              disabled={isActing}
                                              className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.05] disabled:opacity-40 transition-colors"
                                            >
                                              {actionState === 'declining'
                                                ? 'Declining…'
                                                : 'Decline'}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    )}

                                    {isDone && isInvite && (
                                      <p
                                        className={`mt-1.5 text-xs font-medium ${actionState === 'accepted' ? 'text-emerald-500' : 'text-neutral-600'}`}
                                      >
                                        {actionState === 'accepted'
                                          ? '✓ Joined the team'
                                          : 'Invite declined'}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {/* Load more */}
                            {notifications.length < notifTotal && (
                              <div className="px-5 py-4 text-center border-t border-white/[0.04]">
                                <button
                                  onClick={handleLoadMore}
                                  disabled={notifLoadingMore}
                                  className="text-xs text-neutral-600 hover:text-white transition-colors disabled:opacity-40"
                                >
                                  {notifLoadingMore
                                    ? 'Loading…'
                                    : `Load more (${notifTotal - notifications.length} remaining)`}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            );
          })()}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
