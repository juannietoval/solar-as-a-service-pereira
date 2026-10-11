import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/Lenovo/.gemini/config/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "file:///C:/Users/Lenovo/.gemini/config/skills/anatomy/scripts/inline-kit.mjs";

const WIDTH = 860;
const HEIGHT = 540;

// Encuadre optimizado al centro
const BOUNDS = [
  [-110, -75, -15], [110, -75, -15], [-110, 75, -15], [110, 75, -15],
  [-110, -75, 125], [110, -75, 125], [-110, 75, 125], [110, 75, 125],
  [120, -35, 20]
];

const P = k.fitProjection(
  BOUNDS,
  WIDTH,
  HEIGHT,
  { pad: 28, azimuth: 45, elevation: 32 }
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// 1. BANCO DE SOPORTE MECANIZADO (Test Rig Base)
const BASE = { x: -105, y: -70, w: 210, d: 140, r: 6 };

function renderBase() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(BASE, -14, 10, P)}"/>`);

  for (const [x, y] of byDepth(k.corners(BASE, 18))) {
    out.push(S(k.cylinder(x, y, 7.5, -14, 2.5, P, 20), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.5, -11.5, 4.5, P, 20), { tone: "mid" }));
  }

  out.push(S(k.slabOf(BASE, -7, 7, P, 6, 1.2), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));

  // Regla milimétrica del banco de pruebas
  const ruler = { x: -85, y: BASE.y + BASE.d - 10, w: 170, d: 5, r: 1 };
  out.push(S(k.slabOf(ruler, 0, 0.6, P, 2), { tone: "lo" }));
  const ticks = k.topTicks(ruler.x + 3, ruler.x + ruler.w - 3, 4, 4, ruler.y + 0.6, 0.6, [1.5, 3.2], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  // Rieles de aluminio estructural que sostienen el marco del panel
  const rL = { x: -80, y: -48, w: 9, d: 96, r: 1.5 };
  const rR = { x: 71, y: -48, w: 9, d: 96, r: 1.5 };
  out.push(S(k.slabOf(rL, 0, 5, P, 2, 0.6), { tone: "mid" }));
  out.push(S(k.slabOf(rR, 0, 5, P, 2, 0.6), { tone: "mid" }));

  // Pernos de anclaje con tornillos Allen
  out.push(D([at([-75.5, -35, 5]), at([-75.5, 35, 5]), at([75.5, -35, 5]), at([75.5, 35, 5])], { size: 1.1, tone: "lit" }));

  return out.join("");
}

// 2. CAPAS MECÁNICAS DEL MÓDULO SOLAR
const FRAME = { x: -70, y: -48, w: 140, d: 96, r: 4 };

// Marco de Aluminio Anodizado
function renderFrame() {
  const out = [];
  out.push(S(k.slabOf(FRAME, 6, 10, P, 4, 1.0), { tone: "hi", lit: true }));
  out.push(L(k.planOutline(k.insetPlan(FRAME, 4), 16, P), { tone: "mid" }));
  out.push(D(byDepth(k.corners(FRAME, 5)).map(([x,y]) => at([x, y, 16])), { size: 0.9, tone: "lo" }));
  return out.join("");
}

// Backsheet Posterior (Lámina protectora aislante dieléctrica)
function renderBacksheet() {
  const plan = k.insetPlan(FRAME, 4.2);
  return `<g class="solar-layer-back">${S(k.slabOf(plan, 0, 2.0, P, 3), { tone: "mid" })}</g>`;
}

// EVA Inferior (Etil-Vinil-Acetato encapsulante)
function renderEvaBottom() {
  const plan = k.insetPlan(FRAME, 4.5);
  return `<g class="solar-layer-eva">${S(k.slabOf(plan, 0, 1.6, P, 3), { tone: "lo" })}</g>`;
}

