import React from 'react';
import { Rocket } from 'lucide-react';
import { VersionContent } from '../data/docs/types';

interface WhatsNewSectionProps {
  versionContent: VersionContent;
  selectedVersion: string;
}

/**
 * Renders the "What's New" section for a specific version
 */
export const WhatsNewSection: React.FC<WhatsNewSectionProps> = ({
  versionContent,
  selectedVersion,
}) => {
  if (!versionContent.whatsNew) return null;

  const { whatsNew } = versionContent;

  return (
    <section id="whats-new" className="scroll-mt-24 space-y-6">
      <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
        <Rocket className="w-6 h-6 text-neutral-400" />
        What's New in {selectedVersion}
      </h2>
      <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/30 space-y-6">
        <p className="text-neutral-400 leading-relaxed">{whatsNew.overview}</p>

        {/* Performance Analyzer */}
        {whatsNew.sections.performanceAnalyzer && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {whatsNew.sections.performanceAnalyzer.title}
            </h3>
            <div className="pl-4 border-l-2 border-white/10 space-y-2">
              {whatsNew.sections.performanceAnalyzer.items.map((item, idx) => (
                <p key={idx} className="text-sm text-neutral-400">
                  <span className="font-mono text-purple-400">{item.code}</span>{' '}
                  – {item.description}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Analyzer Enhancements */}
        {whatsNew.sections.analyzerEnhancements && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Analyzer Enhancements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Complexity Analyzer */}
              {whatsNew.sections.analyzerEnhancements.complexity && (
                <div className="p-4 rounded-lg bg-black/50 border border-white/5">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Complexity Analyzer
                  </h4>
                  {whatsNew.sections.analyzerEnhancements.complexity.map(
                    (item, idx) => (
                      <p key={idx} className="text-xs text-neutral-400">
                        <span className="font-mono text-blue-400">
                          {item.code}
                        </span>{' '}
                        – {item.description}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* Security Analyzer */}
              {whatsNew.sections.analyzerEnhancements.security && (
                <div className="p-4 rounded-lg bg-black/50 border border-white/5">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Security Analyzer
                  </h4>
                  <p className="text-xs text-neutral-400 mb-2">
                    {
                      whatsNew.sections.analyzerEnhancements.security
                        .description
                    }
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1 list-disc list-inside">
                    {whatsNew.sections.analyzerEnhancements.security.items.map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* False Positive Reduction */}
        {whatsNew.sections.falsePositiveReduction && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              False Positive Reduction
            </h3>
            <div className="p-4 rounded-lg bg-black/50 border border-white/5">
              <ul className="text-sm text-neutral-400 space-y-2">
                {whatsNew.sections.falsePositiveReduction.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Documentation & Tooling */}
        {whatsNew.sections.documentation && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Documentation & Tooling
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {whatsNew.sections.documentation.files.map((file, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-black/50 border border-white/5 text-center"
                >
                  <p className="text-xs font-mono text-blue-400">{file}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-400">
              {whatsNew.sections.documentation.additionalInfo}
            </p>
          </div>
        )}

        {/* Quality & Testing */}
        {whatsNew.sections.quality && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Quality & Testing
            </h3>
            <div className="p-4 rounded-lg bg-black/50 border border-white/5">
              <p className="text-sm text-neutral-400">
                Analyzer modules reach{' '}
                <span className="font-semibold text-green-400">
                  {whatsNew.sections.quality.coverage}
                </span>{' '}
                with new test suites for:
              </p>
              <ul className="text-sm text-neutral-400 space-y-1 mt-2 list-disc list-inside">
                {whatsNew.sections.quality.testSuites.map((suite, idx) => (
                  <li key={idx}>{suite}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
