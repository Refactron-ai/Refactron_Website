# Refactron Website

[![CI](https://github.com/Refactron-ai/Refactron_Website/actions/workflows/ci.yml/badge.svg)](https://github.com/Refactron-ai/Refactron_Website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Official website for [Refactron](https://refactron.dev) - an AI-powered code refactoring and optimization platform.

A modern landing page built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Refactron-ai/Refactron_Website.git
cd Refactron_Website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and configure your environment variables

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🧪 Local Testing

### Testing Auth Pages Locally

By default, the login and signup pages are only accessible on the `app.refactron.dev` subdomain. To test them locally:

1. Create a `.env` file in the project root (if you haven't already)
2. Add the following environment variable:
   ```env
   REACT_APP_ENABLE_LOCAL_AUTH=true
   ```
3. Restart your development server (`npm start`)
4. Navigate to:
   - [http://localhost:3000/login](http://localhost:3000/login)
   - [http://localhost:3000/signup](http://localhost:3000/signup)

When local auth is enabled, you'll see a "Local Testing Mode" indicator badge on the auth pages.

**Note:** The auth pages will automatically detect localhost, 127.0.0.1, and local network IPs (192.168.x.x, 10.0.x.x) when `REACT_APP_ENABLE_LOCAL_AUTH` is enabled.

### OAuth Configuration (Google & GitHub)

To enable social login with Google and GitHub:

1. **Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - Production: `https://app.refactron.dev/auth/callback`
     - Local: `http://localhost:3000/auth/callback`
   - Copy the Client ID and add to `.env`:
     ```env
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
     ```

2. **GitHub OAuth Setup:**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set Authorization callback URL:
     - Production: `https://app.refactron.dev/auth/callback`
     - Local: `http://localhost:3000/auth/callback`
   - Copy the Client ID and add to `.env`:
     ```env
     REACT_APP_GITHUB_CLIENT_ID=your_github_client_id_here
     ```

3. **Backend API Requirements:**
   The OAuth flow requires backend endpoints:
   - `POST /api/auth/google/callback` - Handle Google OAuth callback
   - `POST /api/auth/github/callback` - Handle GitHub OAuth callback
   
   These endpoints should:
   - Exchange the authorization code for tokens
   - Verify the state parameter
   - Create or authenticate the user
   - Return a JWT token and redirect URL

**Note:** Without backend endpoints, OAuth buttons will show an error. The UI gracefully handles missing OAuth configuration.

## 🛠️ Built With

- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS
- Vercel Analytics

## 📦 Available Scripts

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
npm run lint   # Lint code
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**New to the project?** Check out issues labeled [`good first issue`](https://github.com/Refactron-ai/Refactron_Website/labels/good%20first%20issue).
See [Workflows Documentation](.github/WORKFLOWS.md) for details.
**Having CI issues?** Check the [CI Troubleshooting Guide](.github/CI_TROUBLESHOOTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Deployment Guide](DEPLOYMENT.md)

---

Built with ❤️ by the [Refactron Team](https://github.com/Refactron-ai/Refactron_Website/graphs/contributors)
