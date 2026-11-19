/* Yi live board: every page ships a still picture (img[data-yi-board]). Only devices with a mouse or trackpad swap it
   for the live board; phones, tablets and in-app browsers never load the nested demo frames. */
(function () {
  if (window.self !== window.top) return;
  var touch = matchMedia('(hover: none), (pointer: coarse)').matches ||
    /iPhone|iPad|iPod|Android|Mobile|MicroMessenger|Weibo|XHS|xiaohongshu|Instagram|FBAN|FBAV|Line\//i.test(navigator.userAgent);
  if (touch) return;
  function up(root) {
    (root.querySelectorAll ? root : document).querySelectorAll('img[data-yi-board]').forEach(function (im) {
      var f = document.createElement('iframe');
      f.src = im.getAttribute('data-yi-board'); f.title = im.alt || 'Yi'; f.setAttribute('loading', 'lazy'); f.tabIndex = -1;
      f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;pointer-events:none';
      im.replaceWith(f);
    });
  }
  function start() { up(document); new MutationObserver(function () { up(document); }).observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
