import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

// ─── Edit announcement here ──────────────────────────────────────────────────
const ANNOUNCEMENT = {
  enabled: true,
  label: 'New',
  text: 'Refactron is now an npm package — blast radius, temporal safety & multi-language support',
  href: '/blog/refactron-is-now-a-nodejs-package', // internal path or full URL
  color: '#C2607F',
  // Change this key whenever you update the announcement so it reappears for all users
  storageKey: 'announcement-v1',
};
// ─────────────────────────────────────────────────────────────────────────────

type Props = { onDismiss: () => void };

const AnnouncementBanner: React.FC<Props> = ({ onDismiss }) => {
  const navigate = useNavigate();
  const isExternal = ANNOUNCEMENT.href.startsWith('http');

  const handleClick = () => {
    onDismiss();
    if (isExternal) {
      window.open(ANNOUNCEMENT.href, '_blank', 'noopener noreferrer');
    } else {
      navigate(ANNOUNCEMENT.href);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-9 flex items-center justify-center px-4 z-50"
      style={{ background: ANNOUNCEMENT.color }}
    >
      <button
        onClick={handleClick}
        className="group flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors duration-200 font-space truncate max-w-[calc(100%-2rem)]"
      >
        {ANNOUNCEMENT.label && (
          <span className="hidden sm:inline bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
            {ANNOUNCEMENT.label}
          </span>
        )}
        <span className="truncate">{ANNOUNCEMENT.text}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>

      <button
        onClick={onDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 p-1 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export function useAnnouncementBanner() {
  const [visible, setVisible] = useState(
    () =>
      ANNOUNCEMENT.enabled &&
      sessionStorage.getItem(ANNOUNCEMENT.storageKey) !== 'true'
  );

  const dismiss = () => {
    sessionStorage.setItem(ANNOUNCEMENT.storageKey, 'true');
    setVisible(false);
  };

  return { visible, dismiss };
}

export default AnnouncementBanner;
