# Deployment (Vercel)

## Prerequisites

- A Vercel account
- Node.js 20+ locally
- Git access to this repository

## Recommended deployment flow (recommended)

1. Push the project to a Git branch.
2. In Vercel, click **Add New > Project** and import the repository.
3. Set the root directory to the repo root:
   - `/Users/jb/Documents/New project 3` (local path)
   - in Vercel this is simply the repository root
4. Set build settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Set Node.js version in project environment settings (or Vercel build image override):
   - `Node.js 20.x` (recommended for Next.js 16 compatibility)
6. Save and deploy.

## Environment variables

This app is currently frontend-only and content-driven, so no application secrets are required for default local or Vercel deployments.

If you later connect live services, add only runtime variables needed by those integrations.

## Post-deploy checks

1. Open the deployment URL and verify every section renders.
2. Confirm interactive nodes in:
   - Architecture Map
   - Workflow Demo step cards
   - Cost calculator
   - Sources and build notes
3. Run a production build locally or in CI when dependencies change:

```bash
npm run build
```

## Optional Vercel CLI route

If you use Vercel CLI, deploy with:

```bash
npm install -g vercel
vercel
```

For production:

```bash
vercel --prod
```

