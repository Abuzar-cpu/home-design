/* --------------------------------------------------------- hall 1.4 x 6.9 */
// runner; bench with a cushion along the hall wall, two baskets under it
box(3.92, 4.68, 0, 0.012, 5.0, 9.9, M.runner, { cast: false });
box(3.62, 3.97, 0.4, 0.44, 8.9, 10.1, M.woodA);
legs(3.66, 3.93, 8.95, 10.05, 0.4, M.metal);
soft(3.63, 3.96, 0.44, 0.5, 8.92, 10.08, M.cushion, 0.025);
pillow(3.74, 0.66, 9.1, 0.12, 0.34, 0.36, M.accent1, { rz: -0.25 });
solid(3.6, 3.97, 8.9, 10.1, 0.5);
cyl(3.79, 0.02, 0.26, 9.25, 0.13, M.woodB, { rTop: 0.15 });
cyl(3.79, 0.02, 0.26, 9.75, 0.13, M.woodB, { rTop: 0.15 });
// coat rail with hooks, a coat and a hat above the bench
box(3.6, 3.625, 1.7, 1.74, 8.95, 10.05, M.metal, { cast: false });
[9.1, 9.4, 9.7, 9.95].forEach(z => box(3.625, 3.69, 1.7, 1.73, z - 0.012, z + 0.012, M.metal, { cast: false }));
soft(3.63, 3.72, 1.22, 1.7, 9.26, 9.54, M.accent2, 0.03, { cast: false });
cyl(3.69, 1.74, 1.75, 9.95, 0.14, M.accent3, { cast: false });
cyl(3.69, 1.75, 1.83, 9.95, 0.08, M.accent3, { cast: false });
// round mirror on the opposite wall
(function () {
  const mm = new THREE.Mesh(new THREE.CircleGeometry(0.38, 40), M.mirror);
  mm.rotation.y = -Math.PI / 2;
  mm.position.set(4.99, 1.5, 9.5);
  scene.add(mm);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.014, 8, 48), M.metal);
  ring.rotation.y = Math.PI / 2;
  ring.position.set(4.988, 1.5, 9.5);
  scene.add(ring);
})();
// umbrella stand by the front door
cyl(4.86, 0, 0.5, 10.25, 0.085, M.metal, { rTop: 0.1 });
cyl(4.84, 0.1, 0.85, 10.24, 0.012, M.accent3, { cast: false });
cyl(4.88, 0.1, 0.8, 10.27, 0.012, M.kick, { cast: false });
// pictures on the hall wall
art('z', 3.6, 1, 6.3, 6.9, 1.2, 1.95, 3);
art('z', 3.6, 1, 7.3, 7.9, 1.2, 1.95, 4);
// nook under the upper flight
// reading nook: built-in bench with drawers, shelves and a reading light; storage unit at the low end
box(5.3, 6.45, 0, 0.08, 6.86, 7.28, M.kick, { cast: false });
box(5.3, 6.45, 0.08, 0.42, 6.82, 7.3, M.cabinetUp);
[5.875].forEach(x => box(x - 0.002, x + 0.002, 0.1, 0.4, 6.815, 6.82, M.kick, { cast: false }));
[5.59, 6.16].forEach(x => box(x - 0.07, x + 0.07, 0.3, 0.315, 6.805, 6.82, M.metalAccent, { cast: false }));
soft(5.32, 6.43, 0.42, 0.52, 6.84, 7.28, M.cushion, 0.04);
soft(5.36, 5.88, 0.5, 0.9, 7.14, 7.29, M.cushion, 0.06, { rx: -0.08 });
soft(5.9, 6.42, 0.5, 0.9, 7.14, 7.29, M.cushion, 0.06, { rx: -0.08 });
pillow(5.55, 0.68, 7.06, 0.36, 0.34, 0.12, M.accent1, { rx: -0.25 });
pillow(6.24, 0.68, 7.06, 0.34, 0.32, 0.12, M.accent2, { rx: -0.25, ry: -0.2 });
soft(5.34, 5.62, 0.52, 0.56, 6.86, 7.12, M.accent3, 0.015, { cast: false });
bookStack(6.2, 0.52, 6.96, 2, 46);
cyl(6.36, 0.52, 0.6, 6.94, 0.04, M.ceramicAlt, { cast: false });
solid(5.3, 6.45, 6.82, 7.3, 0.92);
// storage unit: two cupboard doors and an open bookshelf above the bench end
box(6.45, 7.0, 0, 1.78, 5.8, 6.8, M.cabinetUp);
box(6.448, 6.452, 0.02, 1.76, 6.298, 6.302, M.kick, { cast: false });
[6.22, 6.38].forEach(z => box(6.43, 6.45, 0.85, 1.15, z - 0.01, z + 0.01, M.metalAccent, { cast: false }));
box(6.95, 7.0, 0, 1.78, 6.8, 7.3, M.cabinetUp);
box(6.45, 7.0, 0, 1.78, 6.8, 6.82, M.cabinetUp);
box(6.45, 7.0, 0, 1.78, 7.28, 7.3, M.cabinetUp);
box(6.45, 7.0, 1.76, 1.78, 6.8, 7.3, M.cabinetUp);
[0.0, 0.45, 0.9, 1.33].forEach(y => box(6.47, 6.95, y, y + 0.025, 6.82, 7.28, M.cabinetUp, { cast: false }));
books(6.55, 6.9, 0.475, 6.86, 7.12, 47, true);
soft(6.58, 6.92, 0.925, 1.13, 6.88, 7.24, M.towel, 0.03, { cast: false });
books(6.55, 6.9, 1.355, 6.86, 7.05, 48, true);
cyl(6.72, 1.355, 1.5, 7.17, 0.05, M.ceramic, { rTop: 0.035 });
solid(6.45, 7.0, 5.8, 7.3, 1.78);
// shelves, art and a reading light on the wall behind the bench
art('x', 7.3, -1, 5.62, 6.18, 0.98, 1.45, 9);
box(5.3, 6.45, 1.6, 1.625, 7.08, 7.3, M.woodA);
box(5.32, 6.43, 1.595, 1.6, 7.1, 7.28, M.led, { cast: false });
books(5.38, 5.95, 1.625, 7.1, 7.28, 101);
cyl(6.1, 1.625, 1.75, 7.19, 0.05, M.ceramicAlt, { rTop: 0.04 });
cyl(6.32, 1.625, 1.7, 7.19, 0.045, M.ceramic, { cast: false });
for (let i = 0; i < 6; i++)
  leaf(6.32, 1.69, 7.19, i * 1.1, 0.6 + (i % 3) * 0.25, 0.12, 0.05, i % 2 ? M.plant : M.plantDark);
box(5.3, 6.0, 1.98, 2.005, 7.08, 7.3, M.woodA);
cyl(5.45, 2.005, 2.2, 7.19, 0.055, M.ceramic, { rTop: 0.04 });
bookStack(5.75, 2.005, 7.19, 2, 49);
box(5.36, 5.38, 1.2, 1.42, 7.27, 7.3, M.metal, { cast: false });
box(5.36, 5.38, 1.37, 1.39, 7.08, 7.27, M.metal, { cast: false });
cyl(5.37, 1.22, 1.37, 7.08, 0.07, M.glow, { rTop: 0.045, cast: false });
halo(5.37, 1.3, 7.06, 0.7);
// rug in front of the nook, its fill light
box(5.4, 6.3, 0, 0.016, 6.12, 6.78, M.rugGuest, { cast: false });
fill(5.75, 1.45, 6.6, 0.25, 3.5);
// hall ceiling lights and fill
[5.4, 7.6, 9.6, 11.0].forEach(z => downlight(4.3, z));
downlight(2.8, 11.0);
fill(4.3, 2.3, 8.2, 0.45, 7);
fill(6.6, 2.4, 6.6, 0.35, 6);
