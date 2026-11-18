/* Hero background: generative flow field (creative code). Ink strokes drift on the lemon ground,
   bend around the pointer, pause off-screen / hidden tab, and render one still frame for reduced motion. */
(function () {
  "use strict";
  var RM = matchMedia("(prefers-reduced-motion: reduce)");
  function init(cv) {
    if (cv.__hb) return; cv.__hb = 1;
    var ctx = cv.getContext("2d", { alpha: false }); if (!ctx) return;
    var hero = cv.parentNode, W = 0, H = 0, dpr = 1, P = [], raf = 0, vis = true, t = 0;
    var mx = -9999, my = -9999, mv = 0;
    var ground = "#D4FF3A", ink = "10,10,10";
    try { var g = getComputedStyle(hero).backgroundColor; if (g) ground = g; } catch (e) {}
    function size() {
      var r = hero.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = ground; ctx.fillRect(0, 0, W, H);
      var n = Math.round(Math.min(900, Math.max(220, W * H / 2600)));
      P = []; for (var i = 0; i < n; i++) P.push(seed());
    }
    function seed() { return { x: Math.random() * W, y: Math.random() * H, px: 0, py: 0, a: Math.random() * .5 + .18, l: 0 }; }
    // cheap smooth field: layered sines (no external noise lib)
    function ang(x, y) {
      var s = .0036;
      return Math.sin(x * s + t * .35) * 1.9 + Math.cos(y * s * 1.3 - t * .27) * 1.7 + Math.sin((x + y) * s * .7 + t * .18) * 1.2;
    }
    function step(draw) {
      var R = Math.min(W, H) * .22;
      for (var i = 0; i < P.length; i++) {
        var p = P[i], a = ang(p.x, p.y), sp = 1.25;
        var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        var vx = Math.cos(a) * sp, vy = Math.sin(a) * sp;
        if (d2 < R * R) { var d = Math.sqrt(d2) || 1, f = (1 - d / R) * 3.2 * (.4 + mv); vx += dx / d * f - dy / d * f * .8; vy += dy / d * f + dx / d * f * .8; }
        p.px = p.x; p.py = p.y; p.x += vx; p.y += vy; p.l++;
        if (draw) { ctx.strokeStyle = "rgba(" + ink + "," + p.a + ")"; ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke(); }
        if (p.x < -5 || p.x > W + 5 || p.y < -5 || p.y > H + 5 || p.l > 260) { p.x = Math.random() * W; p.y = Math.random() * H; p.px = p.x; p.py = p.y; p.l = 0; }
      }
    }
    function frame() {
      raf = 0; if (!cv.isConnected) return;
      t += .016; mv *= .94;
      ctx.fillStyle = ground; ctx.globalAlpha = .09; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
      ctx.lineWidth = .9; step(true);
      if (vis && !RM.matches) raf = requestAnimationFrame(frame);
    }
    function start() { if (!raf && vis && !RM.matches && cv.isConnected) raf = requestAnimationFrame(frame); }
    function still() { ctx.fillStyle = ground; ctx.fillRect(0, 0, W, H); ctx.lineWidth = .9; t = 3; for (var k = 0; k < 90; k++) { t += .016; step(true); } }
    size();
    if (RM.matches) still(); else start();
    function move(e) { var r = hero.getBoundingClientRect(); var x = e.clientX - r.left, y = e.clientY - r.top; mv = Math.min(1, mv + Math.hypot(x - mx, y - my) * .01); mx = x; my = y; }
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", function () { mx = my = -9999; }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting && !document.hidden; vis ? start() : (raf && cancelAnimationFrame(raf), raf = 0); }).observe(hero);
    document.addEventListener("visibilitychange", function () { vis = !document.hidden; vis ? start() : (raf && cancelAnimationFrame(raf), raf = 0); });
    var rt; addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); RM.matches ? still() : start(); }, 150); });
    RM.addEventListener && RM.addEventListener("change", function () { RM.matches ? (raf && cancelAnimationFrame(raf), raf = 0, still()) : start(); });
  }
  function scan() { var l = document.querySelectorAll("canvas.hbg"); for (var i = 0; i < l.length; i++) init(l[i]); }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();
