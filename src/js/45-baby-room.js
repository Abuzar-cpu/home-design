/* ----------------------------------------------------- baby's room 3.0 x 2.9 */
// round rug
cyl(1.75, 0, 0.014, 7.3, 0.85, M.rugGuest, { seg: 48, cast: false });
(function () {
  // crib against the wardrobe wall, out of the window bay
  const x0 = 1.0,
    x1 = 2.3,
    z0 = 5.78,
    z1 = 6.48,
    W = M.paper,
    zc = (z0 + z1) / 2;
  [
    [x0, z0],
    [x1, z0],
    [x0, z1],
    [x1, z1]
  ].forEach(q => box(q[0] - 0.025, q[0] + 0.025, 0, 0.95, q[1] - 0.025, q[1] + 0.025, W));
  [
    [x0, x1, z0, z0],
    [x0, x1, z1, z1],
    [x0, x0, z0, z1],
    [x1, x1, z0, z1]
  ].forEach(e => {
    box(e[0] - 0.018, e[1] + 0.018, 0.9, 0.94, e[2] - 0.018, e[3] + 0.018, W);
    box(e[0] - 0.015, e[1] + 0.015, 0.3, 0.33, e[2] - 0.015, e[3] + 0.015, W, { cast: false });
    const n = Math.round((e[1] - e[0] + e[3] - e[2]) / 0.09);
    for (let i = 1; i < n; i++) {
      const t = i / n,
        x = e[0] + (e[1] - e[0]) * t,
        z = e[2] + (e[3] - e[2]) * t;
      box(x - 0.008, x + 0.008, 0.33, 0.9, z - 0.008, z + 0.008, W, { cast: false });
    }
  });
  box(x0, x1, 0.3, 0.34, z0, z1, W);
  soft(x0 + 0.03, x1 - 0.03, 0.34, 0.46, z0 + 0.03, z1 - 0.03, M.linen, 0.04);
  soft(x0 + 0.5, x1 - 0.06, 0.45, 0.5, z0 + 0.06, z1 - 0.06, M.accent2, 0.02);
  pillow(x0 + 0.2, 0.5, zc, 0.24, 0.08, 0.34, M.linen);
  // teddy bear
  sph(1.95, 0.56, zc, 0.07, 0.07, 0.07, M.woodB);
  sph(1.95, 0.65, zc, 0.05, 0.05, 0.05, M.woodB);
  sph(1.95, 0.7, zc - 0.04, 0.02, 0.02, 0.02, M.woodB, { cast: false });
  sph(1.95, 0.7, zc + 0.04, 0.02, 0.02, 0.02, M.woodB, { cast: false });
  // mobile hanging over the crib
  box(1.64, 1.66, 0.9, 1.75, z0 + 0.01, z0 + 0.03, W, { cast: false });
  box(1.64, 1.66, 1.74, 1.76, z0 + 0.01, zc + 0.05, W, { cast: false });
  [
    [1.55, zc - 0.05, M.accent1],
    [1.75, zc - 0.04, M.accent2],
    [1.65, zc + 0.16, M.accent3],
    [1.66, zc, M.ceramic]
  ].forEach((q, i) => {
    cyl(q[0], 1.5 - i * 0.04, 1.75, q[1], 0.002, M.kick, { cast: false });
    sph(q[0], 1.47 - i * 0.04, q[1], 0.04, 0.04, 0.04, q[2], { cast: false });
  });
  solid(x0 - 0.03, x1 + 0.03, z0 - 0.03, z1 + 0.03, 0.95);
})();
// changing dresser on the hall-side wall, clear of the door swing
box(2.9, 3.4, 0.1, 0.88, 7.3, 8.3, M.woodA);
box(2.88, 3.4, 0.88, 0.9, 7.28, 8.32, M.woodB);
legs(2.96, 3.34, 7.36, 8.24, 0.1, M.metal, 0.015);
[7.63, 7.97].forEach(z => box(2.895, 2.9, 0.12, 0.86, z - 0.002, z + 0.002, M.kick, { cast: false }));
[0.36, 0.62].forEach(y => box(2.895, 2.9, y, y + 0.004, 7.32, 8.28, M.kick, { cast: false }));
solid(2.88, 3.4, 7.28, 8.32, 0.9);
soft(2.94, 3.36, 0.9, 0.96, 7.35, 8.0, M.accent1, 0.025);
soft(2.94, 3.36, 0.9, 1.0, 7.35, 7.4, M.accent1, 0.02);
soft(2.94, 3.36, 0.9, 1.0, 7.95, 8.0, M.accent1, 0.02);
tableLamp(3.15, 0.9, 8.18, 0.85);
cyl(3.0, 0.9, 1.0, 8.15, 0.04, M.ceramic, { cast: false });
art('z', 3.4, -1, 7.5, 8.1, 1.3, 1.9, 13);
art('x', 8.6, -1, 1.9, 2.5, 1.3, 1.9, 14);
// nursing chair and footstool by the window
soft(0.5, 1.28, 0.14, 0.42, 7.75, 8.53, M.accent1, 0.05);
soft(0.5, 0.74, 0.36, 0.92, 7.75, 8.53, M.accent1, 0.06);
soft(0.72, 1.28, 0.36, 0.6, 7.75, 7.91, M.accent1, 0.045);
soft(0.72, 1.28, 0.36, 0.6, 8.37, 8.53, M.accent1, 0.045);
soft(0.74, 1.3, 0.42, 0.57, 7.92, 8.36, M.cushion, 0.05);
softX(0.88, 0.74, 8.14, 0.36, 0.32, 0.12, M.accent2, 0.22);
legs(0.56, 1.22, 7.81, 8.47, 0.14);
solid(0.5, 1.28, 7.75, 8.53, 0.9);
soft(1.5, 1.95, 0.04, 0.36, 7.91, 8.35, M.cushion, 0.08);
solid(1.5, 1.95, 7.91, 8.35, 0.42);
// toy blocks on the rug
[
  [1.7, 7.05, M.accent3],
  [1.95, 7.25, M.accent2],
  [1.78, 7.35, M.ceramic]
].forEach(q => box(q[0] - 0.06, q[0] + 0.06, 0.014, 0.134, q[1] - 0.06, q[1] + 0.06, q[2], { cast: false }));
box(1.86, 1.98, 0.134, 0.254, 7.13, 7.25, M.accent1, { cast: false });
// plant, curtains, ceiling lights and fill
plant(2.6, 8.35, 0.8, 'tree');
curtains('z', 0.4, 1, 6.4, 8.0, 5.72, 8.58);
[
  [1.9, 6.6],
  [1.9, 7.9]
].forEach(q => downlight(q[0], q[1]));
fill(1.9, 2.3, 7.2, 0.5, 6);

