# Deployment Guide

This document explains how deployments work for the Refactron Website and how to troubleshoot deployment issues.

## Deployment Methods

The Refactron Website can be deployed in two ways:

### 1. Vercel Git Integration (Primary)

**How it works:**
- Vercel is connected to the GitHub repository
- Automatic deployments trigger on every push to `main` branch
- Preview deployments are created for pull requests

**Requirements:**
- Vercel project must be linked to this GitHub repository
- Vercel integration must be installed on the GitHub organization/account

**Troubleshooting:**
If deployments aren't happening automatically:

1. **Check Vercel Dashboard:**
   - Log in to [vercel.com](https://vercel.com)
   - Navigate to the project
   - Check deployment logs for errors

2. **Verify Git Integration:**
   - Go to Project Settings → Git
   - Ensure the repository is correctly connected
   - Check that "Production Branch" is set to `main`

3. **Check Webhook:**
   - Go to GitHub Settings → Webhooks
   - Find the Vercel webhook
   - Check recent deliveries for failures

### 2. GitHub Actions Deployment (Backup)

**How it works:**
- The `.github/workflows/deploy.yml` workflow runs on every push to `main`
- It builds the project and deploys to Vercel using the Vercel API

**Requirements:**
This method requires three GitHub repository secrets to be configured:

```
VERCEL_TOKEN        - Vercel API token
VERCEL_ORG_ID       - Your Vercel organization ID
VERCEL_PROJECT_ID   - Your Vercel project ID
```

**Setup Instructions:**

1. **Get Vercel Token:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Create token at: https://vercel.com/account/tokens
   ```

2. **Get Organization and Project IDs:**
   ```bash
   # In project directory
   vercel link
   
   # IDs are saved in .vercel/project.json
   cat .vercel/project.json
   ```

3. **Add Secrets to GitHub:**
   - Go to: Settings → Secrets and variables → Actions
   - Add the three secrets listed above

## Deployment Process

### Automatic Deployment (Main Branch)

When code is merged to `main`:

1. ✅ CI workflow runs (build, test, lint)
2. ✅ Code is merged
3. 🚀 Deployment happens via Vercel (or GitHub Actions if configured)
4. 🌐 Changes are live at https://refactron.dev

### Manual Deployment

If you need to manually trigger a deployment:

**Option 1: Through Vercel Dashboard**
1. Go to your project in Vercel
2. Click "Redeploy" on the latest deployment
3. Select "Use existing Build Cache" or "Rebuild"

**Option 2: Through GitHub Actions**
1. Go to Actions → Deploy to Vercel
2. Click "Run workflow"
3. Select `main` branch
4. Click "Run workflow"

**Option 3: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

## Current Status

As of the latest update:
- ✅ CI/CD workflows are set up
- ✅ Build configuration is correct
- ⚠️ **Vercel Git integration needs verification**
- ⚠️ **GitHub Actions deployment needs secrets configuration**

## Why Recent Changes Haven't Deployed

**Issue:** PR #21 was merged to main with v1.0.0 updates, but changes aren't live.

**Likely Causes:**
1. **Vercel not connected:** The Vercel Git integration may not be properly set up
2. **Deployment failed silently:** Check Vercel dashboard for failed deployments
3. **No automatic trigger:** The GitHub Actions deployment workflow requires secrets to be configured

**Resolution Steps:**

1. **Immediate Fix - Manual Deployment:**
   - Go to Vercel Dashboard
   - Click "Redeploy" on the latest deployment
   - OR use Vercel CLI: `vercel --prod`

2. **Long-term Fix - Configure Automation:**
   - Set up Vercel Git integration properly, OR
   - Configure GitHub Actions deployment secrets

## Monitoring Deployments

**Vercel Dashboard:**
- Visit: https://vercel.com/[your-org]/refactron-website
- View deployment history
- Check logs for errors

**GitHub Actions:**
- Visit: https://github.com/Refactron-ai/Refactron_Website/actions
- Check "Deploy to Vercel" workflow runs
- Review logs for deployment status

## Environment Variables

If your app requires environment variables:

1. **In Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add required variables
   - Redeploy for changes to take effect

2. **In GitHub Actions:**
   - Add variables as GitHub secrets
   - Reference them in the deploy workflow

## Support

For deployment issues:
1. Check this documentation
2. Review Vercel dashboard logs
3. Check GitHub Actions logs
4. Contact the team lead or DevOps

## Related Files

- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `.github/workflows/ci.yml` - Build and test workflow
- `vercel.json` - Vercel configuration
- `package.json` - Build scripts and dependencies
