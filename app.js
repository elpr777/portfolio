(function(){"use strict";
var D=window.D,C=D.C,app=document.getElementById("app"),root=document.documentElement;
var L=root.lang==="en"?"en":"ar",TH=root.dataset.theme==="light"?"light":"dark";
var CASE="https://claude.ai/artifact/YUQPpFho1Q2UrYBQy7a9yv";
function X(a,e){return L==="ar"?a:e}function P(o){return o[L]}
function h(t,a,k){var e=document.createElement(t);if(a)for(var n in a){var v=a[n];if(v==null)continue;if(n==="text")e.textContent=v;else if(n==="class")e.className=v;else e.setAttribute(n,v)}
(k||[]).forEach(function(c){if(c!=null&&c!==false)e.appendChild(typeof c==="string"?document.createTextNode(c):c)});return e}
function safeUrl(u){try{var x=new URL(u);return x.protocol==="https:"&&(x.hostname==="claude.ai"||x.hostname==="wa.me"||x.hostname==="calendar.google.com"||x.hostname==="www.linkedin.com")?x.href:null}catch(e){return null}}
function save(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function ext(href,cls,kids){var u=safeUrl(href);return h("a",{href:u||"#",target:"_blank",rel:"noopener noreferrer",class:cls},kids)}
var pv,pvImg,pvTag,raf=0,tx=0,ty=0,cx=-999,cy=-999;
function bar(){return h("div",{class:"bar"},[h("i"),h("i"),h("i")])}
function header(){
 var t=h("div",{class:"tg"},[
  h("button",{type:"button",lang:L==="ar"?"en":"ar","aria-label":L==="ar"?"EN · English":"عربي · العربية",text:L==="ar"?"EN":"عربي"}),
  h("button",{type:"button","aria-label":X("تبديل الوضع","Toggle theme"),"aria-pressed":TH==="dark"?"true":"false",text:TH==="dark"?"☾":"☀"})]);
 t.children[0].onclick=function(){L=L==="ar"?"en":"ar";save("ms2_lang",L);root.lang=L;root.dir=L==="ar"?"rtl":"ltr";render()};
 t.children[1].onclick=function(){TH=TH==="dark"?"light":"dark";save("ms2_theme",TH);root.dataset.theme=TH;render()};
 return h("header",{class:"top"+(location.hash.indexOf("#/p/")===0||location.hash.indexOf("#/blog")===0?"":" fx over")},[h("div",{class:"wrap"},[
  h("a",{href:"#/",class:"logo"},[h("img",{class:"me",src:"img/me.webp",alt:"",width:"40",height:"40"}),h("span",{text:X("محمد سيد","Muhammad Sayed")})]),
  h("nav",{"aria-label":X("التنقل","Main")},[h("a",{href:"#/work",text:X("أعمال","Work")}),h("a",{href:"#/blog",text:X("المدوّنة","Journal")}),h("a",{href:"mailto:"+C.email,text:X("تواصل","Contact")}),t])])])}
function words(s,em){var i=0,out=[];s.split(" ").forEach(function(w){var isE=em&&w===em;var sp=h("span",{text:w});sp.style.setProperty("--i",i++);var wr=h("span",{class:"w"},[sp]);out.push(isE?h("em",null,[wr]):wr);out.push(" ")});return out}
function strip(){var ul=h("ul",{class:"trk"});
 [0,1].forEach(function(d){D.P.forEach(function(p){var an={href:"#/p/"+p.id,"aria-label":P(p.n)};if(d){an["aria-hidden"]="true";an.tabindex="-1"}
  ul.appendChild(h("li",null,[h("a",an,[h("img",{src:"img/"+p.id+"-m.webp",alt:"",width:"260",height:"550",loading:"eager"})])]))})});
 return h("div",{class:"strip"},[ul])}
function ln(t,i){var s=h("span",{text:t});s.style.setProperty("--i",i);return h("span",{class:"ln"},[s])}
var CAL="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Project call \u2014 Muhammad Sayed")+"&details="+encodeURIComponent("Tell me about your project, goals and timeline.")+"&add="+encodeURIComponent(C.email);
function cairoOpen(){try{var p=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Cairo",hour:"numeric",hour12:false}).format(new Date());var hr=parseInt(p,10)%24;return hr>=10&&hr<16}catch(e){return false}}
function status(){var on=cairoOpen();var el=h("span",{class:"stat","data-s":on?"on":"off",role:"status"},[h("i","aria-hidden"),h("span",{text:""})]);
 function paint(){var o=cairoOpen();el.setAttribute("data-s",o?"on":"off");el.lastChild.textContent=(o?X("أونلاين الآن","Online now"):X("أوفلاين الآن","Offline now"))}
 paint();var t=setInterval(function(){if(!el.isConnected){clearInterval(t);return}paint()},60000);return el}
function pitch(){return h("div",{class:"pitch"},[
  h("h2",{class:"hl",text:X("الموقع بيفرق.\nعشان تبيع أحسن.","Website matters\nfor better sales.")}),
  h("p",{class:"sb",text:X("ببني مواقع وهويات بتقنع الزائر وتحوّله لعميل من أول شاشة.","Build websites and brands that win trust on the first screen and turn visitors into customers.")}),
  h("div",{class:"pc"},[ext(CAL,"hbtn",[h("span",{text:X("احجز مكالمة \u2197","Book a call \u2197")})])])])}
function hero(){var n=L==="ar"?["محمد","سيد"]:["Muhammad","Sayed"];
 return h("section",{class:"hero3"},[
  h("canvas",{class:"hbg","aria-hidden":"true"}),
  h("h1",{class:"sr",text:n.join(" ")}),
  pitch(),
  h("div",{class:"mt"},[h("span",{text:X("مدير تصميم","Design Director")}),h("span",{text:X("القاهرة","Cairo")}),h("span",{text:X("10+ سنين في المواقع","10+ years in web")}),status()].map(function(e,i){e.style.setProperty("--i",i);return e})) ])}
function industries(){var ul=h("ul"),n=D.IND.length;for(var k=0;k<2;k++)D.IND.forEach(function(w){var li=h("li",{text:X(w[0],w[1])});if(k)li.setAttribute("aria-hidden","true");ul.appendChild(li)});
 var sec=h("section",{class:"ind","aria-label":X("المجالات اللي اشتغلت فيها","Industries I work in")},[ul]);return h("div",{class:"indw"},[sec])}
function movePv(){raf=0;tx+=(cx-tx)*.16;ty+=(cy-ty)*.16;pv.style.transform="translate3d("+Math.round(tx+28)+"px,"+Math.round(ty-110)+"px,0) scale(1)";if(Math.abs(cx-tx)>.5||Math.abs(cy-ty)>.5)raf=requestAnimationFrame(movePv)}
function showPv(p,x,y){pvImg.src="img/"+p.id+"-d.webp";pvImg.alt="";pvTag.textContent=X("افتح ↗","Open ↗");pv.classList.add("on");pv.style.scale="1";track(x,y)}
function track(x,y){cx=Math.min(x,innerWidth-pv.offsetWidth-40);cy=y;if(!raf)raf=requestAnimationFrame(movePv)}
function hidePv(){pv.classList.remove("on");pv.style.scale=".92"}
function work(){var ul=h("ul",{class:"list"});
 D.P.forEach(function(p,i){var a=h("a",{href:"#/p/"+p.id},[h("b",{text:String(i+1).padStart(2,"0")}),
  h("div",null,[h("div",{class:"th"},[h("img",{src:"img/"+p.id+"-d.webp",alt:"",loading:"lazy",width:"1280",height:"800"})]),h("h3",{text:P(p.n)})]),h("span",{class:"s",text:P(p.s)})]);
  a.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse")showPv(p,e.clientX,e.clientY)});
  a.addEventListener("pointermove",function(e){if(e.pointerType==="mouse")track(e.clientX,e.clientY)});
  a.addEventListener("pointerleave",hidePv);
  a.addEventListener("focus",function(){var r=a.getBoundingClientRect();showPv(p,r.left+r.width/2,r.top+r.height/2)});a.addEventListener("blur",hidePv);
  ul.appendChild(h("li",{class:"row rv"},[a]))});
 return h("section",{id:"work"},[h("div",{class:"wrap"},[h("div",{class:"sh"},[h("h2",{text:X("أعمال مختارة","Selected work")}),h("span",{text:X("11 موقع","11 websites")})]),ul])])}
function slide(dir){var tr=document.getElementById("tr");if(!tr)return;var c=tr.querySelector("li");var w=c?c.offsetWidth+16:340;var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;tr.scrollBy({left:dir*w,behavior:rm?"auto":"smooth"})}
function testi(){var tr=h("ul",{class:"tr",id:"tr",dir:"ltr",tabindex:"0","aria-label":X("آراء العملاء","Testimonials")});
 D.T.forEach(function(t){tr.appendChild(h("li",{class:"tc",lang:"en"},[h("span",{class:"qm","aria-hidden":"true",text:"\u201C"}),h("blockquote",null,[h("p",{text:t.q})]),h("footer",null,[h("b",{text:t.n}),h("span",{text:t.r}),h("small",{text:t.d})])]))});
 var pv=h("button",{type:"button","aria-label":X("السابق","Previous"),text:"\u2190"}),nx=h("button",{type:"button","aria-label":X("التالي","Next"),text:"\u2192"});
 pv.onclick=function(){slide(-1)};nx.onclick=function(){slide(1)};
 return h("section",{id:"testimonials"},[h("div",{class:"wrap"},[h("div",{class:"sh"},[h("h2",{text:X("آراء العملاء","Testimonials")})]),tr,
  h("div",{class:"tctl"},[h("div",{class:"arr",dir:"ltr"},[pv,nx]),null])])])}
function numbers(){function stat(n,line,src){return h("div",{class:"stt"},[h("b",{text:n,dir:"ltr"}),h("p",{text:line}),h("small",{text:src,dir:"ltr"})])}
 return h("section",{id:"numbers",class:"numbers"},[h("div",{class:"wrap"},[h("div",{class:"stats rv"},[stat("50ms",X("هو كل اللي الزائر محتاجه عشان يحكم على شكل موقعك.","is all a visitor needs to judge how your website looks."),"Lindgaard et al. \u00B7 Carleton University \u00B7 2006"),stat("+8.4%",X("تحويل أعلى في المتاجر لما سرعة الموبايل تتحسن 0.1 ثانية بس.","higher retail conversion from just a 0.1s faster mobile site."),"Deloitte \u00D7 Google \u00B7 Milliseconds Make Millions")])])])}
function blogHome(){if(!window.BlogUI)return null;var cards=BlogUI.all.slice(0,3);
 return h("section",{id:"journal",class:"jhome"},[h("div",{class:"wrap"},[h("div",{class:"sh"},[h("h2",{text:X("المدوّنة","Journal")}),h("a",{class:"sall",href:"#/blog",text:X("كل المقالات \u2192","All articles \u2192")})]),
  h("ol",{class:"bgrid rv"},cards.map(function(c,k){return h("li",null,[h("a",{class:"bcard",href:"#/blog/"+c.slug},[h("span",{class:"bn",text:String(k+1).padStart(2,"0")}),h("span",{class:"bt",text:P(c.title)}),h("span",{class:"bm",text:P(c.mins)})])])}))])])}
var SUP="https://wa.me/201012203073";
function ico(){var N="http://www.w3.org/2000/svg",s=document.createElementNS(N,"svg"),p=document.createElementNS(N,"path");s.setAttribute("viewBox","0 0 24 24");s.setAttribute("aria-hidden","true");s.setAttribute("class","fi");p.setAttribute("d","M21 12a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.1-4.7A8.5 8.5 0 1 1 21 12z");p.setAttribute("fill","none");p.setAttribute("stroke","currentColor");p.setAttribute("stroke-width","2");p.setAttribute("stroke-linecap","round");p.setAttribute("stroke-linejoin","round");s.appendChild(p);return s}
function footer(){var li=safeUrl(C.linkedin||"");
 return h("footer",{class:"ft"},[h("div",{class:"wrap fg"},[status(),h("span",{class:"fn"},[h("span",{class:"yr",text:"\u00A9 2026 "}),X("محمد سيد","Muhammad Sayed")]),h("div",{class:"fr"},[li?ext(li,"fli",L==="ar"?[h("span",{class:"ar",text:"\u2197"}),h("span",{text:"لينكدإن"})]:[h("span",{text:"LinkedIn"}),h("span",{class:"ar",text:"\u2197"})]):null,ext(SUP,"fs",[ico(),h("span",{text:X("دعم","Support")})])])])])}
var TG={Dev:"Development",WP:"WordPress"};
var LOCAL={nile:1,afanin:1,saraya:1,aurelle:1,haze:1,rokn:1,plink:1,meftah:1,nabd:1,sar:1,masar:1};
function viewer(p,ov,back){var src="sites/"+p.id+"/index.html",mode="d",full=!!ov;
 var fr=h("iframe",{class:"vf",src:src,title:P(p.n),loading:"lazy",sandbox:"allow-scripts allow-same-origin allow-forms allow-popups",referrerpolicy:"no-referrer"});
 var box=h("div",{class:"vbox d"},[fr]);
 var bd=h("button",{type:"button",class:"vb on","aria-pressed":"true",text:X("ديسكتوب","Desktop")}),bm=h("button",{type:"button",class:"vb","aria-pressed":"false",text:X("موبايل","Mobile")}),bf=h("button",{type:"button",class:"vb",text:ov?X("إغلاق","Close"):X("ملء الشاشة","Full screen")});
 var tabs=[bd,bm];if(ov)tabs.push(h("a",{class:"vb",href:src,target:"_blank",rel:"noopener",text:X("تبويب جديد ↗","New tab ↗")}));tabs.push(bf);
 var wrap=h("div",{class:"viewer"+(ov?" full":"")},[h("div",{class:"vbar"},[bar(),h("div",{class:"vtabs"},tabs)]),box]);
 if(ov){wrap.setAttribute("role","dialog");wrap.setAttribute("aria-modal","true");wrap.setAttribute("aria-label",P(p.n));document.documentElement.classList.add("nos")}
 function set(m){mode=m;box.className="vbox "+m;bd.classList.toggle("on",m==="d");bm.classList.toggle("on",m==="m");bd.setAttribute("aria-pressed",String(m==="d"));bm.setAttribute("aria-pressed",String(m==="m"))}
 function close(){removeEventListener("keydown",key);wrap.remove();document.documentElement.classList.remove("nos");if(back)back.focus()}
 function fs(f){if(ov){close();return}full=f;wrap.classList.toggle("full",f);bf.textContent=f?X("إغلاق","Close"):X("ملء الشاشة","Full screen");document.documentElement.classList.toggle("nos",f)}
 function key(e){if(e.key==="Escape"&&full)fs(false)}
 bd.onclick=function(){set("d")};bm.onclick=function(){set("m")};bf.onclick=function(){fs(!full)};
 addEventListener("keydown",key);
 if(ov)setTimeout(function(){bf.focus()},0);
 return wrap}
function openLive(p,btn){document.body.appendChild(viewer(p,true,btn))}
function sw(c){var s=h("span",{class:"sw"});s.style.setProperty("background",c);return h("li",{},[s,h("bdi",{class:"hx",text:c})])}
function sec(k,kids){return h("section",{class:"csec"},[h("h2",{text:k})].concat(kids))}
function project(id){var i=D.P.findIndex(function(p){return p.id===id});if(i<0)return null;var p=D.P[i],n=D.P[(i+1)%D.P.length],c=(window.CS||{})[id]||null;
 function live(cls){var b=h("button",{type:"button",class:"btn "+cls},[h("span",{text:X("افتح الموقع المباشر ↗","Open the live site ↗")})]);b.onclick=function(){openLive(p,b)};return b}
 var btns=[live("p")];if(p.id==="sar"&&safeUrl(CASE))btns.push(ext(CASE,"btn o",[h("span",{text:X("دراسة الحالة الكاملة ↗","Full case study ↗")})]));
 var kids=[
  h("a",{class:"back",href:"#/work"},[h("span",{text:X("→ كل الأعمال","← All work")})]),
  h("p",{class:"kick2",text:X("دراسة حالة","Case study")}),
  h("h1",{text:P(p.n)}),
  h("p",{class:"sub",text:P(p.s)}),
  h("p",{class:"lead",text:P(p.d)}),
  h("div",{class:"btns"},btns),
  h("div",{class:"stage"},[h("div",{class:"frame"},[bar(),h("img",{src:"img/"+p.id+"-d.webp",alt:X("لقطة من موقع ","Screenshot of ")+P(p.n),width:"1280",height:"800"})]),h("div",{class:"phone"},[h("img",{src:"img/"+p.id+"-m.webp",alt:X("نسخة الموبايل","Mobile view"),width:"520",height:"1100"})])])];
 if(c){
  var rows=[[X("الدور","Role"),p.t.map(function(t){return TG[t]||t}).join(" \u00B7 ")],[X("النوع","Type"),X("مشروع تصميمي، محتوى تخيلي","Design project, fictional content")],[X("اللغات","Languages"),X("عربي \u00B7 إنجليزي","Arabic \u00B7 English")],[X("الوضع","Modes"),X("فاتح \u00B7 داكن","Light \u00B7 Dark")]];
  kids.push(h("dl",{class:"facts"},rows.map(function(r){return h("div",{},[h("dt",{text:r[0]}),h("dd",{text:r[1]})])})));
  kids.push(sec(X("الفكرة","The brief"),[h("p",{class:"cp",text:P(c.brief)})]));
  kids.push(sec(X("البحث","Research"),[h("p",{class:"cp",text:P(c.research)})]));
  kids.push(sec(X("قرارات التصميم","Design decisions"),[h("div",{class:"cdecs"},c.dec.map(function(d){return h("article",{class:"cdec"},[h("h3",{text:P(d[0])}),h("p",{text:P(d[1])})])}))]));
  if(c.pal.length||c.fonts){var vs=[];if(c.pal.length)vs.push(h("ul",{class:"sws"},c.pal.map(sw)));if(c.fonts)vs.push(h("p",{class:"cp fonts"},[h("bdi",{text:c.fonts})]));kids.push(sec(X("النظام البصري","Visual system"),vs))}
  kids.push(sec(X("ما بداخل الموقع","Inside the site"),[h("ul",{class:"cfeat"},c.feat.map(function(f){return h("li",{text:P(f)})}))]));
  if(c.q)kids.push(sec(X("الجودة والأمان","Quality and security"),[h("p",{class:"cp",text:X("جرى فحصه بالعربية والإنجليزية، فاتح وداكن، على الموبايل والتابلت والديسكتوب. سياسة أمان صارمة للمحتوى بلا سكربتات داخلية، والمدخلات تُفحص قبل استخدامها.","Checked in Arabic and English, light and dark, on mobile, tablet and desktop. A strict content-security policy with no inline scripts, and every input is validated before use.")})]));
  kids.push(h("div",{class:"btns cend"},[live("p")]))}
 kids.push(h("div",{class:"next"},[h("span",{class:"chip",text:X("التالي","Next")}),h("a",{href:"#/p/"+n.id,text:P(n.n)+" →"})]));
 return h("main",{id:"main",class:"pp cs"},[h("div",{class:"wrap"},kids)])}
document.addEventListener("touchstart",function(){},{passive:true});
function reveal(){var els=[].slice.call(document.querySelectorAll(".rv"));if(!("IntersectionObserver"in window)){els.forEach(function(e){e.classList.add("in")});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.2,rootMargin:"0px 0px -14% 0px"});els.forEach(function(e){io.observe(e)})}
var pb;function prog(){var hd=document.querySelector("header.fx"),hr=document.querySelector(".hero3");if(hd&&hr)hd.classList.toggle("over",scrollY<hr.offsetHeight-70);if(!pb)return;var m=document.documentElement.scrollHeight-innerHeight;pb.style.transform="scaleX("+(m>0?Math.min(1,scrollY/m):0)+")"}
function render(){var hash=location.hash.replace(/^#\/?/,""),pg=null,seg=hash.split("/");
 app.replaceChildren();
 pv=h("div",{class:"pv","aria-hidden":"true"},[h("div",{class:"fr"},[bar(),h("div",{class:"shot"},[h("img",{alt:""})])]),h("span",{class:"tag"})]);pvImg=pv.querySelector("img");pvTag=pv.querySelector(".tag");
 pb=h("div",{class:"bar-p","aria-hidden":"true"});
 var skip=h("a",{class:"skip",href:"#main",text:X("تخطي للمحتوى","Skip to content")});
 skip.addEventListener("click",function(e){e.preventDefault();var m=document.getElementById("main");if(m){m.setAttribute("tabindex","-1");m.focus()}});
 if(seg[0]==="p"&&/^[a-z]+$/.test(seg[1]||""))pg=project(seg[1]);
 var bl=null;if(seg[0]==="blog"&&window.BlogUI)bl=seg[1]&&/^[a-z0-9-]+$/.test(seg[1])?BlogUI.article(h,L,seg[1]):BlogUI.list(h,L);
 var body=pg?[pg]:bl?[bl]:[h("main",{id:"main"},[hero(),industries(),work(),testi(),numbers(),blogHome()])];
 app.appendChild(skip);app.appendChild(pb);app.appendChild(header());body.forEach(function(b){app.appendChild(b)});app.appendChild(footer());app.appendChild(pv);
 document.title=bl?(seg[1]&&BlogUI.find(seg[1])?P(BlogUI.find(seg[1]).title)+" | ":X("المدوّنة | ","Journal | "))+X("محمد سيد","Muhammad Sayed"):pg?P(D.P.find(function(p){return p.id===seg[1]}).n)+" | "+X("محمد سيد","Muhammad Sayed"):X("محمد سيد | مدير تصميم","Muhammad Sayed | Design Director");
 reveal();prog();
 if(pg)window.scrollTo(0,0);else if(bl)window.scrollTo(0,0);else if(["work","journal"].indexOf(seg[0])>-1){var t=document.getElementById(seg[0]);if(t)t.scrollIntoView()}else window.scrollTo(0,0)}
addEventListener("hashchange",render);addEventListener("scroll",prog,{passive:true});addEventListener("resize",prog);
render()})();
