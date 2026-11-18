/* Nile Harvest — small, dependency-free enhancements. The site works without JavaScript. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* App bar border on scroll */
  var bar = doc.querySelector('[data-appbar]');
  if (bar) {
    var onScroll = function () { bar.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Light / dark toggle (initial theme is set inline in <head> to avoid a flash) */
  var toggle = doc.querySelector('[data-theme-toggle]');
  if (toggle) {
    var sync = function () { toggle.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark' ? 'true' : 'false'); };
    sync();
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('nh-theme', next); } catch (e) { /* storage blocked: ignore */ }
      sync();
    });
  }

  /* Navigation drawer: native <dialog> gives focus trapping and Esc for free */
  var drawer = doc.getElementById('drawer');
  if (drawer && typeof drawer.showModal === 'function') {
    var opener = doc.querySelector('[data-drawer-open]');
    var closer = doc.querySelector('[data-drawer-close]');
    if (opener) {
      opener.addEventListener('click', function () { drawer.showModal(); });
    }
    if (closer) {
      closer.addEventListener('click', function () { drawer.close(); });
    }
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer || (e.target.closest && e.target.closest('.drawer__nav a'))) { drawer.close(); }
    });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', function (m) { if (m.matches && drawer.open) { drawer.close(); } });
  }

  /* Reveal on scroll */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Count-up numbers (Western digits in both languages for consistency) */
  var counters = doc.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        co.unobserve(en.target);
        var el = en.target;
        var end = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(end)) { return; }
        var t0 = null;
        var dur = 1200;
        var step = function (t) {
          if (t0 === null) { t0 = t; }
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) { requestAnimationFrame(step); }
        };
        el.textContent = '0';
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* Inquiry form: prevent double submit, validate before sending */
  var form = doc.querySelector('[data-inquiry]');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
        btn.firstChild.textContent = btn.getAttribute('data-sending') || '…';
      }
    });
  }
})();
