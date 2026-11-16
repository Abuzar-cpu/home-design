/* --------------------------------------------------------------- lighting */
(function () {   // soft studio environment so stone, metal and glass pick up reflections
  const pm = new THREE.PMREMGenerator(renderer), es = new THREE.Scene(), bm = c => new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide });
  es.add(new THREE.Mesh(new THREE.BoxGeometry(10, 6, 10), bm(new THREE.Color(.42, .4, .37))));
  const pane = (w, h, x, y, z, rx, ry, i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), bm(new THREE.Color(i, i * .98, i * .93))); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); es.add(m); };
  pane(3.2, 2.2, -4.9, .3, 0, 0, Math.PI / 2, 7); pane(3.2, 2.2, 0, .3, -4.9, 0, 0, 4); pane(2.4, 2.2, 4.9, .3, 1, 0, Math.PI / 2, 2); pane(9, 9, 0, 2.95, 0, Math.PI / 2, 0, 1.0); pane(9.6, 9.6, 0, -2.95, 0, Math.PI / 2, 0, .22);
  scene.environment = pm.fromScene(es, .03).texture; pm.dispose();
})();
const hemi = new THREE.HemisphereLight(0xe6f0ff, 0xb9a78f, 0.34), amb = new THREE.AmbientLight(0xfff3e4, 0.08); scene.add(hemi, amb);
const sun = new THREE.DirectionalLight(0xffefd6, 2.3);
sun.position.set(4.3 - 17, 12.5, 6.5 + 6); sun.target.position.set(4.3, 0, 6.5); scene.add(sun, sun.target);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 60 }); sun.shadow.camera.updateProjectionMatrix();
sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03; sun.shadow.radius = 3.2;

