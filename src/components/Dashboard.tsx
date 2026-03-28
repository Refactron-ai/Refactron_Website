import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  ArrowRight,
  Lock,
  Terminal,
  Cpu,
  Key,
  GitBranch,
  ArrowUpCircle,
  Activity,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { listApiKeys } from '../services/apiKey.service';
import { getUsageStats } from '../services/usage.service';
import { getBaseUrl } from '../utils/urlUtils';
import DashboardLayout from './DashboardLayout';

/* ── Inline mini terminal code block ── */
const CodeBlock: React.FC<{
  command: string;
  onCopy?: () => void;
  copied?: boolean;
  dim?: boolean;
}> = ({ command, onCopy, copied, dim }) => (
  <div
    className={`mt-3 flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 font-mono text-sm transition-colors ${
      dim
        ? 'border-white/[0.04] bg-transparent'
        : 'border-white/[0.06] bg-[#0d1117] hover:border-white/[0.12]'
    }`}
  >
    <span className={dim ? 'text-neutral-700' : 'text-neutral-400'}>
      <span className={dim ? 'text-neutral-800' : 'text-neutral-600'}>$ </span>
      {command}
    </span>
    {onCopy && (
      <button
        onClick={onCopy}
        className="flex-shrink-0 rounded-lg p-1 text-neutral-600 transition-colors hover:bg-white/[0.06] hover:text-neutral-300"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    )}
  </div>
);

/* ── Step indicator dot ── */
const StepDot: React.FC<{
  done: boolean;
  locked: boolean;
  number: number;
}> = ({ done, locked, number }) => {
  if (done) {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
        <Check className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
      </div>
    );
  }
  if (locked) {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.06] bg-transparent">
        <Lock className="h-3 w-3 text-neutral-700" />
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04]">
      <span className="text-[11px] font-semibold text-neutral-500">
        {number}
      </span>
    </div>
  );
};

