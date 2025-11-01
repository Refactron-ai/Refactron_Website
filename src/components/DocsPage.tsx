import React from 'react';
import { Code2, Layers, Rocket, Workflow, Cpu, ShieldCheck, PlugZap, BookOpen } from 'lucide-react';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: BookOpen,
    description:
      'Refactron Docs helps you understand how to integrate the Refactron AI refactoring engine into your workflow. Start here to explore capabilities, architecture, and integration patterns.'
  },
  {
    id: 'quick-start',
    title: 'Quick Start',
    icon: Rocket,
    description:
      'Install the Refactron library, authenticate, and run your first refactoring pipeline in under five minutes.'
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    icon: Layers,
    description:
      'Learn about projects, snapshots, analyzers, refactoring recipes, and safeguards that keep your codebase healthy.'
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Code2,
    description:
      'Comprehensive TypeScript-first API surface with typed responses, error handling, and usage examples.'
  },
  {
    id: 'cli-workflows',
    title: 'CLI Workflows',
    icon: Workflow,
    description:
      'Automate large-scale refactors with the Refactron CLI: audit debt, apply recipes, and generate reports.'
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    icon: ShieldCheck,
    description:
      'How we secure your code, handle data residency, and comply with enterprise-grade standards.'
  },
  {
    id: 'product-metrics',
    title: 'Product Metrics & Roadmap',
    icon: Rocket,
    description:
      'Release cadence, current scorecard, and the Phase 3 roadmap that powers Refactron v1.0.0 and beyond.'
  },
  {
    id: 'contributing',
    title: 'Contributing & Community',
    icon: BookOpen,
    description:
      'Guides, quick starts, and community standards that help new contributors ship improvements in minutes.'
  }
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
`
};

const securityItems = [
  {
    title: 'Zero data retention by default',
    copy: 'Self-host connectors keep code within your VPC. Cloud runs are transient with encrypted storage.'
  },
  {
    title: 'SOC 2 in motion',
    copy: 'SOC 2 Type II audit underway. GDPR compliant, with data residency in the US and EU.'
  },
  {
    title: 'Secrets hygiene',
    copy: 'API keys are scoped by environment. Rotate via CLI.'
  },
  {
    title: 'Audit exports',
    copy: 'Stream run metadata to SIEM tools via webhooks, Azure Event Hub, or Amazon Kinesis.'
  }
];

const DocsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-indigo-500/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <header className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-300/90 bg-teal-500/10 border border-teal-400/20 px-3 py-1 rounded-full mb-6">
              <PlugZap className="h-3.5 w-3.5" />
              docs.refactron.dev
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50 mb-6">
              Build with Refactron in minutes, scale to enterprise-grade refactoring pipelines.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              This documentation hub guides you through installing the Refactron SDK, connecting the AI engine to your CI/CD, and orchestrating safe, large-scale refactoring programs. Explore annotated examples, best practices, and production-ready templates.
            </p>
          </header>

          <div className="mt-16 grid lg:grid-cols-[280px_1fr] gap-12">
            <nav className="hidden lg:block sticky top-24 h-fit bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur">
              <ul className="space-y-3 text-sm text-slate-300">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-teal-400/20 hover:bg-teal-400/10 hover:text-teal-200"
                    >
                      <section.icon className="h-4 w-4" />
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <main className="space-y-24">
              <section id="overview" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">Overview</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Why Refactron</h2>
                  <p className="text-slate-300 leading-relaxed">
                    Refactron is an intelligent refactoring transformer for Python. It analyses codebases for security risks, code smells, complexity, and maintainability, then surfaces risk-scored fixes with before/after previews. The v1.0.0 release combines 135 automated tests, 84% coverage, and 100% detection of intentional security flaws across 5,800+ real lines of code.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {[
                      {
                        icon: Cpu,
                        title: 'Comprehensive Analysis',
                        copy: 'Security scanning, code smells, dependency hygiene, complexity metrics, and type-hint coverage in one pass.'
                      },
                      {
                        icon: Workflow,
                        title: 'Intelligent Refactoring',
                        copy: 'Extract constants, add docstrings, reduce parameters, simplify conditionals, and preview multi-step refactors safely.'
                      },
                      {
                        icon: ShieldCheck,
                        title: 'Enterprise Safety',
                        copy: 'Risk scoring (0.0–1.0), backups, dry-runs, guardrails, and a battle-tested workflow that reported zero production criticals.'
                      }
                    ].map((item) => (
                      <div key={item.title} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                        <item.icon className="h-5 w-5 text-teal-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-100 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="quick-start" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <Rocket className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">Quick Start</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Install & Authenticate</h2>
                  <p className="text-slate-300 leading-relaxed">
                    Install from PyPI, analyse your project in seconds, and preview risk-scored refactorings before applying them. Everything works offline—no external APIs or accounts required.
                  </p>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
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
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
                      <pre className="whitespace-pre-wrap leading-relaxed">{`# CLI quick start
