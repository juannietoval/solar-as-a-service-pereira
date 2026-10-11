import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/Lenovo/.gemini/config/skills/anatomy/kit/iso-kit.mjs";

const WIDTH = 640;
const HEIGHT = 460;

// 1. ANATOMÍA DEL PANEL SOLAR (Corte isométrico de capas y celda)
function buildSolarPanel() {
  const P = k.fitProjection(
    [[-140, -90, -20], [140, 90, 80]],
    WIDTH,
    HEIGHT,
    { pad: 40, azimuth: 45, elevation: 32 }
  );

  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);
  const D = (points, style) => k.dotsSvg(points, style);

  const parts = [];

  // Marco de aluminio anodizado (Base)
  const FRAME = { x: -110, y: -70, w: 220, d: 140, r: 6 };
  parts.push(S(k.slabOf(FRAME, -10, 8, P), { tone: "mid", fill: "#334155" }));

  // Capa posterior Tedlar / Backsheet
  parts.push(S(k.slabOf(FRAME, -2, 3, P), { tone: "hi", fill: "#f8fafc" }));

  // Capa Encapsulante EVA Inferior
  const EVA_INF = { x: -105, y: -65, w: 210, d: 130, r: 4 };
  parts.push(S(k.slabOf(EVA_INF, 2, 4, P), { tone: "mid", fill: "#cbd5e1" }));

  // Capa de Celdas Fotovoltaicas Silicio Monocristalino (Obleas P-N con busbars)
  const CELL_LAYER = { x: -102, y: -62, w: 204, d: 124, r: 2 };
  parts.push(S(k.slabOf(CELL_LAYER, 7, 5, P), { tone: "spec", fill: "#0f172a" }));

  // Líneas de Busbars y Fingers metálicos sobre las celdas
  for (let x = -90; x <= 90; x += 30) {
    const p1 = k.iso([x, -60, 13], P);
    const p2 = k.iso([x, 60, 13], P);
    parts.push(L(`M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`, { stroke: "#fbbf24", width: 1.5 }));
  }
  for (let y = -50; y <= 50; y += 25) {
    const p1 = k.iso([-100, y, 13], P);
    const p2 = k.iso([100, y, 13], P);
    parts.push(L(`M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`, { stroke: "#94a3b8", width: 0.8, dash: "2 2" }));
  }

  // Capa Vidrio Solar Templado Antirreflejo (Superior, transparente simulado)
  const GLASS = { x: -106, y: -66, w: 212, d: 132, r: 4 };
  parts.push(S(k.slabOf(GLASS, 14, 6, P), { tone: "lo", fill: "#38bdf8", opacity: 0.6 }));

  // Caja de Conexión / Diodos Bypass (Junction Box) en la parte trasera
  const JBOX = { x: 30, y: -50, w: 45, d: 35, r: 4 };
  parts.push(S(k.slabOf(JBOX, -22, 12, P), { tone: "lo", fill: "#1e293b" }));

  // Conectores MC4 saliendo de la junction box
  const mc4_1 = k.iso([45, -50, -16], P);
  const mc4_2 = k.iso([45, -75, -16], P);
  const mc4_3 = k.iso([60, -50, -16], P);
  const mc4_4 = k.iso([60, -75, -16], P);
  parts.push(L(`M ${mc4_1[0]} ${mc4_1[1]} Q ${mc4_1[0]} ${mc4_1[1]-10} ${mc4_2[0]} ${mc4_2[1]}`, { stroke: "#ef4444", width: 3 }));
  parts.push(L(`M ${mc4_3[0]} ${mc4_3[1]} Q ${mc4_3[0]} ${mc4_3[1]-10} ${mc4_4[0]} ${mc4_4[1]}`, { stroke: "#0f172a", width: 3 }));

  // Tornillos y remaches en marco
  parts.push(D([k.iso([-105, -65, -2], P), k.iso([105, -65, -2], P), k.iso([-105, 65, -2], P), k.iso([105, 65, -2], P)], { r: 2.2, fill: "#94a3b8" }));

  return k.figureSvg({ width: WIDTH, height: HEIGHT, body: parts.join("\n"), standalone: "dark", label: "Anatomía Panel Solar Fotovoltaico" });
}

