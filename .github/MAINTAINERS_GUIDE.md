# Workflow Setup Guide for Maintainers

This guide helps maintainers configure and customize the GitHub Actions workflows.

## Initial Setup

### 1. Repository Settings

Enable the following in repository settings:

**Settings → General → Features:**
- ✅ Issues
- ✅ Projects
- ✅ Discussions (optional)
- ✅ Wiki (optional)

**Settings → Code security and analysis:**
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ CodeQL analysis

**Settings → Actions → General:**
- ✅ Allow all actions and reusable workflows
- ✅ Read and write permissions for GITHUB_TOKEN

### 2. Branch Protection Rules

For `main` branch:

1. Go to Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass before merging
   - Select: `build (20.x)`, `pr-validation`, `dependency-review`
   - ✅ Require branches to be up to date
   - ✅ Require conversation resolution before merging

### 3. Configure Secrets (if needed)

For deployment workflows (future):
- Go to Settings → Secrets and variables → Actions
- Add secrets as needed (e.g., `VERCEL_TOKEN`, `NPM_TOKEN`)

## Customization

### Update Reviewer Names

Edit `.github/auto-assign.yml`:
```yaml
reviewers:
  - your-github-username
  - another-maintainer
```

### Adjust Stale Bot Settings

Edit `.github/workflows/stale.yml`:
```yaml
days-before-issue-stale: 60  # Change as needed
days-before-pr-stale: 30     # Change as needed
```

### Add Custom Labels

Edit `.github/labels.yml` and push to main to sync labels:
```yaml
- name: your-label
  color: hexcolor
  description: Your description
```

### Modify CI Node Versions

Edit `.github/workflows/ci.yml`:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]  # Remove or add versions
```

## Testing Workflows Locally

### Using Act

Install [act](https://github.com/nektos/act):
```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

Run workflows:
```bash
# List available workflows
act -l

# Run CI workflow
act push

# Run PR workflow
act pull_request
```

### Manual Testing

1. Create a test branch
2. Make a small change
3. Open a PR to trigger workflows
4. Observe workflow runs in Actions tab

## Monitoring

### View Workflow Runs

1. Go to Actions tab
2. Select workflow from left sidebar
3. View recent runs

### Check Failed Workflows

1. Click on failed workflow run
2. Expand failed job
3. Review logs
4. Fix issues and re-run if needed

### Security Alerts

Monitor these regularly:

1. **Security → Dependabot alerts**
   - Review and update vulnerable dependencies

2. **Security → Code scanning alerts**
   - Review CodeQL findings
   - Address security issues

3. **Pull requests**
   - Review Dependabot PRs
   - Merge security updates promptly

## Maintenance Tasks

### Weekly
- [ ] Review open PRs
- [ ] Check security alerts
- [ ] Merge Dependabot PRs

### Monthly
- [ ] Review and close stale issues
- [ ] Update documentation if needed
- [ ] Check workflow efficiency

### Quarterly
- [ ] Review and update labels
- [ ] Audit workflow configurations
- [ ] Update branch protection rules

## Troubleshooting

### Workflow Not Running

**Issue:** Workflow doesn't trigger on PR

**Solution:**
1. Check workflow triggers in YAML
2. Verify branch name matches trigger pattern
3. Check if workflow is disabled in Actions tab

### Permission Errors

**Issue:** Workflow fails with permission error

**Solution:**
1. Check workflow `permissions:` section
2. Verify GITHUB_TOKEN has required permissions
3. Go to Settings → Actions → General → Workflow permissions

### Failing Semantic PR Check

**Issue:** PR title check always fails

**Solution:**
1. Educate contributors on semantic commit format
2. Add examples in PR template
3. Consider making it non-blocking (remove `requireScope`)

### Too Many Dependabot PRs

**Issue:** Getting flooded with Dependabot PRs

**Solution:**
Edit `.github/dependabot.yml`:
```yaml
open-pull-requests-limit: 5  # Reduce from 10
```

Or add more ignores:
```yaml
ignore:
  - dependency-name: "*"
    update-types: ["version-update:semver-patch"]
```

## Best Practices

### For Workflow Updates

1. **Test in a fork first**
   - Fork the repo
   - Test workflow changes
   - Merge when confident

2. **Use workflow_dispatch for testing**
   ```yaml
   on:
     workflow_dispatch:  # Allows manual trigger
   ```

3. **Keep workflows focused**
   - One responsibility per workflow
   - Don't combine unrelated jobs

4. **Monitor costs** (if using paid plan)
   - Check Actions usage in Settings → Billing
   - Optimize long-running workflows

### For Security

1. **Never commit secrets**
   - Use GitHub Secrets
   - Use environment variables

2. **Pin action versions**
   - Use specific versions: `actions/checkout@v4`
   - Not: `actions/checkout@main`

3. **Review third-party actions**
   - Check action source code
   - Use trusted actions only

4. **Limit permissions**
   - Use minimum required permissions
   - Don't use `write-all`

## Getting Help

### Resources
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Community Forum](https://github.community/c/code-to-cloud/github-actions/)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

### Support Channels
1. Open an issue in the repository
2. Email maintainers
3. GitHub Discussions (if enabled)

---

## Quick Reference

### Common Commands

```bash
# Validate workflow syntax
act -l

# Manually trigger workflow (if workflow_dispatch enabled)
gh workflow run workflow-name.yml

# View workflow runs
gh run list

# View specific run
gh run view <run-id>

# Re-run failed jobs
gh run rerun <run-id> --failed
```

### Useful Links

- [Actions Tab](../../actions)
- [Security Alerts](../../security)
- [Dependabot PRs](../../pulls?q=is%3Apr+author%3Aapp%2Fdependabot)
- [Branch Settings](../../settings/branches)

---

**Need help?** Contact the maintainers or open an issue!
