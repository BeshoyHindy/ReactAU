exports.ids = [12];
exports.modules = {

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _react2.default.createElement('div', null);

var ProductCategory = function ProductCategory(props) {
	return _react2.default.createElement(
		'div',
		null,
		props.children ? _react2.default.createElement(
			'div',
			null,
			' ',
			_react2.default.cloneElement(props.children, props),
			' '
		) : _ref
	);
};
exports.default = ProductCategory;

/***/ })

};;