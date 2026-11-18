/* Saraya — static SPA. Dynamic text only via textContent; nothing is transmitted. */
(() => {
'use strict';
const { CAT, MENU, AREAS, OCC, COURSES, TASTING, PKG, QUOTES, FAQ, HOT, MAIL, WA, ADDR } = window.D;
const IMG = 'img/', TEL = (n) => 'tel:' + n.replace(/[^+\d]/g, '');
const S = { lang: 'ar', theme: 'light', res: [], pick: [], menu: false, fk: '', open: '', done: null };
const X = (a, e) => (S.lang === 'ar' ? a : e);
const pick = (o) => o[S.lang];
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
const dish = (id) => MENU.find((x) => x.id === id);
const area = (id) => AREAS.find((x) => x.id === id);
const loc = () => (S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB');
const num = (n) => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: 0 }).format(n);
const egp = (n) => `${num(n)} ${X('ج.م', 'EGP')}`;
const hits = []; function limited() { const n = Date.now(); while (hits.length && n - hits[0] > 60000) hits.shift(); if (hits.length >= 5) { toast(X('محاولات كثيرة. انتظر دقيقة وحاول مرة أخرى.', 'Too many attempts. Please wait a minute and try again.')); return true; } hits.push(n); return false; }
const ISO = /^\d{4}-\d{2}-\d{2}$/, HM = /^\d{2}:\d{2}$/, REF = /^SR-[A-Z2-9]{6}$/;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/, PHONE = /^\+?[0-9][0-9 ()\-]{6,19}$/;
const mkRef = (p) => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = new Uint32Array(6); crypto.getRandomValues(b); return p + '-' + Array.from(b, (x) => a[x % a.length]).join(''); };

/* ---------- persistence ---------- */
const validRes = (a) => a && typeof a === 'object' && REF.test(a.ref) && area(a.area) && ISO.test(a.d) && HM.test(a.t) && Number.isInteger(a.g) && a.g >= 1 && a.g <= 10 && typeof a.name === 'string' && a.name.length <= 60;
(() => {
  S.lang = load('saraya_lang') === 'en' ? 'en' : 'ar';
  const th = load('saraya_theme'); S.theme = th === 'dark' ? 'dark' : 'light';
  const r = load('saraya_res'); if (Array.isArray(r)) S.res = r.filter(validRes).slice(0, 12).map((a) => ({ ref: a.ref, area: a.area, d: a.d, t: a.t, g: a.g, name: a.name, pre: Array.isArray(a.pre) ? a.pre.filter((x) => dish(x)).slice(0, 12) : [] }));
  const p = load('saraya_pick'); if (Array.isArray(p)) S.pick = [...new Set(p.filter((x) => typeof x === 'string' && dish(x)))].slice(0, 12);
})();
const saveRes = () => save('saraya_res', S.res), savePick = () => save('saraya_pick', S.pick);

