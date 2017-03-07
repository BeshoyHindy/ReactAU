exports.ids = [1];
exports.modules = {

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = __webpack_require__(481);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _reactTabsIsomorphic = __webpack_require__(493);

var _connectDataFetchers = __webpack_require__(205);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

var _Shared = __webpack_require__(204);

var _AdminEditBasicTab = __webpack_require__(495);

var _AdminEditBasicTab2 = _interopRequireDefault(_AdminEditBasicTab);

var _AdminEditSpecTab = __webpack_require__(499);

var _AdminEditSpecTab2 = _interopRequireDefault(_AdminEditSpecTab);

var _AdminEditDocsTab = __webpack_require__(496);

var _AdminEditDocsTab2 = _interopRequireDefault(_AdminEditDocsTab);

var _AdminEditStdPkgTab = __webpack_require__(500);

var _AdminEditStdPkgTab2 = _interopRequireDefault(_AdminEditStdPkgTab);

var _AdminEditOptTab = __webpack_require__(498);

var _AdminEditOptTab2 = _interopRequireDefault(_AdminEditOptTab);

var _adminActions = __webpack_require__(207);

var _detailsActions = __webpack_require__(483);

var _productsActions = __webpack_require__(474);

var _AdminEditInputArray = __webpack_require__(490);

var _AdminEditInputArray2 = _interopRequireDefault(_AdminEditInputArray);

var _AdminApi = __webpack_require__(210);

var _AdminApi2 = _interopRequireDefault(_AdminApi);

var _FileApi = __webpack_require__(484);

var _FileApi2 = _interopRequireDefault(_FileApi);

var _General = __webpack_require__(489);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialStateDB = {
	cat: 1,
	description: [],
	spec: [],
	images: [],
	docs: [],
	member: [],
	optinal: []
};

var initialImageUpload = {
	progress: 0,
	newData: []
};

var initialDocsUpload = {
	progress: 0,
	newData: []
};

for (var _iterator = _General.productEditColDetail, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	var _ref;

	if (_isArray) {
		if (_i >= _iterator.length) break;
		_ref = _iterator[_i++];
	} else {
		_i = _iterator.next();
		if (_i.done) break;
		_ref = _i.value;
	}

	var item = _ref;

	initialStateDB[item.db] = "";
}

var idCounter = 0;
var generateIds = function generateIds() {
	return 'custom-id-' + idCounter++;
};

var _ref3 = _react2.default.createElement('img', { src: '/img/ajax-loader.gif', alt: '' });

var _ref4 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Basic Settings'
);

var _ref5 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Standard Package'
);

var _ref6 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Optinal Package'
);

var _ref7 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Specification'
);

var _ref8 = _react2.default.createElement(
	_reactTabsIsomorphic.Tab,
	null,
	'Download'
);

