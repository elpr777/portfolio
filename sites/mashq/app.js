
(function(){
'use strict';
/* ===== الحالة والأدوات ===== */
var store={
  get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},
  set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}
};
var initLang=store.get('mashq-lang')||(((navigator.language||'').toLowerCase().indexOf('ar')===0)?'ar':'en');
var initTheme=store.get('mashq-theme')||(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
document.documentElement.setAttribute('data-theme',initTheme);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-action="theme"]');if(!b)return;var n=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);store.set('mashq-theme',n);$$('[data-action="theme"]').forEach(function(x){x.setAttribute('aria-label',themeLbl())});var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',n==='dark'?'#0B1620':'#0E2A3F')});
var state={lang:initLang,page:'home',age:'all',topic:'all',type:'all',story:'all',pillar:0,ageTab:'6-9'};
function $(s,c){return (c||document).querySelector(s)}
function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
function P(en,ar){return{en:en,ar:ar}}
function T(o){return o[state.lang]}
function tt(en,ar){return state.lang==='ar'?ar:en}
function ic(n,c){return '<svg class="icon'+(c?' '+c:'')+'" aria-hidden="true"><use href="#i-'+n+'"></use></svg>'}
function delay(ms){return new Promise(function(r){setTimeout(r,ms)})}
function rm(){return window.matchMedia('(prefers-reduced-motion: reduce)').matches}

/* ===== طبقة البيانات (جاهزة للربط بـCMS حقيقي) ===== */
var TOPICS={
  faith:{ic:'heart',label:P('Faith & Values','إيمان وقيم')},
  science:{ic:'atom',label:P('Science & Discovery','علوم واكتشاف')},
  skills:{ic:'users',label:P('Life Skills','مهارات حياة')},
  create:{ic:'shapes',label:P('Creativity','إبداع')},
  think:{ic:'compass',label:P('Critical Thinking','تفكير نقدي')}
};
var TYPES={weekly:P('Weekly program','برنامج أسبوعي'),camp:P('Camp','معسكر'),workshop:P('Workshop','ورشة'),family:P('Family experience','تجربة عائلية')};
var AGES={
  '6-9':{name:P('Little Explorers','المستكشفون الصغار'),range:'6–9',cls:'ab-amber',accent:'amber'},
  '10-13':{name:P('Young Discoverers','المكتشفون الناشئون'),range:'10–13',cls:'ab-teal',accent:'teal'},
  '14-17':{name:P('Future Thinkers','مفكّرو المستقبل'),range:'14–17',cls:'ab-coral',accent:'coral'}
};
var STATUS={open:{cls:'b-open',label:P('Registration open','التسجيل مفتوح')},few:{cls:'b-few',label:P('Few seats left','مقاعد محدودة')},wait:{cls:'b-wait',label:P('Waitlist','قائمة انتظار')},soon:{cls:'b-soon',label:P('Coming soon','قريبًا')}};

