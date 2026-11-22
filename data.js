/* Muhammad Sayed — content. Edit contact fields here. Phone is shown only when set. */
window.D = (() => {
  const A = (ar, en) => ({ ar, en });
  const C = {
    email: 'muhammadibnsayed@gmail.com',
    phone: '+201012203073',
    bio: 'https://bio.site/muhammadsayed',
    linkedin: 'https://www.linkedin.com/in/muhammadibnsayed/'          // full https URL (shown when set)
  };
  const T = [
    { n: "Ahmed Kafafy", r: "Cosmetics Marketing & Business Development Expert", d: "Mar 2022", q: "Muhammad is a true dedicated art director as I like to call.. A real partner with an eye on details plus being able to convert ideas to real images while sticking to deadlines. Simply he's the one you can count on." },
    { n: "Amir Hassan, DVM, MIBA", r: "Marketing Manager, ATCO Pharma Animal Health", d: "Nov 2024", q: "I had the pleasure of working with Muhammed on several projects. His attention to detail and strong design skills were instrumental in the success of the projects. He quickly grasped the project's goals and developed innovative design solutions." },
    { n: "Khaled Gamal", r: "Commercial Excellence Director, MashPremiere", d: "Jun 2023", q: "One of the most impressive qualities of mohamed is their ability to work collaboratively with others. He is always willing to listen to feedback and incorporate it into their work, which makes them an excellent team player." },
    { n: "Ahmed Agrama", r: "Senior colleague", d: "Nov 2024", q: "Muhammad is a dedicated, committed, smart person with very good understanding of task priority meaning and time management. During various projects we worked on them together, Muhammad showed ability to always meet the deadline with quality outcomes." },
    { n: "Ahmad Moharram", r: "Sterilization Business Line Manager", d: "Nov 2024", q: "I've worked with Muhammad on a variety of projects, and I've found him to be a highly talented and dedicated professional. His expertise in the field of creative designing has been very helpful to our company and projects." },
    { n: "Walid A. Soliman", r: "Colleague", d: "Nov 2024", q: "I recommend Muhammad, who is passionate about his work, dedicated, and go-getter. He doesn't save effort to bring the best out of his skills and competences." }
  ];
  const P = [
    { id: 'saraya', n: A('سرايا', 'Saraya'), s: A('مطعم وكافيه على النيل', 'Fine dining on the Nile'), d: A('حجز طاولة بمواعيد متاحة حسب الخدمة.', 'Table booking with live availability.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/3Bu15e8Mvavrrwc2iHkPcN' },
    { id: 'aurelle', n: A('أوريل', 'Aurelle'), s: A('أزياء راقية هادئة', 'Quiet luxury fashion'), d: A('متجر هادئ بتصوير تحريري وسلة وحفظ.', 'Editorial storefront with bag and saved items.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/BwpbDVXeYBGkPtvoByGXtf' },
    { id: 'haze', n: A('هيز', 'HAZE'), s: A('متجر ستريت وير', 'Streetwear store'), d: A('متجر جريء بألوان البراند وفلاتر سريعة.', 'Bold store with brand colour and fast filters.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/DcbbPtK2VTBSfSV1z7GDTx' },
    { id: 'rokn', n: A('رُكن', 'Rokn'), s: A('أثاث ومتاجر عرض', 'Furniture e-commerce'), d: A('تسوّق من الغرفة، ومُكوِّن ألوان الكنب.', 'Shop by room, sofa colour configurator.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/HU5SohiPECsA7oQFzkyLzm' },
    { id: 'hala', n: A('حلا', 'Hala'), s: A('متجر تجميل', 'Beauty store'), d: A('متجر تجميل سعودي بسلة وطلب وعروض، بتصوير منتجات واقعي.', 'A Saudi beauty store with cart, checkout and offers, shot with real product photography.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/Vbh8UheC6tfo4tmwuZjhN6' },
    { id: 'mashq', n: A('مَشق', 'MASHQ'), s: A('جمعية تعليمية', 'Educational association'), d: A('مجتمع تعلّم في قطر يجمع الإيمان والعلم، بمسار تسجيل حسب عمر الطفل.', 'A learning community in Qatar joining faith and science, with registration by the child\'s age.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/KbGMi5a3MhJCR4DxC4Vo7o' },
    { id: 'nalla', n: A('نلّا', 'nalla'), s: A('استثمار', 'Investing app'), d: A('صفحة هبوط لتطبيق استثمار منخفض المخاطر، بمحاكي نمو تفاعلي.', 'A landing page for a low-risk investing app, with an interactive growth simulator.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/XfRYdV1tuJAmAF8EJ5MDuA' },
    { id: 'courtnine', n: A('كورت ناين', 'Court Nine'), s: A('نادي بادل', 'Padel club'), d: A('نادي بادل في الشيخ زايد بجدول حجز مباشر وأكاديمية وعضويات وليالي أمريكانو.', 'A padel club in Sheikh Zayed with a live booking board, academy, memberships and Americano nights.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/W4NQdcsecLbFL7XswkPSpX' },
    { id: 'plink', n: A('بلينك', 'Plink'), s: A('ملابس أطفال', "Kids' clothing"), d: A('مستشار مقاسات بالطول بدون بيانات الطفل.', 'Size advisor from height only, no child data.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/FE5XqsTv9XTnLFp4vCc7CC' },
    { id: 'meftah', n: A('مفتاح', 'Meftah'), s: A('منصة عقارات', 'Real estate platform'), d: A('بحث ومقارنة وحاسبة أقساط.', 'Search, compare and an instalment calculator.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/Qs1PmtVsUkXBdLx74PaHe6' },
    { id: 'nabd', n: A('نبض', 'Nabd'), s: A('شبكة عيادات', 'Clinic network'), d: A('حجز موعد في أقل من دقيقتين.', 'Book an appointment in under two minutes.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/FoGLpfSUw9TD3v94nJu7QX' },
    { id: 'sar', n: A('صار', 'SAR'), s: A('تدريب للشركات', 'Corporate training'), d: A('مُرشد برامج ودراسة حالة كاملة.', 'Programme finder with a full case study.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/SrNPaPrPYaq4gBb2C3TWPn' },
    { id: 'masar', n: A('مسار', 'Masar'), s: A('تصدير للمستوردين', 'B2B export company'), d: A('طلب عرض سعر في دقيقة.', 'A quote request in one minute.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/YZkApbgjESycPNbc6FuygN' },
    { id: 'afanin', n: A('أفانين', 'Afanin'), s: A('فنون أونلاين للأطفال', 'Online art classes for kids'), d: A('كورسات بمدربين ومتابعة للأهل.', 'Live classes with progress updates for parents.'), t: ['UX', 'UI', 'WP'], u: 'https://claude.ai/artifact/TUYdZVjV6czv61zF2nQVfR' },
    { id: 'nile', n: A('حصاد النيل', 'Nile Harvest'), s: A('أغذية مصرية للتصدير', 'Egyptian food brand'), d: A('كتالوج منتجات وأسواق تصدير ومعايير جودة للمشترين في الخارج.', 'Product catalogue, export markets and quality standards for overseas buyers.'), t: ['UX', 'UI', 'WP'], u: 'https://claude.ai/artifact/6YGxTgS5ni4ExtK6nUyZie' }
  ];
  const IND = [["تعليم","Education"],["تدريب","Training"],["استيراد وتصدير","Import & Export"],["عقارات","Real Estate"],["رعاية صحية","Healthcare"],["مطاعم وضيافة","Restaurants"],["أزياء","Fashion"],["أثاث","Furniture"],["أغذية","Food"],["ملابس أطفال","Kids' Wear"],["ستريت وير","Streetwear"]];
  return { C, IND, P, T };
})();
