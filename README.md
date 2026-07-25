# danielprada.co

Personal site for [Daniel Prada](https://www.danielprada.co) — built with **Nuxt 4** and deployed as a fully static site to S3 / CloudFront.

## Requirements

- Node.js 22+ (LTS recommended)
- [pnpm](https://pnpm.io) (preferred; `npm` also works with the included `.npmrc`)

## Setup

```bash
pnpm install
# or: npm install
```

## Development

```bash
pnpm dev
```

## Static production build (S3)

```bash
pnpm build
# or
pnpm generate
```

This runs `nuxt generate` and pre-renders every route to plain HTML + assets in:

```
.output/public/
```

Upload the **contents** of `.output/public/` to your S3 bucket — same idea as the old Vue CLI `dist/` folder, just a different output path.

Routes generated:

| Path         | Page      |
|--------------|-----------|
| `/`          | Home      |
| `/nerd`      | Nerd      |
| `/wanderer`  | Wanderer  |
| `/creative`  | Creative  |

Because each route is a real HTML file, CloudFront / S3 does **not** need an SPA fallback for these paths. You may still want a custom error document for unknown URLs.

## Preview the static build locally

```bash
npm run preview
```

## Project layout

```
app/
  app.vue              # Root shell + SVG playground host
  pages/               # File-based routes (static HTML)
  components/          # Shared UI (utilities + VueTyper)
  assets/styles/       # Global CSS + fonts
  plugins/             # Font Awesome
public/                # Static assets copied as-is (images, fonts, media)
nuxt.config.ts         # Nuxt + prerender config
```
