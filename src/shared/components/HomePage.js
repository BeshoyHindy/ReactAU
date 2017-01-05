import Slider from 'react-slick';

import React from 'react';

const HomePage = (props) => {
	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true
	};
	return (
	<div className="home-banner">
		<div className="well banner">
			<div className="panel-body" >
				<Slider {...settings}>
					<div className="banner1 my-switch-animation">
						<div className="bg" />
						<div className="word">
							<h2>DVR and NVR</h2>
							<h3>See you anywhere anytime</h3>
						</div>
					</div>
					<div className="banner2 my-switch-animation">
						<div className="bg" />
						<div className="word">
							<h2>Instrusion Alarm</h2>
							<h3>Solid protection for you</h3>
						</div>
					</div>
					<div className="banner3 my-switch-animation">
						<div className="bg" />
						<div className="word">
							<h2>CCTV Camera</h2>
							<h3>Connect everywhere</h3>
						</div>
					</div>
				</Slider>
			</div>
		</div>
	</div>
	);
}

HomePage.propTypes = {
};



export {HomePage};
