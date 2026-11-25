/* ----------------------------------------------- living + dining 7.8 x 4.0 */
// Warm contemporary: ivory walls, natural oak floor, walnut and travertine, champagne bronze details.
// Living area on the left (TV wall on the hall wall), dining under the rear window on the right; the walk from
// the hall opening (x 3.6-4.9) to the dining table stays at least 1.2 m wide.

// Full-height curtain folds stacked on a wall face from a0 to a1 (axis and dir as for vpanel), d0..d1 off the
// wall, up to top; mat is the fabric.
function drapes(axis, face, dir, a0, a1, d0, d1, top, mat) {
  for (let a = a0; a < a1 - 0.03; a += 0.066) {
    const f0 = face + dir * d0,
      f1 = face + dir * d1;
    if (axis === 'x') soft(a, a + 0.06, 0.02, top, f0, f1, mat, 0.022, { cast: false });
    else soft(f0, f1, 0.02, top, a, a + 0.06, mat, 0.022, { cast: false });
  }
}
// Upholstered dining chair at (cx, cz) in sand fabric with a rounded back, walnut legs with bronze tips;
// face = direction the sitter looks ('n' toward -z or 's' toward +z).
function diningChair(cx, cz, face) {
  const s = 0.24,
    bk = face === 's' ? -1 : 1; // side the back is on, along z
  soft(cx - s, cx + s, 0.42, 0.52, cz - s, cz + s, M.sandFab, 0.04, { corner: 0.08 });
  soft(cx - s + 0.01, cx + s - 0.01, 0.5, 0.9, cz + bk * (s - 0.07), cz + bk * s, M.sandFab, 0.03, { corner: 0.1 });
  [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1]
  ].forEach(q => {
    const x = cx + q[0] * (s - 0.04),
      z = cz + q[1] * (s - 0.04);
    cyl(x, 0.03, 0.42, z, 0.016, M.walnut, { rTop: 0.02, cast: false, seg: 10 });
    cyl(x, 0, 0.03, z, 0.015, M.bronze, { cast: false, seg: 10 });
  });
}

// ---- room finishes: oak floor, ivory walls and ceiling
floorPlane(0.4, 8.2, 0.4, 4.4, 0.003, M.oak, 2.4);
tiled('x', 0.4, 1, 0.4, 8.2, [win(5.8, 7.4, -1)], M.livWall, 2.4); // rear wall
tiled('z', 0.4, 1, 0.4, 4.4, [win(1.6, 3.2, -1)], M.livWall, 2.4); // side wall with the living window
tiled('z', 8.2, -1, 0.4, 4.4, [], M.livWall, 2.4); // right wall
tiled('x', 4.4, -1, 3.55, 8.2, [{ a0: 3.6, a1: 4.9, sill: 0, head: 2.3 }], M.livWall, 2.4); // hall wall past the TV
box(0.4, 8.2, H - 0.01, H - 0.002, 0.4, 4.4, M.livCeil, { parent: roof, cast: false });
// plaster band along the two window walls, 12 cm deep: it hides the curtain tracks and an indirect LED line
box(0.4, 8.2, H - 0.12, H - 0.01, 0.4, 0.64, M.livCeil, { parent: roof });
box(0.4, 0.64, H - 0.12, H - 0.01, 0.64, 4.4, M.livCeil, { parent: roof });
box(0.64, 8.2, H - 0.045, H - 0.035, 0.64, 0.65, M.ledWarm, { parent: roof, cast: false });
box(0.64, 0.65, H - 0.045, H - 0.035, 0.65, 4.4, M.ledWarm, { parent: roof, cast: false });

