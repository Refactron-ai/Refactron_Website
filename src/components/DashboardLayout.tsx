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
  LucideIcon,
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
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_KEY) === 'true'
  );
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const apiBase = getApiBaseUrl();
  const token = localStorage.getItem('accessToken');

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      localStorage.setItem(SIDEBAR_KEY, String(!prev));
      return !prev;
    });
  };

  // ── notifications ────────────────────────────────────────────────────────

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications ?? []);
      }
    } catch {}
  }, [apiBase, token]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleOpenNotif = async () => {
    setIsNotifOpen(v => !v);
    if (!isNotifOpen && notifications.some(n => !n.read)) {
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
      if (!notifRef.current?.contains(e.target as Node)) setIsNotifOpen(false);
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
    ...(user?.plan === 'enterprise'
      ? [{ icon: Shield, label: 'Audit Logs', path: '/settings/audit-logs' }]
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

  const dropdownPopover =
    'absolute bottom-full left-0 right-0 mb-2 bg-[#0d0d0d] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden';
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
        className="flex flex-col border-r border-white/[0.08] bg-black z-20 overflow-hidden"
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
          <div className="relative" ref={notifRef}>
            <button
              onClick={handleOpenNotif}
              title={
                collapsed
                  ? `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ''}`
                  : undefined
              }
              className={`w-full flex items-center p-2 rounded-lg transition-colors text-neutral-400 hover:bg-neutral-900 hover:text-white group
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

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  {...popoverMotion}
                  className={dropdownPopover}
                  style={collapsed ? { width: 240 } : undefined}
                >
                  <div className="px-3 py-2.5 border-b border-white/[0.06]">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                      Notifications
                    </p>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-5 text-center text-xs text-neutral-600">
                      No notifications yet.
                    </p>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.slice(0, 10).map(n => (
                        <div
                          key={n.id}
                          className={`px-3 py-2.5 border-b border-white/[0.04] last:border-0 ${!n.read ? 'bg-white/[0.02]' : ''}`}
                        >
                          <p
                            className={`text-xs leading-snug ${n.read ? 'text-neutral-600' : 'text-neutral-300'}`}
                          >
                            {n.message}
                          </p>
                          <p className="text-[10px] text-neutral-700 mt-1">
                            {formatNotifTime(n.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
                <motion.div
                  {...popoverMotion}
                  className={dropdownPopover}
                  style={collapsed ? { width: 200 } : undefined}
                >
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
    </div>
  );
};

export default DashboardLayout;
