# CI Workflows Troubleshooting Guide

This document explains common issues with GitHub Actions workflows and how to resolve them.

## Common Issues

### 1. "Action Required" Status on PR Workflows

**Symptom:** Workflows show "action_required" status and don't run automatically.

**Cause:** This happens when:
- Pull requests come from bot accounts (like copilot-swe-agent)
- First-time contributor workflows need approval
- Actions from public forks require manual approval (security feature)

**Solution:**
Repository maintainers need to:
1. Go to the PR page on GitHub
2. Click on the "Checks" tab
3. Click "Approve and run" for the pending workflows

**Prevention:**
- Repository Settings → Actions → General → "Fork pull request workflows from outside collaborators"
- Choose "Require approval for first-time contributors" or "Require approval for all outside collaborators"

---

### 2. Link Check Failures

**Symptom:** Link checker workflow fails with broken links.

**Cause:** 
- Local development URLs (`http://localhost:3000`)
- Placeholder URLs (`%PUBLIC_URL%`)
- Disabled features (e.g., GitHub Discussions)
- Temporary external link issues

**Solution:**
We've added a `.lycheeignore` file to exclude known false positives. The workflow now:
- Uses `fail: false` to not block PRs on link issues
- Retries failed links 3 times
- Has a 10-second timeout per link
- Creates an issue for actual broken links that need fixing

**How to add more exclusions:**
Edit `.lycheeignore` and add patterns:
```
# Ignore specific URL
https://example.com/specific-page

# Ignore URL patterns
https://fonts.googleapis.com/$

# Ignore localhost
http://localhost*
```

---

### 3. Dependency Review Failures

**Symptom:** Dependency review workflow blocks PR or shows warnings.

**Cause:**
- New dependencies with known vulnerabilities
- License violations (GPL-3.0, AGPL-3.0)
- Severity threshold exceeded (moderate or higher)

**Solution:**
1. **Security vulnerabilities:** Update to patched versions
2. **License issues:** Choose alternative dependencies
3. **False positives:** Add exceptions in workflow configuration

**Workflow configuration:**
```yaml
- name: 'Dependency Review'
  uses: actions/dependency-review-action@v4
  with:
    fail-on-severity: moderate  # or: low, moderate, high, critical
    deny-licenses: GPL-3.0, AGPL-3.0  # Add licenses to block
    comment-summary-in-pr: always  # Posts results as PR comment
```

---

### 4. Auto Label Not Working

**Symptom:** PR labels are not automatically added.

**Cause:**
- Workflow needs approval (see issue #1 above)
- Labeler configuration mismatch
- Required labels don't exist in repository

**Solution:**
1. **Approval:** Approve the workflow run manually
2. **Configuration:** Check `.github/labeler.yml` patterns
3. **Labels:** Ensure labels exist in repository (use `label-sync.yml`)

**Verify labeler config:**
```yaml
documentation:
  - '**/*.md'  # Matches all markdown files
  - 'docs/**/*'  # Matches anything in docs folder
```

---

## Workflow Status Reference

| Status | Meaning | Action Needed |
|--------|---------|---------------|
| ✅ Success | Workflow completed successfully | None |
| ❌ Failure | Workflow failed | Check logs, fix issues |
| ⏸️ Pending | Workflow queued or running | Wait |
| 🔔 Action Required | Manual approval needed | Approve in GitHub UI |
| ⏭️ Skipped | Workflow didn't run (conditional) | None if expected |
| ❌ Cancelled | Workflow was cancelled | Re-run if needed |

---

## Best Practices

### For Contributors

1. **Check CI status before requesting review**
2. **Fix failing workflows in your PR**
3. **Don't ignore workflow failures** - they catch real issues
4. **Ask for help** if you don't understand a failure

### For Maintainers

1. **Review and approve bot PRs** when appropriate
2. **Keep workflows up to date** (dependabot helps)
3. **Monitor workflow failures** for patterns
4. **Update exclusion lists** when needed (`.lycheeignore`)
5. **Document workflow changes** in this file

---

## Debugging Workflows

### View Workflow Logs

1. Go to the "Actions" tab in GitHub
2. Click on the specific workflow run
3. Click on the job name to see logs
4. Expand steps to see detailed output

### Run Workflows Locally

Some workflows can be tested locally:

**Link checking:**
```bash
# Install lychee
brew install lychee  # macOS
# or download from https://github.com/lycheeverse/lychee/releases

# Run link check
lychee '**/*.md' '**/*.html' '**/*.tsx' \
  --exclude 'node_modules' --exclude 'build' \
  --max-retries 3 --timeout 10
```

**Linting & Testing:**
```bash
# Run tests
npm test

# Run linter
npm run lint

# Run build
npm run build
```

---

## Getting Help

If you're stuck:

1. Check this troubleshooting guide
2. Search existing issues: https://github.com/Refactron-ai/Refactron_Website/issues
3. Check GitHub Actions documentation: https://docs.github.com/en/actions
4. Ask in the PR comments or create an issue

---

## Related Documentation

- [Workflows Documentation](WORKFLOWS.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Maintainers Guide](MAINTAINERS_GUIDE.md)
