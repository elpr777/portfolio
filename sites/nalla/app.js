const IC={"menu": "M4 6h16M4 12h16M4 18h16", "close": "M6 6l12 12M18 6L6 18", "arrow_forward": "M5 12h14M13 6l6 6-6 6", "arrow_back": "M19 12H5M11 6l-6 6 6 6", "check": "M5 12.5l4.5 4.5L19 7", "check_circle": "M12 3a9 9 0 100 18 9 9 0 000-18zM8 12.5l3 3 5-6", "add": "M12 5v14M5 12h14", "expand_more": "M6 9l6 6 6-6", "north_east": "M7 17L17 7M8 7h9v9", "trending_up": "M3 17l6-6 4 4 8-8M15 7h6v6", "shield": "M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z", "bolt": "M13 3L5 14h6l-1 7 8-11h-6z", "lock": "M5 11h14v9H5zM8 11V8a4 4 0 018 0v3", "home": "M4 11l8-7 8 7v9h-5v-6H9v6H4z", "person": "M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c0-4 4-6 8-6s8 2 8 6", "apps": "M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z", "insights": "M5 20v-6M12 20V6M19 20v-10", "battery_full": "M3 8h16v8H3zM21 11v2", "wifi": "M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0", "flag": "M5 21V4M5 4h12l-2 4 2 4H5", "block": "M12 3a9 9 0 100 18 9 9 0 000-18zM5.6 5.6l12.8 12.8", "local_cafe": "M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5zM17 9h2a2 2 0 010 4h-2", "format_quote": "M7 17h3l2-4V7H6v6h3zM15 17h3l2-4V7h-6v6h3", "account_balance_wallet": "M3 6h18v14H3zM3 10h18M16 15h.01", "progress_activity": "M12 3a9 9 0 019 9", "light_mode": "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5", "dark_mode": "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"};
function setIco(el,n){const NS='http://www.w3.org/2000/svg';const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','0 0 24 24');s.setAttribute('aria-hidden','true');s.setAttribute('fill','none');s.setAttribute('stroke','currentColor');s.setAttribute('stroke-width','2');s.setAttribute('stroke-linecap','round');s.setAttribute('stroke-linejoin','round');const p=document.createElementNS(NS,'path');p.setAttribute('d',IC[n]||'');s.appendChild(p);el.replaceChildren(s);el.dataset.ic=n}
document.querySelectorAll('.material-symbols-rounded').forEach(e=>setIco(e,e.textContent.trim()));

/* ============================================================
   nalla — bilingual MD3 landing page
   ============================================================ */

/* ---------- i18n dictionary ---------- */
const D = {
en: {
  meta_title:"nalla — Grow your money. Keep your calm.",
  brand_mark:"n", brand_word:"nalla",
  nav_why:"Why nalla", nav_how:"How it works", nav_safety:"Safety", nav_faq:"FAQ", nav_cta:"Get early access",
  hero_badge:"Low-risk investing for real life",
  hero_h1:`Grow your money.<br>Keep your <em class="hl">calm.<svg class="scribble" viewBox="0 0 220 26" preserveAspectRatio="none" aria-hidden="true"><path d="M6 17 C 42 7, 86 23, 128 13 C 160 6, 190 11, 214 8" pathLength="1"></path></svg></em>`,
  hero_sub:"nalla builds you a low-risk portfolio from day one — money-market funds and short-term bonds, nothing spicy. Set it once, add a little each month, and let compounding do the quiet work.",
  hero_cta1:"Get early access", hero_cta2:"See how it works",
  hero_m1:"Start with $10", hero_m2:"Withdraw anytime",
  hero_proof:"people are already in line",
  ph_greet:"Good morning, Sara", ph_label:"Total balance", ph_thisyear:"this year",
  ph_add:"Add", ph_invest:"Invest", ph_goals:"Goals", ph_more:"More", ph_goal_t:"Rainy-day fund",
  chip_a_l:"past 12 months", chip_b:"Risk: Low", chip_c:"Auto-save moved $6.20 today",
  tk1:"Nour just hit her first $10K", tk2:"Omar withdrew — landed in 26 seconds",
  tk3:"Lina switched on round-ups on 3 cards", tk4:"Khalid's emergency fund reached 100%",
  tk5:"2,314 calm investors joined this week", tk6:"Sara auto-saved $340 last month without noticing",
  why_kicker:"Why nalla", why_h2:"Built to grow. Designed to protect.",
  why_sub:"Everything here exists for one reason: so you never have to choose between growing your money and sleeping well.",
  sim_t:"See your future, roughly", sim_s:"Drag the slider, try the timelines. This is what steady, low-risk compounding looks like.",
  sim_lbl:"Monthly auto-invest", sim_y3:"3 years", sim_y5:"5 years", sim_y10:"10 years",
  sim_out_lbl:"Projected balance", sim_growth_lbl:"Pure growth",
  sim_leg1:"Total balance", sim_leg2:"Contributions",
  sim_foot:"Illustrative at a modeled 5.8% annual return, compounded monthly. Not a promise — markets aren't vending machines.",
  fee_t:"One flat fee.", fee_per:"/year", fee_s:"That's the entire pricing page.",
  fee_f1:"No withdrawal fees", fee_f2:"No trading fees", fee_f3:"No minimum balance",
  vol_t:"Boring, on purpose", vol_s:"Typical year-to-year swings",
  vol_l1:"Crypto", vol_l2:"Single stocks", vol_l3:"nalla mix",
  vol_cap:"Less drama. Far fewer 3 a.m. portfolio checks.",
  save_t:"Save money by accident", save_s:"Every purchase rounds up to the next dollar and the spare change slides into your portfolio.",
  save_d1:"Coffee — $4.60", save_d2:"+$0.40 to nalla", save_sw:"Round-ups",
  wd_t:"Your money answers to you", wd_s:"No lock-ins, no exit interviews. One tap and it's on the way back to your bank.",
  wd_btn:"Try a demo withdrawal", wd_busy:"Sending to your bank…", wd_done:"Done — arrived in 26s",
  how_kicker:"How it works", how_h2:"Three steps. Ten minutes. Zero jargon.",
  st1_t:"Tell nalla about you", st1_b:"Six friendly questions about your goals and how you feel about risk. Takes two minutes.", st1_tag:"2 minutes",
  st2_t:"Get your low-risk mix", st2_b:"We match you to a portfolio of money-market funds and short-term bonds — tuned to grow, wired to stay calm.", st2_tag:"Built automatically",
  st3_t:"Let it quietly grow", st3_b:"Auto-save a little each month. Check in when you feel like it. Withdraw whenever life asks.", st3_tag:"Set & forget",
  saf_kicker:"Safety", saf_h2:"Low risk is a discipline, not a slogan.",
  saf_sub:"We built nalla so the worst day in your portfolio is a shrug, not a crisis.",
  sp1_t:"Custody with regulated partners", sp1_b:"Your assets sit with licensed, regulated custodians, in your name — fully separate from nalla's own accounts.",
  sp2_t:"256-bit encryption, everywhere", sp2_b:"Bank-grade security on every request, biometric login on the app, read-only bank connections.",
  sp3_t:"Nothing spicy, ever", sp3_b:"No crypto, no leverage, no exotic products. If we wouldn't put our mums' savings in it, we don't offer it.",
  sp4_t:"Out in 1–2 business days", sp4_b:"Withdrawals are always allowed, in any amount. Your money is never hostage.",
  saf_c1:"Licensed custodians", saf_c2:"Two-factor by default", saf_c3:"Monitored around the clock",
  tes_kicker:"Early members", tes_h2:"Calm people, compound results.",
  q1:"I used to open my banking app with dread. Now I open nalla, smile for four seconds, and close it. It's boring in the best possible way.", q1_n:"Sara M.", q1_r:"Product designer",
  q2:"Set up auto-save in two minutes and genuinely forgot about it. Six months later, I had an emergency fund for the first time in my life.", q2_n:"Khalid A.", q2_r:"Teacher",
  q3:"It's the first investment app my mother understands without me explaining anything. That's the whole review.", q3_n:"Lina H.", q3_r:"Software engineer",
  faq_kicker:"FAQ", faq_h2:"Fair questions.",
  faq_sub:"Everything people ask before joining — answered without the fine-print fog.",
  faq_more:"Still curious? Write us anytime —",
  fq1:"Is my money actually safe with nalla?",
  fa1:"Your investments are held with licensed, regulated custodians, in your name — separate from nalla's own accounts. We use 256-bit encryption, biometric login and read-only bank connections. And your portfolio is built exclusively from low-risk instruments: money-market funds and short-term government bonds.",
  fq2:"What does \"low risk\" really mean here?",
  fa2:"It means no crypto, no leverage, no single-stock bets. Your mix is dominated by cash-like, short-duration assets, so typical year-to-year swings stay in the low single digits. It won't make you rich overnight — it will make you steadily less anxious.",
  fq3:"How much do I need to start?",
  fa3:"$10. Seriously. Turn on round-ups and most people invest their first $100 without ever feeling it.",
  fq4:"What does nalla cost?",
  fa4:"One flat fee: 0.89% per year on your managed balance. No withdrawal fees, no trading fees, no surprise \"admin\" charges. If pricing ever changes, existing balances keep their terms.",
  fq5:"Can I withdraw whenever I want?",
  fa5:"Yes — any amount, any time, no penalties. Withdrawals typically land in your bank within 1–2 business days (our beta average is 26 seconds to initiate).",
  cta_h2:"Your future self says thanks.",
  cta_s:"Join the waitlist and be first through the door when nalla opens. Free to join, one minute to sign up.",
  cta_ph:"you@email.com", cta_btn:"Get early access",
  cta_micro:"Free to join · One minute · No spam, ever",
  cta_ok:"You're in — check your inbox.",
  err_email:"Hmm, that email doesn't look right — one more try?",
  toast_join:"You're on the list. Calm money is coming.",
  toast_soon:"That page opens with the full launch.",
  foot_tag:"Calm money for real life.",
  foot_c1:"Product", foot_c2:"Company", foot_c3:"Legal",
  fc1:"About", fc2:"Careers", fc3:"Blog", flg1:"Privacy", flg2:"Terms", flg3:"Security",
  foot_disc:"nalla is a concept product. All figures shown are illustrative only and are not guarantees of future returns. All investing involves risk, including the possible loss of principal.",
  foot_rights:"© 2025 nalla. All calm reserved.", foot_made:"Built slowly, compounded daily."
},
ar: {
  meta_title:"نلّا — نمِّي أموالك، واحتفظ بهدوئك.",
  brand_mark:"ن", brand_word:"نلّا",
  nav_why:"لماذا نلّا", nav_how:"كيف تعمل", nav_safety:"الأمان", nav_faq:"الأسئلة الشائعة", nav_cta:"انضم مبكرًا",
  hero_badge:"استثمار منخفض المخاطر، لحياة حقيقية",
  hero_h1:`نمِّي أموالك.<br>واحتفظ <em class="hl">بهدوئك.<svg class="scribble" viewBox="0 0 220 26" preserveAspectRatio="none" aria-hidden="true"><path d="M6 17 C 42 7, 86 23, 128 13 C 160 6, 190 11, 214 8" pathLength="1"></path></svg></em>`,
  hero_sub:"تبني لك «نلّا» محفظة منخفضة المخاطر من اليوم الأول — صناديق سوق المال وسندات قصيرة الأجل، لا شيء متقلب. اضبطها مرة واحدة، أضِف القليل كل شهر، واترك الفائدة المركبة تعمل بصمت.",
  hero_cta1:"احجز مكانك مبكرًا", hero_cta2:"كيف تعمل؟",
  hero_m1:"ابدأ بـ 10 دولارات فقط", hero_m2:"اسحب متى شئت",
  hero_proof:"شخص انضم بالفعل إلى القائمة",
  ph_greet:"صباح الخير، سارة", ph_label:"الرصيد الإجمالي", ph_thisyear:"هذا العام",
  ph_add:"إضافة", ph_invest:"استثمار", ph_goals:"أهداف", ph_more:"المزيد", ph_goal_t:"صندوق الطوارئ",
  chip_a_l:"آخر 12 شهرًا", chip_b:"المخاطر: منخفضة", chip_c:"نقل الادخار التلقائي 6.20 دولار اليوم",
  tk1:"نور بلغت أول 10,000 دولار للتو", tk2:"عمر سحب أمواله — وصلت خلال 26 ثانية",
  tk3:"لينا فعّلت تقريب المشتريات على 3 بطاقات", tk4:"صندوق طوارئ خالد وصل إلى 100%",
  tk5:"2,314 مستثمرًا هادئًا انضموا هذا الأسبوع", tk6:"وفّرت سارة 340 دولارًا الشهر الماضي دون أن تشعر",
  why_kicker:"لماذا نلّا", why_h2:"مبنية لتنمو. مصممة لتُحمي.",
  why_sub:"كل ما هنا موجود لسبب واحد: ألّا تضطر يومًا للاختيار بين تنمية أموالك والنوم مرتاح البال.",
  sim_t:"شاهد مستقبلك… تقريبًا", sim_s:"اسحب الشريط وجرّب المدد الزمنية. هكذا يبدو النمو المركب الهادئ منخفض المخاطر.",
  sim_lbl:"الاستثمار الشهري التلقائي", sim_y3:"3 سنوات", sim_y5:"5 سنوات", sim_y10:"10 سنوات",
  sim_out_lbl:"الرصيد المتوقع", sim_growth_lbl:"نموّ صافٍ",
  sim_leg1:"إجمالي الرصيد", sim_leg2:"الودائع",
  sim_foot:"أرقام توضيحية بعائد سنوي نموذجي 5.8% بفائدة مركبة شهرية. ليست وعدًا ولا ضمانًا — الأسواق ليست ماكينة قهوة.",
  fee_t:"رسوم واحدة ثابتة.", fee_per:"سنويًا", fee_s:"هذا كل ما في صفحة التسعير.",
  fee_f1:"بدون رسوم سحب", fee_f2:"بدون رسوم تداول", fee_f3:"بدون حد أدنى للرصيد",
  vol_t:"مملة… عن قصد", vol_s:"التقلبات النموذجية من سنة إلى أخرى",
  vol_l1:"العملات الرقمية", vol_l2:"أسهم مفردة", vol_l3:"محفظة نلّا",
  vol_cap:"دراما أقل، وفحص المحفظة عند الثالثة فجرًا… أقل بكثير.",
  save_t:"وفّر بالمصادفة", save_s:"كل عملية شراء تُقرَّب لأقرب دولار، والفكة تنساب تلقائيًا إلى محفظتك.",
  save_d1:"قهوة — 4.60 دولار", save_d2:"+0.40 دولار إلى نلّا", save_sw:"تقريب المشتريات",
  wd_t:"أموالك تسمع كلمتك", wd_s:"بدون قيود ولا «فترات احتجاز». اضغط زرًا واحدًا لتعود أموالك إلى بنكك.",
  wd_btn:"جرّب سحبًا تجريبيًا", wd_busy:"تُحوَّل إلى بنكك…", wd_done:"تم — وصلت خلال 26 ثانية",
  how_kicker:"كيف تعمل", how_h2:"ثلاث خطوات. عشر دقائق. صفر مصطلحات معقدة.",
  st1_t:"عرّف نلّا بنفسك", st1_b:"ستة أسئلة بسيطة عن أهدافك ومستوى راحتك من المخاطر. لا تستغرق دقيقتين.", st1_tag:"دقيقتان",
  st2_t:"استلم مزيجك الهادئ", st2_b:"نطابقك بمحفظة من صناديق سوق المال وسندات قصيرة الأجل — مضبوطة لتنمو، ومهيّأة لتبقى هادئة.", st2_tag:"تُبنى تلقائيًا",
  st3_t:"دعها تنمو بصمت", st3_b:"ادّخر تلقائيًا القليل كل شهر، وراجع متى شئت، واسحب متى طلبت الحياة ذلك.", st3_tag:"اضبط وانسَ",
  saf_kicker:"الأمان", saf_h2:"انخفاض المخاطر منهجٌ، لا شعار تسويقي.",
  saf_sub:"بنينا نلّا بحيث يكون أسوأ يوم في محفظتك هزّة كتف، لا أزمة.",
  sp1_t:"حفظ لدى شركاء مرخّصين", sp1_b:"أصولك محفوظة لدى أمناء حفظ مرخّصين ومنظمين وباسمك أنت — منفصلة تمامًا عن حسابات نلّا.",
  sp2_t:"تشفير 256-bit في كل مكان", sp2_b:"أمان بمعايير بنكية على كل طلب، ودخول بالبصمة، وربط بنكي للقراءة فقط.",
  sp3_t:"لا شيء حارّ، أبدًا", sp3_b:"لا عملات رقمية، لا رافعة مالية، لا منتجات غريبة. إن لم نضع مدخرات أمهاتنا فيها، فلن نعرضها.",
  sp4_t:"خروج خلال 1–2 يوم عمل", sp4_b:"السحب متاح دائمًا وبأي مبلغ. أموالك ليست رهينةً عند أحد.",
  saf_c1:"أمناء حفظ مرخّصون", saf_c2:"تحقق بخطوتين افتراضيًا", saf_c3:"مراقبة على مدار الساعة",
  tes_kicker:"أعضاء مبكرون", tes_h2:"أشخاص هادئون… نتائج مركّبة.",
  q1:"كنت أفتح تطبيق البنك وأنا متوتر. الآن أفتح «نلّا»، أبتسم أربع ثوانٍ، وأغلقه. إنها ممّلة… بأجمل طريقة ممكنة.", q1_n:"سارة م.", q1_r:"مصممة منتجات",
  q2:"فعّلت الادخار التلقائي في دقيقتين ثم نسيت الأمر فعلًا. بعد ستة أشهر، أصبح لديّ صندوق طوارئ لأول مرة في حياتي.", q2_n:"خالد أ.", q2_r:"مدرّس",
  q3:"هو أول تطبيق استثمار تفهمه والدتي دون أن أشرح لها شيئًا. وهذه هي المراجعة كاملة.", q3_n:"لينا هـ.", q3_r:"مهندسة برمجيات",
  faq_kicker:"الأسئلة الشائعة", faq_h2:"أسئلة من حقّها إجابة صريحة.",
  faq_sub:"كل ما يسألنا عنه الناس قبل الانضمام — بإجابات واضحة بلا ضباب البنود المطبوعة بحجم حبة عدس.",
  faq_more:"ما زلت متسائلًا؟ راسلنا في أي وقت —",
  fq1:"هل أموالي آمنة فعلًا مع نلّا؟",
  fa1:"تُحفظ استثماراتك لدى أمناء حفظ مرخّصين ومنظمين وباسمك أنت — منفصلة عن حسابات نلّا نفسها. نستخدم تشفير 256-bit، ودخولًا بالبصمة، وربطًا بنكيًا للقراءة فقط. أما محفظتك فمبنية حصريًا من أدوات منخفضة المخاطر: صناديق سوق المال وسندات حكومية قصيرة الأجل.",
  fq2:"ماذا يعني «منخفض المخاطر» حقًا؟",
  fa2:"يعني: لا عملات رقمية، لا رافعة مالية، ولا رهانات على سهم واحد. محفظتك يغلب عليها الطابع النقدي قصير الأجل، لذا تبقى التقلبات السنوية النموذجية في خانة الآحاد الصغيرة. لن تجعلك ثريًا بين ليلة وضحاها — لكنها ستجعلك أكثر اطمئنانًا بثبات.",
  fq3:"كم أحتاج لأبدأ؟",
  fa3:"10 دولارات. بجدية. فعّل تقريب المشتريات وسيستثمر معظم الناس أول 100 دولار دون أن يشعروا إطلاقًا.",
  fq4:"كم تكلّف نلّا؟",
  fa4:"رسوم واحدة ثابتة: 0.89% سنويًا على رصيدك المُدار. لا رسوم سحب، ولا رسوم تداول، ولا «رسوم إدارية» مفاجئة. وإذا تغيّرت أسعارنا يومًا، فالأرصدة الحالية تحتفظ بشروطها.",
  fq5:"هل أستطيع السحب متى شئت؟",
  fa5:"نعم — أي مبلغ، في أي وقت، ودون أي غرامات. تصل السحوبات عادةً إلى بنكك خلال يوم إلى يومي عمل (متوسطنا في المرحلة التجريبية: 26 ثانية لبدء التحويل).",
  cta_h2:"نسختك المستقبلية تشكرك.",
  cta_s:"انضم إلى قائمة الانتظار وكن أول من يدخل عندما تفتح نلّا أبوابها. الانضمام مجاني، والتسجيل يستغرق دقيقة واحدة.",
  cta_ph:"بريدك الإلكتروني", cta_btn:"احجز مكانك",
  cta_micro:"مجاني · دقيقة واحدة · بلا إزعاج أبدًا",
  cta_ok:"أنت داخل — تفقّد بريدك الوارد.",
  err_email:"همم، هذا البريد لا يبدو صحيحًا — جرّب مرة أخرى؟",
  toast_join:"تم التسجيل! المال الهادئ في الطريق إليك.",
  toast_soon:"تُفتح هذه الصفحة مع الإطلاق الكامل.",
  foot_tag:"مال هادئ لحياة حقيقية.",
  foot_c1:"المنتج", foot_c2:"الشركة", foot_c3:"القانونية",
  fc1:"من نحن", fc2:"وظائف", fc3:"المدونة", flg1:"الخصوصية", flg2:"الشروط", flg3:"الأمان",
  foot_disc:"نلّا منتج تجريبي لعرض الفكرة. جميع الأرقام المعروضة توضيحية فقط وليست ضمانًا لعوائد مستقبلية. كل استثمار ينطوي على مخاطر، بما فيها احتمال خسارة رأس المال.",
  foot_rights:"© 2025 نلّا. جميع الحقوق محفوظة.", foot_made:"بُنيت ببطء، ونمت بفائدة مركّبة."
}};

let lang = 'en';
const t = k => (D[lang] && D[lang][k]) ?? D.en[k];
const fmt = n => Math.round(n).toLocaleString('en-US');

/* ---------- language switching ---------- */
function applyLang(l){
  lang = l;
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.title = t('meta_title');
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.getElementById('langEn').classList.toggle('sel', l==='en');
  document.getElementById('langAr').classList.toggle('sel', l==='ar');
  document.getElementById('langEn').setAttribute('aria-pressed', l==='en');
  document.getElementById('langAr').setAttribute('aria-pressed', l==='ar');
  goSlide(ci); // re-anchor carousel for direction change
}
document.getElementById('langEn').addEventListener('click', () => applyLang('en'));
document.getElementById('langAr').addEventListener('click', () => applyLang('ar'));

/* ---------- nav: scrolled state + mobile menu ---------- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), {passive:true});
const menuBtn = document.getElementById('menuBtn'), menuIco = document.getElementById('menuIco');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  setIco(menuIco, open ? 'close' : 'menu');
});
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); setIco(menuIco, 'menu');
}));

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- waitlist counter ---------- */
let wlTarget = 12400;
const wlNum = document.getElementById('wlNum');
function countWl(from, to, dur = 1600){
  const t0 = performance.now();
  (function step(now){
    let k = Math.min(1, (now - t0) / dur); k = 1 - Math.pow(1 - k, 3);
    wlNum.textContent = fmt(from + (to - from) * k);
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
new IntersectionObserver((es, o) => es.forEach(e => {
  if (e.isIntersecting){ countWl(0, wlTarget); o.disconnect(); }
}), {threshold:.4}).observe(wlNum);

/* ---------- growth simulator ---------- */
const SIM = { monthly:150, years:5, rate:0.058, PTS:96 };
const W=560, H=250, PL=10, PR=14, PT=16, PB=30, IW=W-PL-PR, IH=H-PT-PB;
const $ = id => document.getElementById(id);
const simLine=$('simLine'), simArea=$('simArea'), simContrib=$('simContrib'),
      simEnd=$('simEnd'), simHalo=$('simHalo'), simGrid=$('simGrid'),
      simFinal=$('simFinal'), simGrowth=$('simGrowth'), simVal=$('simVal'), simRange=$('simRange');

let disp = { pts:Array(SIM.PTS).fill(0), final:0, contrib:0 }, animId = null, simStarted = false;

function resample(arr, n){
  if (arr.length < 2) return Array(n).fill(arr[0] || 0);
  const out = [];
  for (let i=0;i<n;i++){
    const x = i/(n-1)*(arr.length-1), lo = Math.floor(x), f = x-lo;
    out.push(arr[lo] + ((arr[lo+1] ?? arr[lo]) - arr[lo]) * f);
  }
  return out;
}
function computeTargets(){
  const r = SIM.rate/12, m = SIM.years*12; let v = 0; const raw = [];
  for (let i=1;i<=m;i++){ v = v*(1+r) + SIM.monthly; raw.push(v); }
  return { pts:resample(raw, SIM.PTS), final:v, contrib:SIM.monthly*m };
}
function drawGrid(){
  let html = '';
  for (let y=0; y<=SIM.years; y++){
    const x = PL + (y/SIM.years)*IW;
    html += `<line x1="${x}" y1="${PT}" x2="${x}" y2="${H-PB}"></line>`;
    html += `<text x="${x}" y="${H-10}" text-anchor="middle">${y}${y? 'y':''}</text>`;
  }
  simGrid.innerHTML = html;
}
function paint(){
  const max = Math.max(disp.final, 1) * 1.08;
  const yOf = v => PT + IH - (v/max)*IH;
  let d = '';
  disp.pts.forEach((v,i) => {
    const x = PL + (i/(SIM.PTS-1))*IW;
    d += (i? ' L':'M') + x.toFixed(1) + ',' + yOf(v).toFixed(1);
  });
  simLine.setAttribute('d', d);
  simArea.setAttribute('d', d + ` L${W-PR},${H-PB} L${PL},${H-PB} Z`);
  const x0 = PL, x1 = PL + IW, yc = yOf(disp.contrib);
  simContrib.setAttribute('d', `M${x0},${yc.toFixed(1)} L${x1},${yc.toFixed(1)}`);
  const ex = x1, ey = yOf(disp.pts[SIM.PTS-1]);
  simEnd.setAttribute('cx', ex); simEnd.setAttribute('cy', ey.toFixed(1));
  simHalo.setAttribute('cx', ex); simHalo.setAttribute('cy', ey.toFixed(1));
  simFinal.textContent = '$' + fmt(disp.final);
  simGrowth.textContent = '$' + fmt(Math.max(0, disp.final - disp.contrib));
}
function animateTo(tg, dur = 480){
  cancelAnimationFrame(animId);
  const from = { pts:disp.pts.slice(), final:disp.final, contrib:disp.contrib };
  const t0 = performance.now();
  (function step(now){
    let k = Math.min(1, (now - t0)/dur); k = 1 - Math.pow(1 - k, 3);
    disp.pts = from.pts.map((v,i) => v + (tg.pts[i]-v)*k);
    disp.final = from.final + (tg.final-from.final)*k;
    disp.contrib = from.contrib + (tg.contrib-from.contrib)*k;
    paint();
    if (k < 1) animId = requestAnimationFrame(step);
  })(t0);
}
function updateSliderFill(){
  const pct = (simRange.value - simRange.min) / (simRange.max - simRange.min) * 100;
  simRange.style.setProperty('--fill', pct + '%');
}
simRange.addEventListener('input', () => {
  SIM.monthly = +simRange.value;
  simVal.textContent = '$' + SIM.monthly;
  updateSliderFill();
  animateTo(computeTargets());
});
document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.seg button').forEach(x => x.classList.remove('sel'));
  b.classList.add('sel');
  SIM.years = +b.dataset.years;
  drawGrid();
  animateTo(computeTargets());
}));
drawGrid(); updateSliderFill(); paint();
// dramatic first draw when the tile scrolls into view
new IntersectionObserver((es, o) => es.forEach(e => {
  if (e.isIntersecting && !simStarted){
    simStarted = true;
    animateTo(computeTargets(), 1100);
    o.disconnect();
  }
}), {threshold:.35}).observe(document.querySelector('.tile-sim'));

/* ---------- volatility bars trigger (uses .reveal .in) ---------- */

/* ---------- round-ups switch ---------- */
const roundSw = document.getElementById('roundSw'), saveTile = document.getElementById('saveTile');
roundSw.addEventListener('click', () => {
  const on = roundSw.classList.toggle('on');
  roundSw.setAttribute('aria-checked', on);
  saveTile.classList.toggle('off', !on);
});

/* ---------- demo withdrawal ---------- */
const wdBtn = document.getElementById('wdBtn'), wdLine = document.getElementById('wdLine'),
      wdIco = document.getElementById('wdIco'), wdTxt = document.getElementById('wdTxt');
let wdBusy = false;
wdBtn.addEventListener('click', () => {
  if (wdBusy) return;
  wdBusy = true;
  wdLine.hidden = false; wdLine.classList.remove('ok');
  setIco(wdIco,'progress_activity'); wdIco.classList.add('spin');
  wdTxt.textContent = t('wd_busy');
  setTimeout(() => {
    setIco(wdIco,'check_circle'); wdIco.classList.remove('spin');
    wdLine.classList.add('ok'); wdTxt.textContent = t('wd_done');
    wdBusy = false;
  }, 1700);
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(x => {
      x.classList.remove('open');
      x.querySelector('.faq-q').setAttribute('aria-expanded','false');
    });
    if (!open){ item.classList.add('open'); item.querySelector('.faq-q').setAttribute('aria-expanded','true'); }
  });
});

