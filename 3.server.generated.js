exports.ids = [3];
exports.modules = {

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(15);

var _lodash = __webpack_require__(488);

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = __webpack_require__(39);

var _ImageLoader = __webpack_require__(206);

var _SortableTbl = __webpack_require__(468);

var _ProductTblSettings = __webpack_require__(479);

var _RouteData = __webpack_require__(105);

var _AdminEditDelete = __webpack_require__(485);

var _AdminEditDelete2 = _interopRequireDefault(_AdminEditDelete);

var _StarsRated = __webpack_require__(473);

var _StarsRated2 = _interopRequireDefault(_StarsRated);

var _Favorite = __webpack_require__(480);

var _Favorite2 = _interopRequireDefault(_Favorite);

var _HeartToggle = __webpack_require__(469);

var _HeartToggle2 = _interopRequireDefault(_HeartToggle);

var _deviceAction = __webpack_require__(209);

var _connectDataFetchers = __webpack_require__(205);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import * as detailActions from '../../actions/detailsActions';


var BaseProductTblImageComponent = function BaseProductTblImageComponent(props) {
	return _react2.default.createElement(
		'td',
		{ style: { width: '170px', minWidth: '170px', backgroundColor: '#fff' } },
		_react2.default.createElement(
			_reactRouter.Link,
			{ to: _RouteData.routeBaseLink[props.productType] + props.rowData._id },
			_react2.default.createElement(_ImageLoader.ImageLoader, { src: props.tdData, minHeight: '100px',
				alt: props.rowData.brand + ' - ' + props.productType + ' - ' + props.rowData.type + ' - ' + props.rowData.name,
				title: props.rowData.brand + ' - ' + props.productType + ' - ' + props.rowData.type + ' - ' + props.rowData.name
			})
		)
	);
};

var _ref = _react2.default.createElement('input', { type: 'button', className: 'btn btn-warning', value: 'Edit' });

var BaseProductEditComponent = function BaseProductEditComponent(props) {
	return _react2.default.createElement(
		'td',
		null,
		_react2.default.createElement(
			_reactRouter.Link,
			{ to: '' + props.rowData.edit + props.rowData._id },
			_ref
		)
	);
};

var _ref2 = _react2.default.createElement('div', null);

var _ref5 = _react2.default.createElement('img', { src: '/img/ajax-loader.gif', alt: '' });

var _ref6 = _react2.default.createElement(
	'div',
	{ className: 'bubble ' },
	'list view'
);

var _ref7 = _react2.default.createElement(
	'div',
	{ className: 'bubble ' },
	'grid view'
);

var ProductsTblPage = function (_React$Component) {
	_inherits(ProductsTblPage, _React$Component);

	function ProductsTblPage(props) {
		_classCallCheck(this, ProductsTblPage);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			gridView: !!(props.device.phone || props.device.mobile),
			manualSetGV: false
		};
		_this.setGridListView = _this.setGridListView.bind(_this);
		_this.handleResize = _this.handleResize.bind(_this);
		return _this;
	}

	ProductsTblPage.prototype.componentDidMount = function componentDidMount() {
		window.addEventListener('resize', this.handleResize, false);
	};

	ProductsTblPage.prototype.componentWillUnmount = function componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	};

	ProductsTblPage.prototype.handleResize = function handleResize() {
		var device = this.props.device;

		var gv = window.outerWidth < 736 || device.phone || device.mobile;
		if (!this.state.manualSetGV && gv !== this.state.gridView) {
			this.setState({
				gridView: gv,
				manualSetGV: false
			});
		}
	};

	ProductsTblPage.prototype.setGridListView = function setGridListView(e) {
		var gridView = e.target.getAttribute("data-view") === "grid";
		this.setState({
			gridView: gridView,
			manualSetGV: true
		});
	};

	ProductsTblPage.prototype.render = function render() {
		var _this2 = this;

		var device = this.props.device;

		var mobile = !!(device.phone || device.mobile);
		var viewSettingStyle = { display: mobile ? "none" : "block" };
		if (!this.props.productType || !_ProductTblSettings.Metadata[this.props.productType] || this.props.products === []) {
			return _ref2;
		} else {
			var col = [],
			    tHead = [];
			var colMetadata = _ProductTblSettings.Metadata[this.props.productType];
			for (var _iterator = colMetadata, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref3;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref3 = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					_ref3 = _i.value;
				}

				var item = _ref3;

				if (item.visible) {
					col.push(item.columnName);
					tHead.push(item.displayName);
				}
			}

			if (this.props.edit) {
				tHead.push("Edit");
				col.push("edit");
			}
			if (this.props.delete) {
				tHead.push("Delete");
				col.push("delete");
			}

			var data = (0, _lodash2.default)(this.props.products);
			for (var _iterator2 = data, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref4;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref4 = _iterator2[_i2++];
				} else {
					_i2 = _iterator2.next();
					if (_i2.done) break;
					_ref4 = _i2.value;
				}

				var _item = _ref4;

				if (_item.images && _item.images[0]) {
					_item.imageUrl = _item.images[0];
					delete _item.images;
				}
				if (this.props.edit) _item.edit = this.props.editBaseLink;
				if (this.props.delete) _item.delete = "";
			}

			// console.log(Metadata[this.props.productType]);
			return _react2.default.createElement(
				'div',
				{ className: 'loading-wrap' },
				_react2.default.createElement(
					'div',
					{ className: 'ajax-loading-big ' + (this.props.ajaxState > 0 ? 'fade-show' : 'fade-hide') },
					_ref5
				),
				_react2.default.createElement(
					'ul',
					{ className: 'app-view', style: viewSettingStyle },
					_react2.default.createElement(
						'li',
						{ className: 'hiddenView fa fa-th-list btn-list', 'data-view': 'list', onClick: this.setGridListView },
						_ref6
					),
					_react2.default.createElement(
						'li',
						{ className: 'hiddenView fa fa-th btn-list', 'data-view': 'grid', onClick: this.setGridListView },
						_ref7
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'list-container', style: { display: this.state.gridView ? "none" : "block" } },
					_react2.default.createElement(_SortableTbl.SortableTbl, { tblData: data,
						tHead: tHead,
						customTd: [{ custd: BaseProductTblImageComponent, keyItem: "imageUrl" }, { custd: BaseProductEditComponent, keyItem: "edit" }, { custd: _AdminEditDelete2.default, keyItem: "delete" }],
						dKey: col,
						productType: this.props.productType,
						actions: this.props.actions,
						router: this.props.router,
						params: this.props.params })
				),
				_react2.default.createElement(
					'div',
					{ className: 'grid-container', style: { display: this.state.gridView ? "block" : "none" } },
					data.map(function (item, id) {
						var c = 0;
						item.stars && (c = Math.round(item.stars.totalStars / item.stars.voteCount * 100) / 100);
						return _react2.default.createElement(
							'div',
							{ key: id, className: 'col-sm-6 col-md-4 Grid' },
							_react2.default.createElement(
								'div',
								{ className: 'block-wrap' },
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/products/' + _this2.props.productType + '/spec/' + item._id },
									_react2.default.createElement(
										'div',
										{ className: 'block' },
										_react2.default.createElement(
											'div',
											{ className: '' },
											_react2.default.createElement(_ImageLoader.ImageLoader, {
												src: item.imageUrl,
												minHeight: '200px',
												alt: item.brand + ' - ' + _this2.props.productType + ' - ' + item.type + ' - ' + item.name,
												title: item.brand + ' - ' + _this2.props.productType + ' - ' + item.type + ' - ' + item.name
											})
										),
										_react2.default.createElement(
											'div',
											{ className: 'title' },
											_react2.default.createElement(
												'span',
												{ className: 'favorite' },
												_react2.default.createElement('i', { className: 'fa fa-heart', style: { color: "#CC3300" } }),
												' ',
												item.favorite || 0
											),
											_react2.default.createElement(
												'span',
												{ className: 'rate' },
												_react2.default.createElement(_StarsRated2.default, { count: c })
											),
											_react2.default.createElement(
												'p',
												{ className: 'model ellipsis ' },
												item.name
											),
											_react2.default.createElement(
												'p',
												{ className: 'brand ellipsis ' },
												item.brand,
												' - ',
												item.type
											)
										)
									)
								)
							)
						);
					})
				)
			);
		}
	};

	return ProductsTblPage;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
	return {
		device: state.device
	};
}

