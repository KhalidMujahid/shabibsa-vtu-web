if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const l=e=>n(e,c),o={module:{uri:c},exports:t,require:l};i[c]=Promise.all(s.map((e=>o[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-e20531c6"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BhAbneKd.css",revision:null},{url:"assets/index-LTwK-7uy.js",revision:null},{url:"index.html",revision:"2c6ef1eb7fe59cac49c4a87d26982a4b"},{url:"offline.html",revision:"649a13a037c00e646af4941c44712126"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"offline.html",revision:"649a13a037c00e646af4941c44712126"},{url:"icons/shabibsadata.png",revision:"439138fe214638bfb63579f36c1ab5f7"},{url:"manifest.webmanifest",revision:"742abcb8ff7a27b60c100388dff47000"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/\/$/,new e.NetworkFirst({cacheName:"offline-cache",plugins:[new e.ExpirationPlugin({maxEntries:10})]}),"GET"),e.registerRoute(/offline\.html$/,new e.CacheFirst({cacheName:"offline-page-cache",plugins:[]}),"GET")}));
