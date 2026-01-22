/**
 * Tests for OAuthCallback component
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate, useSearchParams } from 'react-router-dom';
import OAuthCallback from './OAuthCallback';
import * as oauthUtils from '../utils/oauth';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock OAuth utils
jest.mock('../utils/oauth');

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('OAuthCallback', () => {
  const mockNavigate = jest.fn();
  const mockHandleOAuthCallback = oauthUtils.handleOAuthCallback as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('should show loading state initially', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code&state=test-state'),
    ]);

    mockHandleOAuthCallback.mockImplementation(
      () => new Promise(() => { }) // Never resolves
    );

    renderWithRouter(<OAuthCallback />);

    expect(screen.getByText('Authenticating')).toBeInTheDocument();
    expect(
      screen.getByText('Completing your secure sign in...')
    ).toBeInTheDocument();
  });

  it('should display error when OAuth error parameter is present', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(
        'error=access_denied&error_description=User denied access'
      ),
    ]);

    renderWithRouter(<OAuthCallback />);

    expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    expect(screen.getByText('User denied access')).toBeInTheDocument();
  });

  it('should display error when code or state is missing', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code'), // Missing state
    ]);

    renderWithRouter(<OAuthCallback />);

    expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    expect(
      screen.getByText('Invalid OAuth callback. Missing required parameters.')
    ).toBeInTheDocument();
  });

  it('should display success and redirect on successful callback', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code&state=test-state'),
    ]);

    mockHandleOAuthCallback.mockResolvedValue({
      success: true,
      data: { redirectTo: '/dashboard' },
    });

    renderWithRouter(<OAuthCallback />);

    await waitFor(() => {
      expect(
        screen.getByText('Success')
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText('Redirecting you to the dashboard...')
    ).toBeInTheDocument();

    // Wait for redirect timeout
    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
          replace: true,
        });
      },
      { timeout: 2000 }
    );
  });

  it('should display error message on failed callback', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code&state=test-state'),
    ]);

    mockHandleOAuthCallback.mockResolvedValue({
      success: false,
      error: 'Invalid authentication token',
    });

    renderWithRouter(<OAuthCallback />);

    await waitFor(() => {
      expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    });

    expect(
      screen.getByText('Invalid authentication token')
    ).toBeInTheDocument();
  });

  it('should handle exceptions during callback processing', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code&state=test-state'),
    ]);

    mockHandleOAuthCallback.mockRejectedValue(
      new Error('Network error occurred')
    );

    renderWithRouter(<OAuthCallback />);

    await waitFor(() => {
      expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    });

    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
  });

  it('should only process callback once even if component re-renders', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code&state=test-state'),
    ]);

    mockHandleOAuthCallback.mockResolvedValue({
      success: true,
      data: { redirectTo: '/dashboard' },
    });

    const { rerender } = renderWithRouter(<OAuthCallback />);

    // Force re-render
    rerender(
      <BrowserRouter>
        <OAuthCallback />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Success')
      ).toBeInTheDocument();
    });

    // Should only be called once despite re-render
    expect(mockHandleOAuthCallback).toHaveBeenCalledTimes(1);
  });

  it('should not redirect if component unmounts before timeout', async () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('code=test-code&state=test-state'),
    ]);

    mockHandleOAuthCallback.mockResolvedValue({
      success: true,
      data: { redirectTo: '/dashboard' },
    });

    const { unmount } = renderWithRouter(<OAuthCallback />);

    await waitFor(() => {
      expect(
        screen.getByText('Success')
      ).toBeInTheDocument();
    });

    // Unmount before redirect timeout
    unmount();

    // Wait longer than redirect timeout
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Should not have called navigate
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should format OAuth error without description', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('error=access_denied'),
    ]);

    renderWithRouter(<OAuthCallback />);

    expect(screen.getByText('Authentication Failed')).toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('should provide navigation options on error', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('error=server_error'),
    ]);

    renderWithRouter(<OAuthCallback />);

    const backToLoginButton = screen.getByText('Back to Login');
    const trySignUpButton = screen.getByText('Try Sign Up');

    expect(backToLoginButton).toBeInTheDocument();
    expect(trySignUpButton).toBeInTheDocument();
  });
});
