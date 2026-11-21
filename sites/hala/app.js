
(function(){
'use strict';

/* Mark that JS is running — reveal animations only hide content when this executes */
document.documentElement.classList.add('js');

/* ============ GLOBAL SAFETY NET ============ */
function forceShow(){
  $$('.reveal').forEach(function(el){ el.classList.add('in'); });
}
window.addEventListener('error', forceShow);
function safe(label, fn){
  try { fn(); }
  catch(err){ if(window.console) console.warn('[حلا] '+label+':', err); forceShow(); }
}

/* ============ HELPERS ============ */
function $(s){ return document.querySelector(s); }
function $$(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); }
var LANG=(function(){var v=null;try{v=localStorage.getItem('hala_lang')}catch(e){}return v==='en'?'en':'ar'})();
function L(ar,en){return LANG==='en'?en:ar}
function toAr(s){ if(LANG==='en') return String(s); return String(s).replace(/\d/g, function(d){ return '٠١٢٣٤٥٦٧٨٩'[d]; }).replace(/\./g,'٫'); }
function fmt(n){ try { return Number(n).toLocaleString(LANG==='en'?'en-US':'ar-SA'); } catch(e){ return toAr(n); } }
function money(n){ return LANG==='en' ? 'SAR '+fmt(n) : fmt(n)+' ر.س'; }
function AR(n){ return toAr(String(n).padStart(2,'0')); }

/* ============ SAFE STORAGE (never throws — sandbox/private-mode proof) ============ */
var store = (function(){
  var mem = {}, ok = false;
  try { localStorage.setItem('__hala_t','1'); localStorage.removeItem('__hala_t'); ok = true; }
  catch(e){ ok = false; }
  return {
    get: function(k){
      if(ok){ try { return localStorage.getItem(k); } catch(e){} }
      return (k in mem) ? mem[k] : null;
    },
    set: function(k,v){
      if(ok){ try { localStorage.setItem(k,v); return; } catch(e){} }
      mem[k] = v;
    }
  };
})();

/* ============ DATA ============ */
var PRODUCTS = [
 {id:1,name:'سيروم فيتامين سي المشرق',cat:'skincare',price:189,old:239,rating:4.9,reviews:412,shape:'serum',c1:'#F7C59F',c2:'#E8985E',badge:'الأكثر مبيعاً',desc:'يوحّد لون البشرة ويمنحها إشراقة فورية'},
 {id:2,name:'كريم الليل بالجينسينغ',cat:'skincare',price:165,old:null,rating:4.8,reviews:298,shape:'jar',c1:'#E9D5DA',c2:'#C98A9B',desc:'ترطيب عميق وتجديد ليلي مكثف'},
 {id:3,name:'زيت الورد الطائفي النقي',cat:'skincare',price:145,old:180,rating:4.9,reviews:356,shape:'serum',c1:'#F3C6C6',c2:'#D98A8A',desc:'تغذية فائقة ونضارة طبيعية'},
 {id:4,name:'واقي الشمس المخملي SPF50',cat:'skincare',price:129,old:null,rating:4.7,reviews:521,shape:'tube',c1:'#FDEBD3',c2:'#E9B872',badge:'ضروري يومي',desc:'حماية عالية دون أي أثر أبيض'},
 {id:5,name:'تونر ماء الورد الطائفي',cat:'skincare',price:95,old:120,rating:4.8,reviews:287,shape:'spray',c1:'#F6DCDC',c2:'#E0A3A3',desc:'ينعش البشرة ويضبط مساماتها'},
 {id:6,name:'أحمر شفاه مات مخملي',cat:'makeup',price:89,old:null,rating:4.8,reviews:743,shape:'lipstick',c1:'#B5435A',c2:'#7E2438',badge:'الأكثر مبيعاً',desc:'ثبات ٨ ساعات بلمسة مخملية'},
 {id:7,name:'باليت ظلال الصحراء',cat:'makeup',price:179,old:219,rating:4.7,reviews:319,shape:'palette',c1:'#D9B08C',c2:'#A9714B',desc:'١٢ درجة ترابية لكل المناسبات'},
 {id:8,name:'كريم أساس حرير الورد',cat:'makeup',price:149,old:null,rating:4.6,reviews:233,shape:'pump',c1:'#F1DCD3',c2:'#D4A592',desc:'تغطية طبيعية تدوم طويلاً'},
 {id:9,name:'مسك أبيض الفاخر',cat:'fragrance',price:249,old:299,rating:5.0,reviews:488,shape:'spray',c1:'#F5EBDD',c2:'#C9A96B',badge:'توقيع حلا',desc:'عبير فاخر يدوم أكثر من ١٢ ساعة'},
 {id:10,name:'عود وشاه بلدي',cat:'fragrance',price:320,old:null,rating:4.9,reviews:201,shape:'spray',c1:'#B98A55',c2:'#6E4A2A',desc:'خلطة عود شرقية أصيلة'},
 {id:11,name:'ماسك الكيراتين المرطب',cat:'hair',price:119,old:149,rating:4.8,reviews:365,shape:'jar',c1:'#CDE8DD',c2:'#7FBBA0',desc:'يشفي التقصف ويمنح لمعاناً'},
 {id:12,name:'شامبو التوت المغذي',cat:'hair',price:79,old:null,rating:4.6,reviews:154,shape:'pump',c1:'#E8C7E8',c2:'#B77FB7',desc:'ينظف بلطف ويقوي الشعر'}
];
var BUNDLE = {id:100,name:'صندوق حلا الذهبي — روتين متكامل',cat:'bundle',price:399,old:549,rating:5.0,reviews:126,shape:'gift',c1:'#D8B880',c2:'#9E5463',desc:'٥ منتجات أساسية بتغليف هدايا فاخر'};
var EN_P={"1": {"n": "Radiant Vitamin C Serum", "d": "Evens skin tone and gives an instant glow", "b": "Best seller"}, "2": {"n": "Ginseng Night Cream", "d": "Deep hydration and intensive overnight renewal", "b": null}, "3": {"n": "Pure Taif Rose Oil", "d": "Rich nourishment and natural radiance", "b": null}, "4": {"n": "Velvet Sunscreen SPF50", "d": "High protection with no white cast", "b": "Daily essential"}, "5": {"n": "Taif Rose Water Toner", "d": "Refreshes skin and refines pores", "b": null}, "6": {"n": "Velvet Matte Lipstick", "d": "8-hour wear with a velvety finish", "b": "Best seller"}, "7": {"n": "Desert Shadows Palette", "d": "12 earthy shades for every occasion", "b": null}, "8": {"n": "Silk Rose Foundation", "d": "Natural coverage that lasts", "b": null}, "9": {"n": "Luxury White Musk", "d": "A luxurious scent lasting over 12 hours", "b": "Hala Signature"}, "10": {"n": "Oud Wushah Baladi", "d": "An authentic oriental oud blend", "b": null}, "11": {"n": "Moisturising Keratin Mask", "d": "Repairs breakage and adds shine", "b": null}, "12": {"n": "Nourishing Berry Shampoo", "d": "Cleanses gently and strengthens hair", "b": null}, "100": {"n": "The Golden Hala Box — Complete Routine", "d": "5 essential products in luxury gift packaging", "b": null}};
var ALL = PRODUCTS.concat([BUNDLE]);
ALL.forEach(function(p){var e=EN_P[p.id];p.n_en=e.n;p.d_en=e.d;p.b_en=e.b;});
function PN(p){return LANG==='en'?p.n_en:p.name}
function PD(p){return LANG==='en'?p.d_en:p.desc}
function PB(p){return LANG==='en'?p.b_en:p.badge}
var CATS = [{id:'all',label:'الكل'},{id:'skincare',label:'العناية بالبشرة'},{id:'makeup',label:'المكياج'},{id:'fragrance',label:'العطور'},{id:'hair',label:'العناية بالشعر'}];
var CATS_EN={"all": "All", "skincare": "Skincare", "makeup": "Makeup", "fragrance": "Fragrance", "hair": "Hair care"};
var CAT_LABEL = {};
CATS.forEach(function(c){ CAT_LABEL[c.id] = c.label; });
function CL(id){return LANG==='en'?CATS_EN[id]:CAT_LABEL[id]}
var TESTS_EN=[{"t": "I finally found a full routine that suits my sensitive skin with zero irritation. The vitamin C serum changed my glow in just three weeks!", "n": "Noura Al-Otaibi", "c": "Riyadh"}, {"t": "White Musk became my daily signature — everyone I meet asks about it. The packaging is so luxurious I ordered a second box as a gift for my mom.", "n": "Reem Al-Qahtani", "c": "Jeddah"}, {"t": "I ordered at 10 PM and it arrived the next afternoon! Delivery really is fast and the packaging is fancier than I expected.", "n": "Sara Al-Dosari", "c": "Dammam"}, {"t": "The long-wear lipstick? Unbelievable — from breakfast to dinner without a single touch-up. I now own almost every shade.", "n": "Latifa Al-Shehri", "c": "Makkah"}, {"t": "I messaged them on WhatsApp and they sent me a custom routine for my dry skin, free. That service is why I don't buy anywhere else.", "n": "Al-Jawhara Asiri", "c": "Abha"}];
var TESTIMONIALS = [
 {t:'أول مرة ألقى روتين كامل يناسب بشرتي الحساسة من دون أي تهيّج. سيروم فيتامين سي غيّر إشراقة وجهي خلال ثلاث أسابيع فقط!',n:'نورة العتيبي',c:'الرياض'},
 {t:'مسك أبيض صار توقيعي اليومي — كل من تقابلني تسألني عنه. التغليف فخم لدرجة إني طلبت صندوق ثاني هدية لأمي.',n:'ريم القحطاني',c:'جدة'},
 {t:'طلبت الساعة ١٠ الليل ووصلني الطلب بعد الظهر! التوصيل سريع فعلاً والتغليف أفخم من المتوقع.',n:'سارة الدوسري',c:'الدمام'},
 {t:'أحمر الشفاه الثابت مهب؟ ثباته رهيب من الفطور للعشاء بدون لمسة واحدة. صار عندي كل الدرجات تقريباً.',n:'لطيفة الشهري',c:'مكة المكرمة'},
 {t:'راسلتهم واتساب وأرسلوا لي روتين مخصص لبشرتي الجافة مجاناً. هذي الخدمة اللي تخليني ما أشتري من مكان ثاني.',n:'الجوهرة عسيري',c:'أبها'}
];

/* ============ SVG PRODUCT ART ============ */
var svgCount = 0;
function pImg(p,w,h,eager){ return '<img src="img/p'+p.id+'.webp" alt="'+PN(p).replace(/"/g,'')+'" width="'+w+'" height="'+h+'"'+(eager?'':' loading="lazy" decoding="async"')+'>'; }
function pSVG(p, size){
  size = size || 150;
  svgCount++;
  var uid = 'pg'+svgCount, c1=p.c1, c2=p.c2, D='#3B2E2A', b='';
  switch(p.shape){
    case 'serum': b='<rect x="47" y="16" width="26" height="22" rx="7" fill="'+D+'"/><rect x="52" y="38" width="16" height="12" fill="'+c2+'"/><rect x="34" y="48" width="52" height="98" rx="16" fill="url(#'+uid+')"/><rect x="42" y="58" width="9" height="78" rx="4.5" fill="#fff" opacity=".28"/><rect x="44" y="88" width="32" height="34" rx="6" fill="#fff" opacity=".92"/><rect x="51" y="98" width="18" height="4" rx="2" fill="'+c2+'"/><rect x="51" y="106" width="12" height="3" rx="1.5" fill="#D9C9C4"/>';break;
    case 'jar': b='<rect x="20" y="50" width="80" height="26" rx="10" fill="'+D+'"/><rect x="25" y="74" width="70" height="66" rx="15" fill="url(#'+uid+')"/><rect x="33" y="82" width="9" height="48" rx="4.5" fill="#fff" opacity=".28"/><circle cx="60" cy="104" r="17" fill="#fff" opacity=".92"/><circle cx="60" cy="104" r="6" fill="'+c2+'"/>';break;
    case 'spray': b='<rect x="53" y="10" width="15" height="11" rx="3" fill="'+D+'"/><rect x="45" y="22" width="31" height="20" rx="6" fill="'+D+'"/><rect x="41" y="42" width="39" height="104" rx="13" fill="url(#'+uid+')"/><rect x="48" y="52" width="8" height="84" rx="4" fill="#fff" opacity=".28"/><rect x="47" y="92" width="27" height="30" rx="5" fill="#fff" opacity=".92"/><rect x="52" y="101" width="17" height="4" rx="2" fill="'+c2+'"/>';break;
    case 'lipstick': b='<path d="M51 78 V50 Q51 39 61 44 L69 51 V78 Z" fill="url(#'+uid+')"/><rect x="46" y="78" width="28" height="52" rx="7" fill="'+D+'"/><rect x="46" y="71" width="28" height="8" rx="3" fill="#C5A059"/><rect x="52" y="86" width="8" height="34" rx="4" fill="#fff" opacity=".14"/>';break;
    case 'palette': b='<rect x="16" y="56" width="88" height="58" rx="11" fill="url(#'+uid+')"/><rect x="16" y="56" width="88" height="10" rx="5" fill="#fff" opacity=".2"/><circle cx="36" cy="80" r="9" fill="#fff" opacity=".9"/><circle cx="60" cy="80" r="9" fill="'+D+'" opacity=".35"/><circle cx="84" cy="80" r="9" fill="#C5A059" opacity=".9"/><circle cx="36" cy="102" r="9" fill="'+c2+'"/><circle cx="60" cy="102" r="9" fill="#fff" opacity=".55"/><circle cx="84" cy="102" r="9" fill="'+D+'" opacity=".2"/>';break;
    case 'pump': b='<rect x="50" y="14" width="26" height="9" rx="4" fill="'+D+'"/><rect x="54" y="22" width="9" height="16" fill="'+D+'"/><rect x="37" y="38" width="46" height="108" rx="15" fill="url(#'+uid+')"/><rect x="45" y="48" width="9" height="86" rx="4.5" fill="#fff" opacity=".28"/><rect x="45" y="92" width="30" height="32" rx="6" fill="#fff" opacity=".92"/><rect x="51" y="101" width="18" height="4" rx="2" fill="'+c2+'"/>';break;
    case 'tube': b='<rect x="43" y="30" width="36" height="88" rx="16" fill="url(#'+uid+')"/><rect x="47" y="116" width="28" height="17" rx="5" fill="'+D+'"/><rect x="50" y="40" width="9" height="68" rx="4.5" fill="#fff" opacity=".3"/><rect x="48" y="72" width="26" height="22" rx="5" fill="#fff" opacity=".92"/><rect x="53" y="80" width="16" height="4" rx="2" fill="'+c2+'"/>';break;
    case 'gift': b='<path d="M60 50 C46 34 30 40 36 52 C40 60 52 56 60 50 Z" fill="#fff" opacity=".9"/><path d="M60 50 C74 34 90 40 84 52 C80 60 68 56 60 50 Z" fill="#fff" opacity=".9"/><rect x="18" y="52" width="84" height="22" rx="8" fill="'+c2+'"/><rect x="24" y="72" width="72" height="60" rx="10" fill="url(#'+uid+')"/><rect x="54" y="52" width="12" height="80" fill="#fff" opacity=".85"/><circle cx="60" cy="100" r="12" fill="#fff" opacity=".25"/>';break;
    default: b='<rect x="40" y="40" width="40" height="100" rx="14" fill="url(#'+uid+')"/>';
  }
  return '<svg viewBox="0 0 120 160" width="'+size+'" height="'+Math.round(size*160/120)+'" aria-hidden="true"><defs><linearGradient id="'+uid+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs><ellipse cx="60" cy="152" rx="36" ry="6.5" fill="rgba(60,30,35,.10)"/>'+b+'</svg>';
}
function stars(r){
  var s='';
  for(var i=1;i<=5;i++) s+='<svg class="'+(i<=Math.round(r)?'':'off')+'" viewBox="0 0 24 24"><path d="M12 2l2.9 6.1 6.7.9-4.9 4.7 1.2 6.6L12 17.8 6.1 20.3l1.2-6.6L2.4 9l6.7-.9L12 2z"/></svg>';
  return s;
}
function toast(msg){
  var z=$('#toastZone'), t=document.createElement('div');
  t.className='toast';
  t.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round"><path d="m5 13 4 4L19 7"/></svg>'+msg;
  z.appendChild(t);
  setTimeout(function(){ t.style.opacity='0'; t.style.transition='.4s'; },2400);
  setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); },2900);
}

