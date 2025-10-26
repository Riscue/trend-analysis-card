/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$2=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;let n$4 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$4("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$4,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$4(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t$2.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$3="?"+h,n$2=`<${o$3}>`,r$3=document,l=()=>r$3.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$3.createTreeWalker(r$3,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$3)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$3.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$3).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$3,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$3.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{ void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$2=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n$1(t){return (e,o)=>"object"==typeof o?r$2(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$1(r){return n$1({...r,state:true,attribute:false})}

function o(e,t,s,r){var o,i=arguments.length,n=i<3?t:r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,r);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(n=(i<3?o(n):i>3?o(t,s,n):o(t,s))||n);return i>3&&n&&Object.defineProperty(t,s,n),n}"function"==typeof SuppressedError&&SuppressedError;class i extends i$1{constructor(){super(...arguments),this.template="",this.variables={},this.value=null,this.unsubscribePromise=null;}connectedCallback(){super.connectedCallback(),this.hass?this.unsubscribePromise||this.template&&(this.unsubscribePromise=this.hass.connection.subscribeMessage((e=>{this.value=e.result;}),{type:"render_template",template:this.template,variables:this.variables})):console.warn("hass object is not provided");}async disconnectedCallback(){if(super.disconnectedCallback(),this.unsubscribePromise)try{const e=await this.unsubscribePromise;return this.unsubscribePromise=null,e()}catch(e){if("not_found"!==e.code)throw e}}render(){var e;return null!==(e=this.value)&&void 0!==e?e:E}}function n(e="ha-template"){customElements.get(e)||customElements.define(e,i);}o([n$1()],i.prototype,"hass",void 0),o([n$1()],i.prototype,"template",void 0),o([n$1()],i.prototype,"variables",void 0),o([n$1()],i.prototype,"value",void 0),o([r$1()],i.prototype,"unsubscribePromise",void 0);

var common$2 = {
	name: "Trend-Analyse",
	name_entity: "{{entity_name}} Trend",
	no_data: "Keine Daten!",
	preset_1_hour: "1 Stunde",
	preset_12_hour: "12 Stunden",
	preset_24_hour: "24 Stunden",
	preset_7_day: "7 Tage",
	preset_30_day: "30 Tage",
	search_placeholder: "Sensor suchen...",
	beginning: "Start",
	end: "Ende",
	total_increase: "Gesamtzunahme",
	total_decrease: "Gesamtabnahme",
	delta: "Netto-Änderung"
};
var error$2 = {
	influxdb: "InfluxDB ist nicht verfügbar. Bitte überprüfen Sie die Installationshinweise"
};
var de = {
	common: common$2,
	error: error$2
};

var de$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$2,
    default: de,
    error: error$2
});

var common$1 = {
	name: "Trend Analysis",
	name_entity: "{{entity_name}} Trend",
	no_data: "No data!",
	preset_1_hour: "1 Hour",
	preset_12_hour: "12 Hours",
	preset_24_hour: "24 Hours",
	preset_7_day: "7 Day",
	preset_30_day: "30 Days",
	search_placeholder: "Search sensor...",
	beginning: "Beginning",
	end: "End",
	total_increase: "Total Increase",
	total_decrease: "Total Decrease",
	delta: "Net Change"
};
var error$1 = {
	influxdb: "InfluxDB is unavailable. Please review the installation notes"
};
var en = {
	common: common$1,
	error: error$1
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$1,
    default: en,
    error: error$1
});

var common = {
	name: "Trend Analizi",
	name_entity: "{{entity_name}} Değişimi",
	no_data: "Veri yok!",
	preset_1_hour: "1 Saat",
	preset_12_hour: "12 Saat",
	preset_24_hour: "24 Saat",
	preset_7_day: "7 Gün",
	preset_30_day: "30 Gün",
	search_placeholder: "Sensör ara...",
	beginning: "Başlangıç",
	end: "Bitiş",
	total_increase: "Toplam Artış",
	total_decrease: "Toplam Düşüş",
	delta: "Net Değişim"
};
var error = {
	influxdb: "InfluxDB kullanılamıyor. Lütfen kurulum notlarını inceleyin"
};
var tr = {
	common: common,
	error: error
};

var tr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common,
    default: tr,
    error: error
});

