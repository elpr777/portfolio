
(function(){
  const root=document.documentElement;
  let lang='en'; try{ lang=localStorage.getItem('court9-lang')||'en'; }catch(e){}
  const els=[...document.querySelectorAll('[data-ar]')]; els.forEach(el=>el.dataset.en=el.innerHTML);
  const hot=document.querySelector('.tier.hot');
  const L={
    en:{d:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],today:'Today',court:'Court',pano:'Panoramic',cov:'Covered',egp:v=>'EGP '+v.toLocaleString('en-US'),pick:'Pick an open slot on the board first.',ok:(c,t)=>`Booked. ${c} at ${t}. Payment links sent to all four players on WhatsApp.`,badge:'Most popular',booked:'Booked',swipe:'Swipe for more',menu:'Open menu',wa:'Chat on WhatsApp',dm:'Dark mode',lm:'Light mode'},
    ar:{d:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],today:'النهارده',court:'ملعب',pano:'بانوراما',cov:'مغطى',egp:v=>v.toLocaleString('en-US')+' ج.م',pick:'اختار ميعاد متاح من الجدول الأول.',ok:(c,t)=>`تم الحجز. ${c} الساعة ${t}. لينكات الدفع اتبعتت للأربع لعيبة على واتساب.`,badge:'الأكثر طلبًا',booked:'محجوز',swipe:'اسحب لرؤية المزيد',menu:'افتح القائمة',wa:'تواصل عبر واتساب',dm:'الوضع الداكن',lm:'الوضع الفاتح'}
  };
  const hours=[]; for(let h=7;h<=24;h++) hours.push(h); // start times 07:00 … 00:00
  const hh=h=>String(h%24).padStart(2,'0')+':00';
  const peak=h=>h>=16;
  let day=0, mins=90, sel=null;
  const now=new Date(); const dates=[...Array(7)].map((_,i)=>{const d=new Date(now); d.setDate(now.getDate()+i); return d;});
  function busy(c,h){ const s=(c*13+h*7+day*5)%11; return s<4 || (peak(h) && s<6); }
  function price(c,h){ const base=peak(h)?1200:800; return (base+(c<3?200:0))*mins/60; }
  function renderDays(){
    const b=document.getElementById('days'); b.innerHTML='';
    dates.forEach((d,i)=>{ const x=document.createElement('button'); x.type='button'; x.setAttribute('aria-pressed',i===day);
      x.innerHTML=`<small>${i===0?L[lang].today:L[lang].d[d.getDay()]}</small>${d.getDate()}`;
      x.onclick=()=>{ day=i; sel=null; renderDays(); renderBoard(); ticket(); }; b.appendChild(x); });
  }
  function renderBoard(){
    let h='<table><thead><tr><th scope="col"></th>'+hours.map(x=>`<th scope="col" class="${peak(x)?'pk':''}">${hh(x)}</th>`).join('')+'</tr></thead><tbody>';
    for(let c=0;c<9;c++){
      h+=`<tr><th scope="row">${L[lang].court} ${c+1}<small>${c<3?L[lang].pano:L[lang].cov}</small></th>`;
      hours.forEach(x=>{ const b=busy(c,x), s=sel&&sel.c===c&&sel.h===x;
        h+=`<td><button type="button" data-c="${c}" data-h="${x}" class="${b?'busy':''}${s?' sel':''}" ${b?`disabled aria-label="${L[lang].court} ${c+1} ${hh(x)} ${L[lang].booked}"`:`aria-label="${L[lang].court} ${c+1} ${hh(x)}"`}>${s?'●':''}</button></td>`; });
      h+='</tr>';
    }
    document.getElementById('board').innerHTML=h+'</tbody></table>';
  }
  document.getElementById('board').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b||b.disabled) return; sel={c:+b.dataset.c,h:+b.dataset.h}; renderBoard(); ticket(); });
  document.getElementById('dur').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; mins=+b.dataset.m;
    document.querySelectorAll('#dur button').forEach(x=>x.setAttribute('aria-pressed',x===b)); ticket(); });
  function endTime(h){ const m=h*60+mins; return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0'); }
  function ticket(){
    const $=id=>document.getElementById(id); $('tMsg').hidden=true;
    const sp=$('tSplit'), small=sp.querySelector('small');
    if(!sel){ ['tCourt','tDay','tTime','tTotal'].forEach(i=>$(i).textContent='—'); sp.firstChild.textContent='—'; return; }
    const d=dates[day];
    $('tCourt').textContent=`${L[lang].court} ${sel.c+1}`;
    $('tDay').textContent=`${L[lang].d[d.getDay()]} ${d.getDate()}`;
    $('tTime').textContent=`${hh(sel.h)}–${endTime(sel.h)}`;
    const p=price(sel.c,sel.h); $('tTotal').textContent=L[lang].egp(p);
    sp.firstChild.textContent=L[lang].egp(Math.round(p/4));
  }
  document.getElementById('payBtn').onclick=()=>{ const m=document.getElementById('tMsg'); m.hidden=false;
    m.textContent= sel? L[lang].ok(`${L[lang].court} ${sel.c+1}`, hh(sel.h)) : L[lang].pick; };
  const tb=document.getElementById('themeBtn');
  function themeLabel(){const d=root.getAttribute('data-theme')==='dark';tb.setAttribute('aria-label',d?L[lang].lm:L[lang].dm);tb.setAttribute('aria-pressed',d)}
  tb.onclick=()=>{const n=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('court9-theme',n)}catch(e){}themeLabel()};
  const ARW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  document.querySelectorAll('.hs').forEach(function(g){
    const h=document.createElement('div');h.className='hs-hint';h.setAttribute('aria-hidden','true');
    h.innerHTML='<span class="hs-bar"><i></i></span><span class="hs-txt">'+ARW+'<b></b></span>';
    g.insertAdjacentElement('afterend',h);
    const bar=h.querySelector('i');
    function up(){const m=g.scrollWidth-g.clientWidth,p=m>0?Math.min(1,Math.abs(g.scrollLeft)/m):0,w=g.clientWidth/g.scrollWidth;bar.style.width=(w*100)+'%';bar.style.insetInlineStart=(p*(1-w)*100)+'%'}
    g.addEventListener('scroll',up,{passive:true});window.addEventListener('resize',up);up();
  });
  function setLang(l){ lang=l; root.lang=l; root.dir=l==='ar'?'rtl':'ltr';
    els.forEach(el=>el.innerHTML= l==='ar'?el.dataset.ar:el.dataset.en);
    hot.dataset.badge=L[l].badge;
    document.getElementById('menuBtn').setAttribute('aria-label',L[l].menu);
    document.querySelector('.wa').setAttribute('aria-label',L[l].wa);
    document.querySelectorAll('.hs-txt b').forEach(function(b){b.textContent=L[l].swipe});
    themeLabel();
    document.getElementById('langBtn').textContent=l==='ar'?'English':'عربي';
    try{ localStorage.setItem('court9-lang',l);}catch(e){}
    renderDays(); renderBoard(); ticket(); }
  document.getElementById('langBtn').onclick=()=>setLang(lang==='ar'?'en':'ar');
  const mb=document.getElementById('menuBtn'), nl=document.getElementById('navLinks');
  mb.onclick=()=>{ const o=nl.classList.toggle('open'); mb.setAttribute('aria-expanded',o); };
  nl.addEventListener('click',e=>{ if(e.target.closest('a')){ nl.classList.remove('open'); mb.setAttribute('aria-expanded',false);} });
  // preselect a sample slot so the ticket shows a real example
  setLang(lang);
  for(let c=3;c<9&&!sel;c++){ if(!busy(c,19)) sel={c,h:19}; }
  renderBoard(); ticket();
})();
