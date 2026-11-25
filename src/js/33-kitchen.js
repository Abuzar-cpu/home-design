/* ------------------------------------------------------ kitchen 3.0 x 4.0
   Clear inside: x 5.2-8.2 (hall wall to outside wall), z 7.5-11.5 (stair wall to front wall).
   Walnut base units, ivory tall and wall units, travertine-look stone, champagne bronze. Warm colours are set in the Loft style (kLow, kUp, ...);
   the other styles map those keys to their own cabinet colours.
   Layout: outside-wall run (oven + microwave column, induction hob, prep drawers), front-wall run (fridge, dishwasher, sink under the window, corner pull-out),
   stair-wall run (pantry), and a compact island moved toward the hall wall: seating pocket 0.65 m on the hall side, cooking aisle 0.99 m. */
(function () {
  const nc = { cast: false }, F = .02;
  // fronts. fz: unit fronts that face along x (units laid out along z); fx: fronts that face along z (units laid out along x). dir -1 faces -x / -z.
  const fz = (xf, dir, z0, z1, y0, y1, mat, groove) => {
    box(dir < 0 ? xf : xf - F, dir < 0 ? xf + F : xf, y0 + .002, y1 - .002, z0 + .002, z1 - .002, mat);
    if (groove) box(dir < 0 ? xf - .003 : xf, dir < 0 ? xf : xf + .003, y1 - .034, y1 - .014, z0 + .05, z1 - .05, M.kPlinth, nc);
  };
  const fx = (zf, dir, x0, x1, y0, y1, mat, groove) => {
    box(x0 + .002, x1 - .002, y0 + .002, y1 - .002, dir < 0 ? zf : zf - F, dir < 0 ? zf + F : zf, mat);
    if (groove) box(x0 + .05, x1 - .05, y1 - .034, y1 - .014, dir < 0 ? zf - .003 : zf, dir < 0 ? zf : zf + .003, M.kPlinth, nc);
  };
  const plinth = (x0, x1, z0, z1) => box(x0, x1, 0, .1, z0, z1, M.kPlinth, nc);

  /* ---- warm wall finish, stone backsplash (all on the kitchen side of the walls) */
  tiled('z', 5.2, 1, 7.5, 11.5, [{ a0: 7.7, a1: 8.6, sill: 0, head: 2.1 }], M.kWall, 2.4);          // hall wall
  tiled('x', 7.5, 1, 5.2, 8.2, [], M.kWall, 2.4);                                                    // stair wall
  tiled('z', 8.2, -1, 7.5, 11.5, [], M.kWall, 2.4);                                                  // outside wall
  tiled('x', 11.5, -1, 5.2, 8.2, [{ a0: 5.9, a1: 7.5, sill: .9, head: 2.3 }], M.kWall, 2.4);        // front wall, window opening left clear
  vpanel('z', 8.195, -1, 8.7, 11.5, .9, 1.45, M.kStone, 1.6); vpanel('x', 11.495, -1, 7.5, 8.2, .9, 1.45, M.kStone, 1.6);

  /* ---- outside-wall run, x 7.6-8.2: tall appliance column, hob, prep drawers; fronts face -x */
  plinth(7.64, 8.2, 8.1, 11.5);
  box(7.62, 8.2, .1, .86, 8.7, 11.5, M.kPlinth, nc);
  box(7.62, 8.2, .1, 2.2, 8.1, 8.7, M.kLow);                                                          // column body
  fz(7.6, -1, 8.1, 8.7, .1, .45, M.kLow, true); fz(7.6, -1, 8.1, 8.7, .45, .8, M.kLow, true);        // two hidden small-appliance drawers
  box(7.6, 8.2, .8, 1.78, 8.1, 8.7, M.kLow);
  box(7.585, 7.6, .82, 1.38, 8.13, 8.67, M.screen, nc); box(7.568, 7.585, 1.3, 1.32, 8.2, 8.6, M.kBronze, nc); box(7.585, 7.6, 1.34, 1.36, 8.13, 8.67, M.kBronze, nc);   // oven, mid height
  box(7.585, 7.6, 1.42, 1.76, 8.13, 8.67, M.screen, nc); box(7.568, 7.585, 1.46, 1.72, 8.6, 8.62, M.kBronze, nc); box(7.585, 7.6, 1.4, 1.42, 8.13, 8.67, M.kBronze, nc);   // microwave above it
  fz(7.6, -1, 8.1, 8.7, 1.78, 2.2, M.kUp, false);
  [[8.7, 9.2], [9.2, 9.7]].forEach(u => { fz(7.6, -1, u[0], u[1], .1, .48, M.kLow, true); fz(7.6, -1, u[0], u[1], .48, .86, M.kLow, true); });     // pot drawers under the hob
  [[9.7, 10.3], [10.3, 10.9]].forEach(u => { fz(7.6, -1, u[0], u[1], .1, .44, M.kLow, true); fz(7.6, -1, u[0], u[1], .44, .86, M.kLow, true); });  // prep drawers
  box(7.585, 8.2, .86, .9, 8.7, 11.5, M.kStone);                                                      // worktop
  // induction hob 0.60 m, flush glass with four zones
  box(7.66, 8.16, .9, .908, 8.9, 9.5, M.screen, nc);
  [[7.8, 9.05], [7.8, 9.35], [8.03, 9.05], [8.03, 9.35]].forEach(q => { cyl(q[0], .908, .91, q[1], .085, M.kBronze, nc); cyl(q[0], .91, .912, q[1], .08, M.screen, nc); });
  box(7.66, 7.68, .908, .912, 9.0, 9.4, M.kBronze, nc);
  solid(7.6, 8.2, 8.1, 8.7, 2.2); solid(7.6, 8.2, 8.7, 11.5, .9);

  /* ---- stair-wall run, z 7.5-8.1: tall pull-out pantry and corner filler; fronts face +z */
  plinth(6.7, 8.2, 7.5, 8.06);
  box(6.7, 8.2, .1, 2.2, 7.5, 8.08, M.kUp);
  [[6.7, 7.15], [7.15, 7.6]].forEach(u => { fx(8.1, 1, u[0], u[1], .1, .6, M.kUp, false); fx(8.1, 1, u[0], u[1], .6, 2.2, M.kUp, false); });   // pull-out pantry
  fx(8.1, 1, 7.6, 8.2, .1, 2.2, M.kUp, false);                                                        // blind corner filler
  solid(6.7, 8.2, 7.5, 8.1, 2.2);

  /* ---- front-wall run, z 10.9-11.5, under the window; fronts face -z */
  plinth(5.2, 7.6, 10.94, 11.5);
  box(5.2, 5.85, .1, 2.2, 10.92, 11.5, M.kUp);
  fx(10.9, -1, 5.2, 5.85, .1, .7, M.kUp, false); fx(10.9, -1, 5.2, 5.85, .7, 2.2, M.kUp, false);        // integrated fridge-freezer behind matching fronts
  box(5.85, 7.6, .1, .86, 10.92, 11.5, M.kPlinth, nc);
  fx(10.9, -1, 5.85, 6.45, .1, .86, M.kLow, true);                                                     // dishwasher front, between fridge and sink
  fx(10.9, -1, 6.45, 6.74, .1, .86, M.kLow, false); fx(10.9, -1, 6.76, 7.05, .1, .86, M.kLow, false); // sink base doors (waste sorting inside)
  fx(10.9, -1, 7.05, 7.6, .1, .48, M.kLow, true); fx(10.9, -1, 7.05, 7.6, .48, .86, M.kLow, true);    // corner pull-out
  box(5.85, 6.5, .86, .9, 10.885, 11.5, M.kStone); box(7.0, 7.6, .86, .9, 10.885, 11.5, M.kStone);
  box(6.5, 7.0, .86, .9, 10.885, 10.96, M.kStone); box(6.5, 7.0, .86, .9, 11.4, 11.5, M.kStone);
  // deep under-mount sink, 0.46 x 0.41 x 0.40 m
  box(6.52, 6.98, .5, .504, 10.98, 11.38, M.steel, nc); [[6.5, 6.52, 10.96, 11.4], [6.98, 7.0, 10.96, 11.4]].forEach(q => box(q[0], q[1], .5, .9, q[2], q[3], M.steel, nc));
  box(6.5, 7.0, .5, .9, 10.96, 10.98, M.steel, nc); box(6.5, 7.0, .5, .9, 11.38, 11.4, M.steel, nc);
  // bronze faucet
  cyl(6.75, .9, 1.2, 11.43, .013, M.kBronze); box(6.742, 6.758, 1.19, 1.21, 11.2, 11.43, M.kBronze, nc); cyl(6.75, 1.17, 1.19, 11.21, .012, M.kBronze, nc); box(6.8, 6.83, .9, .96, 11.43, 11.45, M.kBronze, nc);
  solid(5.2, 5.85, 10.9, 11.5, 2.2); solid(5.85, 7.6, 10.9, 11.5, .9);

  /* ---- wall units over the outside-wall run, y 1.45-2.2, fronts at x 7.85. Hood cabinet over the hob, then glass / ivory / glass. */
  const upBody = (z0, z1) => box(7.87, 8.2, 1.45, 2.2, z0, z1, M.kPlinth);
  upBody(8.7, 9.7); fz(7.85, -1, 8.7, 9.7, 1.45, 2.2, M.kUp, false);
  box(7.847, 7.85, 1.47, 1.495, 8.76, 9.64, M.kPlinth, nc); box(7.848, 7.85, 1.47, 1.474, 8.76, 9.64, M.kBronze, nc);                                // concealed telescopic hood, flush when closed
  upBody(10.3, 10.9); fz(7.85, -1, 10.3, 10.9, 1.45, 2.2, M.kUp, false);
  const glassUnit = (z0, z1) => {
    const t = .018;
    box(8.17, 8.2, 1.45, 2.2, z0, z1, M.kUp); box(7.87, 8.2, 1.45, 1.468, z0, z1, M.kUp); box(7.87, 8.2, 2.182, 2.2, z0, z1, M.kUp);
    box(7.87, 8.2, 1.45, 2.2, z0, z0 + t, M.kUp); box(7.87, 8.2, 1.45, 2.2, z1 - t, z1, M.kUp);
    [1.72, 1.95].forEach(y => box(7.88, 8.17, y, y + .018, z0 + t, z1 - t, M.kOak, nc));
    box(7.9, 8.12, 2.16, 2.176, z0 + .04, z1 - .04, M.led, nc);                                                                                           // 2700-3000 K strip inside, under the top
    box(7.848, 7.862, 1.47, 2.18, z0 + .02, z1 - .02, M.kGlassB, nc);                                                                                     // bronze-tinted glass
    box(7.845, 7.87, 1.45, 2.2, z0, z0 + .02, M.kBronze, nc); box(7.845, 7.87, 1.45, 2.2, z1 - .02, z1, M.kBronze, nc);                                   // slim champagne frame
    box(7.845, 7.87, 1.45, 1.47, z0, z1, M.kBronze, nc); box(7.845, 7.87, 2.18, 2.2, z0, z1, M.kBronze, nc);
    const zc = (z0 + z1) / 2;
    cyl(8.02, 1.468, 1.56, zc - .09, .032, M.ceramic, { rTop: .04, cast: false }); cyl(8.02, 1.468, 1.52, zc + .08, .04, M.ceramicAlt, { rTop: .05, cast: false });
    cyl(8.0, 1.738, 1.84, zc, .03, M.ceramic, { rTop: .026, cast: false }); box(7.95, 8.1, 1.738, 1.8, zc - .22, zc - .17, M.kGreige, nc);
    cyl(8.02, 1.968, 2.06, zc + .1, .034, M.ceramic, { rTop: .05, cast: false }); cyl(8.04, 1.968, 2.02, zc - .1, .04, M.ceramicAlt, nc);
  };
  glassUnit(9.7, 10.3); glassUnit(10.9, 11.5);
  box(7.88, 8.17, 1.435, 1.445, 9.72, 11.48, M.led, nc);                                                                                                   // under-cabinet LED, 3000 K

  /* ---- island: top x 5.85-6.625 (overhang 0.31 on the hall side), body x 6.16-6.61, z 8.65-9.90, top at 0.90 m */
  box(6.18, 6.59, 0, .1, 8.67, 9.88, M.kPlinth, nc);
  box(6.18, 6.59, .1, .86, 8.67, 9.88, M.kLow);
  fz(6.61, 1, 8.65, 9.275, .1, .48, M.kLow, true); fz(6.61, 1, 8.65, 9.275, .48, .86, M.kLow, true);                                                       // four drawers on the cooking side
  fz(6.61, 1, 9.275, 9.9, .1, .48, M.kLow, true); fz(6.61, 1, 9.275, 9.9, .48, .86, M.kLow, true);
  fx(9.9, 1, 6.16, 6.61, .1, .86, M.kLow, true);                                                                                                           // closed door on the sink end
  fx(8.65, -1, 6.16, 6.61, .1, .78, M.kLow, true); box(6.19, 6.58, .79, .8, 8.646, 8.65, M.kPlinth, nc);                                                  // north end: pull-out leaf stored in the slot under the top
  fz(6.16, -1, 8.65, 9.9, .1, .86, M.kLow, false);                                                                                                         // hall side under the overhang
  soft(5.85, 6.625, .86, .9, 8.65, 9.9, M.kStone, .016, { corner: .1 });
  [8.85, 9.7].forEach(z => box(5.9, 6.16, .835, .857, z - .012, z + .012, M.kBronze, nc));                                                                 // two slim bronze brackets
  box(6.11, 6.14, .846, .856, 8.72, 9.83, M.led, nc);                                                                                                      // warm strip under the overhang
  solid(6.16, 6.625, 8.65, 9.9, .9); solid(5.85, 6.16, 8.65, 9.9, .9, .84);
  // two stools tucked fully under the overhang (seat 0.30 m round, 0.65 m high)
  [9.1, 9.65].forEach(z => { const x = 6.0;
    cyl(x, .62, .65, z, .15, M.kOak, { seg: 28 }); cyl(x, .65, .665, z, .14, M.kGreige, { seg: 28, cast: false });
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => box(x + q[0] * .085 - .01, x + q[0] * .085 + .01, 0, .62, z + q[1] * .085 - .01, z + q[1] * .085 + .01, M.kOak, nc));
    box(x - .1, x + .1, .22, .23, z - .005, z + .005, M.kBronze, nc); box(x - .005, x + .005, .22, .23, z - .1, z + .1, M.kBronze, nc); });
  cyl(6.4, .9, .95, 9.4, .09, M.ceramic, { rTop: .12, cast: false });

  /* ---- light: two pendants over the island, a few soft downlights, accent over the glass units */
  [9.1, 9.65].forEach(z => { cyl(6.4, 1.52, 1.7, z, .11, M.kBronze, { rTop: .03, seg: 24 }); cyl(6.4, 1.51, 1.52, z, .09, M.glow, nc); halo(6.4, 1.5, z, .7); cyl(6.4, 1.7, H, z, .004, M.metal, { parent: roof, cast: false }); });
  art('z', 5.2, 1, 9.3, 10.0, 1.2, 1.95, 8);
  [[6.1, 8.3], [6.2, 10.4]].forEach(p => downlight(p[0], p[1]));
  fill(6.5, 2.3, 9.5, .7, 7); fill(7.95, 1.9, 10.6, .3, 2.4);
})();