ProductsTblPage = (0, _reactRedux.connect)(mapStateToProps)(ProductsTblPage);

exports.default = ProductsTblPage;

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SortableTbl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _SortableTblPager = __webpack_require__(470);

var _SortableTblTh = __webpack_require__(472);

var _SortableTblTd = __webpack_require__(471);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (false) {
	require('./SortableTbl.scss');
}

var _ref = _react2.default.createElement(
	'span',
	null,
	'Search'
);

var SortableTbl = function (_React$Component) {
	_inherits(SortableTbl, _React$Component);

	function SortableTbl(props) {
		_classCallCheck(this, SortableTbl);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			data: _this.props.tblData || [],
			asc: (_this.props.dKey || []).reduce(function (acc, cur) {
				var _Object$assign;

				return Object.assign({}, acc, (_Object$assign = {}, _Object$assign[cur] = null, _Object$assign));
			}, {}),
			filter: "",
			pagers: { paging: _this.props.paging, curr: 0, rowsPerPage: _this.props.defaultRowsPerPage }
		};
		//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
		_this.sortData = _this.sortData.bind(_this);
		_this.filter = _this.filter.bind(_this);
		_this.setCurrentPage = _this.setCurrentPage.bind(_this);
		_this.setRowsPerPage = _this.setRowsPerPage.bind(_this);

		return _this;
	}

	SortableTbl.prototype.componentWillMount = function componentWillMount() {};

	SortableTbl.prototype.componentDidMount = function componentDidMount() {};

	SortableTbl.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
		if (nextProps.tblData !== this.state.data) {
			this.setState({ data: nextProps.tblData });
		}
	};

	SortableTbl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

	SortableTbl.prototype.filter = function filter(e) {
		var newData = this.props.tblData.filter(function (item) {
			for (var key in item) {
				var v = item[key].toString().toLowerCase();
				if (v.indexOf(e.target.value.toLowerCase()) !== -1) {
					return true;
				}
			}
			return false;
		});
		this.setState({
			filter: e.target.value,
			data: newData
		});
	};

	SortableTbl.prototype.sortData = function sortData(dKey, nAsc) {
		var _Object$assign2;

		var newAsc = this.state.asc;
		var newData = this.state.data;
		newData.sort(function (a, b) {
			if (a[dKey] === b[dKey]) return 0;
			if (nAsc ? a[dKey] > b[dKey] : a[dKey] < b[dKey]) return 1;
			if (nAsc ? a[dKey] < b[dKey] : a[dKey] > b[dKey]) return -1;
			return 0;
		});
		for (var prop in newAsc) {
			newAsc[prop] = null;
		}
		this.setState({
			asc: Object.assign({}, newAsc, (_Object$assign2 = {}, _Object$assign2[dKey] = nAsc, _Object$assign2)),
			data: newData
		});
	};

	SortableTbl.prototype.setCurrentPage = function setCurrentPage(i) {
		var index = parseInt(i);
		this.setState({
			pagers: Object.assign({}, this.state.pagers, { curr: index })
		});
	};

	SortableTbl.prototype.setRowsPerPage = function setRowsPerPage(i) {
		var index = parseInt(i);
		var nCurr = this.state.pagers.curr;
		var pagesCount = Math.ceil(this.state.data.length / index);
		//console.log(this.state.pagers.curr, pagesCount, index);
		if (this.state.pagers.curr >= pagesCount) nCurr = pagesCount - 1;
		this.setState({
			pagers: Object.assign({}, this.state.pagers, { rowsPerPage: index, curr: nCurr })
		});
	};

	SortableTbl.prototype.render = function render() {
		var _this2 = this;

		var pageData = this.state.data;
		var pagers = this.state.pagers;
		var pagesCount = Math.ceil(this.state.data.length / pagers.rowsPerPage);
		if (pagers.paging) {
			pageData = pageData.slice(pagers.curr * pagers.rowsPerPage, (pagers.curr + 1) * pagers.rowsPerPage);
		}
		return _react2.default.createElement(
			'div',
			{ className: 'table-responsive' },
			_react2.default.createElement(
				'div',
				{ className: 'sortable-table' },
				this.props.search && _react2.default.createElement(
					'div',
					{ className: 'search-box' },
					_ref,
					' ',
					_react2.default.createElement('input', { className: 'search', type: 'text', name: '', value: this.state.filter, placeholder: 'Filter Result', onChange: this.filter })
				),
				pagers.paging ? _react2.default.createElement(_SortableTblPager.SortableTblPager, { curr: pagers.curr, totalPage: pagesCount, setCurrentPage: this.setCurrentPage,
					setRowsPerPage: this.setRowsPerPage, totalsCount: this.state.data.length, rowPerPage: pagers.rowsPerPage }) : "",
				_react2.default.createElement(
					'table',
					{ className: 'table table-hover table-striped' },
					_react2.default.createElement(
						'thead',
						null,
						_react2.default.createElement(
							'tr',
							null,
							this.props.dKey.map(function (item, id) {
								return _react2.default.createElement(
									_SortableTblTh.SortableTblTh,
									{ key: id, sortData: _this2.sortData, asc: _this2.state.asc[item], dataKey: item },
									_this2.props.tHead[parseInt(id)]
								);
							})
						)
					),
					_react2.default.createElement(
						'tbody',
						null,
						pageData.map(function (item, id) {
							return _react2.default.createElement(_SortableTblTd.SortableTblTd, _extends({ key: id, tdData: item }, _this2.props, { dKey: _this2.props.dKey, customTd: _this2.props.customTd }));
						})
					)
				)
			)
		);
	};

	return SortableTbl;
}(_react2.default.Component);

