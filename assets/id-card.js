/* Home (desktop): interactive ID card at the top of the page, above the work mosaic.
   The card itself lives in assets/id-card.html (particles, flip, selectable text, its own white cursor)
   and is embedded in an iframe so its canvas, styles and cursor stay isolated from the site. */
(function () {
  const grid = document.querySelector('main .desk-only gallery-columnized');
  if (!grid || document.querySelector('.idc-card') || document.body.classList.contains('mobile')) return;

  const sec = document.createElement('section');
  sec.className = 'idc-card';
  sec.innerHTML = '<iframe src="assets/id-card.html?v=20261116a" title="Jingyi Zhang — ID card. I Bring Structure to Creativity." loading="eager"></iframe>';
  if (!document.getElementById('idc-style')) {
    const st = document.createElement('style');
    st.id = 'idc-style';
    st.textContent = `.idc-card{margin:0 0 14px}
    .idc-card iframe{display:block;width:100%;aspect-ratio:1029/596;border:0;background:transparent;color-scheme:normal}`;
    document.head.appendChild(st);
  }
  grid.insertAdjacentElement('beforebegin', sec);
  const frame = sec.querySelector('iframe');

  // the site's green cursor can't follow the pointer inside the iframe: hide it there (it comes back on the next move outside)
  frame.addEventListener('mouseenter', () => document.documentElement.classList.remove('cd-vis', 'cd-link', 'cd-text'));

  // pause the card's animation while it is scrolled out of view
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => {
    try { frame.contentWindow.__idcPaused = !e.isIntersecting; } catch (err) {}
  }), { threshold: 0 }).observe(sec);

  // line up with the mosaic's left edge and width (-8px each side: the card page keeps an 8px margin for its tilt)
  const align = () => {
    sec.style.marginLeft = '0px'; sec.style.width = '';
    const g = grid.getBoundingClientRect(), s = sec.getBoundingClientRect();
    sec.style.marginLeft = (g.left - s.left - 8) + 'px';
    sec.style.width = (g.width + 16) + 'px';
    sec.style.marginTop = '-8px';
  };
  align(); addEventListener('resize', align); addEventListener('load', align); setTimeout(align, 600);
})();
