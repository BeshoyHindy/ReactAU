exports.ids = [4];
exports.modules = {

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = __webpack_require__(481);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _reactTabsIsomorphic = __webpack_require__(493);

var _Shared = __webpack_require__(204);

var _EditUserTab = __webpack_require__(509);

var _EditUserTab2 = _interopRequireDefault(_EditUserTab);

var _UserProfileTab = __webpack_require__(512);

var _UserProfileTab2 = _interopRequireDefault(_UserProfileTab);

var _RatedProductTab = __webpack_require__(511);

var _RatedProductTab2 = _interopRequireDefault(_RatedProductTab);

var _FavoriteProductTab = __webpack_require__(510);

var _FavoriteProductTab2 = _interopRequireDefault(_FavoriteProductTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (false) {
	require('./user.sass');
}

var idCounter = 0;
var generateIds = function generateIds() {
	return 'custom-id-' + idCounter++;
};

var _ref = _react2.default.createElement(
	_reactTabsIsomorphic.TabList,
	null,
	_react2.default.createElement(
		_reactTabsIsomorphic.Tab,
		null,
		'Basic Info'
	),
	_react2.default.createElement(
		_reactTabsIsomorphic.Tab,
		null,
		'Edit Profile'
	),
	_react2.default.createElement(
		_reactTabsIsomorphic.Tab,
		null,
		'Rated Products'
	),
	_react2.default.createElement(
		_reactTabsIsomorphic.Tab,
		null,
		'Favorited Products'
	)
);

var _ref2 = _react2.default.createElement(
	_reactTabsIsomorphic.TabPanel,
	null,
	_react2.default.createElement(_UserProfileTab2.default, null)
);

var _ref3 = _react2.default.createElement(
	_reactTabsIsomorphic.TabPanel,
	null,
	_react2.default.createElement(_EditUserTab2.default, null)
);

var _ref4 = _react2.default.createElement(
	_reactTabsIsomorphic.TabPanel,
	null,
	_react2.default.createElement(_RatedProductTab2.default, null)
);

var _ref5 = _react2.default.createElement(
	_reactTabsIsomorphic.TabPanel,
	null,
	_react2.default.createElement(_FavoriteProductTab2.default, null)
);

var UserPage = function (_React$Component) {
	_inherits(UserPage, _React$Component);

	function UserPage(props) {
		_classCallCheck(this, UserPage);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			selectedTab: 0
		};
		_this.setTab = _this.setTab.bind(_this);
		return _this;
	}

	UserPage.prototype.componentDidMount = function componentDidMount() {};

	UserPage.prototype.setTab = function setTab(tabId) {
		var t = parseInt(tabId);
		this.setState({ selectedTab: t });
	};

	UserPage.prototype.render = function render() {
		idCounter = 0;
		var _props = this.props,
		    authSuccess = _props.authSuccess,
		    user = _props.user;

		if (this.props.errorMessage) {
			alert(this.props.errorMessage);
		}
		return _react2.default.createElement(
			'div',
			{ className: 'container' },
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-12' },
					_react2.default.createElement(_Shared.Breadcrumb, { linkPair: [{ link: "", desc: "User" }, { link: "user", desc: "User Profile" }] })
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-12' },
					_react2.default.createElement(
						_reactTabsIsomorphic.Tabs,
						{ selectedIndex: this.state.selectedTab, generateIdsFn: generateIds },
						_ref,
						_ref2,
						_ref3,
						_ref4,
						_ref5
					)
				)
			)
		);
	};

	return UserPage;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
	return {
		authSuccess: state.auth.success,
		user: state.auth.user,
		errorMessage: state.auth.error
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserPage);

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

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _configuration = __webpack_require__(20);

var _axios = __webpack_require__(55);

var _axios2 = _interopRequireDefault(_axios);

