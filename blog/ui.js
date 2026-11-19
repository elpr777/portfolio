(function(){"use strict";
var B=(window.BLOG||[]).slice().sort(function(a,b){return a.order-b.order});
function T(o,L){return o[L]}
function safe(u){try{var x=new URL(u);return x.protocol==="https:"?x.href:null}catch(e){return null}}
function fmt(d,L){try{return new Intl.DateTimeFormat(L==="ar"?"ar-EG":"en-GB",{year:"numeric",month:"long",day:"numeric"}).format(new Date(d))}catch(e){return d}}
function ld(a,L){var o={"@context":"https://schema.org","@graph":[
 {"@type":"BlogPosting",headline:T(a.title,L),description:T(a.desc,L),datePublished:a.date,inLanguage:L,author:{"@type":"Person",name:"Muhammad Sayed"},keywords:T(a.kw,L)},
 {"@type":"FAQPage",mainEntity:a.faq.map(function(f){return{"@type":"Question",name:T(f.q,L),acceptedAnswer:{"@type":"Answer",text:T(f.a,L)}}})}]};
 return JSON.stringify(o)}
window.BlogUI={
 all:B,
 find:function(s){return B.find(function(a){return a.slug===s})||null},
 list:function(h,L){
  var X=function(a,e){return L==="ar"?a:e};
  return h("main",{id:"main",class:"blog"},[h("div",{class:"wrap"},[
   h("p",{class:"kick",text:X("المدوّنة","Journal")}),
   h("h1",{class:"bh",text:X("أرقام وأفكار عن بناء المواقع","Numbers and ideas on building websites")}),
   h("p",{class:"bl",text:X("سبع مقالات بأبحاث موثقة، ولكل رقم مصدره.","Seven articles built on published research. Every number links to its source.")}),
   h("ol",{class:"bgrid"},B.map(function(a,i){return h("li",null,[h("a",{class:"bcard",href:"#/blog/"+a.slug},[
    h("span",{class:"bn",text:String(i+1).padStart(2,"0")}),
    h("span",{class:"bt",text:T(a.title,L)}),
    h("span",{class:"bd",text:T(a.desc,L)}),
    h("span",{class:"bm",text:T(a.mins,L)+" · "+T(a.kw,L)})])])}))])])},
 article:function(h,L,slug){
  var a=this.find(slug);if(!a)return null;var X=function(x,e){return L==="ar"?x:e};
  var i=B.indexOf(a),nx=B[(i+1)%B.length],body=[],ol=null;
  a.body.forEach(function(b){
   if(b.t==="h")body.push(h("h2",{text:T(b,L)}));
   else if(b.t==="p")body.push(h("p",{text:T(b,L)}));
   else if(b.t==="ol")body.push(h("ol",{class:"steps"},T(b,L).map(function(s){return h("li",{text:s})})));
   else if(b.t==="stat")body.push(h("aside",{class:"stat"},[h("strong",{class:"sv",text:b.v,dir:"ltr"}),h("p",{text:T(b,L)})]))});
  var s=document.createElement("script");s.type="application/ld+json";s.textContent=ld(a,L);
  return h("main",{id:"main",class:"blog art"},[h("article",{class:"wrap"},[
   h("a",{class:"back",href:"#/blog",text:X("→ كل المقالات","← All articles")}),
   h("p",{class:"kick",text:T(a.kw,L)}),
   h("h1",{class:"bh",text:T(a.title,L)}),
   h("p",{class:"meta",text:fmt(a.date,L)+" · "+T(a.mins,L)+" · "+X("محمد سيد","Muhammad Sayed")}),
   h("p",{class:"hook",text:T(a.hook,L)}),
   h("div",{class:"ans"},[h("strong",{text:X("الإجابة باختصار","Short answer")}),h("p",{text:T(a.answer,L)})]),
   h("div",{class:"prose"},body),
   h("section",{class:"faq","aria-labelledby":"faqh"},[h("h2",{id:"faqh",text:X("أسئلة شائعة","Frequently asked questions")})].concat(a.faq.map(function(f){return h("details",null,[h("summary",{text:T(f.q,L)}),h("p",{text:T(f.a,L)})])}))),
   h("section",{class:"srcs"},[h("h2",{text:X("المصادر","Sources")}),h("ol",null,a.src.map(function(r){var u=safe(r.u);return h("li",null,[h("a",{href:u||"#",target:"_blank",rel:"noopener noreferrer",text:r.t})])}))]),
   h("div",{class:"bcta"},[h("p",{text:X("عايز تطبّق ده على موقعك؟","Want this applied to your own site?")}),h("a",{class:"btn p",href:"#/contact",text:X("نتكلم عن مشروعك","Let's talk about your project")})]),
   h("a",{class:"nextart",href:"#/blog/"+nx.slug},[h("span",{class:"chip",text:X("المقال التالي","Next article")}),h("span",{text:T(nx.title,L)+" →"})]),s])])}
};
})();
