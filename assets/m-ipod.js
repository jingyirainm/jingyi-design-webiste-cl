/* Mobile home (preview only, /?preview=mosaic): the Design Spark iPod — in its portrait, iPod-nano layout —
   replaces the splash illustration (the folder with notebook, camera, earphones and keychain). */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  if (!document.body.classList.contains('mobile')) return;
  const fig = document.querySelector('.m-splash .ms-fig');
  if (!fig || fig.querySelector('.ms-ipod')) return;
  const st = document.createElement('style');
  st.textContent = `body.mobile .m-splash .ms-fig.has-ipod{flex:0 0 auto;padding:22px 0 0;min-height:0}
  body.mobile .m-splash .ms-fig.has-ipod + h1{margin-top:26px}
  body.mobile .m-splash.has-ipod .ms-copy{margin-top:22px}
  body.mobile .m-splash.ipod-wait .ms-r{animation-play-state:paused}
  .ms-ipod{width:min(100%,360px);margin:0 auto;overflow:visible}
  .ms-ipod iframe{display:block;border:0;background:transparent;color-scheme:normal;
    width:calc(100% * 414 / 380);margin:calc(100% * -20 / 380) 0 calc(100% * -16 / 380) calc(100% * -17 / 380);aspect-ratio:414/655}`;
  document.head.appendChild(st);
  const wrap = document.createElement('div');
  wrap.className = 'ms-ipod';
  wrap.innerHTML = '<iframe src="assets/design-spark-card.html?layout=portrait&v=20261118g" title="Jingyi Zhang — Design Spark. An interactive iPod with my intro, about and contact." loading="eager" allow="autoplay"></iframe>';
  fig.innerHTML = '';
  fig.classList.add('has-ipod');
  fig.appendChild(wrap);
  // order: iPod first, then the big headline, then the small copy and the scroll cue
  const splash = fig.closest('.m-splash'), h1 = splash.querySelector('h1');
  splash.classList.add('has-ipod');
  if (h1) splash.insertBefore(fig, h1);
  fig.style.setProperty('--d', '.15s');
  if (h1) h1.style.setProperty('--d', '.9s');
  splash.querySelectorAll('.ms-copy p').forEach((p, i) => p.style.setProperty('--d', (1.6 + i * .45) + 's'));
  const sc = splash.querySelector('.ms-scroll'); if (sc) sc.style.setProperty('--d', '2.6s');
  const frame = wrap.querySelector('iframe');
  // hold the whole splash sequence until the iPod has rendered, so it really comes first
  splash.classList.add('ipod-wait');
  let started = false;
  const go = () => { if (started) return; started = true; requestAnimationFrame(() => splash.classList.remove('ipod-wait')); };
  frame.addEventListener('load', go);
  setTimeout(go, 2500);
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => {
    try { frame.contentWindow.__idcPaused = !e.isIntersecting; } catch (_) {}
  })).observe(wrap);
})();
