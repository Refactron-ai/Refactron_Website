import React, { useEffect, useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItem = {
  label: string;
  target?: string;
  href?: string;
};

const navItems: NavItem[] = [
  { label: 'Home', target: '#home' },
  { label: 'About', href: '/about' },
  { label: 'Recognition', target: '#recognition' },
  { label: 'Solutions', target: '#features' },
  { label: 'Products', href: '/products' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Docs', href: 'https://docs.refactron.dev' },
  { label: 'Login', href: '/login' },
];

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
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
      style={{ willChange: 'width, max-width, margin-top, border-radius' }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled
          ? 'w-[95%] max-w-6xl bg-white/60 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/80 rounded-2xl mt-2'
          : 'w-full bg-white/80 backdrop-blur-md border-b border-white/70 shadow-md shadow-primary-100/60 rounded-none mt-0'
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
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full"
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
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full"
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
              onClick={() => {
                import('../utils/analytics').then(
                  ({ trackConversion, ConversionEvents }) => {
                    trackConversion(ConversionEvents.SIGN_UP_CLICKED, {
                      source: 'navigation_bar',
                    });
                  }
                );
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
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
          <div className="lg:hidden pb-6 flex flex-col gap-3 border-t border-gray-100">
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
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-700 text-sm font-medium"
                  >
                    <span>{item.label}</span>
                    {item.href.startsWith('http') && (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="text-left px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-700 text-sm font-medium"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            <div className="grid gap-2 pt-2">
              <a
                href="/signup"
                onClick={() => {
                  import('../utils/analytics').then(
                    ({ trackConversion, ConversionEvents }) => {
                      trackConversion(ConversionEvents.SIGN_UP_CLICKED, {
                        source: 'mobile_navigation',
                      });
                    }
                  );
                }}
                className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm shadow-lg text-center"
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
