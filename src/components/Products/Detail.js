require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { SpecTbl }  from './Spec';
import { DownloadTbl }  from './DownloadTbl';

class Details extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				detail:[]
			};
			this.fetchData = this.fetchData.bind(this);
		}

		componentWillMount() {
			this.fetchData();
		}
		componentDidMount() {


		}
		componentDidUpdate (prevProps, prevState) {
			let oldId = prevProps.params.id;
			let newId = this.props.params.id;
			if (oldId && newId !== oldId){
				this.fetchData();
			}
		}

		fetchData(){
			//console.log('this.props.params: ', this.props.params);
			axios({
				method: 'get',
				url: '/json/details/'+this.props.params.id+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				this.setState({
					detail: response.data
				});
			})
			.catch(function (error) {
				//console.log(error);
			});
		}
		handleSelect(index, last) {
			//console.log('Selected tab: ' + index + ', Last tab: ' + last);
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
											<img className="product" src={item} key={id}/>
										);
									})}
							</div>
						</div>
						<div className="col-xs-12 hidden-xs p-thumbs">
							<ul className="product-thumbs">
							{this.state.detail.images && this.state.detail.images.map( (item, id) => {
								return (
								<li key={id} >
									<img src={item}/>
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
						<SpecTbl spec={this.state.detail.spec ?this.state.detail.spec:[]}/>
					</TabPanel>

					<TabPanel>
						<DownloadTbl docs={this.state.detail.docs ?this.state.detail.docs:[]}/>
					</TabPanel>
				</Tabs>
			</div>
			);
		}
}
Details.propTypes = {
	params: React.PropTypes.object,
};

export {Details};
