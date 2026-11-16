/* ------------------------------------------------------- en-suite 3.0 x 2.3 */
floorPlane(.4, 3.4, 3.6, 5.9, .004, M.tile, 1.2);
tiled('z', .4, 1, 3.6, 5.9, [{ a0: 4.5, a1: 5.1, sill: 1.3, head: 2.1 }], M.tileWall, 1.2); tiled('z', 3.4, -1, 3.6, 5.9, [], M.tileWall, 1.2);
tiled('x', 5.9, -1, .4, 3.4, [], M.tileWall, 1.2); tiled('x', 3.6, 1, .4, 3.4, [{ a0: 1.6, a1: 2.4, sill: 0, head: 2.1 }], M.tileWall, 1.2);
// bath along the far wall
soft(.45, 2.05, 0, .58, 5.12, 5.87, M.white, .2, { corner: .28 }); soft(.55, 1.95, .4, .585, 5.2, 5.79, M.ceramic, .15, { corner: .22, cast: false }); solid(.45, 2.05, 5.12, 5.87, .58);
box(1.24, 1.26, .58, .75, 5.82, 5.87, M.metalAccent, { cast: false }); box(1.18, 1.32, .74, .76, 5.72, 5.87, M.metalAccent, { cast: false });
soft(.6, .95, .58, .62, 5.3, 5.55, M.towel, .015, { cast: false }); cyl(1.8, .58, .66, 5.7, .035, M.ceramicAlt, { cast: false });
// walk-in shower in the corner by the hall wall
box(2.25, 2.27, .02, 2.0, 5.25, 5.9, M.glass, { cast: false, recv: false }); box(2.24, 2.28, 2.0, 2.03, 5.25, 5.9, M.metalAccent, { cast: false }); solid(2.22, 2.3, 5.25, 5.9, 2.0);
box(2.84, 2.86, 2.1, 2.12, 5.5, 5.9, M.metalAccent, { cast: false }); cyl(2.85, 2.06, 2.08, 5.45, .14, M.metalAccent, { cast: false }); box(3.37, 3.4, 1.05, 1.2, 5.3, 5.4, M.metalAccent, { cast: false });
box(2.5, 3.2, .004, .008, 5.82, 5.86, M.steel, { cast: false }); box(3.28, 3.4, 1.1, 1.13, 5.5, 5.88, M.counter, { cast: false }); cyl(3.34, 1.13, 1.3, 5.6, .035, M.ceramicAlt, { cast: false }); cyl(3.34, 1.13, 1.26, 5.75, .03, M.ceramic, { cast: false });
// wall-hung toilet on the outside wall
box(.4, .55, 0, 1.1, 3.75, 4.35, M.tileWall); soft(.55, 1.1, .1, .43, 3.87, 4.23, M.white, .04); box(.55, .56, .92, 1.04, 3.97, 4.13, M.steel, { cast: false }); solid(.4, 1.1, 3.75, 4.35, 1.1);
cyl(.47, 1.1, 1.2, 3.85, .03, M.paper, { cast: false }); vase(.47, 1.1, 4.25, .14, M.ceramicAlt, true);
// double vanity with a lit mirror on the hall-side wall
box(2.92, 3.4, .5, .82, 3.65, 4.75, M.woodA); box(2.9, 3.4, .82, .85, 3.63, 4.77, M.counter); solid(2.9, 3.4, 3.63, 4.77, .93, .5);
[3.93, 4.47].forEach(z => { soft(2.97, 3.3, .85, .93, z - .18, z + .18, M.white, .03); cyl(3.33, .85, 1.04, z, .011, M.metalAccent); box(3.21, 3.33, 1.03, 1.045, z - .01, z + .01, M.metalAccent, { cast: false }); });
box(3.388, 3.392, 1.08, 1.86, 3.67, 4.73, M.glow, { cast: false }); box(3.38, 3.388, 1.1, 1.84, 3.7, 4.7, M.mirror, { cast: false }); halo(3.3, 1.45, 4.2, 1.5);
cyl(3.1, .85, .93, 4.2, .04, M.ceramic, { cast: false }); for (let i = 0; i < 6; i++) leaf(3.1, .92, 4.2, i * 1.1, .6 + (i % 3) * .25, .1, .045, i % 2 ? M.plant : M.plantDark);
// towels and mat
box(.62, 1.2, .9, .92, 3.62, 3.64, M.metalAccent, { cast: false }); box(.62, 1.2, 1.3, 1.32, 3.62, 3.64, M.metalAccent, { cast: false }); soft(.67, 1.15, .7, 1.32, 3.64, 3.69, M.towel, .02, { cast: false });
soft(.8, 1.6, .004, .022, 4.55, 5.02, M.mat, .008, { cast: false });
[[1.5, 4.4], [2.6, 5.2]].forEach(q => downlight(q[0], q[1])); fill(1.9, 2.3, 4.7, .5, 5);

