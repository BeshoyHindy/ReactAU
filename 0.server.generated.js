exports.ids = [0];
exports.modules = {

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import * as detailActions from '../../actions/detailsActions';


var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(39);

var _redux = __webpack_require__(25);

var _connectDataFetchers = __webpack_require__(205);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

var _CommonDetails = __webpack_require__(501);

var _detailsActions = __webpack_require__(483);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DetailsPage = function DetailsPage(props) {
	return _react2.default.createElement(_CommonDetails.CommonDetails, _extends({}, props, { data: props.detail }));
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		detail: state.details,
		ajaxState: state.ajaxCallsInProgress,
		auth: state.auth
	};
};

// const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators(detailActions, dispatch)
// });

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _connectDataFetchers2.default)(DetailsPage, [_detailsActions.loadDetails]));

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

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.loadDetails = loadDetails;

var _DetailsApi = __webpack_require__(477);

var _DetailsApi2 = _interopRequireDefault(_DetailsApi);

var _actionTypes = __webpack_require__(9);

var types = _interopRequireWildcard(_actionTypes);

var _ajaxStatusActions = __webpack_require__(104);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadDetailsSuccess(details) {
  return { type: types.LOAD_DETAILS_SUCCESS, details: details };
}

function loadDetails(detail) {
  return function (dispatch) {
    dispatch((0, _ajaxStatusActions.beginAjaxCall)());
    if (!detail.params.id || detail.params.id == 0) {
      return new Promise(function (resolve, reject) {
        dispatch(loadDetailsSuccess({}));
        resolve({});
      });
    }
    return _DetailsApi2.default.getAllDetails(detail.params.id).then(function (details) {
      dispatch(loadDetailsSuccess(details));
    }).catch(function (error) {
      dispatch((0, _ajaxStatusActions.ajaxCallError)());
      throw error;
    });
  };
}

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SpecTbl = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpecTbl = function (_React$Component) {
	_inherits(SpecTbl, _React$Component);

	function SpecTbl(props) {
		_classCallCheck(this, SpecTbl);

		return _possibleConstructorReturn(this, _React$Component.call(this, props));
	}

	SpecTbl.prototype.componentWillMount = function componentWillMount() {};

	SpecTbl.prototype.componentDidMount = function componentDidMount() {};

	SpecTbl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

	SpecTbl.prototype.render = function render() {
		return _react2.default.createElement(
			"div",
			{ id: "p-spec", className: "table-responsive" },
			_react2.default.createElement(
				"table",
				{ className: "table table-striped table-bordered table-hover p-spec" },
				this.props.data && this.props.data.map(function (item, i) {
					return _react2.default.createElement(
						"tbody",
						{ key: i },
						_react2.default.createElement(
							"tr",
							null,
							_react2.default.createElement(
								"td",
								{ colSpan: "2" },
								item.name
							)
						),
						item.members.map(function (v, id) {
							return _react2.default.createElement(
								"tr",
								{ key: id },
								_react2.default.createElement(
									"td",
									null,
									v.name
								),
								_react2.default.createElement(
									"td",
									null,
									v.details
								)
							);
						})
					);
				})
			)
		);
	};

	return SpecTbl;
}(_react2.default.Component);

