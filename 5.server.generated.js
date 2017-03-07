exports.ids = [5];
exports.modules = {

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _connectDataFetchers = __webpack_require__(205);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

var _ProductIndexSidebar = __webpack_require__(507);

var _ProductIndexSidebar2 = _interopRequireDefault(_ProductIndexSidebar);

var _ProductIndex = __webpack_require__(506);

var _Shared = __webpack_require__(204);

var _RouteData = __webpack_require__(105);

var _ProductTblSettings = __webpack_require__(479);

var _productsActions = __webpack_require__(474);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (false) {
	require('./product.scss');
}

var _ref = _react2.default.createElement(_ProductIndex.ProductIndex, null);

var _ref2 = _react2.default.createElement(_ProductIndexSidebar2.default, null);

var ProductsP = function (_React$Component) {
	_inherits(ProductsP, _React$Component);

	function ProductsP(props) {
		_classCallCheck(this, ProductsP);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.getProductContent = _this.getProductContent.bind(_this);
		_this.getProductSidebar = _this.getProductSidebar.bind(_this);
		return _this;
	}

	ProductsP.prototype.getProductContent = function getProductContent() {
		if (!this.props.content) {
			return _ref;
		}
		var ProductsTbl = this.props.params.ProductsTbl;
		var filtered = this.props.products;
		if (ProductsTbl && ProductsTbl !== "All") {
			filtered = this.props.products.filter(function (item) {
				return item.type == ProductsTbl || item.brand == ProductsTbl;
			});
		}
		var ProductContentComponentElement = _react2.default.cloneElement(this.props.content, { products: filtered, productType: this.props.params.product, ajaxState: this.props.ajaxState });
		return ProductContentComponentElement;
	};

	ProductsP.prototype.getProductSidebar = function getProductSidebar() {
		if (!this.props.sidebar) {
			return _ref2;
		}
		var ProductSidebarComponentElement = _react2.default.cloneElement(this.props.sidebar, { products: this.props.products, productType: this.props.params.product, ProductsTbl: this.props.params.ProductsTbl });
		return ProductSidebarComponentElement;
	};

	ProductsP.prototype.render = function render() {
		var linkpair = [{ link: "Home", desc: "Home" }, { link: "/products", desc: "Products" }];
		this.props.params.product && linkpair.push({ link: "/products/" + this.props.params.product + "/All", desc: this.props.params.product });
		this.props.params.ProductsTbl && linkpair.push({ link: "", desc: this.props.params.ProductsTbl });

		return _react2.default.createElement(
			'div',
			{ className: 'container' },
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-lg-12' },
					_react2.default.createElement(_Shared.Breadcrumb, { linkPair: linkpair })
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-md-3 col-lg-2 hidden-sm hidden-xs sidebar' },
					this.getProductSidebar()
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-md-9 col-lg-10 roghtcontent' },
					this.getProductContent()
				)
			)
		);
	};

	return ProductsP;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
	return {
		products: state.products,
		ajaxState: state.ajaxCallsInProgress
	};
}

var ProductsPage = (0, _reactRedux.connect)(mapStateToProps)((0, _connectDataFetchers2.default)(ProductsP, [_productsActions.loadProducts]));

exports.default = ProductsPage;

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.loadProducts = loadProducts;
exports.loadProductList = loadProductList;

var _actionTypes = __webpack_require__(9);

var types = _interopRequireWildcard(_actionTypes);

var _ProductsApi = __webpack_require__(208);

var _ProductsApi2 = _interopRequireDefault(_ProductsApi);

var _ajaxStatusActions = __webpack_require__(104);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadProductsSuccess = function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products: products };
};

function loadProducts(detail) {
  return function (dispatch) {
    dispatch((0, _ajaxStatusActions.beginAjaxCall)());
    return _ProductsApi2.default.getAllProducts(detail.params.product, detail.params.ProductsTbl).then(function (products) {
      dispatch(loadProductsSuccess(products));
    }).catch(function (error) {
      dispatch((0, _ajaxStatusActions.ajaxCallError)());
      throw error;
    });
  };
}

function loadProductList(product) {
  return function (dispatch) {
    dispatch((0, _ajaxStatusActions.beginAjaxCall)());
    return _ProductsApi2.default.getAllProducts(product.params.cat, 'All').then(function (products) {
      dispatch(loadProductsSuccess(products));
    }).catch(function (error) {
      dispatch((0, _ajaxStatusActions.ajaxCallError)());
      throw error;
    });
  };
}

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Metadata = undefined;

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlarmMetadata = [{
				"columnName": "imageUrl",
				"order": 1,
				"locked": true,
				"visible": true,
				"customComponent": '',
				"displayName": "Image",
				"sortable": false,
				"cssClassName": "tblImage"
}, {
				"columnName": "brand",
				"order": 2,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Brand"
}, {
				"columnName": "name",
				"order": 3,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Model"
}, {
				"columnName": "channel",
				"order": 4,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Channel"
}, {
				"columnName": "remote",
				"order": 5,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Remote View"
}, {
				"columnName": "compression",
				"order": 6,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Compression"
}, {
				"columnName": "videoout",
				"order": 7,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Video Output"
}, {
				"columnName": "_id",
				"order": 8,
				"locked": true,
				"visible": false,
				"displayName": ""
}];

