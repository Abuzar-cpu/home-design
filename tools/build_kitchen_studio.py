"""Builds build/kitchen-studio.html: a standalone colour-studio viewer for the kitchen.
   Reuses the house's own materials, helpers, furniture pieces, kitchen geometry and
   studio-style lighting UNMODIFIED, so a rebuild always matches src/js/33-kitchen.js:
   studio/kitchen/00-setup.js    scene/camera/groups the reused files expect
   src/js/01-textures.js         texture generator + T()                 (unmodified)
   src/js/02-materials.js        M.* materials, the 4 house styles, applyStyle()  (unmodified)
   src/js/04-helpers.js          box/soft/cyl/sph/solid/...                (unmodified)
   src/js/20-furniture-pieces.js chair/plant/vase/downlight/fill/art/...   (unmodified)
   src/js/33-kitchen.js          builds the kitchen into the scene         (unmodified)
   src/js/50-lighting.js         studio-style environment + sun            (unmodified)
   studio/kitchen/90-ui.js       context walls/floor, orbit camera, picking, colour panel
   python3 tools/build_kitchen_studio.py            build
   python3 tools/build_kitchen_studio.py --check    exit 1 if build/kitchen-studio.html is missing or out of date"""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parents[1]; SRC = R / 'src' / 'js'; STUDIO = R / 'studio' / 'kitchen'; OUT = R / 'build' / 'kitchen-studio.html'
PARTS = [STUDIO / '00-setup.js', SRC / '01-textures.js', SRC / '02-materials.js', SRC / '04-helpers.js',
         SRC / '20-furniture-pieces.js', SRC / '33-kitchen.js', SRC / '50-lighting.js', STUDIO / '90-ui.js']

def render():
    t = (STUDIO / 'index.template.html').read_text()
    assert t.count('/*@STYLE@*/') == 1 and t.count('//@SCRIPT@\n') == 1, 'template placeholders missing'
    js = ''.join(p.read_text() for p in PARTS)
    return t.replace('/*@STYLE@*/', (STUDIO / 'style.css').read_text()).replace('//@SCRIPT@\n', js)

def build():
    html = render(); OUT.parent.mkdir(exist_ok=True)
    if not OUT.exists() or OUT.read_text() != html: OUT.write_text(html)
    return OUT

if __name__ == '__main__':
    if '--check' in sys.argv:
        ok = OUT.exists() and OUT.read_text() == render(); print('build/kitchen-studio.html', 'up to date' if ok else 'STALE'); sys.exit(0 if ok else 1)
    print('built', build().relative_to(R))
