let Griddle = require('griddle-react');

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import {isvalidRoute} from '../../Data/RouteData';
import { Metadata } from "../../Data/ProductTblSettings";

class ProductsTbl extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				products:[]
			};
			this.fetchData = this.fetchData.bind(this);
		}

		componentWillMount() {
			if ( this.props.params.product && Metadata[this.props.params.product]){
				this.fetchData(this.props.params.product, this.props.params.ProductsTbl);
			}
		}


		componentDidMount() {


		}

		componentWillReceiveProps (nextProps) {
			if ( !this.props.params.product || !Metadata[this.props.params.product]){
				return;
			}
			let oldId = this.props.params.product + this.props.params.ProductsTbl;
			let newId = nextProps.params.product + nextProps.params.ProductsTbl;
			if (oldId && newId !== oldId){
				this.fetchData(nextProps.params.product, nextProps.params.ProductsTbl);
			}
		}
		fetchData(product, ProductsTbl){
			if (!isvalidRoute(product, ProductsTbl))
				return;


			axios({
				method: 'get',
				url: '/json/'+product+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				let filtered = response.data;
				if (ProductsTbl && ProductsTbl !== "All"){
					//this.refs.Griddle.setFilter(ProductsTbl);
					filtered = response.data.filter( item => {
						return item.type == ProductsTbl
							|| item.brand == ProductsTbl;
					});
				}
				this.setState({
					products: filtered
				});
			})
			.catch(function (error) {
				//console.log(error);
			});
		}
		render() {

			if ( !this.props.params.product || !Metadata[this.props.params.product]){
				return (<div/>);
			}else{
				let col = [];
				let colMetadata = Metadata[this.props.params.product];
				for (let item of colMetadata) {
					if (item.visible)
						col.push(item.columnName);
				}
				//console.log(col, colMetadata);
				//console.log(this.state.products);
				return (
						<Griddle results={this.state.products} tableClassName="table" columnMetadata={colMetadata} showFilter showSettings
							columns={col}
							sortAscendingComponent={<span className="fa fa-sort-amount-asc" />}
							sortDescendingComponent={<span className="fa fa-sort-amount-desc" />}
							sortDefaultComponent={<span className="fa fa-sort " />}
							useGriddleStyles={false}
							ref="Griddle"
							/>
				);
			}
		}

}
ProductsTbl.propTypes = {
	params: React.PropTypes.object
};

export {ProductsTbl};
