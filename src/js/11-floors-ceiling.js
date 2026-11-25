/* ----------------------------------------------------- floors and ceiling */
floorPlane(0, 8.6, 0, 11.9, 0, M.floor, 2.4);
floorPlane(.4, 3.6, 8.8, 11.5, .004, M.tile, 1.2);      // bathroom, WC, lobby
floorPlane(3.6, 5.0, 10.3, 11.9, .004, M.tile, 1.2);    // entry
floorPlane(5.0, 8.2, 7.5, 11.5, .004, M.kFloor, 1.2);    // kitchen: its own cream 60 x 120 tiles
box(0, 8.6, GROUND, -.01, 0, 11.9, M.plinth); solid(0, 8.6, 0, 11.9, 0, GROUND);
[[0, 8.6, 0, 4.6], [0, 5.2, 4.6, 7.3], [8.2, 8.6, 4.6, 7.3], [0, 8.6, 7.3, 11.9]].forEach(c => box(c[0], c[1], H, H + .3, c[2], c[3], M.ceil, { parent: roof }));

