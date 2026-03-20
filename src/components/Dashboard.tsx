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
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleRepositorySelect = async (repository: Repository) => {
    setIsCreating(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      const apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repository.name,
          githubRepoId: repository.id,
          fullName: repository.full_name,
          cloneUrl: repository.clone_url,
          defaultBranch: repository.default_branch,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create project');
      }

      // Refresh user data or redirect after success
      // For now, we'll just close the selector and ideally the dashboard would show the new project
      setIsRepositorySelectorOpen(false);

      // Optional: Redirect to the project's dashboard if we had a project slug
      // const data = await response.json();
      // if (data.project?.slug) navigate(`/${data.project.slug}/dashboard`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      console.error('[Dashboard] Project creation failed:', err);
    } finally {
      setIsCreating(false);
    }
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

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm max-w-sm mx-auto">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <button
              onClick={() => setIsRepositorySelectorOpen(true)}
              disabled={isCreating}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span>Creating Project...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Create New Project</span>
                </>
              )}
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
