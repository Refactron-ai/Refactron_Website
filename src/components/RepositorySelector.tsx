import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useRepositories, Repository } from '../hooks/useRepositories';
import {
  Github,
  Search,
  Lock,
  Globe,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';

interface RepositorySelectorProps {
  onClose: () => void;
  onSelect: (repository: Repository) => void;
}

const RepositorySelector: React.FC<RepositorySelectorProps> = ({
  onClose,
  onSelect,
}) => {
  const { user } = useAuth();
  const { repositories, loading, error } = useRepositories();
  const [searchQuery, setSearchQuery] = useState('');

  const handleGitHubConnect = async () => {
    try {
      const { initiateOAuth } = await import('../utils/oauth');
      await initiateOAuth('github', 'connect', {
        redirectUri: `${window.location.origin}/auth/callback`,
      });
    } catch (error) {
      console.error('Failed to initiate GitHub connection:', error);
    }
  };

  const filteredRepositories = repositories.filter(
    repo =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If GitHub is not connected, show connection prompt
  if (!user?.githubConnected) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Github className="w-8 h-8 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Connect GitHub</h2>
            <p className="text-neutral-400 mb-6">
              To create a project, you need to connect your GitHub account
              first.
            </p>
            <button
              onClick={handleGitHubConnect}
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-neutral-200 transition-all"
            >
              <Github className="w-5 h-5" />
              <span>Connect GitHub</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[80vh] flex flex-col relative"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium">Select Repository</h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        {/* Repository List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filteredRepositories.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              {searchQuery
                ? 'No repositories found matching your search.'
                : 'No repositories found.'}
            </div>
          )}

          {!loading && !error && filteredRepositories.length > 0 && (
            <div className="space-y-2">
              {filteredRepositories.map(repo => (
                <button
                  key={repo.id}
                  onClick={() => onSelect(repo)}
                  className="w-full p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-xl transition-all text-left group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white truncate group-hover:text-white">
                          {repo.name}
                        </h3>
                        {repo.private ? (
                          <Lock className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                        ) : (
                          <Globe className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-sm text-neutral-400 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        {repo.language && (
                          <span className="text-xs text-neutral-500">
                            {repo.language}
                          </span>
                        )}
                        <span className="text-xs text-neutral-600">
                          Updated{' '}
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RepositorySelector;
