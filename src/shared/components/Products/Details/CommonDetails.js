import React from 'react';

import { DetailsImage } from './DetailsImage';
import { DetailsTab } from './DetailsTab';
import { DetailsDesc } from './DetailsDesc';

let CommonDetails = ({data, match, ajaxState}) => {
	if (ajaxState > 0) {
		return (<div className="ajax-loading"><img src="/img/ajax-loader.gif" alt=""/></div>);
	}
		
	let detailsImage = {
		name: (data && data.name) || '',
		description: (data && data.description) || [],
		images: (data && data.images) || []
	};

	let tabData = {
			member: (data &&  data.member) || null,
			optional: (data &&  data.optional) || null,
			spec: (data &&  data.spec) || null,
			docs: (data &&  data.docs) || null,
			cat: data.cat
		};
	let descData = {
		name: (data &&  data.name) || '',
		description: (data &&  data.description) || []
	};

	if(match.params.product==="ALARM"){
		return (
			<div className="product-detail">
					<div className="col-xs-12 product-desc  alarm-product-desc">						
						<DetailsDesc data={descData} />
					</div>
					<div id="product-top" className="col-xs-12">
						<DetailsImage data={detailsImage} type={data.type}  brand={data.brand}   name={data.name} productType={match.params.product}/>
					</div>
				<DetailsTab data={tabData}/>
			</div>
		);
	}else{
		return (
			<div className="product-detail">
					<div id="product-top" className="col-xs-12 col-sm-4 col-md-4 col-lg-5">
						<DetailsImage data={detailsImage} type={data.type}   brand={data.brand}   name={data.name} productType={match.params.product}/>
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
	match: React.PropTypes.object,
	ajaxState: React.PropTypes.number
};

export {CommonDetails};
