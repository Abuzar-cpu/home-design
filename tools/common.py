"""Shared paths and page builders for the tour checks. Run everything from the repo root."""
import pathlib, re, subprocess
ROOT = pathlib.Path(__file__).resolve().parents[1]
BUILD, TOOLS = ROOT / 'build', ROOT / 'tools'
import sys; sys.path.insert(0, str(TOOLS)); from build import render
THREE = TOOLS / 'node_modules' / 'three' / 'build' / 'three.min.js'
CDN = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js'
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600&display=swap" rel="stylesheet">'
def _chrome():
    """Chrome binary: $CHROME, else the usual Linux or macOS install path."""
    import os
    for c in (os.environ.get('CHROME'), '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'):
        if c and os.path.exists(c): return c
    raise SystemExit('Chrome not found: set CHROME=/path/to/chrome')
CHROME = dict(executable_path=_chrome(), args=['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'])

def build_test(inject=None, name='test.html'):
    """build/test.html: the tour with three.js loaded locally and no web fonts (the sandbox has no CDN access)."""
    if not THREE.exists():
        subprocess.run(['npm', 'install', '--silent', '--prefix', str(TOOLS)], check=True)
    BUILD.mkdir(exist_ok=True)
    s = render(inject).replace(CDN, str(THREE)).replace(FONTS, '')
    (BUILD / name).write_text(s)
    return BUILD / name

def instrument():
    """The '//@before <file>' sections of tools/fit/instrument.js, as build.render() inject points."""
    parts = re.split(r'^//@before (\S+)\n', (TOOLS / 'fit' / 'instrument.js').read_text(), flags=re.M)
    return {parts[i]: parts[i + 1] for i in range(1, len(parts), 2)}

def build_check():
    """build/check.html: test copy plus the fit-check instrumentation."""
    return build_test(instrument(), 'check.html')

def url(p): return 'file://' + str(p)
