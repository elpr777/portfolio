/* Rokn Furniture — static demo SPA. All dynamic text goes through textContent (no HTML injection). */
(() => {
'use strict';
const { CATS, ROOMS, P, ZONES, SHOWROOMS } = window.D;
const IMG = 'img/';
const HOT = '19333';

/* ---------- i18n ---------- */
const T = {
  ar: {
    brand: 'رُكن', brandSub: 'للأثاث', skip: 'تخطي إلى المحتوى', n_rooms: 'الغرف', n_shop: 'كل المنتجات', n_custom: 'تفصيل حسب الطلب', n_show: 'المعارض', n_deliv: 'التوصيل والتقسيط',
    menu: 'القائمة', theme: 'تبديل المظهر', lang: 'English', saved: 'المفضلة', cart: 'السلة', book: 'احجز زيارة',
    ann: 'تقسيط حتى 24 شهر · توصيل بسعر واضح لمنطقتك.', ann_l: 'التفاصيل',
    h1: 'أثاث خشب صلب، صُنع في مصر ليعيش معاك سنين', h_p: 'اختار بيتك غرفة غرفة، واعرف السعر والتوصيل والتركيب قبل ما تدفع.', h_c1: 'ابدأ من غرفة المعيشة', h_c2: 'اطلب قطعة بمقاسك',
    tr1: 'توصيل بسعر واضح', tr1p: 'سعر التوصيل ومدته بيظهروا حسب منطقتك قبل الدفع.', tr2: 'ضمان على الهيكل', tr2p: 'سنتان على الهيكل الخشبي وسنة على القماش (سياسة افتراضية للعرض).', tr3: 'استرجاع خلال 14 يوم', tr3p: 'للقطع غير المستخدمة في عبوتها الأصلية.', tr4: 'شوف قبل ما تشتري', tr4p: 'عينات قماش مجانية وزيارة معرض بموعد.',
    s_look: 'تسوّق من الصورة', s_look_p: 'اضغط على النقاط لتشوف كل قطعة في الغرفة وسعرها.', s_rooms: 'ابدأ من الغرفة', s_rooms_p: 'خمس غرف، ولكل غرفة قطع تتناسب مع بعض.', s_best: 'الأكثر طلباً', s_best_p: 'قطع متوفرة وبتتسلّم بسرعة.',
    s_cfg: 'اختار لون كنبتك', s_cfg_p: 'نفس الكنبة بثلاث أقمشة. اطلب عينات القماش مجاناً لتشوفها في إضاءة بيتك.', s_cfg_c: 'شوف الكنبة',
    s_cus: 'مش لاقي المقاس؟ نصنعه لك', s_cus_p: 'ورشتنا بتنفّذ تفصيل خشب صلب بالمقاس والتشطيب اللي تحدده.', cus1: 'ابعت المقاس والفكرة', cus1p: 'أبعاد الغرفة، نوع القطعة، الخشب والتشطيب.', cus2: 'تستلم عرض سعر ورسم', cus2p: 'خلال 3 أيام عمل، مع مدة التصنيع.', cus3: 'نصنّع ونسلّم', cus3p: 'من 4 إلى 6 أسابيع حسب القطعة.',
    s_dl: 'التوصيل والتقسيط من غير مفاجآت', dl1: 'التوصيل', dl1p: 'سعر ثابت لكل منطقة. القطع المتوفرة بتوصل خلال أيام، والمصنّعة حسب الطلب بتتحدد مدتها قبل الطلب.', dl2: 'التركيب', dl2p: 'اختياري بسعر لكل قطعة، ومجاني للكنب والكراسي.', dl3: 'التقسيط', dl3p: 'من 6 إلى 24 شهر لطلبات تبدأ من 5,000 ج.م. العرض افتراضي ويخضع لموافقة الجهة الممولة.',
    s_sr: 'زور معرضنا', s_sr_p: 'اقعد على القطعة، والمس الخشب، وخد عينات القماش معاك.', s_faq: 'أسئلة شائعة', all: 'عرض الكل', more: 'التفاصيل',
    f_all: 'الكل', f_q: 'ابحث عن قطعة', f_room: 'الغرفة', f_sort: 'ترتيب', sort_f: 'الأبرز', sort_l: 'السعر: الأقل', sort_h: 'السعر: الأعلى', res: 'قطعة', no_res: 'مفيش قطع بالمواصفات دي.', no_res_p: 'جرّب تمسح الفلتر أو تغيّر البحث.',
    best: 'الأكثر طلباً', from: 'يبدأ من', egp: 'ج.م', fav: 'أضف للمفضلة', unfav: 'احذف من المفضلة', t_fav: 'اتضافت للمفضلة', t_unfav: 'اتشالت من المفضلة',
    instock: 'متوفر: توصيل خلال', make: 'تصنيع حسب الطلب', wks: 'أسابيع', days: 'أيام', mk_eta: 'تصنيع {a}–{b} أسابيع ثم توصيل {c}–{d} أيام', st_eta: 'متوفر، توصيل خلال {c}–{d} أيام',
    p_color: 'اللون', p_size: 'المقاس', p_qty: 'الكمية', p_add: 'أضف للسلة', p_added: 'اتضافت للسلة', p_view: 'عرض السلة', p_asm: 'أضف خدمة التركيب', p_free: 'مجاني', p_spec: 'المواصفات', p_desc: 'الوصف', p_rel: 'قطع مكمّلة', p_room: 'من غرفة', p_in: 'في الغرفة',
    p_inst: 'قسّط على 12 شهر بحوالي {m} ج.م شهرياً (رسوم إدارية 3%)', p_chk: 'التوصيل لمنطقتك', p_zone: 'المنطقة', p_fee: 'سعر التوصيل', p_eta: 'المدة المتوقعة',
    p_samp: 'عينات قماش مجانية', p_samp_p: 'ثلاث عينات 10×10 سم توصلك في بيتك لتشوف اللون في إضاءتك.', p_samp_b: 'اطلب العينات',
    f_name: 'الاسم', f_phone: 'رقم الموبايل', f_addr: 'العنوان', f_notes: 'ملاحظات (اختياري)', f_send: 'إرسال', e_req: 'الحقل ده مطلوب', e_name: 'اكتب اسمك', e_phone: 'اكتب رقم موبايل مصري صحيح', e_date: 'اختار تاريخ صحيح', e_num: 'اكتب رقم ضمن المدى المسموح', e_sel: 'اختار من القائمة',
    demo: 'عرض تصميم: الشركة والأسعار والسياسات افتراضية ولا يُرسل أي بيان فعلياً.', ok_samp: 'وصل طلبك. هنبعت العينات خلال 3 أيام عمل.',
    c_t: 'سلة التسوق', c_sum: 'ملخص الطلب', c_empty: 'السلة فاضية.', c_empty_p: 'ابدأ من الغرف أو كل المنتجات.', c_rm: 'إزالة', c_item: 'الأصناف', c_asm: 'التركيب', c_del: 'التوصيل', c_tot: 'الإجمالي', c_plan: 'خطة الدفع', c_cash: 'دفع كامل', c_mo: 'شهرياً', c_months: 'شهر', c_none: 'بدون فوائد', c_fee: 'رسوم إدارية', c_int: 'فائدة', c_min: 'التقسيط متاح لطلبات من 5,000 ج.م', c_note: 'أرقام تقديرية للمقارنة، والموافقة والشروط النهائية من الجهة الممولة.', c_ship: 'بيانات التوصيل', c_place: 'إتمام الطلب', ok_ord: 'تم استلام طلبك رقم {r}. هنتواصل معاك لتأكيد الموعد. (عرض تجريبي: لم يُسجَّل أي طلب)', c_eta: 'أقرب موعد توصيل متوقع', c_left: 'قطعة', c_unit: 'للقطعة',
    cu_t: 'تفصيل حسب الطلب', cu_p: 'أخبرنا بما تحتاجه، وهنرجع لك برسم وعرض سعر خلال 3 أيام عمل.', cu_type: 'نوع القطعة', cu_wood: 'الخشب', cu_w: 'العرض (سم)', cu_d: 'العمق (سم)', cu_h: 'الارتفاع (سم)', cu_bud: 'الميزانية التقريبية', cu_ok: 'وصل طلبك رقم {r}. هنرجع لك برسم وعرض سعر خلال 3 أيام عمل.',
    ty: { sofa: 'كنبة', bed: 'سرير', table: 'ترابيزة', wardrobe: 'دولاب', shelf: 'مكتبة أو وحدة تخزين', desk: 'مكتب', other: 'قطعة أخرى' }, wd: { oak: 'بلوط', walnut: 'جوز', beech: 'زان', unsure: 'محتاج نصيحة' }, bd: { b1: 'أقل من 10,000 ج.م', b2: '10,000 – 25,000 ج.م', b3: '25,000 – 50,000 ج.م', b4: 'أكثر من 50,000 ج.م' },
    sr_t: 'معارضنا', sr_p: 'احجز موعد زيارة وهنجهّز لك قطعك والعينات.', sr_hours: 'يومياً 11 ص – 10 م', sr_which: 'المعرض', sr_date: 'التاريخ', sr_slot: 'الفترة', sr_book: 'احجز الزيارة', sr_ok: 'تم حجز زيارتك رقم {r}. هنتصل بك لتأكيد الموعد. (عرض تجريبي)', slots: { s1: '11 ص – 2 م', s2: '2 م – 6 م', s3: '6 م – 10 م' },
    d_t: 'التوصيل والتقسيط والضمان', d_p: 'كل التفاصيل في مكان واحد، بأرقام تقدر تحسب بيها قبل الطلب.', d_zone: 'منطقة التوصيل', d_fee: 'سعر التوصيل', d_eta: 'مدة القطع المتوفرة', d_plan: 'خطط التقسيط', d_pl: 'المدة', d_rate: 'الفائدة السنوية', d_pol: 'الاسترجاع والضمان',
    sv_t: 'مفضلتك', sv_empty: 'لسه مفيش مفضلة. اضغط على القلب في أي قطعة.', nf_t: 'الصفحة غير موجودة', nf_p: 'الرابط ده مش موجود. ارجع للرئيسية.', home: 'الرئيسية',
    ft_about: 'رُكن علامة افتراضية لعرض التصميم. كل الأسماء والأسعار والسياسات للتجربة فقط.', ft_exp: 'تسوّق', ft_help: 'مساعدة', ft_hot: 'خدمة العملاء', ft_rights: 'جميع الحقوق محفوظة', ft_img: 'الصور مولّدة بالذكاء الاصطناعي لأغراض العرض فقط.',
    faq: [['هل الأسعار شاملة التوصيل؟', 'لا. التوصيل يُحسب حسب المنطقة ويظهر في صفحة المنتج والسلة قبل الدفع، والتركيب اختياري بسعره.'], ['كم تستغرق القطع المصنّعة حسب الطلب؟', 'من أسبوعين إلى 4 أسابيع حسب القطعة، والمدة مكتوبة في صفحة كل منتج قبل ما تطلب.'], ['أقدر أرجّع قطعة؟', 'خلال 14 يوم لو القطعة غير مستخدمة وفي عبوتها الأصلية. القطع المفصّلة بمقاسك لا تُسترجع. سياسة افتراضية للعرض.'], ['هل ممكن أشوف القماش قبل الطلب؟', 'أكيد. اطلب عينات مجانية من صفحة الكنب أو زر أقرب معرض.']]
  },
  en: {
    brand: 'Rokn', brandSub: 'FURNITURE', skip: 'Skip to content', n_rooms: 'Rooms', n_shop: 'All products', n_custom: 'Made to order', n_show: 'Showrooms', n_deliv: 'Delivery & financing',
    menu: 'Menu', theme: 'Toggle theme', lang: 'العربية', saved: 'Saved', cart: 'Cart', book: 'Book a visit',
    ann: 'Instalments up to 24 months and delivery priced clearly by zone.', ann_l: 'Details',
    h1: 'Solid-wood furniture, made in Egypt to last', h_p: 'Shop room by room. See price, delivery and assembly before you pay.', h_c1: 'Start with the living room', h_c2: 'Order a custom piece',
    tr1: 'Delivery priced clearly', tr1p: 'Delivery cost and timing show for your zone before you pay.', tr2: 'Frame warranty', tr2p: 'Two years on the wooden frame, one on fabric (illustrative policy).', tr3: '14-day returns', tr3p: 'For unused items in original packaging.', tr4: 'See before you buy', tr4p: 'Free fabric samples and showroom visits by appointment.',
    s_look: 'Shop the look', s_look_p: 'Tap the dots to see each piece in the room and its price.', s_rooms: 'Start with a room', s_rooms_p: 'Five rooms, each with pieces that work together.', s_best: 'Most loved', s_best_p: 'In stock and delivered quickly.',
    s_cfg: 'Choose your sofa colour', s_cfg_p: 'One sofa, three fabrics. Order free swatches to see them in your own light.', s_cfg_c: 'View the sofa',
    s_cus: 'Can’t find the size? We make it', s_cus_p: 'Our workshop builds solid-wood pieces to the size and finish you choose.', cus1: 'Send the size and idea', cus1p: 'Room dimensions, piece type, wood and finish.', cus2: 'Get a quote and drawing', cus2p: 'Within 3 working days, with the build time.', cus3: 'We build and deliver', cus3p: '4 to 6 weeks depending on the piece.',
    s_dl: 'Delivery and financing without surprises', dl1: 'Delivery', dl1p: 'A fixed price per zone. In-stock pieces arrive within days; made-to-order timing is shown before you order.', dl2: 'Assembly', dl2p: 'Optional, priced per piece, and free for sofas and chairs.', dl3: 'Instalments', dl3p: '6 to 24 months on orders from EGP 5,000. Illustrative offer, subject to lender approval.',
    s_sr: 'Visit a showroom', s_sr_p: 'Sit on the piece, feel the wood and take fabric swatches home.', s_faq: 'Common questions', all: 'View all', more: 'Details',
    f_all: 'All', f_q: 'Search a piece', f_room: 'Room', f_sort: 'Sort', sort_f: 'Featured', sort_l: 'Price: low to high', sort_h: 'Price: high to low', res: 'items', no_res: 'No pieces match these filters.', no_res_p: 'Try clearing a filter or changing the search.',
    best: 'Most loved', from: 'From', egp: 'EGP', fav: 'Save', unfav: 'Remove from saved', t_fav: 'Saved', t_unfav: 'Removed from saved',
    instock: 'In stock: delivery in', make: 'Made to order', wks: 'weeks', days: 'days', mk_eta: 'Built in {a}–{b} weeks, then {c}–{d} days delivery', st_eta: 'In stock, delivery in {c}–{d} days',
    p_color: 'Colour', p_size: 'Size', p_qty: 'Quantity', p_add: 'Add to cart', p_added: 'Added to cart', p_view: 'View cart', p_asm: 'Add assembly service', p_free: 'Free', p_spec: 'Specifications', p_desc: 'Description', p_rel: 'Goes well with', p_room: 'From the', p_in: 'In the room',
    p_inst: 'Pay in 12 months, about EGP {m} a month (3% admin fee)', p_chk: 'Delivery to your area', p_zone: 'Zone', p_fee: 'Delivery fee', p_eta: 'Expected time',
    p_samp: 'Free fabric swatches', p_samp_p: 'Three 10×10 cm swatches arrive at your home so you can judge the colour in your own light.', p_samp_b: 'Request swatches',
    f_name: 'Name', f_phone: 'Mobile number', f_addr: 'Address', f_notes: 'Notes (optional)', f_send: 'Send', e_req: 'This field is required', e_name: 'Enter your name', e_phone: 'Enter a valid Egyptian mobile number', e_date: 'Choose a valid date', e_num: 'Enter a number in the allowed range', e_sel: 'Choose from the list',
    demo: 'Design demo: the company, prices and policies are fictional and nothing is actually sent.', ok_samp: 'Request received. Swatches ship within 3 working days.',
    c_t: 'Shopping cart', c_sum: 'Order summary', c_empty: 'Your cart is empty.', c_empty_p: 'Start from a room or browse all products.', c_rm: 'Remove', c_item: 'Items', c_asm: 'Assembly', c_del: 'Delivery', c_tot: 'Total', c_plan: 'Payment plan', c_cash: 'Pay in full', c_mo: 'per month', c_months: 'months', c_none: 'no interest', c_fee: 'admin fee', c_int: 'interest', c_min: 'Instalments available on orders from EGP 5,000', c_note: 'Estimates for comparison; approval and final terms come from the lender.', c_ship: 'Delivery details', c_place: 'Place order', ok_ord: 'Order {r} received. We will contact you to confirm the delivery slot. (Demo: no order was recorded)', c_eta: 'Earliest expected delivery', c_left: 'item', c_unit: 'each',
    cu_t: 'Made to order', cu_p: 'Tell us what you need and we will return a drawing and quote within 3 working days.', cu_type: 'Piece type', cu_wood: 'Wood', cu_w: 'Width (cm)', cu_d: 'Depth (cm)', cu_h: 'Height (cm)', cu_bud: 'Approximate budget', cu_ok: 'Request {r} received. We will return a drawing and quote within 3 working days.',
    ty: { sofa: 'Sofa', bed: 'Bed', table: 'Table', wardrobe: 'Wardrobe', shelf: 'Bookcase or storage', desk: 'Desk', other: 'Something else' }, wd: { oak: 'Oak', walnut: 'Walnut', beech: 'Beech', unsure: 'Need advice' }, bd: { b1: 'Under EGP 10,000', b2: 'EGP 10,000 – 25,000', b3: 'EGP 25,000 – 50,000', b4: 'Over EGP 50,000' },
    sr_t: 'Our showrooms', sr_p: 'Book a visit and we will have your pieces and swatches ready.', sr_hours: 'Daily 11am – 10pm', sr_which: 'Showroom', sr_date: 'Date', sr_slot: 'Time slot', sr_book: 'Book the visit', sr_ok: 'Visit {r} booked. We will call to confirm the time. (Demo)', slots: { s1: '11am – 2pm', s2: '2pm – 6pm', s3: '6pm – 10pm' },
    d_t: 'Delivery, financing and warranty', d_p: 'Everything in one place, with numbers you can check before ordering.', d_zone: 'Delivery zone', d_fee: 'Delivery fee', d_eta: 'In-stock timing', d_plan: 'Instalment plans', d_pl: 'Term', d_rate: 'Annual interest', d_pol: 'Returns and warranty',
    sv_t: 'Your saved pieces', sv_empty: 'Nothing saved yet. Tap the heart on any piece.', nf_t: 'Page not found', nf_p: 'This link does not exist. Go back home.', home: 'Home',
    ft_about: 'Rokn is a fictional brand used to present a design. All names, prices and policies are for demonstration.', ft_exp: 'Shop', ft_help: 'Help', ft_hot: 'Customer care', ft_rights: 'All rights reserved', ft_img: 'Images are AI-generated for presentation only.',
    faq: [['Is delivery included in the price?', 'No. Delivery is priced by zone and shown on the product page and in the cart before you pay. Assembly is optional and priced separately.'], ['How long do made-to-order pieces take?', 'Two to four weeks depending on the piece, written on each product page before you order.'], ['Can I return a piece?', 'Within 14 days if unused and in original packaging. Pieces made to your size cannot be returned. Illustrative policy.'], ['Can I see the fabric before ordering?', 'Yes. Request free swatches from the sofa page or visit a showroom.']]
  }
};
const PLANS = [{ m: 6, apr: 0, fee: 0 }, { m: 12, apr: 0, fee: 3 }, { m: 24, apr: 9, fee: 0 }];
const MIN_PLAN = 5000;

/* ---------- state ---------- */
const S = { lang: 'ar', theme: 'light', saved: new Set(), cart: [], zone: 'z1', asm: false, plan: 0 };
const pids = new Set(P.map(p => p.id));
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
const prod = (id) => P.find(p => p.id === id);
const zone = (id) => ZONES.find(z => z.id === id) || ZONES[0];
(() => {
  const l = load('rk_lang'); S.lang = l === 'en' ? 'en' : 'ar';
  const th = load('rk_theme'); S.theme = th === 'dark' || th === 'light' ? th : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const sv = load('rk_saved'); if (Array.isArray(sv)) sv.forEach(i => pids.has(i) && S.saved.add(i));
  const c = load('rk_cart');
  if (Array.isArray(c)) c.slice(0, 30).forEach(it => {
    const p = it && prod(it.id); if (!p) return;
    const q = Math.floor(+it.q); if (!(q >= 1 && q <= 9)) return;
    const col = p.colors ? (p.colors.some(x => x.id === it.c) ? it.c : p.colors[0].id) : null;
    const sz = p.sizes ? (p.sizes.some(x => x.id === it.s) ? it.s : p.sizes[0].id) : null;
    const ex = S.cart.find(x => x.id === p.id && x.c === col && x.s === sz); if (ex) ex.q = Math.min(9, ex.q + q); else S.cart.push({ id: p.id, c: col, s: sz, q });
  });
  const sh = load('rk_ship'); if (sh) { if (ZONES.some(z => z.id === sh.zone)) S.zone = sh.zone; S.asm = sh.asm === true; if ([-1, 0, 1, 2].includes(sh.plan)) S.plan = sh.plan; }
})();
const t = (k) => { const v = T[S.lang][k]; return v === undefined ? k : v; };
const pick = (o) => o[S.lang];
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (o[k] === undefined ? m : o[k]));
const nf = () => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: 0 });
const num = (n) => nf().format(Math.round(n));
const price = (v) => `${num(v)} ${t('egp')}`;
const saveShip = () => save('rk_ship', { zone: S.zone, asm: S.asm, plan: S.plan });
const saveCart = () => save('rk_cart', S.cart);

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
let CH = 'h3';
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) {
    const v = props[k]; if (v === undefined || v === null || v === false) continue;
    if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v);
  }
  add(e, kids); return e;
}
function add(e, kids) { for (const c of kids.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); } }
function sv(tag, props, ...kids) { const e = document.createElementNS(NS, tag); for (const k in (props || {})) e.setAttribute(k, props[k]); add(e, kids); return e; }
const ICON = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>', bag: '<path d="M5 8h14l-1 12H6L5 8Zm4 0a3 3 0 0 1 6 0"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>', shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4"/>',
  undo: '<path d="M9 7 4 12l5 5M4 12h11a5 5 0 0 1 0 10h-2"/>', eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>', pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>', check: '<path d="m5 12 5 5 9-10"/>'
};
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // ICON values are constants defined above