/* --------------------------------------------------- study / guest 3.0 x 2.7 */
box(0.95, 2.6, 0, 0.014, 9.55, 10.5, M.rugDining, { cast: false });
// desk on the baby's-room wall with a shelf above
box(0.45, 1.95, 0.72, 0.755, 8.82, 9.4, M.woodB);
legs(0.5, 1.9, 8.87, 9.35, 0.72, M.metal);
solid(0.45, 1.95, 8.8, 9.4, 0.76);
chair(1.2, 9.63, 'n');
solid(0.97, 1.43, 9.4, 9.86, 0.86);
tableLamp(0.62, 0.755, 9.0, 0.8, M.metal);
bookStack(1.3, 0.755, 9.02, 2, 34);
cyl(1.75, 0.755, 0.85, 9.0, 0.04, M.ceramic);
stems(1.75, 0.84, 9.0, 0.55, 4);
box(0.45, 1.95, 1.5, 1.525, 8.8, 9.04, M.woodA);
books(0.5, 1.2, 1.525, 8.84, 9.0, 35);
cyl(1.7, 1.525, 1.64, 8.92, 0.06, M.ceramicAlt, { rTop: 0.08 });
// low bookcase under the side window
box(0.41, 0.75, 0.04, 0.82, 9.55, 10.45, M.woodA);
[0.3, 0.56].forEach(y => box(0.42, 0.75, y, y + 0.02, 9.57, 10.43, M.paper, { cast: false }));
box(0.412, 0.752, 0, 0.04, 9.57, 10.43, M.kick, { cast: false });
solid(0.4, 0.76, 9.55, 10.45, 0.82);
books(0.45, 0.7, 0.82, 9.62, 10.05, 81, true);
cyl(0.58, 0.82, 1.0, 10.28, 0.06, M.ceramic, { rTop: 0.08 });
stems(0.58, 0.98, 10.28, 0.5, 4);
box(0.42, 0.47, 2.27, 2.35, 9.35, 11.05, M.curtain, { cast: false });
// daybed on the front wall for guests (0.9 x 1.9 m mattress)
box(0.45, 2.35, 0.12, 0.3, 10.55, 11.4, M.woodA);
legs(0.5, 2.3, 10.6, 11.35, 0.12, M.woodA, 0.025);
soft(0.5, 2.3, 0.28, 0.48, 10.57, 11.36, M.linen, 0.05);
soft(0.45, 2.35, 0.3, 0.85, 11.28, 11.4, M.woodA, 0.02);
soft(0.45, 0.57, 0.3, 0.68, 10.55, 11.28, M.woodA, 0.02);
soft(2.23, 2.35, 0.3, 0.68, 10.55, 11.28, M.woodA, 0.02);
pillow(0.95, 0.66, 11.16, 0.5, 0.36, 0.14, M.accent2, { rx: 0.3 });
pillow(1.85, 0.66, 11.16, 0.5, 0.36, 0.14, M.accent3, { rx: 0.3 });
pillow(1.4, 0.62, 11.12, 0.4, 0.3, 0.12, M.cushion, { rx: 0.3 });
soft(1.6, 2.2, 0.48, 0.52, 10.6, 11.2, M.accent1, 0.02);
solid(0.45, 2.35, 10.55, 11.4, 0.85);
curtains('x', 11.5, -1, 1.1, 2.7, 0.42, 3.38);
// ceiling lights and fill
[
  [1.9, 9.7],
  [1.9, 10.9]
].forEach(q => downlight(q[0], q[1]));
fill(1.9, 2.3, 10.1, 0.5, 6);
