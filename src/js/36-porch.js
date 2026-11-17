/* --------------------------------------------- porch 2.6 x 1.5, storage 2.5 x 1.5 */
// porch: plant by the lantern, bench under the full-length window (1.08 m left to walk past it)
plant(5.5, 12.12, .9, 'snake');
box(3.3, 4.5, .4, .45, 12.98, 13.38, M.woodA); legs(3.34, 4.46, 13.02, 13.34, .4, M.metal, .02); soft(3.32, 4.48, .45, .5, 13.0, 13.36, M.cushion, .02);
pillow(3.62, .62, 13.28, .34, .28, .1, M.accent1, { rx: .3 }); solid(3.3, 4.5, 12.98, 13.38, .5);
// storage: open shelving on the house wall and the side wall, reached from the porch
[.03, .5, 1.0, 1.5, 1.95].forEach(y => { box(.25, 2.05, y - .03, y, 11.92, 12.36, M.woodA); box(.2, .62, y - .03, y, 12.45, 13.35, M.woodA, { cast: false }); });
[.25, 1.14, 2.02].forEach(x => box(x, x + .03, 0, 1.98, 11.92, 12.36, M.woodA)); [12.45, 13.32].forEach(z => box(.2, .62, 0, 1.98, z, z + .03, M.woodA));
solid(.25, 2.05, 11.92, 12.36, 2.0); solid(.2, .62, 12.45, 13.35, 2.0);
[[.32, .7, .5, M.paper], [.75, 1.1, .5, M.kick], [1.2, 1.6, .5, M.paper], [.35, .8, 1.0, M.cushion], [1.25, 1.9, 1.0, M.paper], [.4, .95, 1.5, M.kick], [1.2, 1.55, 1.5, M.cushion]].forEach(q => box(q[0], q[1], q[2], q[2] + .28, 11.97, 12.33, q[3]));
[[12.55, 12.9, .5], [13.0, 13.28, 1.0]].forEach(q => box(.24, .58, q[2], q[2] + .26, q[0], q[1], M.paper));
box(5.08, 5.3, 0, .34, 12.02, 12.24, M.metal); box(5.11, 5.27, .04, .3, 12.05, 12.21, M.glow, { cast: false }); box(5.08, 5.3, .34, .37, 12.02, 12.24, M.metal, { cast: false }); halo(5.19, .2, 12.0, 1.1);
soft(3.75, 4.85, .002, .02, 12.0, 12.6, M.mat, .006, { cast: false });
[1.5, 4.3].forEach(x => { cyl(x, H - .036, H - .026, 12.7, .06, M.led, { parent: roof, cast: false }); halo(x, H - .06, 12.7, .5, roof); }); fill(4.3, 2.3, 12.6, .3, 5);


