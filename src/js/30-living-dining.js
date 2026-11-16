/* ----------------------------------------------- living + dining 7.8 x 4.0 */
box(.7, 3.75, 0, .014, 1.1, 3.8, M.rugLiving, { cast: false });
// L-shaped sofa: 3.65 m along the back wall with a short chaise end on the dining side
soft(.55, 4.2, .13, .44, .46, 1.42, M.sofa, .04); soft(3.24, 4.2, .13, .44, 1.4, 2.05, M.sofa, .04);
soft(.55, 4.2, .36, .9, .46, .74, M.sofa, .05); soft(3.92, 4.2, .36, .9, .7, 2.05, M.sofa, .05); soft(.55, .79, .36, .68, .52, 1.42, M.sofa, .05);
[[.8, 1.61], [1.615, 2.425], [2.43, 3.24], [3.24, 3.91]].forEach(s => soft(s[0], s[1], .42, .6, .76, 1.44, M.cushion, .05)); soft(3.24, 3.91, .42, .6, 1.445, 2.04, M.cushion, .05);
[[.81, 1.6], [1.625, 2.415], [2.44, 3.23], [3.25, 3.7]].forEach(s => soft(s[0], s[1], .6, .98, .7, .9, M.cushion, .07, { rx: -.1 })); [[.92, 1.48], [1.49, 2.03]].forEach(z => soft(3.72, 3.92, .6, .98, z[0], z[1], M.cushion, .07, { rz: -.1 }));
pillow(1.05, .8, 1.02, .44, .42, .14, M.accent1, { rx: -.3 }); pillow(1.37, .78, 1.06, .36, .36, .12, M.accent2, { rx: -.32, ry: .25 });
pillow(2.9, .76, 1.08, .5, .26, .12, M.accent3, { rx: -.35 }); soft(3.58, 3.72, .59, 1.01, 1.5, 1.94, M.accent2, .066, { corner: .07, rz: -.3 });
soft(3.3, 3.85, .6, .625, 1.72, 2.05, M.accent3, .012, { cast: false }); soft(3.32, 3.83, .3, .62, 2.05, 2.08, M.accent3, .01, { cast: false });
legs(.61, 4.14, .52, 1.36, .13); legs(3.3, 4.14, 1.5, 1.99, .13); solid(.55, 4.2, .45, 1.42, .86); solid(3.24, 4.2, 1.42, 2.05, .86);
// side table at the end of the L
cyl(3.72, .5, .525, 2.3, .2, M.woodB, { seg: 28 }); cyl(3.72, .02, .5, 2.3, .014, M.metal); cyl(3.72, 0, .02, 2.3, .13, M.metal); vase(3.72, .525, 2.3, .2, M.ceramicAlt, true); solid(3.54, 3.9, 2.12, 2.48, .55);
floorLamp(4.45, .7);
// coffee table, one per style, with the same styling on top
box(1.4, 2.6, .34, .42, 1.9, 2.5, M.counter, { parent: SG.modern }); box(1.52, 2.48, 0, .34, 2.0, 2.4, M.woodA, { parent: SG.modern });
cyl(1.96, .385, .42, 2.2, .44, M.woodA, { parent: SG.scandi, seg: 36 }); [[1.71, 2.0], [2.21, 2.05], [1.96, 2.47]].forEach(q => cyl(q[0], 0, .385, q[1], .016, M.woodA, { parent: SG.scandi, cast: false }));
cyl(2.11, .3, .33, 2.62, .24, M.woodB, { parent: SG.scandi, seg: 28 }); [[1.97, 2.56], [2.23, 2.52], [2.13, 2.76]].forEach(q => cyl(q[0], 0, .3, q[1], .013, M.woodB, { parent: SG.scandi, cast: false }));
cyl(2.0, .385, .42, 2.2, .5, M.counter, { parent: SG.lux, seg: 44 }); [[1.7, 1.95], [2.3, 1.95], [2.0, 2.53]].forEach(q => cyl(q[0], 0, .385, q[1], .014, M.metal, { parent: SG.lux, cast: false }));
(function () { const t = new THREE.Mesh(new THREE.TorusGeometry(.34, .012, 8, 40), M.metal); t.rotation.x = Math.PI / 2; t.position.set(2.0, .1, 2.2); SG.lux.add(t); })();
box(1.4, 2.6, .375, .42, 1.9, 2.5, M.woodB, { parent: SG.loft }); box(1.46, 2.54, .1, .125, 1.96, 2.44, M.woodA, { parent: SG.loft, cast: false }); [[1.43, 1.93], [2.57, 1.93], [1.43, 2.47], [2.57, 2.47]].forEach(q => box(q[0] - .02, q[0] + .02, 0, .375, q[1] - .02, q[1] + .02, M.metal, { parent: SG.loft, cast: false }));
solid(1.4, 2.6, 1.9, 2.5, .42);
box(2.01, 2.31, .42, .432, 2.07, 2.33, M.metalAccent, { cast: false }); cyl(2.08, .432, .52, 2.15, .035, M.paper, { cast: false }); cyl(2.08, .52, .535, 2.15, .003, M.kick, { cast: false });
vase(2.22, .432, 2.25, .16, M.ceramicAlt, true); bookStack(1.78, .42, 2.19, 3, 4);
// media wall
tiled('x', 4.4, -1, .4, 3.04, [], M.slat, .6);
box(.8, 3.0, .18, .55, 4.0, 4.385, M.woodA); solid(.8, 3.0, 4.0, 4.4, .55);
[1.53, 2.27].forEach(x => box(x - .002, x + .002, .2, .53, 3.995, 4.0, M.kick, { cast: false }));
box(1.2, 2.6, .88, 1.68, 4.34, 4.372, M.screen); box(1.75, 2.05, .55, .6, 4.2, 4.33, M.kick, { cast: false });
vase(1.0, .55, 4.2, .26, M.ceramic, true); bookStack(2.78, .55, 4.2, 3, 7); cyl(2.78, .646, .72, 4.2, .05, M.ceramicAlt, { rTop: .03 });
// glass display cabinet beside the TV unit: dark frame, glass doors and shelves, lit from inside
(function () {
  const x0 = 3.08, x1 = 3.53, z0 = 3.99, z1 = 4.39, f = .025, H = 2.25;
  box(x0 + .02, x1 - .02, 0, .08, z0 + .03, z1, M.kick, { cast: false }); box(x0 + f, x1 - f, .08, H - f, z1 - .015, z1, M.mirror, { cast: false });
  [[x0, x0 + f, z0, z0 + f], [x1 - f, x1, z0, z0 + f], [x0, x0 + f, z1 - f, z1], [x1 - f, x1, z1 - f, z1]].forEach(q => box(q[0], q[1], .08, H, q[2], q[3], M.metal));
  [.08, 1.6, H - f].forEach(y => { box(x0, x1, y, y + f, z0, z0 + f, M.metal, { cast: false }); [x0, x1 - f].forEach(x => box(x, x + f, y, y + f, z0, z1, M.metal, { cast: false })); });
  box(x0, x1, H - f, H, z0, z1, M.metal);
  [[.08 + f, 1.6], [1.6 + f, H - f]].forEach(d => box(x0 + f, x1 - f, d[0], d[1], z0 + .008, z0 + .014, M.glass, { cast: false, recv: false }));
  [x0 + .009, x1 - .009].forEach(x => box(x - .003, x + .003, .08 + f, H - f, z0 + f, z1 - f, M.glass, { cast: false, recv: false }));
  [[1.18, 1.52], [1.68, 2.0]].forEach(h => box(x1 - .075, x1 - .065, h[0], h[1], z0 - .018, z0 - .008, M.metalAccent, { cast: false }));
  [.55, .97, 1.39, 1.82].forEach(y => { box(x0 + f, x1 - f, y, y + .01, z0 + f, z1 - .015, M.glass, { cast: false, recv: false }); box(x0 + f, x1 - f, y - .006, y, z0 + f, z0 + f + .012, M.led, { cast: false }); });
  [x0 + f, x1 - f - .006].forEach(x => box(x, x + .006, .12, H - .04, z0 + f, z0 + f + .012, M.led, { cast: false }));
  vase(3.2, .105, 4.2, .3, M.ceramicAlt); cyl(3.41, .105, .27, 4.22, .05, M.glassObj, { cast: false });
  [3.17, 3.25].forEach(x => cyl(x, .56, .72, 4.16, .028, M.glassObj, { cast: false })); cyl(3.42, .56, .64, 4.2, .07, M.ceramic, { rTop: .05, cast: false });
  bookStack(3.3, .98, 4.2, 2, 120);
  cyl(3.2, 1.40, 1.66, 4.2, .042, M.glassObj, { rTop: .02, cast: false }); vase(3.42, 1.40, 4.2, .2, M.ceramic);
  vase(3.3, 1.83, 4.2, .24, M.ceramicAlt); cyl(3.15, 1.83, 1.93, 4.16, .045, M.metalAccent, { cast: false });
  solid(x0, x1, z0, z1, H);
})();
art('x', .4, 1, 1.25, 2.1, 1.22, 2.06, 0); art('x', .4, 1, 2.3, 3.15, 1.22, 2.06, 1);
plant(4.95, .85, .9, 'tree'); curtains('z', .4, 1, 1.6, 3.2);
// dining
box(5.0, 7.8, 0, .014, 1.25, 3.35, M.rugDining, { cast: false });
soft(5.5, 7.3, .715, .76, 1.85, 2.75, M.woodB, .012, { corner: .03 }); [[5.6, 1.95], [7.2, 1.95], [5.6, 2.65], [7.2, 2.65]].forEach(q => box(q[0] - .035, q[0] + .035, 0, .72, q[1] - .035, q[1] + .035, M.woodB));
[5.8, 6.4, 7.0].forEach(x => { chair(x, 1.62, 's'); chair(x, 2.98, 'n'); placeSetting(x, 2.06, -1); placeSetting(x, 2.54, 1); });
solid(5.5, 7.3, 1.4, 3.2, .86);
soft(5.65, 7.15, .76, .766, 2.24, 2.36, M.curtain, .003, { cast: false }); vase(6.4, .766, 2.3, .24, M.ceramic, true);
[6.12, 6.68].forEach(x => { cyl(x, .766, .86, 2.3, .028, M.metalAccent, { rTop: .012 }); cyl(x, .86, 1.0, 2.3, .011, M.paper, { cast: false }); });
// pendants, one design per style
box(5.7, 7.1, 1.55, 1.6, 2.27, 2.33, M.metal, { parent: SG.modern }); box(5.72, 7.08, 1.542, 1.55, 2.28, 2.32, M.led, { parent: SG.modern, cast: false });
[5.9, 6.9].forEach(x => cyl(x, 1.6, H, 2.3, .004, M.metal, { parent: SG.modern, cast: false })); [5.95, 6.4, 6.85].forEach(x => halo(x, 1.52, 2.3, .8, SG.modern));
[5.95, 6.85].forEach(x => { cyl(x, 1.5, 1.74, 2.3, .22, M.ceramic, { parent: SG.scandi, rTop: .05, seg: 28 }); cyl(x, 1.488, 1.5, 2.3, .19, M.glow, { parent: SG.scandi, cast: false }); cyl(x, 1.74, H, 2.3, .005, M.metal, { parent: SG.scandi, cast: false }); halo(x, 1.5, 2.3, 1.2, SG.scandi); });
[[5.9, 1.62], [6.4, 1.48], [6.9, 1.7]].forEach(q => { sph(q[0], q[1], 2.3, .12, .12, .12, M.glow, { parent: SG.lux, cast: false }); cyl(q[0], q[1] + .1, q[1] + .16, 2.3, .035, M.metal, { parent: SG.lux, cast: false }); cyl(q[0], q[1] + .16, H, 2.3, .004, M.metal, { parent: SG.lux, cast: false }); halo(q[0], q[1], 2.3, .95, SG.lux); });
[[5.85, 1.62], [6.4, 1.5], [6.95, 1.62]].forEach(q => { sph(q[0], q[1], 2.3, .055, .075, .055, M.glow, { parent: SG.loft, cast: false }); cyl(q[0], q[1] + .06, q[1] + .14, 2.3, .028, M.metal, { parent: SG.loft, cast: false }); cyl(q[0], q[1] + .14, H, 2.3, .004, M.metal, { parent: SG.loft, cast: false });
  const cage = new THREE.Mesh(new THREE.SphereGeometry(.13, 8, 6), new THREE.MeshBasicMaterial({ color: 0x18191b, wireframe: true })); cage.position.set(q[0], q[1], 2.3); SG.loft.add(cage); halo(q[0], q[1], 2.3, .9, SG.loft); });
