/* ---------------------------------------------------------------- helpers */
// Choose the floor the following code builds on: 1 = ground floor, 2 = upper floor.
// On the upper floor, y values passed to the helpers stay relative to that floor.
function useFloor(n) {
  const up = n === 2;
  PARENT = up ? upG : scene;
  YOFF = up ? UPPER_Y : 0;
  CEILG = up ? roofTop : roof;
  CY = YOFF;
}
// World-scaled UVs for a box: one texture repeat every s metres on every face; grain turns the
// pattern to run along each face's longer side, seed shifts it so neighbouring boxes differ.
function scaleBoxUV(g, w, h, d, s, grain, seed) {
  const uv = g.attributes.uv,
    dims = [
      [d, h],
      [d, h],
      [w, d],
      [w, d],
      [w, h],
      [w, h]
    ],
    f1 = Math.sin(seed * 12.9898) * 43758.5453,
    f2 = Math.sin(seed * 78.233) * 12345.678,
    ou = f1 - Math.floor(f1),
    ov = f2 - Math.floor(f2);
  for (let f = 0; f < 6; f++) {
    const du = dims[f][0],
      dv = dims[f][1],
      swap = grain && dv > du;
    for (let i = 0; i < 4; i++) {
      const k = f * 4 + i,
        u = (uv.getX(k) * du) / s + ou,
        v = (uv.getY(k) * dv) / s + ov;
      if (swap) uv.setXY(k, v, u);
      else uv.setXY(k, u, v);
    }
  }
}
// Box between two corners (either order). o: { cast, recv: shadows (default true), solid: also a wall
// collider, parent: group (default the current floor) }. Returns the mesh.
function box(x0, x1, y0, y1, z0, z1, mat, o) {
  o = o || {};
  let t;
  if (x0 > x1) {
    t = x0;
    x0 = x1;
    x1 = t;
  }
  if (y0 > y1) {
    t = y0;
    y0 = y1;
    y1 = t;
  }
  if (z0 > z1) {
    t = z0;
    z0 = z1;
    z1 = t;
  }
  const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
  if (mat.userData && mat.userData.s)
    scaleBoxUV(g, x1 - x0, y1 - y0, z1 - z0, mat.userData.s, mat.userData.grain, x0 * 3.1 + y0 * 5.7 + z0 * 7.3);
  const m = new THREE.Mesh(g, mat);
  m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  m.castShadow = o.cast !== false;
  m.receiveShadow = o.recv !== false;
  (o.parent || PARENT).add(m);
  if (o.solid) colliders.push({ x0, x1, z0, z1, y0: y0 + YOFF, y1: y1 + YOFF });
  return m;
}
// Box with rounded edges, for upholstery, bedding and anything meant to look soft. r = edge radius
// (default 3 cm). o: { corner: plan-corner radius, rx / ry / rz: rotations, cast, parent }.
function soft(x0, x1, y0, y1, z0, z1, mat, r, o) {
  o = o || {};
  let t;
  if (x0 > x1) {
    t = x0;
    x0 = x1;
    x1 = t;
  }
  if (y0 > y1) {
    t = y0;
    y0 = y1;
    y1 = t;
  }
  if (z0 > z1) {
    t = z0;
    z0 = z1;
    z1 = t;
  }
  const W = x1 - x0,
    Hh = y1 - y0,
    D = z1 - z0;
  r = Math.max(0.003, Math.min(r === undefined ? 0.03 : r, W / 2 - 0.002, Hh / 2 - 0.002, D / 2 - 0.002));
  const hx = (W - 2 * r) / 2,
    hz = (D - 2 * r) / 2,
    cr = Math.min(o.corner === undefined ? r : o.corner, hx, hz),
    sh = new THREE.Shape();
  sh.moveTo(-hx + cr, -hz);
  sh.lineTo(hx - cr, -hz);
  sh.quadraticCurveTo(hx, -hz, hx, -hz + cr);
  sh.lineTo(hx, hz - cr);
  sh.quadraticCurveTo(hx, hz, hx - cr, hz);
  sh.lineTo(-hx + cr, hz);
  sh.quadraticCurveTo(-hx, hz, -hx, hz - cr);
  sh.lineTo(-hx, -hz + cr);
  sh.quadraticCurveTo(-hx, -hz, -hx + cr, -hz);
  const dep = Hh - 2 * r,
    g = new THREE.ExtrudeGeometry(sh, {
      depth: dep,
      bevelEnabled: true,
      bevelThickness: r,
      bevelSize: r,
      bevelSegments: 3,
      curveSegments: 4
    });
  if (mat.userData && mat.userData.s) {
    const uv = g.attributes.uv,
      s = mat.userData.s;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / s, uv.getY(i) / s);
  }
  g.rotateX(-Math.PI / 2);
  g.translate(0, -dep / 2, 0);
  if (o.rx) g.rotateX(o.rx);
  if (o.rz) g.rotateZ(o.rz);
  if (o.ry) g.rotateY(o.ry);
  const m = new THREE.Mesh(g, mat);
  m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  m.castShadow = o.cast !== false;
  m.receiveShadow = true;
  (o.parent || PARENT).add(m);
  return m;
}
// Cushion centred at (cx, cy, cz): w wide along x, h tall, t thick along z. o as for soft().
const pillow = (cx, cy, cz, w, h, t, mat, o) =>
  soft(
    cx - w / 2,
    cx + w / 2,
    cy - h / 2,
    cy + h / 2,
    cz - t / 2,
    cz + t / 2,
    mat,
    t / 2 - 0.004,
    Object.assign({ corner: 0.07 }, o || {})
  );