/* ============ STATE ============ */
var cart = {};
try { cart = JSON.parse(store.get('hala_cart') || '{}') || {}; } catch(e){ cart = {}; }
if (typeof cart !== 'object' || cart === null || Array.isArray(cart)) cart = {};
var curCat = 'all', curQuery = '';
var FREE_SHIP = 200, SHIP_COST = 25;
function save(){ store.set('hala_cart', JSON.stringify(cart)); }
function findP(id){
  for(var i=0;i<ALL.length;i++){ if(ALL[i].id===id) return ALL[i]; }
  return null;
}
function totals(){
  var sub=0, count=0, id, p;
  for(id in cart){
    p = findP(+id);
    if(p){ sub += p.price*cart[id]; count += cart[id]; }
  }
  var ship = (sub===0 || sub>=FREE_SHIP) ? 0 : SHIP_COST;
  return {sub:sub, ship:ship, total:sub+ship, count:count};
}

/* ============ RENDER: PRODUCTS ============ */
function renderTabs(){
  $('#filterTabs').innerHTML = CATS.map(function(c){
    return '<button class="ftab '+(c.id===curCat?'active':'')+'" data-cat="'+c.id+'">'+(LANG==='en'?CATS_EN[c.id]:c.label)+'</button>';
  }).join('');
}
function renderProducts(){
  var q = curQuery.trim();
  var list = PRODUCTS.filter(function(p){
    return (curCat==='all' || p.cat===curCat) && (!q || PN(p).toLowerCase().indexOf(q.toLowerCase())>-1 || PD(p).toLowerCase().indexOf(q.toLowerCase())>-1);
  });
  $('#productGrid').innerHTML = list.map(function(p,i){
    var badge='';
    if(p.old) badge='<span class="p-badge sale">'+L('وفّري ','Save ')+(LANG==='en'?money(p.old-p.price):fmt(p.old-p.price)+' ر.س')+'</span>';
    else if(p.badge) badge='<span class="p-badge">'+PB(p)+'</span>';
    return '<article class="p-card" style="--pd:'+(i*0.06)+'s">'
      +'<div class="p-visual" style="background:linear-gradient(160deg,'+p.c1+'2E,'+p.c2+'3D)">'+badge+pImg(p,280,215)+'</div>'
      +'<div class="p-body"><span class="p-cat">'+CL(p.cat)+'</span>'
      +'<h3 class="p-name">'+PN(p)+'</h3>'
      +'<div class="stars">'+stars(p.rating)+'<span class="rnum">'+fmt(p.rating)+' ('+fmt(p.reviews)+')</span></div>'
      +'<p class="p-desc">'+PD(p)+'</p>'
      +'<div class="p-foot"><div class="price"><span class="now">'+money(p.price)+'</span>'+(p.old?'<span class="was">'+fmt(p.old)+'</span>':'')+'</div>'
      +'<button class="add-btn" data-add="'+p.id+'"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>'+L('أضيفي','Add')+'</button></div>'
      +'</div></article>';
  }).join('');
  $('#noResults').style.display = list.length ? 'none' : 'block';
  $('#searchInfo').textContent = q ? (LANG==='en' ? ('Found '+fmt(list.length)+' '+(list.length===1?'product':'products')+' for "'+q+'"') : ('تم العثور على '+fmt(list.length)+' '+(list.length===1?'منتج':'منتجات')+' عن «'+q+'»')) : '';
}
function setCat(id){ curCat=id; renderTabs(); renderProducts(); }

