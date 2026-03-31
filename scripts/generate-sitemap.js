const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://refactron.dev';

// Extract slugs from posts.ts via regex — no ts-node needed
const postsFile = fs.readFileSync(
  path.join(__dirname, '../src/data/posts.ts'),
  'utf-8'
);
const slugMatches = [...postsFile.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const blogSlugs = slugMatches.map(m => m[1]);

const staticRoutes = [
  { url: '/',                changefreq: 'weekly',  priority: 1.0 },
  { url: '/blog',            changefreq: 'weekly',  priority: 0.9 },
  { url: '/about',           changefreq: 'monthly', priority: 0.6 },
  { url: '/changelog',       changefreq: 'weekly',  priority: 0.7 },
  { url: '/security',        changefreq: 'monthly', priority: 0.5 },
  { url: '/privacy-policy',  changefreq: 'yearly',  priority: 0.3 },
  { url: '/terms-of-service',changefreq: 'yearly',  priority: 0.3 },
  // blog posts added dynamically below
];

const blogRoutes = blogSlugs.map(slug => ({
  url: `/blog/${slug}`,
  changefreq: 'monthly',
  priority: 0.8,
}));

async function generate() {
  const links = [...staticRoutes, ...blogRoutes];
  const stream = new SitemapStream({ hostname: BASE_URL });
  const xml = await streamToPromise(Readable.from(links).pipe(stream));

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml.toString());
  console.log(
    `✓ Sitemap generated — ${blogSlugs.length} blog posts + ${staticRoutes.length} static routes → public/sitemap.xml`
  );
}

generate().catch(err => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