var DATA={
programs:[
 {id:'cosmic',age:'6-9',type:'weekly',topics:['science','faith'],fee:P('QR 950 / term','950 ريال / فصل'),
  name:P('Cosmic Wonders','عجائب الكون'),
  desc:P('From the moon’s phases to the verses that invite us to look up — children explore the sky through stories, crafts and a real telescope night.','من أطوار القمر إلى الآيات التي تدعونا للتطلّع — يستكشف الأطفال السماء بالقصص والأعمال اليدوية وليلة رصدٍ حقيقية بمنظار.'),
  objectives:[P('Name the moon phases and trace them in the real sky','تسمية أطوار القمر وتتبّعها في السماء الحقيقية'),P('Connect what they see to verses about the heavens','ربط ما يرونه بالآيات الواردة في السماوات'),P('Ask better questions than “is space big?”','طرح أسئلة أعمق من «هل الفضاء كبير؟»')],
  duration:P('8 weeks · Saturdays','8 أسابيع · السبت'),format:P('On-site · MASHQ Studio, Al Sadd','حضوري · استوديو مَشق، السد'),schedule:P('9:30–11:30 AM','9:30–11:30 صباحًا'),group:P('12 children · 2 facilitators','12 طفلًا · موجّهان')},
 {id:'earth',age:'6-9',type:'weekly',topics:['faith','skills'],fee:P('QR 850 / term','850 ريال / فصل'),
  name:P('Earth Keepers','أمناء الأرض'),
  desc:P('Gardening, recycling challenges and the prophetic etiquette of never wasting — stewardship children can hold in their own hands.','زراعة، وتحدّيات إعادة تدوير، وسُنّة عدم الإسراف — أمانة الأرض بين أيديهم هم أنفسهم.'),
  objectives:[P('Grow and care for a plant across the whole term','زراعة نبتة والعناية بها طوال الفصل'),P('Build the habit of “enough, not more”','ترسيخ عادة «الكفاية لا الإسراف»'),P('Lead one small clean-up mission at home','قيادة مهمة تنظيف صغيرة في البيت')],
  duration:P('8 weeks · Saturdays','8 أسابيع · السبت'),format:P('On-site · MASHQ Garden','حضوري · حديقة مَشق'),schedule:P('11:30 AM–1:30 PM','11:30–1:30 ظهرًا'),group:P('12 children · 2 facilitators','12 طفلًا · موجّهان')},
 {id:'stories',age:'6-9',type:'weekly',topics:['create','faith'],fee:P('QR 850 / term','850 ريال / فصل'),
  name:P('Stories & Making','من الحكاية إلى الصنعة'),
  desc:P('Each week, one story of a prophet or a companion — then we build its world with clay, wood, light and colour.','كل أسبوع حكاية من حكايات الأنبياء والصحابة — ثم نبني عالمها بالطين والخشب والضوء واللون.'),
  objectives:[P('Retell stories in their own words and their own builds','إعادة سرد القصص بكلماتهم وأعمالهم اليدوية'),P('Turn listening into making','تحويل الإصغاء إلى صنعة'),P('Discover that faith has imagination','اكتشاف أن للإيمان خيالًا واسعًا')],
  duration:P('8 weeks · Saturdays','8 أسابيع · السبت'),format:P('On-site · MASHQ Workshop','حضوري · ورشة مَشق'),schedule:P('1:30–3:30 PM','1:30–3:30 عصرًا'),group:P('12 children · 2 facilitators','12 طفلًا · موجّهان')},
 {id:'golden',age:'10-13',type:'weekly',topics:['science','faith'],fee:P('QR 1,100 / term','1,100 ريال / فصل'),
  name:P('Golden Age Lab','مختبر العصر الذهبي'),
  desc:P('Rebuild Ibn al-Haytham’s dark room, Al-Khwarizmi’s algorithms and Banu Musa’s machines — the golden age, with safety goggles on.','نعيد بناء «بيت الظلام» لابن الهيثم وخوارزميات الخوارزمي وآلات بني موسى — العصر الذهبي بنظّارات السلامة.'),
  objectives:[P('Recreate six historic inventions','إعادة بناء ستة اختراعات تاريخية'),P('Trace ideas from Baghdad to the modern lab','تتبّع الأفكار من بغداد إلى المختبر الحديث'),P('See Muslim scientists as peers, not posters','رؤية العلماء المسلمين زملاءً لا صورًا على الجدران')],
  duration:P('8 weeks · Saturdays','8 أسابيع · السبت'),format:P('On-site · MASHQ Lab','حضوري · مختبر مَشق'),schedule:P('10:00 AM–1:00 PM','10:00–1:00 صباحًا'),group:P('14 students · 2 facilitators','14 طالبًا · موجّهان')},
 {id:'robots',age:'10-13',type:'weekly',topics:['science','skills'],fee:P('QR 1,250 / term','1,250 ريال / فصل'),
  name:P('Robots & Conscience','روبوتات وضمير'),
  desc:P('Build and program real robots — then pause and ask the harder question: not “can it?”, but “should it?” Technology with an ethical compass.','نبني الروبوتات ونبرمجها — ثم نتوقّف للسؤال الأصعب: ليس «هل يستطيع؟» بل «هل ينبغي؟». تقنية ببوصلة أخلاقية.'),
  objectives:[P('Program a robot to complete three challenges','برمجة روبوت لإكمال ثلاثة تحدّيات'),P('Debate real AI dilemmas in age-honest terms','مناقشة معضلات الذكاء الاصطناعي بلغة مناسبة لأعمارهم'),P('Write a personal “tech code of honour”','كتابة «ميثاق شرف» تقني شخصي')],
  duration:P('8 weeks · Saturdays','8 أسابيع · السبت'),format:P('On-site · MASHQ Lab','حضوري · مختبر مَشق'),schedule:P('2:00–5:00 PM','2:00–5:00 عصرًا'),group:P('14 students · 2 facilitators','14 طالبًا · موجّهان')},
 {id:'research',age:'10-13',type:'workshop',topics:['think'],fee:P('QR 700 / course','700 ريال / دورة'),
  name:P('Young Researchers','باحثون صغار'),
  desc:P('A four-week sprint: pick a real question, gather evidence, test it — and present your findings to families like a tiny TED.','سبرنت من أربعة أسابيع: اختر سؤالًا حقيقيًا، واجمع الأدلّة، واختبره — ثم اعرض نتائجك أمام العائلات كأنك في مؤتمر.'),
  objectives:[P('Design a fair test','تصميم اختبار علمي عادل'),P('Tell data from opinion','التمييز بين الدليل والرأي'),P('Present with confidence (and slides!)','العرض بثقة — ومع بعض الشرائح')],
  duration:P('4 weeks · Thursdays','4 أسابيع · الخميس'),format:P('On-site + home fieldwork','حضوري + عمل ميداني منزلي'),schedule:P('5:00–7:00 PM','5:00–7:00 مساءً'),group:P('16 students · 1 mentor','16 طالبًا · موجّه واحد')},
 {id:'physics',age:'14-17',type:'weekly',topics:['science','faith'],fee:P('QR 1,200 / term','1,200 ريال / فصل'),
  name:P('Faith & Physics','الإيمان والفيزياء'),
  desc:P('Time, light and the beginning of everything — a reading-and-dialogue circle where cosmology and conviction meet on equal footing.','الزمن والضوء وبداية كل شيء — حلقة قراءة وحوار يلتقي فيها علم الكون والإيمان على قدم المساواة.'),
  objectives:[P('Discuss real cosmology — honestly and precisely','مناقشة علم الكون الحقيقي بدقّة وصدق'),P('Practise holding belief and evidence together','التمرّن على الجمع بين اليقين والدليل'),P('Write a personal essay: “What I believe and why”','كتابة مقال شخصي: «ما أؤمن به ولماذا»')],
  duration:P('8 weeks · Fridays','8 أسابيع · الجمعة'),format:P('On-site · Seminar room','حضوري · قاعة ندوات'),schedule:P('5:00–7:30 PM','5:00–7:30 مساءً'),group:P('16 students · 1 mentor','16 طالبًا · موجّه واحد')},
 {id:'ventures',age:'14-17',type:'workshop',topics:['skills','create'],fee:P('QR 1,400 / course','1,400 ريال / دورة'),
  name:P('Purpose Ventures','مشاريع بمعنى'),
  desc:P('Design a real project for a real community need — budget, pitch, prototype — with mentorship from Qatari entrepreneurs.','صمّم مشروعًا حقيقيًا لحاجة مجتمعية حقيقية — ميزانية وعرض ونموذج أولي — بإشراف رواد أعمال قطريين.'),
  objectives:[P('Ship a working prototype or campaign','إطلاق نموذج أولي عامل أو حملة فعلية'),P('Pitch to a real panel','عرض الفكرة أمام لجنة حقيقية'),P('Learn that purpose scales better than hype','تعلّم أن الأثر أنمى من الضجيج')],
  duration:P('6 weeks · Tuesdays','6 أسابيع · الثلاثاء'),format:P('On-site + community visits','حضوري + زيارات مجتمعية'),schedule:P('5:00–8:00 PM','5:00–8:00 مساءً'),group:P('18 students · 2 mentors','18 طالبًا · موجّهان')},
 {id:'media',age:'14-17',type:'weekly',topics:['think','faith'],fee:P('QR 1,000 / term','1,000 ريال / فصل'),
  name:P('Truth & Media','الحقيقة والإعلام'),
  desc:P('Who made this claim? Why now? Who profits? Media literacy as a moral skill — for a feed that never sleeps.','من قال هذا؟ ولماذا الآن؟ ومَن يستفيد؟ محو أمية إعلامية كمهارة أخلاقية — لتغذيةٍ لا تنام.'),
  objectives:[P('Fact-check like a journalist','التحقّق من الأخبار كصحفي محترف'),P('Spot manipulation techniques in the wild','اصطياد تقنيات التلاعب أثناء استعمالها فعليًا'),P('Build a family media agreement','بناء اتفاق إعلامي عائلي مكتوب')],
  duration:P('8 weeks · Fridays','8 أسابيع · الجمعة'),format:P('Hybrid · on-site + online','مختلط · حضوري وعن بُعد'),schedule:P('3:00–5:00 PM','3:00–5:00 عصرًا'),group:P('18 students · 1 mentor','18 طالبًا · موجّه واحد')},
 {id:'dialogue',age:'14-17',type:'workshop',topics:['skills','think'],fee:P('QR 800 / course','800 ريال / دورة'),
  name:P('The Art of Dialogue','فنّ الحوار'),
  desc:P('Classical rhetoric meets modern disagreement: how to argue well, listen harder, and disagree without breaking bonds.','بلاغة كلاسيكية تلتقي خلافًا عصريًا: كيف تحاجّ بإحكام، وتُصغي أكثر، وتختلف دون أن تقطع علاقة.'),
  objectives:[P('Structure an argument that survives questions','بناء حجّة تصمد أمام الأسئلة'),P('Steelman the other side before answering it','تقوية حجّة الطرف الآخر قبل الردّ عليها'),P('Host a live, moderated debate','إدارة مناظرة حيّة بإشراف كامل')],
  duration:P('4 weeks · Fridays','4 أسابيع · الجمعة'),format:P('On-site · Seminar room','حضوري · قاعة ندوات'),schedule:P('1:00–3:30 PM','1:00–3:30 ظهرًا'),group:P('20 students · 1 mentor','20 طالبًا · موجّه واحد')},
 {id:'wintercamp',age:'10-13',type:'camp',topics:['science','create'],fee:P('QR 1,800 / camp','1,800 ريال / المعسكر'),
  name:P('Winter Discovery Camp','معسكر الاكتشاف الشتوي'),
  desc:P('Five days of experiments, field trips, builds and evening stories — the camp our returning families book first.','خمسة أيام من التجارب والرحلات الميدانية والبناء وحكايات المساء — المعسكر الذي تحجزه عائلاتنا أولًا.'),
  objectives:[P('Twelve experiments in five days','اثنتا عشرة تجربة في خمسة أيام'),P('Two field visits across Doha','زيارتان ميدانيتان في أنحاء الدوحة'),P('A closing exhibition for parents','معرض ختامي يستقبله الأهل')],
  duration:P('5 days · Dec 15–19','5 أيام · 15–19 ديسمبر'),format:P('Daily 9:00 AM–2:00 PM','يوميًا 9:00 صباحًا–2:00 ظهرًا'),schedule:P('Winter break','الإجازة الشتوية'),group:P('24 campers · 4 staff','24 معسكرًا · 4 من الفريق')},
 {id:'lanterns',age:'6-9',type:'family',topics:['faith','create'],fee:P('QR 600 / family','600 ريال / للعائلة'),
  name:P('Ramadan Nights: Lanterns & Light','ليالي رمضان: الفوانيس والنور'),
  desc:P('Four family evenings in the month of light: stories, lantern-making, and night-prayer reflections sized for children.','أربع أمسيات عائلية في شهر النور: قصص وصناعة فوانيس وتأمّلات قيامٍ بمقاس الأطفال.'),
  objectives:[P('Build a paper-and-LED lantern together','صناعة فانوس ورقي بإضاءة LED معًا'),P('Collect family favourite “light” verses','جمع آيات النور المفضّلة في دفتر عائلي'),P('Close with a children’s night-prayer experience','ختامٌ بتجربة قيام مصغّرة للأطفال')],
  duration:P('4 evenings · Ramadan','4 أمسيات · رمضان'),format:P('Families together','معًا كعائلة واحدة'),schedule:P('7:00–9:00 PM','7:00–9:00 مساءً'),group:P('20 families · open hall','20 عائلة · قاعة مفتوحة')}
],
events:[
 {id:'astro',d:'24',m:P('JAN','يناير'),status:'open',fee:P('Free','مجانًا'),
  title:P('Family Astronomy Night','أمسية فلكية عائلية'),
  when:P('Friday · 7:00–9:00 PM','الجمعة · 7:00–9:00 مساءً'),loc:P('Katara — the lawns','كتارا — الحدائق المكشوفة'),who:P('All ages · families','كل الأعمار · عائلات'),
  desc:P('Telescopes on the lawn, hot chocolate, and the scholars who first mapped the sky — a night for the whole family.','مناظير على المرج وشوكولاتة ساخنة وقصص العلماء الذين رسموا السماء أولًا — أمسية لكل العائلة.')},
 {id:'winter',d:'15',m:P('DEC','ديسمبر'),status:'few',fee:P('QR 1,800','1,800 ريال'),
  title:P('Winter Discovery Camp','معسكر الاكتشاف الشتوي'),
  when:P('Dec 15–19 · 9:00 AM–2:00 PM','15–19 ديسمبر · 9 صباحًا–2 ظهرًا'),loc:P('MASHQ Campus · Al Sadd','مجمّع مَشق · السد'),who:P('Ages 8–13','8–13 سنة'),
  desc:P('Five days of experiments, field trips, builds and evening stories — our most requested camp, back for its fourth year.','خمسة أيام من التجارب والرحلات والبناء وحكايات المساء — معسكرنا الأكثر طلبًا في عامه الرابع.')},
 {id:'parents',d:'06',m:P('FEB','فبراير'),status:'open',fee:P('Free','مجانًا'),
  title:P('Parents’ Circle: Raising Curious Kids','حلقة الأهل: كيف نُنشئ طفلًا فضوليًا'),
  when:P('Thursday · 6:30–8:00 PM','الخميس · 6:30–8:00 مساءً'),loc:P('MASHQ Library','مكتبة مَشق'),who:P('Parents & educators','أهل ومعلمون'),
  desc:P('An honest conversation about protecting curiosity in the age of grades, screens and comparison.','حوار صريح عن حماية الفضول في زمن الدرجات والشاشات والمقارنات.')},
 {id:'fair',d:'08',m:P('MAR','مارس'),status:'open',fee:P('Free entry','دخول مجاني'),
  title:P('Young Inventors Fair','معرض المخترعين الصغار'),
  when:P('Saturday · 10:00 AM–1:00 PM','السبت · 10:00 صباحًا–1:00 ظهرًا'),loc:P('MASHQ Campus','مجمّع مَشق'),who:P('Ages 10–15','10–15 سنة'),
  desc:P('Young researchers present six weeks of work — come test their inventions, ask hard questions, and vote for the People’s Choice.','يعرض الباحثون الصغار ستة أسابيع من العمل — جرّب اختراعاتهم واطرح أسئلتك وامنح صوتك لجائزة الجمهور.')},
 {id:'workshop',d:'01',m:P('MAR','مارس'),status:'wait',fee:P('QR 120 / family','120 ريال / عائلة'),
  title:P('Lanterns & Light Workshop','ورشة الفوانيس والنور'),
  when:P('Saturday · two sessions: 11 AM & 5 PM','السبت · جلستان: 11 صباحًا و5 مساءً'),loc:P('MASHQ Studio','استوديو مَشق'),who:P('Ages 6+ · with family','6 سنوات فأكثر · مع العائلة'),
  desc:P('Paper, LEDs and the story of light in the month of light. Builds you will actually keep.','ورق وإضاءة LED وحكاية النور في شهر النور — صناعة تبقى معكم على أرض الواقع.')},
 {id:'shore',d:'12',m:P('APR','أبريل'),status:'soon',fee:P('Free','مجانًا'),
  title:P('Shoreline Stewards','حُماة الشاطئ'),
  when:P('Saturday · 8:00–11:00 AM','السبت · 8:00–11:00 صباحًا'),loc:P('Fuwairit Beach','شاطئ الفويرط'),who:P('All ages · families','كل الأعمار · عائلات'),
  desc:P('A morning clean-up, a coastal-species scavenger hunt, and a reflection on amanah — our trust with the sea. Registration opens Mar 15.','صباح تنظيف ورحلة اصطياد لأنواع الساحل وتأمّل الأمانة مع البحر. يفتح التسجيل في 15 مارس.')}
],
pillars:[
 {ic:'heart',name:P('Islamic Values','القيم الإسلامية'),
  desc:P('Not memorised answers — lived values. Honesty, gratitude, mercy and stewardship show up in how we learn, not just in what we learn.','ليست إجابات تُحفَظ، بل قيم تُعاش. الصدق والشكر والرحمة والأمانة تظهر في أسلوبنا في التعلّم، لا في مادّته فحسب.'),
  practice:P('Children keep a weekly “gratitude note” and design one small act of service each term.','يكتب الأطفال «ملاحظة شكر أسبوعية» ويصمّمون عمل خدمة صغيرًا واحدًا كل فصل.')},
 {ic:'flask',name:P('Scientific Thinking','التفكير العلمي'),
  desc:P('Questions before answers. Children hypothesise, test, fail safely and try again — the engine of every MASHQ session.','الأسئلة قبل الإجابات. يفترض الأطفال ويجرّبون ويخطئون بأمان ثم يعيدون المحاولة — هذا محرّك كل جلسة في مَشق.'),
  practice:P('Every experiment ends with one question: “What would you change next time?”','كل تجربة تنتهي بسؤال واحد: «ما الذي ستغيّره في المرة القادمة؟»')},
 {ic:'users',name:P('Life Skills','مهارات الحياة'),
  desc:P('Speaking up, listening, collaborating, managing time and money — skills school reports rarely measure and life always demands.','أن تتكلّم وتُصغي وتتعاون وتدير وقتك ومالك — مهارات نادرًا ما تقيسها الشهادات وتبحث عنها الحياة دائمًا.'),
  practice:P('Older students host our community events themselves — from planning to the microphone.','ينظّم كبار الطلاب فعالياتنا المجتمعية بأنفسهم — من التخطيط حتى المايكروفون.')},
 {ic:'shapes',name:P('Creativity','الإبداع'),
  desc:P('Every idea deserves a making. We build, film, write, code and craft — because imagination grows when it finds hands.','لكل فكرةٍ أن تُصنَع. نبني ونصوّر ونكتب ونبرمج ونصنع — لأن الخيال ينمو حين يجد يدًا تعمل به.'),
  practice:P('Each term closes with a student-made exhibition that families walk through.','يُختتم كل فصل بمعرض يصنعه الطلاب بأنفسهم ويتجوّل فيه الأهل.')},
 {ic:'spark',name:P('Curiosity','الفضول'),
  desc:P('The first gift and the goal. We protect a child’s right to ask “why” — and a teenager’s courage to ask “why not”.','أوّل عطايانا وغايتها. نحفظ حقّ الطفل في أن يسأل «لماذا»، وحقّ المراهق في أن يسأل «ولماذا لا».'),
  practice:P('Our signature Question Wall: every question posted gets an answer — or an experiment.','«جدار الأسئلة» الذي نتميّز به: كل سؤال يُعلَّق عليه يجد إجابة — أو تجربة.')}
],
lenses:[
 {ic:'telescope',title:P('Space','الفضاء'),prog:P('Cosmic Wonders','عجائب الكون'),
  discover:P('The universe is about 13.8 billion years old — and still expanding, a fact confirmed only in the twentieth century.','يبلغ عمر الكون نحو 13.8 مليار سنة — وما زال يتمدّد، وهي حقيقة لم تُثبَت علميًا إلا في القرن العشرين.'),
  reflect:P('“And the heaven We constructed with strength, and indeed, We are [its] expander.” (51:47) — What does it mean to live inside a creation that is still unfolding?','«وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ» (الذاريات 47) — ماذا يعني أن نسكن خلقةً ما زالت في اتساع؟')},
 {ic:'leaf',title:P('Water & Nature','الماء والطبيعة'),prog:P('Earth Keepers','أمناء الأرض'),
  discover:P('Every living thing we have ever found depends on water — down to the smallest cell.','كل كائن حيّ اكتشفناه على الإطلاق يعتمد على الماء — وصولًا إلى أصغر خلية.'),
  reflect:P('“And We made from water every living thing.” (21:30) — If water is the origin of life, what does wasting it say about us?','«وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ» (الأنبياء 30) — إذا كان الماء أصل الحياة، فماذا يقول إسرافُنا فيه عنّا؟')},
 {ic:'heart',title:P('The Human Body','جسد الإنسان'),prog:P('Golden Age Lab','مختبر العصر الذهبي'),
  discover:P('Your heart beats around 100,000 times a day — without a single reminder.','ينبض قلبك نحو مئة ألف نبضة يوميًا — دون تذكيرٍ واحد.'),
  reflect:P('“Then let man consider what he was created from.” (86:5) — What does it mean to be wonderfully made, and wonderfully entrusted?','«فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ» (الطارق 5) — ما معنى أن تُخلَق إحسانًا، وتُؤتَمَن أمانةً؟')},
 {ic:'compass',title:P('The Earth','الأرض'),prog:P('Earth Keepers','أمناء الأرض'),
  discover:P('Mountains have deep roots beneath the surface — vast masses that help stabilise the crust.','للجبال جذور عميقة تحت السطح — كتلٌ هائلة تسهم في استقرار القشرة الأرضية.'),
  reflect:P('“Have We not made the earth a resting place, and the mountains as pegs?” (78:6–7) — What else holds us steady that we never notice?','«أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا وَالْجِبَالَ أَوْتَادًا» (النبأ 6–7) — وما الذي يثبّتنا غيرها ولا ننتبه؟')},
 {ic:'spark',title:P('Light & Optics','الضوء والبصريات'),prog:P('Faith & Physics','الإيمان والفيزياء'),
  discover:P('Around 1015 CE, Ibn al-Haytham proved that light travels from objects into our eyes — founding modern optics.','نحو عام 1015م أثبت ابن الهيثم أن الضوء ينتقل من الأجسام إلى أعيننا — مؤسِّسًا علم البصريات الحديث.'),
  reflect:P('“Light upon light.” (24:35) — How many kinds of light can you name — beyond the ones we see?','«نُّورٌ عَلَىٰ نُورٍ» (النور 35) — كم نوعًا من النور تستطيع أن تسمّيه — سوى ما تراه عيناك؟')}
],
journey:[
 {ic:'spark',name:P('Wonder','الدهشة'),txt:P('We begin with something worth marvelling at: a fact, a story, an object, a sky.','نبدأ بما يستحقّ الدهشة: حقيقة، أو قصة، أو شيء بين الأيدي، أو سماء.'),q:P('“Woah. Why is it like that?”','«وااو! لماذا هو هكذا؟»')},
 {ic:'compass',name:P('Explore','الاستكشاف'),txt:P('Hands before answers. Children touch, sort, build, measure — gathering raw experience.','الأيدي قبل الإجابات. يلمس الأطفال ويرتّبون ويبنون ويقيسون — خبرة خام بكل حواسهم.'),q:P('“Can I try it my way?”','«هل أجرّب طريقتي أنا؟»')},
 {ic:'chat',name:P('Question','السؤال'),txt:P('We slow down and ask better questions. No question is silly; some are saved for the Question Wall.','نتمهّل لنطرح أسئلة أعمق. لا سؤال سخيّ عندنا؛ وبعضها يُعلَّق على جدار الأسئلة.'),q:P('“But what if it’s the other way around?”','«ماذا لو كان العكس هو الصحيح؟»')},
 {ic:'telescope',name:P('Discover','الاكتشاف'),txt:P('Now comes knowledge — found, not delivered. Students test ideas against evidence and tradition together.','هنا يأتي العلم — مُكتشَفًا لا مُلقَّنًا. يختبر الطلبة أفكارهم بالدليل والعلم معًا.'),q:P('“I think I’ve got it… but let me check.”','«أظنّني فهمت… لكن دعني أتحقق.»')},
 {ic:'flask',name:P('Apply','التطبيق'),txt:P('Learning leaves the room: a service project, an experiment at home, a story retold to a younger sibling.','يتجاوز التعلّم جدران القاعة: مشروع خدمة، أو تجربة في البيت، أو حكاية يُعيد سردها لأخيه الصغير.'),q:P('“Can I show you what I made?”','«هل أريك ما صنعته؟»')},
 {ic:'plant',name:P('Grow','النموّ'),txt:P('We close the loop: what changed in how you see the world — and in how you treat people?','نُغلق الدائرة: ما الذي تغيّر في نظرتك للعالم — وفي تعاملك مع الناس؟'),q:P('“Next time, I want to go further.”','«في المرة القادمة أريد أن أصل أبعد.»')}
],
articles:[
 {id:'stars',cat:'science',time:P('6 min','6 دقائق'),date:P('Jan 12, 2025','12 يناير 2025'),author:P('The MASHQ Team','فريق مَشق'),
  title:P('Five questions kids ask about the stars — and how to answer them together','خمسة أسئلة يطرحها الأطفال عن النجوم — وكيف تُجيبونها معًا'),
  excerpt:P('“Why doesn’t the moon fall?” is not a silly question. It’s Newton’s question. Here’s how to explore it at the kitchen table.','«لماذا لا يسقط القمر؟» ليس سؤالًا عبثًا؛ إنه سؤال نيوتن. إليك كيف تستكشفونه على مائدة العشاء.'),
  body:[
   P('Children ask enormous questions at the least convenient moments — in the car, at dinner, five minutes after lights-out. We think that’s a feature, not a bug. Curiosity arrives unannounced; our job is simply to open the door.','يطرح الأطفال أسئلتهم الضخمة في أوقاتٍ لا تناسبنا أبدًا — في السيارة، على مائدة العشاء، بعد خمس دقائق من إطفاء النور. ونحن نرى في ذلك ميزةً لا خللًا؛ فالفضول يأتي بلا موعد، ومهمتنا أن نفتح له الباب.'),
   P('Start with the classics. Why doesn’t the moon fall? (It does — it keeps falling around the Earth.) Where does the sky end? (Further than a car could drive in a million lifetimes — yet closer than you think: you are in it.) Why do stars twinkle but planets don’t? (Give it a week of looking up together and you’ll both spot the difference.)','ابدأوا بالكلاسيكيات. لماذا لا يسقط القمر؟ (إنه يسقط — لكنه يظلّ يسقط حول الأرض.) أين تنتهي السماء؟ (أبعد مما تطاله سيارة في مليون عمر — ومع ذلك أقرب مما تظن: أنتم داخلها.) لماذا تلمع النجوم ولا تلمع الكواكب؟ (امنحوا أنفسكم أسبوعًا من التطلّع معًا، وستجدون الفرق معًا.)'),
   P('You don’t need answers; you need company. “I don’t know — how could we find out?” is the most educational sentence a parent can say. The Quran praises those who ponder the sky; it never asks us to have the final answer, only to look — and keep looking.','لا تحتاجون الإجابات الجاهزة؛ تحتاجون المرافقة. «لا أدري — وكيف يمكننا أن نكتشف؟» هي أكثر جملة تربوية يمكن أن يقولها أحد الوالدين. القرآن يمدح المتفكرين في السماء، ولا يطلب منا امتلاك الإجابة النهائية، بل النظر — ومواصلة النظر.'),
   P('This month’s family mission: one night, one blanket, one question. The universe will do the rest.','مهمة هذا الشهر العائلية: ليلة واحدة، بطانية واحدة، سؤال واحد. والكون سيتولّى البقية.')]
 },
 {id:'amanah',cat:'faith',time:P('5 min','5 دقائق'),date:P('Dec 28, 2024','28 ديسمبر 2024'),author:P('Fatima Zakaria','فاطمة زكريا'),
  title:P('Curiosity is an amanah','الفضول أمانة'),
  excerpt:P('The first revealed word of the Quran was a command to read. What would it mean to raise children who treat questions as a trust?','أول كلمة نزلت من القرآن كانت أمرًا بالقراءة. ماذا يعني أن نُنشئ أطفالًا يعتبرون الأسئلة أمانة؟'),
  body:[
   P('We often speak of protecting children’s curiosity as if it were a nice extra — something to allow when the homework is done. But in our tradition, seeking understanding is not decoration; it is devotion. The Quran’s first command was iqra: read, and read in the name of the Generous.','غالبًا ما نتحدث عن حماية فضول الأطفال وكأنه شيء إضافي لطيف — نسمح به إذا ما أُنجزت الواجبات. لكن في تقليدنا، طلب الفهم ليس زينة؛ إنه عبادة. أول أمرٍ في القرآن كان «اقرأ»: اقرأ، واقرأ باسم الجواد.'),
   P('A question from a child is therefore an amanah — a trust placed in our hands. We can hold it with care: repeat it, honour it, explore it. Or we can drop it: “because I said so,” “you’re too young,” “not now.” Trusts are not lost in one moment; they leak, quietly, every time curiosity is turned away.','سؤال الطفل إذًا أمانة — وُضعت في أيدينا. يمكننا أن نحملها بإتقان: نعيدها، ونُكرّمها، ونستكشفها. أو أن نُوقعها: «لأنني قلت»، «أنت صغير»، «ليس الآن». الأمانة لا تضيع في لحظة واحدة؛ إنها تسرّب بهدوء، كلما رُدّ الفضول خائبًا.'),
   P('Our promise at MASHQ is simple: no honest question leaves our rooms unanswered, unexplored, or ashamed of itself. We suggest the same rule for your home. It changes dinner-table conversation faster than you’d think.','وعدنا في مَشق بسيط: لا يخرج من قاعاتنا سؤالٌ صادق بلا إجابة، أو بلا استكشاف، أو خائفًا من نفسه. ونقترح القاعدة نفسها في بيوتم. ستغيّر هذه القاعدة حوار مائدتكم أسرع مما تتوقعون.')]
 },
 {id:'haytham',cat:'education',time:P('7 min','7 دقائق'),date:P('Nov 30, 2024','30 نوفمبر 2024'),author:P('Dr. Aisha Al-Marri','د. عائشة المري'),
  title:P('What Ibn al-Haytham can teach a ten-year-old','ماذا يعلّم ابن الهيثم طفلًا في العاشرة'),
  excerpt:P('The world’s first true scientist was history’s best role model for being confidently wrong — then checking.','أول عالِم حقيقي في التاريخ هو أفضل قدوةٍ عرفتها البشرية في الجرأة على الخطأ — ثم التحقّق.'),
  body:[
   P('Ask a child what scientists do and they’ll say: know things. Ask them what Ibn al-Haytham did and the honest answer is: doubted things. He doubted that vision shoots out of the eye, as the ancients claimed — so he sat in a dark room with a single small hole, and watched the world paint itself upside-down on a wall.','اسأل طفلًا: ماذا يفعل العلماء؟ سيقول: يعرفون الأشياء. اسأله: ماذا فعل ابن الهيثم؟ الإجابة الصادقة: شكّك في الأشياء. شكّك في القول القديم إن البصر يشعّ من العين خارجًا — فجلس في غرفة مظلمة بثقبٍ صغير واحد، وشاهد العالم يرسم نفسه مقلوبًا على الحائط.'),
   P('That room — the camera obscura — is why we call it a camera. But the deeper lesson is his method: when confused, test. When certain, test anyway. He wrote that if learning truth is the goal, one must become “an enemy of what one reads.” For a ten-year-old, that translates beautifully: don’t believe me — check.','تلك الغرفة — «البيت المظلم» — هي سبب تسميتنا للكاميرا كاميرا. لكن الدرس الأعمق هو منهجه: حين تُصب بالحيرة، اختبر. وحين تكون واثقًا، اختبر كذلك. كتب أنّ من كان غايته الحقّ عليه أن يصير «خصمًا لما يقرؤه». وللطفل في العاشرة تترجم هذه الروح ببساطة: لا تصدّقني — تحقّق.'),
   P('In Golden Age Lab we rebuild his experiments with cardboard and tape. What children take home is bigger than optics: they take home the dignity of being wrong out loud, and the discipline of finding out.','في «مختبر العصر الذهبي» نعيد بناء تجاربه بالكرتون واللاصق. لكن ما يأخذه الأطفال إلى بيوتهم أكبر من البصريات: يأخذون معهم كرامة الاعتراف بالخطأ بصوتٍ عالٍ، وانضباط البحث عن اليقين.')]
 },
 {id:'listen',cat:'parenting',time:P('4 min','4 دقائق'),date:P('Nov 12, 2024','12 نوفمبر 2024'),author:P('The MASHQ Team','فريق مَشق'),
  title:P('How to listen to a child’s big question','كيف تُصغي لسؤال طفلك الكبير'),
  excerpt:P('Before the answer, there is the pause. A short field guide to not shutting down wonder.','قبل الإجابة، هناك المَهَل. دليل مختصر كي لا نُطفئ الدهشة.'),
  body:[
   P('The moment a child asks something big — about death, God, the universe, fairness — most adults feel pressure to deliver a polished answer. Resist it. In that first second, the child is not asking for information; they are asking: is this a safe topic with you?','لحظة أن يطرح الطفل سؤالًا كبيرًا — عن الموت، أو الله، أو الكون، أو العدل — يشعر معظم الكبار بضغطٍ لتقديم إجابة مصقولة. قاوم ذلك. فالطفل في تلك الثانية لا يطلب معلومة؛ إنه يسأل: هل هذا موضوعٌ آمن بيننا؟'),
   P('Three moves work almost every time. One: repeat the question back — “Why do people die? That’s a big one.” Two: wonder together — “What do you think?” Three: if you truly don’t know, schedule the follow-up: “Let’s find out on Thursday.” You have just taught them three things: their questions matter, their thinking counts, and not-knowing is the beginning of discovery, not the end.','ثلاث خطوات تنفع في كل مرة تقريبًا. الأولى: أعد السؤال عليه — «لماذا يموت الناس؟ سؤالٌ كبير.» الثانية: تحيّروا معًا — «ما رأيك أنت؟» الثالثة: إن لم تعرف حقًا، حدّد موعدًا للمتابعة: «لنبحث عن الإجابة يوم الخميس.» هكذا علّمته ثلاثة أشياء: أسئلته لها وزن، وفكره له قيمة، و«لا أعرف» بداية الاكتشاف لا نهايته.'),
   P('And if the question touches faith? Welcome it there too. Children whose religious questions were met with warmth grow into adults whose faith can carry weight.','وإن لمس السؤالُ الإيمان؟ فالترحيب أولى. فالأطفال الذين قوبلت أسئلتهم الدينية بالدفء يكبرون رجالًا ونساءً يحمل إيمانهم الأثقال بثبات.')]
 },
 {id:'noor',cat:'students',time:P('5 min','5 دقائق'),date:P('Oct 25, 2024','25 أكتوبر 2024'),author:P('As told to MASHQ','حُكيت لفريق مَشق'),
  title:P('Noor’s first telescope','أول منظار لنور'),
  excerpt:P('She saved QR 240 for eleven weeks. Then Cosmic Wonders took her class to Katara — and the moon came out.','ادّخرت 240 ريالًا أحد عشر أسبوعًا. ثم خرج صفّ «عجائب الكون» للرصد في كتارا — وظهر القمر.'),
  body:[
   P('Noor, nine, joined Cosmic Wonders in September quiet as a closed book. Facilitators noticed one thing: she never stopped drawing the moon — every night a new crescent in her notebook, even cloudy nights (she drew the clouds too).','نور، التسع سنوات، التحقت ببرنامج «عجائب الكون» في سبتمبر بهدأة كتابٍ مغلق. لاحظ الموجّهون أمرًا واحدًا: لم تكفّ عن رسم القمر — كل ليلة هلالٌ جديد في دفترها، حتى الليالي الغائمة (كانت ترسم السحب أيضًا).'),
   P('For eleven weeks she had been saving for her own telescope: birthday money, good-behaviour money, one very brave negotiation with her brother. On telescope night at Katara, the facilitators lined up the class instruments — and then Noor unpacked hers.','كانت منذ أحد عشر أسبوعًا تدّخر لمنظارها الخاص: مال عيد الميلاد، ومال حسن الخلق، وأطروحة تفاوض واحدة بالغة الشجاعة مع أخيها. وفي ليلة الرصد في كتارا، صنّف الموجّهون أجهزة الصف — ثم فتحت نور حقيبتها وأخرجت جهازها.'),
   P('She let nine other children look through it that night. When her mother came to collect her, Noor’s exact words were: “Mama, the moon has mountains, and I saw them with my own money.” We could not design a better learning outcome than that.','أذنت لتسعة أطفال آخرين بالنظر عبرها تلك الليلة. وحين جاءت أمها لتصطحبها، كانت كلمات نور حرفيًا: «ماما، للقمر جبال، ورأيتها بفلوسي أنا.» لم نستطع أن نصمّم ناتجًا تعليميًا أفضل من هذه الجملة.')]
 },
 {id:'journey6',cat:'ideas',time:P('6 min','6 دقائق'),date:P('Oct 2, 2024','2 أكتوبر 2024'),author:P('Omar Haddad','عمر حدّاد'),
  title:P('The MASHQ learning journey, explained','رحلة التعلّم في مَشق — باختصار'),
  excerpt:P('Wonder → Explore → Question → Discover → Apply → Grow. Six words we hold every single program to.','الدهشة ← الاستكشاف ← السؤال ← الاكتشاف ← التطبيق ← النموّ. ست كلمات نحاسب عليها كل برنامج عندنا.'),
  body:[
   P('Every program at MASHQ — from the six-year-olds’ story circle to the teens’ cosmology seminar — moves through the same six verbs. Not because children are identical, but because learning is. Curiosity has a natural shape, and we try not to fight it.','كل برنامج في مَشق — من حلقة قصص الصغار في السادسة إلى ندوة الكون للمراهقين — يمرّ بالأفعال الستة نفسها. ليس لأن الأطفال متطابقون، بل لأن التعلّم متطابق. للفضول شكل طبيعي، ونحن نحاول ألا نحاربه.'),
   P('Wonder earns attention before we ask for it. Explore puts hands on materials before minds on theories. Question dignifies confusion. Discover delivers knowledge only after the child wants it — which is the only time it sticks. Apply sends it out of the building. Grow looks back and asks what changed.','الدهشة تكسب الانتباه قبل أن نطلبه. والاستكشاف يضع الأيدي على المواد قبل العقول على النظريات. والسؤال يمنح الحيرة كرامتها. والاكتشاف يقدّم المعرفة بعد أن يشتاق إليها الطفل — وهي اللحظة الوحيدة التي تلتصق فيها. والتطبيق يُرسل المعرفة خارج المبنى. والنموّ يتأمل ويستفهم: ما الذي تغيّر؟'),
   P('Parents can run the same loop at home, for free, this week. Pick anything — a recipe, a verse, a broken chair. Wonder at it together. Explore it. Ask about it. The curriculum is your life.','ويمكن للأهل أن يشغّلوا الحلقة نفسها في البيت، مجانًا، هذا الأسبوع. اختر أي شيء — وصفة طعام، أو آية، أو كرسيًا مكسورًا. تحيّرا به معًا. ثم استكشفا. ثم اسألا عنه. المنهج كله هو حياتكم.')]
 }
],
cats:{science:P('Science','علوم'),faith:P('Faith','إيمان'),parenting:P('Parenting','تربية'),education:P('Education','تعليم'),ideas:P('Ideas','أفكار'),students:P('Student Stories','قصص طلاب')},
testimonials:[
 {q:P('My daughter came home from her first session and explained refraction using a date and a glass of water. I have never seen her so proud of knowing something.','عادت ابنتي من أول جلسة تشرح لي انكسار الضوء بتمرة وكوب ماء. لم أرَها يومًا بهذا الفخر لمعرفةٍ جديدة.'),n:P('Latifa A.','لطيفة الحمادي'),r:P('Mother of Maryam, 9','والدة مريم، 9 سنوات'),a:'LA',c:'vi-amber'},
 {q:P('I used to think faith and science were two different rooms. MASHQ showed me they are two windows in the same one.','كنت أظن أن العلم والإيمان غرفتان منفصلتان. مَشق أرانِي أنهما نافذتان في غرفة واحدة.'),n:P('Youssef, 15','يوسف، 15 عامًا'),r:P('Future Thinkers student','طالب في مفكّري المستقبل'),a:'Y',c:'vi-teal'},
 {q:P('As an educator, I notice the details: how facilitators ask instead of answer, and how children learn to say “I don’t know — yet.”','كمعلمة، ألاحظ التفاصيل: كيف يسأل الموجّهون بدل أن يُجيبوا، وكيف يتعلّم الأطفال أن يقولوا «لا أعرف… بعد».'),n:P('Dr. Huda K.','د. هدى الكواري'),r:P('School counsellor','مرشدة مدرسية'),a:'HK',c:'vi-coral'},
 {q:P('Winter camp was the first time in years my son woke up early — without being asked.','معسكر الشتاء أوّل مرّة منذ سنوات يصحى فيه ابني باكرًا — من نفسه.'),n:P('Mohammed R.','محمد الرمضاني'),r:P('Father of Salem, 11','والد سالم، 11 سنة'),a:'MR',c:'vi-navy'},
 {q:P('We tried three activity centres in Doha. MASHQ is the first one our son explains to his grandparents at dinner.','جرّبنا ثلاثة مراكز في الدوحة. مَشق أول مكان يشرحه ابني لجدّه على مائدة العشاء.'),n:P('Reem S.','ريم السليطي'),r:P('Mother of Jassim, 12','والدة جاسم، 12 سنة'),a:'RS',c:'vi-ink'}
],
faqs:[
 {q:P('What ages do you accept?','ما الأعمار التي تستقبلونها؟'),
  a:P('Six to seventeen, across three age groups: Little Explorers (6–9), Young Discoverers (10–13) and Future Thinkers (14–17). Every group has its own facilitators, pace and material — nothing is “watered down” or “rushed up”.','من السادسة إلى السابعة عشرة، في ثلاث مجموعات: المستكشفون الصغار (6–9)، والمكتشفون الناشئون (10–13)، ومفكّرو المستقبل (14–17). لكل مجموعة موجّهوها ووتيرتها وموادّها — لا «تبسيط مخلّ» ولا «تسريع مُجهد».')},
 {q:P('How do you balance Islamic values with modern content?','كيف توازنون بين القيم الإسلامية والمحتوى الحديث؟'),
  a:P('We don’t balance them as opposites, because we don’t treat them as opposites. Faith frames the questions; science and skills build the answers. Religious content is taught with depth and warmth — never as decoration, and never as a fence around science.','لا نوازن بينهما كأنهما متناقضان، لأننا لا نعتبرهما متناقضين. الإيمان يؤطّر الأسئلة؛ والعلم والمهارات يبنيان الإجابات. يُدرَّس المحتوى الديني بعمق ودفء — لا زينةً في الهوامش، ولا سياجًا حول العلم.')},
 {q:P('Is MASHQ a school?','هل مَشق مدرسة؟'),
  a:P('No — and that is the point. MASHQ is a complement: weekend and after-school programs designed to run alongside school, not instead of it. Many of our students’ families tell us MASHQ is where school concepts finally come alive.','لا — وهذا جوهر فكرتنا. مَشق مكمّل: برامج نهاية أسبوع وبعد المدرسة مصمّمة لتسير جنبًا إلى جنب مع المدرسة لا بديلًا عنها. كثير من عائلات طلابنا يقولون إن مَشق هو المكان الذي تنبض فيه مفاهيم المدرسة للحياة.')},
 {q:P('Who leads the sessions?','من يقود الجلسات؟'),
  a:P('Trained facilitators: educators, engineers and researchers — every adult is background-checked and completes our child-safeguarding training before their first session, and refreshes it yearly.','موجّهون مدرَّبون: معلمون ومهندسون وباحثون — كل فرد في الفريق يخضع للتحقق من خلفيته وللتدريب الكامل على حماية الطفل قبل أول جلسة، ويجدد التدريب سنويًا.')},
 {q:P('What language are programs in?','بأي لغة تُقدَّم البرامج؟'),
  a:P('Arabic and English, by program. Most children’s programs are Arabic-first with English materials; teen programs run bilingually. Bilingual facilitators mean no child is left translating alone.','العربية والإنجليزية، حسب البرنامج. معظم برامج الأطفال عربية أولًا مع مواد إنجليزية؛ وبرامج المراهقين ثنائية اللغة. ووجود موجّهين ثنائيي اللغة يعني ألا يبقى طفلٌ وحيدًا في الترجمة.')},
 {q:P('How do I register — and can we try first?','كيف أسجّل؟ وهل يمكن أن نجرّب أولًا؟'),
  a:P('Choose a program, submit the two-minute form, and we call you within 48 hours. The first session is an open trial for new families — no payment until your child decides to stay.','اختر برنامجًا، وأرسل النموذج (دقيقتان)، ونحن نتصل بك خلال 48 ساعة. الجلسة الأولى تجربة مفتوحة للعائلات الجديدة — ولا دفع قبل أن يقرر طفلك البقاء.')}
],
team:[
 {n:P('Dr. Aisha Al-Marri','د. عائشة المري'),r:P('Founder & Learning Director','المؤسِّسة ومديرة التعلّم'),b:P('Physics teacher for fourteen years. Keeps a jar of children’s questions on her desk.','معلّمة فيزياء منذ أربعة عشر عامًا. تحتفظ على مكتبها بمرطبانٍ مملوء بأسئلة الأطفال.'),a:'AA',c:'vi-teal'},
 {n:P('Omar Haddad','عمر حدّاد'),r:P('Head of Programs','رئيس البرامج'),b:P('Engineer, camp legend, and owner of the world’s heaviest toolbox.','مهندس وأسطورة المعسكرات وصاحب أثقل صندوق عدّة في العالم.'),a:'OH',c:'vi-amber'},
 {n:P('Fatima Zakaria','فاطمة زكريا'),r:P('Faith & Character Lead','مسؤولة الإيمان والشخصية'),b:P('Storyteller and scholar of the sirah; believes theology lands best at a child’s eye level.','حكواتة وباحثة في السيرة النبوية؛ ترى أن التعليم يبلغ ذروته حين يكون بعين الطفل.'),a:'FZ',c:'vi-coral'},
 {n:P('Khalid Al-Kuwari','خالد الكواري'),r:P('Community & Partnerships','المجتمع والشراكات'),b:P('Knows every museum director in Doha by first name — and every beach worth cleaning.','لا يعرف مديرَ متحفٍ في الدوحة إلا بالاسم الأول — ولا شاطئًا يستحق التنظيف إلا من بعيد.'),a:'KK',c:'vi-navy'}
],
values:[
 {ic:'chat',n:P('Questions first','السؤال أولًا'),d:P('Every session starts with one — and we never laugh at any.','كل جلسة تبدأ بسؤال — ولا نسخر من سؤال قط.'),c:'vi-amber'},
 {ic:'compass',n:P('Knowledge with purpose','علمٌ بغاية'),d:P('We learn in order to serve — families, neighbours, creation.','نتعلّم لخدمة — الأهل والجيران والخلية كلها.'),c:'vi-teal'},
 {ic:'heart',n:P('Character before certificates','الشخصية قبل الشهادة'),d:P('We grade kindness as seriously as correctness.','نمنح اللطف من الدرجات ما نمنحه للإجابات الصحيحة.'),c:'vi-coral'},
 {ic:'spark',n:P('Joy is serious','الفرح موضع جدّية'),d:P('Delight is not a reward for learning; it is the method.','البهجة ليست مكافأة على التعلّم؛ إنها الطريقة نفسها.'),c:'vi-navy'},
 {ic:'globe',n:P('Community as classroom','المجتمع صفٌّ لنا'),d:P('Doha is our campus — beaches, museums, majalis and all.','الدوحة كلها مجمّعنا — شواطئها ومتاحفها ومجالسها جميعًا.'),c:'vi-ink'}
],
legal:{
 privacy:{t:P('Privacy Policy','سياسة الخصوصية'),b:P('MASHQ collects only the information registration requires — parent contact details and a child’s first name and age — and uses it solely to run our programs and communicate with you. We never sell or share family data with third parties. Session photos are shared with parents only, and only with written consent. To review or delete your data, write to privacy@mashq.qa.','تجمع مَشق المعلومات التي يتطلبها التسجيل فقط — بيانات تواصل الوالدين واسم الطفل الأول وعمره — وتستخدمها حصرًا لإدارة برامجنا والتواصل معكم. لا نبيع بيانات العائلات ولا نشاركها مع أطراف ثالثة. وتُشارك صور الجلسات مع الأهل فقط، وبموافقة كتابية. لمراجعة بياناتك أو حذفها، راسلونا على privacy@mashq.qa.')},
 terms:{t:P('Terms of Enrollment','شروط التسجيل'),b:P('Enrollment is confirmed after a short call with our team and payment of term fees. Full refunds are available until one week before a term or camp begins; after the first session, a 70% refund applies. MASHQ may photograph sessions for the family journal — you may opt out at any time. Behaviour that endangers other children may end a placement, after a conversation with parents.','يُعتمد التسجيل بعد مكالمة قصيرة مع فريقنا وسداد رسوم الفصل. الاسترداد الكامل متاح حتى أسبوع قبل بداية الفصل أو المعسكر؛ وبعد الجلسة الأولى يُعاد 70% من الرسوم. قد تصوّر مَشق الجلسات لمجلة العائلة الأسبوعية — ويمكنك إلغاء ذلك في أي وقت. وقد يُوقف انتساب طفلٍ يُخاطر بسلامة أقرانه — بعد حوار كامل مع الأهل.')},
 access:{t:P('Accessibility Statement','بيان إمكانية الوصول'),b:P('We aim to meet WCAG 2.1 AA across this website and our physical spaces: step-free access at MASHQ Campus, quiet corners for children who need them, and materials in large print on request. If something here or on site does not work for your family, write to hello@mashq.qa — a human will fix it.','نسعى للوصول إلى مستوى WCAG 2.1 AA في هذا الموقع وفي مقارّنا: مداخل بلا درجات في مجمّع مَشق، وزوايا هادئة لمن يحتاجها، ومواد مطبوعة بخط كبير عند الطلب. إن كان هناك ما لا يناسب عائلتك هنا أو في المقر، راسلنا على hello@mashq.qa — وسيتولّى إنسانٌ الأمر فورًا.')}
}
};
var REG_STEPS=[
 [P('Choose a program','اختر برنامجًا'),P('By age, topic or season — the filters do the work.','حسب العمر أو الموضوع أو الموسم — والفلاتر تتكفل بالباقي.')],
 [P('Submit the form','أرسل النموذج'),P('Two minutes. No payment yet.','دقيقتان فقط، ودون أي دفع في هذه المرحلة.')],
 [P('A short call','مكالمة قصيرة'),P('We meet you, answer everything, and confirm the seat.','نتعارف، نُجيب عن كل شيء، ونعتمد المقعد.')],
 [P('First session','الجلسة الأولى'),P('An open trial for new families — free.','تجربة مفتوحة ومجانية للعائلات الجديدة.')]
];

