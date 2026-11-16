/* --------------------------------------------------------------- textures */
function rng(seed) { let s = seed >>> 0; return function () { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function tex(w, h, draw, clamp) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); return t;
}
function clouds(g, r, w, h, n, rmin, rmax, a) {
  for (let k = 0; k < n; k++) {
    const x = r() * w, y = r() * h, rad = rmin + r() * (rmax - rmin), l = r() > 0.5 ? 255 : 90;
    for (let dx = -w; dx <= w; dx += w) for (let dy = -h; dy <= h; dy += h) {
      if (x + dx + rad < 0 || x + dx - rad > w || y + dy + rad < 0 || y + dy - rad > h) continue;
      const gr = g.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, rad);
      gr.addColorStop(0, 'rgba(' + l + ',' + l + ',' + (l - 6) + ',' + a + ')'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(x + dx - rad, y + dy - rad, rad * 2, rad * 2);
    }
  }
}
function veinPath(g, pts) { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length - 1; i++) g.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2); }
function veins(g, r, w, h, n, cols, wmax) {
  for (let i = 0; i < n; i++) {
    const pts = []; let x = r() * w, y = r() * h, a = .5 + (r() - .5) * 1.4; const m = 24 + r() * 30 | 0;
    for (let k = 0; k < m; k++) { pts.push([x, y]); a += (r() - .5) * .75; x += Math.cos(a) * 34; y += Math.sin(a) * 34; }
    const lw = .6 + r() * wmax; g.strokeStyle = cols[i % cols.length]; g.lineJoin = g.lineCap = 'round';
    for (let dx = -w; dx <= w; dx += w) for (let dy = -h; dy <= h; dy += h) {
      g.save(); g.translate(dx, dy); g.globalAlpha = .13; g.lineWidth = lw * 5; veinPath(g, pts); g.stroke(); g.globalAlpha = 1; g.lineWidth = lw; veinPath(g, pts); g.stroke(); g.restore();
    }
  }
}
// plank floor: 1024 px = 2.4 m
function plank(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed), rows = o.rows, rh = h / rows;
    for (let i = 0; i < rows; i++) {
      const y = i * rh, b1 = r() * w, len = w * (0.42 + r() * 0.16);
      const col = () => 'hsl(' + (o.h + (r() - .5) * o.dh) + ',' + (o.s + (r() - .5) * o.ds) + '%,' + (o.l + (r() - .5) * o.dl) + '%)';
      const fill = (x0, x1, c) => { g.fillStyle = c; g.fillRect(x0, y, x1 - x0, rh); g.fillRect(x0 - w, y, x1 - x0, rh); };
      fill(b1, b1 + len, col()); fill(b1 + len, b1 + w, col());
      for (let k = 0; k < 30; k++) {
        g.strokeStyle = 'rgba(' + o.g[0] + ',' + o.g[1] + ',' + o.g[2] + ',' + (0.05 + r() * 0.11) + ')';
        g.lineWidth = 0.6 + r() * 1.6; const yy = y + r() * rh, a = r() * 2 - 1;
        g.beginPath(); g.moveTo(0, yy); g.bezierCurveTo(w * 0.3, yy + a * 4, w * 0.7, yy - a * 4, w, yy); g.stroke();
      }
      g.fillStyle = 'rgba(40,28,18,0.5)';
      [b1, b1 + len].forEach(x => { x %= w; g.fillRect(x - 1, y, 2, rh); });
      g.fillRect(0, y, w, 1.5);
    }
  });
}
// herringbone parquet: 16 x 16 cells of 90 mm, blocks 90 x 360 mm, 1024 px = 1.44 m
function herring(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed), c = 64, mod = v => ((v % 8) + 8) % 8;
    const blockAt = (px, py, pw, ph) => {
      const col = 'hsl(' + (o.h + (r() - .5) * 6) + ',' + (o.s + (r() - .5) * 10) + '%,' + (o.l + (r() - .5) * o.dl) + '%)', lines = [];
      for (let k = 0; k < 9; k++) lines.push([r(), 0.06 + r() * 0.14, 0.6 + r() * 1.3]);
      for (let dx = -w; dx <= w; dx += w) for (let dy = -h; dy <= h; dy += h) {
        const X = px + dx, Y = py + dy; if (X + pw <= 0 || X >= w || Y + ph <= 0 || Y >= h) continue;
        g.fillStyle = col; g.fillRect(X, Y, pw, ph);
        lines.forEach(l => { g.strokeStyle = 'rgba(' + o.g[0] + ',' + o.g[1] + ',' + o.g[2] + ',' + l[1] + ')'; g.lineWidth = l[2]; g.beginPath();
          if (pw > ph) { g.moveTo(X, Y + l[0] * ph); g.lineTo(X + pw, Y + l[0] * ph); } else { g.moveTo(X + l[0] * pw, Y); g.lineTo(X + l[0] * pw, Y + ph); } g.stroke(); });
        g.strokeStyle = 'rgba(20,12,6,.55)'; g.lineWidth = 1.5; g.strokeRect(X + .5, Y + .5, pw - 1, ph - 1);
      }
    };
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) { const m = mod(x - y); if (m === 0) blockAt(x * c, y * c, 4 * c, c); else if (m === 7) blockAt(x * c, y * c, c, 4 * c); }
  });
}
// 600 mm porcelain / stone tiles: 1024 px = 1.2 m
function stoneTile(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed); g.fillStyle = o.base; g.fillRect(0, 0, w, h); clouds(g, r, w, h, 340, 25, 125, o.a);
    if (o.veins) veins(g, r, w, h, o.veins, [o.vein], 1.6);
    g.fillStyle = o.grout; [0, w / 2].forEach(p => { g.fillRect(p - 2, 0, 4, h); g.fillRect(0, p - 2, w, 4); }); g.fillRect(w - 2, 0, 2, h); g.fillRect(0, h - 2, w, 2);
  });
}
// stone slab for counters: 1024 px = 2 m
function marble(o) { return tex(1024, 1024, (g, w, h) => { const r = rng(o.seed); g.fillStyle = o.base; g.fillRect(0, 0, w, h); clouds(g, r, w, h, 200, 50, 190, o.cloud); veins(g, r, w, h, o.veins, o.cols, o.wmax); }); }
function terrazzo(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed); g.fillStyle = o.base; g.fillRect(0, 0, w, h); clouds(g, r, w, h, 120, 40, 140, .03);
    for (let k = 0; k < 1500; k++) {
      const x = r() * w, y = r() * h, s = 2.5 + r() * r() * 15, n = 3 + (r() * 3 | 0), a0 = r() * 6.28, pts = [];
      for (let i = 0; i < n; i++) { const a = a0 + i / n * 6.28 + (r() - .5) * .6, d = s * (.6 + r() * .5); pts.push([Math.cos(a) * d, Math.sin(a) * d]); }
      g.fillStyle = o.chips[r() * o.chips.length | 0]; g.globalAlpha = .75 + r() * .25;
      for (let dx = -w; dx <= w; dx += w) for (let dy = -h; dy <= h; dy += h) { const X = x + dx, Y = y + dy; if (X < -20 || X > w + 20 || Y < -20 || Y > h + 20) continue; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(X + p[0], Y + p[1]) : g.moveTo(X + p[0], Y + p[1])); g.closePath(); g.fill(); }
    }
    g.globalAlpha = 1;
  });
}
function rugTex(style, kind) {
  const P = { modern: { l: ['#c9c8c4', '#2f3033', 'lines'], d: ['#5a5d61', '#8a8d91', 'plain'], g: ['#bfbeba', '#ecebe7', 'stripe'], r: ['#8f9194', '#35363a', 'stripe'] },
    scandi: { l: ['#ece6d9', '#5a4a3c', 'diamond'], d: ['#dfd7c7', '#f6f2e9', 'stripe'], g: ['#eadfd1', '#b98f7a', 'diamond'], r: ['#e8e1d2', '#8fa08a', 'stripe'] },
    loft: { l: ['#7d6c5c', '#26262a', 'lines'], d: ['#4b4845', '#8c6a48', 'plain'], g: ['#6f6c68', '#cbc4b7', 'stripe'], r: ['#5b5650', '#b0653a', 'stripe'] },
    lux: { l: ['#5a2e2a', '#c9a45c', 'border'], d: ['#3b4944', '#c9a45c', 'border'], g: ['#6a523f', '#e3d2b3', 'border'], r: ['#4a2e29', '#c9a45c', 'border'] } }[style][kind];
  const seed = ({ l: 31, d: 32, g: 33, r: 34 })[kind] + style.length * 10, bg = P[0], fg = P[1], pat = P[2];
  return tex(512, 512, (g, w, h) => {
    const r = rng(seed); g.fillStyle = bg; g.fillRect(0, 0, w, h); clouds(g, r, w, h, 60, 30, 120, .035);
    if (pat === 'lines') {
      for (let k = 0; k < 5; k++) { g.fillStyle = 'rgba(255,255,255,' + (.06 + r() * .1) + ')'; g.fillRect(r() * w * .7, r() * h * .7, 80 + r() * 200, 60 + r() * 180); }
      g.strokeStyle = fg; for (let k = 0; k < 11; k++) { g.lineWidth = 1 + r() * 2.5; g.globalAlpha = .5 + r() * .4; g.beginPath(); g.moveTo(r() * w, r() * h); g.lineTo(r() * w, r() * h); g.stroke(); } g.globalAlpha = 1;
    } else if (pat === 'plain') { g.strokeStyle = fg; g.lineWidth = 3; g.strokeRect(16, 16, w - 32, h - 32); }
    else if (pat === 'stripe') { let y = 10; let on = false; while (y < h - 10) { const bh = 10 + r() * 34; if (on) { g.fillStyle = fg; g.globalAlpha = .7; g.fillRect(0, y, w, Math.min(bh * .45, 12)); } y += bh; on = !on; } g.globalAlpha = 1; }
    else if (pat === 'diamond') { g.strokeStyle = fg; g.lineWidth = 5; g.lineJoin = 'round'; const c = 128;
      for (let y = -1; y < 5; y++) for (let x = -1; x < 5; x++) { const cx = x * c + c / 2, cy = y * c + c / 2, j = () => (r() - .5) * 10; g.globalAlpha = .7 + r() * .3; g.beginPath(); g.moveTo(cx + j(), cy - c / 2 + j()); g.lineTo(cx + c / 2 + j(), cy + j()); g.lineTo(cx + j(), cy + c / 2 + j()); g.lineTo(cx - c / 2 + j(), cy + j()); g.closePath(); g.stroke(); } g.globalAlpha = 1; }
    else { g.fillStyle = 'rgba(0,0,0,.28)'; g.fillRect(0, 0, w, h); g.fillStyle = bg; g.fillRect(34, 34, w - 68, h - 68);
      g.strokeStyle = fg; g.lineWidth = 4; g.strokeRect(22, 22, w - 44, h - 44); g.lineWidth = 2; g.strokeRect(44, 44, w - 88, h - 88);
      for (let k = 0; k < 4; k++) { const s = 1 - k * .22; g.globalAlpha = .28 + k * .12; g.fillStyle = k % 2 ? fg : 'rgba(0,0,0,.5)'; g.beginPath(); g.moveTo(w / 2, h / 2 - h * .4 * s); g.lineTo(w / 2 + w * .4 * s, h / 2); g.lineTo(w / 2, h / 2 + h * .4 * s); g.lineTo(w / 2 - w * .4 * s, h / 2); g.closePath(); g.fill(); }
      g.globalAlpha = .55; g.fillStyle = fg; for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) { const px = 68 + x * (w - 136) / 8, py = 68 + y * (h - 136) / 8; g.beginPath(); g.moveTo(px, py - 6); g.lineTo(px + 6, py); g.lineTo(px, py + 6); g.lineTo(px - 6, py); g.fill(); } g.globalAlpha = 1; }
    for (let k = 0; k < 26000; k++) { g.fillStyle = k % 2 ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.07)'; g.fillRect(r() * w, r() * h, 1, 2); }
  }, true);
}
const artCache = {};
function artTex(style, i) {
  const key = style + i; if (artCache[key]) return artCache[key];
  return artCache[key] = tex(256, 256, (g, w, h) => {
    const r = rng(100 + i * 7 + style.length * 13);
    if (style === 'modern' || style === 'loft') {
      const loft = style === 'loft', dark = i % 3 === 1, ink = dark ? (loft ? '#d9d4ca' : '#efede8') : '#1c1d1f'; g.fillStyle = dark ? '#232325' : (loft ? '#cfcac0' : '#efede8'); g.fillRect(0, 0, w, h);
      g.fillStyle = ink; g.beginPath(); const a0 = (r() * 4 | 0) * Math.PI / 2; g.arc(w * (.35 + r() * .3), h * (.4 + r() * .25), 46 + r() * 34, a0, a0 + Math.PI); g.fill();
      g.fillStyle = loft ? '#8a4a26' : '#b0653a'; g.fillRect(w * (.1 + r() * .5), h * (.12 + r() * .6), 30 + r() * 50, 30 + r() * 60);
      g.strokeStyle = ink; g.lineWidth = 3; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(r() * w, r() * h); g.lineTo(r() * w, r() * h); g.stroke(); }
      g.beginPath(); g.arc(w * (.2 + r() * .6), h * (.2 + r() * .6), 18 + r() * 16, 0, 6.3); g.stroke();
    } else if (style === 'scandi') {
      g.fillStyle = '#f3eee4'; g.fillRect(0, 0, w, h); const cols = ['#8fa08a', '#d9b3a3', '#d8c7a6', '#a9b7bd', '#c98f6f'];
      for (let k = 0; k < 4; k++) { g.fillStyle = cols[(i + k) % cols.length]; g.globalAlpha = .85; g.beginPath(); g.ellipse(w * (.2 + r() * .6), h * (.25 + r() * .55), 26 + r() * 46, 18 + r() * 34, r() * 3, 0, 6.3); g.fill(); }
      g.globalAlpha = 1; g.strokeStyle = '#55634f'; g.fillStyle = '#55634f'; g.lineWidth = 2;
      for (let k = 0; k < 2; k++) { const x0 = w * (.3 + r() * .4), sw = (r() - .5) * 60; g.beginPath(); g.moveTo(x0, h * .95); g.quadraticCurveTo(x0 + sw, h * .6, x0 + sw * .4, h * .2); g.stroke();
        for (let t = .25; t < 1; t += .16) { const px = x0 + sw * t * (1.6 - t), py = h * (.95 - .75 * t); g.beginPath(); g.ellipse(px + (k ? 9 : -9), py, 10, 4.5, k ? -.6 : .6, 0, 6.3); g.fill(); } }
    } else {
      const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#1f2b26'); gr.addColorStop(1, '#3b2a1d'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgba(232,223,208,.5)'; g.fillRect(w * (.1 + r() * .3), h * (.5 + r() * .25), w * .55, 16 + r() * 22);
      g.strokeStyle = '#c9a45c'; g.lineCap = 'round'; for (let k = 0; k < 4; k++) { g.lineWidth = 2 + r() * 9; g.globalAlpha = .5 + r() * .5; g.beginPath(); g.arc(w * (r() * 1.2 - .1), h * (r() * 1.2 - .1), 60 + r() * 120, r() * 6.3, r() * 6.3 + 1.2 + r() * 1.6); g.stroke(); }
      g.globalAlpha = .8; g.fillStyle = '#d9b970'; for (let k = 0; k < 160; k++) g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2); g.globalAlpha = 1;
    }
  }, true);
}
const GEN = {
  // exposed brick, 1024 px = 1.2 m: 240 mm module, 75 mm courses
  brick: () => { const t = tex(1024, 1024, (g, w, h) => {
    const r = rng(41); g.fillStyle = '#b9b0a4'; g.fillRect(0, 0, w, h);
    for (let row = 0; row < 16; row++) for (let i = -1; i < 5; i++) { const x = i * 204.8 + (row % 2 ? 102.4 : 0), y = row * 64;
      g.fillStyle = 'hsl(' + (14 + r() * 10) + ',' + (34 + r() * 16) + '%,' + (34 + r() * 14) + '%)'; g.fillRect(x + 5, y + 5, 194.8, 54);
      for (let k = 0; k < 14; k++) { g.fillStyle = r() > .5 ? 'rgba(255,240,225,.07)' : 'rgba(30,15,10,.1)'; g.fillRect(x + 5 + r() * 180, y + 5 + r() * 46, 6 + r() * 30, 3 + r() * 8); } }
  }); t.repeat.set(.5, .5); return t; },
  plaster: () => tex(1024, 1024, (g, w, h) => { const r = rng(43); g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); clouds(g, r, w, h, 420, 30, 170, .02); for (let k = 0; k < 2500; k++) { g.fillStyle = 'rgba(60,60,60,.05)'; g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2); } }),
  concreteLoft: () => stoneTile({ seed: 44, base: '#8f8d89', a: .06, grout: '#7c7a77' }),
  tileLoft: () => stoneTile({ seed: 45, base: '#5c5d60', a: .05, grout: '#454648' }),
  tileLoftWall: () => stoneTile({ seed: 46, base: '#e9e7e2', a: .03, grout: '#8d8c89' }),
  counterLoft: () => marble({ seed: 47, base: '#9c9a96', veins: 5, cols: ['rgba(70,70,72,.35)', 'rgba(215,212,205,.4)'], wmax: 1.6, cloud: .06 }),
  plankModern: () => plank({ seed: 7, rows: 10, h: 33, s: 13, l: 67, dh: 5, ds: 5, dl: 7, g: [70, 62, 55] }),
  plankScandi: () => plank({ seed: 8, rows: 16, h: 37, s: 36, l: 77, dh: 5, ds: 8, dl: 6, g: [150, 115, 75] }),
  herringLux: () => { const t = herring({ seed: 9, h: 24, s: 44, l: 31, dl: 9, g: [40, 22, 10] }); t.repeat.set(2.4 / 1.44, 2.4 / 1.44); t.rotation = Math.PI / 4; return t; },
  tileModern: () => stoneTile({ seed: 11, base: '#cbcac7', a: .028, grout: '#aaa9a6' }),
  tileScandi: () => stoneTile({ seed: 12, base: '#e5e1d9', a: .035, grout: '#c7c2b8' }),
  tileLux: () => stoneTile({ seed: 13, base: '#ddd0bc', a: .03, veins: 9, vein: 'rgba(150,115,80,.4)', grout: '#bfb19b' }),
  counterModern: () => marble({ seed: 21, base: '#f1f0ee', veins: 9, cols: ['rgba(120,124,130,.55)', 'rgba(160,163,168,.45)'], wmax: 2.2, cloud: .03 }),
  counterScandi: () => terrazzo({ seed: 22, base: '#eeebe4', chips: ['#c9b9a2', '#a9b3a4', '#8e8a84', '#d9a98f', '#f8f6f1', '#6f7376'] }),
  counterLux: () => marble({ seed: 23, base: '#f3ede2', veins: 12, cols: ['rgba(168,120,60,.65)', 'rgba(110,90,70,.5)', 'rgba(200,160,95,.55)'], wmax: 5, cloud: .05 }),
  grain: () => tex(512, 512, (g, w, h) => {      // furniture wood, 512 px = 1 m, tinted by the material colour
    const r = rng(3); g.fillStyle = '#f4efe8'; g.fillRect(0, 0, w, h);
    for (let k = 0; k < 300; k++) { g.strokeStyle = 'rgba(70,45,25,' + (0.05 + r() * 0.15) + ')'; g.lineWidth = 0.5 + r() * 1.7; const y0 = r() * h, A = 1 + r() * 5, f = 1 + (r() * 3 | 0), ph = r() * 6.28;
      g.beginPath(); for (let x = 0; x <= w; x += 8) { const y = y0 + A * Math.sin(x / w * 6.2832 * f + ph); if (x) g.lineTo(x, y); else g.moveTo(x, y); } g.stroke(); }
    for (let k = 0; k < 2600; k++) { g.fillStyle = 'rgba(60,38,20,' + (.05 + r() * .1) + ')'; g.fillRect(r() * w, r() * h, 3 + r() * 9, 1); }
  }),
  weave: () => tex(256, 256, (g, w, h) => {      // linen
    const r = rng(9); g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 3) { g.fillStyle = 'rgba(90,90,90,' + (.05 + r() * .13) + ')'; g.fillRect(x, 0, 1.5, h); }
    for (let y = 0; y < h; y += 3) { g.fillStyle = 'rgba(90,90,90,' + (.05 + r() * .13) + ')'; g.fillRect(0, y, w, 1.5); }
    for (let k = 0; k < 500; k++) { g.fillStyle = 'rgba(60,60,60,.12)'; if (r() > .5) g.fillRect(r() * w, r() * h, 6 + r() * 14, 2); else g.fillRect(r() * w, r() * h, 2, 6 + r() * 14); }
  }),
  boucle: () => tex(256, 256, (g, w, h) => {
    const r = rng(10); g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h); g.lineWidth = 1.6;
    for (let k = 0; k < 2600; k++) { const x = r() * w, y = r() * h, rad = 2 + r() * 4, a0 = r() * 6.28; g.strokeStyle = 'rgba(70,70,70,' + (.1 + r() * .22) + ')';
      for (let dx = -w; dx <= w; dx += w) for (let dy = -h; dy <= h; dy += h) { if (x + dx < -8 || x + dx > w + 8 || y + dy < -8 || y + dy > h + 8) continue; g.beginPath(); g.arc(x + dx, y + dy, rad, a0, a0 + 3.5 + r() * 2); g.stroke(); } }
  }),
  slat: () => tex(256, 256, (g, w, h) => {
    const r = rng(5); g.fillStyle = '#1d1712'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) { const x = i * 32; g.fillStyle = 'hsl(28,' + (14 + r() * 8) + '%,' + (86 + r() * 9) + '%)'; g.fillRect(x + 3, 0, 23, h);
      for (let k = 0; k < 10; k++) { g.fillStyle = 'rgba(60,40,25,' + (0.05 + r() * 0.1) + ')'; g.fillRect(x + 3 + r() * 22, 0, 1, h); } }
  })
};
const TX = {};
function T(n) { if (!TX[n]) TX[n] = n.indexOf('rug_') === 0 ? rugTex(n.split('_')[1], n.split('_')[2]) : GEN[n](); return TX[n]; }
const skyTex = tex(8, 256, () => { }, true), skyG = skyTex.image.getContext('2d');
const haloTex = tex(64, 64, g => { const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,238,205,1)'); gr.addColorStop(.3, 'rgba(255,222,170,.38)'); gr.addColorStop(1, 'rgba(255,210,150,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); }, true);

