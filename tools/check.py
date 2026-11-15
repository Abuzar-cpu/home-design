"""One command for every check, printing only what changed.
   python3 tools/check.py            fit checks + walk tests + guided tour
   python3 tools/check.py --accept   record the current fit findings as known/accepted
Fit findings already in tools/fit/accepted.txt are hidden; new ones are printed."""
import re, subprocess, sys, pathlib
T = pathlib.Path(__file__).parent; FIT = T / 'fit'
def run(args, cwd=None):
    r = subprocess.run([sys.executable, '-I', *args], cwd=cwd, capture_output=True, text=True)
    noise = ('GPU stall', 'agent-proxy', 'connect_rejected', 'Allowed domains', 'For details')
    return '\n'.join(l for l in (r.stdout + r.stderr).splitlines() if not any(n in l for n in noise))
dump = run(['dump.py'], FIT)
if dump.strip(): print(dump)
found = []
for script in ('analyze.py', 'analyze2.py', 'walkcheck.py'):
    for l in run([script], FIT).splitlines():
        if l.startswith('===') or not l.strip() or l.rstrip().endswith('-> clear'): continue
        found.append(re.sub(r'L\d+:', 'L:', l.strip())[:180])
acc_f = FIT / 'accepted.txt'
if '--accept' in sys.argv:
    acc_f.write_text('\n'.join(sorted(set(found))) + '\n'); print(f'accepted {len(set(found))} fit findings')
else:
    acc = set(acc_f.read_text().splitlines()) if acc_f.exists() else set()
    new = [l for l in dict.fromkeys(found) if l not in acc]
    print(f'fit: {len(new)} new finding(s)' + ('' if new else ' (all known)')); [print('  ' + l) for l in new]
if '--fit-only' not in sys.argv:
    print(run([str(T / 'walk.py')]).strip()); print(run([str(T / 'tour_sim.py')]).strip())
