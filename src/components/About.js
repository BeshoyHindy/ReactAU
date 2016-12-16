import React from 'react';
import { Link} from 'react-router';
import {BrandsData} from '../Data/AboutData';

import { Breadcrumb , BigHeader, OrangeBoard} from "./Shared";

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
				<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"", desc:"About Us"}]}/>
				<BigHeader smallTitle="Provide friendly services and reliable support">About Us</BigHeader>
			</div>
			<div className="col-sm-9">
				<OrangeBoard>
					<p>At <span className="text_logo"><strong>Hi-Tech Digital CCTV</strong></span>, our aim is to provide you with <b>professional</b> advice through our <b>experience</b> to satisfy all your security surveillance needs through our <b>friendly services</b>. We will only provide you with products of the highest <b>quality</b> for your surveillance soultion and will continue to provide an ongoing <b>reliable</b> support.
					</p>
					<p>Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its <b>quality</b> while still maintaining an <b>affordable</b> price.</p>
					<p>To meet all your needs, we endeavour to <b>explain</b> all the functions and features of our products until you <b>understand</b> them <b>clearly</b> before you make any decisions. We will continue to provide <b>friendly</b> services and <b>reliable</b> support to our customers to ensure the best results can be obtained from our products.</p>
				</OrangeBoard>
			</div>
			<div className="col-sm-3">
				<img className="img-responsive asia center" src="img/ASIALmemberjpeg_hires.jpg"/>
			</div>
			<div className="col-sm-12">
				<BigHeader smallTitle="">Brands We Carry</BigHeader>
			</div>

			<div className="col-sm-12 brand">
				<p className="note">These logos are all copyright of their respective owners.</p>
				<table className="table borderless">
					<tbody>
						{
							BrandsData.reduce( (acc, cur, curId) => {
									(curId%4===0)?acc.push([cur]):acc[acc.length-1].push(cur);
									return acc;
								},[])
								.map( (item, id) =>  (
										<tr key={id}>
											{
												item.map((item, id)=> (<td  key={id}><img className="img-responsive" src={item}/></td>))
											}
										</tr>
									)
								)
						}
					</tbody>
				</table>
			</div>
		</div>
	</div>
			);
		}
}

About.propTypes = {
};

export {About};
