# GitHub Workflows Documentation

This document describes all the GitHub Actions workflows configured for the Refactron Website repository.

## 📋 Table of Contents

- [Continuous Integration](#continuous-integration)
- [Pull Request Workflows](#pull-request-workflows)
- [Security Workflows](#security-workflows)
- [Automation Workflows](#automation-workflows)
- [Release Workflows](#release-workflows)
- [Maintenance Workflows](#maintenance-workflows)
- [Issue and PR Templates](#issue-and-pr-templates)

## Continuous Integration

### CI Workflow (`ci.yml`)

**Triggers:** Push or PR to `main` or `develop` branches

**Purpose:** Ensures code quality and functionality across multiple Node.js versions

**What it does:**
- Tests on Node.js 16.x, 18.x, and 20.x
- Installs dependencies
- Runs ESLint for code quality checks
- Runs Prettier for code formatting verification
- Runs tests
- Builds the project
- Uploads build artifacts for Node 20.x

**Required for:** All code changes

---

## Pull Request Workflows

### PR Workflow (`pr.yml`)

**Triggers:** Pull request opened, synchronized, or reopened

**Purpose:** Validates pull requests and provides automated feedback

**What it does:**
- Runs tests with coverage
- Builds the project
- Validates PR title follows semantic commit conventions (feat, fix, docs, etc.)
- Posts a welcome comment on first PRs

**Required for:** All pull requests

### Auto Label (`auto-label.yml`)

**Triggers:** PR opened, edited, or synchronized

**Purpose:** Automatically labels PRs based on changed files

**What it does:**
- Adds `documentation` label for markdown changes
- Adds `dependencies` label for package.json changes
- Adds `type:ci/cd` label for workflow changes
- Adds `type:test` label for test file changes
- And more...

**Configuration:** `.github/labeler.yml`

---

## Security Workflows

### CodeQL Analysis (`codeql.yml`)

**Triggers:** 
- Push to `main` or `develop`
- Pull requests
- Weekly schedule (Mondays)

**Purpose:** Scans code for security vulnerabilities

**What it does:**
- Initializes CodeQL
- Analyzes JavaScript/TypeScript code
- Reports security issues

**Language:** JavaScript

### Dependency Review (`dependency-review.yml`)

**Triggers:** Pull requests

**Purpose:** Reviews dependency changes for security issues

**What it does:**
- Checks new dependencies for vulnerabilities
- Fails on moderate or higher severity issues
- Denies GPL-3.0 and AGPL-3.0 licenses
- Comments summary in PR

---

## Automation Workflows

### Greetings (`greetings.yml`)

**Triggers:** First issue or PR from a contributor

**Purpose:** Welcomes new contributors

**What it does:**
- Posts a welcome message on first issue
- Posts a welcome message on first PR
- Links to contributing guidelines and code of conduct

### Auto Assign (`auto-assign.yml`)

**Triggers:** PR opened or ready for review, issues opened

**Purpose:** Automatically assigns reviewers and assignees

**What it does:**
- Assigns the PR author as assignee
- Assigns configured reviewers
- Skips WIP/draft PRs

**Configuration:** `.github/auto-assign.yml`

### Label Sync (`label-sync.yml`)

**Triggers:** 
- Push to main when `.github/labels.yml` changes
- Manual workflow dispatch

**Purpose:** Synchronizes repository labels

**What it does:**
- Creates/updates labels based on configuration
- Maintains consistent labeling across the repo

**Configuration:** `.github/labels.yml`

---

## Release Workflows

### Release (`release.yml`)

**Triggers:** Push of version tags (e.g., `v1.0.0`)

**Purpose:** Automates release creation

**What it does:**
- Runs tests
- Builds the project
- Creates a GitHub release
- Generates release notes
- Attaches build artifacts

**Usage:** `git tag v1.0.0 && git push --tags`

---

## Maintenance Workflows

### Stale Issues and PRs (`stale.yml`)

**Triggers:** Daily at midnight

**Purpose:** Manages inactive issues and PRs

**What it does:**
- Marks issues stale after 60 days of inactivity
- Closes stale issues after 7 days
- Marks PRs stale after 30 days
- Closes stale PRs after 7 days
- Exempts pinned, security, and in-progress items

### Link Check (`link-check.yml`)

**Triggers:**
- Push to main
- Pull requests
- Weekly schedule (Sundays)

**Purpose:** Validates links in documentation

**What it does:**
- Checks all links in markdown, HTML, and TSX files
- Creates an issue if broken links are found
- Excludes node_modules and build folders

### Dependabot (`dependabot.yml`)

**Purpose:** Keeps dependencies up to date

**What it does:**
- Checks for npm dependency updates weekly
- Checks for GitHub Actions updates weekly
- Creates PRs for updates
- Labels PRs as `dependencies`
- Ignores major version updates for react-scripts

**Schedule:** Monday mornings

---

## Issue and PR Templates

### Bug Report Template

**File:** `.github/ISSUE_TEMPLATE/bug_report.yml`

**Fields:**
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots
- Browser and OS
- Node.js version

### Feature Request Template

**File:** `.github/ISSUE_TEMPLATE/feature_request.yml`

**Fields:**
- Problem statement
- Proposed solution
- Alternatives considered
- Additional context
- Willingness to contribute

### Pull Request Template

**File:** `.github/PULL_REQUEST_TEMPLATE.md`

**Sections:**
- Description
- Type of change
- Related issue
- Changes made
- Screenshots
- Checklist
- Testing details

---

## Configuration Files

### Labels Configuration (`.github/labels.yml`)

Defines standard labels for the repository:
- Status labels: `status:in-progress`, `status:blocked`
- Priority labels: `priority:high`, `priority:medium`, `priority:low`
- Type labels: `type:bug`, `type:feature`, `type:refactor`, etc.
- Special labels: `good first issue`, `help wanted`, `security`

### Labeler Configuration (`.github/labeler.yml`)

Maps file patterns to labels for automatic PR labeling.

### Auto-assign Configuration (`.github/auto-assign.yml`)

Configures automatic reviewer and assignee assignment for PRs and issues.

---

## Best Practices

### For Contributors

1. **PR Titles:** Use semantic commit format: `type: description`
   - Examples: `feat: add new component`, `fix: resolve login issue`

2. **Testing:** Always run tests locally before pushing
   ```bash
   npm test
   npm run build
   ```

3. **Documentation:** Update docs when changing functionality

### For Maintainers

1. **Reviews:** Review PRs promptly to avoid stale PRs
2. **Labels:** Use labels to organize issues and PRs
3. **Releases:** Use semantic versioning for tags
4. **Security:** Monitor CodeQL and Dependabot alerts

---

## Troubleshooting

### CI Workflow Fails

1. Check Node.js version compatibility
2. Verify all dependencies are in package.json
3. Run `npm ci` locally to reproduce

### PR Title Check Fails

Ensure PR title follows format: `type: description`

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Stale Bot Acting Up

Issues/PRs can be exempted by adding these labels:
- `pinned`
- `security`
- `in-progress`

### CodeQL Failures

Review the security findings and address vulnerabilities. Common issues:
- Unvalidated user input
- SQL injection risks
- XSS vulnerabilities

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Commit Messages](https://www.conventionalcommits.org/)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

---

## Support

For questions or issues with workflows:
1. Open an issue using the bug report template
2. Tag with `type:ci/cd` label
3. Email: hello@refactron.ai

---

**Last Updated:** November 2025
