/* Nabd Clinics — static SPA. Dynamic text only via textContent; nothing is transmitted. */
(() => {
'use strict';
const { SP, DR, BR, SV, PK, SYM, RV, FAQ, HOT, MAIL, WA, AMB } = window.D;
const IMG = 'img/', TEL = (n) => 'tel:' + n.replace(/[^+\d]/g, '');
const S = { lang: 'ar', theme: 'light', appts: [], menu: false, fk: '', bk: { type: 'clinic' }, pkg: '' };
const X = (a, e) => (S.lang === 'ar' ? a : e);
const pick = (o) => o[S.lang];
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
const sp = (id) => SP.find((x) => x.id === id);
const dr = (id) => DR.find((x) => x.id === id);
const br = (id) => BR.find((x) => x.id === id);
const loc = () => (S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB');
const num = (n, d) => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: d === undefined ? 0 : d, minimumFractionDigits: d || 0 }).format(n);
const egp = (n) => `${num(n)} ${X('ج.م', 'EGP')}`;
const hits = []; function limited() { const n = Date.now(); while (hits.length && n - hits[0] > 60000) hits.shift(); if (hits.length >= 5) { toast(X('محاولات كثيرة. انتظر دقيقة وحاول مرة أخرى.', 'Too many attempts. Please wait a minute and try again.')); return true; } hits.push(n); return false; }
const ISO = /^\d{4}-\d{2}-\d{2}$/, HM = /^\d{2}:\d{2}$/, REF = /^NB-[A-Z2-9]{6}$/;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/, PHONE = /^\+?[0-9][0-9 ()\-]{6,19}$/;

/* ---------- persistence ---------- */
const validAppt = (a) => a && typeof a === 'object' && REF.test(a.ref) && dr(a.doc) && ISO.test(a.d) && HM.test(a.t) && (a.type === 'clinic' || a.type === 'tele') && typeof a.name === 'string' && a.name.length <= 60;
(() => {
  S.lang = load('nabd_lang') === 'en' ? 'en' : 'ar';
  const th = load('nabd_theme'); S.theme = th === 'dark' || th === 'light' ? th : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const r = load('nabd_appts');
  if (Array.isArray(r)) S.appts = r.filter(validAppt).slice(0, 12).map((a) => ({ ref: a.ref, doc: a.doc, d: a.d, t: a.t, type: a.type, name: a.name }));
})();
const saveAppts = () => save('nabd_appts', S.appts);

/* ---------- dates & slots ---------- */
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const at = (d, t) => { const [h, m] = t.split(':').map(Number); const x = new Date(d); x.setHours(h, m, 0, 0); return x; };
const hhmm = (m) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
const dFmt = (d, o) => new Intl.DateTimeFormat(loc(), o).format(d);
const tLab = (t) => new Intl.DateTimeFormat(loc(), { hour: 'numeric', minute: '2-digit', hour12: true }).format(at(new Date(2000, 0, 1), t));
function dayList(n) { const a = [], d = new Date(); d.setHours(0, 0, 0, 0); for (let i = 0; a.length < n && i < 40; i++) { const x = new Date(d); x.setDate(d.getDate() + i); if (x.getDay() !== 5) a.push(x); } return a; }
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function slotsFor(doc, d) {
  if (!doc.days.includes(d.getDay())) return [];
  const out = [], lead = Date.now() + 3600000, key = iso(d);
  for (let m = doc.from * 60; m < doc.to * 60; m += doc.step) {
    const t = hhmm(m); if (at(d, t).getTime() <= lead) continue;
    const taken = hash(doc.id + key + t) % 100 < 38 || S.appts.some((a) => a.doc === doc.id && a.d === key && a.t === t);
    out.push({ t, taken });
  }
  return out;
}
const free = (doc, d) => slotsFor(doc, d).filter((s) => !s.taken);
function nextSlot(doc) { for (const d of dayList(14)) { const f = free(doc, d); if (f.length) return { d, iso: iso(d), t: f[0].t, n: f.length }; } return null; }
function rel(d) {
  const t = new Date(); t.setHours(0, 0, 0, 0); const diff = Math.round((d - t) / 864e5);
  if (diff === 0) return X('اليوم', 'Today'); if (diff === 1) return X('غدًا', 'Tomorrow');
  return dFmt(d, { weekday: 'long', day: 'numeric', month: 'short' });
}
const when = (a) => `${rel(fromIso(a.d))} · ${tLab(a.t)}`;
const apptAt = (a) => at(fromIso(a.d), a.t);

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) { const v = props[k]; if (v === undefined || v === null || v === false) continue; if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v); }
  add(e, kids); return e;
}
function add(e, kids) { for (const c of kids.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); } }
const ICON = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  check: '<path d="m5 12 5 5 9-10"/>', star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M6 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5L16 12.5 20 14v4a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z"/>', video: '<rect x="3" y="6" width="12" height="12" rx="3"/><path d="m15 11 6-3v8l-6-3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>', cal: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4m8-4v4M4 10h16"/>',
  alert: '<path d="M12 4 3 19h18L12 4Z"/><path d="M12 10v4m0 3h.01"/>', trash: '<path d="M5 7h14M10 7V4h4v3m-7 0 1 13h8l1-13"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 15h8"/>', scan: '<path d="M4 8V6a2 2 0 0 1 2-2h2m8 0h2a2 2 0 0 1 2 2v2M4 16v2a2 2 0 0 0 2 2h2m8 0h2a2 2 0 0 0 2-2v-2M4 12h16"/>',
  wa: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.300 18.800L4 20Z"/><path d="M9 9c0 3 3 6 6 6l1-2-2-1-1 .8c-1-.4-2-1.400-2.400-2.400L11 10 10 8 9 9Z"/>',
  /* specialties */
  im: '<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a4 4 0 0 0 8 0v-1"/><circle cx="18" cy="12" r="2"/>', cardio: '<path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.600A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z"/><path d="M7 11h3l1.500-2.500 2 5 1.500-2.500h2"/>',
  peds: '<circle cx="12" cy="12" r="8.500"/><path d="M9 10.500h.01M15 10.500h.01M9 14.500c1 1.300 5 1.300 6 0"/>', obgyn: '<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>',
  derm: '<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11Z"/><path d="M9.500 15a2.500 2.500 0 0 0 2.500 2.500"/>', ortho: '<path d="M7.500 6.500a2 2 0 1 0-3 2 2 2 0 1 0 2.500 3l5.500 5.500a2 2 0 1 0 3 2.500 2 2 0 1 0 2-3.500 2 2 0 1 0 2.500-3L12.500 7A2 2 0 0 0 7.500 6.500Z"/>',
  ent: '<path d="M7 10a5 5 0 0 1 10 0c0 3-2 3.500-3 5.500S13 20 11 20s-2-1.500-2-2.500"/><path d="M10 10a2 2 0 0 1 4 0"/>', eye: '<path d="M2 12s3.600-6 10-6 10 6 10 6-3.600 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  dental: '<path d="M8 4c-2.500 0-4 2-4 4.500 0 2 1 3 1.500 5.500S6.500 20 8 20s1.500-3 2-4.500S11 14 12 14s1.500 0 2 1.500.5 4.500 2 4.500 1.500-3.500 2.500-6S20 10.500 20 8.500C20 6 18.500 4 16 4c-1.500 0-2.500 1-4 1S9.500 4 8 4Z"/>',
  neuro: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 4 3 3 0 0 0 2 4 3 3 0 0 0 3 5V4Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 4 3 3 0 0 1-2 4 3 3 0 0 1-3 5V4Z"/>', nutri: '<path d="M12 8c-2-1.500-6-1-6 4 0 4 3 8 5 8 .600 0 .800-.300 1-.300s.400.300 1 .300c2 0 5-4 5-8 0-5-4-5.500-6-4Z"/><path d="M12 8c0-2 1-3.500 3-4"/>'
};
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // constants only
let toastT;
function toast(msg, href, label) { let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); } e.replaceChildren(h('span', null, msg), href ? h('a', { href, onclick: () => { e.hidden = true; } }, label) : null); e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 4000); }
let keepNext = false;
const go = (hash, fk) => { keepNext = true; S.fk = fk || ''; if (location.hash === hash) render(); else location.hash = hash; };
const qs = (o) => { const a = Object.keys(o).filter((k) => o[k] !== undefined && o[k] !== '' && o[k] !== null).map((k) => k + '=' + encodeURIComponent(o[k])); return a.length ? '?' + a.join('&') : ''; };
function sh(kick, title, p, lvl) { return h('div', { class: 'sh' }, kick ? h('span', { class: 'pill kick', text: kick }) : null, h(lvl || 'h2', { text: title }), p ? h('p', { text: p }) : null); }
function field(label, ctrl, id, extra) { return h('div', { class: 'fld' + (extra ? ' ' + extra : '') }, h('label', { for: id, text: label }), ctrl, h('div', { class: 'err', id: id + '-e', role: 'alert' })); }
const opt = (v, txt, sel) => h('option', { value: v, selected: sel ? true : undefined, text: txt });
function setErr(c, msg) { const e = document.getElementById(c.id + '-e'); if (e) e.textContent = msg || ''; if (msg) { c.setAttribute('aria-invalid', 'true'); c.setAttribute('aria-describedby', c.id + '-e'); } else { c.removeAttribute('aria-invalid'); c.removeAttribute('aria-describedby'); } return !msg; }
const E_REQ = () => X('هذا الحقل مطلوب', 'This field is required'), E_MAIL = () => X('اكتب بريدًا صحيحًا', 'Enter a valid email'), E_PH = () => X('اكتب رقم موبايل صحيحًا', 'Enter a valid mobile number');
const hp = () => h('input', { class: 'hp', type: 'text', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' });
function opts(list, cur, onPick, label, keyp) { return h('div', { class: 'opts', role: 'group', 'aria-label': label }, list.map(([k, l]) => h('button', { type: 'button', 'aria-pressed': String(cur === k), 'data-k': keyp + k, onclick: () => onPick(k === cur ? '' : k, keyp + k) }, l))); }
const stars = (n) => h('span', { class: 'stars', role: 'img', 'aria-label': X(`${n} من 5`, `${n} out of 5`) }, [1, 2, 3, 4, 5].map((i) => ic('star', i <= n ? '' : 'off')));
const spName = (id) => pick(sp(id));
const title = (doc) => `${pick(doc.n)} — ${spName(doc.sp)}`;

/* ---------- shared parts ---------- */
function upcoming() { const n = Date.now(); return S.appts.filter((a) => apptAt(a).getTime() > n); }
function pulse() { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 32 32'); s.setAttribute('aria-hidden', 'true'); s.innerHTML = '<rect width="32" height="32" rx="10" fill="#0b7a75"/><path d="M4 17h6l3-7 5 13 3-6h7" fill="none" stroke="#fff" stroke-width="2.800" stroke-linecap="round" stroke-linejoin="round"/>'; return s; } // constant markup
const brand = () => h('a', { class: 'brand', href: '#/', 'aria-label': X('نبض للعيادات — الرئيسية', 'Nabd Clinics — home') }, pulse(), h('span', { text: X('نبض', 'Nabd') }));
const NAV = [['', ['الرئيسية', 'Home']], ['doctors', ['الأطباء', 'Doctors']], ['specialties', ['التخصصات', 'Specialties']], ['telehealth', ['أونلاين', 'Online']], ['packages', ['الباقات', 'Check-ups']], ['branches', ['الفروع', 'Branches']], ['contact', ['تواصل', 'Contact']]];
function header(route) {
  const n = upcoming().length;
  const nav = h('nav', { class: 'nav', id: 'nav', 'data-open': String(S.menu), 'aria-label': X('التنقل الرئيسي', 'Main') }, NAV.map(([r, l]) => h('a', { href: '#/' + r, 'aria-current': r === route ? 'page' : undefined, onclick: () => { S.menu = false; } }, X(l[0], l[1]))));
  return [
    h('aside', { class: 'top', 'aria-label': X('الخط الساخن والطوارئ', 'Hotline and emergencies') }, h('div', { class: 'wrap' },
      h('a', { href: TEL(HOT) }, X('الخط الساخن: ', 'Hotline: '), h('bdi', { dir: 'ltr', class: 'num', text: HOT })),
      h('span', { class: 'amb' }, X('حالة طارئة؟ اتصل بالإسعاف ', 'Emergency? Call the ambulance '), h('bdi', { dir: 'ltr', class: 'num', text: AMB })))),
    h('header', { class: 'hdr' }, h('div', { class: 'wrap' }, brand(), nav,
      h('div', { class: 'hact' },
        h('a', { class: 'ib badge', href: '#/my', 'aria-label': X('مواعيدي', 'My appointments') }, ic('cal'), n ? h('span', { class: 'n', text: num(n) }) : null),
        h('button', { class: 'ib', type: 'button', 'aria-label': S.lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية', onclick: () => { S.lang = S.lang === 'ar' ? 'en' : 'ar'; save('nabd_lang', S.lang); applyDoc(); render(); } }, S.lang === 'ar' ? 'EN' : 'ع'),
        h('button', { class: 'ib', type: 'button', 'aria-label': X('تبديل الوضع الليلي', 'Toggle dark mode'), onclick: () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save('nabd_theme', S.theme); applyDoc(); render(); } }, ic(S.theme === 'dark' ? 'sun' : 'moon')),
        h('a', { class: 'btn btn--c btn--sm', href: '#/book', text: X('احجز الآن', 'Book now') }),
        h('button', { class: 'ib burger', type: 'button', 'aria-expanded': String(S.menu), 'aria-controls': 'nav', 'aria-label': X('القائمة', 'Menu'), onclick: () => { S.menu = !S.menu; render(); } }, ic(S.menu ? 'x' : 'menu'))))) ];
}
function footer() {
  const L = (r, l) => h('a', { href: '#/' + r, text: X(l[0], l[1]) });
  return h('footer', { class: 'ftr' }, h('div', { class: 'wrap' },
    h('div', { class: 'g' },
      h('div', null, brand(), h('p', { style: 'margin-block-start:.8rem;max-inline-size:34ch', text: X('عيادات متعددة التخصصات في القاهرة والجيزة. حجز سهل، تحاليل وأشعة في نفس المكان، وكشف أونلاين.', 'Multi-specialty clinics in Cairo and Giza. Easy booking, labs and imaging on site, and online visits.') })),
      h('div', null, h('h2', { class: 'fh', text: X('احجز', 'Book') }), L('doctors', ['كل الأطباء', 'All doctors']), L('specialties', ['التخصصات', 'Specialties']), L('telehealth', ['كشف أونلاين', 'Online visit']), L('my', ['مواعيدي', 'My appointments'])),
      h('div', null, h('h2', { class: 'fh', text: X('الخدمات', 'Services') }), L('packages', ['باقات الفحص الدوري', 'Check-up packages']), L('branches', ['الفروع', 'Branches']), L('contact', ['تواصل معنا', 'Contact'])),
      h('div', null, h('h2', { class: 'fh', text: X('تواصل', 'Contact') }), h('a', { href: TEL(HOT) }, h('bdi', { dir: 'ltr', class: 'num', text: HOT })), h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL })), h('a', { href: 'https://wa.me/' + WA.replace(/\D/g, ''), rel: 'noopener noreferrer', target: '_blank' }, X('واتساب', 'WhatsApp')))),
    h('div', { class: 'cp' }, h('span', { text: X('© 2026 نبض للعيادات. جميع الحقوق محفوظة.', '© 2026 Nabd Clinics. All rights reserved.') }), h('span', { text: X('المعلومات هنا لا تغني عن استشارة الطبيب.', 'Information here does not replace a doctor’s advice.') }))));
}
function mbar() { return h('aside', { class: 'mbar', 'aria-label': X('إجراءات سريعة', 'Quick actions') }, h('a', { class: 'btn btn--o', href: TEL(HOT) }, ic('phone'), X('اتصل', 'Call')), h('a', { class: 'btn btn--c', href: '#/book' }, ic('cal'), X('احجز الآن', 'Book now'))); }
function faq(list) { return h('div', null, (list || FAQ).map((f) => h('details', { class: 'acc' }, h('summary', { text: pick(f.q) }), h('p', { text: pick(f.a) })))); }
function cta(t, p) { return h('section', { class: 'wrap sec' }, h('div', { class: 'cta' }, h('div', null, h('h2', { text: t || X('محتاج كشف؟ موعدك أقرب مما تتخيل', 'Need a visit? Your slot is closer than you think') }), h('p', { text: p || X('اختر الدكتور واليوم والوقت، ويصلك التأكيد فورًا.', 'Choose a doctor, day and time, and get confirmation instantly.') })),
  h('div', { class: 'acts' }, h('a', { class: 'btn btn--c', href: '#/book' }, X('احجز الآن', 'Book now'), ic('arrow', 'flip')), h('a', { class: 'btn btn--o', href: TEL(HOT) }, ic('phone'), h('bdi', { dir: 'ltr', class: 'num', text: HOT }))))); }
const emergency = () => h('div', { class: 'safe', role: 'note' }, ic('alert'), h('span', null, X('هذا الموقع للحجز غير الطارئ. في حالات ألم الصدر الشديد أو صعوبة التنفس أو فقدان الوعي، اتصل بالإسعاف ', 'This site is for non-emergency booking. For severe chest pain, trouble breathing or loss of consciousness, call the ambulance '), h('bdi', { dir: 'ltr', class: 'num', text: AMB }), X(' فورًا.', ' immediately.')));

function dcard(doc, lvl) {
  const nx = nextSlot(doc), brs = doc.br.map((b) => pick(br(b).n)).join(' · ');
  return h('article', { class: 'dc' },
    h('div', { class: 'ph' }, h('img', { src: IMG + doc.img + '.webp', alt: pick(doc.n), loading: 'lazy', decoding: 'async', width: 512, height: 512 }), doc.tele ? h('span', { class: 'pill' }, ic('video'), X('أونلاين متاح', 'Online available')) : null),
    h('div', { class: 'b' },
      h(lvl || 'h3', null, h('a', { href: '#/doctor/' + doc.id, text: pick(doc.n) })),
      h('div', { class: 't', text: pick(doc.t) }),
      h('div', { class: 'row' }, h('span', { class: 'rate' }, ic('star'), h('span', { class: 'num', text: num(doc.rt, 1) }), h('small', { text: `(${num(doc.rv)})` })), h('span', { text: X(`${num(doc.yrs)} سنة خبرة`, `${num(doc.yrs)} yrs experience`) })),
      h('div', { class: 'row' }, h('span', { text: brs }), h('span', { class: 'fee' }, egp(doc.fee))),
      h('div', { class: 'nx' }, h('div', { class: 'l' }, nx ? [X('أقرب موعد: ', 'Next: '), h('b', { text: `${rel(nx.d)} · ${tLab(nx.t)}` })] : X('لا توجد مواعيد قريبة', 'No upcoming slots')),
        h('div', { class: 'acts' }, h('a', { class: 'btn btn--p btn--sm', href: '#/book' + qs(nx ? { doc: doc.id, d: nx.iso, t: nx.t } : { doc: doc.id }), text: X('احجز', 'Book') }), h('a', { class: 'btn btn--o btn--sm', href: '#/doctor/' + doc.id, text: X('الملف', 'Profile') })))));
}

/* slot picker: day strip + times; onPick(isoDate, time) */
function picker(doc, onPick, selD, selT) {
  const ds = dayList(10), info = ds.map((d) => ({ d, k: iso(d), f: free(doc, d).length }));
  let cur = (info.find((x) => x.k === selD && x.f) || info.find((x) => x.f) || info[0]).k;
  const wrap = h('div', null), times = h('div', { class: 'times', role: 'group', 'aria-label': X('الأوقات المتاحة', 'Available times') }), dayBox = h('div', { class: 'days', role: 'group', 'aria-label': X('اختر اليوم', 'Choose a day') });
  const paintDays = () => dayBox.replaceChildren(...info.map((x) => h('button', { type: 'button', class: 'day', 'aria-pressed': String(x.k === cur), disabled: x.f ? undefined : true, onclick: () => { cur = x.k; paintDays(); paintTimes(); } },
    h('small', { text: dFmt(x.d, { weekday: 'short' }) }), h('b', { class: 'num', text: dFmt(x.d, { day: 'numeric' }) }), h('small', { text: dFmt(x.d, { month: 'short' }) }))));
  const paintTimes = () => { const d = info.find((x) => x.k === cur).d; const sl = slotsFor(doc, d); times.replaceChildren(...(sl.length ? sl.map((s) => h('button', { type: 'button', class: 'tm num', disabled: s.taken ? true : undefined, 'aria-pressed': String(cur === selD && s.t === selT), onclick: () => onPick(cur, s.t), text: tLab(s.t) })) : [h('p', { class: 'note', text: X('لا توجد مواعيد في هذا اليوم.', 'No slots on this day.') })])); };
  paintDays(); paintTimes();
  add(wrap, [dayBox, times, h('p', { class: 'note', style: 'margin-block-start:.7rem', text: X('المواعيد المشطوبة محجوزة. يمكن الحجز حتى ساعة قبل الموعد.', 'Struck-through times are taken. You can book up to one hour ahead.') })]);
  return wrap;
}

/* ---------- views ---------- */
function vHome() {
  const avg = DR.reduce((s, d) => s + d.rt, 0) / DR.length;
  const ss = h('select', { class: 'in', id: 'hs' }, opt('', X('كل التخصصات', 'All specialties')), SP.map((x) => opt(x.id, pick(x)))),
    bs = h('select', { class: 'in', id: 'hb' }, opt('', X('كل الفروع', 'All branches')), BR.map((x) => opt(x.id, pick(x.n)))),
    ts = h('select', { class: 'in', id: 'ht' }, opt('', X('في العيادة أو أونلاين', 'In clinic or online')), opt('1', X('أونلاين فقط', 'Online only')));
  const find = h('form', { class: 'find', novalidate: true, onsubmit: (e) => { e.preventDefault(); go('#/doctors' + qs({ spec: ss.value, br: bs.value, tele: ts.value })); } }, field(X('التخصص', 'Specialty'), ss, 'hs'), field(X('الفرع', 'Branch'), bs, 'hb'), field(X('نوع الكشف', 'Visit type'), ts, 'ht'), h('button', { class: 'btn btn--c', type: 'submit' }, ic('user'), X('ابحث عن دكتور', 'Find a doctor')));
  const soon = DR.map((d) => ({ d, n: nextSlot(d) })).filter((x) => x.n).sort((a, b) => at(a.n.d, a.n.t) - at(b.n.d, b.n.t)).slice(0, 4).map((x) => x.d);
  const first = soon[0] && nextSlot(soon[0]);
  const steps = [[X('اختر الدكتور', 'Pick a doctor'), X('بالتخصص أو الفرع أو اللغة، وشوف أقرب موعد لكل دكتور.', 'By specialty, branch or language, with each doctor’s next slot shown.')], [X('حدد اليوم والوقت', 'Choose day and time'), X('المواعيد الظاهرة هي المتاحة فعلًا، ومفيش حاجة هتتغير بعد الحجز.', 'Slots shown are genuinely open and will not change after you book.')], [X('أكد بياناتك', 'Confirm your details'), X('اسمك ورقم موبايلك فقط. بيوصلك رقم الحجز فورًا وتذكير قبل الموعد.', 'Just your name and mobile number. You get a booking number at once and a reminder before your visit.')]];
  return [
    h('section', { class: 'hero' }, h('div', { class: 'wrap' },
      h('div', null, h('span', { class: 'pill kick', text: X('11 تخصصًا · 3 فروع · كشف أونلاين', '11 specialties · 3 branches · online visits') }),
        h('h1', null, X('صحتك أولًا، ', 'Your health first, '), h('mark', { text: X('وموعدك في دقيقتين', 'booked in two minutes') })),
        h('p', { class: 'lead', text: X('احجز مع أطباء مختارين في القاهرة والجيزة، واعمل التحاليل والأشعة في نفس المكان. تفاصيل الكشف والسعر واضحة قبل ما تحجز.', 'Book with carefully chosen doctors in Cairo and Giza, with labs and imaging on site. Visit details and fees are clear before you book.') }),
        find, h('div', { style: 'margin-block-start:1rem' }, emergency())),
      h('div', { class: 'hero__img' }, h('div', { class: 'pic' }, h('img', { src: IMG + 'hero.webp', alt: X('طبيبة تتحدث مع زوجين أثناء الكشف', 'A doctor speaking with a couple during a consultation'), width: 1024, height: 572, fetchpriority: 'high', decoding: 'async' })),
        first ? h('div', { class: 'float' }, h('span', { class: 'dot' }, ic('clock')), h('div', null, h('b', { text: X('أقرب موعد متاح', 'Next available') }), h('span', { text: `${pick(soon[0].n)} · ${rel(first.d)} ${tLab(first.t)}` }))) : null,
        h('div', { class: 'float float--t' }, h('span', { class: 'dot' }, ic('star')), h('div', null, h('b', null, h('bdi', { dir: 'ltr', class: 'num', text: num(avg, 1) + ' / 5' })), h('span', { text: X('تقييم المرضى', 'Patient rating') }))),
        h('div', { class: 'float float--m' }, h('span', { class: 'dot' }, ic('video')), h('div', null, h('b', { text: X('كشف أونلاين', 'Online visits') }), h('span', { text: X('متاح الآن', 'Available now') })))))),
    h('section', { class: 'wrap', style: 'padding-block:1.5rem 0' }, h('div', { class: 'stats' },
      [[num(DR.length), X('طبيبًا مختارًا', 'selected doctors')], [num(SP.length), X('تخصصًا', 'specialties')], [num(BR.length), X('فروع', 'branches')], [num(avg, 1), X('متوسط تقييم المرضى', 'average patient rating')]].map(([b, p]) => h('div', { class: 'stat' }, h('b', { class: 'num', text: b }), h('p', { text: p }))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh(X('التخصصات', 'Specialties'), X('ابدأ بالتخصص اللي محتاجه', 'Start with the specialty you need')), spGrid())),
    h('section', { class: 'sec band' }, h('div', { class: 'wrap' }, helper())),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh(X('أقرب المواعيد', 'Soonest appointments'), X('أطباء عندهم موعد متاح قريبًا', 'Doctors with an opening soon')), h('div', { class: 'drs' }, soon.map((d) => dcard(d))), h('p', { style: 'margin-block-start:1.2rem' }, h('a', { class: 'btn btn--o', href: '#/doctors' }, X('كل الأطباء', 'All doctors'), ic('arrow', 'flip'))))),
    h('section', { class: 'sec band' }, h('div', { class: 'wrap' }, sh(X('الحجز', 'Booking'), X('تلات خطوات وخلصت', 'Three steps and done')), h('ol', { class: 'how' }, steps.map(([a, b]) => h('li', null, h('h3', { text: a }), h('p', { text: b })))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh(X('كل حاجة في مكان واحد', 'Everything in one place'), X('بعد الكشف، مش لازم تلف على معمل ومركز أشعة.', 'After your visit there is no need to hunt for a lab or an imaging centre.')),
      h('div', { class: 'svs' },
        svc('lab', X('معمل التحاليل', 'Laboratory'), X('نتائج بتوصلك على الإيميل أو واتساب خلال ساعات، مع إمكانية السحب من المنزل.', 'Results reach you by email or WhatsApp within hours, with optional home sampling.'), '#/packages', X('شوف باقات الفحص', 'See check-up packages')),
        svc('imaging', X('الأشعة والسونار', 'Imaging & ultrasound'), X('سونار وإيكو وأشعة عادية في فرعين، وتقرير مكتوب من استشاري الأشعة.', 'Ultrasound, echo and X-ray at two branches, with a written report by a consultant radiologist.'), '#/branches', X('الفروع والمواعيد', 'Branches & hours')),
        svc('tele', X('كشف أونلاين', 'Online visits'), X('فيديو آمن مع نفس الدكتور وبسعر أقل، ومناسب للمتابعة وقراءة النتائج.', 'A secure video call with the same doctor at a lower fee, ideal for follow-ups and results.'), '#/telehealth', X('اعرف أكتر', 'Learn more'))))),
    h('section', { class: 'sec band' }, h('div', { class: 'wrap split' },
      h('div', { class: 'pic' }, h('img', { src: IMG + 'team.webp', alt: X('فريق من الأطباء داخل المركز', 'A team of doctors inside the centre'), width: 1024, height: 572, loading: 'lazy', decoding: 'async' })),
      h('div', null, sh(X('فريقنا', 'Our team'), X('أطباء بخبرة، ووقت كافٍ لكل مريض', 'Experienced doctors, enough time for every patient')),
        h('ul', { class: 'pk', style: 'background:none;border:0;padding:0' }, h('li', null, h('ul', { style: 'margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:.6rem' },
          [X('كشف مدته 20 إلى 30 دقيقة بحسب التخصص', 'Visits of 20 to 30 minutes depending on the specialty'), X('السعر واضح قبل الحجز، من غير رسوم مفاجئة', 'Fees shown up front, with no surprise charges'), X('ملخص مكتوب بعد كل زيارة', 'A written summary after every visit'), X('تقدر تغيّر أو تلغي الموعد حتى 3 ساعات قبله', 'Change or cancel up to 3 hours before')].map((t) => h('li', { style: 'display:flex;gap:.6rem;align-items:flex-start' }, ic('check'), h('span', { text: t })))))),
        h('p', { style: 'margin-block-start:1.2rem' }, h('a', { class: 'btn btn--p', href: '#/doctors', text: X('تعرف على الأطباء', 'Meet the doctors') }))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh(X('آراء المرضى', 'Patient reviews'), X('ماذا يقولون بعد الزيارة', 'What patients say after a visit')), h('div', { class: 'rvs' }, RV.map((r) => h('blockquote', { class: 'rv' }, stars(r.s), h('p', { text: pick(r.t) }), h('footer', null, h('span', { text: pick(r.n) }), h('a', { href: '#/doctor/' + r.dr, text: pick(dr(r.dr).n) }))))))),
    h('section', { class: 'sec', style: 'padding-block-start:0' }, h('div', { class: 'wrap' }, sh('', X('أسئلة شائعة', 'FAQ')), faq())),
    cta()
  ];
}
function svc(img, t, p, href, l) { return h('article', { class: 'sv' }, h('div', { class: 'pic' }, h('img', { src: IMG + img + '.webp', alt: '', loading: 'lazy', decoding: 'async', width: 1024, height: 640 })), h('div', { class: 'b' }, h('h3', { text: t }), h('p', { text: p }), h('a', { class: 'btn btn--l btn--sm', href }, l, ic('arrow', 'flip')))); }
function spGrid(list) {
  return h('div', { class: 'sps' + (list ? ' sps--l' : '') }, SP.map((x) => h('a', { class: 'sp', href: '#/doctors' + qs({ spec: x.id }) }, h('span', { class: 'i' }, ic(x.id)), h('span', null, h('b', { text: pick(x) }), list ? h('small', { text: pick(x.d) }) : null, h('small', { style: list ? 'display:block;margin-block-start:.2rem' : 'display:block', text: X(`${num(DR.filter((d) => d.sp === x.id).length)} طبيب`, `${num(DR.filter((d) => d.sp === x.id).length)} doctor${DR.filter((d) => d.sp === x.id).length === 1 ? '' : 's'}`) })))));
}
function helper() {
  let cur = '';
  const res = h('div', { class: 'res', 'aria-live': 'polite' });
  const paint = () => {
    const s = SYM.find((x) => x.id === cur);
    if (!s) { res.replaceChildren(h('p', { text: X('اختر العرض الأقرب لحالتك لنقترح لك التخصص المناسب.', 'Pick the symptom closest to yours and we will suggest a specialty.') })); return; }
    res.replaceChildren(s.urgent ? h('div', { class: 'urgent' }, X('لو الألم شديد أو مستمر أو معاه ضيق نفس، اتصل بالإسعاف ', 'If pain is severe, persistent or with shortness of breath, call the ambulance '), h('bdi', { dir: 'ltr', class: 'num', text: AMB }), X(' ولا تنتظر موعدًا.', ' and do not wait for an appointment.')) : null,
      h('p', null, X('التخصص المقترح: ', 'Suggested specialty: '), h('b', { text: spName(s.sp) })),
      h('div', null, h('a', { class: 'btn btn--p btn--sm', href: '#/doctors' + qs({ spec: s.sp }) }, X('شوف الأطباء', 'See doctors'), ic('arrow', 'flip'))),
      h('small', { text: X('اقتراح عام للإرشاد فقط وليس تشخيصًا.', 'A general pointer only, not a diagnosis.') }));
  };
  const box = h('div'); const draw = () => box.replaceChildren(opts(SYM.map((x) => [x.id, pick(x)]), cur, (v, k) => { cur = v; draw(); paint(); const b = box.querySelector(`[data-k="${k}"]`); if (b) b.focus(); }, X('الأعراض', 'Symptoms'), 'sy-'));
  draw(); paint();
  return h('div', { class: 'help' }, h('div', null, sh(X('مش عارف تحجز عند مين؟', 'Not sure who to see?'), X('اختر ما تشعر به', 'Choose what you feel'), null, 'h2'), box), res);
}

function vDoctors(q) {
  const f = { spec: sp(q.spec) ? q.spec : '', br: br(q.br) ? q.br : '', lang: q.lang === 'ar' || q.lang === 'en' ? q.lang : '', g: q.g === 'f' || q.g === 'm' ? q.g : '', today: q.today === '1' ? '1' : '', tele: q.tele === '1' ? '1' : '', sort: ['rating', 'fee'].includes(q.sort) ? q.sort : '', q: (q.q || '').slice(0, 40) };
  const term = f.q.toLowerCase().trim(), now = new Date(); now.setHours(0, 0, 0, 0);
  let list = DR.filter((d) => (!f.spec || d.sp === f.spec) && (!f.br || d.br.includes(f.br)) && (!f.lang || d.lang.includes(f.lang)) && (!f.g || d.g === f.g) && (!f.tele || d.tele) && (!f.today || free(d, now).length) && (!term || (d.n.ar + ' ' + d.n.en).toLowerCase().includes(term)));
  const nx = new Map(list.map((d) => [d.id, nextSlot(d)]));
  list = list.slice().sort((a, b) => f.sort === 'rating' ? b.rt - a.rt : f.sort === 'fee' ? a.fee - b.fee : ((nx.get(a.id) ? at(nx.get(a.id).d, nx.get(a.id).t).getTime() : 9e15) - (nx.get(b.id) ? at(nx.get(b.id).d, nx.get(b.id).t).getTime() : 9e15)));
  const nav = (o, fk) => go('#/doctors' + qs(Object.assign({}, f, o)), fk);
  const inp = h('input', { class: 'in', id: 'dq', type: 'search', maxlength: 40, value: f.q, placeholder: X('اسم الدكتور', 'Doctor name') }); inp.addEventListener('change', () => nav({ q: inp.value.trim().slice(0, 40) }, 'q'));
  const srt = h('select', { class: 'in', id: 'ds', 'data-k': 'sort', onchange: (e) => nav({ sort: e.target.value }, 'sort') }, opt('', X('الأقرب موعدًا', 'Soonest'), !f.sort), opt('rating', X('الأعلى تقييمًا', 'Top rated'), f.sort === 'rating'), opt('fee', X('الأقل سعرًا', 'Lowest fee'), f.sort === 'fee'));
  const any = Object.keys(f).some((k) => f[k] && k !== 'sort');
  return h('div', { class: 'wrap sec' }, sh('', f.spec ? spName(f.spec) : X('كل الأطباء', 'All doctors'), f.spec ? pick(sp(f.spec).d) : X('اختر الدكتور المناسب وشوف أقرب موعد متاح له.', 'Choose the right doctor and see the next available slot.'), 'h1'),
    h('div', { class: 'filters' },
      h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('التخصص', 'Specialty') }), opts(SP.map((x) => [x.id, pick(x)]), f.spec, (v, k) => nav({ spec: v }, k), X('التخصص', 'Specialty'), 's-')),
      h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('الفرع', 'Branch') }), opts(BR.map((x) => [x.id, pick(x.n)]), f.br, (v, k) => nav({ br: v }, k), X('الفرع', 'Branch'), 'b-')),
      h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('تفضيلات', 'Preferences') }),
        opts([['today', X('متاح اليوم', 'Available today')], ['tele', X('أونلاين', 'Online')], ['ar', X('يتحدث العربية', 'Arabic')], ['en', X('يتحدث الإنجليزية', 'English')], ['f', X('طبيبة', 'Female doctor')], ['m', X('طبيب', 'Male doctor')]].filter(Boolean), '', (v, k) => { if (v === 'today') nav({ today: f.today ? '' : '1' }, k); else if (v === 'tele') nav({ tele: f.tele ? '' : '1' }, k); else if (v === 'ar' || v === 'en') nav({ lang: f.lang === v ? '' : v }, k); else nav({ g: f.g === v ? '' : v }, k); }, X('تفضيلات', 'Preferences'), 'p-')),
      h('div', { class: 'fbar' }, field(X('بحث بالاسم', 'Search by name'), inp, 'dq'), field(X('الترتيب', 'Sort'), srt, 'ds'), any ? h('button', { class: 'btn btn--l btn--sm', type: 'button', onclick: () => go('#/doctors', 'q') }, X('مسح الفلاتر', 'Clear filters')) : null)),
    h('p', { class: 'cnt', role: 'status', text: X(`${num(list.length)} دكتور`, `${num(list.length)} doctor${list.length === 1 ? '' : 's'}`) }),
    list.length ? h('div', { class: 'drs' }, list.map((d) => dcard(d, 'h2'))) : h('div', { class: 'empty' }, h('p', { text: X('لا يوجد أطباء بهذه الفلاتر.', 'No doctors match these filters.') }), h('p', { style: 'margin-block-start:.8rem' }, h('button', { class: 'btn btn--p btn--sm', type: 'button', onclick: () => go('#/doctors') }, X('عرض الكل', 'Show all')))));
}
/* active state for the preference chips is shown via aria-pressed set after render */
function paintPrefs(q) { const on = { today: q.today === '1', tele: q.tele === '1', ar: q.lang === 'ar', en: q.lang === 'en', f: q.g === 'f', m: q.g === 'm' }; document.querySelectorAll('[data-k^="p-"]').forEach((b) => { b.setAttribute('aria-pressed', String(!!on[b.dataset.k.slice(2)])); }); }