var _ajax = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileApi = function () {
	function FileApi() {
		_classCallCheck(this, FileApi);
	}

	FileApi.upLoadImages = function upLoadImages(id, data, upload) {
		return (0, _axios2.default)({
			method: 'post',
			url: _configuration.api_server.http.host + ':' + _configuration.api_server.http.port + '/api/file/images/' + id,
			dataType: 'JSON',
			data: data,
			headers: { 'authorization': localStorage.getItem('token') },
			onUploadProgress: upload }).then(function (response) {
			return response.data;
		}).catch(function (error) {
			var err = new _ajax.ajaxErr(error);
			throw err;
		});
	};

	FileApi.upLoadDocs = function upLoadDocs(id, data, upload) {
		return (0, _axios2.default)({
			method: 'post',
			url: _configuration.api_server.http.host + ':' + _configuration.api_server.http.port + '/api/file/docs/' + id,
			dataType: 'JSON',
			data: data,
			headers: { 'authorization': localStorage.getItem('token') },
			onUploadProgress: upload }).then(function (response) {
			return response.data;
		}).catch(function (error) {
			var err = new _ajax.ajaxErr(error);
			throw err;
		});
	};

	return FileApi;
}();

exports.default = FileApi;

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(107);

var _reactDropzone = __webpack_require__(213);

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _userAction = __webpack_require__(475);

var actions = _interopRequireWildcard(_userAction);

var _renderReduxForm = __webpack_require__(106);

var _FileApi = __webpack_require__(484);

var _FileApi2 = _interopRequireDefault(_FileApi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
	'strong',
	null,
	'Oops!'
);

var _ref2 = _react2.default.createElement('img', { src: '/img/ajax-loader.gif', alt: '' });

var _ref3 = _react2.default.createElement(
	'div',
	{ className: 'panel-heading' },
	_react2.default.createElement(
		'h3',
		{ className: 'panel-title' },
		'Edit User Profile'
	)
);

var _ref4 = _react2.default.createElement(
	'div',
	{ className: 'col-lg-6 ' },
	_react2.default.createElement(_reduxForm.Field, { name: 'username', component: _renderReduxForm.renderField, type: 'text', label: 'User Name' }),
	_react2.default.createElement(_reduxForm.Field, { name: 'email', component: _renderReduxForm.renderField, type: 'email', label: 'E-Mail', require: true }),
	_react2.default.createElement(_reduxForm.Field, { name: 'password', component: _renderReduxForm.renderField, type: 'password', label: 'Reset Password', require: true }),
	_react2.default.createElement(_reduxForm.Field, { name: 'passwordConfirm', component: _renderReduxForm.renderField, type: 'password', label: 'Confirm Reset Password', require: true })
);

var _ref5 = _react2.default.createElement('hr', null);

var editUserTab = function (_React$Component) {
	_inherits(editUserTab, _React$Component);

	function editUserTab(props) {
		_classCallCheck(this, editUserTab);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			upload: 0
		};
		_this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
		_this.renderAlert = _this.renderAlert.bind(_this);
		_this.fileProgress = _this.fileProgress.bind(_this);
		return _this;
	}

	editUserTab.prototype.handleFormSubmit = function handleFormSubmit(values) {
		var _this2 = this;

		var imgFileUploadProgress = function imgFileUploadProgress(p) {
			return _this2.fileProgress(p);
		};
		var formData = new FormData();
		formData.append('password', values.password);
		formData.append('email', values.email);
		formData.append('username', values.username);
		if (values.picture) {
			formData.append('upload_picture', values.picture[0]);
		}
		this.setState({ upload: 1 });

		this.props.userChangeProfile(formData, imgFileUploadProgress);
	};

	editUserTab.prototype.fileProgress = function fileProgress(progressEvent) {
		var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
		this.setState({ upload: percentCompleted });
	};

	editUserTab.prototype.renderAlert = function renderAlert() {
		if (this.props.errorMessage) {
			return _react2.default.createElement(
				'div',
				{ className: 'alert alert-danger' },
				_ref,
				' ',
				this.props.errorMessage
			);
		}
	};

	editUserTab.prototype.render = function render() {
		var _props = this.props,
		    handleSubmit = _props.handleSubmit,
		    pristine = _props.pristine,
		    submitting = _props.submitting;
		var _props2 = this.props,
		    auth = _props2.auth,
		    picture = _props2.initialValues.picture;


		return _react2.default.createElement(
			'div',
			{ className: 'loading-wrap' },
			_react2.default.createElement(
				'div',
				{ className: 'ajax-loading-big ' + (this.state.upload > 0 ? 'fade-show' : 'fade-hide') },
				_ref2,
				_react2.default.createElement(
					'div',
					{ className: 'ajax-loading-progress' },
					'Processing....',
					this.state.upload,
					'%'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'well' },
				_react2.default.createElement(
					'div',
					{ className: 'panel panel-danger add-user-panel' },
					_ref3,
					_react2.default.createElement(
						'div',
						{ className: 'panel-body sign-up' },
						_react2.default.createElement(
							'form',
							{ onSubmit: handleSubmit(this.handleFormSubmit) },
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-6 ' },
								_react2.default.createElement(_reduxForm.Field, { name: 'picture', src: picture, component: _renderReduxForm.renderDropzoneInput, label: 'Add a picture' })
							),
							_ref4,
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-12' },
								this.renderAlert(),
								_ref5,
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'button',
										{ type: 'submit', disabled: pristine || submitting, className: 'btn btn-warning submit-btn' },
										'Submit'
									)
								)
							)
						)
					)
				)
			)
		);
	};

	return editUserTab;
}(_react2.default.Component);