// ---- living area
// rug: ivory and sand, under the sofa's front legs and the whole accent chair
box(0.75, 4.05, 0, 0.014, 1.15, 3.62, M.rugLiving, { cast: false });
// curved sofa 3.1 m in ivory bouclé: rounded plinth, softly rounded back and arms, three seat cushions
box(0.8, 3.6, 0, 0.06, 0.6, 1.32, M.espresso, { cast: false });
soft(0.68, 3.72, 0.06, 0.42, 0.5, 1.45, M.boucleIvory, 0.07, { corner: 0.32 });
soft(0.65, 3.75, 0.06, 0.86, 0.45, 0.76, M.boucleIvory, 0.12, { corner: 0.3 });
soft(0.65, 0.92, 0.06, 0.66, 0.5, 1.42, M.boucleIvory, 0.12, { corner: 0.13 });
soft(3.48, 3.75, 0.06, 0.66, 0.5, 1.42, M.boucleIvory, 0.12, { corner: 0.13 });
[
  [0.93, 1.78],
  [1.79, 2.62],
  [2.63, 3.47]
].forEach(c => {
  soft(c[0], c[1], 0.42, 0.58, 0.76, 1.44, M.boucleIvory, 0.07, { corner: 0.1 });
  soft(c[0] + 0.02, c[1] - 0.02, 0.56, 0.98, 0.74, 0.95, M.boucleIvory, 0.09, { rx: -0.12 });
});
pillow(1.15, 0.8, 1.02, 0.44, 0.42, 0.14, M.greigeFab, { rx: -0.3 });
pillow(1.5, 0.78, 1.06, 0.36, 0.36, 0.12, M.taupe, { rx: -0.32, ry: 0.25 });
pillow(3.2, 0.8, 1.04, 0.44, 0.42, 0.14, M.sandFab, { rx: -0.3, ry: -0.2 });
soft(2.75, 3.4, 0.58, 0.6, 1.0, 1.42, M.greigeFab, 0.008, { cast: false });
solid(0.65, 3.75, 0.45, 1.45, 0.86);
// round walnut side table with a bronze stem and an alabaster table lamp
cyl(4.0, 0.53, 0.56, 0.85, 0.21, M.walnut, { seg: 32 });
cyl(4.0, 0.02, 0.53, 0.85, 0.016, M.bronze);
cyl(4.0, 0, 0.02, 0.85, 0.15, M.bronze, { seg: 28 });
tableLamp(4.0, 0.56, 0.85, 0.95, M.ceramic);
solid(3.79, 4.21, 0.64, 1.06, 0.6);
// sculptural oval coffee table in honed travertine: 1.3 x 0.75 top on an oval plinth
(function () {
  const top = cyl(2.2, 0.3, 0.4, 2.27, 0.5, M.travertine, { seg: 56 }),
    base = cyl(2.2, 0, 0.3, 2.27, 0.5, M.travertine, { seg: 48, rTop: 0.46 });
  top.scale.set(1.3, 1, 0.75);
  base.scale.set(0.8, 1, 0.42);
})();
solid(1.55, 2.85, 1.9, 2.65, 0.4);
// bronze tray, candle, vase and books on the coffee table
cyl(2.45, 0.4, 0.41, 2.25, 0.16, M.bronze, { cast: false, seg: 32 });
cyl(2.42, 0.41, 0.5, 2.22, 0.035, M.paper, { cast: false });
vase(2.55, 0.41, 2.3, 0.18, M.ceramic, true);
bookStack(1.85, 0.4, 2.25, 3, 4);
// accent chair in sand bouclé on the hall side, facing the window: rounded tub on a walnut plinth
box(3.3, 3.86, 0, 0.12, 2.4, 2.98, M.walnut);
soft(3.2, 3.95, 0.12, 0.42, 2.3, 3.08, M.sandFab, 0.08, { corner: 0.22 });
soft(3.72, 3.95, 0.12, 0.8, 2.3, 3.08, M.sandFab, 0.09, { corner: 0.12 });
soft(3.22, 3.95, 0.12, 0.62, 2.3, 2.46, M.sandFab, 0.07, { corner: 0.08 });
soft(3.22, 3.95, 0.12, 0.62, 2.92, 3.08, M.sandFab, 0.07, { corner: 0.08 });
soft(3.25, 3.74, 0.42, 0.53, 2.46, 2.92, M.boucleIvory, 0.05, { corner: 0.1 });
pillow(3.66, 0.68, 2.69, 0.3, 0.3, 0.12, M.taupe, { ry: Math.PI / 2, rz: 0.2 });
solid(3.2, 3.95, 2.3, 3.08, 0.8);

