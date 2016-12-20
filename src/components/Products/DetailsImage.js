require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { SpecTbl }  from './Spec';
import { SortableTbl }  from '../Shared/SortableTbl';
import ImageLoader from 'react-imageloader';
import {CustomDownloadTd} from '../Shared/Shared';
import {ImageList} from '../Shared/ImageList';



class DetailsImage extends React.Component{
		constructor(props) {
			super(props);
			let sImage = this.props.data && this.props.data.images && this.props.data.images[0];
			this.state = {
				activeItem: 0
			};
			this.changeShowImage = this.changeShowImage.bind(this);
			this.detailImgpreLoader = this.detailImgpreLoader.bind(this);
		}
		detailImgpreLoader() {
			return <div className="loading-div" style={{minHeight: "300px"}}/>;
		}
		changeShowImage(id){
			this.setState({
				activeItem: id
			});
		}
		render() {
			let showImage = this.props.data && this.props.data.images && this.props.data.images[this.state.activeItem] ;
			let transitionName = this.props.productType==='ALARM'?"alarmProduct":"product";
			let productImagesClass = "col-xs-12  product-images " + (this.props.productType==='ALARM'?"alarm-product-images":"");
			let productImagesThumbClass = this.props.productType==='ALARM'?"alarm-product-thumbs":"product-thumbs";
			let centerClass = this.props.productType==='ALARM'?"alarm-image":"row";
			return (
				<div className={centerClass}>
					<div className={productImagesClass}>
						<ReactCSSTransitionGroup
							transitionName={transitionName}
							transitionEnterTimeout={300}
							transitionLeaveTimeout={300}>
								{
									showImage && (
										<ImageLoader
											className={transitionName}
											key={showImage}
											src={showImage}
											wrapper={React.DOM.div}
											preloader={this.detailImgpreLoader} >NOT FOUND
										</ImageLoader>
									)
								}
						</ReactCSSTransitionGroup>
					</div>
					<ul className={productImagesThumbClass}>
						{
							this.props.data.images && this.props.data.images.map( (item, id) => {
								return (<ImageList key={id} id={id} src={item} activeItem={this.state.activeItem} toHandleClick={this.changeShowImage} loaderStyle={{minHeight: "60px"}}/>);
							})
						}
					</ul>
				</div>
			);
		}
}
DetailsImage.propTypes = {
	productType: React.PropTypes.string,
	data: React.PropTypes.object
};

export {DetailsImage};
