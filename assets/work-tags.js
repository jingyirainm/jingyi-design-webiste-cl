/* Product Design page add-on (runs after work.js)
   - Grid view: the subtitle sits in the title row above the cover; the tag sits on the right.
   - List view (desktop): the subtitle after "—" moves from the header row to just below the cover,
     above the description. Phones keep the original header. */
(function () {
  const grid = document.querySelector('.wk-grid');
  if (!grid) return;

  const css = `
  .wk-grid.two .wk-type{justify-content:flex-end}
  .wk-head>.wk-line{order:0;margin:0;flex:0 1 auto;min-width:0;font-size:1.08rem;line-height:1.2;color:rgba(17,17,17,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .wk-org{display:inline-flex;align-items:center;flex:none;margin-left:.7em;padding:.2em .7em .26em;border-radius:99px;background:rgba(17,17,17,.06);font:400 .95rem/1.25 Inter,'Diatype Variable',-apple-system,sans-serif;letter-spacing:.01em;color:rgba(17,17,17,.62);white-space:nowrap;vertical-align:.12em;text-decoration:none}
  .wk-head>.wk-org{margin-left:.6em}
  .wk-sub{display:none}
  @media (min-width:768px){
    body:not(.mobile) .wk-grid:not(.two) .wk-sub{display:block;font-size:1rem;line-height:1.4;font-weight:390;color:#111;letter-spacing:-.01em;margin:1.1rem 0 .35rem}
    body:not(.mobile) .wk-grid:not(.two) .wk-tline{display:none}
  }`;
  if (!document.getElementById('wk-tags-css')) { const st = document.createElement('style'); st.id = 'wk-tags-css'; st.textContent = css; document.head.appendChild(st); }

  const BLOCK = 'gallery-slideshow,gallery-columnized,media-item,figure,.yi-live-cover';

  grid.querySelectorAll('.wk-item').forEach(it => {
    // grid: subtitle joins the title row above the cover
    const gl = it.querySelector(':scope>.wk-line'), gh = it.querySelector(':scope>.wk-head');
    if (gl && gh) { gl.title = gl.textContent; const nm = gh.querySelector('.wk-nm'); nm ? nm.after(gl) : gh.appendChild(gl); }

    // list subtitle -> below the cover
    const head = it.querySelector(':scope>column-set'); if (!head) return;
    const titleCell = head.querySelectorAll(':scope>.cu')[1]; if (!titleCell) return;
    const walker = document.createTreeWalker(titleCell, NodeFilter.SHOW_TEXT);
    let node, at = -1;
    while ((node = walker.nextNode())) { at = node.textContent.search(/[—–]/); if (at >= 0) break; }
    if (!node || at < 0) return;
    // the inline element that holds the whole title
    let holder = node.parentNode;
    while (holder !== titleCell && holder.parentNode !== titleCell && titleCell.contains(holder.parentNode) && holder.parentNode.nodeName !== 'DIV') holder = holder.parentNode;
    const r = document.createRange();
    r.setStart(node, at);
    r.setEnd(holder, holder.childNodes.length);
    const frag = r.extractContents();
    // keep an "NDA" marker in the title
    const keep = [...frag.querySelectorAll('span')].filter(s => /nda|in progress/i.test(s.textContent));
    const tline = document.createElement('span'); tline.className = 'wk-tline'; tline.appendChild(frag);
    holder.appendChild(tline);
    keep.forEach(k => holder.appendChild(k));

    const sub = document.createElement('div'); sub.className = 'wk-sub';
    sub.appendChild(tline.cloneNode(true));
    sub.firstChild.className = '';
    // drop the leading dash
    const tw = document.createTreeWalker(sub, NodeFilter.SHOW_TEXT);
    const t0 = tw.nextNode(); if (t0) t0.textContent = t0.textContent.replace(/^\s*[—–]\s*/, '');
    const desc = it.querySelector(':scope>p.wk-desc');
    const media = [...it.querySelectorAll(':scope>' + BLOCK.split(',').join(',:scope>'))].pop();
    if (desc) it.insertBefore(sub, desc);
    else if (media) media.after(sub);
    else it.appendChild(sub);
  });

  /* institution endorsement: a small badge to the right of each project title (list and grid views) */
  const ORG = [[/casting/i, '@ReelShort'], [/addendum/i, '@ReelShort'], [/knotboard/i, '@Rainmelon Studio'], [/vibe/i, '@Google Developer Group'], [/yi\b|易/i, '@Columbia University'], [/cave song/i, '@Columbia University']];
  const orgOf = name => { const m = ORG.find(o => o[0].test(name)); return m ? m[1] : ''; };
  const badge = txt => { const b = document.createElement('span'); b.className = 'wk-org'; b.textContent = txt; return b; };
  grid.querySelectorAll('.wk-item').forEach(it => {
    if (it.querySelector('.wk-org')) return;
    const nm = it.querySelector(':scope>.wk-head .wk-nm'); if (!nm) return;
    const org = orgOf(nm.textContent); if (!org) return;
    nm.after(badge(org));                                            // grid view: after the title in the header row
    const head = it.querySelector(':scope>column-set'); if (!head) return;
    const cell = head.querySelectorAll(':scope>.cu')[1]; if (!cell) return;
    const tl = cell.querySelector('.wk-tline');                      // list view: after the title, before the subtitle
    if (tl) tl.before(badge(org));
    else { const holder = cell.querySelector('span') || cell; holder.appendChild(badge(org)); }
  });
})();
