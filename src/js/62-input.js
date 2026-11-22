/* ------------------------------------------------------------------ input */
window.addEventListener('keydown', e => {
  if (e.code === 'KeyV' && !e.repeat) setMode(mode === 'walk' ? 'doll' : 'walk');
  if (e.code === 'KeyF' && !e.repeat && mode === 'doll') setDollLevel(dollLv === 2 ? 1 : 2);
  const si = ['Digit1', 'Digit2', 'Digit3', 'Digit4'].indexOf(e.code);
  if (si >= 0) applyStyle(['modern', 'scandi', 'lux', 'loft'][si]);
  if (tour && /^(Escape|Key[WASD]|Arrow)/.test(e.code)) endTour(false);
  keys[e.code] = true;
  if (/^Arrow|Space/.test(e.code)) e.preventDefault();
});
window.addEventListener('keyup', e => {
  keys[e.code] = false;
});
window.addEventListener('blur', () => {
  for (const k in keys) keys[k] = false;
});
const locked = () => document.pointerLockElement === canvas;
// Capture the mouse for looking around (desktop walk view).
function tryLock() {
  try {
    const p = canvas.requestPointerLock();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}
// Turn the walker by a mouse or touch drag of dx, dy pixels.
function look(dx, dy, s) {
  if (tour) return;
  spin = false;
  if (mode === 'walk') {
    player.yaw -= dx * s;
    player.pitch = clamp(player.pitch - dy * s, -1.4, 1.4);
  } else {
    orbit.az -= dx * s * 1.2;
    orbit.pol = clamp(orbit.pol - dy * s, 0.02, 1.25);
  }
}
const ptrs = new Map();
let pinch = 0,
  moved = 0;
const pdist = () => {
  const a = Array.from(ptrs.values());
  return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
};
canvas.addEventListener('pointerdown', e => {
  if (e.pointerType === 'touch') document.body.classList.add('touch');
  try {
    canvas.setPointerCapture(e.pointerId);
  } catch (err) {}
  ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  moved = 0;
  spin = false;
  if (ptrs.size === 2) pinch = pdist();
});
canvas.addEventListener('pointermove', e => {
  const p = ptrs.get(e.pointerId);
  if (!p) return;
  const dx = e.clientX - p.x,
    dy = e.clientY - p.y;
  p.x = e.clientX;
  p.y = e.clientY;
  moved += Math.abs(dx) + Math.abs(dy);
  if (locked()) return;
  if (ptrs.size === 1) look(dx, dy, e.pointerType === 'mouse' ? 0.004 : 0.005);
  else if (ptrs.size === 2 && mode === 'doll') {
    const d = pdist();
    if (pinch > 0 && d > 0) {
      orbit.dist = clamp((orbit.dist * pinch) / d, 6, 70);
      orbit.zoomed = true;
    }
    pinch = d;
  }
});
const ray = new THREE.Raycaster(),
  ndc = new THREE.Vector2(),
  hit = new THREE.Vector3(),
  floorPl = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
// End of a touch or click: a short tap in the dollhouse jumps to the room under it.
function pointerEnd(e) {
  const had = ptrs.delete(e.pointerId);
  pinch = 0;
  if (!had || e.type === 'pointercancel') return;
  if (moved < 8) {
    if (mode === 'doll' && !trans) {
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      floorPl.constant = dollLv === 2 ? -UPPER_Y : 0;
      if (ray.ray.intersectPlane(floorPl, hit)) {
        const r = roomAt(hit.x, hit.z, dollLv);
        if (r) jumpTo(r);
      }
    }
  }
}
canvas.addEventListener('click', () => {
  if (mode === 'walk' && moved < 8 && !locked() && !document.body.classList.contains('touch')) tryLock();
});
canvas.addEventListener('pointerup', pointerEnd);
canvas.addEventListener('pointercancel', pointerEnd);
document.addEventListener('mousemove', e => {
  if (locked()) look(e.movementX || 0, e.movementY || 0, 0.0022);
});
canvas.addEventListener(
  'wheel',
  e => {
    if (mode !== 'doll') return;
    e.preventDefault();
    orbit.dist = clamp(orbit.dist * Math.exp(e.deltaY * 0.0012), 6, 70);
    orbit.zoomed = true;
  },
  { passive: false }
);
canvas.addEventListener('contextmenu', e => e.preventDefault());
(function () {
  // thumb stick
  const st = document.getElementById('stick'),
    kn = document.getElementById('knob');
  let id = null;
  const set = e => {
    const r = st.getBoundingClientRect();
    let x = (e.clientX - r.left - r.width / 2) / (r.width / 2),
      y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    const l = Math.hypot(x, y);
    if (l > 1) {
      x /= l;
      y /= l;
    }
    joy.x = x;
    joy.y = y;
    kn.style.transform = 'translate(' + x * 34 + 'px,' + y * 34 + 'px)';
  };
  const end = e => {
    if (e.pointerId !== id) return;
    id = null;
    joy.x = joy.y = 0;
    kn.style.transform = '';
  };
  st.addEventListener('pointerdown', e => {
    id = e.pointerId;
    try {
      st.setPointerCapture(id);
    } catch (err) {}
    set(e);
    e.preventDefault();
  });
  st.addEventListener('pointermove', e => {
    if (e.pointerId === id) set(e);
  });
  st.addEventListener('pointerup', end);
  st.addEventListener('pointercancel', end);
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
})();
