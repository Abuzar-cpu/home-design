/* ------------------------------------------------------ kitchen 3.0 x 4.0 */
/* Rebuilt 26 Nov 2026 from Reis's reference photo: an L of handleless walnut base units (outside wall + front
   window wall) under cream tall and wall units that run to the ceiling, honed travertine worktop and splashback,
   dark bronze fittings, cream floor; an island 1.2 x 0.7 with two stools on the hall side and a dining table
   (1.1 x 0.5) that slides out of the island toward the hob, shown pulled out with a chair at each end.
   Lights: six ceiling spots, warm LED strips under the wall units, a hood light and a lit glass cabinet.
   It uses its own k* materials (02-materials.js), so the style switch and the other rooms leave it alone. */
(function () {
  const nc = { cast: false }, W = M.kWalnut, C = M.kCream, S = M.kStone, B = M.kBronze, G = M.kick, L = M.kLed;
  const kick = (x0, x1, z0, z1) => box(x0, x1, 0, .1, z0, z1, G, nc);
  // handleless base unit: finger groove under the worktop, optional drawer splits
  function baseX(z0, z1, drawers) {   // outside-wall run, front faces the room at x 7.6
    box(7.6, 8.2, .1, .86, z0 + .003, z1 - .003, W); box(7.594, 7.6, .8, .83, z0 + .003, z1 - .003, G, nc);
    if (drawers) [.33, .56].forEach(y => box(7.596, 7.6, y, y + .006, z0 + .003, z1 - .003, G, nc));
  }
  function baseZ(x0, x1, drawers) {   // window run, front faces the room at z 10.9
    box(x0 + .003, x1 - .003, .1, .86, 10.9, 11.5, W); box(x0 + .003, x1 - .003, .8, .83, 10.894, 10.9, G, nc);
    if (drawers) [.33, .56].forEach(y => box(x0 + .003, x1 - .003, y, y + .006, 10.896, 10.9, G, nc));
  }

  // outside wall, by the stair wall: tall integrated fridge-freezer and a tall pantry with the microwave, cream to the ceiling
  kick(7.65, 8.2, 7.5, 11.5);
  box(7.6, 8.2, .1, H, 7.5, 8.147, C); box(7.6, 8.2, .1, H, 8.153, 8.75, C);
  [.86, 1.95].forEach(y => { box(7.596, 7.6, y, y + .006, 7.5, 8.147, G, nc); box(7.596, 7.6, y, y + .006, 8.153, 8.75, G, nc); });
  box(7.588, 7.6, 1.2, 1.56, 8.2, 8.7, M.screen, nc); box(7.582, 7.588, 1.24, 1.52, 8.63, 8.67, B, nc);   // microwave
  solid(7.6, 8.2, 7.5, 8.75, H);
  // outside wall: base run with the oven under the gas hob (60 cm of worktop either side of the hob)
  baseX(8.75, 9.35, true); baseX(9.35, 9.95); baseX(9.95, 10.45, true); baseX(10.45, 10.9); box(7.6, 8.2, .1, .86, 10.9, 11.5, W);   // last: blind corner
  box(7.588, 7.6, .16, .74, 9.39, 9.91, M.screen, nc); box(7.57, 7.588, .69, .705, 9.43, 9.87, B, nc);
  box(7.58, 8.2, .86, .9, 8.75, 11.5, S); box(8.18, 8.2, .9, 1.45, 8.75, 11.48, S, nc);                   // worktop, splashback
  box(7.66, 8.14, .9, .908, 9.33, 9.97, M.screen, nc);
  [[7.8, 9.49], [7.8, 9.81], [8.02, 9.49], [8.02, 9.81]].forEach(q => { cyl(q[0], .908, .92, q[1], .05, G, nc); cyl(q[0], .92, .926, q[1], .03, B, nc);
    box(q[0] - .085, q[0] + .085, .926, .936, q[1] - .006, q[1] + .006, G, nc); box(q[0] - .006, q[0] + .006, .926, .936, q[1] - .085, q[1] + .085, G, nc); });
  [9.5, 9.6, 9.7, 9.8].forEach(z => cyl(7.69, .908, .926, z, .013, B, nc));
  cyl(8.02, .936, 1.05, 9.81, .095, M.steel); cyl(8.02, 1.05, 1.058, 9.81, .1, M.steel, nc); cyl(8.02, 1.058, 1.08, 9.81, .015, G, nc);
  solid(7.6, 8.2, 8.75, 11.5, .9);
  // cream wall units to the ceiling; the hood is boxed in to match, its canopy 70 cm above the hob; warm LED strips underneath
  [[8.75, 9.35], [9.95, 10.53], [10.53, 11.11], [11.11, 11.5]].forEach(u => box(7.85, 8.2, 1.45, H, u[0] + .003, u[1] - .003, C));
  box(7.85, 8.2, 1.8, H, 9.353, 9.947, C); soft(7.72, 8.2, 1.6, 1.8, 9.35, 9.95, C, .05);
  box(7.76, 8.16, 1.592, 1.6, 9.4, 9.9, M.steel, nc); box(7.78, 7.84, 1.588, 1.592, 9.55, 9.75, L, nc);
  box(7.86, 7.89, 1.44, 1.45, 8.78, 9.33, L, nc); box(7.86, 7.89, 1.44, 1.45, 9.97, 11.47, L, nc);

  // front wall: sink under the window (plumbing unchanged), integrated dishwasher panelled in walnut, drawers by the hall wall
  kick(5.2, 7.6, 10.95, 11.5);
  baseZ(5.2, 5.8, true); baseZ(5.8, 6.4, true); baseZ(6.4, 7.0); baseZ(7.0, 7.6);
  box(5.2, 7.6, .86, .9, 10.88, 11.5, S);
  box(6.42, 6.98, .895, .903, 10.98, 11.38, G, nc);                                                         // undermount sink
  cyl(6.7, .9, 1.22, 11.42, .013, B); box(6.688, 6.712, 1.2, 1.224, 11.22, 11.42, B, nc);                  // tap
  box(5.2, 5.9, .9, 1.45, 11.48, 11.5, S, nc); box(7.5, 8.18, .9, 1.45, 11.48, 11.5, S, nc);               // splashback either side of the window
  solid(5.2, 7.6, 10.9, 11.5, .9);
  // cream corner unit, a bulkhead over the window and above the glass cabinet; LED strips under them light the sink
  box(7.5, 7.85, 1.45, H, 11.15, 11.5, C); box(5.2, 7.5, 2.3, H, 11.15, 11.5, C);
  box(7.52, 7.83, 1.44, 1.45, 11.16, 11.19, L, nc); box(5.92, 7.48, 2.29, 2.3, 11.16, 11.19, L, nc);
  // black-framed glass cabinet left of the window: two glass doors, walnut back and shelves, lit from the top
  box(5.2, 5.9, 1.45, 1.47, 11.15, 11.5, B); box(5.2, 5.9, 2.28, 2.3, 11.15, 11.5, B);
  box(5.2, 5.22, 1.47, 2.28, 11.15, 11.5, B); box(5.88, 5.9, 1.47, 2.28, 11.15, 11.5, B); box(5.54, 5.56, 1.47, 2.28, 11.148, 11.158, B, nc);
  box(5.22, 5.88, 1.47, 2.28, 11.48, 11.5, W, nc); [1.74, 2.01].forEach(y => box(5.22, 5.88, y, y + .018, 11.17, 11.48, W, nc));
  box(5.22, 5.88, 1.47, 2.28, 11.15, 11.156, M.kGlass, nc); box(5.25, 5.85, 2.262, 2.27, 11.2, 11.45, L, nc);
  [.0, .02, .04].forEach((d, i) => cyl(5.38, 1.47 + d, 1.49 + d, 11.32, .075 - i * .006, M.ceramic, { rTop: .085 - i * .006, cast: false }));
  [5.66, 5.76].forEach(x => cyl(x, 1.47, 1.57, 11.3, .03, M.glassObj, nc)); [5.36, 5.48].forEach(x => cyl(x, 1.758, 1.84, 11.3, .035, M.ceramicAlt, nc));
  vase(5.72, 1.758, 11.32, .17, M.ceramic); cyl(5.4, 2.028, 2.1, 11.32, .07, M.ceramicAlt, { rTop: .09, cast: false }); cyl(5.72, 2.028, 2.04, 11.32, .09, M.ceramic, nc);

  // worktop styling: coffee machine in the corner, boards against the splashback, utensils, pampas, herbs on the sill
  box(7.86, 8.14, .9, 1.22, 10.95, 11.28, C); box(7.82, 7.86, .98, 1.06, 11.06, 11.16, B, nc); cyl(7.9, .9, .97, 11.11, .035, M.ceramic, nc);
  box(8.125, 8.165, .9, 1.26, 10.1, 10.36, W); box(8.09, 8.125, .9, 1.19, 10.25, 10.53, M.woodB);
  cyl(8.02, .9, 1.04, 10.68, .055, M.ceramic); [[8.0, 10.66], [8.04, 10.69], [8.02, 10.71]].forEach(q => cyl(q[0], 1.04, 1.24, q[1], .007, W, nc));
  vase(5.42, .9, 11.3, .22, M.ceramic, true);
  [6.05, 6.3, 7.3].forEach(x => { cyl(x, .925, 1.0, 11.62, .045, M.ceramicAlt, { rTop: .055, cast: false }); for (let i = 0; i < 6; i++) leaf(x, .99, 11.62, i * 1.1, .6 + (i % 3) * .25, .12, .05, i % 2 ? M.plant : M.plantDark); });

  // island: travertine top with rounded corners, walnut drawers facing the hob, knee space and two stools on the hall side
  soft(5.9, 6.6, .86, .9, 8.8, 10.0, S, .008, { corner: .1 });
  box(6.08, 6.6, .1, .86, 8.82, 9.98, W); box(6.1, 6.58, 0, .1, 8.84, 9.96, G, nc);
  box(6.6, 6.604, .77, .8, 8.82, 9.98, G, nc); box(6.6, 6.604, .45, .456, 8.82, 9.98, G, nc); box(6.6, 6.604, .1, .695, 9.397, 9.403, G, nc);
  cyl(6.25, .9, 1.0, 9.25, .12, M.ceramic, { rTop: .17 }); [[6.2, 9.22, M.accent2], [6.31, 9.29, M.accent1], [6.25, 9.17, M.accent2], [6.27, 9.25, M.accent3]].forEach(q => sph(q[0], 1.03, q[1], .045, .045, .045, q[2], nc));
  solid(5.9, 6.6, 8.8, 10.0, .9);
  [9.1, 9.7].forEach(z => { cyl(5.86, 0, .02, z, .18, B, nc); cyl(5.86, .02, .62, z, .022, B, nc); cyl(5.86, .25, .262, z, .15, B, nc); cyl(5.86, .62, .68, z, .17, M.kSeat, { seg: 28 }); solid(5.69, 5.9, z - .17, z + .17, .68); });
  // the dining table slides out of the island at 75 cm (runners + two fold-down legs); shown pulled out 50 cm, a chair at each end
  soft(6.12, 7.1, .71, .75, 8.85, 9.95, W, .008, { corner: .02 });
  [8.89, 9.91].forEach(z => cyl(7.06, 0, .71, z, .016, B, nc));
  [9.1, 9.7].forEach(z => cyl(6.85, .75, .758, z, .1, M.ceramic, nc)); [[6.99, 9.27], [6.71, 9.53]].forEach(q => cyl(q[0], .75, .83, q[1], .032, M.ceramicAlt, { rTop: .038, cast: false }));
  vase(6.85, .75, 9.4, .13, M.ceramic, true);
  chair(6.85, 10.12, 'n'); chair(6.85, 8.68, 's');
  solid(6.6, 7.1, 8.85, 9.95, .75); solid(6.62, 7.08, 9.95, 10.35, .9); solid(6.62, 7.08, 8.45, 8.85, .9);   // chairs: their seats tuck under the table ends

  art('z', 5.2, 1, 9.05, 9.75, 1.35, 1.95, 8);
  // lights: two rows of three ceiling spots (one row over the island), a general fill, the strip wash and the glass cabinet glow
  [7.2, 6.2].forEach(x => [8.4, 9.65, 10.8].forEach(z => downlight(x, z)));
  fill(6.6, 2.3, 9.6, .7, 7); fill(7.75, 1.3, 10.2, .3, 2.2); fill(5.55, 1.95, 11.3, .12, .9);
})();
