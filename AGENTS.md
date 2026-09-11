# Storyline — Web Series Catalog

## Stack
- Vite 6 + React 18 (no backend, no database)
- Data: `src/data/series.json` — 243 series entries (DO NOT modify this file)

## Dev Environment
- `docker compose -f docker-compose.base44.yml up -d` starts a `node:22-slim` container with the source bind-mounted
- Vite dev server runs on port 5173, mapped to host port 3000
- Live reload is active — edits appear in the preview automatically
- No secrets required

## Architecture
- `src/App.jsx` — main app: search, category filters, scroll reveal observer, curtain nav, scroll progress
- `src/components/SeriesCard.jsx` — grid card with frost-glass hover overlay
- `src/components/SeriesDetail.jsx` — two-pane split modal (gallery + data sheet)
- `src/components/CurtainNav.jsx` — fullscreen top-down curtain navigation
- `src/index.css` — "Sculpted Perspective" design system (Midnight Obsidian & Bone palette, Cormorant Garamond + Inter)

## Design System
- Colors: `#0A0A0B` (bg), `#F4F4F2` (text), `#D4AF37` (accent/gold), `#A1A1A1` (muted)
- Fonts: Cormorant Garamond (headlines, italic), Inter (interface/data)
- Favicon: `public/favicon.svg` — minimalist "M" from three vertical bars

## Verify
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` → 200
- Check browser console for errors after edits
