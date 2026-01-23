import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Layers,
  Users,
  AlertCircle,
  Search,
  Terminal,
  FlaskConical,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Plus,
  LogOut,
  Bot,
  Menu,
  Key,
  CreditCard,
  Github,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        orgDropdownRef.current &&
        !orgDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOrgDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Layers, label: 'Sessions' },
    { icon: Users, label: 'Users' },
    { icon: AlertCircle, label: 'Issues' },
    { icon: Search, label: 'Research Room' },
    { icon: Terminal, label: 'Codebase Intelligence' },
    { icon: FlaskConical, label: 'Experiments' },
  ];

  const formatOrgName = (name: string | null | undefined) => {
    if (!name) return "User's Organization";
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return `${capitalized}'s Organization`;
  };

  const formattedOrgName = formatOrgName(user?.organizationName);

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

  return (
    <div className="flex h-screen bg-black text-white font-space overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? 64 : 240 }}
        className="flex flex-col border-r border-neutral-800 bg-black z-20"
      >
        {/* Logo Section */}
        <div
          className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!isSidebarCollapsed && (
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.png" alt="Refactron" className="w-6 h-6" />
              <span className="text-lg font-medium tracking-tight">
                Refactron
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1 hover:bg-neutral-800 rounded-md transition-colors text-neutral-500"
          >
            {isSidebarCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-4 h-4 rotate-180" />
            )}
          </button>
        </div>

        {/* Org Selector */}
        {!isSidebarCollapsed && (
          <div className="px-4 mb-6 relative" ref={orgDropdownRef}>
            <button
              onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all group ${isOrgDropdownOpen ? 'bg-neutral-900' : 'hover:bg-neutral-900'}`}
            >
              <div className="flex items-center gap-1 overflow-hidden">
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    {formattedOrgName}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-transform duration-200 ${isOrgDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isOrgDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-full left-4 right-4 mt-1 bg-[#1a1c1e] border border-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-1">
                    <button className="w-full flex items-center justify-between p-2 bg-neutral-800/50 rounded-lg group transition-colors">
                      <span className="text-xs font-medium text-white truncate">
                        {formattedOrgName}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 ml-2" />
                    </button>

                    <div className="h-px bg-neutral-800 my-1" />

                    <button className="w-full flex items-center gap-2 p-2 hover:bg-neutral-800/50 rounded-lg group transition-colors text-neutral-400 hover:text-white">
                      <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-medium whitespace-nowrap">
                        Manage Organizations
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 px-3 space-y-8 overflow-y-auto scrollbar-hide">
          {/* Agents Section */}
          <div>
            {!isSidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                Agents
              </p>
            )}
            <button className="w-full flex items-center justify-between p-2 hover:bg-neutral-900 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                {!isSidebarCollapsed && (
                  <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                    Agents
                  </span>
                )}
              </div>
              {!isSidebarCollapsed && (
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              )}
            </button>
          </div>

          {/* Management Section */}
          <div>
            {!isSidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">
                Management
              </p>
            )}
            <div className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors group ${isSidebarCollapsed ? 'justify-center' : ''} ${
                    item.active
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${item.active ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}
                  />
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2 border-t border-neutral-800">
          <button
            onClick={user?.githubConnected ? undefined : handleGitHubConnect}
            disabled={user?.githubConnected}
            className={`w-full flex items-center p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white rounded-lg transition-colors group ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} ${user?.githubConnected ? 'cursor-default' : ''}`}
            title={
              isSidebarCollapsed
                ? `GitHub: ${user?.githubConnected ? 'Connected' : 'Not connected'}`
                : undefined
            }
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 group-hover:text-white" />
              {!isSidebarCollapsed && (
                <span className="text-sm font-medium">GitHub</span>
              )}
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[10px] font-medium text-neutral-600 group-hover:text-neutral-400">
                {user?.githubConnected ? 'Connected' : 'Not connected'}
              </span>
            )}
          </button>

          {!isSidebarCollapsed ? (
            <a
              href="https://docs.refactron.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white rounded-lg transition-colors group"
            >
              <BookOpen className="w-5 h-5 group-hover:text-white" />
              <span className="text-sm font-medium">Docs</span>
            </a>
          ) : (
            <a
              href="https://docs.refactron.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center p-2 text-neutral-400 hover:text-white transition-colors"
              title="Docs"
            >
              <BookOpen className="w-5 h-5" />
            </a>
          )}

          <div
            className={isSidebarCollapsed ? '' : 'pt-2 relative'}
            ref={profileDropdownRef}
          >
            {isSidebarCollapsed ? (
              <button
                onClick={logout}
                className="w-full flex justify-center p-2 text-neutral-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all group ${isProfileDropdownOpen ? 'bg-neutral-900' : 'hover:bg-neutral-900'}`}
                >
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs font-medium truncate text-neutral-300">
                      {user?.email}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-transform duration-200 ml-2 flex-shrink-0 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1c1e] border border-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-1">
                        <div className="px-3 py-2 mb-1">
                          <p className="text-[10px] text-neutral-500 font-medium mb-0.5">
                            Signed in as
                          </p>
                          <p className="text-xs font-bold text-white truncate">
                            {user?.email}
                          </p>
                        </div>

                        <div className="h-px bg-neutral-800 my-1" />

                        <div className="space-y-0.5">
                          <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-800/50 rounded-lg group transition-colors text-neutral-400 hover:text-white">
                            <span className="text-xs font-medium">
                              Organizations
                            </span>
                          </button>
                          <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-800/50 rounded-lg group transition-colors text-neutral-400 hover:text-white">
                            <Key className="w-4 h-4" />
                            <span className="text-xs font-medium">
                              API Keys
                            </span>
                          </button>
                          <button className="w-full flex items-center gap-3 p-2 hover:bg-neutral-800/50 rounded-lg group transition-colors text-neutral-400 hover:text-white">
                            <CreditCard className="w-4 h-4" />
                            <span className="text-xs font-medium">Billing</span>
                          </button>
                        </div>

                        <div className="h-px bg-neutral-800 my-1" />

                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 p-2 hover:bg-red-500/10 rounded-lg group transition-colors text-neutral-400 hover:text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-xs font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-8 bg-[#0a0a0a] overflow-y-auto">
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

          <h1 className="text-4xl font-medium mb-4 tracking-tight">
            Welcome to Refactron
          </h1>
          <p className="text-neutral-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Create your first project to start analyzing and improving your
            codebase.
          </p>

          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all">
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
      </main>
    </div>
  );
};

export default Dashboard;
