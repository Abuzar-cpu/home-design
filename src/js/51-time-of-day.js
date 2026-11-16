/* ------------------------------------------------------------ time of day */
const stars = (function () {
  const r = rng(77), pos = []; for (let i = 0; i < 500; i++) { const a = r() * 6.2832, e = Math.asin(.06 + r() * .94), R = 380; pos.push(Math.cos(a) * Math.cos(e) * R, Math.sin(e) * R, Math.sin(a) * Math.cos(e) * R); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false })); scene.add(p); return p;
})();
const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }, mix = (a, b, t) => a + (b - a) * t;
const SKY = { day: [[95, 155, 214], [183, 211, 234], [230, 238, 242]], gold: [[84, 120, 176], [240, 188, 142], [255, 214, 160]], dusk: [[36, 46, 84], [118, 86, 118], [224, 136, 90]], night: [[6, 9, 20], [11, 17, 36], [22, 30, 52]] };
function skyCols(el) {
  let a, b, t; if (el > 25) { a = b = SKY.day; t = 0; } else if (el > 5) { a = SKY.gold; b = SKY.day; t = (el - 5) / 20; } else if (el > -6) { a = SKY.dusk; b = SKY.gold; t = (el + 6) / 11; } else { a = SKY.night; b = SKY.dusk; t = Math.max(0, Math.min(1, (el + 16) / 10)); }
  return a.map((c, i) => c.map((v, j) => Math.round(mix(v, b[i][j], t))));
}
let timeCur = 15, timeTarget = 15;
const todOut = document.getElementById('todOut'), tod = document.getElementById('tod'), rgb = c => 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
function applyTime() {
  const t = timeCur, a = (t - 6) / 13.5 * Math.PI, el = Math.sin(a) * 58, er = el * Math.PI / 180, ch = Math.cos(er), R = 30;
  // the sun rises on the right-hand (grid 5) side, passes over the front and sets on the left-hand (grid 1) side
  sun.position.set(4.3 + Math.cos(a) * ch * R, Math.max(.6, Math.sin(er) * R), 6.5 + 3 + Math.sin(a) * ch * R * .55);
  sun.intensity = smooth(-2, 10, el) * 2.3; sun.visible = sun.intensity > .01;
  const k = smooth(2, 24, el); sun.color.setRGB(1, mix(.5, .93, k), mix(.22, .82, k));
  const day = smooth(-8, 15, el), L = 1 - smooth(-4, 9, el);
  const gold = (1 - smooth(4, 26, el)) * smooth(-6, 3, el); hemi.intensity = mix(.07, .34, day); hemi.color.setRGB(mix(.14, .88, day) + .12 * gold, mix(.18, .93, day) - .12 * gold, mix(.34, 1, day) - .42 * gold); hemi.groundColor.setRGB(mix(.05, .5, day), mix(.05, .42, day), mix(.07, .32, day));
  amb.intensity = mix(.025, .08, day) + .1 * gold; amb.color.setRGB(1, mix(.95, .7, gold), mix(.88, .42, gold));
  fills.forEach(l => { l.intensity = l.userData.base * (.75 * day + 1.5 * L); });
  M.glow.emissiveIntensity = .3 + 1.5 * L; M.led.emissiveIntensity = .22 + 1.8 * L; haloMat.opacity = L * .55; haloMat.visible = L > .02;
  const ek = Math.max(day, .32 * L) + .06; Object.keys(M).forEach(n => { const m = M[n]; m.envMapIntensity = m.userData.envNow * ek; });
  renderer.toneMappingExposure = STY[style].exp * (1 + .14 * L);
  const c = skyCols(el), gr = skyG.createLinearGradient(0, 0, 0, 256), dk = (v, f) => v.map(x => Math.round(x * f));
  gr.addColorStop(0, rgb(c[0])); gr.addColorStop(.42, rgb(c[1])); gr.addColorStop(.5, rgb(c[2])); gr.addColorStop(.52, rgb(dk(c[2], .86))); gr.addColorStop(1, rgb(dk(c[2], .62)));
  skyG.fillStyle = gr; skyG.fillRect(0, 0, 8, 256); skyTex.needsUpdate = true; scene.fog.color.set(rgb(c[2]));
  stars.material.opacity = 1 - smooth(-15, -5, el); stars.visible = stars.material.opacity > .01;
  renderer.shadowMap.needsUpdate = true;
  const hh = Math.floor(t), mm = Math.floor((t - hh) * 60 / 5) * 5;
  todOut.textContent = (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm + ' · ' + tr(el < -5 ? 'Night' : t > 13 && el < 14 ? 'Sunset' : t < 10.5 ? 'Morning' : t < 14 ? 'Midday' : 'Afternoon');
}
sunReady = true;
tod.addEventListener('input', () => { timeTarget = +tod.value; });
tod.addEventListener('change', () => tod.blur());