/* ---------- testimonial carousel ---------- */
const carTrack = document.getElementById('carTrack'), carDots = document.getElementById('carDots'),
      prevBtn = document.getElementById('prevBtn'), nextBtn = document.getElementById('nextBtn');
let ci = 0, carTimer = null;
for (let i=0;i<3;i++){
  const d = document.createElement('button');
  d.className = 'dot' + (i? '' : ' act');
  d.setAttribute('aria-label', 'Slide ' + (i+1));
  d.addEventListener('click', () => goSlide(i));
  carDots.appendChild(d);
}
function goSlide(i){
  ci = (i + 3) % 3;
  const sign = document.documentElement.dir === 'rtl' ? 1 : -1;
  carTrack.style.transform = `translateX(${sign * ci * 100}%)`;
  carDots.querySelectorAll('.dot').forEach((d,k) => d.classList.toggle('act', k === ci));
}
function restartAuto(){
  clearInterval(carTimer);
  carTimer = setInterval(() => goSlide(ci + 1), 6000);
}
prevBtn.addEventListener('click', () => { goSlide(ci - 1); restartAuto(); });
nextBtn.addEventListener('click', () => { goSlide(ci + 1); restartAuto(); });
const car = document.getElementById('carousel');
car.addEventListener('mouseenter', () => clearInterval(carTimer));
car.addEventListener('mouseleave', restartAuto);
restartAuto();

