/* ============================================================
   VASUDHA — script.js
   All the behaviour (what happens / what moves) lives here.
   Sections:  1) splash → home   2) globe   3) paddy   4) buttons
   ============================================================ */

/* ---------- 1. SPLASH  ->  HOME ---------- */
const splash = document.getElementById("splash");
const home   = document.getElementById("home");

function begin() {
  splash.style.opacity = "0";                 // fade the splash out
  setTimeout(() => {
    splash.style.display = "none";            // remove it
    home.classList.add("show");               // reveal the home page
    resize();                                 // make sure the globe fits
  }, 1000);
}
splash.addEventListener("click", begin);                       // tap to begin
setTimeout(() => { if (splash.style.display !== "none") begin(); }, 4000); // or auto after 4s


/* ---------- 2. ROTATING MULTI-COLOUR GLOBE ---------- */
const cv  = document.getElementById("globe");
const ctx = cv.getContext("2d");
let W, H, DPR, cx, cy, R;

// makes the canvas match the screen size (and re-centres the globe)
function resize() {
  DPR = Math.min(2, window.devicePixelRatio || 1);
  W = window.innerWidth; H = window.innerHeight;
  cv.width = W * DPR; cv.height = H * DPR;
  cv.style.width = W + "px"; cv.style.height = H + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  cx = W * 0.5;                    // globe centre X (middle)
  cy = H * 0.22;                   // globe centre Y (near the top)
  R  = Math.min(W * 0.30, H * 0.15); // globe radius (size)
}
window.addEventListener("resize", resize);
resize();

// colours for the dots (like real Earth)
const LAND  = ["#7fb83e", "#8fc74a", "#5f9e34", "#a7d84a"];
const OCEAN = ["#3a9c8e", "#2f8f86", "#43b0a0"];
const WARM  = ["#e0b45a", "#d9a641", "#e6c98f"];
const pick  = a => a[(Math.random() * a.length) | 0];

// build ~1000 dots spread evenly over a sphere, each given a biome colour
const N = 1000, PTS = [];
for (let i = 0; i < N; i++) {
  const y  = 1 - (i / (N - 1)) * 2;
  const r  = Math.sqrt(1 - y * y);
  const th = Math.PI * (3 - Math.sqrt(5)) * i;   // golden-angle spiral
  const x  = Math.cos(th) * r, z = Math.sin(th) * r;
  // a little noise so colours cluster like continents
  const noise = Math.sin(x*3.1 + y*2.3) * Math.cos(z*2.7 + x*1.5) + 0.6 * Math.sin(y*4.1 + z*1.9);
  let col;
  if (noise > 0.7)       col = pick(WARM);   // warm land / desert
  else if (noise > -0.15) col = pick(LAND);  // vegetation
  else                    col = pick(OCEAN); // ocean
  PTS.push({ x, y, z, col });
}

// a few glowing "hub" points that pulse
const HUBS = [];
for (let k = 0; k < 6; k++) {
  const p = PTS[(Math.random() * N) | 0];
  HUBS.push({ x: p.x, y: p.y, z: p.z, c: k % 2 ? "#ffe08a" : "#fff2c2" });
}

// twinkling stars in the top part of the sky
const STARS = [];
for (let i = 0; i < 70; i++)
  STARS.push({ x: Math.random(), y: Math.random() * 0.45, s: Math.random()*1.4 + .3, a: Math.random()*.5 + .2 });

// rotation state + mouse interaction
let ang = 0, tiltX = -0.32, targetTilt = -0.32, spin = 0.003, mouseSpin = 0, dragging = false, lastX = 0;
cv.addEventListener("pointerdown", e => { dragging = true; lastX = e.clientX; });
window.addEventListener("pointerup", () => dragging = false);
window.addEventListener("pointermove", e => {
  const ry = (e.clientY / window.innerHeight - 0.5);
  targetTilt = -0.32 - ry * 0.4;                       // tilt with mouse Y
  if (dragging) { mouseSpin = (e.clientX - lastX) * 0.0008; lastX = e.clientX; } // drag to spin
  else mouseSpin *= 0.9;
});

// rotate a point around the globe
function rot(p, a, tx) {
  let x = p.x*Math.cos(a) - p.z*Math.sin(a);
  let z = p.x*Math.sin(a) + p.z*Math.cos(a);
  let y = p.y;
  let y2 = y*Math.cos(tx) - z*Math.sin(tx);
  let z2 = y*Math.sin(tx) + z*Math.cos(tx);
  return { x, y: y2, z: z2 };
}

// draw one frame (called ~60 times per second)
function draw(t) {
  ctx.clearRect(0, 0, W, H);

  // stars
  for (const s of STARS) {
    ctx.globalAlpha = s.a * (0.5 + 0.5*Math.sin(t*0.001 + s.x*10));
    ctx.fillStyle = "#eafff0";
    ctx.fillRect(s.x*W, s.y*H, s.s, s.s);
  }
  ctx.globalAlpha = 1;

  // soft glow behind the globe
  const g = ctx.createRadialGradient(cx, cy, R*0.2, cx, cy, R*1.6);
  g.addColorStop(0, "rgba(167,216,74,0.18)");
  g.addColorStop(1, "rgba(167,216,74,0)");
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, R*1.6, 0, 7); ctx.fill();

  tiltX += (targetTilt - tiltX) * 0.05;    // smooth tilt
  ang   += spin + mouseSpin;               // keep rotating

  // the dots
  for (const p of PTS) {
    const q = rot(p, ang, tiltX);
    const depth = (q.z + 1) / 2;           // 0 = back, 1 = front
    const sx = cx + q.x*R, sy = cy + q.y*R;
    const size = 0.6 + depth*1.7;
    ctx.globalAlpha = 0.2 + depth*0.72;    // front dots brighter
    ctx.fillStyle = p.col;
    ctx.beginPath(); ctx.arc(sx, sy, size, 0, 7); ctx.fill();
  }

  // the pulsing hubs (only when on the front side)
  for (let i = 0; i < HUBS.length; i++) {
    const q = rot(HUBS[i], ang, tiltX);
    if (q.z < 0) continue;
    const sx = cx + q.x*R, sy = cy + q.y*R;
    const pulse = 0.5 + 0.5*Math.sin(t*0.004 + i);
    ctx.globalAlpha = 0.5 + pulse*0.5;
    ctx.fillStyle = HUBS[i].c;
    ctx.beginPath(); ctx.arc(sx, sy, 2 + pulse*2, 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(draw);             // next frame
}
requestAnimationFrame(draw);


/* ---------- 3. SWAYING PADDY (make many stalks) ---------- */
(function paddy() {
  const field = document.getElementById("field");
  const n = Math.max(28, Math.floor(window.innerWidth / 30));  // more stalks on wider screens
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "stalk";
    s.style.left            = (i / n * 100 + Math.random()*2) + "%";
    s.style.height          = (32 + Math.random()*44) + "px";
    s.style.animationDelay   = (-Math.random()*3.2) + "s";       // start each at a different point
    s.style.animationDuration = (2.6 + Math.random()*1.4) + "s"; // slightly different speeds
    s.style.opacity          = 0.75 + Math.random()*0.25;
    field.appendChild(s);
  }
})();


/* ---------- 4. MODE BUTTONS (General / Farmer) ---------- */
function enter(mode) {
  document.getElementById("stageTitle").innerHTML = mode + " <b>mode</b>";
  document.getElementById("stageMode").textContent = mode;
  document.getElementById("stage").style.display = "flex";
}
function backHome() {
  document.getElementById("stage").style.display = "none";
}