function vDoctor(id) {
  const doc = dr(id); if (!doc) return vNotFound();
  const reviews = RV.filter((r) => r.dr === id);
  return h('div', { class: 'wrap sec' },
    h('nav', { class: 'crumb', 'aria-label': X('مسار التنقل', 'Breadcrumb') }, h('a', { href: '#/doctors', text: X('الأطباء', 'Doctors') }), ' / ', h('a', { href: '#/doctors' + qs({ spec: doc.sp }), text: spName(doc.sp) }), ' / ', pick(doc.n)),
    h('div', { class: 'dp' }, h('div', { class: 'pic' }, h('img', { src: IMG + doc.img + '.webp', alt: pick(doc.n), width: 512, height: 512, decoding: 'async' })),
      h('div', { class: 'stack' },
        h('div', { class: 'card' }, h('h1', { style: 'font-size:clamp(1.4rem,1rem + 1.6vw,2rem)', text: pick(doc.n) }), h('p', { class: 'lead', style: 'margin-block:.3rem .6rem', text: pick(doc.t) }), h('p', { text: pick(doc.b) }),
          h('div', { class: 'facts' }, h('div', null, h('b', { class: 'num', text: num(doc.yrs) }), h('span', { text: X('سنة خبرة', 'years experience') })), h('div', null, h('b', { class: 'num', text: num(doc.rt, 1) + ' ★' }), h('span', { text: X(`من ${num(doc.rv)} تقييم`, `from ${num(doc.rv)} reviews`) })), h('div', null, h('b', { class: 'num', text: egp(doc.fee) }), h('span', { text: X('سعر الكشف', 'consultation fee') })), h('div', null, h('b', { text: doc.lang.map((l) => (l === 'ar' ? X('العربية', 'Arabic') : X('الإنجليزية', 'English'))).join(' · ') }), h('span', { text: X('لغات الكشف', 'languages') }))),
          h('div', { class: 'row', style: 'display:flex;gap:.5rem;flex-wrap:wrap;margin-block-start:1rem' }, doc.br.map((b) => h('span', { class: 'pill' }, ic('pin'), pick(br(b).n))), doc.tele ? h('span', { class: 'pill pill--ok' }, ic('video'), X('كشف أونلاين متاح', 'Online visits available')) : null)),
        h('div', { class: 'card' }, h('h2', { style: 'margin-block-end:.8rem', text: X('اختر موعدك', 'Choose your appointment') }), picker(doc, (d, t) => go('#/book' + qs({ doc: doc.id, d, t })))),
        reviews.length ? h('div', { class: 'card' }, h('h2', { style: 'margin-block-end:.8rem', text: X('آراء المرضى', 'Patient reviews') }), reviews.map((r) => h('blockquote', { class: 'rv', style: 'margin:0' }, stars(r.s), h('p', { text: pick(r.t) }), h('footer', null, h('span', { text: pick(r.n) }))))) : null)));
}

