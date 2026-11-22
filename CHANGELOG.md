# 📝 Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Dates are taken from the git history.

## [Unreleased]
### Fixed
- **`computeRisk()` read the wrong time windows.** Its “trailing” 24 h and 6 h rain sums were taken from the end of a 12-day hourly series, which is the last *forecast* day, about 10 days ahead. Its precipitation probability came from two days ago. Both now anchor to the current hour and today. This affects searched places, map clicks, My Location, buffer insights and Weather Buddy. On a same-day sample, 37 of 91 locations changed score and 3 changed risk band.
- The weather-safe route samples and the state-level “Rainfall · last 24 h” choropleth now sum the trailing 24 h up to the current hour, in IST, instead of the full current (UTC) day including forecast hours.

### Added
- Full project documentation: a redesigned README with an animated banner, a 22-image gallery, a 2000→2030 timelapse GIF and a risk-model infographic. Also `docs/` (User Guide, Architecture, Methodology, Data Sources, Deployment, Gallery and an interactive `gallery.html`), plus CONTRIBUTING, SECURITY, issue and PR templates.

## 2026-10-07: Live link fixed
### Fixed
- A root `index.html` now redirects to `CLIMO-fixed/CLIMO-project/index.html`, so GitHub Pages no longer returns 404 ([#1](https://github.com/chakrabortysohini2005-stack/Web-Mobile-Application-CLIMO/pull/1)).
- `CLIMO_HTML.html` was renamed back to `CLIMO_backend.html`, so the landing page's **Explore** buttons resolve.

## 2026-09-02: Dashboard rename
### Changed
- `CLIMO_backend.html` → `CLIMO_HTML.html` (reverted on 2026-10-07).

## 2026-08-31 → 2026-09-01: Android pipeline
### Added
- The GitHub Actions workflow **Build CLIMO Web App to APK**: it wraps the web app in Cordova (`com.climo.webapp`), builds with JDK 17 and uploads `climo-app-debug-apk`.
### Changed
- The project folder was consolidated (`CLIMO-for webapp/` → `CLIMO-WEBAPP/` → `CLIMO/` → `CLIMO-fixed/CLIMO-project/`), with the workflow paths updated to match.

## 2026-08-27 → 2026-08-29: Initial upload
### Added
- The first upload of the CLIMO web app: splash, landing and GIS dashboard.
### Removed
- The early single-file prototype (`index.html`, `style.css`, `script.js`).