refactron init                       # create .refactron.yaml
refactron analyze src/ --summary     # analyse entire project
refactron refactor app.py --preview  # preview suggested fixes
refactron report src/ --format json -o report.json`}</pre>
                    </div>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-teal-100 mb-2">Configuration Tips</h3>
                    <p className="text-sm text-teal-100/80 leading-relaxed">
                      Tune analyzers and thresholds via <code className="text-teal-200">.refactron.yaml</code>. Defaults enable security, code smell, complexity, type hint, dead code, and dependency analyzers with opinionated limits (50 lines per function, ≤5 parameters, nesting depth ≤3).
                    </p>
                  </div>
                </div>
              </section>

              <section id="core-concepts" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <Layers className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">Core Concepts</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Analysis, Refactoring, Reporting</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Comprehensive Analysis',
                        copy: 'Security scanning (eval/exec, injections, secrets), complexity checks, code smells, dependency hygiene, type hints, and dead-code detection run in a single pass.'
                      },
                      {
                        title: 'Intelligent Refactoring',
                        copy: 'Risk-scored operations such as extract constant, reduce parameters, add docstrings, simplify conditionals, and extract method with before/after previews.'
                      },
                      {
                        title: 'Rich Reporting',
                        copy: 'Text, JSON, and HTML reports quantify technical debt, provide issue breakdowns, and feed CI/CD pipelines with machine-readable insights.'
                      }
                    ].map((item) => (
                      <div key={item.title} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-lg font-medium text-slate-100 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="api-reference" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <Code2 className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">API Reference</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Python SDK & Data Models</h2>
                  <p className="text-slate-300 leading-relaxed">
                    The Python package exposes a typed client with structured `AnalysisResult`, `CodeIssue`, and `RefactoringOperation` models. Each issue carries category, severity, rule ID, and remediation hints, while refactoring operations include before/after code, reasoning, and risk scores so you can gate automated merges confidently.
                  </p>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
                    <pre className="whitespace-pre-wrap leading-relaxed">{pythonApiSample}</pre>
                  </div>
                  <ul className="grid md:grid-cols-2 gap-4 text-sm text-slate-400">
                    <li className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                      <Cpu className="h-4 w-4 text-teal-300 mt-1" />
                      <span><strong className="text-slate-100">Language Support:</strong> Python, TypeScript/JavaScript, Java, Go, C# with pluggable parsers.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                      <PlugZap className="h-4 w-4 text-teal-300 mt-1" />
                      <span><strong className="text-slate-100">Hooks & Webhooks:</strong> Trigger workflows on pull request events, dry-run completions, or metric thresholds.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                      <Workflow className="h-4 w-4 text-teal-300 mt-1" />
                      <span><strong className="text-slate-100">Safeguards:</strong> Configure regression tests, diff size limits, review approvals, and rollout gates.</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                      <ShieldCheck className="h-4 w-4 text-teal-300 mt-1" />
                      <span><strong className="text-slate-100">Audit Trail:</strong> Every refactoring run is signed, timestamped, and exportable for compliance audits.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="cli-workflows" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <Workflow className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">CLI Workflows</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Automate at Scale</h2>
                  <p className="text-slate-300 leading-relaxed">
                    The CLI packages Refactron capabilities for scripting and CI. Run audits nightly, orchestrate multi-service refactors, and export detailed changelog reports for stakeholder review.
                  </p>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
                    <pre className="whitespace-pre-wrap leading-relaxed">{cliSamples.cli}</pre>
                  </div>
                </div>
              </section>

              <section id="security" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">Security & Compliance</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Enterprise ready by default</h2>
                  <ul className="space-y-4 text-sm text-slate-400">
                    {securityItems.map((item) => (
                      <li key={item.title} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-base font-medium text-slate-100 mb-1">{item.title}</h3>
                        <p className="leading-relaxed">{item.copy}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">
                    <p className="text-sm text-teal-100/80">
                      Need deeper documentation? Contact <a href="mailto:security@refactron.dev" className="font-medium text-teal-200 hover:text-teal-100">security@refactron.dev</a> for enterprise whitepapers, DPA details, and on-prem deployment options.
                    </p>
                  </div>
                </div>
              </section>

              <section id="product-metrics" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <Rocket className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">Product Metrics & Roadmap</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Refactron v1.0.0 at a Glance</h2>
                  <p className="text-slate-300 leading-relaxed">
                    The 1.0.0 stable release ships comprehensive automation with zero-cost analyzers and a Phase 3 plan focused on rule-based auto-fix, pattern detection, multi-file refactoring, and a custom rule engine. The roadmap keeps optional AI plugins as a BYO-key enhancement so the core experience remains fast, private, and free to run.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[{
                      title: 'Quality Scorecard',
                      value: '135 tests · 84% coverage · 0 prod criticals',
                      copy: 'Real-world dogfooding across 5,800+ lines demonstrated 100% detection of intentional security flaws and 94% lint issue reduction.'
                    }, {
                      title: 'Performance Benchmarks',
                      value: '≈4,300 LOC/sec',
                      copy: 'Small file analysis <0.2s, medium ≈0.2s, large (2000 LOC) ≈1.8s on commodity hardware—ideal for CI and pre-commit.'
                    }, {
                      title: 'Roadmap Highlights',
                      value: 'Phase 3 → Phase 4',
                      copy: 'Next up: rule-based auto-fix, pattern library, multi-file refactors, YAML rule engine, then IDE plugins, CI native integration, and team collaboration tooling.'
                    }].map((item) => (
                      <div key={item.title} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-base font-medium text-teal-200 mb-2">{item.title}</h3>
                        <p className="text-xl font-semibold text-slate-50 mb-2">{item.value}</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="contributing" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center gap-3 text-teal-200">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wide text-teal-200/80">Contributing & Community</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-50">Ship Improvements in Minutes</h2>
                  <p className="text-slate-300 leading-relaxed">
                    Refactron welcomes community contributions. The five-minute quick start installs dependencies, pre-commit hooks, and the full test suite so pull requests ship with 95%+ coverage expectations. Use the quick reference to format with Black/isort, lint with flake8, and type-check with mypy before opening a PR.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-lg font-medium text-slate-100 mb-2">Essential Docs</h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li><a className="text-teal-200 hover:text-teal-100" href="https://github.com/Refactron-ai/Refactron_lib/blob/main/CONTRIBUTING_QUICKSTART.md" target="_blank" rel="noopener noreferrer">Quick Start Guide – 5 minute onboarding</a></li>
                        <li><a className="text-teal-200 hover:text-teal-100" href="https://github.com/Refactron-ai/Refactron_lib/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Full Contributing Guide – coding standards & PR checklist</a></li>
                        <li><a className="text-teal-200 hover:text-teal-100" href="https://github.com/Refactron-ai/Refactron_lib/blob/main/GETTING_STARTED_DEV.md" target="_blank" rel="noopener noreferrer">Developer Setup – environment, CLI demos, debugging tips</a></li>
                        <li><a className="text-teal-200 hover:text-teal-100" href="https://github.com/Refactron-ai/Refactron_lib/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer">Code of Conduct – inclusive community guidelines</a></li>
                      </ul>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-lg font-medium text-slate-100 mb-2">How to Get Involved</h3>
                      <ul className="space-y-3 text-sm text-slate-400">
                        <li>Start with issues labelled <span className="text-teal-200">good first issue</span> or <span className="text-teal-200">help wanted</span>.</li>
                        <li>Run <code className="text-teal-200">pytest</code>, <code className="text-teal-200">black</code>, <code className="text-teal-200">flake8</code>, and <code className="text-teal-200">mypy</code> before opening a PR.</li>
                        <li>Share feedback via GitHub Discussions or email <a className="text-teal-200 hover:text-teal-100" href="mailto:hello@refactron.dev">hello@refactron.dev</a>.</li>
                        <li>Review the Phase 3 plan to align contributions with auto-fix, pattern detection, and multi-file refactoring initiatives.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
