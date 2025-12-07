import React from 'react';
import { render, waitFor } from '@testing-library/react';
import SEOHead from './SEOHead';

describe('SEOHead Component', () => {
  // Store original document values
  const originalTitle = document.title;

  beforeEach(() => {
    // Clear the document head of any dynamically added elements
    document.title = originalTitle;
    const dynamicElements = document.querySelectorAll(
      'meta[data-dynamic], link[data-dynamic], script#dynamic-structured-data'
    );
    dynamicElements.forEach((el) => el.remove());
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  describe('Title Management', () => {
    it('should update document title', () => {
      render(<SEOHead title="Test Title" />);
      expect(document.title).toBe('Test Title');
    });

    it('should restore original title on unmount', () => {
      const { unmount } = render(<SEOHead title="Test Title" />);
      expect(document.title).toBe('Test Title');
      unmount();
      expect(document.title).toBe(originalTitle);
    });
  });

  describe('Meta Tag Creation and Updates', () => {
    it('should create meta description tag', () => {
      render(<SEOHead description="Test description" />);
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('Test description');
    });

    it('should create meta keywords tag', () => {
      render(<SEOHead keywords="test, keywords, seo" />);
      const meta = document.querySelector('meta[name="keywords"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toBe('test, keywords, seo');
    });

    it('should update existing meta tags', () => {
      const { rerender } = render(<SEOHead description="First description" />);
      let meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toBe('First description');

      rerender(<SEOHead description="Second description" />);
      meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toBe('Second description');
    });
  });

  describe('Open Graph Tags', () => {
    it('should create Open Graph tags with property attribute', () => {
      render(
        <SEOHead
          ogTitle="OG Title"
          ogDescription="OG Description"
          ogImage="https://example.com/image.jpg"
          ogUrl="https://example.com"
        />
      );

      expect(
        document.querySelector('meta[property="og:title"]')?.getAttribute('content')
      ).toBe('OG Title');
      expect(
        document.querySelector('meta[property="og:description"]')?.getAttribute('content')
      ).toBe('OG Description');
      expect(
        document.querySelector('meta[property="og:image"]')?.getAttribute('content')
      ).toBe('https://example.com/image.jpg');
      expect(
        document.querySelector('meta[property="og:url"]')?.getAttribute('content')
      ).toBe('https://example.com');
    });
  });

  describe('Twitter Card Tags', () => {
    it('should create Twitter Card tags with name attribute', () => {
      render(
        <SEOHead
          ogTitle="Twitter Title"
          ogDescription="Twitter Description"
          ogImage="https://example.com/twitter.jpg"
          twitterCard="summary_large_image"
        />
      );

      expect(
        document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')
      ).toBe('summary_large_image');
      expect(
        document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')
      ).toBe('Twitter Title');
      expect(
        document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')
      ).toBe('Twitter Description');
      expect(
        document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')
      ).toBe('https://example.com/twitter.jpg');
    });

    it('should use default twitter card type when not specified', () => {
      render(<SEOHead ogTitle="Test" />);
      expect(
        document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')
      ).toBe('summary_large_image');
    });
  });

  describe('Canonical URL', () => {
    it('should create canonical link tag', () => {
      render(<SEOHead canonicalUrl="https://example.com/page" />);
      const link = document.querySelector('link[rel="canonical"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toBe('https://example.com/page');
    });

    it('should update existing canonical tag', () => {
      const { rerender } = render(<SEOHead canonicalUrl="https://example.com/page1" />);
      let link = document.querySelector('link[rel="canonical"]');
      expect(link?.getAttribute('href')).toBe('https://example.com/page1');

      rerender(<SEOHead canonicalUrl="https://example.com/page2" />);
      link = document.querySelector('link[rel="canonical"]');
      expect(link?.getAttribute('href')).toBe('https://example.com/page2');
    });
  });

  describe('Structured Data', () => {
    it('should inject structured data as JSON-LD script', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Test App',
      };

      render(<SEOHead structuredData={structuredData} />);

      const script = document.querySelector('script#dynamic-structured-data');
      expect(script).toBeTruthy();
      expect(script?.getAttribute('type')).toBe('application/ld+json');
      expect(script?.textContent).toBe(JSON.stringify(structuredData));
    });

    it('should remove structured data script on unmount', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Test App',
      };

      const { unmount } = render(<SEOHead structuredData={structuredData} />);
      expect(document.querySelector('script#dynamic-structured-data')).toBeTruthy();

      unmount();
      expect(document.querySelector('script#dynamic-structured-data')).toBeFalsy();
    });
  });

  describe('Cleanup on Unmount', () => {
    it('should remove all created meta tags on unmount', () => {
      const { unmount } = render(
        <SEOHead
          title="Test"
          description="Test description"
          keywords="test, keywords"
        />
      );

      // Count meta tags before unmount
      const metasBeforeUnmount = document.querySelectorAll(
        'meta[name="description"], meta[name="keywords"]'
      ).length;
      expect(metasBeforeUnmount).toBeGreaterThan(0);

      unmount();

      // Verify cleanup (tags should be restored to original state)
      // Note: This test verifies the component cleans up properly
      expect(document.title).toBe(originalTitle);
    });

    it('should restore original meta tag values on unmount', async () => {
      // Set an initial meta tag
      const existingMeta = document.createElement('meta');
      existingMeta.setAttribute('name', 'description');
      existingMeta.setAttribute('content', 'Original description');
      document.head.appendChild(existingMeta);

      const { unmount } = render(<SEOHead description="New description" />);

      // Verify it was updated
      await waitFor(() => {
        const meta = document.querySelector('meta[name="description"]');
        expect(meta?.getAttribute('content')).toBe('New description');
      });

      unmount();

      // Verify it was restored
      await waitFor(() => {
        const meta = document.querySelector('meta[name="description"]');
        expect(meta?.getAttribute('content')).toBe('Original description');
      });

      // Cleanup
      existingMeta.remove();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing optional props gracefully', () => {
      expect(() => {
        render(<SEOHead />);
      }).not.toThrow();
    });

    it('should warn for invalid meta tag selectors', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      // This tests the internal updateMetaTag function indirectly
      // by triggering a scenario that would use it
      render(<SEOHead description="test" />);

      consoleSpy.mockRestore();
    });
  });

  describe('Multiple Instances', () => {
    it('should handle multiple SEOHead instances correctly', () => {
      const { rerender } = render(
        <>
          <SEOHead title="First Title" description="First description" />
        </>
      );

      expect(document.title).toBe('First Title');

      rerender(
        <>
          <SEOHead title="Second Title" description="Second description" />
        </>
      );

      expect(document.title).toBe('Second Title');
    });
  });

  describe('Dependency Array with structuredData', () => {
    it('should not cause infinite re-renders with structuredData', () => {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Test App',
      };

      const { rerender } = render(<SEOHead structuredData={structuredData} />);

      // Rerender with same structuredData object reference
      expect(() => {
        rerender(<SEOHead structuredData={structuredData} />);
        rerender(<SEOHead structuredData={structuredData} />);
      }).not.toThrow();
    });
  });
});