function steps(n) {
  const L = [X('الدكتور', 'Doctor'), X('الموعد', 'Time'), X('بياناتك', 'Details'), X('التأكيد', 'Done')];
  return h('ol', { class: 'steps', 'aria-label': X('خطوات الحجز', 'Booking steps') }, L.map((l, i) => h('li', { class: i + 1 < n ? 'done' : '', 'aria-current': i + 1 === n ? 'step' : undefined }, h('i', { class: 'num' }, i + 1 < n ? ic('check') : num(i + 1)), l)));
}
function summary(doc, d, t, type) {
  return h('aside', { class: 'card sum', 'aria-label': X('ملخص الحجز', 'Booking summary') },
    h('div', { class: 'mini' }, h('img', { src: IMG + doc.img + '.webp', alt: '', width: 64, height: 64 }), h('div', null, h('b', { text: pick(doc.n) }), h('div', { class: 'note', text: pick(doc.t) }))),
    h('dl', null, h('dt', { text: X('الموعد', 'When') }), h('dd', { class: 'num', text: d && t ? `${rel(fromIso(d))} · ${tLab(t)}` : '—' }), h('dt', { text: X('النوع', 'Type') }), h('dd', { text: type === 'tele' ? X('كشف أونلاين', 'Online visit') : X('في العيادة', 'In clinic') }), h('dt', { text: X('سعر الكشف', 'Fee') }), h('dd', { class: 'num', text: egp(type === 'tele' ? Math.round(doc.fee * 0.7 / 10) * 10 : doc.fee) })));
}
const teleFee = (doc) => Math.round(doc.fee * 0.7 / 10) * 10;
function newRef() { const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; const a = new Uint8Array(6); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach((_, i) => { a[i] = Math.floor(Math.random() * 256); }); return 'NB-' + Array.from(a, (v) => c[v % c.length]).join(''); }

