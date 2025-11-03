import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service (e.g., Sentry, LogRocket)
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
      console.error('Production error logged:', error);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <div className="glass-effect rounded-3xl p-8 md:p-12 text-center">
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
              >
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </motion.div>

              {/* Error Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're sorry for the inconvenience. An unexpected error has
                occurred. Our team has been notified and is working to fix the
                issue.
              </p>

              {/* Development Mode - Show Error Details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-red-800 mb-2">
                    Error Details (Development Only):
                  </h3>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-red-700 overflow-auto mt-2">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold shadow-lg hover:bg-primary-600 transition-colors"
                >
                  <RefreshCw size={20} />
                  Try Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <Home size={20} />
                  Go to Homepage
                </motion.button>
              </div>

              {/* Contact Support */}
              <p className="mt-8 text-sm text-gray-600">
                If this problem persists, please{' '}
                <a
                  href="mailto:hello@refactron.dev"
                  className="text-primary-600 hover:text-primary-700 font-semibold underline"
                >
                  contact our support team
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
