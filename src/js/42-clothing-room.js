/* ----------------------------------------------- walk-in wardrobe 3.0 x 3.0 */
function wardrobe(axis, a0, a1, back, dir, seed) {     // open wardrobe run with a hanging rail, shelves and shoe ledge
  const dp = .56, B = (A0, A1, y0, y1, d0, d1, m, o) => axis === 'x' ? box(A0, A1, y0, y1, back + dir * d0, back + dir * d1, m, o) : box(back + dir * d0, back + dir * d1, y0, y1, A0, A1, m, o);
  const r = rng(seed), cols = [M.accent1, M.accent2, M.accent3, M.linen, M.kick, M.cushion, M.sofa, M.paper, M.towel], nc = { cast: false };
  B(a0, a1, 0, 2.3, 0, .02, M.woodA); B(a0, a1, 0, .08, .02, dp, M.kick, nc); B(a0, a1, .08, .11, .02, dp, M.woodA, nc); B(a0, a1, .42, .45, .02, dp, M.woodA, nc); B(a0, a1, 1.92, 1.95, .02, dp, M.woodA, nc); B(a0, a1, 2.27, 2.3, .02, dp, M.woodA);
  const n = Math.max(1, Math.round((a1 - a0) / 1.0)), w = (a1 - a0) / n;
  for (let i = 0; i <= n; i++) { const a = a0 + i * w; B(Math.max(a0, a - .012), Math.min(a1, a + .012), 0, 2.3, .02, dp, M.woodA); }
  B(a0 + .02, a1 - .02, 1.82, 1.84, .27, .29, M.metalAccent, nc); B(a0 + .03, a1 - .03, 1.905, 1.915, .06, .1, M.led, nc);
  for (let i = 0; i < n; i++) { const s0 = a0 + i * w + .05, s1 = a0 + (i + 1) * w - .05;
    if (i % 3 === 2) { [.82, 1.18, 1.54].forEach(y => B(s0 - .03, s1 + .03, y, y + .025, .02, dp, M.woodA, nc)); [.45, .845, 1.205, 1.565].forEach(y => { let a = s0 + .04; while (a < s1 - .2) { const fw = .2 + r() * .08; B(a, a + fw, y, y + .06 + r() * .12, .1, .46, cols[r() * cols.length | 0], nc); a += fw + .05; } }); }
    else { let a = s0 + r() * .05; while (a < s1 - .05) { const len = .55 + r() * .55; B(a, a + .03, 1.8 - len, 1.8, .1, .46, cols[r() * cols.length | 0], nc); a += .06 + r() * .035; } }
    let a = s0; while (a < s1 - .22) { B(a, a + .1, .11, .2, .12, .4, i % 2 ? M.kick : M.woodB, nc); B(a + .12, a + .22, .11, .2, .12, .4, i % 2 ? M.kick : M.woodB, nc); a += .3; }
    let b = s0; while (b < s1 - .3) { const bw = .28 + r() * .12; B(b, b + bw, 1.95, 2.1 + r() * .1, .08, .46, r() > .5 ? M.ceramic : M.cushion, nc); b += bw + .06; } }
  if (axis === 'x') solid(a0, a1, Math.min(back, back + dir * dp), Math.max(back, back + dir * dp), 2.3); else solid(Math.min(back, back + dir * dp), Math.max(back, back + dir * dp), a0, a1, 2.3);
}
// walk-in wardrobe between the en-suite and the baby's room, off the bedroom through a doorless opening: no window, no island
wardrobe('z', 2.55, 5.45, .4, 1, 71); wardrobe('z', 3.5, 5.45, 3.4, -1, 72);
box(1.25, 2.55, 0, .012, 2.8, 5.25, M.runner, { cast: false });
box(1.5, 2.3, .05, 2.05, 5.47, 5.5, M.frameArt, { cast: false }); box(1.54, 2.26, .09, 2.01, 5.462, 5.47, M.mirror, { cast: false });
[[1.9, 3.3], [1.9, 4.7]].forEach(q => downlight(q[0], q[1])); fill(1.9, 2.3, 4.0, .45, 5);