/* ── Stat card for live home ── */
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  delay?: number;
}> = ({ icon, label, value, sub, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 flex items-start gap-4"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-1">
        {label}
      </p>
      <p className="text-2xl font-semibold text-white font-space leading-none">
        {value}
      </p>
      {sub && <p className="text-xs text-neutral-600 mt-1">{sub}</p>}
    </div>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [analyzeCopied, setAnalyzeCopied] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [apiKeyPrefix, setApiKeyPrefix] = useState<string | null>(null);
  const [apiKeyLastUsed, setApiKeyLastUsed] = useState<string | null>(null);
  const [apiKeyChecked, setApiKeyChecked] = useState(false);

  // Live home state
  const [llmCalls, setLlmCalls] = useState<number | null>(null);
  const [cliVersion, setCliVersion] = useState<string | null>(null);
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [repoCountChecked, setRepoCountChecked] = useState(false);

  /* refresh user when returning from Stripe */
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      localStorage.removeItem('pending_stripe_redirect');
      const refreshUser = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const apiBaseUrl =
            process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
          const res = await fetch(`${apiBaseUrl}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            updateUser(data.user);
          }
        } catch {}
      };
      refreshUser();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location, updateUser]);

  /* check existing API keys */
  useEffect(() => {
    if (user?.plan === undefined) return; // wait until user is loaded
    if (user?.plan !== 'free') {
      listApiKeys().then(result => {
        if (result.success && result.apiKeys && result.apiKeys.length > 0) {
          setHasApiKey(true);
          setApiKeyPrefix(result.apiKeys[0].keyPrefix ?? null);
          setApiKeyLastUsed(result.apiKeys[0].lastUsedAt ?? null);
        }
        setApiKeyChecked(true);
      });
    } else {
      setApiKeyChecked(true); // free users don't need the check
    }
  }, [user?.plan]);

  const isPro = user?.plan === 'pro' || user?.plan === 'enterprise';
  const isGitHubConnected = !!user?.githubConnected;
  const hasRepo = repoCount !== null && repoCount > 0;
  const isSetupComplete =
    apiKeyChecked &&
    repoCountChecked &&
    isGitHubConnected &&
    (!isPro || hasApiKey) &&
    hasRepo;

  /* fetch repo count whenever GitHub is connected (needed for step 5 done state too) */
  useEffect(() => {
    if (!isGitHubConnected) return;

    const token = localStorage.getItem('accessToken');
    const apiBaseUrl =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
    fetch(`${apiBaseUrl}/api/github/repositories`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.repositories) setRepoCount(data.repositories.length);
      })
      .catch(() => {})
      .finally(() => setRepoCountChecked(true));
  }, [isGitHubConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  /* live home data — only fetch when setup complete */
  useEffect(() => {
    if (!isSetupComplete) return;

    // LLM calls this week
    getUsageStats(7).then(result => {
      if (result.success) setLlmCalls(result.totalRequests ?? 0);
    });

    // CLI version from PyPI
    fetch('https://pypi.org/pypi/refactron/json')
      .then(r => r.json())
      .then(data => setCliVersion(data?.info?.version ?? null))
      .catch(() => {});
  }, [isSetupComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install refactron').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAnalyzeCopy = () => {
    navigator.clipboard.writeText('refactron analyze --repo .').then(() => {
      setAnalyzeCopied(true);
      setTimeout(() => setAnalyzeCopied(false), 2000);
    });
  };

  const handleConnectGitHub = async () => {
    try {
      const { initiateOAuth } = await import('../utils/oauth');
      await initiateOAuth('github', 'connect', {
        redirectUri: `${getBaseUrl()}/auth/callback`,
      });
    } catch {}
  };

  const orgSlug =
    (user?.organizationName || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-organization';

  const firstName = user?.fullName?.split(' ')[0] ?? 'there';

  const formatLastUsed = (iso: string | null) => {
    if (!iso) return 'Never';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  /* Hold render until all async checks resolve — prevents setup-steps flash */
  if (!apiKeyChecked || (isGitHubConnected && !repoCountChecked)) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-3xl mx-auto">
          {/* Header skeleton */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/[0.04] animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-40 rounded-lg bg-white/[0.04] animate-pulse" />
              <div className="h-4 w-28 rounded-lg bg-white/[0.03] animate-pulse" />
            </div>
          </div>
          {/* Stat card skeletons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl border border-white/[0.05] bg-white/[0.02] animate-pulse"
              />
            ))}
          </div>
          {/* Block skeletons */}
          <div className="h-28 rounded-2xl border border-white/[0.05] bg-white/[0.02] animate-pulse mb-4" />
          <div className="grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-11 rounded-xl border border-white/[0.05] bg-white/[0.02] animate-pulse"
              />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ── LIVE HOME VIEW ── */
  if (isSetupComplete) {
    return (
      <DashboardLayout>
        <div className="p-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                <Activity className="h-4 w-4 text-neutral-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white leading-tight">
                  Welcome back, {firstName}
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  Your workspace is ready.
                </p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatCard
                icon={<Cpu className="h-4 w-4 text-neutral-400" />}
                label="LLM Calls (7d)"
                value={llmCalls === null ? '—' : llmCalls.toLocaleString()}
                sub="via refactron CLI"
                delay={0.05}
              />
              <StatCard
                icon={<Key className="h-4 w-4 text-neutral-400" />}
                label="API Key Last Used"
                value={formatLastUsed(apiKeyLastUsed)}
                sub={apiKeyPrefix ? `${apiKeyPrefix}...` : 'No key yet'}
                delay={0.1}
              />
              <StatCard
                icon={<GitBranch className="h-4 w-4 text-neutral-400" />}
                label="Repositories"
                value={repoCount === null ? '—' : String(repoCount)}
                sub="connected via GitHub"
                delay={0.15}
              />
              <StatCard
                icon={<ArrowUpCircle className="h-4 w-4 text-neutral-400" />}
                label="CLI Version"
                value={cliVersion ?? '—'}
                sub={
                  cliVersion
                    ? 'pip install --upgrade refactron'
                    : 'checking PyPI…'
                }
                delay={0.2}
              />
            </div>

            {/* Run your first analysis */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-3">
                Run your first analysis
              </p>
              <CodeBlock
                command="refactron analyze --repo ."
                onCopy={handleAnalyzeCopy}
                copied={analyzeCopied}
              />
              <p className="mt-3 text-sm text-neutral-600">
                Run inside any local repository. Analysis happens entirely on
                your machine — no code is sent to our servers.
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 grid grid-cols-3 gap-3"
            >
              {[
                { label: 'View Usage', path: `/${orgSlug}/usage` },
                {
                  label: 'API Keys',
                  path: `/${orgSlug}/settings/api-keys`,
                },
                {
                  label: 'Repositories',
                  path: `/${orgSlug}/repositories`,
                },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-neutral-400 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  /* ── SETUP STEPS VIEW ── */
  type Step = {
    number: number;
    title: string;
    done: boolean;
    locked?: boolean;
    disabled?: boolean;
    content: React.ReactNode;
  };

  const steps: Step[] = [
    {
      number: 1,
      title: 'Install the CLI',
      done: true,
      content: (
        <CodeBlock
          command="pip install refactron"
          onCopy={handleCopy}
          copied={copied}
        />
      ),
    },
    {
      number: 2,
      title: 'Authenticate',
      done: true,
      content: (
        <div className="mt-3 space-y-2">
          <CodeBlock command="refactron login" />
          <p className="pl-1 text-sm text-neutral-500">
            Signed in as{' '}
            <span className="font-mono text-neutral-400">{user?.email}</span>
          </p>
        </div>
      ),
    },
    {
      number: 3,
      title: 'Generate an API Key',
      done: isPro && hasApiKey,
      locked: !isPro,
      content: isPro ? (
        <div className="mt-3">
          {hasApiKey ? (
            <p className="text-sm text-neutral-500">
              Key active:{' '}
              <span className="font-mono text-neutral-400">
                {apiKeyPrefix}...
              </span>
            </p>
          ) : (
            <Link
              to={`/${orgSlug}/settings/api-keys`}
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Generate API Key
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3">
          <p className="text-sm text-neutral-600">
            Required for Pro features like autofix.
          </p>
          <button
            onClick={() => navigate('/settings/billing')}
            className="inline-flex items-center gap-1 rounded-lg border border-white/[0.10] bg-white/[0.04] px-2.5 py-1 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
          >
            Upgrade to Pro
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      ),
    },
    {
      number: 4,
      title: 'Connect GitHub',
      done: isGitHubConnected,
      content: (
        <div className="mt-3">
          {isGitHubConnected ? (
            <p className="text-sm text-neutral-500">
              GitHub connected. Your repositories are available in the CLI.
            </p>
          ) : (
            <button
              onClick={handleConnectGitHub}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Connect GitHub
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      ),
    },
    {
      number: 5,
      title: 'Connect a Repository',
      done: isGitHubConnected && repoCount !== null && repoCount > 0,
      disabled: !isGitHubConnected,
      content: (
        <div className="mt-3 space-y-2">
          <CodeBlock
            command="refactron repo connect"
            dim={!isGitHubConnected}
          />
          {!isGitHubConnected ? (
            <p className="pl-1 text-xs text-neutral-700">
              Complete step 4 first.
            </p>
          ) : repoCount !== null && repoCount > 0 ? (
            <p className="text-sm text-neutral-500">
              {repoCount} {repoCount === 1 ? 'repository' : 'repositories'}{' '}
              connected.{' '}
              <Link
                to={`/${orgSlug}/repositories`}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                View repositories →
              </Link>
            </p>
          ) : (
            <p className="pl-1 text-xs text-neutral-600">
              Run the command above in your terminal, or{' '}
              <a
                href="https://docs.refactron.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                read the guide →
              </a>
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <Terminal className="h-4 w-4 text-neutral-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">
                Welcome, {firstName}
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Follow these steps to set up your CLI workspace.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-3 top-7 bottom-7 w-px bg-white/[0.05]" />
            <div className="space-y-0">
              {steps.map((step, i) => {
                const isLocked = step.locked ?? false;
                const isDisabled = step.disabled ?? false;
                const isDimmed = isLocked || isDisabled;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative flex gap-5 pb-8 last:pb-0"
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <StepDot
                        done={step.done}
                        locked={isLocked}
                        number={step.number}
                      />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p
                        className={`text-base font-medium ${
                          isDimmed
                            ? 'text-neutral-700'
                            : step.done
                              ? 'text-neutral-400'
                              : 'text-white'
                        }`}
                      >
                        {step.title}
                      </p>
                      <div className={isDimmed ? 'opacity-40' : undefined}>
                        {step.content}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
            <p className="text-sm text-neutral-500">
              All CLI analysis runs locally — your code never leaves your
              machine.
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
