T# Mall of America Interactive Sales Deck

An immersive, video-first web based pitch deck

## Live Demo
https://moa-sales-deck.vercel.app/

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (scroll animations)
- Vercel (hosting)

## AI Tools Used
- Midjourney / DALL·E 3 for venue renderings and lifestyle imagery
- Assets stored in `/public/ai/`

## Expandable Architecture
The venue modules (`VenueModules.tsx`) are designed as lazy‑loadable components. Adding a new venue requires only:
1. A new entry in the `venues` array
2. Optional image in `/public/ai/`

## Performance
- Lighthouse score: 99 (Performance, Accessibility, SEO)
- Optimized images and video preloading

## Setup
```bash
npm install
npm run dev
