/* -------------------------------------------------------------- materials */
// Every material by name. mk() creates one; the palette PAL below recolours most of them once at start.
const M = {};
// Material M[n]: colour c, roughness r, metalness m. ud (userData): texture scale s in metres, grain, map,
// bump and bs (bump scale), env (reflection strength).
function mk(n, c, r, m, ud) {
  const mat = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m || 0 });
  mat.userData = Object.assign({ r: r, m: m || 0, env: 0.4 }, ud || {});
  if (mat.userData.bs) mat.bumpScale = mat.userData.bs;
  mat.userData.envNow = mat.envMapIntensity = mat.userData.env;
  M[n] = mat;
  return mat;
}
const WOOD = { s: 1, grain: true, map: 'grain', bump: true, bs: 0.0025 },
  WOODOPT = { s: 1, grain: true, bump: true, bs: 0.0025 },
  FAB = { s: 0.3, bump: true, bs: 0.004 };
// fixed
mk('plinth', 0x8f8a82, 0.95);
mk('stone', 0xa9a399, 0.9);
mk('travertine', 0xffffff, 0.7, 0, { s: 1, map: 'travertine', env: 0.5 }); // warm travertine: entrance stair, TV wall, tables
mk('bronze', 0xb08d5e, 0.3, 1, { env: 1 }); // champagne bronze of the entrance stair handrails
mk('roofDark', 0x4a4744, 0.9).side = THREE.DoubleSide;
mk('lawn', 0x8c9c72, 1);
mk('white', 0xf5f3ef, 0.28, 0, { env: 0.8 });
mk('screen', 0x0c0d10, 0.15, 0, { env: 0.9 });
mk('steel', 0xb9bec3, 0.26, 1, { env: 1 });
mk('mirror', 0xe6edf0, 0.03, 1, { env: 1.2 });
mk('kick', 0x1d1d1e, 0.6);
mk('paper', 0xf2eee6, 0.9);
mk('soil', 0x33271f, 1);
mk('plant', 0x4f7d4b, 0.75);
mk('plantDark', 0x3b6441, 0.75);
mk('trunk', 0x5b4332, 0.9);
mk('linen', 0xf6f4ef, 1, 0, Object.assign({ map: 'weave' }, FAB));
mk('led', 0xffffff, 1);
M.led.emissive.setHex(0xfff4dc);
M.led.emissiveIntensity = 1.5;
mk('glass', 0xdcecf3, 0.03, 0.55, { env: 1.5 });
Object.assign(M.glass, { transparent: true, opacity: 0.17 });
mk('glassFrost', 0xeaf1f3, 0.6);
Object.assign(M.glassFrost, { transparent: true, opacity: 0.6 });
mk('glassDark', 0x33434d, 0.1);
Object.assign(M.glassDark, { transparent: true, opacity: 0.72 });
mk('glassObj', 0xe8f3f5, 0.04, 0, { env: 1.2 });
Object.assign(M.glassObj, { transparent: true, opacity: 0.32 });
// coloured by PAL
mk('wall', 0xffffff, 0.95, 0, { s: 2.4, map: null });
mk('trim', 0xffffff, 0.95);
mk('ceil', 0xffffff, 0.95);
mk('floor', 0xffffff, 0.36, 0, { env: 0.95 });
mk('tile', 0xffffff, 0.24, 0, { env: 1 });
mk('tileWall', 0xffffff, 0.4, 0, { s: 1.2, env: 0.5 });
mk('stoneFloor', 0xffffff, 0.85);
mk('woodA', 0xffffff, 0.55, 0, WOOD);
mk('woodB', 0xffffff, 0.5, 0, WOOD);
mk('door', 0xffffff, 0.5, 0, WOODOPT);
mk('frontDoor', 0xffffff, 0.45, 0, WOODOPT);
mk('metal', 0xffffff, 0.4, 0.5);
mk('metalAccent', 0xffffff, 0.22, 1);
mk('winFrame', 0xffffff, 0.5, 0.3);
mk('frameArt', 0xffffff, 0.5, 0);
mk('cabinet', 0xffffff, 0.55, 0, WOODOPT);
mk('cabinetUp', 0xffffff, 0.5, 0, WOODOPT);
mk('counter', 0xffffff, 0.15, 0, { s: 2, env: 0.9 });
['sofa', 'cushion', 'accent1', 'accent2', 'accent3', 'headboard', 'curtain', 'towel', 'mat', 'chairSeat'].forEach(n =>
  mk(n, 0xffffff, 1, 0, FAB)
);
M.curtain.side = THREE.DoubleSide;
mk('chairFrame', 0xffffff, 0.5, 0, WOODOPT);
mk('ceramic', 0xffffff, 0.5, 0, { env: 0.6 });
mk('ceramicAlt', 0xffffff, 0.5, 0, { env: 0.6 });
mk('glow', 0xffffff, 1);
M.glow.emissiveIntensity = 1.35;
mk('slat', 0xffffff, 0.7, 0, { map: 'slat' });
['rugLiving', 'rugDining', 'rugGuest', 'runner'].forEach(n => mk(n, 0xffffff, 1));

