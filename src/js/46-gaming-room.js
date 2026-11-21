/* ---------------------------------------------------- gaming room 3.0 x 4.0 */
const screenOn = new THREE.MeshStandardMaterial({
  color: 0x0a1020,
  emissive: 0x2a59c8,
  emissiveIntensity: 0.9,
  roughness: 0.2
});
box(6.05, 7.45, 0, 0.014, 8.65, 10.45, M.rugDining, { cast: false });
// desk with two monitors on the outside wall
box(7.5, 8.18, 0.72, 0.76, 8.4, 10.1, M.woodA);
legs(7.56, 8.12, 8.46, 10.04, 0.72, M.metal, 0.025);
solid(7.5, 8.2, 8.4, 10.1, 0.76);
[
  [8.52, 9.2],
  [9.3, 9.98]
].forEach(s => {
  box(7.98, 8.0, 0.9, 1.3, s[0], s[1], M.screen);
  box(7.975, 7.98, 0.915, 1.285, s[0] + 0.015, s[1] - 0.015, screenOn, { cast: false });
  box(7.99, 8.05, 0.76, 0.92, (s[0] + s[1]) / 2 - 0.03, (s[0] + s[1]) / 2 + 0.03, M.kick, { cast: false });
  box(7.9, 8.1, 0.76, 0.77, (s[0] + s[1]) / 2 - 0.12, (s[0] + s[1]) / 2 + 0.12, M.kick, { cast: false });
});
box(7.6, 7.9, 0.76, 0.764, 8.75, 9.75, M.kick, { cast: false });
box(7.66, 7.8, 0.764, 0.78, 8.95, 9.4, M.screen, { cast: false });
box(7.7, 7.76, 0.764, 0.79, 9.5, 9.6, M.screen, { cast: false });
cyl(7.75, 0.76, 0.98, 8.52, 0.012, M.metal, { cast: false });
box(7.7, 7.8, 0.98, 1.0, 8.45, 8.59, M.kick, { cast: false });
cyl(7.7, 0.76, 0.88, 9.95, 0.04, M.ceramicAlt, { cast: false });
box(7.85, 8.12, 0.02, 0.5, 10.15, 10.38, M.kick);
box(7.848, 7.85, 0.06, 0.46, 10.19, 10.34, M.glow, { cast: false });
halo(7.8, 0.28, 10.26, 0.8);
solid(7.8, 8.2, 10.12, 10.42, 0.5);
box(8.185, 8.195, 1.45, 1.47, 8.4, 10.1, M.glow, { cast: false });
// gaming chair
cyl(7.1, 0, 0.04, 9.25, 0.3, M.kick, { seg: 5 });
cyl(7.1, 0.04, 0.4, 9.25, 0.03, M.metal);
soft(6.86, 7.34, 0.4, 0.5, 9.0, 9.5, M.kick, 0.04);
soft(6.84, 6.96, 0.46, 1.25, 9.02, 9.48, M.kick, 0.05, { rz: 0.1 });
soft(6.9, 6.97, 0.62, 1.18, 9.14, 9.36, M.accent1, 0.025, { rz: 0.1 });
box(6.9, 7.3, 0.58, 0.62, 8.98, 9.02, M.kick, { cast: false });
box(6.9, 7.3, 0.58, 0.62, 9.48, 9.52, M.kick, { cast: false });
solid(6.84, 7.36, 9.0, 9.5, 1.2);
// TV wall with console
box(6.3, 8.0, 0.16, 0.5, 7.5, 7.9, M.woodA);
legs(6.36, 7.94, 7.56, 7.84, 0.16, M.metal, 0.015);
[6.87, 7.43].forEach(x => box(x - 0.002, x + 0.002, 0.18, 0.48, 7.9, 7.905, M.kick, { cast: false }));
solid(6.3, 8.0, 7.5, 7.9, 0.5);
box(6.45, 7.85, 0.95, 1.75, 7.5, 7.53, M.screen);
box(6.47, 7.83, 0.97, 1.73, 7.53, 7.535, screenOn, { cast: false });
box(6.4, 7.9, 0.9, 0.915, 7.5, 7.515, M.glow, { cast: false });
halo(7.15, 1.3, 7.65, 2.2);
box(6.5, 6.85, 0.5, 0.57, 7.6, 7.82, M.paper);
box(7.0, 7.14, 0.5, 0.54, 7.66, 7.76, M.kick, { cast: false });
box(7.2, 7.34, 0.5, 0.54, 7.64, 7.74, M.paper, { cast: false });
[
  [7.6, 7.7],
  [7.78, 7.7]
].forEach(q => cyl(q[0], 0.5, 0.68, q[1], 0.05, M.kick));
// sofa under the window facing the screen
soft(5.9, 7.7, 0.13, 0.43, 10.5, 11.4, M.sofa, 0.04);
soft(5.9, 7.7, 0.36, 0.88, 11.14, 11.4, M.sofa, 0.05);
soft(5.9, 6.1, 0.36, 0.66, 10.5, 11.3, M.sofa, 0.05);
soft(7.5, 7.7, 0.36, 0.66, 10.5, 11.3, M.sofa, 0.05);
[
  [6.11, 6.79],
  [6.81, 7.49]
].forEach(s => {
  soft(s[0], s[1], 0.42, 0.59, 10.48, 11.14, M.cushion, 0.05);
  soft(s[0] + 0.01, s[1] - 0.01, 0.59, 0.96, 10.98, 11.18, M.cushion, 0.07, { rx: 0.1 });
});
pillow(6.3, 0.78, 10.88, 0.42, 0.4, 0.13, M.accent1, { rx: 0.3 });
pillow(7.3, 0.78, 10.88, 0.42, 0.4, 0.13, M.accent3, { rx: 0.3 });
legs(5.96, 7.64, 10.56, 11.34, 0.13);
solid(5.9, 7.7, 10.5, 11.4, 0.88);
cyl(5.66, 0.48, 0.5, 10.9, 0.17, M.woodB, { seg: 28 });
cyl(5.66, 0, 0.48, 10.9, 0.02, M.metal);
cyl(5.66, 0, 0.02, 10.9, 0.12, M.metal);
box(5.6, 5.74, 0.5, 0.54, 10.8, 10.9, M.kick, { cast: false });
cyl(5.71, 0.5, 0.62, 11.0, 0.035, M.accent1, { cast: false });
solid(5.49, 5.83, 10.73, 11.07, 0.5);
// shelves by the door
[0.5, 1.0, 1.5].forEach((y, i) => {
  box(5.2, 5.46, y, y + 0.03, 10.25, 11.3, M.woodA, { cast: false });
  if (i < 2) books(5.24, 5.42, y + 0.03, 10.3, 10.75, 90 + i, true);
  cyl(5.33, y + 0.03, y + 0.17, 11.0 - i * 0.1, 0.045, i % 2 ? M.accent1 : M.ceramicAlt, { cast: false });
  box(5.27, 5.39, y + 0.03, y + 0.15, 11.12, 11.24, i ? M.accent3 : M.accent2, { cast: false });
});
art('z', 5.2, 1, 8.85, 9.45, 1.2, 2.0, 15);
art('z', 8.2, -1, 10.45, 11.25, 1.2, 2.0, 16);
curtains('x', 11.5, -1, 5.9, 7.5);
// acoustic panels: oak slats on dark felt, above the desk and beside the screen
function acoustic(axis, face, dir, a0, a1, y0, y1) {
  const B = (A0, A1, Y0, Y1, d0, d1, m) =>
    axis === 'x'
      ? box(A0, A1, Y0, Y1, face + dir * d0, face + dir * d1, m, { cast: false })
      : box(face + dir * d0, face + dir * d1, Y0, Y1, A0, A1, m, { cast: false });
  B(a0, a1, y0, y1, 0, 0.018, M.kick);
  for (let a = a0 + 0.012; a + 0.026 <= a1; a += 0.05) B(a, a + 0.026, y0 + 0.01, y1 - 0.01, 0.018, 0.04, M.woodA);
}
[
  [8.45, 8.95],
  [9.0, 9.5],
  [9.55, 10.05]
].forEach(q => acoustic('z', 8.2, -1, q[0], q[1], 1.6, 2.5));
acoustic('x', 7.5, 1, 5.55, 6.15, 0.9, 2.4);
[
  [6.2, 8.6],
  [7.0, 9.6],
  [6.4, 10.8]
].forEach(q => downlight(q[0], q[1]));
fill(6.6, 2.3, 9.5, 0.55, 7);
