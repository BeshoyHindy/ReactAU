webpackJsonp([5],{312:function(e,t,n){"use strict";function r(e,t){return{auth:e.auth}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=(n.n(o),n(16)),i=n(765),u=n(307),c=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var u in a)void 0===n[u]&&(n[u]=a[u]);else n||(n=a||{});if(1===i)n.children=o;else if(i>1){for(var c=Array(i),s=0;s<i;s++)c[s]=arguments[s+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}();n(792);var s=c("h1",{className:"center-page"},void 0," Unauthorized "),l=function(e){var t=(e.match,e.routes),n=e.auth,r=e.level,o=e.Comps,a=e.url;return c("div",{className:"container"},void 0,c("div",{className:"loading-wrap"},void 0,c("div",{className:"ajax-loading-big "+(n.success&&n.user&&n.user.accessRight&&8===n.user.accessRight?"fade-hide":"fade-show")},void 0,s),c("div",{},void 0,t.map(function(e){return c(u.a,{route:e,level:r,Comps:o,url:a},e.path+r)}))))};l=n.i(a.b)(r)(n.i(i.a)(l,[])),t.default=l},323:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=(n.n(r),n(765)),a=n(16),i=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var u in a)void 0===n[u]&&(n[u]=a[u]);else n||(n=a||{});if(1===i)n.children=o;else if(i>1){for(var c=Array(i),s=0;s<i;s++)c[s]=arguments[s+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),u=i("div",{className:"row"},void 0,i("div",{className:"col-xs-12"},void 0,i("h1",{className:"center-page"},void 0," Unauthorized "))),c=function(e){return u};t.default=n.i(a.b)(null)(n.i(o.a)(c,[]))},765:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){return function(n){function i(){return r(this,i),o(this,n.apply(this,arguments))}return a(i,n),i.fetchData=function(e){var n=e.dispatch,r=e.params,o=void 0===r?{}:r,a=e.authorize,i=void 0===a?[]:a,u=e.device,c=p.concat(t),s=c.map(function(e){return e?n(e({params:o,device:u})):null});return i&&i.length&&s.concat(i.map(function(e){switch(e){case"admin":return n(c.userCheckAdmin());case"normal":return n(c.userCheckAuth());case"reAuth":return n(c.userReAuth());default:return null}})),Promise.all(s)},i.prototype.componentDidUpdate=function(e){var t=this.props,n=t.location,r=(t.dispatch,e.location);(n.pathname!==r.pathname||n.search!==r.search)&&this._fetchDataOnClient()},i.prototype.componentDidMount=function(){var e=this.props,t=e.authorize,n=e.dispatch;if(f){if(t&&t.length){var r=t.map(function(e){switch(e){case"admin":return n(authActions.userCheckAdmin());case"normal":return n(authActions.userCheckAuth());case"reAuth":return n(authActions.userReAuth());default:return null}});Promise.all(r)}}else this._fetchDataOnClient();f=!1},i.prototype._fetchDataOnClient=function(){i.fetchData({dispatch:this.props.dispatch,params:this.props.match.params,authorize:this.props.authorize})},i.prototype.render=function(){return c.a.createElement(e,this.props)},i}(c.a.Component)}var u=n(0),c=n.n(u),s=n(268),l=n(265);t.a=i;var f=!0,p=[s.a,l.a]},792:function(e,t){}});