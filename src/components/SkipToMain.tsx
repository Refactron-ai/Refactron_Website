import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skip to main content link for accessibility
 * Allows keyboard users to quickly navigate to main content
 */
const SkipToMain: React.FC = () => {
  const handleSkip = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      (mainContent as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skipLinkClasses = [
    'sr-only',
    'focus:not-sr-only',
    'focus:absolute',
    'focus:top-4',
    'focus:left-4',
    'focus:z-50',
    'focus:px-6',
    'focus:py-3',
    'focus:bg-primary-500',
    'focus:text-white',
    'focus:rounded-lg',
    'focus:shadow-lg',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-primary-300'
  ].join(' ');

  return (
    <motion.a
      href="#main-content"
      onClick={handleSkip}
      className={skipLinkClasses}
      tabIndex={0}
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipToMain;
