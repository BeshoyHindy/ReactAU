import { Link} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { SpecTbl }  from './Spec';
import { SortableTbl }  from '../../Shared/SortableTbl';
import { ImageLoader } from '../../Shared/ImageLoader';
import { CustomDownloadTd } from '../../Shared/Shared';
import { ImageList } from '../../Shared/ImageList';



class DetailsImage extends React.Component{
		constructor(props) {
			super(props);
			let sImage = this.props.data && this.props.data.images && this.props.data.images[0];
			this.state = {
				activeItem: 0
			};
			this.changeShowImage = this.changeShowImage.bind(this);
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
			let productImagesThumbClassWrap = this.props.productType==='ALARM'?"hidden-xs p-thumbs":"col-xs-12 hidden-xs p-thumbs";
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
											cssClass={transitionName}
											key={showImage}
											src={showImage}
											minHeight="284px"
											alt={`${this.props.brand} - ${this.props.productType} - ${this.props.type} - ${this.props.name}`}
											title={`${this.props.brand} - ${this.props.productType} - ${this.props.type} - ${this.props.name}`}
										/>
									)
								}
						</ReactCSSTransitionGroup>
					</div>
					<div className={productImagesThumbClassWrap}>
						<ul className={productImagesThumbClass}>
							{
								this.props.data.images && this.props.data.images.map( (item, id) => {
									return (<ImageList key={id} id={id} src={item} activeItem={this.state.activeItem} toHandleClick={this.changeShowImage}
												alt={`${this.props.brand} - ${this.props.productType} - ${this.props.type} - ${this.props.name}`}
												title={`${this.props.brand} - ${this.props.productType} - ${this.props.type} - ${this.props.name}`}
												minHeight="60px"
												/>);
								})
							}
						</ul>
					</div>
				</div>
			);
		}
}
DetailsImage.propTypes = {
	productType: React.PropTypes.string,
	type: React.PropTypes.string,
	name: React.PropTypes.string,
	brand: React.PropTypes.string,
	data: React.PropTypes.object
};

export {DetailsImage};
