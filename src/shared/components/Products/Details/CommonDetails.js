import React from 'react';

import { DetailsImage } from './DetailsImage';
import { DetailsTab } from './DetailsTab';
import { DetailsDesc } from './DetailsDesc';

let CommonDetails = (props) => {
	if (props.ajaxState > 0) {
		return (<div className="ajax-loading"><img src="/img/ajax-loader.gif" alt=""/></div>);
	}
		
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
					<div className="col-xs-12 product-desc  alarm-product-desc">						
						<DetailsDesc data={descData} />
					</div>
					<div id="product-top" className="col-xs-12">
						<DetailsImage data={detailsImage} type={props.data.type}  brand={props.data.brand}   name={props.data.name} productType={props.params.product}/>
					</div>
				<DetailsTab data={tabData}/>
			</div>
		);
	}else{
		return (
			<div className="product-detail">
					<div id="product-top" className="col-xs-12 col-sm-4 col-md-4 col-lg-5">
						<DetailsImage data={detailsImage} type={props.data.type}   brand={props.data.brand}   name={props.data.name} productType={props.params.product}/>
					</div>
					<div className="col-xs-12 col-sm-8 col-md-8 col-lg-7 product-desc">										
						<DetailsDesc data={descData}/>
					</div>
				<DetailsTab data={tabData}/>
			</div>
		);
	}
};

CommonDetails.propTypes = {
	data: React.PropTypes.object,
	params: React.PropTypes.object,
	ajaxState: React.PropTypes.number
};

export {CommonDetails};