/* ---------- dates & availability ---------- */
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const at = (d, t) => { const [h, m] = t.split(':').map(Number); const x = new Date(d); x.setHours(h, m, 0, 0); return x; };
const hhmm = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
const dFmt = (d, o) => new Intl.DateTimeFormat(loc(), o).format(d);
const tLab = (t) => new Intl.DateTimeFormat(loc(), { hour: 'numeric', minute: '2-digit', hour12: true }).format(at(new Date(2000, 0, 1), t));
function dayList(n) { const a = [], d = new Date(); d.setHours(0, 0, 0, 0); for (let i = 0; a.length < n && i < 60; i++) { const x = new Date(d); x.setDate(d.getDate() + i); if (x.getDay() !== 1) a.push(x); } return a; }
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const RANGES = (d) => { const w = d.getDay(); const r = [[18 * 60, 23 * 60]]; if (w === 4 || w === 5 || w === 6) r.unshift([13 * 60, 16 * 60]); return r; };
function slotsFor(ar, g, d) {
  const a = area(ar); if (!a || g < a.min || g > a.max) return [];
  const key = iso(d), lead = Date.now() + 7200000, load0 = ar === 'private' ? 52 : ar === 'terrace' ? 42 : 34, out = [];
  for (const [f, t] of RANGES(d)) for (let m = f; m <= t - 30; m += 30) {
    const k = hhmm(m); if (at(d, k).getTime() <= lead) continue;
    const taken = hash(ar + key + k) % 100 < load0 + (g > 6 ? 12 : 0) || S.res.some((x) => x.area === ar && x.d === key && x.t === k);
    out.push({ t: k, taken });
  }
  return out;
}
const freeN = (ar, g, d) => slotsFor(ar, g, d).filter((s) => !s.taken).length;
function rel(d) { const t = new Date(); t.setHours(0, 0, 0, 0); const k = Math.round((d - t) / 864e5); if (k === 0) return X('اليوم', 'Today'); if (k === 1) return X('غدًا', 'Tomorrow'); return dFmt(d, { weekday: 'long', day: 'numeric', month: 'short' }); }
const when = (a) => `${rel(fromIso(a.d))} · ${tLab(a.t)}`;
const resAt = (a) => at(fromIso(a.d), a.t);

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) { const v = props[k]; if (v === undefined || v === null || v === false) continue; if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v); }
  add(e, kids); return e;
}
function add(e, kids) { for (const c of kids.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); } }
const ICON = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', menu: '<path d="M4 8h16M4 16h16"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  cal: '<rect x="4" y="5" width="16" height="15"/><path d="M8 3v4m8-4v4M4 10h16"/>', phone: '<path d="M6 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5L16 12.5 20 14v4a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="m5 12 5 5 9-10"/>'
};
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // constants only
let toastT;
function toast(msg, href, label) { let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); } e.replaceChildren(h('span', null, msg), href ? h('a', { href, onclick: () => { e.hidden = true; } }, label) : null); e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 4000); }
let keepNext = false;
const go = (hash, fk) => { keepNext = true; S.fk = fk || ''; if (location.hash === hash) render(); else location.hash = hash; };
const qs = (o) => { const a = Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== '' && o[k] !== null).map((k) => k + '=' + encodeURIComponent(o[k])); return a.length ? '?' + a.join('&') : ''; };
function sh(kick, title, p, lvl) { return h('div', { class: 'sh' }, kick ? h('span', { class: 'cap', text: kick }) : null, h(lvl || 'h2', { text: title }), p ? h('p', { text: p }) : null); }
function field(label, ctrl, id, extra) { return h('div', { class: 'fld' + (extra ? ' ' + extra : '') }, h('label', { for: id, text: label }), ctrl, h('div', { class: 'err', id: id + '-e', role: 'alert' })); }
const opt = (v, txt, sel) => h('option', { value: v, selected: sel ? true : undefined, text: txt });
function setErr(c, msg) { const e = document.getElementById(c.id + '-e'); if (e) e.textContent = msg || ''; if (msg) { c.setAttribute('aria-invalid', 'true'); c.setAttribute('aria-describedby', c.id + '-e'); } else { c.removeAttribute('aria-invalid'); c.removeAttribute('aria-describedby'); } return !msg; }
const E_REQ = () => X('هذا الحقل مطلوب', 'This field is required'), E_MAIL = () => X('اكتب بريدًا صحيحًا', 'Enter a valid email'), E_PH = () => X('اكتب رقم موبايل صحيحًا', 'Enter a valid mobile number');
const hp = () => h('input', { class: 'hp', type: 'text', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' });
function opts(list, cur, onPick, label, keyp) { return h('div', { class: 'opts', role: 'group', 'aria-label': label }, list.map(([k, l]) => h('button', { type: 'button', 'aria-pressed': String(cur === k), 'data-k': keyp + k, onclick: () => onPick(k, keyp + k) }, l))); }
const bd = (t) => h('bdi', { dir: 'ltr', class: 'num', text: t });
const TAGN = { v: ['نباتي', 'Vegetarian'], gf: ['بدون جلوتين', 'Gluten-free'], sg: ['طبق الشيف', 'Signature'], sp: ['حار', 'Spicy'] };
const ALN = { egg: ['بيض', 'egg'], nuts: ['مكسرات', 'nuts'], gluten: ['جلوتين', 'gluten'], milk: ['ألبان', 'milk'], shellfish: ['قشريات', 'shellfish'], fish: ['أسماك', 'fish'], sesame: ['سمسم', 'sesame'] };

/* ---------- shared ---------- */
function upcoming() { const n = Date.now(); return S.res.filter((a) => resAt(a).getTime() > n); }
const brand = () => h('a', { class: 'brand', href: '#/', 'aria-label': X('سرايا — الرئيسية', 'Saraya — home') }, h('span', { text: X('سرايا', 'Saraya') }), h('small', { text: X('عشاء على النيل', 'Dinner on the Nile') }));
const NAV = [['menu', ['المنيو', 'Menu']], ['reserve', ['احجز طاولة', 'Reserve']], ['cafe', ['الكافيه', 'Café']], ['events', ['المناسبات', 'Events']], ['story', ['الحكاية', 'Story']], ['contact', ['تواصل', 'Contact']]];
function header(route) {
  const n = upcoming().length;
  const nav = h('nav', { class: 'nav', id: 'nav', 'data-open': String(S.menu), 'aria-label': X('التنقل الرئيسي', 'Main') }, NAV.map(([r, l]) => h('a', { href: '#/' + r, 'aria-current': r === route ? 'page' : undefined, onclick: () => { S.menu = false; } }, X(l[0], l[1]))));
  return [
    h('aside', { class: 'top', 'aria-label': X('الخط الساخن وساعات العمل', 'Hotline and opening hours') }, h('div', { class: 'wrap' },
      h('a', { href: TEL(HOT) }, X('الحجز: ', 'Reservations: '), bd(HOT)),
      h('span', { text: X('الثلاثاء – الأحد · من ٦ مساءً', 'Tue – Sun · from 6 pm') })) ),
    h('header', { class: 'hdr' }, h('div', { class: 'wrap' }, brand(), nav,
      h('div', { class: 'hact' },
        h('a', { class: 'ib badge', href: '#/my', 'aria-label': X('حجوزاتي', 'My reservations') }, ic('cal'), n ? h('span', { class: 'n', text: num(n) }) : null),
        h('button', { class: 'ib', type: 'button', 'aria-label': S.lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية', onclick: () => { S.lang = S.lang === 'ar' ? 'en' : 'ar'; save('saraya_lang', S.lang); applyDoc(); render(); } }, S.lang === 'ar' ? 'EN' : 'ع'),
        h('button', { class: 'ib', type: 'button', 'aria-label': X('تبديل الوضع الليلي', 'Toggle dark mode'), onclick: () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save('saraya_theme', S.theme); applyDoc(); render(); } }, ic(S.theme === 'dark' ? 'sun' : 'moon')),
        h('a', { class: 'btn btn--p btn--sm', href: '#/reserve', text: X('احجز طاولة', 'Reserve') }),
        h('button', { class: 'ib burger', type: 'button', 'aria-expanded': String(S.menu), 'aria-controls': 'nav', 'aria-label': X('القائمة', 'Menu'), onclick: () => { S.menu = !S.menu; render(); } }, ic(S.menu ? 'x' : 'menu'))))) ];
}
function footer() {
  const L = (r, l) => h('a', { href: '#/' + r, text: X(l[0], l[1]) });
  return h('footer', { class: 'ftr' }, h('div', { class: 'wrap' },
    h('div', { class: 'g' },
      h('div', null, brand(), h('p', { style: 'margin-block-start:1rem;max-inline-size:36ch;color:#c9bfae', text: X('مطعم وكافيه على كورنيش النيل. قوائم موسمية، وخدمة هادئة، وطاولات تطل على الماء.', 'A restaurant and café on the Nile Corniche. Seasonal menus, quiet service and tables on the water.') })),
      h('div', null, h('h2', { text: X('زيارة', 'Visit') }), L('menu', ['المنيو', 'Menu']), L('reserve', ['احجز طاولة', 'Reserve a table']), L('cafe', ['الكافيه', 'Café']), L('my', ['حجوزاتي', 'My reservations'])),
      h('div', null, h('h2', { text: X('سرايا', 'Saraya') }), L('events', ['المناسبات', 'Events']), L('story', ['حكاية الشيف', 'The chef’s story']), L('contact', ['تواصل', 'Contact'])),
      h('div', null, h('h2', { text: X('العنوان', 'Address') }), h('p', { style: 'color:#c9bfae;font-size:.86rem', text: pick(ADDR) }), h('a', { href: TEL(HOT) }, bd(HOT)), h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL })), h('a', { href: 'https://wa.me/' + WA.replace(/\D/g, ''), rel: 'noopener noreferrer', target: '_blank' }, X('واتساب', 'WhatsApp')))),
    h('div', { class: 'cp' }, h('span', { text: X('© 2026 سرايا. جميع الحقوق محفوظة.', '© 2026 Saraya. All rights reserved.') }), h('span', { text: X('الأسعار بالجنيه المصري وتشمل الضرائب والخدمة.', 'Prices in EGP, inclusive of tax and service.') }))));
}
const mbar = () => h('aside', { class: 'mbar', 'aria-label': X('إجراءات سريعة', 'Quick actions') }, h('a', { class: 'btn', href: TEL(HOT) }, ic('phone'), X('اتصل', 'Call')), h('a', { class: 'btn btn--p', href: '#/reserve' }, ic('cal'), X('احجز طاولة', 'Reserve')));
const faq = () => h('div', null, FAQ.map((f) => h('details', { class: 'acc' }, h('summary', { text: pick(f.q) }), h('p', { text: pick(f.a) }))));
function fig(img, alt, cap, ratio) { return h('figure', { class: 'fig' }, h('img', { src: IMG + img + '.webp', alt, loading: 'lazy', decoding: 'async', style: ratio ? 'aspect-ratio:' + ratio : null, width: 800, height: 1000 }), cap ? h('figcaption', null, h('span', { text: cap[0] }), h('span', { text: cap[1] })) : null); }
const mainEl = () => document.getElementById('main');

