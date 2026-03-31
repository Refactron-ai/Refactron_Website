import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';
import EarlyAccessModal from './EarlyAccessModal';

const PricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tiers = [
    {
      name: 'Free (Community)',
      price: '$0',
      description: 'For individual developers & evaluation',
      features: [
        'Local analysis & refactor suggestions',
        'Safe-mode refactoring',
        'Git diffs & reports',
        'Open-source & personal use',
      ],
      cta: 'Get started',
      highlight: false,
      action: () => (window.location.href = 'https://app.refactron.dev/login'),
    },
    {
      name: 'Pro (Teams)',
      price: '$20',
      priceSuffix: '/ developer / month',
      description: 'For growing engineering teams',
      trial: '14-Day Free Trial',
      features: [
        'Everything in Free',
        'LLM-powered analysis & autofix',
        'AI refactoring with verification',
        'Metrics & maintainability reports',
        'CI/CD integration',
        'Priority updates',
      ],
      cta: 'Get started',
      highlight: true,
      action: () => (window.location.href = 'https://app.refactron.dev/login'),
    },
    {
      name: 'Enterprise',
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
      cta: 'Talk to us',
      highlight: false,
      action: () => (window.location.href = 'mailto:om@refactron.dev'),
    },
  ];

  return (
    <>
      <section
        id="pricing"
        className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden py-20 lg:py-32 font-space"
      >
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1] text-center mb-6">
            Simple pricing. <br className="hidden md:block" />
            Scale when you’re ready.
          </h2>
          <p className="text-base md:text-lg text-neutral-400 font-space leading-loose tracking-wide text-center max-w-2xl mb-16 mx-auto">
            Start free. Pay when Refactron starts saving real engineering time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex flex-col p-8 rounded-3xl bg-white/[0.02] border transition-all duration-300',
                  tier.highlight
                    ? 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-white/[0.04]'
                    : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04]'
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/[0.08] border border-white/10 text-neutral-300 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-light text-white">
                      {tier.price}
                    </span>
                    {tier.priceSuffix && (
                      <span className="text-sm text-neutral-500">
                        {tier.priceSuffix}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400">{tier.description}</p>

                  {tier.trial && (
                    <span className="inline-block mt-3 text-xs font-medium text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {tier.trial}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-neutral-500 shrink-0" />
                      <span className="text-sm text-neutral-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={tier.action}
                  className={cn(
                    'w-full py-4 px-6 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2',
                    tier.highlight
                      ? 'bg-white text-black hover:bg-neutral-200 shadow-lg hover:shadow-xl'
                      : 'bg-transparent border border-white/10 text-white hover:bg-white/5 hover:border-white/20'
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PricingSection;
