/* Mobile home (preview only, /?preview=mosaic): the Design Spark iPod — in its portrait, iPod-nano layout —
   replaces the splash illustration (the folder with notebook, camera, earphones and keychain). */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  if (!document.body.classList.contains('mobile')) return;
  const fig = document.querySelector('.m-splash .ms-fig');
  if (!fig || fig.querySelector('.ms-ipod')) return;
  const st = document.createElement('style');
  st.textContent = `body.mobile .m-splash .ms-fig.has-ipod{padding:14px 0 6px}
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
  const frame = wrap.querySelector('iframe');
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => {
    try { frame.contentWindow.__idcPaused = !e.isIntersecting; } catch (_) {}
  })).observe(wrap);
})();
