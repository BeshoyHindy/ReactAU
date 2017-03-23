exports.ids = [2];
exports.modules = {

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableTblTd", function() { return SortableTblTd; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


var SortableTblTd = function SortableTblTd(props) {
	var CustomTd = props.customTd;
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		'tr',
		null,
		props.dKey.map(function (item, id) {
			var CustomTdComponent = null;
			CustomTdComponent = CustomTd && CustomTd.filter(function (i) {
				return i.keyItem === item;
			}).reduce(function (result, item) {
				return item;
			}, {}).custd;

			if (!CustomTd) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'td',
				{ key: id },
				props.tdData[item]
			);

			if (CustomTdComponent) {
				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CustomTdComponent, _extends({ key: id }, props, { tdData: props.tdData[item], field: item, rowData: props.tdData }));
			}

			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'td',
				{ key: id },
				props.tdData[item]
			);
		})
	);
};
SortableTblTd.propTypes = {
	tdData: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	dKey: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.array,
	customTd: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.array
};



/***/ })

};;