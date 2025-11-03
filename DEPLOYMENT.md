# Production Deployment Guide

This guide covers everything you need to deploy Refactron website to production.

## Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Copy `.env.example` to `.env` and fill in all required values
- [ ] Configure EmailJS credentials
- [ ] Set up analytics (Google Analytics, Vercel Analytics)
- [ ] Configure error monitoring (Sentry, LogRocket - optional)
- [ ] Verify all environment variables are set

### 2. Security
- [ ] Review and update Content Security Policy in `public/_headers`
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Configure security headers
- [ ] Review CORS settings if you have a backend API
- [ ] Ensure no secrets are committed to the repository
- [ ] Enable Dependabot for security updates

### 3. Performance
- [ ] Run `npm run build` and check bundle size
- [ ] Optimize images (already optimized)
- [ ] Enable compression (handled by hosting platform)
- [ ] Configure caching headers (in `public/_headers`)
- [ ] Test loading speed with Lighthouse

### 4. SEO
- [ ] Update `public/index.html` meta tags with correct URLs
- [ ] Update `public/sitemap.xml` with correct domain
- [ ] Update `public/robots.txt` with correct domain
- [ ] Verify structured data (JSON-LD) is correct
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph images are accessible

### 5. Testing
- [ ] Run `npm test` to ensure all tests pass
- [ ] Test all pages and routes
- [ ] Test form submissions
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test error boundaries and 404 page
- [ ] Verify cookie consent functionality
- [ ] Test all external links

### 6. Analytics & Monitoring
- [ ] Set up Google Analytics (optional)
- [ ] Configure Vercel Analytics (automatic on Vercel)
- [ ] Set up error monitoring (Sentry - optional)
- [ ] Configure uptime monitoring (UptimeRobot, Pingdom)
- [ ] Set up performance monitoring

## Deployment Platforms

### Vercel (Recommended)

Vercel is the easiest platform for deploying React applications.

#### Setup:
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

#### Configuration:
- Environment variables: Set in Vercel dashboard under Project Settings > Environment Variables
- Custom domain: Configure in Project Settings > Domains
- Build settings: Already configured in `package.json`

#### Continuous Deployment:
- Connect your GitHub repository to Vercel
- Every push to `main` branch automatically deploys to production
- Every PR creates a preview deployment

### Netlify

#### Setup:
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize:
   ```bash
   netlify init
   ```

4. Deploy:
   ```bash
   netlify deploy --prod
   ```

#### Configuration:
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

### GitHub Pages

#### Setup:
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/Refactron_Website",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Custom Server (VPS)

#### Prerequisites:
- Ubuntu/Debian server
- Node.js installed
- Nginx or Apache
- SSL certificate (Let's Encrypt)

#### Steps:
1. Build the project:
   ```bash
   npm run build
   ```

2. Copy `build` folder to server:
   ```bash
   scp -r build/* user@yourserver:/var/www/refactron
   ```

3. Configure Nginx:
   ```nginx
   server {
       listen 80;
       server_name refactron.dev;
       root /var/www/refactron;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Security headers
       add_header X-Frame-Options "DENY";
       add_header X-Content-Type-Options "nosniff";
       add_header X-XSS-Protection "1; mode=block";
   }
   ```

4. Enable HTTPS with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d refactron.dev
   ```

## Post-Deployment

### 1. Verification
- [ ] Visit the production URL
- [ ] Test all functionality
- [ ] Verify analytics are tracking
- [ ] Check error monitoring is working
- [ ] Test form submissions
- [ ] Verify email notifications work

### 2. DNS & Domain
- [ ] Configure DNS records
- [ ] Set up CDN (Cloudflare - optional)
- [ ] Configure SSL/TLS
- [ ] Set up email forwarding if needed

### 3. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure alert notifications
- [ ] Monitor error rates
- [ ] Track Core Web Vitals

### 4. SEO
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify sitemap is accessible
- [ ] Check robots.txt is working

### 5. Performance Testing
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Test page load speed
- [ ] Verify Core Web Vitals
- [ ] Test on slow connections (3G)

## Maintenance

### Regular Tasks
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Check security advisories
- [ ] Review analytics monthly
- [ ] Backup configurations
- [ ] Test backup restoration

### Security Updates
- Enable Dependabot for automatic PR creation
- Review and merge security updates promptly
- Monitor for CVEs in dependencies

## Rollback Procedure

If something goes wrong:

### Vercel:
1. Go to Deployments in dashboard
2. Find the last working deployment
3. Click "Promote to Production"

### Netlify:
1. Go to Deploys in dashboard
2. Find the last working deployment
3. Click "Publish deploy"

### GitHub Pages:
```bash
git revert HEAD
npm run deploy
```

## Support

For deployment issues:
- Email: hello@refactron.dev
- GitHub Issues: https://github.com/Refactron-ai/Refactron_Website/issues

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment)
- [Web.dev Performance](https://web.dev/performance)
- [Google Search Console](https://search.google.com/search-console)
