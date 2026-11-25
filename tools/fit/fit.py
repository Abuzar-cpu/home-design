"""Furniture fit checks, run on the scene dump that dump.py writes (geo.json).
   python3 tools/fit/fit.py      (tools/check.py runs dump.py and this, and hides the accepted findings)

Every finding is printed as one line ending in ':: src/js/<file>:<line>: <source text>' (the room code that
placed the piece). The checks, all in metres:
   wall       furniture collider inside a wall collider
   overlap    two furniture colliders overlapping
   swing      a door leaf's swing arc hitting furniture or a wall
   window     furniture taller than the sill within 0.45 m of a window, same floor
   cut-in     a furniture mesh cutting more than 2 cm into a wall
   floor      a furniture mesh below its floor or above its ceiling
   doorway    furniture within 0.6 m in front of a doorway or cased opening (either side)
   reach      furniture with no 60 cm wide path (or 45 cm squeeze path) to within 0.3 m of it
Colliders: walls carry w: 1, furniture colliders don't. Levels: y >= 3.0 is the upper floor."""
import json, math, pathlib, sys
HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from build import line_map
from common import instrument

UP = 3.1  # upper floor level (UPPER_Y in src/js/00-setup.js)
# helpers whose stack frames are skipped to find the room code that placed a piece
HELP = {'box', 'soft', 'cyl', 'sph', 'solid', 'legs', 'chair', 'plant', 'leaf', 'stems', 'vase', 'tableLamp', 'floorLamp',
        'art', 'curtains', 'books', 'bookStack', 'placeSetting', 'downlight', 'fill', 'pillow', 'softX', 'wardrobe', 'lounge',
        'B', 'kick', 'halo', '__src', 'Error'}

d = json.loads((HERE / 'geo.json').read_text())
walls = [c for c in d['colliders'] if c.get('w')]
furn = [c for c in d['colliders'] if not c.get('w')]
level = lambda c: 2 if c['y0'] >= 3.0 else 1
ov = lambda a0, a1, b0, b1: min(a1, b1) - max(a0, b0)  # overlap of two ranges (negative: gap)

SEGMENTS = line_map(instrument())
ROOT = HERE.parents[1]; _lines = {}
def ROOT_SRC_LINES(name):
    if name not in _lines: _lines[name] = (ROOT / name).read_text().split('\n')
    return _lines[name]

def source(page_line):
    """src/js/<file>:<line>: <text> for a line of build/check.html"""
    for first, name, n in SEGMENTS:
        if first <= page_line < first + n:
            ln = page_line - first + 1
            return f"{name}:{ln}: {ROOT_SRC_LINES(name)[ln - 1].strip()[:120]}"
    return f'page line {page_line}'

def where(src):
    """The room code that placed a piece: the first caller after the last helper frame."""
    frames = [f.rsplit(':', 1) for f in src.split() if ':' in f]
    start = max((i + 1 for i, (fn, _) in enumerate(frames) if fn in HELP), default=0)
    for fn, ln in frames[start:]:
        if fn not in HELP: return source(int(ln))
    return src

def check_wall():
    for f in furn:
        for w in walls:
            ox, oz, oy = ov(f['x0'], f['x1'], w['x0'], w['x1']), ov(f['z0'], f['z1'], w['z0'], w['z1']), ov(f['y0'], f['y1'], w['y0'], w['y1'])
            if ox > 0.015 and oz > 0.015 and oy > 0.05:
                yield f'wall: furniture {round(ox, 3)} x {round(oz, 3)} m inside a wall :: {where(f["src"])}'; break

def check_overlap():
    for i, f in enumerate(furn):
        for g in furn[i + 1:]:
            ox, oz, oy = ov(f['x0'], f['x1'], g['x0'], g['x1']), ov(f['z0'], f['z1'], g['z0'], g['z1']), ov(f['y0'], f['y1'], g['y0'], g['y1'])
            if ox > 0.02 and oz > 0.02 and oy > 0.05:
                yield f'overlap {ox:.2f} x {oz:.2f} m :: {where(f["src"])} :: {where(g["src"])}'