let toastT;
function toast(msg, href, label) {
  let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); }
  e.replaceChildren(h('span', null, msg), href ? h('a', { href, onclick: () => { e.hidden = true; } }, label) : null); e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 3200);
}

/* ---------- domain helpers ---------- */
const sizeOf = (p, id) => (p.sizes ? p.sizes.find(s => s.id === id) || p.sizes[0] : null);
const colorOf = (p, id) => (p.colors ? p.colors.find(c => c.id === id) || p.colors[0] : null);
const unit = (it) => { const p = prod(it.id), s = sizeOf(p, it.s); return p.price + (s ? s.add : 0); };
const imgOf = (p, c) => IMG + (p.colors ? colorOf(p, c).img : p.img) + '.webp';
const roomOf = (id) => ROOMS.find(r => r.id === id);
const lead = (p, zid) => { const z = zone(zid); return p.lead === 'stock' ? fmt(t('st_eta'), { c: z.days[0], d: z.days[1] }) : fmt(t('mk_eta'), { a: p.lead, b: p.lead + 1, c: z.days[0], d: z.days[1] }); };
const leadShort = (p) => (p.lead === 'stock' ? t('instock') + ' ' + `${zone(S.zone).days[0]}–${zone(S.zone).days[1]} ${t('days')}` : `${t('make')}: ${p.lead}–${p.lead + 1} ${t('wks')}`);
const cartCount = () => S.cart.reduce((n, i) => n + i.q, 0);
function totals() {
  const items = S.cart.reduce((n, i) => n + unit(i) * i.q, 0);
  const asm = S.asm ? S.cart.reduce((n, i) => n + prod(i.id).asm * i.q, 0) : 0;
  const del = S.cart.length ? zone(S.zone).fee : 0;
  return { items, asm, del, total: items + asm + del };
}
function planCalc(amount, pl) {
  const base = amount * (1 + pl.fee / 100), r = pl.apr / 1200;
  const m = r === 0 ? base / pl.m : base * r / (1 - Math.pow(1 + r, -pl.m));
  return { m, total: m * pl.m };
}
function addToCart(id, c, s, q) {
  const p = prod(id); if (!p) return;
  const col = p.colors ? colorOf(p, c).id : null, sz = p.sizes ? sizeOf(p, s).id : null;
  const ex = S.cart.find(x => x.id === id && x.c === col && x.s === sz); if (ex) ex.q = Math.min(9, ex.q + q); else S.cart.push({ id, c: col, s: sz, q });
  saveCart(); updateBadges();
}
function toggleSave(id) { S.saved.has(id) ? S.saved.delete(id) : S.saved.add(id); save('rk_saved', [...S.saved]); updateBadges(); }