// Celdas de Silicio Monocristalino (Obleas P-N con Multi-Busbars dorados)
function renderSiliconCells() {
  const out = [];
  const plan = k.insetPlan(FRAME, 5);
  
  // Oblea base profunda (sustrato)
  out.push(S(k.slabOf(plan, 0, 2.8, P, 3), { tone: "lo", lit: false, className: "silicon-substrate" }));

  // 12 celdas solares individuales fotovoltaicas (4 columnas x 3 filas)
  const cellW = 26, cellD = 23;
  const gap = 2.0;
  const startX = -58, startY = -38;
  const busbarLines = [];
  const gridFingers = [];

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      const cx = startX + c * (cellW + gap);
      const cy = startY + r * (cellD + gap);
      const cPlan = { x: cx, y: cy, w: cellW, d: cellD, r: 1.2 };
      
      // Celda individual con relieve
      out.push(S(k.slabOf(cPlan, 2.8, 0.8, P, 2), { tone: "lo", className: "cell-wafer" }));

      // Multi-busbars dorados longitudinales (3 por celda)
      for (let b = 1; b <= 3; b++) {
        const bx = cx + (cellW / 4) * b;
        const p1 = at([bx, cy + 0.8, 3.7]);
        const p2 = at([bx, cy + cellD - 0.8, 3.7]);
        busbarLines.push(`M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
      }

      // Micro-dedos conductores transversales (rejilla colectora de corriente)
      for (let f = 1; f <= 4; f++) {
        const fy = cy + (cellD / 5) * f;
        const f1 = at([cx + 0.8, fy, 3.7]);
        const f2 = at([cx + cellW - 0.8, fy, 3.7]);
        gridFingers.push(`M ${f1[0].toFixed(1)} ${f1[1].toFixed(1)} L ${f2[0].toFixed(1)} ${f2[1].toFixed(1)}`);
      }
    }
  }

  // Cintas de interconexión (Ribbons de cobre estañado entre series de celdas)
  const rib1 = at([-58, -14, 3.8]);
  const rib2 = at([58, -14, 3.8]);
  const rib3 = at([-58, 11, 3.8]);
  const rib4 = at([58, 11, 3.8]);
  out.push(L(`M ${rib1[0].toFixed(1)} ${rib1[1].toFixed(1)} L ${rib2[0].toFixed(1)} ${rib2[1].toFixed(1)}`, { tone: "hi" }));
  out.push(L(`M ${rib3[0].toFixed(1)} ${rib3[1].toFixed(1)} L ${rib4[0].toFixed(1)} ${rib4[1].toFixed(1)}`, { tone: "hi" }));

  // Busbars y rejilla fina
  out.push(`<path class="solar-grid-fingers" d="${gridFingers.join(" ")}" style="stroke: #64748b; stroke-width: 0.5px; fill: none; opacity: 0.7;"/>`);
  out.push(`<path class="solar-busbars" d="${busbarLines.join(" ")}" style="stroke: #f59e0b; stroke-width: 1.1px; fill: none; stroke-linecap: round;"/>`);

  return `<g class="solar-layer-silicon">${out.join("")}</g>`;
}

// EVA Superior (Segunda capa encapsulante de polímero transparente)
function renderEvaTop() {
  const plan = k.insetPlan(FRAME, 4.5);
  return `<g class="solar-layer-eva">${S(k.slabOf(plan, 0, 1.6, P, 3), { tone: "lo" })}</g>`;
}

// Vidrio Templado Antirreflejo Frontal (3.2mm de alta transmisividad)
function renderGlass() {
  const plan = k.insetPlan(FRAME, 4.2);
  const out = [];
  out.push(S(k.slabOf(plan, 0, 3.6, P, 3, 0.6), { tone: "hi", halo: true }));
  // Líneas de reflejo especular en el cristal
  const g1 = at([-50, -28, 3.8]);
  const g2 = at([30, 20, 3.8]);
  const g3 = at([-30, -28, 3.8]);
  const g4 = at([50, 20, 3.8]);
  out.push(L(`M ${g1[0].toFixed(1)} ${g1[1].toFixed(1)} L ${g2[0].toFixed(1)} ${g2[1].toFixed(1)}`, { tone: "mid", dashed: true }));
  out.push(L(`M ${g3[0].toFixed(1)} ${g3[1].toFixed(1)} L ${g4[0].toFixed(1)} ${g4[1].toFixed(1)}`, { tone: "faint", dashed: true }));
  return `<g class="solar-layer-glass">${out.join("")}</g>`;
}

// 3. INSTRUMENTO DE MEDICIÓN (Galvanómetro analógico de irradiancia)
const GAUGE_POS = [92, -32];
const GAUGE_Z = 6;
const GAUGE_R = 14;
const GAUGE_H = 7;

function renderInstrument() {
  const out = [];
  const [gx, gy] = GAUGE_POS;

  out.push(S(k.cylinder(gx, gy, 4, 0, GAUGE_Z, P, 18), { tone: "mid" }));
  out.push(S(k.cylinder(gx, gy, GAUGE_R, GAUGE_Z, GAUGE_H, P, 28, 0.8), { tone: "hi" }));
  out.push(L(k.ring(gx, gy, GAUGE_R - 2, GAUGE_Z + GAUGE_H, P, 36), { tone: "lo" }));

  const ticks = k.radialTicks(gx, gy, GAUGE_R - 2.5, 24, 4, GAUGE_Z + GAUGE_H, [1.2, 2.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  out.push(k.faceTextSvg(k.topMatrix([gx, gy + 6], GAUGE_Z + GAUGE_H, P, "x"), "IRRADIANCIA", { size: 1.8, tone: "lo", anchor: "middle" }));
  out.push(S(k.cylinder(gx, gy, 1.6, GAUGE_Z + GAUGE_H, 1.2, P, 12), { tone: "hi" }));

  return out.join("");
}

const needleAt = (turn) => {
  const angle = (0.2 + turn * 0.6) * Math.PI * 2;
  const [gx, gy] = GAUGE_POS;
  const z = GAUGE_Z + GAUGE_H + 0.2;
  const tipX = gx - Math.cos(angle) * (GAUGE_R - 4);
  const tipY = gy - Math.sin(angle) * (GAUGE_R - 4);
  return k.lineOnTop([gx, gy], [tipX, tipY], z, P);
};

// Fotones solares incidentes
function renderSunRays() {
  const out = [];
  const rays = [
    [[-25, -12, 85], [-10, -2, 24]],
    [[5, -2, 90], [20, 8, 24]],
    [[35, 8, 95], [50, 18, 24]],
  ];
  for (const [from, to] of rays) {
    out.push(L(k.segment(from, to, P), { tone: "lit", flow: true, dashed: true }));
    out.push(D([at(to)], { size: 1.4, tone: "lit", pulse: true }));
  }
  return out.join("");
}

// SVG Completo
const svgMarkup = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "Despiece didáctico e isométrico de módulo fotovoltaico Tier-1",
  body: [
    renderBase(),
    `<g data-part="photons">${renderSunRays()}</g>`,
    `<g data-part="frame">${renderFrame()}</g>`,
    `<g data-part="layer-back">${renderBacksheet()}</g>`,
    `<g data-part="layer-eva-bot">${renderEvaBottom()}</g>`,
    `<g data-part="layer-silicon">${renderSiliconCells()}</g>`,
    `<g data-part="layer-eva-top">${renderEvaTop()}</g>`,
    `<g data-part="layer-glass">${renderGlass()}</g>`,
    renderInstrument(),
    `<path data-part="needle" class="iso-line" data-tone="lit" d="${needleAt(0.7)}" style="stroke-width:1.2; stroke:#dc2626;"/>`,
  ].join("\n"),
  standalone: false,
});

// Script interactivo sincronizado con Scroll y Slider
const clientScript = `
const P = ${JSON.stringify(P)};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");

const layerGlass = svg.querySelector('[data-part="layer-glass"]');
const layerEvaTop = svg.querySelector('[data-part="layer-eva-top"]');
const layerSilicon = svg.querySelector('[data-part="layer-silicon"]');
const layerEvaBot = svg.querySelector('[data-part="layer-eva-bot"]');
const layerBack = svg.querySelector('[data-part="layer-back"]');
const photonsGroup = svg.querySelector('[data-part="photons"]');
const needle = svg.querySelector('[data-part="needle"]');
const readout = document.querySelector("[data-readout]");

const GAUGE_POS = [92, -32];
const GAUGE_Z = 6, GAUGE_H = 7, GAUGE_R = 14;

const needleAt = (turn) => {
  const angle = (0.2 + turn * 0.6) * Math.PI * 2;
  const [gx, gy] = GAUGE_POS;
  const z = GAUGE_Z + GAUGE_H + 0.2;
  const tipX = gx - Math.cos(angle) * (GAUGE_R - 4);
  const tipY = gy - Math.sin(angle) * (GAUGE_R - 4);
  return lineOnTop([gx, gy], [tipX, tipY], z, P);
};

let explode = 0;
let explodeTarget = 0;
let sunPower = 0.8;
let last = 0;

function draw() {
  const dzBack = 7 + explode * 10;
  const dzEvaBot = 9 + explode * 28;
  const dzSilicon = 11 + explode * 52;
  const dzEvaTop = 14 + explode * 76;
  const dzGlass = 16 + explode * 104;

  layerBack.setAttribute("transform", translateAlong(P, [0, 0, dzBack]));
  layerEvaBot.setAttribute("transform", translateAlong(P, [0, 0, dzEvaBot]));
  layerSilicon.setAttribute("transform", translateAlong(P, [0, 0, dzSilicon]));
  layerEvaTop.setAttribute("transform", translateAlong(P, [0, 0, dzEvaTop]));
  layerGlass.setAttribute("transform", translateAlong(P, [0, 0, dzGlass]));

  const photonAlpha = 0.2 + sunPower * 0.8;
  photonsGroup.style.opacity = photonAlpha.toFixed(2);
  needle.setAttribute("d", needleAt(sunPower));

  const irradW = Math.round(sunPower * 1050);
  const currentAmp = (sunPower * 13.5).toFixed(1);
  const stateLabel = explode > 0.3 ? "VISTA DESPIECE (" + Math.round(explode * 100) + "%)" : "MÓDULO ENSAMBLADO";
  readout.textContent = stateLabel + " · " + irradW + " W/m² · Isc " + currentAmp + " A";
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  explode += (explodeTarget - explode) * (1 - Math.exp(-dt / 0.2));
  draw();
  if (Math.abs(explodeTarget - explode) > 0.001) {
    requestAnimationFrame(tick);
  }
}

// Comunicación para scroll desde ventana padre (iframe embedding)
window.addEventListener("message", (e) => {
  if (e.data && typeof e.data.explodeTarget === "number") {
    explodeTarget = Math.max(0, Math.min(1, e.data.explodeTarget));
    requestAnimationFrame(tick);
  }
});

// Sincronización con el scroll de la propia ventana
function updateFromScroll() {
  const rect = stage.getBoundingClientRect();
  const winH = window.innerHeight;
  const progress = Math.max(0, Math.min(1, (winH * 0.85 - rect.top) / (winH * 0.6)));
  explodeTarget = progress;
  requestAnimationFrame(tick);
}

window.addEventListener("scroll", updateFromScroll, { passive: true });
window.addEventListener("resize", updateFromScroll, { passive: true });

window.manualExplode = function(val) {
  explodeTarget = parseFloat(val);
  requestAnimationFrame(tick);
};

window.manualSun = function(val) {
  sunPower = parseFloat(val);
  draw();
};

stage.addEventListener("pointermove", (e) => {
  const box = stage.getBoundingClientRect();
  const relX = (e.clientX - box.left) / box.width;
  explodeTarget = Math.max(0, Math.min(1, (relX - 0.15) / 0.7));
  requestAnimationFrame(tick);
});

// Inicializar
draw();
`;

// Estilos CSS que se funden perfectamente con el fondo de la página web (#fafaf9)
const customLayerCss = `
<style>
/* Fusión perfecta con la web (sin caja oscura ni borders extraños) */
body {
  background: #fafaf9 !important;
}
.iso-plate {
  background: #ffffff !important;
  border: 1px solid #e7e5e4 !important;
  border-radius: 20px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04) !important;
  padding: 48px 24px 32px !important;
}

/* Capa de Silicio Monocristalino: Azul oscuro cobalto profundo realista */
.solar-layer-silicon .silicon-substrate .iso-fill { fill: #0f172a !important; }
.solar-layer-silicon .silicon-substrate .iso-top { fill: #090d16 !important; }
.solar-layer-silicon .silicon-substrate .iso-shade { fill: #020617 !important; }
.solar-layer-silicon .cell-wafer .iso-fill { fill: #1e293b !important; }
.solar-layer-silicon .cell-wafer .iso-top { fill: #0f172a !important; }
.solar-layer-silicon .cell-wafer .iso-shade { fill: #020617 !important; }
.solar-layer-silicon .cell-wafer .iso-edge { stroke: #334155 !important; stroke-width: 0.6px !important; }

/* Capa EVA (Etil-Vinil-Acetato): Polímero translúcido ámbar suave */
.solar-layer-eva .iso-fill { fill: #fef3c7 !important; fill-opacity: 0.82 !important; }
.solar-layer-eva .iso-top { fill: #fffbeb !important; fill-opacity: 0.85 !important; }
.solar-layer-eva .iso-shade { fill: #fde68a !important; fill-opacity: 0.9 !important; }
.solar-layer-eva .iso-edge { stroke: #d97706 !important; stroke-width: 0.7px !important; }

/* Capa Vidrio Solar Templado: Cristal claro con tinte cian */
.solar-layer-glass .iso-fill { fill: #e0f2fe !important; fill-opacity: 0.65 !important; }
.solar-layer-glass .iso-top { fill: #f0f9ff !important; fill-opacity: 0.7 !important; }
.solar-layer-glass .iso-shade { fill: #bae6fd !important; fill-opacity: 0.75 !important; }
.solar-layer-glass .iso-edge { stroke: #0284c7 !important; stroke-width: 0.8px !important; }

/* Backsheet Posterior: Blanco marfil protector con aislamiento */
.solar-layer-back .iso-fill { fill: #f8fafc !important; }
.solar-layer-back .iso-top { fill: #ffffff !important; }
.solar-layer-back .iso-shade { fill: #cbd5e1 !important; }
.solar-layer-back .iso-edge { stroke: #94a3b8 !important; }

/* Textos de las llamadas didácticas */
.callout-text {
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  fill: #475569;
}
.callout-blue { fill: #0284c7 !important; font-weight: 800; }
.callout-amber { fill: #b45309 !important; font-weight: 800; }
.callout-dark { fill: #0f172a !important; font-weight: 800; }

/* Barra de controles interactivos ergonómicos */
.controls-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  color: #334155;
  flex-wrap: wrap;
}
.controls-bar label {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}
.controls-bar input[type=range] {
  accent-color: #d97706;
  width: 130px;
  cursor: pointer;
}
.iso-plate-corner[data-corner="hint"] {
  font-size: 9.5px !important;
  color: #64748b !important;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.iso-plate-corner[data-corner="readout"] {
  font-size: 10.5px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}
</style>
`;

const plate = k.plateHtml({
  fig: "FIG 01",
  title: "DESPIECE MECÁNICO // ARQUITECTURA FOTOVOLTAICA TIER-1",
  hint: "SCROLL / CURSOR: SEPARAR CAPAS",
  readout: "MÓDULO ENSAMBLADO · 840 W/m² · Isc 10.8 A",
  keys: [
    { mark: "lit", label: "05. Vidrio Templado Antirreflejo 3.2mm (>94% Transmisividad)" },
    { mark: "raised", label: "04. Encapsulante Térmico EVA Superior (Polímero Sellado)" },
    { mark: "dim", label: "03. 12 Células Silicio Mono PERC + Multi-Busbars Dorados" },
    { mark: "raised", label: "02. EVA Inferior y Lámina Aislante Backsheet Dieléctrico" },
    { mark: "flat", label: "01. Marco Perimetral de Aluminio Anodizado 35mm" }
  ],
  caption: "Disección técnica interactiva: demuestra cómo el vidrio templado solar y la doble membrana polimérica EVA sellan herméticamente las células semiconductoras de silicio contra la intemperie y humedad relativa del Eje Cafetero, canalizando la fotocorriente por los busbars de cobre estañado hacia el circuito de potencia.",
  body: `
  ${customLayerCss}
  <div class="controls-bar">
    <label>
      <span>Separación de Capas:</span>
      <input type="range" min="0" max="1" step="0.01" value="0" oninput="manualExplode(this.value)">
    </label>
    <label>
      <span>Radiación Solar (Pereira):</span>
      <input type="range" min="0.2" max="1" step="0.05" value="0.8" oninput="manualSun(this.value)">
    </label>
  </div>
  <div class="iso-stage" tabindex="0" role="slider" aria-label="Simulador de despiece de panel solar">${svgMarkup}</div>
  `
});

const outputPage = k.pageHtml({
  title: "Anatomía Didáctica del Panel Solar | Solar as a Service",
  theme: "light",
  body: plate,
  script: kitScript() + "\n" + clientScript,
  width: 860
});

const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "web", "panel_anatomy_interactive.html");
writeFileSync(outPath, outputPage, "utf8");
console.log("High-contrast distinct layers Anatomy Panel written to:", outPath);
