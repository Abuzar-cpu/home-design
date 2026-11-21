/* ------------------------------------------------------------ step lights */
// motion sensing: the step you stand on and the next four in your direction light up, then fade a moment after you leave
let stepCur = 0,
  stepDir = 1;
function stepLights(dt) {
  const s = stairH(player.x, player.z);
  let cur = 0;
  if (s !== null && player.y > s - 0.4 && player.y < s + 0.4) cur = Math.round(s / SH);
  if (cur) {
    if (stepCur && cur !== stepCur) stepDir = cur > stepCur ? 1 : -1;
    stepCur = cur;
    STEPS[cur].hold = 0.9;
    [
      [1, 0.75],
      [2, 0.65],
      [3, 0.55],
      [4, 0.45]
    ].forEach(q => {
      const a = cur + stepDir * q[0];
      if (STEPS[a]) STEPS[a].hold = Math.max(STEPS[a].hold, q[1]);
    });
  } else {
    stepCur = 0;
    if (player.y < 0.1 && player.x > 4.55 && player.x <= 5.2 && player.z > 4.6 && player.z < 5.8) {
      STEPS[1].hold = Math.max(STEPS[1].hold, 0.8);
      stepDir = 1;
    }
    if (player.y > 3.0 && player.x > 4.55 && player.x <= 5.2 && player.z > 6.1 && player.z < 7.3) {
      STEPS[18].hold = Math.max(STEPS[18].hold, 0.8);
      STEPS[17].hold = Math.max(STEPS[17].hold, 0.6);
      stepDir = -1;
    }
  }
  let best = null;
  for (let i = 1; i <= 18; i++) {
    const st = STEPS[i];
    st.hold -= dt;
    const tgt = st.hold > 0 ? 1 : 0;
    st.lvl += (tgt - st.lvl) * Math.min(1, dt * (tgt > st.lvl ? 12 : 3));
    if (st.lvl < 0.002) st.lvl = 0;
    const v = st.lvl;
    st.strip.color.setRGB(0.23 + v * 1.0, 0.22 + v * 0.66, 0.21 + v * 0.16);
    st.wash.opacity = v * 0.5;
    st.glow.opacity = v * 0.55;
    st.wash.visible = st.glow.visible = v > 0;
    if (!best || v > best.lvl) best = st;
  }
  if (best && best.lvl > 0) {
    const n = best.n;
    stepLight.position.set(best.gp.position.x + n[0] * 0.3, best.h - 0.12, best.gp.position.z + n[1] * 0.3);
    stepLight.intensity = best.lvl * 0.9;
  } else stepLight.intensity = 0;
}
