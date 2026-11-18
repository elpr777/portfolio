/* SAR — static demo SPA. Dynamic text only via textContent; nothing is transmitted. */
(() => {
'use strict';
const { TOP, GOALS, TRN, PRG, CASES, CLIENT_SECTORS, REVIEWS, HOT, MAIL } = window.D;
const IMG = 'img/', TEL = 'tel:' + HOT.replace(/[^+\d]/g, ''), LRM = '‎';
const S = { lang: 'ar', theme: 'light', seats: [], menu: false, fk: '' };
const X = (a, e) => (S.lang === 'ar' ? a : e);
const pick = (o) => o[S.lang];
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
const prog = (id) => PRG.find(p => p.id === id);
const top = (id) => TOP.find(x => x.id === id);
const trn = (id) => TRN.find(x => x.id === id);
const num = (n, d) => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: d === undefined ? 0 : d }).format(n);
const egp = (n) => `${num(n)} ${X('ج.م', 'EGP')}`;
const R = (a, b) => `${a}${LRM}–${LRM}${b}`;
const FMT = { open: ['دورة مفتوحة', 'Open course'], inhouse: ['داخل شركتك', 'In-house'], online: ['أونلاين مباشر', 'Live online'] };
const LVL = { 1: ['تأسيسي', 'Foundation'], 2: ['ممارس', 'Practitioner'], 3: ['متقدم', 'Advanced'] };
const fmtL = (k) => FMT[k][S.lang === 'ar' ? 0 : 1], lvlL = (k) => LVL[k][S.lang === 'ar' ? 0 : 1];
(() => {
  S.lang = load('sar_lang') === 'en' ? 'en' : 'ar';
  const th = load('sar_theme'); S.theme = th === 'dark' || th === 'light' ? th : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const r = load('sar_seats');
  if (Array.isArray(r)) r.slice(0, 8).forEach(it => { const p = it && prog(it.p); if (p && Number.isInteger(it.s) && it.s >= 0 && it.s < p.ses.length && !S.seats.some(x => x.p === it.p && x.s === it.s)) S.seats.push({ p: it.p, s: it.s }); });
})();
const saveSeats = () => save('sar_seats', S.seats);
const hasSeat = (p, s) => S.seats.some(x => x.p === p && x.s === s);