SortableTbl.defaultProps = {
	tblData: [],
	tHead: [],
	dKey: [],
	customTd: [],
	paging: true,
	search: true,
	defaultCSS: true,
	defaultRowsPerPage: 5
};

exports.SortableTbl = SortableTbl;

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeartToggle = function (_React$Component) {
	_inherits(HeartToggle, _React$Component);

	function HeartToggle(props) {
		_classCallCheck(this, HeartToggle);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			select: props.init
		};
		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	HeartToggle.prototype.handleClick = function handleClick(evt) {
		var nSelect = !this.state.select;
		this.setState(function (state, props) {
			return { select: nSelect };
		});
		this.props.selectIt && this.props.selectIt(nSelect);
	};

	HeartToggle.prototype.render = function render() {
		var r = 'fa fa-heart';
		if (!this.state.select) {
			r += '-o';
		}
		return _react2.default.createElement('i', { onClick: this.handleClick, className: r, style: { color: "#CC3300" } });
	};

	return HeartToggle;
}(_react2.default.Component);

HeartToggle.defaultProps = {
	init: false
};

exports.default = HeartToggle;

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SortableTblPager = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
	'label',
	{ htmlFor: 'rowsPerPage', className: 'SortableTblLabel' },
	' Show'
);

var _ref2 = _react2.default.createElement(
	'label',
	{ className: 'SortableTblLabel' },
	'entries'
);

