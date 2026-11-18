/* Meftah Properties — static demo SPA. All dynamic text goes through textContent (no HTML injection). */
(() => {
'use strict';
const { A, DEV, P, L, AGENTS } = window.D;
const IMG = 'img/';
const HOT = '15550';

/* ---------- i18n ---------- */
const T = {
  ar: {
    brand: 'مفتاح', brandSub: 'العقارية', skip: 'تخطي إلى المحتوى', nav_buy: 'شراء', nav_rent: 'إيجار', nav_new: 'مشروعات جديدة', nav_dev: 'المطورون', nav_price: 'دليل الأسعار', nav_calc: 'حاسبة التقسيط',
    list_cta: 'أضف عقارك', saved: 'المفضلة', compare: 'مقارنة', menu: 'القائمة', theme: 'تبديل المظهر', lang: 'English',
    h_title: 'ابحث عن بيتك الجاي بخطة سداد واضحة', h_lead: 'وحدات جاهزة وتحت الإنشاء من مطورين موثّقين، بأسعار المتر وخطط التقسيط قدّامك قبل ما تتصل.',
    sale: 'شراء', rent: 'إيجار', launches: 'إطلاقات جديدة', where: 'المنطقة', any_area: 'كل المناطق', type: 'نوع العقار', any_type: 'كل الأنواع', budget: 'الميزانية', any_budget: 'أي ميزانية', beds: 'غرف النوم', any: 'الكل', search: 'ابحث',
    st_listings: 'وحدة معروضة', st_projects: 'مشروع', st_dev: 'مطوّر موثّق', st_ver: 'إعلانات تمت مراجعتها',
    s_areas: 'الأسعار حسب المنطقة', s_areas_p: 'متوسط سعر المتر وتغيّره خلال 12 شهر', per_m: 'للمتر', yoy: 'خلال سنة',
    s_new: 'مشروعات تحت الإطلاق', s_new_p: 'مقدّم يبدأ من 5% وتقسيط حتى 10 سنوات', s_feat: 'وحدات مميزة', s_feat_p: 'اخترناها حسب السعر والموقع وخطة السداد', all: 'عرض الكل',
    s_tools: 'أدوات تساعدك تقرر', tool_calc: 'حاسبة التقسيط والتمويل', tool_calc_p: 'اعرف القسط الشهري قبل ما تزور المعرض.', tool_cmp: 'قارن بين الوحدات', tool_cmp_p: 'حتى 3 وحدات جنب بعض: السعر والمتر والتشطيب والتسليم.', tool_price: 'دليل أسعار المتر', tool_price_p: 'اتجاه الأسعار في 7 مناطق رئيسية.', tool_list: 'اعرض عقارك', tool_list_p: 'سجّل بياناتك ومستشارنا يتواصل معاك.',
    s_dev: 'مطورون موثّقون', s_dev_p: 'نراجع السجل التجاري وتاريخ التسليم قبل النشر', since: 'منذ', projects: 'مشروعات',
    s_why: 'ليه مفتاح؟', w1: 'إعلانات مراجَعة', w1p: 'كل وحدة بتتراجع بياناتها وصورها قبل النشر.', w2: 'أسعار شفافة', w2p: 'سعر المتر والمقدّم والقسط ظاهرين من أول صفحة.', w3: 'معاينة منظّمة', w3p: 'حجز موعد معاينة بدون التزام وبمرافق من فريقنا.', w4: 'مراجعة العقد', w4p: 'نوجّهك للخطوات الصحيحة قبل التعاقد والتسجيل.',
    s_agents: 'مستشارو المبيعات', s_agents_p: 'ردّ خلال ساعة في أوقات العمل', deals: 'صفقة', lic: 'ترخيص',
    s_faq: 'أسئلة شائعة', cta_t: 'عندك عقار للبيع أو الإيجار؟', cta_p: 'سجّل بياناتك وهنراجعها ونتواصل معاك خلال 24 ساعة.',
    f_filters: 'الفلاتر', f_reset: 'مسح الفلاتر', f_price_min: 'أقل سعر', f_price_max: 'أعلى سعر', f_fin: 'التشطيب', f_status: 'الحالة', f_sort: 'ترتيب', f_apply: 'عرض النتائج', f_close: 'إغلاق',
    any_fin: 'أي تشطيب', full: 'كامل التشطيب', semi: 'نصف تشطيب', core: 'على الطوب', any_st: 'جاهز وتحت الإنشاء', ready: 'جاهز للتسليم', off: 'تحت الإنشاء',
    sort_new: 'الأحدث', sort_pl: 'السعر: الأقل', sort_ph: 'السعر: الأعلى', sort_m2: 'المساحة: الأكبر',
    results: 'نتيجة', no_res: 'مفيش وحدات بالمواصفات دي.', no_res_p: 'جرّب توسّع الميزانية أو تشيل فلتر.', list_v: 'قائمة', map_v: 'خريطة', map_note: 'خريطة تقريبية للمناطق الرئيسية',
    new_t: 'جديد', ready_t: 'جاهز', verified: 'موثّق', fav: 'أضف للمفضلة', unfav: 'احذف من المفضلة', cmp_add: 'قارن',
    sqm: 'م²', bed: 'غرف', bath: 'حمام', floor: 'الدور', ground: 'أرضي', dl: 'التسليم', down: 'مقدّم', yrs: 'سنوات', month: 'شهرياً', per_month: '/ شهر', egp: 'ج.م', mil: 'مليون', from: 'يبدأ من',
    v_overview: 'نظرة عامة', v_desc: 'الوصف', v_plan: 'خطط السداد', v_am: 'المرافق والمميزات', v_loc: 'الموقع', v_sim: 'وحدات مشابهة', v_contact: 'اطلب معاينة أو تفاصيل', v_name: 'الاسم', v_phone: 'رقم الموبايل', v_msg: 'رسالة (اختياري)', v_send: 'إرسال الطلب', v_call: 'اتصل', v_wa: 'واتساب',
    e_name: 'اكتب اسمك', e_phone: 'اكتب رقم موبايل مصري صحيح', ok_send: 'وصل طلبك. هيتواصل معاك المستشار قريباً. (عرض تجريبي: لم يُرسل أي بيان فعلياً)', demo_note: 'هذا عرض تصميم: الشركات والأسعار والعقارات افتراضية.',
    plan_down: 'المقدّم', plan_inst: 'القسط الشهري', plan_total: 'الإجمالي', cash: 'سعر الكاش', ready_note: 'وحدة جاهزة: الدفع كاش أو بتمويل بنكي. جرّب الحاسبة.', try_calc: 'افتح الحاسبة',
    p_all: 'كل المشروعات', p_land: 'المساحة (فدان)', p_green: 'مساحات خضراء', p_units: 'وحدة', p_types: 'أنواع الوحدات', p_units_in: 'وحدات متاحة في المشروع', p_reg: 'سجّل اهتمامك', p_by: 'من تطوير', p_deliv: 'موعد التسليم',
    dv_all: 'كل المطورين', dv_about: 'نبذة', price_t: 'دليل أسعار المتر', price_p: 'متوسط سعر المتر للوحدات السكنية وتغيّره آخر 12 شهر. بيانات توضيحية.', th_area: 'المنطقة', th_ppsm: 'سعر المتر', th_chg: 'التغيّر', th_tr: 'آخر 12 شهر', th_n: 'وحدات متاحة',
    calc_t: 'حاسبة التقسيط والتمويل', calc_p: 'أرقام تقديرية للمقارنة فقط، وليست عرضاً من جهة تمويل.', c_price: 'سعر الوحدة', c_down: 'المقدّم', c_years: 'مدة السداد', c_mode: 'نوع السداد', c_dev: 'تقسيط المطوّر (بدون فوائد)', c_bank: 'تمويل بنكي', c_rate: 'سعر الفائدة السنوي', c_monthly: 'القسط الشهري', c_dpay: 'المقدّم المطلوب', c_fin: 'المبلغ الممول', c_int: 'إجمالي الفوائد', c_tot: 'إجمالي ما تدفعه',
    cmp_t: 'مقارنة الوحدات', cmp_empty: 'اختر وحدتين أو أكثر من نتائج البحث بزر "قارن".', cmp_go: 'قارن الآن', cmp_sel: 'وحدات مختارة', cmp_max: 'الحد الأقصى 3 وحدات للمقارنة', cmp_rm: 'إزالة', cmp_clear: 'مسح',
    sv_t: 'وحداتك المفضلة', sv_empty: 'لسه مفيش مفضلة. اضغط على القلب في أي وحدة.', ls_t: 'أضف عقارك مع مفتاح', ls_p: 'سجّل بيانات الوحدة وهنراجعها ونتواصل معاك خلال 24 ساعة.', ls_price: 'السعر المطلوب (ج.م)', ls_m2: 'المساحة (م²)', ls_ok: 'استلمنا بيانات عقارك. هنراجعها ونتواصل معاك. (عرض تجريبي)',
    nf_t: 'الصفحة غير موجودة', nf_p: 'الرابط ده مش موجود. ارجع للرئيسية أو ابحث عن وحدة.', home: 'الرئيسية', toast_fav: 'اتضافت للمفضلة', toast_unfav: 'اتشالت من المفضلة',
    ft_about: 'مفتاح العقارية منصة افتراضية لعرض التصميم. جميع الأسماء والأسعار للتجربة فقط.', ft_hot: 'الخط الساخن', ft_exp: 'استكشف', ft_co: 'الشركة', ft_rights: 'جميع الحقوق محفوظة', ft_help: 'مساعدة',
    t: { apartment: 'شقة', villa: 'فيلا', townhouse: 'تاون هاوس', chalet: 'شاليه', duplex: 'دوبلكس', office: 'مكتب إداري' },
    am: { garden: 'حديقة خاصة', pool: 'حمام سباحة', parking: 'جراج', security: 'أمن 24 ساعة', smart: 'نظام منزل ذكي', gym: 'نادي رياضي', balcony: 'بلكونة', beach: 'شاطئ خاص', elevator: 'مصعد', lagoon: 'لاجون', clubhouse: 'نادي اجتماعي', kids: 'منطقة أطفال', retail: 'منطقة تجارية', park: 'حديقة مركزية' },
    faq: [['إيه الفرق بين العقد الابتدائي والتسجيل؟', 'العقد الابتدائي اتفاق بين الطرفين، أما التسجيل في الشهر العقاري فبينقل الملكية رسمياً. اطلب من المحامي مراجعة العقد قبل الدفع. دي معلومة عامة وليست استشارة قانونية.'],
      ['هل المقدّم ممكن يتقسّط؟', 'بعض المطورين بيقسّطوا جزء من المقدّم حسب الخطة. كل مشروع له شروطه ويظهر ذلك في صفحته.'],
      ['إزاي أتأكد من موعد التسليم؟', 'بنعرض موعد التسليم المعلن من المطوّر وتاريخ تسليماته السابقة في صفحة المطوّر. اطلب دائماً جدولاً زمنياً مكتوباً.'],
      ['هل أقدر أعاين الوحدة قبل الشراء؟', 'أكيد. اطلب المعاينة من صفحة الوحدة وهيرتّب لك المستشار موعد ويصاحبك في الزيارة.']]
  },
  en: {
    brand: 'Meftah', brandSub: 'PROPERTIES', skip: 'Skip to content', nav_buy: 'Buy', nav_rent: 'Rent', nav_new: 'New projects', nav_dev: 'Developers', nav_price: 'Price guide', nav_calc: 'Installment calculator',
    list_cta: 'List a property', saved: 'Saved', compare: 'Compare', menu: 'Menu', theme: 'Toggle theme', lang: 'العربية',
    h_title: 'Find your next home with a payment plan you can read', h_lead: 'Ready and off-plan homes from verified developers, with price per m² and installment plans shown before you call.',
    sale: 'Buy', rent: 'Rent', launches: 'New launches', where: 'Location', any_area: 'All areas', type: 'Property type', any_type: 'All types', budget: 'Budget', any_budget: 'Any budget', beds: 'Bedrooms', any: 'Any', search: 'Search',
    st_listings: 'listed units', st_projects: 'projects', st_dev: 'verified developers', st_ver: 'reviewed listings',
    s_areas: 'Prices by area', s_areas_p: 'Average price per m² and its 12-month change', per_m: 'per m²', yoy: 'YoY',
    s_new: 'New project launches', s_new_p: 'Down payment from 5% and up to 10 years to pay', s_feat: 'Featured homes', s_feat_p: 'Picked for price, location and payment plan', all: 'View all',
    s_tools: 'Tools to help you decide', tool_calc: 'Installment & mortgage calculator', tool_calc_p: 'Know your monthly payment before the showroom visit.', tool_cmp: 'Compare units', tool_cmp_p: 'Up to 3 units side by side: price, size, finishing, delivery.', tool_price: 'Price-per-m² guide', tool_price_p: 'Price direction across 7 key areas.', tool_list: 'List your property', tool_list_p: 'Register your details and an advisor will call you.',
    s_dev: 'Verified developers', s_dev_p: 'We check the commercial register and delivery history before publishing', since: 'Since', projects: 'projects',
    s_why: 'Why Meftah?', w1: 'Reviewed listings', w1p: 'Every unit has its data and photos reviewed before it goes live.', w2: 'Transparent pricing', w2p: 'Price per m², down payment and installment shown up front.', w3: 'Organised viewings', w3p: 'Book a no-obligation viewing with one of our team.', w4: 'Contract guidance', w4p: 'We point you to the right steps before you sign and register.',
    s_agents: 'Sales advisors', s_agents_p: 'Replies within an hour during working hours', deals: 'deals', lic: 'Licence',
    s_faq: 'Common questions', cta_t: 'Own a property to sell or rent?', cta_p: 'Share your details and we will review them and reply within 24 hours.',
    f_filters: 'Filters', f_reset: 'Clear filters', f_price_min: 'Min price', f_price_max: 'Max price', f_fin: 'Finishing', f_status: 'Status', f_sort: 'Sort', f_apply: 'Show results', f_close: 'Close',
    any_fin: 'Any finishing', full: 'Fully finished', semi: 'Semi-finished', core: 'Core & shell', any_st: 'Ready and off-plan', ready: 'Ready to move', off: 'Off-plan',
    sort_new: 'Newest', sort_pl: 'Price: low to high', sort_ph: 'Price: high to low', sort_m2: 'Size: largest',
    results: 'results', no_res: 'No units match these filters.', no_res_p: 'Try widening the budget or removing a filter.', list_v: 'List', map_v: 'Map', map_note: 'Approximate map of key areas',
    new_t: 'New', ready_t: 'Ready', verified: 'Verified', fav: 'Save', unfav: 'Remove from saved', cmp_add: 'Compare',
    sqm: 'm²', bed: 'beds', bath: 'baths', floor: 'Floor', ground: 'Ground', dl: 'Delivery', down: 'Down', yrs: 'years', month: 'monthly', per_month: '/ month', egp: 'EGP', mil: 'M', from: 'From',
    v_overview: 'Overview', v_desc: 'Description', v_plan: 'Payment plans', v_am: 'Amenities & features', v_loc: 'Location', v_sim: 'Similar units', v_contact: 'Request a viewing or details', v_name: 'Name', v_phone: 'Mobile number', v_msg: 'Message (optional)', v_send: 'Send request', v_call: 'Call', v_wa: 'WhatsApp',
    e_name: 'Enter your name', e_phone: 'Enter a valid Egyptian mobile number', ok_send: 'Request received. An advisor will contact you soon. (Design demo: nothing was actually sent)', demo_note: 'Design demo: companies, prices and listings are fictional.',
    plan_down: 'Down payment', plan_inst: 'Monthly installment', plan_total: 'Total', cash: 'Cash price', ready_note: 'Ready unit: pay cash or with a bank mortgage. Try the calculator.', try_calc: 'Open calculator',
    p_all: 'All projects', p_land: 'Land (feddans)', p_green: 'Green space', p_units: 'units', p_types: 'Unit types', p_units_in: 'Units available in this project', p_reg: 'Register interest', p_by: 'By', p_deliv: 'Delivery',
    dv_all: 'All developers', dv_about: 'About', price_t: 'Price-per-m² guide', price_p: 'Average residential price per m² and 12-month change. Illustrative data.', th_area: 'Area', th_ppsm: 'Price / m²', th_chg: 'Change', th_tr: 'Last 12 months', th_n: 'Units available',
    calc_t: 'Installment & mortgage calculator', calc_p: 'Estimates for comparison only, not an offer from a lender.', c_price: 'Unit price', c_down: 'Down payment', c_years: 'Payment period', c_mode: 'Payment type', c_dev: 'Developer plan (no interest)', c_bank: 'Bank mortgage', c_rate: 'Annual interest rate', c_monthly: 'Monthly payment', c_dpay: 'Down payment due', c_fin: 'Financed amount', c_int: 'Total interest', c_tot: 'Total you pay',
    cmp_t: 'Compare units', cmp_empty: 'Pick two or more units from the search results with the Compare button.', cmp_go: 'Compare now', cmp_sel: 'units selected', cmp_max: 'You can compare up to 3 units', cmp_rm: 'Remove', cmp_clear: 'Clear',
    sv_t: 'Your saved units', sv_empty: 'Nothing saved yet. Tap the heart on any unit.', ls_t: 'List your property with Meftah', ls_p: 'Share the unit details; we will review and reply within 24 hours.', ls_price: 'Asking price (EGP)', ls_m2: 'Size (m²)', ls_ok: 'We received your property details and will contact you. (Design demo)',
    nf_t: 'Page not found', nf_p: 'This link does not exist. Go home or search for a unit.', home: 'Home', toast_fav: 'Saved', toast_unfav: 'Removed from saved',
    ft_about: 'Meftah Properties is a fictional platform used to present a design. All names and prices are for demonstration.', ft_hot: 'Hotline', ft_exp: 'Explore', ft_co: 'Company', ft_rights: 'All rights reserved', ft_help: 'Help',
    t: { apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse', chalet: 'Chalet', duplex: 'Duplex', office: 'Office' },
    am: { garden: 'Private garden', pool: 'Swimming pool', parking: 'Parking', security: '24/7 security', smart: 'Smart home', gym: 'Gym', balcony: 'Balcony', beach: 'Private beach', elevator: 'Elevator', lagoon: 'Lagoon', clubhouse: 'Clubhouse', kids: 'Kids area', retail: 'Retail area', park: 'Central park' },
    faq: [['What is the difference between a preliminary contract and registration?', 'A preliminary contract is an agreement between the parties; registration with the Real Estate Registry formally transfers ownership. Have a lawyer review the contract before paying. This is general information, not legal advice.'],
      ['Can the down payment be paid in instalments?', 'Some developers split part of the down payment depending on the plan. Each project lists its own terms.'],
      ['How do I check the delivery date?', 'We show the developer’s announced date and past deliveries on its page. Always ask for a written timeline.'],
      ['Can I view the unit before buying?', 'Yes. Request a viewing from the unit page and an advisor will arrange a time and join you.']]
  }
};
const DAYS = { ar: ['اليوم', 'منذ'], en: ['Today', 'ago'] };

/* ---------- state ---------- */
const S = { lang: 'ar', theme: 'light', saved: new Set(), cmp: [] };
const ids = new Set(L.map(l => l.id));
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
(() => {
  const l = load('mf_lang'); S.lang = l === 'en' ? 'en' : 'ar';
  const th = load('mf_theme'); S.theme = th === 'dark' || th === 'light' ? th : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const sv = load('mf_saved'); if (Array.isArray(sv)) sv.forEach(i => ids.has(i) && S.saved.add(i));
})();
const t = (k) => { const v = T[S.lang][k]; return v === undefined ? k : v; };
const pick = (o) => o[S.lang];
const nf = () => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: 0 });
const num = (n) => nf().format(Math.round(n));
const dec1 = (n) => (Math.round(n * 10) / 10).toString();
const money = (v) => {
  if (v >= 1e6) { const m = Math.round(v / 1e4) / 100; return `${m} ${t('mil')}`; }
  return num(v);
};
const price = (v) => `${money(v)} ${t('egp')}`;
const area = (id) => A.find(a => a.id === id);
const proj = (id) => P.find(p => p.id === id);
const dev = (id) => DEV.find(d => d.id === id);
const imgOf = (l) => IMG + ((l.p && proj(l.p)) ? proj(l.p).img : area(l.a).img) + '.webp';

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
let CH = 'h3'; // card heading level: h3 under section h2, h2 directly under the page h1
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
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>', scale: '<path d="M12 4v16M5 20h14M5 8h14M5 8l-3 7a3 3 0 0 0 6 0L5 8Zm14 0-3 7a3 3 0 0 0 6 0l-3-7Z"/>',
  bed: '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>', bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>', ruler: '<path d="m4 16 12-12 4 4L8 20l-4-4Zm4-4 2 2m1-5 2 2m-7 1 2 2"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>', phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>', chat: '<path d="M4 5h16v11H9l-5 4V5Z"/>',
  check: '<path d="m5 12 5 5 9-10"/>', shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4"/>', chart: '<path d="M4 20V4m0 16h16M8 16l4-5 3 3 5-7"/>', calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2m4 0h2M8 16h2m4 0h2"/>',
  building: '<path d="M5 21V5l9-2v18M14 8h5v13M8 8h2m-2 4h2m-2 4h2M4 21h16"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>', filter: '<path d="M4 6h16M7 12h10M10 18h4"/>', map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14m6-12v14"/>', list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4m8-4v4M4 10h16"/>', key: '<circle cx="8" cy="14" r="4"/><path d="m11 11 8-8m-3 3 3 3"/>', home: '<path d="M4 11 12 4l8 7v9H4v-9Zm6 9v-5h4v5"/>', star: '<path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8L12 4Z"/>'
};
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // ICON values are constants defined above

