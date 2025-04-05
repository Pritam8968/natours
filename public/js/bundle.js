(function(){"use strict";function de(e,t){return function(){return e.apply(t,arguments)}}const{toString:rt}=Object.prototype,{getPrototypeOf:ee}=Object,v=(e=>t=>{const n=rt.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),C=e=>(e=e.toLowerCase(),t=>v(t)===e),$=e=>t=>typeof t===e,{isArray:D}=Array,j=$("undefined");function st(e){return e!==null&&!j(e)&&e.constructor!==null&&!j(e.constructor)&&x(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const pe=C("ArrayBuffer");function ot(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&pe(e.buffer),t}const it=$("string"),x=$("function"),me=$("number"),z=e=>e!==null&&typeof e=="object",at=e=>e===!0||e===!1,J=e=>{if(v(e)!=="object")return!1;const t=ee(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},ct=C("Date"),lt=C("File"),ut=C("Blob"),ft=C("FileList"),dt=e=>z(e)&&x(e.pipe),pt=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||x(e.append)&&((t=v(e))==="formdata"||t==="object"&&x(e.toString)&&e.toString()==="[object FormData]"))},mt=C("URLSearchParams"),[ht,yt,wt,bt]=["ReadableStream","Request","Response","Headers"].map(C),Et=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function I(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,s;if(typeof e!="object"&&(e=[e]),D(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let c;for(r=0;r<i;r++)c=o[r],t.call(null,e[c],c,e)}}function he(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const B=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ye=e=>!j(e)&&e!==B;function te(){const{caseless:e}=ye(this)&&this||{},t={},n=(r,s)=>{const o=e&&he(t,s)||s;J(t[o])&&J(r)?t[o]=te(t[o],r):J(r)?t[o]=te({},r):D(r)?t[o]=r.slice():t[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&I(arguments[r],n);return t}const gt=(e,t,n,{allOwnKeys:r}={})=>(I(t,(s,o)=>{n&&x(s)?e[o]=de(s,n):e[o]=s},{allOwnKeys:r}),e),St=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Rt=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Tt=(e,t,n,r)=>{let s,o,i;const c={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!r||r(i,e,t))&&!c[i]&&(t[i]=e[i],c[i]=!0);e=n!==!1&&ee(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ot=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},At=e=>{if(!e)return null;if(D(e))return e;let t=e.length;if(!me(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},xt=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&ee(Uint8Array)),Ct=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=r.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},Nt=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Pt=C("HTMLFormElement"),Lt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),we=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),Bt=C("RegExp"),be=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};I(n,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(r[o]=i||s)}),Object.defineProperties(e,r)},Ft=e=>{be(e,(t,n)=>{if(x(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(x(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},_t=(e,t)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return D(e)?r(e):r(String(e).split(t)),n},Ut=()=>{},Dt=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function kt(e){return!!(e&&x(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const qt=e=>{const t=new Array(10),n=(r,s)=>{if(z(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[s]=r;const o=D(r)?[]:{};return I(r,(i,c)=>{const f=n(i,s+1);!j(f)&&(o[c]=f)}),t[s]=void 0,o}}return r};return n(e,0)},jt=C("AsyncFunction"),It=e=>e&&(z(e)||x(e))&&x(e.then)&&x(e.catch),Ee=((e,t)=>e?setImmediate:t?((n,r)=>(B.addEventListener("message",({source:s,data:o})=>{s===B&&o===n&&r.length&&r.shift()()},!1),s=>{r.push(s),B.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",x(B.postMessage)),Ht=typeof queueMicrotask<"u"?queueMicrotask.bind(B):typeof process<"u"&&process.nextTick||Ee,a={isArray:D,isArrayBuffer:pe,isBuffer:st,isFormData:pt,isArrayBufferView:ot,isString:it,isNumber:me,isBoolean:at,isObject:z,isPlainObject:J,isReadableStream:ht,isRequest:yt,isResponse:wt,isHeaders:bt,isUndefined:j,isDate:ct,isFile:lt,isBlob:ut,isRegExp:Bt,isFunction:x,isStream:dt,isURLSearchParams:mt,isTypedArray:xt,isFileList:ft,forEach:I,merge:te,extend:gt,trim:Et,stripBOM:St,inherits:Rt,toFlatObject:Tt,kindOf:v,kindOfTest:C,endsWith:Ot,toArray:At,forEachEntry:Ct,matchAll:Nt,isHTMLForm:Pt,hasOwnProperty:we,hasOwnProp:we,reduceDescriptors:be,freezeMethods:Ft,toObjectSet:_t,toCamelCase:Lt,noop:Ut,toFiniteNumber:Dt,findKey:he,global:B,isContextDefined:ye,isSpecCompliantForm:kt,toJSONObject:qt,isAsyncFn:jt,isThenable:It,setImmediate:Ee,asap:Ht};function h(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s,this.status=s.status?s.status:null)}a.inherits(h,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.status}}});const ge=h.prototype,Se={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{Se[e]={value:e}}),Object.defineProperties(h,Se),Object.defineProperty(ge,"isAxiosError",{value:!0}),h.from=(e,t,n,r,s,o)=>{const i=Object.create(ge);return a.toFlatObject(e,i,function(f){return f!==Error.prototype},c=>c!=="isAxiosError"),h.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};const Mt=null;function ne(e){return a.isPlainObject(e)||a.isArray(e)}function Re(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function Te(e,t,n){return e?e.concat(t).map(function(s,o){return s=Re(s),!n&&o?"["+s+"]":s}).join(n?".":""):t}function vt(e){return a.isArray(e)&&!e.some(ne)}const $t=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function V(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,m){return!a.isUndefined(m[y])});const r=n.metaTokens,s=n.visitor||u,o=n.dots,i=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function l(p){if(p===null)return"";if(a.isDate(p))return p.toISOString();if(!f&&a.isBlob(p))throw new h("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(p)||a.isTypedArray(p)?f&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function u(p,y,m){let E=p;if(p&&!m&&typeof p=="object"){if(a.endsWith(y,"{}"))y=r?y:y.slice(0,-2),p=JSON.stringify(p);else if(a.isArray(p)&&vt(p)||(a.isFileList(p)||a.endsWith(y,"[]"))&&(E=a.toArray(p)))return y=Re(y),E.forEach(function(R,P){!(a.isUndefined(R)||R===null)&&t.append(i===!0?Te([y],P,o):i===null?y:y+"[]",l(R))}),!1}return ne(p)?!0:(t.append(Te(m,y,o),l(p)),!1)}const d=[],w=Object.assign($t,{defaultVisitor:u,convertValue:l,isVisitable:ne});function g(p,y){if(!a.isUndefined(p)){if(d.indexOf(p)!==-1)throw Error("Circular reference detected in "+y.join("."));d.push(p),a.forEach(p,function(E,S){(!(a.isUndefined(E)||E===null)&&s.call(t,E,a.isString(S)?S.trim():S,y,w))===!0&&g(E,y?y.concat(S):[S])}),d.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return g(e),t}function Oe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function re(e,t){this._pairs=[],e&&V(e,this,t)}const Ae=re.prototype;Ae.append=function(t,n){this._pairs.push([t,n])},Ae.toString=function(t){const n=t?function(r){return t.call(this,r,Oe)}:Oe;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function zt(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function xe(e,t,n){if(!t)return e;const r=n&&n.encode||zt;a.isFunction(n)&&(n={serialize:n});const s=n&&n.serialize;let o;if(s?o=s(t,n):o=a.isURLSearchParams(t)?t.toString():new re(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class Ce{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Ne={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Jt={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<"u"?URLSearchParams:re,FormData:typeof FormData<"u"?FormData:null,Blob:typeof Blob<"u"?Blob:null},protocols:["http","https","file","blob","url","data"]},se=typeof window<"u"&&typeof document<"u",oe=typeof navigator=="object"&&navigator||void 0,Vt=se&&(!oe||["ReactNative","NativeScript","NS"].indexOf(oe.product)<0),Wt=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Kt=se&&window.location.href||"http://localhost",T={...Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:se,hasStandardBrowserEnv:Vt,hasStandardBrowserWebWorkerEnv:Wt,navigator:oe,origin:Kt},Symbol.toStringTag,{value:"Module"})),...Jt};function Xt(e,t){return V(e,new T.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return T.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function Gt(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function Zt(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}function Pe(e){function t(n,r,s,o){let i=n[o++];if(i==="__proto__")return!0;const c=Number.isFinite(+i),f=o>=n.length;return i=!i&&a.isArray(s)?s.length:i,f?(a.hasOwnProp(s,i)?s[i]=[s[i],r]:s[i]=r,!c):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],o)&&a.isArray(s[i])&&(s[i]=Zt(s[i])),!c)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,s)=>{t(Gt(r),s,n,0)}),n}return null}function Qt(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const H={transitional:Ne,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s?JSON.stringify(Pe(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t)||a.isReadableStream(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return Xt(t,this.formSerializer).toString();if((c=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return V(c?{"files[]":t}:t,f&&new f,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),Qt(t)):t}],transformResponse:[function(t){const n=this.transitional||H.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(a.isResponse(t)||a.isReadableStream(t))return t;if(t&&a.isString(t)&&(r&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(c){if(i)throw c.name==="SyntaxError"?h.from(c,h.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:T.classes.FormData,Blob:T.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{H.headers[e]={}});const Yt=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),en=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&Yt[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Le=Symbol("internals");function M(e){return e&&String(e).trim().toLowerCase()}function W(e){return e===!1||e==null?e:a.isArray(e)?e.map(W):String(e)}function tn(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const nn=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ie(e,t,n,r,s){if(a.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function rn(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function sn(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,o,i){return this[r].call(this,t,s,o,i)},configurable:!0})})}let O=class{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function o(c,f,l){const u=M(f);if(!u)throw new Error("header name must be a non-empty string");const d=a.findKey(s,u);(!d||s[d]===void 0||l===!0||l===void 0&&s[d]!==!1)&&(s[d||f]=W(c))}const i=(c,f)=>a.forEach(c,(l,u)=>o(l,u,f));if(a.isPlainObject(t)||t instanceof this.constructor)i(t,n);else if(a.isString(t)&&(t=t.trim())&&!nn(t))i(en(t),n);else if(a.isHeaders(t))for(const[c,f]of t.entries())o(f,c,r);else t!=null&&o(n,t,r);return this}get(t,n){if(t=M(t),t){const r=a.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return tn(s);if(a.isFunction(n))return n.call(this,s,r);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=M(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||ie(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function o(i){if(i=M(i),i){const c=a.findKey(r,i);c&&(!n||ie(r,r[c],c,n))&&(delete r[c],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!t||ie(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const n=this,r={};return a.forEach(this,(s,o)=>{const i=a.findKey(r,o);if(i){n[i]=W(s),delete n[o];return}const c=t?rn(o):String(o).trim();c!==o&&delete n[o],n[c]=W(s),r[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[Le]=this[Le]={accessors:{}}).accessors,s=this.prototype;function o(i){const c=M(i);r[c]||(sn(s,i),r[c]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}};O.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),a.reduceDescriptors(O.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}}),a.freezeMethods(O);function ae(e,t){const n=this||H,r=t||n,s=O.from(r.headers);let o=r.data;return a.forEach(e,function(c){o=c.call(n,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Be(e){return!!(e&&e.__CANCEL__)}function k(e,t,n){h.call(this,e??"canceled",h.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(k,h,{__CANCEL__:!0});function Fe(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new h("Request failed with status code "+n.status,[h.ERR_BAD_REQUEST,h.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function on(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function an(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(f){const l=Date.now(),u=r[o];i||(i=l),n[s]=f,r[s]=l;let d=o,w=0;for(;d!==s;)w+=n[d++],d=d%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),l-i<t)return;const g=u&&l-u;return g?Math.round(w*1e3/g):void 0}}function cn(e,t){let n=0,r=1e3/t,s,o;const i=(l,u=Date.now())=>{n=u,s=null,o&&(clearTimeout(o),o=null),e.apply(null,l)};return[(...l)=>{const u=Date.now(),d=u-n;d>=r?i(l,u):(s=l,o||(o=setTimeout(()=>{o=null,i(s)},r-d)))},()=>s&&i(s)]}const K=(e,t,n=3)=>{let r=0;const s=an(50,250);return cn(o=>{const i=o.loaded,c=o.lengthComputable?o.total:void 0,f=i-r,l=s(f),u=i<=c;r=i;const d={loaded:i,total:c,progress:c?i/c:void 0,bytes:f,rate:l||void 0,estimated:l&&c&&u?(c-i)/l:void 0,event:o,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(d)},n)},_e=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Ue=e=>(...t)=>a.asap(()=>e(...t)),ln=T.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,T.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(T.origin),T.navigator&&/(msie|trident)/i.test(T.navigator.userAgent)):()=>!0,un=T.hasStandardBrowserEnv?{write(e,t,n,r,s,o){const i=[e+"="+encodeURIComponent(t)];a.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),a.isString(r)&&i.push("path="+r),a.isString(s)&&i.push("domain="+s),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function fn(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function dn(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function De(e,t,n){let r=!fn(t);return e&&(r||n==!1)?dn(e,t):t}const ke=e=>e instanceof O?{...e}:e;function F(e,t){t=t||{};const n={};function r(l,u,d,w){return a.isPlainObject(l)&&a.isPlainObject(u)?a.merge.call({caseless:w},l,u):a.isPlainObject(u)?a.merge({},u):a.isArray(u)?u.slice():u}function s(l,u,d,w){if(a.isUndefined(u)){if(!a.isUndefined(l))return r(void 0,l,d,w)}else return r(l,u,d,w)}function o(l,u){if(!a.isUndefined(u))return r(void 0,u)}function i(l,u){if(a.isUndefined(u)){if(!a.isUndefined(l))return r(void 0,l)}else return r(void 0,u)}function c(l,u,d){if(d in t)return r(l,u);if(d in e)return r(void 0,l)}const f={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c,headers:(l,u,d)=>s(ke(l),ke(u),d,!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(u){const d=f[u]||s,w=d(e[u],t[u],u);a.isUndefined(w)&&d!==c||(n[u]=w)}),n}const qe=e=>{const t=F({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:s,xsrfCookieName:o,headers:i,auth:c}=t;t.headers=i=O.from(i),t.url=xe(De(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),c&&i.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):"")));let f;if(a.isFormData(n)){if(T.hasStandardBrowserEnv||T.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if((f=i.getContentType())!==!1){const[l,...u]=f?f.split(";").map(d=>d.trim()).filter(Boolean):[];i.setContentType([l||"multipart/form-data",...u].join("; "))}}if(T.hasStandardBrowserEnv&&(r&&a.isFunction(r)&&(r=r(t)),r||r!==!1&&ln(t.url))){const l=s&&o&&un.read(o);l&&i.set(s,l)}return t},pn=typeof XMLHttpRequest<"u"&&function(e){return new Promise(function(n,r){const s=qe(e);let o=s.data;const i=O.from(s.headers).normalize();let{responseType:c,onUploadProgress:f,onDownloadProgress:l}=s,u,d,w,g,p;function y(){g&&g(),p&&p(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(s.method.toUpperCase(),s.url,!0),m.timeout=s.timeout;function E(){if(!m)return;const R=O.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),A={data:!c||c==="text"||c==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:R,config:e,request:m};Fe(function(U){n(U),y()},function(U){r(U),y()},A),m=null}"onloadend"in m?m.onloadend=E:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(E)},m.onabort=function(){m&&(r(new h("Request aborted",h.ECONNABORTED,e,m)),m=null)},m.onerror=function(){r(new h("Network Error",h.ERR_NETWORK,e,m)),m=null},m.ontimeout=function(){let P=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const A=s.transitional||Ne;s.timeoutErrorMessage&&(P=s.timeoutErrorMessage),r(new h(P,A.clarifyTimeoutError?h.ETIMEDOUT:h.ECONNABORTED,e,m)),m=null},o===void 0&&i.setContentType(null),"setRequestHeader"in m&&a.forEach(i.toJSON(),function(P,A){m.setRequestHeader(A,P)}),a.isUndefined(s.withCredentials)||(m.withCredentials=!!s.withCredentials),c&&c!=="json"&&(m.responseType=s.responseType),l&&([w,p]=K(l,!0),m.addEventListener("progress",w)),f&&m.upload&&([d,g]=K(f),m.upload.addEventListener("progress",d),m.upload.addEventListener("loadend",g)),(s.cancelToken||s.signal)&&(u=R=>{m&&(r(!R||R.type?new k(null,e,m):R),m.abort(),m=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const S=on(s.url);if(S&&T.protocols.indexOf(S)===-1){r(new h("Unsupported protocol "+S+":",h.ERR_BAD_REQUEST,e));return}m.send(o||null)})},mn=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,s;const o=function(l){if(!s){s=!0,c();const u=l instanceof Error?l:this.reason;r.abort(u instanceof h?u:new k(u instanceof Error?u.message:u))}};let i=t&&setTimeout(()=>{i=null,o(new h(`timeout ${t} of ms exceeded`,h.ETIMEDOUT))},t);const c=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(l=>{l.unsubscribe?l.unsubscribe(o):l.removeEventListener("abort",o)}),e=null)};e.forEach(l=>l.addEventListener("abort",o));const{signal:f}=r;return f.unsubscribe=()=>a.asap(c),f}},hn=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,s;for(;r<n;)s=r+t,yield e.slice(r,s),r=s},yn=async function*(e,t){for await(const n of wn(e))yield*hn(n,t)},wn=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},je=(e,t,n,r)=>{const s=yn(e,t);let o=0,i,c=f=>{i||(i=!0,r&&r(f))};return new ReadableStream({async pull(f){try{const{done:l,value:u}=await s.next();if(l){c(),f.close();return}let d=u.byteLength;if(n){let w=o+=d;n(w)}f.enqueue(new Uint8Array(u))}catch(l){throw c(l),l}},cancel(f){return c(f),s.return()}},{highWaterMark:2})},X=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",Ie=X&&typeof ReadableStream=="function",bn=X&&(typeof TextEncoder=="function"?(e=>t=>e.encode(t))(new TextEncoder):async e=>new Uint8Array(await new Response(e).arrayBuffer())),He=(e,...t)=>{try{return!!e(...t)}catch{return!1}},En=Ie&&He(()=>{let e=!1;const t=new Request(T.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t}),Me=64*1024,ce=Ie&&He(()=>a.isReadableStream(new Response("").body)),G={stream:ce&&(e=>e.body)};X&&(e=>{["text","arrayBuffer","blob","formData","stream"].forEach(t=>{!G[t]&&(G[t]=a.isFunction(e[t])?n=>n[t]():(n,r)=>{throw new h(`Response type '${t}' is not supported`,h.ERR_NOT_SUPPORT,r)})})})(new Response);const gn=async e=>{if(e==null)return 0;if(a.isBlob(e))return e.size;if(a.isSpecCompliantForm(e))return(await new Request(T.origin,{method:"POST",body:e}).arrayBuffer()).byteLength;if(a.isArrayBufferView(e)||a.isArrayBuffer(e))return e.byteLength;if(a.isURLSearchParams(e)&&(e=e+""),a.isString(e))return(await bn(e)).byteLength},Sn=async(e,t)=>{const n=a.toFiniteNumber(e.getContentLength());return n??gn(t)},le={http:Mt,xhr:pn,fetch:X&&(async e=>{let{url:t,method:n,data:r,signal:s,cancelToken:o,timeout:i,onDownloadProgress:c,onUploadProgress:f,responseType:l,headers:u,withCredentials:d="same-origin",fetchOptions:w}=qe(e);l=l?(l+"").toLowerCase():"text";let g=mn([s,o&&o.toAbortSignal()],i),p;const y=g&&g.unsubscribe&&(()=>{g.unsubscribe()});let m;try{if(f&&En&&n!=="get"&&n!=="head"&&(m=await Sn(u,r))!==0){let A=new Request(t,{method:"POST",body:r,duplex:"half"}),L;if(a.isFormData(r)&&(L=A.headers.get("content-type"))&&u.setContentType(L),A.body){const[U,Y]=_e(m,K(Ue(f)));r=je(A.body,Me,U,Y)}}a.isString(d)||(d=d?"include":"omit");const E="credentials"in Request.prototype;p=new Request(t,{...w,signal:g,method:n.toUpperCase(),headers:u.normalize().toJSON(),body:r,duplex:"half",credentials:E?d:void 0});let S=await fetch(p);const R=ce&&(l==="stream"||l==="response");if(ce&&(c||R&&y)){const A={};["status","statusText","headers"].forEach(tt=>{A[tt]=S[tt]});const L=a.toFiniteNumber(S.headers.get("content-length")),[U,Y]=c&&_e(L,K(Ue(c),!0))||[];S=new Response(je(S.body,Me,U,()=>{Y&&Y(),y&&y()}),A)}l=l||"text";let P=await G[a.findKey(G,l)||"text"](S,e);return!R&&y&&y(),await new Promise((A,L)=>{Fe(A,L,{data:P,headers:O.from(S.headers),status:S.status,statusText:S.statusText,config:e,request:p})})}catch(E){throw y&&y(),E&&E.name==="TypeError"&&/fetch/i.test(E.message)?Object.assign(new h("Network Error",h.ERR_NETWORK,e,p),{cause:E.cause||E}):h.from(E,E&&E.code,e,p)}})};a.forEach(le,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const ve=e=>`- ${e}`,Rn=e=>a.isFunction(e)||e===null||e===!1,$e={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;const s={};for(let o=0;o<t;o++){n=e[o];let i;if(r=n,!Rn(n)&&(r=le[(i=String(n)).toLowerCase()],r===void 0))throw new h(`Unknown adapter '${i}'`);if(r)break;s[i||"#"+o]=r}if(!r){const o=Object.entries(s).map(([c,f])=>`adapter ${c} `+(f===!1?"is not supported by the environment":"is not available in the build"));let i=t?o.length>1?`since :
`+o.map(ve).join(`
`):" "+ve(o[0]):"as no adapter specified";throw new h("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r},adapters:le};function ue(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new k(null,e)}function ze(e){return ue(e),e.headers=O.from(e.headers),e.data=ae.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),$e.getAdapter(e.adapter||H.adapter)(e).then(function(r){return ue(e),r.data=ae.call(e,e.transformResponse,r),r.headers=O.from(r.headers),r},function(r){return Be(r)||(ue(e),r&&r.response&&(r.response.data=ae.call(e,e.transformResponse,r.response),r.response.headers=O.from(r.response.headers))),Promise.reject(r)})}const Je="1.8.4",Z={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{Z[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Ve={};Z.transitional=function(t,n,r){function s(o,i){return"[Axios v"+Je+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,c)=>{if(t===!1)throw new h(s(i," has been removed"+(n?" in "+n:"")),h.ERR_DEPRECATED);return n&&!Ve[i]&&(Ve[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,c):!0}},Z.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function Tn(e,t,n){if(typeof e!="object")throw new h("options must be an object",h.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const c=e[o],f=c===void 0||i(c,o,e);if(f!==!0)throw new h("option "+o+" must be "+f,h.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new h("Unknown option "+o,h.ERR_BAD_OPTION)}}const Q={assertOptions:Tn,validators:Z},N=Q.validators;let _=class{constructor(t){this.defaults=t,this.interceptors={request:new Ce,response:new Ce}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const o=s.stack?s.stack.replace(/^.+\n/,""):"";try{r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=F(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&Q.assertOptions(r,{silentJSONParsing:N.transitional(N.boolean),forcedJSONParsing:N.transitional(N.boolean),clarifyTimeoutError:N.transitional(N.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:Q.assertOptions(s,{encode:N.function,serialize:N.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Q.assertOptions(n,{baseUrl:N.spelling("baseURL"),withXsrfToken:N.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[n.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=O.concat(i,o);const c=[];let f=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(n)===!1||(f=f&&y.synchronous,c.unshift(y.fulfilled,y.rejected))});const l=[];this.interceptors.response.forEach(function(y){l.push(y.fulfilled,y.rejected)});let u,d=0,w;if(!f){const p=[ze.bind(this),void 0];for(p.unshift.apply(p,c),p.push.apply(p,l),w=p.length,u=Promise.resolve(n);d<w;)u=u.then(p[d++],p[d++]);return u}w=c.length;let g=n;for(d=0;d<w;){const p=c[d++],y=c[d++];try{g=p(g)}catch(m){y.call(this,m);break}}try{u=ze.call(this,g)}catch(p){return Promise.reject(p)}for(d=0,w=l.length;d<w;)u=u.then(l[d++],l[d++]);return u}getUri(t){t=F(this.defaults,t);const n=De(t.baseURL,t.url,t.allowAbsoluteUrls);return xe(n,t.params,t.paramsSerializer)}};a.forEach(["delete","get","head","options"],function(t){_.prototype[t]=function(n,r){return this.request(F(r||{},{method:t,url:n,data:(r||{}).data}))}}),a.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,c){return this.request(F(c||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}_.prototype[t]=n(),_.prototype[t+"Form"]=n(!0)});let On=class nt{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(c=>{r.subscribe(c),o=c}).then(s);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,c){r.reason||(r.reason=new k(o,i,c),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new nt(function(s){t=s}),cancel:t}}};function An(e){return function(n){return e.apply(null,n)}}function xn(e){return a.isObject(e)&&e.isAxiosError===!0}const fe={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(fe).forEach(([e,t])=>{fe[t]=e});function We(e){const t=new _(e),n=de(_.prototype.request,t);return a.extend(n,_.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return We(F(e,s))},n}const b=We(H);b.Axios=_,b.CanceledError=k,b.CancelToken=On,b.isCancel=Be,b.VERSION=Je,b.toFormData=V,b.AxiosError=h,b.Cancel=b.CanceledError,b.all=function(t){return Promise.all(t)},b.spread=An,b.isAxiosError=xn,b.mergeConfig=F,b.AxiosHeaders=O,b.formToJSON=e=>Pe(a.isHTMLForm(e)?new FormData(e):e),b.getAdapter=$e.getAdapter,b.HttpStatusCode=fe,b.default=b;const{Axios:kn,AxiosError:qn,CanceledError:jn,isCancel:In,CancelToken:Hn,VERSION:Mn,all:vn,Cancel:$n,isAxiosError:zn,spread:Jn,toFormData:Vn,AxiosHeaders:Wn,HttpStatusCode:Kn,formToJSON:Xn,getAdapter:Gn,mergeConfig:Zn}=b,Ke=()=>{const e=document.querySelector(".alert");e&&e.parentElement.removeChild(e)},q=(e,t)=>{Ke();const n=`<div class="alert alert--${e}">${t}</div>`;document.querySelector("body").insertAdjacentHTML("afterbegin",n),window.setTimeout(Ke,1500)},Cn=async(e,t)=>{try{(await b({method:"POST",url:"/api/v1/users/login",data:{email:e,password:t}})).data.status==="success"&&(q("success","Logged in successfully!"),window.setTimeout(()=>{location.assign("/")},1500))}catch(n){q("error",n.response.data.message)}},Nn=async()=>{try{(await b({method:"GET",url:"/api/v1/users/logout"})).data.status==="success"&&(q("success","Logged out successfully!"),window.setTimeout(()=>{location.reload(!0)},1500))}catch{q("error","Error logging out. Try again!")}},Pn=e=>{mapboxgl.accessToken="pk.eyJ1IjoibWliYWxvOTc4NyIsImEiOiJjbTkyOTBxdWMwOHpiMmlxeml2dmJndXBtIn0.75SCnt7Sm13Czf0xLdSMCg";const t=new mapboxgl.Map({container:"map",style:"mapbox://styles/mibalo9787/cm92d4x1l006q01qz2yxf6my5",scrollZoom:!1}),n=new mapboxgl.LngLatBounds;e.forEach(r=>{const s=document.createElement("div");s.className="marker",new mapboxgl.Marker({element:s,anchor:"bottom"}).setLngLat(r.coordinates).addTo(t),new mapboxgl.Popup({offset:30}).setLngLat(r.coordinates).setHTML(`<p>Day: ${r.day}: ${r.description}</p>`).addTo(t),n.extend(r.coordinates)}),t.fitBounds(n,{padding:{top:150,bottom:150,left:100,right:100}})},Xe=async(e,t)=>{try{const n=e==="password"?"update-my-password":"update-me";console.log(n),(await b({method:"PATCH",url:`/api/v1/users/${n}`,data:t})).data.status=="success"&&q("success",`${e.toUpperCase()} updated successfully!`)}catch(n){q("error",n.response.data.message)}},Ge=document.getElementById("map"),Ze=document.querySelector(".form--login"),Qe=document.querySelector(".nav__el--logout"),Ye=document.querySelector(".form-user-data"),et=document.querySelector(".form-user-password");if(Ge){const e=JSON.parse(Ge.dataset.locations);Pn(e)}Ze&&Ze.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("email").value,n=document.getElementById("password").value;Cn(t,n)}),Qe&&Qe.addEventListener("click",Nn),Ye&&Ye.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("name").value,n=document.getElementById("email").value;Xe("data",{name:t,email:n})}),et&&et.addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("password-current").value,n=document.getElementById("password").value,r=document.getElementById("password-confirm").value,s=document.querySelector(".btn--save-password");s.textContent="Updating...",await Xe("password",{passwordCurrent:t,password:n,passwordConfirm:r}),document.getElementById("password-current").value="",document.getElementById("password").value="",document.getElementById("password-confirm").value="",s.textContent="Save password"})})();
