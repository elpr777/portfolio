/* Muhammad Sayed — content. Edit contact fields here. Phone is shown only when set. */
window.D = (() => {
  const A = (ar, en) => ({ ar, en });
  const C = {
    email: 'muhammadibnsayed@gmail.com',
    phone: '+201012203073',
    bio: 'https://bio.site/muhammadsayed',
    linkedin: 'https://www.linkedin.com/in/muhammadibnsayed/'          // full https URL (shown when set)
  };
  const STEPS = [
    ['research', A('بحث', 'Research'), A('بنفهم السوق والعميل والمنافسين قبل أي خط.', 'Market, users and competitors, before any line is drawn.')],
    ['uxw', A('كتابة UX', 'UX writing'), A('كلام واضح بيقود المستخدم لقرار.', 'Clear words that lead a visitor to a decision.')],
    ['flow', A('رحلة المستخدم', 'User flows'), A('أقصر طريق من أول زيارة لأول طلب.', 'The shortest path from first visit to first enquiry.')],
    ['map', A('خريطة الموقع', 'Site map'), A('هيكل صفحات منطقي يتفهم من أول نظرة.', 'A page structure that makes sense at a glance.')],
    ['wire', A('وايرفريم', 'Wireframes'), A('ترتيب المحتوى قبل الألوان.', 'Content hierarchy before colour.')],
    ['ui', A('تصميم UI', 'UI design'), A('هوية بصرية نظيفة على أحدث Material وApple.', 'A clean visual system on current Material and Apple guidelines.')],
    ['proto', A('برووتايب', 'Prototype'), A('نجرّبه بإيدينا قبل ما نبنيه.', 'Click it through before we build it.')],
    ['motion', A('حركة وتفاعل', 'Interaction'), A('حركة بتشرح مش بتزيّن.', 'Motion that explains, not decorates.')],
    ['seo', A('SEO وAEO', 'SEO · AEO'), A('يتلاقي في جوجل ويتذكر في إجابات الذكاء الاصطناعي.', 'Found on Google, cited in AI answers.')],
    ['dev', A('تطوير', 'Development'), A('كود نضيف وآمن وخفيف، على ووردبريس أو فريمر أو كود مخصص.', 'Clean, secure, light code: WordPress, Framer or custom.')],
    ['test', A('اختبار', 'Testing'), A('موبايل وتابلت وديسكتوب، عربي وإنجليزي، فاتح وداكن.', 'Mobile, tablet, desktop, Arabic and English, light and dark.')]
  ];
  const T = [
    { n: "Ahmed Kafafy", r: "Cosmetics Marketing & Business Development Expert", d: "Mar 2022", q: "Muhammad is a true dedicated art director as I like to call.. A real partner with an eye on details plus being able to convert ideas to real images while sticking to deadlines. Simply he's the one you can count on." },
    { n: "Mohamed Elwakil", r: "Business Unit Manager", d: "Nov 2024", q: "I had the absolute pleasure of working with Mohamed, a highly skilled and creative graphic designer, and I can confidently say that his talent and dedication are unmatched." },
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
    { id: 'plink', n: A('بلينك', 'Plink'), s: A('ملابس أطفال', "Kids' clothing"), d: A('مستشار مقاسات بالطول بدون بيانات الطفل.', 'Size advisor from height only, no child data.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/FE5XqsTv9XTnLFp4vCc7CC' },
    { id: 'meftah', n: A('مفتاح', 'Meftah'), s: A('منصة عقارات', 'Real estate platform'), d: A('بحث ومقارنة وحاسبة أقساط.', 'Search, compare and an instalment calculator.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/Qs1PmtVsUkXBdLx74PaHe6' },
    { id: 'nabd', n: A('نبض', 'Nabd'), s: A('شبكة عيادات', 'Clinic network'), d: A('حجز موعد في أقل من دقيقتين.', 'Book an appointment in under two minutes.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/FoGLpfSUw9TD3v94nJu7QX' },
    { id: 'sar', n: A('صار', 'SAR'), s: A('تدريب للشركات', 'Corporate training'), d: A('مُرشد برامج ودراسة حالة كاملة.', 'Programme finder with a full case study.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/SrNPaPrPYaq4gBb2C3TWPn' },
    { id: 'masar', n: A('مسار', 'Masar'), s: A('تصدير للمستوردين', 'B2B export company'), d: A('طلب عرض سعر في دقيقة.', 'A quote request in one minute.'), t: ['UX', 'UI', 'Dev'], u: 'https://claude.ai/artifact/YZkApbgjESycPNbc6FuygN' },
    { id: 'afanin', n: A('أفانين', 'Afanin'), s: A('فنون أونلاين للأطفال', 'Online art classes for kids'), d: A('كورسات بمدربين ومتابعة للأهل.', 'Live classes with progress updates for parents.'), t: ['UX', 'UI', 'WP'], u: 'https://claude.ai/artifact/TUYdZVjV6czv61zF2nQVfR' },
    { id: 'nile', n: A('حصاد النيل', 'Nile Harvest'), s: A('أغذية مصرية للتصدير', 'Egyptian food brand'), d: A('كتالوج منتجات وأسواق تصدير ومعايير جودة للمشترين في الخارج.', 'Product catalogue, export markets and quality standards for overseas buyers.'), t: ['UX', 'UI', 'WP'], u: 'https://claude.ai/artifact/6YGxTgS5ni4ExtK6nUyZie' }
  ];
  return { C, STEPS, P, T };
})();
