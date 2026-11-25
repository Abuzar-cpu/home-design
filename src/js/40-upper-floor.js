/* ============================================================ upper floor */
useFloor(2); // everything until the upper hall is built on the upper floor
wall('x', 0, 0.4, 0, 8.6, [win(5.8, 7.4, -1)]);
wall('x', 11.5, 11.9, 0, 8.6, [win(1.1, 2.7, 1), door(3.9, 4.7, 'a0', 1, { glass: true }), win(5.9, 7.5, 1)]); // balcony door at the hall end
wall('z', 0, 0.4, 0.4, 11.5, [
  win(0.55, 0.95, -1, { sill: 1.7, head: 2.1, frost: true }),
  win(6.4, 8.0, -1),
  win(9.4, 11.0, -1)
]); // en-suite vent and the baby's room's two windows (the front one is a new opening, builder to confirm)
wall('z', 8.2, 8.6, 0.4, 11.5, []);
wall('x', 4.4, 4.6, 3.6, 8.2, [door(3.8, 4.7, 'a0', -1)]); // bedroom / hall + stair
wall('z', 3.4, 3.6, 0.4, 11.5, [
  { a0: 1.4, a1: 2.2, sill: 0, head: 2.1, kind: 'cased' },
  { a0: 2.7, a1: 3.5, sill: 0, head: 2.1, kind: 'cased' },
  door(6.4, 7.3, 'a1', -1)
]); // en-suite pocket door and doorless wardrobe opening off the bedroom; baby's room door off the hall
wall('x', 2.6, 2.7, 0.4, 3.4, []); // en-suite / walk-in wardrobe partition
wall('x', 6.1, 6.3, 0.4, 3.4, []); // walk-in wardrobe / baby's room
wall('z', 5.0, 5.2, 7.3, 11.5, [door(7.7, 8.6, 'a0', 1)]); // hall / gaming room
wall('x', 7.3, 7.5, 5.2, 8.2, []); // stair / gaming room
[
  [0, 8.6, 0, 4.6],
  [0, 5.2, 4.6, 7.3],
  [8.2, 8.6, 4.6, 7.3],
  [0, 8.6, 7.3, 11.9]
].forEach(c => floorPlane(c[0], c[1], c[2], c[3], 0.002, M.floor, 2.4));
floorPlane(0, 8.6, 11.9, 13.6, 0.002, M.stoneFloor, 1.2);
box(5.175, 5.195, 0.05, 0.95, 4.6, 6.1, M.glass, { cast: false, recv: false });
box(5.16, 5.21, 0.95, 0.99, 4.6, 6.1, M.metal);
solid(5.12, 5.22, 4.6, 6.1, 1.1);
// balcony
[
  [0, 0.4],
  [3.4, 3.6],
  [5.0, 5.2],
  [8.2, 8.6]
].forEach(c => box(c[0], c[1], 0, H, 13.4, 13.6, M.wall, { solid: true }));
box(0.4, 8.2, 0.05, 0.95, 13.49, 13.51, M.glass, { cast: false, recv: false });
box(0.4, 8.2, 0.95, 0.99, 13.47, 13.53, M.metal);
[0.05, 8.55].forEach(x => {
  box(x - 0.01, x + 0.01, 0.05, 0.95, 11.9, 13.4, M.glass, { cast: false, recv: false });
  box(x - 0.03, x + 0.03, 0.95, 0.99, 11.9, 13.4, M.metal);
});
solid(0.4, 8.2, 13.42, 13.6, 1.0);
solid(-0.05, 0.1, 11.9, 13.6, 1.0);
solid(8.5, 8.65, 11.9, 13.6, 1.0);
