# Mall of America – Interactive Sales Deck

A **non‑linear, video‑first, interactive sales deck** for Mall of America.  
Designed for prospective tenants, sponsors, and event partners – replaces static PDFs and manual walkthroughs.

**Live demo:** [https://moa-sales-deck.vercel.app](https://moa-sales-deck.vercel.app)

---

## 🚀 Key features

- **Non‑linear exploration** – Entry screen with three choice cards + persistent top sidebar (jump to any slide).  
- **Rich interactions** – Drag‑to‑compare slider, click‑to‑reveal benefits, hover incentive badge, 3D flip cards, live ROI simulator, peak‑hour toggle.  
- **“I need to be here” moment** – Live ROI Simulator with urgency counter, growth explosion animation, and scarcity banner.  
- **Video‑first** – Background videos, full‑screen Video Story slide (tablet frame with play/pause), attraction video, retail background loop.  
- **AI‑generated visuals** – Midjourney images for luxury wing, dining hall, aquarium, Crayola Experience (all optimised).  
- **Performance** – Lighthouse **99–100** (Desktop), 100 on Accessibility, Best Practices, SEO.  
- **Fully responsive** – Works on desktop and tablet (primary sales devices).

---

## 🛠️ Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom luxury palette (glassmorphism, gold accents) |
| Animations | Framer Motion |
| Images | Next.js `<Image>` (lazy loading, optimisation) |
| Deployment | Vercel (auto‑deploys from GitHub) |

---

## 🧠 Architecture & expandability

- **Slide deck core** – `SlideDeck.tsx` manages slide order; adding a new slide is a one‑line change.  
- **Sidebar** – `quickLinks` array controls persistent navigation.  
- **Venue flip cards** – data‑driven array; new venues require only a new object.  
- All interactive components (ROI Simulator, BeforeAfterSlider, Peak toggle) are self‑contained and reusable.

---

## 📦 Local setup

```bash
git clone https://github.com/M-Nihal17/moa-sales-deck.git
cd moa-sales-deck
npm install
npm run dev


---


## 📁 Project structure

moa-sales-deck/
├── app/
│   ├── components/       # EntryScreen, Sidebar, VideoStory, ROISimulator, etc.
│   ├── layout.tsx
│   └── page.tsx
├── lib/                  # Static data (stats, tenants, dining, attractions)
├── public/
│   ├── videos/           # Compressed MP4s (entry, story, retail background)
│   ├── images/           # Posters, logo
│   └── ai/               # AI‑generated images (JPG/WebP)
├── tailwind.config.js
├── next.config.ts
└── package.json

## 🤝 AI & asset credits
AI‑generated images – Midjourney v6 / DALL·E 3 (luxury wing, dining hall, aquarium, Crayola).

Stock background video – Pexels (mall stairs / ad screen loop).

All videos are compressed (<31 MB) and use preload="metadata".


## 🔮 Future improvements

Backend form for tour requests (Airtable / Supabase).

Analytics to track slide engagement.

Convert more static images to looping video for deeper immersion.
