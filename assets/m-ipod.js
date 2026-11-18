/* Mobile home (preview only, /?preview=mosaic): the Design Spark iPod — portrait, iPod-nano layout — replaces the
   splash illustration. Order, timing, spacing, type and copy come from M_SPLASH_CONFIG below: tune them in
   Mobile Home Studio, press 复制配置 and paste the result here (only values that differ from the defaults are needed). */
const M_SPLASH_CONFIG = {};

/* Mobile home splash with the Design Spark iPod — shared by the site (assets/m-ipod.js) and Mobile Studio.
   MSplash.mount(splash, cfg, { src }) builds/updates it; MSplash.replay(splash) restarts the entrance. */
(function (g) {
  var DEFAULTS = {
    order: 'ipod-first',              // ipod-first | text-first
    ipodWidth: 100, ipodMax: 360,     // % of the text column, px cap
    ipodTop: 22,                      // space above the iPod
    gapHead: 26,                      // iPod → headline (or headline → iPod when text-first)
    gapCopy: 22,                      // headline → small copy
    copyGap: 16,                      // between the two small paragraphs
    scrollGap: 14,                    // copy → scroll cue
    ipodAlign: 'center',              // left | center | right (when narrower than the column)
    // headline type
    headFont: 'inter', headSize: 27, headWeight: 300, headLine: 1.28, headTrack: -0.02, headAlign: 'left',
    headColor: '', headOpacity: 1, headItalic: false, headCase: 'none', headWrap: 'balance', headMaxW: 100,
    // small copy type
    copyFont: 'inter', copySize: 14, copyWeight: 300, copyLine: 1.55, copyTrack: 0, copyAlign: 'left',
    copyColor: '', copyOpacity: 1, copyItalic: false, copyCase: 'none', copyWrap: 'wrap', copyMaxW: 100, linkStyle: 'none',
    // scroll cue type
    scrollFont: 'inter', scrollSize: 13, scrollWeight: 300, scrollTrack: 0.02, scrollAlign: 'center',
    scrollColor: '', scrollOpacity: 1, scrollItalic: false, scrollCase: 'none',
    headline: 'Hi, I am Jingyi, a Product Designer who likes usefulness, efficiency and simplicity.',
    copy1: 'I design and prototype AI-powered B2B/B2C SaaS for creative &amp; production workflow.<br>Currently working @ReelShort.',
    copy2: 'I am also a visual designer &amp; art director through my studio practice @ <a href="https://rainmelonstudio.com" target="_blank" rel="noopener"><em>Rainmelon Studio</em></a>.',
    showScroll: true, scrollText: 'Scroll to see my work',
    dur: 1.15, ease: 'cubic-bezier(.22,.8,.2,1)', rise: 22, blur: 8,
    dIpod: 0.15, dHead: 0.9, dCopy1: 1.6, dCopy2: 2.05, dScroll: 2.6,
    waitIpod: true,
    ipodFloat: false, floatAmp: 6, floatDur: 7,
    parallax: 1
  };

  var FONTS = {
    inter: 'Inter,"Diatype Variable",sans-serif',
    serif: '"Arizona Text Variable",Newsreader,Georgia,serif',
    system: '-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text",sans-serif',
    helvetica: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    mono: '"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace'
  };
  // margins that place a narrower block left / centre / right
  function blockAlign(a) { return a === 'center' ? 'margin-left:auto;margin-right:auto' : a === 'right' ? 'margin-left:auto;margin-right:0' : 'margin-left:0;margin-right:0'; }
  function type(c, p) {
    // the size goes through a custom property: the site rescales literal font sizes at runtime
    return '--ms-fs-' + p + ':' + c[p + 'Size'] + 'px;' +
      'font:' + (c[p + 'Italic'] ? 'italic ' : '') + c[p + 'Weight'] + ' var(--ms-fs-' + p + ')/' + (c[p + 'Line'] != null ? c[p + 'Line'] : 1) + ' ' + (FONTS[c[p + 'Font']] || FONTS.inter) + '!important;' +
      'letter-spacing:' + c[p + 'Track'] + 'em;text-align:' + c[p + 'Align'] + ';' +
      'text-transform:' + c[p + 'Case'] + ';color:' + (c[p + 'Color'] || 'inherit') + ';' +
      (c[p + 'Wrap'] ? 'text-wrap:' + c[p + 'Wrap'] + ';' : '');
  }

  function css(c, S) {
    var k = c.parallax;
    return '' +
      S + '{display:flex;flex-direction:column}' +
      S + ' .ms-fig{flex:0 0 auto;margin:0;padding:' + c.ipodTop + 'px 0 0;min-height:0;display:flex;align-items:center;justify-content:center;' +
        'translate:0 calc(var(--ms-p,0)*' + (-60 * k) + 'px);scale:calc(1 - var(--ms-p,0)*' + (.08 * k) + ');opacity:calc(1 - var(--ms-p,0)*' + (1.1 * k) + ')}' +
      S + ' .ms-fig{justify-content:' + (c.ipodAlign === 'left' ? 'flex-start' : c.ipodAlign === 'right' ? 'flex-end' : 'center') + '}' +
      S + ' .ms-ipod{width:min(' + c.ipodWidth + '%,' + c.ipodMax + 'px);margin:0;overflow:visible' +
        (c.ipodFloat ? ';animation:ms-ipod-float ' + c.floatDur + 's ease-in-out 1.6s infinite alternate' : '') + '}' +
      S + ' .ms-ipod iframe{display:block;border:0;background:transparent;color-scheme:normal;width:calc(100% * 414 / 380);' +
        'margin:calc(100% * -20 / 380) 0 calc(100% * -16 / 380) calc(100% * -17 / 380);aspect-ratio:414/655}' +
      S + ' h1{' + type(c, 'head') + 'max-width:' + c.headMaxW + '%;' + blockAlign(c.headAlign) + ';' +
        'margin-top:' + (c.order === 'ipod-first' ? c.gapHead : 28) + 'px;margin-bottom:0;' +
        'translate:0 calc(var(--ms-p,0)*' + (-26 * k) + 'px);opacity:calc((1 - var(--ms-p,0)*' + (1.2 * k) + ') * ' + c.headOpacity + ')}' +
      (c.order === 'text-first' ? S + ' h1 + .ms-fig{padding-top:' + c.gapHead + 'px}' : '') +
      S + ' .ms-copy{margin-top:' + c.gapCopy + 'px;translate:0 calc(var(--ms-p,0)*' + (-34 * k) + 'px)}' +
      S + ' .ms-copy p{' + type(c, 'copy') + 'max-width:' + c.copyMaxW + '%;' + blockAlign(c.copyAlign) + ';margin-top:0;margin-bottom:' + c.copyGap + 'px;opacity:calc((1 - var(--ms-p,0)*' + (1.2 * k) + ') * ' + c.copyOpacity + ')}' +
      S + ' .ms-copy p:last-child{margin-bottom:0}' +
      S + ' .ms-copy a{color:inherit;text-underline-offset:3px;text-decoration:' + (c.linkStyle === 'underline' ? 'underline;text-decoration-thickness:1px' : 'none') + '}' +
      S + ' .ms-scroll{display:' + (c.showScroll ? 'flex' : 'none') + ';margin-top:' + (c.scrollGap + 16) + 'px;' + type(c, 'scroll') +
        'align-self:' + (c.scrollAlign === 'left' ? 'flex-start' : c.scrollAlign === 'right' ? 'flex-end' : 'center') + ';align-items:' + (c.scrollAlign === 'left' ? 'flex-start' : c.scrollAlign === 'right' ? 'flex-end' : 'center') + ';' +
        'padding-left:' + (c.scrollAlign === 'left' ? 0 : 12) + 'px;padding-right:' + (c.scrollAlign === 'right' ? 0 : 12) + 'px;' +
        'opacity:calc((1 - var(--ms-p,0)*1.6) * ' + c.scrollOpacity + ')}' +
      S + '.ms-play .ms-r{animation:ms-in-k ' + c.dur + 's ' + c.ease + ' var(--d,0s) backwards}' +
      S + ':not(.ms-play) .ms-r{opacity:0}' +
      S + '.ipod-wait .ms-r{animation-play-state:paused}' +
      '@keyframes ms-in-k{from{opacity:0;transform:translateY(' + c.rise + 'px);filter:blur(' + c.blur + 'px)}to{opacity:1;transform:none;filter:blur(0)}}' +
      '@keyframes ms-ipod-float{0%{transform:translateY(' + (c.floatAmp * .5) + 'px)}100%{transform:translateY(' + (-c.floatAmp) + 'px)}}' +
      '@media(prefers-reduced-motion:reduce){' + S + ' .ms-r,' + S + ' .ms-ipod{animation:none!important;opacity:1}}';
  }

  function mount(splash, cfg, opts) {
    var c = Object.assign({}, DEFAULTS, cfg || {});
    opts = opts || {};
    var fig = splash.querySelector('.ms-fig'), h1 = splash.querySelector('h1');
    var copy = splash.querySelector('.ms-copy'), ps = copy ? copy.querySelectorAll('p') : [];
    var sc = splash.querySelector('.ms-scroll');
    if (!fig) return null;
    // iPod
    var wrap = fig.querySelector('.ms-ipod');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'ms-ipod';
      wrap.innerHTML = '<iframe src="' + opts.src + '" title="Jingyi Zhang — Design Spark. An interactive iPod with my intro, about and contact." loading="eager" allow="autoplay"></iframe>';
      fig.innerHTML = '';
      fig.appendChild(wrap);
      fig.classList.add('has-ipod');
    }
    splash.classList.add('has-ipod');
    // content
    if (h1 && h1.innerHTML !== c.headline) h1.innerHTML = c.headline;
    if (ps[0] && ps[0].innerHTML !== c.copy1) ps[0].innerHTML = c.copy1;
    if (ps[1] && ps[1].innerHTML !== c.copy2) ps[1].innerHTML = c.copy2;
    if (sc) { var tn = sc.firstChild; if (tn && tn.nodeType === 3) tn.textContent = c.scrollText; }
    // order
    if (h1) {
      if (c.order === 'ipod-first' && fig.nextElementSibling !== h1) splash.insertBefore(fig, h1);
      if (c.order === 'text-first' && h1.nextElementSibling !== fig) splash.insertBefore(h1, fig);
    }
    // timing
    fig.classList.add('ms-r');
    fig.style.setProperty('--d', c.dIpod + 's');
    if (h1) h1.style.setProperty('--d', c.dHead + 's');
    if (ps[0]) ps[0].style.setProperty('--d', c.dCopy1 + 's');
    if (ps[1]) ps[1].style.setProperty('--d', c.dCopy2 + 's');
    if (sc) sc.style.setProperty('--d', c.dScroll + 's');
    // styles
    var id = 'ms-ipod-style' + (opts.styleKey || '');
    var st = document.getElementById(id);
    if (!st) { st = document.createElement('style'); st.id = id; document.head.appendChild(st); }
    st.textContent = css(c, opts.scope || 'body.mobile .m-splash.has-ipod');
    // start: wait for the iPod to render so it always leads
    if (!splash._msStarted) {
      splash._msStarted = true;
      var frame = wrap.querySelector('iframe');
      var go = function () { if (splash._msGo) return; splash._msGo = true; requestAnimationFrame(function () { splash.classList.remove('ipod-wait'); }); };
      splash.classList.add('ms-play');
      if (c.waitIpod) {
        splash.classList.add('ipod-wait');
        frame.addEventListener('load', go);
        setTimeout(go, 2500);
      }
    }
    return wrap;
  }

  function replay(splash) {
    splash.classList.remove('ms-play');
    void splash.offsetWidth;
    splash.classList.add('ms-play');
  }

  g.MSplash = { DEFAULTS: DEFAULTS, FONTS: FONTS, css: css, mount: mount, replay: replay };
})(window);

(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  if (!document.body.classList.contains('mobile')) return;
  const splash = document.querySelector('.m-splash');
  if (!splash || !window.MSplash) return;
  const wrap = MSplash.mount(splash, M_SPLASH_CONFIG, { src: 'assets/design-spark-card.html?layout=portrait&v=20261118g' });
  const frame = wrap && wrap.querySelector('iframe');
  if (frame && 'IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => {
    try { frame.contentWindow.__idcPaused = !e.isIntersecting; } catch (_) {}
  })).observe(wrap);
})();
