"""Render walk-view shots into one image.  Usage: python3 tools/render.py build/out.png "15,x,z,yaw,pitch,y" ...
   hour 6-22, y = 0 ground floor / 3.1 upper floor (a leading style name from older notes is ignored).
   A shot "doll,LEVEL,tx,tz,dist" gives a top-down dollhouse view instead."""
import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).parent))
from common import build_test, url, CHROME
from playwright.sync_api import sync_playwright
from PIL import Image
out, shots = sys.argv[1], sys.argv[2:]
with sync_playwright() as p:
    b = p.chromium.launch(**CHROME); pg = b.new_page(viewport={'width': 1100, 'height': 700}); errs = []; ims = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url(build_test())); pg.wait_for_timeout(4000)
    for sh in shots:
        v = sh.split(',')
        if v[0] not in ('doll',) and not v[0].replace('.', '').isdigit(): v = v[1:]
        if v[0] == 'doll':
            pg.evaluate("(v)=>{ tour.setTime(13,true); tour.setMode('doll'); tour.setDollLevel(+v[1]); }", v); pg.wait_for_function('()=>!tour.busy()', timeout=60000)
            pg.evaluate("(v)=>{ const o=tour.orbit; o.pol=.05; o.tx=+v[2]; o.tz=+v[3]; o.dist=+v[4]; o.az=0; }", v)
        else:
            pg.evaluate("(v)=>{ if(tour.busy()===false && document.body.dataset.mode==='doll') tour.setMode('walk'); tour.setTime(+v[0],true); const P=tour.player; P.x=+v[1]; P.z=+v[2]; P.yaw=+v[3]; P.pitch=+v[4]; P.y=+(v[5]||0); }", v)
        pg.wait_for_timeout(2600); pg.screenshot(path='/tmp/_shot.png'); ims.append(Image.open('/tmp/_shot.png').convert('RGB').resize((733, 467)))
    cols = 1 if len(ims) == 1 else 2; rows = (len(ims) + cols - 1) // cols
    S = Image.new('RGB', (733 * cols, 467 * rows), 'white')
    for i, im in enumerate(ims): S.paste(im, ((i % cols) * 733, (i // cols) * 467))
    S.save(out); print('saved', out, ('page errors: ' + str(errs[:3])) if errs else '')
    b.close()
