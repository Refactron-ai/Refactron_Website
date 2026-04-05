import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TextGenerateEffect } from './ui/text-generate-effect';
import { FlickeringGrid } from './ui/flickering-grid';
import LogoLoop from './ui/logo-loop';
import { ArrowRight, Github, Package, Users, Copy, Check } from 'lucide-react';

const INSTALLERS = [
  { label: 'py', command: 'pip install refactron', color: '#4B8BBE' },
  { label: 'npm', command: 'npm install -g refactron', color: '#CC3534' },
];

const HeroSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % INSTALLERS.length);
    }, 3000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleToggle = useCallback(() => {
    setActiveIdx(i => (i + 1) % INSTALLERS.length);
    resetTimer();
  }, [resetTimer]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(INSTALLERS[activeIdx].command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeIdx]);

  return (
    <section
      id="home"
      className="relative h-screen bg-black antialiased bg-grid-white/[0.02] scroll-mt-24 overflow-hidden"
    >
      {/* Spotlight Effect */}

      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <FlickeringGrid
          color="rgba(255, 255, 255, 1)"
          squareSize={4}
          gridGap={6}
          flickerChance={0.2}
          maxOpacity={0.15}
          className="w-full h-full [mask-image:radial-gradient(circle_at_center,white,transparent_80%)] xl:[mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
        />
      </div>

      {/* Tech Grid Background */}
      <div className="absolute inset-0 animated-grid-bg opacity-30"></div>

      {/* Main Hero Content */}
      <div className="relative z-10 h-screen px-4 flex items-start pt-16 sm:pt-20">
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-12 gap-10 lg:gap-14">
          <div className="text-center max-w-4xl w-full">
            {/* Main Headline - Improved typography with lighter weight */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-3 sm:mb-4 leading-[1.1] tracking-tight font-space">
              <TextGenerateEffect
                words="Refactor Code."
                className="text-[var(--text-primary)] inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal"
              />
              <br />
              <div className="inline-block">
                <TextGenerateEffect
                  words="Verify It's Safe"
                  className="text-[var(--text-primary)] inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mr-3 sm:mr-4 font-normal"
                />
                <TextGenerateEffect
                  words="Ship With Confidence."
                  className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  wordClassName="text-neutral-400 font-semibold"
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] mb-5 sm:mb-6 leading-relaxed font-space"
            >
              Refactron safely refactors and modernizes legacy code{' '}
              <br className="hidden sm:block" />
              with behavior-preserving refactoring{' '}
              <br className="hidden sm:block" />
              and deterministic verification.
            </motion.p>

            {/* CTAs - pip install as primary, Read Docs as secondary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5"
            >
              {/* Primary CTA: install command with auto-cycling pip/npm */}
              <div className="group inline-flex items-center gap-3 border border-white/10 text-neutral-300 rounded-xl pl-4 pr-3 h-12 hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] font-space">
                {/* Ecosystem badge — click to toggle */}
                <button
                  onClick={handleToggle}
                  className="shrink-0 w-8 text-center text-[10px] font-bold py-0.5 rounded font-mono transition-colors duration-300"
                  style={{
                    color: INSTALLERS[activeIdx].color,
                    background: `${INSTALLERS[activeIdx].color}22`,
                  }}
                  aria-label="Switch package manager"
                >
                  {INSTALLERS[activeIdx].label}
                </button>

                {/* Command text — crossfades */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={handleToggle}
                >
                  {/* Invisible sizer — always sized to the longest command */}
                  <code className="invisible flex justify-center text-sm sm:text-base font-mono whitespace-nowrap pointer-events-none select-none">
                    <span>$ </span>npm install -g refactron
                  </code>
                  <AnimatePresence mode="wait">
                    <motion.code
                      key={activeIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center text-sm sm:text-base font-mono text-neutral-300 whitespace-nowrap"
                    >
                      <span className="text-neutral-500">$ </span>
                      {INSTALLERS[activeIdx].command}
                    </motion.code>
                  </AnimatePresence>
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"
                  aria-label="Copy install command"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              {/* Secondary CTA: Book Demo */}
              <a
                href="https://cal.com/omsherikar/refactron-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 rounded-xl px-6 h-12 font-medium text-base transition-all duration-300 hover:scale-[1.02] font-space"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Logo Loop - Centered at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-12 left-0 w-full z-20"
        >
          <div className="w-full sm:w-[70%] lg:w-[60%] mx-auto px-4">
            <p className="text-center text-xs font-medium text-neutral-500 tracking-widest mb-6 uppercase font-space">
              Used by developers from
            </p>
            <LogoLoop
              logos={[
                {
                  node: (
                    <img
                      src="/logos/UST.png"
                      alt="UST"
                      className="h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  ),
                  title: 'UST',
                },
                {
                  node: (
                    <div className="flex items-center gap-2 font-semibold text-xl text-neutral-400 hover:text-[var(--text-primary)] transition-colors group font-space">
                      <img
                        src="/logos/Salesforce.png"
                        alt="Salesforce"
                        className="h-8 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                      <span>Salesforce</span>
                    </div>
                  ),
                  title: 'Salesforce',
                },
                {
                  node: (
                    <img
                      src="/logos/KPIT.png"
                      alt="KPIT"
                      className="h-6 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  ),
                  title: 'KPIT',
                },
                {
                  node: (
                    <div className="flex items-center gap-2 font-semibold text-xl text-neutral-400 hover:text-[var(--text-primary)] transition-colors group font-space">
                      <img
                        src="/logos/Accenture.png"
                        alt="Accenture"
                        className="h-8 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                      <span>Accenture</span>
                    </div>
                  ),
                  title: 'Accenture',
                },
                {
                  node: (
                    <div className="flex items-center gap-2 font-semibold text-xl text-neutral-400 hover:text-[var(--text-primary)] transition-colors font-space">
                      <Package className="w-6 h-6" />
                      <span>PyPi</span>
                    </div>
                  ),
                  title: 'PyPi',
                },
                {
                  node: (
                    <div className="flex items-center gap-2 font-semibold text-xl text-neutral-400 hover:text-[var(--text-primary)] transition-colors font-space">
                      <Github className="w-6 h-6" />
                      <span>Github</span>
                    </div>
                  ),
                  title: 'Github',
                },
                {
                  node: (
                    <div className="flex items-center gap-2 font-semibold text-xl text-neutral-400 hover:text-[var(--text-primary)] transition-colors font-space">
                      <Users className="w-6 h-6" />
                      <span>Open Source Community</span>
                    </div>
                  ),
                  title: 'Open Source Community',
                },
              ]}
              speed={40}
              gap={64}
              logoHeight={32}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="black"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
