import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import AnnouncementBanner, {
  useAnnouncementBanner,
} from './AnnouncementBanner';
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
  const { visible, dismiss } = useAnnouncementBanner();

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
      {visible && <AnnouncementBanner onDismiss={dismiss} />}
      <NavigationBar bannerVisible={visible} />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          'flex-1',
          visible ? 'pt-32 sm:pt-36' : 'pt-24 sm:pt-28',
          mainClassName
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
