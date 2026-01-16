export type IndustryChallenge = {
  sector: string;
  headline: string;
  description: string;

  refactronHelps: string[];
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
    headline: 'Technical debt slows change',
    description:
      'Long-running codebases accumulate complexity, duplication, and undocumented behavior. This makes even small changes risky and discourages refactoring.',
    refactronHelps: [
      'Surfaces maintainability and risk hotspots',
      'Proposes incremental, behavior-preserving refactors',
      'Makes structural improvements safer to review and apply',
    ],
  },
  {
    sector: 'Security & Dependency Risk',
    headline: 'Outdated libraries increase exposure',
    description:
      'Legacy systems often rely on unmaintained dependencies with known vulnerabilities, making upgrades risky and easy to postpone.',
    refactronHelps: [
      'Identifies outdated and risky dependencies',
      'Highlights upgrade paths and potential impact',
      'Makes dependency work visible earlier in the lifecycle',
    ],
  },
  {
    sector: 'Developer Onboarding',
    headline: 'Knowledge gaps reduce productivity',
    description:
      'Without clear documentation or tests, new engineers must reverse-engineer systems, slowing delivery and increasing mistakes.',
    refactronHelps: [
      'Generates documentation tied directly to code structure',
      'Produces analysis reports that explain system layout',
      'Reduces time spent understanding unfamiliar codebases',
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'legacy-code-ai-refactoring',
    customer: 'Improving Maintainability in a Legacy Codebase',
    industry: 'Enterprise Software',
    summary:
      'Automated refactoring and documentation to modernize legacy codebases, reducing technical debt and regression risks.',
    highlight:
      'Reduced manual refactoring effort and improved code readability through incremental, safe changes.',
    overview:
      'Legacy codebases accumulate complexity over time, making refactoring risky and expensive. Teams often avoid structural improvements due to fear of regressions, missing documentation, and limited test coverage.',
    painPoints: [
      'Poor maintainability from long, duplicated, and tightly coupled code',
      'Missing or outdated documentation',
      'Outdated and fragile dependencies',
      'High regression risk due to limited test coverage',
      'Slow onboarding of new developers',
    ],
    refactronApproach: [
      'Analyzed the codebase in read-only mode to identify maintainability issues and refactoring opportunities',
      'Proposed incremental, behavior-preserving refactors with preview diffs',
      'Generated documentation to encode intent',
      'Surfaced dependency and security risks',
      'Ensured all changes were reviewable, verifiable, and reversible',
    ],
    outcomes: [
      'Reduced manual refactoring effort by automating analysis and suggestions',
      'Improved code readability and structure through incremental refactors',
      'Generated documentation that accelerated understanding of the system',
      'Identified outdated dependencies and potential security risks early',
      'Reduced fear of regressions through preview diffs and risk signals',
      'Faster onboarding due to clearer structure and documentation',
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
      'Manual refactoring required weeks of careful review',
      'Limited documentation forced reverse-engineering',
      'Dependency upgrades were risky and time-consuming',
      'Teams avoided refactoring due to regression concerns',
      'Onboarding new developers was slow and error-prone',
    ],
    after: [
      'Automated analysis highlighted refactoring opportunities quickly',
      'Refactors were incremental, reviewable, and safer to apply',
      'Documentation captured intent directly from code',
      'Dependency risks were visible early',
      'Teams could improve code confidently instead of deferring changes',
    ],
    quote: {
      text: 'Refactron shifts refactoring from ad-hoc manual effort to a structured, safety-first process—making code evolution predictable and easier to trust.',
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
