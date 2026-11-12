/* About (preview only, /about?preview=mosaic): the animated business card between the intro and "What I do".
   The SVG is inlined so its CSS animation runs; "Flip Card" turns it over to the contact side. */
(function () {
  if (!/[?&]preview=mosaic(&|$)/.test(location.search)) return;
  const intro = document.querySelector('.ab-intro');
  if (!intro || document.querySelector('.ab-card')) return;
  const css = `
  .ab-card{margin:clamp(2.4rem,5vw,4rem) 0 0;max-width:62rem;perspective:1800px}
  .ab-card-in{position:relative;aspect-ratio:854/473;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.45,0,.2,1)}
  .ab-card.flipped .ab-card-in{transform:rotateY(180deg)}
  .ab-card-front,.ab-card-back{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:4.7%/8.5%;overflow:hidden}
  .ab-card-front svg{display:block;width:100%;height:100%}
  .ab-card-back{transform:rotateY(180deg);background:#E9E9E9;display:flex;flex-direction:column;justify-content:space-between;padding:7% 6%;color:#2C3A0E}
  .ab-card-back .orb{position:absolute;left:50%;top:50%;width:74%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;
    background:radial-gradient(closest-side,#8ACE00 0 38%,rgba(138,206,0,.5) 62%,rgba(138,206,0,0) 100%);pointer-events:none}
  .ab-card-back>*{position:relative}
  .ab-card-back .nm{font:300 clamp(.9rem,1.5vw,1.2rem)/1.5 "Diatype Variable",Inter,sans-serif;letter-spacing:.02em}
  .ab-card-back ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.5rem}
  .ab-card-back a{font:300 clamp(1.1rem,2.2vw,1.7rem)/1.3 "Diatype Variable",Inter,sans-serif;color:#2C3A0E;text-decoration:none;display:inline-flex;gap:.5em;align-items:baseline}
  .ab-card-back a:hover{text-decoration:underline}
  .ab-card-flip{position:absolute;z-index:3;border:0;background:transparent;cursor:pointer;border-radius:999px;padding:0}
  .ab-card-flip:focus-visible{outline:2px solid #2C3A0E;outline-offset:2px}
  .ab-card-flip.f{left:76.8%;top:4.2%;width:21.8%;height:9.3%}
  .ab-card-back .back-btn{align-self:flex-end;position:absolute;right:5%;top:6%;font:300 clamp(.8rem,1.3vw,1rem) "Diatype Variable",Inter,sans-serif;color:#fff;background:linear-gradient(90deg,#A4CF58,#5C8A26);border:0;border-radius:999px;padding:.55em 1.2em;cursor:pointer}
  html[data-theme="dark"] .ab-card-front,html[data-theme="dark"] .ab-card-back{filter:none}
  @media (prefers-reduced-motion:reduce){.ab-card-in{transition:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  fetch('assets/about/card-anim.svg?v=1').then(r => r.text()).then(svg => {
    const sec = document.createElement('section');
    sec.className = 'ab-card ab-rv';
    sec.innerHTML = `<div class="ab-card-in">
      <div class="ab-card-front">${svg}<button class="ab-card-flip f" type="button" aria-label="Flip card"></button></div>
      <div class="ab-card-back" aria-hidden="true"><div class="orb"></div>
        <span class="nm">Jingyi Zhang</span>
        <button class="back-btn" type="button" tabindex="-1">Flip back ↗</button>
        <ul><li><a href="mailto:jingyizhang145@gmail.com">Email <span>↗</span></a></li>
        <li><a href="https://www.linkedin.com/in/jingyizhang145/" target="_blank" rel="noopener">LinkedIn <span>↗</span></a></li>
        <li><a href="https://www.instagram.com/rainmelon.studio/" target="_blank" rel="noopener">Instagram <span>↗</span></a></li></ul></div></div>`;
    intro.insertAdjacentElement('afterend', sec);
    const flip = on => { sec.classList.toggle('flipped', on);
      sec.querySelector('.ab-card-back').setAttribute('aria-hidden', String(!on));
      sec.querySelectorAll('.ab-card-back a,.back-btn').forEach(e => e.tabIndex = on ? 0 : -1); };
    sec.querySelector('.ab-card-flip').addEventListener('click', () => flip(true));
    sec.querySelector('.back-btn').addEventListener('click', () => flip(false));
    sec.classList.add('in'); // show without waiting for the page's reveal observer
  });
})();
