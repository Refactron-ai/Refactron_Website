import React, { useEffect, useState, useRef } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  createTrackingClickHandler,
  ConversionEvents,
} from '../utils/analytics';
import ShimmerButton from './ui/shimmer-button';

type NavItem = {
  label: string;
  target?: string;
  href?: string;
};

const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', target: '#pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Docs', href: 'https://docs.refactron.dev' },
  { label: 'Login', href: '/login' },
];

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down & past threshold
      } else {
        setIsVisible(true); // Scrolling up
      }

      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTarget = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleItemClick = (item: NavItem) => {
    if (item.target) {
      // If not on home page, navigate to home first then scroll
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          scrollToTarget(item.target!);
        }, 100);
      } else {
        scrollToTarget(item.target);
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      style={{
        willChange: 'width, max-width, margin-top, border-radius',
        boxShadow: isScrolled
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.95), 0 4px 6px -2px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.9), 0 2px 4px -1px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isVisible ? 'translate-y-0' : '-translate-y-[200%]'
      } ${
        isScrolled
          ? 'w-[90%] max-w-5xl bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-lg rounded-2xl mt-2 opacity-100'
          : 'w-[95%] max-w-6xl bg-[rgba(10,10,10,0)] backdrop-blur-none border-transparent shadow-none rounded-2xl mt-2 opacity-100'
      }`}
    >
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 pl-2 sm:pl-4 cursor-pointer"
            aria-label="Go to homepage"
          >
            <img src="/logo.png" alt="Refactron logo" className="h-8 w-auto" />
            <span className="sr-only">Refactron</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map(item =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="px-4 py-2 text-sm font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors rounded-full font-space"
                >
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    {item.href.startsWith('http') && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </span>
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors rounded-full font-space"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center justify-end gap-3 ml-auto pl-4 sm:pl-6 pr-2">
            <a
              href="/signup"
              onClick={createTrackingClickHandler(
                ConversionEvents.SIGN_UP_CLICKED,
                { source: 'navigation_bar' },
                { href: '/signup' }
              )}
            >
              <ShimmerButton
                className="shadow-lg h-10 px-6 text-black border-black/10"
                background="#f5f5f5"
                shimmerColor="rgba(0,0,0,0.2)"
              >
                <span className="text-sm font-medium text-black font-space">
                  Sign Up
                </span>
              </ShimmerButton>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] transition"
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 flex flex-col gap-3 border-t border-[var(--border-primary)]">
            <div className="pt-4 grid gap-2">
              {navItems.map(item =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[var(--surface-elevated)] shadow-sm border border-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium font-space"
                  >
                    <span>{item.label}</span>
                    {item.href.startsWith('http') && (
                      <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
                    )}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="text-left px-4 py-3 rounded-2xl bg-[var(--surface-elevated)] shadow-sm border border-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium font-space"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            <div className="grid gap-2 pt-2">
              <a
                href="/signup"
                onClick={createTrackingClickHandler(
                  ConversionEvents.SIGN_UP_CLICKED,
                  { source: 'mobile_navigation' },
                  { href: '/signup' }
                )}
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm shadow-lg text-center font-space"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
