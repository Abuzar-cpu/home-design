/* ----------------------------------------------- walk-in wardrobe 3.0 x 3.0 */
// Open wardrobe run a0..a1 along a wall at back (axis as for wall()), facing dir (+1 or -1): hanging rail,
// shelves every third bay, shoe ledge and boxes on top; seed varies the clothes.
function wardrobe(axis, a0, a1, back, dir, seed) {
  const dp = 0.56,
    B = (A0, A1, y0, y1, d0, d1, m, o) =>
      axis === 'x'
        ? box(A0, A1, y0, y1, back + dir * d0, back + dir * d1, m, o)
        : box(back + dir * d0, back + dir * d1, y0, y1, A0, A1, m, o);
  const r = rng(seed),
    cols = [M.accent1, M.accent2, M.accent3, M.linen, M.kick, M.cushion, M.sofa, M.paper, M.towel],
    nc = { cast: false };
  B(a0, a1, 0, 2.3, 0, 0.02, M.woodA);
  B(a0, a1, 0, 0.08, 0.02, dp, M.kick, nc);
  B(a0, a1, 0.08, 0.11, 0.02, dp, M.woodA, nc);
  B(a0, a1, 0.42, 0.45, 0.02, dp, M.woodA, nc);
  B(a0, a1, 1.92, 1.95, 0.02, dp, M.woodA, nc);
  B(a0, a1, 2.27, 2.3, 0.02, dp, M.woodA);
  const n = Math.max(1, Math.round((a1 - a0) / 1.0)),
    w = (a1 - a0) / n;
  for (let i = 0; i <= n; i++) {
    const a = a0 + i * w;
    B(Math.max(a0, a - 0.012), Math.min(a1, a + 0.012), 0, 2.3, 0.02, dp, M.woodA);
  }
  B(a0 + 0.02, a1 - 0.02, 1.82, 1.84, 0.27, 0.29, M.metalAccent, nc);
  B(a0 + 0.03, a1 - 0.03, 1.905, 1.915, 0.06, 0.1, M.led, nc);
  for (let i = 0; i < n; i++) {
    const s0 = a0 + i * w + 0.05,
      s1 = a0 + (i + 1) * w - 0.05;
    if (i % 3 === 2) {
      [0.82, 1.18, 1.54].forEach(y => B(s0 - 0.03, s1 + 0.03, y, y + 0.025, 0.02, dp, M.woodA, nc));
      [0.45, 0.845, 1.205, 1.565].forEach(y => {
        let a = s0 + 0.04;
        while (a < s1 - 0.2) {
          const fw = 0.2 + r() * 0.08;
          B(a, a + fw, y, y + 0.06 + r() * 0.12, 0.1, 0.46, cols[(r() * cols.length) | 0], nc);
          a += fw + 0.05;
        }
      });
    } else {
      let a = s0 + r() * 0.05;
      while (a < s1 - 0.05) {
        const len = 0.55 + r() * 0.55;
        B(a, a + 0.03, 1.8 - len, 1.8, 0.1, 0.46, cols[(r() * cols.length) | 0], nc);
        a += 0.06 + r() * 0.035;
      }
    }
    let a = s0;
    while (a < s1 - 0.22) {
      B(a, a + 0.1, 0.11, 0.2, 0.12, 0.4, i % 2 ? M.kick : M.woodB, nc);
      B(a + 0.12, a + 0.22, 0.11, 0.2, 0.12, 0.4, i % 2 ? M.kick : M.woodB, nc);
      a += 0.3;
    }
    let b = s0;
    while (b < s1 - 0.3) {
      const bw = 0.28 + r() * 0.12;
      B(b, b + bw, 1.95, 2.1 + r() * 0.1, 0.08, 0.46, r() > 0.5 ? M.ceramic : M.cushion, nc);
      b += bw + 0.06;
    }
  }
  if (axis === 'x') solid(a0, a1, Math.min(back, back + dir * dp), Math.max(back, back + dir * dp), 2.3);
  else solid(Math.min(back, back + dir * dp), Math.max(back, back + dir * dp), a0, a1, 2.3);
}
// walk-in wardrobe between the en-suite and the baby's room, off the bedroom through a doorless opening: no window, no island
wardrobe('z', 2.55, 5.45, 0.4, 1, 71);
wardrobe('z', 3.5, 5.45, 3.4, -1, 72);
// runner and a full-length mirror on the end wall
box(1.25, 2.55, 0, 0.012, 2.8, 5.25, M.runner, { cast: false });
box(1.5, 2.3, 0.05, 2.05, 5.47, 5.5, M.frameArt, { cast: false });
box(1.54, 2.26, 0.09, 2.01, 5.462, 5.47, M.mirror, { cast: false });
// ceiling lights and fill
[
  [1.9, 3.3],
  [1.9, 4.7]
].forEach(q => downlight(q[0], q[1]));
fill(1.9, 2.3, 4.0, 0.45, 5);
