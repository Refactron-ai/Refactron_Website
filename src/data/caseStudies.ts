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
};

export const industryChallenges: IndustryChallenge[] = [
  {
    sector: 'FinTech Platforms',
    headline: 'Legacy monoliths slow shipping by 40%',
    description:
      'Payment processors run 15+ year-old Python services with tangled dependencies, manual reviews, and recurring security alerts.',
    issues: [
      'Critical paths blocked by copy-pasted business logic',
      'Manual code reviews for every compliance release',
      'Inconsistent linting leads to high defect rates',
    ],
    impact: 'Refactron unlocked parallel review pipelines and reduced release prep from 3 weeks to 5 days.',
  },
  {
    sector: 'AI/ML Startups',
    headline: 'Experimentation velocity capped by tech debt',
    description:
      'Model teams juggle research notebooks, prototype APIs, and production jobs. Spaghetti utilities derail onboarding.',
    issues: [
      'Duplicate feature engineering pipelines across repos',
      'Runtime regressions after each refactor',
      'Security teams flag unchecked third-party snippets',
    ],
    impact: 'Teams replaced ad-hoc scripts with standardized modules, improving MTTR by 32%.',
  },
  {
    sector: 'Enterprise SaaS',
    headline: 'Multi-tenant scale demands structural consistency',
    description:
      'Global SaaS vendors must keep thousands of customer-specific forks aligned while meeting SOC2 and ISO requirements.',
    issues: [
      'Diverging code paths per tenant require manual merges',
      'High-risk sections lack documentation or tests',
      'Regression suites take hours, blocking engineers',
    ],
    impact: 'Refactron automated dependency clean-up and generated targeted test plans, cutting incidents by half.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'vectorpay-modernization',
    customer: 'VectorPay™',
    industry: 'FinTech Infrastructure',
    summary: 'Digital payments leader migrating a 1.2M LOC Python codebase to modular services.',
    highlight: 'Consolidated 14 redundant payment processors down to 4 hardened flows.',
    overview:
      'VectorPay operates across 42 countries with strict PCI and SOC2 requirements. Years of compliance-driven forks created duplicated payment processors and fragile release windows. Refactron partnered with the architecture council to chart a safe modernization program.',
    painPoints: [
      '27% of incidents traced to duplicated payment processors',
      'Compliance changes required three parallel audit checklists',
      'Developers spent ~8 hours/week triaging dead code and unused modules',
    ],
    refactronApproach: [
      'Ran Refactron Library against 1.2M LOC to map structural clones and unused modules',
      'Generated change plans that grouped related processors with identical exception handling',
      'Delivered guardrail tests + diff-aware documentation for every compliance rule touched',
    ],
    outcomes: [
      'Release prep time dropped from 3 weeks to 5 business days',
      'Critical payment paths now share typed service contracts',
      'Security review backlog cleared with automated documentation bundles',
    ],
    metrics: [
      { label: 'Cycle time improvement', value: '38%' },
      { label: 'Dead code removed', value: '62K LOC', context: 'across payment modules' },
      { label: 'Regression defects', value: '-45%' },
    ],
    before: [
      '27% of incidents traced to duplicated payment processors',
      'Compliance changes required 3 parallel audit checklists',
      'Developers spent ~8 hours/week triaging dead code',
    ],
    after: [
      'Automated refactors consolidated 14 processors into 4 battle-tested flows',
      'Generated diff-aware documentation for every compliance change',
      'Static analysis from Refactron flagged unused modules before deployment',
    ],
    quote: {
      text: 'Refactron gave us the map we needed. The automation respected our controls while accelerating everything.',
      author: 'Priya Kapoor',
      role: 'VP Engineering, VectorPay',
    },
  },
  {
    slug: 'orbitai-platform',
    customer: 'OrbitAI Research',
    industry: 'AI/ML Platforms',
    summary: 'Series A AI startup scaling from research notebooks to reliable APIs.',
    highlight: 'Stabilized experimentation workflows and cut MTTR by 45%.',
    overview:
      'OrbitAI needed to ship APIs to enterprise customers without slowing the pace of research. Legacy notebooks, duplicated ETL jobs, and ad-hoc deployments made every release a fire drill. Refactron codified patterns so researchers and platform teams could collaborate.',
    painPoints: [
      'Model variants lived in notebooks with zero typing or linting',
      'Production deploys required hand-crafted patch files',
      'Team re-implemented feature engineering every sprint',
    ],
    refactronApproach: [
      'Introduced typed service boundaries with auto-generated docstrings and guards',
      'Created shared transformation modules and verified them via Refactron diffs',
      'Automated release checklists so staging deploys mirrored production',
    ],
    outcomes: [
      'Onboarding time for new researchers dropped from 4 weeks to 10 days',
      'Unified ETL modules cut duplicated data prep by 60%',
      'Alerts now tie directly to Refactron suggestions, reducing MTTR by 45%',
    ],
    metrics: [
      { label: 'Mean time to recovery', value: '-45%' },
      { label: 'Duplicated ETL removed', value: '60%' },
      { label: 'Onboarding speed', value: '4w → 10d' },
    ],
    before: [
      'Model variants lived in notebooks with zero typing or linting',
      'Production deploys required hand-crafted patch files',
      'Team re-implemented feature engineering every sprint',
    ],
    after: [
      'Refactron enforced type-safe service layers with automated docstrings',
      'New API scaffolding reused shared components and validation blocks',
      'Generated migration plans trimmed duplicated ETL code by 60%',
    ],
    quote: {
      text: 'The team finally has a single source of truth for patterns. We experiment faster and sleep better.',
      author: 'Lena Duarte',
      role: 'CTO, OrbitAI',
    },
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find(caseStudy => caseStudy.slug === slug);

