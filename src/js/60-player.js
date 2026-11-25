/* ---------------------------------------------------------------- player */
const player = { x: 6.3, z: 19.6, y: GROUND, yaw: 0.2, pitch: 0.1 };
const orbit = { az: 0, pol: 0.3, dist: 26, tx: 4.3, tz: 6.9, zoomed: false };
let mode = 'walk',
  trans = null;
const keys = {},
  joy = { x: 0, y: 0 };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Ground height outside the stair: the floor, the porch and entrance, a tread of the entrance stair, or the garden.
function groundH(x, z) {
  if (x > 0 && x < 8.6 && z > 0 && z < 11.9) return 0;
  if (x >= 0 && x < 8.2 && z >= 11.9 && z < 13.6) return 0;
  const f = fanH(x, z);
  if (f !== null) return f;
  return GROUND;
}
// Inside the stairwell opening of the upper floor.
function inVoid(x, z) {
  return x > 5.2 && x < 8.2 && z > 4.6 && z < 7.3;
}
// Tread height of the stair at (x, z): first flight, winders, second flight.
function stairH(x, z) {
  // tread height under a point in the stairwell
  if (!inVoid(x, z)) return null;
  if (x >= 7.0)
    return (8 + Math.min(3, Math.max(0, Math.floor(Math.atan2(x - 7, 5.95 - z) / (Math.PI / 4))))) * (UPPER_Y / 18);
  if (z <= 5.8) return (Math.min(6, Math.floor((x - 5.2) / (1.8 / 7))) + 1) * (UPPER_Y / 18);
  if (z >= 6.1) return (12 + Math.min(5, Math.floor((7.0 - x) / 0.3))) * (UPPER_Y / 18);
  return null;
}
// highest surface the walker can stand on from height cy: ground, a stair tread, or the upper floor
function floorH(x, z, cy) {
  cy = cy || 0;
  let best = groundH(x, z);
  const s = stairH(x, z);
  if (s !== null && s <= cy + 0.45 && s > best) best = s;
  if (cy >= 2.65 && x > 0 && x < 8.6 && z > 0 && z < 13.6 && !inVoid(x, z)) best = UPPER_Y;
  return best;
}
const levelOf = y => (y > 1.55 ? 2 : 1);
// Push the walker at (x, z), feet at fy, out of every collider it overlaps (3 passes).
function resolve(x, z, fy) {
  for (let it = 0; it < 3; it++)
    for (let i = 0; i < colliders.length; i++) {
      const c = colliders[i];
      if (c.y0 >= fy + 1.7 || c.y1 <= fy + 0.38) continue;
      const cx = clamp(x, c.x0, c.x1),
        cz = clamp(z, c.z0, c.z1),
        dx = x - cx,
        dz = z - cz,
        d2 = dx * dx + dz * dz;
      if (d2 >= RAD * RAD) continue;
      if (d2 > 1e-9) {
        const d = Math.sqrt(d2);
        x = cx + (dx / d) * RAD;
        z = cz + (dz / d) * RAD;
      } else {
        const l = x - c.x0,
          r = c.x1 - x,
          n = z - c.z0,
          s = c.z1 - z,
          m = Math.min(l, r, n, s);
        if (m === l) x = c.x0 - RAD;
        else if (m === r) x = c.x1 + RAD;
        else if (m === n) z = c.z0 - RAD;
        else z = c.z1 + RAD;
      }
    }
  return [x, z];
}
// Move the walker for dt seconds from the keys / joystick: walk, collide, follow stairs and floors.
function stepPlayer(dt) {
  let f = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0) - joy.y;
  let s = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0) + joy.x;
  const len = Math.hypot(f, s);
  if (len > 1) {
    f /= len;
    s /= len;
  }
  if (len > 0.01) {
    if (!stepPlayer.m) {
      stepPlayer.m = true;
      document.body.classList.add('moved');
    }
    const sp = (keys.ShiftLeft || keys.ShiftRight ? 4.2 : 2.3) * dt,
      sy = Math.sin(player.yaw),
      cy = Math.cos(player.yaw);
    let nx = player.x + (-sy * f + cy * s) * sp,
      nz = player.z + (-cy * f - sy * s) * sp;
    nx = clamp(nx, -30, 40);
    nz = clamp(nz, -30, 45);
    const q = resolve(nx, nz, Math.max(player.y, floorH(nx, nz, player.y)));
    player.x = q[0];
    player.z = q[1];
  }
  const target = floorH(player.x, player.z, player.y);
  player.y += (target - player.y) * Math.min(1, dt * 12);
  if (Math.abs(target - player.y) < 0.002) player.y = target;
}
