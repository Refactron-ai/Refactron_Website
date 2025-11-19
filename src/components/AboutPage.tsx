import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center gap-4">
      <p className="text-sm uppercase tracking-wide text-primary-500">About Refactron</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        This page is under development.
      </h1>
      <p className="text-base text-gray-600 max-w-2xl">
        We’re crafting a detailed story about our mission, team, and roadmap. Check back soon for
        updates, or reach us any time at{' '}
        <a href="mailto:hello@refactron.dev" className="text-primary-600 font-semibold">
          hello@refactron.dev
        </a>
        .
      </p>
    </div>
  );
};

export default AboutPage;

