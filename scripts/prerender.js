/**
 * Custom pre-rendering script for SEO.
 *
 * Uses puppeteer-core + @sparticuz/chromium so it works on Vercel's
 * build environment (no system Chrome/libnss3 required).
 *
 * After `react-scripts build`, this script:
 *   1. Starts a local static server on the build/ folder
 *   2. Launches headless Chromium (via @sparticuz/chromium)
 *   3. Navigates to each page and waits for React to render
 *   4. Captures the rendered HTML and overwrites the build files
 */

const path = require('path');
const fs = require('fs');
const http = require('http');

// Extract blog slugs from posts.ts via regex (same approach as generate-sitemap.js)
const postsFile = fs.readFileSync(
  path.join(__dirname, '../src/data/posts.ts'),
  'utf-8'
);
const blogSlugs = [...postsFile.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(
  m => m[1]
);

// Pages to pre-render
const PAGES = [
  '/',
  '/blog',
  '/about',
  '/changelog',
  '/security',
  '/privacy-policy',
  '/terms-of-service',
  ...blogSlugs.map(slug => `/blog/${slug}`),
];

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PORT = 45678;

/**
 * Serve the build folder on a local HTTP server.
 * Falls back to index.html for SPA client-side routing.
 */
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Sanitize: extract pathname, resolve relative to BUILD_DIR,
      // and verify the result stays within BUILD_DIR (prevents path traversal)
      const buildDirPrefix = BUILD_DIR + path.sep;
      let requestPath;
      try {
        requestPath = new URL(req.url, `http://localhost:${PORT}`).pathname || '/';
      } catch {
        requestPath = '/';
      }

      const safeRelative = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
      let filePath = path.resolve(BUILD_DIR, safeRelative);

      // Reject any path that escapes BUILD_DIR
      if (!filePath.startsWith(buildDirPrefix) && filePath !== BUILD_DIR) {
        filePath = path.join(BUILD_DIR, 'index.html');
      }

      // If the file doesn't exist or is a directory, serve index.html (SPA fallback)
      if (!fs.existsSync(filePath)) {
        const withIndex = path.join(filePath, 'index.html');
        if (withIndex.startsWith(buildDirPrefix) && fs.existsSync(withIndex)) {
          filePath = withIndex;
        } else {
          filePath = path.join(BUILD_DIR, 'index.html');
        }
      } else if (fs.statSync(filePath).isDirectory()) {
        const withIndex = path.join(filePath, 'index.html');
        if (withIndex.startsWith(buildDirPrefix) && fs.existsSync(withIndex)) {
          filePath = withIndex;
        } else {
          filePath = path.join(BUILD_DIR, 'index.html');
        }
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.map': 'application/json',
        '.txt': 'text/plain',
        '.xml': 'application/xml',
        '.webmanifest': 'application/manifest+json',
      };

      const contentType = mimeTypes[ext] || 'application/octet-stream';

      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`  Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('\n🔍 Pre-rendering pages for SEO...\n');

  // Start local server
  const server = await startServer();

  let browser;
  try {
    const puppeteer = require('puppeteer-core');
    let executablePath;
    let launchArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'];

    const isLinux = process.platform === 'linux';

    if (isLinux) {
      // On Linux (Vercel/CI): use @sparticuz/chromium which bundles all deps
      try {
        const chromium = require('@sparticuz/chromium');
        executablePath = await chromium.executablePath();
        launchArgs = chromium.args;
        console.log('  Using @sparticuz/chromium (Linux)');
      } catch (err) {
        console.error(`  ⚠️  @sparticuz/chromium failed: ${err.message}`);
      }
    }

    if (!executablePath) {
      // Fallback: find system Chrome (macOS local dev, or Linux with Chrome installed)
      const possiblePaths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
      ];
      executablePath = possiblePaths.find((p) => fs.existsSync(p));
    }

    if (!executablePath) {
      console.log('  ⚠️  No Chrome/Chromium found. Skipping pre-rendering.');
      server.close();
      return;
    }

    console.log(`  Chrome: ${executablePath}`);

    browser = await puppeteer.launch({
      executablePath,
      headless: 'new',
      args: launchArgs,
    });

    for (const pagePath of PAGES) {
      const url = `http://localhost:${PORT}${pagePath}`;
      const page = await browser.newPage();

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait a bit for React to finish rendering & animations to settle
        await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

        const html = await page.content();

        // Determine output path
        const outputDir =
          pagePath === '/' ? BUILD_DIR : path.join(BUILD_DIR, pagePath);
        const outputFile = path.join(outputDir, 'index.html');

        // Create directory if needed
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputFile, html);

        // Count content inside <div id="root">
        const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/body>/);
        const contentLen = rootMatch ? rootMatch[1].length : 0;

        console.log(
          `  ✅ ${pagePath} → ${outputFile.replace(BUILD_DIR, 'build')} (${contentLen} chars)`
        );
      } catch (err) {
        console.error(`  ❌ ${pagePath}: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  console.log('\n✨ Pre-rendering complete!\n');
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  // Don't fail the build — pre-rendering is a nice-to-have
  process.exit(0);
});
