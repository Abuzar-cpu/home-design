THREE.ColorManagement.legacyMode = false;

/* ------------------------------------------------------------------ setup */
// Units are metres. x runs 0-8.6 across the house, z 0-11.9 from the rear wall to the front wall
// (porch and balcony to 13.6), y is up from the ground-floor level.
const H = 2.8, // ceiling height of both floors
  UPPER_Y = 3.1, // upper floor level (18 stair risers)
  GROUND = -1.5, // garden level, below the ground floor
  RISE = 1.5 / 9, // riser height of the 9 entrance steps
  EYE = 1.6, // eye height when walking
  RAD = 0.25; // walking collision radius
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
const roof = new THREE.Group();
scene.add(roof); // hidden in dollhouse view
const dollOnly = new THREE.Group();
dollOnly.visible = false;
scene.add(dollOnly);
const SG = { modern: new THREE.Group(), scandi: new THREE.Group(), lux: new THREE.Group(), loft: new THREE.Group() }; // pieces that differ per style
Object.keys(SG).forEach(k => scene.add(SG[k]));
const colliders = [];
const upG = new THREE.Group();
upG.position.y = UPPER_Y;
scene.add(upG); // upper floor, hidden when the dollhouse shows the ground floor
const roofTop = new THREE.Group();
scene.add(roofTop); // top ceiling and roof
// where the helpers build: set with useFloor() (04-helpers.js), never by hand
let PARENT = scene, // group new meshes go into
  YOFF = 0, // floor level added to collider heights
  CEILG = roof, // group for the ceiling pieces of this floor
  CY = 0; // y of that ceiling group
