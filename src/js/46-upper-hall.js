/* ----------------------------------------------------- upper hall 1.4 x 6.9 */
box(3.92, 4.68, 0, .012, 6.2, 11.0, M.runner, { cast: false });
box(4.72, 5.0, .78, .81, 9.1, 10.3, M.woodB); legs(4.76, 4.96, 9.15, 10.25, .78, M.metal, .012); box(4.74, 4.98, .2, .22, 9.12, 10.28, M.woodB, { cast: false }); solid(4.72, 5.0, 9.1, 10.3, .81);
tableLamp(4.86, .81, 9.3, .95, M.ceramicAlt); vase(4.86, .81, 10.05, .22, M.ceramic, true); bookStack(4.86, .81, 9.68, 2, 95); cyl(4.86, .22, .44, 9.45, .1, M.woodB, { rTop: .12 }); cyl(4.86, .22, .44, 9.95, .1, M.woodB, { rTop: .12 });
art('z', 5.0, -1, 9.3, 10.1, 1.15, 1.95, 17); art('z', 3.6, 1, 7.35, 8.05, 1.2, 2.0, 18); art('z', 3.6, 1, 8.45, 9.15, 1.2, 2.0, 19);
(function () {      // baby gate across the top of the stairs: screw-fixed to the walls, opens into the hall (drawn closed, not a collider, so walks pass)
  const x = 5.1, z0 = 6.12, z1 = 7.28, W = M.white;
  box(x - .02, x + .02, .02, .8, z0, z0 + .04, W); box(x - .02, x + .02, .02, .8, z1 - .04, z1, W); box(x - .015, x + .015, .76, .8, z0, z1, W); box(x - .015, x + .015, .02, .06, z0, z1, W);
  for (let z = z0 + .1; z < z1 - .06; z += .075) box(x - .008, x + .008, .06, .76, z - .008, z + .008, W, { cast: false });
  box(x - .025, x + .025, .68, .76, (z0 + z1) / 2 - .05, (z0 + z1) / 2 + .05, M.metalAccent, { cast: false });
})();
plant(4.82, 11.15, .8, 'snake'); plant(4.82, 8.85, .75, 'bush');
[5.6, 7.6, 9.4, 11.0].forEach(z => downlight(4.3, z)); downlight(6.6, 5.9); fill(4.3, 2.3, 8.2, .5, 7);
PARENT = scene; YOFF = 0; CEILG = roof; CY = 0;