function vBook(q) {
  if (q.ref && REF.test(q.ref)) { const a = S.appts.find((x) => x.ref === q.ref); if (a) return vDone(a); }
  const doc = dr(q.doc), re = REF.test(q.re || '') ? q.re : '';
  if (!doc) {
    let spf = '';
    const box = h('div'), draw = () => box.replaceChildren(
      h('div', { class: 'card' }, h('h2', { style: 'margin-block-end:.8rem', text: X('اختر التخصص', 'Choose a specialty') }), opts(SP.map((x) => [x.id, pick(x)]), spf, (v, k) => { spf = v; draw(); const b = box.querySelector(`[data-k="${k}"]`); if (b) b.focus(); }, X('التخصص', 'Specialty'), 'bs-')),
      h('div', { class: 'drs', style: 'margin-block-start:1rem' }, DR.filter((d) => !spf || d.sp === spf).map((d) => dcard(d))));
    draw(); return h('div', { class: 'wrap sec' }, sh('', X('احجز موعدك', 'Book an appointment'), X('ابدأ باختيار الدكتور.', 'Start by choosing a doctor.'), 'h1'), steps(1), box);
  }
  const d = ISO.test(q.d || '') ? q.d : '', t = HM.test(q.t || '') ? q.t : '';
  const slotOk = d && t && dayList(14).some((x) => iso(x) === d) && free(doc, fromIso(d)).some((s) => s.t === t);
  const type = doc.tele && S.bk.type === 'tele' ? 'tele' : 'clinic';
  if (!slotOk) {
    return h('div', { class: 'wrap sec' }, sh('', X('اختر الموعد', 'Choose a time'), pick(doc.n) + ' — ' + spName(doc.sp), 'h1'), steps(2),
      h('div', { class: 'book' }, h('div', { class: 'card' }, picker(doc, (dd, tt) => go('#/book' + qs({ doc: doc.id, d: dd, t: tt, re })))), summary(doc, '', '', 'clinic')));
  }
  const nm = h('input', { class: 'in', id: 'bn', name: 'name', maxlength: 60, autocomplete: 'name', value: S.bk.name || '', 'data-k': 'bn' }),
    ph = h('input', { class: 'in', id: 'bp', name: 'phone', type: 'tel', maxlength: 20, autocomplete: 'tel', inputmode: 'tel', dir: 'ltr', value: S.bk.phone || '', placeholder: '+20 10X XXX XXXX', 'data-k': 'bp' }),
    em = h('input', { class: 'in', id: 'be', name: 'email', type: 'email', maxlength: 120, autocomplete: 'email', dir: 'ltr', value: S.bk.email || '', 'data-k': 'be' }),
    note = h('textarea', { class: 'in', id: 'bo', name: 'note', maxlength: 300, 'data-k': 'bo' });
  note.value = S.bk.note || '';
  const seg = h('div', { class: 'seg', role: 'group', 'aria-label': X('نوع الكشف', 'Visit type') }, [['clinic', X('في العيادة', 'In clinic'), egp(doc.fee)], ['tele', X('أونلاين', 'Online'), egp(teleFee(doc))]].filter((x) => x[0] === 'clinic' || doc.tele).map(([k, l, p]) => h('button', { type: 'button', 'data-k': 'ty-' + k, 'aria-pressed': String(type === k), onclick: () => { S.bk.name = nm.value; S.bk.phone = ph.value; S.bk.email = em.value; S.bk.note = note.value; S.bk.type = k; go(location.hash, 'ty-' + k); } }, h('span', { text: l }), h('small', { class: 'num', text: p }))));
  const form = h('form', { class: 'card form', novalidate: true, onsubmit: (e) => {
    e.preventDefault();
    const name = nm.value.trim(), phone = ph.value.trim(), mail = em.value.trim();
    const a = setErr(nm, !name ? E_REQ() : name.length < 2 ? X('اكتب اسمك بالكامل', 'Enter your full name') : ''), b = setErr(ph, !phone ? E_REQ() : !PHONE.test(phone) ? E_PH() : ''), c = setErr(em, mail && !EMAIL.test(mail) ? E_MAIL() : '');
    if (!(a && b && c)) { (!a ? nm : !b ? ph : em).focus(); return; }
    if (limited()) return;
    S.bk.name = name; S.bk.phone = phone; S.bk.email = mail;
    if (e.target.elements.website.value) { go('#/doctors'); return; } // honeypot: pretend success, store nothing
    if (!free(doc, fromIso(d)).some((s) => s.t === t)) { toast(X('هذا الموعد لم يعد متاحًا، اختر وقتًا آخر.', 'That slot is no longer available. Please pick another time.')); go('#/book' + qs({ doc: doc.id, re })); return; }
    if (re) S.appts = S.appts.filter((x) => x.ref !== re);
    if (S.appts.length >= 12) { toast(X('وصلت للحد الأقصى من المواعيد المحفوظة. ألغِ موعدًا قديمًا أولًا.', 'You have reached the saved-appointments limit. Cancel an old one first.'), '#/my', X('مواعيدي', 'My appointments')); return; }
    const ref = newRef(); S.appts.push({ ref, doc: doc.id, d, t, type, name: name.slice(0, 60) }); saveAppts(); S.bk = { type: 'clinic' };
    go('#/book' + qs({ ref }));
  } },
    h('div', { class: 'full' }, h('h2', { style: 'font-size:1.15rem;margin-block-end:.6rem', text: X('بياناتك', 'Your details') }), doc.tele ? seg : null),
    field(X('الاسم بالكامل', 'Full name'), nm, 'bn'), field(X('رقم الموبايل', 'Mobile number'), ph, 'bp'), field(X('البريد الإلكتروني (اختياري)', 'Email (optional)'), em, 'be', 'full'), field(X('ملاحظات للدكتور (اختياري)', 'Notes for the doctor (optional)'), note, 'bo', 'full'), hp(),
    h('div', { class: 'full' }, emergency()),
    h('div', { class: 'full', style: 'display:flex;gap:.6rem;flex-wrap:wrap' }, h('button', { class: 'btn btn--c', type: 'submit' }, ic('check'), re ? X('تأكيد الموعد الجديد', 'Confirm new time') : X('تأكيد الحجز', 'Confirm booking')), h('a', { class: 'btn btn--o', href: '#/book' + qs({ doc: doc.id, re }), text: X('تغيير الموعد', 'Change time') })));
  return h('div', { class: 'wrap sec' }, sh('', X('أكد حجزك', 'Confirm your booking'), pick(doc.n) + ' — ' + spName(doc.sp), 'h1'), steps(3), h('div', { class: 'book' }, form, summary(doc, d, t, type)));
}
function vDone(a) {
  const doc = dr(a.doc), b = br(doc.br[0]);
  return h('div', { class: 'wrap sec' }, steps(5), h('div', { class: 'card ok' }, h('span', { class: 'tick' }, ic('check')), h('h1', { style: 'font-size:clamp(1.3rem,1rem + 1.4vw,1.9rem)', text: X('تم تأكيد حجزك', 'Your booking is confirmed') }), h('div', { class: 'ref num', dir: 'ltr', text: a.ref }),
    h('p', null, h('b', { text: pick(doc.n) }), ' · ', spName(doc.sp)), h('p', { class: 'num', text: when(a) }),
    h('p', { class: 'note', text: a.type === 'tele' ? X('سيصلك رابط الفيديو على الموبايل قبل الموعد بـ 15 دقيقة.', 'You will receive the video link on your mobile 15 minutes before.') : X(`الفرع: ${pick(b.n)} — ${pick(b.a)}. من فضلك احضر قبل الموعد بـ 10 دقائق ومعك بطاقتك.`, `Branch: ${pick(b.n)} — ${pick(b.a)}. Please arrive 10 minutes early with your ID.`) }),
    h('div', { style: 'display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center' }, h('a', { class: 'btn btn--p', href: '#/my', text: X('مواعيدي', 'My appointments') }), h('a', { class: 'btn btn--o', href: '#/', text: X('الرئيسية', 'Home') }))));
}

