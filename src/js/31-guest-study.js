/* ------------------------------------------------- guest / study 3.0 x 4.0 */
box(0.9, 2.9, 0, 0.014, 6.0, 8.0, M.rugGuest, { cast: false });
// two single beds, heads on the bathroom-side wall, one shared nightstand between them
[
  [0.55, M.accent1],
  [2.35, M.accent2]
].forEach(q => {
  const x = q[0],
    c = x + 0.45;
  box(x + 0.03, x + 0.87, 0.12, 0.3, 6.5, 8.5, M.woodA);
  legs(x + 0.08, x + 0.82, 6.55, 8.45, 0.12, M.woodA, 0.03);
  soft(x + 0.05, x + 0.85, 0.28, 0.5, 6.55, 8.48, M.linen, 0.05);
  soft(x + 0.01, x + 0.89, 0.44, 0.62, 6.56, 7.96, M.linen, 0.06);
  soft(x + 0.01, x + 0.89, 0.6, 0.665, 7.78, 8.0, M.linen, 0.03);
  soft(x, x + 0.9, 0.6, 0.67, 6.6, 7.14, M.accent3, 0.03);
  soft(x, x + 0.9, 0.1, 1.22, 8.48, 8.6, M.headboard, 0.05);
  pillow(c, 0.86, 8.34, 0.62, 0.42, 0.17, M.linen, { rx: 0.28 });
  pillow(c, 0.82, 8.16, 0.44, 0.42, 0.14, q[1], { rx: 0.34 });
  solid(x, x + 0.9, 6.5, 8.6, 1.2);
});
box(1.69, 2.11, 0.1, 0.5, 8.17, 8.58, M.woodA);
legs(1.74, 2.06, 8.22, 8.53, 0.1, M.metal, 0.015);
box(1.73, 2.07, 0.3, 0.304, 8.165, 8.17, M.kick, { cast: false });
tableLamp(1.98, 0.5, 8.42, 0.85, M.ceramic);
bookStack(1.8, 0.5, 8.3, 2, 21);
solid(1.69, 2.11, 8.17, 8.6, 0.5);
// small two-door wardrobe in the corner by the window wall (0.8 m wide, 0.55 m deep, 2.0 m tall)
box(0.42, 1.22, 0.08, 2.0, 4.6, 5.13, M.woodA);
box(0.46, 1.18, 0, 0.08, 4.62, 5.09, M.kick, { cast: false });
[
  [0.425, 0.816],
  [0.824, 1.215]
].forEach(d => box(d[0], d[1], 0.1, 1.98, 5.13, 5.15, M.woodA));
box(0.816, 0.824, 0.1, 1.98, 5.12, 5.14, M.kick, { cast: false });
[0.78, 0.86].forEach(x => {
  box(x - 0.007, x + 0.007, 0.9, 1.3, 5.15, 5.175, M.metalAccent, { cast: false });
  [0.94, 1.26].forEach(y => box(x - 0.005, x + 0.005, y - 0.01, y + 0.01, 5.15, 5.165, M.metalAccent, { cast: false }));
});
solid(0.42, 1.22, 4.6, 5.15, 2.0);
// writing desk beside it, chair facing the wall
box(1.35, 2.5, 0.72, 0.755, 4.62, 5.2, M.woodB);
legs(1.4, 2.45, 4.67, 5.15, 0.72, M.metal);
solid(1.35, 2.5, 4.6, 5.2, 0.76);
chair(1.9, 5.43, 'n');
solid(1.67, 2.13, 5.2, 5.66, 0.86);
tableLamp(1.52, 0.755, 4.8, 0.8, M.metal);
cyl(2.32, 0.755, 0.85, 4.78, 0.04, M.ceramic);
stems(2.32, 0.84, 4.78, 0.55, 4);
bookStack(1.92, 0.755, 4.84, 2, 33);
box(1.35, 2.5, 1.5, 1.525, 4.6, 4.84, M.woodA);
books(1.4, 2.05, 1.525, 4.64, 4.8, 31);
cyl(2.28, 1.525, 1.64, 4.72, 0.06, M.ceramicAlt, { rTop: 0.08 });
art('x', 8.6, -1, 1.45, 2.35, 1.45, 2.1, 5);
art('z', 3.4, -1, 6.4, 7.2, 1.2, 1.95, 6);
curtains('z', 0.4, 1, 6.4, 8.0);
downlight(1.2, 5.6);
downlight(2.4, 7.4);
fill(1.9, 2.3, 6.4, 0.45, 7);
