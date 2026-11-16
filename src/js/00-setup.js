(function () {
'use strict';
if (!window.THREE) { document.getElementById('err').hidden = false; return; }
THREE.ColorManagement.legacyMode = false;

/* ------------------------------------------------------------------ setup */
const H = 2.8, GROUND = -1.5, RISE = 1.5 / 9, EYE = 1.6, RAD = 0.25;
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xdfe8ee, 60, 230);
const camera = new THREE.PerspectiveCamera(68, 1, 0.05, 500);
const roof = new THREE.Group(); scene.add(roof);          // hidden in dollhouse view
const dollOnly = new THREE.Group(); dollOnly.visible = false; scene.add(dollOnly);
const SG = { modern: new THREE.Group(), scandi: new THREE.Group(), lux: new THREE.Group(), loft: new THREE.Group() };   // pieces that differ per style
Object.keys(SG).forEach(k => scene.add(SG[k]));
const colliders = [];
const upG = new THREE.Group(); upG.position.y = 3.1; scene.add(upG);      // upper floor, hidden when the dollhouse shows the ground floor
const roofTop = new THREE.Group(); scene.add(roofTop);                    // top ceiling and roof
let PARENT = scene, YOFF = 0, CEILG = roof, CY = 0;

