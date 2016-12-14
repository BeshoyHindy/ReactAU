require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

let Griddle = require('griddle-react');

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';

class ImageComponent extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			(<Link to={"/products/DVR/" + this.props.params.product}><img src={this.props.data} /></Link>)
		);
	}
}

class ProductsTbl extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				products:[],
				cat: 'DVR'
			};
			this.fetchData = this.fetchData.bind(this);

		}

		componentDidUpdate (prevProps, prevState) {
			let oldId = prevProps.params.product + prevProps.params.ProductsTbl;
			let newId = this.props.params.product + this.props.params.ProductsTbl;
			if (oldId && newId !== oldId){
				this.fetchData()
			}
		}
		componentWillMount() {
			this.fetchData();
		}

		fetchData(){
			//console.log('this.props.params: ', this.props.params);
			this.setState({
				cat: this.props.params.product ? this.props.params.product : 'DVR'
			});
			axios({
				method: 'get',
				url: '/json/'+this.state.cat+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				let filtered = response.data;
				if (this.props.params.ProductsTbl && this.props.params.ProductsTbl !== "All"){
					//this.refs.Griddle.setFilter(this.props.params.ProductsTbl);
					filtered = response.data.filter( item => {
						return item.type == this.props.params.ProductsTbl
						       || item.brand == this.props.params.ProductsTbl;
					})
				}
				this.setState({
					products: filtered
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}

		componentDidMount() {


		}
		render() {
			let Metadata =  [
			{
				"columnName": "imageUrl",
				"order": 1,
				"locked": true,
				"visible": true,
				"customComponent": ImageComponent,
				"displayName": "Image",
				"sortable": false,
				"cssClassName": "tblImage"
			},
			{
				"columnName": "brand",
				"order": 2,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Brand"
			},
			{
				"columnName": "type",
				"order": 3,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "System"
			},
			{
				"columnName": "name",
				"order": 4,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Model"
			},
			{
				"columnName": "channel",
				"order": 5,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Channel"
			},
			{
				"columnName": "remote",
				"order": 6,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Remote View"
			},
			{
				"columnName": "backup",
				"order":  7,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Backup",
			},
			{
				"columnName": "videoout",
				"order":  8,
				"locked": false,
				"visible": true,
				"sortable": true,
				"displayName": "Video Output",
			},
			{
				"columnName": "HDD",
				"order":  9,
				"locked": true,
				"visible": false,
				"displayName": "",
			},
			{
				"columnName": "snippet",
				"order":  10,
				"locked": true,
				"visible": false,
				"displayName": "",
			},
			{
				"columnName": "id",
				"order":  11,
				"locked": true,
				"visible": false,
				"displayName": "",
			}
			];
			return (
					<Griddle results={this.state.products} tableClassName="table" columnMetadata={Metadata} showFilter={true} showSettings={true}
						columns={["imageUrl","brand", "type", "name", "channel", "remote", "backup", "videoout"]}
						sortAscendingComponent={<span className="fa fa-sort-amount-asc"></span>}
						sortDescendingComponent={<span className="fa fa-sort-amount-desc"></span>}
						sortDefaultComponent={<span className="fa fa-sort "></span>}
						useGriddleStyles={false}
						ref='Griddle'
						/>
			);
		}

}

export {ProductsTbl};
