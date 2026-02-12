import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RepositorySelector from './RepositorySelector';
import type { Repository } from '../hooks/useRepositories';
import DashboardLayout from './DashboardLayout';

const Dashboard: React.FC = () => {
  const [isRepositorySelectorOpen, setIsRepositorySelectorOpen] =
    useState(false);
  const location = useLocation();
  const { updateUser } = useAuth();

  // Clean up pending redirect flag and refresh user data when arriving from Stripe
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      localStorage.removeItem('pending_stripe_redirect');

      // Fetch latest user data to reflect plan upgrade
      const refreshUserData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const apiBaseUrl =
            process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
          const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            updateUser(data.user); // Update context with fresh data including new plan
            console.log(
              '[Dashboard] User data refreshed after Stripe payment:',
              data.user.plan
            );
          }
        } catch (error) {
          console.error('[Dashboard] Failed to refresh user data:', error);
        }
      };

      refreshUserData();

      // Remove the query param for cleaner URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location, updateUser]);

  const handleRepositorySelect = (repository: Repository) => {
    console.log('Selected repository:', repository);
    // TODO: Create project with selected repository
    setIsRepositorySelectorOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl text-center"
        >
          {/* Central Logo/Icon */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="relative w-32 h-32 bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Refactron"
                  className="w-16 h-16 opacity-90"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-medium tracking-tight text-white">
              Welcome to Refactron
            </h1>
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Beta
            </span>
          </div>
          <p className="text-neutral-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Create your first project to start analyzing and improving your
            codebase.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <button
              onClick={() => setIsRepositorySelectorOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Project</span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="px-4 bg-[#0a0a0a] text-neutral-600 font-bold">
                  OR
                </span>
              </div>
            </div>

            <a
              href="https://docs.refactron.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-transparent border border-neutral-800 text-white font-medium px-8 py-4 rounded-xl hover:bg-neutral-900 transition-all"
            >
              <BookOpen className="w-5 h-5 text-neutral-400" />
              <span>Read the Documentation</span>
            </a>
          </div>
        </motion.div>

        {/* Repository Selector Modal */}
        <AnimatePresence>
          {isRepositorySelectorOpen && (
            <RepositorySelector
              onClose={() => setIsRepositorySelectorOpen(false)}
              onSelect={handleRepositorySelect}
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
