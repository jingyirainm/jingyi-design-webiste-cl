(function(){
  var h=document.documentElement;
  if(!h.classList.contains('hs-on'))return;
  var hs=document.querySelector('.hs');if(!hs)return;
  var text=hs.querySelector('.hs-text'),bg=hs.querySelector('.hs-bg'),meta=hs.querySelector('.hs-meta'),hint=hs.querySelector('.hs-hint');
  var side=document.querySelector('.pin-left'),main=document.querySelector('main.main');
  // stagger words
  var n=0;(function wrap(el){
    Array.prototype.slice.call(el.childNodes).forEach(function(c){
      if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}var s=document.createElement('span');s.className='hs-w';s.style.animationDelay=(.15+n++*.06)+'s';s.textContent=t;f.appendChild(s)});c.parentNode.replaceChild(f,c)}
      else if(c.nodeType===1&&!c.classList.contains('hs-w'))wrap(c)})
  })(text);
  var tgt=null,raf=0,mq=window.matchMedia('(max-width:767px)');
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
  function ss(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)}
  function measure(){
    // landing spot = sidebar blurb ("Product designer in New York.")
    var el=null,ps=document.querySelectorAll('.pin-left bodycopy, .pin-left bodycopy *');
    for(var i=0;i<ps.length;i++){if(/Product designer/i.test(ps[i].textContent)&&ps[i].children.length<3&&ps[i].textContent.length<80){el=ps[i];}}
    var r=el?el.getBoundingClientRect():{left:53,top:236,height:20};
    tgt={x:r.left,y:r.top+r.height/2}
  }
  function frame(){
    raf=0;
    if(mq.matches){hs.style.display='none';return}
    var vh=window.innerHeight,y=window.scrollY||0,p=Math.min(1,Math.max(0,y/(vh*.85)));
    if(!tgt)measure();
    var e=ease(p),s=1-.8*e;
    var r=text.offsetWidth,hgt=text.offsetHeight;
    // text natural centre = viewport centre; move so its left edge lands at tgt.x, centre-y at tgt.y
    var cx=window.innerWidth/2,cy=vh/2;
    var tx=(tgt.x+r*s/2-cx)*e,ty=(tgt.y-cy)*e;
    text.style.transform='translate('+tx.toFixed(1)+'px,'+ty.toFixed(1)+'px) scale('+s.toFixed(4)+')';
    text.style.opacity=(1-ss(.62,.95,p)).toFixed(3);
    bg.style.opacity=(1-ss(.12,.8,p)).toFixed(3);
    meta.style.opacity=(.78*(1-ss(0,.2,p))).toFixed(3);
    hint.style.opacity=(.7*(1-ss(0,.12,p))).toFixed(3);
    var so=ss(.45,.95,p).toFixed(3);
    if(side)side.style.opacity=so;
    hs.style.visibility=p>=1?'hidden':'visible';
  }
  function req(){if(!raf)raf=requestAnimationFrame(frame)}
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',function(){tgt=null;req()});
  mq.addEventListener&&mq.addEventListener('change',function(){location.reload()});
  window.addEventListener('load',function(){tgt=null;req()});
  frame();
})();