/* ---------- shared parts ---------- */
function favBtn(id, pname) {
  const b = h('button', { class: 'round', type: 'button', 'aria-pressed': String(S.saved.has(id)), 'aria-label': (S.saved.has(id) ? t('unfav') : t('fav')) + ': ' + pname }, ic('heart'));
  b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleSave(id); b.setAttribute('aria-pressed', String(S.saved.has(id))); b.setAttribute('aria-label', (S.saved.has(id) ? t('unfav') : t('fav')) + ': ' + pname); toast(S.saved.has(id) ? t('t_fav') : t('t_unfav')); });
  return b;
}
function pcard(p) {
  return h('article', { class: 'pc' },
    h('div', { class: 'pc__m' }, p.best ? h('span', { class: 'tag' }, t('best')) : null, h('img', { src: IMG + p.img + '.webp', alt: '', loading: 'lazy', width: 800, height: 800 }), favBtn(p.id, pick(p))),
    h(CH, { class: 'pc__t' }, h('a', { href: '#/p/' + p.id }, pick(p))),
    h('div', { class: 'pc__p' }, (p.colors || p.sizes ? t('from') + ' ' : '') + price(p.price)),
    p.colors ? h('div', { class: 'dots', 'aria-hidden': 'true' }, p.colors.map(c => h('i', { style: 'background:' + c.hex }))) : null,
    h('div', { class: 'pc__s' }, leadShort(p)));
}
function head(title, sub, href, label, lvl) { return h('div', { class: 'sh' }, h('div', null, h(lvl || 'h2', { text: title, id: lvl === 'h1' ? 'pt' : null, tabindex: lvl === 'h1' ? '-1' : null }), sub ? h('p', { text: sub }) : null), href ? h('a', { class: 'link', href }, label || t('all'), ic('arrow', 'flip')) : null); }

