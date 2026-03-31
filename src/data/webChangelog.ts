import { ChangelogEntry } from './changelog';

const webChangelog: ChangelogEntry[] = [
  {
    version: 'web-1.1.0',
    date: 'March 2026',
    title: 'Team Management, Notifications & Plan Gating',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'New Features',
        items: [
          {
            label: 'Team Dashboard',
            description:
              'Enterprise users get a full team management UI — invite members, assign roles (owner / admin / member), view join history, and manage team API keys.',
          },
          {
            label: 'Notification Drawer',
            description:
              'Full-height slide-in notification panel with filter tabs (All / Unread / Team / Billing), date grouping, per-notification mark-read and delete, bulk clear, and paginated load-more.',
          },
          {
            label: 'Activity Heatmap & Audit Logs',
            description:
              'GitHub-style 30-day activity grid for team events. Paginated audit log of all team actions — invites, role changes, and member removals — with actor and timestamp.',
          },
          {
            label: 'LLM Plan Gating',
            description:
              'Free-tier users are blocked from LLM endpoints at the API level. Pro and Enterprise plans retain full LLM access. Plan descriptions updated across Billing, Onboarding, and Pricing pages.',
          },
          {
            label: 'Per-member Usage Analytics',
            description:
              'Tab-based usage breakdown per team member — token counts, cost, request counts, avg tokens per request, and per-model / per-operation breakdown.',
          },
        ],
      },
      {
        type: 'fix',
        label: 'Bug Fixes',
        items: [
          {
            label: 'Re-invite after Decline',
            description:
              'Re-inviting someone who declined no longer falsely returns "pending invite already exists".',
          },
          {
            label: 'OAuth Callback Hook',
            description:
              'Fixed missing dependency in useEffect inside OAuthCallback that could cause stale closure on token refresh.',
          },
        ],
      },
    ],
  },
  {
    version: 'web-1.0.0',
    date: 'February 2026',
    title: 'Changelog, Security Page & Account Settings',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'New Features',
        items: [
          {
            label: 'Changelog Page',
            description:
              'Public /changelog page tracking all CLI and web app releases — version badges, sections per release type, and collapsible housekeeping sections.',
          },
          {
            label: 'Security Page',
            description:
              'Dedicated /security page covering responsible disclosure, data handling, and infrastructure security posture.',
          },
          {
            label: 'Account Settings',
            description:
              'Users can update their display name, email, and password directly from the dashboard without going through onboarding.',
          },
          {
            label: 'Dashboard Onboarding Timeline',
            description:
              'Redesigned welcome screen with a step-by-step onboarding timeline — install CLI → authenticate → generate API key → connect GitHub → connect repository.',
          },
        ],
      },
    ],
  },
  {
    version: 'web-0.5.0',
    date: 'January 2026',
    title: 'Dodo Payments & Billing Overhaul',
    tag: 'improvement',
    sections: [
      {
        type: 'feat',
        label: 'New Features',
        items: [
          {
            label: 'Dodo Payments Integration',
            description:
              'Replaced Stripe with Dodo Payments for checkout and subscription management. Billing history, plan status, and upgrade flows all updated.',
          },
          {
            label: 'Onboarding → Checkout Flow',
            description:
              'Selecting a paid plan during onboarding now redirects directly to a Dodo checkout session. Free plan completes onboarding immediately.',
          },
        ],
      },
      {
        type: 'improvement',
        label: 'Improvements',
        items: [
          {
            label: 'Pricing & 404 Pages',
            description:
              'Pricing page refined with trial badge and minimal dark theme. 404 page redesigned to match site aesthetic.',
          },
        ],
      },
    ],
  },
  {
    version: 'web-0.4.0',
    date: 'December 2025',
    title: 'OAuth Device Flow & CLI Authentication',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'New Features',
        items: [
          {
            label: 'CLI Device Flow',
            description:
              'Authenticate the Refactron CLI from the terminal — the app generates a short-lived code the user approves in the browser. Full device-connect UI with polling and confirmation.',
          },
          {
            label: 'Organization Settings',
            description:
              'Set your organization name, manage account settings, and configure your workspace slug from the dashboard.',
          },
          {
            label: 'Repository Browser',
            description:
              'View and manage connected GitHub repositories directly from the dashboard with a repository selection UI.',
          },
        ],
      },
      {
        type: 'fix',
        label: 'Bug Fixes',
        items: [
          {
            label: 'Auth State Persistence',
            description:
              'Fixed dashboard flash on reload and kept user state consistent after login, profile save, and OAuth callback.',
          },
          {
            label: 'GitHub Connect Glitch',
            description:
              'Fixed a UI glitch in the GitHub connection flow that caused the connect button to flicker on state change.',
          },
        ],
      },
    ],
  },
  {
    version: 'web-0.3.0',
    date: 'November 2025',
    title: 'Google & GitHub OAuth',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'New Features',
        items: [
          {
            label: 'Google OAuth',
            description:
              'Sign in or sign up with Google — one-click authentication with CSRF-protected state tokens.',
          },
          {
            label: 'GitHub OAuth',
            description:
              'Connect your GitHub account to enable repository browsing, analysis, and CLI device-flow authentication.',
          },
          {
            label: 'Auth Transitions & Logout',
            description:
              'Smooth page transitions on login/logout with an animated logout overlay and redirect handling.',
          },
        ],
      },
    ],
  },
  {
    version: 'web-0.2.0',
    date: 'October 2025',
    title: 'Dashboard, Docs & Dark Theme',
    tag: 'new',
    sections: [
      {
        type: 'feat',
        label: 'New Features',
        items: [
          {
            label: 'App Dashboard',
            description:
              'Full auth dashboard at app.refactron.dev — email/password sign-up with verification, JWT sessions, refresh token rotation, and a sidebar-based dashboard layout.',
          },
          {
            label: 'Docs Subdomain',
            description:
              'Documentation site live at docs.refactron.dev — versioned content, mobile navigation, tutorial sections, and a search modal.',
          },
          {
            label: 'Build-time Pre-rendering',
            description:
              'Key marketing routes are pre-rendered at build time using Puppeteer for improved SEO and Core Web Vitals.',
          },
          {
            label: 'Cookie Consent',
            description:
              'GDPR-compliant cookie consent banner with granular preferences modal and persistent settings.',
          },
        ],
      },
      {
        type: 'improvement',
        label: 'Improvements',
        items: [
          {
            label: 'Full Dark Theme',
            description:
              'Entire site migrated to a consistent dark theme — Hero, FAQ, Pricing, About, and Case Studies pages all redesigned.',
          },
        ],
      },
    ],
  },
  {
    version: 'web-0.1.0',
    date: 'September 2025',
    title: 'Initial Launch',
    tag: 'beta',
    sections: [
      {
        type: 'feat',
        label: 'Core Features',
        items: [
          {
            label: 'Landing Page',
            description:
              'Public marketing site at refactron.dev — hero section, refactoring workflow explainer, pricing, FAQ, and case studies.',
          },
          {
            label: 'Legal & Compliance',
            description:
              'Privacy Policy, Terms of Service, and early-access email capture form.',
          },
          {
            label: 'Vercel Analytics',
            description:
              'Integrated Vercel Analytics for page view tracking and performance monitoring.',
          },
          {
            label: 'Mobile Responsive',
            description:
              'Full mobile and desktop responsiveness across all pages.',
          },
        ],
      },
    ],
  },
];

export default webChangelog;
