# 🔐 Security & privacy

## Reporting a vulnerability

Please **don't open a public issue** for security problems. Use GitHub's **[private vulnerability reporting](https://github.com/chakrabortysohini2005-stack/Web-Mobile-Application-CLIMO/security/advisories/new)** (Security → Report a vulnerability). Include:

- what you found and where (file / function)
- steps to reproduce
- the impact you expect

We aim to acknowledge reports within a few days. CLIMO is a community project, so there is no bug bounty.

## Scope

CLIMO is a **static, client-only** web app (plus a Cordova wrapper). It has **no server, no database and no user accounts**. Relevant issues include:

| In scope | Examples |
|:--|:--|
| XSS / HTML injection | unescaped API or user text reaching `innerHTML` (search results, assistant, drawers, feedback) |
| Secrets in the repo | API keys, keystores, tokens |
| Supply chain | CDN scripts (Leaflet, plugins) and the CI workflow |
| WebView issues | the Cordova app's permissions and navigation |

## 🔑 The client-side routing key

`js/app.js` contains an **OpenRouteService API key** in `ORS_CONFIG.apiKey`. Any key shipped to a browser can be read by anyone who opens DevTools, so treat it as **public**:

- Its quota can be used up by third parties, which breaks weather-safe routing.
- **Recommended fix:** send routing through a small serverless proxy (Cloudflare Worker, Netlify or Vercel function) that keeps the key server-side and allows only the `/v2/directions/driving-car/geojson` path from your own origin.
- **Rotate** the current key in the ORS dashboard once a proxy exists, and never commit the new one.

## 🛡 Hardening ideas

- Add **Subresource Integrity** (`integrity="sha512-…" crossorigin`) to the cdnjs `<script>` and `<link>` tags.
- Add a **Content-Security-Policy** (meta tag or host header) that allows only the hosts listed in [docs/ARCHITECTURE.md → External services](docs/ARCHITECTURE.md#-external-services).
- Pin GitHub Actions to commit SHAs in `.github/workflows/android.yml`.
- Keep release keystores in CI secrets only.

## 🕵 Privacy

| Data | Where it goes | Stored? |
|:--|:--|:--|
| Your **GPS location** (only when you press 📍) | Open-Meteo (weather) and Nominatim (neighbourhood name) | not by CLIMO |
| **Searched place names** | Open-Meteo Geocoding / Nominatim | not by CLIMO |
| **Route start/end** | OpenRouteService | not by CLIMO |
| **Phone number + alert threshold** | your browser's `localStorage` only (`climo_sms_alert`) | on your device |
| **Language choice** | `localStorage` (`climoLang`) | on your device |
| **Local feedback** posts | the page's memory only | lost on reload |

CLIMO uses no analytics, trackers or cookies. Third-party services have their own privacy policies.

> ⚠️ CLIMO's flood-risk score is **not an official warning**. Always follow IMD, NDMA and your State Disaster Management Authority in an emergency.
