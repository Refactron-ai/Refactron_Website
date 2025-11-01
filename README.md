# Refactron Landing Page

[![CI](https://github.com/Refactron-ai/Refactron_Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Refactron-ai/Refactron_Website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Contributor%20Covenant-blue.svg)](CODE_OF_CONDUCT.md)

A modern, professional landing page for Refactron - an AI-powered code refactoring and optimization platform. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Hero Section**: Bold brand presentation with animated elements
- **What We Do**: Feature showcase with icons and descriptions
- **Coming Soon**: Countdown timer and launch anticipation
- **Early Access Form**: Email capture with validation and confirmation
- **Footer**: Social links and contact information
- **Responsive Design**: Mobile-first approach
- **Modern Animations**: Smooth transitions and micro-interactions
- **Dark Theme**: Futuristic AI aesthetic with gradients and glowing effects

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd refactron-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── HeroSection.tsx      # Main hero section with CTA
│   ├── WhatWeDoSection.tsx  # Feature showcase
│   ├── ComingSoonSection.tsx # Countdown and launch info
│   ├── EarlyAccessForm.tsx  # Email capture form
│   └── Footer.tsx           # Footer with social links
├── App.tsx                  # Main app component
├── index.tsx               # App entry point
└── index.css               # Global styles and Tailwind
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- Primary colors: Blue gradient (`#0ea5e9` to `#7dd3fc`)
- Dark theme: Gray scale (`#0f172a` to `#64748b`)

### Content
Update the following files to customize content:
- Component files for text and descriptions
- `public/index.html` for meta tags and SEO
- `package.json` for project metadata

### Styling
- Global styles: `src/index.css`
- Component styles: Inline Tailwind classes
- Custom animations: `tailwind.config.js`

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Follow the prompts

### Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Configure custom domain if needed

### Other Platforms
1. Build: `npm run build`
2. Upload the `build` folder to your hosting provider

## 🔧 Environment Variables

Create a `.env` file for any API integrations:

```env
REACT_APP_FORM_ENDPOINT=your_form_endpoint
REACT_APP_ANALYTICS_ID=your_analytics_id
```

## 📊 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Bundle Size: Optimized with code splitting
- Loading Speed: Fast with optimized assets

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
