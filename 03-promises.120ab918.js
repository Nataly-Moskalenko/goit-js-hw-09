!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequire7bc7;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequire7bc7=r);var i=r("h6c0i"),u=document.querySelector(".form"),c=function(e,n){var t=Math.random()>.3;return new Promise((function(o,r){setTimeout((function(){t?o("✅ Fulfilled promise ".concat(e," in ").concat(n,"ms")):r("❌ Rejected promise ".concat(e," in ").concat(n,"ms"))}),n)}))};u.addEventListener("submit",(function(n){n.preventDefault();for(var t=n.currentTarget.elements,o=t.delay,r=t.step,u=t.amount,a=0;a<Number(u.value);a+=1)c(a+1,Number(o.value)+Number(r.value)*a).then((function(n){e(i).Notify.success(n)})).catch((function(n){e(i).Notify.failure(n)}))}))}();
//# sourceMappingURL=03-promises.120ab918.js.map