var AdminEditProductPage = function (_React$Component) {
	_inherits(AdminEditProductPage, _React$Component);

	function AdminEditProductPage(props) {
		_classCallCheck(this, AdminEditProductPage);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			details: props.params.id == 0 ? initialStateDB : props.details,
			selectedTab: 0,
			upload: {
				images: initialImageUpload,
				docs: initialDocsUpload
			},
			delete: { images: [], docs: [] },
			detailPostProgress: 0
		};
		_this.submit = _this.submit.bind(_this);
		_this.setTab = _this.setTab.bind(_this);
		_this.setBasic = _this.setBasic.bind(_this);
		_this.delArrayMember = _this.delArrayMember.bind(_this);
		_this.setArrayMember = _this.setArrayMember.bind(_this);
		_this.addArrayMember = _this.addArrayMember.bind(_this);
		_this.setNewFiles = _this.setNewFiles.bind(_this);
		_this.fileProgress = _this.fileProgress.bind(_this);
		_this.detailProgress = _this.detailProgress.bind(_this);
		_this.processFileUploadDelete = _this.processFileUploadDelete.bind(_this);
		return _this;
	}

	AdminEditProductPage.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (this.props != nextProps) {
			var details = nextProps.details;

			this.setState({ details: (0, _Shared.isEmptyObject)(details) ? initialStateDB : details });
		}
	};

	AdminEditProductPage.prototype.setTab = function setTab(tabId) {
		// tabId = parseInt(tabId);
		// if (this.props.details.member )
		// 	tabId++;
		// if (this.props.details.optinal )
		// 	tabId++;
		return parseInt(tabId);
	};

	AdminEditProductPage.prototype.setBasic = function setBasic(tabId, data) {
		var _details;

		tabId = parseInt(tabId);
		var newState = (0, _immutabilityHelper2.default)(this.state, {
			selectedTab: { $set: tabId },
			details: (_details = {}, _details[data.field] = { $set: data.value }, _details)
		});
		this.setState(newState);
	};

	AdminEditProductPage.prototype.delArrayMember = function delArrayMember(tabId, field, id) {
		var _details2;

		var newCfg = {
			selectedTab: { $set: this.setTab(tabId) },
			details: (_details2 = {}, _details2[field] = { $splice: [[id, 1]] }, _details2)
		};

		if (field == "docs" || field == "images") {
			var _newCfg$delete;

			newCfg.delete = (_newCfg$delete = {}, _newCfg$delete[field] = { $push: [this.state.details[field][id]] }, _newCfg$delete);
		}

		this.setState((0, _immutabilityHelper2.default)(this.state, newCfg));
	};

	AdminEditProductPage.prototype.addArrayMember = function addArrayMember(tabId, field, data) {
		var _details3;

		var newState = (0, _immutabilityHelper2.default)(this.state, {
			selectedTab: { $set: this.setTab(tabId) },
			details: (_details3 = {}, _details3[field] = { $push: [data] }, _details3) });
		this.setState(newState);
	};

	AdminEditProductPage.prototype.setArrayMember = function setArrayMember(tabId, field, data) {
		var _details4;

		var newState = (0, _immutabilityHelper2.default)(this.state, {
			selectedTab: { $set: this.setTab(tabId) },
			details: (_details4 = {}, _details4[field] = { $set: data }, _details4) });
		this.setState(newState);
	};

	AdminEditProductPage.prototype.setNewFiles = function setNewFiles(tabId, field, data) {
		var _upload;

		var newState = (0, _immutabilityHelper2.default)(this.state, {
			selectedTab: { $set: this.setTab(tabId) },
			upload: (_upload = {}, _upload[field] = { newData: { $set: data } }, _upload) });
		this.setState(newState);
	};

	AdminEditProductPage.prototype.fileProgress = function fileProgress(progressEvent, field) {
		var _upload2;

		var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
		this.setState({ detailPostProgress: 0 });
		var newState = (0, _immutabilityHelper2.default)(this.state, { upload: (_upload2 = {}, _upload2[field] = { progress: { $set: percentCompleted } }, _upload2) });
		this.setState(newState);
	};

	AdminEditProductPage.prototype.detailProgress = function detailProgress(progressEvent) {
		var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
		this.setState({ detailPostProgress: percentCompleted });
	};

	AdminEditProductPage.prototype.processFileUploadDelete = function processFileUploadDelete(field) {
		var _upload3;

		var AddList = this.state.upload[field].newData;
		var delList = this.state.delete[field];
		var total = (AddList.length || 0) + (delList.length || 0);
		if (!total) return null;

		var formData = new FormData();
		formData.append('id', this.state.details._id);
		var newState = (0, _immutabilityHelper2.default)(this.state, { upload: (_upload3 = {}, _upload3[field] = { progress: { $set: 1 } }, _upload3) });
		this.setState(newState);

		if (AddList.length) {
			for (var _iterator2 = AddList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref2 = _iterator2[_i2++];
				} else {
					_i2 = _iterator2.next();
					if (_i2.done) break;
					_ref2 = _i2.value;
				}

				var item = _ref2;

				formData.append('upload_' + field, item.file);
			}
		}

		delList.length && formData.append('del_' + field, JSON.stringify(delList));

		return formData;
	};

	AdminEditProductPage.prototype.submit = function submit(e) {
		var _this2 = this;

		e.preventDefault();
		if (!this.state.details.name || !this.state.details.name.trim() || this.state.details.name.trim() === "") {
			alert("Please key in product name...");
			return;
		}

		var details = Object.assign({}, this.state.details);

		for (var i in details) {
			if (details[i] == "" || details[i] === null || details[i] === {} || details[i] === []) {
				delete details[i];
			}
		}

		var formData = new FormData();

		this.setState({ detailPostProgress: 1 });

		var imgFileUploadProgress = function imgFileUploadProgress(p) {
			return _this2.fileProgress(p, "images");
		};
		var docsFileUploadProgress = function docsFileUploadProgress(p) {
			return _this2.fileProgress(p, "docs");
		};
		_AdminApi2.default.setProductDetails(details, this.detailProgress).then(function (details) {
			var formData = _this2.processFileUploadDelete("images");
			if (formData) return _FileApi2.default.upLoadImages(_this2.state.details._id, formData, imgFileUploadProgress);

			return {};
		}).then(function (details) {
			var formData = _this2.processFileUploadDelete("docs");
			if (formData) return _FileApi2.default.upLoadDocs(_this2.state.details._id, formData, docsFileUploadProgress);

			return {};
		}).then(function (e) {
			var actionData = {};
			var cat = _this2.props.categories.filter(function (item) {
				return item._id === _this2.state.details.cat;
			})[0].categoryName;
			actionData.params = Object.assign({}, _this2.props.params);
			_this2.props.dispatch((0, _detailsActions.loadDetails)(actionData));

			actionData.params.cat = cat;
			_this2.props.dispatch((0, _productsActions.loadProductList)(actionData));
			_this2.setState({ upload: { images: initialImageUpload, docs: initialDocsUpload },
				delete: { images: [], docs: [] },
				detailPostProgress: 0 });
			if (_this2.props.params.id == 0) _this2.props.router.push('/admin/productList/' + cat);
		}).catch(function (error) {
			alert("Process Fail, Error Message: " + error.err);
			// console.error(error);
			_this2.setState({ upload: { images: initialImageUpload, docs: initialDocsUpload },
				delete: { images: [], docs: [] },
				detailPostProgress: 0 });
		});
	};

	AdminEditProductPage.prototype.render = function render() {
		idCounter = 0;
		var _props = this.props,
		    categories = _props.categories,
		    details = _props.details,
		    params = _props.params;
		var _state = this.state,
		    upload = _state.upload,
		    detailPostProgress = _state.detailPostProgress;

		var showAjaxLoading = upload.images.progress || upload.docs.progress || detailPostProgress || this.props.ajaxState > 0 || !categories || categories.length === 0;
		var tabId = 0;
		return _react2.default.createElement(
			'div',
			{ className: 'loading-wrap' },
			_react2.default.createElement(
				'div',
				{ className: 'ajax-loading-big ' + (showAjaxLoading ? 'fade-show' : 'fade-hide') },
				_ref3,
				_react2.default.createElement(
					'div',
					{ className: 'ajax-loading-progress' },
					detailPostProgress ? 'Apply Change... ' + detailPostProgress + ' % ' : upload.images.progress ? 'Upload Images Files... ' + upload.images.progress + ' % ' : upload.docs.progress ? 'Upload Docs Files... ' + upload.docs.progress + ' % ' : "Done !!"
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-12' },
					_react2.default.createElement(_Shared.Breadcrumb, { linkPair: [{ link: "Home", desc: "Home" }, { link: "/admin/productChange/0", desc: "Administration" }, { link: "", desc: params.id != 0 ? "Edit Product" : "Add Product" }] }),
					_react2.default.createElement(
						_Shared.BigHeader,
						{ smallTitle: '' },
						params.id != 0 ? 'Edit Product - ' + details.name : "Add Product"
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-12' },
					_react2.default.createElement(
						'button',
						{ className: 'btn btn-danger', onClick: this.submit },
						'Apply Change'
					)
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
						_react2.default.createElement(
							_reactTabsIsomorphic.TabList,
							null,
							_ref4,
							this.state.details.cat === 2 && _ref5,
							this.state.details.cat === 2 && _ref6,
							_ref7,
							_ref8
						),
						_react2.default.createElement(
							_reactTabsIsomorphic.TabPanel,
							null,
							_react2.default.createElement(_AdminEditBasicTab2.default, { details: this.state.details, tabId: tabId++, params: params, setData: this.setBasic, delArrayMember: this.delArrayMember,
								addArrayMember: this.addArrayMember, setNewFiles: this.setNewFiles, fileField: 'images', categories: categories, newImages: upload.images.newData })
						),
						this.state.details.cat === 2 && _react2.default.createElement(
							_reactTabsIsomorphic.TabPanel,
							null,
							_react2.default.createElement(_AdminEditStdPkgTab2.default, { tabId: tabId++, member: this.state.details.member, field: 'member', delArrayMember: this.delArrayMember,
								addArrayMember: this.addArrayMember, setArrayMember: this.setArrayMember })
						),
						this.state.details.cat === 2 && _react2.default.createElement(
							_reactTabsIsomorphic.TabPanel,
							null,
							_react2.default.createElement(_AdminEditOptTab2.default, { tabId: tabId++, member: this.state.details.optional, field: 'optional', delArrayMember: this.delArrayMember,
								addArrayMember: this.addArrayMember, setArrayMember: this.setArrayMember })
						),
						_react2.default.createElement(
							_reactTabsIsomorphic.TabPanel,
							null,
							_react2.default.createElement(_AdminEditSpecTab2.default, { tabId: tabId++, spec: this.state.details.spec, field: 'spec', delArrayMember: this.delArrayMember,
								setData: this.setSpecInput, addArrayMember: this.addArrayMember, setArrayMember: this.setArrayMember })
						),
						_react2.default.createElement(
							_reactTabsIsomorphic.TabPanel,
							null,
							_react2.default.createElement(_AdminEditDocsTab2.default, { tabId: tabId++, docs: this.state.details.docs, field: 'docs', delArrayMember: this.delArrayMember, newDocs: upload.docs.newData,
								fileField: 'docs', setNewDocs: this.setNewFiles, addArrayMember: this.addArrayMember, setArrayMember: this.setArrayMember })
						)
					)
				)
			)
		);
	};

	return AdminEditProductPage;
}(_react2.default.Component);

