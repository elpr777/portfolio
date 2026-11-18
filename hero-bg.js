/* Hero background (creative code): a live topographic field.
   A smooth scalar field is sampled on a coarse grid every frame and contoured with marching squares.
   The pointer raises a hill, taps send ripples through it. Pauses off-screen / hidden tab,
   slows to a gentle drift for reduced motion, DPR capped at 2. */
(function () {
  "use strict";
  var RM = matchMedia("(prefers-reduced-motion: reduce)");
  function init(cv) {
    if (cv.__hb) return; cv.__hb = 1;
    var ctx = cv.getContext("2d", { alpha: false }); if (!ctx) return;
    var hero = cv.parentNode, W = 0, H = 0, cs = 16, nx = 0, ny = 0, F = null, raf = 0, vis = true, t = 0;
    var tx = -9999, ty = -9999, px = -9999, py = -9999, pw = 0, ripples = [];
    var ground = "#D4FF3A"; // fixed: a computed colour can be altered by browser force-dark
    var LV = [], STEP = .34, i0;
    for (i0 = -9; i0 <= 9; i0++) LV.push(i0 * STEP);
    function size() {
      var r = hero.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cs = W < 700 ? 18 : 14; nx = Math.ceil(W / cs) + 1; ny = Math.ceil(H / cs) + 1;
      F = new Float32Array((nx + 1) * (ny + 1));
    }
    function field() {
      var kf = W < 700 ? 2.3 : 1, sx = .0042 * kf, sy = .0058 * kf, k = 0, hx = px, hy = py;
      for (var j = 0; j <= ny; j++) {
        var y = j * cs;
        for (var i = 0; i <= nx; i++, k++) {
          var x = i * cs;
          var v = Math.sin(x * sx + t * .42) * 1.15 + Math.cos(y * sy - t * .31) * 1.05
                + Math.sin((x + y) * .0027 * kf + t * .22) * 1.2 + Math.sin(Math.hypot(x - W * .5, y - H * .45) * .006 * kf - t * .5) * 1.1;
          if (pw > .01) { var dx = x - hx, dy = y - hy; v += pw * 3.1 * Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150)); }
          for (var q = 0; q < ripples.length; q++) {
            var rp = ripples[q], d = Math.hypot(x - rp.x, y - rp.y), a = (d - rp.a * 420) * .028;
            v += Math.cos(a) * Math.exp(-a * a * .5) * rp.s * 1.6;
          }
          F[k] = v;
        }
      }
    }
    function iso(l, a, b) { return (l - a) / (b - a); }
    function draw() {
      ctx.fillStyle = ground; ctx.fillRect(0, 0, W, H);
      var row = nx + 1;
      for (var li = 0; li < LV.length; li++) {
        var l = LV[li], major = (li % 4 === 1);
        ctx.beginPath();
        for (var j = 0; j < ny; j++) {
          for (var i = 0; i < nx; i++) {
            var k = j * row + i, a = F[k], b = F[k + 1], c = F[k + row + 1], d = F[k + row];
            var mn = a < b ? a : b, mx = a < b ? b : a; if (c < mn) mn = c; if (c > mx) mx = c; if (d < mn) mn = d; if (d > mx) mx = d;
            if (l < mn || l > mx) continue;
            var cse = (a >= l ? 8 : 0) | (b >= l ? 4 : 0) | (c >= l ? 2 : 0) | (d >= l ? 1 : 0);
            if (cse === 0 || cse === 15) continue;
            var x0 = i * cs, y0 = j * cs;
            var T = [x0 + iso(l, a, b) * cs, y0], R = [x0 + cs, y0 + iso(l, b, c) * cs], B = [x0 + iso(l, d, c) * cs, y0 + cs], Lf = [x0, y0 + iso(l, a, d) * cs];
            var s;
            switch (cse) {
              case 1: case 14: s = [Lf, B]; break;
              case 2: case 13: s = [B, R]; break;
              case 3: case 12: s = [Lf, R]; break;
              case 4: case 11: s = [T, R]; break;
              case 5: s = [T, R, Lf, B]; break;
              case 6: case 9: s = [T, B]; break;
              case 7: case 8: s = [T, Lf]; break;
              case 10: s = [T, Lf, R, B]; break;
            }
            for (var m = 0; m < s.length; m += 2) { ctx.moveTo(s[m][0], s[m][1]); ctx.lineTo(s[m + 1][0], s[m + 1][1]); }
          }
        }
        ctx.lineWidth = major ? 1.5 : .8; ctx.strokeStyle = major ? "rgba(10,10,10,.92)" : "rgba(10,10,10,.5)"; ctx.stroke();
      }
      // soft lemon halo behind the copy so the lines never fight the text
      var gr = ctx.createRadialGradient(W * .5, H * .46, 0, W * .5, H * .46, Math.max(W * .55, H * .5));
      gr.addColorStop(0, "rgba(212,255,58,.88)"); gr.addColorStop(.55, "rgba(212,255,58,.6)"); gr.addColorStop(1, "rgba(212,255,58,0)");
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    }
    function frame() {
      raf = 0; if (!cv.isConnected) return;
      t += RM.matches ? .004 : .012; pw += ((px > -999 ? 1 : 0) - pw) * .06;
      if (tx > -999) { if (px < -999) { px = tx; py = ty; } px += (tx - px) * .12; py += (ty - py) * .12; }
      for (var q = ripples.length - 1; q >= 0; q--) { var rp = ripples[q]; rp.a += .012; rp.s *= .985; if (rp.a > 1.6) ripples.splice(q, 1); }
      field(); draw();
      if (vis) raf = requestAnimationFrame(frame);
    }
    function start() { if (!raf && vis && cv.isConnected) raf = requestAnimationFrame(frame); }
    function pos(e) { var r = hero.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; }
    size(); start();
    hero.addEventListener("pointermove", pos, { passive: true });
    hero.addEventListener("pointerdown", function (e) { pos(e); if (ripples.length < 4) ripples.push({ x: tx, y: ty, a: 0, s: 1 }); }, { passive: true });
    hero.addEventListener("pointerleave", function () { tx = ty = px = py = -9999; }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting && !document.hidden; vis ? start() : (raf && cancelAnimationFrame(raf), raf = 0); }).observe(hero);
    document.addEventListener("visibilitychange", function () { vis = !document.hidden; vis ? start() : (raf && cancelAnimationFrame(raf), raf = 0); });
    var rt; addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); start(); }, 150); });
  }
  function scan() { var l = document.querySelectorAll("canvas.hbg"); for (var i = 0; i < l.length; i++) init(l[i]); }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();
