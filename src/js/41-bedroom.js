/* -------------------------------------------------------- bedroom 4.6 x 4.0 */
const softX = (cx, cy, cz, w, h, t, mat, rz) => soft(cx - t / 2, cx + t / 2, cy - h / 2, cy + h / 2, cz - w / 2, cz + w / 2, mat, t / 2 - .004, { corner: .07, rz: rz });   // cushion standing against an east or west wall
box(5.1, 8.05, 0, .014, .95, 3.85, M.rugLiving, { cast: false });
box(6.12, 8.12, .12, .3, 1.48, 3.32, M.woodA); legs(6.2, 8.05, 1.55, 3.25, .12, M.woodA, .03);
soft(6.15, 8.1, .28, .52, 1.5, 3.3, M.linen, .05); soft(6.13, 7.5, .46, .64, 1.46, 3.34, M.linen, .06); soft(7.32, 7.54, .62, .685, 1.46, 3.34, M.linen, .03);
soft(6.1, 6.7, .62, .69, 1.44, 3.36, M.accent3, .03); soft(8.08, 8.2, .1, 1.3, 1.3, 3.5, M.headboard, .05);
softX(7.92, .9, 1.95, .7, .44, .18, M.linen, -.28); softX(7.92, .9, 2.85, .7, .44, .18, M.linen, -.28);
softX(7.74, .86, 1.98, .5, .44, .15, M.accent1, -.34); softX(7.74, .86, 2.82, .5, .44, .15, M.accent2, -.34); softX(7.6, .78, 2.4, .56, .26, .13, M.accent3, -.4);
solid(6.1, 8.2, 1.46, 3.34, 1.3);
[[.98, 1.42], [3.38, 3.82]].forEach((s, i) => { box(7.75, 8.2, .1, .52, s[0], s[1], M.woodA); legs(7.8, 8.15, s[0] + .05, s[1] - .05, .1, M.metal, .015); box(7.745, 7.75, .3, .304, s[0] + .04, s[1] - .04, M.kick, { cast: false }); tableLamp(7.98, .52, (s[0] + s[1]) / 2, 1.0, i ? M.ceramicAlt : M.ceramic); solid(7.75, 8.2, s[0], s[1], .52); });
bookStack(7.86, .52, 1.12, 2, 61); vase(7.86, .52, 3.7, .14, M.ceramic, true);
soft(5.72, 6.06, .36, .45, 1.7, 3.1, M.cushion, .03); legs(5.77, 6.01, 1.76, 3.04, .36, M.metal, .015); solid(5.72, 6.06, 1.7, 3.1, .45);
box(3.61, 4.05, .1, .82, 2.45, 3.3, M.woodA); box(3.6, 4.07, .82, .85, 2.43, 3.32, M.counter); legs(3.66, 4.0, 2.5, 3.25, .1, M.metal, .015); [2.73, 3.02].forEach(z => box(4.05, 4.055, .12, .8, z - .002, z + .002, M.kick, { cast: false })); solid(3.6, 4.07, 2.43, 3.32, .85);
tableLamp(3.82, .85, 2.62, .9, M.ceramicAlt); bookStack(3.84, .85, 3.1, 3, 62); (function () { const mm = new THREE.Mesh(new THREE.CircleGeometry(.36, 40), M.mirror); mm.rotation.y = Math.PI / 2; mm.position.set(3.61, 1.55, 2.88); upG.add(mm); const ring = new THREE.Mesh(new THREE.TorusGeometry(.365, .014, 8, 48), M.metal); ring.rotation.y = Math.PI / 2; ring.position.set(3.612, 1.55, 2.88); upG.add(ring); })();
// two-door wardrobe on the back wall, facing the bedroom door (1.0 m wide, 0.6 m deep, 2.2 m tall)
box(3.6, 4.6, .08, 2.2, .4, .98, M.woodA); box(3.64, 4.56, 0, .08, .42, .94, M.kick, { cast: false });
[[3.605, 4.096], [4.104, 4.595]].forEach(d => box(d[0], d[1], .1, 2.18, .98, 1.0, M.woodA)); box(4.096, 4.104, .1, 2.18, .97, .99, M.kick, { cast: false });
[4.06, 4.14].forEach(x => { box(x - .007, x + .007, .95, 1.35, 1.0, 1.025, M.metalAccent, { cast: false }); [.99, 1.31].forEach(y => box(x - .005, x + .005, y - .01, y + .01, 1.0, 1.015, M.metalAccent, { cast: false })); });
solid(3.6, 4.6, .4, 1.0, 2.2);
floorLamp(5.3, .66); plant(7.85, .68, .85, 'tree'); curtains('x', .4, 1, 5.8, 7.4);
art('z', 8.2, -1, 1.75, 3.05, 1.5, 2.25, 10); art('x', 4.4, -1, 5.6, 6.5, 1.2, 2.0, 11); art('x', 4.4, -1, 6.7, 7.6, 1.2, 2.0, 12);
[[4.6, 1.2], [4.6, 3.2], [6.6, .9], [6.6, 3.8]].forEach(q => downlight(q[0], q[1])); fill(5.6, 2.3, 2.4, .6);

