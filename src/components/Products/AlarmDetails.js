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

class AlarmDetails extends React.Component{
		constructor(props) {
			super(props);
			let sImage = this.props.data && this.props.data.images && this.props.data.images[0];
			this.state = {
				detail:this.props.data || {},
				showImages: [sImage] || [],
				activeItem: 0
			};
			//constructor is only invoked when the component is first created. need to update on componentWillReceiveProps
			this.changeShowImage = this.changeShowImage.bind(this);
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
			return <div className="loading-div" style={{height: "284px"}}/>;
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
					<div id="product-top" className="col-xs-12">
						<div className="row">
							<div className="col-xs-12 product-desc alarm-product-desc">
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
							<div className="col-xs-12 ">
								<div className="alarm-image">
									<div className="product-images alarm-product-images">
										<ReactCSSTransitionGroup
											transitionName="alarmProduct"
											transitionEnterTimeout={300}
											transitionLeaveTimeout={300}>
												{this.state.showImages && this.state.showImages.map( (item, id) => {
														return (
														<ImageLoader
															className="alarmProduct"
															key={item + id}
															src={item}
															wrapper={React.DOM.div}
															preloader={this.detailImgpreLoader} >NOT FOUND
														</ImageLoader>
													);
												})}
										</ReactCSSTransitionGroup>
									</div>
									<ul className="alarm-product-thumbs">
										{
											this.state.detail.images && this.state.detail.images.map( (item, id) => {
												return (<ImageList key={id} id={id} src={item} activeItem={this.state.activeItem} toHandleClick={this.changeShowImage} loaderStyle={{minHeight: "60px"}}/>);
											})
										}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Tabs
					onSelect={this.handleSelect}
					selectedIndex={0}
				>
					<TabList>
						<Tab>Standard Package</Tab>
						<Tab>Optinal Package</Tab>
						<Tab>Specification</Tab>
						<Tab>Download</Tab>
					</TabList>

					<TabPanel>
						<SortableTbl data={this.state.detail.member} tHead={["Description","Qty"]} dKey={["desc","qty"]} />
					</TabPanel>

					<TabPanel>
						<SortableTbl data={this.state.detail.optional}  tHead={["Optional Member"]}  dKey={["desc"]} />
					</TabPanel>

					<TabPanel>
						<SpecTbl data={this.state.detail.spec}/>
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
AlarmDetails.propTypes = {
	params: React.PropTypes.object,
	data: React.PropTypes.object
};

export {AlarmDetails};
