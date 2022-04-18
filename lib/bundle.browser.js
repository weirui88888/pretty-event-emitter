!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).PrettyEventEmitter=t()}(this,(function(){"use strict";const e=e=>Object.prototype.toString.call(e).slice(8,-1),t=t=>"String"===e(t),n=t=>"Object"===e(t);class s{constructor(e){this.maxEvents=(null==e?void 0:e.maxEvents)?e.maxEvents:null,this.scope=(null==e?void 0:e.scope)||"EventEmitter",this.debug=(null==e?void 0:e.debug)||!1,this.events=new Map,this.eventEmitterWatcher=new Map}get eventKeys(){return this.events.keys()}get countOfEvents(){return this.events.size}get countOfAllHandlers(){let e=0;for(const t of this.events.values())e+=t.length;return e}countOfEventHandlers(e){if(!t(e))return console.log("param event show be string"),0;const n=this.events.get(e);return n?n.length:(console.log(`The number of handlers with event name ${e} is 0`),0)}countOfTypeHandlers(e){if(!t(e))return console.log("param type should be string"),0;let n=[];for(const e of this.events.values())n=[...n,...e];return n.filter((t=>t.type===e)).length}on(s,r,i){return t(s)||n(s)?t(s)?"Function"===e(r)||(t=>"AsyncFunction"===e(t))(r)?this._registerListener(s,r,i):(console.log("param handler should provided"),this):n(s)?this._registerListeners(s):void 0:(console.log("param event should provided with type string or object"),this)}_registerEvent(t,n,s){const{events:r}=this,i="Number"===e(s)&&s>=0;const[o,l=""]=t.split(".");if(!o)return console.log("when you're ready to register an event handler, it's best to provide an event name"),this;if(r.has(o)||r.set(o,[]),i){r.get(o).splice(s,0,{type:l,handler:n,id:this._uuid()})}else{r.get(o).push({type:l,handler:n,id:this._uuid()})}return this}_registerListener(e,t,n){return e.split(" ").forEach((e=>{this._registerEvent(e,t,n)})),this}_registerListeners(e){return Object.keys(e).forEach((t=>{const n=e[t],{handler:s,order:r}=n;t.split(" ").forEach((e=>{this._registerEvent(e,s,r)}))})),this}emit(e,...t){if(!/^[A-Za-z][A-Za-z.]+(\s{1}[A-Za-z.]+)*/g.test(e))return console.log("param event show be string,such as 'download.pic' or 'download.pic pay' or 'download.pic pay.privilege'"),this;if(!this.events.size)return console.log("no events are registered in the event center"),this;const n=e.split(" ");for(const e of n)this._emit(e,...t);return this}offAll(){return this.events.clear()}off(e){if(!/^[A-Za-z][A-Za-z.]+(\s{1}[A-Za-z.]+)*/g.test(e))return console.log("param event show be string,such as 'download.pic' or 'download.pic pay' or 'download.pic pay.privilege'"),this;const t=e.split(" ");for(const e of t){const[t,n=""]=e.split(".");this._off(t,n)}return this}_off(e,t){if(e&&t){const n=this.events.get(e)||[],s=n.findIndex((e=>e.type===t));s>=0&&n.splice(s,1)}else this.events.has(e)&&this.events.delete(e);return this._deleteInvalidEvent(),this}offType(e){if(!t(e))return console.log("param type should be string"),this;for(const t of this.eventKeys){const n=this.events.get(t)||[],s=n.findIndex((t=>t.type===e));s>=0&&n.splice(s,1)}return this._deleteInvalidEvent(),this}_deleteInvalidEvent(){for(const e of this.eventKeys){0===(this.events.get(e)||[]).length&&this.events.delete(e)}}emitType(e,...n){if(!t(e))return console.log("请输入字符串格式的事件类型"),this;let s=[];for(const[t,n]of this.events.entries()){const[r]=n.filter((t=>t.type===e));if(r){const{id:e,type:n,handler:i}=r;s=[...s,{id:e,type:n,handler:i,eventName:t}]}}for(const{handler:e,id:t,type:r,eventName:i}of s){const s=e(...n);this._setWatcher(i,r,t,s,...n)}return this}_emit(e,...t){const[n,s=""]=e.split("."),r=this._matchHandlers(n,s);for(const{handler:e,id:n,type:s,eventName:i}of r){const r=e(...t);this._setWatcher(i,s,n,r,...t)}}_matchHandlers(e,t){const n=this.events.get(e)||[];return t?n.filter((e=>e.type===t)).map((t=>{const{handler:n,id:s,type:r}=t;return{handler:n,id:s,type:r,eventName:e}})):n.map((t=>{const{handler:n,id:s,type:r}=t;return{handler:n,id:s,type:r,eventName:e}}))}_uuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}_setWatcher(e,t,n,s,...r){t||(t="global");const i=`${e}-${t}-${n}`;if(this.eventEmitterWatcher.has(i)){const e=this.eventEmitterWatcher.get(i).count,t=this.eventEmitterWatcher.get(i).details;this.eventEmitterWatcher.set(i,{count:e+1,details:[...t,{result:s,time:new Date,args:r}]})}else this.eventEmitterWatcher.set(i,{count:1,details:[{result:s,time:new Date,args:r}]})}watch(){return this.eventEmitterWatcher}}return s.version="v0.0.1",s})),"undefined"!=typeof window&&(window._PrettyEventEmitter_VERSION_="1.0.0");