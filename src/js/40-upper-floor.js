/* ============================================================ upper floor */
PARENT = upG; YOFF = 3.1; CEILG = roofTop; CY = 3.1;
wall('x', 0, .4, 0, 8.6, [win(5.8, 7.4, -1)]);
wall('x', 11.5, 11.9, 0, 8.6, [win(1.1, 2.7, 1), door(3.9, 4.7, 'a0', 1, { glass: true }), win(5.9, 7.5, 1)]);   // balcony door at the hall end
wall('z', 0, .4, .4, 11.5, [win(1.6, 3.2, -1), win(4.5, 5.1, -1, { sill: 1.3, head: 2.1, frost: true }), win(6.4, 8.0, -1)]);
wall('z', 8.2, 8.6, .4, 11.5, []);
wall('x', 4.4, 4.6, 3.6, 8.2, [door(3.8, 4.7, 'a0', -1)]);                                                       // bedroom / hall + stair
wall('z', 3.4, 3.6, .4, 11.5, [{ a0: 1.35, a1: 2.25, sill: 0, head: 2.1, kind: 'cased' }, door(9.8, 10.7, 'a1', -1)]);   // doorless bedroom-wardrobe opening, baby's door
wall('x', 3.5, 3.6, .4, 3.4, [door(1.6, 2.4, 'a0', 1)]);                                                          // wardrobe / en-suite partition
wall('x', 5.9, 6.1, .4, 3.4, []);                                                                                 // clothing / baby's room
wall('z', 5.0, 5.2, 7.3, 11.5, [door(7.7, 8.6, 'a0', 1)]);                                                       // hall / gaming room
wall('x', 7.3, 7.5, 5.2, 8.2, []);                                                                                // stair / gaming room
[[0, 8.6, 0, 4.6], [0, 5.2, 4.6, 7.3], [8.2, 8.6, 4.6, 7.3], [0, 8.6, 7.3, 11.9]].forEach(c => floorPlane(c[0], c[1], c[2], c[3], .002, M.floor, 2.4));
floorPlane(0, 8.6, 11.9, 13.6, .002, M.stoneFloor, 1.2);
box(5.175, 5.195, .05, .95, 4.6, 6.1, M.glass, { cast: false, recv: false }); box(5.16, 5.21, .95, .99, 4.6, 6.1, M.metal); solid(5.12, 5.22, 4.6, 6.1, 1.1);
// balcony
[[0, .4], [3.4, 3.6], [5.0, 5.2], [8.2, 8.6]].forEach(c => box(c[0], c[1], 0, H, 13.4, 13.6, M.wall, { solid: true }));
box(.4, 8.2, .05, .95, 13.49, 13.51, M.glass, { cast: false, recv: false }); box(.4, 8.2, .95, .99, 13.47, 13.53, M.metal);
[.05, 8.55].forEach(x => { box(x - .01, x + .01, .05, .95, 11.9, 13.4, M.glass, { cast: false, recv: false }); box(x - .03, x + .03, .95, .99, 11.9, 13.4, M.metal); });
solid(.4, 8.2, 13.42, 13.6, 1.0); solid(-.05, .1, 11.9, 13.6, 1.0); solid(8.5, 8.65, 11.9, 13.6, 1.0);
function lounge(x0, x1, z0, z1) { box(x0, x1, .22, .27, z0, z1, M.woodA); legs(x0 + .04, x1 - .04, z0 + .04, z1 - .04, .22, M.woodA, .025); box(x0, x1, .27, .72, z0, z0 + .05, M.woodA); box(x0, x0 + .05, .27, .5, z0 + .05, z1, M.woodA); box(x1 - .05, x1, .27, .5, z0 + .05, z1, M.woodA);
  soft(x0 + .05, x1 - .05, .27, .38, z0 + .06, z1, M.cushion, .04); soft(x0 + .06, x1 - .06, .36, .7, z0 + .05, z0 + .17, M.cushion, .05); pillow((x0 + x1) / 2, .52, z0 + .25, Math.min(.34, x1 - x0 - .2), .3, .11, M.accent1, { rx: -.3 }); }
lounge(.95, 1.62, 11.95, 12.65); lounge(2.08, 2.75, 11.95, 12.65); cyl(1.85, .4, .425, 12.3, .2, M.counter, { seg: 28 }); cyl(1.85, 0, .4, 12.3, .02, M.metal); cyl(1.85, 0, .02, 12.3, .13, M.metal); vase(1.85, .425, 12.3, .16, M.ceramicAlt, true); solid(.95, 2.75, 11.95, 12.65, .7);
lounge(5.7, 7.5, 11.95, 12.75); pillow(6.1, .52, 12.22, .34, .3, .11, M.accent2, { rx: -.3 }); pillow(7.1, .52, 12.22, .34, .3, .11, M.accent3, { rx: -.3 }); solid(5.7, 7.5, 11.95, 12.75, .7);
plant(.45, 12.25, 1.1, 'tree'); plant(8.12, 12.25, 1.0, 'snake'); plant(4.95, 12.2, .8, 'bush');
box(3.3, 3.52, 0, .34, 12.02, 12.24, M.metal); box(3.33, 3.49, .04, .3, 12.05, 12.21, M.glow, { cast: false }); halo(3.41, .2, 12.0, 1.1);

