import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

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
      className={`min-h-screen bg-white text-gray-700 flex flex-col ${wrapperClassName}`}
    >
      <NavigationBar />
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 pt-24 sm:pt-28 ${mainClassName}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
