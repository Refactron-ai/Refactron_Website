import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layers,
  Rocket,
  Workflow,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Menu,
  X,
  ChevronRight,
  Search,
  ChevronDown,
  Check,
} from 'lucide-react';
import Footer from './Footer';
import DocsSearchModal from './DocsSearchModal';

const sections = [
  {
    id: 'overview',
    title: 'Introduction',
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
    title: 'Tutorials',
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
    title: 'Security',
    icon: ShieldCheck,
    description:
      'How we secure your code, handle data residency, and comply with enterprise-grade standards.',
  },
];

const pythonApiSample = `from refactron import Refactron
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
result.show_diff()`;

const cliSamples = {
  cli: `# Initialize configuration
refactron init

# Analyze code with details
refactron analyze src/ --detailed

# Preview refactorings
refactron refactor app.py --preview

# Apply specific refactorers
refactron refactor app.py -t extract_constant -t add_docstring

# Export JSON report
refactron report src/ --format json -o report.json
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

const versions = ['v1.0.1', 'v1.0.0', 'v0.1.0b'];

const DocsPage: React.FC = () => {
  const [showMobileNav, setShowMobileNav] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [selectedVersion, setSelectedVersion] = React.useState('v1.0.0');
  const [isVersionOpen, setIsVersionOpen] = React.useState(false);
  const versionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        versionRef.current &&
        !versionRef.current.contains(event.target as Node)
      ) {
        setIsVersionOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (showMobileNav || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileNav, isSearchOpen]);

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-space flex flex-col">
      {showMobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileNav(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-neutral-900 border-r border-white/10 shadow-2xl flex flex-col">
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
              <span className="text-lg font-semibold text-white tracking-tight">
                Documentation
              </span>
              <button
                type="button"
                onClick={() => setShowMobileNav(false)}
                className="inline-flex items-center justify-center rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Getting Started
                  </span>
                  <ul className="space-y-1">
                    {sections.slice(0, 3).map(section => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 px-3 py-2 -mx-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Core Concepts
                  </span>
                  <ul className="space-y-1">
                    {sections.slice(3, 5).map(section => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 px-3 py-2 -mx-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Reference
                  </span>
                  <ul className="space-y-1">
                    {sections.slice(5).map(section => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 px-3 py-2 -mx-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Refactron" className="h-6 w-auto" />
              <span className="text-lg font-bold text-white tracking-tight">
                Refactron
              </span>
            </a>
            <span className="text-neutral-600">/</span>
            <span className="text-sm font-medium text-neutral-200">
              Documentation
            </span>

            {/* Version Dropdown */}
            <div className="relative ml-2" ref={versionRef}>
              <button
                onClick={() => setIsVersionOpen(!isVersionOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              >
                {selectedVersion}
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${isVersionOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isVersionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full left-0 mt-1 w-32 py-1 rounded-lg border border-white/10 bg-[#0D0D0D] shadow-xl z-50"
                  >
                    {versions.map(version => (
                      <button
                        key={version}
                        onClick={() => {
                          setSelectedVersion(version);
                          setIsVersionOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-left text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {version}
                        {selectedVersion === version && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search docs...</span>
              <span className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-medium">
                ⌘K
              </span>
            </button>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              <a
                href="https://github.com/Refactron-ai/Refactron_lib"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://discord.gg/zynEKJq8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Community
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowMobileNav(true)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-white/10 bg-black sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-8 pr-4">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-2">
                Getting Started
              </span>
              <ul className="space-y-0.5">
                {sections.slice(0, 3).map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      {section.id === 'overview' && (
                        <div className="w-1 h-1 rounded-full bg-white mr-1" />
                      )}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-2">
                Core Concepts
              </span>
              <ul className="space-y-0.5">
                {sections.slice(3, 5).map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-2">
                Reference
              </span>
              <ul className="space-y-0.5">
                {sections.slice(5).map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-2">
                SDKs
              </span>
              <ul className="space-y-0.5">
                <li>
                  <button
                    type="button"
                    className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all w-full text-left"
                  >
                    Python SDK
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all w-full text-left"
                  >
                    TypeScript SDK
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-12 px-4 sm:px-8 lg:px-12 lg:py-16">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Hero / Intro */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {sections[0].title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-3xl">
                {sections[0].description}
              </p>
            </div>

            {/* Documentation Grid */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Documentation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.slice(1).map(section => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group relative p-6 rounded-xl border border-white/10 bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white transition-colors">
                        <section.icon className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {section.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="space-y-16">
              {/* Quick Start */}
              <section id="quick-start" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-neutral-400" />
                  Quick Start
                </h2>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-neutral-400">
                        Install & Analyze
                      </span>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                      </div>
                    </div>
                    <pre className="font-mono text-sm text-neutral-300 overflow-x-auto pb-2">
                      <code className="language-bash">
                        <span className="text-neutral-500">
                          # Install Refactron
                        </span>
                        {'\n'}
                        pip install refactron{'\n\n'}
                        <span className="text-neutral-500">
                          # Analyze your project
                        </span>
                        {'\n'}
                        refactron analyze src/ --summary
                      </code>
                    </pre>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-neutral-400">
                        Python API
                      </span>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                      </div>
                    </div>
                    <pre className="font-mono text-sm text-neutral-300 overflow-x-auto pb-2">
                      <code className="language-python">
                        <span className="text-purple-400">from</span> refactron{' '}
                        <span className="text-purple-400">import</span>{' '}
                        Refactron{'\n\n'}
                        ref = Refactron(){'\n'}
                        result = ref.refactor(
                        <span className="text-green-400">"app.py"</span>,
                        preview=<span className="text-blue-400">True</span>)
                        {'\n'}
                        result.show_diff()
                      </code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Core Concepts */}
              <section id="core-concepts" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
                  <Layers className="w-6 h-6 text-neutral-400" />
                  Core Concepts
                </h2>
                <div className="p-6 rounded-xl border border-white/10 bg-neutral-900/30">
                  <p className="text-neutral-400 leading-relaxed">
                    {sections.find(s => s.id === 'core-concepts')?.description}
                  </p>
                </div>
              </section>

              {/* API Reference */}
              <section id="api-reference" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-neutral-400" />
                  API Reference
                </h2>
                <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 overflow-hidden">
                  <pre className="font-mono text-sm text-neutral-300 overflow-x-auto">
                    <code>{pythonApiSample}</code>
                  </pre>
                </div>
              </section>

              {/* CLI Workflows */}
              <section id="cli-workflows" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
                  <Workflow className="w-6 h-6 text-neutral-400" />
                  CLI Workflows
                </h2>
                <div className="rounded-xl border border-white/10 bg-[#0D0D0D] p-6 overflow-hidden">
                  <pre className="font-mono text-sm text-neutral-300 overflow-x-auto">
                    <code>{cliSamples.cli}</code>
                  </pre>
                </div>
              </section>

              {/* Security */}
              <section id="security" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-neutral-400" />
                  Security
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {securityItems.map(item => (
                    <div
                      key={item.title}
                      className="p-6 rounded-xl border border-white/10 bg-neutral-900/30"
                    >
                      <h3 className="text-base font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {item.copy}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Right Sidebar (On This Page) */}
        <aside className="hidden xl:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-8 pl-4">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              On This Page
            </span>
            <ul className="space-y-2 text-sm border-l border-white/10">
              <li>
                <a
                  href="#quick-start"
                  className="block pl-4 py-1 text-neutral-400 hover:text-white hover:border-l hover:border-white -ml-px transition-all"
                >
                  Quick Start
                </a>
              </li>
              <li>
                <a
                  href="#core-concepts"
                  className="block pl-4 py-1 text-neutral-400 hover:text-white hover:border-l hover:border-white -ml-px transition-all"
                >
                  Core Concepts
                </a>
              </li>
              <li>
                <a
                  href="#api-reference"
                  className="block pl-4 py-1 text-neutral-400 hover:text-white hover:border-l hover:border-white -ml-px transition-all"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#cli-workflows"
                  className="block pl-4 py-1 text-neutral-400 hover:text-white hover:border-l hover:border-white -ml-px transition-all"
                >
                  CLI Workflows
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="block pl-4 py-1 text-neutral-400 hover:text-white hover:border-l hover:border-white -ml-px transition-all"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <Footer />

      <DocsSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        sections={sections}
      />
    </div>
  );
};

export default DocsPage;
