exports.ids = [7];
exports.modules = {

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _ImageLoader = __webpack_require__(206);

var _AboutData = __webpack_require__(494);

var _Shared = __webpack_require__(204);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {
	require('./about.scss');
}


function BrandImgpreloader() {
	return _react2.default.createElement('div', { className: 'loading-div', style: { minHeight: "100px" } });
}

var _ref = _react2.default.createElement(
	_Shared.BigHeader,
	{ smallTitle: 'Provide friendly services and reliable support' },
	'About Us'
);

var _ref2 = _react2.default.createElement(
	'div',
	{ className: 'col-sm-9' },
	_react2.default.createElement(
		_Shared.OrangeBoard,
		null,
		_react2.default.createElement(
			'p',
			null,
			'At ',
			_react2.default.createElement(
				'span',
				{ className: 'text_logo' },
				_react2.default.createElement(
					'strong',
					null,
					'Hi-Tech Digital CCTV'
				)
			),
			', our aim is to provide you with ',
			_react2.default.createElement(
				'b',
				null,
				'professional'
			),
			' advice through our ',
			_react2.default.createElement(
				'b',
				null,
				'experience'
			),
			' to satisfy all your security surveillance needs through our ',
			_react2.default.createElement(
				'b',
				null,
				'friendly services'
			),
			'. We will only provide you with products of the highest ',
			_react2.default.createElement(
				'b',
				null,
				'quality'
			),
			' for your surveillance soultion and will continue to provide an ongoing ',
			_react2.default.createElement(
				'b',
				null,
				'reliable'
			),
			' support.'
		),
		_react2.default.createElement(
			'p',
			null,
			'Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its ',
			_react2.default.createElement(
				'b',
				null,
				'quality'
			),
			' while still maintaining an ',
			_react2.default.createElement(
				'b',
				null,
				'affordable'
			),
			' price.'
		),
		_react2.default.createElement(
			'p',
			null,
			'To meet all your needs, we endeavour to ',
			_react2.default.createElement(
				'b',
				null,
				'explain'
			),
			' all the functions and features of our products until you ',
			_react2.default.createElement(
				'b',
				null,
				'understand'
			),
			' them ',
			_react2.default.createElement(
				'b',
				null,
				'clearly'
			),
			' before you make any decisions. We will continue to provide ',
			_react2.default.createElement(
				'b',
				null,
				'friendly'
			),
			' services and ',
			_react2.default.createElement(
				'b',
				null,
				'reliable'
			),
			' support to our customers to ensure the best results can be obtained from our products.'
		)
	)
);

var _ref3 = _react2.default.createElement(
	'div',
	{ className: 'col-sm-3' },
	_react2.default.createElement('img', { className: 'img-responsive asia center', alt: 'Ausrtralian Security Industry Association Limited', title: 'Ausrtralian Security Industry Association Limited', src: 'img/ASIALmemberjpeg_hires.jpg' })
);

var _ref4 = _react2.default.createElement(
	'div',
	{ className: 'col-sm-12' },
	_react2.default.createElement(
		_Shared.BigHeader,
		{ smallTitle: '' },
		'Brands We Carry'
	)
);

var _ref5 = _react2.default.createElement(
	'p',
	{ className: 'note' },
	'These logos are all copyright of their respective owners.'
);

var AboutPage = function AboutPage(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'container' },
		_react2.default.createElement(
			'div',
			{ className: 'row' },
			_react2.default.createElement(
				'div',
				{ className: 'col-lg-12' },
				_react2.default.createElement(_Shared.Breadcrumb, { linkPair: [{ link: "Home", desc: "Home" }, { link: "", desc: "About Us" }] }),
				_ref
			),
			_ref2,
			_ref3,
			_ref4,
			_react2.default.createElement(
				'div',
				{ className: 'col-sm-12 brand' },
				_ref5,
				_react2.default.createElement(
					'table',
					{ className: 'table borderless' },
					_react2.default.createElement(
						'tbody',
						null,
						_AboutData.BrandsData.reduce(function (acc, cur, curId) {
							curId % 4 === 0 ? acc.push([cur]) : acc[acc.length - 1].push(cur);
							return acc;
						}, []).map(function (item, id) {
							return _react2.default.createElement(
								'tr',
								{ key: id },
								item.map(function (item, id) {
									return _react2.default.createElement(
										'td',
										{ key: id },
										_react2.default.createElement(_ImageLoader.ImageLoader, { src: item.img, alt: item.brand, title: item.brand, minHeight: '60px' })
									);
								})
							);
						})
					)
				)
			)
		)
	);
};

exports.default = AboutPage;

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var BrandsData = [{ brand: "BOSCH", img: "/img/brands/bosch.jpg" }, { brand: "DigiGuard", img: "/img/brands/DigiGuard.jpg" }, { brand: "EverFocus", img: "/img/brands/everfocus.png" }, { brand: "FUTURO", img: "/img/brands/futuro.png" }, { brand: "Honeywell", img: "/img/brands/honeywell.gif" }, { brand: "HIKVISION", img: "/img/brands/hikvision.png" }, { brand: "Haakili", img: "/img/brands/Haakili.jpg" }, { brand: "iCATCH", img: "/img/brands/icatch.png" }, { brand: "KCE", img: "/img/brands/kce.gif" }, { brand: "Secuzone", img: "/img/brands/secuzone.png" }, { brand: "Samsung", img: "/img/brands/asmsung_l.jpg" }, { brand: "UNIMO", img: "/img/brands/unimo.jpg" }];

exports.BrandsData = BrandsData;

/***/ })

};;