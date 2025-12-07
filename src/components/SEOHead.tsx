import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

/**
 * SEOHead - Component for managing dynamic meta tags for SEO
 * This component updates meta tags when mounted and cleans up when unmounted
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonicalUrl,
  structuredData,
}) => {
  useEffect(() => {
    // Store original values
    const originalTitle = document.title;
    const metaTags: { element: Element; attribute: string; value: string }[] =
      [];

    // Update title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tag
    const updateMetaTag = (
      selector: string,
      content: string,
      property = false
    ) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(selector);

      if (element) {
        const originalValue = element.getAttribute('content') || '';
        metaTags.push({ element, attribute: 'content', value: originalValue });
        element.setAttribute('content', content);
      } else {
        // Create new meta tag if it doesn't exist
        element = document.createElement('meta');
        element.setAttribute(attribute, selector.replace(/\[.*?=["']|["']\]/g, ''));
        element.setAttribute('content', content);
        document.head.appendChild(element);
        metaTags.push({ element, attribute: 'remove', value: '' });
      }
    };

    // Update description
    if (description) {
      updateMetaTag('meta[name="description"]', description);
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', keywords);
    }

    // Update Open Graph tags
    if (ogTitle) {
      updateMetaTag('meta[property="og:title"]', ogTitle, true);
    }

    if (ogDescription) {
      updateMetaTag('meta[property="og:description"]', ogDescription, true);
    }

    if (ogImage) {
      updateMetaTag('meta[property="og:image"]', ogImage, true);
    }

    if (ogUrl) {
      updateMetaTag('meta[property="og:url"]', ogUrl, true);
    }

    // Update Twitter tags
    if (ogTitle) {
      updateMetaTag('meta[property="twitter:title"]', ogTitle, true);
    }

    if (ogDescription) {
      updateMetaTag('meta[property="twitter:description"]', ogDescription, true);
    }

    if (ogImage) {
      updateMetaTag('meta[property="twitter:image"]', ogImage, true);
    }

    // Update canonical URL
    if (canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (linkElement) {
        const originalHref = linkElement.getAttribute('href') || '';
        metaTags.push({
          element: linkElement,
          attribute: 'href',
          value: originalHref,
        });
        linkElement.setAttribute('href', canonicalUrl);
      } else {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        linkElement.setAttribute('href', canonicalUrl);
        document.head.appendChild(linkElement);
        metaTags.push({ element: linkElement, attribute: 'remove', value: '' });
      }
    }

    // Add structured data
    let scriptElement: HTMLScriptElement | null = null;
    if (structuredData) {
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.text = JSON.stringify(structuredData);
      scriptElement.id = 'dynamic-structured-data';
      document.head.appendChild(scriptElement);
    }

    // Cleanup function
    return () => {
      // Restore original title
      document.title = originalTitle;

      // Restore or remove meta tags
      metaTags.forEach(({ element, attribute, value }) => {
        if (attribute === 'remove') {
          element.remove();
        } else {
          element.setAttribute(attribute, value);
        }
      });

      // Remove structured data script
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    canonicalUrl,
    structuredData,
  ]);

  return null;
};

export default SEOHead;
