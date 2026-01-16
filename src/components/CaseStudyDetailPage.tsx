import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies';

import TextType from './ui/text-type';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-black text-neutral-400 font-space flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-wide text-neutral-500 mb-2">
          Case Study
        </p>
        <h1 className="text-3xl font-light text-white mb-4 tracking-tight">
          We couldn't find that story
        </h1>
        <p className="text-neutral-400 mb-6 max-w-md">
          The case study you're looking for may have moved or does not exist.
          Head back to see the full library.
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
    <div className="relative min-h-screen bg-[#0D0D0D] text-neutral-400 font-space">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Minimal Professional Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-20 sm:pt-24 pb-12"
        >
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
              {caseStudy.industry}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
            {caseStudy.customer}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 mb-12 leading-relaxed font-medium">
            {caseStudy.highlight}
          </p>
        </motion.section>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="pb-16"
        >
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            {caseStudy.overview}
          </p>
        </motion.section>

        {/* Pain Points */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="pb-16 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-10 tracking-tight">
            Pain Points
          </h2>
          <ul className="space-y-6">
            {caseStudy.painPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-4 text-neutral-400 leading-relaxed text-base sm:text-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2.5 flex-shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Refactron Approach */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="py-16 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-10 tracking-tight">
            Our Approach
          </h2>
          <ul className="space-y-6">
            {caseStudy.refactronApproach.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-4 text-neutral-400 leading-relaxed text-base sm:text-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0"></span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Outcomes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="py-16 border-b border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-10 tracking-tight">
            Outcomes
          </h2>
          <ul className="space-y-6">
            {caseStudy.outcomes.map((outcome, index) => (
              <li
                key={index}
                className="flex items-start gap-4 text-neutral-400 leading-relaxed text-base sm:text-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0"></span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Before/After Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="py-16 border-b border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-8 tracking-tight">
                Before Refactron
              </h3>
              <ul className="space-y-6">
                {caseStudy.before.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-neutral-400 leading-relaxed text-base sm:text-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2.5 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-8 tracking-tight">
                After Refactron
              </h3>
              <ul className="space-y-6">
                {caseStudy.after.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-neutral-400 leading-relaxed text-base sm:text-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Quote Section */}
        {caseStudy.quote && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="py-16 border-b border-white/10"
          >
            <div className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6 italic">
              <TextType
                text={`"${caseStudy.quote.text}"`}
                className="inline"
                typingSpeed={50}
                cursorCharacter="|"
                loop={false}
                startOnVisible={true}
              />
            </div>
            <p className="text-sm text-neutral-400">
              {caseStudy.quote.author} · {caseStudy.quote.role}
            </p>
          </motion.section>
        )}

        {/* References Section */}
        {caseStudy.references && caseStudy.references.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="py-16"
          >
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-10 tracking-tight">
              References
            </h2>
            <ol className="space-y-4">
              {caseStudy.references.map((ref, index) => (
                <li key={index} className="text-neutral-400">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-start gap-3 group"
                  >
                    <span className="text-neutral-500 font-medium flex-shrink-0">
                      {index + 1}.
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

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="py-16 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="/#early-access"
              className="group inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discuss a Tailored Playbook
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => navigate('/case-studies')}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Case Studies
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;
