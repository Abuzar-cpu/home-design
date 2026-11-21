/* ------------------------------------------------------ furniture pieces */
// Four square legs under the corners of x0..x1 by z0..z1, from y0 (default 0) up to h; t = half-thickness (default 2 cm).
function legs(x0, x1, z0, z1, h, mat, t, y0) {
  t = t || 0.02;
  [
    [x0, z0],
    [x1, z0],
    [x0, z1],
    [x1, z1]
  ].forEach(q => box(q[0] - t, q[0] + t, y0 || 0, h, q[1] - t, q[1] + t, mat || M.metal, { cast: false }));
}
function chair(cx, cz, face) {
  // upholstered dining chair; face = direction it looks ('n','s','e','w')
  const s = 0.23;
  soft(cx - s, cx + s, 0.41, 0.5, cz - s, cz + s, M.chairSeat, 0.03);
  const bx =
    face === 'e' ? [cx - s, cx - s + 0.06] : face === 'w' ? [cx + s - 0.06, cx + s] : [cx - s + 0.01, cx + s - 0.01];
  const bz =
    face === 's' ? [cz - s, cz - s + 0.06] : face === 'n' ? [cz + s - 0.06, cz + s] : [cz - s + 0.01, cz + s - 0.01];
  soft(bx[0], bx[1], 0.55, 0.9, bz[0], bz[1], M.chairSeat, 0.028);
  [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1]
  ].forEach(q => {
    const x = cx + q[0] * (s - 0.03),
      z = cz + q[1] * (s - 0.03);
    const back =
      (face === 'e' && q[0] < 0) ||
      (face === 'w' && q[0] > 0) ||
      (face === 's' && q[1] < 0) ||
      (face === 'n' && q[1] > 0);
    box(x - 0.016, x + 0.016, 0, back ? 0.6 : 0.42, z - 0.016, z + 0.016, M.chairFrame, { cast: false });
  });
}
// One leaf from (x, y, z): heading a (radians), tilted up by tilt, L long, Wd wide.
function leaf(x, y, z, a, tilt, L, Wd, mat, parent) {
  const m = new THREE.Mesh(sphG, mat);
  m.scale.set(L / 2, 0.008 + L * 0.03, Wd / 2);
  m.rotation.set(0, a, tilt, 'YZX');
  const hr = (Math.cos(tilt) * L) / 2;
  m.position.set(x + Math.cos(a) * hr, y + (Math.sin(tilt) * L) / 2, z - Math.sin(a) * hr);
  m.castShadow = true;
  (parent || PARENT).add(m);
}
// Potted plant at (x, z) standing on y0 (default 0), scaled by k. kind: 'tree', 'snake' or anything else for a
// bush. Adds a collider unless noCollide.
function plant(x, z, k, kind, y0, noCollide) {
  y0 = y0 || 0;
  const r = rng(Math.round(x * 31 + z * 17 + 5)),
    ph = 0.38 * k;
  cyl(x, y0, y0 + ph, z, 0.15 * k, M.ceramic, { rTop: 0.2 * k });
  cyl(x, y0 + ph - 0.02, y0 + ph - 0.005, z, 0.185 * k, M.soil, { cast: false });
  if (kind === 'tree') {
    cyl(x, y0 + ph, y0 + ph + 0.75 * k, z, 0.016 * k, M.trunk, { seg: 6 });
    for (let i = 0; i < 16; i++)
      leaf(
        x,
        y0 + ph + (0.3 + i * 0.045) * k,
        z,
        i * 2.4,
        0.25 + r() * 0.5,
        (0.3 + r() * 0.14) * k,
        (0.15 + r() * 0.06) * k,
        i % 3 ? M.plant : M.plantDark
      );
  } else if (kind === 'snake') {
    for (let i = 0; i < 9; i++) {
      const a = r() * 6.28,
        d = r() * 0.08 * k,
        hh = (0.45 + r() * 0.5) * k;
      const m = box(-0.03 * k, 0.03 * k, 0, hh, -0.006, 0.006, i % 2 ? M.plant : M.plantDark, { cast: false });
      m.position.set(x + Math.cos(a) * d, y0 + ph + hh / 2 - 0.02, z + Math.sin(a) * d);
      m.rotation.set((r() - 0.5) * 0.3, a, (r() - 0.5) * 0.3);
    }
  } else {
    for (let i = 0; i < 18; i++)
      leaf(
        x,
        y0 + ph - 0.02,
        z,
        i * 2.4 + r(),
        0.35 + r() * 0.9,
        (0.26 + r() * 0.2) * k,
        (0.09 + r() * 0.05) * k,
        i % 3 ? M.plant : M.plantDark
      );
  }
  if (!noCollide) solid(x - 0.2 * k, x + 0.2 * k, z - 0.2 * k, z + 0.2 * k, y0 + 1);
}
function stems(x, y, z, k, n) {
  // a few branches in a vase
  const r = rng(Math.round(x * 91 + z * 53));
  for (let i = 0; i < (n || 5); i++) {
    const g = new THREE.Group(),
      a = i * 1.26 + r(),
      tilt = 0.12 + r() * 0.4,
      L = (0.28 + r() * 0.2) * k;
    g.position.set(x, y, z);
    g.rotation.y = a;
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, L, 5), M.trunk);
    st.rotation.z = -tilt;
    st.position.set((Math.sin(tilt) * L) / 2, (Math.cos(tilt) * L) / 2, 0);
    g.add(st);
    for (let j = 0; j < 3; j++) {
      const t = 0.55 + j * 0.2,
        lf = new THREE.Mesh(sphG, j % 2 ? M.plant : M.plantDark);
      lf.scale.set(0.05 * k, 0.008, 0.025 * k);
      lf.position.set(Math.sin(tilt) * L * t + 0.03 * k * (j % 2 ? 1 : -1), Math.cos(tilt) * L * t, 0);
      lf.rotation.z = 0.5;
      g.add(lf);
    }
    PARENT.add(g);
  }
}
// Vase h tall standing on y, optionally with a few stems.
function vase(x, y, z, h, mat, withStems) {
  cyl(x, y, y + h, z, h * 0.28, mat, { rTop: h * 0.16 });
  if (withStems) stems(x, y + h * 0.9, z, h * 3.2);
}
// Table lamp standing on a surface at height y, scaled by k; glows at night.
function tableLamp(x, y, z, k, baseMat) {
  cyl(x, y, y + 0.2 * k, z, 0.055 * k, baseMat || M.ceramic, { rTop: 0.035 * k });
  cyl(x, y + 0.2 * k, y + 0.3 * k, z, 0.006, M.metalAccent, { cast: false });
  const s = cyl(x, y + 0.28 * k, y + 0.46 * k, z, 0.12 * k, M.glow, { rTop: 0.085 * k, cast: false });
  s.receiveShadow = false;
  halo(x, y + 0.37 * k, z, 1.0 * k);
}
// Floor lamp at (x, z), 1.78 m, with a collider.
function floorLamp(x, z) {
  cyl(x, 0, 0.025, z, 0.14, M.metal);
  cyl(x, 0.025, 1.5, z, 0.011, M.metal);
  const s = cyl(x, 1.48, 1.78, z, 0.18, M.glow, { rTop: 0.13, cast: false });
  s.receiveShadow = false;
  halo(x, 1.63, z, 1.5);
  solid(x - 0.14, x + 0.14, z - 0.14, z + 0.14, 1.7);
}
// Framed picture on a wall face (axis and face as for vpanel), a0..a1 by y0..y1; i picks the artwork.
function art(axis, face, dir, a0, a1, y0, y1, i) {
  const f1 = face + dir * 0.028,
    mat = new THREE.MeshStandardMaterial({ roughness: 0.9, envMapIntensity: 0.25 });
  arts.push({ mat, i });
  if (axis === 'x') box(a0, a1, y0, y1, face, f1, M.frameArt, { cast: false });
  else box(face, f1, y0, y1, a0, a1, M.frameArt, { cast: false });
  const p = vpanel(axis, f1, dir, a0 + 0.035, a1 - 0.035, y0 + 0.035, y1 - 0.035, mat, 1);
  p.geometry.attributes.uv.set([0, 0, 1, 0, 1, 1, 0, 1]);
  p.receiveShadow = false;
}
// Curtain folds either side of the window a0..a1 on a wall face, with a rail; lo..hi clip them at room corners.
function curtains(axis, face, dir, a0, a1, lo, hi) {
  lo = lo === undefined ? -1e9 : lo;
  hi = hi === undefined ? 1e9 : hi; // fabric folds either side of a window
  const f0 = face + dir * 0.03,
    f1 = face + dir * 0.09;
  [
    [Math.max(a0 - 0.36, lo), a0 + 0.05],
    [a1 - 0.05, Math.min(a1 + 0.36, hi)]
  ].forEach(s => {
    for (let a = s[0]; a < s[1] - 0.03; a += 0.066) {
      if (axis === 'x') soft(a, a + 0.06, 0.03, 2.56, f0, f1, M.curtain, 0.022, { cast: false });
      else soft(f0, f1, 0.03, 2.56, a, a + 0.06, M.curtain, 0.022, { cast: false });
    }
  });
  if (axis === 'x')
    box(Math.max(a0 - 0.44, lo), Math.min(a1 + 0.44, hi), 2.56, 2.58, face + dir * 0.05, face + dir * 0.07, M.metal, {
      cast: false
    });
  else
    box(face + dir * 0.05, face + dir * 0.07, 2.56, 2.58, Math.max(a0 - 0.44, lo), Math.min(a1 + 0.44, hi), M.metal, {
      cast: false
    });
}
function books(x0, x1, y, z0, z1, seed, alongZ) {
  // a row of upright books
  const r = rng(seed),
    cols = [M.accent1, M.accent2, M.accent3, M.paper, M.ceramicAlt, M.cushion, M.paper];
  let a = alongZ ? z0 : x0;
  const end = alongZ ? z1 : x1;
  while (a < end - 0.05) {
    const w = 0.025 + r() * 0.04,
      h = 0.2 + r() * 0.1,
      m = cols[(r() * cols.length) | 0];
    if (alongZ) box(x0, x1, y, y + h, a, a + w, m, { cast: false });
    else box(a, a + w, y, y + h, z0, z1, m, { cast: false });
    a += w + 0.003;
  }
}
// n books lying in a pile on a surface at height y.
function bookStack(x, y, z, n, seed) {
  const r = rng(seed),
    cols = [M.accent2, M.accent3, M.paper, M.accent1];
  for (let i = 0; i < n; i++) {
    const w = 0.11 + r() * 0.03,
      d = 0.08 + r() * 0.02;
    soft(x - w, x + w, y + i * 0.032, y + i * 0.032 + 0.03, z - d, z + d, cols[i % cols.length], 0.005, {
      cast: false,
      ry: (r() - 0.5) * 0.3
    });
  }
}
function placeSetting(x, z, side) {
  // side: -1 = guest sits on the north side, +1 = south side
  cyl(x, 0.76, 0.772, z, 0.135, M.ceramic, { seg: 28, cast: false });
  cyl(x, 0.772, 0.8, z, 0.085, M.ceramicAlt, { seg: 24, rTop: 0.095, cast: false });
  soft(x - 0.05, x + 0.05, 0.8, 0.812, z - 0.07, z + 0.07, M.accent2, 0.004, { cast: false });
  box(x - 0.185, x - 0.173, 0.76, 0.764, z - 0.09, z + 0.09, M.metalAccent, { cast: false });
  box(x + 0.173, x + 0.185, 0.76, 0.764, z - 0.09, z + 0.09, M.metalAccent, { cast: false });
  const gz = z - side * 0.16;
  cyl(x + 0.15, 0.76, 0.765, gz, 0.03, M.glassObj, { cast: false });
  cyl(x + 0.15, 0.765, 0.82, gz, 0.004, M.glassObj, { cast: false });
  cyl(x + 0.15, 0.82, 0.9, gz, 0.028, M.glassObj, { rTop: 0.038, cast: false });
}
// Recessed ceiling spot at (x, z) on the current floor (part of the ceiling group, hidden in the dollhouse).
function downlight(x, z) {
  const d = cyl(x, CY + H - 0.012, CY + H - 0.002, z, 0.06, M.led, { parent: CEILG, cast: false });
  d.receiveShadow = false;
  halo(x, CY + H - 0.04, z, 0.5, CEILG);
}
// Point light that lifts a room: intensity i (scaled by time of day), reach dist (default 8 m).
function fill(x, y, z, i, dist) {
  const l = new THREE.PointLight(0xffe6c4, i, dist || 8, 1.6);
  l.userData.base = i;
  l.userData.lv = YOFF ? 2 : 1;
  l.position.set(x, y, z);
  PARENT.add(l);
  fills.push(l);
}
