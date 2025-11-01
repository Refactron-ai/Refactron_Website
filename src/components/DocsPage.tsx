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
  }
];

const codeSamples = {
  install: `# Python
pip install refactron

# Node.js
npm install @refactron/ai
`,
  tsIntegration: `import { RefactronClient } from '@refactron/ai';

const client = new RefactronClient({
  apiKey: process.env.REACT_APP_REFACTRON_KEY,
});

const result = await client.refactor({
  project: 'backend-services',
  target: 'src/payments/service.ts',
  recipe: 'improve-async-ergonomics',
  dryRun: true,
});

console.log(result.summary);
`,
  cli: `# Authenticate once
refactron login --token $REFACTRON_TOKEN

# Analyze an entire repository
refactron analyze ./services --format markdown --out reports/refactor.md

# Apply a recipe across microservices
docker compose run refactron apply --recipe eliminate-dead-code --dry-run
`
};

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
                    Refactron brings structure to continuous refactoring. The AI analyzes large codebases, prioritizes impact, and applies safe transformations with human oversight. Connect your repositories, pick the refactoring strategy, and use our review workflows to approve changes with confidence.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {[{ icon: Cpu, title: 'AI-first Architecture', copy: 'Adaptive language models tuned for static analysis and refactoring heuristics.' }, { icon: Workflow, title: 'CI/CD Native', copy: 'GitHub Actions, GitLab CI, and CircleCI integrations with progressive rollouts.' }, { icon: ShieldCheck, title: 'Safety Net', copy: 'Deterministic dry-runs, diff previews, guardrail policies, and regression checks.' }].map((item) => (
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
                    The SDK is available on both PyPI and npm. Install the package, export your API key, and you are ready to run the Refactron client in dry-run mode. Dry-runs produce comprehensive diff previews, metrics, and guardrail reports without writing to your repository.
                  </p>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
                      <pre className="whitespace-pre-wrap leading-relaxed">{codeSamples.install}</pre>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
                      <pre className="whitespace-pre-wrap leading-relaxed">{codeSamples.tsIntegration}</pre>
                    </div>
                  </div>
                  <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-teal-100 mb-2">Environment Variables</h3>
                    <p className="text-sm text-teal-100/80 leading-relaxed">
                      Export <code className="text-teal-200">REFACTRON_API_KEY</code> in your CI/CD provider. We support GitHub Actions secrets, AWS Parameter Store, HashiCorp Vault, and Doppler. Keys are scoped per workspace with granular project access policies.
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
                  <h2 className="text-2xl font-semibold text-slate-50">Projects, Snapshots, Recipes</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[{ title: 'Projects', copy: 'Map each repository or monorepo workspace to a project. Configure language parsers, branch permissions, and reporting preferences.' }, { title: 'Snapshots', copy: 'Point-in-time captures of your codebase with metrics, dependency graph diffs, and regression test results.' }, { title: 'Recipes', copy: 'Composable refactoring blueprints—rename APIs, migrate frameworks, enforce patterns—and ship them across teams.' }].map((item) => (
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
                  <h2 className="text-2xl font-semibold text-slate-50">Type-safe Client</h2>
                  <p className="text-slate-300 leading-relaxed">
                    The Refactron SDK ships TypeScript definitions and runtime validation. Responses contain human-readable summaries, structured diff metadata, and guardrail outcomes to gate automated merges.
                  </p>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-200 overflow-auto">
                    <pre className="whitespace-pre-wrap leading-relaxed">{codeSamples.cli}
</pre>
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
                    <pre className="whitespace-pre-wrap leading-relaxed">{codeSamples.cli}</pre>
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
                    {[{ title: 'Zero data retention by default', copy: 'Self-host connectors keep code within your VPC. Cloud runs are transient with encrypted storage.' }, { title: 'SOC 2 in motion', copy: 'SOC 2 Type II audit underway. GDPR compliant, with data residency in the US and EU.' }, { title: 'Secrets hygiene', copy: 'API keys are scoped by environment. Rotate via CLI.
' }, { title: 'Audit exports', copy: 'Stream run metadata to SIEM tools via webhooks, Azure Event Hub, or Amazon Kinesis.' }].map((item) => (
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
