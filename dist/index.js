module.exports=function(e){function t(i){if(r[i])return r[i].exports;var n=r[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,i){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t){e.exports=require("mobx")},function(e,t,r){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function n(e,t,r,i){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(i):void 0})}function o(e,t,r,i,n){var o={};return Object.keys(i).forEach(function(e){o[e]=i[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=r.slice().reverse().reduce(function(r,i){return i(e,t,r)||r},o),n&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(n):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.FormStore=t.Validation=void 0;var u,s,l,p,c,f,v,y=function(){function e(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,r,i){return r&&e(t.prototype,r),i&&e(t,i),t}}(),d=r(0),h=(s=u=function(){function e(t,r){a(this,e),this.rule=null,this.message=null,this.rule=t,this.message=r}return y(e,[{key:"isValid",value:function(e){return this.rule instanceof RegExp&&!this.rule.test(e)||this.rule instanceof Function&&!this.rule(e)}}]),e}(),u.EMAIL_REGEX=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,u.REQUIRED_REGEX=/^.+$/,s),b=(l=d.action.bound,p=function(){function e(){a(this,e),n(this,"valueMap",c,this),n(this,"hasTried",f,this),this.validationMap=new Map,n(this,"refs",v,this)}return y(e,[{key:"clear",value:function(){var e=this;this.valueMap.keys().forEach(function(t){return e.hasTried.delete(t)}),this.valueMap.clear()}},{key:"getErrorMessages",value:function(e){return this.errorMessagesMap.get(e)||[]}},{key:"invalidationsMap",get:function(){var e=this,t=new Map;return this.valueMap.forEach(function(r,i){var n=e.validationMap.get(i)||[],o=n.filter(function(e){return e.isValid(r)});o&&o.length>0&&t.set(i,o)}),t}},{key:"firstErrorMessage",get:function(){var e=[].concat(i(this.invalidationsMap.entries()))[0],t=void 0;return e&&e.length>1&&(t=e[1]),e&&t[0]?t[0].message:null}},{key:"firstInvalidRef",get:function(){var e=[].concat(i(this.invalidationsMap.entries()))[0];if(e&&e.length>1){var t=e[0];return this.refs.get(t)}}},{key:"valid",get:function(){return 0===this.invalidationsMap.size}},{key:"errorMessagesMap",get:function(){var e=new Map;return this.invalidationsMap.forEach(function(t,r){e.set(r,t.map(function(e){return e.message}))}),e}}]),e}(),c=o(p.prototype,"valueMap",[d.observable],{enumerable:!0,initializer:function(){return new Map}}),f=o(p.prototype,"hasTried",[d.observable],{enumerable:!0,initializer:function(){return new Map}}),v=o(p.prototype,"refs",[d.observable],{enumerable:!0,initializer:function(){return new Map}}),o(p.prototype,"clear",[l],Object.getOwnPropertyDescriptor(p.prototype,"clear"),p.prototype),o(p.prototype,"invalidationsMap",[d.computed],Object.getOwnPropertyDescriptor(p.prototype,"invalidationsMap"),p.prototype),o(p.prototype,"firstErrorMessage",[d.computed],Object.getOwnPropertyDescriptor(p.prototype,"firstErrorMessage"),p.prototype),o(p.prototype,"firstInvalidRef",[d.computed],Object.getOwnPropertyDescriptor(p.prototype,"firstInvalidRef"),p.prototype),o(p.prototype,"valid",[d.computed],Object.getOwnPropertyDescriptor(p.prototype,"valid"),p.prototype),o(p.prototype,"errorMessagesMap",[d.computed],Object.getOwnPropertyDescriptor(p.prototype,"errorMessagesMap"),p.prototype),p);t.Validation=h,t.FormStore=b}]);
//# sourceMappingURL=index.js.map