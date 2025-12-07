import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical?: string;
  robots?: string;
}

/**
 * Custom hook for managing SEO meta tags dynamically
 * Updates document title and meta tags on mount, cleans up on unmount
 */
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Store original values for cleanup
    const originalTitle = document.title;
    const originalMeta: { [key: string]: string } = {};

    // Update document title
    document.title = config.title;

    // Helper function to update meta tag
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (element) {
        originalMeta[selector] = element.getAttribute('content') || '';
        element.setAttribute('content', content);
      } else {
        // Create meta tag if it doesn't exist
        element = document.createElement('meta');
        const selectorParts = selector.match(/\[(.*?)=['"](.*)["']\]/);
        if (selectorParts) {
          element.setAttribute(selectorParts[1], selectorParts[2]);
          element.setAttribute('content', content);
          document.head.appendChild(element);
        }
      }
    };

    // Update description
    if (config.description) {
      updateMetaTag('meta[name="description"]', config.description);
    }

    // Update keywords
    if (config.keywords) {
      updateMetaTag('meta[name="keywords"]', config.keywords);
    }

    // Update robots
    if (config.robots) {
      updateMetaTag('meta[name="robots"]', config.robots);
    }

    // Update canonical URL
    if (config.canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (linkElement) {
        originalMeta['canonical'] = linkElement.getAttribute('href') || '';
        linkElement.setAttribute('href', config.canonical);
      } else {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', config.canonical);
        document.head.appendChild(linkElement);
      }
    }

    // Update Open Graph tags
    if (config.ogTitle) {
      updateMetaTag('meta[property="og:title"]', config.ogTitle);
    }
    if (config.ogDescription) {
      updateMetaTag('meta[property="og:description"]', config.ogDescription);
    }
    if (config.ogImage) {
      updateMetaTag('meta[property="og:image"]', config.ogImage);
      updateMetaTag('meta[property="og:image:secure_url"]', config.ogImage);
    }

    // Update Twitter tags (use name attribute, not property)
    if (config.twitterTitle) {
      updateMetaTag('meta[name="twitter:title"]', config.twitterTitle);
    }
    if (config.twitterDescription) {
      updateMetaTag(
        'meta[name="twitter:description"]',
        config.twitterDescription
      );
    }

    // Cleanup function - restore original values
    return () => {
      document.title = originalTitle;
      Object.entries(originalMeta).forEach(([selector, content]) => {
        if (selector === 'canonical') {
          const linkElement = document.querySelector('link[rel="canonical"]');
          if (linkElement && content) {
            linkElement.setAttribute('href', content);
          }
        } else {
          const element = document.querySelector(selector);
          if (element && content) {
            element.setAttribute('content', content);
          }
        }
      });
    };
  }, [
    config.title,
    config.description,
    config.keywords,
    config.ogTitle,
    config.ogDescription,
    config.ogImage,
    config.twitterTitle,
    config.twitterDescription,
    config.canonical,
    config.robots,
  ]);
};

export default useSEO;
