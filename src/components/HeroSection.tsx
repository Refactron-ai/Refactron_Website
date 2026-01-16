import React from 'react';
import { motion } from 'framer-motion';

import { TextGenerateEffect } from './ui/text-generate-effect';
import LightRays from './ui/LightRays';
import LogoLoop, { LogoItem } from './ui/logo-loop';
import ShimmerButton from './ui/shimmer-button';
import { Terminal, TypingAnimation, AnimatedSpan } from './ui/terminal';
import { Cpu, ArrowRight, Github, Package, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.querySelector(
      '[data-section="early-access"]'
    );
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen bg-black antialiased bg-grid-white/[0.02] scroll-mt-24 overflow-hidden"
    >
      {/* Spotlight Effect */}

      {/* Light Rays Effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <LightRays
          raysOrigin="top-center"
          raysColor="#48d1cc"
          raysSpeed={0.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* Tech Grid Background */}
      <div className="absolute inset-0 animated-grid-bg opacity-30"></div>

      {/* Main Hero Content */}
      <div className="relative z-10 h-screen px-4 flex items-start pt-16 sm:pt-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 gap-8 lg:gap-12">
          <div className="text-left max-w-3xl w-full lg:w-1/2">
            {/* Main Headline - Improved typography with lighter weight */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-4 leading-[1.1] tracking-tight font-space">
              <TextGenerateEffect
                words="Transform Legacy"
                className="text-[var(--text-primary)] inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              />
              <br />
              <div className="inline-block">
                <TextGenerateEffect
                  words="Code"
                  className="text-[var(--text-primary)] inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mr-3 sm:mr-4"
                />
                <TextGenerateEffect
                  words="to Modern Standards."
                  className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  wordClassName="text-neutral-400 font-medium"
                />
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-lg sm:text-xl md:text-2xl text-[var(--text-tertiary)] mb-4 sm:mb-5 leading-relaxed font-light font-space"
            >
              Refactor. Optimize. Automate.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] mb-5 sm:mb-6 leading-relaxed font-space"
            >
              Refactron safely refactor and modernize legacy code{' '}
              <br className="hidden sm:block" />
              with AI-assisted, behavior-preserving refactoring{' '}
              <br className="hidden sm:block" />
              and built-in verification.
            </motion.p>

            {/* CTAs - Modern minimal design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5"
            >
              <a
                href="https://pypi.org/project/refactron/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-black rounded-full px-6 h-12 hover:bg-neutral-100 font-medium text-base transition-all duration-300 hover:scale-[1.02] font-space"
              >
                <span>Try Refactron</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://docs.refactron.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 rounded-full px-6 h-12 hover:bg-white/5 font-medium text-base transition-all duration-300 hover:scale-[1.02] font-space"
              >
                <span>Read Docs</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0 relative z-20">
            <Terminal className="bg-black/80 backdrop-blur-sm border-white/10 shadow-2xl w-full max-w-lg">
              <TypingAnimation>pip install refactron</TypingAnimation>
              <AnimatedSpan delay={1500} className="text-green-500">
                <span>✔ Installed successfully.</span>
              </AnimatedSpan>
              <TypingAnimation delay={2000}>
                refactron analyze .
              </TypingAnimation>
              <AnimatedSpan delay={3500} className="text-blue-500">
                <span>ℹ Analyzing codebase...</span>
              </AnimatedSpan>
              <AnimatedSpan delay={4500} className="text-green-500">
                <span>✔ Found 12 optimization opportunities.</span>
              </AnimatedSpan>
              <TypingAnimation delay={5500}>
                refactron optimize --auto
              </TypingAnimation>
              <AnimatedSpan delay={7000} className="text-green-500">
                <span>✔ Refactoring complete.</span>
              </AnimatedSpan>
            </Terminal>
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
