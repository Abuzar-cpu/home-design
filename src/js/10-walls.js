/* ------------------------------------------------- walls, doors, windows */
function windowUnit(axis, t0, t1, p, y0, parent, ghost) {
  const c = p.out < 0 ? t0 + 0.12 : t1 - 0.12,
    d = 0.035,
    fw = 0.05,
    s = p.a0,
    e = p.a1,
    b = y0 + p.sill,
    t = y0 + p.head;
  const bar = (A0, A1, Y0, Y1) =>
    axis === 'x'
      ? box(A0, A1, Y0, Y1, c - d, c + d, M.winFrame, { parent })
      : box(c - d, c + d, Y0, Y1, A0, A1, M.winFrame, { parent });
  bar(s, e, b, b + fw);
  bar(s, e, t - fw, t);
  bar(s, s + fw, b, t);
  bar(e - fw, e, b, t);
  if (e - s > 1.2) bar((s + e) / 2 - fw / 2, (s + e) / 2 + fw / 2, b, t);
  const gm = ghost ? M.glassDark : p.frost ? M.glassFrost : M.glass,
    go = { parent, cast: false, recv: false };
  if (axis === 'x') box(s + fw, e - fw, b + fw, t - fw, c - 0.006, c + 0.006, gm, go);
  else box(c - 0.006, c + 0.006, b + fw, t - fw, s + fw, e - fw, gm, go);
  if (!ghost && p.sill > 0) {
    const inner = p.out < 0 ? t1 + 0.03 : t0 - 0.03;
    if (axis === 'x') box(s - 0.02, e + 0.02, b, b + 0.025, c, inner, M.trim, { parent });
    else box(c, inner, b, b + 0.025, s - 0.02, e + 0.02, M.trim, { parent });
  }
}
function lining(axis, t0, t1, p, parent, mat) {
  const j = 0.03,
    e = 0.015,
    hd = p.head;
  const mk2 = (A0, A1, Y0, Y1) =>
    axis === 'x'
      ? box(A0, A1, Y0, Y1, t0 - e, t1 + e, mat, { parent, cast: false })
      : box(t0 - e, t1 + e, Y0, Y1, A0, A1, mat, { parent, cast: false });
  mk2(p.a0, p.a0 + j, 0, hd);
  mk2(p.a1 - j, p.a1, 0, hd);
  mk2(p.a0, p.a1, hd - j, hd);
}
function doorUnit(axis, t0, t1, p, parent) {
  lining(axis, t0, t1, p, parent, p.front ? M.winFrame : M.trim);
  if (p.bifold) {
    // two half-width leaves, drawn folded flat beside the hinge jamb
    const lw = (p.a1 - p.a0 - 0.07) / 2,
      sg = p.hinge === 'a0' ? 1 : -1,
      base = p.hinge === 'a0' ? p.a0 + 0.035 : p.a1 - 0.035,
      top2 = p.head - 0.035;
    const g0 = p.swing > 0 ? t1 : t0 - lw,
      g1 = p.swing > 0 ? t1 + lw : t0,
      kn = p.swing > 0 ? g1 - 0.06 : g0 + 0.06;
    [0, 0.05].forEach(o2 => {
      const a = base + sg * o2,
        b = a + sg * 0.035,
        lo = Math.min(a, b),
        hi = Math.max(a, b);
      if (axis === 'x') box(lo, hi, 0.01, top2, g0, g1, M.door, { parent });
      else box(g0, g1, 0.01, top2, lo, hi, M.door, { parent });
    });
    const ka = base + sg * 0.1;
    if (axis === 'x')
      box(ka - 0.012, ka + 0.012, 0.98, 1.05, kn - 0.012, kn + 0.012, M.metalAccent, { parent, cast: false });
    else box(kn - 0.012, kn + 0.012, 0.98, 1.05, ka - 0.012, ka + 0.012, M.metalAccent, { parent, cast: false });
    return;
  }
  const w = p.a1 - p.a0 - 0.07,
    th = 0.045,
    top = p.head - 0.035,
    mat = p.glass ? M.glassFrost : p.front ? M.frontDoor : M.door;
  const hA = p.hinge === 'a0' ? p.a0 + 0.035 : p.a1 - 0.035 - th;
  const f0 = p.swing > 0 ? t1 : t0 - w,
    f1 = p.swing > 0 ? t1 + w : t0,
    hf = p.swing > 0 ? f1 - 0.1 : f0 + 0.1;
  if (axis === 'x') box(hA, hA + th, 0.01, top, f0, f1, mat, { parent });
  else box(f0, f1, 0.01, top, hA, hA + th, mat, { parent });
  [hA - 0.03, hA + th].forEach(s => {
    if (axis === 'x') box(s, s + 0.03, 1.0, 1.03, hf - 0.06, hf + 0.06, M.metalAccent, { parent, cast: false });
    else box(hf - 0.06, hf + 0.06, 1.0, 1.03, s, s + 0.03, M.metalAccent, { parent, cast: false });
  });
}
// axis 'x': wall runs along x and is t0..t1 thick in z. axis 'z': runs along z, t0..t1 thick in x.
function wall(axis, t0, t1, a0, a1, ops, o) {
  o = o || {};
  const y0 = o.y0 || 0,
    parent = o.parent || PARENT;
  spans(a0, a1, ops, H).forEach(q => {
    if (q[1] - q[0] < 1e-4 || q[3] - q[2] < 1e-4) return;
    const X0 = axis === 'x' ? q[0] : t0,
      X1 = axis === 'x' ? q[1] : t1,
      Z0 = axis === 'x' ? t0 : q[0],
      Z1 = axis === 'x' ? t1 : q[1];
    box(X0, X1, y0 + q[2], y0 + q[3], Z0, Z1, M.wall, { parent, solid: !o.ghost });
    if (q[2] === 0 && !o.ghost)
      box(X0 - 0.012, X1 + 0.012, 0, 0.08, Z0 - 0.012, Z1 + 0.012, M.trim, { parent, cast: false });
  });
  (ops || []).forEach(p => {
    if (p.kind === 'window') windowUnit(axis, t0, t1, p, y0, parent, o.ghost);
    else if (p.kind === 'door') doorUnit(axis, t0, t1, p, parent);
    else if (p.kind === 'cased') lining(axis, t0, t1, p, parent, M.trim);
  });
}
const win = (a0, a1, out, extra) => Object.assign({ a0, a1, sill: 0.9, head: 2.3, kind: 'window', out }, extra || {});
const door = (a0, a1, hinge, swing, extra) =>
  Object.assign({ a0, a1, sill: 0, head: 2.1, kind: 'door', hinge, swing }, extra || {});

