"""Builds build/index.html (the single-file tour that gets published) from src/.
   src/index.template.html  page shell, with /*@STYLE@*/ and //@SCRIPT@ placeholders
   src/style.css            UI styles
   src/js/NN-*.js           the scene, joined in file-name order into ONE classic <script>.
                            They share one scope, so a file may use anything defined in an earlier one.
   python3 tools/build.py            build
   python3 tools/build.py --check    exit 1 if build/index.html is missing or out of date"""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parents[1]; SRC = R / 'src'; OUT = R / 'build' / 'index.html'

def render():
    t = (SRC / 'index.template.html').read_text()
    assert t.count('/*@STYLE@*/') == 1 and t.count('//@SCRIPT@\n') == 1, 'template placeholders missing'
    js = ''.join(p.read_text() for p in sorted((SRC / 'js').glob('*.js')))
    return t.replace('/*@STYLE@*/', (SRC / 'style.css').read_text()).replace('//@SCRIPT@\n', js)

def build():
    html = render(); OUT.parent.mkdir(exist_ok=True)
    if not OUT.exists() or OUT.read_text() != html: OUT.write_text(html)
    return OUT

if __name__ == '__main__':
    if '--check' in sys.argv:
        ok = OUT.exists() and OUT.read_text() == render(); print('build/index.html', 'up to date' if ok else 'STALE'); sys.exit(0 if ok else 1)
    print('built', build().relative_to(R))