// living and dining room only (warm contemporary: ivory, greige, oak, walnut, travertine, champagne bronze)
mk('livWall', 0xece5d8, 0.92); // warm ivory paint
mk('livCeil', 0xf1ebe1, 0.95);
mk('oak', 0xffffff, 0.42, 0, { env: 0.8, map: 'plankOak' }); // natural oak boards
mk('walnut', 0x74503a, 0.5, 0, Object.assign({}, WOOD)); // rich walnut, grain tinted
mk('espresso', 0x3a2a20, 0.55);
mk('boucleIvory', 0xefe9de, 1, 0, Object.assign({ map: 'boucle' }, FAB)); // sofa and cushions
mk('sandFab', 0xd9c8aa, 1, 0, Object.assign({ map: 'weave' }, FAB)); // dining and accent chairs
mk('greigeFab', 0xbfb3a2, 1, 0, Object.assign({ map: 'weave' }, FAB)); // throw cushions
mk('taupe', 0x9c8a77, 1, 0, Object.assign({ map: 'weave' }, FAB)); // blackout curtains
mk('sheer', 0xf6f1e8, 0.9, 0, { env: 0.2 }); // ivory sheer curtains
Object.assign(M.sheer, { transparent: true, opacity: 0.62, side: THREE.DoubleSide });
mk('ledWarm', 0xffffff, 1); // concealed 2700 K LED strips, dimmed by day like M.led
M.ledWarm.emissive.setHex(0xffc98a);
M.ledWarm.emissiveIntensity = 1.5;
mk('alabaster', 0xf6e7cc, 0.6); // pendant diffuser, glows at night like M.glow
M.alabaster.emissive.setHex(0xffd49a);
M.alabaster.emissiveIntensity = 1.2;
['travertine', 'oak', 'walnut', 'boucleIvory', 'sandFab', 'greigeFab', 'taupe'].forEach(n => {
  const m = M[n];
  m.map = T(m.userData.map);
  if (m.userData.bump) m.bumpMap = m.map;
});

