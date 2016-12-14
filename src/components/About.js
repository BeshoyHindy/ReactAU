require('../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../img', true, /\.?/);

import React from 'react';

class About extends React.Component{
		constructor(props) {
			super(props);
		}

		componentWillMount() {
			//console.log('it', this.props.it);

		}

		render() {
			return (
<div className="container">
	<div className="row">
			<div className="col-lg-12">
					<ol className="breadcrumb">
							<li><a href="/index.html">About</a></li>
							<li className="active">About Us</li>
					</ol>
					<h1 className="page-header">About Us
							<small>Provide friendly services and reliable support</small>
					</h1>
			</div>
			<div className="col-sm-9">
					<div className="about">
					<p>At <span className="text_logo"><strong>Hi-Tech Digital CCTV</strong></span>, our aim is to provide you with <b>professional</b> advice through our <b>experience</b> to satisfy all your security surveillance needs through our <b>friendly services</b>. We will only provide you with products of the highest <b>quality</b> for your surveillance soultion and will continue to provide an ongoing <b>reliable</b> support.
					</p>
					<p>Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its <b>quality</b> while still maintaining an <b>affordable</b> price.</p>
					<p>To meet all your needs, we endeavour to <b>explain</b> all the functions and features of our products until you <b>understand</b> them <b>clearly</b> before you make any decisions. We will continue to provide <b>friendly</b> services and <b>reliable</b> support to our customers to ensure the best results can be obtained from our products.</p>
					</div>
			</div>
			<div className="col-sm-3">
				<img className="img-responsive asia center" src="img/ASIALmemberjpeg_hires.jpg"/>
			</div>
			<div className="col-sm-12">
					<h1 className="page-header">Brands We Carry
					</h1>
			</div>

			<div className="col-sm-12 brand">
					<p className="note">These logos are all copyright of their respective owners.</p>
					<table className="table borderless">
							<tr><td><img className="img-responsive" src="img/brands/bosch.jpg"/></td>
									<td><img className="img-responsive" src="img/brands/DigiGuard.jpg"/></td>
									<td><img className="img-responsive" src="img/brands/everfocus.png"/></td>
									<td><img className="img-responsive" src="img/brands/futuro.png"/></td>
							</tr>
							<tr><td><img className="img-responsive" src="img/brands/honeywell.gif"/></td>
									<td><img className="img-responsive" src="img/brands/hikvision.png"/></td>
									<td><img className="img-responsive" src="img/brands/Haakili.jpg"/></td>
									<td><img className="img-responsive" src="img/brands/icatch.png"/></td>
							</tr>
							<tr>
								 <td><img className="img-responsive" src="img/brands/kce.gif"/></td>
								 <td><img className="img-responsive" src="img/brands/secuzone.png"/></td>
								 <td><img className="img-responsive" src="img/brands/asmsung_l.jpg"/></td>
								 <td><img className="img-responsive" src="img/brands/unimo.jpg"/></td>
							</tr>
					</table>
			</div>
	</div>
</div>
			);
		}

}

export {About};