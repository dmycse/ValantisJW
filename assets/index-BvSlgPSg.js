var dt=Object.defineProperty;var ht=(g,t,o)=>t in g?dt(g,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):g[t]=o;var x=(g,t,o)=>(ht(g,typeof t!="symbol"?t+"":t,o),o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))u(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const b of d.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&u(b)}).observe(document,{childList:!0,subtree:!0});function o(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function u(l){if(l.ep)return;l.ep=!0;const d=o(l);fetch(l.href,d)}})();document.getElementById("root");const z=document.getElementById("filter"),J=document.getElementById("catalog"),K=document.getElementById("pages"),ct=document.getElementById("spinner"),mt=0,tt=160,pt="https://api.valantis.store:41000/",vt="Valantis";var O=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function gt(g){return g&&g.__esModule&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g}function yt(g){if(g.__esModule)return g;var t=g.default;if(typeof t=="function"){var o=function u(){return this instanceof u?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};o.prototype=t.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(g).forEach(function(u){var l=Object.getOwnPropertyDescriptor(g,u);Object.defineProperty(o,u,l.get?l:{enumerable:!0,get:function(){return g[u]}})}),o}var ft={exports:{}};function bt(g){throw new Error('Could not dynamically require "'+g+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Q={exports:{}};const _t={},wt=Object.freeze(Object.defineProperty({__proto__:null,default:_t},Symbol.toStringTag,{value:"Module"})),Bt=yt(wt);var lt;function Et(){return lt||(lt=1,function(g,t){(function(o,u){g.exports=u()})(O,function(){var o=o||function(u,l){var d;if(typeof window<"u"&&window.crypto&&(d=window.crypto),typeof self<"u"&&self.crypto&&(d=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(d=globalThis.crypto),!d&&typeof window<"u"&&window.msCrypto&&(d=window.msCrypto),!d&&typeof O<"u"&&O.crypto&&(d=O.crypto),!d&&typeof bt=="function")try{d=Bt}catch{}var b=function(){if(d){if(typeof d.getRandomValues=="function")try{return d.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof d.randomBytes=="function")try{return d.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},E=Object.create||function(){function e(){}return function(c){var f;return e.prototype=c,f=new e,e.prototype=null,f}}(),C={},r=C.lib={},S=r.Base=function(){return{extend:function(e){var c=E(this);return e&&c.mixIn(e),(!c.hasOwnProperty("init")||this.init===c.init)&&(c.init=function(){c.$super.init.apply(this,arguments)}),c.init.prototype=c,c.$super=this,c},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var c in e)e.hasOwnProperty(c)&&(this[c]=e[c]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),y=r.WordArray=S.extend({init:function(e,c){e=this.words=e||[],c!=l?this.sigBytes=c:this.sigBytes=e.length*4},toString:function(e){return(e||L).stringify(this)},concat:function(e){var c=this.words,f=e.words,h=this.sigBytes,v=e.sigBytes;if(this.clamp(),h%4)for(var _=0;_<v;_++){var A=f[_>>>2]>>>24-_%4*8&255;c[h+_>>>2]|=A<<24-(h+_)%4*8}else for(var T=0;T<v;T+=4)c[h+T>>>2]=f[T>>>2];return this.sigBytes+=v,this},clamp:function(){var e=this.words,c=this.sigBytes;e[c>>>2]&=4294967295<<32-c%4*8,e.length=u.ceil(c/4)},clone:function(){var e=S.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var c=[],f=0;f<e;f+=4)c.push(b());return new y.init(c,e)}}),w=C.enc={},L=w.Hex={stringify:function(e){for(var c=e.words,f=e.sigBytes,h=[],v=0;v<f;v++){var _=c[v>>>2]>>>24-v%4*8&255;h.push((_>>>4).toString(16)),h.push((_&15).toString(16))}return h.join("")},parse:function(e){for(var c=e.length,f=[],h=0;h<c;h+=2)f[h>>>3]|=parseInt(e.substr(h,2),16)<<24-h%8*4;return new y.init(f,c/2)}},B=w.Latin1={stringify:function(e){for(var c=e.words,f=e.sigBytes,h=[],v=0;v<f;v++){var _=c[v>>>2]>>>24-v%4*8&255;h.push(String.fromCharCode(_))}return h.join("")},parse:function(e){for(var c=e.length,f=[],h=0;h<c;h++)f[h>>>2]|=(e.charCodeAt(h)&255)<<24-h%4*8;return new y.init(f,c)}},m=w.Utf8={stringify:function(e){try{return decodeURIComponent(escape(B.stringify(e)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(e){return B.parse(unescape(encodeURIComponent(e)))}},p=r.BufferedBlockAlgorithm=S.extend({reset:function(){this._data=new y.init,this._nDataBytes=0},_append:function(e){typeof e=="string"&&(e=m.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(e){var c,f=this._data,h=f.words,v=f.sigBytes,_=this.blockSize,A=_*4,T=v/A;e?T=u.ceil(T):T=u.max((T|0)-this._minBufferSize,0);var M=T*_,R=u.min(M*4,v);if(M){for(var I=0;I<M;I+=_)this._doProcessBlock(h,I);c=h.splice(0,M),f.sigBytes-=R}return new y.init(c,R)},clone:function(){var e=S.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});r.Hasher=p.extend({cfg:S.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){p.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){e&&this._append(e);var c=this._doFinalize();return c},blockSize:16,_createHelper:function(e){return function(c,f){return new e.init(f).finalize(c)}},_createHmacHelper:function(e){return function(c,f){return new P.HMAC.init(e,f).finalize(c)}}});var P=C.algo={};return C}(Math);return o})}(Q)),Q.exports}(function(g,t){(function(o,u){g.exports=u(Et())})(O,function(o){return function(u){var l=o,d=l.lib,b=d.WordArray,E=d.Hasher,C=l.algo,r=[];(function(){for(var m=0;m<64;m++)r[m]=u.abs(u.sin(m+1))*4294967296|0})();var S=C.MD5=E.extend({_doReset:function(){this._hash=new b.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(m,p){for(var P=0;P<16;P++){var e=p+P,c=m[e];m[e]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360}var f=this._hash.words,h=m[p+0],v=m[p+1],_=m[p+2],A=m[p+3],T=m[p+4],M=m[p+5],R=m[p+6],I=m[p+7],V=m[p+8],q=m[p+9],W=m[p+10],G=m[p+11],N=m[p+12],U=m[p+13],k=m[p+14],X=m[p+15],n=f[0],s=f[1],a=f[2],i=f[3];n=y(n,s,a,i,h,7,r[0]),i=y(i,n,s,a,v,12,r[1]),a=y(a,i,n,s,_,17,r[2]),s=y(s,a,i,n,A,22,r[3]),n=y(n,s,a,i,T,7,r[4]),i=y(i,n,s,a,M,12,r[5]),a=y(a,i,n,s,R,17,r[6]),s=y(s,a,i,n,I,22,r[7]),n=y(n,s,a,i,V,7,r[8]),i=y(i,n,s,a,q,12,r[9]),a=y(a,i,n,s,W,17,r[10]),s=y(s,a,i,n,G,22,r[11]),n=y(n,s,a,i,N,7,r[12]),i=y(i,n,s,a,U,12,r[13]),a=y(a,i,n,s,k,17,r[14]),s=y(s,a,i,n,X,22,r[15]),n=w(n,s,a,i,v,5,r[16]),i=w(i,n,s,a,R,9,r[17]),a=w(a,i,n,s,G,14,r[18]),s=w(s,a,i,n,h,20,r[19]),n=w(n,s,a,i,M,5,r[20]),i=w(i,n,s,a,W,9,r[21]),a=w(a,i,n,s,X,14,r[22]),s=w(s,a,i,n,T,20,r[23]),n=w(n,s,a,i,q,5,r[24]),i=w(i,n,s,a,k,9,r[25]),a=w(a,i,n,s,A,14,r[26]),s=w(s,a,i,n,V,20,r[27]),n=w(n,s,a,i,U,5,r[28]),i=w(i,n,s,a,_,9,r[29]),a=w(a,i,n,s,I,14,r[30]),s=w(s,a,i,n,N,20,r[31]),n=L(n,s,a,i,M,4,r[32]),i=L(i,n,s,a,V,11,r[33]),a=L(a,i,n,s,G,16,r[34]),s=L(s,a,i,n,k,23,r[35]),n=L(n,s,a,i,v,4,r[36]),i=L(i,n,s,a,T,11,r[37]),a=L(a,i,n,s,I,16,r[38]),s=L(s,a,i,n,W,23,r[39]),n=L(n,s,a,i,U,4,r[40]),i=L(i,n,s,a,h,11,r[41]),a=L(a,i,n,s,A,16,r[42]),s=L(s,a,i,n,R,23,r[43]),n=L(n,s,a,i,q,4,r[44]),i=L(i,n,s,a,N,11,r[45]),a=L(a,i,n,s,X,16,r[46]),s=L(s,a,i,n,_,23,r[47]),n=B(n,s,a,i,h,6,r[48]),i=B(i,n,s,a,I,10,r[49]),a=B(a,i,n,s,k,15,r[50]),s=B(s,a,i,n,M,21,r[51]),n=B(n,s,a,i,N,6,r[52]),i=B(i,n,s,a,A,10,r[53]),a=B(a,i,n,s,W,15,r[54]),s=B(s,a,i,n,v,21,r[55]),n=B(n,s,a,i,V,6,r[56]),i=B(i,n,s,a,X,10,r[57]),a=B(a,i,n,s,R,15,r[58]),s=B(s,a,i,n,U,21,r[59]),n=B(n,s,a,i,T,6,r[60]),i=B(i,n,s,a,G,10,r[61]),a=B(a,i,n,s,_,15,r[62]),s=B(s,a,i,n,q,21,r[63]),f[0]=f[0]+n|0,f[1]=f[1]+s|0,f[2]=f[2]+a|0,f[3]=f[3]+i|0},_doFinalize:function(){var m=this._data,p=m.words,P=this._nDataBytes*8,e=m.sigBytes*8;p[e>>>5]|=128<<24-e%32;var c=u.floor(P/4294967296),f=P;p[(e+64>>>9<<4)+15]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360,p[(e+64>>>9<<4)+14]=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,m.sigBytes=(p.length+1)*4,this._process();for(var h=this._hash,v=h.words,_=0;_<4;_++){var A=v[_];v[_]=(A<<8|A>>>24)&16711935|(A<<24|A>>>8)&4278255360}return h},clone:function(){var m=E.clone.call(this);return m._hash=this._hash.clone(),m}});function y(m,p,P,e,c,f,h){var v=m+(p&P|~p&e)+c+h;return(v<<f|v>>>32-f)+p}function w(m,p,P,e,c,f,h){var v=m+(p&e|P&~e)+c+h;return(v<<f|v>>>32-f)+p}function L(m,p,P,e,c,f,h){var v=m+(p^P^e)+c+h;return(v<<f|v>>>32-f)+p}function B(m,p,P,e,c,f,h){var v=m+(P^(p|~e))+c+h;return(v<<f|v>>>32-f)+p}l.MD5=E._createHelper(S),l.HmacMD5=E._createHmacHelper(S)}(Math),o.MD5})})(ft);var Lt=ft.exports;const Pt=gt(Lt);let nt=new Date,Tt=nt.getUTCFullYear(),xt=("0"+(nt.getUTCMonth()+1)).slice(-2),Ht=("0"+nt.getUTCDate()).slice(-2),St=Tt+xt+Ht,At=Pt(`${vt}_${St}`).toString();function Dt(g){return g.filter((t,o)=>g.findIndex(u=>u.id===t.id)===o)}function Mt(g,t){let o=[],u={};return g.forEach(l=>{u[l]=(u[l]||0)+1,u[l]===t&&!o.includes(l)&&o.push(l)}),o}class st{static createErrorPageHTML(){let t=`
      <div class="error__container">
        <p class="error__message">
          Произошла ошибка!
        </p>
        <p class="error__message">
          Перезагрузите страницу или... зайдите позже
        </p>
      </div>
      `;document.body.innerHTML=t}render(){st.createErrorPageHTML()}}const ut=new st;class Ct{constructor(){x(this,"connectionAttemps",5);x(this,"connectionDelay",3e3)}async getData(t,o=this.connectionAttemps){let u=t.action==="get_items";try{let l=await fetch(pt,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8","X-Auth":At},body:JSON.stringify(t)});if(l.status===400)throw o=0,new Error(`Getting data has failed. Response Status: ${l.status}`);if(!l.ok)throw new Error(`Getting data has failed. Response Status: ${l.status}`);let{result:d}=await l.json(),b=[];return d&&u?b=Dt(d):b=[...new Set(d)],b}catch(l){return o===0?(ut.render(),console.error(l.message),!1):(console.warn("Retrying to get data..."),await this.timeoutDelay(this.connectionDelay),await this.getData(t,o-1))}}async getProducts(t,o=[]){let u=o.length>0?o:await this.getData(t);if(u){let l={action:"get_items",params:{ids:u}};return await this.getData(l)}else ut.render()}timeoutDelay(t){return new Promise(o=>setTimeout(o,t))}async getBrands(){let t={action:"get_fields",params:{field:"brand"}},o=await this.getData(t);return o?o.filter(l=>l).sort():[]}}const j=new Ct;class It{constructor(){x(this,"products",new Map);x(this,"_brands",[])}async preloadItem(t,o,u){if(u&&u===t)return;let l=t+1;if(!this.products.has(l)){let d={action:"get_ids",params:{offset:l*o,limit:o}},b=await j.getProducts(d);b&&b.length>0&&this.setItem(l,b)}}getItem(t){return this.products.get(t)}setItem(t,o){this.products.has(t)||this.products.set(t,o)}cleanCache(){this.products.clear()}getCacheSize(){return this.products.size}get brands(){return this._brands}set brands(t){this._brands=t}}const D=new It,Ft="/ValantisJW/icons/spinner.svg";class at{static createSpinnerHTML(){let t=`
      <div class="spinner__container">
        <img class="spinner__img" src="${Ft}">
        <p class="spinner__message">Идёт поиск и загрузка данных..... Подождите</p>
      </div>
      `;ct.innerHTML=t}removeSpinner(){ct.innerHTML=""}render(){at.createSpinnerHTML()}}const Y=new at;class it{removeNoDataHTML(){z.lastElementChild.remove()}static createNoDataHTML(){let t=document.createElement("div");t.classList.add("nodata__container");let o=`
        <p class="nodata__message">
          По Вашему запросу данные не найдены!
        </p>
        <p class="nodata__message">
          Измените параметры запроса и повторите поиск.
        </p>
    `;t.innerHTML=o,z.insertAdjacentElement("beforeend",t)}render(){it.createNoDataHTML()}}const Z=new it,H=class H{static createFilterHTML(){let t=`
      <form class="form" name="filter">
        <button type="button" class="form__btn" name="moveBtn" disabled>На Главную</button>
        <div class="form__elem">
          <label for="product">Название</label>
          <input 
            type="text" 
            class="form__input"
            name="product" 
            id="product"
            placeholder="Не менее 5 букв" 
          >
          <button type="button" name="removeValueBtn" class="form__remove-btn">X</button>
        </div>
        <div class="form__elem">
          <label for="price">Цена</label>
          <input 
            type="text"
            class="form__input" 
            name="price" 
            id="price"
            placeholder="Не менее 4 цифр" 
          >
          <button type="button" name="removeValueBtn" class="form__remove-btn">X</button>
        </div>
        <div class="form__elem">
          <select name="brand" class="form__select">
            <option value="noselect" selected>Бренд</option>
            ${$.brands.map(o=>`<option value"${o}">${o}</option>`)}
          </select>
        </div>
        <button type="submit" class="form__btn" name="submitFormBtn" disabled>Показать</button>
        <button type="button" class="form__btn" name="clearFormBtn" disabled>Очистить</button>
      </form>
    `;z.innerHTML=t,this.form=document.forms.filter,this.inputElems=this.form&&Array.from(this.form.elements).filter(o=>o.type==="text"),this.formBtns=this.form&&[this.form.submitFormBtn,this.form.moveBtn,this.form.clearFormBtn]}static initInputEven(){this.form&&this.inputElems.forEach(t=>t.addEventListener("input",o=>{t.value.length>3?(t.classList.remove("incorrect"),this.formBtns.forEach(u=>u.removeAttribute("disabled"))):this.form.brand.value!=="noselect"?this.formBtns.forEach(u=>u.removeAttribute("disabled")):this.inputElems.some(u=>u.value.length>3)?this.formBtns.forEach(u=>u.removeAttribute("disabled")):this.formBtns.forEach(u=>u.setAttribute("disabled",!0))}))}static initSelectEvent(){this.form&&this.form.brand.addEventListener("change",()=>{this.form.brand.value!=="noselect"?this.formBtns.forEach(t=>t.removeAttribute("disabled")):this.inputElems.some(t=>t.value.length>3)?this.formBtns.forEach(t=>t.removeAttribute("disabled")):this.formBtns.forEach(t=>t.setAttribute("disabled",!0))})}static initSubmitFormEvent(){this.form&&this.form.addEventListener("submit",t=>{t.preventDefault();let[o,u,l]=[this.form.product.value.trim(),this.form.price.value.trim(),this.form.brand.value],d=!0;if(o&&!/[а-яёА-ЯЁ]{5,}/g.test(o)&&(H.showFieldError(this.form.product),d=!1),u&&!/^[1-9]+[0-9]{4,}$/.test(u)&&(H.showFieldError(this.form.price),d=!1),!d)return;let b=[];this.inputElems.forEach(E=>{E.value&&b.push({name:E.name,value:E.value})}),l!=="noselect"&&b.push({name:this.form.brand.name,value:l}),b.length>0?(this.getFilteredData(b),this.clearForm(),Y.render(),J.innerHTML="",K.innerHTML=""):Z.render()})}static showFieldError(t){t.classList.add("incorrect"),this.form.submitFormBtn.setAttribute("disabled",!0)}static initRemoveValueBtnEvent(){this.form&&Array.from(this.form.removeValueBtn).forEach(t=>{t.addEventListener("click",()=>{t.previousElementSibling.value="",t.previousElementSibling.classList.remove("incorrect"),this.formBtns.forEach(o=>o.setAttribute("disabled",!0)),this.inputElems.some(o=>o.value.length>3)&&this.formBtns.forEach(o=>o.removeAttribute("disabled")),this.form.brand.value!=="noselect"&&this.formBtns.forEach(o=>o.removeAttribute("disabled"))})})}static clearForm(){this.inputElems.forEach(t=>{t.classList.remove("incorrect"),t.value=""}),this.form.brand.value="noselect",this.formBtns.forEach(t=>t.setAttribute("disabled",!0)),D.cleanCache()}static initClearFormBtn(){this.form&&this.form.clearFormBtn.addEventListener("click",()=>{this.clearForm()})}static initMoveToMainPageEvent(){this.form&&this.form.moveBtn.addEventListener("click",()=>{this.inputElems.forEach(t=>t.value=""),this.form.brand.value="noselect",this.form.submitFormBtn.setAttribute("disabled",!0),D.cleanCache(),$.render()})}static async getFilteredData(t){z.querySelector(".nodata__container")&&Z.removeNoDataHTML();let u=[];t.forEach(r=>{if(r.value){let S={action:"filter",params:{[r.name]:r.name==="price"?+r.value:r.value}};u.push(S)}});let l=u.length>0&&await Promise.all(u.map(r=>j.getData(r))).then(r=>r),d=l.flat(),b=l.length>1?Mt(d,l.length):d,E=[];if(b.length>0)E=await j.getProducts({},b);else{this.form.moveBtn.removeAttribute("disabled"),Z.render(),Y.removeSpinner();return}if(E&&E.length>0){let r=50,S=[];for(let y=0;y<E.length;y+=r)S.push(E.slice(y,y+r));D.cleanCache(),S.forEach((y,w)=>D.setItem(w,y))}let C=D.getCacheSize()-1;$.render(0,C),this.form.moveBtn.removeAttribute("disabled")}render(){H.createFilterHTML(),H.initSubmitFormEvent(),H.initInputEven(),H.initSelectEvent(),H.initRemoveValueBtnEvent(),H.initClearFormBtn(),H.initMoveToMainPageEvent()}};x(H,"form",""),x(H,"inputElems",[]),x(H,"inputValues",[]),x(H,"formBtns",[]);let et=H;const Rt=new et,F=class F{static createArrowBtnsHTML(t){let o=`
      <div class="page__arrows">
        <button class="page__arrow left" ${t===this.startPage?"disabled":""}>&#9001; Назад</button>
        <button class="page__arrow right" ${t===this.endPage?"disabled":""}>Вперед &#9002;</button>
      </div>`;K.innerHTML=o}static initArrowBtnEvent(t){K.querySelectorAll(".page__arrow").forEach(u=>u.addEventListener("click",()=>{let l=0;u.classList.contains("left")?l=t===this.startPage?this.startPage:t-1:l=t===this.endPage?this.endPage:t+1,$.render(l,this.endPage)}))}render(t,o){F.endPage=o??F.endPage,F.createArrowBtnsHTML(t),F.initArrowBtnEvent(t)}};x(F,"startPage",mt),x(F,"endPage",tt-1);let rt=F;const Ot=new rt;class ot{constructor(){x(this,"products",[]);x(this,"brands",[]);x(this,"currentPage",0);x(this,"productsPerPage",50)}static createCatalogHTML(t){J.scrollTo(0,0);let o="";t.forEach(({id:l,product:d,brand:b,price:E})=>{o+=`
        <li class="product__item">
          <span class="product__id">id: ${l}</span>
          <span class="product__title">${d}</span>
          <span class=${b?"product__brand":""}>${b||""}</span>
          <span class="product__price">${E.toLocaleString()} ₽</span>
        </li>
        `});let u=`<ul class="catalog__container">${o}</ul>`;J.innerHTML=u}removeContentHTML(){J.innerHTML="",z.innerHTML="",K.innerHTML=""}async render(t=this.currentPage,o=tt-1){Y.render(),this.removeContentHTML(),this.currentPage=t;let u={action:"get_ids",params:{offset:this.currentPage*this.productsPerPage,limit:this.productsPerPage}},l=D.getItem(this.currentPage)?D.getItem(this.currentPage):await j.getProducts(u),d=D.brands.length>0?D.brands:await j.getBrands();l&&(Y.removeSpinner(),this.products=l,D.setItem(this.currentPage,this.products),this.brands=d,D.brands=this.brands,o===tt-1&&D.preloadItem(this.currentPage,this.productsPerPage,o),ot.createCatalogHTML(this.products),Rt.render(),Ot.render(this.currentPage,o))}}const $=new ot;class $t{async render(){await $.render()}}const zt=new $t;document.addEventListener("DOMContentLoaded",async()=>await zt.render());