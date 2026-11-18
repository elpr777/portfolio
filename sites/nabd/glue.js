/* keeps the last two words of a text block together so no single word sits alone on the last line */
(function () {
  var SEL = 'h1,h2,h3,h4,p,li,dd,summary,figcaption,blockquote,label,.sub,.lead,.cap,.d';
  var NB = ' ', queued = false;
  function glue(root) {
    var els = root.querySelectorAll ? root.querySelectorAll(SEL) : [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i], n = el.lastChild;
      while (n && n.nodeType === 1 && !n.firstChild) n = n.previousSibling;
      while (n && n.nodeType === 1) n = n.lastChild;
      if (!n || n.nodeType !== 3) continue;
      var t = n.nodeValue;
      if (!/\S\s+\S+\s*$/.test(t) || (t.trim().split(/\s+/).length < 3 && el.childNodes.length === 1)) continue;
      var v = t.replace(/(\S)\s+(\S+)(\s*)$/, '$1' + NB + '$2$3');
      if (v !== t) n.nodeValue = v;
    }
  }
  function run() { queued = false; glue(document); }
  function sched() { if (!queued) { queued = true; requestAnimationFrame(run); } }
  new MutationObserver(sched).observe(document.body, { childList: true, subtree: true });
  sched();
})();