exports.SpecTbl = SpecTbl;

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ImageList = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _ImageLoader = __webpack_require__(206);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageList = function (_React$Component) {
	_inherits(ImageList, _React$Component);

	function ImageList(props) {
		_classCallCheck(this, ImageList);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	ImageList.prototype.handleClick = function handleClick(e) {
		this.props.toHandleClick(this.props.id);
	};

	ImageList.prototype.render = function render() {
		return _react2.default.createElement(
			'li',
			{ onClick: this.handleClick, className: this.props.id == this.props.activeItem ? "active" : "" },
			_react2.default.createElement(_ImageLoader.ImageLoader, {
				alt: this.props.alt,
				title: this.props.title,
				src: this.props.src,
				minHeight: this.props.minHeight,
				reset: this.props.reset !== undefined ? this.props.reset : true
			})
		);
	};

	return ImageList;
}(_react2.default.Component);

exports.ImageList = ImageList;

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.CommonDetails = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _DetailsImage = __webpack_require__(503);

var _DetailsTab = __webpack_require__(504);

var _DetailsDesc = __webpack_require__(502);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _react2.default.createElement(
	'div',
	{ className: 'ajax-loading' },
	_react2.default.createElement('img', { src: '/img/ajax-loader.gif', alt: '' })
);

var CommonDetails = function CommonDetails(props) {
	if (props.ajaxState > 0) {
		return _ref;
	}

	var detailsImage = {
		name: props.data && props.data.name || '',
		description: props.data && props.data.description || [],
		images: props.data && props.data.images || []
	};

	var tabData = {
		member: props.data && props.data.member || null,
		optional: props.data && props.data.optional || null,
		spec: props.data && props.data.spec || null,
		docs: props.data && props.data.docs || null
	};
	var descData = {
		name: props.data && props.data.name || '',
		description: props.data && props.data.description || []
	};

	if (props.params.product === "ALARM") {
		return _react2.default.createElement(
			'div',
			{ className: 'product-detail' },
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-12 product-desc  alarm-product-desc' },
				_react2.default.createElement(_DetailsDesc.DetailsDesc, { data: descData })
			),
			_react2.default.createElement(
				'div',
				{ id: 'product-top', className: 'col-xs-12' },
				_react2.default.createElement(_DetailsImage.DetailsImage, { data: detailsImage, type: props.data.type, brand: props.data.brand, name: props.data.name, productType: props.params.product })
			),
			_react2.default.createElement(_DetailsTab.DetailsTab, { data: tabData })
		);
	} else {
		return _react2.default.createElement(
			'div',
			{ className: 'product-detail' },
			_react2.default.createElement(
				'div',
				{ id: 'product-top', className: 'col-xs-12 col-sm-4 col-md-4 col-lg-5' },
				_react2.default.createElement(_DetailsImage.DetailsImage, { data: detailsImage, type: props.data.type, brand: props.data.brand, name: props.data.name, productType: props.params.product })
			),
			_react2.default.createElement(
				'div',
				{ className: 'col-xs-12 col-sm-8 col-md-8 col-lg-7 product-desc' },
				_react2.default.createElement(_DetailsDesc.DetailsDesc, { data: descData })
			),
			_react2.default.createElement(_DetailsTab.DetailsTab, { data: tabData })
		);
	}
};

exports.CommonDetails = CommonDetails;

/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DetailsDesc = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _Spec = __webpack_require__(486);

var _SortableTbl = __webpack_require__(468);

var _Shared = __webpack_require__(204);

var _Rating = __webpack_require__(505);

var _Rating2 = _interopRequireDefault(_Rating);

var _Favorite = __webpack_require__(480);

var _Favorite2 = _interopRequireDefault(_Favorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _react2.default.createElement(_Favorite2.default, null);

var _ref2 = _react2.default.createElement(_Rating2.default, null);

var _ref3 = _react2.default.createElement('i', { className: 'fa-li fa fa-check-square' });

var DetailsDesc = function DetailsDesc(props) {

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'h1',
			null,
			props.data.name,
			' ',
			_ref
		),
		_ref2,
		_react2.default.createElement(
			'div',
			{ className: 'p-desc-detail' },
			_react2.default.createElement(
				'ul',
				{ className: 'fa-ul' },
				props.data.description && props.data.description.map(function (item, id) {
					return _react2.default.createElement(
						'li',
						{ key: id },
						_ref3,
						item
					);
				})
			)
		)
	);
};
exports.DetailsDesc = DetailsDesc;

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DetailsImage = undefined;

var _reactRouter = __webpack_require__(15);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(55);

var _axios2 = _interopRequireDefault(_axios);

var _reactAddonsCssTransitionGroup = __webpack_require__(212);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Spec = __webpack_require__(486);

var _SortableTbl = __webpack_require__(468);

var _ImageLoader = __webpack_require__(206);

var _Shared = __webpack_require__(204);

