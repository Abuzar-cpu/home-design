/* ------------------------------------------------------------ guided tour */
// music: slow chord pad with sparse bell notes, synthesised with Web Audio, no sound files
const music = { ctx: null, on: false, muted: false, timer: null, next: 0, bar: 0 };
const muteBtn = document.getElementById('muteBtn'),
  tourBtn = document.getElementById('tourBtn');
const CHORDS = [
    [48, 55, 64, 71],
    [45, 52, 60, 67],
    [41, 48, 57, 64],
    [43, 50, 59, 62]
  ],
  BELLS = [72, 74, 76, 79, 81, 84],
  hz = m => 440 * Math.pow(2, (m - 69) / 12);
function tone(f, t, dur, type, peak, att, rel) {
  const c = music.ctx,
    o = c.createOscillator(),
    g = c.createGain();
  o.type = type;
  o.frequency.value = f;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(peak, t + att);
  g.gain.setValueAtTime(peak, t + Math.max(att, dur - rel));
  g.gain.linearRampToValueAtTime(0, t + dur);
  o.connect(g);
  g.connect(music.bus);
  o.start(t);
  o.stop(t + dur + 0.05);
}
function musicSched() {
  const c = music.ctx;
  if (!c || !music.on) return;
  while (music.next < c.currentTime + 1.5) {
    const t = music.next;
    CHORDS[music.bar % 4].forEach(m => {
      tone(hz(m), t, 8.6, 'sine', 0.07, 2.6, 3.2);
      tone(hz(m) * 1.004, t, 8.6, 'triangle', 0.028, 3.2, 3.2);
    });
    for (let k = 0; k < 4; k++)
      if (Math.random() < 0.7)
        tone(
          hz(BELLS[(Math.random() * BELLS.length) | 0]),
          t + k * 2 + Math.random() * 1.2,
          2.4,
          'sine',
          0.045,
          0.02,
          2.3
        );
    music.next += 8;
    music.bar++;
  }
}
function musicGain() {
  if (!music.ctx) return;
  const g = music.master.gain,
    t = music.ctx.currentTime;
  g.cancelScheduledValues(t);
  g.setTargetAtTime(music.on && !music.muted ? 0.55 : 0, t, 0.7);
  muteBtn.textContent = tr(music.muted ? 'Unmute music' : 'Mute music');
  muteBtn.hidden = !music.on;
}
function musicStart() {
  try {
    if (!music.ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      const c = (music.ctx = new C());
      music.master = c.createGain();
      music.master.gain.value = 0;
      music.bus = c.createGain();
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1700;
      const d = c.createDelay(1);
      d.delayTime.value = 0.42;
      const fb = c.createGain();
      fb.gain.value = 0.32;
      const wet = c.createGain();
      wet.gain.value = 0.35;
      music.bus.connect(lp);
      lp.connect(music.master);
      lp.connect(d);
      d.connect(fb);
      fb.connect(d);
      d.connect(wet);
      wet.connect(music.master);
      music.master.connect(c.destination);
    }
    const r = music.ctx.resume();
    if (r && r.catch) r.catch(() => {});
    music.on = true;
    music.next = music.ctx.currentTime + 0.15;
    musicGain();
    if (!music.timer) music.timer = setInterval(musicSched, 400);
    musicSched();
  } catch (e) {}
}
function musicStop() {
  music.on = false;
  musicGain();
  if (music.timer) {
    clearInterval(music.timer);
    music.timer = null;
  }
}
muteBtn.addEventListener('click', () => {
  music.muted = !music.muted;
  musicGain();
  muteBtn.blur();
});

// route: points are [x, z]; a point with a stop pauses there, turns to look at "look" and shows the card
const ST = (n, m2, tip, lx, lz) => ({ n, s: m2.toFixed(1) + ' m²', tip, look: [lx, lz] });
const ROUTE = [
  [10.4, 12.65],
  [8.4, 12.65],
  [5.3, 12.65],
  [4.3, 12.6, ST('Porch', 3.9, 'Glazed entry with a storage room beside it', 2.0, 12.6)],
  [4.3, 11.7],
  [4.3, 10.7, ST('Hall', 9.7, 'One central hall reaches every room directly', 4.3, 6)],
  [4.3, 11.0],
  [3.0, 11.0],
  [1.62, 10.95, ST('Bathroom', 4.3, 'Walk-in shower with a daylight window', 0.9, 9.3)],
  [3.0, 11.0],
  [2.8, 11.0],
  [2.8, 10.05, ST('WC', 1.8, 'Separate guest WC off its own lobby', 2.8, 8.8)],
  [2.8, 11.0],
  [4.3, 11.0],
  [4.3, 8.15],
  [5.5, 8.15],
  [5.8, 8.3, ST('Kitchen', 12, 'Island with a table for two and a sink under the front window', 7.2, 10.2)],
  [5.5, 8.15],
  [4.3, 8.15],
  [4.3, 5.25],
  [2.9, 5.25],
  [2.6, 5.5, ST('Guest / study', 12, 'Twin guest room with a wardrobe and a writing desk', 1.6, 7.6)],
  [2.9, 5.25],
  [4.3, 5.25],
  [4.3, 4.5],
  [4.45, 3.45, ST('Living room', 31.2, 'Nearly 8 m of open living space with two windows', 2.0, 1.4)],
  [
    4.6,
    3.3,
    Object.assign(ST('Dining area', 31.2, 'Seats six beside the rear window', 6.5, 2.2), {
      s: 'Part of the 31.2 m² living space'
    })
  ],
  [4.3, 4.5],
  [4.3, 5.2],
  [5.3, 5.2],
  [7.55, 5.2],
  [7.62, 5.95],
  [7.55, 6.7],
  [5.0, 6.7],
  [4.3, 6.2],
  [4.25, 5.1],
  [4.25, 4.2],
  [4.8, 3.8, ST('Bedroom', 18.4, 'Main bedroom with its own en-suite and walk-in wardrobe', 7.2, 2.3)],
  [4.3, 1.8],
  [3.0, 1.8],
  [2.7, 1.8, ST('En-suite', 6.0, 'Bath with a shower over it, double basin and WC', 0.9, 0.8)],
  [3.0, 1.8],
  [4.3, 1.8],
  [4.3, 3.0],
  [3.0, 3.0],
  [2.0, 3.6, ST('Walk-in wardrobe', 9.0, 'Wardrobes on both sides, straight off the bedroom', 1.9, 5.4)],
  [3.0, 3.0],
  [4.3, 3.0],
  [4.25, 4.2],
  [4.25, 4.9],
  [4.3, 5.25],
  [4.3, 6.55],
  [3.0, 6.55],
  [2.4, 7.4, ST("Baby's room", 8.7, 'Right next to the main suite, with a gate at the stairs', 1.6, 6.1)],
  [3.0, 6.55],
  [4.3, 6.55],
  [4.3, 10.25],
  [3.0, 10.25],
  [2.6, 10.1, ST('Study / guest', 8.1, 'Desk by the window and a daybed for guests', 1.2, 9.1)],
  [3.0, 10.25],
  [4.3, 10.25],
  [4.3, 8.15],
  [5.9, 8.15],
  [5.9, 8.75, ST('Gaming room', 12, 'Set apart from the bedrooms for late nights', 7.4, 9.7)],
  [5.9, 8.15],
  [4.3, 8.15],
  [4.3, 11.0],
  [4.3, 11.9],
  [4.3, 12.65, ST('Balcony', 14.6, 'Full-width balcony over the front garden', 1.5, 14.5)]
];
const tcard = document.getElementById('tcard'),
  tcN = document.getElementById('tcN'),
  tcS = document.getElementById('tcS'),
  tcT = document.getElementById('tcT');
