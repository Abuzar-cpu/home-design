/* ------------------------------------------------------- en-suite 3.0 x 2.0 */
// in the back corner, entered from the bedroom through a pocket door
floorPlane(.4, 3.4, .4, 2.4, .004, M.tile, 1.2);
tiled('z', .4, 1, .4, 2.4, [{ a0: .55, a1: .95, sill: 1.7, head: 2.1 }], M.tileWall, 1.2); tiled('z', 3.4, -1, .4, 2.4, [{ a0: 1.4, a1: 2.2, sill: 0, head: 2.1 }], M.tileWall, 1.2);
tiled('x', .4, 1, .4, 3.4, [], M.tileWall, 1.2); tiled('x', 2.4, -1, .4, 3.4, [], M.tileWall, 1.2);
// pocket door, slid almost fully into the wall toward the back
box(3.48, 3.52, .01, 2.065, .62, 1.52, M.door); box(3.465, 3.535, .95, 1.1, 1.49, 1.51, M.metalAccent, { cast: false });
// bath along the rear wall with a shower over it and a glass screen at the window end
soft(.45, 2.1, 0, .58, .43, 1.18, M.white, .2, { corner: .28 }); soft(.55, 2.0, .4, .585, .51, 1.1, M.ceramic, .15, { corner: .22, cast: false }); solid(.45, 2.1, .43, 1.18, .58);
box(1.39, 1.41, .58, .75, .43, .48, M.metalAccent, { cast: false }); box(1.33, 1.47, .74, .76, .43, .57, M.metalAccent, { cast: false });
box(.84, .96, 1.05, 1.2, .4, .43, M.metalAccent, { cast: false }); box(.89, .91, 2.1, 2.12, .4, .78, M.metalAccent, { cast: false }); cyl(.9, 2.06, 2.08, .8, .12, M.metalAccent, { cast: false });
box(.45, 1.25, .58, 2.0, 1.16, 1.18, M.glass, { cast: false, recv: false }); box(.45, 1.25, 2.0, 2.02, 1.155, 1.185, M.metalAccent, { cast: false });
soft(1.55, 1.9, .58, .62, .45, .7, M.towel, .015, { cast: false }); cyl(1.95, .58, .66, .5, .035, M.ceramicAlt, { cast: false });
// wall-hung WC on the rear wall, by the bedroom wall
box(2.45, 3.05, 0, 1.1, .4, .55, M.tileWall); soft(2.57, 2.93, .1, .43, .55, 1.1, M.white, .04); box(2.67, 2.83, .92, 1.04, .55, .56, M.steel, { cast: false }); solid(2.45, 3.05, .4, 1.1, 1.1);
cyl(2.55, 1.1, 1.2, .47, .03, M.paper, { cast: false }); vase(2.95, 1.1, .47, .14, M.ceramicAlt, true);
// double vanity with a lit mirror on the outside wall
box(.4, .88, .5, .82, 1.32, 2.38, M.woodA); box(.4, .9, .82, .85, 1.3, 2.4, M.counter); solid(.4, .9, 1.3, 2.4, .93, .5);
[1.58, 2.12].forEach(z => { soft(.5, .83, .85, .93, z - .18, z + .18, M.white, .03); cyl(.47, .85, 1.04, z, .011, M.metalAccent); box(.47, .59, 1.03, 1.045, z - .01, z + .01, M.metalAccent, { cast: false }); });
box(.408, .412, 1.08, 1.86, 1.33, 2.37, M.glow, { cast: false }); box(.412, .42, 1.1, 1.84, 1.36, 2.34, M.mirror, { cast: false }); halo(.5, 1.45, 1.85, 1.5);
cyl(.7, .85, .93, 1.85, .04, M.ceramic, { cast: false }); for (let i = 0; i < 6; i++) leaf(.7, .92, 1.85, i * 1.1, .6 + (i % 3) * .25, .1, .045, i % 2 ? M.plant : M.plantDark);
// towels on the partition, bath mat, extractor fan in the ceiling
box(1.4, 2.0, .9, .92, 2.36, 2.38, M.metalAccent, { cast: false }); box(1.4, 2.0, 1.3, 1.32, 2.36, 2.38, M.metalAccent, { cast: false }); soft(1.45, 1.95, .7, 1.32, 2.31, 2.36, M.towel, .02, { cast: false });
soft(1.05, 1.85, .004, .022, 1.25, 1.7, M.mat, .008, { cast: false });
box(2.3, 2.55, CY + H - .016, CY + H - .002, 1.85, 2.1, M.white, { parent: CEILG, cast: false }); box(2.33, 2.52, CY + H - .02, CY + H - .016, 1.88, 2.07, M.kick, { parent: CEILG, cast: false });
[[1.4, 1.5], [2.7, 1.7]].forEach(q => downlight(q[0], q[1])); fill(1.9, 2.3, 1.4, .5, 5);
