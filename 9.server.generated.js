exports.ids = [9];
exports.modules = {

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _reactRedux = __webpack_require__(39);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(107);

var _authAction = __webpack_require__(57);

var actions = _interopRequireWildcard(_authAction);

var _connectDataFetchers = __webpack_require__(205);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

var _adminActions = __webpack_require__(207);

var _Shared = __webpack_require__(204);

var _renderReduxForm = __webpack_require__(106);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (false) {
		require('./auth.sass');
}

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
				'Sign Up'
		)
);

var _ref3 = _react2.default.createElement(
		'div',
		{ className: 'col-lg-12' },
		_react2.default.createElement(_reduxForm.Field, { name: 'email', component: _renderReduxForm.renderField, type: 'email', label: 'E-Mail' }),
		_react2.default.createElement(_reduxForm.Field, { name: 'password', component: _renderReduxForm.renderField, type: 'password', label: 'Password' }),
		_react2.default.createElement(_reduxForm.Field, { name: 'passwordConfirm', component: _renderReduxForm.renderField, type: 'password', label: 'Confirm Password' })
);

var _ref4 = _react2.default.createElement('hr', null);

var SignupPage = function (_React$Component) {
		_inherits(SignupPage, _React$Component);

		function SignupPage(props) {
				_classCallCheck(this, SignupPage);

				var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

				_this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
				_this.renderAlert = _this.renderAlert.bind(_this);
				return _this;
		}

		SignupPage.prototype.handleFormSubmit = function handleFormSubmit(values) {
				// Call action creator to sign up the user!
				var email = values.email,
				    password = values.password;

				this.props.userSignup({ email: email, password: password });
		};

		SignupPage.prototype.renderAlert = function renderAlert() {
				if (this.props.errorMessage) {
						return _react2.default.createElement(
								'div',
								{ className: 'alert alert-danger' },
								_ref,
								' ',
								this.props.errorMessage,
								' !!'
						);
				}
		};

		SignupPage.prototype.render = function render() {
				var _props = this.props,
				    handleSubmit = _props.handleSubmit,
				    pristine = _props.pristine,
				    submitting = _props.submitting;


				return _react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
								'div',
								{ className: 'row' },
								_react2.default.createElement(
										'div',
										{ className: 'col-lg-12 ' },
										_react2.default.createElement(_Shared.Breadcrumb, { linkPair: [{ link: "user", desc: "User" }, { link: "signup", desc: "Sign Up" }] }),
										_react2.default.createElement(
												'div',
												{ className: 'well' },
												_react2.default.createElement(
														'div',
														{ className: 'panel sign-up-panel' },
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
																				{ className: 'col-lg-12' },
																				this.renderAlert(),
																				_ref4,
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
								)
						)
				);
		};

		return SignupPage;
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

function mapStateToProps(state) {
		return { errorMessage: state.auth.error };
}

exports.default = _reactRedux.connect.apply(undefined, [mapStateToProps].concat(actions))((0, _reduxForm.reduxForm)({
		form: 'signup',
		validate: validate })(SignupPage));

/***/ })

};;