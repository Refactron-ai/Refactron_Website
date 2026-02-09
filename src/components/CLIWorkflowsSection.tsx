import React from 'react';
import { Workflow } from 'lucide-react';
import { VersionContent } from '../data/docs/types';

interface CLIWorkflowsSectionProps {
  versionContent: VersionContent;
  cliBasicSample: string;
}

/**
 * Renders the CLI Workflows section with optional version-specific commands
 */
export const CLIWorkflowsSection: React.FC<CLIWorkflowsSectionProps> = ({
  versionContent,
  cliBasicSample,
}) => {
  return (
    <section id="cli-workflows" className="scroll-mt-24 space-y-6">
      <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
        <Workflow className="w-6 h-6 text-neutral-400" />
        CLI Workflows
      </h2>

      {versionContent.cliWorkflows?.description && (
        <p className="text-neutral-400 leading-relaxed">
          {versionContent.cliWorkflows.description}
        </p>
      )}

      <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 overflow-hidden">
        <pre className="font-mono text-sm text-neutral-300 overflow-x-auto">
          <code>
            {versionContent.cliWorkflows?.cliSample || cliBasicSample}
          </code>
        </pre>
      </div>

      {versionContent.cliWorkflows?.commandGroups ? (
        <div className="space-y-8">
          {versionContent.cliWorkflows.commandGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="p-6 rounded-xl border border-white/10 bg-neutral-900/30"
            >
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.commands.map((cmd, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4"
                  >
                    <code className="text-sm font-mono text-purple-400 shrink-0 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">
                      {cmd.command}
                    </code>
                    <p className="text-sm text-neutral-400 pt-0.5">
                      {cmd.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        versionContent.cliWorkflows?.commands && (
          <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/30">
            <h3 className="text-base font-semibold text-white mb-3">
              Available Commands in {versionContent.version}
            </h3>
            <div className="space-y-3">
              {versionContent.cliWorkflows.commands.map((cmd, idx) => (
                <div key={idx} className="flex gap-3">
                  <code className="text-sm font-mono text-purple-400 shrink-0">
                    {cmd.command}
                  </code>
                  <p className="text-sm text-neutral-400">{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );
};
