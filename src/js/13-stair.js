/* ------------------------------------------------------------------ stair */
const SH = UPPER_Y / 18; // riser height
// first flight starts in the hall beside the living-room opening (z 4.6-5.8), turns on winders, second flight returns along z 6.1-7.3
for (let i = 1; i <= 7; i++) {
  const x0 = 5.2 + ((i - 1) * 1.8) / 7,
    x1 = 5.2 + (i * 1.8) / 7;
  box(x0, x1, 0, i * SH - 0.035, 4.6, 5.8, M.wall);
  box(x0 - 0.02, x1, i * SH - 0.035, i * SH, 4.6, 5.82, M.woodA);
}
// winders: three steps fanning round the turning point (plan polygons)
[
  [
    [7, 5.95],
    [7, 4.6],
    [8.2, 4.6],
    [8.2, 4.75]
  ],
  [
    [7, 5.95],
    [8.2, 4.75],
    [8.2, 5.95]
  ],
  [
    [7, 5.95],
    [8.2, 5.95],
    [8.2, 7.15]
  ],
  [
    [7, 5.95],
    [8.2, 7.15],
    [8.2, 7.3],
    [7, 7.3]
  ]
].forEach((pts, k) => {
  const top = (8 + k) * SH;
  prism(pts, 0, top - 0.035, M.wall);
  prism(pts, top - 0.035, top, M.woodA);
});
// second flight: six steps back toward the hall
for (let j = 12; j <= 17; j++) {
  const x1 = 7.0 - (j - 12) * 0.3,
    x0 = x1 - 0.3;
  box(x0, x1, j * SH - 0.26, j * SH - 0.035, 6.1, 7.3, M.wall);
  box(x0, x1 + 0.02, j * SH - 0.035, j * SH, 6.08, 7.3, M.woodA);
}
// handrails, balusters on both flights and the newel post at the turn
slant(5.2, SH + 0.92, 7.0, 8 * SH + 0.92, 5.83, M.metal);
slant(7.0, 11 * SH + 0.92, 5.2, 18 * SH + 0.92, 6.07, M.metal);
for (let i = 1; i <= 7; i++) {
  const x = 5.2 + ((i - 0.5) * 1.8) / 7;
  box(x - 0.009, x + 0.009, i * SH, i * SH + 0.92 + 0.5 * SH, 5.82, 5.84, M.metal, { cast: false });
}
for (let j = 12; j <= 17; j++) {
  const x = 7.0 - (j - 11.5) * 0.3;
  box(x - 0.009, x + 0.009, j * SH, j * SH + 0.92 + 0.5 * SH, 6.06, 6.08, M.metal, { cast: false });
}
box(6.97, 7.03, 7 * SH, 11 * SH + 0.95, 5.92, 5.98, M.metal);

// step lights: a warm LED line along the front edge of each step, with a soft wash on the riser and the step below
const STEPS = [],
  washTex = tex(
    4,
    64,
    (g, w, h) => {
      const gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(0.35, 'rgba(255,255,255,.45)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, w, h);
    },
    true
  );
const glowTex = tex(
  4,
  64,
  (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, 'rgba(255,255,255,0)');
    gr.addColorStop(0.5, 'rgba(255,255,255,1)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
  },
  true
);
function stepLed(i, P, Q, n, parent, yo, ov) {
  // i: step number 1-18, P-Q: its front edge, n: direction toward the step below, ov: nosing overhang
  const h = i * SH - yo,
    yb = (i - 1) * SH - yo,
    len = Math.hypot(Q[0] - P[0], Q[1] - P[1]) - 0.04,
    gp = new THREE.Group();
  gp.position.set((P[0] + Q[0]) / 2, 0, (P[1] + Q[1]) / 2);
  gp.rotation.y = Math.atan2(n[0], n[1]);
  ov = ov || 0;
  const strip = new THREE.MeshBasicMaterial({ color: 0x3a3836, toneMapped: false }),
    wash = new THREE.MeshBasicMaterial({
      map: washTex,
      color: 0xffb25a,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
      fog: false
    }),
    glow = new THREE.MeshBasicMaterial({
      map: glowTex,
      color: 0xffb25a,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
      fog: false
    });
  const sm = new THREE.Mesh(new THREE.BoxGeometry(len, 0.016, 0.006), strip);
  sm.position.set(0, h - 0.019, ov + 0.003);
  gp.add(sm);
  const gl = new THREE.Mesh(new THREE.PlaneGeometry(len + 0.06, 0.11), glow);
  gl.position.set(0, h - 0.019, ov + 0.0065);
  gp.add(gl);
  const tgl = new THREE.PlaneGeometry(len, 0.07);
  tgl.rotateX(-Math.PI / 2);
  const gt = new THREE.Mesh(tgl, glow);
  gt.position.set(0, h + 0.002, ov - 0.02);
  gp.add(gt);
  const hr = h - 0.036 - yb,
    rw = new THREE.Mesh(new THREE.PlaneGeometry(len, hr), wash);
  rw.position.set(0, yb + hr / 2, 0.004);
  gp.add(rw);
  const tg = new THREE.PlaneGeometry(len, 0.22);
  tg.rotateX(-Math.PI / 2);
  const tw = new THREE.Mesh(tg, wash);
  tw.position.set(0, yb + 0.004, 0.114);
  gp.add(tw);
  (parent || scene).add(gp);
  STEPS[i] = { strip, wash, glow, lvl: 0, hold: 0, gp, n, h: h + yo };
}
for (let i = 1; i <= 7; i++) {
  const x = 5.2 + ((i - 1) * 1.8) / 7;
  stepLed(i, [x, 4.6], [x, 5.8], [-1, 0], scene, 0, 0.02);
}
(function () {
  // winders: front edges run out from the turning point
  const C = [7, 5.95],
    E = [
      [
        [7, 4.6],
        [7, 5.8]
      ],
      [C, [8.2, 4.75]],
      [C, [8.2, 5.95]],
      [C, [8.2, 7.15]]
    ],
    prev = [
      [6.87, 5.2],
      [7.5, 4.95],
      [7.9, 5.35],
      [7.9, 6.55]
    ];
  E.forEach((e, k) => {
    let P = e[0],
      Q = e[1];
    if (k) {
      const dx = Q[0] - C[0],
        dz = Q[1] - C[1],
        L = Math.hypot(dx, dz);
      P = [C[0] + (dx / L) * 0.12, C[1] + (dz / L) * 0.12];
    }
    const mx = (P[0] + Q[0]) / 2,
      mz = (P[1] + Q[1]) / 2,
      dx = Q[0] - P[0],
      dz = Q[1] - P[1],
      L = Math.hypot(dx, dz);
    let n = [-dz / L, dx / L];
    if (n[0] * (prev[k][0] - mx) + n[1] * (prev[k][1] - mz) < 0) n = [-n[0], -n[1]];
    stepLed(8 + k, P, Q, n, scene, 0);
  });
})();
for (let j = 12; j <= 17; j++) {
  const x = 7.0 - (j - 12) * 0.3;
  stepLed(j, [x, 6.1], [x, 7.3], [1, 0], scene, 0, 0.02);
}
stepLed(18, [5.2, 6.1], [5.2, 7.3], [1, 0], upG, UPPER_Y);
const stepLight = new THREE.PointLight(0xffd6a0, 0, 1.8, 2);
scene.add(stepLight);
solid(6.1, 7.0, 6.1, 7.3, 1.9);
solid(5.2, 7.0, 5.82, 6.08, 4.3); // low-headroom end of the nook under the upper flight, and the rail between the flights