/* shop-the-look stage: physical left/top percentages because the photo itself never mirrors */
let openHs = null;
function stage(room) {
  const wrap = h('div', { class: 'stage' }), pop = h('div', { class: 'pop', role: 'group', hidden: true });
  const close = () => { pop.hidden = true; wrap.querySelectorAll('.hs').forEach(b => b.setAttribute('aria-expanded', 'false')); openHs = null; };
  wrap.append(h('img', { src: IMG + room.img + '.webp', alt: pick(room), width: 1024, height: room.img === 'living' ? 572 : 687, loading: 'lazy' }));
  room.hs.forEach(([pid, x, y]) => {
    const p = prod(pid); if (!p) return;
    const b = h('button', { class: 'hs', type: 'button', style: `left:${x}%;top:${y}%`, 'aria-expanded': 'false', 'aria-label': pick(p) + ' · ' + price(p.price) });
    b.addEventListener('click', (e) => {
      e.stopPropagation(); const was = !pop.hidden && pop.dataset.id === pid; close(); if (was) return;
      pop.dataset.id = pid; pop.replaceChildren(h('img', { src: IMG + p.img + '.webp', alt: '', width: 72, height: 72 }), h('div', null, h('b', { text: pick(p) }), h('span', { text: price(p.price) }), h('br'), h('a', { href: '#/p/' + pid }, t('more'))));
      pop.style.left = `clamp(8px, calc(${x}% - 130px), calc(100% - 268px))`;
      if (y > 55) { pop.style.top = 'auto'; pop.style.bottom = `calc(${100 - y}% + 26px)`; } else { pop.style.bottom = 'auto'; pop.style.top = `calc(${y}% + 26px)`; }
      pop.hidden = false; b.setAttribute('aria-expanded', 'true'); openHs = close;
    });
    wrap.append(b);
  });
  wrap.append(pop);
  return wrap;
}
document.addEventListener('click', () => { if (openHs) openHs(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openHs) openHs(); });

