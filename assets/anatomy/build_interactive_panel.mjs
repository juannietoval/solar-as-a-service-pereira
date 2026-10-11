import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/Lenovo/.gemini/config/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "file:///C:/Users/Lenovo/.gemini/config/skills/anatomy/scripts/inline-kit.mjs";

const WIDTH = 680;
const HEIGHT = 460;

// Configuración de la proyección isométrica del banco
// Cámara: elevación 34° para ver la cubierta de silicio y la profundidad de capas
const P = k.fitProjection(
  [
    [-160, -110, -30],
    [160, 110, 140],
  ],
  WIDTH,
  HEIGHT,
  { pad: 32, azimuth: 44, elevation: 34 }
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// 1. BANCO DE PRUEBAS / ESTRUCTURA DE SOPORTE (Heavy bench)
const BENCH = { x: -140, y: -90, w: 280, d: 180, r: 8 };
const BENCH_H = 14;
const FOOT_H = 6;

function benchBase() {
  const out = [];
  // Halo sombreado inferior
  out.push(`<path class="iso-halo" d="${k.haloOf(BENCH, -BENCH_H - FOOT_H, BENCH_H, P)}"/>`);

  // Patas antivibración con reborde mecanizado en las 4 esquinas
  for (const [x, y] of byDepth(k.corners(BENCH, 24))) {
    out.push(S(k.cylinder(x, y, 9, -BENCH_H - FOOT_H, 2.2, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 7, -BENCH_H - FOOT_H + 2.2, FOOT_H - 2.2, P, 24), { tone: "mid" }));
  }

  // Placa maciza del banco mecanizado
  out.push(S(k.slabOf(BENCH, -BENCH_H, BENCH_H, P, 8, 1.8), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(BENCH, 6), 0, P), { tone: "lo" }));

  // Regla milimétrica en el borde frontal
  const ruler = { x: -120, y: BENCH.y + BENCH.d - 12, w: 240, d: 6, r: 1 };
  out.push(S(k.slabOf(ruler, 0, 0.8, P, 3), { tone: "lo" }));
  const ticks = k.topTicks(ruler.x + 4, ruler.x + ruler.w - 4, 4, 5, ruler.y + 0.8, 0.8, [2, 4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  // Placa grabada del banco
  const platePlan = { x: -35, y: BENCH.y + 10, w: 70, d: 24, r: 2 };
  out.push(S(k.slabOf(platePlan, 0, 0.6, P, 3), { tone: "lo" }));
  out.push(k.faceTextSvg(k.topMatrix([0, BENCH.y + 22], 0.6, P, "x"), "SOLAR LAB TEST RIG // PEREIRA", { size: 2.8, tone: "mid", anchor: "middle" }));

  // Rieles de soporte angular del módulo (inclinación solar 15° típica de Pereira)
  const leftRail = { x: -105, y: -60, w: 12, d: 120, r: 2 };
  const rightRail = { x: 93, y: -60, w: 12, d: 120, r: 2 };
  out.push(S(k.slabOf(leftRail, 0, 6, P, 3, 0.8), { tone: "mid" }));
  out.push(S(k.slabOf(rightRail, 0, 6, P, 3, 0.8), { tone: "mid" }));

  // Tornillos de fijación
  out.push(D([
    at([-100, -45, 6]), at([-100, 45, 6]),
    at([99, -45, 6]), at([99, 45, 6])
  ], { size: 1.2, tone: "lit" }));

  return out.join("");
}

// 2. CAPAS MECÁNICAS Y FOTOVOLTAICAS (Explotadas a lo largo del eje Z)
// Marco de Aluminio
const FRAME_PLAN = { x: -95, y: -60, w: 190, d: 120, r: 5 };
function aluminiumFrame() {
  const out = [];
  // Marco perimetral extruido con ranuras de drenaje
  out.push(S(k.slabOf(FRAME_PLAN, 8, 12, P, 6, 1.4), { tone: "hi" }));
  // Reborde interior donde asienta el laminado
  out.push(L(k.planOutline(k.insetPlan(FRAME_PLAN, 4.5), 20, P), { tone: "mid" }));
  // Tornillería en esquinas
  out.push(D(byDepth(k.corners(FRAME_PLAN, 6)).map(([x,y]) => at([x, y, 20])), { size: 1.0, tone: "lo" }));
  return out.join("");
}

// Capa Tedlar Posterior (Backsheet aislante)
function backsheetLayer() {
  const plan = k.insetPlan(FRAME_PLAN, 5);
  return S(k.slabOf(plan, 0, 1.8, P, 4), { tone: "mid" });
}

// Capa Encapsulante EVA Inferior
function evaBottomLayer() {
  const plan = k.insetPlan(FRAME_PLAN, 5.5);
  return S(k.slabOf(plan, 0, 1.4, P, 4), { tone: "lo" });
}

// Obleas de Silicio Monocristalino P-N (Células solares activas)
function siliconCellsLayer() {
  const out = [];
  const plan = k.insetPlan(FRAME_PLAN, 6);
  // Oblea base dopada
  out.push(S(k.slabOf(plan, 0, 3.2, P, 4), { tone: "lo", lit: true }));

  // Cuadrícula de celdas cortadas M10 (6 columnas x 4 filas)
  const startX = -84, startY = -48;
  const cellW = 27, cellD = 23;
  const gap = 1.6;

  for (let c = 0; c < 6; c++) {
    for (let r = 0; r < 4; r++) {
      const cx = startX + c * (cellW + gap);
      const cy = startY + r * (cellD + gap);
      const cPlan = { x: cx, y: cy, w: cellW, d: cellD, r: 1.2 };
      out.push(S(k.slabOf(cPlan, 3.2, 0.4, P, 2), { tone: "lo" }));

      // Multi-Busbars metálicos (3 líneas de interconexión por celda)
      for (let b = 1; b <= 3; b++) {
        const bx = cx + (cellW / 4) * b;
        const p1 = at([bx, cy + 1, 3.7]);
        const p2 = at([bx, cy + cellD - 1, 3.7]);
        out.push(L(`M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`, { tone: "lit" }));
      }
    }
  }

  // Cinta de interconexión cruzada (Cross ribbons)
  const rib1 = at([-84, 0, 4.0]);
  const rib2 = at([84, 0, 4.0]);
  out.push(L(`M ${rib1[0]} ${rib1[1]} L ${rib2[0]} ${rib2[1]}`, { tone: "hi" }));

  return out.join("");
}

// Capa Encapsulante EVA Superior
function evaTopLayer() {
  const plan = k.insetPlan(FRAME_PLAN, 5.5);
  return S(k.slabOf(plan, 0, 1.4, P, 4), { tone: "lo" });
}

// Vidrio Solar Templado Antirreflejo
function glassTopLayer() {
  const plan = k.insetPlan(FRAME_PLAN, 5);
  const out = [];
  out.push(S(k.slabOf(plan, 0, 4.2, P, 4, 0.8), { tone: "hi", halo: true }));
  // Líneas de refracción solar en superficie
  const g1 = at([-70, -40, 4.3]);
  const g2 = at([70, 40, 4.3]);
  out.push(L(`M ${g1[0]} ${g1[1]} L ${g2[0]} ${g2[1]}`, { tone: "mid", dashed: true }));
  return out.join("");
}

// 3. INSTRUMENTO DE MEDICIÓN Y ENERGÍA FOTOVOLTAICA (Photocurrent Gauge & Sun Sensor)
const GAUGE_XY = [118, -40];
const GAUGE_Z = 8;
const GAUGE_R = 18;
const GAUGE_H = 9;

function multimeterInstrument() {
  const out = [];
  const [gx, gy] = GAUGE_XY;

  // Soporte vertical del instrumento
  out.push(S(k.cylinder(gx, gy, 5.5, 0, GAUGE_Z, P, 20), { tone: "mid" }));

  // Caja circular del galvanómetro / medidor de irradiancia
  out.push(S(k.cylinder(gx, gy, GAUGE_R, GAUGE_Z, GAUGE_H, P, 32, 1.0), { tone: "hi" }));
  out.push(L(k.ring(gx, gy, GAUGE_R - 2.5, GAUGE_Z + GAUGE_H, P, 48), { tone: "lo" }));

  // Escala graduada (W/m² & Amperios)
  const ticks = k.radialTicks(gx, gy, GAUGE_R - 3.2, 36, 4, GAUGE_Z + GAUGE_H, [1.4, 3.2], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  // Carátula
  out.push(k.faceTextSvg(k.topMatrix([gx, gy + 8], GAUGE_Z + GAUGE_H, P, "x"), "IRRAD / W·m⁻²", { size: 2.2, tone: "lo", anchor: "middle" }));
  out.push(S(k.cylinder(gx, gy, 2.2, GAUGE_Z + GAUGE_H, 1.6, P, 14), { tone: "hi" }));

  return out.join("");
}

// Aguja móvil según la irradiancia
const needleAt = (turn) => {
  const angle = (0.2 + turn * 0.6) * Math.PI * 2; // Rango de barrido 120 grados
  const [gx, gy] = GAUGE_XY;
  const z = GAUGE_Z + GAUGE_H + 0.3;
  const tipX = gx - Math.cos(angle) * (GAUGE_R - 5);
  const tipY = gy - Math.sin(angle) * (GAUGE_R - 5);
  return k.lineOnTop([gx, gy], [tipX, tipY], z, P);
};

// Haz de fotones solares simulado (Rayos de luz que impactan el panel)
function sunPhotons() {
  const out = [];
  const rays = [
    [[-40, -20, 110], [-25, -10, 35]],
    [[0, -10, 115], [15, 0, 35]],
    [[40, 0, 120], [55, 10, 35]],
    [[-20, 20, 110], [-5, 30, 35]],
  ];
  for (const [from, to] of rays) {
    out.push(L(k.segment(from, to, P), { tone: "lit", flow: true, dashed: true }));
    out.push(D([at(to)], { size: 1.6, tone: "lit", pulse: true }));
  }
  return out.join("");
}

// Ensamble SVG con grupos identificados para animación independiente
const svgBody = [
  benchBase(),
  `<g data-part="photons">${sunPhotons()}</g>`,
  `<g data-part="frame">${aluminiumFrame()}</g>`,
  `<g data-part="layer-backsheet">${backsheetLayer()}</g>`,
  `<g data-part="layer-eva-bot">${evaBottomLayer()}</g>`,
  `<g data-part="layer-silicon">${siliconCellsLayer()}</g>`,
  `<g data-part="layer-eva-top">${evaTopLayer()}</g>`,
  `<g data-part="layer-glass">${glassTopLayer()}</g>`,
  multimeterInstrument(),
  `<path data-part="needle" class="iso-line" data-tone="lit" d="${needleAt(0.7)}" style="stroke-width:1.2"/>`,
];

const svgMarkup = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "Mesa de pruebas didáctica e isométrica de panel solar fotovoltaico monocristalino",
  body: svgBody.join("\n"),
  standalone: false,
});

// Código interactivo en cliente (motion model: explosión de capas + inclinación solar + lectura fotónica)
const clientScript = `
const P = ${JSON.stringify(P)};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");

const layerGlass = svg.querySelector('[data-part="layer-glass"]');
const layerEvaTop = svg.querySelector('[data-part="layer-eva-top"]');
const layerSilicon = svg.querySelector('[data-part="layer-silicon"]');
const layerEvaBot = svg.querySelector('[data-part="layer-eva-bot"]');
const layerBack = svg.querySelector('[data-part="layer-backsheet"]');
const photonsGroup = svg.querySelector('[data-part="photons"]');
const needle = svg.querySelector('[data-part="needle"]');
const readout = document.querySelector("[data-readout]");

const GAUGE_XY = [118, -40];
const GAUGE_Z = 8, GAUGE_H = 9, GAUGE_R = 18;

const needleAt = (turn) => {
  const angle = (0.2 + turn * 0.6) * Math.PI * 2;
  const [gx, gy] = GAUGE_XY;
  const z = GAUGE_Z + GAUGE_H + 0.3;
  const tipX = gx - Math.cos(angle) * (GAUGE_R - 5);
  const tipY = gy - Math.sin(angle) * (GAUGE_R - 5);
  return lineOnTop([gx, gy], [tipX, tipY], z, P);
};

// Estados del modelo
let explode = 0;       // 0 = ensamblado compacto, 1 = vista explotada completa
let explodeTarget = 0;
let sunPower = 0.75;    // Nivel de radiación solar (0.2 a 1.0)
let currentAngle = 15;  // Grados de inclinación de prueba

let last = 0, clock = 0, touring = true, visible = false;

function draw() {
  // Las capas se desplazan verticalmente en el eje Z proporcional al factor de explosión
  // Capa 1: Backsheet (base en Z: 10 + explode * 8)
  layerBack.setAttribute("transform", translateAlong(P, [0, 0, 10 + explode * 6]));
  // Capa 2: EVA Inferior (Z: 12 + explode * 22)
  layerEvaBot.setAttribute("transform", translateAlong(P, [0, 0, 12 + explode * 20]));
  // Capa 3: Celdas Silicio (Z: 14 + explode * 42)
  layerSilicon.setAttribute("transform", translateAlong(P, [0, 0, 14 + explode * 40]));
  // Capa 4: EVA Superior (Z: 17 + explode * 62)
  layerEvaTop.setAttribute("transform", translateAlong(P, [0, 0, 17 + explode * 60]));
  // Capa 5: Vidrio Solar Templado (Z: 20 + explode * 82)
  layerGlass.setAttribute("transform", translateAlong(P, [0, 0, 20 + explode * 80]));

  // Fotones responden a la radiación
  const photonAlpha = 0.3 + sunPower * 0.7;
  photonsGroup.style.opacity = photonAlpha.toFixed(2);

  // Aguja del medidor
  const irradW = Math.round(sunPower * 1050);
  const currentAmp = (sunPower * 13.4).toFixed(1);
  needle.setAttribute("d", needleAt(sunPower));

  // Actualizar lectura técnica de instrumentación
  const stateLabel = explode > 0.5 ? "VISTA EXPLOTADA (5 CAPAS)" : "ENSAMBLE MONOLÍTICO";
  const text = stateLabel + " · " + irradW + " W/m² · Isc " + currentAmp + " A";
  if (readout.textContent !== text) readout.textContent = text;
}

function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;

  // Tour automático didáctico cuando el usuario no interactúa
  if (touring) {
    clock += dt;
    // Ciclo de explosión y acople suave cada 5 segundos
    explodeTarget = (Math.sin(clock * 0.8) + 1) / 2 > 0.5 ? 1 : 0;
    sunPower = 0.5 + Math.sin(clock * 1.5) * 0.35;
  }

  // Easing exponencial amortiguado hacia los targets
  explode += (explodeTarget - explode) * (1 - Math.exp(-dt / 0.25));

  draw();

  const settled = !touring && Math.abs(explodeTarget - explode) < 0.002;
  if (visible && (!settled || touring)) {
    requestAnimationFrame(tick);
  }
}

new IntersectionObserver((entries) => {
  visible = entries[entries.length - 1].isIntersecting;
  if (visible) { last = 0; requestAnimationFrame(tick); }
}, { rootMargin: "100px 0px" }).observe(stage);

// Controles del usuario: hover/drag para controlar la explosión y la potencia solar
stage.addEventListener("pointermove", (e) => {
  touring = false;
  const box = stage.getBoundingClientRect();
  const relX = (e.clientX - box.left) / box.width;
  const relY = (e.clientY - box.top) / box.height;

  // Movimiento horizontal abre/cierra la explosión de capas
  explodeTarget = Math.max(0, Math.min(1, (relX - 0.2) / 0.6));
  // Movimiento vertical simula altura del sol (irradiancia)
  sunPower = Math.max(0.15, Math.min(1.0, 1.0 - relY * 0.8));
  requestAnimationFrame(tick);
});

stage.addEventListener("pointerleave", () => {
  // Al salir, retorna suavemente y activa el tour tras 3 segundos
  setTimeout(() => { touring = true; clock = 0; requestAnimationFrame(tick); }, 3000);
});

// Inicializar primer fotograma
draw();
`;

// Exportar HTML completo encapsulado
const plate = k.plateHtml({
  fig: "FIG 01",
  title: "ANATOMÍA DE MÓDULO FOTOVOLTAICO Y CELDA DE SILICIO",
  hint: "Mueve el cursor horizontalmente para explotar las capas // Verticalmente para variar la radiación solar",
  readout: "ENSAMBLE MONOLÍTICO · 950 W/m² · Isc 12.8 A",
  keys: [
    { mark: "lit", label: "Oblea P-N Silicio Monocristalino y Multi-Busbars" },
    { mark: "raised", label: "Vidrio templado antirreflejo 3.2mm y Doble Sellado EVA" },
    { mark: "flat", label: "Marco de aluminio anodizado estructural y Banco de Ensayos" }
  ],
  caption: "Banco de pruebas isométrico de módulo fotovoltaico Tier-1 con instrumentación en tiempo real. Muestra la interacción de los fotones incidentes, el encapsulado polimérico térmico y la generación de fotocorriente en corriente continua (DC).",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Simulador isométrico interactivo de panel solar">${svgMarkup}</div>`
});

const outputPage = k.pageHtml({
  title: "Anatomía Interactiva del Panel Solar | Solar as a Service",
  theme: "dark",
  body: plate,
  script: kitScript() + clientScript,
  width: 720
});

const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "web", "panel_anatomy_interactive.html");
writeFileSync(outPath, outputPage, "utf8");
console.log("Interactive Anatomy Panel created at:", outPath);