function mapStateToProps(state, ownProps) {
	return {
		categories: state.categories,
		details: state.details,
		ajaxState: state.ajaxCallsInProgress
	};
}

var AdminEditProductPageWrap = (0, _reactRedux.connect)(mapStateToProps)((0, _connectDataFetchers2.default)(AdminEditProductPage, [_detailsActions.loadDetails]));

exports.default = AdminEditProductPageWrap;

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

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.CustomTextInputTd = exports.CustomNumberInputTd = exports.CustomDel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomDel = function CustomDel(props) {
	return _react2.default.createElement(
		"td",
		{ className: "td-delete-item" },
		_react2.default.createElement("i", { className: "fa fa-close icon-item delete-item delete-item-rigth", "data-id": props.rowData.id, onClick: props.delItem })
	);
};


var CustomInput = function CustomInput(props) {
	return _react2.default.createElement("input", { className: "form-control", type: props.type, value: props.tdData, "data-id": props.rowData.id, name: props.field, onChange: props.setInput });
};


var CustomTextInputTd = function CustomTextInputTd(props) {
	return _react2.default.createElement(
		"td",
		null,
		_react2.default.createElement(CustomInput, _extends({ type: "text" }, props))
	);
};


var CustomNumberInputTd = function CustomNumberInputTd(props) {
	return _react2.default.createElement(
		"td",
		null,
		_react2.default.createElement(CustomInput, _extends({ type: "number" }, props))
	);
};
exports.CustomDel = CustomDel;
exports.CustomNumberInputTd = CustomNumberInputTd;
exports.CustomTextInputTd = CustomTextInputTd;

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

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var productEditColDetail = [{ desc: "ID", db: "_id", type: 1 }, { desc: "Image File", db: "imageUrl", type: 3 }, { desc: "Product Name", db: "name", type: 1 }, { desc: "Brand", db: "brand", type: 1 }, { desc: "Type", db: "type", type: 1 }, { desc: "Channel", db: "channel", type: 4 }, { desc: "Remote", db: "remote", type: 1 }, { desc: "Backup", db: "backup", type: 1 }, { desc: "HDD", db: "HDD", type: 1 }, { desc: "Video Output", db: "videoout", type: 1 }, { desc: "Compression", db: "compression", type: 1 }, { desc: "Sensor", db: "sensor", type: 1 }, { desc: "Resolution", db: "resolution", type: 1 }, { desc: "Lens", db: "lens", type: 1 }, { desc: "Feature", db: "feature", type: 1 }, { desc: "Description", db: "desc", type: 2 }, { desc: "PoE port", db: "PoEport", type: 4 }, { desc: "IR", db: "ir", type: 1 }, { desc: "Input/Output", db: "io", type: 1 }];
exports.productEditColDetail = productEditColDetail;

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminEditInputArray = function (_React$Component) {
	_inherits(AdminEditInputArray, _React$Component);

	function AdminEditInputArray(props) {
		_classCallCheck(this, AdminEditInputArray);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			newData: ""
		};
		_this.changeNewInputs = _this.changeNewInputs.bind(_this);
		_this.changeInputs = _this.changeInputs.bind(_this);
		_this.addNewData = _this.addNewData.bind(_this);
		_this.deleteItem = _this.deleteItem.bind(_this);
		return _this;
	}

	AdminEditInputArray.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	AdminEditInputArray.prototype.changeInputs = function changeInputs(e) {
		var index = parseInt(e.target.name);
		var nData = [].concat(this.props.data);
		nData[index] = e.target.value;
		this.props.setData(this.props.field, nData);
	};

	AdminEditInputArray.prototype.changeNewInputs = function changeNewInputs(e) {
		var newData = e.target.value;
		this.setState({ newData: newData });
	};

	AdminEditInputArray.prototype.addNewData = function addNewData() {
		this.setState({ newData: "" });
		this.props.addArrayMember(this.props.field, this.state.newData);
	};

	AdminEditInputArray.prototype.deleteItem = function deleteItem(e) {
		var id = parseInt(e.target.getAttribute("data-id"));
		this.props.deleteArrayMember(this.props.field, id);
	};

	AdminEditInputArray.prototype.render = function render() {
		var _this2 = this;

		return _react2.default.createElement(
			"div",
			null,
			_react2.default.createElement(
				"ul",
				{ className: "fa-ul ul-delete-item" },
				_react2.default.createElement(
					"li",
					null,
					_react2.default.createElement("input", { type: "text", className: "form-control", value: this.state.newData, onChange: this.changeNewInputs }),
					_react2.default.createElement("input", { type: "button", className: "btn btn-warning add-botton", value: "Add", onClick: this.addNewData })
				),
				this.props.data && this.props.data.map(function (item, id) {
					return _react2.default.createElement(
						"li",
						{ key: id },
						_react2.default.createElement("input", { type: "text", className: "form-control", value: item, name: id, onChange: _this2.changeInputs }),
						_react2.default.createElement("i", { className: "fa fa-close icon-item delete-item", "data-id": id, onClick: _this2.deleteItem })
					);
				})
			)
		);
	};

	return AdminEditInputArray;
}(_react2.default.Component);

exports.default = AdminEditInputArray;

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = __webpack_require__(481);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initItem = {
	name: "",
	details: ""
};

