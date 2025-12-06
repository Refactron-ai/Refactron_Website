export type IndustryChallenge = {
  sector: string;
  headline: string;
  description: string;
  issues: string[];
  impact: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  context?: string;
};

export type CaseStudyReference = {
  title: string;
  url: string;
  source: string;
};

export type CaseStudy = {
  slug: string;
  customer: string;
  industry: string;
  summary: string;
  highlight: string;
  overview: string;
  painPoints: string[];
  refactronApproach: string[];
  outcomes: string[];
  metrics: CaseStudyMetric[];
  before: string[];
  after: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  references?: CaseStudyReference[];
};

export const industryChallenges: IndustryChallenge[] = [
  {
    sector: 'Legacy Systems',
    headline: 'Technical debt impedes innovation',
    description:
      'Legacy codebases accumulate complexity with poor maintainability, missing documentation, and security vulnerabilities making changes risky.',
    issues: [
      'Spaghetti code from decades of patches',
      'Missing documentation forces reverse-engineering',
      'Tangled dependencies from obsolete libraries',
    ],
    impact:
      'Automated code modernization reduces refactoring time by 80% while eliminating regression risks.',
  },
  {
    sector: 'Security & Compliance',
    headline: 'Outdated libraries create vulnerabilities',
    description:
      'Legacy systems use unmaintained frameworks with known security flaws, creating risks that remain undetected until production.',
    issues: [
      'Outdated components with known vulnerabilities',
      'Hidden issues including SQL injections and XSS',
      'No automated security scanning in workflows',
    ],
    impact:
      'Automated dependency analysis and security scanning identify vulnerabilities before deployment.',
  },
  {
    sector: 'Developer Onboarding',
    headline: 'Knowledge gaps slow productivity',
    description:
      'Without clear documentation or tests, new developers navigate arcane code and outdated patterns, slowing feature delivery.',
    issues: [
      'Insufficient documentation hinders understanding',
      'Missing automated tests make regression detection difficult',
      'Institutional knowledge vanishes as teams change',
    ],
    impact:
      'AI-generated documentation and analysis reports cut onboarding time in half.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'legacy-code-ai-refactoring',
    customer: 'Transforming Legacy Code Challenges',
    industry: 'Enterprise Software',
    summary:
      'AI-powered refactoring platform addressing legacy codebases plagued by technical debt, missing documentation, and security vulnerabilities.',
    highlight:
      'Automated code modernization reducing refactoring time by 80% while eliminating regression risks.',
    overview:
      'Legacy codebases pose a well-known challenge: they accrue complexity and risk over time. Without regular maintenance, technical debt builds up and can gradually impede innovation, slow development cycles, and jeopardize system stability. Common symptoms include poor maintainability with spaghetti code, missing or outdated documentation, tangled dependency hell from obsolete libraries, security vulnerabilities, and lack of automated tests. These factors make any change risky—even small changes can lead to unintended consequences because the absence of safety nets makes teams hesitant to modify code. Refactron is an AI-driven refactoring tool designed to address these legacy code pain points by automating analysis and improvements, turning weeks of manual effort into hours of automated guidance.',
    painPoints: [
      'Maintainability issues: Decades of patches and quick fixes accumulate technical debt, eroding design and making code hard to understand or extend. Functions tend to be long, duplicated, or poorly structured, so adding features becomes fragile and time-consuming',
      'Lack of documentation: Legacy projects often suffer from no or outdated docs, making it difficult to understand system architecture, functionality, and dependencies. New developers must reverse-engineer code, and institutional knowledge vanishes as teams change',
      'Dependency hell: Over time, legacy codebases depend on old, incompatible libraries. Upgrading one library often forces a chain of upgrades with potential breakages. Such upgrade cascades are laborious and risky',
      'Outdated libraries & security risk: Legacy systems frequently use frameworks or packages that are no longer maintained or patched. These outdated components often harbor known security flaws, creating vulnerabilities that can contain tens of thousands of hidden issues',
      'Regression risk: Legacy projects rarely have good test coverage. Missing unit or integration tests means any change risks breaking existing behavior. This uncertainty forces teams to avoid refactoring, leaving bugs and inefficiencies unaddressed',
      'Onboarding difficulties: All factors converge to make onboarding new developers painful. Without clear docs or tests, newcomers must wade through arcane code and outdated patterns, slowing feature delivery and increasing bug risk',
    ],
    refactronApproach: [
      'Automated refactoring: Intelligently restructures and cleans code to improve readability and maintainability without altering external behavior. Finds duplicated logic, suggests extracting shared functions, and breaks up oversized methods, reducing complexity automatically',
      'Code quality analysis: Spots unused variables, dead code, poor naming, and deviations from best practices with static analysis. Flags hot spots like deeply nested loops or overly complex branches, with side-by-side preview for visual comparison',
      'Documentation generation: Auto-generates missing docstrings and comments based on function logic. In preview mode, filters by add_docstring to insert function descriptions, automatically encoding intent back into code and mitigating knowledge gaps',
      'Dependency & security analysis: Includes dependency analysis to untangle complex library graphs. Flags outdated or vulnerable libraries and suggests safer versions to update. Integrates security scanners to uncover known vulnerabilities before deployment',
      'Safe refactoring with regression prevention: Every transformation is non-destructive and verifiable. Provides preview diffs, risk scoring of changes, and rollback capabilities. Shows diffs alongside unit test results and risk scores before committing',
      'Continuous integration: Integrates into CI/CD pipelines to continuously enforce code quality standards. Shifts developer role to reviewing and approving automated suggestions instead of making each low-level edit',
    ],
    outcomes: [
      'Refactoring time reduced by 80% compared to manual efforts, with what takes weeks manually done in hours',
      'Automated documentation generation eliminates knowledge gaps for new developers and accelerates onboarding',
      'Security vulnerabilities identified and fixed before deployment, preventing production incidents',
      'Dependency upgrades automated with safe migration paths, eliminating risky upgrade cascades',
      'Regression risk eliminated through preview diffs and risk scoring, allowing confident refactoring',
      'Onboarding time cut in half with comprehensive code documentation and analysis reports',
    ],
    metrics: [
      { label: 'Refactoring time', value: '-80%' },
      {
        label: 'Issues detected',
        value: '78 per analysis',
        context: 'Critical: 5, Warnings: 20, Info: 53',
      },
      { label: 'Onboarding speed', value: '2x faster' },
    ],
    before: [
      'Manual refactoring required painstaking code reviews and weeks of effort, with teams fearing breaking features due to insufficient test suites',
      'Missing documentation forced reverse-engineering of legacy systems, with institutional knowledge vanishing as teams changed',
      'Dependency upgrades required careful impact analysis of entire dependency trees, making upgrades laborious and risky',
      'Security vulnerabilities remained hidden until discovered in production, with tens of thousands of hidden issues undetected',
      'Any code change risked breaking existing behavior due to lack of test coverage, forcing teams to avoid refactoring',
      'New developers struggled with steep onboarding curves, wading through arcane code without clear documentation or tests',
    ],
    after: [
      'Automated refactoring scans entire repos and proposes dozens of fixes in one pass, with developers reviewing and approving suggestions',
      'AI-generated documentation automatically encodes intent back into code, providing comprehensive analysis reports for quick health overviews',
      'Dependency analysis immediately lists outdated libraries with safer alternatives, automating the tedious inventory process',
      'Security scanners uncover known vulnerabilities before deployment, preventing production incidents and security risks',
      'Preview diffs and risk scoring eliminate regression fears, showing changes alongside test results before committing',
      'Comprehensive documentation and analysis reports accelerate team onboarding, cutting time in half',
    ],
    quote: {
      text: 'Refactron shifts legacy modernization from ad-hoc manual fixes to continuous automated guidance. It provides concrete, actionable recommendations in seconds, whereas manual refactoring would require painstaking code reviews. What takes weeks manually can be done in hours.',
      author: 'Engineering Team',
      role: 'Enterprise Development',
    },
    references: [
      {
        title: 'Reversing tech debt through legacy application modernization',
        url: 'https://lumenalta.com/insights/legacy-application-modernization',
        source: 'Lumenalta',
      },
      {
        title: 'Facing The Unknown: A Guide To Testing Legacy Systems',
        url: 'https://medium.com/qualitynexus/facing-the-unknown-a-guide-to-testing-legacy-systems-63a27e66c279',
        source: 'Medium',
      },
      {
        title: 'How to Refactor Your Legacy Codebase',
        url: 'https://blog.codacy.com/refactoring-legacy-code',
        source: 'Codacy',
      },
      {
        title: 'Refactron',
        url: 'https://github.com/refactron-ai',
        source: 'GitHub',
      },
      {
        title:
          'Refactron_lib: The Intelligent Code Refactoring Transformer for Python',
        url: 'https://github.com/Refactron-ai/Refactron_lib',
        source: 'GitHub',
      },
      {
        title: 'AI Code Refactoring: Boost Your Code Quality Fast',
        url: 'https://www.docuwriter.ai/posts/ai-code-refactoring',
        source: 'DocuWriter.ai',
      },
    ],
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find(caseStudy => caseStudy.slug === slug);
