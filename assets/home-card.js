/* Home (preview only, /?preview=mosaic): name card opening the mosaic (desktop).
   Metallic chrome-orb card (assets/card-metal.svg) with a "Flip Card" pill that turns it over to a contact side. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const grid = document.querySelector('main .desk-only gallery-columnized.hm');
  if (!grid || document.querySelector('.hc-card') || document.body.classList.contains('mobile')) return;
  const FONT = '"Diatype Variable",Inter,system-ui,sans-serif';
  const V = '?v=3';
  const arrowOut = '<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><path d="M2 12L12 2M4 2H12V10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const arrowBack = '<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><path d="M12 2L2 12M10 12H2V4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const link = (t, href, ext) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}<span>↗</span></a>`;
  const sec = document.createElement('section');
  sec.className = 'hc-card';
  sec.innerHTML = `<div class="hc-in">
    <div class="hc-face hc-front"><img src="assets/card-metal.svg${V}" alt="Jingyi Zhang. An AI-Native Multidisciplinary Designer. I Bring Structure to Creativity." draggable="false">
      <button type="button" class="hc-hit" id="hc-flip" aria-label="Flip card"></button></div>
    <div class="hc-face hc-back" aria-hidden="true"><img src="assets/card-metal-bg.svg${V}" alt="" draggable="false">
      <div class="hc-contact"><p class="hc-n">Jingyi Zhang</p>
        ${link('Email', 'mailto:jingyizhang145@gmail.com', false)}
        ${link('LinkedIn', 'https://www.linkedin.com/in/jingyizhang145/', true)}
        ${link('Instagram', 'https://www.instagram.com/rainmelon.studio/', true)}</div>
      <button type="button" class="hc-pill" id="hc-back-btn">Flip back ${arrowBack}</button></div></div>`;
  const st = document.createElement('style');
  st.textContent = `.hc-card{margin:0 0 14px;perspective:1800px}
  .hc-in{position:relative;aspect-ratio:854/473;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.45,0,.2,1)}
  .hc-card.flipped .hc-in{transform:rotateY(180deg)}
  .hc-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:4.7%/8.5%;overflow:hidden}
  .hc-back{transform:rotateY(180deg)}
  .hc-face>img{display:block;width:100%;height:100%;user-select:none}
  .hc-hit{position:absolute;left:76.6%;top:3.8%;width:22%;height:10%;border:0;padding:0;border-radius:99px;background:transparent;cursor:pointer;transition:background .2s}
  .hc-hit:hover,.hc-hit:focus-visible{background:rgba(255,255,255,.18);outline:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.55)}
  .hc-pill{position:absolute;right:2.2%;top:4.2%;display:inline-flex;align-items:center;gap:.5em;font:300 1.9vw/1 ${FONT};font-size:max(.95rem,1.45vw);padding:.7em 1.1em;border-radius:99px;border:1px solid rgba(255,255,255,.6);color:#fff;background:linear-gradient(90deg,#B3BDCE,#5F6B84);cursor:pointer;transition:filter .2s}
  .hc-pill:hover,.hc-pill:focus-visible{filter:brightness(1.12);outline:none}
  .hc-contact{position:absolute;left:6%;bottom:8%;display:flex;flex-direction:column;gap:.35em;font-family:${FONT};color:#10141E}
  .hc-contact .hc-n{margin:0 0 .5em;font-size:max(.9rem,1.3vw);letter-spacing:.04em;opacity:.7}
  .hc-contact a{font-size:max(1.6rem,3.6vw);font-weight:300;line-height:1.12;color:inherit;text-decoration:none;letter-spacing:-.01em}
  .hc-contact a span{font-size:.6em;margin-left:.3em}.hc-contact a:hover{text-decoration:underline}
  @media (prefers-reduced-motion:reduce){.hc-in{transition:none}}`;
  document.head.appendChild(st);
  grid.insertAdjacentElement('beforebegin', sec);
  const flip = on => { sec.classList.toggle('flipped', on);
    sec.querySelector('.hc-back').setAttribute('aria-hidden', String(!on));
    sec.querySelector('.hc-front').setAttribute('aria-hidden', String(on));
    sec.querySelectorAll('.hc-back a,#hc-back-btn').forEach(a => a.setAttribute('tabindex', on ? '0' : '-1'));
    sec.querySelector('#hc-flip').setAttribute('tabindex', on ? '-1' : '0'); };
  sec.querySelector('#hc-flip').addEventListener('click', () => flip(true));
  sec.querySelector('#hc-back-btn').addEventListener('click', () => flip(false));
  flip(false);
  // line up with the mosaic's left edge and width
  const align = () => { sec.style.marginLeft = '0px'; sec.style.width = ''; sec.style.marginLeft = (grid.getBoundingClientRect().left - sec.getBoundingClientRect().left) + 'px'; sec.style.width = grid.getBoundingClientRect().width + 'px'; };
  align(); addEventListener('resize', align); addEventListener('load', align); setTimeout(align, 600);
})();
