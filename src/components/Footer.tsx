import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Refactron-ai',
      color: 'hover:text-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/refactron',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:hello@refactron.us.kg',
      color: 'hover:text-primary-600'
    }
  ];

  return (
    <footer className="relative bg-white border-t border-gray-200">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-6">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">Refactron</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
                Refactor. Optimize. Automate. 
                Building the future of developer productivity with AI-powered code optimization.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for developers</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Connect With Us</h4>
              <div className="flex justify-center md:justify-start gap-4 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center md:text-left">
                Follow us for updates and insights
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Get In Touch</h4>
              <div className="space-y-4 mb-6 max-w-sm">
                <a 
                  href="mailto:hello@refactron.us.kg"
                  className="block text-primary-600 hover:text-primary-700 transition-colors duration-300 text-base font-medium"
                >
                  hello@refactron.us.kg
                </a>
                <p className="text-gray-600 text-sm">
                  Ready to revolutionize your code?
                </p>
                <p className="text-xs text-gray-500">
                  We're here to help you optimize your development workflow.
                </p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Our Location</h4>
              <div className="space-y-4 mb-6 max-w-sm">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <div className="text-center md:text-left">
                    <p className="text-gray-600 font-medium">Bengaluru, India</p>
                    <p className="text-sm text-gray-500">Asia Pacific</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Global team, local impact
                </p>
                <p className="text-xs text-gray-500">
                  Serving developers worldwide
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-6 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-center md:text-left">
                <p className="text-gray-500 text-sm">
                  © {currentYear} Refactron. All rights reserved.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-sm text-gray-500">
                <a href="/privacy-policy" className="hover:text-primary-600 transition-colors duration-300">Privacy Policy</a>
                <span className="hidden md:inline">•</span>
                <a href="/terms-of-service" className="hover:text-primary-600 transition-colors duration-300">Terms of Service</a>
                <span className="hidden md:inline">•</span>
                <span>Refactron is currently in development</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-400">
                Join our early access program to be notified when we launch.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer; 
