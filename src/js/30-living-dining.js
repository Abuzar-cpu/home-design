/* ----------------------------------------------- living + dining 7.8 x 4.0 */
// rug under the sofa and coffee table
box(0.7, 3.75, 0, 0.014, 1.1, 3.8, M.rugLiving, { cast: false });
// L-shaped sofa: 3.65 m along the back wall with a short chaise end on the dining side
soft(0.55, 4.2, 0.13, 0.44, 0.46, 1.42, M.sofa, 0.04);
soft(3.24, 4.2, 0.13, 0.44, 1.4, 2.05, M.sofa, 0.04);
soft(0.55, 4.2, 0.36, 0.9, 0.46, 0.74, M.sofa, 0.05);
soft(3.92, 4.2, 0.36, 0.9, 0.7, 2.05, M.sofa, 0.05);
soft(0.55, 0.79, 0.36, 0.68, 0.52, 1.42, M.sofa, 0.05);
[
  [0.8, 1.61],
  [1.615, 2.425],
  [2.43, 3.24],
  [3.24, 3.91]
].forEach(s => soft(s[0], s[1], 0.42, 0.6, 0.76, 1.44, M.cushion, 0.05));
soft(3.24, 3.91, 0.42, 0.6, 1.445, 2.04, M.cushion, 0.05);
[
  [0.81, 1.6],
  [1.625, 2.415],
  [2.44, 3.23],
  [3.25, 3.7]
].forEach(s => soft(s[0], s[1], 0.6, 0.98, 0.7, 0.9, M.cushion, 0.07, { rx: -0.1 }));
[
  [0.92, 1.48],
  [1.49, 2.03]
].forEach(z => soft(3.72, 3.92, 0.6, 0.98, z[0], z[1], M.cushion, 0.07, { rz: -0.1 }));
pillow(1.05, 0.8, 1.02, 0.44, 0.42, 0.14, M.accent1, { rx: -0.3 });
pillow(1.37, 0.78, 1.06, 0.36, 0.36, 0.12, M.accent2, { rx: -0.32, ry: 0.25 });
pillow(2.9, 0.76, 1.08, 0.5, 0.26, 0.12, M.accent3, { rx: -0.35 });
soft(3.58, 3.72, 0.59, 1.01, 1.5, 1.94, M.accent2, 0.066, { corner: 0.07, rz: -0.3 });
soft(3.3, 3.85, 0.6, 0.625, 1.72, 2.05, M.accent3, 0.012, { cast: false });
soft(3.32, 3.83, 0.3, 0.62, 2.05, 2.08, M.accent3, 0.01, { cast: false });
legs(0.61, 4.14, 0.52, 1.36, 0.13);
legs(3.3, 4.14, 1.5, 1.99, 0.13);
solid(0.55, 4.2, 0.45, 1.42, 0.86);
solid(3.24, 4.2, 1.42, 2.05, 0.86);
// side table at the end of the L
cyl(3.72, 0.5, 0.525, 2.3, 0.2, M.woodB, { seg: 28 });
cyl(3.72, 0.02, 0.5, 2.3, 0.014, M.metal);
cyl(3.72, 0, 0.02, 2.3, 0.13, M.metal);
vase(3.72, 0.525, 2.3, 0.2, M.ceramicAlt, true);
solid(3.54, 3.9, 2.12, 2.48, 0.55);
floorLamp(4.45, 0.7);
// coffee table, one per style, with the same styling on top
box(1.4, 2.6, 0.34, 0.42, 1.9, 2.5, M.counter, { parent: SG.modern });
box(1.52, 2.48, 0, 0.34, 2.0, 2.4, M.woodA, { parent: SG.modern });
cyl(1.96, 0.385, 0.42, 2.2, 0.44, M.woodA, { parent: SG.scandi, seg: 36 });
[
  [1.71, 2.0],
  [2.21, 2.05],
  [1.96, 2.47]
].forEach(q => cyl(q[0], 0, 0.385, q[1], 0.016, M.woodA, { parent: SG.scandi, cast: false }));
cyl(2.11, 0.3, 0.33, 2.62, 0.24, M.woodB, { parent: SG.scandi, seg: 28 });
[
  [1.97, 2.56],
  [2.23, 2.52],
  [2.13, 2.76]
].forEach(q => cyl(q[0], 0, 0.3, q[1], 0.013, M.woodB, { parent: SG.scandi, cast: false }));
cyl(2.0, 0.385, 0.42, 2.2, 0.5, M.counter, { parent: SG.lux, seg: 44 });
[
  [1.7, 1.95],
  [2.3, 1.95],
  [2.0, 2.53]
].forEach(q => cyl(q[0], 0, 0.385, q[1], 0.014, M.metal, { parent: SG.lux, cast: false }));
(function () {
  const t = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 8, 40), M.metal);
  t.rotation.x = Math.PI / 2;
  t.position.set(2.0, 0.1, 2.2);
  SG.lux.add(t);
})();
box(1.4, 2.6, 0.375, 0.42, 1.9, 2.5, M.woodB, { parent: SG.loft });
box(1.46, 2.54, 0.1, 0.125, 1.96, 2.44, M.woodA, { parent: SG.loft, cast: false });
[
  [1.43, 1.93],
  [2.57, 1.93],
  [1.43, 2.47],
  [2.57, 2.47]
].forEach(q =>
  box(q[0] - 0.02, q[0] + 0.02, 0, 0.375, q[1] - 0.02, q[1] + 0.02, M.metal, { parent: SG.loft, cast: false })
);
solid(1.4, 2.6, 1.9, 2.5, 0.42);
// tray, candle, vase and books on the coffee table
box(2.01, 2.31, 0.42, 0.432, 2.07, 2.33, M.metalAccent, { cast: false });
cyl(2.08, 0.432, 0.52, 2.15, 0.035, M.paper, { cast: false });
cyl(2.08, 0.52, 0.535, 2.15, 0.003, M.kick, { cast: false });
vase(2.22, 0.432, 2.25, 0.16, M.ceramicAlt, true);
bookStack(1.78, 0.42, 2.19, 3, 4);
// media wall
tiled('x', 4.4, -1, 0.4, 3.04, [], M.slat, 0.6);
box(0.8, 3.0, 0.18, 0.55, 4.0, 4.385, M.woodA);
solid(0.8, 3.0, 4.0, 4.4, 0.55);
[1.53, 2.27].forEach(x => box(x - 0.002, x + 0.002, 0.2, 0.53, 3.995, 4.0, M.kick, { cast: false }));
box(1.2, 2.6, 0.88, 1.68, 4.34, 4.372, M.screen);
box(1.75, 2.05, 0.55, 0.6, 4.2, 4.33, M.kick, { cast: false });
vase(1.0, 0.55, 4.2, 0.26, M.ceramic, true);
bookStack(2.78, 0.55, 4.2, 3, 7);
cyl(2.78, 0.646, 0.72, 4.2, 0.05, M.ceramicAlt, { rTop: 0.03 });
// glass display cabinet beside the TV unit: dark frame, glass doors and shelves, lit from inside
(function () {
  const x0 = 3.08,
    x1 = 3.53,
    z0 = 3.99,
    z1 = 4.39,
    f = 0.025,
    H = 2.25;
  box(x0 + 0.02, x1 - 0.02, 0, 0.08, z0 + 0.03, z1, M.kick, { cast: false });
  box(x0 + f, x1 - f, 0.08, H - f, z1 - 0.015, z1, M.mirror, { cast: false });
  [
    [x0, x0 + f, z0, z0 + f],
    [x1 - f, x1, z0, z0 + f],
    [x0, x0 + f, z1 - f, z1],
    [x1 - f, x1, z1 - f, z1]
  ].forEach(q => box(q[0], q[1], 0.08, H, q[2], q[3], M.metal));
  [0.08, 1.6, H - f].forEach(y => {
    box(x0, x1, y, y + f, z0, z0 + f, M.metal, { cast: false });
    [x0, x1 - f].forEach(x => box(x, x + f, y, y + f, z0, z1, M.metal, { cast: false }));
  });
  box(x0, x1, H - f, H, z0, z1, M.metal);
  [
    [0.08 + f, 1.6],
    [1.6 + f, H - f]
  ].forEach(d => box(x0 + f, x1 - f, d[0], d[1], z0 + 0.008, z0 + 0.014, M.glass, { cast: false, recv: false }));
  [x0 + 0.009, x1 - 0.009].forEach(x =>
    box(x - 0.003, x + 0.003, 0.08 + f, H - f, z0 + f, z1 - f, M.glass, { cast: false, recv: false })
  );
  [
    [1.18, 1.52],
    [1.68, 2.0]
  ].forEach(h => box(x1 - 0.075, x1 - 0.065, h[0], h[1], z0 - 0.018, z0 - 0.008, M.metalAccent, { cast: false }));
  [0.55, 0.97, 1.39, 1.82].forEach(y => {
    box(x0 + f, x1 - f, y, y + 0.01, z0 + f, z1 - 0.015, M.glass, { cast: false, recv: false });
    box(x0 + f, x1 - f, y - 0.006, y, z0 + f, z0 + f + 0.012, M.led, { cast: false });
  });
  [x0 + f, x1 - f - 0.006].forEach(x =>
    box(x, x + 0.006, 0.12, H - 0.04, z0 + f, z0 + f + 0.012, M.led, { cast: false })
  );
  vase(3.2, 0.105, 4.2, 0.3, M.ceramicAlt);
  cyl(3.41, 0.105, 0.27, 4.22, 0.05, M.glassObj, { cast: false });
  [3.17, 3.25].forEach(x => cyl(x, 0.56, 0.72, 4.16, 0.028, M.glassObj, { cast: false }));
  cyl(3.42, 0.56, 0.64, 4.2, 0.07, M.ceramic, { rTop: 0.05, cast: false });
  bookStack(3.3, 0.98, 4.2, 2, 120);
  cyl(3.2, 1.4, 1.66, 4.2, 0.042, M.glassObj, { rTop: 0.02, cast: false });
  vase(3.42, 1.4, 4.2, 0.2, M.ceramic);
  vase(3.3, 1.83, 4.2, 0.24, M.ceramicAlt);
  cyl(3.15, 1.83, 1.93, 4.16, 0.045, M.metalAccent, { cast: false });
  solid(x0, x1, z0, z1, H);
})();
// pictures over the sofa, plant in the corner, curtains at the side window
art('x', 0.4, 1, 1.25, 2.1, 1.22, 2.06, 0);
art('x', 0.4, 1, 2.3, 3.15, 1.22, 2.06, 1);
plant(4.95, 0.85, 0.9, 'tree');
curtains('z', 0.4, 1, 1.6, 3.2);
// dining
// dining table for six: rug, top, legs, chairs and place settings
box(5.0, 7.8, 0, 0.014, 1.25, 3.35, M.rugDining, { cast: false });
soft(5.5, 7.3, 0.715, 0.76, 1.85, 2.75, M.woodB, 0.012, { corner: 0.03 });
[
  [5.6, 1.95],
  [7.2, 1.95],
  [5.6, 2.65],
  [7.2, 2.65]
].forEach(q => box(q[0] - 0.035, q[0] + 0.035, 0, 0.72, q[1] - 0.035, q[1] + 0.035, M.woodB));
[5.8, 6.4, 7.0].forEach(x => {
  chair(x, 1.62, 's');
  chair(x, 2.98, 'n');
  placeSetting(x, 2.06, -1);
  placeSetting(x, 2.54, 1);
});
solid(5.5, 7.3, 1.4, 3.2, 0.86);
// table runner, vase and two candles
soft(5.65, 7.15, 0.76, 0.766, 2.24, 2.36, M.curtain, 0.003, { cast: false });
vase(6.4, 0.766, 2.3, 0.24, M.ceramic, true);
[6.12, 6.68].forEach(x => {
  cyl(x, 0.766, 0.86, 2.3, 0.028, M.metalAccent, { rTop: 0.012 });
  cyl(x, 0.86, 1.0, 2.3, 0.011, M.paper, { cast: false });
});
// pendants, one design per style
box(5.7, 7.1, 1.55, 1.6, 2.27, 2.33, M.metal, { parent: SG.modern });
box(5.72, 7.08, 1.542, 1.55, 2.28, 2.32, M.led, { parent: SG.modern, cast: false });
[5.9, 6.9].forEach(x => cyl(x, 1.6, H, 2.3, 0.004, M.metal, { parent: SG.modern, cast: false }));
[5.95, 6.4, 6.85].forEach(x => halo(x, 1.52, 2.3, 0.8, SG.modern));
[5.95, 6.85].forEach(x => {
  cyl(x, 1.5, 1.74, 2.3, 0.22, M.ceramic, { parent: SG.scandi, rTop: 0.05, seg: 28 });
  cyl(x, 1.488, 1.5, 2.3, 0.19, M.glow, { parent: SG.scandi, cast: false });
  cyl(x, 1.74, H, 2.3, 0.005, M.metal, { parent: SG.scandi, cast: false });
  halo(x, 1.5, 2.3, 1.2, SG.scandi);
});
[
  [5.9, 1.62],
  [6.4, 1.48],
  [6.9, 1.7]
].forEach(q => {
  sph(q[0], q[1], 2.3, 0.12, 0.12, 0.12, M.glow, { parent: SG.lux, cast: false });
  cyl(q[0], q[1] + 0.1, q[1] + 0.16, 2.3, 0.035, M.metal, { parent: SG.lux, cast: false });
  cyl(q[0], q[1] + 0.16, H, 2.3, 0.004, M.metal, { parent: SG.lux, cast: false });
  halo(q[0], q[1], 2.3, 0.95, SG.lux);
});
[
  [5.85, 1.62],
  [6.4, 1.5],
  [6.95, 1.62]
].forEach(q => {
  sph(q[0], q[1], 2.3, 0.055, 0.075, 0.055, M.glow, { parent: SG.loft, cast: false });
  cyl(q[0], q[1] + 0.06, q[1] + 0.14, 2.3, 0.028, M.metal, { parent: SG.loft, cast: false });
  cyl(q[0], q[1] + 0.14, H, 2.3, 0.004, M.metal, { parent: SG.loft, cast: false });
  const cage = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0x18191b, wireframe: true })
  );
  cage.position.set(q[0], q[1], 2.3);
  SG.loft.add(cage);
  halo(q[0], q[1], 2.3, 0.9, SG.loft);
});
// sideboard
box(5.6, 7.4, 0.16, 0.8, 4.0, 4.385, M.woodA);
box(5.58, 7.42, 0.8, 0.83, 3.98, 4.39, M.counter);
legs(5.68, 7.32, 4.06, 4.33, 0.16, M.metal, 0.015);
solid(5.6, 7.4, 4.0, 4.4, 0.83);
[6.2, 6.8].forEach(x => box(x - 0.002, x + 0.002, 0.18, 0.78, 3.995, 4.0, M.kick, { cast: false }));
[5.9, 6.5, 7.1].forEach(x => box(x - 0.05, x + 0.05, 0.58, 0.592, 3.98, 4.0, M.metalAccent, { cast: false }));
tableLamp(5.85, 0.83, 4.2, 1.15, M.ceramicAlt);
vase(7.12, 0.83, 4.2, 0.3, M.ceramic, true);
bookStack(6.5, 0.83, 4.2, 3, 12);
cyl(6.5, 0.926, 0.96, 4.2, 0.09, M.ceramicAlt, { rTop: 0.12 });
art('x', 4.4, -1, 6.05, 6.95, 1.2, 2.05, 2);
plant(7.82, 0.82, 1.15, 'snake');
curtains('x', 0.4, 1, 5.8, 7.4);
// ceiling lights and room fill
[
  [1.6, 1.5],
  [1.6, 3.3],
  [4.3, 2.4],
  [6.4, 3.6],
  [7.6, 0.9]
].forEach(p => downlight(p[0], p[1]));
fill(2.4, 2.3, 2.6, 0.5);
fill(6.4, 1.45, 2.3, 0.55);
