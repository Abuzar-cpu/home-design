/* ------------------------------------------------------ kitchen 3.0 x 4.0 */
(function () {
  const kick = (x0, x1, z0, z1) => box(x0, x1, 0, 0.1, z0, z1, M.kick, { cast: false }),
    nc = { cast: false };
  // stair-wall run: three base units and a blind corner, wall cabinets above; it stops 1.05 m short of the hall wall so the doorway is clear
  kick(6.27, 8.2, 7.5, 8.05);
  [
    [6.25, 6.7],
    [6.7, 7.15],
    [7.15, 7.6]
  ].forEach(u => {
    box(u[0] + 0.004, u[1] - 0.004, 0.1, 0.86, 7.5, 8.1, M.woodB);
    box(u[0] + 0.1, u[1] - 0.1, 0.76, 0.775, 8.1, 8.115, M.metalAccent, nc);
  });
  box(7.6, 8.2, 0.1, 0.86, 7.5, 8.2, M.woodB);
  box(6.23, 8.2, 0.86, 0.9, 7.5, 8.12, M.counter);
  box(7.58, 8.2, 0.86, 0.9, 8.12, 8.2, M.counter, nc);
  box(6.25, 8.2, 0.9, 1.45, 7.5, 7.52, M.counter, nc);
  box(8.18, 8.2, 0.9, 1.45, 7.52, 8.2, M.counter, nc);
  [
    [6.25, 6.74],
    [6.74, 7.23],
    [7.23, 7.72],
    [7.72, 8.2]
  ].forEach(u => box(u[0] + 0.003, u[1] - 0.003, 1.45, 2.2, 7.5, 7.85, M.woodB));
  box(7.85, 8.2, 1.45, 2.2, 7.85, 8.2, M.woodB);
  box(6.3, 7.8, 1.44, 1.45, 7.55, 7.82, M.led, nc);
  solid(6.25, 8.2, 7.5, 8.1, 0.9);
  solid(7.6, 8.2, 8.1, 8.2, 0.9);
  // outside-wall run: oven and microwave tower, gas hob, counter
  kick(7.65, 8.2, 8.2, 10.9);
  box(7.6, 8.2, 0.1, 2.2, 8.2, 8.8, M.woodB);
  box(7.588, 7.6, 0.52, 1.1, 8.25, 8.75, M.screen, nc);
  box(7.56, 7.588, 1.06, 1.08, 8.29, 8.71, M.metalAccent, nc);
  box(7.588, 7.6, 1.2, 1.56, 8.25, 8.75, M.screen, nc);
  box(7.56, 7.588, 1.5, 1.52, 8.29, 8.71, M.metalAccent, nc);
  [0.46, 1.15, 1.62].forEach(y => box(7.596, 7.6, y, y + 0.004, 8.2, 8.8, M.kick, nc));
  soft(7.535, 7.56, 0.72, 1.07, 8.36, 8.54, M.towel, 0.01, nc);
  solid(7.6, 8.2, 8.2, 8.8, 2.2);
  // base units along the rest of the outside wall, counter and upstand
  [
    [8.8, 9.3],
    [9.3, 9.8],
    [9.8, 10.35],
    [10.35, 10.9]
  ].forEach(u => {
    box(7.6, 8.2, 0.1, 0.86, u[0] + 0.004, u[1] - 0.004, M.woodB);
    box(7.585, 7.6, 0.76, 0.775, u[0] + 0.13, u[1] - 0.13, M.metalAccent, nc);
  });
  box(7.6, 8.2, 0.1, 0.86, 10.9, 11.5, M.woodB);
  box(7.58, 8.2, 0.86, 0.9, 8.8, 11.5, M.counter);
  box(8.18, 8.2, 0.9, 1.45, 8.8, 11.5, M.counter, nc);
  box(7.5, 8.18, 0.9, 1.45, 11.48, 11.5, M.counter, nc);
  // gas hob: four burners with pan supports, knobs along the front
  box(7.66, 8.14, 0.9, 0.908, 8.98, 9.62, M.screen, nc);
  [
    [7.8, 9.14],
    [7.8, 9.46],
    [8.02, 9.14],
    [8.02, 9.46]
  ].forEach(q => {
    cyl(q[0], 0.908, 0.92, q[1], 0.05, M.kick, nc);
    cyl(q[0], 0.92, 0.926, q[1], 0.03, M.metalAccent, nc);
    box(q[0] - 0.085, q[0] + 0.085, 0.926, 0.936, q[1] - 0.006, q[1] + 0.006, M.kick, nc);
    box(q[0] - 0.006, q[0] + 0.006, 0.926, 0.936, q[1] - 0.085, q[1] + 0.085, M.kick, nc);
  });
  [9.15, 9.25, 9.35, 9.45].forEach(z => cyl(7.69, 0.908, 0.926, z, 0.013, M.metalAccent, nc));
  cyl(8.02, 0.936, 1.05, 9.46, 0.095, M.steel);
  cyl(8.02, 1.05, 1.058, 9.46, 0.1, M.steel, nc);
  cyl(8.02, 1.058, 1.08, 9.46, 0.015, M.kick, nc);
  // hood over the hob, wall cabinets to the right of it
  box(7.8, 8.2, 1.62, 1.72, 8.85, 9.75, M.kick);
  box(7.95, 8.2, 1.72, 2.2, 9.1, 9.5, M.kick);
  [
    [9.8, 10.37],
    [10.37, 10.94],
    [10.94, 11.5]
  ].forEach(u => box(7.85, 8.2, 1.45, 2.2, u[0] + 0.003, u[1] - 0.003, M.woodB));
  box(7.88, 8.17, 1.44, 1.45, 9.85, 11.45, M.led, nc);
  solid(7.6, 8.2, 8.8, 11.5, 0.9);
  // sink run under the front window
  kick(5.88, 7.6, 10.95, 11.5);
  [
    [5.86, 6.44],
    [6.44, 7.02],
    [7.02, 7.6]
  ].forEach(u => {
    box(u[0] + 0.004, u[1] - 0.004, 0.1, 0.86, 10.9, 11.5, M.woodB);
    box(u[0] + 0.17, u[1] - 0.17, 0.76, 0.775, 10.885, 10.9, M.metalAccent, nc);
  });
  box(5.86, 7.6, 0.86, 0.9, 10.88, 11.5, M.counter);
  box(6.42, 6.98, 0.9, 0.904, 10.98, 11.38, M.steel, nc);
  box(6.46, 6.94, 0.9, 0.906, 11.02, 11.34, M.screen, nc);
  cyl(6.7, 0.9, 1.22, 11.42, 0.013, M.metalAccent);
  box(6.688, 6.712, 1.2, 1.224, 11.22, 11.42, M.metalAccent, nc);
  cyl(7.1, 0.9, 1.04, 11.4, 0.025, M.ceramicAlt, { rTop: 0.018, cast: false });
  solid(5.86, 7.6, 10.9, 11.5, 0.9);
  // fridge-freezer in the corner by the hall wall, facing into the room
  box(5.22, 5.85, 0.03, 1.86, 10.86, 11.48, M.steel);
  box(5.24, 5.83, 0, 0.03, 10.88, 11.46, M.kick, nc);
  box(5.22, 5.85, 1.18, 1.19, 10.855, 10.86, M.kick, nc);
  [
    [1.3, 1.7],
    [0.7, 1.08]
  ].forEach(h => box(5.77, 5.79, h[0], h[1], 10.82, 10.86, M.kick, nc));
  solid(5.2, 5.86, 10.84, 11.5, 1.86);
  // worktop styling
  [6.05, 6.3, 7.3].forEach(x => {
    cyl(x, 0.925, 1.0, 11.62, 0.045, M.ceramicAlt, { rTop: 0.055, cast: false });
    for (let i = 0; i < 6; i++)
      leaf(x, 0.99, 11.62, i * 1.1, 0.6 + (i % 3) * 0.25, 0.12, 0.05, i % 2 ? M.plant : M.plantDark);
  });
  // coffee machine, kettle and two bottles on the stair-wall run
  box(6.5, 6.78, 0.9, 1.22, 7.6, 7.84, M.kick);
  box(6.57, 6.71, 0.98, 1.0, 7.84, 7.88, M.steel, nc);
  cyl(7.1, 0.9, 1.12, 7.75, 0.075, M.steel, { rTop: 0.06 });
  cyl(7.1, 1.12, 1.15, 7.75, 0.02, M.kick, nc);
  cyl(7.5, 0.9, 1.06, 7.7, 0.03, M.glassObj, nc);
  cyl(7.62, 0.9, 1.1, 7.72, 0.028, M.glassDark, nc);
  // utensil pot and chopping boards beside the hob
  cyl(8.02, 0.9, 1.04, 10.0, 0.055, M.ceramic);
  [
    [8.0, 9.98],
    [8.04, 10.01],
    [8.02, 10.03]
  ].forEach(q => cyl(q[0], 1.04, 1.24, q[1], 0.007, M.woodB, nc));
  box(8.125, 8.165, 0.9, 1.26, 10.25, 10.51, M.woodB);
  box(8.09, 8.125, 0.9, 1.19, 10.4, 10.68, M.woodA);
  // island: stone top with a waterfall end, open shelves facing the hob, knee space and two stools on the hall side
  box(6.1, 6.82, 0.86, 0.9, 8.75, 9.75, M.counter);
  box(6.1, 6.82, 0, 0.86, 8.75, 8.79, M.counter);
  box(6.38, 6.4, 0.1, 0.86, 8.79, 9.75, M.woodB);
  box(6.4, 6.8, 0.1, 0.86, 9.72, 9.75, M.woodB);
  box(6.42, 6.78, 0, 0.1, 8.79, 9.72, M.kick, nc);
  box(6.4, 6.8, 0.1, 0.13, 8.79, 9.72, M.woodB, nc);
  [0.38, 0.62].forEach(y => box(6.4, 6.8, y, y + 0.025, 8.79, 9.72, M.woodB, nc));
  box(6.4, 6.8, 0.13, 0.86, 9.245, 9.265, M.woodB, nc);
  box(6.785, 6.795, 0.845, 0.855, 8.82, 9.7, M.led, nc);
  // on the open shelves: towels, a pot, plates and bowls, cookbooks and jars
  soft(6.46, 6.76, 0.13, 0.34, 8.84, 9.2, M.towel, 0.02, nc);
  cyl(6.6, 0.13, 0.31, 9.5, 0.14, M.steel, nc);
  cyl(6.6, 0.31, 0.32, 9.5, 0.145, M.steel, nc);
  cyl(6.6, 0.32, 0.345, 9.5, 0.018, M.kick, nc);
  [0.405, 0.43, 0.455, 0.48].forEach((y, i) =>
    cyl(6.6, y, y + 0.022, 8.93, 0.1 - i * 0.004, M.ceramic, { rTop: 0.115 - i * 0.004, cast: false })
  );
  for (let i = 0; i < 6; i++)
    cyl(6.6, 0.405 + i * 0.012, 0.415 + i * 0.012, 9.12, 0.095, i % 2 ? M.ceramic : M.ceramicAlt, nc);
  soft(6.46, 6.76, 0.405, 0.58, 9.31, 9.67, M.cushion, 0.02, nc);
  books(6.5, 6.74, 0.645, 8.83, 9.1, 141, true);
  cyl(6.6, 0.645, 0.78, 9.18, 0.04, M.ceramicAlt, nc);
  [9.33, 9.45, 9.57].forEach((z, i) => {
    cyl(6.6, 0.645, 0.79, z, 0.048, M.glassObj, nc);
    cyl(6.6, 0.645, 0.7 + i * 0.02, z, 0.042, [M.accent1, M.paper, M.woodB][i], nc);
    cyl(6.6, 0.79, 0.805, z, 0.05, M.woodB, nc);
  });
  // fruit bowl on the island
  cyl(6.48, 0.9, 1.0, 9.05, 0.12, M.ceramic, { rTop: 0.17 });
  [
    [6.43, 9.02, M.accent2],
    [6.54, 9.09, M.accent1],
    [6.48, 8.97, M.accent2],
    [6.5, 9.05, M.accent3]
  ].forEach(q => sph(q[0], 1.03, q[1], 0.045, 0.045, 0.045, q[2], nc));
  solid(6.1, 6.82, 8.75, 9.75, 0.9);
  // two stools on the hall side of the island
  [9.0, 9.5].forEach(z => {
    cyl(6.02, 0, 0.02, z, 0.18, M.metal, nc);
    cyl(6.02, 0.02, 0.6, z, 0.022, M.metal, nc);
    cyl(6.02, 0.24, 0.255, z, 0.13, M.metal, nc);
    cyl(6.02, 0.6, 0.66, z, 0.17, M.chairSeat, { seg: 28 });
    solid(5.85, 6.1, z - 0.17, z + 0.17, 0.66);
  });
  // table for two on the end of the island, chairs face to face
  soft(6.1, 6.8, 0.71, 0.75, 9.752, 10.25, M.woodB, 0.012, { corner: 0.03 });
  [6.14, 6.76].forEach(x => cyl(x, 0, 0.71, 10.225, 0.018, M.metal, nc));
  chair(6.07, 9.97, 'e');
  chair(6.83, 9.97, 'w');
  // plates, glasses and a vase on the table
  [6.27, 6.63].forEach(x => {
    cyl(x, 0.75, 0.758, 9.97, 0.1, M.ceramic, nc);
  });
  [
    [6.33, 10.13],
    [6.57, 9.81]
  ].forEach(q => cyl(q[0], 0.75, 0.83, q[1], 0.032, M.ceramicAlt, { rTop: 0.038, cast: false }));
  vase(6.45, 0.75, 10.17, 0.15, M.ceramic, true);
  solid(6.1, 6.8, 9.752, 10.25, 0.76);
  solid(5.84, 6.1, 9.752, 10.2, 0.86);
  solid(6.8, 7.06, 9.752, 10.2, 0.86);
  // pendants over the island and table
  [9.0, 9.5, 10.0].forEach(z => {
    cyl(6.45, 1.56, 1.74, z, 0.12, M.metalAccent, { rTop: 0.035, seg: 24 });
    cyl(6.45, 1.55, 1.56, z, 0.1, M.glow, nc);
    halo(6.45, 1.54, z, 0.8);
    cyl(6.45, 1.74, H, z, 0.005, M.metal, { parent: roof, cast: false });
  });
  // picture, ceiling lights and fill
  art('z', 5.2, 1, 9.35, 10.05, 1.15, 1.42 + 0.6, 8);
  [
    [5.8, 8.3],
    [7.2, 9.3],
    [6.5, 10.6]
  ].forEach(p => downlight(p[0], p[1]));
  fill(6.6, 2.3, 9.5, 0.7, 7);
})();
