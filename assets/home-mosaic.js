/* Home (desktop): Cargo-style mosaic on a 12-column grid of square cells.
   Every card snaps to the same cell size, so the gap is identical across and down, and all row edges line up.
   The outer frame (equal side margins) comes from preview-frame.js. Mobile keeps its own gallery.
   Runs after index-cards.js (card links, captions, numbers). */
(function () {
  // Preview only: the live home keeps the original 3-column cards. Open /?preview=mosaic to see this layout.
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const gal = document.querySelector('main .desk-only gallery-columnized');
  if (!gal) return;
  const GAP = 14; // px, same horizontally and vertically

  // [matcher, colStart, colSpan, rowStart, rowSpan, fit]
  const LAYOUT = [
    [/knotboard/i,              1, 8,  1, 5],
    [/somniloquy/i,             9, 4,  1, 5],
    [/knot-?agent/i,            1, 4,  6, 2, 'contain'],
    [/addendum/i,               1, 4,  8, 3],
    [/cast(ing)?pool/i,               5, 8,  6, 5],
    [/chatgpt--2026929/i,       1, 8, 11, 4],   // becomes the live I Ching board (wide)
    [/hexagram/i,               9, 4, 11, 4],   // becomes the Mindspace balloons video
    [/vibe_painting/i,          1, 4, 15, 5],
    [/developers-social/i,      5, 8, 15, 5]
  ];

  // tiles swapped to assets that live elsewhere on the site
  const SWAP = [
    { re: /chatgpt--2026929/i, n: 'Yi', m: 'Consumer Mobile App', href: 'yi-daily-guidance.html',
      html: '<div class="hm-embed"><iframe src="yi-app/board.html" title="Yi — five screens running" loading="lazy" tabindex="-1"></iframe></div>' },
    { re: /hexagram/i, n: 'Mindspace', m: 'AIGC Video', href: 'mindspace.html',
      html: '<video class="media" src="assets/media/86d4830e11be_rainmelonzjy_72706_a_thousand_of_floating_balloon_white_colo.mp4" autoplay muted loop playsinline width="768" height="512"></video>' }
  ];

  const css = `
  body:not(.mobile) gallery-columnized.hm{display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr));
    grid-auto-rows:var(--hm-row,60px);gap:${GAP}px!important;height:auto!important}
  body:not(.mobile) gallery-columnized.hm>media-item{position:relative!important;transform:none!important;width:auto!important;
    min-width:0;margin:0!important;grid-column:var(--hm-c);grid-row:var(--hm-r)}
  body:not(.mobile) gallery-columnized.hm>media-item>.mi-frame{width:100%!important;height:100%!important;margin:0!important}
  body:not(.mobile) gallery-columnized.hm .mi-frame .media{width:100%!important;height:100%!important;object-fit:cover}
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .mi-frame{background:#fff}
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .media{object-fit:contain}
  .hm-embed{position:absolute;inset:0;background:#f3f3f3}
  .hm-embed iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}
  /* square corners on every home card (desktop + mobile) */
  body.page-homepage-desktop-1 main .ic-gal .ic-card.ic-card .mi-frame,
  body.page-homepage-desktop-1 main .ic-gal .ic-card.ic-card .mi-frame::after,
  body.page-homepage-desktop-1 main .ic-gal .ic-card.ic-card .media,
  body.page-homepage-desktop-1 main .ic-gal .ic-card.ic-card .ic-cap,
  body.page-homepage-desktop-1 main .ic-gal .ic-card.ic-card .ic-link{border-radius:0!important}`;
  const st = document.createElement('style'); st.id = 'home-mosaic-css'; st.textContent = css; document.head.appendChild(st);

  const items = [...gal.querySelectorAll(':scope > media-item')];
  const srcOf = mi => { const m = mi.querySelector('img,video'); const so = m && m.querySelector && m.querySelector('source'); return decodeURIComponent((m && (m.currentSrc || m.getAttribute('src') || (so && so.getAttribute('src')))) || ''); };
  const placed = [];
  LAYOUT.forEach(([re, c, cs, r, rs, fit]) => {
    const mi = items.find(x => !placed.includes(x) && re.test(srcOf(x)));
    if (!mi) return;
    mi.style.setProperty('--hm-c', `${c} / span ${cs}`);
    mi.style.setProperty('--hm-r', `${r} / span ${rs}`);
    if (fit === 'contain') mi.classList.add('hm-contain');
    mi._hmKey = re;
    placed.push(mi);
  });
  if (placed.length !== items.length) return; // unknown card: leave the original masonry untouched

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
    gal.style.setProperty('--hm-row', ((w - GAP * 11) / 12) + 'px');
  };
  size();
  addEventListener('resize', size);
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(gal);
})();