function vSpecs() { return h('div', { class: 'wrap sec' }, sh('', X('التخصصات', 'Specialties'), X('11 تخصصًا في مكان واحد. اختر التخصص لتشوف أطباءه.', '11 specialties in one place. Choose one to see its doctors.'), 'h1'), spGrid(true), h('div', { style: 'margin-block-start:1.5rem' }, helper())); }

function vTele() {
  const list = DR.filter((d) => d.tele);
  const steps3 = [[X('اختر دكتور', 'Choose a doctor'), X('أي دكتور عليه علامة «أونلاين».', 'Any doctor marked “Online”.')], [X('احجز وقتًا', 'Pick a time'), X('نفس جدول العيادة وبسعر أقل بحوالي 30%.', 'Same schedule as the clinic, about 30% cheaper.')], [X('ادخل من موبايلك', 'Join from your phone'), X('رابط فيديو آمن يصلك قبل الموعد. لا تحتاج تحميل برنامج.', 'A secure video link arrives before your slot. No app download.')]];
  return [h('section', { class: 'wrap sec' }, h('div', { class: 'split' }, h('div', null, sh(X('كشف أونلاين', 'Online visits'), X('الدكتور معاك من البيت', 'Your doctor, from home'), X('مناسب للمتابعة وقراءة التحاليل والاستشارات الأولية، وتوفر وقت المواصلات.', 'Ideal for follow-ups, reading results and first opinions, and it saves the commute.'), 'h1'), emergency()), h('div', { class: 'pic' }, h('img', { src: IMG + 'tele.webp', alt: X('سيدة تجري كشفًا بالفيديو مع طبيب من المنزل', 'A woman having a video consultation with a doctor at home'), width: 1024, height: 765, decoding: 'async', fetchpriority: 'high' })))),
    h('section', { class: 'sec band' }, h('div', { class: 'wrap' }, sh('', X('إزاي بيشتغل؟', 'How it works')), h('ol', { class: 'how' }, steps3.map(([a, b]) => h('li', null, h('h3', { text: a }), h('p', { text: b })))), h('p', { class: 'note', style: 'margin-block-start:1rem', text: X('الفحص السريري والإجراءات تحتاج زيارة بالعيادة. يحدد الدكتور ذلك أثناء الكشف.', 'Physical examination and procedures need an in-clinic visit; the doctor will tell you during the call.') }))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('', X('الأطباء المتاحون أونلاين', 'Doctors available online')), h('div', { class: 'drs' }, list.map((d) => dcard(d, 'h2'))))), cta()];
}
function vPackages() {
  const pk = PK.find((x) => x.id === S.pkg) || null;
  const form = packageForm();
  return [h('section', { class: 'wrap sec' }, sh(X('باقات الفحص الدوري', 'Check-up packages'), X('اعرف صحتك قبل ما تتعب', 'Know your health before it hurts'), X('أسعار ثابتة، وتقرير مكتوب مع استشارة الدكتور.', 'Fixed prices, a written report and a doctor’s consultation.'), 'h1'),
    h('div', { class: 'pks' }, PK.map((p) => h('article', { class: 'pk', 'data-on': String(pk && pk.id === p.id) }, h('h2', { style: 'font-size:1.1rem', text: pick(p.n) }), h('p', { class: 'note', text: pick(p.d) }), h('div', { class: 'pr num' }, num(p.price), ' ', h('small', { text: X('ج.م', 'EGP') })), h('ul', null, p.it.map((i) => h('li', null, ic('check'), h('span', { text: pick(i) })))), h('button', { class: 'btn ' + (pk && pk.id === p.id ? 'btn--p' : 'btn--l'), type: 'button', 'data-k': 'pk-' + p.id, 'aria-pressed': String(!!pk && pk.id === p.id), onclick: () => { S.pkg = p.id; go(location.hash, 'pk-' + p.id); document.getElementById('pkform').scrollIntoView({ block: 'center' }); } }, X('اطلب هذه الباقة', 'Request this package')))))),
  h('section', { class: 'sec band', id: 'pkform' }, h('div', { class: 'wrap' }, form))];
}
function packageForm() {
  const ps = h('select', { class: 'in', id: 'qp' }, PK.map((p) => opt(p.id, `${pick(p.n)} — ${egp(p.price)}`, p.id === S.pkg))), bs = h('select', { class: 'in', id: 'qb' }, BR.map((b) => opt(b.id, pick(b.n)))),
    dt = h('input', { class: 'in', id: 'qd', type: 'date', min: iso(new Date()), max: iso(dayList(60)[59] || new Date()) }), nm = h('input', { class: 'in', id: 'qn', maxlength: 60, autocomplete: 'name' }), ph = h('input', { class: 'in', id: 'qt', type: 'tel', maxlength: 20, dir: 'ltr', autocomplete: 'tel' });
  const f = h('form', { class: 'card form', novalidate: true, onsubmit: (e) => {
    e.preventDefault(); const date = dt.value && ISO.test(dt.value) && fromIso(dt.value) >= fromIso(iso(new Date())) && fromIso(dt.value).getDay() !== 5;
    const a = setErr(nm, nm.value.trim().length < 2 ? E_REQ() : ''), b = setErr(ph, !PHONE.test(ph.value.trim()) ? E_PH() : ''), c = setErr(dt, !date ? X('اختر تاريخًا قادمًا (ما عدا الجمعة)', 'Choose an upcoming date (not Friday)') : '');
    if (!(a && b && c)) return; if (e.target.elements.website.value || limited()) return;
    f.reset(); toast(X('وصلنا طلبك. هنتصل بك خلال ساعات العمل لتأكيد الموعد.', 'We received your request and will call you during working hours to confirm.'));
  } }, h('div', { class: 'full' }, h('h2', { style: 'font-size:1.15rem', text: X('اطلب الباقة', 'Request a package') })), field(X('الباقة', 'Package'), ps, 'qp'), field(X('الفرع', 'Branch'), bs, 'qb'), field(X('التاريخ المفضل', 'Preferred date'), dt, 'qd'), field(X('الاسم', 'Name'), nm, 'qn'), field(X('رقم الموبايل', 'Mobile number'), ph, 'qt'), hp(), h('div', { class: 'full' }, h('button', { class: 'btn btn--c', type: 'submit', text: X('أرسل الطلب', 'Send request') })));
  return f;
}
function vBranches() {
  return [h('section', { class: 'wrap sec' }, h('div', { class: 'split' }, h('div', null, sh(X('الفروع', 'Branches'), X('3 فروع قريبة منك', 'Three branches near you'), X('كل فرع فيه معمل أو أشعة أو صيدلية حسب الجدول بالأسفل.', 'Each branch has a lab, imaging or pharmacy as listed below.'), 'h1')), h('div', { class: 'pic' }, h('img', { src: IMG + 'reception.webp', alt: X('صالة الاستقبال في أحد الفروع', 'The reception lounge at one of the branches'), width: 1024, height: 765, decoding: 'async', fetchpriority: 'high' })))),
    h('section', { class: 'wrap', style: 'padding-block-end:2rem' }, h('div', { class: 'brs' }, BR.map((b) => h('article', { class: 'br' }, h('h2', { style: 'font-size:1.15rem', text: pick(b.n) }),
      h('div', { class: 'r' }, ic('pin'), h('span', { text: pick(b.a) })), h('div', { class: 'r' }, ic('clock'), h('span', { text: pick(b.h) })), h('div', { class: 'r' }, ic('phone'), h('a', { href: TEL(b.tel) }, h('bdi', { dir: 'ltr', class: 'num', text: b.tel }))),
      h('div', { class: 'tags' }, b.sv.map((s) => h('span', { class: 'pill', text: pick(SV[s]) }))),
      h('div', { style: 'display:flex;gap:.5rem;flex-wrap:wrap;margin-block-start:auto' }, h('a', { class: 'btn btn--p btn--sm', href: '#/doctors' + qs({ br: b.id }), text: X('أطباء الفرع', 'Branch doctors') }), h('a', { class: 'btn btn--o btn--sm', href: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.q), target: '_blank', rel: 'noopener noreferrer', text: X('الاتجاهات', 'Directions') })))))), cta()];
}
function vContact() {
  const nm = h('input', { class: 'in', id: 'cn', maxlength: 60, autocomplete: 'name' }), ph = h('input', { class: 'in', id: 'cp', type: 'tel', maxlength: 20, dir: 'ltr', autocomplete: 'tel' }), em = h('input', { class: 'in', id: 'ce', type: 'email', maxlength: 120, dir: 'ltr', autocomplete: 'email' }),
    tp = h('select', { class: 'in', id: 'ct' }, [[X('استفسار عن موعد', 'Appointment enquiry')], [X('التأمين الصحي', 'Health insurance')], [X('نتائج تحاليل أو أشعة', 'Lab or imaging results')], [X('ملاحظة أو شكوى', 'Feedback or complaint')]].map(([l]) => opt(l, l))), ms = h('textarea', { class: 'in', id: 'cm', maxlength: 600 });
  const f = h('form', { class: 'card form', novalidate: true, onsubmit: (e) => {
    e.preventDefault(); const a = setErr(nm, nm.value.trim().length < 2 ? E_REQ() : ''), b = setErr(ph, ph.value.trim() && !PHONE.test(ph.value.trim()) ? E_PH() : ''), c = setErr(em, em.value.trim() && !EMAIL.test(em.value.trim()) ? E_MAIL() : ''), d = setErr(ms, ms.value.trim().length < 5 ? E_REQ() : ''), g = setErr(ph, !ph.value.trim() && !em.value.trim() ? X('اكتب موبايلك أو بريدك لنرد عليك', 'Add a phone or email so we can reply') : (b ? '' : document.getElementById('cp-e').textContent));
    if (!(a && b && c && d && g)) return; if (e.target.elements.website.value || limited()) return;
    f.reset(); toast(X('شكرًا، وصلتنا رسالتك وسنرد خلال يوم عمل.', 'Thank you, we have your message and will reply within one business day.'));
  } }, field(X('الاسم', 'Name'), nm, 'cn'), field(X('رقم الموبايل', 'Mobile'), ph, 'cp'), field(X('البريد الإلكتروني', 'Email'), em, 'ce'), field(X('الموضوع', 'Topic'), tp, 'ct'), field(X('رسالتك', 'Message'), ms, 'cm', 'full'), hp(), h('div', { class: 'full' }, h('button', { class: 'btn btn--c', type: 'submit', text: X('إرسال', 'Send') })));
  return [h('section', { class: 'wrap sec' }, sh(X('تواصل معنا', 'Contact us'), X('نرد عليك بسرعة', 'We reply quickly'), X('الخط الساخن يعمل يوميًا من 9 ص إلى 10 م ما عدا الجمعة.', 'The hotline is open daily 9 am – 10 pm, closed Friday.'), 'h1'),
    h('div', { class: 'book book--c' }, h('div', { class: 'stack' },
      h('div', { class: 'card stack' }, [['phone', X('الخط الساخن', 'Hotline'), h('a', { href: TEL(HOT) }, h('bdi', { dir: 'ltr', class: 'num', text: HOT }))], ['wa', X('واتساب', 'WhatsApp'), h('a', { href: 'https://wa.me/' + WA.replace(/\D/g, ''), target: '_blank', rel: 'noopener noreferrer' }, h('bdi', { dir: 'ltr', class: 'num', text: WA }))], ['mail', X('البريد', 'Email'), h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL }))]].map(([i, l, v]) => h('div', { class: 'br' }, h('div', { class: 'r' }, ic(i), h('span', null, h('b', { style: 'display:block;color:var(--ink)', text: l }), v))))),
      emergency()), f))];
}
function vMy() {
  const list = S.appts.slice().sort((a, b) => apptAt(a) - apptAt(b));
  return h('div', { class: 'wrap sec' }, sh('', X('مواعيدي', 'My appointments'), X('المواعيد المحفوظة على هذا الجهاز.', 'Appointments saved on this device.'), 'h1'),
    list.length ? list.map((a) => aptRow(a)) : h('div', { class: 'empty' }, h('p', { text: X('لا توجد مواعيد محفوظة.', 'No saved appointments.') }), h('p', { style: 'margin-block-start:.8rem' }, h('a', { class: 'btn btn--c btn--sm', href: '#/book', text: X('احجز موعدًا', 'Book an appointment') }))));
}
function aptRow(a) {
  const doc = dr(a.doc), t = apptAt(a).getTime(), past = t < Date.now(), lock = !past && t - Date.now() < 3 * 3600000;
  let arm = false; const del = h('button', { class: 'btn btn--o btn--sm', type: 'button' }, ic('trash'), X('إلغاء', 'Cancel'));
  del.addEventListener('click', () => { if (!arm) { arm = true; del.replaceChildren(X('تأكيد الإلغاء', 'Confirm cancel')); del.classList.add('btn--c'); setTimeout(() => { arm = false; if (del.isConnected) { del.replaceChildren(ic('trash'), X('إلغاء', 'Cancel')); del.classList.remove('btn--c'); } }, 4000); return; } S.appts = S.appts.filter((x) => x.ref !== a.ref); saveAppts(); toast(X('تم إلغاء الموعد', 'Appointment cancelled')); go('#/my'); });
  return h('article', { class: 'apt' }, h('img', { src: IMG + doc.img + '.webp', alt: '', width: 64, height: 64, loading: 'lazy' }),
    h('div', null, h('h2', { style: 'font-size:1rem' }, h('a', { href: '#/doctor/' + doc.id, text: pick(doc.n) })), h('div', { class: 'm num', text: when(a) + ' · ' + (a.type === 'tele' ? X('أونلاين', 'Online') : pick(br(doc.br[0]).n)) }), h('div', { class: 'm' }, h('bdi', { dir: 'ltr', class: 'num', text: a.ref }), past ? [' · ', h('span', { class: 'pill', text: X('انتهى', 'Past') })] : null)),
    h('div', { class: 'acts' }, past ? h('a', { class: 'btn btn--p btn--sm', href: '#/book' + qs({ doc: doc.id }), text: X('احجز مرة أخرى', 'Book again') }) : lock ? h('span', { class: 'note', text: X('لا يمكن التعديل قبل الموعد بأقل من 3 ساعات', 'Changes close 3 hours before') }) : [h('a', { class: 'btn btn--l btn--sm', href: '#/book' + qs({ doc: doc.id, re: a.ref }), text: X('تغيير الموعد', 'Reschedule') }), del]));
}
function vNotFound() { return h('div', { class: 'wrap sec' }, h('div', { class: 'empty' }, h('h1', { text: X('الصفحة غير موجودة', 'Page not found') }), h('p', { style: 'margin-block-start:.8rem' }, h('a', { class: 'btn btn--p', href: '#/', text: X('الرئيسية', 'Home') }))));
}

