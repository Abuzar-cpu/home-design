"""Loads the instrumented page (build/check.html, see instrument.js) and writes geo.json for fit.py:
colliders, doors, cased openings, windows and the footprint of every furniture mesh."""
import json, os, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from common import build_check, url, CHROME
from playwright.sync_api import sync_playwright

COLLECT = """() => {
  const C = window.__chk, out = { colliders: C.colliders, doors: C.DOORS, opens: C.OPENS, wins: C.WINS, meshes: [] };
  const bx = new THREE.Box3();
  C.scene.updateMatrixWorld(true);
  C.scene.traverse(o => {
    if (!o.isMesh || !o.userData.f) return;
    bx.setFromObject(o);
    let sg = '';
    for (const k in C.SG) if (o.parent === C.SG[k]) sg = k;
    out.meshes.push({ x0: bx.min.x, x1: bx.max.x, y0: bx.min.y, y1: bx.max.y, z0: bx.min.z, z1: bx.max.z, src: o.userData.src || '', sg });
  });
  return out;
}"""

with sync_playwright() as p:
    b = p.chromium.launch(**CHROME)
    pg = b.new_page(viewport={'width': 400, 'height': 300}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url(build_check())); pg.wait_for_function('window.__chk && window.__chk.scene', timeout=60000)
    (HERE / 'geo.json').write_text(json.dumps(pg.evaluate(COLLECT)))
    if errs: print('page errors:', errs[:3])
    b.close()
