/* Nabd Clinics — content & schedules. Slots are generated from these schedules at runtime. */
window.D = (() => {
  const A = (ar, en) => ({ ar, en });
  const HOT = '+20 2 2270 5500', MAIL = 'care@nabdclinics.com', WA = '+20 100 330 4455', AMB = '123';

  const SP = [
    { id: 'im', ar: 'الباطنة', en: 'Internal medicine', d: A('تشخيص ومتابعة الأمراض المزمنة والحالات العامة.', 'Diagnosis and follow-up for chronic and general conditions.') },
    { id: 'cardio', ar: 'القلب', en: 'Cardiology', d: A('ضغط، خفقان، ألم صدر، وتخطيط القلب والإيكو.', 'Blood pressure, palpitations, chest pain, ECG and echo.') },
    { id: 'peds', ar: 'الأطفال', en: 'Pediatrics', d: A('متابعة النمو والتطعيمات وأمراض الطفولة.', 'Growth checks, vaccines and childhood illness.') },
    { id: 'obgyn', ar: 'النساء والتوليد', en: 'Obstetrics & gynecology', d: A('متابعة الحمل والولادة وصحة المرأة.', 'Pregnancy care, delivery and women’s health.') },
    { id: 'derm', ar: 'الجلدية', en: 'Dermatology', d: A('مشاكل البشرة والشعر والحساسية.', 'Skin, hair and allergy care.') },
    { id: 'ortho', ar: 'العظام', en: 'Orthopedics', d: A('آلام المفاصل والعمود الفقري وإصابات الملاعب.', 'Joint, spine and sports injuries.') },
    { id: 'ent', ar: 'أنف وأذن وحنجرة', en: 'ENT', d: A('جيوب أنفية، لوز، سمع ودوخة.', 'Sinus, tonsils, hearing and dizziness.') },
    { id: 'eye', ar: 'العيون', en: 'Ophthalmology', d: A('فحص نظر، مياه بيضاء ومياه زرقاء وشبكية.', 'Eye exams, cataract, glaucoma and retina.') },
    { id: 'dental', ar: 'الأسنان', en: 'Dentistry', d: A('كشف وتنظيف وحشو وتقويم.', 'Check-ups, cleaning, fillings and braces.') },
    { id: 'neuro', ar: 'المخ والأعصاب', en: 'Neurology', d: A('صداع نصفي، دوخة، تنميل وصرع.', 'Migraine, dizziness, numbness and epilepsy.') },
    { id: 'nutri', ar: 'التغذية العلاجية', en: 'Clinical nutrition', d: A('خطط غذائية للسكر والوزن والحمل.', 'Meal plans for diabetes, weight and pregnancy.') }
  ];

  /* days: JS getDay() (0 Sun … 6 Sat). Clinics are closed Fridays. */
  const DR = [
    { id: 'mona-hassan', img: 'd1', g: 'f', sp: 'obgyn', ti: 'c', yrs: 22, lang: ['ar', 'en'], fee: 650, br: ['nasr', 'zayed'], days: [6, 0, 2, 4], from: 11, to: 17, step: 20, tele: true, rt: 4.9, rv: 412,
      n: A('د. منى حسن', 'Dr. Mona Hassan'), t: A('استشاري النساء والتوليد', 'Consultant, obstetrics & gynecology'),
      b: A('تتابع الحمل الطبيعي وحالات الحمل عالي الخطورة، ولها اهتمام خاص بصحة المرأة بعد الأربعين.', 'Follows normal and high-risk pregnancies, with a special focus on women’s health after forty.') },
    { id: 'tarek-abdelmoneim', img: 'd2', g: 'm', sp: 'cardio', ti: 'c', yrs: 27, lang: ['ar', 'en'], fee: 800, br: ['maadi'], days: [6, 1, 3], from: 14, to: 20, step: 30, tele: true, rt: 4.8, rv: 538,
      n: A('د. طارق عبد المنعم', 'Dr. Tarek Abdelmoneim'), t: A('استشاري أمراض القلب', 'Consultant cardiologist'),
      b: A('خبرة في ارتفاع الضغط واضطراب النبض ومتابعة ما بعد القسطرة، مع تقييم شامل لعوامل الخطورة.', 'Experienced in hypertension, arrhythmia and post-catheterisation follow-up, with full risk-factor assessment.') },
    { id: 'rania-fouad', img: 'd3', g: 'f', sp: 'peds', ti: 'c', yrs: 14, lang: ['ar', 'en'], fee: 450, br: ['nasr', 'maadi'], days: [6, 0, 1, 2, 3, 4], from: 10, to: 18, step: 20, tele: true, rt: 4.9, rv: 689,
      n: A('د. رانيا فؤاد', 'Dr. Rania Fouad'), t: A('استشاري طب الأطفال وحديثي الولادة', 'Consultant pediatrician & neonatologist'),
      b: A('تتابع نمو الأطفال منذ الولادة، وتجيب بهدوء على أسئلة الأهل في التغذية والنوم والتطعيمات.', 'Follows children’s growth from birth and answers parents’ questions on feeding, sleep and vaccines.') },
    { id: 'karim-nabil', img: 'd4', g: 'm', sp: 'ent', ti: 's', yrs: 11, lang: ['ar', 'en'], fee: 400, br: ['nasr', 'zayed'], days: [6, 1, 3, 4], from: 16, to: 21, step: 20, tele: false, rt: 4.7, rv: 296,
      n: A('د. كريم نبيل', 'Dr. Karim Nabil'), t: A('أخصائي أنف وأذن وحنجرة', 'ENT specialist'),
      b: A('يعالج الجيوب الأنفية والتهابات اللوز والحساسية المزمنة، ويجري فحص السمع بالمنظار في العيادة.', 'Treats sinus disease, tonsillitis and chronic allergy, with in-clinic endoscopy and hearing tests.') },
    { id: 'dalia-samir', img: 'd5', g: 'f', sp: 'derm', ti: 'c', yrs: 16, lang: ['ar', 'en'], fee: 550, br: ['maadi', 'zayed'], days: [6, 0, 2, 3], from: 12, to: 19, step: 20, tele: true, rt: 4.8, rv: 477,
      n: A('د. داليا سمير', 'Dr. Dalia Samir'), t: A('استشاري الأمراض الجلدية والليزر', 'Consultant dermatologist & laser'),
      b: A('حب الشباب، الأكزيما، تساقط الشعر، وتقييم الشامات، مع خطة علاج مكتوبة وواضحة.', 'Acne, eczema, hair loss and mole checks, with a clear written treatment plan.') },
    { id: 'hossam-adel', img: 'd6', g: 'm', sp: 'ortho', ti: 'c', yrs: 19, lang: ['ar', 'en'], fee: 600, br: ['nasr'], days: [6, 0, 1, 3], from: 15, to: 21, step: 30, tele: false, rt: 4.8, rv: 351,
      n: A('د. حسام عادل', 'Dr. Hossam Adel'), t: A('استشاري جراحة العظام والإصابات الرياضية', 'Consultant orthopedic & sports-injury surgeon'),
      b: A('منظار الركبة والكتف، وآلام أسفل الظهر، مع برنامج تأهيل يبدأ من أول زيارة.', 'Knee and shoulder arthroscopy and lower-back pain, with a rehab plan from the first visit.') },
    { id: 'heba-mostafa', img: 'd7', g: 'f', sp: 'eye', ti: 's', yrs: 9, lang: ['ar', 'en'], fee: 380, br: ['maadi', 'nasr'], days: [6, 0, 2, 4], from: 10, to: 16, step: 20, tele: true, rt: 4.9, rv: 258,
      n: A('د. هبة مصطفى', 'Dr. Heba Mostafa'), t: A('أخصائي طب وجراحة العيون', 'Ophthalmology specialist'),
      b: A('فحص النظر للأطفال والكبار، وجفاف العين، وتقييم ما قبل عمليات تصحيح الإبصار.', 'Eye exams for children and adults, dry eye and pre-surgery vision correction assessment.') },
    { id: 'ahmed-sherif', img: 'd8', g: 'm', sp: 'cardio', ti: 's', yrs: 12, lang: ['ar', 'en'], fee: 500, br: ['zayed', 'nasr'], days: [0, 1, 2, 4], from: 17, to: 22, step: 30, tele: true, rt: 4.7, rv: 244,
      n: A('د. أحمد شريف', 'Dr. Ahmed Sherif'), t: A('أخصائي القلب والأوعية الدموية', 'Cardiovascular specialist'),
      b: A('إيكو وتخطيط جهد ومتابعة السيولة والضغط، بمواعيد مسائية تناسب العاملين.', 'Echo, stress ECG and anticoagulation follow-up, with evening hours for working patients.') },
    { id: 'salma-ezzat', img: 'd9', g: 'f', sp: 'dental', ti: 's', yrs: 8, lang: ['ar', 'en'], fee: 350, br: ['zayed', 'maadi'], days: [6, 0, 1, 2, 3, 4], from: 12, to: 21, step: 30, tele: false, rt: 4.9, rv: 603,
      n: A('د. سلمى عزت', 'Dr. Salma Ezzat'), t: A('أخصائي علاج وتجميل الأسنان', 'Restorative & cosmetic dentist'),
      b: A('حشو تجميلي وتنظيف وتبييض وتقويم شفاف، مع تخدير موضعي لطيف للأطفال والخائفين.', 'Cosmetic fillings, cleaning, whitening and clear aligners, with gentle anaesthesia for anxious patients.') },
    { id: 'samir-gaber', img: 'd10', g: 'm', sp: 'im', ti: 'c', yrs: 31, lang: ['ar'], fee: 700, br: ['nasr', 'maadi'], days: [6, 0, 2, 3], from: 13, to: 19, step: 30, tele: true, rt: 4.9, rv: 721,
      n: A('د. سمير جابر', 'Dr. Samir Gaber'), t: A('استشاري الباطنة والسكر', 'Consultant internist & diabetologist'),
      b: A('متابعة السكر والضغط والغدة الدرقية، ويُعرف بشرح الحالة للمريض وأسرته بلغة بسيطة.', 'Manages diabetes, blood pressure and thyroid disease, known for explaining the case plainly to patient and family.') },
    { id: 'nour-ibrahim', img: 'd11', g: 'f', sp: 'nutri', ti: 's', yrs: 10, lang: ['ar', 'en'], fee: 400, br: ['zayed', 'nasr'], days: [6, 1, 2, 4], from: 10, to: 18, step: 30, tele: true, rt: 4.8, rv: 319,
      n: A('د. نور إبراهيم', 'Dr. Nour Ibrahim'), t: A('أخصائي التغذية العلاجية', 'Clinical nutritionist'),
      b: A('خطط غذائية واقعية للسكر والكوليسترول والحمل، بقوائم تناسب المطبخ المصري.', 'Practical meal plans for diabetes, cholesterol and pregnancy, built around everyday Egyptian cooking.') },
    { id: 'wael-darwish', img: 'd12', g: 'm', sp: 'neuro', ti: 'c', yrs: 33, lang: ['ar', 'en'], fee: 850, br: ['maadi'], days: [0, 2, 3], from: 14, to: 19, step: 30, tele: true, rt: 4.9, rv: 392,
      n: A('د. وائل درويش', 'Dr. Wael Darwish'), t: A('استشاري المخ والأعصاب', 'Consultant neurologist'),
      b: A('الصداع النصفي والدوخة والتنميل وحالات الصرع، مع رسم مخ وموصلات أعصاب في العيادة.', 'Migraine, dizziness, numbness and epilepsy, with EEG and nerve studies on site.') }
  ];

  const BR = [
    { id: 'nasr', n: A('مدينة نصر', 'Nasr City'), a: A('12 شارع عباس العقاد، مدينة نصر، القاهرة', '12 Abbas El Akkad St, Nasr City, Cairo'), q: '12 Abbas El Akkad St, Nasr City, Cairo', tel: '+20 2 2270 5501', h: A('يوميًا من 9 ص إلى 10 م ما عدا الجمعة', 'Daily 9 am – 10 pm, closed Friday'), sv: ['lab', 'img', 'pharm'] },
    { id: 'maadi', n: A('المعادي', 'Maadi'), a: A('9 شارع 9، دجلة، المعادي، القاهرة', '9 Road 9, Degla, Maadi, Cairo'), q: 'Road 9, Maadi, Cairo', tel: '+20 2 2270 5502', h: A('يوميًا من 9 ص إلى 10 م ما عدا الجمعة', 'Daily 9 am – 10 pm, closed Friday'), sv: ['lab', 'img'] },
    { id: 'zayed', n: A('الشيخ زايد', 'Sheikh Zayed'), a: A('مول الأرينا، الحي الثالث، الشيخ زايد، الجيزة', 'Arena Mall, 3rd District, Sheikh Zayed, Giza'), q: 'Sheikh Zayed City, Giza', tel: '+20 2 2270 5503', h: A('يوميًا من 10 ص إلى 11 م ما عدا الجمعة', 'Daily 10 am – 11 pm, closed Friday'), sv: ['lab', 'pharm'] }
  ];
  const SV = { lab: A('معمل تحاليل', 'Lab'), img: A('أشعة وسونار', 'Imaging'), pharm: A('صيدلية', 'Pharmacy') };

  const PK = [
    { id: 'basic', price: 1450, n: A('الفحص الأساسي', 'Essential check-up'), d: A('نظرة سريعة على صحتك العامة في زيارة واحدة.', 'A quick read on your general health in one visit.'), it: [A('كشف باطنة', 'Internal medicine visit'), A('صورة دم كاملة', 'Complete blood count'), A('سكر صائم وتراكمي', 'Fasting glucose & HbA1c'), A('دهون الدم', 'Lipid profile'), A('وظائف كلى', 'Kidney function')] },
    { id: 'exec', price: 3200, n: A('الفحص التنفيذي', 'Executive check-up'), d: A('للأعمار فوق 35 ومن يعمل بضغط عالٍ.', 'For adults over 35 and anyone working under heavy pressure.'), it: [A('كشف باطنة وقلب', 'Internist & cardiology visit'), A('إيكو وتخطيط قلب', 'Echo & ECG'), A('سونار بطن وحوض', 'Abdominal & pelvic ultrasound'), A('تحاليل شاملة (40 تحليلاً)', 'Comprehensive labs (40 tests)'), A('تقرير مكتوب ومتابعة بعد أسبوعين', 'Written report and 2-week follow-up')] },
    { id: 'women', price: 2600, n: A('صحة المرأة', 'Women’s health'), d: A('فحص دوري يغطي ما تحتاجه كل امرأة.', 'A routine screen covering what every woman needs.'), it: [A('كشف نساء', 'Gynecology visit'), A('سونار حوض', 'Pelvic ultrasound'), A('مسحة عنق الرحم', 'Cervical screening'), A('هرمونات الغدة والحديد وفيتامين د', 'Thyroid, iron & vitamin D'), A('استشارة تغذية', 'Nutrition consult')] },
    { id: 'heart', price: 2900, n: A('صحة القلب', 'Heart health'), d: A('لمن في عائلته تاريخ مرضي أو يعاني من ضغط.', 'For anyone with family history or high blood pressure.'), it: [A('كشف قلب', 'Cardiology visit'), A('إيكو', 'Echocardiogram'), A('اختبار مجهود', 'Stress test'), A('دهون وسكر تراكمي', 'Lipids & HbA1c'), A('خطة نمط حياة مكتوبة', 'Written lifestyle plan')] }
  ];

  const SYM = [
    { id: 'chest', ar: 'ألم أو ضيق في الصدر', en: 'Chest pain or tightness', sp: 'cardio', urgent: true },
    { id: 'head', ar: 'صداع متكرر أو دوخة', en: 'Frequent headache or dizziness', sp: 'neuro' },
    { id: 'child', ar: 'حرارة أو كحة عند طفل', en: 'Child with fever or cough', sp: 'peds' },
    { id: 'skin', ar: 'طفح أو حب شباب أو تساقط شعر', en: 'Rash, acne or hair loss', sp: 'derm' },
    { id: 'joint', ar: 'ألم ركبة أو ظهر', en: 'Knee or back pain', sp: 'ortho' },
    { id: 'throat', ar: 'التهاب لوز أو جيوب أنفية', en: 'Tonsils or sinus trouble', sp: 'ent' },
    { id: 'preg', ar: 'متابعة حمل أو دورة غير منتظمة', en: 'Pregnancy or irregular periods', sp: 'obgyn' },
    { id: 'sugar', ar: 'سكر أو ضغط أو تعب عام', en: 'Diabetes, pressure or fatigue', sp: 'im' }
  ];

  const RV = [
    { n: A('نهى م.', 'Noha M.'), dr: 'rania-fouad', s: 5, t: A('حجزت لابني في دقيقتين وبدأ الكشف في معاده بالظبط. الدكتورة شرحت كل حاجة وكتبتها لي.', 'Booked for my son in two minutes and we were seen right on time. The doctor explained everything and wrote it down.') },
    { n: A('أحمد ع.', 'Ahmed A.'), dr: 'tarek-abdelmoneim', s: 5, t: A('الإيكو والتحاليل في نفس اليوم وفي نفس المكان. وفّرت عليّ ثلاث زيارات.', 'Echo and labs in the same place, same day. It saved me three separate visits.') },
    { n: A('مي ح.', 'Mai H.'), dr: 'mona-hassan', s: 5, t: A('متابعة الحمل كانت مطمّنة جدًا، والموعد بيتأكد برسالة قبلها بيوم.', 'Pregnancy follow-up felt very reassuring, and every appointment is confirmed by message the day before.') },
    { n: A('يوسف س.', 'Youssef S.'), dr: 'samir-gaber', s: 5, t: A('أول مرة حد يشرح لي نتيجة السكر التراكمي بشكل أفهمه. التقرير وصلني على الإيميل.', 'First time anyone explained my HbA1c in a way I understood. The report reached me by email.') },
    { n: A('هدى ر.', 'Hoda R.'), dr: 'dalia-samir', s: 4, t: A('الاستشارة أونلاين وفّرت عليّ سفر من الإسكندرية. العلاج وصل لي مكتوب بالتفصيل.', 'The online consult saved me a trip from Alexandria. The treatment came back in writing, in detail.') },
    { n: A('كريم ط.', 'Karim T.'), dr: 'hossam-adel', s: 5, t: A('بدأت العلاج الطبيعي من أول زيارة وخطة التمارين كانت واضحة. بعد شهر الركبة اتحسنت.', 'Physio started at the first visit with a clear exercise plan. A month later my knee was far better.') }
  ];

  const FAQ = [
    { q: A('إزاي أحجز؟', 'How do I book?'), a: A('اختر الدكتور أو التخصص، ثم اليوم والوقت، واكتب اسمك ورقم موبايلك. يصلك رقم الحجز فورًا ورسالة تأكيد قبل الموعد بيوم.', 'Choose a doctor or specialty, pick a day and time, and enter your name and mobile number. You get a booking number immediately and a confirmation message the day before.') },
    { q: A('هل أقدر ألغي أو أغيّر الموعد؟', 'Can I cancel or reschedule?'), a: A('نعم، من صفحة «مواعيدي» في أي وقت حتى 3 ساعات قبل الكشف، من غير أي رسوم.', 'Yes, from the My appointments page up to 3 hours before the visit, at no charge.') },
    { q: A('إيه الفرق بين الكشف في العيادة وأونلاين؟', 'In-clinic vs online visit?'), a: A('الكشف أونلاين بفيديو آمن مع نفس الدكتور وبسعر أقل. مناسب للمتابعة وقراءة التحاليل، أما الفحص السريري فيحتاج زيارة.', 'Online visits are a secure video call with the same doctor at a lower fee. Good for follow-ups and reading results; a physical exam needs a visit.') },
    { q: A('هل ممكن أستخدم التأمين الصحي؟', 'Do you accept insurance?'), a: A('نتعامل مع عدد من شركات التأمين. اتصل بالخط الساخن أو اكتب لنا قبل الموعد لنؤكد تغطية حالتك.', 'We work with several insurers. Call the hotline or message us before your visit to confirm cover for your case.') },
    { q: A('هل نتائج التحاليل والأشعة بتوصلني إزاي؟', 'How do I get lab and imaging results?'), a: A('بتوصلك على الإيميل أو واتساب خلال ساعات، وتقدر تستلمها مطبوعة من أي فرع.', 'They reach you by email or WhatsApp within hours, and you can collect printed copies at any branch.') },
    { q: A('ماذا أفعل في الحالات الطارئة؟', 'What if it is an emergency?'), a: A('لا تحجز موعدًا. اتصل بالإسعاف على 123 أو توجّه لأقرب طوارئ فورًا.', 'Do not book. Call the ambulance on 123 or go to the nearest emergency room right away.') }
  ];

  return { SP, DR, BR, SV, PK, SYM, RV, FAQ, HOT, MAIL, WA, AMB };
})();
