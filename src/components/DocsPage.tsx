import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layers,
  Rocket,
  Workflow,
  Cpu,
  ShieldCheck,
  PlugZap,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  Heart,
  MapPin,
  Settings,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';
import CookiePreferencesModal from './CookiePreferencesModal';
import { useCookieConsent, CookiePreferences } from '../hooks/useCookieConsent';
import DiscordIcon from '../icons/DiscordIcon';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
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
    title: 'Tutorials & Commands',
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
    title: 'Security & Compliance',
    icon: ShieldCheck,
    description:
      'How we secure your code, handle data residency, and comply with enterprise-grade standards.',
  },
  {
    id: 'product-metrics',
    title: 'Product Metrics & Roadmap',
    icon: Rocket,
    description:
      'Release cadence, current scorecard, and the Phase 3 roadmap that powers Refactron v1.0.0 and beyond.',
  },
  {
    id: 'contributing',
    title: 'Contributing & Community',
    icon: BookOpen,
    description:
      'Guides, quick starts, and community standards that help new contributors ship improvements in minutes.',
  },
];

const pythonApiSample = `from refactron import Refactron

ref = Refactron()
analysis = ref.analyze("src/")

print(f"Files: {analysis.summary['files_analyzed']}")
print(f"Total issues: {analysis.summary['total_issues']}")

critical = [i for i in analysis.issues if i.level.value == "CRITICAL"]
for issue in critical:
    print(f"❗ {issue.message} (line {issue.line_number})")

result = ref.refactor(
    "app.py",
    preview=True,
    types=["extract_constant", "add_docstring"]
)

for op in result.operations:
    print(f"{op.operation_type} (risk {op.risk_score:.2f})")`;

const cliSamples = {
  cli: `# Authenticate once
refactron login --token $REFACTRON_TOKEN

# Analyze an entire repository
refactron analyze ./services --format markdown --out reports/refactor.md

# Apply a recipe across microservices
docker compose run refactron apply --recipe eliminate-dead-code --dry-run
`,
};

const securityItems = [
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
];

const DocsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { preferences, savePreferences } = useCookieConsent();
  const [showCookieModal, setShowCookieModal] = React.useState(false);
  const [showMobileNav, setShowMobileNav] = React.useState(false);

  const handleSavePreferences = (newPreferences: CookiePreferences) => {
    savePreferences(newPreferences);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Refactron-ai',
      color: 'hover:text-gray-700',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/refactron',
      color: 'hover:text-blue-600',
    },
    {
      name: 'Discord',
      icon: DiscordIcon,
      url: 'https://discord.gg/zynEKJq8',
      color: 'hover:text-indigo-600',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:hello@refactron.dev',
      color: 'hover:text-primary-600',
    },
  ];

  React.useEffect(() => {
    if (showMobileNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileNav]);

  return (
    <div className="min-h-screen bg-white text-gray-700 flex flex-col">
      {showMobileNav && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setShowMobileNav(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white border-l border-gray-200 shadow-2xl flex flex-col">
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-base font-semibold text-teal-600">
                Navigate Docs
              </span>
              <button
                type="button"
                onClick={() => setShowMobileNav(false)}
                className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Sections
                  </span>
                  <ul className="space-y-2">
                    {sections.map(section => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl border border-teal-500/10 bg-white hover:border-teal-500/30 hover:text-teal-600 transition-all"
                        >
                          <section.icon className="w-4 h-4 text-teal-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {section.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Links
                  </span>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <a
                        href="https://www.refactron.dev/"
                        className="block px-3 py-2 rounded-xl border border-gray-100 hover:border-teal-200 hover:text-teal-600 transition-colors"
                        onClick={() => setShowMobileNav(false)}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/Refactron-ai/Refactron_lib"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 rounded-xl border border-gray-100 hover:border-teal-200 hover:text-teal-600 transition-colors"
                        onClick={() => setShowMobileNav(false)}
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setShowMobileNav(false);
                          setShowCookieModal(true);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl border border-gray-100 hover:border-teal-200 hover:text-teal-600 transition-colors"
                      >
                        Cookie Preferences
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-teal-600">
              Refactron Docs
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a
              href="https://www.refactron.dev/"
              className="hover:text-teal-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#quick-start"
              className="hover:text-teal-600 transition-colors"
            >
              Quick Start
            </a>
            <a
              href="#security"
              className="hover:text-teal-600 transition-colors"
            >
              Security
            </a>
            <a
              href="https://github.com/Refactron-ai/Refactron_lib"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={() => setShowCookieModal(true)}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" /> Cookie Preferences
            </button>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setShowMobileNav(true)}
              className="inline-flex items-center justify-center rounded-full border border-teal-500/30 bg-white px-3 py-2 text-teal-600 shadow-sm hover:border-teal-500/60 hover:text-teal-700 transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/60 via-white to-sky-100/60 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <header className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Build with Refactron in minutes, scale to enterprise-grade
              refactoring pipelines.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              This documentation hub guides you through installing the Refactron
              SDK, connecting the AI engine to your CI/CD, and orchestrating
              safe, large-scale refactoring programs. Explore annotated
              examples, best practices, and production-ready templates.
            </p>
          </header>

          <nav className="mt-10 mb-12 lg:hidden">
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 snap-x snap-mandatory">
              {sections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-teal-500/20 bg-white/90 text-sm text-gray-600 backdrop-blur-sm shadow-sm snap-start hover:border-teal-500/40 hover:text-teal-600 transition-all"
                >
                  <section.icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{section.title}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="mt-12 sm:mt-16 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-12">
            <nav className="hidden lg:block sticky top-24 h-fit bg-white/90 border border-gray-200 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <ul className="space-y-3 text-sm text-gray-600">
                {sections.map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-teal-500/20 hover:bg-teal-100/60 hover:text-teal-600"
                    >
                      <section.icon className="h-4 w-4" />
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-16 sm:space-y-20 lg:space-y-24">
              <section
                id="overview"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Overview
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Why Refactron
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Refactron is an intelligent refactoring transformer for
                    Python. It analyses codebases for security risks, code
                    smells, complexity, and maintainability, then surfaces
                    risk-scored fixes with before/after previews. The v1.0.0
                    release combines 135 automated tests, 84% coverage, and 100%
                    detection of intentional security flaws across 5,800+ real
                    lines of code.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {[
                      {
                        icon: Cpu,
                        title: 'Comprehensive Analysis',
                        copy: 'Security scanning, code smells, dependency hygiene, complexity metrics, and type-hint coverage in one pass.',
                      },
                      {
                        icon: Workflow,
                        title: 'Intelligent Refactoring',
                        copy: 'Extract constants, add docstrings, reduce parameters, simplify conditionals, and preview multi-step refactors safely.',
                      },
                      {
                        icon: ShieldCheck,
                        title: 'Enterprise Safety',
                        copy: 'Risk scoring (0.0–1.0), backups, dry-runs, guardrails, and a battle-tested workflow that reported zero production criticals.',
                      },
                    ].map(item => (
                      <div
                        key={item.title}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-5 shadow-md"
                      >
                        <item.icon className="h-5 w-5 text-teal-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.copy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="quick-start"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <Rocket className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Quick Start
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Install & Authenticate
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Install from PyPI, analyse your project in seconds, and
                    preview risk-scored refactorings before applying them.
                    Everything works offline—no external APIs or accounts
                    required.
                  </p>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 overflow-auto shadow-md">
                      <pre className="whitespace-pre-wrap leading-relaxed">{`# Install
pip install refactron

# Python API
from refactron import Refactron

ref = Refactron()
analysis = ref.analyze("src/")
print(analysis.report())

result = ref.refactor("app.py", preview=True)
result.show_diff()`}</pre>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 overflow-auto shadow-md">
                      <pre className="whitespace-pre-wrap leading-relaxed">{`# CLI quick start
refactron init                       # create .refactron.yaml
refactron analyze src/ --summary     # analyse entire project
refactron refactor app.py --preview  # preview suggested fixes
refactron report src/ --format json -o report.json`}</pre>
                    </div>
                  </div>
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-teal-700 mb-2">
                      Configuration Tips
                    </h3>
                    <p className="text-sm text-teal-700 leading-relaxed">
                      Tune analyzers and thresholds via{' '}
                      <code className="text-teal-600">.refactron.yaml</code>.
                      Defaults enable security, code smell, complexity, type
                      hint, dead code, and dependency analyzers with opinionated
                      limits (50 lines per function, ≤5 parameters, nesting
                      depth ≤3).
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="tutorials"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <GraduationCap className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Tutorials & Commands
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Learn by Following the Guided Tutorial
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    The Refactron library ships with a hands-on tutorial and
                    quick reference so you can go from installation to confident
                    refactoring in minutes. Follow the workflow, run the CLI
                    recipes, and adapt the Python snippets to automate your own
                    pipelines.
                  </p>
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Tutorial Milestones
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 leading-relaxed">
                        <li>
                          Analyze a sample file and review the generated
                          summary.
                        </li>
                        <li>
                          Inspect issues by category, severity, and remediation
                          hint.
                        </li>
                        <li>
                          Preview refactorings with risk scores and before/after
                          diffs.
                        </li>
                        <li>
                          Apply approved operations with automatic backups and
                          rollback utilities.
                        </li>
                        <li>
                          Customize analyzers and refactorers via{' '}
                          <code className="text-teal-600">.refactron.yaml</code>
                          .
                        </li>
                        <li>
                          Scale to multi-file analysis and export JSON for CI
                          pipelines.
                        </li>
                      </ol>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 overflow-auto shadow-md">
                      <h3 className="text-base font-medium text-gray-900 mb-3">
                        CLI Quick Reference
                      </h3>
                      <pre className="whitespace-pre-wrap leading-relaxed">{`# Initialize configuration
refactron init

# Analyze code with details
refactron analyze src/ --detailed

# Preview refactorings
refactron refactor app.py --preview

# Apply specific refactorers
refactron refactor app.py -t extract_constant -t add_docstring

# Export JSON report
refactron report src/ --format json -o report.json`}</pre>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 overflow-auto shadow-md">
                      <h3 className="text-base font-medium text-gray-900 mb-3">
                        Python API Workflow
                      </h3>
                      <pre className="whitespace-pre-wrap leading-relaxed">{`from refactron import Refactron
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
result.show_diff()`}</pre>
                    </div>
                  </div>
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-teal-700 mb-2">
                      Keep the Momentum
                    </h3>
                    <p className="text-sm text-teal-700 leading-relaxed">
                      Dive into the full tutorial, quick reference, and
                      architecture guides in the Refactron library repository
                      for advanced patterns, configuration tips, and real-world
                      demos.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="core-concepts"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <Layers className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Core Concepts
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Analysis, Refactoring, Reporting
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Comprehensive Analysis',
                        copy: 'Security scanning (eval/exec, injections, secrets), complexity checks, code smells, dependency hygiene, type hints, and dead-code detection run in a single pass.',
                      },
                      {
                        title: 'Intelligent Refactoring',
                        copy: 'Risk-scored operations such as extract constant, reduce parameters, add docstrings, simplify conditionals, and extract method with before/after previews.',
                      },
                      {
                        title: 'Rich Reporting',
                        copy: 'Text, JSON, and HTML reports quantify technical debt, provide issue breakdowns, and feed CI/CD pipelines with machine-readable insights.',
                      },
                    ].map(item => (
                      <div
                        key={item.title}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md"
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.copy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="api-reference"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <Code2 className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      API Reference
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Python SDK & Data Models
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    The Python package exposes a typed client with structured
                    `AnalysisResult`, `CodeIssue`, and `RefactoringOperation`
                    models. Each issue carries category, severity, rule ID, and
                    remediation hints, while refactoring operations include
                    before/after code, reasoning, and risk scores so you can
                    gate automated merges confidently.
                  </p>
                  <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 overflow-auto shadow-md">
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {pythonApiSample}
                    </pre>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
                      <Cpu className="h-4 w-4 text-teal-500 mt-1" />
                      <span>
                        <strong className="text-gray-900">
                          Language Support:
                        </strong>{' '}
                        Python, TypeScript/JavaScript, Java, Go, C# with
                        pluggable parsers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
                      <PlugZap className="h-4 w-4 text-teal-500 mt-1" />
                      <span>
                        <strong className="text-gray-900">
                          Hooks & Webhooks:
                        </strong>{' '}
                        Trigger workflows on pull request events, dry-run
                        completions, or metric thresholds.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
                      <Workflow className="h-4 w-4 text-teal-500 mt-1" />
                      <span>
                        <strong className="text-gray-900">Safeguards:</strong>{' '}
                        Configure regression tests, diff size limits, review
                        approvals, and rollout gates.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
                      <ShieldCheck className="h-4 w-4 text-teal-500 mt-1" />
                      <span>
                        <strong className="text-gray-900">Audit Trail:</strong>{' '}
                        Every refactoring run is signed, timestamped, and
                        exportable for compliance audits.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section
                id="cli-workflows"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <Workflow className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      CLI Workflows
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Automate at Scale
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    The CLI packages Refactron capabilities for scripting and
                    CI. Run audits nightly, orchestrate multi-service refactors,
                    and export detailed changelog reports for stakeholder
                    review.
                  </p>
                  <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 overflow-auto shadow-md">
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {cliSamples.cli}
                    </pre>
                  </div>
                </div>
              </section>

              <section
                id="security"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Security & Compliance
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Enterprise ready by default
                  </h2>
                  <ul className="space-y-4 text-sm text-gray-600">
                    {securityItems.map(item => (
                      <li
                        key={item.title}
                        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
                      >
                        <h3 className="text-base font-medium text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="leading-relaxed">{item.copy}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                    <p className="text-sm text-teal-700">
                      Need deeper documentation? Contact{' '}
                      <a
                        href="mailto:security@refactron.dev"
                        className="font-medium text-teal-600 hover:text-teal-500"
                      >
                        security@refactron.dev
                      </a>{' '}
                      for enterprise whitepapers, DPA details, and on-prem
                      deployment options.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="product-metrics"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <Rocket className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Product Metrics & Roadmap
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Refactron v1.0.0 at a Glance
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    The 1.0.0 stable release ships comprehensive automation with
                    zero-cost analyzers and a Phase 3 plan focused on rule-based
                    auto-fix, pattern detection, multi-file refactoring, and a
                    custom rule engine. The roadmap keeps optional AI plugins as
                    a BYO-key enhancement so the core experience remains fast,
                    private, and free to run.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Quality Scorecard',
                        value: '135 tests · 84% coverage · 0 prod criticals',
                        copy: 'Real-world dogfooding across 5,800+ lines demonstrated 100% detection of intentional security flaws and 94% lint issue reduction.',
                      },
                      {
                        title: 'Performance Benchmarks',
                        value: '≈4,300 LOC/sec',
                        copy: 'Small file analysis <0.2s, medium ≈0.2s, large (2000 LOC) ≈1.8s on commodity hardware—ideal for CI and pre-commit.',
                      },
                      {
                        title: 'Roadmap Highlights',
                        value: 'Phase 3 → Phase 4',
                        copy: 'Next up: rule-based auto-fix, pattern library, multi-file refactors, YAML rule engine, then IDE plugins, CI native integration, and team collaboration tooling.',
                      },
                    ].map(item => (
                      <div
                        key={item.title}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md"
                      >
                        <h3 className="text-base font-medium text-teal-600 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xl font-semibold text-gray-900 mb-2">
                          {item.value}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.copy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="contributing"
                className="bg-white/95 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-600">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-600/80">
                      Contributing & Community
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Ship Improvements in Minutes
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Refactron welcomes community contributions. The five-minute
                    quick start installs dependencies, pre-commit hooks, and the
                    full test suite so pull requests ship with 95%+ coverage
                    expectations. Use the quick reference to format with
                    Black/isort, lint with flake8, and type-check with mypy
                    before opening a PR.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Essential Docs
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li>
                          <a
                            className="text-teal-600 hover:text-teal-500"
                            href="https://github.com/Refactron-ai/Refactron_lib/blob/main/CONTRIBUTING_QUICKSTART.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Quick Start Guide – 5 minute onboarding
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-teal-600 hover:text-teal-500"
                            href="https://github.com/Refactron-ai/Refactron_lib/blob/main/CONTRIBUTING.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Full Contributing Guide – coding standards & PR
                            checklist
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-teal-600 hover:text-teal-500"
                            href="https://github.com/Refactron-ai/Refactron_lib/blob/main/GETTING_STARTED_DEV.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Developer Setup – environment, CLI demos, debugging
                            tips
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-teal-600 hover:text-teal-500"
                            href="https://github.com/Refactron-ai/Refactron_lib/blob/main/CODE_OF_CONDUCT.md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Code of Conduct – inclusive community guidelines
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        How to Get Involved
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li>
                          Start with issues labelled{' '}
                          <span className="text-teal-600">
                            good first issue
                          </span>{' '}
                          or <span className="text-teal-600">help wanted</span>.
                        </li>
                        <li>
                          Run <code className="text-teal-600">pytest</code>,{' '}
                          <code className="text-teal-600">black</code>,{' '}
                          <code className="text-teal-600">flake8</code>, and{' '}
                          <code className="text-teal-600">mypy</code> before
                          opening a PR.
                        </li>
                        <li>
                          Share feedback via GitHub Discussions or email{' '}
                          <a
                            className="text-teal-600 hover:text-teal-500"
                            href="mailto:hello@refactron.dev"
                          >
                            hello@refactron.dev
                          </a>
                          .
                        </li>
                        <li>
                          Review the Phase 3 plan to align contributions with
                          auto-fix, pattern detection, and multi-file
                          refactoring initiatives.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative bg-white border-t border-gray-200">
        <div className="absolute inset-0">
          <div className="hidden sm:block absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
          <div
            className="hidden sm:block absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative z-10 py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-6">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  <span className="gradient-text">Refactron™</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 max-w-sm">
                  Refactor. Optimize. Automate. Building the future of developer
                  productivity with AI-powered code optimization.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-xs sm:text-sm">
                  <span>Made with</span>
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" />
                  <span>for developers</span>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                  Connect With Us
                </h4>
                <div className="flex justify-center sm:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:scale-110 ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.a>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                  Follow us for updates and insights
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                  Get In Touch
                </h4>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-w-sm">
                  <a
                    href="mailto:hello@refactron.dev"
                    className="block text-primary-600 hover:text-primary-700 transition-colors duration-300 text-sm sm:text-base font-medium break-all"
                  >
                    hello@refactron.dev
                  </a>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Ready to revolutionize your code?
                  </p>
                  <p className="text-xs text-gray-500">
                    We're here to help you optimize your development workflow.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                  Our Location
                </h4>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-w-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0" />
                    <div className="text-center sm:text-left">
                      <p className="text-gray-600 font-medium text-sm sm:text-base">
                        Bengaluru, India
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Asia Pacific
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Global team, local impact
                  </p>
                  <p className="text-xs text-gray-500">
                    Serving developers worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    © {currentYear} Refactron™. All rights reserved.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-500">
                  <a
                    href="/privacy-policy"
                    className="hover:text-primary-600 transition-colors duration-300"
                  >
                    Privacy Policy
                  </a>
                  <span className="hidden sm:inline">•</span>
                  <a
                    href="/terms-of-service"
                    className="hover:text-primary-600 transition-colors duration-300"
                  >
                    Terms of Service
                  </a>
                  <span className="hidden sm:inline">•</span>
                  <button
                    onClick={() => setShowCookieModal(true)}
                    className="hover:text-primary-600 transition-colors duration-300 flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Cookie Settings
                  </button>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-center sm:text-left">
                    Refactron™ is currently in development
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs text-gray-400">
                  Join our early access program to be notified when we launch.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      </footer>

      <CookiePreferencesModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
        onSave={handleSavePreferences}
        currentPreferences={preferences}
      />
    </div>
  );
};

export default DocsPage;
