import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  AlertTriangle,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { caseStudies, industryChallenges } from '../data/caseStudies';

const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const GRID_SIZE = 50;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate which grid cell the cursor is in
    const gridX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
    const gridY = Math.floor(y / GRID_SIZE) * GRID_SIZE;

    setMousePosition({ x: gridX, y: gridY });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Minimal Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Top Section with Full-Width Grid Background */}
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden min-h-[600px] -mt-24 sm:-mt-28"
      >
        {/* Full-Width Grid Background */}
        <div className="animated-grid-bg"></div>

        {/* Interactive Grid Fill Effect */}
        {mousePosition && (
          <>
            {/* Filled Cell */}
            <div
              className="absolute pointer-events-none z-[1]"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                width: `${GRID_SIZE}px`,
                height: `${GRID_SIZE}px`,
              }}
            >
              <div className="w-full h-full bg-primary-500/50 border border-primary-400/50"></div>
            </div>

            {/* Illuminated Grid Lines */}
            <svg
              className="absolute pointer-events-none z-[2]"
              style={{
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Top line */}
              <line
                x1={mousePosition.x}
                y1={mousePosition.y}
                x2={mousePosition.x + GRID_SIZE}
                y2={mousePosition.y}
                stroke="#48d1cc"
                strokeWidth="2"
                filter="url(#glow)"
                opacity="0.8"
              />
              {/* Bottom line */}
              <line
                x1={mousePosition.x}
                y1={mousePosition.y + GRID_SIZE}
                x2={mousePosition.x + GRID_SIZE}
                y2={mousePosition.y + GRID_SIZE}
                stroke="#48d1cc"
                strokeWidth="2"
                filter="url(#glow)"
                opacity="0.8"
              />
              {/* Left line */}
              <line
                x1={mousePosition.x}
                y1={mousePosition.y}
                x2={mousePosition.x}
                y2={mousePosition.y + GRID_SIZE}
                stroke="#48d1cc"
                strokeWidth="2"
                filter="url(#glow)"
                opacity="0.8"
              />
              {/* Right line */}
              <line
                x1={mousePosition.x + GRID_SIZE}
                y1={mousePosition.y}
                x2={mousePosition.x + GRID_SIZE}
                y2={mousePosition.y + GRID_SIZE}
                stroke="#48d1cc"
                strokeWidth="2"
                filter="url(#glow)"
                opacity="0.8"
              />
            </svg>
          </>
        )}

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Minimal Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-40 sm:pt-48 pb-12 sm:pb-16 text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
              Case Studies
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
              Real transformations from engineering teams pushing the limits of
              legacy codebases, AI workloads, and compliance-heavy releases.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-16">
              {[
                { label: 'LOC Analyzed', value: '845K+' },
                { label: 'Issues Resolved', value: '320+' },
                { label: 'Release Time', value: '≤ 5 days' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Portfolio Grid - Case Studies */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pb-20 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative h-full flex"
              >
                <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary-200 hover:-translate-y-2 flex flex-col w-full">
                  {/* Card Header - Minimal */}
                  <div className="relative h-48 bg-gray-50 border-b border-gray-200 p-8 flex flex-col justify-between flex-shrink-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium uppercase tracking-wide mb-4">
                          {caseStudy.industry}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight line-clamp-2 tracking-tight">
                          {caseStudy.customer}
                        </h3>
                      </div>
                      <motion.div
                        animate={{
                          scale: hoveredIndex === index ? 1.1 : 1,
                          rotate: hoveredIndex === index ? 5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 ml-4"
                      >
                        <Target className="w-8 h-8 text-primary-600" />
                      </motion.div>
                    </div>
                    <p className="text-gray-600 text-sm font-medium line-clamp-2 mt-4">
                      {caseStudy.highlight}
                    </p>
                  </div>

                  {/* Card Content - Flexible */}
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-gray-600 leading-relaxed mb-6 text-base line-clamp-3">
                      {caseStudy.summary}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-6 flex-shrink-0">
                      {caseStudy.metrics.slice(0, 3).map(metric => (
                        <div
                          key={metric.label}
                          className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100"
                        >
                          <div className="text-xl font-light text-gray-900 mb-1">
                            {metric.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-wide text-gray-500">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Hover Overlay Content */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden flex-shrink-0"
                    >
                      <div className="pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-primary-500" />
                          <span>
                            {caseStudy.painPoints.length} critical issues
                            resolved
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {caseStudy.overview}
                        </p>
                      </div>
                    </motion.div>

                    {/* Action Button - Fixed at bottom */}
                    <motion.button
                      onClick={() =>
                        navigate(`/case-studies/${caseStudy.slug}`)
                      }
                      className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-600 transition-all duration-300 group-hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Industry Challenges - Compact Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-20 sm:pb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
              Common Challenges We Solve
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Across industries, these patterns emerge time and again
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.sector}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {challenge.sector}
                  </span>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight tracking-tight">
                  {challenge.headline}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {challenge.description}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-primary-700">
                    {challenge.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section - Minimal */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-20 sm:pb-24 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium uppercase tracking-wide mb-6">
              <Shield className="w-3 h-3" />
              Get Started
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
              Ready to transform your codebase?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Partner with us to create an actionable refactoring playbook
              tailored to your engineering challenges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#early-access"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book a Session
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
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