/* ===== مكونات مشتركة ===== */
var NAV=[
 {k:'programs',t:P('Programs','البرامج')},
 {k:'approach',t:P('Our Approach','منهجنا')},
 {k:'science',t:P('Science + Faith','العلم + الإيمان')},
 {k:'parents',t:P('For Parents','للأهل')},
 {k:'about',t:P('About','عن مَشق')},
 {k:'stories',t:P('Stories','قصص وأفكار')},
 {k:'contact',t:P('Contact','تواصل معنا')}
];
function brand(){return '<a class="brand" href="#/home" aria-label="MASHQ">'+
 '<span class="brand-mark">'+ic('star8')+'</span>'+
 '<span class="brand-txt"><span class="brand-en">'+(state.lang==='ar'?'مَشق':'MASHQ')+'</span>'+
 '<span class="brand-ar">'+(state.lang==='ar'?'MASHQ · قطر':'مَشق · قطر')+'</span></span></a>'}
function sectionLabel(en,ar){return '<span class="label reveal">'+ic('star8')+'<span>'+tt(en,ar)+'</span></span>'}
function ageBadge(a){return '<span class="age-badge '+AGES[a].cls+'">'+tt('Ages','الأعمار')+' '+AGES[a].range+'</span>'}
function watermark(){return '<span class="watermark" aria-hidden="true">'+ic('star8')+'</span>'}
function checkList(items,icn){return '<ul class="check-list'+(icn==='shield'?' shield':'')+'">'+
 items.map(function(x){return '<li>'+ic(icn)+'<span>'+tt(x[0],x[1])+'</span></li>'}).join('')+'</ul>'}

