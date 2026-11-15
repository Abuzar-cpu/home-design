"""Writes build/public.html: the working copy with the public title. Publish that file to the public artifact."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[1]
s = (R / 'tour' / 'index.html').read_text()
assert s.count('<title>Ground Floor 3D Tour Working Copy</title>') == 1
(R / 'build').mkdir(exist_ok=True)
(R / 'build' / 'public.html').write_text(s.replace('<title>Ground Floor 3D Tour Working Copy</title>', '<title>Ground Floor 3D Tour</title>'))
print('build/public.html ready')
