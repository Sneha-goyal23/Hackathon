# 📝 Changelog

All notable changes to CLIMO are listed here. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/). Dates are commit dates.

## [Unreleased]

### Added
- 📚 **Full documentation suite**: a redesigned `README.md` with an animated SVG banner, live stats, feature matrix, Mermaid diagrams and a screenshot gallery.
- 🖼 **Gallery**: 17 real screenshots (desktop at 2× and Pixel 7 mobile) plus an animated 2000→2030 climate time-lapse GIF, in `docs/GALLERY.md` and an interactive lightbox page at `docs/gallery.html` (filters, keyboard and swipe navigation).
- `docs/ARCHITECTURE.md`: module map, boot sequence, layer catalogue, routing and alert flows, state, external services, design tokens.
- `docs/RISK_MODEL.md`: flood-risk index formula and rationale, worked example, route scoring, avoid zones, buffers, Haversine, report-verification rules, limitations.
- `docs/DATA.md`: station registry (all 90 stations), `WEATHER_DATA` dictionary and trends, API contracts, CSV format, provenance notes.
- `docs/USER_GUIDE.md`, `docs/DEPLOYMENT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`.

## 2026-10-06 — Live link fix

### Fixed
- GitHub Pages 404: added a root `index.html` that redirects into `CLIMO-fixed/CLIMO-project/`.
- "Explore" buttons on the landing page now open the dashboard (the file was renamed back to `CLIMO_backend.html`).

## 2026-08-31 → 2026-09-02 — Android build

### Added
- `.github/workflows/android.yml`: wraps the web app with **Apache Cordova** and uploads a debug APK artifact (`climo-app-debug-apk`) on every push and PR to `main`/`master`.

### Changed
- Project folder reorganised into `CLIMO-fixed/CLIMO-project/`, and workflow paths updated to match.

## 2026-08-27 — Initial release

### Added
- Splash, landing page and the all-India GIS dashboard.
- 90-station live network on Open-Meteo with a flood-risk index.
- Risk heatmap, state-level choropleth, buffer analysis, satellite basemap.
- Weather-safe routing (OpenRouteService + avoid polygons).
- Weather Time Explorer (hourly) and 2000–2030 climate slider (observed + LSTM forecast).
- Weather Buddy assistant, alerts (banner, Notification, simulated SMS), CSV export.
- 16-language interface.