var AdminEditSpecBlock = function (_React$Component) {
	_inherits(AdminEditSpecBlock, _React$Component);

	function AdminEditSpecBlock(props) {
		_classCallCheck(this, AdminEditSpecBlock);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			newItem: initItem
		};
		_this.setInput = _this.setInput.bind(_this);
		_this.addNewItem = _this.addNewItem.bind(_this);
		_this.deleteItem = _this.deleteItem.bind(_this);
		_this.deleteGroup = _this.deleteGroup.bind(_this);
		_this.setNewItemInput = _this.setNewItemInput.bind(_this);
		// console.log("AdminEditSpecBlock, constructors", this.state);
		return _this;
	}

	AdminEditSpecBlock.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	AdminEditSpecBlock.prototype.setInput = function setInput(e) {
		var _subId, _members;

		var subId = parseInt(e.target.getAttribute("data-subId"));
		var subField = e.target.getAttribute("data-subField");
		var value = e.target.value.trim() || "";
		var newGroup = (0, _immutabilityHelper2.default)(this.props.group, {
			members: (_members = {}, _members[subId] = (_subId = {}, _subId[subField] = { $set: value }, _subId), _members)
		});
		this.props.setGroup(this.props.gid, newGroup);
		// this.props.actions.setDetailsSpec(data);
	};

	AdminEditSpecBlock.prototype.deleteItem = function deleteItem(e) {
		var subId = parseInt(e.target.getAttribute("data-subId"));
		var newGroup = (0, _immutabilityHelper2.default)(this.props.group, {
			members: { $splice: [[subId, 1]] } });
		this.props.setGroup(this.props.gid, newGroup);
	};

	AdminEditSpecBlock.prototype.deleteGroup = function deleteGroup(e) {
		this.props.deleteGroup(this.props.gid);
	};

	AdminEditSpecBlock.prototype.addNewItem = function addNewItem(e) {
		if (!this.state.newItem.name) {
			alert("Please Key In The Field Name!!");
			return;
		}
		var newGroup = (0, _immutabilityHelper2.default)(this.props.group, {
			members: { $push: [this.state.newItem] } });
		this.props.setGroup(this.props.gid, newGroup);
	};

	AdminEditSpecBlock.prototype.setNewItemInput = function setNewItemInput(e) {
		var _update;

		var subField = e.target.getAttribute("data-subField");
		var value = e.target.value.trim() || "";
		var newItem = (0, _immutabilityHelper2.default)(this.state.newItem, (_update = {}, _update[subField] = { $set: value }, _update));
		this.setState(function (state, props) {
			return { newItem: newItem };
		});
	};

	AdminEditSpecBlock.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    group = _props.group,
		    gid = _props.gid;
		var newItem = this.state.newItem;

		return _react2.default.createElement(
			'tbody',
			null,
			_react2.default.createElement(
				'tr',
				null,
				_react2.default.createElement(
					'td',
					{ colSpan: '2' },
					group.name
				),
				_react2.default.createElement(
					'td',
					{ className: 'td-delete-item' },
					_react2.default.createElement('i', { className: 'fa fa-close icon-item delete-item delete-item-left', 'data-id': gid, onClick: this.deleteGroup }),
					' '
				)
			),
			_react2.default.createElement(
				'tr',
				null,
				_react2.default.createElement(
					'td',
					{ style: { width: "30%" } },
					_react2.default.createElement('input', { type: 'text', value: newItem.name, onChange: this.setNewItemInput, className: 'form-control', 'data-subField': 'name' })
				),
				_react2.default.createElement(
					'td',
					null,
					_react2.default.createElement('input', { type: 'text', value: newItem.details, onChange: this.setNewItemInput, className: 'form-control', 'data-subField': 'details' })
				),
				_react2.default.createElement(
					'td',
					{ className: 'td-delete-item' },
					_react2.default.createElement('input', { type: 'button', className: 'btn btn-warning', value: 'Add Item', onClick: this.addNewItem })
				)
			),
			group.members.map(function (v, id) {
				return _react2.default.createElement(
					'tr',
					{ key: id },
					_react2.default.createElement(
						'td',
						{ style: { width: "30%" } },
						_react2.default.createElement('input', { type: 'text', value: v.name, onChange: _this2.setInput, className: 'form-control',
							name: group.name, 'data-id': gid, 'data-subId': id, 'data-subField': 'name' })
					),
					_react2.default.createElement(
						'td',
						null,
						_react2.default.createElement('input', { type: 'text', value: v.details, onChange: _this2.setInput, className: 'form-control',
							name: group.name, 'data-id': gid, 'data-subId': id, 'data-subField': 'details' })
					),
					_react2.default.createElement(
						'td',
						{ className: 'td-delete-item' },
						_react2.default.createElement('i', { className: 'fa fa-close icon-item delete-item delete-item-left', 'data-id': gid, 'data-subId': id, onClick: _this2.deleteItem })
					)
				);
			})
		);
	};

	return AdminEditSpecBlock;
}(_react2.default.Component);

exports.default = AdminEditSpecBlock;

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _SortableTbl = __webpack_require__(468);

var _SortabletblCustomInput = __webpack_require__(482);

var _immutabilityHelper = __webpack_require__(481);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
	'td',
	null,
	'Add Item'
);

var EditSortableTbl = function (_React$Component) {
	_inherits(EditSortableTbl, _React$Component);

	function EditSortableTbl(props) {
		_classCallCheck(this, EditSortableTbl);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			newItem: _this.props.pass.initItem
		};
		_this.setInput = _this.setInput.bind(_this);
		_this.addNewItem = _this.addNewItem.bind(_this);
		_this.deleteItem = _this.deleteItem.bind(_this);
		_this.setNewItemInput = _this.setNewItemInput.bind(_this);
		return _this;
	}

	EditSortableTbl.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	EditSortableTbl.prototype.setInput = function setInput(e) {
		var _id, _update;

		var id = parseInt(e.target.getAttribute("data-id")) - 1;
		var field = e.target.name;
		var value = e.target.value.trim() || "";
		var newArray = (0, _immutabilityHelper2.default)(this.props.member, (_update = {}, _update[id] = (_id = {}, _id[field] = { $set: value }, _id), _update));
		this.props.setArrayMember(this.props.tabId, this.props.field, newArray);
	};

	EditSortableTbl.prototype.deleteItem = function deleteItem(e) {
		var id = parseInt(e.target.getAttribute("data-id")) - 1;
		this.props.delArrayMember(this.props.tabId, this.props.field, id);
	};

	EditSortableTbl.prototype.addNewItem = function addNewItem(e) {
		if (!this.state.newItem) {
			alert("Please Key In The Field!!");
			return;
		}
		this.props.addArrayMember(this.props.tabId, this.props.field, this.state.newItem);
		this.setState({ newItem: this.props.pass.initItem });
	};

	EditSortableTbl.prototype.setNewItemInput = function setNewItemInput(e) {
		var _update2;

		var field = e.target.name;
		var value = e.target.value.trim() || "";
		var newItem = (0, _immutabilityHelper2.default)(this.state.newItem, (_update2 = {}, _update2[field] = { $set: value }, _update2));
		this.setState(function (state, props) {
			return { newItem: newItem };
		});
	};

	EditSortableTbl.prototype.render = function render() {
		var _this2 = this;

		var newItem = this.state.newItem;

		var nItem = this.props.pass.newItems;
		var tblData = this.props.member.map(function (item, id) {
			item.id = id + 1;return item;
		});
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'ul',
				null,
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						'table',
						{ className: 'table table-striped table-bordered table-hover p-spec' },
						_react2.default.createElement(
							'tbody',
							null,
							_react2.default.createElement(
								'tr',
								null,
								nItem.map(function (item, id) {
									return _react2.default.createElement(
										'td',
										{ key: id },
										item.desc
									);
								}),
								_ref
							),
							_react2.default.createElement(
								'tr',
								null,
								nItem.map(function (item, id) {
									return _react2.default.createElement(
										'td',
										{ key: id },
										_react2.default.createElement('input', { type: item.inputType, value: newItem[item.field], name: item.field, onChange: _this2.setNewItemInput, className: 'form-control' })
									);
								}),
								_react2.default.createElement(
									'td',
									null,
									_react2.default.createElement('input', { type: 'button', className: 'btn btn-warning', value: 'Add Item', onClick: this.addNewItem })
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(_SortableTbl.SortableTbl, { tblData: tblData,
						customTd: this.props.pass.customTd,
						tHead: this.props.pass.tHead,
						dKey: this.props.pass.dKey,
						setInput: this.setInput, delItem: this.deleteItem })
				)
			)
		);
		// return <WrappedComponent data={this.state.data} {...this.props} />;
	};

	return EditSortableTbl;
}(_react2.default.Component);