/* ============ RENDER: CART ============ */
function renderCart(){
  var t = totals();
  var badge = $('#cartBadge');
  badge.textContent = fmt(t.count);
  badge.classList.toggle('show', t.count>0);
  var body = $('#cartBody'), ids = Object.keys(cart);
  if(t.count===0){
    body.innerHTML = LANG==='en' ? '<div class="c-empty"><span class="big">🛍️</span><p>Your cart is empty</p><p style="font-size:.85rem;margin-bottom:18px">Explore our collection and pick what suits your beauty.</p><button class="btn btn-primary" data-goshop="1">Shop now</button></div>' : '<div class="c-empty"><span class="big">🛍️</span><p>سلتك فارغة حالياً</p><p style="font-size:.85rem;margin-bottom:18px">اكتشفي مجموعتنا واختاري ما يناسب جمالكِ</p><button class="btn btn-outline" data-goshop>تسوقي الآن</button></div>';
    $('#cartFoot').innerHTML = '';
    $('#shipProgress').innerHTML = '';
    return;
  }
  body.innerHTML = ids.map(function(id){
    var p = findP(+id), q = cart[id];
    if(!p) return '';
    return '<div class="c-item"><div class="c-thumb" style="background:linear-gradient(160deg,'+p.c1+'30,'+p.c2+'40)">'+pImg(p,60,64)+'</div>'
      +'<div class="c-info"><b>'+PN(p)+'</b><span class="c-price">'+money(p.price)+'</span>'
      +'<div class="c-qty"><button data-q="-1" data-id="'+id+'" aria-label="'+L('تقليل','Decrease')+'">−</button><span>'+fmt(q)+'</span><button data-q="1" data-id="'+id+'" aria-label="'+L('زيادة','Increase')+'">+</button></div></div>'
      +'<button class="c-del" data-del="'+id+'" aria-label="'+L('حذف','Remove')+'">✕</button></div>';
  }).join('');
  $('#cartFoot').innerHTML =
    '<div class="tot-row"><span>'+L('المجموع الفرعي','Subtotal')+'</span><span>'+money(t.sub)+'</span></div>'
    +'<div class="tot-row"><span>'+L('الشحن','Shipping')+'</span><span>'+(t.ship===0?L('مجاني ✓','Free ✓'):money(t.ship))+'</span></div>'
    +'<div class="tot-row grand"><span>'+L('الإجمالي','Total')+'</span><span>'+money(t.total)+'</span></div>'
    +'<button class="btn btn-primary" id="checkoutBtn">'+L('إتمام الطلب ✦','Checkout ✦')+'</button>';
  var remain = FREE_SHIP - t.sub;
  $('#shipProgress').innerHTML =
    '<div class="lbl">'+(remain>0 ? (LANG==='en' ? 'Add <b>'+money(remain)+'</b> to get <b>free delivery</b> ✦' : 'أضيفي <b>'+fmt(remain)+' ر.س</b> واحصلي على <b>توصيل مجاني</b> ✦') : (LANG==='en' ? '🎉 <b>Congrats!</b> You unlocked free delivery' : '🎉 <b>مبروك!</b> حصلتِ على توصيل مجاني'))+'</div>'
    +'<div class="bar"><i style="width:'+Math.min(t.sub/FREE_SHIP*100,100)+'%"></i></div>';
}
function addToCart(id){
  cart[id] = (cart[id]||0) + 1;
  save(); renderCart();
  var p = findP(id);
  var pn = PN(p), nm = pn.length>26 ? pn.slice(0,26)+'…' : pn;
  toast(LANG==='en' ? ('Added "'+nm+'" to your cart ✦') : ('أضيف «'+nm+'» إلى سلتك ✦'));
}
function openCart(){ $('#cartDrawer').classList.add('open'); $('#scrim').classList.add('show'); document.body.classList.add('lock'); }
function closeCart(){ $('#cartDrawer').classList.remove('open'); $('#scrim').classList.remove('show'); document.body.classList.remove('lock'); }
function closeMenu(){ $('#mobileNav').classList.remove('open'); $('#scrim').classList.remove('show'); document.body.classList.remove('lock'); }
function openModal(){ closeCart(); $('#checkoutView').style.display='block'; $('#orderSuccess').style.display='none'; $('#modalBack').classList.add('show'); document.body.classList.add('lock'); renderSummary(); }
function closeModal(){ $('#modalBack').classList.remove('show'); document.body.classList.remove('lock'); }
function renderSummary(){
  var t = totals();
  $('#coSummary').innerHTML =
    '<div class="tot-row"><span>'+L('المجموع الفرعي','Subtotal')+'</span><span>'+money(t.sub)+'</span></div>'
    +'<div class="tot-row"><span>'+L('الشحن','Shipping')+'</span><span>'+(t.ship===0?L('مجاني ✓','Free ✓'):money(t.ship))+'</span></div>'
    +'<div class="tot-row"><span>'+L('الإجمالي النهائي','Final total')+'</span><span>'+money(t.total)+'</span></div>';
}

