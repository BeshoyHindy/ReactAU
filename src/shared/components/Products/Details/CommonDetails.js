import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { DetailsImage } from './DetailsImage';
import { DetailsTab } from './DetailsTab';
import { DetailsDesc } from './DetailsDesc';

const CommonDetails = (props) => {
	let detailsImage = {
		name: (props.data && props.data.name) || '',
		description: (props.data && props.data.description) || [],
		images: (props.data && props.data.images) || []
	};

	let tabData = {
			member: (props.data &&  props.data.member) || null,
			optional: (props.data &&  props.data.optional) || null,
			spec: (props.data &&  props.data.spec) || null,
			docs: (props.data &&  props.data.docs) || null
		};
	let descData = {
		name: (props.data &&  props.data.name) || '',
		description: (props.data &&  props.data.description) || []
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
