/* Home (desktop): Cargo-style mosaic on a 12-column grid of square cells.
   Every card snaps to the same cell size, so the gap is identical across and down, and all row edges line up.
   Rounded corners and page margins are the live site's own. Mobile keeps its own gallery.
   Runs after index-cards.js (card links, captions, numbers). */
(function () {
  // Preview only: the live home keeps the original 3-column cards. Open /?preview=mosaic to see this layout.
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const gal = document.querySelector('main .desk-only gallery-columnized');
  if (!gal) return;
  const GAP = 14; // px, same horizontally and vertically

  // [matcher, colStart, colSpan, rowStart, rowSpan, fit]
  const LAYOUT = [   // [matcher, col, colSpan, band, bandSpan, fit, indent]   (Cargo reference: 4 bands, 8|4, 4|8, 6|6, 8|4)
    [/knotboard/i,              1, 8, 1, 1],
    [/somniloquy/i,             9, 4, 1, 1],
    [/hexagram/i,               1, 4, 2, 1],   // Yi phone: narrow
    [/cast(ing)?pool/i,         5, 8, 2, 1],
    [/addendum/i,               1, 6, 3, 1],
    [/vibe_painting/i,          7, 6, 3, 1, 'contain'],   // becomes A Meditation Practice
    [/knot-?agent/i,            1, 8, 4, 1],   // becomes the live I Ching board (wide)
    [/star-chair/i,             9, 4, 4, 1]
  ];
  const BANDS = [0.444, 0.38, 0.32, 0.413];   // band heights as a share of the card-group width



  // tiles swapped to assets that live elsewhere on the site
  const SWAP = [
    { re: /star-chair/i, n: 'Selection 3', m: 'AIGC Key Visual · Product', href: 'selection-3.html',
      html: '<img class="media" src="assets/media/star-chair.jpg" alt="Brushed-aluminium chair with a star cut-out" width="1000" height="1328">' },
    { re: /knot-?agent/i, n: 'Yi', m: 'Consumer Mobile App', href: 'yi-daily-guidance.html',
      html: '<div class="hm-embed"><iframe src="yi-app/board.html" title="Yi — five screens running" loading="lazy" tabindex="-1"></iframe></div>' },
    { re: /vibe_painting/i, n: 'A Meditation Practice', m: 'Video Art / AI Generation', href: 'a-meditation-practice.html',
      html: '<video class="media" src="assets/media/314f6ba6360a_rainmelonzjy_72706_httpss.mj.runjAVvjQTTUvc_no_camera_moveme.mp4" poster="assets/media/2d52531b2869_rainmelonzjy_72706_httpss.webp" autoplay muted loop playsinline width="1168" height="784"></video>' }
  ];

  const css = `
  body:not(.mobile) gallery-columnized.hm{display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr));
    grid-template-rows:var(--hm-rows,none);gap:${GAP}px!important;height:auto!important}
  body:not(.mobile) gallery-columnized.hm>media-item{position:relative!important;transform:none!important;width:auto!important;
    min-width:0;margin:0!important;grid-column:var(--hm-c);grid-row:var(--hm-r)}
  body:not(.mobile) gallery-columnized.hm>media-item>.mi-frame{width:100%!important;height:100%!important;margin:0!important}
  body:not(.mobile) gallery-columnized.hm .mi-frame .media{width:100%!important;height:100%!important;object-fit:cover}
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .mi-frame{background:#fff}
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .media{object-fit:contain}
  body:not(.mobile) gallery-columnized.hm>media-item.hm-off{display:none!important}
  body:not(.mobile) gallery-columnized.hm>media-item.hm-il>.mi-frame{margin-left:var(--hm-il,40px)!important;width:calc(100% - var(--hm-il,40px))!important}
  body:not(.mobile) gallery-columnized.hm>media-item.hm-ir>.mi-frame{width:calc(100% - var(--hm-ir,23px))!important}
  /* dark mode: no hairline ring around the tiles (it inverts to a light edge) */
  html[data-theme="dark"] body:not(.mobile) gallery-columnized.hm .mi-frame::after{box-shadow:none!important}
  /* A Meditation Practice: its video ground is near-white */
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .mi-frame:has(video[src*="314f6ba6360a"]){background:#fcfcfc}
  /* Developers board: whole logo visible, its thin grey top/bottom edges trimmed */
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .media[src*="developers-social"]{clip-path:inset(9.5% 0)}
  .hm-embed{position:absolute;inset:0;background:#f3f3f3}
  .hm-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}`;
  const st = document.createElement('style'); st.id = 'home-mosaic-css'; st.textContent = css; document.head.appendChild(st);

  const items = [...gal.querySelectorAll(':scope > media-item')];
  // extra card: clone an existing one, its picture is swapped below
  { const base = items.find(x => /somniloquy/i.test(decodeURIComponent((x.querySelector('img,video') || {}).currentSrc || (x.querySelector('img,video') || document.body).getAttribute?.('src') || '')));
    if (base) { const c = base.cloneNode(true); c.dataset.hmSrc = 'star-chair'; gal.appendChild(c); items.push(c); } }
  const srcOf = mi => { if (mi.dataset.hmSrc) return mi.dataset.hmSrc; const m = mi.querySelector('img,video'); const so = m && m.querySelector && m.querySelector('source'); return decodeURIComponent((m && (m.currentSrc || m.getAttribute('src') || (so && so.getAttribute('src')))) || ''); };
  const placed = [];
  LAYOUT.forEach(([re, c, cs, r, rs, fit, ind]) => {
    const mi = items.find(x => !placed.includes(x) && re.test(srcOf(x)));
    if (!mi) return;
    mi.style.setProperty('--hm-c', `${c} / span ${cs}`);
    mi.style.setProperty('--hm-r', `${r} / span ${rs}`);
    // contained tiles: the white ground around the media must stay white in dark mode, so the frame is kept out of the page inversion
    if (ind === 'l') mi.classList.add('hm-il'); if (ind === 'r') mi.classList.add('hm-ir');
    if (fit === 'contain') { mi.classList.add('hm-contain'); const f = mi.querySelector('.mi-frame'); if (f) f.classList.add('th-keep'); }
    mi._hmKey = re;
    placed.push(mi);
  });
  if (placed.length !== LAYOUT.length) return; // a card is missing: leave the original masonry untouched
  items.forEach(x => { if (!placed.includes(x)) x.classList.add('hm-off'); }); // cards that are not in the reference arrangement stay out of this preview

  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  SWAP.forEach(sw => {
    const mi = placed.find(x => sw.re.test(srcOf(x))); if (!mi) return;
    const old = mi.querySelector('.mi-frame > img, .mi-frame > video'); if (!old) return;
    old.insertAdjacentHTML('afterend', sw.html); old.remove();
    const v = mi.querySelector('video'); if (v) { v.muted = true; v.play && v.play().catch(() => {}); }
    const cap = mi.querySelector('.ic-cap');
    if (cap) cap.innerHTML = `<b>${esc(sw.n)}</b><i>${esc(sw.m)}</i>`;
    const link = mi.querySelector('.ic-link');
    if (link) { link.setAttribute('href', sw.href); link.setAttribute('aria-label', `${sw.n}, ${sw.m}`); }
  });

  placed.forEach(mi => gal.appendChild(mi)); // reading / tab order follows the mosaic
  placed.forEach((mi, i) => { const no = mi.querySelector('.ic-no'); if (no) no.textContent = String(i + 1).padStart(2, '0'); });
  gal.classList.add('hm');

  // square cells: row height = column width
  const size = () => {
    const w = gal.clientWidth; if (!w) return;
    gal.style.setProperty('--hm-rows', BANDS.map(f => (w * f).toFixed(1) + 'px').join(' '));
    gal.style.setProperty('--hm-il', (w * 0.0454).toFixed(1) + 'px'); gal.style.setProperty('--hm-ir', (w * 0.026).toFixed(1) + 'px');
    centre();
  };
  // centre the whole card group in the space right of the side bar: same white space left and right
  const sb = document.querySelector('.pin-left .page-layout');
  const centre = () => {
    if (document.body.classList.contains('mobile')) { gal.style.left = ''; return; }
    gal.style.position = 'relative'; gal.style.left = '0px';
    const r = gal.getBoundingClientRect(); if (!r.width) return;
    const L = sb ? sb.getBoundingClientRect().right : 0, R = document.documentElement.clientWidth;
    gal.style.left = Math.round((L + R) / 2 - (r.left + r.right) / 2) + 'px';
  };
  size();
  addEventListener('resize', size);
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(gal);
})();
