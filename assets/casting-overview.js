/* ReelShort Casting System — Overview (PREVIEW ONLY, loaded by preview-frame.js on ?preview=mosaic).
   Two versions of one case study: "Overview" (visual first: motion, interface, results) and "Full case study" (the page as it is).
   Default in preview = Overview; ?view=full opens the full page. The switch sits at the top of the page. */
(function () {
  const bc = document.querySelector('main bodycopy'); const cs = bc && bc.querySelector('.cs2');
  if (!bc || !cs || bc.dataset.co) return; bc.dataset.co = '1';
  const P = 'assets/projects/casting/';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vid = (n, extra = '') => `<video class="co-v" ${extra} muted loop playsinline preload="metadata"><source src="${P}${n}.webm" type="video/webm"><source src="${P}${n}.mp4" type="video/mp4"></video>`;

  const css = document.createElement('style'); css.id = 'co-css';
  css.textContent = `
  .co{--ink:#111;--fg:rgba(0,0,0,.8);--mute:rgba(0,0,0,.55);--hair:rgba(17,17,17,.1);--fill:#f5f5f7;--green:#5e9c00;--greenbg:rgba(94,156,0,.1);--ease:cubic-bezier(.22,.8,.2,1);
    font-family:"Diatype Variable",Inter,system-ui,sans-serif;color:var(--fg);padding-bottom:6rem;position:relative}
  .co *{box-sizing:border-box}
  .co h1,.co h2,.co h3,.co p{margin:0}
  /* switch */
  .co-switch{position:absolute;right:0;top:var(--co-sw,-58px);z-index:40;margin:0}
  .co-seg{position:relative;display:inline-flex;padding:4px;border-radius:99px;background:rgba(255,255,255,.78);border:1px solid rgba(17,17,17,.1);
    backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);box-shadow:0 6px 24px rgba(0,0,0,.06)}
  .co-seg button{all:unset;cursor:pointer;position:relative;z-index:1;padding:8px 18px;border-radius:99px;font:500 13px/1 Inter,system-ui,sans-serif;color:rgba(17,17,17,.5);transition:color .35s var(--ease);white-space:nowrap}
  .co-seg button.on{color:#fff}
  .co-seg i{position:absolute;z-index:0;top:4px;bottom:4px;left:4px;border-radius:99px;background:#111;transition:transform .45s var(--ease),width .45s var(--ease)}
  body.co-ov .cs2,body.co-ov .cm-nav,body.co-ov .cm-sheet,body.co-ov .cm-progress{display:none!important}
  body.co-full .co-body{display:none}
  /* reveal */
  .co-r{opacity:0;transform:translateY(34px);filter:blur(12px);transition:opacity 1.1s var(--ease),transform 1.1s var(--ease),filter 1.2s var(--ease)}
  .co-r.in{opacity:1;transform:none;filter:none}
  @media (prefers-reduced-motion:reduce){.co-r{opacity:1;transform:none;filter:none;transition:none}}
  /* hero */
  .co-hero{padding:18px 0 0}
  .co-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
  .co-tag{font-size:12.5px;padding:4px 12px;border:1px solid var(--hair);border-radius:99px;color:var(--mute)}
  .co-tag.on{color:var(--green);border-color:var(--green);background:var(--greenbg)}
  .co h1{font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:clamp(40px,5.7vw,110px);line-height:.98;letter-spacing:-.015em;color:var(--fg);text-wrap:balance}
  .co h1 span{display:block}
  .co h1 em{font-style:italic;color:#3f8f5c}
  .co-sum{max-width:36em;margin-top:clamp(24px,2.6vw,44px);font-size:clamp(15px,1.45vw,26px);line-height:1.55;color:var(--mute)}
  .co-stage{position:relative;margin-top:36px;border-radius:30px;overflow:hidden;background:#e9efe6;aspect-ratio:16/9;box-shadow:0 30px 80px -30px rgba(40,60,30,.35)}
  .co-stage video,.co-stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .co-fict{margin-top:12px;font-size:12px;color:var(--mute)}
  /* numbers */
  .co-nums{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:56px;border-top:1px solid var(--hair);border-bottom:1px solid var(--hair)}
  .co-num{padding:26px 18px 26px 0}
  .co-num+.co-num{padding-left:22px;border-left:1px solid var(--hair)}
  .co-num b{display:block;font-weight:300;font-size:clamp(2.1rem,4.4vw,3.6rem);line-height:1;letter-spacing:-.04em;color:var(--ink);font-variant-numeric:tabular-nums}
  .co-num:first-child b{color:var(--green)}
  .co-num span{display:block;margin-top:10px;font-size:13px;line-height:1.35;color:var(--mute)}
  /* section heads */
  .co-sec{margin-top:clamp(72px,10vw,128px)}
  .co-k{display:inline-block;font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:max(1.53vw,17px);line-height:1;letter-spacing:-.005em;color:#fff;background:#000;padding:.4em 1em .45em;border-radius:99px;box-shadow:0 14px 28px -10px rgba(0,0,0,.22);margin-bottom:24px}
  .co h2{font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:clamp(34px,3.9vw,58px);line-height:1.1;letter-spacing:-.005em;color:var(--fg);text-wrap:balance;max-width:min(100%,62rem)}
  .co-lead{margin-top:14px;max-width:38rem;font-size:15.5px;line-height:1.6;color:var(--mute)}
  /* before / after */
  .co-ba{display:grid;grid-template-columns:1fr;gap:20px;margin-top:34px;align-items:stretch}
  .co-pane{position:relative;border-radius:26px;overflow:hidden;background:var(--fill);display:flex;flex-direction:column}
  .co-pane .m{display:block;position:relative;aspect-ratio:1774/888}
  .co-pane.after .m{aspect-ratio:1600/915}
  .co-pane video,.co-pane img{display:block;width:100%;height:100%;object-fit:cover}
  .co-pane .c{padding:20px 28px 26px;font-size:16px;line-height:1.55}
  .co-pane .c b{display:block;font:500 11.5px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;color:var(--mute)}
  .co-pane.after .c b{color:var(--green)}
  /* bento */
  .co-bento{display:grid;grid-template-columns:repeat(12,1fr);gap:20px;margin-top:34px}
  .co-tile{position:relative;display:flex;flex-direction:column;background:var(--fill);border-radius:28px;overflow:hidden;color:inherit;text-decoration:none;cursor:pointer;
    transition:transform .6s var(--ease),box-shadow .6s var(--ease)}
  .co-tile:hover{transform:translateY(-4px);box-shadow:0 26px 60px -28px rgba(0,0,0,.28)}
  .co-tile .m{display:flex;align-items:center;justify-content:center;padding:clamp(16px,3vw,40px) clamp(16px,3vw,40px) 0;overflow:hidden}
  .co-tile .m img{display:block;width:100%;height:auto;border-radius:18px;transition:transform 1.2s var(--ease)}
  .co-tile:hover .m img{transform:scale(1.025)}
  .co-tile .t{padding:22px clamp(20px,3vw,40px) 30px}
  .co-tile .t small{display:block;font:500 11.5px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--green);margin-bottom:9px}
  .co-tile .t b{display:block;font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:clamp(28px,2.6vw,40px);line-height:1.12;letter-spacing:-.005em;color:var(--fg)}
  .co-tile .t span{display:block;margin-top:8px;max-width:44rem;font-size:15.5px;line-height:1.5;color:var(--mute)}
  .co-t1{grid-column:1/-1}
  .co-t1 .m{padding:28px;gap:14px;align-items:center;background:linear-gradient(180deg,#eef2ea,#e3eadc)}
  .co-t1 .m video{width:calc(50% - 7px);aspect-ratio:1440/1080;object-fit:cover;border-radius:20px;box-shadow:0 18px 40px -18px rgba(0,0,0,.35)}
  .co-t1 .m video+video{margin-top:0}
  .co-t2,.co-t3,.co-t4,.co-t5{grid-column:1/-1}
  /* research */
  .co-rs{display:grid;grid-template-columns:1fr;gap:28px;margin-top:34px}
  .co-rs .vid{border-radius:26px;overflow:hidden;background:var(--fill);aspect-ratio:2400/1216}
  .co-rs .vid video{display:block;width:100%;height:100%;object-fit:cover}
  .co-needs{display:grid;grid-template-columns:repeat(4,1fr);gap:0 28px;margin:0;padding:0;list-style:none}
  .co-needs li{display:block;padding:16px 0 0;border-top:1px solid var(--hair)}
  .co-needs i{display:block;margin-bottom:10px;font:500 12px/1 Inter,sans-serif;font-style:normal;color:var(--green)}
  .co-needs b{display:block;font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:26px;line-height:1.15;color:var(--fg)}
  .co-needs span{display:block;margin-top:6px;font-size:14px;line-height:1.5;color:var(--mute)}
  /* outcome */
  .co-out{background:#0f130d;color:rgba(255,255,255,.82);border-radius:34px;padding:clamp(28px,5vw,64px);margin-top:clamp(72px,10vw,128px);overflow:hidden}
  .co-out .co-k{background:#fff;color:#000}
  .co-out h2{color:#fff}
  .co-out .pair{display:grid;grid-template-columns:1fr;gap:16px;margin-top:34px}
  .co-out .pair div{border-radius:22px;overflow:hidden;background:#1b2118;aspect-ratio:1776/900}
  .co-out .pair video{display:block;width:100%;height:100%;object-fit:cover}
  .co-out .cols{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:30px}
  .co-out .cols p{font-size:15px;line-height:1.6}
  .co-out .cols b{display:block;color:#fff;font-weight:500;margin-bottom:6px}
  .co-out .note{margin-top:26px;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.45)}
  .co-q{margin-top:clamp(64px,9vw,110px);max-width:46rem}
  .co-q p{font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:clamp(30px,3.6vw,54px);line-height:1.1;letter-spacing:-.005em;color:var(--fg);text-wrap:balance}
  .co-q p+p{margin-top:18px;font-family:inherit;font-size:15.5px;font-weight:300;letter-spacing:0;line-height:1.6;color:var(--mute)}
  .co-cta{margin-top:38px;display:flex;flex-wrap:wrap;gap:12px}
  .co-btn{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:99px;background:#111;color:#fff;font:500 14px/1 Inter,sans-serif;transition:transform .4s var(--ease),background .3s}
  .co-btn:hover{transform:translateY(-2px);background:#000}
  .co-btn svg{transition:transform .4s var(--ease)}.co-btn:hover svg{transform:translateX(4px)}
  @media (max-width:560px){.co-seg button{padding:8px 13px;font-size:12.5px}.co-seg .x{display:none}}
  @media (max-width:860px){
    .co-nums{grid-template-columns:repeat(2,1fr)}
    .co-num:nth-child(odd){padding-left:0;border-left:0}.co-num:nth-child(even){padding-left:20px;border-left:1px solid var(--hair)}
    .co-num:nth-child(n+3){border-top:1px solid var(--hair)}
    .co-num:last-child{grid-column:1/-1;border-left:0;padding-left:0}
    .co-ba,.co-rs,.co-out .pair,.co-out .cols{grid-template-columns:1fr}
    .co-needs{grid-template-columns:1fr 1fr;gap:0 20px}
    .co-t1 .m{flex-direction:column}.co-t1 .m video{width:100%}
    .co h1{font-size:clamp(36px,11vw,56px)}
    .co-t1,.co-t2,.co-t3,.co-t4,.co-t5{grid-column:1/-1;grid-row:auto}
    .co-stage{border-radius:20px}.co-pane,.co-tile,.co-rs .vid{border-radius:20px}.co-out{border-radius:24px}
  }`;
  document.head.appendChild(css);

  const arrow = '<svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tile = (cls, img, k, b, s, extra) => `<a class="co-tile co-r ${cls}" href="#sec-5" data-go="sec-5"><div class="m">${extra || `<img src="${P}${img}" alt="${b}" loading="lazy">`}</div><div class="t"><small>${k}</small><b>${b}</b><span>${s}</span></div></a>`;

  const co = document.createElement('div'); co.className = 'co';
  co.innerHTML = `
  <div class="co-switch"><div class="co-seg" role="tablist" aria-label="Case study version"><i></i><button role="tab" data-v="ov" class="on">Overview</button><button role="tab" data-v="full">Full<span class="x"> case study</span></button></div></div>
  <div class="co-body">
   <header class="co-hero">
    <div class="co-tags co-r"><span class="co-tag">ReelShort · Crazy Maple Studio</span><span class="co-tag">Internal platform · B2B SaaS</span><span class="co-tag">2026</span><span class="co-tag on">Shipped · In active use</span></div>
    <h1 class="co-r"><span>Casting at scale:</span><span>from a talent database</span><span>to a <em>decision tool</em></span></h1>
    <p class="co-sum co-r">I redesigned and built the company's internal ReelShort Casting System so the team can evaluate talent directly from the grid, with complete information and the agency behind each actor in view.</p>
    <div class="co-stage co-r" aria-label="Casting Hub: add talent to a selection">${vid('castingpool_motion_v8', 'autoplay poster="' + P + 'castingpool_motion_v8_poster.jpg"')}</div>
    <p class="co-fict">All talent names, photos and agency data are fictional demo data. The real platform is internal and confidential.</p>
   </header>

   <div class="co-nums co-r">
    <div class="co-num"><b data-n="28" data-p="+" data-s="%">+28%</b><span>Profile completeness</span></div>
    <div class="co-num"><b data-n="67" data-s="%">67%</b><span>Actor profiles updated</span></div>
    <div class="co-num"><b data-n="600" data-s="+">600+</b><span>Actors, searchable by look, location and consent</span></div>
    <div class="co-num"><b data-n="130" data-s="+">130+</b><span>Agencies with linked rosters</span></div>
    <div class="co-num"><b data-n="60" data-s="+">60+</b><span>Productions in one system</span></div>
   </div>

   <section class="co-sec">
    <div class="co-k co-r">The shift</div>
    <h2 class="co-r">From a place where records are stored to a place where decisions are made</h2>
    <div class="co-ba">
     <div class="co-pane before co-r"><span class="m">${vid('casting-chaos', 'autoplay')}</span><div class="c"><b>Before</b>A second photo on Instagram, availability in email, the agency relationship in someone's memory.</div></div>
     <div class="co-pane after co-r"><span class="m"><img src="${P}casting-3.jpg" alt="The new Talent Library grid" loading="lazy"></span><div class="c"><b>After</b>One grid: several photos per card, completeness, consent and agency, all in view.</div></div>
    </div>
   </section>

   <section class="co-sec">
    <div class="co-k co-r">What changed</div>
    <h2 class="co-r">Five decisions, two sprints</h2>
    <div class="co-bento">
     ${tile('co-t1', '', '01 · Talent card', 'Browse every photo in place', 'A photo carousel and short colour-coded consent tags replace one photo and a wall of labels.', vid('casting-card_a', 'autoplay') + vid('casting-card_b', 'autoplay'))}
     ${tile('co-t2', 'casting-13.jpg', '02 · Completeness', 'See what is decision-ready', 'Twelve checkpoints, one score on every card, filters for what is missing.')}
     ${tile('co-t3', 'casting-15.jpg', '03 · Agency library', 'Know who represents whom', 'Actor photo stacks, office locations, one Add Agency flow.')}
     ${tile('co-t4', 'casting-18.jpg', '04 · Filters', 'Search several options at once', 'Thirteen single-select controls became grouped multi-select panels.')}
     ${tile('co-t5', 'casting-20.jpg', '05 · VFX reference', 'Projects first, standards on demand', 'A collapsible card with D to S+ grade chips.')}
    </div>
   </section>

   <section class="co-sec">
    <div class="co-k co-r">Research</div>
    <h2 class="co-r">Five interviews, four needs</h2>
    <div class="co-rs">
     <div class="vid co-r">${vid('casting-needs', 'autoplay')}</div>
     <ol class="co-needs co-r">
      <li><i>01</i><div><b>Visual fit</b><span>Several angles and looks. The face is always the first filter.</span></div></li>
      <li><i>02</i><div><b>Complete information</b><span>Height, consent, agency, location. Missing any, a profile is skipped.</span></div></li>
      <li><i>03</i><div><b>Chemistry</b><span>Casting happens in pairs. Teams want two faces side by side.</span></div></li>
      <li><i>04</i><div><b>Agency network</b><span>The deal is with the agency. Who represents whom shapes the shortlist.</span></div></li>
     </ol>
    </div>
   </section>

   <section class="co-out co-r">
    <div class="co-k">Outcome</div>
    <h2>In active use, making real change</h2>
    <div class="pair"><div>${vid('casting-illus', 'autoplay')}</div></div>
    <div class="cols"><p><b>For the team</b>Shortlist without leaving the grid, see which profiles are decision-ready, reach an agency's roster in one click.</p><p><b>For the company</b>Casting sits on the critical path of every production. The system is now the base of a broader internal production platform.</p></div>
    <p class="note">Counts come from the database. The platform has no event analytics yet, so time savings are observed, not logged; instrumenting it is first on the phase-two list.</p>
   </section>

   <div class="co-q co-r">
    <p>Casting looks like choosing faces. Most of it is managing information.</p>
    <p>The old tool made the team pay for the same information twice, once to find it and once to re-verify it. The redesign did not replace anyone's judgment. It removed the second payment.</p>
    <div class="co-cta"><button class="co-btn" data-v="full">Read the full case study ${arrow}</button></div>
   </div>
  </div>`;
  bc.prepend(co);

  /* ---- switch ---- */
  const seg = co.querySelector('.co-seg'), thumb = seg.querySelector('i'), btns = [...seg.querySelectorAll('button')];
  const place = () => { const b = btns.find(x => x.classList.contains('on')); thumb.style.width = b.offsetWidth + 'px'; thumb.style.transform = `translateX(${b.offsetLeft - 4}px)`; };
  function setView(v, scrollTop = true, push = true) {
    document.body.classList.toggle('co-ov', v === 'ov'); document.body.classList.toggle('co-full', v === 'full');
    btns.forEach(b => b.classList.toggle('on', b.dataset.v === v)); place();
    if (push) { const u = new URL(location.href); u.searchParams.set('view', v); history.replaceState(null, '', u); }
    if (scrollTop) window.scrollTo({ top: 0, behavior: 'auto' });
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => { observeVideos(); }, 50);
  }
  co.addEventListener('click', e => {
    const b = e.target.closest('[data-v]'); if (b) { setView(b.dataset.v); return; }
    const g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); setView('full', false); setTimeout(() => { const t = document.getElementById(g.dataset.go); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 90, behavior: 'auto' }); }, 80); }
  });

  /* ---- reveal, count-up, video in view ---- */
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); if (en.target.classList.contains('co-nums')) count(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  co.querySelectorAll('.co-r').forEach(el => io.observe(el));
  function count(root) {
    root.querySelectorAll('b[data-n]').forEach(b => { const n = +b.dataset.n, p = b.dataset.p || '', s = b.dataset.s || ''; if (reduce) return; const t0 = performance.now(), d = 1400;
      (function f(t) { const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3); b.textContent = p + Math.round(n * e) + s; if (k < 1) requestAnimationFrame(f); })(t0); });
  }
  const vio = new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (en.isIntersecting) { v.play && v.play().catch(() => {}); } else v.pause && v.pause(); }), { threshold: .15 });
  function observeVideos() { co.querySelectorAll('video').forEach(v => { v.muted = true; vio.unobserve(v); vio.observe(v); }); }
  observeVideos();

  const q = new URLSearchParams(location.search).get('view');
  setView(q === 'full' ? 'full' : 'ov', false, false);
  /* sit on the top bar, level with the Back pill, at the right of the content column (overlaid, no row of its own) */
  const alignSwitch = () => { const back = document.querySelector('.cm-back') || document.querySelector('main a[href*="menu"], main a[href*="work"]'); if (!back) return; const br = back.getBoundingClientRect(), cr = co.getBoundingClientRect(), sh = seg.offsetHeight || 40; co.style.setProperty('--co-sw', Math.round(br.top - cr.top + br.height / 2 - sh / 2) + 'px'); };
  alignSwitch(); addEventListener('load', alignSwitch); setTimeout(alignSwitch, 600); addEventListener('resize', alignSwitch);
  addEventListener('resize', place); document.fonts && document.fonts.ready.then(place);
})();