/* ---------- dates (computed from today so the calendar never goes stale; Fri/Sat weekend) ---------- */
function startDate(off) { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + off); while (d.getDay() === 5 || d.getDay() === 6) d.setDate(d.getDate() + 1); return d; }
const loc = () => (S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB');
const dFmt = (d, o) => new Intl.DateTimeFormat(loc(), o).format(d);
function sessions(p) { return p.ses.map((s, i) => ({ i, date: startDate(s[0]), mode: s[1], left: s[2], cap: s[3] })); }
const modeL = (m) => (m === 'online' ? X('أونلاين مباشر', 'Live online') : X('حضوري · قاعة تدريب SAR', 'On-site · SAR training venue'));

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) { const v = props[k]; if (v === undefined || v === null || v === false) continue; if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v); }
  add(e, kids); return e;
}
function add(e, kids) { for (const c of kids.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); } }
const ICON = { arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>', up: '<path d="M4 18l6-9 4 6 6-8"/>', plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="m5 12 5 5 9-10"/>', trash: '<path d="M5 7h14M10 7V4h4v3m-7 0 1 13h8l1-13"/>', phone: '<path d="M6 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5L16 12.5 20 14v4a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z"/>' };
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // constants only
let toastT;
function toast(msg, href, label) { let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); } e.replaceChildren(h('span', null, msg), href ? h('a', { href, onclick: () => { e.hidden = true; } }, label) : null); e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 3600); }
let keepNext = false;
const go = (hash, fk) => { keepNext = true; S.fk = fk || ''; location.hash = hash; };
const qs = (o) => { const a = Object.keys(o).filter(k => o[k] !== undefined && o[k] !== '' && o[k] !== null).map(k => k + '=' + encodeURIComponent(o[k])); return a.length ? '?' + a.join('&') : ''; };
function sh(kick, title, p, lvl) { return h('div', { class: 'sh' }, kick ? h('span', { class: 'pill pill--l kick', text: kick }) : null, h(lvl || 'h2', { text: title }), p ? h('p', { text: p }) : null); }
function field(label, ctrl, id, extra) { return h('div', { class: 'fld' + (extra ? ' ' + extra : '') }, h('label', { for: id, text: label }), ctrl, h('div', { class: 'err', id: id + '-e', role: 'alert' })); }
const opt = (v, txt, sel) => h('option', { value: v, selected: sel ? true : undefined, text: txt });
function setErr(c, msg) { const e = document.getElementById(c.id + '-e'); if (e) e.textContent = msg || ''; if (msg) { c.setAttribute('aria-invalid', 'true'); c.setAttribute('aria-describedby', c.id + '-e'); } else { c.removeAttribute('aria-invalid'); c.removeAttribute('aria-describedby'); } return !msg; }
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/, PHONE = /^\+?[0-9][0-9 ()\-]{6,19}$/;
const E_REQ = () => X('هذا الحقل مطلوب', 'This field is required'), E_MAIL = () => X('اكتب بريداً صحيحاً', 'Enter a valid email'), E_PH = () => X('اكتب رقم هاتف صحيحاً', 'Enter a valid phone number');
const hp = () => h('input', { class: 'hp', type: 'text', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' });
function opts(list, cur, onPick, label, keyp) { return h('div', { class: 'opts', role: 'group', 'aria-label': label }, list.map(([k, l]) => h('button', { type: 'button', 'aria-pressed': String(cur === k), 'data-k': keyp + k, onclick: () => onPick(k === cur ? '' : k, keyp + k) }, l))); }

/* ---------- shared parts ---------- */
function toggleSeat(p, s, silent) {
  const i = S.seats.findIndex(x => x.p === p && x.s === s);
  if (i >= 0) { S.seats.splice(i, 1); saveSeats(); badges(); if (!silent) toast(X('أُزيل المقعد', 'Seat removed')); return false; }
  if (S.seats.length >= 8) { toast(X('الحد الأقصى 8 مقاعد في الطلب الواحد', 'Maximum 8 seats per request')); return false; }
  S.seats.push({ p, s }); saveSeats(); badges(); if (!silent) toast(X('أُضيف المقعد', 'Seat added'), '#/seats', X('عرض الطلب', 'View request')); return true;
}
function meta(p) { return h('div', { class: 'meta' }, h('span', { class: 'pill pill--k', text: pick(top(p.top)) }), h('span', { class: 'pill', text: lvlL(p.lvl) }), h('span', { class: 'pill' }, h('span', { class: 'num', text: p.days }), ' ', X(p.days === 1 ? 'يوم' : 'أيام', p.days === 1 ? 'day' : 'days'))); }
function pcard(p, lvl) {
  const ss = sessions(p), nx = ss[0];
  return h('article', { class: 'pc' }, h('div', { class: 'pic' }, h('img', { src: IMG + top(p.top).img + '.webp', alt: '', loading: 'lazy', decoding: 'async', width: 1024, height: 640 })),
    h('div', { class: 'b' }, meta(p), h(lvl || 'h3', null, h('a', { href: '#/program/' + p.id }, pick(p))), h('p', { text: pick(p.d) }),
      h('p', { class: 'note' }, X('أقرب موعد: ', 'Next: '), h('span', { class: 'num', text: dFmt(nx.date, { day: 'numeric', month: 'short' }) }), ' · ', modeL(nx.mode)),
      h('div', { class: 'foot' }, h('span', { class: 'price' }, h('span', { class: 'num', text: num(p.price) }), ' ', h('small', { text: X('ج.م / فرد', 'EGP / person') })), h('span', { class: 'link' }, X('التفاصيل', 'Details'), ic('arrow', 'flip')))));
}
function trainerCard(t, lvl) { return h('article', { class: 'tr' }, h('img', { src: IMG + t.img + '.webp', alt: pick(t), loading: 'lazy', width: 512, height: 512 }), h('div', null, h(lvl || 'h3', { text: pick(t) }), h('p', { text: pick(t.r) }), h('p', { class: 'note' }, h('span', { class: 'num', text: t.yrs }), X(' سنة خبرة', ' years of experience')))); }
function seatBtn(p, s) {
  const b = h('button', { class: 'btn btn--sm', type: 'button' }); const paint = () => { const on = hasSeat(p.id, s.i); b.className = 'btn btn--sm ' + (on ? 'btn--l' : 'btn--p'); b.setAttribute('aria-pressed', String(on)); b.replaceChildren(ic(on ? 'check' : 'plus'), on ? X('مضاف', 'Added') : X('احجز مقعداً', 'Reserve seat')); };
  paint(); b.addEventListener('click', () => { toggleSeat(p.id, s.i); paint(); }); return b;
}
function sessionRow(p, s, showTitle, lvl) {
  const low = s.left <= Math.ceil(s.cap * .25), pct = Math.round(((s.cap - s.left) / s.cap) * 100);
  return h('li', { class: 'sr1' }, h('div', { class: 'date' }, h('b', { text: dFmt(s.date, { day: 'numeric' }) }), h('span', { text: dFmt(s.date, { month: 'short' }) }), h('span', { text: dFmt(s.date, { weekday: 'short' }) })),
    h('div', null, h(lvl || 'h3', null, showTitle ? h('a', { href: '#/program/' + p.id + qs({ s: s.i }) }, pick(p)) : modeL(s.mode)), h('div', { class: 'm' }, h('span', { text: showTitle ? modeL(s.mode) : X('البداية: ', 'Starts: ') + dFmt(s.date, { weekday: 'long', day: 'numeric', month: 'long' }) }), h('span', null, h('span', { class: 'num', text: p.days }), X(' أيام · ', ' days · '), h('span', { class: 'num', text: p.hrs }), X(' ساعة', ' hours')), h('span', { class: 'num', text: egp(p.price) }))),
    h('div', { class: 'seats' + (low ? ' low' : ''), role: 'img', 'aria-label': X(`متبقي ${s.left} مقعد`, `${s.left} seats left`) }, h('span', null, h('span', { class: 'num', text: s.left }), X(' مقعد متبقي', ' seats left')), h('i', null, h('b', { style: `inline-size:${pct}%` }))),
    h('div', { class: 'act' }, seatBtn(p, s)));
}
function faq() {
  const L = [[X('هل التدريب يناسب شركتنا أم نحتاج تحليل احتياج أولاً؟', 'Is a standard course enough, or do we need a needs analysis first?'), X('نبدأ بجلسة تحليل احتياج قصيرة (60–90 دقيقة) مع المدير وعينة من الفريق، ونقترح الدورة المفتوحة أو البرنامج المخصص بعدها. ولا نبيع برنامجاً لا يحل مشكلتك.', 'We start with a short needs-analysis session (60–90 minutes) with the manager and a sample of the team, then recommend an open course or a custom programme. We do not sell a programme that does not fix your problem.')],
    [X('ما الحد الأدنى للفريق في البرنامج الداخلي؟', 'What is the minimum team size for an in-house programme?'), X('8 أفراد، وأقصى مجموعة 20 فرداً لكل مدرب حتى يبقى التدريب عملياً.', 'Eight people, with a maximum of 20 per trainer so the sessions stay hands-on.')],
    [X('ماذا يحدث بعد انتهاء التدريب؟', 'What happens after training ends?'), X('نتابع بعد 30 و90 يوماً بمؤشر واحد متفق عليه مسبقاً، ونعطيك تقريراً مختصراً بما تغيّر.', 'We follow up at 30 and 90 days on one metric agreed up front, and send a short report on what changed.')],
    [X('هل تُمنح شهادة؟', 'Do participants get a certificate?'), X('نعم، شهادة حضور من SAR، وشهادة إتمام عملي لمن ينجز المشروع التطبيقي. وهي ليست شهادة معتمدة من جهة حكومية.', 'Yes, a SAR attendance certificate, and a practical completion certificate for those who finish the capstone. It is not a government-accredited certificate.')],
    [X('هل تُقدَّم البرامج بالعربية والإنجليزية؟', 'Are programmes available in Arabic and English?'), X('معظمها بالعربية مع مصطلحات إنجليزية، وبعضها بالإنجليزية بالكامل. اللغة مكتوبة في صفحة كل برنامج.', 'Most run in Arabic with English terms, some fully in English. The language is shown on each programme page.')],
    [X('ما سياسة الإلغاء؟', 'What is the cancellation policy?'), X('إلغاء مجاني قبل 7 أيام من البداية، ويمكن نقل المقعد إلى زميل في أي وقت.', 'Free cancellation up to 7 days before the start, and a seat can be transferred to a colleague at any time.')]];
  return h('div', null, L.map(([q, a]) => h('details', { class: 'acc' }, h('summary', { text: q }), h('p', { text: a }))));
}
function cta(t, b) { return h('section', { class: 'wrap' }, h('div', { class: 'cta' }, h('div', { class: 'in2' }, h('h2', { text: t || X('عندك مشكلة في الأداء؟ نبني لك البرنامج اللي يحلّها', 'Have a performance problem? We will build the programme that fixes it') }), h('div', { style: 'display:flex;gap:.7rem;flex-wrap:wrap' }, h('a', { class: 'btn btn--p', href: '#/inhouse' }, b || X('احجز استشارة مجانية', 'Book a free consultation'), ic('arrow', 'flip')), h('a', { class: 'btn btn--o', style: 'border-color:#0f0f12', href: '#/finder' }, X('ابحث عن برنامج', 'Find a programme')))))); }
function beforeAfter(c) {
  return h('div', { class: 'stack' }, c.m.map(m => { const mx = Math.max(m[2], m[3]), u = m[4]; const lab = X(m[0], m[1]); const v = (n) => num(n) + (u === 'h' ? X(' ساعة', ' h') : u); return h('div', { class: 'bb2' }, h('div', { class: 't' }, h('span', { text: lab }), h('span', { text: m[5] ? X('أقل = أفضل', 'lower is better') : X('أعلى = أفضل', 'higher is better'), class: 'note' })),
    h('div', { class: 'bar' }, h('span', { text: X('كان', 'Before') }), h('i', null, h('b', { style: `inline-size:${Math.round(m[2] / mx * 100)}%` })), h('span', { class: 'v', style: 'grid-column:2', text: v(m[2]) })),
    h('div', { class: 'bar after' }, h('span', { text: X('صار', 'After') }), h('i', null, h('b', { style: `inline-size:${Math.round(m[3] / mx * 100)}%` })), h('span', { class: 'v', style: 'grid-column:2', text: v(m[3]) }))); }));
}

/* ---------- views ---------- */
function vHome() {
  const c0 = CASES[0], m0 = c0.m[0];
  const gs = h('select', { class: 'in', id: 'hg' }, GOALS.map(g => opt(g.id, pick(g)))), ls = h('select', { class: 'in', id: 'hl' }, [[1, X('فريق جديد', 'New team')], [2, X('فريق متوسط الخبرة', 'Experienced team')], [3, X('فريق خبير', 'Senior team')]].map(([k, l]) => opt(k, l)));
  const fnd = h('form', { class: 'fnd', novalidate: true, onsubmit: (e) => { e.preventDefault(); go('#/finder' + qs({ g: gs.value, l: ls.value })); } }, field(X('هدفك', 'Your goal'), gs, 'hg'), field(X('مستوى الفريق', 'Team level'), ls, 'hl'), h('button', { class: 'btn btn--l', type: 'submit' }, X('اعرف البرنامج المناسب', 'Find my programme'), ic('arrow', 'flip')));
  const pop = ['first-manager', 'service-excellence', 'ai-at-work', 'consultative-selling', 'pm-fundamentals', 'present-with-impact'].map(prog);
  const upcoming = PRG.flatMap(p => sessions(p).map(s => ({ p, s }))).sort((a, b) => a.s.date - b.s.date).slice(0, 5);
  const steps = [[X('نحلّل', 'Analyse'), X('جلسة قصيرة تحدد المشكلة والمؤشر الذي سنحرّكه.', 'A short session to name the problem and the one metric we will move.')], [X('نصمّم', 'Design'), X('محتوى من حالات شركتك، لا أمثلة جاهزة.', 'Content built from your own cases, not off-the-shelf examples.')], [X('ندرّب', 'Deliver'), X('تدريب عملي بنسبة 70% تمارين ولعب أدوار.', 'Hands-on training: 70% exercises and role-play.')], [X('نقيس', 'Measure'), X('متابعة بعد 30 و90 يوماً وتقرير بما تغيّر.', 'Follow-up at 30 and 90 days with a report on what changed.')]];
  return [
    h('section', { class: 'hero' }, h('div', { class: 'wrap' }, h('div', null, h('span', { class: 'pill pill--l kick', text: X('تدريب للشركات والأفراد · في أي مكان', 'Training for teams and individuals · anywhere') }),
      h('h1', null, X('فريقك يتعلّم، ', 'Your team learns. '), h('mark', { text: X('وأرقامك', 'Your numbers') }), X('\u00A0تتحسّن', '\u00A0move')), h('p', { class: 'lead', text: X('برامج تدريب مبنية على حالات شغلك الفعلية، وبنقيس الأثر بعد 90 يوم على مؤشر نتفق عليه قبل ما نبدأ. في مكتبك، في أي مدينة، أو أونلاين.', 'Training built on your real work cases, with impact measured at 90 days on a metric we agree before we start. At your office, in any city, or online.') }), fnd,
      h('div', { class: 'sectors' }, CLIENT_SECTORS.map(s => h('span', { class: 'pill', text: pick(s) })))),
      h('div', { class: 'hero__img' }, h('div', { class: 'pic' }, h('img', { src: IMG + 'hero.webp', alt: X('ورشة تدريب لفريق عمل', 'A team training workshop'), width: 1024, height: 572, fetchpriority: 'high' })),
        h('div', { class: 'chip-float' }, h('b', { text: X(m0[0], m0[1]) + ' · ' + pick(c0.sec) }), h('div', { class: 'bb' }, h('span', { class: 'num', text: num(m0[2]) + X(' ساعة', ' h') }), ic('arrow', 'flip'), h('span', { class: 'num', text: num(m0[3]) + X(' ساعة', ' h') })))))),
    h('section', { class: 'sec band' }, h('div', { class: 'wrap' }, sh(X('لماذا مخصص أولاً', 'Why custom first'), X('الشركات في مصر انتقلت من الدورة العامة إلى التدريب على المقاس', 'Egyptian companies moved from generic courses to tailored training'), X('برامج أقصر، مبنية على مهارات، ومرتبطة بنتيجة تجارية.', 'Shorter, skills-based programmes tied to a business result.')),
      h('div', { class: 'stats' }, h('div', { class: 'stat' }, h('b', { text: '41%' }), h('p', { text: X('من الشركات تفضّل التدريب المخصص', 'of companies prefer customised training') })), h('div', { class: 'stat' }, h('b', { text: '26%' }), h('p', { text: X('تعتمد على الدورات المفتوحة', 'rely on open-enrolment courses') })), h('div', { class: 'stat' }, h('b', { text: '30%' }), h('p', { text: X('ذكرت الذكاء الاصطناعي كأهم موضوع تعلّم', 'named AI the top trending learning topic') }))),
      h('p', { class: 'src', text: X('المصدر: تقرير التعلم والتطوير المؤسسي في مصر، كلية أنسي ساويرس للأعمال بالجامعة الأمريكية بالقاهرة (عبر Enterprise Egypt).', 'Source: Corporate Learning and Development Landscape in Egypt, AUC Onsi Sawiris School of Business (via Enterprise Egypt).') }))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('01', X('ثلاث طرق للتدريب مع SAR', 'Three ways to train with SAR')),
      h('div', { class: 'fmts' }, [['open', '12', X('برنامجاً بمواعيد ثابتة، حضوري وأونلاين. تحجز مقعداً أو أكثر.', 'programmes on fixed dates, on-site and online. Reserve one seat or more.'), '#/programs?f=open'], ['inhouse', '8+', X('أفراد في فريقك. نصمّم البرنامج على حالاتكم ونقيس النتيجة.', 'people in your team. We design on your cases and measure the result.'), '#/inhouse'], ['online', '1–4', X('أيام أونلاين مباشر مع نفس المدربين وتمارين تفاعلية.', 'days of live online with the same trainers and interactive exercises.'), '#/programs?f=online']].map(([k, big, d, href]) => h('div', { class: 'fmt' }, h('span', { class: 'big num', text: big }), h('h3', null, h('a', { href }, fmtL(k))), h('p', { text: d }), h('span', { class: 'link' }, X('التفاصيل', 'Details'), ic('arrow', 'flip'))))))),
    h('section', { class: 'sec band2' }, h('div', { class: 'wrap' }, sh('02', X('الأكثر طلباً', 'Most requested'), X('اسحب لليسار لترى المزيد.', 'Scroll sideways for more.')), h('div', { class: 'rail', tabindex: 0, role: 'region', 'aria-label': X('الأكثر طلباً', 'Most requested') }, pop.map(p => pcard(p, 'h3'))), h('a', { class: 'link', href: '#/programs' }, X('كل البرامج', 'All programmes'), ic('arrow', 'flip')))),
    h('section', { class: 'sec band' }, h('div', { class: 'wrap' }, sh('03', X('طريقة SAR', 'The SAR method')), h('ol', { class: 'steps' }, steps.map(([a, b]) => h('li', null, h('h3', { text: a }), h('p', { text: b })))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('04', X('كان ← صار', 'Before → after'), X('نتائج أربع شركات: ما تحرّك بعد 90 يوماً.', 'Results for four companies: what moved after 90 days.')), h('div', { class: 'cases' }, CASES.slice(0, 2).map(c => h('article', { class: 'case' }, h('h3', { text: pick(c.sec) }), h('p', { class: 'ch', text: pick(c.ch) }), beforeAfter(c), h('a', { class: 'link', href: '#/program/' + c.p }, pick(prog(c.p)), ic('arrow', 'flip'))))), h('p', { style: 'margin-block-start:1.2rem' }, h('a', { class: 'link', href: '#/results' }, X('كل النتائج', 'All results'), ic('arrow', 'flip'))))),
    h('section', { class: 'sec band2' }, h('div', { class: 'wrap' }, sh('05', X('المواعيد القادمة', 'Upcoming sessions')), h('ul', { class: 'ses' }, upcoming.map(({ p, s }) => sessionRow(p, s, true))), h('p', { style: 'margin-block-start:1.2rem' }, h('a', { class: 'link', href: '#/calendar' }, X('التقويم الكامل', 'Full calendar'), ic('arrow', 'flip'))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('06', X('المدربون', 'Trainers'), X('ممارسون قبل أن يكونوا مدربين.', 'Practitioners before trainers.')), h('div', { class: 'trs' }, TRN.slice(0, 6).map(t => trainerCard(t))))),
    h('section', { class: 'sec', style: 'padding-block-start:0' }, h('div', { class: 'wrap' }, sh('07', X('ماذا يقولون', 'What they say')), h('div', { class: 'rev' }, REVIEWS.map(r => h('blockquote', null, h('p', { text: pick(r.t) }), h('cite', { text: pick(r.n) })))))),
    h('section', { class: 'sec', style: 'padding-block-start:0' }, h('div', { class: 'wrap' }, sh('08', X('أسئلة شائعة', 'FAQ')), faq())),
    cta()
  ];
}
function vPrograms(q) {
  const t = TOP.some(x => x.id === q.t) ? q.t : '', f = FMT[q.f] ? q.f : '', l = LVL[q.l] ? +q.l : 0, term = (q.q || '').toLowerCase().trim();
  const list = PRG.filter(p => (!t || p.top === t) && (!f || p.fmt.includes(f)) && (!l || p.lvl === l) && (!term || (p.ar + ' ' + p.en + ' ' + p.d.ar + ' ' + p.d.en).toLowerCase().includes(term)));
  const cur = { t, f, l: l || '', q: q.q || '' }; const nav = (o, fk) => go('#/programs' + qs(Object.assign({}, cur, o)), fk);
  const inp = h('input', { class: 'in', id: 'pq', type: 'search', maxlength: 40, value: q.q || '', placeholder: X('ابحث باسم البرنامج', 'Search by programme name') }); inp.addEventListener('change', () => nav({ q: inp.value.trim().slice(0, 40) }, 'pq'));
  return h('div', { class: 'wrap sec' }, sh('', X('كل البرامج', 'All programmes'), X('12 برنامجاً في 6 مجالات. الأسعار للفرد وتقبل الخصم للمجموعات.', '12 programmes in 6 areas. Prices are per person with group discounts.'), 'h1'),
    h('div', { class: 'filters' }, h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('المجال', 'Topic') }), opts(TOP.map(x => [x.id, pick(x)]), t, (v, k) => nav({ t: v }, k), X('المجال', 'Topic'), 't-')),
      h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('الشكل', 'Format') }), opts(Object.keys(FMT).map(k => [k, fmtL(k)]), f, (v, k) => nav({ f: v }, k), X('الشكل', 'Format'), 'f-')),
      h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('المستوى', 'Level') }), opts([1, 2, 3].map(k => [String(k), lvlL(k)]), String(l || ''), (v, k) => nav({ l: v }, k), X('المستوى', 'Level'), 'l-')),
      h('div', { class: 'fld' }, h('label', { for: 'pq', text: X('بحث', 'Search') }), inp)),
    h('p', { class: 'note', style: 'margin-block-end:1rem', role: 'status' }, X(`النتائج: ${list.length}`, `Results: ${list.length}`)),
    list.length ? h('div', { class: 'grid' }, list.map(p => pcard(p, 'h2'))) : h('p', { class: 'empty', text: X('لا توجد برامج مطابقة. جرّب إزالة أحد الفلاتر.', 'No matching programmes. Try removing a filter.') }));
}
function vProgram(id, q) {
  const p = prog(id); if (!p) return v404();
  const ss = sessions(p), tr = trn(p.tr), rel = PRG.filter(x => x.top === p.top && x.id !== p.id).concat(PRG.filter(x => x.top !== p.top && x.id !== p.id)).slice(0, 3);
  const sel = +q.s;
  return h('div', { class: 'wrap sec' }, h('nav', { class: 'crumb', 'aria-label': 'Breadcrumb' }, h('a', { href: '#/' }, X('الرئيسية', 'Home')), '/', h('a', { href: '#/programs' }, X('البرامج', 'Programmes')), '/', h('span', { text: pick(p) })),
    h('div', { class: 'pdp' }, h('div', { class: 'stack' }, meta(p), h('h1', { id: 'pt', tabindex: '-1', text: pick(p) }), h('p', { class: 'note', style: 'font-size:1.1rem', text: pick(p.d) }),
      h('div', { class: 'facts' }, [[p.days, X('أيام', 'days')], [p.hrs, X('ساعة تدريب', 'training hours')], [lvlL(p.lvl), X('المستوى', 'level')], [p.lang.map(x => (x === 'ar' ? X('العربية', 'Arabic') : X('الإنجليزية', 'English'))).join(' + '), X('اللغة', 'language')]].map(([b, s]) => h('div', { class: 'fact' }, h('b', { text: String(b) }), h('span', { text: s })))),
      h('div', { class: 'box' }, h('h2', { style: 'font-size:1.25rem;margin-block-end:.8rem', text: X('ما الذي سيتغيّر', 'What will change') }), h('p', { class: 'note', style: 'margin-block-end:.8rem' }, X('المؤشر الذي نتابعه: ', 'The metric we track: '), h('b', { text: pick(p.kpi) })), h('ul', { class: 'chk2' }, p.out.map(o => h('li', null, ic('check'), pick(o))))),
      h('div', { style: 'display:flex;gap:.7rem;flex-wrap:wrap' }, h('a', { class: 'btn btn--l', href: '#sessions', onclick: (e) => { e.preventDefault(); document.getElementById('sessions').scrollIntoView(); } }, X('المواعيد والحجز', 'Dates and booking')), h('a', { class: 'btn btn--o', href: '#/inhouse' + qs({ p: p.id }) }, X('أريده لفريقي', 'Bring it to my team')))),
      h('div', { class: 'stack' }, h('div', { class: 'pic' }, h('img', { src: IMG + top(p.top).img + '.webp', alt: '', width: 1024, height: 765 })), h('div', { class: 'box' }, h('b', { text: X('الفئة المستهدفة', 'Who it is for') }), h('p', { class: 'note', text: pick(p.aud) }), h('p', { style: 'margin-block-start:.8rem' }, h('span', { class: 'price', style: 'font-size:1.8rem;font-weight:900' }, h('span', { class: 'num', text: num(p.price) }), ' ', X('ج.م', 'EGP')), h('span', { class: 'note', text: X(' للفرد، غير شامل الضريبة. خصم 10% من 5 أفراد.', ' per person, excl. VAT. 10% off from 5 people.') }))), h('div', { class: 'pill-row' }, p.fmt.map(k => h('span', { class: 'pill pill--l', style: 'margin-inline-end:.4rem', text: fmtL(k) }))))),
    h('div', { class: 'two', style: 'margin-block-start:3rem' }, h('div', null, h('h2', { style: 'margin-block-end:1rem', text: X('محاور البرنامج', 'Programme outline') }), p.mod.map((m, i) => h('details', { class: 'acc', open: i === 0 ? true : undefined }, h('summary', null, h('span', null, h('span', { class: 'num', text: String(i + 1).padStart(2, '0') + '  ' }), pick(m))), h('p', { text: X('تمارين تطبيقية على حالات من بيئة العمل، مع قالب جاهز للاستخدام في اليوم التالي.', 'Applied exercises on workplace cases, with a template you can use the next day.') })))),
      h('div', null, h('h2', { style: 'margin-block-end:1rem', text: X('المدرب', 'Your trainer') }), trainerCard(tr))),
    h('div', { id: 'sessions', style: 'margin-block-start:3rem' }, h('h2', { style: 'margin-block-end:1rem', text: X('المواعيد القادمة', 'Upcoming dates') }), h('ul', { class: 'ses' }, ss.map(s => { const li = sessionRow(p, s, false); if (s.i === sel) li.setAttribute('style', 'outline:4px solid var(--lime);outline-offset:3px'); return li; }))),
    h('h2', { style: 'margin-block:3rem 1.2rem', text: X('برامج قد تهمّك', 'You may also like') }), h('div', { class: 'grid' }, rel.map(x => pcard(x, 'h3'))));
}
function vCalendar(q) {
  const t = TOP.some(x => x.id === q.t) ? q.t : '', m = q.w === 'online' || q.w === 'cairo' ? q.w : '';
  const rows = PRG.filter(p => !t || p.top === t).flatMap(p => sessions(p).map(s => ({ p, s }))).filter(r => !m || r.s.mode === m).sort((a, b) => a.s.date - b.s.date);
  const nav = (o, fk) => go('#/calendar' + qs(Object.assign({ t, w: m }, o)), fk);
  return h('div', { class: 'wrap sec' }, sh('', X('تقويم الدورات المفتوحة', 'Open-course calendar'), X('مواعيد الأيام الأحد إلى الخميس. المقاعد المتبقية تُحدَّث عند الحجز.', 'Sunday to Thursday dates. Seats left update as people book.'), 'h1'),
    h('div', { class: 'filters' }, h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('المجال', 'Topic') }), opts(TOP.map(x => [x.id, pick(x)]), t, (v, k) => nav({ t: v }, k), X('المجال', 'Topic'), 't-')), h('div', { class: 'frow' }, h('span', { class: 'lb', text: X('المكان', 'Where') }), opts([['cairo', X('حضوري', 'On-site')], ['online', X('أونلاين', 'Online')]], m, (v, k) => nav({ w: v }, k), X('المكان', 'Where'), 'w-'))),
    rows.length ? h('ul', { class: 'ses' }, rows.map(({ p, s }) => sessionRow(p, s, true, 'h2'))) : h('p', { class: 'empty', text: X('لا مواعيد مطابقة.', 'No matching sessions.') }));
}
function vFinder(q) {
  const g = GOALS.some(x => x.id === q.g) ? q.g : '', l = [1, 2, 3].includes(+q.l) ? +q.l : 0, k = FMT[q.k] ? q.k : '';
  const cur = { g, l: l || '', k }; const nav = (o, fk) => go('#/finder' + qs(Object.assign({}, cur, o)), fk);
  let res = null;
  if (g) {
    res = PRG.map(p => { let s = 0; const why = []; if (p.g.includes(g)) { s += 5; why.push(X('يخدم هدفك مباشرة', 'serves your goal directly')); } if (l) { const d = Math.abs(p.lvl - l); if (d === 0) { s += 2; why.push(X('مستواه يناسب فريقك', 'level fits your team')); } else if (d === 1) s += 1; } if (k && p.fmt.includes(k)) { s += 2; why.push(X('متاح بشكل ' + fmtL(k), 'available as ' + fmtL(k))); } return { p, s, why }; }).filter(x => x.s >= 5).sort((a, b) => b.s - a.s || a.p.price - b.p.price).slice(0, 3);
  }
  return h('div', { class: 'wrap sec' }, sh('', X('ابحث عن برنامجك', 'Find your programme'), X('ثلاثة اختيارات وتحصل على ترشيحات مع السبب. القواعد واضحة ولا تُحفظ بياناتك.', 'Three choices give you recommendations with reasons. The rules are plain and nothing is stored.'), 'h1'),
    h('div', { class: 'filters' }, h('div', { class: 'stack' }, h('b', { text: X('1. ما هدفك؟', '1. What is your goal?') }), opts(GOALS.map(x => [x.id, pick(x)]), g, (v, fk) => nav({ g: v }, fk), X('الهدف', 'Goal'), 'g-')),
      h('div', { class: 'stack' }, h('b', { text: X('2. مستوى الفريق؟', '2. Team level?') }), opts([['1', X('جديد', 'New')], ['2', X('متوسط', 'Experienced')], ['3', X('خبير', 'Senior')]], String(l || ''), (v, fk) => nav({ l: v }, fk), X('المستوى', 'Level'), 'l-')),
      h('div', { class: 'stack' }, h('b', { text: X('3. الشكل المفضل؟', '3. Preferred format?') }), opts(Object.keys(FMT).map(x => [x, fmtL(x)]), k, (v, fk) => nav({ k: v }, fk), X('الشكل', 'Format'), 'k-'))),
    res === null ? h('p', { class: 'empty', text: X('اختر هدفك لتظهر الترشيحات.', 'Pick a goal to see recommendations.') }) : h('div', { class: 'stack', role: 'status' }, res.map((r, i) => h('article', { class: 'rec' }, h('div', { class: 'rank num', text: String(i + 1) }), h('div', null, h('h2', null, h('a', { href: '#/program/' + r.p.id }, pick(r.p))), h('p', { text: X('لماذا: ', 'Why: ') + r.why.join(X('، ', ', ')) }), h('p', { class: 'note' }, h('span', { class: 'num', text: r.p.days }), X(' أيام · ', ' days · '), lvlL(r.p.lvl), ' · ', egp(r.p.price))), h('div', { class: 'act' }, h('a', { class: 'btn btn--sm btn--p', href: '#/program/' + r.p.id }, X('التفاصيل', 'Details')))))),
    h('p', { class: 'note', style: 'margin-block-start:1.5rem' }, X('غير متأكد؟ ', 'Not sure? '), h('a', { class: 'link', href: '#/inhouse' }, X('احجز جلسة تحليل احتياج', 'Book a needs-analysis session'), ic('arrow', 'flip'))));
}
function calc(initial) {
  const sz = h('input', { class: 'in', id: 'cs', type: 'number', inputmode: 'numeric', min: 8, max: 200, value: 24 }), dy = h('input', { class: 'in', id: 'cd', type: 'number', inputmode: 'numeric', min: 1, max: 10, value: initial ? initial.days : 2 }), md = h('select', { class: 'in', id: 'cm' }, opt('on', X('في موقعكم أو قاعة', 'On-site or venue')), opt('live', X('أونلاين مباشر', 'Live online')));
  const out = h('div', { class: 'res', 'aria-live': 'polite' });
  const upd = () => {
    const n = +sz.value, d = +dy.value; const okS = Number.isInteger(n) && n >= 8 && n <= 200, okD = Number.isInteger(d) && d >= 1 && d <= 10;
    setErr(sz, okS ? '' : X('من 8 إلى 200 فرد', '8 to 200 people')); setErr(dy, okD ? '' : X('من 1 إلى 10 أيام', '1 to 10 days')); if (!okS || !okD) { out.replaceChildren(); return; }
    const groups = Math.ceil(n / 20), rate = md.value === 'on' ? 16000 : 11000; let tot = 0; for (let i = 0; i < groups; i++) tot += rate * d * (i === 0 ? 1 : .92); const lo = Math.round(tot * .88 / 500) * 500, hi = Math.round(tot * 1.12 / 500) * 500;
    out.replaceChildren(h('div', { class: 'wide' }, h('b', { text: R(num(lo), num(hi)) + ' ' + X('ج.م', 'EGP') }), h('span', { text: X('تقدير إجمالي غير شامل الضريبة', 'Estimated total excl. VAT') })), h('div', null, h('b', { text: String(groups) }), h('span', { text: X('مجموعات', 'groups') })), h('div', null, h('b', { text: num(Math.round(tot / n)) }), h('span', { text: X('ج.م للفرد تقريباً', 'EGP per person, approx.') })));
  };
  [sz, dy, md].forEach(e => e.addEventListener(e.tagName === 'SELECT' ? 'change' : 'input', upd)); upd();
  return h('div', { class: 'box two' }, h('div', { class: 'stack' }, h('h3', { text: X('احسب تكلفة برنامج لفريقك', 'Estimate an in-house programme') }), field(X('عدد الأفراد', 'People'), sz, 'cs'), field(X('عدد الأيام', 'Days'), dy, 'cd'), field(X('الشكل', 'Format'), md, 'cm'), h('p', { class: 'note', text: X('تقدير توضيحي: المجموعة حتى 20 فرداً، وخصم 8% على كل مجموعة إضافية. العرض النهائي بعد تحليل الاحتياج.', 'Illustrative: groups of up to 20, 8% off each extra group. The final proposal comes after the needs analysis.') })), out);
}
function vInhouse(q) {
  const p0 = prog(q.p); const steps = [[X('جلسة تحليل احتياج', 'Needs-analysis session'), X('60–90 دقيقة مجانية مع المدير وعينة من الفريق.', 'A free 60–90 minutes with the manager and a sample of the team.')], [X('خطة ومؤشر', 'Plan and metric'), X('اتفاق على المؤشر وطريقة قياسه قبل أي تدريب.', 'Agree the metric and how to measure it before any training.')], [X('تدريب على حالاتكم', 'Training on your cases'), X('ننسّق مع مدرائكم ونستخدم مستنداتكم الحقيقية.', 'We work with your managers and use your real documents.')], [X('متابعة 30 / 90', '30 / 90-day follow-up'), X('تقرير بما تغيّر وما يلزم بعده.', 'A report on what changed and what comes next.')]];
  const co = h('input', { class: 'in', id: 'ic', maxlength: 80, autocomplete: 'organization' }), nm = h('input', { class: 'in', id: 'in', maxlength: 60, autocomplete: 'name' }), em = h('input', { class: 'in', id: 'ie', type: 'email', maxlength: 120, autocomplete: 'email' }), ph = h('input', { class: 'in', id: 'ip', type: 'tel', maxlength: 24, dir: 'ltr', autocomplete: 'tel', placeholder: '+20 100 245 8831' }), sz = h('input', { class: 'in', id: 'iz', type: 'number', inputmode: 'numeric', min: 8, max: 500, value: '' });
  const pg = h('select', { class: 'in', id: 'ig' }, opt('', X('لا أعرف بعد، أريد تحليل احتياج', 'Not sure yet, I want a needs analysis')), PRG.map(p => opt(p.id, pick(p), p0 && p.id === p0.id))), ms = h('textarea', { class: 'in', id: 'im', maxlength: 600 });
  const wrap = h('div'); const f = h('form', { class: 'form', novalidate: true }, field(X('اسم الشركة', 'Company'), co, 'ic', 'half'), field(X('اسم المسؤول', 'Contact person'), nm, 'in', 'half'), field(X('البريد الإلكتروني', 'Email'), em, 'ie', 'half'), field(X('الهاتف / واتساب', 'Phone / WhatsApp'), ph, 'ip', 'half'), field(X('عدد الأفراد', 'Team size'), sz, 'iz', 'half'), field(X('البرنامج', 'Programme'), pg, 'ig', 'half'), field(X('ما المشكلة التي تريد حلها؟', 'What problem do you want to solve?'), ms, 'im'), hp(), h('button', { class: 'btn btn--l btn--w', type: 'submit' }, X('أرسل الطلب', 'Send request'), ic('arrow', 'flip')));
  f.addEventListener('submit', (e) => { e.preventDefault(); const n = +sz.value; const r = [[co, co.value.trim() ? '' : E_REQ()], [nm, nm.value.trim() ? '' : E_REQ()], [em, EMAIL.test(em.value.trim()) ? '' : E_MAIL()], [ph, PHONE.test(ph.value.trim()) ? '' : E_PH()], [sz, Number.isInteger(n) && n >= 8 && n <= 500 ? '' : X('من 8 إلى 500 فرد', '8 to 500 people')]]; let bad = null; r.forEach(([c, m]) => { if (!setErr(c, m) && !bad) bad = c; }); if (bad) { bad.focus(); return; } if (document.querySelector('.hp').value) return;
    const ok = h('div', { class: 'refbox', role: 'status', tabindex: -1 }, h('h2', { text: X('وصلنا طلبك', 'Request received') }), h('p', { text: X('رقم المرجع', 'Reference') }), h('span', { class: 'num', text: 'SAR-P-' + String(Math.floor(100000 + Math.random() * 900000)) }), h('p', { text: X('سنتواصل معك خلال يوم عمل.', 'We will contact you within one working day.') })); wrap.replaceChildren(ok); ok.focus(); });
  wrap.append(f);
  return h('div', { class: 'wrap sec' }, sh('', X('تدريب داخل شركتك', 'In-house training'), X('نبدأ بتحليل الاحتياج، ثم نصمّم ونقيس. لا نقترح برنامجاً قبل أن نفهم المشكلة.', 'Needs analysis first, then design and measurement. No programme is proposed before we understand the problem.'), 'h1'),
    h('ol', { class: 'steps band', style: 'padding:1.2rem;border-radius:var(--r)' }, steps.map(([a, b]) => h('li', null, h('h2', { text: a }), h('p', { text: b })))),
    h('div', { style: 'margin-block-start:3rem' }, calc(p0)), h('div', { class: 'two', style: 'margin-block-start:3rem' }, h('div', { class: 'stack' }, h('h2', { text: X('اطلب عرضاً', 'Request a proposal') }), h('p', { class: 'note', text: X('نرد خلال يوم عمل واحد لتحديد موعد جلسة تحليل الاحتياج.', 'We reply within one working day to set the needs-analysis session.') }), h('div', { style: 'border-radius:var(--r);overflow:hidden;border:2px solid var(--ink)' }, h('img', { src: IMG + 'lead.webp', alt: '', loading: 'lazy', width: 1024, height: 765 }))), wrap));
}
function vResults() { return h('div', { class: 'wrap sec' }, sh('', X('كان ← صار', 'Before → after'), X('أربع حالات: المشكلة، البرنامج، وما تحرّك بعد 90 يوماً.', 'Four cases: the problem, the programme and what moved after 90 days.'), 'h1'), h('div', { class: 'cases' }, CASES.map(c => h('article', { class: 'case' }, h('h2', { style: 'font-size:1.3rem', text: pick(c.sec) }), h('p', { class: 'ch', text: pick(c.ch) }), beforeAfter(c), h('a', { class: 'link', href: '#/program/' + c.p }, pick(prog(c.p)), ic('arrow', 'flip'))))), h('div', { class: 'two', style: 'margin-block-start:3rem;align-items:center' }, h('div', { style: 'border-radius:var(--r);overflow:hidden;border:2px solid var(--ink)' }, h('img', { src: IMG + 'grad.webp', alt: '', loading: 'lazy', width: 1024, height: 605 })), h('div', { class: 'stack' }, h('h2', { text: X('كيف نقيس', 'How we measure') }), h('p', { class: 'note', text: X('نتفق على مؤشر واحد قبل التدريب، ونأخذ قراءة قبل البداية، ثم بعد 30 و90 يوماً. لا نحسب الرضا عن التدريب نتيجةً.', 'We agree one metric before training, take a baseline reading, then re-read at 30 and 90 days. Satisfaction with the training itself does not count as a result.') }), h('a', { class: 'link', href: '#/inhouse' }, X('اطلب تحليل احتياج', 'Request a needs analysis'), ic('arrow', 'flip'))))); }
function vTrainers() { return h('div', { class: 'wrap sec' }, sh('', X('المدربون', 'Trainers'), X('ممارسون يعملون في المجال، لا متخصصون في المحاضرة فقط.', 'Working practitioners, not full-time lecturers.'), 'h1'), h('div', { class: 'trs' }, TRN.map(t => trainerCard(t, 'h2')))); }
function vAbout() {
  return h('div', { class: 'wrap sec' }, sh('', X('عن SAR', 'About SAR'), X('اسم SAR مأخوذ من «صار»، أي حدث فعلاً. هذا ما نبيعه: تغيّر يمكن قياسه، لا حضور قاعة.', '“SAR” comes from the Arabic “sar”, meaning “it became”. That is what we sell: measurable change, not seats filled.'), 'h1'),
    h('div', { class: 'two', style: 'align-items:center' }, h('div', { style: 'border-radius:var(--r);overflow:hidden;border:2px solid var(--ink)' }, h('img', { src: IMG + 'hero.webp', alt: '', loading: 'lazy', width: 1024, height: 572 })), h('div', { class: 'stack' }, [[X('نحلّل احتياجك أولاً', 'Analyse first'), X('أحياناً التدريب ليس الحل، ونقول ذلك.', 'Sometimes training is not the answer, and we say so.')], [X('عملي', 'Hands-on'), X('70% من الوقت تمارين ولعب أدوار على حالات حقيقية.', '70% of the time is exercises and role-play on real cases.')], [X('نتابع', 'We follow up'), X('قراءة بعد 30 و90 يوماً بمؤشر متفق عليه.', 'Readings at 30 and 90 days on an agreed metric.')]].map(([a, b]) => h('div', { class: 'box' }, h('h2', { text: a }), h('p', { class: 'note', text: b }))))));
}
function vContact() {
  const nm = h('input', { class: 'in', id: 'cn', maxlength: 60, autocomplete: 'name' }), em = h('input', { class: 'in', id: 'ce', type: 'email', maxlength: 120, autocomplete: 'email' }), ms = h('textarea', { class: 'in', id: 'cm', maxlength: 600 });
  const wrap = h('div'); const f = h('form', { class: 'form', novalidate: true }, field(X('الاسم', 'Name'), nm, 'cn', 'half'), field(X('البريد الإلكتروني', 'Email'), em, 'ce', 'half'), field(X('رسالتك', 'Message'), ms, 'cm'), hp(), h('button', { class: 'btn btn--p', type: 'submit' }, X('إرسال', 'Send')));
  f.addEventListener('submit', (e) => { e.preventDefault(); const r = [[nm, nm.value.trim() ? '' : E_REQ()], [em, EMAIL.test(em.value.trim()) ? '' : E_MAIL()], [ms, ms.value.trim() ? '' : E_REQ()]]; let bad = null; r.forEach(([c, m]) => { if (!setErr(c, m) && !bad) bad = c; }); if (bad) { bad.focus(); return; } if (document.querySelector('.hp').value) return; const ok = h('p', { class: 'okmsg', role: 'status', tabindex: -1, text: X('وصلتنا رسالتك، وسنرد خلال يوم عمل.', 'Message received. We will reply within one working day.') }); wrap.replaceChildren(ok); ok.focus(); });
  wrap.append(f);
  return h('div', { class: 'wrap sec' }, sh('', X('تواصل معنا', 'Contact us'), X('نرد خلال يوم عمل.', 'We reply within one working day.'), 'h1'), h('div', { class: 'two' }, h('div', { class: 'box stack' }, h('div', null, h('b', { text: X('الخط الساخن', 'Hotline') }), h('p', null, h('a', { href: TEL, style: 'font-size:1.7rem;font-weight:900;display:inline-flex;min-block-size:44px;align-items:center' }, h('bdi', { dir: 'ltr', text: HOT })))), h('div', null, h('b', { text: X('البريد', 'Email') }), h('p', null, h('a', { href: 'mailto:' + MAIL, style: 'text-decoration:underline;display:inline-flex;min-block-size:44px;align-items:center' }, h('bdi', { dir: 'ltr', text: MAIL })))), h('div', null, h('b', { text: X('العنوان', 'Address') }), h('p', { text: X('مركز SAR، التجمع الخامس، القاهرة الجديدة', 'SAR centre, Fifth Settlement, New Cairo') })), h('div', null, h('b', { text: X('ساعات العمل', 'Hours') }), h('p', { text: X('الأحد–الخميس · 9:00–17:00', 'Sun–Thu · 9:00–17:00') }))), h('div', null, h('h2', { style: 'font-size:1.4rem;margin-block-end:1rem', text: X('أرسل رسالة', 'Send a message') }), wrap)));
}
function vSeats(q) {
  const list = h('div'), tot = h('div', { class: 'tot' });
  const at = h('input', { class: 'in', id: 'sa', type: 'number', inputmode: 'numeric', min: 1, max: 50, value: q.n && +q.n >= 1 && +q.n <= 50 ? Math.floor(+q.n) : 1 });
  const calcT = () => { const n = Math.floor(+at.value) || 1; const sub = S.seats.reduce((a, it) => a + prog(it.p).price * n, 0), disc = n >= 5 ? Math.round(sub * .1) : 0, vat = Math.round((sub - disc) * .14); tot.replaceChildren(h('div', null, h('span', { text: X('المجموع', 'Subtotal') }), h('span', { class: 'num', text: egp(sub) })), disc ? h('div', null, h('span', { text: X('خصم المجموعة 10%', 'Group discount 10%') }), h('span', { class: 'num', text: '− ' + egp(disc) })) : null, h('div', null, h('span', { text: X('ضريبة القيمة المضافة 14%', 'VAT 14%') }), h('span', { class: 'num', text: egp(vat) })), h('div', { class: 'g' }, h('span', { text: X('الإجمالي', 'Total') }), h('span', { class: 'num', text: egp(sub - disc + vat) }))); };
  const renderList = () => { list.replaceChildren(S.seats.length ? h('ul', { class: 'sl' }, S.seats.map(it => { const p = prog(it.p), s = sessions(p)[it.s]; return h('li', null, h('img', { src: IMG + top(p.top).img + '.webp', alt: '', width: 72, height: 54 }), h('div', null, h('b', { text: pick(p) }), h('br'), h('small', { text: dFmt(s.date, { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' + modeL(s.mode) })), h('span', { class: 'pr num', text: egp(p.price) }), h('button', { class: 'ib2', type: 'button', 'aria-label': X('إزالة ', 'Remove ') + pick(p), onclick: () => { toggleSeat(it.p, it.s, true); renderList(); } }, ic('trash'))); })) : h('p', { class: 'empty' }, X('لا مقاعد في الطلب. ', 'No seats yet. '), h('a', { class: 'link', href: '#/calendar' }, X('تصفّح المواعيد', 'Browse dates')))); calcT(); };
  at.addEventListener('input', calcT); renderList();
  const co = h('input', { class: 'in', id: 'sc', maxlength: 80, autocomplete: 'organization' }), nm = h('input', { class: 'in', id: 'sn', maxlength: 60, autocomplete: 'name' }), em = h('input', { class: 'in', id: 'se', type: 'email', maxlength: 120, autocomplete: 'email' }), ph = h('input', { class: 'in', id: 'sp', type: 'tel', maxlength: 24, dir: 'ltr', autocomplete: 'tel', placeholder: '+20 100 245 8831' }), inv = h('input', { type: 'checkbox', id: 'si' });
  const status = h('div', { class: 'err', id: 'ss-e', role: 'alert' }), fw = h('div');
  const form = h('form', { class: 'form', novalidate: true }, field(X('عدد الأفراد لكل موعد', 'People per session'), at, 'sa'), field(X('اسم المسؤول', 'Contact person'), nm, 'sn', 'half'), field(X('الشركة (اختياري)', 'Company (optional)'), co, 'sc', 'half'), field(X('البريد الإلكتروني', 'Email'), em, 'se', 'half'), field(X('الهاتف / واتساب', 'Phone / WhatsApp'), ph, 'sp', 'half'), h('label', { class: 'chk' }, inv, X('أريد فاتورة باسم الشركة', 'Invoice my company')), hp(), status, h('button', { class: 'btn btn--l btn--w', type: 'submit' }, X('أكّد الحجز', 'Confirm reservation'), ic('arrow', 'flip')));
  form.addEventListener('submit', (e) => { e.preventDefault(); const n = +at.value; const r = [[at, Number.isInteger(n) && n >= 1 && n <= 50 ? '' : X('من 1 إلى 50', '1 to 50')], [nm, nm.value.trim() ? '' : E_REQ()], [em, EMAIL.test(em.value.trim()) ? '' : E_MAIL()], [ph, PHONE.test(ph.value.trim()) ? '' : E_PH()]]; let bad = null; r.forEach(([c, m]) => { if (!setErr(c, m) && !bad) bad = c; }); status.textContent = ''; if (!S.seats.length) { status.textContent = X('أضف موعداً واحداً على الأقل', 'Add at least one session'); if (!bad) bad = form.querySelector('button[type=submit]'); } if (bad) { bad.focus(); return; } if (form.querySelector('.hp').value) return;
    S.seats = []; saveSeats(); badges(); const ok = h('div', { class: 'refbox', role: 'status', tabindex: -1 }, h('h2', { text: X('تم الحجز', 'Reserved') }), h('p', { text: X('رقم المرجع', 'Reference') }), h('span', { class: 'num', text: 'SAR-' + String(Math.floor(100000 + Math.random() * 900000)) }), h('p', { text: X('سيصلك تأكيد الحجز وفاتورة بالبريد الإلكتروني.', 'A booking confirmation and invoice will be emailed to you.') })); fw.replaceChildren(ok); list.replaceChildren(); tot.replaceChildren(); ok.focus(); });
  fw.append(form);
  return h('div', { class: 'wrap sec' }, sh('', X('طلب الحجز', 'Reservation'), X('راجع مقاعدك ثم أكّد. الدفع بعد التأكيد بفاتورة رسمية.', 'Review your seats and confirm. Payment follows by official invoice.'), 'h1'), h('div', { class: 'rfq' }, h('div', { class: 'stack' }, h('h2', { style: 'font-size:1.3rem', text: X('مقاعدك', 'Your seats') }), list, tot), h('div', null, h('h2', { style: 'font-size:1.3rem;margin-block-end:1rem', text: X('بيانات الحجز', 'Booking details') }), fw)));
}
function v404() { return h('div', { class: 'wrap sec' }, sh('', X('الصفحة غير موجودة', 'Page not found'), X('الرابط غير موجود.', 'That link does not exist.'), 'h1'), h('div', { style: 'display:flex;gap:.7rem;flex-wrap:wrap' }, h('a', { class: 'btn btn--p', href: '#/programs' }, X('البرامج', 'Programmes')), h('a', { class: 'btn btn--o', href: '#/' }, X('الرئيسية', 'Home')))); }

/* ---------- chrome ---------- */
function brandEl() { return h('a', { class: 'brand', href: '#/', 'aria-label': X('SAR — الرئيسية', 'SAR — home') }, h('i', { 'aria-hidden': 'true' }, ic('up')), h('span', null, 'SAR', h('small', { text: X('للتدريب', 'TRAINING') }))); }
const NAV = [['programs', 'البرامج', 'Programmes'], ['calendar', 'التقويم', 'Calendar'], ['inhouse', 'للشركات', 'For teams'], ['results', 'النتائج', 'Results'], ['trainers', 'المدربون', 'Trainers'], ['about', 'عن SAR', 'About']];
function header(seg) {
  const lang = h('button', { class: 'ib', type: 'button', 'aria-label': 'Language', onclick: () => setLang(S.lang === 'ar' ? 'en' : 'ar') }, X('English', 'العربية'));
  const th = h('button', { class: 'ib', type: 'button', 'aria-label': X('تبديل المظهر', 'Toggle theme'), onclick: () => setTheme(S.theme === 'dark' ? 'light' : 'dark') }, ic(S.theme === 'dark' ? 'sun' : 'moon'));
  const sb = h('a', { class: 'seatb', href: '#/seats', 'aria-label': X('طلب الحجز', 'Reservation') }, h('span', { class: 't', text: X('مقاعدي', 'My seats') }), h('span', { class: 'n', 'data-n': 'seats', text: String(S.seats.length) }));
  const mb = h('button', { class: 'ib mb', type: 'button', 'aria-expanded': String(S.menu), 'aria-controls': 'menu', 'aria-label': X('القائمة', 'Menu'), onclick: () => { S.menu = !S.menu; document.getElementById('menu').classList.toggle('open', S.menu); mb.setAttribute('aria-expanded', String(S.menu)); mb.replaceChildren(ic(S.menu ? 'x' : 'menu')); } }, ic(S.menu ? 'x' : 'menu'));
  const nv = (cls, extra) => NAV.concat(extra || []).map(([k, a, e]) => h('a', Object.assign({ href: '#/' + k }, seg === k ? { 'aria-current': 'page' } : {}), X(a, e), cls ? ic('arrow', 'flip') : null));
  return [h('aside', { class: 'top', 'aria-label': X('تواصل سريع', 'Quick contact') }, h('div', { class: 'wrap' }, h('a', { class: 'tophot', href: TEL }, ic('phone'), h('bdi', { dir: 'ltr', text: HOT })), h('span', { class: 'hide-s', text: X('الأحد–الخميس · 9:00–17:00 · نصلك في أي مدينة', 'Sun–Thu · 9:00–17:00 · We come to your city') }))),
    h('header', { class: 'hd' }, h('div', { class: 'wrap' }, h('div', { class: 'hd__in' }, brandEl(), h('nav', { class: 'nav', 'aria-label': 'Main' }, nv(false)), h('div', { class: 'hd__act' }, h('a', { class: 'ib hide-m', href: '#/contact' }, X('تواصل', 'Contact')), lang, th, sb, mb)), h('nav', { id: 'menu', class: 'menu' + (S.menu ? ' open' : ''), 'aria-label': 'Menu' }, nv(true, [['contact', 'تواصل', 'Contact']]))))];
}
function footer() {
  return h('footer', { class: 'ft' }, h('div', { class: 'wrap' }, h('div', { class: 'ft__g' }, h('div', null, brandEl(), h('p', { style: 'margin-block-start:.8rem', text: X('تدريب للشركات والأفراد في أي مكان: تحليل احتياج، برنامج، ومتابعة.', 'Training for teams and individuals, anywhere: analyse, deliver, follow up.') })),
    h('div', null, h('h2', { text: X('الخط الساخن', 'Hotline') }), h('a', { class: 'hot', href: TEL }, h('bdi', { dir: 'ltr', text: HOT })), h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL })), h('p', { text: X('الأحد–الخميس · 9:00–17:00', 'Sun–Thu · 9:00–17:00') })),
    h('div', null, h('h2', { text: X('البرامج', 'Programmes') }), TOP.slice(0, 4).map(t => h('a', { href: '#/programs' + qs({ t: t.id }) }, pick(t)))), h('div', null, h('h2', { text: 'SAR' }), NAV.slice(2).map(([k, a, e]) => h('a', { href: '#/' + k }, X(a, e))))),
    h('div', { class: 'ft__b', text: '© 2026 SAR' })));
}
function badges() { document.querySelectorAll('[data-n=seats]').forEach(n => { n.textContent = S.seats.length; }); }
function setLang(l) { S.lang = l; save('sar_lang', l); route(true); }
function setTheme(t) { S.theme = t; save('sar_theme', t); document.documentElement.dataset.theme = t; route(true); }

/* ---------- router ---------- */
const QK = ['t', 'f', 'l', 'q', 's', 'g', 'k', 'n', 'p', 'w'];
function parseQ(s) { const o = {}; (s || '').split('&').forEach(kv => { const [k, v] = kv.split('='); if (!QK.includes(k) || v === undefined) return; try { o[k] = decodeURIComponent(v.replace(/\+/g, ' ')).slice(0, 40); } catch (e) { /* ignore malformed */ } }); return o; }
let first = true;
function route(keep) {
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.dataset.theme = S.theme;
  const raw = location.hash.replace(/^#\/?/, ''), [path, qstr] = raw.split('?'), seg = path.split('/').filter(Boolean), q = parseQ(qstr), s0 = seg[0] || ''; S.menu = false; let view;
  switch (s0) { case '': view = vHome(); break; case 'programs': view = vPrograms(q); break; case 'program': view = vProgram(seg[1], q); break; case 'calendar': view = vCalendar(q); break; case 'finder': view = vFinder(q); break; case 'inhouse': view = vInhouse(q); break; case 'results': view = vResults(); break; case 'trainers': view = vTrainers(); break; case 'about': view = vAbout(); break; case 'contact': view = vContact(); break; case 'seats': view = vSeats(q); break; default: view = v404(); }
  const T = { programs: ['البرامج', 'Programmes'], calendar: ['التقويم', 'Calendar'], finder: ['ابحث عن برنامجك', 'Find your programme'], inhouse: ['تدريب للشركات', 'In-house training'], results: ['النتائج', 'Results'], trainers: ['المدربون', 'Trainers'], about: ['عن SAR', 'About'], contact: ['تواصل', 'Contact'], seats: ['طلب الحجز', 'Reservation'] };
  const p = s0 === 'program' ? prog(seg[1]) : null;
  document.title = s0 === '' ? X('SAR | تدريب يحرّك أرقام فريقك', 'SAR | Training that moves your team’s numbers') : `${p ? pick(p) : (T[s0] ? X(T[s0][0], T[s0][1]) : X('غير موجود', 'Not found'))} | ${'SAR'}`;
  document.getElementById('app').replaceChildren(h('a', { class: 'skip', href: '#main', onclick: (e) => { e.preventDefault(); document.getElementById('main').focus(); } }, X('تخطي إلى المحتوى', 'Skip to content')), ...header(s0), h('main', { id: 'main', tabindex: '-1' }, view), footer());
  const k = keep || keepNext; keepNext = false;
  if (!k && !first) { window.scrollTo(0, 0); const pt = document.getElementById('pt'); if (pt) pt.focus({ preventScroll: true }); }
  if (S.fk) { const el = document.querySelector('[data-k="' + S.fk + '"]') || document.getElementById(S.fk); if (el) el.focus({ preventScroll: true }); S.fk = ''; }
  first = false;
}
window.addEventListener('hashchange', () => route());
route();
})();
