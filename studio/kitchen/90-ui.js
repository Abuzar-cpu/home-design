/* ---------------------------------------------------------- studio room shell
   Just enough wall, window, doorway, floor and ceiling to place the kitchen in
   context — not the house's own wall() builder, so this stays simple and never
   goes stale against changes to 10-walls.js. Coordinates match the real walls
   around this room (see src/js/10-walls.js) so it reads as the same corner. */
floorPlane(5.0, 8.2, 6.8, 11.9, 0, M.tile, 1.2);
floorPlane(4.6, 5.0, 7.7, 8.6, 0, M.tile, 1.2);                                   // doorway threshold strip
box(8.2, 8.6, 0, H, 6.8, 11.9, M.wall, { solid: true });                         // outside wall — appliance run backs onto it
box(7.3, 7.5, 0, H, 5.2, 8.2, M.wall, { solid: true });                          // stair-side partition
[[6.8, 7.3], [8.6, 11.9]].forEach(r => box(5.0, 5.2, 0, H, r[0], r[1], M.wall, { solid: true }));   // hall wall, either side of the doorway
[[4.6, 5.9], [7.5, 8.6]].forEach(r => box(r[0], r[1], 0, H, 11.5, 11.9, M.wall, { solid: true }));  // front wall, either side of the window
box(5.9, 7.5, 0, .9, 11.5, 11.9, M.wall, { solid: true }); box(5.9, 7.5, 2.3, H, 11.5, 11.9, M.wall, { solid: true }); // above / below the window
box(5.9, 7.5, .9, 2.3, 11.44, 11.56, M.glass, { cast: false, recv: false });     // the window itself
box(4.6, 8.6, H, H + .05, 6.8, 11.9, M.ceil, { parent: CEILG, cast: false });

/* ------------------------------------------------------------------ colour groups
   Every slot the picker below can change, grouped for the side panel. "keys" can
   list more than one material when they should always move together. */
const GROUPS = [
  { title: 'Cabinetry', items: [
    { label: 'Lower cabinets', keys: ['cabinet'] },
    { label: 'Wall cabinets', keys: ['cabinetUp'] },
    { label: 'Kickboards & trim', keys: ['kick'] },
  ] },
  { title: 'Surfaces', items: [
    { label: 'Countertop & island top', keys: ['counter'] },
    { label: 'Wood accents', keys: ['woodB'] },
    { label: 'Dark wood trim', keys: ['woodA'] },
  ] },
  { title: 'Metal & glass', items: [
    { label: 'Appliance steel', keys: ['steel'] },
    { label: 'Hardware', keys: ['metalAccent'] },
    { label: 'Legs & frames', keys: ['metal'] },
    { label: 'Glass-front panels', keys: ['screen'] },
    { label: 'Glassware', keys: ['glassObj'] },
  ] },
  { title: 'Seating', items: [
    { label: 'Stool & chair seats', keys: ['chairSeat'] },
    { label: 'Chair frames', keys: ['chairFrame'] },
  ] },
  { title: 'Tabletop & decor', items: [
    { label: 'Ceramic ware', keys: ['ceramic'] },
    { label: 'Ceramic accent', keys: ['ceramicAlt'] },
    { label: 'Linens', keys: ['cushion', 'towel'] },
    { label: 'Pendant glow', keys: ['glow'] },
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
const orbit = { az: -2.3, pol: 1.05, dist: 4.0, tx: CX, tz: CZ, ty: .95 };
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
canvas.addEventListener('wheel', e => { e.preventDefault(); orbit.dist = Math.min(6.5, Math.max(1.6, orbit.dist * (1 + e.deltaY * .0012))); idle = 0; }, { passive: false });

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