/* generic demo form with validation (no network) */
let uid = 0;
function mkForm(fields, label, okText) {
  const form = h('form', { class: 'form', novalidate: true }), refs = [];
  fields.forEach(f => {
    const id = 'f' + (++uid), k = f.kind || 'text'; let el;
    if (k === 'select') { el = h('select', { class: 'in', id, name: f.k }); f.opts().forEach(([v, l]) => el.append(h('option', { value: v }, l))); }
    else if (k === 'area') el = h('textarea', { class: 'in', id, name: f.k, rows: 3, maxlength: 400 });
    else if (k === 'phone') el = h('input', { class: 'in', id, name: f.k, type: 'tel', inputmode: 'tel', autocomplete: 'tel', maxlength: 16, dir: 'ltr' });
    else if (k === 'date') el = h('input', { class: 'in', id, name: f.k, type: 'date', min: f.min, max: f.max });
    else if (k === 'num') el = h('input', { class: 'in', id, name: f.k, type: 'number', inputmode: 'numeric', min: f.min, max: f.max });
    else el = h('input', { class: 'in', id, name: f.k, autocomplete: k === 'name' ? 'name' : 'off', maxlength: k === 'name' ? 60 : 160 });
    const er = h('div', { class: 'err', id: id + 'e' }); el.setAttribute('aria-describedby', id + 'e');
    form.append(h('div', { class: 'fld' + (f.half ? ' half' : '') }, h('label', { for: id }, f.label()), el, er)); refs.push({ f, el, er, k });
  });
  const hp = h('input', { class: 'hp', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' }), out = h('div', { 'aria-live': 'polite' });
  form.append(hp, h('button', { class: 'btn btn--b btn--w', type: 'submit' }, label), h('p', { class: 'note', text: t('demo') }), out);
  form.addEventListener('submit', (e) => {
    e.preventDefault(); if (hp.value) return; let first = null;
    refs.forEach(({ f, el, er, k }) => {
      const v = el.value.trim(); let m = '';
      if (!v && f.req !== false) m = 'e_req';
      else if (v) {
        if (k === 'name' && v.length < 2) m = 'e_name';
        else if (k === 'phone' && !/^(\+?20|0)?1[0125]\d{8}$/.test(v.replace(/[\s-]/g, ''))) m = 'e_phone';
        else if (k === 'select' && !f.opts().some(o => o[0] === v)) m = 'e_sel';
        else if (k === 'date' && !(/^\d{4}-\d{2}-\d{2}$/.test(v) && v >= f.min && v <= f.max)) m = 'e_date';
        else if (k === 'num' && !(isFinite(+v) && +v >= f.min && +v <= f.max)) m = 'e_num';
      }
      er.textContent = m ? t(m) : ''; el.setAttribute('aria-invalid', m ? 'true' : 'false'); if (m && !first) first = el;
    });
    if (first) { first.focus(); return; }
    const ref = 'RK-' + Math.floor(100000 + Math.random() * 900000);
    form.querySelectorAll('input,select,textarea,button').forEach(x => { x.disabled = true; }); out.replaceChildren(h('div', { class: 'okmsg', text: fmt(okText, { r: ref }) }));
  });
  return form;
}
const fName = { k: 'name', kind: 'name', label: () => t('f_name'), half: true }, fPhone = { k: 'phone', kind: 'phone', label: () => t('f_phone'), half: true };
const isoDay = (add) => { const d = new Date(); d.setDate(d.getDate() + add); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const zoneOpts = () => ZONES.map(z => [z.id, pick(z)]);

/* ---------- views ---------- */
function vHome() {
  const best = P.filter(p => p.best);
  const chips = h('div', { class: 'bar', role: 'group', 'aria-label': t('s_look') }), host = h('div'), state = { r: ROOMS[1].id };
  const draw = () => { chips.replaceChildren(...ROOMS.map(r => { const b = h('button', { class: 'chip', type: 'button', 'aria-pressed': String(state.r === r.id) }, pick(r)); b.addEventListener('click', () => { state.r = r.id; draw(); }); return b; })); host.replaceChildren(stage(roomOf(state.r))); };
  draw();
  const sofa = prod('sofa'), cfgImg = h('img', { src: IMG + 'sofa-terracotta.webp', alt: pick(sofa) + ' · ' + pick(sofa.colors[0]), width: 800, height: 800, loading: 'lazy' }), cfgName = h('b', { text: pick(sofa.colors[0]) }), swatches = h('div', { class: 'sw' });
  const drawSw = (cur) => swatches.replaceChildren(...sofa.colors.map(c => { const b = h('button', { type: 'button', style: 'background:' + c.hex, 'aria-pressed': String(c.id === cur), 'aria-label': pick(c) }); b.addEventListener('click', () => { cfgImg.src = IMG + c.img + '.webp'; cfgImg.alt = pick(sofa) + ' · ' + pick(c); cfgName.textContent = pick(c); drawSw(c.id); }); return b; }));
  drawSw('terracotta');
  return h('div', null,
    h('section', { class: 'hero', 'aria-label': t('brand') }, h('img', { class: 'hero__img', src: IMG + 'living.webp', alt: '', width: 1024, height: 572, fetchpriority: 'high' }), h('div', { class: 'hero__t' }, h('div', { class: 'wrap' }, h('h1', { id: 'pt', tabindex: '-1', text: t('h1') }), h('p', { text: t('h_p') }), h('div', { class: 'hero__cta' }, h('a', { class: 'btn btn--b', href: '#/room/living' }, t('h_c1'), ic('arrow', 'flip')), h('a', { class: 'btn btn--o', href: '#/custom' }, t('h_c2')))))),
    h('section', { class: 'wrap sec' }, h('ul', { class: 'trust' }, [['truck', 'tr1'], ['shield', 'tr2'], ['undo', 'tr3'], ['eye', 'tr4']].map(([i, k]) => h('li', null, ic(i), h('h2', { class: 'hd-f', style: 'font-size:1.05rem;font-family:var(--f);font-weight:600', text: t(k) }), h('p', { text: t(k + 'p') }))))),
    h('section', { class: 'wrap', style: 'padding-block-end:clamp(2.5rem,6vw,5rem)' }, head(t('s_look'), t('s_look_p')), chips, host),
    h('section', { class: 'band' }, h('div', { class: 'wrap sec' }, head(t('s_rooms'), t('s_rooms_p')), h('div', { class: 'mosaic' }, ROOMS.map(r => h('a', { class: 'tile', href: '#/room/' + r.id }, h('img', { src: IMG + r.img + '.webp', alt: '', loading: 'lazy', width: 1024, height: 687 }), h('span', null, pick(r), ic('arrow', 'flip'))))))),
    h('section', { class: 'wrap sec' }, head(t('s_best'), t('s_best_p'), '#/shop'), h('div', { class: 'grid' }, best.map(pcard))),
    h('section', { class: 'band' }, h('div', { class: 'wrap sec cfg' }, h('div', { class: 'cfg__img' }, cfgImg), h('div', { class: 'stack' }, h('h2', { class: 'hd-f', style: 'font-size:clamp(1.7rem,3.4vw,2.6rem)', text: t('s_cfg') }), h('p', { style: 'color:var(--mut)', text: t('s_cfg_p') }), h('div', { class: 'stack', style: 'gap:.6rem' }, h('span', { class: 'lb note' }, t('p_color'), ': ', cfgName), swatches), h('div', null, h('a', { class: 'btn btn--p', href: '#/p/sofa' }, t('s_cfg_c'), ic('arrow', 'flip')))))),
    h('section', { class: 'wrap sec split' }, h('img', { src: IMG + 'workshop.webp', alt: '', width: 1024, height: 687, loading: 'lazy' }), h('div', null, h('h2', { class: 'hd-f', style: 'font-size:clamp(1.7rem,3.4vw,2.6rem)', text: t('s_cus') }), h('p', { style: 'color:var(--mut);margin-block-start:.6rem', text: t('s_cus_p') }), h('ol', { class: 'steps', style: 'list-style:none;padding:0' }, [1, 2, 3].map(i => h('li', null, h('div', null, h('b', { text: t('cus' + i) }), h('span', { class: 'note', text: t('cus' + i + 'p') }))))), h('a', { class: 'btn btn--p', href: '#/custom' }, t('h_c2'), ic('arrow', 'flip')))),
    h('section', { class: 'band' }, h('div', { class: 'wrap sec' }, head(t('s_dl'), null, '#/delivery', t('more')), h('div', { class: 'cards3' }, [1, 2, 3].map(i => h('div', { class: 'box stack' }, h('h3', { class: 'hd-f', style: 'font-size:1.2rem', text: t('dl' + i) }), h('p', { class: 'note', style: 'font-size:.95rem', text: t('dl' + i + 'p') })))))),
    h('section', { class: 'wrap sec' }, head(t('s_sr'), t('s_sr_p'), '#/showrooms', t('book')), h('div', { class: 'cards3' }, SHOWROOMS.map(s => h('div', { class: 'box stack' }, h('h3', { class: 'hd-f', style: 'font-size:1.2rem', text: pick(s) }), h('p', { class: 'note' }, ic('pin'), ' ', pick({ ar: s.adr[0], en: s.adr[1] })), h('p', { class: 'note', text: t('sr_hours') }))))),
    h('section', { class: 'wrap sec', style: 'max-inline-size:860px' }, h('h2', { class: 'hd-f', style: 'font-size:clamp(1.7rem,3.4vw,2.6rem);margin-block-end:1rem', text: t('s_faq') }), faqList()));
}
function faqList() { return h('div', null, t('faq').map(([q, a]) => h('details', null, h('summary', { text: q }), h('p', { text: a })))); }

function vRooms() { return h('div', { class: 'wrap sec' }, head(t('n_rooms'), t('s_rooms_p'), null, null, 'h1'), h('div', { class: 'mosaic' }, ROOMS.map(r => h('a', { class: 'tile', href: '#/room/' + r.id }, h('img', { src: IMG + r.img + '.webp', alt: '', loading: 'lazy', width: 1024, height: 687 }), h('span', null, pick(r), ic('arrow', 'flip')))))); }
function vRoom(id) {
  const r = roomOf(id); if (!r) return v404(); document.title = `${pick(r)} | ${t('brand')} ${t('brandSub')}`;
  const items = P.filter(p => p.rooms.includes(id)); CH = 'h2';
  return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('p', { class: 'eyebrow', text: t('p_room') }), h('h1', { id: 'pt', tabindex: '-1', text: pick(r) }), h('p', { text: t('s_look_p') }))), stage(r), h('div', { style: 'margin-block-start:3rem' }, h('div', { class: 'grid' }, items.map(pcard))));
}
function vShop(q) {
  const st = { q: q.q || '', cat: CATS.some(c => c.id === q.cat) ? q.cat : '', room: ROOMS.some(r => r.id === q.room) ? q.room : '', sort: ['l', 'h'].includes(q.sort) ? q.sort : '' };
  const bar = h('div', { class: 'bar' }), grid = h('div'), cnt = h('p', { class: 'note', 'aria-live': 'polite', style: 'margin-block-end:1rem' });
  const qin = h('input', { class: 'in', type: 'search', maxlength: 40, 'aria-label': t('f_q'), placeholder: t('f_q'), value: st.q });
  const sel = h('select', { class: 'in', 'aria-label': t('f_sort') }, [['', t('sort_f')], ['l', t('sort_l')], ['h', t('sort_h')]].map(([v, l]) => h('option', { value: v, selected: v === st.sort }, l)));
  const rsel = h('select', { class: 'in', 'aria-label': t('f_room') }, [['', t('f_room') + ': ' + t('f_all')], ...ROOMS.map(r => [r.id, pick(r)])].map(([v, l]) => h('option', { value: v, selected: v === st.room }, l)));
  const chips = [['', t('f_all')], ...CATS.map(c => [c.id, pick(c)])].map(([v, l]) => { const b = h('button', { class: 'chip', type: 'button', 'data-v': v, 'aria-pressed': String(st.cat === v) }, l); b.addEventListener('click', () => { st.cat = v; chips.forEach(x => x.setAttribute('aria-pressed', String(x.dataset.v === st.cat))); apply(); }); return b; });
  const apply = () => {
    const needle = st.q.toLowerCase();
    let list = P.filter(p => (!st.cat || p.cat === st.cat) && (!st.room || p.rooms.includes(st.room)) && (!needle || (p.ar + ' ' + p.en).toLowerCase().includes(needle)));
    if (st.sort === 'l') list = [...list].sort((a, b) => a.price - b.price); else if (st.sort === 'h') list = [...list].sort((a, b) => b.price - a.price);
    cnt.textContent = `${list.length} ${t('res')}`;
    grid.replaceChildren(list.length ? h('div', { class: 'grid' }, list.map(pcard)) : h('div', { class: 'empty' }, h('p', { text: t('no_res') }), h('p', { class: 'note', text: t('no_res_p') })));
  };
  qin.addEventListener('input', () => { st.q = qin.value.slice(0, 40); apply(); }); sel.addEventListener('change', () => { st.sort = sel.value; apply(); }); rsel.addEventListener('change', () => { st.room = rsel.value; apply(); });
  bar.append(...chips, qin, rsel, sel); CH = 'h2'; apply();
  return h('div', { class: 'wrap sec' }, head(t('n_shop'), null, null, null, 'h1'), bar, cnt, grid);
}

