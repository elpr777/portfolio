/* HAZE — static SPA. Dynamic text only via textContent; nothing is transmitted. */
(() => {
'use strict';
const { CAT, BR, COL, P, JOURNAL, FAQ, HOT, MAIL, WA, ADDR } = window.D;
const IMG = 'img/', TEL = (n) => 'tel:' + n.replace(/[^+\d]/g, '');
const S = { lang: 'ar', theme: 'light', bag: [], wish: [], menu: false, flt: false, fk: '', done: null };
const X = (a, e) => (S.lang === 'ar' ? a : e);
const pick = (o) => o[S.lang];
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
const prod = (id) => P.find((x) => x.id === id);
const brand = (id) => BR.find((x) => x.id === id);
const cat = (id) => CAT.find((x) => x.id === id);
const num = (n) => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: 0 }).format(n);
const egp = (n) => `${num(n)} ${X('ج.م', 'EGP')}`;
const hits = []; function limited() { const n = Date.now(); while (hits.length && n - hits[0] > 60000) hits.shift(); if (hits.length >= 5) { toast(X('محاولات كثيرة. انتظر دقيقة وحاول مرة أخرى.', 'Too many attempts. Please wait a minute and try again.')); return true; } hits.push(n); return false; }
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/, PHONE = /^\+?[0-9][0-9 ()\-]{6,19}$/;
const mkRef = () => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = new Uint32Array(6); crypto.getRandomValues(b); return 'HZ-' + Array.from(b, (x) => a[x % a.length]).join(''); };
const FREE = 1500, SHIP = 60;