/* ============ COUNTDOWN (safe storage) ============ */
var deadline = +(store.get('hala_deadline') || 0);
if(!deadline || deadline < Date.now()){
  deadline = Date.now() + (2*24*3600 + 11*3600 + 42*60) * 1000;
  store.set('hala_deadline', String(deadline));
}

/* ============ TESTIMONIALS ============ */
var tIdx = 0, tTimer = null;
function renderT(){
  var t = LANG==='en' ? TESTS_EN[tIdx] : TESTIMONIALS[tIdx], card = $('#tCard');
  card.classList.add('fading');
  setTimeout(function(){
    card.innerHTML = '<span class="t-quote">❝</span><p class="t-text">'+t.t+'</p>'
      +'<div class="t-who"><b>'+t.n+'</b><span>'+t.c+L(' — عميلة موثّقة ✓',' — Verified customer ✓')+'</span></div>'
      +'<div class="stars" style="justify-content:center;margin-top:10px">'+stars(5)+'</div>';
    card.classList.remove('fading');
  }, 280);
  $('#tDots').innerHTML = TESTIMONIALS.map(function(_,i){
    return '<button class="t-dot '+(i===tIdx?'active':'')+'" data-t="'+i+'" aria-label="'+L('تقييم ','Review ')+(i+1)+'"></button>';
  }).join('');
}
function startT(){
  if(tTimer) clearInterval(tTimer);
  tTimer = setInterval(function(){ tIdx = (tIdx+1) % TESTIMONIALS.length; renderT(); }, 6000);
}

/* ============ EVENT WIRING ============ */
function attachListeners(){
  /* Global click delegation */
  document.addEventListener('click', function(e){
    var el = e.target, t;
    t = el.closest ? el.closest('[data-add]') : null;
    if(t){ addToCart(+t.getAttribute('data-add')); return; }
    t = el.closest ? el.closest('[data-q]') : null;
    if(t){
      var id = t.getAttribute('data-id');
      cart[id] = (cart[id]||0) + (+t.getAttribute('data-q'));
      if(cart[id] <= 0) delete cart[id];
      save(); renderCart(); return;
    }
    t = el.closest ? el.closest('[data-del]') : null;
    if(t){ delete cart[t.getAttribute('data-del')]; save(); renderCart(); return; }
    if(el.closest && el.closest('[data-goshop]')){ closeCart(); document.getElementById('products').scrollIntoView({behavior:'smooth'}); return; }
    if(el.closest && el.closest('#checkoutBtn')){ openModal(); return; }
    t = el.closest ? el.closest('[data-cat]') : null;
    if(t){ setCat(t.getAttribute('data-cat')); return; }
    t = el.closest ? el.closest('[data-uc]') : null;
    if(t){ setCat(t.getAttribute('data-uc')); return; }
    t = el.closest ? el.closest('[data-fcat]') : null;
    if(t){ setCat(t.getAttribute('data-fcat')); return; }
    t = el.closest ? el.closest('[data-t]') : null;
    if(t){ tIdx = +t.getAttribute('data-t'); renderT(); startT(); return; }
    if(el.closest && el.closest('[data-soon]')){ e.preventDefault(); toast(L('المقال قريباً في مجلة حلا ✦','This article is coming soon to the Hala Journal ✦')); return; }
    t = el.closest ? el.closest('#payMethods .pm') : null;
    if(t){ $$('#payMethods .pm').forEach(function(x){ x.classList.remove('sel'); }); t.classList.add('sel'); return; }
  });

  /* Cart */
  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#scrim').addEventListener('click', function(){ closeCart(); closeMenu(); });

  /* Checkout */
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalBack').addEventListener('click', function(e){ if(e.target === $('#modalBack')) closeModal(); });
  $('#continueBtn').addEventListener('click', closeModal);
  $('#checkoutForm').addEventListener('submit', function(e){
    e.preventDefault();
    $('#orderNum').textContent = L('رقم طلبك: ','Order number: ')+'HL-' + Math.floor(10000 + Math.random()*89999);
    $('#checkoutView').style.display = 'none';
    $('#orderSuccess').style.display = 'block';
    cart = {}; save(); renderCart();
  });

  /* Mobile menu */
  $('#menuBtn').addEventListener('click', function(){
    $('#mobileNav').classList.add('open'); $('#scrim').classList.add('show'); document.body.classList.add('lock');
  });
  $('#menuClose').addEventListener('click', closeMenu);
  $$('#mobileNav a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* Search */
  $('#searchBtn').addEventListener('click', function(){
    $('#searchPanel').classList.add('open');
    setTimeout(function(){ $('#searchInput').focus(); }, 150);
  });
  $('#searchClose').addEventListener('click', function(){ $('#searchPanel').classList.remove('open'); });
  $('#searchInput').addEventListener('input', function(e){
    curQuery = e.target.value; renderProducts();
    if(curQuery.trim()) document.getElementById('products').scrollIntoView({behavior:'smooth'});
  });

  /* Esc closes everything */
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ closeCart(); closeMenu(); closeModal(); $('#searchPanel').classList.remove('open'); }
  });

  /* Newsletter */
  $('#newsForm').addEventListener('submit', function(e){
    e.preventDefault();
    toast(L('تم الاشتراك! ترقبي عروضنا أولاً بأول ✦','Subscribed! Watch for our offers first ✦'));
    e.target.reset();
  });

  /* Header + to-top */
  window.addEventListener('scroll', function(){
    $('#siteHeader').classList.toggle('scrolled', window.scrollY > 8);
    $('#toTop').classList.toggle('show', window.scrollY > 600);
  }, {passive:true});
  $('#toTop').addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  /* FAQ accordion */
  $$('#faqList .faq-item').forEach(function(item){
    item.querySelector('.faq-q').addEventListener('click', function(){
      var open = item.classList.contains('open');
      $$('#faqList .faq-item').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!open){
        item.classList.add('open');
        var a = item.querySelector('.faq-a');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* Pause testimonial rotation on hover */
  $('#tCard').addEventListener('mouseenter', function(){ if(tTimer) clearInterval(tTimer); });
  $('#tCard').addEventListener('mouseleave', startT);
}

/* ============ REVEALS (with IO fallback) ============ */
function setupReveals(){
  var els = $$('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  els.forEach(function(el){ io.observe(el); });
}

/* ============ ANIMATED COUNTERS (with fallback) ============ */
function setFinalCount(el){
  var target = +el.getAttribute('data-count'),
      dec = +(el.getAttribute('data-decimals')||0),
      suf = el.getAttribute('data-suffix')||'';
  el.textContent = toAr(dec ? target.toFixed(dec) : String(target)) + (LANG==='en'?suf.replace('٪','%'):suf);
}
function setupCounters(){
  var els = $$('[data-count]');
  if(!('IntersectionObserver' in window)){ els.forEach(setFinalCount); return; }
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var el = en.target,
          target = +el.getAttribute('data-count'),
          dec = +(el.getAttribute('data-decimals')||0),
          suf = el.getAttribute('data-suffix')||'',
          t0 = Date.now(), dur = 1600;
      (function step(){
        var p = Math.min((Date.now()-t0)/dur, 1),
            ease = 1 - Math.pow(1-p, 3),
            v = target*ease;
        el.textContent = toAr(dec ? v.toFixed(dec) : String(Math.round(v))) + (LANG==='en'?suf.replace('٪','%'):suf);
        if(p<1) requestAnimationFrame(step);
      })();
      cio.unobserve(el);
    });
  }, {threshold:.5});
  els.forEach(function(el){ cio.observe(el); });
}