// 2. ANATOMÍA DEL INVERSOR SOLAR HÍBRIDO (Electrónica de potencia)
function buildInverter() {
  const P = k.fitProjection(
    [[-100, -80, -20], [100, 80, 110]],
    WIDTH,
    HEIGHT,
    { pad: 35, azimuth: 40, elevation: 28 }
  );

  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);
  const D = (points, style) => k.dotsSvg(points, style);

  const parts = [];

  // Chasis disipador de calor (Aletas traseras de aluminio)
  const HEATSINK = { x: -75, y: -45, w: 150, d: 90, r: 4 };
  parts.push(S(k.slabOf(HEATSINK, 0, 15, P), { tone: "lo" }));

  // Ranuras del disipador
  for (let x = -65; x <= 65; x += 12) {
    const p1 = k.iso([x, -45, 16], P);
    const p2 = k.iso([x, 45, 16], P);
    parts.push(L(`M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]}`, { tone: "mid" }));
  }

  // Gabinete Principal IP65
  const BODY = { x: -70, y: -40, w: 140, d: 80, r: 8 };
  parts.push(S(k.slabOf(BODY, 16, 65, P), { tone: "hi", lit: true }));

  // Pantalla LCD / Interfaz de Monitoreo IoT Frontal
  const DISPLAY = { x: -35, y: -20, w: 70, d: 40, r: 4 };
  parts.push(S(k.slabOf(DISPLAY, 82, 4, P), { tone: "lo" }));

  // Datos en Display (simulando lectura digital)
  const dCenter = k.iso([0, 0, 87], P);
  const dLed1 = k.iso([-20, -10, 87], P);
  const dLed2 = k.iso([20, -10, 87], P);
  parts.push(D([dLed1, dLed2], { size: 1.5, tone: "lit" }));
  parts.push(L(`M ${dCenter[0]-15} ${dCenter[1]} L ${dCenter[0]+15} ${dCenter[1]}`, { tone: "hi" }));
  parts.push(L(`M ${dCenter[0]-10} ${dCenter[1]+6} L ${dCenter[0]+10} ${dCenter[1]+6}`, { tone: "mid" }));

  // Seccionador DC (Interruptor giratorio de seguridad)
  parts.push(S(k.cylinder(-45, 25, 10, 82, 8, P, 18), { tone: "hi" }));

  // Glándulas de entrada DC y salida AC inferior
  for (let x = -50; x <= 50; x += 25) {
    parts.push(S(k.cylinder(x, -42, 6, -10, 10, P, 16), { tone: "lo" }));
  }

  return k.figureSvg({ width: WIDTH, height: HEIGHT, body: parts.join("\n"), standalone: "dark", label: "Anatomía Inversor Solar Híbrido" });
}

// 3. ANATOMÍA DEL BANCO DE BATERÍAS (Litio LiFePO4 / Módulo Rack)
function buildBattery() {
  const P = k.fitProjection(
    [[-110, -70, -20], [110, 70, 90]],
    WIDTH,
    HEIGHT,
    { pad: 35, azimuth: 48, elevation: 30 }
  );

  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);
  const D = (points, style) => k.dotsSvg(points, style);

  const parts = [];

  // Chasis metálico de batería tipo rack 48V LiFePO4
  const CHASSIS = { x: -85, y: -50, w: 170, d: 100, r: 6 };
  parts.push(S(k.slabOf(CHASSIS, 0, 50, P), { tone: "mid" }));

  // Celdas prismáticas LiFePO4 internas (simulando vista explotada / interna)
  for (let i = 0; i < 4; i++) {
    const xOffset = -60 + i * 36;
    const CELL = { x: xOffset, y: -40, w: 28, d: 80, r: 2 };
    parts.push(S(k.slabOf(CELL, 8, 36, P), { tone: "hi", lit: true }));
    // Terminales de celda
    const t1 = k.iso([xOffset + 7, -30, 45], P);
    const t2 = k.iso([xOffset + 21, -30, 45], P);
    parts.push(D([t1, t2], { size: 1.2, tone: "lit" }));
    // Pletinas de interconexión
    parts.push(L(`M ${t1[0]} ${t1[1]} L ${t2[0]} ${t2[1]}`, { tone: "hi" }));
  }

  // Panel Frontal con BMS (Battery Management System), disyuntor y puertos
  const FRONT = { x: -85, y: 50, w: 170, d: 4, r: 4 };
  parts.push(S(k.slabOf(FRONT, 0, 50, P), { tone: "lo" }));

  // Terminales de potencia principales (+ / -)
  parts.push(S(k.cylinder(55, 53, 5, 20, 8, P, 14), { tone: "hi" }));
  parts.push(S(k.cylinder(35, 53, 5, 20, 8, P, 14), { tone: "lo" }));

  // Luces SOC (State of Charge) LED indicador
  const leds = [];
  for (let l = 0; l < 5; l++) {
    leds.push(k.iso([-60 + l * 7, 53, 35], P));
  }
  parts.push(D(leds, { size: 1.2, tone: "lit" }));

  // Asas / Manijas de montaje en rack
  const h1 = k.iso([-80, 53, 25], P);
  const h2 = k.iso([-70, 53, 25], P);
  parts.push(L(`M ${h1[0]} ${h1[1]} Q ${h1[0]} ${h1[1]+10} ${h2[0]} ${h2[1]}`, { tone: "mid" }));

  return k.figureSvg({ width: WIDTH, height: HEIGHT, body: parts.join("\n"), standalone: "dark", label: "Anatomía Banco de Baterías LiFePO4" });
}

// Generar los 3 archivos SVG
const outDir = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(outDir, "anatomy_solar_panel.svg"), buildSolarPanel(), "utf8");
writeFileSync(join(outDir, "anatomy_inverter.svg"), buildInverter(), "utf8");
writeFileSync(join(outDir, "anatomy_battery.svg"), buildBattery(), "utf8");

console.log("Anatomy SVGs generated successfully in:", outDir);
