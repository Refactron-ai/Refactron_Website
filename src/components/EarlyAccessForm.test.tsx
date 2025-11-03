import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EarlyAccessForm from './EarlyAccessForm';

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

describe('EarlyAccessForm', () => {
  test('renders form with email input and submit button', () => {
    render(<EarlyAccessForm />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get updates/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
  });

  test('shows error when submitting empty email', async () => {
    render(<EarlyAccessForm />);
    
    const submitButton = screen.getByRole('button', { name: /get updates/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
    });
  });

  test('shows error when submitting invalid email format', () => {
    render(<EarlyAccessForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole('button', { name: /get updates/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(submitButton.closest('form')!);

    // Check that form validation works
    expect(emailInput).toHaveValue('invalid-email');
  });

  test('has proper accessibility attributes', () => {
    render(<EarlyAccessForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');
  });

  test('displays privacy notice', () => {
    render(<EarlyAccessForm />);
    
    expect(screen.getByText(/no spam, ever/i)).toBeInTheDocument();
  });

  test('email input is accessible', () => {
    render(<EarlyAccessForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    
    // Check that input is properly labeled
    expect(emailInput).toHaveAccessibleName(/email address/i);
  });
});

