import { VersionContent } from '../types';

/**
 * v1.0.15 Documentation Content
 */
export const v1_0_15: VersionContent = {
  version: 'v1.0.15',

  whatsNew: {
    overview:
      'Refactron v1.0.15 is a major release introducing semantic code intelligence through LLM Orchestration and Retrieval-Augmented Generation (RAG).',
    sections: {
      repositoryManagement: {
        title: 'Repository Management (refactron repo)',
        items: [
          {
            description:
              'Link GitHub repositories to local directories or auto-clone them.',
          },
          {
            description:
              'Auto-Indexing: Connecting a repo triggers a background RAG indexing process.',
          },
          {
            description:
              'Workspaces: Manages local mappings in ~/.refactron/workspaces/.',
          },
        ],
      },
      aiPoweredCommands: {
        title: 'AI-Powered Commands',
        items: [
          {
            description:
              'refactron suggest [path]: Contextual refactoring proposals.',
          },
          {
            description:
              'refactron document [path]: Automated Google-style docstrings.',
          },
          {
            description:
              'Safety Gate: Built-in syntax and safety verification for generated code.',
          },
          {
            description:
              'Feedback Loop: Rate AI suggestions with refactron feedback.',
          },
        ],
      },
      observabilityMetrics: {
        title: 'Observability & Metrics',
        items: [
          {
            description:
              'refactron metrics: Real-time statistics on analysis performance.',
          },
          {
            description:
              'refactron serve-metrics: Prometheus-compatible metrics server.',
          },
          {
            description:
              'Telemetry: Opt-in anonymous usage data for improvements.',
          },
        ],
      },
      ciCdIntegration: {
        title: 'CI/CD Integration',
        items: [
          {
            description:
              'refactron ci <platform>: Generate workflow files for GitHub Actions, GitLab CI, or pre-commit.',
          },
          {
            description:
              'Automated Gates: Configure builds to fail on critical code debt or security issues.',
          },
        ],
      },
      cliExperience: {
        title: 'Improved CLI Experience',
        items: [
          {
            description: 'Stylized Dashboard: New interactive startup screen.',
          },
          {
            description:
              'Interactive Selectors: Navigate and select files/folders directly within the CLI.',
          },
        ],
      },
      securityFixes: {
        title: 'Security Fixes',
        items: [
          {
            description:
              'Critical Fix: Resolved an incomplete URL sanitization vulnerability in workspace management.',
          },
          {
            description:
              'Robust Parsing: All URL hostname checks now use robust parsing to prevent injection attacks.',
          },
        ],
      },
      compatibility: {
        title: 'Compatibility Improvements',
        items: [
          {
            description:
              'Python 3.8 Support: Restored full compatibility for older Python 3 environments.',
          },
          {
            description:
              'Tree-sitter API: Adaptive layer for stability across different Tree-sitter versions.',
          },
        ],
      },
    },
  },

  tutorials: [
    {
      title: 'Getting Started with Semantic Intelligence',
      steps: [
        'Log in to your account using refactron login to enable AI features.',
        'Connect your GitHub repository with refactron repo connect <repo-name>.',
        'Wait for Auto-Indexing to complete (it starts immediately after connection).',
        'Analyze your code or get suggestions with refactron analyze or refactron suggest.',
        'Use refactron document to automatically generate docstrings for your project.',
      ],
    },
  ],

  coreConcepts: {
    description:
      'Refactron v1.0.15 moves beyond pattern matching to semantic understanding. The workflow follows a Secure-Link-Analyze pattern.',
    items: [
      {
        code: 'RAG Indexing',
        description:
          'Creates a searchable index of your code for contextual AI suggestions.',
      },
      {
        code: 'LLM Orchestration',
        description:
          'Manages complex AI workflows to ensure accurate and safe code generation.',
      },
      {
        code: 'Safety Gates',
        description:
          'Verify the syntax and safety of AI-generated code before application.',
      },
    ],
  },

  cliWorkflows: {
    description:
      'The Refactron v1.0.15 workflow follows a clear sequence: Authenticate (login) -> Link (repo connect) -> Analyze (analyze/suggest). This ensures full semantic context for AI suggestions.',
    cliSample: `# Authenticate with Refactron
refactron login

# Link your repository
refactron repo connect <repo-name>

# Manually trigger RAG indexing (if needed)
refactron rag index

# Analyze the project with AI context
refactron analyze .

# Get specific refactoring suggestions
refactron suggest path/to/file.py

# Automatically document your code
refactron document .`,
    commandGroups: [
      {
        title: 'Repository Management',
        commands: [
          {
            command: 'refactron repo connect <repo-name>',
            description: 'Link a GitHub repository to a local directory.',
          },
          {
            command: 'refactron rag index',
            description:
              'Manually trigger or update the RAG index for the current project.',
          },
        ],
      },
      {
        title: 'AI Commands',
        commands: [
          {
            command: 'refactron suggest [path]',
            description:
              'Get AI-powered refactoring proposals for the specified path.',
          },
          {
            command: 'refactron document [path]',
            description:
              'Generate Google-style docstrings for the specified path.',
          },
          {
            command: 'refactron feedback',
            description: 'Rate and provide feedback on AI suggestions.',
          },
        ],
      },
      {
        title: 'CI/CD & Automation',
        commands: [
          {
            command: 'refactron ci <platform>',
            description:
              'Generate CI/CD configuration for GitHub Actions, GitLab CI, or pre-commit.',
          },
        ],
      },
      {
        title: 'Observability',
        commands: [
          {
            command: 'refactron metrics',
            description: 'Display real-time analysis performance statistics.',
          },
          {
            command: 'refactron serve-metrics',
            description: 'Spin up a Prometheus-compatible metrics server.',
          },
        ],
      },
    ],
  },

  security: {
    description: 'Security & Compatibility Improvements',
    items: [
      {
        title: 'URL Sanitization',
        copy: 'Resolved a critical vulnerability in workspace management via robust hostname parsing.',
      },
      {
        title: 'Python 3.8 Support',
        copy: 'Restored full compatibility for older Python 3 environments.',
      },
      {
        title: 'Tree-sitter Stability',
        copy: 'Adaptive layer for stability across different Tree-sitter versions.',
      },
    ],
  },

  apiReference: {
    sample: `from refactron import Refactron\n\n# Initialize with RAG support\nrefactron = Refactron(semantic_enabled=True)\nsuggestions = refactron.suggest("src/main.py")`,
  },
};