exports.default = EditSortableTbl;

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _AdminEditInputArray = __webpack_require__(490);

var _AdminEditInputArray2 = _interopRequireDefault(_AdminEditInputArray);

var _AdminEditImageArray = __webpack_require__(497);

var _AdminEditImageArray2 = _interopRequireDefault(_AdminEditImageArray);

var _General = __webpack_require__(489);

var _Shared = __webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialStateDB = {
	cat: 1,
	images: [],
	description: []
};
for (var _iterator = _General.productEditColDetail, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	var _ref;

	if (_isArray) {
		if (_i >= _iterator.length) break;
		_ref = _iterator[_i++];
	} else {
		_i = _iterator.next();
		if (_i.done) break;
		_ref = _i.value;
	}

	var item = _ref;

	initialStateDB[item.db] = "";
}

var _ref2 = _react2.default.createElement(
	"label",
	{ htmlFor: "productCategory" },
	"Product Category"
);

var _ref3 = _react2.default.createElement(
	"label",
	null,
	"Images "
);

var _ref4 = _react2.default.createElement(
	"label",
	null,
	"Description"
);

var AdminEditBasicTab = function (_React$Component) {
	_inherits(AdminEditBasicTab, _React$Component);

	function AdminEditBasicTab(props) {
		_classCallCheck(this, AdminEditBasicTab);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.setCategory = _this.setCategory.bind(_this);
		_this.setBasicInput = _this.setBasicInput.bind(_this);
		_this.getFormInput = _this.getFormInput.bind(_this);
		_this.setDataArray = _this.setDataArray.bind(_this);
		_this.setNewImages = _this.setNewImages.bind(_this);
		_this.deleteArrayMember = _this.deleteArrayMember.bind(_this);
		_this.addArrayMember = _this.addArrayMember.bind(_this);

		return _this;
	}

	AdminEditBasicTab.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	AdminEditBasicTab.prototype.setDataArray = function setDataArray(field, value) {
		this.props.setData(this.props.tabId, { field: field, value: value });
	};

	AdminEditBasicTab.prototype.deleteArrayMember = function deleteArrayMember(field, id) {
		this.props.delArrayMember(this.props.tabId, field, id);
	};

	AdminEditBasicTab.prototype.addArrayMember = function addArrayMember(field, data) {
		this.props.addArrayMember(this.props.tabId, field, data);
	};

	AdminEditBasicTab.prototype.setBasicInput = function setBasicInput(e) {
		var props = {};
		props[e.target.name] = e.target.value.trim() || "";
		this.props.setData(this.props.tabId, { field: e.target.name, value: props[e.target.name] });
	};

	AdminEditBasicTab.prototype.setNewImages = function setNewImages(images) {
		this.props.setNewFiles(this.props.tabId, this.props.fileField, images);
	};

	AdminEditBasicTab.prototype.setCategory = function setCategory(e) {
		var props = { cat: parseInt(e.target.value) };
		this.props.setData(this.props.tabId, { field: "cat", value: props.cat });
	};

	AdminEditBasicTab.prototype.getFormInput = function getFormInput(id) {
		var details = this.props.details;
		var item = _General.productEditColDetail[id];
		var inputValue = !details || details === {} || !details[item.db] ? "" : details[item.db];
		var inputId = item.db;
		var inputDesc = item.desc;
		var opts = {};
		if (inputId === "_id" && this.props.params.id != 0) {
			opts['disabled'] = 'disabled';
		}
		opts['id'] = inputId;
		opts['name'] = inputId;
		opts['placeholder'] = "Please Key In " + inputDesc;
		opts['onChange'] = this.setBasicInput;
		opts['value'] = inputValue;
		opts['className'] = "form-control";
		switch (item.type) {
			case 1:
				//text
				return _react2.default.createElement("input", _extends({ type: "text", value: this.props.details[item.db] }, opts));
			case 2:
				//textarea
				return _react2.default.createElement("textarea", _extends({ value: this.props.details[item.db], rows: "3" }, opts));
			case 3:
				//file
				return _react2.default.createElement("input", _extends({ type: "file", value: "" }, opts));
			case 4:
				//number
				return _react2.default.createElement("input", _extends({ type: "number", value: inputValue }, opts));
			default:
				//text
				return _react2.default.createElement("input", _extends({ type: "text", value: inputValue }, opts));
		}
	};

	AdminEditBasicTab.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    categories = _props.categories,
		    details = _props.details;

		var cat = categories.filter(function (item) {
			return item._id === details.cat;
		})[0];

		var categoryOpts = {};
		if (this.props.params.id != 0) {
			categoryOpts['disabled'] = 'disabled';
		}
		return _react2.default.createElement(
			"div",
			{ className: "admin-edit-tabwrap" },
			_react2.default.createElement(
				"div",
				{ className: "row" },
				_react2.default.createElement(
					"div",
					{ className: "col-xs-12" },
					_react2.default.createElement(
						"div",
						{ className: "form-group" },
						_ref2,
						_react2.default.createElement(
							"select",
							_extends({ className: "form-control", id: "productCategory", value: details.cat }, categoryOpts, { onChange: this.setCategory }),
							categories.map(function (item, id) {
								return _react2.default.createElement(
									"option",
									{ key: id, value: item._id },
									" ",
									item.categoryName
								);
							})
						)
					)
				),
				cat && cat.props && cat.props.map(function (item, id) {
					return item && _General.productEditColDetail[id].db !== "imageUrl" ? _react2.default.createElement(
						"div",
						{ key: id, className: "col-xs-12 " + (_General.productEditColDetail[id].db === "desc" ? '' : 'col-sm-6 col-lg-4') },
						_react2.default.createElement(
							"div",
							{ className: "form-group" },
							_react2.default.createElement(
								"label",
								{ htmlFor: _General.productEditColDetail[id].db },
								_General.productEditColDetail[id].desc
							),
							_this2.getFormInput(id)
						)
					) : "";
				})
			),
			_react2.default.createElement(
				"div",
				{ className: "row" },
				_react2.default.createElement(
					"div",
					{ className: "col-xs-12 col-md-6" },
					_react2.default.createElement(
						"div",
						{ className: "form-group" },
						_ref3,
						_react2.default.createElement(_AdminEditImageArray2.default, { data: this.props.details.images, field: "images", setNewImages: this.setNewImages, setData: this.setDataArray,
							newImages: this.props.newImages, deleteArrayMember: this.deleteArrayMember })
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "col-xs-12 col-md-6" },
					_react2.default.createElement(
						"div",
						{ className: "form-group" },
						_ref4,
						_react2.default.createElement(_AdminEditInputArray2.default, { data: this.props.details.description, field: "description", setData: this.setDataArray,
							deleteArrayMember: this.deleteArrayMember, addArrayMember: this.addArrayMember })
					)
				)
			)
		);
	};

	return AdminEditBasicTab;
}(_react2.default.Component);