let tour = null,
  spin = false,
  cardTimer = 0;
const STOP_T = 12; // seconds at each stop: 1.5 to face the view, about 10 for the full turn
let cardArgs = null;
function showCard(n, s2, tip) {
  cardArgs = [n, s2, tip];
  tcN.textContent = tr(n);
  tcS.textContent = fd(tr(s2));
  tcT.textContent = tr(tip);
  tcard.classList.add('show');
}
function startTour() {
  if (document.pointerLockElement) document.exitPointerLock();
  clearTimeout(cardTimer);
  tcard.classList.remove('show');
  spin = false;
  player.x = ROUTE[0][0];
  player.z = ROUTE[0][1];
  player.y = GROUND;
  player.yaw = Math.PI / 2;
  player.pitch = 0;
  tour = { i: 0, pause: 0, look: null };
  document.body.classList.add('touring');
  tourBtn.textContent = tr('Stop tour');
  if (mode !== 'walk') setMode('walk');
  else applyVis(false);
  musicStart();
}
function endTour(done) {
  if (!tour) return;
  tour = null;
  document.body.classList.remove('touring');
  tourBtn.textContent = tr('Start tour');
  tcard.classList.remove('show');
  if (done) {
    setMode('doll');
    setDollLevel(2);
    spin = true;
    showCard(
      'The whole home',
      'About 161 m² inside, over two floors',
      'Plus the full-width balcony and the covered porch'
    );
    cardTimer = setTimeout(() => {
      tcard.classList.remove('show');
      musicStop();
    }, 12000);
  } else musicStop();
}
function tourStep(dt) {
  const T = tour,
    turn = (want, rate) => {
      let d = want - player.yaw;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      player.yaw += d * Math.min(1, dt * rate);
    };
  if (T.pause > 0) {
    // face the room's best view, then turn one slow full circle before moving on
    T.pause -= dt;
    const el = STOP_T - T.pause;
    if (el < 1.5) {
      turn(Math.atan2(player.x - T.look[0], player.z - T.look[1]), 2.4);
      T.yaw0 = player.yaw;
    } else {
      const u = Math.min(1, (el - 1.5) / (STOP_T - 2.1));
      player.yaw = T.yaw0 - 2 * Math.PI * (u * u * (3 - 2 * u));
    }
    if (T.pause <= 0) {
      player.yaw = T.yaw0;
      tcard.classList.remove('show');
    }
  } else {
    const nx = ROUTE[T.i + 1];
    if (!nx) {
      endTour(true);
      return;
    }
    const dx = nx[0] - player.x,
      dz = nx[1] - player.z,
      d = Math.hypot(dx, dz),
      sp =
        (stairH(player.x, player.z) !== null || (groundH(player.x, player.z) < 0 && player.x < 8.2) ? 0.95 : 1.3) * dt;
    if (d > 0.02) turn(Math.atan2(-dx, -dz), 3.2);
    if (d <= sp) {
      player.x = nx[0];
      player.z = nx[1];
      T.i++;
      if (nx[2]) {
        T.pause = STOP_T;
        T.look = nx[2].look;
        showCard(nx[2].n, nx[2].s, nx[2].tip);
      }
    } else {
      player.x += (dx / d) * sp;
      player.z += (dz / d) * sp;
    }
    player.pitch += (-0.04 - player.pitch) * Math.min(1, dt * 2);
  }
  const target = floorH(player.x, player.z, player.y);
  player.y += (target - player.y) * Math.min(1, dt * 10);
  if (Math.abs(target - player.y) < 0.002) player.y = target;
}
tourBtn.addEventListener('click', () => {
  if (tour) endTour(false);
  else startTour();
  tourBtn.blur();
});
