var a={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function v(){if(d)return n;d=1;var e=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function i(x,r,t){var s=null;if(t!==void 0&&(s=""+t),r.key!==void 0&&(s=""+r.key),"key"in r){t={};for(var u in r)u!=="key"&&(t[u]=r[u])}else t=r;return r=t.ref,{$$typeof:e,type:x,key:s,ref:r!==void 0?r:null,props:t}}return n.Fragment=o,n.jsx=i,n.jsxs=i,n}var c;function l(){return c||(c=1,a.exports=v()),a.exports}var R=l();const w=()=>{const e=navigator.userAgent||navigator.vendor||window.opera;if(console.log(`User Agent: ${e}`),/android/i.test(e)||/iPad|iPhone|iPod/.test(e)&&!window.MSStream)return!0;const o="ontouchstart"in window||navigator.maxTouchPoints>0,i=window.innerWidth<=768;return!!(o&&i||window.matchMedia&&window.matchMedia("(pointer: coarse)").matches)};export{w as i,R as j};
