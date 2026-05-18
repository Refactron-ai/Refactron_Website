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
  tag?: 'new' | 'improvement' | 'fix' | 'beta' | 'pivot';
  sections: ChangelogSection[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '0.2.2',
    date: 'May 18, 2026',
    title: 'Boxed Output, Rollback & a Faster Docs Engine',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'Major Features',
        items: [
          {
            label: 'rollback',
            description:
              'Undo an applied refactor or documentation run — a journalled, drift-safe LIFO undo with --all, --force, and --dry-run.',
          },
          {
            label: 'Boxed output',
            description:
              'analyze and run --dry-run render bordered tables — one box per file, plus transform and summary blocks.',
          },
          {
            label: 'run --apply live progress',
            description:
              'Gate-by-gate status, with a per-file verify/apply fallback when a batch fails.',
          },
          {
            label: 'Reports on disk',
            description:
              'analyze and run --dry-run write the full report to .refactron/reports/ so long output survives terminal scrollback.',
          },
          {
            label: 'Richer document',
            description:
              'document now also writes inline comments, a per-run modernization report, and runs a post-apply syntax re-check.',
          },
        ],
      },
      {
        type: 'improvement',
        label: 'Improvements',
        items: [
          {
            label: 'Faster document',
            description:
              'Docstring requests are batched with bounded concurrency and token-aware pacing — call count scales with source size, not symbol count.',
          },
        ],
      },
      {
        type: 'fix',
        label: 'Bug Fixes',
        collapsible: true,
        items: [
          {
            label: 'Large-file docs',
            description:
              'document no longer drops every docstring on big files — batches are capped by response size and truncated replies are salvaged.',
          },
          {
            label: 'Transform safety',
            description:
              'deprecated_api_requests_to_httpx refuses files using non-drop-in requests API instead of emitting runtime-broken code.',
          },
          {
            label: 'analyze accuracy',
            description:
              'Old-string-format findings anchor on the operator; manual_typecheck_to_hints no longer flags already-annotated parameters.',
          },
          {
            label: 'Cross-platform',
            description:
              'Report and CHANGELOG paths are normalized to forward slashes on Windows.',
          },
        ],
      },
    ],
  },
  {
    version: '0.2.1',
    date: 'May 16, 2026',
    title: 'Large-File Fix & Transform Coverage',
    tag: 'fix',
    sections: [
      {
        type: 'fix',
        label: 'Bug Fixes',
        items: [
          {
            label: 'Large files',
            description:
              'analyze no longer crashes on files over ~32 KB — parsing uses tree-sitter streaming input, and a single unparseable file is skipped instead of aborting the run.',
          },
          {
            label: 'var_to_const_let',
            description:
              'Reference resolution is now scope-correct, so same-named vars in different functions no longer drop the whole file.',
          },
        ],
      },
      {
        type: 'improvement',
        label: 'Improvements',
        items: [
          {
            label: 'format_to_fstring',
            description:
              'Converts the full printf grammar — %d, %.2f, %x, %o, %e, %g, and width/precision specifiers, not just plain %s.',
          },
        ],
      },
    ],
  },
  {
    version: '0.2.0',
    date: 'May 15, 2026',
    title: 'Refactron v2.0 — The Deterministic Rebuild',
    tag: 'pivot',
    sections: [
      {
        type: 'feat',
        label: 'A Ground-Up Rebuild',
        items: [
          {
            label: 'Deterministic engine',
            description:
              'Refactron 2.0 is rebuilt as a 100% deterministic AST engine — no LLM touches your code. It supersedes the original Python-implemented 1.x line.',
          },
          {
            label: 'Versioning reset',
            description:
              'The rebuild restarts versioning at 0.2.0. Entries from 1.0.15 and below belong to the legacy Python tool.',
          },
        ],
      },
      {
        type: 'feat',
        label: 'Major Features',
        items: [
          {
            label: '10 AST transforms',
            description:
              'Five Python (via LibCST) and five TypeScript (via ts-morph), each with cross-file precondition checks.',
          },
          {
            label: '3-gate verification',
            description:
              'Syntax, imports, and your full test suite must pass on a shadow tree before any byte is written — atomic batch write, or nothing.',
          },
          {
            label: 'Documentation engine',
            description:
              'The only LLM-touching step, running solely on already-verified diffs. Five providers: Ollama, Groq, OpenAI, Anthropic, and the managed backend.',
          },
          {
            label: 'Configuration & auth',
            description:
              '.refactronrc.json via cosmiconfig with schema validation, plus OAuth device-flow login and REFACTRON_TOKEN support.',
          },
        ],
      },
    ],
  },
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