function programCard(p,i){
 return '<article class="pcard reveal" style="--d:'+((i%3)*.08)+'s;--accent:var(--'+AGES[p.age].accent+')">'+
  '<div class="pc-top">'+ageBadge(p.age)+'<span class="tag">'+T(TYPES[p.type])+'</span></div>'+
  '<h3>'+T(p.name)+'</h3><p>'+T(p.desc)+'</p>'+
  '<div class="pc-tags">'+p.topics.map(function(t){return '<span class="tag">'+ic(TOPICS[t].ic)+' '+T(TOPICS[t].label)+'</span>'}).join('')+'</div>'+
  '<div class="pc-meta"><span>'+ic('cal')+T(p.duration)+'</span><span>'+ic('pin')+T(p.format)+'</span></div>'+
  '<button class="pc-link" data-action="open-program" data-id="'+p.id+'">'+tt('View program','عرض البرنامج')+' '+ic('arrow','ic-flip')+'</button>'+
 '</article>';
}
function eventCard(e,i){
 var s=STATUS[e.status];
 return '<article class="ecard reveal" style="--d:'+((i%3)*.08)+'s">'+
  '<div class="e-top"><div class="e-date"><b>'+e.d+'</b><span>'+T(e.m)+'</span></div><span class="badge '+s.cls+'">'+T(s.label)+'</span></div>'+
  '<h3>'+T(e.title)+'</h3>'+
  '<div class="e-meta"><span>'+ic('clock')+T(e.when)+'</span><span>'+ic('pin')+T(e.loc)+'</span><span>'+ic('users')+T(e.who)+'</span></div>'+
  '<p>'+T(e.desc)+'</p>'+
  '<div class="e-foot"><span class="e-fee">'+T(e.fee)+'</span>'+
  (e.status==='soon'
    ?'<button class="btn btn-ghost btn-sm" disabled>'+tt('Opens Mar 15','يفتح في 15 مارس')+'</button>'
    :'<button class="btn btn-primary btn-sm" data-action="register" data-title="'+T(e.title)+'">'+(e.status==='wait'?tt('Join waitlist','ادخل قائمة الانتظار'):tt('Register','سجّل الآن'))+'</button>')+
  '</div></article>';
}
function articleCard(a,i){
 return '<button class="acard reveal" style="--d:'+((i%3)*.08)+'s" data-action="open-article" data-id="'+a.id+'">'+
  '<div class="a-body"><span class="cat c-'+a.cat+'">'+T(DATA.cats[a.cat])+'</span>'+
  '<h3>'+T(a.title)+'</h3><p>'+T(a.excerpt)+'</p>'+
  '<div class="a-foot"><span>'+T(a.author)+'</span><span>'+ic('clock')+' '+T(a.time)+'</span></div></div></button>';
}
function testimonialCard(t,i){
 return '<div class="tcard reveal" style="--d:'+(i*.08)+'s">'+ic('quote')+
  '<blockquote>'+T(t.q)+'</blockquote>'+
  '<div class="t-who"><span class="avatar '+t.c+'">'+t.a+'</span><div><b>'+T(t.n)+'</b><span>'+T(t.r)+'</span></div></div></div>';
}
function ctaBand(){
 return '<section class="section"><div class="container"><div class="cta-band reveal">'+
  '<span class="wm2" aria-hidden="true">'+ic('star8')+'</span>'+
  sectionLabel('Join MASHQ','انضم إلى مَشق')+
  '<h2>'+tt('Give your child a place to ask, build, and believe.','أعطِ طفلك مكانًا يسأل ويصنع ويؤمن.')+'</h2>'+
  '<p>'+tt('First sessions are an open trial for new families — come see the lights turn on.','الجلسة الأولى تجربة مفتوحة للعائلات الجديدة — تعالوا وشاهدوا لحظة إشراق العيون.')+'</p>'+
  '<div class="hero-ctas"><button class="btn btn-primary magnet" data-action="register">'+tt('Find their program','ابحث عن برنامجه')+ic('arrow','ic-flip')+'</button>'+
  '<a class="btn btn-light magnet" href="#/contact">'+tt('Talk to us','تحدّث إلينا')+'</a></div>'+
 '</div></div></section>';
}
function faqBlock(ids){
 return ids.map(function(i){var f=DATA.faqs[i];
  return '<div class="acc"><button class="acc-btn" data-action="acc" aria-expanded="false"><span>'+T(f.q)+'</span>'+ic('chev')+'</button><div class="acc-body"><div><p>'+T(f.a)+'</p></div></div></div>'}).join('');
}

/* ===== الصفحات ===== */
var pages={};

