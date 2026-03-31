import React, { useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import DiscordIcon from '../icons/DiscordIcon';
import XIcon from '../icons/XIcon';
import CookiePreferencesModal from './CookiePreferencesModal';
import { useCookieConsent, CookiePreferences } from '../hooks/useCookieConsent';
import { getApiBaseUrl } from '../utils/urlUtils';

type OverallStatus = 'operational' | 'degraded' | 'outage' | 'loading';

const STATUS_LABEL: Record<OverallStatus, string> = {
  operational: 'All systems operational.',
  degraded: 'Partial degradation.',
  outage: 'Service disruption.',
  loading: 'Checking…',
};

const DOT_COLOR: Record<OverallStatus, string> = {
  operational: 'bg-emerald-400',
  degraded: 'bg-amber-400',
  outage: 'bg-red-400',
  loading: 'bg-neutral-500',
};

const FALLBACK_URL = 'https://status.refactron.dev';

function StatusBadge() {
  const [status, setStatus] = useState<OverallStatus>('loading');
  const [href, setHref] = useState('/status');

  useEffect(() => {
    const apiBase = getApiBaseUrl();
    fetch(`${apiBase}/api/status`)
      .then(r => r.json())
      .then(json => setStatus(json?.data?.overall ?? 'operational'))
      .catch(() => {
        setStatus('operational');
        setHref(FALLBACK_URL);
      });
  }, []);

  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors text-xs text-neutral-400 font-space"
    >
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${DOT_COLOR[status]} ${status === 'operational' ? 'animate-pulse' : ''}`}
      />
      {STATUS_LABEL[status]}
    </a>
  );
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { preferences, savePreferences } = useCookieConsent();
  const [showCookieModal, setShowCookieModal] = useState(false);

  const handleSavePreferences = (newPreferences: CookiePreferences) => {
    savePreferences(newPreferences);
  };

  return (
    <footer className="bg-black text-white py-12 border-t border-neutral-900 font-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand & Social */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Refactron Logo"
                  className="w-6 h-6 flex-shrink-0"
                />
                <h3 className="text-2xl font-bold text-neutral-100">
                  Refactron™
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 text-neutral-400">
              <a
                href="https://x.com/refactron"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/refactron"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Refactron-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/t27EkxHFA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Discord"
              >
                <DiscordIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/#workflows"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="/#pricing"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-of-service"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://docs.refactron.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/case-studies"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="/changelog"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="/status"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="https://cal.com/omsherikar/queries-refactron"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowCookieModal(true)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors text-left"
                  >
                    Cookie Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-neutral-900 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-neutral-500">
            © {currentYear} Refactron™. All rights reserved.
          </p>
          <StatusBadge />
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
        onSave={handleSavePreferences}
        currentPreferences={preferences}
      />
    </footer>
  );
};

export default Footer;
