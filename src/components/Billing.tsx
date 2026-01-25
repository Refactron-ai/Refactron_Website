import React from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { Check } from 'lucide-react';

const Billing: React.FC = () => {
  const { user } = useAuth();

  const getPlanDetails = (plan: string | null | undefined) => {
    switch (plan?.toLowerCase()) {
      case 'free':
        return {
          name: 'Free (Community)',
          features: [
            'Local analysis & refactor suggestions',
            'Safe-mode refactoring',
            'Git diffs & reports',
            'Open-source & personal use',
          ],
        };
      case 'pro':
        return {
          name: 'Pro (Teams)',
          features: [
            'Everything in Free',
            'Autofix with verification',
            'Metrics & maintainability reports',
            'CI/CD integration',
            'Priority updates',
          ],
        };
      case 'enterprise':
        return {
          name: 'Enterprise',
          features: [
            'Everything in Pro',
            'On-prem / private deployments',
            'Advanced verification controls',
            'Audit logs & compliance support',
            'Dedicated support',
          ],
        };
      default:
        return {
          name: 'Free (Community)',
          features: [
            'Local analysis & refactor suggestions',
            'Safe-mode refactoring',
            'Git diffs & reports',
            'Open-source & personal use',
          ],
        };
    }
  };

  const currentPlan = getPlanDetails(user?.plan);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
          <p className="text-neutral-400 mb-8">
            Manage your subscription and billing information
          </p>

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
              {user?.plan !== 'enterprise' && (
                <button className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors">
                  Upgrade Plan
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

          {/* Placeholder for future billing features */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Billing History
            </h2>
            <p className="text-neutral-400 text-sm">
              No billing history available yet.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
