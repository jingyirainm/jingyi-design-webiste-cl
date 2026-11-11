/* Preview only (/?preview=mosaic): one shared frame for Home, Product Design and Visual Design.
   Content sits right of the sidebar, centred, with the same outer margin on both sides.
   Internal links keep ?preview=mosaic and load as full pages so the preview survives navigation. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const B = document.body;
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

  // keep the preview flag across pages (full load, bypassing the in-place page swap)
  // window capture runs before clean-routing.js / dissolve.js, which also intercept clicks on document
  window.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]'); if (!a || a.target === '_blank') return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
    u.searchParams.set('preview', 'mosaic');
    e.preventDefault(); e.stopImmediatePropagation();
    location.href = u.href;
  }, true);
})();
