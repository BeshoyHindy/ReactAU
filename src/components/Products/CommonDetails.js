require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { DetailsImage } from './DetailsImage';
import { DetailsTab } from './DetailsTab';
import { DetailsDesc } from './DetailsDesc';

const CommonDetails = (props) => {
	let detailsImage = {
		name: props.data.name,
		description: props.data.description,
		images: props.data.images
	};

	let tabData = {
			member: props.data.member,
			optional: props.data.optional,
			spec: props.data.spec,
			docs: props.data.docs
		};
	let descData = {
		name: props.data.name,
		description: props.data.description,
	};

	if(props.params.product==="ALARM"){
		return (
			<div className="product-detail">
				<div className="row">
					<div className="col-xs-12 product-desc  alarm-product-desc">
						<DetailsDesc data={descData}/>
					</div>
					<div id="product-top" className="col-xs-12">
						<DetailsImage data={detailsImage} productType={props.params.product}/>
					</div>
				</div>
				<DetailsTab data={tabData}/>
			</div>
			);
	}else{
		return (
			<div className="product-detail">
				<div className="row">
					<div id="product-top" className="col-xs-12 col-sm-4 col-md-4 col-lg-5">
						<DetailsImage data={detailsImage} productType={props.params.product}/>
					</div>
					<div className="col-xs-12 col-sm-8 col-md-8 col-lg-7 product-desc">
						<DetailsDesc data={descData}/>
					</div>
				</div>
				<DetailsTab data={tabData}/>
			</div>
			);
	}
};

CommonDetails.propTypes = {
	data: React.PropTypes.object,
	params: React.PropTypes.object
};

export {CommonDetails};