/* ---------- toast ---------- */
let toastT;
function toast(msg) { let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); } e.textContent = msg; e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 2200); }

/* ---------- shared parts ---------- */
function spark(tr, w = 120, ht = 36) {
  const mn = Math.min(...tr), mx = Math.max(...tr), st = w / (tr.length - 1);
  const pts = tr.map((v, i) => [i * st, ht - 3 - ((v - mn) / (mx - mn || 1)) * (ht - 8)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
  return sv('svg', { class: 'spark', viewBox: `0 0 ${w} ${ht}`, preserveAspectRatio: 'none', 'aria-hidden': 'true' }, sv('path', { class: 'f', d: d + `L${w} ${ht}L0 ${ht}Z` }), sv('path', { d }));
}
function favBtn(id) {
  const b = h('button', { class: 'round', type: 'button', 'aria-pressed': String(S.saved.has(id)), 'aria-label': S.saved.has(id) ? t('unfav') : t('fav') }, ic('heart'));
  b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleSave(id); b.setAttribute('aria-pressed', String(S.saved.has(id))); b.setAttribute('aria-label', S.saved.has(id) ? t('unfav') : t('fav')); toast(S.saved.has(id) ? t('toast_fav') : t('toast_unfav')); });
  return h('div', { class: 'card__act' }, b);
}
function toggleSave(id) { S.saved.has(id) ? S.saved.delete(id) : S.saved.add(id); save('mf_saved', [...S.saved]); updateBadges(); }
function toggleCmp(id, box) {
  const i = S.cmp.indexOf(id);
  if (i >= 0) S.cmp.splice(i, 1); else if (S.cmp.length >= 3) { if (box) box.checked = false; toast(t('cmp_max')); } else S.cmp.push(id);
  updateBadges(); renderCmpBar();
}
function planText(l) {
  if (l.pu === 'r') return null;
  if (l.st === 'ready') return null;
  const monthly = (l.price * (1 - l.down / 100)) / (l.yrs * 12);
  return [`${t('down')} ${l.down}%`, `${num(monthly)} ${t('egp')} ${t('per_month')} · ${l.yrs} ${t('yrs')}`];
}
function listingCard(l) {
  const a = area(l.a), pl = planText(l);
  const cmpBox = h('input', { type: 'checkbox', id: 'c-' + l.id, 'aria-label': t('cmp_add') + ': ' + pick({ ar: l.ti[0], en: l.ti[1] }) });
  cmpBox.checked = S.cmp.includes(l.id); cmpBox.addEventListener('change', () => toggleCmp(l.id, cmpBox));
  return h('article', { class: 'card' },
    h('div', { class: 'card__m' }, h('img', { src: imgOf(l), alt: '', loading: 'lazy', width: 900, height: 604, style: l.id.charCodeAt(1) % 2 ? 'object-position:30% 50%' : 'object-position:70% 50%' }),
      h('div', { class: 'tags' }, l.days <= 3 ? h('span', { class: 'tag tag--cu' }, t('new_t')) : null, l.st === 'ready' ? h('span', { class: 'tag tag--ok' }, t('ready_t')) : null, h('span', { class: 'tag' }, ic('check'), t('verified'))), favBtn(l.id)),
    h('div', { class: 'card__b' },
      h('div', { class: 'price' }, l.pu === 'r' ? [num(l.price), ' ', h('small', null, `${t('egp')} ${t('per_month')}`)] : [price(l.price)]),
      h(CH, { class: 'card__t' }, h('a', { href: '#/p/' + l.id }, pick({ ar: l.ti[0], en: l.ti[1] }))),
      h('div', { class: 'card__loc' }, ic('pin'), pick(a), l.p ? ' · ' + pick(proj(l.p)) : ''),
      h('div', { class: 'facts' }, h('span', null, ic('ruler'), `${num(l.m2)} ${t('sqm')}`), l.bd ? h('span', null, ic('bed'), `${l.bd} ${t('bed')}`) : null, h('span', null, ic('bath'), `${l.ba} ${t('bath')}`), h('span', null, pick(T.ar.t === undefined ? {} : { ar: T.ar.t[l.ty], en: T.en.t[l.ty] }))),
      pl ? h('div', { class: 'plan' }, h('b', null, pl[0]), h('span', null, pl[1])) : null,
      h('div', { class: 'card__f' }, h('span', null, l.st === 'off' ? `${t('dl')} ${l.dl}` : (S.lang === 'ar' ? 'جاهز للمعاينة' : 'Ready to view')), h('label', null, cmpBox, t('cmp_add')))));
}
function projectCard(p) {
  const d = dev(p.d), a = area(p.a);
  return h('article', { class: 'card proj' },
    h('div', { class: 'card__m' }, h('img', { src: IMG + p.img + '.webp', alt: '', loading: 'lazy', width: 900, height: 604 }), h('div', { class: 'tags' }, h('span', { class: 'tag tag--cu' }, `${t('dl')} ${p.dl}`))),
    h('div', { class: 'card__b' },
      h(CH, { class: 'card__t' }, h('a', { href: '#/project/' + p.id }, pick(p))),
      h('div', { class: 'dev' }, t('p_by') + ' ' + pick(d)),
      h('div', { class: 'card__loc' }, ic('pin'), pick(a)),
      h('div', { class: 'price' }, h('small', null, t('from') + ' '), price(p.from)),
      h('div', { class: 'plan' }, h('b', null, `${t('down')} ${p.down}%`), h('span', null, `${p.yrs} ${t('yrs')}`)),
      h('div', { class: 'chips' }, p.types.map(x => h('span', { class: 'chip' }, T[S.lang].t[x])))));
}
function sectionHead(title, sub, linkHref, linkText) {
  return h('div', { class: 'sh' }, h('div', null, h('h2', { text: title }), sub ? h('p', { text: sub }) : null), linkHref ? h('a', { class: 'link', href: linkHref }, linkText || t('all'), ic('arrow', 'flip')) : null);
}
function contactForm(subject, kind) {
  const id = 'f' + Math.random().toString(36).slice(2, 7);
  const name = h('input', { class: 'in', id: id + 'n', name: 'name', autocomplete: 'name', required: true, maxlength: 60 });
  const phone = h('input', { class: 'in', id: id + 'p', name: 'phone', type: 'tel', inputmode: 'tel', autocomplete: 'tel', required: true, maxlength: 16, dir: 'ltr' });
  const msg = h('textarea', { class: 'in', id: id + 'm', name: 'message', rows: 3, maxlength: 400 });
  const hp = h('input', { class: 'hp', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' });
  const en = h('div', { class: 'err', id: id + 'en' }), ep = h('div', { class: 'err', id: id + 'ep' });
  const box = h('div', { 'aria-live': 'polite' });
  const form = h('form', { class: 'form', novalidate: true },
    h('div', { class: 'fld' }, h('label', { for: id + 'n' }, t('v_name')), name, en),
    h('div', { class: 'fld' }, h('label', { for: id + 'p' }, t('v_phone')), phone, ep),
    h('div', { class: 'fld' }, h('label', { for: id + 'm' }, t('v_msg')), msg), hp,
    h('button', { class: 'btn btn--cu btn--b', type: 'submit' }, kind === 'reg' ? t('p_reg') : t('v_send')), h('p', { class: 'note' }, t('demo_note')), box);
  form.addEventListener('submit', (e) => {
    e.preventDefault(); en.textContent = ''; ep.textContent = ''; let ok = true;
    if (hp.value) return; // honeypot
    if (name.value.trim().length < 2) { en.textContent = t('e_name'); ok = false; }
    if (!/^(\+?20|0)?1[0125]\d{8}$/.test(phone.value.replace(/[\s-]/g, ''))) { ep.textContent = t('e_phone'); ok = false; }
    if (!ok) { (en.textContent ? name : phone).focus(); return; }
    box.replaceChildren(h('div', { class: 'okmsg' }, t('ok_send'))); form.querySelectorAll('input,textarea,button').forEach(x => { x.disabled = true; });
  });
  return form;
}

/* ---------- views ---------- */
const BUDGET = { s: [3e6, 6e6, 1e7, 2e7], r: [25000, 50000, 100000] };
function selectEl(id, opts, val) { const s = h('select', { class: 'in', id, name: id }); opts.forEach(([v, l]) => s.append(h('option', { value: v, selected: String(v) === String(val) }, l))); return s; }
const typeOpts = () => [['', t('any_type')], ...Object.keys(T.ar.t).map(k => [k, T[S.lang].t[k]])];
const areaOpts = () => [['', t('any_area')], ...A.map(a => [a.id, pick(a)])];

function vHome() {
  let mode = 's';
  const f = {};
  const tabs = h('div', { class: 'tabs', role: 'tablist' });
  const row = h('div', { class: 'sb__row' });
  const build = () => {
    tabs.replaceChildren(...[['s', t('sale')], ['r', t('rent')], ['n', t('launches')]].map(([k, l]) => {
      const b = h('button', { type: 'button', role: 'tab', 'aria-selected': String(mode === k) }, l); b.addEventListener('click', () => { mode = k; build(); }); return b;
    }));
    const bud = mode === 'n' ? null : selectEl('hb', [['', t('any_budget')], ...BUDGET[mode].map(v => [v, `${t('egp')} ≤ ${money(v)}`])]);
    f.a = selectEl('ha', areaOpts()); f.ty = mode === 'n' ? null : selectEl('ht', typeOpts()); f.b = bud;
    f.bd = mode === 'n' ? null : selectEl('hbd', [['', t('any')], ['1', '1+'], ['2', '2+'], ['3', '3+'], ['4', '4+']]);
    const fld = (id, label, el) => h('div', { class: 'fld' }, h('label', { for: id }, label), el);
    row.replaceChildren(fld('ha', t('where'), f.a), f.ty ? fld('ht', t('type'), f.ty) : h('div'), f.b ? fld('hb', t('budget'), f.b) : h('div'), f.bd ? fld('hbd', t('beds'), f.bd) : h('div'), h('button', { class: 'btn btn--cu', type: 'submit' }, ic('search'), t('search')));
  };
  build();
  const form = h('form', { class: 'sb', role: 'search', onsubmit: (e) => {
    e.preventDefault(); const q = new URLSearchParams();
    if (mode === 'n') { if (f.a.value) q.set('a', f.a.value); location.hash = '#/projects' + (q.toString() ? '?' + q : ''); return; }
    q.set('pu', mode); if (f.a.value) q.set('a', f.a.value); if (f.ty.value) q.set('ty', f.ty.value); if (f.b.value) q.set('max', f.b.value); if (f.bd.value) q.set('bd', f.bd.value);
    location.hash = '#/search?' + q;
  } }, tabs, row);
  const fresh = [...L].filter(l => l.pu === 's').sort((x, y) => x.days - y.days).slice(0, 6);
  return [
    h('section', { class: 'hero' }, h('div', { class: 'hero__img' }, h('img', { src: IMG + 'hero.webp', alt: '', width: 1024, height: 572, fetchpriority: 'high' })),
      h('div', { class: 'wrap hero__in' }, h('h1', { id: 'pt', tabindex: '-1', text: t('h_title') }), h('p', { class: 'lead', text: t('h_lead') }), form,
        h('div', { class: 'stat-row' }, [[L.length, t('st_listings')], [P.length, t('st_projects')], [DEV.length, t('st_dev')], ['100%', t('st_ver')]].map(([n, l]) => h('div', null, h('b', null, typeof n === 'number' ? num(n) : n), h('span', null, l)))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sectionHead(t('s_areas'), t('s_areas_p'), '#/prices'),
      h('div', { class: 'grid grid--4 areas' }, A.map(a => h('article', { class: 'card area' }, h('strong', null, h('a', { href: '#/search?pu=s&a=' + a.id }, pick(a))), h('div', { class: 'pp' }, num(a.ppsm), ' ', h('small', null, `${t('egp')} / ${t('sqm')}`)), spark(a.tr), h('div', { class: 'up' }, `▲ ${dec1(a.chg)}% ${t('yoy')}`)))))),
    h('section', { class: 'sec sec--alt' }, h('div', { class: 'wrap' }, sectionHead(t('s_new'), t('s_new_p'), '#/projects'), h('div', { class: 'grid' }, P.slice(0, 3).map(projectCard)))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sectionHead(t('s_feat'), t('s_feat_p'), '#/search?pu=s'), h('div', { class: 'grid' }, fresh.map(listingCard)))),
    h('section', { class: 'sec sec--alt' }, h('div', { class: 'wrap' }, sectionHead(t('s_tools')), h('div', { class: 'grid grid--4' }, [['calc', t('tool_calc'), t('tool_calc_p'), '#/calc'], ['scale', t('tool_cmp'), t('tool_cmp_p'), '#/compare'], ['chart', t('tool_price'), t('tool_price_p'), '#/prices'], ['key', t('tool_list'), t('tool_list_p'), '#/list']].map(([i, ti, p, href]) => h('article', { class: 'card tool' }, h('div', { class: 'ib2' }, ic(i)), h('h3', null, h('a', { href }, ti)), h('p', { text: p })))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sectionHead(t('s_dev'), t('s_dev_p'), '#/developers'), h('div', { class: 'devs' }, DEV.map(d => h('article', { class: 'card devc' }, h('div', { class: 'mono', 'aria-hidden': 'true' }, pick(d).charAt(0)), h('h3', null, h('a', { href: '#/dev/' + d.id }, pick(d))), h('p', { class: 'note' }, `${t('since')} ${d.f} · ${P.filter(p => p.d === d.id).length} ${t('projects')}`)))))),
    h('section', { class: 'sec sec--alt' }, h('div', { class: 'wrap' }, sectionHead(t('s_why')), h('div', { class: 'why' }, [['shield', 'w1'], ['chart', 'w2'], ['cal', 'w3'], ['key', 'w4']].map(([i, k]) => h('div', null, h('div', { class: 'ib2' }, ic(i)), h('div', null, h('h3', { text: t(k) }), h('p', { text: t(k + 'p') }))))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sectionHead(t('s_agents'), t('s_agents_p')), h('div', { class: 'grid' }, AGENTS.map(ag => h('article', { class: 'card agent' }, h('img', { src: IMG + ag.img + '.webp', alt: pick(ag), width: 84, height: 84, loading: 'lazy' }), h('div', null, h('h3', null, pick(ag)), h('p', null, pick({ ar: ag.role[0], en: ag.role[1] })), h('p', null, `${num(ag.deals)} ${t('deals')} · ${t('lic')} ${ag.lic}`))))))),
    h('section', { class: 'sec sec--alt' }, h('div', { class: 'wrap', style: 'max-inline-size:820px' }, sectionHead(t('s_faq')), T[S.lang].faq.map(([q, a], i) => h('details', { class: 'q', open: i === 0 }, h('summary', null, q), h('p', null, a))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, h('div', { class: 'cta' }, h('div', null, h('h2', { text: t('cta_t') }), h('p', { text: t('cta_p') })), h('a', { class: 'btn btn--cu', href: '#/list' }, t('list_cta')))))
  ];
}

function parseQ(qs) { const q = {}; new URLSearchParams(qs || '').forEach((v, k) => { q[k] = v.slice(0, 40); }); return q; }
function applyFilters(f) {
  const tys = f.ty ? f.ty.split(',') : [];
  let r = L.filter(l => l.pu === f.pu && (!tys.length || tys.includes(l.ty)) && (!f.a || l.a === f.a) && (!f.min || l.price >= +f.min) && (!f.max || l.price <= +f.max) && (!f.bd || l.bd >= +f.bd) && (!f.fin || l.fin === f.fin) && (!f.st || l.st === f.st));
  const s = f.sort || 'new';
  r.sort((x, y) => s === 'pl' ? x.price - y.price : s === 'ph' ? y.price - x.price : s === 'm2' ? y.m2 - x.m2 : x.days - y.days);
  return r;
}
function vSearch(q) {
  const f = { pu: q.pu === 'r' ? 'r' : 's', ty: q.ty || '', a: A.some(a => a.id === q.a) ? q.a : '', min: +q.min > 0 ? q.min : '', max: +q.max > 0 ? q.max : '', bd: ['1', '2', '3', '4'].includes(q.bd) ? q.bd : '', fin: ['full', 'semi', 'core'].includes(q.fin) ? q.fin : '', st: ['ready', 'off'].includes(q.st) ? q.st : '', sort: ['pl', 'ph', 'm2'].includes(q.sort) ? q.sort : 'new' };
  const res = h('div', { class: 'res' }), count = h('p', { 'aria-live': 'polite', role: 'status' }), mapBox = h('div', { class: 'map' });
  const rl = h('div', { class: 'rl split' }, res, mapBox);
  const title = h('h1', { id: 'pt', tabindex: '-1' });
  const sync = () => {
    const qs = new URLSearchParams(); for (const k in f) if (f[k] && !(k === 'sort' && f[k] === 'new')) qs.set(k, f[k]);
    history.replaceState(null, '', '#/search?' + qs);
    const r = applyFilters(f);
    title.textContent = (f.pu === 'r' ? t('nav_rent') : t('nav_buy')) + (f.a ? ' · ' + pick(area(f.a)) : '');
    count.textContent = `${num(r.length)} ${t('results')}`;
    res.replaceChildren(...(r.length ? [h('div', { class: 'grid', style: 'grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr))' }, r.map(listingCard))] : [h('div', { class: 'empty' }, h('h2', { text: t('no_res') }), h('p', { text: t('no_res_p') }))]));
    drawMap(mapBox, r, f, (id) => { f.a = f.a === id ? '' : id; syncForm(); sync(); });
    document.title = `${title.textContent} | ${t('brand')} ${t('brandSub')}`;
  };
  // filter panel
  const panel = h('aside', { class: 'fp', id: 'fp', 'aria-label': t('f_filters') });
  const inp = (id, label, el) => h('div', { class: 'fld' }, h('label', { for: id }, label), el);
  let ctrls = {};
  const syncForm = () => { if (ctrls.a) ctrls.a.value = f.a; };
  const buildPanel = () => {
    const tyChips = h('div', { class: 'chips', role: 'group', 'aria-label': t('type') }, Object.keys(T.ar.t).map(k => {
      const b = h('button', { class: 'chip', type: 'button', 'aria-pressed': String((f.ty || '').split(',').includes(k)) }, T[S.lang].t[k]);
      b.addEventListener('click', () => { const set = new Set((f.ty || '').split(',').filter(Boolean)); set.has(k) ? set.delete(k) : set.add(k); f.ty = [...set].join(','); b.setAttribute('aria-pressed', String(set.has(k))); sync(); }); return b; }));
    const pu = h('div', { class: 'seg', role: 'group' }, [['s', t('sale')], ['r', t('rent')]].map(([k, l]) => { const b = h('button', { type: 'button', 'aria-pressed': String(f.pu === k) }, l); b.addEventListener('click', () => { f.pu = k; f.min = ''; f.max = ''; buildPanel(); sync(); }); return b; }));
    ctrls.a = selectEl('fa', areaOpts(), f.a); ctrls.min = h('input', { class: 'in', id: 'fmin', type: 'number', min: 0, step: 1000, inputmode: 'numeric', value: f.min }); ctrls.max = h('input', { class: 'in', id: 'fmax', type: 'number', min: 0, step: 1000, inputmode: 'numeric', value: f.max });
    ctrls.bd = selectEl('fbd', [['', t('any')], ['1', '1+'], ['2', '2+'], ['3', '3+'], ['4', '4+']], f.bd); ctrls.fin = selectEl('ffin', [['', t('any_fin')], ['full', t('full')], ['semi', t('semi')], ['core', t('core')]], f.fin); ctrls.st = selectEl('fst', [['', t('any_st')], ['ready', t('ready')], ['off', t('off')]], f.st);
    ctrls.sort = selectEl('fso', [['new', t('sort_new')], ['pl', t('sort_pl')], ['ph', t('sort_ph')], ['m2', t('sort_m2')]], f.sort);
    const bind = (k, el, ev) => el.addEventListener(ev || 'change', () => { f[k] = el.value; sync(); });
    bind('a', ctrls.a); bind('min', ctrls.min, 'input'); bind('max', ctrls.max, 'input'); bind('bd', ctrls.bd); bind('fin', ctrls.fin); bind('st', ctrls.st); bind('sort', ctrls.sort);
    const reset = h('button', { class: 'btn btn--o btn--sm', type: 'button' }, t('f_reset')); reset.addEventListener('click', () => { Object.assign(f, { ty: '', a: '', min: '', max: '', bd: '', fin: '', st: '', sort: 'new' }); buildPanel(); sync(); });
    const close = h('button', { class: 'btn btn--p fclose', type: 'button' }, t('f_apply')); close.addEventListener('click', () => panel.classList.remove('open'));
    panel.replaceChildren(h('h2', { text: t('f_filters') }), pu, inp('fa', t('where'), ctrls.a), h('div', { class: 'fld' }, h('span', { class: 'note' }, t('type')), tyChips), h('div', { class: 'two' }, inp('fmin', t('f_price_min'), ctrls.min), inp('fmax', t('f_price_max'), ctrls.max)), h('div', { class: 'two' }, inp('fbd', t('beds'), ctrls.bd), inp('ffin', t('f_fin'), ctrls.fin)), inp('fst', t('f_status'), ctrls.st), inp('fso', t('f_sort'), ctrls.sort), h('div', { style: 'display:flex;gap:.5rem;flex-wrap:wrap' }, reset, close));
  };
  buildPanel();
  const viewBtn = h('div', { class: 'seg hide-d', role: 'group' }), fbtn = h('button', { class: 'btn btn--o btn--sm fbtn', type: 'button', 'aria-controls': 'fp' }, ic('filter'), t('f_filters'));
  fbtn.addEventListener('click', () => panel.classList.add('open'));
  const lb = h('button', { type: 'button', 'aria-pressed': 'true' }, ic('list'), ' ' + t('list_v')), mb = h('button', { type: 'button', 'aria-pressed': 'false' }, ic('map'), ' ' + t('map_v'));
  lb.addEventListener('click', () => { rl.classList.remove('mapmode'); lb.setAttribute('aria-pressed', 'true'); mb.setAttribute('aria-pressed', 'false'); });
  mb.addEventListener('click', () => { rl.classList.add('mapmode'); mb.setAttribute('aria-pressed', 'true'); lb.setAttribute('aria-pressed', 'false'); });
  viewBtn.append(lb, mb);
  const out = h('div', { class: 'wrap sl' }, panel, h('div', null, h('div', { class: 'rb' }, h('div', null, title, count), h('div', { style: 'display:flex;gap:.5rem;align-items:center' }, fbtn, viewBtn)), rl));
  queueMicrotask(sync);
  return out;
}
function drawMap(box, items, f, pick_) {
  const counts = {}; items.forEach(l => { const c = counts[l.a] || (counts[l.a] = { n: 0, min: Infinity }); c.n++; c.min = Math.min(c.min, l.price); });
  const svg = sv('svg', { viewBox: '0 0 400 400', role: 'group', 'aria-label': t('map_note') },
    sv('rect', { class: 'land', width: 400, height: 400 }), sv('path', { class: 'sea', d: 'M0 0h400v46c-60 14-120 6-170 20S60 62 0 50Z' }), sv('path', { class: 'sea', d: 'M360 400V300c-10-30 6-60 40-80v180Z' }),
    sv('path', { class: 'rd', d: 'M0 250c80-20 140 10 200 0s110-60 200-30M210 70c-10 80 20 140-10 330M60 120c90 30 200 20 340 60' }), sv('path', { class: 'sea', d: 'M196 90c14 60-10 100 8 150s-6 110 4 160h14c-8-50 8-110-6-160s14-90-6-150Z', opacity: .55 }),
    sv('text', { class: 'lbl', x: 200, y: 30 }, S.lang === 'ar' ? 'البحر المتوسط' : 'Mediterranean'), sv('text', { class: 'lbl', x: 372, y: 330, transform: 'rotate(-90 372 330)' }, S.lang === 'ar' ? 'البحر الأحمر' : 'Red Sea'));
  A.forEach(a => {
    const c = counts[a.id]; if (!c) return;
    const label = `${pick(a)}: ${c.n}`; const txt = `${c.n} · ${money(c.min)}`;
    const w = Math.max(70, txt.length * 6.4 + 16), x = Math.min(Math.max(a.x * 4, w / 2 + 4), 396 - w / 2), y = a.y * 4;
    const g = sv('g', { class: 'pin', tabindex: '0', role: 'button', 'aria-label': label, 'aria-pressed': String(f.a === a.id), transform: `translate(${x} ${y})` }, sv('rect', { x: -w / 2, y: -13, width: w, height: 26, rx: 13 }), sv('text', { y: 4 }, txt), sv('text', { y: 28, class: 'lbl' }, pick(a)));
    g.addEventListener('click', () => pick_(a.id)); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick_(a.id); } });
    svg.append(g);
  });
  box.replaceChildren(svg, h('p', { class: 'note', style: 'padding:.5rem 1rem' }, t('map_note')));
}

function installPlans(l) {
  const plans = [[l.down, l.yrs], [l.down + 10, Math.max(l.yrs - 2, 3)], [l.down + 20, Math.max(l.yrs - 4, 2)]];
  return h('div', { class: 'tw' }, h('table', { class: 'tbl' }, h('thead', null, h('tr', null, [t('plan_down'), t('yrs'), t('plan_inst'), t('plan_total')].map(x => h('th', { scope: 'col' }, x)))),
    h('tbody', null, plans.map(([d, y]) => { const dp = l.price * d / 100, m = (l.price - dp) / (y * 12); return h('tr', null, h('td', null, `${d}% · ${price(dp)}`), h('td', null, `${y}`), h('td', null, `${num(m)} ${t('egp')}`), h('td', null, price(l.price))); }))));
}
function vListing(id) {
  const l = L.find(x => x.id === id); if (!l) return v404();
  const a = area(l.a), p = l.p ? proj(l.p) : null, ag = AGENTS.find(x => x.id === l.ag), title = pick({ ar: l.ti[0], en: l.ti[1] });
  document.title = `${title} | ${t('brand')} ${t('brandSub')}`;
  const sim = L.filter(x => x.id !== l.id && x.pu === l.pu && (x.a === l.a || x.ty === l.ty)).slice(0, 3);
  const pl = planText(l);
  return h('div', { class: 'wrap' },
    h('nav', { class: 'crumb', 'aria-label': 'breadcrumb' }, h('a', { href: '#/' }, t('home')), '›', h('a', { href: '#/search?pu=' + l.pu }, l.pu === 'r' ? t('nav_rent') : t('nav_buy')), '›', h('a', { href: '#/search?pu=' + l.pu + '&a=' + l.a }, pick(a))),
    h('div', { class: 'gal' }, h('img', { src: imgOf(l), alt: title, width: 900, height: 604 }), h('img', { src: IMG + 'living.webp', alt: '', loading: 'lazy', width: 900, height: 604 }), h('img', { src: IMG + 'kitchen.webp', alt: '', loading: 'lazy', width: 900, height: 604 })),
    h('div', { class: 'dl' },
      h('div', null,
        h('div', { class: 'chips', style: 'margin-block-end:.7rem' }, h('span', { class: 'chip' }, T[S.lang].t[l.ty]), l.st === 'ready' ? h('span', { class: 'chip' }, t('ready')) : h('span', { class: 'chip' }, `${t('dl')} ${l.dl}`), h('span', { class: 'chip' }, ic('check'), t('verified'))),
        h('h1', { id: 'pt', tabindex: '-1', text: title }), h('div', { class: 'card__loc', style: 'margin-block-start:.4rem' }, ic('pin'), pick(a), p ? ' · ' + pick(p) : ''),
        h('div', { class: 'price', style: 'font-size:1.9rem;margin-block-start:.8rem' }, l.pu === 'r' ? [num(l.price), ' ', h('small', null, `${t('egp')} ${t('per_month')}`)] : price(l.price)),
        l.pu === 's' ? h('p', { class: 'note' }, `${num(l.price / l.m2)} ${t('egp')} / ${t('sqm')}`) : null,
        h('div', { class: 'kf' }, [[t('sqm'), num(l.m2)], l.bd ? [t('bed'), l.bd] : null, [t('bath'), l.ba], [t('floor'), l.fl ? l.fl : t('ground')], [t('f_fin'), t(l.fin)], [t('dl'), l.st === 'ready' ? t('ready') : l.dl]].filter(Boolean).map(([k, v]) => h('div', null, h('small', null, k), h('b', null, String(v))))),
        h('section', { class: 'blk' }, h('h2', { text: t('v_desc') }), h('p', { text: S.lang === 'ar' ? `${title}. مساحة ${num(l.m2)} م² في ${pick(a)}${p ? ' داخل ' + pick(p) : ''}، تشطيب ${t(l.fin)}. ${l.st === 'off' ? 'التسليم المعلن ' + l.dl + '.' : 'الوحدة جاهزة للمعاينة والتسليم.'}` : `${title}. ${num(l.m2)} m² in ${pick(a)}${p ? ', inside ' + pick(p) : ''}, ${t(l.fin).toLowerCase()}. ${l.st === 'off' ? 'Announced delivery ' + l.dl + '.' : 'The unit is ready to view and hand over.'}` })),
        l.pu === 's' ? h('section', { class: 'blk' }, h('h2', { text: t('v_plan') }), pl ? installPlans(l) : [h('p', null, `${t('cash')}: ${price(l.price)}. ${t('ready_note')}`), h('a', { class: 'btn btn--t btn--sm', style: 'margin-block-start:.8rem', href: '#/calc?price=' + l.price }, ic('calc'), t('try_calc'))]) : null,
        h('section', { class: 'blk' }, h('h2', { text: t('v_am') }), h('div', { class: 'chips' }, l.am.map(x => h('span', { class: 'chip' }, ic('check'), T[S.lang].am[x])))),
        p ? h('section', { class: 'blk' }, h('h2', { text: t('v_loc') }), h('a', { class: 'link', href: '#/project/' + p.id }, pick(p), ic('arrow', 'flip'))) : null),
      h('aside', { class: 'side' }, h('div', { class: 'box' }, h('div', { style: 'display:flex;gap:.8rem;align-items:center;margin-block-end:.8rem' }, h('img', { src: IMG + ag.img + '.webp', alt: '', width: 56, height: 56, style: 'border-radius:50%;inline-size:56px;block-size:56px;object-fit:cover' }), h('div', null, h('b', null, pick(ag)), h('p', { class: 'note' }, `${t('lic')} ${ag.lic}`))),
        h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-block-end:.8rem' }, h('a', { class: 'btn btn--t btn--sm', href: 'tel:' + ag.ph }, ic('phone'), t('v_call')), h('a', { class: 'btn btn--w btn--sm', href: 'https://wa.me/2' + ag.ph, rel: 'noopener noreferrer', target: '_blank' }, ic('chat'), t('v_wa'))),
        h('h2', { text: t('v_contact') }), contactForm(title)))),
    sim.length ? h('section', { class: 'blk', style: 'padding-block-end:2rem' }, h('h2', { text: t('v_sim') }), h('div', { class: 'grid' }, sim.map(listingCard))) : null,
    h('div', { class: 'mbar' }, h('a', { class: 'btn btn--t', href: 'tel:' + ag.ph }, ic('phone'), t('v_call')), h('a', { class: 'btn btn--w', href: 'https://wa.me/2' + ag.ph, rel: 'noopener noreferrer', target: '_blank' }, ic('chat'), t('v_wa'))));
}
function vProjects(q) {
  const af = A.some(a => a.id === q.a) ? q.a : '';
  const out = h('div', { class: 'wrap sec' }), grid = h('div', { class: 'grid' });
  const chips = h('div', { class: 'chips', style: 'margin-block-end:1.2rem' });
  const draw = () => { chips.replaceChildren(...[['', t('p_all')], ...A.filter(a => P.some(p => p.a === a.id)).map(a => [a.id, pick(a)])].map(([k, l]) => { const b = h('button', { class: 'chip', type: 'button', 'aria-pressed': String(af2 === k) }, l); b.addEventListener('click', () => { af2 = k; history.replaceState(null, '', '#/projects' + (k ? '?a=' + k : '')); draw(); }); return b; })); grid.replaceChildren(...P.filter(p => !af2 || p.a === af2).map(projectCard)); };
  let af2 = af; draw();
  out.append(h('div', { class: 'sh' }, h('div', null, h('h1', { id: 'pt', tabindex: '-1', text: t('s_new') }), h('p', { text: t('s_new_p') }))), chips, grid); return out;
}
function vProject(id) {
  const p = proj(id); if (!p) return v404(); const d = dev(p.d), a = area(p.a), ls = L.filter(l => l.p === p.id);
  document.title = `${pick(p)} | ${t('brand')} ${t('brandSub')}`;
  const fake = { price: p.from, down: p.down, yrs: p.yrs };
  return h('div', null,
    h('section', { class: 'hero', style: 'color:#fff' }, h('div', { class: 'hero__img' }, h('img', { src: IMG + p.img + '.webp', alt: '', width: 1024, height: 572 })), h('div', { class: 'wrap hero__in' }, h('h1', { id: 'pt', tabindex: '-1', text: pick(p) }), h('p', { class: 'lead', text: `${t('p_by')} ${pick(d)} · ${pick(a)} · ${t('p_deliv')} ${p.dl}` }))),
    h('div', { class: 'wrap dl' }, h('div', null,
      h('div', { class: 'kf' }, [[t('from'), price(p.from)], [t('plan_down'), p.down + '%'], [t('yrs'), p.yrs], [t('p_land'), num(p.land)], [t('p_green'), p.green + '%'], [t('p_units'), num(p.units)]].map(([k, v]) => h('div', null, h('small', null, k), h('b', null, v)))),
      h('section', { class: 'blk' }, h('h2', { text: t('p_types') }), h('div', { class: 'chips' }, p.types.map(x => h('span', { class: 'chip' }, T[S.lang].t[x])))),
      h('section', { class: 'blk' }, h('h2', { text: t('v_plan') }), installPlans(fake)),
      h('section', { class: 'blk' }, h('h2', { text: t('v_am') }), h('div', { class: 'chips' }, p.am.map(x => h('span', { class: 'chip' }, ic('check'), T[S.lang].am[x])))),
      ls.length ? h('section', { class: 'blk' }, h('h2', { text: t('p_units_in') }), h('div', { class: 'grid' }, ls.map(listingCard))) : null),
      h('aside', { class: 'side' }, h('div', { class: 'box' }, h('h2', { text: t('p_reg') }), contactForm(pick(p), 'reg')))));
}
function vDevs() { return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('h1', { id: 'pt', tabindex: '-1', text: t('dv_all') }), h('p', { text: t('s_dev_p') }))), h('div', { class: 'devs' }, DEV.map(d => h('article', { class: 'card devc' }, h('div', { class: 'mono', 'aria-hidden': 'true' }, pick(d).charAt(0)), h('h2', { style: 'font-size:1.05rem' }, h('a', { href: '#/dev/' + d.id }, pick(d))), h('p', { class: 'note' }, `${t('since')} ${d.f} · ${P.filter(p => p.d === d.id).length} ${t('projects')}`), h('p', { class: 'note', text: pick({ ar: d.ab[0], en: d.ab[1] }) }))))); }
function vDev(id) { const d = dev(id); if (!d) return v404(); document.title = `${pick(d)} | ${t('brand')}`; return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('h1', { id: 'pt', tabindex: '-1', text: pick(d) }), h('p', { text: `${t('since')} ${d.f}` }))), h('p', { style: 'max-inline-size:70ch;color:var(--mut);margin-block-end:1.6rem', text: pick({ ar: d.ab[0], en: d.ab[1] }) }), h('div', { class: 'grid' }, P.filter(p => p.d === id).map(projectCard))); }
function vPrices() {
  return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('h1', { id: 'pt', tabindex: '-1', text: t('price_t') }), h('p', { text: t('price_p') }))),
    h('div', { class: 'tw' }, h('table', { class: 'tbl' }, h('thead', null, h('tr', null, [t('th_area'), t('th_ppsm'), t('th_chg'), t('th_tr'), t('th_n')].map(x => h('th', { scope: 'col' }, x)))),
      h('tbody', null, [...A].sort((x, y) => y.ppsm - x.ppsm).map(a => h('tr', null, h('th', { scope: 'row' }, h('a', { class: 'link', href: '#/search?pu=s&a=' + a.id }, pick(a))), h('td', null, `${num(a.ppsm)} ${t('egp')}`), h('td', { class: 'up' }, `▲ ${dec1(a.chg)}%`), h('td', { style: 'inline-size:160px' }, spark(a.tr, 140, 32)), h('td', null, num(L.filter(l => l.a === a.id && l.pu === 's').length)))))))); }
