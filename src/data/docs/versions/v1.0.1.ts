import { VersionContent } from '../types';

/**
 * v1.0.1 Documentation Content
 */
export const v1_0_1: VersionContent = {
  version: 'v1.0.1',

  whatsNew: {
    overview:
      'Refactron v1.0.1 is a stable release focused on deeper analysis, performance insights, and fewer false positives. It keeps the same CLI surface as v1.0.0 while expanding analyzers, improving test coverage, and adding contributor tooling.',

    sections: {
      performanceAnalyzer: {
        title: 'New Performance Analyzer',
        items: [
          {
            code: 'P001',
            description: 'Detects N+1 query patterns (DB queries inside loops)',
          },
          {
            code: 'P002–P003',
            description:
              'Flags inefficient and deeply nested list comprehensions',
          },
          {
            code: 'P004',
            description:
              'Finds multiple passes over the same iterable in a function',
          },
          {
            code: 'P005',
            description: 'Warns on += string concatenation in loops',
          },
          {
            code: 'P006',
            description: 'Detects redundant list(...) wrappers',
          },
        ],
      },

      analyzerEnhancements: {
        complexity: [
          {
            code: 'C003',
            description: 'Deeply nested loops',
          },
          {
            code: 'C004',
            description: 'Long/complex method call chains',
          },
        ],
        security: {
          description: 'New rules SEC009–SEC013:',
          items: [
            'SQL parameterization issues',
            'SSRF-like URL usage',
            'Insecure random usage',
            'Weak SSL/TLS configuration',
          ],
        },
      },

      falsePositiveReduction: [
        'New FalsePositiveTracker for learning known false positives',
        'Per-issue confidence scores on CodeIssue',
        'Context-aware confidence (test/example files down-weighted)',
        'Configurable security_ignore_patterns and rule whitelists',
      ],

      documentation: {
        files: [
          'QUICK_REFERENCE.md',
          'TUTORIAL.md',
          'FALSE_POSITIVE_REDUCTION.md',
        ],
        additionalInfo:
          'Plus new performance benchmarks, SECURITY policy, pre-commit config, and GitHub workflows for CI, CodeQL, and coverage.',
      },

      quality: {
        coverage: '~96.8% coverage',
        testSuites: [
          'Analyzer edge cases and enhancements',
          'False-positive reduction behavior',
          'Real-world pattern detection',
        ],
      },
    },
  },

  cliWorkflows: {
    description:
      'CLI commands are unchanged from v1.0.0 (only the version string bumped to v1.0.1):',
    commands: [
      {
        command: 'refactron analyze',
        description: 'Analyze issues (supports --detailed/--summary, --config)',
      },
      {
        command: 'refactron refactor',
        description:
          'Generate refactorings (supports --preview/--apply, -t/--types)',
      },
      {
        command: 'refactron report',
        description: 'Generate text/JSON/HTML reports (--format, --output)',
      },
      {
        command: 'refactron autofix',
        description: 'Run auto-fix engine (--preview/--apply, --safety-level)',
      },
      {
        command: 'refactron init',
        description:
          'Create .refactron.yaml with new security/performance settings',
      },
    ],
  },
};