// The house's one palette (the former Loft style): fill = colour of the room fill lights, exp = exposure,
// m = per-material settings { name: [colour, { map: texture name, r: roughness, m: metalness }] } applied once
// at start by applyPalette(); materials not listed keep the values given to mk() above.
const PAL = {
  fill: 0xffd2a0,
  exp: 1.0,
  m: {
    wall: [0xcfccc6, { map: 'plaster' }],
    trim: [0x2a2a2c],
    ceil: [0xc4c2be],
    floor: [0xffffff, { map: 'concreteLoft', r: 0.3 }],
    tile: [0xffffff, { map: 'tileLoft', r: 0.28 }],
    tileWall: [0xffffff, { map: 'tileLoftWall' }],
    stoneFloor: [0xa3a19d, { map: 'concreteLoft' }],
    woodA: [0x5a4533],
    woodB: [0x8f6b47],
    door: [0x27282b, { map: null, m: 0.4, r: 0.45 }],
    frontDoor: [0x1e1e20, { map: null, m: 0.4, r: 0.4 }],
    metal: [0x18191b, { m: 0.7, r: 0.45 }],
    metalAccent: [0xa06f47, { m: 1, r: 0.32 }],
    winFrame: [0x161719, { m: 0.5 }],
    frameArt: [0x161616],
    cabinet: [0x232426, { map: null, r: 0.6 }],
    cabinetUp: [0x6b523c, { map: 'grain' }],
    counter: [0xffffff, { map: 'counterLoft', r: 0.3 }],
    sofa: [0x8a4f2c, { map: null, r: 0.5 }],
    cushion: [0x97593a, { map: null, r: 0.5 }],
    accent1: [0x4c5241, { map: 'weave' }],
    accent2: [0xd8cfbf, { map: 'boucle' }],
    accent3: [0x2e2f31, { map: 'weave' }],
    headboard: [0x6f4027, { map: null, r: 0.5 }],
    curtain: [0xa9a7a2, { map: 'weave' }],
    towel: [0x6b6d6f, { map: 'boucle' }],
    mat: [0x3c3d3f, { map: 'boucle' }],
    chairSeat: [0x6f4027, { map: null, r: 0.5 }],
    chairFrame: [0x18191b, { map: null, m: 0.7, r: 0.45 }],
    ceramic: [0xd9d5cd],
    ceramicAlt: [0x3a3b3d],
    glow: [0xffc980],
    slat: [0xffffff, { map: 'brick' }],
    rugLiving: [0xffffff, { map: 'rug_l' }],
    rugDining: [0xffffff, { map: 'rug_d' }],
    rugGuest: [0xffffff, { map: 'rug_g' }],
    runner: [0xffffff, { map: 'rug_r' }]
  }
};
const arts = [],
  fills = [];
const haloMat = new THREE.SpriteMaterial({
  map: haloTex,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  transparent: true,
  opacity: 0,
  fog: false
});
// Soft glow sprite at (x, y, z), sc wide: shown around lamps at night.
function halo(x, y, z, sc, parent) {
  const sp = new THREE.Sprite(haloMat);
  sp.scale.set(sc, sc, 1);
  sp.position.set(x, y, z);
  (parent || PARENT).add(sp);
}
let sunReady = false;
// Colour every material from PAL, swap in its textures and set the artwork (called once at start).
function applyPalette() {
  Object.keys(PAL.m).forEach(n => {
    const m = M[n],
      v = PAL.m[n],
      p = v[1] || {},
      d = m.userData;
    m.color.setHex(v[0]);
    m.roughness = p.r !== undefined ? p.r : d.r;
    m.metalness = p.m !== undefined ? p.m : d.m;
    const name = 'map' in p ? p.map : d.map;
    if (name !== undefined) {
      const t = name ? T(name) : null;
      m.map = t;
      m.bumpMap = t && d.bump ? t : null;
    }
    if (n === 'glow') m.emissive.setHex(v[0]);
    d.envNow = m.metalness > 0.6 && n !== 'glass' ? 1 : d.env;
    m.needsUpdate = true;
  });
  ['woodA', 'woodB', 'slat', 'linen'].forEach(n => {
    const m = M[n];
    if (!m.map) {
      m.map = T(m.userData.map);
      if (m.userData.bump) m.bumpMap = m.map;
      m.needsUpdate = true;
    }
  });
  arts.forEach(a => {
    a.mat.map = artTex(a.i);
    a.mat.needsUpdate = true;
  });
  fills.forEach(l => l.color.setHex(PAL.fill));
  haloMat.color.setHex(PAL.fill);
  if (typeof applyTime === 'function' && sunReady) applyTime();
  renderer.shadowMap.needsUpdate = true;
}
