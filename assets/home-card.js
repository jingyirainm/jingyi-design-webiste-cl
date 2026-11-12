/* Home (preview only, /?preview=mosaic): name card opening the mosaic (desktop).
   Muted-lime gradient, "Jingyi Zhang" in the site's light sans with an embossed-glass look,
   and a glass "Flip Card" button that turns the card over to the contact side. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const grid = document.querySelector('main .desk-only gallery-columnized.hm');
  if (!grid || document.querySelector('.hc-card') || document.body.classList.contains('mobile')) return;
  const FONT = '"Diatype Variable",Inter,system-ui,sans-serif';
  const defs = `<defs>
      <clipPath id="hc-clip"><rect width="854" height="473" rx="40"/></clipPath>
      <linearGradient id="hc-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#79A52B"/><stop offset=".24" stop-color="#A1B77C"/><stop offset=".55" stop-color="#C8CCB5"/><stop offset="1" stop-color="#E9EAE0"/>
      </linearGradient>
      <filter id="hc-e" x="-5%" y="-20%" width="110%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="b"/>
        <feSpecularLighting in="b" surfaceScale="3" specularConstant="1" specularExponent="22" lighting-color="#fff" result="s"><feDistantLight azimuth="235" elevation="48"/></feSpecularLighting>
        <feComposite in="s" in2="SourceAlpha" operator="in" result="hi"/>
        <feOffset in="SourceAlpha" dy="1.4" result="o"/><feGaussianBlur in="o" stdDeviation="1.4" result="sh"/>
        <feFlood flood-color="#2d3a31" flood-opacity=".32"/><feComposite in2="sh" operator="in" result="shadow"/>
        <feMerge><feMergeNode in="shadow"/><feMergeNode in="hi"/></feMerge>
      </filter>
      <filter id="hc-e2" x="-5%" y="-30%" width="110%" height="160%">
        <feGaussianBlur in="SourceAlpha" stdDeviation=".7" result="b"/>
        <feSpecularLighting in="b" surfaceScale="3" specularConstant="1.2" specularExponent="18" lighting-color="#fff" result="s"><feDistantLight azimuth="235" elevation="48"/></feSpecularLighting>
        <feComposite in="s" in2="SourceAlpha" operator="in" result="hi"/>
        <feOffset in="SourceAlpha" dy="1.2" result="o"/><feGaussianBlur in="o" stdDeviation="1" result="sh"/>
        <feFlood flood-color="#26322a" flood-opacity=".5"/><feComposite in2="sh" operator="in" result="shadow"/>
        <feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/><feMergeNode in="hi"/></feMerge>
      </filter>
      <filter id="hc-soft" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>`;
  const btn = (label, id, arrow) => `<g class="hc-btn" id="${id}" role="button" tabindex="0" aria-label="${label}">
      <rect x="650" y="31" width="176" height="44" rx="22" fill="#1f2a22" fill-opacity=".3" filter="url(#hc-soft)"/>
      <rect class="hc-pill" x="650" y="28" width="176" height="44" rx="22" fill="#fff" fill-opacity=".16" stroke="#fff" stroke-opacity=".6"/>
      <text x="676" y="56.5" font-family='${FONT}' font-weight="300" font-size="21" letter-spacing=".3" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width=".9" filter="url(#hc-e2)">${label}</text>
      <path d="${arrow}" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#hc-e2)"/></g>`;
  const ARROW = 'M792 60L805 47M795 47H805V57';
  const link = (y, t, href, ext) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><text x="32" y="${y}" font-family='${FONT}' font-weight="300" font-size="46" fill="#26322a">${t}<tspan dx="14" font-size="30">↗</tspan></text></a>`;
  const sec = document.createElement('section');
  sec.className = 'hc-card';
  sec.innerHTML = `<div class="hc-in">
    <div class="hc-face hc-front"><svg viewBox="0 0 854 473" role="img" aria-label="Jingyi Zhang" xmlns="http://www.w3.org/2000/svg">${defs}
      <g clip-path="url(#hc-clip)"><rect width="854" height="473" fill="url(#hc-g)"/>
      <text x="32" y="400" textLength="790" lengthAdjust="spacing" font-family='${FONT}' font-weight="300" font-size="128" fill="#fff" fill-opacity=".3" stroke="#fff" stroke-opacity=".95" stroke-width="1.6" filter="url(#hc-e)">Jingyi Zhang</text>
      ${btn('Flip Card', 'hc-flip', ARROW)}</g></svg></div>
    <div class="hc-face hc-back" aria-hidden="true"><svg viewBox="0 0 854 473" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#hc-clip)"><rect width="854" height="473" fill="url(#hc-g)"/>
      <text x="32" y="64" font-family='${FONT}' font-weight="300" font-size="22" letter-spacing=".3" fill="#26322a" fill-opacity=".8">Jingyi Zhang</text>
      ${link(318, 'Email', 'mailto:jingyizhang145@gmail.com', false)}
      ${link(378, 'LinkedIn', 'https://www.linkedin.com/in/jingyizhang145/', true)}
      ${link(438, 'Instagram', 'https://www.instagram.com/rainmelon.studio/', true)}
      ${btn('Flip back', 'hc-back-btn', 'M805 47L792 60M802 60H792V50')}</g></svg></div></div>`;
  const st = document.createElement('style');
  st.textContent = `.hc-card{margin:0 0 14px;perspective:1800px}
  .hc-in{position:relative;aspect-ratio:854/473;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.45,0,.2,1)}
  .hc-card.flipped .hc-in{transform:rotateY(180deg)}
  .hc-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
  .hc-back{transform:rotateY(180deg)}
  .hc-face svg{display:block;width:100%;height:100%}
  .hc-btn{cursor:pointer;outline:none}.hc-btn:hover .hc-pill,.hc-btn:focus-visible .hc-pill{fill-opacity:.34}
  .hc-back a{cursor:pointer}.hc-back a:hover text{text-decoration:underline}
  @media (prefers-reduced-motion:reduce){.hc-in{transition:none}}`;
  document.head.appendChild(st);
  grid.insertAdjacentElement('beforebegin', sec);
  const flip = on => { sec.classList.toggle('flipped', on);
    sec.querySelector('.hc-back').setAttribute('aria-hidden', String(!on));
    sec.querySelectorAll('.hc-back a').forEach(a => a.setAttribute('tabindex', on ? '0' : '-1')); };
  [['#hc-flip', true], ['#hc-back-btn', false]].forEach(([sel, on]) => {
    const b = sec.querySelector(sel);
    b.addEventListener('click', () => flip(on));
    b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(on); } });
  });
  flip(false);
  // line up with the mosaic's left edge and width
  const align = () => { sec.style.marginLeft = '0px'; sec.style.width = ''; sec.style.marginLeft = (grid.getBoundingClientRect().left - sec.getBoundingClientRect().left) + 'px'; sec.style.width = grid.getBoundingClientRect().width + 'px'; };
  align(); addEventListener('resize', align); addEventListener('load', align); setTimeout(align, 600);
})();
