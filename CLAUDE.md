# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🌍 Project Overview
**Refactron** is a full-stack platform for AI-powered code refactoring.
- **Frontend**: React 18 (CRA) application serving marketing pages (`refactron.dev`), web app (`app.refactron.dev`), and documentation (`docs.refactron.dev`).
- **Backend**: Node.js/Express API managing authentication, LLM interaction (Groq), and user data (Prisma/Postgres).
- **Product**: Offers CLI tools and a web dashboard for analyzing and refactoring codebases.

## 🔨 Development Commands

### 📦 Frontend (`/`)
- **Start Dev Server**: `npm start` (Runs on port 3000)
- **Build Production**: `npm run build`
- **Test**: `npm test` (Jest + React Testing Library)
  - Run specific test: `npm test -- -t "test name"` or `npm test -- filename`
  - Watch mode: `npm test -- --watch`
- **Lint**: `npm run lint` (ESLint)
- **Format**: `npm run format` (Prettier)

### ⚙️ Backend (`/backend`)
- **Setup**: Run `./setup.sh` to install dependencies and generate Prisma client.
- **Start Dev Server**: `npm run dev` (Runs on port 3001)
- **Build**: `npm run build`
- **Database (Prisma)**:
  - `npx prisma generate` - Update client after schema changes.
  - `npx prisma migrate dev` - Apply migrations in dev.
  - `npx prisma studio` - Open database GUI.
- **Test**: `npm test`

## 🏗️ Architecture & Patterns

### 1. Frontend Architecture (`src/`)
- **Routing Strategy**: Custom subdomain routing via `react-router-dom` v6 in `App.tsx`.
  - `refactron.dev` → Marketing Landing Pages (`HeroSection`, `PricingSection`).
  - `app.refactron.dev` → Web Application (`AuthApp`: Dashboard, Settings, Onboarding).
  - `docs.refactron.dev` → Documentation (`DocsPage`).
  - *Localhost*: Controlled via `REACT_APP_ENABLE_LOCAL_AUTH` and `REACT_APP_ENABLE_LOCAL_DOCS` in `.env`.
- **State Management**:
  - `AuthContext`: Handles user session, login/logout, tokens, and Stripe checkout.
  - `ThemeContext`: Enforces dark mode (default).
- **Styling**:
  - **Tailwind CSS**: Utility-first styling.
  - **Framer Motion**: Primary animation library (`<motion.div>`, `AnimatePresence`).
  - **Aceternity UI**: Visual components in `src/components/ui/` (e.g., `AuroraBackground`, `Terminal`).
  - **Helper**: **CRITICAL** - Always use `cn()` from `src/lib/utils.ts` (uses `clsx` + `tailwind-merge`) to merge classes. Avoid `src/utils/cn.ts`.
- **API Integration**:
  - Native `fetch` with `getApiBaseUrl()` utility.
  - API services located in `src/services/` (e.g., `apiKey.service.ts`).

### 2. Backend Architecture (`backend/src/`)
- **Framework**: Express with TypeScript.
- **Database**: PostgreSQL with Prisma ORM (`backend/prisma/schema.prisma`).
- **Auth System**:
  - **Strategy**: Dual-token (Short-lived JWT Access Token + Long-lived HttpOnly Refresh Cookie).
  - **Providers**: Email/Password, Google OAuth, GitHub OAuth.
  - **CLI Auth**: Implements OAuth 2.0 Device Flow (`/api/oauth/device`).
- **Services**:
  - **LLM**: Uses **Groq SDK** for high-speed inference (`src/services/llm.service.ts`).
  - **Email**: Uses **Brevo API** via `fetch` to bypass SMTP port restrictions (`src/config/email.ts`).
- **Middleware**:
  - `auth.middleware.ts`: Verifies JWT access tokens (extracts user to `req.user`).
  - `apiKey.middleware.ts`: Authenticates SDK requests via `x-api-key`.
  - `rateLimit.middleware.ts`: Strict limits for auth/LLM endpoints.

## 💾 Data Models (Prisma)

- **User**: Core identity. Stores `email`, `passwordHash` (bcrypt), `plan` (free/pro/enterprise), and OAuth IDs.
- **ApiKey**: Hashed API keys for programmatic/CLI access. Linked to `User`.
- **OAuthDeviceCode**: Stores temporary codes for CLI authentication flow (Device Flow).
- **LLMUsage**: Audit log of token consumption and estimated costs per user/key.

## 🔐 Security & Auth Flow

1.  **Web Login**:
    - Users authenticate via Email/Pass or OAuth.
    - Receive `accessToken` (JSON body) and `refreshToken` (HttpOnly Cookie).
    - `useAuth` hook manages token storage in `localStorage` and silent refresh via `/api/auth/refresh`.
2.  **CLI Login (Device Flow)**:
    - CLI requests device code (`POST /api/oauth/device`).
    - User visits verification URI (`app.refactron.dev/device/connect`).
    - CLI polls `POST /api/oauth/token` until authorized.
3.  **SDK/API Access**:
    - Authenticated via `x-api-key` header or Bearer token.
    - Validated against `ApiKey` table (hashed).

## 📂 Directory Structure

### Frontend (`src/`)
- `components/ui/`: Reusable, visual-heavy components (e.g., `Terminal`, `AuroraBackground`).
- `components/`: Feature-specific components (`Dashboard`, `Onboarding`, `HeroSection`, `DocsPage`).
- `data/docs/`: Versioned documentation content (e.g., `versions/v1.0.15.ts`).
- `hooks/`: Custom hooks (`useAuth`, `useSEO`, `useRepositories`, `usePerformanceMonitoring`).
- `services/`: API wrappers (e.g., `apiKey.service.ts`).
- `utils/`: Helpers for URLs, OAuth, Analytics. **Note**: `utils/cn.ts` is legacy; use `lib/utils.ts`.

### Backend (`backend/src/`)
- `config/`: Database, Email (Brevo), and OAuth configuration.
- `controllers/`: Request handlers (HTTP layer).
- `services/`: Business logic (Decoupled layer).
- `routes/`: Express route definitions.
- `utils/`: Crypto helpers (`deviceCode.utils.ts`, `password.ts`), validators.

## 📝 Coding Standards

- **Class Merging**: ALWAYS use `cn()` from `src/lib/utils.ts` when combining Tailwind classes.
- **Naming**: PascalCase for React components, camelCase for functions/files.
- **Imports**: Relative imports are preferred in this codebase.
- **Environment Variables**:
  - Frontend: `process.env.REACT_APP_*`.
  - Backend: `process.env.*`.
- **Safety**:
  - Frontend: Sanitize `dangerouslySetInnerHTML`.
  - Backend: Validate all inputs using `express-validator`.

## 🚀 Deployment

- **Frontend**: **Vercel**. Uses `vercel.json` for headers and rewrites (mapping subdomains).
- **Backend**: Node.js environment (e.g., Railway, Render). Requires `DATABASE_URL` (PostgreSQL) and `GROQ_API_KEY`.
