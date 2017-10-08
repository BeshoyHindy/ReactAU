webpackJsonp([17],{328:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=t(0),n=(t.n(r),t(91)),o=t(804),a=t(16),s=t(833),u=t(89),l=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(i,t,r,n){var o=i&&i.defaultProps,a=arguments.length-3;if(t||0===a||(t={}),t&&o)for(var s in o)void 0===t[s]&&(t[s]=o[s]);else t||(t=o||{});if(1===a)t.children=n;else if(a>1){for(var u=Array(a),l=0;l<a;l++)u[l]=arguments[l+3];t.children=u}return{$$typeof:e,type:i,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}();t(834);var d=l(u.BigHeader,{smallTitle:"Provide friendly services and reliable support"},void 0,"About Us"),c=l("div",{className:"col-sm-9"},void 0,l(u.OrangeBoard,{},void 0,l("p",{},void 0,"At ",l("span",{className:"text_logo"},void 0,l("strong",{},void 0,"Hi-Tech Digital CCTV")),", our aim is to provide you with ",l("b",{},void 0,"professional")," advice through our ",l("b",{},void 0,"experience")," to satisfy all your security surveillance needs through our ",l("b",{},void 0,"friendly services"),". We will only provide you with products of the highest ",l("b",{},void 0,"quality")," for your surveillance soultion and will continue to provide an ongoing ",l("b",{},void 0,"reliable")," support."),l("p",{},void 0,"Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its ",l("b",{},void 0,"quality")," while still maintaining an ",l("b",{},void 0,"affordable")," price."),l("p",{},void 0,"To meet all your needs, we endeavour to ",l("b",{},void 0,"explain")," all the functions and features of our products until you ",l("b",{},void 0,"understand")," them ",l("b",{},void 0,"clearly")," before you make any decisions. We will continue to provide ",l("b",{},void 0,"friendly")," services and ",l("b",{},void 0,"reliable")," support to our customers to ensure the best results can be obtained from our products."))),p=l("div",{className:"col-sm-3"},void 0,l("img",{className:"img-responsive asia center",alt:"Ausrtralian Security Industry Association Limited",title:"Ausrtralian Security Industry Association Limited",src:"/build/img/ASIALmemberjpeg_hires.jpg"})),m=l("div",{className:"col-sm-12"},void 0,l(u.BigHeader,{smallTitle:""},void 0,"Brands We Carry")),b=l("p",{className:"note"},void 0,"These logos are all copyright of their respective owners."),h=function(e){return l("div",{className:"container"},void 0,l("div",{className:"row"},void 0,l("div",{className:"col-lg-12"},void 0,l(u.Breadcrumb,{linkPair:[{link:"/home",desc:"Home"},{link:"",desc:"About Us"}]}),d),c,p,m,l("div",{className:"col-sm-12 brand"},void 0,b,l("table",{className:"table borderless"},void 0,l("tbody",{},void 0,s.a.reduce(function(e,i,t){return t%4==0?e.push([i]):e[e.length-1].push(i),e},[]).map(function(e,i){return l("tr",{},i,e.map(function(e,i){return l("td",{},i,l(n.ImageLoader,{src:e.img,alt:e.brand,title:e.brand,minHeight:"60px"}))}))}))))))};i.default=t.i(a.b)(null)(t.i(o.a)(h,[]))},804:function(e,i,t){"use strict";function r(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function n(e,i){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?e:i}function o(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(e,i):e.__proto__=i)}function a(e,i){return function(t){function a(){return r(this,a),n(this,t.apply(this,arguments))}return o(a,t),a.fetchData=function(e){var t=e.dispatch,r=e.params,n=void 0===r?{}:r,o=e.authorize,a=void 0===o?[]:o,s=e.device,u=p.concat(i),l=u.map(function(e){return e?t(e({params:n,device:s})):null});return a&&a.length&&l.concat(a.map(function(e){switch(e){case"admin":return t(u.userCheckAdmin());case"normal":return t(u.userCheckAuth());case"reAuth":return t(u.userReAuth());default:return null}})),Promise.all(l)},a.prototype.componentDidUpdate=function(e){var i=this.props,t=i.location,r=(i.dispatch,e.location);(t&&(t.pathname!==r.pathname||t.search!==r.search)||!1)&&this._fetchDataOnClient()},a.prototype.componentDidMount=function(){var e=this.props,i=e.authorize,t=e.dispatch;if(c){if(i&&i.length){var r=i.map(function(e){switch(e){case"admin":return t(authActions.userCheckAdmin());case"normal":return t(authActions.userCheckAuth());case"reAuth":return t(authActions.userReAuth());default:return null}});Promise.all(r)}}else this._fetchDataOnClient();c=!1},a.prototype._fetchDataOnClient=function(){a.fetchData({dispatch:this.props.dispatch,params:this.props.match.params,authorize:this.props.authorize})},a.prototype.render=function(){return u.a.createElement(e,this.props)},a}(u.a.Component)}i.a=a;var s=t(0),u=t.n(s),l=t(289),d=t(287),c=!0,p=[l.a,d.a]},833:function(e,i,t){"use strict";t.d(i,"a",function(){return r});var r=[{brand:"BOSCH",img:"/build/img/brands/bosch.jpg"},{brand:"DigiGuard",img:"/build/img/brands/DigiGuard.jpg"},{brand:"EverFocus",img:"/build/img/brands/everfocus.png"},{brand:"FUTURO",img:"/build/img/brands/futuro.png"},{brand:"Honeywell",img:"/build/img/brands/honeywell.gif"},{brand:"HIKVISION",img:"/build/img/brands/hikvision.png"},{brand:"Haakili",img:"/build/img/brands/Haakili.jpg"},{brand:"iCATCH",img:"/build/img/brands/icatch.png"},{brand:"KCE",img:"/build/img/brands/kce.gif"},{brand:"Secuzone",img:"/build/img/brands/secuzone.png"},{brand:"Samsung",img:"/build/img/brands/asmsung_l.jpg"},{brand:"UNIMO",img:"/build/img/brands/unimo.jpg"}]},834:function(e,i){}});