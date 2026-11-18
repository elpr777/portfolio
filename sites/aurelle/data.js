/* Aurelle — content. Image file names are fixed: replace img/<name>.webp to swap photography. */
window.D = (() => {
  const A = (ar, en) => ({ ar, en });
  const HOT = '+20 2 2736 4410', MAIL = 'care@aurelle-studio.com', WA = '+20 100 551 2040';
  const ADDR = A('٣ شارع الجزيرة، الزمالك، القاهرة', '3 El Gezira Street, Zamalek, Cairo');
  const CAT = [
    { id: 'knit', n: A('تريكو', 'Knitwear'), img: 'p02' }, { id: 'outer', n: A('ملابس خارجية', 'Outerwear'), img: 'p01' },
    { id: 'shirt', n: A('قمصان', 'Shirts'), img: 'p04' }, { id: 'trouser', n: A('بناطيل', 'Trousers'), img: 'p03' },
    { id: 'dress', n: A('فساتين', 'Dresses'), img: 'p05' }, { id: 'acc', n: A('إكسسوارات', 'Accessories'), img: 'p06' }
  ];
  const BR = [
    { id: 'verre', n: 'Maison Verre', o: A('باريس', 'Paris') }, { id: 'nord', n: 'Studio Nord', o: A('كوبنهاجن', 'Copenhagen') },
    { id: 'oma', n: 'Atelier Oma', o: A('ميلانو', 'Milan') }, { id: 'halden', n: 'Halden', o: A('ستوكهولم', 'Stockholm') },
    { id: 'sora', n: 'Sora', o: A('لشبونة', 'Lisbon') }, { id: 'linea', n: 'Linea Cairo', o: A('القاهرة', 'Cairo') }
  ];
  const COL = { camel: ['#b98f62', A('جملي', 'Camel')], ivory: ['#eee6d6', A('عاجي', 'Ivory')], black: ['#1b1917', A('أسود', 'Black')], char: ['#4a4846', A('فحمي', 'Charcoal')], sand: ['#cdbb9c', A('رملي', 'Sand')], white: ['#f7f5f0', A('أبيض', 'White')], olive: ['#5c6034', A('زيتي', 'Olive')], sky: ['#b9cde0', A('سماوي', 'Sky')], tan: ['#a8662f', A('عسلي', 'Tan')] };
  const SZ = ['XS', 'S', 'M', 'L'];
  const P = [
    { id: 'wool-coat', i: 'p01', c: 'outer', b: 'verre', p: 14500, k: ['camel', 'char'], s: SZ, n: A('معطف الصوف المزدوج', 'The Double-Breasted Coat'), d: A('معطف طويل من الصوف الثقيل بياقة مدببة وجيوب بغطاء.', 'A long coat in dense wool with peak lapels and flap pockets.'), m: A('١٠٠٪ صوف', '100% wool'), nw: 1 },
    { id: 'cashmere-knit', i: 'p02', c: 'knit', b: 'nord', p: 6800, k: ['ivory', 'char', 'black'], s: SZ, n: A('بلوفر الكشمير', 'The Cashmere Crew'), d: A('بلوفر بياقة مستديرة من كشمير ناعم، يلبس شتاءً بعد شتاء.', 'A soft cashmere crew neck made to be worn season after season.'), m: A('١٠٠٪ كشمير', '100% cashmere'), nw: 1 },
    { id: 'tailored-trouser', i: 'p03', c: 'trouser', b: 'halden', p: 5200, k: ['sand', 'black'], s: SZ, n: A('البنطلون الواسع المفصّل', 'The Tailored Trouser'), d: A('بنطلون بطيّتين وقصة واسعة وخصر مرتفع.', 'Pleated, wide-leg and high-waisted.'), m: A('٧٠٪ صوف، ٣٠٪ فيسكوز', '70% wool, 30% viscose'), nw: 1 },
    { id: 'classic-shirt', i: 'p04', c: 'shirt', b: 'oma', p: 3900, k: ['white', 'sky'], s: SZ, n: A('القميص الكلاسيكي', 'The Classic Shirt'), d: A('قميص بوبلين أبيض بياقة بأزرار وقصة مريحة.', 'A white poplin shirt with a button-down collar and an easy fit.'), m: A('١٠٠٪ قطن عضوي', '100% organic cotton') },
    { id: 'silk-slip', i: 'p05', c: 'dress', b: 'sora', p: 7400, k: ['black', 'ivory'], s: SZ, n: A('فستان الحرير', 'The Silk Slip Dress'), d: A('فستان حرير بحمّالات رفيعة وقصة مائلة تنسدل بخفة.', 'A bias-cut silk dress on slender straps that falls lightly.'), m: A('١٠٠٪ حرير', '100% silk'), nw: 1 },
    { id: 'leather-tote', i: 'p06', c: 'acc', b: 'linea', p: 12900, k: ['black'], s: ['One size'], n: A('حقيبة التوت الجلدية', 'The Leather Tote'), d: A('حقيبة جلد بقرة مهيكلة تتسع لجهاز لابتوب ٣٠ سم.', 'A structured full-grain leather tote that fits a 13-inch laptop.'), m: A('جلد طبيعي، بطانة قطنية', 'Full-grain leather, cotton lining') },
    { id: 'black-blazer', i: 'p07', c: 'outer', b: 'verre', p: 9800, k: ['black'], s: SZ, n: A('البليزر الأسود', 'The Black Blazer'), d: A('بليزر بزر واحد وكتف مضبوط وخصر ملتف.', 'A single-button blazer with a sharp shoulder and shaped waist.'), m: A('١٠٠٪ صوف خفيف', '100% light wool') },
    { id: 'olive-trouser', i: 'p08', c: 'trouser', b: 'halden', p: 4800, k: ['olive', 'black'], s: SZ, n: A('بنطلون التنسل الزيتي', 'The Fluid Trouser'), d: A('بنطلون واسع بنسيج ينسدل، بلا طيّات.', 'A wide, fluid trouser with a clean front.'), m: A('١٠٠٪ تنسل', '100% lyocell') },
    { id: 'merino-roll', i: 'p09', c: 'knit', b: 'nord', p: 5400, k: ['char', 'ivory'], s: SZ, n: A('بلوفر المارينو بياقة عالية', 'The Merino Roll Neck'), d: A('بياقة عالية وحياكة ناعمة تحافظ على الدفء.', 'A roll neck in fine merino for quiet warmth.'), m: A('١٠٠٪ مارينو', '100% merino') },
    { id: 'oxford-stripe', i: 'p10', c: 'shirt', b: 'oma', p: 3600, k: ['sky'], s: SZ, n: A('قميص الأكسفورد المخطط', 'The Striped Oxford'), d: A('خطوط رفيعة على قطن أكسفورد متين.', 'Fine stripes on a sturdy oxford cotton.'), m: A('١٠٠٪ قطن أكسفورد', '100% oxford cotton') },
    { id: 'cowl-gown', i: 'p11', c: 'dress', b: 'sora', p: 11200, k: ['black'], s: SZ, n: A('الفستان الطويل بظهر مفتوح', 'The Open-Back Gown'), d: A('كريب بأكمام طويلة وظهر منسدل لأمسيات هادئة.', 'Crepe with long sleeves and a draped back for quiet evenings.'), m: A('١٠٠٪ كريب فيسكوز', '100% viscose crepe'), nw: 1 },
    { id: 'crossbody', i: 'p12', c: 'acc', b: 'linea', p: 8600, k: ['tan'], s: ['One size'], n: A('حقيبة الكتف الصغيرة', 'The Small Crossbody'), d: A('جلد عسلي بقفل ذهبي وحزام قابل للتعديل.', 'Tan leather with a gold clasp and adjustable strap.'), m: A('جلد طبيعي', 'Full-grain leather') }
  ];
  const JOURNAL = [
    { id: 'less', i: 'ed1', t: A('فن القليل', 'The art of less'), p: A('خزانة أصغر، اختيارات أدق.', 'A smaller wardrobe, chosen with care.') },
    { id: 'home', i: 'ed2', t: A('بيت أهدأ', 'A calmer home'), p: A('ضوء وخامات وأشياء قليلة.', 'Light, materials and a few things.') },
    { id: 'intent', i: 'ed3', t: A('ارتداء بقصد', 'Dressing with intention'), p: A('قطعة واحدة تكفي الأمسية.', 'One piece is enough for the evening.') },
    { id: 'ritual', i: 'ed4', t: A('طقوس اليوم', 'Everyday rituals'), p: A('معطف ومشية وصباح بلا استعجال.', 'A coat, a walk and an unhurried morning.') }
  ];
  const FAQ = [
    { q: A('كم يستغرق الشحن؟', 'How long does delivery take?'), a: A('من يومين إلى أربعة أيام عمل داخل القاهرة والجيزة، وحتى سبعة أيام لباقي المحافظات.', 'Two to four working days in Cairo and Giza, up to seven elsewhere in Egypt.') },
    { q: A('هل يمكن الاستبدال أو الإرجاع؟', 'Can I exchange or return?'), a: A('نعم خلال أربعة عشر يومًا من الاستلام، بشرط أن تكون القطعة بحالتها وعليها الملصقات.', 'Yes, within fourteen days of receipt, provided the piece is unworn with its tags.') },
    { q: A('كيف أختار المقاس؟', 'How do I choose my size?'), a: A('القصّات مريحة قليلًا. إن كنت بين مقاسين فاختر الأصغر للبناطيل والأكبر للتريكو.', 'Cuts run slightly relaxed. Between sizes, take the smaller in trousers and the larger in knitwear.') },
    { q: A('هل الدفع عند الاستلام متاح؟', 'Is cash on delivery available?'), a: A('نعم داخل القاهرة والجيزة. نتصل بك لتأكيد الطلب قبل الشحن.', 'Yes in Cairo and Giza. We call to confirm your order before dispatch.') }
  ];
  return { CAT, BR, COL, P, JOURNAL, FAQ, HOT, MAIL, WA, ADDR };
})();
