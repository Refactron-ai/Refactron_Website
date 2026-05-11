import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Does Refactron change my code automatically?',
    answer:
      'No. Every structural refactor is shown as a readable diff. Low-risk changes can apply automatically. High-risk changes always ask for approval first. You are always in control.',
    tags: ['Diff', 'Approval', 'Control', 'Safety'],
  },
  {
    question: 'How does Refactron ensure changes are safe?',
    answer:
      'Every refactor goes through verification checks to preserve behavior. Changes are incremental, measurable, and fully reversible.',
    tags: ['Verification', 'Safety', 'Incremental', 'Reversible'],
  },
  {
    question: 'Can I use this on production or legacy code?',
    answer:
      'Yes. Refactron is designed for long-lived and production codebases where safety, traceability, and control matter most.',
    tags: ['Production', 'Legacy', 'Safety', 'Traceability'],
  },
  {
    question: 'Is my code sent to external services?',
    answer:
      'By default, Refactron runs locally with telemetry disabled. Private and on-prem deployment options are planned for teams with strict security requirements.',
    tags: ['Privacy', 'Local', 'Security', 'On-Prem'],
  },
  {
    question: 'Which languages are supported?',
    answer:
      'Python, TypeScript, and JavaScript are fully supported today. Go, Rust, and Java are on the roadmap.',
    tags: ['Python', 'TypeScript', 'JavaScript', 'Roadmap'],
  },
  {
    question: 'Is this open source?',
    answer:
      'The core platform is proprietary. Some tooling and libraries are open for early access and community feedback.',
    tags: ['Open Source', 'Proprietary', 'Early Access', 'Community'],
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="w-full py-16 lg:py-24 bg-black font-space">
      <div className="max-w-4xl mx-auto px-5 lg:px-7">
        {/* Large display heading */}
        <h2 className="text-[clamp(3rem,10vw,6rem)] font-extrabold tracking-tight text-white leading-none mb-10 lg:mb-12">
          FAQ
        </h2>

        {/* Top divider */}
        <div className="border-t border-white/[0.1]" />

        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const num = `(${String(i + 1).padStart(3, '0')})`;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-trigger-${i}`;

          return (
            <div key={i}>
              {/* Row */}
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-5 py-6 text-left group focus:outline-none"
              >
                {/* Number */}
                <span
                  className={`font-mono text-xs flex-shrink-0 transition-colors duration-200 ${
                    isOpen ? 'text-indigo-400' : 'text-neutral-600'
                  }`}
                >
                  {num}
                </span>

                {/* Question */}
                <span className="flex-1 text-lg md:text-xl font-normal text-white leading-snug">
                  {faq.question}
                </span>

                {/* +/− icon */}
                <span
                  className={`flex-shrink-0 text-xl leading-none transition-colors duration-200 ${
                    isOpen ? 'text-indigo-400' : 'text-neutral-500'
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {/* Answer always in DOM for SEO; height/opacity animate for UX */}
              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                initial={false}
                animate={{
                  height: isOpen ? 'auto' : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pl-[calc(theme(spacing.5)+theme(fontSize.xs[0])+1.25rem)] pr-10 pb-6 space-y-4">
                  <p className="text-sm md:text-[15px] text-neutral-400 leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {faq.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs text-neutral-400 border border-white/[0.1] rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-white/[0.1]" />
            </div>
          );
        })}
        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-300 text-lg font-space mb-4 font-light">
            Have a specific question? Let's talk.
          </p>
          <a
            href="https://cal.com/omsherikar/queries-refactron"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm bg-transparent border border-white/10 text-white rounded-lg hover:bg-white/5 hover:border-white/20 transition-all font-medium font-space"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
