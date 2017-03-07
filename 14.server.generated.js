exports.ids = [14];
exports.modules = {

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(107);

var _AdminApi = __webpack_require__(210);

var _AdminApi2 = _interopRequireDefault(_AdminApi);

var _connectDataFetchers = __webpack_require__(205);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

var _adminActions = __webpack_require__(207);

var _Shared = __webpack_require__(204);

var _renderReduxForm = __webpack_require__(106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2.default.createElement(
	'strong',
	null,
	'Oops!'
);

var _ref2 = _react2.default.createElement(
	'div',
	{ className: 'panel-heading' },
	_react2.default.createElement(
		'h3',
		{ className: 'panel-title' },
		'Add User'
	)
);

var _ref3 = _react2.default.createElement(
	'div',
	{ className: 'col-lg-6 ' },
	_react2.default.createElement(_reduxForm.Field, { name: 'picture', component: _renderReduxForm.renderDropzoneInput, label: 'Add a picture' }),
	_react2.default.createElement(_reduxForm.Field, { name: 'username', component: _renderReduxForm.renderField, type: 'text', label: 'User Name' })
);

var _ref4 = _react2.default.createElement(_reduxForm.Field, { name: 'email', component: _renderReduxForm.renderField, type: 'email', label: 'E-Mail', require: true });

var _ref5 = _react2.default.createElement(_reduxForm.Field, { name: 'password', component: _renderReduxForm.renderField, type: 'password', label: 'Password', require: true });

var _ref6 = _react2.default.createElement(_reduxForm.Field, { name: 'passwordConfirm', component: _renderReduxForm.renderField, type: 'password', label: 'Confirm Password', require: true });

var _ref7 = _react2.default.createElement('hr', null);

var AddUserPage = function (_React$Component) {
	_inherits(AddUserPage, _React$Component);

	function AddUserPage(props) {
		_classCallCheck(this, AddUserPage);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.state = {
			upload: 0,
			errorMessage: "",
			success: false
		};
		_this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
		_this.renderAlert = _this.renderAlert.bind(_this);
		_this.fileProgress = _this.fileProgress.bind(_this);
		return _this;
	}

	AddUserPage.prototype.handleFormSubmit = function handleFormSubmit(values) {
		var _this2 = this;

		var FileUploadProgress = function FileUploadProgress(p) {
			return _this2.fileProgress(p);
		};
		var formData = new FormData();
		formData.append('password', values.password);
		formData.append('email', values.email);
		formData.append('username', values.username);
		formData.append('accessRight', values.accessRight);
		if (values.picture) {
			formData.append('upload_picture', values.picture[0]);
		}
		this.setState({ upload: 1 });

		_AdminApi2.default.addUser(formData, FileUploadProgress).then(function (e) {
			_this2.setState({ upload: 0, errorMessage: "", success: true });
		}).catch(function (error) {
			_this2.setState({ upload: 0, errorMessage: "Process Fail, Error Message: " + error.err, success: false });
		});
	};

	AddUserPage.prototype.fileProgress = function fileProgress(progressEvent) {
		var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
		this.setState({ upload: percentCompleted });
	};

	AddUserPage.prototype.renderAlert = function renderAlert() {
		if (this.state.errorMessage || this.state.success) {
			return _react2.default.createElement(
				'div',
				{ className: 'alert ' + (this.state.success ? "alert-success" : "alert-danger") },
				this.state.success ? "Success !!" : _react2.default.createElement(
					'div',
					null,
					_ref,
					' ',
					this.state.errorMessage,
					' !!'
				)
			);
		}
	};

	AddUserPage.prototype.render = function render() {
		var _props = this.props,
		    handleSubmit = _props.handleSubmit,
		    pristine = _props.pristine,
		    submitting = _props.submitting;


		return _react2.default.createElement(
			'div',
			{ className: 'col-lg-12 ' },
			_react2.default.createElement(_Shared.Breadcrumb, { linkPair: [{ link: "Home", desc: "Home" }, { link: "/admin/productChange/0", desc: "Administration" }, { link: "/admin/addUser", desc: "Add User" }] }),
			_react2.default.createElement(
				'div',
				{ className: 'well' },
				_react2.default.createElement(
					'div',
					{ className: 'panel panel-danger add-user-panel' },
					_ref2,
					_react2.default.createElement(
						'div',
						{ className: 'panel-body sign-up' },
						_react2.default.createElement(
							'form',
							{ onSubmit: handleSubmit(this.handleFormSubmit) },
							_ref3,
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-6 ' },
								_ref4,
								_ref5,
								_ref6,
								_react2.default.createElement(_reduxForm.Field, { name: 'accessRight', component: _renderReduxForm.renderSelectField, label: 'User Type',
									options: [{ value: "0", text: "Normal User" }, { value: "8", text: "Administrator" }] })
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-12' },
								this.renderAlert(),
								_ref7,
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

	return AddUserPage;
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

exports.default = (0, _reduxForm.reduxForm)({
	form: 'adduser',
	validate: validate })(AddUserPage);

/***/ })

};;