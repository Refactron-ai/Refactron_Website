import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { cn } from '../lib/utils';

type PageLayoutProps = {
  children: React.ReactNode;
  mainClassName?: string;
  wrapperClassName?: string;
  transparentBg?: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  mainClassName = '',
  wrapperClassName = '',
  transparentBg = false,
}) => {
  return (
    <div
      className={`min-h-screen text-[var(--text-secondary)] flex flex-col ${!transparentBg ? 'bg-[var(--bg-primary)]' : ''} ${wrapperClassName}`}
      style={
        transparentBg
          ? { background: 'transparent' }
          : {
              background:
                'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
            }
      }
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