var SortableTblPager = function (_React$Component) {
	_inherits(SortableTblPager, _React$Component);

	function SortableTblPager(props) {
		_classCallCheck(this, SortableTblPager);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			currPage: _this.props.curr,
			rowPerPage: _this.props.rowPerPage
		};
		_this.setPage = _this.setPage.bind(_this);
		_this.addPagge = _this.addPagge.bind(_this);
		_this.subPage = _this.subPage.bind(_this);
		_this.setCurrentPage = _this.setCurrentPage.bind(_this);
		_this.setRowsPerPage = _this.setRowsPerPage.bind(_this);

		return _this;
	}

	SortableTblPager.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		//constructor is only invoked when the component is first created. if data change, need to update on componentWillReceiveProps
		if (nextProps.curr !== this.state.currPage) {
			this.setState({ currPage: nextProps.curr });
		}
		if (nextProps.rowPerPage !== this.state.rowPerPage) {
			this.setState({ rowPerPage: nextProps.rowPerPage });
		}
	};

	SortableTblPager.prototype.setCurrentPage = function setCurrentPage(e) {
		this.setPage(parseInt(e.target.value));
	};

	SortableTblPager.prototype.addPagge = function addPagge() {
		if (this.state.currPage >= this.props.totalPage - 1) return;

		this.setPage(this.state.currPage + 1);
	};

	SortableTblPager.prototype.subPage = function subPage() {
		if (this.state.currPage < 1) return;

		this.setPage(this.state.currPage - 1);
	};

	SortableTblPager.prototype.setPage = function setPage(i) {
		this.props.setCurrentPage(i);
		this.setState({
			currPage: i
		});
	};

	SortableTblPager.prototype.setRowsPerPage = function setRowsPerPage(e) {
		var i = parseInt(e.target.value);
		if (i === 'All' || isNaN(i)) i = this.props.totalsCount;
		this.props.setRowsPerPage(i);
		this.setState({
			rowPerPage: i
		});
	};

	SortableTblPager.prototype.render = function render() {
		var nextDisableStyle = this.state.currPage + 1 >= this.props.totalPage;
		var prevDisableStyle = this.state.currPage + 1 <= 1;
		var rowPerPage = this.props.totalPage === 1 ? "All" : this.props.rowPerPage;

		return _react2.default.createElement(
			'div',
			{ className: 'pager' },
			_react2.default.createElement(
				'div',
				{ className: 'form-group' },
				_react2.default.createElement(
					'div',
					{ className: 'prev-next' },
					_react2.default.createElement('input', { type: 'button', className: 'btn btn-default', name: '', disabled: prevDisableStyle,
						onClick: this.subPage, value: 'Prev' }),
					_react2.default.createElement(
						'select',
						{ onChange: this.setCurrentPage, value: this.state.currPage, className: 'form-control page-select' },
						Array.from(new Array(this.props.totalPage), function (x, i) {
							return _react2.default.createElement(
								'option',
								{ key: i, value: i },
								i + 1
							);
						})
					),
					_react2.default.createElement('input', { type: 'button', className: 'btn btn-default', name: '', disabled: nextDisableStyle,
						onClick: this.addPagge, value: 'Next' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'row-per-page' },
					_ref,
					_react2.default.createElement(
						'select',
						{ id: 'rowsPerPage', onChange: this.setRowsPerPage, value: rowPerPage, className: 'form-control page-select' },
						[5, 10, 20, 50, 'All'].map(function (item, id) {
							return _react2.default.createElement(
								'option',
								{ key: id, value: item },
								item
							);
						})
					),
					_ref2
				),
				_react2.default.createElement(
					'div',
					{ className: 'desc' },
					_react2.default.createElement(
						'div',
						null,
						'Page ',
						this.state.currPage + 1,
						' of totlas ',
						this.props.totalPage,
						', totlas ',
						this.props.totalsCount,
						' rows'
					)
				)
			)
		);
	};

	return SortableTblPager;
}(_react2.default.Component);

