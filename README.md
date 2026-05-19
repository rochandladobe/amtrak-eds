# Amtrak - Edge Delivery Services

Built on [AEM Edge Delivery Services](https://www.hlx.live/docs/).

## Environments
- Preview: https://main--amtrak-eds--rochandladobe.hlx.page/
- Live: https://main--amtrak-eds--rochandladobe.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm test
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
2. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
3. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
4. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
5. Open the `{repo}` directory in your favorite IDE and start coding :)

## Blocks

| Block | Description |
|-------|-------------|
| [header](blocks/header) | Site navigation header with Amtrak logo and main nav |
| [footer](blocks/footer) | Site footer with links and social icons |
| [hero](blocks/hero) | Full-width hero with background image and CTA |
| [booking-widget](blocks/booking-widget) | Train search/booking form |
| [cards](blocks/cards) | Deals & promotions card carousel |
| [tabs](blocks/tabs) | Tabbed content sections (Onboard Experience) |
| [carousel](blocks/carousel) | Feature carousel (Trip Planning, Track Train, App) |
| [columns](blocks/columns) | Multi-column content layout |

## Content Structure

The homepage maps to the following blocks:
- **Nav**: header block (top navigation)
- **Booking Widget**: booking-widget block (search form)
- **Hero Banner**: hero block (Kids Ride Free)
- **Deals Carousel**: cards block
- **Partnership Section**: columns block
- **Onboard Tabs**: tabs block
- **Feature Carousel**: carousel block
- **Footer**: footer block
