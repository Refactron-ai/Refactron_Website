import { useEffect } from 'react';

interface PerformanceMetrics {
  navigationTiming?: PerformanceNavigationTiming;
  paintTiming?: PerformancePaintTiming[];
  resourceTiming?: PerformanceResourceTiming[];
}

/**
 * Custom hook to monitor and report web performance metrics
 * Tracks Core Web Vitals and other performance indicators
 */
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Check if performance API is available
    if (typeof window === 'undefined' || !window.performance) {
      return;
    }

    const reportPerformance = () => {
      const metrics: PerformanceMetrics = {};

      // Navigation Timing
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        metrics.navigationTiming = navigationTiming;

        // Calculate key metrics
        const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
        const domLoad = navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart;
        const windowLoad = navigationTiming.loadEventEnd - navigationTiming.fetchStart;

        if (process.env.NODE_ENV === 'development') {
          console.log('⚡ Performance Metrics:', {
            'Time to First Byte (TTFB)': `${Math.round(ttfb)}ms`,
            'DOM Content Loaded': `${Math.round(domLoad)}ms`,
            'Window Load': `${Math.round(windowLoad)}ms`,
          });
        }

        // In production, send to analytics service
        if (process.env.NODE_ENV === 'production') {
          // Example: Send to Google Analytics
          // gtag('event', 'timing_complete', {
          //   name: 'load',
          //   value: Math.round(windowLoad),
          //   event_category: 'Performance'
          // });
        }
      }

      // Paint Timing
      const paintTiming = performance.getEntriesByType('paint');
      if (paintTiming.length > 0) {
        metrics.paintTiming = paintTiming as PerformancePaintTiming[];

        const fcp = paintTiming.find((entry) => entry.name === 'first-contentful-paint');
        const lcp = paintTiming.find((entry) => entry.name === 'largest-contentful-paint');

        if (process.env.NODE_ENV === 'development' && fcp) {
          console.log('🎨 Paint Metrics:', {
            'First Contentful Paint (FCP)': `${Math.round(fcp.startTime)}ms`,
            'Largest Contentful Paint (LCP)': lcp ? `${Math.round(lcp.startTime)}ms` : 'N/A',
          });
        }
      }

      // Resource Timing (top 5 slowest resources)
      const resourceTiming = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      if (resourceTiming.length > 0) {
        const slowestResources = resourceTiming
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 5);

        if (process.env.NODE_ENV === 'development') {
          console.log('📦 Slowest Resources:', slowestResources.map(r => ({
            name: r.name.split('/').pop(),
            duration: `${Math.round(r.duration)}ms`
          })));
        }
      }
    };

    // Report after page load
    if (document.readyState === 'complete') {
      setTimeout(reportPerformance, 0);
    } else {
      window.addEventListener('load', () => {
        setTimeout(reportPerformance, 0);
      });
    }

    // Web Vitals - Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          if (process.env.NODE_ENV === 'development') {
            console.log('📊 LCP:', `${Math.round(lastEntry.startTime)}ms`);
          }

          // In production, send to analytics
          if (process.env.NODE_ENV === 'production') {
            // Example: Send to analytics service
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;

            if (process.env.NODE_ENV === 'development') {
              console.log('⚡ FID (First Input Delay):', `${Math.round(fid)}ms`);
            }
          });
        });

        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          }

          if (process.env.NODE_ENV === 'development') {
            console.log('📐 CLS (Cumulative Layout Shift):', clsScore.toFixed(3));
          }
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.error('Performance monitoring error:', error);
      }
    }
  }, []);
};

export default usePerformanceMonitoring;
