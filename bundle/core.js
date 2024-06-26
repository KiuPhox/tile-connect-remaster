var v=Object.defineProperty;var le=(e,t,n)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var o=(e,t)=>v(e,"name",{value:t,configurable:!0});var u=(e,t,n)=>le(e,typeof t!="symbol"?t+"":t,n);var V=(e=>(e.CORE_BOOTING="core-booting",e.REQUEST_CORE_START="core-start",e.CORE_STARTING="core-starting",e.CORE_READY="core-ready",e.GAME_SDK_READY="game-sdk-ready",e.GAME_SDK_STARTED="game-sdk-started",e.GAME_READY="game-ready",e.PLAYER_INFO_LOADED="player-info-loaded",e.SWITCH_SCENE="switch-scene",e.SCENE_LOADED="scene-loaded",e.PRELOAD_SCENE="preload-scene",e.SCENE_PROGRESS="scene-progress",e.SCENE_LAUNCHED="scene-launched",e.OPENING_SCREEN="opening-screen",e.OPEN_SCREEN="open-screen",e.OPENED_SCREEN="opened-screen",e.CLOSING_SCREEN="closing-screen",e.CLOSE_SCREEN="close-screen",e.CLOSED_SCREEN="closed-screen",e.CORE_PLUGIN_READY="core-plugin-ready",e.MODULE_PLUGIN_READY="module-plugin-ready",e.AD_SHOWING="ad-showing",e.AD_CLOSED="ad-closed",e.LANGUAGE_CHANGED="language-changed",e.REQUEST_HOT_RELOAD="request-hot-reload",e.REQUEST_SAVE_CONFIG="request-save-config",e.REQUEST_UPDATE_CONFIG="request-update-config",e.REMOTE_CONFIG_UPDATED="remote-config-updated",e.VISIBILITY_HIDDEN="visibility-hidden",e.VISIBILITY_VISIBLE="visibility-visible",e.REQUEST_RESIZE_GAME="request-resize-game",e))(V||{});const ue=V;var B=(e=>(e.DRAFT="draft",e.SINGLE="single",e.ENDLESS="endless",e.TOURNAMENT="tournament",e.MATCHING_GROUP="matching-group",e.CHALLENGE_FRIEND="challenge-friend",e))(B||{});const fe=B,de=fe,ge=o(e=>e,"func$1b"),pe={asConst:ge},K=o((e,t)=>{const n=[];for(let r=0;r<e;r++)n.push(t(r));return n},"func$1a"),x=o(e=>K(e,()=>{}),"func$19"),me=o((e,t)=>{const n=Math.ceil(e.length/t);return x(n).map((r,s)=>e.slice(s*t,s*t+t))},"func$18"),he=o((e,t)=>e.filter(n=>t.indexOf(n)<0),"func$17"),be=o((e,t)=>e.indexOf(t)>=0,"func$16"),Q=o((e,t)=>{for(const n of e)if(t(n))return n},"func$15"),q=o((e,t)=>{for(let n=0;n<e.length;n++)if(t(e[n]))return n;return-1},"func$14"),ye=o(e=>{for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}},"func$13"),Se=o((e,t,n)=>n.indexOf(e)===t&&e!==null&&e!==void 0,"unique"),we=o(e=>e.filter(Se),"func$12"),Ae={chunk:me,difference:he,fillWith:K,length:x,search:Q,searchIndex:q,has:be,shuffle:ye,unique:we},Y=o(e=>{try{const t=localStorage.getItem(e);return t===null?null:d.Utils.Json.decode(t)}catch{return null}},"func$11"),J=o(e=>{try{return JSON.parse(e)}catch{return null}},"func$10"),Z=o(e=>{try{return JSON.stringify(e,null,0)}catch{return""}},"func$$"),X=o(e=>J(Z(e)),"func$_"),Ee=o(()=>{const e="en_US",t=X(window.navigator.languages)||[],n=Q(t,r=>r.indexOf("-")>-1);return!n||n.indexOf("-")===-1?e:n.replace("-","_")},"func$Z"),Oe=o(()=>{const e=window.location.search.substring(1);if(!e)return{};const t=e.split("&"),n={};for(const r of t){const s=r.split("=");n[s[0]]=decodeURIComponent(s[1])}return n},"func$Y"),$e=o(()=>{const{body:e,documentElement:t}=document,{clientHeight:n}=e,{clientHeight:r}=t;return Math.max(r,n)||0},"func$X"),De=o(()=>{const{body:e,documentElement:t}=document,{clientWidth:n}=e,{clientWidth:r}=t;return Math.max(r,n)||0},"func$W"),Ie=o(()=>{const e="vibrate"in window.navigator;if(e)try{window.navigator.vibrate(0)}catch{return!1}return e},"isSupportVibrateApi"),Te=o(e=>{try{return Ie()?(window.navigator.vibrate(0),window.navigator.vibrate(e),!0):!1}catch{return!1}},"func$V"),Ce=o((e,t)=>{try{const n=Y(e);let r={};d.Utils.Valid.isObject(n)&&(r=n);const s=d.Utils.Object.clone(t);if(!d.Utils.Valid.isObject(s))return!1;const i=d.Utils.Object.clear(s),a=d.Utils.Object.merge(r,i),l=d.Utils.Json.encode(a);return localStorage.setItem(e,l),!0}catch{return!1}},"func$U"),Re={getLocale:Ee,getLocalStorage:Y,getQueryParams:Oe,getScreenHeight:$e,getScreenWidth:De,writeLocalStorage:Ce,vibrate:Te},_e=o(e=>e*window.devicePixelRatio,"func$T"),Pe=o(()=>/Android/i.test(navigator.userAgent),"func$S"),xe=o(()=>!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),"func$R"),Ue=o(()=>/iPhone|iPad|iPod/i.test(navigator.userAgent),"func$Q"),Ne=o(()=>/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),"func$P"),Me=o(()=>Math.round(window.devicePixelRatio)||1,"func$O"),Le={getPhysicPixels:_e,isDesktop:xe,isMobile:Ne,isAndroid:Pe,isIOS:Ue,pixelRatio:Me},ke=o((e,t,n=!1)=>{let r,s=!1;return o(function(...a){const l=o(()=>{clearTimeout(r),e(...a)},"later");clearTimeout(r),r=setTimeout(l,t),n&&!s&&(e(...a),s=!0)},"executedFunction")},"func$N"),E=o(e=>{const t=new Map;return(...n)=>{const r=JSON.stringify(n);if(t.has(r))return t.get(r);const s=e(...n);return t.set(r,s),s}},"func$M"),U=o((e,t)=>{if("assign"in Object)return Object.assign(e,t);const n=e;for(const r in t)n[r]=t[r];return n},"func$L"),h=o(e=>{const t=typeof e=="object"||typeof e=="function",n=Array.isArray(e);return e!==null&&t&&!n},"func$K"),G=o((e,t)=>{e.__proto__.valueOf=()=>t,e.__proto__.toString=()=>`${t}`},"makeMutableTrick"),Fe=o(e=>e.constructor({...e,__proto__:e.__proto__}),"makeTypeTrick"),ee=o(e=>{Object.keys(e).forEach(n=>{var s;const r=(s=Object.getOwnPropertyDescriptor(e,n))==null?void 0:s.value;if(h(r)){ee(r);return}try{const i=r;G(i,r),Object.defineProperty(e,n,{enumerable:!1,configurable:!0,get(){return Fe(i)},set(a){U(i,a),G(i,a)}})}catch{}})},"func$J"),ve=o((e,t)=>{let n=0;return o(function(...s){const i=Date.now();i-n>=t&&(e(...s),n=i)},"executedFunction")},"func$I"),Ge={debounce:ke,throttle:ve,syncVars:ee,memoize:E},je=E((e,t)=>{const n=e.toLowerCase();if(typeof e=="string"){const r=t[n];if(typeof r=="string")return r}return"?"}),He=E(e=>{let t=null;const n=[],r=/:([A-Z0-9?]+)/gm;for(;(t=r.exec(e))!==null;)n.push(t[1]);return n}),ze=E(e=>{let t=null;const n=[],r=/(\d+[A-Z?]|[A-Z?])/gm;for(;(t=r.exec(e))!==null;){const s=t[0];if(s.length>=2){const{length:i}=s,a=s.slice(0,i-1),l=s[i-1],c=x(+a).map(()=>l);n.push(...c);continue}n.push(s)}return n}),We=o((e,t)=>{const n=e,r=d.Utils.Object.invert(t),s={};let i=0,a=0;return He(n).forEach(c=>{i=0,a++,s[a]||(s[a]={}),ze(c).forEach(g=>{i++;const y=je(g,r);s[a][i]=y})}),s},"func$H"),Ve=E((e,t)=>{if(!d.Utils.Valid.isObject(t)||!d.Utils.Object.hasOwn(t,e))return"?";const n=t[e];return typeof n=="string"?`${n.toUpperCase()}`:"?"}),te=o((e,t,n=!1)=>{let r="";if(!d.Utils.Valid.isObject(e))return r;let s="",i=1;for(const a in e){if(!d.Utils.Object.hasOwn(e,a))continue;const l=e[a];if(d.Utils.Valid.isObject(l)){r+=`:${te(l,t,!0)}`;continue}if(!d.Utils.Valid.isString(l))continue;const c=Ve(l,t);c===s?(i++,r=r.slice(0,-2)):i=1,r+=`${i}${c}`,s=c}return r=r.replace(/1([A-Z])/g,"$1"),r},"func$G"),Be=o((e,t)=>{try{if(!e)return"";if(t){let n=atob(e);const r=btoa(t);return n=n.replace(r,"="),atob(n)}else return atob(e)}catch(n){return console.warn("Error in hashToString",n),""}},"func$F"),Ke=o((e,t)=>{try{if(!e)return"";if(t){let n=btoa(e);const r=btoa(t);return n=n.replace("=",r),btoa(n)}else return btoa(e)}catch(n){return console.warn("Error in stringToHash",n),""}},"func$E"),Qe=o(()=>({}),"createCompressDict"),D={},$=o(e=>(D[e]||(D[e]=Qe()),D[e]),"getCompressionDict"),j=o((e,t)=>{const n=$(t),r=Object.keys(n).length;n[e]=r+1},"setCompressionDict"),qe=o((e,t,n=1)=>{let r=e[0];const s=[];let i=$(n);if(t)for(const c in t)j(c,n);for(let c=1;c<e.length;c++){const f=e[c],g=`${r}${f}`;c++,r=e[c],i[g]===void 0&&(j(g,n),i=$(n))}r=e[0];let a=1,l=0;for(;a<e.length;){const c=e[a],f=`${r}${c}`,g=Ye(e.slice(l),i);if(g!==null){s.push(i[g]),a+=g.length-f.length,r="",l=a+1,a++;continue}i[f]===void 0?r=f:(s.push(i[f]),r="",l=a+1),a++}return console.info("dict",i,Object.keys(i).length),s},"func$D"),Ye=o((e,t)=>{let n=Object.keys(t);return n=n.filter(r=>e.indexOf(r)>-1&&e!==r),n.length===0?null:n.sort((r,s)=>s.length-r.length)[0]},"getLongestAvailableKeyInCompressDict"),Je=o(e=>{const t={};for(const n in e)t[e[n]]=n;return t},"createDecompressDict"),Ze=o((e,t,n=1)=>{let r="",s="",i=$(n);t&&(i={...t,...i}),console.info("compressDict",i);const a=Je(i);for(const l in e){const c=e[l];a[c]!==void 0?r=a[c]:r="?",s+=r}return s},"func$C"),Xe={decodeMap:We,encodeMap:te,hashToString:Be,stringToHash:Ke,lwzCompress:qe,lwzDecompress:Ze},et=o((e,t)=>{const n=e.split(","),r=n[0].match(/:(.*?);/);if(!r)return null;const s=r[1],i=atob(n[n.length-1]);let a=i.length;const l=new Uint8Array(a);for(;a--;)l[a]=i.charCodeAt(a);return new File([l],t,{type:s})},"base64ToFile"),tt=o(e=>new Promise((t,n)=>{const r=new FileReader;r.onloadend=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)}),"func$B");let w=new Image;const nt=o((e,t=!0)=>new Promise(n=>{t&&(w=new Image),w.onload=()=>{n(w)},w.onerror=()=>{n(null)},w.src=URL.createObjectURL(e)}),"func$A"),rt=o(async(e,t)=>{const n=await fetch(e).then(r=>r.blob()).catch(()=>null);return n?new File([n],t):null},"func$z"),O=document.createElement("canvas"),ot=o(e=>{const t=O.getContext("2d");return t?(O.width=e.clientWidth,O.height=e.clientHeight,t.drawImage(e,0,0,e.clientWidth,e.clientHeight),O.toDataURL()):""},"func$y"),st=o(async e=>new Promise((t,n)=>{e||n(new Error("url is empty"));const r=new Image;r.crossOrigin="anonymous",r.onload=()=>{t(r)},r.onerror=s=>{n(s)},r.src=e}),"func$x"),it=o((e,t)=>{if(isNaN(e)||isNaN(t))throw new Error("width and height must be numbers");return{string:"+",style:`font-size: 1px; padding: ${Math.floor(t/2)}px ${Math.floor(e/2)}px;`}},"getBox"),at=o((e,t=1)=>{const n=new Image;n.onload=function(){const r=this,s=r.width*t,i=r.height*t,a=it(s,i);console.info(`%c ${a.string}`,`${a.style} background: transparent url(${e}) no-repeat center center; background-size: ${s}px ${i}px;`)},n.src=e},"func$w"),ct={base64ToFile:et,blobToDataImage:tt,blobToHtmlImage:nt,blobUrlToFile:rt,elementToBase64:ot,loadImage:st,logImage:at},lt={clone:X,decode:J,encode:Z},A=class A{constructor(){u(this,"perf",null)}static get instance(){return this._instance||(this._instance=new A),this._instance}static setService(t){this.instance.perf=t??null}static measure(t){var n;(n=this.instance.perf)==null||n.measure(t)}static start(t){var n;(n=this.instance.perf)==null||n.start(t)}static stop(t){var n;try{(n=this.instance.perf)==null||n.stop(t)}catch(r){console.warn(r)}}static putMetric(t,n,r=Date.now()){var s;(s=this.instance.perf)==null||s.putMetric(t,n,r)}static incMetric(t,n,r=1){var s;(s=this.instance.perf)==null||s.incrementMetric(t,n,r)}static putAttr(t,n,r){var s;r=r.slice(0,100),(s=this.instance.perf)==null||s.putAttr(t,n,r)}static rmAttr(t,n){var r;(r=this.instance.perf)==null||r.removeAttr(t,n)}};o(A,"Performance"),u(A,"_instance");let I=A;const ut=I,ft=o((e,t)=>{const n=10**t;let r=e,s=0;for(;r>=n;)r=Math.floor(r/1e3),s++;const i=r.toString(),l=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","Ud","Dd","Td","Qad","Qid","Sxd","Spd"][s];return`${i}${l}`},"func$v"),dt=o((e,t,n="0")=>{let r=e.toString();const s=r.length;for(let i=0;i<t-s;i++)r=r+n;return r},"padEnd"),gt=o((e,t,n="0")=>{let r=e.toString();const s=r.length;for(let i=0;i<t-s;i++)r=n+r;return r},"padStart"),T=o((e,t)=>{const n=t?Math.random()>.5?1:-1:1;return Math.floor(Math.random()*e)*n},"func$u"),pt=o(e=>e>0?1:e<0?-1:e===0?0:NaN,"func$t"),mt=o((e,t)=>{const{fractionalDigits:n=0,startAbbreviate:r=1e3,abbreviateStep:s=3,maxLength:i=-1,removeLastZero:a=!0,suffixes:l=["","k","m","b","t","q"]}=t||{},c=i===-1?99999999:i;if(e>=r){const p=Math.floor(e/10**s),m=Math.floor((p.toString().length-1)/s)+1,ae=(e/(10**s)**m).toFixed(n),ce=c-l[m].length,F=ae.substring(0,ce);return(a?H(F):F)+l[m]}const f=e.toFixed(n),g=c-l[0].length,y=f.substring(0,g);return a?H(y):y+l[0]},"toAbbreviatedString"),H=o(e=>{if(e.indexOf(".")<0)return e;for(let t=e.length-1;t>=0;t--){if(e[t]==".")return e.substring(0,t);if(e[t]!="0")return e.substring(0,t+1)}return e},"removeZero"),ht={getShortNumber:ft,sign:pt,padEnd:dt,padStart:gt,random:T,toAbbreviatedString:mt},bt=o(e=>{const t=e.replace(/[-_\s.]+(.)?/g,(n,r)=>r?r.toUpperCase():"");return t.substring(0,1).toUpperCase()+t.substring(1)},"toUpperCamelCase"),ne=o(e=>{const t=e.replace(/[-_\s.]+(.)?/g,(n,r)=>r?r.toUpperCase():"");return t.substring(0,1).toLowerCase()+t.substring(1)},"toCamelCase"),C=o(e=>{const t={};for(const n in e){const r=e[n],s=ne(n);Array.isArray(r)?t[s]=r.map(i=>typeof i=="object"?C(i):i):typeof r=="object"?t[s]=C(r):t[s]=e[n]}return t},"func$s"),yt=o(e=>e==null,"isNotClear"),re=o(e=>{if(!h(e))return e;for(const t in e)if(yt(e[t]))delete e[t];else{const n=e[t];h(n)&&(e[t]=re(n))}return e},"func$r"),St=o(e=>typeof e!="object"||e===null?null:U(e,{}),"func$q"),oe=o((e,t)=>h(e)?typeof Object.hasOwn=="function"?Object.hasOwn(e,t):Object.prototype.hasOwnProperty.call(e,t):!1,"func$p"),wt=o(e=>{const t={};for(const n in e){const r=e[n];t[r]=n}return t},"func$o"),se=o(e=>["string","number","symbol"].indexOf(typeof e)>-1,"func$n"),At=o((e,t)=>{const n={};for(const r of e){const s=r[t];se(s)&&(n[s]=r)}return n},"func$m"),ie=o((e,t)=>{for(const n in t)h(e[n])&&h(t[n])?ie(e[n],t[n]):e[n]=t[n];return e},"func$l"),Et=o(e=>Object.keys(e).map(t=>e[t]),"func$k"),Ot={assign:U,camelCaseKeys:C,clone:St,clear:re,hasOwn:oe,invert:wt,keyBy:At,merge:ie,vals:Et},$t=o(e=>e&&e[0].toUpperCase()+e.slice(1),"func$j");function Dt(e,t=2){const n=[],r=e.split(" "),s=r.length;for(let i=s;i>=1;i--)for(let a=0;a<=s-i;a++){const c=r.slice(a,a+i).join(" ");e.split(c).length-1>=t&&n.indexOf(c)<0&&c.length>1&&n.push(c)}return n.sort((i,a)=>i.length-a.length)}o(Dt,"fun");const It="modulepreload",Tt=o(function(e,t){return new URL(e,t).href},"assetsURL"),z={},Ct=o(function(t,n,r){let s=Promise.resolve();if(n&&n.length>0){const i=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.all(n.map(c=>{if(c=Tt(c,r),c in z)return;z[c]=!0;const f=c.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(!!r)for(let m=i.length-1;m>=0;m--){const S=i[m];if(S.href===c&&(!f||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${g}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":It,f||(p.as="script",p.crossOrigin=""),p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),f)return new Promise((m,S)=>{p.addEventListener("load",m),p.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${c}`)))})}))}return s.then(()=>t()).catch(i=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i})},"preload");let b=null;const Rt="Anonymous",_t=o(async()=>{const e=(await Ct(async()=>{const{default:t}=await import("./names-surnames.js");return{default:t}},[],import.meta.url)).default;if(!h(e)||!oe(e,"data")||!Array.isArray(e.data))throw new Error("Invalid names-surnames.json");b=e.data},"fetchNames"),Pt=o(async()=>{try{if(!b&&(await _t(),!b))throw new Error("Cannot fetch names");const{length:e}=b,t=b[T(e)],n=b[T(e)];return`${t} ${n}`}catch{return Rt}},"func$i"),xt=o((e=16)=>{const t=o(s=>Math.floor(s).toString(e),"s"),n=t(Date.now()/1e3),r=Array(e+1).join(" ");return n+r.replace(/./g,()=>t(Math.random()*e))},"func$h"),Ut=o(e=>{const t=e?e.split("_"):[];let n=t.length>0?t[0]:"en_US";switch(n){case"id":case"in":n="id";break}return n},"func$g"),Nt=o((e,t)=>{const n=e.split(" "),s=(n.length<=1?[...n]:[n[0],n.pop()]).join(" "),i=s.lastIndexOf(" ")||0,a=i>=0?i:t;return(s.length>t?s.substring(0,a):s).substring(0,t)},"func$f"),Mt=o(e=>{let t=0;if(e.length==0)return t;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);t=(t<<5)-t+r,t=t&t}return t},"func$e"),Lt=o(e=>Object.keys(e).reduce((n,r)=>{const s=e[r];return s!==void 0&&n.push(`${r}=${s}`),n},[]).join("&"),"func$d"),kt=o((e,t)=>{const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#%&!";let r="",s=e;t!=null&&(s-=t.length,r+=t);for(let i=0;i<s;i++){const a=Math.floor(Math.random()*n.length);r+=n.charAt(a)}return r},"func$c"),Ft="0123456789ABCDEF",vt=o((e="0x")=>{let t=e;for(let n=0;n<6;n++)t+=Ft[Math.floor(Math.random()*16)];return t},"func$b"),Gt=o(e=>e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,n=>n==="đ"?"d":"D"),"func$a"),jt={toCamelCase:ne,toUpperCamelCase:bt,capitalize:$t,generateObjectId:xt,getLanguageCode:Ut,getShortName:Nt,hashCode:Mt,params:Lt,random:kt,randomColor:vt,removeDiacritics:Gt,findDuplicateSubstrings:Dt,generateName:Pt},W=[60,3600,86400,86400*7,86400*30,86400*365,1/0],Ht=["second","minute","hour","day","week","month","year"],zt=o(e=>{const t=Math.round((e*1e3-Date.now())/1e3),n=q(W,i=>i>Math.abs(t)),r=n?W[n-1]:1;return new Intl.RelativeTimeFormat("en",{numeric:"auto"}).format(Math.floor(t/r),Ht[n])},"func$9"),Wt=o(e=>{const t=new Date(e),n=t.getUTCHours(),r=t.getUTCMinutes(),s=t.getUTCSeconds(),i=t.getUTCMilliseconds(),a=n<10?`0${n}`:`${n}`,l=r<10?`0${r}`:`${r}`,c=s<10?`0${s}`:`${s}`;let f=`${i}`;return i<10?f=`00${i}`:i<100&&(f=`0${i}`),`${a}:${l}:${c}:${f}`},"func$8"),Vt=o(e=>{const t=new Date(e),n=new Date;return t.getDate()===n.getDate()&&t.getMonth()===n.getMonth()&&t.getFullYear()===n.getFullYear()},"func$7"),Bt=o(e=>new Promise(t=>setTimeout(t,e)),"func$6"),Kt={isToday:Vt,sleepAsync:Bt,getRelativeTime:zt,getTimeString:Wt},Qt=o(e=>typeof e=="boolean","func$5"),qt="true",Yt=o(()=>qt==="true","func$4"),Jt=o(e=>typeof e=="function","func$3"),Zt=o(e=>typeof e=="number","func$2"),Xt=o(e=>typeof e=="string","func$1"),en=o((e,t,n)=>{const{timeout:r=1e3,checkInterval:s=100}=n??{};return new Promise(i=>{const a=setInterval(()=>{const l=typeof e=="function"?e():e,c=typeof t=="function"?t():t;l===c&&(clearInterval(a),i(!0))},s);r>0&&setTimeout(()=>{clearInterval(a),i(!1)},r)})},"func"),tn={isBoolean:Qt,isDebugger:Yt,isFunction:Jt,isNumber:Zt,isObject:h,isPropertyKey:se,isString:Xt,isValueChangeAsync:en},nn={Array:Ae,Browser:Re,Device:Le,Function:Ge,Hash:Xe,Image:ct,Json:lt,Mark:ut,Object:Ot,String:jt,Number:ht,Time:Kt,Valid:tn};var rn={AppId:"9p630z8prmnx",ApiHost:"https://fbig-singleplay-apps.citigo.site",OtherHost:"https://fbig-leaderboards.citigo.site",Ads:{Enabled:!0,ShowAdOnLoad:{Enabled:!1,DelaySeconds:0,PlacementId:"interstitial_demo"},InterstitialAdOptions:[{PlacementId:"interstitial_demo",SecondsFirstTime:60,SecondsBetweenAds:90}],RewardedVideoAdOptions:[{PlacementId:"rewarded_video_demo",SecondsFirstTime:0,SecondsBetweenAds:0}],BannerDisplayAdOptions:[]},GameSDKOptions:{MSGames:{UseLoginFeature:!1}},Core:{StartSDKAfterLoadGame:!0},GameEngine:{DynamicAtlas:{IOS:{Enabled:!0,AutoAtlasSize:!1,MaxAtlasCount:2,MaxAtlasSize:4096,MaxFrameSize:2048},Android:{Enabled:!0,AutoAtlasSize:!1,MaxAtlasCount:2,MaxAtlasSize:4096,MaxFrameSize:2048},Desktop:{Enabled:!0,AutoAtlasSize:!1,MaxAtlasCount:2,MaxAtlasSize:4096,MaxFrameSize:2048},TextureAtlasOptimize:!1},DynamicAssets:{Enabled:!1,Compression:{PNG:{colors:256,compressionLevel:8},JPEG:{mozjpeg:!0,quality:30},WEBP:{lossless:!1,alphaQuality:10,smartSubsample:!0,preset:"drawing",quality:10}}},ForceDesktopDPR:2},Gameplay:{StartAdAtLevel:1,MaxRescueCount:1,Tutorial:{Enabled:!0,ForceUseTutorial:!1}},Firebase:{Enabled:!1,Options:{AppId:"",ApiKey:"",ProjectId:"",AuthDomain:"",StorageBucket:"",MeasurementId:"",MessagingSenderId:""},Services:{Analytics:{Enabled:!1},Performance:{Enabled:!1},RemoteConfig:{Enabled:!1}}},Analytics:{GoogleAnalytics:{Enabled:!1,ConsoleLog:!1},FirebaseAnalytics:{Enabled:!1,ConsoleLog:!1},FacebookAnalytics:{Prefix:"fba",Enabled:!1,ConsoleLog:!1}},PerformanceMonitor:{CoreFlows:!0,EngineFlows:!0,FpsTracking:{Enabled:!0,TrackingDuration:60,TrackingInterval:10},LoadResources:!0},RemoteConfig:{Enabled:!1,Options:{ForceReloadGame:!1,FetchIntervalInSeconds:300},ServiceType:"mockup",DefaultConfigId:"default",SupportedDataTypes:["GameCore","Gameplay"],MockupConfig:{Enabled:!0},SelfHostedConfig:{Enabled:!1,AppId:"",ApiKey:"",ApiUrl:""}},Network:{MaximumRequest:6,Timeout:15e3,Retries:3},Leaderboards:{Limit:99,LeaderboardId:"656d7c146362a27c1bc246e8",LeaderboardEndlessId:""},Notification:{Enabled:!0,ApiUrl:"https://notifications.sunstudio.io",GameTitle:"Sun Studio",GameImage:"https://sunstudio.io/images/logo.png"},DailyRewards:{MaxDays:7,MockTime:300,CheckInterrupt:!1},Mockup:{Ads:{Enabled:!1,ErrorRate:5,GiphyApiKey:"VmjHIRsfrwCAssDS4mDo9DoImxJm1lLM"},Match:{Enabled:!1,CreateFailRate:5,PlayerInfo:{Id:"player-mock",Name:"Player Mock",Photo:"",Signature:""},OpponentInfo:{Id:"opponent-mock",Name:"Opponent Mock",Photo:"",Signature:""}},GameSDK:{SlowAPI:{Enabled:!1,ErrorRate:5,StartDelay:1e3,InitialDelay:1e3,PlayerDataDelay:1e3},Context:{Enabled:!1},Player:{SubscribeBot:{Enabled:!1,CanSubscribeBot:!0},ConnectedPlayers:{Enabled:!1,ErrorRate:5,RandomDelayMs:1e3,AvatarUrl:"https://picsum.photos/seed/%1/300/300",NumOfPlayers:3}},AddShortcut:{Enabled:!1},Tournament:{Enabled:!1,ErrorRates:5,RandomDelayMs:1e3,NumOfTournament:{Normal:10,HostPage:2}}},Profile:{Enabled:!1,ErrorRate:5,RandomDelayMs:1e3,AvatarUrl:"https://picsum.photos/seed/%1/300/300"},Leaderboards:{Enabled:!1,MinScore:10,MaxScore:100,ErrorRate:5,NumOfLeaders:50,RandomDelayMs:1e3},LoadingScreen:{Enabled:!1}},Debugger:{ShowConsole:!0,ShowProfiler:!1,EventLogging:!1,CanvasRecorder:{Enabled:!1,Options:{Type:"png",Quality:.85,RecordFps:60,SyncFps:!0}},MonitorError:{Enabled:!1,ApiKey:"5481ca70d02e4a0547aec76fc8ab4d64",Service:"BugSnag",TrackUser:!1,FilterErrors:{Codes:{Accepted:[],Ignored:["USER_INPUT","NETWORK_FAILURE"]},Messages:{Accepted:[],Ignored:["Load image failed"]}},ListPlayerDevIds:[]}},AdaptivePerformance:{Enabled:!1,Quality:{Min:1,Max:2,AdjustStep:.1},Options:{FpsThreshold:48,CheckInterval:2e3,AutoUpgradeQuality:!0,OnlyUpdateWhenSwitchScene:!1},TrackingSceneNames:["GameScene"]},FrameCapture:{Enabled:!0,Options:{Quality:.85,RenderType:"jpeg",UseBlobIfPossible:!0,FallbackWithWideframe:"Default"},WideframeConfigs:{Default:{Width:952,Height:492,Wideframe:"./public/wideframes/default.png",RenderOptions:{}},ShareScore:{Width:1500,Height:2e3,Wideframe:"./public/wideframes/share-score.png",RenderOptions:{Avatar:{Type:"image",Depth:-1,Size:[500,500],Position:[530,450],FallbackImage:"./public/wideframes/images/avatar-fallback.png"},PlayerScore:{Type:"text",Text:"0",Depth:1,Font:"italic bold 80px",Color:"#f2a62e",TextAlign:"center",Position:[750,1200]}}},ShareLeaderboard:{Width:1500,Height:2e3,Wideframe:"./public/wideframes/share-leaderboard.png",RenderOptions:{Avatar:{Type:"image",Depth:-2,Size:[510,510],Position:[510,278]}}},ResultChallenge:{Width:952,Height:492,Wideframe:"./public/wideframes/result-challenge.png",RenderOptions:{PlayerPhoto:{Type:"image",Depth:-2,Size:[160,160],Position:[50,140],FallbackImage:"./public/wideframes/images/avatar-fallback.png"},OpponentPhoto:{Type:"image",Depth:-1,Size:[160,160],Position:[740,140],FallbackImage:"./public/wideframes/images/avatar-fallback.png"},LeftCrown:{Name:"crown-icon",Type:"image",Depth:2,Size:[92,63],Position:[80,65],Image:"./public/wideframes/images/crown-icon.png"},RightCrown:{Name:"crown-icon",Type:"image",Depth:2,Size:[92,63],Position:[775,65],Image:"./public/wideframes/images/crown-icon.png"},LeftScore:{Type:"text",Text:"",Depth:3,Font:"normal bold 44px",Color:"#f2a62e",TextAlign:"center",Position:[123,375]},RightScore:{Type:"text",Text:"",Depth:3,Font:"normal bold 44px",Color:"#f2a62e",TextAlign:"center",Position:[820,375]}}},CustomResultChallenge:{Width:952,Height:492,Wideframe:"./public/wideframes/custom-result-challenge.png",RenderOptions:{PlayerPhoto:{Type:"image",Depth:-2,Size:[160,160],Position:[50,140],FallbackImage:"./public/wideframes/images/avatar-fallback.png"},OpponentPhoto:{Type:"image",Depth:-1,Size:[160,160],Position:[740,140],FallbackImage:"./public/wideframes/images/avatar-fallback.png"}}}}}};console.groupCollapsed("🧬 GameCore initiation");const N=Object.preventExtensions({Dtos:{},Utils:Object.freeze(nn),Match:Object.freeze({Modes:Object.freeze(de)}),Events:Object.freeze(ue),Configs:Object.seal(rn),Plugins:Object.seal({Ads:null,Audio:null,Analytics:null})});window.GameCore=N;window.TypeGuard=pe;console.warn("Env mode:","browser");console.warn("Debugger:",N.Utils.Valid.isDebugger());const d=N,M=class M{constructor(t){u(this,"game");this.game=t}init(){}};o(M,"BasePlugin");let R=M;const L=class L{constructor(t){u(this,"game");u(this,"plugins");this.game=t,this.plugins={}}install(t,n,r,s){if(typeof n!="function"){console.error("Plugin install:",`${t} plugin must be a class (${s})`);return}const i=new n(this.game);this.plugins[t]=i,r&&Object.defineProperty(this.game,s,{get:o(()=>i,"get")}),i.init()}get(t){return this.plugins[t]}};o(L,"PhaserPlugins");let _=L;const k=class k{constructor(){u(this,"game");u(this,"plugins");u(this,"ads");u(this,"auth");u(this,"audio");u(this,"event");u(this,"match");u(this,"player");u(this,"profile");u(this,"context");u(this,"storage");u(this,"language");u(this,"firebase");u(this,"analytics");u(this,"visibility");u(this,"leaderboard");u(this,"dailyRewards");u(this,"remoteConfig");u(this,"frameCapture");u(this,"monitorError");u(this,"adaptivePerformance");u(this,"console");u(this,"profiler");u(this,"canvasRecorder");this.game=this,this.plugins=new _(this.game)}async boot(){}async start(){}getBuildVersion(){return 0}};o(k,"Game");let P=k;const on={Game:P,Plugins:{BasePlugin:R}};window.Phaser=on;export{ue as C,d as G,de as M,on as P,Ct as _,fe as a};
