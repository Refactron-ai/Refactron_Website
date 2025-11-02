import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-16 h-16 bg-primary-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-16 h-16 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-16 h-16 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-effect rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold shadow-lg hover:bg-primary-600 transition-colors"
              >
                <Home size={20} />
                Go to Homepage
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold border-2 border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <ArrowLeft size={20} />
              Go Back
            </motion.button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
                Home
              </Link>
              <span className="text-gray-300">•</span>
              <a 
                href="https://pypi.org/project/refactron/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Refactron Library
              </a>
              <span className="text-gray-300">•</span>
              <a 
                href="https://docs.refactron.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Documentation
              </a>
              <span className="text-gray-300">•</span>
              <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700 font-medium">
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-gray-600"
        >
          Need help?{' '}
          <a
            href="mailto:hello@refactron.dev"
            className="text-primary-600 hover:text-primary-700 font-semibold underline"
          >
            Contact our support team
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
