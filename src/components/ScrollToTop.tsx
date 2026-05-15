import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll the window to the top whenever the route pathname changes.
 *
 * React Router does not reset scroll position on navigation by default,
 * so links from a deep page (e.g. /research) into another page (e.g.
 * /research/perf-01) inherit the scroll offset of the page that was just
 * left. Mount this component once inside <Router> to fix that.
 *
 * If the URL contains a `#hash` we leave scroll alone so in-page anchors
 * keep working.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    // Use 'auto' (instant) — 'smooth' looks broken on long pages because the
    // browser scrolls past content before the new page has finished mounting.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