exports.SortableTblPager = SortableTblPager;

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SortableTblTd = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortableTblTd = function SortableTblTd(props) {
	var CustomTd = props.customTd;
	return _react2.default.createElement(
		'tr',
		null,
		props.dKey.map(function (item, id) {
			var CustomTdComponent = null;
			CustomTdComponent = CustomTd && CustomTd.filter(function (i) {
				return i.keyItem === item;
			}).reduce(function (result, item) {
				return item;
			}, {}).custd;

			if (!CustomTd) return _react2.default.createElement(
				'td',
				{ key: id },
				props.tdData[item]
			);

			if (CustomTdComponent) {
				return _react2.default.createElement(CustomTdComponent, _extends({ key: id }, props, { tdData: props.tdData[item], field: item, rowData: props.tdData }));
			}

			return _react2.default.createElement(
				'td',
				{ key: id },
				props.tdData[item]
			);
		})
	);
};
exports.SortableTblTd = SortableTblTd;

/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SortableTblTh = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement("br", null);

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
		return _react2.default.createElement(
			"th",
			{ onClick: this.sort },
			" ",
			this.props.children,
			" ",
			_ref,
			_react2.default.createElement("i", { className: this.state.sortCssClass, "aria-hidden": "true" })
		);
	};

	return SortableTblTh;
}(_react2.default.Component);

