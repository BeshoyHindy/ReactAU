exports.ids = [6];
exports.modules = {

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(15);

var _ImageLoader = __webpack_require__(206);

var _Shared = __webpack_require__(204);

var _ContactData = __webpack_require__(211);

var _ImageList = __webpack_require__(487);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {
    require('./contact.scss');
}

function FrontImgpreloader() {
    return _react2.default.createElement('div', { className: 'loading-div', style: { minHeight: "368px" } });
}

var ContactDetail = function ContactDetail(props) {
    return _react2.default.createElement(
        'div',
        { className: 'contact-bar' },
        _react2.default.createElement(
            'div',
            { className: 'title' },
            _react2.default.createElement(
                'abbr',
                { title: props.title },
                _react2.default.createElement('i', { className: props.iconClass }),
                ' '
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'content' },
            props.link ? _react2.default.createElement(
                'a',
                { href: props.link },
                '   ',
                _react2.default.createElement(_Shared.PureList, { data: props.content }),
                ' '
            ) : _react2.default.createElement(_Shared.PureList, { data: props.content })
        )
    );
};


var ContactBoard = function ContactBoard(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            { className: 'col-xs-12 address' },
            props.contactData.map(function (item, id) {
                return item.title === "Address" && _react2.default.createElement(_Shared.PureList, { key: id, data: item.content });
            })
        ),
        _react2.default.createElement(
            'div',
            { className: 'col-xs-12 c' },
            props.contactData.map(function (item, id) {
                return item.iconClass && _react2.default.createElement(ContactDetail, _extends({ key: id }, item));
            })
        )
    );
};

var _ref = _react2.default.createElement(
    _Shared.BigHeader,
    { smallTitle: 'We\'d Love to Hear From You!' },
    'Contact'
);

var _ref2 = _react2.default.createElement(
    'div',
    { className: 'col-lg-12' },
    _react2.default.createElement(_Shared.GoogleMap, { link: _ContactData.gMapLinkData })
);

var _ref3 = _react2.default.createElement(
    'div',
    { className: 'col-xs-12' },
    _react2.default.createElement(
        _Shared.BigHeader,
        { smallTitle: '' },
        _react2.default.createElement(
            'b',
            null,
            'Hi-Tech'
        ),
        ' Digital CCTV'
    )
);

var _ref4 = _react2.default.createElement(
    'div',
    { className: 'col-sm-5 col-md-4' },
    _react2.default.createElement(
        'div',
        { className: 'about contact col-xs-12' },
        _react2.default.createElement(ContactBoard, { contactData: _ContactData.contactData })
    )
);

var ContactPage = function ContactPage(props) {
    return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'col-lg-12' },
                _react2.default.createElement(_Shared.Breadcrumb, { linkPair: [{ link: "/home", desc: "Home" }, { link: "", desc: "Contact" }] }),
                _ref
            ),
            _ref2
        ),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _ref3,
            _ref4,
            _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-sm-7 col-md-8 front-door' },
                _react2.default.createElement(
                    'div',
                    { className: 'front-door-photo' },
                    _react2.default.createElement(_ImageLoader.ImageLoader, {
                        src: _ContactData.frontImgData[0], minHeight: '383px',
                        alt: 'Hi-Tech Digital CCTV,  Unit 10/62 Hume Highway, Corner of Knight Street, Lansvale 2166, NSW Australia',
                        title: 'Hi-Tech Digital CCTV, Unit 10/62 Hume Highway, Corner of Knight Street, Lansvale 2166, NSW Australia'
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'front-door-t' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'front-thumbs' },
                        _ContactData.frontImgData.map(function (item, id) {
                            return _react2.default.createElement(_ImageList.ImageList, { key: id, src: item, minHeight: '120px',
                                alt: 'Hi-Tech Digital CCTV, Unit 10/62 Hume Highway, Corner of Knight Street, Lansvale 2166, NSW Australia',
                                title: 'Hi-Tech Digital CCTV, Unit 10/62 Hume Highway, Corner of Knight Street, Lansvale 2166, NSW Australia'
                            });
                        })
                    )
                )
            )
        )
    );
};

exports.default = ContactPage;

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

/***/ })

};;