function vCalc(q) {
  const st = { price: Math.min(Math.max(+q.price || 6000000, 500000), 50000000), down: 10, yrs: 8, mode: 'dev', rate: 22 };
  const out = h('div', { class: 'res' });
  const mk = (id, label, min, max, step, key, fmt) => { const v = h('output', { for: id }), r = h('input', { class: 'range', type: 'range', id, min, max, step, value: st[key] }); const up = () => { st[key] = +r.value; v.textContent = fmt(+r.value); draw(); }; r.addEventListener('input', up); v.textContent = fmt(st[key]); return h('div', { class: 'fld' }, h('label', { for: id, style: 'display:flex;justify-content:space-between' }, label, v), r); };
  const mode = h('div', { class: 'seg', role: 'group', 'aria-label': t('c_mode') }, [['dev', t('c_dev')], ['bank', t('c_bank')]].map(([k, l]) => { const b = h('button', { type: 'button', 'aria-pressed': String(st.mode === k) }, l); b.addEventListener('click', () => { st.mode = k; [...mode.children].forEach(c => c.setAttribute('aria-pressed', String(c === b))); rateF.hidden = k === 'dev'; draw(); }); return b; }));
  const rateF = mk('crate', t('c_rate'), 8, 35, 0.5, 'rate', v => v + '%'); rateF.hidden = true;
  const ctl = h('div', { class: 'box form' }, mk('cp', t('c_price'), 500000, 50000000, 100000, 'price', v => price(v)), mk('cd', t('c_down'), 5, 50, 1, 'down', v => v + '%'), mk('cy', t('c_years'), 2, 12, 1, 'yrs', v => `${v} ${t('yrs')}`), h('div', { class: 'fld' }, h('span', { class: 'note' }, t('c_mode')), mode), rateF, h('p', { class: 'note', text: t('calc_p') }));
  function draw() {
    const dp = st.price * st.down / 100, fin = st.price - dp, n = st.yrs * 12; let m;
    if (st.mode === 'dev') m = fin / n; else { const r = st.rate / 1200; m = fin * r / (1 - Math.pow(1 + r, -n)); }
    const tot = dp + m * n, intr = m * n - fin;
    out.replaceChildren(h('div', { class: 'box', 'aria-live': 'polite' }, h('p', { class: 'note', text: t('c_monthly') }), h('div', { class: 'big' }, `${num(m)} ${t('egp')}`),
      h('div', { class: 'bar', 'aria-hidden': 'true' }, h('i', { style: `inline-size:${st.down * 100 / 100}%;background:var(--cu)` }), h('i', { style: `inline-size:${100 - st.down}%;background:var(--p)` })),
      [[t('c_dpay'), price(dp)], [t('c_fin'), price(fin)], [t('c_int'), st.mode === 'dev' ? '0' : price(Math.max(intr, 0))], [t('c_tot'), price(tot)]].map(([k, v]) => h('div', { class: 'row' }, h('span', null, k), h('b', null, v)))));
  }
  draw();
  return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('h1', { id: 'pt', tabindex: '-1', text: t('calc_t') }), h('p', { text: t('calc_p') }))), h('div', { class: 'calc' }, ctl, out));
}
function vCompare() {
  const items = S.cmp.map(id => L.find(l => l.id === id)).filter(Boolean);
  const body = items.length < 2 ? h('div', { class: 'empty' }, h('p', { text: t('cmp_empty') }), h('a', { class: 'btn btn--p', style: 'margin-block-start:1rem', href: '#/search?pu=s' }, t('nav_buy'))) :
    h('div', { class: 'tw' }, h('table', { class: 'tbl cmp' }, h('thead', null, h('tr', null, h('th', null), items.map(l => h('th', { scope: 'col' }, h('a', { class: 'link', href: '#/p/' + l.id }, pick({ ar: l.ti[0], en: l.ti[1] })), h('br'), h('button', { class: 'chip', type: 'button', onclick: () => { toggleCmp(l.id); route(); } }, t('cmp_rm')))))),
      h('tbody', null, [[S.lang === 'ar' ? 'السعر' : 'Price', l => l.pu === 'r' ? `${num(l.price)} ${t('egp')} ${t('per_month')}` : price(l.price)], [t('th_area'), l => pick(area(l.a))], [t('type'), l => T[S.lang].t[l.ty]], [t('sqm'), l => num(l.m2)], [S.lang === 'ar' ? 'سعر المتر' : 'Price / m²', l => l.pu === 's' ? num(l.price / l.m2) : '—'], [t('bed'), l => l.bd || '—'], [t('bath'), l => l.ba], [t('f_fin'), l => t(l.fin)], [t('dl'), l => l.st === 'ready' ? t('ready') : l.dl], [t('plan_down'), l => l.pu === 's' && l.st === 'off' ? l.down + '%' : '—'], [t('plan_inst'), l => { const p = planText(l); return p ? p[1] : '—'; }]].map(([k, fn]) => h('tr', null, h('th', { scope: 'row' }, k), items.map(l => h('td', null, String(fn(l)))))))));
  return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('h1', { id: 'pt', tabindex: '-1', text: t('cmp_t') })), body);
}
function vSaved() { const items = [...S.saved].map(id => L.find(l => l.id === id)).filter(Boolean); return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('h1', { id: 'pt', tabindex: '-1', text: t('sv_t') })), items.length ? h('div', { class: 'grid' }, items.map(listingCard)) : h('div', { class: 'empty' }, h('p', { text: t('sv_empty') }))); }
function vList() {
  const f = h('form', { class: 'box form', novalidate: true, style: 'max-inline-size:640px' });
  const phone = h('input', { class: 'in', id: 'lp', type: 'tel', inputmode: 'tel', required: true, maxlength: 16, dir: 'ltr', autocomplete: 'tel' }), name = h('input', { class: 'in', id: 'ln', required: true, maxlength: 60, autocomplete: 'name' }), hp = h('input', { class: 'hp', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' });
  const en = h('div', { class: 'err' }), ep = h('div', { class: 'err' }), box = h('div', { 'aria-live': 'polite' });
  const fld = (id, l, el, e) => h('div', { class: 'fld' }, h('label', { for: id }, l), el, e);
  f.append(fld('ln', t('v_name'), name, en), fld('lp', t('v_phone'), phone, ep), h('div', { class: 'two', style: 'display:grid;grid-template-columns:1fr 1fr;gap:.6rem' }, fld('lpu', t('type'), selectEl('lpu', [['s', t('sale')], ['r', t('rent')]])), fld('lty', t('type'), selectEl('lty', typeOpts().slice(1)))), fld('la', t('where'), selectEl('la', areaOpts().slice(1))), h('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:.6rem' }, fld('lpr', t('ls_price'), h('input', { class: 'in', id: 'lpr', type: 'number', min: 0, inputmode: 'numeric' })), fld('lm', t('ls_m2'), h('input', { class: 'in', id: 'lm', type: 'number', min: 0, inputmode: 'numeric' }))), hp, h('button', { class: 'btn btn--cu', type: 'submit' }, t('v_send')), h('p', { class: 'note' }, t('demo_note')), box);
  f.addEventListener('submit', (e) => { e.preventDefault(); en.textContent = ''; ep.textContent = ''; if (hp.value) return; let ok = true; if (name.value.trim().length < 2) { en.textContent = t('e_name'); ok = false; } if (!/^(\+?20|0)?1[0125]\d{8}$/.test(phone.value.replace(/[\s-]/g, ''))) { ep.textContent = t('e_phone'); ok = false; } if (!ok) return; box.replaceChildren(h('div', { class: 'okmsg' }, t('ls_ok'))); f.querySelectorAll('input,select,button').forEach(x => { x.disabled = true; }); });
  return h('div', { class: 'wrap sec' }, h('div', { class: 'sh' }, h('div', null, h('h1', { id: 'pt', tabindex: '-1', text: t('ls_t') }), h('p', { text: t('ls_p') }))), f);
}
function v404() { return h('div', { class: 'wrap sec' }, h('div', { class: 'empty' }, h('h1', { id: 'pt', tabindex: '-1', text: t('nf_t') }), h('p', { text: t('nf_p') }), h('a', { class: 'btn btn--p', style: 'margin-block-start:1rem', href: '#/' }, t('home')))); }

/* ---------- chrome ---------- */
function header() {
  const nav = h('nav', { class: 'nav', id: 'nav', 'aria-label': 'Main' }, [['#/search?pu=s', t('nav_buy')], ['#/search?pu=r', t('nav_rent')], ['#/projects', t('nav_new')], ['#/developers', t('nav_dev')], ['#/prices', t('nav_price')], ['#/calc', t('nav_calc')]].map(([href, l]) => h('a', { href, onclick: () => nav.classList.remove('open') }, l)));
  const mb = h('button', { class: 'ib menu-btn', type: 'button', 'aria-label': t('menu'), 'aria-expanded': 'false', 'aria-controls': 'nav' }, ic('menu')); mb.addEventListener('click', () => { const o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
  const lang = h('button', { class: 'ib', type: 'button', 'aria-label': 'Language' }, h('span', { style: 'font-size:.85rem;font-weight:500' }, t('lang'))); lang.addEventListener('click', () => setLang(S.lang === 'ar' ? 'en' : 'ar'));
  const th = h('button', { class: 'ib', type: 'button', 'aria-label': t('theme') }, ic(S.theme === 'dark' ? 'sun' : 'moon')); th.addEventListener('click', () => setTheme(S.theme === 'dark' ? 'light' : 'dark'));
  const sa = h('a', { class: 'ib', href: '#/saved', 'aria-label': t('saved') }, ic('heart'), h('span', { class: 'n', id: 'nsv', hidden: true })), cm = h('a', { class: 'ib hide-s', href: '#/compare', 'aria-label': t('compare') }, ic('scale'), h('span', { class: 'n', id: 'ncm', hidden: true }));
  return h('header', { class: 'hd' }, h('div', { class: 'wrap hd__in' }, mb, h('a', { class: 'brand', href: '#/', 'aria-label': t('brand') + ' ' + t('brandSub') }, brandMark(), h('span', null, t('brand'), h('small', null, t('brandSub')))), nav, h('div', { class: 'hd__act' }, sa, cm, th, lang, h('a', { class: 'btn btn--cu btn--sm hide-s', href: '#/list' }, t('list_cta')))));
}
function brandMark() { const s = sv('svg', { width: 34, height: 34, viewBox: '0 0 34 34', 'aria-hidden': 'true' }, sv('rect', { width: 34, height: 34, rx: 10, fill: 'var(--p)' }), sv('path', { d: 'M9 24V14l8-6 8 6v10h-5v-6h-6v6Z', fill: 'var(--on-p)' }), sv('circle', { cx: 17, cy: 15.5, r: 2, fill: 'var(--cu)' })); return s; }
function footer() {
  return h('footer', { class: 'ft' }, h('div', { class: 'wrap' }, h('div', { class: 'ft__g' },
    h('div', null, h('div', { class: 'brand', style: 'margin-block-end:.6rem' }, brandMark(), h('span', null, t('brand'))), h('p', { text: t('ft_about') })),
    h('div', null, h('h2', { text: t('ft_exp') }), h('a', { href: '#/search?pu=s' }, t('nav_buy')), h('a', { href: '#/search?pu=r' }, t('nav_rent')), h('a', { href: '#/projects' }, t('nav_new')), h('a', { href: '#/developers' }, t('nav_dev'))),
    h('div', null, h('h2', { text: t('ft_help') }), h('a', { href: '#/calc' }, t('nav_calc')), h('a', { href: '#/compare' }, t('compare')), h('a', { href: '#/prices' }, t('nav_price')), h('a', { href: '#/list' }, t('list_cta'))),
    h('div', null, h('h2', { text: t('ft_hot') }), h('a', { href: 'tel:' + HOT, 'aria-label': HOT.split('').join(' '), style: 'font-weight:600;font-size:1.3rem;color:var(--p)' }, h('bdi', { dir: 'ltr' }, HOT)), h('p', { text: S.lang === 'ar' ? 'يومياً من 9 ص إلى 9 م' : 'Daily 9am – 9pm' }))),
    h('div', { class: 'ft__b' }, `© 2026 ${t('brand')} ${t('brandSub')} · ${t('ft_rights')} · ${t('demo_note')}`)));
}
function updateBadges() { const s = document.getElementById('nsv'), c = document.getElementById('ncm'); if (s) { s.hidden = !S.saved.size; s.textContent = S.saved.size; } if (c) { c.hidden = !S.cmp.length; c.textContent = S.cmp.length; } }
function renderCmpBar() {
  let b = document.getElementById('cmpbar'); if (b) b.remove(); if (!S.cmp.length || location.hash.startsWith('#/compare')) return;
  b = h('div', { class: 'cmpbar', id: 'cmpbar', role: 'region', 'aria-label': t('compare') }, h('span', null, `${S.cmp.length} ${t('cmp_sel')}`), h('div', { style: 'display:flex;gap:.4rem' }, h('button', { class: 'btn btn--o btn--sm', type: 'button', onclick: () => { S.cmp = []; updateBadges(); renderCmpBar(); route(); } }, t('cmp_clear')), h('a', { class: 'btn btn--p btn--sm', href: '#/compare' }, t('cmp_go'))));
  document.body.append(b);
}
function setLang(l) { S.lang = l; save('mf_lang', l); route(true); }
function setTheme(th) { S.theme = th; save('mf_theme', th); document.documentElement.dataset.theme = th; route(true); }

/* ---------- router ---------- */
let first = true;
function route(keep) {
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.dataset.theme = S.theme;
  const raw = location.hash.replace(/^#\/?/, ''), [path, qs] = raw.split('?'), seg = path.split('/').filter(Boolean), q = parseQ(qs);
  const app = document.getElementById('app'); let view;
  CH = (seg[0] === undefined || seg[0] === 'p' || seg[0] === 'project') ? 'h3' : 'h2';
  document.title = `${t('brand')} ${t('brandSub')} — ${S.lang === 'ar' ? 'عقارات للبيع والإيجار في مصر' : 'Property for sale and rent in Egypt'}`;
  switch (seg[0]) {
    case undefined: view = vHome(); break; case 'search': view = vSearch(q); break; case 'p': view = vListing(seg[1]); break; case 'projects': view = vProjects(q); break; case 'project': view = vProject(seg[1]); break;
    case 'developers': view = vDevs(); break; case 'dev': view = vDev(seg[1]); break; case 'prices': view = vPrices(); break; case 'calc': view = vCalc(q); break; case 'compare': view = vCompare(); break; case 'saved': view = vSaved(); break; case 'list': view = vList(); break; default: view = v404();
  }
  app.replaceChildren(h('a', { class: 'skip', href: '#main', onclick: (e) => { e.preventDefault(); document.getElementById('main').focus(); } }, t('skip')), header(), h('main', { id: 'main', tabindex: '-1' }, view), footer());
  updateBadges(); renderCmpBar();
  document.querySelectorAll('.nav a').forEach(a => { if (a.getAttribute('href') === '#/' + raw.split('&')[0]) a.setAttribute('aria-current', 'page'); });
  if (!keep && !first) { window.scrollTo(0, 0); const pt = document.getElementById('pt'); if (pt) pt.focus({ preventScroll: true }); }
  first = false;
}
window.addEventListener('hashchange', () => route());
route();
})();