var _ImageList = __webpack_require__(487);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DetailsImage = function (_React$Component) {
	_inherits(DetailsImage, _React$Component);

	function DetailsImage(props) {
		_classCallCheck(this, DetailsImage);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		var sImage = _this.props.data && _this.props.data.images && _this.props.data.images[0];
		_this.state = {
			activeItem: 0
		};
		_this.changeShowImage = _this.changeShowImage.bind(_this);
		return _this;
	}

	DetailsImage.prototype.changeShowImage = function changeShowImage(id) {
		this.setState({
			activeItem: id
		});
	};

	DetailsImage.prototype.render = function render() {
		var _this2 = this;

		var showImage = this.props.data && this.props.data.images && this.props.data.images[this.state.activeItem];
		var transitionName = this.props.productType === 'ALARM' ? "alarmProduct" : "product";
		var productImagesClass = "col-xs-12  product-images " + (this.props.productType === 'ALARM' ? "alarm-product-images" : "");
		var productImagesThumbClass = this.props.productType === 'ALARM' ? "alarm-product-thumbs" : "product-thumbs";
		var productImagesThumbClassWrap = this.props.productType === 'ALARM' ? "hidden-xs p-thumbs" : "col-xs-12 hidden-xs p-thumbs";
		var centerClass = this.props.productType === 'ALARM' ? "alarm-image" : "row";
		return _react2.default.createElement(
			'div',
			{ className: centerClass },
			_react2.default.createElement(
				'div',
				{ className: productImagesClass },
				_react2.default.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						transitionName: transitionName,
						transitionEnterTimeout: 300,
						transitionLeaveTimeout: 300 },
					showImage && _react2.default.createElement(_ImageLoader.ImageLoader, {
						className: transitionName,
						cssClass: transitionName,
						key: showImage,
						src: showImage,
						minHeight: '284px',
						alt: this.props.brand + ' - ' + this.props.productType + ' - ' + this.props.type + ' - ' + this.props.name,
						title: this.props.brand + ' - ' + this.props.productType + ' - ' + this.props.type + ' - ' + this.props.name
					})
				)
			),
			_react2.default.createElement(
				'div',
				{ className: productImagesThumbClassWrap },
				_react2.default.createElement(
					'ul',
					{ className: productImagesThumbClass },
					this.props.data.images && this.props.data.images.map(function (item, id) {
						return _react2.default.createElement(_ImageList.ImageList, { key: id, id: id, src: item, activeItem: _this2.state.activeItem, toHandleClick: _this2.changeShowImage,
							alt: _this2.props.brand + ' - ' + _this2.props.productType + ' - ' + _this2.props.type + ' - ' + _this2.props.name,
							title: _this2.props.brand + ' - ' + _this2.props.productType + ' - ' + _this2.props.type + ' - ' + _this2.props.name,
							minHeight: '60px'
						});
					})
				)
			)
		);
	};

	return DetailsImage;
}(_react2.default.Component);

exports.DetailsImage = DetailsImage;

/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DetailsTab = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactTabsIsomorphic = __webpack_require__(493);

var _Spec = __webpack_require__(486);

var _SortableTbl = __webpack_require__(468);

var _Shared = __webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idCounter = 0;
var generateIds = function generateIds() {
	return 'custom-id-' + idCounter++;
};

var _ref = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Standard Package'
);

var _ref2 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Optinal Package'
);

var _ref3 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Specification'
);

var _ref4 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Download'
);

var DetailsTab = function DetailsTab(props) {
	idCounter = 0;
	return _react2.default.createElement(
		_reactTabsIsomorphic.Tabs,
		{ selectedIndex: 0, generateIdsFn: generateIds },
		_react2.default.createElement(
			_reactTabsIsomorphic.TabList,
			null,
			props.data.cat === 2 && props.data.member && _ref,
			props.data.cat === 2 && props.data.optional && _ref2,
			props.data.spec && _ref3,
			props.data.docs && _ref4
		),
		props.data.cat === 2 && props.data.member && _react2.default.createElement(
			_reactTabsIsomorphic.TabPanel,
			null,
			_react2.default.createElement(
				'div',
				{ className: 'download-tbl' },
				_react2.default.createElement(_SortableTbl.SortableTbl, { tblData: props.data.member, tHead: ["Description", "Qty"], dKey: ["desc", "qty"] })
			)
		),
		props.data.cat === 2 && props.data.optional && _react2.default.createElement(
			_reactTabsIsomorphic.TabPanel,
			null,
			_react2.default.createElement(
				'div',
				{ className: 'download-tbl' },
				_react2.default.createElement(_SortableTbl.SortableTbl, { tblData: props.data.optional, tHead: ["Optional Member"], dKey: ["desc"] })
			)
		),
		props.data.spec && _react2.default.createElement(
			_reactTabsIsomorphic.TabPanel,
			null,
			_react2.default.createElement(_Spec.SpecTbl, { data: props.data.spec })
		),
		props.data.docs && _react2.default.createElement(
			_reactTabsIsomorphic.TabPanel,
			null,
			_react2.default.createElement(
				'div',
				{ className: 'download-tbl' },
				_react2.default.createElement(_SortableTbl.SortableTbl, { tblData: props.data.docs,
					tHead: ["Description", "Size(KB)", "File Type", "Download"],
					customTd: [{ custd: _Shared.CustomDownloadTd, keyItem: "src" }],
					dKey: ["desc", "size", "filetype", "src"] })
			)
		)
	);
};
exports.DetailsTab = DetailsTab;