/* picker: day strip + times */
function picker(ar, g, onPick, selD, selT) {
  const ds = dayList(14), info = ds.map((d) => ({ d, k: iso(d), f: freeN(ar, g, d) }));
  let cur = (info.find((x) => x.k === selD && x.f) || info.find((x) => x.f) || info[0]).k;
  const wrap = h('div', null), times = h('div', { class: 'times', role: 'group', 'aria-label': X('الأوقات المتاحة', 'Available times') }), dayBox = h('div', { class: 'days', role: 'group', 'aria-label': X('اختر اليوم', 'Choose a day') });
  const paintDays = () => dayBox.replaceChildren(...info.map((x) => h('button', { type: 'button', class: 'day', 'aria-pressed': String(x.k === cur), disabled: x.f ? undefined : true, onclick: () => { cur = x.k; paintDays(); paintTimes(); } }, h('small', { text: dFmt(x.d, { weekday: 'short' }) }), h('b', { class: 'num', text: dFmt(x.d, { day: 'numeric' }) }), h('small', { text: dFmt(x.d, { month: 'short' }) }))));
  const paintTimes = () => { const d = info.find((x) => x.k === cur).d, sl = slotsFor(ar, g, d); times.replaceChildren(...(sl.length ? sl.map((s) => h('button', { type: 'button', class: 'tm num', disabled: s.taken ? true : undefined, 'aria-pressed': String(cur === selD && s.t === selT), onclick: () => onPick(cur, s.t), text: tLab(s.t) })) : [h('p', { class: 'note', text: X('لا توجد أوقات في هذا اليوم.', 'No times on this day.') })])); };
  paintDays(); paintTimes();
  add(wrap, [dayBox, times, h('p', { class: 'note', style: 'margin-block-start:.7rem', text: X('الأوقات المشطوبة محجوزة. يغلق المطعم يوم الاثنين، ونستقبل الحجز حتى ساعتين قبل الموعد.', 'Struck-through times are taken. Closed on Mondays; bookings close two hours ahead.') })]);
  return wrap;
}

