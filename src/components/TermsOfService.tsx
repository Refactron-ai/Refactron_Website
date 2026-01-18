import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Menu, X } from 'lucide-react';
import Footer from './Footer';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'description', title: 'Description of Service' },
  { id: 'registration', title: 'Registration & Accounts' },
  { id: 'user-conduct', title: 'User Conduct' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'payment', title: 'Payment & Subscription' },
  { id: 'termination', title: 'Termination' },
  { id: 'disclaimer', title: 'Disclaimer of Warranties' },
  { id: 'limitation', title: 'Limitation of Liability' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'contact', title: 'Contact Information' },
];

const TermsOfService: React.FC = () => {
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
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Terms of Service
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
                Terms of Service
              </h1>
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <p>Effective Date: December 24, 2025</p>
                <span>•</span>
                <p>Last Updated: December 24, 2025</p>
              </div>
            </div>

            <div className="space-y-16">
              {/* Acceptance */}
              <section id="acceptance" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  1. Acceptance of Terms
                </h2>
                <div className="prose prose-invert max-w-none text-neutral-400">
                  <p className="leading-relaxed mb-4">
                    By accessing or using the Refactron website, platform, and
                    services (collectively, the "Service"), you agree to be
                    bound by these Terms of Service ("Terms"). If you do not
                    agree to these Terms, you may not access or use the Service.
                  </p>
                  <p className="leading-relaxed">
                    These Terms constitute a legally binding agreement between
                    you and Refactron regarding your use of the Service.
                  </p>
                </div>
              </section>

              {/* Description */}
              <section id="description" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  2. Description of Service
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  Refactron provides an AI-powered code refactoring platform
                  that analyzes code and suggests improvements for performance,
                  readability, and security.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-medium mb-3">
                    Service Availability
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    We strive to keep the Service available 24/7 but do not
                    guarantee uninterrupted access. We reserve the right to
                    modify, suspend, or discontinue any part of the Service at
                    any time with or without notice.
                  </p>
                </div>
              </section>

              {/* Registration */}
              <section id="registration" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  3. Registration & Accounts
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-white/10 bg-neutral-900/30">
                    <h3 className="font-medium text-white mb-2">
                      Account Creation
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      To access certain features, you must register for an
                      account. You agree to provide accurate, current, and
                      complete information during the registration process.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10 bg-neutral-900/30">
                    <h3 className="font-medium text-white mb-2">
                      Account Security
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      You are responsible for maintaining the confidentiality of
                      your password and account. You agree to notify us
                      immediately of any unauthorized use of your account.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Conduct */}
              <section id="user-conduct" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  4. User Conduct
                </h2>
                <p className="text-neutral-400 leading-relaxed mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="grid gap-3">
                  {[
                    'Violate any applicable laws or regulations.',
                    'Infringe upon the rights of others, including intellectual property rights.',
                    'Upload malicious code, viruses, or harmful software.',
                    'Interfere with or disrupt the integrity or performance of the Service.',
                    'Attempt to gain unauthorized access to the Service or related systems.',
                    'Reverse engineer or attempt to extract the source code of the Service.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Intellectual Property */}
              <section
                id="intellectual-property"
                className="scroll-mt-24 space-y-6"
              >
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  5. Intellectual Property
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">
                      Our Rights
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      The Service, including its "look and feel" (e.g., text,
                      graphics, images, logos), proprietary content, information
                      and other materials, are protected under copyright,
                      trademark and other intellectual property laws.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">
                      Your Rights
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      You retain all rights to the source code you upload to the
                      Service. We claim no intellectual property rights over the
                      material you provide to the Service.
                    </p>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section id="payment" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  6. Payment & Subscription
                </h2>
                <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-6">
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">Fees:</strong> Some parts
                        of the Service are billed on a subscription basis
                        ("Subscription(s)"). You will be billed in advance on a
                        recurring and periodic basis ("Billing Cycle").
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">Changes:</strong> We
                        reserve the right to change our pricing at any time. Any
                        price changes will become effective at the end of the
                        then-current Billing Cycle.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                      <span className="text-neutral-400 leading-relaxed">
                        <strong className="text-white">Refunds:</strong> Except
                        when required by law, paid Subscription fees are
                        non-refundable.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Termination */}
              <section id="termination" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  7. Termination
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  We may terminate or suspend your account and bar access to the
                  Service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of the
                  Terms.
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  If you wish to terminate your account, you may simply
                  discontinue using the Service or delete your account from the
                  settings page.
                </p>
              </section>

              {/* Disclaimer */}
              <section id="disclaimer" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  8. Disclaimer of Warranties
                </h2>
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
                  <p className="text-red-200/80 leading-relaxed text-sm uppercase tracking-wide font-medium mb-2">
                    Disclaimer
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm">
                    THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
                    BASIS. REFACTRON EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY
                    KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED
                    TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE AND NON-INFRINGEMENT.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="limitation" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  9. Limitation of Liability
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  IN NO EVENT SHALL REFACTRON, ITS DIRECTORS, EMPLOYEES,
                  PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE
                  DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA,
                  USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR
                  ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                </p>
              </section>

              {/* Indemnification */}
              <section id="indemnification" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  10. Indemnification
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  You agree to defend, indemnify and hold harmless Refactron and
                  its licensee and licensors, and their employees, contractors,
                  agents, officers and directors, from and against any and all
                  claims, damages, obligations, losses, liabilities, costs or
                  debt, and expenses (including but not limited to attorney's
                  fees), resulting from or arising out of a) your use and access
                  of the Service, or b) a breach of these Terms.
                </p>
              </section>

              {/* Changes */}
              <section id="changes" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  11. Changes to Terms
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  12. Governing Law
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  These Terms shall be governed and construed in accordance with
                  the laws of the United States, without regard to its conflict
                  of law provisions. Our failure to enforce any right or
                  provision of these Terms will not be considered a waiver of
                  those rights.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24 space-y-6">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Contact Information
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <p className="text-neutral-400 mb-6">
                    If you have any questions about these Terms, please contact
                    us:
                  </p>
                  <a
                    href="mailto:legal@refactron.dev"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    legal@refactron.dev
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

export default TermsOfService;
