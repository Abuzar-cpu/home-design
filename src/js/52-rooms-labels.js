/* ------------------------------------------------------ rooms and labels */
const rooms = [
  { n: 'Living + dining', d: '7.8 × 4.0 m · 31.2 m²', x0: .4, x1: 8.2, z0: .4, z1: 4.5, at: [4.45, 3.5, .55], lw: 3.4 },
  { n: 'Guest / study', d: '3.0 × 4.0 m · 12.0 m²', x0: .4, x1: 3.5, z0: 4.5, z1: 8.7, at: [2.6, 5.45, 2.75], lw: 2.6 },
  { n: 'Bathroom', d: '1.6 × 2.7 m · 4.3 m²', x0: .4, x1: 2.1, z0: 8.7, z1: 11.5, at: [1.6, 10.9, .35], lw: 1.5 },
  { n: 'WC', d: '1.2 × 1.5 m', x0: 2.1, x1: 3.4, z0: 8.7, z1: 10.4, at: [2.8, 10.0, 0], lw: 1.05 },
  { n: 'Lobby', d: '1.2 × 1.0 m', x0: 2.1, x1: 3.5, z0: 10.4, z1: 11.5, at: [2.8, 11.0, 1.57], lw: 1.05 },
  { n: 'Kitchen', d: '3.0 × 4.0 m · 12.0 m²', x0: 5.1, x1: 8.2, z0: 7.4, z1: 11.5, at: [5.75, 8.3, -2.3], lw: 2.6 },
  { n: 'Stair', d: '3.0 × 2.7 m · 18 risers', x0: 5.1, x1: 8.2, z0: 4.5, z1: 7.4, at: [4.3, 6.7, -1.2], lw: 2.2 },
  { n: 'Hall', d: '1.4 × 6.9 m · 9.7 m²', x0: 3.5, x1: 5.1, z0: 4.5, z1: 11.7, at: [4.3, 10.6, 0], lw: 1.3 },
  { n: 'Storage', d: '2.5 × 1.5 m · 3.8 m²', x0: 0, x1: 3.0, z0: 11.7, z1: 13.6, at: [1.5, 12.95, .3], lw: 2.0 },
  { n: 'Porch', d: '2.6 × 1.5 m · 3.9 m²', x0: 3.0, x1: 5.7, z0: 11.7, z1: 13.6, at: [5.2, 12.55, 1.57], lw: 2.0 },
  { n: 'Entrance steps', d: '9 risers up to the porch', x0: 5.7, x1: 8.1, z0: 11.9, z1: 13.4, at: [10.4, 12.9, 1.5], lw: 2.0 },
  { n: 'Bedroom', d: '4.6 × 4.0 m · 18.4 m²', lv: 2, x0: 3.6, x1: 8.2, z0: .4, z1: 4.5, at: [4.75, 3.85, -.95], lw: 2.8 },
  { n: 'En-suite', d: '3.0 × 2.0 m · 6.0 m²', lv: 2, x0: .4, x1: 3.5, z0: .4, z1: 2.45, at: [2.9, 1.8, 1.57], lw: 2.2 },
  { n: 'Walk-in wardrobe', d: '3.0 × 3.0 m · 9.0 m²', lv: 2, x0: .4, x1: 3.5, z0: 2.45, z1: 5.6, at: [1.9, 4.8, 0], lw: 2.6 },
  { n: "Baby's room", d: '3.0 × 2.9 m · 8.7 m²', lv: 2, x0: .4, x1: 3.5, z0: 5.6, z1: 8.7, at: [2.4, 7.9, .42], lw: 2.6 },
  { n: 'Study / guest', d: '3.0 × 2.7 m · 8.1 m²', lv: 2, x0: .4, x1: 3.5, z0: 8.7, z1: 11.5, at: [2.6, 10.1, .95], lw: 2.6 },
  { n: 'Gaming room', d: '3.0 × 4.0 m · 12.0 m²', lv: 2, x0: 5.1, x1: 8.2, z0: 7.4, z1: 11.5, at: [5.85, 8.65, -2.35], lw: 2.6 },
  { n: 'Stair', d: '3.0 × 2.7 m · 18 risers', lv: 2, x0: 5.1, x1: 8.2, z0: 4.5, z1: 7.4, at: [4.3, 5.2, -1.57], lw: 2.2 },
  { n: 'Upper hall', d: '1.4 × 6.9 m · 9.7 m²', lv: 2, x0: 3.5, x1: 5.1, z0: 4.5, z1: 11.7, at: [4.3, 10.8, 0], lw: 1.3 },
  { n: 'Balcony', d: '8.6 × 1.7 m · 14.6 m²', lv: 2, x0: 0, x1: 8.6, z0: 11.7, z1: 13.6, at: [4.3, 12.7, 3.14], lw: 2.4 }
];
const roomAt = (x, z, lv) => rooms.find(r => (r.lv || 1) === lv && x >= r.x0 && x < r.x1 && z >= r.z0 && z < r.z1);
rooms.forEach(r => {
  const c = document.createElement('canvas'); c.width = 512; c.height = 150; const g = c.getContext('2d');
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
  r.draw = () => {
    g.clearRect(0, 0, 512, 150); g.fillStyle = 'rgba(243,241,234,.94)'; g.fillRect(0, 0, 512, 150); g.fillStyle = '#2b56c5'; g.fillRect(0, 0, 10, 150);
    g.fillStyle = '#16202b'; g.textAlign = 'center'; g.font = '600 58px "Barlow Condensed", "Arial Narrow", Arial, sans-serif'; g.fillText(tr(r.n).toLocaleUpperCase(lang), 261, 68, 480);
    g.fillStyle = '#566170'; g.font = '500 36px Barlow, Arial, sans-serif'; g.fillText(fd(r.d), 261, 120, 480); t.needsUpdate = true;
  }; r.draw();
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, toneMapped: false, fog: false }));
  s.scale.set(r.lw, r.lw * 150 / 512, 1); s.position.set((r.x0 + r.x1) / 2, (r.lv === 2 ? 3.1 : 0) + 1.9, (r.z0 + r.z1) / 2); s.renderOrder = 10; dollOnly.add(s); r.sprite = s;
});
const marker = new THREE.Group(); dollOnly.add(marker);
(function () {
  const mat = new THREE.MeshBasicMaterial({ color: 0xcf3f33, depthTest: false, toneMapped: false });
  const d = new THREE.Mesh(new THREE.CircleGeometry(.22, 24), mat); d.rotation.x = -Math.PI / 2; d.renderOrder = 11; marker.add(d);
  const a = new THREE.Mesh(new THREE.ConeGeometry(.16, .42, 3), mat); a.rotation.x = -Math.PI / 2; a.position.z = -.38; a.renderOrder = 11; marker.add(a);
})();

