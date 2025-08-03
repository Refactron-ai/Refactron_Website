import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, TrendingUp, Code, Rocket } from 'lucide-react';

const WhatWeDoSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Code Refactoring",
      description: "Advanced machine learning algorithms that understand your codebase and suggest intelligent refactoring strategies."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Automatically identify and fix performance bottlenecks, reducing execution time and resource usage."
    },
    {
      icon: Shield,
      title: "Maintainability Improvements",
      description: "Transform complex, hard-to-maintain code into clean, readable, and well-structured solutions."
    },
    {
      icon: TrendingUp,
      title: "Developer Productivity",
      description: "Save hours of manual refactoring with automated suggestions that follow industry best practices."
    },
    {
      icon: Code,
      title: "Legacy Code Modernization",
      description: "Safely modernize outdated codebases while maintaining functionality and improving architecture."
    },
    {
      icon: Rocket,
      title: "Seamless Integration",
      description: "Works with your existing development workflow and integrates with popular IDEs and CI/CD pipelines."
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-100 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            What We Do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Refactron leverages cutting-edge AI technology to transform how developers approach code optimization. 
            We don't just refactor code—we revolutionize the entire development experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 h-full transition-all duration-300 hover:transform hover:scale-105 shadow-sm border border-gray-100 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-12 max-w-4xl mx-auto shadow-sm border border-gray-100">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">
              The Future of Code Optimization
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Imagine a world where every developer has access to an AI assistant that not only understands their code 
              but can intelligently improve it. That's what Refactron brings to the table—a revolutionary approach 
              to code quality that scales with your team and grows with your projects.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Developer Focused</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection; 