// exterior, 400 mm
wall('x', 0, 0.4, 0, 8.6, [win(5.8, 7.4, -1)]); // rear (A)
wall('x', 11.5, 11.9, 0, 8.6, [door(3.8, 4.8, 'a1', -1, { front: true }), win(5.9, 7.5, 1)]); // front (F)
wall('z', 0, 0.4, 0.4, 11.5, [
  win(1.6, 3.2, -1),
  win(6.4, 8.0, -1),
  win(9.2, 9.8, -1, { sill: 1.3, head: 2.1, frost: true })
]); // left (1)
wall('z', 8.2, 8.6, 0.4, 11.5, []); // right (5)
// interior, 200 mm
wall('x', 4.4, 4.6, 0.4, 8.2, [{ a0: 3.6, a1: 4.9, sill: 0, head: 2.3, kind: 'cased' }]); // living / hall + stair
wall('z', 3.4, 3.6, 4.6, 11.5, [door(4.8, 5.7, 'a0', -1), { a0: 10.5, a1: 11.5, sill: 0, head: 2.1, kind: 'cased' }]); // hall west
wall('z', 5.0, 5.2, 7.3, 11.5, [door(7.7, 8.6, 'a0', 1)]); // hall east (kitchen): opens into the kitchen, against the stair wall
wall('x', 8.6, 8.8, 0.4, 3.4, []); // guest / wet block
wall('x', 7.3, 7.5, 5.2, 8.2, []); // stair / kitchen
wall('z', 2.0, 2.2, 8.8, 11.5, [door(10.6, 11.4, 'a1', -1)]); // bathroom / WC + lobby
wall('x', 10.3, 10.5, 2.2, 3.4, [door(2.4, 3.2, 'a1', 1, { bifold: true })]); // WC / lobby: folding door that opens out into the lobby
