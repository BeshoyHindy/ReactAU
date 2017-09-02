exports.ids = [1];
exports.modules = {

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_DetailsApi__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_productsActions__ = __webpack_require__(93);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var BaseProductDeleteComponent = function (_React$Component) {
	_inherits(BaseProductDeleteComponent, _React$Component);

	function BaseProductDeleteComponent(props) {
		_classCallCheck(this, BaseProductDeleteComponent);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.deleteItem = _this.deleteItem.bind(_this);
		return _this;
	}

	BaseProductDeleteComponent.prototype.deleteItem = function deleteItem() {
		var _this2 = this;

		__WEBPACK_IMPORTED_MODULE_3__api_DetailsApi__["a" /* default */].deleteProduct(this.props.rowData._id).then(function (ret) {
			_this2.props.actions.loadProductList({ params: { cat: _this2.props.productType || "DVR", subType: "All" } });
			ret && ret.name && alert('Success!! Product [' + ret.name + '] has been deleted');
		}).catch(function (error) {
			throw error;
		});
	};

	BaseProductDeleteComponent.prototype.render = function render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'td',
			null,
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'button', className: 'btn btn-danger', value: 'Delete', onClick: this.deleteItem })
		);
	};

	return BaseProductDeleteComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

BaseProductDeleteComponent.propTypes = {
	rowData: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object,
	actions: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired,
	productType: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
	//console.log("mapStateToProps", state);
	return {};
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		actions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["a" /* bindActionCreators */])({ loadProductList: __WEBPACK_IMPORTED_MODULE_4__actions_productsActions__["b" /* loadProductList */] }, dispatch)
	};
};

/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(BaseProductDeleteComponent));

/***/ })

};;