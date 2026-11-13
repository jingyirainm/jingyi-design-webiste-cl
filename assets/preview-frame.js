/* Preview only (/?preview=mosaic): one shared frame for Home, Product Design and Visual Design.
   Content sits right of the sidebar, centred, with the same outer margin on both sides.
   Internal links keep ?preview=mosaic and load as full pages so the preview survives navigation. */
(function () {
  const PREVIEW = /[?&]preview=mosaic(&|$)/.test(location.search);
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
  // the motion card replaces the Casting Pool image on the Home mosaic only; Product Design keeps its original slideshow image
  const isHome = /^\/(index\.html|jingyizhang-design\.html)?$/.test(location.pathname);
  if (isHome) document.querySelectorAll('img[src*="CastPool_Hero_3x2_"]').forEach(img => {
    const v = vid({ class: img.className, style: img.getAttribute('style') || '', width: 1600, height: 1066, poster: CAST + 'castingpool_motion_card_v8_poster.jpg?r=4',
      'aria-label': 'ReelShort Casting Hub: Add to Selection, then a pool of talent cards', autoplay: '', muted: '', loop: '', playsinline: '' },
      [[CAST + 'castingpool_motion_card_v8.mp4?r=4', 'video/mp4']]);
    img.replaceWith(v); v.play && v.play().catch(() => {});
  });
  // Knotboard home card (preview only): MacBook part of the intro only, looped
  document.querySelectorAll('video[src*="knotboard/knotboard_intro.mp4"]').forEach(v => {
    v.poster = 'assets/projects/knotboard/knotboard_intro_mac_poster.jpg';
    v.src = 'assets/projects/knotboard/knotboard_intro_mac.mp4'; v.muted = true; v.play && v.play().catch(() => {});
  });
  const hero = PREVIEW && document.querySelector('figure.hero img[src*="casting/casting-1.jpg"]');
  if (hero) {
    const v = vid({ width: 1920, height: 1080, poster: CAST + 'castingpool_motion_v8_poster.jpg?r=4', preload: 'auto',
      'aria-label': 'ReelShort Casting Hub: Add to Selection, then a pool of talent cards', autoplay: '', muted: '', loop: '', playsinline: '' },
      [[CAST + 'castingpool_motion_v8.webm?r=4', 'video/webm'], [CAST + 'castingpool_motion_v8.mp4?r=4', 'video/mp4']]);
    hero.replaceWith(v); v.play && v.play().catch(() => {});
  }

  // shared frame only on Home / Product Design / Visual Design (case studies keep their own layout)
  // page margins follow the live site again (no extra preview frame) — only the link flag is kept
  const framePage = false;
  if (!framePage) { if (PREVIEW) keepFlag(); return; }
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
