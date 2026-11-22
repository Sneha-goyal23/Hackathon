# 🚢 Deployment Guide

CLIMO is static, so “deploying” it means copying files. This guide covers local development, GitHub Pages and the Android APK.

---

## 🖥️ Run locally

```bash
git clone https://github.com/chakrabortysohini2005-stack/Web-Mobile-Application-CLIMO.git
```

```bash
cd Web-Mobile-Application-CLIMO && python3 -m http.server 8080
```

Open <http://localhost:8080/>. To skip the intro, go straight to <http://localhost:8080/CLIMO-fixed/CLIMO-project/CLIMO_backend.html>.

**Requirements:** a modern browser and an internet connection. Leaflet, its plugins and the fonts load from CDNs, and all the data is live.

---

## 🌍 GitHub Pages

1. Go to **Settings → Pages**.
2. Under **Source**, choose *Deploy from a branch*, then **`main`** and **`/ (root)`**.
3. Save. The site goes live at `https://<user>.github.io/Web-Mobile-Application-CLIMO/`.

The root `index.html` redirects (with a meta refresh, `location.replace` and a fallback link) to `CLIMO-fixed/CLIMO-project/index.html`. This is why the repo root does not 404 even though the app lives in a sub-folder.

> The interactive gallery is then available at `…/docs/gallery.html`.

---

## 🤖 Android APK

### Through CI (recommended)

The workflow **`.github/workflows/android.yml`** runs on every push or PR to `main` or `master`:

| Step | Detail |
|---|---|
| Checkout | `actions/checkout@v4` |
| Node | `actions/setup-node@v4` with Node **20** |
| Wrap | `npm i -g cordova` → `cordova create mobileapp com.climo.webapp "Climo App"` → copy the project files into `www/` → `cordova platform add android` |
| Java | `actions/setup-java@v4`, Zulu **17**, Gradle cache |
| Build | `cordova build android --debug` |
| Publish | `actions/upload-artifact@v4` → **`climo-app-debug-apk`** |

**To install it:** open **Actions**, pick the latest green run, download **`climo-app-debug-apk`** from **Artifacts**, unzip it, copy `app-debug.apk` to your phone and allow *Install unknown apps*.

### Locally

You need Node 20+, JDK 17, Android SDK with build-tools, and `ANDROID_HOME` set.

```bash
npm install -g cordova
```

```bash
cd CLIMO-fixed/CLIMO-project && cordova create mobileapp com.climo.webapp "Climo App"
```

```bash
cp -R index.html CLIMO.html CLIMO_backend.html css js mobileapp/www/
```

```bash
cd mobileapp && cordova platform add android && cordova build android --debug
```

The APK is written to `platforms/android/app/build/outputs/apk/debug/app-debug.apk`.

### Make it production-ready

- **Start page.** Cordova's default `www/index.html` is overwritten by CLIMO's splash screen, which then navigates to `CLIMO.html`.
- **Permissions.** For *My Location* and GPS buttons, add `cordova-plugin-geolocation`, or rely on WebView geolocation together with `ACCESS_FINE_LOCATION` in `config.xml`.
- **Network allow-list.** Add `<access origin="*" />` (or the specific API hosts) and `cordova-plugin-whitelist` or a CSP as appropriate.
- **Release signing:**

  ```bash
  cordova build android --release -- --keystore=climo.keystore --alias=climo --storePassword=*** --password=***
  ```

  Keep the keystore and passwords in **GitHub Secrets**, never in the repo.
- **App icon and splash.** Add `<icon>` and `<splash>` entries in `config.xml`. The CLIMO sun, cloud, land and water logo already exists as inline SVG.

---

## 🔑 OpenRouteService key

Weather-safe routing and the road route to the nearest station need an ORS key.

1. Sign up at <https://openrouteservice.org/dev/#/signup> (the free tier is fine).
2. Put the key in `ORS_CONFIG.apiKey` near the top of `js/app.js`, **or** better, use the proxy pattern in [SECURITY.md](../SECURITY.md).

Without a key, routing shows *“Add a free OpenRouteService key…”* and the nearest-station route falls back to a straight line.

---

## ✅ Smoke test after deploying

- [ ] The splash screen moves on to the landing page, and **Explore** opens the dashboard
- [ ] The live chip shows **“N Indian observatories online”** with N ≥ 80
- [ ] Turning on Stations shows clustered markers, and clicking one opens a drawer
- [ ] *Live Weather → Temperature* colours the states
- [ ] Dragging the climate slider to 2030 shows **FORECAST (LSTM)**
- [ ] Weather Buddy answers `weather in Pune`
- [ ] **Export Report** downloads a CSV
- [ ] On a phone, ☰ opens the layers sheet
