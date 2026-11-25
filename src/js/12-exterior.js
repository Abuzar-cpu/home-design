/* ------------------------------------------ porch, entrance stair, exterior */
// porch floor and the porch-level entrance under the balcony: plinth down to the garden, its collider and paving
box(0, 8.2, GROUND, -0.006, 11.9, 13.6, M.plinth);
solid(0, 8.2, 11.9, 13.6, 0, GROUND);
floorPlane(0, 8.2, 11.9, 13.6, 0, M.stoneFloor, 1.2);
// Fan-shaped entrance stair in front of the porch: 8 tapered treads (9 risers of RISE) on a curve that sweeps up
// and to the right into the entrance under the balcony. Centreline: quadratic curve from the top (6.65, 13.6)
// through (6.65, 15.0) to the foot (5.6, 16.2), 2.87 m long, about 0.36 m going on it; the stair widens from
// 1.5 m at the top to 2.8 m at the foot and each riser bows slightly downhill. FAN[k] = { pts: plan polygon, top }
// for tread k (0 at the top); FAN_L and FAN_R are the inner (left) and outer (right) edges, top to foot.
const FAN = [],
  FAN_L = [],
  FAN_R = [];
(function () {
  const T = [6.65, 13.6],
    Q = [6.65, 15.0],
    B = [5.6, 16.2],
    N = 8;
  const P = t => [0, 1].map(i => (1 - t) * (1 - t) * T[i] + 2 * t * (1 - t) * Q[i] + t * t * B[i]);
  const D = t => {
    const d = [0, 1].map(i => 2 * (1 - t) * (Q[i] - T[i]) + 2 * t * (B[i] - Q[i])),
      l = Math.hypot(d[0], d[1]);
    return [d[0] / l, d[1] / l];
  };
  // nine points across the riser at t, left edge first; the top riser lies straight on the porch edge
  const riser = t => {
    const out = [];
    if (!t) {
      for (let i = 0; i < 9; i++) out.push([5.9 + (1.5 * i) / 8, 13.6]);
      return out;
    }
    const p = P(t),
      d = D(t),
      w = 1.5 + 1.3 * t,
      sag = 0.07 * w;
    for (let i = 0; i < 9; i++) {
      const s = -1 + i / 4,
        bow = sag * (1 - s * s);
      out.push([p[0] + (d[1] * s * w) / 2 + d[0] * bow, p[1] - (d[0] * s * w) / 2 + d[1] * bow]);
    }
    return out;
  };
  const R = [];
  for (let k = 0; k <= N; k++) R.push(riser(k / N));
  for (let k = 0; k < N; k++) FAN.push({ pts: R[k].concat(R[k + 1].slice().reverse()), top: -(k + 1) * RISE });
  R.forEach(r => {
    FAN_L.push(r[0]);
    FAN_R.push(r[8]);
  });
})();
// height of the fan stair tread under (x, z), or null off the stair
function fanH(x, z) {
  if (x < 4.4 || x > 7.6 || z < 13.6 || z > 17.3) return null;
  for (let k = 0; k < FAN.length; k++) {
    const p = FAN[k].pts;
    let inside = false;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++)
      if (p[i][1] > z !== p[j][1] > z && x < ((p[j][0] - p[i][0]) * (z - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0])
        inside = !inside;
    if (inside) return FAN[k].top;
  }
  return null;
}
// travertine-look treads, each a solid block down to the garden
FAN.forEach(f => prism(f.pts, GROUND, f.top, M.travertine));
// bronze handrails on both curved edges, 0.9 m above the nosings, on posts at every other riser; the edges are
// lined with small colliders so the walker can only leave the stair at the foot or the top
[FAN_L, FAN_R].forEach(E => {
  const rail = E.map((p, k) => new THREE.Vector3(p[0], -k * RISE + 0.9, p[1]));
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rail), 48, 0.022, 10), M.bronze);
  m.castShadow = true;
  scene.add(m);
  E.forEach((p, k) => {
    if (k % 2 === 0) cyl(p[0], -Math.min(k + 1, 8) * RISE, -k * RISE + 0.9, p[1], 0.016, M.bronze);
    if (k === E.length - 1) return;
    const q = E[k + 1],
      n = Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / 0.1);
    for (let i = 0; i < n; i++) {
      const x = p[0] + ((q[0] - p[0]) * i) / n,
        z = p[1] + ((q[1] - p[1]) * i) / n;
      solid(x - 0.03, x + 0.03, z - 0.03, z + 0.03, 1.0 - k * RISE, GROUND);
    }
  });
});
// guard along the entrance edge from the top of the stair to the corner column
box(7.4, 8.2, 0.88, 0.92, 13.58, 13.62, M.bronze);
[7.8].forEach(x => cyl(x, 0, 0.9, 13.6, 0.016, M.bronze));
box(7.42, 8.2, 0.05, 0.86, 13.595, 13.605, M.glass, { cast: false, recv: false });
solid(7.4, 8.2, 13.55, 13.65, 1.0, GROUND);
// plinth walls under the porch
[
  [0, 0.4, 0],
  [2.9, 3.1, 0],
  [5.7, 5.9, GROUND],
  [8.2, 8.6, GROUND]
].forEach(c => box(c[0], c[1], c[2], H, 13.4, 13.6, M.wall, { solid: true }));
wall('x', 13.4, 13.6, 0.4, 2.9, []); // storage front wall
wall('x', 13.4, 13.6, 3.1, 5.7, [win(3.1, 5.7, 1)]); // porch: one window the full length of its front wall
wall('z', 0, 0.2, 11.9, 13.4, []); // storage side wall
wall('z', 2.9, 3.1, 11.9, 13.4, [door(12.05, 12.85, 'a1', -1)]); // storage / porch, door opens into the storage
box(0, 8.6, H, H + 0.3, 11.9, 13.6, M.wall, { parent: roof }); // balcony slab over the porch
box(0, 8.6, H - 0.025, H, 11.9, 13.6, M.woodB, { parent: roof, cast: false }); // timber soffit
// top ceiling and roof
box(0, 8.6, 5.9, 6.0, 0, 11.9, M.ceil, { parent: roofTop });
box(-0.4, 9.0, 5.96, 6.05, -0.4, 14.0, M.roofDark, { parent: roofTop });
(function () {
  const A = [-0.4, 6.05, -0.4],
    B = [9, 6.05, -0.4],
    C = [9, 6.05, 14],
    D = [-0.4, 6.05, 14],
    R1 = [4.3, 7.7, 4.3],
    R2 = [4.3, 7.7, 9.3],
    pos = [];
  const tri = (a, b, c) => {
    const ny = (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]);
    (ny >= 0 ? [a, b, c] : [a, c, b]).forEach(v => pos.push(v[0], v[1], v[2]));
  };
  tri(A, B, R1);
  tri(B, C, R2);
  tri(B, R2, R1);
  tri(C, D, R2);
  tri(D, A, R1);
  tri(D, R1, R2);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, M.roofDark);
  m.castShadow = true;
  roofTop.add(m);
})();
(function () {
  // site
  const g = new THREE.Mesh(new THREE.CircleGeometry(220, 48), M.lawn);
  g.rotation.x = -Math.PI / 2;
  g.position.y = GROUND;
  g.receiveShadow = true;
  scene.add(g);
  // paving: the forecourt in front of the entrance stair and the path along the right of the house
  floorPlane(2.6, 14.2, 13.6, 19.6, GROUND + 0.02, M.stoneFloor, 1.2);
  floorPlane(8.6, 14.2, 11.2, 13.6, GROUND + 0.02, M.stoneFloor, 1.2);
  scene.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(400, 24, 16),
      new THREE.MeshBasicMaterial({
        map: skyTex,
        side: THREE.BackSide,
        fog: false,
        depthWrite: false,
        toneMapped: false
      })
    )
  );
  [
    [-8, -3, 1.2],
    [-7, 14, 1.1],
    [3, -8, 1.4],
    [12, -5, 1.3],
    [15, 6, 1.5]
  ].forEach(t => {
    cyl(t[0], GROUND, GROUND + 2.2 * t[2], t[1], 0.16 * t[2], M.trunk, { seg: 8 });
    const f = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7 * t[2], 2), M.plant);
    f.position.set(t[0], GROUND + 3.3 * t[2], t[1]);
    f.castShadow = true;
    scene.add(f);
  });
})();
