require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { SpecTbl }  from './Spec';
import { SortableTbl }  from './SortableTbl';
import ImageLoader from 'react-imageloader';
import {CustomDownloadTd} from '../Shared/Shared';

class CommonDetails extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				detail:this.props.data || {}
			};
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.data !== this.state.detail) {
				this.setState({ detail: nextProps.data });
			}
		}
		handleSelect(index, last) {
			//console.log('Selected tab: ' + index + ', Last tab: ' + last);
		}
		detailImgpreLoader() {
			return <div className="loading-div" style={{minHeight: "300px"}}/>;
		}
		thumbnailImgpreLoader() {
			return <div className="loading-div" style={{minHeight: "60px"}}/>;
		}
		render() {
			return (
			<div className="product-detail">
				<div className="row">
					<div id="product-top" className="col-xs-12 col-sm-4 col-md-4 col-lg-5">
						<div className="row">
							<div className="col-xs-12 product-images">
								{this.state.detail.images && this.state.detail.images.map( (item, id) => {
										return (
											<ImageLoader
												className="product"
												key={id}
												src={item}
												wrapper={React.DOM.div}
												preloader={this.detailImgpreLoader}>NOT FOUND
											</ImageLoader>
										);
									})}
							</div>
						</div>
						<div className="col-xs-12 hidden-xs p-thumbs">
							<ul className="product-thumbs">
							{this.state.detail.images && this.state.detail.images.map( (item, id) => {
								return (
								<li key={id} >
									<ImageLoader
										key={id}
										src={item}
										wrapper={React.DOM.div}
										preloader={this.thumbnailImgpreLoader}>NOT FOUND
									</ImageLoader>
								</li>
								);
							})}
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
