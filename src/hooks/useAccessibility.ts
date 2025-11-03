import { useEffect } from 'react';

/**
 * Custom hook to enhance keyboard navigation and accessibility
 */
const useAccessibility = () => {
  useEffect(() => {
    // Skip to main content functionality
    const handleSkipToMain = (e: KeyboardEvent) => {
      // Alt + M to skip to main content
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          (mainContent as HTMLElement).focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Focus visible on tab navigation
    const handleTabNavigation = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('user-is-tabbing');
    };

    window.addEventListener('keydown', handleSkipToMain);
    window.addEventListener('keydown', handleTabNavigation);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleSkipToMain);
      window.removeEventListener('keydown', handleTabNavigation);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

export default useAccessibility;