// ---- TV wall on the hall wall: travertine centre panel, fluted walnut either side, floating walnut console
box(1.45, 2.85, 0, H, 4.34, 4.4, M.travertine);
box(0.4, 1.45, 0, H, 4.36, 4.4, M.walnut);
box(2.85, 3.55, 0, H, 4.36, 4.4, M.walnut);
for (let x = 0.46; x < 3.52; x += 0.06) {
  if (x > 1.42 && x < 2.88) continue;
  box(x - 0.004, x + 0.004, 0.02, H - 0.02, 4.355, 4.36, M.espresso, { cast: false });
}
[1.45, 2.85].forEach(x => box(x - 0.006, x + 0.006, 0, H, 4.33, 4.36, M.espresso, { cast: false })); // shadow gaps
// concealed LED grazing the stone from both shadow gaps, and the TV
[1.465, 2.835].forEach(x => box(x - 0.004, x + 0.004, 0.5, H - 0.05, 4.335, 4.34, M.ledWarm, { cast: false }));
box(1.43, 2.87, 0.95, 1.77, 4.31, 4.335, M.screen);
// floating console 2.3 m, fluted front, with LED light washing the floor beneath it
box(1.0, 3.3, 0.22, 0.48, 4.04, 4.34, M.walnut);
for (let x = 1.05; x < 3.28; x += 0.05) box(x - 0.003, x + 0.003, 0.24, 0.46, 4.035, 4.04, M.espresso, { cast: false });
box(1.05, 3.25, 0.214, 0.22, 4.08, 4.3, M.ledWarm, { cast: false });
halo(2.15, 0.12, 4.2, 1.6);
solid(1.0, 3.3, 4.04, 4.4, 0.48, 0.22);
vase(1.2, 0.48, 4.2, 0.3, M.ceramic, true);
bookStack(3.0, 0.48, 4.2, 2, 7);
sph(3.0, 0.62, 4.2, 0.06, 0.06, 0.06, M.bronze);
// pictures over the sofa, plant by the dining side
art('x', 0.4, 1, 1.25, 2.1, 1.22, 2.06, 0);
art('x', 0.4, 1, 2.3, 3.15, 1.22, 2.06, 1);
plant(4.95, 0.85, 0.9, 'tree');
// living window: ivory sheers and taupe blackout curtains stacked beside the glass, full height
drapes('z', 0.4, 1, 1.12, 1.62, 0.04, 0.09, H - 0.13, M.sheer);
drapes('z', 0.4, 1, 3.18, 3.68, 0.04, 0.09, H - 0.13, M.sheer);
drapes('z', 0.4, 1, 0.7, 1.12, 0.1, 0.17, H - 0.13, M.taupe);
drapes('z', 0.4, 1, 3.68, 4.1, 0.1, 0.17, H - 0.13, M.taupe);

