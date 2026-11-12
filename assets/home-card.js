/* Home (preview only, /?preview=mosaic): name card opening the mosaic (desktop).
   Cool blue gradient on top fading to warm grey, "Jingyi Zhang" set low in an embossed-glass serif. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const grid = document.querySelector('main .desk-only gallery-columnized.hm');
  if (!grid || document.querySelector('.hc-card') || document.body.classList.contains('mobile')) return;
  const sec = document.createElement('section');
  sec.className = 'hc-card';
  sec.setAttribute('aria-label', 'Jingyi Zhang');
  sec.innerHTML = `<svg viewBox="0 0 854 473" role="img" aria-label="Jingyi Zhang" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="hc-clip"><rect width="854" height="473" rx="40"/></clipPath>
      <linearGradient id="hc-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3F5C94"/><stop offset=".2" stop-color="#6A7597"/><stop offset=".42" stop-color="#9C9399"/>
        <stop offset=".62" stop-color="#C3BBBA"/><stop offset="1" stop-color="#E6E1DF"/>
      </linearGradient>
      <filter id="hc-emboss" x="-5%" y="-20%" width="110%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="b"/>
        <feSpecularLighting in="b" surfaceScale="3" specularConstant="1" specularExponent="22" lighting-color="#fff" result="s"><feDistantLight azimuth="235" elevation="48"/></feSpecularLighting>
        <feComposite in="s" in2="SourceAlpha" operator="in" result="hi"/>
        <feOffset in="SourceAlpha" dx="0" dy="1.4" result="o"/><feGaussianBlur in="o" stdDeviation="1.4" result="sh"/>
        <feFlood flood-color="#3a3340" flood-opacity=".32"/><feComposite in2="sh" operator="in" result="shadow"/>
        <feMerge><feMergeNode in="shadow"/><feMergeNode in="hi"/></feMerge>
      </filter>
    </defs>
    <g clip-path="url(#hc-clip)">
      <rect width="854" height="473" fill="url(#hc-g)"/>
      <text x="30" y="408" textLength="794" lengthAdjust="spacingAndGlyphs" font-family="'Times New Roman',Times,'Liberation Serif',serif" font-size="140" fill="#fff" fill-opacity=".28" stroke="#fff" stroke-opacity=".95" stroke-width="1.5" filter="url(#hc-emboss)">Jingyi Zhang</text>
    </g></svg>`;
  const st = document.createElement('style');
  st.textContent = '.hc-card{margin:0 0 14px}.hc-card svg{display:block;width:100%;height:auto}';
  document.head.appendChild(st);
  grid.insertAdjacentElement('beforebegin', sec);
  // line up with the mosaic's left edge and width
  const align = () => { sec.style.marginLeft = '0px'; sec.style.width = ''; sec.style.marginLeft = (grid.getBoundingClientRect().left - sec.getBoundingClientRect().left) + 'px'; sec.style.width = grid.getBoundingClientRect().width + 'px'; };
  align(); addEventListener('resize', align); addEventListener('load', align); setTimeout(align, 600);
})();
