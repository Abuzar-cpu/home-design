/* ------------------------------------------------ porch, steps, exterior */
box(0, 5.7, GROUND, -.006, 11.9, 13.6, M.plinth); solid(0, 5.7, 11.9, 13.6, 0, GROUND);
floorPlane(0, 5.7, 11.9, 13.6, 0, M.stoneFloor, 1.2);
for (let k = 1; k <= 8; k++) box(5.7 + (k - 1) * .3, 5.7 + k * .3, GROUND, -k * RISE, 11.9, 13.4, M.stone);
[[0, .4, 0], [2.9, 3.1, 0], [5.7, 5.9, GROUND], [8.2, 8.6, GROUND]].forEach(c => box(c[0], c[1], c[2], H, 13.4, 13.6, M.wall, { solid: true }));
wall('x', 13.4, 13.6, .4, 2.9, []);                                       // storage front wall
wall('x', 13.4, 13.6, 3.1, 5.7, [win(3.1, 5.7, 1)]);                      // porch: one window the full length of its front wall
wall('z', 0, .2, 11.9, 13.4, []);                                         // storage side wall
wall('z', 2.9, 3.1, 11.9, 13.4, [door(12.05, 12.85, 'a1', -1)]);          // storage / porch, door opens into the storage
slant(5.9, -RISE + .95, 8.1, GROUND + .95, 13.45, M.metal);
for (let k = 0; k < 5; k++) { const x = 5.95 + k * .53; box(x - .012, x + .012, floorH(x, 12.5), -RISE + .95 - (x - 5.9) / 2.2 * (8 * RISE), 13.44, 13.46, M.metal, { cast: false }); }
solid(5.9, 8.2, 13.4, 13.5, 1.0, GROUND);
box(0, 8.6, H, H + .3, 11.9, 13.6, M.wall, { parent: roof });                 // balcony slab over the porch
box(0, 8.6, H - .025, H, 11.9, 13.6, M.woodB, { parent: roof, cast: false }); // timber soffit
// top ceiling and roof
box(0, 8.6, 5.9, 6.0, 0, 11.9, M.ceil, { parent: roofTop });
box(-.4, 9.0, 5.96, 6.05, -.4, 14.0, M.roofDark, { parent: roofTop });
(function () {
  const A = [-.4, 6.05, -.4], B = [9, 6.05, -.4], C = [9, 6.05, 14], D = [-.4, 6.05, 14], R1 = [4.3, 7.7, 4.3], R2 = [4.3, 7.7, 9.3], pos = [];
  const tri = (a, b, c) => { const ny = (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]); (ny >= 0 ? [a, b, c] : [a, c, b]).forEach(v => pos.push(v[0], v[1], v[2])); };
  tri(A, B, R1); tri(B, C, R2); tri(B, R2, R1); tri(C, D, R2); tri(D, A, R1); tri(D, R1, R2);
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
  const m = new THREE.Mesh(g, M.roofDark); m.castShadow = true; roofTop.add(m);
})();
(function () {   // site
  const g = new THREE.Mesh(new THREE.CircleGeometry(220, 48), M.lawn); g.rotation.x = -Math.PI / 2; g.position.y = GROUND; g.receiveShadow = true; scene.add(g);
  floorPlane(7.4, 14.2, 11.2, 18.4, GROUND + .02, M.stoneFloor, 1.2);
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(400, 24, 16), new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, depthWrite: false, toneMapped: false })));
  [[-8, -3, 1.2], [-7, 14, 1.1], [3, -8, 1.4], [12, -5, 1.3], [15, 6, 1.5]].forEach(t => {
    cyl(t[0], GROUND, GROUND + 2.2 * t[2], t[1], .16 * t[2], M.trunk, { seg: 8 });
    const f = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7 * t[2], 2), M.plant); f.position.set(t[0], GROUND + 3.3 * t[2], t[1]); f.castShadow = true; scene.add(f);
  });
})();

