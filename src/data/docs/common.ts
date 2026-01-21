import {
  BookOpen,
  Rocket,
  GraduationCap,
  Layers,
  Code2,
  Workflow,
  ShieldCheck,
} from 'lucide-react';
import { CommonDocsData } from './types';

/**
 * Common documentation data shared across all versions
 */
export const commonDocsData: CommonDocsData = {
  sections: [
    {
      id: 'overview',
      title: 'Introduction',
      icon: BookOpen,
      description:
        'Refactron Docs helps you understand how to integrate the Refactron AI refactoring engine into your workflow. Start here to explore capabilities, architecture, and integration patterns.',
    },
    {
      id: 'quick-start',
      title: 'Quick Start',
      icon: Rocket,
      description:
        'Install the Refactron library, authenticate, and run your first refactoring pipeline in under five minutes.',
    },
    {
      id: 'tutorials',
      title: 'Tutorials',
      icon: GraduationCap,
      description:
        'Step-by-step tutorial, CLI quick reference, and Python snippets so you can master Refactron workflows quickly.',
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      icon: Layers,
      description:
        'Learn about projects, snapshots, analyzers, refactoring recipes, and safeguards that keep your codebase healthy.',
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code2,
      description:
        'Comprehensive TypeScript-first API surface with typed responses, error handling, and usage examples.',
    },
    {
      id: 'cli-workflows',
      title: 'CLI Workflows',
      icon: Workflow,
      description:
        'Automate large-scale refactors with the Refactron CLI: audit debt, apply recipes, and generate reports.',
    },
    {
      id: 'security',
      title: 'Security',
      icon: ShieldCheck,
      description:
        'How we secure your code, handle data residency, and comply with enterprise-grade standards.',
    },
  ],

  pythonApiSample: `from refactron import Refactron
from refactron.core.config import RefactronConfig

config = RefactronConfig.from_file(".refactron.yaml")
client = Refactron(config)

analysis = client.analyze("src/")
critical = [i for i in analysis.issues if i.level.value == "CRITICAL"]

result = client.refactor(
    "app.py",
    preview=True,
    types=["extract_constant", "add_docstring"]
)
result.show_diff()`,

  cliSamples: {
    cli: `# Initialize configuration
refactron init

# Analyze code with details
refactron analyze src/ --detailed

# Preview refactorings
refactron refactor app.py --preview

# Apply specific refactorers
refactron refactor app.py -t extract_constant -t add_docstring

# Export JSON report
refactron report src/ --format json -o report.json
`,
  },

  securityItems: [
    {
      title: 'Zero data retention by default',
      copy: 'Self-host connectors keep code within your VPC. Cloud runs are transient with encrypted storage.',
    },
    {
      title: 'SOC 2 in motion',
      copy: 'SOC 2 Type II audit underway. GDPR compliant, with data residency in the US and EU.',
    },
    {
      title: 'Secrets hygiene',
      copy: 'API keys are scoped by environment. Rotate via CLI.',
    },
    {
      title: 'Audit exports',
      copy: 'Stream run metadata to SIEM tools via webhooks, Azure Event Hub, or Amazon Kinesis.',
    },
  ],

  availableVersions: ['v1.0.1', 'v1.0.0', 'v0.1.0b'],
};
