import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const handleBack = () => {
    window.history.back();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setTimeout(() => setActiveSection(null), 1000);
    }
  };

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'definitions', title: 'Definitions' },
    { id: 'information-collected', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'legal-basis', title: 'Legal Basis for Processing' },
    { id: 'data-protection', title: 'Data Protection & Security' },
    { id: 'cookies', title: 'Cookies & Tracking Technologies' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'data-breaches', title: 'Data Breach Notification' },
    { id: 'children-privacy', title: "Children's Privacy" },
    { id: 'changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Refactron</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-sm font-light text-gray-900 mb-4 uppercase tracking-wide">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12"
            >
              {/* Header */}
              <div className="text-center mb-12 pb-8 border-b border-gray-200">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-primary-600" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                  Privacy Policy
                </h1>
                <div className="space-y-2 text-gray-600">
                  <p className="text-lg">
                    <strong>Effective Date:</strong> December 24, 2025
                  </p>
                  <p className="text-sm text-gray-500">
                    Last Updated: December 24, 2025
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <section id="introduction" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    1. Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Refactron ("we," "our," or "us") is committed to protecting
                    your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use
                    our AI-powered code refactoring platform and services
                    (collectively, the "Service").
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By using our Service, you agree to the collection and use of
                    information in accordance with this Privacy Policy. If you
                    do not agree with our policies and practices, please do not
                    use our Service.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-6">
                    <p className="text-gray-800 font-semibold mb-2">
                      🔒 Our Commitment to Your Privacy
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>
                        Your code is never used to train our AI models.
                      </strong>{' '}
                      We process your code solely to provide refactoring
                      suggestions during your active session. Once processing is
                      complete, your code is immediately deleted from our
                      systems. We do not store, retain, or use your code for
                      training purposes.
                    </p>
                  </div>
                </section>

                {/* Definitions */}
                <section id="definitions" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    2. Definitions
                  </h2>
                  <dl className="space-y-4 text-gray-700">
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "Personal Data" or "Personal Information"
                      </dt>
                      <dd className="ml-4">
                        Any information that can be used to identify, contact,
                        or locate an individual, including but not limited to
                        name, email address, IP address, and device identifiers.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "Processing"
                      </dt>
                      <dd className="ml-4">
                        Any operation performed on Personal Data, including
                        collection, storage, use, disclosure, and deletion.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "Service"
                      </dt>
                      <dd className="ml-4">
                        Refactron's AI-powered code refactoring platform,
                        including all websites, applications, APIs, and related
                        services.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "User" or "You"
                      </dt>
                      <dd className="ml-4">
                        Any individual or entity that accesses or uses our
                        Service.
                      </dd>
                    </div>
                  </dl>
                </section>

                {/* Information Collected */}
                <section
                  id="information-collected"
                  className="mb-12 scroll-mt-8"
                >
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    3. Information We Collect
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We collect information that you provide directly to us and
                    information that is automatically collected when you use our
                    Service.
                  </p>

                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    3.1. Information You Provide
                  </h3>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Account Information:</strong> Name, email
                        address, password (hashed), GitHub/LinkedIn profile
                        information, and company details when you register or
                        update your account.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Source Code:</strong> Code files, repositories,
                        and project data that you upload or connect via our
                        platform APIs (e.g., GitHub, GitLab integrations). This
                        code is processed in real-time and immediately deleted
                        after processing.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Communications:</strong> Information you provide
                        when contacting us for support, feedback, or inquiries.
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    3.2. Automatically Collected Information
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Usage Data:</strong> Logs of your interactions
                        with our Service, including pages visited, features
                        used, and time spent on the platform.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Device Information:</strong> IP address, browser
                        type and version, operating system, device identifiers,
                        and mobile network information.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Performance Data:</strong> Error logs, crash
                        reports, and performance metrics to help us improve the
                        Service.
                      </span>
                    </li>
                  </ul>
                </section>

                {/* How We Use */}
                <section id="how-we-use" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    4. How We Use Your Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We use the information we collect for the following
                    purposes:
                  </p>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Service Delivery:</strong> To provide, maintain,
                        and improve our AI-powered refactoring services,
                        including processing your code to generate refactoring
                        suggestions.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Account Management:</strong> To create and
                        manage your account, authenticate your identity, and
                        provide customer support.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Security & Fraud Prevention:</strong> To detect,
                        prevent, and address security issues, fraud, and other
                        harmful activities.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Analytics & Improvement:</strong> To analyze
                        usage patterns, monitor Service performance, and develop
                        new features and improvements.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Communications:</strong> To send you
                        service-related updates, respond to your inquiries, and
                        (with your consent) send marketing communications.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Legal Compliance:</strong> To comply with legal
                        obligations, enforce our Terms of Service, and protect
                        our rights and the rights of our users.
                      </div>
                    </li>
                  </ul>
                </section>

                {/* Legal Basis */}
                <section id="legal-basis" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    5. Legal Basis for Processing (GDPR)
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    For users in the European Economic Area (EEA), we process
                    your Personal Data based on the following legal bases:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Contract Performance
                      </h4>
                      <p className="text-gray-700">
                        Processing necessary to perform our contract with you
                        and provide the Service, including code processing and
                        account management.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Legitimate Interests
                      </h4>
                      <p className="text-gray-700">
                        Processing necessary for our legitimate interests, such
                        as security monitoring, fraud prevention, service
                        improvement, and analytics (where your interests do not
                        override ours).
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Consent
                      </h4>
                      <p className="text-gray-700">
                        Processing based on your consent, such as marketing
                        communications and optional analytics cookies. You may
                        withdraw consent at any time.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Legal Obligations
                      </h4>
                      <p className="text-gray-700">
                        Processing necessary to comply with applicable laws,
                        regulations, or court orders.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Data Protection */}
                <section id="data-protection" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    6. Data Protection & Security
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement industry-standard technical and organizational
                    measures to protect your Personal Data:
                  </p>
                  <ul className="space-y-3 text-gray-700 mb-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Encryption:</strong> Data in transit is
                        encrypted using TLS/SSL, and sensitive data at rest is
                        encrypted using industry-standard algorithms.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Access Controls:</strong> Strict access controls
                        and authentication mechanisms to limit access to
                        Personal Data to authorized personnel only.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Infrastructure Security:</strong> Secure,
                        industry-grade cloud infrastructure with regular
                        security audits and monitoring.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        <strong>Regular Updates:</strong> Regular security
                        updates and patches to protect against known
                        vulnerabilities.
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    While we strive to protect your Personal Data, no method of
                    transmission over the Internet or electronic storage is 100%
                    secure. We cannot guarantee absolute security but are
                    committed to maintaining the highest security standards.
                  </p>
                </section>

                {/* Cookies */}
                <section id="cookies" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    7. Cookies & Tracking Technologies
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We use cookies and similar tracking technologies to enhance
                    your experience, analyze usage, and support our Service. You
                    can control cookie preferences through our cookie settings
                    or your browser.
                  </p>

                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    7.1. Types of Cookies
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Necessary Cookies
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Essential for website functionality, security, and user
                        preferences. These cannot be disabled.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Analytics Cookies
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Help us understand website usage through anonymous data
                        collection (e.g., page views, user behavior).
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Marketing Cookies
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Used for targeted advertising and campaign tracking
                        across websites.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Functional Cookies
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Enable enhanced features like language preferences and
                        personalized settings.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Third Party */}
                <section id="third-party" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    8. Third-Party Services & Data Sharing
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We use third-party service providers to operate our
                    platform. These providers may process your data according to
                    their own privacy policies:
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Vercel Analytics
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Website analytics and performance monitoring (anonymized
                        data).{' '}
                        <a
                          href="https://vercel.com/legal/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Sentry
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Error tracking and debugging (technical logs, no code
                        content).{' '}
                        <a
                          href="https://sentry.io/privacy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Google OAuth
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Authentication service (profile information, email).{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        GitHub OAuth
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Authentication service (profile information, email,
                        public repositories metadata).{' '}
                        <a
                          href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Google Fonts
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Font delivery service (IP address, browser information).{' '}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <p className="text-gray-800 font-semibold mb-2">
                      International Data Transfers
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Some of these services may process data outside the
                      European Economic Area (EEA). We ensure appropriate
                      safeguards are in place, including Standard Contractual
                      Clauses where applicable, to protect your data in
                      accordance with GDPR requirements.
                    </p>
                  </div>
                </section>

                {/* Data Retention */}
                <section id="data-retention" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    9. Data Retention
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We retain your Personal Data only as long as necessary for
                    the purposes outlined in this Policy:
                  </p>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Source Code:</strong> Deleted immediately after
                        processing completes (typically within minutes). No code
                        is stored long-term.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Account Data:</strong> Retained while your
                        account is active. Deleted within 30 days of account
                        closure.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Usage Logs:</strong> Retained for 90 days for
                        security and debugging purposes.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Analytics Data:</strong> Aggregated, anonymized
                        data may be retained indefinitely for service
                        improvement.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <div>
                        <strong>Legal Requirements:</strong> Some data may be
                        retained longer if required by law, court order, or
                        regulatory requirements.
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    10. Your Rights
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Depending on your location, you may have the following
                    rights regarding your Personal Data:
                  </p>

                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    10.1. GDPR Rights (European Users)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Access
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Request a copy of your Personal Data we hold.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Rectification
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Correct inaccurate or incomplete data.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Erasure
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Request deletion of your Personal Data and code.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Data Portability
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Receive your data in a structured, machine-readable
                        format.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Object
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Object to processing based on legitimate interests.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Restrict Processing
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Request limitation of how we process your data.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Withdraw Consent
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Withdraw consent for marketing or optional analytics at
                        any time.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    10.2. CCPA Rights (California Users)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Know
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Request details about personal information collected,
                        used, or shared.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Delete
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Request deletion of personal information (subject to
                        legal exceptions).
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Right to Opt-Out
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Opt-out of sale or sharing of personal information (we
                        do not sell your data).
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Non-Discrimination
                      </h4>
                      <p className="text-gray-700 text-sm">
                        We will not discriminate against you for exercising your
                        CCPA rights.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                    <p className="text-gray-800 font-semibold mb-2">
                      How to Exercise Your Rights
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm mb-4">
                      To exercise any of these rights, please contact us at{' '}
                      <a
                        href="mailto:support@refactron.dev"
                        className="text-primary-600 hover:text-primary-700 underline font-medium"
                      >
                        support@refactron.dev
                      </a>
                      . We will respond within 30 days (or as required by
                      applicable law). We may request verification of your
                      identity before processing your request.
                    </p>
                  </div>
                </section>

                {/* Data Breaches */}
                <section id="data-breaches" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    11. Data Breach Notification
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    In the event of a data breach that may affect your Personal
                    Data, we will:
                  </p>
                  <ul className="space-y-3 text-gray-700 mt-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Notify relevant supervisory authorities within 72 hours
                        of becoming aware of the breach (for GDPR-covered
                        users).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Notify affected users without undue delay if the breach
                        poses a high risk to their rights and freedoms.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Provide clear information about the nature of the
                        breach, potential consequences, and measures we are
                        taking to address it.
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Children Privacy */}
                <section id="children-privacy" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    12. Children's Privacy
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our Service is not intended for users under the age of 13
                    (or 16 in the EU). We do not knowingly collect Personal Data
                    from children. If you believe we have inadvertently
                    collected information from a child, please contact us
                    immediately at{' '}
                    <a
                      href="mailto:support@refactron.dev"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      support@refactron.dev
                    </a>
                    , and we will delete such information promptly.
                  </p>
                </section>

                {/* Changes */}
                <section id="changes" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    13. Changes to This Privacy Policy
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of material changes by:
                  </p>
                  <ul className="space-y-2 text-gray-700 mt-4 mb-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Posting the updated Policy on this page.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Updating the "Last Updated" date at the top of this
                        Policy.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Sending you an email notification (for material
                        changes).
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Your continued use of the Service after such changes
                    constitutes acceptance of the updated Privacy Policy. We
                    encourage you to review this Policy periodically.
                  </p>
                </section>

                {/* Contact */}
                <section id="contact" className="mb-8 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    14. Contact Us
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have questions, concerns, or wish to exercise your
                    rights regarding this Privacy Policy or our data practices,
                    please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                          Privacy Inquiries
                        </h4>
                        <a
                          href="mailto:support@refactron.dev"
                          className="text-primary-600 hover:text-primary-700 font-medium text-lg transition-colors duration-300"
                        >
                          support@refactron.dev
                        </a>
                        <p className="text-gray-600 text-sm mt-2">
                          We aim to respond to all inquiries within 30 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
