webpackJsonp([38,50],{315:function(e,r,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function n(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}r.__esModule=!0;var i=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(r,t,s,a){var o=r&&r.defaultProps,n=arguments.length-3;if(t||0===n||(t={}),t&&o)for(var i in o)void 0===t[i]&&(t[i]=o[i]);else t||(t=o||{});if(1===n)t.children=a;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];t.children=l}return{$$typeof:e,type:r,key:void 0===s?null:""+s,ref:null,props:t,_owner:null}}}(),l=(t(16),t(0)),d=s(l),c=t(156),u=t(306),p=s(u),m=t(84),f=t(62),v=i("strong",{},void 0,"Oops!"),h=i("div",{className:"panel-heading"},void 0,i("h3",{className:"panel-title"},void 0,"Add User")),b=i("div",{className:"col-lg-6 "},void 0,i(c.Field,{name:"picture",component:f.renderDropzoneInput,label:"Add a picture"}),i(c.Field,{name:"username",component:f.renderField,type:"text",label:"User Name"})),w=i(c.Field,{name:"email",component:f.renderField,type:"email",label:"E-Mail",require:!0}),y=i(c.Field,{name:"password",component:f.renderField,type:"password",label:"Password",require:!0}),g=i(c.Field,{name:"passwordConfirm",component:f.renderField,type:"password",label:"Confirm Password",require:!0}),F=i("hr",{}),S=function(e){function r(t){a(this,r);var s=o(this,e.call(this,t));return s.state={upload:0,errorMessage:"",success:!1},s.handleFormSubmit=s.handleFormSubmit.bind(s),s.renderAlert=s.renderAlert.bind(s),s.fileProgress=s.fileProgress.bind(s),s}return n(r,e),r.prototype.handleFormSubmit=function(e){var r=this,t=function(e){return r.fileProgress(e)},s=new FormData;s.append("password",e.password),s.append("email",e.email),s.append("username",e.username),s.append("accessRight",e.accessRight),e.picture&&s.append("upload_picture",e.picture[0]),this.setState({upload:1}),p.default.addUser(s,t).then(function(e){r.setState({upload:0,errorMessage:"",success:!0})}).catch(function(e){r.setState({upload:0,errorMessage:"Process Fail, Error Message: "+e.err,success:!1})})},r.prototype.fileProgress=function(e){var r=Math.round(100*e.loaded/e.total);this.setState({upload:r})},r.prototype.renderAlert=function(){if(this.state.errorMessage||this.state.success)return i("div",{className:"alert "+(this.state.success?"alert-success":"alert-danger")},void 0,this.state.success?"Success !!":i("div",{},void 0,v," ",this.state.errorMessage," !!"))},r.prototype.render=function(){var e=this.props,r=e.handleSubmit,t=e.pristine,s=e.submitting;return i("div",{className:"col-lg-12 "},void 0,i(m.Breadcrumb,{linkPair:[{link:"/home",desc:"Home"},{link:"/admin/productChange/0",desc:"Administration"},{link:"/admin/addUser",desc:"Add User"}]}),i("div",{className:"well"},void 0,i("div",{className:"panel panel-danger add-user-panel"},void 0,h,i("div",{className:"panel-body sign-up"},void 0,i("form",{onSubmit:r(this.handleFormSubmit)},void 0,b,i("div",{className:"col-lg-6 "},void 0,w,y,g,i(c.Field,{name:"accessRight",component:f.renderSelectField,label:"User Type",options:[{value:"0",text:"Normal User"},{value:"8",text:"Administrator"}]})),i("div",{className:"col-lg-12"},void 0,this.renderAlert(),F,i("div",{},void 0,i("button",{type:"submit",disabled:t||s,className:"btn btn-warning submit-btn"},void 0,"Submit"))))))))},r}(d.default.Component),P=function(e){var r={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(r.email="Invalid email address"):r.email="Required",e.password||(r.password="Please enter a password"),e.passwordConfirm||(r.passwordConfirm="Please enter a password confirmation"),e.password!==e.passwordConfirm&&(r.password="Passwords must match"),r};r.default=(0,c.reduxForm)({form:"adduser",validate:P})(S)}});