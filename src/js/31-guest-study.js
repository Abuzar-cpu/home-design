/* ------------------------------------------------- guest / study 3.0 x 4.0 */
box(.9, 2.9, 0, .014, 6.0, 8.0, M.rugGuest, { cast: false });
// two single beds, heads on the bathroom-side wall, one shared nightstand between them
[[.55, M.accent1], [2.35, M.accent2]].forEach(q => { const x = q[0], c = x + .45;
  box(x + .03, x + .87, .12, .3, 6.5, 8.5, M.woodA); legs(x + .08, x + .82, 6.55, 8.45, .12, M.woodA, .03);
  soft(x + .05, x + .85, .28, .5, 6.55, 8.48, M.linen, .05); soft(x + .01, x + .89, .44, .62, 6.56, 7.96, M.linen, .06); soft(x + .01, x + .89, .6, .665, 7.78, 8.0, M.linen, .03);
  soft(x, x + .9, .6, .67, 6.6, 7.14, M.accent3, .03); soft(x, x + .9, .1, 1.22, 8.48, 8.6, M.headboard, .05);
  pillow(c, .86, 8.34, .62, .42, .17, M.linen, { rx: .28 }); pillow(c, .82, 8.16, .44, .42, .14, q[1], { rx: .34 });
  solid(x, x + .9, 6.5, 8.6, 1.2); });
box(1.69, 2.11, .1, .5, 8.17, 8.58, M.woodA); legs(1.74, 2.06, 8.22, 8.53, .1, M.metal, .015); box(1.73, 2.07, .3, .304, 8.165, 8.17, M.kick, { cast: false }); tableLamp(1.98, .5, 8.42, .85, M.ceramic); bookStack(1.8, .5, 8.3, 2, 21); solid(1.69, 2.11, 8.17, 8.6, .5);
// small two-door wardrobe in the corner by the window wall (0.8 m wide, 0.55 m deep, 2.0 m tall)
box(.42, 1.22, .08, 2.0, 4.6, 5.13, M.woodA); box(.46, 1.18, 0, .08, 4.62, 5.09, M.kick, { cast: false });
[[.425, .816], [.824, 1.215]].forEach(d => box(d[0], d[1], .1, 1.98, 5.13, 5.15, M.woodA)); box(.816, .824, .1, 1.98, 5.12, 5.14, M.kick, { cast: false });
[.78, .86].forEach(x => { box(x - .007, x + .007, .9, 1.3, 5.15, 5.175, M.metalAccent, { cast: false }); [.94, 1.26].forEach(y => box(x - .005, x + .005, y - .01, y + .01, 5.15, 5.165, M.metalAccent, { cast: false })); });
solid(.42, 1.22, 4.6, 5.15, 2.0);
// writing desk beside it, chair facing the wall
box(1.35, 2.5, .72, .755, 4.62, 5.2, M.woodB); legs(1.4, 2.45, 4.67, 5.15, .72, M.metal); solid(1.35, 2.5, 4.6, 5.2, .76);
chair(1.9, 5.43, 'n'); solid(1.67, 2.13, 5.2, 5.66, .86);
tableLamp(1.52, .755, 4.8, .8, M.metal); cyl(2.32, .755, .85, 4.78, .04, M.ceramic); stems(2.32, .84, 4.78, .55, 4); bookStack(1.92, .755, 4.84, 2, 33);
box(1.35, 2.5, 1.5, 1.525, 4.6, 4.84, M.woodA); books(1.4, 2.05, 1.525, 4.64, 4.8, 31); cyl(2.28, 1.525, 1.64, 4.72, .06, M.ceramicAlt, { rTop: .08 });
art('x', 8.6, -1, 1.45, 2.35, 1.45, 2.1, 5); art('z', 3.4, -1, 6.4, 7.2, 1.2, 1.95, 6);
curtains('z', .4, 1, 6.4, 8.0);
downlight(1.2, 5.6); downlight(2.4, 7.4); fill(1.9, 2.3, 6.4, .45, 7);

