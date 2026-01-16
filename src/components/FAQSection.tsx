'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Does Refactron change my code automatically?',
    answer:
      'No. Refactron starts in read-only mode and proposes refactors as reviewable diffs. Automation is optional and only applies low-risk changes with explicit consent.',
  },
  {
    question: 'How does Refactron ensure changes are safe?',
    answer:
      'Every refactor goes through verification checks to preserve behavior. Changes are incremental, measurable, and fully reversible.',
  },
  {
    question: 'Can I use this on production or legacy code?',
    answer:
      'Yes. Refactron is designed for long-lived and production codebases where safety, traceability, and control matter most.',
  },
  {
    question: 'Is my code sent to external services?',
    answer:
      'By default, Refactron runs locally with telemetry disabled. Private and on-prem deployment options are planned for teams with strict security requirements.',
  },
  {
    question: 'Which languages are supported?',
    answer:
      'Refactron is designed to be language-agnostic. Initial tooling is used for early access and feedback, with broader language support planned.',
  },
  {
    question: 'Is this open source?',
    answer:
      'The core platform is proprietary. Some tooling and libraries are open for early access and community feedback.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-20 lg:py-32 bg-black font-space">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-400">
            Everything you need to know about Refactron.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-neutral-800 rounded-lg overflow-hidden bg-black"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-neutral-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-white text-xl mb-6">
            Still have questions? Contact us directly!
          </p>
          <a
            href="mailto:hello@refactron.dev"
            className="inline-block px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
