import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlickeringGrid } from './ui/flickering-grid';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';
import EarlyAccessModal from './EarlyAccessModal';

const PricingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      action: () => navigate('/login'),
    },
    {
      name: 'Pro (Teams)',
      price: '$20',
      priceSuffix: '/ developer / month',
      description: 'For growing engineering teams',
      trial: '14-Day Free Trial',
      features: [
        'Everything in Free',
        'Autofix with verification',
        'Metrics & maintainability reports',
        'CI/CD integration',
        'Priority updates',
      ],
      cta: 'Get started',
      highlight: true,
      action: () => navigate('/login'),
    },
    {
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
      cta: 'Talk to us',
      highlight: false,
      action: () => (window.location.href = 'mailto:hello@refactron.dev'),
    },
  ];

  return (
    <>
      <section
        id="pricing"
        className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden py-20 lg:py-32 font-space"
      >
        <div className="absolute inset-0 w-full h-full">
          <FlickeringGrid
            className="z-0 absolute inset-0 size-full [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-center text-white mb-6 tracking-tight">
            Simple pricing. Scale when you’re ready.
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 text-center max-w-2xl mb-16">
            Start free. Pay when Refactron starts saving real engineering time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex flex-col p-8 bg-black/50 backdrop-blur-sm border transition-all duration-300',
                  tier.highlight
                    ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                    : 'border-white/10 hover:border-white/20'
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider rounded-full">
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
                      <span className="text-sm text-neutral-400">
                        {tier.priceSuffix}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-400">{tier.description}</p>
                  {/* @ts-ignore */}
                  {tier.trial && (
                    <span className="inline-block mt-3 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                      {/* @ts-ignore */}
                      {tier.trial}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white shrink-0" />
                      <span className="text-sm text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={tier.action}
                  className={cn(
                    'w-full py-3 px-6 font-medium transition-colors duration-200',
                    tier.highlight
                      ? 'bg-amber-500 text-black hover:bg-amber-400'
                      : 'bg-white/10 text-white hover:bg-white/20'
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
