/* ------------------------------------------------------- en-suite 3.0 x 2.2 */
// in the back corner, entered from the bedroom through a pocket door
floorPlane(0.4, 3.4, 0.4, 2.6, 0.004, M.tile, 1.2);
tiled('z', 0.4, 1, 0.4, 2.6, [{ a0: 0.55, a1: 0.95, sill: 1.7, head: 2.1 }], M.tileWall, 1.2);
tiled('z', 3.4, -1, 0.4, 2.6, [{ a0: 1.4, a1: 2.2, sill: 0, head: 2.1 }], M.tileWall, 1.2);
tiled('x', 0.4, 1, 0.4, 3.4, [], M.tileWall, 1.2);
tiled('x', 2.6, -1, 0.4, 3.4, [], M.tileWall, 1.2);
// pocket door, slid almost fully into the wall toward the back
box(3.48, 3.52, 0.01, 2.065, 0.62, 1.52, M.door);
box(3.465, 3.535, 0.95, 1.1, 1.49, 1.51, M.metalAccent, { cast: false });
// bath along the rear wall with a shower over it and a glass screen at the window end
soft(0.45, 2.1, 0, 0.58, 0.43, 1.18, M.white, 0.2, { corner: 0.28 });
soft(0.55, 2.0, 0.4, 0.585, 0.51, 1.1, M.ceramic, 0.15, { corner: 0.22, cast: false });
solid(0.45, 2.1, 0.43, 1.18, 0.58);
box(1.39, 1.41, 0.58, 0.75, 0.43, 0.48, M.metalAccent, { cast: false });
box(1.33, 1.47, 0.74, 0.76, 0.43, 0.57, M.metalAccent, { cast: false });
box(0.84, 0.96, 1.05, 1.2, 0.4, 0.43, M.metalAccent, { cast: false });
box(0.89, 0.91, 2.1, 2.12, 0.4, 0.78, M.metalAccent, { cast: false });
cyl(0.9, 2.06, 2.08, 0.8, 0.12, M.metalAccent, { cast: false });
box(0.45, 1.25, 0.58, 2.0, 1.16, 1.18, M.glass, { cast: false, recv: false });
box(0.45, 1.25, 2.0, 2.02, 1.155, 1.185, M.metalAccent, { cast: false });
soft(1.55, 1.9, 0.58, 0.62, 0.45, 0.7, M.towel, 0.015, { cast: false });
cyl(1.95, 0.58, 0.66, 0.5, 0.035, M.ceramicAlt, { cast: false });
// wall-hung WC on the rear wall, by the bedroom wall
box(2.45, 3.05, 0, 1.1, 0.4, 0.55, M.tileWall);
soft(2.57, 2.93, 0.1, 0.43, 0.55, 1.1, M.white, 0.04);
box(2.67, 2.83, 0.92, 1.04, 0.55, 0.56, M.steel, { cast: false });
solid(2.45, 3.05, 0.4, 1.1, 1.1);
cyl(2.55, 1.1, 1.2, 0.47, 0.03, M.paper, { cast: false });
vase(2.95, 1.1, 0.47, 0.14, M.ceramicAlt, true);
// double vanity with a lit mirror on the outside wall
box(0.4, 0.88, 0.5, 0.82, 1.32, 2.38, M.woodA);
box(0.4, 0.9, 0.82, 0.85, 1.3, 2.4, M.counter);
solid(0.4, 0.9, 1.3, 2.4, 0.93, 0.5);
[1.58, 2.12].forEach(z => {
  soft(0.5, 0.83, 0.85, 0.93, z - 0.18, z + 0.18, M.white, 0.03);
  cyl(0.47, 0.85, 1.04, z, 0.011, M.metalAccent);
  box(0.47, 0.59, 1.03, 1.045, z - 0.01, z + 0.01, M.metalAccent, { cast: false });
});
box(0.408, 0.412, 1.08, 1.86, 1.33, 2.37, M.glow, { cast: false });
box(0.412, 0.42, 1.1, 1.84, 1.36, 2.34, M.mirror, { cast: false });
halo(0.5, 1.45, 1.85, 1.5);
cyl(0.7, 0.85, 0.93, 1.85, 0.04, M.ceramic, { cast: false });
for (let i = 0; i < 6; i++)
  leaf(0.7, 0.92, 1.85, i * 1.1, 0.6 + (i % 3) * 0.25, 0.1, 0.045, i % 2 ? M.plant : M.plantDark);
// towels on the partition, bath mat, extractor fan in the ceiling
box(1.4, 2.0, 0.9, 0.92, 2.56, 2.58, M.metalAccent, { cast: false });
box(1.4, 2.0, 1.3, 1.32, 2.56, 2.58, M.metalAccent, { cast: false });
soft(1.45, 1.95, 0.7, 1.32, 2.51, 2.56, M.towel, 0.02, { cast: false });
soft(1.05, 1.85, 0.004, 0.022, 1.25, 1.7, M.mat, 0.008, { cast: false });
box(2.3, 2.55, CY + H - 0.016, CY + H - 0.002, 1.85, 2.1, M.white, { parent: CEILG, cast: false });
box(2.33, 2.52, CY + H - 0.02, CY + H - 0.016, 1.88, 2.07, M.kick, { parent: CEILG, cast: false });
// ceiling lights and fill
[
  [1.4, 1.5],
  [2.7, 1.7]
].forEach(q => downlight(q[0], q[1]));
fill(1.9, 2.3, 1.4, 0.5, 5);
