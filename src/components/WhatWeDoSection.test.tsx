import React from 'react';
import { render, screen } from '@testing-library/react';
import WhatWeDoSection from './WhatWeDoSection';

// Mock framer-motion
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

describe('WhatWeDoSection', () => {
  test('renders the product release announcement', () => {
    render(<WhatWeDoSection />);
    
    expect(screen.getByText(/Refactron Library v1.0.0 is Now Live!/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Release/i)).toBeInTheDocument();
  });

  test('renders feature titles', () => {
    render(<WhatWeDoSection />);
    
    // Check main section heading
    expect(screen.getByText(/AI-Powered Code Refactoring Solutions/i)).toBeInTheDocument();
    
    // Check some feature titles are present
    expect(screen.getAllByText(/AI-Powered Code Refactoring/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Performance Optimization/i)).toBeInTheDocument();
    expect(screen.getByText(/Developer Productivity/i)).toBeInTheDocument();
  });

  test('renders installation command', () => {
    render(<WhatWeDoSection />);
    
    expect(screen.getByText(/pip install refactron/i)).toBeInTheDocument();
  });

  test('displays stats badges', () => {
    render(<WhatWeDoSection />);
    
    expect(screen.getByText(/98 Tests Passing/i)).toBeInTheDocument();
    expect(screen.getByText(/90% Coverage/i)).toBeInTheDocument();
    expect(screen.getByText(/Production Ready/i)).toBeInTheDocument();
  });

  test('has proper semantic structure with section element', () => {
    render(<WhatWeDoSection />);
    
    // Should have a section element
    const sections = screen.getAllByRole('generic');
    expect(sections.length).toBeGreaterThan(0);
  });

  test('displays feature descriptions', () => {
    render(<WhatWeDoSection />);
    
    expect(screen.getByText(/Advanced machine learning algorithms/i)).toBeInTheDocument();
    expect(screen.getByText(/Automatically identify and fix performance bottlenecks/i)).toBeInTheDocument();
  });
});
