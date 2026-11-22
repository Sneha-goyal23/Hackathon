# 🌐 Data Sources and Attribution

CLIMO stands on free and open services. This page lists every external dependency, what CLIMO uses it for, and the terms to respect.

| Service | Used for | Key? | Terms / limits | Attribution |
|---|---|---|---|---|
| **[Open-Meteo Forecast API](https://open-meteo.com/en/docs)** | Station, state, route-sample and place weather (current, hourly, daily) | No | Free for **non-commercial** use, about 10k calls/day, with per-minute burst limits (HTTP 429). Commercial use needs a paid plan. | Weather data by Open-Meteo.com (CC BY 4.0) |
| **[Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)** | Route and buffer autocomplete | No | Same as above | Open-Meteo, GeoNames |
| **[Nominatim](https://nominatim.org/)** (OSMF) | Search bar, reverse geocoding for My Location, click and Weather Buddy | No | [Usage policy](https://operations.osmfoundation.org/policies/nominatim/): at most 1 req/s and no heavy use. Self-host for scale. | © OpenStreetMap contributors (ODbL) |
| **[OpenStreetMap tiles](https://tile.openstreetmap.org)** | Default basemap | No | [Tile policy](https://operations.osmfoundation.org/policies/tiles/): light use only. Switch provider for production traffic. | © OpenStreetMap contributors |
| **[Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9)** | Satellite basemap | No | Esri terms of use | Esri, Maxar, Earthstar Geographics |
| **[OpenRouteService](https://openrouteservice.org/)** | Driving directions, `avoid_polygons` | **Yes** | Free tier: about 2,000 directions per day, 40 per minute | © openrouteservice.org by HeiGIT · OSM data |
| **[geojson-india](https://www.npmjs.com/package/geojson-india) @0.0.2** via jsDelivr | State and UT boundaries for the choropleth | No | npm package licence | Package authors |
| **[Leaflet](https://leafletjs.com/) 1.9.4** | Map engine | No | BSD-2-Clause | Leaflet |
| **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) 1.5.3** | Station clustering | No | MIT | — |
| **[Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) 0.2.0** | Heatmaps | No | BSD-2-Clause | — |
| **Google Fonts** | Space Grotesk, Inter, JetBrains Mono | No | OFL | — |

## Embedded data

| Dataset | Location | Description |
|---|---|---|
| `INDIA_STATIONS` | `js/app.js` | 90 station definitions: id, code, name, state, type, lat and lon |
| `WEATHER_DATA` (*India Climate Pulse*) | `js/app.js`, line 392 | 2,790 station-year rows from 2000 to 2030. Observed up to 2025, LSTM forecast from 2026. See [METHODOLOGY §8](METHODOLOGY.md#8-climate-dataset-20002030). |
| `FALLBACK_STATE_VALUES` | `js/app.js` | Labelled state-level estimates, used only when the live state call fails |
| `TRANSLATIONS` | `js/app.js` | UI strings for 16 languages |

## Being a good API citizen

CLIMO already:
- caps station loading at **5 concurrent requests**,
- sends **one batched multi-point request** for all state centroids and route samples,
- debounces autocomplete input.

Before you scale it up (to a classroom, an NGO deployment or the Play Store):
1. **Cache Open-Meteo responses**, for example through a Cloudflare Worker with a 10-minute TTL.
2. **Self-host Nominatim**, or switch to a commercial geocoder.
3. Use a **commercial tile provider** (MapTiler, Stadia, Thunderforest) instead of `tile.openstreetmap.org`.
4. Put the ORS key behind a proxy (see [SECURITY.md](../SECURITY.md)).
5. Check Open-Meteo's licence if the deployment is commercial.