pages.home=function(){
 var artChips=[
  {i:'telescope',t:P('Astronomy','الفلك'),c:'color:var(--teal)',pos:'left:64%;top:6%',k:10,bt:'6s',hm:0},
  {i:'atom',t:P('Physics','الفيزياء'),c:'color:var(--coral)',pos:'left:74%;top:40%',k:14,bt:'7s',hm:0},
  {i:'book',t:P('Stories','قصص'),c:'color:var(--amber-deep)',pos:'left:8%;top:10%',k:8,bt:'5.5s',hm:1},
  {i:'leaf',t:P('Nature','طبيعة'),c:'color:var(--teal)',pos:'left:2%;top:46%',k:12,bt:'6.5s',hm:0},
  {i:'shapes',t:P('Making','صنعة'),c:'color:var(--navy)',pos:'left:30%;top:0%',k:9,bt:'7.5s',hm:1}
 ];
 var words=state.lang==='ar'?['الإيمان','الفضول','العلم','الشخصية','الإبداع','المجتمع']:['Faith','Curiosity','Science','Character','Creativity','Community'];
 var setHtml=words.map(function(w){return w+' '+ic('star8')}).join(' ');
 var tickSets='';for(var ti=0;ti<4;ti++){tickSets+='<div class="tick-set"><span>'+setHtml+'</span></div>'}
 var arDesc=state.lang==='ar';
 return '<section class="hero"><div class="container hero-grid">'+
 '<div>'+
  sectionLabel('A learning community in Doha, Qatar','مجتمع تعلّم في الدوحة، قطر')+
  '<h1 class="reveal" style="--d:.05s">'+tt('Where Faith Meets','حيث يلتقي الإيمان')+' <span class="hl">'+tt('Curiosity','بالفضول')+'</span>.</h1>'+
  '<p class="hero-sub reveal" style="--d:.12s">'+tt('MASHQ creates joyful learning experiences that connect Islamic values, modern science, creativity and real-life skills — for ages 6 to 17.','تُصمّم مَشق تجارب تعلّم ممتعة تربط القيم الإسلامية بالعلم الحديث والإبداع ومهارات الحياة الواقعية — للأعمار من 6 إلى 17.')+'</p>'+
  '<div class="hero-ctas reveal" style="--d:.18s">'+
   '<a class="btn btn-primary magnet" href="#/about">'+tt('Explore MASHQ','تعرّف على مَشق')+ic('arrow','ic-flip')+'</a>'+
   '<a class="btn btn-ghost magnet" href="#/programs">'+tt('Discover Our Programs','اكتشف برامجنا')+'</a></div>'+
  '<div class="hero-trust reveal" style="--d:.24s">'+
   '<span class="trust">'+ic('users')+tt('Ages 6–17','الأعمار 6–17')+'</span>'+
   '<span class="trust">'+ic('pin')+tt('Doha, Qatar','الدوحة، قطر')+'</span>'+
   '<span class="trust">'+ic('star8')+tt('Since 2017','منذ 2017')+'</span></div>'+
 '</div>'+
 '<div class="hero-art reveal" style="--d:.15s" id="heroArt" aria-hidden="true">'+
  '<div class="blob blob-a"></div><div class="blob blob-b"></div>'+
  '<svg class="art-orbits" viewBox="0 0 400 400">'+
   '<g class="spin-slow"><circle cx="200" cy="200" r="118" class="orb"/><circle cx="200" cy="200" r="172" class="orb"/></g>'+
   '<circle cx="200" cy="200" r="62" class="orb orb2"/>'+
   '<circle cx="200" cy="200" r="3" fill="var(--coral)"/><circle cx="82" cy="200" r="2.6" fill="var(--amber)"/><circle cx="200" cy="372" r="2.6" fill="var(--teal)"/></svg>'+
  '<svg class="art-book" viewBox="0 0 260 150">'+
   '<path class="bk" d="M130 34C104 16 66 12 24 20v96c42-8 80-4 106 14 26-18 64-22 106-14V20c-42-8-80-4-106 14z"/>'+
   '<path class="bk" d="M130 34v96"/>'+
   '<path class="bk thin" d="M46 44c22-3 42-1 60 8M46 64c22-3 42-1 60 8M46 84c22-3 42-1 60 8M154 52c18-9 38-11 60-8M154 72c18-9 38-11 60-8M154 92c18-9 38-11 60-8"/></svg>'+
  artChips.map(function(c){
   return '<div class="fp'+(c.hm?' hide-m':'')+'" style="'+c.pos+';--k:'+c.k+'px"><div class="fchip" style="'+c.c+';--bt:'+c.bt+';--bd:'+(c.k%5)*0.5+'s">'+ic(c.i)+T(c.t)+'</div></div>'}).join('')+
  '<span class="deco-dot" style="left:12%;bottom:24%"></span><span class="deco-dot" style="left:86%;top:16%;background:var(--teal)"></span>'+
  '<span class="deco-plus" style="left:20%;top:60%">+</span><span class="deco-plus" style="left:90%;bottom:12%">+</span>'+
 '</div></section>'+
 '<div class="tick-wrap" aria-hidden="true"><div class="tick">'+tickSets+'</div></div>'+

 '<section class="section statement"><div class="container">'+
  watermark()+
  sectionLabel('Why we exist','لماذا نوجد')+
  '<p class="big-line reveal">'+tt('Learning should feel like <em>light breaking through the dark</em> — not a door you’re forced through.','التعلّم يجب أن يكون <em>كضوءٍ ينشقّ عبر الظلام</em> — لا بابًا يُدفع بك لعبوره.')+'</p>'+
  '<p class="body reveal" style="--d:.1s">'+tt('In Arabic, mashaq means practice — the patient, daily work of growing. And just before every sunrise, light mashqa: it breaks through the night. We built MASHQ for that moment — when a child’s first real question cracks the dark open.','في العربية، «مَشق» تعني التمرّس — العمل اليومي الصبور للنموّ. وقبل كل فجر، ينشقّ الضوء عبر الليل. بنينا مَشق لتلك اللحظة بالذات — حين يشقّ سؤالُ الطفل الأول الظلامَ ويفتحه.')+'</p>'+
  '<a class="link reveal" style="--d:.15s" href="#/approach">'+tt('Meet our approach','تعرّف على منهجنا')+' '+ic('arrow','ic-flip')+'</a>'+
 '</div></section>'+

 '<section class="section" style="padding-top:0"><div class="container">'+
  sectionLabel('The MASHQ way','طريقة مَشق')+
  '<h2 class="reveal">'+tt('Faith. Knowledge. Character.','إيمان. معرفة. شخصية.')+'</h2>'+
  '<p class="sub reveal" style="--d:.08s">'+tt('Five strands, one learner. Every program weaves them together — tap a pillar to see how.','خيوط خمسة، ومتعلّم واحد. كل برنامج ينحكها معًا — المس أحد الأعمدة لترى كيف.')+'</p>'+
  '<div class="pillars-grid">'+
  '<div class="ring-wrap reveal" id="pillarRing">'+
   '<svg class="ring-svg" viewBox="0 0 100 100" aria-hidden="true">'+
    '<circle cx="50" cy="50" r="37" class="ring"/><circle cx="50" cy="50" r="22" class="ring"/>'+
    '<g id="pillarLines"></g></svg>'+
   '<div class="p-center">'+ic('cap')+'<span>'+tt('The Learner','المتعلّم')+'</span></div>'+
   DATA.pillars.map(function(p,i){return '<button class="p-node'+(i===0?' on':'')+'" data-action="pillar" data-i="'+i+'" aria-pressed="'+(i===0)+'"><span class="p-dot">'+ic(p.ic)+'</span><span>'+T(p.name)+'</span></button>'}).join('')+
  '</div>'+
  '<div class="pillar-panel reveal" style="--d:.1s" id="pillarPanel" aria-live="polite"></div>'+
  '</div></div></section>'+

 '<section class="section" style="background:var(--paper-2)"><div class="container">'+
  sectionLabel('Programs','البرامج')+
  '<h2 class="reveal">'+tt('Start with their age','ابدأ من عمرهم')+'</h2>'+
  '<p class="sub reveal" style="--d:.08s">'+tt('Three stages, one journey. Each age group has its own pace, its own questions, its own kind of joy.','ثلاث مراحل، ورحلة واحدة. لكل فئة عمرية وتيرتها وأسئلتها ونوع بهجتها الخاص.')+'</p>'+
  '<div class="age-tabs" role="tablist">'+
  Object.keys(AGES).map(function(k,ix){var a=AGES[k];
   var dTxt=k==='6-9'?tt('Big questions in small hands: stories, nature, making and wonder.','أسئلة كبيرة بين أيدي صغيرة: حكايات وطبيعة وصناعة ودهشة.')
        :k==='10-13'?tt('The “why” years: experiments, debates, code and first real research.','سنوات «لماذا»: تجارب ومناظرات وبرمجة وأول بحث حقيقي.')
        :tt('Deep questions, real projects, and a faith that can hold a physics textbook.','أسئلة عميقة ومشاريع حقيقية وإيمانٌ يتّسع لكتاب فيزياء.');
   return '<button class="age-tab reveal'+(k===state.ageTab?' on':'')+'" style="--d:'+(ix*.08)+'s" role="tab" data-action="age-tab" data-age="'+k+'" data-accent="'+a.accent+'" aria-selected="'+(k===state.ageTab)+'"><span class="a-range">'+a.range+'</span><h3>'+T(a.name)+'</h3><p>'+dTxt+'</p><span class="a-cta" style="color:var(--'+a.accent+'-deep)">'+tt('See programs','شاهد البرامج')+' '+ic('arrow','ic-flip')+'</span></button>'}).join('')+
  '</div>'+
  '<div class="age-progs" id="ageProgs"></div>'+
 '</div></section>'+

 '<section class="section" style="padding-top:0"><div class="container">'+
  sectionLabel('Our signature','توقيعنا')+
  '<div class="split" style="align-items:center;margin-top:26px">'+
  '<div><h2 class="reveal">'+tt('Science + Faith','العلم + الإيمان')+'</h2>'+
  '<p class="sub reveal" style="--d:.08s">'+tt('We never ask a child to choose between a telescope and a prayer mat. At MASHQ, each one strengthens the other — and both belong to the same curious heart.','لا نطلب من طفل أن يختار بين التلسكوب وسجادة الصلاة. في مَشق، يقوّي أحدهما الآخر — وكلاهما يسكن القلب الفضولي نفسه.')+'</p>'+
  '<a class="link reveal" style="--d:.12s;display:inline-flex;align-items:center;gap:8px;margin-top:22px;font-weight:800;color:var(--amber);text-decoration:none;border-bottom:2px solid var(--amber);padding-bottom:3px" href="#/science">'+tt('See how it works','شاهد كيف يعمل')+' '+ic('arrow','ic-flip')+'</a></div>'+
  '<div class="reveal" style="--d:.1s;position:relative;aspect-ratio:16/10;max-width:520px;width:100%;margin-inline:auto" aria-hidden="true">'+
   '<svg viewBox="0 0 400 250" style="width:100%;height:100%">'+
   '<ellipse cx="200" cy="125" rx="150" ry="80" fill="none" stroke="rgba(18,41,59,.25)" stroke-dasharray="3 7"/>'+
   '<ellipse cx="200" cy="125" rx="95" ry="48" fill="none" stroke="rgba(18,41,59,.35)" stroke-dasharray="2 6"/>'+
   '<circle cx="200" cy="125" r="26" fill="var(--amber)"/>'+
   '<circle cx="350" cy="125" r="20" fill="var(--teal)"/><circle cx="50" cy="125" r="20" fill="var(--coral)"/>'+
   '<text x="350" y="131" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">'+(arDesc?'علم':'SCI')+'</text>'+
   '<text x="50" y="131" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">'+(arDesc?'إيمان':'IMAN')+'</text></svg></div>'+
  '</div></div></section>'+

 '<section class="section dark-sec"><div class="container" style="max-width:820px;text-align:center">'+
  sectionLabel('The journey','الرحلة')+
  '<h2 class="reveal" style="color:var(--paper)">'+tt('Six verbs. Every program. Every child.','ستة أفعال. كل برنامج. كل طفل.')+'</h2>'+
  '<div class="reveal" style="--d:.1s;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:34px">'+
  DATA.journey.map(function(j,i){return '<a href="#/approach" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:var(--pill);padding:12px 20px;color:var(--paper);font-weight:800;font-size:.92rem;transition:all .3s">'+ic(j.ic)+T(j.name)+(i<5?'<span style="color:var(--amber)">'+(arDesc?'←':'→')+'</span>':'')+'</a>'}).join('')+
  '</div></div></section>'+

 '<section class="section"><div class="container">'+
  '<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">'+
  '<div>'+sectionLabel('Upcoming','الفعاليات القادمة')+'<h2 class="reveal">'+tt('Experiences worth marking down','تجارب تستحقّ أن تُدوَّن في التقويم')+'</h2></div>'+
  '<a class="btn btn-ghost btn-sm reveal" href="#/events">'+tt('All events','كل الفعاليات')+ic('arrow','ic-flip')+'</a></div>'+
  '<div class="grid-3" style="margin-top:40px">'+DATA.events.slice(0,3).map(eventCard).join('')+'</div>'+
 '</div></section>'+

 '<section class="section" style="background:var(--paper-2)"><div class="container">'+
  sectionLabel('From our families','من عائلاتنا')+
  '<h2 class="reveal">'+tt('What changes at the dinner table','ما الذي يتغيّر على مائدة العشاء')+'</h2>'+
  '<div class="grid-3" style="margin-top:40px">'+[0,1,4].map(function(i){return testimonialCard(DATA.testimonials[i],i)}).join('')+'</div>'+
 '</div></section>'+

 '<section class="section" style="padding-top:0"><div class="container">'+
  '<div class="stats-band reveal"><div class="stats-grid">'+
  '<div class="stat"><b data-count="1240">0</b><span>'+tt('Young learners since 2017','متعلّمًا شابًا منذ 2017')+'</span></div>'+
  '<div class="stat"><b data-count="26">0</b><span>'+tt('Programs — and counting','برنامجًا — والمزيد قادم')+'</span></div>'+
  '<div class="stat"><b data-count="40">0</b><span>'+tt('Educators & mentors','مربيًا وموجّهًا')+'</span></div>'+
  '<div class="stat"><b data-count="96">0</b><span>'+tt('% of families return each term','٪ من العائلات تعود كل فصل')+'</span></div>'+
  '</div></div></div></section>'+

 '<section class="section" style="padding-top:0"><div class="container">'+
  '<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">'+
  '<div>'+sectionLabel('Journal','مجلة مَشق')+'<h2 class="reveal">'+tt('Stories & ideas','قصص وأفكار')+'</h2></div>'+
  '<a class="btn btn-ghost btn-sm reveal" href="#/stories">'+tt('Visit the journal','زُر المجلة')+ic('arrow','ic-flip')+'</a></div>'+
  '<div class="grid-3" style="margin-top:40px">'+DATA.articles.slice(0,3).map(articleCard).join('')+'</div>'+
 '</div></section>'+
 ctaBand();
};

pages.programs=function(){
 return '<div class="container"><div class="page-head">'+
  sectionLabel('Programs','البرامج')+
  '<h1 class="reveal">'+tt('Find their program','ابحث عن برنامجه')+'</h1>'+
  '<p class="reveal" style="--d:.08s">'+tt('Every program is small by design, led by trained facilitators, and built around one promise: your child will leave asking better questions.','كل برنامج صغيرٌ عمدًا، يقوده موجّهون مدرَّبون، ويجتمع حول وعدٍ واحد: سيخرج طفلك ويطرح أسئلة أفضل.')+'</p></div>'+
 '<div class="filters reveal">'+
  [['age',tt('Age','العمر'),Object.keys(AGES).map(function(k){return[k,AGES[k].range+' · '+T(AGES[k].name)]})],
   ['topic',tt('Topic','الموضوع'),Object.keys(TOPICS).map(function(k){return[k,T(TOPICS[k].label)]})],
   ['type',tt('Type','النوع'),Object.keys(TYPES).map(function(k){return[k,T(TYPES[k])]})]].map(function(row){
   var k=row[0],name=row[1],opts=row[2];
   return '<div class="f-row" role="group" aria-label="'+name+'"><span class="f-name">'+name+'</span>'+
    '<button class="chip'+(state[k]==='all'?' on':'')+'" data-action="fset" data-k="'+k+'" data-v="all">'+tt('All','الكل')+'</button>'+
    opts.map(function(o){return '<button class="chip'+(state[k]===o[0]?' on':'')+'" data-action="fset" data-k="'+k+'" data-v="'+o[0]+'">'+o[1]+'</button>'}).join('')+'</div>'}).join('')+
 '</div>'+
 '<p class="f-count" id="pCount" aria-live="polite"></p>'+
 '<div class="grid-3" id="pGrid" style="margin-top:22px"></div>'+
 '</div>'+ctaBand();
};

pages.approach=function(){
 return '<div class="container"><div class="page-head">'+
  sectionLabel('Our approach','منهجنا')+
  '<h1 class="reveal">'+tt('Learning, in six verbs','التعلّم في ستة أفعال')+'</h1>'+
  '<p class="reveal" style="--d:.08s">'+tt('Wonder → Explore → Question → Discover → Apply → Grow. These six words hold every MASHQ program together — scroll through them and you’ll see a term in a child’s life.','الدهشة ← الاستكشاف ← السؤال ← الاكتشاف ← التطبيق ← النموّ. ست كلمات تربط كل برنامج في مَشق — تمرّر عبرها وسترى فصلًا كاملًا في حياة طفل.')+'</p></div>'+
 '<div class="journey" id="journeySec">'+
  '<div class="j-track"><div class="j-fill"></div></div>'+
  DATA.journey.map(function(j,i){return '<div class="j-item reveal"><span class="j-dot">'+ic(j.ic)+'</span>'+
   '<span class="j-step">'+tt('Step','الخطوة')+' 0'+(i+1)+' / 06</span><h3>'+T(j.name)+'</h3><p>'+T(j.txt)+'</p><span class="j-q">'+T(j.q)+'</span></div>'}).join('')+
 '</div></div>'+
 '<section class="section" style="padding-top:30px"><div class="container"><div class="cta-band reveal" style="background:var(--teal-deep)">'+
  sectionLabel('Try it at home','جرّبها في البيت')+
  '<h2>'+tt('One night. One blanket. One big question.','ليلة واحدة. بطانية واحدة. سؤال كبير واحد.')+'</h2>'+
  '<p style="color:#DFF0EA">'+tt('The journey works just as well around a kitchen table. Start this week.','تعمل الرحلة نفسها على مائدة العشاء تمامًا. ابدأوا هذا الأسبوع.')+'</p>'+
  '<div class="hero-ctas"><button class="btn btn-light magnet" data-action="register">'+tt('Or let us guide it — join a program','أو دعنا نرشدكم — انضموا لبرنامج')+'</button></div>'+
 '</div></div></section>';
};

