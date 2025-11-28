import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Code2, Users, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100 flex items-center justify-center px-4 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        {/* Main Heading */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Icon Animation */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center"
            >
              <Code2 className="w-8 h-8 text-primary-600" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
              }}
              className="w-16 h-16 bg-primary-300 rounded-full flex items-center justify-center"
            >
              <Users className="w-8 h-8 text-primary-600" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
              className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary-600" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">About Refactron</span>
          </h1>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-effect rounded-3xl p-8 md:p-12 mb-8"
        >
          {/* Under Development Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6"
          >
            <Wrench className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 text-sm font-semibold">
              Under Development
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            We're Building Something Amazing
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Our About page is currently under construction. We're crafting a
            detailed story about our mission to revolutionize code refactoring
            with AI-powered tools.
          </p>

          <p className="text-base text-gray-500 mb-8">
            In the meantime, you can explore our{' '}
            <a
              href="https://pypi.org/project/refactron/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Refactron Library
            </a>{' '}
            or check out the{' '}
            <a
              href="https://docs.refactron.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              documentation
            </a>{' '}
            to see what we're all about.
          </p>

          {/* Progress Indicator */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
            ></motion.div>
          </div>
          <p className="text-sm text-gray-500">
            Page completion: Working hard on it!
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-600"
        >
          <p>
            Questions or want to learn more?{' '}
            <a
              href="mailto:hello@refactron.dev"
              className="text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Get in touch with us
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
