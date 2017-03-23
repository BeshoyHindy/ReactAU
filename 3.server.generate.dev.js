exports.ids = [3];
exports.modules = {

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortableTblPager", function() { return SortableTblPager; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



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

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'div',
			{ className: 'pager' },
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				'div',
				{ className: 'form-group' },
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'prev-next' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'button', className: 'btn btn-default', name: '', disabled: prevDisableStyle,
						onClick: this.subPage, value: 'Prev' }),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ onChange: this.setCurrentPage, value: this.state.currPage, className: 'form-control page-select' },
						Array.from(new Array(this.props.totalPage), function (x, i) {
							return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ key: i, value: i },
								i + 1
							);
						})
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'button', className: 'btn btn-default', name: '', disabled: nextDisableStyle,
						onClick: this.addPagge, value: 'Next' })
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'row-per-page' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ htmlFor: 'rowsPerPage', className: 'SortableTblLabel' },
						' Show'
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'select',
						{ id: 'rowsPerPage', onChange: this.setRowsPerPage, value: rowPerPage, className: 'form-control page-select' },
						[5, 10, 20, 50, 'All'].map(function (item, id) {
							return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
								'option',
								{ key: id, value: item },
								item
							);
						})
					),
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'label',
						{ className: 'SortableTblLabel' },
						'entries'
					)
				),
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
					'div',
					{ className: 'desc' },
					__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

SortableTblPager.propTypes = {
	curr: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number.isRequired,
	rowPerPage: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number.isRequired,
	totalsCount: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number.isRequired,
	totalPage: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number.isRequired,
	setCurrentPage: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func.isRequired,
	setRowsPerPage: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func.isRequired
};



/***/ })

};;