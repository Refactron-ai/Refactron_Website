import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, CheckCircle, Star } from 'lucide-react';

const ProductReleasePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('refactron-popup-seen');
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Increased delay to let page load first
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Remember that user has seen the popup
    localStorage.setItem('refactron-popup-seen', 'true');
  };

  const handleTryNow = () => {
    window.open('https://pypi.org/project/refactron/', '_blank');
    handleClose();
  };

  const handleViewSource = () => {
    window.open('https://github.com/Refactron-ai/Refactron_lib', '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-1 hover:bg-white/50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Product Release
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mt-1">
                        Refactron Library is Live! 🎉
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We're excited to announce that{' '}
                    <strong>Refactron Library v1.0.0</strong> is now available
                    on PyPI! Start transforming your Python code with AI-powered
                    refactoring today.
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">135</div>
                      <div className="text-xs text-gray-500">Tests</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">84%</div>
                      <div className="text-xs text-gray-500">Coverage</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        v1.0.0
                      </div>
                      <div className="text-xs text-gray-500">Version</div>
                    </div>
                  </div>

                  {/* Installation Command */}
                  <div className="bg-gray-900 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">
                        Installation
                      </span>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText('pip install refactron')
                        }
                        className="text-green-400 hover:text-green-300 text-sm transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <code className="text-green-400 text-sm font-mono">
                      <span className="text-gray-400">$</span> pip install
                      refactron
                    </code>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleTryNow}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      Try Refactron Now
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleViewSource}
                      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      View on GitHub
                    </button>
                  </div>

                  {/* Footer */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Don't show this again •{' '}
                    <button
                      onClick={handleClose}
                      className="text-primary-500 hover:text-primary-600 underline"
                    >
                      Dismiss
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductReleasePopup;
