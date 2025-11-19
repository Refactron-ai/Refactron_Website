import React from 'react';
import {
  ArrowLeft,
  Target,
  AlertTriangle,
  Sparkles,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { caseStudies, industryChallenges } from '../data/caseStudies';

const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
          <Sparkles className="w-3 h-3" />
          Case Studies
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Industry-grade refactoring playbooks
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          Refactron partners with engineering teams who are pushing the limits
          of legacy codebases, AI workloads, and compliance-heavy releases.
          Explore common pain points we attack first and the measurable outcomes
          we drive across sectors.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Average LOC analyzed', value: '845K+' },
            { label: 'Critical issues resolved', value: '320+' },
            { label: 'Release acceleration', value: '≤ 5 days' },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-2xl px-4 py-5 text-center border border-gray-100"
            >
              <div className="text-2xl font-bold text-primary-600">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          Common industry blockers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryChallenges.map(challenge => (
            <article
              key={challenge.sector}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                {challenge.sector}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {challenge.headline}
              </h3>
              <p className="text-sm text-gray-600">{challenge.description}</p>
              <ul className="space-y-2 text-sm text-gray-600">
                {challenge.issues.map(issue => (
                  <li key={issue} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"></span>
                    {issue}
                  </li>
                ))}
              </ul>
              <div className="mt-auto rounded-xl bg-primary-50 text-primary-800 text-sm p-4">
                {challenge.impact}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Featured transformations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map(caseStudy => (
            <article
              key={caseStudy.slug}
              className="bg-white border border-gray-100 rounded-3xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col gap-4"
            >
              <div className="text-xs uppercase tracking-wide font-semibold text-primary-600">
                {caseStudy.industry}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {caseStudy.customer}
              </h3>
              <p className="text-sm text-gray-600">{caseStudy.summary}</p>
              <p className="text-sm text-gray-500 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                {caseStudy.highlight}
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {caseStudy.metrics.slice(0, 3).map(metric => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-gray-100 px-2 py-3"
                  >
                    <div className="text-base font-semibold text-gray-900">
                      {metric.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  {caseStudy.painPoints.length} issues resolved
                </span>
                <button
                  onClick={() => navigate(`/case-studies/${caseStudy.slug}`)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  View details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white rounded-3xl p-8 sm:p-12 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-green-300 mb-3">
              <Shield className="w-4 h-4" />
              Trusted Outcomes
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Ready to modernize your refactoring pipeline?
            </h2>
            <p className="text-gray-200 text-sm sm:text-base max-w-2xl">
              Share the problems slowing your engineers. We will map an
              actionable refactoring playbook in under two weeks, grounded in
              measurable KPIs.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a
              href="/#early-access"
              className="w-full md:w-auto bg-white text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition-colors text-center"
            >
              Book a working session
            </a>
            <button
              onClick={() => navigate('/')}
              className="w-full md:w-auto border border-white/40 rounded-2xl px-6 py-3 text-sm uppercase tracking-wide text-gray-300 hover:bg-white/10 transition-colors"
            >
              Explore product overview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
