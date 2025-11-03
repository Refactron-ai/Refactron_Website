import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  '@vercel/analytics/react',
  () => ({
    Analytics: () => null,
  }),
  { virtual: true }
);

jest.mock('framer-motion', () => {
  const React = require('react');

  const sanitizeProps = (props: Record<string, unknown>) => {
    const {
      animate: _animate,
      initial: _initial,
      exit: _exit,
      transition: _transition,
      whileInView: _whileInView,
      viewport: _viewport,
      variants: _variants,
      layout: _layout,
      layoutId: _layoutId,
      ...domProps
    } = props;
    return domProps;
  };

  return {
    __esModule: true,
    motion: new Proxy(
      {},
      {
        get: (_: unknown, tag: string) =>
          React.forwardRef(
            ({ children, ...rest }: any, ref: React.Ref<HTMLElement>) =>
              React.createElement(
                tag,
                { ref, ...sanitizeProps(rest) },
                children
              )
          ),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

test('renders Refactron hero headline', () => {
  render(<App />);
  const headline = screen.getByRole('heading', {
    name: /AI-Powered Code Refactoring/i,
    level: 1,
  });
  expect(headline).toBeInTheDocument();
});
