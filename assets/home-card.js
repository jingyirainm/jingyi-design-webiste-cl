/* Home (preview only, /?preview=mosaic): the animated business card, opening the mosaic in place of the intro heading (desktop).
   The SVG is inlined so its CSS animation runs; "Flip Card" turns it over to the contact side. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const intro = document.querySelector('main .desk-only gallery-columnized.hm');
  if (!intro || document.querySelector('.hc-card') || document.body.classList.contains('mobile')) return;
  const css = `
  .hc-card{margin:0 0 14px;max-width:none;perspective:1800px}
  .hc-card-in{position:relative;aspect-ratio:854/473;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.45,0,.2,1)}
  .hc-card.flipped .hc-card-in{transform:rotateY(180deg)}
  .hc-card-front,.hc-card-back{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:4.7%/8.5%;overflow:hidden}
  .hc-card-front svg{display:block;width:100%;height:100%}
  .hc-card-back{transform:rotateY(180deg);background:#f2f4ee url(assets/card-bg.jpg) center/cover;display:flex;flex-direction:column;justify-content:space-between;padding:7% 6%;color:#385C2B}
  .hc-card-back>*{position:relative}
  .hc-card-back .nm{font:300 clamp(.9rem,1.5vw,1.2rem)/1.5 "Diatype Variable",Inter,sans-serif;letter-spacing:.02em}
  .hc-card-back ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem}
  .hc-card-back a{font:300 clamp(1.1rem,2.2vw,1.7rem)/1.3 "Diatype Variable",Inter,sans-serif;color:#385C2B;text-decoration:none;display:inline-flex;gap:.5em;align-items:baseline}
  .hc-card-back a:hover{text-decoration:underline}
  .hc-card-flip{position:absolute;z-index:3;border:0;background:transparent;cursor:pointer;border-radius:999px;padding:0}
  .hc-card-flip:focus-visible{outline:2px solid #2C3A0E;outline-offset:2px}
  .hc-card-flip.f{left:59%;top:4.9%;width:39.8%;height:9.3%}
  .hc-card-back .back-btn{align-self:flex-end;position:absolute;right:5%;top:6%;font:300 clamp(.8rem,1.3vw,1rem) "Diatype Variable",Inter,sans-serif;color:#fff;background:linear-gradient(90deg,#A4CF58,#5C8A26);border:0;border-radius:999px;padding:.55em 1.2em;cursor:pointer}
  html[data-theme="dark"] .hc-card-front,html[data-theme="dark"] .hc-card-back{filter:none}
  @media (prefers-reduced-motion:reduce){.hc-card-in{transition:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  fetch('assets/card-portfolio.svg?v=1').then(r => r.text()).then(svg => {
    const sec = document.createElement('section');
    sec.className = 'hc-card hc-rv';
    sec.innerHTML = `<div class="hc-card-in">
      <div class="hc-card-front">${svg}<button class="hc-card-flip f" type="button" aria-label="Open portfolio card"></button></div>
      <div class="hc-card-back" aria-hidden="true">
        <span class="nm">Jingyi Zhang</span>
        <button class="back-btn" type="button" tabindex="-1">Flip back ↗</button>
        <ul><li><a href="mailto:jingyizhang145@gmail.com">Email <span>↗</span></a></li>
        <li><a href="https://www.linkedin.com/in/jingyizhang145/" target="_blank" rel="noopener">LinkedIn <span>↗</span></a></li>
        <li><a href="https://www.instagram.com/rainmelon.studio/" target="_blank" rel="noopener">Instagram <span>↗</span></a></li></ul></div></div>`;
    intro.insertAdjacentElement('beforebegin', sec);
    // line up with the mosaic's left edge (same trick as the intro heading)
    const align = () => { sec.style.marginLeft = '0px'; sec.style.width = ''; sec.style.marginLeft = (intro.getBoundingClientRect().left - sec.getBoundingClientRect().left) + 'px'; sec.style.width = intro.getBoundingClientRect().width + 'px'; };
    align(); addEventListener('resize', align); addEventListener('load', align); setTimeout(align, 600);
    const flip = on => { sec.classList.toggle('flipped', on);
      sec.querySelector('.hc-card-back').setAttribute('aria-hidden', String(!on));
      sec.querySelectorAll('.hc-card-back a,.back-btn').forEach(e => e.tabIndex = on ? 0 : -1); };
    sec.querySelector('.hc-card-flip').addEventListener('click', () => flip(true));
    sec.querySelector('.back-btn').addEventListener('click', () => flip(false));
    sec.classList.add('in'); // show without waiting for the page's reveal observer
  });
})();
