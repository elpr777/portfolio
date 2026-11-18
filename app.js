(function(){"use strict";
var D=window.D,C=D.C,app=document.getElementById("app"),root=document.documentElement;
var L=root.lang==="en"?"en":"ar",TH=root.dataset.theme==="light"?"light":"dark";
var CASE="https://claude.ai/artifact/YUQPpFho1Q2UrYBQy7a9yv";
function X(a,e){return L==="ar"?a:e}function P(o){return o[L]}
function h(t,a,k){var e=document.createElement(t);if(a)for(var n in a){var v=a[n];if(v==null)continue;if(n==="text")e.textContent=v;else if(n==="class")e.className=v;else e.setAttribute(n,v)}
(k||[]).forEach(function(c){if(c!=null&&c!==false)e.appendChild(typeof c==="string"?document.createTextNode(c):c)});return e}
function safeUrl(u){try{var x=new URL(u);return x.protocol==="https:"&&(x.hostname==="claude.ai"||x.hostname==="wa.me"||x.hostname==="calendar.google.com")?x.href:null}catch(e){return null}}
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
 return h("header",{class:"top"+(location.hash.indexOf("#/p/")===0?"":" fx over")},[h("div",{class:"wrap"},[
  h("a",{href:"#/",class:"logo"},[h("img",{class:"me",src:"img/me.webp",alt:"",width:"40",height:"40"}),h("span",{text:X("محمد سيد","Muhammad Sayed")})]),
  h("nav",{"aria-label":X("التنقل","Main")},[h("a",{href:"#/work",text:X("أعمال","Work")}),h("a",{href:"#/contact",text:X("تواصل","Contact")}),t])])])}
function words(s,em){var i=0,out=[];s.split(" ").forEach(function(w){var isE=em&&w===em;var sp=h("span",{text:w});sp.style.setProperty("--i",i++);var wr=h("span",{class:"w"},[sp]);out.push(isE?h("em",null,[wr]):wr);out.push(" ")});return out}
function strip(){var ul=h("ul",{class:"trk"});
 [0,1].forEach(function(d){D.P.forEach(function(p){var an={href:"#/p/"+p.id,"aria-label":P(p.n)};if(d){an["aria-hidden"]="true";an.tabindex="-1"}
  ul.appendChild(h("li",null,[h("a",an,[h("img",{src:"img/"+p.id+"-m.webp",alt:"",width:"260",height:"550",loading:"eager"})])]))})});
 return h("div",{class:"strip"},[ul])}
function ln(t,i){var s=h("span",{text:t});s.style.setProperty("--i",i);return h("span",{class:"ln"},[s])}
var WA="https://wa.me/201012203073?text="+encodeURIComponent("\u0623\u0647\u0644\u0627\u064b \u0645\u062d\u0645\u062f\u060c \u0639\u0627\u064a\u0632 \u0623\u0628\u062f\u0623 \u0645\u0634\u0631\u0648\u0639\u064a. \u0645\u0645\u0643\u0646 \u0646\u062a\u0643\u0644\u0645\u061f");
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
 var rb=h("canvas",{class:"rbw","aria-hidden":"true",width:"2400",height:"60"});try{var c=rb.getContext("2d"),g=c.createLinearGradient(0,0,2400,0),H=[0,30,55,130,190,240,285,330,360];for(var k=0;k<2;k++)H.forEach(function(x,m){g.addColorStop((k+m/(H.length-1))/2,"hsl("+x+",95%,62%)")});c.fillStyle=g;c.fillRect(0,0,2400,60)}catch(e){}
 var sec=h("section",{class:"ind","aria-label":X("المجالات اللي اشتغلت فيها","Industries I work in")},[ul]);return h("div",{class:"indw"},[h("div",{class:"rbx","aria-hidden":"true"},[rb]),sec])}
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
function contact(){var b=[h("a",{class:"btn p",href:"mailto:"+C.email,"aria-label":X("إيميل: ","Email: ")+C.email,title:C.email},[h("span",{text:X("إيميل","Email")})])];
 if(C.phone&&/^\+?[0-9]{8,15}$/.test(C.phone))b.push(ext(WA,"btn o",[h("span",{text:X("واتساب","WhatsApp")+" \u2197"})]));
 function stat(n,line,src){return h("div",{class:"stt"},[h("b",{text:n,dir:"ltr"}),h("p",{text:line}),h("small",{text:src,dir:"ltr"})])}
 var stats=h("div",{class:"stats rv"},[stat("50ms",X("هو كل اللي الزائر محتاجه عشان يحكم على شكل موقعك.","is all a visitor needs to judge how your website looks."),"Lindgaard et al. \u00B7 Carleton University \u00B7 2006"),stat("+8.4%",X("تحويل أعلى في المتاجر لما سرعة الموبايل تتحسن 0.1 ثانية بس.","higher retail conversion from just a 0.1s faster mobile site."),"Deloitte \u00D7 Google \u00B7 Milliseconds Make Millions")]);
 var launch=h("div",{class:"stcta rv"},[ext(WA,"btn p",[h("span",{text:X("أطلق موقعك الآن","Launch your website now")+" \u2197"})])]);
 return h("section",{id:"contact",class:"contact"},[h("div",{class:"wrap"},[stats,launch,h("h2",{class:"big rv",text:X("خلّي موقعك يبيع عنك.","Let your website sell for you.")}),h("p",{class:"csub rv",text:X("ابعتلي فكرتك وهرد عليك بخطة واضحة وسعر محدد.","Send me your idea. I\u2019ll reply with a clear plan and a fixed price.")}),h("div",{class:"cst rv"},[status()]),h("div",{class:"btns rv"},b)])])}
