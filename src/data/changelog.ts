export interface ChangelogItem {
  label: string;
  description: string;
}

export interface ChangelogSection {
  type: 'feat' | 'improvement' | 'fix';
  label: string;
  collapsible?: boolean;
  items: ChangelogItem[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  tag?: 'new' | 'improvement' | 'fix' | 'beta';
  sections: ChangelogSection[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.0.15',
    date: 'February 8, 2026',
    title: 'AI/LLM Integration & RAG System',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'Major Features',
        items: [
          {
            label: 'LLM/RAG Integration',
            description:
              'Full semantic intelligence suite powered by large language models.',
          },
          {
            label: 'LLM Orchestration',
            description: 'Llama 3 via Groq for fast, cost-efficient inference.',
          },
          {
            label: 'ChromaDB',
            description:
              'Semantic code indexing for context-aware analysis across your repository.',
          },
          {
            label: 'refactron suggest',
            description:
              'AI-powered refactoring suggestions with explanations and risk scores.',
          },
          {
            label: 'refactron document',
            description:
              'Automated docstring generation for functions, classes, and modules.',
          },
          {
            label: 'Repository Management',
            description:
              'New commands — refactron repo list, repo connect, and repo disconnect.',
          },
          {
            label: 'Observability',
            description:
              'refactron metrics for performance stats, serve-metrics for a Prometheus endpoint, and refactron telemetry for opt-in analytics.',
          },
          {
            label: 'CI/CD Integration',
            description:
              'refactron ci generates GitHub Actions and GitLab CI configuration files.',
          },
        ],
      },
      {
        type: 'fix',
        label: 'Bug Fixes',
        collapsible: true,
        items: [
          {
            label: 'URL Sanitization',
            description:
              'Security-hardened URL sanitization to prevent injection attacks.',
          },
          {
            label: 'Python 3.8',
            description:
              'Resolved compatibility issues on Python 3.8 environments.',
          },
          {
            label: 'GroqClient',
            description:
              'Fixed missing GroqClient dependency causing import errors on fresh installs.',
          },
        ],
      },
    ],
  },
  {
    version: '1.0.14',
    date: 'January 30, 2026',
    title: 'CLI Startup Improvements',
    tag: 'improvement',
    sections: [
      {
        type: 'improvement',
        label: 'Improvements',
        items: [
          {
            label: 'CLI Startup',
            description:
              'Improved startup sequence with clearer status messages and faster initialization.',
          },
          {
            label: 'Dependencies',
            description:
              'Better dependency management and reduced install footprint.',
          },
        ],
      },
    ],
  },
  {
    version: '1.0.13',
    date: 'January 30, 2026',
    title: 'Pattern Learning, Performance & Safety',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'Major Features',
        items: [
          {
            label: 'Pattern Learning',
            description:
              'Engine that learns project-specific patterns and ranks suggestions based on historical acceptance.',
          },
          {
            label: 'Interactive Dashboard',
            description:
              'Welcome animation with live system checks and an interactive session dashboard.',
          },
          {
            label: 'AST Caching',
            description:
              'Faster analysis via AST caching, incremental analysis (only changed files), and parallel processing.',
          },
          {
            label: 'Safety System',
            description:
              'Git-integrated backup and automatic rollback before any refactoring operation.',
          },
        ],
      },
      {
        type: 'fix',
        label: 'Bug Fixes',
        collapsible: true,
        items: [
          {
            label: 'Linting',
            description:
              'Resolved numerous linting and type-checking issues across the codebase.',
          },
          {
            label: 'Python 3.8',
            description:
              'Additional compatibility improvements for Python 3.8.',
          },
        ],
      },
    ],
  },
  {
    version: '1.0.1',
    date: 'December 28, 2025',
    title: 'New Analyzers & Improved Accuracy',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'Major Features',
        items: [
          {
            label: 'Security Analyzers',
            description:
              'Detect SQL injection, SSRF, and weak cryptography patterns.',
          },
          {
            label: 'Performance Analyzers',
            description: 'Identify N+1 query patterns and inefficient loops.',
          },
          {
            label: 'Complexity Analyzers',
            description:
              'Flag deeply nested loops and excessive method chaining.',
          },
          {
            label: 'False Positive Reduction',
            description:
              'Context-aware analysis with confidence scoring and rule whitelisting.',
          },
          {
            label: 'Test Coverage',
            description:
              '96.8% coverage across all analyzer modules with comprehensive edge case tests.',
          },
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: 'October 27, 2025',
    title: 'Production Ready — Auto-fix System',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'Major Features',
        items: [
          {
            label: 'Auto-fix System',
            description:
              '14 automatic fixers with atomic file writes, automatic backups, and rollback support.',
          },
          {
            label: 'Safety Levels',
            description:
              'Four risk tiers — safe, low, moderate, high — giving you control over what gets auto-applied.',
          },
          {
            label: 'Import Cleanup',
            description:
              'Automatically removes unused imports across the entire codebase.',
          },
          {
            label: 'Code Quality Fixers',
            description:
              'Extract magic numbers, add missing docstrings, simplify boolean expressions, and convert string formatting to f-strings.',
          },
        ],
      },
      {
        type: 'improvement',
        label: 'Quality',
        items: [
          {
            label: 'Test Coverage',
            description:
              '135 tests at 81% coverage — production-ready quality bar.',
          },
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: 'October 25, 2025',
    title: 'Initial Beta Release',
    tag: 'beta',
    sections: [
      {
        type: 'feat',
        label: 'Core Features',
        items: [
          {
            label: 'Plugin Architecture',
            description:
              'Extensible analyzer plugin system — add custom rules without touching core logic.',
          },
          {
            label: 'Risk Scoring',
            description:
              '0.0–1.0 risk scale for every refactoring suggestion so you can triage with confidence.',
          },
          {
            label: 'Analyzers',
            description:
              '8 built-in analyzers — Complexity, Code Smell, Security, Dependency, Dead Code, Type Hints, Extract Method, and Performance.',
          },
          {
            label: 'Refactorers',
            description:
              '6 refactoring operations — extract constants, reduce parameters, simplify conditionals, add docstrings, and extract methods.',
          },
          {
            label: 'YAML Config',
            description:
              'Per-project configuration via refactron.yaml — tune thresholds and enable/disable rules.',
          },
        ],
      },
      {
        type: 'improvement',
        label: 'Performance',
        items: [
          {
            label: 'Analysis Speed',
            description:
              '4,300 lines/second — fast enough for pre-commit hooks and CI pipelines.',
          },
          {
            label: 'CI/CD Ready',
            description:
              'Ships with pre-commit hook support and pipeline integration guides.',
          },
        ],
      },
    ],
  },
];

export default changelog;
