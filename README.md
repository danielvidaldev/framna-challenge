# Portfolio Website

Portfolio site with admin panel built with Next.js 16.

## Setup

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Commands

```bash
yarn dev           # Start dev server
yarn build         # Build for production
yarn start         # Run production build
yarn lint          # Run ESLint
yarn test          # Run tests
yarn test:watch    # Run tests in watch mode
yarn test:coverage # Generate coverage report
```

## Next.js Features Used

### Static Site Generation (SSG)

The home page is statically generated at build time - all content is pre-rendered into HTML during the build. This means the page loads instantly since the data is fetched from the API once during build, not on every request.

When you update content through the admin panel, rebuild and redeploy to see changes.

### Client-Side Rendering (CSR)

The admin panel uses client-side rendering since it's a private area that needs real-time data and doesn't benefit from SEO.

### Image Optimization

Using Next.js Image component for lazy loading, preventing layout shift, and priority loading for above-the-fold images.

### Font Optimization

Fonts are loaded via `next/font` which downloads them at build time, eliminating external requests.

### Static Export

Configured with `output: "export"` so it builds to static files. No server required - deploy to GitHub Pages, Netlify, Vercel, etc.

## Project Structure

```
├── app/
│   ├── _components/       # Page-specific components
│   ├── admin/             # Admin panel
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── Header.tsx
│   └── ui/                # Reusable UI components
├── lib/
│   ├── api.ts             # API service
│   └── constants.ts
├── store/                 # Zustand state management
├── types/                 # TypeScript types
└── __tests__/             # Test files
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand
- Jest + React Testing Library

## Deployment

```bash
yarn build
```

Generates static files in `out/` folder. Deploy to any static host.

## API Config

Update in `lib/api.ts`:

```typescript
const API_BASE_URL = "your-api-url";
const RESOURCE_NAME = "your-resource";
```
