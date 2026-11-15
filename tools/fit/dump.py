import json, sys, pathlib, os; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1])); os.chdir(pathlib.Path(__file__).parent)
from common import build_check, url, CHROME
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(**CHROME)
    pg=b.new_page(viewport={'width':400,'height':300}); errs=[]
    pg.on('pageerror', lambda e: errs.append(str(e)))
    chk=build_check(); pg.goto(url(chk)); pg.wait_for_timeout(5000)
    d=pg.evaluate("""()=>{ const C=window.__chk, out={colliders:C.colliders, doors:C.DOORS, opens:C.OPENS, wins:C.WINS, meshes:[]};
      const bx=new THREE.Box3(); C.scene.updateMatrixWorld(true);
      C.scene.traverse(o=>{ if(o.isMesh && o.userData.f){ bx.setFromObject(o); let g=o.parent, sg=''; for(const k in C.SG) if(o.parent===C.SG[k]) sg=k;
        out.meshes.push({x0:bx.min.x,x1:bx.max.x,y0:bx.min.y,y1:bx.max.y,z0:bx.min.z,z1:bx.max.z,src:o.userData.src||'',sg}); } });
      return out; }""")
    json.dump(d,open('geo.json','w')); open('check.html','w').write(chk.read_text())
    if errs: print('page errors:', errs[:3])
    b.close()
