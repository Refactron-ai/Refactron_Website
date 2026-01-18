import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Menu, X } from 'lucide-react';
import Footer from './Footer';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-collection', title: 'Information Collection' },
  { id: 'use-of-information', title: 'Use of Information' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'sharing-disclosure', title: 'Sharing & Disclosure' },
  { id: 'user-rights', title: 'Your Rights' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to Policy' },
  { id: 'contact', title: 'Contact Us' },
];

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setShowMobileNav(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-space flex flex-col">
      {/* Mobile Navigation */}
      {showMobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileNav(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-neutral-900 border-r border-white/10 shadow-2xl flex flex-col">
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
              <span className="text-lg font-semibold text-white tracking-tight">
                Contents
              </span>
              <button
                type="button"
                onClick={() => setShowMobileNav(false)}
                className="inline-flex items-center justify-center rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <nav className="space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </a>
            <span className="text-neutral-600">/</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Privacy Policy
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMobileNav(true)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-white/10 bg-black sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-8 pr-4">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 px-2">
              Contents
            </span>
            <nav className="space-y-0.5">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    activeSection === section.id
                      ? 'text-white bg-white/5'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {activeSection === section.id && (
                    <div className="w-1 h-1 rounded-full bg-white" />
                  )}
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main
          id="main-content"
          className="flex-1 min-w-0 py-12 px-4 sm:px-8 lg:px-12 lg:py-16"
        >
          <div className="max-w-4xl mx-auto">
            {/* Title Section */}
            <div className="mb-16 border-b border-white/10 pb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Privacy Policy
              </h1>
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <p>Effective Date: December 24, 2025</p>
                <span>•</span>
                <p>Last Updated: December 24, 2025</p>
              </div>
            </div>

            <div className="space-y-16">
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  1. Introduction
                </h2>
                <div className="prose prose-invert max-w-none text-neutral-400">
                  <p className="leading-relaxed mb-4">
                    Refactron ("we," "our," or "us") is committed to protecting
                    your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use
                    our AI-powered code refactoring platform and services
                    (collectively, the "Service").
                  </p>
                  <p className="leading-relaxed mb-6">
                    By using our Service, you agree to the collection and use of
                    information in accordance with this Privacy Policy. If you
                    do not agree with our policies and practices, please do not
                    use our Service.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl">
                    <p className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Our Commitment to Your Privacy
                    </p>
                    <p className="text-green-200/80 leading-relaxed text-sm">
                      <strong className="text-green-200">
                        Your code is never used to train our AI models.
                      </strong>{' '}
                      We process your code solely to provide refactoring
                      suggestions during your active session. Once processing is
                      complete, your code is immediately deleted from our
                      systems. We do not store, retain, or use your code for
                      training purposes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Definitions */}
              <section id="definitions" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  2. Definitions
                </h2>
                <div className="grid gap-4">
                  {[
                    {
                      term: '"Personal Data" or "Personal Information"',
                      def: 'Any information that can be used to identify, contact, or locate an individual, including but not limited to name, email address, IP address, and device identifiers.',
                    },
                    {
                      term: '"Processing"',
                      def: 'Any operation performed on Personal Data, including collection, storage, use, disclosure, and deletion.',
                    },
                    {
                      term: '"Service"',
                      def: "Refactron's AI-powered code refactoring platform, including all websites, applications, APIs, and related services.",
                    },
                    {
                      term: '"User" or "You"',
                      def: 'Any individual or entity that accesses or uses our Service.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-neutral-900/30"
                    >
                      <dt className="font-medium text-white mb-2">
                        {item.term}
                      </dt>
                      <dd className="text-sm text-neutral-400 leading-relaxed">
                        {item.def}
                      </dd>
                    </div>
                  ))}
                </div>
              </section>

              {/* Information Collected */}
              <section
                id="information-collected"
                className="scroll-mt-24 space-y-8"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  3. Information We Collect
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  We collect information that you provide directly to us and
                  information that is automatically collected when you use our
                  Service.
                </p>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    3.1. Information You Provide
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">
                          Account Information:
                        </strong>{' '}
                        Name, email address, password (hashed), GitHub/LinkedIn
                        profile information, and company details when you
                        register or update your account.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">Source Code:</strong>{' '}
                        Code files, repositories, and project data that you
                        upload or connect via our platform APIs (e.g., GitHub,
                        GitLab integrations). This code is processed in
                        real-time and immediately deleted after processing.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">Communications:</strong>{' '}
                        Information you provide when contacting us for support,
                        feedback, or inquiries.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    3.2. Automatically Collected Information
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">Usage Data:</strong> Logs
                        of your interactions with our Service, including pages
                        visited, features used, and time spent on the platform.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">
                          Device Information:
                        </strong>{' '}
                        IP address, browser type and version, operating system,
                        device identifiers, and mobile network information.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">
                          Performance Data:
                        </strong>{' '}
                        Error logs, crash reports, and performance metrics to
                        help us improve the Service.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* How We Use */}
              <section id="how-we-use" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  4. How We Use Your Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Service Delivery',
                      desc: 'To provide, maintain, and improve our AI-powered refactoring services.',
                    },
                    {
                      title: 'Account Management',
                      desc: 'To create and manage your account, authenticate identity, and provide support.',
                    },
                    {
                      title: 'Security',
                      desc: 'To detect, prevent, and address security issues, fraud, and harmful activities.',
                    },
                    {
                      title: 'Analytics',
                      desc: 'To analyze usage patterns and develop new features and improvements.',
                    },
                    {
                      title: 'Communications',
                      desc: 'To send updates, respond to inquiries, and marketing (with consent).',
                    },
                    {
                      title: 'Legal Compliance',
                      desc: 'To comply with legal obligations and enforce our Terms of Service.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-neutral-900/30"
                    >
                      <h3 className="font-medium text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Legal Basis */}
              <section id="legal-basis" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  5. Legal Basis for Processing (GDPR)
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  For users in the European Economic Area (EEA), we process your
                  Personal Data based on the following legal bases:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Contract Performance',
                      desc: 'Processing necessary to perform our contract with you and provide the Service.',
                    },
                    {
                      title: 'Legitimate Interests',
                      desc: 'Processing necessary for security, fraud prevention, and service improvement.',
                    },
                    {
                      title: 'Consent',
                      desc: 'Processing based on your consent, such as marketing communications.',
                    },
                    {
                      title: 'Legal Obligations',
                      desc: 'Processing necessary to comply with applicable laws and regulations.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-neutral-900/30"
                    >
                      <h3 className="font-medium text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Protection */}
              <section id="data-protection" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  6. Data Protection & Security
                </h2>
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-6">
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <Shield className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <strong className="text-white block mb-1">
                          Encryption
                        </strong>
                        <span className="text-sm text-neutral-400 leading-relaxed">
                          Data in transit is encrypted using TLS/SSL, and
                          sensitive data at rest is encrypted using
                          industry-standard algorithms.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <Shield className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <strong className="text-white block mb-1">
                          Access Controls
                        </strong>
                        <span className="text-sm text-neutral-400 leading-relaxed">
                          Strict access controls and authentication mechanisms
                          to limit access to Personal Data to authorized
                          personnel only.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <Shield className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <strong className="text-white block mb-1">
                          Infrastructure Security
                        </strong>
                        <span className="text-sm text-neutral-400 leading-relaxed">
                          Secure, industry-grade cloud infrastructure with
                          regular security audits and monitoring.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  7. Cookies & Tracking Technologies
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance
                  your experience. You can control cookie preferences through
                  our cookie settings or your browser.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Necessary Cookies',
                      desc: 'Essential for website functionality, security, and user preferences.',
                    },
                    {
                      title: 'Analytics Cookies',
                      desc: 'Help us understand website usage through anonymous data collection.',
                    },
                    {
                      title: 'Marketing Cookies',
                      desc: 'Used for targeted advertising and campaign tracking.',
                    },
                    {
                      title: 'Functional Cookies',
                      desc: 'Enable enhanced features like language preferences.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-neutral-900/30"
                    >
                      <h3 className="font-medium text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Third Party */}
              <section id="third-party" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  8. Third-Party Services
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Vercel Analytics',
                      desc: 'Website analytics and performance monitoring.',
                    },
                    { name: 'Sentry', desc: 'Error tracking and debugging.' },
                    { name: 'Google OAuth', desc: 'Authentication service.' },
                    { name: 'GitHub OAuth', desc: 'Authentication service.' },
                    { name: 'Google Fonts', desc: 'Font delivery service.' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border border-white/10 bg-neutral-900/30"
                    >
                      <h3 className="font-medium text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  9. Data Retention
                </h2>
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden">
                  <div className="divide-y divide-white/10">
                    {[
                      {
                        label: 'Source Code',
                        value:
                          'Deleted immediately after processing completes.',
                      },
                      {
                        label: 'Account Data',
                        value:
                          'Retained while active. Deleted 30 days after closure.',
                      },
                      {
                        label: 'Usage Logs',
                        value:
                          'Retained for 90 days for security and debugging.',
                      },
                      {
                        label: 'Analytics Data',
                        value:
                          'Aggregated, anonymized data retained indefinitely.',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                      >
                        <span className="font-medium text-white">
                          {item.label}
                        </span>
                        <span className="text-sm text-neutral-400">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="scroll-mt-24 space-y-8">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  10. Your Rights
                </h2>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    10.1. GDPR Rights (European Users)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Right to Access',
                      'Right to Rectification',
                      'Right to Erasure',
                      'Right to Data Portability',
                      'Right to Object',
                      'Right to Restrict Processing',
                    ].map((right, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-white/10 bg-neutral-900/30 text-sm text-neutral-300"
                      >
                        {right}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white">
                    10.2. CCPA Rights (California Users)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Right to Know',
                      'Right to Delete',
                      'Right to Opt-Out',
                      'Non-Discrimination',
                    ].map((right, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-white/10 bg-neutral-900/30 text-sm text-neutral-300"
                      >
                        {right}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Contact Us
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <p className="text-neutral-400 mb-6">
                    If you have any questions about this Privacy Policy, please
                    contact us:
                  </p>
                  <a
                    href="mailto:privacy@refactron.dev"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    privacy@refactron.dev
                  </a>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
