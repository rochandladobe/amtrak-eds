# Amtrak EDS Setup Guide

## Prerequisites

- GitHub account with access to https://github.com/rochandladobe/amtrak-eds
- Google Drive or SharePoint account for content authoring
- [AEM Sidekick Chrome Extension](https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo)

## Step 1: Set Up Content Storage

### Option A: Google Drive

1. Create a folder in Google Drive named `amtrak-eds`
2. Share the folder with `helix@adobe.com` (read access)
3. Copy the folder URL (e.g., `https://drive.google.com/drive/folders/ABC123`)
4. Update `fstab.yaml` in the repo:
   ```yaml
   mountpoints:
     /: https://drive.google.com/drive/folders/ABC123
   ```

### Option B: SharePoint

1. Create a SharePoint site or document library
2. Share with `helix@adobe.com`
3. Update `fstab.yaml`:
   ```yaml
   mountpoints:
     /: https://YOUR_TENANT.sharepoint.com/sites/amtrak-eds/Shared%20Documents/
   ```

## Step 2: Install AEM Code Sync App

1. Go to https://github.com/apps/aem-code-sync
2. Click **Install**
3. Select the `rochandladobe/amtrak-eds` repository
4. Approve all requested permissions

## Step 3: Create Content Documents

Create these documents in your Google Drive / SharePoint folder:

| Document name | Path | Description |
|--------------|------|-------------|
| `index` | `/` | Homepage |
| `nav` | `/nav` | Navigation |
| `footer` | `/footer` | Footer |

Use the document structures described in the `docs/` folder.

## Step 4: Install AEM Sidekick

1. Install [AEM Sidekick](https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo) from Chrome Web Store
2. Navigate to your Google Drive folder
3. Click the Sidekick icon and configure it with your repo

## Step 5: Local Development

```bash
# Install AEM CLI
npm install -g @adobe/aem-cli

# Clone the repo
git clone https://github.com/rochandladobe/amtrak-eds.git
cd amtrak-eds

# Install dependencies
npm install

# Start local dev server (proxies content from .hlx.page)
aem up
# Opens http://localhost:3000
```

## Step 6: Deploy

1. Push your code changes to GitHub (main branch)
2. AEM Code Sync automatically picks up the changes
3. Preview URL: `https://main--amtrak-eds--rochandladobe.hlx.page/`
4. Publish via Sidekick to push to: `https://main--amtrak-eds--rochandladobe.hlx.live/`

## Environment URLs

| Environment | URL |
|-------------|-----|
| Local dev | http://localhost:3000 |
| Preview | https://main--amtrak-eds--rochandladobe.hlx.page/ |
| Live | https://main--amtrak-eds--rochandladobe.hlx.live/ |
| GitHub | https://github.com/rochandladobe/amtrak-eds |
