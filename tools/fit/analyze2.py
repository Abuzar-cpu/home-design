import json, math
exec(open('analyze.py').read().split('print("=== A.')[0])
def where2(src):
    frs=[f for f in src.split() if ':' in f]; idx=0
    for i,fr in enumerate(frs):
        if fr.rsplit(':',1)[0] in HELP: idx=i+1
    for fr in frs[idx:]:
        fn,ln=fr.rsplit(':',1)
        if fn in HELP: continue
        return f"L{ln}: {L[int(ln)-1].strip()[:120]}"
    return src
flv=lambda c: 2 if c['y0']>=3.0 else 1
print("=== D. tall furniture in front of windows, same floor ===")
for wn in d['wins']:
    face=wn['t1'] if wn['out']<0 else wn['t0']; sgn=1 if wn['out']<0 else -1; Y=wn['Y']; wl=2 if Y else 1
    for f in furn:
        if flv(f)!=wl or f['y1']<Y+wn['sill']+0.12: continue
        if wn['axis']=='x': oa=ov(f['x0'],f['x1'],wn['a0'],wn['a1']); dn=(f['z0']-face) if sgn>0 else (face-f['z1'])
        else: oa=ov(f['z0'],f['z1'],wn['a0'],wn['a1']); dn=(f['x0']-face) if sgn>0 else (face-f['x1'])
        if oa>0.1 and -0.05<dn<0.45: print(f"  window {wn['axis']}-wall {wn['a0']}-{wn['a1']} floor {wl}: top {f['y1']-Y:.2f} m, {dn:.2f} m from glass, covers {oa:.2f} m :: {where2(f['src'])}")
print("=== E. which curtains cut into a wall ===")
for m in d['meshes']:
    for w in walls:
        ox,oz,oy=ov(m['x0'],m['x1'],w['x0'],w['x1']),ov(m['z0'],m['z1'],w['z0'],w['z1']),ov(m['y0'],m['y1'],w['y0'],w['y1'])
        if ox>0.02 and oz>0.02 and oy>0.02: print(f"  {min(ox,oz):.2f} m at x {m['x0']:.2f}-{m['x1']:.2f} z {m['z0']:.2f}-{m['z1']:.2f} :: {where2(m['src'])}"); break
print("=== G. furniture within 0.6 m in front of a doorway or opening (either side) ===")
for dr in d['doors']+[dict(o,hinge=None,swing=0) for o in d['opens']]:
    Y=dr['Y']; dl=2 if Y else 1
    for side,face in ((-1,dr['t0']),(1,dr['t1'])):
        if dr['axis']=='x': zone=(dr['a0'],dr['a1'],face-0.6,face) if side<0 else (dr['a0'],dr['a1'],face,face+0.6)
        else: zone=(face-0.6,face,dr['a0'],dr['a1']) if side<0 else (face,face+0.6,dr['a0'],dr['a1'])
        for f in furn:
            if flv(f)!=dl or f['y1']-Y<0.15: continue
            ox,oz=ov(f['x0'],f['x1'],zone[0],zone[1]),ov(f['z0'],f['z1'],zone[2],zone[3])
            if ox>0.01 and oz>0.01:
                dist = (f['x0']-face if side>0 else face-f['x1']) if dr['axis']=='z' else (f['z0']-face if side>0 else face-f['z1'])
                print(f"  {'opening' if dr['swing']==0 else 'door'} {dr['axis']}-wall {dr['t0']} span {dr['a0']}-{dr['a1']} floor {dl}, side {side:+d}: {max(dist,0):.2f} m away, overlaps width by {(ox if dr['axis']=='x' else oz):.2f} :: {where2(f['src'])}")
