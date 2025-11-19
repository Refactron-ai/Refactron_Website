import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-wide text-primary-500 mb-2">
          Case Study
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          We couldn’t find that story
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          The case study you’re looking for may have moved or does not exist.
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <button
        onClick={() => navigate('/case-studies')}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to case studies
      </button>

      <section className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-10 mb-10">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
          <Sparkles className="w-3 h-3" />
          {caseStudy.industry}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {caseStudy.customer} · {caseStudy.highlight}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          {caseStudy.overview}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {caseStudy.metrics.map(metric => (
            <div
              key={metric.label}
              className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-5 text-center"
            >
              <div className="text-2xl font-bold text-gray-900">
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
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <article className="md:col-span-1 border border-amber-100 rounded-3xl bg-amber-50/70 p-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-amber-700 mb-3">
            <AlertTriangle className="w-4 h-4" />
            Pain points
          </div>
          <ul className="space-y-3 text-sm text-amber-900">
            {caseStudy.painPoints.map(point => (
              <li key={point} className="flex gap-2">
                <span>•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="md:col-span-1 border border-blue-100 rounded-3xl bg-blue-50/70 p-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-blue-700 mb-3">
            <Shield className="w-4 h-4" />
            Refactron approach
          </div>
          <ul className="space-y-3 text-sm text-blue-900">
            {caseStudy.refactronApproach.map(step => (
              <li key={step} className="flex gap-2">
                <span>→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="md:col-span-1 border border-emerald-100 rounded-3xl bg-emerald-50/70 p-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-700 mb-3">
            <CheckCircle2 className="w-4 h-4" />
            Outcomes
          </div>
          <ul className="space-y-3 text-sm text-emerald-900">
            {caseStudy.outcomes.map(outcome => (
              <li key={outcome} className="flex gap-2">
                <span>+</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="border border-red-100 rounded-3xl p-6 bg-red-50/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
            Before Refactron
          </div>
          <ul className="space-y-2 text-sm text-gray-800">
            {caseStudy.before.map(point => (
              <li key={point} className="flex gap-2">
                <span>–</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-emerald-100 rounded-3xl p-6 bg-emerald-50/60">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-2">
            After Refactron
          </div>
          <ul className="space-y-2 text-sm text-gray-800">
            {caseStudy.after.map(point => (
              <li key={point} className="flex gap-2">
                <span>+</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {caseStudy.quote && (
        <section className="bg-white border border-gray-100 rounded-3xl shadow-lg p-8 mb-12">
          <p className="text-xl text-gray-900 font-semibold mb-4">
            “{caseStudy.quote.text}”
          </p>
          <p className="text-sm text-gray-600">
            {caseStudy.quote.author} · {caseStudy.quote.role}
          </p>
        </section>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <button
          onClick={() => navigate('/case-studies')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to library
        </button>
        <a
          href="/#early-access"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-2xl text-sm font-semibold shadow-lg hover:bg-primary-700"
        >
          Discuss a tailored playbook
        </a>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;
