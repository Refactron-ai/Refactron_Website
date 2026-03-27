import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { Users, Settings } from 'lucide-react';

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
  const plan = user?.plan || 'free';

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white leading-tight">
            Organizations
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your organizations and team members.
          </p>
        </div>

        {/* Org Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden hover:border-white/[0.15] transition-colors group mb-4">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white mb-0.5">
                {orgName}
              </h2>
              <p className="text-sm text-neutral-600 font-mono">{orgSlug}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-neutral-500 text-xs font-medium">
                Owner
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-neutral-500 text-xs font-medium capitalize">
                {plan}
              </span>
            </div>
          </div>

          <div className="px-6 py-3 border-t border-white/[0.06] flex items-center justify-end gap-1">
            <button className="p-2 text-neutral-600 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]">
              <Users className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/settings/organizations/settings')}
              className="p-2 text-neutral-600 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">
            Roles
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-white font-medium w-20 shrink-0">
                Owner
              </span>
              <span className="text-neutral-500">
                Full control, can delete organization
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-white font-medium w-20 shrink-0">
                Admin
              </span>
              <span className="text-neutral-500">
                Can manage agents and API keys
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-white font-medium w-20 shrink-0">
                Member
              </span>
              <span className="text-neutral-500">Can view and use agents</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Organizations;
