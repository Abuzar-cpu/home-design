import json, math
d=json.load(open('geo.json')); L=open('check.html').read().split('\n')
HELP={'box','soft','cyl','sph','solid','legs','chair','plant','leaf','stems','vase','tableLamp','floorLamp','art','curtains','books','bookStack','placeSetting','downlight','fill','pillow','softX','wardrobe','lounge','B','kick','halo','__src','Error'}
def where(src):
    for fr in src.split():
        if ':' not in fr: continue
        fn,ln=fr.rsplit(':',1)
        if fn in HELP: continue
        t=L[int(ln)-1].strip()
        return f"L{ln}: {t[:110]}"
    return src
def ov(a0,a1,b0,b1): return min(a1,b1)-max(a0,b0)
walls=[c for c in d['colliders'] if c.get('w')]
furn=[c for c in d['colliders'] if not c.get('w')]
lv=lambda y: 2 if y>2.0 else 1
print("=== A. furniture footprint inside a wall ===")
for f in furn:
    for w in walls:
        if ov(f['x0'],f['x1'],w['x0'],w['x1'])>0.015 and ov(f['z0'],f['z1'],w['z0'],w['z1'])>0.015 and ov(f['y0'],f['y1'],w['y0'],w['y1'])>0.05:
            print(' ', round(ov(f['x0'],f['x1'],w['x0'],w['x1']),3), round(ov(f['z0'],f['z1'],w['z0'],w['z1']),3), where(f['src'])); break
print("=== B. furniture footprints overlapping each other ===")
seen=set()
for i,f in enumerate(furn):
    for j,g in enumerate(furn):
        if j<=i: continue
        ox,oz,oy=ov(f['x0'],f['x1'],g['x0'],g['x1']),ov(f['z0'],f['z1'],g['z0'],g['z1']),ov(f['y0'],f['y1'],g['y0'],g['y1'])
        if ox>0.02 and oz>0.02 and oy>0.05:
            print(f'  overlap {ox:.2f} x {oz:.2f}\n    {where(f["src"])}\n    {where(g["src"])}')
def door_geo(dr):
    w=(dr['a1']-dr['a0']-0.07)/(2 if dr.get('bifold') else 1); h=dr['a0']+0.035 if dr['hinge']=='a0' else dr['a1']-0.035
    face=dr['t1'] if dr['swing']>0 else dr['t0']; sgn=1 if dr['swing']>0 else -1
    other=1 if dr['hinge']=='a0' else -1   # direction from hinge toward the latch side, along the wall
    return w,h,face,sgn,other
def pt(dr,a,n):   # wall-along coordinate a, normal coordinate n -> (x,z)
    return (a,n) if dr['axis']=='x' else (n,a)
print("=== C. door swing arcs hitting furniture ===")
names={}
for dr in d['doors']:
    w,h,face,sgn,other=door_geo(dr); Y=dr['Y']
    lab=f"door {'x' if dr['axis']=='x' else 'z'}-wall @{dr['t0']}, span {dr['a0']}-{dr['a1']}, level {2 if Y else 1}, {'front' if dr['front'] else 'balcony' if dr['glass'] else ''}"
    hits=[]
    for f in furn+walls:
        if f['y1']<=Y+0.05 or f['y0']>=Y+2.0: continue
        best=9
        for i in range(41):
            for k in range(41):
                x=f['x0']+(f['x1']-f['x0'])*i/40; z=f['z0']+(f['z1']-f['z0'])*k/40
                a,n=(x,z) if dr['axis']=='x' else (z,x)
                da=(a-h)*other; dn=(n-face)*sgn
                if da>0.01 and dn>0.01:
                    r=math.hypot(da,dn); best=min(best,r)
        if best<w-0.005: hits.append((round(w-best,3), 'WALL' if f.get('w') else where(f['src'])))
    print(' ',lab,'leaf',round(w,2),'->', hits if hits else 'clear')
print("=== D. tall furniture in front of windows (within 0.45 m, above sill) ===")
for wn in d['wins']:
    face=wn['t1'] if wn['out']<0 else wn['t0']; sgn=1 if wn['out']<0 else -1; Y=wn['Y']
    for f in furn:
        if f['y1']<Y+wn['sill']+0.12: continue
        if wn['axis']=='x': oa=ov(f['x0'],f['x1'],wn['a0'],wn['a1']); dn=(f['z0']-face) if sgn>0 else (face-f['z1'])
        else: oa=ov(f['z0'],f['z1'],wn['a0'],wn['a1']); dn=(f['x0']-face) if sgn>0 else (face-f['x1'])
        if oa>0.1 and -0.05<dn<0.45: print(f"  window {wn['axis']}-wall {wn['a0']}-{wn['a1']} L{2 if Y else 1}: top {f['y1']-Y:.2f} m, {dn:.2f} m from glass, covers {oa:.2f} m :: {where(f['src'])}")
print("=== E. furniture meshes cutting into walls (>2 cm) ===")
cnt={}
for m in d['meshes']:
    for w in walls:
        ox,oz,oy=ov(m['x0'],m['x1'],w['x0'],w['x1']),ov(m['z0'],m['z1'],w['z0'],w['z1']),ov(m['y0'],m['y1'],w['y0'],w['y1'])
        if ox>0.02 and oz>0.02 and oy>0.02:
            k=where(m['src']); cnt[k]=max(cnt.get(k,0),round(min(ox,oz),3)); break
for k,v in cnt.items(): print(f'  {v} m :: {k}')
print("=== F. meshes below floor or above ceiling ===")
cnt={}
for m in d['meshes']:
    Y=3.1 if m['y0']>2.9 or (m['y1']>3.2 and m['y0']>2.5) else 0
    if m['y0']<Y-0.015 or m['y1']>Y+2.8+0.02:
        k=where(m['src']); cnt[k]=(round(m['y0']-Y,3),round(m['y1']-Y,3))
for k,v in cnt.items(): print(f'  {v} :: {k}')
