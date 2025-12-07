# Auto-Labeler Configuration Guide

## Overview

The auto-labeler automatically applies labels to pull requests based on the files changed. This helps with PR organization, review prioritization, and tracking different types of changes across the repository.

## How It Works

The auto-labeler runs on every pull request when:
- A PR is opened
- A PR is edited
- A PR is synchronized (new commits pushed)
- A PR is reopened

The workflow analyzes all changed files and applies appropriate labels based on file patterns defined in `.github/labeler.yml`.

## Label Categories

### 📚 Documentation (`documentation`)
Applied when changes are made to:
- Any `.md` files in the root directory
- Documentation files in `.github/` directory
- Documentation in `docs/` directory

**Examples**: README.md, CONTRIBUTING.md, docs/api.md

### 📦 Dependencies (`dependencies`)
Applied when package management files are modified:
- `package.json`
- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`

### 🔧 CI/CD (`type:ci/cd`)
Applied for CI/CD and workflow changes:
- `.github/workflows/**/*`
- `.github/dependabot.yml`
- `.github/auto-assign.yml`
- `vercel.json`

### 🧪 Testing (`type:test`)
Applied for test file changes:
- `**/*.test.ts`, `**/*.test.tsx`
- `**/*.spec.ts`, `**/*.spec.tsx`
- `src/setupTests.ts`
- `src/App.test.tsx`

### ✨ Features (`type:feature`)
Applied when new features or components are added:
- `src/components/**/*.tsx` (React components)
- `src/hooks/**/*.ts` (Custom hooks)
- `src/data/**/*.ts` (Data files)
- `src/icons/**/*.tsx` (Icon components)

### 🎨 Styling (`style`)
Applied for styling and formatting changes:
- `**/*.css`, `src/**/*.css`
- `tailwind.config.js`
- `postcss.config.js`
- `.prettierrc.json`, `.prettierignore`

### ⚙️ Configuration (`type:config`)
Applied for configuration file changes:
- `tsconfig.json`
- `.env.example`
- `.gitignore`, `.lycheeignore`
- `*.config.js`, `*.config.ts`
- `.github/labels.yml`, `.github/labeler.yml`

### 🏗️ Build (`type:build`)
Applied for build and deployment configuration:
- `vercel.json`
- `package.json`
- `tsconfig.json`
- `webpack.config.js`, `rollup.config.js`, `vite.config.js`

### 🖼️ Assets (`type:assets`)
Applied for asset and media file changes:
- `public/**/*`
- Image files: `**/*.png`, `**/*.jpg`, `**/*.jpeg`, `**/*.gif`
- Vector graphics: `**/*.svg`
- Icons: `**/*.ico`
- Modern formats: `**/*.webp`

### 🔒 Security (`security`)
Applied for security-related changes:
- `SECURITY.md`
- `.github/workflows/codeql.yml`
- `.github/workflows/dependency-review.yml`

### 📋 Meta Files (`type:meta`)
Applied for repository meta files:
- `LICENSE`
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `AUTHORS.md`
- `CHANGELOG.md`

### 🎯 Core Application (`type:core`)
Applied for core application files:
- `src/App.tsx`, `src/index.tsx`
- `src/App.css`, `src/index.css`
- `src/react-app-env.d.ts`
- `src/reportWebVitals.ts`

### 🔍 SEO (`type:seo`)
Applied for SEO-related changes:
- `public/sitemap.xml`
- `public/robots.txt`
- `SEO_STRATEGY.md`
- `public/manifest.json`

### 🧩 UI Components (`type:ui-component`)
Applied for specific UI component changes:
- `src/components/NavigationBar.tsx`
- `src/components/Footer.tsx`
- `src/components/HeroSection.tsx`
- `src/components/LoadingSpinner.tsx`
- `src/components/ErrorBoundary.tsx`

### 📄 Page Components (`type:page-component`)
Applied for page component changes:
- `src/components/*Page.tsx` (any file ending with Page.tsx)
- `src/components/PageLayout.tsx`

### 📝 Form Components (`type:form-component`)
Applied for form component changes:
- `src/components/*Form.tsx` (any file ending with Form.tsx)
- `src/components/EarlyAccessForm.tsx`
- `src/components/LoginForm.tsx`
- `src/components/SignupForm.tsx`

### ♿ Accessibility (`type:accessibility`)
Applied for accessibility improvements:
- `src/hooks/useAccessibility.ts`
- `src/components/SkipToMain.tsx`

### ⚡ Performance (`type:performance`)
Applied for performance optimizations:
- `src/hooks/usePerformanceMonitoring.ts`
- `src/reportWebVitals.ts`

### 🔨 Refactoring (`type:refactor`)
Applied for code refactoring (excluding new features):
- Any TypeScript files in `src/` that are NOT:
  - New components
  - New hooks
  - New data files
  - New icons

## Label Precedence

Multiple labels can be applied to a single PR. For example:
- A PR that adds a new component AND updates tests will get both `type:feature` and `type:test` labels
- A PR that updates dependencies AND modifies CI will get both `dependencies` and `type:ci/cd` labels

## Troubleshooting

### Labels not appearing?
1. Check that the workflow has write permissions to pull requests
2. Verify the file patterns match your changes
3. Look at the workflow run logs in the Actions tab

### Wrong labels applied?
1. Review the patterns in `.github/labeler.yml`
2. Consider if multiple labels are appropriate (they often are!)
3. Update the patterns if needed and they'll apply to future PRs

### Want to add a new label?
1. Add the label definition to `.github/labels.yml`
2. Add the file patterns to `.github/labeler.yml`
3. The label-sync workflow will create the label in the repository
4. Future PRs will automatically get the new label

## Workflow Configuration

The auto-labeler workflow is configured in `.github/workflows/auto-label.yml`:

- **Triggers**: PR opened, edited, synchronized, reopened
- **Permissions**: Read contents, write to pull requests, read issues
- **Actions**: Uses `actions/labeler@v5` with sync-labels enabled
- **Features**: 
  - Checks out repository to access configuration
  - Syncs labels (removes labels that no longer match)
  - Logs completion status

## Sync Labels Feature

The `sync-labels: true` option ensures that:
- If a file pattern no longer matches, the label is removed
- Labels stay accurate as the PR evolves
- No stale or incorrect labels remain

## Best Practices

1. **Keep patterns specific**: Use specific paths to avoid false positives
2. **Use glob patterns wisely**: `**/*` matches everything, use carefully
3. **Test changes**: Make a test PR to verify label patterns work
4. **Document changes**: Update this file when adding new label categories
5. **Review regularly**: As the codebase grows, review and adjust patterns

## Examples

### Example 1: New React Component
**Files changed**: `src/components/NewFeature.tsx`
**Labels applied**: `type:feature`, `type:ui-component` (if it's a UI component)

### Example 2: Dependency Update
**Files changed**: `package.json`, `package-lock.json`
**Labels applied**: `dependencies`, `type:build`

### Example 3: Documentation Update
**Files changed**: `README.md`, `CONTRIBUTING.md`
**Labels applied**: `documentation`, `type:meta`

### Example 4: Bug Fix with Tests
**Files changed**: `src/components/MyComponent.tsx`, `src/components/MyComponent.test.tsx`
**Labels applied**: `type:refactor`, `type:test`

### Example 5: CI Workflow Enhancement
**Files changed**: `.github/workflows/ci.yml`
**Labels applied**: `type:ci/cd`

## Contributing

To improve the auto-labeler:
1. Review current label patterns
2. Identify missing coverage or incorrect patterns
3. Update `.github/labeler.yml` with your changes
4. Update this documentation
5. Test with a sample PR
6. Submit your improvements!

## Support

For questions or issues with the auto-labeler:
- Open an issue with the `type:ci/cd` label
- Review the workflow logs in the Actions tab
- Check the [GitHub Labeler documentation](https://github.com/actions/labeler)

---

Last updated: 2025-12-07
