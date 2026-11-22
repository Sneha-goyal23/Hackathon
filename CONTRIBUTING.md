# 🤝 Contributing to CLIMO

Thanks for helping people *know the sky and own the day*. Here is how to get a change in smoothly.

## 🧰 Setup (about 30 seconds)

```bash
git clone https://github.com/chakrabortysohini2005-stack/Web-Mobile-Application-CLIMO.git
```

```bash
cd Web-Mobile-Application-CLIMO && python3 -m http.server 8080
```

There is no `npm install` and no build step. Edit a file, refresh the browser, done.

## 🌿 Workflow

1. **Fork** the repo and create a branch: `feat/<thing>`, `fix/<thing>` or `docs/<thing>`.
2. Keep each PR focused: one feature or fix.
3. Use [Conventional Commits](https://www.conventionalcommits.org/), for example `feat(route): show ETA delta in minutes` or `fix(risk): use trailing 24h window`.
4. Open a PR and fill in the template. CI will build the Android APK as a sanity check.
5. Include a **screenshot or GIF** for any UI change.

## 🗂️ Where things live

| You want to… | Edit |
|---|---|
| Change the splash screen | `CLIMO-fixed/CLIMO-project/index.html`, `css/index.css`, `js/index.js` |
| Change the landing page | `CLIMO.html`, `css/climo.css`, `js/climo.js` |
| Change the dashboard UI | `CLIMO_backend.html`, `css/app.css` |
| Change data, risk, layers, routing or the assistant | `js/app.js` (see the module map in [ARCHITECTURE.md](docs/ARCHITECTURE.md)) |
| Change the Android build | `.github/workflows/android.yml` |

## ✍️ Code style

- **Vanilla JS (ES2020)**. Do not add frameworks or bundlers.
- Two-space indentation, `const` and `let`, `async`/`await`, and early returns.
- Keep shared constants in one place. Use `RISK_THRESHOLDS` and `riskColor()`, never new magic numbers.
- Batch API calls and respect the rate limits in [DATA_SOURCES.md](docs/DATA_SOURCES.md).
- Escape any user-provided or API-provided text before using `innerHTML` (`escapeHTML()` exists).
- Wrap `localStorage` in `try/catch`, because it throws in some WebViews.
- Comment the **why**, not the what. The existing comments in `app.js` are a good model.

## 🗣️ Adding a language

1. Add `{ code, native, english }` to `LANGUAGES` at the top of `js/app.js`.
2. Add a block to `TRANSLATIONS` with the same keys as `en`. Any key you leave out falls back to English.
3. Mark new UI text with `data-i18n="key"`, or `data-i18n-placeholder="key"` for inputs.
4. Check the layout with long strings (for example Malayalam) and with right-to-left text (Urdu).

## 📡 Adding a station

Append to `INDIA_STATIONS`:

```js
{id: 4xxxx, code:"IMD-XXX-4xxxx", name:"City (Area)", state:"State", type:"AWS", lat: 0.0000, lon: 0.0000},
```

`type` must be one of `AWS`, `rain_gauge`, `radar` or `river_gauge`. To include the new station in the 2000–2030 slider, add matching `WEATHER_DATA` rows with the same `Station_ID`.

## ✅ Before you open a PR

- [ ] The dashboard loads with no console errors
- [ ] It works at phone width (DevTools → iPhone), and ☰ opens the layers sheet
- [ ] No API keys or secrets were added
- [ ] The docs are updated if behaviour changed (README, USER_GUIDE, METHODOLOGY)
- [ ] Screenshots are attached for UI changes

## 💡 Good first issues

- Re-fetch station data on the 5-minute tick, not only at boot (see [METHODOLOGY §10](docs/METHODOLOGY.md#10-limitations-and-known-issues))
- Add SRI hashes to the CDN tags
- Add a PWA manifest and offline tile caching
- Add unit tests for `computeRisk()`, `parseIST()` and `circleToRing()`

Be kind, be constructive, and assume good intent. 💙
