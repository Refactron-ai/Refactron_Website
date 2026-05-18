import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import changelog, { ChangelogEntry } from '../data/changelog';
import webChangelog from '../data/webChangelog';

const tagStyles: Record<string, string> = {
  new: 'border-teal-500/30 bg-teal-500/[0.08] text-teal-400',
  improvement: 'border-blue-500/30 bg-blue-500/[0.08] text-blue-400',
  fix: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-400',
  beta: 'border-purple-500/30 bg-purple-500/[0.08] text-purple-400',
  pivot: 'border-rose-500/40 bg-rose-500/[0.10] text-rose-300',
};

const sectionDotColor: Record<string, string> = {
  feat: 'bg-teal-400',
  improvement: 'bg-blue-400',
  fix: 'bg-amber-400',
};

/**
 * One changelog release, laid out as a vertical timeline row — Mintlify-style:
 * a sticky version label on the left rail, a node on the connecting line, and
 * the release content to the right.
 */
function TimelineEntry({
  entry,
  index,
}: {
  entry: ChangelogEntry;
  index: number;
}) {
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  const toggle = (i: number) => {
    setExpandedSections(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const isPivot = entry.tag === 'pivot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex flex-col gap-3 sm:flex-row sm:gap-9"
    >
      {/* Left rail — version, date, tag (sticky on desktop) */}
      <div className="sm:sticky sm:top-28 sm:w-32 sm:shrink-0 sm:self-start sm:pt-0.5 sm:text-right">
        <div className="font-mono text-lg font-semibold tracking-tight text-white">
          {entry.version}
        </div>
        <div className="mt-1 font-mono text-xs tracking-wide text-neutral-500">
          {entry.date}
        </div>
        {entry.tag && (
          <span
            className={`mt-2.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${tagStyles[entry.tag]}`}
          >
            {entry.tag}
          </span>
        )}
      </div>

      {/* Connecting line + node + release content */}
      <div
        className={`relative flex-1 border-l pb-14 pl-6 sm:pl-9 ${
          isPivot ? 'border-rose-500/25' : 'border-white/[0.10]'
        }`}
      >
        <span
          className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${
            isPivot
              ? 'bg-rose-400 shadow-[0_0_0_4px_rgba(244,63,94,0.12)]'
              : 'bg-neutral-500'
          }`}
          aria-hidden
        />

        <h2 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
          {entry.title}
        </h2>

        <div className="mt-6 space-y-7">
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
                      className="group mb-0 flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
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
                        className="mt-4 space-y-4 border-l border-white/[0.06] pl-5"
                      >
                        {section.items.map((item, ii) => (
                          <p
                            key={ii}
                            className="text-sm leading-relaxed text-neutral-400"
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
                    <div className="mb-4 flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${sectionDotColor[section.type] ?? 'bg-neutral-500'}`}
                      />
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                        {section.label}
                      </p>
                    </div>
                    <ul className="space-y-3.5">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-3 text-sm">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                          <p className="leading-relaxed text-neutral-400">
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
      </div>
    </motion.div>
  );
}

type Tab = 'web' | 'cli';

const Changelog: React.FC = () => {
  const [tab, setTab] = useState<Tab>('web');

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

  const entries = tab === 'web' ? webChangelog : changelog;

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
          className="mb-10"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-none mb-4">
            Changelog
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed">
            Updates, improvements, and quiet wins.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-1 mb-12 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] w-fit"
        >
          {(['web', 'cli'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === t
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t === 'web' ? 'Web App' : 'CLI Package'}
            </button>
          ))}
        </motion.div>

        {/* Entries — vertical timeline */}
        <div className="relative">
          {entries.map((entry, i) => (
            <TimelineEntry key={entry.version} entry={entry} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-white/[0.06] text-center">
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
