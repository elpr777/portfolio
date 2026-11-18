/* Masar Export — static demo SPA. All dynamic text goes through textContent (no HTML injection); nothing is sent anywhere. */
(() => {
'use strict';
const { SEC, P, MONTHS, CERTS, PORTS, DEST, LANES, MKT, COUNTRIES, REVIEWS, HOT, MAIL } = window.D;
const IMG = 'img/';
const TEL = 'tel:' + HOT.replace(/[^+\d]/g, '');
const LRM = '‎';
const R = (a, b) => `${a}${LRM}–${LRM}${b}`;

/* ---------- i18n ---------- */
const T = {
  ar: {
    brand: 'مسار', sub: 'للتصدير', skip: 'تخطي إلى المحتوى', theme: 'تبديل المظهر', lang: 'English', menu: 'القائمة', demo: 'محتوى تجريبي: الشركة والأرقام والشهادات والأسعار افتراضية لعرض التصميم.',
    top1: 'نرد على طلبات الأسعار خلال 24 ساعة عمل', top2: 'القاهرة · الأحد–الخميس 9:00–17:00',
    n_products: 'المنتجات', n_seasons: 'مواسم التوريد', n_logistics: 'الشحن', n_quality: 'الجودة', n_markets: 'الأسواق', n_about: 'عن الشركة', n_contact: 'تواصل', rfq: 'قائمة الطلب', rfq_go: 'طلب عرض سعر',
    h_eye: 'شركة تصدير مصرية · موالح · قطن · رخام', h1a: 'من المزرعة المصرية ', h1b: 'إلى ميناء الوصول', h_p: 'نورّد الموالح والبطاطس والعنب والرمان والقطن والرخام للمستوردين في الخليج وأوروبا، مع تقرير فحص وشهادات وسجل حرارة لكل شحنة.', h_c1: 'اطلب عرض سعر', h_c2: 'تصفّح المنتجات',
    qr_t: 'عرض سعر في دقيقة', qr_p: 'المنتج', qr_d: 'بلد الوجهة', qr_n: 'الكمية (طن)', qr_go: 'ابدأ الطلب',
    st1: 'سوقاً مستورداً', st2: 'حاوية سنوياً', st3: 'ساعة من الحصاد إلى التبريد', st4: 'ساعة للرد على السعر',
    s1_t: 'ما الذي نصدّره', s1_p: 'ثلاثة قطاعات، لكل منها مواصفات وتقارير وموسم واضح.', browse: 'عرض القطاع',
    s2_t: 'متاح هذا الشهر', s2_p: 'أصناف في موسمها الآن ({m}).', s2_none: 'لا أصناف طازجة في الموسم الآن، والقطن والرخام متاحان طوال العام.',
    s3_t: 'كيف تتحرك طلبيتك', s3_p: 'ست مراحل من طلب السعر حتى استلام الشحنة.',
    steps: [['طلب السعر', 'ترسل المنتج والكمية والميناء ونرد خلال 24 ساعة.'], ['عينة ومواصفات', 'نرسل عينة وبطاقة مواصفات للموافقة.'], ['العقد والدفع', 'اعتماد الشروط وفتح اعتماد أو دفعة مقدمة.'], ['الحصاد والتعبئة', 'حصاد وفرز وتبريد خلال 48 ساعة.'], ['الفحص والتحميل', 'فحص مستقل وتحميل مع تسجيل الحرارة.'], ['الشحن والمستندات', 'الشحن وتسليم مستندات الجمارك حتى الميناء.']],
    s4_t: 'جدول الخطوط البحرية', s4_p: 'أزمنة العبور تقريبية وتتغير حسب الموسم وشركة الشحن.', from: 'من ميناء', all: 'الكل', th_dest: 'الوجهة', th_port: 'ميناء الشحن', th_days: 'أيام العبور', th_sail: 'رحلات أسبوعياً', th_reefer: 'مبرّد', yes: 'متاح', no: '—', d: 'يوم',
    s5_t: 'الجودة عبر خمس بوابات', s5_p: 'كل شحنة تمر بالبوابات نفسها قبل أن تغادر الميناء.',
    gates: [['مراجعة المزرعة', 'زيارة وتسجيل المدخلات والمبيدات قبل الحصاد.'], ['فحص الحصاد', 'عينات من كل قطعة للنضج والحجم.'], ['الفرز والتعبئة', 'فرز آلي ويدوي وتغليف حسب المواصفات.'], ['فحص ما قبل الشحن', 'فاحص مستقل يصدر تقريراً بالصور.'], ['سجل الحرارة', 'مسجّل حرارة داخل الحاوية يُسلَّم مع المستندات.']], q_link: 'الشهادات والمستندات',
    s6_t: 'أسواقنا', s6_p: 'توزيع تقريبي لحجم الشحنات (بيانات تجريبية).', s7_t: 'آراء المستوردين', s7_p: 'آراء تجريبية لأغراض العرض.',
    faq_t: 'أسئلة المستوردين',
    faq: [['ما الحد الأدنى للطلب؟', 'حاوية واحدة 40 قدم، مبرّدة للمنتجات الطازجة وجافة للقطن والأقمشة والرخام. تتوفر شحنات تجريبية أصغر للمنتجات الطازجة عند الطلب.'], ['هل أستطيع الحصول على عينة؟', 'نعم، نرسل عينات عبر شركة شحن سريع خلال 5 أيام عمل، وتتوقف عينات الطازج على الموسم.'], ['ما شروط التسليم المتاحة؟', 'FOB وCFR وCIF، وشروط أخرى عند الطلب.'], ['كيف تتعاملون مع شكاوى الجودة؟', 'مع كل شحنة تقرير فحص بالصور وسجل حرارة. تُقدَّم الشكوى خلال 48 ساعة من التفريغ مع صور وسجل الحرارة.'], ['ما شروط الدفع؟', 'اعتماد مستندي عند الاطلاع أو 30% مقدماً والباقي مقابل المستندات، وتُحدَّد في العقد.'], ['من أي موانئ تشحنون؟', 'الإسكندرية ودمياط وبورسعيد والعين السخنة حسب الوجهة والمنتج.']],
    cta_t: 'جاهز لعرض سعر؟', cta_p: 'أضف المنتجات إلى قائمة الطلب وسنرد بسعر FOB وCIF خلال 24 ساعة عمل.',
    pr_t: 'المنتجات', pr_p: 'سبعة منتجات بمواصفات تفصيلية. أضف ما يهمك إلى قائمة الطلب.', f_sec: 'القطاع', f_q: 'بحث', f_q_ph: 'ابحث بالاسم أو رمز HS', none: 'لا نتائج مطابقة.', add: 'أضف للقائمة', added: 'في القائمة', t_add: 'أُضيف إلى قائمة الطلب', t_view: 'عرض القائمة', t_rm: 'أُزيل من القائمة', spec_btn: 'المواصفات', cmp_t: 'مقارنة سريعة', th_prod: 'المنتج', th_hs: 'رمز HS', th_cont: 'الحاوية', th_cap: 'حمولة 40 قدم', th_moq: 'الحد الأدنى', th_seas: 'الموسم',
    sp_hs: 'رمز HS', sp_origin: 'منطقة المنشأ', sp_var: 'الصنف', sp_grade: 'الدرجة / المقاس', sp_pack: 'التعبئة', sp_moq: 'الحد الأدنى', sp_cont: 'نوع الحاوية', sp_cap: 'حمولة حاوية 40 قدم', sp_shelf: 'مدة الحفظ', sp_inc: 'شروط التسليم', sp_cert: 'الشهادات', sp_season: 'موسم التوريد', reefer: 'مبرّدة (Reefer)', dry: 'جافة', t_unit: 'طن', p_var: 'اختر الصنف', p_sample: 'اطلب عينة', p_rel: 'منتجات أخرى', p_spec: 'بطاقة المواصفات', crumb_h: 'الرئيسية',
    se_t: 'مواسم التوريد', se_p: 'التقويم الشهري لكل صنف. الشهر الحالي مميّز.', se_leg1: 'متاح', se_leg2: 'خارج الموسم', se_year: 'القطن والأقمشة والرخام متاحة على مدار العام، ويتأثر القطن بموسم الحصاد من سبتمبر إلى نوفمبر.',
    lg_t: 'الشحن واللوجستيات', lg_p: 'أربعة موانئ مصرية، وخطوط منتظمة إلى الخليج وأوروبا، وتحميل مع تسجيل الحرارة.', lg_board: 'الخطوط الأسبوعية', lg_calc: 'حاسبة الحاويات', lg_calc_p: 'اعرف عدد الحاويات والبالتات لكمية معينة.', c_prod: 'المنتج', c_qty: 'الكمية (طن)', r_cont: 'حاويات 40 قدم', r_pal: 'بالتات', r_ctn: 'عبوات', r_fill: 'امتلاء آخر حاوية', c_note: 'تقديري حسب التعبئة القياسية، ويؤكد فريق العمليات الرقم النهائي.', c_err: 'أدخل كمية بين 1 و5000 طن',
    lg_inc: 'شروط التسليم', inc: [['FOB', 'التسليم على ظهر السفينة في الميناء المصري. المشتري يتحمل الشحن والتأمين.'], ['CFR', 'نشمل أجرة الشحن حتى ميناء الوصول. التأمين على المشتري.'], ['CIF', 'نشمل الشحن والتأمين حتى ميناء الوصول.']], lg_h: 'ما نتولاه', lg_hl: ['حجز الحاويات والمساحة على السفن', 'التحميل والتثبيت وتسجيل الحرارة', 'مستندات التصدير والجمارك المصرية', 'تتبع الشحنة حتى الوصول'],
    ql_t: 'الجودة والشهادات', ql_p: 'الشهادات والمستندات التي تتوقعها إدارات الشراء، متاحة قبل الطلب وعند كل شحنة.', ql_c: 'الشهادات', ql_g: 'بوابات الجودة', ql_d: 'مركز المستندات', ql_dp: 'اطلب أي مستند ليُضاف إلى طلبك.', th_doc: 'المستند', th_when: 'التوفر', th_req: 'طلب', req: 'اطلب', docs: [['phyto', 'شهادة صحة نباتية', 'مع كل شحنة'], ['coo', 'شهادة المنشأ / EUR.1', 'مع كل شحنة'], ['insp', 'تقرير الفحص قبل الشحن', 'مع كل شحنة'], ['temp', 'سجل الحرارة (Reefer)', 'مع الشحنات المبرّدة'], ['pack', 'قائمة التعبئة والفاتورة التجارية', 'مع كل شحنة'], ['spec', 'بطاقة المواصفات', 'قبل الطلب'], ['lab', 'نتائج المختبر (متبقيات / تيلة)', 'عند الطلب']], cert_for: 'لمنتجات',
    mk_t: 'الأسواق', mk_p: 'نحن نشحن إلى ستة أسواق رئيسية بخطوط منتظمة. النسب تجريبية.', mk_ports: 'موانئ الوصول',
    ab_t: 'عن مسار للتصدير', ab_p: 'شركة تصدير مصرية تأسست عام 2011 تربط المزارع والمصانع والمحاجر بالمستوردين، مع التزام واحد: ما نكتبه في المواصفات هو ما يصل.', ab_h: 'كيف نعمل', ab_hl: [['شبكة مزارع', 'مزارع شريكة في البحيرة والإسماعيلية والمنيا، ندقق فيها قبل الموسم.'], ['محطة تعبئة', 'خطوط فرز وتبريد سريع قرب القاهرة، ومخازن مبرّدة قريبة من الموانئ.'], ['فريق عمليات', 'مسؤول واحد لكل حساب يتابع الطلب من العقد حتى الاستلام.']], ab_n: 'أرقام تجريبية: 2011 · 120 مزرعة شريكة · 3 محطات تعبئة',
    r_t: 'طلب عرض سعر', r_p: 'أضف المنتجات ثم أرسل التفاصيل. هذه نسخة تجريبية ولا تُرسَل أي بيانات.', r_list: 'قائمة الطلب', r_empty: 'القائمة فارغة. أضف منتجاً من الأسفل أو من صفحة المنتجات.', r_add: 'أضف إلى القائمة', r_prod: 'المنتج', r_var: 'الصنف', r_rm: 'إزالة', r_details: 'تفاصيل الطلب',
    f_co: 'اسم الشركة', f_name: 'اسم المسؤول', f_email: 'البريد الإلكتروني', f_phone: 'الهاتف / واتساب', f_country: 'بلد الوجهة', f_port: 'ميناء الوصول', f_inc: 'شروط التسليم', f_qty: 'الكمية', f_unit: 'الوحدة', u_t: 'طن', u_c: 'حاوية', f_freq: 'نوع الطلب', fr_once: 'شحنة واحدة', fr_month: 'شحنات شهرية', fr_season: 'عقد موسمي', f_msg: 'تفاصيل إضافية', f_sample: 'أريد عينة قبل الطلب', f_choose: 'اختر', f_other: 'أخرى',
    e_req: 'هذا الحقل مطلوب', e_email: 'اكتب بريداً صحيحاً', e_phone: 'اكتب رقم هاتف صحيحاً مع رمز الدولة', e_qty: 'أدخل كمية بين 1 و5000', e_list: 'أضف منتجاً واحداً على الأقل إلى القائمة', e_fix: 'راجع الحقول المظلّلة', send: 'أرسل الطلب', ok_t: 'تم استلام طلبك (تجريبي)', ok_p: 'رقم المرجع', ok_n: 'لم يُرسَل أي شيء لأن هذه نسخة تجريبية. يمكنك طلب شيء آخر.', ok_new: 'طلب جديد', docnote: 'ستُضاف إلى رسالتك: {d}',
    c_t: 'تواصل معنا', c_p: 'فريق المبيعات يرد خلال 24 ساعة عمل.', c_addr: 'العنوان', addr: 'المنطقة الصناعية، العبور، القليوبية، مصر', c_hot: 'الخط الساخن', c_mail: 'البريد', c_hrs: 'ساعات العمل', hrs: 'الأحد–الخميس · 9:00–17:00 بتوقيت القاهرة', c_form: 'أرسل رسالة', c_msg: 'الرسالة', c_send: 'إرسال', c_ok: 'تم استلام رسالتك (تجريبي).',
    nf_t: 'الصفحة غير موجودة', nf_p: 'الرابط غير موجود. ارجع إلى المنتجات أو الرئيسية.',
    ft_a: 'شركة تصدير مصرية للموالح والبطاطس والعنب والرمان والقطن والرخام.', ft_co: 'الشركة', ft_pr: 'المنتجات', ft_hot: 'الخط الساخن', ft_rights: 'جميع الحقوق محفوظة', ft_img: 'الصور مولّدة بالذكاء الاصطناعي لأغراض العرض.'
  },
  en: {
    brand: 'MASAR', sub: 'EXPORT', skip: 'Skip to content', theme: 'Toggle theme', lang: 'العربية', menu: 'Menu', demo: 'Demo content: company, figures, certificates and prices are fictional and shown to illustrate the design.',
    top1: 'We answer quote requests within 24 working hours', top2: 'Cairo · Sun–Thu 9:00–17:00',
    n_products: 'Products', n_seasons: 'Seasons', n_logistics: 'Shipping', n_quality: 'Quality', n_markets: 'Markets', n_about: 'About', n_contact: 'Contact', rfq: 'Quote list', rfq_go: 'Request a quote',
    h_eye: 'Egyptian export house · citrus · cotton · marble', h1a: 'From the Egyptian farm ', h1b: 'to your port of discharge', h_p: 'We supply citrus, potatoes, grapes, pomegranates, cotton and marble to importers in the Gulf and Europe, with an inspection report, certificates and a temperature log on every shipment.', h_c1: 'Request a quote', h_c2: 'Browse products',
    qr_t: 'A quote in one minute', qr_p: 'Product', qr_d: 'Destination country', qr_n: 'Quantity (tonnes)', qr_go: 'Start request',
    st1: 'importing markets', st2: 'containers a year', st3: 'hours from harvest to cooling', st4: 'hours to answer a quote',
    s1_t: 'What we export', s1_p: 'Three sectors, each with specifications, reports and a clear season.', browse: 'View sector',
    s2_t: 'Available this month', s2_p: 'Varieties in season now ({m}).', s2_none: 'No fresh varieties are in season now. Cotton and marble are available all year.',
    s3_t: 'How an order moves', s3_p: 'Six stages from quote request to delivery.',
    steps: [['Quote request', 'You send product, quantity and port and we reply within 24 hours.'], ['Sample & spec', 'We send a sample and a specification sheet for approval.'], ['Contract & payment', 'Terms agreed, then a letter of credit or advance payment.'], ['Harvest & packing', 'Harvest, grading and cooling within 48 hours.'], ['Inspection & loading', 'Independent inspection and loading with temperature logging.'], ['Shipping & documents', 'Sailing and customs paperwork through to the port.']],
    s4_t: 'Sailing board', s4_p: 'Transit times are indicative and vary by season and carrier.', from: 'From port', all: 'All', th_dest: 'Destination', th_port: 'Loading port', th_days: 'Transit days', th_sail: 'Sailings / week', th_reefer: 'Reefer', yes: 'Yes', no: '—', d: 'days',
    s5_t: 'Quality through five gates', s5_p: 'Every shipment passes the same gates before it leaves port.',
    gates: [['Farm audit', 'Visit and record inputs and pesticides before harvest.'], ['Harvest check', 'Samples from every plot for maturity and size.'], ['Grading & packing', 'Machine and manual grading, packed to specification.'], ['Pre-shipment inspection', 'An independent inspector issues a report with photos.'], ['Temperature log', 'A logger inside the container is handed over with the documents.']], q_link: 'Certificates and documents',
    s6_t: 'Our markets', s6_p: 'Approximate share of shipment volume (demo data).', s7_t: 'What importers say', s7_p: 'Demo quotes for illustration.',
    faq_t: 'Importer FAQ',
    faq: [['What is the minimum order?', 'One 40ft container: reefer for fresh produce, dry for cotton, fabric and marble. Smaller trial lots of fresh produce are available on request.'], ['Can I get a sample?', 'Yes. Samples go by express courier within 5 working days, and fresh samples depend on the season.'], ['Which Incoterms do you offer?', 'FOB, CFR and CIF, and others on request.'], ['How are quality claims handled?', 'Every shipment carries an inspection report with photos and a temperature log. Claims are raised within 48 hours of discharge with photos and the log.'], ['What are the payment terms?', 'Letter of credit at sight, or 30% advance with the balance against documents, set in the contract.'], ['Which ports do you ship from?', 'Alexandria, Damietta, Port Said and Ain Sokhna depending on destination and product.']],
    cta_t: 'Ready for a quote?', cta_p: 'Add products to your quote list and we will reply with FOB and CIF prices within 24 working hours.',
    pr_t: 'Products', pr_p: 'Seven products with detailed specifications. Add what you need to your quote list.', f_sec: 'Sector', f_q: 'Search', f_q_ph: 'Search by name or HS code', none: 'No matching products.', add: 'Add to list', added: 'In list', t_add: 'Added to your quote list', t_view: 'View list', t_rm: 'Removed from the list', spec_btn: 'Specification', cmp_t: 'Quick comparison', th_prod: 'Product', th_hs: 'HS code', th_cont: 'Container', th_cap: '40ft load', th_moq: 'Minimum', th_seas: 'Season',
    sp_hs: 'HS code', sp_origin: 'Origin region', sp_var: 'Variety', sp_grade: 'Grade / size', sp_pack: 'Packing', sp_moq: 'Minimum order', sp_cont: 'Container type', sp_cap: '40ft container load', sp_shelf: 'Shelf life', sp_inc: 'Incoterms', sp_cert: 'Certificates', sp_season: 'Supply season', reefer: 'Reefer', dry: 'Dry', t_unit: 't', p_var: 'Choose a variety', p_sample: 'Request a sample', p_rel: 'Other products', p_spec: 'Specification sheet', crumb_h: 'Home',
    se_t: 'Supply seasons', se_p: 'Month-by-month calendar for every variety. The current month is marked.', se_leg1: 'Available', se_leg2: 'Out of season', se_year: 'Cotton, fabric and marble are available all year; cotton follows the September to November harvest.',
    lg_t: 'Shipping & logistics', lg_p: 'Four Egyptian ports, scheduled lanes to the Gulf and Europe, and loading with temperature logging.', lg_board: 'Weekly lanes', lg_calc: 'Container calculator', lg_calc_p: 'Work out containers and pallets for a given quantity.', c_prod: 'Product', c_qty: 'Quantity (tonnes)', r_cont: '40ft containers', r_pal: 'Pallets', r_ctn: 'Packs', r_fill: 'Last container fill', c_note: 'Estimate from standard packing; operations confirms the final figure.', c_err: 'Enter a quantity between 1 and 5000 tonnes',
    lg_inc: 'Incoterms', inc: [['FOB', 'Delivered on board at the Egyptian port. The buyer pays freight and insurance.'], ['CFR', 'We include freight to the port of discharge. Insurance is the buyer’s.'], ['CIF', 'We include freight and insurance to the port of discharge.']], lg_h: 'What we handle', lg_hl: ['Container and vessel space booking', 'Loading, lashing and temperature logging', 'Egyptian export and customs paperwork', 'Shipment tracking to arrival'],
    ql_t: 'Quality & certificates', ql_p: 'The certificates and documents procurement teams expect, available before the order and with every shipment.', ql_c: 'Certificates', ql_g: 'Quality gates', ql_d: 'Document centre', ql_dp: 'Request any document and it is added to your enquiry.', th_doc: 'Document', th_when: 'Availability', th_req: 'Request', req: 'Request', docs: [['phyto', 'Phytosanitary certificate', 'With every shipment'], ['coo', 'Certificate of origin / EUR.1', 'With every shipment'], ['insp', 'Pre-shipment inspection report', 'With every shipment'], ['temp', 'Temperature log (reefer)', 'With reefer shipments'], ['pack', 'Packing list & commercial invoice', 'With every shipment'], ['spec', 'Product specification sheet', 'Before ordering'], ['lab', 'Lab results (residues / fibre)', 'On request']], cert_for: 'For',
    mk_t: 'Markets', mk_p: 'We ship to six core markets on scheduled lanes. Shares are illustrative.', mk_ports: 'Discharge ports',
    ab_t: 'About Masar Export', ab_p: 'An Egyptian export house founded in 2011 that links farms, mills and quarries with importers, with one commitment: what we write in the specification is what arrives.', ab_h: 'How we work', ab_hl: [['Farm network', 'Partner farms in Beheira, Ismailia and Minya, audited before the season.'], ['Packing house', 'Grading and fast-cooling lines near Cairo, with cold stores close to the ports.'], ['Operations team', 'One account manager follows the order from contract to delivery.']], ab_n: 'Demo figures: founded 2011 · 120 partner farms · 3 packing houses',
    r_t: 'Request a quote', r_p: 'Add products, then send the details. This is a demo and nothing is transmitted.', r_list: 'Quote list', r_empty: 'The list is empty. Add a product below or from the products page.', r_add: 'Add to list', r_prod: 'Product', r_var: 'Variety', r_rm: 'Remove', r_details: 'Request details',
    f_co: 'Company name', f_name: 'Contact person', f_email: 'Email', f_phone: 'Phone / WhatsApp', f_country: 'Destination country', f_port: 'Port of discharge', f_inc: 'Incoterm', f_qty: 'Quantity', f_unit: 'Unit', u_t: 'tonnes', u_c: 'containers', f_freq: 'Order type', fr_once: 'One-off shipment', fr_month: 'Monthly shipments', fr_season: 'Seasonal contract', f_msg: 'Additional details', f_sample: 'I would like a sample first', f_choose: 'Choose', f_other: 'Other',
    e_req: 'This field is required', e_email: 'Enter a valid email', e_phone: 'Enter a valid phone number with country code', e_qty: 'Enter a quantity between 1 and 5000', e_list: 'Add at least one product to the list', e_fix: 'Please check the highlighted fields', send: 'Send request', ok_t: 'Request received (demo)', ok_p: 'Reference', ok_n: 'Nothing was sent because this is a demo. You can start another request.', ok_new: 'New request', docnote: 'Added to your message: {d}',
    c_t: 'Contact us', c_p: 'The sales team replies within 24 working hours.', c_addr: 'Address', addr: 'Industrial Zone, Obour City, Qalyubia, Egypt', c_hot: 'Hotline', c_mail: 'Email', c_hrs: 'Working hours', hrs: 'Sun–Thu · 9:00–17:00 Cairo time', c_form: 'Send a message', c_msg: 'Message', c_send: 'Send', c_ok: 'Message received (demo).',
    nf_t: 'Page not found', nf_p: 'That link does not exist. Go back to products or home.',
    ft_a: 'An Egyptian export house for citrus, potatoes, grapes, pomegranates, cotton and marble.', ft_co: 'Company', ft_pr: 'Products', ft_hot: 'Hotline', ft_rights: 'All rights reserved', ft_img: 'Images are AI-generated for illustration.'
  }
};
const CN = { ae: ['الإمارات', 'United Arab Emirates'], sa: ['السعودية', 'Saudi Arabia'], kw: ['الكويت', 'Kuwait'], qa: ['قطر', 'Qatar'], om: ['عُمان', 'Oman'], bh: ['البحرين', 'Bahrain'], it: ['إيطاليا', 'Italy'], de: ['ألمانيا', 'Germany'], nl: ['هولندا', 'Netherlands'], uk: ['المملكة المتحدة', 'United Kingdom'], fr: ['فرنسا', 'France'], es: ['إسبانيا', 'Spain'], other: ['أخرى', 'Other'] };
const FREQ = ['once', 'month', 'season'];
const INCS = ['FOB', 'CFR', 'CIF'];

/* ---------- state ---------- */
const S = { lang: 'ar', theme: 'light', rfq: [], menu: false };
const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } };
const prod = (id) => P.find(p => p.id === id);
const vari = (p, vid) => p && p.V.find(v => v.id === vid);
(() => {
  S.lang = load('ms_lang') === 'en' ? 'en' : 'ar';
  const th = load('ms_theme'); S.theme = th === 'dark' || th === 'light' ? th : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const r = load('ms_rfq');
  if (Array.isArray(r)) r.slice(0, 12).forEach(it => { const p = it && prod(it.p); if (p && vari(p, it.v) && !S.rfq.some(x => x.p === it.p && x.v === it.v)) S.rfq.push({ p: it.p, v: it.v }); });
})();
const t = (k) => { const v = T[S.lang][k]; return v === undefined ? k : v; };
const pick = (o) => o[S.lang];
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (o[k] === undefined ? m : o[k]));
const num = (n, d) => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US', { maximumFractionDigits: d === undefined ? 1 : d }).format(n);
const cname = (c) => CN[c] ? CN[c][S.lang === 'ar' ? 0 : 1] : c;
const inRfq = (p, v) => S.rfq.some(x => x.p === p && x.v === v);
const saveRfq = () => save('ms_rfq', S.rfq);
const NOW = () => new Date().getMonth() + 1;
const pname = (p) => pick(p);

