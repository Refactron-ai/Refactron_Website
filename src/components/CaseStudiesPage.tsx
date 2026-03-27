import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { caseStudies, CaseStudy } from '../data/caseStudies';

// Minimal line-art SVG icons keyed by industry
function getIcon(industry: string) {
  const attr = {
    stroke: 'rgba(0,0,0,0.45)',
    strokeWidth: 1.5,
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const lower = industry.toLowerCase();

  if (
    lower.includes('legacy') ||
    lower.includes('software') ||
    lower.includes('code')
  ) {
    // </> brackets
    return (
      <svg
        viewBox="0 0 64 64"
        width="64"
        height="64"
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <polyline points="22,16 8,32 22,48" {...attr} />
        <polyline points="42,16 56,32 42,48" {...attr} />
        <line x1="28" y1="44" x2="36" y2="20" {...attr} />
      </svg>
    );
  }

  if (
    lower.includes('financial') ||
    lower.includes('analytics') ||
    lower.includes('data')
  ) {
    // Line chart with dots
    return (
      <svg
        viewBox="0 0 64 64"
        width="64"
        height="64"
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <polyline points="8,48 20,36 32,40 44,24 56,16" {...attr} />
        <circle cx="20" cy="36" r="3" {...attr} />
        <circle cx="32" cy="40" r="3" {...attr} />
        <circle cx="44" cy="24" r="3" {...attr} />
        <circle cx="56" cy="16" r="3" {...attr} />
        <line x1="8" y1="48" x2="8" y2="16" {...attr} />
        <line x1="8" y1="48" x2="56" y2="48" {...attr} />
      </svg>
    );
  }

  if (lower.includes('health') || lower.includes('medical')) {
    // Shield with cross
    return (
      <svg
        viewBox="0 0 64 64"
        width="64"
        height="64"
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <path
          d="M32 8 L52 16 L52 34 Q52 50 32 56 Q12 50 12 34 L12 16 Z"
          {...attr}
        />
        <line x1="32" y1="26" x2="32" y2="38" {...attr} />
        <line x1="26" y1="32" x2="38" y2="32" {...attr} />
      </svg>
    );
  }

  if (
    lower.includes('infra') ||
    lower.includes('platform') ||
    lower.includes('enterprise')
  ) {
    // Stacked server rectangles
    return (
      <svg
        viewBox="0 0 64 64"
        width="64"
        height="64"
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <rect x="10" y="14" width="44" height="12" rx="2" {...attr} />
        <rect x="10" y="30" width="44" height="12" rx="2" {...attr} />
        <rect x="10" y="46" width="44" height="8" rx="2" {...attr} />
        <circle cx="48" cy="20" r="2" {...attr} />
        <circle cx="48" cy="36" r="2" {...attr} />
      </svg>
    );
  }

  // Fallback — concentric circles (generic tech/process)
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      {...{ stroke: attr.stroke, fill: attr.fill }}
    >
      <circle cx="32" cy="32" r="6" {...attr} />
      <circle cx="32" cy="32" r="14" {...attr} />
      <circle cx="32" cy="32" r="22" {...attr} />
    </svg>
  );
}

// Bento span pattern: index % 4 → 0=wide, 1=narrow, 2=narrow, 3=wide
function getBentoSpan(index: number, total: number): boolean {
  if (total === 1) return true; // single card — full width
  return index % 4 === 0 || index % 4 === 3;
}

interface CardProps {
  cs: CaseStudy;
  index: number;
  wide: boolean;
}

function CaseCard({ cs, index, wide }: CardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => navigate(`/case-studies/${cs.slug}`)}
      className={`group rounded-2xl overflow-hidden cursor-pointer ${wide ? 'md:col-span-2' : 'md:col-span-1'}`}
    >
      {/* Top — colored illustration area */}
      <div
        className={`flex items-center justify-center ${wide ? 'h-[27vh]' : 'h-[22vh]'}`}
        style={{ backgroundColor: cs.accentColor }}
      >
        {getIcon(cs.industry)}
      </div>

      {/* Bottom — dark text area */}
      <div className="bg-[#111111] px-6 py-5 space-y-3">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-space">
          {cs.industry}
        </p>
        <h3
          className={`font-bold text-white font-space leading-snug ${wide ? 'text-3xl' : 'text-2xl'}`}
        >
          {cs.customer}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500 font-space">
            {cs.publishedAt.split(' at')[0]}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-200">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-neutral-400 font-space overflow-x-hidden">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white font-space leading-[1.05] mb-4">
            Case Studies
          </h1>
          <p className="text-base md:text-lg text-neutral-400 font-space leading-loose max-w-xl">
            Common patterns we see in long-lived, production codebases.
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies.map((cs, i) => (
            <CaseCard
              key={cs.slug}
              cs={cs}
              index={i}
              wide={getBentoSpan(i, caseStudies.length)}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-space mb-6 leading-tight tracking-tight">
            Ready to transform your codebase?
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed font-space">
            Partner with us to create an actionable refactoring playbook
            tailored to your engineering challenges.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#early-access"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300"
            >
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseStudiesPage;
