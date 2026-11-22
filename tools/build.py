"""Builds build/index.html (the single-file tour that gets published) from src/.
   src/index.template.html  page shell, with /*@STYLE@*/ and //@SCRIPT@ placeholders
   src/style.css            UI styles
   src/js/NN-*.js           the scene, joined in file-name order into ONE classic <script>,
                            wrapped in one function (HEAD/TAIL below). They share that scope, so a
                            file may use anything defined in an earlier one.
   python3 tools/build.py            build
   python3 tools/build.py --check    exit 1 if build/index.html is missing or out of date"""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parents[1]; SRC = R / 'src'; OUT = R / 'build' / 'index.html'

# opens and closes the one shared scope; stops early with the error box if three.js did not load
HEAD = "(function () {\n'use strict';\nif (!window.THREE) { document.getElementById('err').hidden = false; return; }\n"
TAIL = '})();\n'

def js_files():
    return sorted((SRC / 'js').glob('*.js'))

def render(inject=None):
    """The page. inject = {'<js file name>': code to put before that file, 'END': code before the scope closes};
    the checks use it to instrument the page (tools/fit/instrument.js)."""
    inject = dict(inject or {}); t = (SRC / 'index.template.html').read_text()
    assert t.count('/*@STYLE@*/') == 1 and t.count('//@SCRIPT@\n') == 1, 'template placeholders missing'
    names = {p.name for p in js_files()}
    assert set(inject) <= names | {'END'}, ('inject points not found', set(inject) - names)
    js = HEAD + ''.join(inject.get(p.name, '') + p.read_text() for p in js_files()) + inject.get('END', '') + TAIL
    return t.replace('/*@STYLE@*/', (SRC / 'style.css').read_text()).replace('//@SCRIPT@\n', js)

def line_map(inject=None):
    """[(first line in the page, source name, line count)] for every js chunk of render(inject), so a page
    line number (from a stack trace) can be turned back into src/js/<file>:<line>."""
    inject = dict(inject or {}); html = render(inject)
    line = html[:html.index(HEAD)].count('\n') + 1 + HEAD.count('\n'); out = []
    for p in js_files():
        for name, text in (('tools/fit/instrument.js', inject.get(p.name, '')), ('src/js/' + p.name, p.read_text())):
            if text: out.append((line, name, text.count('\n'))); line += text.count('\n')
    return out

def build():
    html = render(); OUT.parent.mkdir(exist_ok=True)
    if not OUT.exists() or OUT.read_text() != html: OUT.write_text(html)
    return OUT

if __name__ == '__main__':
    if '--check' in sys.argv:
        ok = OUT.exists() and OUT.read_text() == render(); print('build/index.html', 'up to date' if ok else 'STALE'); sys.exit(0 if ok else 1)
    print('built', build().relative_to(R))
