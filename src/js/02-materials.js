/* -------------------------------------------------------------- materials */
const M = {};
function mk(n, c, r, m, ud) { const mat = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m || 0 }); mat.userData = Object.assign({ r: r, m: m || 0, env: .4 }, ud || {}); if (mat.userData.bs) mat.bumpScale = mat.userData.bs; mat.userData.envNow = mat.envMapIntensity = mat.userData.env; M[n] = mat; return mat; }
const WOOD = { s: 1, grain: true, map: 'grain', bump: true, bs: .0025 }, WOODOPT = { s: 1, grain: true, bump: true, bs: .0025 }, FAB = { s: .3, bump: true, bs: .004 };
// fixed
mk('plinth', 0x8f8a82, .95); mk('stone', 0xa9a399, .9); mk('roofDark', 0x4a4744, .9).side = THREE.DoubleSide; mk('lawn', 0x8c9c72, 1);
mk('white', 0xf5f3ef, .28, 0, { env: .8 }); mk('screen', 0x0c0d10, .15, 0, { env: .9 }); mk('steel', 0xb9bec3, .26, 1, { env: 1 }); mk('mirror', 0xe6edf0, .03, 1, { env: 1.2 });
mk('kick', 0x1d1d1e, .6); mk('paper', 0xf2eee6, .9); mk('soil', 0x33271f, 1); mk('plant', 0x4f7d4b, .75); mk('plantDark', 0x3b6441, .75); mk('trunk', 0x5b4332, .9);
mk('linen', 0xf6f4ef, 1, 0, Object.assign({ map: 'weave' }, FAB)); mk('led', 0xffffff, 1); M.led.emissive.setHex(0xfff4dc); M.led.emissiveIntensity = 1.5;
mk('glass', 0xdcecf3, .03, .55, { env: 1.5 }); Object.assign(M.glass, { transparent: true, opacity: .17 });
mk('glassFrost', 0xeaf1f3, .6); Object.assign(M.glassFrost, { transparent: true, opacity: .6 });
mk('glassDark', 0x33434d, .1); Object.assign(M.glassDark, { transparent: true, opacity: .72 });
mk('glassObj', 0xe8f3f5, .04, 0, { env: 1.2 }); Object.assign(M.glassObj, { transparent: true, opacity: .32 });
// restyled by the style switch
mk('wall', 0xffffff, .95, 0, { s: 2.4, map: null }); mk('trim', 0xffffff, .95); mk('ceil', 0xffffff, .95);
mk('floor', 0xffffff, .36, 0, { env: .95 }); mk('tile', 0xffffff, .24, 0, { env: 1 }); mk('tileWall', 0xffffff, .4, 0, { s: 1.2, env: .5 }); mk('stoneFloor', 0xffffff, .85);
mk('woodA', 0xffffff, .55, 0, WOOD); mk('woodB', 0xffffff, .5, 0, WOOD); mk('door', 0xffffff, .5, 0, WOODOPT); mk('frontDoor', 0xffffff, .45, 0, WOODOPT);
mk('metal', 0xffffff, .4, .5); mk('metalAccent', 0xffffff, .22, 1); mk('winFrame', 0xffffff, .5, .3); mk('frameArt', 0xffffff, .5, 0);
mk('cabinet', 0xffffff, .55, 0, WOODOPT); mk('cabinetUp', 0xffffff, .5, 0, WOODOPT); mk('counter', 0xffffff, .15, 0, { s: 2, env: .9 });
['sofa', 'cushion', 'accent1', 'accent2', 'accent3', 'headboard', 'curtain', 'towel', 'mat', 'chairSeat'].forEach(n => mk(n, 0xffffff, 1, 0, FAB));
M.curtain.side = THREE.DoubleSide;
mk('chairFrame', 0xffffff, .5, 0, WOODOPT); mk('ceramic', 0xffffff, .5, 0, { env: .6 }); mk('ceramicAlt', 0xffffff, .5, 0, { env: .6 });
mk('glow', 0xffffff, 1); M.glow.emissiveIntensity = 1.35; mk('slat', 0xffffff, .7, 0, { map: 'slat' });
['rugLiving', 'rugDining', 'rugGuest', 'runner'].forEach(n => mk(n, 0xffffff, 1));

