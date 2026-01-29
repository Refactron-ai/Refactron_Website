import { VersionContent } from '../types';

/**
 * v1.0.13 Documentation Content
 */
export const v1_0_13: VersionContent = {
  version: 'v1.0.13',

  whatsNew: {
    overview:
      'Refactron v1.0.13 is a milestone release focusing on Adaptive Intelligence and Enterprise Performance.',
    sections: {
      patternLearning: {
        title: 'Pattern Learning Engine',
        items: [
          {
            description:
              "Refactron now learns from your project's specific coding style.",
          },
        ],
      },
      astCaching: {
        title: 'AST Caching & Incremental Analysis',
        items: [
          {
            description: 'Up to 80% faster analysis for large codebases.',
          },
        ],
      },
      secureCLI: {
        title: 'Secure CLI Dashboard',
        items: [
          {
            description:
              'A new interactive terminal interface with mandatory authentication.',
          },
        ],
      },
      gitRollback: {
        title: 'Git-Integrated Rollback',
        items: [
          {
            description:
              'Safely undo any refactoring session with a single command.',
          },
        ],
      },
      securityEnhancements: {
        title: 'Enhanced Security',
        items: [
          {
            description:
              'OAuth2 device-code flow and anonymized pattern synchronization.',
          },
        ],
      },
    },
  },

  quickStart: {
    installation: `# Upgrade to v1.0.13\npip install --upgrade refactron`,
    authentication: `# New: Mandatory Authentication\nrefactron login`,
    firstAnalysis: `# Analyze with Pattern Learning\nrefactron analyze .`,
  },

  tutorials: [
    {
      title: 'Mastering the Pattern Learning Loop',
      steps: [
        'Initial Scan: Run refactron analyze to identify baseline patterns.',
        'Interactive Feedback: Use the CLI to accept or reject suggestions.',
        "Adaptive Refactoring: Watch as Refactron prioritizes suggestions that match your project's architecture.",
      ],
    },
  ],

  coreConcepts: {
    description:
      'Refactron v1.0.13 introduces a revolutionary adaptive engine that learns from your codebase.',
    items: [
      {
        code: 'Analyzers',
        description: 'Now include project-specific pattern recognition.',
      },
      {
        code: 'Refactoring Recipes',
        description:
          'Dynamically ranked based on your project\'s "accepted" patterns.',
      },
      {
        code: 'Safeguards',
        description:
          'Enhanced with AST caching to ensure consistency during large-scale changes.',
      },
    ],
  },

  cliWorkflows: {
    description:
      'Refactron v1.0.13 features a completely revamped CLI with a modern dashboard and powerful new workflows.',
    commandGroups: [
      {
        title: 'Authentication',
        commands: [
          {
            command: 'refactron login',
            description:
              'Authenticate your device using the secure OAuth2 device-code flow.',
          },
          {
            command: 'refactron logout',
            description:
              'Securely remove stored credentials from your local machine.',
          },
          {
            command: 'refactron auth status',
            description:
              'View your current login status, plan details, and token expiration.',
          },
        ],
      },
      {
        title: 'Core Workflows',
        commands: [
          {
            command: 'refactron analyze <target>',
            description:
              'Perform a deep dive into your codebase to identify technical debt and security risks.',
          },
          {
            command: 'refactron refactor <target>',
            description:
              'Apply intelligent refactoring suggestions. Use --preview to see changes or --apply to write them to disk.',
          },
          {
            command: 'refactron autofix <target>',
            description:
              'Automatically resolve common issues using our safe-fix engine.',
          },
          {
            command: 'refactron report <target>',
            description:
              'Generate professional technical debt reports in Text, JSON, or HTML formats.',
          },
        ],
      },
      {
        title: 'Pattern Learning & Tuning',
        commands: [
          {
            command: 'refactron feedback <id>',
            description:
              'Provide direct feedback (accepted/rejected) on a specific refactoring operation to train the engine.',
          },
          {
            command: 'refactron patterns analyze',
            description:
              'View project-specific pattern acceptance rates and usage statistics.',
          },
          {
            command: 'refactron patterns recommend',
            description:
              "Get AI-driven recommendations for tuning your project's refactoring rules.",
          },
          {
            command: 'refactron patterns tune',
            description:
              'Automatically apply recommended tuning to your project profile.',
          },
        ],
      },
      {
        title: 'Safety & Maintenance',
        commands: [
          {
            command: 'refactron rollback',
            description:
              'Undo refactoring sessions. Use --list to see history or --session <id> to restore a specific state.',
          },
          {
            command: 'refactron init',
            description:
              'Initialize a .refactron.yaml configuration file with framework-specific templates (Django, FastAPI, Flask).',
          },
          {
            command: 'refactron generate-cicd',
            description:
              'Generate ready-to-use templates for GitHub Actions, GitLab CI, and pre-commit hooks.',
          },
        ],
      },
      {
        title: 'Observability & Metrics',
        commands: [
          {
            command: 'refactron metrics',
            description:
              'View detailed performance statistics and analyzer hit counts for the current session.',
          },
          {
            command: 'refactron serve-metrics',
            description:
              'Start a local Prometheus-compatible HTTP server to export Refactron metrics.',
          },
          {
            command: 'refactron telemetry',
            description:
              'Manage your opt-in telemetry settings to help improve Refactron (anonymous data only).',
          },
        ],
      },
    ],
  },

  security: {
    description: 'Enterprise-Grade Standards',
    items: [
      {
        title: 'Local Analysis',
        copy: 'Code analysis is performed locally on your machine.',
      },
      {
        title: 'Pattern Sync',
        copy: 'Only anonymized pattern metadata is synced to your account to improve suggestion accuracy.',
      },
      {
        title: 'Secure Tokens',
        copy: 'OAuth2 device-code flow ensures your credentials are never stored in plain text.',
      },
    ],
  },

  apiReference: {
    sample: `from refactron import Refactron\n\n# Initialize with AST Cache enabled\nrefactron = Refactron(use_cache=True)\nanalysis = refactron.analyze("src/")`,
  },
};
