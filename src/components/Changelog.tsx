import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import changelog, { ChangelogEntry } from '../data/changelog';

const tagStyles: Record<string, string> = {
  new: 'border-teal-500/30 bg-teal-500/[0.08] text-teal-400',
  improvement: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-400',
  fix: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-400',
  beta: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-400',
};

const sectionDotColor: Record<string, string> = {
  feat: 'bg-teal-400',
  improvement: 'bg-blue-400',
  fix: 'bg-amber-400',
};

function EntryCard({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  const toggle = (i: number) => {
    setExpandedSections(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="rounded-2xl border border-white/[0.10] bg-white/[0.04] backdrop-blur-sm overflow-hidden"
    >
      {/* Card header */}
      <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-mono text-sm text-neutral-500 tracking-wide">
            {entry.version}
          </span>
          <span className="text-neutral-700 text-xs">·</span>
          <span className="font-mono text-sm text-neutral-500 tracking-wide">
            {entry.date}
          </span>
          {entry.tag && (
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${tagStyles[entry.tag]}`}
            >
              {entry.tag}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
          {entry.title}
        </h2>
      </div>

      {/* Sections */}
      <div className="px-8 py-6 space-y-7">
        {entry.sections.map((section, si) => {
          const isCollapsible = section.collapsible;
          const isExpanded = expandedSections[si] ?? false;

          return (
            <div key={si}>
              {isCollapsible ? (
                /* Collapsible section */
                <div>
                  <button
                    onClick={() => toggle(si)}
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors mb-0 group"
                  >
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                    <span>
                      {isExpanded
                        ? section.label
                        : `${section.label} / Housekeeping...`}
                    </span>
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 pl-5 border-l border-white/[0.06] space-y-4"
                    >
                      {section.items.map((item, ii) => (
                        <p
                          key={ii}
                          className="text-sm text-neutral-400 leading-relaxed"
                        >
                          <span className="font-semibold text-neutral-200">
                            {item.label}:
                          </span>{' '}
                          {item.description}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Normal section */
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${sectionDotColor[section.type] ?? 'bg-neutral-500'}`}
                    />
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                      {section.label}
                    </p>
                  </div>
                  <ul className="space-y-3.5">
                    {section.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-3 text-sm">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                        <p className="text-neutral-400 leading-relaxed">
                          <span className="font-semibold text-neutral-200">
                            {item.label}:
                          </span>{' '}
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

const Changelog: React.FC = () => {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = 'transparent';
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  useSEO({
    title: 'Changelog | Refactron',
    description:
      "See what's new in Refactron — release notes, improvements, and bug fixes.",
    canonical: 'https://refactron.dev/changelog',
    robots: 'index, follow',
  });

  return (
    <div
      className="relative font-space antialiased min-h-screen"
      style={{ background: 'transparent' }}
    >
      {/* Fixed background image */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'url(/changelog-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dim layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'rgba(0,0,0,0.68)',
        }}
      />
      {/* Corner vignette — fades to near-black at all edges */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      <div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24"
        style={{ zIndex: 10 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-none mb-4">
            Changelog
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed">
            Updates, improvements, and quiet wins.
          </p>
        </motion.div>

        {/* Entries */}
        <div className="space-y-4">
          {changelog.map((entry, i) => (
            <EntryCard key={entry.version} entry={entry} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-sm text-neutral-400">
            Questions or feedback?{' '}
            <a
              href="mailto:team@refactron.dev"
              className="text-neutral-200 hover:text-white transition-colors"
            >
              team@refactron.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
