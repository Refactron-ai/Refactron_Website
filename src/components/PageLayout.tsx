import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { cn } from '../lib/utils';

type PageLayoutProps = {
  children: React.ReactNode;
  mainClassName?: string;
  wrapperClassName?: string;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  mainClassName = '',
  wrapperClassName = '',
}) => {
  return (
    <div
      className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] flex flex-col ${wrapperClassName}`}
      style={{
        background:
          'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      }}
    >
      <NavigationBar />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn('flex-1 pt-24 sm:pt-28', mainClassName)}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