/* ---------- router ---------- */
const QK = ['spec', 'br', 'lang', 'g', 'today', 'tele', 'q', 'sort', 'doc', 'd', 't', 're', 'ref'];
function parse() {
  const raw = location.hash.replace(/^#\/?/, ''), i = raw.indexOf('?'), p = i < 0 ? raw : raw.slice(0, i), s = i < 0 ? '' : raw.slice(i + 1), q = {};
  new URLSearchParams(s).forEach((v, k) => { if (QK.includes(k)) q[k] = String(v).slice(0, 40); });
  return { parts: p.split('/').filter(Boolean).map((x) => x.slice(0, 60)), q };
}
const TITLES = { '': ['نبض للعيادات | احجز دكتورك في دقيقتين', 'Nabd Clinics | Book your doctor in two minutes'], doctors: ['الأطباء | نبض للعيادات', 'Doctors | Nabd Clinics'], specialties: ['التخصصات | نبض للعيادات', 'Specialties | Nabd Clinics'], telehealth: ['كشف أونلاين | نبض للعيادات', 'Online visits | Nabd Clinics'], packages: ['باقات الفحص الدوري | نبض للعيادات', 'Check-up packages | Nabd Clinics'], branches: ['الفروع | نبض للعيادات', 'Branches | Nabd Clinics'], contact: ['تواصل | نبض للعيادات', 'Contact | Nabd Clinics'], my: ['مواعيدي | نبض للعيادات', 'My appointments | Nabd Clinics'], book: ['احجز موعدًا | نبض للعيادات', 'Book | Nabd Clinics'] };
function applyDoc() { const r = document.documentElement; r.lang = S.lang; r.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; r.dataset.theme = S.theme; }
function render() {
  const { parts, q } = parse(), r = parts[0] || '';
  let main, fn = null;
  if (r === '') main = vHome();
  else if (r === 'doctors') { main = vDoctors(q); fn = () => paintPrefs(q); }
  else if (r === 'doctor') main = vDoctor(parts[1]);
  else if (r === 'specialties') main = vSpecs();
  else if (r === 'telehealth') main = vTele();
  else if (r === 'packages') main = vPackages();
  else if (r === 'branches') main = vBranches();
  else if (r === 'contact') main = vContact();
  else if (r === 'book') main = vBook(q);
  else if (r === 'my') main = vMy();
  else main = vNotFound();
  const t = TITLES[r] || TITLES['']; document.title = r === 'doctor' && dr(parts[1]) ? `${pick(dr(parts[1]).n)} | ${X('نبض للعيادات', 'Nabd Clinics')}` : t[S.lang === 'ar' ? 0 : 1];
  const app = document.getElementById('app'), m = h('main', { id: 'main' }, main);
  app.replaceChildren(h('div', { class: 'orbs', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), ...header(r), m, footer(), mbar());
  if (fn) fn();
  if (!keepNext) window.scrollTo(0, 0);
  if (S.fk) { const el = document.querySelector(`[data-k="${S.fk}"]`); if (el) el.focus({ preventScroll: true }); S.fk = ''; }
  keepNext = false;
}
window.addEventListener('hashchange', () => { S.menu = false; render(); });
applyDoc(); render();
})();
