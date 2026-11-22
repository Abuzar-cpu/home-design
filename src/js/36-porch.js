/* --------------------------------------------- porch 2.6 x 1.5, storage 2.5 x 1.5 */
// porch: plant by the lantern, bench under the full-length window (1.08 m left to walk past it)
plant(5.5, 12.12, 0.9, 'snake');
box(3.3, 4.5, 0.4, 0.45, 12.98, 13.38, M.woodA);
legs(3.34, 4.46, 13.02, 13.34, 0.4, M.metal, 0.02);
soft(3.32, 4.48, 0.45, 0.5, 13.0, 13.36, M.cushion, 0.02);
pillow(3.62, 0.62, 13.28, 0.34, 0.28, 0.1, M.accent1, { rx: 0.3 });
solid(3.3, 4.5, 12.98, 13.38, 0.5);
// storage: open shelving on the house wall and the side wall, reached from the porch
[0.03, 0.5, 1.0, 1.5, 1.95].forEach(y => {
  box(0.25, 2.05, y - 0.03, y, 11.92, 12.36, M.woodA);
  box(0.2, 0.62, y - 0.03, y, 12.45, 13.35, M.woodA, { cast: false });
});
[0.25, 1.14, 2.02].forEach(x => box(x, x + 0.03, 0, 1.98, 11.92, 12.36, M.woodA));
[12.45, 13.32].forEach(z => box(0.2, 0.62, 0, 1.98, z, z + 0.03, M.woodA));
solid(0.25, 2.05, 11.92, 12.36, 2.0);
solid(0.2, 0.62, 12.45, 13.35, 2.0);
// boxes and baskets on the shelves
[
  [0.32, 0.7, 0.5, M.paper],
  [0.75, 1.1, 0.5, M.kick],
  [1.2, 1.6, 0.5, M.paper],
  [0.35, 0.8, 1.0, M.cushion],
  [1.25, 1.9, 1.0, M.paper],
  [0.4, 0.95, 1.5, M.kick],
  [1.2, 1.55, 1.5, M.cushion]
].forEach(q => box(q[0], q[1], q[2], q[2] + 0.28, 11.97, 12.33, q[3]));
[
  [12.55, 12.9, 0.5],
  [13.0, 13.28, 1.0]
].forEach(q => box(0.24, 0.58, q[2], q[2] + 0.26, q[0], q[1], M.paper));
// floor lantern by the steps
box(5.08, 5.3, 0, 0.34, 12.02, 12.24, M.metal);
box(5.11, 5.27, 0.04, 0.3, 12.05, 12.21, M.glow, { cast: false });
box(5.08, 5.3, 0.34, 0.37, 12.02, 12.24, M.metal, { cast: false });
halo(5.19, 0.2, 12.0, 1.1);
// door mat
soft(3.75, 4.85, 0.002, 0.02, 12.0, 12.6, M.mat, 0.006, { cast: false });
// porch ceiling lights and fill
[1.5, 4.3].forEach(x => {
  cyl(x, H - 0.036, H - 0.026, 12.7, 0.06, M.led, { parent: roof, cast: false });
  halo(x, H - 0.06, 12.7, 0.5, roof);
});
fill(4.3, 2.3, 12.6, 0.3, 5);
