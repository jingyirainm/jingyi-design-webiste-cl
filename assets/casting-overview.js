/* ReelShort Casting System — Overview (loaded by preview-frame.js).
   Two versions of one case study: "Overview" (visual first: motion, interface, results) and "Full case study" (the page as it is).
   Default in preview = Overview; ?view=full opens the full page. The top of the page (hero, glance row) is shared; the switch sits right under it and chooses what follows. */
(function () {
  const bc = document.querySelector('main bodycopy'); const cs = bc && bc.querySelector('.cs2'); const conf = cs && cs.querySelector('.w > .conf');
  if (!bc || !cs || !conf || bc.dataset.co) return; bc.dataset.co = '1';
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
  .co-switch{display:flex;justify-content:center;margin:clamp(40px,5vw,64px) 0 0}
  .co-seg{position:relative;display:inline-flex;padding:4px;border-radius:99px;background:rgba(255,255,255,.78);border:1px solid rgba(17,17,17,.1);
    backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);box-shadow:0 6px 24px rgba(0,0,0,.06)}
  .co-seg button{all:unset;cursor:pointer;position:relative;z-index:1;padding:8px 18px;border-radius:99px;font:500 13px/1 Inter,system-ui,sans-serif;color:rgba(17,17,17,.5);transition:color .35s var(--ease);white-space:nowrap}
  .co-seg button.on{color:#fff}
  .co-seg i{position:absolute;z-index:0;top:4px;bottom:4px;left:4px;border-radius:99px;background:#111;transition:transform .45s var(--ease),width .45s var(--ease)}
  body.co-ov .cs2 .w>.sec,body.co-ov .cm-nav,body.co-ov .cm-sheet,body.co-ov .cm-progress{display:none!important}
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
  /* HD carousel: screens slide into one another */
  .co-car{position:relative}
  .co-cstage{position:relative;aspect-ratio:2/1;border-radius:30px;overflow:hidden;background:linear-gradient(180deg,#eef1ea,#e6ebe2);box-shadow:0 30px 80px -34px rgba(40,60,30,.35);touch-action:pan-y;user-select:none}
  .co-sl{position:absolute;left:50%;top:50%;width:73%;aspect-ratio:1.75;border-radius:16px;overflow:hidden;background:#fff;
    box-shadow:0 26px 60px -24px rgba(0,0,0,.4),0 0 0 1px rgba(17,17,17,.06);cursor:pointer;
    transform:translate(calc(-50% + var(--x,0)*74%),-50%) scale(var(--s,1));opacity:var(--o,1);z-index:var(--z,1);
    transition:transform .9s var(--ease),opacity .9s var(--ease),filter .9s var(--ease);filter:blur(var(--b,0px));will-change:transform,opacity}
  .co-sl img,.co-sl video{display:block;width:100%;height:100%;object-fit:cover}
  .co-res{border-radius:30px;overflow:hidden;box-shadow:0 30px 80px -34px rgba(40,60,30,.35);background:#eef1ea}.co-res video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}@media(max-width:560px){.co-res{border-radius:20px}}
  .co-ctabs{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 22px;margin-top:18px}
  .co-ctabs button{all:unset;cursor:pointer;position:relative;padding:6px 0;font:500 13px/1 Inter,sans-serif;color:var(--mute);transition:color .3s}
  .co-ctabs button::after{content:"";position:absolute;left:0;right:100%;bottom:0;height:1.5px;background:#111;transition:right 0s}
  .co-ctabs button.on{color:#111}
  .co-ctabs button.on::after{right:0;transition:right var(--dur,3.6s) linear}
  .co-ctabs.paused button.on::after{transition:none}
  /* actor card wall (full-bleed, parallax) */
  .cs2{overflow-x:clip}
  .co-wall{position:relative;width:100vw;margin-left:calc(50% - 50vw);margin-top:clamp(56px,8vw,110px);height:max(240px,40vw);background:#0f130d;overflow:hidden}
  .co-wall .wl{position:absolute;left:50%;top:50%;width:max(118vw,600px);max-width:none;height:auto;transform:translate(-50%,calc(-50% + var(--py,0px)));will-change:transform;opacity:.96}
  .co-wall::before,.co-wall::after{content:"";position:absolute;left:0;right:0;height:28%;z-index:2;pointer-events:none}
  .co-wall::before{top:0;background:linear-gradient(#0f130d,rgba(15,19,13,0))}
  .co-wall::after{bottom:0;background:linear-gradient(rgba(15,19,13,0),#0f130d 92%)}
  .co-wall .fl{position:absolute;z-index:3;width:clamp(96px,14vw,210px);border-radius:clamp(12px,1.6vw,22px);box-shadow:0 30px 70px -20px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.08);transform:translateY(var(--py,0px)) rotate(var(--r,0deg));will-change:transform}
  .co-wall .f1{left:max(6%,calc(50% - 560px));top:18%;--r:-5deg}
  .co-wall .f2{right:max(6%,calc(50% - 560px));top:30%;--r:4deg}
  .co-wall .cap{position:absolute;z-index:4;left:50%;bottom:clamp(18px,4vw,52px);transform:translateX(-50%);width:min(910px,calc(100% - 32px));color:#fff}
  .co-wall .cap small{display:block;font:500 11.5px/1 Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:10px}
  .co-wall .cap b{display:block;font-family:"Instrument Serif","Times New Roman",serif;font-weight:400;font-size:clamp(26px,4vw,56px);line-height:1.05;letter-spacing:-.01em;max-width:18em}
  /* five decision tiles: slide in, lift on hover */
  @keyframes coTileIn{from{opacity:0;transform:translate(var(--sx,-60px),56px) scale(.955);filter:blur(10px)}}
  .co-tile.co-r.in{animation:coTileIn 1.15s var(--ease) backwards}
  .co-tile:nth-child(even){--sx:60px}
  .co-tile:hover{transform:translateY(-10px);box-shadow:0 34px 70px -26px rgba(0,0,0,.34)}
  .co-tile:hover .m img,.co-tile:hover .m video{transform:scale(1.045)}
  .co-tile .m video{transition:transform 1.2s var(--ease)}
  @media (prefers-reduced-motion:reduce){.co-tile.co-r.in{animation:none}.co-wall .wl,.co-wall .fl{transform:translate(-50%,-50%)}}
  .co-mframe{border-radius:30px;overflow:hidden;background:#eef0ea;aspect-ratio:16/9;box-shadow:0 30px 80px -30px rgba(40,60,30,.35)}
  .co-mframe img{display:block;width:100%;height:100%;object-fit:cover;transform:scale(1.32);transform-origin:50% 46%}
  .co-cap{margin-top:12px;font-size:13px;color:var(--mute)}
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
  .co-out .res{margin-top:34px;border-radius:22px;overflow:hidden;background:#f4f3ef}.co-out .res video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
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
    .co-stage{border-radius:20px}.co-cstage{border-radius:20px;aspect-ratio:1.55/1}.co-sl{width:80%;border-radius:10px}.co-pane,.co-tile,.co-rs .vid{border-radius:20px}.co-out{border-radius:24px}
  }`;
  document.head.appendChild(css);

  const arrow = '<svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const tile = (cls, img, k, b, s, extra) => `<a class="co-tile co-r ${cls}" href="#sec-5" data-go="sec-5"><div class="m">${extra || `<img src="${P}${img}" alt="${b}" loading="lazy">`}</div><div class="t"><small>${k}</small><b>${b}</b><span>${s}</span></div></a>`;

  const co = document.createElement('div'); co.className = 'co';
  co.innerHTML = `
  <div class="co-switch"><div class="co-seg" role="tablist" aria-label="Case study version"><i></i><button role="tab" data-v="ov" class="on">Overview</button><button role="tab" data-v="full">Full<span class="x"> case study</span></button></div></div>
  <div class="co-body">
   <div class="co-car co-r" style="margin-top:clamp(40px,5vw,64px)" aria-roledescription="carousel" aria-label="ReelShort Casting Hub, in high resolution">
    <div class="co-cstage">
     <div class="co-sl" data-i="0"><img src="assets/projects/casting/hd/casting-hd-0-splash.webp" alt="ReelShort" width="2400" height="1380" decoding="async" fetchpriority="high"></div>
     <div class="co-sl" data-i="1"><img src="assets/projects/casting/hd/casting-hd-1-valueprop.webp" alt="Structure and clarity across every casting decision" width="2400" height="1380" decoding="async" loading="lazy"></div>
     <div class="co-sl" data-i="2"><img src="assets/projects/casting/hd/casting-hd-2-talent.webp" alt="Talent Library with photo-carousel cards" width="2400" height="1380" decoding="async" loading="lazy"></div>
     <div class="co-sl" data-i="3"><img src="assets/projects/casting/hd/casting-hd-3-agency.webp" alt="Agency Directory with actor photo stacks" width="2400" height="1380" decoding="async" loading="lazy"></div>
    </div>
    <div class="co-ctabs" role="tablist"><button role="tab" data-i="0" class="on">ReelShort</button><button role="tab" data-i="1">Value prop</button><button role="tab" data-i="2">Talent Library</button><button role="tab" data-i="3">Agency Directory</button></div>
   </div>

   <div class="co-wall co-r" aria-label="Talent Library, every actor card at a glance">
    <img class="wl" data-sp="40" src="assets/projects/casting/hd/casting-wall.webp" alt="Talent Library grid of actor cards" width="1900" height="852" loading="lazy" decoding="async">
    <div class="cap"><small>Talent Library</small><b>600+ actors, every photo, one glance.</b></div>
   </div>

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
    <div class="res"><video class="co-v" muted loop playsinline preload="metadata" poster="assets/projects/casting/hd/casting-hd-4-outcome-poster.jpg" aria-label="Outcome: profile completeness, profiles updated, actors, agencies, projects"><source src="assets/projects/casting/hd/casting-hd-4-outcome.webm" type="video/webm"><source src="assets/projects/casting/hd/casting-hd-4-outcome.mp4" type="video/mp4"></video></div>
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
  conf.after(co);

  /* ---- switch ---- */
  const seg = co.querySelector('.co-seg'), thumb = seg.querySelector('i'), btns = [...seg.querySelectorAll('button')];
  const place = () => { const b = btns.find(x => x.classList.contains('on')); thumb.style.width = b.offsetWidth + 'px'; thumb.style.transform = `translateX(${b.offsetLeft - 4}px)`; };
  function setView(v, scrollTop = true, push = true) {
    document.body.classList.toggle('co-ov', v === 'ov'); document.body.classList.toggle('co-full', v === 'full');
    btns.forEach(b => b.classList.toggle('on', b.dataset.v === v)); place();
    if (push) { const u = new URL(location.href); u.searchParams.set('view', v); history.replaceState(null, '', u); }
    if (scrollTop) { const t = seg.getBoundingClientRect().top + scrollY - 80; if (scrollY > t) window.scrollTo({ top: t, behavior: 'auto' }); }
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => { observeVideos(); window.dispatchEvent(new Event('scroll')); }, 60);
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

  /* ---- HD carousel ---- */
  (function () {
    const car = co.querySelector('.co-car'); if (!car) return;
    const st = car.querySelector('.co-cstage'), sl = [...st.querySelectorAll('.co-sl')], tabs = [...car.querySelectorAll('.co-ctabs button')], tb = car.querySelector('.co-ctabs'), n = sl.length, DELAY = 3600;
    let cur = 0, timer = null, hover = false, vis = false;
    st.style.setProperty('--dur', DELAY + 'ms'); tb.style.setProperty('--dur', DELAY + 'ms');
    function layout() {
      sl.forEach((el, i) => {
        let d = i - cur; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
        const a = Math.abs(d);
        el.style.setProperty('--x', d); el.style.setProperty('--s', d === 0 ? 1 : a === 1 ? .84 : .7);
        el.style.setProperty('--o', d === 0 ? 1 : a === 1 ? .55 : 0); el.style.setProperty('--b', d === 0 ? '0px' : '1.5px');
        el.style.setProperty('--z', 10 - a); el.style.pointerEvents = a <= 1 ? 'auto' : 'none';
        const v = el.querySelector('video'); if (v) { if (d === 0) v.play && v.play().catch(() => {}); else v.pause && v.pause(); }
      });
      tabs.forEach((t, i) => t.classList.toggle('on', i === cur));
      tb.classList.remove('paused'); void tb.offsetWidth;
    }
    function go(i, user) { cur = (i + n) % n; layout(); if (user) restart(); }
    function restart() { clearInterval(timer); if (reduce || !vis) return; timer = setInterval(() => { if (!hover) go(cur + 1); }, DELAY); }
    sl.forEach((el, i) => el.addEventListener('click', () => { if (i !== cur) go(i, true); }));
    tabs.forEach((t, i) => t.addEventListener('click', () => go(i, true)));
    car.addEventListener('mouseenter', () => { hover = true; tb.classList.add('paused'); });
    car.addEventListener('mouseleave', () => { hover = false; tb.classList.remove('paused'); restart(); });
    let x0 = null; st.addEventListener('pointerdown', e => { x0 = e.clientX; });
    addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1), true); });
    new IntersectionObserver(es => es.forEach(en => { vis = en.isIntersecting; if (vis) restart(); else clearInterval(timer); }), { threshold: .3 }).observe(car);
    layout();
  })();

  /* ---- parallax for the card wall ---- */
  (function () {
    const wall = co.querySelector('.co-wall'); if (!wall || reduce) return;
    const els = [...wall.querySelectorAll('[data-sp]')]; let tick = false;
    function upd() { tick = false; const r = wall.getBoundingClientRect(), vh = innerHeight; if (r.bottom < -100 || r.top > vh + 100) return;
      const p = ((r.top + r.height / 2) - vh / 2) / vh; els.forEach(el => el.style.setProperty('--py', (-p * el.dataset.sp).toFixed(1) + 'px')); }
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true }); addEventListener('resize', upd); upd();
  })();

  const q = new URLSearchParams(location.search).get('view');
  setView(q === 'full' ? 'full' : 'ov', false, false);
  addEventListener('resize', place); document.fonts && document.fonts.ready.then(place);
})();