// ---- dining area
// rug and a walnut table for six, 2.0 x 1.0 with fully rounded ends, on two tapered pedestals with bronze feet
box(5.05, 7.85, 0, 0.014, 0.95, 3.45, M.rugDining, { cast: false });
box(5.95, 6.95, 0.72, 0.76, 1.7, 2.7, M.walnut);
[5.95, 6.95].forEach(x => cyl(x, 0.72, 0.76, 2.2, 0.5, M.walnut, { seg: 48 }));
[5.95, 6.95].forEach(x => {
  cyl(x, 0.03, 0.72, 2.2, 0.15, M.walnut, { rTop: 0.1, seg: 28 });
  cyl(x, 0, 0.03, 2.2, 0.2, M.bronze, { seg: 28 });
});
[5.8, 6.45, 7.1].forEach(x => {
  diningChair(x, 1.48, 's');
  diningChair(x, 2.92, 'n');
});
solid(5.45, 7.45, 1.24, 3.16, 0.9);
// travertine bowl, a vase with stems and two bronze candlesticks
(function () {
  const b = cyl(6.45, 0.76, 0.82, 2.2, 0.16, M.travertine, { rTop: 0.2, seg: 32 });
  b.scale.set(1.4, 1, 1);
})();
vase(6.0, 0.76, 2.2, 0.26, M.ceramic, true);
[6.85, 7.0].forEach((x, i) => {
  cyl(x, 0.76, 0.8 + i * 0.05, 2.2, 0.03, M.bronze, { rTop: 0.012 });
  cyl(x, 0.8 + i * 0.05, 0.95 + i * 0.05, 2.2, 0.011, M.paper, { cast: false });
});
// sculptural pendant over the table: an oval alabaster disc in a champagne-bronze ring, on two fine cables
(function () {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.014, 10, 64), M.bronze);
  ring.rotation.x = Math.PI / 2;
  ring.scale.set(1.35, 1, 1);
  ring.position.set(6.45, 1.66, 2.2);
  ring.castShadow = true;
  PARENT.add(ring);
  const disc = cyl(6.45, 1.6, 1.66, 2.2, 0.4, M.alabaster, { seg: 48, rTop: 0.36, cast: false });
  disc.scale.set(1.35, 1, 1);
  [5.95, 6.95].forEach(x => cyl(x, 1.66, H, 2.2, 0.003, M.bronze, { cast: false }));
  halo(6.45, 1.55, 2.2, 1.6);
})();
// slim walnut sideboard 35 cm deep on bronze legs, travertine top, fluted doors
box(5.6, 7.4, 0.16, 0.8, 4.05, 4.4, M.walnut);
box(5.58, 7.42, 0.8, 0.83, 4.03, 4.4, M.travertine);
legs(5.68, 7.32, 4.1, 4.35, 0.16, M.bronze, 0.012);
for (let x = 5.65; x < 7.38; x += 0.05) box(x - 0.003, x + 0.003, 0.2, 0.76, 4.045, 4.05, M.espresso, { cast: false });
[6.2, 6.8].forEach(x => box(x - 0.006, x + 0.006, 0.18, 0.78, 4.04, 4.05, M.espresso, { cast: false }));
[5.9, 6.5, 7.1].forEach(x => box(x - 0.05, x + 0.05, 0.58, 0.592, 4.03, 4.04, M.bronze, { cast: false }));
solid(5.6, 7.4, 4.03, 4.4, 0.83);
tableLamp(5.85, 0.83, 4.22, 1.15, M.ceramic);
vase(7.12, 0.83, 4.22, 0.3, M.ceramic, true);
bookStack(6.5, 0.83, 4.22, 3, 12);
art('x', 4.4, -1, 6.05, 6.95, 1.2, 2.05, 2);
plant(7.82, 0.82, 1.15, 'snake');
// dining window: ivory sheers stacked either side, from the hidden track in the ceiling band
drapes('x', 0.4, 1, 5.3, 5.82, 0.05, 0.1, H - 0.13, M.sheer);
drapes('x', 0.4, 1, 7.38, 7.9, 0.05, 0.1, H - 0.13, M.sheer);

// ---- lighting, all 2700-3000 K: recessed spots, two TV-wall washers, room fill
[
  [1.2, 2.0],
  [3.2, 2.0],
  [1.2, 3.4],
  [3.2, 3.4],
  [1.75, 4.05],
  [2.55, 4.05],
  [5.3, 3.9],
  [7.6, 3.9]
].forEach(p => downlight(p[0], p[1]));
fill(2.2, 2.3, 2.5, 0.5);
fill(6.45, 1.45, 2.2, 0.55);
