import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RepositorySelector from './RepositorySelector';
import type { Repository } from '../hooks/useRepositories';
import DashboardLayout from './DashboardLayout';

interface Project {
  id: string;
  name: string;
  repository_full_name: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [isRepositorySelectorOpen, setIsRepositorySelectorOpen] =
    useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const location = useLocation();
  const { updateUser } = useAuth();

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

  const fetchProjects = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('[Dashboard] Failed to fetch projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
    setIsCreatingProject(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repository.name,
          repository_id: repository.id,
          repository_full_name: repository.full_name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(prev => [data.project, ...prev]);
        setIsRepositorySelectorOpen(false);
      } else {
        const errorData = await response.json();
        console.error(
          '[Dashboard] Project creation failed:',
          errorData.message
        );
      }
    } catch (error) {
      console.error('[Dashboard] Error creating project:', error);
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full p-8 overflow-y-auto">
        {isLoadingProjects ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : projects.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-3xl font-light text-white mb-2">Projects</h1>
                <p className="text-neutral-500">
                  Manage your connected codebases
                </p>
              </div>
              <button
                onClick={() => setIsRepositorySelectorOpen(true)}
                className="flex items-center gap-2 bg-white text-black font-medium px-6 py-2.5 rounded-lg hover:bg-neutral-200 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                      <Github className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono truncate max-w-[180px]">
                        {project.repository_full_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-600">
                      Started {new Date(project.created_at).toLocaleDateString()}
                    </span>
                    <button className="flex items-center gap-1.5 text-sm text-white hover:text-neutral-300 transition-colors group/btn">
                      Dashboard{' '}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
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
                  disabled={isCreatingProject}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50"
                >
                  {isCreatingProject ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  <span>
                    {isCreatingProject ? 'Creating...' : 'Create New Project'}
                  </span>
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
          </div>
        )}

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