/* ---------- toast ---------- */
const toast = document.getElementById('toast'), toastMsg = document.getElementById('toastMsg');
let toastT = null;
function showToast(msg){
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toast.classList.remove('show'), 3800);
}

/* ---------- confetti burst (small lemon dots) ---------- */
function burst(x, y){
  const colors = ['#E6E84E','#F2F4A0','#CFD24A','#FFFFFF'];
  for (let i=0;i<14;i++){
    const p = document.createElement('span');
    p.className = 'pt';
    p.style.background = colors[i % colors.length];
    p.style.left = x + 'px'; p.style.top = y + 'px';
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 70;
    p.animate([
      { transform:'translate(0,0) scale(1)', opacity:1 },
      { transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d - 30}px) scale(.4)`, opacity:0 }
    ], { duration: 650 + Math.random()*300, easing:'cubic-bezier(.2,.7,.3,1)' })
     .onfinish = () => p.remove();
  }
}

/* ---------- waitlist form ---------- */
const joinForm = document.getElementById('joinForm'), email = document.getElementById('email'),
      emailErr = document.getElementById('emailErr'), ctaOk = document.getElementById('ctaOk');
joinForm.addEventListener('submit', e => {
  e.preventDefault();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
  if (!ok){
    emailErr.hidden = false;
    email.classList.add('bad');
    setTimeout(() => email.classList.remove('bad'), 400);
    return;
  }
  emailErr.hidden = true;
  joinForm.hidden = true;
  document.querySelector('.cta-wrap .micro').hidden = true;
  ctaOk.hidden = false;
  const r = document.getElementById('joinBtn').getBoundingClientRect();
  burst(r.left + r.width/2, r.top + r.height/2);
  wlTarget += 1;
  countWl(wlTarget - 1, wlTarget, 600);
  showToast(t('toast_join'));
});

/* ---------- footer "coming soon" links ---------- */
document.querySelectorAll('.soon').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  showToast(t('toast_soon'));
}));

/* ---------- init ---------- */
applyLang('en');
requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));

/* theme */
(function(){const b=document.getElementById('themeBtn');let t='dark';try{t=localStorage.getItem('nl_theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){}
function ap(x){document.documentElement.setAttribute('data-theme',x);setIco(b.firstElementChild,x==='dark'?'light_mode':'dark_mode');b.setAttribute('aria-label',document.documentElement.lang==='ar'?(x==='dark'?'الوضع الفاتح':'الوضع الداكن'):(x==='dark'?'Light mode':'Dark mode'));b.setAttribute('aria-pressed',x==='light');try{localStorage.setItem('nl_theme',x)}catch(e){}}
ap(t);b.addEventListener('click',()=>ap(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
new MutationObserver(()=>ap(document.documentElement.getAttribute('data-theme'))).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});})();