/* ---------- DOM helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) {
    const v = props[k]; if (v === undefined || v === null || v === false) continue;
    if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v);
  }
  add(e, kids); return e;
}
function add(e, kids) { for (const c of kids.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); } }
const ICON = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  route: '<path d="M4 19 10 7l4 7 2-3 4 8"/>', plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="m5 12 5 5 9-10"/>', doc: '<path d="M7 3h7l4 4v14H7zM14 3v4h4M9 12h6M9 16h6"/>', trash: '<path d="M5 7h14M10 7V4h4v3m-7 0 1 13h8l1-13"/>', phone: '<path d="M6 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5L16 12.5 20 14v4a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z"/>'
};
function ic(n, cls) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'ic' + (cls ? ' ' + cls : '')); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICON[n] || ''; return s; } // ICON values are constants defined above
let toastT;
function toast(msg, href, label) {
  let e = document.getElementById('toast'); if (!e) { e = h('div', { id: 'toast', class: 'toast', role: 'status' }); document.body.append(e); }
  e.replaceChildren(h('span', null, msg), href ? h('a', { href, onclick: () => { e.hidden = true; } }, label) : null); e.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { e.hidden = true; }, 3600);
}
let keepNext = false;
const go = (hash) => { keepNext = true; location.hash = hash; };

/* ---------- shared parts ---------- */
function sh(no, title, p, level) { return h('div', { class: 'sh' }, h('span', { class: 'no', 'aria-hidden': 'true', text: no }), h(level || 'h2', { text: title }), p ? h('p', { text: p }) : null); }
function fig(src, alt) { return h('div', { class: 'fig' }, h('img', { src: IMG + src + '.webp', alt: alt || '', loading: 'lazy', decoding: 'async', width: 1024, height: 768 })); }
function mrow(mo) { const n = NOW(); return h('div', { class: 'mrow', role: 'img', 'aria-label': MONTHS[S.lang].filter((m, i) => mo[i]).join(', ') || '—' }, MONTHS[S.lang].map((m, i) => h('span', { class: (mo[i] ? 'on' : '') + (i + 1 === n ? ' now' : ''), text: m.slice(0, S.lang === 'ar' ? 4 : 3) }))); }
function seasonText(p) { const set = new Set(); p.V.forEach(v => v.mo.forEach((x, i) => { if (x) set.add(i); })); const a = [...set].sort((x, y) => x - y); if (a.length === 12) return S.lang === 'ar' ? 'طوال العام' : 'All year'; const L = MONTHS[S.lang]; const runs = []; let s = a[0], pr = a[0]; for (let i = 1; i <= a.length; i++) { if (a[i] !== pr + 1) { runs.push(s === pr ? L[s] : `${L[s]}–${L[pr]}`); s = a[i]; } pr = a[i]; } return runs.join(' · '); }
function toggleRfq(p, v, silent) {
  const i = S.rfq.findIndex(x => x.p === p && x.v === v);
  if (i >= 0) { S.rfq.splice(i, 1); saveRfq(); updateBadges(); if (!silent) toast(t('t_rm')); return false; }
  if (S.rfq.length >= 12) return true;
  S.rfq.push({ p, v }); saveRfq(); updateBadges(); if (!silent) toast(t('t_add'), '#/rfq', t('t_view')); return true;
}
function pcard(p, lvl) {
  const v0 = p.V[0], btn = h('button', { class: 'btn btn--o btn--sm', type: 'button', 'aria-pressed': String(inRfq(p.id, v0.id)) }, ic(inRfq(p.id, v0.id) ? 'check' : 'plus'), h('span', { text: inRfq(p.id, v0.id) ? t('added') : t('add') }));
  btn.addEventListener('click', () => { toggleRfq(p.id, v0.id); const on = inRfq(p.id, v0.id); btn.setAttribute('aria-pressed', String(on)); btn.replaceChildren(ic(on ? 'check' : 'plus'), h('span', { text: on ? t('added') : t('add') })); });
  return h('article', { class: 'pc' }, fig(p.img, ''), h('div', { class: 'b' },
    h('div', { class: 'meta' }, h('span', { class: 'tag' }, 'HS ', h('span', { class: 'num', text: p.hs })), h('span', { class: 'tag', text: t(p.cont) })),
    h(lvl || 'h3', null, h('a', { href: '#/p/' + p.id }, pname(p))), h('p', { text: pick(p.d) }), h('p', { class: 'mono', text: `${p.V.map(v => pick(v)).join(' · ')}` }),
    h('div', { class: 'act' }, btn, h('a', { class: 'link', href: '#/p/' + p.id }, t('spec_btn'), ic('arrow', 'flip')))));
}
function faqList() { return h('div', { class: 'faq' }, t('faq').map(([q, a]) => h('details', null, h('summary', { text: q }), h('p', { text: a })))); }
function field(label, control, id, extra) { return h('div', { class: 'fld' + (extra ? ' ' + extra : '') }, h('label', { for: id, text: label }), control, h('div', { class: 'err', id: id + '-e', role: 'alert' })); }
const opt = (v, txt, sel) => h('option', { value: v, selected: sel ? true : undefined, text: txt });
function setErr(ctrl, msg) { const e = document.getElementById(ctrl.id + '-e'); if (e) e.textContent = msg || ''; if (msg) { ctrl.setAttribute('aria-invalid', 'true'); ctrl.setAttribute('aria-describedby', ctrl.id + '-e'); } else { ctrl.removeAttribute('aria-invalid'); ctrl.removeAttribute('aria-describedby'); } return !msg; }
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/, PHONE = /^\+?[0-9][0-9 ()\-]{6,19}$/;

