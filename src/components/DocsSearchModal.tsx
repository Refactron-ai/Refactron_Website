import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: any;
}

interface DocsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
}

const DocsSearchModal: React.FC<DocsSearchModalProps> = ({
  isOpen,
  onClose,
  sections,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter sections based on query
  const filteredSections = sections.filter(
    section =>
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.description.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredSections.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredSections[selectedIndex]) {
            handleSelect(filteredSections[selectedIndex].id);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredSections, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-screen px-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Panel */}
        <div className="inline-block w-full max-w-2xl my-16 text-left align-middle transition-all transform bg-[#0D0D0D] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="relative border-b border-white/10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent border-0 py-4 pl-12 pr-12 text-white placeholder-neutral-500 focus:ring-0 sm:text-sm"
              placeholder="Search documentation..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-white/10 text-neutral-500 hover:text-white transition-colors"
              >
                <span className="sr-only">Close</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 bg-white/5 border border-white/10 rounded">
                  ESC
                </kbd>
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto py-2" ref={listRef}>
            {filteredSections.length > 0 ? (
              <div className="px-2 space-y-1">
                <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Results
                </div>
                {filteredSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => handleSelect(section.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md ${
                        index === selectedIndex
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-neutral-500'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium ${index === selectedIndex ? 'text-white' : 'text-neutral-200'}`}
                      >
                        {section.title}
                      </div>
                      <div className="text-xs text-neutral-500 truncate">
                        {section.description}
                      </div>
                    </div>
                    {index === selectedIndex && (
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-neutral-500">
                {query ? (
                  <>
                    <p className="text-sm">No results found for "{query}"</p>
                    <p className="text-xs mt-1">
                      Try searching for a different keyword
                    </p>
                  </>
                ) : (
                  <>
                    <Command className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Type to search documentation</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-black/20 border border-white/10 rounded text-neutral-400">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-black/20 border border-white/10 rounded text-neutral-400">
                  ↓
                </kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-black/20 border border-white/10 rounded text-neutral-400">
                  ↵
                </kbd>
                <span>to select</span>
              </span>
            </div>
            <div>
              <span className="text-neutral-600">Refactron Docs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsSearchModal;
