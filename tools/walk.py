import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).parent))
from common import build_test, url, CHROME
from playwright.sync_api import sync_playwright
import math
PI=math.pi
# (name, start or None, [(yaw, seconds)...], condition)
tests=[('climb', (4.3,5.2,0), [(-PI/2,7),(PI,5),(PI/2,9)], "abs(y-3.1)<0.01 and x<4.4"),
       ('descend', (4.3,6.7,3.1), [(-PI/2,9),(0,5),(PI/2,9)], "abs(y)<0.01 and x<4.2"),
       ('bedroom door', (4.25,5.2,3.1), [(0,6)], "z<4.0 and abs(y-3.1)<.01"),
       ('clothing hall door removed', (4.3,5.25,3.1), [(PI/2,6)], "x>3.55"),
       ('bedroom-wardrobe opening', (4.3,3.0,3.1), [(PI/2,6)], "x<2.0 and 2.5<z<5.5"),
       ('en-suite pocket door', (4.3,1.8,3.1), [(PI/2,6)], "x<2.6 and z<2.4"),
       ('baby door', (4.3,6.55,3.1), [(PI/2,6)], "x<3.0 and 5.7<z<8.6"),
       ('study door', (4.3,10.25,3.1), [(PI/2,6)], "x<3.0 and z>8.8"),
       ('storage door', (3.6,12.45,0), [(PI/2,6)], "x<2.6"),
       ('gaming door', (4.3,8.15,3.1), [(-PI/2,6)], "x>5.6"),
       ('balcony door', (4.3,11.0,3.1), [(PI,5)], "z>12.5 and abs(y-3.1)<.01"),
       ('guard rail', (4.3,5.2,3.1), [(-PI/2,4)], "x<5.0"),
       ('ground kitchen door', (4.3,8.15,0), [(-PI/2,6)], "x>7.0 and abs(y)<.01"),
       ('front door to living', (4.3,12.6,0), [(0,22)], "z<1.5 and abs(y)<.01"),
       ('steps to porch', (9.0,12.65,-1.5), [(PI/2,14)], "x<3.2 and abs(y)<.01"),('guest door',(4.3,5.25,0),[(PI/2,8)],"x<2.6"),('bath door',(3.0,11.0,0),[(PI/2,6)],"x<1.9"),('wc door',(2.8,11.0,0),[(0,5)],"z<10.2"),('nook blocked',(4.3,6.7,0),[(-PI/2,4)],"x<5.9")]
with sync_playwright() as p:
    b=p.chromium.launch(**CHROME)
    pg=b.new_page(viewport={'width':300,'height':190}); errs=[]
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url(build_test())); pg.wait_for_timeout(4000)
    fails=0
    for name,start,legs,cond in tests:
        if start: pg.evaluate("(v)=>{const P=tour.player;P.x=v[0];P.z=v[1];P.y=v[2];P.pitch=0}",list(start))
        for yaw,sec in legs:
            pg.evaluate("(v)=>tour.sim(v[0],v[1])",[yaw,sec*40])
        r=pg.evaluate("()=>({x:tour.player.x,y:tour.player.y,z:tour.player.z})")
        ok=eval(cond,{},r); fails+=0 if ok else 1
        if not ok or '-v' in sys.argv: print(('PASS' if ok else 'FAIL'),name,{k:round(v,2) for k,v in r.items()})
    print(f'walk tests: {len(tests)-fails}/{len(tests)} pass', 'page errors: '+str(errs[:3]) if errs else ''); b.close()
