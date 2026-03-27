import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Lock, Globe, Search, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getApiBaseUrl, getBaseUrl } from '../utils/urlUtils';
import DashboardLayout from './DashboardLayout';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  default_branch: string;
  language: string | null;
  updated_at: string;
}

const Repositories: React.FC = () => {
  const { user } = useAuth();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const isGitHubConnected = !!user?.githubConnected;

  useEffect(() => {
    if (!isGitHubConnected) return;
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    fetch(`${getApiBaseUrl()}/api/github/repositories`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : (data.repositories ?? []));
      })
      .catch(() => setError('Failed to load repositories.'))
      .finally(() => setLoading(false));
  }, [isGitHubConnected]);

  const handleConnectGitHub = async () => {
    try {
      const { initiateOAuth } = await import('../utils/oauth');
      await initiateOAuth('github', 'connect', {
        redirectUri: `${getBaseUrl()}/auth/callback`,
      });
    } catch {}
  };

  const filtered = repos.filter(
    r =>
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const formatUpdated = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="text-2xl font-semibold text-white mb-1">
            Repositories
          </h1>
          <p className="text-sm text-neutral-500 mb-8">
            Run{' '}
            <code className="text-neutral-300 font-mono">
              refactron repo connect
            </code>{' '}
            in your terminal to select a repository to work on.
          </p>

          {!isGitHubConnected ? (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-12 flex flex-col items-center text-center">
              <GitBranch className="w-10 h-10 text-neutral-600 mb-4" />
              <h2 className="text-lg font-semibold text-white mb-2">
                Connect your GitHub account
              </h2>
              <p className="text-sm text-neutral-500 max-w-sm mb-6">
                To use{' '}
                <code className="text-neutral-300 font-mono">
                  refactron repo connect
                </code>{' '}
                in the CLI, connect your GitHub account first.
              </p>
              <button
                onClick={handleConnectGitHub}
                className="inline-flex items-center gap-2 bg-white text-black font-medium px-5 py-2.5 rounded-xl hover:bg-neutral-200 transition-colors text-sm"
              >
                Connect GitHub
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>

              {/* List */}
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-white/[0.02] border border-white/[0.05] animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : filtered.length === 0 ? (
                <p className="text-sm text-neutral-600">
                  {search
                    ? 'No repositories match your search.'
                    : 'No repositories found.'}
                </p>
              ) : (
                <div className="space-y-2">
                  {filtered.map((repo, i) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all group"
                    >
                      <div className="flex-shrink-0 text-neutral-600">
                        {repo.private ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Globe className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-white">
                          {repo.full_name}
                        </p>
                        {repo.description && (
                          <p className="text-xs text-neutral-600 truncate mt-0.5">
                            {repo.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {repo.language && (
                          <span className="text-xs text-neutral-500 bg-white/[0.06] px-2 py-0.5 rounded-full">
                            {repo.language}
                          </span>
                        )}
                        <span className="text-xs text-neutral-600">
                          {formatUpdated(repo.updated_at)}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}

              {/* Footer hint */}
              {!loading && filtered.length > 0 && (
                <p className="text-xs text-neutral-700 mt-6 text-center">
                  {filtered.length}{' '}
                  {filtered.length === 1 ? 'repository' : 'repositories'} · Run{' '}
                  <code className="font-mono">refactron repo connect</code> in
                  your terminal to pick one
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Repositories;
