/* Afanin: small, dependency-free enhancements. Everything works without JavaScript. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var bar = doc.querySelector('[data-appbar]');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = doc.querySelector('[data-theme-toggle]');
  if (toggle) {
    var sync = function () { toggle.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false'); };
    sync();
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('aw-theme', next); } catch (e) { /* storage blocked */ }
      sync();
    });
  }

  var drawer = doc.getElementById('drawer');
  if (drawer && typeof drawer.showModal === 'function') {
    var opener = doc.querySelector('[data-drawer-open]'), closer = doc.querySelector('[data-drawer-close]');
    if (opener) { opener.addEventListener('click', function () { drawer.showModal(); }); }
    if (closer) { closer.addEventListener('click', function () { drawer.close(); }); }
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer || (e.target.closest && e.target.closest('.drawer__nav a'))) { drawer.close(); }
    });
    matchMedia('(min-width: 1000px)').addEventListener('change', function (m) { if (m.matches && drawer.open) { drawer.close(); } });
  }

  var counters = doc.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        co.unobserve(en.target);
        var el = en.target, end = parseInt(el.getAttribute('data-count'), 10), t0 = null;
        if (isNaN(end)) { return; }
        var step = function (t) {
          if (t0 === null) { t0 = t; }
          var p = Math.min((t - t0) / 1100, 1);
          el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) { requestAnimationFrame(step); }
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* Confirm destructive actions; block double submits. */
  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-confirm]');
    if (b && !window.confirm(b.getAttribute('data-confirm'))) { e.preventDefault(); }
  });
  doc.querySelectorAll('form[data-auth]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      if (!f.checkValidity()) { e.preventDefault(); f.reportValidity(); return; }
      var btn = f.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
    });
  });
})();
