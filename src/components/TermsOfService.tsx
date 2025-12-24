import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'service-description', title: 'Description of Service' },
    { id: 'user-responsibilities', title: 'User Responsibilities' },
    { id: 'acceptable-use', title: 'Acceptable Use Policy' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'ai-disclaimers', title: 'AI-Specific Disclaimers' },
    { id: 'termination', title: 'Termination' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'dispute-resolution', title: 'Dispute Resolution' },
    { id: 'modifications', title: 'Modifications to Terms' },
    { id: 'contact', title: 'Contact' },
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
                    <FileText className="w-10 h-10 text-primary-600" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                  Terms of Service
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
                    Welcome to Refactron. These Terms of Service ("Terms,"
                    "Agreement") constitute a legally binding agreement between
                    you ("User," "you," or "your") and Refactron ("we," "us," or
                    "our") governing your access to and use of our AI-powered
                    code refactoring platform and services (collectively, the
                    "Service").
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Please read these Terms carefully before using our Service.
                    By accessing or using the Service, you agree to be bound by
                    these Terms. If you do not agree to these Terms, you may not
                    access or use the Service.
                  </p>
                </section>

                {/* Definitions */}
                <section id="definitions" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    2. Definitions
                  </h2>
                  <dl className="space-y-4 text-gray-700">
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "Service" or "Platform"
                      </dt>
                      <dd className="ml-4">
                        Refactron's AI-powered code refactoring platform,
                        including all websites, applications, APIs, software,
                        tools, and related services.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "User" or "You"
                      </dt>
                      <dd className="ml-4">
                        Any individual or entity that accesses or uses the
                        Service.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "User Content"
                      </dt>
                      <dd className="ml-4">
                        Any code, data, files, or other materials that you
                        upload, submit, or provide to the Service.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "AI Suggestions" or "Refactoring Suggestions"
                      </dt>
                      <dd className="ml-4">
                        Code refactoring recommendations, modifications, or
                        suggestions generated by our AI models based on your
                        User Content.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-light text-gray-900 mb-1">
                        "Account"
                      </dt>
                      <dd className="ml-4">
                        Your registered user account that provides access to the
                        Service.
                      </dd>
                    </div>
                  </dl>
                </section>

                {/* Acceptance */}
                <section id="acceptance" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    3. Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing or using Refactron, you acknowledge that you
                    have read, understood, and agree to be bound by these Terms
                    and our Privacy Policy, which is incorporated herein by
                    reference.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You represent and warrant that:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        You are at least 18 years old (or the age of majority in
                        your jurisdiction) and have the legal capacity to enter
                        into this Agreement.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        You have the authority to bind yourself or the entity
                        you represent to these Terms.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Your use of the Service will comply with all applicable
                        laws and regulations.
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Service Description */}
                <section id="service-description" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    4. Description of Service
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Refactron is an AI-powered platform that provides automated
                    code refactoring and optimization services. Our Service uses
                    machine learning models and heuristics to analyze your
                    source code and generate refactoring suggestions.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Key Features:</strong>
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        AI-powered code analysis and refactoring suggestions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Integration with version control systems (e.g., GitHub,
                        GitLab)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Code quality and performance optimization
                        recommendations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Diff previews and change management tools</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any
                    aspect of the Service at any time, with or without notice.
                    We do not guarantee that the Service will be available at
                    all times or that it will be error-free.
                  </p>
                </section>

                {/* User Responsibilities */}
                <section
                  id="user-responsibilities"
                  className="mb-12 scroll-mt-8"
                >
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    5. User Responsibilities
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    You are responsible for your use of the Service and agree
                    to:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Account Security
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Maintain the confidentiality of your account credentials
                        and notify us immediately of any unauthorized access.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Accurate Information
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Provide accurate, current, and complete information when
                        creating and maintaining your account.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Code Review & Testing
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Review, test, and validate all AI-generated refactoring
                        suggestions before deploying to production. You are
                        solely responsible for the code you deploy.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-primary-500">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Compliance
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Use the Service only for lawful purposes and in
                        compliance with all applicable laws, regulations, and
                        these Terms.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Acceptable Use */}
                <section id="acceptable-use" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    6. Acceptable Use Policy
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    You agree NOT to use the Service to:
                  </p>
                  <div className="space-y-3">
                    <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                      <h4 className="font-light text-red-900 mb-2 tracking-tight">
                        Prohibited Activities
                      </h4>
                      <ul className="space-y-2 text-red-800 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Upload malicious code, viruses, malware, or code
                            designed to harm systems or networks
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Upload proprietary third-party code without
                            authorization or violate intellectual property
                            rights
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Attempt to reverse engineer, decompile, or extract
                            our AI models, algorithms, or proprietary technology
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Use automated tools, bots, or scripts to abuse the
                            service, bypass rate limits, or scrape data
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Share API keys or access credentials with
                            unauthorized parties
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Generate code for illegal activities or violate any
                            laws
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Interfere with or disrupt the Service or servers
                            connected to the Service
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-semibold">•</span>
                          <span>
                            Use the Service to compete with Refactron or build a
                            competing service
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-6">
                    Violation of this Acceptable Use Policy may result in
                    immediate termination of your account and legal action.
                  </p>
                </section>

                {/* Intellectual Property */}
                <section
                  id="intellectual-property"
                  className="mb-12 scroll-mt-8"
                >
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    7. Intellectual Property Rights
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
                        7.1. Your Content
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>Ownership:</strong> You retain full ownership
                        and all intellectual property rights to your original
                        User Content. We do not claim any ownership over your
                        code or User Content.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <strong>License to Process:</strong> By using the
                        Service, you grant Refactron a limited, non-exclusive,
                        revocable license to process your User Content solely
                        for the purpose of providing refactoring suggestions
                        during your active session. This license:
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Is limited to the duration of processing (typically
                            minutes)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Terminates immediately upon completion of processing
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Does not grant us rights to use your code for
                            training or any other purpose
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
                        7.2. AI-Generated Suggestions
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Refactoring suggestions generated by our AI are provided
                        to you as tools. You own the resulting code after you
                        review, modify, and incorporate our suggestions into
                        your codebase. However, the underlying AI models,
                        algorithms, and platform technology remain our
                        intellectual property.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
                        7.3. Our Intellectual Property
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        The Service, including all software, AI models,
                        algorithms, designs, text, graphics, logos, and other
                        content, is owned by Refactron and protected by
                        copyright, trademark, and other intellectual property
                        laws. You may not copy, modify, distribute, or create
                        derivative works based on our intellectual property
                        without our express written permission.
                      </p>
                    </div>
                  </div>
                </section>

                {/* AI Disclaimers */}
                <section id="ai-disclaimers" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    8. AI-Specific Disclaimers
                  </h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-6">
                    <p className="text-yellow-900 font-semibold mb-2 text-lg">
                      ⚠️ Important Notice
                    </p>
                    <p className="text-yellow-800 leading-relaxed">
                      Refactron uses artificial intelligence to generate code
                      refactoring suggestions. AI-generated content may contain
                      errors, inaccuracies, security vulnerabilities, or may not
                      be suitable for production use. You are solely responsible
                      for reviewing, testing, and validating all AI-generated
                      suggestions before deployment.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>You acknowledge and agree that:</strong>
                  </p>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        AI suggestions may contain bugs, security
                        vulnerabilities, logic errors, or may not follow best
                        practices
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        AI suggestions may not always be correct, optimal, or
                        compatible with your codebase, dependencies, or
                        requirements
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        You are solely responsible for reviewing, testing, and
                        validating all AI-generated suggestions before
                        deployment to production
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        We make no guarantees about code correctness,
                        performance improvements, security, or compatibility
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        The Service is provided "as-is" and "as-available"
                        without warranties of any kind, express or implied
                      </span>
                    </div>
                  </div>
                </section>

                {/* Termination */}
                <section id="termination" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    9. Termination
                  </h2>
                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    9.1. Termination by Us
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may suspend or terminate your account immediately,
                    without notice, for:
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Violation of these Terms of Service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Fraudulent, abusive, or illegal activity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Attempting to reverse engineer or extract our AI models
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Excessive API usage or rate limit violations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Non-payment of fees (for paid plans)</span>
                    </li>
                  </ul>
                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    9.2. Termination by You
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You may terminate your account at any time by contacting us
                    at{' '}
                    <a
                      href="mailto:support@refactron.dev"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      support@refactron.dev
                    </a>
                    .
                  </p>
                  <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">
                    9.3. Effect of Termination
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Upon termination, your access to the Service will be
                    revoked, and we will delete your account data in accordance
                    with our Privacy Policy. Sections of these Terms that by
                    their nature should survive termination will survive,
                    including but not limited to intellectual property rights,
                    disclaimers, and limitation of liability.
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section
                  id="limitation-liability"
                  className="mb-12 scroll-mt-8"
                >
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    10. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    To the maximum extent permitted by applicable law,
                    Refactron, its affiliates, officers, directors, employees,
                    agents, and service providers shall not be liable for:
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        AI-Related Damages
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Any bugs, errors, security vulnerabilities, or damages
                        introduced by AI-generated refactoring suggestions
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Data Loss
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Data loss, corruption, or unauthorized access resulting
                        from use of the platform
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Indirect Damages
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Indirect, incidental, special, consequential, or
                        punitive damages
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Business Losses
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Loss of profits, revenue, data, business opportunities,
                        or goodwill
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                        Service Interruptions
                      </h4>
                      <p className="text-gray-700 text-sm">
                        Service interruptions, downtime, or unavailability of
                        the platform
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-gray-800 font-semibold mb-2">
                      Maximum Liability
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Our total liability for any claims arising from these
                      Terms or your use of the Service shall not exceed the
                      amount you paid us in the 12 months preceding the claim,
                      or $100, whichever is greater. Some jurisdictions do not
                      allow the exclusion of certain warranties or limitations
                      of liability, so some of the above exclusions may not
                      apply to you.
                    </p>
                  </div>
                </section>

                {/* Dispute Resolution */}
                <section id="dispute-resolution" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    11. Dispute Resolution & Governing Law
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
                        11.1. Governing Law
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        These Terms shall be governed by and construed in
                        accordance with applicable laws, without regard to
                        conflict of law provisions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
                        11.2. Informal Resolution
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Before filing a claim, you agree to first contact us at{' '}
                        <a
                          href="mailto:support@refactron.dev"
                          className="text-primary-600 hover:text-primary-700 underline"
                        >
                          support@refactron.dev
                        </a>{' '}
                        to attempt to resolve the dispute informally. We will
                        work in good faith to resolve any disputes within 60
                        days.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-3 tracking-tight">
                        11.3. Binding Arbitration
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        If a dispute cannot be resolved through direct
                        communication, it may be subject to binding arbitration
                        or litigation as required by applicable law. You agree
                        to resolve disputes on an individual basis and waive any
                        right to participate in a class-action lawsuit or
                        class-wide arbitration, to the extent permitted by law.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Modifications */}
                <section id="modifications" className="mb-12 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    12. Modifications to These Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time. We
                    will notify you of material changes by:
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>Posting the updated Terms on this page</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Updating the "Last Updated" date at the top of these
                        Terms
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-600 font-semibold mt-1">
                        •
                      </span>
                      <span>
                        Sending you an email notification (for material changes)
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Your continued use of the Service after such modifications
                    constitutes acceptance of the updated Terms. If you do not
                    agree to the modified Terms, you must stop using the Service
                    and may terminate your account. We encourage you to review
                    these Terms periodically.
                  </p>
                </section>

                {/* Contact */}
                <section id="contact" className="mb-8 scroll-mt-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    13. Contact Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have questions about these Terms of Service, please
                    contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-light text-gray-900 mb-2 tracking-tight">
                          Legal & Support Inquiries
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

export default TermsOfService;
