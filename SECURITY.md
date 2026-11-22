# 🔐 Security Policy

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Use GitHub's **[private vulnerability reporting](https://github.com/chakrabortysohini2005-stack/Web-Mobile-Application-CLIMO/security/advisories/new)** (Security tab → *Report a vulnerability*). Include steps to reproduce, the affected file or line, and the impact. You should get an acknowledgement within a few days.

## Supported versions

Only the latest commit on `main`, which is what GitHub Pages and the CI APK build from, is supported.

---

## 🔑 API keys in a static app

CLIMO has no server, so **anything in `js/app.js` is public**, including `ORS_CONFIG.apiKey`.

**Current state:** an OpenRouteService key is committed in client code. Anyone can copy it and use up its daily quota. This is low-impact (the quota is free and there is no billing), but it is still not good practice.

**Recommended pattern:** keep the key on a tiny proxy.

```js
// Cloudflare Worker (example). Store ORS_KEY as a Worker secret.
export default {
  async fetch(req, env) {
    if (req.method !== 'POST') return new Response('POST only', { status: 405 });
    const r = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: { 'Authorization': env.ORS_KEY, 'Content-Type': 'application/json' },
      body: await req.text(),
    });
    return new Response(r.body, { status: r.status, headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://chakrabortysohini2005-stack.github.io',
    }});
  }
};
```

Then point `callORS()` at the Worker URL and remove the key from `app.js`. Afterwards, **rotate the old key** in the ORS dashboard, because it stays in git history.

---

## 📲 SMS alerts

`sendSmsAlert()` is deliberately a **simulation**. Browsers cannot send SMS, and an SMS provider's secret (Twilio, MSG91, Fast2SMS) must **never** be shipped in front-end code. To make alerts real, add a backend route such as `POST /send-sms` that:

- holds the provider credentials as server-side secrets,
- rate-limits per phone number and per IP,
- verifies phone ownership (OTP) before sending repeated alerts,
- logs consent, in line with India's **DPDP Act 2023** and TRAI DLT template registration.

---

## 🕵️ Privacy

| Data | Where it goes | Stored? |
|---|---|---|
| GPS position | Open-Meteo and Nominatim, only when you press 📍 | No |
| Search text | Nominatim and Open-Meteo geocoding | No |
| Phone number and threshold | `localStorage` (`climo_sms_alert`) on your device only | Yes, locally |
| Language | `localStorage` (`climoLang`) | Yes, locally |
| Feedback posts | The current page only | No |

CLIMO has no accounts, analytics, cookies or trackers.

---

## 🧱 Hardening checklist

- [ ] Move the ORS key behind a proxy and rotate it
- [ ] Add a `Content-Security-Policy` meta tag that allow-lists the CDN, API and tile hosts
- [ ] Add Subresource Integrity (`integrity=`) to the cdnjs `<script>` and `<link>` tags
- [ ] Keep escaping user text before `innerHTML`. Feedback already escapes `<`, and geocoder results should get the same treatment (`escapeHTML()` exists).
- [ ] Pin GitHub Actions to commit SHAs, and keep the release keystore in Secrets
