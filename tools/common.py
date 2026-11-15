"""Shared paths and page builders for the tour checks. Run everything from the repo root."""
import json, pathlib, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC, BUILD, TOOLS = ROOT / 'tour' / 'index.html', ROOT / 'build', ROOT / 'tools'
THREE = TOOLS / 'node_modules' / 'three' / 'build' / 'three.min.js'
CDN = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js'
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600&display=swap" rel="stylesheet">'
CHROME = dict(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'])

def build_test():
    """build/test.html: the tour with three.js loaded locally and no web fonts (the sandbox has no CDN access)."""
    if not THREE.exists():
        subprocess.run(['npm', 'install', '--silent', '--prefix', str(TOOLS)], check=True)
    BUILD.mkdir(exist_ok=True)
    s = SRC.read_text().replace(CDN, str(THREE)).replace(FONTS, '')
    (BUILD / 'test.html').write_text(s)
    return BUILD / 'test.html'

def build_check():
    """build/check.html: test copy plus instrumentation used by the fit checks."""
    s = build_test().read_text()
    for a, b in json.loads((TOOLS / 'fit' / 'patches.json').read_text()):
        assert s.count(a) == 1, ('patch anchor not unique', s.count(a), a[:80])
        s = s.replace(a, b, 1)
    (BUILD / 'check.html').write_text(s)
    return BUILD / 'check.html'

def url(p): return 'file://' + str(p)
