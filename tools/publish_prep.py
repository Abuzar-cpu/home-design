"""Builds build/index.html (publish to the working copy) and build/public.html (same page, public title)."""
import pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent)); from build import build
R = pathlib.Path(__file__).resolve().parents[1]
s = build().read_text()
assert s.count('<title>Ground Floor 3D Tour Working Copy</title>') == 1
(R / 'build').mkdir(exist_ok=True)
(R / 'build' / 'public.html').write_text(s.replace('<title>Ground Floor 3D Tour Working Copy</title>', '<title>Ground Floor 3D Tour</title>'))
print('build/index.html and build/public.html ready')
