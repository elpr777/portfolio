/* Saraya — content. Availability is generated at runtime from the service pattern below. */
window.D = (() => {
  const A = (ar, en) => ({ ar, en });
  const HOT = '+20 2 2735 0088', MAIL = 'reservations@saraya-cairo.com', WA = '+20 100 772 3300';
  const ADDR = A('كورنيش النيل، جاردن سيتي، القاهرة', 'Corniche El Nil, Garden City, Cairo');

  const CAT = [
    { id: 'st', n: A('البدايات', 'Starters'), k: A('لقيمات أولى', 'First courses') },
    { id: 'ma', n: A('الأطباق الرئيسية', 'Mains'), k: A('من المطبخ الساخن', 'From the hot kitchen') },
    { id: 'de', n: A('الحلويات', 'Desserts'), k: A('ختام الأمسية', 'To close the evening') },
    { id: 'ca', n: A('الكافيه', 'Café'), k: A('من الثامنة صباحًا', 'From eight in the morning') },
    { id: 'dr', n: A('المشروبات', 'Drinks'), k: A('بدون كحول', 'Alcohol-free') }
  ];

  /* t: v vegetarian · gf gluten-free · sg signature · sp spicy */
  const MENU = [
    { id: 'tartare', c: 'st', p: 520, t: ['sg'], img: 'tartare', n: A('تارتار بقري بالدقة', 'Beef tartare, dukkah'), d: A('بقر مفروم يدويًا، صفار بيض السمان، بصل مخلل، دقة وبقدونس.', 'Hand-cut beef, quail yolk, pickled shallot, dukkah and parsley.'), pr: A('مع عصير رمان وزعتر', 'With pomegranate and thyme cooler'), al: ['egg', 'nuts'] },
    { id: 'onion', c: 'st', p: 380, t: ['v'], n: A('تارت البصل المكرمل', 'Caramelised onion tart'), d: A('عجين زبدة، بصل مكرمل ببطء، ريكوتا وعسل الزعتر.', 'Butter pastry, slow-caramelised onion, ricotta and thyme honey.'), pr: A('مع شاي أخضر بالنعناع', 'With green tea and mint'), al: ['gluten', 'milk'] },
    { id: 'prawn', c: 'st', p: 560, t: ['sp'], n: A('جمبري بالكمون والليمون المحفوظ', 'Cumin prawns, preserved lemon'), d: A('جمبري كبير بالشطة الخفيفة، زبدة الليمون المحفوظ وخبز مقرمش.', 'Large prawns, gentle chilli, preserved-lemon butter and crisp bread.'), pr: A('مع ليموناضة بالزنجبيل', 'With ginger lemonade'), al: ['shellfish', 'gluten', 'milk'] },
    { id: 'lentil', c: 'st', p: 290, t: ['v', 'gf'], n: A('كريمة العدس بالكمون الأسود', 'Lentil velouté, black cumin'), d: A('عدس أصفر، زيت الحبة السوداء، مقرمشات خبز.', 'Yellow lentil, black cumin oil, bread crisps.'), pr: A('كما هي', 'Best on its own'), al: [] },
    { id: 'rocket', c: 'st', p: 340, t: ['v', 'gf'], n: A('جرجير بالجبن الرومي', 'Rocket and aged Romi cheese'), d: A('جرجير، شرائح جبن رومي معتّق، تين، خل البلسميك الأبيض.', 'Rocket, shaved aged Romi cheese, fig, white balsamic.'), pr: A('مع مياه غازية بالتوت', 'With berry sparkling water'), al: ['milk'] },
    { id: 'bass', c: 'ma', p: 1450, t: ['sg', 'gf'], img: 'bass', n: A('قاروص بصوص الزعفران والكافيار', 'Sea bass, saffron beurre blanc, caviar'), d: A('فيليه قاروص مقرمش الجلد، صوص زعفران، كراث مشوي وكافيار.', 'Crisp-skinned sea bass, saffron butter sauce, charred leek and caviar.'), pr: A('مع تونيك الخيار والشبت', 'With cucumber-dill tonic'), al: ['fish', 'milk'] },
    { id: 'lamb', c: 'ma', p: 1650, t: ['sg'], img: 'lamb', n: A('ريش ضأن بعسل الرمان والدقة', 'Rack of lamb, pomegranate, dukkah'), d: A('ريش ضأن وردية، قشرة دقة، جزر مشوي ومعجون الباذنجان المدخن.', 'Pink lamb rack, dukkah crust, roasted carrots and smoked aubergine purée.'), pr: A('مع شاي الكركديه المعتّق', 'With aged hibiscus tea'), al: ['nuts', 'sesame'] },
    { id: 'beef', c: 'ma', p: 1900, t: ['gf'], n: A('فيليه بقري معتّق ٤٥ يومًا', '45-day aged beef fillet'), d: A('فيليه على الفحم، هريس البطاطس بالزبدة المحمّصة، صوص المرق.', 'Charcoal fillet, brown-butter potato purée, bone-broth jus.'), pr: A('مع عصير توت بري وحبق', 'With wild berry and basil'), al: ['milk'] },
    { id: 'duck', c: 'ma', p: 1350, t: [], n: A('بط بالفريك والتمر', 'Duck, freekeh and dates'), d: A('صدر بط محمّر، فريك بالسمن البلدي، تمر وصلصة البرتقال.', 'Seared duck breast, freekeh in ghee, dates and orange sauce.'), pr: A('مع قرفة وبرتقال مدخّن', 'With smoked orange and cinnamon'), al: ['gluten', 'milk'] },
    { id: 'truffle', c: 'ma', p: 980, t: ['v', 'gf'], n: A('أرز بالمشروم والكمأة', 'Mushroom rice, black truffle'), d: A('أرز مصري كريمي، مشروم برّي، كمأة سوداء وجبن بارميزان.', 'Creamy Egyptian rice, wild mushrooms, black truffle and parmesan.'), pr: A('مع تونيك الخيار والشبت', 'With cucumber-dill tonic'), al: ['milk'] },
    { id: 'prawn2', c: 'ma', p: 1250, t: ['sp'], n: A('جمبري ملكي مشوي', 'Grilled king prawns'), d: A('ثلاث جمبريات ملكية، زبدة الثوم والتوابل، أرز بالشعيرية.', 'Three king prawns, garlic-spice butter and vermicelli rice.'), pr: A('مع ليموناضة بالزنجبيل', 'With ginger lemonade'), al: ['shellfish', 'milk', 'gluten'] },
    { id: 'dome', c: 'de', p: 480, t: ['sg'], img: 'dessert', n: A('قبّة الشوكولاتة والتمر', 'Chocolate dome, date caramel'), d: A('شوكولاتة داكنة، قلب موس التمر، كراميل دافئ يُسكب على المائدة.', 'Dark chocolate, date mousse heart, warm caramel poured at the table.'), pr: A('مع قهوة تركي بالهيل', 'With cardamom Turkish coffee'), al: ['milk', 'egg', 'nuts'] },
    { id: 'omali', c: 'de', p: 420, t: ['v'], n: A('أم علي بالفستق', 'Om Ali, pistachio'), d: A('طبقات رقاق، حليب وقشطة، فستق محمّص وبسمة قرفة.', 'Layers of pastry, milk and cream, roasted pistachio and cinnamon.'), pr: A('مع شاي بالحبق', 'With basil tea'), al: ['gluten', 'milk', 'nuts'] },
    { id: 'kunafa', c: 'de', p: 380, t: ['v'], n: A('كنافة بآيس كريم الورد', 'Kunafa, rose ice cream'), d: A('كنافة مقرمشة، جبن عكاوي، آيس كريم الورد.', 'Crisp kunafa, Akkawi cheese and rose ice cream.'), pr: A('مع شاي أخضر بالنعناع', 'With green tea and mint'), al: ['gluten', 'milk', 'nuts'] },
    { id: 'fruit', c: 'de', p: 320, t: ['v', 'gf'], n: A('فواكه الموسم', 'Seasonal fruit'), d: A('فواكه طازجة، سوربيه الليمون، أوراق النعناع.', 'Fresh fruit, lemon sorbet and mint leaves.'), pr: A('كما هي', 'Best on its own'), al: [] },
    { id: 'flat', c: 'ca', p: 120, t: ['v', 'gf'], n: A('فلات وايت', 'Flat white'), d: A('إسبريسو مزدوج وحليب مخمّر بالبخار.', 'Double espresso with steamed milk.'), pr: A('مع كرواسون', 'With a croissant'), al: ['milk'] },
    { id: 'turk', c: 'ca', p: 95, t: ['v', 'gf'], n: A('قهوة تركي بالهيل', 'Turkish coffee, cardamom'), d: A('تحميص غامق على الرمل مع الهيل.', 'Dark roast brewed on sand with cardamom.'), pr: A('مع أم علي', 'With Om Ali'), al: [] },
    { id: 'croissant', c: 'ca', p: 110, t: ['v'], n: A('كرواسون بالزبدة الفرنسية', 'Butter croissant'), d: A('عجين مُطبّق على ٢٧ طبقة، يُخبز كل ساعة.', 'Laminated dough, baked fresh every hour.'), pr: A('مع فلات وايت', 'With a flat white'), al: ['gluten', 'milk', 'egg'] },
    { id: 'pistachio', c: 'ca', p: 160, t: ['v', 'sg'], img: 'cafe', n: A('معجنات الفستق', 'Pistachio danish'), d: A('كريمة الفستق، فستق مجروش وسكر ناعم.', 'Pistachio cream, crushed pistachio and fine sugar.'), pr: A('مع قهوة تركي', 'With Turkish coffee'), al: ['gluten', 'milk', 'nuts'] },
    { id: 'tart', c: 'ca', p: 150, t: ['v'], n: A('تارت الليمون', 'Lemon tart'), d: A('كريمة الليمون الحامض وعجينة الزبدة.', 'Sharp lemon curd in a butter shell.'), pr: A('مع شاي أخضر', 'With green tea'), al: ['gluten', 'milk', 'egg'] },
    { id: 'chicken', c: 'ca', p: 280, t: [], n: A('ساندويتش الدجاج بالأعشاب', 'Herbed chicken sandwich'), d: A('صدر دجاج مشوي، صوص الليمون والثوم، خبز مخمّر.', 'Grilled chicken, lemon-garlic sauce, sourdough.'), pr: A('مع ليموناضة', 'With lemonade'), al: ['gluten', 'egg'] },
    { id: 'orange', c: 'dr', p: 190, t: ['v', 'gf'], img: 'bar', n: A('برتقال مدخّن وقرفة', 'Smoked orange and cinnamon'), d: A('عصير برتقال، قرفة، دخان الخشب وثلج كبير.', 'Orange, cinnamon and wood smoke over a single large ice cube.'), pr: A('مع بط بالفريك', 'With the duck'), al: [] },
    { id: 'tonic', c: 'dr', p: 170, t: ['v', 'gf'], n: A('تونيك الخيار والشبت', 'Cucumber-dill tonic'), d: A('خيار، شبت، تونيك طبيعي وقشرة ليمون.', 'Cucumber, dill, natural tonic and lemon peel.'), pr: A('مع القاروص', 'With the sea bass'), al: [] },
    { id: 'hibiscus', c: 'dr', p: 160, t: ['v', 'gf'], n: A('كركديه معتّق', 'Aged hibiscus'), d: A('كركديه منقوع ٢٤ ساعة، قرفة وقشر برتقال.', 'Hibiscus steeped 24 hours with cinnamon and orange peel.'), pr: A('مع ريش الضأن', 'With the lamb'), al: [] },
    { id: 'ginger', c: 'dr', p: 150, t: ['v', 'gf', 'sp'], n: A('ليموناضة بالزنجبيل', 'Ginger lemonade'), d: A('ليمون عصير طازج، زنجبيل، نعناع وعسل.', 'Fresh lemon, ginger, mint and honey.'), pr: A('مع الجمبري', 'With the prawns'), al: [] }
  ];

  const AREAS = [
    { id: 'hall', n: A('الصالة الرئيسية', 'Main dining room'), d: A('ثلاثون مقعدًا تحت الشمعدانات، ومطبخ مفتوح جزئيًا.', 'Thirty seats beneath the chandeliers, with a partly open kitchen.'), min: 1, max: 10 },
    { id: 'terrace', n: A('التراس على النيل', 'Nile terrace'), d: A('طاولات على الكورنيش وفوانيس، حسب حالة الجو.', 'Tables on the Corniche under lanterns, weather permitting.'), min: 1, max: 8 },
    { id: 'private', n: A('الصالة الخاصة', 'Private room'), d: A('طاولة مستديرة من ستة إلى عشرة ضيوف، وخدمة مخصصة.', 'A round table for six to ten guests, with a dedicated server.'), min: 6, max: 10 }
  ];
  const OCC = [A('بدون مناسبة', 'No occasion'), A('عيد ميلاد', 'Birthday'), A('ذكرى سنوية', 'Anniversary'), A('عشاء عمل', 'Business dinner'), A('خطوبة أو عقد قران', 'Engagement'), A('أخرى', 'Other')];

  const COURSES = [
    { n: 'I', t: A('تارتار بقري بالدقة', 'Beef tartare, dukkah'), i: 'tartare' },
    { n: 'II', t: A('قاروص بصوص الزعفران', 'Sea bass, saffron'), i: 'bass' },
    { n: 'III', t: A('ريش ضأن بعسل الرمان', 'Rack of lamb, pomegranate'), i: 'lamb' },
    { n: 'IV', t: A('قبّة الشوكولاتة والتمر', 'Chocolate dome, dates'), i: 'dessert' }
  ];
  const TASTING = { p: 3800, pp: 2200 };

  const PKG = [
    { id: 'salon', p: 650, min: 6, max: 10, n: A('الأمسية الخاصة', 'The private evening'), d: A('الصالة الخاصة وقائمة من خمسة أطباق وخدمة مخصصة.', 'The private room, a five-course menu and a dedicated server.'), it: [A('قائمة من خمسة أطباق', 'Five-course menu'), A('مشروبات مرافقة بدون كحول', 'Alcohol-free pairing'), A('تنسيق الزهور والشموع', 'Flowers and candles'), A('بطاقات قائمة بأسماء الضيوف', 'Menu cards with guest names')] },
    { id: 'terr', p: 520, min: 12, max: 40, n: A('أمسية التراس', 'The terrace evening'), d: A('حجز التراس بالكامل على النيل لمجموعات حتى أربعين ضيفًا.', 'The whole Nile terrace for groups of up to forty.'), it: [A('كوكتيل استقبال', 'Welcome reception'), A('قائمة من أربعة أطباق', 'Four-course menu'), A('فوانيس وإضاءة خاصة', 'Lanterns and bespoke lighting'), A('مساعد أحداث مخصص', 'Dedicated events host')] },
    { id: 'chef', p: 3800, min: 4, max: 8, n: A('طاولة الشيف', "The chef's table"), d: A('مقاعد على حافة المطبخ مع الشيف ومنيو متذوق من ثمانية أطباق.', 'Seats at the pass with the chef and an eight-course tasting menu.'), it: [A('ثمانية أطباق متتابعة', 'Eight sequential courses'), A('شرح الأطباق من الشيف', 'Dishes explained by the chef'), A('مشروبات مرافقة', 'Drink pairing'), A('هدية ختام', 'A parting gift')] }
  ];

  const QUOTES = [
    { q: A('قائمة هادئة وواثقة. القاروص وحده يستحق العودة.', 'A quiet, confident menu. The sea bass alone is worth returning for.'), n: A('سلمى ك.', 'Salma K.') },
    { q: A('التراس عند الغروب لا يشبه أي مكان آخر في القاهرة.', 'The terrace at sunset is unlike anywhere else in Cairo.'), n: A('عمر ه.', 'Omar H.') },
    { q: A('حجزنا عشاء خطوبة في الصالة الخاصة، وكان كل شيء في موضعه.', 'We held our engagement dinner in the private room and everything was in its place.'), n: A('نور وياسر', 'Nour & Yasser') }
  ];
  const FAQ = [
    { q: A('هل يلزم الحجز؟', 'Is a reservation required?'), a: A('نوصي به، خصوصًا الخميس والجمعة. نحتفظ بعدد محدود من الطاولات للضيوف دون حجز مسبق.', 'We recommend it, especially Thursday and Friday. A few tables are kept for walk-ins.') },
    { q: A('ما سياسة الإلغاء؟', 'What is the cancellation policy?'), a: A('إلغاء مجاني حتى ست ساعات قبل الموعد. بعد ذلك قد يُحتسب ضمان الحجز.', 'Free cancellation up to six hours before. After that a booking guarantee may apply.') },
    { q: A('هل تناسب القائمة النباتيين ومن لديهم حساسية؟', 'Do you cater for vegetarians and allergies?'), a: A('نعم. كل طبق موسوم بالنباتي وخالي الغلوتين، ويشرح فريقنا مكونات الحساسية قبل الطلب.', 'Yes. Every dish is marked vegetarian or gluten-free, and our team explains allergens before you order.') },
    { q: A('هل يوجد ركن سيارات؟', 'Is there parking?'), a: A('خدمة ركن السيارات بدون رسوم لضيوف المطعم أمام المدخل.', 'Complimentary valet parking is available at the entrance for restaurant guests.') },
    { q: A('هل يمكن حجز مناسبة خاصة؟', 'Can I book a private event?'), a: A('نعم، من صفحة المناسبات. نرد خلال يوم عمل بعرض مفصل.', 'Yes, from the Events page. We reply within one business day with a detailed proposal.') }
  ];
  return { CAT, MENU, AREAS, OCC, COURSES, TASTING, PKG, QUOTES, FAQ, HOT, MAIL, WA, ADDR };
})();
