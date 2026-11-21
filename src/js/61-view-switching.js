/* ---------------------------------------------------------- view switching */
const P = new THREE.Vector3(),
  Q = new THREE.Quaternion(),
  tmpM = new THREE.Matrix4(),
  tmpE = new THREE.Euler(0, 0, 0, 'YXZ'),
  tgt = new THREE.Vector3(),
  upv = new THREE.Vector3();
function walkPose() {
  P.set(player.x, player.y + EYE, player.z);
  tmpE.set(player.pitch, player.yaw, 0, 'YXZ');
  Q.setFromEuler(tmpE);
  return 68;
}
function dollPose() {
  const sp = Math.sin(orbit.pol),
    cp = Math.cos(orbit.pol),
    sa = Math.sin(orbit.az),
    ca = Math.cos(orbit.az);
  const by = dollLv === 2 ? UPPER_Y : 0;
  P.set(orbit.tx + orbit.dist * sp * sa, by + orbit.dist * cp, orbit.tz + orbit.dist * sp * ca);
  tgt.set(orbit.tx, by + 0.6, orbit.tz);
  upv.set(-sa, 0, -ca);
  tmpM.lookAt(P, tgt, upv);
  Q.setFromRotationMatrix(tmpM);
  return 40;
}
function fitDoll() {
  if (orbit.zoomed) return;
  const t = Math.tan((20 * Math.PI) / 180);
  orbit.dist = Math.max(5.3 / (t * camera.aspect), 8.4 / t) * 1.06;
}
const btn = document.getElementById('viewBtn'),
  roomEl = document.getElementById('room');
const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lvlBtn = document.getElementById('lvlBtn'),
  lvlName = document.getElementById('lvlName');
let dollLv = 1,
  actLv = 0;
function applyVis(asDoll) {
  // which storeys are drawn, and which storey's lamps are lit
  const lv = asDoll ? dollLv : levelOf(player.y);
  roof.visible = upG.visible = !asDoll || dollLv === 2;
  roofTop.visible = !asDoll;
  if (lv !== actLv) {
    actLv = lv;
    fills.forEach(l => {
      l.visible = l.userData.lv === lv;
    });
  }
  rooms.forEach(r => {
    r.sprite.visible = (r.lv || 1) === dollLv;
  });
  lvlBtn.textContent = tr(dollLv === 2 ? 'Show ground floor' : 'Show upper floor');
  lvlName.textContent = tr(lv === 2 ? 'Upper floor' : 'Ground floor');
  renderer.shadowMap.needsUpdate = true;
}
function setDollLevel(l) {
  dollLv = l;
  if (mode === 'doll') {
    applyVis(true);
    lastRoom = null;
  }
}
lvlBtn.addEventListener('click', () => {
  setDollLevel(dollLv === 2 ? 1 : 2);
  lvlBtn.blur();
});
function setMode(m) {
  if (m === mode) return;
  mode = m;
  trans = { t: 0, dur: reduced ? 0.001 : 0.9, p: camera.position.clone(), q: camera.quaternion.clone(), f: camera.fov };
  document.body.classList.toggle('doll', m === 'doll');
  document.body.classList.toggle('walk', m === 'walk');
  btn.textContent = tr(m === 'doll' ? 'Walk view' : 'Dollhouse view');
  lvlBtn.hidden = m !== 'doll';
  if (m === 'doll') {
    if (document.pointerLockElement) document.exitPointerLock();
    fitDoll();
    dollLv = levelOf(player.y);
    applyVis(true);
    dollOnly.visible = true;
    scene.fog.near = 200;
    scene.fog.far = 600;
  } else {
    dollOnly.visible = false;
    scene.fog.near = 60;
    scene.fog.far = 230;
  }
  lastRoom = null;
}
btn.addEventListener('click', () => {
  setMode(mode === 'walk' ? 'doll' : 'walk');
  btn.blur();
});
function jumpTo(r) {
  player.x = r.at[0];
  player.z = r.at[1];
  player.yaw = r.at[2];
  player.pitch = 0;
  player.y = r.lv === 2 ? UPPER_Y : groundH(player.x, player.z);
  if (mode === 'walk') applyVis(false);
  setMode('walk');
}
document.querySelectorAll('#styles button').forEach(b =>
  b.addEventListener('click', () => {
    applyStyle(b.dataset.style);
    b.blur();
  })
);
const styleFromHash = () => Object.keys(STY).find(k => STY[k].hash === location.hash.slice(1));
window.addEventListener('hashchange', () => {
  const k = styleFromHash();
  if (k) applyStyle(k);
});
