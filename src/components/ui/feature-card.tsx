'use client';
import React from 'react';
import { cn } from '../../lib/utils';
import { TypingAnimation } from './terminal';

interface FeatureCardProps {
  step: string;
  title: string;
  code: string[];
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  step,
  title,
  code,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative h-full w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] p-6 shadow-2xl overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-[var(--border-primary)] pb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
            {title}
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-tertiary)]">
          {step}
        </span>
      </div>

      {/* Content */}
      <div className="font-mono text-sm space-y-2">
        {code.map((line, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-[var(--text-tertiary)] select-none w-6 text-right">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[var(--text-secondary)]">
              <TypingAnimation delay={index * 500}>{line}</TypingAnimation>
            </span>
          </div>
        ))}
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
