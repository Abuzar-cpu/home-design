(function () {
'use strict';
if (!window.THREE) { document.getElementById('err').hidden = false; return; }
THREE.ColorManagement.legacyMode = false;

/* -------------------------------------------------------- living room studio setup
   Everything from here down to 90-ui.js shares one scope (classic <script> join,
   same convention as the house tour's src/js/*.js), so the reused house files
   below (01-textures, 02-materials, 04-helpers, 20-furniture-pieces, 30-living-dining,
   50-lighting) just work unmodified against the globals this file defines. */
const H = 2.8;                        // ceiling height, matches the house
const CX = 2.4, CZ = 1.9;             // living area's centre, in the house's own x/z metres
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe9e4d9);
scene.fog = new THREE.Fog(0xe9e4d9, 24, 58);
const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 200);

const CEILG = new THREE.Group(); scene.add(CEILG);           // downlight() parents its fittings onto this
const roof = new THREE.Group(); scene.add(roof);             // pendant wires parent up to this in the house code
const SG = { modern: new THREE.Group(), scandi: new THREE.Group(), lux: new THREE.Group(), loft: new THREE.Group() };  // style-specific pieces (coffee table, pendants) — the room uses these for real
Object.keys(SG).forEach(k => scene.add(SG[k]));
const colliders = [];                 // fit-check colliders the room code still records; unused here
let PARENT = scene, YOFF = 0, CY = 0;
