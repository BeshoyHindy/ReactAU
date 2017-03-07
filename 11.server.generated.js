exports.ids = [11];
exports.modules = {

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _RouteData = __webpack_require__(105);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Classify = function Classify(props) {
	return _react2.default.createElement(
		'li',
		null,
		props.title,
		_react2.default.createElement(
			'ul',
			null,
			_react2.default.createElement(
				'li',
				{ className: props.isActive('All') },
				_react2.default.createElement(
					_reactRouter.Link,
					{ to: '/products/' + props.productType + '/All' },
					'All (',
					props.count.All,
					')'
				)
			),
			props.data.map(function (item, index) {
				return _react2.default.createElement(
					'li',
					{ key: index, className: props.isActive(item) },
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: '/products/' + props.productType + '/' + item },
						' ',
						item,
						' (',
						props.count[item],
						')'
					)
				);
			})
		)
	);
};

var _ref = _react2.default.createElement('div', null);

var ProductCategorySidebar = function (_React$Component) {
	_inherits(ProductCategorySidebar, _React$Component);

	function ProductCategorySidebar(props) {
		_classCallCheck(this, ProductCategorySidebar);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			selected: ''
		};
		_this.isActive = _this.isActive.bind(_this);
		return _this;
	}

	ProductCategorySidebar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (!(0, _RouteData.isvalidRoute)(this.props.productType, this.props.ProductsTbl)) return;
		var oldId = this.props.productType;
		var newId = nextProps.product;
		var oldTblId = this.props.ProductsTbl;
		var newTblId = nextProps.ProductsTbl;

		if (oldTblId && newTblId !== oldTblId) this.setState({ selected: nextProps.ProductsTbl });
	};

	ProductCategorySidebar.prototype.isActive = function isActive(value) {
		return value === this.state.selected ? 'active' : '';
	};

	ProductCategorySidebar.prototype.uniqArray = function uniqArray(arrArg) {
		var count = {};
		var a = [];
		a = arrArg.filter(function (elem, pos, arr) {
			count[elem] === undefined && (count[elem] = 0);
			count[elem]++;
			return arr.indexOf(elem) == pos;
		});
		count.All = arrArg.length;
		return { a: a, count: count };
	};

	ProductCategorySidebar.prototype.render = function render() {
		if (!(0, _RouteData.isvalidRoute)(this.props.productType, this.props.ProductsTbl)) {
			return _ref;
		} else {
			var brands = this.uniqArray(this.props.products.map(function (item, index) {
				return item.brand;
			}));
			var type = this.uniqArray(this.props.products.map(function (item, index) {
				return item.type;
			}));
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'col-sm-12 cat' },
					_react2.default.createElement(
						'ul',
						null,
						_react2.default.createElement(Classify, _extends({ title: 'Brand:', data: brands.a, count: brands.count, isActive: this.isActive }, this.props)),
						_react2.default.createElement(Classify, _extends({ title: 'System:', data: type.a, count: type.count, isActive: this.isActive }, this.props))
					)
				)
			);
		}
	};

	return ProductCategorySidebar;
}(_react2.default.Component);

exports.default = ProductCategorySidebar;

/***/ })

};;