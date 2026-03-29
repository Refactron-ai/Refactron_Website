import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, AlertTriangle, Check, Github } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { getApiBaseUrl } from '../utils/urlUtils';

const AccountSettings: React.FC = () => {
  const { user, updateUser } = useAuth();

  // Profile state
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  // GitHub disconnect state
  const [disconnecting, setDisconnecting] = useState(false);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);
  const [disconnectError, setDisconnectError] = useState('');

  const apiBase = getApiBaseUrl();
  const token = localStorage.getItem('accessToken');

  const handleDisconnectGitHub = async () => {
    setDisconnecting(true);
    setDisconnectError('');
    try {
      const res = await fetch(`${apiBase}/api/auth/disconnect/github`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        updateUser(data.user);
        setConfirmDisconnect(false);
      } else {
        setDisconnectError(data.message ?? 'Failed to disconnect GitHub.');
      }
    } catch {
      setDisconnectError('Network error. Please try again.');
    } finally {
      setDisconnecting(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const res = await fetch(`${apiBase}/api/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: fullName.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        updateUser(data.user);
        setProfileMsg({ type: 'ok', text: 'Profile updated.' });
      } else {
        setProfileMsg({
          type: 'err',
          text: data.message ?? 'Failed to update profile.',
        });
      }
    } catch {
      setProfileMsg({ type: 'err', text: 'Network error. Please try again.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'err', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({
        type: 'err',
        text: 'Password must be at least 8 characters.',
      });
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    try {
      const res = await fetch(`${apiBase}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMsg({ type: 'ok', text: 'Password changed successfully.' });
      } else {
        setPasswordMsg({
          type: 'err',
          text: data.message ?? 'Failed to change password.',
        });
      }
    } catch {
      setPasswordMsg({ type: 'err', text: 'Network error. Please try again.' });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <User className="h-4 w-4 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">
                Account Settings
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Manage your profile and security settings.
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-5">
              Profile
            </p>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5">
                  Display name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-700 outline-none focus:border-white/[0.18] transition-colors"
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-xs text-neutral-500 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={user?.email ?? ''}
                  readOnly
                  className="w-full rounded-xl border border-white/[0.04] bg-transparent px-4 py-2.5 text-sm text-neutral-600 outline-none cursor-not-allowed"
                />
                <p className="mt-1.5 text-xs text-neutral-700">
                  To change your email, contact{' '}
                  <a
                    href="mailto:team@refactron.dev"
                    className="text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    team@refactron.dev
                  </a>
                </p>
              </div>

              {profileMsg && (
                <div
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${
                    profileMsg.type === 'ok'
                      ? 'border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400'
                      : 'border border-red-500/20 bg-red-500/[0.06] text-red-400'
                  }`}
                >
                  {profileMsg.type === 'ok' && (
                    <Check className="h-3.5 w-3.5 shrink-0" />
                  )}
                  {profileMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={savingProfile || !fullName.trim()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {savingProfile ? 'Saving…' : 'Save changes'}
              </button>
            </form>
          </section>

          {/* Change Password Section */}
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 mb-4">
            <div className="flex items-center gap-2 mb-5">
              <Lock className="h-3.5 w-3.5 text-neutral-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                Change Password
              </p>
            </div>

            {user?.oauthProvider ? (
              <p className="text-sm text-neutral-600">
                You signed in with{' '}
                <span className="capitalize text-neutral-500">
                  {user.oauthProvider}
                </span>
                . Password login is not available for OAuth accounts.
              </p>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5">
                    Current password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-700 outline-none focus:border-white/[0.18] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5">
                    New password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-700 outline-none focus:border-white/[0.18] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-1.5">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-700 outline-none focus:border-white/[0.18] transition-colors"
                  />
                </div>

                {passwordMsg && (
                  <div
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm ${
                      passwordMsg.type === 'ok'
                        ? 'border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400'
                        : 'border border-red-500/20 bg-red-500/[0.06] text-red-400'
                    }`}
                  >
                    {passwordMsg.type === 'ok' && (
                      <Check className="h-3.5 w-3.5 shrink-0" />
                    )}
                    {passwordMsg.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    savingPassword ||
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {savingPassword ? 'Updating…' : 'Update password'}
                </button>
              </form>
            )}
          </section>

          {/* GitHub Integration Section */}
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 mb-4">
            <div className="flex items-center gap-2 mb-5">
              <Github className="h-3.5 w-3.5 text-neutral-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                GitHub Integration
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user?.githubConnected ? 'bg-emerald-500' : 'bg-neutral-700'
                  }`}
                />
                <span className="text-sm text-neutral-400">
                  {user?.githubConnected ? 'Connected' : 'Not connected'}
                </span>
              </div>

              {user?.githubConnected && !confirmDisconnect && (
                <button
                  onClick={() => setConfirmDisconnect(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  Disconnect
                </button>
              )}
            </div>

            {confirmDisconnect && (
              <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] px-4 py-3 space-y-3">
                <p className="text-sm text-amber-400/80">
                  Are you sure? This will unlink your GitHub account from
                  Refactron.
                </p>
                {disconnectError && (
                  <p className="text-sm text-red-400">{disconnectError}</p>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDisconnectGitHub}
                    disabled={disconnecting}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/[0.06] px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:border-red-500/50 hover:text-red-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {disconnecting ? 'Disconnecting…' : 'Yes, disconnect'}
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDisconnect(false);
                      setDisconnectError('');
                    }}
                    disabled={disconnecting}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Danger Zone */}
          <section className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500/60" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-500/60">
                Danger Zone
              </p>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <a
              href="mailto:team@refactron.dev?subject=Account%20Deletion%20Request"
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-2 text-sm font-medium text-red-400/80 transition-colors hover:border-red-500/40 hover:text-red-400"
            >
              Request account deletion
            </a>
          </section>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AccountSettings;