function vProduct(id) {
  const p = prod(id); if (!p) return v404(); document.title = `${pick(p)} | ${t('brand')} ${t('brandSub')}`;
  const st = { c: p.colors ? p.colors[0].id : null, s: p.sizes ? p.sizes[0].id : null, q: 1, view: 0 }, room = roomOf(p.rooms[0]);
  const mainImg = h('img', { width: 800, height: 800 }), thumbs = h('div', { class: 'thumbs' }), priceEl = h('div', { class: 'price' }), instEl = h('p', { class: 'note' }), gal = h('div', { class: 'gal__m' }, mainImg);
  const colName = h('b'), swG = h('div', { class: 'sw' }), sizeG = h('div', { class: 'seg' }), qout = h('output', { text: '1' });
  const delOut = h('dl', { class: 'kv', 'aria-live': 'polite' });
  const views = () => [{ src: imgOf(p, st.c), alt: pick(p) + (p.colors ? ' · ' + pick(colorOf(p, st.c)) : ''), th: imgOf(p, st.c) }, { src: IMG + room.img + '.webp', alt: pick(room), th: IMG + room.img + '.webp' }];
  const upd = () => {
    const v = views(), cur = v[st.view]; mainImg.src = cur.src; mainImg.alt = cur.alt; mainImg.style.objectPosition = st.view ? '50% 60%' : '50% 50%';
    thumbs.replaceChildren(...v.map((x, i) => { const b = h('button', { type: 'button', 'aria-pressed': String(i === st.view), 'aria-label': i ? t('p_in') : pick(p) }, h('img', { src: x.th, alt: '', width: 76, height: 76 })); b.addEventListener('click', () => { st.view = i; upd(); }); return b; }));
    const u = unit({ id, s: st.s }); priceEl.replaceChildren(price(u * st.q), st.q > 1 ? h('small', null, ` · ${price(u)} ${t('c_unit')}`) : null);
    instEl.textContent = fmt(t('p_inst'), { m: num(planCalc(u * st.q, PLANS[1]).m) }); qout.textContent = st.q;
    if (p.colors) colName.textContent = pick(colorOf(p, st.c));
    if (p.colors) swG.replaceChildren(...p.colors.map(c => { const b = h('button', { type: 'button', style: 'background:' + c.hex, 'aria-pressed': String(c.id === st.c), 'aria-label': pick(c) }); b.addEventListener('click', () => { st.c = c.id; st.view = 0; upd(); }); return b; }));
    if (p.sizes) sizeG.replaceChildren(...p.sizes.map(s => { const b = h('button', { type: 'button', 'aria-pressed': String(s.id === st.s) }, pick(s) + (s.add ? ` (+${num(s.add)})` : '')); b.addEventListener('click', () => { st.s = s.id; upd(); }); return b; }));
    const z = zone(S.zone); delOut.replaceChildren(h('div', null, h('dt', { text: t('p_fee') }), h('dd', { text: price(z.fee) })), h('div', null, h('dt', { text: t('p_eta') }), h('dd', { text: lead(p, S.zone) })));
  };
  const zsel = h('select', { class: 'in', id: 'pz', 'aria-label': t('p_zone') }, zoneOpts().map(([v, l]) => h('option', { value: v, selected: v === S.zone }, l))); zsel.addEventListener('change', () => { S.zone = zsel.value; saveShip(); upd(); });
  const minus = h('button', { type: 'button', 'aria-label': '−' }, '−'), plus = h('button', { type: 'button', 'aria-label': '+' }, '+');
  minus.addEventListener('click', () => { st.q = Math.max(1, st.q - 1); upd(); }); plus.addEventListener('click', () => { st.q = Math.min(9, st.q + 1); upd(); });
  const addB = h('button', { class: 'btn btn--p btn--w', type: 'button' }, ic('bag'), t('p_add')); addB.addEventListener('click', () => { addToCart(id, st.c, st.s, st.q); toast(t('p_added'), '#/cart', t('p_view')); });
  upd();
  const rel = P.filter(x => x.id !== id && (x.rooms.some(r => p.rooms.includes(r)))).slice(0, 4); CH = 'h3';
  const sample = p.colors ? h('div', { class: 'box stack' }, h('h2', { class: 'hd-f', style: 'font-size:1.15rem', text: t('p_samp') }), h('p', { class: 'note', text: t('p_samp_p') }), mkForm([fName, fPhone, { k: 'addr', kind: 'text', label: () => t('f_addr') }], t('p_samp_b'), t('ok_samp'))) : null;
  return h('div', { class: 'wrap sec' },
    h('div', { class: 'pdp' }, h('div', { class: 'gal' }, gal, thumbs),
      h('div', { class: 'stack' }, h('div', null, h('p', { class: 'eyebrow', text: pick(CATS.find(c => c.id === p.cat)) }), h('h1', { id: 'pt', tabindex: '-1', text: pick(p) }), priceEl, instEl),
        p.colors ? h('div', { class: 'stack', style: 'gap:.5rem' }, h('span', { class: 'lb note' }, t('p_color'), ': ', colName), swG) : null,
        p.sizes ? h('div', { class: 'stack', style: 'gap:.5rem' }, h('span', { class: 'lb note', text: t('p_size') }), sizeG) : null,
        h('div', { style: 'display:flex;gap:.8rem;align-items:center;flex-wrap:wrap' }, h('div', { class: 'qty', role: 'group', 'aria-label': t('p_qty') }, minus, qout, plus), h('div', { style: 'flex:1 1 200px' }, addB)),
        h('div', { class: 'box' }, h('h2', { class: 'hd-f', style: 'font-size:1.05rem', text: t('p_chk') }), h('div', { class: 'fld' }, h('label', { for: 'pz', text: t('p_zone') }), zsel), delOut, p.asm ? h('p', { class: 'note', text: `${t('c_asm')}: ${price(p.asm)}` }) : h('p', { class: 'note', text: `${t('c_asm')}: ${t('p_free')}` })),
        sample,
        h('div', null, h('h2', { class: 'hd-f', style: 'font-size:1.15rem;margin-block-end:.4rem', text: t('p_desc') }), h('p', { style: 'color:var(--mut)', text: pick({ ar: p.d[0], en: p.d[1] }) })),
        h('div', null, h('h2', { class: 'hd-f', style: 'font-size:1.15rem;margin-block-end:.4rem', text: t('p_spec') }), h('dl', { class: 'spec' }, p.sp.map(r => h('div', null, h('dt', { text: pick({ ar: r[0], en: r[2] }) }), h('dd', { text: pick({ ar: r[1], en: r[3] }) }))))))),
    rel.length ? h('div', { style: 'margin-block-start:4rem' }, head(t('p_rel'), null, null, null, 'h2'), h('div', { class: 'grid' }, rel.map(pcard))) : null);
}

