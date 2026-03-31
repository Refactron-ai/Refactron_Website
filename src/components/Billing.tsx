import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getApiBaseUrl } from '../utils/urlUtils';
import DashboardLayout from './DashboardLayout';
import { Check, Loader2, ArrowRight, CreditCard, Download } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Billing: React.FC = () => {
  const {
    user,
    updateUser,
    createPortalSession,
    createDodoCheckoutSession,
    createDodoPortalSession,
  } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [billingHistory, setBillingHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      localStorage.removeItem('pending_stripe_redirect');
      window.history.replaceState({}, document.title, window.location.pathname);
      // Refresh user state so plan badge reflects DB immediately
      const token = localStorage.getItem('accessToken');
      const apiBaseUrl = getApiBaseUrl();
      fetch(`${apiBaseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data?.user) updateUser(data.user);
        })
        .catch(() => {});
    }
    if (query.get('canceled')) {
      localStorage.removeItem('pending_stripe_redirect');
      setError('Subscription process was canceled.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location, updateUser]);

  useEffect(() => {
    if (user?.plan === 'pro' && user.dodoCustomerId) {
      setIsLoadingHistory(true);
      const token = localStorage.getItem('accessToken');
      const apiBaseUrl = getApiBaseUrl();
      fetch(`${apiBaseUrl}/api/dodo/history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Failed to fetch history');
        })
        .then(data => setBillingHistory(data))
        .catch(err => console.error(err))
        .finally(() => setIsLoadingHistory(false));
    }
  }, [user]);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      label: 'Community',
      price: '$0',
      description: 'For individual developers & evaluation',
      features: [
        'Local analysis & refactor suggestions',
        'Safe-mode refactoring',
        'Git diffs & reports',
        'Open-source & personal use',
      ],
      highlight: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      label: 'Teams',
      price: '$20',
      suffix: '/ dev / month',
      trial: '14-Day Free Trial',
      description: 'For growing engineering teams',
      features: [
        'Everything in Free',
        'LLM-powered analysis & autofix',
        'AI refactoring with verification',
        'Metrics & maintainability reports',
        'CI/CD integration',
        'Priority updates',
      ],
      highlight: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      label: null,
      price: 'Custom',
      description: 'For production & regulated environments',
      features: [
        'Everything in Pro',
        'Team management & collaboration',
        'On-prem / private deployments',
        'Advanced verification controls',
        'Audit logs & compliance support',
        'Dedicated support',
      ],
      highlight: false,
    },
  ];

  const getPlanDetails = (planId: string | null | undefined) => {
    return plans.find(p => p.id === planId?.toLowerCase()) || plans[0];
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) return;
    if (selectedPlan === 'enterprise') {
      setError(
        'To set up an Enterprise plan, contact us at team@refactron.dev'
      );
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await createDodoCheckoutSession();
    } catch {
      setError('Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePortal = async () => {
    setIsLoading(true);
    try {
      if (user?.dodoCustomerId) {
        await createDodoPortalSession();
      } else if (user?.stripeCustomerId) {
        await createPortalSession();
      } else if (user?.plan === 'pro') {
        setError(
          'Billing configuration missing. Please refresh the page. If the issue persists, contact support.'
        );
        setIsLoading(false);
      } else {
        await createPortalSession();
      }
    } catch {
      setError('Failed to open billing settings.');
      setIsLoading(false);
    }
  };

  const currentPlan = getPlanDetails(user?.plan);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white leading-tight">
            Billing
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your subscription and billing information
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isUpgrading ? (
            <motion.div
              key="billing-overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {error && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3">
                  <p className="text-sm text-amber-300">{error}</p>
                </div>
              )}
              {/* Current Plan */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-4">
                  Current Plan
                </p>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {currentPlan.name}
                      {currentPlan.label && (
                        <span className="ml-2 text-xs font-normal text-neutral-500">
                          ({currentPlan.label})
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      Your current subscription
                    </p>
                    {user?.trialEnd &&
                      new Date(user.trialEnd) > new Date() &&
                      user?.plan === 'pro' && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                          <svg
                            className="w-3.5 h-3.5 text-emerald-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-xs font-medium text-emerald-300">
                            Trial ends{' '}
                            {new Date(user.trialEnd).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center gap-2">
                    {user?.plan === 'pro' && (
                      <button
                        onClick={() => {
                          setError(
                            'To set up an Enterprise plan, contact us at team@refactron.dev'
                          );
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                      >
                        Upgrade to Enterprise
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {user?.plan !== 'enterprise' && user?.plan !== 'pro' ? (
                      <button
                        onClick={() => {
                          setSelectedPlan(user?.plan || 'free');
                          setIsUpgrading(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                      >
                        Upgrade Plan
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handlePortal}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.04] disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CreditCard className="w-4 h-4" />
                        )}
                        Manage Subscription
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5 space-y-2.5 pt-5 border-t border-white/[0.06]">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-neutral-600 shrink-0" />
                      <span className="text-sm text-neutral-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing History */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/[0.06]">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                    Billing History
                  </p>
                </div>
                {isLoadingHistory ? (
                  <div className="flex justify-center p-10">
                    <Loader2 className="w-5 h-5 animate-spin text-neutral-700" />
                  </div>
                ) : billingHistory.length > 0 ? (
                  <div className="divide-y divide-white/[0.04]">
                    {billingHistory.map(payment => (
                      <div
                        key={payment.id}
                        className="grid grid-cols-4 gap-4 px-6 py-3.5 text-sm hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-neutral-400">
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                        <span className="text-neutral-400">
                          {(payment.amount / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: payment.currency.toUpperCase(),
                          })}
                        </span>
                        <span>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full text-xs font-medium',
                              payment.status === 'succeeded'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-white/[0.04] text-neutral-500'
                            )}
                          >
                            {payment.status.charAt(0).toUpperCase() +
                              payment.status.slice(1)}
                          </span>
                        </span>
                        <span className="flex justify-end">
                          {payment.invoiceUrl ? (
                            <a
                              href={payment.invoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Invoice
                            </a>
                          ) : (
                            <span className="text-xs text-neutral-700">—</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="px-6 py-10 text-sm text-neutral-700 text-center">
                    No billing history yet.
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="plan-selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={cn(
                      'relative flex flex-col p-8 rounded-3xl border cursor-pointer transition-all duration-300',
                      selectedPlan === plan.id
                        ? 'border-white bg-white/[0.05] ring-1 ring-white shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                        : plan.highlight
                          ? 'border-white/20 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]'
                          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
                    )}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/[0.08] border border-white/10 text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md whitespace-nowrap">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                          {plan.name}
                          {plan.label && (
                            <span className="ml-1 normal-case text-neutral-700">
                              ({plan.label})
                            </span>
                          )}
                        </p>
                        {selectedPlan === plan.id && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </div>

                      {plan.trial && (
                        <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                          <svg
                            className="w-3 h-3 text-neutral-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-xs font-medium text-neutral-300">
                            {plan.trial}
                          </span>
                        </div>
                      )}

                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-light text-white">
                          {plan.price}
                        </span>
                        {plan.suffix && (
                          <span className="text-xs text-neutral-600 font-mono">
                            {plan.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-neutral-300"
                        >
                          <Check className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center pt-6 border-t border-white/[0.06]">
                {error && <p className="text-red-400 text-sm mb-5">{error}</p>}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setIsUpgrading(false)}
                    className="text-sm text-neutral-600 hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpgrade}
                    disabled={
                      isLoading || !selectedPlan || selectedPlan === user?.plan
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        Confirm Upgrade
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
