/* Home (desktop): interactive ID card at the top of the page, above the work mosaic.
   The card itself lives in assets/id-card.html (particles, flip, selectable text; it loads the site's own cursor.js)
   and is embedded in an iframe so its canvas, styles and cursor stay isolated from the site. */
(function () {
  const grid = document.querySelector('main .desk-only gallery-columnized');
  if (!grid || document.querySelector('.idc-card') || document.body.classList.contains('mobile')) return;

  // preview (/?preview=mosaic): the Design Spark iPod intro card takes the ID card's place
  const PREVIEW = /[?&]preview=mosaic(&|$)/.test(location.search);
  const sec = document.createElement('section');
  sec.className = 'idc-card' + (PREVIEW ? ' ds-card' : '');
  sec.innerHTML = PREVIEW
    ? '<iframe src="assets/design-spark-card.html?v=20261118b" title="Jingyi Zhang — Design Spark. An interactive iPod with my intro, about and contact." loading="eager" allow="autoplay"></iframe>'
    : '<iframe src="assets/id-card.html?v=20261116c" title="Jingyi Zhang — ID card. I Bring Structure to Creativity." loading="eager"></iframe>';
  if (!document.getElementById('idc-style')) {
    const st = document.createElement('style');
    st.id = 'idc-style';
    st.textContent = `.idc-card{margin:0 0 14px}
    .idc-card iframe{display:block;width:100%;aspect-ratio:1029/559;border:0;background:transparent;color-scheme:normal}
    .idc-card.ds-card iframe{aspect-ratio:736/414}`;
    document.head.appendChild(st);
  }
  grid.insertAdjacentElement('beforebegin', sec);
  const frame = sec.querySelector('iframe');

  // the page's cursor can't follow the pointer inside the iframe, where the card runs its own copy of cursor.js: hide the outer one there
  frame.addEventListener('mouseenter', () => document.documentElement.classList.remove('cd-vis', 'cd-link', 'cd-text'));

  // pause the card's animation while it is scrolled out of view
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => {
    try { frame.contentWindow.__idcPaused = !e.isIntersecting; } catch (err) {}
  }), { threshold: 0 }).observe(sec);

  // line up with the mosaic's left edge and width (-8px each side: the card page keeps an 8px margin for its tilt)
  const pad = 8; // the ID card page keeps an 8px margin for its tilt
  const align = () => {
    sec.style.marginLeft = '0px'; sec.style.width = '';
    const g = grid.getBoundingClientRect(), s = sec.getBoundingClientRect();
    if (PREVIEW) {
      // iPod card: its stage is 736×414 with the device body at 18px / 42px in — the body's edges line up with the mosaic
      const k = g.width / 702;
      sec.style.marginLeft = (g.left - s.left - 18 * k) + 'px';
      sec.style.width = (736 * k) + 'px';
      sec.style.marginTop = (-42 * k) + 'px';
      sec.style.marginBottom = (14 - 30 * k) + 'px';
      return;
    }
    sec.style.marginLeft = (g.left - s.left - pad) + 'px';
    sec.style.width = (g.width + pad * 2) + 'px';
    sec.style.marginTop = (-pad) + 'px';
  };
  align(); addEventListener('resize', align); addEventListener('load', align); setTimeout(align, 600);
})();