/* ---------- persistence ---------- */
const validLine = (l) => l && typeof l === 'object' && prod(l.id) && prod(l.id).s.includes(l.s) && prod(l.id).k.includes(l.c) && Number.isInteger(l.q) && l.q >= 1 && l.q <= 9;
(() => {
  S.lang = load('haze_lang') === 'en' ? 'en' : 'ar';
  S.theme = load('haze_theme') === 'dark' ? 'dark' : 'light';
  const b = load('haze_bag'); if (Array.isArray(b)) S.bag = b.filter(validLine).slice(0, 20).map((l) => ({ id: l.id, s: l.s, c: l.c, q: l.q }));
  const w = load('haze_wish'); if (Array.isArray(w)) S.wish = [...new Set(w.filter((x) => typeof x === 'string' && prod(x)))].slice(0, 40);
})();
const saveBag = () => save('haze_bag', S.bag), saveWish = () => save('haze_wish', S.wish);
const count = () => S.bag.reduce((s, l) => s + l.q, 0);
const subtotal = () => S.bag.reduce((s, l) => s + prod(l.id).p * l.q, 0);

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) { const v = props[k]; if (v === undefined || v === null || v === false) continue; if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'text') e.textContent = v; else if (k === 'bg') e.style.background = v; else e.setAttribute(k, v === true ? '' : v); }
  add(e, kids); return e;
}
function add(e, kids) { for (const c of kids.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); } }
const ICON = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', menu: '<path d="M4 8h16M4 16h16"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>', heart: '<path d="M12 20s-7-4.500-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.500-7 10-7 10Z"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.500-4.500"/>', leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c3-5 6-8 10-10"/>',
  loop: '<path d="M20 12a8 8 0 0 1-14 5M4 12a8 8 0 0 1 14-5"/><path d="M18 3v4h-4M6 21v-4h4"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
};
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // constants only
let toastT;
function toast(msg, href, label) { let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); } e.replaceChildren(...[h('span', null, msg), href ? h('a', { href, onclick: () => { e.hidden = true; } }, label) : null].filter(Boolean)); e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 3800); }
let keepNext = false;
const go = (hash, fk) => { keepNext = true; S.fk = fk || ''; if (location.hash === hash) render(); else location.hash = hash; };
const qs = (o) => { const a = Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== '' && o[k] !== null).map((k) => k + '=' + encodeURIComponent(o[k])); return a.length ? '?' + a.join('&') : ''; };
function field(label, ctrl, id) { return h('div', { class: 'fld' }, h('label', { for: id, text: label }), ctrl, h('div', { class: 'err', id: id + '-e', role: 'alert' })); }
function setErr(c, msg) { const e = document.getElementById(c.id + '-e'); if (e) e.textContent = msg || ''; if (msg) { c.setAttribute('aria-invalid', 'true'); c.setAttribute('aria-describedby', c.id + '-e'); } else { c.removeAttribute('aria-invalid'); c.removeAttribute('aria-describedby'); } return !msg; }
const E_REQ = () => X('هذا الحقل مطلوب', 'This field is required'), E_MAIL = () => X('اكتب بريدًا صحيحًا', 'Enter a valid email'), E_PH = () => X('اكتب رقم موبايل صحيحًا', 'Enter a valid mobile number');
const hp = () => h('input', { class: 'hp', type: 'text', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' });
const bd = (t) => h('bdi', { dir: 'ltr', class: 'num', text: t });
const dots = (p) => h('div', { class: 'dots', 'aria-label': p.k.map((k) => pick(COL[k][1])).join(', '), role: 'img' }, p.k.map((k) => h('i', { class: 'dot', bg: COL[k][0] })));

/* ---------- shared ---------- */
const NAV = [['shop', ['تسوّق', 'Shop']], ['shop?new=1', ['لسه نازل', 'Just in']], ['about', ['عن هيز', 'About']], ['contact', ['تواصل', 'Contact']]];
function header(route, q) {
  const nav = h('nav', { class: 'nav', id: 'nav', 'data-open': String(S.menu), 'aria-label': X('التنقل الرئيسي', 'Main') }, NAV.map(([r, l]) => { const base = r.split('?')[0], isNew = r.includes('new'); return h('a', { href: '#/' + r, 'aria-current': base === route && (isNew ? q.new === '1' : !(route === 'shop' && q.new === '1')) ? 'page' : undefined, onclick: () => { S.menu = false; } }, X(l[0], l[1])); }));
  return [
    h('aside', { class: 'top', 'aria-label': X('إعلان', 'Announcement') }, X(`الشحن ببلاش فوق ${egp(FREE)} · ادفع كاش وإنت بتستلم · `, `Free shipping over ${egp(FREE)} · Pay on delivery · `), h('a', { href: TEL(HOT) }, bd(HOT))),
    h('header', { class: 'hdr' }, h('div', { class: 'wrap' }, h('div', { class: 'hl' }, nav, h('button', { class: 'ib burger', type: 'button', 'aria-expanded': String(S.menu), 'aria-controls': 'nav', 'aria-label': X('القائمة', 'Menu'), onclick: () => { S.menu = !S.menu; render(); } }, ic(S.menu ? 'x' : 'menu'))),
      h('a', { class: 'brand', href: '#/', 'aria-label': X('هيز — الرئيسية', 'HAZE — home'), text: X('هيز', 'HAZE') }),
      h('div', { class: 'hact' },
        h('a', { class: 'ib', href: '#/shop', 'aria-label': X('بحث', 'Search') }, ic('search')),
        h('button', { class: 'ib', type: 'button', 'aria-label': S.lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية', onclick: () => { S.lang = S.lang === 'ar' ? 'en' : 'ar'; save('haze_lang', S.lang); applyDoc(); render(); } }, S.lang === 'ar' ? 'EN' : 'ع'),
        h('button', { class: 'ib', type: 'button', 'aria-label': X('تبديل الوضع الليلي', 'Toggle dark mode'), onclick: () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save('haze_theme', S.theme); applyDoc(); render(); } }, ic(S.theme === 'dark' ? 'sun' : 'moon')),
        h('a', { class: 'ib badge', href: '#/saved', 'aria-label': X('المفضلة', 'Saved') }, ic('heart'), S.wish.length ? h('span', { class: 'n', text: num(S.wish.length) }) : null),
        h('a', { class: 'ib badge', href: '#/bag', 'aria-label': X('الشنطة', 'Bag') }, ic('bag'), count() ? h('span', { class: 'n', text: num(count()) }) : null)))) ];
}
function footer() {
  const L = (r, t) => h('a', { href: '#/' + r, text: t });
  return h('footer', { class: 'ftr' }, h('div', { class: 'wrap' },
    h('div', { class: 'g' },
      h('div', null, h('a', { class: 'brand', href: '#/', text: X('هيز', 'HAZE') }), h('p', { style: 'margin-block-start:1rem;max-inline-size:30ch', text: X('ستريت وير للجيل الجديد.', 'Streetwear for the new gen.') })),
      h('div', null, h('h2', { text: X('تسوّق', 'Shop') }), CAT.map((c) => L('shop' + qs({ cat: c.id }), pick(c.n)))),
      h('div', null, h('h2', { text: X('هيز', 'HAZE') }), L('about', X('عن هيز', 'About')), L('saved', X('المفضلة', 'Saved')), L('bag', X('الشنطة', 'Bag')), L('contact', X('تواصل', 'Contact'))),
      h('div', null, h('h2', { text: X('تواصل', 'Reach us') }), h('p', { style: 'font-size:.84rem', text: pick(ADDR) }), h('a', { href: TEL(HOT) }, bd(HOT)), h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL })), h('a', { href: 'https://wa.me/' + WA.replace(/\D/g, ''), rel: 'noopener noreferrer', target: '_blank' }, X('واتساب', 'WhatsApp')))),
    h('div', { class: 'cp' }, h('span', { text: X('© 2026 هيز. كل الحقوق محفوظة.', '© 2026 HAZE. All rights reserved.') }), h('span', { text: X('الأسعار بالجنيه المصري.', 'Prices in EGP.') }))));
}
const mbar = () => h('aside', { class: 'mbar', 'aria-label': X('إجراءات سريعة', 'Quick actions') }, h('a', { class: 'btn btn--o', href: '#/shop' }, X('تسوّق', 'Shop')), h('a', { class: 'btn', href: '#/bag' }, ic('bag'), X('الشنطة', 'Bag'), count() ? ' (' + num(count()) + ')' : ''));
function card(p, lvl) {
  const on = S.wish.includes(p.id);
  return h('article', { class: 'pc' },
    h('a', { class: 'im', href: '#/p/' + p.id, tabindex: -1, 'aria-hidden': 'true' }, h('img', { src: IMG + p.i + '.webp', alt: '', loading: 'lazy', decoding: 'async', width: 644, height: 800 })),
    p.nw ? h('span', { class: 'tag', text: X('جديد', 'New') }) : null,
    h('button', { class: 'heart', type: 'button', 'aria-pressed': String(on), 'aria-label': (on ? X('إزالة من المفضلة: ', 'Remove from saved: ') : X('أضف إلى المفضلة: ', 'Save: ')) + pick(p.n), 'data-k': 'w-' + p.id, onclick: () => toggleWish(p.id) }, ic('heart')),
    h('div', { class: 'b' }, h('span', { class: 'br', text: brand(p.b).n }), h(lvl || 'h3', null, h('a', { href: '#/p/' + p.id, text: pick(p.n) })), h('span', { class: 'pr num', text: egp(p.p) }), dots(p)));
}
function toggleWish(id) { S.wish = S.wish.includes(id) ? S.wish.filter((x) => x !== id) : [...S.wish, id].slice(0, 40); saveWish(); S.fk = 'w-' + id; keepNext = true; render(); }
function sh(kick, title, p, link, lvl) { return h('div', { class: 'sh' }, h('div', null, kick ? h('span', { class: 'cap', text: kick }) : null, h(lvl || 'h2', { text: title }), p ? h('p', { text: p }) : null), link); }
const faq = () => h('div', { class: 'faq' }, FAQ.map((f) => h('details', { class: 'acc' }, h('summary', { text: pick(f.q) }), h('p', { text: pick(f.a) }))));