/* ============ INIT (each step isolated — one failure can't break the rest) ============ */
safe('hero',        function(){ $('#heroMain').innerHTML = '<img src="img/hero.webp" alt="'+L('امرأة سعودية تمسك سيروم حلا','Saudi woman holding a Hala serum')+'" width="644" height="800">'; });
function heroMini(){ $('#heroMini').innerHTML = pImg(PRODUCTS[1],52,52,true) + '<div><span class="t">'+L('ترطيب ٤٨ ساعة','48-hour hydration')+'</span><span class="s">'+PN(PRODUCTS[1])+'</span></div>'; }
safe('hero-mini', heroMini);
safe('offer-art',   function(){ $('#offerArt').innerHTML = pImg(BUNDLE,300,300); });
safe('products',    function(){ renderTabs(); renderProducts(); });
safe('cart',        renderCart);
safe('testimonials',function(){ renderT(); startT(); });
safe('year',        function(){ $('#year').textContent = fmt(new Date().getFullYear()); });
safe('countdown',   function(){
  setInterval(function(){
    var d = Math.max(0, deadline - Date.now());
    var days = Math.floor(d/86400000); d %= 86400000;
    var h = Math.floor(d/3600000); d %= 3600000;
    var m = Math.floor(d/60000), s = Math.floor((d%60000)/1000);
    $('#cdD').textContent = AR(days); $('#cdH').textContent = AR(h);
    $('#cdM').textContent = AR(m);    $('#cdS').textContent = AR(s);
  }, 1000);
});
safe('listeners',   attachListeners);
safe('reveals',     setupReveals);
safe('counters',    setupCounters);


