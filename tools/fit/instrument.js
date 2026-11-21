// Instrumentation for the fit checks (tools/fit/dump.py), never published.
// tools/common.py build_check() puts each "//@before <file>" section in front of that src/js file
// ("//@before END" goes just before the shared scope closes). It records, without changing the scene:
//   colliders  every collider; walls (box(..., {solid: true})) get w: 1, solid() ones get the calling source lines
//   DOORS / OPENS / WINS  every door, doorless cased opening and window passed to wall()
//   meshes made by box/soft/cyl get userData.f (true while furniture is built) and userData.src (callers)
// Function declarations are hoisted over the whole scope, so wrapping them here wraps every call.

//@before 01-textures.js
const DOORS = [], OPENS = [], WINS = [];
let __FURN = false; // true in the files that build furniture (see the sections below)
// "function:line" for the 7 callers above the helper that called __src
const __src = () =>
  (new Error().stack || '')
    .split('\n')
    .slice(2, 9)
    .map(l => {
      const m = l.match(/at (?:(\S+) \()?.*?:(\d+):\d+\)?$/);
      return m ? (m[1] || '-') + ':' + m[2] : '';
    })
    .join(' ');
window.__chk = { colliders, DOORS, OPENS, WINS };
{
  const box0 = box, soft0 = soft, cyl0 = cyl, solid0 = solid, door0 = doorUnit, win0 = windowUnit, lining0 = lining;
  box = function (x0, x1, y0, y1, z0, z1, mat, o) {
    const n = colliders.length, m = box0.apply(this, arguments);
    if (colliders.length > n) colliders[n].w = 1;
    m.userData.f = __FURN;
    if (__FURN) m.userData.src = __src();
    return m;
  };
  soft = function () {
    const m = soft0.apply(this, arguments);
    m.userData.f = __FURN;
    if (__FURN) m.userData.src = __src();
    return m;
  };
  cyl = function () {
    const m = cyl0.apply(this, arguments);
    m.userData.f = __FURN;
    if (__FURN) m.userData.src = __src();
    return m;
  };
  solid = function () {
    solid0.apply(this, arguments);
    const c = colliders[colliders.length - 1];
    c.src = __src();
    c.lv = YOFF ? 2 : 1;
  };
  doorUnit = function (axis, t0, t1, p) {
    DOORS.push({ axis, t0, t1, a0: p.a0, a1: p.a1, hinge: p.hinge, swing: p.swing, Y: YOFF, front: !!p.front, glass: !!p.glass, bifold: !!p.bifold });
    return door0.apply(this, arguments);
  };
  windowUnit = function (axis, t0, t1, p) {
    WINS.push({ axis, t0, t1, a0: p.a0, a1: p.a1, sill: p.sill, head: p.head, out: p.out, Y: YOFF });
    return win0.apply(this, arguments);
  };
  lining = function (axis, t0, t1, p) {
    if (p.kind === 'cased') OPENS.push({ axis, t0, t1, a0: p.a0, a1: p.a1, Y: YOFF });
    return lining0.apply(this, arguments);
  };
}

//@before 20-furniture-pieces.js
__FURN = true; // furniture pieces and the ground-floor rooms

//@before 40-upper-floor.js
__FURN = false; // upper-floor walls and floors

//@before 41-balcony.js
__FURN = true; // balcony and upper-floor rooms

//@before 50-lighting.js
__FURN = false;

//@before END
window.__chk.scene = scene;
window.__chk.SG = SG;