// Invisible collider on the current floor from y0 (default 0) to y1: what the walker bumps into, and the
// footprint the fit checks use. Give every piece of furniture one.
function solid(x0, x1, z0, z1, y1, y0) {
  colliders.push({ x0, x1, z0, z1, y0: (y0 || 0) + YOFF, y1: y1 + YOFF });
}
// Upright cylinder at (x, z) from y0 to y1, radius r. o: { rTop: top radius (a cone), seg: sides, cast, parent }.
function cyl(x, y0, y1, z, r, mat, o) {
  o = o || {};
  const m = new THREE.Mesh(new THREE.CylinderGeometry(o.rTop === undefined ? r : o.rTop, r, y1 - y0, o.seg || 20), mat);
  m.position.set(x, (y0 + y1) / 2, z);
  m.castShadow = o.cast !== false;
  m.receiveShadow = true;
  (o.parent || PARENT).add(m);
  return m;
}
const sphG = new THREE.SphereGeometry(1, 12, 8);
// Ellipsoid centred at (x, y, z) with radii sx, sy, sz (sy and sz default to sx).
function sph(x, y, z, sx, sy, sz, mat, o) {
  o = o || {};
  const m = new THREE.Mesh(sphG, mat);
  m.position.set(x, y, z);
  m.scale.set(sx, sy === undefined ? sx : sy, sz === undefined ? sx : sz);
  m.castShadow = o.cast !== false;
  (o.parent || PARENT).add(m);
  return m;
}
// Horizontal surface at height y with a texture repeat every s metres.
function floorPlane(x0, x1, z0, z1, y, mat, s) {
  const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
  g.rotateX(-Math.PI / 2);
  const cx = (x0 + x1) / 2,
    cz = (z0 + z1) / 2,
    p = g.attributes.position,
    uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + cx) / s, (p.getZ(i) + cz) / s);
  const m = new THREE.Mesh(g, mat);
  m.position.set(cx, y, cz);
  m.receiveShadow = true;
  PARENT.add(m);
  return m;
}
// The solid parts of a wall run a0..a1, h tall, around its openings: [[a0, a1, y0, y1], ...].
function spans(a0, a1, ops, h) {
  const out = [];
  let cur = a0;
  (ops || [])
    .slice()
    .sort((p, q) => p.a0 - q.a0)
    .forEach(p => {
      if (p.a0 > cur) out.push([cur, p.a0, 0, h]);
      if (p.sill > 0) out.push([p.a0, p.a1, 0, Math.min(p.sill, h)]);
      if (p.head < h) out.push([p.a0, p.a1, p.head, h]);
      cur = p.a1;
    });
  if (a1 > cur) out.push([cur, a1, 0, h]);
  return out;
}
// Thin finish on a wall face with world-scaled UVs: axis as for wall(), face = the wall surface coordinate,
// dir = the way the face looks (+1 or -1), a0..a1 along the wall by y0..y1, texture repeat every s metres.
function vpanel(axis, face, dir, a0, a1, y0, y1, mat, s) {
  const off = face + dir * 0.005,
    P = (a, y) => (axis === 'x' ? [a, y, off] : [off, y, a]);
  const v = [P(a0, y0), P(a1, y0), P(a1, y1), P(a0, y1)],
    n = axis === 'x' ? [0, 0, dir] : [dir, 0, 0];
  const e1 = [v[1][0] - v[0][0], v[1][1] - v[0][1], v[1][2] - v[0][2]],
    e2 = [v[2][0] - v[0][0], v[2][1] - v[0][1], v[2][2] - v[0][2]];
  const c = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const ok = c[0] * n[0] + c[1] * n[1] + c[2] * n[2] > 0,
    g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([].concat.apply([], v), 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute([].concat(n, n, n, n), 3));
  g.setAttribute(
    'uv',
    new THREE.Float32BufferAttribute([a0 / s, y0 / s, a1 / s, y0 / s, a1 / s, y1 / s, a0 / s, y1 / s], 2)
  );
  g.setIndex(ok ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2]);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  PARENT.add(m);
  return m;
}
// Wall finish (tiles, panelling) on a wall face, skipping the openings in ops, up to top (default H).
function tiled(axis, face, dir, a0, a1, ops, mat, s, top) {
  spans(a0, a1, ops, top || H).forEach(q => vpanel(axis, face, dir, q[0], q[1], q[2], q[3], mat, s));
}
// Plan polygon pts [[x, z], ...] extruded from y0 to y1 (worktops and other odd shapes).
function prism(pts, y0, y1, mat) {
  const sh = new THREE.Shape();
  pts.forEach((p, i) => (i ? sh.lineTo(p[0], -p[1]) : sh.moveTo(p[0], -p[1])));
  const g = new THREE.ExtrudeGeometry(sh, { depth: y1 - y0, bevelEnabled: false });
  g.rotateX(-Math.PI / 2);
  g.translate(0, y0, 0);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = m.receiveShadow = true;
  PARENT.add(m);
  return m;
}
// 4 cm square bar from (xa, ya) to (xb, yb) in the vertical plane z (stair rails and stringers).
function slant(xa, ya, xb, yb, z, mat, parent) {
  const L = Math.hypot(xb - xa, yb - ya),
    m = new THREE.Mesh(new THREE.BoxGeometry(L, 0.04, 0.04), mat);
  m.position.set((xa + xb) / 2, (ya + yb) / 2, z);
  m.rotation.z = Math.atan2(yb - ya, xb - xa);
  m.castShadow = true;
  (parent || PARENT).add(m);
  return m;
}
