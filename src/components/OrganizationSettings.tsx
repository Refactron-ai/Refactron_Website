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

  // Initialize with raw name, not formatted
  const [orgName, setOrgName] = useState(user?.organizationName || '');

  // Mock slug generation for display
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
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <button
            onClick={() => navigate('/settings/organizations')}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Organizations
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {formatOrgName(user?.organizationName)}
            </h1>
            <p className="text-neutral-400">Organization Settings</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-neutral-800 mb-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'general'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              General
              {activeTab === 'general' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'members'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Members (1)
              {activeTab === 'members' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('danger')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'danger'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Danger Zone
              {activeTab === 'danger' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />
              )}
            </button>
          </div>

          {/* Content */}
          {activeTab === 'general' && (
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-8">
              {message && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
                    message.type === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-3">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors mb-2"
                  disabled={loading}
                />
                <p className="text-neutral-500 text-sm font-mono">
                  Slug: {orgSlug}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-6">
              {/* Invite Member */}
              <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Invite Member</h3>
                <div className="flex gap-4 mb-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 bg-transparent border border-neutral-800 rounded-lg px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                  <select className="bg-transparent border border-neutral-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neutral-600 transition-colors w-32">
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors">
                    Invite
                  </button>
                </div>
                <p className="text-neutral-500 text-sm">
                  If they don't have an account yet, they'll automatically join
                  when they sign up.
                </p>
              </div>

              {/* Team Members */}
              <div className="bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-neutral-800">
                  <h3 className="text-white font-semibold">Team Members</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white font-medium">
                        {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user?.fullName || 'User'}
                        </div>
                        <div className="text-neutral-500 text-sm">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <select
                      className="bg-transparent border border-neutral-800 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-neutral-600 transition-colors"
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

          {activeTab === 'danger' && (
            <div className="bg-[#0a0a0a] border border-red-900/30 rounded-xl p-8">
              <h3 className="text-red-400 font-semibold text-lg mb-2">
                Delete Organization
              </h3>
              <p className="text-neutral-300 mb-2">
                Permanently delete this organization and all associated data.
                This action cannot be undone.
              </p>
              <p className="text-neutral-500 text-sm mb-6">
                This will delete: all agents, sessions, events, API keys, and
                member associations.
              </p>

              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-3">
                  Type{' '}
                  <span className="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-300">
                    {formatOrgName(user?.organizationName)}
                  </span>{' '}
                  to confirm
                </label>
                <input
                  type="text"
                  placeholder={formatOrgName(user?.organizationName)}
                  className="w-full bg-transparent border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-900/50 transition-colors"
                />
              </div>

              <button className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors w-full sm:w-auto">
                Delete Organization
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrganizationSettings;
