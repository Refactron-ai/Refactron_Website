
import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Star } from 'lucide-react';
import { ThreeDMarquee } from './ui/3d-marquee';

const RecognitionBadges: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '1K+', icon: Users },
    { label: 'Lines of Code', value: '100K+', icon: TrendingUp },
    { label: 'Satisfaction', value: '4.9/5', icon: Star },
  ];

  const images = [
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
    '/F6S_Top_Company_Software Intelligence_6.png',
  ];

  return (
    <section
      id="recognition"
      className="relative -mt-1 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)]/50 to-[var(--bg-primary)] scroll-mt-24 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-3xl opacity-20 dark:opacity-10 animate-float"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-200 dark:bg-primary-800/20 rounded-full blur-3xl opacity-15 dark:opacity-8 animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-50/30 dark:from-primary-900/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[var(--text-primary)] mb-4 tracking-tight">
            Recognized for Excellence
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-tertiary)] max-w-3xl mx-auto leading-relaxed">
            Trusted by leading organizations and recognized by industry experts
            for innovation in software intelligence
          </p>
        </motion.div>

        {/* 3D Marquee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <ThreeDMarquee images={images} />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="glossy-surface rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-light text-[var(--text-primary)] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--text-tertiary)] font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm sm:text-base text-[var(--text-tertiary)] max-w-2xl mx-auto">
            Join thousands of developers and organizations who trust Refactron
            to transform their legacy code into modern, maintainable solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecognitionBadges;
