/* Masar Export — fictional demo data (company, volumes, lanes, certificates and contacts are illustrative). */
window.D = (() => {
  const m = (...a) => { const r = Array(12).fill(0); a.forEach(x => { if (Array.isArray(x)) for (let i = x[0]; i <= x[1]; i++) r[i - 1] = 1; else r[x - 1] = 1; }); return r; };
  const SEC = [
    { id: 'produce', img: 'farm', ar: 'خضروات وفواكه طازجة', en: 'Fresh produce', d: { ar: 'موالح وبطاطس وعنب ورمان من مزارع الدلتا، تُعبّأ وتُبرّد وتُشحن خلال 48 ساعة من الحصاد.', en: 'Citrus, potatoes, grapes and pomegranates from Delta farms, packed, cooled and shipped within 48 hours of harvest.' } },
    { id: 'textile', img: 'cotton', ar: 'القطن والمنسوجات', en: 'Cotton & textiles', d: { ar: 'قطن طويل التيلة وأقمشة خام جاهزة للصباغة والتصنيع، بمواصفات معتمدة من المصانع.', en: 'Long-staple cotton and greige fabric ready for dyeing and converting, specified to mill requirements.' } },
    { id: 'stone', img: 'marble', ar: 'الرخام والحجر', en: 'Marble & stone', d: { ar: 'بلاطات وألواح من محاجر الجلالة والمنيا، مع تقرير جودة لكل شحنة وتغليف بحري آمن.', en: 'Slabs and tiles from Galala and Minya quarries, with a quality report per shipment and sea-safe crating.' } }
  ];
  const P = [
    { id: 'citrus', sec: 'produce', img: 'citrus', hs: '0805', cont: 'reefer', t: 19.8, ctn: 15, cpp: 60, pal: 22, certs: ['ggap', 'brc', 'phyto', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'موالح مصرية', en: 'Egyptian citrus', d: { ar: 'برتقال فالنسيا وأبو سرة وبرتقال يوسفي وليمون، فرز آلي بالحجم واللون ودرجة التحلية.', en: 'Valencia and Navel oranges, mandarins and lemons, machine-graded by size, colour and Brix.' },
      origin: { ar: 'البحيرة والإسماعيلية', en: 'Beheira & Ismailia' }, moq: { ar: 'حاوية 40 قدم مبرّدة', en: 'One 40ft reefer' }, pack: { ar: 'كرتون 15 كجم، 60 كرتونة في البالتة', en: '15 kg carton, 60 cartons per pallet' }, shelf: { ar: '4–6 أسابيع عند 4–6°م', en: '4–6 weeks at 4–6°C' },
      V: [
        { id: 'valencia', ar: 'فالنسيا', en: 'Valencia', mo: m([2, 6]), g: { ar: 'أحجام 56–88 · بركس 10.5+', en: 'Sizes 56–88 · Brix 10.5+' } },
        { id: 'navel', ar: 'أبو سرة', en: 'Navel', mo: m(11, 12, [1, 3]), g: { ar: 'أحجام 56–88 · بركس 11+', en: 'Sizes 56–88 · Brix 11+' } },
        { id: 'mandarin', ar: 'يوسفي', en: 'Mandarin', mo: m([11, 12], [1, 2]), g: { ar: 'أحجام 1–4 · بدون بذور تقريباً', en: 'Sizes 1–4 · near seedless' } },
        { id: 'lemon', ar: 'ليمون', en: 'Lemon', mo: m([10, 12], [1, 3]), g: { ar: 'أحجام 95–200 جم', en: 'Sizes 95–200 g' } }
      ] },
    { id: 'potato', sec: 'produce', img: 'potato', hs: '0701', cont: 'reefer', t: 22, ctn: 25, cpp: 40, pal: 22, certs: ['ggap', 'haccp', 'phyto', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'بطاطس طازجة', en: 'Fresh potatoes', d: { ar: 'أصناف المائدة والتصنيع، مغسولة ومفروزة، بشهادة خلو من النيماتودا عند الطلب.', en: 'Table and processing varieties, washed and graded, with nematode-free certification on request.' },
      origin: { ar: 'النوبارية والبحيرة', en: 'Nubaria & Beheira' }, moq: { ar: 'حاوية 40 قدم مبرّدة', en: 'One 40ft reefer' }, pack: { ar: 'أجولة شبكية 25 كجم أو كرتون 10 كجم', en: '25 kg mesh bags or 10 kg cartons' }, shelf: { ar: '6–8 أسابيع عند 6–8°م', en: '6–8 weeks at 6–8°C' },
      V: [
        { id: 'spunta', ar: 'سبونتا', en: 'Spunta', mo: m([1, 6], 12), g: { ar: 'قياس 40–70 مم', en: 'Size 40–70 mm' } },
        { id: 'cara', ar: 'كارا', en: 'Cara', mo: m([2, 6]), g: { ar: 'قياس 45–75 مم', en: 'Size 45–75 mm' } },
        { id: 'sweet', ar: 'بطاطا حلوة', en: 'Sweet potato', mo: m([9, 12], [1, 2]), g: { ar: 'قياس 200–500 جم', en: 'Size 200–500 g' } }
      ] },
    { id: 'grapes', sec: 'produce', img: 'grapes', hs: '0806', cont: 'reefer', t: 18.7, ctn: 8.5, cpp: 100, pal: 22, certs: ['ggap', 'brc', 'phyto', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'عنب مائدة', en: 'Table grapes', d: { ar: 'أصناف بدون بذور مبكرة ومتأخرة، تبريد سريع بالهواء المضغوط وأكياس SO₂ للشحن الطويل.', en: 'Early and late seedless varieties, forced-air pre-cooled with SO₂ pads for long voyages.' },
      origin: { ar: 'المنيا والصالحية', en: 'Minya & Salhia' }, moq: { ar: 'حاوية 40 قدم مبرّدة', en: 'One 40ft reefer' }, pack: { ar: 'كرتون 8.5 كجم، 100 كرتونة في البالتة', en: '8.5 kg carton, 100 cartons per pallet' }, shelf: { ar: '3–5 أسابيع عند 0–1°م', en: '3–5 weeks at 0–1°C' },
      V: [
        { id: 'flame', ar: 'فليم سيدلس', en: 'Flame Seedless', mo: m([5, 7]), g: { ar: 'عنقود 400–800 جم', en: 'Bunch 400–800 g' } },
        { id: 'superior', ar: 'سوبيريور', en: 'Superior', mo: m([6, 7]), g: { ar: 'حبة 18 مم+', en: 'Berry 18 mm+' } },
        { id: 'crimson', ar: 'كريمسون', en: 'Crimson Seedless', mo: m([7, 9]), g: { ar: 'حبة 17 مم+', en: 'Berry 17 mm+' } }
      ] },
    { id: 'pomegranate', sec: 'produce', img: 'pomegranate', hs: '0810', cont: 'reefer', t: 16.5, ctn: 5, cpp: 150, pal: 22, certs: ['ggap', 'haccp', 'phyto', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'رمان', en: 'Pomegranates', d: { ar: 'رمان أحمر داكن بقشرة سليمة، يُفرز بالوزن واللون ومعدل التشقق.', en: 'Deep red pomegranates with sound skin, graded by weight, colour and crack rate.' },
      origin: { ar: 'أسيوط والمنيا', en: 'Assiut & Minya' }, moq: { ar: 'حاوية 40 قدم مبرّدة', en: 'One 40ft reefer' }, pack: { ar: 'كرتون 5 كجم، 150 كرتونة في البالتة', en: '5 kg carton, 150 cartons per pallet' }, shelf: { ar: '8–12 أسبوعاً عند 5–7°م', en: '8–12 weeks at 5–7°C' },
      V: [
        { id: 'wonderful', ar: 'وندرفول', en: 'Wonderful', mo: m([9, 12]), g: { ar: 'وزن 350–600 جم', en: 'Weight 350–600 g' } },
        { id: 'manfalouty', ar: 'منفلوطي', en: 'Manfalouty', mo: m([8, 11]), g: { ar: 'وزن 300–500 جم', en: 'Weight 300–500 g' } }
      ] },
    { id: 'cotton', sec: 'textile', img: 'cotton', hs: '5201', cont: 'dry', t: 18, ctn: 227, cpp: 4, pal: 20, certs: ['iso9001', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'قطن خام طويل التيلة', en: 'Long-staple raw cotton', d: { ar: 'شعر قطن مضغوط في بالات قياسية، بتقرير تيلة ونعومة ونسبة رطوبة لكل بالة.', en: 'Lint cotton in standard pressed bales, with fibre length, micronaire and moisture report per bale.' },
      origin: { ar: 'الدلتا ومصر الوسطى', en: 'Delta & Middle Egypt' }, moq: { ar: 'حاوية 40 قدم جافة', en: 'One 40ft dry container' }, pack: { ar: 'بالة 227 كجم تقريباً مربوطة بشرائط', en: 'Bale of about 227 kg, strapped' }, shelf: { ar: 'تخزين جاف بدون حد زمني قريب', en: 'Dry storage, no near-term limit' },
      V: [
        { id: 'g86', ar: 'جيزة 86', en: 'Giza 86', mo: m([9, 12], [1, 6]), g: { ar: 'تيلة طويلة · خالية من الشوائب', en: 'Long staple · low trash' } },
        { id: 'g94', ar: 'جيزة 94', en: 'Giza 94', mo: m([9, 12], [1, 5]), g: { ar: 'تيلة طويلة جداً', en: 'Extra long staple' } }
      ] },
    { id: 'fabric', sec: 'textile', img: 'textile', hs: '5208', cont: 'dry', t: 20, ctn: 40, cpp: 20, pal: 20, certs: ['iso9001', 'oeko', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'أقمشة قطنية خام وفوط', en: 'Greige cotton fabric & towels', d: { ar: 'رولات قماش خام وبوبلين وتيري، وفوط قطنية بأوزان مختلفة، قابلة للطباعة والصباغة.', en: 'Greige poplin and terry rolls plus cotton towels in several weights, ready for printing and dyeing.' },
      origin: { ar: 'المحلة الكبرى والعاشر', en: 'El-Mahalla & 10th of Ramadan' }, moq: { ar: 'حاوية 40 قدم جافة', en: 'One 40ft dry container' }, pack: { ar: 'رولات 40–60 كجم أو كراتين فوط', en: '40–60 kg rolls or towel cartons' }, shelf: { ar: 'تخزين جاف', en: 'Dry storage' },
      V: [
        { id: 'poplin', ar: 'بوبلين خام 40s', en: 'Greige poplin 40s', mo: m([1, 12]), g: { ar: 'عرض 63 بوصة · 133×72', en: 'Width 63 in · 133×72' } },
        { id: 'terry', ar: 'تيري وفوط', en: 'Terry & towels', mo: m([1, 12]), g: { ar: '400–600 جم/م²', en: '400–600 gsm' } }
      ] },
    { id: 'marble', sec: 'stone', img: 'marble', hs: '6802', cont: 'dry', t: 25, ctn: 0, cpp: 0, pal: 0, certs: ['iso9001', 'coo'], inc: ['FOB', 'CFR', 'CIF'],
      ar: 'رخام مصري', en: 'Egyptian marble', d: { ar: 'ألواح وبلاطات مصقولة، تُفرز بالتعريق واللون، وتُغلّف في صناديق خشبية للشحن البحري.', en: 'Polished slabs and tiles graded by veining and tone and crated in timber bundles for sea freight.' },
      origin: { ar: 'الجلالة والمنيا', en: 'Galala & Minya' }, moq: { ar: 'حاوية 20 أو 40 قدم', en: 'One 20ft or 40ft container' }, pack: { ar: 'حزم خشبية، 20 لوحاً في الحزمة', en: 'Timber bundles, 20 slabs per bundle' }, shelf: { ar: 'لا ينطبق', en: 'Not applicable' },
      V: [
        { id: 'galala', ar: 'جلالة بيج', en: 'Galala Beige', mo: m([1, 12]), g: { ar: '2 سم · 240×120 سم', en: '2 cm · 240×120 cm' } },
        { id: 'sunny', ar: 'صني منيا', en: 'Sunny Menia', mo: m([1, 12]), g: { ar: 'بلاطات 60×60 و60×30', en: 'Tiles 60×60 and 60×30' } },
        { id: 'cream', ar: 'كريم', en: 'Cream', mo: m([1, 12]), g: { ar: '1.8–3 سم', en: '1.8–3 cm' } }
      ] }
  ];
  const MONTHS = {
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  const CERTS = {
    ggap: { ar: 'GLOBALG.A.P.', en: 'GLOBALG.A.P.', d: { ar: 'ممارسات زراعية جيدة في المزارع', en: 'Good agricultural practice on the farm' } },
    brc: { ar: 'BRC للأغذية', en: 'BRC Food', d: { ar: 'سلامة الغذاء في محطة التعبئة', en: 'Food safety at the packing house' } },
    haccp: { ar: 'HACCP', en: 'HACCP', d: { ar: 'تحليل المخاطر ونقاط التحكم', en: 'Hazard analysis and control points' } },
    iso9001: { ar: 'ISO 9001', en: 'ISO 9001', d: { ar: 'نظام إدارة الجودة', en: 'Quality management system' } },
    iso22000: { ar: 'ISO 22000', en: 'ISO 22000', d: { ar: 'إدارة سلامة الأغذية', en: 'Food safety management' } },
    oeko: { ar: 'OEKO-TEX 100', en: 'OEKO-TEX 100', d: { ar: 'خلو المنسوجات من المواد الضارة', en: 'Textiles tested for harmful substances' } },
    phyto: { ar: 'شهادة صحة نباتية', en: 'Phytosanitary certificate', d: { ar: 'من الحجر الزراعي المصري', en: 'Issued by Egyptian plant quarantine' } },
    coo: { ar: 'شهادة منشأ', en: 'Certificate of origin', d: { ar: 'EUR.1 أو غرفة التجارة حسب الوجهة', en: 'EUR.1 or chamber of commerce, by destination' } }
  };
  const PORTS = {
    alex: { ar: 'الإسكندرية', en: 'Alexandria' }, dam: { ar: 'دمياط', en: 'Damietta' }, sok: { ar: 'العين السخنة', en: 'Ain Sokhna' }, psd: { ar: 'بورسعيد', en: 'Port Said' }
  };
  const DEST = {
    jea: { ar: 'جبل علي', en: 'Jebel Ali', c: 'ae' }, jed: { ar: 'جدة', en: 'Jeddah', c: 'sa' }, dmm: { ar: 'الدمام', en: 'Dammam', c: 'sa' }, kwi: { ar: 'الشويخ', en: 'Shuwaikh', c: 'kw' },
    gen: { ar: 'جنوة', en: 'Genoa', c: 'it' }, rtm: { ar: 'روتردام', en: 'Rotterdam', c: 'nl' }, ham: { ar: 'هامبورج', en: 'Hamburg', c: 'de' }, fxt: { ar: 'فيليكستو', en: 'Felixstowe', c: 'uk' }
  };
  // from, to, days [min,max], weekly sailings, reefer available
  const LANES = [
    ['alex', 'gen', [4, 6], 5, 1], ['alex', 'rtm', [9, 12], 3, 1], ['alex', 'ham', [10, 13], 2, 1], ['alex', 'fxt', [11, 14], 2, 1],
    ['dam', 'gen', [4, 6], 4, 1], ['dam', 'rtm', [9, 12], 2, 1], ['dam', 'jed', [6, 9], 3, 1], ['dam', 'jea', [12, 16], 2, 1],
    ['sok', 'jed', [3, 5], 4, 1], ['sok', 'jea', [8, 11], 4, 1], ['sok', 'dmm', [10, 13], 3, 1], ['sok', 'kwi', [11, 14], 2, 0],
    ['psd', 'jea', [9, 12], 3, 1], ['psd', 'jed', [5, 8], 2, 1], ['psd', 'ham', [10, 13], 2, 1], ['psd', 'gen', [4, 6], 3, 1]
  ];
  const MKT = [
    { id: 'ae', share: 28, p: ['jea'], ar: 'الإمارات', en: 'United Arab Emirates', n: { ar: 'مركز إعادة التصدير لدول الخليج وآسيا.', en: 'Re-export hub for the Gulf and Asia.' } },
    { id: 'sa', share: 22, p: ['jed', 'dmm'], ar: 'السعودية', en: 'Saudi Arabia', n: { ar: 'طلب مستمر على الموالح والرمان طوال الموسم.', en: 'Steady demand for citrus and pomegranates all season.' } },
    { id: 'it', share: 14, p: ['gen'], ar: 'إيطاليا', en: 'Italy', n: { ar: 'أقصر خط بحري، 4–6 أيام من الإسكندرية.', en: 'Shortest sea lane, 4–6 days from Alexandria.' } },
    { id: 'de', share: 12, p: ['ham', 'rtm'], ar: 'ألمانيا وهولندا', en: 'Germany & Netherlands', n: { ar: 'عنب وبطاطس بمعايير تجزئة صارمة.', en: 'Grapes and potatoes to strict retailer standards.' } },
    { id: 'uk', share: 9, p: ['fxt'], ar: 'المملكة المتحدة', en: 'United Kingdom', n: { ar: 'موالح وقطن للمصانع.', en: 'Citrus and cotton for mills.' } },
    { id: 'kw', share: 6, p: ['kwi'], ar: 'الكويت', en: 'Kuwait', n: { ar: 'شحنات أسبوعية للموزعين.', en: 'Weekly consignments for distributors.' } }
  ];
  const COUNTRIES = ['ae', 'sa', 'kw', 'qa', 'om', 'bh', 'it', 'de', 'nl', 'uk', 'fr', 'es', 'other'];
  const REVIEWS = [
    { n: { ar: 'مشتري موالح · جبل علي', en: 'Citrus buyer · Jebel Ali' }, t: { ar: 'تقارير الفحص وصلت قبل السفينة، والبالتات مطابقة للمواصفات. هذا ما نحتاجه.', en: 'Inspection reports arrived before the vessel, and the pallets matched spec. That is what we need.' } },
    { n: { ar: 'مدير مشتريات · هامبورج', en: 'Procurement lead · Hamburg' }, t: { ar: 'درجات الحرارة موثّقة طوال الرحلة، وسهّل علينا ذلك قبول الشحنة.', en: 'Temperature logs covered the whole voyage, which made acceptance straightforward.' } },
    { n: { ar: 'مصنع غزل · المملكة المتحدة', en: 'Spinning mill · UK' }, t: { ar: 'نتائج التيلة قريبة جداً من التقرير المرفق في كل بالة.', en: 'Fibre results came very close to the report attached to each bale.' } }
  ];
  return { SEC, P, MONTHS, CERTS, PORTS, DEST, LANES, MKT, COUNTRIES, REVIEWS, HOT: '+20 2 3300 4455', MAIL: 'trade@masar-export.example' };
})();