function vCart() {
  const lines = h('div'), sum = h('div'), root = h('div', { class: 'cart' }); let fk = '';
  const sideCol = h('div', { class: 'stack sum' });
  const co = mkForm([fName, fPhone, { k: 'addr', kind: 'text', label: () => t('f_addr') }, { k: 'notes', kind: 'area', req: false, label: () => t('f_notes') }], t('c_place'), t('ok_ord'));
  co.addEventListener('submit', () => { /* mkForm validates first; on success clear the demo cart */ if (co.querySelector('.okmsg')) { S.cart = []; saveCart(); updateBadges(); lines.replaceChildren(h('div', { class: 'empty' }, h('p', { text: t('c_empty') }))); sum.replaceChildren(); } });
  const draw = () => {
    if (!S.cart.length) { root.replaceChildren(h('div', { class: 'empty', style: 'grid-column:1/-1' }, h('p', { text: t('c_empty') }), h('p', { class: 'note', text: t('c_empty_p') }), h('a', { class: 'btn btn--p', style: 'margin-block-start:1rem', href: '#/shop' }, t('n_shop')))); return; }
    if (!root.contains(lines)) root.replaceChildren(lines, sideCol);
    lines.replaceChildren(...S.cart.map((it, i) => {
      const p = prod(it.id), k = 'i' + i, col = colorOf(p, it.c), sz = sizeOf(p, it.s);
      const mk = (lbl, d, key) => { const b = h('button', { type: 'button', 'aria-label': lbl, 'data-k': key }, d > 0 ? '+' : '−'); b.addEventListener('click', () => { it.q = Math.min(9, Math.max(1, it.q + d)); fk = key; saveCart(); draw(); }); return b; };
      const rm = h('button', { class: 'link', type: 'button', style: 'background:none;border:0;border-block-end:1px solid;cursor:pointer;font-size:.88rem;min-block-size:44px', 'data-k': k + 'r' }, t('c_rm')); rm.addEventListener('click', () => { S.cart.splice(i, 1); saveCart(); updateBadges(); fk = ''; draw(); });
      return h('div', { class: 'line' }, h('img', { src: imgOf(p, it.c), alt: '', width: 96, height: 96 }), h('div', null, h('h2', { text: pick(p) }), h('p', { class: 'note', text: [col ? pick(col) : null, sz ? pick(sz) : null, price(unit(it)) + ' ' + t('c_unit')].filter(Boolean).join(' · ') }), h('p', { class: 'note', text: lead(p, S.zone) })), h('div', { style: 'display:grid;gap:.3rem;justify-items:end' }, h('div', { class: 'qty', role: 'group', 'aria-label': t('p_qty') }, mk('−', -1, k + 'd'), h('output', { text: it.q }), mk('+', 1, k + 'u')), h('b', { text: price(unit(it) * it.q) }), rm));
    }));
    const tt = totals(), z = zone(S.zone);
    const zs = h('select', { class: 'in', id: 'cz', 'aria-label': t('p_zone') }, zoneOpts().map(([v, l]) => h('option', { value: v, selected: v === S.zone }, l))); zs.addEventListener('change', () => { S.zone = zs.value; saveShip(); fk = 'cz'; draw(); });
    const ac = h('input', { type: 'checkbox', id: 'ca', checked: S.asm, style: 'inline-size:22px;block-size:22px;accent-color:var(--wal)' }); ac.addEventListener('change', () => { S.asm = ac.checked; saveShip(); fk = 'ca'; draw(); });
    ac.setAttribute('data-k', 'ca'); zs.setAttribute('data-k', 'cz');
    const eligible = tt.total >= MIN_PLAN;
    const plans = h('div', { class: 'plans', role: 'radiogroup', 'aria-label': t('c_plan') }, [{ cash: true }, ...PLANS].map((pl, idx) => {
      const sel = idx === 0 ? S.plan === -1 || !eligible : eligible && S.plan === idx - 1;
      const inp = h('input', { type: 'radio', name: 'plan', checked: sel, disabled: idx > 0 && !eligible, 'data-k': 'pl' + idx }); inp.addEventListener('change', () => { S.plan = idx === 0 ? -1 : idx - 1; saveShip(); fk = 'pl' + idx; draw(); });
      let txt; if (idx === 0) txt = [t('c_cash'), price(tt.total)]; else { const c = planCalc(tt.total, pl); txt = [`${pl.m} ${t('c_months')} · ${pl.apr ? pl.apr + '% ' + t('c_int') : t('c_none')}${pl.fee ? ' + ' + pl.fee + '% ' + t('c_fee') : ''}`, `${num(c.m)} ${t('egp')} ${t('c_mo')}`]; }
      return h('label', { class: 'plan' }, h('span', { style: 'display:flex;gap:.6rem;align-items:center' }, inp, txt[0]), h('b', { text: txt[1] }));
    }));
    const maxLead = Math.max(0, ...S.cart.map(i => { const q = prod(i.id).lead; return q === 'stock' ? 0 : q; }));
    const etaTxt = maxLead ? fmt(t('mk_eta'), { a: maxLead, b: maxLead + 1, c: z.days[0], d: z.days[1] }) : fmt(t('st_eta'), { c: z.days[0], d: z.days[1] });
    sum.replaceChildren(h('div', { class: 'box stack' }, h('h2', { class: 'hd-f', style: 'font-size:1.2rem', text: t('c_sum') }),
      h('div', { class: 'fld' }, h('label', { for: 'cz', text: t('p_zone') }), zs), h('label', { style: 'display:flex;gap:.6rem;align-items:center;min-block-size:44px' }, ac, `${t('p_asm')}`),
      h('div', null, h('div', { class: 'row' }, h('span', { text: `${t('c_item')} (${cartCount()})` }), h('span', { text: price(tt.items) })), h('div', { class: 'row' }, h('span', { text: t('c_asm') }), h('span', { text: tt.asm ? price(tt.asm) : S.asm ? t('p_free') : '—' })), h('div', { class: 'row' }, h('span', { text: t('c_del') }), h('span', { text: price(tt.del) })), h('div', { class: 'row tot' }, h('span', { text: t('c_tot') }), h('span', { text: price(tt.total) }))),
      h('p', { class: 'note', text: `${t('c_eta')}: ${etaTxt}` }), h('h3', { class: 'hd-f', style: 'font-size:1.05rem', text: t('c_plan') }), plans, h('p', { class: 'note', text: eligible ? t('c_note') : t('c_min') })));
    if (fk) { const e = root.querySelector('[data-k="' + fk + '"]'); if (e) e.focus(); }
  };
  sideCol.append(sum, h('div', { class: 'box stack' }, h('h2', { class: 'hd-f', style: 'font-size:1.2rem', text: t('c_ship') }), co));
  root.append(lines, sideCol); draw();
  return h('div', { class: 'wrap sec' }, head(t('c_t'), null, null, null, 'h1'), root);
}

function vCustom() {
  const f = mkForm([fName, fPhone,
    { k: 'type', kind: 'select', half: true, label: () => t('cu_type'), opts: () => Object.keys(T.ar.ty).map(k => [k, T[S.lang].ty[k]]) }, { k: 'wood', kind: 'select', half: true, label: () => t('cu_wood'), opts: () => Object.keys(T.ar.wd).map(k => [k, T[S.lang].wd[k]]) },
    { k: 'w', kind: 'num', min: 20, max: 500, half: true, label: () => t('cu_w') }, { k: 'd', kind: 'num', min: 20, max: 300, half: true, label: () => t('cu_d') }, { k: 'h', kind: 'num', min: 20, max: 300, half: true, label: () => t('cu_h') },
    { k: 'bud', kind: 'select', half: true, label: () => t('cu_bud'), opts: () => Object.keys(T.ar.bd).map(k => [k, T[S.lang].bd[k]]) }, { k: 'notes', kind: 'area', req: false, label: () => t('f_notes') }], t('f_send'), t('cu_ok'));
  return h('div', { class: 'wrap sec' }, head(t('cu_t'), t('cu_p'), null, null, 'h1'), h('div', { class: 'split', style: 'align-items:start' }, h('div', { class: 'stack' }, h('img', { src: IMG + 'workshop.webp', alt: '', width: 1024, height: 687 }), h('ol', { class: 'steps', style: 'list-style:none;padding:0' }, [1, 2, 3].map(i => h('li', null, h('div', null, h('b', { text: t('cus' + i) }), h('span', { class: 'note', text: t('cus' + i + 'p') })))))), h('div', { class: 'box' }, f)));
}
function vShowrooms() {
  const f = mkForm([fName, fPhone, { k: 'sr', kind: 'select', label: () => t('sr_which'), opts: () => SHOWROOMS.map(s => [s.id, pick(s)]) }, { k: 'date', kind: 'date', half: true, min: isoDay(1), max: isoDay(60), label: () => t('sr_date') }, { k: 'slot', kind: 'select', half: true, label: () => t('sr_slot'), opts: () => Object.keys(T.ar.slots).map(k => [k, T[S.lang].slots[k]]) }], t('sr_book'), t('sr_ok'));
  return h('div', { class: 'wrap sec' }, head(t('sr_t'), t('sr_p'), null, null, 'h1'), h('div', { class: 'split', style: 'align-items:start' }, h('div', { class: 'stack' }, SHOWROOMS.map(s => h('div', { class: 'box stack' }, h('h2', { class: 'hd-f', style: 'font-size:1.2rem', text: pick(s) }), h('p', { class: 'note' }, ic('pin'), ' ', pick({ ar: s.adr[0], en: s.adr[1] })), h('p', { class: 'note', text: t('sr_hours') })))), h('div', { class: 'box' }, f)));
}
function vDelivery() {
  return h('div', { class: 'wrap sec' }, head(t('d_t'), t('d_p'), null, null, 'h1'),
    h('div', { class: 'stack' },
      h('div', { class: 'tw', tabindex: '0', role: 'region', 'aria-label': t('d_zone') }, h('table', { class: 'tbl' }, h('caption', { class: 'sr', text: t('d_zone') }), h('thead', null, h('tr', null, [t('d_zone'), t('d_fee'), t('d_eta')].map(x => h('th', { scope: 'col' }, x)))), h('tbody', null, ZONES.map(z => h('tr', null, h('th', { scope: 'row', text: pick(z) }), h('td', { text: price(z.fee) }), h('td', { text: `${z.days[0]}–${z.days[1]} ${t('days')}` })))))),
      h('div', { class: 'tw', tabindex: '0', role: 'region', 'aria-label': t('d_plan') }, h('table', { class: 'tbl' }, h('caption', { class: 'sr', text: t('d_plan') }), h('thead', null, h('tr', null, [t('d_plan'), t('d_pl'), t('d_rate'), t('c_fee')].map(x => h('th', { scope: 'col' }, x)))), h('tbody', null, PLANS.map((pl, i) => h('tr', null, h('th', { scope: 'row', text: `${i + 1}` }), h('td', { text: `${pl.m} ${t('c_months')}` }), h('td', { text: pl.apr ? pl.apr + '%' : t('c_none') }), h('td', { text: pl.fee ? pl.fee + '%' : '—' })))))),
      h('p', { class: 'note', text: t('c_note') }), h('h2', { class: 'hd-f', style: 'font-size:1.5rem', text: t('d_pol') }), faqList()));
}
function vSaved() { const items = [...S.saved].map(prod).filter(Boolean); CH = 'h2'; return h('div', { class: 'wrap sec' }, head(t('sv_t'), null, null, null, 'h1'), items.length ? h('div', { class: 'grid' }, items.map(pcard)) : h('div', { class: 'empty' }, h('p', { text: t('sv_empty') }))); }
function v404() { return h('div', { class: 'wrap sec' }, h('div', { class: 'empty' }, h('h1', { id: 'pt', tabindex: '-1', text: t('nf_t') }), h('p', { text: t('nf_p') }), h('a', { class: 'btn btn--p', style: 'margin-block-start:1rem', href: '#/' }, t('home')))); }