exports.default = AdminEditBasicTab;

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _AdminEditSpecBlock = __webpack_require__(491);

var _AdminEditSpecBlock2 = _interopRequireDefault(_AdminEditSpecBlock);

var _SortableTbl = __webpack_require__(468);

var _SortabletblCustomInput = __webpack_require__(482);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement('div', null);

var _ref2 = _react2.default.createElement(
	'thead',
	null,
	_react2.default.createElement(
		'tr',
		null,
		_react2.default.createElement(
			'th',
			null,
			'File Name'
		),
		_react2.default.createElement(
			'th',
			null,
			'Size(KB)'
		),
		_react2.default.createElement(
			'th',
			null,
			'File Type'
		),
		_react2.default.createElement(
			'th',
			null,
			'Delete '
		)
	)
);

var _ref3 = _react2.default.createElement(
	'li',
	null,
	_react2.default.createElement('i', { className: 'fa-li fa fa-check-square' }),
	'\u5C07\u4E0A\u50B3\u4E4B\u6A94\u6848'
);

var _ref4 = _react2.default.createElement(
	'li',
	null,
	_react2.default.createElement('i', { className: 'fa-li fa fa-check-square' }),
	'\u5DF2\u4E0A\u50B3\u4E4B\u6A94\u6848'
);

var AdminEditDocsTab = function (_React$Component) {
	_inherits(AdminEditDocsTab, _React$Component);

	function AdminEditDocsTab(props) {
		_classCallCheck(this, AdminEditDocsTab);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.delItem = _this.delItem.bind(_this);
		_this.changeDocs = _this.changeDocs.bind(_this);
		_this.deleteInsertDocs = _this.deleteInsertDocs.bind(_this);
		return _this;
	}

	AdminEditDocsTab.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	AdminEditDocsTab.prototype.delItem = function delItem(e) {
		this.props.delArrayMember(this.props.tabId, this.props.field, parseInt(e.target.getAttribute("data-id")) - 1);
	};

	AdminEditDocsTab.prototype.changeDocs = function changeDocs(e) {
		var files = e.target.files;
		var nDocs = [].concat(this.props.newDocs);

		for (var id in files) {
			var file = files[id];
			if (file && file.type) {
				// console.log(file);
				nDocs.push({ file: file });
			}
		}
		this.props.setNewDocs(this.props.tabId, this.props.fileField, nDocs);
	};

	AdminEditDocsTab.prototype.deleteInsertDocs = function deleteInsertDocs(e) {
		var id = parseInt(e.target.getAttribute("data-id"));
		var nDocsFile = [].concat(this.props.newDocs.slice(0, id), this.props.newDocs.slice(id + 1, this.props.newDocs.length));
		this.props.setNewDocs(this.props.tabId, this.props.fileField, nDocsFile);
	};

	AdminEditDocsTab.prototype.getNewInsertTbl = function getNewInsertTbl() {
		var _this2 = this;

		if (!this.props.newDocs.length) return _ref;

		return _react2.default.createElement(
			'table',
			{ className: 'table table-striped table-bordered table-hover admin-docs-tbl' },
			_ref2,
			_react2.default.createElement(
				'tbody',
				null,
				this.props.newDocs.map(function (item, id) {
					return _react2.default.createElement(
						'tr',
						{ key: id },
						_react2.default.createElement(
							'td',
							null,
							item.file.name
						),
						_react2.default.createElement(
							'td',
							null,
							Math.ceil(item.file.size / 1024)
						),
						_react2.default.createElement(
							'td',
							null,
							item.type
						),
						_react2.default.createElement(
							'td',
							{ key: id, className: 'td-delete-item' },
							_react2.default.createElement('i', { className: 'fa fa-close icon-item delete-item delete-item-rigth', 'data-id': id, onClick: _this2.deleteInsertDocs })
						)
					);
				})
			)
		);
	};

	AdminEditDocsTab.prototype.render = function render() {
		var tblData = this.props.docs.map(function (item, id) {
			item.id = id + 1;return item;
		});
		return _react2.default.createElement(
			'div',
			{ className: '' },
			_react2.default.createElement(
				'ul',
				{ className: 'fa-ul' },
				_ref3,
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement('input', { type: 'file', accept: '*', className: 'form-control', id: 'uploadDocs', name: 'uploadDocs', multiple: true, value: '', onChange: this.changeDocs })
				),
				_react2.default.createElement(
					'li',
					null,
					this.getNewInsertTbl()
				),
				_ref4,
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(_SortableTbl.SortableTbl, { tblData: tblData,
						tHead: ["ID", "Description", "Size(KB)", "File Type", "Delete"],
						customTd: [{ custd: _SortabletblCustomInput.CustomDel, keyItem: "del" }],
						dKey: ["id", "desc", "size", "filetype", "del"],
						delItem: this.delItem })
				)
			)
		);
	};

	return AdminEditDocsTab;
}(_react2.default.Component);

exports.default = AdminEditDocsTab;

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
	'li',
	null,
	_react2.default.createElement('i', { className: 'fa-li fa fa-check-square' }),
	'\u5DF2\u4E0A\u50B3\u4E4B\u5716\u6A94'
);