pages.science=function(){
 var arDesc=state.lang==='ar';
 return '<section class="dark-sec"><div class="container">'+
  '<div class="page-head" style="max-width:760px">'+
  sectionLabel('Our signature','توقيعنا')+
  '<h1 class="reveal" style="color:var(--paper)">'+tt('Two lenses. One sky.','عدستان. سماءٌ واحدة.')+'</h1>'+
  '<p class="sub reveal" style="--d:.08s;color:#B9C7D2">'+tt('At MASHQ, science class and faith class are often the same class. We never present them as opposites — one trains the eye, the other trains the heart, and a complete education needs both eyes open.','في مَشق، حصّة العلوم وحصّة الإيمان حصّة واحدة غالبًا. لا نقدّمهما كنقيضين — إحداهما تدرّب العين والأخرى تدرّب القلب، والتربية الكاملة تحتاج عينين مفتوحتين.')+'</p></div>'+
  '<div class="lens-grid">'+
  '<div class="lens reveal"><span class="li" style="background:var(--teal);color:#fff">'+ic('telescope')+'</span>'+
   '<h3>'+tt('The Discover lens','عدسة الاكتشاف')+'</h3>'+
   '<p>'+tt('The observable. What we can measure, test and be amazed by — with evidence on the table and questions in the air.','المُلاحَظ. ما نستطيع قياسه واختباره والدهشة أمامه — مع أدلّة على الطاولة وأسئلة في الهواء.')+'</p></div>'+
  '<div class="lens reveal" style="--d:.08s"><span class="li" style="background:var(--amber);color:var(--navy)">'+ic('spark')+'</span>'+
   '<h3>'+tt('The Reflect lens','عدسة التأمّل')+'</h3>'+
   '<p>'+tt('The meaningful. What creation says about its Creator — asked with awe, discussed with humility, never forced into conclusions.','المعنوي. ما تقوله الخليقة عن خالقها — يُطرح بخشوع، ويُناقش بتواضع، ولا يُساق قسرًا إلى نتائج.')+'</p></div>'+
  '</div>'+
  '<p class="lens-bridge reveal">'+tt('A full education needs both eyes open.','التربية الكاملة تحتاج عينين مفتوحتين.')+'</p>'+
 '</div></section>'+
 '<section class="section" style="padding-bottom:30px"><div class="container">'+
  sectionLabel('Side by side','جنبًا إلى جنب')+
  '<h2 class="reveal">'+tt('Pick a topic. Flip the lenses.','اختر موضوعًا. وبدّل العدستين.')+'</h2></div>'+
 '<div class="sf-row" id="sfRow">'+
  DATA.lenses.map(function(l,i){return '<div class="sf-card reveal" style="--d:'+(i*.06)+'s">'+
  '<div class="sf-head"><span class="si">'+ic(l.ic)+'</span><h3>'+T(l.title)+'</h3></div>'+
  '<div class="seg" role="tablist">'+
   '<button class="on" data-action="lens" data-d="'+i+'" role="tab" aria-selected="true">'+ic('telescope')+tt('Discover','اكتشاف')+'</button>'+
   '<button class="seg-r" data-action="lens" data-mode="reflect" data-d="'+i+'" role="tab" aria-selected="false">'+ic('spark')+tt('Reflect','تأمّل')+'</button></div>'+
  '<div class="sf-body" id="sfBody'+i+'"><p>'+T(l.discover)+'</p></div>'+
  '<a class="sf-link" href="#/programs">'+tt('Explore it in:','اكتشفه في:')+' '+T(l.prog)+' '+ic('arrow','ic-flip')+'</a></div>'}).join('')+
 '</div></section>'+
 '<section class="section dark-sec" style="padding-block:clamp(56px,7vw,90px)"><div class="container">'+
  sectionLabel('From our lab notebook','من دفتر مختبرنا')+
  '<h2 class="reveal" style="color:var(--paper)">'+tt('What a session actually looks like','كيف تبدو الجلسة من الداخل')+'</h2>'+
  '<div class="lab-strip">'+
  [P('Build a pinhole camera — then read the Verse of Light together.','اصنع كاميرا الثقب — ثم اقرؤوا آية النور معًا.'),
   P('Sprout beans in light and dark — a first lesson in evidence and gratitude.','انبت الفاصولياء في النور والظلام — درس أول في الدليل والامتنان.'),
   P('Chart tonight’s moon by hand, before any app will tell you.','ارسم طور القمر الليلة بيدك — قبل أن يخبرك أي تطبيق.')].map(function(x,i){return '<div class="lab-item reveal" style="--d:'+(i*.08)+'s"><span class="n">0'+(i+1)+'</span><p>'+T(x)+'</p></div>'}).join('')+
  '</div></div></section>'+
 '<section class="section"><div class="container" style="max-width:800px;text-align:center">'+
  '<svg class="icon" aria-hidden="true" style="width:44px;height:44px;color:var(--amber-deep);margin:0 auto;stroke-width:1.3"><use href="#i-quote"/></svg>'+
  '<p class="reveal" style="font-family:var(--font-d);font-size:clamp(1.6rem,3.4vw,2.4rem);font-weight:520;line-height:1.4;margin-top:20px;font-style:'+(arDesc?'normal':'italic')+'">'+tt('“The Quran invites us to look — and never asks us to stop looking.”','«القرآن يدعونا للتأمّل — ولا يدعو أبدًا إلى التوقّف عن النظر.»')+'</p>'+
  '<p style="margin-top:18px;font-weight:800;color:var(--teal-deep)">'+tt('Dr. Aisha Al-Marri — Founder','د. عائشة المري — المؤسِّسة')+'</p>'+
 '</div></section>'+ctaBand();
};

pages.parents=function(){
 return '<div class="container"><div class="page-head">'+
  sectionLabel('For parents','للأهل')+
  '<h1 class="reveal">'+tt('The five-minute brief on MASHQ','ملخّص مَشق في خمس دقائق')+'</h1>'+
  '<p class="reveal" style="--d:.08s">'+tt('What we teach, why it matters, what your child will actually experience — and every practical answer you need before registering.','ماذا نعلّم، ولماذا يهم، وماذا سيعيشه طفلك فعلًا — وكل الإجابات العملية التي تحتاجونها قبل التسجيل.')+'</p></div>'+
 '<div class="split" style="margin-bottom:clamp(60px,8vw,100px)">'+
  '<div class="reveal"><h2 style="font-size:1.7rem">'+tt('A hundred minutes at MASHQ','مئة دقيقة في مَشق')+'</h2><div style="margin-top:10px">'+
  [P('Welcome circle|One question on the wall, one intention in the heart.','دائرة الترحيب|سؤال على الجدار، ونيّة في القلب.'),
   P('Explore — hands first|Story, experiment or build. Nobody watches learning happen; they do it.','الاستكشاف — الأيدي أولًا|قصة أو تجربة أو بناء. لا أحد يشاهد التعلّم من بعيد؛ الجميع يصنعه.'),
   P('Break|Snack, games, and unhurried friendship.','الاستراحة|وجبة خفيفة وألعاب وصداقة بلا استعجال.'),
   P('Reflect|What did we see? What does it remind us of? What question do we carry home?','التأمّل|ماذا رأينا؟ وعمّ ذكّرنا؟ وما السؤال الذي نحمله معنا إلى البيت؟')].map(function(x,ix){
   var pe=x.en.split('|'),pa=x.ar.split('|');
   return '<div class="day-row"'+(ix===3?' style="border-bottom:0"':'')+'><time>'+(ix===0?'10’':ix===1?'45’':ix===2?'20’':'25’')+'</time><div><h4>'+tt(pe[0],pa[0])+'</h4><p>'+tt(pe[1],pa[1])+'</p></div></div>'}).join('')+
  '</div></div>'+
  '<div class="reveal" style="--d:.1s"><h2 style="font-size:1.7rem">'+tt('What families tell us changes','ما تقوله العائلات عن التغيّر')+'</h2>'+
  checkList([
   P('Asks questions at the dinner table again','يعود يطرح أسئلته على مائدة العشاء'),
   P('Explains ideas in their own words','يشرح الأفكار بكلماته هو'),
   P('Connects worship to meaning — not just routine','يربط العبادة بالمعنى — لا بالروتين وحده'),
   P('Tries again after failing — out loud','يعيد المحاولة بعد الفشل — ويعترف بذلك'),
   P('Uses screen time to make, not only to watch','يحوّل وقت الشاشة إلى صناعة لا مشاهدة فقط'),
   P('Speaks respectfully — and bravely','يتكلّم باحترام — وبشجاعة')],'check')+
  '</div></div>'+

 '<div class="split" style="margin-bottom:clamp(60px,8vw,100px)">'+
  '<div class="reveal"><h2 style="font-size:1.7rem">'+tt('Safety, in specifics','السلامة بالتفاصيل')+'</h2>'+
  '<p class="sub">'+tt('Trust is built on logistics, not slogans. Here is exactly how we care for your child.','الثقة تُبنى على تفاصيل تنظيمية، لا شعارات. وهكذا نعتني بطفلك بالضبط.')+'</p>'+
  checkList([
   P('Background-checked, safeguarding-trained facilitators','موجّهون بخلفيات موثّقة وتدريب كامل على حماية الطفل'),
   P('Small groups — never more than 14 students','مجموعات صغيرة — لا تتجاوز 14 طالبًا أبدًا'),
   P('Sign-in, sign-out with guardian ID','تسجيل دخول وخروج ببطاقة هوية ولي الأمر'),
   P('First-aid certified staff on site at all times','فريق مؤهّل للإسعافات الأولية حاضر دائمًا'),
   P('Weekly photo journal sent to parents','مجلة صور أسبوعية ترسل للأهل'),
   P('Allergy-aware snacks, always','وجبات خفيفة تراعي الحساسية دائمًا')],'shield')+
  '</div>'+
  '<div class="reveal" style="--d:.1s"><h2 style="font-size:1.7rem">'+tt('This term’s schedule','جدول هذا الفصل')+'</h2>'+
  '<table class="sched"><tr><th>'+tt('What','ماذا')+'</th><th>'+tt('When','متى')+'</th></tr>'+
  '<tr><td>'+tt('Term dates','موعد الفصل')+'</td><td>'+tt('Jan 11 – Mar 27','11 يناير – 27 مارس')+'</td></tr>'+
  '<tr><td>'+tt('Mid-term break','الإجازة النصفية')+'</td><td>'+tt('No sessions Mar 30 – Apr 6','لا جلسات 30 مارس – 6 أبريل')+'</td></tr>'+
  '<tr><td>'+tt('Ramadan hours','مواعيد رمضان')+'</td><td>'+tt('Evening schedule applies','جدول مسائي')+'</td></tr>'+
  '<tr><td>'+tt('Family Day','يوم العائلة')+'</td><td>'+tt('Last Saturday of every term','آخر سبت من كل فصل')+'</td></tr></table>'+
  '<div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">'+
  '<button class="btn btn-primary magnet" data-action="register">'+tt('Register your child','سجّل طفلك')+'</button>'+
  '<a class="btn btn-ghost" href="#/programs">'+tt('Browse programs first','تصفّح البرامج أولًا')+'</a></div></div>'+
 '</div>'+

 sectionLabel('How registration works','كيف يتم التسجيل')+
 '<div class="steps">'+
 REG_STEPS.map(function(s,i){return '<div class="step reveal" style="--d:'+(i*.07)+'s"><h3>'+T(s[0])+'</h3><p>'+T(s[1])+'</p></div>'}).join('')+
 '</div>'+

 '<section class="section" style="background:var(--paper-2);margin-top:clamp(60px,8vw,90px)"><div class="container">'+
  sectionLabel('Parents ask','يسأل الأهل')+
  '<h2 class="reveal">'+tt('Honest answers','إجابات صريحة')+'</h2>'+
  '<div style="margin-top:34px;max-width:820px">'+faqBlock([0,1,2,3,4,5])+'</div></div></section>'+

 '<section class="section" style="padding-top:clamp(56px,7vw,90px)"><div class="container">'+
  sectionLabel('From our families','من عائلاتنا')+
  '<div class="grid-3" style="margin-top:36px">'+[2,3,4].map(function(i){return testimonialCard(DATA.testimonials[i],i)}).join('')+'</div>'+
 '</div></section>'+ctaBand();
};

pages.about=function(){
 return '<div class="container"><div class="page-head">'+
  sectionLabel('About MASHQ','عن مَشق')+
  '<h1 class="reveal">'+tt('It started around a kitchen table','بدأت حول طاولة مطبخ')+'</h1></div>'+
 '<div style="max-width:720px">'+
  '<p class="reveal" style="font-size:1.12rem;color:var(--ink-soft)">'+tt('MASHQ began in 2017 in Al Sadd, Doha — four parents, one physics teacher among them, tired of choosing between a religious education that ignored science and a science education that ignored the soul.','بدأت مَشق عام 2017 في حي السد بالدوحة — أربعة آباء، بينهم معلّمة فيزياء، تعبوا من الاختيار بين تربية دينية تتجاهل العلم وتربية علمية تتجاهل الروح.')+'</p>'+
  '<p class="reveal" style="--d:.08s;font-size:1.12rem;color:var(--ink-soft);margin-top:18px">'+tt('We asked a simple question: what if a child could memorise a surah on Saturday and build a telescope by Sunday — and feel that these two acts belong to each other?','طرحنا سؤالًا بسيطًا: ماذا لو استطاع طفل أن يحفظ سورة يوم السبت ويبني منظارًا يوم الأحد — ويشعر أن الفعلين ينتميان لبعضهما؟')+'</p>'+
  '<p class="reveal" style="--d:.14s;font-size:1.12rem;color:var(--ink-soft);margin-top:18px">'+tt('Eight years later, MASHQ runs weekly programs, seasonal camps and family experiences for more than a thousand learners — still small where it matters: groups of twelve, questions first, joy always.','بعد ثماني سنوات، تدير مَشق برامج أسبوعية ومعسكرات موسمية وتجارب عائلية لأكثر من ألف متعلّم — وما زالت صغيرة حيث يهم: مجموعات من اثني عشر، والسؤال أولًا، والفرح دائمًا.')+'</p>'+
  '<p class="reveal" style="--d:.2s;font-size:1.05rem;margin-top:26px;font-family:var(--font-d);font-style:'+(state.lang==='ar'?'normal':'italic')+';color:var(--teal-deep)">'+tt('And the name? Mashaq means practice — the patient work of growing. But watch the dawn in Qatar: light mashqa, breaking through. Both meanings are ours.','والاسم؟ «مَشق» تعني التمرّس — العمل الصبور للنموّ. وانظر إلى الفجر في قطر: الضوء ينشقّ عبر الليل. والمعنيان لنا.')+'</p></div>'+

 '<div class="grid-2" style="margin-top:clamp(50px,7vw,80px)">'+
  '<div class="mv-card reveal">'+ic('compass')+'<h3>'+tt('Our mission','رسالتنا')+'</h3><p>'+tt('To nurture a generation whose faith deepens their curiosity, and whose curiosity strengthens their faith.','أن نرعى جيلًا يعمّق إيمانه فضولَه، ويعمّق فضوله إيمانَه.')+'</p></div>'+
  '<div class="mv-card reveal" style="--d:.08s">'+ic('telescope')+'<h3>'+tt('Our vision','رؤيتنا')+'</h3><p>'+tt('A Qatar where every young person experiences learning as an act of love — for God, for knowledge, and for people.','قطر يشعر فيها كل شاب بأن التعلّم فعلُ محبة — لله، وللعلم، وللناس.')+'</p></div></div>'+

 '<section class="section" style="padding-bottom:0"><div class="container">'+
  sectionLabel('What we hold to','ما نتعلّق به')+
  '<h2 class="reveal">'+tt('Five values, no fine print','خمس قيم، بلا حروف صغيرة')+'</h2>'+
  '<div class="grid-3" style="margin-top:40px">'+
  DATA.values.map(function(v,i){return '<div class="value-card reveal" style="--d:'+(i*.06)+'s"><span class="vi '+v.c+'">'+ic(v.ic)+'</span><h3>'+T(v.n)+'</h3><p>'+T(v.d)+'</p></div>'}).join('')+
  '</div></div></section>'+

 '<section class="section" style="padding-bottom:0"><div class="container">'+
  sectionLabel('The people','الفريق')+
  '<h2 class="reveal">'+tt('The humans behind the programs','البشر الذين يقفون خلف البرامج')+'</h2>'+
  '<div class="grid-2" style="margin-top:40px">'+
  DATA.team.map(function(m,i){return '<div class="value-card team-card reveal" style="--d:'+(i*.06)+'s"><span class="avatar '+m.c+'">'+m.a+'</span><h3>'+T(m.n)+'</h3><p class="role">'+T(m.r)+'</p><p class="bio">'+T(m.b)+'</p></div>'}).join('')+
  '</div></div></section>'+

 '<section class="section"><div class="container">'+
  '<div class="stats-band reveal"><div class="stats-grid">'+
  '<div class="stat"><b data-count="1240">0</b><span>'+tt('Young learners','متعلّمًا شابًا')+'</span></div>'+
  '<div class="stat"><b data-count="12">0</b><span>'+tt('Partner schools & centres','مدرسة ومركزًا شريكًا')+'</span></div>'+
  '<div class="stat"><b data-count="60">0</b><span>'+tt('Family events hosted','فعالية عائلية أقمناها')+'</span></div>'+
  '<div class="stat"><b data-count="75">0</b><span>'+tt('Volunteer mentors','موجّهًا متطوعًا')+'</span></div>'+
  '</div></div></div></section>'+ctaBand();
};

pages.events=function(){
 return '<div class="container"><div class="page-head">'+
  sectionLabel('Events & experiences','فعاليات وتجارب')+
  '<h1 class="reveal">'+tt('Mark the calendar','دوّنها في التقويم')+'</h1>'+
  '<p class="reveal" style="--d:.08s">'+tt('Workshops, camps, family nights and honest talks — most are open to the whole community, MASHQ member or not.','ورش ومعسكرات وأمسيات عائلية وحوارات صريحة — معظمها مفتوح للمجتمع كله، منتسبًا لم تكن.')+'</p></div>'+
 '<div class="grid-3">'+DATA.events.map(eventCard).join('')+'</div></div>'+ctaBand();
};

