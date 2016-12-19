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

class AlarmDetails extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				detail:this.props.data || {}
			};
			//constructor is only invoked when the component is first created. need to update on componentWillReceiveProps
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
			return <div className="loading-div" style={{height: "284px"}}/>;
		}
		thumbnailImgpreLoader() {
			return <div className="loading-div" style={{minHeight: "60px"}}/>;
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
									<ul className="alarm-product-thumbs">
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