/* ---------- chrome ---------- */
function brandMark() { return sv('svg', { width: 30, height: 30, viewBox: '0 0 34 34', 'aria-hidden': 'true' }, sv('rect', { width: 34, height: 34, rx: 9, fill: 'var(--wal)' }), sv('path', { d: 'M9 25V9h4v6h4l5-6h5l-6 7 6 9h-5l-4-6h-4v6Z', fill: 'var(--brass)' })); }
function header() {
  const nav = h('nav', { class: 'nav', id: 'nav', 'aria-label': 'Main' }, [['#/rooms', t('n_rooms')], ['#/shop', t('n_shop')], ['#/custom', t('n_custom')], ['#/showrooms', t('n_show')], ['#/delivery', t('n_deliv')]].map(([href, l]) => h('a', { href, onclick: () => nav.classList.remove('open') }, l)));
  const mb = h('button', { class: 'ib menu-btn', type: 'button', 'aria-label': t('menu'), 'aria-expanded': 'false', 'aria-controls': 'nav' }, ic('menu')); mb.addEventListener('click', () => { const o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
  const lang = h('button', { class: 'ib', type: 'button', 'aria-label': 'Language' }, h('span', { style: 'font-size:.85rem;font-weight:500', text: t('lang') })); lang.addEventListener('click', () => setLang(S.lang === 'ar' ? 'en' : 'ar'));
  const th = h('button', { class: 'ib', type: 'button', 'aria-label': t('theme') }, ic(S.theme === 'dark' ? 'sun' : 'moon')); th.addEventListener('click', () => setTheme(S.theme === 'dark' ? 'light' : 'dark'));
  return [h('div', { class: 'ann', role: 'region', 'aria-label': t('ann') }, t('ann') + ' ', h('a', { href: '#/delivery' }, t('ann_l'))),
    h('header', { class: 'hd' }, h('div', { class: 'wrap hd__in' }, mb, h('a', { class: 'brand', href: '#/', 'aria-label': t('brand') + ' ' + t('brandSub') }, t('brand'), h('small', { text: t('brandSub') })), nav,
      h('div', { class: 'hd__act' }, h('a', { class: 'ib hide-xs', href: '#/shop', 'aria-label': t('n_shop') }, ic('search')), h('a', { class: 'ib', href: '#/saved', 'aria-label': t('saved') }, ic('heart'), h('span', { class: 'n', id: 'nsv', hidden: true })), h('a', { class: 'ib', href: '#/cart', 'aria-label': t('cart') }, ic('bag'), h('span', { class: 'n', id: 'ncr', hidden: true })), th, lang)))];
}
function footer() {
  return h('footer', { class: 'ft' }, h('div', { class: 'wrap' }, h('div', { class: 'ft__g' },
    h('div', null, h('div', { class: 'brand', style: 'margin-block-end:.6rem' }, t('brand')), h('p', { text: t('ft_about') })),
    h('div', null, h('h2', { text: t('ft_exp') }), h('a', { href: '#/rooms' }, t('n_rooms')), h('a', { href: '#/shop' }, t('n_shop')), h('a', { href: '#/custom' }, t('n_custom'))),
    h('div', null, h('h2', { text: t('ft_help') }), h('a', { href: '#/delivery' }, t('n_deliv')), h('a', { href: '#/showrooms' }, t('n_show')), h('a', { href: '#/cart' }, t('cart'))),
    h('div', null, h('h2', { text: t('ft_hot') }), h('a', { href: 'tel:' + HOT, 'aria-label': HOT.split('').join(' '), style: 'font-weight:600;font-size:1.3rem;color:var(--wal)' }, h('bdi', { dir: 'ltr' }, HOT)), h('p', { text: t('sr_hours') }))),
    h('div', { class: 'ft__b' }, `© 2026 ${t('brand')} ${t('brandSub')} · ${t('ft_rights')} · ${t('demo')} ${t('ft_img')}`)));
}
function updateBadges() { const s = document.getElementById('nsv'), c = document.getElementById('ncr'); if (s) { s.hidden = !S.saved.size; s.textContent = S.saved.size; } if (c) { c.hidden = !cartCount(); c.textContent = cartCount(); } }
function setLang(l) { S.lang = l; save('rk_lang', l); route(true); }
function setTheme(th) { S.theme = th; save('rk_theme', th); document.documentElement.dataset.theme = th; route(true); }

/* ---------- router ---------- */
const QK = ['q', 'cat', 'room', 'sort'];
function parseQ(qs) { const o = {}; (qs || '').split('&').forEach(kv => { const [k, v] = kv.split('='); if (!QK.includes(k) || v === undefined) return; try { o[k] = decodeURIComponent(v.replace(/\+/g, ' ')).slice(0, 40); } catch (e) { /* ignore malformed */ } }); return o; }
let first = true;
function route(keep) {
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.dataset.theme = S.theme; openHs = null;
  const raw = location.hash.replace(/^#\/?/, ''), [path, qs] = raw.split('?'), seg = path.split('/').filter(Boolean), q = parseQ(qs);
  CH = seg[0] === undefined ? 'h3' : 'h2'; let view;
  document.title = `${t('brand')} ${t('brandSub')} — ${S.lang === 'ar' ? 'أثاث مصري بخشب صلب' : 'Solid-wood Egyptian furniture'}`;
  switch (seg[0]) {
    case undefined: view = vHome(); break; case 'rooms': view = vRooms(); break; case 'room': view = vRoom(seg[1]); break; case 'shop': view = vShop(q); break; case 'p': view = vProduct(seg[1]); break;
    case 'cart': view = vCart(); break; case 'custom': view = vCustom(); break; case 'showrooms': view = vShowrooms(); break; case 'delivery': view = vDelivery(); break; case 'saved': view = vSaved(); break; default: view = v404();
  }
  const titles = { rooms: 'n_rooms', shop: 'n_shop', cart: 'c_t', custom: 'cu_t', showrooms: 'sr_t', delivery: 'd_t', saved: 'sv_t' }; if (titles[seg[0]]) document.title = `${t(titles[seg[0]])} | ${t('brand')} ${t('brandSub')}`;
  document.getElementById('app').replaceChildren(h('a', { class: 'skip', href: '#main', onclick: (e) => { e.preventDefault(); document.getElementById('main').focus(); } }, t('skip')), ...header(), h('main', { id: 'main', tabindex: '-1' }, view), footer());
  updateBadges();
  document.querySelectorAll('.nav a').forEach(a => { if (a.getAttribute('href') === '#/' + seg[0]) a.setAttribute('aria-current', 'page'); });
  if (!keep && !first) { window.scrollTo(0, 0); const pt = document.getElementById('pt'); if (pt) pt.focus({ preventScroll: true }); }
  first = false; reveal();
}
function reveal() {
  const els = [...document.querySelectorAll('main .trust li,main .tile,main .pc,main .box,main .sh,main .split>*,main .cfg>*,main details,main .stage')];
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  els.forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', ((i % 4) * 80) + 'ms'); io.observe(el); });
}
window.addEventListener('hashchange', () => route());
route();
})();