/* ============ LANGUAGE + THEME ============ */
var TR={"حلا | متجر التجميل الفاخر — جمالكِ يبدأ من حلا": "Hala | Luxury Beauty Store — Your Beauty Starts with Hala", "✦ توصيل": "✦ Free", "مجاني": "delivery", "للطلبات فوق ٢٠٠ ر.س — الدفع عند الاستلام متاح لجميع مدن المملكة ✦": "On orders over SAR 200 — cash on delivery available in every city across the Kingdom ✦", "حلا": "Hala", "الرئيسية": "Home", "المنتجات": "Products", "العرض الخاص": "Special offer", "كيف نعمل": "How it works", "آراء العميلات": "Reviews", "قصتنا": "Our story", "الأسئلة الشائعة": "FAQ", "٠": "0", "تسوقي الآن": "Shop now", "✦ علامة التجميل السعودية الفاخرة": "✦ Premium Saudi beauty brand", "جمالكِ يبدأ": "Your beauty", "من حلا": "starts with Hala", "مستحضرات تجميل طبيعية ١٠٠٪ صُنعت للمرأة السعودية — معتمدة من الهيئة العامة للغذاء والدواء، بنتائج ملموسة خلال أسابيع، وتوصيل يصلكِ أينما كنتِ.": "100% natural cosmetics made for Saudi women — registered with the Saudi FDA, with visible results in weeks, and delivery wherever you are.", "تسوقي المجموعة": "Shop the collection", "اكتشفي روتينك": "Find your routine", "+٥٠ ألف": "50K+", "عميلة سعيدة": "happy customers", "٤٫٩ ★": "4.9 ★", "تقييم المتجر": "store rating", "٢٤ ساعة": "24 hours", "شحن سريع": "fast shipping", "خالية من البارابين": "Paraben-free", "مكونات طبيعية ١٠٠٪": "100% natural ingredients", "★★★★★ ٤٫٩": "★★★★★ 4.9", "من +٤١٢ تقييم موثّق": "from 412+ verified reviews", "مرخّصة SFDA": "SFDA licensed", "مسجلة رسمياً": "officially registered", "مكونات حلال": "Halal ingredients", "طبيعية ١٠٠٪": "100% natural", "توصيل ١–٣ أيام": "1–3 day delivery", "لكل مدن المملكة": "to every city in the Kingdom", "دفع عند الاستلام": "Cash on delivery", "آمن ومريح": "safe and easy", "إرجاع ١٤ يوم": "14-day returns", "بدون أسئلة": "no questions asked", "دعم واتساب ٢٤/٧": "WhatsApp support 24/7", "خبيرات عناية": "skincare experts", "هل مررتِ بهذا؟": "Been there?", "الحيرة قبل الشراء… مشكلة كلنا عشناها": "The uncertainty before buying… we've all lived it", "قبل أن نقدم الحل، يجب أن نعترف بالمشكلة — هذه أكثر ما يشعر به المتسوقون في سوق التجميل اليوم.": "Before offering the answer, we have to admit the problem — these are what shoppers feel most in beauty today.", "مكونات مجهولة وضارة": "Unknown, harmful ingredients", "بارابين وسلفات وعطور صناعية تخفيها ملصقات لا يفهمها أحد.": "Parabens, sulfates and synthetic fragrances hidden behind labels nobody can read.", "وعود تسويقية بلا نتائج": "Marketing promises without results", "صور معدلة وادعاءات \"معجزة\"… وبعد شهرين لا شيء تغيّر.": "Retouched photos and \"miracle\" claims… and two months later nothing has changed.", "أسعار مبالغ فيها": "Inflated prices", "علامات مستوردة تدفعين ثمن إعلاناتها لا جودة منتجاتها.": "Imported brands where you pay for the advertising, not the product quality.", "توصيل بطيء وخدمة مهملة": "Slow delivery and neglected service", "أسبوعان انتظار، ولا أحد يرد على استفساراتك عند الحاجة.": "Two weeks of waiting, and nobody answers your questions when you need help.", "بشرتكِ تستحق الأفضل — بدون حيرة، وبدون مخاطرة ✦": "Your skin deserves better — without confusion, without risk ✦", "الحل باسم حلا": "The Hala answer", "لماذا اختارتنا أكثر من ٥٠ ألف عميلة؟": "Why did more than 50,000 women choose us?", "بنينا حلا لتكون الإجابة على كل نقمة في رحلة الجمال — بشفافية كاملة من المختبر إلى بابكِ.": "We built Hala to answer every frustration on the beauty journey — with full transparency from our lab to your door.", "٠١": "01", "مكونات طبيعية آمنة": "Safe natural ingredients", "تركيبات خالية من البارابين والسلفات، بمكونات نباتية مدروسة تناسب البشرة والمناخ الخليجي.": "Paraben- and sulfate-free formulas with considered botanicals, suited to skin and the Gulf climate.", "٠٢": "02", "مرخّصة ومعتمدة": "Licensed and certified", "جميع منتجاتنا مسجلة في الهيئة العامة للغذاء والدواء وتُصنع وفق معايير GMP العالمية.": "All our products are registered with the Saudi Food and Drug Authority and made to international GMP standards.", "٠٣": "03", "نتائج مثبتة مختبرياً": "Lab-proven results", "٩٢٪ من مستخدماتنا لاحظن فرقاً واضحاً خلال ٤ أسابيع — بأبحاث مستقلة لا دعاية.": "92% of our users noticed a clear difference within 4 weeks — based on independent research, not advertising.", "٠٤": "04", "أسعار عادلة": "Fair prices", "نصنع ونبيع مباشرة دون وسطاء، فتحصلين على فخامة عالمية بسعر سعودي منطقي.": "We make and sell directly with no middlemen, so you get global luxury at a sensible Saudi price.", "٠٥": "05", "توصيل سريع": "Fast delivery", "طلبك يُشحن خلال ٢٤ ساعة ويصلك في ١–٣ أيام لأي مدينة في المملكة، مع تتبع لحظي.": "Your order ships within 24 hours and reaches any city in the Kingdom in 1–3 days, with live tracking.", "٠٦": "06", "ضمان استرجاع ١٤ يوم": "14-day money-back guarantee", "لم يعجبك المنتج؟ أرجعيه خلال ١٤ يوماً واستعيدي مبلغك كاملاً — بلا أسئلة.": "Didn't love it? Return it within 14 days and get a full refund — no questions asked.", "ما الذي يميزنا فعلاً؟": "What truly sets us apart?", "قارني بنفسك — الفرق واضح": "See for yourself — the difference is clear", "لا نقول إننا الأفضل… نترك الأرقام والاعتمادات تتحدث.": "We don't claim to be the best… we let the numbers and certifications speak.", "وجه المقارنة": "Comparison", "✦ حلا": "✦ Hala", "المتاجر الأخرى": "Other stores", "مكونات طبيعية ١٠٠٪ خالية من البارابين": "100% natural, paraben-free ingredients", "✓ دائماً": "✓ Always", "✕ أحياناً": "✕ Sometimes", "اعتماد الهيئة العامة للغذاء والدواء (SFDA)": "Saudi FDA (SFDA) registration", "✓ مسجل بالكامل": "✓ Fully registered", "✕ غير متوفر غالباً": "✕ Often missing", "سرعة التوصيل": "Delivery speed", "✓ ٢٤–٤٨ ساعة": "✓ 24–48 hours", "٤–٧ أيام": "4–7 days", "الدفع عند الاستلام": "Cash on delivery", "✓ متاح": "✓ Available", "✕ متفاوت": "✕ Varies", "ضمان استرجاع الأموال": "Money-back guarantee", "✓ ١٤ يوماً": "✓ 14 days", "✕ نادراً": "✕ Rarely", "دعم عبر واتساب": "WhatsApp support", "✓ ٢٤/٧ بخبيرات عناية": "✓ 24/7 with skincare experts", "بريد إلكتروني فقط": "Email only", "مجموعة حلا": "The Hala collection", "منتجات صُنعت لتدوم معكِ": "Products made to last with you", "اختاري من الأكثر مبيعاً — كل منتج بمكوناته ونتائجه الموثقة.": "Choose from our best sellers — each with its ingredients and documented results.", "لعرض المنتجات والتفاعل مع المتجر، يرجى تفعيل JavaScript في المتصفح.": "To view products and use the store, please enable JavaScript in your browser.", "لا توجد نتائج مطابقة — جرّبي كلمة أخرى ✦": "No matching results — try another word ✦", "✦ عرض محدود — لفترة قصيرة فقط": "✦ Limited offer — for a short time only", "صندوق حلا الذهبي": "The Golden Hala Box", "روتينكِ المتكامل بثمن واحد": "Your complete routine, one price", "٥ منتجات أساسية مختارة بعناية: سيروم فيتامين سي، كريم الليل، تونر الورد، واقي الشمس، وأحمر الشفاه — بتغليف هدايا فاخر.": "5 essentials, carefully chosen: Vitamin C serum, night cream, rose toner, sunscreen and lipstick — in luxury gift packaging.", "توفير ١٥٠ ر.س": "Save SAR 150", "تغليف هدايا مجاني": "Free gift wrapping", "توصيل مجاني": "Free delivery", "بطاقة إرشادات مخصصة": "Personalised guidance card", "٣٩٩ ر.س": "SAR 399", "٥٤٩ ر.س": "SAR 549", "وفّري ٢٧٪": "Save 27%", "أضيفي الصندوق للسلة": "Add the box to your cart", "٠٠": "00", "يوم": "days", "ساعة": "hours", "دقيقة": "minutes", "ثانية": "seconds", "٢٧٪-": "-27%", "بثلاث خطوات فقط": "In just three steps", "كيف يصلكِ طلبك؟": "How does your order reach you?", "صممنا التجربة لتكون أبسط من إرسال رسالة واتساب.": "We designed the experience to be simpler than sending a WhatsApp message.", "١": "1", "اختاري منتجاتك": "Choose your products", "تصفحي المجموعة أو اختاري روتيناً جاهزاً — وفريقنا يساعدك عبر واتساب في أي وقت.": "Browse the collection or pick a ready-made routine — and our team helps you on WhatsApp any time.", "٢": "2", "أكملي الطلب بثقة": "Check out with confidence", "دفع آمن بمدى أو Apple Pay، أو قسّميها مع تابي وتمارا — أو ببساطة: الدفع عند الاستلام.": "Pay securely with mada or Apple Pay, split it with Tabby and Tamara — or simply pay on delivery.", "٣": "3", "استلمي وجرّبي": "Receive and enjoy", "يصلكِ طلبك بتغليف فاخر خلال ١–٣ أيام، مع إمكانية الإرجاع خلال ١٤ يوماً.": "Your order arrives in luxury packaging within 1–3 days, with returns possible within 14 days.", "ابدئي التسوق الآن": "Start shopping now", "لكل امرأة قصة": "Every woman has a story", "من أين تبدأ رحلتك مع حلا؟": "Where does your journey with Hala begin?", "اختاري نقطة انطلاقك — ونحن نرشدك للباقي.": "Pick your starting point — and we'll guide you from there.", "العروس": "The Bride", "روتين التوهج المثالي قبل الزفاف — بشرة مشرقة تليق بأجمل مناسباتك.": "The perfect pre-wedding glow routine — radiant skin worthy of your best occasion.", "اكتشفي المجموعة ←": "Explore the collection →", "الموظفة الانشغالة": "The Busy Professional", "جمال سريع في ٥ دقائق صباحاً — أساسيات تكفي يومك كاملاً.": "Quick beauty in 5 minutes each morning — essentials that carry your whole day.", "عاشقة العناية": "The Skincare Lover", "خطوات متكاملة صباحاً ومساءً بتركيبات مختبرية مدروسة.": "Complete morning and evening steps with carefully studied lab formulas.", "الهدية المثالية": "The Perfect Gift", "صناديق فاخرة بتغليف خاص لمن تحبين — في كل المناسبات.": "Luxury boxes in special packaging for someone you love — for every occasion.", "اكتشفي الصندوق ←": "Discover the box →", "كلامهنّ يكفي": "Their words say it all", "+٤٬٢٠٠ تقييم موثّق بمعدل ٤٫٩ من ٥": "4,200+ verified reviews averaging 4.9 out of 5", "تجارب حقيقية من عميلات حلا في مختلف مدن المملكة.": "Real experiences from Hala customers across the Kingdom's cities.", "عميلة سعيدة في جميع أنحاء المملكة": "happy customers across the Kingdom", "متوسط تقييم المنتجات من ٥": "average product rating out of 5", "لاحظن نتائج ملموسة خلال ٤ أسابيع": "noticed visible results within 4 weeks", "رضا عن سرعة التوصيل والتغليف": "satisfied with delivery speed and packaging", "مجلة حلا": "Hala Journal", "نصائح جمال من خبيراتنا": "Beauty tips from our experts", "معرفة تصلح بشرتكِ، لا مجرد منتجات.": "Knowledge that fixes your skin, not just products.", "روتين": "Routine", "٦ دقائق قراءة": "6 min read", "روتين مسائي في ٥ خطوات فقط": "An evening routine in just 5 steps", "الترتيب الصحيح للمنتجات يضاعف النتائج — إليك التسلسل الذهبي الذي تنصح به خبيراتنا.": "The right order of products multiplies results — here is the golden sequence our experts recommend.", "اقرئي المزيد ←": "Read more →", "عطور": "Fragrance", "٤ دقائق قراءة": "4 min read", "كيف تختارين العطر المناسب لمزاجك؟": "How to choose a fragrance for your mood", "من العود الشرقي إلى المسك الأبيض — دليل مبسط لفهم العائلات العطرية واختيار توقيعك.": "From oriental oud to white musk — a simple guide to scent families and finding your signature.", "شعر": "Hair", "٥ دقائق قراءة": "5 min read", "أسرار العناية بالشعر في صيف السعودية": "Secrets of hair care in the Saudi summer", "الحرارة والرطوبة عدوّ شعرك — ٧ عادات بسيطة تحميه من التقصف والبهتان.": "Heat and humidity are your hair's enemy — 7 simple habits that protect it from breakage and dullness.", "قصتنا ✦": "Our story ✦", "من الرياض… إلى كل بيت سعودي": "From Riyadh… to every Saudi home", "بدأت": "", "عام ٢٠٢٠ من غرفة صغيرة في الرياض، بفكرة بسيطة: لماذا تدفع المرأة السعودية ثمن فخامة مستوردة، بينما تستحق أفضل — من بلدها؟": "started in 2020 from a small room in Riyadh with a simple idea: why should Saudi women pay for imported luxury when they deserve the best — from their own country?", "اليوم، نصنع مستحضراتنا في مختبرات معتمدة بمكونات مختارة من الطبيعة العربية: الورد الطائفي، العود، وزيت الأرغان — ونوصلها لأكثر من ٥٠ ألف عميلة يشترين مرة بعد مرة.": "Today, we make our products in certified labs with ingredients chosen from Arabian nature: Taif rose, oud and argan oil — and deliver them to more than 50,000 customers who come back again and again.", "النقاء": "Purity", "الثقة": "Trust", "الفخامة": "Luxury", "الابتكار": "Innovation", "✓ مسجل في SFDA": "✓ SFDA registered", "✓ حلال ١٠٠٪": "✓ 100% halal", "✓ معيار GMP": "✓ GMP standard", "+٥٠ ألف عميلة": "50K+ customers", "يثقن بحلا": "trust Hala", "٤٫٩ ★★★★★": "4.9 ★★★★★", "متوسط التقييم": "average rating", "قبل أن تسألي": "Before you ask", "جمعنا أكثر ما يخطر ببال عميلاتنا — وإن بقي سؤال، واتساب يوصلك.": "We gathered what customers wonder about most — and if a question remains, WhatsApp reaches you.", "كم تستغرق مدة التوصيل؟": "How long does delivery take?", "نشحن طلبك خلال ٢٤ ساعة، ويصلك خلال ١–٣ أيام عمل لأي مدينة في المملكة. للرياض وجدة والدمام قد يصل في نفس اليوم أو اليوم التالي، مع رابط تتبع لحظي يصلك عبر واتساب.": "We ship your order within 24 hours and it arrives within 1–3 business days to any city in the Kingdom. In Riyadh, Jeddah and Dammam it may arrive the same or next day, with a live tracking link sent on WhatsApp.", "ما طرق الدفع المتاحة؟": "What payment methods are available?", "نقبل مدى وجميع البطاقات الائتمانية، وApple Pay، وSTC Pay، كما يمكنك التقسيط عبر تابي أو تمارا على ٤ دفعات بدون فوائد — وإن كنتِ تفضلين البساطة، الدفع عند الاستلام متاح.": "We accept mada and all credit cards, Apple Pay and STC Pay, and you can split into 4 interest-free payments with Tabby or Tamara — and if you prefer simplicity, cash on delivery is available.", "هل يمكنني إرجاع أو استبدال المنتج؟": "Can I return or exchange a product?", "نعم — لديك ١٤ يوماً من تاريخ الاستلام للإرجاع أو الاستبدال، بشرط أن يكون المنتج بحالته الأصلية. نتحمل نحن تكلفة شحن الإرجاع إذا كان السبب من جانبنا.": "Yes — you have 14 days from receipt to return or exchange, provided the product is in its original condition. We cover return shipping if the reason is on our side.", "هل المنتجات أصلية ومرخصة؟": "Are the products genuine and licensed?", "جميع منتجات حلا مسجلة لدى الهيئة العامة للغذاء والدواء (SFDA)، وتُصنع وفق معايير GMP وISO 22716، بمكونات حلال ١٠٠٪ وخالية من البارابين والسلفات.": "All Hala products are registered with the Saudi Food and Drug Authority (SFDA) and made to GMP and ISO 22716 standards, with 100% halal ingredients, free of parabens and sulfates.", "كيف أختار الروتين المناسب لبشرتي؟": "How do I choose the right routine for my skin?", "راسلينا على واتساب وسترد عليك خبيرات العناية لدينا لتحليل نوع بشرتك واقتراح روتين مخصص — الخدمة مجانية تماماً لعميلات حلا.": "Message us on WhatsApp and our skincare experts will analyse your skin type and suggest a personalised routine — completely free for Hala customers.", "هل تشحنون خارج السعودية؟": "Do you ship outside Saudi Arabia?", "نعم، نشحن لجميع دول الخليج خلال ٣–٦ أيام عمل. رسوم الشحن تُحسب عند إتمام الطلب حسب الدولة والوزن.": "Yes, we ship to all Gulf countries within 3–6 business days. Shipping fees are calculated at checkout by country and weight.", "جاهزة تبدئين رحلة جمالكِ؟ ✦": "Ready to start your beauty journey? ✦", "اشتركي في قائمة حلا واحصلي على": "Join the Hala list and get", "خصم ١٠٪": "10% off", "على أول طلب، مع أسر الوصول للعروض والمنتجات الجديدة.": "your first order, plus early access to offers and new products.", "اشتركي": "Subscribe", "أو اطلبي مباشرة:": "Or order directly:", "واتساب +٩٦٦ ٥٥ ٠٠٠ ٠٠٠٠": "WhatsApp +966 55 000 0000", "علامة التجميل السعودية الفاخرة — جمال طبيعي، ثقة كاملة، وتوصيل يصلك أينما كنتِ.": "Premium Saudi beauty brand — natural beauty, full trust, and delivery wherever you are.", "روابط سريعة": "Quick links", "الفئات": "Categories", "العناية بالبشرة": "Skincare", "المكياج": "Makeup", "العطور": "Fragrance", "العناية بالشعر": "Hair care", "تواصلي معنا": "Contact us", "+٩٦٦ ٥٥ ٠٠٠ ٠٠٠٠": "+966 55 000 0000", "الرياض — طريق الملك فهد، برج المملكة": "Riyadh — King Fahd Road, Al Mamlaka Tower", "السبت – الخميس · ٩ صباحاً – ١١ مساءً": "Saturday – Thursday · 9 AM – 11 PM", "مدى": "mada", "تابي": "Tabby", "تمارا": "Tamara", "حلا — جميع الحقوق محفوظة ✦": "Hala — All rights reserved ✦", "سياسة الخصوصية": "Privacy policy", "الشروط والأحكام": "Terms and conditions", "سياسة الاستبدال": "Returns policy", "سلة التسوق ✦": "Shopping cart ✦", "إتمام الطلب ✦": "Checkout ✦", "الاسم الكامل": "Full name", "رقم الجوال": "Mobile number", "المدينة": "City", "اختاري مدينتك": "Choose your city", "الرياض": "Riyadh", "جدة": "Jeddah", "مكة المكرمة": "Makkah", "المدينة المنورة": "Madinah", "الدمام": "Dammam", "الخبر": "Khobar", "أبها": "Abha", "تبوك": "Tabuk", "أخرى": "Other", "العنوان": "Address", "طريقة الدفع": "Payment method", "مدى / بطاقة": "mada / card", "تابي / تمارا — ٤ دفعات": "Tabby / Tamara — 4 payments", "تأكيد الطلب": "Confirm order", "هذا متجر تجريبي — لن تتم أي عملية دفع فعلية ✦": "This is a demo store — no actual payment will be taken ✦", "تم استلام طلبك بنجاح! ✦": "Your order was received! ✦", "سيتواصل معك فريق حلا عبر واتساب لتأكيد الطلب وتزويدك برقم التتبع خلال دقائق.": "The Hala team will contact you on WhatsApp within minutes to confirm your order and send your tracking number.", "متابعة التسوق": "Continue shopping", "حلا — مستحضرات تجميل طبيعية معتمدة من الغذاء والدواء، توصيل سريع لجميع مدن المملكة، الدفع عند الاستلام.": "Hala — natural cosmetics registered with the Saudi FDA, fast delivery to every city in the Kingdom, cash on delivery.", "فتح القائمة": "Open menu", "حلا الرئيسية": "Hala home", "بحث": "Search", "سلة التسوق": "Shopping cart", "إغلاق": "Close", "بريدك الإلكتروني": "Your email", "البريد الإلكتروني": "Email", "انستقرام": "Instagram", "إكس": "X", "تيك توك": "TikTok", "واتساب": "WhatsApp", "تواصلي عبر واتساب": "Contact us on WhatsApp", "العودة للأعلى": "Back to top", "ابحثي عن منتج… سيروم، عطر، أحمر شفاه": "Search for a product… serum, perfume, lipstick", "مثال: نورة العتيبي": "Example: Noura Al-Otaibi", "الحي، الشارع، رقم المبنى": "District, street, building number"};
var DOMSTORE=new WeakMap();
function norm(s){return String(s).replace(/\s+/g,' ').trim()}
function has(k){return Object.prototype.hasOwnProperty.call(TR,k)}
function applyDom(){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);
  var n,list=[];while((n=w.nextNode())){var pn=n.parentNode&&n.parentNode.nodeName;if(pn!=='SCRIPT'&&pn!=='STYLE')list.push(n)}
  list.forEach(function(n){var o=DOMSTORE.get(n);if(o===undefined){var k=norm(n.nodeValue);if(!k||!has(k))return;o={raw:n.nodeValue,k:k};DOMSTORE.set(n,o)}
    if(LANG==='en'){var lead=o.raw.match(/^\s*/)[0],trail=o.raw.match(/\s*$/)[0];n.nodeValue=lead+TR[o.k]+trail}else n.nodeValue=o.raw});
  ['placeholder','aria-label','title','alt'].forEach(function(at){$$('['+at+']').forEach(function(el){var key='data-ar-'+at;if(!el.hasAttribute(key)){var v=norm(el.getAttribute(at));if(!has(v))return;el.setAttribute(key,el.getAttribute(at))}
    var ar=el.getAttribute(key);el.setAttribute(at,LANG==='en'?TR[norm(ar)]:ar)})});
  var T0='حلا | متجر التجميل الفاخر — جمالكِ يبدأ من حلا';document.title=LANG==='en'?TR[T0]:T0;
  var md=document.querySelector('meta[name="description"]');if(md){if(!md.hasAttribute('data-ar'))md.setAttribute('data-ar',md.getAttribute('content'));var ad=md.getAttribute('data-ar');md.setAttribute('content',LANG==='en'&&has(norm(ad))?TR[norm(ad)]:ad)}
}
var THEME=(function(){var v=null;try{v=localStorage.getItem('hala_theme')}catch(e){}return v||((window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light')})();
function setTheme(t){THEME=t;document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem('hala_theme',t)}catch(e){}
  var b=$('#themeBtn');if(b){b.setAttribute('aria-label',LANG==='en'?(t==='dark'?'Light mode':'Dark mode'):(t==='dark'?'الوضع الفاتح':'الوضع الداكن'));b.setAttribute('aria-pressed',String(t==='dark'))}}
function setLang(l){
  LANG=l;try{localStorage.setItem('hala_lang',l)}catch(e){}
  var h=document.documentElement;h.lang=l;h.dir=l==='en'?'ltr':'rtl';
  var lb=$('#langBtn');if(lb){lb.textContent=l==='en'?'عربي':'EN';lb.setAttribute('aria-label',l==='en'?'التبديل إلى العربية':'Switch to English')}
  applyDom();
  renderTabs();renderProducts();renderCart();renderT();heroMini();$('#heroMain').innerHTML='<img src="img/hero.webp" alt="'+L('امرأة سعودية تمسك سيروم حلا','Saudi woman holding a Hala serum')+'" width="644" height="800">';$('#offerArt').innerHTML=pImg(BUNDLE,300,300);
  $$('[data-count]').forEach(function(el){var tx=el.textContent.trim();if(tx&&!/^[٠0]$/.test(tx))setFinalCount(el)});
  var yr=$('#year');if(yr)yr.textContent=fmt(new Date().getFullYear());
  setTheme(THEME);
}
safe('theme-lang',function(){
  var lb=$('#langBtn'),tb=$('#themeBtn');
  lb.addEventListener('click',function(){setLang(LANG==='en'?'ar':'en')});
  tb.addEventListener('click',function(){setTheme(THEME==='dark'?'light':'dark')});
  setTheme(THEME);if(LANG==='en')setLang('en');
});

})();
