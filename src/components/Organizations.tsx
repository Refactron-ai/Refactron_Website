import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { Plus, Users, Settings } from 'lucide-react';

const Organizations: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatOrgName = (name: string | null | undefined) => {
    if (!name) return "User's Organization";
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return `${capitalized}'s Organization`;
  };

  const orgName = formatOrgName(user?.organizationName);
  const orgSlug =
    (user?.organizationName || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-organization';
  const plan = user?.plan || 'Free';

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Organizations
              </h1>
              <p className="text-neutral-400">
                Manage your organizations and team members.
              </p>
            </div>
            <button className="px-6 py-3 bg-transparent border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Organization
            </button>
          </div>

          {/* Org Card */}
          <div className="max-w-md bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden mb-8 hover:border-neutral-700 transition-colors group">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-1">
                  {orgName}
                </h2>
                <p className="text-neutral-500 text-sm font-mono">{orgSlug}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium">
                  Owner
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium capitalize">
                  {plan}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-3 border-t border-neutral-800 flex items-center justify-end gap-2 bg-[#0a0a0a]">
              <button className="p-2 text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-neutral-900">
                <Users className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/settings/organizations/settings')}
                className="p-2 text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-neutral-900"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">
              About Organizations
            </h3>
            <div className="space-y-2 text-sm text-neutral-500">
              <p>
                <span className="text-neutral-300 font-medium">Owner:</span>{' '}
                Full control, can delete organization
              </p>
              <p>
                <span className="text-neutral-300 font-medium">Admin:</span> Can
                manage agents and API keys
              </p>
              <p>
                <span className="text-neutral-300 font-medium">Member:</span>{' '}
                Can view and use agents
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Organizations;
