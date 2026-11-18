/* HAZE — content. Image names are fixed: replace img/<name>.webp to swap photography. */
window.D = (() => {
  const A = (ar, en) => ({ ar, en });
  const HOT = '+20 2 2736 5520', MAIL = 'hello@hazewear.com', WA = '+20 100 772 3318';
  const ADDR = A('٧ شارع النباتات، المعادي، القاهرة', '7 El Nabatat St, Maadi, Cairo');
  const CAT = [
    { id: 'hoodie', n: A('هوديز', 'Hoodies'), img: 'h1' }, { id: 'pants', n: A('بناطيل', 'Pants'), img: 'p1' },
    { id: 'wallet', n: A('محافظ', 'Wallets'), img: 'w2' }, { id: 'cap', n: A('كابات', 'Caps'), img: 'c1' }
  ];
  const BR = [
    { id: 'static', n: 'Static', o: A('الدروب الأحدث', 'The latest drop') }, { id: 'cloud', n: 'Cloud Club', o: A('طبعات حالمة', 'Dreamy prints') },
    { id: 'core', n: 'Core', o: A('أساسيات كل يوم', 'Everyday basics') }
  ];
  const COL = { lilac: ['#C9B6FF', A('لافندر', 'Lilac')], night: ['#1B1030', A('بنفسجي ليلي', 'Night')], cream: ['#F2EFE8', A('كريمي', 'Cream')], pink: ['#FF9AD5', A('بينك', 'Pink')], grey: ['#8A8A92', A('رمادي مغسول', 'Washed grey')], blue: ['#A8D8FF', A('أزرق بيبي', 'Baby blue')], denim: ['#7FA6D6', A('دينم', 'Denim')] };
  const SZ = ['S', 'M', 'L', 'XL'], ONE = ['One size'];
  const P = [
    { id: 'chrome-butterfly', i: 'h1', c: 'hoodie', b: 'static', p: 1590, k: ['lilac', 'night', 'cream'], s: SZ, nw: true, n: A('هودي الفراشة الكروم', 'Chrome Butterfly Hoodie'), d: A('أوفرسايز بفراشة كروم على الصدر. لوك مش هيتكرر.', 'Oversized with a chrome butterfly. Main character energy.'), m: A('٤٠٠ جرام قطن فرنش تيري، طباعة سيلك سكرين', '400 gsm French terry cotton, screen printed') },
    { id: 'melt-smile', i: 'h2', c: 'hoodie', b: 'static', p: 1590, k: ['night', 'lilac'], s: SZ, nw: true, n: A('هودي ميلت سمايل', 'Melt Smile Hoodie'), d: A('بنفسجي ليلي وسمايلي بينك ذايب. فايب.', 'Night violet with a melting pink smiley. Pure vibe.'), m: A('٤٠٠ جرام قطن فرنش تيري، طباعة سيلك سكرين', '400 gsm French terry cotton, screen printed') },
    { id: 'stargazer', i: 'h3', c: 'hoodie', b: 'cloud', p: 1490, k: ['cream', 'pink'], s: SZ, n: A('هودي ستارجيزر', 'Stargazer Hoodie'), d: A('سحاب وقمر ونجوم بألوان باستيل. للحالمين.', 'Pastel clouds, moon and stars. For the dreamers.'), m: A('٤٠٠ جرام قطن فرنش تيري، طباعة رقمية', '400 gsm French terry cotton, digital print') },
    { id: 'washed-cargo', i: 'p1', c: 'pants', b: 'core', p: 1390, k: ['grey', 'night'], s: SZ, n: A('بنطلون كارجو مغسول', 'Washed Cargo Pants'), d: A('كارجو واسع بجيوب كبيرة وغسلة فينتاج.', 'Baggy cargo, big pockets, vintage wash.'), m: A('١٠٠٪ قطن دينم', '100% cotton denim') },
    { id: 'parachute', i: 'p2', c: 'pants', b: 'static', p: 1290, k: ['night', 'lilac'], s: SZ, n: A('بنطلون باراشوت', 'Parachute Pants'), d: A('نايلون خفيف وواسع، تتحرك فيه براحتك.', 'Light, wide nylon. Move however you want.'), m: A('١٠٠٪ نايلون ريب ستوب', '100% ripstop nylon') },
    { id: 'wide-jeans', i: 'p3', c: 'pants', b: 'core', p: 1490, k: ['denim', 'night'], s: SZ, nw: false, n: A('جينز واسع', 'Wide Leg Jeans'), d: A('جينز أزرق فاتح بقصة واسعة. كلاسيك من غير ملل.', 'Light blue wide-leg jeans. Classic, never boring.'), m: A('١٠٠٪ قطن دينم', '100% cotton denim') },
    { id: 'chain-wallet', i: 'w1', c: 'wallet', b: 'core', p: 590, k: ['night'], s: ONE, n: A('محفظة كروت بسلسلة', 'Chain Card Wallet'), d: A('نايلون تقيل بسلسلة معدن. مش هيضيع.', 'Tough nylon with a metal chain. It stays put.'), m: A('نايلون كوردورا، سلسلة ستانلس', 'Cordura nylon, steel chain') },
    { id: 'lilac-zip', i: 'w2', c: 'wallet', b: 'static', p: 690, k: ['lilac', 'pink'], s: ONE, n: A('محفظة زيب لافندر', 'Lilac Zip Wallet'), d: A('جلد صناعي ناعم بسوستة كاملة. صغيرة وتشيل كل حاجة.', 'Soft vegan leather with a full zip. Small but holds it all.'), m: A('جلد صناعي، سوستة معدن', 'Vegan leather, metal zip') },
    { id: 'pink-trifold', i: 'w3', c: 'wallet', b: 'cloud', p: 520, k: ['pink', 'night'], s: ONE, nw: true, n: A('محفظة ثلاثية بينك', 'Pink Trifold Wallet'), d: A('نايلون بينك بزرار وجيوب للكروت. كيوت وعملي.', 'Pink nylon with a snap and card slots. Cute and useful.'), m: A('نايلون، زرار بلاستيك', 'Nylon, plastic snap') },
    { id: 'star-dad', i: 'c1', c: 'cap', b: 'cloud', p: 450, k: ['lilac', 'cream'], s: ONE, n: A('كاب النجمة', 'Star Dad Cap'), d: A('كاب مغسول بنجمة مطرزة. ببساطة تمام.', 'Washed cap with an embroidered star. Simple, done.'), m: A('١٠٠٪ قطن مغسول', '100% washed cotton') },
    { id: 'pop-trucker', i: 'c2', c: 'cap', b: 'static', p: 490, k: ['pink', 'night'], s: ONE, nw: true, n: A('كاب تراكر بوب', 'Pop Trucker Cap'), d: A('واجهة بينك وشبك بنفسجي ليلي. لافت من بعيد.', 'Pink front, night violet mesh. Turns heads.'), m: A('فوم وشبك بوليستر', 'Foam and polyester mesh') },
    { id: 'nylon-5p', i: 'c3', c: 'cap', b: 'core', p: 520, k: ['cream', 'blue'], s: ONE, n: A('كاب نايلون ٥ بانل', 'Nylon 5-Panel Cap'), d: A('كاب مسطّح خفيف للمشوار والخروجة.', 'A light flat-brim cap for every outing.'), m: A('١٠٠٪ نايلون', '100% nylon') }
  ];
  const JOURNAL = [
    { id: 'friends', i: 'l1', t: A('شلة الدروب', 'The drop crew'), p: A('', '') }, { id: 'wall', i: 'l2', t: A('كارجو وهودي', 'Cargo and a crop hoodie'), p: A('', '') },
    { id: 'street', i: 'hero', t: A('الشارع', 'The Street'), p: A('', '') }, { id: 'print', i: 'pr', t: A('جوه الطباعة', 'Inside the print shop'), p: A('', '') }
  ];
  const FAQ = [
    { q: A('الشحن بياخد قد إيه؟', 'How long is delivery?'), a: A('من يومين لأربعة أيام في القاهرة والجيزة، وحتى سبعة لباقي المحافظات. سريع.', 'Two to four working days in Cairo and Giza, up to seven elsewhere.') },
    { q: A('ينفع أرجّع أو أبدّل؟', 'Can I return or exchange?'), a: A('أيوه خلال ١٤ يوم، بس القطعة تكون ماتلبستش وعليها التاج.', 'Yes within 14 days, unworn with tags on.') },
    { q: A('أختار المقاس إزاي؟', 'How do I pick a size?'), a: A('الهوديز والبناطيل أوفرسايز. خد مقاسك العادي للوك الواسع، ومقاس أصغر لو عايزه أضيق.', 'Hoodies and pants run oversized. Take your usual size for the baggy look, one down for a closer fit.') },
    { q: A('الدفع عند الاستلام متاح؟', 'Is cash on delivery available?'), a: A('أيوه في كل المحافظات. هنكلمك نأكد الطلب قبل الشحن.', 'Yes, everywhere. We call to confirm before shipping.') }
  ];
  return { CAT, BR, COL, P, JOURNAL, FAQ, HOT, MAIL, WA, ADDR };
})();
