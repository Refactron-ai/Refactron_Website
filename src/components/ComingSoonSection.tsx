import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Sparkles } from 'lucide-react';

const ComingSoonSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date to 30 days from now
  const launchDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white relative">
      {/* Background Effects - Hidden on mobile */}
      <div className="absolute inset-0">
        <div className="hidden sm:block absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="hidden sm:block absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
            <span className="text-primary-600 font-medium text-sm sm:text-base">Something Big is Coming...</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-center text-gray-900"
        >
          <span className="gradient-text">Coming Soon</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 sm:mb-16 max-w-3xl mx-auto text-center leading-relaxed px-2"
        >
          We're working tirelessly to bring you the future of code optimization. 
          Get ready to experience AI-powered refactoring like never before.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
            <span className="text-primary-600 font-medium text-base sm:text-lg">Launch Countdown</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What to Expect Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">What to Expect</h3>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Beta access for early adopters</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Exclusive feature previews</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Direct feedback integration</span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Priority support access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Special launch pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-gray-700">Community access</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonSection; 