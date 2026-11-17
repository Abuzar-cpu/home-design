"""Prints the values docs/HANDOFF.md section 2 needs: git commit, and the sha256 of the
built working-copy page and public page. Compare them with list_files on the artifacts.
   python3 tools/status.py"""
import hashlib, pathlib, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from build import build
R = pathlib.Path(__file__).resolve().parents[1]
subprocess.run([sys.executable, str(R / 'tools' / 'publish_prep.py')], check=True, capture_output=True)
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
git = lambda *a: subprocess.run(['git', *a], cwd=R, capture_output=True, text=True).stdout.strip()
dirty = git('status', '--porcelain', '--', 'src', 'tools')
print(f"commit        {git('rev-parse', '--short', 'HEAD')}" + ('  (uncommitted changes in src/ or tools/)' if dirty else ''))
print(f"working copy  {sha(build())}  build/index.html")
print(f"public page   {sha(R / 'build' / 'public.html')}  build/public.html")