exports.SortableTblTh = SortableTblTh;

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _Star = __webpack_require__(476);

var _Star2 = _interopRequireDefault(_Star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StarsRated = function StarsRated(props) {
	var stars = [];
	var voteCount = props.voteCount,
	    count = props.count,
	    pretitle = props.pretitle;

	pretitle = pretitle || "";
	voteCount && (voteCount = voteCount + ' reviews...  ');
	for (var i = 0; i < 5; i++) {
		var selected = i < count;
		var half = i < count && i > count - 1;
		stars.push(_react2.default.createElement(_Star2.default, { key: i, selected: selected, half: half }));
	}
	return _react2.default.createElement(
		'div',
		{ className: 'rated' },
		pretitle,
		' ',
		stars,
		' (',
		count,
		') ',
		voteCount,
		' '
	);
};
exports.default = StarsRated;

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

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.userChangeProfile = userChangeProfile;
exports.setUserProductRate = setUserProductRate;
exports.setUserFavorite = setUserFavorite;

var _reactRouter = __webpack_require__(15);

var _UserApi = __webpack_require__(478);

var _UserApi2 = _interopRequireDefault(_UserApi);

var _actionTypes = __webpack_require__(9);

var types = _interopRequireWildcard(_actionTypes);

var _ajaxStatusActions = __webpack_require__(104);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signupUserSuccess(user) {
  return { type: types.USER_CHANGE_PROFILE_SUCCESS, user: user };
}
function userChangeProfileFail(error) {
  return { type: types.USER_CHANGE_PROFILE_FAIL, error: error };
}

function userChangeProfile(formData, upload) {
  return function (dispatch) {
    dispatch((0, _ajaxStatusActions.beginAjaxCall)());
    return _UserApi2.default.setUserProfile(formData, upload, localStorage.getItem('token')).then(function (user) {
      dispatch(signupUserSuccess(user.details));
    }).catch(function (error) {
      dispatch(userChangeProfileFail(error.err));
      // browserHistory.push('/signin');    
    });
  };
}
function setUserProductRate(data) {
  return function (dispatch) {
    return _UserApi2.default.setUserProductRate(data, localStorage.getItem('token')).then(function (data) {
      dispatch({ type: types.UPDATE_USER_DATA, data: data.user_data });
      dispatch({ type: types.UPDATE_STAR_RATE, stars: data.product_stars });
    }).catch(function (error) {
      //dispatch(signupUserFail(error.err));      
    });
  };
}
function setUserFavorite(data) {
  return function (dispatch) {
    return _UserApi2.default.setUserFavorite(data, localStorage.getItem('token')).then(function (data) {
      dispatch({ type: types.UPDATE_USER_FAVORITE, data: data.user_data });
      dispatch({ type: types.UPDATE_PRODUCT_FAVORITE, favorite: data.product_favorite });
    }).catch(function (error) {
      //dispatch(signupUserFail(error.err));      
    });
  };
}

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Star = function (_React$Component) {
	_inherits(Star, _React$Component);

	function Star(props) {
		_classCallCheck(this, Star);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.onMouseOver = _this.onMouseOver.bind(_this);
		_this.onMouseOut = _this.onMouseOut.bind(_this);
		_this.onClick = _this.onClick.bind(_this);
		return _this;
	}

	Star.prototype.onMouseOver = function onMouseOver(e) {
		this.props.onMouseOver(this.props.id, e);
	};

	Star.prototype.onMouseOut = function onMouseOut(e) {
		this.props.onMouseOut(this.props.id, e);
	};

	Star.prototype.onClick = function onClick(e) {
		this.props.onClick(this.props.id, e);
	};

	Star.prototype.render = function render() {
		var _props = this.props,
		    selected = _props.selected,
		    half = _props.half;

		var r = 'fa fa-star';
		if (!selected) {
			r += '-o';
		} else if (half) {
			r += "-half-o";
		}
		return _react2.default.createElement('i', { onMouseOver: this.onMouseOver, onMouseOut: this.onMouseOut, onClick: this.onClick,
			className: r, style: { color: "#ffd700" } });
	};

	return Star;
}(_react2.default.Component);

Star.defaultProps = {
	selected: false,
	half: false,
	onMouseOver: function onMouseOver() {},
	onMouseOut: function onMouseOut() {},
	onClick: function onClick() {}
};

exports.default = Star;

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _configuration = __webpack_require__(20);

var _ajax = __webpack_require__(56);

var _axios = __webpack_require__(55);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DetailApi = function () {
	function DetailApi() {
		_classCallCheck(this, DetailApi);
	}

	DetailApi.getAllDetails = function getAllDetails(id) {
		return (0, _axios2.default)({
			method: 'get',
			url: _configuration.api_server.http.host + ':' + _configuration.api_server.http.port + '/api/details/' + id,
			dataType: 'JSON'
		}).then(function (response) {
			return response.data;
		}).catch(function (error) {
			var err = new _ajax.ajaxErr(error);
			throw err;
		});
	};

	return DetailApi;
}();

exports.default = DetailApi;

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _configuration = __webpack_require__(20);

var _axios = __webpack_require__(55);

var _axios2 = _interopRequireDefault(_axios);

var _ajax = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserApi = function () {
	function UserApi() {
		_classCallCheck(this, UserApi);
	}

	UserApi.setUserProfile = function setUserProfile(data, upload, token) {
		return (0, _axios2.default)({
			method: 'post',
			url: _configuration.api_server.http.host + ':' + _configuration.api_server.http.port + '/api/account',
			dataType: 'JSON',
			data: data,
			headers: { 'authorization': token },
			onUploadProgress: upload
		}).then(function (response) {
			return response.data;
		}).catch(function (error) {
			var err = new _ajax.ajaxErr(error);
			throw err;
		});
	};

	UserApi.setUserProductRate = function setUserProductRate(data, token) {
		return (0, _axios2.default)({
			method: 'post',
			url: _configuration.api_server.http.host + ':' + _configuration.api_server.http.port + '/api/account/rate/' + data.id,
			dataType: 'JSON',
			data: { rate: data.rate },
			headers: { 'authorization': token }
		}).then(function (response) {
			return response.data;
		}).catch(function (error) {
			var err = new _ajax.ajaxErr(error);
			throw err;
		});
	};

	UserApi.setUserFavorite = function setUserFavorite(data, token) {
		return (0, _axios2.default)({
			method: 'post',
			url: _configuration.api_server.http.host + ':' + _configuration.api_server.http.port + '/api/account/favorite/' + data.id,
			dataType: 'JSON',
			data: { love: data.love },
			headers: { 'authorization': token }
		}).then(function (response) {
			return response.data;
		}).catch(function (error) {
			var err = new _ajax.ajaxErr(error);
			throw err;
		});
	};

	return UserApi;
}();

exports.default = UserApi;

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

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = __webpack_require__(39);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _modalAction = __webpack_require__(40);

var modalActions = _interopRequireWildcard(_modalAction);

var _userAction = __webpack_require__(475);

var userActions = _interopRequireWildcard(_userAction);

var _HeartToggle = __webpack_require__(469);

var _HeartToggle2 = _interopRequireDefault(_HeartToggle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Favorite = function (_React$Component) {
	_inherits(Favorite, _React$Component);

	function Favorite(props) {
		_classCallCheck(this, Favorite);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.save = _this.save.bind(_this);
		return _this;
	}

	Favorite.prototype.save = function save(love) {
		var _props = this.props,
		    auth = _props.auth,
		    id = _props.id,
		    changeModal = _props.changeModal,
		    setUserFavorite = _props.setUserFavorite;

		if (!auth || !auth.success) {
			return changeModal({ open: true });
		}
		setUserFavorite({ love: love, id: id });
	};

	Favorite.prototype.render = function render() {
		var _props2 = this.props,
		    favorite = _props2.favorite,
		    auth = _props2.auth,
		    id = _props2.id,
		    short = _props2.short;

		var init = false;
		if (auth && auth.success) {
			init = !!auth.user.data.favorite.filter(function (item) {
				return item.productId === id;
			}).length;
		}
		var desc = favorite || '';
		if (!short) {
			desc = favorite && favorite + ' ' + (favorite === 1 ? "person" : "people") + ' love';
		}
		return _react2.default.createElement(
			'div',
			{ className: 'favorite' },
			_react2.default.createElement(_HeartToggle2.default, { selectIt: this.save, init: init }),
			' ',
			desc
		);
	};

	return Favorite;
}(_react2.default.Component);

Favorite.defaultProps = {
	favorite: 0,
	short: false
};

function mapStateToProps(state) {
	return {
		auth: state.auth,
		favorite: state.details.favorite || 0,
		id: state.details._id
	};
}

exports.default = Favorite = (0, _reactRedux.connect)(mapStateToProps, _extends({}, modalActions, userActions))(Favorite);

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(25);

var _reactRedux = __webpack_require__(39);

var _DetailsApi = __webpack_require__(477);

var _DetailsApi2 = _interopRequireDefault(_DetailsApi);

var _productsActions = __webpack_require__(474);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

		_DetailsApi2.default.deleteProduct(this.props.rowData._id).then(function (ret) {
			_this2.props.actions.loadProductList({ cat: _this2.props.productType || "DVR", subType: "All" });
			alert('Success!! Product [' + ret.name + '] has been deleted');
		}).catch(function (error) {
			throw error;
		});
	};

	BaseProductDeleteComponent.prototype.render = function render() {
		return _react2.default.createElement(
			'td',
			null,
			_react2.default.createElement('input', { type: 'button', className: 'btn btn-danger', value: 'Delete', onClick: this.deleteItem })
		);
	};

	return BaseProductDeleteComponent;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
	//console.log("mapStateToProps", state);
	return {};
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		actions: (0, _redux.bindActionCreators)({ loadProductList: _productsActions.loadProductList }, dispatch)
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BaseProductDeleteComponent);

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)(module)))

/***/ })

};;