/* ---------- views ---------- */
function vHome() {
  const nx = (() => { for (const d of dayList(10)) { const s = slotsFor('hall', 2, d).find((x) => !x.taken); if (s) return { d, t: s.t }; } return null; })();
  return [
    h('section', { class: 'hero' }, h('img', { src: IMG + 'hero.webp', alt: X('صالة الطعام الرئيسية في سرايا مضاءة بالشموع', 'The Saraya main dining room by candlelight'), width: 1024, height: 572 }),
      h('div', { class: 'wrap hin' },
        h('span', { class: 'cap', style: 'color:#d8c08f', text: X('جاردن سيتي · القاهرة', 'Garden City · Cairo') }),
        h('h1', null, X('عشاء ', 'Dinner '), h('em', { text: X('على النيل', 'on the Nile') })),
        h('p', { class: 'lead', text: X('مطبخ مصري معاصر بأيدي الشيف، قوائم تتغير مع الموسم، وتراس يطل على الماء. وفي الصباح، كافيه يخبز كل ما يقدمه.', 'Contemporary Egyptian cooking, menus that follow the seasons and a terrace over the water. By day, a café that bakes everything it serves.') }),
        h('div', { class: 'acts' }, h('a', { class: 'btn btn--p', href: '#/reserve' }, X('احجز طاولة', 'Reserve a table'), ic('arrow', 'flip')), h('a', { class: 'btn btn--w', href: '#/menu', text: X('اكتشف المنيو', 'Explore the menu') })),
        h('div', { class: 'meta' }, h('span', { text: X('الثلاثاء – الأحد', 'Tuesday – Sunday') }), h('span', null, X('أقرب طاولة لاثنين: ', 'Next table for two: '), nx ? h('b', { text: `${rel(nx.d)} · ${tLab(nx.t)}` }) : '—'), h('span', { text: pick(ADDR) })))),
    h('section', { class: 'wrap sec' }, h('div', { class: 'edi' },
      h('div', null, h('span', { class: 'num-sec', text: X('٠١ — الفكرة', '01 — THE IDEA') }), h('h2', { text: X('أقل مكونات، أكثر عناية', 'Fewer ingredients, more care') }),
        h('p', { class: 'big', text: X('نطبخ ما يصل طازجًا من الدلتا والبحر الأحمر، ونقدمه كما ينبغي: بسيطًا ودقيقًا.', 'We cook what arrives fresh from the Delta and the Red Sea, and serve it as it should be: simple and exact.') }),
        h('p', { text: X('قائمة قصيرة تتبدل كل بضعة أسابيع، ونبيذ ومشروبات مرافقة بلا كحول، وخدمة لا تقاطع حديثك.', 'A short menu that turns every few weeks, alcohol-free pairings, and service that never interrupts the conversation.') }),
        h('p', { style: 'margin-block-start:1.6rem' }, h('a', { class: 'btn', href: '#/story' }, X('حكاية الشيف', 'The chef’s story'), ic('arrow', 'flip')))),
      fig('hands', X('الشيف يضع الأعشاب على طبق القاروص', 'The chef finishing the sea bass with herbs'), [X('مطبخ سرايا', 'Saraya kitchen'), 'N° 01'], '4/5'))),
    h('section', { class: 'band' }, h('div', { class: 'wrap sec' },
      sh(X('٠٢ — المنيو المتذوق', '02 — TASTING MENU'), X('أربعة فصول من أمسية واحدة', 'Four movements, one evening'), X(`قائمة متتابعة من أربعة أطباق بسعر ${egp(TASTING.p)} للشخص.`, `A four-course sequence at ${egp(TASTING.p)} per guest.`)),
      h('div', { class: 'courses' }, COURSES.map((c) => h('div', { class: 'crs' }, h('img', { src: IMG + c.i + '.webp', alt: pick(c.t), loading: 'lazy', decoding: 'async', width: 644, height: 800 }), h('div', null, h('b', { text: c.n }), h('h3', { text: pick(c.t) }))))),
      h('p', { style: 'margin-block-start:2rem' }, h('a', { class: 'btn btn--w', href: '#/menu' }, X('المنيو الكامل', 'Full menu'), ic('arrow', 'flip'))))),
    h('section', { class: 'wrap sec' }, h('div', { class: 'edi', style: 'grid-template-columns:7fr 5fr' },
      fig('terrace', X('تراس سرايا على النيل وقت الغروب', 'The Saraya terrace on the Nile at dusk'), [X('التراس', 'The terrace'), 'N° 02'], '3/2'),
      h('div', null, h('span', { class: 'num-sec', text: X('٠٣ — التراس', '03 — THE TERRACE') }), h('h2', { text: X('العشاء على الكورنيش', 'Dinner on the Corniche') }), h('p', { text: X('فوانيس، ومراكب شراعية تعبر أمامك، وإضاءة تتدرج مع الغروب. اطلب التراس عند الحجز.', 'Lanterns, feluccas drifting past and light that follows the sunset. Ask for the terrace when you reserve.') }), h('p', { style: 'margin-block-start:1.6rem' }, h('a', { class: 'btn btn--p', href: '#/reserve' + qs({ area: 'terrace' }) }, X('احجز التراس', 'Reserve the terrace'), ic('arrow', 'flip')))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, sh(X('٠٤ — من ضيوفنا', '04 — GUESTS'), X('كلمات بعد الأمسية', 'Words after the evening')),
      h('div', { class: 'qs' }, QUOTES.map((q) => h('blockquote', null, h('q', { text: pick(q.q) }), h('cite', { text: pick(q.n) }))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, h('div', { class: 'edi' }, sh(X('أسئلة', 'QUESTIONS'), X('قبل أن تحجز', 'Before you book')), faq())) ];
}

/* ----- menu ----- */
function vMenu(q) {
  const cat = CAT.find((c) => c.id === q.cat) ? q.cat : 'st', tag = ['v', 'gf', 'sp'].includes(q.tag) ? q.tag : '', term = (q.q || '').toLowerCase();
  const list = MENU.filter((d) => d.c === cat && (!tag || d.t.includes(tag)) && (!term || (d.n.ar + ' ' + d.n.en + ' ' + d.d.ar + ' ' + d.d.en).toLowerCase().includes(term)));
  const withImg = MENU.filter((d) => d.img);
  const shown = dish(S.open) && list.some((d) => d.id === S.open) ? dish(S.open) : list.find((d) => d.img) || withImg[0];
  const prev = h('div', { class: 'prev', 'aria-live': 'polite' });
  const paintPrev = (d) => { if (!d || !d.img) return; prev.replaceChildren(h('img', { src: IMG + d.img + '.webp', alt: pick(d.n), width: 644, height: 800 }), h('p', null, h('b', { text: pick(d.n) }), ' · ', pick(d.d))); };
  paintPrev(shown);
  const nav = (o) => go('#/menu' + qs({ cat, tag, q: term, ...o }));
  const rows = list.map((d, i) => {
    const open = S.open === d.id, picked = S.pick.includes(d.id);
    return h('div', { class: 'dish', 'data-open': String(open) },
      h('h2', { class: 'dh' }, h('button', { type: 'button', 'aria-expanded': String(open), 'data-k': 'd-' + d.id, onclick: () => { S.open = open ? '' : d.id; paintPrev(d); render(); const el = document.querySelector(`[data-k="d-${d.id}"]`); if (el) el.focus({ preventScroll: true }); }, onmouseenter: () => paintPrev(d), onfocus: () => paintPrev(d) },
        h('span', { class: 'ix num', text: pad(i + 1) }),
        h('span', null, h('span', { class: 'nm', text: pick(d.n) }), h('span', { class: 'tags' }, d.t.map((t) => h('span', { class: 'tg', text: X(TAGN[t][0], TAGN[t][1]) })))),
        h('span', { class: 'pr num', text: egp(d.p) }))),
      h('div', { class: 'det' }, h('p', { text: pick(d.d) }), h('p', { class: 'al' }, h('b', { text: X('مرافق: ', 'Pairs with: ') }), pick(d.pr)), h('p', { class: 'al' }, h('b', { text: X('مسببات الحساسية: ', 'Allergens: ') }), d.al.length ? d.al.map((a) => X(ALN[a][0], ALN[a][1])).join(X('، ', ', ')) : X('لا يوجد', 'None')),
        h('div', { class: 'acts' }, h('button', { class: 'btn btn--sm' + (picked ? ' btn--p' : ''), type: 'button', 'aria-pressed': String(picked), onclick: () => { S.pick = picked ? S.pick.filter((x) => x !== d.id) : [...S.pick, d.id].slice(0, 12); savePick(); S.fk = 'd-' + d.id; keepNext = true; render(); } }, ic(picked ? 'check' : 'plus'), picked ? X('على طاولتي', 'On my table') : X('أضف إلى طاولتي', 'Add to my table')))));
  });
  const tot = S.pick.reduce((s, id) => s + dish(id).p, 0);
  const table = h('div', { class: 'tbl' }, h('h2', { text: X('طاولتي', 'My table') }),
    S.pick.length ? [h('ul', null, S.pick.map((id) => h('li', null, h('span', { text: pick(dish(id).n) }), h('span', null, h('span', { class: 'num', text: egp(dish(id).p) }), h('button', { class: 'rm', type: 'button', 'aria-label': X('إزالة ', 'Remove ') + pick(dish(id).n), onclick: () => { S.pick = S.pick.filter((x) => x !== id); savePick(); keepNext = true; render(); } }, '×'))))),
      h('div', { class: 'tot' }, h('span', { text: X('الإجمالي التقريبي', 'Approximate total') }), h('span', { class: 'num', text: egp(tot) })),
      h('a', { class: 'btn btn--p', style: 'inline-size:100%', href: '#/reserve' }, X('أرسل اختياراتك مع الحجز', 'Attach to a reservation'), ic('arrow', 'flip'))]
      : h('p', { class: 'note', text: X('اختر أطباقًا لتحضّر طلبك قبل الوصول. لا يُسجَّل شيء حتى تحجز.', 'Pick dishes to preview your order before you arrive. Nothing is recorded until you reserve.') }));
  const search = h('input', { class: 'srch', type: 'search', id: 'mq', maxlength: 40, value: term, placeholder: X('ابحث في المنيو', 'Search the menu'), 'aria-label': X('ابحث في المنيو', 'Search the menu'), 'data-k': 'mq', onkeydown: (e) => { if (e.key === 'Enter') nav({ q: e.target.value.trim().slice(0, 40) }); }, onchange: (e) => nav({ q: e.target.value.trim().slice(0, 40) }) });
  return [h('section', { class: 'wrap mh' }, h('span', { class: 'cap', text: X('المنيو', 'THE MENU') }), h('h1', { text: X('ما نقدّمه الآن', 'What we serve now') }), h('p', { class: 'note', style: 'margin-block-start:.8rem', text: X('قوائم الموسم · الأسعار بالجنيه المصري', 'Seasonal menus · prices in EGP') })),
    h('div', { class: 'wrap' }, h('div', { class: 'mtabs', role: 'group', 'aria-label': X('أقسام المنيو', 'Menu sections') }, CAT.map((c) => h('button', { type: 'button', 'aria-pressed': String(c.id === cat), 'data-k': 'c-' + c.id, onclick: () => go('#/menu' + qs({ cat: c.id, tag, q: term }), 'c-' + c.id), text: pick(c.n) }))),
      h('div', { class: 'mtool' }, h('div', { class: 'chips', role: 'group', 'aria-label': X('تصفية', 'Filter') }, [['v', 0], ['gf', 0], ['sp', 0]].map(([t]) => h('button', { type: 'button', 'aria-pressed': String(tag === t), 'data-k': 't-' + t, onclick: () => go('#/menu' + qs({ cat, tag: tag === t ? '' : t, q: term }), 't-' + t), text: X(TAGN[t][0], TAGN[t][1]) }))), search)),
    h('section', { class: 'wrap sec', style: 'padding-block-start:1rem' }, h('div', { class: 'mlay' }, h('div', null, h('p', { class: 'note', 'aria-live': 'polite', text: X(`${num(list.length)} طبق في «${pick(CAT.find((c) => c.id === cat).n)}» · ${pick(CAT.find((c) => c.id === cat).k)}`, `${num(list.length)} items in “${pick(CAT.find((c) => c.id === cat).n)}” · ${pick(CAT.find((c) => c.id === cat).k)}`) }), list.length ? rows : h('p', { class: 'empty', text: X('لا توجد أطباق بهذه المعايير.', 'No dishes match.') })), h('div', null, prev, table)))];
}

/* ----- reserve ----- */
function vReserve(q) {
  const re = q.re && S.res.find((a) => a.ref === q.re), old = re || null;
  if (S.done) return vDone();
  const st = { area: area(q.area) ? q.area : (old ? old.area : 'hall'), g: Math.min(10, Math.max(1, parseInt(q.g, 10) || (old ? old.g : 2))), d: ISO.test(q.d || '') ? q.d : '', t: HM.test(q.t || '') ? q.t : '' };
  const a0 = area(st.area); if (st.g < a0.min) st.g = a0.min; if (st.g > a0.max) st.g = a0.max;
  const upd = (o) => go('#/reserve' + qs({ ...st, re: q.re, ...o }));
  const okSlot = st.d && st.t && slotsFor(st.area, st.g, fromIso(st.d)).some((s) => s.t === st.t && (!s.taken || (old && old.d === st.d && old.t === st.t && old.area === st.area)));
  const name = h('input', { class: 'in', id: 'rn', maxlength: 60, autocomplete: 'name', value: old ? old.name : '', 'data-k': 'rn' }), phone = h('input', { class: 'in', id: 'rp', type: 'tel', maxlength: 20, autocomplete: 'tel', dir: 'ltr', 'data-k': 'rp' }), mail = h('input', { class: 'in', id: 'rm', type: 'email', maxlength: 120, autocomplete: 'email', dir: 'ltr', 'data-k': 'rm' }),
    occ = h('select', { class: 'in', id: 'ro' }, OCC.map((o, i) => opt(String(i), pick(o)))), note = h('textarea', { class: 'in', id: 'rt', maxlength: 300 });
  const submit = (e) => {
    e.preventDefault(); if (e.target.website && e.target.website.value) return; if (limited()) return;
    let ok = true; ok = setErr(name, name.value.trim().length < 2 ? E_REQ() : '') && ok; ok = setErr(phone, PHONE.test(phone.value.trim()) ? '' : E_PH()) && ok; ok = setErr(mail, mail.value.trim() && !EMAIL.test(mail.value.trim()) ? E_MAIL() : '') && ok;
    if (!okSlot) { toast(X('اختر اليوم والوقت أولًا.', 'Choose a day and time first.')); ok = false; }
    if (!ok) return;
    const r = { ref: old ? old.ref : mkRef('SR'), area: st.area, d: st.d, t: st.t, g: st.g, name: name.value.trim().slice(0, 60), pre: S.pick.slice(0, 12) };
    S.res = [r, ...S.res.filter((x) => x.ref !== r.ref)].slice(0, 12); saveRes(); S.done = r; go('#/reserve');
  };
  const left = [
    h('div', { class: 'step' }, h('h2', null, h('span', { text: '01' }), X('أين وكم عددكم', 'Where and how many')),
      opts(AREAS.map((a) => [a.id, pick(a.n)]), st.area, (k, fk) => upd({ area: k, t: '', d: '', g: Math.min(Math.max(st.g, area(k).min), area(k).max) }), X('المكان', 'Area'), 'a-'),
      h('p', { class: 'note', style: 'margin-block:.8rem 1.2rem', text: pick(a0.d) }),
      h('div', { class: 'opts', role: 'group', 'aria-label': X('عدد الضيوف', 'Party size') }, Array.from({ length: a0.max - a0.min + 1 }, (_, i) => a0.min + i).map((n) => h('button', { type: 'button', class: 'num', 'aria-pressed': String(st.g === n), 'data-k': 'g-' + n, onclick: () => upd({ g: n, t: '' }), text: num(n) }))),
      h('p', { class: 'note', style: 'margin-block-start:.6rem' }, X('لأكثر من عشرة ضيوف: ', 'For more than ten guests: '), h('a', { href: '#/events', text: X('صفحة المناسبات', 'see Events') }))),
    h('div', { class: 'step' }, h('h2', null, h('span', { text: '02' }), X('اليوم والوقت', 'Day and time')), picker(st.area, st.g, (d, t) => upd({ d, t }), st.d, st.t)),
    h('form', { class: 'step', novalidate: true, onsubmit: submit }, h('h2', null, h('span', { text: '03' }), X('بياناتك', 'Your details')), hp(),
      h('div', { class: 'grid2' }, field(X('الاسم', 'Name'), name, 'rn'), field(X('الموبايل', 'Mobile'), phone, 'rp')),
      h('div', { class: 'grid2' }, field(X('البريد (اختياري)', 'Email (optional)'), mail, 'rm'), field(X('المناسبة', 'Occasion'), occ, 'ro')),
      field(X('ملاحظات (حساسية، مقعد، إلخ)', 'Notes (allergies, seating, etc.)'), note, 'rt'),
      h('button', { class: 'btn btn--p', type: 'submit' }, old ? X('حفظ التعديل', 'Save changes') : X('تأكيد الحجز', 'Confirm reservation'), ic('arrow', 'flip')))];
  const sum = h('aside', { class: 'sum', 'aria-label': X('ملخص الحجز', 'Reservation summary') }, h('h2', { text: X('ملخص', 'Summary') }), h('dl', null,
    h('dt', { text: X('المكان', 'Area') }), h('dd', { text: pick(a0.n) }), h('dt', { text: X('الضيوف', 'Guests') }), h('dd', { class: 'num', text: num(st.g) }),
    h('dt', { text: X('الموعد', 'When') }), h('dd', { text: okSlot ? when({ d: st.d, t: st.t }) : X('لم يُحدد بعد', 'Not chosen yet') }),
    S.pick.length ? [h('dt', { text: X('أطباق مختارة', 'Dishes picked') }), h('dd', { class: 'num', text: num(S.pick.length) })] : null),
    h('p', { class: 'note', style: 'margin-block-start:1.2rem', text: X('إلغاء مجاني حتى ست ساعات قبل الموعد. نحتفظ بالطاولة ١٥ دقيقة.', 'Free cancellation up to six hours before. We hold your table for 15 minutes.') }));
  return h('section', { class: 'wrap sec' }, h('div', { class: 'mh', style: 'padding:0 0 2rem' }, h('span', { class: 'cap', text: X('الحجز', 'RESERVATIONS') }), h('h1', { style: 'font-size:clamp(2.4rem,6vw,4.4rem);margin-block-start:.6rem', text: old ? X('تغيير الحجز', 'Change reservation') : X('احجز طاولة', 'Reserve a table') })), h('div', { class: 'rsv' }, h('div', null, left), sum));
}
function vDone() {
  const r = S.done, a = area(r.area);
  return h('section', { class: 'wrap sec' }, h('div', { class: 'ok' }, h('span', { class: 'cap', text: X('تم الحجز', 'CONFIRMED') }), h('h1', { text: X(`نراك ${rel(fromIso(r.d))}`, `See you ${rel(fromIso(r.d))}`) }),
    h('p', { text: X(`${pick(a.n)} · ${num(r.g)} ضيوف · ${tLab(r.t)}`, `${pick(a.n)} · ${num(r.g)} guests · ${tLab(r.t)}`) }), h('div', { class: 'ref' }, bd(r.ref)),
    h('p', { class: 'note', text: X('احتفظ برقم الحجز. يمكنك التعديل أو الإلغاء من صفحة حجوزاتي.', 'Keep your reference. You can change or cancel from My reservations.') }),
    h('div', { style: 'display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-block-start:1.5rem' }, h('a', { class: 'btn btn--p', href: '#/my', onclick: () => { S.done = null; } }, X('حجوزاتي', 'My reservations')), h('a', { class: 'btn', href: '#/', onclick: () => { S.done = null; } }, X('الرئيسية', 'Home')))));
}
function vMy() {
  const now = Date.now(), list = [...S.res].sort((a, b) => resAt(a) - resAt(b));
  const row = (a) => {
    const past = resAt(a).getTime() <= now, lock = !past && resAt(a).getTime() - now < 21600000;
    const del = h('button', { class: 'btn btn--sm', type: 'button', onclick: (e) => { const b = e.currentTarget; if (b.dataset.sure) { S.res = S.res.filter((x) => x.ref !== a.ref); saveRes(); keepNext = true; render(); toast(X('تم إلغاء الحجز', 'Reservation cancelled')); } else { b.dataset.sure = '1'; b.textContent = X('تأكيد الإلغاء؟', 'Confirm cancel?'); } } }, X('إلغاء', 'Cancel'));
    return h('div', { class: 'res' }, h('div', null, h('h2', { text: pick(area(a.area).n) }), h('div', { class: 'note' }, when(a) + ' · ', X(`${num(a.g)} ضيوف`, `${num(a.g)} guests`)), h('div', { class: 'note' }, bd(a.ref), past ? [' · ', h('span', { class: 'pill', text: X('انتهى', 'Past') })] : null, a.pre.length ? ' · ' + X(`${num(a.pre.length)} أطباق`, `${num(a.pre.length)} dishes`) : null)),
      h('div', { style: 'display:flex;gap:.5rem;flex-wrap:wrap' }, past ? h('a', { class: 'btn btn--p btn--sm', href: '#/reserve', text: X('احجز مرة أخرى', 'Book again') }) : lock ? h('span', { class: 'note', text: X('التعديل مغلق قبل الموعد بست ساعات', 'Changes close six hours before') }) : [h('a', { class: 'btn btn--sm', href: '#/reserve' + qs({ re: a.ref, area: a.area, g: a.g }), text: X('تغيير', 'Change') }), del]));
  };
  return h('section', { class: 'wrap sec' }, sh(X('حجوزاتي', 'MY RESERVATIONS'), X('طاولاتك القادمة', 'Your tables'), null, 'h1'), list.length ? list.map(row) : h('div', { class: 'empty' }, h('p', { text: X('لا توجد حجوزات محفوظة على هذا الجهاز.', 'No reservations saved on this device.') }), h('p', { style: 'margin-block-start:1rem' }, h('a', { class: 'btn btn--p', href: '#/reserve', text: X('احجز طاولة', 'Reserve a table') }))));
}

/* ----- cafe, events, story, contact ----- */
function vCafe() {
  const items = MENU.filter((d) => d.c === 'ca' || d.c === 'dr');
  return [h('section', { class: 'wrap sec' }, h('div', { class: 'edi' }, h('div', null, h('span', { class: 'cap', text: X('الكافيه', 'THE CAFÉ') }), h('h1', { style: 'font-size:clamp(2.4rem,6vw,4.6rem);margin-block:.8rem 1.2rem', text: X('صباح هادئ، فرن يعمل منذ الفجر', 'A calm morning, an oven lit at dawn') }), h('p', { class: 'big', text: X('قهوة متخصصة ومعجنات تُخبز كل ساعة وطاولات تحت نوافذ مقوسة. بلا حجز، من الثامنة صباحًا.', 'Specialty coffee, pastries baked hourly and tables under arched windows. No reservation needed, from 8 am.') }), h('p', { style: 'margin-block-start:1.5rem', class: 'note', text: X('كل يوم من ٨ صباحًا حتى ٥ مساءً.', 'Daily 8 am – 5 pm.') })), fig('cafeint', X('داخل الكافيه، أرضية تيرازو ونوافذ مقوسة', 'Inside the café: terrazzo floor and arched windows'), [X('الكافيه', 'Café'), 'N° 04'], '3/2')),),
    h('section', { class: 'band' }, h('div', { class: 'wrap sec' }, h('div', { class: 'edi' }, fig('cafe', X('لاتيه وكرواسون ومعجنات الفستق على رخام', 'Latte, croissant and pistachio danish on marble'), null, '4/5'),
      h('div', null, sh(X('قائمة الكافيه', 'CAFÉ MENU'), X('ما على الطاولة', 'On the table')), items.map((d) => h('div', { class: 'dish', style: 'border-color:#3a312b' }, h('div', { style: 'display:flex;justify-content:space-between;gap:1rem;padding-block:1rem' }, h('div', null, h('h3', { style: 'font-size:1.4rem', text: pick(d.n) }), h('p', { class: 'note', style: 'color:#b9ad9c', text: pick(d.d) })), h('span', { class: 'num', text: egp(d.p) })))), h('p', { style: 'margin-block-start:1.4rem' }, h('a', { class: 'btn btn--w', href: '#/menu' + qs({ cat: 'ca' }), text: X('افتح المنيو التفاعلي', 'Open the interactive menu') })))))) ];
}
function inquiry(kind) {
  const f = {}; const mk = (id, a) => (f[id] = h(a.t || 'input', { class: 'in', id, maxlength: a.m || 80, type: a.type, dir: a.dir, autocomplete: a.ac, 'data-k': id }));
  mk('qn', { ac: 'name', m: 60 }); mk('qp', { type: 'tel', dir: 'ltr', ac: 'tel', m: 20 }); mk('qe', { type: 'email', dir: 'ltr', ac: 'email', m: 120 }); mk('qm', { t: 'textarea', m: 500 });
  const pk = h('select', { class: 'in', id: 'qk' }, PKG.map((p) => opt(p.id, pick(p.n)))), gs = h('input', { class: 'in', id: 'qg', type: 'number', min: 1, max: 200, value: 10, dir: 'ltr', inputmode: 'numeric' }), dt = h('input', { class: 'in', id: 'qd', type: 'date', dir: 'ltr' });
  const box = h('div', null);
  const submit = (e) => {
    e.preventDefault(); if (e.target.website && e.target.website.value) return; if (limited()) return; let ok = true;
    ok = setErr(f.qn, f.qn.value.trim().length < 2 ? E_REQ() : '') && ok; ok = setErr(f.qp, PHONE.test(f.qp.value.trim()) ? '' : E_PH()) && ok; ok = setErr(f.qe, EMAIL.test(f.qe.value.trim()) ? '' : E_MAIL()) && ok;
    const g = parseInt(gs.value, 10); ok = setErr(gs, g >= 1 && g <= 200 ? '' : X('أدخل عددًا بين ١ و٢٠٠', 'Enter 1–200')) && ok;
    if (!ok) return; const r = mkRef('EV');
    box.replaceChildren(h('div', { class: 'ok', role: 'status' }, h('span', { class: 'cap', text: X('وصل طلبك', 'REQUEST RECEIVED') }), h('h2', { style: 'font-size:2rem;margin-block:.6rem', text: X('سنرد خلال يوم عمل', 'We will reply within one business day') }), h('div', { class: 'ref' }, bd(r))));
  };
  box.append(h('form', { novalidate: true, onsubmit: submit }, hp(), h('div', { class: 'grid2' }, field(X('الاسم', 'Name'), f.qn, 'qn'), field(X('الموبايل', 'Mobile'), f.qp, 'qp')), field(X('البريد الإلكتروني', 'Email'), f.qe, 'qe'),
    kind === 'events' ? h('div', { class: 'grid2' }, field(X('الباقة', 'Package'), pk, 'qk'), field(X('عدد الضيوف', 'Guests'), gs, 'qg')) : null, kind === 'events' ? field(X('التاريخ المبدئي', 'Preferred date'), dt, 'qd') : null,
    field(X('رسالتك', 'Message'), f.qm, 'qm'), h('button', { class: 'btn btn--p', type: 'submit' }, X('أرسل', 'Send'), ic('arrow', 'flip'))));
  return box;
}
function vEvents() {
  return [h('section', { class: 'wrap sec' }, h('div', { class: 'edi', style: 'grid-template-columns:6fr 6fr' }, h('div', null, h('span', { class: 'cap', text: X('المناسبات', 'PRIVATE EVENTS') }), h('h1', { style: 'font-size:clamp(2.4rem,6vw,4.6rem);margin-block:.8rem 1.2rem', text: X('أمسيتك، بكل تفاصيلها', 'Your evening, in every detail') }), h('p', { class: 'big', text: X('صالة خاصة لعشرة ضيوف، أو التراس كاملًا لأربعين، أو طاولة الشيف على حافة المطبخ.', 'A private room for ten, the whole terrace for forty, or the chef’s table at the pass.') })), fig('private', X('الصالة الخاصة بمقاعد مخملية خضراء', 'The private room with green velvet chairs'), [X('الصالة الخاصة', 'Private room'), 'N° 05'], '3/2'))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, h('div', { class: 'cols3' }, PKG.map((p) => h('article', { class: 'pk' }, h('img', { src: IMG + (p.id === 'salon' ? 'private' : p.id === 'terr' ? 'terrace' : 'hero') + '.webp', alt: '', loading: 'lazy', decoding: 'async', width: 1024, height: 687 }), h('div', { class: 'b' }, h('h2', { text: pick(p.n) }), h('p', { text: pick(p.d) }), h('ul', null, p.it.map((i) => h('li', { text: pick(i) }))), h('div', { class: 'pp' }, X('من ', 'From '), h('span', { class: 'num', text: egp(p.p) }), X(' للشخص', ' per guest')), h('p', { class: 'note', text: X(`من ${num(p.min)} إلى ${num(p.max)} ضيوف`, `${num(p.min)}–${num(p.max)} guests`) })))))),
    h('section', { class: 'wrap sec', style: 'padding-block-start:0' }, h('div', { class: 'edi' }, sh(X('اطلب عرضًا', 'REQUEST A PROPOSAL'), X('أخبرنا عن مناسبتك', 'Tell us about your event'), X('نرد بعرض مفصل خلال يوم عمل.', 'We reply with a detailed proposal within one business day.')), inquiry('events')))];
}
function vStory() {
  return [h('section', { class: 'wrap sec' }, h('div', { class: 'edi' }, fig('chef', X('الشيف التنفيذي في مطبخ سرايا', 'The executive chef in the Saraya kitchen'), [X('الشيف التنفيذي', 'Executive chef'), 'N° 06'], '4/5'),
      h('div', null, h('span', { class: 'cap', text: X('الحكاية', 'THE STORY') }), h('h1', { style: 'font-size:clamp(2.4rem,6vw,4.6rem);margin-block:.8rem 1.4rem', text: X('مطبخ يبدأ من السوق', 'A kitchen that starts at the market') }),
        h('p', { class: 'big', text: X('نؤمن أن الطبق الجيد هو الذي لا يحتاج إلى شرح.', 'We believe a good plate needs no explanation.') }),
        h('p', { text: X('يبدأ يوم الفريق قبل الفجر في سوق الجملة. ما يصل طازجًا يحدد القائمة، لا العكس. نخبز الخبز، ونخلل، ونعتّق اللحوم داخل المطبخ، ونكتب القائمة بالقلم قبل كل خدمة.', 'The team’s day begins before dawn at the wholesale market. What arrives fresh decides the menu, not the other way round. We bake, pickle and age in-house, and write the menu by hand before every service.') }),
        h('p', { text: X('وراء البار فريق يصنع مشروبات بلا كحول بعناية طباخ، من الكركديه المعتّق إلى البرتقال المدخّن.', 'Behind the bar, a team makes alcohol-free drinks with a cook’s care, from aged hibiscus to smoked orange.') })))),
    h('section', { class: 'band' }, h('div', { class: 'wrap sec' }, h('div', { class: 'edi', style: 'grid-template-columns:7fr 5fr' }, fig('bar', X('البارتندر يسكب مشروبًا كهرمانيًا', 'The bartender pouring an amber drink'), [X('البار', 'The bar'), 'N° 07'], '4/5'), h('div', null, sh(X('المشروبات', 'DRINKS'), X('مرافقة بلا كحول', 'Alcohol-free pairings'), X('كل طبق رئيسي له مشروب مرافق يختاره الفريق معك.', 'Every main course has a pairing our team will choose with you.')), h('a', { class: 'btn btn--w', href: '#/menu' + qs({ cat: 'dr' }), text: X('شاهد المشروبات', 'See the drinks') }))))) ];
}
function vContact() {
  return h('section', { class: 'wrap sec' }, h('div', { class: 'edi' }, h('div', null, h('span', { class: 'cap', text: X('تواصل', 'CONTACT') }), h('h1', { style: 'font-size:clamp(2.4rem,6vw,4.4rem);margin-block:.8rem 1.4rem', text: X('نسعد بسماعك', 'We would love to hear from you') }),
      h('p', { text: pick(ADDR) }), h('p', { style: 'margin-block-start:.8rem' }, X('الحجز: ', 'Reservations: '), h('a', { href: TEL(HOT) }, bd(HOT))), h('p', null, h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL }))), h('p', { style: 'margin-block-start:.8rem;color:var(--mut)', text: X('المطعم: الثلاثاء – الأحد من ٦ مساءً (الخميس – السبت يبدأ الغداء ١ ظهرًا). الكافيه: يوميًا ٨ صباحًا – ٥ مساءً.', 'Restaurant: Tue – Sun from 6 pm (lunch from 1 pm Thu – Sat). Café: daily 8 am – 5 pm.') })), inquiry('contact')));
}
const vNF = () => h('div', { class: 'wrap sec' }, h('div', { class: 'empty' }, h('h1', { text: X('الصفحة غير موجودة', 'Page not found') }), h('p', { style: 'margin-block-start:1rem' }, h('a', { class: 'btn btn--p', href: '#/', text: X('الرئيسية', 'Home') }))));

/* ---------- router ---------- */
const QK = ['cat', 'tag', 'q', 'area', 'g', 'd', 't', 're'];
function parse() {
  const raw = location.hash.replace(/^#\/?/, ''), i = raw.indexOf('?'), p = i < 0 ? raw : raw.slice(0, i), s = i < 0 ? '' : raw.slice(i + 1), q = {};
  new URLSearchParams(s).forEach((v, k) => { if (QK.includes(k)) q[k] = String(v).slice(0, 40); });
  return { parts: p.split('/').filter(Boolean).map((x) => x.slice(0, 60)), q };
}
const TITLES = { '': ['سرايا | عشاء على النيل', 'Saraya | Dinner on the Nile'], menu: ['المنيو | سرايا', 'Menu | Saraya'], reserve: ['احجز طاولة | سرايا', 'Reserve | Saraya'], cafe: ['الكافيه | سرايا', 'Café | Saraya'], events: ['المناسبات | سرايا', 'Events | Saraya'], story: ['الحكاية | سرايا', 'Story | Saraya'], contact: ['تواصل | سرايا', 'Contact | Saraya'], my: ['حجوزاتي | سرايا', 'My reservations | Saraya'] };
function applyDoc() { const r = document.documentElement; r.lang = S.lang; r.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; r.dataset.theme = S.theme; }
function render() {
  const { parts, q } = parse(), r = parts[0] || '';
  if (r !== 'reserve') S.done = null;
  let main;
  if (r === '') main = vHome(); else if (r === 'menu') main = vMenu(q); else if (r === 'reserve') main = vReserve(q); else if (r === 'cafe') main = vCafe(); else if (r === 'events') main = vEvents(); else if (r === 'story') main = vStory(); else if (r === 'contact') main = vContact(); else if (r === 'my') main = vMy(); else main = vNF();
  document.title = (TITLES[r] || TITLES[''])[S.lang === 'ar' ? 0 : 1];
  const app = document.getElementById('app'), m = h('main', { id: 'main' }, main);
  app.replaceChildren(...header(r), m, footer(), mbar());
  if (!keepNext) window.scrollTo(0, 0);
  if (S.fk) { const el = document.querySelector(`[data-k="${S.fk}"]`); if (el) el.focus({ preventScroll: true }); S.fk = ''; }
  keepNext = false;
}
window.addEventListener('hashchange', () => { S.menu = false; S.open = ''; render(); });
applyDoc(); render();
})();
