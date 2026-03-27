import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, ExternalLink, Tag, User } from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies';
import TextType from './ui/text-type';

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
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
      >
        <polyline points="22,16 8,32 22,48" {...attr} />
        <polyline points="42,16 56,32 42,48" {...attr} />
        <line x1="28" y1="44" x2="36" y2="20" {...attr} />
      </svg>
    );
  }
  if (lower.includes('financial') || lower.includes('analytics')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
      >
        <polyline points="8,48 20,36 32,40 44,24 56,16" {...attr} />
        <circle cx="44" cy="24" r="3" {...attr} />
        <circle cx="56" cy="16" r="3" {...attr} />
        <line x1="8" y1="48" x2="8" y2="16" {...attr} />
        <line x1="8" y1="48" x2="56" y2="48" {...attr} />
      </svg>
    );
  }
  if (lower.includes('health')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
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
  return (
    <svg
      viewBox="0 0 64 64"
      width="72"
      height="72"
      stroke={attr.stroke}
      fill={attr.fill}
    >
      <rect x="10" y="14" width="44" height="12" rx="2" {...attr} />
      <rect x="10" y="30" width="44" height="12" rx="2" {...attr} />
      <rect x="10" y="46" width="44" height="8" rx="2" {...attr} />
      <circle cx="48" cy="20" r="2" {...attr} />
      <circle cx="48" cy="36" r="2" {...attr} />
    </svg>
  );
}

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-black text-neutral-400 font-space flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-wide text-neutral-500 mb-2">
          Case Study
        </p>
        <h1 className="text-3xl font-semibold text-white mb-4 tracking-tight">
          We couldn't find that story
        </h1>
        <p className="text-neutral-400 mb-6 max-w-md">
          The case study you're looking for may have moved or does not exist.
        </p>
        <button
          onClick={() => navigate('/case-studies')}
          className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          View all case studies
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-neutral-400 font-space">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-28 pb-8"
        >
          {/* Back link */}
          <button
            onClick={() => navigate('/case-studies')}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </button>

          {/* Industry */}
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-space mb-4">
            {caseStudy.industry}
          </p>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-space leading-[1.05] tracking-tight mb-6">
            {caseStudy.customer}
          </h1>

          {/* Author · Date · Tag row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500 mb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {caseStudy.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {caseStudy.publishedAt}
            </span>
            {caseStudy.tags[0] && (
              <span className="text-neutral-600">{caseStudy.tags[0]}</span>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />
        </motion.div>

        {/* ── Hero illustration ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-16"
          style={{ backgroundColor: caseStudy.accentColor }}
        >
          <div className="h-72 flex items-center justify-center">
            {getIcon(caseStudy.industry)}
          </div>
        </motion.div>

        {/* ── Overview ──────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="pb-16"
        >
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            {caseStudy.overview}
          </p>
        </motion.section>

        {/* ── Pain Points ───────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="pb-16 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight">
            Pain Points
          </h2>
          <ul className="space-y-5">
            {caseStudy.painPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-neutral-400 text-base sm:text-lg leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2.5 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Our Approach ──────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="py-16 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight">
            Our Approach
          </h2>
          <ul className="space-y-5">
            {caseStudy.refactronApproach.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-neutral-400 text-base sm:text-lg leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Outcomes ──────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="py-16 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight">
            Outcomes
          </h2>
          <ul className="space-y-5">
            {caseStudy.outcomes.map((outcome, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-neutral-400 text-base sm:text-lg leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0" />
                {outcome}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* ── Before / After ────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="py-16 border-b border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 tracking-tight">
                Before Refactron
              </h3>
              <ul className="space-y-5">
                {caseStudy.before.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-neutral-400 text-base leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 tracking-tight">
                After Refactron
              </h3>
              <ul className="space-y-5">
                {caseStudy.after.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-neutral-400 text-base leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ── Quote ─────────────────────────────────────────────── */}
        {caseStudy.quote && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="py-16 border-b border-white/10"
          >
            <div className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-4 italic">
              <TextType
                text={`"${caseStudy.quote.text}"`}
                className="inline"
                typingSpeed={50}
                cursorCharacter="|"
                loop={false}
                startOnVisible={true}
              />
            </div>
            <p className="text-sm text-neutral-500">
              {caseStudy.quote.author} · {caseStudy.quote.role}
            </p>
          </motion.section>
        )}

        {/* ── References ────────────────────────────────────────── */}
        {caseStudy.references && caseStudy.references.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="py-16 border-b border-white/10"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight">
              References
            </h2>
            <ol className="space-y-4">
              {caseStudy.references.map((ref, i) => (
                <li key={i}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-3 text-neutral-400 hover:text-white transition-colors"
                  >
                    <span className="text-neutral-600 font-medium flex-shrink-0">
                      {i + 1}.
                    </span>
                    <span>
                      <span className="font-medium">{ref.title}</span>
                      <span className="text-neutral-500 text-sm ml-2">
                        · {ref.source}
                      </span>
                      <ExternalLink className="w-3 h-3 inline-block ml-2 text-neutral-600 group-hover:text-white transition-colors" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.section>
        )}

        {/* ── Tags ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="py-10 flex flex-wrap gap-4"
        >
          {caseStudy.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 font-space"
            >
              <Tag className="w-3.5 h-3.5" />
              {tag}
            </span>
          ))}
        </motion.div>

        <div className="border-t border-white/10 pb-16">
          <div className="flex items-center gap-6 pt-6 text-sm text-neutral-500 font-space">
            <span>{caseStudy.views} views</span>
            <span>{caseStudy.clicks} clicks</span>
          </div>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;