const STY = {
  modern: { hash: 'modern', fill: 0xfff1e2, exp: 1.0, m: {
    wall: [0xf0efed], trim: [0xfafafa], ceil: [0xfbfbfa],
    floor: [0xffffff, { map: 'plankModern' }], tile: [0xffffff, { map: 'tileModern' }], tileWall: [0xf3f3f1, { map: 'tileModern' }], stoneFloor: [0x9c9a97, { map: 'tileModern' }],
    woodA: [0x35312e], woodB: [0x80593c], door: [0xf2f1ef, { map: null }], frontDoor: [0x232323, { map: null, r: .4 }],
    metal: [0x1b1c1e, { m: .5, r: .4 }], metalAccent: [0xc4c7cb, { m: 1, r: .2 }], winFrame: [0x1c1d1f, { m: .3 }], frameArt: [0x161616],
    cabinet: [0x3a3c3f, { map: null, r: .6 }], cabinetUp: [0xefeeec, { map: null }], counter: [0xffffff, { map: 'counterModern', r: .15 }],
    sofa: [0x5a5d62, { map: 'weave' }], cushion: [0x6e7176, { map: 'weave' }], accent1: [0xb0653a, { map: 'weave' }], accent2: [0xdddbd5, { map: 'boucle' }], accent3: [0x2b2c2e, { map: 'weave' }],
    headboard: [0x7b7e83, { map: 'weave' }], curtain: [0xe9e9e7, { map: 'weave' }], towel: [0x8f9296, { map: 'boucle' }], mat: [0x55585c, { map: 'boucle' }],
    chairSeat: [0x2a2a2c, { map: null, r: .55 }], chairFrame: [0x1b1c1e, { map: null, m: .5, r: .4 }], ceramic: [0xebeae7], ceramicAlt: [0x2c2c2e], glow: [0xfff0d8], slat: [0x35302c],
    rugLiving: [0xffffff, { map: 'rug_modern_l' }], rugDining: [0xffffff, { map: 'rug_modern_d' }], rugGuest: [0xffffff, { map: 'rug_modern_g' }], runner: [0xffffff, { map: 'rug_modern_r' }] } },
  scandi: { hash: 'scandinavian', fill: 0xfff2e0, exp: 1.04, m: {
    wall: [0xf6f3ec], trim: [0xfcfbf7], ceil: [0xfcfbf8],
    floor: [0xffffff, { map: 'plankScandi' }], tile: [0xffffff, { map: 'tileScandi' }], tileWall: [0xf8f6f1, { map: 'tileScandi' }], stoneFloor: [0xaaa59b, { map: 'tileScandi' }],
    woodA: [0xdcc49c], woodB: [0xc9a070], door: [0xf6f4ee, { map: null }], frontDoor: [0xc9a070, { map: 'grain' }],
    metal: [0x2a2a2b, { m: .3, r: .5 }], metalAccent: [0xc8a96a, { m: 1, r: .32 }], winFrame: [0xf4f2ed, { m: 0 }], frameArt: [0xc9a070],
    cabinet: [0xf4f2ec, { map: null }], cabinetUp: [0xdcc49c, { map: 'grain' }], counter: [0xffffff, { map: 'counterScandi', r: .3 }],
    sofa: [0xd8d1c3, { map: 'boucle' }], cushion: [0xe4ded2, { map: 'boucle' }], accent1: [0x8fa08a, { map: 'weave' }], accent2: [0xd9b3a3, { map: 'weave' }], accent3: [0xa9b7bd, { map: 'weave' }],
    headboard: [0xd7cebd, { map: 'boucle' }], curtain: [0xf4f0e7, { map: 'weave' }], towel: [0xa9b8a4, { map: 'boucle' }], mat: [0xd2cabb, { map: 'boucle' }],
    chairSeat: [0xd2ccbf, { map: 'weave' }], chairFrame: [0xdcc49c, { map: 'grain' }], ceramic: [0xeee8dd], ceramicAlt: [0xc98f6f], glow: [0xffedd0], slat: [0xdcc7a2],
    rugLiving: [0xffffff, { map: 'rug_scandi_l' }], rugDining: [0xffffff, { map: 'rug_scandi_d' }], rugGuest: [0xffffff, { map: 'rug_scandi_g' }], runner: [0xffffff, { map: 'rug_scandi_r' }] } },
  loft: { hash: 'loft', fill: 0xffd2a0, exp: 1.0, m: {
    wall: [0xcfccc6, { map: 'plaster' }], trim: [0x2a2a2c], ceil: [0xc4c2be],
    floor: [0xffffff, { map: 'concreteLoft', r: .3 }], tile: [0xffffff, { map: 'tileLoft', r: .28 }], tileWall: [0xffffff, { map: 'tileLoftWall' }], stoneFloor: [0xa3a19d, { map: 'concreteLoft' }],
    woodA: [0x5a4533], woodB: [0x8f6b47], door: [0x27282b, { map: null, m: .4, r: .45 }], frontDoor: [0x1e1e20, { map: null, m: .4, r: .4 }],
    metal: [0x18191b, { m: .7, r: .45 }], metalAccent: [0xa06f47, { m: 1, r: .32 }], winFrame: [0x161719, { m: .5 }], frameArt: [0x161616],
    cabinet: [0x232426, { map: null, r: .6 }], cabinetUp: [0x6b523c, { map: 'grain' }], counter: [0xffffff, { map: 'counterLoft', r: .3 }],
    sofa: [0x8a4f2c, { map: null, r: .5 }], cushion: [0x97593a, { map: null, r: .5 }], accent1: [0x4c5241, { map: 'weave' }], accent2: [0xd8cfbf, { map: 'boucle' }], accent3: [0x2e2f31, { map: 'weave' }],
    headboard: [0x6f4027, { map: null, r: .5 }], curtain: [0xa9a7a2, { map: 'weave' }], towel: [0x6b6d6f, { map: 'boucle' }], mat: [0x3c3d3f, { map: 'boucle' }],
    chairSeat: [0x6f4027, { map: null, r: .5 }], chairFrame: [0x18191b, { map: null, m: .7, r: .45 }], ceramic: [0xd9d5cd], ceramicAlt: [0x3a3b3d], glow: [0xffc980], slat: [0xffffff, { map: 'brick' }],
    rugLiving: [0xffffff, { map: 'rug_loft_l' }], rugDining: [0xffffff, { map: 'rug_loft_d' }], rugGuest: [0xffffff, { map: 'rug_loft_g' }], runner: [0xffffff, { map: 'rug_loft_r' }] } },
  lux: { hash: 'warm-luxury', fill: 0xffd9a8, exp: .98, m: {
    wall: [0xe6dccd], trim: [0xefe8dc], ceil: [0xf6f1e8],
    floor: [0xffffff, { map: 'herringLux', r: .27 }], tile: [0xffffff, { map: 'tileLux', r: .2 }], tileWall: [0xf4ede1, { map: 'tileLux' }], stoneFloor: [0xa89c8a, { map: 'tileLux' }],
    woodA: [0x6a4329], woodB: [0x3b291e], door: [0x603c26, { map: 'grain' }], frontDoor: [0x3a271b, { map: 'grain' }],
    metal: [0xb08d4f, { m: 1, r: .3 }], metalAccent: [0xc9a45c, { m: 1, r: .2 }], winFrame: [0x3a3028, { m: .5 }], frameArt: [0xb08d4f, { m: 1, r: .3 }],
    cabinet: [0x5e3b25, { map: 'grain' }], cabinetUp: [0xe9e1d3, { map: null }], counter: [0xffffff, { map: 'counterLux', r: .12 }],
    sofa: [0xe5dbc9, { map: 'boucle' }], cushion: [0xefe8da, { map: 'boucle' }], accent1: [0x2f4a3d, { map: 'weave' }], accent2: [0xa5552f, { map: 'weave' }], accent3: [0xb9834f, { map: 'weave' }],
    headboard: [0x2f4a3d, { map: 'weave' }], curtain: [0xd8c8b0, { map: 'weave' }], towel: [0xc9a27a, { map: 'boucle' }], mat: [0x5a4636, { map: 'boucle' }],
    chairSeat: [0x33503f, { map: 'weave' }], chairFrame: [0x6a4329, { map: 'grain' }], ceramic: [0xe8dfd0], ceramicAlt: [0x26221f], glow: [0xffd9a0], slat: [0x74492d],
    rugLiving: [0xffffff, { map: 'rug_lux_l' }], rugDining: [0xffffff, { map: 'rug_lux_d' }], rugGuest: [0xffffff, { map: 'rug_lux_g' }], runner: [0xffffff, { map: 'rug_lux_r' }] } }
};
const arts = [], fills = [];
const haloMat = new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, fog: false });
function halo(x, y, z, sc, parent) { const sp = new THREE.Sprite(haloMat); sp.scale.set(sc, sc, 1); sp.position.set(x, y, z); (parent || PARENT).add(sp); }
let sunReady = false;
let style = null;
function applyStyle(k) {
  if (!STY[k] || k === style) return; style = k; const S = STY[k];
  Object.keys(S.m).forEach(n => {
    const m = M[n], v = S.m[n], p = v[1] || {}, d = m.userData;
    m.color.setHex(v[0]); m.roughness = p.r !== undefined ? p.r : d.r; m.metalness = p.m !== undefined ? p.m : d.m;
    const name = ('map' in p) ? p.map : d.map;
    if (name !== undefined) { const t = name ? T(name) : null; m.map = t; m.bumpMap = t && d.bump ? t : null; }
    if (n === 'glow') m.emissive.setHex(v[0]);
    d.envNow = m.metalness > .6 && n !== 'glass' ? 1 : d.env; m.needsUpdate = true;
  });
  ['woodA', 'woodB', 'slat', 'linen'].forEach(n => { const m = M[n]; if (!m.map) { m.map = T(m.userData.map); if (m.userData.bump) m.bumpMap = m.map; m.needsUpdate = true; } });
  arts.forEach(a => { a.mat.map = artTex(k, a.i); a.mat.needsUpdate = true; });
  Object.keys(SG).forEach(g => { SG[g].visible = g === k; });
  fills.forEach(l => l.color.setHex(S.fill)); haloMat.color.setHex(S.fill); if (typeof applyTime === 'function' && sunReady) applyTime(); renderer.shadowMap.needsUpdate = true;
  document.querySelectorAll('#styles button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.style === k)));
  try { if (location.hash.slice(1) !== S.hash) location.hash = S.hash; } catch (e) { }
}

