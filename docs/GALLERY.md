<p align="center"><img src="assets/banner.svg" width="100%" alt="CLIMO banner"></p>

<h1 align="center">🖼 CLIMO Gallery</h1>

<p align="center">
  <sub>Real, unedited screenshots of CLIMO running on live Open-Meteo data, captured with headless Chromium at 2× pixel density.</sub><br>
  <a href="https://chakrabortysohini2005-stack.github.io/Web-Mobile-Application-CLIMO/docs/gallery.html"><img alt="Open interactive gallery" src="https://img.shields.io/badge/OPEN-interactive%20lightbox%20gallery-2fe3c4?style=for-the-badge&labelColor=0a1426"></a>
</p>

<p align="center">
  <a href="#-arrival">Arrival</a> ·
  <a href="#-the-observatory">Observatory</a> ·
  <a href="#-gis-analysis">GIS analysis</a> ·
  <a href="#-time--intelligence">Time & intelligence</a> ·
  <a href="#-alerts--inclusion">Alerts & inclusion</a> ·
  <a href="#-mobile">Mobile</a>
</p>

---

## ✦ Arrival

<p align="center"><img src="assets/gallery/01-splash.jpg" alt="Splash screen" width="100%"></p>
<p align="center"><sub><b>Splash.</b> The CLIMO mark (sun, cloud, land and water) on a twinkling starfield. It moves on to the landing page after 2.6 s, or on tap.</sub></p>

<p align="center"><img src="assets/gallery/02-landing-hero.jpg" alt="Landing page hero" width="100%"></p>
<p align="center"><sub><b>Landing hero.</b> A glowing, dotted 3D India with animated data-flow arcs between five metros, orbit rings, a spinning mini-globe and a sun badge. The scene tilts toward your cursor.</sub></p>

<p align="center"><img src="assets/gallery/03-landing-features.jpg" alt="Landing feature grid" width="100%"></p>
<p align="center"><sub><b>What CLIMO tracks.</b> Temperature, rainfall, humidity, wind, heat maps, buffer zones and weather alerts.</sub></p>

---

## ✦ The observatory

<p align="center"><img src="assets/gallery/04-dashboard-stations.jpg" alt="Dashboard with stations" width="100%"></p>
<p align="center"><sub><b>All-India observatory.</b> 90 stations, clustered by area and drawn with icons for AWS, radar, rain gauge and river gauge. The sidebar ranks the <b>top alerts across states</b> live.</sub></p>

<p align="center"><img src="assets/gallery/05-station-drawer.jpg" alt="Station drawer" width="100%"></p>
<p align="center"><sub><b>Station drawer: Mumbai (Colaba).</b> Current conditions, nearest-station link, hourly strip, 7-day forecast, live readings and the regional flood-risk score.</sub></p>

<p align="center"><img src="assets/gallery/13-satellite.jpg" alt="Satellite basemap" width="100%"></p>
<p align="center"><sub><b>Satellite basemap.</b> Esri World Imagery with the station network on top.</sub></p>

---

## ✦ GIS analysis

<p align="center"><img src="assets/gallery/07-state-choropleth.jpg" alt="State-level choropleth" width="100%"></p>
<p align="center"><sub><b>Live state-level choropleth (temperature).</b> One batched API call covers every state centroid. A dark mask isolates India and canvas wind streaks drift across the scene.</sub></p>

<p align="center"><img src="assets/gallery/06-risk-heatmap.jpg" alt="Live temperature heatmap" width="100%"></p>
<p align="center"><sub><b>Live heatmap.</b> Station temperatures blended into a continuous field with Leaflet.heat. Humidity and rainfall use the same control.</sub></p>

<p align="center"><img src="assets/gallery/08-buffer-analysis.jpg" alt="Buffer analysis" width="100%"></p>
<p align="center"><sub><b>Buffer analysis: Guwahati.</b> Concentric 5/10/15/20 km rings around a searched place, the risk-filtered 15 km station buffer, and an insights drawer listing stations in each ring.</sub></p>

---

## ✦ Time & intelligence

<p align="center"><img src="assets/climate-timelapse.gif" alt="Climate time-lapse 2000 to 2030" width="100%"></p>
<p align="center"><sub><b>Climate time machine (animated).</b> The year slider sweeps 2000 → 2030. Years up to 2025 are observed; the rest is an LSTM forecast.</sub></p>

<p align="center"><img src="assets/gallery/11-climate-2030.jpg" alt="Climate year 2030" width="100%"></p>
<p align="center"><sub><b>Weather Time Explorer, expanded.</b> Top row: 48 h of history plus a 10-day forecast. Bottom row: the 2000–2030 climate slider, here at 2030 (<i>FORECAST (LSTM)</i>).</sub></p>

<p align="center"><img src="assets/gallery/10-weather-buddy.jpg" alt="Weather Buddy" width="100%"></p>
<p align="center"><sub><b>Weather Buddy.</b> "Will it rain in Kolkata tomorrow?" It finds the place and the time, pulls the hourly forecast and gives practical advice. No LLM is involved.</sub></p>

---

## ✦ Alerts & inclusion

<p align="center"><img src="assets/gallery/14-alerts.jpg" alt="Alert notification" width="100%"></p>
<p align="center"><sub><b>Alert notification.</b> Watch your nearest station, choose a risk threshold, allow browser notifications, and test the flow with a simulated high-risk alert.</sub></p>

<p align="center"><img src="assets/gallery/12-multilingual.jpg" alt="Multilingual interface" width="100%"></p>
<p align="center"><sub><b>16 Indian languages.</b> The interface switches live, shown here in Hindi with the rainfall heatmap and the language menu open.</sub></p>

---

## ✦ Mobile

<table>
  <tr>
    <td width="25%"><img src="assets/gallery/17-mobile-landing.jpg" alt="Mobile landing"></td>
    <td width="25%"><img src="assets/gallery/15-mobile-map.jpg" alt="Mobile map"></td>
    <td width="25%"><img src="assets/gallery/16-mobile-layers.jpg" alt="Mobile layers"></td>
    <td width="25%"><img src="assets/gallery/18-mobile-buddy.jpg" alt="Mobile Weather Buddy"></td>
  </tr>
  <tr>
    <td align="center"><sub><b>Landing</b><br>hero reflows into one column</sub></td>
    <td align="center"><sub><b>Map</b><br>top bar wraps, time explorer docks at the bottom</sub></td>
    <td align="center"><sub><b>Layers drawer</b><br>sidebar slides in from ☰</sub></td>
    <td align="center"><sub><b>Weather Buddy</b><br>"Should I go outside in Delhi?"</sub></td>
  </tr>
</table>

---

<details>
<summary><b>🔁 How these screenshots were made (reproducible)</b></summary>

The gallery was captured with Playwright and headless Chromium against a local `python3 -m http.server`:

- **Desktop:** 1440 × 900 viewport, `deviceScaleFactor: 2`. **Mobile:** Playwright's `Pixel 7` device profile.
- Open-Meteo responses were cached to disk and retried on HTTP 429, so all **90 stations** load in every shot. The data is the real live response from the capture date.
- Each scene runs in a fresh browser context: toggle a layer, wait for data, take the screenshot.
- The time-lapse GIF is 16 frames (2000 → 2030, every 2 years) assembled with ImageMagick.

The *Weather-Safe Route* panel is not pictured because the capture environment's network blocked `api.openrouteservice.org`. The algorithm is diagrammed in [ARCHITECTURE.md](ARCHITECTURE.md#-weather-safe-routing).
</details>