/* ---------- views ---------- */
function laneBoard(origin, onOrigin, limit) {
  const rows = LANES.filter(l => origin === 'all' || l[0] === origin);
  const tb = h('div', { class: 'tabs', role: 'group', 'aria-label': t('from') }, ['all', ...Object.keys(PORTS)].map(k => h('button', { type: 'button', 'aria-pressed': String(origin === k), 'data-k': 'o-' + k, onclick: () => onOrigin(k) }, k === 'all' ? t('all') : pick(PORTS[k]))));
  return h('div', { class: 'board' }, h('div', { class: 'board__h' }, h('h3', { text: t('s4_t') }), tb),
    h('div', { class: 'scroll', tabindex: 0, role: 'region', 'aria-label': t('s4_t') }, h('table', null, h('caption', { class: 'sr', text: t('s4_t') }),
      h('thead', null, h('tr', null, ['th_dest', 'th_port', 'th_days', 'th_sail', 'th_reefer'].map(k => h('th', { scope: 'col', text: t(k) })))),
      h('tbody', null, rows.slice(0, limit || 99).map(l => { const d = DEST[l[1]]; return h('tr', null, h('td', null, pick(d), ' · ', cname(d.c)), h('td', { text: pick(PORTS[l[0]]) }), h('td', { class: 'd' }, h('span', { class: 'num', text: R(l[2][0], l[2][1]) }), ' ', t('d')), h('td', null, h('span', { class: 'num', text: l[3] })), h('td', { class: l[4] ? 'ok' : '', text: l[4] ? t('yes') : t('no') })); })))));
}
function vHome() {
  const n = NOW(), seas = [];
  P.forEach(p => { if (p.sec !== 'produce') return; p.V.forEach(v => { if (v.mo[n - 1]) seas.push([p, v]); }); });
  let origin = 'all'; const holder = h('div'); const draw = () => holder.replaceChildren(laneBoard(origin, (k) => { origin = k; draw(); const b = holder.querySelector('[data-k="o-' + k + '"]'); if (b) b.focus(); }, 8)); draw();
  const sel = h('select', { class: 'in', id: 'qp' }, P.map(p => opt(p.id, pname(p)))), dsel = h('select', { class: 'in', id: 'qd' }, COUNTRIES.map(c => opt(c, cname(c)))), qn = h('input', { class: 'in', id: 'qn', type: 'number', inputmode: 'numeric', min: 1, max: 5000, value: 20 });
  const qr = h('form', { class: 'qr', novalidate: true, onsubmit: (e) => { e.preventDefault(); const q = Math.floor(+qn.value); go(`#/rfq?p=${sel.value}&d=${dsel.value}&n=${q >= 1 && q <= 5000 ? q : 20}`); } },
    h('h2', { text: t('qr_t') }), field(t('qr_p'), sel, 'qp'), h('div', { class: 'row' }, field(t('qr_d'), dsel, 'qd'), field(t('qr_n'), qn, 'qn')), h('button', { class: 'btn btn--or btn--w', type: 'submit' }, t('qr_go'), ic('arrow', 'flip')));
  const stats = [[26, 'st1'], [num(1400, 0), 'st2'], [48, 'st3'], [24, 'st4']];
  return [
    h('section', { class: 'hero' }, h('div', { class: 'hero__bg' }, h('img', { src: IMG + 'hero.webp', alt: '', width: 1024, height: 572, fetchpriority: 'high' })),
      h('div', { class: 'wrap' }, h('div', null, h('p', { class: 'mono', text: t('h_eye') }), h('h1', null, t('h1a'), h('em', { text: t('h1b') })), h('p', { text: t('h_p') }), h('div', { class: 'hero__cta' }, h('a', { class: 'btn btn--or', href: '#/rfq' }, t('h_c1'), ic('arrow', 'flip')), h('a', { class: 'btn btn--o', href: '#/products' }, t('h_c2')))), qr)),
    h('div', { class: 'stats' }, h('div', { class: 'wrap' }, stats.map(([v, k]) => h('div', { class: 'stat' }, h('b', { text: String(v) }), h('span', { text: t(k) }))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('01', t('s1_t'), t('s1_p')), h('div', { class: 'sectors' }, SEC.map(s => h('article', { class: 'sector' }, fig(s.img, ''), h('div', { class: 'b' }, h('h3', null, h('a', { href: '#/products?s=' + s.id }, pick(s))), h('p', { text: pick(s.d) }), h('span', { class: 'link' }, t('browse'), ic('arrow', 'flip')))))))),
    h('section', { class: 'sec', style: 'padding-block-start:0' }, h('div', { class: 'wrap' }, sh('02', t('s2_t'), fmt(t('s2_p'), { m: MONTHS[S.lang][n - 1] })), seas.length ? h('div', { class: 'season-now' }, seas.map(([p, v]) => h('a', { class: 'chip', href: `#/p/${p.id}?v=${v.id}` }, h('i', { 'aria-hidden': 'true' }), `${pick(v)} · ${pname(p)}`))) : h('p', { class: 'note', text: t('s2_none') }))),
    h('section', { class: 'sec', style: 'background:var(--s1);border-block:2px solid var(--ink)' }, h('div', { class: 'wrap' }, sh('03', t('s3_t'), t('s3_p')), h('ol', { class: 'steps' }, t('steps').map(([a, b]) => h('li', null, h('h3', { text: a }), h('p', { text: b })))))),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('04', t('s4_t'), t('s4_p')), holder, h('p', { style: 'margin-block-start:1.2rem' }, h('a', { class: 'link', href: '#/logistics' }, t('n_logistics'), ic('arrow', 'flip'))))),
    h('section', { class: 'sec', style: 'padding-block-start:0' }, h('div', { class: 'wrap' }, sh('05', t('s5_t'), t('s5_p')), h('div', { class: 'split' }, fig('inspect', ''), h('div', { class: 'stack' }, h('ol', { class: 'gates' }, t('gates').map(([a, b]) => h('li', null, h('div', null, h('h3', { text: a }), h('p', { text: b }))))), h('a', { class: 'link', href: '#/quality' }, t('q_link'), ic('arrow', 'flip')))))),
    h('section', { class: 'sec', style: 'background:var(--s1);border-block:2px solid var(--ink)' }, h('div', { class: 'wrap' }, sh('06', t('s6_t'), t('s6_p')), marketBars())),
    h('section', { class: 'sec' }, h('div', { class: 'wrap' }, sh('07', t('s7_t'), t('s7_p')), h('div', { class: 'rev' }, REVIEWS.map(r => h('blockquote', null, h('p', { text: pick(r.t) }), h('cite', { text: pick(r.n) })))))),
    h('section', { class: 'sec', style: 'padding-block-start:0' }, h('div', { class: 'wrap' }, sh('08', t('faq_t')), faqList())),
    cta()
  ];
}
function marketBars() { return h('div', { class: 'bars' }, MKT.map(m => h('div', { class: 'bar' }, h('span', { text: pick(m) }), h('i', { role: 'img', 'aria-label': pick(m) + ' ' + m.share + '%' }, h('b', { style: `inline-size:${m.share}%` })), h('span', { class: 'p num', text: m.share + '%' })))); }
function cta() { return h('section', { class: 'cta' }, h('div', { class: 'wrap' }, h('div', null, h('h2', { text: t('cta_t') }), h('p', { text: t('cta_p') })), h('a', { class: 'btn btn--p', href: '#/rfq' }, t('rfq_go'), ic('arrow', 'flip')))); }

