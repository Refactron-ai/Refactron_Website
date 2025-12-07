# Refactron Landing Page

[![CI](https://github.com/Refactron-ai/Refactron_Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Refactron-ai/Refactron_Website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Contributor%20Covenant-blue.svg)](CODE_OF_CONDUCT.md)
[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen.svg)]()

A modern, **production-ready**, professional landing page for Refactron - an AI-powered code refactoring and optimization platform. Built with React, TypeScript, Tailwind CSS, and Framer Motion with enterprise-grade security and performance.

## 🚀 Features

### Core Features
- **Hero Section**: Bold brand presentation with animated elements
- **Product Showcase**: Live Refactron Library v1.0.0 details
- **What We Do**: Feature showcase with icons and descriptions
- **Early Access Form**: Email capture with EmailJS integration
- **Footer**: Social links and contact information
- **Responsive Design**: Mobile-first approach optimized for all devices

### Production Features 🔒
- **Security Headers**: CSP, X-Frame-Options, HSTS, and more
- **Error Handling**: Error boundaries and custom 404 page
- **Performance Monitoring**: Real-time Core Web Vitals tracking
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **PWA Support**: Progressive Web App capabilities
- **SEO Optimized**: Complete meta tags, sitemap, and structured data
- **Cookie Consent**: GDPR-compliant cookie management

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Email**: EmailJS integration
- **Routing**: React Router v6
- **Build Tool**: Create React App
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Refactron-ai/Refactron_Website.git
   cd Refactron_Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── HeroSection.tsx           # Main hero section with CTA
│   ├── WhatWeDoSection.tsx       # Feature showcase
│   ├── ProductShowcaseSection.tsx # Product details
│   ├── EarlyAccessForm.tsx       # Email capture form
│   ├── Footer.tsx                # Footer with social links
│   ├── ErrorBoundary.tsx         # Error handling component
│   ├── NotFoundPage.tsx          # Custom 404 page
│   ├── LoadingSpinner.tsx        # Loading state component
│   ├── SkipToMain.tsx            # Accessibility helper
│   ├── CookieManager.tsx         # Cookie consent
│   ├── PrivacyPolicy.tsx         # Privacy policy page
│   └── TermsOfService.tsx        # Terms of service page
├── hooks/
│   ├── usePerformanceMonitoring.ts # Performance tracking
│   ├── useAccessibility.ts        # Accessibility features
│   └── useCookieConsent.ts        # Cookie management
├── App.tsx                        # Main app component
├── index.tsx                      # App entry point
└── index.css                      # Global styles and Tailwind
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- Primary colors: Teal gradient (`#20B2AA` to `#7FCDCD`)
- Gray scale: Modern neutral palette
- Optimized for accessibility with proper contrast ratios

### Content
Update the following files to customize content:
- Component files for text and descriptions
- `public/index.html` for meta tags and SEO
- `package.json` for project metadata
- `.env` for configuration values

### Styling
- Global styles: `src/index.css`
- Component styles: Inline Tailwind classes
- Custom animations: `tailwind.config.js`

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

Optimized for all modern browsers including Chrome, Firefox, Safari, and Edge.

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Start - Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Quick Start - Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Production Checklist
Before deploying to production, review [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md).

## 🔧 Environment Variables

See [.env.example](.env.example) for all available configuration options.

Required variables for EmailJS:
```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_NOTIFICATION_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Loading Speed**: < 3s on 3G, < 1s on broadband
- **Core Web Vitals**: All metrics in "Good" range
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

## 🔒 Security Features

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **Security Headers**: X-Frame-Options, HSTS, X-Content-Type-Options
- **Cookie Consent**: GDPR-compliant cookie management
- **HTTPS Only**: Enforced in production
- **Dependency Scanning**: Automated with Dependabot

## ♿ Accessibility

- **WCAG AA Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Compatible**: Proper ARIA labels
- **Focus Indicators**: Visible focus states
- **Reduced Motion**: Respects user preferences
- **Color Contrast**: Meets WCAG requirements

## 🤝 Contributing

We welcome contributions from the community! Please see our detailed guides:

- **[Contributing Guide](CONTRIBUTING.md)** - Full contribution guidelines
- **[Quick Start for Contributors](.github/CONTRIBUTORS_GUIDE.md)** - Fast setup guide
- **[Maintainers Guide](.github/MAINTAINERS_GUIDE.md)** - For maintainers
- **[Workflows Documentation](.github/WORKFLOWS.md)** - GitHub Actions workflows

### Quick Start

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'feat: add feature'` (use semantic commits)
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Automated Workflows

This repository includes comprehensive CI/CD workflows:
- ✅ Automated testing and building
- 🔒 Security scanning (CodeQL, Dependabot)
- 🏷️ Automatic PR labeling
- 👋 First-time contributor greetings
- 📦 Dependency updates
- 🔗 Link checking
- 📝 Stale issue management

See [Workflows Documentation](.github/WORKFLOWS.md) for details.
**Having CI issues?** Check the [CI Troubleshooting Guide](.github/CI_TROUBLESHOOTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions:
- Email: hello@refactron.dev
- GitHub: [Create an issue](https://github.com/refactron/landing/issues)

## 🎯 Next Steps

- [ ] Add analytics integration
- [ ] Implement form backend (Formspree, Mailchimp, etc.)
- [ ] Add A/B testing capabilities
- [ ] Optimize for Core Web Vitals
- [ ] Add internationalization support

---

Built with ❤️ by the Refactron Team
# Test commit
