/* ------------------------------------------------------------------- loop */
// Match the renderer and camera to the window size.
function resize() {
  const w = window.innerWidth,
    h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (mode === 'doll') fitDoll();
}
window.addEventListener('resize', resize);
resize();
let last = performance.now(),
  lastRoom = null;
const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
// Floor name and room name in the corner, updated as you walk.
function hud() {
  const plv = levelOf(player.y);
  if (mode === 'walk' && !trans && plv !== actLv) applyVis(false);
  const r = mode === 'walk' ? roomAt(player.x, player.z, plv) : null,
    key = mode + plv + dollLv + (r ? r.n : '');
  if (key === lastRoom) return;
  lastRoom = key;
  if (mode === 'doll')
    roomEl.innerHTML =
      '<b>' +
      tr(dollLv === 2 ? 'Upper floor' : 'Ground floor') +
      ', ' +
      tr('roof off') +
      '</b><span>' +
      tr('Drag to turn, pinch or scroll to zoom, tap a room to walk there') +
      '</span>';
  else if (r) roomEl.innerHTML = '<b>' + tr(r.n) + '</b><span>' + fd(r.d) + '</span>';
  else
    roomEl.innerHTML =
      '<b>' + tr('Front yard') + '</b><span>' + tr('Walk up the curved stair to the front door') + '</span>';
}
let qN = 0,
  qSum = 0,
  qLevel = 0,
  qSkip = 90;
function quality(raw) {
  // step the resolution down if this machine cannot hold about 30 fps
  if (qSkip > 0) {
    qSkip--;
    return;
  }
  if (qLevel > 1 || document.hidden || raw > 0.5) return;
  qSum += raw;
  if (++qN < 80) return;
  const avg = qSum / qN;
  qN = 0;
  qSum = 0;
  if (avg < 0.034) return;
  qLevel++;
  if (qLevel === 1) {
    renderer.setPixelRatio(1);
    resize();
  } else {
    sun.shadow.mapSize.set(1024, 1024);
    if (sun.shadow.map) {
      sun.shadow.map.dispose();
      sun.shadow.map = null;
    }
    renderer.shadowMap.needsUpdate = true;
  }
}
// Animation frame: move the player or the tour, update lights and the camera, render.
function tick(now) {
  const raw = (now - last) / 1000,
    dt = Math.max(0, Math.min(0.05, raw));
  last = now;
  if (Math.abs(timeTarget - timeCur) > 0.002) {
    timeCur += (timeTarget - timeCur) * Math.min(1, dt * 7);
    applyTime();
  }
  quality(raw);
  if (mode === 'walk' && !trans) {
    if (tour) tourStep(dt);
    else stepPlayer(dt);
  }
  stepLights(dt);
  if (spin && mode === 'doll' && !trans) {
    orbit.az += dt * 0.1;
    orbit.pol += (0.8 - orbit.pol) * Math.min(1, dt * 0.5);
  }
  const fov = mode === 'walk' ? walkPose() : dollPose();
  if (trans) {
    trans.t += dt / trans.dur;
    const k = ease(Math.min(1, trans.t));
    camera.position.lerpVectors(trans.p, P, k);
    camera.quaternion.slerpQuaternions(trans.q, Q, k);
    camera.fov = trans.f + (fov - trans.f) * k;
    camera.updateProjectionMatrix();
    if (trans.t >= 1) {
      trans = null;
      if (mode === 'walk') applyVis(false);
    }
  } else {
    camera.position.copy(P);
    camera.quaternion.copy(Q);
    if (camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }
  marker.position.set(player.x, player.y + 0.06, player.z);
  marker.rotation.y = player.yaw;
  hud();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
const langBtn = document.getElementById('langBtn');
// Switch the page to language l ('en' or 'az') and remember it.
function applyLang(l) {
  lang = l;
  document.documentElement.lang = l;
  try {
    localStorage.setItem('tour-lang', l);
  } catch (e) {}
  document.querySelectorAll('.sheet p, #styles button, #time label, #hint dt, #hint dd, #err p').forEach(el => {
    if (!el.dataset.en) el.dataset.en = el.textContent;
    el.textContent = tr(el.dataset.en);
  });
  langBtn.textContent = l === 'az' ? 'English' : 'Azərbaycanca';
  langBtn.lang = l === 'az' ? 'en' : 'az';
  btn.textContent = tr(mode === 'doll' ? 'Walk view' : 'Dollhouse view');
  tourBtn.textContent = tr(tour ? 'Stop tour' : 'Start tour');
  muteBtn.textContent = tr(music.muted ? 'Unmute music' : 'Mute music');
  lvlBtn.textContent = tr(dollLv === 2 ? 'Show ground floor' : 'Show upper floor');
  lvlName.textContent = tr((mode === 'doll' ? dollLv : levelOf(player.y)) === 2 ? 'Upper floor' : 'Ground floor');
  rooms.forEach(r => r.draw());
  lastRoom = null;
  if (sunReady && style) applyTime();
  if (cardArgs && tcard.classList.contains('show')) showCard(cardArgs[0], cardArgs[1], cardArgs[2]);
}
langBtn.addEventListener('click', () => {
  applyLang(lang === 'az' ? 'en' : 'az');
  langBtn.blur();
});
applyStyle(styleFromHash() || 'modern');
applyVis(false);
applyLang(lang);
window.tour = {
  STEPS,
  stepLights,
  applyLang,
  startTour,
  tourState: () => tour,
  tourStep,
  ROUTE,
  music,
  sim: (yaw, n) => {
    player.yaw = yaw;
    keys.KeyW = true;
    for (let i = 0; i < n; i++) stepPlayer(0.03);
    keys.KeyW = false;
    return { x: player.x, y: player.y, z: player.z };
  },
  setDollLevel,
  setTime: (t, now) => {
    timeTarget = t;
    tod.value = t;
    if (now) {
      timeCur = t;
      applyTime();
    }
  },
  busy: () => !!trans,
  player,
  orbit,
  setMode,
  setStyle: applyStyle,
  jumpTo: n => jumpTo(rooms.find(r => r.n === n)),
  rooms,
  colliders
};
if (document.fonts && document.fonts.load)
  Promise.all([document.fonts.load('600 58px "Barlow Condensed"'), document.fonts.load('500 36px Barlow')])
    .then(() => rooms.forEach(r => r.draw()))
    .catch(() => {});
requestAnimationFrame(tick);
