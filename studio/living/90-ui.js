/* ------------------------------------------------------------ studio room shell
   Just enough wall, window, archway, floor and ceiling to place the room in
   context — not the house's own wall() builder, so this stays simple and never
   goes stale against changes to 10-walls.js. Coordinates match the real walls
   around this room (see src/js/10-walls.js) so it reads as the same corner. */
floorPlane(0, 8.6, 0, 4.6, 0, M.floor, 2.4);
floorPlane(3.6, 4.9, 4.6, 5.3, 0, M.floor, 2.4);                                  // archway threshold strip
box(0, 8.6, H, H + .05, 0, 4.6, M.ceil, { parent: CEILG, cast: false });
[[0, 5.8], [7.4, 8.6]].forEach(r => box(r[0], r[1], 0, H, 0, .4, M.wall, { solid: true }));      // rear wall, either side of the window
box(5.8, 7.4, 0, .9, 0, .4, M.wall, { solid: true }); box(5.8, 7.4, 2.3, H, 0, .4, M.wall, { solid: true });  // above / below the rear window
box(5.8, 7.4, .9, 2.3, .14, .26, M.glass, { cast: false, recv: false });          // the rear window itself
[[.4, 1.6], [3.2, 4.5]].forEach(r => box(0, .4, r[0], r[1], 0, H, M.wall, { solid: true }));     // left wall, either side of the window
box(0, .4, 0, .9, 1.6, 3.2, M.wall, { solid: true }); box(0, .4, 2.3, H, 1.6, 3.2, M.wall, { solid: true });   // above / below the left window
box(.14, .26, .9, 2.3, 1.6, 3.2, M.glass, { cast: false, recv: false });          // the left window itself
box(8.2, 8.6, 0, H, .4, 4.5, M.wall, { solid: true });                            // right (outside) wall, solid
[[.4, 3.6], [4.9, 8.2]].forEach(r => box(r[0], r[1], 0, H, 4.4, 4.6, M.wall, { solid: true }));  // hall wall, either side of the open archway

/* ------------------------------------------------------------------ colour groups
   Every slot the picker below can change, grouped for the side panel. "keys" can
   list more than one material when they should always move together. */
const GROUPS = [
  { title: 'Seating', items: [
    { label: 'Sofa fabric', keys: ['sofa'] },
    { label: 'Cushions', keys: ['cushion'] },
    { label: 'Accent 1', keys: ['accent1'] },
    { label: 'Accent 2', keys: ['accent2'] },
    { label: 'Accent 3', keys: ['accent3'] },
    { label: 'Dining chair seats', keys: ['chairSeat'] },
    { label: 'Dining chair frames', keys: ['chairFrame'] },
  ] },
  { title: 'Tables & wood', items: [
    { label: 'Dark wood (TV wall, sideboard)', keys: ['woodA'] },
    { label: 'Wood accents (tables)', keys: ['woodB'] },
    { label: 'Stone / counter tops', keys: ['counter'] },
  ] },
  { title: 'Cabinetry & media', items: [
    { label: 'TV & screens', keys: ['screen'] },
    { label: 'Metal frames & legs', keys: ['metal'] },
    { label: 'Hardware & accents', keys: ['metalAccent'] },
    { label: 'Glass', keys: ['glass'] },
  ] },
  { title: 'Soft furnishings', items: [
    { label: 'Living rug', keys: ['rugLiving'] },
    { label: 'Dining rug', keys: ['rugDining'] },
    { label: 'Curtains', keys: ['curtain'] },
    { label: 'Lamp shades', keys: ['paper'] },
  ] },
  { title: 'Decor', items: [
    { label: 'Ceramic ware', keys: ['ceramic'] },
    { label: 'Ceramic accent', keys: ['ceramicAlt'] },
    { label: 'Pendant & lamp glow', keys: ['glow'] },
    { label: 'Dark trim', keys: ['kick'] },
    { label: 'Plants', keys: ['plant', 'plantDark'] },
  ] },
];
const curatedKeys = [...new Set(GROUPS.flatMap(g => g.items.flatMap(i => i.keys)))];
const reverseMap = {}; GROUPS.forEach(g => g.items.forEach(item => item.keys.forEach(k => reverseMap[k] = item)));

/* capture each preset's own defaults once, before any user edit, so "reset" is exact */
const DEFAULTS = {};
['modern', 'scandi', 'lux', 'loft'].forEach(k => { applyStyle(k); DEFAULTS[k] = {}; curatedKeys.forEach(key => DEFAULTS[k][key] = M[key].color.getHex()); });
applyStyle('modern'); let currentPreset = 'modern';

