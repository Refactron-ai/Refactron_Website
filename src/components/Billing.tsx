import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import {
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
  CreditCard,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Billing: React.FC = () => {
  const { user, createCheckoutSession, createPortalSession } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      // Clean up pending redirect flag
      localStorage.removeItem('pending_stripe_redirect');
      // Ideally show a toast or success message
      // Removing the query param is also good UX
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    if (query.get('canceled')) {
      // Clean up pending redirect flag
      localStorage.removeItem('pending_stripe_redirect');
      setError('Subscription process was canceled.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  const plans = [
    {
      id: 'free',
      name: 'Free (Community)',
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
      name: 'Pro (Teams)',
      price: '$20',
      suffix: '/ dev / month',
      description: 'For growing engineering teams',
      features: [
        'Everything in Free',
        'Autofix with verification',
        'Metrics & maintainability reports',
        'CI/CD integration',
        'Priority updates',
      ],
      highlight: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For production & regulated environments',
      features: [
        'Everything in Pro',
        'On-prem / private deployments',
        'Advanced verification controls',
        'Audit logs & compliance support',
        'Dedicated support',
      ],
      highlight: false,
    },
  ];

  const getPlanDetails = (planId: string | null | undefined) => {
    const plan = plans.find(p => p.id === planId?.toLowerCase());
    return plan || plans[0];
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) return;
    setIsLoading(true);
    setError('');
    try {
      // Use the specific price ID for Pro, or let backend handle default
      // TODO: Map selectedPlan to Stripe Price ID if we have multiple paid plans
      await createCheckoutSession();
    } catch (err) {
      setError('Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePortal = async () => {
    setIsLoading(true);
    try {
      await createPortalSession();
    } catch (err) {
      setError('Failed to open billing settings.');
      setIsLoading(false);
    }
  };

  const currentPlan = getPlanDetails(user?.plan);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
              <p className="text-neutral-400">
                Manage your subscription and billing information
              </p>
            </div>
            {isUpgrading && (
              <button
                onClick={() => setIsUpgrading(false)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Billing
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isUpgrading ? (
              <motion.div
                key="billing-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Current Plan Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Current Plan
                  </h2>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {currentPlan.name}
                      </p>
                      <p className="text-sm text-neutral-400 mt-1">
                        Your current subscription plan
                      </p>
                    </div>
                    {user?.plan !== 'enterprise' && user?.plan !== 'pro' ? (
                      <button
                        onClick={() => {
                          setSelectedPlan(user?.plan || 'free');
                          setIsUpgrading(true);
                        }}
                        className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                      >
                        Upgrade Plan
                      </button>
                    ) : (
                      <button
                        onClick={handlePortal}
                        disabled={isLoading}
                        className="px-6 py-2 border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
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

                  {/* Plan Features */}
                  <div className="space-y-3">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-neutral-400" />
                        </div>
                        <span className="text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing History Placeholder */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Billing History
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    No billing history available yet.
                  </p>
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
                        'relative p-8 bg-neutral-900/50 border rounded-2xl cursor-pointer transition-all duration-300 flex flex-col h-full',
                        selectedPlan === plan.id
                          ? 'border-white bg-neutral-800/60 ring-1 ring-white shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5',
                        plan.highlight &&
                          selectedPlan !== plan.id &&
                          'border-amber-500/30'
                      )}
                    >
                      {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                          Most Popular
                        </div>
                      )}

                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                            {plan.name}
                          </h3>
                          {selectedPlan === plan.id && (
                            <div className="bg-white rounded-full p-0.5">
                              <Check className="w-3 h-3 text-black" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-4xl font-light text-white">
                            {plan.price}
                          </span>
                          {plan.suffix && (
                            <span className="text-xs text-neutral-500 font-mono">
                              {plan.suffix}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed min-h-[40px]">
                          {plan.description}
                        </p>
                      </div>

                      <ul className="space-y-4 mb-8 flex-1">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-neutral-300"
                          >
                            <Check className="w-4 h-4 text-white shrink-0 mt-0.5 opacity-60" />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center pt-8 border-t border-neutral-800">
                  {error && (
                    <p className="text-red-500 text-sm mb-6">{error}</p>
                  )}

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setIsUpgrading(false)}
                      className="text-neutral-500 hover:text-white transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpgrade}
                      disabled={
                        isLoading ||
                        !selectedPlan ||
                        selectedPlan === user?.plan
                      }
                      className="px-10 py-3 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-xl"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />{' '}
                          Updating...
                        </>
                      ) : (
                        <>
                          Confirm Upgrade <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
