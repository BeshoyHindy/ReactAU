require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { SpecTbl }  from './Spec';
import { SortableTbl }  from '../Shared/SortableTbl';
import ImageLoader from 'react-imageloader';
import {CustomDownloadTd} from '../Shared/Shared';
import {ImageList} from '../Shared/ImageList';

class CommonDetails extends React.Component{
		constructor(props) {
			super(props);
			let sImage = this.props.data && this.props.data.images && this.props.data.images[0];
			this.state = {
				detail:this.props.data || {},
				showImages: [sImage] || [],
				activeItem: 0
			};
			this.changeShowImage = this.changeShowImage.bind(this);
			this.detailImgpreLoader = this.detailImgpreLoader.bind(this);
			this.handleSelect = this.detailImgpreLoader.bind(this);

		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.data !== this.state.detail) {
				let sImage = nextProps.data && nextProps.data.images && nextProps.data.images[0];
				this.setState({
						detail: nextProps.data ,
						showImages: [sImage] || []
					});
			}
		}
		handleSelect(index, last) {
			//console.log('Selected tab: ' + index + ', Last tab: ' + last);
		}
		detailImgpreLoader() {
			return <div className="loading-div" style={{minHeight: "300px"}}/>;
		}
		changeShowImage(id){
			this.setState({
				showImages: [this.state.detail.images[id]],
				activeItem: id
			});
		}
		render() {
			return (
			<div className="product-detail">
				<div className="row">
					<div id="product-top" className="col-xs-12 col-sm-4 col-md-4 col-lg-5">
						<div className="row">
							<div className="col-xs-12 product-images">
								<ReactCSSTransitionGroup
									transitionName="product"
									transitionEnterTimeout={300}
									transitionLeaveTimeout={300}>
										{this.state.showImages && this.state.showImages.map( (item, id) => {
												return (
												<ImageLoader
													className="product"
													key={item + id}
													src={item}
													wrapper={React.DOM.div}
													preloader={this.detailImgpreLoader} >NOT FOUND
												</ImageLoader>
											);
										})}
								</ReactCSSTransitionGroup>
							</div>
						</div>
						<div className="col-xs-12 hidden-xs p-thumbs">
							<ul className="product-thumbs">
								{
									this.state.detail.images && this.state.detail.images.map( (item, id) => {
										return (<ImageList key={id} id={id} src={item} activeItem={this.state.activeItem}  toHandleClick={this.changeShowImage} loaderStyle={{minHeight: "60px"}}/>);
									})
								}
							</ul>
						</div>
					</div>
					<div className="col-xs-12 col-sm-8 col-md-8 col-lg-7 product-desc">
					<h1>{this.state.detail.name}</h1>
					<div className="p-desc-detail">
						<ul className="fa-ul">
							{this.state.detail.description && this.state.detail.description.map( (item, id) => {
								return (
								<li key={id}><i className="fa-li fa fa-check-square"/>{item}</li>
								);
							})}
						</ul>
					</div>
					</div>
				</div>
				<Tabs
					onSelect={this.handleSelect}
					selectedIndex={0}
				>
					<TabList>
						<Tab>Specification</Tab>
						<Tab>Download</Tab>
					</TabList>

					<TabPanel>
						<SpecTbl data={this.state.detail.spec ?this.state.detail.spec:[]}/>
					</TabPanel>

					<TabPanel>
						<SortableTbl data={this.state.detail.docs}
							tHead={["Description","Size(KB)","File Type","Download"]}
							customTd={[{custd: CustomDownloadTd, keyItem: "src"}]}
							dKey={["desc","size","filetype", "src"]} />
					</TabPanel>
				</Tabs>
			</div>
			);
		}
}
CommonDetails.propTypes = {
	data: React.PropTypes.object
};

export {CommonDetails};
