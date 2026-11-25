/* Visual Design project pages — one shared template (PREVIEW ONLY: /menu/?preview=mosaic, loaded by case.js).
   Title: Inter 27px/300 (.pj-title) · meta row: Role / Medium (/ Year) under the first image · one image radius · one intro size.
   - poster pages (AASIGNAL, Afterglow, Dream Question): title + meta replace the old title / subtitle / "Artwork" lines
   - Artificial Appetite: same head; the ROLE block moves into the meta row; collage keeps its left / centre / right offsets with even spacing
   - all other Visual pages already have the head; they only get the shared radius + intro size. */
(function () {
  const slug = location.pathname.split('/').filter(Boolean).pop().replace(/\.html$/, '');
  const POSTER = { aasignal: 1, afterglow: 1, 'dream-question': 1 };
  const PAGES = ['artificial-appetite', 'aasignal', 'afterglow', 'dream-question', 'somniloquy', 'jackery-brand-campaign', 'mindspace', 'a-meditation-practice', 'selection-1', 'selection-2', 'selection-3', 'new-york-fashion-week-fw26', 'knitted-nature'];
  if (!PAGES.includes(slug)) return;
  const bc = document.querySelector('main bodycopy'); if (!bc || bc.dataset.vu) return;
  bc.dataset.vu = '1'; document.body.classList.add('vu');

  if (!document.getElementById('vu-css')) {
    const st = document.createElement('style'); st.id = 'vu-css';
    st.textContent = `
    .vu bodycopy media-item img,.vu bodycopy media-item video,.vu bodycopy>img,.vu bodycopy gallery-grid img{border-radius:2rem}
    .vu .wenshi{font-size:15.3px!important;line-height:23px!important}
    .vu .vu-head{margin:0 0 2.2em;font-family:Inter,'Diatype',-apple-system,sans-serif}
    .vu.vu-poster bodycopy>img{display:block;width:100%;height:auto}
    .vu-aa bodycopy>div.vu-blk{margin:0 0 3.2rem}
    .vu-aa bodycopy>div.vu-blk:last-of-type{margin-bottom:3.6rem}
    .vu-aa .wenshi{display:block;margin:0 0 1.6rem}
    @media (max-width:767px){.vu bodycopy media-item img,.vu bodycopy media-item video,.vu bodycopy>img,.vu bodycopy gallery-grid img{border-radius:1.2rem}.vu .wenshi{font-size:14px!important;line-height:21px!important}.vu-aa bodycopy>div.vu-blk{margin-bottom:2rem}}`;
    document.head.appendChild(st);
  }

  const mkHead = (title, rows) => {
    const h = document.createElement('div'); h.className = 'pj-head vu-head';
    h.innerHTML = '<h1 class="pj-title"></h1><dl class="pj-meta"></dl>';
    h.querySelector('h1').textContent = title;
    const dl = h.querySelector('dl');
    rows.forEach(([k, v]) => { const d = document.createElement('div'); d.innerHTML = '<dt></dt><dd></dd>'; d.firstChild.textContent = k; d.lastChild.textContent = v; dl.appendChild(d); });
    return h;
  };
  const place = (head) => { // title on top, meta row under the first image (same rule as projmeta.js)
    const meta = head.querySelector('.pj-meta'), first = bc.querySelector('media-item,img');
    const blk = first && (first.closest('bodycopy>*') || first);
    if (blk && blk !== head) { meta.dataset.moved = '1'; blk.after(meta); }
  };

  if (POSTER[slug]) {
    document.body.classList.add('vu-poster');
    const h1 = bc.querySelector('h1'); const title = h1 ? h1.textContent.trim() : slug;
    const head = mkHead(title, [['Role', 'Graphic Designer'], ['Medium', 'Poster / Key Visual Design']]);
    bc.querySelectorAll(':scope>h1,:scope>p,:scope>h2').forEach(n => n.remove());
    bc.prepend(head); place(head);
  } else if (slug === 'artificial-appetite') {
    document.body.classList.add('vu-aa');
    const head = mkHead('Artificial Appetite', [['Role', 'Photographer, Visual Designer'], ['Medium', 'Visual Design / Photography'], ['Year', '2026']]);
    const kids = [...bc.children];
    // old title (<i><b>…</b></i>) and the left-aligned italic subtitle
    kids.filter(n => n.tagName === 'I' && /Artificial Appetite/.test(n.textContent)).forEach(n => n.remove());
    kids.filter(n => n.tagName === 'DIV' && /Visual\s+Design\s*\/\s*Photography/.test(n.textContent) && !n.querySelector('media-item')).forEach(n => n.remove());
    // ROLE block now lives in the meta row
    bc.querySelectorAll(':scope>.wenshi').forEach(n => { if (/^\s*ROLE/.test(n.textContent)) n.remove(); });
    // image blocks: drop the stray <br> runs, even spacing instead
    bc.querySelectorAll(':scope>br').forEach(n => n.remove());
    bc.querySelectorAll(':scope>div').forEach(d => { if (d.querySelector('media-item')) { d.querySelectorAll('br').forEach(b => b.remove()); d.classList.add('vu-blk'); } else if (!d.textContent.trim()) d.remove(); });
    bc.querySelectorAll(':scope>media-item').forEach(m => { const w = document.createElement('div'); w.className = 'vu-blk'; m.before(w); w.appendChild(m); });
    bc.prepend(head); place(head);
  }
  window.dispatchEvent(new Event('resize'));
})();
