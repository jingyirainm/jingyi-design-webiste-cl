#!/usr/bin/env python3
"""Download every Cargo-hosted image/video that pages, scripts and styles reference into assets/media/,
then rewrite those references to the local copies. Run from the repo root on your own machine."""
import re, os, glob, hashlib, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)
OUT = os.path.join('assets', 'media')
os.makedirs(OUT, exist_ok=True)
PAT = re.compile(r'https://(?:freight|static)\.cargo\.site/[^\s"\'\)\\<>]+')

files = [p for p in glob.glob('**/*', recursive=True) if p.endswith(('.html', '.js', '.css'))]
urls = {}
for p in files:
    for u in PAT.findall(open(p, encoding='utf-8', errors='ignore').read()):
        urls[u] = None
print(len(urls), 'unique urls')

for u in urls:
    name = u.rstrip('/').split('/')[-1].split('?')[0]
    ext = os.path.splitext(name)[1] or '.bin'
    local = f"{hashlib.sha1(u.encode()).hexdigest()[:12]}_{re.sub(r'[^A-Za-z0-9._-]', '_', name)[:60]}"
    if not local.lower().endswith(ext.lower()):
        local += ext
    dest = os.path.join(OUT, local)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
            open(dest, 'wb').write(urllib.request.urlopen(req, timeout=120).read())
            print('ok ', local)
        except Exception as e:
            print('ERR', u, e)
            continue
    urls[u] = local

# html and js resolve against <base href> (site root); css resolves against its own folder (assets/)
for p in files:
    s = open(p, encoding='utf-8', errors='ignore').read(); o = s
    prefix = (os.path.relpath(OUT, os.path.dirname(p)).replace(os.sep, '/') + '/') if p.endswith('.css') else 'assets/media/'
    for u, local in sorted(urls.items(), key=lambda x: -len(x[0])):
        if local:
            s = s.replace(u, prefix + local)
    if s != o:
        open(p, 'w', encoding='utf-8').write(s)

left = sum(len(PAT.findall(open(p, encoding='utf-8', errors='ignore').read())) for p in files)
print('remaining cargo refs:', left)
