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
          <code>{cliBasicSample}</code>
        </pre>
      </div>

      {versionContent.cliWorkflows?.commands && (
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
      )}
    </section>
  );
};