pages.stories=function(){
 var cats=['all'].concat(Object.keys(DATA.cats));
 return '<div class="container"><div class="page-head">'+
  sectionLabel('Journal','مجلة مَشق')+
  '<h1 class="reveal">'+tt('Stories & ideas','قصص وأفكار')+'</h1>'+
  '<p class="reveal" style="--d:.08s">'+tt('Notes from our classrooms, our lab and our parenting book club — written for the families who ask good questions.','ملاحظات من قاعاتنا ومختبرنا وندوات التربية — مكتوبة للعائلات التي تطرح الأسئلة الجيدة.')+'</p></div>'+
 '<div class="featured-a reveal" data-action="open-article" data-id="stars">'+
  '<div class="fa-cover"><span class="wm" aria-hidden="true">'+ic('star8')+'</span>'+
  ic('quote')+'<p class="big-quote">'+tt('“Why doesn’t the moon fall?” It’s not a silly question. It’s Newton’s question.','«لماذا لا يسقط القمر؟» ليست سؤالًا عبثيًا. إنه سؤال نيوتن.')+'</p>'+
  '<span style="font-size:.85rem;font-weight:800;color:var(--amber)">'+tt('Featured · Science','مقال مميّز · علوم')+'</span></div>'+
  '<div class="fa-body"><span class="cat c-science" style="align-self:flex-start">'+T(DATA.cats.science)+'</span>'+
  '<h3>'+T(DATA.articles[0].title)+'</h3><p>'+T(DATA.articles[0].excerpt)+'</p>'+
  '<div class="a-foot"><span>'+T(DATA.articles[0].author)+'</span><span>'+ic('clock')+' '+T(DATA.articles[0].time)+'</span></div></div></div>'+
 '<div class="f-row" style="margin:38px 0 8px" role="group" aria-label="'+tt('Categories','التصنيفات')+'">'+
  cats.map(function(c){return '<button class="chip'+(state.story===c?' on':'')+'" data-action="story-cat" data-c="'+c+'">'+(c==='all'?tt('All','الكل'):T(DATA.cats[c]))+'</button>'}).join('')+'</div>'+
 '<div class="grid-3" id="storyGrid" style="margin-top:24px"></div></div>'+ctaBand();
};

pages.contact=function(){
 return '<div class="container"><div class="page-head">'+
  sectionLabel('Contact','تواصل معنا')+
  '<h1 class="reveal">'+tt('Talk to us','تحدّث إلينا')+'</h1>'+
  '<p class="reveal" style="--d:.08s">'+tt('A real person answers — usually the same day. No phone trees, no “we’ll get back to you someday”.','إنسانٌ حقيقي يردّ — في اليوم نفسه غالبًا. لا قوائم انتظار هاتفية ولا «سنردّ عليكم يومًا ما».')+'</p></div>'+
 '<div class="split">'+
  '<div class="reveal"><form id="contactForm" novalidate>'+
  '<div class="field"><label for="cName">'+tt('Your name','اسمك')+' <b>*</b></label><input id="cName" autocomplete="name" required><span class="f-err">'+tt('Please tell us your name.','من فضلك أخبرنا باسمك.')+'</span></div>'+
  '<div class="field"><label for="cEmail">'+tt('Email','البريد الإلكتروني')+' <b>*</b></label><input id="cEmail" type="email" autocomplete="email" required><span class="f-err">'+tt('That email doesn’t look right.','يبدو أن هذا البريد غير صحيح.')+'</span></div>'+
  '<div class="field"><label for="cTopic">'+tt('What is this about?','بماذا يتعلق الأمر؟')+'</label><select id="cTopic">'+
  [P('A question for parents','استفسار للأهل'),P('Partnership inquiry','طلب شراكة'),P('Volunteering','تطوّع'),P('Media','إعلام'),P('Something else','شيء آخر')].map(function(o,i){return '<option value="'+i+'">'+T(o)+'</option>'}).join('')+'</select></div>'+
  '<div class="field"><label for="cMsg">'+tt('Your message','رسالتك')+' <b>*</b></label><textarea id="cMsg" rows="5" required></textarea><span class="f-err">'+tt('A sentence or two helps us help you — at least 10 characters.','جملة أو جملتان تساعدنا أن نساعدك — 10 أحرف على الأقل.')+'</span></div>'+
  '<button class="btn btn-primary magnet" type="submit">'+tt('Send message','أرسل الرسالة')+ic('send')+'</button></form></div>'+
  '<div class="reveal" style="--d:.1s">'+
  '<div class="info-card"><span style="position:absolute;inset-inline-end:-50px;bottom:-50px;width:170px;height:170px;opacity:.07;color:#fff" aria-hidden="true">'+ic('star8')+'</span>'+
  '<h3>'+tt('MASHQ Educational Association','جمعية مَشق التعليمية')+'</h3>'+
  '<div class="info-list">'+
  '<span>'+ic('pin')+'<span>'+tt('Al Sadd, Doha, Qatar','السد، الدوحة، قطر')+'</span></span>'+
  '<span>'+ic('mail')+'<a href="mailto:hello@mashq.qa">hello@mashq.qa</a></span>'+
  '<span>'+ic('phone')+'<a dir="ltr" href="tel:+97440001234">+974 4000 1234</a></span>'+
  '<span>'+ic('clock')+'<span>'+tt('Sun–Thu · 9:00 AM–5:00 PM','الأحد–الخميس · 9:00 صباحًا–5:00 مساءً')+'</span></span>'+
  '</div>'+
  '<div class="socials"><a href="#/contact" aria-label="Instagram">'+ic('ig')+'</a><a href="#/contact" aria-label="X">'+ic('xx')+'</a><a href="#/contact" aria-label="YouTube">'+ic('yt')+'</a><a href="#/contact" aria-label="LinkedIn">'+ic('in')+'</a></div></div>'+
  '<div style="margin-top:26px">'+sectionLabel('Quick answers','إجابات سريعة')+'</div>'+
  '<div style="margin-top:14px">'+faqBlock([0,3,4,5])+'</div></div>'+
 '</div></div>'+ctaBand();
};

/* ===== العرض والتفاعل ===== */
var TITLES={home:P('Where Faith Meets Curiosity','حيث يلتقي الإيمان بالفضول'),programs:P('Programs','البرامج'),approach:P('Our Approach','منهجنا'),science:P('Science + Faith','العلم + الإيمان'),parents:P('For Parents','للأهل'),about:P('About MASHQ','عن مَشق'),events:P('Events','الفعاليات'),stories:P('Stories & Ideas','قصص وأفكار'),contact:P('Contact','تواصل معنا')};

function themeLbl(){return document.documentElement.getAttribute('data-theme')==='dark'?tt('Light mode','الوضع الفاتح'):tt('Dark mode','الوضع الداكن')}
function renderNav(){
 $('#navIn').innerHTML=brand()+
  '<nav class="nav-links" aria-label="'+tt('Primary','التنقل الرئيسي')+'">'+NAV.map(function(n){return '<a href="#/'+n.k+'" data-nav="'+n.k+'">'+T(n.t)+'</a>'}).join('')+'</nav>'+
  '<div class="nav-side">'+
  '<div class="lang-t" role="group" aria-label="'+tt('Language','اللغة')+'">'+
   '<button data-action="lang" data-l="ar" class="'+(state.lang==='ar'?'on':'')+'">عربي</button>'+
   '<button data-action="lang" data-l="en" class="'+(state.lang==='en'?'on':'')+'">EN</button></div>'+
  '<button class="tbtn" data-action="theme" type="button" aria-label="'+themeLbl()+'">'+ic('sun','t-sun')+ic('moon','t-moon')+'</button>'+
  '<button class="btn btn-primary btn-sm magnet" data-action="register">'+tt('Join MASHQ','انضم إلى مَشق')+'</button>'+
  '<button class="burger" data-action="menu" aria-expanded="false" aria-label="'+tt('Menu','القائمة')+'">'+ic('menu')+'</button></div>';
 $('#mmenu').innerHTML=NAV.map(function(n){return '<a href="#/'+n.k+'" data-action="mlink">'+T(n.t)+ic('arrow','ic-flip')+'</a>'}).join('')+
  '<div class="m-foot"><button class="btn btn-primary" data-action="register">'+tt('Join MASHQ','انضم إلى مَشق')+'</button></div>';
 $('.skip').textContent=tt('Skip to content','تخطَّ إلى المحتوى');
}
function renderFooter(){
 $('#footIn').innerHTML='<div class="footer-in">'+
  '<div>'+brand()+
  '<p class="f-tag">'+tt('“Where Faith Meets Curiosity.”','«حيث يلتقي الإيمان بالفضول.»')+'</p>'+
  '<p class="f-desc">'+tt('A Qatari educational association nurturing curious, capable, grounded young minds — ages 6 to 17.','جمعية تعليمية قطرية ترعى عقولًا شابة فضولية قادرة راسخة — من 6 إلى 17 سنة.')+'</p></div>'+
  '<div><h4>'+tt('Explore','استكشف')+'</h4><div class="f-links">'+NAV.map(function(n){return '<a href="#/'+n.k+'">'+T(n.t)+'</a>'}).join('')+'<a href="#/events">'+T(P('Events','الفعاليات'))+'</a></div></div>'+
  '<div><h4>'+tt('Programs','البرامج')+'</h4><div class="f-links">'+
  Object.keys(AGES).map(function(k){return '<button data-action="age-link" data-age="'+k+'">'+AGES[k].range+' · '+T(AGES[k].name)+'</button>'}).join('')+
  '<button data-action="open-legal" data-l="access">'+T(P('Accessibility','إمكانية الوصول'))+'</button></div></div>'+
  '<div><h4>'+tt('One good email a month','رسالة جيدة واحدة شهريًا')+'</h4>'+
  '<p style="font-size:.88rem">'+tt('Programs, parenting notes, and one experiment to try at home.','برامج وملاحظات تربوية وتجربة واحدة تجرّبونها في البيت.')+'</p>'+
  '<form class="nl-form" id="nlForm" novalidate><input type="email" id="nlEmail" placeholder="'+tt('Your email','بريدك الإلكتروني')+'" aria-label="'+tt('Your email','بريدك الإلكتروني')+'" required><button type="submit" aria-label="'+tt('Subscribe','اشترك')+'">'+ic('send')+'</button></form>'+
  '<div class="socials"><a href="#/home" aria-label="Instagram">'+ic('ig')+'</a><a href="#/home" aria-label="X">'+ic('xx')+'</a><a href="#/home" aria-label="YouTube">'+ic('yt')+'</a><a href="#/home" aria-label="LinkedIn">'+ic('in')+'</a></div></div></div>'+
 '<div class="f-bottom"><span>© 2025 '+tt('MASHQ Educational Association — Doha, Qatar','جمعية مَشق التعليمية — الدوحة، قطر')+'</span>'+
  '<div class="f-legal">'+
  '<button data-action="open-legal" data-l="privacy">'+tt('Privacy','الخصوصية')+'</button>'+
  '<button data-action="open-legal" data-l="terms">'+tt('Terms','الشروط')+'</button>'+
  '<button data-action="open-legal" data-l="access">'+tt('Accessibility','الوصول')+'</button></div></div>';
}
function renderProgramList(){
 var g=$('#pGrid');if(!g)return;
 var list=DATA.programs.filter(function(p){
  return (state.age==='all'||p.age===state.age)&&(state.topic==='all'||p.topics.indexOf(state.topic)>-1)&&(state.type==='all'||p.type===state.type)});
 $('#pCount').textContent=tt('Showing '+list.length+' of '+DATA.programs.length+' programs','عرض '+list.length+' من '+DATA.programs.length+' برنامجًا');
 g.innerHTML=list.length?list.map(programCard).join(''):
  '<div class="empty" style="grid-column:1/-1">'+ic('search')+
  '<h3>'+tt('Nothing matches — yet','لا نتائج مطابقة — حتى الآن')+'</h3>'+
  '<p>'+tt('Try removing a filter, or browse everything.','جرّب إزالة أحد الفلاتر، أو تصفّح كل البرامج.')+'</p>'+
  '<button class="btn btn-ghost btn-sm" style="margin-top:18px" data-action="freset">'+tt('Reset filters','أعد ضبط الفلاتر')+'</button></div>';
 $$('.reveal',g).forEach(function(e){e.classList.add('in')});
}
function renderAgeProgs(){
 var el=$('#ageProgs');if(!el)return;
 var picks=DATA.programs.filter(function(p){return p.age===state.ageTab}).slice(0,2);
 el.innerHTML='<div class="fadein" style="display:contents">'+picks.map(function(p){
  return '<button class="mini-p" data-action="open-program" data-id="'+p.id+'"><span class="mp-t"><b>'+T(p.name)+'</b><span class="mp-s">'+T(p.duration)+' · '+T(TYPES[p.type])+'</span></span>'+ic('arrow','ic-flip')+'</button>'}).join('')+
  '<button class="age-all" data-action="age-link" data-age="'+state.ageTab+'">'+tt('All programs for this age','كل برامج هذا العمر')+' '+ic('arrow','ic-flip')+'</button></div>';
}
function renderPillarPanel(){
 var el=$('#pillarPanel');if(!el)return;
 var p=DATA.pillars[state.pillar];
 el.innerHTML='<div class="fadein"><span class="pi">'+ic(p.ic)+'</span><h3>'+T(p.name)+'</h3><p>'+T(p.desc)+'</p>'+
  '<div class="practice">'+ic('spark')+'<span><b>'+tt('In practice:','عمليًا:')+'</b> '+T(p.practice)+'</span></div></div>';
 $$('.p-node').forEach(function(n,i){var on=i===state.pillar;n.classList.toggle('on',on);n.setAttribute('aria-pressed',on)});
 var lines=$('#pillarLines');
 if(lines){lines.innerHTML=DATA.pillars.map(function(_,i){
  var a=(-90+i*72)*Math.PI/180;
  return '<line x1="50" y1="50" x2="'+(50+37*Math.cos(a)).toFixed(1)+'" y2="'+(50+37*Math.sin(a)).toFixed(1)+'" class="'+(i===state.pillar?'on':'')+'"/>'}).join('')}
}
function renderStoryGrid(){
 var g=$('#storyGrid');if(!g)return;
 var list=DATA.articles.filter(function(a){return state.story==='all'||a.cat===state.story});
 g.innerHTML=list.length?list.map(articleCard).join(''):
  '<div class="empty" style="grid-column:1/-1">'+ic('search')+'<h3>'+tt('No stories here yet','لا قصص هنا بعد')+'</h3><p>'+tt('We publish twice a month — check another category.','ننشر مرتين شهريًا — تصفّح تصنيفًا آخر.')+'</p></div>';
 $$('.reveal',g).forEach(function(e){e.classList.add('in')});
}
function render(){
 renderNav();renderFooter();
 $('#app').innerHTML=pages[state.page]();
 document.title=tt(T(TITLES[state.page])+' · MASHQ','مَشق · '+T(TITLES[state.page]));
 $$('.nav-links a').forEach(function(a){if(a.getAttribute('data-nav')===state.page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 if(state.page==='programs')renderProgramList();
 if(state.page==='home'){renderAgeProgs();renderPillarPanel()}
 if(state.page==='stories')renderStoryGrid();
 afterRender();
}
function setPage(p){if(!pages[p])p='home';state.page=p;closeMenu();render();window.scrollTo(0,0)}

function afterRender(){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
 $$('.reveal').forEach(function(e){io.observe(e)});
 var cio=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;cio.unobserve(e.target);
  var b=e.target,end=+b.getAttribute('data-count');
  if(rm()){b.textContent=end.toLocaleString();return}
  var t0=performance.now();
  (function f(t){var p=Math.min(1,(t-t0)/1400),e2=1-Math.pow(1-p,3);b.textContent=Math.round(end*e2).toLocaleString();if(p<1)requestAnimationFrame(f)})(t0);
 })},{threshold:.4});
 $$('[data-count]').forEach(function(b){cio.observe(b)});
 var j=$('#journeySec');
 if(j){var fill=$('.j-fill',j),items=$$('.j-item',j);
  var jio=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('on',e.isIntersecting)})},{rootMargin:'-35% 0px -35% 0px'});
  items.forEach(function(i){jio.observe(i)});
  if(!rm()){addEventListener('scroll',function(){
   var r=j.getBoundingClientRect();
   fill.style.transform='scaleY('+Math.min(1,Math.max(0,(innerHeight*.55-r.top)/r.height))+')';
  },{passive:true})}}
 if(!rm()&&matchMedia('(pointer:fine)').matches){
  var art=$('#heroArt');
  if(art){var hero=art.closest('.hero');
   hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    $$('.fp',art).forEach(function(p){p.style.setProperty('--mx',x.toFixed(3));p.style.setProperty('--my',y.toFixed(3))})})}
  $$('.magnet').forEach(function(b){
   b.addEventListener('pointermove',function(e){
    var r=b.getBoundingClientRect();
    b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.08)+'px,'+((e.clientY-r.top-r.height/2)*.14)+'px)'});
   b.addEventListener('pointerleave',function(){b.style.transform=''})});
 }
}
function setLang(l){if(l===state.lang)return;state.lang=l;store.set('mashq-lang',l);
 document.documentElement.lang=l;document.documentElement.dir=(l==='ar'?'rtl':'ltr');
 closeModal();render()}
