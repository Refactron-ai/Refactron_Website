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
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

/**
 * Validates and sanitizes SEO configuration values
 */
const validateSEOConfig = (config: SEOConfig): void => {
  // Validate URLs use HTTPS
  const urlFields: (keyof SEOConfig)[] = [
    'canonical',
    'ogImage',
    'twitterImage',
  ];
  urlFields.forEach(field => {
    const value = config[field];
    if (value && typeof value === 'string' && !value.startsWith('https://')) {
      console.warn(`SEO: ${field} should use HTTPS protocol`);
    }
  });

  // Validate title length (SEO best practice: 50-60 chars, hard limit: 70 chars)
  if (config.title && config.title.length > 70) {
    console.warn('SEO: Title exceeds recommended length of 70 characters');
  }

  // Validate description length (recommended: 150-160 characters)
  if (config.description && config.description.length > 160) {
    console.warn(
      'SEO: Description exceeds recommended length of 160 characters'
    );
  }

  // Validate robots directive
  const validRobotsDirectives = [
    'index',
    'noindex',
    'follow',
    'nofollow',
    'nosnippet',
    'noarchive',
    'noimageindex',
    'notranslate',
    'max-snippet',
    'max-image-preview',
    'max-video-preview',
  ];
  if (config.robots) {
    const directives = config.robots.split(',').map(d => d.trim());
    directives.forEach(directive => {
      // Check if directive starts with any valid prefix (for max-snippet:N format)
      const isValid = validRobotsDirectives.some(
        valid => directive === valid || directive.startsWith(`${valid}:`)
      );
      if (!isValid) {
        console.warn(`SEO: Invalid robots directive: ${directive}`);
      }
    });
  }
};

/**
 * Custom hook for managing SEO meta tags dynamically
 * Updates document title and meta tags on mount, cleans up on unmount
 */
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    // Validate configuration
    validateSEOConfig(config);

    // Store original values for cleanup
    const originalTitle = document.title;
    const originalMeta: { [key: string]: string } = {};
    const createdElements: Element[] = [];
    let createdCanonical: HTMLLinkElement | null = null;

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
        const selectorParts = selector.match(/\[([\w-]+)=["']([^"']+)["']\]/);
        if (selectorParts) {
          element.setAttribute(selectorParts[1], selectorParts[2]);
          element.setAttribute('content', content);
          document.head.appendChild(element);
          createdElements.push(element);
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
      const existingLink = document.querySelector('link[rel="canonical"]');
      if (existingLink) {
        originalMeta['canonical'] = existingLink.getAttribute('href') || '';
        existingLink.setAttribute('href', config.canonical);
      } else {
        const linkElement = document.createElement('link') as HTMLLinkElement;
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', config.canonical);
        document.head.appendChild(linkElement);
        createdCanonical = linkElement;
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
    if (config.twitterImage) {
      updateMetaTag('meta[name="twitter:image"]', config.twitterImage);
    }
    // Add twitter:card meta tag if not present
    if (
      config.twitterTitle ||
      config.twitterDescription ||
      config.twitterImage
    ) {
      updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    }

    // Cleanup function - restore original values
    return () => {
      document.title = originalTitle;

      // Remove created elements
      createdElements.forEach(el => el.remove());
      if (createdCanonical) {
        createdCanonical.remove();
      }

      // Restore original meta values
      Object.entries(originalMeta).forEach(([selector, content]) => {
        if (selector === 'canonical') {
          const linkElement = document.querySelector('link[rel="canonical"]');
          if (linkElement) {
            linkElement.setAttribute('href', content);
          }
        } else {
          const element = document.querySelector(selector);
          if (element) {
            element.setAttribute('content', content);
          }
        }
      });
    };
    // Disable exhaustive-deps: we intentionally list individual config properties
    // instead of the entire config object to avoid unnecessary re-renders when
    // config object reference changes but individual values remain the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.title,
    config.description,
    config.keywords,
    config.ogTitle,
    config.ogDescription,
    config.ogImage,
    config.twitterTitle,
    config.twitterDescription,
    config.twitterImage,
    config.canonical,
    config.robots,
  ]);
};

export default useSEO;