var _ref2 = _react2.default.createElement(
	'li',
	null,
	_react2.default.createElement('i', { className: 'fa-li fa fa-check-square' }),
	'\u6B32\u65B0\u4E0A\u50B3\u4E4B\u6A94\u6848'
);

var AdminEditImageArray = function (_React$Component) {
	_inherits(AdminEditImageArray, _React$Component);

	function AdminEditImageArray(props) {
		_classCallCheck(this, AdminEditImageArray);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.changeImage = _this.changeImage.bind(_this);
		_this.deleteInsertImage = _this.deleteInsertImage.bind(_this);
		_this.deleteImage = _this.deleteImage.bind(_this);

		return _this;
	}

	AdminEditImageArray.prototype.componentDidMount = function componentDidMount() {};

	AdminEditImageArray.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	AdminEditImageArray.prototype.changeImage = function changeImage(e) {
		var _this2 = this;

		var files = e.target.files;
		var nImgs = [].concat(this.props.newImages);

		var _loop = function _loop(id) {
			var file = files[id];
			if (file && file.type && file.type.match('image.*')) {
				var reader = new FileReader();
				reader.onload = function (e) {
					nImgs.push({
						data_uri: e.target.result,
						file: file
					});
					_this2.props.setNewImages(nImgs);
				};
				reader.readAsDataURL(file);
			}
		};

		for (var id in files) {
			_loop(id);
		}
	};

	AdminEditImageArray.prototype.deleteInsertImage = function deleteInsertImage(e) {
		var id = parseInt(e.target.getAttribute("data-id"));
		var nImgFile = [].concat(this.props.newImages.slice(0, id), this.props.newImages.slice(id + 1, this.props.newImages.length));
		this.props.setNewImages(nImgFile);
	};

	AdminEditImageArray.prototype.deleteImage = function deleteImage(e) {
		var id = parseInt(e.target.getAttribute("data-id"));
		this.props.deleteArrayMember(this.props.field, id);
	};

	AdminEditImageArray.prototype.render = function render() {
		var _this3 = this;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'form',
				{ method: 'post', name: 'photo', id: 'imageuploadform' },
				_react2.default.createElement(
					'ul',
					{ className: 'fa-ul' },
					_ref,
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'upload-image-list-wrap' },
							this.props.data.map(function (item, id) {
								return id < _this3.props.data.length ? _react2.default.createElement(
									'div',
									{ key: id, className: 'upload-image-list' },
									_react2.default.createElement('i', { className: 'fa fa-close icon-item delete-item upload-image-delete', 'data-id': id, onClick: _this3.deleteImage }),
									' ',
									_react2.default.createElement('img', { className: 'upload-image', src: item })
								) : "";
							})
						)
					),
					_ref2,
					_react2.default.createElement(
						'li',
						null,
						_react2.default.createElement('input', { type: 'file', accept: 'image/*', className: 'form-control', id: 'uploadImages', name: 'uploadImages', multiple: true, value: '', onChange: this.changeImage }),
						_react2.default.createElement(
							'div',
							{ className: 'upload-image-list-wrap' },
							this.props.newImages.map(function (item, id) {
								return _react2.default.createElement(
									'div',
									{ key: id, className: 'upload-image-list' },
									_react2.default.createElement('i', { className: 'fa fa-close icon-item delete-item upload-image-delete', 'data-id': id, onClick: _this3.deleteInsertImage }),
									' ',
									_react2.default.createElement('img', { className: 'upload-image', src: item.data_uri })
								);
							})
						)
					)
				)
			)
		);
	};

	return AdminEditImageArray;
}(_react2.default.Component);

AdminEditImageArray.defaultProps = {
	data: []
};

exports.default = AdminEditImageArray;

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _EditSortableTbl = __webpack_require__(492);

var _EditSortableTbl2 = _interopRequireDefault(_EditSortableTbl);

var _SortabletblCustomInput = __webpack_require__(482);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initItem = {
	desc: ""
};
var customTd = [{ custd: _SortabletblCustomInput.CustomTextInputTd, keyItem: "desc" }, { custd: _SortabletblCustomInput.CustomDel, keyItem: "del" }];
var tHead = ["ID", "Description", "Delete"];
var dKey = ["id", "desc", "del"];
var newItems = [{ desc: "Description", inputType: "text", field: "desc" }];

var pass = { initItem: initItem, customTd: customTd, tHead: tHead, dKey: dKey, newItems: newItems };

var AdminEditOptTab = function (_React$Component) {
	_inherits(AdminEditOptTab, _React$Component);

	function AdminEditOptTab(props) {
		_classCallCheck(this, AdminEditOptTab);

		return _possibleConstructorReturn(this, _React$Component.call(this, props));
	}

	AdminEditOptTab.prototype.render = function render() {
		return _react2.default.createElement(_EditSortableTbl2.default, _extends({ pass: pass }, this.props));
	};

	return AdminEditOptTab;
}(_react2.default.Component);

exports.default = AdminEditOptTab;

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _AdminEditSpecBlock = __webpack_require__(491);

var _AdminEditSpecBlock2 = _interopRequireDefault(_AdminEditSpecBlock);

var _immutabilityHelper = __webpack_require__(481);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initItem = {
	name: "",
	details: ""
};
var initGroup = {
	name: "",
	members: []
};