def check_swing():
    for dr in d['doors']:
        leaf = (dr['a1'] - dr['a0'] - 0.07) / (2 if dr.get('bifold') else 1)
        hinge = dr['a0'] + 0.035 if dr['hinge'] == 'a0' else dr['a1'] - 0.035
        face, sgn = (dr['t1'], 1) if dr['swing'] > 0 else (dr['t0'], -1)
        latch = 1 if dr['hinge'] == 'a0' else -1  # direction from the hinge toward the latch, along the wall
        Y = dr['Y']; name = f"door {dr['axis']}-wall @{dr['t0']} span {dr['a0']}-{dr['a1']} floor {2 if Y else 1}"
        for f in furn + walls:
            if f['y1'] <= Y + 0.05 or f['y0'] >= Y + 2.0: continue
            best = 9
            for i in range(41):  # sample the footprint on a 41 x 41 grid
                for k in range(41):
                    x = f['x0'] + (f['x1'] - f['x0']) * i / 40; z = f['z0'] + (f['z1'] - f['z0']) * k / 40
                    a, n = (x, z) if dr['axis'] == 'x' else (z, x)
                    da, dn = (a - hinge) * latch, (n - face) * sgn
                    if da > 0.01 and dn > 0.01: best = min(best, math.hypot(da, dn))
            if best < leaf - 0.005:
                yield f"swing: {name}, leaf {leaf:.2f} m hits by {leaf - best:.3f} m :: {'a wall' if f.get('w') else where(f['src'])}"

def check_window():
    for wn in d['wins']:
        face, sgn = (wn['t1'], 1) if wn['out'] < 0 else (wn['t0'], -1); Y = wn['Y']; wl = 2 if Y else 1
        for f in furn:
            if level(f) != wl or f['y1'] < Y + wn['sill'] + 0.12: continue
            if wn['axis'] == 'x': oa = ov(f['x0'], f['x1'], wn['a0'], wn['a1']); dn = (f['z0'] - face) if sgn > 0 else (face - f['z1'])
            else: oa = ov(f['z0'], f['z1'], wn['a0'], wn['a1']); dn = (f['x0'] - face) if sgn > 0 else (face - f['x1'])
            if oa > 0.1 and -0.05 < dn < 0.45:
                yield f"window {wn['axis']}-wall {wn['a0']}-{wn['a1']} floor {wl}: top {f['y1'] - Y:.2f} m, {dn:.2f} m from glass, covers {oa:.2f} m :: {where(f['src'])}"

def check_cut_in():
    worst = {}
    for m in d['meshes']:
        for w in walls:
            ox, oz, oy = ov(m['x0'], m['x1'], w['x0'], w['x1']), ov(m['z0'], m['z1'], w['z0'], w['z1']), ov(m['y0'], m['y1'], w['y0'], w['y1'])
            if ox > 0.02 and oz > 0.02 and oy > 0.02:
                k = where(m['src']); worst[k] = max(worst.get(k, 0), min(ox, oz)); break
    for k, v in worst.items(): yield f'cut-in: {v:.2f} m into a wall :: {k}'

def check_floor():
    for m in d['meshes']:
        Y = UP if m['y0'] > 2.9 or (m['y1'] > 3.2 and m['y0'] > 2.5) else 0
        if m['y0'] < Y - 0.015 or m['y1'] > Y + 2.8 + 0.02:
            yield f"floor: mesh at y {m['y0'] - Y:.3f}-{m['y1'] - Y:.3f} m :: {where(m['src'])}"