// Borrowed from:
// https://github.com/custom-cards/boilerplate-card/blob/master/src/localize/localize.ts
const FALLBACK_LANGUAGE = 'en';
const lang = (localStorage.getItem('selectedLanguage') || FALLBACK_LANGUAGE).replace(/['"]+/g, '').replace('-', '_');
const languages = {
    de: de$1,
    en: en$1,
    tr: tr$1,
};
function localize(string, replacements = {}) {
    let translated;
    try {
        translated = string.split('.').reduce((o, i) => o[i] || string, languages[lang]);
    }
    catch (e) {
        translated = string.split('.').reduce((o, i) => o[i] || string, languages[FALLBACK_LANGUAGE]);
    }
    if (translated === undefined)
        translated = string.split('.').reduce((o, i) => o[i] || string, languages[FALLBACK_LANGUAGE]);
    if (translated === undefined)
        translated = `${lang}.${string}`;
    Object.entries(replacements).forEach(([key, value]) => {
        if (key !== undefined && value !== undefined) {
            translated = translated.replace(`{{${key}}}`, value);
        }
    });
    return translated;
}

var t,r;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none";}(t||(t={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24";}(r||(r={}));var ne=function(e,t,r,n){n=n||{},r=null==r?{}:r;var i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=r,e.dispatchEvent(i),i};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = i$4`:host {
    display: block;
}

ha-card {
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

ha-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.header {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--divider-color);
}

.header h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
    letter-spacing: 0.15px;
}

.cursor-pointer {
    cursor: pointer;
    transition: color 0.2s ease;
}

.cursor-pointer:hover {
    color: var(--primary-color);
}

.card {
    padding: 0;
}

.preset-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background: var(--primary-color);
    color: white;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-transform: none;
    letter-spacing: 0.25px;
}

.preset-btn:hover {
    background: var(--primary-color);
    filter: brightness(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
}

.preset-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preset-btn.active {
    background: var(--primary-color);
    filter: brightness(1.2);
    box-shadow: 0 4px 12px rgba(var(--rgb-primary-color), 0.4);
    transform: scale(1.05);
}

.date-input-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    gap: 12px;
    margin-top: 12px;
}

.date-input-wrapper {
    position: relative;
}

.date-input-wrapper label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--secondary-text-color);
    letter-spacing: 0.4px;
    text-transform: uppercase;
}

input[type="datetime-local"] {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

input[type="datetime-local"]:hover {
    border-color: var(--primary-color);
}

input[type="datetime-local"]:focus {
    outline: none;
    border-color: var(--primary-color);
    border-width: 2px;
    padding: 11px 13px;
    box-shadow: 0 0 0 3px rgba(var(--rgb-primary-color), 0.1);
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--divider-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.results-container {
    padding: 16px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.05));
    border-radius: 8px;
}

.results-container > div {
    padding: 10px 0;
    font-size: 15px;
    line-height: 1.6;
    border-bottom: 1px solid var(--divider-color);
}

.results-container > div:last-child {
    border-bottom: none;
}

.trend-up {
    color: var(--success-color, #4caf50);
    font-weight: 500;
}

.trend-down {
    color: var(--error-color, #f44336);
    font-weight: 500;
}

.trend-neutral {
    color: var(--warning-color, #ff9800);
    font-weight: 500;
}

@media (max-width: 600px) {
    .date-input-container {
        grid-template-columns: 1fr;
    }

    .preset-btn {
        font-size: 12px;
        padding: 7px 14px;
    }

    .header h1 {
        font-size: 18px;
    }
}

@media (prefers-color-scheme: dark) {
    ha-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    ha-card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    input[type="datetime-local"] {
        background: rgba(255, 255, 255, 0.05);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.results-container {
    animation: fadeIn 0.3s ease;
}
`;
styleInject(css_248z);

n();
const PKG_VERSION = 'DEVELOPMENT';
console.info(`%cTREND-ANALYSIS-CARD %c${PKG_VERSION}`, "padding: 2px 0px 2px 8px; font-weight: bold; background-color: gray; color: white;", "padding: 2px 8px 2px 0px; font-weight: bold; background-color: gray; color: turquoise;");
let TrendAnalysisCard = class TrendAnalysisCard extends i$1 {
    constructor() {
        super(...arguments);
        this._range = { start: null, end: null };
        this._loading = true;
        this._activePreset = 24;
        this._showEntityPicker = false;
    }
    static get styles() {
        return css_248z;
    }
    setConfig(config) {
        this._config = config;
        this._activePreset = this._config.preset || 24;
    }
    set hass(hass) {
        this._hass = hass;
    }
    firstUpdated() {
        this._setPreset(this._config.preset || 24);
    }
    async fetchHistory(start, end) {
        const entity = this._config.entity;
        if (!entity)
            return [];
        const resp = await this._hass.callApi("GET", `history/period/${start}?filter_entity_id=${entity}&end_time=${end}`);
        if (!resp.length)
            return [];
        return resp[0]
            .map((i) => ({ t: new Date(i.last_changed), v: parseFloat(i.state) }))
            .filter((p) => !isNaN(p.v));
    }
    async fetchInfluxdb(start, end) {
        const entity = this._config.entity;
        if (!entity)
            return [];
        try {
            const resp = await this._hass.callApi("GET", `influxdb_query_api/query/${entity}?start=${start}&end=${end}`);
            if (!resp || !Array.isArray(resp) || !resp.length)
                return [];
            return resp
                .map((i) => ({ t: new Date(i.time), v: parseFloat(i.value) }))
                .filter((p) => !isNaN(p.v));
        }
        catch (e) {
            console.error("Influxdb fetch failed:", e);
            throw new Error("error.influxdb");
        }
    }
    async calculate() {
        if (!this._range.start || !this._range.end)
            return;
        this._loading = true;
        this._result = undefined;
        try {
            const start = new Date(this._range.start).toISOString();
            const end = new Date(this._range.end).toISOString();
            const data = this._config.source === 'influxdb' ?
                await this.fetchInfluxdb(start, end) :
                await this.fetchHistory(start, end);
            let increase = 0;
            let decrease = 0;
            if (data.length >= 2) {
                for (let i = 1; i < data.length; i++) {
                    const diff = data[i].v - data[i - 1].v;
                    if (diff > 0)
                        increase += diff;
                    else
                        decrease += Math.abs(diff);
                }
            }
            if (data.length != 0) {
                const netChange = data[data.length - 1].v - data[0].v;
                this._result = {
                    start: data[0].v.toFixed(2),
                    end: data[data.length - 1].v.toFixed(2),
                    increase: increase.toFixed(2),
                    decrease: decrease.toFixed(2),
                    delta: netChange.toFixed(2),
                    trend: netChange > 0 ? "up" : netChange < 0 ? "down" : "neutral",
                };
            }
            else {
                this._result = 'common.no_data';
            }
        }
        catch (e) {
            this._result = e.message;
        }
        this._loading = false;
    }
    _showMoreInfo() {
        var _a;
        if (!((_a = this._config) === null || _a === void 0 ? void 0 : _a.entity))
            return;
        ne(this, "hass-more-info", { entityId: this._config.entity });
    }
    _formatDateTimeLocal(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    _onStartDateChange(ev) {
        const input = ev.target;
        if (input.value) {
            this._range = Object.assign(Object.assign({}, this._range), { start: new Date(input.value) });
            this._activePreset = null;
            this.calculate();
        }
    }
    _onEndDateChange(ev) {
        const input = ev.target;
        if (input.value) {
            this._range = Object.assign(Object.assign({}, this._range), { end: new Date(input.value) });
            this._activePreset = null;
            this.calculate();
        }
    }
    _setPreset(hours) {
        const now = new Date();
        const start = new Date(now.getTime() - hours * 60 * 60 * 1000);
        this._range = { start, end: now };
        this._activePreset = hours;
        this.calculate();
    }
    _toggleEntityPicker() {
        this._showEntityPicker = !this._showEntityPicker;
    }
    _selectEntity(entityId) {
        this._config = Object.assign(Object.assign({}, this._config), { entity: entityId });
        this._showEntityPicker = false;
        this._setPreset(this._config.preset || 24);
    }
    _getNumericEntities() {
        return Object.keys(this._hass.states)
            .filter(entityId => {
            const state = this._hass.states[entityId];
            const stateValue = parseFloat(state.state);
            return !isNaN(stateValue) && state.state !== 'unknown' && state.state !== 'unavailable';
        })
            .sort();
    }
    render() {
        var _a, _b, _c;
        const r = this._result;
        const entityState = this._hass.states[this._config.entity];
        const unit = ((_a = entityState === null || entityState === void 0 ? void 0 : entityState.attributes) === null || _a === void 0 ? void 0 : _a.unit_of_measurement) || '';
        const configHeader = (_b = this._config) === null || _b === void 0 ? void 0 : _b.header;
        const entityFriendlyName = (_c = entityState === null || entityState === void 0 ? void 0 : entityState.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name;
        let header = localize('common.name');
        if (configHeader) {
            header = configHeader;
        }
        else if (entityFriendlyName) {
            header = localize('common.name_entity', { entity_name: entityFriendlyName });
        }
        return x `
            <ha-card>
                <div class="header" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
                    <h1 class="cursor-pointer" @click="${() => this._showMoreInfo()}">
                        ${header}
                    </h1>
                    ${this._config.showSettings !== false || !entityState ? x `
                        <ha-icon icon="mdi:cog" class="cursor-pointer" style="padding: 4px;"
                                 @click="${() => this._toggleEntityPicker()}"></ha-icon>
                    ` : ''}
                    ${this._showEntityPicker ? x `
                        <div class="entity-picker-dropdown">
                            <input
                                    type="text"
                                    placeholder="${localize('common.search_placeholder')}"
                                    class="entity-search"
                                    @input=${(e) => {
            var _a;
            const input = e.target;
            const items = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.entity-item');
            items === null || items === void 0 ? void 0 : items.forEach((item) => {
                var _a;
                const text = ((_a = item.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
                const searchTerm = input.value.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        }}
                            />
                            <div class="entity-list">
                                ${this._getNumericEntities().map(entityId => {
            const state = this._hass.states[entityId];
            return x `
                                        <div
                                                class="entity-item ${this._config.entity === entityId ? 'selected' : ''}"
                                                @click=${() => this._selectEntity(entityId)}
                                        >
                                            <div class="entity-name">${state.attributes.friendly_name || entityId}</div>
                                            <div class="entity-id">${entityId}</div>
                                        </div>
                                    `;
        })}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="card">
                    <div style="margin-top: 0.5rem;">
                        ${this._config.showPresets !== false ? x `
                            <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
                                <button @click=${() => this._setPreset(1)}
                                        class="preset-btn ${this._activePreset === 1 ? 'active' : ''}">
                                    ${localize('common.preset_1_hour')}
                                </button>
                                <button @click=${() => this._setPreset(12)}
                                        class="preset-btn ${this._activePreset === 12 ? 'active' : ''}">
                                    ${localize('common.preset_12_hour')}
                                </button>
                                <button @click=${() => this._setPreset(24)}
                                        class="preset-btn ${this._activePreset === 24 ? 'active' : ''}">
                                    ${localize('common.preset_24_hour')}
                                </button>
                                <button @click=${() => this._setPreset(168)}
                                        class="preset-btn ${this._activePreset === 168 ? 'active' : ''}">
                                    ${localize('common.preset_7_day')}
                                </button>
                                <button @click=${() => this._setPreset(720)}
                                        class="preset-btn ${this._activePreset === 720 ? 'active' : ''}">
                                    ${localize('common.preset_30_day')}
                                </button>
                            </div>
                        ` : ''}
                        ${this._config.showDatePickers !== false ? x `
                            <div class="date-input-container">
                                <div class="date-input-wrapper">
                                    <label>${localize('common.beginning')}</label>
                                    <input
                                            type="datetime-local"
                                            .value=${this._range.start ? this._formatDateTimeLocal(this._range.start) : ''}
                                            @change=${this._onStartDateChange}
                                    />
                                </div>
                                <div class="date-input-wrapper">
                                    <label>${localize('common.end')}</label>
                                    <input
                                            type="datetime-local"
                                            .value=${this._range.end ? this._formatDateTimeLocal(this._range.end) : ''}
                                            @change=${this._onEndDateChange}
                                    />
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    ${this._loading
            ? x `
                                <div class="loading">
                                    <div class="spinner"></div>
                                </div>`
            : x `
                                <div class="results-container">
                                    ${!r
                ? x ``
                : typeof r === "string"
                    ? r === "error.influxdb"
                        ? x `
                                                                <div>${localize(r)}</div>
                                                                <a href="https://github.com/Riscue/ha-influxdb-query-api"
                                                                   target="_blank">https://github.com/Riscue/ha-influxdb-query-api</a>`
                        : x `
                                                                <div>${localize(r)}</div>`
                    : x `
                                                        <div>${localize('common.beginning')}: ${r.start} ${unit}</div>
                                                        <div>${localize('common.end')}: ${r.end} ${unit}</div>
                                                        <div class="trend-up">🔺 ${localize('common.total_increase')}:
                                                            ${r.increase} ${unit}
                                                        </div>
                                                        <div class="trend-down">🔻 ${localize('common.total_decrease')}:
                                                            ${r.decrease} ${unit}
                                                        </div>
                                                        <div class=${r.trend === "up" ? "trend-up" : r.trend === "down" ? "trend-down" : "trend-neutral"}>
                                                            ${r.trend === "up" ? "📈" : r.trend === "down" ? "📉" : "➖"}
                                                            ${localize('common.delta')}: ${r.delta} ${unit}
                                                        </div>`}
                                </div>`}
                </div>
            </ha-card>
        `;
    }
};
__decorate([
    n$1({ attribute: false })
], TrendAnalysisCard.prototype, "_hass", void 0);
__decorate([
    r$1()
], TrendAnalysisCard.prototype, "_config", void 0);
__decorate([
    r$1()
], TrendAnalysisCard.prototype, "_result", void 0);
__decorate([
    r$1()
], TrendAnalysisCard.prototype, "_range", void 0);
__decorate([
    r$1()
], TrendAnalysisCard.prototype, "_loading", void 0);
__decorate([
    r$1()
], TrendAnalysisCard.prototype, "_activePreset", void 0);
__decorate([
    r$1()
], TrendAnalysisCard.prototype, "_showEntityPicker", void 0);
TrendAnalysisCard = __decorate([
    t$1('trend-analysis-card')
], TrendAnalysisCard);
window.customCards = window.customCards || [];
window.customCards.push({
    preview: true,
    type: 'trend-analysis-card',
    name: localize('common.name'),
    description: localize('common.description')
});

export { TrendAnalysisCard };