function openMenu(){$('#mmenu').classList.add('open');$('#mmenu').setAttribute('aria-hidden','false');$('.burger').setAttribute('aria-expanded','true');document.body.classList.add('locked')}
function closeMenu(){var m=$('#mmenu');if(!m.classList.contains('open'))return;m.classList.remove('open');m.setAttribute('aria-hidden','true');$('.burger').setAttribute('aria-expanded','false');document.body.classList.remove('locked')}
addEventListener('scroll',function(){$('#siteNav').classList.toggle('scrolled',scrollY>24)},{passive:true});

/* شريط CTA الثابت للموبايل */
var mctaBar=$('#mcta');
if(mctaBar){var mshown=false;
 var mupd=function(){var s=window.scrollY>560;if(s!==mshown){mshown=s;mctaBar.classList.toggle('show',s)}};
 addEventListener('scroll',mupd,{passive:true});mupd()}

/* نافذة منبثقة */
var lastFocus=null;
function openModal(html){lastFocus=document.activeElement;
 $('#modalBody').innerHTML=html;
 $$('#modalBody .reveal').forEach(function(el){el.classList.add('in')});
 $('#modal').hidden=false;document.body.classList.add('locked');
 $('#modalCard').scrollTop=0;var x=$('#modalCard .modal-x');if(x)x.focus()}
function closeModal(){if($('#modal').hidden)return;$('#modal').hidden=true;document.body.classList.remove('locked');
 if(lastFocus)try{lastFocus.focus()}catch(e){}}
document.addEventListener('keydown',function(e){
 if($('#modal').hidden)return;
 if(e.key==='Escape')closeModal();
 if(e.key==='Tab'){var f=$$('button,[href],input,select,textarea',$('#modalCard')).filter(function(x){return !x.disabled});
  if(!f.length)return;var first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});
function toast(msg){var t=document.createElement('div');t.className='toast';t.innerHTML=ic('check')+msg;
 $('#toasts').appendChild(t);setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(function(){t.remove()},400)},3400)}

/* النماذج (طبقة API وهمية قابلة للاستبدال) */
var api={
 register:function(){return delay(1100).then(function(){return{ok:true,ref:'MSQ-'+Math.random().toString(36).slice(2,7).toUpperCase()}})},
 contact:function(){return delay(1000).then(function(){return{ok:true}})},
 newsletter:function(){return delay(700).then(function(){return{ok:true}})}
};
function setErr(input,msg){var f=input.closest('.field');f.classList.toggle('bad',!!msg);
 input.setAttribute('aria-invalid',msg?'true':'false');
 if(msg){var er=$('.f-err',f);if(er)er.textContent=msg}}
function vEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
document.addEventListener('submit',function(e){
 e.preventDefault();
 var f=e.target;
 if(f.id==='nlForm'){var em=$('#nlEmail');
  if(!vEmail(em.value)){em.focus();toast(tt('Please enter a valid email.','من فضلك أدخل بريدًا صحيحًا.'));return}
  var b=$('button',f),old=b.innerHTML;b.innerHTML='<span class="spin"></span>';
  api.newsletter(em.value).then(function(){b.innerHTML=ic('check');
   toast(tt('Welcome aboard — check your inbox.','أهلًا بك — تفقّد بريدك.'));em.value='';
   setTimeout(function(){b.innerHTML=old},2200)});return}
 if(f.id==='contactForm'){
  var n=$('#cName'),emc=$('#cEmail'),m=$('#cMsg'),ok=true;
  if(n.value.trim().length<2){setErr(n,tt('Please tell us your name.','من فضلك أخبرنا باسمك.'));ok=false}else setErr(n,'');
  if(!vEmail(emc.value)){setErr(emc,tt('That email doesn’t look right.','يبدو أن هذا البريد غير صحيح.'));ok=false}else setErr(emc,'');
  if(m.value.trim().length<10){setErr(m,tt('A sentence or two helps us help you.','جملة أو جملتان تساعدنا أن نساعدك.'));ok=false}else setErr(m,'');
  if(!ok){var bad=f.querySelector('.field.bad input,.field.bad textarea');if(bad)bad.focus();return}
  var btn=$('button[type=submit]',f);btn.disabled=true;btn.innerHTML='<span class="spin"></span>'+tt('Sending…','جارٍ الإرسال…');
  api.contact({}).then(function(){btn.disabled=false;
   f.outerHTML='<div class="form-ok"><span class="ok-ring">'+ic('check')+'</span><h3>'+tt('Message received','وصلتنا رسالتك')+'</h3><p>'+tt('A real person — usually Aisha or Khalid — will reply today.','إنسانٌ حقيقي — عائشة أو خالد غالبًا — سيردّ عليك اليوم.')+'</p><button class="btn btn-ghost btn-sm" style="margin-top:22px" data-action="form-reset">'+tt('Send another','أرسل رسالة أخرى')+'</button></div>';
   toast(tt('Message sent. We reply fast here.','تم الإرسال. نحن نردّ بسرعة هنا.'))});return}
 if(f.id==='regForm'){
  var F=['rName','rEmail','rPhone','rAge','rProg'].map(function(i){return $('#'+i)});
  var checks=[function(v){return v.trim().length>=2},vEmail,function(v){return v.replace(/\D/g,'').length>=8},function(v){return !!v},function(v){return !!v}];
  var ok2=true;
  F.forEach(function(inp,i){var good=checks[i](inp.value);
   setErr(inp,good?'':tt('This field is required.','هذا الحقل مطلوب.'));if(!good)ok2=false});
  if(!$('#rConsent').checked){toast(tt('Please accept the privacy policy to continue.','من فضلك اقبل سياسة الخصوصية للمتابعة.'));ok2=false}
  if(!ok2){var bad2=f.querySelector('.field.bad input,.field.bad select');if(bad2)bad2.focus();return}
  var b2=$('button[type=submit]',f);b2.disabled=true;b2.innerHTML='<span class="spin"></span>'+tt('Reserving…','جارٍ الحفظ…');
  api.register({}).then(function(res){b2.disabled=false;
   $('#modalBody').innerHTML='<div class="form-ok"><span class="ok-ring">'+ic('check')+'</span>'+
    '<h3>'+tt('Shukran! Seat reserved','شكرًا! تم حفظ المقعد')+'</h3>'+
    '<p>'+tt('We’ll call you within 48 hours to confirm and answer anything.','سنتصل بك خلال 48 ساعة للتأكيد والإجابة عن كل شيء.')+'</p>'+
    '<span class="ref">'+tt('Reference','الرقم المرجعي')+': '+res.ref+'</span>'+
    '<div style="margin-top:24px"><button class="btn btn-primary btn-sm" data-action="close-modal">'+tt('Done','تم')+'</button></div></div>';
   toast(tt('Registration received — talk soon!','استلمنا تسجيلك — نراك قريبًا!'))});return}
});
function openRegister(prefill){
 var opts=DATA.programs.map(function(p){return{v:'p:'+p.id,l:T(p.name)}})
  .concat(DATA.events.map(function(e){return{v:'e:'+e.id,l:T(e.title)}}));
 openModal(
  sectionLabel('Registration','التسجيل')+
  '<h3 id="modalTitle" style="margin-top:14px;font-size:1.5rem">'+tt('Reserve a seat','احفظ مقعدًا')+'</h3>'+
  '<p style="color:var(--ink-soft);font-size:.95rem;margin-top:8px">'+tt('Two minutes. We call within 48 hours to confirm — payment only after that.','دقيقتان. نتصل بك خلال 48 ساعة للتأكيد — والدفع بعد ذلك فقط.')+'</p>'+
  '<form id="regForm" style="margin-top:22px" novalidate>'+
  '<div class="field"><label for="rName">'+tt('Parent’s name','اسم ولي الأمر')+' <b>*</b></label><input id="rName" autocomplete="name" required><span class="f-err"></span></div>'+
  '<div class="grid-2" style="gap:14px">'+
  '<div class="field"><label for="rEmail">'+tt('Email','البريد')+' <b>*</b></label><input id="rEmail" type="email" autocomplete="email" required><span class="f-err"></span></div>'+
  '<div class="field"><label for="rPhone">'+tt('Phone','الهاتف')+' <b>*</b></label><input id="rPhone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required><span class="f-err"></span></div></div>'+
  '<div class="grid-2" style="gap:14px">'+
  '<div class="field"><label for="rAge">'+tt('Child’s age group','الفئة العمرية للطفل')+' <b>*</b></label><select id="rAge"><option value="">—</option>'+
  Object.keys(AGES).map(function(k){return '<option value="'+k+'"'+(prefill&&prefill.age===k?' selected':'')+'>'+AGES[k].range+' — '+T(AGES[k].name)+'</option>'}).join('')+'</select><span class="f-err"></span></div>'+
  '<div class="field"><label for="rProg">'+tt('Program of interest','البرنامج المطلوب')+' <b>*</b></label><select id="rProg"><option value="">—</option>'+
  opts.map(function(o){return '<option value="'+o.v+'"'+(prefill&&prefill.pid===o.v?' selected':'')+'>'+o.l+'</option>'}).join('')+'</select><span class="f-err"></span></div></div>'+
  '<div class="field"><label for="rNotes">'+tt('Anything we should know? (optional)','هل من شيء ينبغي أن نعرفه؟ (اختياري)')+'</label><textarea id="rNotes" rows="3"></textarea></div>'+
  '<label class="consent"><input type="checkbox" id="rConsent"><span>'+tt('I agree to the','أوافق على ')+'<button type="button" data-action="open-legal" data-l="privacy" style="text-decoration:underline;font-weight:800">'+tt('Privacy Policy','سياسة الخصوصية')+'</button> <b style="color:var(--coral)">*</b></span></label>'+
  '<button class="btn btn-primary" type="submit" style="width:100%">'+tt('Submit registration','أرسل طلب التسجيل')+'</button></form>');
}

/* الأحداث المفوَّضة */
document.addEventListener('click',function(e){
 var a=e.target.closest('[data-action]');
 if(!a)return;
 var act=a.getAttribute('data-action');
 if(act==='lang')setLang(a.getAttribute('data-l'));
 else if(act==='menu'){var ex=$('.burger').getAttribute('aria-expanded')==='true';if(ex)closeMenu();else openMenu()}
 else if(act==='mlink')closeMenu();
 else if(act==='freset'){state.age='all';state.topic='all';state.type='all';render()}
 else if(act==='fset'){state[a.getAttribute('data-k')]=a.getAttribute('data-v');render()}
 else if(act==='age-tab'){state.ageTab=a.getAttribute('data-age');
  $$('.age-tab').forEach(function(t){var on=t===a;t.classList.toggle('on',on);t.setAttribute('aria-selected',on)});
  renderAgeProgs()}
 else if(act==='age-link'){state.age=a.getAttribute('data-age');state.topic='all';state.type='all';
  if(state.page==='programs'){render()}else{location.hash='#/programs'}}
 else if(act==='pillar'){state.pillar=+a.getAttribute('data-i');renderPillarPanel()}
 else if(act==='lens'){var i=+a.getAttribute('data-d');var card=a.closest('.sf-card');
  var reflect=a.getAttribute('data-mode')==='reflect';
  $$('button',card.querySelector('.seg')).forEach(function(b){var on=b===a;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
  var body=$('#sfBody'+i),l=DATA.lenses[i];
  var txt=reflect?T(l.reflect):T(l.discover);
  var m=T(l.reflect).match(/[«"]([^»"]+)[»"]/);
  body.innerHTML='<div class="fadein"><p>'+txt+'</p>'+(reflect&&m?'<span class="verse">'+m[1]+'</span>':'')+'</div>'}
 else if(act==='story-cat'){state.story=a.getAttribute('data-c');
  $$('[data-action="story-cat"]').forEach(function(b){b.classList.toggle('on',b===a)});renderStoryGrid()}
 else if(act==='open-program'){var p=null;
  for(var pi=0;pi<DATA.programs.length;pi++)if(DATA.programs[pi].id===a.getAttribute('data-id'))p=DATA.programs[pi];
  if(!p)return;
  var lb=tt(AGES[p.age].range+' years','أعمار '+AGES[p.age].range);
  openModal(sectionLabel(lb,lb)+
   '<h3 id="modalTitle" style="margin-top:14px;font-size:1.6rem">'+T(p.name)+'</h3>'+
   '<div class="pc-top" style="margin-top:12px">'+ageBadge(p.age)+'<span class="tag">'+T(TYPES[p.type])+'</span>'+
   p.topics.map(function(t){return '<span class="tag">'+ic(TOPICS[t].ic)+' '+T(TOPICS[t].label)+'</span>'}).join('')+'</div>'+
   '<p style="color:var(--ink-soft);margin-top:16px">'+T(p.desc)+'</p>'+
   '<div class="m-obj"><b style="font-size:.95rem">'+tt('What students will gain','ماذا سيكسب الطالب')+'</b>'+
   '<ul style="margin-top:12px">'+p.objectives.map(function(o){return '<li>'+ic('check')+'<span>'+T(o)+'</span></li>'}).join('')+'</ul></div>'+
   '<div class="m-details">'+
   '<div><span>'+ic('clock')+tt('Schedule','الموعد')+'</span><b>'+T(p.duration)+' · '+T(p.schedule)+'</b></div>'+
   '<div><span>'+ic('pin')+tt('Format','الصيغة')+'</span><b>'+T(p.format)+'</b></div>'+
   '<div><span>'+ic('users')+tt('Group','المجموعة')+'</span><b>'+T(p.group)+'</b></div>'+
   '<div><span>'+ic('tag')+tt('Fee','الرسوم')+'</span><b>'+T(p.fee)+'</b></div></div>'+
   '<div class="m-note">'+tt('First session is an open, free trial for new families.','الجلسة الأولى تجربة مفتوحة مجانية للعائلات الجديدة.')+'</div>'+
   '<button class="btn btn-primary" style="width:100%" data-action="register" data-pid="'+p.id+'" data-age="'+p.age+'">'+tt('Register for this program','سجّل في هذا البرنامج')+ic('arrow','ic-flip')+'</button>')}
 else if(act==='open-article'){var art=null;
  for(var ai=0;ai<DATA.articles.length;ai++)if(DATA.articles[ai].id===a.getAttribute('data-id'))art=DATA.articles[ai];
  if(!art)return;
  openModal('<span class="cat c-'+art.cat+'">'+T(DATA.cats[art.cat])+'</span>'+
   '<h3 id="modalTitle" style="margin-top:16px;font-size:1.7rem">'+T(art.title)+'</h3>'+
   '<p style="color:var(--ink-faint);font-weight:700;font-size:.85rem;margin-top:12px">'+T(art.author)+' · '+T(art.date)+' · '+ic('clock')+' '+T(art.time)+'</p>'+
   '<div style="margin-top:24px;display:flex;flex-direction:column;gap:16px">'+art.body.map(function(x){return '<p style="color:var(--ink-soft)">'+T(x)+'</p>'}).join('')+'</div>'+
   '<div style="margin-top:28px;padding-top:22px;border-top:1px dashed var(--line);display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">'+
   '<span style="font-weight:700;font-size:.9rem;color:var(--ink-soft)">'+tt('Enjoyed this? We publish twice a month.','أعجبك؟ ننشر مرتين شهريًا.')+'</span>'+
   '<a class="btn btn-ghost btn-sm" href="#/stories" data-action="close-modal">'+tt('More stories','المزيد من القصص')+'</a></div>')}
 else if(act==='register'){closeModal();
  var pid=a.getAttribute('data-pid');
  openRegister(pid?{pid:'p:'+pid,age:a.getAttribute('data-age')}:null)}
 else if(act==='close-modal')closeModal();
 else if(act==='form-reset')render();
 else if(act==='acc'){var acc=a.closest('.acc');var open=acc.classList.toggle('open');a.setAttribute('aria-expanded',open)}
 else if(act==='open-legal'){var l=DATA.legal[a.getAttribute('data-l')];
  openModal('<h3 id="modalTitle" style="font-size:1.4rem;margin-bottom:16px">'+T(l.t)+'</h3><p style="color:var(--ink-soft)">'+T(l.b)+'</p>')}
});

/* التشغيل */
document.documentElement.lang=state.lang;
document.documentElement.dir=(state.lang==='ar'?'rtl':'ltr');
function route(){var h=location.hash.replace('#/','');setPage(pages[h]?h:'home')}
window.addEventListener('hashchange',route);
if(!location.hash){try{history.replaceState(null,'','#/home')}catch(e){}}
try{route()}catch(err){console.error('MASHQ boot:',err)}
})();