/* ---------- views ---------- */
function newsletter() {
  const mail = h('input', { class: 'in', id: 'nm', type: 'email', maxlength: 120, autocomplete: 'email', dir: 'ltr', placeholder: X('إيميلك', 'Your email'), 'aria-label': X('إيميلك', 'Your email'), 'data-k': 'nm' });
  return h('section', { class: 'news' }, h('div', { class: 'wrap sec' }, h('span', { class: 'stk', text: X('ادخل الكلوب', 'JOIN THE CLUB') }), h('h2', { text: X('كن أول واحد يعرف', 'Be first to know') }), h('p', { text: X('إيميل واحد في الشهر. وعد، مفيش سبام.', 'One email a month. Promise, no spam.') }),
    h('form', { class: 'nf', novalidate: true, onsubmit: (e) => { e.preventDefault(); if (e.target.website && e.target.website.value) return; if (limited()) return; if (!setErr(mail, EMAIL.test(mail.value.trim()) ? '' : E_MAIL())) return; mail.value = ''; toast(X('دخلت الكلوب. استنى دروبك.', 'You are in. Watch your inbox.')); } }, hp(), mail, h('button', { class: 'btn', type: 'submit', text: X('ادخل', 'Join') })), h('div', { class: 'err', id: 'nm-e', role: 'alert', style: 'margin-block-start:.4rem' })));
}
function vHome() {
  const feat = P.filter((p) => p.nw).concat(P.filter((p) => !p.nw)).slice(0, 8);
  const words = [X('دروب جديدة كل شهر', 'NEW DROPS MONTHLY'), X('وصلنا كل مصر', 'NO CAP FAST SHIPPING'), X('طباعة سيلك سكرين', 'SCREEN PRINTED'), X('كاش عند الاستلام', 'PAY ON DELIVERY')];
  const mq = (hid) => h('div', { class: 'mq-t', 'aria-hidden': hid ? 'true' : undefined }, [0, 1, 2].map(() => words.map((w) => h('span', null, w, h('i', { text: '✱' })))));
  return [
    h('section', { class: 'hero' }, h('div', { class: 'wrap hw' }, h('div', { class: 'hin' }, h('span', { class: 'stk', text: X('الدروب الجديد نزل', 'NEW DROP JUST LANDED') }), h('h1', { text: X('خليك هيزي.', 'stay hazy.') }), h('p', { class: 'sub', text: X('هوديز بطباعة تجنن، بناطيل واسعة، وحاجات تكمّل اللوك.', 'Loud printed hoodies, baggy pants and the extras that finish the fit.') }), h('div', { class: 'hb' }, h('a', { class: 'btn', href: '#/shop' }, X('هات الدروب', 'Cop the drop'), ic('arrow', 'flip')), h('a', { class: 'btn btn--o', href: '#/shop?new=1' }, X('لسه نازل', 'Just in')))),
      h('div', { class: 'hi' }, h('img', { src: IMG + 'hero.webp', alt: X('شاب بهودي لافندر وكاب في شارع', 'A young person in a lilac hoodie and cap on a street'), width: 1024, height: 572 }), h('span', { class: 'ball', 'aria-hidden': 'true' }, h('b', { text: 'Y2K' }), X('للأبد', 'forever')), h('div', { class: 'hcol' }, [['h2', X('هوديز', 'Hoodies')], ['p1', X('بناطيل', 'Pants')]].map(([img, lb]) => h('a', { class: 'hpc', href: '#/shop', 'aria-label': lb }, h('img', { src: IMG + img + '.webp', alt: '', width: 597, height: 796, loading: 'lazy' }), h('span', { text: lb }))))))),
    h('div', { class: 'mq', 'aria-hidden': 'true' }, mq(false)),
    h('section', { class: 'wrap sec' }, sh(X('اختار فايبك', 'PICK YOUR VIBE'), X('إنت بتلبس إيه؟', 'What are we wearing?'), null, h('a', { class: 'lnk', href: '#/shop' }, X('الكل', 'All'), ic('arrow', 'flip'))),
      h('div', { class: 'cats' }, CAT.map((c) => h('a', { href: '#/shop' + qs({ cat: c.id }) }, h('img', { src: IMG + c.img + '.webp', alt: '', loading: 'lazy', decoding: 'async', width: 597, height: 796 }), h('span', { text: pick(c.n) }))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, sh(X('لسه نازل', 'JUST DROPPED'), X('الدروب الجديد', 'Fresh drops'), null, h('a', { class: 'lnk', href: '#/shop' }, X('تسوّق الكل', 'Shop all'), ic('arrow', 'flip'))), h('div', { class: 'grid' }, feat.map((p) => card(p)))),
    h('section', { class: 'mat' }, h('img', { src: IMG + 'pr.webp', alt: X('طباعة سيلك سكرين على قماش لافندر', 'Screen printing on lilac fabric'), loading: 'lazy', decoding: 'async', width: 597, height: 796 }),
      h('div', { class: 'tx' }, h('span', { class: 'stk', text: X('مطبوعة بإيدينا', 'PRINTED BY HAND') }), h('h2', { text: X('كل هودي ليه حكاية', 'Every hoodie hits different') }), h('p', { text: X('سيلك سكرين على قطن تقيل ٤٠٠ جرام. الطبعة مش هتبهت.', 'Screen printed on heavy 400 gsm cotton. The print will not fade.') }),
        h('div', { class: 'ics' }, [['loop', X('٤٠٠ جرام', '400 gsm')], ['leaf', X('قطن ١٠٠٪', '100% cotton')], ['globe', X('صنع في القاهرة', 'Made in Cairo')]].map(([i, t]) => h('div', null, ic(i), h('span', { text: t })))), h('a', { class: 'btn', href: '#/shop?cat=hoodie' }, X('وريني الهوديز', 'Show me hoodies'), ic('arrow', 'flip'))),
      h('img', { src: IMG + 'l2.webp', alt: X('بنت بكارجو وهودي قصير', 'A woman in cargo pants and a cropped hoodie'), loading: 'lazy', decoding: 'async', width: 597, height: 796 })),
    h('section', { class: 'wrap sec' }, sh(X('فيت تشيك', 'FIT CHECK'), X('لوكات الشارع', 'Street fits'), null, h('a', { class: 'lnk', href: '#/about' }, X('عن هيز', 'About'), ic('arrow', 'flip'))),
      h('div', { class: 'jr' }, JOURNAL.map((j, i) => h('a', { href: '#/shop' }, h('img', { src: IMG + j.i + '.webp', alt: '', loading: 'lazy', decoding: 'async', width: 597, height: 796 }), h('span', null, `0${i + 1}. ${pick(j.t)}`))))),
    newsletter() ];
}
const SORTS = { new: ['الأحدث', 'Newest'], low: ['السعر: الأقل', 'Price: low to high'], high: ['السعر: الأعلى', 'Price: high to low'] };
function vShop(q) {
  const c = cat(q.cat) ? q.cat : '', b = brand(q.br) ? q.br : '', col = COL[q.col] ? q.col : '', so = SORTS[q.sort] ? q.sort : 'new', term = (q.q || '').toLowerCase(), nw = q.new === '1';
  let list = P.filter((p) => (!c || p.c === c) && (!b || p.b === b) && (!col || p.k.includes(col)) && (!nw || p.nw) && (!term || (p.n.ar + ' ' + p.n.en + ' ' + brand(p.b).n).toLowerCase().includes(term)));
  if (so === 'low') list = [...list].sort((a, z) => a.p - z.p); else if (so === 'high') list = [...list].sort((a, z) => z.p - a.p);
  const nav = (o, fk) => go('#/shop' + qs({ cat: c, br: b, col, sort: so === 'new' ? '' : so, q: term, new: nw ? '1' : '', ...o }), fk);
  const grp = (title, items, cur, key) => h('div', null, h('h2', { text: title }), h('div', { class: 'ls' }, items.map(([k, l]) => h('button', { class: 'o', type: 'button', 'aria-pressed': String(cur === k), 'data-k': key + k, onclick: () => nav({ [key]: cur === k ? '' : k }, key + k), text: l }))));
  const search = h('input', { class: 'in', type: 'search', maxlength: 40, value: term, placeholder: X('ابحث', 'Search'), 'aria-label': X('ابحث في المنتجات', 'Search products'), 'data-k': 'sq', onchange: (e) => nav({ q: e.target.value.trim().slice(0, 40) }, 'sq') });
  const flt = h('div', { class: 'flt', id: 'flt', 'data-open': String(S.flt) }, search,
    grp(X('التصنيف', 'Category'), CAT.map((x) => [x.id, pick(x.n)]), c, 'cat'), grp(X('الدروب', 'Drop'), BR.map((x) => [x.id, x.n]), b, 'br'),
    h('div', null, h('h2', { text: X('اللون', 'Colour') }), h('div', { class: 'sw' }, Object.keys(COL).map((k) => h('button', { type: 'button', bg: COL[k][0], 'aria-pressed': String(col === k), 'aria-label': pick(COL[k][1]), title: pick(COL[k][1]), 'data-k': 'col' + k, onclick: () => nav({ col: col === k ? '' : k }, 'col' + k) })))));
  const sel = h('select', { class: 'sel', 'aria-label': X('الترتيب', 'Sort'), onchange: (e) => nav({ sort: e.target.value === 'new' ? '' : e.target.value }, 'srt') }, Object.keys(SORTS).map((k) => h('option', { value: k, selected: so === k ? true : undefined, text: X(SORTS[k][0], SORTS[k][1]) })));
  sel.setAttribute('data-k', 'srt');
  return [h('section', { class: 'wrap ph' }, h('span', { class: 'cap', text: X('المتجر', 'THE SHOP') }), h('h1', { text: c ? pick(cat(c).n) : nw ? X('لسه نازل', 'Just in') : X('كل القطع', 'All pieces') })),
    h('section', { class: 'wrap sec', style: 'padding-block-start:1rem' }, h('div', { class: 'shop' }, flt, h('div', null, h('div', { class: 'bar' }, h('p', { 'aria-live': 'polite', style: 'color:var(--mut)', text: X(`${num(list.length)} قطعة`, `${num(list.length)} pieces`) }), h('div', { style: 'display:flex;gap:.6rem;flex-wrap:wrap' }, h('button', { class: 'btn btn--o btn--sm fbtn', type: 'button', 'aria-expanded': String(S.flt), 'aria-controls': 'flt', onclick: () => { S.flt = !S.flt; keepNext = true; render(); } }, X('تصفية', 'Filter')), sel)),
      list.length ? h('div', { class: 'grid g3' }, list.map((p) => card(p, 'h2'))) : h('div', { class: 'empty' }, h('p', { text: X('مفيش حاجة بالفلاتر دي.', 'Nothing matches. Try other filters.') }), h('p', { style: 'margin-block-start:1rem' }, h('a', { class: 'btn btn--o', href: '#/shop', text: X('ابدأ من جديد', 'Reset') }))))))];
}
function vProduct(id, q) {
  const p = prod(id); if (!p) return vNF();
  const sz = p.s.includes(q.s) ? q.s : (p.s.length === 1 ? p.s[0] : ''), cl = p.k.includes(q.c) ? q.c : p.k[0], on = S.wish.includes(p.id);
  const set = (o, fk) => go('#/p/' + p.id + qs({ s: sz, c: cl, ...o }), fk);
  const add1 = () => { if (!sz) { toast(X('اختار المقاس الأول.', 'Pick a size first.')); return; } const ex = S.bag.find((l) => l.id === p.id && l.s === sz && l.c === cl); if (ex) ex.q = Math.min(9, ex.q + 1); else S.bag.push({ id: p.id, s: sz, c: cl, q: 1 }); S.bag = S.bag.slice(0, 20); saveBag(); S.fk = 'add'; keepNext = true; render(); toast(X('اتضافت للشنطة', 'Added to your bag'), '#/bag', X('افتح الشنطة', 'View bag')); };
  const rel = P.filter((x) => x.id !== p.id).sort((a, z) => (z.c === p.c) - (a.c === p.c)).slice(0, 4);
  return [h('section', { class: 'wrap sec', style: 'padding-block-end:2rem' }, h('div', { class: 'pd' },
    h('div', { class: 'im' }, h('img', { src: IMG + p.i + '.webp', alt: pick(p.n), width: 644, height: 800 })),
    h('div', { class: 'info' }, h('span', { class: 'cap', text: brand(p.b).n + ' · ' + pick(brand(p.b).o) }), h('h1', { text: pick(p.n) }), h('div', { class: 'pr num', text: egp(p.p) }), h('p', { style: 'color:var(--mut)', text: pick(p.d) }),
      h('div', null, h('div', { class: 'lab' }, X('اللون: ', 'Colour: '), pick(COL[cl][1])), h('div', { class: 'opts cl', role: 'group', 'aria-label': X('اللون', 'Colour') }, p.k.map((k) => h('button', { type: 'button', 'aria-pressed': String(k === cl), 'data-k': 'c-' + k, onclick: () => set({ c: k }, 'c-' + k) }, h('i', { class: 'dot', bg: COL[k][0] }), pick(COL[k][1]))))),
      h('div', null, h('div', { class: 'lab', text: X('المقاس', 'Size') }), h('div', { class: 'opts', role: 'group', 'aria-label': X('المقاس', 'Size') }, p.s.map((s) => h('button', { type: 'button', 'aria-pressed': String(s === sz), 'data-k': 's-' + s, onclick: () => set({ s }, 's-' + s), text: s })))),
      h('div', { style: 'display:grid;grid-template-columns:1fr auto;gap:.6rem' }, h('button', { class: 'btn', type: 'button', 'data-k': 'add', onclick: add1, text: X('ضيف للشنطة', 'Add to bag') }), h('button', { class: 'btn btn--o', type: 'button', 'aria-pressed': String(on), 'aria-label': on ? X('إزالة من المفضلة', 'Remove from saved') : X('أضف إلى المفضلة', 'Save'), onclick: () => { S.wish = on ? S.wish.filter((x) => x !== p.id) : [...S.wish, p.id].slice(0, 40); saveWish(); keepNext = true; render(); } }, ic('heart', on ? 'fill' : ''))),
      h('div', null, h('details', { class: 'acc' }, h('summary', { text: X('الخامة والعناية', 'Material and care') }), h('p', { text: pick(p.m) })), h('details', { class: 'acc' }, h('summary', { text: X('الشحن والإرجاع', 'Delivery and returns') }), h('p', { text: X('شحن مجاني فوق ١٥٠٠ ج.م. إرجاع خلال ١٤ يوم.', 'Free delivery over 1,500 EGP. 14-day returns.') })))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:1rem' }, h('div', { class: 'sh' }, h('div', null, h('span', { class: 'cap', text: X('معاهم', 'PAIRS WITH') }), h('h2', { text: X('كمّل اللوك', 'Complete the look') }))), h('div', { class: 'grid' }, rel.map((x) => card(x)))) ];
}
function vSaved() {
  const list = S.wish.map(prod).filter(Boolean);
  return h('section', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('span', { class: 'cap', text: X('المفضلة', 'SAVED') }), h('h1', { style: 'font-size:clamp(2.2rem,4.6vw,3.4rem);font-weight:300', text: X('المفضلة', 'Your saved') }))), list.length ? h('div', { class: 'grid' }, list.map((p) => card(p, 'h2'))) : h('div', { class: 'empty' }, h('p', { text: X('لسه مافيش حاجة في المفضلة.', 'Nothing saved yet.') }), h('p', { style: 'margin-block-start:1rem' }, h('a', { class: 'btn', href: '#/shop', text: X('تسوّق', 'Shop') }))));
}
function vBag() {
  if (S.done) return vDone();
  const lines = S.bag, sub = subtotal(), ship = !lines.length || sub >= FREE ? 0 : SHIP;
  const chg = (l, d) => { const n = l.q + d; if (n < 1) S.bag = S.bag.filter((x) => x !== l); else l.q = Math.min(9, n); saveBag(); keepNext = true; render(); };
  const li = (l) => { const p = prod(l.id); return h('div', { class: 'li' }, h('img', { src: IMG + p.i + '.webp', alt: pick(p.n), width: 644, height: 800 }), h('div', null, h('span', { class: 'cap', text: brand(p.b).n }), h('h2', null, h('a', { href: '#/p/' + p.id, style: 'text-decoration:none', text: pick(p.n) })), h('div', { class: 'm', text: `${pick(COL[l.c][1])} · ${l.s}` }),
    h('div', null, h('span', { class: 'qty' }, h('button', { type: 'button', 'aria-label': X('إنقاص', 'Decrease'), onclick: () => chg(l, -1) }, '−'), h('span', { class: 'num', 'aria-live': 'polite', text: num(l.q) }), h('button', { type: 'button', 'aria-label': X('زيادة', 'Increase'), onclick: () => chg(l, 1) }, '+')), h('button', { class: 'rm', type: 'button', onclick: () => { S.bag = S.bag.filter((x) => x !== l); saveBag(); keepNext = true; render(); }, text: X('إزالة', 'Remove') }))), h('div', { class: 'rt num', text: egp(p.p * l.q) })); };
  const f = {}; const mk = (id, a) => (f[id] = h(a.t || 'input', { class: 'in', id, maxlength: a.m || 80, type: a.type, dir: a.dir, autocomplete: a.ac, 'data-k': id }));
  mk('on', { ac: 'name', m: 60 }); mk('op', { type: 'tel', dir: 'ltr', ac: 'tel', m: 20 }); mk('oc', { ac: 'address-level2', m: 40 }); mk('oa', { ac: 'street-address', m: 160 }); mk('os', { t: 'textarea', m: 300 });
  const submit = (e) => {
    e.preventDefault(); if (e.target.website && e.target.website.value) return; if (limited()) return;
    let ok = true; ok = setErr(f.on, f.on.value.trim().length < 2 ? E_REQ() : '') && ok; ok = setErr(f.op, PHONE.test(f.op.value.trim()) ? '' : E_PH()) && ok; ok = setErr(f.oc, f.oc.value.trim().length < 2 ? E_REQ() : '') && ok; ok = setErr(f.oa, f.oa.value.trim().length < 5 ? E_REQ() : '') && ok;
    if (!ok) return; S.done = { ref: mkRef(), n: count(), t: sub + ship }; S.bag = []; saveBag(); go('#/bag');
  };
  if (!lines.length) return h('section', { class: 'wrap sec' }, h('div', { class: 'empty' }, h('h1', { style: 'font-size:2.4rem;font-weight:300', text: X('الشنطة فاضية', 'Your bag is empty') }), h('p', { style: 'margin-block-start:1.2rem' }, h('a', { class: 'btn', href: '#/shop', text: X('تسوّق', 'Shop') }))));
  return h('section', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('span', { class: 'cap', text: X('الشنطة', 'YOUR BAG') }), h('h1', { style: 'font-size:clamp(2.2rem,4.6vw,3.4rem);font-weight:300', text: X('شنطتك', 'Your bag') }))),
    h('div', { class: 'bg' }, h('div', null, lines.map(li)),
      h('div', null, h('form', { class: 'sum', novalidate: true, onsubmit: submit }, h('h2', { text: X('خلّص الطلب', 'Checkout') }), hp(),
        h('div', { class: 'row' }, h('span', { text: X('المجموع', 'Subtotal') }), h('span', { class: 'num', text: egp(sub) })), h('div', { class: 'row' }, h('span', { text: X('الشحن', 'Delivery') }), h('span', { class: 'num', text: ship ? egp(ship) : X('مجاني', 'Complimentary') })), h('div', { class: 'row t' }, h('b', { text: X('الإجمالي', 'Total') }), h('b', { class: 'num', text: egp(sub + ship) })),
        h('div', { style: 'margin-block-start:1.2rem' }, field(X('الاسم', 'Name'), f.on, 'on'), field(X('الموبايل', 'Mobile'), f.op, 'op'), field(X('المدينة', 'City'), f.oc, 'oc'), field(X('العنوان', 'Address'), f.oa, 'oa'), field(X('ملاحظات', 'Notes'), f.os, 'os')),
        h('p', { class: 'cap', style: 'margin-block-end:1rem', text: X('كاش عند الاستلام.', 'Cash on delivery.') }), h('button', { class: 'btn btn--full', type: 'submit', text: X('أكّد الطلب', 'Place order') })))));
}
function vDone() {
  const d = S.done; return h('section', { class: 'wrap sec' }, h('div', { class: 'ok' }, h('span', { class: 'cap', text: X('تم استلام طلبك', 'ORDER RECEIVED') }), h('h1', { text: X('يلا بينا!', 'You are in!') }), h('p', { text: X(`${num(d.n)} قطع · ${egp(d.t)}`, `${num(d.n)} pieces · ${egp(d.t)}`) }), h('div', { class: 'ref' }, bd(d.ref)), h('p', { style: 'color:var(--mut)', text: X('هنكلمك نأكد الطلب.', 'We will call to confirm.') }), h('p', { style: 'margin-block-start:1.4rem' }, h('a', { class: 'btn', href: '#/shop', onclick: () => { S.done = null; }, text: X('كمّل شوبينج', 'Keep shopping') }))));
}
function vAbout() {
  return [h('section', { class: 'wrap sec' }, h('div', { class: 'abt' }, h('img', { src: IMG + 'l1.webp', alt: X('صحاب بيضحكوا على السلم بهوديز وكابات', 'Friends laughing on steps in hoodies and caps'), width: 597, height: 796 }), h('div', null, h('span', { class: 'stk', text: X('عن هيز', 'ABOUT HAZE') }), h('h1', { text: X('من القاهرة للشارع', 'From Cairo to the street') }),
      h('p', { text: X('هيز ستريت وير مصري عمله شباب لشباب. طباعات مجنونة، قصّات واسعة، وإكسسوارات تكمّل اللوك.', 'HAZE is Egyptian streetwear made by and for the new gen. Loud prints, baggy fits and extras that finish the look.') }), h('p', { style: 'margin-block-start:1.4rem' }, h('a', { class: 'btn', href: '#/shop' }, X('تسوّق', 'Shop'), ic('arrow', 'flip')))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, sh(X('الدروب', 'THE DROPS'), X('تلات دروب', 'Three drops'), null, null), h('div', { class: 'brs' }, BR.map((b) => h('a', { href: '#/shop' + qs({ br: b.id }) }, h('b', { text: b.n }), h('span', { text: pick(b.o) }))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, sh(X('أسئلة', 'FAQ'), X('قبل ما تطلب', 'Before you order'), null, null), faq()), newsletter()];
}
function vContact() {
  const f = {}; const mk = (id, a) => (f[id] = h(a.t || 'input', { class: 'in', id, maxlength: a.m || 80, type: a.type, dir: a.dir, autocomplete: a.ac, 'data-k': id }));
  mk('cn', { ac: 'name', m: 60 }); mk('ce', { type: 'email', dir: 'ltr', ac: 'email', m: 120 }); mk('cm', { t: 'textarea', m: 500 });
  const box = h('div', null);
  box.append(h('form', { novalidate: true, onsubmit: (e) => { e.preventDefault(); if (e.target.website && e.target.website.value) return; if (limited()) return; let ok = true; ok = setErr(f.cn, f.cn.value.trim().length < 2 ? E_REQ() : '') && ok; ok = setErr(f.ce, EMAIL.test(f.ce.value.trim()) ? '' : E_MAIL()) && ok; ok = setErr(f.cm, f.cm.value.trim().length < 5 ? E_REQ() : '') && ok; if (!ok) return; box.replaceChildren(h('div', { class: 'ok', role: 'status' }, h('span', { class: 'cap', text: X('وصلتنا رسالتك', 'MESSAGE RECEIVED') }), h('h2', { style: 'font-size:2rem;margin-block:.6rem', text: X('هنرد عليك بسرعة', 'We will hit you back soon') }), h('div', { class: 'ref' }, bd(mkRef())))); } }, hp(), h('div', { class: 'grid2' }, field(X('الاسم', 'Name'), f.cn, 'cn'), field(X('البريد', 'Email'), f.ce, 'ce')), field(X('رسالتك', 'Message'), f.cm, 'cm'), h('button', { class: 'btn', type: 'submit', text: X('ابعت', 'Send') })));
  return h('section', { class: 'wrap sec' }, h('div', { class: 'abt', style: 'grid-template-columns:1fr 1fr;align-items:start' }, h('div', null, h('span', { class: 'cap', text: X('تواصل', 'CONTACT') }), h('h1', { style: 'font-size:clamp(2.4rem,5vw,4rem);font-weight:300;margin-block:.8rem 1.4rem', text: X('كلمنا', 'Say hi') }), h('p', { text: pick(ADDR) }), h('p', { style: 'margin-block-start:.8rem' }, h('a', { href: TEL(HOT) }, bd(HOT))), h('p', null, h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL }))), h('p', { style: 'margin-block-start:.8rem;color:var(--mut)', text: X('السبت – الخميس ١١ ص – ٩ م · الجمعة ٢ – ٩ م', 'Sat – Thu 11 am – 9 pm · Fri 2 – 9 pm') })), box));
}
const vNF = () => h('div', { class: 'wrap sec' }, h('div', { class: 'empty' }, h('h1', { style: 'font-weight:300', text: X('الصفحة دي مش موجودة', 'Nothing here') }), h('p', { style: 'margin-block-start:1rem' }, h('a', { class: 'btn', href: '#/', text: X('الرئيسية', 'Home') }))));

/* ---------- router ---------- */
const QK = ['cat', 'br', 'col', 'sort', 'q', 'new', 's', 'c'];
function parse() {
  const raw = location.hash.replace(/^#\/?/, ''), i = raw.indexOf('?'), p = i < 0 ? raw : raw.slice(0, i), s = i < 0 ? '' : raw.slice(i + 1), q = {};
  new URLSearchParams(s).forEach((v, k) => { if (QK.includes(k)) q[k] = String(v).slice(0, 40); });
  return { parts: p.split('/').filter(Boolean).map((x) => x.slice(0, 60)), q };
}
const TITLES = { '': ['هيز | هوديز وبناطيل ومحافظ وكابات', 'HAZE | Hoodies, pants, wallets and caps'], shop: ['المتجر | هيز', 'Shop | HAZE'], saved: ['المفضلة | هيز', 'Saved | HAZE'], bag: ['الشنطة | هيز', 'Bag | HAZE'], about: ['عن هيز', 'About | HAZE'], contact: ['تواصل | هيز', 'Contact | HAZE'] };
let io;
function reveal() {
  const els = document.querySelectorAll('.pc,.cats a,.jr a,.sh,.mat>*,.abt>*,.brs a,.faq,.news .wrap,.ph');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if (io) io.disconnect();
  io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el, i) => { el.style.setProperty('--d', (i % 4) * 90 + 'ms'); el.classList.add('rv'); io.observe(el); });
}
function applyDoc() { const r = document.documentElement; r.lang = S.lang; r.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; r.dataset.theme = S.theme; }
function render() {
  const { parts, q } = parse(), r = parts[0] || '';
  if (r !== 'bag') S.done = null;
  let main;
  if (r === '') main = vHome(); else if (r === 'shop') main = vShop(q); else if (r === 'p') main = vProduct(parts[1], q); else if (r === 'saved') main = vSaved(); else if (r === 'bag') main = vBag(); else if (r === 'about') main = vAbout(); else if (r === 'contact') main = vContact(); else main = vNF();
  document.title = r === 'p' && prod(parts[1]) ? `${pick(prod(parts[1]).n)} | ${X('هيز', 'HAZE')}` : (TITLES[r] || TITLES[''])[S.lang === 'ar' ? 0 : 1];
  const app = document.getElementById('app'), m = h('main', { id: 'main' }, main);
  app.replaceChildren(...header(r, q), m, footer(), mbar());
  reveal();
  if (!keepNext) window.scrollTo(0, 0);
  if (S.fk) { const el = document.querySelector(`[data-k="${S.fk}"]`); if (el) el.focus({ preventScroll: true }); S.fk = ''; }
  keepNext = false;
}
window.addEventListener('hashchange', () => { S.menu = false; S.flt = false; render(); });
applyDoc(); render();
})();
