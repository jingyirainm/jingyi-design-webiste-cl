/* Home preview (/?preview=mosaic): exactly the live home cards (same media, rounded corners, same sizes,
   same 3-column masonry); only the order the cards are arranged in changes. Mobile keeps its own gallery.
   Runs after index-cards.js (card links, captions, numbers). */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const gal = document.querySelector('main .desk-only gallery-columnized');
  if (!gal) return;

  // new reading order (left → right, top → bottom through the masonry)
  // chosen so the three columns end nearly level (minimal stretch on the last cards):
  // col 1 Knotboard · Hexagram · Developers | col 2 Somniloquy · Addendum · ChatGPT board | col 3 Casting Pool · Knot Agent · Vibe Painting
  const ORDER = [/knotboard/i, /somniloquy/i, /cast(ing)?pool/i, /hexagram/i, /knot-?agent/i,
                 /vibe_painting/i, /addendum/i, /chatgpt--2026929/i, /developers-social/i];

  const items = [...gal.querySelectorAll(':scope > media-item')];
  const srcOf = mi => { const m = mi.querySelector('img,video'); const so = m && m.querySelector && m.querySelector('source');
    return decodeURIComponent((m && (m.currentSrc || m.getAttribute('src') || (so && so.getAttribute('src')))) || ''); };
  const placed = [];
  ORDER.forEach(re => { const mi = items.find(x => !placed.includes(x) && re.test(srcOf(x))); if (mi) placed.push(mi); });
  items.forEach(mi => { if (!placed.includes(mi)) placed.push(mi); }); // anything unknown keeps its place at the end

  placed.forEach(mi => gal.appendChild(mi));
  placed.forEach((mi, i) => { const no = mi.querySelector('.ic-no'); if (no) no.textContent = String(i + 1).padStart(2, '0'); });
  const re = () => window.rsSite && window.rsSite.relayout && window.rsSite.relayout();
  re(); addEventListener('load', re);
})();
