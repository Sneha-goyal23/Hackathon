<p align="center"><img src="docs/assets/banner.svg" width="100%" alt="CLIMO banner"></p>

# 🤝 Contributing to CLIMO

Thanks for helping people across India *know the sky and own the day*. CLIMO is plain HTML, CSS and JavaScript with **no build step**, so you can make your first change in a couple of minutes.

**Contents:** [Setup](#-setup) · [Where things live](#-where-things-live) · [Conventions](#-conventions) · [Recipes](#-recipes) · [Testing checklist](#-testing-checklist) · [Pull requests](#-pull-requests) · [Good first issues](#-good-first-issues)

---

## ⚡ Setup

```bash
git clone https://github.com/chakrabortysohini2005-stack/Web-Mobile-Application-CLIMO.git
```

```bash
cd Web-Mobile-Application-CLIMO && python3 -m http.server 8080
```

Open <http://localhost:8080>, edit a file, and refresh. That's it.

> Use `localhost` rather than `file://`. Geolocation and notifications only work in a secure context.

---

## 🗺 Where things live

| You want to change… | Edit |
|:--|:--|
| Splash animation | `CLIMO-fixed/CLIMO-project/index.html`, `css/index.css`, `js/index.js` |
| Landing page | `CLIMO.html`, `css/climo.css`, `js/climo.js` |
| Dashboard layout / panels | `CLIMO_backend.html`, `css/app.css` |
| Translations | `js/app.js` → `TRANSLATIONS` (top of file) |
| Stations | `js/app.js` → `INDIA_STATIONS` |
| Climate data (2000–2030) | `js/app.js` → `WEATHER_DATA` (line ~392, a single very long line) |
| Risk scoring | `js/app.js` → `computeRisk()`, `RISK_THRESHOLDS` |
| Routing | `js/app.js` → `ORS_CONFIG`, `fetchWeatherSafeRoute()` |
| Assistant | `js/app.js` → `executeGISCommand()`, `extractLocationFromQuery()` |
| CI / APK | `.github/workflows/android.yml` |
| Docs | `README.md`, `docs/` |

> 💡 `app.js` is about 835 KB because of the embedded dataset on line 392. Many editors slow down on that line, so use search or jump-to-symbol instead of scrolling. `sed -n '393,$p' js/app.js` prints everything after the data.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full module map.

---

## 📐 Conventions

- **No new frameworks or bundlers** unless the change really needs one. Keeping it "open a file and it runs" is a feature.
- **Keep the IIFE.** App code lives inside `(function(){ "use strict"; … })();`. Only i18n (`window.t`) is global.
- **One source of truth.** Use `RISK_THRESHOLDS`, `riskColor()` and `riskLabel()`. Never hard-code `34` or `66`.
- **Escape user and API text** before putting it in `innerHTML`: use `escapeHTML()`.
- **Be gentle with Open-Meteo.** Batch coordinates (`latitude=a,b,c`) or keep the 5-worker pool. Never fire one request per item in a loop.
- **Times are IST.** Parse API timestamps with `parseIST()`.
- **Wrap `localStorage`** in `try/catch` (sandboxed WebViews throw).
- **Style tokens:** use the CSS variables (`--accent-cyan`, `--bg-panel`, …) instead of new hex values.
- **Comments explain *why*.** The existing code does this well, so please keep it up.
- **Commits:** short imperative subject, for example `Restrict assistant geocoding to India`.

---

## 🧪 Recipes

### ➕ Adding a station

```js
// js/app.js → INDIA_STATIONS
{id:50060, code:"IMD-XYZ-50060", name:"Your Town", state:"Your State", type:"AWS", lat:12.3456, lon:78.9012},
```

- `type` must be one of `AWS`, `radar`, `rain_gauge`, `river_gauge`.
- `state` must match the spelling other stations use for that state, so search and choropleth fallback group it correctly.
- For the 2000–2030 slider, add 31 rows to `WEATHER_DATA` with `Station_ID: 50060`. Without them the station simply won't appear in the year heatmap.

### 🌐 Adding or fixing a language

1. Add `{ code:'xx', native:'…', english:'…' }` to `LANGUAGES`.
2. Copy the `en:` block in `TRANSLATIONS` to `xx:` and translate **every key**. Missing keys fall back to English.
3. In HTML, mark new strings with `data-i18n="key"` (text) or `data-i18n-placeholder="key"`.
4. For right-to-left scripts (Urdu), check the layout. `applyLanguage` sets `<html lang>` but not `dir`.

### 🗺 Adding a choropleth parameter

Add an entry to `CHOROPLETHS` (`title`, `unit`, `min`, `max`, `stops`, `format`), add an `<option>` to `#weatherLayerSelect`, and make sure `fetchLiveStateWeather()` requests the variable in `current=`.

### 💬 Teaching Weather Buddy a new intent

Add a regex branch in `executeGISCommand()` **before** the generic weather-at-place fallback, and return HTML built with `escapeHTML()` around any user or API text.

---

## ✅ Testing checklist

There is no automated suite yet (adding Playwright smoke tests would be a great contribution). Before opening a PR, check by hand:

- [ ] Dashboard shows **"90 Indian observatories online"** and there are no console errors
- [ ] Each sidebar toggle turns its layer on and off cleanly
- [ ] Station drawer opens; the nearest-station link works
- [ ] Time explorer: hourly slider and 2000–2030 slider both update the map
- [ ] Weather Buddy answers `weather in Pune` and `highest risk locations`
- [ ] Switch to at least one non-English language and back
- [ ] Narrow window (≤ 650 px): ☰ drawer, assistant and time explorer still usable
- [ ] Export Report downloads a CSV that opens in a spreadsheet app

---

## 🔀 Pull requests

1. Fork, then branch: `git checkout -b feat/short-description`.
2. Keep PRs focused: one feature or fix each.
3. Include **before/after screenshots** for UI changes. The [gallery](docs/GALLERY.md) shows the expected look.
4. Update docs if behaviour changes (README feature list, `docs/*`).
5. The **Android APK workflow** runs on your PR, so make sure it passes.

---

## 🌱 Good first issues

| Idea | Where |
|:--|:--|
| Restrict geocoding to India (`&countryCode=IN`) so *Kochi* doesn't resolve to Japan | `geocodePlace()` |
| Wire `verifyReport()` into the Local feedback box (it exists but is never called) | `openDrawer()` |
| Translate dynamic strings (drawer, route status, assistant replies) | `js/app.js` |
| Set `dir="rtl"` for Urdu | `applyLanguage()` |
| Move `WEATHER_DATA` to `data/weather.json` and `fetch()` it | `js/app.js` |
| Add Playwright smoke tests and a CI job | new `tests/` |
| Make the CI copy step explicit (`cp -R css js *.html`) | `.github/workflows/android.yml` |

By contributing, you agree that your contributions will be licensed under the project's license once one is added.
