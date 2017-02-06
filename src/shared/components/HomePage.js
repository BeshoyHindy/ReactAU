import Carousel from './Shared/Carousel';
import React from 'react';
import { connect } from 'react-redux';

import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { loadCategories } from '../actions/adminActions';

const Child1 = (props) => (
	<div className="banner1 my-switch-animation">
						<div className="bg" />
		<div className="word">
			<h2>DVR and NVR</h2>
			<h3>See you anywhere anytime</h3>
		</div>
	</div>);

const Child2 = (props) => (
	<div className="banner2 my-switch-animation">
		<div className="bg" />
		<div className="word">
			<h2>Instrusion Alarm</h2>
			<h3>Solid protection for you</h3>
		</div>
	</div>
);

const Child3 = (props) => (
	<div className="banner3 my-switch-animation">
		<div className="bg" />
		<div className="word">
			<h2>CCTV Camera</h2>
			<h3>Connect everywhere</h3>
		</div>
	</div>
);

const HomePage = (props) => {
	let settings = {
		thumb: false,
		loop: true,
		autoplay : 5000,
		carouselChildren: [Child1, Child2, Child3]
	};
	return (
	<div className="home-banner">
		<div className="well banner">
			<div className="panel-body" >
				<Carousel {...settings} />					
			</div>
		</div>
	</div>
	);
};

HomePage.propTypes = {
};

export default connect()(connectDataFetchers(HomePage, [ loadCategories ]));
