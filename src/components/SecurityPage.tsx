import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';
import useSEO from '../hooks/useSEO';

interface Section {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const sections: Section[] = [
  {
    icon: <Lock className="h-5 w-5 text-teal-400" />,
    title: 'Data Encryption',
    items: [
      'All data in transit is encrypted with TLS 1.2+.',
      'Passwords are hashed using bcrypt with a per-user salt.',
      'API keys are stored as one-way hashes — the plaintext is never persisted after generation.',
      'Database connections require SSL/TLS.',
    ],
  },
  {
    icon: <Eye className="h-5 w-5 text-blue-400" />,
    title: 'Privacy & Data Practices',
    items: [
      'Your source code never leaves your machine — analysis runs entirely on the CLI.',
      'We collect only what is necessary: usage telemetry (token counts, model, timestamp) and account metadata.',
      'We do not sell or share personal data with third parties.',
      'You can request deletion of all your data at any time by emailing team@refactron.dev.',
    ],
  },
  {
    icon: <FileText className="h-5 w-5 text-purple-400" />,
    title: 'Compliance & Certifications',
    items: [
      'GDPR compliant — data processing agreements available on request.',
      'Data is stored in EU/US regions depending on your account location.',
      'Retention policy: usage logs are retained for 12 months, then automatically deleted.',
      'SOC 2 Type II audit in progress.',
    ],
  },
  {
    icon: <Shield className="h-5 w-5 text-amber-400" />,
    title: 'Access Controls',
    items: [
      'API keys are scoped per environment (production / development).',
      'API keys can be revoked individually from the dashboard at any time.',
      'JWT access tokens expire after 15 minutes; refresh tokens rotate on use.',
      'Enterprise plans include SSO (SAML/OIDC) and audit log access.',
    ],
  },
];

const SecurityPage: React.FC = () => {
  useSEO({
    title: 'Security | Refactron',
    description:
      'How Refactron keeps your code and account data safe — encryption, privacy practices, compliance, and responsible disclosure.',
    canonical: 'https://refactron.dev/security',
    robots: 'index, follow',
  });

  return (
    <div className="relative bg-black bg-grid-white/[0.02] font-space antialiased min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
            Trust & Safety
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
            Security
          </h1>
          <p className="text-base md:text-lg text-neutral-400 leading-loose tracking-wide">
            How we protect your data and keep your account secure.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  {section.icon}
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm text-neutral-400 leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Responsible Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <Mail className="h-5 w-5 text-neutral-400" />
            </div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Responsible Disclosure
            </h2>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed mb-3">
            If you discover a security vulnerability, please email us
            immediately at{' '}
            <a
              href="mailto:security@refactron.dev"
              className="text-white hover:text-neutral-300 transition-colors"
            >
              security@refactron.dev
            </a>
            . We ask that you give us reasonable time to investigate and address
            the issue before public disclosure.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            We acknowledge all reports within 48 hours and aim to resolve
            critical issues within 7 business days.
          </p>
        </motion.div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-sm text-neutral-500 tracking-wide">
            Questions about our security practices?{' '}
            <a
              href="mailto:team@refactron.dev"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
