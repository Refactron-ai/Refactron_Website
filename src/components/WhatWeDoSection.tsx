'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { StarsBackground } from './ui/stars-background';
import { ShootingStars } from './ui/shooting-stars';
import { FeatureCard } from './ui/feature-card';

const WhatWeDoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: 'Refactoring Intelligence',
      subtitle:
        'Refactoring treated as a structured, safety-first engineering process—not blind automation.',
      points: [
        'Understands code structure and relationships',
        'Proposes targeted, behavior-preserving improvements',
        'Avoids large, risk-heavy rewrites',
      ],
      cardTitle: 'INTELLIGENCE ENGINE',
      cardCode: [
        '> analyzing_dependency_graph...',
        '> detecting_architectural_smells...',
        '> identified: circular_dependency [module_a <-> module_b]',
        '> calculating_impact_radius...',
        '> proposal_ready: extract_interface strategy',
      ],
    },
    {
      title: 'Maintainability-First',
      subtitle: 'Focused on long-term code health, not short-term fixes.',
      points: [
        'Reduces complexity and duplication',
        'Keeps changes minimal and reviewable',
        'Improves readability and structure over time',
      ],
      cardTitle: 'HEALTH METRICS',
      cardCode: [
        '> calculating_cyclomatic_complexity...',
        '> current_score: 15 (high_risk)',
        '> applying_refactor: simplify_conditional...',
        '> new_score: 4 (low_risk)',
        '> duplication_index: reduced by 40%',
      ],
    },
    {
      title: 'Human-in-the-Loop',
      subtitle: 'Developers stay in control of every change.',
      points: [
        'Refactors delivered as clear diffs',
        'Designed for inspection and code review',
        'Automation only with explicit intent',
      ],
      cardTitle: 'REVIEW INTERFACE',
      cardCode: [
        '> generating_diff...',
        '> --- a/src/legacy_service.ts',
        '> +++ b/src/legacy_service.ts',
        '> - function complexLogic() { ... }',
        '> + function simplifiedLogic() { ... }',
        '> waiting_for_approval...',
        '> approved_by: @senior_dev',
      ],
    },
    {
      title: 'Incremental Legacy Evolution',
      subtitle: 'Modernize existing systems without disruption.',
      points: [
        'Small, verified improvements',
        'Safe to apply in production codebases',
        'No big-bang migrations',
      ],
      cardTitle: 'EVOLUTION STRATEGY',
      cardCode: [
        '> strategy: strangler_fig_pattern',
        '> phase_1: isolate_legacy_module... [DONE]',
        '> phase_2: route_traffic_to_new_service... [IN_PROGRESS]',
        '> monitoring_error_rates... [STABLE]',
        '> legacy_system_load: 40% -> 20%',
      ],
    },
    {
      title: 'Workflow-Friendly',
      subtitle: 'Fits naturally into how teams already work.',
      points: [
        'Git- and CI/CD-aware by design',
        'Produces documentation and metrics',
        'Built to scale with engineering workflows',
      ],
      cardTitle: 'CI/CD INTEGRATION',
      cardCode: [
        '> git fetch origin main',
        '> refactron check --branch feature/new-api',
        '> analyzing_changes...',
        '> report_generated: refactron-report.json',
        '> posting_pr_comment...',
        '> status: success (no regressions found)',
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--bg-primary)] w-full"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none fixed">
        <StarsBackground />
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minSpeed={5}
          maxSpeed={5}
          minDelay={1000}
          maxDelay={3000}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="min-h-[600px] flex items-center justify-center py-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: false, margin: '-20%' }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-neutral-400 tracking-wider">
                      0{index + 1}
                    </span>
                    <div className="h-[1px] w-full max-w-[600px] bg-neutral-800" />
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[var(--text-primary)] tracking-tight font-space leading-[1.1]">
                    {feature.title}
                  </h2>
                  <p className="text-xl text-neutral-400 font-space leading-relaxed max-w-lg">
                    {feature.subtitle}
                  </p>
                </div>

                <ul className="space-y-4">
                  {feature.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-neutral-400 font-space text-base"
                    >
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: false, margin: '-20%' }}
                className="relative h-[400px] w-full"
              >
                <FeatureCard
                  step={`SESSION_0${index + 1}`}
                  title={feature.cardTitle}
                  code={feature.cardCode}
                  className="h-full"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;
