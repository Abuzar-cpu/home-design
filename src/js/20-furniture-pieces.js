/* ------------------------------------------------------ furniture pieces */
function legs(x0, x1, z0, z1, h, mat, t, y0) { t = t || .02; [[x0, z0], [x1, z0], [x0, z1], [x1, z1]].forEach(q => box(q[0] - t, q[0] + t, y0 || 0, h, q[1] - t, q[1] + t, mat || M.metal, { cast: false })); }
function chair(cx, cz, face) {     // upholstered dining chair; face = direction it looks ('n','s','e','w')
  const s = .23; soft(cx - s, cx + s, .41, .5, cz - s, cz + s, M.chairSeat, .03);
  const bx = face === 'e' ? [cx - s, cx - s + .06] : face === 'w' ? [cx + s - .06, cx + s] : [cx - s + .01, cx + s - .01];
  const bz = face === 's' ? [cz - s, cz - s + .06] : face === 'n' ? [cz + s - .06, cz + s] : [cz - s + .01, cz + s - .01];
  soft(bx[0], bx[1], .55, .9, bz[0], bz[1], M.chairSeat, .028);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => { const x = cx + q[0] * (s - .03), z = cz + q[1] * (s - .03); const back = (face === 'e' && q[0] < 0) || (face === 'w' && q[0] > 0) || (face === 's' && q[1] < 0) || (face === 'n' && q[1] > 0);
    box(x - .016, x + .016, 0, back ? .6 : .42, z - .016, z + .016, M.chairFrame, { cast: false }); });
}
function leaf(x, y, z, a, tilt, L, Wd, mat, parent) {
  const m = new THREE.Mesh(sphG, mat); m.scale.set(L / 2, .008 + L * .03, Wd / 2); m.rotation.set(0, a, tilt, 'YZX');
  const hr = Math.cos(tilt) * L / 2; m.position.set(x + Math.cos(a) * hr, y + Math.sin(tilt) * L / 2, z - Math.sin(a) * hr); m.castShadow = true; (parent || PARENT).add(m);
}
function plant(x, z, k, kind, y0, noCollide) {
  y0 = y0 || 0; const r = rng(Math.round(x * 31 + z * 17 + 5)), ph = .38 * k;
  cyl(x, y0, y0 + ph, z, .15 * k, M.ceramic, { rTop: .2 * k }); cyl(x, y0 + ph - .02, y0 + ph - .005, z, .185 * k, M.soil, { cast: false });
  if (kind === 'tree') { cyl(x, y0 + ph, y0 + ph + .75 * k, z, .016 * k, M.trunk, { seg: 6 });
    for (let i = 0; i < 16; i++) leaf(x, y0 + ph + (.3 + i * .045) * k, z, i * 2.4, .25 + r() * .5, (.3 + r() * .14) * k, (.15 + r() * .06) * k, i % 3 ? M.plant : M.plantDark); }
  else if (kind === 'snake') { for (let i = 0; i < 9; i++) { const a = r() * 6.28, d = r() * .08 * k, hh = (.45 + r() * .5) * k; const m = box(-.03 * k, .03 * k, 0, hh, -.006, .006, i % 2 ? M.plant : M.plantDark, { cast: false }); m.position.set(x + Math.cos(a) * d, y0 + ph + hh / 2 - .02, z + Math.sin(a) * d); m.rotation.set((r() - .5) * .3, a, (r() - .5) * .3); } }
  else { for (let i = 0; i < 18; i++) leaf(x, y0 + ph - .02, z, i * 2.4 + r(), .35 + r() * .9, (.26 + r() * .2) * k, (.09 + r() * .05) * k, i % 3 ? M.plant : M.plantDark); }
  if (!noCollide) solid(x - .2 * k, x + .2 * k, z - .2 * k, z + .2 * k, y0 + 1);
}
function stems(x, y, z, k, n) {      // a few branches in a vase
  const r = rng(Math.round(x * 91 + z * 53));
  for (let i = 0; i < (n || 5); i++) { const g = new THREE.Group(), a = i * 1.26 + r(), tilt = .12 + r() * .4, L = (.28 + r() * .2) * k; g.position.set(x, y, z); g.rotation.y = a;
    const st = new THREE.Mesh(new THREE.CylinderGeometry(.004, .004, L, 5), M.trunk); st.rotation.z = -tilt; st.position.set(Math.sin(tilt) * L / 2, Math.cos(tilt) * L / 2, 0); g.add(st);
    for (let j = 0; j < 3; j++) { const t = .55 + j * .2, lf = new THREE.Mesh(sphG, j % 2 ? M.plant : M.plantDark); lf.scale.set(.05 * k, .008, .025 * k); lf.position.set(Math.sin(tilt) * L * t + .03 * k * (j % 2 ? 1 : -1), Math.cos(tilt) * L * t, 0); lf.rotation.z = .5; g.add(lf); }
    PARENT.add(g); }
}
function vase(x, y, z, h, mat, withStems) { cyl(x, y, y + h, z, h * .28, mat, { rTop: h * .16 }); if (withStems) stems(x, y + h * .9, z, h * 3.2); }
function tableLamp(x, y, z, k, baseMat) { cyl(x, y, y + .2 * k, z, .055 * k, baseMat || M.ceramic, { rTop: .035 * k }); cyl(x, y + .2 * k, y + .3 * k, z, .006, M.metalAccent, { cast: false }); const s = cyl(x, y + .28 * k, y + .46 * k, z, .12 * k, M.glow, { rTop: .085 * k, cast: false }); s.receiveShadow = false; halo(x, y + .37 * k, z, 1.0 * k); }
function floorLamp(x, z) { cyl(x, 0, .025, z, .14, M.metal); cyl(x, .025, 1.5, z, .011, M.metal); const s = cyl(x, 1.48, 1.78, z, .18, M.glow, { rTop: .13, cast: false }); s.receiveShadow = false; halo(x, 1.63, z, 1.5); solid(x - .14, x + .14, z - .14, z + .14, 1.7); }
function art(axis, face, dir, a0, a1, y0, y1, i) {
  const f1 = face + dir * .028, mat = new THREE.MeshStandardMaterial({ roughness: .9, envMapIntensity: .25 }); arts.push({ mat, i });
  if (axis === 'x') box(a0, a1, y0, y1, face, f1, M.frameArt, { cast: false }); else box(face, f1, y0, y1, a0, a1, M.frameArt, { cast: false });
  const p = vpanel(axis, f1, dir, a0 + .035, a1 - .035, y0 + .035, y1 - .035, mat, 1); p.geometry.attributes.uv.set([0, 0, 1, 0, 1, 1, 0, 1]); p.receiveShadow = false;
}
function curtains(axis, face, dir, a0, a1, lo, hi) {
  lo = lo === undefined ? -1e9 : lo; hi = hi === undefined ? 1e9 : hi;      // fabric folds either side of a window
  const f0 = face + dir * .03, f1 = face + dir * .09;
  [[Math.max(a0 - .36, lo), a0 + .05], [a1 - .05, Math.min(a1 + .36, hi)]].forEach(s => { for (let a = s[0]; a < s[1] - .03; a += .066) { if (axis === 'x') soft(a, a + .06, .03, 2.56, f0, f1, M.curtain, .022, { cast: false }); else soft(f0, f1, .03, 2.56, a, a + .06, M.curtain, .022, { cast: false }); } });
  if (axis === 'x') box(Math.max(a0 - .44, lo), Math.min(a1 + .44, hi), 2.56, 2.58, face + dir * .05, face + dir * .07, M.metal, { cast: false }); else box(face + dir * .05, face + dir * .07, 2.56, 2.58, Math.max(a0 - .44, lo), Math.min(a1 + .44, hi), M.metal, { cast: false });
}
function books(x0, x1, y, z0, z1, seed, alongZ) {   // a row of upright books
  const r = rng(seed), cols = [M.accent1, M.accent2, M.accent3, M.paper, M.ceramicAlt, M.cushion, M.paper]; let a = alongZ ? z0 : x0; const end = alongZ ? z1 : x1;
  while (a < end - .05) { const w = .025 + r() * .04, h = .2 + r() * .1, m = cols[r() * cols.length | 0]; if (alongZ) box(x0, x1, y, y + h, a, a + w, m, { cast: false }); else box(a, a + w, y, y + h, z0, z1, m, { cast: false }); a += w + .003; }
}
function bookStack(x, y, z, n, seed) { const r = rng(seed), cols = [M.accent2, M.accent3, M.paper, M.accent1]; for (let i = 0; i < n; i++) { const w = .11 + r() * .03, d = .08 + r() * .02; soft(x - w, x + w, y + i * .032, y + i * .032 + .03, z - d, z + d, cols[i % cols.length], .005, { cast: false, ry: (r() - .5) * .3 }); } }
function placeSetting(x, z, side) {   // side: -1 = guest sits on the north side, +1 = south side
  cyl(x, .76, .772, z, .135, M.ceramic, { seg: 28, cast: false }); cyl(x, .772, .8, z, .085, M.ceramicAlt, { seg: 24, rTop: .095, cast: false });
  soft(x - .05, x + .05, .8, .812, z - .07, z + .07, M.accent2, .004, { cast: false });
  box(x - .185, x - .173, .76, .764, z - .09, z + .09, M.metalAccent, { cast: false }); box(x + .173, x + .185, .76, .764, z - .09, z + .09, M.metalAccent, { cast: false });
  const gz = z - side * .16; cyl(x + .15, .76, .765, gz, .03, M.glassObj, { cast: false }); cyl(x + .15, .765, .82, gz, .004, M.glassObj, { cast: false }); cyl(x + .15, .82, .9, gz, .028, M.glassObj, { rTop: .038, cast: false });
}
function downlight(x, z) { const d = cyl(x, CY + H - .012, CY + H - .002, z, .06, M.led, { parent: CEILG, cast: false }); d.receiveShadow = false; halo(x, CY + H - .04, z, .5, CEILG); }
function fill(x, y, z, i, dist) { const l = new THREE.PointLight(0xffe6c4, i, dist || 8, 1.6); l.userData.base = i; l.userData.lv = YOFF ? 2 : 1; l.position.set(x, y, z); PARENT.add(l); fills.push(l); }

