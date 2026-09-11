# Storyline — Web Series Catalog

## Overview
A React + Vite single-page app that catalogs 243 Indian web series extracted from a Blogger blog. Each entry includes title, release date, language, quality, storyline, cast, episode descriptions, screenshots, and download links.

## Tech Stack
- **Frontend:** React 18 + Vite 6
- **Data:** Static JSON (`src/data/series.json`) — no backend or database
- **Runtime:** Node 22 (via docker-compose.base44.yml)

## Development
```bash
docker compose -f docker-compose.base44.yml up -d
```
App runs on port 3000 (mapped from Vite dev server on 5173). Live reload is active.

## Project Structure
- `src/App.jsx` — main app: search, category filters, grid, modal
- `src/components/SeriesCard.jsx` — grid card with poster + quality badge
- `src/components/SeriesDetail.jsx` — detail modal with full info
- `src/data/series.json` — all 243 series entries (extracted from blog feed)
- `src/index.css` — all styling (dark theme)

## Data Source
Content was extracted from `manvichughwebseries.blogspot.com` via the Blogger Atom JSON feed API. The extraction script lives in `/tmp` (not in the repo).

## Verification
- `curl localhost:3000` should return the HTML shell
- The grid should show ~243 series cards with poster images
- Search filters by title, cast, or storyline
- Category chips filter by actress
- Clicking a card opens a detail modal