var validate = function validate(values) {
	var errors = {};
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'Please enter a password';
	}

	if (!values.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	if (values.password !== values.passwordConfirm) {
		errors.password = 'Passwords must match';
	}
	return errors;
};

function mapStateToProps(state, ownProps) {
	return {
		initialValues: {
			username: state.auth.user && state.auth.user.profile && state.auth.user.profile.username || '',
			email: state.auth.user && state.auth.user.email || '',
			picture: state.auth.user && state.auth.user.profile && state.auth.user.profile.picture || ''
		},
		auth: state.auth,
		errorMessage: state.auth.error
	};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, actions)((0, _reduxForm.reduxForm)({
	form: 'edituser',
	validate: validate })(editUserTab));

/***/ }),

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _SortableTbl = __webpack_require__(468);

var _Shared = __webpack_require__(204);

var _StarsRated = __webpack_require__(473);

var _StarsRated2 = _interopRequireDefault(_StarsRated);

var _HeartToggle = __webpack_require__(469);

var _HeartToggle2 = _interopRequireDefault(_HeartToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PID = function PID(props) {

	return _react2.default.createElement(
		'td',
		{ style: { minWidth: '120px', backgroundColor: '#fff' } },
		_react2.default.createElement(
			_reactRouter.Link,
			{ to: '/products/' + props.rowData.cat + '/spec/' + props.tdData },
			props.tdData
		)
	);
};

var _ref = _react2.default.createElement(
	'td',
	null,
	_react2.default.createElement(_HeartToggle2.default, { init: true })
);

var Fav = function Fav(props) {
	return _ref;
};

var _ref2 = _react2.default.createElement(
	_Shared.BigHeader,
	{ smallTitle: '' },
	'My Favorite Products'
);

var FavoriteProductTab = function FavoriteProductTab(props) {
	var user = props.user,
	    categories = props.categories;

	var data = [];
	if (user.data && user.data.favorite && categories) {
		data = user.data.favorite.map(function (item) {
			var cat = categories.filter(function (catItem) {
				return catItem._id === parseInt(item.cat);
			});
			cat = cat && cat.length > 0 && cat[0].categoryName || "Unknown";
			return { pid: item.productId, fav: 1, cat: cat };
		});
	}
	return _react2.default.createElement(
		'div',
		{ className: 'user-info' },
		user.data && user.data.favorite && categories && _react2.default.createElement(
			'div',
			null,
			_ref2,
			_react2.default.createElement(_SortableTbl.SortableTbl, { categories: categories, tblData: data,
				tHead: ["Product ID", "Product Type", "Favorite"],
				customTd: [{ custd: PID, keyItem: "pid" }, { custd: Fav, keyItem: "fav" }],
				dKey: ["pid", "cat", "fav"] })
		)
	);
};

function mapStateToProps(state, ownProps) {
	return {
		user: state.auth.user || {},
		categories: state.categories
	};
}
FavoriteProductTab = (0, _reactRedux.connect)(mapStateToProps)(FavoriteProductTab);

exports.default = FavoriteProductTab;

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _SortableTbl = __webpack_require__(468);

var _Shared = __webpack_require__(204);

var _StarsRated = __webpack_require__(473);

var _StarsRated2 = _interopRequireDefault(_StarsRated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PID = function PID(props) {

	return _react2.default.createElement(
		'td',
		{ style: { minWidth: '120px', backgroundColor: '#fff' } },
		_react2.default.createElement(
			_reactRouter.Link,
			{ to: '/products/' + props.rowData.cat + '/spec/' + props.tdData },
			props.tdData
		)
	);
};

var Rate = function Rate(props) {
	return _react2.default.createElement(
		'td',
		null,
		_react2.default.createElement(_StarsRated2.default, { count: props.tdData })
	);
};

var _ref = _react2.default.createElement(
	_Shared.BigHeader,
	{ smallTitle: '' },
	'My Rated Products'
);

var RatedProductTab = function RatedProductTab(props) {
	var user = props.user,
	    categories = props.categories;

	var data = [];
	if (user.data && user.data.rate && categories) {
		data = user.data.rate.map(function (item) {
			var cat = categories.filter(function (catItem) {
				return catItem._id === parseInt(item.cat);
			});
			cat = cat && cat.length > 0 && cat[0].categoryName || "Unknown";
			return { pid: item.productId, rate: item.rate, cat: cat };
		});
	}
	return _react2.default.createElement(
		'div',
		{ className: 'user-info' },
		user.data && user.data.rate && categories && _react2.default.createElement(
			'div',
			null,
			_ref,
			_react2.default.createElement(_SortableTbl.SortableTbl, { categories: categories, tblData: data,
				tHead: ["Product ID", "Product Type", "Rate"],
				customTd: [{ custd: PID, keyItem: "pid" }, { custd: Rate, keyItem: "rate" }],
				dKey: ["pid", "cat", "rate"] })
		)
	);
};

function mapStateToProps(state, ownProps) {
	return {
		user: state.auth.user || {},
		categories: state.categories
	};
}
RatedProductTab = (0, _reactRedux.connect)(mapStateToProps)(RatedProductTab);

exports.default = RatedProductTab;

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _SortableTbl = __webpack_require__(468);

var _Shared = __webpack_require__(204);

var _StarsRated = __webpack_require__(473);

var _StarsRated2 = _interopRequireDefault(_StarsRated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _react2.default.createElement(
	_Shared.BigHeader,
	{ smallTitle: '' },
	'Basic Info'
);

var _ref2 = _react2.default.createElement(
	'tr',
	null,
	_react2.default.createElement(
		'td',
		null,
		'Field'
	),
	_react2.default.createElement(
		'td',
		null,
		'Data'
	)
);

var _ref3 = _react2.default.createElement(
	'td',
	null,
	'User Name'
);

var _ref4 = _react2.default.createElement(
	'td',
	null,
	'User E-Mail'
);

var _ref5 = _react2.default.createElement(
	'td',
	null,
	'User Total Purchase '
);

var UserProfileTab = function UserProfileTab(props) {
	var user = props.user,
	    categories = props.categories;

	var data = [];
	if (user.data && user.data.rate && categories) {
		data = user.data.rate.map(function (item) {
			var cat = categories.filter(function (catItem) {
				return catItem._id === parseInt(item.cat);
			});
			cat = cat && cat.length > 0 && cat[0].categoryName || "Unknown";
			return { pid: item.productId, rate: item.rate, cat: cat };
		});
	}
	return _react2.default.createElement(
		'div',
		{ className: 'user-info' },
		_ref,
		_react2.default.createElement(
			'table',
			{ className: 'table table-striped table-bordered table-hover p-spec' },
			_react2.default.createElement(
				'tbody',
				null,
				_ref2,
				_react2.default.createElement(
					'tr',
					null,
					_ref3,
					_react2.default.createElement(
						'td',
						null,
						user && user.profile && user.profile.username
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_ref4,
					_react2.default.createElement(
						'td',
						null,
						user && user.email
					)
				),
				_react2.default.createElement(
					'tr',
					null,
					_ref5,
					_react2.default.createElement(
						'td',
						null,
						user && user.data && user.data.totalValue
					)
				)
			)
		)
	);
};

function mapStateToProps(state, ownProps) {
	return {
		user: state.auth.user || {}
	};
}
UserProfileTab = (0, _reactRedux.connect)(mapStateToProps)(UserProfileTab);

exports.default = UserProfileTab;

/***/ })

};;