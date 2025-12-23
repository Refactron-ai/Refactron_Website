import React from 'react';

interface LogoProps {
  className?: string;
}

/**
 * Google brand logo for social auth buttons.
 * If you prefer a different asset, replace the URL below.
 */
export const GoogleLogo: React.FC<LogoProps> = ({ className }) => {
  const baseClass = 'h-5 w-5 rounded-sm';
  return (
    <img
      src="https://developers.google.com/identity/images/g-logo.png"
      alt="Google logo"
      loading="lazy"
      className={className ? `${baseClass} ${className}` : baseClass}
    />
  );
};

/**
 * GitHub brand logo for social auth buttons.
 * If you prefer a different asset, replace the URL below.
 */
export const GithubLogo: React.FC<LogoProps> = ({ className }) => {
  const baseClass = 'h-5 w-5 rounded-sm bg-white';
  return (
    <img
      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      alt="GitHub logo"
      loading="lazy"
      className={className ? `${baseClass} ${className}` : baseClass}
    />
  );
};