// sideboard
box(5.6, 7.4, .16, .8, 4.0, 4.385, M.woodA); box(5.58, 7.42, .8, .83, 3.98, 4.39, M.counter); legs(5.68, 7.32, 4.06, 4.33, .16, M.metal, .015); solid(5.6, 7.4, 4.0, 4.4, .83);
[6.2, 6.8].forEach(x => box(x - .002, x + .002, .18, .78, 3.995, 4.0, M.kick, { cast: false })); [5.9, 6.5, 7.1].forEach(x => box(x - .05, x + .05, .58, .592, 3.98, 4.0, M.metalAccent, { cast: false }));
tableLamp(5.85, .83, 4.2, 1.15, M.ceramicAlt); vase(7.12, .83, 4.2, .3, M.ceramic, true); bookStack(6.5, .83, 4.2, 3, 12); cyl(6.5, .926, .96, 4.2, .09, M.ceramicAlt, { rTop: .12 });
art('x', 4.4, -1, 6.05, 6.95, 1.2, 2.05, 2);
plant(7.82, .82, 1.15, 'snake'); curtains('x', .4, 1, 5.8, 7.4);
[[1.6, 1.5], [1.6, 3.3], [4.3, 2.4], [6.4, 3.6], [7.6, .9]].forEach(p => downlight(p[0], p[1]));
fill(2.4, 2.3, 2.6, .5); fill(6.4, 1.45, 2.3, .55);