var KitMetadata = [{
				"columnName": "imageUrl",
				"order": 1,
				"locked": true,
				"visible": true,
				"customComponent": '',
				"displayName": "Image",
				"sortable": false,
				"cssClassName": "tblImage"
}, {
				"columnName": "brand",
				"order": 2,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Brand"
}, {
				"columnName": "type",
				"order": 3,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "System"
}, {
				"columnName": "name",
				"order": 4,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Model"
}, {
				"columnName": "channel",
				"order": 5,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Channel"
}, {
				"columnName": "remote",
				"order": 6,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Remote View"
}, {
				"columnName": "backup",
				"order": 7,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Backup"
}, {
				"columnName": "PoEport",
				"order": 8,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "PoE Port"
}, {
				"columnName": "videoout",
				"order": 9,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Video Output"
}, {
				"columnName": "_id",
				"order": 10,
				"locked": true,
				"visible": false,
				"displayName": ""
}];

var DvrMetadata = [{
				"columnName": "imageUrl",
				"order": 1,
				"locked": true,
				"visible": true,
				"customComponent": '',
				"displayName": "Image",
				"sortable": false,
				"cssClassName": "tblImage"
}, {
				"columnName": "brand",
				"order": 2,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Brand"
}, {
				"columnName": "type",
				"order": 3,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "System"
}, {
				"columnName": "name",
				"order": 4,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Model"
}, {
				"columnName": "channel",
				"order": 5,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Channel"
}, {
				"columnName": "remote",
				"order": 6,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Remote View"
}, {
				"columnName": "backup",
				"order": 7,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Backup"
}, {
				"columnName": "videoout",
				"order": 8,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Video Output"
}, {
				"columnName": "_id",
				"order": 9,
				"locked": true,
				"visible": false,
				"displayName": ""
}];

var CctvMetadata = [{
				"columnName": "imageUrl",
				"order": 1,
				"locked": true,
				"visible": true,
				"customComponent": '',
				"displayName": "Image",
				"sortable": false,
				"cssClassName": "tblImage"
}, {
				"columnName": "brand",
				"order": 2,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Brand"
}, {
				"columnName": "type",
				"order": 3,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "System"
}, {
				"columnName": "name",
				"order": 4,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Model"
}, {
				"columnName": "sensor",
				"order": 5,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Sensor"
}, {
				"columnName": "resolution",
				"order": 6,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Resolution"
}, {
				"columnName": "lens",
				"order": 7,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Lens"
}, {
				"columnName": "ir",
				"order": 8,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "IR"
}, {
				"columnName": "feature",
				"order": 9,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Feature"
}, {
				"columnName": "io",
				"order": 10,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Indoor Outdoor"
}, {
				"columnName": "_id",
				"order": 11,
				"locked": true,
				"visible": false,
				"displayName": ""
}];

var IntercomMetadata = [{
				"columnName": "imageUrl",
				"order": 1,
				"locked": true,
				"visible": true,
				"customComponent": '',
				"displayName": "Image",
				"sortable": false,
				"cssClassName": "tblImage"
}, {
				"columnName": "brand",
				"order": 2,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Brand"
}, {
				"columnName": "name",
				"order": 3,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Model"
}, {
				"columnName": "desc",
				"order": 4,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Description"
}, {
				"columnName": "_id",
				"order": 5,
				"locked": true,
				"visible": false,
				"displayName": ""
}];

var Metadata = {
				DVR: DvrMetadata,
				NVR: DvrMetadata,
				KIT: KitMetadata,
				CCTV: CctvMetadata,
				ALARM: AlarmMetadata,
				INTERCOM: IntercomMetadata
};

exports.Metadata = Metadata;

/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ProductIndex = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _Shared = __webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _react2.default.createElement(
	"div",
	null,
	_react2.default.createElement(
		_Shared.Paragraph,
		{ smallTitle: "Lorem ipsum dolor sit amet", title: "DVR" },
		"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
	),
	_react2.default.createElement(
		_Shared.Paragraph,
		{ smallTitle: "Lorem ipsum dolor sit amet", title: "Kit" },
		"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
	),
	_react2.default.createElement(
		_Shared.Paragraph,
		{ smallTitle: "Lorem ipsum dolor sit amet", title: "CCTV Camera" },
		"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
	),
	_react2.default.createElement(
		_Shared.Paragraph,
		{ smallTitle: "Lorem ipsum dolor sit amet", title: "Instrusion Alarm" },
		"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
	),
	_react2.default.createElement(
		_Shared.Paragraph,
		{ smallTitle: "Lorem ipsum dolor sit amet", title: "Video Intercom" },
		"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
	)
);

var ProductIndex = function ProductIndex() {
	return _ref;
};

exports.ProductIndex = ProductIndex;

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _RouteData = __webpack_require__(105);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductIndexSidebar = function ProductIndexSidebar() {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'col-sm-12 cat' },
			_react2.default.createElement(
				'ul',
				null,
				_react2.default.createElement(
					'li',
					null,
					'Products:',
					_react2.default.createElement(
						'ul',
						null,
						_RouteData.navData.filter(function (item) {
							return item.name === "products";
						}).reduce(function (result, item) {
							return item;
						}, {}).sub.map(function (item, id) {
							return _react2.default.createElement(
								'li',
								{ key: id },
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: item.link },
									item.desc
								)
							);
						})
					)
				)
			)
		)
	);
};
exports.default = ProductIndexSidebar;

/***/ })

};;