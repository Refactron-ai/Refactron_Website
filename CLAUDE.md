# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run lint       # ESLint (max-warnings 0 — zero warnings allowed)
npm run lint:fix   # Auto-fix lint issues
npm run format     # Prettier format
npm run format:check  # Check formatting without writing
```

To run a single test file: `npx react-scripts test --testPathPattern=oauth`

CI runs lint → format:check → test → build on Node 16/18/20.

## Architecture

**React 18 + TypeScript**, bootstrapped with Create React App. React Router v6. Tailwind CSS for styling.

### Subdomain-Based Routing

The app serves three distinct UIs based on hostname, resolved in `App.tsx`:

| Hostname | UI rendered |
|----------|-------------|
| `docs.*` or `REACT_APP_ENABLE_LOCAL_DOCS=true` | `DocsPage` |
| `app.*` or `REACT_APP_ENABLE_LOCAL_AUTH=true` | `AuthApp` (OAuth dashboard) |
| `refactron.dev` / default | Landing page |

This means `App.tsx` is the entry point for all three products — changes there affect all subdomains.

### Key Directories

- `src/components/` — All page and feature components. `ui/` subdirectory holds reusable visual effects (aurora, beams, 3D marquee, etc.) built with Framer Motion, GSAP, and Three.js.
- `src/hooks/` — Custom hooks: `useAuth` (OAuth state), `useCookieConsent`, `usePerformanceMonitoring`, `useSEO`, `useRepositories`.
- `src/utils/oauth.ts` — OAuth flow for Google and GitHub. Tests in `oauth.test.ts`.
- `src/data/caseStudies.ts` — Static content for case studies (no CMS).
- `src/contexts/ThemeContext.tsx` — Dark mode is enforced globally; the theme is not user-toggleable.

### Authentication

OAuth is handled client-side in `utils/oauth.ts` with Google and GitHub providers. The backend URL is `REACT_APP_API_BASE_URL`. Local development uses `REACT_APP_ENABLE_LOCAL_AUTH=true` to expose `/login` and `/signup` routes. Protected routes use `ProtectedRoute.tsx`.

### Environment Variables

Copy `.env.example` to `.env.local`. Key variables:

```
REACT_APP_ENABLE_LOCAL_AUTH=true    # Expose auth routes on localhost
REACT_APP_ENABLE_LOCAL_DOCS=true    # Expose docs routes on localhost
REACT_APP_API_BASE_URL              # Backend base URL
REACT_APP_GOOGLE_CLIENT_ID          # OAuth
REACT_APP_GITHUB_CLIENT_ID          # OAuth
REACT_APP_EMAILJS_*                 # Contact/newsletter forms
REACT_APP_SENTRY_DSN                # Error tracking
```

### Styling Conventions

- Tailwind utility classes throughout; custom tokens defined in `tailwind.config.js` (colors, animations, fonts).
- Class merging uses `cn()` from `src/utils/cn.ts` (clsx + tailwind-merge).
- Prettier: single quotes, semicolons, 80-char line width, 2-space indent.

### Deployment

Vercel handles subdomain routing via `vercel.json` rewrites. Static assets are cached aggressively (31536000s for `/static/*`). Security headers are set in `vercel.json`.
