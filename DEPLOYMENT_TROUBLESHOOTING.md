# Deployment Troubleshooting

## Issue: Latest Changes Not Deployed

### Symptoms
- Code is merged to `main` branch
- CI pipeline passes successfully
- Changes are not visible on production site (refactron.dev)

### Root Cause Analysis

This issue occurs because:

1. **No Deployment Workflow**: The repository only has a CI workflow that builds and tests code, but doesn't deploy it
2. **Vercel Integration**: Deployments rely on Vercel's Git integration, which may not be properly configured
3. **Missing Configuration**: GitHub Actions deployment workflow exists but requires secrets

### Immediate Solutions

#### Solution 1: Manual Deployment via Vercel Dashboard

**Steps:**
1. Log in to [Vercel Dashboard](https://vercel.com)
2. Find the Refactron Website project
3. Navigate to the "Deployments" tab
4. Click on the latest deployment
5. Click "Redeploy" button
6. Select "Use existing Build Cache" (faster) or "Rebuild" (fresh build)
7. Wait for deployment to complete

**Time:** ~2-5 minutes

#### Solution 2: Deploy via Vercel CLI

**Prerequisites:**
```bash
npm install -g vercel
vercel login
```

**Deploy:**
```bash
cd /path/to/Refactron_Website
vercel --prod
```

**Time:** ~3-7 minutes

#### Solution 3: Trigger GitHub Actions Deployment

**Prerequisites:**
- `VERCEL_TOKEN` secret configured
- `VERCEL_ORG_ID` secret configured
- `VERCEL_PROJECT_ID` secret configured

**Steps:**
1. Go to [Actions tab](https://github.com/Refactron-ai/Refactron_Website/actions)
2. Select "Deploy to Vercel" workflow
3. Click "Run workflow"
4. Select `main` branch
5. Click "Run workflow" button

**Time:** ~5-10 minutes

### Long-term Solutions

#### Option A: Configure Vercel Git Integration (Recommended)

**Why:** Fully automatic deployments with zero configuration needed after setup.

**Setup Steps:**

1. **Install Vercel for GitHub:**
   - Go to [Vercel's GitHub integration page](https://vercel.com/integrations/github)
   - Click "Add Integration"
   - Select your GitHub account/organization
   - Choose to install for "All repositories" or select "Refactron_Website"

2. **Connect the Repository:**
   - In Vercel Dashboard, click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose "Refactron-ai/Refactron_Website"
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Set Production Branch:**
   - Go to Project Settings → Git
   - Set "Production Branch" to `main`
   - Enable "Automatically deploy on push to production branch"

5. **Test:**
   - Make a small change to README
   - Commit and push to main
   - Verify deployment triggers automatically

**Result:** Every push to `main` will automatically deploy to production.

#### Option B: Configure GitHub Actions Deployment

**Why:** Gives you more control over the deployment process and doesn't depend on external integrations.

**Setup Steps:**

1. **Get Vercel Credentials:**

   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project (run in project directory)
   cd /path/to/Refactron_Website
   vercel link
   
   # Get project info
   cat .vercel/project.json
   ```

   This will show you:
   - `projectId` (VERCEL_PROJECT_ID)
   - `orgId` (VERCEL_ORG_ID)

2. **Create Vercel Token:**
   - Go to [Vercel Account Tokens](https://vercel.com/account/tokens)
   - Click "Create"
   - Name: "GitHub Actions Deployment"
   - Scope: Full Account
   - Copy the token (VERCEL_TOKEN)

3. **Add Secrets to GitHub:**
   - Go to [Repository Settings → Secrets](https://github.com/Refactron-ai/Refactron_Website/settings/secrets/actions)
   - Click "New repository secret"
   - Add three secrets:
     ```
     Name: VERCEL_TOKEN
     Value: <your-vercel-token>
     
     Name: VERCEL_ORG_ID
     Value: <your-org-id>
     
     Name: VERCEL_PROJECT_ID
     Value: <your-project-id>
     ```

4. **Test Deployment:**
   - Go to [Actions](https://github.com/Refactron-ai/Refactron_Website/actions)
   - Select "Deploy to Vercel"
   - Click "Run workflow"
   - Verify deployment succeeds

5. **Verify Automatic Deployments:**
   - Make a small change
   - Push to main
   - Check that deployment workflow runs automatically

**Result:** GitHub Actions will automatically deploy on every push to `main`.

### Verification Steps

After implementing any solution, verify it works:

1. **Check Deployment:**
   - Visit https://refactron.dev
   - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
   - Verify the latest changes are visible

2. **Check Version:**
   - Look for version indicators in the UI
   - For PR #21, verify v1.0.0 is shown instead of v0.1.0

3. **Test Automatic Deployment:**
   - Create a test commit: `git commit --allow-empty -m "test: deployment"`
   - Push to main: `git push`
   - Wait 3-5 minutes
   - Verify site updates

### Prevention

To prevent this issue from recurring:

1. **✅ Set up automatic deployments** (Option A or B above)
2. **📊 Add deployment status badge** to README
3. **🔔 Set up deployment notifications** (Slack/Email)
4. **📝 Document the deployment process** (already done in DEPLOYMENT.md)
5. **👥 Train team members** on deployment process

### Monitoring

Set up monitoring to catch deployment issues early:

1. **Vercel Notifications:**
   - Project Settings → Notifications
   - Enable email/Slack notifications for deployment failures

2. **GitHub Actions Status:**
   - Watch the Actions tab
   - Set up failure notifications

3. **Uptime Monitoring:**
   - Use UptimeRobot or similar
   - Monitor https://refactron.dev
   - Alert on downtime or unexpected changes

### Common Issues

#### Issue: Vercel Integration Not Triggering

**Symptoms:** Changes pushed to main, but no deployment started.

**Solutions:**
1. Check GitHub webhooks (Settings → Webhooks)
2. Verify Vercel integration is installed
3. Check Vercel project settings for correct repository link
4. Ensure production branch is set to `main`

#### Issue: Deployment Fails with Build Error

**Symptoms:** Deployment starts but fails during build.

**Solutions:**
1. Check Vercel deployment logs
2. Run `npm run build` locally to reproduce
3. Verify all dependencies are in package.json
4. Check for environment variable issues

#### Issue: Old Version Still Shows After Deployment

**Symptoms:** Deployment succeeds but site shows old content.

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check CDN cache (if using one)
3. Verify correct domain is deployed to
4. Check Vercel domains configuration

### Support

If you still have issues:

1. **Check Logs:**
   - GitHub Actions logs
   - Vercel deployment logs
   - Browser console errors

2. **Documentation:**
   - Read [DEPLOYMENT.md](DEPLOYMENT.md)
   - Check [Vercel Documentation](https://vercel.com/docs)

3. **Get Help:**
   - Open an issue in this repository
   - Contact the development team
   - Reach out to Vercel support

### Related Files

- `.github/workflows/deploy.yml` - GitHub Actions deployment
- `.github/workflows/ci.yml` - Build and test workflow
- `DEPLOYMENT.md` - Complete deployment guide
- `vercel.json` - Vercel configuration