function vProducts(q) {
  const s = SEC.some(x => x.id === q.s) ? q.s : 'all', term = (q.q || '').toLowerCase().trim();
  const list = P.filter(p => (s === 'all' || p.sec === s) && (!term || (p.ar + ' ' + p.en + ' ' + p.hs + ' ' + p.V.map(v => v.ar + ' ' + v.en).join(' ')).toLowerCase().includes(term)));
  const seg = h('div', { class: 'seg', role: 'group', 'aria-label': t('f_sec') }, [['all', t('all')], ...SEC.map(x => [x.id, pick(x)])].map(([k, l]) => h('button', { type: 'button', 'aria-pressed': String(s === k), onclick: () => go('#/products' + (k === 'all' ? '' : '?s=' + k) + (term ? (k === 'all' ? '?' : '&') + 'q=' + encodeURIComponent(term) : '')) }, l)));
  const inp = h('input', { class: 'in', id: 'fq', type: 'search', placeholder: t('f_q_ph'), value: q.q || '', maxlength: 40 }); inp.addEventListener('change', () => go('#/products?' + [s !== 'all' ? 's=' + s : '', inp.value.trim() ? 'q=' + encodeURIComponent(inp.value.trim().slice(0, 40)) : ''].filter(Boolean).join('&')));
  return h('div', { class: 'wrap sec' }, sh('', t('pr_t'), t('pr_p'), 'h1'), h('div', { class: 'filters' }, seg, h('div', { class: 'fld' }, h('label', { for: 'fq', text: t('f_q') }), inp)),
    list.length ? h('div', { class: 'grid' }, list.map(p => pcard(p, 'h2'))) : h('p', { class: 'empty', text: t('none') }),
    h('h2', { style: 'margin-block:3rem 1rem', text: t('cmp_t') }),
    h('div', { class: 'scroll', tabindex: 0, role: 'region', 'aria-label': t('cmp_t') }, h('table', { class: 'tbl' }, h('caption', { class: 'sr', text: t('cmp_t') }), h('thead', null, h('tr', null, ['th_prod', 'th_hs', 'th_cont', 'th_cap', 'th_moq', 'th_seas'].map(k => h('th', { scope: 'col', text: t(k) })))),
      h('tbody', null, P.map(p => h('tr', null, h('th', { scope: 'row' }, h('a', { href: '#/p/' + p.id }, pname(p))), h('td', { class: 'num', text: p.hs }), h('td', { text: t(p.cont) }), h('td', null, h('span', { class: 'num', text: num(p.t) }), ' ', t('t_unit')), h('td', { text: pick(p.moq) }), h('td', { text: seasonText(p) })))))));
}
function vProduct(id, q) {
  const p = prod(id); if (!p) return v404();
  const v = vari(p, q.v) || p.V[0], other = P.filter(x => x.id !== p.id).slice(0, 3);
  const vs = h('div', { class: 'vsel', role: 'group', 'aria-label': t('p_var') }, p.V.map(x => h('button', { type: 'button', 'aria-pressed': String(x.id === v.id), onclick: () => go(`#/p/${p.id}?v=${x.id}`) }, pick(x))));
  const addB = h('button', { class: 'btn btn--or', type: 'button' }); const paint = () => { const on = inRfq(p.id, v.id); addB.replaceChildren(ic(on ? 'check' : 'plus'), h('span', { text: on ? t('added') : t('add') })); addB.setAttribute('aria-pressed', String(on)); }; paint();
  addB.addEventListener('click', () => { toggleRfq(p.id, v.id); paint(); });
  const rows = [['sp_hs', h('span', { class: 'num', text: p.hs })], ['sp_origin', pick(p.origin)], ['sp_var', pick(v)], ['sp_grade', pick(v.g)], ['sp_pack', pick(p.pack)], ['sp_moq', pick(p.moq)], ['sp_cont', t(p.cont)], ['sp_cap', h('span', null, h('span', { class: 'num', text: num(p.t) }), ' ', t('t_unit'))], ['sp_shelf', pick(p.shelf)], ['sp_inc', p.inc.join(' · ')]];
  return h('div', { class: 'wrap sec' }, h('nav', { class: 'crumb', 'aria-label': 'Breadcrumb' }, h('a', { href: '#/' }, t('crumb_h')), '/', h('a', { href: '#/products' }, t('n_products')), '/', h('span', { text: pname(p) })),
    h('div', { class: 'pdp' }, fig(p.img, pname(p)), h('div', { class: 'stack' },
      h('span', { class: 'tag tag--or', text: pick(SEC.find(x => x.id === p.sec)) }), h('h1', { id: 'pt', tabindex: '-1', text: pname(p) }), h('p', { class: 'lead', text: pick(p.d) }),
      h('div', { class: 'fld' }, h('span', { class: 'lb', text: t('p_var') }), vs), h('div', { class: 'fld' }, h('span', { class: 'lb', text: t('sp_season') }), mrow(v.mo)),
      h('div', { style: 'display:flex;gap:.7rem;flex-wrap:wrap' }, addB, h('a', { class: 'btn btn--o', href: `#/rfq?p=${p.id}&v=${v.id}&smp=1` }, t('p_sample')), h('a', { class: 'btn btn--p', href: '#/rfq' }, t('rfq_go'))),
      h('h2', { style: 'font-size:1.3rem;margin-block-start:.6rem', text: t('p_spec') }),
      h('div', { class: 'scroll' }, h('table', { class: 'tbl' }, h('caption', { class: 'sr', text: t('p_spec') }), h('tbody', null, rows.map(([k, val]) => h('tr', null, h('th', { scope: 'row', text: t(k) }), h('td', null, val)))))),
      h('div', { class: 'fld' }, h('span', { class: 'lb', text: t('sp_cert') }), h('div', { class: 'certs' }, p.certs.map(c => h('span', { class: 'tag tag--ok', text: pick(CERTS[c]) })))))),
    h('h2', { style: 'margin-block:3rem 1.2rem', text: t('p_rel') }), h('div', { class: 'grid' }, other.map(x => pcard(x, 'h3'))));
}
function vSeasons(q) {
  const s = SEC.some(x => x.id === q.s) ? q.s : 'all', n = NOW();
  const seg = h('div', { class: 'seg', role: 'group', 'aria-label': t('f_sec') }, [['all', t('all')], ...SEC.map(x => [x.id, pick(x)])].map(([k, l]) => h('button', { type: 'button', 'aria-pressed': String(s === k), onclick: () => go('#/seasons' + (k === 'all' ? '' : '?s=' + k)) }, l)));
  const body = []; P.filter(p => s === 'all' || p.sec === s).forEach(p => { body.push(h('tr', { class: 'grp' }, h('th', { colspan: 13, scope: 'colgroup', style: 'padding-block-start:1rem', text: pname(p) }))); p.V.forEach(v => body.push(h('tr', null, h('th', { scope: 'row' }, h('a', { href: `#/p/${p.id}?v=${v.id}` }, pick(v))), v.mo.map((x, i) => h('td', { class: x ? 'on' : '', 'aria-label': MONTHS[S.lang][i] + ': ' + (x ? t('se_leg1') : t('se_leg2')) }))))); });
  return h('div', { class: 'wrap sec' }, sh('', t('se_t'), t('se_p'), 'h1'), h('div', { class: 'filters' }, seg),
    h('div', { class: 'scroll', tabindex: 0, role: 'region', 'aria-label': t('se_t') }, h('table', { class: 'cal' }, h('caption', { class: 'sr', text: t('se_t') }), h('thead', null, h('tr', null, h('td'), MONTHS[S.lang].map((m, i) => h('th', { scope: 'col', class: i + 1 === n ? 'now' : '', text: m })))), h('tbody', null, body))),
    h('div', { class: 'leg' }, h('span', null, h('i'), t('se_leg1')), h('span', null, h('i', { class: 'e' }), t('se_leg2'))), h('p', { class: 'note', style: 'margin-block-start:.8rem', text: t('se_year') }));
}
function calcBox() {
  const ps = h('select', { class: 'in', id: 'cp' }, P.map(p => opt(p.id, pname(p)))), tn = h('input', { class: 'in', id: 'ct', type: 'number', inputmode: 'decimal', min: 1, max: 5000, value: 40 });
  const out = h('div', { class: 'res', 'aria-live': 'polite' });
  const upd = () => {
    const p = prod(ps.value), q = +tn.value;
    if (!(q >= 1 && q <= 5000)) { setErr(tn, t('c_err')); out.replaceChildren(); return; } setErr(tn, '');
    const nC = Math.ceil(q / p.t), fill = Math.round(((q / p.t) - Math.floor(q / p.t) || 1) * 100), kg = q * 1000;
    out.replaceChildren(
      h('div', null, h('b', { text: String(nC) }), h('span', { text: t('r_cont') })),
      h('div', null, h('b', { text: p.cpp ? num(Math.ceil(kg / (p.ctn * p.cpp)), 0) : '—' }), h('span', { text: t('r_pal') })),
      h('div', null, h('b', { text: p.ctn ? num(Math.ceil(kg / p.ctn), 0) : '—' }), h('span', { text: t('r_ctn') })),
      h('div', null, h('b', { text: fill + '%' }), h('span', { text: t('r_fill') })));
  };
  ps.addEventListener('change', upd); tn.addEventListener('input', upd); upd();
  return h('div', { class: 'box calc' }, h('div', { class: 'stack' }, h('h3', { text: t('lg_calc') }), h('p', { class: 'note', text: t('lg_calc_p') }), field(t('c_prod'), ps, 'cp'), field(t('c_qty'), tn, 'ct'), h('p', { class: 'note', text: t('c_note') })), out);
}
function vLogistics(q) {
  let origin = Object.keys(PORTS).includes(q.o) ? q.o : 'all'; const holder = h('div'); const draw = () => holder.replaceChildren(laneBoard(origin, (k) => { origin = k; draw(); const b = holder.querySelector('[data-k="o-' + k + '"]'); if (b) b.focus(); }));
  draw();
  return h('div', { class: 'wrap sec' }, sh('', t('lg_t'), t('lg_p'), 'h1'), h('h2', { style: 'margin-block-end:1rem', text: t('lg_board') }), holder,
    h('div', { class: 'two', style: 'margin-block-start:3rem' }, h('div', null, h('h2', { style: 'margin-block-end:1rem', text: t('lg_inc') }), h('table', { class: 'tbl' }, h('caption', { class: 'sr', text: t('lg_inc') }), h('tbody', null, t('inc').map(([k, d]) => h('tr', null, h('th', { scope: 'row', text: k }), h('td', { text: d }))))))
      , h('div', null, h('h2', { style: 'margin-block-end:1rem', text: t('lg_h') }), h('ul', { class: 'stack' }, t('lg_hl').map(x => h('li', { class: 'box', style: 'padding:.9rem 1.1rem;display:flex;gap:.7rem;align-items:center' }, ic('check'), x))), h('div', { class: 'fig', style: 'aspect-ratio:16/9;margin-block-start:1.2rem' }, h('img', { src: IMG + 'reefer.webp', alt: '', loading: 'lazy', width: 1024, height: 768 })))),
    h('div', { style: 'margin-block-start:3rem' }, h('h2', { style: 'margin-block-end:1rem', text: t('lg_calc') }), calcBox()));
}
function vQuality(q) {
  const certProds = (c) => P.filter(p => p.certs.includes(c)).map(pname).join(' · ');
  return h('div', { class: 'wrap sec' }, sh('', t('ql_t'), t('ql_p'), 'h1'),
    h('h2', { style: 'margin-block-end:1rem', text: t('ql_c') }), h('div', { class: 'mk' }, Object.keys(CERTS).map(c => h('div', { class: 'box' }, h('span', { class: 'tag tag--ok', text: pick(CERTS[c]) }), h('h3', { style: 'margin-block-start:.7rem', text: pick(CERTS[c].d ? { ar: CERTS[c].d.ar, en: CERTS[c].d.en } : CERTS[c]) }), h('p', { class: 'note', style: 'margin-block-start:.4rem', text: `${t('cert_for')}: ${certProds(c) || '—'}` })))),
    h('div', { class: 'split', style: 'margin-block-start:3rem' }, fig('packing', ''), h('div', null, h('h2', { style: 'margin-block-end:1rem', text: t('ql_g') }), h('ol', { class: 'gates' }, t('gates').map(([a, b]) => h('li', null, h('div', null, h('h3', { text: a }), h('p', { text: b }))))))),
    h('h2', { style: 'margin-block:3rem .4rem', text: t('ql_d') }), h('p', { class: 'note', style: 'margin-block-end:1rem', text: t('ql_dp') }),
    h('div', { class: 'scroll', tabindex: 0, role: 'region', 'aria-label': t('ql_d') }, h('table', { class: 'tbl' }, h('caption', { class: 'sr', text: t('ql_d') }), h('thead', null, h('tr', null, ['th_doc', 'th_when', 'th_req'].map(k => h('th', { scope: 'col', text: t(k) })))), h('tbody', null, t('docs').map(([id, n, w]) => h('tr', null, h('th', { scope: 'row' }, ic('doc'), ' ', n), h('td', { text: w }), h('td', null, h('a', { class: 'btn btn--o btn--sm', href: '#/rfq?doc=' + id }, t('req')))))))));
}
function vMarkets() {
  return h('div', { class: 'wrap sec' }, sh('', t('mk_t'), t('mk_p'), 'h1'), marketBars(),
    h('div', { class: 'mk', style: 'margin-block-start:2.5rem' }, MKT.map(m => h('div', { class: 'box' }, h('h2', { style: 'font-size:1.2rem', text: pick(m) }), h('p', { text: pick(m.n) }), h('p', { class: 'mono', style: 'margin-block-start:.6rem', text: `${t('mk_ports')}: ${m.p.map(x => pick(DEST[x])).join(' · ')}` })))));
}
function vAbout() {
  return h('div', { class: 'wrap sec' }, sh('', t('ab_t'), t('ab_p'), 'h1'),
    h('div', { class: 'split' }, fig('farm', ''), h('div', { class: 'stack' }, h('h2', { text: t('ab_h') }), t('ab_hl').map(([a, b]) => h('div', { class: 'box' }, h('h3', { text: a }), h('p', { class: 'note', text: b }))), h('p', { class: 'mono', text: t('ab_n') }))),
    h('div', { class: 'split', style: 'margin-block-start:2.5rem' }, h('div', { class: 'stack' }, h('h2', { text: t('s5_t') }), h('p', { class: 'note', text: t('s5_p') }), h('a', { class: 'link', href: '#/quality' }, t('q_link'), ic('arrow', 'flip'))), fig('packing', '')));
}
function vRfq(q) {
  // prefill from query (whitelisted + validated) — add the requested product once
  if (q.p && prod(q.p)) { const pp = prod(q.p), vv = vari(pp, q.v) ? q.v : pp.V[0].id; if (!inRfq(pp.id, vv) && S.rfq.length < 12) { S.rfq.push({ p: pp.id, v: vv }); saveRfq(); updateBadges(); } }
  const doc = t('docs').find(d => d[0] === q.doc), docTxt = doc ? doc[1] : '';
  const listBox = h('div');
  const renderList = () => listBox.replaceChildren(S.rfq.length ? h('ul', { class: 'ql' }, S.rfq.map(it => { const p = prod(it.p), v = vari(p, it.v); return h('li', null, h('img', { src: IMG + p.img + '.webp', alt: '', width: 64, height: 48 }), h('div', null, h('b', { text: pname(p) }), h('small', { text: pick(v) })), h('button', { class: 'ib2', type: 'button', 'aria-label': `${t('r_rm')}: ${pname(p)} ${pick(v)}`, onclick: () => { toggleRfq(it.p, it.v, true); renderList(); } }, ic('trash'))); })) : h('p', { class: 'empty', text: t('r_empty') }));
  renderList();
  const ap = h('select', { class: 'in', id: 'ap' }, P.map(p => opt(p.id, pname(p)))), av = h('select', { class: 'in', id: 'av' });
  const fillV = () => av.replaceChildren(...prod(ap.value).V.map(v => opt(v.id, pick(v)))); fillV(); ap.addEventListener('change', fillV);
  const addBtn = h('button', { class: 'btn btn--o', type: 'button', onclick: () => { if (!inRfq(ap.value, av.value)) { if (S.rfq.length >= 12) return; toggleRfq(ap.value, av.value, true); } renderList(); } }, ic('plus'), t('r_add'));
  const co = h('input', { class: 'in', id: 'rc', maxlength: 80, autocomplete: 'organization' }), nm = h('input', { class: 'in', id: 'rn', maxlength: 60, autocomplete: 'name' }), em = h('input', { class: 'in', id: 're', type: 'email', maxlength: 120, autocomplete: 'email', inputmode: 'email' }), ph = h('input', { class: 'in', id: 'rp', type: 'tel', maxlength: 24, autocomplete: 'tel', inputmode: 'tel', dir: 'ltr', placeholder: '+971 50 000 0000' });
  const dc = h('select', { class: 'in', id: 'rd' }, opt('', t('f_choose')), COUNTRIES.map(c => opt(c, cname(c), c === q.d))), dp = h('select', { class: 'in', id: 'rpt' }, opt('', t('f_choose')), Object.keys(DEST).map(k => opt(k, `${pick(DEST[k])} · ${cname(DEST[k].c)}`)), opt('other', t('f_other')));
  const inc = h('select', { class: 'in', id: 'ri' }, INCS.map(i => opt(i, i, i === q.i))), qty = h('input', { class: 'in', id: 'rq', type: 'number', inputmode: 'decimal', min: 1, max: 5000, value: q.n && +q.n >= 1 && +q.n <= 5000 ? Math.floor(+q.n) : '' }), un = h('select', { class: 'in', id: 'ru' }, opt('t', t('u_t')), opt('c', t('u_c')));
  const fr = h('select', { class: 'in', id: 'rf' }, FREQ.map(k => opt(k, t('fr_' + k)))), msg = h('textarea', { class: 'in', id: 'rm', maxlength: 600 }), smp = h('input', { type: 'checkbox', id: 'rs', checked: q.smp === '1' ? true : undefined }), hp = h('input', { class: 'hp', type: 'text', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' });
  if (docTxt) msg.value = fmt(t('docnote'), { d: docTxt });
  const status = h('div', { class: 'err', id: 'rs-e', role: 'alert' }), formWrap = h('div');
  const form = h('form', { class: 'form', novalidate: true }, field(t('f_co'), co, 'rc', 'half'), field(t('f_name'), nm, 'rn', 'half'), field(t('f_email'), em, 're', 'half'), field(t('f_phone'), ph, 'rp', 'half'), field(t('f_country'), dc, 'rd', 'half'), field(t('f_port'), dp, 'rpt', 'half'), field(t('f_inc'), inc, 'ri', 'half'), field(t('f_freq'), fr, 'rf', 'half'), field(t('f_qty'), qty, 'rq', 'half'), field(t('f_unit'), un, 'ru', 'half'), field(t('f_msg'), msg, 'rm'), h('label', { class: 'chk' }, smp, t('f_sample')), hp, status, h('button', { class: 'btn btn--or btn--w', type: 'submit' }, t('send'), ic('arrow', 'flip')));
  form.addEventListener('submit', (e) => {
    e.preventDefault(); const q2 = +qty.value;
    const checks = [[co, co.value.trim() ? '' : t('e_req')], [nm, nm.value.trim() ? '' : t('e_req')], [em, EMAIL.test(em.value.trim()) ? '' : t('e_email')], [ph, PHONE.test(ph.value.trim()) ? '' : t('e_phone')], [dc, dc.value ? '' : t('e_req')], [dp, dp.value ? '' : t('e_req')], [qty, q2 >= 1 && q2 <= 5000 ? '' : t('e_qty')]];
    let bad = null; checks.forEach(([c, m]) => { if (!setErr(c, m) && !bad) bad = c; });
    status.textContent = ''; if (!S.rfq.length) { status.textContent = t('e_list'); if (!bad) bad = addBtn; }
    if (bad) { if (!S.rfq.length || bad === addBtn) status.textContent = t('e_list'); else status.textContent = t('e_fix'); bad.focus(); return; }
    if (hp.value) return;
    const ref = 'MS-' + String(Math.floor(100000 + Math.random() * 900000));
    S.rfq = []; saveRfq(); updateBadges();
    formWrap.replaceChildren(h('div', { class: 'refbox', role: 'status' }, h('h2', { text: t('ok_t') }), h('p', { text: t('ok_p') }), h('span', { class: 'num', text: ref }), h('p', { class: 'note', style: 'color:inherit', text: t('ok_n') }), h('p', { style: 'margin-block-start:1rem' }, h('a', { class: 'btn btn--p', href: '#/rfq' }, t('ok_new')))));
    listBox.replaceChildren(); const fb = formWrap.querySelector('.refbox'); fb.setAttribute('tabindex', '-1'); fb.focus();
  });
  formWrap.append(form);
  return h('div', { class: 'wrap sec' }, sh('', t('r_t'), t('r_p'), 'h1'), h('div', { class: 'rfq' },
    h('div', { class: 'stack' }, h('h2', { style: 'font-size:1.3rem', text: t('r_list') }), listBox, h('div', { class: 'box stack' }, field(t('r_prod'), ap, 'ap'), field(t('r_var'), av, 'av'), addBtn)),
    h('div', null, h('h2', { style: 'font-size:1.3rem;margin-block-end:1rem', text: t('r_details') }), formWrap)));
}
function vContact() {
  const nm = h('input', { class: 'in', id: 'cn', maxlength: 60, autocomplete: 'name' }), em = h('input', { class: 'in', id: 'ce', type: 'email', maxlength: 120, autocomplete: 'email' }), ms = h('textarea', { class: 'in', id: 'cm', maxlength: 600 }), hp = h('input', { class: 'hp', type: 'text', name: 'website', tabindex: -1, autocomplete: 'off', 'aria-hidden': 'true' });
  const wrap = h('div'); const f = h('form', { class: 'form', novalidate: true }, field(t('f_name'), nm, 'cn', 'half'), field(t('f_email'), em, 'ce', 'half'), field(t('c_msg'), ms, 'cm'), hp, h('button', { class: 'btn btn--p', type: 'submit' }, t('c_send')));
  f.addEventListener('submit', (e) => { e.preventDefault(); const r = [[nm, nm.value.trim() ? '' : t('e_req')], [em, EMAIL.test(em.value.trim()) ? '' : t('e_email')], [ms, ms.value.trim() ? '' : t('e_req')]]; let bad = null; r.forEach(([c, m]) => { if (!setErr(c, m) && !bad) bad = c; }); if (bad) { bad.focus(); return; } if (hp.value) return; const ok = h('p', { class: 'okmsg', role: 'status', tabindex: -1, text: t('c_ok') }); wrap.replaceChildren(ok); ok.focus(); });
  wrap.append(f);
  return h('div', { class: 'wrap sec' }, sh('', t('c_t'), t('c_p'), 'h1'), h('div', { class: 'two' }, h('div', { class: 'box stack' },
    h('div', null, h('p', { class: 'mono', text: t('c_hot') }), h('a', { href: TEL, class: 'hot', style: 'font-family:var(--m);font-size:1.6rem;font-weight:500;display:inline-flex;min-block-size:44px;align-items:center', 'aria-label': HOT.split('').join(' ') }, h('bdi', { dir: 'ltr', text: HOT }))),
    h('div', null, h('p', { class: 'mono', text: t('c_mail') }), h('a', { href: 'mailto:' + MAIL, style: 'text-decoration:underline;display:inline-flex;min-block-size:44px;align-items:center' }, h('bdi', { dir: 'ltr', text: MAIL }))),
    h('div', null, h('p', { class: 'mono', text: t('c_addr') }), h('p', { text: t('addr') })), h('div', null, h('p', { class: 'mono', text: t('c_hrs') }), h('p', { text: t('hrs') }))),
    h('div', null, h('h2', { style: 'font-size:1.3rem;margin-block-end:1rem', text: t('c_form') }), wrap)));
}
function v404() { return h('div', { class: 'wrap sec' }, sh('', t('nf_t'), t('nf_p'), 'h1'), h('div', { style: 'display:flex;gap:.7rem;flex-wrap:wrap' }, h('a', { class: 'btn btn--p', href: '#/products' }, t('n_products')), h('a', { class: 'btn btn--o', href: '#/' }, t('crumb_h')))); }

/* ---------- chrome ---------- */
function brandEl() { return h('a', { class: 'brand', href: '#/', 'aria-label': `${t('brand')} ${t('sub')}` }, h('i', { 'aria-hidden': 'true' }, ic('route')), h('span', null, h('b', { text: t('brand') }), h('small', { text: t('sub') }))); }
const NAV = [['products', 'n_products'], ['seasons', 'n_seasons'], ['logistics', 'n_logistics'], ['quality', 'n_quality'], ['markets', 'n_markets'], ['about', 'n_about']];
function header(seg) {
  const lang = h('button', { class: 'ib', type: 'button', 'aria-label': 'Language', onclick: () => setLang(S.lang === 'ar' ? 'en' : 'ar') }, t('lang'));
  const th = h('button', { class: 'ib', type: 'button', 'aria-label': t('theme'), onclick: () => setTheme(S.theme === 'dark' ? 'light' : 'dark') }, ic(S.theme === 'dark' ? 'sun' : 'moon'));
  const rq = h('a', { class: 'rq', href: '#/rfq', 'aria-label': t('rfq') }, h('span', { class: 't', text: t('rfq') }), h('span', { class: 'n', 'data-n': 'rq', text: String(S.rfq.length) }));
  const mb = h('button', { class: 'ib mb', type: 'button', 'aria-expanded': String(S.menu), 'aria-controls': 'menu', 'aria-label': t('menu'), onclick: () => { S.menu = !S.menu; const m = document.getElementById('menu'); m.classList.toggle('open', S.menu); mb.setAttribute('aria-expanded', String(S.menu)); mb.replaceChildren(ic(S.menu ? 'x' : 'menu')); } }, ic(S.menu ? 'x' : 'menu'));
  const nav = h('nav', { class: 'nav', 'aria-label': 'Main' }, NAV.map(([k, l]) => h('a', Object.assign({ href: '#/' + k }, seg === k ? { 'aria-current': 'page' } : {}), t(l))));
  const menu = h('nav', { id: 'menu', class: 'menu' + (S.menu ? ' open' : ''), 'aria-label': 'Menu' }, [...NAV, ['contact', 'n_contact']].map(([k, l]) => h('a', Object.assign({ href: '#/' + k }, seg === k ? { 'aria-current': 'page' } : {}), t(l), ic('arrow', 'flip'))));
  return [h('aside', { class: 'top', 'aria-label': t('top1') }, h('div', { class: 'wrap' }, h('a', { class: 'tophot', href: TEL }, ic('phone'), h('bdi', { dir: 'ltr', text: HOT })), h('span', { class: 'hide-s', text: t('top1') + ' · ' + t('top2') }))), h('header', { class: 'hd' }, h('div', { class: 'wrap hd__in' }, brandEl(), nav, h('div', { class: 'hd__act' }, h('a', { class: 'ib hide-m', href: '#/contact' }, t('n_contact')), lang, th, rq, mb))), menu];
}
function footer() {
  return h('footer', { class: 'ft' }, h('div', { class: 'wrap' }, h('div', { class: 'ft__g' },
    h('div', null, brandEl(), h('p', { style: 'margin-block-start:.8rem', text: t('ft_a') })),
    h('div', null, h('h2', { text: t('ft_hot') }), h('a', { class: 'hot', href: TEL, 'aria-label': HOT.split('').join(' ') }, h('bdi', { dir: 'ltr', text: HOT })), h('a', { href: 'mailto:' + MAIL }, h('bdi', { dir: 'ltr', text: MAIL })), h('p', { text: t('hrs') })),
    h('div', null, h('h2', { text: t('ft_pr') }), P.slice(0, 4).map(p => h('a', { href: '#/p/' + p.id }, pname(p)))),
    h('div', null, h('h2', { text: t('ft_co') }), ['about', 'quality', 'logistics', 'markets', 'contact'].map(k => h('a', { href: '#/' + k }, t({ about: 'n_about', quality: 'n_quality', logistics: 'n_logistics', markets: 'n_markets', contact: 'n_contact' }[k]))))),
    h('div', { class: 'ft__b', text: `© 2026 ${t('brand')} ${t('sub')} · ${t('ft_rights')} · ${t('demo')} ${t('ft_img')}` })));
}
function updateBadges() { document.querySelectorAll('[data-n=rq]').forEach(n => { n.textContent = S.rfq.length; }); }
function setLang(l) { S.lang = l; save('ms_lang', l); route(true); }
function setTheme(th) { S.theme = th; save('ms_theme', th); document.documentElement.dataset.theme = th; route(true); }

/* ---------- router ---------- */
const QK = ['s', 'q', 'v', 'p', 'd', 'i', 'n', 'o', 'doc', 'smp'];
function parseQ(qs) { const o = {}; (qs || '').split('&').forEach(kv => { const [k, v] = kv.split('='); if (!QK.includes(k) || v === undefined) return; try { o[k] = decodeURIComponent(v.replace(/\+/g, ' ')).slice(0, 40); } catch (e) { /* ignore malformed */ } }); return o; }
let first = true;
function route(keep) {
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr'; document.documentElement.dataset.theme = S.theme;
  const raw = location.hash.replace(/^#\/?/, ''), [path, qs] = raw.split('?'), seg = path.split('/').filter(Boolean), q = parseQ(qs), s0 = seg[0] || '';
  S.menu = false; let view;
  switch (s0) {
    case '': view = vHome(); break; case 'products': view = vProducts(q); break; case 'p': view = vProduct(seg[1], q); break; case 'seasons': view = vSeasons(q); break; case 'logistics': view = vLogistics(q); break; case 'quality': view = vQuality(q); break; case 'markets': view = vMarkets(); break; case 'about': view = vAbout(); break; case 'rfq': view = vRfq(q); break; case 'contact': view = vContact(); break; default: view = v404();
  }
  const titles = { products: 'n_products', seasons: 'se_t', logistics: 'lg_t', quality: 'ql_t', markets: 'mk_t', about: 'ab_t', rfq: 'r_t', contact: 'c_t' };
  const p = s0 === 'p' ? prod(seg[1]) : null;
  document.title = s0 === '' ? (S.lang === 'ar' ? 'مسار للتصدير | موالح وقطن ورخام مصري للمستوردين' : 'Masar Export | Egyptian citrus, cotton and marble for importers') : `${p ? pname(p) : (titles[s0] ? t(titles[s0]) : t('nf_t'))} | ${t('brand')} ${t('sub')}`;
  document.getElementById('app').replaceChildren(h('a', { class: 'skip', href: '#main', onclick: (e) => { e.preventDefault(); document.getElementById('main').focus(); } }, t('skip')), ...header(s0), h('main', { id: 'main', tabindex: '-1' }, view), footer());
  const k = keep || keepNext; keepNext = false;
  if (!k && !first) { window.scrollTo(0, 0); const pt = document.getElementById('pt'); if (pt) pt.focus({ preventScroll: true }); }
  first = false;
}
window.addEventListener('hashchange', () => route());
route();
})();
