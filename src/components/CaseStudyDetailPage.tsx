import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Target,
  ArrowRight,
} from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies';

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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-wide text-primary-500 mb-2">
          Case Study
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          We couldn't find that story
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          The case study you're looking for may have moved or does not exist.
          Head back to see the full library.
        </p>
        <button
          onClick={() => navigate('/case-studies')}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-3 rounded-full text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          View all case studies
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Card - Matching Portfolio Style */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-16 sm:pt-24 pb-12"
        >
          <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {/* Card Header - Minimal */}
            <div className="relative h-48 bg-gray-50 border-b border-gray-200 p-8 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium uppercase tracking-wide mb-4">
                    <Sparkles className="w-3 h-3 mr-2" />
                    {caseStudy.industry}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {caseStudy.customer}
                  </h1>
                </div>
                <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 ml-4">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mt-4">
                {caseStudy.highlight}
              </p>
            </div>

            {/* Card Content */}
            <div className="p-8">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                {caseStudy.overview}
              </p>

              {/* Metrics - Same style as listing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {caseStudy.metrics.map(metric => (
                  <div
                    key={metric.label}
                    className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      {metric.label}
                    </div>
                    {metric.context && (
                      <div className="text-xs text-gray-400 mt-1">
                        {metric.context}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Three Column Cards - Consistent Heights */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Pain Points
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                {caseStudy.painPoints.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Our Approach
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                {caseStudy.refactronApproach.map(step => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Outcomes
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                {caseStudy.outcomes.map(outcome => (
                  <li key={outcome} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </motion.section>

        {/* Before/After Comparison - Consistent Heights */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold">–</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  Before Refactron
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                {caseStudy.before.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-600 font-bold">+</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  After Refactron
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                {caseStudy.after.map(point => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Quote Section */}
        {caseStudy.quote && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pb-12"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-12">
              <p className="text-xl lg:text-2xl text-gray-900 font-semibold mb-6 leading-relaxed">
                "{caseStudy.quote.text}"
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                <span>{caseStudy.quote.author}</span>
                <span>·</span>
                <span>{caseStudy.quote.role}</span>
              </div>
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-20 sm:pb-24"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="/#early-access"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discuss a Tailored Playbook
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('/case-studies')}
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;
