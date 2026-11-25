"""Fingerprint of everything the tour builds, to prove a refactor changed nothing visible.
It hashes every object in the scene graph (type, visibility,
world matrix, geometry buffers, material settings and texture pixels), the colliders,
the rooms list, the tour route, the Azerbaijani dictionary and the page text in both languages.
   python3 tools/fingerprint.py           print the hash and the per-part hashes
   python3 tools/fingerprint.py --save    also store them in build/fingerprint.json
   python3 tools/fingerprint.py --diff    compare with build/fingerprint.json, exit 1 if anything changed"""
import json, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from common import build_test, url, CHROME, BUILD
from playwright.sync_api import sync_playwright

# exposes the scene to the page; the anchor is the end of the one shared <script> scope
HOOK = 'window.__fp = { scene, colliders, rooms, ROUTE, AZ, applyLang };\n})();'

JS = r"""async () => {
  const F = window.__fp, out = {}, texCache = new Map();
  const r = v => Math.round(v * 1e5) / 1e5;
  async function hash(s) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
  const geoCache = new Map();
  async function texKey(t) {
    if (!t) return null;
    if (texCache.has(t)) return texCache.get(t);
    let px = '';
    const img = t.image;
    if (img && img.getContext) px = img.toDataURL();
    else if (img && img.data) px = Array.from(img.data).join(',');
    const k = { px: await hash(px), rep: [t.repeat.x, t.repeat.y], off: [t.offset.x, t.offset.y], rot: t.rotation, wrap: [t.wrapS, t.wrapT], enc: t.encoding };
    texCache.set(t, k); return k;
  }
  const MAT = ['type', 'roughness', 'metalness', 'opacity', 'transparent', 'side', 'depthWrite', 'envMapIntensity',
    'emissiveIntensity', 'transmission', 'clearcoat', 'clearcoatRoughness', 'sheen', 'flatShading', 'wireframe', 'visible', 'toneMapped', 'polygonOffset'];
  async function matKey(m) {
    if (!m) return null;
    if (Array.isArray(m)) { const a = []; for (const x of m) a.push(await matKey(x)); return a; }
    const k = {};
    MAT.forEach(p => { if (m[p] !== undefined) k[p] = m[p]; });
    ['color', 'emissive', 'sheenColor', 'specularColor'].forEach(p => { if (m[p]) k[p] = m[p].getHexString(); });
    for (const p of ['map', 'roughnessMap', 'bumpMap', 'normalMap', 'alphaMap', 'emissiveMap', 'metalnessMap', 'aoMap']) if (m[p]) k[p] = await texKey(m[p]);
    if (m.bumpScale !== undefined) k.bumpScale = m.bumpScale;
    return k;
  }
  async function geoKey(g) {
    if (!g) return null;
    if (geoCache.has(g)) return geoCache.get(g);
    const k = { type: g.type, attrs: {} };
    for (const n in g.attributes) k.attrs[n] = await hash(Array.from(g.attributes[n].array, r).join(','));
    if (g.index) k.index = await hash(Array.from(g.index.array).join(','));
    k.groups = JSON.stringify(g.groups);
    const h = await hash(JSON.stringify(k)); geoCache.set(g, h); return h;
  }
  async function sceneHash() {
    F.scene.updateMatrixWorld(true);
    const parts = [], objs = [];
    F.scene.traverse(o => objs.push(o));
    for (const o of objs) {
      const k = { t: o.type, v: o.visible, m: o.matrixWorld.elements.map(r), cs: o.castShadow, rs: o.receiveShadow, ro: o.renderOrder };
      if (o.isLight) { k.c = o.color.getHexString(); k.i = r(o.intensity); k.d = o.distance; k.sh = o.castShadow; }
      if (o.isMesh || o.isLine || o.isPoints || o.isSprite) { k.g = await geoKey(o.geometry); k.mat = await matKey(o.material); }
      parts.push(await hash(JSON.stringify(k)));
    }
    return { objects: parts.length, hash: await hash(parts.join('\n')) };
  }
  out.scene = await sceneHash();
  out.colliders = await hash(JSON.stringify(F.colliders));
  out.rooms = await hash(JSON.stringify(F.rooms.map(q => Object.fromEntries(Object.entries(q).filter(e => typeof e[1] !== 'function' && typeof e[1] !== 'object' || Array.isArray(e[1]))))));
  out.route = await hash(JSON.stringify(F.ROUTE));
  out.az = await hash(JSON.stringify(F.AZ));
  for (const l of ['en', 'az']) { F.applyLang(l); out['text:' + l] = await hash(document.body.innerText); }
  F.applyLang('en');
  return out;
}"""

def fingerprint():
    page = build_test()
    s = page.read_text()
    i = s.rindex('})();')
    fp = BUILD / 'fingerprint.html'
    fp.write_text(s[:i] + HOOK + s[i + len('})();'):])
    with sync_playwright() as p:
        b = p.chromium.launch(**CHROME)
        pg = b.new_page(viewport={'width': 400, 'height': 300}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url(fp)); pg.wait_for_function('window.__fp', timeout=60000); pg.wait_for_timeout(1500)
        d = pg.evaluate(JS); b.close()
    if errs: d['page errors'] = errs[:3]
    return d

if __name__ == '__main__':
    d = fingerprint(); saved = BUILD / 'fingerprint.json'
    for k, v in d.items(): print(f'{k:14} {v}')
    if '--save' in sys.argv: saved.write_text(json.dumps(d, indent=1)); print('saved', saved.relative_to(BUILD.parent))
    if '--diff' in sys.argv:
        old = json.loads(saved.read_text())
        changed = [k for k in set(old) | set(d) if old.get(k) != d.get(k)]
        print('fingerprint: identical' if not changed else 'fingerprint: CHANGED ' + ', '.join(sorted(changed)))
        sys.exit(1 if changed else 0)