function footer(){return h("footer",{class:"ft"},[h("div",{class:"wrap"},[h("span",{text:"© 2026 "+X("محمد سيد","Muhammad Sayed")}),h("span",{text:X("القاهرة","Cairo")})])])}
var TG={Dev:"Development",WP:"WordPress"};
var LOCAL={nile:1,afanin:1,saraya:1,aurelle:1,haze:1,rokn:1,plink:1,meftah:1,nabd:1,sar:1,masar:1};
function viewer(p){var src="sites/"+p.id+"/index.html",mode="d",full=false;
 var fr=h("iframe",{class:"vf",src:src,title:P(p.n),loading:"lazy",sandbox:"allow-scripts allow-same-origin allow-forms allow-popups",referrerpolicy:"no-referrer"});
 var box=h("div",{class:"vbox d"},[fr]);
 var bd=h("button",{type:"button",class:"vb on","aria-pressed":"true",text:X("ديسكتوب","Desktop")}),bm=h("button",{type:"button",class:"vb","aria-pressed":"false",text:X("موبايل","Mobile")}),bf=h("button",{type:"button",class:"vb",text:X("ملء الشاشة","Full screen")});
 var wrap=h("div",{class:"viewer"},[h("div",{class:"vbar"},[bar(),h("div",{class:"vtabs"},[bd,bm,bf])]),box]);
 function set(m){mode=m;box.className="vbox "+m;bd.classList.toggle("on",m==="d");bm.classList.toggle("on",m==="m");bd.setAttribute("aria-pressed",String(m==="d"));bm.setAttribute("aria-pressed",String(m==="m"))}
 function fs(f){full=f;wrap.classList.toggle("full",f);bf.textContent=f?X("إغلاق","Close"):X("ملء الشاشة","Full screen");document.documentElement.classList.toggle("nos",f)}
 bd.onclick=function(){set("d")};bm.onclick=function(){set("m")};bf.onclick=function(){fs(!full)};
 addEventListener("keydown",function(e){if(e.key==="Escape"&&full)fs(false)});
 return wrap}
