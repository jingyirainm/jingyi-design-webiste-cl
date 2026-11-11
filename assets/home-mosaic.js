/* Home (desktop): Cargo-style mosaic on a 12-column grid of square cells.
   Every card snaps to the same cell size, so the gap is identical across and down, and all row edges line up.
   Mobile keeps its own single-column gallery. Runs after index-cards.js (card links, captions, numbers). */
(function () {
  const gal = document.querySelector('main .desk-only gallery-columnized');
  if (!gal) return;
  const GAP = 14; // px, same horizontally and vertically

  // [matcher, colStart, colSpan, rowStart, rowSpan, fit]
  // Bands of 5 rows alternate big-left / big-right; the small column stacks 2 + 3 rows in band 2.
  const LAYOUT = [
    [/knotboard/i,              1, 8,  1, 5],
    [/somniloquy/i,             9, 4,  1, 5],
    [/knot-?agent/i,            1, 4,  6, 2, 'contain'],
    [/addendum/i,               1, 4,  8, 3],
    [/castpool/i,               5, 8,  6, 5],
    [/chatgpt--2026929/i,       1, 8, 11, 5],
    [/hexagram/i,               9, 4, 11, 5],
    [/vibe_painting/i,          1, 4, 16, 5],
    [/developers-social/i,      5, 8, 16, 5]
  ];

  const css = `
  body:not(.mobile) gallery-columnized.hm{display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr));
    grid-auto-rows:var(--hm-row,60px);gap:${GAP}px!important;height:auto!important}
  body:not(.mobile) gallery-columnized.hm>media-item{position:relative!important;transform:none!important;width:auto!important;
    min-width:0;margin:0!important;grid-column:var(--hm-c);grid-row:var(--hm-r)}
  body:not(.mobile) gallery-columnized.hm>media-item>.mi-frame{width:100%!important;height:100%!important;margin:0!important}
  body:not(.mobile) gallery-columnized.hm .mi-frame .media{width:100%!important;height:100%!important;object-fit:cover}
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .mi-frame{background:#fff}
  body:not(.mobile) gallery-columnized.hm media-item.hm-contain .media{object-fit:contain}`;
  const st = document.createElement('style'); st.id = 'home-mosaic-css'; st.textContent = css; document.head.appendChild(st);

  const items = [...gal.querySelectorAll(':scope > media-item')];
  const srcOf = mi => { const m = mi.querySelector('img,video'); return decodeURIComponent((m && (m.currentSrc || m.getAttribute('src'))) || ''); };
  const placed = [];
  LAYOUT.forEach(([re, c, cs, r, rs, fit]) => {
    const mi = items.find(x => !placed.includes(x) && re.test(srcOf(x)));
    if (!mi) return;
    mi.style.setProperty('--hm-c', `${c} / span ${cs}`);
    mi.style.setProperty('--hm-r', `${r} / span ${rs}`);
    if (fit === 'contain') mi.classList.add('hm-contain');
    placed.push(mi);
  });
  if (placed.length !== items.length) return; // unknown card: leave the original masonry untouched
  placed.forEach(mi => gal.appendChild(mi)); // reading / tab order follows the mosaic
  placed.forEach((mi, i) => { const no = mi.querySelector('.ic-no'); if (no) no.textContent = String(i + 1).padStart(2, '0'); });
  gal.classList.add('hm');

  // square cells: row height = column width
  const size = () => {
    const w = gal.clientWidth; if (!w) return;
    gal.style.setProperty('--hm-row', ((w - GAP * 11) / 12) + 'px');
  };
  size();
  if ('ResizeObserver' in window) new ResizeObserver(size).observe(gal); else addEventListener('resize', size);
})();
