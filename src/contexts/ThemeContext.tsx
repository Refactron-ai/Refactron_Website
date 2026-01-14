import React, { useEffect, ReactNode } from 'react';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Always apply dark theme
    const root = document.documentElement;
    root.classList.add('dark');
  }, []);

  return <>{children}</>;
};
