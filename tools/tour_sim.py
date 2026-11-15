"""Runs the whole guided tour off-screen and reports collisions and the stop list (-v)."""
import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).parent))
from common import build_test, url, CHROME
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(**CHROME); pg = b.new_page(viewport={'width': 1100, 'height': 700}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url(build_test())); pg.wait_for_timeout(4000)
    pg.click('#tourBtn', no_wait_after=True); pg.wait_for_timeout(800)
    r = pg.evaluate("""()=>{ const P=tour.player, C=tour.colliders, hits=[], stops=[]; let n=0, t=0, last='';
      while(tour.tourState() && n<200000){ tour.tourStep(.05); n++; t+=.05;
        const name=document.getElementById('tcN').textContent; if(document.getElementById('tcard').classList.contains('show') && name!==last){ last=name; stops.push(name+' | '+document.getElementById('tcS').textContent); }
        for(const c of C){ if(c.y0>=P.y+1.7||c.y1<=P.y+.38) continue; if(P.x>c.x0-.08&&P.x<c.x1+.08&&P.z>c.z0-.08&&P.z<c.z1+.08){ hits.push([+P.x.toFixed(2),+P.y.toFixed(2),+P.z.toFixed(2)]); break; } } }
      return {secs:Math.round(t), nh:hits.length, hits:hits.slice(0,6), stops}; }""")
    print(f"tour: {r['secs']} s, {len(r['stops'])} stops, {r['nh']} collision frames", r['hits'] or '', ('page errors: ' + str(errs[:3])) if errs else '')
    if '-v' in sys.argv: print('\n'.join('  ' + s for s in r['stops']))
    b.close()
