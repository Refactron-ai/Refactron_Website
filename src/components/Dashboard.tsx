import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Copy,
  ArrowRight,
  Lock,
  Terminal,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { listApiKeys } from '../services/apiKey.service';
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
      <span className={dim ? 'text-neutral-800' : 'text-neutral-600'}>
        ${' '}
      </span>
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

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [apiKeyPrefix, setApiKeyPrefix] = useState<string | null>(null);

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

  /* check existing API keys for pro users */
  useEffect(() => {
    if (user?.plan !== 'free') {
      listApiKeys().then(result => {
        if (result.success && result.apiKeys && result.apiKeys.length > 0) {
          setHasApiKey(true);
          setApiKeyPrefix(result.apiKeys[0].keyPrefix ?? null);
        }
      });
    }
  }, [user?.plan]);

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install refactron').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  const isPro = user?.plan === 'pro' || user?.plan === 'enterprise';
  const isGitHubConnected = !!user?.githubConnected;
  const firstName = user?.fullName?.split(' ')[0] ?? 'there';

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
      done: false,
      disabled: !isGitHubConnected,
      content: (
        <div className="mt-3 space-y-2">
          <CodeBlock
            command="refactron repo connect"
            dim={!isGitHubConnected}
          />
          {!isGitHubConnected && (
            <p className="pl-1 text-xs text-neutral-700">
              Complete step 4 first.
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
            {/* Connecting line */}
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
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <StepDot
                        done={step.done}
                        locked={isLocked}
                        number={step.number}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p
                        className={`text-base font-medium ${
                          isDimmed ? 'text-neutral-700' : step.done ? 'text-neutral-400' : 'text-white'
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
              All CLI analysis runs locally — your code never leaves your machine.
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
