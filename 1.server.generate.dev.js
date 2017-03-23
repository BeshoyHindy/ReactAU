exports.ids = [1];
exports.modules = {

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableTblTh", function() { return SortableTblTh; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var SortableTblTh = function (_React$Component) {
	_inherits(SortableTblTh, _React$Component);

	function SortableTblTh(props) {
		_classCallCheck(this, SortableTblTh);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			sortCssClass: "fa fa-sort"
		};
		_this.sort = _this.sort.bind(_this);
		return _this;
	}

	SortableTblTh.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
		var a = "fa fa-sort";
		switch (nextProps.asc) {
			case null:
				a = "fa fa-sort";
				break;
			case true:
				a = "fa fa-sort-amount-asc";
				break;
			case false:
				a = "fa fa-sort-amount-desc";
				break;
		}
		//console.log(a);
		if (nextProps.asc !== this.props.asc) {
			this.setState({ sortCssClass: a });
		}
	};

	SortableTblTh.prototype.sort = function sort() {
		this.props.sortData(this.props.dataKey, !this.props.asc);
	};

	SortableTblTh.prototype.render = function render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"th",
			{ onClick: this.sort },
			" ",
			this.props.children,
			" ",
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: this.state.sortCssClass, "aria-hidden": "true" })
		);
	};

	return SortableTblTh;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

SortableTblTh.propTypes = {
	asc: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool,
	sortData: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func.isRequired,
	dataKey: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
	children: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.node
};



/***/ })

};;