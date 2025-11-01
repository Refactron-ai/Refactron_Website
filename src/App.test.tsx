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
      animate,
      initial,
      exit,
      transition,
      whileInView,
      viewport,
      variants,
      layout,
      layoutId,
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
