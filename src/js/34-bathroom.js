/* ----------------------------------------------------- bathroom 1.6 x 2.7 */
tiled('x', 8.8, 1, .4, 2.0, [], M.tileWall, 1.2);
tiled('z', .4, 1, 8.8, 11.5, [{ a0: 9.2, a1: 9.8, sill: 1.3, head: 2.1 }], M.tileWall, 1.2);
tiled('z', 2.0, -1, 8.8, 11.5, [{ a0: 10.6, a1: 11.4, sill: 0, head: 2.1 }], M.tileWall, 1.2);
tiled('x', 11.5, -1, .4, 2.0, [], M.tileWall, 1.2);
box(.4, 1.35, .02, 2.0, 9.9, 9.91, M.glass, { cast: false, recv: false }); box(.4, 1.35, 2.0, 2.03, 9.89, 9.92, M.metalAccent, { cast: false }); solid(.4, 1.35, 9.86, 9.95, 2.0);
box(1.19, 1.21, 2.1, 2.12, 8.8, 9.2, M.metalAccent, { cast: false }); cyl(1.2, 2.06, 2.08, 9.25, .13, M.metalAccent, { cast: false }); box(1.15, 1.25, 1.05, 1.2, 8.8, 8.83, M.metalAccent, { cast: false });
cyl(1.2, .005, .008, 9.35, .05, M.steel, { cast: false });
// vanity on the left wall, wall-hung toilet beside it facing the room, towels on a rail outside the shower
box(.41, .86, .5, .82, 10.0, 10.68, M.woodA); box(.4, .87, .82, .85, 9.99, 10.69, M.counter); soft(.46, .82, .85, .93, 10.1, 10.56, M.white, .03);
cyl(.5, .85, 1.04, 10.33, .011, M.metalAccent); box(.5, .62, 1.03, 1.045, 10.32, 10.34, M.metalAccent, { cast: false }); solid(.4, .87, 10.0, 10.69, .93, .5);
cyl(.5, .85, .97, 10.04, .022, M.ceramicAlt, { cast: false }); cyl(.5, .85, .93, 10.62, .03, M.ceramic, { cast: false }); stems(.5, .92, 10.62, .35, 3);
box(.408, .412, 1.08, 1.82, 9.98, 10.7, M.glow, { cast: false }); box(.412, .42, 1.1, 1.8, 10.0, 10.68, M.mirror, { cast: false }); halo(.46, 1.45, 10.34, 1.3);
box(.4, .55, 0, 1.1, 10.85, 11.35, M.tileWall); soft(.55, 1.1, .1, .43, 10.92, 11.28, M.white, .04); box(.55, .56, .92, 1.04, 11.02, 11.18, M.steel, { cast: false }); solid(.4, 1.1, 10.88, 11.32, 1.1);
cyl(.47, 1.1, 1.2, 10.95, .03, M.paper, { cast: false }); cyl(.47, 1.1, 1.16, 11.24, .035, M.ceramicAlt, { cast: false });
box(1.97, 1.99, 1.2, 1.22, 9.98, 10.48, M.metalAccent, { cast: false }); soft(1.94, 1.99, .68, 1.22, 10.03, 10.43, M.towel, .02, { cast: false });
soft(1.38, 1.94, .004, .022, 9.97, 10.42, M.mat, .008, { cast: false });
cyl(.33, 1.325, 1.39, 9.5, .04, M.ceramic, { cast: false }); for (let i = 0; i < 6; i++) leaf(.33, 1.38, 9.5, i * 1.1, .7 + (i % 3) * .2, .11, .045, i % 2 ? M.plant : M.plantDark);
downlight(1.2, 9.4); downlight(1.3, 10.7); fill(1.25, 2.3, 10.2, .45, 5);