function project(id){var i=D.P.findIndex(function(p){return p.id===id});if(i<0)return null;var p=D.P[i],n=D.P[(i+1)%D.P.length];
 var btns=[ext(p.u,"btn p",[h("span",{text:X("افتح الموقع ↗","Visit live site ↗")})])];if(p.id==="sar"&&safeUrl(CASE))btns.push(ext(CASE,"btn o",[h("span",{text:X("دراسة الحالة ↗","Case study ↗")})]));
 return h("main",{id:"main",class:"pp"},[h("div",{class:"wrap"},[
  h("a",{class:"back",href:"#/work"},[h("span",{text:X("→ كل الأعمال","← All work")})]),
  h("h1",{text:P(p.n)}),
  h("p",{class:"sub",text:P(p.s)}),
  h("p",{class:"lead",text:P(p.d)}),
  h("p",{class:"tags",text:p.t.map(function(t){return TG[t]||t}).join(" \u00B7 ")}),
  h("div",{class:"btns"},btns),
  LOCAL[p.id]?viewer(p):h("div",{class:"stage"},[h("div",{class:"frame"},[bar(),h("img",{src:"img/"+p.id+"-d.webp",alt:X("لقطة من موقع ","Screenshot of ")+P(p.n),width:"1280",height:"800"})]),h("div",{class:"phone"},[h("img",{src:"img/"+p.id+"-m.webp",alt:X("نسخة الموبايل","Mobile view"),width:"520",height:"1100"})])]),
  h("div",{class:"next"},[h("span",{class:"chip",text:X("التالي","Next")}),h("a",{href:"#/p/"+n.id,text:P(n.n)+" →"})])])])}
function reveal(){var els=[].slice.call(document.querySelectorAll(".rv"));if(!("IntersectionObserver"in window)){els.forEach(function(e){e.classList.add("in")});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
var pb;function prog(){var hd=document.querySelector("header.fx"),hr=document.querySelector(".hero3");if(hd&&hr)hd.classList.toggle("over",scrollY<hr.offsetHeight-70);if(!pb)return;var m=document.documentElement.scrollHeight-innerHeight;pb.style.transform="scaleX("+(m>0?Math.min(1,scrollY/m):0)+")"}
function render(){var hash=location.hash.replace(/^#\/?/,""),pg=null,seg=hash.split("/");
 app.replaceChildren();
 pv=h("div",{class:"pv","aria-hidden":"true"},[h("div",{class:"fr"},[bar(),h("div",{class:"shot"},[h("img",{alt:""})])]),h("span",{class:"tag"})]);pvImg=pv.querySelector("img");pvTag=pv.querySelector(".tag");
 pb=h("div",{class:"bar-p","aria-hidden":"true"});
 var skip=h("a",{class:"skip",href:"#main",text:X("تخطي للمحتوى","Skip to content")});
 skip.addEventListener("click",function(e){e.preventDefault();var m=document.getElementById("main");if(m){m.setAttribute("tabindex","-1");m.focus()}});
 if(seg[0]==="p"&&/^[a-z]+$/.test(seg[1]||""))pg=project(seg[1]);
 var body=pg?[pg]:[h("main",{id:"main"},[hero(),industries(),work(),testi(),contact()])];
 app.appendChild(skip);app.appendChild(pb);app.appendChild(header());body.forEach(function(b){app.appendChild(b)});app.appendChild(footer());app.appendChild(pv);
 document.title=pg?P(D.P.find(function(p){return p.id===seg[1]}).n)+" | "+X("محمد سيد","Muhammad Sayed"):X("محمد سيد | مدير تصميم","Muhammad Sayed | Design Director");
 reveal();prog();
 if(pg)window.scrollTo(0,0);else if(["work","contact"].indexOf(seg[0])>-1){var t=document.getElementById(seg[0]);if(t)t.scrollIntoView()}else window.scrollTo(0,0)}
addEventListener("hashchange",render);addEventListener("scroll",prog,{passive:true});addEventListener("resize",prog);
render()})();
