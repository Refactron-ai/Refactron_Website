import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Does Refactron change my code automatically?',
    answer:
      'No. Refactron starts in read-only mode and proposes refactors as reviewable diffs. Automation is optional and only applies low-risk changes with explicit consent.',
    tags: ['Read-Only', 'Diffs', 'Automation', 'Consent'],
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
      'Refactron is designed to be language-agnostic. Initial tooling focuses on Python and JavaScript for early access and feedback, with broader language support planned.',
    tags: ['Languages', 'Python', 'JavaScript', 'Roadmap'],
  },
  {
    question: 'Is this open source?',
    answer:
      'The core platform is proprietary. Some tooling and libraries are open for early access and community feedback.',
    tags: ['Open Source', 'Proprietary', 'Early Access', 'Community'],
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="w-full py-20 lg:py-32 bg-black font-space">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Large display heading */}
        <h2 className="text-[clamp(4rem,12vw,8rem)] font-extrabold tracking-tight text-white leading-none mb-16">
          FAQ
        </h2>

        {/* Top divider */}
        <div className="border-t border-white/[0.1]" />

        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const num = `(${String(i + 1).padStart(3, '0')})`;

          return (
            <div key={i}>
              {/* Row */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-6 py-8 text-left group focus:outline-none"
              >
                {/* Number */}
                <span
                  className={`font-mono text-sm flex-shrink-0 transition-colors duration-200 ${
                    isOpen ? 'text-indigo-400' : 'text-neutral-600'
                  }`}
                >
                  {num}
                </span>

                {/* Question */}
                <span className="flex-1 text-xl md:text-2xl font-normal text-white leading-snug">
                  {faq.question}
                </span>

                {/* +/− icon */}
                <span
                  className={`flex-shrink-0 text-2xl leading-none transition-colors duration-200 ${
                    isOpen ? 'text-indigo-400' : 'text-neutral-500'
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[calc(theme(spacing.6)+theme(fontSize.sm[0])+1.5rem)] pr-12 pb-8 space-y-5">
                      <p className="text-base text-neutral-400 leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm text-neutral-400 border border-white/[0.1] rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="border-t border-white/[0.1]" />
            </div>
          );
        })}
        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-300 text-xl font-space mb-6 font-light">
            Have a specific question? Let's talk.
          </p>
          <a
            href="mailto:hello@refactron.dev"
            className="inline-block px-8 py-4 bg-transparent border border-white/10 text-white rounded-xl hover:bg-white/5 hover:border-white/20 transition-all font-medium font-space"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
