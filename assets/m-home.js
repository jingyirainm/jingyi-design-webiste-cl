/* Mobile home v2 (live on phones since 2026-11-19) — from Frame 39, refined.
   Page 1: the Design Spark iPod. Page 2: a full-bleed gradient panel with the intro, the spark flower and the copy.
   Refinements over the frame: symmetric 32px margins, an 8pt spacing rhythm, body copy at 14/21 (1.5) instead of 14/16.6,
   a slightly deeper gradient so white copy reaches ~4.5:1 contrast, the flower centred, lines that wrap to any phone width.
   Motion: the iPod rises in; on scroll the panel slides up over it like a card (its corners straighten, the iPod sinks back);
   text reveals line by line through masks, the flower draws itself, the underline draws in, the header turns light over the panel. */
(function () {
  if (!document.body.classList.contains('mobile')) return;
  const old = document.querySelector('.m-splash');
  if (!old) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const FLOWER = '<path class="mh-st" d="M110.131 853.652C108.014 857.468 113.66 867.641 127.068 882.266C141.183 897.527 163.766 916.603 182.114 927.413" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M110.578 853.652C118.369 856.196 136.785 873.369 153.077 889.905C167.243 903.897 181.409 915.346 190.617 925.522" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M146.64 889.902C160.81 891.175 178.523 898.173 189.151 913.44C192.693 918.53 193.402 922.347 191.985 924.891" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M148.105 892.424C160.178 897.525 171.54 907.089 180.062 920.478" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M193.256 920.472C203.16 907.146 221.555 891.916 239.949 888.109C244.901 887.474 246.316 890.013 244.194 893.82C237.827 905.877 220.847 919.203 207.405 923.645C201.038 925.866 196.086 926.184 193.256 925.549" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M201.758 933.402C210.943 946.106 227.193 965.797 242.029 983.583C244.856 986.124 244.856 984.218 244.856 981.677" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M209.674 933.402C224.45 940.385 239.227 958.158 244.856 979.739" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M179.29 925.521C163.754 927.431 139.745 936.343 128.446 945.89C125.621 949.073 126.328 950.983 129.858 949.71C146.1 945.254 166.579 936.979 182.114 931.887" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M184.931 934.662C175.691 939.727 169.294 951.757 167.162 961.254C167.162 963.154 169.294 962.521 171.427 960.621C179.955 954.29 187.063 946.059 190.617 938.461" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M199.705 927.625C211.725 921.82 225.866 919.885 233.643 921.175C236.471 922.465 232.936 925.045 223.745 926.98C214.553 928.916 206.068 930.851 200.412 932.141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M188.289 924.917C190.478 919.981 199.236 919.981 200.331 925.904C201.426 931.827 192.668 934.789 188.289 930.84C185.004 927.385 189.383 922.943 194.857 923.93C199.236 924.917 198.141 929.853 193.762 929.853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M200.331 922.943C206.9 918.994 213.468 918.007 220.037 919.981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M198.142 932.814C203.615 936.763 209.089 941.699 211.279 947.622" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M190.478 932.814C187.194 938.738 186.099 944.661 188.289 951.571" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M187.194 925.904C181.72 923.93 177.341 924.917 172.962 927.879" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M192.668 919.981C191.573 915.045 193.762 911.096 197.047 908.135" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M182.815 932.814C179.531 937.75 178.436 942.686 179.531 946.635" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-st" d="M195.952 934.789C197.047 941.699 197.047 948.61 199.236 955.52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path class="mh-fl" d="M217.338 922.587C218.366 922.587 219.199 921.836 219.199 920.909C219.199 919.982 218.366 919.23 217.338 919.23C216.31 919.23 215.477 919.982 215.477 920.909C215.477 921.836 216.31 922.587 217.338 922.587Z" fill="currentColor"/><path class="mh-fl" d="M208.58 951.116C209.547 951.116 210.331 950.409 210.331 949.537C210.331 948.664 209.547 947.957 208.58 947.957C207.612 947.957 206.828 948.664 206.828 949.537C206.828 950.409 207.612 951.116 208.58 951.116Z" fill="currentColor"/><path class="mh-fl" d="M185.043 954.967C185.949 954.967 186.685 954.304 186.685 953.487C186.685 952.669 185.949 952.006 185.043 952.006C184.136 952.006 183.4 952.669 183.4 953.487C183.4 954.304 184.136 954.967 185.043 954.967Z" fill="currentColor"/><path class="mh-fl" d="M169.168 930.682C170.015 930.682 170.701 930.063 170.701 929.3C170.701 928.537 170.015 927.918 169.168 927.918C168.322 927.918 167.636 928.537 167.636 929.3C167.636 930.063 168.322 930.682 169.168 930.682Z" fill="currentColor"/><path class="mh-fl" d="M194.348 909.457C195.195 909.457 195.881 908.839 195.881 908.075C195.881 907.312 195.195 906.693 194.348 906.693C193.502 906.693 192.815 907.312 192.815 908.075C192.815 908.839 193.502 909.457 194.348 909.457Z" fill="currentColor"/><path class="mh-fl" d="M196.538 958.817C197.384 958.817 198.07 958.198 198.07 957.435C198.07 956.672 197.384 956.053 196.538 956.053C195.691 956.053 195.005 956.672 195.005 957.435C195.005 958.198 195.691 958.817 196.538 958.817Z" fill="currentColor"/>';
  const css = `
  .mh{--e:cubic-bezier(.16,1,.3,1);position:relative;margin:0 -16px 40px;font-family:Inter,"Diatype Variable",sans-serif;color:#111}
  .mh *{box-sizing:border-box}
  /* ---- page 1 · iPod ---- */
  .mh-p1{position:sticky;top:0;height:563px;display:flex;justify-content:center;align-items:flex-start;padding-top:4px;z-index:0}
  .mh-ipod{position:relative;width:303px;transform-origin:50% 35%;will-change:transform,opacity,filter;
    transform:translateY(calc(var(--k,0) * -28px)) scale(calc(1 - var(--k,0) * .09));opacity:calc(1 - var(--k,0) * .6);filter:blur(calc(var(--k,0) * 4px))}
  .mh .mh-ipod iframe{display:block;border:0;background:transparent;color-scheme:normal;max-width:none!important;width:calc(100% * 414 / 380);
    margin:calc(100% * -20 / 380) 0 calc(100% * -25 / 380) calc(100% * -17 / 380);aspect-ratio:414/655}
  .mh-floor{position:absolute;left:14%;right:14%;bottom:-16px;height:24px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.14),rgba(0,0,0,0));filter:blur(4px);pointer-events:none}
  .mh.go .mh-ipod-in{animation:mh-rise 1.5s var(--e) .05s backwards}
  .mh.go .mh-floor{animation:mh-floor 1.6s var(--e) .2s backwards}
  .mh:not(.go) .mh-ipod-in,.mh:not(.go) .mh-floor{opacity:0}
  @keyframes mh-rise{from{opacity:0;transform:translateY(36px) scale(.94);filter:blur(14px)}to{opacity:1;transform:none;filter:blur(0)}}
  @keyframes mh-floor{from{opacity:0;transform:scaleX(.55)}to{opacity:1;transform:none}}
  /* ---- page 2 · intro panel ---- */
  .mh-p2{position:sticky;top:var(--p2top,48px);z-index:1;min-height:max(611px,calc(100svh - 48px));display:flex;flex-direction:column;padding:96px 32px 92px;color:#fff;overflow:hidden;isolation:isolate;
    border-radius:calc((1 - var(--k,0)) * 28px) calc((1 - var(--k,0)) * 28px) 0 0;
    transform-origin:50% 0;transform:translateY(calc(var(--k2,0) * -18px)) scale(calc(1 - var(--k2,0) * .07));filter:brightness(calc(1 - var(--k2,0) * .32)) blur(calc(var(--k2,0) * 2.5px))}
  .mh-p2::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 0 transparent}
  /* the panel's ground: fades in slowly (and settles from a soft zoom) when the panel arrives */
  .mh-bg{position:absolute;inset:0;z-index:-1;pointer-events:none;border-radius:inherit;overflow:hidden;
    background:linear-gradient(180deg,#4F5057 0%,#727D93 17.3%,#8FA5A7 37%,#9C9FA8 57.7%,#6E7284 83.2%,#8D8E9E 100%)}
  .mh-bg::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.2)}
  .mh-p2:not(.in) .mh-bg{opacity:.16;transform:scale(1.06);filter:blur(10px)}
  .mh-p2.in .mh-bg{transition:opacity 2.6s cubic-bezier(.33,0,.2,1),transform 3.2s var(--e),filter 2.6s var(--e)}
  .mh-p2:not(.in) .mh-sheen{opacity:0}
  .mh-p2.in .mh-sheen{transition:opacity 4s ease 1.2s}
  .mh-sheen{position:absolute;inset:-25%;pointer-events:none;opacity:.6;mix-blend-mode:soft-light;
    background:radial-gradient(38% 28% at 28% 30%,rgba(255,255,255,.6),transparent 70%),radial-gradient(34% 26% at 76% 68%,rgba(255,255,255,.4),transparent 70%);
    animation:mh-drift 20s ease-in-out infinite alternate}
  @keyframes mh-drift{0%{transform:translate3d(-5%,-3%,0) rotate(0)}100%{transform:translate3d(5%,5%,0) rotate(7deg)}}
  .mh-grain{position:absolute;inset:0;pointer-events:none;opacity:.08;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
  .mh-p2>*:not(.mh-sheen):not(.mh-grain):not(.mh-bg){position:relative}
  .mh-sheen,.mh-grain{z-index:-1}
  .mh .mh-p2 .mh-hi,.mh .mh-p2 .mh-h{font:250 var(--hs,24px)/var(--hl,30px) Inter,"Diatype Variable",sans-serif!important;letter-spacing:-.005em;margin:0;color:#fff;text-wrap:balance}
  .mh .mh-p2 .mh-h{margin-top:28px;max-width:330px}
  .mh-flower{align-self:center;margin:32px 0 0;width:136px;height:132px;color:#EDEDED;cursor:pointer;-webkit-tap-highlight-color:transparent;translate:0 calc(var(--q,0) * -16px)}
  .mh-flower svg{display:block;width:100%;height:100%;overflow:visible}
  .mh-flower .mh-bloom,.mh-flower .mh-sway{transform-box:fill-box;transform-origin:50% 55%}
  .mh-flower .mh-sway{animation:mh-sway 6.5s ease-in-out infinite}
  @keyframes mh-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg) scale(1.02)}}
  .mh-copy{margin-top:40px;max-width:340px}
  .mh .mh-copy p{font:300 var(--cs,14px)/var(--cl,21px) Inter,"Diatype Variable",sans-serif!important;letter-spacing:0;margin:0 0 16px;color:rgba(255,255,255,.96);text-wrap:pretty}
  .mh .mh-copy p:last-child{margin-bottom:0}
  .mh-copy a{color:#fff;text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 calc(100% - 1px)/var(--u,100%) 1px no-repeat}
  .mh-scroll{margin:auto auto 0;padding:32px 12px 22px;min-height:44px;display:flex;align-items:center;gap:6px;border:0;background:none;color:#fff;--fs:13px;font:300 var(--fs)/1 Inter,"Diatype Variable",sans-serif!important;letter-spacing:.01em;cursor:pointer}
  .mh-scroll svg{animation:mh-bob 2.2s ease-in-out infinite}
  @keyframes mh-bob{0%,100%{transform:translateY(0);opacity:.6}50%{transform:translateY(4px);opacity:1}}
  /* ---- reveal: lines slide up through masks ---- */
  .mh-line{display:block}
  .mh-line>span{display:inline-block;will-change:transform,opacity,filter}
  .mh-p2:not(.in) .mh-line>span{transform:translateY(16px);opacity:0;filter:blur(10px)}
  .mh-p2.in .mh-line>span{transition:transform 2.2s var(--e),opacity 2s cubic-bezier(.33,0,.2,1),filter 2.2s var(--e);transition-delay:var(--d,0s)}
  .mh-p2:not(.in) .mh-copy a{--u:0%}
  .mh-p2.in .mh-copy a{transition:background-size 1.4s var(--e) var(--du,3s)}
  .mh-p2:not(.in) .mh-scroll{opacity:0;transform:translateY(10px)}
  .mh-p2.in .mh-scroll{transition:opacity 1.6s ease 3.4s,transform 1.8s var(--e) 3.4s}
  .mh-st{stroke-dasharray:1 1}
  .mh-p2:not(.in) .mh-st{stroke-dashoffset:1}
  .mh-p2:not(.in) .mh-fl{opacity:0}
  .mh-p2.in .mh-st{transition:stroke-dashoffset 2.2s cubic-bezier(.55,.1,.25,1) var(--d,0s)}
  .mh-p2.in .mh-fl{transition:opacity 1s ease var(--d,0s)}
  .mh-p2:not(.in) .mh-bloom{transform:scale(.84) rotate(-12deg)}
  .mh-p2.in .mh-bloom{transition:transform 3s var(--e) 1.2s}
  /* ---- header turns light over the panel ---- */
  body.mobile .pin-mtop bodycopy{transition:filter .45s ease}
  body.mobile.mh-dark-head .pin-mtop bodycopy{filter:invert(1) hue-rotate(180deg)}
  body.mobile.mh-dark-head .pin-mtop bodycopy img,body.mobile.mh-dark-head .pin-mtop bodycopy video{filter:invert(1) hue-rotate(180deg)}
  html body.mobile.mh-dark-head .pin-mtop{background:rgba(64,66,74,.42)!important;-webkit-backdrop-filter:blur(18px) saturate(1.3)!important;backdrop-filter:blur(18px) saturate(1.3)!important;border-color:transparent!important}
  body.mobile .pin-mtop,body.mobile .pin-mtop .page-content{transition:background-color .45s ease}
  html body.mobile.mh-dark-head .pin-mtop .page-content{background-color:transparent!important}
  @media (prefers-reduced-motion:reduce){.mh *{animation:none!important;transition:none!important}.mh-p2 .mh-line>span{transform:none!important;opacity:1!important;filter:none!important}.mh-st{stroke-dashoffset:0!important}.mh-fl,.mh-ipod-in,.mh-floor{opacity:1!important}.mh-bloom{transform:none!important}}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const sec = document.createElement('section');
  sec.className = 'mh';
  sec.setAttribute('aria-label', 'Introduction');
  sec.innerHTML =
    '<div class="mh-p1"><div class="mh-ipod"><div class="mh-ipod-in">' +
      '<iframe src="assets/design-spark-card.html?layout=portrait&v=20261118g" title="Jingyi Zhang — Design Spark. An interactive iPod with my intro, about and contact." loading="eager" allow="autoplay"></iframe>' +
      '</div><div class="mh-floor"></div></div></div>' +
    '<div class="mh-p2"><div class="mh-bg"></div><div class="mh-sheen"></div><div class="mh-grain"></div>' +
      '<h1 class="mh-hi" data-split data-d0=".7" data-step=".2">Hi, I am Jingyi</h1>' +
      '<p class="mh-h" data-split data-d0="1.05" data-step=".2">A Product Designer who believes in usefulness, efficiency and simplicity.</p>' +
      '<div class="mh-flower" role="img" aria-label="Spark flower — tap to redraw"><svg viewBox="108.75 852.75 137 133" fill="none"><g class="mh-bloom"><g class="mh-sway">' + FLOWER + '</g></g></svg></div>' +
      '<div class="mh-copy">' +
        '<p data-split data-d0="2.0" data-step=".14">I design and prototype AI-powered B2B/B2C SaaS for creative &amp; production workflow.<br>Currently working @ReelShort.</p>' +
        '<p data-split data-d0="2.5" data-step=".14">I am also a visual designer &amp; art director through my studio practice @<a href="https://rainmelonstudio.com/" target="_blank" rel="noopener">Rainmelon Studio</a>.</p>' +
      '</div>' +
      '<button type="button" class="mh-scroll">Scroll to view more work<svg width="11" height="13" viewBox="0 0 11 13" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 1v11M1.3 7.8 5.5 12l4.2-4.2"/></svg></button>' +
    '</div>';
  old.replaceWith(sec);

  /* split text into measured lines (keeps <a> and <br>) so each line can slide up through its own mask */
  const srcHTML = new Map();
  function split(el) {
    if (!srcHTML.has(el)) srcHTML.set(el, el.innerHTML);
    el.innerHTML = srcHTML.get(el);
    const units = [];
    Array.from(el.childNodes).forEach(n => {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(w => { if (w) units.push(w.trim() ? { html: w.replace(/&/g, '&amp;').replace(/</g, '&lt;') } : { space: true }); });
      else if (n.nodeName === 'BR') units.push({ br: true });
      else units.push({ html: n.outerHTML });
    });
    el.innerHTML = units.map((u, i) => u.br ? '<br>' : u.space ? ' ' : '<span class="mh-w" data-i="' + i + '">' + u.html + '</span>').join('');
    const lines = []; let cur = null, lastTop = null;
    Array.from(el.childNodes).forEach(n => {
      if (n.nodeName === 'BR') { cur = null; lastTop = null; return; }
      if (n.nodeType === 3) { if (cur) cur.push(' '); return; }
      const t = n.offsetTop;
      if (cur === null || Math.abs(t - lastTop) > 2) { cur = []; lines.push(cur); lastTop = t; }
      cur.push(n.innerHTML);
    });
    const d0 = parseFloat(el.dataset.d0 || 0), step = parseFloat(el.dataset.step || .09);
    el.innerHTML = lines.map((l, i) => '<span class="mh-line"><span style="--d:' + (d0 + i * step).toFixed(2) + 's">' + l.join('').trim() + '</span></span>').join('');
    const a = el.querySelector('a'); if (a) a.closest('.mh-line > span') && a.style.setProperty('--du', (d0 + lines.length * step + .35).toFixed(2) + 's');
  }
  const splitAll = () => sec.querySelectorAll('[data-split]').forEach(split);
  splitAll();
  let rw = innerWidth;
  addEventListener('resize', () => { if (Math.abs(innerWidth - rw) > 1) { rw = innerWidth; splitAll(); } });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(splitAll);

  // flower: staggered strokes, pollen dots last
  const strokes = sec.querySelectorAll('.mh-st'), dots = sec.querySelectorAll('.mh-fl');
  strokes.forEach((p, i) => { p.setAttribute('pathLength', '1'); p.style.setProperty('--d', (1.5 + i * 0.07).toFixed(2) + 's'); });
  dots.forEach((p, i) => p.style.setProperty('--d', (3.1 + i * 0.06).toFixed(2) + 's'));

  const p2 = sec.querySelector('.mh-p2'), frame = sec.querySelector('iframe');

  // page 1 entrance waits for the iPod to render
  let started = false;
  const go = () => { if (started) return; started = true; requestAnimationFrame(() => sec.classList.add('go')); };
  frame.addEventListener('load', go); setTimeout(go, 2200);

  // page 2 reveals when it comes into view
  // (if the panel already peeks in on load, it waits until the iPod has risen, so the order stays iPod → text)
  const t0 = performance.now();
  const reveal = () => { const wait = Math.max(0, (started ? 1100 : 1800) - (performance.now() - t0)); setTimeout(() => p2.classList.add('in'), wait); };
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { reveal(); io.disconnect(); } }), { threshold: 0, rootMargin: '0px 0px -52% 0px' });
    io.observe(p2);
  } else p2.classList.add('in');

  // scroll-linked depth: the panel covers the iPod (k), flower parallax (q), header colour
  const head = document.querySelector('.pin-mtop');
  let p2Top0 = p2.getBoundingClientRect().top + scrollY, tick = false;
  const upd = () => {
    tick = false;
    const vh = innerHeight, r = p2.getBoundingClientRect(), hh = head ? head.getBoundingClientRect().height : 48;
    const k = Math.min(1, Math.max(0, scrollY / Math.max(1, p2Top0 - hh)));
    sec.style.setProperty('--k', k.toFixed(3));
    const q = Math.min(1, Math.max(-1, (r.top - hh) / vh));
    sec.style.setProperty('--q', (-q).toFixed(3));
    const mw = sec.querySelector('.mw'), mt = mw ? mw.getBoundingClientRect().top : Infinity;
    const k2 = mw ? Math.min(1, Math.max(0, 1 - (mt - hh) / Math.max(1, vh - hh))) : 0;
    sec.style.setProperty('--k2', k2.toFixed(3));
    sec.style.setProperty('--p2top', Math.min(hh, vh - p2.offsetHeight) + 'px');
    document.body.classList.toggle('mh-dark-head', r.top <= hh * .5 && r.bottom > hh && mt > hh * .5);
    try { frame.contentWindow.__idcPaused = k > .98; } catch (_) {}
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', () => { p2Top0 = p2.getBoundingClientRect().top + scrollY; upd(); });
  upd();

  // flower: tap to redraw
  sec.querySelector('.mh-flower').addEventListener('click', () => {
    if (reduce) return;
    strokes.forEach((p, i) => p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1200, delay: i * 40, easing: 'cubic-bezier(.55,.1,.25,1)', fill: 'backwards' }));
    dots.forEach((p, i) => p.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: 900 + i * 50, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }));
    sec.querySelector('.mh-bloom').animate([{ transform: 'rotate(0) scale(1)' }, { transform: 'rotate(-14deg) scale(.9)', offset: .25 }, { transform: 'rotate(0) scale(1)' }], { duration: 1800, easing: 'cubic-bezier(.16,1,.3,1)' });
  });

  // scroll cue → the work below
  sec.querySelector('.mh-scroll').addEventListener('click', () => {
    const mw = sec.querySelector('.mw');
    const y = (mw ? mw.getBoundingClientRect().top : p2.getBoundingClientRect().bottom) + scrollY - (head ? head.getBoundingClientRect().height : 48);
    scrollTo({ top: y, behavior: 'smooth' });
  });

  /* ---------- Projects: the home mosaic's eight, one per row, as Ramp-style cards ---------- */
  (function projects() {
    const gal = document.querySelector('main .desk-only gallery-columnized.hm');
    const items = gal ? [...gal.querySelectorAll(':scope > media-item:not(.hm-off)')] : [];
    if (items.length < 8) return;
    items.sort((a, b) => {
      const k = mi => { const r = parseInt(mi.style.getPropertyValue('--hm-r')) || 0, c = parseInt(mi.style.getPropertyValue('--hm-c')) || 0; return r * 100 + c; };
      return k(a) - k(b);
    });
    const cssP = `
    .mw{position:relative;z-index:2;margin:-28px 0 0;padding:28px 16px 32px;display:flex;flex-direction:column;gap:20px;font-family:Inter,"Diatype Variable",sans-serif;
      background:#fff;border-radius:28px 28px 0 0;
      box-shadow:0 -22px 44px -26px rgba(0,0,0,.4)}
    html[data-theme=dark] .mw{background:#111}
    .mw-card{display:block;color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}
    .mw-frame{position:relative;border-radius:24px;overflow:hidden;background:#F2F2F0;transform:translateZ(0);transition:transform .5s cubic-bezier(.16,1,.3,1)}
    .mw-frame::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(0,0,0,.06);pointer-events:none}
    .mw-card:active .mw-frame{transform:scale(.985)}
    .mw-media{position:relative}
    .mw-media img,.mw-media video{display:block;width:100%;height:auto}
    .mw-media.board{aspect-ratio:16/10;background:#f3f3f3}
    .mw-media.board iframe{position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none}
    .mw-cap{display:flex;align-items:baseline;gap:10px;padding:12px 6px 0}
    .mw-no{--fs:11px;font:400 var(--fs)/1 "JetBrains Mono",ui-monospace,Menlo,monospace;letter-spacing:.04em;opacity:.45}
    .mw-t{--fs:15px;font:400 var(--fs)/1.25 Inter,"Diatype Variable",sans-serif!important;letter-spacing:-.005em}
    .mw-m{--fs:12px;margin-left:auto;font:300 var(--fs)/1.25 Inter,"Diatype Variable",sans-serif!important;opacity:.55;text-align:right}
    /* rise in as each card enters */
    .mw-card{opacity:0;transform:translateY(40px);filter:blur(6px);transition:opacity 1.1s cubic-bezier(.33,0,.2,1),transform 1.3s cubic-bezier(.16,1,.3,1),filter 1.1s cubic-bezier(.16,1,.3,1)}
    .mw-card .mw-media{transform:scale(1.06);transition:transform 1.8s cubic-bezier(.16,1,.3,1)}
    .mw-card.on{opacity:1;transform:none;filter:none}
    .mw-card.on .mw-media{transform:none}
    html[data-theme=dark] .mw-frame{background:#1a1a1a}
    html[data-theme=dark] .mw-frame::after{box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
    body.mobile .mob-only .ic-gal.mw-hidden{display:none!important}
    @media (prefers-reduced-motion:reduce){.mw-card,.mw-card .mw-media{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}}`;
    const stP = document.createElement('style'); stP.textContent = cssP; document.head.appendChild(stP);

    const list = document.createElement('section');
    list.className = 'mw'; list.setAttribute('aria-label', 'Selected work');
    items.forEach((mi, i) => {
      const a = mi.querySelector('a.ic-link'), cap = mi.querySelector('.ic-cap');
      const t = cap && cap.querySelector('b') ? cap.querySelector('b').textContent : '', m = cap && cap.querySelector('i') ? cap.querySelector('i').textContent : '';
      const src = mi.querySelector('.mi-frame > video, .mi-frame > img, .mi-frame .hm-embed img, .mi-frame .hm-embed iframe');
      const card = document.createElement('a');
      card.className = 'mw-card'; card.href = a ? a.getAttribute('href') : '#';
      card.setAttribute('aria-label', t + (m ? ', ' + m : ''));
      const frame = document.createElement('div'); frame.className = 'mw-frame';
      const media = document.createElement('div'); media.className = 'mw-media';
      if (src && src.tagName === 'IFRAME' && !matchMedia('(hover: none), (pointer: coarse)').matches) {
        media.classList.add('board');
        media.innerHTML = '<iframe src="' + src.getAttribute('src') + '" title="' + t + '" loading="lazy" tabindex="-1"></iframe>';
      } else if (src) {
        const c = src.cloneNode(true);
        c.removeAttribute('style'); c.removeAttribute('class');
        if (c.tagName === 'VIDEO') { c.muted = true; c.setAttribute('muted', ''); c.setAttribute('playsinline', ''); c.removeAttribute('autoplay'); c.preload = 'metadata'; }
        else c.loading = 'lazy';
        media.appendChild(c);
      }
      frame.appendChild(media); card.appendChild(frame);
      card.insertAdjacentHTML('beforeend', '<div class="mw-cap"><span class="mw-no">' + String(i + 1).padStart(2, '0') + '</span><span class="mw-t">' + t + '</span><span class="mw-m">' + m + '</span></div>');
      list.appendChild(card);
    });
    sec.appendChild(list);
    sec.style.marginBottom = '0';
    const oldGal = document.querySelector('.mob-only .ic-gal'); if (oldGal) oldGal.classList.add('mw-hidden');

    // media height cap follows the frame, so tall phones' videos stay inside the card

    // reveal + play only while on screen
    const vis = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target.querySelector('video');
      if (e.isIntersecting) { e.target.classList.add('on'); if (v) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } }
      else if (v) v.pause();
    }), { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    list.querySelectorAll('.mw-card').forEach(c => vis.observe(c));
    if (reduce) list.querySelectorAll('.mw-card').forEach(c => c.classList.add('on'));
  })();

  /* ---------- Let's connect: a full-screen gradient page closing the site (Group 35 system) ---------- */
  (function connect() {
    const ARW = '<svg class="mc-arw" viewBox="70.5 132.5 5 5" aria-hidden="true"><path d="M71.4598 133H73.7106C74.3215 133 74.6238 133 74.8103 133.186C74.9968 133.373 75 133.678 75 134.283V136.54M71 137L74.5595 133.441" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const cssC = `
    .mc{position:relative;z-index:3;overflow:hidden;isolation:isolate;box-sizing:border-box;
      min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center;
      background:linear-gradient(180deg,#5D5D63 0%,#8993A7 17.31%,#AEC3C4 37.02%,#D8D8D8 57.69%,#8C90A0 83.17%,#BDBDC9 100%);
      padding:88px 22px calc(56px + env(safe-area-inset-bottom));color:#fff;font-family:"Diatype Variable",Inter,sans-serif}
    .mc::before{content:"";position:absolute;inset:0;z-index:-1;background:rgba(0,0,0,.5)}
    .mh .mc h2.mc-t{--fs:44px;margin:0;font:400 var(--fs)/1.05 "Diatype Variable",Inter,sans-serif!important;letter-spacing:-.03em;color:#fff}
    .mh .mc p.mc-copy{--fs:18px;margin:20px 0 0;font:300 var(--fs)/1.55 "Diatype Variable",Inter,sans-serif!important;letter-spacing:-.005em;color:rgba(255,255,255,.92);max-width:32ch}
    .mc-btns{display:flex;flex-wrap:wrap;align-items:center;gap:10px 8px;margin-top:40px}
    .mh .mc a.mc-btn{--fs:14.5px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;
      height:48px;padding:0 15px;border-radius:999px;font:400 var(--fs)/1 "Diatype Variable",Inter,sans-serif!important;letter-spacing:-.005em;text-decoration:none;white-space:nowrap;
      transition:transform .35s cubic-bezier(.16,1,.3,1),opacity .3s ease;-webkit-tap-highlight-color:transparent}
    .mh .mc a.mc-btn:active{transform:scale(.96)}
    .mh .mc a.mc-email{background:#000;color:#fff}
    .mh .mc a.mc-li{background:#fff;color:#564848;border:.5px solid #747474}
    .mh .mc a.mc-note{background:#fff;color:#564848;border:1px solid #E8E8E8}
    .mc-arw{width:9px;height:9px;flex:none;overflow:visible}
    .mc-arw path{stroke-width:1.1}
    @media (max-width:389px){.mh .mc a.mc-btn{--fs:13.5px;padding:0 13px;gap:5px}.mh .mc h2.mc-t{--fs:40px}}
    /* reveal */
    .mc-r{opacity:0;transform:translateY(14px);filter:blur(6px)}
    .mc.in .mc-r{opacity:1;transform:none;filter:none;transition:opacity 1.4s cubic-bezier(.33,0,.2,1),transform 1.6s cubic-bezier(.16,1,.3,1),filter 1.6s cubic-bezier(.16,1,.3,1);transition-delay:var(--d,0s)}
    body.mobile.mh-on .pin-mbottom{display:none!important}
    /* the panel runs to the very bottom of the page */
    body.mobile.mh-on main.main,body.mobile.mh-on .mob-only .page-layout{padding-bottom:0!important}
    @media (prefers-reduced-motion:reduce){.mc *{transition:none!important}.mc-r{opacity:1;transform:none;filter:none}}`;
    const stC = document.createElement('style'); stC.textContent = cssC; document.head.appendChild(stC);
    const MAIL = 'jingyizhang145@gmail.com';
    const mc = document.createElement('section');
    mc.className = 'mc'; mc.setAttribute('aria-labelledby', 'mc-title');
    mc.innerHTML =
      '<h2 id="mc-title" class="mc-t mc-r" style="--d:.05s">Let’s connect.</h2>' +
      '<p class="mc-copy mc-r" style="--d:.18s">Have a project in mind, an opportunity to share, or just want to say hello? I’d love to hear from you.</p>' +
      '<div class="mc-btns mc-r" style="--d:.32s">' +
        '<a class="mc-btn mc-email" href="mailto:' + MAIL + '">Email me' + ARW + '</a>' +
        '<a class="mc-btn mc-li" href="https://www.linkedin.com/in/jingyizhang145/" target="_blank" rel="noopener">LinkedIn' + ARW + '</a>' +
        '<a class="mc-btn mc-note" href="mailto:' + MAIL + '?subject=Website%20feedback">Leave a note</a>' +
      '</div>';
    sec.appendChild(mc);
    document.body.classList.add('mh-on');
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { mc.classList.add('in'); io.disconnect(); } }), { threshold: 0, rootMargin: '0px 0px -25% 0px' });
      io.observe(mc);
    } else mc.classList.add('in');
  })();
})();
