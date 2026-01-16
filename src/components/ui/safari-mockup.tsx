import React from 'react';
import { cn } from '../../lib/utils';

interface SafariMockupProps {
  url?: string;
  src?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SafariMockup: React.FC<SafariMockupProps> = ({
  url = 'refactron.dev',
  src,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative w-full rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden',
        className
      )}
    >
      {/* Safari Header */}
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-3">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 mx-4">
          <div className="flex items-center gap-2 rounded-md bg-neutral-800 px-3 py-1.5">
            <svg
              className="h-4 w-4 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-sm text-neutral-400 font-mono">{url}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-black">
        {src ? (
          <img
            src={src}
            alt="Safari mockup content"
            className="w-full h-auto"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