var AdminEditSpecTab = function (_React$Component) {
	_inherits(AdminEditSpecTab, _React$Component);

	function AdminEditSpecTab(props) {
		_classCallCheck(this, AdminEditSpecTab);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			newGroup: initGroup,
			newItem: initItem
		};
		_this.setGroup = _this.setGroup.bind(_this);
		_this.addGroup = _this.addGroup.bind(_this);
		_this.deleteGroup = _this.deleteGroup.bind(_this);
		_this.setNewGrpInput = _this.setNewGrpInput.bind(_this);
		_this.setNewGrpName = _this.setNewGrpName.bind(_this);
		_this.addNewGroupItem = _this.addNewGroupItem.bind(_this);
		_this.setNewItemInput = _this.setNewItemInput.bind(_this);
		// console.log("AdminEditSpecTab, constructors", this.state);
		return _this;
	}

	AdminEditSpecTab.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

	AdminEditSpecTab.prototype.addGroup = function addGroup(e) {
		if (!this.state.newGroup.name) {
			alert("Please Key In The Name of Group Name!!");
			return;
		}
		this.props.addArrayMember(this.props.tabId, this.props.field, this.state.newGroup);
		this.setState({
			newGroup: initGroup,
			newItem: initItem
		});
	};

	AdminEditSpecTab.prototype.deleteGroup = function deleteGroup(gid) {
		var newSpec = (0, _immutabilityHelper2.default)(this.props.spec, {
			$splice: [[gid, 1]] });
		this.props.setArrayMember(this.props.tabId, this.props.field, newSpec);
	};

	AdminEditSpecTab.prototype.setGroup = function setGroup(gid, data) {
		var _update;

		var newSpec = (0, _immutabilityHelper2.default)(this.props.spec, (_update = {}, _update[gid] = { $set: data }, _update));
		this.props.setArrayMember(this.props.tabId, this.props.field, newSpec);
	};

	AdminEditSpecTab.prototype.setNewGrpInput = function setNewGrpInput(e) {
		var _subId, _members;

		var subId = parseInt(e.target.getAttribute("data-subId"));
		var subField = e.target.getAttribute("data-subField");
		var value = e.target.value.trim() || "";
		var newGroup = (0, _immutabilityHelper2.default)(this.state.newGroup, {
			members: (_members = {}, _members[subId] = (_subId = {}, _subId[subField] = { $set: value }, _subId), _members)
		});
		this.setState(function (state, props) {
			return { newGroup: newGroup };
		});
	};

	AdminEditSpecTab.prototype.setNewGrpName = function setNewGrpName(e) {
		var value = e.target.value.trim() || "";
		var newGroup = (0, _immutabilityHelper2.default)(this.state.newGroup, {
			name: { $set: value }
		});
		this.setState(function (state, props) {
			return { newGroup: newGroup };
		});
	};

	AdminEditSpecTab.prototype.addNewGroupItem = function addNewGroupItem(e) {
		if (!this.state.newItem.name) {
			alert("Please Key In The Field Name!!");
			return;
		}
		var newGroup = (0, _immutabilityHelper2.default)(this.state.newGroup, {
			members: { $push: [this.state.newItem] } });
		this.setState(function (state, props) {
			return { newGroup: newGroup, newItem: initItem };
		});
	};

	AdminEditSpecTab.prototype.setNewItemInput = function setNewItemInput(e) {
		var _update2;

		var subField = e.target.getAttribute("data-subField");
		var value = e.target.value.trim() || "";
		var newItem = (0, _immutabilityHelper2.default)(this.state.newItem, (_update2 = {}, _update2[subField] = { $set: value }, _update2));
		this.setState(function (state, props) {
			return { newItem: newItem };
		});
	};

	AdminEditSpecTab.prototype.render = function render() {
		var _this2 = this;

		var _state = this.state,
		    newGroup = _state.newGroup,
		    newItem = _state.newItem;
		var spec = this.props.spec;

		return _react2.default.createElement(
			'div',
			{ className: 'admin-edit-tabwrap' },
			_react2.default.createElement(
				'div',
				{ id: 'p-spec' },
				_react2.default.createElement(
					'table',
					{ className: 'table table-striped table-bordered table-hover p-spec' },
					_react2.default.createElement(
						'tbody',
						null,
						_react2.default.createElement(
							'tr',
							null,
							_react2.default.createElement(
								'td',
								{ colSpan: '2' },
								_react2.default.createElement('input', { type: 'text', value: newGroup.name, onChange: this.setNewGrpName, className: 'form-control' })
							),
							_react2.default.createElement(
								'td',
								null,
								_react2.default.createElement('input', { type: 'button', className: 'btn btn-warning', value: 'Add Group', onClick: this.addGroup })
							)
						),
						_react2.default.createElement(
							'tr',
							null,
							_react2.default.createElement(
								'td',
								{ style: { width: "30%" } },
								_react2.default.createElement('input', { type: 'text', value: newItem.name, onChange: this.setNewItemInput, className: 'form-control', 'data-subField': 'name' })
							),
							_react2.default.createElement(
								'td',
								null,
								_react2.default.createElement('input', { type: 'text', value: newItem.details, onChange: this.setNewItemInput, className: 'form-control', 'data-subField': 'details' })
							),
							_react2.default.createElement(
								'td',
								{ className: 'td-delete-item' },
								_react2.default.createElement('input', { type: 'button', className: 'btn btn-warning', value: 'Add Item', onClick: this.addNewGroupItem })
							)
						),
						newGroup.members.map(function (v, id) {
							return _react2.default.createElement(
								'tr',
								{ key: id },
								_react2.default.createElement(
									'td',
									{ style: { width: "30%" } },
									_react2.default.createElement('input', { type: 'text', value: v.name, onChange: _this2.setNewGrpInput, className: 'form-control', 'data-subId': id, 'data-subField': 'name' })
								),
								_react2.default.createElement(
									'td',
									null,
									_react2.default.createElement('input', { type: 'text', value: v.details, onChange: _this2.setNewGrpInput, className: 'form-control', 'data-subId': id, 'data-subField': 'details' })
								)
							);
						})
					),
					spec && spec.map(function (item, id) {
						return _react2.default.createElement(_AdminEditSpecBlock2.default, { key: id, gid: id, group: item, addItem: _this2.addItem,
							deleteGroup: _this2.deleteGroup,
							setGroup: _this2.setGroup });
					})
				)
			)
		);
	};

	return AdminEditSpecTab;
}(_react2.default.Component);

exports.default = AdminEditSpecTab;

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _EditSortableTbl = __webpack_require__(492);

var _EditSortableTbl2 = _interopRequireDefault(_EditSortableTbl);

var _SortabletblCustomInput = __webpack_require__(482);

var _immutabilityHelper = __webpack_require__(481);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initItem = {
	desc: "",
	qty: ""
};
var customTd = [{ custd: _SortabletblCustomInput.CustomTextInputTd, keyItem: "desc" }, { custd: _SortabletblCustomInput.CustomNumberInputTd, keyItem: "qty" }, { custd: _SortabletblCustomInput.CustomDel, keyItem: "del" }];
var tHead = ["ID", "Description", "Qty", "Delete"];
var dKey = ["id", "desc", "qty", "del"];
var newItems = [{ desc: "Description", inputType: "text", field: "desc" }, { desc: "Qty", inputType: "number", field: "qty" }];

var pass = { initItem: initItem, customTd: customTd, tHead: tHead, dKey: dKey, newItems: newItems };

var AdminEditStdPkgTab = function (_React$Component) {
	_inherits(AdminEditStdPkgTab, _React$Component);

	function AdminEditStdPkgTab(props) {
		_classCallCheck(this, AdminEditStdPkgTab);

		return _possibleConstructorReturn(this, _React$Component.call(this, props));
	}

	AdminEditStdPkgTab.prototype.render = function render() {
		return _react2.default.createElement(_EditSortableTbl2.default, _extends({ pass: pass }, this.props));
	};

	return AdminEditStdPkgTab;
}(_react2.default.Component);

exports.default = AdminEditStdPkgTab;

/***/ })

};;