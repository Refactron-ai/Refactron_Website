import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/cn';

const Onboarding: React.FC = () => {
  const { completeOnboarding, logout, createDodoCheckoutSession } = useAuth();
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      trial: '14-Day Free Trial',
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

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!selectedPlan) return;

    setIsLoading(true);
    setError('');

    try {
      // Check if this is a paid plan
      const isPaidPlan =
        selectedPlan === 'pro' || selectedPlan === 'enterprise';

      // Set flag to prevent ProtectedRoute redirect for paid plans
      if (isPaidPlan) {
        localStorage.setItem('pending_stripe_redirect', 'true');
      }

      // Complete onboarding, skip navigation for paid plans
      await completeOnboarding(orgName, selectedPlan, isPaidPlan);

      // For Pro plan, redirect to Stripe checkout
      if (selectedPlan === 'pro') {
        // Switch to Dodo Payments
        await createDodoCheckoutSession();
        // await createCheckoutSession(); // Stripe
        // Flag will be cleaned up in Billing.tsx on return from Stripe
      }
      // For enterprise, user stays on current page or we could show contact info
      // For free plan, completeOnboarding already navigated to dashboard
    } catch (err: any) {
      // Cleanup flag on error
      localStorage.removeItem('pending_stripe_redirect');
      console.error(err);
      setError(
        err.message || 'Failed to complete onboarding. Please try again.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-space relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Refactron" className="w-6 h-6" />
          <span className="text-white text-lg font-light">Refactron</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-neutral-500 font-mono">
          <a
            href="https://docs.refactron.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            DOCS
          </a>
          <button
            onClick={logout}
            className="hover:text-white transition-colors"
          >
            SIGN OUT
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-white mb-4">
                  Create Your Organization
                </h1>
                <p className="text-neutral-500">
                  Set up your workspace to start safe refactoring.
                </p>
              </div>

              <form onSubmit={handleOrgSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="orgName"
                    className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2"
                  >
                    Organization Name
                  </label>
                  <input
                    id="orgName"
                    type="text"
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={!orgName.trim()}
                  className="w-full bg-white text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-white mb-4">
                  Choose Your Plan
                </h1>
                <p className="text-neutral-500">Start simple, Scale safely.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={cn(
                      'relative p-8 bg-black/50 backdrop-blur-sm border rounded-xl cursor-pointer transition-all duration-300',
                      selectedPlan === plan.id
                        ? 'border-white bg-neutral-900/60 ring-1 ring-white'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5',
                      plan.highlight &&
                        selectedPlan !== plan.id &&
                        'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                    )}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                        {plan.name}
                      </h3>
                      {plan.trial && (
                        <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full">
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
                          <span className="text-xs font-semibold text-emerald-300">
                            {plan.trial}
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-light text-white">
                          {plan.price}
                        </span>
                        {plan.suffix && (
                          <span className="text-xs text-neutral-500">
                            {plan.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-neutral-300"
                        >
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {selectedPlan === plan.id && (
                      <div className="absolute bottom-4 right-4 text-white">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                          Selected <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div className="text-center mb-6">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-between items-center max-w-md mx-auto">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={isLoading || !selectedPlan}
                  className="bg-white text-black font-medium px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Next <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Onboarding;
