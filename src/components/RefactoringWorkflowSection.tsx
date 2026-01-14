import React from 'react';
import { Terminal, TypingAnimation, AnimatedSpan } from './ui/terminal';
import { motion, AnimatePresence } from 'motion/react';
import { AuroraBackground } from './ui/aurora-background';

const RefactoringWorkflowSection = () => {
  const [activeTab, setActiveTab] = React.useState('analyze');
  const [progress, setProgress] = React.useState(0);

  const tabs = [
    { id: 'analyze', label: 'Analyze' },
    { id: 'refactor', label: 'Refactor' },
    { id: 'verify', label: 'Verify & Document' },
  ];

  const handleSequenceComplete = React.useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
      setActiveTab(current => {
        const currentIndex = tabs.findIndex(t => t.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 2000);
  }, []);

  const analyzeContent = [
    <TypingAnimation key="a1" duration={80}>
      pip install refactron
    </TypingAnimation>,
    <TypingAnimation key="a2" delay={1000} duration={80}>
      refactron init
    </TypingAnimation>,
    <AnimatedSpan key="a3" delay={2000} className="text-green-500">
      <span>✔ Created refactron.yml</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a4" delay={2100} className="text-green-500">
      <span>✔ Safe mode: enabled</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a5" delay={2200} className="text-green-500">
      <span>✔ Telemetry: disabled by default</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a6" delay={2500}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="a7" delay={3000} duration={80}>
      refactron analyze src/
    </TypingAnimation>,
    <AnimatedSpan key="a8" delay={4500} className="text-green-500">
      <span>✔ Scanned 142 files</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a9" delay={4600} className="text-green-500">
      <span>✔ Detected 37 refactoring opportunities</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a10" delay={4700} className="text-green-500">
      <span>✔ High-risk changes: 0</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a11" delay={4800} className="text-green-500">
      <span>✔ Estimated maintainability gain: +18%</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a12" delay={4900} className="text-green-500">
      <span>✔ Duplication hotspots identified</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a13" delay={5200}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="a14" delay={5500} duration={80}>
      refactron metrics
    </TypingAnimation>,
    <AnimatedSpan key="a15" delay={6500} className="text-green-500">
      <span>✔ Cyclomatic complexity: -12%</span>
    </AnimatedSpan>,
    <AnimatedSpan key="a16" delay={6600} className="text-green-500">
      <span>✔ Duplicate code blocks: 9</span>
    </AnimatedSpan>,
  ];

  const refactorContent = [
    <TypingAnimation key="r1" duration={80}>
      refactron refactor src/
    </TypingAnimation>,
    <AnimatedSpan key="r2" delay={1500} className="text-blue-400">
      <span>→ Extract duplicated logic in auth/utils.py</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r3" delay={1700} className="text-blue-400">
      <span>→ Simplify nested conditionals in payments/service.py</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r4" delay={1900} className="text-blue-400">
      <span>→ Replace deprecated patterns in user/handlers.py</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r5" delay={2100} className="text-green-500">
      <span>✔ Refactor suggestions generated</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r6" delay={2300} className="text-yellow-500">
      <span>✔ No changes applied</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r7" delay={2600}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="r8" delay={3000} duration={80}>
      refactron autofix --safe
    </TypingAnimation>,
    <AnimatedSpan key="r9" delay={4500} className="text-green-500">
      <span>✔ Applied 12 low-risk refactors</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r10" delay={4700} className="text-green-500">
      <span>✔ All changes behavior-safe</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r11" delay={4900} className="text-green-500">
      <span>✔ Changes staged (git diff available)</span>
    </AnimatedSpan>,
    <AnimatedSpan key="r12" delay={5200}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="r13" delay={5500} duration={80}>
      git diff
    </TypingAnimation>,
    <AnimatedSpan key="r14" delay={6500} className="text-neutral-400">
      <span># Clean, minimal diffs ready for review</span>
    </AnimatedSpan>,
  ];

  const verifyContent = [
    <TypingAnimation key="v1" duration={80}>
      refactron report
    </TypingAnimation>,
    <AnimatedSpan key="v2" delay={1500} className="text-green-500">
      <span>✔ Generated refactor-report.md</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v3" delay={1700} className="text-green-500">
      <span>✔ Included rationale for each change</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v4" delay={1900} className="text-green-500">
      <span>✔ Before/after code snippets added</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v5" delay={2200}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="v6" delay={3000} duration={80}>
      refactron metrics
    </TypingAnimation>,
    <AnimatedSpan key="v7" delay={4000} className="text-green-500">
      <span>✔ Complexity reduced: 18%</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v8" delay={4200} className="text-green-500">
      <span>✔ Duplication reduced: 22%</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v9" delay={4400} className="text-green-500">
      <span>✔ Files improved: 19</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v10" delay={4700}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="v11" delay={5500} duration={80}>
      refactron rollback
    </TypingAnimation>,
    <AnimatedSpan key="v12" delay={6500} className="text-green-500">
      <span>✔ All changes reverted successfully</span>
    </AnimatedSpan>,
    <AnimatedSpan key="v13" delay={6800}>
      <span>&nbsp;</span>
    </AnimatedSpan>,
    <TypingAnimation key="v14" delay={7500} duration={80}>
      refactron serve-metrics
    </TypingAnimation>,
    <AnimatedSpan key="v15" delay={8500} className="text-green-500">
      <span>✔ Prometheus metrics available at :9090</span>
    </AnimatedSpan>,
  ];

  const tabInfo = {
    analyze: {
      title: 'Analyze',
      description:
        'Refactron starts in read-only mode. You get clear insight into technical debt, complexity, and risk—without touching your code.',
    },
    refactor: {
      title: 'Refactor',
      description:
        'Refactron never rewrites your code blindly. You review suggestions first, and automation only applies changes that pass safety checks.',
    },
    verify: {
      title: 'Verify & Document',
      description:
        'Every refactor is verified, documented, and reversible. You get proof that behavior didn’t change—and a clear record of what did.',
    },
  };

  return (
    <AuroraBackground className="w-full py-20 relative overflow-hidden h-auto min-h-screen bg-black">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-light tracking-tight text-center text-[var(--text-primary)] mb-12"
        >
          Everything you need to refactor production code safely
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl font-light text-center text-neutral-400 mb-12 max-w-3xl mx-auto"
        >
          AI-assisted, behavior-preserving refactoring with verification,
          rollback, and documentation built in.
        </motion.p>

        <div className="flex justify-center mb-8">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <div key={tab.id} className="flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    setProgress(0);
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-black shadow-lg'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
                <div className="h-[2px] w-full rounded-full overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {activeTab === tab.id && (
                      <motion.div
                        key="progress-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/10 rounded-full"
                      >
                        <motion.div
                          className="h-full bg-white"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full max-w-5xl"
            >
              <Terminal
                className="w-full max-w-5xl shadow-2xl border-white/10 bg-white/10 backdrop-blur-md min-h-[600px]"
                contentClassName="bg-black/90 text-white font-mono"
                onSequenceComplete={handleSequenceComplete}
                onProgress={setProgress}
              >
                {activeTab === 'analyze' && analyzeContent}
                {activeTab === 'refactor' && refactorContent}
                {activeTab === 'verify' && verifyContent}
              </Terminal>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 h-24 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-2xl mx-auto px-4"
            >
              <p className="text-neutral-400 text-lg font-light leading-relaxed">
                {tabInfo[activeTab as keyof typeof tabInfo].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default RefactoringWorkflowSection;
