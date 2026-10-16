/* Project page — view switch (grid / ring) and the rotating ring view.
   Grid: the existing card grid.  Ring: the same cards on a slowly rotating circle (3:4, square corners);
   hover a card and it eases to the centre and grows; click opens the project card. */
(function () {
  const bc = document.querySelector('body.page-menu main bodycopy');
  if (!bc || bc.dataset.ring) return;
  const wrap = bc.querySelector('.mf-wrap');
  if (!wrap) return;
  bc.dataset.ring = '1';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => matchMedia('(max-width:767px)').matches;
  const KEY = 'rs-project-view';
  const SEC = 105;              // seconds per full turn
  const BASE = (Math.PI * 2) / SEC;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const smooth = t => t * t * (3 - 2 * t);

  /* ---------------- styles ---------------- */
  const css = `
  .rg-view{pointer-events:auto;position:relative;margin-left:auto;align-self:center;flex:none;display:inline-flex;gap:2px;padding:3px;border-radius:99px;background:rgba(17,17,17,.05);box-shadow:inset 0 0 0 1px rgba(17,17,17,.06)}
  .rg-thumb{position:absolute;z-index:0;top:3px;left:3px;width:34px;height:28px;border-radius:99px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 0 0 .5px rgba(0,0,0,.06);
    transition:transform .35s cubic-bezier(.34,1.45,.64,1)}
  .rg-view[data-v="ring"] .rg-thumb{transform:translateX(36px)}
  .rg-view button{all:unset;position:relative;z-index:1;display:grid;place-items:center;width:34px;height:28px;border-radius:99px;cursor:pointer;color:rgba(17,17,17,.42);transition:color .3s}
  .rg-view button:hover{color:rgba(17,17,17,.8)}
  .rg-view button[aria-selected="true"]{color:#111}
  .rg-view button:focus-visible{outline:2px solid #111;outline-offset:2px}
  .rg-view svg{width:15px;height:15px;display:block}
  body.mobile .mf-wrap{align-items:flex-start;gap:12px}
  body.mobile .rg-view{margin-top:2px}

  body.rg-on,html.rg-on{overflow:hidden!important}
  body.rg-on .mf-sec{opacity:0!important;pointer-events:none!important;transition:opacity .4s ease}
  body.rg-on.project-inline-open,html.rg-on:has(body.project-inline-open){overflow:auto!important}
  body.project-inline-open .rg-stage,body.project-inline-open .rg-view{display:none!important}
  .rg-stage{position:fixed;z-index:10;top:128px;bottom:0;right:0;left:20vw;overflow:hidden;touch-action:pan-y;opacity:0;visibility:hidden;transition:opacity .35s ease,visibility 0s .35s;-webkit-user-select:none;user-select:none}
  .rg-stage.on{opacity:1;visibility:visible;transition:opacity .35s ease}
  .rg-stage.swap{opacity:0}
  .rg-item{position:absolute;left:0;top:0;will-change:transform,opacity;pointer-events:none}
  .rg-in{position:relative;width:100%;height:100%;overflow:hidden;background:#e9e9e7;transition:opacity .45s ease,filter .5s ease}
  .rg-in .media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;border-radius:0!important;display:block}
  .rg-stage.has-focus .rg-item:not(.rg-f) .rg-in{opacity:.35;filter:blur(1.5px)}
  .rg-item.rg-f .rg-in{box-shadow:0 30px 70px -30px rgba(0,0,0,.45)}
  .rg-label{position:absolute;left:0;top:0;width:min(86%,420px);text-align:center;font-family:Inter,'Diatype',-apple-system,sans-serif;color:#111;opacity:0;transition:opacity .4s ease;pointer-events:none}
  .rg-label.on{opacity:1}
  .rg-label b{display:block;font-size:24.4944px;font-weight:300;letter-spacing:-.02em;line-height:1.15}
  .rg-label span{display:block;margin-top:.7em;font-size:var(--pl-fs,12.393px);line-height:1.5;color:rgba(17,17,17,.6)}
  @media(max-width:767px){.rg-stage{left:0;top:150px}.rg-label b{font-size:19px}}
  @media(prefers-reduced-motion:reduce){.rg-thumb,.rg-stage,.rg-in,.rg-label{transition:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------------- the switch ---------------- */
  const ICON_GRID = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.2" y="2.2" width="4.6" height="4.6" rx="1"/><rect x="9.2" y="2.2" width="4.6" height="4.6" rx="1"/><rect x="2.2" y="9.2" width="4.6" height="4.6" rx="1"/><rect x="9.2" y="9.2" width="4.6" height="4.6" rx="1"/></svg>';
  const ICON_RING = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="5.8"/><circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none"/></svg>';
  const sw = document.createElement('div'); sw.className = 'rg-view'; sw.setAttribute('role', 'tablist'); sw.setAttribute('aria-label', 'View'); sw.dataset.v = 'grid';
  sw.innerHTML = `<span class="rg-thumb"></span><button type="button" role="tab" data-v="grid" aria-label="Grid view" title="Grid" aria-selected="true">${ICON_GRID}</button><button type="button" role="tab" data-v="ring" aria-label="Ring view" title="Ring" aria-selected="false" tabindex="-1">${ICON_RING}</button>`;
  wrap.appendChild(sw);
  const tabs = [...sw.querySelectorAll('button')];

  /* ---------------- ring state ---------------- */
  const stage = document.createElement('div'); stage.className = 'rg-stage'; stage.setAttribute('aria-hidden', 'true');
  const label = document.createElement('div'); label.className = 'rg-label'; label.innerHTML = '<b></b><span></span>';
  stage.appendChild(label);
  document.body.appendChild(stage);

  let mode = 'grid', items = [], cards = [], geo = null;
  let rot = 0, speed = 1, vel = 0, focus = -1, raf = 0, last = 0;
  let ptr = null, pType = 'mouse', drag = null, moved = false;
  let flight = null; // {t0, dir, dur}

  const visibleCards = () => [...bc.querySelectorAll('.mf-sec:not([hidden]) .pl-card')];

  function measure() {
    const w = stage.clientWidth, h = stage.clientHeight;
    const cy = h / 2;
    const R = Math.min(w, h) * (isMobile() ? 0.38 : 0.40);
    const n = items.length || 12;
    const chord = 2 * R * Math.sin(Math.PI / Math.max(n, 3));
    const cw = Math.min(R * (isMobile() ? 0.3 : 0.27), chord * 0.82);
    geo = { w, h, cx: w / 2, cy, R, cw, ch: cw * 4 / 3, S: isMobile() ? 3.1 : 2.3 };
  }

  function build(animateIn) {
    items.forEach(i => i.el.remove()); items = []; focus = -1;
    stage.classList.remove('has-focus'); label.classList.remove('on');
    cards = visibleCards();
    const c = cards.length; if (!c) return;
    const T = c * Math.ceil(12 / c);
    for (let i = 0; i < T; i++) {
      const card = cards[i % c];
      const el = document.createElement('div'); el.className = 'rg-item';
      const inner = document.createElement('div'); inner.className = 'rg-in';
      const m = card.querySelector('.media');
      if (m) {
        const cl = m.cloneNode(true); cl.removeAttribute('id'); cl.setAttribute('draggable', 'false');
        if (cl.tagName === 'VIDEO') { cl.muted = true; cl.loop = true; cl.setAttribute('playsinline', ''); cl.removeAttribute('controls'); cl.preload = 'auto'; cl.autoplay = false; cl.pause?.(); }
        inner.appendChild(cl);
      }
      el.appendChild(inner); stage.insertBefore(el, label);
      items.push({ el, card, i, f: 0, delay: i * 20, src: null });
    }
    measure();
  }

  const slotPos = (it, a) => ({ x: geo.cx + geo.R * Math.cos(a), y: geo.cy + geo.R * Math.sin(a) });
  const angleOf = it => (it.i / items.length) * Math.PI * 2 - Math.PI / 2 + rot;

  function captureSources() {
    const sr = stage.getBoundingClientRect();
    items.forEach(it => {
      const f = it.card.querySelector('.mi-frame') || it.card; const r = f.getBoundingClientRect();
      it.src = { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, s: Math.max(.2, r.width / geo.cw) };
    });
  }

  /* ---------------- frame loop ---------------- */
  function frame(ts) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (ts - (last || ts)) / 1000); last = ts;
    if (!geo) return;
    const hold = focus >= 0 || drag;
    speed += ((hold || reduce ? 0 : 1) - speed) * (1 - Math.exp(-dt / 0.13));
    if (!drag) { rot += BASE * speed * dt + vel * dt; vel *= Math.exp(-dt / 0.6); if (Math.abs(vel) < 1e-4) vel = 0; }
    const now = performance.now();
    const modal = document.body.classList.contains('pj-open');

    // pointer hit-testing (mouse) against slot boxes, sticky on the focused card
    if (pType === 'mouse' && mode === 'ring' && !flight) {
      let next = -1;
      if (ptr && !modal) {
        const inBox = (x, y, s) => ptr.x >= x - geo.cw * s / 2 && ptr.x <= x + geo.cw * s / 2 && ptr.y >= y - geo.ch * s / 2 && ptr.y <= y + geo.ch * s / 2;
        if (focus >= 0) {
          const it = items[focus], sp = slotPos(it, angleOf(it)), k = smooth(it.f);
          const cur = { x: lerp(sp.x, geo.cx, k), y: lerp(sp.y, geo.cy, k), s: lerp(1, geo.S, k) };
          if (inBox(sp.x, sp.y, 1.1) || inBox(cur.x, cur.y, cur.s)) next = focus;
        }
        if (next < 0) {
          let best = 1e9;
          items.forEach((it, idx) => { const sp = slotPos(it, angleOf(it)); if (inBox(sp.x, sp.y, 1)) { const d = Math.hypot(ptr.x - sp.x, ptr.y - sp.y); if (d < best) { best = d; next = idx; } } });
        }
      }
      setFocus(next);
    }

    const dur = flight ? flight.dur : 0;
    let done = true;
    items.forEach((it, idx) => {
      const a = angleOf(it), sp = slotPos(it, a);
      it.f += ((idx === focus ? 1 : 0) - it.f) * (1 - Math.exp(-dt / 0.12));
      let x = sp.x, y = sp.y, s = 1, op = 1;
      if (flight) {
        const raw = clamp((now - flight.t0 - it.delay) / dur, 0, 1);
        const p = flight.dir > 0 ? raw : 1 - raw;
        if (raw < 1) done = false;
        const e = easeOut(p);
        if (it.src) { x = lerp(it.src.x, sp.x, e); y = lerp(it.src.y, sp.y, e); s = lerp(it.src.s, 1, e); }
        op = flight.dir > 0 ? clamp(p * 3.2, 0, 1) : clamp(p * 1.6, 0, 1);
      }
      const k = smooth(clamp(it.f, 0, 1));
      x = lerp(x, geo.cx, k); y = lerp(y, geo.cy, k); s = lerp(s, geo.S, k);
      it.el.style.width = geo.cw + 'px'; it.el.style.height = geo.ch + 'px';
      it.el.style.transform = `translate3d(${(x - geo.cw / 2).toFixed(2)}px,${(y - geo.ch / 2).toFixed(2)}px,0) scale(${s.toFixed(4)})`;
      it.el.style.opacity = op.toFixed(3);
      it.el.style.zIndex = k > 0.01 ? 50 : 1;
    });
    if (flight && done) { const dir = flight.dir; flight = null; if (dir < 0) finishExit(); }
    if (label.classList.contains('on') && focus >= 0) {
      label.style.transform = `translate3d(${geo.cx - label.offsetWidth / 2}px,${geo.cy + geo.ch * geo.S / 2 + 16}px,0)`;
    }
  }

  function setFocus(n) {
    if (n === focus) return;
    const prev = items[focus]; if (prev) { prev.el.classList.remove('rg-f'); const v = prev.el.querySelector('video'); if (v && !v.dataset.userPaused) v.pause(); }
    focus = n;
    stage.classList.toggle('has-focus', n >= 0);
    if (n >= 0) {
      const it = items[n]; it.el.classList.add('rg-f');
      const v = it.el.querySelector('video'); if (v) v.play?.().catch(() => {});
      label.querySelector('b').textContent = it.card.dataset.plTitle || '';
      label.querySelector('span').textContent = it.card.dataset.plDesc || '';
      label.classList.add('on');
    } else label.classList.remove('on');
  }

  const startLoop = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
  const stopLoop = () => { cancelAnimationFrame(raf); raf = 0; };

  /* ---------------- enter / leave ---------------- */
  function enter(animate) {
    if (mode === 'ring') return;
    mode = 'ring';
    document.documentElement.classList.add('rg-on'); document.body.classList.add('rg-on');
    build(); if (!items.length) return;
    stage.classList.add('on');
    if (animate && !reduce) { captureSources(); flight = { t0: performance.now(), dir: 1, dur: 800 }; }
    else { flight = null; items.forEach(it => it.src = null); }
    startLoop();
  }
  function leave(animate) {
    if (mode !== 'ring') return;
    mode = 'leaving';
    setFocus(-1);
    document.documentElement.classList.remove('rg-on'); document.body.classList.remove('rg-on');
    const go = () => {
      if (animate && !reduce && items.length) {
        captureSources(); flight = { t0: performance.now(), dir: -1, dur: 700 };
      } else finishExit();
    };
    requestAnimationFrame(() => requestAnimationFrame(go));
  }
  function finishExit() {
    mode = 'grid'; stage.classList.remove('on'); setTimeout(() => { if (mode === 'grid') { items.forEach(i => i.el.remove()); items = []; stopLoop(); } }, 380);
    if (window.rsSite && window.rsSite.relayout) window.rsSite.relayout();
  }

  function setView(v, animate, persist) {
    sw.dataset.v = v; tabs.forEach(b => { const on = b.dataset.v === v; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    if (persist) { try { localStorage.setItem(KEY, v); } catch (e) {} }
    if (v === 'ring') enter(animate); else leave(animate);
  }
  sw.addEventListener('click', e => { const b = e.target.closest('button'); if (b && b.dataset.v !== sw.dataset.v) setView(b.dataset.v, true, true); });
  sw.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return; e.preventDefault();
    const v = e.key === 'ArrowRight' ? 'ring' : 'grid'; if (v !== sw.dataset.v) { setView(v, true, true); tabs.find(b => b.dataset.v === v).focus(); }
  });

  /* category filter: rebuild the ring once the sections have been swapped */
  const refilter = () => {
    if (mode !== 'ring') return;
    stage.classList.add('swap'); setFocus(-1);
    setTimeout(() => { if (mode !== 'ring') return; build(); items.forEach(it => it.src = null); flight = null; requestAnimationFrame(() => stage.classList.remove('swap')); }, 720);
  };
  wrap.addEventListener('click', e => { if (e.target.closest('.mf-bar button, .category-options button')) refilter(); });

  /* ---------------- pointer / touch ---------------- */
  const local = e => { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  stage.style.pointerEvents = 'auto';
  stage.addEventListener('pointermove', e => {
    pType = e.pointerType === 'mouse' ? 'mouse' : 'touch'; ptr = local(e);
    if (drag && e.pointerType !== 'mouse') {
      const dx = e.clientX - drag.x; if (Math.abs(dx) > 8) moved = true;
      if (moved) { const d = dx / geo.R; rot += d; vel = d / Math.max(.016, (e.timeStamp - drag.t) / 1000); drag.x = e.clientX; drag.t = e.timeStamp; }
    }
  });
  stage.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { ptr = null; } });
  stage.addEventListener('pointerdown', e => { pType = e.pointerType === 'mouse' ? 'mouse' : 'touch'; ptr = local(e); moved = false; if (pType === 'touch') drag = { x: e.clientX, t: e.timeStamp }; });
  const endDrag = () => { drag = null; vel = clamp(vel, -1.2, 1.2); };
  stage.addEventListener('pointerup', endDrag); stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('click', e => {
    if (moved) { moved = false; return; }
    const p = local(e); ptr = p;
    const hit = (x, y, s) => p.x >= x - geo.cw * s / 2 && p.x <= x + geo.cw * s / 2 && p.y >= y - geo.ch * s / 2 && p.y <= y + geo.ch * s / 2;
    if (pType === 'mouse') { if (focus >= 0) window.rsProject?.openCard(items[focus].card); return; }
    // touch: tap -> zoom to centre, tap again -> open, tap empty space -> release
    if (focus >= 0) {
      const it = items[focus], sp = slotPos(it, angleOf(it));
      if (hit(geo.cx, geo.cy, geo.S) || hit(sp.x, sp.y, 1.1)) { window.rsProject?.openCard(it.card); return; }
    }
    let best = -1, bd = 1e9;
    items.forEach((it, idx) => { const sp = slotPos(it, angleOf(it)); if (hit(sp.x, sp.y, 1.15)) { const d = Math.hypot(p.x - sp.x, p.y - sp.y); if (d < bd) { bd = d; best = idx; } } });
    setFocus(best);
  });

  addEventListener('resize', () => { if (mode === 'ring' && items.length) measure(); });

  /* restore the saved view */
  let saved = 'grid'; try { saved = localStorage.getItem(KEY) || 'grid'; } catch (e) {}
  if (saved === 'ring') requestAnimationFrame(() => setView('ring', false, false));
})();
