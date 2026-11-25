/* --------------------------------------------------------------- textures */
// Seeded random numbers in 0..1, so every procedural texture and prop comes out the same on every load.
function rng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// Canvas texture w x h px drawn by draw(g, w, h); clamp = no repeat (gradients, sprites).
function tex(w, h, draw, clamp) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return t;
}
// n soft blotches of random size on a texture canvas (stone, plaster, fabric variation).
function clouds(g, r, w, h, n, rmin, rmax, a) {
  for (let k = 0; k < n; k++) {
    const x = r() * w,
      y = r() * h,
      rad = rmin + r() * (rmax - rmin),
      l = r() > 0.5 ? 255 : 90;
    for (let dx = -w; dx <= w; dx += w)
      for (let dy = -h; dy <= h; dy += h) {
        if (x + dx + rad < 0 || x + dx - rad > w || y + dy + rad < 0 || y + dy - rad > h) continue;
        const gr = g.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, rad);
        gr.addColorStop(0, 'rgba(' + l + ',' + l + ',' + (l - 6) + ',' + a + ')');
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = gr;
        g.fillRect(x + dx - rad, y + dy - rad, rad * 2, rad * 2);
      }
  }
}
function veinPath(g, pts) {
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++)
    g.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
}
// n marble veins in the colours cols.
function veins(g, r, w, h, n, cols, wmax) {
  for (let i = 0; i < n; i++) {
    const pts = [];
    let x = r() * w,
      y = r() * h,
      a = 0.5 + (r() - 0.5) * 1.4;
    const m = (24 + r() * 30) | 0;
    for (let k = 0; k < m; k++) {
      pts.push([x, y]);
      a += (r() - 0.5) * 0.75;
      x += Math.cos(a) * 34;
      y += Math.sin(a) * 34;
    }
    const lw = 0.6 + r() * wmax;
    g.strokeStyle = cols[i % cols.length];
    g.lineJoin = g.lineCap = 'round';
    for (let dx = -w; dx <= w; dx += w)
      for (let dy = -h; dy <= h; dy += h) {
        g.save();
        g.translate(dx, dy);
        g.globalAlpha = 0.13;
        g.lineWidth = lw * 5;
        veinPath(g, pts);
        g.stroke();
        g.globalAlpha = 1;
        g.lineWidth = lw;
        veinPath(g, pts);
        g.stroke();
        g.restore();
      }
  }
}
// plank floor: 1024 px = 2.4 m
function plank(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed),
      rows = o.rows,
      rh = h / rows;
    for (let i = 0; i < rows; i++) {
      const y = i * rh,
        b1 = r() * w,
        len = w * (0.42 + r() * 0.16);
      const col = () =>
        'hsl(' +
        (o.h + (r() - 0.5) * o.dh) +
        ',' +
        (o.s + (r() - 0.5) * o.ds) +
        '%,' +
        (o.l + (r() - 0.5) * o.dl) +
        '%)';
      const fill = (x0, x1, c) => {
        g.fillStyle = c;
        g.fillRect(x0, y, x1 - x0, rh);
        g.fillRect(x0 - w, y, x1 - x0, rh);
      };
      fill(b1, b1 + len, col());
      fill(b1 + len, b1 + w, col());
      for (let k = 0; k < 30; k++) {
        g.strokeStyle = 'rgba(' + o.g[0] + ',' + o.g[1] + ',' + o.g[2] + ',' + (0.05 + r() * 0.11) + ')';
        g.lineWidth = 0.6 + r() * 1.6;
        const yy = y + r() * rh,
          a = r() * 2 - 1;
        g.beginPath();
        g.moveTo(0, yy);
        g.bezierCurveTo(w * 0.3, yy + a * 4, w * 0.7, yy - a * 4, w, yy);
        g.stroke();
      }
      g.fillStyle = 'rgba(40,28,18,0.5)';
      [b1, b1 + len].forEach(x => {
        x %= w;
        g.fillRect(x - 1, y, 2, rh);
      });
      g.fillRect(0, y, w, 1.5);
    }
  });
}
// 600 mm porcelain / stone tiles: 1024 px = 1.2 m
function stoneTile(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed);
    g.fillStyle = o.base;
    g.fillRect(0, 0, w, h);
    clouds(g, r, w, h, 340, 25, 125, o.a);
    if (o.veins) veins(g, r, w, h, o.veins, [o.vein], 1.6);
    g.fillStyle = o.grout;
    [0, w / 2].forEach(p => {
      g.fillRect(p - 2, 0, 4, h);
      g.fillRect(0, p - 2, w, 4);
    });
    g.fillRect(w - 2, 0, 2, h);
    g.fillRect(0, h - 2, w, 2);
  });
}
// stone slab for counters: 1024 px = 2 m
function marble(o) {
  return tex(1024, 1024, (g, w, h) => {
    const r = rng(o.seed);
    g.fillStyle = o.base;
    g.fillRect(0, 0, w, h);
    clouds(g, r, w, h, 200, 50, 190, o.cloud);
    veins(g, r, w, h, o.veins, o.cols, o.wmax);
  });
}
// Rug pattern for a room kind (l living, d dining, g guest, r runner); T('rug_<kind>') caches it.
function rugTex(kind) {
  const P = {
    l: ['#e8dfcf', '#cbb99c', 'plain'],
    d: ['#ddd1bd', '#b9a685', 'plain'],
    g: ['#6f6c68', '#cbc4b7', 'stripe'],
    r: ['#5b5650', '#b0653a', 'stripe']
  }[kind];
  const seed = { l: 71, d: 72, g: 73, r: 74 }[kind],
    bg = P[0],
    fg = P[1],
    pat = P[2];
  return tex(
    512,
    512,
    (g, w, h) => {
      const r = rng(seed);
      g.fillStyle = bg;
      g.fillRect(0, 0, w, h);
      clouds(g, r, w, h, 60, 30, 120, 0.035);
      if (pat === 'lines') {
        for (let k = 0; k < 5; k++) {
          g.fillStyle = 'rgba(255,255,255,' + (0.06 + r() * 0.1) + ')';
          g.fillRect(r() * w * 0.7, r() * h * 0.7, 80 + r() * 200, 60 + r() * 180);
        }
        g.strokeStyle = fg;
        for (let k = 0; k < 11; k++) {
          g.lineWidth = 1 + r() * 2.5;
          g.globalAlpha = 0.5 + r() * 0.4;
          g.beginPath();
          g.moveTo(r() * w, r() * h);
          g.lineTo(r() * w, r() * h);
          g.stroke();
        }
        g.globalAlpha = 1;
      } else if (pat === 'plain') {
        g.strokeStyle = fg;
        g.lineWidth = 3;
        g.strokeRect(16, 16, w - 32, h - 32);
      } else if (pat === 'stripe') {
        let y = 10;
        let on = false;
        while (y < h - 10) {
          const bh = 10 + r() * 34;
          if (on) {
            g.fillStyle = fg;
            g.globalAlpha = 0.7;
            g.fillRect(0, y, w, Math.min(bh * 0.45, 12));
          }
          y += bh;
          on = !on;
        }
        g.globalAlpha = 1;
      }
      for (let k = 0; k < 26000; k++) {
        g.fillStyle = k % 2 ? 'rgba(0,0,0,.07)' : 'rgba(255,255,255,.07)';
        g.fillRect(r() * w, r() * h, 1, 2);
      }
    },
    true
  );
}
const artCache = {};
// Generated abstract artwork i (pictures hung with art()): a half disc, a rust block and a few ink lines.
function artTex(i) {
  if (artCache[i]) return artCache[i];
  return (artCache[i] = tex(
    256,
    256,
    (g, w, h) => {
      const r = rng(152 + i * 7),
        dark = i % 3 === 1,
        ink = dark ? '#d9d4ca' : '#1c1d1f';
      g.fillStyle = dark ? '#232325' : '#cfcac0';
      g.fillRect(0, 0, w, h);
      g.fillStyle = ink;
      g.beginPath();
      const a0 = (((r() * 4) | 0) * Math.PI) / 2;
      g.arc(w * (0.35 + r() * 0.3), h * (0.4 + r() * 0.25), 46 + r() * 34, a0, a0 + Math.PI);
      g.fill();
      g.fillStyle = '#8a4a26';
      g.fillRect(w * (0.1 + r() * 0.5), h * (0.12 + r() * 0.6), 30 + r() * 50, 30 + r() * 60);
      g.strokeStyle = ink;
      g.lineWidth = 3;
      for (let k = 0; k < 3; k++) {
        g.beginPath();
        g.moveTo(r() * w, r() * h);
        g.lineTo(r() * w, r() * h);
        g.stroke();
      }
      g.beginPath();
      g.arc(w * (0.2 + r() * 0.6), h * (0.2 + r() * 0.6), 18 + r() * 16, 0, 6.3);
      g.stroke();
    },
    true
  ));
}
// Texture generators by name, built on first use through T(name). Each comment gives its real-world scale.
const GEN = {
  // exposed brick, 1024 px = 1.2 m: 240 mm module, 75 mm courses
  brick: () => {
    const t = tex(1024, 1024, (g, w, h) => {
      const r = rng(41);
      g.fillStyle = '#b9b0a4';
      g.fillRect(0, 0, w, h);
      for (let row = 0; row < 16; row++)
        for (let i = -1; i < 5; i++) {
          const x = i * 204.8 + (row % 2 ? 102.4 : 0),
            y = row * 64;
          g.fillStyle = 'hsl(' + (14 + r() * 10) + ',' + (34 + r() * 16) + '%,' + (34 + r() * 14) + '%)';
          g.fillRect(x + 5, y + 5, 194.8, 54);
          for (let k = 0; k < 14; k++) {
            g.fillStyle = r() > 0.5 ? 'rgba(255,240,225,.07)' : 'rgba(30,15,10,.1)';
            g.fillRect(x + 5 + r() * 180, y + 5 + r() * 46, 6 + r() * 30, 3 + r() * 8);
          }
        }
    });
    t.repeat.set(0.5, 0.5);
    return t;
  },
  plaster: () =>
    tex(1024, 1024, (g, w, h) => {
      const r = rng(43);
      g.fillStyle = '#ffffff';
      g.fillRect(0, 0, w, h);
      clouds(g, r, w, h, 420, 30, 170, 0.02);
      for (let k = 0; k < 2500; k++) {
        g.fillStyle = 'rgba(60,60,60,.05)';
        g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
      }
    }),
  concreteLoft: () => stoneTile({ seed: 44, base: '#8f8d89', a: 0.06, grout: '#7c7a77' }),
  tileLoft: () => stoneTile({ seed: 45, base: '#5c5d60', a: 0.05, grout: '#454648' }),
  tileLoftWall: () => stoneTile({ seed: 46, base: '#e9e7e2', a: 0.03, grout: '#8d8c89' }),
  counterLoft: () =>
    marble({
      seed: 47,
      base: '#9c9a96',
      veins: 5,
      cols: ['rgba(70,70,72,.35)', 'rgba(215,212,205,.4)'],
      wmax: 1.6,
      cloud: 0.06
    }),
  // natural oak boards of the living room, 1024 px = 2.4 m (16 boards of 15 cm)
  plankOak: () => plank({ seed: 8, rows: 16, h: 34, s: 42, l: 68, dh: 5, ds: 8, dl: 6, g: [120, 85, 50] }),
  // warm beige travertine, 512 px = 1 m: soft clouds, horizontal bands and small elongated pores
  travertine: () =>
    tex(512, 512, (g, w, h) => {
      const r = rng(61);
      g.fillStyle = '#e2d3b8';
      g.fillRect(0, 0, w, h);
      clouds(g, r, w, h, 50, 40, 160, 0.05);
      for (let k = 0; k < 30; k++) {
        g.fillStyle = 'rgba(' + (150 + r() * 40) + ',120,80,' + (0.04 + r() * 0.08) + ')';
        g.fillRect(0, r() * h, w, 1 + r() * 7);
      }
      for (let k = 0; k < 520; k++) {
        g.fillStyle = 'rgba(120,95,62,' + (0.2 + r() * 0.3) + ')';
        g.beginPath();
        g.ellipse(r() * w, r() * h, 1.5 + r() * 5, 0.6 + r() * 1.2, 0, 0, 6.3);
        g.fill();
      }
    }),
  grain: () =>
    tex(512, 512, (g, w, h) => {
      // furniture wood, 512 px = 1 m, tinted by the material colour
      const r = rng(3);
      g.fillStyle = '#f4efe8';
      g.fillRect(0, 0, w, h);
      for (let k = 0; k < 300; k++) {
        g.strokeStyle = 'rgba(70,45,25,' + (0.05 + r() * 0.15) + ')';
        g.lineWidth = 0.5 + r() * 1.7;
        const y0 = r() * h,
          A = 1 + r() * 5,
          f = 1 + ((r() * 3) | 0),
          ph = r() * 6.28;
        g.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = y0 + A * Math.sin((x / w) * 6.2832 * f + ph);
          if (x) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
        g.stroke();
      }
      for (let k = 0; k < 2600; k++) {
        g.fillStyle = 'rgba(60,38,20,' + (0.05 + r() * 0.1) + ')';
        g.fillRect(r() * w, r() * h, 3 + r() * 9, 1);
      }
    }),
  weave: () =>
    tex(256, 256, (g, w, h) => {
      // linen
      const r = rng(9);
      g.fillStyle = '#ffffff';
      g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 3) {
        g.fillStyle = 'rgba(90,90,90,' + (0.05 + r() * 0.13) + ')';
        g.fillRect(x, 0, 1.5, h);
      }
      for (let y = 0; y < h; y += 3) {
        g.fillStyle = 'rgba(90,90,90,' + (0.05 + r() * 0.13) + ')';
        g.fillRect(0, y, w, 1.5);
      }
      for (let k = 0; k < 500; k++) {
        g.fillStyle = 'rgba(60,60,60,.12)';
        if (r() > 0.5) g.fillRect(r() * w, r() * h, 6 + r() * 14, 2);
        else g.fillRect(r() * w, r() * h, 2, 6 + r() * 14);
      }
    }),
  boucle: () =>
    tex(256, 256, (g, w, h) => {
      const r = rng(10);
      g.fillStyle = '#ffffff';
      g.fillRect(0, 0, w, h);
      g.lineWidth = 1.6;
      for (let k = 0; k < 2600; k++) {
        const x = r() * w,
          y = r() * h,
          rad = 2 + r() * 4,
          a0 = r() * 6.28;
        g.strokeStyle = 'rgba(70,70,70,' + (0.1 + r() * 0.22) + ')';
        for (let dx = -w; dx <= w; dx += w)
          for (let dy = -h; dy <= h; dy += h) {
            if (x + dx < -8 || x + dx > w + 8 || y + dy < -8 || y + dy > h + 8) continue;
            g.beginPath();
            g.arc(x + dx, y + dy, rad, a0, a0 + 3.5 + r() * 2);
            g.stroke();
          }
      }
    }),
  slat: () =>
    tex(256, 256, (g, w, h) => {
      const r = rng(5);
      g.fillStyle = '#1d1712';
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 8; i++) {
        const x = i * 32;
        g.fillStyle = 'hsl(28,' + (14 + r() * 8) + '%,' + (86 + r() * 9) + '%)';
        g.fillRect(x + 3, 0, 23, h);
        for (let k = 0; k < 10; k++) {
          g.fillStyle = 'rgba(60,40,25,' + (0.05 + r() * 0.1) + ')';
          g.fillRect(x + 3 + r() * 22, 0, 1, h);
        }
      }
    })
};
const TX = {};
// The texture called n, generated once (GEN[n] or a rug), then shared.
function T(n) {
  if (!TX[n]) TX[n] = n.indexOf('rug_') === 0 ? rugTex(n.split('_')[1]) : GEN[n]();
  return TX[n];
}
const skyTex = tex(8, 256, () => {}, true),
  skyG = skyTex.image.getContext('2d');
const haloTex = tex(
  64,
  64,
  g => {
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,238,205,1)');
    gr.addColorStop(0.3, 'rgba(255,222,170,.38)');
    gr.addColorStop(1, 'rgba(255,210,150,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
  },
  true
);