/* ------------------------------------------------------------------- panel UI */
const groupsEl = document.getElementById('groups');
GROUPS.forEach(g => {
  const sec = document.createElement('section');
  const h = document.createElement('h2'); h.textContent = g.title; sec.appendChild(h);
  const row = document.createElement('div'); row.className = 'row';
  g.items.forEach(item => {
    const field = document.createElement('label'); field.className = 'swatch';
    const input = document.createElement('input'); input.type = 'color'; input.value = '#' + M[item.keys[0]].color.getHexString();
    input.addEventListener('input', () => { item.keys.forEach(k => M[k].color.set(input.value)); });
    const span = document.createElement('span'); span.textContent = item.label;
    field.append(input, span); row.appendChild(field); item._input = input; item._field = field;
  });
  sec.appendChild(row); groupsEl.appendChild(sec);
});
function refreshPanel() { GROUPS.forEach(g => g.items.forEach(item => { item._input.value = '#' + M[item.keys[0]].color.getHexString(); })); }

document.querySelectorAll('#presets button').forEach(b => b.addEventListener('click', () => {
  applyStyle(b.dataset.style); currentPreset = b.dataset.style; refreshPanel();
  document.querySelectorAll('#presets button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
}));
document.getElementById('resetBtn').addEventListener('click', () => { curatedKeys.forEach(k => M[k].color.setHex(DEFAULTS[currentPreset][k])); refreshPanel(); });
document.getElementById('copyBtn').addEventListener('click', () => {
  const out = {}; curatedKeys.forEach(k => out[k] = '#' + M[k].color.getHexString());
  const text = JSON.stringify(out, null, 2), pre = document.getElementById('exportOut'), btn = document.getElementById('copyBtn');
  pre.textContent = text; pre.hidden = false;
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => { const old = btn.textContent; btn.textContent = 'Copied'; setTimeout(() => btn.textContent = old, 1400); }).catch(() => { });
});

/* ------------------------------------------------------------- orbit + picking */
const stageEl = document.getElementById('stage'), tipEl = document.getElementById('tooltip');
const orbit = { az: .9, pol: 1.0, dist: 3.2, tx: CX, tz: CZ, ty: .95 };
let dragging = false, lastX = 0, lastY = 0, moved = 0, idle = 0;
function updateCamPos() {
  const sp = Math.sin(orbit.pol), cp = Math.cos(orbit.pol), sa = Math.sin(orbit.az), ca = Math.cos(orbit.az);
  camera.position.set(orbit.tx + orbit.dist * sp * sa, orbit.dist * cp, orbit.tz + orbit.dist * sp * ca);
  camera.lookAt(orbit.tx, orbit.ty, orbit.tz);
}
canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; moved = 0; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', e => {
  if (!dragging) return; const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY; moved += Math.abs(dx) + Math.abs(dy); idle = 0;
  orbit.az -= dx * .0055; orbit.pol = Math.min(1.48, Math.max(.18, orbit.pol - dy * .0055));
});
canvas.addEventListener('pointerup', e => { dragging = false; if (moved < 6) pick(e.clientX, e.clientY); });
canvas.addEventListener('pointercancel', () => { dragging = false; });
canvas.addEventListener('wheel', e => { e.preventDefault(); orbit.dist = Math.min(8, Math.max(1.6, orbit.dist * (1 + e.deltaY * .0012))); idle = 0; }, { passive: false });

const ray = new THREE.Raycaster();
function pick(cx, cy) {
  const r = canvas.getBoundingClientRect(), nx = ((cx - r.left) / r.width) * 2 - 1, ny = -((cy - r.top) / r.height) * 2 + 1;
  ray.setFromCamera({ x: nx, y: ny }, camera);
  const hits = ray.intersectObjects(scene.children, true);
  for (const hobj of hits) {
    const mat = hobj.object.material; if (!mat) continue;
    const key = Object.keys(M).find(k => M[k] === mat), item = key && reverseMap[key];
    if (item) { flash(item); showTip(item.label, cx, cy); return; }
  }
}
function flash(item) { item._field.classList.remove('flash'); void item._field.offsetWidth; item._field.classList.add('flash'); item._field.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
let tipTimer;
function showTip(label, x, y) {
  tipEl.textContent = label; const r = stageEl.getBoundingClientRect(); tipEl.style.left = (x - r.left) + 'px'; tipEl.style.top = (y - r.top) + 'px';
  tipEl.classList.add('show'); clearTimeout(tipTimer); tipTimer = setTimeout(() => tipEl.classList.remove('show'), 1300);
}

/* --------------------------------------------------------------- resize + loop */
function resize() { const w = stageEl.clientWidth, h = stageEl.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(stageEl); resize();
renderer.shadowMap.needsUpdate = true;
let last = performance.now();
function tick(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!dragging) { idle += dt; if (idle > 3) orbit.az += dt * .045; }
  updateCamPos(); renderer.render(scene, camera); requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
window.studio = { orbit, camera, scene, M, applyStyle };   // for scripted screenshots / debugging, mirrors the house tour's window.tour
})();