def check_doorway():
    for dr in d['doors'] + [dict(o, hinge=None, swing=0) for o in d['opens']]:
        Y = dr['Y']; dl = 2 if Y else 1
        for side, face in ((-1, dr['t0']), (1, dr['t1'])):
            if dr['axis'] == 'x': zone = (dr['a0'], dr['a1'], face - 0.6, face) if side < 0 else (dr['a0'], dr['a1'], face, face + 0.6)
            else: zone = (face - 0.6, face, dr['a0'], dr['a1']) if side < 0 else (face, face + 0.6, dr['a0'], dr['a1'])
            for f in furn:
                if level(f) != dl or f['y1'] - Y < 0.15: continue
                ox, oz = ov(f['x0'], f['x1'], zone[0], zone[1]), ov(f['z0'], f['z1'], zone[2], zone[3])
                if ox > 0.01 and oz > 0.01:
                    if dr['axis'] == 'z': dist = f['x0'] - face if side > 0 else face - f['x1']
                    else: dist = f['z0'] - face if side > 0 else face - f['z1']
                    kind = 'opening' if dr['swing'] == 0 else 'door'
                    yield (f"{kind} {dr['axis']}-wall {dr['t0']} span {dr['a0']}-{dr['a1']} floor {dl}, side {side:+d}: "
                           f"{max(dist, 0):.2f} m away, overlaps width by {(ox if dr['axis'] == 'x' else oz):.2f} :: {where(f['src'])}")

def check_reach():
    import numpy as np
    S = 0.025; NX = int(8.6 / S) + 1; NZ = int(13.6 / S) + 1
    def reachable(lv, r):
        """cells a walker of radius r can reach from the upper hall / ground hall (x 4.3, z 9.0)"""
        Y = UP if lv == 2 else 0; occ = np.zeros((NX, NZ), bool)
        for c in d['colliders']:
            if c['y1'] <= Y + 0.1 or c['y0'] >= Y + 1.6: continue
            if lv == 1 and c['y0'] < -0.5 and c['y1'] < 0.05: continue
            x0 = max(0, int((c['x0'] - r) / S)); x1 = min(NX - 1, int((c['x1'] + r) / S))
            for i in range(x0, x1 + 1):  # block cells within r of the rectangle (rounded corners)
                dx = max(c['x0'] - i * S, 0, i * S - c['x1'])
                if dx > r: continue
                dz = math.sqrt(max(r * r - dx * dx, 0))
                occ[i, max(0, int(math.ceil((c['z0'] - dz) / S))):min(NZ - 1, int((c['z1'] + dz) / S)) + 1] = True
        seen = np.zeros_like(occ); st = [(int(4.3 / S), int(9.0 / S))]; seen[st[0]] = True
        while st:
            i, j = st.pop()
            for a, b in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
                if 0 <= a < NX and 0 <= b < NZ and not seen[a, b] and not occ[a, b]: seen[a, b] = True; st.append((a, b))
        return np.argwhere(seen)
    for r, label in ((0.3, '60 cm path'), (0.225, '45 cm squeeze path')):
        for lv in (1, 2):
            idx = reachable(lv, r)
            for c in furn:
                if level(c) != lv or c['y1'] - (UP if lv == 2 else 0) < 0.3: continue
                if c['x1'] - c['x0'] > 2.5 and c['z1'] - c['z0'] < 0.25: continue  # long thin rails
                if c['y0'] < -0.5: continue  # garden-level pieces outside the house (entrance stair rail posts)
                cx = np.clip(idx[:, 0] * S, c['x0'], c['x1']); cz = np.clip(idx[:, 1] * S, c['z0'], c['z1'])
                dist = np.sqrt((idx[:, 0] * S - cx) ** 2 + (idx[:, 1] * S - cz) ** 2).min()
                if dist > r + 0.3: yield f'reach: floor {lv}, {dist - r:.2f} m beyond a {label} :: {where(c["src"])}'

CHECKS = [check_wall, check_overlap, check_swing, check_window, check_cut_in, check_floor, check_doorway, check_reach]

if __name__ == '__main__':
    for check in CHECKS:
        for line in dict.fromkeys(check()): print(line)
