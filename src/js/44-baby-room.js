/* ----------------------------------------------------- baby's room 3.0 x 2.9 */
cyl(1.75, 0, .014, 7.3, .85, M.rugGuest, { seg: 48, cast: false });
(function () {      // crib against the wardrobe wall, out of the window bay
  const x0 = 1.0, x1 = 2.3, z0 = 5.78, z1 = 6.48, W = M.paper, zc = (z0 + z1) / 2;
  [[x0, z0], [x1, z0], [x0, z1], [x1, z1]].forEach(q => box(q[0] - .025, q[0] + .025, 0, .95, q[1] - .025, q[1] + .025, W));
  [[x0, x1, z0, z0], [x0, x1, z1, z1], [x0, x0, z0, z1], [x1, x1, z0, z1]].forEach(e => { box(e[0] - .018, e[1] + .018, .9, .94, e[2] - .018, e[3] + .018, W); box(e[0] - .015, e[1] + .015, .3, .33, e[2] - .015, e[3] + .015, W, { cast: false });
    const n = Math.round((e[1] - e[0] + e[3] - e[2]) / .09); for (let i = 1; i < n; i++) { const t = i / n, x = e[0] + (e[1] - e[0]) * t, z = e[2] + (e[3] - e[2]) * t; box(x - .008, x + .008, .33, .9, z - .008, z + .008, W, { cast: false }); } });
  box(x0, x1, .3, .34, z0, z1, W); soft(x0 + .03, x1 - .03, .34, .46, z0 + .03, z1 - .03, M.linen, .04); soft(x0 + .5, x1 - .06, .45, .5, z0 + .06, z1 - .06, M.accent2, .02); pillow(x0 + .2, .5, zc, .24, .08, .34, M.linen);
  sph(1.95, .56, zc, .07, .07, .07, M.woodB); sph(1.95, .65, zc, .05, .05, .05, M.woodB); sph(1.95, .7, zc - .04, .02, .02, .02, M.woodB, { cast: false }); sph(1.95, .7, zc + .04, .02, .02, .02, M.woodB, { cast: false });
  box(1.64, 1.66, .9, 1.75, z0 + .01, z0 + .03, W, { cast: false }); box(1.64, 1.66, 1.74, 1.76, z0 + .01, zc + .05, W, { cast: false });
  [[1.55, zc - .05, M.accent1], [1.75, zc - .04, M.accent2], [1.65, zc + .16, M.accent3], [1.66, zc, M.ceramic]].forEach((q, i) => { cyl(q[0], 1.5 - i * .04, 1.75, q[1], .002, M.kick, { cast: false }); sph(q[0], 1.47 - i * .04, q[1], .04, .04, .04, q[2], { cast: false }); });
  solid(x0 - .03, x1 + .03, z0 - .03, z1 + .03, .95);
})();
// changing dresser on the hall-side wall, clear of the door swing
box(2.9, 3.4, .1, .88, 7.3, 8.3, M.woodA); box(2.88, 3.4, .88, .9, 7.28, 8.32, M.woodB); legs(2.96, 3.34, 7.36, 8.24, .1, M.metal, .015);
[7.63, 7.97].forEach(z => box(2.895, 2.9, .12, .86, z - .002, z + .002, M.kick, { cast: false })); [.36, .62].forEach(y => box(2.895, 2.9, y, y + .004, 7.32, 8.28, M.kick, { cast: false })); solid(2.88, 3.4, 7.28, 8.32, .9);
soft(2.94, 3.36, .9, .96, 7.35, 8.0, M.accent1, .025); soft(2.94, 3.36, .9, 1.0, 7.35, 7.4, M.accent1, .02); soft(2.94, 3.36, .9, 1.0, 7.95, 8.0, M.accent1, .02); tableLamp(3.15, .9, 8.18, .85); cyl(3.0, .9, 1.0, 8.15, .04, M.ceramic, { cast: false });
art('z', 3.4, -1, 7.5, 8.1, 1.3, 1.9, 13); art('x', 8.6, -1, 1.9, 2.5, 1.3, 1.9, 14);
// nursing chair and footstool by the window
soft(.5, 1.28, .14, .42, 7.75, 8.53, M.accent1, .05); soft(.5, .74, .36, .92, 7.75, 8.53, M.accent1, .06); soft(.72, 1.28, .36, .6, 7.75, 7.91, M.accent1, .045); soft(.72, 1.28, .36, .6, 8.37, 8.53, M.accent1, .045); soft(.74, 1.3, .42, .57, 7.92, 8.36, M.cushion, .05); softX(.88, .74, 8.14, .36, .32, .12, M.accent2, .22); legs(.56, 1.22, 7.81, 8.47, .14); solid(.5, 1.28, 7.75, 8.53, .9);
soft(1.5, 1.95, .04, .36, 7.91, 8.35, M.cushion, .08); solid(1.5, 1.95, 7.91, 8.35, .42);
[[1.7, 7.05, M.accent3], [1.95, 7.25, M.accent2], [1.78, 7.35, M.ceramic]].forEach(q => box(q[0] - .06, q[0] + .06, .014, .134, q[1] - .06, q[1] + .06, q[2], { cast: false })); box(1.86, 1.98, .134, .254, 7.13, 7.25, M.accent1, { cast: false });
plant(2.6, 8.35, .8, 'tree'); curtains('z', .4, 1, 6.4, 8.0, 5.72, 8.58);
[[1.9, 6.6], [1.9, 7.9]].forEach(q => downlight(q[0], q[1])); fill(1.9, 2.3, 7.2, .5, 6);

