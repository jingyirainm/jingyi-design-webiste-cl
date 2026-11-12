/* Preview only (/?preview=mosaic): one shared frame for Home, Product Design and Visual Design.
   Content sits right of the sidebar, centred, with the same outer margin on both sides.
   Internal links keep ?preview=mosaic and load as full pages so the preview survives navigation. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const B = document.body;

  // new Casting Pool motion (preview only): 3:2 loop on cards, 16:9 loop on the case-study hero
  const CAST = 'assets/projects/casting/';
  const vid = (attrs, sources) => {
    const v = document.createElement('video');
    Object.entries(attrs).forEach(([k, val]) => v.setAttribute(k, val));
    sources.forEach(([src, type]) => { const s = document.createElement('source'); s.src = src; s.type = type; v.appendChild(s); });
    v.muted = true; v.autoplay = true; v.loop = true; v.playsInline = true;
    return v;
  };
  document.querySelectorAll('img[src*="CastPool_Hero_3x2_"]').forEach(img => {
    const v = vid({ class: img.className, style: img.getAttribute('style') || '', width: 1600, height: 1066, poster: CAST + 'castingpool_motion_card_v7_poster.jpg',
      'aria-label': 'ReelShort Casting Hub: Add to Selection, then a pool of talent cards', autoplay: '', muted: '', loop: '', playsinline: '' },
      [[CAST + 'castingpool_motion_card_v7.mp4', 'video/mp4']]);
    img.replaceWith(v); v.play && v.play().catch(() => {});
  });
  // new Vibe Painting product mockup (preview only): display on a pastel desk, camera pushes into the canvas, 3:4 loop
  const VIBE = 'assets/projects/vibe/';
  document.querySelectorAll('img[src*="vibe_painting_5.8s_600x800"]').forEach(img => {
    const v = vid({ class: img.className, style: img.getAttribute('style') || '', width: 900, height: 1200, poster: VIBE + 'vibe_painting_mockup_card_poster.jpg',
      'aria-label': 'Vibe Painting running on a desktop display: blow to add colour, blink to add figures', autoplay: '', muted: '', loop: '', playsinline: '' },
      [[VIBE + 'vibe_painting_mockup_card.mp4', 'video/mp4']]);
    img.replaceWith(v); v.play && v.play().catch(() => {});
  });
  const hero = document.querySelector('figure.hero img[src*="casting/casting-1.jpg"]');
  if (hero) {
    const v = vid({ width: 1920, height: 1080, poster: CAST + 'castingpool_motion_v7_poster.jpg', preload: 'auto',
      'aria-label': 'ReelShort Casting Hub: Add to Selection, then a pool of talent cards', autoplay: '', muted: '', loop: '', playsinline: '' },
      [[CAST + 'castingpool_motion_v7.webm', 'video/webm'], [CAST + 'castingpool_motion_v7.mp4', 'video/mp4']]);
    hero.replaceWith(v); v.play && v.play().catch(() => {});
  }

  // shared frame only on Home / Product Design / Visual Design (case studies keep their own layout)
  const framePage = /^\/(index\.html|work\/?|menu\/?|jingyizhang-design\.html|work\.html|menu\.html)?$/.test(location.pathname);
  if (!framePage) { keepFlag(); return; }
  B.classList.add('pv');
  const st = document.createElement('style'); st.id = 'preview-frame-css';
  st.textContent = `
  body.pv{--pv-m:clamp(48px,5.6vw,112px)}
  body.pv:not(.mobile) main .page{padding-left:var(--pv-sb,20.2vw)!important;padding-right:0!important}
  body.pv:not(.mobile) main .page-layout{flex:1 1 auto!important;max-width:none!important;width:auto!important;margin:0!important;
    padding-left:var(--pv-m)!important;padding-right:var(--pv-m)!important}
  body.pv:not(.mobile) main .page-content{padding-left:0!important;padding-right:0!important}`;
  document.head.appendChild(st);

  const sb = document.querySelector('.pin-left .page-layout');
  const size = () => { if (sb) B.style.setProperty('--pv-sb', Math.round(sb.getBoundingClientRect().right) + 'px'); };
  size(); addEventListener('resize', size);

  keepFlag();

  // keep the preview flag across pages (full load, bypassing the in-place page swap)
  // window capture runs before clean-routing.js / dissolve.js, which also intercept clicks on document
  function keepFlag() {
    window.addEventListener('click', e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]'); if (!a || a.target === '_blank') return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
      u.searchParams.set('preview', 'mosaic');
      e.preventDefault(); e.stopImmediatePropagation();
      location.href = u.href;
    }, true);
  }
})();
