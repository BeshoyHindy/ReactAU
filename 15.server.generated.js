exports.ids = [15];
exports.modules = {

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {
	require('./admin.scss');
}

var _ref = _react2.default.createElement(
	'h1',
	{ className: 'center-page' },
	' Unauthorized '
);

var AdminPage = function AdminPage(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'container' },
		_react2.default.createElement(
			'div',
			{ className: 'loading-wrap' },
			_react2.default.createElement(
				'div',
				{ className: 'ajax-loading-big ' + (!props.auth.success || !props.auth.user || !props.auth.user.accessRight || props.auth.user.accessRight !== 8 ? 'fade-show' : 'fade-hide') },
				_ref
			),
			_react2.default.createElement(
				'div',
				null,
				props.children
			)
		)
	);
};

function mapStateToProps(state, ownProps) {
	return {
		auth: state.auth
	};
}

AdminPage = (0, _reactRedux.connect)(mapStateToProps)(AdminPage);

exports.default = AdminPage;

/***/ })

};;