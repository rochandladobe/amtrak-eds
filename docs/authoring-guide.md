# Amtrak EDS Authoring Guide

## Overview

This site uses Adobe Edge Delivery Services (EDS). Content is authored in Google Docs (or Microsoft SharePoint) and automatically published to the live site via the AEM Code Sync integration.

## How It Works

1. Author content in Google Drive (your mounted folder)
2. Preview changes at `https://main--amtrak-eds--rochandladobe.hlx.page/`
3. Publish to live at `https://main--amtrak-eds--rochandladobe.hlx.live/`
4. Use the [AEM Sidekick Chrome Extension](https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo) to preview and publish

## Page Structure

Every page is a Google Doc. The document structure maps 1:1 to the rendered page:

- **Headings** → HTML headings (H1, H2, H3)
- **Paragraphs** → `<p>` tags
- **Bold links** → Primary buttons
- **Italic links** → Secondary buttons
- **Tables** → Blocks (components)
- **Horizontal rules** → Section dividers

## Block Reference

### Hero Block

Use this table at the top of a page for a full-width hero:

| Hero |
|------|
| ![Hero image](image-url) |
| # Heading Text |
| Description paragraph |
| **[Button Label](url)** |

### Booking Widget

Place this table to render the train search widget:

| Booking Widget |
|---------------|
| |

The booking widget has no content — it's self-contained JavaScript.

### Cards (Deals & Promotions)

| Cards |
|-------|
| ![Card image 1](url) | **[Deal Title](url)** Description text |
| ![Card image 2](url) | **[Deal Title](url)** Description text |
| ![Card image 3](url) | **[Deal Title](url)** Description text |

### Tabs (Onboard Experience)

| Tabs |
|------|
| Seating | ## Never Ride in the Middle Seat Content... ![image](url) |
| Private Rooms | Content... |
| Food & Dining | Content... |
| Baggage | Content... |

### Carousel (Feature Highlights)

| Carousel |
|----------|
| ![Map image](url) ## Trip Planning Map Discover more of America... [START PLANNING](url) |
| ![Train image](url) ## Track Your Train Check train status... [TRACK NOW](url) |
| ![App image](url) ## Travel Easier With the Amtrak app... [GET THE APP](url) |

### Columns (2-column layout)

| Columns |
|---------|
| Left column content | Right column content |

### Section Metadata

Add section metadata below any section content to apply styles:

| Section Metadata |
|-----------------|
| Style | dark |

Available styles: `light`, `dark`

## Nav Document (`/nav`)

The nav document defines the site navigation. See `/docs/nav-structure.md`.

## Footer Document (`/footer`)

The footer document defines the site footer. See `/docs/footer-structure.md`.

## Images

- Upload images to the same Google Drive folder
- Reference them in your document using Insert > Image
- EDS automatically optimizes and serves images via the CDN
- Recommended formats: JPEG for photos, SVG for icons/logos

## Environment URLs

| Environment | URL |
|-------------|-----|
| Preview | https://main--amtrak-eds--rochandladobe.hlx.page/ |
| Live | https://main--amtrak-eds--rochandladobe.hlx.live/ |
| GitHub | https://github.com/rochandladobe/amtrak-eds |

## Workflow

1. Make edits in Google Docs
2. Click **Preview** in the AEM Sidekick to preview changes
3. Review at the `.hlx.page` preview URL
4. Click **Publish** to push to the live `.hlx.live` URL
