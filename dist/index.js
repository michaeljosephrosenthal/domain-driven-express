!function(e){function r(n){if(t[n])return t[n].exports;var u=t[n]={exports:{},id:n,loaded:!1};return e[n].call(u.exports,u,u.exports,r),u.loaded=!0,u.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(2)},function(e,r){e.exports=require("express")},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function u(e){var r=e.app,t=void 0===r?t:r,n=e.domains;return Object.values((0,i["default"])(n)).forEach(function(e){return t.use(e)}),t}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=u;var o=t(1),a=n(o),f=t(3),i=n(f);new a["default"]},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function u(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function o(e,r){var t=arguments.length<=2||void 0===arguments[2]?"":arguments[2];return Object.keys(r).forEach(function(n){var o=r[n],a=o.methods,f=o.handlers;a.forEach(function(r){var o;(o=e[r]).call.apply(o,[e,t+n].concat(u(f)))})}),e}function a(e){var r=e.prefix,t=e.routes;return o(c["default"].Router(),t,"/"+r)}function f(e){return Object.values(e).filter(function(e){return e.routes}).map(a)}Object.defineProperty(r,"__esModule",{value:!0}),r.domainMiddlewareGenerator=f;var i=t(1),c=n(i)}]);