import json, math
exec(open('analyze2.py').read().split('flv=lambda')[0])
flv=lambda c: 2 if c['y0']>=3.0 else 1
import numpy as np
S=0.025; NX=int(8.6/S)+1; NZ=int(13.6/S)+1
def grid(level, r):
    Y=3.1 if level==2 else 0
    occ=np.zeros((NX,NZ),bool)
    for c in d['colliders']:
        if c['y1']<=Y+0.1 or c['y0']>=Y+1.6: continue
        if level==1 and c['y0']<-0.5 and c['y1']<0.05: continue
        x0=max(0,int((c['x0']-r)/S)); x1=min(NX-1,int((c['x1']+r)/S)); z0=max(0,int((c['z0']-r)/S)); z1=min(NZ-1,int((c['z1']+r)/S))
        # rounded dilation: block cells within r of the rectangle
        for i in range(x0,x1+1):
            x=i*S; dx=max(c['x0']-x,0,x-c['x1'])
            if dx>r: continue
            dz=math.sqrt(max(r*r-dx*dx,0))
            j0=max(0,int(math.ceil((c['z0']-dz)/S))); j1=min(NZ-1,int((c['z1']+dz)/S)); occ[i,j0:j1+1]=True
    # outside the building footprint on the upper floor
    seen=np.zeros_like(occ); st=[(int(4.3/S),int(9.0/S))]; seen[st[0]]=True
    while st:
        i,j=st.pop()
        for di,dj in ((1,0),(-1,0),(0,1),(0,-1)):
            a,b=i+di,j+dj
            if 0<=a<NX and 0<=b<NZ and not seen[a,b] and not occ[a,b]: seen[a,b]=True; st.append((a,b))
    return seen
for level in (1,2):
    for r in (0.3,):
        R=grid(level,r)
        print(f"=== floor {level}: pieces with no 60 cm-wide route to within 0.3 m of them ===")
        idx=np.argwhere(R)
        for c in furn:
            if flv(c)!=level or c['y1']-(3.1 if level==2 else 0)<0.3: continue
            if c['x1']-c['x0']>2.5 and c['z1']-c['z0']<0.25: continue
            cx=np.clip(idx[:,0]*S, c['x0'], c['x1']); cz=np.clip(idx[:,1]*S, c['z0'], c['z1'])
            dist=np.sqrt((idx[:,0]*S-cx)**2+(idx[:,1]*S-cz)**2).min()
            if dist>0.3+0.3: print(f"  nearest reachable point {dist-0.3:.2f} m beyond a 60 cm path :: {where2(c['src'])}")
print("=== same check with a 45 cm squeeze path ===")
for level in (1,2):
    R=grid(level,0.225); idx=np.argwhere(R)
    for c in furn:
        if flv(c)!=level or c['y1']-(3.1 if level==2 else 0)<0.3: continue
        if c['x1']-c['x0']>2.5 and c['z1']-c['z0']<0.25: continue
        cx=np.clip(idx[:,0]*S, c['x0'], c['x1']); cz=np.clip(idx[:,1]*S, c['z0'], c['z1'])
        dist=np.sqrt((idx[:,0]*S-cx)**2+(idx[:,1]*S-cz)**2).min()
        if dist>0.225+0.3: print(f"  floor {level}: {dist-0.225:.2f} m :: {where2(c['src'])}")