/* --------------------------------------------------- study / guest 3.0 x 2.7 */
box(.95, 2.6, 0, .014, 9.55, 10.5, M.rugDining, { cast: false });
// desk on the baby's-room wall with a shelf above
box(.45, 1.95, .72, .755, 8.82, 9.4, M.woodB); legs(.5, 1.9, 8.87, 9.35, .72, M.metal); solid(.45, 1.95, 8.8, 9.4, .76);
chair(1.2, 9.63, 'n'); solid(.97, 1.43, 9.4, 9.86, .86);
tableLamp(.62, .755, 9.0, .8, M.metal); bookStack(1.3, .755, 9.02, 2, 34); cyl(1.75, .755, .85, 9.0, .04, M.ceramic); stems(1.75, .84, 9.0, .55, 4);
box(.45, 1.95, 1.5, 1.525, 8.8, 9.04, M.woodA); books(.5, 1.2, 1.525, 8.84, 9.0, 35); cyl(1.7, 1.525, 1.64, 8.92, .06, M.ceramicAlt, { rTop: .08 });
// low bookcase under the side window
box(.41, .75, .04, .82, 9.55, 10.45, M.woodA); [.3, .56].forEach(y => box(.42, .75, y, y + .02, 9.57, 10.43, M.paper, { cast: false })); box(.412, .752, 0, .04, 9.57, 10.43, M.kick, { cast: false }); solid(.4, .76, 9.55, 10.45, .82);
books(.45, .7, .82, 9.62, 10.05, 81, true); cyl(.58, .82, 1.0, 10.28, .06, M.ceramic, { rTop: .08 }); stems(.58, .98, 10.28, .5, 4);
box(.42, .47, 2.27, 2.35, 9.35, 11.05, M.curtain, { cast: false });
// daybed on the front wall for guests (0.9 x 1.9 m mattress)
box(.45, 2.35, .12, .3, 10.55, 11.4, M.woodA); legs(.5, 2.3, 10.6, 11.35, .12, M.woodA, .025);
soft(.5, 2.3, .28, .48, 10.57, 11.36, M.linen, .05); soft(.45, 2.35, .3, .85, 11.28, 11.4, M.woodA, .02); soft(.45, .57, .3, .68, 10.55, 11.28, M.woodA, .02); soft(2.23, 2.35, .3, .68, 10.55, 11.28, M.woodA, .02);
pillow(.95, .66, 11.16, .5, .36, .14, M.accent2, { rx: .3 }); pillow(1.85, .66, 11.16, .5, .36, .14, M.accent3, { rx: .3 }); pillow(1.4, .62, 11.12, .4, .3, .12, M.cushion, { rx: .3 });
soft(1.6, 2.2, .48, .52, 10.6, 11.2, M.accent1, .02); solid(.45, 2.35, 10.55, 11.4, .85);
curtains('x', 11.5, -1, 1.1, 2.7, .42, 3.38);
[[1.9, 9.7], [1.9, 10.9]].forEach(q => downlight(q[0], q[1])); fill(1.9, 2.3, 10.1, .5, 6);