/***/ }),

/***/ 505:
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

var _StarsRating = __webpack_require__(508);

var _StarsRating2 = _interopRequireDefault(_StarsRating);

var _StarsRated = __webpack_require__(473);

var _StarsRated2 = _interopRequireDefault(_StarsRated);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rating = function (_React$Component) {
	_inherits(Rating, _React$Component);

	function Rating(props) {
		_classCallCheck(this, Rating);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.signin = _this.signin.bind(_this);
		_this.rate = _this.rate.bind(_this);
		return _this;
	}

	Rating.prototype.signin = function signin() {
		this.props.changeModal({ open: true });
	};

	Rating.prototype.rate = function rate(_rate) {
		this.props.setUserProductRate({ id: this.props.id, rate: _rate });
	};

	Rating.prototype.render = function render() {
		var _props = this.props,
		    stars = _props.stars,
		    auth = _props.auth,
		    id = _props.id;

		var c = Math.round(stars.totalStars / stars.voteCount * 100) / 100;
		c = isNaN(c) ? 0 : c;

		var rate = _react2.default.createElement('input', { type: 'button', className: 'btn btn-warning rating', value: 'Rate it', onClick: this.signin });
		if (auth && auth.success) {
			var nRate = auth.user.data.rate.filter(function (rate) {
				return rate.productId === id;
			})[0];
			var userRate = nRate && nRate.rate || 0;
			rate = _react2.default.createElement(_StarsRating2.default, { id: id, rate: this.rate, initRate: userRate });
		}

		return _react2.default.createElement(
			'div',
			{ className: 'rate' },
			_react2.default.createElement(_StarsRated2.default, { pretitle: 'Avg Rate:', count: c, voteCount: stars.voteCount }),
			rate
		);
	};

	return Rating;
}(_react2.default.Component);

Rating.defaultProps = {
	stars: { avgRate: 0, voteCount: 0 }
};

function mapStateToProps(state) {
	return {
		auth: state.auth,
		stars: state.details.stars,
		id: state.details._id
	};
}

exports.default = Rating = (0, _reactRedux.connect)(mapStateToProps, _extends({}, modalActions, userActions))(Rating);

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _Star = __webpack_require__(476);

var _Star2 = _interopRequireDefault(_Star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StarsRating = function (_React$Component) {
	_inherits(StarsRating, _React$Component);

	function StarsRating(props) {
		_classCallCheck(this, StarsRating);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			rating: props.initRate,
			hoverAt: null
		};
		_this.handleMouseOver = _this.handleMouseOver.bind(_this);
		_this.handleMouseOut = _this.handleMouseOut.bind(_this);
		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	StarsRating.prototype.handleMouseOver = function handleMouseOver(idx, evt) {
		this.setState(function (state, props) {
			return { hoverAt: idx + 1 };
		});

		// this.state.hoverAt = idx + 1;
		// this.forceUpdate(); 
	};

	StarsRating.prototype.handleMouseOut = function handleMouseOut(idx, evt) {
		this.setState(function (state, props) {
			return { hoverAt: null };
		});

		// this.state.hoverAt = null;
		// this.forceUpdate();
	};

	StarsRating.prototype.handleClick = function handleClick(idx, evt) {
		this.setState(function (state, props) {
			return { rating: idx + 1 };
		});

		// this.state.rating = idx + 1;
		// this.forceUpdate();
		this.props.rate(idx + 1);
	};

	StarsRating.prototype.render = function render() {
		var stars = [];
		for (var i = 0; i < 5; i++) {
			var rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
			var selected = i < rating;
			stars.push(_react2.default.createElement(_Star2.default, { key: i, id: i, selected: selected, style: { cursor: "pointer" },
				onMouseOver: this.handleMouseOver,
				onMouseOut: this.handleMouseOut,
				onClick: this.handleClick
			}));
		}
		return _react2.default.createElement(
			'div',
			{ className: 'rating' },
			'  Your Rate: ',
			stars
		);
	};

	return StarsRating;
}(_react2.default.Component);

exports.default = StarsRating;

/***/ })

};;