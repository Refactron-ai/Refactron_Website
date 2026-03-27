import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { ArrowLeft } from 'lucide-react';
import { getApiBaseUrl } from '../utils/urlUtils';

const OrganizationSettings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'general' | 'members' | 'danger'>(
    'general'
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const formatOrgName = (name: string | null | undefined) => {
    if (!name) return "User's Organization";
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return `${capitalized}'s Organization`;
  };

  const [orgName, setOrgName] = useState(user?.organizationName || '');

  const orgSlug =
    (orgName || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-organization';

  const API_BASE_URL = getApiBaseUrl() || 'http://localhost:3001';

  const handleSave = async () => {
    if (!orgName.trim()) {
      setMessage({ type: 'error', text: 'Organization name cannot be empty' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/auth/organization`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ organizationName: orgName }),
      });
      const data = await response.json();
      if (data.success) {
        updateUser(data.user);
        setMessage({
          type: 'success',
          text: 'Organization updated successfully',
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to update organization',
        });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate('/settings/organizations')}
          className="flex items-center gap-2 text-neutral-600 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Organizations
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white leading-tight">
            {formatOrgName(user?.organizationName)}
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Organization Settings</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/[0.08] mb-8">
          {(['general', 'members', 'danger'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 mr-4 text-base font-medium transition-colors relative capitalize ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              {tab === 'members'
                ? 'Members (1)'
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* General */}
        {activeTab === 'general' && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            {message && (
              <div
                className={`mb-6 px-4 py-3 rounded-xl border text-sm ${
                  message.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="w-full bg-transparent border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors mb-2"
                disabled={loading}
              />
              <p className="text-xs text-neutral-700 font-mono">
                Slug: {orgSlug}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Members */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">
                Invite Member
              </p>
              <div className="flex gap-3 mb-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-transparent border border-white/[0.08] rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors text-sm"
                />
                <select className="bg-transparent border border-white/[0.08] rounded-xl px-4 py-2.5 text-neutral-400 focus:outline-none focus:border-white/20 transition-colors w-28 text-sm">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
                  Invite
                </button>
              </div>
              <p className="text-xs text-neutral-600">
                If they don't have an account yet, they'll join automatically on
                sign up.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                  Team Members
                </p>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white text-sm font-medium">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">
                        {user?.fullName || 'User'}
                      </p>
                      <p className="text-xs text-neutral-600">{user?.email}</p>
                    </div>
                  </div>
                  <select
                    className="bg-transparent border border-white/[0.08] rounded-lg px-3 py-1.5 text-neutral-400 text-xs focus:outline-none transition-colors"
                    defaultValue="owner"
                    disabled
                  >
                    <option value="owner">Owner</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Danger */}
        {activeTab === 'danger' && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6">
            <h3 className="text-red-400 font-semibold mb-1">
              Delete Organization
            </h3>
            <p className="text-sm text-neutral-400 mb-1">
              Permanently delete this organization and all associated data. This
              action cannot be undone.
            </p>
            <p className="text-xs text-neutral-600 mb-6">
              This will delete: all agents, sessions, events, API keys, and
              member associations.
            </p>

            <div className="mb-5">
              <label className="block text-sm font-medium text-white mb-2">
                Type{' '}
                <span className="font-mono bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 rounded text-neutral-300 text-xs">
                  {formatOrgName(user?.organizationName)}
                </span>{' '}
                to confirm
              </label>
              <input
                type="text"
                placeholder={formatOrgName(user?.organizationName)}
                className="w-full bg-transparent border border-red-500/20 rounded-xl px-4 py-3 text-white placeholder-neutral-700 focus:outline-none focus:border-red-500/40 transition-colors text-sm"
              />
            </div>

            <button className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20">
              Delete Organization
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrganizationSettings;
