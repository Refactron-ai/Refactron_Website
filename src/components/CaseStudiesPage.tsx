import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { BackgroundBeams } from './ui/background-beams';

const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-neutral-400 font-space overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-40" />

      {/* Top Section */}
      <div className="relative min-h-[600px] -mt-24 sm:-mt-28 pointer-events-none">
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          {/* Minimal Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-40 sm:pt-48 pb-2 text-center pointer-events-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 leading-tight tracking-tight">
              Case Studies
            </h1>
            <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-4">
              Common patterns we see in long-lived, production codebases.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Portfolio Grid - Case Studies */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <section className="pb-20 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative h-full flex pointer-events-auto"
              >
                <div className="relative h-full w-full aspect-square rounded-2xl border border-white/10 bg-[#0D0D0D] p-8 shadow-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                        CASE STUDY
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 uppercase">
                      {caseStudy.industry}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl text-white font-normal leading-snug">
                      {caseStudy.customer}
                    </h3>
                    <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                      {caseStudy.highlight}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <button
                      onClick={() =>
                        navigate(`/case-studies/${caseStudy.slug}`)
                      }
                      className="w-full bg-neutral-200 text-black text-sm font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section - Minimal */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-20 sm:pb-24 text-center"
        >
          <div className="max-w-3xl mx-auto pointer-events-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
              Ready to transform your codebase?
            </h2>
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
              Partner with us to create an actionable refactoring playbook
              tailored to your engineering challenges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#early-access"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-xl"
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
        </motion.section>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
